import type {
	Artifact,
	BuildFormat,
	Blueprint,
	BrowserExtension,
	ContentArtifact,
	Dependency,
	DependencyPinSet,
	Environment,
	ArtifactFinding,
	ManifestEdit,
	ManifestScript,
	ManifestToken,
	Override,
	Plan,
	Question,
	Snapshot,
	ToolchainHold,
	ViteMachinery,
} from './types.js'
import {
	attempt,
	canonicalStringify,
	comparePrimitives,
	isRecord,
	isString,
	parseJSON,
	sortValues,
} from '@orkestrel/contract'
import { fillTemplate } from '@orkestrel/template'
import {
	APP_BROWSER_DEV_DEPENDENCIES,
	APP_DEV_DEPENDENCIES,
	APP_MATRIX,
	APP_SERVER_DEV_DEPENDENCIES,
	AXES,
	BASE_DEV_DEPENDENCIES,
	BIN_CONFIGS,
	BIN_ENTRY_PATH,
	BIN_OUTPUT_PATH,
	BROWSE_DEV_DEPENDENCIES,
	BROWSE_UPSTREAM,
	CAPTURE_DEV_DEPENDENCIES,
	CAPTURE_UPSTREAM,
	CATALOG_AGENT_PATH,
	DECLARATION_DEV_DEPENDENCIES,
	DEPENDENCY_NAME_PATTERN,
	DISTRIBUTION_SETUP_PATH,
	DISTRIBUTION_TEST_PATH,
	ENVIRONMENTS,
	EXTRA_RANGE_PATTERN,
	FLOOR_RANGE_PATTERN,
	FOREIGN_NAME_PATTERN,
	FRAMEWORK_MATRIX,
	FRAMEWORKS,
	GLOBAL_SETUP_PATH,
	GUIDES_TEST_PATH,
	HOST_PATHS,
	INTEGRATION_TEST_PATH,
	JOURNEY_CONFIG_PATH,
	MAX_ARTIFACT_BYTES,
	MAX_COLLECTION_ITEMS,
	MAX_TOTAL_ARTIFACT_BYTES,
	NAME_PATTERN,
	ORKESTREL_RANGE_PATTERN,
	RELEASE_PROOF_COMMAND,
	SEED_GUIDE_PATHS,
	SERVICE_SCRIPT_PATH,
	SERVICE_SETUP_PATH,
	SHOWCASE_CONFIG_PATH,
	SHOWCASE_DEV_DEPENDENCIES,
	SHOWCASE_OVERRIDES,
	SKILLS_CONFIG_PATH,
	SOURCE_BROWSER_DEV_DEPENDENCIES,
	SRC_MATRIX,
	STYLES_DEV_DEPENDENCIES,
	TARGET_SKILL_NAMES,
	TOOLCHAIN_HOLDS,
	VERSION_PATTERN,
	WORKSPACE_DEV_ENGINES,
} from './constants.js'
import {
	artifactToArtifactFinding,
	computeBytes,
	computeHash,
	computeTotal,
	inferArtifactGroup,
	matchesEngines,
	matchesPrintWidth,
	scanManifestTokens,
	serializeTypeScriptString,
	selectHostPaths,
	srcToRoot,
} from './helpers.js'
import { ARTIFACT_TEMPLATES, CONFIG_TEMPLATES } from './templates.js'
import { isSheetName } from './validators.js'

/**
 * Projects a blueprint into browser extensions restricted to occupied browser axes.
 * @param blueprint - The workspace specification.
 * @returns Browser extensions with their occupied axes, omitting unplaced extensions.
 * @example
 * ```ts
 * import { blueprintToFaces, createBlueprint } from '@orkestrel/scaffold'
 *
 * blueprintToFaces(createBlueprint('desk', { app: ['core'] })).length // 0
 * ```
 */
export function blueprintToFaces(blueprint: Blueprint): readonly BrowserExtension[] {
	return blueprint.extensions.flatMap((extension) => {
		if (extension.surface !== 'browser') return []
		const axes = extension.axes.filter((axis) => blueprint[axis].includes('browser'))
		return axes.length === 0 ? [] : [{ ...extension, axes }]
	})
}

/**
 * Projects a blueprint into its validated sheet-face names in stable order.
 * @param blueprint - The workspace specification.
 * @returns The base face followed by named styles extensions; themes remain a separate target.
 * @example
 * ```ts
 * import { blueprintToSheets, createBlueprint } from '@orkestrel/scaffold'
 *
 * blueprintToSheets(createBlueprint('paper', { styles: true })) // ['styles']
 * ```
 */
export function blueprintToSheets(blueprint: Blueprint): readonly string[] {
	return [
		...(blueprint.styles ? ['styles'] : []),
		...sortValues(
			blueprint.extensions.flatMap((extension) =>
				extension.surface === 'styles' && isSheetName(extension.name) ? [extension.name] : [],
			),
		),
	]
}

/**
 * Projects published environments and sheets into the manifest export map.
 * @param blueprint - The workspace specification.
 * @returns JavaScript conditions and CSS and SCSS subpaths, without an invented JavaScript root.
 * @example
 * ```ts
 * import { blueprintToExports, createBlueprint } from '@orkestrel/scaffold'
 *
 * blueprintToExports(createBlueprint('paper', { styles: true }))['./styles']
 * // './dist/src/styles/index.css'
 * ```
 */
export function blueprintToExports(blueprint: Blueprint): Readonly<Record<string, unknown>> {
	// A repeated key keeps its first position and takes its last value, so the browser subpath
	// written once per face and the package manifest named twice land where assignment put them.
	const exported: Readonly<Record<string, unknown>> = {
		...srcToExports(blueprint.src),
		...Object.fromEntries(
			blueprintToFaces(blueprint)
				.filter((extension) => extension.axes.includes('src'))
				.flatMap((extension): ReadonlyArray<readonly [string, unknown]> => {
					const face: readonly [string, unknown] = [
						`./${extension.name}`,
						pathToCondition(`./dist/src/${extension.name}/index`, ['es']),
					]
					// Declaration rewrites name the browser subpath even when browser owns the root export.
					return blueprint.src.includes('browser')
						? [face, ['./browser', pathToCondition('./dist/src/browser/index', ['es'])]]
						: [face]
				}),
		),
		...Object.fromEntries(
			[...blueprintToSheets(blueprint), ...(blueprint.themes ? ['styles/themes'] : [])].flatMap(
				(name) => [
					[`./${name}`, `./dist/src/${name}/index.css`],
					[`./${name}/scss`, `./src/${name}/index.scss`],
				],
			),
		),
	}
	return Object.keys(exported).length > 0
		? { ...exported, './package.json': './package.json' }
		: exported
}

/**
 * Builds one `exports` condition block for a built environment.
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
 * Projects a published selection into the manifest's entry fields.
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
 * Projects a published selection into the manifest's `exports` map.
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
	const root = srcToRoot(src)
	const environment = root ?? 'core'
	const entries: ReadonlyArray<readonly [string, unknown]> = [
		['.', pathToCondition(`./dist/src/${environment}/index`, SRC_MATRIX[environment].formats)],
		...(root === undefined
			? ENVIRONMENTS.filter((declared) => declared !== 'core' && src.includes(declared)).map(
					(declared): readonly [string, unknown] => [
						SRC_MATRIX[declared].path,
						pathToCondition(`./dist/src/${declared}/index`, SRC_MATRIX[declared].formats),
					],
				)
			: []),
		['./package.json', './package.json'],
	]
	return Object.fromEntries(entries)
}

/**
 * Projects a blueprint into the development dependencies its manifest declares.
 *
 * @param blueprint - The workspace specification.
 * @returns The merged set, sorted by package name.
 *
 * @remarks
 * The shared toolchain is the baseline every generated workspace carries.
 * A selected browser framework applies its toolchain hold before the host-specific sets.
 * Vue faces on either axis select TypeScript 6.0.3; other workspaces select TypeScript 7.0.2.
 * Each declared axis adds the set its host needs. A declared extra or peer is
 * applied after those, so a workspace that pins a range for a package the
 * conditional sets also name gets the range it declared. An extra that restates
 * a shared toolchain pin never reaches here, because the gate refuses it. A peer
 * that names a development tool already selected keeps that tool's pin, because
 * the peer's floor states what consumers may supply rather than what this workspace
 * develops against.
 *
 * A workspace that renders a surface receives {@link BROWSE_DEV_DEPENDENCIES}: a browser
 * environment on either axis, a sheet, or themes. A framework face counts without a clause of
 * its own, because a face is selected only on an axis that carries a browser environment.
 * A browser setup runtime alone receives nothing, because it renders no surface for `browse`
 * to drive. A workspace {@link BROWSE_UPSTREAM} names receives nothing either, because
 * `@orkestrel/browser` depends on it at runtime and the declaration would close a cycle.
 *
 * A journey axis with a browser application receives {@link CAPTURE_DEV_DEPENDENCIES}.
 * A workspace {@link CAPTURE_UPSTREAM} names receives no capture seed, because it is capture
 * itself or a member of capture's runtime closure. A browser source, styles surface, or browser
 * setup alone selects no capture dependency.
 *
 * A peer is declared here as well as under `peerDependencies`, because a peer is
 * not installed by the workspace that declares it and developing against one
 * requires it present. A runtime dependency is the opposite case and is removed:
 * it is already installed, so a second declaration would state one fact twice
 * and the ranges would be free to disagree.
 *
 * A workspace never declares itself, so its own package name is removed. That
 * matters for a workspace named after a package the baseline already carries:
 * the baseline is a list of what a workspace consumes, and a workspace does not
 * consume itself.
 *
 * @example
 * ```ts
 * import { blueprintToDevDependencies, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToDevDependencies(blueprint).typescript // the shared TypeScript pin
 * ```
 */
export function blueprintToDevDependencies(blueprint: Blueprint): Readonly<Record<string, string>> {
	const sheets = blueprintToSheets(blueprint).length > 0 || blueprint.themes
	const rendered = blueprint.src.includes('browser') || blueprint.app.includes('browser') || sheets
	const own = blueprint.src.length > 0 || sheets ? `@orkestrel/${blueprint.name}` : blueprint.name
	const prior: Readonly<Record<string, string>> = {
		...BASE_DEV_DEPENDENCIES,
		...Object.fromEntries(
			Object.entries(blueprintToToolchainHolds(blueprint)).map(([name, hold]) => [
				name,
				hold.range,
			]),
		),
		...(rendered && !BROWSE_UPSTREAM.includes(own) ? BROWSE_DEV_DEPENDENCIES : {}),
		...(blueprint.journey && blueprint.app.includes('browser') && !CAPTURE_UPSTREAM.includes(own)
			? CAPTURE_DEV_DEPENDENCIES
			: {}),
		...(sheets ? STYLES_DEV_DEPENDENCIES : {}),
		...(blueprint.src.length > 0 || blueprint.bin ? DECLARATION_DEV_DEPENDENCIES : {}),
		...(blueprint.src.includes('browser') || blueprint.setup.includes('browser') || sheets
			? SOURCE_BROWSER_DEV_DEPENDENCIES
			: {}),
		...(blueprint.app.length > 0 ? APP_DEV_DEPENDENCIES : {}),
		...(blueprint.app.includes('browser') ? APP_BROWSER_DEV_DEPENDENCIES : {}),
		...(blueprint.app.includes('server') ? APP_SERVER_DEV_DEPENDENCIES : {}),
		...Object.fromEntries(
			blueprintToMachinery(blueprint).frameworks.flatMap((framework) =>
				Object.entries(FRAMEWORK_MATRIX[framework].dependencies),
			),
		),
		// The iterator consumes one extra at a time and reads a hole as an `undefined` extra, which the
		// name read refuses before a later extra is read. It takes the list through its iterator
		// protocol alone, so a list without one is refused as the loop refused it.
		...Object.fromEntries(
			Iterator.from(blueprint.extras)
				.map((extra) => [extra.name, extra.range])
				.toArray(),
		),
		...(blueprint.showcase && blueprint.app.includes('browser') ? SHOWCASE_DEV_DEPENDENCIES : {}),
	}
	// A peer keeps the pin of a development tool already selected, and the first of two peers
	// naming one package wins, because its floor was the one the workspace declared first. Each peer is
	// read once, in order, and only a peer the selection lacks has its range read.
	const peers = Iterator.from(blueprint.peers)
		.flatMap((peer): ReadonlyArray<readonly [string, string]> =>
			Object.hasOwn(prior, peer.name) ? [] : [[peer.name, peer.range]],
		)
		.toArray()
	const merged: Readonly<Record<string, string>> = {
		...prior,
		...Object.fromEntries(
			peers.filter(([name], index) => peers.findIndex(([other]) => other === name) === index),
		),
	}
	const runtime = new Set(blueprint.dependencies.map((dependency) => dependency.name))
	return Object.fromEntries(
		Object.entries(merged)
			.filter(([name]) => name !== own && !runtime.has(name))
			.sort(([left], [right]) => comparePrimitives(left, right)),
	)
}

/**
 * Projects a blueprint into the toolchain holds its browser frameworks require.
 * @param blueprint - The workspace specification.
 * @returns The held tools for selected browser framework faces; empty without a framework.
 * @example
 * ```ts
 * import { blueprintToToolchainHolds, createBlueprint } from '@orkestrel/scaffold'
 *
 * blueprintToToolchainHolds(createBlueprint('router', { src: ['core'] })) // {}
 * ```
 */
export function blueprintToToolchainHolds(
	blueprint: Blueprint,
): Readonly<Record<string, ToolchainHold>> {
	const frameworks = blueprintToFaces(blueprint).map((face) => face.name)
	return Object.fromEntries(
		Object.entries(TOOLCHAIN_HOLDS).filter(([, hold]) => frameworks.includes(hold.framework)),
	)
}

/**
 * Projects the scoped npm overrides required by a selected browser showcase.
 *
 * @param blueprint - The workspace specification.
 * @returns The showcase override map, or an empty map for other workspaces.
 * @example
 * ```ts
 * import { blueprintToManifestOverrides, createBlueprint } from '@orkestrel/scaffold'
 * blueprintToManifestOverrides(createBlueprint('desk', { app: ['browser'], showcase: true }))
 * // { 'vite-plugin-singlefile@2.3.3': { micromatch: 'npm:picomatch@2.3.2' } }
 * ```
 */
export function blueprintToManifestOverrides(
	blueprint: Blueprint,
): Readonly<Record<string, Readonly<Record<string, string>>>> {
	return blueprint.showcase && blueprint.app.includes('browser') ? SHOWCASE_OVERRIDES : {}
}

/**
 * Replaces selected npm override leaves while preserving every byte outside the edited path.
 *
 * @param manifest - The JSON package manifest text.
 * @param overrides - The scoped selectors and string leaves to write.
 * @returns The aligned text, or `undefined` for invalid JSON, duplicate selected keys, malformed ancestors, or non-string owned leaves.
 * @remarks
 * Absent ancestors and leaves are inserted. Aligned strings retain their original spelling.
 * Unrelated overrides remain caller-owned. Artifact replacements in `Blueprint.overrides` are independent.
 * @example
 * ```ts
 * import { replaceManifestOverrides } from '@orkestrel/scaffold'
 * replaceManifestOverrides('{}', { 'plugin@1.0.0': { child: '2.0.0' } })
 * // '{"overrides":{"plugin@1.0.0":{"child":"2.0.0"}}}'
 * ```
 */
export function replaceManifestOverrides(
	manifest: string,
	overrides: Readonly<Record<string, Readonly<Record<string, string>>>>,
): string | undefined {
	if (!isRecord(parseJSON(manifest))) return undefined
	return Object.entries(overrides)
		.flatMap(([selector, children]) =>
			Object.entries(children).map(([child, range]) => ({
				path: ['overrides', selector, child],
				range,
			})),
		)
		.reduce<string | undefined>(
			(compiled, leaf) =>
				compiled === undefined
					? undefined
					: replaceManifestOverride(compiled, leaf.path, leaf.range),
			manifest,
		)
}

/**
 * Replaces one npm override leaf in manifest text, inserting its absent ancestors.
 *
 * @param manifest - The JSON package manifest text, already known to be an object.
 * @param path - The object keys from the manifest root to the leaf, ending at the leaf's key.
 * @param range - The string the leaf must hold.
 * @returns The text carrying the leaf, or `undefined` for a duplicate selected key, a malformed
 * ancestor, or a non-string leaf.
 *
 * @remarks
 * The one step {@link replaceManifestOverrides} repeats per leaf. Absent ancestors and the leaf are
 * inserted after the last member of the deepest ancestor the text declares, and a leaf already
 * holding `range` keeps its original spelling. Every byte outside the edited path survives.
 *
 * @example
 * ```ts
 * import { replaceManifestOverride } from '@orkestrel/scaffold'
 *
 * replaceManifestOverride('{}', ['overrides', 'plugin@1.0.0', 'child'], '2.0.0')
 * // '{"overrides":{"plugin@1.0.0":{"child":"2.0.0"}}}'
 * ```
 */
