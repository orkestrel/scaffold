import type { Blueprint, Environment } from '@src/core'
import type { ScratchInterface } from '@orkestrel/test/server'
import { execFileSync } from 'node:child_process'
import { chmodSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { runInNewContext } from 'node:vm'
import { isRecord, isString } from '@orkestrel/contract'
import { requireValue } from '@orkestrel/test'
import { createScratch } from '@orkestrel/test/server'
import { fillTemplate, isTemplateError } from '@orkestrel/template'
import ts from 'typescript'
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

// One or more expressions evaluated against a loaded emitted module, in a real Node
// process that strips the module's types and runs it. The caller names the binding
// its own expressions read. This driver serializes an `undefined` answer as `null`.
function driveModule(file: string, binding: string, calls: readonly string[]): readonly unknown[] {
	const script = [
		`const ${binding} = await import(${JSON.stringify(pathToFileURL(file).href)})`,
		`console.log(JSON.stringify([${calls.join(', ')}]))`,
	].join('\n')
	const output = execFileSync(
		process.execPath,
		['--experimental-strip-types', '--input-type=module', '--eval', script],
		{ stdio: 'pipe', encoding: 'utf8' },
	)
	const answers: unknown = JSON.parse(output)
	if (!Array.isArray(answers)) throw new Error(`The ${binding} driver printed no answer list`)
	return answers
}

// The declarations the emitted distribution proof classifies an installed exports
// map with. The proof packs and installs at module load, so it cannot be imported;
// these are lifted out of the real emitted text instead and driven directly. A name
// the proof stops declaring fails the lift rather than thinning the drive.
const CLASSIFIER_DECLARATIONS: readonly string[] = [
	'MODULE_EXTENSIONS',
	'ADDON_EXTENSION',
	'DECLARATION_EXTENSIONS',
	'BROWSER_OUTPUT',
	'RUNTIME_CONDITIONS',
	'BUNDLER_CONDITIONS',
	'DECLARATION_CONDITIONS',
	'isRecord',
	'isList',
	'isPackageTarget',
	'readJson',
	'resolvePackageTarget',
	'resolveTarget',
	'resolvesBrowser',
	'matchesFile',
	'targetToDeclaration',
	'resolveDeclaration',
	'readPackageType',
	'resolvesCommonJS',
	'declaresCommonJS',
	'collectTargets',
	'isModule',
	'isDeclaration',
	'readDeclaration',
	'selectEntries',
	'selectUntypable',
]

// One classification the emitted proof performs, written as the driver evaluates it
// and paired with the answer it owes. Each export shape here is one Node accepts:
// an array is a fallback list, a condition value may be an array, and a subpath may
// answer `require` alone.
const CLASSIFIER_CASES: ReadonlyArray<readonly [call: string, answer: unknown]> = [
	[`classifier.collectTargets(['./dist/src/core/index.js'])`, ['./dist/src/core/index.js']],
	[`classifier.collectTargets(['./a.js', { require: './b.cjs' }])`, ['./a.js', './b.cjs']],
	[
		`classifier.collectTargets({ import: { types: './x.d.ts', default: './x.js' } })`,
		['./x.d.ts', './x.js'],
	],
	[`classifier.resolveTarget(['./a.js', './b.js'], ['import'])`, './a.js'],
	[
		`classifier.resolveTarget([{ types: './x.d.ts', default: './x.js' }], ['types', 'import'])`,
		'./x.d.ts',
	],
	[`classifier.isModule('./dist/src/core/index.js')`, true],
	[`classifier.isModule('./dist/src/core/index.mjs')`, true],
	[`classifier.isModule('./dist/src/core/index.cjs')`, true],
	[`classifier.isModule('./dist/src/core/addon.node')`, true],
	[`classifier.isModule('./dist/src/core/feature')`, true],
	[`classifier.isModule('./dist/bundle.js/feature')`, true],
	[`classifier.isModule('./dist/src/core/module.wasm')`, false],
	[`classifier.isModule('./dist/src/styles/main.css')`, false],
	[`classifier.isModule('./package.json')`, false],
	[`classifier.isModule('./dist/src/core/index.d.ts')`, false],
	[`classifier.isModule('./dist/src/core/index.d.cts')`, false],
]

// The lifted declarations, written where a real Node process can load them. The
// TypeScript parser reads them off the emitted text, so a formatting change moves
// nothing here and a renamed declaration fails loudly.
function stageClassifier(
	workspace: ScratchInterface,
	content: string,
	declarations: readonly string[] = CLASSIFIER_DECLARATIONS,
): string {
	workspace.write('classifier.ts', extractDeclarations(content, declarations))
	return join(workspace.path, 'classifier.ts')
}

// The emitted classifier driven in this process after TypeScript removes its type
// syntax. This driver stays separate from `driveModule`: the classifier assertions
// distinguish `undefined`, while the JSON transport of a real module drive changes
// it to `null`. A fresh VM context gives each drive an isolated module instance.
function driveClassifier(file: string, calls: readonly string[]): readonly unknown[] {
	const compiled = ts.transpileModule(readFileSync(file, 'utf8'), {
		compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ESNext },
	})
	const classifier: Record<string, unknown> = {}
	runInNewContext(compiled.outputText, {
		dirname,
		existsSync,
		exports: classifier,
		join,
		readFileSync,
		statSync,
	})
	const answers: unknown = runInNewContext(`[${calls.join(', ')}]`, { classifier })
	if (!Array.isArray(answers)) throw new Error('The emitted classifier driver returned no list')
	return structuredClone(answers)
}

