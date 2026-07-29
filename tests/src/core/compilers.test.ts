import type { Artifact, Blueprint, Environment, ViteAxes } from '@src/core'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { parseJSON } from '@orkestrel/contract'
import { build as buildVite, loadConfigFromFile } from 'vite'
import { describe, expect, it } from 'vitest'
import {
	applyOverrides,
	applicationArtifacts,
	applicationViteConfig,
	APP_MATRIX,
	appTsconfig,
	appViteConfig,
	BIN_CONFIGS,
	binTsconfig,
	binViteConfig,
	binViteProject,
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
	guidesViteProject,
	hostGroup,
	integrationViteProject,
	override,
	packageManifest,
	pascalCase,
	paritySpecifiers,
	policyViteProject,
	rootTsconfig,
	rootViteConfig,
	renderViteTest,
	serializeTypeScriptString,
	serviceViteProject,
	singleSrcViteConfig,
	sourceArtifacts,
	srcTsconfig,
	srcVariant,
	srcViteConfig,
	testArtifacts,
	TYPESCRIPT_EXTENSIONS,
	viteHeader,
	viteMachinery,
	viteProjectDefinitions,
	viteProjectRegistrations,
} from '@src/core'
import {
	APPLICATION_VARIANTS,
	readManifest,
	readRecord,
	SOURCE_VARIANTS,
	WORKSPACE_VARIANTS,
} from '../../setup.js'
import { buildWorkspaceTempDirectory, WORKSPACE_ROOT } from '../../setupServer.js'

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

	it('installs Chromium for the bin-owned generated browser consumer proof', () => {
		const workflow = ciWorkflow(
			blueprint('scaffold', {
				src: ['core', 'server'],
				bin: true,
				integration: true,
			}),
		)

		expect(workflow).toContain('playwright install --with-deps chromium')
	})

	it('selects integration independently from the executable axis', () => {
		const bin = ciWorkflow(
			blueprint('scaffold', { src: ['core', 'server'], bin: true, integration: false }),
		)
		const integration = ciWorkflow(
			blueprint('router', { src: ['core', 'server'], bin: false, integration: true }),
		)

		expect(bin).not.toContain('npm run test:integration')
		expect(integration).toContain('npm run test:integration')
	})

	it('provisions the service immediately before running its isolated project', () => {
		const workflow = ciWorkflow(blueprint('router', { service: true }))
		const provision = workflow.indexOf('run: bash scripts/service.sh')
		const test = workflow.indexOf('run: npm run test:service')

		expect(provision).toBeGreaterThan(-1)
		expect(test).toBeGreaterThan(provision)
		expect(workflow).toContain('run: npm test\n\n      - name: Provision live service')
		expect(workflow).toContain(
			'run: bash scripts/service.sh\n\n      - name: Run live service tests',
		)
		expect(ciWorkflow(blueprint('router'))).not.toContain('scripts/service.sh')
	})

	it('keeps the scaffold workflow byte-identical for its existing axis shape', () => {
		const workflow = ciWorkflow(
			blueprint('scaffold', {
				src: ['core', 'server'],
				bin: true,
				integration: true,
				service: false,
			}),
		)

		expect(createHash('sha256').update(workflow).digest('hex')).toBe(
			'6ed745f2c145cd7e5b47e2a1144d8a8bdd198576aef57e734c8997b6dc6d8f83',
		)
		expect(workflow).toBe(readFileSync(join(WORKSPACE_ROOT, '.github/workflows/ci.yml'), 'utf8'))
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

	it('classes the vendored guide index and the scaffold bin self-guide as guides', () => {
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
		expect(vite?.content).toContain("{ project: appBrowser, browser: 'app:browser' }")
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
		const deps = devDependenciesFor(blueprint('router'))
		expect(deps.typescript).toBe('^6.0.3')
		expect(deps['@vitest/browser-playwright']).toBeUndefined()
	})

	it('merges extras on top, extras winning on collision', () => {
		const deps = devDependenciesFor(
			blueprint('router', {
				extras: [dependency('typescript', '^9.9.9'), dependency('foo', '^1.0.0')],
			}),
		)
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

	it('a non-bin (child) blueprint carries no bin/build:host tax and keeps @orkestrel/scaffold as a devDependency', () => {
		const spec = blueprint('router', { src: ['core', 'server'] })
		const manifest = readManifest(packageManifest(spec))
		expect(manifest.bin).toBeUndefined()
		const scripts = readRecord(manifest.scripts)
		expect(scripts['build:host']).toBeUndefined()
		expect(scripts.scaffold).toBe('scaffold')
		const dev = readRecord(manifest.devDependencies)
		expect(dev['@orkestrel/scaffold']).toBeDefined()
	})

	it('a bin blueprint carries the bin/build:host self-hosting tax and omits its own devDependency', () => {
		const spec = blueprint('scaffold', {
			src: ['core', 'server'],
			bin: true,
			integration: true,
		})
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
		expect(scripts['test:equivalence']).toBe(
			"node -e \"const c=require('node:child_process'),n=process.platform==='win32'?'npm.cmd':'npm',r=c.spawnSync(n,['run','test:integration'],{stdio:'inherit',env:{...process.env,SCAFFOLD_BOUNDARY_EQUIVALENCE:'1'}});process.exit(r.status??1)\"",
		)
		expect(scripts.prepublishOnly).toBe(
			'npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:integration',
		)
		expect(scripts['build:src:bin']).toBe('vite build --config configs/src/vite.bin.config.ts')
		expect(scripts.build).toBe('npm run clean && npm run build:src && npm run build:host')
		const dev = readRecord(manifest.devDependencies)
		expect(dev['@orkestrel/scaffold']).toBeUndefined()
		expect(dev['@vitest/browser-playwright']).toBe('^4.1.10')
		expect(dev.playwright).toBeUndefined()
	})

	it('keys integration scripts and the publish tail only on the integration axis', () => {
		const bin = readManifest(
			packageManifest(
				blueprint('scaffold', {
					src: ['core', 'server'],
					bin: true,
					integration: false,
				}),
			),
		)
		const integrated = readManifest(
			packageManifest(
				blueprint('router', {
					src: ['core', 'server'],
					bin: false,
					integration: true,
				}),
			),
		)
		const binScripts = readRecord(bin.scripts)
		const integratedScripts = readRecord(integrated.scripts)

		expect(binScripts['test:integration']).toBeUndefined()
		expect(binScripts.prepublishOnly).not.toContain('test:integration')
		expect(binScripts['test:equivalence']).toBeUndefined()
		expect(integratedScripts['test:integration']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project integration',
		)
		expect(integratedScripts.prepublishOnly).toContain('npm run test:integration')
		expect(integrated.bin).toBeUndefined()
		expect(integratedScripts.scaffold).toBe('scaffold')
		expect(integratedScripts['check:src:bin']).toBeUndefined()
		expect(integratedScripts['test:src:bin']).toBeUndefined()
		expect(integratedScripts['test:equivalence']).toBeUndefined()
		expect(integratedScripts['build:src:bin']).toBeUndefined()
		expect(integratedScripts['build:host']).toBeUndefined()
		expect(readRecord(integrated.devDependencies)['@vitest/browser-playwright']).toBeUndefined()
	})

	it('emits an isolated service script outside the default and publish chains', () => {
		const manifest = readManifest(packageManifest(blueprint('router', { service: true })))
		const scripts = readRecord(manifest.scripts)

		expect(scripts['test:service']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project service',
		)
		expect(scripts.test).not.toContain('test:service')
		expect(scripts.prepublishOnly).not.toContain('test:service')
		expect(
			readRecord(readManifest(packageManifest(blueprint('router'))).scripts)['test:service'],
		).toBeUndefined()
	})

	it('keeps the scaffold manifest byte-identical for its existing axis shape', () => {
		const manifest = packageManifest(
			blueprint('scaffold', {
				src: ['core', 'server'],
				bin: true,
				integration: true,
				service: false,
			}),
		)

		expect(createHash('sha256').update(manifest).digest('hex')).toBe(
			'aff9c8feee47737d594128dc54b98cf25b9b55f85da9e1d9a305708ffb90f036',
		)
	})

	it('keeps browser-only, mixed, and full project filters stable for config-owned gating', () => {
		const browser = readRecord(
			readManifest(packageManifest(blueprint('indexeddb', { src: ['browser'] }))).scripts,
		)
		const mixed = readRecord(
			readManifest(
				packageManifest(
					blueprint('router', {
						src: ['core', 'browser', 'server'],
					}),
				),
			).scripts,
		)
		const full = readRecord(
			readManifest(
				packageManifest(
					blueprint('application', {
						src: ['core', 'browser', 'server'],
						app: ['core', 'browser', 'server'],
					}),
				),
			).scripts,
		)

		expect(browser['test:src']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser',
		)
		expect(browser['test:src:browser']).toBe(browser['test:src'])
		expect(mixed['test:src']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core --project src:browser --project src:server',
		)
		expect(full['test:app']).toBe(
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project app:core --project app:browser --project app:server',
		)
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

describe('renderViteTest', () => {
	it('renders plain projects or browser registrations from the supplied ownership data', () => {
		const registrations = [{ project: 'srcBrowser', browser: 'src:browser' }, { project: 'policy' }]

		expect(renderViteTest(registrations, false)).toBe(
			'\ttest: {\n\t\tprojects: [srcBrowser, policy],\n\t},',
		)
		expect(renderViteTest(registrations, true)).toBe(
			[
				'\ttest: gateBrowserProjects(',
				'\t\t[',
				"\t\t\t{ project: srcBrowser, browser: 'src:browser' },",
				'\t\t\t{ project: policy },',
				'\t\t],',
				'\t\thasChromium,',
				'\t\tprocess.argv,',
				'\t),',
			].join('\n'),
		)
	})
})

describe('proof Vite projects and registration', () => {
	it('emits each standalone proof project from its single compiler', () => {
		const policy = policyViteProject()
		const guides = guidesViteProject()
		const integration = integrationViteProject()
		const service = serviceViteProject()

		for (const content of [policy, guides, integration, service]) {
			expect(content).toContain('\t\t\tresolve,')
			expect(content).toContain("environment: 'node'")
			expect(content).toContain('browser: { enabled: false }')
		}
		expect(guides).toContain("include: ['tests/guides/**/*.test.ts']")
		expect(guides).toContain("setupFiles: ['./tests/setup.ts']")
		expect(guides).not.toContain('setupServer')
		expect(guides).not.toContain('setupBrowser')
		expect(guides).not.toContain('setupService')
		expect(guides).not.toContain('srcCore(')
		expect(guides).not.toContain('srcBrowser(')
		expect(guides).not.toContain('srcServer(')
		expect(integration).toContain("include: ['tests/integration/**/*.test.ts']")
		expect(integration).toContain("setupFiles: ['./tests/setup.ts']")
		expect(service).toContain("include: ['tests/service/**/*.test.ts']")
		expect(service).toContain("setupFiles: ['./tests/setup.ts', './tests/setupService.ts']")
		for (const content of [integration, service]) {
			expect(content).toContain('testTimeout: 120_000')
			expect(content).toContain('hookTimeout: 120_000')
			expect(content).toContain('fileParallelism: false')
		}
	})

	it('wires the template registry only for the bin and integration intersection', () => {
		const axes: readonly ViteAxes[] = [
			{ bin: false, integration: false, service: false },
			{ bin: false, integration: false, service: true },
			{ bin: false, integration: true, service: false },
			{ bin: false, integration: true, service: true },
			{ bin: true, integration: false, service: false },
			{ bin: true, integration: false, service: true },
			{ bin: true, integration: true, service: false },
			{ bin: true, integration: true, service: true },
		]

		for (const axis of axes) {
			const integration = integrationViteProject(axis)
			const expected = axis.bin === true && axis.integration === true

			expect(integration.includes("globalSetup: ['./tests/setupIntegration.ts']")).toBe(expected)
			expect(
				integration.includes('// Wire the template registry for the generated-consumer proof.'),
			).toBe(expected)
		}
	})

	it('emits the executable project from its single compiler without changing its behavior', () => {
		const bin = binViteProject()

		expect(bin).toContain('\t\t\tresolve,')
		expect(bin).toContain('\t\t\tpublicDir: false,')
		expect(bin).toContain("entry: resolveWorkspacePath('src/bin/scaffold.ts')")
		expect(bin).toContain("outDir: 'dist/bin'")
		expect(bin).toContain('\t\t\t\temptyOutDir: true,')
		expect(bin).toContain('\t\t\t\tsourcemap: true,')
		expect(bin).toContain('\t\t\t\tminify: false,')
		expect(bin).toContain("include: ['tests/src/bin/**/*.test.ts']")
		expect(bin).toContain("setupFiles: ['./tests/setup.ts', './tests/setupServer.ts']")
		expect(bin).toContain("environment: 'node'")
		expect(bin).toContain('browser: { enabled: false }')
		expect(bin).not.toContain("exclude: ['tests/src/core/**/*.test.ts']")
		expect(bin).not.toContain("exclude: ['tests/src/server/**/*.test.ts']")
	})

	it('renders one ordered proof and axis definition block with exact separators', () => {
		expect(viteProjectDefinitions()).toBe(`${policyViteProject()}
${guidesViteProject()}`)
		expect(viteProjectDefinitions({ bin: true, integration: true, service: true })).toBe(
			[
				policyViteProject(),
				guidesViteProject(),
				binViteProject(),
				integrationViteProject({ bin: true, integration: true, service: true }),
				serviceViteProject(),
			].join('\n'),
		)
	})

	it('derives canonical registration order regardless of caller environment order', () => {
		expect(
			viteProjectRegistrations(['server', 'core', 'browser'], ['server', 'browser', 'core'], {
				bin: true,
				integration: true,
				service: true,
			}),
		).toEqual([
			{ project: 'srcCore' },
			{ project: 'srcBrowser', browser: 'src:browser' },
			{ project: 'srcServer' },
			{ project: 'appCore' },
			{ project: 'appBrowser', browser: 'app:browser' },
			{ project: 'appServer' },
			{ project: 'policy' },
			{ project: 'guides' },
			{ project: 'srcBin' },
			{ project: 'integration' },
			{ project: 'service' },
		])
	})

	it('emits root definitions in the same canonical order as their registrations', () => {
		const content = rootViteConfig(['server', 'core', 'browser'], {
			bin: true,
			integration: true,
			service: true,
		})
		const definitions = [
			'export const srcCore =',
			'export const srcBrowser =',
			'export const srcServer =',
			'export const policy =',
			'export const guides =',
			'export const srcBin =',
			'export const integration =',
			'export const service =',
		]
		const positions = definitions.map((definition) => content.indexOf(definition))

		expect(positions).not.toContain(-1)
		expect(positions).toEqual([...positions].sort((left, right) => left - right))
		expect(content).toContain(
			[
				'\t\t\t{ project: srcCore },',
				"\t\t\t{ project: srcBrowser, browser: 'src:browser' },",
				'\t\t\t{ project: srcServer },',
				'\t\t\t{ project: policy },',
				'\t\t\t{ project: guides },',
				'\t\t\t{ project: srcBin },',
				'\t\t\t{ project: integration },',
				'\t\t\t{ project: service },',
			].join('\n'),
		)
	})

	it('emits each demanded proof-project definition exactly once across every root shape', () => {
		const variants: readonly {
			readonly content: string
			readonly bin: boolean
			readonly integration: boolean
			readonly service: boolean
		}[] = [
			{
				content: singleSrcViteConfig('server'),
				bin: false,
				integration: false,
				service: false,
			},
			{
				content: singleSrcViteConfig('browser'),
				bin: false,
				integration: false,
				service: false,
			},
			{
				content: rootViteConfig(['core', 'browser', 'server']),
				bin: false,
				integration: false,
				service: false,
			},
			{
				content: applicationViteConfig(
					['core', 'browser', 'server'],
					['core', 'browser', 'server'],
				),
				bin: false,
				integration: false,
				service: false,
			},
			{
				content: rootViteConfig(['core', 'server'], { bin: true }),
				bin: true,
				integration: false,
				service: false,
			},
			{
				content: rootViteConfig(['server'], { integration: true }),
				bin: false,
				integration: true,
				service: false,
			},
			{
				content: applicationViteConfig([], ['server'], { service: true }),
				bin: false,
				integration: false,
				service: true,
			},
		]

		for (const variant of variants) {
			expect(variant.content.split('export const policy =')).toHaveLength(2)
			expect(variant.content.split('export const guides =')).toHaveLength(2)
			expect(variant.content.split('export const srcBin =')).toHaveLength(variant.bin ? 2 : 1)
			expect(variant.content.split('export const integration =')).toHaveLength(
				variant.integration ? 2 : 1,
			)
			expect(variant.content.split('export const service =')).toHaveLength(variant.service ? 2 : 1)

			const guidesStart = variant.content.indexOf('export const guides =')
			const guidesEnd = variant.content.indexOf('\nexport ', guidesStart + 1)
			const guides = variant.content.slice(
				guidesStart,
				guidesEnd === -1 ? variant.content.length : guidesEnd,
			)
			expect(guides).toContain("setupFiles: ['./tests/setup.ts']")
			expect(guides).not.toContain('setupServer')
			expect(guides).not.toContain('setupBrowser')
			expect(guides).not.toContain('setupService')
			expect(guides).not.toContain('srcCore(')
			expect(guides).not.toContain('srcBrowser(')
			expect(guides).not.toContain('srcServer(')
		}
	})
})

describe('rootViteConfig / singleSrcViteConfig', () => {
	it('normalizes emitted workspace boundary ids without claiming toolchain modules', async () => {
		const directory = await buildWorkspaceTempDirectory()
		try {
			writeFileSync(join(directory.path, 'boundary.config.ts'), rootViteConfig(['core']), 'utf8')
			writeFileSync(
				join(directory.path, 'tsconfig.json'),
				'{"compilerOptions":{"paths":{}}}\n',
				'utf8',
			)
			const configPath = join(directory.path, 'classifier.config.ts')
			writeFileSync(
				configPath,
				[
					"import { posix, resolve as resolvePath } from 'node:path'",
					"import { fileURLToPath, URL } from 'node:url'",
					"import { defineConfig } from 'vite'",
					"import { isWorkspaceBoundaryModule, physicalPath } from './boundary.config.ts'",
					'',
					"const root = fileURLToPath(new URL('.', import.meta.url))",
					"const absolute = resolvePath(root, 'app/browser/index.html')",
					"const served = posix.join('/@fs/', absolute)",
					'if (physicalPath(served) !== physicalPath(absolute)) {',
					"\tthrow new Error('served /@fs/ path did not preserve its physical path')",
					'}',
					'const cases: readonly (readonly [string, boolean])[] = [',
					'\t[absolute, true],',
					"\t['/app/browser/index.html', true],",
					'\t[served, true],',
					'\t[`${absolute}?html-proxy&index=0.js`, true],',
					"\t[resolvePath(root, 'node_modules/vite/client.mjs'), false],",
					"\t[resolvePath(root, 'node_modules/.vite-temp/vite.config.ts.timestamp.mjs'), false],",
					']',
					'',
					'for (const [id, expected] of cases) {',
					'\tif (isWorkspaceBoundaryModule(id) !== expected) {',
					'\t\tthrow new Error(`unexpected boundary classification for ${id}`)',
					'\t}',
					'}',
					'',
					'export default defineConfig({})',
					'',
				].join('\n'),
				'utf8',
			)

			await expect(
				loadConfigFromFile(
					{ command: 'build', mode: 'test' },
					configPath,
					directory.path,
					'silent',
				),
			).resolves.not.toBeNull()
		} finally {
			await directory.cleanup()
		}
	})

	it('emits unique app browser tester boundary helpers', () => {
		const content = applicationViteConfig([], ['browser'])

		expect(content.split('export function fileSystemPath(')).toHaveLength(2)
		expect(content.split('export function isBrowserHtmlEntry(')).toHaveLength(2)
		expect(content).toContain("if (!pathname.startsWith('/@fs/')) return pathname")
	})

	it('executes app browser tester path, containment, and HTML boundaries', async () => {
		const directory = await buildWorkspaceTempDirectory()
		try {
			const content = applicationViteConfig([], ['browser'])
			const asciiStart = content.indexOf('export function hasAsciiUrlControl')
			const asciiEnd = content.indexOf('\n\nconst resolve =', asciiStart)
			const pathStart = content.indexOf('export function fileSystemPath')
			const pathEnd = content.indexOf('\n\nexport function sourceFallback', pathStart)
			const browserStart = content.indexOf('export function containedPath')
			const browserEnd = content.indexOf('\n\nexport function packageNameOf', browserStart)
			const sourceStart = content.indexOf('export function isStylesheetPath')
			const sourceEnd = content.indexOf('\n\nexport function stylesheetAssetError', sourceStart)
			const htmlStart = content.indexOf('export const HTML_SECURITY_POLICY')
			const htmlEnd = content.indexOf(
				'\n\nexport async function environmentAssetSources',
				htmlStart,
			)
			if (
				asciiStart === -1 ||
				asciiEnd === -1 ||
				pathStart === -1 ||
				pathEnd === -1 ||
				browserStart === -1 ||
				browserEnd === -1 ||
				sourceStart === -1 ||
				sourceEnd === -1 ||
				htmlStart === -1 ||
				htmlEnd === -1
			) {
				throw new Error('emitted browser boundary dependency closure was not found')
			}
			const root = join(directory.path, 'app', 'browser')
			const entry = join(root, 'index.html')
			const allowed = join(directory.path, 'tests', 'setup.ts')
			const foreign = join(directory.path, 'node_modules', '@vitest', 'browser', 'tester.html')
			const outside = join(WORKSPACE_ROOT, 'package.json')
			const missing = join(directory.path, 'tests', 'missing.ts')
			mkdirSync(root, { recursive: true })
			mkdirSync(join(directory.path, 'tests'), { recursive: true })
			writeFileSync(entry, '<html>app</html>\n', 'utf8')
			writeFileSync(allowed, 'export {}\n', 'utf8')
			const configPath = join(directory.path, 'boundaries.config.ts')
			writeFileSync(
				configPath,
				[
					"import type { Plugin } from 'vite'",
					"import { isBuiltin } from 'node:module'",
					"import { existsSync, realpathSync } from 'node:fs'",
					"import { dirname, isAbsolute, relative, resolve as resolvePath, sep } from 'node:path'",
					"import { fileURLToPath } from 'node:url'",
					"import { defineConfig } from 'vite'",
					'',
					'const WORKSPACE_ROOT = realpathSync.native(dirname(fileURLToPath(import.meta.url)))',
					"const IMPORT_META_ENV_PREFIX = 'import.meta.env.'",
					'',
					content.slice(asciiStart, asciiEnd),
					'',
					content.slice(pathStart, pathEnd),
					'',
					content.slice(browserStart, browserEnd),
					'',
					content.slice(sourceStart, sourceEnd),
					'',
					content.slice(htmlStart, htmlEnd),
					'',
					`const root = ${serializeTypeScriptString(root)}`,
					`const entry = ${serializeTypeScriptString(entry)}`,
					`const allowed = ${serializeTypeScriptString(allowed)}`,
					`const foreign = ${serializeTypeScriptString(foreign)}`,
					`const outside = ${serializeTypeScriptString(outside)}`,
					`const missing = ${serializeTypeScriptString(missing)}`,
					"const allowedPathname = allowed.startsWith('/')",
					'\t? allowed',
					"\t: '/' + allowed.replaceAll('\\\\', '/')",
					"const outsidePathname = outside.startsWith('/')",
					'\t? outside',
					"\t: '/' + outside.replaceAll('\\\\', '/')",
					"const missingPathname = missing.startsWith('/')",
					'\t? missing',
					"\t: '/' + missing.replaceAll('\\\\', '/')",
					'const expectedMissing = physicalPath(resolvePath(root, missingPathname.slice(1)))',
					'const roots = browserServerRoots()',
					'const expectedRoots = [',
					"\t'app/browser',",
					"\t'app/core',",
					"\t'src/browser',",
					"\t'src/core',",
					"\t'node_modules',",
					"\t'tests/app/browser',",
					"\t'tests/setup.ts',",
					"\t'tests/setupBrowser.ts',",
					'].map((path) => physicalPath(resolvePath(WORKSPACE_ROOT, path)))',
					'',
					"if (browserServerPath('/', root) !== undefined) {",
					"\tthrow new Error('bare browser tester root was not exempt')",
					'}',
					'if (roots.length !== expectedRoots.length) {',
					"\tthrow new Error('browser server roots changed size')",
					'}',
					'if (roots.some((path, index) => path !== expectedRoots[index])) {',
					"\tthrow new Error('browser server roots changed values or order')",
					'}',
					'const allowedPath = browserServerPath(allowedPathname, root)',
					'if (',
					'\tallowedPath === null ||',
					'\tallowedPath === undefined ||',
					'\tphysicalPath(allowedPath) !== physicalPath(allowed)',
					') {',
					"\tthrow new Error('existing absolute browser path was mangled')",
					'}',
					'if (!isBrowserServerPathAllowed(allowedPath, roots)) {',
					"\tthrow new Error('allowed browser path was denied')",
					'}',
					'const outsidePath = browserServerPath(outsidePathname, root)',
					'if (isBrowserServerPathAllowed(outsidePath, roots)) {',
					"\tthrow new Error('outside browser path escaped containment')",
					'}',
					'if (existsSync(missing)) {',
					"\tthrow new Error('nonexistent browser path fixture unexpectedly exists')",
					'}',
					'if (browserServerPath(missingPathname, root) !== expectedMissing) {',
					"\tthrow new Error('nonexistent absolute browser path escaped root-relative denial')",
					'}',
					'',
					"const html = '<html>tester</html>'",
					"const foreignContext = { path: '/', filename: foreign }",
					"const entryContext = { path: '/', filename: entry }",
					'if (isBrowserHtmlEntry(foreign) || !isBrowserHtmlEntry(entry)) {',
					"\tthrow new Error('browser HTML entry classification failed')",
					'}',
					'const prepare = prepareHtml().transformIndexHtml',
					"if (typeof prepare !== 'object' || prepare === null) {",
					"\tthrow new Error('prepare HTML hook shape changed')",
					'}',
					'if ((await prepare.handler(html, foreignContext)) !== undefined) {',
					"\tthrow new Error('prepare HTML hook transformed foreign HTML')",
					'}',
					'let prepareRejected = false',
					'try {',
					'\tawait prepare.handler(html, entryContext)',
					'} catch {',
					'\tprepareRejected = true',
					'}',
					'if (!prepareRejected) {',
					"\tthrow new Error('prepare HTML hook accepted an invalid app entry')",
					'}',
					'const restore = restoreHtml().transformIndexHtml',
					"if (typeof restore !== 'function') {",
					"\tthrow new Error('restore HTML hook shape changed')",
					'}',
					'if ((await restore(html, foreignContext)) !== undefined) {',
					"\tthrow new Error('restore HTML hook transformed foreign HTML')",
					'}',
					"if ((await restore('vite&#45;ignore', entryContext)) !== 'vite-ignore') {",
					"\tthrow new Error('restore HTML hook did not transform the app entry')",
					'}',
					'const finalize = finalizeHtml().transformIndexHtml',
					"if (typeof finalize !== 'object' || finalize === null) {",
					"\tthrow new Error('finalize HTML hook shape changed')",
					'}',
					'if ((await finalize.handler(html, foreignContext)) !== undefined) {',
					"\tthrow new Error('finalize HTML hook transformed foreign HTML')",
					'}',
					'let finalizeRejected = false',
					'try {',
					'\tawait finalize.handler(html, entryContext)',
					'} catch {',
					'\tfinalizeRejected = true',
					'}',
					'if (!finalizeRejected) {',
					"\tthrow new Error('finalize HTML hook accepted an invalid app entry')",
					'}',
					'',
					'export default defineConfig({})',
					'',
				].join('\n'),
				'utf8',
			)

			await expect(
				loadConfigFromFile(
					{ command: 'build', mode: 'test' },
					configPath,
					directory.path,
					'silent',
				),
			).resolves.not.toBeNull()
		} finally {
			await directory.cleanup()
		}
	})

	it('rejects Vite HTML assets whose root-relative output source crosses environments', async () => {
		const directory = await buildWorkspaceTempDirectory()
		try {
			const browser = join(directory.path, 'app', 'browser')
			const server = join(directory.path, 'app', 'server')
			mkdirSync(browser, { recursive: true })
			mkdirSync(server, { recursive: true })
			writeFileSync(join(server, 'boundary.txt'), 'boundary\n', 'utf8')
			writeFileSync(join(directory.path, 'boundary.config.ts'), rootViteConfig(['core']), 'utf8')
			writeFileSync(
				join(directory.path, 'tsconfig.json'),
				'{"compilerOptions":{"paths":{}}}\n',
				'utf8',
			)
			writeFileSync(
				join(directory.path, 'vite.config.ts'),
				[
					"import { defineConfig } from 'vite'",
					"import { fileURLToPath, URL } from 'node:url'",
					"import { environmentBoundary } from './boundary.config.ts'",
					'',
					'const resolvePath = (path: string): string => fileURLToPath(new URL(path, import.meta.url))',
					'',
					'export default defineConfig({',
					"\troot: resolvePath('app/browser/'),",
					'\tpublicDir: false,',
					"\tplugins: [environmentBoundary('app/browser')],",
					'\tbuild: {',
					'\t\tassetsInlineLimit: 0,',
					'\t\temptyOutDir: true,',
					"\t\toutDir: resolvePath('dist/'),",
					"\t\trolldownOptions: { input: resolvePath('app/browser/index.html') },",
					'\t},',
					'})',
					'',
				].join('\n'),
				'utf8',
			)

			for (const attribute of ['', ' vite&#45;ignore']) {
				writeFileSync(
					join(browser, 'index.html'),
					`<img${attribute} src="../server/boundary.txt">\n`,
					'utf8',
				)
				await expect(
					buildVite({
						configFile: join(directory.path, 'vite.config.ts'),
						logLevel: 'silent',
					}),
				).rejects.toThrow('Browser modules cannot depend on Node or server-only modules')
			}
		} finally {
			await directory.cleanup()
		}
	})

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

		expect(content).toContain('\t)\n\nexport const policy')
		expect(createHash('sha256').update(content).digest('hex')).toBe(
			'85a2c14d1aaaeac5a5cdad69d2b0b0d42ac907ff32a078fa0df7592f9c16f26b',
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
		expect(content).toContain('return maskIgnoredHtml(environmentKeys, html)')
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
		expect(content).toContain("normalizedId.startsWith('\\0')")
		expect(content).toContain("normalizedId.includes('virtual:')")
		expect(content).toContain("segment.toLowerCase() === 'node_modules'")
		expect(content).toContain('if (!isWorkspaceBoundaryModule(id)) return null')
		expect(content).toContain(
			'if (importer === undefined || !isWorkspaceBoundaryModule(importer)) return null',
		)
		expect(content).toContain(
			'isBoundaryExemptModule(original) || isBoundaryExemptModule(physical)',
		)
		expect(content).not.toContain('if (!isWorkspaceBoundaryModule(original)) continue')
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

	it('keeps the indexeddb browser, policy, and guides shape registered through the shared gate', () => {
		const content = rootViteConfig(['browser'])

		expect(content).not.toContain('hasChromium ? [')
		expect(content).toContain(
			[
				'\ttest: gateBrowserProjects(',
				'\t\t[',
				"\t\t\t{ project: srcBrowser, browser: 'src:browser' },",
				'\t\t\t{ project: policy },',
				'\t\t\t{ project: guides },',
				'\t\t],',
			].join('\n'),
		)
		expect(content).toContain("name: { label: registration.browser, color: 'yellow' }")
		expect(content).toContain('include: []')
		expect(content).toContain("environment: 'node'")
		expect(content).toContain('browser: { enabled: false }')
	})

	it('emits one gate owner whose present branch returns every real browser project', () => {
		const browser = rootViteConfig(['browser'])
		const source = rootViteConfig(['core', 'browser', 'server'])
		const appBrowser = applicationViteConfig([], ['browser'])
		const application = applicationViteConfig(
			['core', 'browser', 'server'],
			['core', 'browser', 'server'],
		)

		for (const content of [browser, source, appBrowser, application]) {
			expect(content.split('function gateBrowserProjects(')).toHaveLength(2)
			expect(content.split('console.warn(')).toHaveLength(2)
			expect(content).toContain('projects.push(registration.project())')
			expect(content).toContain('include: [')
			expect(content).toContain('enabled: true')
			expect(content).not.toContain('include: hasChromium ?')
			expect(content).not.toContain('enabled: hasChromium')
		}
		expect(source).toContain("{ project: srcBrowser, browser: 'src:browser' }")
		expect(application).toContain("{ project: srcBrowser, browser: 'src:browser' }")
		expect(application).toContain("{ project: appBrowser, browser: 'app:browser' }")
	})

	it('pre-seeds only Vitest browser test projects with the browser entry chain', () => {
		const browser = rootViteConfig(['browser'])
		const source = rootViteConfig(['core', 'browser', 'server'])
		const appBrowser = applicationViteConfig([], ['browser'])
		const application = applicationViteConfig(
			['core', 'browser', 'server'],
			['core', 'browser', 'server'],
		)
		const sourceSeed = 'include: [...BROWSER_TEST_DEPENDENCIES]'
		const appSeed = "include: ['vue', ...BROWSER_TEST_DEPENDENCIES]"
		const variants = [
			{
				content: browser,
				enabled: [{ project: 'srcBrowser', seed: sourceSeed }],
				disabled: ['policy', 'guides'],
			},
			{
				content: source,
				enabled: [{ project: 'srcBrowser', seed: sourceSeed }],
				disabled: ['srcCore', 'srcServer', 'policy', 'guides'],
			},
			{
				content: appBrowser,
				enabled: [{ project: 'appBrowser', seed: appSeed }],
				disabled: ['policy', 'guides'],
			},
			{
				content: application,
				enabled: [
					{ project: 'srcBrowser', seed: sourceSeed },
					{ project: 'appBrowser', seed: appSeed },
				],
				disabled: ['srcCore', 'srcServer', 'appCore', 'appServer', 'policy', 'guides'],
			},
		]

		for (const { content, enabled, disabled } of variants) {
			for (const specifier of [
				'@vitest/browser/client',
				'vitest/browser',
				'vitest/internal/browser',
				'vitest',
			]) {
				expect(content).toContain(`'${specifier}'`)
			}
			for (const { project, seed } of enabled) {
				const constStart = content.indexOf(`export const ${project}`)
				const functionStart = content.indexOf(`export function ${project}`)
				const start = constStart === -1 ? functionStart : constStart
				expect(start).toBeGreaterThanOrEqual(0)
				const next = content.indexOf('\nexport ', start + 1)
				const block = content.slice(start, next === -1 ? content.length : next)
				expect(block).toContain(seed)
				expect(block).toContain('deps: {')
				expect(block).toContain('optimizer: {')
				expect(block).toContain('client: {')
				expect(block.indexOf(seed)).toBeGreaterThan(block.indexOf('test: {'))
				expect(block).toContain('browser: {')
				expect(block).toContain('enabled: true')
				expect(block).not.toContain('optimizeDeps')
			}
			for (const project of disabled) {
				const start = content.indexOf(`export const ${project}`)
				expect(start).toBeGreaterThanOrEqual(0)
				const next = content.indexOf('\nexport ', start + 1)
				const block = content.slice(start, next === -1 ? content.length : next)
				expect(block).not.toContain('BROWSER_TEST_DEPENDENCIES')
			}
			expect(content).not.toContain('optimizeDeps')
			expect(content).toContain(
				'Prevent the Vitest browser mid-run "optimized dependencies changed, reloading" stall.',
			)
		}
		const guidesStart = browser.indexOf('export const guides')
		const guidesEnd = browser.indexOf('\nexport default', guidesStart)
		const guidesBlock = browser.slice(guidesStart, guidesEnd)
		expect(guidesBlock).toContain('browser: { enabled: false }')
		expect(guidesBlock).not.toContain('BROWSER_TEST_DEPENDENCIES')
		expect(browser).toContain('config?.test?.browser?.enabled === false')
	})

	it('loads both emitted gate branches and exact project-filter forms with real Vitest configuration', async () => {
		const directory = await buildWorkspaceTempDirectory()
		try {
			writeFileSync(join(directory.path, 'emitted.config.ts'), rootViteConfig(['browser']), 'utf8')
			writeFileSync(
				join(directory.path, 'tsconfig.json'),
				'{"compilerOptions":{"paths":{}}}\n',
				'utf8',
			)
			const filters = [
				{ label: 'space', argv: "['--project', 'src:browser']", pass: true },
				{ label: 'equals', argv: "['--project=src:browser']", pass: true },
				{ label: 'empty', argv: "['--project=']", pass: undefined },
				{
					label: 'missing',
					argv: "['--project=src:browser', '--project']",
					pass: undefined,
				},
			]
			for (const chromium of [false, true]) {
				for (const filter of filters) {
					const configPath = join(directory.path, `gate-${chromium}-${filter.label}.config.ts`)
					writeFileSync(
						configPath,
						[
							"import { defineConfig } from 'vitest/config'",
							"import { gateBrowserProjects } from './emitted.config.ts'",
							'',
							'export default defineConfig({',
							'\ttest: gateBrowserProjects(',
							'\t\t[',
							'\t\t\t{',
							"\t\t\t\tbrowser: 'src:browser',",
							'\t\t\t\tproject: () => ({',
							'\t\t\t\t\ttest: {',
							"\t\t\t\t\t\tname: { label: 'actual', color: 'blue' },",
							"\t\t\t\t\t\tinclude: ['tests/actual.test.ts'],",
							'\t\t\t\t\t},',
							'\t\t\t\t}),',
							'\t\t\t},',
							'\t\t],',
							`\t\t${chromium},`,
							`\t\t${filter.argv},`,
							'\t),',
							'})',
							'',
						].join('\n'),
						'utf8',
					)
					const loaded = await loadConfigFromFile(
						{ command: 'serve', mode: 'test' },
						configPath,
						directory.path,
						'silent',
					)
					const test = readRecord(loaded?.config.test)
					if (!Array.isArray(test.projects)) throw new Error('expected emitted test projects')
					const project = readRecord(test.projects[0])
					const projectTest = readRecord(project.test)
					const name = readRecord(projectTest.name)

					expect(name.label).toBe(chromium ? 'actual' : 'src:browser')
					expect(projectTest.include).toEqual(chromium ? ['tests/actual.test.ts'] : [])
					expect(test.passWithNoTests).toBe(chromium ? undefined : filter.pass)
				}
			}
		} finally {
			await directory.cleanup()
		}
	})

	it('keeps non-browser projects directly discoverable without a Chromium guard', () => {
		const content = applicationViteConfig(['core', 'server'], ['core', 'server'])

		expect(content).not.toContain('hasChromium')
		expect(content).not.toContain('console.warn(')
		expect(content).toContain('projects: [srcCore, srcServer, appCore, appServer, policy, guides]')
	})

	it('registers bin, integration, and service independently after the proof projects', () => {
		const child = rootViteConfig(['core', 'server'])
		expect(child).not.toContain('srcBin')
		expect(child).not.toContain("include: ['tests/integration/**/*.test.ts']")
		expect(child).not.toContain("include: ['tests/service/**/*.test.ts']")

		const bin = rootViteConfig(['core', 'server'], { bin: true })
		expect(bin).toContain("entry: resolveWorkspacePath('src/bin/scaffold.ts')")
		expect(bin).toContain("outDir: 'dist/bin'")
		expect(bin).toContain('projects: [srcCore, srcServer, policy, guides, srcBin]')
		expect(bin).not.toContain("include: ['tests/integration/**/*.test.ts']")

		const integration = rootViteConfig(['server'], { integration: true })
		expect(integration).not.toContain('srcBin')
		expect(integration).toContain('projects: [srcServer, policy, guides, integration]')
		expect(integration).toContain("include: ['tests/integration/**/*.test.ts']")

		const service = applicationViteConfig([], ['server'], { service: true })
		expect(service).toContain('projects: [appServer, policy, guides, service]')
		expect(service).toContain("include: ['tests/service/**/*.test.ts']")
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

describe('binTsconfig / binViteConfig', () => {
	it('reproduces the checked-in executable configurations byte for byte', () => {
		expect(binTsconfig()).toBe(
			readFileSync(join(WORKSPACE_ROOT, 'configs/src/tsconfig.bin.json'), 'utf8'),
		)
		expect(binViteConfig()).toBe(
			readFileSync(join(WORKSPACE_ROOT, 'configs/src/vite.bin.config.ts'), 'utf8'),
		)
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

	it('threads the independent proof-project axes into the emitted root configuration', () => {
		const bin = configArtifacts(
			blueprint('router', { src: ['server'], bin: true, integration: false }),
		).find((artifact) => artifact.path === 'vite.config.ts')?.content
		const integration = configArtifacts(
			blueprint('router', { src: ['server'], bin: false, integration: true }),
		).find((artifact) => artifact.path === 'vite.config.ts')?.content
		const service = configArtifacts(blueprint('router', { src: ['server'], service: true })).find(
			(artifact) => artifact.path === 'vite.config.ts',
		)?.content

		expect(bin).toContain('projects: [srcServer, policy, guides, srcBin]')
		expect(bin).not.toContain('export const integration =')
		expect(integration).toContain('projects: [srcServer, policy, guides, integration]')
		expect(integration).not.toContain('export const srcBin =')
		expect(service).toContain('projects: [srcServer, policy, guides, service]')
	})

	it('emits the executable configuration pair only for the bin axis', () => {
		const bin = configArtifacts(blueprint('scaffold', { src: ['core', 'server'], bin: true }))
		const child = configArtifacts(blueprint('router', { src: ['core', 'server'] }))

		for (const path of BIN_CONFIGS) expect(bin.map((artifact) => artifact.path)).toContain(path)
		for (const path of BIN_CONFIGS) {
			expect(child.map((artifact) => artifact.path)).not.toContain(path)
		}
	})

	it('closes script and config references over the same manifest and plan for every axis combination', () => {
		const axes: readonly {
			readonly bin: boolean
			readonly integration: boolean
			readonly service: boolean
		}[] = [
			{ bin: false, integration: false, service: false },
			{ bin: false, integration: false, service: true },
			{ bin: false, integration: true, service: false },
			{ bin: false, integration: true, service: true },
			{ bin: true, integration: false, service: false },
			{ bin: true, integration: false, service: true },
			{ bin: true, integration: true, service: false },
			{ bin: true, integration: true, service: true },
		]

		for (const axis of axes) {
			const plan = blueprintToPlan(
				blueprint('router', {
					src: ['core', 'server'],
					bin: axis.bin,
					integration: axis.integration,
					service: axis.service,
				}),
				['manifest', 'configs'],
			)
			const manifest = plan.artifacts.find((artifact) => artifact.path === 'package.json')
			expect(manifest).toBeDefined()
			if (manifest === undefined) throw new Error('expected package.json artifact')
			const scripts = readRecord(readManifest(manifest.content).scripts)
			const referencedConfigs = new Set<string>()
			const referencedScripts = new Set<string>()
			for (const value of Object.values(scripts)) {
				if (typeof value !== 'string') continue
				for (const match of value.match(/configs\/[^\s'"]+/g) ?? []) {
					referencedConfigs.add(match)
				}
				for (const match of value.matchAll(/npm run ([^\s&'"]+)/g)) {
					const name = match[1]
					if (name !== undefined) referencedScripts.add(name)
				}
			}
			const planned = new Set(plan.artifacts.map((artifact) => artifact.path))

			expect(referencedScripts.size).toBeGreaterThan(0)
			for (const path of referencedConfigs) expect(planned.has(path)).toBe(true)
			for (const name of referencedScripts) expect(Object.hasOwn(scripts, name)).toBe(true)
			for (const path of BIN_CONFIGS) expect(referencedConfigs.has(path)).toBe(axis.bin)
		}
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
