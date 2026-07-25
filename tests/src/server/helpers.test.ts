import type { HostArtifact, Plan } from '@src/core'
import { basename, dirname, isAbsolute, join, relative as relativeOf } from 'node:path'
import {
	chmodSync,
	existsSync,
	lstatSync,
	mkdirSync,
	readlinkSync,
	readFileSync,
	readdirSync,
	realpathSync,
	renameSync,
	rmSync,
	symlinkSync,
	writeFileSync,
} from 'node:fs'
import { createServer } from 'node:net'
import { attempt, isRecord, parseJSON } from '@orkestrel/contract'
import { describe, expect, it } from 'vitest'
import {
	blueprint,
	bytesToHex,
	contentToHex,
	diffPlan,
	isScaffoldError,
	packageManifest,
	validateBlueprint,
} from '@src/core'
import {
	catalogPackages,
	createMaterializer,
	deriveBlueprint,
	discoverPackages,
	guideToDescription,
	hostRoot,
	hydratePlan,
	listDirectories,
	listFiles,
	locateHostSource,
	PRUNE_DIRECTORIES,
	readFileHex,
	readHostManifest,
	readTarget,
	remapArtifactPath,
	replaceDirectory,
	resolveContainedPath,
	restoreFiles,
	selectOrkestrelEntries,
	stageHost,
	storagePath,
	vendoredPruneSet,
} from '@src/server'
import {
	buildBlueprintFixture,
	buildTempDirectory,
	canDirectoryLink,
	canSocket,
	canSymlink,
	createDirectoryLink,
	hostManifestOf,
	WORKSPACE_ROOT,
	writeCatalogPackage,
	writeHostManifest,
	writeHostStorage,
	writePackageManifest,
} from '../../setupServer.js'

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
			const parsed: unknown = parseJSON(recompiled)
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
			writePackageManifest(join(root.path, 'Beta'), { name: '@orkestrel/beta' })
			writePackageManifest(join(root.path, 'Zeta'), { name: '@orkestrel/zeta' })
			writePackageManifest(join(root.path, 'alpha'), { name: '@orkestrel/alpha' })
			writePackageManifest(join(root.path, 'not-orkestrel'), { name: 'some-other-package' })
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

describe('guideToDescription', () => {
	it('normalizes the first blockquote paragraph to one line', () => {
		expect(guideToDescription('# Guide\n\n> A concise\n> description.\n')).toBe(
			'A concise description.',
		)
	})

	it('returns only the first paragraph from a multi-paragraph blockquote', () => {
		expect(guideToDescription('> First paragraph.\n>\n> Second paragraph.\n')).toBe(
			'First paragraph.',
		)
	})

	it('traverses to the first nested blockquote', () => {
		expect(guideToDescription('- item\n  > Nested description.\n')).toBe('Nested description.')
	})

	it('returns undefined when no blockquote paragraph exists', () => {
		expect(guideToDescription('# Guide\n\nPlain text.\n')).toBeUndefined()
		expect(guideToDescription('')).toBeUndefined()
	})
})

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
			writePackageManifest(join(root.path, 'not-orkestrel'), { name: 'some-other-package' })

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

describe('readTarget — hostile object-prototype filenames', () => {
	it('returns every requested file as an own byte snapshot entry', async () => {
		const target = await buildTempDirectory()
		try {
			writeFileSync(join(target.path, '__proto__'), 'proto', 'utf8')
			writeFileSync(join(target.path, 'constructor'), 'constructor', 'utf8')
			writeFileSync(join(target.path, 'toString'), 'string', 'utf8')

			const snapshot = readTarget(target.path, ['__proto__', 'constructor', 'toString'])

			expect(Object.keys(snapshot).sort()).toEqual(['__proto__', 'constructor', 'toString'])
			expect(snapshot['__proto__']).toBe(contentToHex('proto'))
			expect(snapshot['constructor']).toBe(contentToHex('constructor'))
			expect(snapshot['toString']).toBe(contentToHex('string'))
		} finally {
			await target.cleanup()
		}
	})
})

// ── hydratePlan ──────────────────────────────────────────────────────────────