// The generated distribution proof lifted into one scratch module for a direct
// classifier drive.
function stageDistributionClassifier(workspace: ScratchInterface): string {
	const [proof] = blueprintToTestArtifacts(createBlueprint('sample', { src: ['core'] })).filter(
		({ path }) => path === 'tests/distribution.test.ts',
	)
	return stageClassifier(workspace, requireValue(proof?.content))
}

// The statements that classify one installed exports map, lifted from the emitted
// `buildStage` body. Packing and installing are outside this drive; the staged
// manifest and installed root are its real inputs, and every pushed record is the
// emitted statement's own value.
function stageDistributionClassification(workspace: ScratchInterface): string {
	const [proof] = blueprintToTestArtifacts(createBlueprint('sample', { src: ['core'] })).filter(
		({ path }) => path === 'tests/distribution.test.ts',
	)
	const content = requireValue(proof?.content)
	const source = ts.createSourceFile('proof.ts', content, ts.ScriptTarget.ESNext, true)
	const stage = source.statements.find(
		(statement): statement is ts.FunctionDeclaration =>
			ts.isFunctionDeclaration(statement) && statement.name?.text === 'buildStage',
	)
	if (stage?.body === undefined) throw new Error('The emitted proof declares no buildStage body')
	const declarations = stage.body.statements.filter((statement) => {
		if (!ts.isVariableStatement(statement)) return false
		return statement.declarationList.declarations.some(
			(declaration) =>
				ts.isIdentifier(declaration.name) &&
				['entries', 'targets', 'subpaths', 'undeclared', 'excluded'].includes(
					declaration.name.text,
				),
		)
	})
	const walk = stage.body.statements.find(ts.isForOfStatement)
	const declared = declarations.flatMap((statement) => readDeclaredNames(statement))
	const missing = ['entries', 'targets', 'subpaths', 'undeclared', 'excluded'].filter(
		(name) => !declared.includes(name),
	)
	if (missing.length > 0 || walk === undefined) {
		throw new Error('The emitted buildStage carries no complete classification walk')
	}
	const classifier = extractDeclarations(content, CLASSIFIER_DECLARATIONS)
	const lifted = `${classifier}
export function classifyStage(
	manifest: Readonly<Record<string, unknown>>,
	installed: string,
	name: string,
): unknown {
${declarations.map((statement) => statement.getText(source)).join('\n')}
${walk.getText(source)}
	return { entries, targets, subpaths, undeclared, excluded }
}
`
	workspace.write('classification.ts', lifted)
	return join(workspace.path, 'classification.ts')
}

// One module carrying the named top-level declarations of another, in source order
// so a constant still precedes the function reading it, and exporting each name.
function extractDeclarations(content: string, names: readonly string[]): string {
	const source = ts.createSourceFile('proof.ts', content, ts.ScriptTarget.ESNext, true)
	const lifted = new Map<string, string>()
	for (const statement of source.statements) {
		for (const name of readDeclaredNames(statement)) {
			if (names.includes(name)) lifted.set(name, statement.getText(source))
		}
	}
	const missing = names.filter((name) => !lifted.has(name))
	if (missing.length > 0) {
		throw new Error(`The emitted proof declares no ${missing.join(', ')}`)
	}
	return `${[...lifted.values()].join('\n\n')}\n\nexport { ${names.join(', ')} }\n`
}

