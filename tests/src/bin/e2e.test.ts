import type { SpawnSyncReturns } from 'node:child_process'
// The default-HOST end-to-end proof — spawns the BUILT `dist/bin/scaffold.js`
// with NO `--host`, so every command resolves its host root through the
// bin's own default (`hostRoot()`, this package's own vendored `dist/host`),
// never a caller-supplied fixture. `scaffold.test.ts` always passes an
// explicit `--host`/`--target` (or runs `sync`/`audit` against a hand-built
// manifest); this suite instead runs `new`/`audit`/`repair`/`mirror` the way
// an installed consumer actually would: no `--host`, and `new`/`audit`/
// `repair` driven purely by `cwd`, no `--target`. Assumes the build chain has
// already run (`npm run build` before `npm test` — AGENTS.md §Orientation).
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { pascalCase, SCAFFOLD_RANGE } from '@src/core'
import { isRecord, listFiles } from '@src/server'
import { buildTempDirectory, WORKSPACE_ROOT } from '../../setupServer.js'

const BIN_PATH = join(WORKSPACE_ROOT, 'dist/bin/scaffold.js')

/** The `HOST_PATHS` (src/core/constants.ts) entries this suite proves are byte-copied verbatim. */
const HOST_BYTE_EQUAL_PATHS = [
	'.gitignore',
	'.claude/settings.json',
	'.github/workflows/ci.yml',
	'AGENTS.md',
	'CLAUDE.md',
	'LICENSE',
	'guides/src/guide.md',
] as const

/**
 * Spawn the built `scaffold` bin with `argv`, `cwd` defaulting to the repo
 * root — the `scaffold.test.ts` `runBin` shape, extended with an optional
 * `cwd` override so `new` / `audit` / `repair` can be driven purely by
 * working directory (their documented `.` default), the path this suite
 * exercises instead of an explicit `--target`.
 */
function runBin(
	argv: readonly string[],
	options?: { readonly cwd?: string },
): SpawnSyncReturns<string> {
	return spawnSync(process.execPath, [BIN_PATH, ...argv], {
		cwd: options?.cwd ?? WORKSPACE_ROOT,
		input: '',
		encoding: 'utf8',
		timeout: 15000,
	})
}

/** Whether the file at `path` carries any executable bit (owner, group, or other). */
function isExecutable(path: string): boolean {
	return (statSync(path).mode & 0o111) !== 0
}

/** The generated-minimal `src/<surface>/*` quartet's four file names (AGENTS §5's per-surface centralized-file set). */
function quartet(pascal: string): readonly string[] {
	return ['types.ts', `${pascal}.ts`, 'factories.ts', 'index.ts']
}

