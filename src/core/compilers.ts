import type {
	Artifact,
	BuildFormat,
	Blueprint,
	ContentArtifact,
	Dependency,
	Environment,
	Finding,
	Override,
	Plan,
	Question,
	Snapshot,
	ViteMachinery,
} from './types.js'
import { attempt, canonicalStringify, compareValues, sortValues } from '@orkestrel/contract'
import { fillTemplate } from '@orkestrel/template'
import {
	APP_BROWSER_DEV_DEPENDENCIES,
	APP_DEV_DEPENDENCIES,
	APP_MATRIX,
	APP_SERVER_DEV_DEPENDENCIES,
	BASE_DEV_DEPENDENCIES,
	BIN_CONFIGS,
	BIN_ENTRY_PATH,
	DEPENDENCY_NAME_PATTERN,
	ENVIRONMENTS,
	EXTRA_NAME_PATTERN,
	EXTRA_RANGE_PATTERN,
	GLOBAL_SETUP_PATH,
	GUIDES_TEST_PATH,
	HOST_PATHS,
	INTEGRATION_TEST_PATH,
	MAX_ARTIFACT_BYTES,
	MAX_COLLECTION_ITEMS,
	MAX_TOTAL_ARTIFACT_BYTES,
	NAME_PATTERN,
	ORKESTREL_RANGE_PATTERN,
	SERVICE_SCRIPT_PATH,
	SHOWCASE_CONFIG_PATH,
	SHOWCASE_DEV_DEPENDENCIES,
	SOURCE_BROWSER_DEV_DEPENDENCIES,
	SRC_MATRIX,
	VERSION_PATTERN,
} from './constants.js'
import {
	computeBytes,
	computeHash,
	inferDrift,
	inferGroup,
	matchesEngines,
	serializeTypeScriptString,
	selectHostPaths,
} from './helpers.js'
import { ARTIFACT_TEMPLATES, CONFIG_TEMPLATES } from './templates.js'

/**
 * Select the single published environment a package root points at.
 *
 * @param src - The declared published environments.
 * @returns That environment, or `undefined` when the selection declares none or
 * several.
 *
 * @remarks
 * A workspace publishing exactly one environment puts it at the package root,
 * so its entry fields and its `'.'` export condition both name that
 * environment's build. A workspace publishing several puts core at the root and
 * gives every other environment a subpath, so there is no single root to name.
 * Both callers read the same answer, which is why the branch is decided once
 * here rather than twice.
 *
 * @example
 * ```ts
 * import { srcToRoot } from '@orkestrel/scaffold'
 *
 * srcToRoot(['browser']) // 'browser'
 * srcToRoot(['core', 'server']) // undefined
 * ```
 */
export function srcToRoot(src: readonly Environment[]): Environment | undefined {
	if (src.length !== 1) return undefined
	return src[0]
}

/**
 * Build one `exports` condition block for a built environment.
 *
 * @param path - The extensionless `dist` path both conditions point at.
 * @param formats - The module formats that environment builds.
 * @returns The condition block: an `import` condition always, and a `require`
 * condition only where a CommonJS build exists.
 *
 * @remarks
 * The formats decide the shape, so no caller repeats the rule. An environment
 * that builds ES only publishes an `import` condition alone rather than a
 * `default` one, because a `default` condition answers `require` too and would
 * hand a CommonJS consumer a module its loader cannot read.
 *
 * @example
 * ```ts
 * import { pathToCondition } from '@orkestrel/scaffold'
 *
 * pathToCondition('./dist/src/browser/index', ['es'])
 * // { import: { types: './dist/src/browser/index.d.ts', default: './dist/src/browser/index.js' } }
 * ```
 */
export function pathToCondition(
	path: string,
	formats: readonly BuildFormat[],
): Readonly<Record<string, unknown>> {
	const module = { types: `${path}.d.ts`, default: `${path}.js` }
	if (!formats.includes('cjs')) return { import: module }
	return { import: module, require: { types: `${path}.d.cts`, default: `${path}.cjs` } }
}

/**
 * Project a published selection into the manifest's entry fields.
 *
 * @param src - The declared published environments.
 * @returns The `main` and `module` fields, plus `types` when one environment
 * owns the package root.
 *
 * @remarks
 * `main` follows the root environment's own formats, so an environment that
 * builds ES only points both fields at the same file rather than promising a
 * CommonJS build that never runs. A selection with several environments carries
 * no top-level `types`, because each environment declares its own under its
 * subpath and a single top-level field could only name one of them.
 *
 * @example
 * ```ts
 * import { srcToEntry } from '@orkestrel/scaffold'
 *
 * srcToEntry(['core']).main // './dist/src/core/index.cjs'
 * srcToEntry(['browser']).main // './dist/src/browser/index.js'
 * ```
 */
export function srcToEntry(src: readonly Environment[]): {
	readonly main: string
	readonly module: string
	readonly types?: string
} {
	const root = srcToRoot(src)
	const environment = root ?? 'core'
	const base = `./dist/src/${environment}/index`
	const main = SRC_MATRIX[environment].formats.includes('cjs') ? `${base}.cjs` : `${base}.js`
	if (root === undefined) return { main, module: `${base}.js` }
	return { main, module: `${base}.js`, types: `${base}.d.ts` }
}

/**
 * Project a published selection into the manifest's `exports` map.
 *
 * @param src - The declared published environments.
 * @returns The map, keyed by subpath in `ENVIRONMENTS` order.
 *
 * @remarks
 * One environment owns the package root and every other declared environment
 * takes the subpath its `SRC_MATRIX` row names, so the map never invents a
 * subpath. `./package.json` is published alongside, which is what lets a
 * consumer's tooling read the manifest of a package whose exports are otherwise
 * closed. A selection publishing nothing answers an empty map rather than a
 * core-rooted one, because a workspace with no published environment declares
 * no exports at all.
 *
 * @example
 * ```ts
 * import { srcToExports } from '@orkestrel/scaffold'
 *
 * Object.keys(srcToExports(['core', 'server'])) // ['.', './server', './package.json']
 * srcToExports([]) // {}
 * ```
 */
export function srcToExports(src: readonly Environment[]): Readonly<Record<string, unknown>> {
	if (src.length === 0) return {}
	const map: Record<string, unknown> = {}
	const root = srcToRoot(src)
	const environment = root ?? 'core'
	map['.'] = pathToCondition(`./dist/src/${environment}/index`, SRC_MATRIX[environment].formats)
	if (root === undefined) {
		for (const declared of ENVIRONMENTS) {
			if (declared === 'core' || !src.includes(declared)) continue
			const row = SRC_MATRIX[declared]
			map[row.path] = pathToCondition(`./dist/src/${declared}/index`, row.formats)
		}
	}
	map['./package.json'] = './package.json'
	return map
}

/**
 * Project a blueprint into the development dependencies its manifest declares.
 *
 * @param blueprint - The workspace specification.
 * @returns The merged set, sorted by package name.
 *
 * @remarks
 * The shared toolchain is the baseline every generated workspace carries, and
 * each declared axis adds the set its host needs. A declared extra or peer is
 * applied after those, so a workspace that pins a range for a package the
 * conditional sets also name gets the range it declared. An extra that restates
 * a shared toolchain pin never reaches here, because the gate refuses it.
 *
 * A peer is declared here as well as under `peerDependencies`, because a peer is
 * not installed by the workspace that declares it and developing against one
 * requires it present. A runtime dependency is the opposite case and is removed:
 * it is already installed, so a second declaration would state one fact twice
 * and the two ranges would be free to disagree.
 *
 * A workspace never declares itself, so its own package name is removed. That
 * matters for a workspace named after a package the baseline already carries:
 * the baseline is a list of what a workspace consumes, and a workspace does not
 * consume itself.
 *
 * @example
 * ```ts
 * import type { Blueprint } from '@orkestrel/scaffold'
 * import { blueprintToDevDependencies } from '@orkestrel/scaffold'
 *
 * declare const blueprint: Blueprint
 *
 * blueprintToDevDependencies(blueprint).typescript // the shared TypeScript pin
 * ```
 */
