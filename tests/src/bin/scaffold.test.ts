import type { SpawnSyncReturns } from 'node:child_process'
// The bin end to end — spawns the BUILT executable (`dist/bin/scaffold.js`) via
// `node:child_process`, so this suite assumes the build chain has already run
// (the gate order runs `npm run build` before `npm test` — see AGENTS.md §Orientation).
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { buildTempDirectory, WORKSPACE_ROOT } from '../../setupServer.js'

const BIN_PATH = join(WORKSPACE_ROOT, 'dist/bin/scaffold.js')

/**
 * Spawn the built `scaffold` bin with `argv` + optional piped `input`, cwd
 * defaulting to the repo root (so host-path resolution finds the real
 * package) with an optional override — every WRITE destination is now
 * confined to the cwd, so a test exercising `--target`/`--root` against a
 * temp fixture must run WITH that fixture as its cwd.
 */
function runBin(
	argv: readonly string[],
	input?: string,
	options?: { readonly cwd?: string; readonly env?: Readonly<Record<string, string>> },
): SpawnSyncReturns<string> {
	return spawnSync(process.execPath, [BIN_PATH, ...argv], {
		cwd: options?.cwd ?? WORKSPACE_ROOT,
		input: input ?? '',
		encoding: 'utf8',
		timeout: 15000,
		env: options?.env !== undefined ? { ...process.env, ...options.env } : process.env,
	})
}

/** Write a minimal `package.json` declaring `dependencies` into a fresh temp directory — the manifest `readManifest` / `manifestToDependencies` read for `sync` / `audit`. */
async function writeManifest(dependencies: Readonly<Record<string, string>>) {
	const directory = await buildTempDirectory()
	writeFileSync(
		join(directory.path, 'package.json'),
		JSON.stringify({ name: '@orkestrel/fixture', version: '0.0.1', dependencies }),
	)
	return directory
}

/** Real placeholder bytes for every `HOST_PATHS` entry, keyed by artifact-relative path — enough for `new --apply --host <fixture>` to fully materialize a package without depending on the (possibly stale) default vendored host. */
const HOST_FIXTURE_FILES: Readonly<Record<string, string>> = {
	'AGENTS.md': '# AGENTS fixture\n',
	'CLAUDE.md': '# CLAUDE fixture\n',
	LICENSE: 'MIT fixture license\n',
	'.editorconfig': 'root = true\n# fixture\n',
	'.gitattributes': '* text=auto\n',
	'.gitignore': 'node_modules\n',
	'.oxfmtrc.json': '{}\n',
	'.oxlintrc.json': '{}\n',
	'.oxlintignore': 'dist\n',
	'.prettierignore': 'dist\n',
	'scripts/deps.sh': '#!/bin/sh\necho deps\n',
	'scripts/cursor.sh': '#!/bin/sh\necho cursor\n',
	'scripts/ollama.sh': '#!/bin/sh\necho ollama\n',
	'.github/workflows/ci.yml': 'name: ci-fixture\n',
	'guides/src/guide.md': '# guide fixture\n',
	'.claude/agents/example.md': '# example agent fixture\n',
}

/** Build a real, raw (no `manifest.json`) host root in a fresh temp directory — every `HOST_PATHS` entry present with placeholder bytes, `overrides` replacing or adding specific entries (e.g. a distinctive `.editorconfig` marker to prove `--host` sourcing). */
async function buildHostFixture(overrides?: Readonly<Record<string, string>>) {
	const directory = await buildTempDirectory()
	for (const [relative, content] of Object.entries({ ...HOST_FIXTURE_FILES, ...overrides })) {
		const full = join(directory.path, relative)
		mkdirSync(dirname(full), { recursive: true })
		writeFileSync(full, content)
	}
	return directory
}

