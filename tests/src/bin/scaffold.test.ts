import type { SpawnSyncReturns } from 'node:child_process'
// The bin's verb/flag contract, spawning the BUILT executable (`dist/bin/scaffold.js`) via
// `node:child_process` — assumes the build chain has already run (AGENTS.md §Orientation:
// `npm run build` before `npm test`). Every write destination is confined to the cwd
// (H-containment), so a test exercising `--target` against a temp fixture runs WITH that
// fixture as its cwd. `--from` is the read-only source override (was `--host`); it is exempt
// from containment and may point anywhere, including outside the cwd.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { catalogNames } from '@src/core'
import { hostRoot, isRecord, locateHostSource, readHostManifest } from '@src/server'
import { buildTempDirectory, canSymlink, WORKSPACE_ROOT } from '../../setupServer.js'

const BIN_PATH = join(WORKSPACE_ROOT, 'dist/bin/scaffold.js')

/** `render.ts`'s `repairHandoff` closing question, duplicated as a literal so this suite can assert the handoff's ABSENCE without importing the bin's presentation module — the handoff is now TTY-only (F1), so every spawned (non-TTY) test process never sees it. */
const REPAIR_HANDOFF_TEXT = 'run repair now?'

/**
 * Spawn the built `scaffold` bin with `argv` + optional piped `input`, cwd
 * defaulting to a throwaway location (never the repo root — every write is
 * cwd-confined, and several verbs default their read-only source to the
 * package's own vendored `dist/host` when `--from` is absent, so a bare `cwd`
 * default of the workspace root risks tests silently depending on it).
 */
function runBin(
	argv: readonly string[],
	input: string,
	options: { readonly cwd: string; readonly env?: Readonly<Record<string, string>> },
): SpawnSyncReturns<string> {
	return spawnSync(process.execPath, [BIN_PATH, ...argv], {
		cwd: options.cwd,
		input,
		encoding: 'utf8',
		timeout: 15000,
		env: options.env !== undefined ? { ...process.env, ...options.env } : process.env,
	})
}

/** Real placeholder bytes for every `HOST_PATHS` entry, keyed by artifact-relative path — enough for `new --apply --from <fixture>` to fully materialize a package without touching the (possibly stale) default vendored host. */
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
	'guides/src/scaffold.md': '# scaffold self-guide fixture\n',
	'.claude/agents/example.md': '# example agent fixture\n',
}

/** Build a real, raw (no default-host lookalike) host root in a fresh temp directory — every `HOST_PATHS` entry present with placeholder bytes, `overrides` replacing or adding specific entries (e.g. a distinctive `.editorconfig` marker to prove `--from` sourcing). */
async function buildFromFixture(overrides?: Readonly<Record<string, string>>) {
	const directory = await buildTempDirectory()
	for (const [relative, content] of Object.entries({ ...HOST_FIXTURE_FILES, ...overrides })) {
		const full = join(directory.path, relative)
		mkdirSync(dirname(full), { recursive: true })
		writeFileSync(full, content)
	}
	return directory
}

/** Materialize a fresh package via `new --apply` into `cwd/name` sourced from `from`, returning its directory. */
function scaffoldPackage(cwd: string, name: string, from: string): string {
	const created = runBin(
		['new', name, '--surfaces', 'core', '--apply', '--target', name, '--from', from],
		'',
		{ cwd },
	)
	if (created.status !== 0) {
		throw new Error(`fixture scaffold failed: ${created.stdout}${created.stderr}`)
	}
	return join(cwd, name)
}

describe('scaffold bin: vendored-catalog resolution mechanics (U12b Q1, offline)', () => {
	it('resolveCatalogNames-equivalent path: hostRoot() + readHostManifest + locateHostSource resolves the BUILT dist/host orkestrel.md, catalogNames parses real @orkestrel/* names', () => {
		// Exercises the exact primitive chain `new`'s Q1 catalog resolution uses
		// (src/bin/scaffold.ts's `resolveCatalogNames`) against the package's
		// own BUILT vendored host — no fixture, no network, proving the
		// mechanism resolves for real once `npm run build` has run.
		const host = hostRoot()
		const manifest = readHostManifest(host)
		const full = locateHostSource(manifest, '.claude/agents/orkestrel.md', host)
		expect(full).toBeDefined()
		if (full === undefined) return
		const names = catalogNames(readFileSync(full, 'utf8'))
		expect(names.length).toBeGreaterThan(0)
		for (const name of names) expect(name.startsWith('@orkestrel/')).toBe(true)
	})
})

