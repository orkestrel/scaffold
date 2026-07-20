import type { Blueprint, Surface } from '@src/core'
import {
	applyOverrides,
	blueprint,
	blueprintToMembers,
	blueprintToPlan,
	compareCodeUnit,
	configArtifacts,
	coreTsconfig,
	coreViteConfig,
	dependency,
	devDependenciesFor,
	dualCondition,
	entryFields,
	exportsMap,
	fillArtifact,
	guideArtifacts,
	guideMemberTable,
	hostGroup,
	override,
	packageManifest,
	pascalCase,
	paritySpecifiers,
	rootTsconfig,
	rootViteConfig,
	sourceArtifacts,
	surfaceTsconfig,
	surfaceVariant,
	surfaceViteConfig,
	testArtifacts,
} from '@src/core'
import { describe, expect, it } from 'vitest'

const VARIANTS: readonly { readonly label: string; readonly surfaces: readonly Surface[] }[] = [
	{ label: 'core-only', surfaces: ['core'] },
	{ label: 'core+server', surfaces: ['core', 'server'] },
	{ label: 'core+browser', surfaces: ['core', 'browser'] },
	{ label: 'core+browser+server', surfaces: ['core', 'browser', 'server'] },
	{ label: 'server-only', surfaces: ['server'] },
	{ label: 'browser-only', surfaces: ['browser'] },
]

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readRecord(value: unknown): Record<string, unknown> {
	if (!isRecord(value)) throw new Error('expected a JSON object')
	return value
}

function readManifest(content: string | undefined): Record<string, unknown> {
	return readRecord(JSON.parse(content ?? '{}'))
}

describe('hostGroup', () => {
	it('classes the root docs paths as docs', () => {
		expect(hostGroup('AGENTS.md')).toBe('docs')
		expect(hostGroup('CLAUDE.md')).toBe('docs')
		expect(hostGroup('LICENSE')).toBe('docs')
	})

	it('classes .claude and the SessionStart scripts and CI workflow as orchestration', () => {
		expect(hostGroup('.claude')).toBe('orchestration')
		expect(hostGroup('scripts/deps.sh')).toBe('orchestration')
		expect(hostGroup('scripts/cursor.sh')).toBe('orchestration')
		expect(hostGroup('scripts/ollama.sh')).toBe('orchestration')
		expect(hostGroup('.github/workflows/ci.yml')).toBe('orchestration')
	})

	it('classes the vendored guide index and the scaffold engine self-guide as guides', () => {
		expect(hostGroup('guides/src/guide.md')).toBe('guides')
		expect(hostGroup('guides/src/scaffold.md')).toBe('guides')
	})

	it('falls back to configs for anything else', () => {
		expect(hostGroup('.oxlintrc.json')).toBe('configs')
	})
})

describe('fillArtifact', () => {
	it('fills a template into a template-origin artifact without a surface', () => {
		const artifact = fillArtifact('README.md', 'docs', 'readme', {
			name: 'router',
			pascal: 'Router',
		})
		expect(artifact.group).toBe('docs')
		expect(artifact.origin).toBe('template')
		expect(artifact.surface).toBeUndefined()
		expect(artifact.content).toContain('router')
	})

	it('tags the artifact with a surface when provided', () => {
		const artifact = fillArtifact(
			'src/core/types.ts',
			'source',
			'types',
			{ pascal: 'Router' },
			'core',
		)
		expect(artifact.surface).toBe('core')
	})

	it('throws on an unknown template id', () => {
		expect(() => fillArtifact('x', 'docs', 'nope', {})).toThrow(/Unknown template id/)
	})
})

describe('surfaceVariant', () => {
	it('resolves a sole surface', () => {
		expect(surfaceVariant(['core'])).toBe('core')
		expect(surfaceVariant(['browser'])).toBe('browser')
		expect(surfaceVariant(['server'])).toBe('server')
	})

	it('resolves multi for two or more surfaces', () => {
		expect(surfaceVariant(['core', 'server'])).toBe('multi')
		expect(surfaceVariant(['core', 'browser', 'server'])).toBe('multi')
	})

	it('falls back to core for an empty list', () => {
		expect(surfaceVariant([])).toBe('core')
	})
})

