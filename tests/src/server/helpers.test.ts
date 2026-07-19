import type { Plan } from '@src/core'
import { dirname, isAbsolute, join } from 'node:path'
import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { describe, expect, it } from 'vitest'
import { blueprint, diffPlan, isScaffoldError, validateBlueprint } from '@src/core'
import { deriveBlueprint, discoverPackages, hostRoot, hydratePlan } from '@src/server'
import { buildTempDirectory, WORKSPACE_ROOT } from '../../setupServer.js'

// Writes a minimal `package.json` plus each requested `src/<surface>/` directory —
// the shape `deriveBlueprint` reads back off a live repo.
function buildBlueprintFixture(
	root: string,
	options: {
		readonly name: string
		readonly surfaces?: readonly ('core' | 'browser' | 'server')[]
		readonly dependencies?: Record<string, string>
		readonly peerDependencies?: Record<string, string>
		readonly peerDependenciesMeta?: Record<string, { optional?: boolean }>
		readonly devDependencies?: Record<string, string>
	},
): void {
	mkdirSync(root, { recursive: true })
	writeFileSync(
		join(root, 'package.json'),
		JSON.stringify({
			name: options.name,
			dependencies: options.dependencies ?? {},
			peerDependencies: options.peerDependencies ?? {},
			peerDependenciesMeta: options.peerDependenciesMeta ?? {},
			devDependencies: options.devDependencies ?? {},
		}),
		'utf8',
	)
	for (const surface of options.surfaces ?? []) {
		mkdirSync(join(root, 'src', surface), { recursive: true })
	}
}

// Writes a bare package.json at `dir` (fixture for `discoverPackages`).
function writeManifest(dir: string, manifest: Record<string, unknown>): void {
	mkdirSync(dir, { recursive: true })
	writeFileSync(join(dir, 'package.json'), JSON.stringify(manifest), 'utf8')
}

// ── hostRoot ─────────────────────────────────────────────────────────────────

describe('hostRoot', () => {
	it("resolves to the module's own package root's dist/host, anchored at the real repo root", () => {
		const result = hostRoot()
		expect(result.endsWith(join('dist', 'host'))).toBe(true)
		// The package root is TWO segments up from `.../dist/host` — assert it
		// real-path-resolves to the actual repo root this test suite runs from.
		expect(realpathSync(dirname(dirname(result)))).toBe(realpathSync(WORKSPACE_ROOT))
	})
})

// ── deriveBlueprint ──────────────────────────────────────────────────────────