export function blueprintToDevDependencies(blueprint: Blueprint): Readonly<Record<string, string>> {
	const merged: Record<string, string> = {
		...BASE_DEV_DEPENDENCIES,
		...(blueprint.src.includes('browser') ? SOURCE_BROWSER_DEV_DEPENDENCIES : {}),
		...(blueprint.app.length > 0 ? APP_DEV_DEPENDENCIES : {}),
		...(blueprint.app.includes('browser') ? APP_BROWSER_DEV_DEPENDENCIES : {}),
		...(blueprint.showcase && blueprint.app.includes('browser') ? SHOWCASE_DEV_DEPENDENCIES : {}),
		...(blueprint.app.includes('server') ? APP_SERVER_DEV_DEPENDENCIES : {}),
	}
	for (const extra of blueprint.extras) merged[extra.name] = extra.range
	for (const peer of blueprint.peers) merged[peer.name] = peer.range
	const own = blueprint.src.length > 0 ? `@orkestrel/${blueprint.name}` : blueprint.name
	const runtime = new Set(blueprint.dependencies.map((dependency) => dependency.name))
	return Object.fromEntries(
		Object.entries(merged)
			.filter(([name]) => name !== own && !runtime.has(name))
			.sort(([left], [right]) => compareValues(left, right)),
	)
}

/**
 * Project a blueprint into the scripts its manifest declares.
 *
 * @param blueprint - The workspace specification.
 * @returns The scripts, in the order the manifest lists them.
 *
 * @remarks
 * Each script is the workspace-level contract the repository rules fix, narrowed
 * to the axes the blueprint declares: a check and a test script per declared
 * environment, an aggregate over each axis, the policy and configuration
 * proofs every workspace can pass before it has a public API, and one build per
 * target that actually builds. The isolated installed-package integration
 * proof stays out of `test` and runs from `prepublishOnly` instead.
 *
 * The configuration paths interpolated here are the same ones `SRC_MATRIX` and
 * `APP_MATRIX` list as each environment's configuration files, so a rename in
 * either matrix is a rename in both places.
 *
 * @example
 * ```ts
 * import type { Blueprint } from '@orkestrel/scaffold'
 * import { blueprintToScripts } from '@orkestrel/scaffold'
 *
 * declare const blueprint: Blueprint
 *
 * blueprintToScripts(blueprint)['format:check'] // 'oxfmt --config .oxfmtrc.json --check .'
 * ```
 */
export function blueprintToScripts(blueprint: Blueprint): Readonly<Record<string, string>> {
	const publishes = blueprint.src.length > 0
	const integrates = publishes && blueprint.integration
	const compiles = publishes || blueprint.bin
	const runtime = blueprint.app.filter((environment) => environment !== 'core')
	const vitest = 'vitest run --config vite.config.ts --no-cache --reporter=dot'
	const scripts: Record<string, string> = {
		clean: "node -e \"require('node:fs').rmSync('dist',{recursive:true,force:true})\"",
		copy: "node -e \"const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)\"",
		format: 'oxfmt --config .oxfmtrc.json --write .',
		'format:check': 'oxfmt --config .oxfmtrc.json --check .',
		lint: 'oxlint --config .oxlintrc.json --fix .',
		'lint:check': 'oxlint --config .oxlintrc.json --deny-warnings .',
		check: [
			'tsc --noEmit --project tsconfig.json',
			...(compiles ? ['npm run check:src'] : []),
			...(blueprint.app.length > 0 ? ['npm run check:app'] : []),
		].join(' && '),
	}
	if (compiles) {
		scripts['check:src'] = [
			...blueprint.src.map((environment) => `npm run check:src:${environment}`),
			...(blueprint.bin ? ['npm run check:src:bin'] : []),
		].join(' && ')
		for (const environment of blueprint.src) {
			scripts[`check:src:${environment}`] =
				`tsc --noEmit -p configs/src/tsconfig.${environment}.json`
		}
		if (blueprint.bin) scripts['check:src:bin'] = 'tsc --noEmit -p configs/src/tsconfig.bin.json'
	}
	if (blueprint.app.length > 0) {
		scripts['check:app'] = blueprint.app
			.map((environment) => `npm run check:app:${environment}`)
			.join(' && ')
		for (const environment of blueprint.app) {
			scripts[`check:app:${environment}`] =
				environment === 'browser'
					? 'vue-tsc --noEmit -p configs/app/tsconfig.browser.json'
					: `tsc --noEmit -p configs/app/tsconfig.${environment}.json`
		}
	}
	scripts.test = [
		...(compiles ? ['npm run test:src'] : []),
		...(blueprint.app.length > 0 ? ['npm run test:app'] : []),
		'npm run test:policy',
		'npm run test:config',
	].join(' && ')
	if (compiles) {
		scripts['test:src'] = [
			vitest,
			...blueprint.src.map((environment) => `--project ${SRC_MATRIX[environment].project}`),
			...(blueprint.bin ? ['--project src:bin'] : []),
		].join(' ')
		for (const environment of blueprint.src) {
			scripts[`test:src:${environment}`] = `${vitest} --project ${SRC_MATRIX[environment].project}`
		}
		if (blueprint.bin) scripts['test:src:bin'] = `${vitest} --project src:bin`
	}
	if (blueprint.app.length > 0) {
		scripts['test:app'] = [
			vitest,
			...blueprint.app.map((environment) => `--project ${APP_MATRIX[environment].project}`),
		].join(' ')
		for (const environment of blueprint.app) {
			scripts[`test:app:${environment}`] = `${vitest} --project ${APP_MATRIX[environment].project}`
		}
	}
	scripts['test:policy'] = `${vitest} --project policy`
	scripts['test:config'] = `${vitest} --project config`
	scripts['test:probe'] =
		'vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe'
	if (integrates) scripts['test:integration'] = `${vitest} --project integration`
	scripts.build = [
		'npm run clean',
		...(compiles ? ['npm run build:src'] : []),
		...(blueprint.app.length > 0 ? ['npm run build:app'] : []),
	].join(' && ')
	if (compiles) {
		scripts['build:src'] = [
			...blueprint.src.map((environment) => `npm run build:src:${environment}`),
			...(blueprint.bin ? ['npm run build:src:bin'] : []),
		].join(' && ')
		for (const environment of blueprint.src) {
			const build = `vite build --config configs/src/vite.${environment}.config.ts`
			scripts[`build:src:${environment}`] = SRC_MATRIX[environment].formats.includes('cjs')
				? `${build} && npm run copy dist/src/${environment}/index.d.ts dist/src/${environment}/index.d.cts`
				: build
		}
		if (blueprint.bin) {
			scripts['build:src:bin'] = 'vite build --config configs/src/vite.bin.config.ts'
		}
	}
	if (blueprint.app.length > 0) {
		scripts['build:app'] =
			runtime.length > 0
				? runtime.map((environment) => `npm run build:app:${environment}`).join(' && ')
				: 'npm run check:app:core'
		for (const environment of runtime) {
			scripts[`build:app:${environment}`] =
				`vite build --config configs/app/vite.${environment}.config.ts`
		}
	}
	if (blueprint.app.includes('browser')) {
		scripts.dev = 'vite --config configs/app/vite.browser.config.ts'
		if (blueprint.showcase) {
			scripts.showcase = `vite --config ${SHOWCASE_CONFIG_PATH}`
			scripts['build:showcase'] = `vite build --config ${SHOWCASE_CONFIG_PATH}`
			scripts.show =
				'npm run format && npm run build:showcase && npm run copy dist/showcase/index.html demo/showcase.html'
		}
	}
	if (blueprint.app.includes('server')) {
		scripts.serve = 'node dist/app/server/main.cjs'
		scripts['serve:build'] = 'npm run build:app:server && npm run serve'
	}
	scripts.prepublishOnly = [
		'npm run format:check && npm run lint:check && npm run check && npm run build && npm test',
		...(integrates ? ['npm run test:integration'] : []),
	].join(' && ')
	return scripts
}