describe('entryFields', () => {
	it('multi-surface: cjs main/module, no types', () => {
		const entry = entryFields(['core', 'server'])
		expect(entry.main).toBe('./dist/src/core/index.cjs')
		expect(entry.module).toBe('./dist/src/core/index.js')
		expect(entry.types).toBeUndefined()
	})

	it('browser-only: js main/module + types', () => {
		const entry = entryFields(['browser'])
		expect(entry).toEqual({
			main: './dist/src/browser/index.js',
			module: './dist/src/browser/index.js',
			types: './dist/src/browser/index.d.ts',
		})
	})

	it('server-only: cjs main + js module + types', () => {
		const entry = entryFields(['server'])
		expect(entry).toEqual({
			main: './dist/src/server/index.cjs',
			module: './dist/src/server/index.js',
			types: './dist/src/server/index.d.ts',
		})
	})

	it('core-only: cjs main + js module + types', () => {
		const entry = entryFields(['core'])
		expect(entry).toEqual({
			main: './dist/src/core/index.cjs',
			module: './dist/src/core/index.js',
			types: './dist/src/core/index.d.ts',
		})
	})
})

describe('dualCondition', () => {
	it('builds the dual import/require condition block', () => {
		expect(dualCondition('./dist/src/core/index')).toEqual({
			import: { types: './dist/src/core/index.d.ts', default: './dist/src/core/index.js' },
			require: { types: './dist/src/core/index.d.cts', default: './dist/src/core/index.cjs' },
		})
	})
})

describe('exportsMap', () => {
	it('browser-only: single types/import/default condition', () => {
		expect(exportsMap(['browser'])).toEqual({
			'.': {
				types: './dist/src/browser/index.d.ts',
				import: './dist/src/browser/index.js',
				default: './dist/src/browser/index.js',
			},
			'./package.json': './package.json',
		})
	})

	it('server-only: dual condition', () => {
		expect(exportsMap(['server'])).toEqual({
			'.': dualCondition('./dist/src/server/index'),
			'./package.json': './package.json',
		})
	})

	it('core-only: dual condition', () => {
		expect(exportsMap(['core'])).toEqual({
			'.': dualCondition('./dist/src/core/index'),
			'./package.json': './package.json',
		})
	})

	it('multi-surface: root dual condition + per-surface subpaths, browser import-only', () => {
		const map = exportsMap(['core', 'browser', 'server'])
		expect(map['.']).toEqual(dualCondition('./dist/src/core/index'))
		expect(map['./browser']).toEqual({
			import: { types: './dist/src/browser/index.d.ts', default: './dist/src/browser/index.js' },
		})
		expect(map['./server']).toEqual(dualCondition('./dist/src/server/index'))
		expect(map['./package.json']).toBe('./package.json')
	})
})

describe('compareCodeUnit', () => {
	it('sorts by code unit, not locale', () => {
		expect([...['b', 'a', 'C']].sort(compareCodeUnit)).toEqual(['C', 'a', 'b'])
	})

	it('returns 0 for equal strings', () => {
		expect(compareCodeUnit('a', 'a')).toBe(0)
	})
})

describe('devDependenciesFor', () => {
	it('carries the baseline unconditionally', () => {
		const deps = devDependenciesFor([])
		expect(deps.typescript).toBe('^6.0.3')
		expect(deps['@vitest/browser-playwright']).toBe('^4.1.10')
	})

	it('merges extras on top, extras winning on collision', () => {
		const deps = devDependenciesFor([
			dependency('typescript', '^9.9.9'),
			dependency('foo', '^1.0.0'),
		])
		expect(deps.typescript).toBe('^9.9.9')
		expect(deps.foo).toBe('^1.0.0')
	})
})

