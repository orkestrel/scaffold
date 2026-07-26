import type { Artifact, Blueprint, Dependency, Group, Member, Plan, Environment } from './types.js'
import { fillTemplate } from '@orkestrel/template'
import {
	APP_MATRIX,
	APP_BROWSER_DEV_DEPENDENCIES,
	BASE_DEV_DEPENDENCIES,
	CHECKOUT_ACTION_SHA,
	CONST_KEYWORD,
	EXPORT_KEYWORD,
	FUNCTION_KEYWORD,
	GROUPS,
	HOST_PATHS,
	JSON_PRINT_WIDTH,
	SOURCE_BROWSER_DEV_DEPENDENCIES,
	SETUP_NODE_ACTION_SHA,
	SRC_MATRIX,
	TYPESCRIPT_EXTENSIONS,
} from './constants.js'
import {
	alignTable,
	blueprintToMembers,
	computeColumnWidth,
	escapeHtmlText,
	formatJson,
	pascalCase,
	pinPlan,
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
 * The host-neutral devDependency baseline every generated workspace needs.
 * Browser providers are added only by browser selections or the scaffold
 * engine's generated-browser consumer proof. A package's `extras` (code-unit
 * sorted) merge in on top, the extras' declared range winning on a name
 * collision with the baseline.
 *
 * @param extras - The blueprint's package-specific `extras` `Dependency[]`.
 * @returns The merged `devDependencies` record.
 *
 * @example
 * ```ts
 * devDependenciesFor([])['typescript'] // '^6.0.3'
 * ```
 */
export function devDependenciesFor(
	extras: readonly Dependency[],
): Readonly<Record<string, string>> {
	const baseline: Record<string, string> = {
		...BASE_DEV_DEPENDENCIES,
	}
	for (const extra of [...extras].sort((a, b) => compareCodeUnit(a.name, b.name))) {
		baseline[extra.name] = extra.range
	}
	return baseline
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
	// Every peer is ALSO dev-installed — grounded against the live
	// @orkestrel/middleware and @orkestrel/mcp exemplars, where every declared
	// peer (@orkestrel/database + @orkestrel/server for middleware;
	// @orkestrel/router + @orkestrel/server for mcp) appears in
	// `devDependencies` at its peer range, unconditionally (2/2 peer-declaring
	// exemplars observed). A peer without its dev-install cannot be built or
	// tested locally — `npm install` alone would never bring it in. Emitting
	// unconditionally here (rather than deriving from `extras`) keeps
	// `validateBlueprint`'s `peers ∩ extras` law intact: a peer is a peer, not
	// an extra, so it never round-trips through the `extras` array — it round-
	// trips here, directly off `spec.peers`, mirroring how `deriveBlueprint`
	// reads a dev-installed peer back into `peers` (never `extras`) on the way in.
	const peerDevDependencies: Record<string, string> = {}
	for (const peer of [...spec.peers].sort((a, b) => compareCodeUnit(a.name, b.name))) {
		peerDevDependencies[peer.name] = peer.range
	}

	// Scripts are built by sequential assignment so aggregate + per-environment
	// keys interleave in the exact live-package insertion order (`check:src`
	// immediately followed by each `check:src:<environment>`, and so on).
	const scripts: Record<string, string> = {
		clean: "node -e \"require('node:fs').rmSync('dist',{recursive:true,force:true})\"",
		copy: "node -e \"const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)\"",
		scaffold: spec.engine ? 'node ./dist/bin/scaffold.js' : 'scaffold',
		lint: 'oxlint --config .oxlintrc.json --fix --deny-warnings .',
		check: [
			'tsc --noEmit --project tsconfig.json',
			...(hasSource || spec.engine ? ['npm run check:src'] : []),
			...(spec.app.length > 0 ? ['npm run check:app'] : []),
		].join(' && '),
	}
	if (hasSource || spec.engine) {
		scripts['check:src'] =
			spec.src.map((environment) => `npm run check:src:${environment}`).join(' && ') +
			(spec.engine ? `${spec.src.length > 0 ? ' && ' : ''}npm run check:src:bin` : '')
		for (const environment of spec.src) {
			scripts[`check:src:${environment}`] =
				`tsc --noEmit -p configs/src/tsconfig.${environment}.json`
		}
	}
	if (spec.engine) scripts['check:src:bin'] = 'tsc --noEmit -p configs/src/tsconfig.bin.json'
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
		...(hasSource || spec.engine ? ['npm run test:src'] : []),
		...(spec.app.length > 0 ? ['npm run test:app'] : []),
		'npm run test:policy',
		'npm run test:guides',
	].join(' && ')
	if (hasSource || spec.engine) {
		scripts['test:src'] =
			'vitest run --config vite.config.ts --no-cache --reporter=dot ' +
			spec.src.map((environment) => `--project src:${environment}`).join(' ') +
			(spec.engine ? `${spec.src.length > 0 ? ' ' : ''}--project src:bin` : '')
		for (const environment of spec.src) {
			scripts[`test:src:${environment}`] =
				`vitest run --config vite.config.ts --no-cache --reporter=dot --project src:${environment}`
		}
	}
	if (spec.engine)
		scripts['test:src:bin'] =
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project src:bin'
	if (spec.engine)
		scripts['test:integration'] =
			'vitest run --config vite.config.ts --no-cache --reporter=dot --project integration'
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
		...(hasSource || spec.engine ? ['npm run build:src'] : []),
		...(spec.app.length > 0 ? ['npm run build:app'] : []),
		...(spec.engine ? ['npm run build:host'] : []),
	].join(' && ')
	if (hasSource || spec.engine) {
		scripts['build:src'] =
			spec.src.map((environment) => `npm run build:src:${environment}`).join(' && ') +
			(spec.engine ? `${spec.src.length > 0 ? ' && ' : ''}npm run build:src:bin` : '')
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
		}
		if (spec.app.includes('server')) {
			scripts.serve = 'node dist/app/server/main.cjs'
			scripts['serve:build'] = 'npm run build:app:server && npm run serve'
		}
	}
	if (spec.engine) {
		scripts['build:src:bin'] = 'vite build --config configs/src/vite.bin.config.ts'
		scripts['build:host'] =
			"node -e \"import('./dist/src/server/index.js').then((m)=>{const n=m.stageHost(process.cwd(),'dist/host').length;console.log('build-host: staged '+n+' file(s) into dist/host')})\""
	}
	scripts.prepublishOnly =
		'npm run format:check && npm run lint:check && npm run check && npm run build && npm test' +
		(spec.engine ? ' && npm run test:integration' : '')

	const devDependencies = {
		...devDependenciesFor(spec.extras),
		...peerDevDependencies,
		...(spec.src.includes('browser') ? SOURCE_BROWSER_DEV_DEPENDENCIES : {}),
		...(spec.app.includes('browser') ? APP_BROWSER_DEV_DEPENDENCIES : {}),
		...(spec.engine ? SOURCE_BROWSER_DEV_DEPENDENCIES : {}),
	}
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
		...(spec.engine ? { bin: { scaffold: './dist/bin/scaffold.js' } } : {}),
		files: spec.engine
			? ['dist/src', 'dist/bin', 'dist/host', 'README.md']
			: hasSource
				? ['dist/src', 'README.md']
				: ['dist/app', 'README.md'],
		type: 'module',
		...(hasSource
			? {
					sideEffects: spec.engine ? ['./src/bin/scaffold.ts', './dist/bin/scaffold.js'] : false,
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
				.filter(([depName]) => !spec.engine || depName !== '@orkestrel/scaffold')
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
 * The rendered import / `resolve` header block every `rootViteConfig` shape
 * prefixes — the official Playwright provider import appears only when
 * `needsPlaywright`, per the three grounded `rootViteConfig`
 * shapes: unconditional for a multi-environment blueprint, conditional on the
 * sole environment being `'browser'` for a single non-`core` environment, absent for
 * `core`-only.
 *
 * @param needsPlaywright - Whether this shape ships a browser test project (and so needs Playwright).
 * @param needsVue - Whether the generated root imports the Vue Vite plugin.
 * @returns The rendered header block, newline-terminated.
 *
 * @example
 * ```ts
 * viteHeader(false).includes('@vitest/browser-playwright') // false
 * viteHeader(true).includes('@vitest/browser-playwright') // true
 * ```
 */
export function viteHeader(needsPlaywright: boolean, needsVue = false): string {
	// Rendered blocks below are generated FILE TEXT, so every embedded
	// declaration keyword is interpolated rather than typed literally at
	// column 0 — the doc↔source parity scan (AGENTS §22) reads this file's
	// own source lines, and a flush-left `export const foo` inside a
	// template string is indistinguishable from a real module-scope export
	// to that line-based scan; interpolating the keyword keeps the emitted
	// bytes identical while keeping this file's own declaration environment
	// exactly the one export it documents.
	// The official Playwright provider import is present only when needed.
	const playwrightImports = needsPlaywright
		? `import { playwright } from '@vitest/browser-playwright'
import { chromium } from 'playwright'
`
		: ''
	const vueImports = needsVue
		? `import vue from '@vitejs/plugin-vue'
import { parse as parseVue } from 'vue/compiler-sfc'
`
		: ''
	const vueBoundary = needsVue
		? `,
		transform: {
			order: 'pre',
			async handler(code, id) {
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
							this.error('Environment boundary requires resolved Vite configuration')
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
									this.error('Resolved dependencies must remain inside their physical package root')
								}
								trustedPackageRoots.add(packageRoot)
							}
							continue
						}
						const resolvedSource = workspacePath(physicalSource)
						if (resolvedSource === undefined) {
							this.error('Environment modules cannot import files outside the workspace')
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
							this.error('Environment modules cannot import files outside the workspace')
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
						this.error('Vue block URLs must use valid URI encoding')
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
		: `,
		transform: {
			order: 'pre',
			async handler(code, id) {
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
				if (!environmentModule && importerPackageRoot === undefined) {
					return restored === code ? null : restored
				}
				if (isCSSRequest(id)) {
					const config = resolvedConfig
					if (config === undefined) {
						this.error('Environment boundary requires resolved Vite configuration')
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
								this.error('Resolved dependencies must remain inside their physical package root')
							}
							trustedPackageRoots.add(packageRoot)
						}
						continue
					}
					const resolvedSource = workspacePath(physicalSource)
					if (resolvedSource === undefined) {
						this.error('Environment modules cannot import files outside the workspace')
					}
					const assetError = environmentPathError(owner, resolvedSource)
					if (assetError !== undefined) this.error(assetError)
				}
				return restored === code ? null : restored
			},
		}`
	const environmentBoundary = `
${CONST_KEYWORD} WORKSPACE_ROOT = realpathSync.native(dirname(fileURLToPath(import.meta.url)))
${EXPORT_KEYWORD} ${CONST_KEYWORD} IMPORT_META_ENV_PREFIX = 'import.meta.env.'

${EXPORT_KEYWORD} function physicalPath(path: string): string {
	const [pathWithoutQuery] = path.split('?')
	const candidate = pathWithoutQuery?.startsWith('/@fs/')
		? pathWithoutQuery.slice('/@fs/'.length)
		: pathWithoutQuery
	const physicalCandidate =
		candidate !== undefined && /^file:/i.test(candidate) ? fileURLToPath(candidate) : candidate
	const absoluteCandidate =
		physicalCandidate === undefined || physicalCandidate.length === 0
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

${EXPORT_KEYWORD} function isOutsideWorkspacePath(path: string): boolean {
	const [pathWithoutQuery] = path.split('?')
	if (pathWithoutQuery === undefined) return false
	const candidate = pathWithoutQuery.startsWith('/@fs/')
		? pathWithoutQuery.slice('/@fs/'.length)
		: pathWithoutQuery
	return isAbsolute(candidate)
}

${EXPORT_KEYWORD} function containedPath(root: string, target: string): boolean {
	const relativePath = relative(root, target)
	return (
		relativePath === '' ||
		(relativePath !== '..' && !relativePath.startsWith(\`..\${sep}\`) && !isAbsolute(relativePath))
	)
}

${
	needsVue
		? `${EXPORT_KEYWORD} function browserServerRoots(): readonly string[] {
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
			const candidate = decoded.slice('/@fs/'.length)
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
		if (!decoded.startsWith('/')) return null
		return physicalPath(resolvePath(root, decoded.slice(1)))
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

${EXPORT_KEYWORD} function stylesheetAssetError(
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

${EXPORT_KEYWORD} function enforceOutputPath(configured: string, expected: string): void {
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
			if (output.endsWith('/browser') && config.build.assetsInlineLimit !== 0) {
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

${EXPORT_KEYWORD} function decodeAssetSource(source: string): string | undefined {
	try {
		return decodeURI(source)
	} catch {
		return undefined
	}
}

${EXPORT_KEYWORD} function filterHtmlAssetSource(
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
	'<!doctype html>\\n<html lang="en">\\n\\t<head>\\n\\t\\t' + HTML_SECURITY_META + '\\n'

${EXPORT_KEYWORD} function maskIgnoredHtml(environmentKeys: ReadonlySet<string>, html: string): string {
	if (!html.replaceAll('\\r\\n', '\\n').startsWith(HTML_SECURITY_PREFIX)) {
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

${EXPORT_KEYWORD} function restoreIgnoredHtml(code: string): string {
	const literals = code.replace(
		/(?<prefix>[vV][iI][tT][eE])&#45;(?<suffix>[iI][gG][nN][oO][rR][eE])/gu,
		'$<prefix>-$<suffix>',
	)
	return literals.replace(
		/(?<prefix>[vV][iI][tT][eE])&#0(?<zeros>0*)45;(?<suffix>[iI][gG][nN][oO][rR][eE])/gu,
		'$<prefix>&#$<zeros>45;$<suffix>',
	)
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
			handler: maskIgnoredHtml.bind(undefined, environmentKeys),
		},
	}
}

${EXPORT_KEYWORD} function restoreHtml(): Plugin {
	return {
		name: 'orkestrel-html-boundary-restore',
		enforce: 'pre',
		transformIndexHtml: restoreIgnoredHtml,
	}
}

${EXPORT_KEYWORD} function finalizeHtml(): Plugin {
	return {
		name: 'orkestrel-html-boundary-finalize',
		enforce: 'post',
		transformIndexHtml: {
			order: 'post',
			handler(html) {
				if (!html.includes(HTML_SECURITY_META)) {
					throw new Error(
						'[orkestrel-environment-boundary] Browser HTML must retain its security policy',
					)
				}
			},
		},
	}
}

${EXPORT_KEYWORD} async function environmentAssetSources(
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
	visitor.visit(parseAst(transformed.code, null, path))
	return sources
}

${EXPORT_KEYWORD} function environmentBoundary(
	owner: 'src/core' | 'src/browser' | 'src/server' | 'app/core' | 'app/browser' | 'app/server',
): Plugin {
	const trustedPackageRoots = new Set<string>()
	let environmentRoot = WORKSPACE_ROOT
	let resolvedConfig: ResolvedConfig | undefined
	return {
		name: 'orkestrel-environment-boundary',
		enforce: 'pre',
		configResolved(config) {
			environmentRoot = physicalPath(config.root)
			resolvedConfig = config
		},
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
			if (importer === undefined) return null
			if (source.startsWith('\\0')) return null
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
						this.error(
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
					this.error('Resolved dependencies must remain inside their physical package root')
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
				this.error('Dependency module source must be a bounded regular file')
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
		},
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
		},
		buildEnd(error) {
			if (error !== undefined) return
			for (const id of this.getModuleIds()) {
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
	return `import type {
	CSSOptions,
	HtmlAssetSource,
	HTMLOptions,
	Plugin,
	ResolvedConfig,
	UserConfig,
} from 'vite'
import { isCSSRequest, parseAst, preprocessCSS, transformWithOxc, Visitor } from 'vite'
import { defineConfig, mergeConfig } from 'vitest/config'
import tsconfig from './tsconfig.json' with { type: 'json' }
import { fileURLToPath, URL } from 'node:url'
import { isBuiltin } from 'node:module'
import {
	closeSync,
	constants as FS_CONSTANTS,
	existsSync,
	fstatSync,
	lstatSync,
	openSync,
	readSync,
	realpathSync,
} from 'node:fs'
import { dirname, isAbsolute, relative, resolve as resolvePath, sep } from 'node:path'
${playwrightImports}${vueImports}
${needsPlaywright ? `${CONST_KEYWORD} hasChromium = existsSync(chromium.executablePath())\n` : ''}
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
					if (rule.type !== 'import') return
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
${EXPORT_KEYWORD} ${CONST_KEYWORD} PACKAGE_MANIFEST_BYTES = 1_048_576
${EXPORT_KEYWORD} ${CONST_KEYWORD} ENVIRONMENT_MODULE_BYTES = 8_388_608
${environmentBoundary}`
}

/** Build the dedicated Node-only repository policy Vitest project. */
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
 * The single non-`core` environment's factory IS the base (Shape 3 of
 * `rootViteConfig`) — the environment's own `viteHeader` (Playwright only when
 * `environment === 'browser'`, per the live sqlite/indexeddb exemplars) prefixes
 * the environment-specific `srcBrowser` / `srcServer` + `guides` projects export.
 *
 * @param environment - The sole declared non-`core` environment.
 * @returns The root `vite.config.ts` file content for a single non-`core` environment, newline-terminated.
 *
 * @example
 * ```ts
 * singleSrcViteConfig('server').includes('srcServer') // true
 * ```
 */
export function singleSrcViteConfig(environment: 'browser' | 'server'): string {
	// Rendered blocks below are generated FILE TEXT, so every embedded
	// declaration keyword is interpolated rather than typed literally at
	// column 0 — the doc↔source parity scan (AGENTS §22) reads this file's
	// own source lines, and a flush-left `export const foo` inside a
	// template string is indistinguishable from a real module-scope export
	// to that line-based scan; interpolating the keyword keeps the emitted
	// bytes identical while keeping this file's own declaration environment
	// exactly the one export it documents.
	const header = viteHeader(environment === 'browser')
	if (environment === 'browser') {
		return `${header}
${EXPORT_KEYWORD} const srcBrowser = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			css: ENVIRONMENT_CSS,
			publicDir: false,
			plugins: [
				outputBoundary('dist/src/browser'),
				environmentBoundary('src/browser'),
			],
			build: {
				assetsInlineLimit: 0,
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
				include: hasChromium ? ['tests/src/browser/**/*.test.ts'] : [],
				passWithNoTests: !hasChromium,
				setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
				browser: {
					enabled: hasChromium,
					provider: playwright(),
					instances: [{ browser: 'chromium', headless: true }],
				},
				fileParallelism: false,
			},
		},
		config ?? {},
	)

${policyViteProject()}
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
		projects: [srcBrowser, policy, guides],
	},
})
`
	}
	return `${header}
${EXPORT_KEYWORD} const srcServer = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			css: ENVIRONMENT_CSS,
			publicDir: false,
			plugins: [
				outputBoundary('dist/src/server'),
				environmentBoundary('src/server'),
			],
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

${policyViteProject()}
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
		projects: [srcServer, policy, guides],
	},
})
`
}

/**
 * The root `vite.config.ts` — three grounded shapes, chosen by a blueprint's
 * `src`:
 *   1. `core`-only — `srcCore` + `guides`, no Playwright at all (the live
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
 * @param engine - Structural: `true` appends the `srcBin` project (an
 *   executable build target, never a barrel) after the other declared
 *   projects — the self-hosting tax, grounded against this very repo's own
 *   checked-in `vite.config.ts`.
 * @returns The root `vite.config.ts` file content, newline-terminated.
 *
 * @example
 * ```ts
 * rootViteConfig(['core']).includes('srcCore') // true
 * ```
 */
export function rootViteConfig(src: readonly Environment[], engine = false): string {
	// Rendered blocks below are generated FILE TEXT, so every embedded
	// declaration keyword is interpolated rather than typed literally at
	// column 0 — the doc↔source parity scan (AGENTS §22) reads this file's
	// own source lines, and a flush-left `export const foo` inside a
	// template string is indistinguishable from a real module-scope export
	// to that line-based scan; interpolating the keyword keeps the emitted
	// bytes identical while keeping this file's own declaration environment
	// exactly the one export it documents.
	const hasCore = src.includes('core')
	const nonCore = src.filter((environment) => environment !== 'core')
	const needsPlaywright = src.includes('browser')
	const header = viteHeader(needsPlaywright)

	if (!hasCore) {
		const [onlyEnvironment] = nonCore
		if (onlyEnvironment === 'browser' || onlyEnvironment === 'server') {
			return singleSrcViteConfig(onlyEnvironment)
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
				plugins: [
					outputBoundary('dist/src/browser'),
					environmentBoundary('src/browser'),
				],
				build: {
					assetsInlineLimit: 0,
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
					include: hasChromium ? ['tests/src/browser/**/*.test.ts'] : [],
					passWithNoTests: !hasChromium,
					exclude: ['tests/src/core/**/*.test.ts'],
					setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
					browser: {
						enabled: hasChromium,
						provider: playwright(),
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
				css: ENVIRONMENT_CSS,
				publicDir: false,
				plugins: [
					outputBoundary('dist/src/server'),
					environmentBoundary('src/server'),
				],
				build: {
					lib: {
						entry: resolveWorkspacePath('src/server/index.ts'),
						fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
					},
					outDir: 'dist/src/server',
					target: 'node22',
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
	const binBlock = engine
		? `
${EXPORT_KEYWORD} const srcBin = (config?: UserConfig): UserConfig =>
	srcCore(
		mergeConfig(
			{
				publicDir: false,
				plugins: [outputBoundary('dist/bin')],
				build: {
					lib: {
						entry: resolveWorkspacePath('src/bin/scaffold.ts'),
						formats: ['es'],
						fileName: () => 'scaffold.js',
					},
					outDir: 'dist/bin',
					target: 'node22',
					rolldownOptions: {
						external: [/^node:/, /^@orkestrel\\//, /^@src\\//],
					},
				},
				test: {
					name: { label: 'src:bin', color: 'yellow' },
					include: ['tests/src/bin/**/*.test.ts'],
					exclude: ['tests/src/core/**/*.test.ts', 'tests/src/server/**/*.test.ts'],
					setupFiles: ['./tests/setup.ts', './tests/setupServer.ts'],
				},
			},
			config ?? {},
		),
	)

${EXPORT_KEYWORD} const integration = (config?: UserConfig): UserConfig =>
	srcBin(
		mergeConfig(
			{
				test: {
					name: { label: 'integration', color: 'blue' },
					include: ['tests/integration/**/*.test.ts'],
					exclude: ['tests/src/**/*.test.ts', 'tests/guides/**/*.test.ts'],
				},
			},
			config ?? {},
		),
	)
`
		: ''
	const blocks =
		nonCore
			.map((environment) => (environment === 'browser' ? browserBlock : serverBlock))
			.join('') + binBlock
	const projectNames = [
		...(hasCore ? ['srcCore'] : []),
		...nonCore.map((environment) => `src${pascalCase(environment)}`),
		'policy',
		'guides',
		...(engine ? ['srcBin'] : []),
		...(engine ? ['integration'] : []),
	]
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

${policyViteProject()}
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

/**
 * Build the root Vite/Vitest configuration for a workspace that includes
 * app environments, optionally alongside published src environments.
 *
 * @param src - Published src environments.
 * @param app - Private app environments.
 * @param engine - Whether the workspace also builds scaffold's executable.
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
	engine = false,
): string {
	const hasSourceCore = src.includes('core')
	const needsBrowser = src.includes('browser') || app.includes('browser')
	const header = viteHeader(needsBrowser, app.includes('browser'))
	const projects: string[] = []
	const blocks: string[] = []

	if (src.includes('core')) {
		projects.push('srcCore')
		blocks.push(`
${EXPORT_KEYWORD} const srcCore = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			css: ENVIRONMENT_CSS,
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
		projects.push('srcBrowser')
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
				assetsInlineLimit: 0,
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
				include: hasChromium ? ['tests/src/browser/**/*.test.ts'] : [],
				passWithNoTests: !hasChromium,
				${hasSourceCore ? "exclude: ['tests/src/core/**/*.test.ts'],\n\t\t\t\t" : ''}setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
				browser: {
					enabled: hasChromium,
					provider: playwright(),
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
		projects.push('srcServer')
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
			css: ENVIRONMENT_CSS,
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
		projects.push('appCore')
		blocks.push(`
${EXPORT_KEYWORD} const appCore = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			css: ENVIRONMENT_CSS,
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
		projects.push('appBrowser()')
		blocks.push(`
${EXPORT_KEYWORD} function appBrowser(...config: readonly never[]): UserConfig {
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
		optimizeDeps: { include: ['vue'] },
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
			include: hasChromium ? ['tests/app/browser/**/*.test.ts'] : [],
			passWithNoTests: !hasChromium,
			setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts'],
			browser: {
				enabled: hasChromium,
				provider: playwright(),
				instances: [{ browser: 'chromium', headless: true }],
			},
			fileParallelism: false,
		},
	}
}
`)
	}
	if (app.includes('server')) {
		projects.push('appServer')
		blocks.push(`
${EXPORT_KEYWORD} const appServer = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			css: ENVIRONMENT_CSS,
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
	if (engine) {
		projects.push('srcBin', 'integration')
		blocks.push(`
${EXPORT_KEYWORD} const srcBin = (config?: UserConfig): UserConfig =>
	mergeConfig(
		{
			resolve,
			publicDir: false,
			plugins: [outputBoundary('dist/bin')],
			build: {
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

${EXPORT_KEYWORD} const integration = (config?: UserConfig): UserConfig =>
	srcBin(
		mergeConfig(
			{
				test: {
					name: { label: 'integration', color: 'blue' },
					include: ['tests/integration/**/*.test.ts'],
					exclude: ['tests/src/**/*.test.ts', 'tests/app/**/*.test.ts', 'tests/guides/**/*.test.ts'],
				},
			},
			config ?? {},
		),
	)
`)
	}

	return `${header}
${policyViteProject()}
${EXPORT_KEYWORD} const guides = (config?: UserConfig): UserConfig =>
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
${blocks.join('')}
export default defineConfig({
	resolve,
	test: {
		projects: [${[...projects, 'policy', 'guides'].join(', ')}],
	},
})
`
}

/**
 * `configs/src/tsconfig.core.json` — unchanged core shape.
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
			lib: ['ESNext'],
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
	ENVIRONMENT_CSS,
	environmentBoundary,
	outputBoundary,
	srcCore,
	resolveWorkspacePath,
} from '../../vite.config'

export default defineConfig(
	srcCore({
		css: ENVIRONMENT_CSS,
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
import { ${anchor}, resolveWorkspacePath } from '../../vite.config'

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
			lib: environment === 'browser' ? ['ESNext', 'DOM', 'DOM.Iterable'] : ['ESNext'],
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
import { ${anchor} } from '../../vite.config'

export default defineConfig(${anchor}())
`
}

/**
 * Build selection-aware GitHub CI without external service dependencies.
 *
 * @param spec - The workspace blueprint.
 * @returns The complete `.github/workflows/ci.yml` content.
 */
export function ciWorkflow(spec: Blueprint): string {
	const browser =
		spec.engine || spec.src.includes('browser') || spec.app.includes('browser')
			? `
      - name: Install Playwright browsers
        run: npx --no-install playwright install --with-deps chromium
`
			: ''
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
        run: npm test${
					spec.engine
						? `

      - name: Run live consumer integration
        run: npm run test:integration
`
						: ''
				}
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
					? applicationViteConfig(spec.src, spec.app, spec.engine)
					: rootViteConfig(spec.src, spec.engine),
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
	for (const environment of spec.app) {
		const row = APP_MATRIX[environment]
		for (const path of row.configs) {
			const content = path.endsWith('.json')
				? appTsconfig(environment, spec.app.includes('core'))
				: appViteConfig(environment === 'browser' ? 'browser' : 'server')
			artifacts.push({ path, group: 'configs', origin: 'computed', environment, content })
		}
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
	const typeImport =
		computeColumnWidth(inlineTypeImport) <= JSON_PRINT_WIDTH
			? inlineTypeImport
			: `import type {
	${pascal}Interface,
	${pascal}Options,
} from './types.js'`
	const entityImport = `import { ${pascal} } from './${pascal}.js'`
	const inlineSignature = `function create${pascal}(options: ${pascal}Options): ${pascal}Interface`
	const signature =
		computeColumnWidth(`${EXPORT_KEYWORD} ${inlineSignature} {`) <= JSON_PRINT_WIDTH
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
 * @returns Complete, runnable app/core, app/browser, and app/server artifacts.
 */
export function applicationArtifacts(spec: Blueprint): readonly Artifact[] {
	const artifacts: Artifact[] = []
	const hasCore = spec.app.includes('core')
	const nameLiteral = serializeTypeScriptString(spec.name)
	if (hasCore) {
		artifacts.push(
			fillArtifact('app/core/types.ts', 'source', 'appCoreTypes', {}, 'core'),
			fillArtifact('app/core/constants.ts', 'source', 'appCoreConstants', { nameLiteral }, 'core'),
			fillArtifact('app/core/errors.ts', 'source', 'appCoreErrors', {}, 'core'),
			fillArtifact('app/core/parsers.ts', 'source', 'appCoreParsers', {}, 'core'),
			fillArtifact('app/core/factories.ts', 'source', 'appCoreFactories', {}, 'core'),
			fillArtifact('app/core/index.ts', 'source', 'appCoreIndex', {}, 'core'),
		)
	}
	if (spec.app.includes('browser')) {
		const nameImport = hasCore
			? "import { APP_NAME } from '@app/core'"
			: "import { APP_NAME } from './constants.js'"
		const nameConstant = hasCore
			? ''
			: `/** The browser-only application name. */
${EXPORT_KEYWORD} ${CONST_KEYWORD} APP_NAME = ${nameLiteral}

`
		artifacts.push(
			fillArtifact('app/browser/types.ts', 'source', 'appBrowserTypes', {}, 'browser'),
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
				{ nameImport },
				'browser',
			),
			fillArtifact('app/browser/index.ts', 'source', 'appBrowserIndex', {}, 'browser'),
			fillArtifact('app/browser/main.ts', 'source', 'appBrowserMain', {}, 'browser'),
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
			fillArtifact('app/server/types.ts', 'source', 'appServerTypes', {}, 'server'),
			fillArtifact(
				'app/server/constants.ts',
				'source',
				'appServerConstants',
				{ nameConstant },
				'server',
			),
			fillArtifact('app/server/errors.ts', 'source', 'appServerErrors', {}, 'server'),
			fillArtifact('app/server/parsers.ts', 'source', 'appServerParsers', {}, 'server'),
			fillArtifact(
				'app/server/handlers.ts',
				'source',
				'appServerHandlers',
				{ nameImport },
				'server',
			),
			fillArtifact('app/server/ApplicationServer.ts', 'source', 'appServerEntity', {}, 'server'),
			fillArtifact('app/server/factories.ts', 'source', 'appServerFactories', {}, 'server'),
			fillArtifact(
				'app/server/ApplicationServerRunner.ts',
				'source',
				'appServerRunner',
				{},
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
	const specifierList =
		computeColumnWidth(`${CONST_KEYWORD} SELF_SPECIFIERS = ${inlineSpecifierList}`) <=
		JSON_PRINT_WIDTH
			? inlineSpecifierList
			: `[
${specifierItems.map((specifier) => `\t${specifier},`).join('\n')}
]`
	const moduleLines = Object.entries(modules)
		.map(([specifier, module]) => `\t'${specifier}': '${module}',`)
		.join('\n')
	return `${EXPORT_KEYWORD} ${CONST_KEYWORD} SELF_SPECIFIERS = ${specifierList}

${EXPORT_KEYWORD} ${CONST_KEYWORD} SPECIFIER_MODULES: Readonly<Record<string, string>> = {
${moduleLines}
}
${EXPORT_KEYWORD} ${CONST_KEYWORD} SPECIFIER_SOURCES = new Map<string, ReturnType<typeof createSource>>()
${EXPORT_KEYWORD} ${FUNCTION_KEYWORD} exportsFor(specifier: string): readonly string[] {
	const module = SPECIFIER_MODULES[specifier]
	if (module === undefined) return []
	let source = SPECIFIER_SOURCES.get(module)
	if (source === undefined) {
		source = createSource({ files: GUIDE_FILES, module })
		SPECIFIER_SOURCES.set(module, source)
	}
	return source.exports().map((symbol) => symbol.name)
}`
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
	const browserPolicySpecifier = hasBrowser ? ', existsSync' : ''
	const browserPolicyImport = hasBrowser ? "import { chromium } from 'playwright'" : ''
	const vuePolicyImport = hasVue ? "import { parse as parseVue } from 'vue/compiler-sfc'" : ''
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
	it.skipIf(!existsSync(chromium.executablePath()))(
		'runs browser suites only when the real Chromium executable is installed',
		() => {
			expect(existsSync(chromium.executablePath())).toBe(true)
		},
	)`
		: ''
	const artifacts: Artifact[] = [
		fillArtifact('tests/setup.ts', 'tests', 'setup', {}),
		fillArtifact('tests/policy.test.ts', 'tests', 'policyTest', {
			browserPolicySpecifier,
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
	if (spec.app.includes('core')) {
		artifacts.push(
			fillArtifact('tests/app/core/factories.test.ts', 'tests', 'appCoreTest', {}, 'core'),
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
				{ browserTestNameImport },
				'browser',
			),
		)
	}
	if (spec.app.includes('server')) {
		const testNameImport = spec.app.includes('core')
			? "import { APP_NAME } from '@app/core'"
			: "import { APP_NAME } from '@app/server'"
		artifacts.push(
			fillArtifact(
				'tests/app/server/ApplicationServer.test.ts',
				'tests',
				'appServerTest',
				{ testNameImport },
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
	const explicitInstance =
		computeColumnWidth(`\t\t${CONST_KEYWORD} ${inlineExplicitInstance}`) <= JSON_PRINT_WIDTH
			? inlineExplicitInstance
			: computeColumnWidth(`\t\t${CONST_KEYWORD} instance: ${pascal}Interface = new ${pascal}({`) <=
				  JSON_PRINT_WIDTH
				? multilineExplicitInstance
				: `instance: ${pascal}Interface =
			new ${pascal}({
				id: 'example',
			})`
	const inlineValueImport = `import { create${pascal}, ${pascal} } from '@src/core'`
	const valueImport =
		computeColumnWidth(inlineValueImport) <= JSON_PRINT_WIDTH
			? inlineValueImport
			: `import {
	create${pascal},
	${pascal},
} from '@src/core'`
	const inlineTestTypeImport = `import type { ${pascal}Interface } from '@src/core'`
	const testTypeImport =
		computeColumnWidth(inlineTestTypeImport) <= JSON_PRINT_WIDTH
			? inlineTestTypeImport
			: `import type {
	${pascal}Interface,
} from '@src/core'`
	const inlineFactoryInstance = `instance = create${pascal}({ id: 'example' })`
	const factoryInstance =
		computeColumnWidth(`\t\t${CONST_KEYWORD} ${inlineFactoryInstance}`) <= JSON_PRINT_WIDTH
			? inlineFactoryInstance
			: `instance = create${pascal}({
			id: 'example',
		})`
	const inlineTypeExpectation = `expectTypeOf(create${pascal}({ id: 'example' })).toEqualTypeOf<${pascal}Interface>()`
	const typeExpectation =
		computeColumnWidth(`\t\t${inlineTypeExpectation}`) <= JSON_PRINT_WIDTH
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
	if (spec.app.includes('server')) {
		examples.push(`\`\`\`ts
import { once } from 'node:events'
import { createServer } from 'node:http'
import {
	APP_HEALTH_METHOD,
	APP_HEALTH_PATH,
	APP_HEADERS_TIMEOUT,
	APP_HOST_LABEL_PATTERN,
	APP_KEEP_ALIVE_TIMEOUT,
	APP_MAX_CONNECTIONS,
	APP_MAX_HEADERS,
	APP_MAX_REQUESTS_PER_SOCKET,
	APP_REQUEST_TIMEOUT,
	APP_NUMERIC_HOST_PATTERN,
	ApplicationServer,
	ApplicationServerError,
	DEFAULT_APP_START_TIMEOUT,
	MAX_APP_START_TIMEOUT,
	createApplicationServer,
	handleApplicationRequest,
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
${CONST_KEYWORD} options = parseApplicationServerOptions({ host, port, timeout })
APP_HOST_LABEL_PATTERN.test('api') // true
APP_NUMERIC_HOST_PATTERN.test('999.999.999.999') // true (and therefore rejected as a host)
APP_HEALTH_METHOD // 'GET'
APP_HEALTH_PATH // '/'
APP_MAX_CONNECTIONS // 16
APP_MAX_HEADERS // 100
APP_HEADERS_TIMEOUT // 10000
APP_REQUEST_TIMEOUT // 30000
APP_KEEP_ALIVE_TIMEOUT // 5000
APP_MAX_REQUESTS_PER_SOCKET // 100
DEFAULT_APP_START_TIMEOUT // 10000
MAX_APP_START_TIMEOUT // 300000
${CONST_KEYWORD} handlerServer = createServer(handleApplicationRequest)
handlerServer.listen(0, host)
await once(handlerServer, 'listening')
${CONST_KEYWORD} handlerClosed = once(handlerServer, 'close')
handlerServer.close()
await handlerClosed

${CONST_KEYWORD} error = new ApplicationServerError('CONFIG', 'invalid')
isApplicationServerError(error) // true
reportApplicationServerError(error) // writes only a stable CONFIG diagnostic
new ApplicationServer(options) // stopped entity

${CONST_KEYWORD} server = createApplicationServer(options)
${CONST_KEYWORD} controller = new AbortController()
await server.start(controller.signal)
await server.stop()
\`\`\`

\`\`\`ts
import { ApplicationServerRunner } from '@app/server'

${CONST_KEYWORD} runner = new ApplicationServerRunner({ port: 0 })
runner.start() // process owns shutdown signals
await runner.stop()
\`\`\`

\`\`\`ts
import { startApplicationServer } from '@app/server'

${CONST_KEYWORD} processRunner = startApplicationServer({ port: 0 })
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
				'Serialize in call order; start only when stopped, and repeat safely when already listening. The optional `AbortSignal` and bounded startup timeout cancel pending name resolution/listen work. Rejects with `ApplicationServerError` code `LIFECYCLE` when startup fails, times out, or the caller aborts.',
			],
			[
				'`stop`',
				'`Promise<void>`',
				'Cancel every pending start before its queued stop, force active and idle connections closed, and repeat safely when already stopped. Rejects with `ApplicationServerError` code `LIFECYCLE` when closing fails.',
			],
		],
	)
	const runnerMethods = alignTable(
		['Method', 'Returns', 'Behavior'],
		[
			[
				'`start`',
				'`void`',
				'Register one idempotent set of SIGINT/SIGTERM cleanup listeners, start the server, and translate asynchronous startup failures into a non-zero process exit code.',
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

The constructor validates direct options plus \`APP_HOST\`, \`APP_PORT\`, and
\`APP_START_TIMEOUT\` before allocating
a listener. Direct options must be an exact plain own-key data record containing only
\`host\`, \`port\`, and/or \`timeout\`; inherited properties, accessors, symbols, instances, proxies that
throw during reflection, and unknown keys fail closed. Invalid values throw
\`ApplicationServerError\` code \`CONFIG\`; the default host is loopback and port \`0\` is
supported for collision-free ephemeral allocation. Startup defaults to 10 seconds and accepts
only integer timeouts from 1 through 300,000 milliseconds. Lifecycle failures use code
\`LIFECYCLE\`; both may carry \`context.cause\` or \`context.value\`. Narrow caught values with
\`isApplicationServerError\` before reading either field.

The generated server owns exactly \`GET /\`. It serializes
\`{ name: APP_NAME, status: 'ok' }\` as JSON with \`cache-control: no-store\`;
every other path returns deterministic plain-text \`404 Not Found\`, and every unsupported
method returns deterministic plain-text \`405 Method Not Allowed\` with \`Allow: GET\`.`
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
 * the guides index, and any vendored dependency guide mirrors.
 *
 * @param spec - The `Blueprint` to derive guide artifacts from.
 * @param pascal - The package's PascalCase entity name.
 * @param members - The blueprint's derived `Member[]`.
 * @returns The `guides` group's `Artifact[]`.
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
 * `HOST_PATHS` and `overrides` — then pin.
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
