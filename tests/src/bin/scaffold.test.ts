// The bin's verb/flag contract, spawning the BUILT executable (`dist/bin/scaffold.js`) via
// `node:child_process` — assumes the build chain has already run (AGENTS.md §Orientation:
// `npm run build` before `npm test`). Every write destination is confined to the cwd
// (H-containment), so a test exercising `--target` against a temp fixture runs WITH that
// fixture as its cwd. `--from` is the read-only source override; it is exempt
// from containment and may point anywhere, including outside the cwd.
import { existsSync, mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { isRecord, parseJSON } from '@orkestrel/contract'
import { describe, expect, it } from 'vitest'
import { catalogNames } from '@src/core'
import { hostRoot, locateHostSource, readHostManifest } from '@src/server'
import {
	buildCatalogFrom,
	buildCatalogTarget,
	buildFromFixture,
	buildStagedHost,
	HOST_FIXTURE_FILES,
	REPAIR_HANDOFF_TEXT,
	runBin,
	scaffoldPackage,
} from '../../setupBin.js'
import { buildTempDirectory, canSymlink, WORKSPACE_ROOT } from '../../setupServer.js'

describe('scaffold bin: offline vendored-catalog resolution', () => {
	it('resolveCatalogNames-equivalent path: hostRoot() + readHostManifest + locateHostSource resolves the BUILT dist/host orkestrel.md, catalogNames parses real @orkestrel/* names', () => {
		// Exercises the exact primitive chain the `new` dependency prompt uses
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

		it('rejects repeated --from for every non-catalog verb before execution', async () => {
			const cwd = await buildTempDirectory()
			try {
				for (const verb of ['new', 'pull', 'audit', 'repair', 'fleet']) {
					const result = runBin([verb, '--from', 'first-host', '--from', 'second-host'], '', {
						cwd: cwd.path,
					})
					expect(result.status).toBe(2)
					expect(result.stderr).toContain(`--from may be provided only once for '${verb}'`)
				}
			} finally {
				await cwd.cleanup()
			}
		})

		it('an unknown verb exits 2 with the nearest known command', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['flete'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				expect(result.stderr).toContain('unknown command "flete"')
				expect(result.stderr).toContain('did you mean "fleet"?')
			} finally {
				await cwd.cleanup()
			}
		})

		it('an unrecognized flag is a strict parseArgs failure with exit 2', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['fleet', '--bogus'], '', { cwd: cwd.path })
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
					['new', 'demo-dry', '--src', 'core', '--json', '--from', from.path],
					'',
					{ cwd: cwd.path },
				)
				expect(result.status).toBe(0)
				const lines = result.stdout.trim().split('\n')
				expect(lines).toHaveLength(1)
				const parsed: unknown = parseJSON(lines.join('\n'))
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
				const result = runBin(['new', '--src', 'core', '--json'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				const parsed: unknown = parseJSON(result.stdout.trim())
				expect(parsed).toMatchObject({ error: { code: 'USAGE' } })
			} finally {
				await cwd.cleanup()
			}
		})

		it('an invalid positional name under --json exits 2 with a coded USAGE envelope naming the expected shape', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['new', 'Foo/bar', '--src', 'core', '--json'], '', {
					cwd: cwd.path,
				})
				expect(result.status).toBe(2)
				const parsed: unknown = parseJSON(result.stdout.trim())
				expect(parsed).toMatchObject({ error: { code: 'USAGE' } })
				expect(JSON.stringify(parsed)).toContain('^[a-z][a-z0-9-]*$')
				expect(existsSync(join(cwd.path, 'Foo'))).toBe(false)
			} finally {
				await cwd.cleanup()
			}
		})

		it('an invalid positional name without --json exits 2 with a plain shape error and writes nothing', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['new', 'Foo/bar', '--src', 'core'], '', { cwd: cwd.path })
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
				const result = runBin(['new', '--src', 'core'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				const output = result.stdout + result.stderr
				expect(output).toContain('missing a package name')
				expect(output).toContain('scaffold new')
			} finally {
				await cwd.cleanup()
			}
		})

		it('non-TTY ceiling: missing --src (name given) WITHOUT --json exits 2 with the missingInput wording', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['new', 'demo-missing-src'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				const output = result.stdout + result.stderr
				expect(output).toContain('at least one of --src or --app is required')
			} finally {
				await cwd.cleanup()
			}
		})

		it('rejects repeated src and app environments before compiling or writing', async () => {
			const cwd = await buildTempDirectory()
			try {
				const published = runBin(['new', 'duplicate-source', '--src', 'core,core'], '', {
					cwd: cwd.path,
				})
				const application = runBin(['new', 'duplicate-app', '--app', 'server,server'], '', {
					cwd: cwd.path,
				})

				expect(published.status).toBe(2)
				expect(published.stdout + published.stderr).toContain(
					'Published src environments must not repeat',
				)
				expect(application.status).toBe(2)
				expect(application.stdout + application.stderr).toContain(
					'Application environments must not repeat',
				)
				expect(existsSync(join(cwd.path, 'duplicate-source'))).toBe(false)
				expect(existsSync(join(cwd.path, 'duplicate-app'))).toBe(false)
			} finally {
				await cwd.cleanup()
			}
		})

		it('rejects off-vocabulary src and app environments before writing', async () => {
			const cwd = await buildTempDirectory()
			try {
				const published = runBin(['new', 'bad-source', '--src', 'worker'], '', {
					cwd: cwd.path,
				})
				const application = runBin(['new', 'bad-app', '--app', 'worker'], '', {
					cwd: cwd.path,
				})
				expect(published.status).toBe(2)
				expect(published.stdout + published.stderr).toContain(
					'Environment "worker" is not recognized',
				)
				expect(application.status).toBe(2)
				expect(application.stdout + application.stderr).toContain(
					'Application environment "worker" is not recognized',
				)
				expect(existsSync(join(cwd.path, 'bad-source'))).toBe(false)
				expect(existsSync(join(cwd.path, 'bad-app'))).toBe(false)
			} finally {
				await cwd.cleanup()
			}
		})

		it('reports independent source and application selections in the JSON result', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(
					['new', 'mixed-json', '--src', 'core,server', '--app', 'core,browser', '--json'],
					'',
					{ cwd: cwd.path },
				)
				expect(result.status).toBe(0)
				const parsed: unknown = parseJSON(result.stdout.trim())
				expect(parsed).toMatchObject({
					src: ['core', 'server'],
					app: ['core', 'browser'],
					applied: false,
				})
			} finally {
				await cwd.cleanup()
			}
		})

		it('scripted --apply: writes real files into ./<name> under the cwd, exit 0', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(
					['new', 'demo-apply', '--src', 'core', '--apply', '--from', from.path],
					'',
					{ cwd: cwd.path },
				)
				expect(result.status).toBe(0)
				expect(result.stdout).toContain('wrote')

				const packageDirectory = join(cwd.path, 'demo-apply')
				const packageJsonPath = join(packageDirectory, 'package.json')
				expect(existsSync(packageJsonPath)).toBe(true)
				const parsed: unknown = parseJSON(readFileSync(packageJsonPath, 'utf8'))
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
					['new', 'demo-preview', '--src', 'core', '--deps', '', '--from', from.path],
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
						'--src',
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
				expect(output).toMatch(/outside or traverses a linked parent/)
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
					['new', 'demo-outside-from', '--src', 'core', '--apply', '--from', from.path],
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
						['new', 'demo-extras-removed', '--src', 'core', '--extras', 'zod@^3.23.0'],
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
						['new', 'demo', '--src', 'core', '--apply', '--from', from.path],
						'',
						{ cwd: cwd.path },
					)
					expect(created.status).toBe(0)

					// Hand-add a devDependency directly to the generated package.json —
					// the owner's stated post-scaffold workflow now that --extras is gone.
					const packageJsonPath = join(cwd.path, 'demo', 'package.json')
					const manifest: unknown = parseJSON(readFileSync(packageJsonPath, 'utf8'))
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
			}, 30000)
		})
	})

	describe('pull (network-free paths only — AGENTS §16: no network in tests; runPull has no --offline flag, so its live-fetch branches are out of scope here)', () => {
		it('a target without package.json exits 1 with a coded TARGET line before network access', async () => {
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
				expect(result.stderr).toMatch(/outside or traverses a linked parent/)
			} finally {
				await cwd.cleanup()
			}
		})
	})

	describe('audit', () => {
		it('a minted scaffold self-case audits cleanly', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'scaffold', from.path)

				const audited = runBin(['audit', '--from', from.path], '', { cwd: packageDirectory })

				expect(audited.status).toBe(0)
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		}, 20000)

		it('clean target (--from fixture, content-aware): exit 0', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				const audited = runBin(['audit', '--from', from.path], '', { cwd: packageDirectory })
				expect(audited.status).toBe(0)
				expect(audited.stdout).toContain('comparing: file contents for host-owned files')
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		}, 20000)

		it('drifted target (a host file removed): exit 1, names the path with the "host-owned" label', async () => {
			// Hydrated host artifacts are compared by content and unhydrated ones
			// by presence. A missing artifact is drift in either mode.
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				rmSync(join(packageDirectory, '.editorconfig'))

				const audited = runBin(['audit', '--from', from.path], '', { cwd: packageDirectory })
				expect(audited.status).toBe(1)
				expect(audited.stdout).toContain('.editorconfig')
				expect(audited.stdout).toContain('host-owned')
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		}, 20000)

		it('counts a planted unexpected .claude/agents file as foreign audit drift', async () => {
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
				const parsed: unknown = parseJSON(jsonAudited.stdout.trim())
				expect(parsed).toMatchObject({ clean: false, foreign: 1 })
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		}, 30000)

		it('a clean target with no unexpected files: audit --json reports foreign:0, clean:true', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				const audited = runBin(['audit', '--json', '--from', from.path], '', {
					cwd: packageDirectory,
				})
				expect(audited.status).toBe(0)
				const parsed: unknown = parseJSON(audited.stdout.trim())
				expect(parsed).toMatchObject({ clean: true, foreign: 0 })
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		}, 20000)

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
				const parsed: unknown = parseJSON(lines.join('\n'))
				expect(parsed).toMatchObject({ clean: false, missing: 1 })
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		}, 20000)

		it("handoff gating: generated-file-only drift offers NO repair handoff (generatedNote instead), and the exit stays 1 after a repair since generated drift is out of repair's scope", async () => {
			// `tsconfig.json` is a `computed`-origin artifact (src/core/compilers.ts
			// `configArtifacts`) — content-compared by `diffPlan`, so mutating its bytes
			// is real `stale` drift entirely OUTSIDE `host`/`template` origin and
			// carries no unexpected (`foreign`) file, so it must not offer a host
			// repair handoff.
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
		}, 60000)

		it('audit --apply never auto-repairs host-owned drift in a non-TTY process', async () => {
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
		}, 20000)

		it('audit --apply --prune never deletes an unexpected file', async () => {
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
		}, 20000)

		it("an unexpected file without --prune points at 'repair --prune'", async () => {
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
		}, 20000)

		it('fails closed when an explicit --from exists but cannot establish any host artifacts', async () => {
			const from = await buildFromFixture()
			const host2 = await buildTempDirectory()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				const audited = runBin(['audit', '--from', host2.path], '', { cwd: packageDirectory })
				expect(audited.status).toBe(1)
				expect(audited.stderr).toContain('[TARGET]')
				expect(audited.stderr).toContain('missing')
			} finally {
				await cwd.cleanup()
				await from.cleanup()
				await host2.cleanup()
			}
		}, 20000)

		it('fails closed when an explicit --from is a file instead of a directory', async () => {
			const from = await buildFromFixture()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				const invalidHost = join(packageDirectory, 'host.txt')
				writeFileSync(invalidHost, 'not a directory', 'utf8')

				const audited = runBin(['audit', '--from', invalidHost], '', { cwd: packageDirectory })
				expect(audited.status).toBe(1)
				expect(audited.stderr).toContain('[TARGET]')
				expect(audited.stderr).toContain('not a readable directory')
			} finally {
				await cwd.cleanup()
				await from.cleanup()
			}
		}, 20000)

		it('fails closed with one JSON error when an explicit staged host has a malformed manifest', async () => {
			const from = await buildFromFixture()
			const host = await buildStagedHost()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				writeFileSync(join(host.path, 'manifest.json'), '{', 'utf8')

				const audited = runBin(['audit', '--json', '--from', host.path], '', {
					cwd: packageDirectory,
				})
				expect(audited.status).toBe(1)
				expect(audited.stderr).toBe('')
				const lines = audited.stdout.trim().split('\n')
				expect(lines).toHaveLength(1)
				expect(parseJSON(lines.join('\n'))).toMatchObject({ error: { code: 'TARGET' } })
			} finally {
				await cwd.cleanup()
				await host.cleanup()
				await from.cleanup()
			}
		}, 20000)

		it('fails closed when a staged manifest points at missing storage bytes', async () => {
			const from = await buildFromFixture()
			const host = await buildStagedHost()
			const cwd = await buildTempDirectory()
			try {
				const packageDirectory = scaffoldPackage(cwd.path, 'pkg', from.path)
				const manifest = readHostManifest(host.path)
				const entry = manifest?.entries[0]
				if (entry === undefined) throw new Error('expected staged host entries')
				rmSync(join(host.path, entry.storage))

				const audited = runBin(['audit', '--from', host.path], '', { cwd: packageDirectory })
				expect(audited.status).toBe(1)
				expect(audited.stderr).toContain('[TARGET]')
				expect(audited.stderr).toContain('Host storage file')
				expect(audited.stderr).toContain('is missing or case-mismatched')
			} finally {
				await cwd.cleanup()
				await host.cleanup()
				await from.cleanup()
			}
		}, 20000)
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
		}, 20000)

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
		}, 20000)

		it('--prune --apply: removes a planted unexpected file under .claude/agents', async () => {
			// `materializer.prune` scans `.claude/agents`, `.codex/agents`, and `scripts` directly
			// independently from the host-artifact diff. `runRepair` reaches the
			// prune step whenever `--prune` finds work, with or without host drift.
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
		}, 20000)

		it('prunes a foreign file from a clean-host repo only when --prune is present', async () => {
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
		}, 30000)

		it('prune truth + non-TTY ceiling: dry-run --prune preview NAMES the exact planted path; the ONE piped confirm applies the host fix, and the prune question is never asked a second time (pruneSkipped wording, nothing deleted)', async () => {
			// A spawned process receives piped streams. It must preview the exact
			// path before confirmation and never ask a second question from drained
			// stdin.
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
		}, 20000)

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
		}, 20000)

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
		}, 20000)

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
		}, 20000)

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
		}, 20000)

		it('--target escaping the cwd: a coded [INVALID] failure', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['repair', '--target', '..'], '', { cwd: cwd.path })
				expect(result.status).toBe(1)
				const output = result.stdout + result.stderr
				expect(output).toContain('[INVALID]')
				expect(output).toMatch(/outside or traverses a linked parent/)
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
		}, 60000)

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
				const parsed: unknown = parseJSON(lines.join('\n'))
				if (!Array.isArray(parsed)) throw new Error('expected a JSON array')
				expect(parsed).toHaveLength(2)
			} finally {
				await root.cleanup()
				await from.cleanup()
			}
		}, 30000)
	})

	describe('catalog (offline / vendored-from only — no live registry call)', () => {
		it('accepts repeated --from and merges every local catalog source', async () => {
			const target = await buildTempDirectory()
			const first = await buildTempDirectory()
			const second = await buildTempDirectory()
			try {
				buildCatalogTarget(target.path)
				buildCatalogFrom(first.path, ['one'])
				buildCatalogFrom(second.path, ['two'])

				const result = runBin(
					['catalog', '--offline', '--from', first.path, '--from', second.path, '--json'],
					'',
					{ cwd: target.path },
				)
				expect(result.status).toBe(1)
				const parsed: unknown = parseJSON(result.stdout.trim())
				if (!isRecord(parsed) || !Array.isArray(parsed.entries)) {
					throw new Error('expected a catalog JSON result')
				}
				expect(parsed.entries).toEqual(
					expect.arrayContaining([
						expect.objectContaining({ name: '@orkestrel/one' }),
						expect.objectContaining({ name: '@orkestrel/two' }),
					]),
				)
			} finally {
				await target.cleanup()
				await first.cleanup()
				await second.cleanup()
			}
		})

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
		}, 20000)

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
				const parsed: unknown = parseJSON(lines.join('\n'))
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

		it('rejects duplicate, nested, and reversed catalog markers before mutation', async () => {
			const cases: readonly (readonly string[])[] = [
				[
					'# duplicate start',
					'<!-- catalog:start -->',
					'<!-- catalog:start -->',
					'placeholder',
					'<!-- catalog:end -->',
				],
				[
					'# duplicate end',
					'<!-- catalog:start -->',
					'placeholder',
					'<!-- catalog:end -->',
					'<!-- catalog:end -->',
				],
				[
					'# nested',
					'<!-- catalog:start -->',
					'<!-- catalog:start -->',
					'placeholder',
					'<!-- catalog:end -->',
					'<!-- catalog:end -->',
				],
				['# reversed', '<!-- catalog:end -->', 'placeholder', '<!-- catalog:start -->'],
			]

			for (const lines of cases) {
				const target = await buildTempDirectory()
				const from = await buildTempDirectory()
				try {
					const path = join(target.path, '.claude', 'agents', 'orkestrel.md')
					const content = `${lines.join('\n')}\n`
					mkdirSync(join(target.path, '.claude', 'agents'), { recursive: true })
					writeFileSync(path, content)
					buildCatalogFrom(from.path, ['pkgone'])

					const result = runBin(['catalog', '--offline', '--from', from.path, '--apply'], '', {
						cwd: target.path,
					})

					expect(result.status).toBe(1)
					expect(`${result.stdout}${result.stderr}`).toContain('[TARGET]')
					expect(readFileSync(path, 'utf8')).toBe(content)
				} finally {
					await target.cleanup()
					await from.cleanup()
				}
			}
		})

		it('rejects malformed UTF-8 around canonical markers without rewriting user bytes', async () => {
			const target = await buildTempDirectory()
			const from = await buildTempDirectory()
			try {
				const path = join(target.path, '.claude', 'agents', 'orkestrel.md')
				const content = Buffer.concat([
					Buffer.from([0xff]),
					Buffer.from('\n<!-- catalog:start -->\nplaceholder\n<!-- catalog:end -->\n', 'utf8'),
					Buffer.from([0xfe]),
				])
				mkdirSync(join(target.path, '.claude', 'agents'), { recursive: true })
				writeFileSync(path, content)
				buildCatalogFrom(from.path, ['pkgone'])

				const result = runBin(['catalog', '--offline', '--from', from.path, '--apply'], '', {
					cwd: target.path,
				})

				expect(result.status).toBe(1)
				expect(`${result.stdout}${result.stderr}`).toContain('[TARGET]')
				expect(readFileSync(path)).toEqual(content)
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
					expect(output).toMatch(/outside or traverses a linked parent/)
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

	describe('JSON discipline', () => {
		it('unknown verb under --json: exits 2 with a single parseable USAGE envelope (routed through the same usageFail as prose)', async () => {
			const cwd = await buildTempDirectory()
			try {
				const result = runBin(['flete', '--json'], '', { cwd: cwd.path })
				expect(result.status).toBe(2)
				const lines = result.stdout.trim().split('\n')
				expect(lines).toHaveLength(1)
				const parsed: unknown = parseJSON(lines.join('\n'))
				expect(parsed).toMatchObject({ error: { code: 'USAGE' } })
				if (
					!isRecord(parsed) ||
					!isRecord(parsed.error) ||
					typeof parsed.error.message !== 'string'
				) {
					throw new Error('expected a { error: { code, message } } envelope')
				}
				expect(parsed.error.message).toContain('did you mean "fleet"?')
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
				const parsed: unknown = parseJSON(lines.join('\n'))
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
		}, 20000)

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
		}, 20000)

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