describe('packageManifest', () => {
	it('builds a parseable package.json with sorted keywords and dependencies', () => {
		const spec = blueprint('router', {
			keywords: ['b', 'a'],
			dependencies: [dependency('@orkestrel/b', '^1.0.0'), dependency('@orkestrel/a', '^1.0.0')],
			peers: [dependency('@orkestrel/database', '^1.0.0', true)],
		})
		const manifest = readManifest(packageManifest(spec))
		expect(manifest.name).toBe('@orkestrel/router')
		expect(manifest.keywords).toEqual(['a', 'b'])
		expect(Object.keys(readRecord(manifest.dependencies))).toEqual(['@orkestrel/a', '@orkestrel/b'])
		expect(readRecord(manifest.peerDependenciesMeta)['@orkestrel/database']).toEqual({
			optional: true,
		})
	})

	it('omits peerDependencies/peerDependenciesMeta when there are no peers', () => {
		const manifest = readManifest(packageManifest(blueprint('router')))
		expect(manifest.peerDependencies).toBeUndefined()
		expect(manifest.peerDependenciesMeta).toBeUndefined()
	})

	it('P2: every peer is ALSO dev-installed — merges into devDependencies at its peer range', () => {
		const spec = blueprint('mcp', {
			surfaces: ['core', 'server'],
			peers: [dependency('@orkestrel/router', '^0.0.4'), dependency('@orkestrel/server', '^0.0.6')],
		})
		const manifest = readManifest(packageManifest(spec))
		const dev = readRecord(manifest.devDependencies)
		expect(dev['@orkestrel/router']).toBe('^0.0.4')
		expect(dev['@orkestrel/server']).toBe('^0.0.6')
	})
})

describe('rootTsconfig', () => {
	it('emits one @src/<surface> path alias per declared surface, in order', () => {
		const config = readRecord(JSON.parse(rootTsconfig(['core', 'server'])))
		const paths = readRecord(readRecord(config.compilerOptions).paths)
		expect(Object.keys(paths)).toEqual(['@src/core', '@src/server'])
		expect(paths['@src/core']).toEqual(['./src/core/index.ts'])
	})
})

describe('rootViteConfig / singleSurfaceViteConfig', () => {
	it('core-only carries no Playwright import anywhere', () => {
		const content = rootViteConfig(['core'])
		expect(content).not.toContain('@vitest/browser-playwright')
		expect(content).toContain('srcCore')
	})

	it('multi-surface always ships Playwright unconditionally', () => {
		const content = rootViteConfig(['core', 'server'])
		expect(content).toContain('@vitest/browser-playwright')
		expect(content).toContain('srcServer')
	})

	it('server-only is the surface factory itself as base, no @src/core externalize', () => {
		const content = rootViteConfig(['server'])
		expect(content).not.toContain('@src/core')
		expect(content).toContain('srcServer')
		expect(content).not.toContain('@vitest/browser-playwright')
	})

	it('server-only produces this EXACT byte-for-byte vite.config.ts (breaks the blueprintToPlan/direct-helper drift tautology)', () => {
		expect(rootViteConfig(['server'])).toBe(`import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vitest/config'
import tsconfig from './tsconfig.json' with { type: 'json' }
import { fileURLToPath, URL } from 'node:url'

export function resolveWorkspacePath(relativePath: string): string {
	return fileURLToPath(new URL(relativePath, import.meta.url))
}

const resolve = {
	alias: Object.entries(tsconfig.compilerOptions.paths).reduce(
		(a, [k, v]) => Object.assign(a, { [k]: resolveWorkspacePath(v[0]) }),
		{},
	),
}

export const srcServer = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			build: {
				emptyOutDir: true,
				sourcemap: true,
				minify: false,
				lib: {
					entry: resolveWorkspacePath('src/server/index.ts'),
					formats: ['es', 'cjs'],
					fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
				},
				outDir: 'dist/src/server',
				target: 'node24',
				rolldownOptions: {
					external: (id: string) => id.startsWith('node:') || id.startsWith('@orkestrel/'),
				},
			},
			test: {
				name: { label: 'src:server', color: 'red' },
				include: ['tests/src/server/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		config ?? {},
	)

export const guides = (config?: UserConfig): UserConfig =>
	srcServer(
		mergeConfig(
			{
				test: {
					name: { label: 'guides', color: 'green' },
					include: ['tests/guides/**/*.test.ts'],
					exclude: ['tests/src/**/*.test.ts', 'tests/setup.test.ts'],
				},
			},
			config ?? {},
		),
	)

export default defineConfig({
	resolve,
	test: {
		projects: [srcServer, guides],
	},
})
`)
	})

	it('browser-only is the surface factory itself as base, ships Playwright', () => {
		const content = rootViteConfig(['browser'])
		expect(content).not.toContain('@src/core')
		expect(content).toContain('srcBrowser')
		expect(content).toContain('@vitest/browser-playwright')
	})
})

