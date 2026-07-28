import type { Artifact, Blueprint, Environment } from '@src/core'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseJSON } from '@orkestrel/contract'
import { describe, expect, it } from 'vitest'
import {
	applyOverrides,
	applicationArtifacts,
	applicationViteConfig,
	APP_MATRIX,
	appTsconfig,
	appViteConfig,
	blueprint,
	blueprintToMembers,
	blueprintToPlan,
	ciWorkflow,
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
	serializeTypeScriptString,
	sourceArtifacts,
	srcTsconfig,
	srcVariant,
	srcViteConfig,
	testArtifacts,
	TYPESCRIPT_EXTENSIONS,
	viteHeader,
	viteMachinery,
} from '@src/core'
import {
	APPLICATION_VARIANTS,
	readManifest,
	readRecord,
	SOURCE_VARIANTS,
	WORKSPACE_VARIANTS,
} from '../../setup.js'
import { WORKSPACE_ROOT } from '../../setupServer.js'

describe('ciWorkflow', () => {
	it('pins official actions to reviewed full commit SHAs and disables install scripts', () => {
		const workflow = ciWorkflow(blueprint('router', { src: ['core'] }))

		expect(workflow).toContain(
			'uses: actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd # v6.0.2',
		)
		expect(workflow).toContain('persist-credentials: false')
		expect(workflow).toContain(
			'uses: actions/setup-node@48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e # v6.4.0',
		)
		expect(workflow).toContain("node: ['22.12.0', '26']")
		expect(workflow).toContain('node-version: ${{ matrix.node }}')
		expect(workflow).toContain('run: npm ci --ignore-scripts')
		expect(workflow).not.toMatch(/uses: actions\/[^@\s]+@v\d/)
	})

	it('installs Chromium for the engine-owned generated browser consumer proof', () => {
		const workflow = ciWorkflow(blueprint('scaffold', { src: ['core', 'server'], engine: true }))

		expect(workflow).toContain('playwright install --with-deps chromium')
	})
})

describe('hostGroup', () => {
	it('classes the root docs paths as docs', () => {
		expect(hostGroup('AGENTS.md')).toBe('docs')
		expect(hostGroup('CLAUDE.md')).toBe('docs')
		expect(hostGroup('LICENSE')).toBe('docs')
	})

	it('classes skills, agent configs, SessionStart scripts, and CI as orchestration', () => {
		expect(hostGroup('.agents/skills')).toBe('orchestration')
		expect(hostGroup('.claude/agents')).toBe('orchestration')
		expect(hostGroup('.codex/agents')).toBe('orchestration')
		expect(hostGroup('scripts/deps.sh')).toBe('orchestration')
		expect(hostGroup('scripts/cursor.sh')).toBe('orchestration')
		expect(hostGroup('scripts/codex.sh')).toBe('orchestration')
		expect(hostGroup('scripts/ollama.sh')).toBe('orchestration')
		expect(hostGroup('.github/workflows/ci.yml')).toBe('orchestration')
	})

	it('classes the vendored guide index and the scaffold engine self-guide as guides', () => {
		expect(hostGroup('guides/src/guide.md')).toBe('guides')
		expect(hostGroup('guides/src/scaffold.md')).toBe('guides')
	})

	it('classes the shared AST coding-policy gate as tests', () => {
		expect(hostGroup('tests/setupPolicy.ts')).toBe('tests')
	})

	it('falls back to configs for anything else', () => {
		expect(hostGroup('.oxlintrc.json')).toBe('configs')
	})
})

