import type { Artifact, Blueprint, Dependency, Group, Member, Plan, Surface } from './types.js'
import { fillTemplate } from '@orkestrel/template'
import { GROUPS, HOST_PATHS, SCAFFOLD_RANGE, SURFACE_MATRIX } from './constants.js'
import { alignTable, blueprintToMembers, pascalCase, pinPlan } from './helpers.js'
import { TEMPLATES } from './templates.js'

/**
 * The full pure compilation: draft a blueprint's artifacts — the manifest and
 * exports combination rules over the per-surface `SURFACE_MATRIX` rows, plus
 * `HOST_PATHS` and `overrides` — then pin.
 *
 * @remarks
 * Every drafting leaf below is function-local: the doc↔source Surface
 * bijection (AGENTS §22) documents this module as exactly one export, so the
 * manifest/exports combination logic, the config/manifest renderers, and the
 * template-fill glue all nest inside this function rather than sit at module
 * scope undocumented.
 *
 * @param blueprint - The `Blueprint` to compile.
 * @param groups - An optional `Group[]` selection (default: all groups).
 * @returns The drafted, pinned `Plan`.
 *
 * @example
 * ```ts
 * const plan = blueprintToPlan(blueprint('router', { surfaces: ['core'] }))
 * plan.artifacts.length // every file the package needs
 * ```
 */