describe('scaffold bin: default-host end-to-end proof (no --host)', () => {
	describe('new --apply: default-host materialization', () => {
		it('writes host artifacts byte-equal to the repo, executable scripts, no retired legacy files, a wired package.json, and an interpolated guides-parity drop-in', async () => {
			const cwd = await buildTempDirectory()
			try {
				const created = runBin(['new', 'demo', '--surfaces', 'core', '--apply'], { cwd: cwd.path })
				expect(created.status).toBe(0)

				const packageDirectory = join(cwd.path, 'demo')
				expect(existsSync(packageDirectory)).toBe(true)

				for (const relative of HOST_BYTE_EQUAL_PATHS) {
					expect(readFileSync(join(packageDirectory, relative), 'utf8')).toBe(
						readFileSync(join(WORKSPACE_ROOT, relative), 'utf8'),
					)
				}

				for (const script of ['deps.sh', 'cursor.sh', 'ollama.sh']) {
					const path = join(packageDirectory, 'scripts', script)
					expect(existsSync(path)).toBe(true)
					// Windows `stat` carries no execute bit — the mode check is POSIX-only.
					if (process.platform === 'win32') continue
					expect(isExecutable(path)).toBe(true)
				}

				const everyFile = listFiles(packageDirectory)
				expect(everyFile.some((file) => file.endsWith('SCAFFOLD.md'))).toBe(false)
				expect(everyFile.some((file) => file.endsWith('scaffold.sh'))).toBe(false)
				expect(everyFile.some((file) => file.endsWith('mirror.sh'))).toBe(false)

				const manifest: unknown = JSON.parse(
					readFileSync(join(packageDirectory, 'package.json'), 'utf8'),
				)
				if (!isRecord(manifest)) throw new Error('expected package.json to parse to a JSON object')
				const scripts = manifest.scripts
				if (!isRecord(scripts)) throw new Error('expected package.json scripts to be an object')
				expect(scripts.scaffold).toBe('scaffold')
				const devDependencies = manifest.devDependencies
				if (!isRecord(devDependencies)) {
					throw new Error('expected package.json devDependencies to be an object')
				}
				expect(devDependencies['@orkestrel/scaffold']).toBe(SCAFFOLD_RANGE)

				const parityPath = join(packageDirectory, 'tests/guides/src/parity.test.ts')
				expect(existsSync(parityPath)).toBe(true)
				expect(readFileSync(parityPath, 'utf8')).toContain('@orkestrel/demo')
			} finally {
				await cwd.cleanup()
			}
		})
	})

	describe('new --apply: surface variants', () => {
		it('server-only: writes the src/server quartet, no src/core anywhere, and a vite.config.ts with no srcCore', async () => {
			const cwd = await buildTempDirectory()
			try {
				const created = runBin(['new', 'demoserver', '--surfaces', 'server', '--apply'], {
					cwd: cwd.path,
				})
				expect(created.status).toBe(0)

				const packageDirectory = join(cwd.path, 'demoserver')
				for (const file of quartet(pascalCase('demoserver'))) {
					expect(existsSync(join(packageDirectory, 'src/server', file))).toBe(true)
				}
				expect(existsSync(join(packageDirectory, 'src/core'))).toBe(false)

				const viteConfig = readFileSync(join(packageDirectory, 'vite.config.ts'), 'utf8')
				expect(viteConfig).not.toContain('srcCore')
			} finally {
				await cwd.cleanup()
			}
		})

		it('triple-surface (core,browser,server): writes all three quartets plus both environment setup files', async () => {
			const cwd = await buildTempDirectory()
			try {
				const created = runBin(
					['new', 'demotriple', '--surfaces', 'core,browser,server', '--apply'],
					{ cwd: cwd.path },
				)
				expect(created.status).toBe(0)

				const packageDirectory = join(cwd.path, 'demotriple')
				const pascal = pascalCase('demotriple')
				for (const surface of ['core', 'browser', 'server']) {
					for (const file of quartet(pascal)) {
						expect(existsSync(join(packageDirectory, 'src', surface, file))).toBe(true)
					}
				}

				expect(existsSync(join(packageDirectory, 'tests/setup.ts'))).toBe(true)
				expect(existsSync(join(packageDirectory, 'tests/setupServer.ts'))).toBe(true)
				expect(existsSync(join(packageDirectory, 'tests/setupBrowser.ts'))).toBe(true)
			} finally {
				await cwd.cleanup()
			}
		})
	})

	describe('single-target round-trip: new -> audit -> drift -> repair -> prune', () => {
		it('audits clean (content-aware) after new --apply, fails once a host file goes missing, repair --apply restores it byte-equal, and repair --apply --prune removes a foreign .claude/agents file', async () => {
			const cwd = await buildTempDirectory()
			try {
				const created = runBin(['new', 'pkgrt', '--surfaces', 'core', '--apply'], {
					cwd: cwd.path,
				})
				expect(created.status).toBe(0)
				const packageDirectory = join(cwd.path, 'pkgrt')

				const cleanAudit = runBin(['audit'], { cwd: packageDirectory })
				expect(cleanAudit.status).toBe(0)
				expect(cleanAudit.stdout).toContain('content-aware')

				// `diffPlan` (src/core/helpers.ts) audits a `host`-origin artifact by
				// PRESENCE only — its own doc comment: "never stale" — so a byte-level
				// mutation of a still-present host file is NOT detectable drift under
				// the landed source (see this file's final deviation note). Removing
				// the file (missing) is the drift a host-origin artifact CAN surface,
				// and still proves the audit -> repair round-trip restores the exact
				// vendored bytes.
				const hostFile = join(packageDirectory, '.editorconfig')
				rmSync(hostFile)

				const driftedAudit = runBin(['audit'], { cwd: packageDirectory })
				expect(driftedAudit.status).toBe(1)

				const repaired = runBin(['repair', '--apply'], { cwd: packageDirectory })
				expect(repaired.status).toBe(0)
				expect(readFileSync(hostFile, 'utf8')).toBe(
					readFileSync(join(WORKSPACE_ROOT, '.editorconfig'), 'utf8'),
				)

				const cleanAgain = runBin(['audit'], { cwd: packageDirectory })
				expect(cleanAgain.status).toBe(0)

				const agentsDirectory = join(packageDirectory, '.claude/agents')
				mkdirSync(agentsDirectory, { recursive: true })
				const roguePath = join(agentsDirectory, 'rogue.md')
				writeFileSync(roguePath, '# not a real agent\n')

				const pruned = runBin(['repair', '--apply', '--prune'], { cwd: packageDirectory })
				expect(pruned.status).toBe(0)
				expect(existsSync(roguePath)).toBe(false)
			} finally {
				await cwd.cleanup()
			}
		}, 60000)
	})

	describe('fleet round-trip: mirror across two fresh scaffolds', () => {
		it('mirror is clean right after materializing two fresh scaffolds, fails once one drifts, --apply trues it, and a rerun is clean', async () => {
			const root = await buildTempDirectory()
			try {
				for (const name of ['fleeta', 'fleetb']) {
					const created = runBin(['new', name, '--surfaces', 'core', '--apply', '--target', name], {
						cwd: root.path,
					})
					expect(created.status).toBe(0)
				}

				const clean = runBin(['mirror', '--root', '.'], { cwd: root.path })
				expect(clean.status).toBe(0)
				expect(clean.stdout).toContain('fleeta: clean')
				expect(clean.stdout).toContain('fleetb: clean')

				// Mirror scopes its plan to `host`-origin artifacts only (excluding
				// `.github/workflows/ci.yml`), and (per the single-target round-trip
				// test above) `diffPlan` audits a `host`-origin artifact by presence
				// only — removing a host file is therefore the drift mirror CAN detect.
				const driftedFile = join(root.path, 'fleeta', '.editorconfig')
				rmSync(driftedFile)

				const drifted = runBin(['mirror', '--root', '.'], { cwd: root.path })
				expect(drifted.status).toBe(1)
				expect(drifted.stdout).toContain('fleeta: drifted 0, missing 1, foreign 0')
				expect(drifted.stdout).toContain('total: 1 drifted, 0 failed')

				const trued = runBin(['mirror', '--root', '.', '--apply'], { cwd: root.path })
				expect(trued.status).toBe(0)
				expect(trued.stdout).toContain('fleeta: repaired (0 remaining)')
				expect(readFileSync(driftedFile, 'utf8')).toBe(
					readFileSync(join(WORKSPACE_ROOT, '.editorconfig'), 'utf8'),
				)

				const rerun = runBin(['mirror', '--root', '.'], { cwd: root.path })
				expect(rerun.status).toBe(0)
				expect(rerun.stdout).toContain('fleeta: clean')
				expect(rerun.stdout).toContain('fleetb: clean')
			} finally {
				await root.cleanup()
			}
		}, 60000)
	})
})