describe('application layer compilation', () => {
	describe.each(APPLICATION_VARIANTS)('$label application selection', ({ app }) => {
		it.each(WORKSPACE_VARIANTS)(
			'emits the complete $label manifest, config, source, test, and script class',
			({ label, src }) => {
				const spec = blueprint('complete-app', { src, app })
				const plan = blueprintToPlan(spec)
				const paths = new Set(plan.artifacts.map((artifact) => artifact.path))
				const manifest = readManifest(packageManifest(spec))
				const scripts = readRecord(manifest.scripts)

				expect(manifest.private).toBe(label === 'app-only' ? true : undefined)
				expect(manifest.sideEffects).toBe(label === 'app-only' ? undefined : false)
				expect(manifest.files).toEqual([
					label === 'app-only' ? 'dist/app' : 'dist/src',
					'README.md',
				])
				expect(readRecord(manifest.dependencies).vue).toBeUndefined()
				expect(readRecord(manifest.devDependencies).vue).toBe(
					app.includes('browser') ? '^3.5.40' : undefined,
				)
				for (const environment of app) {
					for (const path of APP_MATRIX[environment].configs) expect(paths.has(path)).toBe(true)
					expect(scripts[`test:app:${environment}`]).toContain(
						`--project ${APP_MATRIX[environment].project}`,
					)
					expect(paths.has(`app/${environment}/index.ts`)).toBe(true)
				}
				expect(paths.has('tests/guides/src/parity.test.ts')).toBe(true)
			},
		)
	})

	it('emits a private app-only manifest without package entry points', () => {
		const spec = blueprint('console-app', {
			src: [],
			app: ['core', 'browser', 'server'],
		})
		const manifest = readManifest(packageManifest(spec))

		expect(manifest.name).toBe('console-app')
		expect(manifest.private).toBe(true)
		expect(manifest.main).toBeUndefined()
		expect(manifest.module).toBeUndefined()
		expect(manifest.types).toBeUndefined()
		expect(manifest.exports).toBeUndefined()
		expect(manifest.publishConfig).toBeUndefined()
		expect(manifest.files).toEqual(['dist/app', 'README.md'])
		expect(manifest.sideEffects).toBeUndefined()
		expect(readRecord(manifest.dependencies).vue).toBeUndefined()
		expect(readRecord(manifest.devDependencies).vue).toBe('^3.5.40')
		expect(readRecord(manifest.devDependencies)['vite-plugin-dts']).toBeUndefined()
		expect(readRecord(manifest.devDependencies)['@microsoft/api-extractor']).toBeUndefined()
		expect(readRecord(manifest.scripts)['build:app:server']).toBe(
			'vite build --config configs/app/vite.server.config.ts',
		)
	})

	it('adds the Vue/browser toolchain only when app/browser is selected', () => {
		const manifest = readManifest(
			packageManifest(blueprint('worker', { src: [], app: ['core', 'server'] })),
		)
		expect(readRecord(manifest.dependencies).vue).toBeUndefined()
		expect(readRecord(manifest.devDependencies)['@vitejs/plugin-vue']).toBeUndefined()
		expect(readRecord(manifest.devDependencies).playwright).toBeUndefined()
		expect(readRecord(manifest.devDependencies)['vue-tsc']).toBeUndefined()
	})

	it('keeps a mixed workspace publishable while excluding app output from files', () => {
		const manifest = readManifest(
			packageManifest(
				blueprint('console', {
					src: ['core'],
					app: ['core', 'browser'],
				}),
			),
		)

		expect(manifest.name).toBe('@orkestrel/console')
		expect(manifest.private).toBeUndefined()
		expect(manifest.files).toEqual(['dist/src', 'README.md'])
		expect(manifest.sideEffects).toBe(false)
		expect(readRecord(manifest.dependencies).vue).toBeUndefined()
		expect(readRecord(manifest.devDependencies).vue).toBe('^3.5.40')
	})

	it('emits aliases, thin configs, runnable sources, and real environment tests', () => {
		const spec = blueprint('console-app', {
			src: [],
			app: ['core', 'browser', 'server'],
		})
		const plan = blueprintToPlan(spec)
		const paths = new Set(plan.artifacts.map((artifact) => artifact.path))
		const tsconfig = plan.artifacts.find((artifact) => artifact.path === 'tsconfig.json')
		const vite = plan.artifacts.find((artifact) => artifact.path === 'vite.config.ts')
		const serverTypes = plan.artifacts.find((artifact) => artifact.path === 'app/server/types.ts')
		const serverRunner = plan.artifacts.find(
			(artifact) => artifact.path === 'app/server/ApplicationServerRunner.ts',
		)
		const serverFactories = plan.artifacts.find(
			(artifact) => artifact.path === 'app/server/factories.ts',
		)

		expect(tsconfig?.content).toContain('"@app/core"')
		expect(tsconfig?.content).toContain('"@app/browser"')
		expect(tsconfig?.content).toContain('"@app/server"')
		expect(vite?.content).toBe(applicationViteConfig([], spec.app))
		expect(vite?.content).toContain(
			'projects: [appCore, ...(hasChromium ? [appBrowser()] : []), appServer, policy, guides]',
		)
		expect(
			plan.artifacts.find((artifact) => artifact.path === 'app/server/main.ts')?.content,
		).toContain('startApplicationServer()')
		expect(serverTypes?.content).toContain('start(): void\n\tstop(): Promise<void>')
		expect(serverFactories?.content).toContain(
			'function startApplicationServer(\n\toptions: ApplicationServerOptions = {},\n): ApplicationServerRunnerInterface',
		)
		expect(serverFactories?.content).toContain('return runner')
		expect(serverRunner?.content).not.toContain('function startApplicationServer')
		for (const path of [
			'configs/app/tsconfig.core.json',
			'configs/app/tsconfig.browser.json',
			'configs/app/tsconfig.server.json',
			'configs/app/vite.browser.config.ts',
			'configs/app/vite.server.config.ts',
			'app/core/index.ts',
			'app/browser/index.html',
			'app/browser/ApplicationView.vue',
			'app/server/main.ts',
			'app/server/ApplicationServerRunner.ts',
			'tests/app/core/factories.test.ts',
			'tests/app/browser/factories.test.ts',
			'tests/app/server/ApplicationServer.test.ts',
		]) {
			expect({ path, exists: paths.has(path) }).toEqual({ path, exists: true })
		}
	})

	it('keeps browser-only and server-only applications independent of app/core', () => {
		const browser = applicationArtifacts(blueprint('browser-app', { src: [], app: ['browser'] }))
		const server = applicationArtifacts(blueprint('server-app', { src: [], app: ['server'] }))

		expect(browser.some((artifact) => artifact.path === 'app/core/index.ts')).toBe(false)
		expect(
			browser.find((artifact) => artifact.path === 'app/browser/factories.ts')?.content,
		).toContain("from './constants.js'")
		expect(server.some((artifact) => artifact.path === 'app/core/index.ts')).toBe(false)
		expect(
			server.find((artifact) => artifact.path === 'app/server/constants.ts')?.content,
		).toContain("APP_NAME = 'server-app'")
	})

	it('serializes hostile names for TypeScript strings and HTML text nodes', () => {
		const hostile = `x'</title><script>throw new Error("owned")</script>`
		const artifacts = applicationArtifacts({
			...blueprint('safe', { src: [], app: ['core', 'browser', 'server'] }),
			name: hostile,
		})
		const core = artifacts.find((artifact) => artifact.path === 'app/core/constants.ts')
		const html = artifacts.find((artifact) => artifact.path === 'app/browser/index.html')

		expect(core?.content).toContain(`APP_NAME = ${serializeTypeScriptString(hostile)}`)
		expect(html?.content).not.toContain('<script>')
		expect(html?.content).toContain('&lt;script&gt;')
	})

	it('preserves host-independent core and disjoint browser/server implementation direction', () => {
		const artifacts = applicationArtifacts(
			blueprint('application', {
				src: [],
				app: ['core', 'browser', 'server'],
			}),
		)
		const coreContent = artifacts
			.filter((artifact) => artifact.path.startsWith('app/core/'))
			.map((artifact) => artifact.content ?? '')
			.join('\n')
		const browserContent = artifacts
			.filter((artifact) => artifact.path.startsWith('app/browser/'))
			.map((artifact) => artifact.content ?? '')
			.join('\n')
		const serverContent = artifacts
			.filter((artifact) => artifact.path.startsWith('app/server/'))
			.map((artifact) => artifact.content ?? '')
			.join('\n')

		expect(coreContent).not.toMatch(/node:|from 'vue'|@app\/(?:browser|server)/)
		expect(browserContent).not.toContain('@app/server')
		expect(serverContent).not.toContain('@app/browser')
	})

	it('builds check-only app tsconfigs and thin executable Vite wrappers', () => {
		const core = readRecord(parseJSON(appTsconfig('core', true)))
		const browser = readRecord(parseJSON(appTsconfig('browser', true)))
		const server = readRecord(parseJSON(appTsconfig('server', true)))

		expect(readRecord(core.compilerOptions).lib).toEqual(['ESNext', 'WebWorker'])
		expect(readRecord(core.compilerOptions).types).toEqual([])
		expect(readRecord(browser.compilerOptions).lib).toEqual(['ESNext', 'DOM', 'DOM.Iterable'])
		expect(readRecord(server.compilerOptions).lib).toEqual(['ESNext'])
		for (const extension of TYPESCRIPT_EXTENSIONS) {
			expect(appTsconfig('browser', true)).toContain(`"../../app/browser/**/*.${extension}"`)
			expect(appTsconfig('browser', true)).toContain(`"../../app/core/**/*.${extension}"`)
			expect(appTsconfig('server', false)).not.toContain(`"../../app/core/**/*.${extension}"`)
		}
		expect(appViteConfig('browser')).toContain('appBrowser()')
		expect(appViteConfig('server')).toContain('appServer()')
	})
})

