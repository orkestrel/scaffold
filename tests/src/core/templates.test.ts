import type { Blueprint, Environment } from '@src/core'
import type { ScratchInterface } from '@orkestrel/test/server'
import { execFileSync } from 'node:child_process'
import { chmodSync, mkdirSync, readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { isRecord, isString } from '@orkestrel/contract'
import { requireValue } from '@orkestrel/test'
import { createScratch } from '@orkestrel/test/server'
import { fillTemplate, isTemplateError } from '@orkestrel/template'
import { build, loadConfigFromFile } from 'vite'
import {
	ARTIFACT_TEMPLATES,
	blueprintToConfigArtifacts,
	blueprintToDevDependencies,
	blueprintToManifest,
	blueprintToSourceArtifacts,
	blueprintToTestArtifacts,
	CONFIG_TEMPLATES,
	createBlueprint,
	Compiler,
	MAX_NAME_LENGTH,
	PRINT_WIDTH,
	TAB_WIDTH,
} from '@src/core'
import { BROWSER_RESOLVER_EXPORTS } from '../../setup.js'
import { describe, expect, it } from 'vitest'

// The vendored `.oxfmtrc.json` a generated workspace receives: a tab prints as
// `TAB_WIDTH` columns and a line is printed to fit `PRINT_WIDTH` of them. The
// emitted text conforms to those bytes, never the reverse, so every width here is
// measured against the same constants the emitters measure against, which
// `tests/src/core/helpers.test.ts` asserts against the vendored file itself.
const TAB_COLUMNS = ' '.repeat(TAB_WIDTH)
// The specifiers the vendored `import/no-unassigned-import` rule exempts.
const STYLE_IMPORT = /^import\s+'[^']+\.(?:css|less|sass|scss|styl|stylus|pcss|postcss|sss)'/u
// These are the specifiers an emitted browser configuration names that this
// repository does not install, because scaffold generates a Vue application
// without being one. Declaring their Vite-facing shapes lets the typecheck reach
// the emitted configuration itself; the controls below prove a clean run cannot
// be a typecheck that resolved nothing.
const BROWSER_PLUGIN_DECLARATIONS = `declare module '@vitejs/plugin-vue' {
	import type { PluginOption } from 'vite'
	const plugin: (...options: never[]) => PluginOption
	export default plugin
}

declare module 'vite-plugin-singlefile' {
	import type { PluginOption } from 'vite'
	export function viteSingleFile(options?: unknown): PluginOption
}
`
const SELECTIONS: ReadonlyArray<readonly Environment[]> = [
	[],
	['core'],
	['browser'],
	['server'],
	['core', 'browser'],
	['core', 'server'],
	['browser', 'server'],
	['core', 'browser', 'server'],
]
// The population the sweeps below walk, stated as the relation it actually
// is: one entry per (blueprint, module path) pair the selection matrix emits,
// projected onto the path as the number of blueprints that emit it. The
// union of those paths is a weaker claim and does not stand in for this one. One
// maximal blueprint emits every path `MODULE_EMITTERS` names by itself, so under a
// union assertion every blueprint but that one could emit nothing and nothing
// would move; the counts move for any selection that stops emitting anything.
// The control beside the first sweep runs that exact narrowing.
const MODULE_EMITTERS: Readonly<Record<string, number>> = Object.freeze({
	'app/browser/index.ts': 64,
	'app/browser/main.ts': 64,
	'app/core/index.ts': 64,
	'app/server/index.ts': 64,
	'app/server/main.ts': 64,
	'configs/app/vite.browser.config.ts': 64,
	'configs/app/vite.server.config.ts': 64,
	'configs/app/vite.showcase.config.ts': 32,
	'configs/browsers.ts': 96,
	'configs/src/vite.bin.config.ts': 63,
	'configs/src/vite.browser.config.ts': 64,
	'configs/src/vite.core.config.ts': 64,
	'configs/src/vite.server.config.ts': 64,
	'src/bin/main.ts': 63,
	'src/browser/index.ts': 64,
	'src/core/index.ts': 64,
	'src/server/index.ts': 64,
	'tests/app/browser/index.test.ts': 64,
	'tests/app/core/index.test.ts': 64,
	'tests/app/server/index.test.ts': 64,
	'tests/distribution.test.ts': 112,
	'tests/integration.test.ts': 63,
	'tests/setup.ts': 126,
	'tests/setupBrowser.ts': 96,
	'tests/setupGlobal.ts': 63,
	'tests/setupServer.ts': 111,
	'tests/src/bin/main.test.ts': 63,
	'tests/src/browser/index.test.ts': 64,
	'tests/src/core/index.test.ts': 64,
	'tests/src/server/index.test.ts': 64,
	'vite.config.ts': 126,
})

// The packages installed into the staged externalization workspace, each
// exporting one token the emitted bundle either keeps as an import or inlines.
// Only `sample-peer` is declared as a peer, so `sample-plain` is the control.
const PEER_FIXTURE_PACKAGES: ReadonlyArray<readonly [name: string, token: string]> = Object.freeze([
	['sample-peer', 'PEER_TOKEN'],
	['sample-plain', 'PLAIN_TOKEN'],
])
// Each published face the externalization workspace builds, named by the root
// factory that configures it and by the environment whose entry and bundle it
// owns.
const PUBLISHED_FACES: ReadonlyArray<readonly [factory: string, environment: string]> =
	Object.freeze([
		['srcBrowser', 'browser'],
		['srcServer', 'server'],
	])