/**
 * Compile a blueprint into its `package.json` content.
 *
 * @param blueprint - The workspace specification.
 * @returns The manifest text, newline-terminated.
 *
 * @remarks
 * A workspace declaring a published environment is scoped and public; one
 * declaring none is a private application and carries neither a scope, a
 * publication block, nor a repository. Declared dependencies and peers are
 * emitted in name order so the same blueprint answers the same bytes, and
 * `peerDependenciesMeta` carries only the peers marked optional.
 *
 * The text is `JSON.stringify` at tab indentation with a trailing newline,
 * which is the formatter's own fixed point for a manifest: `oxfmt` keeps every
 * `package.json` array expanded, so no width-aware collapse applies here. That
 * is not true of the workspace's other JSON, which is why this is the one JSON
 * artifact serialized directly.
 *
 * The artifact carrying this text is claimed by birth. A workspace owns its own
 * manifest once it exists: its description, its keywords, and any script it
 * added are the consumer's, so a repair that replaced the file would take them.
 * The one part scaffold keeps current afterwards is the declared `@orkestrel/*`
 * range set, and that is a region with its own writer rather than a claim over
 * the file's bytes.
 *
 * @example
 * ```ts
 * import type { Blueprint } from '@orkestrel/scaffold'
 * import { blueprintToManifest } from '@orkestrel/scaffold'
 *
 * declare const blueprint: Blueprint
 *
 * blueprintToManifest(blueprint).endsWith('}\n') // true
 * ```
 */
export function blueprintToManifest(blueprint: Blueprint): string {
	const publishes = blueprint.src.length > 0
	const name = publishes ? `@orkestrel/${blueprint.name}` : blueprint.name
	const dependencies: Record<string, string> = {}
	for (const dependency of [...blueprint.dependencies].sort((left, right) =>
		compareValues(left.name, right.name),
	)) {
		dependencies[dependency.name] = dependency.range
	}
	const peerDependencies: Record<string, string> = {}
	const peerDependenciesMeta: Record<string, { readonly optional: true }> = {}
	for (const peer of [...blueprint.peers].sort((left, right) =>
		compareValues(left.name, right.name),
	)) {
		peerDependencies[peer.name] = peer.range
		if (peer.optional === true) peerDependenciesMeta[peer.name] = { optional: true }
	}
	const entry = srcToEntry(blueprint.src)
	const manifest: Record<string, unknown> = {
		name,
		version: blueprint.version,
		...(publishes ? {} : { private: true }),
		description:
			blueprint.description ??
			(publishes ? `The ${name} package.` : `The ${blueprint.name} application.`),
		keywords: sortValues(blueprint.keywords),
		...(publishes
			? {
					homepage: `https://github.com/orkestrel/${blueprint.name}#readme`,
					bugs: `https://github.com/orkestrel/${blueprint.name}/issues`,
				}
			: {}),
		license: 'MIT',
		...(publishes
			? {
					repository: {
						type: 'git',
						url: `git+https://github.com/orkestrel/${blueprint.name}.git`,
					},
				}
			: {}),
		...(blueprint.bin ? { bin: { [blueprint.name]: './dist/bin/main.js' } } : {}),
		files: blueprint.bin
			? ['dist/src', 'dist/bin', 'README.md']
			: publishes
				? ['dist/src', 'README.md']
				: ['dist/app', 'README.md'],
		type: 'module',
		...(publishes
			? {
					sideEffects: blueprint.bin ? [`./${BIN_ENTRY_PATH}`, './dist/bin/main.js'] : false,
					main: entry.main,
					module: entry.module,
					...(entry.types === undefined ? {} : { types: entry.types }),
					exports: srcToExports(blueprint.src),
					publishConfig: { access: 'public' },
				}
			: {}),
		scripts: blueprintToScripts(blueprint),
		dependencies,
		devDependencies: blueprintToDevDependencies(blueprint),
		...(Object.keys(peerDependencies).length > 0 ? { peerDependencies } : {}),
		...(Object.keys(peerDependenciesMeta).length > 0 ? { peerDependenciesMeta } : {}),
		engines: { node: blueprint.engines },
	}
	return `${JSON.stringify(manifest, undefined, '\t')}\n`
}

/**
 * Derive the host-specific machinery a generated root Vite configuration carries.
 *
 * @param blueprint - The workspace specification.
 * @returns The four pipelines the generated configuration selects.
 *
 * @remarks
 * The sole derivation of that set: every renderer reads it rather than
 * recomputing an axis of its own. Nothing here selects a boundary guarantee,
 * because the environment-boundary plugin, its module-graph audit, and
 * stylesheet rejection ship in every shape.
 *
 * `output` is the one derived fact rather than a declared one. A workspace
 * builds when it publishes a library, ships an executable, or runs an
 * application host, and only a workspace that builds has an output directory to
 * contain. `showcase` requires the browser application it projects, so the
 * declared flag alone never selects it.
 *
 * @example
 * ```ts
 * import type { Blueprint } from '@orkestrel/scaffold'
 * import { blueprintToMachinery } from '@orkestrel/scaffold'
 *
 * declare const blueprint: Blueprint
 *
 * blueprintToMachinery(blueprint).vue // true when the app declares browser
 * ```
 */
export function blueprintToMachinery(blueprint: Blueprint): ViteMachinery {
	const hosted = blueprint.app.some((environment) => environment !== 'core')
	return {
		browser: blueprint.src.includes('browser') || blueprint.app.includes('browser'),
		vue: blueprint.app.includes('browser'),
		output: blueprint.src.length > 0 || blueprint.bin || hosted,
		showcase: blueprint.showcase && blueprint.app.includes('browser'),
	}
}

/**
 * Compile the root TypeScript configuration for a blueprint.
 *
 * @param blueprint - The workspace specification.
 * @returns Formatter-stable `tsconfig.json` text.
 *
 * @example
 * ```ts
 * import type { Blueprint } from '@orkestrel/scaffold'
 * import { blueprintToRootTsconfig } from '@orkestrel/scaffold'
 *
 * declare const blueprint: Blueprint
 *
 * blueprintToRootTsconfig(blueprint).startsWith('{') // true
 * ```
 */
export function blueprintToRootTsconfig(blueprint: Blueprint): string {
	const aliases: string[] = []
	for (const environment of ENVIRONMENTS) {
		if (blueprint.src.includes(environment)) {
			aliases.push(`"@src/${environment}": ["./src/${environment}/index.ts"]`)
		}
	}
	for (const environment of ENVIRONMENTS) {
		if (blueprint.app.includes(environment)) {
			aliases.push(`"@app/${environment}": ["./app/${environment}/index.ts"]`)
		}
	}
	const paths = aliases
		.map((alias, index) => `\t\t\t${alias}${index === aliases.length - 1 ? '' : ','}`)
		.join('\n')
	return fillTemplate(CONFIG_TEMPLATES.root.tsconfig, { paths })
}

/**
 * Compile the root Vite and Vitest configuration for a blueprint.
 *
 * @param blueprint - The workspace specification.
 * @returns Formatter-stable `vite.config.ts` text.
 *
 * @remarks
 * The static root skeleton and each project factory are template data. This
 * function computes only selection, fixed conditional blocks, escaped
 * blueprint strings, and the formatter-measured project-array layout.
 *
 * @example
 * ```ts
 * import type { Blueprint } from '@orkestrel/scaffold'
 * import { blueprintToRootVite } from '@orkestrel/scaffold'
 *
 * declare const blueprint: Blueprint
 *
 * blueprintToRootVite(blueprint).includes('defineConfig') // true
 * ```
 */
