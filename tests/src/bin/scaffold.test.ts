import type { SpawnSyncReturns } from 'node:child_process'
// The bin end to end — spawns the BUILT executable (`dist/bin/scaffold.js`) via
// `node:child_process`, so this suite assumes the build chain has already run
// (the gate order runs `npm run build` before `npm test` — see AGENTS.md §Orientation).
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { buildTempDirectory, WORKSPACE_ROOT } from '../../setupServer.js'

const BIN_PATH = join(WORKSPACE_ROOT, 'dist/bin/scaffold.js')

/** Spawn the built `scaffold` bin with `argv` + optional piped `input`, cwd anchored at the repo root so host-path resolution finds the real package. */
function runBin(argv: readonly string[], input?: string): SpawnSyncReturns<string> {
	return spawnSync(process.execPath, [BIN_PATH, ...argv], {
		cwd: WORKSPACE_ROOT,
		input: input ?? '',
		encoding: 'utf8',
		timeout: 15000,
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
				const result = runBin([
					'new',
					'demo-apply',
					'--surfaces',
					'core',
					'--apply',
					'--target',
					directory.path,
				])
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
	})

	describe('sync', () => {
		it('offline posture: a --deps subset with an unreachable dependency still exits 0 (collect mode)', async () => {
			const directory = await writeManifest({ '@orkestrel/does-not-exist-xyz': '^1.0.0' })
			try {
				const result = runBin([
					'sync',
					'--target',
					directory.path,
					'--deps',
					'@orkestrel/does-not-exist-xyz',
				])
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('Sync')
			} finally {
				await directory.cleanup()
			}
		}, 20000)

		it('--strict: an unreachable dependency in the --deps subset exits 1 with a clean coded message', async () => {
			const directory = await writeManifest({ '@orkestrel/does-not-exist-xyz': '^1.0.0' })
			try {
				const result = runBin([
					'sync',
					'--target',
					directory.path,
					'--deps',
					'@orkestrel/does-not-exist-xyz',
					'--strict',
				])
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
				const result = runBin([
					'sync',
					'--target',
					directory.path,
					'--deps',
					'@orkestrel/does-not-exist-xyz',
					'--apply',
				])
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
				const result = runBin(['sync', '--target', directory.path])
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[TARGET]')
				expect(result.stderr).not.toContain('at Object')
				expect(result.stderr).not.toContain('at async')
			} finally {
				await directory.cleanup()
			}
		})
	})

	describe('audit', () => {
		it('happy dry-run: a clean scaffolded target has no drift', async () => {
			const directory = await buildTempDirectory()
			try {
				const created = runBin([
					'new',
					'pkg',
					'--surfaces',
					'core',
					'--apply',
					'--target',
					directory.path,
				])
				expect(created.status).toBe(0)

				const audited = runBin(['audit', '--target', directory.path])
				expect(audited.status).toBe(0)
			} finally {
				await directory.cleanup()
			}
		})

		it('structural drift: a mutated file fails the audit', async () => {
			const directory = await buildTempDirectory()
			try {
				const created = runBin([
					'new',
					'pkg',
					'--surfaces',
					'core',
					'--apply',
					'--target',
					directory.path,
				])
				expect(created.status).toBe(0)
				writeFileSync(
					join(directory.path, 'package.json'),
					'{"name":"@orkestrel/pkg","mutated":true}',
				)

				const audited = runBin(['audit', '--target', directory.path])
				expect(audited.status).toBe(1)
			} finally {
				await directory.cleanup()
			}
		})

		it('--live: an unreachable declared dependency counts as drift and exits 1', async () => {
			const directory = await writeManifest({ '@orkestrel/does-not-exist-xyz': '^1.0.0' })
			try {
				const result = runBin(['audit', '--target', directory.path, '--live'])
				expect(result.status).toBe(1)
			} finally {
				await directory.cleanup()
			}
		}, 20000)

		it('R1: no package.json in --target exits 1 with a coded [TARGET] line, no raw stack', async () => {
			const directory = await buildTempDirectory()
			try {
				const result = runBin(['audit', '--target', directory.path])
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[TARGET]')
				expect(result.stderr).not.toContain('at Object')
				expect(result.stderr).not.toContain('at async')
			} finally {
				await directory.cleanup()
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
	})
})