// Every selection the compiler accepts, in both structural states it branches on.
// A shape is emitted for each non-empty `src` x `app` pair drawn from `SELECTIONS`
// twice: once with no structural fact set, and once with every one of them set, so
// no conditional span is measured in one state alone.
function buildSelections(): readonly Blueprint[] {
	const blueprints: Blueprint[] = []
	for (const src of SELECTIONS) {
		for (const app of SELECTIONS) {
			if (src.length === 0 && app.length === 0) continue
			blueprints.push(createBlueprint('sample', { src, app }))
			blueprints.push(
				createBlueprint('sample', {
					src,
					app,
					bin: true,
					integration: true,
					global: true,
					showcase: true,
				}),
			)
		}
	}
	return blueprints
}

// Every TypeScript module `scaffold new` writes for a selection: the root config,
// each scoped config wrapper, each barrel and runtime entry, and each test module.
function buildModules(blueprint: Blueprint): ReadonlyMap<string, string> {
	const modules = new Map<string, string>()
	for (const artifact of [
		...blueprintToConfigArtifacts(blueprint),
		...blueprintToSourceArtifacts(blueprint),
		...blueprintToTestArtifacts(blueprint),
	]) {
		if (artifact.origin === 'host' || !artifact.path.endsWith('.ts')) continue
		modules.set(artifact.path, artifact.content)
	}
	return modules
}

// The emitter relation over one corpus, for a walk that reads nothing else. Each
// sweep counts its own pairs while it reads content, so this is the shape both
// halves compare in rather than a second way of deriving it.
function countEmitters(blueprints: readonly Blueprint[]): Readonly<Record<string, number>> {
	const counts = new Map<string, number>()
	for (const blueprint of blueprints) {
		for (const path of buildModules(blueprint).keys()) counts.set(path, (counts.get(path) ?? 0) + 1)
	}
	return Object.fromEntries(counts)
}

function measureWidth(line: string): number {
	return line.replaceAll('\t', TAB_COLUMNS).length
}

// The persistent directory every scratch allocation below lands inside, created
// once per test because `createScratch` throws when its `parent` is missing.
function ensureTmpRoot(): string {
	mkdirSync(resolve('tmp'), { recursive: true })
	return resolve('tmp')
}

// The emitted root configuration and the files a typecheck of it has to resolve:
// the emitted browser resolver a browser selection also writes, the vendored
// boundary helpers, copied from this checkout because a generated workspace
// receives those exact bytes, and the plugin declaration above. Everything else
// the configuration names is installed here.
function stageRootConfig(blueprint: Blueprint, workspace: ScratchInterface, prefix: string): void {
	for (const artifact of blueprintToConfigArtifacts(blueprint)) {
		if (artifact.origin === 'host') continue
		if (
			artifact.path !== 'vite.config.ts' &&
			artifact.path !== 'tsconfig.json' &&
			artifact.path !== 'configs/browsers.ts'
		) {
			continue
		}
		workspace.write(`${prefix}/${artifact.path}`, artifact.content)
	}
	workspace.write(
		`${prefix}/configs/helpers.ts`,
		readFileSync(resolve('configs/helpers.ts'), 'utf8'),
	)
	workspace.write(`${prefix}/package.json`, blueprintToManifest(blueprint))
	workspace.write(`${prefix}/plugins.d.ts`, BROWSER_PLUGIN_DECLARATIONS)
}

// The `check` script a generated workspace vendors, run over one staged
// directory. `tsc` reports through its exit code, so its diagnostics are returned
// either way and the caller reads the text rather than a thrown process error.
function checkTypes(root: string): string {
	try {
		execFileSync(
			process.execPath,
			[
				resolve('node_modules/typescript/bin/tsc'),
				'--noEmit',
				'--project',
				join(root, 'tsconfig.json'),
			],
			{ stdio: 'pipe', encoding: 'utf8' },
		)
		return ''
	} catch (error) {
		const output = error instanceof Error && 'stdout' in error ? error.stdout : undefined
		return isString(output) && output.length > 0 ? output : String(error)
	}
}

// The emitted browser resolver, written where a real Node process can load it.
// The file sits inside this checkout so its own `playwright` import resolves
// through the workspace's `node_modules`, which is what makes the loaded module
// the real one rather than a re-derivation of it.
function stageResolver(workspace: ScratchInterface): string {
	workspace.write('browsers.ts', CONFIG_TEMPLATES.browsers)
	return join(workspace.path, 'browsers.ts')
}

// One or more expressions evaluated against the loaded resolver, in a real Node
// process that strips the module's types and runs it. `undefined` is not JSON, so
// an absent answer arrives as `null` and every assertion below reads it that way.
function driveResolver(file: string, calls: readonly string[]): readonly unknown[] {
	const script = [
		`const resolver = await import(${JSON.stringify(pathToFileURL(file).href)})`,
		`console.log(JSON.stringify([${calls.join(', ')}]))`,
	].join('\n')
	const output = execFileSync(
		process.execPath,
		['--experimental-strip-types', '--input-type=module', '--eval', script],
		{ stdio: 'pipe', encoding: 'utf8' },
	)
	const answers: unknown = JSON.parse(output)
	if (!Array.isArray(answers)) throw new Error('The resolver driver printed no answer list')
	return answers
}