export function replaceManifestOverride(
	manifest: string,
	path: readonly string[],
	range: string,
): string | undefined {
	const tokens = scanManifestTokens(manifest)
	if (tokens === undefined) return undefined
	// Each level descends into the object the previous level's value opened, so the fold carries
	// that object's offset and stops after a level answers.
	const outcome = path.reduce<{
		readonly done: boolean
		readonly open: number
		readonly text: string | undefined
	}>(
		(state, key, level) => {
			if (state.done) return state
			const refused = { ...state, done: true, text: undefined }
			const brace = tokens.find((token) => token.index === state.open && token.text === '{')
			if (brace === undefined) return refused
			const close = tokens.find(
				(token) =>
					token.text === '}' && token.index > state.open && token.depth === brace.depth - 1,
			)
			if (close === undefined) return refused
			// Only the selected object's immediate keys count; strings and nested values are opaque.
			const matches = tokens.flatMap((token, at) =>
				token.index > state.open &&
				token.index < close.index &&
				token.depth === brace.depth &&
				token.value !== undefined &&
				parseJSON(token.text) === key
					? [at]
					: [],
			)
			if (matches.length > 1) return refused
			const at = matches[0]
			const entry = at === undefined ? undefined : tokens[at]
			if (at === undefined || entry === undefined) {
				const insertion = path
					.slice(level)
					.reduceRight((inner, name) => `{${JSON.stringify(name)}:${inner}}`, JSON.stringify(range))
				const tail = state.open + manifest.slice(state.open + 1, close.index).trimEnd().length
				return {
					...state,
					done: true,
					text:
						manifest.slice(0, tail + 1) +
						(tail === state.open ? '' : ',') +
						insertion.slice(1, -1) +
						manifest.slice(tail + 1),
				}
			}
			const start = entry.value
			if (start === undefined) return refused
			if (level < path.length - 1) {
				return manifest.charAt(start) === '{' ? { ...state, open: start } : refused
			}
			const literal = tokens[at + 1]
			if (manifest.charAt(start) !== '"' || literal === undefined) return refused
			return {
				...state,
				done: true,
				text:
					parseJSON(literal.text) === range
						? manifest
						: manifest.slice(0, start) +
							JSON.stringify(range) +
							manifest.slice(literal.index + literal.text.length),
			}
		},
		{ done: false, open: manifest.indexOf('{'), text: manifest },
	)
	return outcome.text
}

/**
 * Projects a blueprint into the scripts its manifest declares.
 *
 * @param blueprint - The workspace specification.
 * @returns The scripts, in the order the manifest lists them.
 *
 * @remarks
 * Each script is the workspace-level contract the repository rules fix, narrowed
 * to the axes the blueprint declares: a check and a test script per declared
 * environment, an aggregate over each axis, the policy and configuration
 * proofs every workspace can pass before it has a public API, and one build per
 * target that actually builds.
 *
 * A publishing workspace isolates its distribution and live-service proofs
 * from `test` and runs them from `prepublishOnly` instead. Publishing is what
 * selects the distribution proof: what that proof measures is the packed tarball,
 * so a workspace that packs no published source has nothing for it to read. A
 * private workspace therefore omits it and runs a live-service proof from `test`.
 * Study proofs run on demand through `test:studies` in either workspace; no gate
 * or chain runs them.
 * Integration and conformance stay in `test` because they neither pack nor
 * install the workspace and drive no external service. A conformance run may
 * start a server, but it starts its own and reaches it over loopback, so the run
 * stays hermetic.
 *
 * The configuration paths interpolated here are the same ones `SRC_MATRIX` and
 * `APP_MATRIX` list as each environment's configuration files, so a rename in
 * either matrix is a rename in both places.
 * A browser application's journey axis adds `journey` (`capture journey`) and `capture`
 * (`capture frames`) beside `test:journey`. The scoped commands take an explicit selection;
 * the whole-suite `test:journey` invocation remains in the test chain.
 *
 * @example
 * ```ts
 * import { blueprintToScripts, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToScripts(blueprint)['format:check'] // 'oxfmt --config .oxfmtrc.json --check .'
 * ```
 */
export function blueprintToScripts(blueprint: Blueprint): Readonly<Record<string, string>> {
	const source = blueprintToFaces(blueprint).flatMap((extension) =>
		extension.surface === 'browser' && extension.axes.includes('src') ? [extension.name] : [],
	)
	const application = blueprintToFaces(blueprint).flatMap((extension) =>
		extension.surface === 'browser' && extension.axes.includes('app') ? [extension.name] : [],
	)
	const sheets = blueprintToSheets(blueprint)
	const targets = [...sheets, ...(blueprint.themes && !blueprint.styles ? ['themes'] : [])]
	const checker = application.includes('vue') ? FRAMEWORK_MATRIX.vue.checker : 'tsc'
	const publishes = blueprint.src.length > 0 || targets.length > 0
	const integrates = blueprint.integration
	const compiles = publishes || blueprint.bin
	const runtime = blueprint.app.filter((environment) => environment !== 'core')
	const vitest = 'vitest run --config vite.config.ts --no-cache --reporter=dot'
	const checks = [...blueprint.src, ...source, ...sheets, ...(blueprint.bin ? ['bin'] : [])].map(
		(name) => `npm run check:src:${name}`,
	)
	const journey = `vitest run --config ${JOURNEY_CONFIG_PATH} --no-cache --reporter=dot`
	const showcase = `vite --config ${SHOWCASE_CONFIG_PATH}`
	const buildShowcase = `vite build --config ${SHOWCASE_CONFIG_PATH}`
	return {
		clean: "node -e \"require('node:fs').rmSync('dist',{recursive:true,force:true})\"",
		copy: "node -e \"const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)\"",
		format: 'oxfmt --config .oxfmtrc.json --write .',
		'format:check': 'oxfmt --config .oxfmtrc.json --check .',
		lint: 'oxlint --config .oxlintrc.json --fix .',
		'lint:check': 'oxlint --config .oxlintrc.json --deny-warnings .',
		check: [
			`${checker} --noEmit --project tsconfig.json`,
			...(checks.length > 0 ? ['npm run check:src'] : []),
			...(blueprint.app.length > 0 ? ['npm run check:app'] : []),
			...(blueprint.skills ? ['npm run check:skills'] : []),
		].join(' && '),
		...(checks.length > 0
			? {
					'check:src': checks.join(' && '),
					...Object.fromEntries(
						Iterator.from(blueprint.src)
							.map((environment) => [
								`check:src:${environment}`,
								`tsc --noEmit -p configs/src/tsconfig.${environment}.json`,
							])
							.toArray(),
					),
					...(blueprint.bin
						? { 'check:src:bin': 'tsc --noEmit -p configs/src/tsconfig.bin.json' }
						: {}),
					...Object.fromEntries(
						[...sheets, ...source].map((name) => [
							`check:src:${name}`,
							`tsc --noEmit -p configs/src/tsconfig.${name}.json`,
						]),
					),
				}
			: {}),
		...(blueprint.app.length > 0
			? {
					'check:app': [...blueprint.app, ...application]
						.map((environment) => `npm run check:app:${environment}`)
						.join(' && '),
					...Object.fromEntries(
						Iterator.from(blueprint.app)
							.map((environment) => [
								`check:app:${environment}`,
								`tsc --noEmit -p configs/app/tsconfig.${environment}.json`,
							])
							.toArray(),
					),
					...Object.fromEntries(
						application.map((name) => [
							`check:app:${name}`,
							`${FRAMEWORK_MATRIX[name].checker} --noEmit -p configs/app/tsconfig.${name}.json`,
						]),
					),
				}
			: {}),
		...(blueprint.skills ? { 'check:skills': `tsc --noEmit -p ${SKILLS_CONFIG_PATH}` } : {}),
		test: [
			...(compiles ? ['npm run test:src'] : []),
			...(blueprint.app.length > 0 ? ['npm run test:app'] : []),
			...(blueprint.journey && blueprint.app.includes('browser')
				? ['npm run test:journey', ...application.map((name) => `npm run test:journey:${name}`)]
				: []),
			'npm run test:policy',
			'npm run test:config',
			...(blueprint.setup.includes('node') || blueprint.global ? ['npm run test:setup'] : []),
			...(blueprint.setup.includes('browser') ? ['npm run test:setup:browser'] : []),
			...(blueprint.skills ? ['npm run test:skills'] : []),
			...(blueprint.guides ? ['npm run test:guides'] : []),
			...(blueprint.conformance ? ['npm run test:conformance'] : []),
			...(blueprint.tree ? ['npm run test:tree'] : []),
			...(integrates ? ['npm run test:integration'] : []),
			...(!publishes && blueprint.service ? ['npm run test:service'] : []),
		].join(' && '),
		...(compiles
			? {
					// The aggregate keeps the position its first appearance gave it, with the value the sheet
					// targets extend, so it is computed once rather than written and then rewritten. It is
					// computed here, after the checks, so the environments are read where the baseline read them.
					'test:src': [
						...(blueprint.src.length > 0 || blueprint.bin
							? [
									[
										vitest,
										...blueprint.src.map(
											(environment) => `--project ${SRC_MATRIX[environment].project}`,
										),
										...source.map((name) => `--project src:${name}`),
										...(blueprint.bin ? ['--project src:bin'] : []),
									].join(' '),
								]
							: []),
						...targets.map((name) => `npm run test:src:${name}`),
					].join(' && '),
					...Object.fromEntries(
						Iterator.from(blueprint.src)
							.map((environment) => [
								`test:src:${environment}`,
								`${vitest} --project ${SRC_MATRIX[environment].project}`,
							])
							.toArray(),
					),
					...(blueprint.bin ? { 'test:src:bin': `${vitest} --project src:bin` } : {}),
					...Object.fromEntries(
						source.map((name) => [`test:src:${name}`, `${vitest} --project src:${name}`]),
					),
					...Object.fromEntries(
						targets.map((name) => [
							`test:src:${name}`,
							`npm run build:src:${name} && ${vitest} --project src:${name}`,
						]),
					),
				}
			: {}),
		...(blueprint.app.length > 0
			? {
					'test:app': [
						vitest,
						...blueprint.app.map((environment) => `--project ${APP_MATRIX[environment].project}`),
						...application.map((name) => `--project app:${name}`),
					].join(' '),
					...Object.fromEntries(
						Iterator.from(blueprint.app)
							.map((environment) => [
								`test:app:${environment}`,
								`${vitest} --project ${APP_MATRIX[environment].project}`,
							])
							.toArray(),
					),
					...Object.fromEntries(
						application.map((name) => [`test:app:${name}`, `${vitest} --project app:${name}`]),
					),
				}
			: {}),
		'test:policy': `${vitest} --project policy`,
		'test:config': `${vitest} --project config`,
		...(blueprint.setup.includes('node') || blueprint.global
			? { 'test:setup': `${vitest} --project setup` }
			: {}),
		...(blueprint.setup.includes('browser')
			? { 'test:setup:browser': `${vitest} --project setup:browser` }
			: {}),
		...(blueprint.journey && blueprint.app.includes('browser')
			? {
					'test:journey': journey,
					journey: 'capture journey',
					capture: 'capture frames',
					...Object.fromEntries(
						application.map((name) => [`test:journey:${name}`, `${journey} --mode ${name}`]),
					),
				}
			: {}),
		...(blueprint.skills ? { 'test:skills': `${vitest} --project skills` } : {}),
		...(blueprint.guides
			? { 'test:guides': `node --experimental-strip-types ${GUIDES_TEST_PATH}` }
			: {}),
		...(blueprint.conformance ? { 'test:conformance': `${vitest} --project conformance` } : {}),
		...(blueprint.tree ? { 'test:tree': `${vitest} --project tree` } : {}),
		'test:probe':
			'vitest run --config vite.config.ts --no-cache --reporter=verbose --project probe',
		'test:bench':
			'vitest bench --config vite.config.ts --no-cache --project "probe (bench)" --mode benchmark',
		...(publishes ? { 'test:distribution': `${vitest} --project distribution` } : {}),
		...(integrates ? { 'test:integration': `${vitest} --project integration` } : {}),
		...(blueprint.service ? { 'test:service': `${vitest} --project service` } : {}),
		...(blueprint.studies ? { 'test:studies': `${vitest} --project studies` } : {}),
		build: [
			'npm run clean',
			...(compiles ? ['npm run build:src'] : []),
			...(blueprint.app.length > 0 ? ['npm run build:app'] : []),
		].join(' && '),
		...(compiles
			? {
					'build:src': [
						...blueprint.src.map((environment) => `npm run build:src:${environment}`),
						...source.map((name) => `npm run build:src:${name}`),
						...targets.map((name) => `npm run build:src:${name}`),
						...(blueprint.bin ? ['npm run build:src:bin'] : []),
					].join(' && '),
					...Object.fromEntries(
						Iterator.from(blueprint.src)
							.map((environment) => [
								`build:src:${environment}`,
								SRC_MATRIX[environment].formats.includes('cjs')
									? `vite build --config configs/src/vite.${environment}.config.ts && npm run copy dist/src/${environment}/index.d.ts dist/src/${environment}/index.d.cts`
									: `vite build --config configs/src/vite.${environment}.config.ts`,
							])
							.toArray(),
					),
					...(blueprint.bin
						? { 'build:src:bin': 'vite build --config configs/src/vite.bin.config.ts' }
						: {}),
					...Object.fromEntries(
						source.map((name) => [
							`build:src:${name}`,
							`vite build --config configs/src/vite.${name}.config.ts`,
						]),
					),
					...Object.fromEntries(
						targets.map((name) => [
							`build:src:${name}`,
							[
								`vite build --config configs/src/vite.${name}.config.ts`,
								...(name === 'styles' && blueprint.themes
									? ['vite build --config configs/src/vite.themes.config.ts']
									: []),
							].join(' && '),
						]),
					),
				}
			: {}),
		...(blueprint.app.length > 0
			? {
					'build:app':
						runtime.length > 0
							? [...runtime, ...application]
									.map((environment) => `npm run build:app:${environment}`)
									.join(' && ')
							: 'npm run check:app:core',
					...Object.fromEntries(
						[...runtime, ...application].map((environment) => [
							`build:app:${environment}`,
							`vite build --config configs/app/vite.${environment}.config.ts`,
						]),
					),
				}
			: {}),
		...(blueprint.app.includes('browser')
			? {
					dev: 'vite --config configs/app/vite.browser.config.ts',
					...Object.fromEntries(
						application.map((name) => [
							`dev:${name}`,
							`vite --config configs/app/vite.${name}.config.ts`,
						]),
					),
					...(blueprint.showcase
						? {
								showcase,
								'build:showcase': buildShowcase,
								...Object.fromEntries(
									application.flatMap((name): ReadonlyArray<readonly [string, string]> => [
										[`showcase:${name}`, `${showcase} --mode ${name}`],
										[`build:showcase:${name}`, `${buildShowcase} --mode ${name}`],
									]),
								),
							}
						: {}),
				}
			: {}),
		...(blueprint.app.includes('server')
			? {
					serve: 'node dist/app/server/main.cjs',
					'serve:build': 'npm run build:app:server && npm run serve',
				}
			: {}),
		...(publishes
			? {
					prepack: 'npm run build',
					prepublishOnly: [
						'npm run format:check && npm run lint:check && npm run check && npm run build',
						...(blueprint.showcase && blueprint.app.includes('browser')
							? [
									'npm run build:showcase',
									...application.map((name) => `npm run build:showcase:${name}`),
								]
							: []),
						'npm test',
						RELEASE_PROOF_COMMAND,
						...(blueprint.service ? ['npm run test:service'] : []),
					].join(' && '),
				}
			: {}),
	}
}

/**
 * Projects a blueprint into the manifest scripts a region write may replace.
 *
 * @param blueprint - The workspace specification.
 * @returns One entry per writable script.
 *
 * @remarks
 * Every direct `test:<project>` script is writable, together with the probe and
 * benchmark workbench scripts. A workspace carrying guides adds `test:guides`,
 * whose package-owned entry runs the guides project and handles explicit parity
 * rewrites, and one carrying skills adds `test:skills`. Publishing adds the pack and publication lifecycle scripts.
 * Sheet and framework faces add their check and build scripts, application frameworks add dev scripts,
 * and selected showcases and journeys add their mode scripts.
 * A browser application's journey axis also adds `journey` and `capture`. Their generated
 * commands are writable and have no predecessor forms; customized values remain caller-owned.
 * Aggregate test scripts and
 * maintainer-owned gate chains stay outside the region.
 *
 * `accepted` carries each generated predecessor the region can replace. The
 * guides entry accepts the generated command that invoked the guides project
 * through Vitest alone. The benchmark entry accepts the one command that ran the
 * `probe` project through `vitest bench`, before the dedicated bench project
 * existed. The pack hook accepts the build chain emitted before it
 * delegated to `build`. The publication hook accepts the same gate chain without
 * {@link RELEASE_PROOF_COMMAND}. No accepted publication chain carries a study
 * step. The value being written is always writable, so
 * it is not repeated there. Any other value is a script the workspace author
 * customized, and {@link replaceManifestScripts} retains it while writing the
 * other named scripts independently.
 *
 * @example
 * ```ts
 * import { blueprintToWritableScripts, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToWritableScripts(blueprint)[0]?.name // 'test:src:core'
 * ```
 */
