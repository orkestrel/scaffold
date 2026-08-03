import type { Plan } from '@src/core'
import {
	existsSync,
	mkdirSync,
	readFileSync,
	readdirSync,
	statSync,
	symlinkSync,
	writeFileSync,
} from 'node:fs'
import { createServer } from 'node:net'
import { join } from 'node:path'
import { attempt } from '@orkestrel/contract'
import { describe, expect, it } from 'vitest'
import { blueprint } from '@src/core'
import { blueprintToPlan } from '@src/core'
import { contentToHex } from '@src/core'
import { dependency } from '@src/core'
import { diffPlan } from '@src/core'
import { isScaffoldError } from '@src/core'
import { override } from '@src/core'
import {
	createMaterializer,
	hydratePlan,
	isVacant,
	MAX_FILESYSTEM_DEPTH,
	pruneTargets,
	readTarget,
} from '@src/server'
import { captureError, createRecorder } from '../../setup.js'
import {
	buildManifestHost,
	buildManifestPlan,
	buildRepairPlan,
	buildTempDirectory,
	buildVendoredHost,
	canSocket,
	canSymlink,
	hasModes,
	hostManifestOf,
	WORKSPACE_ROOT,
	writeHostManifest,
	writeHostStorage,
} from '../../setupServer.js'

