import type { Artifact, Plan } from '@src/core'
import { existsSync, mkdirSync, readFileSync, symlinkSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { blueprint } from '@src/core'
import { blueprintToPlan } from '@src/core'
import { dependency } from '@src/core'
import { isScaffoldError } from '@src/core'
import { createMaterializer, isVacant, readTarget } from '@src/server'
import { createRecorder } from '../../setup.js'
import { buildTempDirectory, WORKSPACE_ROOT } from '../../setupServer.js'

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

	it('wraps a genuine read failure on an EXISTING path into a coded TARGET error (a socket cannot be read as a file, even as root)', async () => {
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
	})
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

	it('repair refuses to write through a SYMLINKED subdirectory that escapes the target (real-path containment, no vacancy gate to shield it)', async () => {
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
	})
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