// The names one top-level statement binds, for the function and variable statements
// a lift can carry. Every other statement binds nothing a caller can name.
function readDeclaredNames(statement: ts.Statement): readonly string[] {
	if (ts.isFunctionDeclaration(statement)) {
		return statement.name === undefined ? [] : [statement.name.text]
	}
	if (!ts.isVariableStatement(statement)) return []
	const names: string[] = []
	for (const declaration of statement.declarationList.declarations) {
		if (ts.isIdentifier(declaration.name)) names.push(declaration.name.text)
	}
	return names
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

// Every project factory in a module that still declares a parameter, read off the
// TypeScript parser rather than off the text: the question is what a declaration
// carries, and a pattern reports on one spelling of it. Membership is an exported
// top-level declaration whose return type is `UserConfig`, which is what Vitest
// calls as a project row. `applicationBrowser` takes the showcase switch and is not
// exported, so the same rule leaves it outside the population rather than exempting
// it.
function findParameters(content: string): readonly string[] {
	const source = ts.createSourceFile('vite.config.ts', content, ts.ScriptTarget.ESNext, true)
	const carried: string[] = []
	for (const statement of source.statements) {
		const modifiers = ts.canHaveModifiers(statement) ? ts.getModifiers(statement) : undefined
		if (!(modifiers ?? []).some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
			continue
		}
		if (ts.isFunctionDeclaration(statement)) {
			if (statement.type?.getText(source) !== 'UserConfig') continue
			if (statement.parameters.length > 0) carried.push(requireValue(statement.name?.text))
			continue
		}
		if (!ts.isVariableStatement(statement)) continue
		for (const declaration of statement.declarationList.declarations) {
			const initializer = declaration.initializer
			if (initializer === undefined || !ts.isArrowFunction(initializer)) continue
			if (initializer.type?.getText(source) !== 'UserConfig') continue
			if (initializer.parameters.length === 0 || !ts.isIdentifier(declaration.name)) continue
			carried.push(declaration.name.text)
		}
	}
	return carried
}

// The setup seeds a target is born with, transcribed from a run that printed them
// rather than derived from the templates the pin reads. `audit` decides whether a
// setup module is filled by comparing its text against the seed the installed
// release plans at that path, and it holds no earlier seed, so a moved byte here
// moves that reading on every target materialized before the move. Transcribing
// the bytes makes such a move a deliberate edit rather than a silent one.
const PLANNED_SETUP_SEED = ''
const PLANNED_GLOBAL_SEED = 'export function setup(): void {}\n'

// One byte of a seed changed: the trailing byte becomes a space, and a seed
// holding no bytes gains one, because a byte that is not there cannot be replaced.
// Every planned seed is ASCII, so a byte and a code unit are the same thing here.
function mutateSeed(seed: string): string {
	return `${seed.slice(0, -1)} `
}

// The refused parameter planted back into a copy of emitted or template text. Every
// root configuration declares `policy`, so the plant lands in each one the sweep
// walks and an empty finding is a finding rather than a module the parser skipped.
function plantParameter(content: string): string {
	return content.replace(
		'export const policy = (): UserConfig =>',
		'export const policy = (options?: UserConfig): UserConfig =>',
	)
}

describe('configuration templates', () => {
	it('seeds each planned setup module with the exact transcribed bytes', () => {
		expect(ARTIFACT_TEMPLATES.tests.setup).toBe(PLANNED_SETUP_SEED)
		expect(ARTIFACT_TEMPLATES.tests.global).toBe(PLANNED_GLOBAL_SEED)

		// The control on each comparison: the same assertion, driven against a copy
		// of the real seed carrying one changed byte, must report the difference. An
		// equality pin that has never reported one is not evidence that it can, and
		// a transcription that had drifted from its seed would leave both of these
		// passing for the wrong reason.
		expect(mutateSeed(ARTIFACT_TEMPLATES.tests.setup)).not.toBe(PLANNED_SETUP_SEED)
		expect(mutateSeed(ARTIFACT_TEMPLATES.tests.global)).not.toBe(PLANNED_GLOBAL_SEED)
	})

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

	it('declares every emitted project factory without a parameter list', () => {
		// Vitest calls a project row with its own environment record, so a factory
		// that declared a parameter merged those fields into the configuration it
		// returned. The controls are that parameter planted back: once into the
		// template text the emitters carry, and once into every emitted configuration
		// the sweep reads.
		const planted = plantParameter(CONFIG_TEMPLATES.factories.policy)
		expect(planted).not.toBe(CONFIG_TEMPLATES.factories.policy)
		expect(findParameters(planted)).toStrictEqual(['policy'])
		expect(findParameters(CONFIG_TEMPLATES.factories.policy)).toStrictEqual([])
		expect(findParameters(CONFIG_TEMPLATES.factories.app.browser)).toStrictEqual([])

		const inspected = new Map<string, number>()
		const carried: string[] = []
		const blind: string[] = []
		for (const blueprint of buildSelections()) {
			for (const [path, content] of buildModules(blueprint)) {
				inspected.set(path, (inspected.get(path) ?? 0) + 1)
				for (const name of findParameters(content)) carried.push(`${path} ${name}`)
				if (path !== 'vite.config.ts') continue
				if (findParameters(plantParameter(content)).length === 0) blind.push(path)
			}
		}
		expect(Object.fromEntries(inspected)).toStrictEqual(MODULE_EMITTERS)
		expect(blind).toStrictEqual([])
		expect(carried).toStrictEqual([])
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

			// The row is the factory itself, so Vitest calls it and reads the command
			// line's `--mode` inside the project. An evaluated row passes this `check`
			// while failing the emitted workspace's own `test` script.
			expect(application).toContain('projects: [appBrowser, policy, config, probe]')
			// The vendored `config` proof finds a called row by its function name and an
			// evaluated one by its label, so the name and the label both have to agree
			// with what that proof expects.
			expect(application).toContain("name: { label: 'app:browser', color: 'blue' }")
			// The factory takes no parameter, so an override passed into a project row is
			// what the emitted workspace's own typecheck refuses. That refusal is the
			// control: it fails where the sealed declaration is read, so a clean run
			// cannot be a typecheck that resolved nothing.
			workspace.write(
				'application/vite.config.ts',
				application.replace(
					'projects: [appBrowser,',
					'projects: [appBrowser({ publicDir: false }),',
				),
			)
			expect(checkTypes(applicationRoot)).toContain('Expected 0 arguments, but got 1')
			expect(CONFIG_TEMPLATES.factories.app.browser).toContain(
				'export function appBrowser(): UserConfig',
			)
			expect(CONFIG_TEMPLATES.factories.app.browser).toContain('return applicationBrowser(false)')
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
			const [names, bundled] = driveModule(file, 'resolver', [
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
			const [discovered, executable, endpoint, channel, ranked, empty] = driveModule(
				file,
				'resolver',
				[
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
				],
			)

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

			const [aliased, missing, directory] = driveModule(file, 'resolver', [
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
			const [byRevision] = driveModule(file, 'resolver', [call])
			expect(byRevision).toBe(highest)

			workspace.remove('browsers/chromium-1194')
			const [remaining] = driveModule(file, 'resolver', [call])
			expect(remaining).toBe(lowest)

			// The control the ladder needs: with nothing installed the same call reports
			// absence, so each answer above is a resolution rather than a constant.
			workspace.remove('browsers/chromium-999')
			const [absent] = driveModule(file, 'resolver', [call])
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
			const [installed, bundled, channel] = driveModule(file, 'resolver', [
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

describe('emitted distribution classifier', () => {
	// Every shape here is legal in an exports map, and each one the classifier fails
	// to read is a subpath published without measurement: the walkers answer nothing
	// for it, the proof files it as excluded, and the totality assertion stays green
	// because the subpath is accounted for.
	it('reads a fallback list, a declaration under require, and an extensionless module', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-classifier-',
		})
		try {
			const file = stageDistributionClassifier(workspace)
			const installed = workspace.ensure('installed')
			workspace.write('installed/x.d.ts', 'export const value: number\n')
			workspace.write('installed/x.d.cts', 'export const value: number\n')
			const cases: ReadonlyArray<readonly [call: string, answer: unknown]> = [
				...CLASSIFIER_CASES,
				[
					`classifier.readDeclaration({ import: { types: ['./x.d.ts'], default: './x.js' } }, ${JSON.stringify(installed)})`,
					{ module: './x.d.ts', commonjs: undefined, browser: './x.d.ts' },
				],
				[
					`classifier.readDeclaration({ require: { types: './x.d.cts', default: './x.cjs' } }, ${JSON.stringify(installed)})`,
					{ module: undefined, commonjs: './x.d.cts', browser: undefined },
				],
				[
					`classifier.readDeclaration({ import: { types: './x.d.ts' }, require: { types: './x.d.cts' } }, ${JSON.stringify(installed)})`,
					{ module: './x.d.ts', commonjs: './x.d.cts', browser: './x.d.ts' },
				],
				[
					`classifier.readDeclaration({ import: './missing.js', default: './missing.js' }, ${JSON.stringify(installed)})`,
					{ module: undefined, commonjs: undefined, browser: undefined },
				],
			]
			const answers = driveClassifier(
				file,
				cases.map(([call]) => call),
			)

			expect(answers).toStrictEqual(cases.map(([, answer]) => answer))
		} finally {
			workspace.destroy()
		}
	}, 20_000)

	it('classifies native addon targets as modules', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-native-addon-',
		})
		try {
			const file = stageDistributionClassifier(workspace)
			const answers = driveClassifier(file, [
				`classifier.isModule('./dist/addon.node')`,
				`classifier.isModule('./dist/module.wasm')`,
			])

			expect(answers).toStrictEqual([true, false])
		} finally {
			workspace.destroy()
		}
	})

	it('resolves each runtime against its consumer declaration', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-dual-declaration-',
		})
		try {
			const file = stageDistributionClassifier(workspace)
			const installed = workspace.ensure('installed')
			workspace.write('installed/x.d.mts', 'export const value: number\n')
			workspace.write('installed/x.d.cts', 'export const value: number\n')
			const answers = driveClassifier(file, [
				`classifier.readDeclaration({ import: { types: './x.d.mts', default: './x.mjs' }, require: { types: './x.d.cts', default: './x.cjs' } }, ${JSON.stringify(installed)})`,
				`classifier.readDeclaration({ import: { types: './x.d.mts', default: './x.mjs' }, require: './missing.cjs' }, ${JSON.stringify(installed)})`,
			])

			expect(answers).toStrictEqual([
				{ module: './x.d.mts', commonjs: './x.d.cts', browser: './x.d.mts' },
				{ module: './x.d.mts', commonjs: undefined, browser: './x.d.mts' },
			])
		} finally {
			workspace.destroy()
		}
	})

	it('resolves declarations from explicit and adjacent targets that exist', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-declaration-substitution-',
		})
		try {
			const file = stageDistributionClassifier(workspace)
			const installed = workspace.ensure('installed')
			workspace.write('installed/index.d.cts', 'export const value: number\n')
			workspace.write('installed/index.d.mts', 'export const value: number\n')
			const conventional = `{ require: './index.cjs', import: './index.mjs' }`
			const missingTypes = `{ require: { types: './missing.d.cts', default: './index.cjs' } }`
			const fallback = `{ require: ['../outside.cjs', './index.cjs'] }`
			const absent = workspace.ensure('absent')
			const answers = driveClassifier(file, [
				`classifier.readDeclaration(${conventional}, ${JSON.stringify(installed)})`,
				`classifier.readDeclaration(${missingTypes}, ${JSON.stringify(installed)})`,
				`classifier.readDeclaration(${fallback}, ${JSON.stringify(installed)})`,
				`classifier.readDeclaration(${conventional}, ${JSON.stringify(absent)})`,
			])

			expect(answers).toStrictEqual([
				{ module: './index.d.mts', commonjs: './index.d.cts', browser: './index.d.mts' },
				{ module: undefined, commonjs: './index.d.cts', browser: undefined },
				{ module: undefined, commonjs: './index.d.cts', browser: undefined },
				{ module: undefined, commonjs: undefined, browser: undefined },
			])
		} finally {
			workspace.destroy()
		}
	})

	it("resolves Node import and browser exports under each driver's conditions", () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-driver-conditions-',
		})
		try {
			const file = stageDistributionClassifier(workspace)
			const installed = workspace.ensure('installed')
			workspace.write('installed/node.d.mts', 'export const value: number\n')
			workspace.write('installed/node.d.cts', 'export const value: number\n')
			workspace.write('installed/default.d.ts', 'export const value: number\n')
			const entry = `{ node: { import: { types: './node.d.mts', default: './node.mjs' }, require: { types: './node.d.cts', default: './node.cjs' } }, browser: './browser.js', default: { types: './default.d.ts', default: './default.js' } }`
			const answers = driveClassifier(file, [
				`classifier.readDeclaration(${entry}, ${JSON.stringify(installed)})`,
				`classifier.resolveTarget(${entry}, classifier.RUNTIME_CONDITIONS.module)`,
				`classifier.resolveTarget(${entry}, classifier.RUNTIME_CONDITIONS.browser)`,
				`classifier.resolveTarget(${entry}, classifier.BUNDLER_CONDITIONS.module)`,
				`classifier.resolveTarget(${entry}, [])`,
			])

			expect(answers).toStrictEqual([
				{ module: './node.d.mts', commonjs: './node.d.cts', browser: './default.d.ts' },
				'./node.mjs',
				'./browser.js',
				'./default.d.ts',
				// The control removes every driver condition, so the same entry must fall back.
				'./default.js',
			])
		} finally {
			workspace.destroy()
		}
	})

	it('separates the CommonJS runtime format from declaration compatibility', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-declaration-format-',
		})
		try {
			const file = stageDistributionClassifier(workspace)
			const installed = workspace.ensure('installed')
			workspace.write('installed/package.json', '{ "type": "module" }\n')
			workspace.write('installed/nested/package.json', '{ "type": "commonjs" }\n')
			workspace.write('installed/malformed/package.json', '{ "type":\n}\n')
			workspace.ensure('installed/directory/package.json')
			workspace.write('installed/directory/index.d.ts', 'export const value: number\n')
			workspace.write('installed/feature.d.cts', 'export const value: number\n')
			workspace.write('installed/feature.d.mts', 'export const value: number\n')
			workspace.write('installed/synchronized.d.cts', 'export const value: number\n')
			workspace.write('installed/node.d.cts', 'export const value: number\n')
			workspace.write('installed/default.d.mts', 'export const value: number\n')
			workspace.write('installed/module.d.mts', 'export const value: number\n')
			workspace.write('installed/dual.d.mts', 'export const value: number\n')
			workspace.write('installed/dual.d.cts', 'export const value: number\n')
			workspace.write('installed/nested/feature.d.ts', 'export const value: number\n')
			workspace.write('installed/malformed/feature.d.ts', 'export const value: number\n')
			const declarationCommonRuntimeModule = `{ require: { types: './feature.d.cts', default: './feature.mjs' } }`
			const declarationModuleRuntimeCommon = `{ require: { types: './feature.d.mts', default: './feature.cjs' } }`
			const synchronized = `{ types: './synchronized.d.cts', 'module-sync': './synchronized.mjs', require: './synchronized.cjs', import: './synchronized.mjs' }`
			const conditioned = `{ node: { types: './node.d.cts', default: './node.cjs' }, default: { types: './default.d.mts', default: './default.js' } }`
			const dual = `{ import: { types: './dual.d.mts', default: './dual.mjs' }, require: { types: './dual.d.cts', default: './dual.cjs' } }`
			const module = `{ types: './module.d.mts', import: './module.js', default: './module.js' }`
			const extensionless = `{ types: './feature.d.cts', require: './feature' }`
			const nested = `{ types: './nested/feature.d.ts', require: './feature.mjs' }`
			const malformed = `{ types: './malformed/feature.d.ts', require: './feature.mjs' }`
			const directory = `{ types: './directory/index.d.ts', require: './feature.mjs' }`
			const answers = driveClassifier(file, [
				`classifier.resolvesCommonJS(${declarationCommonRuntimeModule}, ${JSON.stringify(installed)})`,
				`classifier.resolvesCommonJS(${declarationModuleRuntimeCommon}, ${JSON.stringify(installed)})`,
				`classifier.resolvesCommonJS(${synchronized}, ${JSON.stringify(installed)})`,
				`classifier.resolvesCommonJS(${conditioned}, ${JSON.stringify(installed)})`,
				`classifier.resolvesCommonJS(${module}, ${JSON.stringify(installed)})`,
				`classifier.resolvesCommonJS(${dual}, ${JSON.stringify(installed)})`,
				`classifier.resolvesCommonJS(${extensionless}, ${JSON.stringify(installed)})`,
				`classifier.resolvesCommonJS(${nested}, ${JSON.stringify(installed)})`,
				`classifier.resolvesCommonJS(${malformed}, ${JSON.stringify(installed)})`,
				`classifier.resolvesCommonJS(${directory}, ${JSON.stringify(installed)})`,
				`classifier.declaresCommonJS(${declarationCommonRuntimeModule}, ${JSON.stringify(installed)})`,
				`classifier.declaresCommonJS(${declarationModuleRuntimeCommon}, ${JSON.stringify(installed)})`,
				`classifier.selectEntries([{ subpath: './dual', mapping: ${dual}, commonjs: true }, { subpath: './module', mapping: ${module}, commonjs: false }], classifier.BUNDLER_CONDITIONS.commonjs).map((entry) => entry.subpath)`,
			])

			expect(answers).toStrictEqual([
				false,
				true,
				false,
				true,
				false,
				true,
				true,
				false,
				false,
				false,
				true,
				false,
				['./dual'],
			])
		} finally {
			workspace.destroy()
		}
	})

	it('classifies staged exports by browser reachability and runtime format', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-stage-classification-',
		})
		try {
			const file = stageDistributionClassification(workspace)
			const installed = workspace.ensure('installed')
			workspace.write('installed/package.json', '{ "type": "module" }\n')
			workspace.write('installed/common.d.cts', 'export const value: number\n')
			workspace.write('installed/module.d.mts', 'export const value: number\n')
			workspace.write('installed/invalid.d.cts', 'export const value: number\n')
			workspace.write('installed/esm.d.mts', 'export const value: number\n')
			workspace.write('installed/browser.d.ts', 'export const value: number\n')
			workspace.write('installed/sync.d.cts', 'export const value: number\n')
			workspace.write('installed/addon.d.cts', 'export const value: number\n')
			const manifest = {
				exports: {
					'./decl-cts-rt-mjs': {
						require: { types: './common.d.cts', default: './runtime.mjs' },
					},
					'./decl-mts-rt-cjs': {
						require: { types: './module.d.mts', default: './runtime.cjs' },
					},
					'./invalid': {
						require: { types: './invalid.d.cts', default: '../outside.cjs' },
					},
					'./esm-only': {
						import: { types: './esm.d.mts', default: './esm.mjs' },
					},
					'./browser': {
						types: './browser.d.ts',
						browser: './dist/src/browser/index.js',
						import: './dist/src/core/index.js',
					},
					'./javascript-require': { require: './javascript.cjs' },
					'./module-sync': {
						types: './sync.d.cts',
						'module-sync': './sync.mjs',
					},
					'./node-addons': {
						types: './addon.d.cts',
						'node-addons': './addon.node',
					},
					'./undeclared': './feature.cjs',
					'./package.json': './package.json',
				},
			}
			const answers = driveClassifier(file, [
				`classifier.classifyStage(${JSON.stringify(manifest)}, ${JSON.stringify(installed)}, 'sample-package')`,
			])

			expect(answers).toStrictEqual([
				{
					entries: [
						{
							subpath: './decl-cts-rt-mjs',
							specifier: 'sample-package/decl-cts-rt-mjs',
							mapping: manifest.exports['./decl-cts-rt-mjs'],
							declaration: {
								module: undefined,
								commonjs: join(installed, './common.d.cts'),
								browser: undefined,
							},
							browser: false,
							module: false,
							commonjs: false,
							required: true,
						},
						{
							subpath: './decl-mts-rt-cjs',
							specifier: 'sample-package/decl-mts-rt-cjs',
							mapping: manifest.exports['./decl-mts-rt-cjs'],
							declaration: {
								module: undefined,
								commonjs: join(installed, './module.d.mts'),
								browser: undefined,
							},
							browser: false,
							module: false,
							commonjs: true,
							required: true,
						},
						{
							subpath: './invalid',
							specifier: 'sample-package/invalid',
							mapping: manifest.exports['./invalid'],
							declaration: {
								module: undefined,
								commonjs: join(installed, './invalid.d.cts'),
								browser: undefined,
							},
							browser: false,
							module: false,
							commonjs: true,
							required: true,
						},
						{
							subpath: './esm-only',
							specifier: 'sample-package/esm-only',
							mapping: manifest.exports['./esm-only'],
							declaration: {
								module: join(installed, './esm.d.mts'),
								commonjs: undefined,
								browser: join(installed, './esm.d.mts'),
							},
							browser: false,
							module: true,
							commonjs: false,
							required: false,
						},
						{
							subpath: './browser',
							specifier: 'sample-package/browser',
							mapping: manifest.exports['./browser'],
							declaration: {
								module: join(installed, './browser.d.ts'),
								commonjs: join(installed, './browser.d.ts'),
								browser: join(installed, './browser.d.ts'),
							},
							browser: true,
							module: true,
							commonjs: false,
							required: false,
						},
						{
							subpath: './module-sync',
							specifier: 'sample-package/module-sync',
							mapping: manifest.exports['./module-sync'],
							declaration: {
								module: join(installed, './sync.d.cts'),
								commonjs: join(installed, './sync.d.cts'),
								browser: join(installed, './sync.d.cts'),
							},
							browser: false,
							module: true,
							commonjs: false,
							required: true,
						},
						{
							subpath: './node-addons',
							specifier: 'sample-package/node-addons',
							mapping: manifest.exports['./node-addons'],
							declaration: {
								module: join(installed, './addon.d.cts'),
								commonjs: join(installed, './addon.d.cts'),
								browser: join(installed, './addon.d.cts'),
							},
							browser: false,
							module: true,
							commonjs: true,
							required: true,
						},
					],
					targets: [
						'./common.d.cts',
						'./runtime.mjs',
						'./module.d.mts',
						'./runtime.cjs',
						'./invalid.d.cts',
						'../outside.cjs',
						'./esm.d.mts',
						'./esm.mjs',
						'./browser.d.ts',
						'./dist/src/browser/index.js',
						'./dist/src/core/index.js',
						'./javascript.cjs',
						'./sync.d.cts',
						'./sync.mjs',
						'./addon.d.cts',
						'./addon.node',
						'./feature.cjs',
						'./package.json',
					],
					subpaths: [
						'./decl-cts-rt-mjs',
						'./decl-mts-rt-cjs',
						'./invalid',
						'./esm-only',
						'./browser',
						'./javascript-require',
						'./module-sync',
						'./node-addons',
						'./undeclared',
						'./package.json',
					],
					undeclared: ['./javascript-require', './undeclared'],
					excluded: ['./package.json'],
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	it('excludes browser artifacts from the CommonJS claim assertion', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-commonjs-unclaimed-',
		})
		try {
			const file = stageDistributionClassification(workspace)
			const installed = workspace.ensure('installed')
			workspace.write('installed/package.json', '{ "type": "commonjs" }\n')
			workspace.write('installed/dist/src/browser/index.d.ts', 'export const value: number\n')
			const unclaimed = {
				exports: {
					'.': {
						types: './dist/src/browser/index.d.ts',
						import: './dist/src/browser/index.js',
						default: './dist/src/browser/index.js',
					},
				},
			}
			const declared = {
				exports: {
					'.': {
						types: './dist/src/browser/index.d.ts',
						import: './dist/src/browser/index.js',
						require: './dist/src/browser/index.js',
					},
				},
			}
			const answers = driveClassifier(file, [
				`classifier.selectUntypable(classifier.classifyStage(${JSON.stringify(unclaimed)}, ${JSON.stringify(installed)}, 'unclaimed').entries, ${JSON.stringify(installed)}).map((entry) => entry.subpath)`,
				`classifier.selectUntypable(classifier.classifyStage(${JSON.stringify(declared)}, ${JSON.stringify(installed)}, 'declared').entries, ${JSON.stringify(installed)}).map((entry) => entry.subpath)`,
				`classifier.classifyStage(${JSON.stringify(declared)}, ${JSON.stringify(installed)}, 'declared').entries.map((entry) => ({ commonjs: entry.commonjs, required: entry.required }))`,
			])

			expect(answers).toStrictEqual([[], [], [{ commonjs: false, required: false }]])
		} finally {
			workspace.destroy()
		}
	})

	it('names an incompatible declaration under an explicit CommonJS claim', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-commonjs-untypable-',
		})
		try {
			const file = stageDistributionClassification(workspace)
			const installed = workspace.ensure('installed')
			workspace.write('installed/package.json', '{ "type": "module" }\n')
			workspace.write('installed/module.d.mts', 'export const value: number\n')
			workspace.write('installed/common.d.cts', 'export const value: number\n')
			const incompatible = {
				exports: {
					'.': { require: { types: './module.d.mts', default: './runtime.cjs' } },
				},
			}
			const compatible = {
				exports: {
					'.': { require: { types: './common.d.cts', default: './runtime.cjs' } },
				},
			}
			const answers = driveClassifier(file, [
				`classifier.selectUntypable(classifier.classifyStage(${JSON.stringify(incompatible)}, ${JSON.stringify(installed)}, 'incompatible').entries, ${JSON.stringify(installed)}).map((entry) => entry.subpath)`,
				`classifier.selectUntypable(classifier.classifyStage(${JSON.stringify(compatible)}, ${JSON.stringify(installed)}, 'compatible').entries, ${JSON.stringify(installed)}).map((entry) => entry.subpath)`,
			])

			expect(answers).toStrictEqual([['.'], []])
		} finally {
			workspace.destroy()
		}
	})

	it('keeps an invalid non-list CommonJS target for the runtime drive to report', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-invalid-commonjs-target-',
		})
		try {
			const file = stageDistributionClassification(workspace)
			const installed = workspace.ensure('installed')
			workspace.write('installed/package.json', '{ "type": "module" }\n')
			workspace.write('installed/index.d.cts', 'export const value: number\n')
			const manifest = {
				exports: {
					'.': {
						require: { types: './index.d.cts', default: '../outside.cjs' },
					},
				},
			}
			const answers = driveClassifier(file, [
				`classifier.classifyStage(${JSON.stringify(manifest)}, ${JSON.stringify(installed)}, 'invalid-target').entries.map((entry) => ({ subpath: entry.subpath, commonjs: entry.commonjs, required: entry.required }))`,
			])
			const consumer = workspace.ensure('consumer')
			workspace.write('consumer/package.json', '{ "private": true }\n')
			workspace.write(
				'consumer/node_modules/invalid-target/package.json',
				`${JSON.stringify({ name: 'invalid-target', exports: manifest.exports }, undefined, '\t')}\n`,
			)

			expect(answers).toStrictEqual([[{ subpath: '.', commonjs: true, required: true }]])
			expect(() =>
				execFileSync(process.execPath, ['--eval', "require('invalid-target')"], {
					cwd: consumer,
					stdio: 'pipe',
				}),
			).toThrow(/ERR_INVALID_PACKAGE_TARGET/u)
		} finally {
			workspace.destroy()
		}
	})

	it('skips invalid package targets only inside fallback arrays', () => {
		const workspace = createScratch({
			parent: ensureTmpRoot(),
			prefix: 'scaffold-e2-package-target-',
		})
		try {
			const file = stageDistributionClassifier(workspace)
			const answers = driveClassifier(file, [
				`classifier.resolveTarget(['../outside.cjs', './valid.cjs'], ['import'])`,
				`classifier.collectTargets(['../outside.cjs', './valid.cjs'])`,
				`classifier.resolveTarget('../outside.cjs', ['import'])`,
				`classifier.collectTargets('../outside.cjs')`,
				`classifier.resolveTarget(['./x/../outside.cjs', './valid.cjs'], ['import'])`,
				`classifier.resolveTarget(['./x//missing.cjs', './valid.cjs'], ['import'])`,
				`classifier.resolveTarget(['./x%2fmissing.cjs', './valid.cjs'], ['import'])`,
			])

			expect(answers).toStrictEqual([
				'./valid.cjs',
				['./valid.cjs'],
				'../outside.cjs',
				['../outside.cjs'],
				'./valid.cjs',
				'./x//missing.cjs',
				'./x%2fmissing.cjs',
			])
		} finally {
			workspace.destroy()
		}
	})

	// The control on the lift itself: a name the proof does not declare stops the
	// extraction, so a drive above reports on declarations that were really carried
	// across rather than on a module that quietly lost them.
	it('refuses to lift a declaration the emitted proof does not carry', () => {
		const [proof] = blueprintToTestArtifacts(createBlueprint('sample', { src: ['core'] })).filter(
			({ path }) => path === 'tests/distribution.test.ts',
		)
		const content = requireValue(proof?.content)

		expect(() => extractDeclarations(content, ['resolveTarget', 'resolveNothing'])).toThrow(
			'declares no resolveNothing',
		)
		expect(extractDeclarations(content, ['isModule'])).toContain('export { isModule }')
	})
})
