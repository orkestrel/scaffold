import type {
	Artifact,
	Blueprint,
	Group,
	Member,
	Plan,
	Environment,
	ViteFacts,
	ViteMachinery,
	ViteProjectRegistration,
} from './types.js'
import { fillTemplate } from '@orkestrel/template'
import {
	APP_MATRIX,
	APP_BROWSER_DEV_DEPENDENCIES,
	APP_CORE_DEV_DEPENDENCIES,
	APP_SERVER_DEV_DEPENDENCIES,
	BASE_DEV_DEPENDENCIES,
	BIN_CONFIGS,
	CHECKOUT_ACTION_SHA,
	CONST_KEYWORD,
	EXPORT_KEYWORD,
	FUNCTION_KEYWORD,
	GROUPS,
	HOST_PATHS,
	ENVIRONMENTS,
	GLOBAL_SETUP_PATH,
	SERVICE_SCRIPT_PATH,
	SHOWCASE_CONFIG_PATH,
	SOURCE_BROWSER_DEV_DEPENDENCIES,
	SETUP_NODE_ACTION_SHA,
	SRC_MATRIX,
	TYPESCRIPT_EXTENSIONS,
} from './constants.js'
import {
	alignTable,
	blueprintToMembers,
	escapeHtmlText,
	fitsPrintWidth,
	formatJson,
	pascalCase,
	pinPlan,
	selectHostPaths,
	serializeTypeScriptString,
} from './helpers.js'
import { TEMPLATES } from './templates.js'

/**
 * Resolve the `Group` a byte-copied `HOST_PATHS` entry belongs to.
 *
 * @param path - A `HOST_PATHS` entry.
 * @returns The owning `Group`.
 *
 * @example
 * ```ts
 * hostGroup('AGENTS.md') // 'docs'
 * hostGroup('.agents') // 'orchestration'
 * hostGroup('.claude') // 'orchestration'
 * hostGroup('.codex') // 'orchestration'
 * ```
 */
export function hostGroup(path: string): Group {
	if (path === 'AGENTS.md' || path === 'CLAUDE.md' || path === 'LICENSE') {
		return 'docs'
	}
	if (
		path.startsWith('.agents/') ||
		path.startsWith('.claude/') ||
		path.startsWith('.codex/') ||
		path.startsWith('scripts/') ||
		path.startsWith('.github/')
	) {
		return 'orchestration'
	}
	if (path.startsWith('tests/')) return 'tests'
	if (path === 'guides/src/guide.md' || path === 'guides/src/scaffold.md') return 'guides'
	return 'configs'
}

/**
 * Fill one `TEMPLATES` entry into a `template`-origin `Artifact`, optionally
 * tagged with the owning `Environment` (source/tests artifacts that live under a
 * declared environment's tree).
 *
 * @param path - The artifact's output path.
 * @param group - The artifact's `Group`.
 * @param id - The `TEMPLATES` entry id to fill.
 * @param values - The placeholder values to fill the template with.
 * @param environment - The owning `Environment`, when the artifact lives under a declared environment's tree.
 * @returns The filled `template`-origin `Artifact`.
 *
 * @example
 * ```ts
 * fillArtifact('README.md', 'docs', 'readme', { name: 'router', pascal: 'Router' })
 * // { path: 'README.md', group: 'docs', origin: 'template', content: '# router\n…' }
 * ```
 */
export function fillArtifact(
	path: string,
	group: Group,
	id: string,
	values: Readonly<Record<string, unknown>>,
	environment?: Environment,
): Artifact {
	const definition = TEMPLATES[id]
	if (!definition) throw new Error(`Unknown template id: ${id}`)
	const content = fillTemplate(definition.content, values, {
		missing: 'error',
		placeholders: definition.placeholders,
	})
	return environment === undefined
		? { path, group, origin: 'template', content }
		: { path, group, origin: 'template', environment, content }
}

/**
 * Classify a blueprint's src into the manifest/exports variant class.
 *
 * @param src - The declared `Environment[]`.
 * @returns The sole declared `Environment`, or `'multi'` when two or more are declared.
 *
 * @example
 * ```ts
 * srcVariant(['core']) // 'core'
 * srcVariant(['core', 'server']) // 'multi'
 * ```
 */
export function srcVariant(src: readonly Environment[]): Environment | 'multi' {
	if (src.length > 1) return 'multi'
	const [only] = src
	return only ?? 'core'
}

/**
 * Build the `main` / `module` / top-level `types` entry fields.
 *
 * @param src - The declared `Environment[]`.
 * @returns The `package.json` `main` / `module` / optional `types` fields.
 *
 * @example
 * ```ts
 * entryFields(['browser']).main // './dist/src/browser/index.js'
 * ```
 */