export function blueprintToWritableScripts(blueprint: Blueprint): readonly ManifestScript[] {
	const scripts = blueprintToScripts(blueprint)
	const sheets = [
		...blueprintToSheets(blueprint),
		...(blueprint.themes && !blueprint.styles ? ['themes'] : []),
	]
	const body = Object.entries(scripts).flatMap(([name, command]): readonly ManifestScript[] => {
		const direct = name.startsWith('test:') && name !== 'test:src' && name !== 'test:app'
		const sheet = sheets.some(
			(face) => name === `build:src:${face}` || name === `check:src:${face}`,
		)
		// The faces are read for each script, so the extensions are read as many times as before.
		const framework = blueprintToFaces(blueprint).some(
			(extension) =>
				extension.surface === 'browser' &&
				extension.axes.some(
					(axis) =>
						name === `check:${axis}:${extension.name}` ||
						name === `build:${axis}:${extension.name}` ||
						(axis === 'app' && name === `dev:${extension.name}`),
				),
		)
		const showcase =
			name === 'showcase' ||
			name.startsWith('showcase:') ||
			name === 'build:showcase' ||
			name.startsWith('build:showcase:')
		const capture = name === 'journey' || name === 'capture'
		if (!direct && !sheet && !framework && !showcase && !capture) return []
		return [
			{
				name,
				command,
				accepted:
					name === 'test:guides'
						? ['vitest run --config vite.config.ts --no-cache --reporter=dot --project guides']
						: name === 'test:bench'
							? ['vitest bench --config vite.config.ts --no-cache --project probe']
							: name === 'build:src:styles' && blueprint.themes
								? ['vite build --config configs/src/vite.styles.config.ts']
								: sheets.some((face) => name === `test:src:${face}`)
									? [command.slice(command.indexOf(' && ') + 4)]
									: [],
			},
		]
	})
	const prepack = scripts.prepack
	const prepublish = scripts.prepublishOnly
	const unreleased = prepublish?.replace(` && ${RELEASE_PROOF_COMMAND}`, '')
	return [
		...body,
		...(prepack === undefined
			? []
			: [
					{
						name: 'prepack',
						command: prepack,
						accepted: scripts.build === undefined ? [] : [scripts.build],
					},
				]),
		...(prepublish === undefined || unreleased === undefined
			? []
			: [
					{
						name: 'prepublishOnly',
						command: prepublish,
						accepted: [unreleased],
					},
				]),
	]
}

/**
 * Compiles a blueprint into its `package.json` content.
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
 * manifest after it exists: its description, its keywords, and any script it
 * added are the consumer's, so a repair that replaced the file would take them.
 * The one part scaffold keeps current afterwards is the declared `@orkestrel/*`
 * range set, and that is a region with its own writer rather than a claim over
 * the file's bytes.
 *
 * @example
 * ```ts
 * import { blueprintToManifest, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToManifest(blueprint).endsWith('}\n') // true
 * ```
 */
export function blueprintToManifest(blueprint: Blueprint): string {
	const sheets = blueprintToSheets(blueprint)
	const targets = [...sheets, ...(blueprint.themes ? ['styles/themes'] : [])]
	const publishes = blueprint.src.length > 0 || targets.length > 0
	const name = publishes ? `@orkestrel/${blueprint.name}` : blueprint.name
	const dependencies = Object.fromEntries(
		[...blueprint.dependencies]
			.sort((left, right) => comparePrimitives(left.name, right.name))
			.map((dependency) => [dependency.name, dependency.range]),
	)
	const peers = [...blueprint.peers].sort((left, right) => comparePrimitives(left.name, right.name))
	const peerDependencies = Object.fromEntries(peers.map((peer) => [peer.name, peer.range]))
	const peerDependenciesMeta = Object.fromEntries(
		peers.filter((peer) => peer.optional === true).map((peer) => [peer.name, { optional: true }]),
	)
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
		...(blueprint.bin ? { bin: { [blueprint.name]: BIN_OUTPUT_PATH } } : {}),
		files: [
			blueprint.bin || publishes ? 'dist/src' : 'dist/app',
			...(blueprint.bin ? ['dist/bin'] : []),
			...targets.map((face) => `!dist/src/${face}/index.js`),
			...sheets.map((face) => `src/${face}/**/*.scss`),
			...(blueprint.themes && !blueprint.styles ? ['src/styles/themes/**/*.scss'] : []),
			'README.md',
		],
		type: 'module',
		...(publishes
			? {
					sideEffects:
						targets.length > 0 || blueprint.bin
							? [
									...(targets.length > 0 ? ['**/*.css', '**/*.scss'] : []),
									...(blueprint.bin ? [`./${BIN_ENTRY_PATH}`, `./${BIN_OUTPUT_PATH}`] : []),
								]
							: false,
					...(blueprint.src.length > 0 ? entry : {}),
					exports: blueprintToExports(blueprint),
					publishConfig: { access: 'public' },
				}
			: {}),
		scripts: blueprintToScripts(blueprint),
		dependencies,
		devDependencies: blueprintToDevDependencies(blueprint),
		...(Object.keys(blueprintToManifestOverrides(blueprint)).length > 0
			? { overrides: blueprintToManifestOverrides(blueprint) }
			: {}),
		...(Object.keys(peerDependencies).length > 0 ? { peerDependencies } : {}),
		...(Object.keys(peerDependenciesMeta).length > 0 ? { peerDependenciesMeta } : {}),
		devEngines: WORKSPACE_DEV_ENGINES,
		engines: { node: blueprint.engines },
	}
	return `${JSON.stringify(manifest, undefined, '\t')}\n`
}

/**
 * Derives the host-specific machinery a generated root Vite configuration carries.
 *
 * @param blueprint - The workspace specification.
 * @returns The pipelines the generated configuration selects.
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
 * import { blueprintToMachinery, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { app: ['browser'] })
 *
 * blueprintToMachinery(blueprint).frameworks // []
 * ```
 */
export function blueprintToMachinery(blueprint: Blueprint): ViteMachinery {
	const hosted = blueprint.app.some((environment) => environment !== 'core')
	const frameworks = FRAMEWORKS.filter((framework) =>
		blueprintToFaces(blueprint).some(
			(extension) =>
				extension.surface === 'browser' &&
				extension.name === framework &&
				extension.axes.some((axis) => blueprint[axis].includes('browser')),
		),
	)
	return {
		browser:
			blueprint.src.includes('browser') ||
			blueprint.app.includes('browser') ||
			blueprint.setup.includes('browser') ||
			blueprintToSheets(blueprint).length > 0 ||
			blueprint.themes ||
			frameworks.length > 0,
		frameworks,
		output:
			blueprint.src.length > 0 ||
			blueprint.bin ||
			hosted ||
			blueprintToSheets(blueprint).length > 0 ||
			blueprint.themes,
		showcase: blueprint.showcase && blueprint.app.includes('browser'),
	}
}

/**
 * Compiles the root TypeScript configuration for a blueprint.
 *
 * @param blueprint - The workspace specification.
 * @returns Formatter-stable `tsconfig.json` text.
 *
 * @remarks
 * `paths` carries the workspace's own published specifiers beside the `@src` and
 * `@app` aliases, mapped to source. The published set is what
 * {@link srcToExports} publishes, read the same way here so the two never name
 * different subpaths, and the `app` axis publishes nothing so it maps nothing.
 * A package's own name resolves inside its own checkout through that `exports`
 * map, to the built `dist/` entry, so a module importing it would make the root
 * typecheck depend on a build; mapping the specifier to source is what keeps
 * `npm run check` independent of `npm run build`. The root Vite configuration
 * derives its `alias` record from every `paths` entry, so the same specifiers
 * resolve to source under Vitest, and every subpath is emitted before the bare
 * specifier: an alias record is matched in declaration order and a bare pattern
 * also matches its own subpaths, so the reverse order would resolve
 * `@orkestrel/<name>/server` through the core entry.
 *
 * @example
 * ```ts
 * import { blueprintToRootTsconfig, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToRootTsconfig(blueprint).startsWith('{') // true
 * ```
 */
export function blueprintToRootTsconfig(blueprint: Blueprint): string {
	const root = srcToRoot(blueprint.src)
	const aliases = [
		...blueprintToFaces(blueprint).flatMap((extension) => [
			...extension.axes.map((axis) => ({
				specifier: `@${axis}/${extension.name}`,
				target: `./${axis}/${extension.name}/index.ts`,
			})),
			...(extension.axes.includes('src')
				? [
						{
							specifier: `@orkestrel/${blueprint.name}/${extension.name}`,
							target: `./src/${extension.name}/index.ts`,
						},
					]
				: []),
		]),
		...blueprintToSheets(blueprint).map((name) => ({
			specifier: `@src/${name}`,
			target: `./src/${name}/index.ts`,
		})),
		...ENVIRONMENTS.filter((environment) => blueprint.src.includes(environment)).map(
			(environment) => ({
				specifier: `@src/${environment}`,
				target: `./src/${environment}/index.ts`,
			}),
		),
		...ENVIRONMENTS.filter((environment) => blueprint.app.includes(environment)).map(
			(environment) => ({
				specifier: `@app/${environment}`,
				target: `./app/${environment}/index.ts`,
			}),
		),
		...(root === undefined
			? ENVIRONMENTS.filter(
					(environment) => environment !== 'core' && blueprint.src.includes(environment),
				).map((environment) => ({
					specifier: `@orkestrel/${blueprint.name}${SRC_MATRIX[environment].path.slice(1)}`,
					target: `./src/${environment}/index.ts`,
				}))
			: []),
		...(blueprint.src.length > 0
			? [
					{
						specifier: `@orkestrel/${blueprint.name}`,
						target: `./src/${root ?? 'core'}/index.ts`,
					},
				]
			: []),
	]
	const paths = aliases
		.map(({ specifier, target }, index) => {
			const separator = index === aliases.length - 1 ? '' : ','
			const line = `\t\t\t"${specifier}": ["${target}"]${separator}`
			// A published specifier carries the package name, and npm accepts one long
			// enough to push the entry past the formatter's width. oxfmt breaks such an
			// entry over its own lines, so emitting the flat form would leave the generated
			// file outside the fixed point the emit corpus holds it to.
			if (matchesPrintWidth(line)) return line
			return `\t\t\t"${specifier}": [\n\t\t\t\t"${target}"\n\t\t\t]${separator}`
		})
		.join('\n')
	return fillTemplate(CONFIG_TEMPLATES.root.tsconfig, {
		paths: aliases.length === 0 ? '\t\t"paths": {}' : `\t\t"paths": {\n${paths}\n\t\t}`,
	})
}

/**
 * Projects a blueprint into the project labels its root Vitest configuration registers.
 *
 * @param blueprint - The workspace specification.
 * @returns Project labels in registration order, including wrapper-registered sheet faces and
 * the probe benchmark variant.
 *
 * @example
 * ```ts
 * import { blueprintToProjects, createBlueprint } from '@orkestrel/scaffold'
 *
 * blueprintToProjects(createBlueprint('desk')).includes('policy') // true
 * ```
 */
export function blueprintToProjects(blueprint: Blueprint): readonly string[] {
	const sheets = blueprintToSheets(blueprint)
	const styled = sheets.length > 0 || blueprint.themes
	const faces = blueprintToFaces(blueprint)
	return [
		...sheets.map((name) => `src:${name}`),
		...(blueprint.themes && !blueprint.styles ? ['src:themes'] : []),
		...AXES.flatMap((axis) => [
			...ENVIRONMENTS.filter(
				(environment) =>
					(axis !== 'app' || environment !== 'server') && blueprint[axis].includes(environment),
			).map((environment) => `${axis}:${environment}`),
			...faces.filter((face) => face.axes.includes(axis)).map((face) => `${axis}:${face.name}`),
			...(axis === 'src' && blueprint.bin ? ['src:bin'] : []),
			...(axis === 'app' && blueprint.app.includes('server') ? ['app:server'] : []),
		]),
		'policy',
		'config',
		...(blueprint.setup.includes('node') || blueprint.global ? ['setup'] : []),
		...(blueprint.setup.includes('browser') ? ['setup:browser'] : []),
		...(blueprint.guides ? ['guides'] : []),
		...(blueprint.skills ? ['skills'] : []),
		...(blueprint.conformance ? ['conformance'] : []),
		...(blueprint.tree ? ['tree'] : []),
		...(blueprint.service ? ['service'] : []),
		...(blueprint.studies ? ['studies'] : []),
		...(blueprint.src.length > 0 || styled ? ['distribution'] : []),
		...(blueprint.integration ? ['integration'] : []),
		'probe',
		'probe (bench)',
	]
}

/**
 * Compiles the browser projects' pre-bundled dependency list for a blueprint.
 *
 * @remarks
 * A browser-mode run that discovers a runtime package mid-collection reloads the page, so the
 * list names the test package, its browser entry, and every Orkestrel runtime package the
 * blueprint declares or peers with, inline when the line fits the print width and stacked
 * otherwise.
 *
 * @example
 * ```ts
 * import { blueprintToOptimizedDependencies, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToOptimizedDependencies(blueprint).includes("'@orkestrel/test/browser'") // true
 * ```
 */
export function blueprintToOptimizedDependencies(blueprint: Blueprint): string {
	const names = [
		'@orkestrel/test',
		'@orkestrel/test/browser',
		...[
			...new Set([
				...(Object.hasOwn(blueprintToDevDependencies(blueprint), '@orkestrel/contract')
					? ['@orkestrel/contract']
					: []),
				...blueprint.dependencies.map((dependency) => dependency.name),
				...blueprint.peers.map((peer) => peer.name),
			]),
		]
			.filter((name) => name.startsWith('@orkestrel/'))
			.sort(),
	]
	const inline = `\tinclude: [${names.map((name) => `'${name}'`).join(', ')}],`
	return matchesPrintWidth(inline)
		? `const optimizeDeps = {\n${inline}\n}\n\n`
		: `const optimizeDeps = {\n\tinclude: [\n${names.map((name) => `\t\t'${name}',`).join('\n')}\n\t],\n}\n\n`
}

/**
 * Compiles the root Vite and Vitest configuration for a blueprint.
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
 * import { blueprintToRootVite, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToRootVite(blueprint).includes('defineConfig') // true
 * ```
 */