describe('hydratePlan', () => {
	it('attaches real host bytes to a host-origin artifact — manifest-aware', async () => {
		const host = await buildTempDirectory()
		try {
			writeFileSync(join(host.path, 'gitignore'), 'node_modules\n', 'utf8')
			writeHostManifest(
				host.path,
				hostManifestOf(
					[{ storage: 'gitignore', destination: '.gitignore', executable: false }],
					[],
				),
			)
			const plan: Plan = {
				blueprint: blueprint('hydrate-manifest-fixture', { surfaces: ['core'] }),
				groups: ['configs'],
				artifacts: [{ path: '.gitignore', group: 'configs', origin: 'host' }],
			}

			const hydrated = hydratePlan(plan, host.path)

			expect(hydrated.artifacts[0]?.hex).toBe(contentToHex('node_modules\n'))
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

			expect(hydrated.artifacts[0]?.hex).toBe(contentToHex('raw root content\n'))
		} finally {
			await host.cleanup()
		}
	})

	it('expands a raw-root host directory into content-aware file artifacts', async () => {
		const host = await buildTempDirectory()
		try {
			mkdirSync(join(host.path, '.agents', 'skills', 'harden', 'references'), {
				recursive: true,
			})
			writeFileSync(
				join(host.path, '.agents', 'skills', 'harden', 'SKILL.md'),
				'# Harden\n',
				'utf8',
			)
			writeFileSync(
				join(host.path, '.agents', 'skills', 'harden', 'references', 'tests.md'),
				'# Tests\n',
				'utf8',
			)
			const plan: Plan = {
				blueprint: blueprint('hydrate-directory-fixture', { surfaces: ['core'] }),
				groups: ['orchestration'],
				artifacts: [
					{
						path: '.agents',
						group: 'orchestration',
						origin: 'host',
						source: '.agents',
					},
				],
			}

			const hydrated = hydratePlan(plan, host.path)

			expect(hydrated.artifacts).toEqual([
				{
					path: '.agents/skills/harden/SKILL.md',
					group: 'orchestration',
					origin: 'host',
					source: '.agents/skills/harden/SKILL.md',
					hex: contentToHex('# Harden\n'),
				},
				{
					path: '.agents/skills/harden/references/tests.md',
					group: 'orchestration',
					origin: 'host',
					source: '.agents/skills/harden/references/tests.md',
					hex: contentToHex('# Tests\n'),
				},
			])
		} finally {
			await host.cleanup()
		}
	})

	it('expands a staged host directory and repairs missing/stale canonical skills without touching a project skill', async () => {
		const host = await buildTempDirectory()
		const target = await buildTempDirectory()
		try {
			mkdirSync(join(host.path, 'agents', 'skills', 'harden', 'agents'), { recursive: true })
			writeFileSync(join(host.path, 'agents', 'skills', 'harden', 'SKILL.md'), '# Harden\n', 'utf8')
			writeFileSync(
				join(host.path, 'agents', 'skills', 'harden', 'agents', 'openai.yaml'),
				"interface:\n  display_name: 'Harden'\n",
				'utf8',
			)
			writeHostManifest(
				host.path,
				hostManifestOf(
					[
						{
							storage: 'agents/skills/harden/SKILL.md',
							destination: '.agents/skills/harden/SKILL.md',
							executable: false,
						},
						{
							storage: 'agents/skills/harden/agents/openai.yaml',
							destination: '.agents/skills/harden/agents/openai.yaml',
							executable: false,
						},
					],
					['.agents', '.agents/skills', '.agents/skills/harden', '.agents/skills/harden/agents'],
				),
			)
			mkdirSync(join(target.path, '.agents', 'skills', 'harden'), { recursive: true })
			writeFileSync(
				join(target.path, '.agents', 'skills', 'harden', 'SKILL.md'),
				'# Stale\n',
				'utf8',
			)
			mkdirSync(join(target.path, '.agents', 'skills', 'project'), { recursive: true })
			writeFileSync(
				join(target.path, '.agents', 'skills', 'project', 'SKILL.md'),
				'# Project\n',
				'utf8',
			)
			const plan: Plan = {
				blueprint: blueprint('hydrate-staged-directory-fixture', { surfaces: ['core'] }),
				groups: ['orchestration'],
				artifacts: [
					{
						path: '.agents',
						group: 'orchestration',
						origin: 'host',
						source: '.agents',
					},
				],
			}
			const hydrated = hydratePlan(plan, host.path)
			const paths = hydrated.artifacts.map((artifact) => artifact.path)
			const audit = diffPlan(hydrated, readTarget(target.path, paths))

			expect(audit.findings).toEqual([
				{
					path: '.agents/skills/harden/SKILL.md',
					group: 'orchestration',
					drift: 'stale',
				},
				{
					path: '.agents/skills/harden/agents/openai.yaml',
					group: 'orchestration',
					drift: 'missing',
				},
			])

			const materializer = createMaterializer({ host: host.path })
			try {
				const result = materializer.repair(hydrated, audit, target.path)
				expect(result.copied).toEqual([
					'.agents/skills/harden/SKILL.md',
					'.agents/skills/harden/agents/openai.yaml',
				])
				expect(
					readFileSync(join(target.path, '.agents', 'skills', 'harden', 'SKILL.md'), 'utf8'),
				).toBe('# Harden\n')
				expect(
					readFileSync(
						join(target.path, '.agents', 'skills', 'harden', 'agents', 'openai.yaml'),
						'utf8',
					),
				).toBe("interface:\n  display_name: 'Harden'\n")
				expect(
					readFileSync(join(target.path, '.agents', 'skills', 'project', 'SKILL.md'), 'utf8'),
				).toBe('# Project\n')
			} finally {
				materializer.destroy()
			}
		} finally {
			await host.cleanup()
			await target.cleanup()
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
				const current = { 'notes.txt': contentToHex('byte-mutated target content\n') }

				const unhydratedAudit = diffPlan(plan, current)
				expect(unhydratedAudit.findings).toEqual([
					{ path: 'notes.txt', group: 'docs', drift: 'aligned' },
				])
				expect(unhydratedAudit.drifted).toBe(0)

				const hydrated = hydratePlan(plan, host.path)
				expect(hydrated.artifacts[0]?.hex).toBe(contentToHex('host content\n'))

				const hydratedAudit = diffPlan(hydrated, current)
				// Hydration attaches the real host bytes as `hex`; `diffPlan`'s
				// host branch now byte-compares whenever `hex` is present, so
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

	it('compares invalid UTF-8 and NUL bytes exactly, then repairs byte-for-byte', async () => {
		const host = await buildTempDirectory()
		const target = await buildTempDirectory()
		try {
			const canonical = Uint8Array.from([0x80, 0x00, 0xff])
			const stale = Uint8Array.from([0x81, 0x00, 0xff])
			writeFileSync(join(host.path, 'asset.bin'), canonical)
			writeFileSync(join(target.path, 'asset.bin'), stale)
			const plan: Plan = {
				blueprint: blueprint('hydrate-binary-fixture', { surfaces: ['core'] }),
				groups: ['orchestration'],
				artifacts: [{ path: 'asset.bin', group: 'orchestration', origin: 'host' }],
			}

			const hydrated = hydratePlan(plan, host.path)
			expect(hydrated.artifacts[0]?.hex).toBe(bytesToHex(canonical))
			const audit = diffPlan(hydrated, readTarget(target.path, ['asset.bin']))
			expect(audit.findings).toEqual([
				{ path: 'asset.bin', group: 'orchestration', drift: 'stale' },
			])

			const materializer = createMaterializer({ host: host.path })
			try {
				materializer.repair(hydrated, audit, target.path)
				expect(bytesToHex(readFileSync(join(target.path, 'asset.bin')))).toBe(bytesToHex(canonical))
			} finally {
				materializer.destroy()
			}
		} finally {
			await host.cleanup()
			await target.cleanup()
		}
	})

	it('rejects a staged manifest entry whose storage file is missing', async () => {
		const host = await buildTempDirectory()
		try {
			writeHostManifest(
				host.path,
				hostManifestOf([{ storage: 'missing', destination: 'asset.bin', executable: false }], []),
			)
			const plan: Plan = {
				blueprint: blueprint('hydrate-missing-storage-fixture', { surfaces: ['core'] }),
				groups: ['orchestration'],
				artifacts: [{ path: 'asset.bin', group: 'orchestration', origin: 'host' }],
			}

			const result = attempt(() => hydratePlan(plan, host.path))
			expect(result.success).toBe(false)
			if (result.success || !isScaffoldError(result.error)) {
				throw new Error('expected a ScaffoldError to be returned')
			}
			expect(result.error.code).toBe('TARGET')
		} finally {
			await host.cleanup()
		}
	})

	it('an absent raw-host source fails closed instead of degrading to presence-only', async () => {
		const host = await buildTempDirectory()
		try {
			const plan: Plan = {
				blueprint: blueprint('hydrate-absent-fixture', { surfaces: ['core'] }),
				groups: ['docs'],
				artifacts: [{ path: 'missing.txt', group: 'docs', origin: 'host' }],
			}

			let caught: unknown
			try {
				hydratePlan(plan, host.path)
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
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

	it('rejects exact, case-folded, ancestor, and descendant collisions after directory expansion', async () => {
		const host = await buildTempDirectory()
		try {
			mkdirSync(join(host.path, '.agents'), { recursive: true })
			writeFileSync(join(host.path, '.agents', 'skill.md'), 'skill\n', 'utf8')
			for (const path of ['owned/skill.md', 'OWNED/SKILL.MD', 'owned', 'owned/skill.md/nested']) {
				const plan: Plan = {
					blueprint: blueprint('hydrate-collision-fixture', { surfaces: ['core'] }),
					groups: ['orchestration'],
					artifacts: [
						{
							path: 'owned',
							group: 'orchestration',
							origin: 'host',
							source: '.agents',
						},
						{
							path,
							group: 'orchestration',
							origin: 'computed',
							content: 'collision',
						},
					],
				}
				const result = attempt(() => hydratePlan(plan, host.path))

				expect(result.success).toBe(false)
				if (result.success || !isScaffoldError(result.error)) {
					throw new Error('expected a ScaffoldError to be returned')
				}
				expect(result.error.code).toBe('INVALID')
			}
		} finally {
			await host.cleanup()
		}
	})
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

describe('readHostManifest', () => {
	it('accepts a complete manifest whose declarations match every staged file', async () => {
		const host = await buildTempDirectory()
		try {
			const manifest = hostManifestOf(
				[
					{
						storage: 'agents/scout.md',
						destination: '.agents/scout.md',
						executable: false,
					},
				],
				['.agents'],
			)
			writeHostStorage(host.path, manifest.entries)
			writeHostManifest(host.path, manifest)

			expect(readHostManifest(host.path)).toEqual(manifest)
		} finally {
			await host.cleanup()
		}
	})

	it('rejects exact, portable case-only, and file/descendant collisions across path inventories', async () => {
		const host = await buildTempDirectory()
		try {
			const manifests = [
				hostManifestOf(
					[
						{ storage: 'a', destination: '.agents/a', executable: false },
						{ storage: 'b', destination: '.agents/A', executable: false },
					],
					['.agents'],
				),
				hostManifestOf(
					[
						{ storage: 'same', destination: '.agents/a', executable: false },
						{ storage: 'SAME', destination: '.agents/b', executable: false },
					],
					['.agents'],
				),
				hostManifestOf(
					[
						{ storage: 'a', destination: 'docs', executable: false },
						{ storage: 'b', destination: 'docs/readme.md', executable: false },
					],
					[],
				),
				hostManifestOf(
					[
						{ storage: 'files', destination: 'a', executable: false },
						{ storage: 'files/a', destination: 'b', executable: false },
					],
					[],
				),
				hostManifestOf([], ['.agents', '.AGENTS']),
			]
			for (const manifest of manifests) {
				writeHostManifest(host.path, manifest)
				const result = attempt(() => readHostManifest(host.path))
				expect(result.success).toBe(false)
				if (result.success || !isScaffoldError(result.error)) {
					throw new Error('expected a ScaffoldError to be returned')
				}
				expect(result.error.code).toBe('TARGET')
				expect(result.error.message).toContain('collision')
			}
		} finally {
			await host.cleanup()
		}
	})

	it('rejects storage that aliases reserved manifest metadata by portable case', async () => {
		const host = await buildTempDirectory()
		try {
			const manifest = hostManifestOf(
				[{ storage: 'MANIFEST.JSON', destination: 'copy.json', executable: false }],
				[],
			)
			writeHostStorage(host.path, manifest.entries)
			writeHostManifest(host.path, manifest)

			const result = attempt(() => readHostManifest(host.path))

			expect(result.success).toBe(false)
			if (result.success || !isScaffoldError(result.error)) {
				throw new Error('expected a ScaffoldError to be returned')
			}
			expect(result.error.code).toBe('TARGET')
			expect(result.error.message).toContain('collision')
		} finally {
			await host.cleanup()
		}
	})

	it('rejects undeclared storage, missing storage, and missing destination roots', async () => {
		const host = await buildTempDirectory()
		try {
			const manifest = hostManifestOf(
				[
					{
						storage: 'agents/scout.md',
						destination: '.agents/scout.md',
						executable: false,
					},
				],
				['.agents'],
			)
			writeHostStorage(host.path, manifest.entries)
			writeHostManifest(host.path, manifest)
			writeFileSync(join(host.path, 'orphan.md'), 'orphan', 'utf8')

			const orphan = attempt(() => readHostManifest(host.path))
			expect(orphan.success).toBe(false)

			rmSync(join(host.path, 'orphan.md'))
			rmSync(join(host.path, 'agents', 'scout.md'))
			const missing = attempt(() => readHostManifest(host.path))
			expect(missing.success).toBe(false)

			writeHostStorage(host.path, manifest.entries)
			writeHostManifest(host.path, { entries: manifest.entries, roots: [] })
			const root = attempt(() => readHostManifest(host.path))
			expect(root.success).toBe(false)

			for (const result of [orphan, missing, root]) {
				if (result.success || !isScaffoldError(result.error)) {
					throw new Error('expected a ScaffoldError to be returned')
				}
				expect(result.error.code).toBe('TARGET')
			}
		} finally {
			await host.cleanup()
		}
	})
})

// ── locateHostSource ─────────────────────────────────────────────────────────

describe('locateHostSource', () => {
	it('resolves via the SINGLE manifest entry whose destination matches source, to its storage path', () => {
		const manifest = hostManifestOf(
			[
				{ storage: 'pkg.tmpl', destination: 'package.json', executable: false },
				{ storage: 'gitignore', destination: '.gitignore', executable: false },
			],
			[],
		)
		expect(locateHostSource(manifest, 'package.json', '/host')).toBe(join('/host', 'pkg.tmpl'))
	})

	it('returns undefined when no manifest entry matches destination', () => {
		const manifest = hostManifestOf(
			[{ storage: 'gitignore', destination: '.gitignore', executable: false }],
			[],
		)
		expect(locateHostSource(manifest, 'missing.txt', '/host')).toBeUndefined()
	})

	it('returns undefined when MORE THAN ONE manifest entry matches destination (ambiguous)', () => {
		const manifest = hostManifestOf(
			[
				{ storage: 'a.tmpl', destination: 'dup.txt', executable: false },
				{ storage: 'b.tmpl', destination: 'dup.txt', executable: false },
			],
			[],
		)
		expect(locateHostSource(manifest, 'dup.txt', '/host')).toBeUndefined()
	})

	it('joins host and source directly when manifest is absent (raw-repo-root fallback)', () => {
		expect(locateHostSource(undefined, 'notes.txt', '/host')).toBe(join('/host', 'notes.txt'))
	})
})

// ── readFileHex ──────────────────────────────────────────────────────────────

describe('readFileHex', () => {
	it('reads exact bytes and wraps a failed read in a coded TARGET error', async () => {
		const root = await buildTempDirectory()
		try {
			const full = join(root.path, 'SKILL.md')
			writeFileSync(full, '# Skill\n', 'utf8')
			expect(readFileHex(root.path, 'SKILL.md', 'TARGET', 'host')).toBe(contentToHex('# Skill\n'))

			let caught: unknown
			try {
				readFileHex(root.path, 'missing.md', 'TARGET', 'host')
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
			expect(caught.context).toMatchObject({
				path: 'missing.md',
				full: join(root.path, 'missing.md'),
			})
		} finally {
			await root.cleanup()
		}
	})
})

describe('filesystem containment', () => {
	it('rejects lexical traversal before reading', async () => {
		const root = await buildTempDirectory()
		try {
			const result = attempt(() => resolveContainedPath(root.path, '../escape', 'TARGET', 'target'))
			expect(result.success).toBe(false)
			if (result.success || !isScaffoldError(result.error)) {
				throw new Error('expected a ScaffoldError to be returned')
			}
			expect(result.error.code).toBe('TARGET')
		} finally {
			await root.cleanup()
		}
	})

	it.skipIf(!canDirectoryLink)(
		'rejects target and raw-host directory links that escape their declared roots',
		async () => {
			const host = await buildTempDirectory()
			const target = await buildTempDirectory()
			const outside = await buildTempDirectory()
			try {
				writeFileSync(join(outside.path, 'secret.txt'), 'outside-secret', 'utf8')
				createDirectoryLink(outside.path, join(host.path, '.agents'))
				createDirectoryLink(outside.path, join(target.path, '.agents'))

				const targetResult = attempt(() => readTarget(target.path, ['.agents/secret.txt']))
				expect(targetResult.success).toBe(false)
				if (targetResult.success || !isScaffoldError(targetResult.error)) {
					throw new Error('expected a target containment error')
				}
				expect(targetResult.error.code).toBe('TARGET')

				const plan: Plan = {
					blueprint: blueprint('linked-host-fixture', { surfaces: ['core'] }),
					groups: ['orchestration'],
					artifacts: [
						{ path: '.agents', group: 'orchestration', origin: 'host', source: '.agents' },
					],
				}
				const hostResult = attempt(() => hydratePlan(plan, host.path))
				expect(hostResult.success).toBe(false)
				if (hostResult.success || !isScaffoldError(hostResult.error)) {
					throw new Error('expected a host containment error')
				}
				expect(hostResult.error.code).toBe('TARGET')
			} finally {
				await host.cleanup()
				await target.cleanup()
				await outside.cleanup()
			}
		},
	)
})

// ── listFiles ────────────────────────────────────────────────────────────────

describe('listFiles', () => {
	it('returns recursive POSIX paths in deterministic code-unit order', async () => {
		const root = await buildTempDirectory()
		try {
			mkdirSync(join(root.path, 'zeta'), { recursive: true })
			writeFileSync(join(root.path, 'zeta', 'nested.md'), 'nested\n', 'utf8')
			writeFileSync(join(root.path, 'alpha.md'), 'alpha\n', 'utf8')
			writeFileSync(join(root.path, 'ZED.md'), 'zed\n', 'utf8')

			expect(listFiles(root.path)).toEqual(['ZED.md', 'alpha.md', 'zeta/nested.md'])
		} finally {
			await root.cleanup()
		}
	})
})

describe('listDirectories', () => {
	it('returns nested directories in deterministic code-unit order', async () => {
		const root = await buildTempDirectory()
		try {
			mkdirSync(join(root.path, 'zeta', 'nested'), { recursive: true })
			mkdirSync(join(root.path, 'Alpha'), { recursive: true })

			expect(listDirectories(root.path)).toEqual(['Alpha', 'zeta', 'zeta/nested'])
		} finally {
			await root.cleanup()
		}
	})
})

// ── storagePath ──────────────────────────────────────────────────────────────

describe('storagePath', () => {
	it('maps a leading-dot TOP-LEVEL file to dotfiles/<name-without-dot>', () => {
		expect(storagePath('.gitignore')).toBe('dotfiles/gitignore')
	})

	it('drops the dot off a leading-dot DIRECTORY segment', () => {
		expect(storagePath('.agents/skills/harden/SKILL.md')).toBe('agents/skills/harden/SKILL.md')
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

describe('host recovery helpers', () => {
	it('remaps exact and nested manifest destinations beneath the artifact target', () => {
		const artifact: HostArtifact = {
			path: 'COPY',
			group: 'orchestration',
			origin: 'host',
			source: '.agents',
		}

		expect(remapArtifactPath(artifact, '.agents')).toBe('COPY')
		expect(remapArtifactPath(artifact, '.agents/skills/harden/SKILL.md')).toBe(
			'COPY/skills/harden/SKILL.md',
		)
		expect(() => remapArtifactPath(artifact, '.claude/agents/scout.md')).toThrow(
			'Manifest destination does not match .agents',
		)
	})

	it('restores in reverse order and preserves quarantine when a real destination is blocked', async () => {
		const quarantine = await buildTempDirectory()
		const target = await buildTempDirectory()
		try {
			mkdirSync(join(quarantine.path, 'nested'), { recursive: true })
			writeFileSync(join(quarantine.path, 'nested', 'file.txt'), 'recoverable\n', 'utf8')
			writeFileSync(join(target.path, 'nested'), 'blocking file\n', 'utf8')

			const result = attempt(() => restoreFiles(quarantine.path, target.path, ['nested/file.txt']))

			expect(result.success).toBe(false)
			expect(existsSync(join(quarantine.path, 'nested', 'file.txt'))).toBe(true)
			expect(readFileSync(join(target.path, 'nested'), 'utf8')).toBe('blocking file\n')
		} finally {
			await quarantine.cleanup()
			await target.cleanup()
		}
	})

	it('preserves both files when the exact restore destination already exists', async () => {
		const quarantine = await buildTempDirectory()
		const target = await buildTempDirectory()
		try {
			writeFileSync(join(quarantine.path, 'file.txt'), 'quarantined\n', 'utf8')
			writeFileSync(join(target.path, 'file.txt'), 'concurrent\n', 'utf8')

			const result = attempt(() => restoreFiles(quarantine.path, target.path, ['file.txt']))

			expect(result.success).toBe(false)
			expect(readFileSync(join(quarantine.path, 'file.txt'), 'utf8')).toBe('quarantined\n')
			expect(readFileSync(join(target.path, 'file.txt'), 'utf8')).toBe('concurrent\n')
		} finally {
			await quarantine.cleanup()
			await target.cleanup()
		}
	})

	it('attempts every restore when one relative path is invalid', async () => {
		const quarantine = await buildTempDirectory()
		const target = await buildTempDirectory()
		try {
			writeFileSync(join(quarantine.path, 'recover.txt'), 'recoverable\n', 'utf8')

			const result = attempt(() =>
				restoreFiles(quarantine.path, target.path, ['recover.txt', '../escape']),
			)

			expect(result.success).toBe(false)
			expect(readFileSync(join(target.path, 'recover.txt'), 'utf8')).toBe('recoverable\n')
			expect(existsSync(join(quarantine.path, 'recover.txt'))).toBe(false)
		} finally {
			await quarantine.cleanup()
			await target.cleanup()
		}
	})

	it.skipIf(!canSymlink)(
		'restores a valid symlink after quarantine relocation without following it from quarantine',
		async () => {
			const root = await buildTempDirectory()
			try {
				const quarantine = join(root.path, 'quarantine')
				const target = join(root.path, 'target')
				const link = join(target, 'scripts', 'link.txt')
				const moved = join(quarantine, 'scripts', 'link.txt')
				mkdirSync(dirname(link), { recursive: true })
				mkdirSync(dirname(moved), { recursive: true })
				writeFileSync(join(target, 'scripts', 'source.txt'), 'source\n', 'utf8')
				symlinkSync('source.txt', link, 'file')
				renameSync(link, moved)

				restoreFiles(quarantine, target, ['scripts/link.txt'])

				expect(lstatSync(link).isSymbolicLink()).toBe(true)
				expect(readlinkSync(link)).toBe('source.txt')
				expect(existsSync(moved)).toBe(false)
			} finally {
				await root.cleanup()
			}
		},
	)

	it('rejects absent staging before moving an existing target', async () => {
		const parent = await buildTempDirectory()
		try {
			const staging = join(parent.path, 'missing-stage')
			const target = join(parent.path, 'target')
			const backup = join(parent.path, 'backup')
			mkdirSync(target)
			writeFileSync(join(target, 'prior.txt'), 'prior\n', 'utf8')

			const result = attempt(() => replaceDirectory(staging, target, backup))

			expect(result.success).toBe(false)
			expect(readFileSync(join(target, 'prior.txt'), 'utf8')).toBe('prior\n')
			expect(existsSync(backup)).toBe(false)
		} finally {
			await parent.cleanup()
		}
	})

	it('rejects aliased paths, an occupied backup, and non-directory transaction inputs', async () => {
		const parent = await buildTempDirectory()
		try {
			const staging = join(parent.path, 'staging')
			const target = join(parent.path, 'target')
			const backup = join(parent.path, 'backup')
			mkdirSync(staging)
			mkdirSync(target)

			const aliased = attempt(() => replaceDirectory(staging, staging, backup))
			expect(aliased.success).toBe(false)
			expect(existsSync(staging)).toBe(true)
			expect(existsSync(target)).toBe(true)

			writeFileSync(backup, 'occupied\n', 'utf8')
			const occupied = attempt(() => replaceDirectory(staging, target, backup))
			expect(occupied.success).toBe(false)
			expect(readFileSync(backup, 'utf8')).toBe('occupied\n')
			expect(existsSync(staging)).toBe(true)
			expect(existsSync(target)).toBe(true)

			rmSync(backup)
			rmSync(staging, { recursive: true })
			writeFileSync(staging, 'not a directory\n', 'utf8')
			const stagedFile = attempt(() => replaceDirectory(staging, target, backup))
			expect(stagedFile.success).toBe(false)
			expect(readFileSync(staging, 'utf8')).toBe('not a directory\n')
			expect(existsSync(target)).toBe(true)
		} finally {
			await parent.cleanup()
		}
	})

	it.skipIf(!canSymlink)('rejects a staged directory symlink without mutating target', async () => {
		const parent = await buildTempDirectory()
		try {
			const source = join(parent.path, 'source')
			const staging = join(parent.path, 'staging')
			const target = join(parent.path, 'target')
			const backup = join(parent.path, 'backup')
			mkdirSync(source)
			mkdirSync(target)
			writeFileSync(join(target, 'prior.txt'), 'prior\n', 'utf8')
			symlinkSync(source, staging, 'junction')

			const result = attempt(() => replaceDirectory(staging, target, backup))

			expect(result.success).toBe(false)
			expect(readFileSync(join(target, 'prior.txt'), 'utf8')).toBe('prior\n')
			expect(existsSync(backup)).toBe(false)
		} finally {
			await parent.cleanup()
		}
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

	it('maps a leading-dot top-level file to dotfiles/ and un-dots nested directory segments', async () => {
		const root = await buildTempDirectory()
		const out = await buildTempDirectory()
		try {
			writeFileSync(join(root.path, '.gitignore'), 'node_modules\n', 'utf8')
			mkdirSync(join(root.path, '.agents', 'skills', 'harden'), { recursive: true })
			writeFileSync(join(root.path, '.agents', 'skills', 'harden', 'SKILL.md'), 'skill\n', 'utf8')
			mkdirSync(join(root.path, '.claude', 'agents'), { recursive: true })
			writeFileSync(join(root.path, '.claude', 'agents', 'scout.md'), 'scout\n', 'utf8')
			mkdirSync(join(root.path, '.github', 'workflows'), { recursive: true })
			writeFileSync(join(root.path, '.github', 'workflows', 'ci.yml'), 'ci\n', 'utf8')

			const entries = stageHost(root.path, out.path, [
				'.gitignore',
				'.agents',
				'.claude',
				'.github',
			])

			expect(entries).toEqual([
				{
					storage: 'agents/skills/harden/SKILL.md',
					destination: '.agents/skills/harden/SKILL.md',
					executable: false,
				},
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
			expect(existsSync(join(out.path, 'agents', 'skills', 'harden', 'SKILL.md'))).toBe(true)
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
			expect(manifestText).toBe(`${JSON.stringify(hostManifestOf(entries, []), null, '\t')}\n`)
			expect(manifestText.endsWith('\n')).toBe(true)
			expect(manifestText.includes('\t')).toBe(true)
		} finally {
			await root.cleanup()
			await out.cleanup()
		}
	})

	it('atomically replaces a completed prior output so stale files disappear', async () => {
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
			writeFileSync(join(out.path, 'prior.txt'), 'prior\n', 'utf8')
			let caught: unknown
			try {
				stageHost(root.path, out.path, ['missing.txt'])
			} catch (error) {
				caught = error
			}
			if (!isScaffoldError(caught)) throw new Error('expected a ScaffoldError to be thrown')
			expect(caught.code).toBe('TARGET')
			expect(caught.message.includes('missing.txt')).toBe(true)
			expect(readFileSync(join(out.path, 'prior.txt'), 'utf8')).toBe('prior\n')
		} finally {
			await root.cleanup()
			await out.cleanup()
		}
	})

	it('reserves manifest.json storage across exact, case-folded, and descendant paths', async () => {
		for (const path of ['manifest.json', 'MANIFEST.JSON', 'manifest.json/nested.txt']) {
			const root = await buildTempDirectory()
			const out = await buildTempDirectory()
			try {
				const source = join(root.path, ...path.split('/'))
				mkdirSync(dirname(source), { recursive: true })
				writeFileSync(source, 'reserved\n', 'utf8')
				writeFileSync(join(out.path, 'prior.txt'), 'prior\n', 'utf8')

				const result = attempt(() => stageHost(root.path, out.path, [path]))

				expect(result.success).toBe(false)
				if (result.success || !isScaffoldError(result.error)) {
					throw new Error('expected a ScaffoldError to be returned')
				}
				expect(result.error.code).toBe('TARGET')
				expect(readFileSync(join(out.path, 'prior.txt'), 'utf8')).toBe('prior\n')
				const prefix = `.${basename(out.path)}.stage-`
				expect(readdirSync(dirname(out.path)).some((name) => name.startsWith(prefix))).toBe(false)
			} finally {
				await root.cleanup()
				await out.cleanup()
			}
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
			writeFileSync(join(out.path, 'prior.txt'), 'prior\n', 'utf8')

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
			expect(readFileSync(join(out.path, 'prior.txt'), 'utf8')).toBe('prior\n')
		} finally {
			await root.cleanup()
			await out.cleanup()
		}
	})

	it('rejects traversal and absolute source paths without mutating prior output', async () => {
		const root = await buildTempDirectory()
		const out = await buildTempDirectory()
		const outside = await buildTempDirectory()
		try {
			const secret = join(outside.path, 'secret.txt')
			writeFileSync(secret, 'secret\n', 'utf8')
			writeFileSync(join(out.path, 'prior.txt'), 'prior\n', 'utf8')
			for (const path of [relativeOf(root.path, secret).replaceAll('\\', '/'), secret]) {
				const result = attempt(() => stageHost(root.path, out.path, [path]))
				expect(result.success).toBe(false)
				if (result.success || !isScaffoldError(result.error)) {
					throw new Error('expected a ScaffoldError to be returned')
				}
				expect(result.error.code).toBe('TARGET')
				expect(readFileSync(join(out.path, 'prior.txt'), 'utf8')).toBe('prior\n')
			}
		} finally {
			await root.cleanup()
			await out.cleanup()
			await outside.cleanup()
		}
	})

	it('rejects an output equal to or containing the source root', async () => {
		const root = await buildTempDirectory()
		const parent = await buildTempDirectory()
		try {
			writeFileSync(join(root.path, 'source.txt'), 'source\n', 'utf8')
			for (const out of [root.path, parent.path]) {
				const source = out === parent.path ? join(parent.path, 'nested') : root.path
				if (out === parent.path) {
					mkdirSync(source)
					writeFileSync(join(source, 'source.txt'), 'source\n', 'utf8')
				}
				const result = attempt(() => stageHost(source, out, ['source.txt']))
				expect(result.success).toBe(false)
				if (result.success || !isScaffoldError(result.error)) {
					throw new Error('expected a ScaffoldError to be returned')
				}
				expect(result.error.code).toBe('TARGET')
			}
		} finally {
			await root.cleanup()
			await parent.cleanup()
		}
	})

	it.skipIf(!canSymlink)(
		'rejects a source file symlink that escapes the host root and preserves prior output',
		async () => {
			const root = await buildTempDirectory()
			const out = await buildTempDirectory()
			const outside = await buildTempDirectory()
			try {
				writeFileSync(join(outside.path, 'secret.txt'), 'secret\n', 'utf8')
				symlinkSync(join(outside.path, 'secret.txt'), join(root.path, 'linked.txt'))
				writeFileSync(join(out.path, 'prior.txt'), 'prior\n', 'utf8')

				const result = attempt(() => stageHost(root.path, out.path, ['linked.txt']))
				expect(result.success).toBe(false)
				if (result.success || !isScaffoldError(result.error)) {
					throw new Error('expected a ScaffoldError to be returned')
				}
				expect(result.error.code).toBe('TARGET')
				expect(readFileSync(join(out.path, 'prior.txt'), 'utf8')).toBe('prior\n')
			} finally {
				await root.cleanup()
				await out.cleanup()
				await outside.cleanup()
			}
		},
	)
})

// ── PRUNE_DIRECTORIES ────────────────────────────────────────────────────────

describe('PRUNE_DIRECTORIES', () => {
	it('is the hard allowlist of prune-owned directories', () => {
		expect(PRUNE_DIRECTORIES).toEqual(['.claude/agents', '.codex/agents', 'scripts'])
	})
})

// ── vendoredPruneSet ─────────────────────────────────────────────────────────

describe('vendoredPruneSet', () => {
	it('reads the allowlist from manifest.json destinations when the host has one', async () => {
		const host = await buildTempDirectory()
		try {
			const manifest = hostManifestOf(
				[
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
					{
						storage: 'scripts/build.sh',
						destination: 'scripts/build.sh',
						executable: true,
					},
				],
				['.claude', '.claude/agents', 'scripts'],
			)
			writeHostStorage(host.path, manifest.entries)
			writeHostManifest(host.path, manifest)

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