describe('deriveBlueprint', () => {
	it('derives name, surfaces, dependencies, optional peers, and extras (baseline excluded) from a core+server repo', async () => {
		const directory = await buildTempDirectory()
		try {
			buildBlueprintFixture(directory.path, {
				name: '@orkestrel/demo',
				surfaces: ['core', 'server'],
				dependencies: {
					'@orkestrel/contract': '^0.0.5',
					'left-pad': '^1.3.0', // non-@orkestrel — ignored
				},
				peerDependencies: {
					'@orkestrel/emitter': '^0.0.3',
				},
				peerDependenciesMeta: {
					'@orkestrel/emitter': { optional: true },
				},
				devDependencies: {
					'@orkestrel/guide': '^1.0.0', // baseline — excluded from extras
					'@orkestrel/scaffold': '^1.0.0', // baseline — excluded from extras
					'@orkestrel/database': '^0.0.5', // the ONE extra beyond baseline
					typescript: '^5.5.0', // tool dep, non-@orkestrel — ignored
					vitest: '^2.1.0', // tool dep, non-@orkestrel — ignored
				},
			})

			const result = deriveBlueprint(directory.path)

			expect(result.name).toBe('demo')
			expect(result.surfaces).toEqual(['core', 'server'])
			expect(result.dependencies).toEqual([{ name: '@orkestrel/contract', range: '^0.0.5' }])
			expect(result.peers).toEqual([
				{ name: '@orkestrel/emitter', range: '^0.0.3', optional: true },
			])
			expect(result.extras).toEqual([{ name: '@orkestrel/database', range: '^0.0.5' }])
		} finally {
			await directory.cleanup()
		}
	})

	it('H3: excludes from extras a devDependency ALSO present in peerDependencies (the middleware pattern) — extras stays clean, peers keeps it, and the derived blueprint validates clean', async () => {
		const directory = await buildTempDirectory()
		try {
			buildBlueprintFixture(directory.path, {
				name: '@orkestrel/middleware',
				surfaces: ['core', 'server'],
				peerDependencies: {
					'@orkestrel/database': '^0.0.5',
					'@orkestrel/server': '^0.0.5',
				},
				devDependencies: {
					'@orkestrel/guide': '^1.0.0', // baseline — excluded from extras
					'@orkestrel/scaffold': '^1.0.0', // baseline — excluded from extras
					// Both peers ALSO dev-installed for local testing — must NOT
					// double-land in extras (would collide with peers, a blocking gate).
					'@orkestrel/database': '^0.0.5',
					'@orkestrel/server': '^0.0.5',
					'@orkestrel/contract': '^0.0.5', // a genuine extra, unrelated to peers
				},
			})

			const result = deriveBlueprint(directory.path)

			expect(result.peers).toEqual(
				expect.arrayContaining([
					{ name: '@orkestrel/database', range: '^0.0.5' },
					{ name: '@orkestrel/server', range: '^0.0.5' },
				]),
			)
			expect(result.peers).toHaveLength(2)
			expect(result.extras).toEqual([{ name: '@orkestrel/contract', range: '^0.0.5' }])
			expect(result.extras.some((extra) => extra.name === '@orkestrel/database')).toBe(false)
			expect(result.extras.some((extra) => extra.name === '@orkestrel/server')).toBe(false)

			const validation = validateBlueprint(result)
			expect(validation.valid).toBe(true)
			expect(validation.questions).toEqual([])
		} finally {
			await directory.cleanup()
		}
	})

	it('H3: excludes from extras a devDependency ALSO present in dependencies', async () => {
		const directory = await buildTempDirectory()
		try {
			buildBlueprintFixture(directory.path, {
				name: '@orkestrel/dep-and-extra',
				surfaces: ['core'],
				dependencies: {
					'@orkestrel/contract': '^0.0.5',
				},
				devDependencies: {
					'@orkestrel/contract': '^0.0.5', // also dev-installed for testing
				},
			})

			const result = deriveBlueprint(directory.path)

			expect(result.dependencies).toEqual([{ name: '@orkestrel/contract', range: '^0.0.5' }])
			expect(result.extras).toEqual([])

			const validation = validateBlueprint(result)
			expect(validation.valid).toBe(true)
		} finally {
			await directory.cleanup()
		}
	})

	it('derives a server-only surfaces list from a server-only repo', async () => {
		const directory = await buildTempDirectory()
		try {
			buildBlueprintFixture(directory.path, { name: '@orkestrel/mailer', surfaces: ['server'] })
			const result = deriveBlueprint(directory.path)
			expect(result.surfaces).toEqual(['server'])
		} finally {
			await directory.cleanup()
		}
	})

	it('throws a coded TARGET error for a non-@orkestrel package name', async () => {
		const directory = await buildTempDirectory()
		try {
			buildBlueprintFixture(directory.path, { name: 'not-orkestrel-thing', surfaces: ['core'] })
			let caught: unknown
			try {
				deriveBlueprint(directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
		} finally {
			await directory.cleanup()
		}
	})

	it('throws a coded TARGET error when the target carries none of the three src/<surface> directories', async () => {
		const directory = await buildTempDirectory()
		try {
			buildBlueprintFixture(directory.path, { name: '@orkestrel/empty' }) // no surfaces at all
			let caught: unknown
			try {
				deriveBlueprint(directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
		} finally {
			await directory.cleanup()
		}
	})

	it('throws a coded TARGET error when package.json is absent', async () => {
		const directory = await buildTempDirectory()
		try {
			let caught: unknown
			try {
				deriveBlueprint(directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
		} finally {
			await directory.cleanup()
		}
	})

	it('throws a coded TARGET error when package.json is not valid JSON (adjacent edge to the absent-manifest case above)', async () => {
		const directory = await buildTempDirectory()
		try {
			mkdirSync(directory.path, { recursive: true })
			writeFileSync(join(directory.path, 'package.json'), '{ not json', 'utf8')
			let caught: unknown
			try {
				deriveBlueprint(directory.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
		} finally {
			await directory.cleanup()
		}
	})
})

// ── discoverPackages ─────────────────────────────────────────────────────────

describe('discoverPackages', () => {
	it('lists only @orkestrel-named child packages as absolute, code-unit-sorted paths', async () => {
		const root = await buildTempDirectory()
		try {
			// Mixed-case directory names so a naive case-insensitive/locale sort
			// would disagree with the documented CODE-UNIT sort ('B'/'Z' < 'a').
			writeManifest(join(root.path, 'Beta'), { name: '@orkestrel/beta' })
			writeManifest(join(root.path, 'Zeta'), { name: '@orkestrel/zeta' })
			writeManifest(join(root.path, 'alpha'), { name: '@orkestrel/alpha' })
			writeManifest(join(root.path, 'not-orkestrel'), { name: 'some-other-package' })
			mkdirSync(join(root.path, 'plain-dir'), { recursive: true }) // no package.json at all
			// An unreadable "package.json" — a DIRECTORY at that path, not a file.
			mkdirSync(join(root.path, 'broken', 'package.json'), { recursive: true })
			// A stray file (not a directory) at the fleet root — must be skipped, not throw.
			writeFileSync(join(root.path, 'README.md'), 'not a package', 'utf8')

			const result = discoverPackages(root.path)

			expect(result).toEqual([
				join(root.path, 'Beta'),
				join(root.path, 'Zeta'),
				join(root.path, 'alpha'),
			])
			expect(result.every((path) => isAbsolute(path))).toBe(true)
		} finally {
			await root.cleanup()
		}
	})
})

// ── hydratePlan ──────────────────────────────────────────────────────────────

describe('hydratePlan', () => {
	it('attaches real host bytes to a host-origin artifact — manifest-aware', async () => {
		const host = await buildTempDirectory()
		try {
			writeFileSync(join(host.path, 'gitignore'), 'node_modules\n', 'utf8')
			writeFileSync(
				join(host.path, 'manifest.json'),
				JSON.stringify([{ storage: 'gitignore', destination: '.gitignore', executable: false }]),
				'utf8',
			)
			const plan: Plan = {
				blueprint: blueprint('hydrate-manifest-fixture', { surfaces: ['core'] }),
				groups: ['configs'],
				artifacts: [{ path: '.gitignore', group: 'configs', origin: 'host' }],
			}

			const hydrated = hydratePlan(plan, host.path)

			expect(hydrated.artifacts[0]?.content).toBe(
				readFileSync(join(host.path, 'gitignore'), 'utf8'),
			)
		} finally {
			await host.cleanup()
		}
	})

	it('attaches real host bytes to a host-origin artifact — raw root (1:1, no manifest.json)', async () => {
		const host = await buildTempDirectory()
		try {
			writeFileSync(join(host.path, 'notes.txt'), 'raw root content\n', 'utf8')
			const plan: Plan = {
				blueprint: blueprint('hydrate-rawroot-fixture', { surfaces: ['core'] }),
				groups: ['docs'],
				artifacts: [{ path: 'notes.txt', group: 'docs', origin: 'host' }],
			}

			const hydrated = hydratePlan(plan, host.path)

			expect(hydrated.artifacts[0]?.content).toBe('raw root content\n')
		} finally {
			await host.cleanup()
		}
	})

	it(
		'diffPlan audits a host-origin artifact by PRESENCE ONLY, hydrated or not — a byte-mutated ' +
			"target still reads 'aligned', never 'stale' (diffPlan's own documented contract: a host " +
			'artifact carries no diffable content, hydration or none)',
		async () => {
			const host = await buildTempDirectory()
			try {
				writeFileSync(join(host.path, 'notes.txt'), 'host content\n', 'utf8')
				const plan: Plan = {
					blueprint: blueprint('hydrate-diff-fixture', { surfaces: ['core'] }),
					groups: ['docs'],
					artifacts: [{ path: 'notes.txt', group: 'docs', origin: 'host' }],
				}
				const current = { 'notes.txt': 'byte-mutated target content\n' }

				const unhydratedAudit = diffPlan(plan, current)
				expect(unhydratedAudit.findings).toEqual([
					{ path: 'notes.txt', group: 'docs', drift: 'aligned' },
				])

				const hydrated = hydratePlan(plan, host.path)
				expect(hydrated.artifacts[0]?.content).toBe('host content\n') // hydration DID attach content

				const hydratedAudit = diffPlan(hydrated, current)
				// Hydration adds `content` for the Materializer's copy, but
				// `diffPlan`'s host branch never reads `artifact.content` for
				// `origin === 'host'` — presence only, `missing` or `aligned`,
				// documented as "never `stale`". The hydrated audit is therefore
				// IDENTICAL to the un-hydrated one, even though the target's real
				// bytes differ from the host's real bytes.
				expect(hydratedAudit.findings).toEqual(unhydratedAudit.findings)
			} finally {
				await host.cleanup()
			}
		},
	)

	it('an absent host source file leaves the artifact untouched (no content attached, no throw)', async () => {
		const host = await buildTempDirectory()
		try {
			const plan: Plan = {
				blueprint: blueprint('hydrate-absent-fixture', { surfaces: ['core'] }),
				groups: ['docs'],
				artifacts: [{ path: 'missing.txt', group: 'docs', origin: 'host' }],
			}

			const hydrated = hydratePlan(plan, host.path)

			expect(hydrated.artifacts[0]?.content).toBeUndefined()
			expect(existsSync(join(host.path, 'missing.txt'))).toBe(false)
		} finally {
			await host.cleanup()
		}
	})

	it('wraps a genuine unreadable host source into a coded TARGET error', async () => {
		const host = await buildTempDirectory()
		try {
			const socketPath = join(host.path, 'broken-socket')
			const server = createServer()
			await new Promise<void>((resolvePromise, reject) => {
				server.once('error', reject)
				server.listen(socketPath, () => resolvePromise())
			})
			try {
				const plan: Plan = {
					blueprint: blueprint('hydrate-unreadable-fixture', { surfaces: ['core'] }),
					groups: ['docs'],
					artifacts: [{ path: 'broken-socket', group: 'docs', origin: 'host' }],
				}
				let caught: unknown
				try {
					hydratePlan(plan, host.path)
				} catch (error) {
					caught = error
				}
				if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
				expect(caught.code).toBe('TARGET')
			} finally {
				await new Promise<void>((resolvePromise) => server.close(() => resolvePromise()))
			}
		} finally {
			await host.cleanup()
		}
	})
})