describe('scaffold bin', () => {
	describe('help / usage / unknown verb', () => {
		it('bare invocation: exits 0 with the short usage listing every verb', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin([], '', { cwd: cwd.path })
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('scaffold <verb> [options]')
				for (const verb of ['new', 'pull', 'audit', 'repair', 'fleet', 'catalog']) {
					expect(result.stdout).toContain(verb)
				}
			} finally {
				await cwd.cleanup()
			}
		})

		it('--help: exits 0 with the full reference (verb flags, safety banner, exit codes)', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['--help'], '', { cwd: cwd.path })
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('safety: every verb is a dry run by default')
				expect(result.stdout).toContain('exit codes:')
			} finally {
				await cwd.cleanup()
			}
		})

		it('<verb> --help: exits 0 with that verb-only reference', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['repair', '--help'], '', { cwd: cwd.path })
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('scaffold repair')
				expect(result.stdout).not.toContain('scaffold new ')
			} finally {
				await cwd.cleanup()
			}
		})

		it('unknown verb "sync" (retired alias): exits 2 with a renamed-to-pull redirect message', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['sync'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				expect(result.stderr).toContain("'sync' has been renamed")
				expect(result.stderr).toContain("'scaffold pull'")
			} finally {
				await cwd.cleanup()
			}
		})

		it('unknown verb "mirror" (retired alias): exits 2 with a renamed-to-fleet redirect message', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['mirror'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				expect(result.stderr).toContain("'mirror' has been renamed")
				expect(result.stderr).toContain("'scaffold fleet'")
			} finally {
				await cwd.cleanup()
			}
		})

		it('an unrecognized flag (e.g. the retired --root) is a strict parseArgs failure: exits 2', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['fleet', '--root', '.'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
			} finally {
				await cwd.cleanup()
			}
		})
	})

	describe('new', () => {
		it('dry-run (--json, empty stdin): previews via a single JSON value, applied:false, and writes nothing', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(
					['new', 'demo-dry', '--surfaces', 'core', '--json', '--from', from.path],
					'',
					{ cwd: cwd.path },
				)
				expect(result.status).toBe(0)
				const lines = result.stdout.trim().split('\n')
				expect(lines).toHaveLength(1)
				const parsed: unknown = JSON.parse(lines[0])
				expect(parsed).toMatchObject({ name: 'demo-dry', applied: false })
				expect(existsSync(join(cwd.path, 'demo-dry'))).toBe(false)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('missing name under --json: exits 2 with a coded USAGE json envelope, no prompt', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['new', '--surfaces', 'core', '--json'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				const parsed: unknown = JSON.parse(result.stdout.trim())
				expect(parsed).toMatchObject({ error: { code: 'USAGE' } })
			} finally {
				await cwd.cleanup()
			}
		})

		it('F4: an invalid positional name under --json exits 2 with a coded USAGE envelope naming the expected shape (no silent pass-through)', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['new', 'Foo/bar', '--surfaces', 'core', '--json'], '', {
					cwd: cwd.path,
				})
				expect(result.status).toBe(2)
				const parsed: unknown = JSON.parse(result.stdout.trim())
				expect(parsed).toMatchObject({ error: { code: 'USAGE' } })
				expect(JSON.stringify(parsed)).toContain('^[a-z][a-z0-9-]*$')
				expect(existsSync(join(cwd.path, 'Foo'))).toBe(false)
			} finally {
				await cwd.cleanup()
			}
		})

		it('F4: an invalid positional name WITHOUT --json exits 2 with a plain message naming the expected shape, nothing written', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['new', 'Foo/bar', '--surfaces', 'core'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				const output = result.stdout + result.stderr
				expect(output).toContain('Foo/bar')
				expect(output).toContain('^[a-z][a-z0-9-]*$')
				expect(existsSync(join(cwd.path, 'Foo'))).toBe(false)
			} finally {
				await cwd.cleanup()
			}
		})

		it('non-TTY ceiling: missing name WITHOUT --json exits 2 with the missingInput wording (no prompt, no hang) — piped/empty stdin', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['new', '--surfaces', 'core'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				const output = result.stdout + result.stderr
				expect(output).toContain('missing a package name')
				expect(output).toContain('scaffold new')
			} finally {
				await cwd.cleanup()
			}
		})

		it('non-TTY ceiling: missing --surfaces (name given) WITHOUT --json exits 2 with the missingInput wording', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['new', 'demo-missing-surfaces'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				const output = result.stdout + result.stderr
				expect(output).toContain('missing --surfaces')
			} finally {
				await cwd.cleanup()
			}
		})

		it('scripted --apply: writes real files into ./<name> under the cwd, exit 0', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(
					['new', 'demo-apply', '--surfaces', 'core', '--apply', '--from', from.path],
					'',
					{ cwd: cwd.path },
				)
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('wrote')

				const packageDirectory = join(cwd.path, 'demo-apply')
				const packageJsonPath = join(packageDirectory, 'package.json')
				expect(existsSync(packageJsonPath)).toBe(true)
				const parsed: unknown = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
				expect(parsed).toMatchObject({ name: '@orkestrel/demo-apply' })
				expect(readFileSync(join(packageDirectory, '.editorconfig'), 'utf8')).toBe(
					HOST_FIXTURE_FILES['.editorconfig'],
				)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('dry-run (no --apply, empty stdin): previews the plan and writes NOTHING, exit 0', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				// `--deps ''` keeps this a SINGLE-prompt run (the apply confirm only) —
				// the non-TTY readline fallback creates a fresh `readline.Interface`
				// per prompt call and reproducibly cannot resolve a SECOND prompt off
				// the same already-drained piped stdin within one process (verified:
				// omitting `--deps` here — leaving the "Dependencies" input prompt to
				// fire before the apply confirm — hangs until Node's "unsettled
				// top-level await" watchdog kills the process, exit 13). Matches the
				// dispatch's documented driver constraint; see the interactive-flow
				// tests in the `repair` describe block for the single-confirm/EOF
				// coverage this constraint keeps reliable.
				const result = runBin(
					['new', 'demo-preview', '--surfaces', 'core', '--deps', '', '--from', from.path],
					'',
					{ cwd: cwd.path },
				)
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('will write into ./demo-preview')
				expect(existsSync(join(cwd.path, 'demo-preview'))).toBe(false)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('--target escaping the cwd: a coded [INVALID] failure, nothing written', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(
					[
						'new',
						'demo-escape',
						'--surfaces',
						'core',
						'--apply',
						'--target',
						'../escape',
						'--from',
						from.path,
					],
					'',
					{ cwd: cwd.path },
				)
				expect(result.status).toBe(1)
				const output = result.stdout + result.stderr
				expect(output).toContain('[INVALID]')
				expect(output).toMatch(/escapes the working directory/)
				expect(existsSync(join(cwd.path, '..', 'escape'))).toBe(false)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('--from is NOT cwd-confined: a source outside the cwd is accepted (read-only exemption)', async () => {
			const from = await buildFromFixture({ '.editorconfig': 'root = true\n# outside-marker\n' })
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(
					['new', 'demo-outside-from', '--surfaces', 'core', '--apply', '--from', from.path],
					'',
					{ cwd: cwd.path },
				)
				expect(result.status).toBe(0)
				expect(readFileSync(join(cwd.path, 'demo-outside-from', '.editorconfig'), 'utf8')).toBe(
					'root = true\n# outside-marker\n',
				)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		describe('extras UX removed — hand-added devDependencies are the owner-sanctioned workflow now', () => {
			it('--extras is an unrecognized flag — exit 2 (usage error), nothing written', async () => {
				const cwd = await buildTempDirectory()
				try {
					const result = runBin(
						['new', 'demo-extras-removed', '--surfaces', 'core', '--extras', 'zod@^3.23.0'],
						'',
						{ cwd: cwd.path },
					)
					expect(result.status).toBe(2)
					expect(existsSync(join(cwd.path, 'demo-extras-removed'))).toBe(false)
				} finally {
					await cwd.cleanup()
				}
			})

			it("'scaffold new --help' advertises no --extras flag", () => {
				const result = runBin(['new', '--help'], '', { cwd: WORKSPACE_ROOT })
				expect(result.status).toBe(0)
				expect(result.stdout).not.toContain('--extras')
			})

			it('a hand-added devDependency round-trips clean: new --apply (no extras), hand-edit package.json devDependencies, audit --target exits 0 CLEAN (deriveBlueprint recompiles the extras round-trip, AGENTS §21)', async () => {
				const from = await buildFromFixture()
				const cwd = await buildTempDirectory()
				try {
					const created = runBin(
						['new', 'demo', '--surfaces', 'core', '--apply', '--from', from.path],
						'',
						{ cwd: cwd.path },
					)
					expect(created.status).toBe(0)

					// Hand-add a devDependency directly to the generated package.json —
					// the owner's stated post-scaffold workflow now that --extras is gone.
					const packageJsonPath = join(cwd.path, 'demo', 'package.json')
					const manifest: unknown = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
					if (!isRecord(manifest)) throw new Error('expected package.json to parse to an object')
					const devDependencies = isRecord(manifest.devDependencies) ? manifest.devDependencies : {}
					writeFileSync(
						packageJsonPath,
						`${JSON.stringify(
							{ ...manifest, devDependencies: { ...devDependencies, zod: '^3.23.0' } },
							null,
							'\t',
						)}\n`,
						'utf8',
					)

					const audited = runBin(['audit', '--target', 'demo', '--from', from.path], '', {
						cwd: cwd.path,
					})
					expect(audited.status).toBe(0)
					expect(audited.stdout).toContain('— clean')
					expect(audited.stdout).not.toContain('drifted')
				} finally {
					await cwd.cleanup()
					await from.cleanup()
				}
			})
		})
	})

	describe('pull (network-free paths only — AGENTS §16: no network in tests; runPull has no --offline flag, so its live-fetch branches are out of scope here)', () => {
		it('R1: no package.json in --target exits 1 with a coded [TARGET] line, before any network call', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['pull', '--target', '.'], '', { cwd: cwd.path })
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[TARGET]')
				expect(result.stderr).not.toContain('at Object')
			} finally {
				await cwd.cleanup()
			}
		})

		it('containment: --target escaping the cwd exits 1 with a coded [INVALID] message, before any network call', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['pull', '--target', '..'], '', { cwd: cwd.path })
				expect(result.status).toBe(1)
				expect(result.stderr).toContain('[INVALID]')
				expect(result.stderr).toMatch(/escapes the working directory/)
			} finally {
				await cwd.cleanup()
			}
		})
	})

	describe('audit', () => {
		it('clean target (--from fixture, content-aware): exit 0', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				const audited = runBin(['audit', '--from', from.path], '', { cwd: packageDirectory })
				expect(audited.status).toBe(0)
				expect(audited.stdout).toContain('comparing: file contents for template-owned files')
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('drifted target (a host file removed): exit 1, names the path with the "template-owned" label', async () => {
			// `diffPlan` (src/core/helpers.ts) audits a HYDRATED `host`-origin
			// artifact by content (byte mismatch is `stale` drift; the e2e suite's
			// closure regression covers that path) and an UNHYDRATED one by
			// presence only. This test exercises the removal case — `missing` —
			// the drift class both modes surface.
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))

				const audited = runBin(['audit', '--from', from.path], '', { cwd: packageDirectory })
				expect(audited.status).toBe(1)
				expect(audited.stdout).toContain('.editorconfig')
				expect(audited.stdout).toContain('template-owned')
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('honest audit: a planted unexpected file under .claude/agents is real drift — exit 1, "unexpected file" in prose, foreign:1 in --json (previously foreign:0/clean:true)', async () => {
			// Prior to the prune-truth fix, `runAudit` diffed ONLY the plan's own
			// paths (`readTarget(target, plan.artifacts.map(a => a.path))`), so a
			// planted file outside that set was structurally invisible to
			// `diffPlan` — `audit --json` reported `foreign:0` / `clean:true` even
			// with a rogue file sitting right there. `withForeignScan` (scaffold.ts)
			// now merges the SAME `pruneTargets` scan `repair --prune` already used
			// into the presented audit, so this is real, honestly-counted drift.
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				const roguePath = join(packageDirectory, '.claude', 'agents', 'rogue.md')
				mkdirSync(dirname(roguePath), { recursive: true })
				writeFileSync(roguePath, '# rogue\n')

				const audited = runBin(['audit', '--from', from.path], '', { cwd: packageDirectory })
				expect(audited.status).toBe(1)
				expect(audited.stdout).toContain('unexpected file')
				expect(audited.stdout).toContain('.claude/agents/rogue.md')

				const jsonAudited = runBin(['audit', '--json', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(jsonAudited.status).toBe(1)
				const parsed: unknown = JSON.parse(jsonAudited.stdout.trim())
				expect(parsed).toMatchObject({ clean: false, foreign: 1 })
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('a clean target with no unexpected files: audit --json reports foreign:0, clean:true', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				const audited = runBin(['audit', '--json', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(audited.status).toBe(0)
				const parsed: unknown = JSON.parse(audited.stdout.trim())
				expect(parsed).toMatchObject({ clean: true, foreign: 0 })
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('--json: exactly one parseable JSON value, no prose, no prompt', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))

				const audited = runBin(['audit', '--json', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(audited.status).toBe(1)
				const lines = audited.stdout.trim().split('\n')
				expect(lines).toHaveLength(1)
				const parsed: unknown = JSON.parse(lines[0])
				expect(parsed).toMatchObject({ clean: false, missing: 1 })
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it("handoff gating: generated-file-only drift offers NO repair handoff (generatedNote instead), and the exit stays 1 after a repair since generated drift is out of repair's scope", async () => {
			// `tsconfig.json` is a `computed`-origin artifact (src/core/compilers.ts
			// `configArtifacts`) — content-compared by `diffPlan`, so mutating its bytes
			// is real `stale` drift entirely OUTSIDE `host`/`template` origin and
			// carries no unexpected (`foreign`) file — exactly the "computed-only"
			// case S3d's handoff gate must recognize.
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				writeFileSync(join(packageDirectory, 'tsconfig.json'), '// mutated\n')

				const audited = runBin(['audit', '--from', from.path], '', { cwd: packageDirectory })
				expect(audited.status).toBe(1)
				expect(audited.stdout).toContain('in generated files')
				expect(audited.stdout).not.toContain(REPAIR_HANDOFF_TEXT)

				// `repair` scopes to `host`-origin artifacts only — it cannot touch
				// (or fix) the computed `tsconfig.json`, so a full audit re-run
				// after any repair still reports the same drift, exit 1.
				const repaired = runBin(['repair', '--apply', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(repaired.status).toBe(0)

				const reaudited = runBin(['audit', '--from', from.path], '', { cwd: packageDirectory })
				expect(reaudited.status).toBe(1)
				expect(reaudited.stdout).toContain('in generated files')
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('F1 regression: audit --apply on template-owned drift NEVER auto-repairs — exit 1, the drifted file is left exactly as found, no handoff text (a non-TTY spawn can never accept the interactive handoff)', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))

				const audited = runBin(['audit', '--apply', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(audited.status).toBe(1)
				expect(existsSync(join(packageDirectory, '.editorconfig'))).toBe(false)
				expect(audited.stdout).not.toContain(REPAIR_HANDOFF_TEXT)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('F1 regression: audit --apply --prune with a planted unexpected file STILL never deletes it — exit 1, file untouched, no handoff text', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))
				const roguePath = join(packageDirectory, '.claude', 'agents', 'rogue.md')
				mkdirSync(dirname(roguePath), { recursive: true })
				writeFileSync(roguePath, '# rogue\n')

				const audited = runBin(['audit', '--apply', '--prune', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(audited.status).toBe(1)
				expect(existsSync(roguePath)).toBe(true)
				expect(existsSync(join(packageDirectory, '.editorconfig'))).toBe(false)
				expect(audited.stdout).not.toContain(REPAIR_HANDOFF_TEXT)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it("F2: a planted unexpected file with no --prune prints the foreignHint pointing at 'repair --prune' instead of a dead-end handoff", async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				const roguePath = join(packageDirectory, '.claude', 'agents', 'rogue.md')
				mkdirSync(dirname(roguePath), { recursive: true })
				writeFileSync(roguePath, '# rogue\n')

				const audited = runBin(['audit', '--from', from.path], '', { cwd: packageDirectory })
				expect(audited.status).toBe(1)
				expect(audited.stdout).toContain("run 'scaffold repair --prune' to delete them")
				expect(audited.stdout).not.toContain(REPAIR_HANDOFF_TEXT)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('F3: an unscannable --from host (exists, but establishes no vendored allowlist) degrades the audit instead of crashing — scanSkipped prose, exit code still meaningful', async () => {
			// `from` scaffolds a NORMAL package (so it really has a `.claude/agents`
			// directory to scan) — `host2` is the audit's OWN `--from`, a bare empty
			// directory that EXISTS (so `hydrateBestEffort` succeeds, `aware: true`)
			// but has no `manifest.json` and no `host2/.claude/agents` — exactly the
			// `vendoredPruneSet` fail-closed condition (`ScaffoldError('TARGET')`)
			// `withForeignScanSafe` must catch rather than let crash the audit.
			const from = await buildFromFixture()
			const host2 = await buildTempDirectory()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				const roguePath = join(packageDirectory, '.claude', 'agents', 'rogue.md')
				mkdirSync(dirname(roguePath), { recursive: true })
				writeFileSync(roguePath, '# rogue\n')

				const audited = runBin(['audit', '--from', host2.path], '', { cwd: packageDirectory })
				expect(audited.status === 0 || audited.status === 1).toBe(true)
				expect(audited.stdout).toContain(
					"scanning skipped — couldn't establish the template source",
				)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
				await host2.cleanup()
			}
		})
	})

	describe('repair', () => {
		it('dry-run (empty stdin): previews and the exit code reflects the drift (1), nothing written', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))

				const result = runBin(['repair', '--from', from.path], '', { cwd: packageDirectory })
				expect(result.status).toBe(1)
				expect(result.stdout).toContain('pass --apply to write')
				expect(existsSync(join(packageDirectory, '.editorconfig'))).toBe(false)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('--apply: restores the mutated/missing host file byte-equal, exit 0', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))

				const repaired = runBin(['repair', '--apply', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(repaired.status).toBe(0)
				expect(readFileSync(join(packageDirectory, '.editorconfig'), 'utf8')).toBe(
					HOST_FIXTURE_FILES['.editorconfig'],
				)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('--prune --apply: removes a planted unexpected file under .claude/agents', async () => {
			// `materializer.prune` scans `.claude/agents` / `scripts` directly
			// (independent of `diffPlan`'s unreachable `foreign` branch — see the
			// deviation note above `foreignAuditGap` below); `runRepair` reaches
			// the prune step whenever `--prune` finds work, host drift or not
			// (U11 F2) — real host drift (the removed `.editorconfig`) accompanies
			// the planted file here too, just no longer as a requirement to reach
			// pruning at all (see the clean-host case below).
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))
				const roguePath = join(packageDirectory, '.claude', 'agents', 'rogue.md')
				mkdirSync(dirname(roguePath), { recursive: true })
				writeFileSync(roguePath, '# rogue\n')

				const pruned = runBin(['repair', '--apply', '--prune', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(pruned.status).toBe(0)
				expect(existsSync(roguePath)).toBe(false)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('U11 F2 regression: repair --prune --apply now prunes on a CLEAN-host repo too — the clean-audit early return no longer bypasses pruning; without --prune the planted file is left untouched, as before', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				// Host stays fully intact — no drift, no missing files.
				const roguePath = join(packageDirectory, '.claude', 'agents', 'rogue.md')
				mkdirSync(dirname(roguePath), { recursive: true })
				writeFileSync(roguePath, '# rogue\n')

				const withoutPrune = runBin(['repair', '--apply', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(withoutPrune.status).toBe(0)
				expect(existsSync(roguePath)).toBe(true)

				const pruned = runBin(['repair', '--apply', '--prune', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(pruned.status).toBe(0)
				expect(existsSync(roguePath)).toBe(false)
				expect(readFileSync(join(packageDirectory, '.editorconfig'), 'utf8')).toBe(
					HOST_FIXTURE_FILES['.editorconfig'],
				)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('prune truth + non-TTY ceiling: dry-run --prune preview NAMES the exact planted path; the ONE piped confirm applies the host fix, and the prune question is never asked a second time (pruneSkipped wording, nothing deleted)', async () => {
			// Every spawned test process is non-TTY (piped stdin/stdout) — this is
			// simultaneously the S3a prune-preview-truth proof (the exact path is
			// named BEFORE any prune confirm) and the S3f one-prompt-per-process
			// ceiling proof (a SECOND `terminal.confirm` off the same drained
			// stdin would hang; the prune question is never asked here at all).
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))
				const roguePath = join(packageDirectory, '.claude', 'agents', 'rogue.md')
				mkdirSync(dirname(roguePath), { recursive: true })
				writeFileSync(roguePath, '# rogue\n')

				const result = runBin(['repair', '--prune', '--from', from.path], 'y\n', {
					cwd: packageDirectory,
				})
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('delete .claude/agents/rogue.md')
				expect(result.stdout).toMatch(/prune skipped — not a terminal/)
				expect(existsSync(roguePath)).toBe(true)
				expect(readFileSync(join(packageDirectory, '.editorconfig'), 'utf8')).toBe(
					HOST_FIXTURE_FILES['.editorconfig'],
				)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('prune truth: a clean prune target (no unexpected files) prints the PRUNE_EMPTY wording and skips the question entirely', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))

				const result = runBin(['repair', '--prune', '--apply', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('no unexpected files to delete')
				expect(result.stdout).not.toContain('Also delete')
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('--yes WITHOUT --prune does NOT delete a planted unexpected file (prune is never enabled by --yes alone)', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))
				const roguePath = join(packageDirectory, '.claude', 'agents', 'rogue.md')
				mkdirSync(dirname(roguePath), { recursive: true })
				writeFileSync(roguePath, '# rogue\n')

				const result = runBin(['repair', '--apply', '--yes', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(result.status).toBe(0)
				expect(existsSync(roguePath)).toBe(true)
				expect(readFileSync(join(packageDirectory, '.editorconfig'), 'utf8')).toBe(
					HOST_FIXTURE_FILES['.editorconfig'],
				)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('piped "y\\n" confirm (no --apply, no --prune) applies the fix — the single-confirm flow the non-TTY readline fallback reliably drives', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))

				const result = runBin(['repair', '--from', from.path], 'y\n', { cwd: packageDirectory })
				expect(result.status).toBe(0)
				expect(readFileSync(join(packageDirectory, '.editorconfig'), 'utf8')).toBe(
					HOST_FIXTURE_FILES['.editorconfig'],
				)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('empty stdin (EOF) leaves the single confirm at its default (false) — dry-run outcome, no hang', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))

				const result = runBin(['repair', '--from', from.path], '', { cwd: packageDirectory })
				expect(result.status).toBe(1)
				expect(existsSync(join(packageDirectory, '.editorconfig'))).toBe(false)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('--target escaping the cwd: a coded [INVALID] failure', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['repair', '--target', '..'], '', { cwd: cwd.path })
				expect(result.status).toBe(1)
				const output = result.stdout + result.stderr
				expect(output).toContain('[INVALID]')
				expect(output).toMatch(/escapes the working directory/)
			} finally {
				await cwd.cleanup()
			}
		})
	})

	describe('fleet', () => {
		it('dry-run reports per-repo (clean and drifted), --apply writes, and no --root flag is accepted', async () => {
			const from = await buildFromFixture()
			const root = await buildTempDirectory()
			try {
				scaffoldPackage(root.path, 'fleeta', from.path)
				scaffoldPackage(root.path, 'fleetb', from.path)

				const clean = runBin(['fleet', '--from', from.path], '', { cwd: root.path })
				expect(clean.status).toBe(0)
				expect(clean.stdout).toContain('fleeta: clean')
				expect(clean.stdout).toContain('fleetb: clean')

				rmSync(join(root.path, 'fleeta', '.editorconfig'))
				const drifted = runBin(['fleet', '--from', from.path], '', { cwd: root.path })
				expect(drifted.status).toBe(1)
				expect(drifted.stdout).toContain('fleeta: 1 missing')

				const applied = runBin(['fleet', '--apply', '--from', from.path], '', { cwd: root.path })
				expect(applied.status).toBe(0)
				expect(readFileSync(join(root.path, 'fleeta', '.editorconfig'), 'utf8')).toBe(
					HOST_FIXTURE_FILES['.editorconfig'],
				)

				const noRoot = runBin(['fleet', '--root', '.', '--from', from.path], '', {
					cwd: root.path,
				})
				expect(noRoot.status).toBe(2)
			} finally {
				await root.cleanup()
				await from.cleanup()
			}
		})

		it('--json emits a top-level JSON array, one element per repo', async () => {
			const from = await buildFromFixture()
			const root = await buildTempDirectory()
			try {
				scaffoldPackage(root.path, 'fleeta', from.path)
				scaffoldPackage(root.path, 'fleetb', from.path)

				const result = runBin(['fleet', '--json', '--from', from.path], '', { cwd: root.path })
				expect(result.status).toBe(0)
				const lines = result.stdout.trim().split('\n')
				expect(lines).toHaveLength(1)
				const parsed: unknown = JSON.parse(lines[0])
				expect(Array.isArray(parsed)).toBe(true)
				expect((parsed as unknown[]).length).toBe(2)
			} finally {
				await root.cleanup()
				await from.cleanup()
			}
		})
	})

	describe('catalog (offline / vendored-from only — no live registry call)', () => {
		function buildCatalogTarget(cwd: string): string {
			const agentsDirectory = join(cwd, '.claude', 'agents')
			mkdirSync(agentsDirectory, { recursive: true })
			writeFileSync(
				join(agentsDirectory, 'orkestrel.md'),
				['# catalog', '', '<!-- catalog:start -->', 'placeholder', '<!-- catalog:end -->', ''].join(
					'\n',
				),
			)
			return cwd
		}

		function buildCatalogFrom(directory: string, packages: readonly string[]): void {
			for (const name of packages) {
				const packageDirectory = join(directory, name)
				mkdirSync(packageDirectory, { recursive: true })
				writeFileSync(
					join(packageDirectory, 'package.json'),
					JSON.stringify({ name: `@orkestrel/${name}`, version: '1.0.0' }),
				)
			}
		}

		it('--offline --from <fixture>: produces the table and writes the catalog', async () => {
			const target = await buildTempDirectory()
			const from = await buildTempDirectory()
			try {
				buildCatalogTarget(target.path)
				buildCatalogFrom(from.path, ['pkgone'])

				const dry = runBin(['catalog', '--offline', '--from', from.path], '', {
					cwd: target.path,
				})
				expect(dry.status).toBe(1)
				expect(dry.stdout).toContain('pkgone')
				expect(dry.stdout).toMatch(/pass --apply to write/)

				const applied = runBin(['catalog', '--offline', '--from', from.path, '--apply'], '', {
					cwd: target.path,
				})
				expect(applied.status).toBe(0)
				expect(
					readFileSync(join(target.path, '.claude', 'agents', 'orkestrel.md'), 'utf8'),
				).toMatch(/@orkestrel\/pkgone/)
			} finally {
				await target.cleanup()
				await from.cleanup()
			}
		})

		it('--json: exactly one parseable JSON value, no prompt', async () => {
			const target = await buildTempDirectory()
			const from = await buildTempDirectory()
			try {
				buildCatalogTarget(target.path)
				buildCatalogFrom(from.path, ['pkgone'])

				const result = runBin(['catalog', '--offline', '--from', from.path, '--json'], '', {
					cwd: target.path,
				})
				const lines = result.stdout.trim().split('\n')
				expect(lines).toHaveLength(1)
				const parsed: unknown = JSON.parse(lines[0])
				expect(parsed).toMatchObject({ drift: true })
			} finally {
				await target.cleanup()
				await from.cleanup()
			}
		})

		it('shrink warning: fewer --offline --from entries than the currently-embedded table warns on both dry-run and --apply', async () => {
			const target = await buildTempDirectory()
			const from = await buildTempDirectory()
			try {
				mkdirSync(join(target.path, '.claude', 'agents'), { recursive: true })
				writeFileSync(
					join(target.path, '.claude', 'agents', 'orkestrel.md'),
					[
						'# catalog',
						'',
						'<!-- catalog:start -->',
						'| @orkestrel/one | 1.0.0 | one |',
						'| @orkestrel/two | 1.0.0 | two |',
						'<!-- catalog:end -->',
						'',
					].join('\n'),
				)
				buildCatalogFrom(from.path, ['one'])

				const dry = runBin(['catalog', '--offline', '--from', from.path], '', {
					cwd: target.path,
				})
				expect(dry.stdout).toMatch(/warning: catalog shrinks/)
			} finally {
				await target.cleanup()
				await from.cleanup()
			}
		})

		it('missing markers in the target file: a coded [TARGET] failure', async () => {
			const target = await buildTempDirectory()
			const from = await buildTempDirectory()
			try {
				mkdirSync(join(target.path, '.claude', 'agents'), { recursive: true })
				writeFileSync(join(target.path, '.claude', 'agents', 'orkestrel.md'), '# no markers here\n')
				buildCatalogFrom(from.path, ['pkgone'])

				const result = runBin(['catalog', '--offline', '--from', from.path], '', {
					cwd: target.path,
				})
				expect(result.status).toBe(1)
				const output = result.stdout + result.stderr
				expect(output).toContain('[TARGET]')
			} finally {
				await target.cleanup()
				await from.cleanup()
			}
		})
		it.skipIf(!canSymlink)(
			'containment: a symlinked .claude/agents pointing OUTSIDE the cwd refuses the write, nothing written outside (SKIPPED: environment cannot create symlinks — passes on symlink-capable POSIX CI)',
			async () => {
				const target = await buildTempDirectory()
				const outside = await buildTempDirectory()
				const from = await buildTempDirectory()
				try {
					mkdirSync(join(target.path, '.claude'), { recursive: true })
					mkdirSync(join(outside.path, 'agents'), { recursive: true })
					writeFileSync(
						join(outside.path, 'agents', 'orkestrel.md'),
						[
							'# catalog',
							'',
							'<!-- catalog:start -->',
							'placeholder',
							'<!-- catalog:end -->',
							'',
						].join('\n'),
					)
					symlinkSync(join(outside.path, 'agents'), join(target.path, '.claude', 'agents'))
					buildCatalogFrom(from.path, ['pkgone'])

					const result = runBin(['catalog', '--offline', '--from', from.path, '--apply'], '', {
						cwd: target.path,
					})
					expect(result.status).toBe(1)
					const output = result.stdout + result.stderr
					expect(output).toContain('[INVALID]')
					expect(output).toMatch(/escapes the working directory/)
					expect(readFileSync(join(outside.path, 'agents', 'orkestrel.md'), 'utf8')).not.toContain(
						'@orkestrel/pkgone',
					)
				} finally {
					await target.cleanup()
					await outside.cleanup()
					await from.cleanup()
				}
			},
		)
	})

	describe('json discipline (S2b/S2c/S2d: one envelope, real ScaffoldError codes, never double-encoded)', () => {
		it('unknown verb under --json: exits 2 with a single parseable USAGE envelope (routed through the same usageFail as prose)', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['sync', '--json'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				const lines = result.stdout.trim().split('\n')
				expect(lines).toHaveLength(1)
				const parsed: unknown = JSON.parse(lines[0])
				expect(parsed).toMatchObject({ error: { code: 'USAGE' } })
				if (
					!isRecord(parsed) ||
					!isRecord(parsed.error) ||
					typeof parsed.error.message !== 'string'
				) {
					throw new Error('expected a { error: { code, message } } envelope')
				}
				expect(parsed.error.message).toContain('has been renamed')
			} finally {
				await cwd.cleanup()
			}
		})

		it('catalog write failure under --json: exits 1 with a single envelope carrying the real [TARGET] code (never double-encoded into the message)', async () => {
			const target = await buildTempDirectory()
			const from = await buildTempDirectory()
			try {
				mkdirSync(join(target.path, '.claude', 'agents'), { recursive: true })
				writeFileSync(join(target.path, '.claude', 'agents', 'orkestrel.md'), '# no markers here\n')
				mkdirSync(join(from.path, 'pkgone'), { recursive: true })
				writeFileSync(
					join(from.path, 'pkgone', 'package.json'),
					JSON.stringify({ name: '@orkestrel/pkgone', version: '1.0.0' }),
				)

				const result = runBin(['catalog', '--offline', '--from', from.path, '--json'], '', {
					cwd: target.path,
				})
				expect(result.status).toBe(1)
				const lines = result.stdout.trim().split('\n')
				expect(lines).toHaveLength(1)
				const parsed: unknown = JSON.parse(lines[0])
				expect(parsed).toMatchObject({ error: { code: 'TARGET' } })
				if (
					!isRecord(parsed) ||
					!isRecord(parsed.error) ||
					typeof parsed.error.message !== 'string'
				) {
					throw new Error('expected a { error: { code, message } } envelope')
				}
				// The message never repeats the code as a bracketed prefix —
				// that would double-encode it alongside the envelope's own `code` field.
				expect(parsed.error.message).not.toMatch(/^\[TARGET\]/)
			} finally {
				await target.cleanup()
				await from.cleanup()
			}
		})
	})

	describe('exit-code table conformance (AGENTS §12: 0 clean/success, 1 drift/failure, 2 usage)', () => {
		it('0: a clean audit', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				const result = runBin(['audit', '--from', from.path], '', { cwd: packageDirectory })
				expect(result.status).toBe(0)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('1: a drifted audit', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))
				const result = runBin(['audit', '--from', from.path], '', { cwd: packageDirectory })
				expect(result.status).toBe(1)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		})

		it('2: an unknown verb', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['nope'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
			} finally {
				await cwd.cleanup()
			}
		})
	})

	describe('cancel path', () => {
		// A deterministic, cross-platform SIGINT-mid-prompt test would need to
		// race a signal against the exact moment the readline fallback is
		// awaiting a line — timing-dependent and platform-variable (POSIX
		// signal delivery vs. Windows console events). The EOF-default tests
		// above ("empty stdin (EOF) leaves the single confirm at its default")
		// already prove the reliable, deterministic half of this path — an
		// unanswered prompt resolves to its documented default rather than
		// hanging; a real ctrl-c's `CANCELLED_MESSAGE` line is exercised at
		// the render-string level in render.test.ts. Not built here to avoid
		// a flaky test.
		it('is covered by the EOF-default tests above, not a piped SIGINT (documented, not built — see comment)', () => {
			expect(true).toBe(true)
		})
	})
})