export function blueprintToRootVite(blueprint: Blueprint): string {
	const machinery = blueprintToMachinery(blueprint)
	const planned = new Set(blueprintToProjects(blueprint))
	const sheets = blueprintToSheets(blueprint)
	const styled = sheets.length > 0 || blueprint.themes
	// A browser test runs in the browser, so it cannot start a Node fixture for
	// itself. That is the case a global setup exists for, and it is why
	// `src:browser`, `setup:browser`, and `integration` take the same span.
	const global = blueprint.global ? "\t\t\tglobalSetup: ['./tests/setupGlobal.ts'],\n" : ''
	const imports = [
		...(styled || machinery.showcase
			? [
					`import { ${[...(styled ? ['existsSync'] : []), ...(machinery.showcase ? ['renameSync'] : [])].join(', ')} } from 'node:fs'`,
				]
			: []),
		...(machinery.browser ? ["import { playwright } from '@vitest/browser-playwright'"] : []),
		...(machinery.frameworks.includes('vue') ? ["import vue from '@vitejs/plugin-vue'"] : []),
		...(machinery.showcase
			? [
					"import { viteSingleFile } from 'vite-plugin-singlefile'",
					"import { resolve as resolvePath } from 'node:path'",
				]
			: []),
	]
	const external = 'external: resolveSourceExternal,'
	// Each factory and the row that registers it are chosen by the same condition, in the order
	// the generated configuration declares them.
	const factories = [
		...(blueprint.src.includes('browser') || blueprint.src.includes('server')
			? [
					blueprint.src.includes('core')
						? `function resolveSourceExternal(id: string): boolean {
	return (
		id === '@src/core' ||
		resolveExternal(id, {
			peers,
			refused: [],
			siblings: [resolveWorkspacePath('src/core/index.ts')],
		})
	)
}
`
						: `function resolveSourceExternal(id: string): boolean {
	return resolveExternal(id, { peers, refused: [], siblings: [] })
}
`,
				]
			: []),
		...(styled ? [CONFIG_TEMPLATES.factories.sheet] : []),
		...(planned.has('src:core') ? [CONFIG_TEMPLATES.factories.src.core] : []),
		// Each of the two source factories asks the axis for core once, where it renders.
		...(planned.has('src:browser')
			? [blueprint.src.includes('core')].map((core) =>
					fillTemplate(CONFIG_TEMPLATES.factories.src.browser, {
						external,
						output: core
							? "\t\t\t\toutput: { paths: { '@src/core': '../core/index.js' } },"
							: '\t\t\t\toutput: {},',
						exclude: core ? "\t\t\texclude: ['tests/src/core/**/*.test.ts'],\n" : '',
						global,
					}),
				)
			: []),
		...(planned.has('src:server')
			? [blueprint.src.includes('core')].map((core) =>
					fillTemplate(CONFIG_TEMPLATES.factories.src.server, {
						external,
						output: core
							? `\t\t\t\toutput: [
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
							: '\t\t\t\toutput: {},',
						exclude: core ? "\t\t\texclude: ['tests/src/core/**/*.test.ts'],\n" : '',
					}),
				)
			: []),
		...(planned.has('src:vue') ? [CONFIG_TEMPLATES.factories.src.vue] : []),
		...(planned.has('src:bin') ? [CONFIG_TEMPLATES.factories.src.bin] : []),
		...(planned.has('app:core') ? [CONFIG_TEMPLATES.factories.app.core] : []),
		...(planned.has('app:browser')
			? [
					fillTemplate(CONFIG_TEMPLATES.factories.app.browser, {
						showcaseFactory: machinery.showcase ? CONFIG_TEMPLATES.factories.app.showcase : '',
						journeyFactory: blueprint.journey ? CONFIG_TEMPLATES.factories.app.journey : '',
						journeyExclude: blueprint.journey
							? "\t\t\texclude: ['tests/app/browser/integration.test.ts'],\n"
							: '',
					}),
				]
			: []),
		...(planned.has('app:vue')
			? [
					fillTemplate(CONFIG_TEMPLATES.factories.app.vue, {
						journeyExclude: blueprint.journey
							? "\t\t\texclude: ['tests/app/vue/integration.test.ts'],\n"
							: '\t\t\texclude: [],\n',
					}),
				]
			: []),
		...(planned.has('app:server') ? [CONFIG_TEMPLATES.factories.app.server] : []),
		CONFIG_TEMPLATES.factories.policy,
		CONFIG_TEMPLATES.factories.config,
		...(planned.has('setup') ? [CONFIG_TEMPLATES.factories.setup] : []),
		...(planned.has('setup:browser')
			? [
					fillTemplate(CONFIG_TEMPLATES.factories.browser, {
						optimization: machinery.frameworks.includes('vue')
							? "optimizeDeps: { include: [...optimizeDeps.include, 'vue'] }"
							: 'optimizeDeps',
						plugins: machinery.frameworks.includes('vue') ? '\t\tplugins: [vue()],\n' : '',
						global,
					}),
				]
			: []),
		...(planned.has('guides') ? [CONFIG_TEMPLATES.factories.guides] : []),
		...(planned.has('skills') ? [CONFIG_TEMPLATES.factories.skills] : []),
		...(planned.has('conformance') ? [CONFIG_TEMPLATES.factories.conformance] : []),
		...(planned.has('tree') ? [CONFIG_TEMPLATES.factories.tree] : []),
		...(planned.has('service') ? [CONFIG_TEMPLATES.factories.service] : []),
		...(planned.has('studies') ? [CONFIG_TEMPLATES.factories.studies] : []),
		...(planned.has('distribution') ? [CONFIG_TEMPLATES.factories.distribution] : []),
		...(planned.has('integration')
			? [
					fillTemplate(
						styled
							? CONFIG_TEMPLATES.factories.integration.sheet
							: CONFIG_TEMPLATES.factories.integration.module,
						{ global },
					),
				]
			: []),
		CONFIG_TEMPLATES.factories.probe,
	]
	// The `app:browser` row is the factory itself, never a call of it. Vitest hands the command
	// line's `--mode` only to a project it calls, and `mergeOverride` sets that mode on the
	// project it returns, so an evaluated row silently turns the release-mode publish gate into
	// a skip.
	const projects = [
		...(styled
			? [
					...sheets.map((name) => `'./configs/src/vite.${name}.config.ts'`),
					...(planned.has('src:themes') ? ["'./configs/src/vite.themes.config.ts'"] : []),
				]
			: []),
		...(planned.has('src:core') ? ['srcCore'] : []),
		...(planned.has('src:browser') ? ['srcBrowser'] : []),
		...(planned.has('src:server') ? ['srcServer'] : []),
		...(planned.has('src:vue') ? ['srcVue'] : []),
		...(planned.has('src:bin') ? ['srcBin'] : []),
		...(planned.has('app:core') ? ['appCore'] : []),
		...(planned.has('app:browser') ? ['appBrowser'] : []),
		...(planned.has('app:vue') ? ['appVue'] : []),
		...(planned.has('app:server') ? ['appServer'] : []),
		'policy',
		'config',
		...(planned.has('setup') ? ['setup'] : []),
		...(planned.has('setup:browser') ? ['setupBrowser'] : []),
		...(planned.has('guides') ? ['guides'] : []),
		...(planned.has('skills') ? ['skills'] : []),
		...(planned.has('conformance') ? ['conformance'] : []),
		...(planned.has('tree') ? ['tree'] : []),
		...(planned.has('service') ? ['service'] : []),
		...(planned.has('studies') ? ['studies'] : []),
		...(planned.has('distribution') ? ['distribution'] : []),
		...(planned.has('integration') ? ['integration'] : []),
		'probe',
	]

	const joinedProjects = `\t\tprojects: [${projects.join(', ')}],`
	const projectRows = matchesPrintWidth(joinedProjects)
		? joinedProjects
		: `\t\tprojects: [
${projects.map((project) => `\t\t\t${project},`).join('\n')}
	\t],`
	// The configuration helpers a selection reaches are read off the factories it
	// emitted rather than restated as a second selection rule, so the generated
	// config imports what it uses and passes its own lint gate.
	const body = `${factories.join('\n')}\n`
	const helpers = [
		'enforceBuildLog',
		'environmentBoundary',
		'outputBoundary',
		'resolveApplication',
		'resolveExternal',
		'stampPage',
	].filter((helper) => body.includes(helper))
	const helperImport = `import { ${helpers.join(', ')} } from './configs/helpers.js'\n`
	return fillTemplate(CONFIG_TEMPLATES.root.vite, {
		journey:
			blueprint.journey && blueprint.app.includes('browser')
				? "import type { JourneyVariant } from '@orkestrel/test'\n"
				: '',
		imports: imports.length === 0 ? '' : `${imports.join('\n')}\n`,
		helpers:
			helpers.length === 0
				? ''
				: matchesPrintWidth(helperImport.trimEnd())
					? helperImport
					: `import {\n${helpers.map((helper) => `\t${helper},`).join('\n')}\n} from './configs/helpers.js'\n`,
		// Only a selection that emits `configs/browsers.ts` can name the provider options, commands, and screenshot directory.
		browsers: machinery.browser
			? "import { resolveBrowser, resolvePinnedBrowser } from './configs/browsers.js'\nimport { commands } from './configs/commands.js'\n"
			: '',
		options:
			(machinery.browser
				? 'const browserOptions = resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)\n' +
					"// Vitest writes a page.screenshot() capture beside its test file unless a directory is named.\nconst screenshots = resolveWorkspacePath('tmp/captures/screenshots')\n\n" +
					blueprintToOptimizedDependencies(blueprint)
				: '') +
			(blueprint.journey && blueprint.app.includes('browser')
				? "const capture = process.env.CAPTURE === '1'\n\n"
				: '') +
			((blueprint.journey || blueprint.showcase) && blueprint.app.includes('browser')
				? `const applications = {\n\tbrowser: appBrowser,\n${blueprintToFaces(blueprint)
						.filter(
							(extension) => extension.surface === 'browser' && extension.axes.includes('app'),
						)
						.map(
							(extension) =>
								`\t${extension.name}: app${extension.name[0]?.toUpperCase()}${extension.name.slice(1)},\n`,
						)
						.join('')}}\n\n`
				: ''),
		factories: body,
		projects: projectRows,
	})
}

/**
 * Compiles every artifact in the `configs` group.
 *
 * @param blueprint - The workspace specification.
 * @returns Root and selected wrapper artifacts in matrix order.
 *
 * @example
 * ```ts
 * import { blueprintToConfigArtifacts, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToConfigArtifacts(blueprint)[0]?.path // 'tsconfig.json'
 * ```
 */
export function blueprintToConfigArtifacts(blueprint: Blueprint): readonly Artifact[] {
	const roots: readonly Artifact[] = [
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
	// The browser resolver is its own leaf rather than a block inside the vendored
	// `configs/helpers.ts`, because that file is byte-identical in every workspace
	// and only a browser selection declares the `playwright` it imports. The commands
	// module holds the package's own browser commands, so it is presence-owned: a
	// missing file is restored and a written one is kept.
	const browsers: readonly Artifact[] = blueprintToMachinery(blueprint).browser
		? [
				{
					path: 'configs/browsers.ts',
					group: 'configs',
					ownership: 'content',
					origin: 'template',
					content: CONFIG_TEMPLATES.browsers,
				},
				{
					path: 'configs/commands.ts',
					group: 'configs',
					ownership: 'presence',
					origin: 'template',
					content: CONFIG_TEMPLATES.commands,
				},
			]
		: []
	const sheets: readonly Artifact[] = [
		...blueprintToSheets(blueprint),
		...(blueprint.themes ? ['styles/themes'] : []),
	].flatMap((name): readonly Artifact[] => {
		const wrapper: Artifact = {
			path: `configs/src/vite.${name === 'styles/themes' ? 'themes' : name}.config.ts`,
			group: 'configs',
			ownership: 'content',
			origin: 'template',
			content: fillTemplate(CONFIG_TEMPLATES.vites.sheet, {
				name,
				label: name === 'styles/themes' ? 'themes' : name,
			}),
		}
		return name === 'styles/themes'
			? [wrapper]
			: [
					wrapper,
					{
						path: `configs/src/tsconfig.${name}.json`,
						group: 'configs',
						ownership: 'content',
						origin: 'template',
						content: fillTemplate(CONFIG_TEMPLATES.tsconfigs.sheet, { name }),
					},
				]
	})
	// The iterator consumes one environment at a time, and reads a hole in `src` or `app` as an
	// `undefined` environment, which the matrix refuses before a later environment is read.
	const sources: readonly Artifact[] = Iterator.from(blueprint.src)
		.flatMap((environment) =>
			SRC_MATRIX[environment].configs.map((path): Artifact => ({
				path,
				group: 'configs',
				ownership: 'content',
				origin: 'template',
				environment,
				content:
					path === 'configs/src/tsconfig.core.json'
						? CONFIG_TEMPLATES.tsconfigs.src.core
						: path === 'configs/src/vite.browser.config.ts'
							? CONFIG_TEMPLATES.vites.src.browser
							: path === 'configs/src/tsconfig.browser.json'
								? CONFIG_TEMPLATES.tsconfigs.src.browser
								: path === 'configs/src/vite.server.config.ts'
									? CONFIG_TEMPLATES.vites.src.server
									: path === 'configs/src/tsconfig.server.json'
										? CONFIG_TEMPLATES.tsconfigs.src.server
										: CONFIG_TEMPLATES.vites.src.core,
			})),
		)
		.toArray()
	// The paths are read only for a bin selection, once, after the sources.
	const paths = blueprint.bin
		? blueprint.src.map(
				(environment) => `\t\t\t\t\t\t'@src/${environment}': '../src/${environment}/index.js',`,
			)
		: []
	const renderedPaths =
		paths.length === 0
			? '\t\t\t\t\tpaths: {},'
			: `\t\t\t\t\tpaths: {
${paths.join('\n')}
					},`
	const bins: readonly Artifact[] = blueprint.bin
		? BIN_CONFIGS.map((path): Artifact => ({
				path,
				group: 'configs',
				ownership: 'content',
				origin: 'template',
				content:
					path === 'configs/src/tsconfig.bin.json'
						? CONFIG_TEMPLATES.tsconfigs.bin
						: fillTemplate(CONFIG_TEMPLATES.vites.bin, { paths: renderedPaths }),
			}))
		: []
	const includeSuffixes = ['cts', 'mts', 'ts', 'tsx']
	// Each browser and server tsconfig asks the application axis for core where it renders its own
	// include list, so the axis is read once per such config and never for another.
	const applications: readonly Artifact[] = Iterator.from(blueprint.app)
		.flatMap((environment) =>
			APP_MATRIX[environment].configs.map((path): Artifact => ({
				path,
				group: 'configs',
				ownership: 'content',
				origin: 'template',
				environment,
				content:
					path === 'configs/app/vite.browser.config.ts'
						? CONFIG_TEMPLATES.vites.app.browser
						: path === 'configs/app/tsconfig.browser.json'
							? fillTemplate(CONFIG_TEMPLATES.tsconfigs.app.browser, {
									include: [
										...includeSuffixes.map((suffix) => `../../app/browser/**/*.${suffix}`),
										...(blueprint.app.includes('core')
											? includeSuffixes.map((suffix) => `../../app/core/**/*.${suffix}`)
											: []),
										...includeSuffixes.map((suffix) => `../../tests/app/browser/**/*.${suffix}`),
										'../../tests/setup.ts',
										'../../tests/setupBrowser.ts',
									]
										.map(
											(entry, index, entries) =>
												`\t\t${JSON.stringify(entry)}${index === entries.length - 1 ? '' : ','}`,
										)
										.join('\n'),
								})
							: path === 'configs/app/vite.server.config.ts'
								? CONFIG_TEMPLATES.vites.app.server
								: path === 'configs/app/tsconfig.server.json'
									? fillTemplate(CONFIG_TEMPLATES.tsconfigs.app.server, {
											include: [
												...includeSuffixes.map((suffix) => `../../app/server/**/*.${suffix}`),
												...(blueprint.app.includes('core')
													? includeSuffixes.map((suffix) => `../../app/core/**/*.${suffix}`)
													: []),
												...includeSuffixes.map((suffix) => `../../tests/app/server/**/*.${suffix}`),
												'../../tests/setup.ts',
												'../../tests/setupServer.ts',
											]
												.map(
													(entry, index, entries) =>
														`\t\t${JSON.stringify(entry)}${index === entries.length - 1 ? '' : ','}`,
												)
												.join('\n'),
										})
									: CONFIG_TEMPLATES.tsconfigs.app.core,
			})),
		)
		.toArray()
	const faces: readonly Artifact[] = blueprintToFaces(blueprint).flatMap((extension) =>
		extension.axes.flatMap((axis): readonly Artifact[] => {
			const include = [
				...['cts', 'mts', 'ts', 'tsx', ...FRAMEWORK_MATRIX[extension.name].suffixes].map(
					(suffix) => `../../app/${extension.name}/**/*.${suffix}`,
				),
				...(blueprint.app.includes('core')
					? ['cts', 'mts', 'ts', 'tsx'].map((suffix) => `../../app/core/**/*.${suffix}`)
					: []),
				...['cts', 'mts', 'ts', 'tsx', ...FRAMEWORK_MATRIX[extension.name].suffixes].map(
					(suffix) => `../../tests/app/${extension.name}/**/*.${suffix}`,
				),
				'../../tests/setup.ts',
				'../../tests/setupBrowser.ts',
			]
			const siblings = blueprint.src
				.filter((environment) => environment === 'core' || environment === 'browser')
				.flatMap((environment) =>
					['ts', 'js'].map((suffix) => {
						const key = `\t[resolveWorkspacePath('src/${environment}/index.${suffix}').replaceAll('\\\\', '/')]:`
						const value = `'@orkestrel/${blueprint.name}${environment === 'browser' ? '/browser' : ''}',`
						return matchesPrintWidth(`${key} ${value}`) ? `${key} ${value}` : `${key}\n\t\t${value}`
					}),
				)
				.join('\n')
			return [
				{
					path: `configs/${axis}/vite.${extension.name}.config.ts`,
					group: 'configs',
					ownership: 'content',
					origin: 'template',
					environment: 'browser',
					content:
						axis === 'src'
							? fillTemplate(CONFIG_TEMPLATES.vites.src.vue, {
									siblings,
									refused: `[${FRAMEWORK_MATRIX[extension.name].refused.map((name) => serializeTypeScriptString(name)).join(', ')}]`,
								})
							: CONFIG_TEMPLATES.vites.app.vue,
				},
				{
					path: `configs/${axis}/tsconfig.${extension.name}.json`,
					group: 'configs',
					ownership: 'content',
					origin: 'template',
					environment: 'browser',
					content:
						axis === 'src'
							? CONFIG_TEMPLATES.tsconfigs.vue.src
							: fillTemplate(CONFIG_TEMPLATES.tsconfigs.vue.app, {
									include: include
										.map(
											(entry, index) =>
												`\t\t${JSON.stringify(entry)}${index === include.length - 1 ? '' : ','}`,
										)
										.join('\n'),
								}),
				},
			]
		}),
	)
	const showcase: readonly Artifact[] =
		blueprint.showcase && blueprint.app.includes('browser')
			? [
					{
						path: SHOWCASE_CONFIG_PATH,
						group: 'configs',
						ownership: 'content',
						origin: 'template',
						environment: 'browser',
						content: CONFIG_TEMPLATES.vites.app.showcase,
					},
				]
			: []
	const journey: readonly Artifact[] =
		blueprint.journey && blueprint.app.includes('browser')
			? [
					{
						path: JOURNEY_CONFIG_PATH,
						group: 'configs',
						ownership: 'birth',
						origin: 'template',
						environment: 'browser',
						content: CONFIG_TEMPLATES.vites.app.journey,
					},
				]
			: []
	const skills: readonly Artifact[] = blueprint.skills
		? [
				{
					path: SKILLS_CONFIG_PATH,
					group: 'configs',
					ownership: 'content',
					origin: 'template',
					content: CONFIG_TEMPLATES.tsconfigs.skills,
				},
			]
		: []
	return [
		...roots,
		...browsers,
		...sheets,
		...sources,
		...bins,
		...applications,
		...faces,
		...showcase,
		...journey,
		...skills,
	]
}

/**
 * Compiles every artifact in the `source` group.
 *
 * @param blueprint - The workspace specification.
 * @returns Published barrels, sheet seeds, selected application entries, and the optional bin entry.
 *
 * @remarks
 * Barrels, server entries, and bin entries hold no starter implementation. Browser entries
 * render the workspace name as a level-one heading; the Vue face mounts its arrival component.
 *
 * @example
 * ```ts
 * import { blueprintToSourceArtifacts, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToSourceArtifacts(blueprint).every(({ group }) => group === 'source') // true
 * ```
 */
export function blueprintToSourceArtifacts(blueprint: Blueprint): readonly ContentArtifact[] {
	const tokens: readonly ContentArtifact[] =
		blueprint.themes && !blueprint.styles
			? [
					{
						path: 'src/styles/_tokens.scss',
						group: 'source',
						ownership: 'birth',
						origin: 'template',
						content: ARTIFACT_TEMPLATES.source.sheet['_tokens.scss'],
					},
				]
			: []
	const sheets: readonly ContentArtifact[] = [
		...blueprintToSheets(blueprint),
		...(blueprint.themes ? ['styles/themes'] : []),
	].flatMap((name) =>
		Object.entries(
			name === 'styles/themes' ? ARTIFACT_TEMPLATES.source.themes : ARTIFACT_TEMPLATES.source.sheet,
		).map(([path, content]): ContentArtifact => ({
			path: `src/${name}/${path}`,
			group: 'source',
			ownership: 'birth',
			origin: 'template',
			content,
		})),
	)
	// A hole in `src` or `app` reads as an `undefined` environment, as a `for…of` over it would.
	const sources: readonly ContentArtifact[] = Iterator.from(blueprint.src)
		.map((environment): ContentArtifact => ({
			path: `src/${environment}/index.ts`,
			group: 'source',
			ownership: 'birth',
			origin: 'template',
			environment,
			content: ARTIFACT_TEMPLATES.source.empty,
		}))
		.toArray()
	const applications: readonly ContentArtifact[] = Iterator.from(blueprint.app)
		.flatMap((environment): readonly ContentArtifact[] => {
			const entry: ContentArtifact = {
				path: `app/${environment}/index.ts`,
				group: 'source',
				ownership: 'birth',
				origin: 'template',
				environment,
				content: ARTIFACT_TEMPLATES.source.empty,
			}
			if (environment === 'browser') {
				return [
					entry,
					{
						path: 'app/browser/main.ts',
						group: 'source',
						ownership: 'birth',
						origin: 'template',
						environment,
						content: fillTemplate(ARTIFACT_TEMPLATES.source.main, {
							heading: `${matchesPrintWidth(`\t.appendChild(document.createElement('h1')).textContent = ${serializeTypeScriptString(blueprint.name)}`) ? ' ' : '\n\t'}${serializeTypeScriptString(blueprint.name)}`,
						}),
					},
					{
						path: 'app/browser/index.html',
						group: 'source',
						ownership: 'birth',
						origin: 'template',
						environment,
						content: ARTIFACT_TEMPLATES.source.browser,
					},
				]
			}
			return environment === 'server'
				? [
						entry,
						{
							path: 'app/server/main.ts',
							group: 'source',
							ownership: 'birth',
							origin: 'template',
							environment,
							content: ARTIFACT_TEMPLATES.source.empty,
						},
					]
				: [entry]
		})
		.toArray()
	const faces: readonly ContentArtifact[] = blueprintToFaces(blueprint).flatMap((extension) =>
		extension.axes.flatMap((axis): readonly ContentArtifact[] => {
			const barrel: ContentArtifact = {
				path: `${axis}/${extension.name}/index.ts`,
				group: 'source',
				ownership: 'birth',
				origin: 'template',
				environment: 'browser',
				content:
					axis === 'app' ? ARTIFACT_TEMPLATES.source.empty : ARTIFACT_TEMPLATES.source.barrel,
			}
			return axis === 'app'
				? [
						barrel,
						{
							path: `app/${extension.name}/index.html`,
							group: 'source',
							ownership: 'birth',
							origin: 'template',
							environment: 'browser',
							content: ARTIFACT_TEMPLATES.source.browser,
						},
						...Object.entries(ARTIFACT_TEMPLATES.source.vue).map(
							([path, content]): ContentArtifact => ({
								path: `app/${extension.name}/${path}`,
								group: 'source',
								ownership: 'birth',
								origin: 'template',
								environment: 'browser',
								content: fillTemplate(content, {
									heading: matchesPrintWidth(`\t<h1>${blueprint.name}</h1>`)
										? blueprint.name
										: `\n\t\t${blueprint.name}\n\t`,
								}),
							}),
						),
					]
				: [barrel]
		}),
	)
	const bin: readonly ContentArtifact[] = blueprint.bin
		? [
				{
					path: BIN_ENTRY_PATH,
					group: 'source',
					ownership: 'birth',
					origin: 'template',
					content: ARTIFACT_TEMPLATES.source.empty,
				},
			]
		: []
	return [...tokens, ...sheets, ...sources, ...applications, ...faces, ...bin]
}

/**
 * Compiles every artifact in the `tests` group that is not vendored from the host.
 *
 * @param blueprint - The workspace specification.
 * @returns Shared setup modules and proofs, axis and sheet tests, journey suites, and the optional integration seed.
 *
 * @remarks
 * `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` are
 * fleet-invariant host artifacts and therefore do not appear here. A guide
 * proof is not emitted while the workspace intentionally has empty barrels and
 * no package guide. The integration seed follows its structural flag and loads
 * every selected environment through its public barrel.
 *
 * The conformance proof is not emitted either, for the reason the guide proof
 * is not: it names an official artifact only the package knows, so a generated
 * placeholder would read as a proof while measuring nothing. `service` emits its
 * readiness setup alone, because the root configuration names that module by
 * path. `studies` emits nothing: the root configuration names no study harness,
 * so `tests/setupStudy.ts` is the package's own module.
 *
 * The content-owned distribution harness `tests/setupDistribution.ts` and the presence-owned
 * proof `tests/distribution.test.ts` are emitted because the proof measures the packed tarball
 * rather than anything only the package knows. Every assertion derives from the installed tree
 * at run time, so nothing has to be named. The proof follows the published source it packs and
 * alone is claimed by presence: a target lacking the proof reports as drift, and a package that
 * replaced the proof with a better one keeps that proof.
 *
 * @example
 * ```ts
 * import { blueprintToTestArtifacts, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToTestArtifacts(blueprint)[0]?.path // 'tests/setup.ts'
 * ```
 */
export function blueprintToTestArtifacts(blueprint: Blueprint): readonly ContentArtifact[] {
	const sheets = [...blueprintToSheets(blueprint), ...(blueprint.themes ? ['styles/themes'] : [])]
	const faces: readonly ContentArtifact[] = blueprintToFaces(blueprint).flatMap((extension) =>
		extension.axes.map((axis): ContentArtifact => ({
			path: `tests/${axis}/${extension.name}/index.test.ts`,
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			environment: 'browser',
			content: fillTemplate(ARTIFACT_TEMPLATES.tests.entry, {
				specifier: serializeTypeScriptString(`@${axis}/${extension.name}`),
				label: serializeTypeScriptString(`${axis} ${extension.name} entry`),
			}),
		})),
	)
	const styles: readonly ContentArtifact[] =
		sheets.length > 0
			? [
					{
						path: 'tests/setupStyles.ts',
						group: 'tests',
						ownership: 'birth',
						origin: 'template',
						content: ARTIFACT_TEMPLATES.tests.styles.module,
					},
					{
						path: 'tests/setupStyles.test.ts',
						group: 'tests',
						ownership: 'birth',
						origin: 'template',
						content: ARTIFACT_TEMPLATES.tests.styles.proof,
					},
				]
			: []
	// Oxlint's `import/no-absolute-path` refuses a root-relative specifier, so the sheet import
	// climbs from `tests/src/<name>/`.
	const sheetTests: readonly ContentArtifact[] = sheets.map((name): ContentArtifact => {
		const tests = '../'.repeat(name.split('/').length + 1)
		return {
			path: `tests/src/${name}/index.test.ts`,
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			content: fillTemplate(ARTIFACT_TEMPLATES.tests.sheet, {
				name,
				root: `${tests}../`,
			}),
		}
	})
	const browsers: readonly ContentArtifact[] = blueprintToMachinery(blueprint).browser
		? [
				{
					path: 'tests/setupBrowser.ts',
					group: 'tests',
					ownership: 'birth',
					origin: 'template',
					environment: 'browser',
					content: blueprint.journey
						? ARTIFACT_TEMPLATES.tests.browser
						: ARTIFACT_TEMPLATES.tests.setup,
				},
			]
		: []
	const servers: readonly ContentArtifact[] =
		blueprint.src.includes('server') ||
		blueprint.app.includes('server') ||
		blueprint.bin ||
		blueprint.conformance ||
		blueprint.tree
			? [
					{
						path: 'tests/setupServer.ts',
						group: 'tests',
						ownership: 'birth',
						origin: 'template',
						environment: 'server',
						content: ARTIFACT_TEMPLATES.tests.setup,
					},
				]
			: []
	// The live-service project names this module in `setupFiles`, so a registered
	// project whose setup module is absent fails to load at all. The suite beneath
	// `tests/service` is not emitted beside it: what a live proof drives is the
	// package's own service, which this package cannot write for it.
	const services: readonly ContentArtifact[] = blueprint.service
		? [
				{
					path: SERVICE_SETUP_PATH,
					group: 'tests',
					ownership: 'birth',
					origin: 'template',
					content: ARTIFACT_TEMPLATES.tests.setup,
				},
			]
		: []
	const globals: readonly ContentArtifact[] = blueprint.global
		? [
				{
					path: GLOBAL_SETUP_PATH,
					group: 'tests',
					ownership: 'birth',
					origin: 'template',
					content: ARTIFACT_TEMPLATES.tests.global.module,
				},
				{
					path: 'tests/setupGlobal.test.ts',
					group: 'tests',
					ownership: 'birth',
					origin: 'template',
					content: ARTIFACT_TEMPLATES.tests.global.proof,
				},
			]
		: []
	const journeys: readonly ContentArtifact[] =
		blueprint.journey && blueprint.app.includes('browser')
			? [
					'browser',
					...blueprintToFaces(blueprint).flatMap((extension) =>
						extension.surface === 'browser' && extension.axes.includes('app')
							? [extension.name]
							: [],
					),
				].map((application): ContentArtifact => ({
					path: `tests/app/${application}/integration.test.ts`,
					group: 'tests',
					ownership: 'birth',
					origin: 'template',
					environment: 'browser',
					content: fillTemplate(ARTIFACT_TEMPLATES.tests.journey, {
						application,
						heading: serializeTypeScriptString(blueprint.name),
						imports:
							application === 'vue'
								? "import { createApp } from 'vue'\nimport App from '../../../app/vue/App.vue'\n"
								: '',
						mount:
							application === 'vue'
								? "\t\tconst container = document.body.appendChild(document.createElement('main'))\n\t\tconst app = createApp(App)\n"
								: '',
						arrival:
							application === 'vue'
								? '\t\t\tapp.mount(container)\n'
								: "\t\t\tawait import('../../../app/browser/main.js')\n",
						cleanup:
							application === 'vue'
								? '\t\t\tapp.unmount()\n\t\t\tcontainer.remove()\n'
								: "\t\t\tfor (const main of page.getByRole('main').elements()) main.remove()\n",
					}),
				}))
			: []
	// A hole in `src` or `app` reads as an `undefined` environment, as a `for…of` over it would.
	const sources: readonly ContentArtifact[] = Iterator.from(blueprint.src)
		.map((environment): ContentArtifact => ({
			path: `tests/src/${environment}/index.test.ts`,
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			environment,
			content: fillTemplate(ARTIFACT_TEMPLATES.tests.entry, {
				specifier: serializeTypeScriptString(`@src/${environment}`),
				label: serializeTypeScriptString(`src ${environment} entry`),
			}),
		}))
		.toArray()
	const binSpecifier = serializeTypeScriptString('../../../src/bin/main.js')
	const joinedImport = `\t\tconst entry = await import(${binSpecifier})`
	const bins: readonly ContentArtifact[] = blueprint.bin
		? [
				{
					path: 'tests/src/bin/main.test.ts',
					group: 'tests',
					ownership: 'birth',
					origin: 'template',
					content: fillTemplate(ARTIFACT_TEMPLATES.tests.bin, {
						import: matchesPrintWidth(joinedImport)
							? joinedImport
							: `\t\tconst entry =\n\t\t\tawait import(${binSpecifier})`,
					}),
				},
			]
		: []
	const applications: readonly ContentArtifact[] = Iterator.from(blueprint.app)
		.map((environment): ContentArtifact => ({
			path: `tests/app/${environment}/index.test.ts`,
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			environment,
			content: fillTemplate(ARTIFACT_TEMPLATES.tests.entry, {
				specifier: serializeTypeScriptString(`@app/${environment}`),
				label: serializeTypeScriptString(`app ${environment} entry`),
			}),
		}))
		.toArray()
	// The packed artifact is what this proof measures, and that subject is the same
	// in every publishing workspace: an installed tree, its exports map, and the
	// declarations beside it. So it is derived rather than named, and a workspace
	// that packs no published source has nothing for it to read. Ownership is
	// presence, which is what reports a target still lacking the proof as drift
	// while leaving a package that wrote a better one exactly as it is.
	//
	// The browser branch follows a published `src` browser face, because the browser
	// drive measures the packed artifact and only a published face is packed. A
	// workspace selecting `browser` on its `app` axis alone declares
	// `@vitest/browser-playwright` and `playwright` and gets `configs/browsers.ts`
	// emitted, and its proof still carries no branch: those imports are declared by
	// either axis, so they do not select the branch. `vite` selects nothing either,
	// though the branch imports it: `vite` sits in `BASE_DEV_DEPENDENCIES` and every
	// workspace declares it. Presence ownership never rewrites the file, so
	// a workspace publishing a browser face later keeps a proof with no branch for it.
	// The core-only variant therefore carries the guard that reddens on such an entry
	// rather than skipping it.
	// The `src` axis is asked for a browser face only when the proof is planned, and the integration
	// proof reads both axes only when it is planned, so each read stays where the condition puts it.
	const distribution = ARTIFACT_TEMPLATES.tests.distribution
	const distributions: readonly ContentArtifact[] =
		blueprint.src.length > 0 || blueprintToSheets(blueprint).length > 0 || blueprint.themes
			? [blueprint.src.includes('browser')].flatMap((browser): readonly ContentArtifact[] => [
					{
						path: DISTRIBUTION_SETUP_PATH,
						group: 'tests',
						ownership: 'content',
						origin: 'template',
						content: fillTemplate(distribution.module, {
							types: browser ? distribution.types : '',
							transport: browser ? distribution.transport : '',
							launcher: browser ? distribution.launcher : '',
							helpers: browser ? distribution.helpers : '',
						}),
					},
					{
						path: DISTRIBUTION_TEST_PATH,
						group: 'tests',
						ownership: 'presence',
						origin: 'template',
						content: fillTemplate(distribution.proof, {
							import: browser ? distribution.import : '',
							drive: browser ? distribution.drive : '',
							guard: browser ? '' : distribution.guard,
						}),
					},
				])
			: []
	const integrations: readonly ContentArtifact[] = blueprint.integration
		? [
				[
					...Iterator.from(blueprint.src)
						.map((environment) => ({
							entry:
								environment === 'core'
									? 'srcCore'
									: environment === 'browser'
										? 'srcBrowser'
										: 'srcServer',
							specifier: `@src/${environment}`,
						}))
						.toArray(),
					...Iterator.from(blueprint.app)
						.map((environment) => ({
							entry:
								environment === 'core'
									? 'appCore'
									: environment === 'browser'
										? 'appBrowser'
										: 'appServer',
							specifier: `@app/${environment}`,
						}))
						.toArray(),
				],
			].map((modules): ContentArtifact => {
				const entries = modules.map(({ entry }) => entry)
				const imports = modules.map(
					({ entry, specifier }) => `import * as ${entry} from '${specifier}'`,
				)
				const joined = `expect([${entries.map((entry) => `Object.keys(${entry})`).join(', ')}]).toStrictEqual(`
				const actual = matchesPrintWidth(`\t\t${joined}[`)
					? joined
					: `expect([\n${entries.map((entry) => `\t\t\tObject.keys(${entry}),`).join('\n')}\n\t\t]).toStrictEqual(`
				const expectedInline = `[${entries.map(() => '[]').join(', ')}]`
				const expected =
					actual !== joined || matchesPrintWidth(`\t\t${joined}${expectedInline})`)
						? expectedInline
						: `[\n${entries.map(() => '\t\t\t[],').join('\n')}\n\t\t]`
				return {
					path: INTEGRATION_TEST_PATH,
					group: 'tests',
					ownership: 'birth',
					origin: 'template',
					content: fillTemplate(ARTIFACT_TEMPLATES.tests.integration, {
						imports: `${imports.join('\n')}\n`,
						actual,
						expected,
					}),
				}
			})
		: []
	return [
		{
			path: 'tests/setup.ts',
			group: 'tests',
			ownership: 'birth',
			origin: 'template',
			content: ARTIFACT_TEMPLATES.tests.setup,
		},
		...faces,
		...styles.filter(({ content }) => content.length > 0),
		...sheetTests,
		...browsers,
		...servers,
		...services,
		...globals,
		...journeys,
		...sources,
		...bins,
		...applications,
		...distributions,
		...integrations,
	]
}

/**
 * Compiles the generated workspace's guide index.
 *
 * @param blueprint - The workspace specification.
 * @returns One birth-owned guide index carrying the concept and directory views.
 *
 * @example
 * ```ts
 * import { blueprintToGuideArtifacts, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToGuideArtifacts(blueprint)[0]?.path // 'guides/README.md'
 * ```
 */
export function blueprintToGuideArtifacts(blueprint: Blueprint): readonly ContentArtifact[] {
	const guide = `guides/${blueprint.name}.md`
	const rows = [
		...[
			...blueprint.src,
			...blueprintToFaces(blueprint)
				.filter((extension) => extension.axes.includes('src'))
				.map((extension) => extension.name),
			...blueprintToSheets(blueprint),
			...(blueprint.themes ? ['styles/themes'] : []),
		].map((environment) => ({
			directory: `src/${environment}`,
			test: `tests/src/${environment}`,
		})),
		...(blueprint.bin ? [{ directory: 'src/bin', test: 'tests/src/bin' }] : []),
		...[
			...blueprint.app,
			...blueprintToFaces(blueprint)
				.filter((extension) => extension.axes.includes('app'))
				.map((extension) => extension.name),
		].map((environment) => ({
			directory: `app/${environment}`,
			test: `tests/app/${environment}`,
		})),
	]
	const source = rows.map(({ directory }) => `    - [\`${directory}\`](../${directory})`)
	const tests = rows.map(({ test }) => `    - [\`${test}\`](../${test})`)
	const directories = rows.map(
		({ directory, test }) =>
			`- [\`${directory}\`](../${directory})\n  - Guide: Not created. Create this file when the workspace has a public surface:\n    \`${guide}\`\n  - Tests: [\`${test}\`](../${test})`,
	)
	return [
		{
			path: 'guides/README.md',
			group: 'guides',
			ownership: 'birth',
			origin: 'template',
			content: fillTemplate(ARTIFACT_TEMPLATES.guides.readme, {
				source: source.join('\n'),
				tests:
					tests.join('\n') +
					(blueprint.showcase && blueprint.app.includes('browser')
						? '\n  - Showcase:\n' +
							[
								'browser',
								...blueprintToFaces(blueprint)
									.filter((extension) => extension.axes.includes('app'))
									.map((extension) => extension.name),
							]
								.map(
									(application) =>
										`    - [\`showcase/${application}.html\`](../showcase/${application}.html)`,
								)
								.join('\n')
						: ''),
				directories: directories.join('\n'),
				guide: blueprint.name,
			}),
		},
	]
}

/**
 * Compiles the generated workspace's root documentation.
 *
 * @param blueprint - The workspace specification.
 * @returns The birth-owned package front page and the content-owned `AGENTS.md`
 * pointer.
 *
 * @remarks
 * The front page is the workspace's own prose, so it is written once and left
 * alone from then on. The pointer is scaffold's, so it is content-owned and
 * restored whenever it drifts.
 *
 * The pointer is planned here rather than vendored because `stageHost` refuses two
 * vendored paths at one storage name, and `AGENTS.md` already stores the canon a
 * release ships. Planning it as this package's own content leaves the path with
 * one claimant. No `CLAUDE.md` is planned: a target holding one stops Claude Code
 * from reading `AGENTS.md`, so the path stays canon without a claimant, `audit`
 * reports a copy `foreign`, and `overwrite` deletes it.
 *
 * The pointer carries no varying span, so it is not filled: a workspace's name
 * never reaches the text, and the paths a reader follows are the same in every
 * target.
 *
 * @example
 * ```ts
 * import { blueprintToDocumentArtifacts, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToDocumentArtifacts(blueprint).map((artifact) => artifact.path) // ['README.md', 'AGENTS.md']
 * ```
 */
export function blueprintToDocumentArtifacts(blueprint: Blueprint): readonly ContentArtifact[] {
	const publishes =
		blueprint.src.length > 0 || blueprintToSheets(blueprint).length > 0 || blueprint.themes
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
		{
			path: 'AGENTS.md',
			group: 'docs',
			ownership: 'content',
			origin: 'template',
			content: ARTIFACT_TEMPLATES.docs.agents,
		},
	]
}

/**
 * Compiles the blueprint-dependent orchestration artifacts.
 *
 * @param blueprint - The workspace specification.
 * @returns A vendor inventory script when vendors are declared, otherwise none.
 *
 * @remarks
 * A vendor name does not describe startup, readiness, or cleanup. The script
 * therefore records only the declared inventory and does not invent a service
 * runner or test project.
 *
 * @example
 * ```ts
 * import { blueprintToOrchestrationArtifacts, createBlueprint } from '@orkestrel/scaffold'
 *
 * const plain = createBlueprint('router', { src: ['core'] })
 * const served = createBlueprint('router', { src: ['core'], vendors: ['ollama'] })
 *
 * blueprintToOrchestrationArtifacts(plain) // []
 * blueprintToOrchestrationArtifacts(served)[0]?.path // 'scripts/service.sh'
 * ```
 */
export function blueprintToOrchestrationArtifacts(
	blueprint: Blueprint,
): readonly ContentArtifact[] {
	if (blueprint.vendors.length === 0) return []
	const vendors = blueprint.vendors
		.map((vendor, index) => `\t'${vendor}'${index === blueprint.vendors.length - 1 ? '' : ' \\'}`)
		.join('\n')
	return [
		{
			path: SERVICE_SCRIPT_PATH,
			group: 'orchestration',
			ownership: 'birth',
			origin: 'template',
			content: fillTemplate(ARTIFACT_TEMPLATES.orchestration.service, { vendors }),
		},
	]
}

/**
 * Compiles the vendored host artifacts a workspace plans.
 *
 * @param blueprint - The workspace specification.
 * @returns One artifact per selected vendored path in `HOST_PATHS` order, then
 * the seed guide mirrors and the catalog file.
 *
 * @remarks
 * Every artifact is claimed by presence, which is the strongest claim a pure
 * compile can make: core cannot read the vendored data root, so it cannot carry
 * the bytes a content claim would have to be checked against. Reading that root
 * is what promotes the ones scaffold owns the bytes of.
 *
 * `source` is left absent because it falls back to `path`, and every vendored
 * path is stored under the name it is written to. The group comes from
 * {@link inferArtifactGroup}, so a vendored path and a foreign path found in a target
 * are classified by one rule and a plan never disagrees with the audit beside
 * it.
 *
 * {@link CATALOG_AGENT_PATH} is appended rather than listed, and it is the canon
 * path this compiler claims. The catalog verb refuses a target that lacks the
 * file, so the plan has to carry it; repair restores its absence from the
 * staged bytes; and the `.claude/agents` directory in `CANON_PATHS` is what
 * stages those bytes, so listing the file in `HOST_PATHS` as well would claim one
 * storage name twice and refuse the stage. The rest of the canon a target reads
 * from the installed package, at the locations the `AGENTS.md` pointer
 * {@link blueprintToDocumentArtifacts} emits names.
 *
 * The {@link SEED_GUIDE_PATHS} mirrors are claimed explicitly
 * from `REFERENCE_PATHS`. The target's own guide is excluded by
 * {@link selectHostPaths}; the remaining reference guides grant no target claim.
 *
 * The skill pointer set follows, for each name in {@link TARGET_SKILL_NAMES}:
 * the `.claude/skills/<name>/SKILL.md` bridge and the
 * `.agents/skills/<name>/agents/openai.yaml` sidecar as copies, then the
 * `.agents/skills/<name>/SKILL.md` pointer with `pointer` set, whose bytes
 * hydration derives from the canonical skill. A blueprint with `skills` set
 * ships its own skill canon, so it plans no pointer set.
 *
 * @example
 * ```ts
 * import { blueprintToHostArtifacts, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router')
 *
 * blueprintToHostArtifacts(blueprint).some((artifact) => artifact.path === 'tests/guides.test.ts') // false
 * blueprintToHostArtifacts(blueprint).some((artifact) => artifact.path === 'guides/router.md') // false
 * blueprintToHostArtifacts(blueprint).find((artifact) => artifact.path === '.agents/skills/orkestrel-harden/SKILL.md')?.pointer // true
 * ```
 */
export function blueprintToHostArtifacts(blueprint: Blueprint): readonly Artifact[] {
	const selected = selectHostPaths([...HOST_PATHS, ...SEED_GUIDE_PATHS], blueprint.name)
	const vendored = [...selected, CATALOG_AGENT_PATH].map((path): Artifact => ({
		path,
		group: inferArtifactGroup(path),
		ownership: 'presence',
		origin: 'host',
	}))
	if (blueprint.skills) return vendored
	const skills = TARGET_SKILL_NAMES.flatMap((name): readonly Artifact[] => {
		const bridge = `.claude/skills/${name}/SKILL.md`
		const sidecar = `.agents/skills/${name}/agents/openai.yaml`
		const pointer = `.agents/skills/${name}/SKILL.md`
		return [
			{ path: bridge, group: inferArtifactGroup(bridge), ownership: 'presence', origin: 'host' },
			{ path: sidecar, group: inferArtifactGroup(sidecar), ownership: 'presence', origin: 'host' },
			{
				path: pointer,
				group: inferArtifactGroup(pointer),
				ownership: 'presence',
				origin: 'host',
				pointer: true,
			},
		]
	})
	return [...vendored, ...skills]
}

/**
 * Replaces the content of every drafted artifact an override names.
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
 * import { applyOverrides, blueprintToConfigArtifacts, createBlueprint } from '@orkestrel/scaffold'
 *
 * const artifacts = blueprintToConfigArtifacts(createBlueprint('router', { src: ['core'] }))
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
 * Replaces the runtime and development dependency ranges in package manifest text, and never a
 * peer range.
 *
 * @param manifest - The manifest text to compile.
 * @param pins - The runtime and development names and replacement ranges.
 * @returns The manifest with every matching writable value replaced, or
 * `undefined` when a name has no quoted declaration in its named section.
 *
 * @remarks
 * The compiler replaces values in place instead of serializing the manifest,
 * so description, keywords, scripts, key order, indentation, and every byte
 * outside the named ranges survive. Runtime pins apply only to `dependencies`,
 * and development pins apply only to `devDependencies`. The compiler never
 * reads or writes `peerDependencies` or `peerDependenciesMeta`. An override or
 * resolution with the same name stays untouched.
 *
 * @example
 * ```ts
 * import { replaceManifestRanges } from '@orkestrel/scaffold'
 *
 * const manifest = '{"devDependencies":{"typescript":"^6"}}\n'
 * replaceManifestRanges(manifest, {
 *   runtime: [],
 *   development: [{ name: 'typescript', range: '^7' }],
 * })
 * // the manifest with the declared range replaced
 * ```
 */
export function replaceManifestRanges(
	manifest: string,
	pins: DependencyPinSet,
): string | undefined {
	if (pins.runtime.length === 0 && pins.development.length === 0) return manifest
	const tokens = scanManifestTokens(manifest)
	if (tokens === undefined) return undefined
	const sectionNames = new Set(['dependencies', 'devDependencies'])
	// A section is the object a top-level `dependencies` or `devDependencies` key holds.
	const sections = tokens.flatMap((token, at) => {
		if (token.depth !== 1 || token.value === undefined) return []
		if (manifest.charAt(token.value) !== '{') return []
		const key: unknown = parseJSON(token.text)
		if (!isString(key) || !sectionNames.has(key)) return []
		const close = tokens.slice(at + 1).find((next) => next.text === '}' && next.depth === 1)
		return close === undefined ? [] : [{ name: key, start: token.value, end: close.index + 1 }]
	})
	// Each section reads its own entries in text order. The guard on the log's last edit skips the
	// literal the previous edit replaced, which only text that is not JSON can present as a key. A
	// value with no literal after it refuses the whole write.
	const readings = sections.map((bounds) => {
		const replacements = new Map(
			(bounds.name === 'dependencies' ? pins.runtime : pins.development).map(({ name, range }) => [
				name,
				range,
			]),
		)
		return {
			name: bounds.name,
			log: tokens.reduce<
				ReadonlyArray<{ readonly name: string; readonly edit: ManifestEdit }> | undefined
			>((log, token, at) => {
				if (log === undefined) return undefined
				if (token.index < bounds.start || token.index >= bounds.end) return log
				if (log.at(-1)?.edit.start === token.index) return log
				if (token.depth !== 2 || token.value === undefined) return log
				const key: unknown = parseJSON(token.text)
				if (!isString(key) || manifest.charAt(token.value) !== '"') return log
				const replacement = replacements.get(key)
				if (replacement === undefined) return log
				const literal = tokens[at + 1]
				if (literal === undefined) return undefined
				return [
					...log,
					{
						name: key,
						edit: {
							start: literal.index,
							end: literal.index + literal.text.length,
							text: JSON.stringify(replacement),
						},
					},
				]
			}, []),
		}
	})
	const settled = readings.flatMap(({ name, log }) => (log === undefined ? [] : [{ name, log }]))
	if (settled.length < readings.length) return undefined
	const compiled = settled
		.flatMap(({ log }) => log.map(({ edit }) => edit))
		.sort((left, right) => right.start - left.start)
		.reduce((text, edit) => text.slice(0, edit.start) + edit.text + text.slice(edit.end), manifest)
	const declaredRuntime = pins.runtime.every(({ name }) =>
		settled.some(
			(section) =>
				section.name === 'dependencies' && section.log.some((entry) => entry.name === name),
		),
	)
	const declaredDevelopment = pins.development.every(({ name }) =>
		settled.some(
			(section) =>
				section.name === 'devDependencies' && section.log.some((entry) => entry.name === name),
		),
	)
	return declaredRuntime && declaredDevelopment ? compiled : undefined
}

/**
 * Inserts dependencies a package manifest does not declare into the section each one names.
 *
 * @param manifest - The manifest text to compile.
 * @param additions - The runtime and development names and ranges to declare.
 * @returns The manifest declaring every addition, or `undefined` when the text is not a
 * manifest, an addition's section is not an object or holds a value that is not a range, a name
 * is repeated, or `dependencies` or `devDependencies` already declares a name.
 *
 * @remarks
 * Runtime additions enter `dependencies` and development additions enter `devDependencies`. The
 * compiler inserts text instead of serializing the manifest, so every declared byte survives.
 * Each addition lands before the first declared key that sorts after it, or after the last
 * declared key when none does, so a section kept in key order stays in key order. An addition
 * copies the indentation of the section's first entry; an empty section takes its entries one
 * level inside the indentation of its opening line. An absent section is created as one
 * top-level key holding its additions: `devDependencies` after `dependencies`, `dependencies`
 * before `devDependencies`, and either one last in the manifest object when its sibling is
 * absent. The created key copies the indentation of the manifest's first key, and its entries sit
 * one level further in. A name either writable section already declares is the caller's mistake
 * rather than an addition, so the compiler refuses it instead of declaring a package twice.
 *
 * @example
 * ```ts
 * import { insertManifestDependencies } from '@orkestrel/scaffold'
 *
 * insertManifestDependencies('{\n\t"devDependencies": {\n\t\t"vite": "^8.3.2"\n\t}\n}\n', {
 *   runtime: [],
 *   development: [{ name: 'typescript', range: '^6.0.3' }],
 * })
 * // '{\n\t"devDependencies": {\n\t\t"typescript": "^6.0.3",\n\t\t"vite": "^8.3.2"\n\t}\n}\n'
 * ```
 */
export function insertManifestDependencies(
	manifest: string,
	additions: DependencyPinSet,
): string | undefined {
	const requested = [...additions.runtime, ...additions.development]
	if (requested.length === 0) return manifest
	const parsed = parseJSON(manifest)
	if (!isRecord(parsed)) return undefined
	const declared = new Set(
		['dependencies', 'devDependencies'].flatMap((section) => {
			const entries = parsed[section]
			return isRecord(entries) ? Object.keys(entries) : []
		}),
	)
	const names = new Set(requested.map(({ name }) => name))
	if (names.size !== requested.length || [...names].some((name) => declared.has(name))) {
		return undefined
	}
	const sections: ReadonlyArray<{
		readonly name: 'dependencies' | 'devDependencies'
		readonly dependencies: readonly Dependency[]
	}> = [
		{ name: 'dependencies', dependencies: additions.runtime },
		{ name: 'devDependencies', dependencies: additions.development },
	]
	const refused = sections.some(({ name, dependencies }) => {
		const entries = parsed[name]
		return (
			dependencies.length > 0 &&
			entries !== undefined &&
			(!isRecord(entries) || !Object.values(entries).every(isString))
		)
	})
	if (refused) return undefined
	return sections.reduce<string | undefined>(
		(compiled, section) =>
			compiled === undefined || section.dependencies.length === 0
				? compiled
				: insertManifestSection(
						compiled,
						section.name,
						section.dependencies,
						parsed[section.name] !== undefined,
					),
		manifest,
	)
}

/**
 * Inserts dependencies into one section of package manifest text.
 *
 * @param manifest - The manifest text to compile, already known to be a JSON object.
 * @param section - The section the additions enter: `dependencies` or `devDependencies`.
 * @param dependencies - The names and ranges to declare; the section declares none of them.
 * @param present - If `true`, the manifest declares the section as an object; if `false`, it declares none.
 * @returns The manifest declaring every addition in the section, or `undefined` when the section
 * cannot be located as an object the text declares.
 *
 * @remarks
 * The one step {@link insertManifestDependencies} repeats per section. Each addition lands before
 * the first declared key that sorts after it, or after the last declared key when none does, and
 * copies the indentation of the section's first entry. An empty section takes its entries one
 * level inside the indentation of its opening line, and an absent section is created as one
 * top-level key beside its sibling, or last in the manifest object when the sibling is absent too.
 *
 * @example
 * ```ts
 * import { insertManifestSection } from '@orkestrel/scaffold'
 *
 * insertManifestSection('{"dependencies":{}}', 'dependencies', [{ name: 'vite', range: '^8' }], true)
 * // '{"dependencies":{"vite": "^8"}}'
 * ```
 */
export function insertManifestSection(
	manifest: string,
	section: 'dependencies' | 'devDependencies',
	dependencies: readonly Dependency[],
	present: boolean,
): string | undefined {
	const tokens = scanManifestTokens(manifest)
	if (tokens === undefined) return undefined
	const ordered = [...dependencies].sort((left, right) => comparePrimitives(left.name, right.name))
	const lines = ordered.map(
		({ name, range }) => `${JSON.stringify(name)}: ${JSON.stringify(range)}`,
	)
	// Locate the braces of the section and of its sibling, the first top-level key,
	// and the manifest object's closing brace. Depth counts objects alone, exactly
	// as the range writer counts them, so a key nested inside another value never
	// reads as a top-level one.
	const sibling = section === 'dependencies' ? 'devDependencies' : 'dependencies'
	const occurrences = tokens.flatMap((token, at) => {
		if (token.depth !== 1 || token.value === undefined) return []
		const key: unknown = parseJSON(token.text)
		if (!isString(key) || (key !== section && key !== sibling)) return []
		const object = manifest.charAt(token.value) === '{'
		const close = object
			? tokens.slice(at + 1).find((next) => next.text === '}' && next.depth === 1)
			: undefined
		return [{ key, start: token.index, open: token.value, object, close: close?.index }]
	})
	// The first occurrence of `section` that is not an unclosed object decides it: a value that is
	// no object refuses the write, and a closed object locates it. The sibling is located by its
	// first closed object, and any other value of it is passed over.
	const decisive = occurrences.find(
		({ key, object, close }) => key === section && (!object || close !== undefined),
	)
	if (decisive !== undefined && !decisive.object) return undefined
	const closed = occurrences.flatMap(({ key, start, open, close }) =>
		close === undefined ? [] : [{ key, start, open, close }],
	)
	const bounds = closed.find(({ key }) => key === section)
	const neighbor = closed.find(({ key }) => key === sibling)
	const head = tokens.find((token) => token.depth === 1 && token.value !== undefined)?.index
	const root = tokens.find((token) => token.text === '}' && token.depth === 0)?.index
	if (bounds === undefined) {
		if (present || root === undefined) return undefined
		// An absent section becomes one top-level key: `devDependencies` after
		// `dependencies` and `dependencies` before `devDependencies`, otherwise last.
		// It copies the indentation of the manifest's first key, and lands on the
		// same line when that key shares a line with the opening brace.
		const lineBreak = head === undefined ? -1 : manifest.lastIndexOf('\n', head)
		const margin = lineBreak < 0 ? '' : manifest.slice(lineBreak + 1, head)
		const gap = lineBreak < 0 || /\S/u.test(margin) ? '' : `\n${margin}`
		const block = `${JSON.stringify(section)}: {${lines.map((line) => `${gap === '' ? '' : `${gap}${margin}`}${line}`).join(',')}${gap}}`
		const tail = manifest.slice(1, root).trimEnd().length
		const [position, insertion] =
			neighbor === undefined
				? [tail + 1, manifest.charAt(tail) === '{' ? block : `,${gap}${block}`]
				: section === 'devDependencies'
					? [neighbor.close + 1, `,${gap}${block}`]
					: [neighbor.start, `${block},${gap}`]
		return manifest.slice(0, position) + insertion + manifest.slice(position)
	}
	const { open, close } = bounds
	// Every value is a string, so the section's strings alternate key and value and
	// each entry runs from its key's opening quote to its value's closing quote.
	const literals = tokens.filter(
		(token) => token.index > open && token.index < close && token.text.startsWith('"'),
	)
	const keys = literals.filter((_, index) => index % 2 === 0)
	if (keys.some((literal) => !isString(parseJSON(literal.text)))) return undefined
	const declarations = keys.flatMap((literal, position) => {
		const name: unknown = parseJSON(literal.text)
		const value = literals[position * 2 + 1]
		return isString(name) && value !== undefined
			? [{ name, start: literal.index, end: value.index + value.text.length }]
			: []
	})
	const first = declarations[0]
	const last = declarations.at(-1)
	if (first === undefined || last === undefined) {
		const lineBreak = manifest.lastIndexOf('\n', open)
		const level =
			lineBreak < 0 ? '' : (/^\s*/u.exec(manifest.slice(lineBreak + 1, open))?.[0] ?? '')
		const separator = lineBreak < 0 ? '' : `\n${level}${level}`
		const suffix = lineBreak < 0 ? '' : `\n${level}`
		return `${manifest.slice(0, open + 1)}${lines.map((line) => `${separator}${line}`).join(',')}${suffix}${manifest.slice(close)}`
	}
	const newline = manifest.lastIndexOf('\n', first.start)
	const indent = newline < 0 ? '' : manifest.slice(newline + 1, first.start)
	const separator = newline < 0 || /\S/u.test(indent) ? '' : `\n${indent}`
	const placements = ordered.map((dependency, index) => {
		const line = lines[index] ?? ''
		const anchor = declarations.find(
			(declaration) => comparePrimitives(declaration.name, dependency.name) > 0,
		)
		return {
			position: anchor?.start ?? last.end,
			text: anchor === undefined ? `,${separator}${line}` : `${line},${separator}`,
		}
	})
	return [...Map.groupBy(placements, ({ position }) => position)]
		.map(([position, group]): [number, string] => [
			position,
			group.map(({ text }) => text).join(''),
		])
		.sort(([left], [right]) => right - left)
		.reduce(
			(text, [position, insertion]) => text.slice(0, position) + insertion + text.slice(position),
			manifest,
		)
}

/**
 * Replaces named script values in package manifest text.
 *
 * @param manifest - The manifest text to compile.
 * @param scripts - The scripts to write, each with the predecessors it accepts.
 * @returns The manifest carrying every absent or accepted named script and
 * retaining every differing string value, or `undefined` when a planned key
 * holds a non-string value or the text carries no readable `scripts` object to
 * write into.
 *
 * @remarks
 * The compiler replaces values in place instead of serializing the manifest, so
 * description, keywords, dependencies, key order, indentation, and every byte
 * outside the replaced ranges survive. A named script the manifest already
 * declares is overwritten only when its value is one of its
 * {@link ManifestScript.accepted} predecessors. The planned value stands. Any
 * other string is a chain the workspace author customized, so it stays
 * byte-identical while the other named scripts are written independently. A
 * named script the manifest does not declare is appended after the last
 * declared script of its own key family, copying that section's indentation:
 * `test:setup` follows the last declared `test:` key. A name carrying no colon
 * has no family, and so does a family the section declares no member of, and
 * each of those is appended after the last declared script instead. A region
 * declaring nothing takes every named script as its first entries, indented
 * from the line its own opening brace sits on.
 *
 * @example
 * ```ts
 * import { replaceManifestScripts } from '@orkestrel/scaffold'
 *
 * const manifest = '{\n\t"scripts": {\n\t\t"test": "vitest run"\n\t}\n}\n'
 * replaceManifestScripts(manifest, [
 *   { name: 'test', command: 'vitest run --no-cache', accepted: ['vitest run'] },
 * ])
 * // the manifest with the declared script replaced
 * ```
 */
export function replaceManifestScripts(
	manifest: string,
	scripts: readonly ManifestScript[],
): string | undefined {
	if (scripts.length === 0) return manifest
	const parsed: unknown = parseJSON(manifest)
	if (!isRecord(parsed) || !isRecord(parsed.scripts)) return undefined
	const declared = parsed.scripts
	// A non-string planned key makes the region structurally unsafe to edit, so
	// rule on that shape before locating any byte range. The iterator reads one script at a time,
	// stops at the first that refuses, and reads a hole as an `undefined` script, as a `for…of`
	// over the list would. It takes the list through its iterator protocol alone.
	if (
		Iterator.from(scripts).some(
			(script) => Object.hasOwn(declared, script.name) && !isString(declared[script.name]),
		)
	) {
		return undefined
	}
	const tokens = scanManifestTokens(manifest)
	if (tokens === undefined) return undefined
	// Locate the top-level scripts object. Depth counts objects alone, exactly as
	// the range writer counts them, so a key nested inside another object never
	// reads as a top-level one.
	const position = tokens.findIndex(
		(token, at) =>
			token.depth === 1 &&
			token.value !== undefined &&
			parseJSON(token.text) === 'scripts' &&
			manifest.charAt(token.value) === '{' &&
			tokens.slice(at + 1).some((next) => next.text === '}' && next.depth === 1),
	)
	const region = tokens[position]
	const close = tokens.slice(position + 1).find((token) => token.text === '}' && token.depth === 1)
	if (region?.value === undefined || close === undefined) return undefined
	const start = region.value
	const end = close.index + 1
	// Read the section's own entries for their byte ranges, and remember where the
	// first key sits: that column is the indentation an appended script copies.
	// Each string-valued entry also records where it ends, because that offset is
	// the anchor an appended sibling of the same key family inserts after. A string
	// value with no literal after it refuses the write.
	const entries = tokens.reduce<
		| ReadonlyArray<{
				readonly token: ManifestToken
				readonly value: number
				readonly literal: ManifestToken | undefined
		  }>
		| undefined
	>((log, token, at) => {
		if (log === undefined) return undefined
		if (token.index < start || token.index >= end) return log
		if (token.depth !== 2 || token.value === undefined) return log
		if (manifest.charAt(token.value) !== '"') {
			return [...log, { token, value: token.value, literal: undefined }]
		}
		const literal = tokens[at + 1]
		return literal === undefined ? undefined : [...log, { token, value: token.value, literal }]
	}, [])
	if (entries === undefined) return undefined
	const first = entries[0]?.token.index
	const keyed = entries.flatMap(({ token, value, literal }) =>
		literal === undefined
			? []
			: [{ key: parseJSON(token.text), value, stop: literal.index + literal.text.length }],
	)
	const anchors = keyed.flatMap(({ key, stop }) =>
		isString(key) ? [{ name: key, end: stop }] : [],
	)
	const matched = keyed.flatMap((entry) => {
		const script = scripts.find((candidate) => candidate.name === entry.key)
		return script === undefined ? [] : [{ script, value: entry.value, stop: entry.stop }]
	})
	const written = new Set(matched.map(({ script }) => script.name))
	const replaced = matched.flatMap(({ script, value, stop }): readonly ManifestEdit[] => {
		const current: unknown = declared[script.name]
		return current === script.command || !isString(current) || !script.accepted.includes(current)
			? []
			: [{ start: value, end: stop, text: JSON.stringify(script.command) }]
	})
	const missing = scripts.filter((script) => !written.has(script.name))
	// An empty region declares every named script absent, and an absent script is
	// always writable, so the region takes them as its first entries rather than
	// refusing the write. No sibling entry exists to copy a column from, so the
	// indentation comes from the region's own opening line: `scripts` is a
	// top-level key, so that line's leading whitespace is one level and an entry
	// inside the region sits at two. A manifest carrying no line break before the
	// region is written on one line, which is what the append path does with a
	// one-line region it finds already populated.
	const lineBreak = manifest.lastIndexOf('\n', start)
	const level = lineBreak < 0 ? '' : (/^\s*/u.exec(manifest.slice(lineBreak + 1, start))?.[0] ?? '')
	const emptySeparator = lineBreak < 0 ? '' : `\n${level}${level}`
	const emptySuffix = lineBreak < 0 ? '' : `\n${level}`
	// A qualified name joins the family its prefix names, landing after that
	// family's last declared member so a reader finds it among its siblings
	// rather than behind the lifecycle scripts that close the section. An
	// unqualified name has no family, and a family the section never declares
	// has no member to follow, so each takes the section's own end.
	const tail = start + manifest.slice(start, end - 1).trimEnd().length
	const newline = first === undefined ? -1 : manifest.lastIndexOf('\n', first)
	const indent = first === undefined || newline < 0 ? '' : manifest.slice(newline + 1, first)
	const separator = newline < 0 || /\S/u.test(indent) ? '' : `\n${indent}`
	const placements = missing.map((script) => {
		const colon = script.name.indexOf(':')
		const family = colon < 0 ? undefined : script.name.slice(0, colon + 1)
		const sibling =
			family === undefined ? undefined : anchors.findLast((entry) => entry.name.startsWith(family))
		return {
			anchor: sibling?.end ?? tail,
			text: `,${separator}${JSON.stringify(script.name)}: ${JSON.stringify(script.command)}`,
		}
	})
	const appended: readonly ManifestEdit[] =
		missing.length === 0
			? []
			: first === undefined
				? [
						{
							start: start + 1,
							end: end - 1,
							text: `${missing
								.map(
									(script) =>
										`${emptySeparator}${JSON.stringify(script.name)}: ${JSON.stringify(script.command)}`,
								)
								.join(',')}${emptySuffix}`,
						},
					]
				: [...Map.groupBy(placements, ({ anchor }) => anchor)].map(
						([anchor, group]): ManifestEdit => ({
							start: anchor,
							end: anchor,
							text: group.map(({ text }) => text).join(''),
						}),
					)
	return [...replaced, ...appended]
		.sort((left, right) => right.start - left.start)
		.reduce((text, edit) => text.slice(0, edit.start) + edit.text + text.slice(edit.end), manifest)
}

/**
 * Replaces dependency ranges in a plan's manifest and recomputes its identity.
 *
 * @param plan - The plan carrying the manifest artifact to compile.
 * @param pins - The runtime and development names and replacement ranges.
 * @returns A plan with replaced manifest ranges and a matching hash, or
 * `undefined` when the manifest or its identity cannot be compiled.
 *
 * @remarks
 * The blueprint remains the workspace specification that produced the plan.
 * Registry answers alter only the manifest artifact that materialization will
 * write. Recomputing the hash in the same compiler keeps the plan's identity
 * tied to those final bytes rather than to the unresolved floor.
 *
 * @example
 * ```ts
 * import { replacePlanRanges } from '@orkestrel/scaffold'
 *
 * replacePlanRanges(plan, pins) // the plan carrying the resolved writable ranges
 * ```
 */
export function replacePlanRanges(plan: Plan, pins: DependencyPinSet): Plan | undefined {
	const outcomes = plan.artifacts.map(
		(
			artifact,
		): { readonly artifact: Artifact; readonly manifest: boolean; readonly refused: boolean } => {
			if (artifact.path !== 'package.json' || artifact.origin === 'host') {
				return { artifact, manifest: false, refused: false }
			}
			const content = replaceManifestRanges(artifact.content, pins)
			return content === undefined
				? { artifact, manifest: true, refused: true }
				: { artifact: { ...artifact, content }, manifest: true, refused: false }
		},
	)
	if (
		!outcomes.some((outcome) => outcome.manifest) ||
		outcomes.some((outcome) => outcome.refused)
	) {
		return undefined
	}
	const artifacts = outcomes.map((outcome) => outcome.artifact)
	const compiled: Plan = { ...plan, artifacts }
	const hash = planToHash(compiled)
	return hash === undefined ? undefined : { ...compiled, hash }
}

/**
 * Computes a plan's content identity.
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
 * import { Compiler, createBlueprint, planToHash } from '@orkestrel/scaffold'
 *
 * const { plan } = new Compiler().compile(createBlueprint('router', { src: ['core'] }))
 *
 * plan === undefined ? undefined : planToHash(plan)?.length // 16
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
 * Compares a plan against a target's current content.
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
 * import { Compiler, createBlueprint, planToArtifactFindings } from '@orkestrel/scaffold'
 *
 * const { plan } = new Compiler().compile(createBlueprint('router', { src: ['core'] }))
 *
 * plan === undefined ? [] : planToArtifactFindings(plan, { 'AGENTS.md': '68690a' })
 * ```
 */
export function planToArtifactFindings(plan: Plan, current: Snapshot): readonly ArtifactFinding[] {
	// The iterator consumes one artifact at a time and reads a hole as an `undefined` artifact, as a
	// `for…of` over the list would. The path is read for the plan before the finding reads it.
	const listed = Iterator.from(plan.artifacts)
		.map((artifact) => ({
			path: artifact.path,
			finding: artifactToArtifactFinding(artifact, current[artifact.path]),
		}))
		.toArray()
	const planned = new Set(listed.map(({ path }) => path))
	return [
		...listed.map(({ finding }) => finding),
		...Object.entries(current).flatMap(([path, observed]): readonly ArtifactFinding[] => {
			if (planned.has(path)) return []
			const group = inferArtifactGroup(path)
			return plan.groups.includes(group) ? [{ path, group, drift: 'foreign', observed }] : []
		}),
	]
}

/**
 * Measures one declared package list against the name and range syntax it accepts.
 *
 * @param dependencies - The declared list.
 * @param field - The blueprint field the list came from, reported on each question.
 * @param name - The package-name syntax the field accepts.
 * @param range - The range syntax the field accepts.
 * @returns One blocking question per rejected name, repeated name, and rejected
 * range, in list order.
 *
 * @remarks
 * The declared lists and peer partitions differ only in the syntaxes they
 * accept, so the rules live here once and each caller supplies its own patterns.
 * A runtime dependency name reaches a path through its guide mirror and is
 * fixed to the `@orkestrel` scope. A foreign peer or development extra reaches
 * no path and admits any valid npm name.
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
	// The iterator consumes one entry at a time and reads a hole as an `undefined` entry, which the
	// name read refuses before a later entry is read.
	const listed = Iterator.from(dependencies)
		.map((dependency) => {
			const declared = dependency.name
			const valid = name.test(declared)
			const pinned = dependency.range
			return { declared, valid, pinned, accepted: range.test(pinned) }
		})
		.toArray()
	return listed.flatMap(({ declared, valid, pinned, accepted }, index): readonly Question[] => [
		...(!valid
			? [
					{
						field,
						message: `${declared} is not a package name ${field} accepts.`,
						blocking: true,
					},
				]
			: listed.findIndex((other) => other.declared === declared) < index
				? [
						{
							field,
							message: `${declared} is declared more than once on ${field}.`,
							blocking: true,
						},
					]
				: []),
		...(!accepted
			? [
					{
						field,
						message: `${declared} declares the range ${pinned}, which ${field} does not accept.`,
						blocking: true,
					},
				]
			: []),
	])
}

/**
 * Measures a blueprint against every law its own fields decide.
 *
 * @param blueprint - The workspace specification.
 * @returns One question per rejected field, in blueprint field order, with the
 * rules that span several fields last.
 *
 * @remarks
 * Only the laws a blueprint answers alone are here. The structural record and
 * its bounds are already settled by `isBlueprint`, which refuses a value that is
 * not a blueprint at all; what remains is the syntax of a name, a version, a
 * range, and an engines floor, the combinations the environment axes admit,
 * and the overlaps between the declared package lists. The laws that need
 * a drafted plan belong to {@link artifactsToQuestions} and
 * {@link overridesToQuestions}.
 *
 * A question blocks when it describes a workspace this package cannot generate.
 * These do not, because each describes a workspace it can describe honestly but
 * will not create: a published axis of several environments without core,
 * whose manifest names a core build the workspace never runs; a showcase flag
 * or journey flag whose required browser axis is absent, which emits nothing; an unplaced browser
 * extension or a styles extension without the styles surface; and an
 * integration flag over fewer than two environments, whose seed does emit and
 * has nothing to compose across. Blocking any of them closed the gate for every
 * verb. The verbs that read an existing workspace need the plan the gate
 * refused. The caller that chooses the shape refuses the advisory; the callers
 * that read one report it.
 *
 * The integration advisory counts both axes together, because the proof it
 * seeds spans environments rather than published ones: an application of two
 * environments composes, and a package publishing one does not. Reading either
 * axis alone withdrew the proof from a workspace that does compose.
 *
 * An environment question carries `ENVIRONMENTS` as its candidates, so a caller
 * reads the accepted values from the question instead of from the documentation.
 *
 * @example
 * ```ts
 * import { blueprintToQuestions, createBlueprint } from '@orkestrel/scaffold'
 *
 * const blueprint = createBlueprint('router', { src: ['core'] })
 *
 * blueprintToQuestions(blueprint).length === 0 // true
 * ```
 */
export function blueprintToQuestions(blueprint: Blueprint): readonly Question[] {
	// Each list is read where the following sections reach it, one entry at a time and once per pass, and
	// The iterator reads a hole in a list as an `undefined` entry, as a `for…of` over it would.
	const own = `@orkestrel/${blueprint.name}`
	return [
		...(!NAME_PATTERN.test(blueprint.name)
			? [
					{
						field: 'name',
						message: `${blueprint.name} is not a lowercase alphanumeric name starting with a letter.`,
						blocking: true,
					},
				]
			: []),
		...(!VERSION_PATTERN.test(blueprint.version)
			? [
					{
						field: 'version',
						message: `${blueprint.version} is not an exact three-component version.`,
						blocking: true,
					},
				]
			: []),
		...(!matchesEngines(blueprint.engines)
			? [
					{
						field: 'engines',
						message: `${blueprint.engines} is not a supported minimum-Node floor.`,
						blocking: true,
					},
				]
			: []),
		...(blueprint.src.length === 0 &&
		blueprint.app.length === 0 &&
		blueprintToSheets(blueprint).length === 0 &&
		!blueprint.themes
			? [
					{
						field: 'src',
						message: 'A workspace declares at least one environment on src or app.',
						blocking: true,
						candidates: ENVIRONMENTS,
					},
				]
			: []),
		...(blueprint.src.length > 1 && !blueprint.src.includes('core')
			? [
					{
						field: 'src',
						message:
							'Several published environments put core at the package root, so this manifest names a core build the workspace never runs. Declare core on src, or publish one environment.',
						blocking: false,
						candidates: ENVIRONMENTS,
					},
				]
			: []),
		...ENVIRONMENTS.flatMap((environment) => [
			...(blueprint.src.filter((declared) => declared === environment).length > 1
				? [
						{
							field: 'src',
							message: `src declares ${environment} more than once.`,
							blocking: true,
							candidates: ENVIRONMENTS,
						},
					]
				: []),
			...(blueprint.app.filter((declared) => declared === environment).length > 1
				? [
						{
							field: 'app',
							message: `app declares ${environment} more than once.`,
							blocking: true,
							candidates: ENVIRONMENTS,
						},
					]
				: []),
		]),
		// An extension's own questions are read with the extension, and the repeat of an earlier
		// selection is judged after every extension has been read.
		...Iterator.from(blueprint.extensions)
			.map((extension) => {
				const selection = `${extension.surface}:${extension.name}`
				return {
					selection,
					questions:
						extension.surface === 'browser'
							? [
									...(extension.axes.length === 0
										? [
												{
													field: 'extensions',
													message: `${selection} occupies no axis.`,
													blocking: false,
												},
											]
										: []),
									...Iterator.from(extension.axes)
										.flatMap((axis) =>
											blueprint[axis].includes('browser')
												? []
												: [
														{
															field: 'extensions',
															message: `${selection} occupies ${axis}, whose selection lacks browser.`,
															blocking: false,
														},
													],
										)
										.toArray(),
								]
							: !blueprint.styles
								? [
										{
											field: 'extensions',
											message: `${selection} extends a styles surface this workspace does not declare.`,
											blocking: false,
										},
									]
								: [],
				}
			})
			.toArray()
			.flatMap(({ selection, questions }, index, selected): readonly Question[] => [
				...(selected.findIndex((other) => other.selection === selection) < index
					? [
							{
								field: 'extensions',
								message: `${selection} is declared more than once on extensions.`,
								blocking: true,
							},
						]
					: []),
				...questions,
			]),
		...(blueprint.integration && blueprint.src.length + blueprint.app.length < 2
			? [
					{
						field: 'integration',
						message:
							'integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.',
						blocking: false,
					},
				]
			: []),
		...Iterator.from(blueprint.vendors)
			.map((vendor) => ({
				vendor,
				valid: NAME_PATTERN.test(vendor),
			}))
			.toArray()
			.flatMap(({ vendor, valid }, index, declared): readonly Question[] =>
				!valid
					? [
							{
								field: 'vendors',
								message: `${vendor} is not a lowercase alphanumeric vendor name starting with a letter.`,
								blocking: true,
							},
						]
					: declared.findIndex((other) => other.vendor === vendor) < index
						? [
								{
									field: 'vendors',
									message: `${vendor} is declared more than once on vendors.`,
									blocking: true,
								},
							]
						: [],
			),
		...(blueprint.showcase && !blueprint.app.includes('browser')
			? [
					{
						field: 'showcase',
						message:
							'showcase projects a browser app, and this workspace declares none, so it emits nothing.',
						blocking: false,
					},
				]
			: []),
		...(blueprint.journey && !blueprint.app.includes('browser')
			? [
					{
						field: 'journey',
						message:
							'journey projects a browser app, and this workspace declares none, so it emits nothing.',
						blocking: false,
					},
				]
			: []),
		...dependenciesToQuestions(
			blueprint.dependencies,
			'dependencies',
			DEPENDENCY_NAME_PATTERN,
			ORKESTREL_RANGE_PATTERN,
		),
		...dependenciesToQuestions(
			blueprint.peers.filter((peer) => peer.name.startsWith('@orkestrel/')),
			'peers',
			DEPENDENCY_NAME_PATTERN,
			ORKESTREL_RANGE_PATTERN,
		),
		...dependenciesToQuestions(
			blueprint.peers.filter((peer) => !peer.name.startsWith('@orkestrel/')),
			'peers',
			FOREIGN_NAME_PATTERN,
			FLOOR_RANGE_PATTERN,
		),
		...dependenciesToQuestions(
			blueprint.extras,
			'extras',
			FOREIGN_NAME_PATTERN,
			EXTRA_RANGE_PATTERN,
		),
		// The three lists are read in field order, and the field that first declared a name is the
		// field of the first entry that carries it.
		...(
			[
				['dependencies', blueprint.dependencies],
				['peers', blueprint.peers],
				['extras', blueprint.extras],
			] as const
		)
			.flatMap(([field, list]) =>
				Iterator.from(list)
					.map((dependency) => ({ field, name: dependency.name }))
					.toArray(),
			)
			.flatMap(({ field, name }, _, declared): readonly Question[] => {
				const first = declared.find((other) => other.name === name)?.field
				return [
					...(name === own || name === blueprint.name
						? [
								{
									field,
									message: `${name} is the workspace itself.`,
									blocking: true,
								},
							]
						: []),
					...(first !== undefined && first !== field
						? [
								{
									field,
									message: `${name} is declared on both ${first} and ${field}.`,
									blocking: true,
								},
							]
						: []),
				]
			}),
		...Iterator.from(blueprint.extras)
			.flatMap((extra) =>
				Object.hasOwn(BASE_DEV_DEPENDENCIES, extra.name)
					? [
							{
								field: 'extras',
								message: `${extra.name} is pinned by the shared toolchain, which every workspace carries at one version.`,
								blocking: true,
							},
						]
					: [],
			)
			.toArray(),
	]
}

/**
 * Measures a drafted artifact list against the laws a whole plan decides.
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
 * import { artifactsToQuestions, blueprintToConfigArtifacts, createBlueprint } from '@orkestrel/scaffold'
 *
 * const artifacts = blueprintToConfigArtifacts(createBlueprint('router', { src: ['core'] }))
 *
 * artifactsToQuestions(artifacts).length === 0 // true
 * ```
 */
export function artifactsToQuestions(artifacts: readonly Artifact[]): readonly Question[] {
	// The iterator consumes one artifact at a time and reads a hole as an `undefined` artifact, as a
	// `for…of` over the list would.
	const listed = Iterator.from(artifacts)
		.map((artifact) => ({
			path: artifact.path,
			bytes:
				artifact.origin === 'host'
					? artifact.hex === undefined
						? 0
						: artifact.hex.length / 2
					: computeBytes(artifact.content),
		}))
		.toArray()
	const total = computeTotal(listed.map(({ bytes }) => bytes))
	return [
		...listed.flatMap(({ path, bytes }, index): readonly Question[] => [
			...(listed.findIndex((other) => other.path === path) < index
				? [
						{
							field: 'artifacts',
							message: `Two artifacts claim ${path}.`,
							blocking: true,
						},
					]
				: []),
			...(bytes > MAX_ARTIFACT_BYTES
				? [
						{
							field: 'artifacts',
							message: `${path} carries ${bytes} bytes, above the ${MAX_ARTIFACT_BYTES} one artifact admits.`,
							blocking: true,
						},
					]
				: []),
		]),
		...(artifacts.length > MAX_COLLECTION_ITEMS
			? [
					{
						field: 'artifacts',
						message: `A plan of ${artifacts.length} artifacts is above the ${MAX_COLLECTION_ITEMS} one collection admits.`,
						blocking: true,
					},
				]
			: []),
		...(total > MAX_TOTAL_ARTIFACT_BYTES
			? [
					{
						field: 'artifacts',
						message: `A plan of ${total} bytes is above the ${MAX_TOTAL_ARTIFACT_BYTES} one plan retains.`,
						blocking: true,
					},
				]
			: []),
	]
}

/**
 * Measures a blueprint's overrides against the artifacts drafted for it.
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
 * import { blueprintToConfigArtifacts, createBlueprint, overridesToQuestions } from '@orkestrel/scaffold'
 *
 * const artifacts = blueprintToConfigArtifacts(createBlueprint('router', { src: ['core'] }))
 *
 * overridesToQuestions([{ path: 'package.json', content: '{}\n' }], artifacts).length // 1
 * ```
 */
export function overridesToQuestions(
	overrides: readonly Override[],
	artifacts: readonly Artifact[],
): readonly Question[] {
	// The first artifact planned at a path is the one an override addresses, so the pairs are
	// reversed for a `Map` to keep it. The iterators consume one artifact and then one override at a
	// time, and reads a hole as an `undefined` entry, as a `for…of` over the list would.
	const planned = new Map(
		Iterator.from(artifacts)
			.map((artifact): readonly [string, Artifact] => [artifact.path, artifact])
			.toArray()
			.reverse(),
	)
	const listed = Iterator.from(overrides)
		.map((override) => override.path)
		.toArray()
	return listed.flatMap((path, index): readonly Question[] => {
		const artifact = planned.get(path)
		return [
			...(listed.indexOf(path) < index
				? [
						{
							field: 'overrides',
							message: `${path} is overridden more than once.`,
							blocking: true,
						},
					]
				: []),
			...(artifact === undefined
				? [
						{
							field: 'overrides',
							message: `${path} is not a path this plan carries.`,
							blocking: true,
						},
					]
				: artifact.origin === 'host'
					? [
							{
								field: 'overrides',
								message: `${path} is byte-copied from the vendored data root.`,
								blocking: true,
							},
						]
					: artifact.group === 'manifest'
						? [
								{
									field: 'overrides',
									message: `${path} is the manifest, which the blueprint's own fields decide.`,
									blocking: true,
								},
							]
						: []),
		]
	})
}
