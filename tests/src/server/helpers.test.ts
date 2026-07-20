import type { Plan } from '@src/core'
import { dirname, isAbsolute, join } from 'node:path'
import {
	chmodSync,
	existsSync,
	mkdirSync,
	readFileSync,
	realpathSync,
	writeFileSync,
} from 'node:fs'
import { createServer } from 'node:net'
import { describe, expect, it } from 'vitest'
import {
	blueprint,
	diffPlan,
	isRecord,
	isScaffoldError,
	packageManifest,
	validateBlueprint,
} from '@src/core'
import {
	catalogPackages,
	createMaterializer,
	deriveBlueprint,
	discoverPackages,
	hostRoot,
	hydratePlan,
	isManifestEntry,
	locateHostSource,
	PRUNE_DIRECTORIES,
	readTarget,
	selectOrkestrelEntries,
	stageHost,
	storagePath,
	vendoredPruneSet,
} from '@src/server'
import { buildTempDirectory, canSocket, WORKSPACE_ROOT } from '../../setupServer.js'

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
		readonly bin?: boolean
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
	if (options.bin === true) {
		mkdirSync(join(root, 'src', 'bin'), { recursive: true })
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

	it('derives engine: false for a repo with no src/bin directory (structural, not name-based)', async () => {
		const directory = await buildTempDirectory()
		try {
			buildBlueprintFixture(directory.path, {
				name: '@orkestrel/demo',
				surfaces: ['core', 'server'],
			})

			const result = deriveBlueprint(directory.path)

			expect(result.engine).toBe(false)
		} finally {
			await directory.cleanup()
		}
	})

	it('derives engine: true structurally from an existing src/bin directory', async () => {
		const directory = await buildTempDirectory()
		try {
			buildBlueprintFixture(directory.path, {
				name: '@orkestrel/scaffold',
				surfaces: ['core', 'server'],
				bin: true,
			})

			const result = deriveBlueprint(directory.path)

			expect(result.engine).toBe(true)
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

	it('U12c FIX 3: derives an EXTERNAL (non-@orkestrel) devDependency as an extra too — round-trips zod, keeps baseline (typescript/vitest/etc) and @orkestrel/guide+scaffold excluded', async () => {
		const directory = await buildTempDirectory()
		try {
			buildBlueprintFixture(directory.path, {
				name: '@orkestrel/demo-external-extra',
				surfaces: ['core'],
				devDependencies: {
					'@orkestrel/guide': '^1.0.0', // baseline — excluded from extras
					'@orkestrel/scaffold': '^1.0.0', // baseline — excluded from extras
					typescript: '^6.0.3', // baseline (non-@orkestrel) — excluded from extras
					vitest: '^4.1.10', // baseline (non-@orkestrel) — excluded from extras
					zod: '^3.23.0', // the ONE external extra beyond baseline
				},
			})

			const result = deriveBlueprint(directory.path)

			expect(result.extras).toEqual([{ name: 'zod', range: '^3.23.0' }])

			const validation = validateBlueprint(result)
			expect(validation.valid).toBe(true)
			expect(validation.questions).toEqual([])
		} finally {
			await directory.cleanup()
		}
	})

	it('P2: an mcp-shaped fixture (dev-installed peers) round-trips through derive→recompile with both peers RETAINED in devDependencies', async () => {
		const directory = await buildTempDirectory()
		try {
			// The live @orkestrel/mcp shape: two peers, both ALSO dev-installed for
			// local testing (the fleet convention, per @orkestrel/middleware too).
			buildBlueprintFixture(directory.path, {
				name: '@orkestrel/mcp',
				surfaces: ['core', 'server'],
				peerDependencies: {
					'@orkestrel/router': '^0.0.4',
					'@orkestrel/server': '^0.0.6',
				},
				devDependencies: {
					'@orkestrel/guide': '^1.0.0',
					'@orkestrel/scaffold': '^1.0.0',
					'@orkestrel/router': '^0.0.4',
					'@orkestrel/server': '^0.0.6',
				},
			})

			const derived = deriveBlueprint(directory.path)
			expect(derived.peers).toEqual(
				expect.arrayContaining([
					{ name: '@orkestrel/router', range: '^0.0.4' },
					{ name: '@orkestrel/server', range: '^0.0.6' },
				]),
			)
			expect(derived.extras).toEqual([])

			const recompiled = packageManifest(derived)
			const parsed: unknown = JSON.parse(recompiled)
			const dev = isRecord(parsed) && isRecord(parsed.devDependencies) ? parsed.devDependencies : {}
			expect(dev['@orkestrel/router']).toBe('^0.0.4')
			expect(dev['@orkestrel/server']).toBe('^0.0.6')
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

// ── catalogPackages ──────────────────────────────────────────────────────────

/** Writes a package with its `package.json` (name/version) and, when given, its `guides/src/<short>.md`. */
function writeCatalogPackage(
	rootPath: string,
	directoryName: string,
	options: {
		readonly name: string
		readonly version: string
		readonly guide?: string
	},
): void {
	const directory = join(rootPath, directoryName)
	writeManifest(directory, { name: options.name, version: options.version })
	if (options.guide !== undefined) {
		const short = options.name.slice('@orkestrel/'.length)
		mkdirSync(join(directory, 'guides', 'src'), { recursive: true })
		writeFileSync(join(directory, 'guides', 'src', `${short}.md`), options.guide, 'utf8')
	}
}

describe('catalogPackages', () => {
	it('extracts each package guide’s first blockquote, flattened to one line', async () => {
		const root = await buildTempDirectory()
		try {
			writeCatalogPackage(root.path, 'router', {
				name: '@orkestrel/router',
				version: '0.0.5',
				guide: '# Router\n\n> A tiny\n> hash-router.\n\n## Surface\n',
			})

			const result = catalogPackages([root.path])

			expect(result).toEqual([
				{ name: '@orkestrel/router', version: '0.0.5', description: 'A tiny hash-router.' },
			])
		} finally {
			await root.cleanup()
		}
	})

	it('takes ONLY the first paragraph of a multi-paragraph blockquote overview, never the whole quote glued together', async () => {
		const root = await buildTempDirectory()
		try {
			writeCatalogPackage(root.path, 'router', {
				name: '@orkestrel/router',
				version: '0.0.5',
				guide:
					'# Router\n\n> A tiny\n> hash-router.\n>\n> Deliberately minimal — no history mode,\n> no nesting.\n\n## Surface\n',
			})

			const result = catalogPackages([root.path])

			expect(result).toEqual([
				{ name: '@orkestrel/router', version: '0.0.5', description: 'A tiny hash-router.' },
			])
		} finally {
			await root.cleanup()
		}
	})

	it('yields an empty description for a package missing its guide entirely', async () => {
		const root = await buildTempDirectory()
		try {
			writeCatalogPackage(root.path, 'headless', {
				name: '@orkestrel/headless',
				version: '0.0.1',
			})

			const result = catalogPackages([root.path])

			expect(result).toEqual([{ name: '@orkestrel/headless', version: '0.0.1', description: '' }])
		} finally {
			await root.cleanup()
		}
	})

	it('yields an empty description for a guide with no blockquote', async () => {
		const root = await buildTempDirectory()
		try {
			writeCatalogPackage(root.path, 'plain', {
				name: '@orkestrel/plain',
				version: '0.0.1',
				guide: '# Plain\n\nJust a paragraph, no blockquote at all.\n',
			})

			const result = catalogPackages([root.path])

			expect(result).toEqual([{ name: '@orkestrel/plain', version: '0.0.1', description: '' }])
		} finally {
			await root.cleanup()
		}
	})

	it('ignores a non-@orkestrel directory', async () => {
		const root = await buildTempDirectory()
		try {
			writeCatalogPackage(root.path, 'router', {
				name: '@orkestrel/router',
				version: '0.0.5',
				guide: '# Router\n\n> A tiny hash-router.\n',
			})
			writeManifest(join(root.path, 'not-orkestrel'), { name: 'some-other-package' })

			const result = catalogPackages([root.path])

			expect(result.map((entry) => entry.name)).toEqual(['@orkestrel/router'])
		} finally {
			await root.cleanup()
		}
	})

	it('merges across multiple roots, code-unit sorted — a later root wins on a repeated name', async () => {
		const first = await buildTempDirectory()
		const second = await buildTempDirectory()
		try {
			writeCatalogPackage(first.path, 'router', {
				name: '@orkestrel/router',
				version: '0.0.1',
				guide: '# Router\n\n> Stale description.\n',
			})
			writeCatalogPackage(second.path, 'router', {
				name: '@orkestrel/router',
				version: '0.0.2',
				guide: '# Router\n\n> Fresh description.\n',
			})
			writeCatalogPackage(second.path, 'alpha', {
				name: '@orkestrel/alpha',
				version: '0.0.1',
				guide: '# Alpha\n\n> An alpha package.\n',
			})

			const result = catalogPackages([first.path, second.path])

			expect(result).toEqual([
				{ name: '@orkestrel/alpha', version: '0.0.1', description: 'An alpha package.' },
				{ name: '@orkestrel/router', version: '0.0.2', description: 'Fresh description.' },
			])
		} finally {
			await first.cleanup()
			await second.cleanup()
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
		'diffPlan content-compares a HYDRATED host-origin artifact — a byte-mutated target now reads ' +
			"'stale' (and is counted as drifted), where the same target against the UNHYDRATED plan " +
			"still reads 'aligned' (presence-only preserved when there is no content to compare)",
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
				expect(unhydratedAudit.drifted).toBe(0)

				const hydrated = hydratePlan(plan, host.path)
				expect(hydrated.artifacts[0]?.content).toBe('host content\n') // hydration DID attach content

				const hydratedAudit = diffPlan(hydrated, current)
				// Hydration attaches the real host bytes as `content`; `diffPlan`'s
				// host branch now content-compares whenever `content` is present, so
				// a target that has drifted from those bytes is `stale`, counted in
				// `drifted` — no longer indistinguishable from the unhydrated,
				// presence-only audit above.
				expect(hydratedAudit.findings).toEqual([
					{ path: 'notes.txt', group: 'docs', drift: 'stale' },
				])
				expect(hydratedAudit.drifted).toBe(1)
			} finally {
				await host.cleanup()
			}
		},
	)

	it('diffPlan still audits an UNHYDRATED host-origin artifact by presence only — a byte-mutated target reads aligned, never stale', () => {
		const plan: Plan = {
			blueprint: blueprint('hydrate-diff-unhydrated-fixture', { surfaces: ['core'] }),
			groups: ['docs'],
			artifacts: [{ path: 'notes.txt', group: 'docs', origin: 'host' }],
		}
		const current = { 'notes.txt': 'byte-mutated target content\n' }

		const audit = diffPlan(plan, current)

		expect(audit.findings).toEqual([{ path: 'notes.txt', group: 'docs', drift: 'aligned' }])
		expect(audit.drifted).toBe(0)
	})

	it("a plan with a hydrated host artifact audited 'stale' repairs to byte-equal via Materializer.repair", async () => {
		const host = await buildTempDirectory()
		const target = await buildTempDirectory()
		try {
			writeFileSync(join(host.path, 'notes.txt'), 'host content\n', 'utf8')
			writeFileSync(join(target.path, 'notes.txt'), 'byte-mutated target content\n', 'utf8')
			const plan: Plan = {
				blueprint: blueprint('hydrate-repair-fixture', { surfaces: ['core'] }),
				groups: ['docs'],
				artifacts: [{ path: 'notes.txt', group: 'docs', origin: 'host' }],
			}

			const hydrated = hydratePlan(plan, host.path)
			const current = readTarget(target.path, ['notes.txt'])
			const audit = diffPlan(hydrated, current)
			expect(audit.findings).toEqual([{ path: 'notes.txt', group: 'docs', drift: 'stale' }])

			const materializer = createMaterializer({ host: host.path })
			try {
				const result = materializer.repair(hydrated, audit, target.path)
				expect(result.copied).toEqual(['notes.txt'])
				expect(readFileSync(join(target.path, 'notes.txt'), 'utf8')).toBe('host content\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			await host.cleanup()
			await target.cleanup()
		}
	})

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

	it.skipIf(!canSocket)(
		'wraps a genuine unreadable host source into a coded TARGET error (SKIPPED: environment cannot bind a Unix domain socket — unreadable-source hydration unverified here; passes on socket-capable POSIX CI)',
		async () => {
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
		},
	)
})

// ── selectOrkestrelEntries ───────────────────────────────────────────────────

describe('selectOrkestrelEntries', () => {
	it('filters a manifest record to @orkestrel/-prefixed keys with string values, preserving their ranges', () => {
		const result = selectOrkestrelEntries({
			'@orkestrel/contract': '^0.0.5',
			'@orkestrel/emitter': '^0.0.3',
			'left-pad': '^1.3.0', // non-@orkestrel — dropped
		})
		expect(result).toEqual([
			['@orkestrel/contract', '^0.0.5'],
			['@orkestrel/emitter', '^0.0.3'],
		])
	})

	it('drops an @orkestrel/-prefixed entry whose value is not a string', () => {
		const result = selectOrkestrelEntries({
			'@orkestrel/contract': '^0.0.5',
			'@orkestrel/broken': 1, // non-string value — dropped despite the prefix match
		})
		expect(result).toEqual([['@orkestrel/contract', '^0.0.5']])
	})

	it('returns [] for a non-record value', () => {
		expect(selectOrkestrelEntries(null)).toEqual([])
		expect(selectOrkestrelEntries(['@orkestrel/contract'])).toEqual([])
		expect(selectOrkestrelEntries(undefined)).toEqual([])
	})
})

// ── isManifestEntry ──────────────────────────────────────────────────────────

describe('isManifestEntry', () => {
	it('accepts a full, well-shaped manifest entry', () => {
		expect(
			isManifestEntry({ storage: 'gitignore', destination: '.gitignore', executable: false }),
		).toBe(true)
	})

	it('rejects an entry missing a required field', () => {
		expect(isManifestEntry({ storage: 'gitignore', destination: '.gitignore' })).toBe(false)
	})

	it('rejects an entry with a mistyped field', () => {
		expect(
			isManifestEntry({ storage: 'gitignore', destination: '.gitignore', executable: 'false' }),
		).toBe(false)
		expect(isManifestEntry({ storage: 1, destination: '.gitignore', executable: false })).toBe(
			false,
		)
	})

	it('rejects adversarial extras and non-record values', () => {
		expect(
			isManifestEntry({
				storage: 'gitignore',
				destination: '.gitignore',
				executable: false,
				extra: 'unexpected',
			}),
		).toBe(true) // extras are tolerated — only the required shape is checked
		expect(isManifestEntry(null)).toBe(false)
		expect(isManifestEntry(['gitignore'])).toBe(false)
		expect(isManifestEntry('gitignore')).toBe(false)
	})
})

// ── locateHostSource ─────────────────────────────────────────────────────────

describe('locateHostSource', () => {
	it('resolves via the SINGLE manifest entry whose destination matches source, to its storage path', () => {
		const manifest = [
			{ storage: 'pkg.tmpl', destination: 'package.json', executable: false },
			{ storage: 'gitignore', destination: '.gitignore', executable: false },
		]
		expect(locateHostSource(manifest, 'package.json', '/host')).toBe(join('/host', 'pkg.tmpl'))
	})

	it('returns undefined when no manifest entry matches destination', () => {
		const manifest = [{ storage: 'gitignore', destination: '.gitignore', executable: false }]
		expect(locateHostSource(manifest, 'missing.txt', '/host')).toBeUndefined()
	})

	it('returns undefined when MORE THAN ONE manifest entry matches destination (ambiguous)', () => {
		const manifest = [
			{ storage: 'a.tmpl', destination: 'dup.txt', executable: false },
			{ storage: 'b.tmpl', destination: 'dup.txt', executable: false },
		]
		expect(locateHostSource(manifest, 'dup.txt', '/host')).toBeUndefined()
	})

	it('joins host and source directly when manifest is absent (raw-repo-root fallback)', () => {
		expect(locateHostSource(undefined, 'notes.txt', '/host')).toBe(join('/host', 'notes.txt'))
	})
})

// ── storagePath ──────────────────────────────────────────────────────────────

describe('storagePath', () => {
	it('maps a leading-dot TOP-LEVEL file to dotfiles/<name-without-dot>', () => {
		expect(storagePath('.gitignore')).toBe('dotfiles/gitignore')
	})

	it('drops the dot off a leading-dot DIRECTORY segment', () => {
		expect(storagePath('.claude/agents/scout.md')).toBe('claude/agents/scout.md')
	})

	it('drops the dot off a NESTED leading-dot directory segment', () => {
		expect(storagePath('.github/workflows/ci.yml')).toBe('github/workflows/ci.yml')
	})

	it('leaves an undotted path unchanged', () => {
		expect(storagePath('AGENTS.md')).toBe('AGENTS.md')
		expect(storagePath('scripts/deps.sh')).toBe('scripts/deps.sh')
	})
})

// ── stageHost ────────────────────────────────────────────────────────────────

describe('stageHost', () => {
	it('stages a plain undotted file at its unchanged storage path, byte-preserving', async () => {
		const root = await buildTempDirectory()
		const out = await buildTempDirectory()
		try {
			writeFileSync(join(root.path, 'AGENTS.md'), '# rules\n', 'utf8')

			const entries = stageHost(root.path, out.path, ['AGENTS.md'])

			expect(entries).toEqual([
				{ storage: 'AGENTS.md', destination: 'AGENTS.md', executable: false },
			])
			expect(readFileSync(join(out.path, 'AGENTS.md'), 'utf8')).toBe('# rules\n')
		} finally {
			await root.cleanup()
			await out.cleanup()
		}
	})

	it('maps a leading-dot top-level file to dotfiles/, un-dots a directory segment, and un-dots a nested workflow path', async () => {
		const root = await buildTempDirectory()
		const out = await buildTempDirectory()
		try {
			writeFileSync(join(root.path, '.gitignore'), 'node_modules\n', 'utf8')
			mkdirSync(join(root.path, '.claude', 'agents'), { recursive: true })
			writeFileSync(join(root.path, '.claude', 'agents', 'scout.md'), 'scout\n', 'utf8')
			mkdirSync(join(root.path, '.github', 'workflows'), { recursive: true })
			writeFileSync(join(root.path, '.github', 'workflows', 'ci.yml'), 'ci\n', 'utf8')

			const entries = stageHost(root.path, out.path, ['.gitignore', '.claude', '.github'])

			expect(entries).toEqual([
				{
					storage: 'claude/agents/scout.md',
					destination: '.claude/agents/scout.md',
					executable: false,
				},
				{
					storage: 'github/workflows/ci.yml',
					destination: '.github/workflows/ci.yml',
					executable: false,
				},
				{ storage: 'dotfiles/gitignore', destination: '.gitignore', executable: false },
			])
			expect(existsSync(join(out.path, 'dotfiles', 'gitignore'))).toBe(true)
			expect(existsSync(join(out.path, 'claude', 'agents', 'scout.md'))).toBe(true)
			expect(existsSync(join(out.path, 'github', 'workflows', 'ci.yml'))).toBe(true)
		} finally {
			await root.cleanup()
			await out.cleanup()
		}
	})

	it('marks a `.sh` destination executable regardless of the source mode bits', async () => {
		const root = await buildTempDirectory()
		const out = await buildTempDirectory()
		try {
			const scriptPath = join(root.path, 'run.sh')
			writeFileSync(scriptPath, '#!/bin/sh\necho hi\n', 'utf8')
			chmodSync(scriptPath, 0o644)

			const entries = stageHost(root.path, out.path, ['run.sh'])

			expect(entries).toEqual([{ storage: 'run.sh', destination: 'run.sh', executable: true }])
		} finally {
			await root.cleanup()
			await out.cleanup()
		}
	})

	it('marks a non-`.sh` destination non-executable even with the owner-execute bit set', async () => {
		const root = await buildTempDirectory()
		const out = await buildTempDirectory()
		try {
			const scriptPath = join(root.path, 'run.txt')
			writeFileSync(scriptPath, '#!/bin/sh\necho hi\n', 'utf8')
			chmodSync(scriptPath, 0o755)

			const entries = stageHost(root.path, out.path, ['run.txt'])

			expect(entries).toEqual([{ storage: 'run.txt', destination: 'run.txt', executable: false }])
		} finally {
			await root.cleanup()
			await out.cleanup()
		}
	})

	it('writes manifest.json sorted by destination, tab-indented, with a trailing newline', async () => {
		const root = await buildTempDirectory()
		const out = await buildTempDirectory()
		try {
			writeFileSync(join(root.path, 'zed.txt'), 'z\n', 'utf8')
			writeFileSync(join(root.path, 'alpha.txt'), 'a\n', 'utf8')

			const entries = stageHost(root.path, out.path, ['zed.txt', 'alpha.txt'])

			expect(entries.map((entry) => entry.destination)).toEqual(['alpha.txt', 'zed.txt'])
			const manifestText = readFileSync(join(out.path, 'manifest.json'), 'utf8')
			expect(manifestText).toBe(`${JSON.stringify(entries, null, '\t')}\n`)
			expect(manifestText.endsWith('\n')).toBe(true)
			expect(manifestText.includes('\t')).toBe(true)
		} finally {
			await root.cleanup()
			await out.cleanup()
		}
	})

	it('wipes out first — a stale file left over from a prior run disappears', async () => {
		const root = await buildTempDirectory()
		const out = await buildTempDirectory()
		try {
			writeFileSync(join(out.path, 'stale.txt'), 'stale\n', 'utf8')
			writeFileSync(join(root.path, 'AGENTS.md'), '# rules\n', 'utf8')

			stageHost(root.path, out.path, ['AGENTS.md'])

			expect(existsSync(join(out.path, 'stale.txt'))).toBe(false)
			expect(existsSync(join(out.path, 'AGENTS.md'))).toBe(true)
		} finally {
			await root.cleanup()
			await out.cleanup()
		}
	})

	it('throws a coded TARGET error naming the missing path when a source is absent', async () => {
		const root = await buildTempDirectory()
		const out = await buildTempDirectory()
		try {
			let caught: unknown
			try {
				stageHost(root.path, out.path, ['missing.txt'])
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
			expect(caught.message.includes('missing.txt')).toBe(true)
		} finally {
			await root.cleanup()
			await out.cleanup()
		}
	})

	it('throws a coded TARGET error naming BOTH colliding destinations on a storage-path collision', async () => {
		const root = await buildTempDirectory()
		const out = await buildTempDirectory()
		try {
			// Two distinct top-level dotfiles that BOTH map to 'dotfiles/x' under
			// the mapping rule ('.x' and a directory 'x' whose top-level-file dot
			// is unrelated) — craft the collision directly: two entries whose
			// storagePath() output is identical.
			writeFileSync(join(root.path, '.x'), 'a\n', 'utf8')
			mkdirSync(join(root.path, 'dotfiles'), { recursive: true })
			writeFileSync(join(root.path, 'dotfiles', 'x'), 'b\n', 'utf8')

			let caught: unknown
			try {
				stageHost(root.path, out.path, ['.x', 'dotfiles/x'])
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
			expect(caught.message.includes('.x')).toBe(true)
			expect(caught.message.includes('dotfiles/x')).toBe(true)
		} finally {
			await root.cleanup()
			await out.cleanup()
		}
	})
})

// ── PRUNE_DIRECTORIES ────────────────────────────────────────────────────────

describe('PRUNE_DIRECTORIES', () => {
	it('is the hard allowlist of prune-owned directories', () => {
		expect(PRUNE_DIRECTORIES).toEqual(['.claude/agents', 'scripts'])
	})
})

// ── vendoredPruneSet ─────────────────────────────────────────────────────────

describe('vendoredPruneSet', () => {
	it('reads the allowlist from manifest.json destinations when the host has one', async () => {
		const host = await buildTempDirectory()
		try {
			writeFileSync(
				join(host.path, 'manifest.json'),
				JSON.stringify([
					{
						storage: 'claude/agents/scout.md',
						destination: '.claude/agents/scout.md',
						executable: false,
					},
					{
						storage: 'claude/agents/builder.md',
						destination: '.claude/agents/builder.md',
						executable: false,
					},
					{ storage: 'scripts/build.sh', destination: 'scripts/build.sh', executable: true },
				]),
				'utf8',
			)

			const result = vendoredPruneSet(host.path, '.claude/agents')

			expect(result).toEqual(new Set(['.claude/agents/scout.md', '.claude/agents/builder.md']))
		} finally {
			await host.cleanup()
		}
	})

	it('falls back to listing host/<directory> directly when the host has no manifest.json', async () => {
		const host = await buildTempDirectory()
		try {
			mkdirSync(join(host.path, '.claude', 'agents'), { recursive: true })
			writeFileSync(join(host.path, '.claude', 'agents', 'scout.md'), 'scout\n', 'utf8')

			const result = vendoredPruneSet(host.path, '.claude/agents')

			expect(result).toEqual(new Set(['.claude/agents/scout.md']))
		} finally {
			await host.cleanup()
		}
	})

	it('throws a coded TARGET error when the host root does not exist', async () => {
		const host = await buildTempDirectory()
		const missing = join(host.path, 'nonexistent')
		try {
			let caught: unknown
			try {
				vendoredPruneSet(missing, '.claude/agents')
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
		} finally {
			await host.cleanup()
		}
	})

	it('throws a coded TARGET error when the host has no manifest.json and no host/<directory>', async () => {
		const host = await buildTempDirectory()
		try {
			let caught: unknown
			try {
				vendoredPruneSet(host.path, '.claude/agents')
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
		} finally {
			await host.cleanup()
		}
	})
})