// One `resolveBrowser` call, written as the driver evaluates it. The platform is
// fixed so the answer is a property of the fixture rather than of this host.
function buildResolveCall(
	pinned: string | undefined,
	environment: Readonly<Record<string, string>>,
	root: string,
): string {
	const target = pinned === undefined ? 'undefined' : JSON.stringify(pinned)
	const settings = JSON.stringify(environment)
	return `resolver.resolveBrowser(${target}, 'linux', ${settings}, ${JSON.stringify(root)})`
}

// One managed Playwright browsers directory, built from the entries named. Each
// entry is a real executable file, because the resolver reads the filesystem and
// a described layout would prove nothing about what it finds. `chmodSync` sets a
// permission bit `ScratchInterface` does not expose, so it stays on `node:fs`.
function buildBrowsersRoot(workspace: ScratchInterface, entries: readonly string[]): string {
	for (const entry of entries) {
		const target = `browsers/${entry}`
		workspace.write(target, '')
		chmodSync(join(workspace.path, target), 0o755)
	}
	return workspace.ensure('browsers')
}

// The identifiers one import clause binds, aliases resolved to the bound name.
function extractBindings(clause: string): readonly string[] {
	const inner = clause.replace(/^type\s+/u, '').trim()
	const named = /^\{(?<names>[^}]*)\}$/u.exec(inner)
	if (named?.groups?.names !== undefined) {
		return named.groups.names
			.split(',')
			.map((part) => part.trim())
			.filter((part) => part.length > 0)
			.map((part) => part.split(/\s+as\s+/u).at(-1) ?? part)
	}
	const namespace = /^\*\s+as\s+(?<name>[A-Za-z_$][\w$]*)$/u.exec(inner)
	if (namespace?.groups?.name !== undefined) return [namespace.groups.name]
	return inner.length === 0 ? [] : [inner]
}