describe('coreTsconfig / coreViteConfig', () => {
	it('coreTsconfig points rootDir/outDir at src/core', () => {
		const config = readRecord(JSON.parse(coreTsconfig()))
		expect(readRecord(config.compilerOptions).rootDir).toBe('../../src/core')
	})

	it('coreViteConfig inlines its own build.lib', () => {
		expect(coreViteConfig()).toContain("entry: resolveWorkspacePath('src/core/index.ts')")
	})
})

describe('surfaceTsconfig / surfaceViteConfig', () => {
	it('surfaceTsconfig points at the whole src/dist-src tree', () => {
		const config = readRecord(JSON.parse(surfaceTsconfig('server')))
		expect(readRecord(config.compilerOptions).rootDir).toBe('../../src')
		expect(readRecord(config.compilerOptions).outDir).toBe('../../dist/src')
	})

	it('surfaceViteConfig anchors on the surface factory', () => {
		expect(surfaceViteConfig('browser')).toContain('srcBrowser')
		expect(surfaceViteConfig('server')).toContain('srcServer')
	})
})

describe('configArtifacts', () => {
	it('drafts the root pair plus each declared surface pair', () => {
		const artifacts = configArtifacts(blueprint('router', { surfaces: ['core', 'server'] }))
		const paths = artifacts.map((artifact) => artifact.path)
		expect(paths).toContain('tsconfig.json')
		expect(paths).toContain('vite.config.ts')
		expect(paths).toContain('configs/src/tsconfig.core.json')
		expect(paths).toContain('configs/src/vite.server.config.ts')
	})
})

describe('sourceArtifacts', () => {
	it('drafts one full stub quartet per declared surface', () => {
		const artifacts = sourceArtifacts(
			blueprint('router', { surfaces: ['core', 'browser'] }),
			'Router',
		)
		const paths = artifacts.map((artifact) => artifact.path)
		for (const surface of ['core', 'browser'] as const) {
			expect(paths).toContain(`src/${surface}/types.ts`)
			expect(paths).toContain(`src/${surface}/Router.ts`)
			expect(paths).toContain(`src/${surface}/factories.ts`)
			expect(paths).toContain(`src/${surface}/index.ts`)
		}
	})
})

describe('paritySpecifiers', () => {
	it('resolves the primary surface to core when declared', () => {
		const content = paritySpecifiers(blueprint('router', { surfaces: ['core', 'server'] }))
		expect(content).toContain("'@orkestrel/router': 'src/core'")
	})

	it('resolves the primary surface to the sole declared surface otherwise', () => {
		const content = paritySpecifiers(blueprint('router', { surfaces: ['server'] }))
		expect(content).toContain("'@orkestrel/router': 'src/server'")
	})
})

describe('testArtifacts', () => {
	it('drafts setup.ts, per-surface pairs, and the always-on parity test', () => {
		const artifacts = testArtifacts(blueprint('router', { surfaces: ['server'] }), 'Router')
		const paths = artifacts.map((artifact) => artifact.path)
		expect(paths).toContain('tests/setup.ts')
		expect(paths).toContain('tests/setupServer.ts')
		expect(paths).not.toContain('tests/setupBrowser.ts')
		expect(paths).toContain('tests/src/server/Router.test.ts')
		expect(paths).toContain('tests/src/server/factories.test.ts')
		expect(paths).toContain('tests/guides/src/parity.test.ts')
	})
})

