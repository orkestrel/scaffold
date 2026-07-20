import type { Artifact, Plan } from '@src/core'
import type { ManifestEntry } from '@src/server'
import { existsSync, mkdirSync, readFileSync, statSync, symlinkSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { blueprint } from '@src/core'
import { blueprintToPlan } from '@src/core'
import { dependency } from '@src/core'
import { isScaffoldError } from '@src/core'
import { createMaterializer, isVacant, readTarget } from '@src/server'
import { createRecorder } from '../../setup.js'
import type { TempDirectoryInterface } from '../../setupServer.js'
import {
	buildTempDirectory,
	canSocket,
	canSymlink,
	hasModes,
	WORKSPACE_ROOT,
} from '../../setupServer.js'

// ── isVacant ─────────────────────────────────────────────────────────────────

describe('isVacant', () => {
	it('an absent path is vacant', async () => {
		const directory = await buildTempDirectory()
		try {
			expect(isVacant(join(directory.path, 'does-not-exist'))).toBe(true)
		} finally {
			await directory.cleanup()
		}
	})

	it('an empty existing directory is vacant', async () => {
		const directory = await buildTempDirectory()
		try {
			expect(isVacant(directory.path)).toBe(true)
		} finally {
			await directory.cleanup()
		}
	})

	it('a directory containing only .git is vacant', async () => {
		const directory = await buildTempDirectory()
		try {
			mkdirSync(join(directory.path, '.git'))
			expect(isVacant(directory.path)).toBe(true)
		} finally {
			await directory.cleanup()
		}
	})

	it('a directory with any other content is NOT vacant', async () => {
		const directory = await buildTempDirectory()
		try {
			writeFileSync(join(directory.path, 'README.md'), 'hi', 'utf8')
			expect(isVacant(directory.path)).toBe(false)
		} finally {
			await directory.cleanup()
		}
	})

	it('a directory with .git PLUS another entry is NOT vacant', async () => {
		const directory = await buildTempDirectory()
		try {
			mkdirSync(join(directory.path, '.git'))
			writeFileSync(join(directory.path, 'file.txt'), 'x', 'utf8')
			expect(isVacant(directory.path)).toBe(false)
		} finally {
			await directory.cleanup()
		}
	})

	it('a FILE at the target path is NOT vacant', async () => {
		const directory = await buildTempDirectory()
		try {
			const filePath = join(directory.path, 'a-file')
			writeFileSync(filePath, 'x', 'utf8')
			expect(isVacant(filePath)).toBe(false)
		} finally {
			await directory.cleanup()
		}
	})
})

// ── readTarget ───────────────────────────────────────────────────────────────

describe('readTarget', () => {
	it('reads present files, maps a directory entry to an empty string, and OMITS absent paths', async () => {
		const directory = await buildTempDirectory()
		try {
			writeFileSync(join(directory.path, 'package.json'), '{"name":"x"}', 'utf8')
			mkdirSync(join(directory.path, '.claude'))
			const current = readTarget(directory.path, ['package.json', '.claude', 'missing.txt'])
			expect(current['package.json']).toBe('{"name":"x"}')
			expect(current['.claude']).toBe('')
			expect(Object.prototype.hasOwnProperty.call(current, 'missing.txt')).toBe(false)
		} finally {
			await directory.cleanup()
		}
	})

	it.skipIf(!canSocket)(
		'wraps a genuine read failure on an EXISTING path into a coded TARGET error (a socket cannot be read as a file, even as root) (SKIPPED: environment cannot bind a Unix domain socket — unreadable-existing-path read failure unverified here; passes on socket-capable POSIX CI)',
		async () => {
			const directory = await buildTempDirectory()
			try {
				const socketPath = join(directory.path, 'socket')
				const server = createServer()
				await new Promise<void>((resolvePromise, reject) => {
					server.once('error', reject)
					server.listen(socketPath, () => resolvePromise())
				})
				try {
					let caught: unknown
					try {
						readTarget(directory.path, ['socket'])
					} catch (error) {
						caught = error
					}
					if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
					expect(caught.code).toBe('TARGET')
					expect(caught.context).toMatchObject({ path: 'socket' })
				} finally {
					await new Promise<void>((resolvePromise) => server.close(() => resolvePromise()))
				}
			} finally {
				await directory.cleanup()
			}
		},
	)
})

// ── Materializer.materialize ─────────────────────────────────────────────────

describe('Materializer.materialize', () => {
	it('writes host copies and rendered artifacts into a vacant target, with matching real bytes', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }))
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const result = materializer.materialize(plan, directory.path)

			const hostArtifact = plan.artifacts.find((artifact) => artifact.origin === 'host')
			if (hostArtifact === undefined) throw new Error('expected at least one host artifact')
			expect(result.copied).toContain(hostArtifact.path)
			const writtenHostPath = join(directory.path, hostArtifact.path)
			expect(existsSync(writtenHostPath)).toBe(true)

			const renderedArtifact = plan.artifacts.find(
				(artifact) => artifact.origin === 'template' || artifact.origin === 'computed',
			)
			if (renderedArtifact === undefined) throw new Error('expected at least one rendered artifact')
			expect(result.written).toContain(renderedArtifact.path)
			const writtenPath = join(directory.path, renderedArtifact.path)
			expect(readFileSync(writtenPath, 'utf8')).toBe(renderedArtifact.content ?? '')

			expect(result.target).toBe(directory.path)
			expect(result.skipped).toEqual([])
			expect(result.written.length + result.copied.length).toBe(plan.artifacts.length)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('a byte-identical host artifact round-trips through the real filesystem copy', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }))
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			materializer.materialize(plan, directory.path)

			const fileArtifact = plan.artifacts.find(
				(artifact) => artifact.origin === 'host' && artifact.path === 'AGENTS.md',
			)
			if (fileArtifact === undefined) throw new Error('expected AGENTS.md as a host artifact')
			const expected = readFileSync(join(WORKSPACE_ROOT, 'AGENTS.md'), 'utf8')
			const actual = readFileSync(join(directory.path, 'AGENTS.md'), 'utf8')
			expect(actual).toBe(expected)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('refuses a non-vacant target with a TARGET error', async () => {
		const directory = await buildTempDirectory()
		try {
			writeFileSync(join(directory.path, 'already-here.txt'), 'x', 'utf8')
			const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }))
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			let caught: unknown
			try {
				materializer.materialize(plan, directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('a vacant target holding only .git is accepted', async () => {
		const directory = await buildTempDirectory()
		try {
			mkdirSync(join(directory.path, '.git'))
			const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }))
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const result = materializer.materialize(plan, directory.path)
			expect(result.written.length + result.copied.length).toBe(plan.artifacts.length)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it("fails fast with a coded WRITE error when an earlier artifact writes a FILE that blocks a later artifact's directory", async () => {
		const directory = await buildTempDirectory()
		try {
			// A real file-in-place-of-directory collision (§ dispatch): the first
			// artifact writes a plain FILE at `conflict`; the second needs
			// `conflict` to be a DIRECTORY it can `mkdirSync` into — a genuine
			// `ENOTDIR` from the real filesystem, not a simulated failure.
			const plan: Plan = {
				blueprint: blueprint('write-fail-fixture', { surfaces: ['core'] }),
				groups: ['docs'],
				artifacts: [
					{ path: 'conflict', group: 'docs', origin: 'computed', content: 'a plain file' },
					{
						path: 'conflict/nested.txt',
						group: 'docs',
						origin: 'computed',
						content: 'unreachable',
					},
				],
			}

			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			let caught: unknown
			try {
				materializer.materialize(plan, directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('WRITE')
			// The first artifact still landed on real disk before the second failed.
			expect(readFileSync(join(directory.path, 'conflict'), 'utf8')).toBe('a plain file')
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('emits copy/write per artifact then done, all AFTER the outcome', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }))
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const sequence: string[] = []
			const copyRecorder = createRecorder<readonly [path: string]>()
			const writeRecorder = createRecorder<readonly [path: string]>()
			const doneRecorder = createRecorder<readonly [result: unknown]>()
			materializer.emitter.on('copy', (path) => {
				sequence.push('copy')
				copyRecorder.handler(path)
			})
			materializer.emitter.on('write', (path) => {
				sequence.push('write')
				writeRecorder.handler(path)
			})
			materializer.emitter.on('done', (result) => {
				sequence.push('done')
				doneRecorder.handler(result)
			})

			const result = materializer.materialize(plan, directory.path)

			expect(copyRecorder.count).toBe(result.copied.length)
			expect(writeRecorder.count).toBe(result.written.length)
			expect(doneRecorder.count).toBe(1)
			expect(doneRecorder.calls[0]?.[0]).toEqual(result)
			// `done` is the LAST event, emitted after every per-artifact outcome.
			expect(sequence.at(-1)).toBe('done')
			expect(sequence.filter((name) => name === 'done')).toHaveLength(1)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})
})

// ── Materializer — path containment (defense in depth) ──────────────────────

describe('Materializer — path containment', () => {
	it('throws the WRITE containment error for a traversal DESTINATION path, writing nothing outside target', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan: Plan = {
				blueprint: blueprint('traversal-dest-fixture', { surfaces: ['core'] }),
				groups: ['docs'],
				artifacts: [{ path: '../escaped.txt', group: 'docs', origin: 'computed', content: 'evil' }],
			}
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			let caught: unknown
			try {
				materializer.materialize(plan, directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('WRITE')
			expect(existsSync(join(directory.path, '..', 'escaped.txt'))).toBe(false)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('throws the TARGET containment error for a traversal host SOURCE path, reading nothing outside host', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan: Plan = {
				blueprint: blueprint('traversal-source-fixture', { surfaces: ['core'] }),
				groups: ['docs'],
				artifacts: [
					{
						path: 'escaped.txt',
						group: 'docs',
						origin: 'host',
						source: '../escaped-secret.txt',
					},
				],
			}
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			let caught: unknown
			try {
				materializer.materialize(plan, directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
			expect(existsSync(join(directory.path, 'escaped.txt'))).toBe(false)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('holds even when the gate was bypassed — a hand-spliced traversal pointer artifact on a real blueprintToPlan plan still throws', async () => {
		const directory = await buildTempDirectory()
		try {
			// Mirrors the SHAPE `Compiler.#pointerArtifacts` would build for a
			// traversal-named dependency (`@orkestrel/../evil` → `guides/src/../evil.md`)
			// — but here it is spliced directly onto a real `blueprintToPlan` plan,
			// skipping `Compiler`'s gate entirely, to prove the Materializer's OWN
			// containment holds regardless of how the artifact arrived.
			const base = blueprintToPlan(
				blueprint('gate-bypass-fixture', {
					surfaces: ['core'],
					dependencies: [dependency('@orkestrel/contract', '^0.0.5')],
				}),
				['docs'],
			)
			const plan: Plan = {
				...base,
				artifacts: [
					...base.artifacts,
					{
						path: 'guides/src/../../escaped.md',
						group: 'guides',
						origin: 'host',
						source: 'guides/src/../../escaped.md',
					},
				],
			}
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			let caught: unknown
			try {
				materializer.materialize(plan, directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(['WRITE', 'TARGET']).toContain(caught.code)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it.skipIf(!canSymlink)(
		'repair refuses to write through a SYMLINKED subdirectory that escapes the target (real-path containment, no vacancy gate to shield it) (SKIPPED: environment cannot create symlinks — symlink-escape containment for repair unverified here; passes on symlink-capable POSIX CI)',
		async () => {
			const directory = await buildTempDirectory()
			const outside = await buildTempDirectory()
			try {
				// A benign materialize first — happy path must still work after the
				// real-path change.
				const benignPlan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }))
				const materializer = createMaterializer({ host: WORKSPACE_ROOT })
				const benignResult = materializer.materialize(benignPlan, directory.path)
				expect(benignResult.written.length + benignResult.copied.length).toBe(
					benignPlan.artifacts.length,
				)

				// Plant a symlinked subdirectory inside the (now-materialized) target
				// that actually points OUTSIDE it.
				const linkPath = join(directory.path, 'escape-link')
				symlinkSync(outside.path, linkPath, 'dir')

				const plan: Plan = {
					blueprint: blueprint('symlink-escape-fixture', { surfaces: ['core'] }),
					groups: ['docs'],
					artifacts: [
						{ path: 'escape-link/evil.txt', group: 'docs', origin: 'computed', content: 'evil' },
					],
				}
				let caught: unknown
				try {
					materializer.repair(
						plan,
						{
							findings: [{ path: 'escape-link/evil.txt', group: 'docs', drift: 'missing' }],
							clean: false,
							complete: true,
							questions: [],
							drifted: 0,
							missing: 1,
							foreign: 0,
						},
						directory.path,
					)
				} catch (error) {
					caught = error
				}
				if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
				expect(caught.code).toBe('WRITE')
				expect(existsSync(join(outside.path, 'evil.txt'))).toBe(false)
				materializer.destroy()
			} finally {
				await directory.cleanup()
				await outside.cleanup()
			}
		},
	)
})

// ── Materializer.materialize — group-scoped plan into a vacant target ───────

describe('Materializer.materialize — group-scoped plan', () => {
	it('writes ONLY the scoped groups artifacts — a deliberate partial tree', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan(blueprint('scoped-fixture', { surfaces: ['core'] }), ['docs'])
			expect(plan.artifacts.length).toBeGreaterThan(0)
			expect(plan.artifacts.every((artifact) => artifact.group === 'docs')).toBe(true)

			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const result = materializer.materialize(plan, directory.path)

			expect(result.written.length + result.copied.length).toBe(plan.artifacts.length)
			for (const artifact of plan.artifacts) {
				expect(existsSync(join(directory.path, artifact.path))).toBe(true)
			}
			// Nothing outside the `docs` group landed — no `package.json`, no `src/`.
			expect(existsSync(join(directory.path, 'package.json'))).toBe(false)
			expect(existsSync(join(directory.path, 'src'))).toBe(false)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})
})

// ── Materializer.repair ──────────────────────────────────────────────────────

describe('Materializer.repair', () => {
	function buildPlan(): Plan {
		const written: Artifact = { path: 'a.txt', group: 'docs', origin: 'computed', content: 'A' }
		const stale: Artifact = { path: 'b.txt', group: 'docs', origin: 'computed', content: 'B-new' }
		const missing: Artifact = { path: 'c.txt', group: 'docs', origin: 'computed', content: 'C' }
		return {
			blueprint: blueprint('repair-fixture', { surfaces: ['core'] }),
			groups: ['docs'],
			artifacts: [written, stale, missing],
		}
	}

	it('writes ONLY the missing/stale artifacts an Audit names, skipping aligned ones', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = buildPlan()
			writeFileSync(join(directory.path, 'a.txt'), 'A', 'utf8') // aligned already
			writeFileSync(join(directory.path, 'b.txt'), 'B-old', 'utf8') // stale
			// c.txt is absent → missing

			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const result = materializer.repair(
				plan,
				{
					findings: [
						{ path: 'a.txt', group: 'docs', drift: 'aligned' },
						{ path: 'b.txt', group: 'docs', drift: 'stale' },
						{ path: 'c.txt', group: 'docs', drift: 'missing' },
					],
					clean: false,
					complete: true,
					questions: [],
					drifted: 1,
					missing: 1,
					foreign: 0,
				},
				directory.path,
			)

			expect([...result.written].sort()).toEqual(['b.txt', 'c.txt'])
			expect(result.skipped).toEqual(['a.txt'])
			expect(readFileSync(join(directory.path, 'a.txt'), 'utf8')).toBe('A') // untouched
			expect(readFileSync(join(directory.path, 'b.txt'), 'utf8')).toBe('B-new') // repaired
			expect(readFileSync(join(directory.path, 'c.txt'), 'utf8')).toBe('C') // written
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('counts skipped exactly the artifacts not named missing/stale by the Audit', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = buildPlan()
			writeFileSync(join(directory.path, 'a.txt'), 'A', 'utf8')
			writeFileSync(join(directory.path, 'b.txt'), 'B-new', 'utf8')
			writeFileSync(join(directory.path, 'c.txt'), 'C', 'utf8')

			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const result = materializer.repair(
				plan,
				{
					findings: [
						{ path: 'a.txt', group: 'docs', drift: 'aligned' },
						{ path: 'b.txt', group: 'docs', drift: 'aligned' },
						{ path: 'c.txt', group: 'docs', drift: 'aligned' },
					],
					clean: true,
					complete: true,
					questions: [],
					drifted: 0,
					missing: 0,
					foreign: 0,
				},
				directory.path,
			)

			expect(result.written).toEqual([])
			expect(result.copied).toEqual([])
			expect([...result.skipped].sort()).toEqual(['a.txt', 'b.txt', 'c.txt'])
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})
})

// ── Materializer — manifest-aware host copy ─────────────────────────────────

describe('Materializer — manifest-aware host copy', () => {
	/** A hand-authored vendored `host` fixture: `manifest.json` plus its staged, un-dotted storage files. */
	async function buildManifestHost(): Promise<TempDirectoryInterface> {
		const host = await buildTempDirectory()
		const entries: ManifestEntry[] = [
			{ storage: 'dotfiles/gitignore', destination: '.gitignore', executable: false },
			{ storage: 'claude/settings.json', destination: '.claude/settings.json', executable: false },
			{ storage: 'scripts/deps.sh', destination: 'scripts/deps.sh', executable: true },
		]
		mkdirSync(join(host.path, 'dotfiles'), { recursive: true })
		mkdirSync(join(host.path, 'claude'), { recursive: true })
		mkdirSync(join(host.path, 'scripts'), { recursive: true })
		writeFileSync(join(host.path, 'dotfiles', 'gitignore'), 'node_modules\n', 'utf8')
		writeFileSync(join(host.path, 'claude', 'settings.json'), '{"permissions":{}}', 'utf8')
		writeFileSync(join(host.path, 'scripts', 'deps.sh'), '#!/bin/sh\necho deps\n', 'utf8')
		writeFileSync(join(host.path, 'manifest.json'), JSON.stringify(entries), 'utf8')
		return host
	}

	function buildManifestPlan(): Plan {
		return {
			blueprint: blueprint('manifest-fixture', { surfaces: ['core'] }),
			groups: ['configs', 'orchestration'],
			artifacts: [
				{ path: '.gitignore', group: 'configs', origin: 'host' },
				{ path: '.claude/settings.json', group: 'configs', origin: 'host' },
				{ path: 'scripts/deps.sh', group: 'orchestration', origin: 'host' },
			],
		}
	}

	it.skipIf(!hasModes)(
		'materialize lands manifest-staged files at their DOTTED destinations, with the exec bit set only where the manifest says so (SKIPPED: this platform carries no POSIX exec-bit semantics — exec-bit assertions unverified here; pass on POSIX)',
		async () => {
			const directory = await buildTempDirectory()
			const host = await buildManifestHost()
			try {
				const plan = buildManifestPlan()
				const materializer = createMaterializer({ host: host.path })
				const result = materializer.materialize(plan, directory.path)

				expect([...result.copied].sort()).toEqual(
					['.claude/settings.json', '.gitignore', 'scripts/deps.sh'].sort(),
				)
				expect(readFileSync(join(directory.path, '.gitignore'), 'utf8')).toBe('node_modules\n')
				expect(readFileSync(join(directory.path, '.claude/settings.json'), 'utf8')).toBe(
					'{"permissions":{}}',
				)
				expect(readFileSync(join(directory.path, 'scripts/deps.sh'), 'utf8')).toBe(
					'#!/bin/sh\necho deps\n',
				)

				// Only `scripts/deps.sh` is flagged `executable: true` in the manifest.
				expect(statSync(join(directory.path, 'scripts/deps.sh')).mode & 0o111).not.toBe(0)
				expect(statSync(join(directory.path, '.gitignore')).mode & 0o111).toBe(0)
				expect(statSync(join(directory.path, '.claude/settings.json')).mode & 0o111).toBe(0)

				materializer.destroy()
			} finally {
				await directory.cleanup()
				await host.cleanup()
			}
		},
	)

	it.skipIf(!hasModes)(
		'repair lands manifest-staged missing files at their DOTTED destinations, with the exec bit set on deps.sh (SKIPPED: this platform carries no POSIX exec-bit semantics — exec-bit assertion unverified here; passes on POSIX)',
		async () => {
			const directory = await buildTempDirectory()
			const host = await buildManifestHost()
			try {
				const plan = buildManifestPlan()
				const materializer = createMaterializer({ host: host.path })
				const result = materializer.repair(
					plan,
					{
						findings: [
							{ path: '.gitignore', group: 'configs', drift: 'missing' },
							{ path: '.claude/settings.json', group: 'configs', drift: 'missing' },
							{ path: 'scripts/deps.sh', group: 'orchestration', drift: 'missing' },
						],
						clean: false,
						complete: true,
						questions: [],
						drifted: 0,
						missing: 3,
						foreign: 0,
					},
					directory.path,
				)

				expect([...result.copied].sort()).toEqual(
					['.claude/settings.json', '.gitignore', 'scripts/deps.sh'].sort(),
				)
				expect(existsSync(join(directory.path, '.gitignore'))).toBe(true)
				expect(existsSync(join(directory.path, '.claude/settings.json'))).toBe(true)
				expect(statSync(join(directory.path, 'scripts/deps.sh')).mode & 0o111).not.toBe(0)

				materializer.destroy()
			} finally {
				await directory.cleanup()
				await host.cleanup()
			}
		},
	)

	it('a host with NO manifest.json falls back to the 1:1 raw-root mapping (a fresh fixture, not the existing-behavior repo-root tests above)', async () => {
		const directory = await buildTempDirectory()
		const host = await buildTempDirectory()
		try {
			mkdirSync(join(host.path, 'nested'), { recursive: true })
			writeFileSync(join(host.path, 'nested', 'file.txt'), 'raw 1:1 content\n', 'utf8')
			const plan: Plan = {
				blueprint: blueprint('rawroot-1to1-fixture', { surfaces: ['core'] }),
				groups: ['docs'],
				artifacts: [{ path: 'nested/file.txt', group: 'docs', origin: 'host' }],
			}
			const materializer = createMaterializer({ host: host.path })
			const result = materializer.materialize(plan, directory.path)

			expect(result.copied).toEqual(['nested/file.txt'])
			expect(readFileSync(join(directory.path, 'nested/file.txt'), 'utf8')).toBe(
				'raw 1:1 content\n',
			)
			materializer.destroy()
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})

	it('a malformed host manifest.json surfaces as a coded error', async () => {
		const directory = await buildTempDirectory()
		const host = await buildTempDirectory()
		try {
			// Not an array of manifest entries — `readHostManifest`'s documented
			// coded-error shape.
			writeFileSync(join(host.path, 'manifest.json'), '{"not":"an array"}', 'utf8')
			const plan: Plan = {
				blueprint: blueprint('malformed-manifest-fixture', { surfaces: ['core'] }),
				groups: ['docs'],
				artifacts: [{ path: 'whatever.txt', group: 'docs', origin: 'host' }],
			}
			const materializer = createMaterializer({ host: host.path })
			let caught: unknown
			try {
				materializer.materialize(plan, directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
			materializer.destroy()
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})

	it('a manifest-present source with ZERO matching entries (a non-vendored dependency guide pointer) degrades to a stub file instead of throwing', async () => {
		const directory = await buildTempDirectory()
		const host = await buildManifestHost()
		try {
			const plan: Plan = {
				blueprint: blueprint('pointer-fixture', {
					surfaces: ['core'],
					dependencies: [dependency('@orkestrel/msg', '^1.0.0')],
				}),
				groups: ['guides'],
				artifacts: [
					{
						path: 'guides/src/msg.md',
						group: 'guides',
						origin: 'host',
						source: 'guides/src/msg.md',
					},
				],
			}
			const materializer = createMaterializer({ host: host.path })
			const copyRecorder = createRecorder<readonly [path: string]>()
			materializer.emitter.on('copy', copyRecorder.handler)
			const result = materializer.materialize(plan, directory.path)

			expect(result.copied).toEqual(['guides/src/msg.md'])
			expect(copyRecorder.calls).toEqual([['guides/src/msg.md']])
			const stub = readFileSync(join(directory.path, 'guides/src/msg.md'), 'utf8')
			expect(stub).toContain('@orkestrel/msg')
			expect(stub).toContain('scaffold pull')

			materializer.destroy()
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})

	it('a manifest-present source with ZERO matching entries that is NOT a dependency-guide pointer (a missing manifest entry for a shared artifact) throws a coded TARGET error and writes nothing', async () => {
		const directory = await buildTempDirectory()
		const host = await buildManifestHost()
		try {
			const plan: Plan = {
				blueprint: blueprint('missing-entry-fixture', { surfaces: ['core'] }),
				groups: ['configs'],
				artifacts: [{ path: 'AGENTS.md', group: 'configs', origin: 'host' }],
			}
			const materializer = createMaterializer({ host: host.path })
			let caught: unknown
			try {
				materializer.materialize(plan, directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
			expect(existsSync(join(directory.path, 'AGENTS.md'))).toBe(false)
			materializer.destroy()
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})

	it('the raw-root fallback (no manifest.json) still THROWS when an explicitly-named --from source does not exist — a different failure class from the degrade above', async () => {
		const directory = await buildTempDirectory()
		const host = await buildTempDirectory()
		try {
			const plan: Plan = {
				blueprint: blueprint('rawroot-missing-fixture', { surfaces: ['core'] }),
				groups: ['docs'],
				artifacts: [{ path: 'does-not-exist.txt', group: 'docs', origin: 'host' }],
			}
			const materializer = createMaterializer({ host: host.path })
			let caught: unknown
			try {
				materializer.materialize(plan, directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('WRITE')
			materializer.destroy()
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})
})

// ── destroy semantics ────────────────────────────────────────────────────────

describe('Materializer.destroy', () => {
	it('is idempotent, emits destroy once, and every method throws DESTROYED afterward', async () => {
		const directory = await buildTempDirectory()
		try {
			const destroyRecorder = createRecorder<readonly []>()
			const materializer = createMaterializer({
				host: WORKSPACE_ROOT,
				on: { destroy: destroyRecorder.handler },
			})
			materializer.destroy()
			materializer.destroy() // idempotent — no second emit, no throw
			expect(destroyRecorder.count).toBe(1)

			const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }))
			for (const attempt of [
				() => materializer.materialize(plan, directory.path),
				() =>
					materializer.repair(
						plan,
						{
							findings: [],
							clean: true,
							complete: true,
							questions: [],
							drifted: 0,
							missing: 0,
							foreign: 0,
						},
						directory.path,
					),
			]) {
				let caught: unknown
				try {
					attempt()
				} catch (error) {
					caught = error
				}
				if (!isScaffoldError(caught))
					throw new Error('expected a DESTROYED ScaffoldError to be thrown')
				expect(caught.code).toBe('DESTROYED')
			}
		} finally {
			await directory.cleanup()
		}
	})
})

// ── Materializer.prune ───────────────────────────────────────────────────────

describe('Materializer.prune', () => {
	/** A raw-root `host` fixture (no `manifest.json`) vendoring one file each under `.claude/agents/` and `scripts/`. */
	async function buildVendoredHost(): Promise<TempDirectoryInterface> {
		const host = await buildTempDirectory()
		mkdirSync(join(host.path, '.claude', 'agents'), { recursive: true })
		mkdirSync(join(host.path, 'scripts'), { recursive: true })
		writeFileSync(join(host.path, '.claude', 'agents', 'scout.md'), 'vendored scout', 'utf8')
		writeFileSync(join(host.path, 'scripts', 'build.sh'), 'vendored build', 'utf8')
		return host
	}

	it("deletes only in-scope foreign files under .claude/agents/ and scripts/, emits 'remove' per deletion, leaves vendored files and out-of-scope foreign files untouched", async () => {
		const directory = await buildTempDirectory()
		const host = await buildVendoredHost()
		try {
			// Target already carries the vendored files (untouched by prune) PLUS
			// a foreign file in each prune-owned directory (deleted) PLUS a
			// foreign file OUTSIDE those directories (never prune's concern).
			mkdirSync(join(directory.path, '.claude', 'agents'), { recursive: true })
			mkdirSync(join(directory.path, 'scripts'), { recursive: true })
			writeFileSync(join(directory.path, '.claude', 'agents', 'scout.md'), 'vendored scout', 'utf8')
			writeFileSync(
				join(directory.path, '.claude', 'agents', 'foreign-agent.md'),
				'not vendored',
				'utf8',
			)
			writeFileSync(join(directory.path, 'scripts', 'build.sh'), 'vendored build', 'utf8')
			writeFileSync(join(directory.path, 'scripts', 'foreign-script.sh'), 'not vendored', 'utf8')
			writeFileSync(join(directory.path, 'README.md'), 'outside prune scope', 'utf8')

			const materializer = createMaterializer({ host: host.path })
			const removeRecorder = createRecorder<readonly [path: string]>()
			materializer.emitter.on('remove', removeRecorder.handler)

			blueprintToPlan(blueprint('prune-fixture', { surfaces: ['core'] }))
			const result = materializer.prune(directory.path)

			expect([...result.removed].sort()).toEqual(
				['.claude/agents/foreign-agent.md', 'scripts/foreign-script.sh'].sort(),
			)
			expect(result.written).toEqual([])
			expect(result.copied).toEqual([])
			expect(result.skipped).toEqual([])

			expect(removeRecorder.count).toBe(2)
			expect([...removeRecorder.calls.map((call) => call[0])].sort()).toEqual(
				['.claude/agents/foreign-agent.md', 'scripts/foreign-script.sh'].sort(),
			)

			// Vendored files survive.
			expect(existsSync(join(directory.path, '.claude/agents/scout.md'))).toBe(true)
			expect(existsSync(join(directory.path, 'scripts/build.sh'))).toBe(true)
			// In-scope foreign files are gone.
			expect(existsSync(join(directory.path, '.claude/agents/foreign-agent.md'))).toBe(false)
			expect(existsSync(join(directory.path, 'scripts/foreign-script.sh'))).toBe(false)
			// Out-of-scope foreign file is never prune's concern.
			expect(existsSync(join(directory.path, 'README.md'))).toBe(true)

			materializer.destroy()
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})

	it.skipIf(!canSymlink)(
		'refuses to delete through a symlink under scripts/ that escapes the target — containment holds for prune too, nothing outside is deleted (SKIPPED: environment cannot create symlinks — symlink-escape containment for prune unverified here; passes on symlink-capable POSIX CI)',
		async () => {
			const directory = await buildTempDirectory()
			const outside = await buildTempDirectory()
			const host = await buildVendoredHost()
			try {
				writeFileSync(join(outside.path, 'secret.txt'), 'do not touch', 'utf8')
				mkdirSync(join(directory.path, 'scripts'), { recursive: true })
				symlinkSync(join(outside.path, 'secret.txt'), join(directory.path, 'scripts', 'escape.sh'))

				const materializer = createMaterializer({ host: host.path })
				blueprintToPlan(blueprint('prune-symlink-fixture', { surfaces: ['core'] }))
				let caught: unknown
				try {
					materializer.prune(directory.path)
				} catch (error) {
					caught = error
				}
				if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
				expect(caught.code).toBe('WRITE')
				// Neither the outside file nor the symlink itself was touched — the
				// containment check throws BEFORE any `unlinkSync` runs.
				expect(existsSync(join(outside.path, 'secret.txt'))).toBe(true)
				expect(existsSync(join(directory.path, 'scripts', 'escape.sh'))).toBe(true)
				materializer.destroy()
			} finally {
				await directory.cleanup()
				await outside.cleanup()
				await host.cleanup()
			}
		},
	)

	it('throws DESTROYED after destroy()', async () => {
		const directory = await buildTempDirectory()
		const host = await buildVendoredHost()
		try {
			const materializer = createMaterializer({ host: host.path })
			materializer.destroy()
			blueprintToPlan(blueprint('prune-destroyed-fixture', { surfaces: ['core'] }))
			let caught: unknown
			try {
				materializer.prune(directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('DESTROYED')
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})

	it('H1: fails CLOSED with a coded TARGET error when the host root does not resolve — target files untouched, nothing deleted', async () => {
		const directory = await buildTempDirectory()
		try {
			mkdirSync(join(directory.path, 'scripts'), { recursive: true })
			writeFileSync(join(directory.path, 'scripts', 'foreign-script.sh'), 'not vendored', 'utf8')

			const materializer = createMaterializer({ host: join(directory.path, 'does-not-exist-host') })
			blueprintToPlan(blueprint('prune-nonexistent-host-fixture', { surfaces: ['core'] }))
			let caught: unknown
			try {
				materializer.prune(directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
			// Nothing was deleted — the foreign file is still there, untouched.
			expect(existsSync(join(directory.path, 'scripts', 'foreign-script.sh'))).toBe(true)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('H1: a host that EXISTS but vendors nothing in scripts/ (an empty directory present, no manifest.json) still prunes every foreign file there — the legitimate empty-vendor case', async () => {
		const directory = await buildTempDirectory()
		const host = await buildTempDirectory()
		try {
			// Host EXISTS and has an empty scripts/ directory — a genuinely-empty
			// vendor, distinct from an unresolvable host (H1's fail-closed case).
			// `.claude/agents/` also exists (empty) so that PRUNE_DIRECTORIES
			// iteration doesn't throw on the OTHER directory.
			mkdirSync(join(host.path, 'scripts'), { recursive: true })
			mkdirSync(join(host.path, '.claude', 'agents'), { recursive: true })

			mkdirSync(join(directory.path, 'scripts'), { recursive: true })
			writeFileSync(join(directory.path, 'scripts', 'foreign-script.sh'), 'not vendored', 'utf8')

			const materializer = createMaterializer({ host: host.path })
			blueprintToPlan(blueprint('prune-empty-vendor-fixture', { surfaces: ['core'] }))
			const result = materializer.prune(directory.path)

			expect(result.removed).toEqual(['scripts/foreign-script.sh'])
			expect(existsSync(join(directory.path, 'scripts', 'foreign-script.sh'))).toBe(false)
			materializer.destroy()
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})

	it('materialize and repair both report removed: [] — prune is the only method that ever removes', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan(blueprint('budget', { surfaces: ['core'] }))
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const materializeResult = materializer.materialize(plan, directory.path)
			expect(materializeResult.removed).toEqual([])

			const repairResult = materializer.repair(
				plan,
				{
					findings: [],
					clean: true,
					complete: true,
					questions: [],
					drifted: 0,
					missing: 0,
					foreign: 0,
				},
				directory.path,
			)
			expect(repairResult.removed).toEqual([])
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})
})