describe('fillArtifact', () => {
	it('fills a template into a template-origin artifact without a environment', () => {
		const artifact = fillArtifact('README.md', 'docs', 'readme', {
			name: 'router',
			title: '@orkestrel/router',
			description: 'A router.',
			install: 'Install it.',
			usage: 'Use it.',
		})
		expect(artifact.group).toBe('docs')
		expect(artifact.origin).toBe('template')
		expect(artifact.environment).toBeUndefined()
		expect(artifact.content).toContain('router')
	})

	it('tags the artifact with a environment when provided', () => {
		const artifact = fillArtifact(
			'src/core/types.ts',
			'source',
			'types',
			{ pascal: 'Router' },
			'core',
		)
		expect(artifact.environment).toBe('core')
	})

	it('throws on an unknown template id', () => {
		expect(() => fillArtifact('x', 'docs', 'nope', {})).toThrow(/Unknown template id/)
	})
})

describe('generated test formatting boundaries', () => {
	it('breaks a long explicit entity construction at the call arguments', () => {
		const spec = blueprint('scaffold-mixed-layer-acceptance', { src: ['core'] })
		const test = testArtifacts(spec, pascalCase(spec.name)).find(
			(artifact) => artifact.path === 'tests/src/core/ScaffoldMixedLayerAcceptance.test.ts',
		)

		expect(test?.content).toContain(
			"const instance: ScaffoldMixedLayerAcceptanceInterface = new ScaffoldMixedLayerAcceptance({\n\t\t\tid: 'example',\n\t\t})",
		)
		expect(test?.content).not.toContain('ScaffoldMixedLayerAcceptanceInterface =\n')
	})
})

describe('srcVariant', () => {
	it('resolves a sole environment', () => {
		expect(srcVariant(['core'])).toBe('core')
		expect(srcVariant(['browser'])).toBe('browser')
		expect(srcVariant(['server'])).toBe('server')
	})

	it('resolves multi for two or more src', () => {
		expect(srcVariant(['core', 'server'])).toBe('multi')
		expect(srcVariant(['core', 'browser', 'server'])).toBe('multi')
	})

	it('falls back to core for an empty list', () => {
		expect(srcVariant([])).toBe('core')
	})
})