describe('guideArtifacts / guideMemberTable', () => {
	it('dedupes member rows across surfaces sharing the same name/summary', () => {
		const spec = blueprint('router', { surfaces: ['core', 'server'] })
		const members = blueprintToMembers(spec)
		const table = guideMemberTable('entity', members)
		const rows = table.split('\n').filter((line) => line.startsWith('| `Router`'))
		expect(rows).toHaveLength(1)
	})

	it('emits the package guide and guides README', () => {
		const spec = blueprint('router', { surfaces: ['core'] })
		const artifacts = guideArtifacts(spec, 'Router', blueprintToMembers(spec))
		const paths = artifacts.map((artifact) => artifact.path)
		expect(paths).toContain('guides/src/router.md')
		expect(paths).toContain('guides/README.md')
	})

	it('vendors a guide mirror only for the seven grounded @orkestrel/* dependency names', () => {
		const spec = blueprint('router', {
			surfaces: ['core'],
			dependencies: [
				dependency('@orkestrel/contract', '^0.0.5'),
				dependency('@orkestrel/some-outside-thing', '^1.0.0'),
			],
		})
		const artifacts = guideArtifacts(spec, 'Router', blueprintToMembers(spec))
		const paths = artifacts.map((artifact) => artifact.path)
		expect(paths).toContain('guides/src/contract.md')
		expect(paths).not.toContain('guides/src/some-outside-thing.md')
	})
})

describe('applyOverrides', () => {
	it('replaces a matching artifact content in place', () => {
		const artifacts = [
			{ path: 'README.md', group: 'docs' as const, origin: 'template' as const, content: '# old' },
		]
		const result = applyOverrides(artifacts, [override('README.md', '# new')])
		expect(result[0]?.content).toBe('# new')
	})

	it('is a no-op with an empty overrides list', () => {
		const artifacts = [
			{ path: 'README.md', group: 'docs' as const, origin: 'template' as const, content: '# old' },
		]
		expect(applyOverrides(artifacts, [])).toBe(artifacts)
	})

	it('never touches host-origin artifacts, even on a matching path', () => {
		const artifacts = [
			{ path: 'AGENTS.md', group: 'docs' as const, origin: 'host' as const, source: 'AGENTS.md' },
		]
		const result = applyOverrides(artifacts, [override('AGENTS.md', 'nope')])
		expect(result[0]?.content).toBeUndefined()
	})

	it('leaves a non-matching override unapplied', () => {
		const artifacts = [
			{ path: 'README.md', group: 'docs' as const, origin: 'template' as const, content: '# old' },
		]
		const result = applyOverrides(artifacts, [override('OTHER.md', '# new')])
		expect(result[0]?.content).toBe('# old')
	})
})

describe('direct-helper / blueprintToPlan cross-consistency', () => {
	describe.each(VARIANTS)('$label', ({ surfaces }) => {
		it('vite.config.ts content matches the blueprintToPlan-emitted artifact byte for byte', () => {
			const spec: Blueprint = blueprint('router', { surfaces })
			const plan = blueprintToPlan(spec, ['configs'])
			const emitted = plan.artifacts.find((artifact) => artifact.path === 'vite.config.ts')
			expect(emitted?.content).toBe(rootViteConfig(surfaces))
		})

		it('tests/guides/src/parity.test.ts content matches the direct paritySpecifiers-derived artifact byte for byte', () => {
			const spec: Blueprint = blueprint('router', { surfaces })
			const plan = blueprintToPlan(spec, ['tests'])
			const emitted = plan.artifacts.find(
				(artifact) => artifact.path === 'tests/guides/src/parity.test.ts',
			)
			const direct = testArtifacts(spec, pascalCase(spec.name)).find(
				(artifact) => artifact.path === 'tests/guides/src/parity.test.ts',
			)
			expect(emitted?.content).toBe(direct?.content)
			expect(emitted?.content).toContain(paritySpecifiers(spec))
		})

		it('package.json content matches the direct packageManifest output byte for byte', () => {
			const spec: Blueprint = blueprint('router', { surfaces })
			const plan = blueprintToPlan(spec, ['manifest'])
			const emitted = plan.artifacts.find((artifact) => artifact.path === 'package.json')
			expect(emitted?.content).toBe(packageManifest(spec))
		})
	})
})