export function blueprintToRootVite(blueprint: Blueprint): string {
	const machinery = blueprintToMachinery(blueprint)
	const imports: string[] = []
	if (machinery.browser) imports.push("import { playwright } from '@vitest/browser-playwright'")
	if (machinery.vue) imports.push("import vue from '@vitejs/plugin-vue'")
	if (machinery.showcase) imports.push("import { viteSingleFile } from 'vite-plugin-singlefile'")

	const factories: string[] = []
	const projects: string[] = []
	if (blueprint.src.includes('core')) {
		factories.push(CONFIG_TEMPLATES.factories.src.core)
		projects.push('srcCore')
	}
	if (blueprint.src.includes('browser')) {
		const core = blueprint.src.includes('core')
		factories.push(
			fillTemplate(CONFIG_TEMPLATES.factories.src.browser, {
				external: core
					? "external: (id: string) => id === '@src/core' || id.startsWith('@orkestrel/'),"
					: "external: (id: string) => id.startsWith('@orkestrel/'),",
				output: core
					? "\t\t\t\t\toutput: { paths: { '@src/core': '../core/index.js' } },"
					: '\t\t\t\t\toutput: {},',
				exclude: core ? "\t\t\t\texclude: ['tests/src/core/**/*.test.ts'],\n" : '',
			}),
		)
		projects.push('srcBrowser')
	}
	if (blueprint.src.includes('server')) {
		const core = blueprint.src.includes('core')
		factories.push(
			fillTemplate(CONFIG_TEMPLATES.factories.src.server, {
				// The formatter reprints this arrow from its syntax tree, so each
				// selection is written the way it measures at the emitted indentation:
				// the core predicate carries a third test and passes the vendored
				// width, and the one without core fits on the line it starts on.
				external: core
					? `external: (id: string) =>
						id === '@src/core' || id.startsWith('node:') || id.startsWith('@orkestrel/'),`
					: "external: (id: string) => id.startsWith('node:') || id.startsWith('@orkestrel/'),",
				output: core
					? `\t\t\t\t\toutput: [
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
					: '\t\t\t\t\toutput: {},',
				exclude: core ? "\t\t\t\texclude: ['tests/src/core/**/*.test.ts'],\n" : '',
			}),
		)
		projects.push('srcServer')
	}
	if (blueprint.bin) {
		factories.push(CONFIG_TEMPLATES.factories.src.bin)
		projects.push('srcBin')
	}
	if (blueprint.app.includes('core')) {
		factories.push(CONFIG_TEMPLATES.factories.app.core)
		projects.push('appCore')
	}
	if (blueprint.app.includes('browser')) {
		// The formatter reprints an array from its syntax tree and joins one that
		// fits the vendored width, so the plugin array is emitted joined wherever
		// the showcase spread is not there to hold it open.
		const plugins = machinery.showcase
			? `\t\tplugins: [
			outputBoundary(output),
			environmentBoundary('app/browser'),
			vue(),
			...(showcase
				? [
						viteSingleFile({
							removeViteModuleLoader: true,
							useRecommendedBuildConfig: true,
						}),
						{
							name: 'orkestrel-showcase-html',
							transformIndexHtml: {
								order: 'post',
								handler(html) {
									const stamp = new Date().toISOString()
									return html.replace(
										'</head>',
										'\t\t<meta name="build-id" content="' + stamp + '" />\\n\t</head>',
									)
								},
							},
						},
					]
				: []),
		],
`
			: "\t\tplugins: [outputBoundary(output), environmentBoundary('app/browser'), vue()],\n"
		const showcaseBuild = machinery.showcase
			? `\t\t\t...(showcase
				? {
						cssMinify: 'lightningcss',
						minify: 'oxc',
						modulePreload: false,
						reportCompressedSize: false,
						sourcemap: false,
						target: 'esnext',
					}
				: { assetsInlineLimit: 0 }),
`
			: '\t\t\tassetsInlineLimit: 0,\n'
		const showcaseFactory = machinery.showcase
			? `
export function appShowcase(...options: never[]): UserConfig {
	if (options.length > 0) throw new Error('Showcase configuration overrides are not permitted')
	return applicationBrowser(true)
}
`
			: ''
		factories.push(
			fillTemplate(CONFIG_TEMPLATES.factories.app.browser, {
				plugins,
				showcaseBuild,
				showcaseFactory,
			}),
		)
		// Every other factory takes an optional override, which is the shape Vitest's
		// own project type reads as a configuration function and calls with a
		// `ConfigEnv`. This one refuses overrides, so it is neither: the row carries
		// the configuration it returns instead of the factory itself, and the refusal
		// still stands wherever a wrapper calls it.
		projects.push('appBrowser()')
	}
	if (blueprint.app.includes('server')) {
		factories.push(CONFIG_TEMPLATES.factories.app.server)
		projects.push('appServer')
	}
	factories.push(CONFIG_TEMPLATES.factories.policy)
	projects.push('policy')
	factories.push(CONFIG_TEMPLATES.factories.config)
	projects.push('config')
	factories.push(CONFIG_TEMPLATES.factories.guides)
	projects.push(`...(isExactCaseFile(resolveWorkspacePath('${GUIDES_TEST_PATH}')) ? [guides] : [])`)
	if (blueprint.src.length > 0 && blueprint.integration) {
		factories.push(
			fillTemplate(CONFIG_TEMPLATES.factories.integration, {
				global: blueprint.global ? "\t\t\t\tglobalSetup: ['./tests/setupGlobal.ts'],\n" : '',
			}),
		)
		projects.push('integration')
	}
	factories.push(CONFIG_TEMPLATES.factories.probe)
	projects.push('probe')

	const projectRows = `\t\tprojects: [
${projects.map((project) => `\t\t\t${project},`).join('\n')}
	\t],`
	// The boundary plugins a selection reaches are read off the factories it
	// emitted rather than restated as a second selection rule, so the generated
	// config imports what it uses and passes its own lint gate. A core-only
	// workspace builds nothing and bounds no environment, so it imports neither.
	const body = `${factories.join('\n')}\n`
	const boundaries = ['environmentBoundary', 'outputBoundary'].filter((boundary) =>
		body.includes(boundary),
	)
	return fillTemplate(CONFIG_TEMPLATES.root.vite, {
		imports: imports.length === 0 ? '' : `${imports.join('\n')}\n`,
		helpers:
			boundaries.length === 0
				? ''
				: `import { ${boundaries.join(', ')} } from './configs/helpers.js'\n`,
		factories: body,
		projects: projectRows,
	})
}

/**
 * Compile every artifact in the `configs` group.
 *
 * @param blueprint - The workspace specification.
 * @returns Root and selected wrapper artifacts in matrix order.
 *
 * @example
 * ```ts
 * import type { Blueprint } from '@orkestrel/scaffold'
 * import { blueprintToConfigArtifacts } from '@orkestrel/scaffold'
 *
 * declare const blueprint: Blueprint
 *
 * blueprintToConfigArtifacts(blueprint)[0]?.path // 'tsconfig.json'
 * ```
 */
export function blueprintToConfigArtifacts(blueprint: Blueprint): readonly Artifact[] {
	const artifacts: Artifact[] = [
		{
			path: 'tsconfig.json',
			group: 'configs',
			ownership: 'content',
			origin: 'template',
			content: blueprintToRootTsconfig(blueprint),
		},
		{
			path: 'vite.config.ts',
			group: 'configs',
			ownership: 'content',
			origin: 'template',
			content: blueprintToRootVite(blueprint),
		},
	]
	for (const environment of blueprint.src) {
		for (const path of SRC_MATRIX[environment].configs) {
			let content: string = CONFIG_TEMPLATES.vites.src.core
			if (path === 'configs/src/tsconfig.core.json') content = CONFIG_TEMPLATES.tsconfigs.src.core
			else if (path === 'configs/src/vite.browser.config.ts') {
				content = CONFIG_TEMPLATES.vites.src.browser
			} else if (path === 'configs/src/tsconfig.browser.json') {
				content = CONFIG_TEMPLATES.tsconfigs.src.browser
			} else if (path === 'configs/src/vite.server.config.ts') {
				const packageName = serializeTypeScriptString(`@orkestrel/${blueprint.name}`)
				// The formatter keeps this call on one line only while the line it
				// would print measures inside the vendored width, and the workspace
				// name is what varies, so the branch is decided by measuring the
				// candidate line: a tab prints as the vendored two columns, and the
				// gate admits a name long enough to push the joined call past 100.
				const joined = `\t\t\t\t\t\t? content.replaceAll(/(?:\\.\\.\\/)+core\\/index\\.ts/g, ${packageName})`
				const replacement =
					joined.replaceAll('\t', '  ').length <= 100
						? joined
						: [
								'\t\t\t\t\t\t? content.replaceAll(',
								'\t\t\t\t\t\t\t\t/(?:\\.\\.\\/)+core\\/index\\.ts/g,',
								`\t\t\t\t\t\t\t\t${packageName},`,
								'\t\t\t\t\t\t\t)',
							].join('\n')
				content = fillTemplate(CONFIG_TEMPLATES.vites.src.server, {
					replacement,
				})
			} else if (path === 'configs/src/tsconfig.server.json') {
				content = CONFIG_TEMPLATES.tsconfigs.src.server
			}
			artifacts.push({
				path,
				group: 'configs',
				ownership: 'content',
				origin: 'template',
				environment,
				content,
			})
		}
	}
	if (blueprint.bin) {
		const paths = blueprint.src.map(
			(environment) => `\t\t\t\t\t\t'@src/${environment}': '../src/${environment}/index.js',`,
		)
		const renderedPaths =
			paths.length === 0
				? '\t\t\t\t\tpaths: {},'
				: `\t\t\t\t\tpaths: {
${paths.join('\n')}
					},`
		for (const path of BIN_CONFIGS) {
			artifacts.push({
				path,
				group: 'configs',
				ownership: 'content',
				origin: 'template',
				content:
					path === 'configs/src/tsconfig.bin.json'
						? CONFIG_TEMPLATES.tsconfigs.bin
						: fillTemplate(CONFIG_TEMPLATES.vites.bin, { paths: renderedPaths }),
			})
		}
	}
	for (const environment of blueprint.app) {
		for (const path of APP_MATRIX[environment].configs) {
			let content: string = CONFIG_TEMPLATES.tsconfigs.app.core
			if (path === 'configs/app/vite.browser.config.ts') {
				content = CONFIG_TEMPLATES.vites.app.browser
			} else if (path === 'configs/app/tsconfig.browser.json') {
				const include = [
					'../../app/browser/**/*.cts',
					'../../app/browser/**/*.mts',
					'../../app/browser/**/*.ts',
					'../../app/browser/**/*.tsx',
					'../../app/browser/**/*.vue',
				]
				if (blueprint.app.includes('core')) {
					include.push(
						'../../app/core/**/*.cts',
						'../../app/core/**/*.mts',
						'../../app/core/**/*.ts',
						'../../app/core/**/*.tsx',
					)
				}
				include.push(
					'../../tests/app/browser/**/*.cts',
					'../../tests/app/browser/**/*.mts',
					'../../tests/app/browser/**/*.ts',
					'../../tests/app/browser/**/*.tsx',
					'../../tests/app/browser/**/*.vue',
					'../../tests/setup.ts',
					'../../tests/setupBrowser.ts',
				)
				content = fillTemplate(CONFIG_TEMPLATES.tsconfigs.app.browser, {
					include: include
						.map(
							(entry, index) =>
								`\t\t${JSON.stringify(entry)}${index === include.length - 1 ? '' : ','}`,
						)
						.join('\n'),
				})
			} else if (path === 'configs/app/vite.server.config.ts') {
				content = CONFIG_TEMPLATES.vites.app.server
			} else if (path === 'configs/app/tsconfig.server.json') {
				const include = [
					'../../app/server/**/*.cts',
					'../../app/server/**/*.mts',
					'../../app/server/**/*.ts',
					'../../app/server/**/*.tsx',
				]
				if (blueprint.app.includes('core')) {
					include.push(
						'../../app/core/**/*.cts',
						'../../app/core/**/*.mts',
						'../../app/core/**/*.ts',
						'../../app/core/**/*.tsx',
					)
				}
				include.push(
					'../../tests/app/server/**/*.cts',
					'../../tests/app/server/**/*.mts',
					'../../tests/app/server/**/*.ts',
					'../../tests/app/server/**/*.tsx',
					'../../tests/setup.ts',
					'../../tests/setupServer.ts',
				)
				content = fillTemplate(CONFIG_TEMPLATES.tsconfigs.app.server, {
					include: include
						.map(
							(entry, index) =>
								`\t\t${JSON.stringify(entry)}${index === include.length - 1 ? '' : ','}`,
						)
						.join('\n'),
				})
			}
			artifacts.push({
				path,
				group: 'configs',
				ownership: 'content',
				origin: 'template',
				environment,
				content,
			})
		}
	}
	if (blueprint.showcase && blueprint.app.includes('browser')) {
		artifacts.push({
			path: SHOWCASE_CONFIG_PATH,
			group: 'configs',
			ownership: 'content',
			origin: 'template',
			environment: 'browser',
			content: CONFIG_TEMPLATES.vites.app.showcase,
		})
	}
	return artifacts
}

/**
 * Compile every artifact in the `source` group.
 *
 * @param blueprint - The workspace specification.
 * @returns Empty published barrels, selected application entries, and the optional bin entry.
 *
 * @remarks
 * The barrels and every runtime entry intentionally hold nothing. A generated
 * sample entity is too easy to mistake for package implementation, so the
 * scaffold establishes only the selected environment boundaries. An application
 * entry is empty for the same reason the bin entry is, and because the vendored
 * lint config refuses an unassigned import outside a stylesheet, so the entry
 * cannot start by importing its barrel for effect either.
 *
 * @example
 * ```ts
 * import type { Blueprint } from '@orkestrel/scaffold'
 * import { blueprintToSourceArtifacts } from '@orkestrel/scaffold'
 *
 * declare const blueprint: Blueprint
 *
 * blueprintToSourceArtifacts(blueprint).every(({ group }) => group === 'source') // true
 * ```
 */
export function blueprintToSourceArtifacts(blueprint: Blueprint): readonly ContentArtifact[] {
	const artifacts: ContentArtifact[] = []
	for (const environment of blueprint.src) {
		artifacts.push({
			path: `src/${environment}/index.ts`,
			group: 'source',
			ownership: 'birth',
			origin: 'template',
			environment,
			content: ARTIFACT_TEMPLATES.source.empty,
		})
	}
	for (const environment of blueprint.app) {
		artifacts.push({
			path: `app/${environment}/index.ts`,
			group: 'source',
			ownership: 'birth',
			origin: 'template',
			environment,
			content: ARTIFACT_TEMPLATES.source.empty,
		})
		if (environment === 'browser') {
			artifacts.push(
				{
					path: 'app/browser/main.ts',
					group: 'source',
					ownership: 'birth',
					origin: 'template',
					environment,
					content: ARTIFACT_TEMPLATES.source.empty,
				},
				{
					path: 'app/browser/index.html',
					group: 'source',
					ownership: 'birth',
					origin: 'template',
					environment,
					content: ARTIFACT_TEMPLATES.source.browser,
				},
			)
		} else if (environment === 'server') {
			artifacts.push({
				path: 'app/server/main.ts',
				group: 'source',
				ownership: 'birth',
				origin: 'template',
				environment,
				content: ARTIFACT_TEMPLATES.source.empty,
			})
		}
	}
	if (blueprint.bin) {
		artifacts.push({
			path: BIN_ENTRY_PATH,
			group: 'source',
			ownership: 'birth',
			origin: 'template',
			content: ARTIFACT_TEMPLATES.source.empty,
		})
	}
	return artifacts
}

/**
 * Compile every artifact in the `tests` group that is not vendored from the host.
 *
 * @param blueprint - The workspace specification.
 * @returns Shared setup modules, axis tests, and the optional install proof.
 *
 * @remarks
 * `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` are
 * fleet-invariant host artifacts and therefore do not appear here. A guide
 * proof is not emitted while the workspace intentionally has empty barrels and
 * no package guide. The install proof is meaningful only for a published
 * workspace and therefore follows the `src` axis as well as its structural
 * flag.
 *
 * @example
 * ```ts
 * import type { Blueprint } from '@orkestrel/scaffold'
 * import { blueprintToTestArtifacts } from '@orkestrel/scaffold'
 *
 * declare const blueprint: Blueprint
 *
 * blueprintToTestArtifacts(blueprint)[0]?.path // 'tests/setup.ts'
 * ```
 */
export function blueprintToTestArtifacts(blueprint: Blueprint): readonly ContentArtifact[] {
	const artifacts: ContentArtifact[] = [
		{
			path: 'tests/setup.ts',
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			content: ARTIFACT_TEMPLATES.tests.setup,
		},
	]
	if (blueprint.src.includes('browser') || blueprint.app.includes('browser')) {
		artifacts.push({
			path: 'tests/setupBrowser.ts',
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			environment: 'browser',
			content: ARTIFACT_TEMPLATES.tests.setup,
		})
	}
	if (blueprint.src.includes('server') || blueprint.app.includes('server') || blueprint.bin) {
		artifacts.push({
			path: 'tests/setupServer.ts',
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			environment: 'server',
			content: ARTIFACT_TEMPLATES.tests.setup,
		})
	}
	if (blueprint.global) {
		artifacts.push({
			path: GLOBAL_SETUP_PATH,
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			content: ARTIFACT_TEMPLATES.tests.global,
		})
	}
	for (const environment of blueprint.src) {
		artifacts.push({
			path: `tests/src/${environment}/index.test.ts`,
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			environment,
			content: fillTemplate(ARTIFACT_TEMPLATES.tests.entry, {
				specifier: serializeTypeScriptString(`@src/${environment}`),
				label: serializeTypeScriptString(`src ${environment} entry`),
			}),
		})
	}
	if (blueprint.bin) {
		const specifier = serializeTypeScriptString('../../../src/bin/main.js')
		const statement =
			specifier.length <= 68
				? `\t\tconst entry = await import(${specifier})`
				: `\t\tconst entry =\n\t\t\tawait import(${specifier})`
		artifacts.push({
			path: 'tests/src/bin/main.test.ts',
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			content: fillTemplate(ARTIFACT_TEMPLATES.tests.bin, { import: statement }),
		})
	}
	for (const environment of blueprint.app) {
		artifacts.push({
			path: `tests/app/${environment}/index.test.ts`,
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			environment,
			content: fillTemplate(ARTIFACT_TEMPLATES.tests.entry, {
				specifier: serializeTypeScriptString(`@app/${environment}`),
				label: serializeTypeScriptString(`app ${environment} entry`),
			}),
		})
	}
	if (blueprint.src.length > 0 && blueprint.integration) {
		artifacts.push({
			path: INTEGRATION_TEST_PATH,
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			content: ARTIFACT_TEMPLATES.tests.integration,
		})
	}
	return artifacts
}

/**
 * Compile the generated workspace's guide index.
 *
 * @param blueprint - The workspace specification.
 * @returns One birth-owned guide index carrying the concept and directory views.
 */
export function blueprintToGuideArtifacts(blueprint: Blueprint): readonly ContentArtifact[] {
	const source: string[] = []
	const tests: string[] = []
	const directories: string[] = []
	const guide = `guides/${blueprint.name}.md`
	for (const environment of blueprint.src) {
		source.push(`    - [\`src/${environment}\`](../src/${environment})`)
		tests.push(`    - [\`tests/src/${environment}\`](../tests/src/${environment})`)
		directories.push(
			`- [\`src/${environment}\`](../src/${environment})\n  - Guide: Not created. Create this file when the workspace has a public surface:\n    \`${guide}\`\n  - Tests: [\`tests/src/${environment}\`](../tests/src/${environment})`,
		)
	}
	if (blueprint.bin) {
		source.push('    - [`src/bin`](../src/bin)')
		tests.push('    - [`tests/src/bin`](../tests/src/bin)')
		directories.push(
			`- [\`src/bin\`](../src/bin)\n  - Guide: Not created. Create this file when the workspace has a public surface:\n    \`${guide}\`\n  - Tests: [\`tests/src/bin\`](../tests/src/bin)`,
		)
	}
	for (const environment of blueprint.app) {
		source.push(`    - [\`app/${environment}\`](../app/${environment})`)
		tests.push(`    - [\`tests/app/${environment}\`](../tests/app/${environment})`)
		directories.push(
			`- [\`app/${environment}\`](../app/${environment})\n  - Guide: Not created. Create this file when the workspace has a public surface:\n    \`${guide}\`\n  - Tests: [\`tests/app/${environment}\`](../tests/app/${environment})`,
		)
	}
	return [
		{
			path: 'guides/README.md',
			group: 'guides',
			ownership: 'birth',
			origin: 'template',
			content: fillTemplate(ARTIFACT_TEMPLATES.guides.readme, {
				source: source.join('\n'),
				tests: tests.join('\n'),
				directories: directories.join('\n'),
				guide: blueprint.name,
			}),
		},
	]
}

/**
 * Compile the generated workspace's root documentation.
 *
 * @param blueprint - The workspace specification.
 * @returns One birth-owned package front page.
 */
export function blueprintToDocumentArtifacts(blueprint: Blueprint): readonly ContentArtifact[] {
	const publishes = blueprint.src.length > 0
	const name = publishes ? `@orkestrel/${blueprint.name}` : blueprint.name
	const description =
		blueprint.description ?? (publishes ? `The ${name} package.` : `The ${name} application.`)
	return [
		{
			path: 'README.md',
			group: 'docs',
			ownership: 'birth',
			origin: 'template',
			content: fillTemplate(ARTIFACT_TEMPLATES.docs.readme, {
				package: name,
				description,
			}),
		},
	]
}

/**
 * Compile the blueprint-dependent orchestration artifacts.
 *
 * @param blueprint - The workspace specification.
 * @returns A service inventory script when services are declared, otherwise none.
 *
 * @remarks
 * A service name does not describe startup, readiness, or cleanup. The script
 * therefore records only the declared inventory and does not invent a service
 * runner or test project.
 */
export function blueprintToOrchestrationArtifacts(
	blueprint: Blueprint,
): readonly ContentArtifact[] {
	if (blueprint.services.length === 0) return []
	const services = blueprint.services
		.map(
			(service, index) => `\t'${service}'${index === blueprint.services.length - 1 ? '' : ' \\'}`,
		)
		.join('\n')
	return [
		{
			path: SERVICE_SCRIPT_PATH,
			group: 'orchestration',
			ownership: 'birth',
			origin: 'template',
			content: fillTemplate(ARTIFACT_TEMPLATES.orchestration.service, { services }),
		},
	]
}

/**
 * Compile the vendored host artifacts a named workspace plans.
 *
 * @param name - The target workspace's own bare package name.
 * @returns One artifact per vendored path, in `HOST_PATHS` order.
 *
 * @remarks
 * Every artifact is claimed by presence, which is the strongest claim a pure
 * compile can make: core cannot read the vendored data root, so it cannot carry
 * the bytes a content claim would have to be checked against. Reading that root
 * is what promotes the ones scaffold owns the bytes of.
 *
 * `source` is left absent because it falls back to `path`, and every vendored
 * path is stored under the name it is written to. The group comes from
 * {@link inferGroup}, so a vendored path and a foreign path found in a target
 * are classified by one rule and a plan never disagrees with the audit beside
 * it.
 *
 * @example
 * ```ts
 * import { nameToHostArtifacts } from '@orkestrel/scaffold'
 *
 * nameToHostArtifacts('router').some((artifact) => artifact.path === 'AGENTS.md') // true
 * nameToHostArtifacts('router').some((artifact) => artifact.path === 'guides/router.md') // false
 * ```
 */
export function nameToHostArtifacts(name: string): readonly Artifact[] {
	return selectHostPaths(HOST_PATHS, name).map((path): Artifact => ({
		path,
		group: inferGroup(path),
		ownership: 'presence',
		origin: 'host',
	}))
}

/**
 * Replace the content of every drafted artifact an override names.
 *
 * @param artifacts - The drafted artifacts.
 * @param overrides - The blueprint's overrides.
 * @returns The artifacts with each matching override applied, in input order.
 *
 * @remarks
 * An override replaces an artifact's whole content and never merges into it.
 * A host-origin artifact carries no content to replace, so it passes through
 * untouched; which overrides are legal at all is
 * {@link overridesToQuestions}'s answer, so an illegal one is reported rather
 * than silently dropped here.
 *
 * @example
 * ```ts
 * import type { Artifact } from '@orkestrel/scaffold'
 * import { applyOverrides } from '@orkestrel/scaffold'
 *
 * declare const artifacts: readonly Artifact[]
 *
 * applyOverrides(artifacts, [{ path: 'README.md', content: '# Title\n' }])
 * ```
 */
export function applyOverrides(
	artifacts: readonly Artifact[],
	overrides: readonly Override[],
): readonly Artifact[] {
	if (overrides.length === 0) return artifacts
	const replacements = new Map(overrides.map((override) => [override.path, override.content]))
	return artifacts.map((artifact) => {
		if (artifact.origin === 'host') return artifact
		const content = replacements.get(artifact.path)
		return content === undefined ? artifact : { ...artifact, content }
	})
}

/**
 * Compute a plan's content identity.
 *
 * @param plan - The plan to identify.
 * @returns Sixteen lowercase hexadecimal digits, or `undefined` when the plan
 * carries a value JSON cannot encode.
 *
 * @remarks
 * The identity covers the blueprint the plan was compiled from, the groups it
 * covers, and its ordered artifacts. It deliberately excludes `hash` itself,
 * which is what lets a pinned plan be re-identified and compared without
 * stripping a field first.
 *
 * The projection is canonical, so two plans that differ only in key order
 * answer the same digits. Nothing here reads a clock or randomness, and the
 * refusal is total: a value that cannot be read answers `undefined` rather than
 * escaping as a thrown error, and a caller decides what an unidentifiable plan
 * means.
 *
 * @example
 * ```ts
 * import type { Plan } from '@orkestrel/scaffold'
 * import { planToHash } from '@orkestrel/scaffold'
 *
 * declare const plan: Plan
 *
 * planToHash(plan)?.length // 16
 * ```
 */
export function planToHash(plan: Plan): string | undefined {
	const outcome = attempt(() =>
		canonicalStringify({
			blueprint: plan.blueprint,
			groups: plan.groups,
			artifacts: plan.artifacts,
		}),
	)
	if (!outcome.success || outcome.value === undefined) return undefined
	return computeHash(outcome.value)
}

/**
 * Project one planned artifact and the bytes found at its path into a verdict.
 *
 * @param artifact - The planned artifact.
 * @param observed - The destination's exact bytes as hexadecimal; absent when
 * the destination holds no file.
 * @returns The finding, carrying the artifact's ownership and `observed`
 * exactly where bytes were read.
 *
 * @remarks
 * The comparison itself is {@link inferDrift}'s, so ownership decides it here
 * exactly as it does everywhere else. This adds only the shape: a missing
 * destination has no bytes to record, and every other verdict records the bytes
 * it was given, which is the precondition the mutation that follows is held to.
 * Ownership is copied rather than inferred from drift because aligned findings
 * span all three ownership tiers.
 *
 * `foreign` is not answerable here, because it describes a path no artifact was
 * planned for.
 *
 * @example
 * ```ts
 * import { artifactToFinding } from '@orkestrel/scaffold'
 *
 * artifactToFinding(
 * 	{ path: 'README.md', group: 'docs', ownership: 'content', origin: 'computed', content: 'hi\n' },
 * 	'6279650a',
 * ) // { path: 'README.md', group: 'docs', ownership: 'content', drift: 'stale', observed: '6279650a' }
 * ```
 */
export function artifactToFinding(artifact: Artifact, observed?: string): Finding {
	const path = artifact.path
	const group = artifact.group
	const ownership = artifact.ownership
	if (observed === undefined) {
		return inferDrift(artifact) === 'aligned'
			? { path, group, ownership, drift: 'aligned' }
			: { path, group, ownership, drift: 'missing' }
	}
	return inferDrift(artifact, observed) === 'stale'
		? { path, group, ownership, drift: 'stale', observed }
		: { path, group, ownership, drift: 'aligned', observed }
}

/**
 * Compare a plan against a target's current content.
 *
 * @param plan - The compiled plan.
 * @param current - The target's exact bytes, keyed by artifact-relative path.
 * @returns One finding per planned artifact in plan order, then one `foreign`
 * finding per unplanned path in snapshot order.
 *
 * @remarks
 * The sweep is bounded by the plan's own selection: a path the plan does not own
 * is reported as foreign only when its group is one the plan covers, so a
 * compile narrowed to a few groups never reports the rest of the workspace as
 * unowned. Within a covered group the report is deliberately wide, because
 * `foreign` is the set the destructive verb draws from and the narrowing that
 * set needs — the paths no verb may remove, and what git tracks — belongs to
 * that verb rather than to the comparison.
 *
 * @example
 * ```ts
 * import type { Plan } from '@orkestrel/scaffold'
 * import { planToFindings } from '@orkestrel/scaffold'
 *
 * declare const plan: Plan
 *
 * planToFindings(plan, { 'AGENTS.md': '68690a' })
 * ```
 */
export function planToFindings(plan: Plan, current: Snapshot): readonly Finding[] {
	const findings: Finding[] = []
	const planned = new Set<string>()
	for (const artifact of plan.artifacts) {
		planned.add(artifact.path)
		findings.push(artifactToFinding(artifact, current[artifact.path]))
	}
	for (const [path, observed] of Object.entries(current)) {
		if (planned.has(path)) continue
		const group = inferGroup(path)
		if (!plan.groups.includes(group)) continue
		findings.push({ path, group, drift: 'foreign', observed })
	}
	return findings
}

/**
 * Measure one declared package list against the name and range syntax it accepts.
 *
 * @param dependencies - The declared list.
 * @param field - The blueprint field the list came from, reported on each question.
 * @param name - The package-name syntax the field accepts.
 * @param range - The range syntax the field accepts.
 * @returns One blocking question per rejected name, repeated name, and rejected
 * range, in list order.
 *
 * @remarks
 * The three declared lists differ only in the two syntaxes they accept, so the
 * rules live here once and each caller supplies its own patterns. A runtime
 * dependency name reaches a path through its guide mirror and is fixed to the
 * `@orkestrel` scope; a development extra never reaches a path and admits any
 * valid npm name.
 *
 * Both patterns must be stateless. A global or sticky pattern carries a
 * `lastIndex` between calls, so it would answer differently for the same input
 * depending on what was tested before it.
 *
 * @example
 * ```ts
 * import { DEPENDENCY_NAME_PATTERN, ORKESTREL_RANGE_PATTERN } from '@orkestrel/scaffold'
 * import { dependenciesToQuestions } from '@orkestrel/scaffold'
 *
 * dependenciesToQuestions(
 * 	[{ name: '@orkestrel/router', range: '0.0.8' }],
 * 	'dependencies',
 * 	DEPENDENCY_NAME_PATTERN,
 * 	ORKESTREL_RANGE_PATTERN,
 * ).length // 1 — the range is not caret-pinned
 * ```
 */
export function dependenciesToQuestions(
	dependencies: readonly Dependency[],
	field: string,
	name: RegExp,
	range: RegExp,
): readonly Question[] {
	const questions: Question[] = []
	const seen = new Set<string>()
	for (const dependency of dependencies) {
		if (!name.test(dependency.name)) {
			questions.push({
				field,
				message: `${dependency.name} is not a package name ${field} accepts.`,
				blocking: true,
			})
		} else if (seen.has(dependency.name)) {
			questions.push({
				field,
				message: `${dependency.name} is declared more than once on ${field}.`,
				blocking: true,
			})
		}
		seen.add(dependency.name)
		if (!range.test(dependency.range)) {
			questions.push({
				field,
				message: `${dependency.name} declares the range ${dependency.range}, which ${field} does not accept.`,
				blocking: true,
			})
		}
	}
	return questions
}

/**
 * Measure a blueprint against every law its own fields decide.
 *
 * @param blueprint - The workspace specification.
 * @returns One question per rejected field, in blueprint field order, with the
 * rules that span several fields last.
 *
 * @remarks
 * Only the laws a blueprint answers alone are here. The structural record and
 * its bounds are already settled by `isBlueprint`, which refuses a value that is
 * not a blueprint at all; what remains is the syntax of a name, a version, a
 * range, and an engines floor, the combinations the two environment axes admit,
 * and the overlaps between the three declared package lists. The laws that need
 * a drafted plan belong to {@link artifactsToQuestions} and
 * {@link overridesToQuestions}.
 *
 * A question blocks when it describes a workspace this package cannot generate.
 * Three do not, because each describes a workspace it can describe honestly and
 * should not create: a published axis of several environments without core, whose
 * manifest names a core build the workspace never runs, and a structural flag
 * whose required axis is absent, which emits nothing. Blocking those closed the
 * gate for every verb, and the verbs that read an existing workspace need the
 * plan the gate refused. The caller that chooses the shape refuses the advisory;
 * the callers that read one report it.
 *
 * An environment question carries `ENVIRONMENTS` as its candidates, so a caller
 * reads the accepted values from the question instead of from the documentation.
 *
 * @example
 * ```ts
 * import type { Blueprint } from '@orkestrel/scaffold'
 * import { blueprintToQuestions } from '@orkestrel/scaffold'
 *
 * declare const blueprint: Blueprint
 *
 * blueprintToQuestions(blueprint).length === 0 // true when the gate passes
 * ```
 */
export function blueprintToQuestions(blueprint: Blueprint): readonly Question[] {
	const questions: Question[] = []
	if (!NAME_PATTERN.test(blueprint.name)) {
		questions.push({
			field: 'name',
			message: `${blueprint.name} is not a lowercase alphanumeric name starting with a letter.`,
			blocking: true,
		})
	}
	if (!VERSION_PATTERN.test(blueprint.version)) {
		questions.push({
			field: 'version',
			message: `${blueprint.version} is not an exact three-component version.`,
			blocking: true,
		})
	}
	if (!matchesEngines(blueprint.engines)) {
		questions.push({
			field: 'engines',
			message: `${blueprint.engines} is not a supported minimum-Node floor.`,
			blocking: true,
		})
	}
	if (blueprint.src.length === 0 && blueprint.app.length === 0) {
		questions.push({
			field: 'src',
			message: 'A workspace declares at least one environment on src or app.',
			blocking: true,
			candidates: ENVIRONMENTS,
		})
	}
	if (blueprint.src.length > 1 && !blueprint.src.includes('core')) {
		questions.push({
			field: 'src',
			message:
				'Several published environments put core at the package root, so this manifest names a core build the workspace never runs. Declare core on src, or publish one environment.',
			blocking: false,
			candidates: ENVIRONMENTS,
		})
	}
	for (const environment of ENVIRONMENTS) {
		if (blueprint.src.filter((declared) => declared === environment).length > 1) {
			questions.push({
				field: 'src',
				message: `src declares ${environment} more than once.`,
				blocking: true,
				candidates: ENVIRONMENTS,
			})
		}
		if (blueprint.app.filter((declared) => declared === environment).length > 1) {
			questions.push({
				field: 'app',
				message: `app declares ${environment} more than once.`,
				blocking: true,
				candidates: ENVIRONMENTS,
			})
		}
	}
	if (blueprint.integration && blueprint.src.length === 0) {
		questions.push({
			field: 'integration',
			message:
				'integration projects a published src, and this workspace declares none, so it emits nothing.',
			blocking: false,
		})
	}
	const services = new Set<string>()
	for (const service of blueprint.services) {
		if (!NAME_PATTERN.test(service)) {
			questions.push({
				field: 'services',
				message: `${service} is not a lowercase alphanumeric service name starting with a letter.`,
				blocking: true,
			})
		} else if (services.has(service)) {
			questions.push({
				field: 'services',
				message: `${service} is declared more than once on services.`,
				blocking: true,
			})
		}
		services.add(service)
	}
	if (blueprint.showcase && !blueprint.app.includes('browser')) {
		questions.push({
			field: 'showcase',
			message:
				'showcase projects a browser app, and this workspace declares none, so it emits nothing.',
			blocking: false,
		})
	}
	questions.push(
		...dependenciesToQuestions(
			blueprint.dependencies,
			'dependencies',
			DEPENDENCY_NAME_PATTERN,
			ORKESTREL_RANGE_PATTERN,
		),
		...dependenciesToQuestions(
			blueprint.peers,
			'peers',
			DEPENDENCY_NAME_PATTERN,
			ORKESTREL_RANGE_PATTERN,
		),
		...dependenciesToQuestions(blueprint.extras, 'extras', EXTRA_NAME_PATTERN, EXTRA_RANGE_PATTERN),
	)
	const lists: ReadonlyArray<readonly [field: string, list: readonly Dependency[]]> = [
		['dependencies', blueprint.dependencies],
		['peers', blueprint.peers],
		['extras', blueprint.extras],
	]
	const declared = new Map<string, string>()
	const own = `@orkestrel/${blueprint.name}`
	for (const [field, list] of lists) {
		for (const dependency of list) {
			if (dependency.name === own || dependency.name === blueprint.name) {
				questions.push({
					field,
					message: `${dependency.name} is the workspace itself.`,
					blocking: true,
				})
			}
			const first = declared.get(dependency.name)
			if (first === undefined) declared.set(dependency.name, field)
			else if (first !== field) {
				questions.push({
					field,
					message: `${dependency.name} is declared on both ${first} and ${field}.`,
					blocking: true,
				})
			}
		}
	}
	for (const extra of blueprint.extras) {
		if (Object.hasOwn(BASE_DEV_DEPENDENCIES, extra.name)) {
			questions.push({
				field: 'extras',
				message: `${extra.name} is pinned by the shared toolchain, which every workspace carries at one version.`,
				blocking: true,
			})
		}
	}
	return questions
}

/**
 * Measure a drafted artifact list against the laws a whole plan decides.
 *
 * @param artifacts - The drafted artifacts.
 * @returns One blocking question per colliding path and per exceeded ceiling.
 *
 * @remarks
 * Two artifacts claiming one path is a compilation defect rather than a caller's
 * mistake: whichever is written last silently wins, so the plan is refused
 * instead. The ceilings are the ones the plan has to survive being read back
 * through — one artifact's bytes, the count of artifacts one collection admits,
 * and the bytes retained across a whole plan — so a plan that would fail its own
 * guard is refused while the failure can still name the artifact that caused it.
 *
 * A host artifact planned before its bytes are read contributes nothing to the
 * budget, because it claims no bytes to retain.
 *
 * @example
 * ```ts
 * import type { Artifact } from '@orkestrel/scaffold'
 * import { artifactsToQuestions } from '@orkestrel/scaffold'
 *
 * declare const artifacts: readonly Artifact[]
 *
 * artifactsToQuestions(artifacts).length === 0 // true when the draft is sound
 * ```
 */
export function artifactsToQuestions(artifacts: readonly Artifact[]): readonly Question[] {
	const questions: Question[] = []
	const claimed = new Set<string>()
	let total = 0
	for (const artifact of artifacts) {
		if (claimed.has(artifact.path)) {
			questions.push({
				field: 'artifacts',
				message: `Two artifacts claim ${artifact.path}.`,
				blocking: true,
			})
		}
		claimed.add(artifact.path)
		const bytes =
			artifact.origin === 'host'
				? artifact.hex === undefined
					? 0
					: artifact.hex.length / 2
				: computeBytes(artifact.content)
		if (bytes > MAX_ARTIFACT_BYTES) {
			questions.push({
				field: 'artifacts',
				message: `${artifact.path} carries ${bytes} bytes, above the ${MAX_ARTIFACT_BYTES} one artifact admits.`,
				blocking: true,
			})
		}
		total += bytes
	}
	if (artifacts.length > MAX_COLLECTION_ITEMS) {
		questions.push({
			field: 'artifacts',
			message: `A plan of ${artifacts.length} artifacts is above the ${MAX_COLLECTION_ITEMS} one collection admits.`,
			blocking: true,
		})
	}
	if (total > MAX_TOTAL_ARTIFACT_BYTES) {
		questions.push({
			field: 'artifacts',
			message: `A plan of ${total} bytes is above the ${MAX_TOTAL_ARTIFACT_BYTES} one plan retains.`,
			blocking: true,
		})
	}
	return questions
}

/**
 * Measure a blueprint's overrides against the artifacts drafted for it.
 *
 * @param overrides - The blueprint's overrides.
 * @param artifacts - The drafted artifacts, before overrides are applied.
 * @returns One blocking question per override the draft cannot accept.
 *
 * @remarks
 * An override that matches no planned artifact is a caller expecting a file that
 * does not exist, and applying nothing would leave that expectation
 * unanswered. An override on a host-origin artifact asks this package to
 * rewrite a file it byte-copies from the vendored data root, which it never
 * does. An override on the manifest asks it to rewrite the one artifact the
 * blueprint's own fields decide, so the fields would no longer describe the
 * workspace they generated. Each is refused rather than dropped.
 *
 * @example
 * ```ts
 * import type { Artifact } from '@orkestrel/scaffold'
 * import { overridesToQuestions } from '@orkestrel/scaffold'
 *
 * declare const artifacts: readonly Artifact[]
 *
 * overridesToQuestions([{ path: 'package.json', content: '{}\n' }], artifacts).length // 1
 * ```
 */
export function overridesToQuestions(
	overrides: readonly Override[],
	artifacts: readonly Artifact[],
): readonly Question[] {
	const questions: Question[] = []
	const planned = new Map<string, Artifact>()
	for (const artifact of artifacts) {
		if (!planned.has(artifact.path)) planned.set(artifact.path, artifact)
	}
	const seen = new Set<string>()
	for (const override of overrides) {
		if (seen.has(override.path)) {
			questions.push({
				field: 'overrides',
				message: `${override.path} is overridden more than once.`,
				blocking: true,
			})
		}
		seen.add(override.path)
		const artifact = planned.get(override.path)
		if (artifact === undefined) {
			questions.push({
				field: 'overrides',
				message: `${override.path} is not a path this plan carries.`,
				blocking: true,
			})
			continue
		}
		if (artifact.origin === 'host') {
			questions.push({
				field: 'overrides',
				message: `${override.path} is byte-copied from the vendored data root.`,
				blocking: true,
			})
			continue
		}
		if (artifact.group === 'manifest') {
			questions.push({
				field: 'overrides',
				message: `${override.path} is the manifest, which the blueprint's own fields decide.`,
				blocking: true,
			})
		}
	}
	return questions
}