describe('entryFields', () => {
	it('multi-environment: cjs main/module, no types', () => {
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

	it('multi-environment: root dual condition + per-environment subpaths, browser import-only', () => {
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
		expect(deps['@vitest/browser-playwright']).toBeUndefined()
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

	it('dev-installs every peer at its peer range', () => {
		const spec = blueprint('mcp', {
			src: ['core', 'server'],
			peers: [dependency('@orkestrel/router', '^0.0.4'), dependency('@orkestrel/server', '^0.0.6')],
		})
		const manifest = readManifest(packageManifest(spec))
		const dev = readRecord(manifest.devDependencies)
		expect(dev['@orkestrel/router']).toBe('^0.0.4')
		expect(dev['@orkestrel/server']).toBe('^0.0.6')
	})

	it('sorts peers and baseline dependencies together by code unit', () => {
		const spec = blueprint('mcp', {
			src: ['core', 'server'],
			peers: [dependency('@orkestrel/router', '^0.0.4'), dependency('@orkestrel/server', '^0.0.6')],
		})
		const manifest = readManifest(packageManifest(spec))
		const dev = readRecord(manifest.devDependencies)
		expect(Object.keys(dev)).toEqual([
			'@microsoft/api-extractor',
			'@orkestrel/guide',
			'@orkestrel/router',
			'@orkestrel/scaffold',
			'@orkestrel/server',
			'@types/node',
			'oxfmt',
			'oxlint',
			'typescript',
			'vite',
			'vite-plugin-dts',
			'vitest',
		])
	})

	it('a non-engine (child) blueprint carries no bin/build:host tax and keeps @orkestrel/scaffold as a devDependency', () => {
		const spec = blueprint('router', { src: ['core', 'server'] })
		const manifest = readManifest(packageManifest(spec))
		expect(manifest.bin).toBeUndefined()
		const scripts = readRecord(manifest.scripts)
		expect(scripts['build:host']).toBeUndefined()
		expect(scripts.scaffold).toBe('scaffold')
		const dev = readRecord(manifest.devDependencies)
		expect(dev['@orkestrel/scaffold']).toBeDefined()
	})

	it('an engine blueprint carries the bin/build:host self-hosting tax and omits its own devDependency', () => {
		const spec = blueprint('scaffold', { src: ['core', 'server'], engine: true })
		const manifest = readManifest(packageManifest(spec))
		expect(manifest.bin).toEqual({ scaffold: './dist/bin/scaffold.js' })
		expect(manifest.files).toEqual(['dist/src', 'dist/bin', 'dist/host', 'README.md'])
		expect(manifest.sideEffects).toEqual(['./src/bin/scaffold.ts', './dist/bin/scaffold.js'])
		const scripts = readRecord(manifest.scripts)
		expect(scripts.scaffold).toBe('node ./dist/bin/scaffold.js')
		expect(scripts['check:src:bin']).toBe('tsc --noEmit -p configs/src/tsconfig.bin.json')
		expect(scripts['test:src:bin']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin',
		)
		expect(scripts['test:integration']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project integration',
		)
		expect(scripts.prepublishOnly).toBe(
			'npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:integration',
		)
		expect(scripts['build:src:bin']).toBe('vite build --config configs/src/vite.bin.config.ts')
		expect(scripts.build).toBe('npm run clean && npm run build:src && npm run build:host')
		const dev = readRecord(manifest.devDependencies)
		expect(dev['@orkestrel/scaffold']).toBeUndefined()
		expect(dev['@vitest/browser-playwright']).toBe('^4.1.10')
		expect(dev.playwright).toBe('^1.61.1')
	})
})

describe('rootTsconfig', () => {
	it('emits one @src/<environment> path alias per declared environment, in order', () => {
		const config = readRecord(parseJSON(rootTsconfig(['core', 'server'])))
		const paths = readRecord(readRecord(config.compilerOptions).paths)
		expect(Object.keys(paths)).toEqual(['@src/core', '@src/server'])
		expect(paths['@src/core']).toEqual(['./src/core/index.ts'])
	})
})

describe('viteMachinery / viteHeader', () => {
	it('derives the browser, vue, and output axes from the declared environments', () => {
		expect(viteMachinery(['core'])).toEqual({ browser: false, vue: false, output: true })
		expect(viteMachinery(['core', 'server'])).toEqual({
			browser: false,
			vue: false,
			output: true,
		})
		expect(viteMachinery(['core', 'browser'])).toEqual({
			browser: true,
			vue: false,
			output: true,
		})
		expect(viteMachinery([], ['core'])).toEqual({ browser: false, vue: false, output: false })
		expect(viteMachinery([], ['core', 'browser'])).toEqual({
			browser: true,
			vue: true,
			output: true,
		})
		expect(viteMachinery([], ['core', 'server'])).toEqual({
			browser: false,
			vue: false,
			output: true,
		})
	})

	it('restores output containment for an app-core workspace that also builds', () => {
		expect(viteMachinery(['core'], ['core']).output).toBe(true)
		expect(viteMachinery([], ['core'], true).output).toBe(true)
		expect(viteMachinery([], []).output).toBe(true)
	})

	it('is the sole derivation every root config shape reads', () => {
		expect(rootViteConfig(['core', 'browser'])).toContain(
			viteHeader(viteMachinery(['core', 'browser'])),
		)
		expect(rootViteConfig(['server'])).toContain(viteHeader(viteMachinery(['server'])))
		expect(applicationViteConfig([], ['core', 'browser'])).toContain(
			viteHeader(viteMachinery([], ['core', 'browser'])),
		)
	})
})

describe('rootViteConfig / singleSrcViteConfig', () => {
	it('emits the filename-first parseSync result program wherever the boundary is emitted', () => {
		for (const content of [
			rootViteConfig(['core']),
			rootViteConfig(['browser']),
			rootViteConfig(['server']),
			rootViteConfig(['core', 'browser', 'server']),
			applicationViteConfig([], ['core']),
			applicationViteConfig([], ['browser']),
			applicationViteConfig([], ['server']),
			applicationViteConfig(['core', 'browser', 'server'], ['core', 'browser', 'server']),
		]) {
			expect(content).not.toContain('parseAst')
			expect(content).toContain('visitor.visit(parseSync(path, transformed.code).program)')
		}
	})

	it('audits the module graph of every blueprint that emits the environment boundary', () => {
		// The `@vite-ignore` dynamic import never reaches `resolveId` and never
		// enters the module graph `buildEnd` walks, so the AST visitor is the
		// only enforcement point for it — and `environmentBoundary('src/core')`
		// is emitted for core-only and app-core exactly as it is for the full
		// blueprint. The audit is induced by the boundary, not by a host axis.
		for (const content of [
			rootViteConfig(['core']),
			rootViteConfig(['core', 'server']),
			applicationViteConfig([], ['core']),
			applicationViteConfig(['core'], ['core']),
		]) {
			expect(content).toContain('environmentBoundary')
			expect(content).toContain('async function environmentAssetSources(')
			expect(content).toContain('ImportExpression(node) {')
			expect(content).toContain('new Visitor({')
			expect(content).toContain('ENVIRONMENT_MODULE_BYTES')
			expect(content).toContain('transform: {')
		}
	})

	it('rejects stylesheets from core and server in every blueprint', () => {
		// Stylesheet REJECTION is an owner-independent boundary guarantee: a
		// core or server module may never import one, whether or not the
		// workspace declares a browser environment that needs the CSS pipeline.
		for (const content of [
			rootViteConfig(['core']),
			rootViteConfig(['core', 'server']),
			rootViteConfig(['server']),
			applicationViteConfig([], ['core']),
			applicationViteConfig([], ['server']),
			applicationViteConfig(['core', 'server'], ['core', 'server']),
		]) {
			expect(content).toContain('function isStylesheetPath(path: string): boolean {')
			expect(content).toContain('const stylesheet = isStylesheetPath(target)')
			expect(content).toContain('const stylesheet = isStylesheetPath(normalizedSource)')
			expect(content).toContain('(stylesheet || targetBrowser || targetServer)')
			expect(content).toContain('(stylesheet || targetBrowser)')
			expect(content).toContain('(builtin || browserPackage || serverPackage || stylesheet)')
			expect(content).toContain('(browserPackage || stylesheet)')
		}
	})

	it('emits HTML boundary machinery only for an app browser environment', () => {
		const withoutHtml = [
			rootViteConfig(['core']),
			rootViteConfig(['browser']),
			rootViteConfig(['server']),
			rootViteConfig(['core', 'browser', 'server']),
			applicationViteConfig([], ['core']),
			applicationViteConfig([], ['server']),
			applicationViteConfig(['core', 'browser', 'server'], ['core', 'server']),
		]
		const htmlNames = [
			'HtmlAssetSource',
			'HTMLOptions',
			'IMPORT_META_ENV_PREFIX',
			'filterHtmlAssetSource',
			'filterHtmlScriptSource',
			'filterHtmlMetaSource',
			'environmentHtml',
			'HTML_SECURITY_PREFIX',
			'maskIgnoredHtml',
			'prepareHtml',
			'restoreHtml',
			'finalizeHtml',
		]

		for (const content of withoutHtml) {
			for (const name of htmlNames) expect(content).not.toContain(name)
		}

		const withHtml = applicationViteConfig([], ['browser'])
		for (const name of htmlNames) expect(withHtml).toContain(name)
		expect(withHtml).toContain('html: environmentHtml()')
		expect(withHtml).toContain('restoreHtml()')
		expect(withHtml).toContain('prepareHtml()')
		expect(withHtml).toContain('finalizeHtml()')
	})

	it('emits host pipelines on their axes and boundary guarantees on every blueprint', () => {
		const core = rootViteConfig(['core'])
		const server = rootViteConfig(['core', 'server'])
		const browser = rootViteConfig(['core', 'browser'])
		const appCore = applicationViteConfig([], ['core'])
		const full = applicationViteConfig(['core', 'browser', 'server'], ['core', 'browser', 'server'])
		// Owner-independent laws. Every one of these enforces a rule that holds
		// for `src/core` and `app/core` exactly as it holds for the full
		// blueprint, so they travel with `environmentBoundary` itself.
		const guaranteeNames = [
			'parseSync',
			'transformWithOxc',
			'Visitor',
			'ENVIRONMENT_MODULE_BYTES',
			'decodeAssetSource',
			'environmentAssetSources',
			'isStylesheetPath',
			'environmentBoundary',
			'environmentPathError',
			'environmentSourceError',
			'packageRootOf',
		]
		// The CSS pipeline itself — reading, preprocessing, and auditing real
		// stylesheets — exists only where a browser environment is declared.
		const cssNames = [
			'CSSOptions',
			'ResolvedConfig',
			'isCSSRequest',
			'preprocessCSS',
			'ENVIRONMENT_CSS',
			'stylesheetAssetError',
		]
		const htmlNames = [
			'HtmlAssetSource',
			'HTMLOptions',
			'IMPORT_META_ENV_PREFIX',
			'restoreIgnoredHtml',
			'environmentHtml',
			'prepareHtml',
			'restoreHtml',
			'finalizeHtml',
		]
		const outputNames = ['outputBoundary', 'enforceOutputPath', 'generateBundle']

		for (const content of [core, server, browser, appCore, full]) {
			for (const name of guaranteeNames) expect(content).toContain(name)
		}
		for (const content of [core, server, appCore]) {
			for (const name of [...cssNames, ...htmlNames]) expect(content).not.toContain(name)
		}
		for (const name of cssNames) expect(browser).toContain(name)
		for (const name of htmlNames) expect(browser).not.toContain(name)
		for (const name of [...cssNames, ...htmlNames]) expect(full).toContain(name)
		for (const content of [core, server, browser, full]) {
			for (const name of outputNames) expect(content).toContain(name)
		}
		for (const name of outputNames) expect(appCore).not.toContain(name)
	})

	it('keeps the S4 full-app vite template byte-equivalent', () => {
		const content = applicationViteConfig(
			['core', 'browser', 'server'],
			['core', 'browser', 'server'],
		)

		expect(createHash('sha256').update(content).digest('hex')).toBe(
			'63c9cef8360aefdfbf79cc11730c13af46256177e7ce14c656caf199e080e3f5',
		)
	})

	it('core-only carries no Playwright import anywhere', () => {
		const content = rootViteConfig(['core'])
		expect(content).not.toContain('@vitest/browser-playwright')
		expect(content).toContain('srcCore')
	})

	it('non-browser src do not ship Playwright', () => {
		const content = rootViteConfig(['core', 'server'])
		expect(content).not.toContain('@vitest/browser-playwright')
		expect(content).toContain('srcServer')
		expect(content).not.toContain("formats: ['es', 'cjs']")
	})

	it('mixed source/application config omits library formats when server output is explicit', () => {
		const content = applicationViteConfig(['core', 'server'], ['core', 'server'])
		expect(content).toContain('srcServer')
		expect(content).not.toContain("formats: ['es', 'cjs']")
		expect(applicationViteConfig(['server'], ['server'])).toContain("formats: ['es', 'cjs']")
	})

	it('keeps deployable application builds minified without public source maps', () => {
		const content = applicationViteConfig([], ['browser', 'server'])

		expect(content).not.toContain('sourcemap: true')
		expect(content).not.toContain('minify: false')
		expect(content).toContain('orkestrel-environment-boundary')
		expect(content).toContain("environmentBoundary('app/browser')")
		expect(content).toContain('prepareHtml()')
		expect(content).toContain('restoreHtml()')
		expect(content).toContain('finalizeHtml()')
		expect(content).toContain("outputBoundary('dist/app/browser'),")
		expect(content).toContain('const environmentKeys = new Set<string>()')
		expect(content).toContain('handler: maskIgnoredHtml.bind(undefined, environmentKeys)')
		expect(content).not.toContain('HTML_ENVIRONMENT_KEYS')
		expect(content).toContain('HTML_SECURITY_PREFIX')
		expect(content).toContain("script-src 'self'")
		expect(content).toContain('Classic external scripts are not permitted')
		expect(content).toContain('Module script URLs must remain in the local Vite graph')
		expect(content).toContain('function appBrowser(...config: readonly never[])')
		expect(content).toContain('Browser configuration overrides are not permitted')
		expect(content).toContain('Browser assets must remain external for output auditing')
		expect(content).toContain('Rolldown output directories and files cannot override')
		expect(content).toContain('@(?:app|src)\\/server')
		expect(content).toContain('isBuiltin(sourcePath)')
		expect(content).toContain('containedPath(root, physical)')
		expect(content).toContain("Object.getOwnPropertyDescriptor(manifest, 'name')?.value")
		expect(content).toContain('Dynamic imports must use static string values')
	})

	it('server-only is the environment factory itself as base, no @src/core externalize', () => {
		const content = rootViteConfig(['server'])
		expect(content).not.toContain('@src/core')
		expect(content).toContain('srcServer')
		expect(content).not.toContain('@vitest/browser-playwright')
		expect(content).toContain("environmentBoundary('src/server')")
	})

	it('browser-only is the environment factory itself as base, ships Playwright', () => {
		const content = rootViteConfig(['browser'])
		expect(content).not.toContain('@src/core')
		expect(content).toContain('srcBrowser')
		expect(content).toContain('@vitest/browser-playwright')
	})

	it('excludes every browser project from discovery when Chromium is unavailable', () => {
		const browser = rootViteConfig(['browser'])
		const source = rootViteConfig(['core', 'browser', 'server'])
		const appBrowser = applicationViteConfig([], ['browser'])
		const application = applicationViteConfig(
			['core', 'browser', 'server'],
			['core', 'browser', 'server'],
		)

		expect(browser).toContain(
			"if (!hasChromium) console.warn('browser projects skipped: Chromium absent (src:browser)')",
		)
		expect(source).toContain(
			"if (!hasChromium) console.warn('browser projects skipped: Chromium absent (src:browser)')",
		)
		expect(appBrowser).toContain(
			"if (!hasChromium) console.warn('browser projects skipped: Chromium absent (app:browser)')",
		)
		expect(application).toContain(
			"if (!hasChromium)\n\tconsole.warn('browser projects skipped: Chromium absent (src:browser, app:browser)')",
		)
		for (const content of [browser, source, appBrowser, application]) {
			expect(content.split('console.warn(')).toHaveLength(2)
		}
		expect(browser).toContain('projects: [...(hasChromium ? [srcBrowser] : []), policy, guides]')
		expect(source).toContain(
			'projects: [srcCore, ...(hasChromium ? [srcBrowser] : []), srcServer, policy, guides]',
		)
		expect(application).toContain('...(hasChromium ? [srcBrowser] : [])')
		expect(application).toContain('...(hasChromium ? [appBrowser()] : [])')
		expect(application).toContain("include: hasChromium ? ['tests/app/browser/**/*.test.ts'] : []")
		expect(application).toContain('passWithNoTests: !hasChromium')
	})

	it('keeps non-browser projects directly discoverable without a Chromium guard', () => {
		const content = applicationViteConfig(['core', 'server'], ['core', 'server'])

		expect(content).not.toContain('hasChromium')
		expect(content).not.toContain('console.warn(')
		expect(content).toContain('projects: [srcCore, srcServer, appCore, appServer, policy, guides]')
	})

	it('engine appends the srcBin project (self-hosting tax), absent for a non-engine blueprint', () => {
		const child = rootViteConfig(['core', 'server'])
		expect(child).not.toContain('srcBin')

		const engineContent = rootViteConfig(['core', 'server'], true)
		expect(engineContent).toContain("entry: resolveWorkspacePath('src/bin/scaffold.ts')")
		expect(engineContent).toContain("outDir: 'dist/bin'")
		expect(engineContent).toContain(
			'projects: [srcCore, srcServer, policy, guides, srcBin, integration]',
		)
		expect(engineContent).toContain("include: ['tests/integration/**/*.test.ts']")
	})
})

describe('coreTsconfig / coreViteConfig', () => {
	it('coreTsconfig points rootDir/outDir at src/core', () => {
		const config = readRecord(parseJSON(coreTsconfig()))
		const options = readRecord(config.compilerOptions)
		expect(options.rootDir).toBe('../../src/core')
		expect(options.lib).toEqual(['ESNext', 'WebWorker'])
		expect(options.types).toEqual([])
		for (const extension of TYPESCRIPT_EXTENSIONS) {
			expect(coreTsconfig()).toContain(`"../../src/core/**/*.${extension}"`)
		}
	})

	it('coreViteConfig inlines its own build.lib', () => {
		expect(coreViteConfig()).toContain("entry: resolveWorkspacePath('src/core/index.ts')")
	})

	it('omits CSS plumbing from the generated core build wrapper without a browser axis', () => {
		const artifacts = configArtifacts(blueprint('router', { src: ['core'] }))
		const content = artifacts.find(
			(artifact) => artifact.path === 'configs/src/vite.core.config.ts',
		)?.content

		expect(content).not.toContain('ENVIRONMENT_CSS')
		expect(content).not.toContain('css:')
		expect(content).toContain('environmentBoundary')
		expect(content).toContain('outputBoundary')
	})
})

describe('srcTsconfig / srcViteConfig', () => {
	it('srcTsconfig points at the whole src/dist-src tree', () => {
		const config = readRecord(parseJSON(srcTsconfig('server')))
		expect(readRecord(config.compilerOptions).rootDir).toBe('../../src')
		expect(readRecord(config.compilerOptions).outDir).toBe('../../dist/src')
		for (const extension of TYPESCRIPT_EXTENSIONS) {
			expect(srcTsconfig('server')).toContain(`"../../src/server/**/*.${extension}"`)
		}
	})

	it('srcViteConfig anchors on the environment factory', () => {
		expect(srcViteConfig('browser')).toContain('srcBrowser')
		expect(srcViteConfig('server')).toContain('srcServer')
	})
})

describe('configArtifacts', () => {
	it('drafts the root pair plus each declared environment pair', () => {
		const artifacts = configArtifacts(blueprint('router', { src: ['core', 'server'] }))
		const paths = artifacts.map((artifact) => artifact.path)
		expect(paths).toContain('tsconfig.json')
		expect(paths).toContain('vite.config.ts')
		expect(paths).toContain('configs/src/tsconfig.core.json')
		expect(paths).toContain('configs/src/vite.server.config.ts')
	})
})

describe('sourceArtifacts', () => {
	it('drafts one full stub quartet per declared environment', () => {
		const artifacts = sourceArtifacts(blueprint('router', { src: ['core', 'browser'] }), 'Router')
		const paths = artifacts.map((artifact) => artifact.path)
		const src: readonly Environment[] = ['core', 'browser']
		for (const environment of src) {
			expect(paths).toContain(`src/${environment}/types.ts`)
			expect(paths).toContain(`src/${environment}/Router.ts`)
			expect(paths).toContain(`src/${environment}/factories.ts`)
			expect(paths).toContain(`src/${environment}/index.ts`)
		}
	})
})

describe('paritySpecifiers', () => {
	it('resolves the primary environment to core when declared', () => {
		const content = paritySpecifiers(blueprint('router', { src: ['core', 'server'] }))
		expect(content).toContain("'@orkestrel/router': 'src/core'")
	})

	it('resolves the primary environment to the sole declared environment otherwise', () => {
		const content = paritySpecifiers(blueprint('router', { src: ['server'] }))
		expect(content).toContain("'@orkestrel/router': 'src/server'")
	})
})

describe('testArtifacts', () => {
	it('drafts setup.ts, per-environment pairs, and the always-on parity test', () => {
		const artifacts = testArtifacts(blueprint('router', { src: ['server'] }), 'Router')
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
	it('dedupes member rows across src sharing the same name/summary', () => {
		const spec = blueprint('router', { src: ['core', 'server'] })
		const members = blueprintToMembers(spec)
		const table = guideMemberTable('entity', members)
		const rows = table.split('\n').filter((line) => line.startsWith('| `Router`'))
		expect(rows).toHaveLength(1)
	})

	it('emits the package guide and guides README', () => {
		const spec = blueprint('router', { src: ['core'] })
		const artifacts = guideArtifacts(spec, 'Router', blueprintToMembers(spec))
		const paths = artifacts.map((artifact) => artifact.path)
		expect(paths).toContain('guides/src/router.md')
		expect(paths).toContain('guides/README.md')
	})

	it('vendors a guide mirror only for the seven grounded @orkestrel/* dependency names', () => {
		const spec = blueprint('router', {
			src: ['core'],
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

	it("the package guide stub's Environment usage example self-imports via @orkestrel/<name>, never @src/<name>", () => {
		const spec = blueprint('router', { src: ['core'] })
		const artifacts = guideArtifacts(spec, 'Router', blueprintToMembers(spec))
		const guide = artifacts.find((artifact) => artifact.path === 'guides/src/router.md')
		expect(guide?.content).toContain("import { createRouter } from '@orkestrel/router'")
		expect(guide?.content).not.toContain('@src/router')
	})
})

describe('blueprintToPlan guide ownership', () => {
	it.each(['scaffold', 'guide'])('lets the %s blueprint template own its guide path', (name) => {
		const plan = blueprintToPlan(blueprint(name, { src: ['core'] }), ['guides'])
		const guides = plan.artifacts.filter((artifact) => artifact.path === `guides/src/${name}.md`)

		expect(guides).toEqual([
			expect.objectContaining({
				path: `guides/src/${name}.md`,
				group: 'guides',
				origin: 'template',
			}),
		])
	})

	it('carries both host mirrors beside a normal blueprint own guide', () => {
		const plan = blueprintToPlan(blueprint('abort', { src: ['core'] }), ['guides'])
		const guides = plan.artifacts.filter((artifact) => artifact.path.startsWith('guides/src/'))

		expect(guides).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					path: 'guides/src/abort.md',
					group: 'guides',
					origin: 'template',
				}),
				expect.objectContaining({
					path: 'guides/src/guide.md',
					group: 'guides',
					origin: 'host',
				}),
				expect.objectContaining({
					path: 'guides/src/scaffold.md',
					group: 'guides',
					origin: 'host',
				}),
			]),
		)
		expect(guides).toHaveLength(3)
	})

	it('carries one guide mirror when the dependency is already in the host set', () => {
		const plan = blueprintToPlan(
			blueprint('abort', {
				src: ['core'],
				dependencies: [dependency('@orkestrel/guide', '^0.0.5')],
			}),
			['guides'],
		)
		const mirrors = plan.artifacts.filter((artifact) => artifact.path === 'guides/src/guide.md')

		expect(mirrors).toHaveLength(1)
		expect(mirrors[0]).toMatchObject({ group: 'guides', origin: 'host' })
	})

	it('lets a vendored package own its guide when it declares itself as a dependency', () => {
		const plan = blueprintToPlan(
			blueprint('contract', {
				src: ['core'],
				dependencies: [dependency('@orkestrel/contract', '^0.0.7')],
			}),
			['guides'],
		)
		const guides = plan.artifacts.filter((artifact) => artifact.path === 'guides/src/contract.md')

		expect(guides).toEqual([
			expect.objectContaining({
				path: 'guides/src/contract.md',
				group: 'guides',
				origin: 'template',
			}),
		])
	})

	it.each([
		{ name: 'scaffold', other: 'guide' },
		{ name: 'guide', other: 'scaffold' },
	])('keeps the other host mirror beside the $name self-guide', ({ name, other }) => {
		const plan = blueprintToPlan(blueprint(name, { src: ['core'] }), ['guides'])
		const mirror = plan.artifacts.filter((artifact) => artifact.path === `guides/src/${other}.md`)

		expect(mirror).toEqual([
			expect.objectContaining({
				path: `guides/src/${other}.md`,
				group: 'guides',
				origin: 'host',
			}),
		])
	})
})

describe('applyOverrides', () => {
	it('replaces a matching artifact content in place', () => {
		const artifacts: readonly Artifact[] = [
			{ path: 'README.md', group: 'docs', origin: 'template', content: '# old' },
		]
		const result = applyOverrides(artifacts, [override('README.md', '# new')])
		expect(result[0]?.content).toBe('# new')
	})

	it('is a no-op with an empty overrides list', () => {
		const artifacts: readonly Artifact[] = [
			{ path: 'README.md', group: 'docs', origin: 'template', content: '# old' },
		]
		expect(applyOverrides(artifacts, [])).toBe(artifacts)
	})

	it('never touches host-origin artifacts, even on a matching path', () => {
		const artifacts: readonly Artifact[] = [
			{ path: 'AGENTS.md', group: 'docs', origin: 'host', source: 'AGENTS.md' },
		]
		const result = applyOverrides(artifacts, [override('AGENTS.md', 'nope')])
		expect(result[0]?.content).toBeUndefined()
	})

	it('never overrides the blueprint-owned package manifest', () => {
		const artifacts: readonly Artifact[] = [
			{ path: 'package.json', group: 'manifest', origin: 'computed', content: '{"private":true}' },
		]
		const result = applyOverrides(artifacts, [override('package.json', '{"private":false}')])

		expect(result[0]?.content).toBe('{"private":true}')
	})

	it('leaves a non-matching override unapplied', () => {
		const artifacts: readonly Artifact[] = [
			{ path: 'README.md', group: 'docs', origin: 'template', content: '# old' },
		]
		const result = applyOverrides(artifacts, [override('OTHER.md', '# new')])
		expect(result[0]?.content).toBe('# old')
	})
})

describe('direct-helper / blueprintToPlan cross-consistency', () => {
	describe.each(SOURCE_VARIANTS)('$label', ({ src }) => {
		it('vite.config.ts content matches the blueprintToPlan-emitted artifact byte for byte', () => {
			const spec: Blueprint = blueprint('router', { src })
			const plan = blueprintToPlan(spec, ['configs'])
			const emitted = plan.artifacts.find((artifact) => artifact.path === 'vite.config.ts')
			expect(emitted?.content).toBe(rootViteConfig(src))
		})

		it('guide-parity setup and suite match their direct artifacts byte for byte', () => {
			const spec: Blueprint = blueprint('router', { src })
			const plan = blueprintToPlan(spec, ['tests'])
			const emittedSuite = plan.artifacts.find(
				(artifact) => artifact.path === 'tests/guides/src/parity.test.ts',
			)
			const emittedSetup = plan.artifacts.find(
				(artifact) => artifact.path === 'tests/setupGuides.ts',
			)
			const directArtifacts = testArtifacts(spec, pascalCase(spec.name))
			const directSuite = directArtifacts.find(
				(artifact) => artifact.path === 'tests/guides/src/parity.test.ts',
			)
			const directSetup = directArtifacts.find(
				(artifact) => artifact.path === 'tests/setupGuides.ts',
			)
			expect(emittedSuite?.content).toBe(directSuite?.content)
			expect(emittedSetup?.content).toBe(directSetup?.content)
			expect(emittedSetup?.content).toContain(paritySpecifiers(spec))
		})

		it('package.json content matches the direct packageManifest output byte for byte', () => {
			const spec: Blueprint = blueprint('router', { src })
			const plan = blueprintToPlan(spec, ['manifest'])
			const emitted = plan.artifacts.find((artifact) => artifact.path === 'package.json')
			expect(emitted?.content).toBe(packageManifest(spec))
		})
	})
})

describe('consumer lockfile fixture guard', () => {
	it('keeps tests/fixtures/consumer-package-lock.json devDependencies in sync with the emitted mixed-workspace manifest', () => {
		const fixturePath = join(WORKSPACE_ROOT, 'tests', 'fixtures', 'consumer-package-lock.json')
		const lock = readRecord(parseJSON(readFileSync(fixturePath, 'utf8')))
		const root = readRecord(readRecord(lock.packages)[''])
		const fixtureDevDependencies = readRecord(root.devDependencies)

		const spec: Blueprint = blueprint('consumer-proof', {
			src: ['core', 'browser', 'server'],
			app: ['core', 'browser', 'server'],
		})
		const manifest = readManifest(packageManifest(spec))
		const emittedDevDependencies = readRecord(manifest.devDependencies)
		const { '@orkestrel/scaffold': _scaffold, ...expectedDevDependencies } = emittedDevDependencies

		if (JSON.stringify(fixtureDevDependencies) !== JSON.stringify(expectedDevDependencies)) {
			throw new Error(
				`${fixturePath} devDependencies drifted from the emitted consumer manifest. ` +
					'Regenerate by creating a fresh workspace (scaffold new), removing the ' +
					'@orkestrel/scaffold devDependency, running npm install --package-lock-only, ' +
					'and copying the result over the fixture. This requires registry network access ' +
					'and can never run inside the Codex sandbox.\n' +
					`fixture: ${JSON.stringify(fixtureDevDependencies)}\n` +
					`expected: ${JSON.stringify(expectedDevDependencies)}`,
			)
		}
		expect(fixtureDevDependencies).toEqual(expectedDevDependencies)
	})
})