export function entryFields(src: readonly Environment[]): {
	readonly main: string
	readonly module: string
	readonly types?: string
} {
	const variant = srcVariant(src)
	if (variant === 'multi') {
		return { main: './dist/src/core/index.cjs', module: './dist/src/core/index.js' }
	}
	const root: Environment = variant
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

/**
 * One dual-format (`import` + `require`) `exports` condition block.
 *
 * @param path - The extensionless dist path to point both conditions at.
 * @returns The dual `import`/`require` exports condition object.
 *
 * @example
 * ```ts
 * dualCondition('./dist/src/core/index')
 * // { import: { types: '….d.ts', default: '….js' }, require: { types: '….d.cts', default: '….cjs' } }
 * ```
 */
export function dualCondition(path: string): Readonly<Record<string, unknown>> {
	return {
		import: { types: `${path}.d.ts`, default: `${path}.js` },
		require: { types: `${path}.d.cts`, default: `${path}.cjs` },
	}
}

/**
 * Build the `package.json` `exports` map.
 *
 * @param src - The declared `Environment[]`.
 * @returns The `package.json` `exports` map.
 *
 * @example
 * ```ts
 * exportsMap(['core'])['.'] // dual import/require condition block
 * ```
 */
export function exportsMap(src: readonly Environment[]): Readonly<Record<string, unknown>> {
	const variant = srcVariant(src)
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
	for (const environment of src) {
		if (environment === 'core') continue
		const row = SRC_MATRIX[environment]
		if (environment === 'browser') {
			map[row.path] = {
				import: {
					types: './dist/src/browser/index.d.ts',
					default: './dist/src/browser/index.js',
				},
			}
			continue
		}
		map[row.path] = dualCondition(`./dist/src/${environment}/index`)
	}
	map['./package.json'] = './package.json'
	return map
}

/**
 * A code-unit (not locale-sensitive) comparator — matches the `keywords` sort
 * and keeps ordering stable across locales/environments.
 *
 * @param a - The first string.
 * @param b - The second string.
 * @returns `-1` / `0` / `1` per code-unit order.
 *
 * @example
 * ```ts
 * [...['b', 'a']].sort(compareCodeUnit) // ['a', 'b']
 * ```
 */
export function compareCodeUnit(a: string, b: string): number {
	return a < b ? -1 : a > b ? 1 : 0
}

/**
 * The complete development dependency set one blueprint emits. The shared
 * baseline is extended by package extras, dev-installed peers, selected
 * browser environments, and the bin axis's browser test provider.
 *
 * @param spec - The blueprint whose development dependencies are required.
 * @returns The merged `devDependencies` record.
 *
 * @example
 * ```ts
 * devDependenciesFor(blueprint('router'))['typescript'] // '^6.0.3'
 * ```
 */
export function devDependenciesFor(spec: Blueprint): Readonly<Record<string, string>> {
	const dependencies: Record<string, string> = {
		...BASE_DEV_DEPENDENCIES,
	}
	for (const extra of [...spec.extras].sort((a, b) => compareCodeUnit(a.name, b.name))) {
		dependencies[extra.name] = extra.range
	}
	for (const peer of [...spec.peers].sort((a, b) => compareCodeUnit(a.name, b.name))) {
		dependencies[peer.name] = peer.range
	}
	return {
		...dependencies,
		...(spec.src.includes('browser') ? SOURCE_BROWSER_DEV_DEPENDENCIES : {}),
		...(spec.app.length > 0 ? APP_CORE_DEV_DEPENDENCIES : {}),
		...(spec.app.includes('browser') ? APP_BROWSER_DEV_DEPENDENCIES : {}),
		...(spec.app.includes('server') ? APP_SERVER_DEV_DEPENDENCIES : {}),
		...(spec.showcase ? { 'vite-plugin-singlefile': '^2.3.3' } : {}),
		...(spec.bin
			? {
					'@vitest/browser-playwright':
						SOURCE_BROWSER_DEV_DEPENDENCIES['@vitest/browser-playwright'],
				}
			: {}),
	}
}

/**
 * Compute the `package.json` artifact's `content`, applying the manifest and
 * exports combination rules over a blueprint's src — grounded against the
 * live @orkestrel/middleware (core+server) and @orkestrel/router
 * (core+browser+server) exemplars.
 *
 * @param spec - The `Blueprint` to derive the manifest from.
 * @returns The `package.json` file content, newline-terminated.
 *
 * @example
 * ```ts
 * packageManifest(blueprint('router')) // '{\n\t"name": "@orkestrel/router",\n…}\n'
 * ```
 */
export function packageManifest(spec: Blueprint): string {
	const hasSource = spec.src.length > 0
	const entry = hasSource ? entryFields(spec.src) : undefined
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
	// Scripts are built by sequential assignment so aggregate + per-environment
	// keys interleave in the exact live-package insertion order (`check:src`
	// immediately followed by each `check:src:<environment>`, and so on).
	const scripts: Record<string, string> = {
		clean: "node -e \"require('node:fs').rmSync('dist',{recursive:true,force:true})\"",
		copy: "node -e \"const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)\"",
		scaffold: spec.bin ? 'node ./dist/bin/scaffold.js' : 'scaffold',
		lint: 'oxlint --config .oxlintrc.json --fix --deny-warnings .',
		check: [
			'tsc --noEmit --project tsconfig.json',
			...(hasSource || spec.bin ? ['npm run check:src'] : []),
			...(spec.app.length > 0 ? ['npm run check:app'] : []),
		].join(' && '),
	}
	if (hasSource || spec.bin) {
		scripts['check:src'] =
			spec.src.map((environment) => `npm run check:src:${environment}`).join(' && ') +
			(spec.bin ? `${spec.src.length > 0 ? ' && ' : ''}npm run check:src:bin` : '')
		for (const environment of spec.src) {
			scripts[`check:src:${environment}`] =
				`tsc --noEmit -p configs/src/tsconfig.${environment}.json`
		}
	}
	if (spec.bin) scripts['check:src:bin'] = 'tsc --noEmit -p configs/src/tsconfig.bin.json'
	if (spec.app.length > 0) {
		scripts['check:app'] = spec.app
			.map((environment) => `npm run check:app:${environment}`)
			.join(' && ')
		for (const environment of spec.app) {
			scripts[`check:app:${environment}`] =
				environment === 'browser'
					? 'vue-tsc --noEmit -p configs/app/tsconfig.browser.json'
					: `tsc --noEmit -p configs/app/tsconfig.${environment}.json`
		}
	}
	scripts.format = 'oxfmt --config .oxfmtrc.json --write .'
	scripts['format:check'] = 'oxfmt --config .oxfmtrc.json --check .'
	scripts['lint:check'] = 'oxlint --config .oxlintrc.json --deny-warnings .'
	scripts.test = [
		...(hasSource || spec.bin ? ['npm run test:src'] : []),
		...(spec.app.length > 0 ? ['npm run test:app'] : []),
		'npm run test:policy',
		'npm run test:guides',
	].join(' && ')
	if (hasSource || spec.bin) {
		scripts['test:src'] =
			'vitest run --config vite.config.ts --no-cache --reporter=dot ' +
			spec.src.map((environment) => `--project src:${environment}`).join(' ') +
			(spec.bin ? `${spec.src.length > 0 ? ' ' : ''}--project src:bin` : '')
		for (const environment of spec.src) {
			scripts[`test:src:${environment}`] =
				`vitest run --config vite.config.ts --no-cache --reporter=dot --project src:${environment}`
		}
	}
	if (spec.bin)
		scripts['test:src:bin'] =
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin'
	if (spec.integration)
		scripts['test:integration'] =
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project integration'
	if (spec.bin && spec.integration)
		scripts['test:equivalence'] =
			"node -e \"const c=require('node:child_process'),p=process.env.npm_execpath;if(p===undefined)process.exit(1);const r=c.spawnSync(process.execPath,[p,'run','test:integration'],{stdio:'inherit',env:{...process.env,SCAFFOLD_BOUNDARY_EQUIVALENCE:'1'}});process.exit(r.status??1)\""
	if (spec.service)
		scripts['test:service'] =
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project service'
	if (spec.app.length > 0) {
		scripts['test:app'] =
			'vitest run --config vite.config.ts --no-cache --reporter=dot ' +
			spec.app.map((environment) => `--project ${APP_MATRIX[environment].project}`).join(' ')
		for (const environment of spec.app) {
			scripts[`test:app:${environment}`] =
				`vitest run --config vite.config.ts --no-cache --reporter=dot --project ${APP_MATRIX[environment].project}`
		}
	}
	scripts['test:policy'] =
		'vitest run --config vite.config.ts --no-cache --reporter=dot --project policy'
	scripts['test:guides'] = 'vitest run --config vite.config.ts --reporter=dot --project guides'
	scripts.build = [
		'npm run clean',
		...(hasSource || spec.bin ? ['npm run build:src'] : []),
		...(spec.app.length > 0 ? ['npm run build:app'] : []),
		...(spec.bin ? ['npm run build:host'] : []),
	].join(' && ')
	if (hasSource || spec.bin) {
		scripts['build:src'] =
			spec.src.map((environment) => `npm run build:src:${environment}`).join(' && ') +
			(spec.bin ? `${spec.src.length > 0 ? ' && ' : ''}npm run build:src:bin` : '')
		for (const environment of spec.src) {
			scripts[`build:src:${environment}`] =
				environment === 'browser'
					? `vite build --config configs/src/vite.${environment}.config.ts`
					: `vite build --config configs/src/vite.${environment}.config.ts && npm run copy dist/src/${environment}/index.d.ts dist/src/${environment}/index.d.cts`
		}
	}
	if (spec.app.length > 0) {
		const runtime = spec.app.filter((environment) => environment !== 'core')
		scripts['build:app'] =
			runtime.length > 0
				? runtime.map((environment) => `npm run build:app:${environment}`).join(' && ')
				: 'npm run check:app:core'
		for (const environment of runtime) {
			scripts[`build:app:${environment}`] =
				`vite build --config configs/app/vite.${environment}.config.ts`
		}
		if (spec.app.includes('browser')) {
			scripts.dev = 'vite --config configs/app/vite.browser.config.ts'
			if (spec.showcase) {
				scripts.showcase = `vite --config ${SHOWCASE_CONFIG_PATH}`
				scripts['build:showcase'] = `vite build --config ${SHOWCASE_CONFIG_PATH}`
				scripts.show =
					'npm run build:showcase && npm run copy dist/showcase/index.html demo/showcase.html'
			}
		}
		if (spec.app.includes('server')) {
			scripts.serve = 'node dist/app/server/main.cjs'
			scripts['serve:build'] = 'npm run build:app:server && npm run serve'
		}
	}
	if (spec.bin) {
		scripts['build:src:bin'] = 'vite build --config configs/src/vite.bin.config.ts'
		scripts['build:host'] =
			"node -e \"import('./dist/src/server/index.js').then((m)=>{const n=m.stageHost(process.cwd(),'dist/host').length;console.log('build-host: staged '+n+' file(s) into dist/host')})\""
	}
	scripts.prepublishOnly =
		'npm run format:check && npm run lint:check && npm run check && npm run build && npm test' +
		(spec.integration ? ' && npm run test:integration' : '')

	const devDependencies = devDependenciesFor(spec)
	const manifest: Record<string, unknown> = {
		name: hasSource ? `@orkestrel/${spec.name}` : spec.name,
		version: spec.version,
		...(hasSource ? {} : { private: true }),
		description:
			spec.description ??
			(hasSource ? `The @orkestrel/${spec.name} package.` : `The ${spec.name} application.`),
		keywords: [...spec.keywords].sort(),
		homepage: `https://github.com/orkestrel/${spec.name}#readme`,
		bugs: `https://github.com/orkestrel/${spec.name}/issues`,
		license: 'MIT',
		repository: { type: 'git', url: `git+https://github.com/orkestrel/${spec.name}.git` },
		...(spec.bin ? { bin: { scaffold: './dist/bin/scaffold.js' } } : {}),
		files: spec.bin
			? ['dist/src', 'dist/bin', 'dist/host', 'README.md']
			: hasSource
				? ['dist/src', 'README.md']
				: ['dist/app', 'README.md'],
		type: 'module',
		...(hasSource
			? {
					sideEffects: spec.bin ? ['./src/bin/scaffold.ts', './dist/bin/scaffold.js'] : false,
				}
			: {}),
		...(entry === undefined
			? {}
			: {
					main: entry.main,
					module: entry.module,
					...(entry.types ? { types: entry.types } : {}),
					exports: exportsMap(spec.src),
					publishConfig: { access: 'public' },
				}),
		scripts,
		dependencies,
		devDependencies: Object.fromEntries(
			Object.entries(devDependencies)
				.filter(([depName]) => !spec.bin || depName !== '@orkestrel/scaffold')
				.filter(
					([depName]) =>
						hasSource || (depName !== '@microsoft/api-extractor' && depName !== 'vite-plugin-dts'),
				)
				.filter(
					([depName]) =>
						hasSource || spec.app.includes('browser') || depName !== '@vitest/browser-playwright',
				)
				.sort(([a], [b]) => compareCodeUnit(a, b)),
		),
		...(Object.keys(peerDependencies).length > 0 ? { peerDependencies } : {}),
		...(Object.keys(peerDependenciesMeta).length > 0 ? { peerDependenciesMeta } : {}),
		engines: { node: spec.engines },
	}
	// Deliberately `JSON.stringify(…, '\t')`, NOT `formatJson`: `oxfmt --check`
	// proved this exact array-always-broken form is `package.json`'s own fixed
	// point (unlike the width-collapsed tsconfig arrays), so routing the
	// manifest through `formatJson` would collapse an array `oxfmt` keeps
	// broken and reintroduce drift. Keep this call as-is — the tsconfig
	// emitters (`rootTsconfig` / `coreTsconfig` / `srcTsconfig`) are the
	// ones that need `formatJson`'s width-aware array collapse.
	return `${JSON.stringify(manifest, undefined, '\t')}\n`
}

/**
 * The root `tsconfig.json` — one `@src/<environment>` path alias per declared
 * environment, in declared order.
 *
 * @param src - The declared `Environment[]`.
 * @param app - The declared application environments, defaulting to none.
 * @returns The root `tsconfig.json` file content, newline-terminated.
 *
 * @example
 * ```ts
 * rootTsconfig(['core']) // '{\n\t"compilerOptions": {…}\n}\n'
 * ```
 */
export function rootTsconfig(
	src: readonly Environment[],
	app: readonly Environment[] = [],
): string {
	const paths: Record<string, readonly string[]> = {}
	for (const environment of src) paths[`@src/${environment}`] = [`./src/${environment}/index.ts`]
	for (const environment of app) paths[`@app/${environment}`] = [`./app/${environment}/index.ts`]
	const config = {
		compilerOptions: {
			target: 'ESNext',
			module: 'ESNext',
			moduleResolution: 'bundler',
			allowImportingTsExtensions: true,
			lib: ['ESNext', 'DOM', 'DOM.Iterable'],
			types: ['node', 'vite/client', 'vitest/globals'],
			moduleDetection: 'force',
			resolveJsonModule: true,
			strict: true,
			verbatimModuleSyntax: true,
			noUncheckedIndexedAccess: true,
			noUncheckedSideEffectImports: true,
			exactOptionalPropertyTypes: true,
			noImplicitOverride: true,
			noFallthroughCasesInSwitch: true,
			forceConsistentCasingInFileNames: true,
			skipLibCheck: true,
			noEmit: true,
			paths,
		},
		exclude: ['node_modules', 'dist', 'tmp'],
	}
	return formatJson(config)
}

/**
 * Derive which host-specific machinery a workspace's generated root
 * `vite.config.ts` carries from its declared environments.
 *
 * @remarks
 * This is the SOLE derivation of that set; `rootViteConfig`,
 * `singleSrcViteConfig`, `applicationViteConfig`, and `configArtifacts` all
 * read it rather than recomputing an axis of their own. Nothing here selects
 * a boundary GUARANTEE — the environment-boundary plugin, its module-graph
 * AST audit, and stylesheet rejection ship in every shape.
 *
 * @param src - The declared published `Environment[]`.
 * @param app - The declared application `Environment[]`, defaulting to none.
 * @param bin - Whether the workspace also builds its own executable.
 * @param showcase - Whether the workspace carries its optional app showcase.
 * @returns The machinery set the generated header renders.
 *
 * @example
 * ```ts
 * viteMachinery(['core']) // { browser: false, vue: false, output: true, showcase: false }
 * viteMachinery([], ['core']) // { browser: false, vue: false, output: false, showcase: false }
 * ```
 */
export function viteMachinery(
	src: readonly Environment[],
	app: readonly Environment[] = [],
	bin = false,
	showcase = false,
): ViteMachinery {
	// An application of `core` alone compiles but never builds: it declares no
	// published library target, no runtime application target, and no bin
	// executable, so there is no output directory to contain. `app.length > 0`
	// guards the degenerate empty blueprint, which `hasBlueprintEnvironment`
	// already rejects.
	const unbuilt =
		src.length === 0 && app.length > 0 && !bin && app.every((environment) => environment === 'core')
	return {
		browser: src.includes('browser') || app.includes('browser'),
		vue: app.includes('browser'),
		output: !unbuilt,
		showcase: showcase && app.includes('browser'),
	}
}

/**
 * Derive the one ordered Vitest project registration list shared by every
 * generated root configuration shape.
 *
 * @param src - The declared published environments.
 * @param app - The declared application environments.
 * @param facts - Optional structural facts.
 * @returns Source projects, application projects, proof projects, then optional axis projects.
 *
 * @example
 * ```ts
 * viteProjectRegistrations(['core'], [], { integration: true })
 * // [{ project: 'srcCore' }, { project: 'policy' }, { project: 'guides' }, { project: 'integration' }]
 * ```
 */
export function viteProjectRegistrations(
	src: readonly Environment[],
	app: readonly Environment[] = [],
	facts: ViteFacts = {},
): readonly ViteProjectRegistration[] {
	const registrations: ViteProjectRegistration[] = []
	for (const environment of ENVIRONMENTS) {
		if (!src.includes(environment)) continue
		if (environment === 'core') registrations.push({ project: 'srcCore' })
		if (environment === 'browser') {
			registrations.push({ project: 'srcBrowser', browser: SRC_MATRIX.browser.project })
		}
		if (environment === 'server') registrations.push({ project: 'srcServer' })
	}
	for (const environment of ENVIRONMENTS) {
		if (!app.includes(environment)) continue
		if (environment === 'core') registrations.push({ project: 'appCore' })
		if (environment === 'browser') {
			registrations.push({ project: 'appBrowser', browser: APP_MATRIX.browser.project })
		}
		if (environment === 'server') registrations.push({ project: 'appServer' })
	}
	registrations.push({ project: 'policy' }, { project: 'guides' })
	if (facts.bin === true) registrations.push({ project: 'srcBin' })
	if (facts.integration === true) registrations.push({ project: 'integration' })
	if (facts.service === true) registrations.push({ project: 'service' })
	return registrations
}

/**
 * Render the one ordered proof and structural-axis project definition block.
 *
 * @param facts - Optional structural facts.
 * @returns Policy, guides, then selected axis project definitions, separated by one blank line.
 *
 * @example
 * ```ts
 * viteProjectDefinitions({ bin: true }).includes('export const srcBin =') // true
 * ```
 */
export function viteProjectDefinitions(facts: ViteFacts = {}): string {
	const definitions = [policyViteProject(), guidesViteProject()]
	if (facts.bin === true) definitions.push(binViteProject())
	if (facts.integration === true) definitions.push(integrationViteProject(facts))
	if (facts.service === true) definitions.push(serviceViteProject())
	return definitions.join('\n')
}

/**
 * Render the root Vitest project registration, preserving browser ownership
 * supplied by the caller.
 *
 * @param registrations - Ordered project factory identifiers with optional browser labels.
 * @param browser - Whether the generated configuration carries browser machinery.
 * @returns The rendered root `test` property.
 *
 * @example
 * ```ts
 * renderViteTest([{ project: 'srcCore' }], false)
 * // '\ttest: {\n\t\tprojects: [srcCore],\n\t},'
 * ```
 */
export function renderViteTest(
	registrations: readonly ViteProjectRegistration[],
	browser: boolean,
): string {
	const projects = registrations.map((registration) => registration.project)
	const inlineProjects = `		projects: [${projects.join(', ')}],`
	const renderedProjects = fitsPrintWidth(inlineProjects)
		? inlineProjects
		: `		projects: [
${projects.map((project) => `			${project},`).join('\n')}
		],`
	if (!browser) {
		return `	test: {
${renderedProjects}
	},`
	}
	const renderedRegistrations = registrations.map((registration) =>
		registration.browser === undefined
			? `{ project: ${registration.project} }`
			: `{ project: ${registration.project}, browser: ${serializeTypeScriptString(registration.browser)} }`,
	)
	const inlineRegistrations = `		[${renderedRegistrations.join(', ')}],`
	const renderedRegistrationArray = fitsPrintWidth(inlineRegistrations)
		? inlineRegistrations
		: `		[
${renderedRegistrations.map((registration) => `			${registration},`).join('\n')}
		],`
	return `	test: gateBrowserProjects(
${renderedRegistrationArray}
		browserOptions !== undefined,
		process.argv,
	),`
}

/**
 * The rendered import / `resolve` header block every `rootViteConfig` shape
 * prefixes — the environment boundary and every guarantee it enforces ship
 * unconditionally; `machinery` selects only the host-specific pipelines layered
 * over them, per the three grounded `rootViteConfig` shapes: browser machinery
 * unconditional for a multi-environment blueprint carrying `browser`,
 * conditional on the sole environment being `'browser'` for a single non-`core`
 * environment, absent for `core`-only.
 *
 * @param machinery - The host-specific machinery this shape carries, from `viteMachinery`.
 * @returns The rendered header block, newline-terminated.
 *
 * @example
 * ```ts
 * viteHeader(viteMachinery(['core'])).includes('@vitest/browser-playwright') // false
 * viteHeader(viteMachinery(['core', 'browser'])).includes('@vitest/browser-playwright') // true
 * ```
 */
export function viteHeader(machinery: ViteMachinery): string {
	const {
		browser: needsBrowser,
		vue: needsVue,
		output: needsOutput,
		showcase: needsShowcase,
	} = machinery
	// Rendered blocks below are generated FILE TEXT, so every embedded
	// declaration keyword is interpolated rather than typed literally at
	// column 0 — the doc↔source parity scan (AGENTS §22) reads this file's
	// own source lines, and a flush-left `export const foo` inside a
	// template string is indistinguishable from a real module-scope export
	// to that line-based scan; interpolating the keyword keeps the emitted
	// bytes identical while keeping this file's own declaration environment
	// exactly the one export it documents.
	// The official Playwright provider import is present only when needed.
	const playwrightTypeImports = needsBrowser
		? `import type { PlaywrightProviderOptions } from '@vitest/browser-playwright'
`
		: ''
	const playwrightImports = needsBrowser
		? `import { playwright } from '@vitest/browser-playwright'
import { chromium } from 'playwright'
`
		: ''
	const vueImports = needsVue
		? `import vue from '@vitejs/plugin-vue'
import { parse as parseVue } from 'vue/compiler-sfc'
`
		: ''
	const showcaseImports = needsShowcase
		? `import { viteSingleFile } from 'vite-plugin-singlefile'
`
		: ''
	const showcaseHashImport = needsShowcase ? "import { createHash } from 'node:crypto'\n" : ''
	const viteTypeImports = needsVue
		? `import type {
	CSSOptions,
	HtmlAssetSource,
	HTMLOptions,
	Plugin,
	ResolvedConfig,
	UserConfig,
} from 'vite'`
		: needsBrowser
			? `import type { CSSOptions, Plugin, ResolvedConfig, UserConfig } from 'vite'`
			: `import type { Plugin, UserConfig } from 'vite'`
	const vueBoundary = needsVue
		? `,
		transform: {
			order: 'pre',
			async handler(code, id) {
				if (!isWorkspaceBoundaryModule(id)) return null
				const restored = /[?&]html-proxy(?:[=&]|$)/.test(id) ? restoreIgnoredHtml(code) : code
				const target = workspacePath(id)
				const physicalImporter = physicalPath(id)
				const importerPackageRoot = trustedPackageRootFor(physicalImporter, trustedPackageRoots)
				if (target === undefined) {
					if (isOutsideWorkspacePath(id) && importerPackageRoot === undefined) {
						this.error('Environment modules cannot import files outside the workspace')
					}
				} else {
					const pathError = environmentPathError(owner, target)
					if (pathError !== undefined) this.error(pathError)
				}
				const environmentModule =
					target !== undefined && /^(?:app|src)\\/(?:core|browser|server)\\//.test(target)
				if (environmentModule || importerPackageRoot !== undefined) {
					if (isCSSRequest(id)) {
						const config = resolvedConfig
						if (config === undefined) {
							return this.error('Environment boundary requires resolved Vite configuration')
						}
						const stylesheet = await preprocessCSS(restored, id, config)
						for (const dependency of stylesheet.deps ?? []) {
							const physicalDependency = physicalPath(dependency)
							const dependencyTarget = workspacePath(physicalDependency)
							if (dependencyTarget === undefined) {
								if (trustedPackageRootFor(physicalDependency, trustedPackageRoots) === undefined) {
									this.error('Environment modules cannot import files outside the workspace')
								}
								continue
							}
							const dependencyError = environmentPathError(owner, dependencyTarget)
							if (dependencyError !== undefined) this.error(dependencyError)
						}
					}
					for (const source of await environmentAssetSources(restored, id)) {
						const normalizedSource = source.replaceAll('\\\\', '/')
						const sourceError = environmentSourceError(owner, normalizedSource)
						if (sourceError !== undefined) this.error(sourceError)
						const [sourcePath] = normalizedSource.split(/[?#]/)
						if (sourcePath !== undefined && isBuiltin(sourcePath)) continue
						const resolution = await this.resolve(normalizedSource, id, { skipSelf: true })
						const fallbackSource = sourceFallback(physicalImporter, normalizedSource)
						const physicalSource = physicalPath(resolution?.id ?? fallbackSource)
						if (importerPackageRoot !== undefined) {
							const pathLike =
								normalizedSource.startsWith('.') ||
								normalizedSource.startsWith('/') ||
								/^file:/i.test(normalizedSource) ||
								/^[A-Za-z]:[\\\\/]/.test(normalizedSource)
							if (pathLike && !containedPath(importerPackageRoot, physicalSource)) {
								this.error(
									'Dependency modules cannot import files outside their physical package root',
								)
							}
							if (!pathLike && !containedPath(importerPackageRoot, physicalSource)) {
								const packageName = packageNameOf(normalizedSource)
								const packageRoot = normalizedSource.startsWith('#')
									? workspacePath(physicalSource) === undefined
										? packageRootForResolved(physicalSource)
										: undefined
									: packageName === undefined
										? undefined
										: packageRootOf(packageName, physicalSource)
								if (packageRoot === undefined || !containedPath(packageRoot, physicalSource)) {
									return this.error(
										'Resolved dependencies must remain inside their physical package root',
									)
								}
								trustedPackageRoots.add(packageRoot)
							}
							continue
						}
						const resolvedSource = workspacePath(physicalSource)
						if (resolvedSource === undefined) {
							return this.error('Environment modules cannot import files outside the workspace')
						}
						const assetError = environmentPathError(owner, resolvedSource)
						if (assetError !== undefined) this.error(assetError)
					}
				}
				if (id.includes('?')) return restored === code ? null : restored
				const componentPath = workspacePath(id)
				if (componentPath?.startsWith('app/browser/') !== true || !componentPath.endsWith('.vue')) {
					return restored === code ? null : restored
				}
				const parsed = parseVue(restored, { filename: componentPath })
				if (parsed.errors.length > 0) this.error('Vue component could not be parsed')
				for (const script of [parsed.descriptor.script, parsed.descriptor.scriptSetup]) {
					if (script === null) continue
					for (const source of await environmentAssetSources(
						script.content,
						\`\${componentPath}.\${script.lang ?? 'js'}\`,
					)) {
						const normalizedSource = source.replaceAll('\\\\', '/')
						const sourceError = environmentSourceError('app/browser', normalizedSource)
						if (sourceError !== undefined) this.error(sourceError)
						const resolution = await this.resolve(normalizedSource, id, { skipSelf: true })
						const fallbackSource = sourceFallback(
							resolvePath(WORKSPACE_ROOT, componentPath),
							normalizedSource,
						)
						const resolvedSource = workspacePath(resolution?.id ?? fallbackSource)
						if (resolvedSource === undefined) {
							return this.error('Environment modules cannot import files outside the workspace')
						}
						const pathError = environmentPathError('app/browser', resolvedSource)
						if (pathError !== undefined) this.error(pathError)
					}
				}
				const blocks = [
					parsed.descriptor.template,
					parsed.descriptor.script,
					parsed.descriptor.scriptSetup,
					...parsed.descriptor.styles,
					...parsed.descriptor.customBlocks,
				]
				for (const block of blocks) {
					const source = block?.src
					if (source === undefined) continue
					const decodedSource = decodeAssetSource(source)
					if (decodedSource === undefined) {
						return this.error('Vue block URLs must use valid URI encoding')
					}
					const normalizedSource = decodedSource.replaceAll('\\\\', '/')
					const sourceError = environmentSourceError('app/browser', normalizedSource)
					if (sourceError !== undefined) this.error(sourceError)
					const [sourcePath] = normalizedSource.split(/[?#]/)
					const pathLike =
						normalizedSource.startsWith('.') ||
						normalizedSource.startsWith('/') ||
						/^file:/i.test(normalizedSource) ||
						/^[A-Za-z]:[\\\\/]/.test(normalizedSource)
					const resolution = await this.resolve(normalizedSource, id, { skipSelf: true })
					const fallbackSource = sourceFallback(
						resolvePath(WORKSPACE_ROOT, componentPath),
						normalizedSource,
					)
					const resolvedSource = workspacePath(resolution?.id ?? fallbackSource)
					if (pathLike && resolvedSource === undefined) {
						this.error('Environment modules cannot import files outside the workspace')
					}
					const pathError =
						resolvedSource === undefined
							? undefined
							: environmentPathError('app/browser', resolvedSource)
					if (pathError !== undefined) this.error(pathError)
					if (
						(sourcePath !== undefined && isBuiltin(sourcePath)) ||
						/^(?:@(?:app|src)\\/server(?:[/?#]|$)|@orkestrel\\/[^/]+\\/server(?:[/?#]|$))/.test(
							normalizedSource,
						)
					) {
						this.error('Browser modules cannot depend on Node or server-only modules')
					}
				}
				return restored === code ? null : restored
			},
		}`
		: needsBrowser
			? `,
		transform: {
			order: 'pre',
			async handler(code, id) {
				if (!isWorkspaceBoundaryModule(id)) return null
				const target = workspacePath(id)
				const physicalImporter = physicalPath(id)
				const importerPackageRoot = trustedPackageRootFor(physicalImporter, trustedPackageRoots)
				if (target === undefined) {
					if (isOutsideWorkspacePath(id) && importerPackageRoot === undefined) {
						this.error('Environment modules cannot import files outside the workspace')
					}
				} else {
					const pathError = environmentPathError(owner, target)
					if (pathError !== undefined) this.error(pathError)
				}
				const environmentModule =
					target !== undefined && /^(?:app|src)\\/(?:core|browser|server)\\//.test(target)
				if (!environmentModule && importerPackageRoot === undefined) return null
				if (isCSSRequest(id)) {
					const config = resolvedConfig
					if (config === undefined) {
						return this.error('Environment boundary requires resolved Vite configuration')
					}
					const stylesheet = await preprocessCSS(code, id, config)
					for (const dependency of stylesheet.deps ?? []) {
						const physicalDependency = physicalPath(dependency)
						const dependencyTarget = workspacePath(physicalDependency)
						if (dependencyTarget === undefined) {
							if (trustedPackageRootFor(physicalDependency, trustedPackageRoots) === undefined) {
								this.error('Environment modules cannot import files outside the workspace')
							}
							continue
						}
						const dependencyError = environmentPathError(owner, dependencyTarget)
						if (dependencyError !== undefined) this.error(dependencyError)
					}
				}
				for (const source of await environmentAssetSources(code, id)) {
					const normalizedSource = source.replaceAll('\\\\', '/')
					const sourceError = environmentSourceError(owner, normalizedSource)
					if (sourceError !== undefined) this.error(sourceError)
					const [sourcePath] = normalizedSource.split(/[?#]/)
					if (sourcePath !== undefined && isBuiltin(sourcePath)) continue
					const resolution = await this.resolve(normalizedSource, id, { skipSelf: true })
					const fallbackSource = sourceFallback(physicalImporter, normalizedSource)
					const physicalSource = physicalPath(resolution?.id ?? fallbackSource)
					if (importerPackageRoot !== undefined) {
						const pathLike =
							normalizedSource.startsWith('.') ||
							normalizedSource.startsWith('/') ||
							/^file:/i.test(normalizedSource) ||
							/^[A-Za-z]:[\\\\/]/.test(normalizedSource)
						if (pathLike && !containedPath(importerPackageRoot, physicalSource)) {
							this.error(
								'Dependency modules cannot import files outside their physical package root',
							)
						}
						if (!pathLike && !containedPath(importerPackageRoot, physicalSource)) {
							const packageName = packageNameOf(normalizedSource)
							const packageRoot = normalizedSource.startsWith('#')
								? workspacePath(physicalSource) === undefined
									? packageRootForResolved(physicalSource)
									: undefined
								: packageName === undefined
									? undefined
									: packageRootOf(packageName, physicalSource)
							if (packageRoot === undefined || !containedPath(packageRoot, physicalSource)) {
								return this.error(
									'Resolved dependencies must remain inside their physical package root',
								)
							}
							trustedPackageRoots.add(packageRoot)
						}
						continue
					}
					const resolvedSource = workspacePath(physicalSource)
					if (resolvedSource === undefined) {
						return this.error('Environment modules cannot import files outside the workspace')
					}
					const assetError = environmentPathError(owner, resolvedSource)
					if (assetError !== undefined) this.error(assetError)
				}
				return null
			},
		}`
			: `,
		transform: {
			order: 'pre',
			async handler(code, id) {
				if (!isWorkspaceBoundaryModule(id)) return null
				const target = workspacePath(id)
				const physicalImporter = physicalPath(id)
				const importerPackageRoot = trustedPackageRootFor(physicalImporter, trustedPackageRoots)
				if (target === undefined) {
					if (isOutsideWorkspacePath(id) && importerPackageRoot === undefined) {
						this.error('Environment modules cannot import files outside the workspace')
					}
				} else {
					const pathError = environmentPathError(owner, target)
					if (pathError !== undefined) this.error(pathError)
				}
				const environmentModule =
					target !== undefined && /^(?:app|src)\\/(?:core|browser|server)\\//.test(target)
				if (!environmentModule && importerPackageRoot === undefined) return null
				for (const source of await environmentAssetSources(code, id)) {
					const normalizedSource = source.replaceAll('\\\\', '/')
					const sourceError = environmentSourceError(owner, normalizedSource)
					if (sourceError !== undefined) this.error(sourceError)
					const [sourcePath] = normalizedSource.split(/[?#]/)
					if (sourcePath !== undefined && isBuiltin(sourcePath)) continue
					const resolution = await this.resolve(normalizedSource, id, { skipSelf: true })
					const fallbackSource = sourceFallback(physicalImporter, normalizedSource)
					const physicalSource = physicalPath(resolution?.id ?? fallbackSource)
					if (importerPackageRoot !== undefined) {
						const pathLike =
							normalizedSource.startsWith('.') ||
							normalizedSource.startsWith('/') ||
							/^file:/i.test(normalizedSource) ||
							/^[A-Za-z]:[\\\\/]/.test(normalizedSource)
						if (pathLike && !containedPath(importerPackageRoot, physicalSource)) {
							this.error(
								'Dependency modules cannot import files outside their physical package root',
							)
						}
						if (!pathLike && !containedPath(importerPackageRoot, physicalSource)) {
							const packageName = packageNameOf(normalizedSource)
							const packageRoot = normalizedSource.startsWith('#')
								? workspacePath(physicalSource) === undefined
									? packageRootForResolved(physicalSource)
									: undefined
								: packageName === undefined
									? undefined
									: packageRootOf(packageName, physicalSource)
							if (packageRoot === undefined || !containedPath(packageRoot, physicalSource)) {
								return this.error(
									'Resolved dependencies must remain inside their physical package root',
								)
							}
							trustedPackageRoots.add(packageRoot)
						}
						continue
					}
					const resolvedSource = workspacePath(physicalSource)
					if (resolvedSource === undefined) {
						return this.error('Environment modules cannot import files outside the workspace')
					}
					const assetError = environmentPathError(owner, resolvedSource)
					if (assetError !== undefined) this.error(assetError)
				}
				return null
			},
		}`
	const environmentBoundary = `
${CONST_KEYWORD} WORKSPACE_ROOT = realpathSync.native(dirname(fileURLToPath(import.meta.url)))${needsVue ? `\n${EXPORT_KEYWORD} ${CONST_KEYWORD} IMPORT_META_ENV_PREFIX = 'import.meta.env.'` : ''}

${EXPORT_KEYWORD} function fileSystemPath(pathname: string): string {
	if (!pathname.startsWith('/@fs/')) return pathname
	const candidate = pathname.slice('/@fs/'.length)
	// Vite URL normalization can collapse the leading slash of a POSIX absolute path.
	return candidate.startsWith('/') || /^[A-Za-z]:[\\\\/]/.test(candidate)
		? candidate
		: \`/\${candidate}\`
}

${EXPORT_KEYWORD} function physicalPath(path: string): string {
	const [pathWithoutQuery] = path.split('?')
	const candidate = fileSystemPath(pathWithoutQuery ?? path)
	const physicalCandidate = /^file:/i.test(candidate) ? fileURLToPath(candidate) : candidate
	const absoluteCandidate =
		physicalCandidate.length === 0
			? WORKSPACE_ROOT
			: isAbsolute(physicalCandidate)
				? physicalCandidate
				: resolvePath(WORKSPACE_ROOT, physicalCandidate)
	return existsSync(absoluteCandidate) ? realpathSync.native(absoluteCandidate) : absoluteCandidate
}

${EXPORT_KEYWORD} function sourceFallback(importer: string, source: string): string {
	return /^file:/i.test(source) ? fileURLToPath(source) : resolvePath(dirname(importer), source)
}

${EXPORT_KEYWORD} function workspacePath(path: string): string | undefined {
	const relativePath = relative(WORKSPACE_ROOT, physicalPath(path)).replaceAll('\\\\', '/')
	if (relativePath === '..' || relativePath.startsWith('../') || isAbsolute(relativePath)) {
		return undefined
	}
	return relativePath
}

${EXPORT_KEYWORD} function isBoundaryExemptModule(id: string): boolean {
	const normalizedId = id.replaceAll('\\\\', '/')
	const [path] = normalizedId.split(/[?#]/)
	if (
		path === undefined ||
		normalizedId.startsWith('\\0') ||
		normalizedId.includes('virtual:') ||
		normalizedId === '@vite/client' ||
		normalizedId === '@vite/env' ||
		normalizedId.startsWith('/@id/') ||
		normalizedId.startsWith('/@vite/') ||
		normalizedId.startsWith('/__vite') ||
		normalizedId.startsWith('/__vitest') ||
		normalizedId.startsWith('@vitest/browser') ||
		normalizedId.includes('/@vitest/browser/')
	) {
		return true
	}
	let physicalId: string | undefined
	try {
		physicalId = physicalPath(id).replaceAll('\\\\', '/')
	} catch {
		physicalId = undefined
	}
	for (const candidate of physicalId === undefined ? [path] : [path, physicalId]) {
		if (candidate.split('/').some((segment) => segment.toLowerCase() === 'node_modules')) {
			return true
		}
	}
	return false
}

${EXPORT_KEYWORD} function isWorkspaceBoundaryModule(id: string): boolean {
	if (isBoundaryExemptModule(id)) return false
	const normalizedId = id.replaceAll('\\\\', '/')
	const [path] = normalizedId.split(/[?#]/)
	if (path === undefined) return false
	let candidate = fileSystemPath(path)
	try {
		if (/^file:/i.test(candidate)) candidate = fileURLToPath(candidate)
	} catch {
		return false
	}
	const rootRelative = /^\\/(?:app|src)\\/(?:core|browser|server)\\//.test(candidate)
	const absoluteCandidate = rootRelative
		? resolvePath(WORKSPACE_ROOT, candidate.slice(1))
		: isAbsolute(candidate)
			? candidate
			: resolvePath(WORKSPACE_ROOT, candidate)
	const relativeId = relative(WORKSPACE_ROOT, absoluteCandidate).replaceAll('\\\\', '/')
	return (
		relativeId !== '..' &&
		!relativeId.startsWith('../') &&
		!isAbsolute(relativeId) &&
		/^(?:app|src)\\/(?:core|browser|server)\\//.test(relativeId)
	)
}

${EXPORT_KEYWORD} function isOutsideWorkspacePath(path: string): boolean {
	const [pathWithoutQuery] = path.split('?')
	if (pathWithoutQuery === undefined) return false
	return isAbsolute(fileSystemPath(pathWithoutQuery))
}

${EXPORT_KEYWORD} function containedPath(root: string, target: string): boolean {
	const relativePath = relative(root, target)
	return (
		relativePath === '' ||
		(relativePath !== '..' && !relativePath.startsWith(\`..\${sep}\`) && !isAbsolute(relativePath))
	)
}${
		needsVue
			? `

${EXPORT_KEYWORD} function browserServerRoots(): readonly string[] {
	const roots: string[] = []
	for (const path of [
		'app/browser',
		'app/core',
		'src/browser',
		'src/core',
		'node_modules',
		'tests/app/browser',
		'tests/setup.ts',
		'tests/setupBrowser.ts',
	]) {
		const logical = resolvePath(WORKSPACE_ROOT, path)
		const physical = physicalPath(logical)
		if (
			!containedPath(WORKSPACE_ROOT, logical) ||
			!containedPath(WORKSPACE_ROOT, physical) ||
			!containedPath(logical, physical) ||
			!containedPath(physical, logical)
		) {
			throw new Error(
				'[orkestrel-environment-boundary] Browser development roots must remain inside the physical workspace',
			)
		}
		roots.push(physical)
	}
	return Object.freeze(roots)
}

${EXPORT_KEYWORD} function browserServerPath(
	url: string | undefined,
	root: string,
): string | null | undefined {
	if (url === undefined) return undefined
	const [pathname] = url.split(/[?#]/)
	if (pathname === undefined) return undefined
	try {
		const decoded = decodeURIComponent(pathname)
		if (decoded.startsWith('/@fs/')) {
			const candidate = fileSystemPath(decoded)
			if (candidate.length === 0) return null
			return physicalPath(candidate)
		}
		if (decoded.startsWith('/@id/')) {
			const source = decoded.slice('/@id/'.length)
			if (
				(/^@(?:app|src)\\//.test(source) &&
					!['@app/core', '@app/browser', '@src/core', '@src/browser'].includes(source)) ||
				environmentSourceError('app/browser', source) !== undefined
			) {
				return null
			}
			return undefined
		}
		if (decoded.startsWith('/@vite/') || decoded.startsWith('/__vite')) {
			return undefined
		}
		if (/^\\/@(?:app|src)\\//.test(decoded)) return null
		// Vite owns the app root request, while Vitest owns its in-memory tester root request.
		if (decoded === '/') return undefined
		if (!decoded.startsWith('/')) return null
		const candidate = physicalPath(resolvePath(root, decoded.slice(1)))
		if (existsSync(candidate) || !existsSync(decoded)) return candidate
		// An absolute module URL denotes itself; browserServerRoots still bounds it.
		return physicalPath(decoded)
	} catch {
		return null
	}
}

${EXPORT_KEYWORD} function isBrowserServerPathAllowed(
	path: string | null | undefined,
	roots: readonly string[],
): boolean {
	if (path === undefined) return true
	return path !== null && roots.some((root) => containedPath(root, path))
}`
			: ''
	}

${EXPORT_KEYWORD} function packageNameOf(source: string): string | undefined {
	const [sourcePath] = source.replaceAll('\\\\', '/').split(/[?#]/)
	if (
		sourcePath === undefined ||
		sourcePath.length === 0 ||
		sourcePath.startsWith('.') ||
		sourcePath.startsWith('/') ||
		sourcePath.startsWith('#') ||
		sourcePath.startsWith('file:') ||
		/^[A-Za-z]:\\//.test(sourcePath) ||
		isBuiltin(sourcePath)
	) {
		return undefined
	}
	const segments = sourcePath.split('/')
	if (sourcePath.startsWith('@')) {
		const [scope, name] = segments
		return scope === undefined || name === undefined ? undefined : \`\${scope}/\${name}\`
	}
	return segments[0]
}

${EXPORT_KEYWORD} function readBoundedFile(path: string, limit: number): string | undefined {
	if (!existsSync(path)) return undefined
	try {
		const status = lstatSync(path)
		if (!status.isFile() || status.isSymbolicLink() || status.nlink !== 1 || status.size > limit) {
			return undefined
		}
		const handle = openSync(path, FS_CONSTANTS.O_RDONLY | FS_CONSTANTS.O_NOFOLLOW)
		try {
			const current = fstatSync(handle)
			if (
				!current.isFile() ||
				current.nlink !== 1 ||
				current.dev !== status.dev ||
				current.ino !== status.ino ||
				current.size !== status.size ||
				current.mtimeMs !== status.mtimeMs ||
				current.ctimeMs !== status.ctimeMs
			) {
				return undefined
			}
			const bytes = Buffer.allocUnsafe(current.size + 1)
			let offset = 0
			for (;;) {
				const count = readSync(handle, bytes, offset, bytes.length - offset, null)
				if (count === 0) break
				offset += count
				if (offset > current.size) return undefined
			}
			const final = fstatSync(handle)
			if (
				!final.isFile() ||
				final.nlink !== 1 ||
				final.dev !== current.dev ||
				final.ino !== current.ino ||
				final.size !== current.size ||
				final.size !== offset ||
				final.mtimeMs !== current.mtimeMs ||
				final.ctimeMs !== current.ctimeMs
			) {
				return undefined
			}
			return bytes.toString('utf8', 0, offset)
		} finally {
			closeSync(handle)
		}
	} catch {
		return undefined
	}
}

${EXPORT_KEYWORD} function packageManifestName(directory: string): string | undefined {
	const content = readBoundedFile(resolvePath(directory, 'package.json'), PACKAGE_MANIFEST_BYTES)
	if (content === undefined) return undefined
	try {
		const manifest: unknown = JSON.parse(content)
		if (typeof manifest !== 'object' || manifest === null) return undefined
		const manifestName = Object.getOwnPropertyDescriptor(manifest, 'name')?.value
		return typeof manifestName === 'string' && packageNameOf(manifestName) === manifestName
			? manifestName
			: undefined
	} catch {
		return undefined
	}
}

${EXPORT_KEYWORD} function isPackageBoundary(directory: string): boolean {
	const segments = directory.replaceAll('\\\\', '/').split('/')
	let nodeModules = -1
	for (const [index, segment] of segments.entries()) {
		if (segment.toLowerCase() === 'node_modules') nodeModules = index
	}
	if (nodeModules < 0) return false
	const packageSegments = segments.slice(nodeModules + 1)
	return (
		(packageSegments.length === 1 && packageSegments[0]?.startsWith('@') === false) ||
		(packageSegments.length === 2 &&
			packageSegments[0]?.startsWith('@') === true &&
			packageSegments[1]?.length !== 0)
	)
}

${EXPORT_KEYWORD} function packageRootOf(packageName: string, resolvedPath: string): string | undefined {
	const physical = physicalPath(resolvedPath)
	let current =
		existsSync(physical) && lstatSync(physical).isDirectory() ? physical : dirname(physical)
	for (;;) {
		const boundary = isPackageBoundary(current)
		const manifest = resolvePath(current, 'package.json')
		if (boundary || existsSync(manifest)) {
			return packageManifestName(current) === packageName ? realpathSync.native(current) : undefined
		}
		const parent = dirname(current)
		if (parent === current) return undefined
		current = parent
	}
}

${EXPORT_KEYWORD} function packageRootForResolved(resolvedPath: string): string | undefined {
	const physical = physicalPath(resolvedPath)
	let current =
		existsSync(physical) && lstatSync(physical).isDirectory() ? physical : dirname(physical)
	for (;;) {
		const boundary = isPackageBoundary(current)
		const manifest = resolvePath(current, 'package.json')
		if (boundary || existsSync(manifest)) {
			return packageManifestName(current) === undefined ? undefined : realpathSync.native(current)
		}
		const parent = dirname(current)
		if (parent === current) return undefined
		current = parent
	}
}

${EXPORT_KEYWORD} function trustedPackageRootFor(
	target: string,
	trustedPackageRoots: ReadonlySet<string>,
): string | undefined {
	const physical = physicalPath(target)
	for (const root of trustedPackageRoots) {
		if (containedPath(root, physical)) return root
	}
	return undefined
}

${EXPORT_KEYWORD} function isStylesheetPath(path: string): boolean {
	return /\\.(?:css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:[?#]|$)/.test(path)
}

${EXPORT_KEYWORD} function environmentPathError(owner: string, target: string): string | undefined {
	const targetApplication = target.startsWith('app/')
	const targetBrowser = target.startsWith('app/browser/') || target.startsWith('src/browser/')
	const targetServer = target.startsWith('app/server/') || target.startsWith('src/server/')
	const stylesheet = isStylesheetPath(target)
	if (owner.startsWith('src/') && targetApplication) {
		return 'Published modules cannot depend on private application modules'
	}
	if (owner.endsWith('/core') && (stylesheet || targetBrowser || targetServer)) {
		return 'Core modules must remain host-independent'
	}
	if (owner.endsWith('/browser') && targetServer) {
		return 'Browser modules cannot depend on Node or server-only modules'
	}
	if (owner.endsWith('/server') && (stylesheet || targetBrowser)) {
		return 'Server modules cannot depend on Vue or browser-only modules'
	}
	return undefined
}

${EXPORT_KEYWORD} function environmentSourceError(owner: string, source: string): string | undefined {
	const normalizedSource = source.replaceAll('\\\\', '/')
	if (hasAsciiUrlControl(normalizedSource)) {
		return 'Environment module URLs cannot contain ASCII controls'
	}
	const [sourcePath] = normalizedSource.split(/[?#]/)
	const builtin = sourcePath !== undefined && isBuiltin(sourcePath)
	const unsupportedScheme =
		sourcePath !== undefined &&
		/^[A-Za-z][A-Za-z0-9+.-]*:/.test(sourcePath) &&
		!builtin &&
		!/^file:/i.test(sourcePath) &&
		!/^[A-Za-z]:\\//.test(sourcePath)
	const browserPackage =
		/^(?:(?:vue|vite)(?:[/?#]|$)|@(?:vue|vitejs)\\/|@(?:app|src)\\/browser(?:[/?#]|$)|@orkestrel\\/[^/]+\\/browser(?:[/?#]|$))/.test(
			normalizedSource,
		)
	const serverPackage =
		/^(?:@(?:app|src)\\/server(?:[/?#]|$)|@orkestrel\\/[^/]+\\/server(?:[/?#]|$))/.test(
			normalizedSource,
		)
	const stylesheet = isStylesheetPath(normalizedSource)
	if (unsupportedScheme) return 'Environment modules cannot import non-Node URL schemes'
	if (owner.startsWith('src/') && /^@app(?:[/?#]|$)/.test(normalizedSource)) {
		return 'Published modules cannot depend on private application modules'
	}
	if (owner.endsWith('/core') && (builtin || browserPackage || serverPackage || stylesheet)) {
		return 'Core modules must remain host-independent'
	}
	if (owner.endsWith('/browser') && (builtin || serverPackage)) {
		return 'Browser modules cannot depend on Node or server-only modules'
	}
	if (owner.endsWith('/server') && (browserPackage || stylesheet)) {
		return 'Server modules cannot depend on Vue or browser-only modules'
	}
	return undefined
}

${
	needsBrowser
		? `${EXPORT_KEYWORD} function stylesheetAssetError(
	source: string | undefined,
	value: string,
): string | undefined {
	if (source === undefined) return 'Stylesheet asset source could not be resolved'
	const decoded = decodeAssetSource(value)
	if (decoded === undefined) return 'Stylesheet asset URLs must use valid URI encoding'
	if (decoded.includes('\\\\')) return 'Stylesheet asset URLs must use forward slashes'
	const [assetPath] = decoded.split(/[?#]/)
	if (
		assetPath === undefined ||
		assetPath.length === 0 ||
		decoded.startsWith('#') ||
		decoded.startsWith('//') ||
		(assetPath.startsWith('/') && !/^[A-Za-z]:[\\\\/]/.test(assetPath))
	) {
		return undefined
	}
	const scheme = /^[A-Za-z][A-Za-z0-9+.-]*:/.test(assetPath)
	const fileScheme = /^file:/i.test(assetPath)
	if (scheme && !fileScheme && !/^[A-Za-z]:[\\\\/]/.test(assetPath)) {
		return undefined
	}
	let physicalAsset: string
	try {
		physicalAsset = physicalPath(
			fileScheme ? fileURLToPath(assetPath) : resolvePath(dirname(physicalPath(source)), assetPath),
		)
	} catch {
		return 'Stylesheet asset URLs must use valid local paths'
	}
	const sourceTarget = workspacePath(source)
	const assetTarget = workspacePath(physicalAsset)
	if (sourceTarget !== undefined) {
		if (assetTarget === undefined) {
			return 'Environment modules cannot import files outside the workspace'
		}
		const [layer, environment] = sourceTarget.split('/')
		return environmentPathError(\`\${layer}/\${environment}\`, assetTarget)
	}
	const packageRoot = packageRootForResolved(source)
	if (packageRoot === undefined || !containedPath(packageRoot, physicalAsset)) {
		return 'Dependency modules cannot import files outside their physical package root'
	}
	return undefined
}

`
		: ''
}${
		needsOutput
			? `${EXPORT_KEYWORD} function enforceOutputPath(configured: string, expected: string): void {
	if (relative(expected, configured) !== '') {
		throw new Error(
			'[orkestrel-output-boundary] Build output must use its exact configured workspace directory',
		)
	}
	const workspaceRelative = relative(WORKSPACE_ROOT, expected)
	if (
		workspaceRelative === '..' ||
		workspaceRelative.startsWith(\`..\${sep}\`) ||
		isAbsolute(workspaceRelative)
	) {
		throw new Error('[orkestrel-output-boundary] Build output must remain inside the workspace')
	}
	let current = WORKSPACE_ROOT
	for (const segment of workspaceRelative.split(sep)) {
		if (segment.length === 0) continue
		current = resolvePath(current, segment)
		if (!existsSync(current)) continue
		const status = lstatSync(current)
		if (status.isSymbolicLink() || !status.isDirectory()) {
			throw new Error(
				'[orkestrel-output-boundary] Build output and its existing parents must be real directories',
			)
		}
		if (workspacePath(realpathSync.native(current)) === undefined) {
			throw new Error('[orkestrel-output-boundary] Build output must remain inside the workspace')
		}
	}
}

${EXPORT_KEYWORD} function outputBoundary(output: string): Plugin {
	const expected = resolvePath(WORKSPACE_ROOT, output)
	let configured = expected
	let build = false
	return {
		name: 'orkestrel-output-boundary',
		enforce: 'pre',
		configResolved(config) {
			if (config.publicDir !== '') {
				throw new Error(
					'[orkestrel-output-boundary] Public directories are disabled; every output must come from the audited graph',
				)
			}
			if (
				output.endsWith('/browser') &&
				config.build.lib === false &&
				config.build.assetsInlineLimit !== 0
			) {
				throw new Error(
					'[orkestrel-output-boundary] Browser assets must remain external for output auditing',
				)
			}
			const outputOptions = config.build.rolldownOptions.output
			const outputs = Array.isArray(outputOptions) ? outputOptions : [outputOptions]
			for (const options of outputs) {
				if (options?.dir !== undefined || options?.file !== undefined) {
					throw new Error(
						'[orkestrel-output-boundary] Rolldown output directories and files cannot override the configured output',
					)
				}
			}
			build = config.command === 'build'
			configured = resolvePath(config.root, config.build.outDir)
		},
		buildStart() {
			if (build) enforceOutputPath(configured, expected)
		},
	}
}

`
			: ''
	}${EXPORT_KEYWORD} function decodeAssetSource(source: string): string | undefined {
	try {
		return decodeURI(source)
	} catch {
		return undefined
	}
}

${
	needsVue
		? `${EXPORT_KEYWORD} function filterHtmlAssetSource(
	data: Parameters<NonNullable<HtmlAssetSource['filter']>>[0],
): boolean {
	const decoded = decodeAssetSource(data.value)
	if (decoded === undefined) {
		throw new Error('[orkestrel-environment-boundary] HTML asset URLs must use valid URI encoding')
	}
	if (decoded.includes('\\\\')) {
		throw new Error('[orkestrel-environment-boundary] HTML asset URLs must use forward slashes')
	}
	if (/[?&]inline\\b/.test(decoded)) {
		throw new Error(
			'[orkestrel-environment-boundary] HTML asset URLs cannot force inlining outside the auditable output graph',
		)
	}
	return false
}

${EXPORT_KEYWORD} function filterHtmlScriptSource(
	data: Parameters<NonNullable<HtmlAssetSource['filter']>>[0],
): boolean {
	filterHtmlAssetSource(data)
	if (data.attributes.type !== 'module') {
		throw new Error(
			'[orkestrel-environment-boundary] Classic external scripts are not permitted; use a module script',
		)
	}
	const decoded = decodeAssetSource(data.value)
	const source = decoded?.trim()
	if (source !== undefined && hasAsciiUrlControl(source)) {
		throw new Error(
			'[orkestrel-environment-boundary] Environment module URLs cannot contain ASCII controls',
		)
	}
	if (
		source === undefined ||
		source.length === 0 ||
		source !== decoded ||
		/&#(?:[0-9]+|[xX][0-9A-Fa-f]+);?/u.test(source) ||
		/&[A-Za-z][A-Za-z0-9]+;/u.test(source) ||
		source.includes('\\t') ||
		source.includes('\\n') ||
		source.includes('\\r') ||
		source.startsWith('#') ||
		source.startsWith('//') ||
		/^[A-Za-z][A-Za-z0-9+.-]*:/u.test(source)
	) {
		throw new Error(
			'[orkestrel-environment-boundary] Module script URLs must remain in the local Vite graph',
		)
	}
	return false
}

${EXPORT_KEYWORD} function filterHtmlMetaSource(
	data: Parameters<NonNullable<HtmlAssetSource['filter']>>[0],
): boolean {
	const name = data.attributes.name?.trim().toLowerCase()
	const property = data.attributes.property?.trim().toLowerCase()
	const asset =
		name === 'msapplication-tileimage' ||
		name === 'msapplication-square70x70logo' ||
		name === 'msapplication-square150x150logo' ||
		name === 'msapplication-wide310x150logo' ||
		name === 'msapplication-square310x310logo' ||
		name === 'msapplication-config' ||
		name === 'twitter:image' ||
		property === 'og:image' ||
		property === 'og:image:url' ||
		property === 'og:image:secure_url' ||
		property === 'og:audio' ||
		property === 'og:audio:secure_url' ||
		property === 'og:video' ||
		property === 'og:video:secure_url'
	return asset ? filterHtmlAssetSource(data) : false
}

${EXPORT_KEYWORD} function environmentHtml(): HTMLOptions {
	return {
		additionalAssetSources: {
			audio: { srcAttributes: ['src'], filter: filterHtmlAssetSource },
			embed: { srcAttributes: ['src'], filter: filterHtmlAssetSource },
			image: { srcAttributes: ['href', 'xlink:href'], filter: filterHtmlAssetSource },
			img: {
				srcAttributes: ['src'],
				srcsetAttributes: ['srcset'],
				filter: filterHtmlAssetSource,
			},
			input: { srcAttributes: ['src'], filter: filterHtmlAssetSource },
			link: {
				srcAttributes: ['href'],
				srcsetAttributes: ['imagesrcset'],
				filter: filterHtmlAssetSource,
			},
			meta: { srcAttributes: ['content'], filter: filterHtmlMetaSource },
			object: { srcAttributes: ['data'], filter: filterHtmlAssetSource },
			script: {
				srcAttributes: ['href', 'src', 'xlink:href'],
				filter: filterHtmlScriptSource,
			},
			source: {
				srcAttributes: ['src'],
				srcsetAttributes: ['srcset'],
				filter: filterHtmlAssetSource,
			},
			track: { srcAttributes: ['src'], filter: filterHtmlAssetSource },
			use: { srcAttributes: ['href', 'xlink:href'], filter: filterHtmlAssetSource },
			video: { srcAttributes: ['src', 'poster'], filter: filterHtmlAssetSource },
		},
	}
}

${EXPORT_KEYWORD} ${CONST_KEYWORD} HTML_SECURITY_POLICY =
	"base-uri 'none'; object-src 'none'; script-src 'self'; script-src-attr 'none'"
${EXPORT_KEYWORD} ${CONST_KEYWORD} HTML_SECURITY_META =
	'<meta\\n\\t\\t\\thttp-equiv="Content-Security-Policy"\\n\\t\\t\\tcontent="' +
	HTML_SECURITY_POLICY +
	'"\\n\\t\\t/>'
${EXPORT_KEYWORD} ${CONST_KEYWORD} HTML_SECURITY_PREFIX =
	'<!doctype html>\\n<html lang="en">\\n\\t<head>\\n\\t\\t' + HTML_SECURITY_META + '\\n'${
		needsShowcase
			? `
${EXPORT_KEYWORD} ${CONST_KEYWORD} SHOWCASE_SECURITY_POLICY =
	"default-src 'none'; base-uri 'none'; object-src 'none'; script-src 'self'; style-src 'unsafe-inline'; img-src data:; font-src data:; script-src-attr 'none'"
${EXPORT_KEYWORD} ${CONST_KEYWORD} SHOWCASE_SECURITY_META =
	'<meta\\n\\t\\t\\thttp-equiv="Content-Security-Policy"\\n\\t\\t\\tcontent="' +
	SHOWCASE_SECURITY_POLICY +
	'"\\n\\t\\t/>'
${EXPORT_KEYWORD} ${CONST_KEYWORD} SHOWCASE_SECURITY_PREFIX =
	'<!doctype html>\\n<html lang="en">\\n\\t<head>\\n\\t\\t' + SHOWCASE_SECURITY_META + '\\n'
${EXPORT_KEYWORD} ${CONST_KEYWORD} SHOWCASE_BUILD_SECURITY_POLICY =
	"default-src 'none'; base-uri 'none'; object-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; script-src-attr 'none'"
${EXPORT_KEYWORD} ${CONST_KEYWORD} SHOWCASE_BUILD_SECURITY_META =
	'<meta\\n\\t\\t\\thttp-equiv="Content-Security-Policy"\\n\\t\\t\\tcontent="' +
	SHOWCASE_BUILD_SECURITY_POLICY +
	'"\\n\\t\\t/>'
`
			: ''
	}

${EXPORT_KEYWORD} function maskIgnoredHtml${
				needsShowcase
					? `(
	environmentKeys: ReadonlySet<string>,
	html: string,
	security: string,
)`
					: `(environmentKeys: ReadonlySet<string>, html: string)`
			}: string {
	if (!html.replaceAll('\\r\\n', '\\n').startsWith(${
		needsShowcase ? 'security' : 'HTML_SECURITY_PREFIX'
	})) {
		throw new Error(
			'[orkestrel-environment-boundary] Browser HTML must preserve the generated security prologue',
		)
	}
	for (const match of html.matchAll(/%(\\S+?)%/gu)) {
		const key = match[1]
		if (key !== undefined && environmentKeys.has(key)) {
			throw new Error(
				'[orkestrel-environment-boundary] HTML environment substitution is not permitted; import environment values from a module',
			)
		}
	}
	const escaped = html.replace(
		/(?<prefix>[vV][iI][tT][eE])&#(?<zeros>0*)45;(?<suffix>[iI][gG][nN][oO][rR][eE])/gu,
		'$<prefix>&#0$<zeros>45;$<suffix>',
	)
	return escaped.replace(
		/(?<prefix>[vV][iI][tT][eE])-(?<suffix>[iI][gG][nN][oO][rR][eE])/gu,
		'$<prefix>&#45;$<suffix>',
	)
}

`
		: ''
}${
		needsVue
			? `${EXPORT_KEYWORD} function restoreIgnoredHtml(code: string): string {
	const literals = code.replace(
		/(?<prefix>[vV][iI][tT][eE])&#45;(?<suffix>[iI][gG][nN][oO][rR][eE])/gu,
		'$<prefix>-$<suffix>',
	)
	return literals.replace(
		/(?<prefix>[vV][iI][tT][eE])&#0(?<zeros>0*)45;(?<suffix>[iI][gG][nN][oO][rR][eE])/gu,
		'$<prefix>&#$<zeros>45;$<suffix>',
	)
}

${
	needsShowcase
		? `${EXPORT_KEYWORD} function isShowcaseHtmlEntry(filename: string): boolean {
	return (
		physicalPath(filename) ===
		physicalPath(resolvePath(WORKSPACE_ROOT, 'app/browser/showcase.html'))
	)
}

`
		: ''
}${EXPORT_KEYWORD} function isBrowserHtmlEntry(filename: string): boolean {
	${
		needsShowcase
			? `return (
		isShowcaseHtmlEntry(filename) ||
		physicalPath(filename) === physicalPath(resolvePath(WORKSPACE_ROOT, 'app/browser/index.html'))
	)`
			: `return (
		physicalPath(filename) === physicalPath(resolvePath(WORKSPACE_ROOT, 'app/browser/index.html'))
	)`
	}
}${
					needsShowcase
						? `

${EXPORT_KEYWORD} function browserHtmlSecurityPrefix(filename: string): string | undefined {
	if (!isBrowserHtmlEntry(filename)) return undefined
	return isShowcaseHtmlEntry(filename) ? SHOWCASE_SECURITY_PREFIX : HTML_SECURITY_PREFIX
}

${EXPORT_KEYWORD} function browserHtmlSecurityMeta(filename: string, built: boolean): string | undefined {
	if (!isBrowserHtmlEntry(filename)) return undefined
	if (!isShowcaseHtmlEntry(filename)) return HTML_SECURITY_META
	return built ? SHOWCASE_BUILD_SECURITY_META : SHOWCASE_SECURITY_META
}`
						: ''
				}

${EXPORT_KEYWORD} function prepareHtml(): Plugin {
	const environmentKeys = new Set<string>()
	return {
		name: 'orkestrel-html-boundary-prepare',
		enforce: 'post',
		configResolved(config) {
			for (const key of Object.keys(config.env)) environmentKeys.add(key)
			for (const key of Object.keys(config.define ?? {})) {
				if (key.startsWith(IMPORT_META_ENV_PREFIX)) {
					environmentKeys.add(key.slice(IMPORT_META_ENV_PREFIX.length))
				}
			}
		},
		transformIndexHtml: {
			order: 'pre',
			handler(html, context) {
				${
					needsShowcase
						? `const security = browserHtmlSecurityPrefix(context.filename)
				if (security === undefined) return undefined
				return maskIgnoredHtml(environmentKeys, html, security)`
						: `if (!isBrowserHtmlEntry(context.filename)) return undefined
				return maskIgnoredHtml(environmentKeys, html)`
				}
			},
		},
	}
}

${EXPORT_KEYWORD} function restoreHtml(): Plugin {
	return {
		name: 'orkestrel-html-boundary-restore',
		enforce: 'pre',
		transformIndexHtml(html, context) {
			if (!isBrowserHtmlEntry(context.filename)) return undefined
			return restoreIgnoredHtml(html)
		},
	}
}

${EXPORT_KEYWORD} function finalizeHtml(): Plugin {
	return {
		name: 'orkestrel-html-boundary-finalize',
		enforce: 'post',
		transformIndexHtml: {
			order: 'post',
			handler(html, context) {
				${
					needsShowcase
						? `const security = browserHtmlSecurityMeta(
					context.filename,
					context.bundle !== undefined,
				)
				if (security === undefined) return undefined
				if (!html.includes(security)) {`
						: `if (!isBrowserHtmlEntry(context.filename)) return undefined
				if (!html.includes(HTML_SECURITY_META)) {`
				}
					throw new Error(
						'[orkestrel-environment-boundary] Browser HTML must retain its security policy',
					)
				}
			},
		},
	}
}

`
			: ''
	}${
		needsShowcase
			? `${EXPORT_KEYWORD} function showcaseHtml(): Plugin {
	return {
		name: 'orkestrel-showcase-html',
		transformIndexHtml: {
			order: 'post',
			handler(html, context) {
				if (!isShowcaseHtmlEntry(context.filename) || context.bundle === undefined) {
					return undefined
				}
				if (!html.includes(SHOWCASE_SECURITY_META)) {
					throw new Error(
						'[orkestrel-showcase-html] Showcase build did not retain its development security policy',
					)
				}
				const secured = html.replace(SHOWCASE_SECURITY_META, SHOWCASE_BUILD_SECURITY_META)
				const build = createHash('sha256').update(secured).digest('hex')
				return {
					html: secured,
					tags: [
						{
							tag: 'meta',
							attrs: { name: 'build-id', content: build },
							injectTo: 'head',
						},
					],
				}
			},
		},
		generateBundle: {
			order: 'post',
			handler(_options, bundle) {
				let html: (typeof bundle)[string] | undefined
				for (const output of Object.values(bundle)) {
					if (!output.fileName.endsWith('.html')) continue
					if (html !== undefined) {
						this.error('[orkestrel-showcase-html] Showcase build emitted multiple HTML entries')
					}
					html = output
				}
				if (html === undefined) {
					this.error('[orkestrel-showcase-html] Showcase build did not emit an HTML entry')
				}
				html.fileName = 'index.html'
			},
		},
	}
}

`
			: ''
	}${EXPORT_KEYWORD} async function environmentAssetSources(
	code: string,
	id: string,
	emitted = false,
): Promise<readonly string[]> {
	const [path] = id.split('?')
	if (
		path === undefined ||
		(!/\\.[cm]?[jt]sx?$/.test(path) && !/[?&]html-proxy(?:[=&]|$)/.test(id))
	) {
		return []
	}
	const sources: string[] = []
	const transformed = await transformWithOxc(code, path)
	const visitor = new Visitor({
		ImportExpression(node) {
			if (emitted) return
			let value: string | undefined
			if (node.source.type === 'Literal' && typeof node.source.value === 'string') {
				value = node.source.value
			} else if (node.source.type === 'TemplateLiteral' && node.source.expressions.length === 0) {
				value = node.source.quasis.map((quasi) => quasi.value.cooked ?? quasi.value.raw).join('')
			} else {
				throw new Error(
					'[orkestrel-environment-boundary] Dynamic imports must use static string values',
				)
			}
			const decoded = decodeAssetSource(value)
			if (decoded === undefined) {
				throw new Error('[orkestrel-environment-boundary] Module URLs must use valid URI encoding')
			}
			sources.push(decoded)
		},
		NewExpression(node) {
			if (emitted) return
			const [source, base] = node.arguments
			if (
				node.callee.type !== 'Identifier' ||
				node.callee.name !== 'URL' ||
				base?.type !== 'MemberExpression' ||
				base.object.type !== 'MetaProperty' ||
				base.object.meta.name !== 'import' ||
				base.object.property.name !== 'meta' ||
				base.property.type !== 'Identifier' ||
				base.property.name !== 'url'
			) {
				return
			}
			let value: string | undefined
			if (source?.type === 'Literal' && typeof source.value === 'string') {
				const decoded = decodeAssetSource(source.value)
				if (decoded === undefined) {
					throw new Error('[orkestrel-environment-boundary] Asset URLs must use valid URI encoding')
				}
				value = decoded
			} else if (source?.type === 'TemplateLiteral') {
				const decodedQuasis: string[] = []
				for (const quasi of source.quasis) {
					const decoded = decodeAssetSource(quasi.value.cooked ?? quasi.value.raw)
					if (decoded === undefined) {
						throw new Error(
							'[orkestrel-environment-boundary] Asset URLs must use valid URI encoding',
						)
					}
					decodedQuasis.push(decoded)
				}
				if (source.expressions.length > 0) {
					throw new Error(
						'[orkestrel-environment-boundary] Asset URLs must use static string values',
					)
				}
				value = decodedQuasis.join('__orkestrel__')
			} else {
				throw new Error('[orkestrel-environment-boundary] Asset URLs must use static string values')
			}
			if (value === undefined) return
			if (
				value.startsWith('.') ||
				value.startsWith('/') ||
				/^file:/i.test(value) ||
				/^[A-Za-z]:[\\\\/]/.test(value)
			) {
				sources.push(value)
			}
		},
	})
	visitor.visit(parseSync(path, transformed.code).program)
	return sources
}

${EXPORT_KEYWORD} function environmentBoundary(
	owner: 'src/core' | 'src/browser' | 'src/server' | 'app/core' | 'app/browser' | 'app/server',
): Plugin {
	const trustedPackageRoots = new Set<string>()${
		needsOutput ? '\n\tlet environmentRoot = WORKSPACE_ROOT' : ''
	}${needsBrowser ? '\n\tlet resolvedConfig: ResolvedConfig | undefined' : ''}
	return {
		name: 'orkestrel-environment-boundary',
		enforce: 'pre',${
			needsOutput || needsBrowser
				? `
		configResolved(config) {${
			needsOutput ? '\n\t\t\tenvironmentRoot = physicalPath(config.root)' : ''
		}${needsBrowser ? '\n\t\t\tresolvedConfig = config' : ''}
		},`
				: ''
		}
${
	needsVue
		? `		configureServer(server) {
			if (owner !== 'app/browser') return
			const roots = browserServerRoots()
			server.middlewares.use((request, response, next) => {
				const path = browserServerPath(request.url, environmentRoot)
				if (isBrowserServerPathAllowed(path, roots)) {
					next()
					return
				}
				response.statusCode = 403
				response.setHeader('cache-control', 'no-store')
				response.setHeader('content-type', 'text/plain; charset=utf-8')
				response.end(request.method === 'HEAD' ? undefined : 'Forbidden\\n')
			})
		},
`
		: ''
}		async resolveId(source, importer) {
			if (importer === undefined || !isWorkspaceBoundaryModule(importer)) return null
			if (isBoundaryExemptModule(source)) return null
			const normalizedSource = source.replaceAll('\\\\', '/')
			const sourceError = environmentSourceError(owner, normalizedSource)
			if (sourceError !== undefined) this.error(sourceError)
			const importerPath = workspacePath(importer)
			const physicalImporter = physicalPath(importer)
			const importerPackageRoot = trustedPackageRootFor(physicalImporter, trustedPackageRoots)
			if (importerPath === undefined && importerPackageRoot === undefined) return null
			const [layer, environment] = importerPath?.split('/') ?? []
			if (
				importerPackageRoot === undefined &&
				((layer !== 'app' && layer !== 'src') ||
					(environment !== 'core' && environment !== 'browser' && environment !== 'server'))
			) {
				return null
			}
			const pathLike =
				normalizedSource.startsWith('.') ||
				normalizedSource.startsWith('/') ||
				/^file:/i.test(normalizedSource) ||
				/^[A-Za-z]:[\\\\/]/.test(normalizedSource)
			const fallbackSource =
				normalizedSource.startsWith('.') ||
				normalizedSource.startsWith('/') ||
				/^file:/i.test(normalizedSource)
					? sourceFallback(physicalImporter, normalizedSource)
					: ''
			const resolution = await this.resolve(source, importer, { skipSelf: true })
			const [resolvedId] = resolution?.id.split('?') ?? []
			const physicalResolution = resolvedId === undefined ? undefined : physicalPath(resolvedId)
			if (
				importerPackageRoot !== undefined &&
				(pathLike || normalizedSource.startsWith('#')) &&
				physicalResolution !== undefined &&
				!containedPath(importerPackageRoot, physicalResolution)
			) {
				if (normalizedSource.startsWith('#')) {
					const mappedPackageRoot =
						workspacePath(physicalResolution) === undefined
							? packageRootForResolved(physicalResolution)
							: undefined
					if (mappedPackageRoot === undefined) {
						return this.error(
							'Dependency package imports must resolve inside an exact physical package root',
						)
					}
					trustedPackageRoots.add(mappedPackageRoot)
				} else {
					this.error('Dependency modules cannot import files outside their physical package root')
				}
			}
			if (
				!pathLike &&
				!normalizedSource.startsWith('#') &&
				physicalResolution !== undefined &&
				workspacePath(physicalResolution) === undefined
			) {
				const packageName = packageNameOf(normalizedSource)
				const packageRoot =
					packageName === undefined ? undefined : packageRootOf(packageName, physicalResolution)
				if (packageRoot === undefined || !containedPath(packageRoot, physicalResolution)) {
					return this.error('Resolved dependencies must remain inside their physical package root')
				}
				trustedPackageRoots.add(packageRoot)
			}
			const resolvedSource = workspacePath(resolution?.id ?? fallbackSource)
			if (pathLike && resolvedSource === undefined && importerPackageRoot === undefined) {
				this.error('Environment modules cannot import files outside the workspace')
			}
			const pathError =
				resolvedSource === undefined
					? undefined
					: environmentPathError(\`\${layer}/\${environment}\`, resolvedSource)
			if (pathError !== undefined) this.error(pathError)
			return null
		},
		async load(id) {
			if (!isWorkspaceBoundaryModule(id)) return null
			const physicalImporter = physicalPath(id)
			const trustedPackageRoot = trustedPackageRootFor(physicalImporter, trustedPackageRoots)
			const inferredPackageRoot =
				trustedPackageRoot === undefined ? packageRootForResolved(physicalImporter) : undefined
			const packageRoot =
				trustedPackageRoot ??
				(inferredPackageRoot !== undefined && isPackageBoundary(inferredPackageRoot)
					? inferredPackageRoot
					: undefined)
			if (packageRoot === undefined || !/\\.[cm]?[jt]sx?$/.test(physicalImporter)) {
				return null
			}
			const code = readBoundedFile(physicalImporter, ENVIRONMENT_MODULE_BYTES)
			if (code === undefined) {
				return this.error('Dependency module source must be a bounded regular file')
			}
			for (const source of await environmentAssetSources(code, id)) {
				const normalizedSource = source.replaceAll('\\\\', '/')
				const sourceError = environmentSourceError(owner, normalizedSource)
				if (sourceError !== undefined) this.error(sourceError)
				const sourcePathError = environmentPathError(owner, normalizedSource)
				if (sourcePathError !== undefined) this.error(sourcePathError)
				const pathLike =
					normalizedSource.startsWith('.') ||
					normalizedSource.startsWith('/') ||
					/^file:/i.test(normalizedSource) ||
					/^[A-Za-z]:[\\\\/]/.test(normalizedSource)
				if (
					pathLike &&
					!containedPath(
						packageRoot,
						physicalPath(sourceFallback(physicalImporter, normalizedSource)),
					)
				) {
					this.error('Dependency modules cannot import files outside their physical package root')
				}
			}
			return null
		},${
			needsOutput
				? `
		async generateBundle(_options, bundle) {
			for (const output of Object.values(bundle)) {
				if (output.type === 'chunk') {
					for (const source of await environmentAssetSources(
						output.code,
						output.fileName.endsWith('.js') ? output.fileName : \`\${output.fileName}.js\`,
						true,
					)) {
						const normalizedSource = source.replaceAll('\\\\', '/')
						const sourceError = environmentSourceError(owner, normalizedSource)
						if (sourceError !== undefined) this.error(sourceError)
					}
					continue
				}
				for (const original of output.originalFileNames) {
					const physical = physicalPath(
						isAbsolute(original) ? original : resolvePath(environmentRoot, original),
					)
					if (isBoundaryExemptModule(original) || isBoundaryExemptModule(physical)) continue
					const target = workspacePath(physical)
					if (target === undefined) {
						if (trustedPackageRootFor(physical, trustedPackageRoots) === undefined) {
							this.error('Environment modules cannot import files outside the workspace')
						}
						continue
					}
					const pathError = environmentPathError(owner, target)
					if (pathError !== undefined) this.error(pathError)
				}
			}
		},`
				: ''
		}
		buildEnd(error) {
			if (error !== undefined) return
			for (const id of this.getModuleIds()) {
				if (!isWorkspaceBoundaryModule(id)) continue
				const target = workspacePath(id)
				if (target === undefined) {
					if (
						isOutsideWorkspacePath(id) &&
						trustedPackageRootFor(physicalPath(id), trustedPackageRoots) === undefined
					) {
						this.error('Environment modules cannot import files outside the workspace')
					}
					continue
				}
				const pathError = environmentPathError(owner, target)
				if (pathError !== undefined) this.error(pathError)
			}
		}${vueBoundary},
	}
}
`
	const viteImports = needsBrowser
		? `import { isCSSRequest, parseSync, preprocessCSS, transformWithOxc, Visitor } from 'vite'
`
		: `import { parseSync, transformWithOxc, Visitor } from 'vite'
`
	return `${playwrightTypeImports}${viteTypeImports}
${viteImports}import { defineConfig, mergeConfig } from 'vitest/config'
import tsconfig from './tsconfig.json' with { type: 'json' }
import { fileURLToPath, URL } from 'node:url'
${showcaseHashImport}import { isBuiltin } from 'node:module'
import {
${needsBrowser ? '\taccessSync,\n' : ''}	closeSync,
	constants as FS_CONSTANTS,
	existsSync,
	fstatSync,
	lstatSync,
	openSync,
${needsBrowser ? '\treaddirSync,\n' : ''}	readSync,
	realpathSync,
${needsBrowser ? '\tstatSync,\n' : ''}} from 'node:fs'
${
	needsBrowser
		? `import {
	basename,
	join,
	dirname,
	isAbsolute,
	relative,
	resolve as resolvePath,
	sep,
} from 'node:path'`
		: `import { dirname, isAbsolute, relative, resolve as resolvePath, sep } from 'node:path'`
}
${playwrightImports}${vueImports}${showcaseImports}${
		needsBrowser
			? `\n/** Chromium executable layouts inside a \`chromium-<revision>\` browsers-directory entry, per platform. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} CHROMIUM_LAYOUTS = Object.freeze([
	'chrome-linux/chrome',
	'chrome-linux64/chrome',
	'chrome-win/chrome.exe',
	'chrome-win64/chrome.exe',
	'chrome-mac/Chromium.app/Contents/MacOS/Chromium',
	'chrome-mac-arm64/Chromium.app/Contents/MacOS/Chromium',
])

/** Stable Playwright Chromium channels and their standard executable layouts. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} SYSTEM_BROWSER_CHANNELS = Object.freeze([
	Object.freeze({
		channel: 'chrome',
		layouts: Object.freeze({
			linux: '/opt/google/chrome/chrome',
			darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
			win32: Object.freeze(['Google', 'Chrome', 'Application', 'chrome.exe']),
		}),
	}),
	Object.freeze({
		channel: 'msedge',
		layouts: Object.freeze({
			linux: '/opt/microsoft/msedge/msedge',
			darwin: '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
			win32: Object.freeze(['Microsoft', 'Edge', 'Application', 'msedge.exe']),
		}),
	}),
])

/**
 * Determine whether a path identifies an executable regular file.
 *
 * @param path - The filesystem path to inspect.
 * @returns Whether the path is a regular file with execute access.
 *
 * @example
 * \`\`\`ts
 * isBrowserExecutable('/opt/google/chrome/chrome')
 * \`\`\`
 */
${EXPORT_KEYWORD} function isBrowserExecutable(path: string): boolean {
	try {
		if (!statSync(path).isFile()) return false
		accessSync(path, FS_CONSTANTS.X_OK)
		return true
	} catch {
		return false
	}
}

/**
 * Resolve a launchable Playwright-managed Chromium executable: the pinned revision when installed,
 * otherwise a \`chromium\` / \`chromium.exe\` alias or any other \`chromium-*\`
 * revision under the same Playwright browsers directory. A pinned-revision miss
 * is not Chromium absence — managed containers ship one usable build (often
 * behind a revision-agnostic alias) for many Playwright versions.
 *
 * @param pinned - The executable path for Playwright's pinned Chromium revision.
 * @returns The managed executable path, or \`undefined\` when none is executable.
 *
 * @example
 * \`\`\`ts
 * resolveManagedBrowser(chromium.executablePath())
 * \`\`\`
 */
${EXPORT_KEYWORD} function resolveManagedBrowser(pinned: string): string | undefined {
	if (isBrowserExecutable(pinned)) return pinned
	let revisionRoot = dirname(pinned)
	for (;;) {
		if (/^chromium-\\d+$/.test(basename(revisionRoot))) break
		const parent = dirname(revisionRoot)
		if (parent === revisionRoot) return undefined
		revisionRoot = parent
	}
	const browsersRoot = dirname(revisionRoot)
	for (const alias of ['chromium', 'chromium.exe']) {
		const candidate = resolvePath(browsersRoot, alias)
		if (isBrowserExecutable(candidate)) return candidate
	}
	let entries: readonly string[]
	try {
		entries = readdirSync(browsersRoot)
	} catch {
		return undefined
	}
	const revisions = entries
		.filter((entry) => /^chromium-\\d+$/.test(entry))
		.sort((a, b) => Number(b.slice('chromium-'.length)) - Number(a.slice('chromium-'.length)))
	for (const revision of revisions) {
		for (const layout of CHROMIUM_LAYOUTS) {
			const candidate = resolvePath(browsersRoot, revision, layout)
			if (isBrowserExecutable(candidate)) return candidate
		}
	}
	return undefined
}

/**
 * Resolve the first installed stable system Chromium channel.
 *
 * @param platform - The Node platform whose standard layouts should be probed.
 * @param environment - The process environment supplying Windows installation roots.
 * @returns \`chrome\`, then \`msedge\`, or \`undefined\` when neither is executable.
 *
 * @example
 * \`\`\`ts
 * resolveSystemBrowser(process.platform, process.env)
 * \`\`\`
 */
${EXPORT_KEYWORD} function resolveSystemBrowser(
	platform: NodeJS.Platform,
	environment: NodeJS.ProcessEnv,
): string | undefined {
	if (platform !== 'linux' && platform !== 'darwin' && platform !== 'win32') return undefined
	const roots = new Set<string>()
	if (platform === 'win32') {
		for (const root of [
			environment.LOCALAPPDATA,
			environment.PROGRAMFILES,
			environment['PROGRAMFILES(X86)'],
		]) {
			if (root !== undefined && root.length > 0) roots.add(root)
		}
		const homeDrive = environment.HOMEDRIVE
		if (homeDrive !== undefined && homeDrive.length > 0) {
			roots.add(join(homeDrive, 'Program Files'))
			roots.add(join(homeDrive, 'Program Files (x86)'))
		}
	}
	for (const browser of SYSTEM_BROWSER_CHANNELS) {
		if (platform === 'win32') {
			for (const root of roots) {
				if (isBrowserExecutable(join(root, ...browser.layouts.win32))) return browser.channel
			}
			continue
		}
		if (isBrowserExecutable(browser.layouts[platform])) return browser.channel
	}
	return undefined
}

/**
 * Resolve launch options for a managed Chromium or stable system browser.
 *
 * @param pinned - The executable path for Playwright's pinned Chromium revision.
 * @param platform - The Node platform whose standard system layouts should be probed.
 * @param environment - The process environment supplying Windows installation roots.
 * @returns Provider options for managed Chromium, Chrome, or Edge, or \`undefined\`.
 *
 * @remarks
 * An installed pinned revision returns an empty object so Playwright retains
 * its default launch semantics. A different managed executable is selected by
 * path; a system browser is selected by its stable Playwright channel.
 *
 * @example
 * \`\`\`ts
 * resolveBrowser(chromium.executablePath(), process.platform, process.env)
 * \`\`\`
 */
${EXPORT_KEYWORD} function resolveBrowser(
	pinned: string,
	platform: NodeJS.Platform,
	environment: NodeJS.ProcessEnv,
): PlaywrightProviderOptions | undefined {
	const managed = resolveManagedBrowser(pinned)
	if (managed !== undefined) {
		return managed === pinned ? {} : { launchOptions: { executablePath: managed } }
	}
	const channel = resolveSystemBrowser(platform, environment)
	return channel === undefined ? undefined : { launchOptions: { channel } }
}

${CONST_KEYWORD} browserPinned = chromium.executablePath()
${CONST_KEYWORD} browserOptions = resolveBrowser(browserPinned, process.platform, process.env)
`
			: ''
	}
${EXPORT_KEYWORD} function resolveWorkspacePath(relativePath: string): string {
	return fileURLToPath(new URL(relativePath, import.meta.url))
}

${EXPORT_KEYWORD} function hasAsciiUrlControl(value: string): boolean {
	for (const character of value) {
		const code = character.codePointAt(0)
		if (code !== undefined && (code <= 0x1f || code === 0x7f)) return true
	}
	return false
}

${CONST_KEYWORD} resolve = {
	alias: Object.entries(tsconfig.compilerOptions.paths).reduce((a, [k, v]) => {
		const [path] = v
		if (path === undefined) throw new Error(\`tsconfig path alias \${k} has no target\`)
		return Object.assign(a, { [k]: resolveWorkspacePath(path) })
	}, {}),
}

${
	needsBrowser
		? `${EXPORT_KEYWORD} function gateBrowserProjects(
	registrations: readonly {
		readonly project: () => UserConfig
		readonly browser?: string
	}[],
	available: boolean,
	argv: readonly string[],
): NonNullable<UserConfig['test']> {
	const projects: UserConfig[] = []
	const gated: string[] = []
	for (const registration of registrations) {
		if (registration.browser !== undefined && !available) {
			gated.push(registration.browser)
			projects.push({
				resolve,
				test: {
					name: { label: registration.browser, color: 'yellow' },
					include: [],
					environment: 'node',
					browser: { enabled: false },
				},
			})
			continue
		}
		projects.push(registration.project())
	}
	if (gated.length === 0) return { projects }
	console.warn(
		\`browser projects skipped: no Playwright Chromium, Chrome, or Edge found (\${gated.join(', ')})\`,
	)
	const filters: string[] = []
	let readable = true
	for (let index = 0; index < argv.length; index += 1) {
		const argument = argv[index]
		if (argument === '--project') {
			const filter = argv[index + 1]
			if (filter === undefined) {
				readable = false
				continue
			}
			filters.push(filter)
			index += 1
			continue
		}
		if (argument?.startsWith('--project=') === true) {
			filters.push(argument.slice('--project='.length))
		}
	}
	return readable && filters.length > 0 && filters.every((filter) => gated.includes(filter))
		? { passWithNoTests: true, projects }
		: { projects }
}

${EXPORT_KEYWORD} ${CONST_KEYWORD} ENVIRONMENT_CSS = Object.freeze({
	transformer: 'lightningcss',
	lightningcss: {
		visitor: () => {
			let sources: readonly string[] = []
			let source: string | undefined
			return {
				StyleSheet(stylesheet) {
					sources = stylesheet.sources
				},
				Rule(rule) {
					source =
						'value' in rule && rule.value !== null && 'loc' in rule.value
							? sources[rule.value.loc.source_index]
							: undefined
					if (rule.type !== 'import' || rule.value === null) return
					const error = stylesheetAssetError(source, rule.value.url)
					if (error !== undefined) {
						throw new Error(\`[orkestrel-environment-boundary] \${error}\`)
					}
				},
				Url(asset) {
					const error = stylesheetAssetError(source, asset.url)
					if (error !== undefined) {
						throw new Error(\`[orkestrel-environment-boundary] \${error}\`)
					}
				},
			}
		},
	},
} satisfies CSSOptions)

/** Prevent the Vitest browser mid-run "optimized dependencies changed, reloading" stall. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} BROWSER_TEST_DEPENDENCIES = Object.freeze([
	'@vitest/browser/client',
	'vitest/browser',
	'vitest/internal/browser',
	'vitest',
])
`
		: ''
}${EXPORT_KEYWORD} ${CONST_KEYWORD} PACKAGE_MANIFEST_BYTES = 1_048_576
${EXPORT_KEYWORD} ${CONST_KEYWORD} ENVIRONMENT_MODULE_BYTES = 8_388_608
${environmentBoundary}`
}

/**
 * Build the dedicated standalone Node-only repository-policy Vitest project.
 *
 * @returns The emitted `policy` project definition.
 *
 * @example
 * ```ts
 * policyViteProject().includes("label: 'policy'") // true
 * ```
 */
export function policyViteProject(): string {
	return `${EXPORT_KEYWORD} const policy = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'policy', color: 'white' },
				include: ['tests/policy.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		config ?? {},
	)
`
}

/**
 * Build the standalone Node-only guide-parity Vitest project.
 *
 * @returns The emitted `guides` project definition.
 *
 * @example
 * ```ts
 * guidesViteProject().includes("label: 'guides'") // true
 * ```
 */
export function guidesViteProject(): string {
	return `${EXPORT_KEYWORD} const guides = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'guides', color: 'green' },
				include: ['tests/guides/**/*.test.ts'],
				exclude: ['tests/src/**/*.test.ts', 'tests/app/**/*.test.ts', 'tests/setup.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		config ?? {},
	)
`
}

/**
 * Build the executable's dedicated Node-only build and test project.
 *
 * @returns The emitted `srcBin` project definition.
 *
 * @example
 * ```ts
 * binViteProject().includes("label: 'src:bin'") // true
 * ```
 */
export function binViteProject(): string {
	return `${EXPORT_KEYWORD} const srcBin = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [outputBoundary('dist/bin')],
			build: {
				emptyOutDir: true,
				sourcemap: true,
				minify: false,
				lib: {
					entry: resolveWorkspacePath('src/bin/scaffold.ts'),
					formats: ['es'],
					fileName: () => 'scaffold.js',
				},
				outDir: 'dist/bin',
				target: 'node22',
				rolldownOptions: { external: [/^node:/, /^@orkestrel\\//, /^@src\\//] },
			},
			test: {
				name: { label: 'src:bin', color: 'yellow' },
				include: ['tests/src/bin/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		config ?? {},
	)
`
}

/**
 * Build the standalone Node-only installed-consumer integration proof project.
 *
 * @param facts - Optional structural facts controlling the shared global setup.
 * @returns The emitted `integration` project definition.
 *
 * @example
 * ```ts
 * integrationViteProject({ bin: true, integration: true, global: true }).includes(
 *   "globalSetup: ['./tests/setupGlobal.ts']",
 * ) // true
 * ```
 */
export function integrationViteProject(facts: ViteFacts = {}): string {
	const registrySetup =
		facts.bin === true && facts.integration === true && facts.global === true
			? `				// Wire the template registry for the generated-consumer proof.
				globalSetup: ['./${GLOBAL_SETUP_PATH}'],
`
			: ''
	return `${EXPORT_KEYWORD} const integration = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'integration', color: 'blue' },
				include: ['tests/integration/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts'],
${registrySetup}				environment: 'node',
				browser: { enabled: false },
				testTimeout: 120_000,
				hookTimeout: 120_000,
				fileParallelism: false,
			},
		},
		config ?? {},
	)
`
}

/**
 * Build the standalone Node-only live-service proof project.
 *
 * @returns The emitted `service` project definition.
 *
 * @example
 * ```ts
 * serviceViteProject().includes("label: 'service'") // true
 * ```
 */
export function serviceViteProject(): string {
	return `${EXPORT_KEYWORD} const service = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			test: {
				name: { label: 'service', color: 'red' },
				include: ['tests/service/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts', './tests/setupService.ts'],
				environment: 'node',
				browser: { enabled: false },
				testTimeout: 120_000,
				hookTimeout: 120_000,
				fileParallelism: false,
			},
		},
		config ?? {},
	)
`
}

/**
 * The single non-`core` environment's factory IS the base (Shape 3 of
 * `rootViteConfig`) — the environment's own `viteHeader` (Playwright only when
 * `environment === 'browser'`, per the live sqlite/indexeddb exemplars) prefixes
 * the environment-specific `srcBrowser` / `srcServer` project, followed by the
 * standalone policy and guides proof projects and any selected structural-axis
 * projects.
 *
 * @param environment - The sole declared non-`core` environment.
 * @param facts - Optional structural facts.
 * @returns The root `vite.config.ts` file content for a single non-`core` environment, newline-terminated.
 *
 * @example
 * ```ts
 * singleSrcViteConfig('server').includes('srcServer') // true
 * ```
 */
export function singleSrcViteConfig(
	environment: 'browser' | 'server',
	facts: ViteFacts = {},
): string {
	// Rendered blocks below are generated FILE TEXT, so every embedded
	// declaration keyword is interpolated rather than typed literally at
	// column 0 — the doc↔source parity scan (AGENTS §22) reads this file's
	// own source lines, and a flush-left `export const foo` inside a
	// template string is indistinguishable from a real module-scope export
	// to that line-based scan; interpolating the keyword keeps the emitted
	// bytes identical while keeping this file's own declaration environment
	// exactly the one export it documents.
	const machinery = viteMachinery([environment])
	const header = viteHeader(machinery)
	const registrations = viteProjectRegistrations([environment], [], facts)
	const renderedTest = renderViteTest(registrations, machinery.browser)
	const definitions = viteProjectDefinitions(facts)
	if (environment === 'browser') {
		return `${header}
${EXPORT_KEYWORD} const srcBrowser = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			css: ENVIRONMENT_CSS,
			publicDir: false,
			plugins: [outputBoundary('dist/src/browser'), environmentBoundary('src/browser')],
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
				${facts.global === true ? `globalSetup: ['./${GLOBAL_SETUP_PATH}'],\n\t\t\t\t` : ''}setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
				...(config?.test?.browser?.enabled === false
					? {}
					: {
							deps: {
								optimizer: {
									client: {
										enabled: true,
										include: [...BROWSER_TEST_DEPENDENCIES],
									},
								},
							},
						}),
				browser: {
					enabled: true,
					provider: playwright(browserOptions),
					instances: [{ browser: 'chromium', headless: true }],
				},
				fileParallelism: false,
			},
		},
		config ?? {},
	)

${definitions}
export default defineConfig({
	resolve,
${renderedTest}
})
`
	}
	return `${header}
${EXPORT_KEYWORD} const srcServer = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [outputBoundary('dist/src/server'), environmentBoundary('src/server')],
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
				target: 'node22',
				rolldownOptions: {
					platform: 'node',
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

${definitions}
export default defineConfig({
	resolve,
${renderedTest}
})
`
}

/**
 * The root `vite.config.ts` — three grounded shapes, chosen by a blueprint's
 * `src`:
 *   1. `core`-only — `srcCore` + standalone policy/guides proof projects, no
 *      Playwright at all (the live
 *      timeout exemplar: no browser project exists anywhere in the file).
 *   2. Multi-environment (2+ src, always including `core` per the live
 *      middleware/router exemplars) — `srcCore` is the shared base;
 *      `srcBrowser` / `srcServer` extend it and externalize `@src/core` to
 *      the sibling build. Playwright ships UNCONDITIONALLY (middleware
 *      carries it with no browser environment — grounded, not conditional).
 *   3. A single non-`core` environment (`browser`-only / `server`-only) — the
 *      environment factory itself IS the base (no `srcCore` to extend, so no
 *      dead `@src/core` externalize/remap either — there is no sibling
 *      core build), per the live sqlite (server-only) / indexeddb
 *      (browser-only) exemplars. Playwright ships only when the sole
 *      environment is `browser` (it must run its own tests in a real browser).
 *
 * @param src - The declared `Environment[]`.
 * @param facts - Optional structural facts. `bin` appends the standalone executable
 *   build-and-test project; `integration` and `service` append their standalone
 *   proof projects; `global` wires the shared global-setup module.
 * @returns The root `vite.config.ts` file content, newline-terminated.
 *
 * @example
 * ```ts
 * rootViteConfig(['core']).includes('srcCore') // true
 * ```
 */
export function rootViteConfig(src: readonly Environment[], facts: ViteFacts = {}): string {
	// Rendered blocks below are generated FILE TEXT, so every embedded
	// declaration keyword is interpolated rather than typed literally at
	// column 0 — the doc↔source parity scan (AGENTS §22) reads this file's
	// own source lines, and a flush-left `export const foo` inside a
	// template string is indistinguishable from a real module-scope export
	// to that line-based scan; interpolating the keyword keeps the emitted
	// bytes identical while keeping this file's own declaration environment
	// exactly the one export it documents.
	const hasCore = src.includes('core')
	const nonCore = ENVIRONMENTS.filter(
		(environment) => environment !== 'core' && src.includes(environment),
	)
	const machinery = viteMachinery(src)
	const header = viteHeader(machinery)

	if (!hasCore) {
		const [onlyEnvironment] = nonCore
		if (onlyEnvironment === 'browser' || onlyEnvironment === 'server') {
			return singleSrcViteConfig(onlyEnvironment, facts)
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
				css: ENVIRONMENT_CSS,
				publicDir: false,
				plugins: [outputBoundary('dist/src/browser'), environmentBoundary('src/browser')],
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
					${facts.global === true ? `globalSetup: ['./${GLOBAL_SETUP_PATH}'],\n\t\t\t\t\t` : ''}setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
					...(config?.test?.browser?.enabled === false
						? {}
						: {
								deps: {
									optimizer: {
										client: {
											enabled: true,
											include: [...BROWSER_TEST_DEPENDENCIES],
										},
									},
								},
							}),
					browser: {
						enabled: true,
						provider: playwright(browserOptions),
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
				publicDir: false,
				plugins: [outputBoundary('dist/src/server'), environmentBoundary('src/server')],
				build: {
					lib: {
						entry: resolveWorkspacePath('src/server/index.ts'),
						fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
					},
					outDir: 'dist/src/server',
					target: 'node22',
					rolldownOptions: {
						platform: 'node',
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
		.map((environment) => (environment === 'browser' ? browserBlock : serverBlock))
		.join('')
	const registrations = viteProjectRegistrations(src, [], facts)
	const renderedTest = renderViteTest(registrations, machinery.browser)
	const definitions = viteProjectDefinitions(facts)
	return `${header}
${EXPORT_KEYWORD} const srcCore = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
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
${blocks}
${definitions}
export default defineConfig({
	resolve,
${renderedTest}
})
`
}

/**
 * Build the root Vite/Vitest configuration for a workspace that includes
 * app environments, optionally alongside published src environments.
 *
 * @param src - Published src environments.
 * @param app - Private app environments.
 * @param facts - Optional structural facts.
 * @returns The root `vite.config.ts` content.
 *
 * @example
 * ```ts
 * applicationViteConfig([], ['core', 'server']).includes('appServer') // true
 * ```
 */
export function applicationViteConfig(
	src: readonly Environment[],
	app: readonly Environment[],
	facts: ViteFacts = {},
): string {
	const hasSourceCore = src.includes('core')
	const machinery = viteMachinery(src, app, facts.bin === true, facts.showcase === true)
	const header = viteHeader(machinery)
	const blocks: string[] = []

	if (src.includes('core')) {
		blocks.push(`
${EXPORT_KEYWORD} const srcCore = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [environmentBoundary('src/core')],
			build: { emptyOutDir: true, sourcemap: true, minify: false },
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
`)
	}
	if (src.includes('browser')) {
		const coreOutput = hasSourceCore
			? `
					output: { paths: { '@src/core': '../core/index.js' } },`
			: ''
		const coreExternal = hasSourceCore ? `id === '@src/core' || ` : ''
		blocks.push(`
${EXPORT_KEYWORD} const srcBrowser = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			css: ENVIRONMENT_CSS,
			publicDir: false,
			plugins: [outputBoundary('dist/src/browser'), environmentBoundary('src/browser')],
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
					external: (id: string) => ${coreExternal}id.startsWith('@orkestrel/'),${coreOutput}
				},
			},
			test: {
				name: { label: 'src:browser', color: 'yellow' },
				include: ['tests/src/browser/**/*.test.ts'],
				${hasSourceCore ? "exclude: ['tests/src/core/**/*.test.ts'],\n\t\t\t\t" : ''}${facts.global === true ? `globalSetup: ['./${GLOBAL_SETUP_PATH}'],\n\t\t\t\t` : ''}setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
				...(config?.test?.browser?.enabled === false
					? {}
					: {
							deps: {
								optimizer: {
									client: {
										enabled: true,
										include: [...BROWSER_TEST_DEPENDENCIES],
									},
								},
							},
						}),
				browser: {
					enabled: true,
					provider: playwright(browserOptions),
					instances: [{ browser: 'chromium', headless: true }],
				},
				fileParallelism: false,
			},
		},
		config ?? {},
	)
`)
	}
	if (src.includes('server')) {
		const coreOutput = hasSourceCore
			? `
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
					],`
			: ''
		const coreExternal = hasSourceCore ? `id === '@src/core' || ` : ''
		const formats = hasSourceCore ? '' : "\n\t\t\t\t\tformats: ['es', 'cjs'],"
		blocks.push(`
${EXPORT_KEYWORD} const srcServer = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [outputBoundary('dist/src/server'), environmentBoundary('src/server')],
			build: {
				emptyOutDir: true,
				sourcemap: true,
				minify: false,
				lib: {
					entry: resolveWorkspacePath('src/server/index.ts'),${formats}
					fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
				},
				outDir: 'dist/src/server',
				target: 'node22',
				rolldownOptions: {
					platform: 'node',
					external: (id: string) =>
						${coreExternal}id.startsWith('node:') || id.startsWith('@orkestrel/'),${coreOutput}
				},
			},
			test: {
				name: { label: 'src:server', color: 'red' },
				include: ['tests/src/server/**/*.test.ts'],
				${hasSourceCore ? "exclude: ['tests/src/core/**/*.test.ts'],\n\t\t\t\t" : ''}setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		config ?? {},
	)
`)
	}
	if (app.includes('core')) {
		blocks.push(`
${EXPORT_KEYWORD} const appCore = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [environmentBoundary('app/core')],
			test: {
				name: { label: '${APP_MATRIX.core.project}', color: 'cyan' },
				include: ['tests/app/core/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		config ?? {},
	)
`)
	}
	if (app.includes('browser')) {
		blocks.push(
			facts.showcase === true
				? `
${EXPORT_KEYWORD} function appBrowser(...config: never[]): UserConfig {
	if (config.length > 0) {
		throw new Error(
			'[orkestrel-environment-boundary] Browser configuration overrides are not permitted by the generated boundary',
		)
	}
	return {
		resolve,
		css: ENVIRONMENT_CSS,
		html: environmentHtml(),
		plugins: [
			restoreHtml(),
			outputBoundary('dist/app/browser'),
			environmentBoundary('app/browser'),
			vue(),
			prepareHtml(),
			finalizeHtml(),
		],
		root: resolveWorkspacePath('app/browser'),
		publicDir: false,
		server: {
			fs: {
				strict: true,
				allow: [...browserServerRoots()],
			},
		},
		build: {
			assetsInlineLimit: 0,
			emptyOutDir: true,
			outDir: resolveWorkspacePath('dist/app/browser'),
			rolldownOptions: {
				input: resolveWorkspacePath('${APP_MATRIX.browser.entry}'),
			},
		},
		test: {
			name: { label: '${APP_MATRIX.browser.project}', color: 'blue' },
			root: resolveWorkspacePath('.'),
			dir: resolveWorkspacePath('.'),
			include: ['tests/app/browser/**/*.test.ts'],
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			deps: {
				optimizer: {
					client: {
						enabled: true,
						include: ['vue', ...BROWSER_TEST_DEPENDENCIES],
					},
				},
			},
			browser: {
				enabled: true,
				provider: playwright(browserOptions),
				instances: [{ browser: 'chromium', headless: true }],
			},
			fileParallelism: false,
		},
	}
}

${EXPORT_KEYWORD} function appShowcase(...config: readonly never[]): UserConfig {
	if (config.length > 0) {
		throw new Error(
			'[orkestrel-environment-boundary] Showcase configuration overrides are not permitted by the generated boundary',
		)
	}
	return {
		base: './',
		resolve,
		css: ENVIRONMENT_CSS,
		html: environmentHtml(),
		plugins: [
			restoreHtml(),
			outputBoundary('dist/showcase'),
			environmentBoundary('app/browser'),
			vue(),
			prepareHtml(),
			showcaseHtml(),
			viteSingleFile({
				removeViteModuleLoader: true,
				useRecommendedBuildConfig: true,
			}),
			finalizeHtml(),
		],
		root: resolveWorkspacePath('app/browser'),
		publicDir: false,
		server: {
			open: '/showcase.html',
			fs: {
				strict: true,
				allow: [...browserServerRoots()],
			},
		},
		build: {
			assetsInlineLimit: Number.MAX_SAFE_INTEGER,
			cssMinify: 'lightningcss',
			emptyOutDir: true,
			minify: 'oxc',
			modulePreload: false,
			outDir: resolveWorkspacePath('dist/showcase'),
			reportCompressedSize: false,
			rolldownOptions: {
				input: resolveWorkspacePath('app/browser/showcase.html'),
			},
			sourcemap: false,
			target: 'esnext',
		},
	}
}
`
				: `
${EXPORT_KEYWORD} function appBrowser(...config: never[]): UserConfig {
	if (config.length > 0) {
		throw new Error(
			'[orkestrel-environment-boundary] Browser configuration overrides are not permitted by the generated boundary',
		)
	}
	return {
		resolve,
		css: ENVIRONMENT_CSS,
		html: environmentHtml(),
		plugins: [
			restoreHtml(),
			outputBoundary('dist/app/browser'),
			environmentBoundary('app/browser'),
			vue(),
			prepareHtml(),
			finalizeHtml(),
		],
		root: resolveWorkspacePath('app/browser'),
		publicDir: false,
		server: {
			fs: {
				strict: true,
				allow: [...browserServerRoots()],
			},
		},
		build: {
			assetsInlineLimit: 0,
			emptyOutDir: true,
			outDir: resolveWorkspacePath('dist/app/browser'),
			rolldownOptions: {
				input: resolveWorkspacePath('${APP_MATRIX.browser.entry}'),
			},
		},
		test: {
			name: { label: '${APP_MATRIX.browser.project}', color: 'blue' },
			root: resolveWorkspacePath('.'),
			dir: resolveWorkspacePath('.'),
			include: ['tests/app/browser/**/*.test.ts'],
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			deps: {
				optimizer: {
					client: {
						enabled: true,
						include: ['vue', ...BROWSER_TEST_DEPENDENCIES],
					},
				},
			},
			browser: {
				enabled: true,
				provider: playwright(browserOptions),
				instances: [{ browser: 'chromium', headless: true }],
			},
			fileParallelism: false,
		},
	}
}
`,
		)
	}
	if (app.includes('server')) {
		blocks.push(`
${EXPORT_KEYWORD} const appServer = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [outputBoundary('dist/app/server'), environmentBoundary('app/server')],
			build: {
				emptyOutDir: true,
				lib: {
					entry: resolveWorkspacePath('${APP_MATRIX.server.entry}'),
					formats: ['cjs'],
					fileName: () => 'main.cjs',
				},
				outDir: resolveWorkspacePath('dist/app/server'),
				target: 'node22',
				rolldownOptions: {
					external: (id: string) => id.startsWith('node:'),
				},
			},
			test: {
				name: { label: '${APP_MATRIX.server.project}', color: 'green' },
				include: ['tests/app/server/**/*.test.ts'],
				setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				environment: 'node',
				browser: { enabled: false },
			},
		},
		config ?? {},
	)
`)
	}
	const registrations = viteProjectRegistrations(src, app, facts)
	const renderedTest = renderViteTest(registrations, machinery.browser)
	const definitions = viteProjectDefinitions(facts)
	return `${header}${blocks.join('')}
${definitions}
export default defineConfig({
	resolve,
${renderedTest}
})
`
}

/**
 * `configs/src/tsconfig.core.json` — host-neutral core with web interop declarations.
 *
 * @returns The core environment `tsconfig` file content, newline-terminated.
 *
 * @example
 * ```ts
 * coreTsconfig().includes('"rootDir": "../../src/core"') // true
 * ```
 */
export function coreTsconfig(): string {
	const config = {
		extends: '../../tsconfig.json',
		compilerOptions: {
			lib: ['ESNext', 'WebWorker'],
			types: [],
			noEmit: false,
			declaration: true,
			emitDeclarationOnly: true,
			rootDir: '../../src/core',
			outDir: '../../dist/src/core',
		},
		include: TYPESCRIPT_EXTENSIONS.map((extension) => `../../src/core/**/*.${extension}`),
	}
	return formatJson(config)
}

/**
 * `configs/src/vite.core.config.ts` — inlines its own `build.lib` /
 * `rolldownOptions` (core's `srcCore` root export carries no build.lib).
 *
 * @returns The core environment `vite.config.ts` file content, newline-terminated.
 *
 * @example
 * ```ts
 * coreViteConfig().includes('srcCore(') // true
 * ```
 */
export function coreViteConfig(): string {
	return `import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import {
	environmentBoundary,
	outputBoundary,
	srcCore,
	resolveWorkspacePath,
} from '../../vite.config.ts'

export default defineConfig(
	srcCore({
		publicDir: false,
		plugins: [
			outputBoundary('dist/src/core'),
			environmentBoundary('src/core'),
			dts({
				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.core.json'),
				bundleTypes: {
					extractorConfig: {
						compiler: {
							overrideTsconfig: {
								compilerOptions: { types: ['node'] },
							},
						},
					},
				},
			}),
		],
		build: {
			lib: {
				entry: resolveWorkspacePath('src/core/index.ts'),
				formats: ['es', 'cjs'],
				fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
			},
			outDir: 'dist/src/core',
			rolldownOptions: {
				external: [/^node:/, /^@orkestrel\\//],
			},
		},
	}),
)
`
}

/**
 * `configs/src/tsconfig.<browser|server>.json` — `rootDir`/`outDir` point at
 * the whole `src`/`dist/src` tree (not a per-environment subfolder), per the live
 * middleware/router exemplars.
 *
 * @param environment - The non-`core` environment to derive the `tsconfig` for.
 * @returns The environment `tsconfig` file content, newline-terminated.
 *
 * @example
 * ```ts
 * srcTsconfig('server').includes('"rootDir": "../../src"') // true
 * ```
 */
export function srcTsconfig(environment: 'browser' | 'server'): string {
	const config = {
		extends: '../../tsconfig.json',
		compilerOptions: {
			lib: environment === 'browser' ? ['ESNext', 'DOM', 'DOM.Iterable'] : ['ESNext'],
			types: environment === 'browser' ? ['vite/client'] : ['node'],
			noEmit: false,
			declaration: true,
			emitDeclarationOnly: true,
			rootDir: '../../src',
			outDir: '../../dist/src',
		},
		include: TYPESCRIPT_EXTENSIONS.map((extension) => `../../src/${environment}/**/*.${extension}`),
	}
	return formatJson(config)
}

/**
 * `configs/src/vite.<browser|server>.config.ts` — a thin `dts`-only wrapper;
 * `build.lib` / externals live in the root `srcBrowser` / `srcServer` export
 * instead (per the live exemplars).
 *
 * @param environment - The non-`core` environment to derive the `vite.config.ts` for.
 * @returns The environment `vite.config.ts` file content, newline-terminated.
 *
 * @example
 * ```ts
 * srcViteConfig('browser').includes('srcBrowser') // true
 * ```
 */
export function srcViteConfig(environment: 'browser' | 'server'): string {
	const anchor = environment === 'browser' ? 'srcBrowser' : 'srcServer'
	return `import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { ${anchor}, resolveWorkspacePath } from '../../vite.config.ts'

// Types are bundled inline by vite-plugin-dts (see configs/src/vite.core.config.ts
// for the same pattern).
export default defineConfig(
	${anchor}({
		plugins: [
			dts({
				tsconfigPath: resolveWorkspacePath('configs/src/tsconfig.${environment}.json'),
				bundleTypes: true,
			}),
		],
	}),
)
`
}

/**
 * Build the executable's declaration-only `configs/src/tsconfig.bin.json`.
 *
 * @returns The executable `tsconfig` file content, newline-terminated.
 *
 * @example
 * ```ts
 * binTsconfig().includes('"outDir": "../../dist/bin"') // true
 * ```
 */
export function binTsconfig(): string {
	const config = {
		extends: '../../tsconfig.json',
		compilerOptions: {
			lib: ['ESNext'],
			types: ['node'],
			noEmit: false,
			declaration: true,
			emitDeclarationOnly: true,
			rootDir: '../../src',
			outDir: '../../dist/bin',
		},
		include: TYPESCRIPT_EXTENSIONS.map((extension) => `../../src/bin/**/*.${extension}`),
	}
	return formatJson(config)
}

/**
 * Build the executable's `configs/src/vite.bin.config.ts` wrapper.
 *
 * @returns The executable Vite configuration content, newline-terminated.
 *
 * @example
 * ```ts
 * binViteConfig().includes("banner: '#!/usr/bin/env node'") // true
 * ```
 */
export function binViteConfig(): string {
	return `import { defineConfig } from 'vite'
import { srcBin } from '../../vite.config.ts'

// The \`scaffold\` executable build — a single ESM lib file, no declarations (an
// executable ships no types), with the \`#!/usr/bin/env node\` shebang re-emitted via
// \`output.banner\` (rolldown strips shebangs from source during bundling), and
// \`output.paths\` rewriting the externalized \`@src/*\` specifiers to the built sibling
// src environments (relative to \`dist/bin/\`), so the emitted bin resolves at runtime.
export default defineConfig(
	srcBin({
		build: {
			rolldownOptions: {
				output: {
					banner: '#!/usr/bin/env node',
					paths: {
						'@src/core': '../src/core/index.js',
						'@src/server': '../src/server/index.js',
					},
				},
			},
		},
	}),
)
`
}

/**
 * Build one `configs/app/tsconfig.<environment>.json` check-only configuration.
 *
 * @param environment - The application environment.
 * @param hasCore - Whether `app/core` is part of the same workspace.
 * @returns The application environment tsconfig content.
 *
 * @example
 * ```ts
 * appTsconfig('browser', true).includes('../../app/core') // true
 * ```
 */
export function appTsconfig(environment: Environment, hasCore: boolean): string {
	const include = TYPESCRIPT_EXTENSIONS.map(
		(extension) => `../../app/${environment}/**/*.${extension}`,
	)
	if (environment === 'browser') include.push(`../../app/${environment}/**/*.vue`)
	if (environment !== 'core' && hasCore) {
		include.push(...TYPESCRIPT_EXTENSIONS.map((extension) => `../../app/core/**/*.${extension}`))
	}
	const config = {
		extends: '../../tsconfig.json',
		compilerOptions: {
			lib:
				environment === 'browser'
					? ['ESNext', 'DOM', 'DOM.Iterable']
					: environment === 'core'
						? ['ESNext', 'WebWorker']
						: ['ESNext'],
			types:
				environment === 'browser'
					? ['vite/client', 'vue']
					: environment === 'server'
						? ['node']
						: [],
		},
		include,
	}
	return formatJson(config)
}

/**
 * Build one thin executable application Vite config.
 *
 * @param environment - The executable browser or server environment.
 * @returns The `configs/app/vite.<environment>.config.ts` content.
 *
 * @example
 * ```ts
 * appViteConfig('server').includes('appServer') // true
 * ```
 */
export function appViteConfig(environment: 'browser' | 'server'): string {
	const anchor = environment === 'browser' ? 'appBrowser' : 'appServer'
	return `import { defineConfig } from 'vite'
import { ${anchor} } from '../../vite.config.ts'

export default defineConfig(${anchor}())
`
}

/**
 * Build selection-aware GitHub CI, provisioning the declared foreign service before its proof.
 *
 * @param spec - The workspace blueprint.
 * @returns The complete `.github/workflows/ci.yml` content.
 */
export function ciWorkflow(spec: Blueprint): string {
	const browser =
		spec.bin || spec.src.includes('browser') || spec.app.includes('browser')
			? `
      - name: Install Playwright browsers
        run: npx --no-install playwright install --with-deps chromium
`
			: ''
	const tail: string[] = []
	if (spec.integration) {
		tail.push(`      - name: Run live consumer integration
        run: npm run test:integration`)
	}
	if (spec.service) {
		tail.push(`      - name: Provision live service
        run: bash ${SERVICE_SCRIPT_PATH}`)
		tail.push(`      - name: Run live service tests
        run: npm run test:service`)
	}
	const workflowTail = tail.length === 0 ? '' : `\n\n${tail.join('\n\n')}`
	return `name: ci.yml

on:
  push:
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    timeout-minutes: 60
    permissions:
      contents: read
    strategy:
      fail-fast: false
      matrix:
        node: ['22.12.0', '26']

    steps:
      - name: Checkout code
        uses: actions/checkout@${CHECKOUT_ACTION_SHA} # v6.0.2
        with:
          persist-credentials: false

      - name: Set up Node.js
        uses: actions/setup-node@${SETUP_NODE_ACTION_SHA} # v6.4.0
        with:
          node-version: \${{ matrix.node }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --ignore-scripts
${browser}
      - name: Check formatting
        run: npm run format:check

      - name: Lint
        run: npm run lint:check

      - name: Typecheck
        run: npm run check

      - name: Build
        run: npm run build

      - name: Run tests
        run: npm test${workflowTail}
`
}

/**
 * Draft the `configs` group's `computed` artifacts — the root
 * `tsconfig.json` / `vite.config.ts` plus each declared environment's
 * `configs/src/*` pair, grounded against the live middleware (core+server)
 * and router (core+browser+server) exemplars.
 *
 * @param spec - The `Blueprint` to derive config artifacts from.
 * @returns The `configs` group's `Artifact[]`.
 *
 * @example
 * ```ts
 * configArtifacts(blueprint('router')).length // 4
 * ```
 */
export function configArtifacts(spec: Blueprint): readonly Artifact[] {
	const artifacts: Artifact[] = [
		{
			path: 'tsconfig.json',
			group: 'configs',
			origin: 'computed',
			content: rootTsconfig(spec.src, spec.app),
		},
		{
			path: 'vite.config.ts',
			group: 'configs',
			origin: 'computed',
			content:
				spec.app.length > 0
					? applicationViteConfig(spec.src, spec.app, spec)
					: rootViteConfig(spec.src, spec),
		},
	]
	for (const environment of spec.src) {
		const row = SRC_MATRIX[environment]
		for (const path of row.configs) {
			const isTsconfig = path.endsWith('.json')
			const content =
				environment === 'core'
					? isTsconfig
						? coreTsconfig()
						: coreViteConfig()
					: isTsconfig
						? srcTsconfig(environment)
						: srcViteConfig(environment)
			artifacts.push({ path, group: 'configs', origin: 'computed', environment, content })
		}
	}
	if (spec.bin) {
		for (const path of BIN_CONFIGS) {
			artifacts.push({
				path,
				group: 'configs',
				origin: 'computed',
				content: path.endsWith('.json') ? binTsconfig() : binViteConfig(),
			})
		}
	}
	for (const environment of spec.app) {
		const row = APP_MATRIX[environment]
		for (const path of row.configs) {
			const content = path.endsWith('.json')
				? appTsconfig(environment, spec.app.includes('core'))
				: appViteConfig(environment === 'browser' ? 'browser' : 'server')
			artifacts.push({ path, group: 'configs', origin: 'computed', environment, content })
		}
	}
	if (spec.showcase) {
		artifacts.push({
			path: SHOWCASE_CONFIG_PATH,
			group: 'configs',
			origin: 'computed',
			environment: 'browser',
			content: `import { defineConfig } from 'vite'
import { appShowcase } from '../../vite.config.ts'

export default defineConfig(appShowcase())
`,
		})
	}
	return artifacts
}

/**
 * Draft the `source` group's `template` artifacts — the generated-minimal
 * `src/<environment>/*` stubs, one full {types, <Pascal>, factories, index} set
 * PER declared environment (never assuming `core`), filled from `TEMPLATES` with
 * `missing: 'error'`. `blueprintToMembers` already declares a full entity +
 * factory per environment (AGENTS §5's per-environment centralized-file pattern), so
 * every environment gets the same uniform stub shape.
 *
 * @param spec - The `Blueprint` to derive source stubs from.
 * @param pascal - The package's PascalCase entity name.
 * @returns The `source` group's `Artifact[]`.
 *
 * @example
 * ```ts
 * sourceArtifacts(blueprint('router'), 'Router').length // 4
 * ```
 */
export function sourceArtifacts(spec: Blueprint, pascal: string): readonly Artifact[] {
	const inlineTypeImport = `import type { ${pascal}Interface, ${pascal}Options } from './types.js'`
	const typeImport = fitsPrintWidth(inlineTypeImport)
		? inlineTypeImport
		: `import type {
	${pascal}Interface,
	${pascal}Options,
} from './types.js'`
	const entityImport = `import { ${pascal} } from './${pascal}.js'`
	const inlineSignature = `function create${pascal}(options: ${pascal}Options): ${pascal}Interface`
	const signature = fitsPrintWidth(`${EXPORT_KEYWORD} ${inlineSignature} {`)
		? inlineSignature
		: `function create${pascal}(
	options: ${pascal}Options,
): ${pascal}Interface`
	const values = { pascal, signature, typeImport, entityImport }
	const artifacts: Artifact[] = []
	for (const environment of spec.src) {
		artifacts.push(
			fillArtifact(`src/${environment}/types.ts`, 'source', 'types', values, environment),
			fillArtifact(`src/${environment}/${pascal}.ts`, 'source', 'entity', values, environment),
			fillArtifact(`src/${environment}/factories.ts`, 'source', 'factories', values, environment),
			fillArtifact(`src/${environment}/index.ts`, 'source', 'index', values, environment),
		)
	}
	return artifacts
}

/**
 * Draft the application source artifacts for every selected app environment.
 *
 * @param spec - The blueprint carrying the application environment set.
 * @remarks
 * Two conditional shapes layer over the per-environment set. The health contract —
 * record, route constants, guard, and the one unknown-to-typed read — is declared by
 * `app/server` while the server alone reads it and RELOCATES to `app/core` the moment
 * the browser reads it too, because a contract two hosts share belongs to neither of
 * them. The showcase entry pair, its seeder, and its factory appear only for a
 * blueprint that declares the physical showcase wrapper alongside `app/browser`.
 * @returns Complete, runnable app/core, app/browser, and app/server artifacts.
 */
export function applicationArtifacts(spec: Blueprint): readonly Artifact[] {
	const artifacts: Artifact[] = []
	const hasCore = spec.app.includes('core')
	const hasBrowser = spec.app.includes('browser')
	const hasBoundary = hasCore && hasBrowser && spec.app.includes('server')
	const hasShowcase = spec.showcase && hasBrowser
	const showcaseSource = hasBoundary ? 'its running server' : 'its own configuration'
	const nameLiteral = serializeTypeScriptString(spec.name)
	const sharedRecord = `
/** The application record both hosts read at the health route. */
${EXPORT_KEYWORD} interface ApplicationRecord {
	readonly name: string
	readonly status: 'ok'
}
`
	const healthConstants = `
/** The only HTTP method owned by the application health route. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_HEALTH_METHOD = 'GET'

/** The only HTTP path owned by the generated application server. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_HEALTH_PATH = '/health'
`
	if (hasCore) {
		artifacts.push(
			fillArtifact(
				'app/core/types.ts',
				'source',
				'appCoreTypes',
				{ record: hasBoundary ? sharedRecord : '' },
				'core',
			),
			fillArtifact(
				'app/core/constants.ts',
				'source',
				'appCoreConstants',
				{
					nameLiteral,
					health: hasBoundary
						? `${healthConstants}
/** Milliseconds allowed for one shared application health read. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_HEALTH_TIMEOUT = 5_000
`
						: '',
				},
				'core',
			),
			fillArtifact('app/core/errors.ts', 'source', 'appCoreErrors', {}, 'core'),
			fillArtifact('app/core/parsers.ts', 'source', 'appCoreParsers', {}, 'core'),
			fillArtifact('app/core/factories.ts', 'source', 'appCoreFactories', {}, 'core'),
			fillArtifact(
				'app/core/index.ts',
				'source',
				'appCoreIndex',
				{
					validators: hasBoundary ? "export * from './validators.js'\n" : '',
					handlers: hasBoundary ? "export * from './handlers.js'\n" : '',
				},
				'core',
			),
		)
		if (hasBoundary) {
			artifacts.push(
				fillArtifact('app/core/validators.ts', 'source', 'appCoreValidators', {}, 'core'),
				fillArtifact('app/core/handlers.ts', 'source', 'appCoreHandlers', {}, 'core'),
			)
		}
	}
	if (hasBrowser) {
		const nameImport = hasCore
			? "import { APP_NAME } from '@app/core'"
			: "import { APP_NAME } from './constants.js'"
		const nameConstant = hasCore
			? ''
			: `/** The browser-only application name. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_NAME = ${nameLiteral}

`
		artifacts.push(
			fillArtifact(
				'app/browser/types.ts',
				'source',
				'appBrowserTypes',
				{
					application:
						hasShowcase && !hasCore
							? `
/** The identity the root view renders. */
${EXPORT_KEYWORD} interface Application {
	readonly name: string
}
`
							: '',
				},
				'browser',
			),
			fillArtifact(
				'app/browser/constants.ts',
				'source',
				'appBrowserConstants',
				{ nameConstant },
				'browser',
			),
			fillArtifact('app/browser/errors.ts', 'source', 'appBrowserErrors', {}, 'browser'),
			fillArtifact('app/browser/parsers.ts', 'source', 'appBrowserParsers', {}, 'browser'),
			fillArtifact(
				'app/browser/factories.ts',
				'source',
				'appBrowserFactories',
				{
					nameImport: hasBoundary
						? "import { APP_NAME, readApplicationHealth } from '@app/core'"
						: nameImport,
					seedImport: hasShowcase ? "import { seedApplication } from './seeders.js'\n" : '',
					showcase: hasShowcase
						? `
/**
 * Create and mount the showcase over its seeded, inert identity.
 *
 * @param target - The browser element or selector that receives the showcase.
 * @returns The mounted Vue application.
 *
 * @remarks
 * The showcase mounts the same {@link createBrowserApplication} root the shipped entry
 * mounts, so the two differ in exactly one expression — where the props come from. This
 * one reads {@link seedApplication}; the application reads ${showcaseSource}.
 *
 * @example
 * \`\`\`ts
 * import { createShowcaseApplication } from '@app/browser'
 *
 * createShowcaseApplication('#app')
 * \`\`\`
 */
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} createShowcaseApplication(target: string | Element): App<Element> {
	const application = createBrowserApplication(seedApplication())
	application.mount(target)
	return application
}
`
						: '',
					boundary: hasBoundary
						? `
/**
 * Start the application over its real server boundary.
 *
 * @param target - The browser element or selector that receives the application.
 * @returns The mounted Vue application, after one health read settles.
 *
 * @remarks
 * One health read runs before the mount, so the root view renders the identity the
 * running server reported. An unreachable or off-contract boundary yields \`undefined\`
 * and the application falls back to its own configuration rather than failing to mount.
 *
 * @example
 * \`\`\`ts
 * import { startBrowserApplication } from '@app/browser'
 *
 * await startBrowserApplication('#app')
 * \`\`\`
 */
${EXPORT_KEYWORD} async ${FUNCTION_KEYWORD} startBrowserApplication(target: string | Element): Promise<App<Element>> {
	const application = createBrowserApplication(await readApplicationHealth(window.location.origin))
	application.mount(target)
	return application
}
`
						: '',
				},
				'browser',
			),
			fillArtifact(
				'app/browser/index.ts',
				'source',
				'appBrowserIndex',
				{ seeders: hasShowcase ? "export * from './seeders.js'\n" : '' },
				'browser',
			),
			fillArtifact(
				'app/browser/main.ts',
				'source',
				'appBrowserMain',
				hasBoundary
					? {
							factory: 'startBrowserApplication',
							mount: "void startBrowserApplication('#app')",
						}
					: {
							factory: 'createBrowserApplication',
							mount: "createBrowserApplication().mount('#app')",
						},
				'browser',
			),
			fillArtifact('app/browser/ApplicationView.vue', 'source', 'appBrowserView', {}, 'browser'),
			fillArtifact(
				'app/browser/index.html',
				'source',
				'appBrowserHtml',
				{ name: escapeHtmlText(spec.name) },
				'browser',
			),
			fillArtifact('app/browser/env.d.ts', 'source', 'appBrowserEnv', {}, 'browser'),
		)
		if (hasShowcase) {
			artifacts.push(
				fillArtifact(
					'app/browser/seeders.ts',
					'source',
					'appBrowserSeeders',
					{
						applicationImport: hasCore
							? "import type { Application } from '@app/core'"
							: "import type { Application } from './types.js'",
						nameImport,
					},
					'browser',
				),
				fillArtifact('app/browser/showcase.ts', 'source', 'appBrowserShowcase', {}, 'browser'),
				fillArtifact(
					'app/browser/showcase.html',
					'source',
					'appBrowserShowcaseHtml',
					{ name: escapeHtmlText(spec.name) },
					'browser',
				),
			)
		}
	}
	if (spec.app.includes('server')) {
		const nameImport = hasCore
			? "import { APP_NAME } from '@app/core'"
			: "import { APP_NAME } from './constants.js'"
		const nameConstant = hasCore
			? ''
			: `/** The server-only application name. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_NAME = ${nameLiteral}

`
		artifacts.push(
			fillArtifact(
				'app/server/types.ts',
				'source',
				'appServerTypes',
				{
					record: hasBoundary
						? ''
						: `/** The application record returned by the health route. */
${EXPORT_KEYWORD} interface ApplicationRecord {
	readonly name: string
	readonly status: 'ok'
}

`,
				},
				'server',
			),
			fillArtifact(
				'app/server/constants.ts',
				'source',
				'appServerConstants',
				{ nameConstant, health: hasBoundary ? '' : healthConstants },
				'server',
			),
			fillArtifact('app/server/errors.ts', 'source', 'appServerErrors', {}, 'server'),
			fillArtifact('app/server/parsers.ts', 'source', 'appServerParsers', {}, 'server'),
			fillArtifact(
				'app/server/routes.ts',
				'source',
				'appServerRoutes',
				{
					healthImport: hasBoundary
						? "import { APP_HEALTH_METHOD, APP_HEALTH_PATH } from '@app/core'"
						: "import { APP_HEALTH_METHOD, APP_HEALTH_PATH } from './constants.js'",
				},
				'server',
			),
			fillArtifact(
				'app/server/handlers.ts',
				'source',
				'appServerHandlers',
				{
					recordImport: hasBoundary
						? "import type { ApplicationRecord } from '@app/core'"
						: "import type { ApplicationRecord } from './types.js'",
					nameImport,
				},
				'server',
			),
			fillArtifact('app/server/ApplicationServer.ts', 'source', 'appServerEntity', {}, 'server'),
			fillArtifact('app/server/factories.ts', 'source', 'appServerFactories', {}, 'server'),
			fillArtifact(
				'app/server/ApplicationServerRunner.ts',
				'source',
				'appServerRunner',
				{ nameImport },
				'server',
			),
			fillArtifact('app/server/index.ts', 'source', 'appServerIndex', {}, 'server'),
			fillArtifact('app/server/main.ts', 'source', 'appServerMain', {}, 'server'),
		)
	}
	return artifacts
}

/**
 * Build the computed `SELF_SPECIFIERS` / `SPECIFIER_MODULES` / `exportsFor`
 * block the `parityTest` template's `{{specifiers}}` placeholder fills —
 * ONE shape for every environment count (grounded against the live single-environment
 * websocket/indexeddb and multi-environment router/middleware exemplars, which
 * both resolve a fence's specifier through a `SPECIFIER_MODULES` map rather
 * than a single-module lookup). The bare `@orkestrel/<name>` specifier
 * resolves to the PRIMARY environment — `core` when declared, else the sole
 * declared environment.
 *
 * @param spec - The `Blueprint` to derive the parity specifiers block from.
 * @returns The computed `parityTest` `{{specifiers}}` block content.
 *
 * @example
 * ```ts
 * paritySpecifiers(blueprint('router')).includes('SELF_SPECIFIERS') // true
 * ```
 */
export function paritySpecifiers(spec: Blueprint): string {
	// Keyword tokens keep the emitted declarations out of column 0 of THIS
	// file's raw text, which the guides-parity scanner reads.
	const packageSpecifier = `@orkestrel/${spec.name}`
	const primary: Environment | undefined = spec.src.includes('core') ? 'core' : spec.src[0]
	const publishedSpecifiers = spec.src.map((environment) =>
		environment === primary ? packageSpecifier : `${packageSpecifier}/${environment}`,
	)
	const selfSpecifiers = [
		...publishedSpecifiers,
		...spec.src.map((environment) => `@src/${environment}`),
		...spec.app.map((environment) => `@app/${environment}`),
	]
	const modules: Record<string, string> = {}
	if (primary !== undefined) {
		for (const environment of spec.src) {
			const specifier =
				environment === primary ? packageSpecifier : `${packageSpecifier}/${environment}`
			modules[specifier] = `src/${environment}`
		}
	}
	for (const environment of spec.src) modules[`@src/${environment}`] = `src/${environment}`
	for (const environment of spec.app) modules[`@app/${environment}`] = `app/${environment}`
	const specifierItems = selfSpecifiers.map((specifier) => `'${specifier}'`)
	const inlineSpecifierList = `[${specifierItems.join(', ')}]`
	const lines = fitsPrintWidth(`${CONST_KEYWORD} SELF_SPECIFIERS = ${inlineSpecifierList}`)
		? [`${EXPORT_KEYWORD} ${CONST_KEYWORD} SELF_SPECIFIERS = ${inlineSpecifierList}`]
		: [
				`${EXPORT_KEYWORD} ${CONST_KEYWORD} SELF_SPECIFIERS = [`,
				...specifierItems.map((specifier) => `\t${specifier},`),
				']',
			]
	lines.push(
		'',
		[
			EXPORT_KEYWORD,
			CONST_KEYWORD,
			'SPECIFIER_MODULES:',
			'Readonly<Record<string, string>>',
			'=',
			'{',
		].join(' '),
		...Object.entries(modules).map(([specifier, module]) => `\t'${specifier}': '${module}',`),
		'}',
		`${EXPORT_KEYWORD} ${CONST_KEYWORD} SPECIFIER_SOURCES = new Map<string, ReturnType<typeof createSource>>()`,
		`${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} exportsFor(specifier: string): readonly string[] {`,
		'\tconst module = SPECIFIER_MODULES[specifier]',
		'\tif (module === undefined) return []',
		'\tlet source = SPECIFIER_SOURCES.get(module)',
		'\tif (source === undefined) {',
		'\t\tsource = createSource({ files: GUIDE_FILES, module })',
		'\t\tSPECIFIER_SOURCES.set(module, source)',
		'\t}',
		'\treturn source.exports().map((symbol) => symbol.name)',
		'}',
	)
	return lines.join('\n')
}

/**
 * Draft the `tests` group's `template` artifacts — the shared recorder
 * setup, one environment-specific setup file per non-`core` environment
 * (`setupServer.ts` / `setupBrowser.ts`, grounded against the live
 * exemplars' setup-file naming), the generated-minimal entity / factory test
 * stubs PER declared environment, and the environment-aware guides-parity drop-in.
 *
 * @param spec - The `Blueprint` to derive test stubs from.
 * @param pascal - The package's PascalCase entity name.
 * @returns The `tests` group's `Artifact[]`.
 *
 * @example
 * ```ts
 * testArtifacts(blueprint('router'), 'Router').length // 3
 * ```
 */
export function testArtifacts(spec: Blueprint, pascal: string): readonly Artifact[] {
	const hasBrowser = spec.src.includes('browser') || spec.app.includes('browser')
	const hasVue = spec.app.includes('browser')
	const browserPolicyImport = hasBrowser
		? "\nimport { chromium } from 'playwright'\nimport { isBrowserExecutable, resolveBrowser, SYSTEM_BROWSER_CHANNELS } from '../vite.config.js'"
		: ''
	const vuePolicyImport = hasVue ? "\nimport { parse as parseVue } from 'vue/compiler-sfc'" : ''
	const workspacePolicyAssertion = hasVue
		? `expect(
			inspectCodingWorkspace(process.cwd(), (path, content) => {
				const parsed = parseVue(content, { filename: path })
				if (parsed.errors.length > 0) throw new Error(\`\${path} could not be parsed as a Vue SFC\`)
				return [parsed.descriptor.script, parsed.descriptor.scriptSetup].filter(
					(block) => block !== null,
				)
			}),
		).toEqual([])`
		: 'expect(inspectCodingWorkspace(process.cwd())).toEqual([])'
	const browserPolicyTest = hasBrowser
		? `

	it('resolves only a real managed executable or stable system browser channel', () => {
		const options = resolveBrowser(chromium.executablePath(), process.platform, process.env)
		let valid = options === undefined
		if (options !== undefined) {
			const channel = options.launchOptions?.channel
			valid =
				channel === undefined
					? isBrowserExecutable(options.launchOptions?.executablePath ?? chromium.executablePath())
					: SYSTEM_BROWSER_CHANNELS.some((browser) => browser.channel === channel)
		}
		expect(valid).toBe(true)
	})`
		: ''
	const artifacts: Artifact[] = [
		fillArtifact('tests/setup.ts', 'tests', 'setup', {}),
		fillArtifact('tests/policy.test.ts', 'tests', 'policyTest', {
			browserPolicySpecifier: '',
			browserPolicyImport,
			browserPolicyTest,
			vuePolicyImport,
			workspacePolicyAssertion,
		}),
	]
	if (spec.src.includes('server') || spec.app.includes('server')) {
		artifacts.push(fillArtifact('tests/setupServer.ts', 'tests', 'setupServer', {}, 'server'))
	}
	if (spec.src.includes('browser') || spec.app.includes('browser')) {
		artifacts.push(fillArtifact('tests/setupBrowser.ts', 'tests', 'setupBrowser', {}, 'browser'))
	}
	const hasApplicationBoundary =
		spec.app.includes('browser') && spec.app.includes('server') && spec.app.includes('core')
	const hasApplicationShowcase = spec.showcase && spec.app.includes('browser')
	if (spec.app.includes('core')) {
		artifacts.push(
			fillArtifact(
				'tests/app/core/factories.test.ts',
				'tests',
				'appCoreTest',
				{
					guardImport: hasApplicationBoundary ? '\tisApplicationRecord,\n' : '',
					readImport: hasApplicationBoundary ? '\treadApplicationHealth,\n' : '',
					boundary: hasApplicationBoundary
						? `

describe('shared application health boundary', () => {
	it('accepts the shared record and refuses every off-contract value', () => {
		expect(isApplicationRecord({ name: APP_NAME, status: 'ok' })).toBe(true)
		for (const value of [
			null,
			[],
			'ok',
			{ name: APP_NAME },
			{ name: '', status: 'ok' },
			{ name: 1, status: 'ok' },
			{ name: APP_NAME, status: 'down' },
		]) {
			expect(isApplicationRecord(value)).toBe(false)
		}
		const revocable = Proxy.revocable({}, {})
		revocable.revoke()
		expect(isApplicationRecord(revocable.proxy)).toBe(false)
	})

	it('refuses a malformed origin before reaching the network', async () => {
		expect(await readApplicationHealth('not-an-origin')).toBeUndefined()
	})
})`
						: '',
				},
				'core',
			),
		)
	}
	if (spec.app.includes('browser')) {
		const browserTestNameImport = spec.app.includes('core')
			? "import { APP_NAME } from '@app/core'"
			: "import { APP_NAME } from '@app/browser'"
		artifacts.push(
			fillArtifact(
				'tests/app/browser/factories.test.ts',
				'tests',
				'appBrowserTest',
				{
					browserTestNameImport,
					showcaseImport: hasApplicationShowcase ? '\tcreateShowcaseApplication,\n' : '',
					entryImport: `${hasApplicationShowcase ? '\tseedApplication,\n' : ''}${
						hasApplicationBoundary ? '\tstartBrowserApplication,\n' : ''
					}`,
					showcase: hasApplicationShowcase
						? `

describe('createShowcaseApplication', () => {
	it('mounts the shipped root view over one frozen, inert seed', () => {
		const element = buildElement()
		const seeded = seedApplication()
		const application = createShowcaseApplication(element)
		try {
			expect(element.textContent).toContain(seeded.name)
			expect(seeded).toEqual(seedApplication())
			expect(seeded).not.toBe(seedApplication())
			expect(Object.isFrozen(seeded)).toBe(true)
		} finally {
			application.unmount()
			element.remove()
		}
	})
})`
						: '',
					boundary: hasApplicationBoundary
						? `

describe('startBrowserApplication', () => {
	it('mounts the configured identity when the boundary answers off-contract', async () => {
		const element = buildElement()
		const application = await startBrowserApplication(element)
		try {
			expect(element.textContent).toContain(APP_NAME)
		} finally {
			application.unmount()
			element.remove()
		}
	})
})`
						: '',
				},
				'browser',
			),
		)
	}
	if (spec.app.includes('server')) {
		const testNameImport = hasApplicationBoundary
			? `import {
	APP_HEALTH_METHOD,
	APP_HEALTH_PATH,
	APP_NAME,
	isApplicationRecord,
	readApplicationHealth,
} from '@app/core'`
			: spec.app.includes('core')
				? "import { APP_NAME } from '@app/core'"
				: "import { APP_NAME } from '@app/server'"
		const serverImport = hasApplicationBoundary
			? "import { createApplicationServer, dispatcher } from '@app/server'"
			: `import {
	APP_HEALTH_METHOD,
	APP_HEALTH_PATH,
	createApplicationServer,
	dispatcher,
} from '@app/server'`
		artifacts.push(
			fillArtifact(
				'tests/app/server/ApplicationServer.test.ts',
				'tests',
				'appServerTest',
				{
					testNameImport,
					serverImport,
					boundary: hasApplicationBoundary
						? `

describe('shared application boundary', () => {
	it('answers the shared record and translates it into the shared identity', async () => {
		const server = createApplicationServer({ server: { host: '127.0.0.1', port: 0 } })
		try {
			await server.start()
			const response = await fetch(\`\${server.url}\${APP_HEALTH_PATH}\`)
			const record: unknown = await response.json()

			expect(isApplicationRecord(record)).toBe(true)
			expect(await readApplicationHealth(server.url)).toEqual({ name: APP_NAME })
		} finally {
			await server.destroy()
		}
	})

	it('reads undefined from a released loopback port', async () => {
		const port = await reserveLoopbackPort()

		expect(await readApplicationHealth(\`http://127.0.0.1:\${port}\`)).toBeUndefined()
	})
})`
						: '',
				},
				'server',
			),
			fillArtifact(
				'tests/app/server/parsers.test.ts',
				'tests',
				'appServerParsersTest',
				{},
				'server',
			),
		)
	}
	const inlineExplicitInstance = `instance: ${pascal}Interface = new ${pascal}({ id: 'example' })`
	const multilineExplicitInstance = `instance: ${pascal}Interface = new ${pascal}({
			id: 'example',
		})`
	const explicitInstance = fitsPrintWidth(`\t\t${CONST_KEYWORD} ${inlineExplicitInstance}`)
		? inlineExplicitInstance
		: fitsPrintWidth(`\t\t${CONST_KEYWORD} instance: ${pascal}Interface = new ${pascal}({`)
			? multilineExplicitInstance
			: `instance: ${pascal}Interface =
			new ${pascal}({
				id: 'example',
			})`
	const inlineValueImport = `import { create${pascal}, ${pascal} } from '@src/core'`
	const valueImport = fitsPrintWidth(inlineValueImport)
		? inlineValueImport
		: `import {
	create${pascal},
	${pascal},
} from '@src/core'`
	const inlineTestTypeImport = `import type { ${pascal}Interface } from '@src/core'`
	const testTypeImport = fitsPrintWidth(inlineTestTypeImport)
		? inlineTestTypeImport
		: `import type {
	${pascal}Interface,
} from '@src/core'`
	const inlineFactoryInstance = `instance = create${pascal}({ id: 'example' })`
	const factoryInstance = fitsPrintWidth(`\t\t${CONST_KEYWORD} ${inlineFactoryInstance}`)
		? inlineFactoryInstance
		: `instance = create${pascal}({
			id: 'example',
		})`
	const inlineTypeExpectation = `expectTypeOf(create${pascal}({ id: 'example' })).toEqualTypeOf<${pascal}Interface>()`
	const typeExpectation = fitsPrintWidth(`\t\t${inlineTypeExpectation}`)
		? inlineTypeExpectation
		: `expectTypeOf(
			create${pascal}({ id: 'example' }),
		).toEqualTypeOf<${pascal}Interface>()`
	for (const environment of spec.src) {
		const environmentValueImport = valueImport.replaceAll('@src/core', `@src/${environment}`)
		const environmentTypeImport = testTypeImport.replaceAll('@src/core', `@src/${environment}`)
		const values = {
			pascal,
			environment,
			explicitInstance,
			entityTestTypeImport: environmentTypeImport,
			valueImport: environmentValueImport,
			testTypeImport: environmentTypeImport,
			factoryInstance,
			typeExpectation,
		}
		artifacts.push(
			fillArtifact(
				`tests/src/${environment}/${pascal}.test.ts`,
				'tests',
				'entityTest',
				values,
				environment,
			),
			fillArtifact(
				`tests/src/${environment}/factories.test.ts`,
				'tests',
				'factoriesTest',
				values,
				environment,
			),
		)
	}
	artifacts.push(
		fillArtifact('tests/setupGuides.ts', 'tests', 'setupGuides', {
			specifiers: paritySpecifiers(spec),
			walkDirs: [
				...(spec.src.length > 0 ? ["'src'"] : []),
				...(spec.app.length > 0 ? ["'app'"] : []),
				"'guides'",
				"'tests'",
			]
				.map((directory) => `\t${directory},`)
				.join('\n'),
		}),
		fillArtifact('tests/guides/src/parity.test.ts', 'tests', 'parityTest', {
			name: spec.name,
		}),
	)
	return artifacts
}

/**
 * Build an `alignTable` markdown table over a member category's rows, deduped
 * by name — `blueprintToMembers` declares one full member set PER environment, so
 * a multi-environment blueprint carries byte-identical name/summary rows once per
 * environment; the one guide (AGENTS §22) lists each declared member once,
 * grouped across its src.
 *
 * @param category - The `Member['category']` to filter rows by.
 * @param members - The blueprint's derived `Member[]` (previously closed over by the caller).
 * @returns The aligned markdown table for the category's deduped members.
 *
 * @example
 * ```ts
 * guideMemberTable('entity', blueprintToMembers(blueprint('router'))).includes('Router') // true
 * ```
 */
export function guideMemberTable(category: Member['category'], members: readonly Member[]): string {
	const seen = new Set<string>()
	const rows: string[][] = []
	const kind =
		category === 'type'
			? 'interface'
			: category === 'alias'
				? 'type'
				: category === 'constant'
					? 'const'
					: category === 'entity' || category === 'error'
						? 'class'
						: 'function'
	for (const item of members) {
		if (item.category !== category) continue
		if (seen.has(item.name)) continue
		seen.add(item.name)
		rows.push([`\`${item.name}\``, kind, item.summary])
	}
	return alignTable(['Name', 'Kind', 'Summary'], rows)
}

/**
 * Build complete guide examples for every generated public function.
 *
 * @param spec - The workspace blueprint.
 * @param pascal - The source entity name.
 * @returns TypeScript fences covering each selected source and app environment.
 */
export function guideUsage(spec: Blueprint, pascal: string): string {
	const examples: string[] = []
	const hasBoundary =
		spec.app.includes('core') && spec.app.includes('browser') && spec.app.includes('server')
	const hasShowcase = spec.showcase && spec.app.includes('browser')
	if (spec.src.length > 0) {
		examples.push(`\`\`\`ts
import { create${pascal} } from '@orkestrel/${spec.name}'

${CONST_KEYWORD} instance = create${pascal}({ id: 'example' })
\`\`\``)
	}
	if (spec.app.includes('core')) {
		examples.push(`\`\`\`ts
import {
	ApplicationError,
	createApplication,
	isApplicationError,
	parseApplicationName,
} from '@app/core'

${CONST_KEYWORD} name = parseApplicationName(' ${spec.name} ')
${CONST_KEYWORD} application = createApplication(name)
isApplicationError(new ApplicationError('CONFIG', 'invalid')) // true
\`\`\``)
	}
	if (hasBoundary) {
		examples.push(`\`\`\`ts
import type { ApplicationRecord } from '@app/core'
import {
	APP_HEALTH_METHOD,
	APP_HEALTH_PATH,
	APP_HEALTH_TIMEOUT,
	isApplicationRecord,
	readApplicationHealth,
} from '@app/core'

APP_HEALTH_METHOD // 'GET'
APP_HEALTH_PATH // '/health'
APP_HEALTH_TIMEOUT // 5000
${CONST_KEYWORD} healthy: ApplicationRecord = { name: '${spec.name}', status: 'ok' }
isApplicationRecord(healthy) // true
isApplicationRecord({ name: '${spec.name}', status: 'down' }) // false
await readApplicationHealth('http://127.0.0.1:3000') // { name: '${spec.name}' } or undefined
\`\`\``)
	}
	if (spec.app.includes('browser')) {
		examples.push(`\`\`\`ts
import {
	BrowserApplicationError,
	createBrowserApplication,
	isBrowserApplicationError,
	parseBrowserApplicationOptions,
} from '@app/browser'

${CONST_KEYWORD} browserOptions = parseBrowserApplicationOptions({
	name: '${spec.name}',
})
${CONST_KEYWORD} browser = createBrowserApplication(browserOptions)
browser.mount('#app')
isBrowserApplicationError(new BrowserApplicationError('CONFIG', 'invalid')) // true
\`\`\``)
	}
	if (hasShowcase) {
		examples.push(`\`\`\`ts
import { createShowcaseApplication, seedApplication } from '@app/browser'

seedApplication() // { name: '${spec.name} showcase' }
createShowcaseApplication('#app')
\`\`\``)
	}
	if (hasBoundary) {
		examples.push(`\`\`\`ts
import { startBrowserApplication } from '@app/browser'

await startBrowserApplication('#app')
\`\`\``)
	}
	if (spec.app.includes('server')) {
		examples.push(`\`\`\`ts
${
	hasBoundary
		? `import type { ApplicationRecord } from '@app/core'
import type { ApplicationState } from '@app/server'
import { APP_HEALTH_METHOD, APP_HEALTH_PATH } from '@app/core'`
		: "import type { ApplicationRecord, ApplicationState } from '@app/server'"
}
import {
${
	hasBoundary
		? ''
		: `	APP_HEALTH_METHOD,
	APP_HEALTH_PATH,
`
}	APP_HOST_LABEL_PATTERN,
	APP_NUMERIC_HOST_PATTERN,
	ApplicationServer,
	ApplicationServerError,
	DEFAULT_APP_START_TIMEOUT,
	MAX_APP_START_TIMEOUT,
	createApplicationServer,
	dispatcher,
	handleApplicationHealth,
	isApplicationServerError,
	parseApplicationHost,
	parseApplicationPort,
	parseApplicationServerOptions,
	parseApplicationStartTimeout,
	reportApplicationServerError,
} from '@app/server'

${CONST_KEYWORD} host = parseApplicationHost('127.0.0.1')
${CONST_KEYWORD} port = parseApplicationPort('0')
${CONST_KEYWORD} timeout = parseApplicationStartTimeout('5000')
${CONST_KEYWORD} options = parseApplicationServerOptions({ server: { host, port, timeout } })
APP_HOST_LABEL_PATTERN.test('api') // true
APP_NUMERIC_HOST_PATTERN.test('999.999.999.999') // true (and therefore rejected as a host)
APP_HEALTH_METHOD // 'GET'
APP_HEALTH_PATH // '/health'
DEFAULT_APP_START_TIMEOUT // 10000
MAX_APP_START_TIMEOUT // 300000
${CONST_KEYWORD} state: ApplicationState = { connection: { encrypted: false } }
${CONST_KEYWORD} record: ApplicationRecord = { name: '${spec.name}', status: 'ok' }
await dispatcher.handle(new Request(\`http://application.test\${APP_HEALTH_PATH}\`), state)
Response.json(record)
handleApplicationHealth()

${CONST_KEYWORD} error = new ApplicationServerError('CONFIG', 'invalid')
isApplicationServerError(error) // true
reportApplicationServerError(error) // writes only a stable CONFIG diagnostic
new ApplicationServer(options) // stopped entity

${CONST_KEYWORD} server = createApplicationServer(options)
${CONST_KEYWORD} controller = new AbortController()
await server.start(controller.signal)
await server.stop()
await server.destroy()
\`\`\`

\`\`\`ts
import { ApplicationServerRunner } from '@app/server'

${CONST_KEYWORD} runner = new ApplicationServerRunner({ server: { port: 0 } })
runner.start() // process owns shutdown signals
await runner.stop()
\`\`\`

\`\`\`ts
import { startApplicationServer } from '@app/server'

${CONST_KEYWORD} processRunner = startApplicationServer({ server: { port: 0 } })
await processRunner.stop()
\`\`\``)
	}
	return examples.join('\n\n')
}

/**
 * Build the generated application server's method contract section.
 *
 * @param spec - The workspace blueprint.
 * @returns A Methods section when app/server is selected, otherwise an empty string.
 */
export function guideMethods(spec: Blueprint): string {
	if (!spec.app.includes('server')) return ''
	const methods = alignTable(
		['Method', 'Returns', 'Behavior'],
		[
			[
				'`start`',
				'`Promise<void>`',
				'Bind the installed `@orkestrel/server` substrate when idle or stopped. The optional `AbortSignal` and bounded startup timeout cancel pending binding. Rejects with `ApplicationServerError` code `LIFECYCLE` when startup fails, times out, or the caller aborts.',
			],
			[
				'`stop`',
				'`Promise<void>`',
				'Drain and stop the installed server; repeated calls while stopped are safe. Rejects with `ApplicationServerError` code `LIFECYCLE` when closing fails.',
			],
			[
				'`destroy`',
				'`Promise<void>`',
				'Perform terminal idempotent teardown through the installed server lifecycle. Rejects with `ApplicationServerError` code `LIFECYCLE` when teardown fails.',
			],
		],
	)
	const runnerMethods = alignTable(
		['Method', 'Returns', 'Behavior'],
		[
			[
				'`start`',
				'`void`',
				'Register one generation-owned set of SIGINT/SIGTERM cleanup listeners, start the server, write one `[READY] <name> <url>` line after readiness, and translate asynchronous startup failures into a non-zero process exit code.',
			],
			[
				'`stop`',
				'`Promise<void>`',
				'Release both process listeners before stopping the server; repeated calls are safe and lifecycle failures reject.',
			],
		],
	)
	return `

## Methods

#### \`ApplicationServerInterface\`

${methods}

#### \`ApplicationServerRunnerInterface\`

${runnerMethods}

The constructor validates grouped direct options plus \`APP_HOST\`, \`APP_PORT\`, and
\`APP_START_TIMEOUT\` before allocating
a listener. Direct options must be an exact plain own-key data record containing only a
\`server\` record with \`host\`, \`port\`, and/or \`timeout\`; inherited properties, accessors, symbols, instances, proxies that
throw during reflection, and unknown keys fail closed. Invalid values throw
\`ApplicationServerError\` code \`CONFIG\`; the default host is loopback and port \`0\` is
supported for collision-free ephemeral allocation. Startup defaults to 10 seconds and accepts
only integer timeouts from 1 through 300,000 milliseconds. Lifecycle failures use code
\`LIFECYCLE\`; both may carry \`context.cause\` or \`context.value\`. Narrow caught values with
\`isApplicationServerError\` before reading either field.

The standalone dispatcher owns exactly \`GET /health\` and serializes the shared
\`ApplicationRecord\` shape \`{ name: APP_NAME, status: 'ok' }\` as JSON. The server composes
\`createBoundary()\`, \`createSecurity()\`, then \`createDeadline({ ms: timeout })\` around that
dispatcher; every other path returns \`404\`, and every unsupported method returns \`405\` with
\`Allow: GET\`.`
}

/**
 * Build links to every generated source and application test file.
 *
 * @param spec - The workspace blueprint.
 * @param pascal - The source entity name.
 * @returns A newline-separated Markdown test inventory.
 */
export function guideTests(spec: Blueprint, pascal: string): string {
	const tests: string[] = [
		'- [`tests/policy.test.ts`](../../tests/policy.test.ts) — filename placement and real browser capability probing.',
	]
	for (const environment of spec.src) {
		tests.push(
			`- [\`tests/src/${environment}/${pascal}.test.ts\`](../../tests/src/${environment}/${pascal}.test.ts) — entity boundaries.`,
			`- [\`tests/src/${environment}/factories.test.ts\`](../../tests/src/${environment}/factories.test.ts) — factory behavior.`,
		)
	}
	if (spec.app.includes('core')) {
		tests.push(
			'- [`tests/app/core/factories.test.ts`](../../tests/app/core/factories.test.ts) — host-independent identity behavior.',
		)
	}
	if (spec.app.includes('browser')) {
		tests.push(
			'- [`tests/app/browser/factories.test.ts`](../../tests/app/browser/factories.test.ts) — real-browser mount and cleanup.',
		)
	}
	if (spec.app.includes('server')) {
		tests.push(
			'- [`tests/app/server/ApplicationServer.test.ts`](../../tests/app/server/ApplicationServer.test.ts) — real loopback lifecycle and protocol behavior.',
			'- [`tests/app/server/parsers.test.ts`](../../tests/app/server/parsers.test.ts) — hostile environment boundaries.',
		)
	}
	return tests.join('\n')
}

/**
 * Draft the `guides` group's artifacts — the package's own filled guide stub,
 * the guides index, and vendored dependency guide mirrors whose paths are
 * neither the package's own guide nor already carried by the selected host
 * set.
 *
 * @param spec - The `Blueprint` to derive guide artifacts from.
 * @param pascal - The package's PascalCase entity name.
 * @param members - The blueprint's derived `Member[]`.
 * @returns The `guides` group's `Artifact[]`, with one contributor per guide
 * path.
 *
 * @example
 * ```ts
 * guideArtifacts(blueprint('router'), 'Router', blueprintToMembers(blueprint('router'))).length // 2
 * ```
 */
export function guideArtifacts(
	spec: Blueprint,
	pascal: string,
	members: readonly Member[],
): readonly Artifact[] {
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

	const sourceDirectories = [
		...spec.src.map((environment) => `src/${environment}`),
		...spec.app.map((environment) => `app/${environment}`),
	]
	const source = sourceDirectories
		.map((directory) => `[\`${directory}\`](../../${directory})`)
		.join(', ')
	const aliases = [
		...spec.src.map((environment) => `\`@src/${environment}\``),
		...spec.app.map((environment) => `\`@app/${environment}\``),
	]
	const barrel =
		spec.src.length > 0
			? `Published through \`@orkestrel/${spec.name}\`; workspace barrels: ${aliases.join(', ')}.`
			: `Private application workspace barrels: ${aliases.join(', ')}.`

	const artifacts: Artifact[] = [
		fillArtifact(`guides/src/${spec.name}.md`, 'guides', 'guide', {
			name: spec.name,
			pascal,
			description:
				spec.description ??
				(spec.src.length > 0
					? `A complete ${pascal} library workspace.`
					: `A complete ${pascal} application workspace.`),
			source,
			barrel,
			usage: guideUsage(spec, pascal),
			tests: guideTests(spec, pascal),
			factories: guideMemberTable('factory', members),
			entities: guideMemberTable('entity', members),
			parsers: guideMemberTable('parser', members),
			guards: guideMemberTable('guard', members),
			handlers: guideMemberTable('handler', members),
			errors: guideMemberTable('error', members),
			types: guideMemberTable('type', members),
			aliases: guideMemberTable('alias', members),
			constants: guideMemberTable('constant', members),
			methods: guideMethods(spec),
		}),
		fillArtifact('guides/README.md', 'guides', 'guidesReadme', {
			concept: alignTable(
				['Concept', 'Spec', 'Source', 'Tests'],
				[
					[
						pascal,
						`[\`${spec.name}.md\`](src/${spec.name}.md)`,
						sourceDirectories.map((directory) => `[\`${directory}\`](../${directory})`).join(', '),
						[
							...spec.src.map((environment) => `tests/src/${environment}`),
							...spec.app.map((environment) => `tests/app/${environment}`),
						]
							.map((directory) => `[\`${directory}\`](../${directory})`)
							.join(', '),
					],
				],
			),
			directory: alignTable(
				['Directory', 'Guide'],
				sourceDirectories.map((directory) => [
					directory,
					`[\`${spec.name}.md\`](src/${spec.name}.md)`,
				]),
			),
		}),
	]
	const guidePath = `guides/src/${spec.name}.md`
	for (const dep of spec.dependencies) {
		if (!vendoredGuides.includes(dep.name)) continue
		const short = dep.name.replace('@orkestrel/', '')
		const path = `guides/src/${short}.md`
		if (HOST_PATHS.includes(path) || path === guidePath) continue
		artifacts.push({
			path,
			group: 'guides',
			origin: 'host',
			source: path,
		})
	}
	return artifacts
}

/**
 * Apply a blueprint's `overrides` over a drafted artifact list — an override
 * REPLACES the matching artifact's `content` in place; an override matching
 * no planned artifact, targeting a `host`-origin path, or targeting the
 * blueprint-owned `package.json` publication boundary is left unapplied here
 * (the gate stage reports it as a blocking question).
 *
 * @param artifacts - The drafted `Artifact[]`.
 * @param overrides - The blueprint's `overrides`.
 * @returns The artifact list with matching overrides applied.
 *
 * @example
 * ```ts
 * applyOverrides(artifacts, [override('README.md', '# custom')])[0].content // '# custom'
 * ```
 */
export function applyOverrides(
	artifacts: readonly Artifact[],
	overrides: Blueprint['overrides'],
): readonly Artifact[] {
	if (overrides.length === 0) return artifacts
	const byPath = new Map(overrides.map((override) => [override.path, override.content]))
	return artifacts.map((artifact) => {
		if (artifact.origin === 'host' || artifact.path === 'package.json') return artifact
		const content = byPath.get(artifact.path)
		return content === undefined ? artifact : { ...artifact, content }
	})
}

/**
 * The full pure compilation: draft a blueprint's artifacts — the manifest and
 * exports combination rules over the per-environment `SRC_MATRIX` rows, plus
 * the `selectHostPaths` selection of `HOST_PATHS` and `overrides` — then pin.
 *
 * @param blueprint - The `Blueprint` to compile.
 * @param groups - An optional `Group[]` selection (default: all groups).
 * @returns The drafted, pinned `Plan`.
 *
 * @example
 * ```ts
 * const plan = blueprintToPlan(blueprint('router', { src: ['core'] }))
 * plan.artifacts.length // every file the package needs
 * ```
 */
export function blueprintToPlan(blueprint: Blueprint, groups?: readonly Group[]): Plan {
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
	if (selected.includes('source')) {
		artifacts.push(...sourceArtifacts(blueprint, pascal), ...applicationArtifacts(blueprint))
	}
	if (selected.includes('tests')) artifacts.push(...testArtifacts(blueprint, pascal))
	if (selected.includes('guides')) artifacts.push(...guideArtifacts(blueprint, pascal, members))
	if (selected.includes('docs')) {
		artifacts.push(
			fillArtifact('README.md', 'docs', 'readme', {
				name: blueprint.name,
				title: blueprint.src.length > 0 ? `@orkestrel/${blueprint.name}` : blueprint.name,
				description:
					blueprint.description ??
					(blueprint.src.length > 0
						? `The @orkestrel/${blueprint.name} package.`
						: `The ${blueprint.name} application.`),
				install:
					blueprint.src.length > 0
						? `## Install

\`\`\`sh
npm install @orkestrel/${blueprint.name}
\`\`\``
						: 'This is a private application workspace and is not published to npm.',
				usage: guideUsage(blueprint, pascal),
			}),
		)
	}
	if (selected.includes('orchestration')) {
		artifacts.push({
			path: '.github/workflows/ci.yml',
			group: 'orchestration',
			origin: 'computed',
			content: ciWorkflow(blueprint),
		})
	}

	for (const path of selectHostPaths(HOST_PATHS, blueprint.name)) {
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