describe('scaffold bin', () => {
	describe('new', () => {
		it('dry-run: prints the plan review + summary and creates nothing', () => {
			const target = join(WORKSPACE_ROOT, 'demo-dry-run')
			try {
				const result = runBin(['new', 'demo-dry-run', '--surfaces', 'core'])
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('## Summary')
				expect(result.stdout).toContain('surfaces: core')
				expect(result.stdout).toMatch(/artifacts: \d+ \(host: \d+, template: \d+, computed: \d+\)/)
				expect(existsSync(target)).toBe(false)
			} finally {
				expect(existsSync(target)).toBe(false)
			}
		})

		it('blocked: an off-NAME_PATTERN name exits 1 with the blocking question', () => {
			const result = runBin(['new', 'Bad_Name', '--surfaces', 'core'])
			expect(result.status).toBe(1)
			const output = result.stdout + result.stderr
			expect(output).toContain('Bad_Name')
			expect(output).toMatch(/must match/)
		})

		it('blocked (M1): an unrecognized --surfaces value names it explicitly, no silent drop', () => {
			const result = runBin(['new', 'demo-bad-surface', '--surfaces', 'core,quantum'])
			expect(result.status).toBe(1)
			const output = result.stdout + result.stderr
			expect(output).toContain('quantum')
			expect(output).toMatch(/not recognized/)
			expect(existsSync(join(WORKSPACE_ROOT, 'demo-bad-surface'))).toBe(false)
		})

		it('apply: writes real files into the target and cleans up after', async () => {
			const directory = await buildTempDirectory()
			try {
				const result = runBin(
					['new', 'demo-apply', '--surfaces', 'core', '--apply', '--target', '.'],
					undefined,
					{ cwd: directory.path },
				)
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('wrote')

				const packageJsonPath = join(directory.path, 'package.json')
				expect(existsSync(packageJsonPath)).toBe(true)
				const parsed: unknown = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
				expect(parsed).toMatchObject({ name: '@orkestrel/demo-apply' })

				// A host-origin artifact byte-matches the repo's own copy.
				const writtenHost = readFileSync(join(directory.path, '.editorconfig'), 'utf8')
				const repoHost = readFileSync(join(WORKSPACE_ROOT, '.editorconfig'), 'utf8')
				expect(writtenHost).toBe(repoHost)
			} finally {
				await directory.cleanup()
			}
		})

		it('L1: --target without --apply notes the dry-run ignores it and still runs dry-run', () => {
			const target = join(WORKSPACE_ROOT, 'demo-target-note')
			try {
				const result = runBin([
					'new',
					'demo-target-note',
					'--surfaces',
					'core',
					'--target',
					'./somewhere',
				])
				expect(result.status).toBe(0)
				expect(result.stderr).toMatch(/dry run/i)
				expect(result.stdout).toContain('## Summary')
				expect(existsSync(target)).toBe(false)
			} finally {
				expect(existsSync(target)).toBe(false)
			}
		})

		// The `@orkestrel/terminal` non-TTY fallback reads ONE readline interface per
		// missing prompt off the SAME piped stdin. Reliably driven when exactly ONE
		// argument is missing (verified manually: identical piped input reproducibly
		// resolves the single `input` prompt with the fed line). Feeding TWO answers
		// for BOTH a missing name AND a missing `--surfaces` in the same run was
		// reproducibly (not flakily) unable to resolve the second (checkbox) prompt —
		// the first readline interface appears to consume/close the shared stdin
		// before the second interface can read its line. That two-prompt path is
		// therefore NOT covered here to avoid a flaky test; this case exercises the
		// fallback deterministically with a single missing argument (name), leaving
		// `--surfaces` supplied as a flag.
		it('parseArgs / terminal fallback: a missing name is read off piped (non-TTY) stdin', () => {
			const result = runBin(['new', '--surfaces', 'core'], 'demo-piped\n')
			expect(result.status).toBe(0)
			expect(result.stdout).toContain('Scaffolding demo-piped')
			expect(result.stdout).toContain('## Summary')
		})

		it('--surfaces with multiple values: dry-run reflects all surfaces in the summary', () => {
			const result = runBin(['new', 'demo-multi', '--surfaces', 'core,server'])
			expect(result.status).toBe(0)
			expect(result.stdout).toContain('surfaces: core, server')
			expect(existsSync(join(WORKSPACE_ROOT, 'demo-multi'))).toBe(false)
		})

		it('A3: an off-pattern --deps token exits 1 with a coded [INVALID] message, before any network call', () => {
			const result = runBin(['new', 'demo-bad-dep', '--surfaces', 'core', '--deps', '../evil'])
			expect(result.status).toBe(1)
			const output = result.stdout + result.stderr
			expect(output).toContain('[INVALID]')
			expect(output).toContain('../evil')
			expect(existsSync(join(WORKSPACE_ROOT, 'demo-bad-dep'))).toBe(false)
		})

		it('A3: a percent-encoded traversal --deps token is also rejected before any network call', () => {
			const result = runBin(['new', 'demo-bad-dep-2', '--surfaces', 'core', '--deps', '%2e%2e'])
			expect(result.status).toBe(1)
			const output = result.stdout + result.stderr
			expect(output).toContain('[INVALID]')
			expect(existsSync(join(WORKSPACE_ROOT, 'demo-bad-dep-2'))).toBe(false)
		})

		it('--host <fixture>: sources host artifacts from the fixture, not the default vendored host', async () => {
			const fixture = await buildHostFixture({ '.editorconfig': 'root = true\n# fixture-marker\n' })
			const target = await buildTempDirectory()
			try {
				const result = runBin(
					[
						'new',
						'demo-host-passthrough',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'.',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: target.path },
				)
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('wrote')

				const written = readFileSync(join(target.path, '.editorconfig'), 'utf8')
				expect(written).toBe('root = true\n# fixture-marker\n')
				expect(written).not.toBe(readFileSync(join(WORKSPACE_ROOT, '.editorconfig'), 'utf8'))
			} finally {
				await target.cleanup()
				await fixture.cleanup()
			}
		})

		it('containment: --target escaping the cwd exits 1 with a coded [INVALID] message and creates nothing', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(
					['new', 'demo-escape', '--surfaces', 'core', '--apply', '--target', '../escape'],
					undefined,
					{ cwd: cwd.path },
				)
				expect(result.status).toBe(1)
				const output = result.stdout + result.stderr
				expect(output).toContain('[INVALID]')
				expect(output).toMatch(/escapes the working directory/)
				expect(existsSync(join(cwd.path, '..', 'escape'))).toBe(false)
			} finally {
				await cwd.cleanup()
			}
		})
	})

	describe('sync', () => {
		it('offline posture: a --deps subset with an unreachable dependency still exits 0 (collect mode)', async () => {
			const directory = await writeManifest({ '@orkestrel/does-not-exist-xyz': '^1.0.0' })
			try {
				const result = runBin(
					['sync', '--target', '.', '--deps', '@orkestrel/does-not-exist-xyz'],
					undefined,
					{ cwd: directory.path },
				)
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('Sync')
			} finally {
				await directory.cleanup()
			}
		}, 20000)

		it('--strict: an unreachable dependency in the --deps subset exits 1 with a clean coded message', async () => {
			const directory = await writeManifest({ '@orkestrel/does-not-exist-xyz': '^1.0.0' })
			try {
				const result = runBin(
					['sync', '--target', '.', '--deps', '@orkestrel/does-not-exist-xyz', '--strict'],
					undefined,
					{ cwd: directory.path },
				)
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('FETCH')
				expect(result.stderr).not.toContain('at Object') // no raw stack trace
			} finally {
				await directory.cleanup()
			}
		}, 20000)

		it('--apply: an unreachable dependency writes zero mirrors and still exits 0', async () => {
			const directory = await writeManifest({ '@orkestrel/does-not-exist-xyz': '^1.0.0' })
			try {
				const result = runBin(
					['sync', '--target', '.', '--deps', '@orkestrel/does-not-exist-xyz', '--apply'],
					undefined,
					{ cwd: directory.path },
				)
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('wrote 0 guides')
				expect(existsSync(join(directory.path, 'guides', 'src'))).toBe(false)
			} finally {
				await directory.cleanup()
			}
		}, 20000)

		it('R1: no package.json in --target exits 1 with a coded [TARGET] line, no raw stack', async () => {
			const directory = await buildTempDirectory()
			try {
				const result = runBin(['sync', '--target', '.'], undefined, { cwd: directory.path })
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[TARGET]')
				expect(result.stderr).not.toContain('at Object')
				expect(result.stderr).not.toContain('at async')
			} finally {
				await directory.cleanup()
			}
		})

		it('containment: --target escaping the cwd exits 1 with a coded [INVALID] message', async () => {
			const directory = await buildTempDirectory()
			try {
				const result = runBin(['sync', '--target', '..'], undefined, { cwd: directory.path })
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[INVALID]')
				expect(result.stderr).toMatch(/escapes the working directory/)
			} finally {
				await directory.cleanup()
			}
		})

		it('FIX 5: a GITHUB_TOKEN in the environment is picked up but never leaked into output', async () => {
			const directory = await writeManifest({ '@orkestrel/does-not-exist-xyz': '^1.0.0' })
			try {
				const result = runBin(
					['sync', '--target', '.', '--deps', '@orkestrel/does-not-exist-xyz'],
					undefined,
					{ cwd: directory.path, env: { GITHUB_TOKEN: 'test-marker-token-should-not-leak' } },
				)
				const output = result.stdout + result.stderr
				expect(output).not.toContain('test-marker-token-should-not-leak')
			} finally {
				await directory.cleanup()
			}
		}, 20000)
	})

	describe('audit', () => {
		it('happy dry-run: a clean scaffolded target has no drift', async () => {
			const directory = await buildTempDirectory()
			try {
				const created = runBin(
					['new', 'pkg', '--surfaces', 'core', '--apply', '--target', '.'],
					undefined,
					{ cwd: directory.path },
				)
				expect(created.status).toBe(0)

				const audited = runBin(['audit', '--target', '.'], undefined, { cwd: directory.path })
				expect(audited.status).toBe(0)
			} finally {
				await directory.cleanup()
			}
		})

		it('structural drift: a mutated file fails the audit', async () => {
			const directory = await buildTempDirectory()
			try {
				const created = runBin(
					['new', 'pkg', '--surfaces', 'core', '--apply', '--target', '.'],
					undefined,
					{ cwd: directory.path },
				)
				expect(created.status).toBe(0)
				writeFileSync(
					join(directory.path, 'package.json'),
					'{"name":"@orkestrel/pkg","mutated":true}',
				)

				const audited = runBin(['audit', '--target', '.'], undefined, { cwd: directory.path })
				expect(audited.status).toBe(1)
			} finally {
				await directory.cleanup()
			}
		})

		it('--live: an unreachable declared dependency counts as drift and exits 1', async () => {
			const directory = await writeManifest({ '@orkestrel/does-not-exist-xyz': '^1.0.0' })
			try {
				const result = runBin(['audit', '--target', '.', '--live'], undefined, {
					cwd: directory.path,
				})
				expect(result.status).toBe(1)
			} finally {
				await directory.cleanup()
			}
		}, 20000)

		it('R1: no package.json in --target exits 1 with a coded [TARGET] line, no raw stack', async () => {
			const directory = await buildTempDirectory()
			try {
				const result = runBin(['audit', '--target', '.'], undefined, { cwd: directory.path })
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[TARGET]')
				expect(result.stderr).not.toContain('at Object')
				expect(result.stderr).not.toContain('at async')
			} finally {
				await directory.cleanup()
			}
		})

		it("host mode: prints 'content-aware' when --host resolves; the DEFAULT host keeps presence-only when it cannot resolve (M1: only an EXPLICIT --host that fails is a coded TARGET failure — see the M1 test below)", async () => {
			const fixture = await buildHostFixture()
			const target = await buildTempDirectory()
			try {
				const created = runBin(
					[
						'new',
						'demo-audit-host-mode',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'.',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: target.path },
				)
				expect(created.status).toBe(0)

				const aware = runBin(['audit', '--target', '.', '--host', fixture.path], undefined, {
					cwd: target.path,
				})
				expect(aware.stdout).toContain('host: content-aware')
			} finally {
				await target.cleanup()
				await fixture.cleanup()
			}
		})

		it('M1: an EXPLICIT --host that does not resolve to a directory exits 1 with a coded [TARGET] line (never a silent presence-only downgrade)', async () => {
			const directory = await buildTempDirectory()
			try {
				const created = runBin(
					[
						'new',
						'demo-audit-explicit-host-missing',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'.',
					],
					undefined,
					{ cwd: directory.path },
				)
				expect(created.status).toBe(0)

				const missingHost = join(directory.path, 'does-not-exist-explicit-host')
				const result = runBin(['audit', '--target', '.', '--host', missingHost], undefined, {
					cwd: directory.path,
				})
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[TARGET]')
			} finally {
				await directory.cleanup()
			}
		})

		it('--groups orchestration: a repo with source drift but a CLEAN orchestration group exits 0 (CI can gate on a subset)', async () => {
			const directory = await buildTempDirectory()
			try {
				const created = runBin(
					['new', 'demo-audit-groups-clean', '--surfaces', 'core', '--apply', '--target', '.'],
					undefined,
					{ cwd: directory.path },
				)
				expect(created.status).toBe(0)
				// Source drift (outside the orchestration group) must NOT affect a
				// --groups orchestration gate.
				writeFileSync(join(directory.path, 'src', 'core', 'index.ts'), '// mutated\n')

				const result = runBin(['audit', '--target', '.', '--groups', 'orchestration'], undefined, {
					cwd: directory.path,
				})
				expect(result.status).toBe(0)
			} finally {
				await directory.cleanup()
			}
		})

		it('--groups bogus: an unrecognized group name exits 1 with a coded [INVALID] message', async () => {
			const directory = await buildTempDirectory()
			try {
				const created = runBin(
					['new', 'demo-audit-groups-bogus', '--surfaces', 'core', '--apply', '--target', '.'],
					undefined,
					{ cwd: directory.path },
				)
				expect(created.status).toBe(0)

				const result = runBin(['audit', '--target', '.', '--groups', 'bogus'], undefined, {
					cwd: directory.path,
				})
				expect(result.status).toBe(1)
				const output = result.stdout + result.stderr
				expect(output).toContain('[INVALID]')
				expect(output).toContain('bogus')
			} finally {
				await directory.cleanup()
			}
		})

		it('--host <fixture>: a mutated target file still flags drift (content-aware audit) and exits 1', async () => {
			const fixture = await buildHostFixture()
			const target = await buildTempDirectory()
			try {
				const created = runBin(
					[
						'new',
						'demo-audit-host-drift',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'.',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: target.path },
				)
				expect(created.status).toBe(0)
				writeFileSync(
					join(target.path, 'package.json'),
					'{"name":"@orkestrel/demo-audit-host-drift","mutated":true}',
				)

				const result = runBin(['audit', '--target', '.', '--host', fixture.path], undefined, {
					cwd: target.path,
				})
				expect(result.status).toBe(1)
				expect(result.stdout).toContain('host: content-aware')
			} finally {
				await target.cleanup()
				await fixture.cleanup()
			}
		})

		it('containment: --target escaping the cwd exits 1 with a coded [INVALID] message', async () => {
			const directory = await buildTempDirectory()
			try {
				const result = runBin(['audit', '--target', '..'], undefined, { cwd: directory.path })
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[INVALID]')
				expect(result.stderr).toMatch(/escapes the working directory/)
			} finally {
				await directory.cleanup()
			}
		})
	})

	describe('repair', () => {
		it('dry-run: reports a missing host artifact as drift and exits 1 without writing', async () => {
			const fixture = await buildHostFixture()
			const target = await buildTempDirectory()
			try {
				const created = runBin(
					[
						'new',
						'demo-repair-dry',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'.',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: target.path },
				)
				expect(created.status).toBe(0)

				// Host drift: the `.editorconfig` host artifact goes missing —
				// `diffPlan` audits host-origin artifacts by PRESENCE only, so a
				// present-but-mutated host file would never register as drift;
				// deleting it is the only way `repair` sees it as `missing`.
				rmSync(join(target.path, '.editorconfig'), { force: true })
				// A file `repair`'s plan does not own, under a `prune`-guarded directory.
				writeFileSync(join(target.path, 'scripts', 'rogue.sh'), '#!/bin/sh\necho rogue\n')

				const result = runBin(['repair', '--target', '.', '--host', fixture.path], undefined, {
					cwd: target.path,
				})
				expect(result.status).toBe(1)
				expect(result.stdout).toContain('# Audit')
				expect(result.stdout).toMatch(/missing: [1-9]/)
				expect(existsSync(join(target.path, '.editorconfig'))).toBe(false)
				expect(existsSync(join(target.path, 'scripts', 'rogue.sh'))).toBe(true)
			} finally {
				await target.cleanup()
				await fixture.cleanup()
			}
		})

		it('--apply: byte-restores the missing host artifact FROM the passed --host fixture, exits 0, and leaves an unrelated foreign file untouched', async () => {
			const scaffoldFixture = await buildHostFixture()
			const repairFixture = await buildHostFixture({
				'.editorconfig': 'root = true\n# fixture-b\n',
			})
			const target = await buildTempDirectory()
			try {
				const created = runBin(
					[
						'new',
						'demo-repair-apply',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'.',
						'--host',
						scaffoldFixture.path,
					],
					undefined,
					{ cwd: target.path },
				)
				expect(created.status).toBe(0)

				rmSync(join(target.path, '.editorconfig'), { force: true })
				writeFileSync(join(target.path, 'scripts', 'rogue.sh'), '#!/bin/sh\necho rogue\n')

				const result = runBin(
					['repair', '--target', '.', '--host', repairFixture.path, '--apply'],
					undefined,
					{ cwd: target.path },
				)
				expect(result.status).toBe(0)
				expect(result.stdout).toMatch(/wrote 0, copied 1, skipped \d+, removed 0/)

				const restored = readFileSync(join(target.path, '.editorconfig'), 'utf8')
				expect(restored).toBe('root = true\n# fixture-b\n')
				expect(restored).not.toBe(readFileSync(join(scaffoldFixture.path, '.editorconfig'), 'utf8'))
				expect(existsSync(join(target.path, 'scripts', 'rogue.sh'))).toBe(true) // no --prune
			} finally {
				await target.cleanup()
				await scaffoldFixture.cleanup()
				await repairFixture.cleanup()
			}
		})

		it('--apply --prune: also deletes the foreign file under scripts/', async () => {
			const fixture = await buildHostFixture()
			const target = await buildTempDirectory()
			try {
				const created = runBin(
					[
						'new',
						'demo-repair-prune',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'.',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: target.path },
				)
				expect(created.status).toBe(0)

				rmSync(join(target.path, '.editorconfig'), { force: true })
				writeFileSync(join(target.path, 'scripts', 'rogue.sh'), '#!/bin/sh\necho rogue\n')

				const result = runBin(
					['repair', '--target', '.', '--host', fixture.path, '--apply', '--prune'],
					undefined,
					{ cwd: target.path },
				)
				expect(result.status).toBe(0)
				expect(result.stdout).toMatch(/removed 1/)
				expect(existsSync(join(target.path, '.editorconfig'))).toBe(true)
				expect(existsSync(join(target.path, 'scripts', 'rogue.sh'))).toBe(false)
			} finally {
				await target.cleanup()
				await fixture.cleanup()
			}
		})

		it('H2: repair scopes to HOST-ORIGIN artifacts ONLY — a hand-modified src file is NEVER touched even when the target ALSO carries drifted host files; dry-run exit reflects only host drift', async () => {
			const fixture = await buildHostFixture()
			const target = await buildTempDirectory()
			try {
				const created = runBin(
					[
						'new',
						'demo-repair-host-scope',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'.',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: target.path },
				)
				expect(created.status).toBe(0)

				// A hand-modified SOURCE file — repair must never restore this,
				// since it is not a host-origin artifact.
				const srcPath = join(target.path, 'src', 'core', 'index.ts')
				writeFileSync(srcPath, '// hand-modified by the maintainer\n')

				// Genuine host drift alongside it.
				rmSync(join(target.path, '.editorconfig'), { force: true })

				const dryRun = runBin(['repair', '--target', '.', '--host', fixture.path], undefined, {
					cwd: target.path,
				})
				expect(dryRun.status).toBe(1) // reflects the host drift alone
				expect(dryRun.stdout).toMatch(/missing: [1-9]/)
				// The hand-modified src file is untouched by the dry-run audit —
				// its content is still what we hand-wrote.
				expect(readFileSync(srcPath, 'utf8')).toBe('// hand-modified by the maintainer\n')

				const applied = runBin(
					['repair', '--target', '.', '--host', fixture.path, '--apply'],
					undefined,
					{ cwd: target.path },
				)
				expect(applied.status).toBe(0)
				expect(existsSync(join(target.path, '.editorconfig'))).toBe(true)
				// The hand-modified src file is STILL untouched after --apply.
				expect(readFileSync(srcPath, 'utf8')).toBe('// hand-modified by the maintainer\n')
			} finally {
				await target.cleanup()
				await fixture.cleanup()
			}
		})

		it('--prune without --apply: prints the ignored-flag note and does not delete', async () => {
			const fixture = await buildHostFixture()
			const target = await buildTempDirectory()
			try {
				const created = runBin(
					[
						'new',
						'demo-repair-prune-noop',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'.',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: target.path },
				)
				expect(created.status).toBe(0)
				writeFileSync(join(target.path, 'scripts', 'rogue.sh'), '#!/bin/sh\necho rogue\n')

				const result = runBin(
					['repair', '--target', '.', '--host', fixture.path, '--prune'],
					undefined,
					{ cwd: target.path },
				)
				expect(result.status).toBe(0) // no other drift induced — dry-run reports clean
				expect(result.stderr).toMatch(/--prune is ignored on a dry run/i)
				expect(existsSync(join(target.path, 'scripts', 'rogue.sh'))).toBe(true)
			} finally {
				await target.cleanup()
				await fixture.cleanup()
			}
		})

		it('containment: --target escaping the cwd exits 1 with a coded [INVALID] message', async () => {
			const directory = await buildTempDirectory()
			try {
				const result = runBin(['repair', '--target', '..'], undefined, { cwd: directory.path })
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[INVALID]')
				expect(result.stderr).toMatch(/escapes the working directory/)
			} finally {
				await directory.cleanup()
			}
		})
	})

	describe('mirror', () => {
		it('dry-run: reports each child plus a total, ignores a non-@orkestrel dir, and prints the ci.yml exclusion note', async () => {
			const fixture = await buildHostFixture()
			const root = await buildTempDirectory()
			try {
				const clean = runBin(
					[
						'new',
						'fleet-clean',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'fleet-clean',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: root.path },
				)
				expect(clean.status).toBe(0)

				const drifted = runBin(
					[
						'new',
						'fleet-drifted',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'fleet-drifted',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: root.path },
				)
				expect(drifted.status).toBe(0)
				// In-scope host drift (mirror repairs this): the `.editorconfig` goes missing.
				rmSync(join(root.path, 'fleet-drifted', '.editorconfig'), { force: true })
				// Out-of-scope drift (mirror excludes ci.yml — must never repair it).
				rmSync(join(root.path, 'fleet-drifted', '.github', 'workflows', 'ci.yml'), { force: true })
				// A foreign file under a `.claude/agents/` mirror never enumerates via `diffPlan`.
				mkdirSync(join(root.path, 'fleet-drifted', '.claude', 'agents'), { recursive: true })
				writeFileSync(
					join(root.path, 'fleet-drifted', '.claude', 'agents', 'rogue.md'),
					'# rogue\n',
				)

				mkdirSync(join(root.path, 'not-orkestrel'), { recursive: true })
				writeFileSync(
					join(root.path, 'not-orkestrel', 'package.json'),
					JSON.stringify({ name: 'not-an-orkestrel-thing', version: '0.0.1' }),
				)

				const result = runBin(['mirror', '--root', '.', '--host', fixture.path], undefined, {
					cwd: root.path,
				})
				expect(result.status).toBe(1)
				expect(result.stdout).toContain('fleet-clean: clean')
				expect(result.stdout).toContain('fleet-drifted: drifted 0, missing 1, foreign 0')
				expect(result.stdout).toContain('ci.yml: repo-flavored, skipped')
				expect(result.stdout).toMatch(/total: 1 drifted, 0 failed/)
				expect(result.stdout).not.toContain('not-orkestrel')

				// Dry run writes nothing.
				expect(existsSync(join(root.path, 'fleet-drifted', '.editorconfig'))).toBe(false)
				expect(existsSync(join(root.path, 'fleet-drifted', '.claude', 'agents', 'rogue.md'))).toBe(
					true,
				)
			} finally {
				await root.cleanup()
				await fixture.cleanup()
			}
		})

		it('--apply: repairs in-scope drift and exits 0; ci.yml stays excluded (never restored); the foreign file is untouched without --prune', async () => {
			const fixture = await buildHostFixture()
			const root = await buildTempDirectory()
			try {
				const clean = runBin(
					[
						'new',
						'fleet-clean',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'fleet-clean',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: root.path },
				)
				expect(clean.status).toBe(0)

				const drifted = runBin(
					[
						'new',
						'fleet-drifted',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'fleet-drifted',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: root.path },
				)
				expect(drifted.status).toBe(0)
				rmSync(join(root.path, 'fleet-drifted', '.editorconfig'), { force: true })
				rmSync(join(root.path, 'fleet-drifted', '.github', 'workflows', 'ci.yml'), { force: true })
				mkdirSync(join(root.path, 'fleet-drifted', '.claude', 'agents'), { recursive: true })
				writeFileSync(
					join(root.path, 'fleet-drifted', '.claude', 'agents', 'rogue.md'),
					'# rogue\n',
				)

				const result = runBin(
					['mirror', '--root', '.', '--host', fixture.path, '--apply'],
					undefined,
					{ cwd: root.path },
				)
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('fleet-clean: clean')
				expect(result.stdout).toMatch(/fleet-drifted: repaired \(\d+ remaining\)/)

				expect(existsSync(join(root.path, 'fleet-drifted', '.editorconfig'))).toBe(true)
				// NEVER written by mirror, even though it went missing at the child.
				expect(existsSync(join(root.path, 'fleet-drifted', '.github', 'workflows', 'ci.yml'))).toBe(
					false,
				)
				// Untouched: mirror ran without --prune.
				expect(existsSync(join(root.path, 'fleet-drifted', '.claude', 'agents', 'rogue.md'))).toBe(
					true,
				)
			} finally {
				await root.cleanup()
				await fixture.cleanup()
			}
		})

		it('fault isolation: a child that fails to derive is reported [TARGET] and counted failed, without aborting the fleet loop', async () => {
			const fixture = await buildHostFixture()
			const root = await buildTempDirectory()
			try {
				const healthy = runBin(
					[
						'new',
						'fleet-healthy',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'fleet-healthy',
						'--host',
						fixture.path,
					],
					undefined,
					{ cwd: root.path },
				)
				expect(healthy.status).toBe(0)

				// A discoverable @orkestrel package (readable, parseable manifest —
				// see the deviation note on "unreadable package.json") that fails
				// `deriveBlueprint` (no `src/` directory at all): a coded TARGET
				// failure inside the per-package try, exercising the SAME
				// fault-isolation path the spec's "unreadable manifest" scenario
				// targets.
				mkdirSync(join(root.path, 'fleet-broken'), { recursive: true })
				writeFileSync(
					join(root.path, 'fleet-broken', 'package.json'),
					JSON.stringify({ name: '@orkestrel/fleet-broken', version: '0.0.1' }),
				)

				const result = runBin(['mirror', '--root', '.', '--host', fixture.path], undefined, {
					cwd: root.path,
				})
				expect(result.status).toBe(1)
				expect(result.stdout).toContain('fleet-healthy: clean')
				expect(result.stdout).toContain('fleet-broken: [TARGET]')
				expect(result.stdout).toMatch(/total: 0 drifted, 1 failed/)
			} finally {
				await root.cleanup()
				await fixture.cleanup()
			}
		})

		it('containment: --root escaping the cwd exits 1 with a coded [INVALID] message', async () => {
			const root = await buildTempDirectory()
			const sub = join(root.path, 'nested')
			mkdirSync(sub, { recursive: true })
			try {
				const result = runBin(['mirror', '--root', '..'], undefined, { cwd: sub })
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[INVALID]')
				expect(result.stderr).toMatch(/escapes the working directory/)
			} finally {
				await root.cleanup()
			}
		})
	})

	describe('catalog', () => {
		/** Writes a discoverable `@orkestrel/*` package: `package.json` (name/version) plus, when given, its `guides/src/<short>.md`. */
		function writeCatalogPackage(
			rootPath: string,
			directoryName: string,
			options: { readonly name: string; readonly version: string; readonly guide?: string },
		): void {
			const directory = join(rootPath, directoryName)
			mkdirSync(directory, { recursive: true })
			writeFileSync(
				join(directory, 'package.json'),
				JSON.stringify({ name: options.name, version: options.version }),
			)
			if (options.guide !== undefined) {
				const short = options.name.slice('@orkestrel/'.length)
				mkdirSync(join(directory, 'guides', 'src'), { recursive: true })
				writeFileSync(join(directory, 'guides', 'src', `${short}.md`), options.guide, 'utf8')
			}
		}

		/** Writes a fixture `.claude/agents/orkestrel.md` carrying the catalog markers around `body`. */
		function writeAgentFixture(targetPath: string, body: string): string {
			const agentPath = join(targetPath, '.claude', 'agents', 'orkestrel.md')
			mkdirSync(dirname(agentPath), { recursive: true })
			writeFileSync(
				agentPath,
				`# orkestrel\n\n## The catalog\n\n<!-- catalog:start -->\n${body}<!-- catalog:end -->\n\n## Other section\n`,
			)
			return agentPath
		}

		it('dry-run: reports the package count and exits nonzero on marker drift', async () => {
			const root = await buildTempDirectory()
			const target = await buildTempDirectory()
			try {
				writeCatalogPackage(root.path, 'router', {
					name: '@orkestrel/router',
					version: '0.0.5',
					guide: '# Router\n\n> A tiny hash-router.\n',
				})
				writeCatalogPackage(root.path, 'headless', {
					name: '@orkestrel/headless',
					version: '0.0.1',
				})
				const agentPath = writeAgentFixture(target.path, '\nstale content\n\n')

				const result = runBin(['catalog', '--root', root.path, '--target', '.'], undefined, {
					cwd: target.path,
				})

				expect(result.status).toBe(1)
				expect(result.stdout).toContain('2 packages')
				expect(result.stdout).toContain('1 without guide description: @orkestrel/headless')
				expect(readFileSync(agentPath, 'utf8')).toContain('stale content') // dry-run writes nothing
			} finally {
				await root.cleanup()
				await target.cleanup()
			}
		})

		it('--apply: writes the spliced table and a re-run exits 0 (clean)', async () => {
			const root = await buildTempDirectory()
			const target = await buildTempDirectory()
			try {
				writeCatalogPackage(root.path, 'router', {
					name: '@orkestrel/router',
					version: '0.0.5',
					guide: '# Router\n\n> A tiny hash-router.\n',
				})
				const agentPath = writeAgentFixture(target.path, '\nstale content\n\n')

				const applied = runBin(
					['catalog', '--root', root.path, '--target', '.', '--apply'],
					undefined,
					{ cwd: target.path },
				)
				expect(applied.status).toBe(0)

				const written = readFileSync(agentPath, 'utf8')
				expect(written).toContain('@orkestrel/router')
				expect(written).toContain('A tiny hash-router.')
				expect(written).not.toContain('stale content')
				expect(written).toContain('## Other section') // content after the end marker survives

				const rerun = runBin(['catalog', '--root', root.path, '--target', '.'], undefined, {
					cwd: target.path,
				})
				expect(rerun.status).toBe(0)
			} finally {
				await root.cleanup()
				await target.cleanup()
			}
		})

		it('a target missing either catalog marker exits a coded TARGET failure', async () => {
			const root = await buildTempDirectory()
			const target = await buildTempDirectory()
			try {
				writeCatalogPackage(root.path, 'router', { name: '@orkestrel/router', version: '0.0.5' })
				const agentPath = join(target.path, '.claude', 'agents', 'orkestrel.md')
				mkdirSync(dirname(agentPath), { recursive: true })
				writeFileSync(agentPath, '# orkestrel\n\nNo markers here at all.\n')

				const result = runBin(['catalog', '--root', root.path, '--target', '.'], undefined, {
					cwd: target.path,
				})

				expect(result.status).toBe(1)
				const output = result.stdout + result.stderr
				expect(output).toContain('[TARGET]')
				expect(output).toContain('catalog:start')
			} finally {
				await root.cleanup()
				await target.cleanup()
			}
		})

		it('merges multiple --root values into one sorted, deduplicated table', async () => {
			const first = await buildTempDirectory()
			const second = await buildTempDirectory()
			const target = await buildTempDirectory()
			try {
				writeCatalogPackage(first.path, 'router', {
					name: '@orkestrel/router',
					version: '0.0.1',
					guide: '# Router\n\n> Stale.\n',
				})
				writeCatalogPackage(second.path, 'router', {
					name: '@orkestrel/router',
					version: '0.0.2',
					guide: '# Router\n\n> Fresh.\n',
				})
				writeCatalogPackage(second.path, 'alpha', {
					name: '@orkestrel/alpha',
					version: '0.0.1',
					guide: '# Alpha\n\n> An alpha package.\n',
				})
				const agentPath = writeAgentFixture(target.path, '\n')

				const result = runBin(
					['catalog', '--root', first.path, '--root', second.path, '--target', '.', '--apply'],
					undefined,
					{ cwd: target.path },
				)

				expect(result.status).toBe(0)
				const written = readFileSync(agentPath, 'utf8')
				expect(written).toContain('@orkestrel/router | 0.0.2') // the second root's entry wins
				expect(written).not.toContain('@orkestrel/router | 0.0.1')
				expect(written).toContain('Fresh.')
				expect(written).toContain('@orkestrel/alpha')
				expect(result.stdout).toContain('2 packages')
			} finally {
				await first.cleanup()
				await second.cleanup()
				await target.cleanup()
			}
		})

		it('containment: --target escaping the cwd exits 1 with a coded [INVALID] message (its unrestricted --root is unaffected)', async () => {
			const root = await buildTempDirectory()
			const target = await buildTempDirectory()
			try {
				writeCatalogPackage(root.path, 'router', { name: '@orkestrel/router', version: '0.0.5' })

				const result = runBin(['catalog', '--root', root.path, '--target', '..'], undefined, {
					cwd: target.path,
				})
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[INVALID]')
				expect(result.stderr).toMatch(/escapes the working directory/)
			} finally {
				await root.cleanup()
				await target.cleanup()
			}
		})
	})

	describe('argument handling', () => {
		it('--help: prints the three-verb usage and exits 0', () => {
			const result = runBin(['--help'])
			expect(result.status).toBe(0)
			expect(result.stdout).toContain('Usage: scaffold')
			expect(result.stdout).toContain('new <name>')
			expect(result.stdout).toContain('sync')
			expect(result.stdout).toContain('audit')
		})

		it('--help: states the dry-run-by-default and output-location facts up front, plus a Windows note', () => {
			const result = runBin(['--help'])
			expect(result.status).toBe(0)
			expect(result.stdout).toMatch(/DRY RUN by default/)
			expect(result.stdout).toMatch(/--apply to write/)
			expect(result.stdout).toContain('./<name>')
			expect(result.stdout).toMatch(/prompts for what's missing/)
			expect(result.stdout).toMatch(/PowerShell/)
			expect(result.stdout).toMatch(/npm run scaffold -- /)
		})

		it('--help: states the write-destination containment rule', () => {
			const result = runBin(['--help'])
			expect(result.status).toBe(0)
			expect(result.stdout).toMatch(/resolves? under the current directory/)
			expect(result.stdout).toMatch(/--host may point anywhere/)
		})

		it('--help: lists a worked example line per verb', () => {
			const result = runBin(['--help'])
			expect(result.stdout).toContain('e.g. scaffold new widget --surfaces core,server --apply')
			expect(result.stdout).toContain('e.g. scaffold audit --groups configs,docs')
			expect(result.stdout).toContain('e.g. cd ../fleet-root && scaffold mirror --apply')
		})

		it("leading \"--\" passthrough (PowerShell/npm residue): ['--', '--help'] behaves like ['--help']", () => {
			const result = runBin(['--', '--help'])
			expect(result.status).toBe(0)
			expect(result.stdout).toContain('Usage: scaffold')
		})

		it("leading \"--\" passthrough: ['--', 'new', ...] behaves identically to ['new', ...]", () => {
			const control = runBin(['new', '--surfaces', 'core'], 'demo-dash-control\n')
			const withDash = runBin(['--', 'new', '--surfaces', 'core'], 'demo-dash-control\n')
			expect(withDash.status).toBe(control.status)
			expect(withDash.stdout).toContain('## Summary')
			expect(withDash.stdout).toBe(control.stdout)
		})

		it('no verb: prints usage to stderr and exits 1', () => {
			const result = runBin([])
			expect(result.status).toBe(1)
			expect(result.stderr).toContain('Usage: scaffold')
		})

		it('unrecognized verb: prints a controlled message and exits 1', () => {
			const result = runBin(['frobnicate'])
			expect(result.status).toBe(1)
			expect(result.stderr).toContain('frobnicate')
			expect(result.stderr).toContain('Usage: scaffold')
		})

		it('H3: an unknown flag never crashes with a raw parseArgs stack — controlled usage, exit 1', () => {
			const result = runBin(['new', 'demo', '--this-flag-does-not-exist'])
			expect(result.status).toBe(1)
			expect(result.stderr).not.toContain('ERR_PARSE_ARGS_UNKNOWN_OPTION')
			expect(result.stderr).not.toContain('at Object')
			expect(result.stderr).toContain('Usage: scaffold')
		})

		it('L2: repeated flags — last occurrence wins (documented in --help)', () => {
			const result = runBin(['--help'])
			expect(result.stdout).toMatch(/keeps its LAST occurrence/i)
		})

		it('--help: lists all six verbs and the --host/--prune/--root flags', () => {
			const result = runBin(['--help'])
			expect(result.status).toBe(0)
			expect(result.stdout).toContain('new <name>')
			expect(result.stdout).toContain('sync')
			expect(result.stdout).toContain('audit')
			expect(result.stdout).toContain('repair')
			expect(result.stdout).toContain('mirror')
			expect(result.stdout).toContain('catalog')
			expect(result.stdout).toContain('--host')
			expect(result.stdout).toContain('--prune')
			expect(result.stdout).toContain('--root')
		})
	})
})