export function blueprintToPlan(blueprint: Blueprint, groups?: readonly Group[]): Plan {
	// The seven runtime `@orkestrel/*` guide mirrors this repo itself vendors
	// byte-identically (this guide's Contract invariant 7) —
	// the only dependency names a scaffolded package's `guides/src/<dep>.md`
	// mirror can be a `host`-origin byte copy for.
	const vendoredGuides: readonly string[] = [
		'@orkestrel/contract',
		'@orkestrel/emitter',
		'@orkestrel/markdown',
		'@orkestrel/template',
		'@orkestrel/terminal',
		'@orkestrel/console',
		'@orkestrel/guide',
	]

	// Resolve the `Group` a byte-copied `HOST_PATHS` entry belongs to.
	function hostGroup(path: string): Group {
		if (path === 'AGENTS.md' || path === 'CLAUDE.md' || path === 'LICENSE') {
			return 'docs'
		}
		if (
			path === '.claude' ||
			path === 'scripts/deps.sh' ||
			path === 'scripts/cursor.sh' ||
			path === 'scripts/ollama.sh' ||
			path === '.github/workflows/ci.yml'
		) {
			return 'orchestration'
		}
		if (path === 'guides/src/guide.md') return 'guides'
		return 'configs'
	}

	// Fill one `TEMPLATES` entry into a `template`-origin `Artifact`, optionally
	// tagged with the owning `Surface` (source/tests artifacts that live under a
	// declared surface's tree).
	function fillArtifact(
		path: string,
		group: Group,
		id: string,
		values: Readonly<Record<string, unknown>>,
		surface?: Surface,
	): Artifact {
		const definition = TEMPLATES[id]
		if (!definition) throw new Error(`Unknown template id: ${id}`)
		const content = fillTemplate(definition.content, values, {
			missing: 'error',
			placeholders: definition.placeholders,
		})
		return surface === undefined
			? { path, group, origin: 'template', content }
			: { path, group, origin: 'template', surface, content }
	}

	// Compute the `package.json` artifact's `content`, applying the manifest
	// and exports combination rules over a blueprint's surfaces — grounded against the
	// live @orkestrel/middleware (core+server) and @orkestrel/router
	// (core+browser+server) exemplars.
	function packageManifest(spec: Blueprint): string {
		// Classify a blueprint's surfaces into the manifest/exports variant class.
		function surfaceVariant(surfaces: readonly Surface[]): Surface | 'multi' {
			if (surfaces.length > 1) return 'multi'
			const [only] = surfaces
			return only ?? 'core'
		}

		// Build the `main` / `module` / top-level `types` entry fields.
		function entryFields(surfaces: readonly Surface[]): {
			readonly main: string
			readonly module: string
			readonly types?: string
		} {
			const variant = surfaceVariant(surfaces)
			if (variant === 'multi') {
				return { main: './dist/src/core/index.cjs', module: './dist/src/core/index.js' }
			}
			const root: Surface = variant
			if (root === 'browser') {
				return {
					main: './dist/src/browser/index.js',
					module: './dist/src/browser/index.js',
					types: './dist/src/browser/index.d.ts',
				}
			}
			if (root === 'server') {
				return {
					main: './dist/src/server/index.cjs',
					module: './dist/src/server/index.js',
					types: './dist/src/server/index.d.ts',
				}
			}
			return {
				main: './dist/src/core/index.cjs',
				module: './dist/src/core/index.js',
				types: './dist/src/core/index.d.ts',
			}
		}

		// One dual-format (`import` + `require`) `exports` condition block.
		function dualCondition(path: string): Readonly<Record<string, unknown>> {
			return {
				import: { types: `${path}.d.ts`, default: `${path}.js` },
				require: { types: `${path}.d.cts`, default: `${path}.cjs` },
			}
		}

		// Build the `package.json` `exports` map.
		function exportsMap(surfaces: readonly Surface[]): Readonly<Record<string, unknown>> {
			const variant = surfaceVariant(surfaces)
			if (variant === 'browser') {
				return {
					'.': {
						types: './dist/src/browser/index.d.ts',
						import: './dist/src/browser/index.js',
						default: './dist/src/browser/index.js',
					},
					'./package.json': './package.json',
				}
			}
			if (variant === 'server') {
				return { '.': dualCondition('./dist/src/server/index'), './package.json': './package.json' }
			}
			if (variant === 'core') {
				return { '.': dualCondition('./dist/src/core/index'), './package.json': './package.json' }
			}
			const map: Record<string, unknown> = { '.': dualCondition('./dist/src/core/index') }
			for (const surface of surfaces) {
				if (surface === 'core') continue
				const row = SURFACE_MATRIX[surface]
				if (surface === 'browser') {
					map[row.path] = {
						import: {
							types: './dist/src/browser/index.d.ts',
							default: './dist/src/browser/index.js',
						},
					}
					continue
				}
				map[row.path] = dualCondition(`./dist/src/${surface}/index`)
			}
			map['./package.json'] = './package.json'
			return map
		}

		// A code-unit (not locale-sensitive) comparator — matches the `keywords`
		// sort below and keeps ordering stable across locales/environments.
		function compareCodeUnit(a: string, b: string): number {
			return a < b ? -1 : a > b ? 1 : 0
		}

		// The devDependency baseline — every repo in the line carries the same
		// set (`@vitest/browser-playwright` included regardless of a browser
		// surface: both @orkestrel/middleware, core+server, and @orkestrel/router,
		// core+browser+server, ship it — grounded, not conditional). A package's
		// `extras` (code-unit sorted) merge in on top, the extras' declared range
		// winning on a name collision with the baseline.
		function devDependencies(extras: readonly Dependency[]): Readonly<Record<string, string>> {
			const baseline: Record<string, string> = {
				'@microsoft/api-extractor': '^7.58.11',
				'@orkestrel/guide': '^0.0.5',
				'@orkestrel/scaffold': SCAFFOLD_RANGE,
				'@types/node': '^26.1.1',
				'@vitest/browser-playwright': '^4.1.10',
				oxfmt: '^0.59.0',
				oxlint: '^1.74.0',
				typescript: '^6.0.3',
				vite: '^8.1.5',
				'vite-plugin-dts': '^5.0.3',
				vitest: '^4.1.10',
			}
			for (const extra of [...extras].sort((a, b) => compareCodeUnit(a.name, b.name))) {
				baseline[extra.name] = extra.range
			}
			return baseline
		}

		const entry = entryFields(spec.surfaces)
		const dependencies: Record<string, string> = {}
		for (const dep of [...spec.dependencies].sort((a, b) => compareCodeUnit(a.name, b.name))) {
			dependencies[dep.name] = dep.range
		}
		const peerDependencies: Record<string, string> = {}
		for (const peer of [...spec.peers].sort((a, b) => compareCodeUnit(a.name, b.name))) {
			peerDependencies[peer.name] = peer.range
		}
		const peerDependenciesMeta: Record<string, { readonly optional: true }> = {}
		for (const peer of spec.peers) {
			if (peer.optional === true) peerDependenciesMeta[peer.name] = { optional: true }
		}

		// Scripts are built by sequential assignment so aggregate + per-surface
		// keys interleave in the exact live-package insertion order (`check:src`
		// immediately followed by each `check:src:<surface>`, and so on).
		const scripts: Record<string, string> = {
			clean:
				"node -e \"try{require('node:fs').rmSync('dist',{recursive:true,force:true})}catch{}\"",
			copy: "node -e \"const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)\"",
			'tmp:txt':
				"node -e \"const fs=require('node:fs'),p=require('node:path');function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=p.join(d,e.name);if(e.isDirectory()){walk(f)}else if(!e.name.endsWith('.md')&&!e.name.endsWith('.txt')){const t=f+'.txt';if(!fs.existsSync(t)){fs.renameSync(f,t)}else{console.warn('Skipping '+f+' — target exists: '+t)}}}}try{walk('tmp')}catch(e){if(e.code!=='ENOENT')throw e}\"",
			scaffold: 'scaffold',
			lint: 'oxlint --config .oxlintrc.json --fix .',
			check: 'tsc --noEmit --project tsconfig.json && npm run check:src',
			'check:src': spec.surfaces.map((surface) => `npm run check:src:${surface}`).join(' && '),
		}
		for (const surface of spec.surfaces) {
			scripts[`check:src:${surface}`] = `tsc --noEmit -p configs/src/tsconfig.${surface}.json`
		}
		scripts.format = 'oxfmt --config .oxfmtrc.json --write .'
		scripts['format:check'] = 'oxfmt --config .oxfmtrc.json --check .'
		scripts['lint:check'] = 'oxlint --config .oxlintrc.json .'
		scripts.test = 'npm run test:src && npm run test:guides'
		scripts['test:src'] =
			'vitest run --config vite.config.ts --no-cache --reporter=dot ' +
			spec.surfaces.map((surface) => `--project src:${surface}`).join(' ')
		for (const surface of spec.surfaces) {
			scripts[`test:src:${surface}`] =
				`vitest run --config vite.config.ts --no-cache --reporter=dot --project src:${surface}`
		}
		scripts['test:guides'] = 'vitest run --config vite.config.ts --reporter=dot --project guides'
		scripts.build = 'npm run clean && npm run build:src'
		scripts['build:src'] = spec.surfaces
			.map((surface) => `npm run build:src:${surface}`)
			.join(' && ')
		for (const surface of spec.surfaces) {
			scripts[`build:src:${surface}`] =
				surface === 'browser'
					? `vite build --config configs/src/vite.${surface}.config.ts`
					: `vite build --config configs/src/vite.${surface}.config.ts && npm run copy dist/src/${surface}/index.d.ts dist/src/${surface}/index.d.cts`
		}
		scripts.prepublishOnly =
			'npm run format:check && npm run lint:check && npm run check && npm run build && npm test'

		const manifest: Record<string, unknown> = {
			name: `@orkestrel/${spec.name}`,
			version: spec.version,
			description: spec.description ?? 'TODO: one-line description. Part of the @orkestrel line.',
			keywords: [...spec.keywords].sort(),
			homepage: `https://github.com/orkestrel/${spec.name}#readme`,
			bugs: `https://github.com/orkestrel/${spec.name}/issues`,
			license: 'MIT',
			repository: { type: 'git', url: `git+https://github.com/orkestrel/${spec.name}.git` },
			files: ['dist', 'README.md'],
			type: 'module',
			sideEffects: false,
			main: entry.main,
			module: entry.module,
			...(entry.types ? { types: entry.types } : {}),
			exports: exportsMap(spec.surfaces),
			publishConfig: { access: 'public' },
			scripts,
			dependencies,
			devDependencies: devDependencies(spec.extras),
			...(Object.keys(peerDependencies).length > 0 ? { peerDependencies } : {}),
			...(Object.keys(peerDependenciesMeta).length > 0 ? { peerDependenciesMeta } : {}),
			engines: { node: spec.engines },
		}
		return `${JSON.stringify(manifest, undefined, '\t')}\n`
	}

	// Draft the `configs` group's `computed` artifacts — the root
	// `tsconfig.json` / `vite.config.ts` plus each declared surface's
	// `configs/src/*` pair, grounded against the live middleware (core+server)
	// and router (core+browser+server) exemplars.
	function configArtifacts(spec: Blueprint): readonly Artifact[] {
		// The root `tsconfig.json` — one `@src/<surface>` path alias per
		// declared surface, in declared order.
		function rootTsconfig(surfaces: readonly Surface[]): string {
			const paths: Record<string, readonly string[]> = {}
			for (const surface of surfaces) paths[`@src/${surface}`] = [`./src/${surface}/index.ts`]
			const config = {
				compilerOptions: {
					target: 'ESNext',
					module: 'ESNext',
					moduleResolution: 'bundler',
					lib: ['ESNext', 'DOM', 'DOM.Iterable'],
					types: ['node', 'vite/client', 'vitest/globals'],
					moduleDetection: 'force',
					resolveJsonModule: true,
					strict: true,
					noImplicitOverride: true,
					noFallthroughCasesInSwitch: true,
					forceConsistentCasingInFileNames: true,
					skipLibCheck: true,
					noEmit: true,
					paths,
				},
				exclude: ['node_modules', 'dist', 'tmp'],
			}
			return `${JSON.stringify(config, undefined, '\t')}\n`
		}

		// The root `vite.config.ts` — three grounded shapes, chosen by a
		// blueprint's `surfaces`:
		//   1. `core`-only — `srcCore` + `guides`, no Playwright at all (the live
		//      timeout exemplar: no browser project exists anywhere in the file).
		//   2. Multi-surface (2+ surfaces, always including `core` per the live
		//      middleware/router exemplars) — `srcCore` is the shared base;
		//      `srcBrowser` / `srcServer` extend it and externalize `@src/core` to
		//      the sibling build. Playwright ships UNCONDITIONALLY (middleware
		//      carries it with no browser surface — grounded, not conditional).
		//   3. A single non-`core` surface (`browser`-only / `server`-only) — the
		//      surface factory itself IS the base (no `srcCore` to extend, so no
		//      dead `@src/core` externalize/remap either — there is no sibling
		//      core build), per the live sqlite (server-only) / indexeddb
		//      (browser-only) exemplars. Playwright ships only when the sole
		//      surface is `browser` (it must run its own tests in a real browser).
		function rootViteConfig(surfaces: readonly Surface[]): string {
			// Rendered blocks below are generated FILE TEXT, so every embedded
			// declaration keyword is interpolated rather than typed literally at
			// column 0 — the doc↔source parity scan (AGENTS §22) reads this file's
			// own source lines, and a flush-left `export const foo` inside a
			// template string is indistinguishable from a real module-scope export
			// to that line-based scan; interpolating the keyword keeps the emitted
			// bytes identical while keeping this file's own declaration surface
			// exactly the one export it documents.
			const EXPORT_KEYWORD = 'export'
			const CONST_KEYWORD = 'const'
			const hasCore = surfaces.includes('core')
			const nonCore = surfaces.filter((surface) => surface !== 'core')
			const needsPlaywright = surfaces.length > 1 || surfaces.includes('browser')

			// The Playwright-import lines + `createBrowserProvider` — present only
			// when `needsPlaywright`.
			const playwrightImports = needsPlaywright
				? `import { globSync } from 'node:fs'
import { playwright } from '@vitest/browser-playwright'
`
				: ''
			const browserProviderFn = needsPlaywright
				? `
${EXPORT_KEYWORD} function createBrowserProvider() {
	const { PLAYWRIGHT_EXECUTABLE_PATH, PLAYWRIGHT_WS_ENDPOINT, PLAYWRIGHT_CHANNEL } = process.env
	if (PLAYWRIGHT_EXECUTABLE_PATH)
		return playwright({ launchOptions: { executablePath: PLAYWRIGHT_EXECUTABLE_PATH } })
	if (PLAYWRIGHT_WS_ENDPOINT)
		return playwright({ connectOptions: { wsEndpoint: PLAYWRIGHT_WS_ENDPOINT } })
	if (PLAYWRIGHT_CHANNEL) return playwright({ launchOptions: { channel: PLAYWRIGHT_CHANNEL } })
	if (process.platform === 'linux') {
		for (const pattern of [
			'/opt/pw-browsers/chromium',
			'/opt/pw-browsers/chromium-*/chrome-linux64/chrome',
			'/opt/pw-browsers/chromium-*/chrome-linux/chrome',
		]) {
			const [executablePath] = globSync(pattern).sort().reverse()
			if (executablePath) return playwright({ launchOptions: { executablePath } })
		}
	}
	const channel = process.platform === 'win32' ? 'msedge' : 'chrome'
	return playwright({ launchOptions: { channel } })
}
`
				: ''
			const header = `import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vitest/config'
import tsconfig from './tsconfig.json' with { type: 'json' }
import { fileURLToPath, URL } from 'node:url'
${playwrightImports}
${EXPORT_KEYWORD} function resolveWorkspacePath(relativePath: string): string {
	return fileURLToPath(new URL(relativePath, import.meta.url))
}
${browserProviderFn}
${CONST_KEYWORD} resolve = {
	alias: Object.entries(tsconfig.compilerOptions.paths).reduce(
		(a, [k, v]) => Object.assign(a, { [k]: resolveWorkspacePath(v[0]) }),
		{},
	),
}
`

			// Shape 3 — the single non-`core` surface's factory IS the base.
			function singleSurfaceConfig(surface: 'browser' | 'server'): string {
				if (surface === 'browser') {
					return `${header}
${EXPORT_KEYWORD} const srcBrowser = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			build: {
				emptyOutDir: true,
				sourcemap: true,
				minify: false,
				lib: {
					entry: resolveWorkspacePath('src/browser/index.ts'),
					formats: ['es'],
					fileName: () => 'index.js',
				},
				outDir: 'dist/src/browser',
				rolldownOptions: {
					external: (id: string) => id.startsWith('@orkestrel/'),
				},
			},
			test: {
				name: { label: 'src:browser', color: 'yellow' },
				include: ['tests/src/browser/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
				browser: {
					enabled: true,
					provider: createBrowserProvider(),
					instances: [{ browser: 'chromium', headless: true }],
				},
				fileParallelism: false,
			},
		},
		config ?? {},
	)

${EXPORT_KEYWORD} const guides = (config?: UserConfig): UserConfig =>
	srcBrowser(
		mergeConfig(
			{
				test: {
					name: { label: 'guides', color: 'green' },
					include: ['tests/guides/**/*.test.ts'],
					exclude: ['tests/src/**/*.test.ts', 'tests/setup.test.ts'],
					environment: 'node',
					browser: { enabled: false },
				},
			},
			config ?? {},
		),
	)

export default defineConfig({
	resolve,
	test: {
		projects: [srcBrowser, guides],
	},
})
`
				}
				return `${header}
${EXPORT_KEYWORD} const srcServer = (config?: UserConfig): UserConfig =>
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

${EXPORT_KEYWORD} const guides = (config?: UserConfig): UserConfig =>
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
`
			}

			if (!hasCore) {
				const [onlySurface] = nonCore
				if (onlySurface === 'browser' || onlySurface === 'server') {
					return singleSurfaceConfig(onlySurface)
				}
			}

			// Shape 1 (no `nonCore` entries) / Shape 2 (1-2 `nonCore` entries) —
			// `srcCore` is always the shared base; `srcBrowser` / `srcServer` extend
			// it and externalize `@src/core` to the sibling build.
			const browserBlock = `
${EXPORT_KEYWORD} const srcBrowser = (config?: UserConfig): UserConfig =>
	srcCore(
		mergeConfig(
			{
				build: {
					lib: {
						entry: resolveWorkspacePath('src/browser/index.ts'),
						formats: ['es'],
						fileName: () => 'index.js',
					},
					outDir: 'dist/src/browser',
					rolldownOptions: {
						external: (id: string) => id === '@src/core' || id.startsWith('@orkestrel/'),
						output: { paths: { '@src/core': '../core/index.js' } },
					},
				},
				test: {
					name: { label: 'src:browser', color: 'yellow' },
					include: ['tests/src/browser/**/*.test.ts'],
					exclude: ['tests/src/core/**/*.test.ts'],
					setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
					browser: {
						enabled: true,
						provider: createBrowserProvider(),
						instances: [{ browser: 'chromium', headless: true }],
					},
					fileParallelism: false,
				},
			},
			config ?? {},
		),
	)
`
			const serverBlock = `
${EXPORT_KEYWORD} const srcServer = (config?: UserConfig): UserConfig =>
	srcCore(
		mergeConfig(
			{
				build: {
					lib: {
						entry: resolveWorkspacePath('src/server/index.ts'),
						formats: ['es', 'cjs'],
						fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
					},
					outDir: 'dist/src/server',
					target: 'node24',
					rolldownOptions: {
						external: (id: string) =>
							id === '@src/core' || id.startsWith('node:') || id.startsWith('@orkestrel/'),
						output: [
							{
								format: 'es',
								entryFileNames: 'index.js',
								paths: { '@src/core': '../core/index.js' },
							},
							{
								format: 'cjs',
								entryFileNames: 'index.cjs',
								paths: { '@src/core': '../core/index.cjs' },
							},
						],
					},
				},
				test: {
					name: { label: 'src:server', color: 'red' },
					include: ['tests/src/server/**/*.test.ts'],
					exclude: ['tests/src/core/**/*.test.ts'],
					setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				},
			},
			config ?? {},
		),
	)
`
			const blocks = nonCore
				.map((surface) => (surface === 'browser' ? browserBlock : serverBlock))
				.join('')
			const projectNames = [
				...(hasCore ? ['srcCore'] : []),
				...nonCore.map((surface) => `src${pascalCase(surface)}`),
				'guides',
			]
			return `${header}
${EXPORT_KEYWORD} const srcCore = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			build: {
				emptyOutDir: true,
				sourcemap: true,
				minify: false,
			},
			test: {
				name: { label: 'src:core', color: 'magenta' },
				include: ['tests/src/core/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		config ?? {},
	)

${EXPORT_KEYWORD} const guides = (config?: UserConfig): UserConfig =>
	srcCore(
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
${blocks}
export default defineConfig({
	resolve,
	test: {
		projects: [${projectNames.join(', ')}],
	},
})
`
		}

		// `configs/src/tsconfig.core.json` — unchanged core shape.
		function coreTsconfig(): string {
			const config = {
				extends: '../../tsconfig.json',
				compilerOptions: {
					lib: ['ESNext'],
					noEmit: false,
					declaration: true,
					emitDeclarationOnly: true,
					rootDir: '../../src/core',
					outDir: '../../dist/src/core',
				},
				include: ['../../src/core/**/*.ts'],
			}
			return `${JSON.stringify(config, undefined, '\t')}\n`
		}

		// `configs/src/vite.core.config.ts` — inlines its own `build.lib` /
		// `rollupOptions` (core's `srcCore` root export carries no build.lib).
		function coreViteConfig(): string {
			return `import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { srcCore, resolveWorkspacePath } from '../../vite.config'

export default defineConfig(
	srcCore({
		plugins: [
			dts({
				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.core.json'),
				bundleTypes: true,
			}),
		],
		build: {
			lib: {
				entry: resolveWorkspacePath('src/core/index.ts'),
				formats: ['es', 'cjs'],
				fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
			},
			outDir: 'dist/src/core',
			rollupOptions: {
				external: [/^node:/, /^@orkestrel\\//],
			},
		},
	}),
)
`
		}

		// `configs/src/tsconfig.<browser|server>.json` — `rootDir`/`outDir`
		// point at the whole `src`/`dist/src` tree (not a per-surface
		// subfolder), per the live middleware/router exemplars.
		function surfaceTsconfig(surface: 'browser' | 'server'): string {
			const config = {
				extends: '../../tsconfig.json',
				compilerOptions: {
					lib: surface === 'browser' ? ['ESNext', 'DOM', 'DOM.Iterable'] : ['ESNext'],
					types: surface === 'browser' ? ['vite/client'] : ['node'],
					noEmit: false,
					declaration: true,
					emitDeclarationOnly: true,
					rootDir: '../../src',
					outDir: '../../dist/src',
				},
				include: [`../../src/${surface}/**/*.ts`],
			}
			return `${JSON.stringify(config, undefined, '\t')}\n`
		}

		// `configs/src/vite.<browser|server>.config.ts` — a thin `dts`-only
		// wrapper; `build.lib` / externals live in the root `srcBrowser` /
		// `srcServer` export instead (per the live exemplars).
		function surfaceViteConfig(surface: 'browser' | 'server'): string {
			const anchor = surface === 'browser' ? 'srcBrowser' : 'srcServer'
			return `import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { ${anchor}, resolveWorkspacePath } from '../../vite.config'

// Types are bundled inline by vite-plugin-dts (see configs/src/vite.core.config.ts
// for the same pattern).
export default defineConfig(
	${anchor}({
		plugins: [
			dts({
				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.${surface}.json'),
				bundleTypes: true,
			}),
		],
	}),
)
`
		}

		const artifacts: Artifact[] = [
			{
				path: 'tsconfig.json',
				group: 'configs',
				origin: 'computed',
				content: rootTsconfig(spec.surfaces),
			},
			{
				path: 'vite.config.ts',
				group: 'configs',
				origin: 'computed',
				content: rootViteConfig(spec.surfaces),
			},
		]
		for (const surface of spec.surfaces) {
			const row = SURFACE_MATRIX[surface]
			for (const path of row.configs) {
				const isTsconfig = path.endsWith('.json')
				const content =
					surface === 'core'
						? isTsconfig
							? coreTsconfig()
							: coreViteConfig()
						: isTsconfig
							? surfaceTsconfig(surface)
							: surfaceViteConfig(surface)
				artifacts.push({ path, group: 'configs', origin: 'computed', surface, content })
			}
		}
		return artifacts
	}

	// Draft the `source` group's `template` artifacts — the generated-minimal
	// `src/<surface>/*` stubs, one full {types, <Pascal>, factories, index} set
	// PER declared surface (never assuming `core`), filled from `TEMPLATES` with
	// `missing: 'error'`. `blueprintToMembers` already declares a full entity +
	// factory per surface (AGENTS §5's per-surface centralized-file pattern), so
	// every surface gets the same uniform stub shape.
	function sourceArtifacts(spec: Blueprint, pascal: string): readonly Artifact[] {
		const values = { pascal }
		const artifacts: Artifact[] = []
		for (const surface of spec.surfaces) {
			artifacts.push(
				fillArtifact(`src/${surface}/types.ts`, 'source', 'types', values, surface),
				fillArtifact(`src/${surface}/${pascal}.ts`, 'source', 'entity', values, surface),
				fillArtifact(`src/${surface}/factories.ts`, 'source', 'factories', values, surface),
				fillArtifact(`src/${surface}/index.ts`, 'source', 'index', values, surface),
			)
		}
		return artifacts
	}

	// Build the computed `SELF_SPECIFIERS` / `SPECIFIER_MODULES` / `exportsFor`
	// block the `parityTest` template's `{{specifiers}}` placeholder fills —
	// ONE shape for every surface count (grounded against the live single-surface
	// websocket/indexeddb and multi-surface router/middleware exemplars, which
	// both resolve a fence's specifier through a `SPECIFIER_MODULES` map rather
	// than a single-module lookup). The bare `@orkestrel/<name>` specifier
	// resolves to the PRIMARY surface — `core` when declared, else the sole
	// declared surface.
	function paritySpecifiers(spec: Blueprint): string {
		// Keyword tokens keep the emitted declarations out of column 0 of THIS
		// file's raw text, which the guides-parity scanner reads.
		const CONST_KEYWORD = 'const'
		const FUNCTION_KEYWORD = 'function'
		const primary: Surface = spec.surfaces.includes('core') ? 'core' : (spec.surfaces[0] ?? 'core')
		const packageSpecifier = `@orkestrel/${spec.name}`
		const selfSpecifiers = [packageSpecifier, ...spec.surfaces.map((surface) => `@src/${surface}`)]
		const modules: Record<string, string> = { [packageSpecifier]: `src/${primary}` }
		for (const surface of spec.surfaces) modules[`@src/${surface}`] = `src/${surface}`
		const specifierList = selfSpecifiers.map((specifier) => `'${specifier}'`).join(', ')
		const moduleLines = Object.entries(modules)
			.map(([specifier, module]) => `\t'${specifier}': '${module}',`)
			.join('\n')
		return `const SELF_SPECIFIERS = [${specifierList}]

${CONST_KEYWORD} SPECIFIER_MODULES: Readonly<Record<string, string>> = {
${moduleLines}
}
${CONST_KEYWORD} specifierSources = new Map<string, ReturnType<typeof createSource>>()
${FUNCTION_KEYWORD} exportsFor(specifier: string): readonly string[] {
	const module = SPECIFIER_MODULES[specifier]
	if (module === undefined) return []
	let source = specifierSources.get(module)
	if (source === undefined) {
		source = createSource({ files, module })
		specifierSources.set(module, source)
	}
	return source.exports().map((symbol) => symbol.name)
}`
	}

	// Draft the `tests` group's `template` artifacts — the shared recorder
	// setup, one environment-specific setup file per non-`core` surface
	// (`setupServer.ts` / `setupBrowser.ts`, grounded against the live
	// exemplars' setup-file naming), the generated-minimal entity / factory test
	// stubs PER declared surface, and the surface-aware guides-parity drop-in.
	function testArtifacts(spec: Blueprint, pascal: string): readonly Artifact[] {
		const artifacts: Artifact[] = [fillArtifact('tests/setup.ts', 'tests', 'setup', {})]
		if (spec.surfaces.includes('server')) {
			artifacts.push(fillArtifact('tests/setupServer.ts', 'tests', 'setupServer', {}, 'server'))
		}
		if (spec.surfaces.includes('browser')) {
			artifacts.push(fillArtifact('tests/setupBrowser.ts', 'tests', 'setupBrowser', {}, 'browser'))
		}
		for (const surface of spec.surfaces) {
			const values = { pascal, surface }
			artifacts.push(
				fillArtifact(
					`tests/src/${surface}/${pascal}.test.ts`,
					'tests',
					'entityTest',
					values,
					surface,
				),
				fillArtifact(
					`tests/src/${surface}/factories.test.ts`,
					'tests',
					'factoriesTest',
					values,
					surface,
				),
			)
		}
		artifacts.push(
			fillArtifact('tests/guides/src/parity.test.ts', 'tests', 'parityTest', {
				name: spec.name,
				specifiers: paritySpecifiers(spec),
			}),
		)
		return artifacts
	}

	// Draft the `guides` group's artifacts — the package's own filled guide
	// stub, the guides index, and any vendored dependency guide mirrors.
	function guideArtifacts(
		spec: Blueprint,
		pascal: string,
		members: readonly Member[],
	): readonly Artifact[] {
		// Build an `alignTable` markdown table over a member category's rows,
		// deduped by name — `blueprintToMembers` declares one full member set PER
		// surface, so a multi-surface blueprint carries byte-identical
		// name/summary rows once per surface; the one guide (AGENTS §22) lists
		// each declared member once, grouped across its surfaces.
		function memberTable(category: Member['category']): string {
			const seen = new Set<string>()
			const rows: string[][] = []
			for (const item of members) {
				if (item.category !== category) continue
				if (seen.has(item.name)) continue
				seen.add(item.name)
				rows.push([`\`${item.name}\``, item.summary])
			}
			return alignTable(['API', 'Summary'], rows)
		}

		const primary: Surface = spec.surfaces.includes('core') ? 'core' : (spec.surfaces[0] ?? 'core')
		const source = spec.surfaces
			.map((surface) => `[\`src/${surface}\`](../../src/${surface})`)
			.join(', ')
		const barrel =
			spec.surfaces.length === 1
				? `Surfaced through the \`@src/${primary}\` barrel.`
				: `Surfaced through the \`@orkestrel/${spec.name}\` barrel (aliased ${spec.surfaces.map((surface) => `\`@src/${surface}\``).join(' / ')} inside this repo).`
		const tests = spec.surfaces
			.map(
				(surface) =>
					`- [\`tests/src/${surface}/${pascal}.test.ts\`](../../tests/src/${surface}/${pascal}.test.ts) —\n  id assignment (explicit / generated) and independence across instances.\n- [\`tests/src/${surface}/factories.test.ts\`](../../tests/src/${surface}/factories.test.ts) —\n  \`create${pascal}\` returns a working \`${pascal}Interface\` backed by a real \`${pascal}\`.`,
			)
			.join('\n')

		const artifacts: Artifact[] = [
			fillArtifact(`guides/src/${spec.name}.md`, 'guides', 'guide', {
				name: spec.name,
				pascal,
				primary,
				source,
				barrel,
				tests,
				factories: memberTable('factory'),
				entities: memberTable('entity'),
				types: memberTable('type'),
			}),
			fillArtifact('guides/README.md', 'guides', 'guidesReadme', {
				concept: alignTable(
					['Concept', 'Spec', 'Source', 'Tests'],
					[
						[
							pascal,
							`[\`${spec.name}.md\`](src/${spec.name}.md)`,
							spec.surfaces.map((surface) => `[\`src/${surface}\`](../src/${surface})`).join(', '),
							spec.surfaces
								.map((surface) => `[\`tests/src/${surface}\`](../tests/src/${surface})`)
								.join(', '),
						],
					],
				),
				directory: alignTable(
					['Directory', 'Guide'],
					spec.surfaces.map((surface) => [
						`src/${surface}`,
						`[\`${spec.name}.md\`](src/${spec.name}.md)`,
					]),
				),
			}),
		]
		for (const dep of spec.dependencies) {
			if (!vendoredGuides.includes(dep.name)) continue
			const short = dep.name.replace('@orkestrel/', '')
			artifacts.push({
				path: `guides/src/${short}.md`,
				group: 'guides',
				origin: 'host',
				source: `guides/src/${short}.md`,
			})
		}
		return artifacts
	}

	// Apply a blueprint's `overrides` over a drafted artifact list — an
	// override REPLACES the matching artifact's `content` in place; an
	// override matching no planned artifact, or targeting a `host`-origin
	// path, is left unapplied here (the gate stage surfaces it as a blocking
	// question — this leaf only performs the replacement half of the rule).
	function applyOverrides(
		artifacts: readonly Artifact[],
		overrides: Blueprint['overrides'],
	): readonly Artifact[] {
		if (overrides.length === 0) return artifacts
		const byPath = new Map(overrides.map((override) => [override.path, override.content]))
		return artifacts.map((artifact) => {
			if (artifact.origin === 'host') return artifact
			const content = byPath.get(artifact.path)
			return content === undefined ? artifact : { ...artifact, content }
		})
	}

	const selected = groups && groups.length > 0 ? groups : GROUPS
	const pascal = pascalCase(blueprint.name)
	const members = blueprintToMembers(blueprint)
	const artifacts: Artifact[] = []

	if (selected.includes('manifest')) {
		artifacts.push({
			path: 'package.json',
			group: 'manifest',
			origin: 'computed',
			content: packageManifest(blueprint),
		})
	}
	if (selected.includes('configs')) artifacts.push(...configArtifacts(blueprint))
	if (selected.includes('source')) artifacts.push(...sourceArtifacts(blueprint, pascal))
	if (selected.includes('tests')) artifacts.push(...testArtifacts(blueprint, pascal))
	if (selected.includes('guides')) artifacts.push(...guideArtifacts(blueprint, pascal, members))
	if (selected.includes('docs')) {
		artifacts.push(fillArtifact('README.md', 'docs', 'readme', { name: blueprint.name, pascal }))
	}

	for (const path of HOST_PATHS) {
		const group = hostGroup(path)
		if (!selected.includes(group)) continue
		artifacts.push({ path, group, origin: 'host', source: path })
	}

	const draft: Plan = {
		blueprint,
		groups: [...selected],
		artifacts: applyOverrides(artifacts, blueprint.overrides),
	}
	return pinPlan(draft)
}