// Every import statement in a module, whole. The vendored formatter breaks an
// import whose bindings pass the print width across lines, so a rule that reads
// one line reads a fragment of the statement and every binding below the first
// line is invisible to it. An import clause carries no quote, which is what lets
// the span reach its specifier across as many lines as the formatter used and
// stop there.
function extractImports(content: string): readonly string[] {
	return content.match(/^import\s+(?:[^']*?\s+from\s+)?'[^']*'/gmu) ?? []
}

// What the vendored `no-unused-vars` rule reports on an import: a bound name the
// module never mentions outside its import statements.
function findStrays(content: string): readonly string[] {
	const statements = extractImports(content)
	let body = content
	for (const statement of statements) body = body.replace(statement, '')
	const tokens = new Set(body.split(/[^\w$]+/u))
	const strays: string[] = []
	for (const statement of statements) {
		const match = /^import\s+(?<clause>[^']*?)\s+from\s+'[^']*'$/u.exec(statement)
		if (match?.groups?.clause === undefined) continue
		for (const binding of extractBindings(match.groups.clause)) {
			if (!tokens.has(binding)) strays.push(binding)
		}
	}
	return strays
}

// What the vendored `import/no-unassigned-import` rule reports: an import that
// binds nothing and names something other than a stylesheet.
function findUnassigned(content: string): readonly string[] {
	return content
		.split('\n')
		.filter((line) => /^import\s+'[^']+'/u.test(line) && !STYLE_IMPORT.test(line))
}

// A line the vendored formatter would have printed narrower. The one excess it
// leaves is a string literal the formatter has already given a line of its own:
// no break shortens a literal, so a workspace name long enough to pass the width
// on its own line stays there. Every other over-width line is a line the formatter
// would have broken, which is what `format:check` refuses.
function findWide(content: string): readonly string[] {
	return content
		.split('\n')
		.filter((line) => measureWidth(line) > PRINT_WIDTH && !/^\t*'[^']*',?$/u.test(line))
}

describe('configuration templates', () => {
	it('uses the dependency fill boundary with missing placeholders closed', () => {
		for (const template of [CONFIG_TEMPLATES.root.tsconfig, ARTIFACT_TEMPLATES.docs.readme]) {
			let caught: unknown
			try {
				fillTemplate(template, {})
			} catch (error) {
				caught = error
			}
			expect(isTemplateError(caught)).toBe(true)
			if (!isTemplateError(caught)) throw new Error('Expected the template fill to fail closed')
			expect(caught.code).toBe('MISSING')
		}
	})

	it('fills every selected artifact without leaving a template token', () => {
		const blueprint = createBlueprint('widget', {
			src: ['core', 'browser', 'server'],
			app: ['core', 'browser', 'server'],
			bin: true,
			integration: true,
			global: true,
			showcase: true,
		})
		const artifacts = blueprintToConfigArtifacts(blueprint)
		expect(artifacts).toHaveLength(17)
		for (const artifact of artifacts) {
			expect(artifact.origin).toBe('template')
			if (artifact.origin === 'host') throw new Error('Expected a content artifact')
			expect(artifact.content).not.toMatch(/{{[^{}]+}}/)
		}
		const rootVite = artifacts.find(({ path }) => path === 'vite.config.ts')
		const coreConfig = artifacts.find(({ path }) => path === 'configs/src/tsconfig.core.json')
		const browserConfig = artifacts.find(({ path }) => path === 'configs/app/tsconfig.browser.json')
		if (
			rootVite?.origin === 'host' ||
			coreConfig?.origin === 'host' ||
			browserConfig?.origin === 'host'
		) {
			throw new Error('Expected configuration template content')
		}
		expect(rootVite?.content).toContain('projects: [')
		expect(rootVite?.content).toContain('\t\t\tprobe,')
		expect(coreConfig?.content).toContain('"lib": ["ESNext", "WebWorker"]')
		expect(coreConfig?.content).toContain('"types": []')
		expect(browserConfig?.content).toContain('"types": ["vite/client", "vue"]')
		expect(blueprintToDevDependencies(blueprint)['vite-plugin-singlefile']).toBe('^2.3.3')
	})

	it('is an oxfmt fixed point across the emitted content corpus', () => {
		const workspace = createScratch({ prefix: 'scaffold-e2-format-' })
		const formatter = resolve('node_modules/oxfmt/bin/oxfmt')
		const config = resolve('.oxfmtrc.json')
		try {
			const controlPath = 'control/outside-emitted-population.ts'
			const controlBefore = 'export const projects = [\n\tone,\n]\n'
			workspace.write(controlPath, controlBefore)
			execFileSync(
				process.execPath,
				[formatter, '--config', config, '--write', workspace.ensure('control')],
				{ stdio: 'pipe' },
			)
			expect(workspace.read(controlPath)).not.toBe(controlBefore)

			// The corpus covers each span whose emitted shape the formatter would
			// decide differently: a published face with core beside it and the same
			// face without core, an application browser with the showcase spread
			// holding its plugin array open and the same browser without it, and the
			// workspace-name lengths either side of the width the joined declaration
			// rewrite fits in. A corpus of one shape per axis reads as complete and
			// measures only the branch that shape happens to take.
			const blueprints = [
				createBlueprint('core-only', { src: ['core'] }),
				createBlueprint('published', {
					src: ['core', 'browser', 'server'],
					bin: true,
					vendors: ['ollama'],
				}),
				createBlueprint('server-only', { src: ['server'] }),
				createBlueprint('browser-only', { src: ['browser'] }),
				createBlueprint('application', {
					app: ['core', 'browser', 'server'],
					integration: true,
					global: true,
					showcase: true,
				}),
				createBlueprint('unshowcased', { app: ['core', 'browser', 'server'] }),
				createBlueprint('a'.repeat(19), { src: ['core', 'browser', 'server'] }),
				createBlueprint('a'.repeat(20), { src: ['core', 'browser', 'server'] }),
				createBlueprint('a'.repeat(MAX_NAME_LENGTH), {
					src: ['core', 'browser', 'server'],
					app: ['core', 'browser', 'server'],
					bin: true,
					integration: true,
					global: true,
					showcase: true,
					vendors: ['ollama', 'postgres'],
				}),
			]
			const expected = new Map<string, string>()
			for (const [index, blueprint] of blueprints.entries()) {
				const compiler = new Compiler()
				const plan = compiler.compile(blueprint).plan
				compiler.destroy()
				if (plan === undefined) throw new Error('The format corpus blueprint was blocked')
				for (const artifact of plan.artifacts) {
					if (artifact.origin === 'host') continue
					expect(artifact.content).not.toMatch(/\{\{[^{}]+\}\}/u)
					const target = `corpus/${String(index)}/${artifact.path}`
					workspace.write(target, artifact.content)
					expected.set(target, artifact.content)
				}
			}
			for (const length of [46, 47]) {
				const blueprint = createBlueprint('a'.repeat(length), { src: ['core'], bin: true })
				for (const artifact of blueprintToTestArtifacts(blueprint)) {
					const target = `corpus/bin-boundary-${length}/${artifact.path}`
					workspace.write(target, artifact.content)
					expected.set(target, artifact.content)
				}
			}
			execFileSync(
				process.execPath,
				[formatter, '--config', config, '--write', join(workspace.path, 'corpus')],
				{ stdio: 'pipe' },
			)
			for (const [target, content] of expected) {
				expect(workspace.read(target)).toBe(content)
			}
		} finally {
			workspace.destroy()
		}
	})
})

// A generated workspace vendors `format:check` and `lint:check` and runs both on
// the bytes `new` just wrote, so the emitted text is measured against the vendored
// rules directly here. Each instrument's population is every (blueprint, module)
// pair the matrix emits — the sum `MODULE_EMITTERS` totals, over every blueprint
// `buildSelections` returns — and each sweep states that population as
// `MODULE_EMITTERS` before the empty finding it draws from it, because an empty
// corpus reports the same empty finding as a clean one. Each rule carries a
// control drawn from outside the emitted population as well, because an
// instrument that has never reported is not evidence that the corpus is clean.
describe('emitted workspaces under their own gates', () => {
	it('refuses a non-object peer dependency declaration at config load', async () => {
		const workspace = createScratch({ parent: ensureTmpRoot(), prefix: 'scaffold-e2-peers-' })
		const root = workspace.ensure('malformed')
		try {
			stageRootConfig(createBlueprint('sample', { src: ['core'] }), workspace, 'malformed')
			workspace.write('malformed/package.json', '{ "peerDependencies": "vitest" }\n')

			await expect(
				loadConfigFromFile({ command: 'build', mode: 'test' }, join(root, 'vite.config.ts'), root),
			).rejects.toThrow('package peerDependencies must be an object')
		} finally {
			workspace.destroy()
		}
	})

	it('keeps a root factory log handler through a scoped build merge', async () => {
		const workspace = createScratch({ parent: ensureTmpRoot(), prefix: 'scaffold-e2-log-merge-' })
		const root = workspace.ensure('merged')
		try {
			const blueprint = createBlueprint('sample', { src: ['core'], bin: true })
			stageRootConfig(blueprint, workspace, 'merged')
			const wrappers = blueprintToConfigArtifacts(blueprint).filter(({ path }) =>
				['configs/src/vite.core.config.ts', 'configs/src/vite.bin.config.ts'].includes(path),
			)
			expect(wrappers.map(({ path }) => path)).toStrictEqual([
				'configs/src/vite.core.config.ts',
				'configs/src/vite.bin.config.ts',
			])
			for (const wrapper of wrappers) {
				if (wrapper.origin === 'host') throw new Error('Expected a Vite wrapper')
				workspace.write(`merged/${wrapper.path}`, wrapper.content)
			}
			workspace.write(
				'merged/control.config.ts',
				"import { defineConfig } from 'vite'\n\nexport default defineConfig({ build: { rolldownOptions: { external: () => false } } })\n",
			)

			const control = await loadConfigFromFile(
				{ command: 'build', mode: 'production' },
				join(root, 'control.config.ts'),
				root,
			)
			if (control === null) throw new Error('Expected the control configuration to load')
			expect(control.config.build?.rolldownOptions?.onLog).toBeUndefined()

			const loaded = await loadConfigFromFile(
				{ command: 'build', mode: 'production' },
				join(root, 'configs/src/vite.core.config.ts'),
				root,
			)
			if (loaded === null) throw new Error('Expected the core configuration to load')
			expect(loaded.config.build?.rolldownOptions?.onLog).toBeTypeOf('function')
			expect(loaded.config.build?.rolldownOptions?.external).toBeTypeOf('function')

			const bin = await loadConfigFromFile(
				{ command: 'build', mode: 'production' },
				join(root, 'configs/src/vite.bin.config.ts'),
				root,
			)
			if (bin === null) throw new Error('Expected the bin configuration to load')
			expect(bin.config.build?.rolldownOptions?.onLog).toBeTypeOf('function')
			expect(bin.config.build?.rolldownOptions?.external).toBeTypeOf('function')
			expect(bin.config.build?.rolldownOptions?.output).toBeDefined()
		} finally {
			workspace.destroy()
		}
	})

	// A declared peer is only left alone if a real build leaves it alone, so both
	// published faces are built for real against a staged workspace whose manifest
	// declares one. The control is a second installed package the manifest does not
	// declare: the same build inlines it, so the peer's survival is the predicate's
	// doing rather than a build that resolved nothing.
	it('leaves a declared peer external in a real build of each published face', async () => {
		const workspace = createScratch({ parent: ensureTmpRoot(), prefix: 'scaffold-e2-external-' })
		const root = workspace.ensure('external')
		try {
			const blueprint = createBlueprint('sample', { src: ['browser', 'server'] })
			stageRootConfig(blueprint, workspace, 'external')
			const manifest: unknown = JSON.parse(blueprintToManifest(blueprint))
			if (!isRecord(manifest)) throw new Error('Expected the emitted manifest to parse')
			workspace.write(
				'external/package.json',
				JSON.stringify(
					{ ...manifest, peerDependencies: { 'sample-peer': '^1.0.0' } },
					undefined,
					'\t',
				),
			)
			for (const [name, token] of PEER_FIXTURE_PACKAGES) {
				workspace.write(
					`external/node_modules/${name}/package.json`,
					`{ "name": "${name}", "version": "1.0.0", "type": "module", "main": "index.js" }\n`,
				)
				workspace.write(
					`external/node_modules/${name}/index.js`,
					`export const token = '${token}'\n`,
				)
			}
			// Each face's entry, and beside it the configuration file that face is
			// built from. An emitted `configs/src/vite.<environment>.config.ts` is that
			// file plus its declaration plugin, and the plugin is another face's
			// subject, so the build below defaults the root factory alone.
			for (const [factory, environment] of PUBLISHED_FACES) {
				workspace.write(
					`external/src/${environment}/index.ts`,
					"import { token as peer } from 'sample-peer'\nimport { token as plain } from 'sample-plain'\nexport const value = peer + plain\n",
				)
				workspace.write(
					`external/vite.${environment}.face.ts`,
					`import { ${factory} } from './vite.config.ts'\n\nexport default ${factory}()\n`,
				)
			}

			for (const [, environment] of PUBLISHED_FACES) {
				const loaded = await loadConfigFromFile(
					{ command: 'build', mode: 'production' },
					join(root, `vite.${environment}.face.ts`),
					root,
				)
				if (loaded === null) throw new Error(`Expected the ${environment} face to load`)
				await build({ ...loaded.config, root, configFile: false, logLevel: 'silent' })
				const emitted = requireValue(workspace.read(`external/dist/src/${environment}/index.js`))
				expect(emitted).toMatch(/from ["']sample-peer["']/u)
				expect(emitted).not.toContain('PEER_TOKEN')
				expect(emitted).toContain('PLAIN_TOKEN')
				expect(emitted).not.toMatch(/from ["']sample-plain["']/u)
			}
		} finally {
			workspace.destroy()
		}
		// Real Rolldown builds, measured at about 1.3 seconds together. The budget
		// carries slack over that because the cost under a full suite run is contention
		// rather than work.
	}, 30_000)

	it('counts every selection that emits each module', () => {
		expect(countEmitters(buildSelections())).toStrictEqual(MODULE_EMITTERS)

		// The control is the matrix one selection short, which is outside the
		// population `MODULE_EMITTERS` covers because that population is the pairs
		// every blueprint `buildSelections` returns emits. `browser+server` is the
		// selection every one of whose modules another selection also emits, so the
		// union of paths is bit-identical without it — the assertion these sweeps
		// used to make passes on a corpus missing every blueprint the filter below
		// excludes. The relation is what moves.
		const narrowed = buildSelections().filter(
			(blueprint) =>
				blueprint.src.join('+') !== 'browser+server' &&
				blueprint.app.join('+') !== 'browser+server',
		)
		const emitters = countEmitters(narrowed)
		expect(narrowed).toHaveLength(96)
		expect(Object.keys(emitters).sort()).toStrictEqual(Object.keys(MODULE_EMITTERS).sort())
		expect(emitters).not.toStrictEqual(MODULE_EMITTERS)
	})

	it('imports no symbol a generated module does not use', () => {
		expect(findStrays("import { unused } from 'x'\nexport const value = 1\n")).toStrictEqual([
			'unused',
		])
		expect(findStrays("import { used } from 'x'\nexport const value = used\n")).toStrictEqual([])
		// The population is every module the matrix emits, and each of those prints
		// every import on one line. The control is therefore an import the formatter
		// broke across lines: one more binding in a filled span produces it, and a
		// rule that reads a line reads a fragment of it. Both verdicts are drawn from
		// outside the population, so the instrument is exercised where it has never
		// been asked to report rather than only among the shapes it already handles.
		expect(
			findStrays("import {\n\tused,\n\tunused,\n} from 'x'\nexport const value = used\n"),
		).toStrictEqual(['unused'])
		expect(
			findStrays("import {\n\tused,\n\talso,\n} from 'x'\nexport const value = used + also\n"),
		).toStrictEqual([])

		const inspected = new Map<string, number>()
		const strays: string[] = []
		for (const blueprint of buildSelections()) {
			for (const [path, content] of buildModules(blueprint)) {
				inspected.set(path, (inspected.get(path) ?? 0) + 1)
				for (const binding of findStrays(content)) {
					strays.push(`${blueprint.src.join('+')}/${blueprint.app.join('+')} ${path} ${binding}`)
				}
			}
		}
		expect(Object.fromEntries(inspected)).toStrictEqual(MODULE_EMITTERS)
		expect(strays).toStrictEqual([])
	})

	it('emits no entry the vendored unassigned-import rule refuses', () => {
		expect(findUnassigned("import './index.js'\n")).toStrictEqual(["import './index.js'"])
		expect(findUnassigned("import './index.scss'\n")).toStrictEqual([])

		const inspected = new Map<string, number>()
		const unassigned: string[] = []
		for (const blueprint of buildSelections()) {
			for (const [path, content] of buildModules(blueprint)) {
				inspected.set(path, (inspected.get(path) ?? 0) + 1)
				for (const line of findUnassigned(content)) {
					unassigned.push(`${path} ${line}`)
				}
			}
		}
		expect(Object.fromEntries(inspected)).toStrictEqual(MODULE_EMITTERS)
		expect(unassigned).toStrictEqual([])
		const application = buildModules(
			createBlueprint('sample', { app: ['core', 'browser', 'server'] }),
		)
		expect(application.get('app/browser/main.ts')).toBe('')
		expect(application.get('app/server/main.ts')).toBe('')
	})

	// A generated workspace's own `check` script runs `tsc` over the configuration
	// `new` just wrote, so both browser masks are measured against Vite and
	// Vitest's real published types rather than against a description of them.
	it('emits browser configurations their own typecheck accepts', () => {
		const workspace = createScratch({ parent: ensureTmpRoot(), prefix: 'scaffold-e2-types-' })
		const applicationRoot = workspace.ensure('application')
		const showcaseRoot = workspace.ensure('showcase')
		try {
			stageRootConfig(createBlueprint('sample', { app: ['browser'] }), workspace, 'application')
			stageRootConfig(
				createBlueprint('sample', { app: ['browser'], showcase: true }),
				workspace,
				'showcase',
			)
			const application = requireValue(workspace.read('application/vite.config.ts'))
			const showcase = requireValue(workspace.read('showcase/vite.config.ts'))
			expect(checkTypes(applicationRoot)).toBe('')
			expect(checkTypes(showcaseRoot)).toBe('')

			// The project row calls the sealed factory with no argument, so the
			// generated configuration receives the `UserConfig` it returns.
			expect(application).toContain('projects: [appBrowser(), policy, config, probe]')
			// The evaluated row carries no function name, so the vendored `config`
			// proof finds it by the label instead. That label is emitted here, and the
			// label and the row have to agree or a generated browser workspace fails its own `test`
			// script while passing its `check` script.
			expect(application).toContain("name: { label: 'app:browser', color: 'blue' }")
			workspace.write(
				'application/vite.config.ts',
				application.replace('projects: [appBrowser(),', 'projects: [appBrowser({}),'),
			)
			expect(checkTypes(applicationRoot)).toContain('Expected 0 arguments, but got 1.')
			expect(CONFIG_TEMPLATES.factories.app.browser).toContain(
				'export function appBrowser(): UserConfig',
			)
			expect(CONFIG_TEMPLATES.factories.app.browser).not.toContain('...options: never[]')
			expect(CONFIG_TEMPLATES.factories.app.browser).not.toContain(
				'Browser configuration overrides are not permitted',
			)
			// The showcase-only control removes the contextual type from the
			// conditional plugin array. It recreates the widening that made the
			// emitted workspace fail even though the runtime plugin list is unchanged.
			expect(showcase).toContain('const showcasePlugins: PluginOption[] = showcase')
			const control = showcase
				.replace(
					"import type { PluginOption, UserConfig } from 'vite'",
					"import type { UserConfig } from 'vite'",
				)
				.replace(
					'const showcasePlugins: PluginOption[] = showcase',
					'const showcasePlugins = showcase',
				)
			expect(control).not.toBe(showcase)
			workspace.write('showcase/vite.config.ts', control)
			const diagnostics = checkTypes(showcaseRoot)
			expect(diagnostics).toContain("Parameter 'html' implicitly has an 'any' type")
		} finally {
			workspace.destroy()
		}
		// Real `tsc` invocations, measured at about nine seconds alone. The
		// budget carries slack over that because the cost is contention, not work:
		// the previous ten-second budget passed alone and reported a timeout under a
		// full suite run, which is a red gate carrying no diagnostic.
	}, 30_000)

	it('prints no line past the vendored width the formatter could have broken', () => {
		// Three tabs print as six columns, so one control lands one column past
		// the width and another lands exactly on it. A further control is far past it
		// by a literal on a line of its own, which is the one excess the formatter leaves
		// and the real formatter confirms it leaves.
		expect(findWide(`\t\t\t${'a'.repeat(89)} = '_'`)).toHaveLength(1)
		expect(findWide(`\t\t\t${'a'.repeat(88)} = '_'`)).toStrictEqual([])
		expect(findWide(`\t\t\t\t'${'a'.repeat(120)}',`)).toStrictEqual([])

		const inspected = new Map<string, number>()
		const wide: string[] = []
		for (const blueprint of buildSelections()) {
			for (const [path, content] of buildModules(blueprint)) {
				inspected.set(path, (inspected.get(path) ?? 0) + 1)
				for (const line of findWide(content)) wide.push(`${path} ${line.trim()}`)
			}
		}
		expect(Object.fromEntries(inspected)).toStrictEqual(MODULE_EMITTERS)
		// The workspace name reaches the emitted declaration rewrite, so its width is
		// swept over every length the gate admits rather than at one sample: the
		// joined call fits up to a point this matrix crosses, and one name on either
		// side of that point is the only place the branch can be observed.
		for (let length = 1; length <= MAX_NAME_LENGTH; length += 1) {
			const blueprint = createBlueprint('a'.repeat(length), {
				src: ['core', 'server'],
				bin: true,
			})
			for (const [path, content] of buildModules(blueprint)) {
				for (const line of findWide(content)) wide.push(`${length} ${path} ${line.trim()}`)
			}
		}
		expect(wide).toStrictEqual([])
	})
})

// The emitted `configs/browsers.ts` decides which Chromium a generated browser
// workspace launches, so it is loaded and driven rather than read. Every fixture
// below is a real directory of real executable files, and every answer comes back
// from a Node process that imported the emitted module.
describe('emitted browser resolver', () => {
	it('publishes every name the emitted root configuration is built on', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-resolver-names-',
		})
		try {
			const file = stageResolver(workspace)
			const [names, bundled] = driveResolver(file, [
				'Object.keys(resolver)',
				'resolver.BUNDLED_BROWSERS_ROOT',
			])
			// A module namespace orders its keys by code unit, so the loaded surface is
			// compared as a multiset against the emission order the constant records.
			expect(names).toStrictEqual([...BROWSER_RESOLVER_EXPORTS].sort())
			// The control on the driver itself: a value this test never supplies comes
			// back from the loaded module, so an answer below is that module's and not
			// an echo of the expression that asked for it.
			expect(bundled).toBe('/opt/pw-browsers')
		} finally {
			workspace.destroy()
		}
	}, 20_000)

	it('ranks an operator override above every browser it could discover', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-resolver-override-',
		})
		try {
			const file = stageResolver(workspace)
			const browsers = buildBrowsersRoot(workspace, ['chromium'])
			const pinned = join(browsers, 'chromium-1234/chrome-linux64/chrome')
			const alias = join(browsers, 'chromium')
			const [discovered, executable, endpoint, channel, ranked, empty] = driveResolver(file, [
				buildResolveCall(pinned, {}, browsers),
				buildResolveCall(pinned, { PLAYWRIGHT_EXECUTABLE_PATH: '/operator/chrome' }, browsers),
				buildResolveCall(
					pinned,
					{ PLAYWRIGHT_WS_ENDPOINT: 'ws://operator:9222/session' },
					browsers,
				),
				buildResolveCall(pinned, { PLAYWRIGHT_CHANNEL: 'msedge' }, browsers),
				buildResolveCall(
					pinned,
					{
						PLAYWRIGHT_EXECUTABLE_PATH: '/operator/chrome',
						PLAYWRIGHT_WS_ENDPOINT: 'ws://operator:9222/session',
						PLAYWRIGHT_CHANNEL: 'msedge',
					},
					browsers,
				),
				buildResolveCall(pinned, { PLAYWRIGHT_EXECUTABLE_PATH: '' }, browsers),
			])

			// The control: with no override the same call discovers a real executable in
			// the fixture, so each override below outranks an answer that exists.
			expect(discovered).toStrictEqual({ launchOptions: { executablePath: alias } })
			// `/operator/chrome` is not on this host, which is the point: an override is
			// returned exactly as given rather than checked against the filesystem.
			expect(executable).toStrictEqual({ launchOptions: { executablePath: '/operator/chrome' } })
			expect(endpoint).toStrictEqual({
				connectOptions: { wsEndpoint: 'ws://operator:9222/session' },
			})
			expect(channel).toStrictEqual({ launchOptions: { channel: 'msedge' } })
			expect(ranked).toStrictEqual({ launchOptions: { executablePath: '/operator/chrome' } })
			// An empty value is absence rather than an override, so discovery answers.
			expect(empty).toStrictEqual({ launchOptions: { executablePath: alias } })
		} finally {
			workspace.destroy()
		}
	}, 20_000)

	it('reads a pinned-revision miss as a fallthrough rather than as absence', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-resolver-managed-',
		})
		try {
			const file = stageResolver(workspace)
			// `chromium-999` sorts above `chromium-1194` by name and below it by
			// revision, so the entry the sweep picks says which order ran.
			const browsers = buildBrowsersRoot(workspace, [
				'chromium',
				'chromium-1194/chrome-linux64/chrome',
				'chromium-999/chrome-linux/chrome',
			])
			const pinned = join(browsers, 'chromium-1234/chrome-linux64/chrome')
			const alias = join(browsers, 'chromium')
			const highest = join(browsers, 'chromium-1194/chrome-linux64/chrome')
			const lowest = join(browsers, 'chromium-999/chrome-linux/chrome')
			const call = `resolver.resolveManagedBrowser(${JSON.stringify(pinned)})`

			const [aliased, missing, directory] = driveResolver(file, [
				call,
				`resolver.isBrowserExecutable(${JSON.stringify(pinned)})`,
				`resolver.isBrowserExecutable(${JSON.stringify(browsers)})`,
			])
			expect(missing).toBe(false)
			// The executable check answers on shape, not on the permission bit alone: a
			// directory is never a browser, on any host.
			expect(directory).toBe(false)
			expect(aliased).toBe(alias)

			workspace.remove('browsers/chromium')
			const [byRevision] = driveResolver(file, [call])
			expect(byRevision).toBe(highest)

			workspace.remove('browsers/chromium-1194')
			const [remaining] = driveResolver(file, [call])
			expect(remaining).toBe(lowest)

			// The control the ladder needs: with nothing installed the same call reports
			// absence, so each answer above is a resolution rather than a constant.
			workspace.remove('browsers/chromium-999')
			const [absent] = driveResolver(file, [call])
			expect(absent).toBeNull()
		} finally {
			workspace.destroy()
		}
	}, 30_000)

	it('keeps Playwright launch defaults when the pinned revision is installed', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-resolver-pinned-',
		})
		try {
			const file = stageResolver(workspace)
			const browsers = buildBrowsersRoot(workspace, ['chromium-1234/chrome-linux64/chrome'])
			const pinned = join(browsers, 'chromium-1234/chrome-linux64/chrome')
			const bare = workspace.ensure('bare')
			const [installed, bundled, channel] = driveResolver(file, [
				buildResolveCall(pinned, {}, browsers),
				buildResolveCall(undefined, {}, browsers),
				buildResolveCall(undefined, {}, bare),
			])

			expect(installed).toStrictEqual({})
			// The control against that empty answer: the same host, the same directory,
			// and no pinned revision names the bundled executable instead.
			expect(bundled).toStrictEqual({ launchOptions: { executablePath: pinned } })
			// With nothing to find the resolver names a channel. Which channel it names
			// is a property of this host, so the assertion is the set it comes from.
			expect([
				{ launchOptions: { channel: 'chrome' } },
				{ launchOptions: { channel: 'msedge' } },
			]).toContainEqual(channel)
		} finally {
			workspace.destroy()
		}
	}, 20_000)
})