describe('Materializer options boundary', () => {
	it('owns listener hooks before allocation and ignores later caller mutation', async () => {
		const directory = await buildTempDirectory()
		const calls: string[] = []
		const hooks = {
			done: () => {
				calls.push('owned')
			},
		}
		const materializer = createMaterializer({ on: hooks })
		hooks.done = () => {
			calls.push('mutated')
		}
		try {
			const plan = blueprintToPlan(blueprint('materializer-hooks', { src: [], app: ['core'] }), [
				'source',
			])
			materializer.materialize(plan, directory.path)
			expect(calls).toEqual(['owned'])
		} finally {
			materializer.destroy()
			await directory.cleanup()
		}
	})

	it('contains stateful event-hook proxy traps as coded option failures', () => {
		let reads = 0
		const hooks = new Proxy(
			{ done: () => undefined },
			{
				getOwnPropertyDescriptor(target, key) {
					reads += 1
					if (reads > 1) throw new Error('stateful hook trap')
					return Reflect.getOwnPropertyDescriptor(target, key)
				},
			},
		)
		const error = captureError(() => createMaterializer({ on: hooks }))

		expect(isScaffoldError(error) && error.code === 'INVALID').toBe(true)
	})
})

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
			expect(current['package.json']).toBe(contentToHex('{"name":"x"}'))
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
	it('rejects an over-depth target before mutation and preserves adjacent user data', async () => {
		const root = await buildTempDirectory()
		const materializer = createMaterializer()
		try {
			const sentinel = join(root.path, 'sentinel.txt')
			writeFileSync(sentinel, 'user-owned\n', 'utf8')
			const target = join(root.path, ...Array(MAX_FILESYSTEM_DEPTH + 1).fill('nested'))
			const plan = blueprintToPlan(blueprint('router', { src: ['core'] }))

			expect(() => materializer.materialize(plan, target)).toThrow(
				expect.objectContaining({ code: 'TARGET' }),
			)
			expect(readFileSync(sentinel, 'utf8')).toBe('user-owned\n')
			expect(existsSync(target)).toBe(false)
		} finally {
			materializer.destroy()
			await root.cleanup()
		}
	})

	it('rejects a directly planned hostile name before writing any artifact', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan({
				...blueprint('safe-app', { src: [], app: ['core', 'browser', 'server'] }),
				name: "x';throw new Error('owned')//",
			})
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })

			const error = captureError(() => materializer.materialize(plan, directory.path))

			expect(isScaffoldError(error) && error.code === 'INVALID').toBe(true)
			expect(readdirSync(directory.path)).toEqual([])
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('rejects repository metadata artifacts before mutation and preserves .git bytes', async () => {
		const directory = await buildTempDirectory()
		const materializer = createMaterializer()
		try {
			const git = join(directory.path, '.git')
			const config = join(git, 'config')
			mkdirSync(git)
			writeFileSync(config, 'user-owned repository metadata\n', 'utf8')
			const base = blueprintToPlan(blueprint('metadata-plan', { src: [], app: ['core'] }))
			const artifact = base.artifacts[0]
			if (artifact === undefined) throw new Error('expected an application artifact')
			const plan: Plan = {
				...base,
				artifacts: [{ ...artifact, path: '.git/config' }],
			}

			expect(() => materializer.materialize(plan, directory.path)).toThrow(
				expect.objectContaining({ code: 'WRITE' }),
			)
			expect(readFileSync(config, 'utf8')).toBe('user-owned repository metadata\n')
			expect(readdirSync(directory.path)).toEqual(['.git'])
		} finally {
			materializer.destroy()
			await directory.cleanup()
		}
	})

	it('rejects accessor and proxy plan graphs before staging or events', async () => {
		for (const variant of ['accessor', 'proxy']) {
			const directory = await buildTempDirectory()
			try {
				const plan = blueprintToPlan(blueprint('hostile-plan', { src: [], app: ['core'] }))
				let pathReads = 0
				let input = plan
				if (variant === 'proxy') {
					input = new Proxy(plan, {})
				} else {
					const artifact = plan.artifacts[0]
					if (artifact === undefined) throw new Error('expected an application artifact')
					Object.defineProperty(artifact, 'path', {
						configurable: true,
						get: () => {
							pathReads += 1
							return pathReads === 1 ? 'safe.ts' : '../escape.ts'
						},
					})
				}
				const writes: string[] = []
				const materializer = createMaterializer()
				materializer.emitter.on('write', (path) => {
					writes.push(path)
				})

				const result = attempt(() => materializer.materialize(input, directory.path))

				expect(result.success).toBe(false)
				expect(pathReads).toBe(0)
				expect(writes).toEqual([])
				expect(readdirSync(directory.path)).toEqual([])
				materializer.destroy()
			} finally {
				await directory.cleanup()
			}
		}
	})

	it.each([
		{ label: 'missing', path: 'missing.ts' },
		{ label: 'host-owned', path: 'AGENTS.md' },
		{ label: 'publication-boundary', path: 'package.json' },
	])('rejects a blueprintToPlan $label override before mutation', async ({ path }) => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan(
				blueprint('safe-app', {
					src: [],
					app: ['core', 'browser', 'server'],
					overrides: [override(path, 'replacement')],
				}),
			)
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })

			const error = captureError(() => materializer.materialize(plan, directory.path))

			expect(isScaffoldError(error) && error.code === 'INVALID').toBe(true)
			expect(readdirSync(directory.path)).toEqual([])
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('writes host copies and rendered artifacts into a vacant target, with matching real bytes', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }))
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
			expect(readFileSync(writtenPath, 'utf8')).toBe(renderedArtifact.content)

			expect(result.target).toBe(directory.path)
			expect(result.skipped).toEqual([])
			expect(result.written.length + result.copied.length).toBe(
				hydratePlan(plan, WORKSPACE_ROOT).artifacts.length,
			)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('a byte-identical host artifact round-trips through the real filesystem copy', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }))
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
			const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }))
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
			const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }))
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const result = materializer.materialize(plan, directory.path)
			expect(result.written.length + result.copied.length).toBe(
				hydratePlan(plan, WORKSPACE_ROOT).artifacts.length,
			)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it("rejects a file/descendant plan collision before an earlier artifact can block the later artifact's directory", async () => {
		const directory = await buildTempDirectory()
		try {
			// Validate the plan as one file tree before the first artifact writes.
			const plan: Plan = {
				blueprint: blueprint('write-fail-fixture', { src: ['core'] }),
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
			expect(caught.code).toBe('INVALID')
			expect(existsSync(join(directory.path, 'conflict'))).toBe(false)
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('preflights a late missing host source before writing an earlier computed artifact', async () => {
		const directory = await buildTempDirectory()
		const host = await buildTempDirectory()
		try {
			const plan: Plan = {
				blueprint: blueprint('preflight-fixture', { src: ['core'] }),
				groups: ['docs'],
				artifacts: [
					{ path: 'early.txt', group: 'docs', origin: 'computed', content: 'early' },
					{ path: 'missing.txt', group: 'docs', origin: 'host' },
				],
			}
			const materializer = createMaterializer({ host: host.path })
			const result = attempt(() => materializer.materialize(plan, directory.path))

			expect(result.success).toBe(false)
			expect(existsSync(join(directory.path, 'early.txt'))).toBe(false)
			expect(readdirSync(directory.path)).toEqual([])
			materializer.destroy()
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})

	it('emits copy/write per artifact then done, all AFTER the outcome', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }))
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
	it('rejects exact and portable case-only plan path collisions before writing', async () => {
		const directory = await buildTempDirectory()
		try {
			for (const paths of [
				['same.txt', 'same.txt'],
				['Skill.md', 'SKILL.md'],
			]) {
				const plan: Plan = {
					blueprint: blueprint('duplicate-plan-fixture', { src: ['core'] }),
					groups: ['docs'],
					artifacts: paths.map((path) => ({
						path,
						group: 'docs',
						origin: 'computed',
						content: path,
					})),
				}
				const materializer = createMaterializer({ host: WORKSPACE_ROOT })
				const result = attempt(() => materializer.materialize(plan, directory.path))
				materializer.destroy()

				expect(result.success).toBe(false)
				if (result.success || !isScaffoldError(result.error)) {
					throw new Error('expected a ScaffoldError to be returned')
				}
				expect(result.error.code).toBe('INVALID')
				expect(readdirSync(directory.path)).toEqual([])
			}
		} finally {
			await directory.cleanup()
		}
	})

	it('throws the WRITE containment error for a traversal DESTINATION path, writing nothing outside target', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan: Plan = {
				blueprint: blueprint('traversal-dest-fixture', { src: ['core'] }),
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
				blueprint: blueprint('traversal-source-fixture', { src: ['core'] }),
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
					src: ['core'],
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
				const benignPlan = blueprintToPlan(blueprint('budget', { src: ['core'] }))
				const materializer = createMaterializer({ host: WORKSPACE_ROOT })
				const benignResult = materializer.materialize(benignPlan, directory.path)
				expect(benignResult.written.length + benignResult.copied.length).toBe(
					hydratePlan(benignPlan, WORKSPACE_ROOT).artifacts.length,
				)

				// Plant a symlinked subdirectory inside the (now-materialized) target
				// that actually points OUTSIDE it.
				const linkPath = join(directory.path, 'escape-link')
				symlinkSync(outside.path, linkPath, 'dir')

				const plan: Plan = {
					blueprint: blueprint('symlink-escape-fixture', { src: ['core'] }),
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

	it.skipIf(!canSymlink)(
		'repair rejects an internal directory alias and preserves user-owned data (SKIPPED: environment cannot create symlinks)',
		async () => {
			const directory = await buildTempDirectory()
			try {
				const owned = join(directory.path, 'owned', 'nested')
				mkdirSync(owned, { recursive: true })
				const userFile = join(owned, 'user.txt')
				writeFileSync(userFile, 'user-owned', 'utf8')
				symlinkSync(join(directory.path, 'owned'), join(directory.path, 'alias'), 'dir')
				const plan: Plan = {
					blueprint: blueprint('internal-alias-fixture', { src: ['core'] }),
					groups: ['docs'],
					artifacts: [
						{
							path: 'alias/nested/user.txt',
							group: 'docs',
							origin: 'computed',
							content: 'replacement',
						},
					],
				}
				const materializer = createMaterializer({ host: WORKSPACE_ROOT })
				let caught: unknown
				try {
					materializer.repair(
						plan,
						{
							findings: [{ path: 'alias/nested/user.txt', group: 'docs', drift: 'stale' }],
							clean: false,
							complete: true,
							questions: [],
							drifted: 1,
							missing: 0,
							foreign: 0,
						},
						directory.path,
					)
				} catch (error) {
					caught = error
				}
				if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
				expect(caught.code).toBe('WRITE')
				expect(readFileSync(userFile, 'utf8')).toBe('user-owned')
				materializer.destroy()
			} finally {
				await directory.cleanup()
			}
		},
	)
})

// ── Materializer.materialize — group-scoped plan into a vacant target ───────

describe('Materializer.materialize — group-scoped plan', () => {
	it('writes ONLY the scoped groups artifacts — a deliberate partial tree', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan(blueprint('scoped-fixture', { src: ['core'] }), ['docs'])
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
	it('writes ONLY the missing/stale artifacts an Audit names, skipping aligned ones', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = buildRepairPlan()
			writeFileSync(join(directory.path, 'a.txt'), 'A', 'utf8') // aligned already
			writeFileSync(join(directory.path, 'b.txt'), 'B-old', 'utf8') // stale
			// c.txt is absent → missing

			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const result = materializer.repair(
				plan,
				diffPlan(
					plan,
					readTarget(
						directory.path,
						plan.artifacts.map((artifact) => artifact.path),
					),
				),
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
			const plan = buildRepairPlan()
			writeFileSync(join(directory.path, 'a.txt'), 'A', 'utf8')
			writeFileSync(join(directory.path, 'b.txt'), 'B-new', 'utf8')
			writeFileSync(join(directory.path, 'c.txt'), 'C', 'utf8')

			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const result = materializer.repair(
				plan,
				diffPlan(
					plan,
					readTarget(
						directory.path,
						plan.artifacts.map((artifact) => artifact.path),
					),
				),
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

	it('rejects duplicate contradictory findings before mutation', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan: Plan = {
				blueprint: blueprint('repair-duplicate-finding-fixture', { src: ['core'] }),
				groups: ['docs'],
				artifacts: [{ path: 'stale.txt', group: 'docs', origin: 'computed', content: 'canonical' }],
			}
			writeFileSync(join(directory.path, 'stale.txt'), 'stale', 'utf8')
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const result = attempt(() =>
				materializer.repair(
					plan,
					{
						findings: [
							{
								path: 'stale.txt',
								group: 'docs',
								drift: 'stale',
								observed: contentToHex('stale'),
							},
							{ path: 'stale.txt', group: 'docs', drift: 'aligned' },
						],
						clean: false,
						complete: true,
						questions: [],
						drifted: 1,
						missing: 0,
						foreign: 0,
					},
					directory.path,
				),
			)

			expect(result.success).toBe(false)
			expect(readFileSync(join(directory.path, 'stale.txt'), 'utf8')).toBe('stale')
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('a plan whose only divergence is template content writes NOTHING — diffPlan never reports a template finding as missing/stale', async () => {
		const directory = await buildTempDirectory()
		try {
			const plan = blueprintToPlan(blueprint('router', { src: ['core'] }), ['source'])
			expect(plan.artifacts.every((artifact) => artifact.origin === 'template')).toBe(true)
			// Current target is EMPTY — every template artifact is absent, the
			// most divergent case possible, yet still birth-only audit-exempt.
			const audit = diffPlan(plan, {})
			expect(audit.findings.every((finding) => finding.drift === 'aligned')).toBe(true)
			expect(audit.findings.some((finding) => finding.drift === 'missing')).toBe(false)
			expect(audit.findings.some((finding) => finding.drift === 'stale')).toBe(false)

			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const result = materializer.repair(plan, audit, directory.path)

			expect(result.written).toEqual([])
			expect(result.copied).toEqual([])
			expect(result.skipped.length).toBe(plan.artifacts.length)
			for (const artifact of plan.artifacts) {
				expect(existsSync(join(directory.path, artifact.path))).toBe(false)
			}
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})

	it('preflights every selected repair artifact before mutating an earlier stale file', async () => {
		const directory = await buildTempDirectory()
		const host = await buildTempDirectory()
		try {
			writeFileSync(join(directory.path, 'early.txt'), 'original', 'utf8')
			writeFileSync(join(host.path, 'manifest.json'), '{', 'utf8')
			const plan: Plan = {
				blueprint: blueprint('repair-preflight-fixture', { src: ['core'] }),
				groups: ['docs'],
				artifacts: [
					{ path: 'early.txt', group: 'docs', origin: 'computed', content: 'canonical' },
					{ path: 'missing.txt', group: 'docs', origin: 'host' },
				],
			}
			const materializer = createMaterializer({ host: host.path })
			const result = attempt(() =>
				materializer.repair(
					plan,
					diffPlan(
						plan,
						readTarget(
							directory.path,
							plan.artifacts.map((artifact) => artifact.path),
						),
					),
					directory.path,
				),
			)

			expect(result.success).toBe(false)
			expect(readFileSync(join(directory.path, 'early.txt'), 'utf8')).toBe('original')
			materializer.destroy()
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})

	it('does not preflight an invalid host artifact that the audit explicitly skips', async () => {
		const directory = await buildTempDirectory()
		const host = await buildTempDirectory()
		try {
			writeFileSync(join(directory.path, 'early.txt'), 'original', 'utf8')
			writeFileSync(join(directory.path, 'missing.txt'), 'project-owned', 'utf8')
			writeFileSync(join(host.path, 'manifest.json'), '{', 'utf8')
			const plan: Plan = {
				blueprint: blueprint('repair-selected-fixture', { src: ['core'] }),
				groups: ['docs'],
				artifacts: [
					{ path: 'early.txt', group: 'docs', origin: 'computed', content: 'canonical' },
					{ path: 'missing.txt', group: 'docs', origin: 'host' },
				],
			}
			const materializer = createMaterializer({ host: host.path })
			const result = materializer.repair(
				plan,
				diffPlan(
					plan,
					readTarget(
						directory.path,
						plan.artifacts.map((artifact) => artifact.path),
					),
				),
				directory.path,
			)

			expect(result.written).toEqual(['early.txt'])
			expect(result.skipped).toEqual(['missing.txt'])
			expect(readFileSync(join(directory.path, 'early.txt'), 'utf8')).toBe('canonical')
			materializer.destroy()
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})
})

// ── Materializer — manifest-aware host copy ─────────────────────────────────

describe('Materializer — manifest-aware host copy', () => {
	it('maps aliased file and directory sources beneath the artifact target', async () => {
		const directory = await buildTempDirectory()
		const host = await buildTempDirectory()
		try {
			const entries = [
				{ storage: 'rules', destination: 'AGENTS.md', executable: false },
				{
					storage: 'agents/skills/harden/SKILL.md',
					destination: '.agents/skills/harden/SKILL.md',
					executable: false,
				},
			]
			writeHostManifest(
				host.path,
				hostManifestOf(entries, ['.agents', '.agents/skills', '.agents/skills/harden']),
			)
			writeHostStorage(host.path, entries)
			const plan: Plan = {
				blueprint: blueprint('manifest-alias-fixture', { src: ['core'] }),
				groups: ['orchestration'],
				artifacts: [
					{
						path: 'COPY.md',
						group: 'orchestration',
						origin: 'host',
						source: 'AGENTS.md',
					},
					{
						path: 'copied-agents',
						group: 'orchestration',
						origin: 'host',
						source: '.agents',
					},
				],
			}
			const materializer = createMaterializer({ host: host.path })
			materializer.materialize(plan, directory.path)

			expect(readFileSync(join(directory.path, 'COPY.md'), 'utf8')).toBe('AGENTS.md')
			expect(
				readFileSync(join(directory.path, 'copied-agents', 'skills', 'harden', 'SKILL.md'), 'utf8'),
			).toBe('.agents/skills/harden/SKILL.md')
			expect(existsSync(join(directory.path, 'AGENTS.md'))).toBe(false)
			expect(existsSync(join(directory.path, '.agents'))).toBe(false)
			materializer.destroy()
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})

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
				blueprint: blueprint('rawroot-1to1-fixture', { src: ['core'] }),
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

	it('a malformed host manifest.json produces a coded error', async () => {
		const directory = await buildTempDirectory()
		const host = await buildTempDirectory()
		try {
			// Not an array of manifest entries — `readHostManifest`'s documented
			// coded-error shape.
			writeFileSync(join(host.path, 'manifest.json'), '{"not":"an array"}', 'utf8')
			const plan: Plan = {
				blueprint: blueprint('malformed-manifest-fixture', { src: ['core'] }),
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
					src: ['core'],
					dependencies: [dependency('@orkestrel/msg', '^0.0.1')],
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
				blueprint: blueprint('missing-entry-fixture', { src: ['core'] }),
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
				blueprint: blueprint('rawroot-missing-fixture', { src: ['core'] }),
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
			expect(caught.code).toBe('TARGET')
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

			const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }))
			for (const operation of [
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
				const caught = captureError(operation)
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
	it("deletes foreign files only in the Claude/Codex agent and script directories, emits 'remove', and preserves vendored/out-of-scope files", async () => {
		const directory = await buildTempDirectory()
		const host = await buildVendoredHost()
		try {
			// Target already carries the vendored files (untouched by prune) PLUS
			// a foreign file in each prune-owned directory (deleted) PLUS a
			// foreign file OUTSIDE those directories (never prune's concern).
			mkdirSync(join(directory.path, '.claude', 'agents'), { recursive: true })
			mkdirSync(join(directory.path, '.codex', 'agents'), { recursive: true })
			mkdirSync(join(directory.path, 'scripts'), { recursive: true })
			writeFileSync(join(directory.path, '.claude', 'agents', 'scout.md'), 'vendored scout', 'utf8')
			writeFileSync(
				join(directory.path, '.claude', 'agents', 'foreign-agent.md'),
				'not vendored',
				'utf8',
			)
			writeFileSync(
				join(directory.path, '.codex', 'agents', 'scout.toml'),
				'vendored scout',
				'utf8',
			)
			writeFileSync(
				join(directory.path, '.codex', 'agents', 'foreign-agent.toml'),
				'not vendored',
				'utf8',
			)
			writeFileSync(join(directory.path, 'scripts', 'build.sh'), 'vendored build', 'utf8')
			writeFileSync(join(directory.path, 'scripts', 'foreign-script.sh'), 'not vendored', 'utf8')
			writeFileSync(join(directory.path, 'README.md'), 'outside prune scope', 'utf8')

			const materializer = createMaterializer({ host: host.path })
			const removeRecorder = createRecorder<readonly [path: string]>()
			materializer.emitter.on('remove', removeRecorder.handler)

			blueprintToPlan(blueprint('prune-fixture', { src: ['core'] }))
			const result = materializer.prune(
				directory.path,
				readTarget(directory.path, pruneTargets(directory.path, host.path)),
			)

			expect([...result.removed].sort()).toEqual(
				[
					'.claude/agents/foreign-agent.md',
					'.codex/agents/foreign-agent.toml',
					'scripts/foreign-script.sh',
				].sort(),
			)
			expect(result.written).toEqual([])
			expect(result.copied).toEqual([])
			expect(result.skipped).toEqual([])

			expect(removeRecorder.count).toBe(3)
			expect([...removeRecorder.calls.map((call) => call[0])].sort()).toEqual(
				[
					'.claude/agents/foreign-agent.md',
					'.codex/agents/foreign-agent.toml',
					'scripts/foreign-script.sh',
				].sort(),
			)

			// Vendored files survive.
			expect(existsSync(join(directory.path, '.claude/agents/scout.md'))).toBe(true)
			expect(existsSync(join(directory.path, '.codex/agents/scout.toml'))).toBe(true)
			expect(existsSync(join(directory.path, 'scripts/build.sh'))).toBe(true)
			// In-scope foreign files are gone.
			expect(existsSync(join(directory.path, '.claude/agents/foreign-agent.md'))).toBe(false)
			expect(existsSync(join(directory.path, '.codex/agents/foreign-agent.toml'))).toBe(false)
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
				blueprintToPlan(blueprint('prune-symlink-fixture', { src: ['core'] }))
				let caught: unknown
				try {
					materializer.prune(directory.path, {
						'scripts/escape.sh': contentToHex('do not touch'),
					})
				} catch (error) {
					caught = error
				}
				if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
				expect(caught.code).toBe('TARGET')
				// Neither the outside file nor the symlink itself was touched — the
				// target preview containment check throws before a write transaction begins.
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

	it.skipIf(!canSymlink)(
		'refuses an internal prune-root alias and preserves all user-owned data (SKIPPED: environment cannot create symlinks)',
		async () => {
			const directory = await buildTempDirectory()
			const host = await buildVendoredHost()
			try {
				const userRoot = join(directory.path, 'user-data')
				mkdirSync(userRoot, { recursive: true })
				const userFile = join(userRoot, 'foreign-script.sh')
				writeFileSync(userFile, 'user-owned', 'utf8')
				symlinkSync(userRoot, join(directory.path, 'scripts'), 'dir')
				const materializer = createMaterializer({ host: host.path })
				let caught: unknown
				try {
					materializer.prune(
						directory.path,
						readTarget(directory.path, pruneTargets(directory.path, host.path)),
					)
				} catch (error) {
					caught = error
				}
				if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
				expect(caught.code).toBe('TARGET')
				expect(readFileSync(userFile, 'utf8')).toBe('user-owned')
				expect(existsSync(join(directory.path, 'scripts'))).toBe(true)
				materializer.destroy()
			} finally {
				await directory.cleanup()
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
			blueprintToPlan(blueprint('prune-destroyed-fixture', { src: ['core'] }))
			let caught: unknown
			try {
				materializer.prune(directory.path, {})
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

	it('fails closed when the host root does not resolve and preserves target files', async () => {
		const directory = await buildTempDirectory()
		try {
			mkdirSync(join(directory.path, 'scripts'), { recursive: true })
			writeFileSync(join(directory.path, 'scripts', 'foreign-script.sh'), 'not vendored', 'utf8')

			const materializer = createMaterializer({ host: join(directory.path, 'does-not-exist-host') })
			blueprintToPlan(blueprint('prune-nonexistent-host-fixture', { src: ['core'] }))
			let caught: unknown
			try {
				materializer.prune(directory.path, {})
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

	it('fails closed on a truncated manifest that omits a prune root, leaving every target file untouched', async () => {
		const directory = await buildTempDirectory()
		const host = await buildTempDirectory()
		try {
			const manifest = hostManifestOf(
				[
					{
						storage: 'claude/agents/scout.md',
						destination: '.claude/agents/scout.md',
						executable: false,
					},
				],
				['.claude', '.claude/agents'],
			)
			writeHostStorage(host.path, manifest.entries)
			writeHostManifest(host.path, manifest)
			mkdirSync(join(directory.path, 'scripts'), { recursive: true })
			writeFileSync(join(directory.path, 'scripts', 'foreign-script.sh'), 'keep', 'utf8')

			const materializer = createMaterializer({ host: host.path })
			const result = attempt(() =>
				materializer.prune(
					directory.path,
					readTarget(directory.path, pruneTargets(directory.path, host.path)),
				),
			)
			materializer.destroy()

			expect(result.success).toBe(false)
			if (result.success || !isScaffoldError(result.error)) {
				throw new Error('expected a ScaffoldError to be thrown')
			}
			expect(result.error.code).toBe('TARGET')
			expect(readFileSync(join(directory.path, 'scripts', 'foreign-script.sh'), 'utf8')).toBe(
				'keep',
			)
		} finally {
			await directory.cleanup()
			await host.cleanup()
		}
	})

	it('prunes foreign scripts when an existing raw host vendors an empty scripts directory', async () => {
		const directory = await buildTempDirectory()
		const host = await buildTempDirectory()
		try {
			// Host EXISTS and has an empty scripts/ directory — a genuinely-empty
			// vendor, distinct from an unresolvable host.
			// `.claude/agents/` also exists (empty) so that PRUNE_DIRECTORIES
			// iteration doesn't throw on the OTHER directory.
			mkdirSync(join(host.path, 'scripts'), { recursive: true })
			mkdirSync(join(host.path, '.claude', 'agents'), { recursive: true })

			mkdirSync(join(directory.path, 'scripts'), { recursive: true })
			writeFileSync(join(directory.path, 'scripts', 'foreign-script.sh'), 'not vendored', 'utf8')

			const materializer = createMaterializer({ host: host.path })
			blueprintToPlan(blueprint('prune-empty-vendor-fixture', { src: ['core'] }))
			const result = materializer.prune(
				directory.path,
				readTarget(directory.path, pruneTargets(directory.path, host.path)),
			)

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
			const plan = blueprintToPlan(blueprint('budget', { src: ['core'] }))
			const materializer = createMaterializer({ host: WORKSPACE_ROOT })
			const materializeResult = materializer.materialize(plan, directory.path)
			expect(materializeResult.removed).toEqual([])

			const repairResult = materializer.repair(
				plan,
				diffPlan(
					plan,
					readTarget(
						directory.path,
						plan.artifacts.map((artifact) => artifact.path),
					),
				),
				directory.path,
			)
			expect(repairResult.removed).toEqual([])
			materializer.destroy()
		} finally {
			await directory.cleanup()
		}
	})
})
