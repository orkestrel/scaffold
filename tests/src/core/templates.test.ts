import type { Blueprint, Environment } from '@src/core'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { isString } from '@orkestrel/contract'
import { fillTemplate, isTemplateError } from '@orkestrel/template'
import {
	ARTIFACT_TEMPLATES,
	blueprintToConfigArtifacts,
	blueprintToDevDependencies,
	blueprintToSourceArtifacts,
	blueprintToTestArtifacts,
	CONFIG_TEMPLATES,
	createBlueprint,
	createCompiler,
	MAX_NAME_LENGTH,
} from '@src/core'
import { describe, expect, it } from 'vitest'

// The vendored `.oxfmtrc.json` a generated workspace receives: a tab prints as two
// columns and a line is printed to fit one hundred of them. The emitted text
// conforms to those bytes, never the reverse, so every width here is measured
// against them rather than against a width this package would prefer.
const PRINT_WIDTH = 100
const TAB_COLUMNS = '  '
// The specifiers the vendored `import/no-unassigned-import` rule exempts.
const STYLE_IMPORT = /^import\s+'[^']+\.(?:css|less|sass|scss|styl|stylus|pcss|postcss|sss)'/u
// `@vitejs/plugin-vue` is the one specifier an emitted browser configuration names
// that this repository does not install, because scaffold generates a Vue
// application without being one. Declaring its shape lets the typecheck reach the
// question asked here, which is about the project array and never about the
// plugin; the control below is the exact defect, so a clean run cannot be a
// typecheck that resolved nothing.
const VUE_DECLARATION = `declare module '@vitejs/plugin-vue' {
	import type { PluginOption } from 'vite'
	const plugin: (...options: never[]) => PluginOption
	export default plugin
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
// The population the three sweeps below walk, stated as the relation it actually
// is: one entry per (blueprint, module path) pair the selection matrix emits,
// projected onto the path as the number of the 126 blueprints that emit it. The
// union of those paths is a weaker claim and does not stand in for this one. One
// maximal blueprint emits all 29 paths by itself, so under a union assertion 125
// of the 126 could emit nothing and nothing would move; the counts move for any
// selection that stops emitting anything. The control beside the first sweep
// runs that exact narrowing.
const MODULE_EMITTERS: Readonly<Record<string, number>> = Object.freeze({
	'app/browser/index.ts': 64,
	'app/browser/main.ts': 64,
	'app/core/index.ts': 64,
	'app/server/index.ts': 64,
	'app/server/main.ts': 64,
	'configs/app/vite.browser.config.ts': 64,
	'configs/app/vite.server.config.ts': 64,
	'configs/app/vite.showcase.config.ts': 32,
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
	'tests/integration.test.ts': 56,
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

// Every selection the compiler accepts, in both structural states it branches on.
// A shape is emitted for each of the 63 non-empty `src` x `app` pairs twice: once
// with no structural fact set, and once with every one of them set, so no
// conditional span is measured in one state alone.
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

// The emitted root configuration and the two files a typecheck of it has to
// resolve: the vendored boundary helpers, copied from this checkout because a
// generated workspace receives those exact bytes, and the plugin declaration
// above. Everything else the configuration names is installed here.
function stageRootConfig(blueprint: Blueprint, root: string): void {
	mkdirSync(join(root, 'configs'), { recursive: true })
	for (const artifact of blueprintToConfigArtifacts(blueprint)) {
		if (artifact.origin === 'host') continue
		if (artifact.path !== 'vite.config.ts' && artifact.path !== 'tsconfig.json') continue
		writeFileSync(join(root, artifact.path), artifact.content)
	}
	writeFileSync(
		join(root, 'configs/helpers.ts'),
		readFileSync(resolve('configs/helpers.ts'), 'utf8'),
	)
	writeFileSync(join(root, 'vue.d.ts'), VUE_DECLARATION)
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
		expect(artifacts).toHaveLength(16)
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
		const root = mkdtempSync(join(tmpdir(), 'scaffold-e2-format-'))
		const control = join(root, 'control')
		const corpus = join(root, 'corpus')
		const formatter = resolve('node_modules/oxfmt/bin/oxfmt')
		const config = resolve('.oxfmtrc.json')
		try {
			mkdirSync(control, { recursive: true })
			const controlPath = join(control, 'outside-emitted-population.ts')
			const controlBefore = 'export const projects = [\n\tone,\n]\n'
			writeFileSync(controlPath, controlBefore)
			execFileSync(process.execPath, [formatter, '--config', config, '--write', control], {
				stdio: 'pipe',
			})
			expect(readFileSync(controlPath, 'utf8')).not.toBe(controlBefore)

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
					services: ['ollama'],
				}),
				createBlueprint('server-only', { src: ['server'] }),
				createBlueprint('application', {
					app: ['core', 'browser', 'server'],
					integration: true,
					global: true,
					showcase: true,
				}),
				createBlueprint('unshowcased', { app: ['core', 'browser', 'server'] }),
				createBlueprint('a'.repeat(22), { src: ['core', 'server'] }),
				createBlueprint('a'.repeat(23), { src: ['core', 'server'] }),
				createBlueprint('a'.repeat(MAX_NAME_LENGTH), {
					src: ['core', 'server'],
					app: ['core', 'browser', 'server'],
					bin: true,
					integration: true,
					global: true,
					showcase: true,
					services: ['ollama', 'postgres'],
				}),
			]
			const expected = new Map<string, string>()
			for (const [index, blueprint] of blueprints.entries()) {
				const compiler = createCompiler()
				const plan = compiler.compile(blueprint).plan
				compiler.destroy()
				if (plan === undefined) throw new Error('The format corpus blueprint was blocked')
				for (const artifact of plan.artifacts) {
					if (artifact.origin === 'host') continue
					expect(artifact.content).not.toMatch(/\{\{[^{}]+\}\}/u)
					const path = join(corpus, String(index), artifact.path)
					mkdirSync(dirname(path), { recursive: true })
					writeFileSync(path, artifact.content)
					expected.set(path, artifact.content)
				}
			}
			for (const length of [46, 47]) {
				const blueprint = createBlueprint('a'.repeat(length), { src: ['core'], bin: true })
				for (const artifact of blueprintToTestArtifacts(blueprint)) {
					const path = join(corpus, `bin-boundary-${length}`, artifact.path)
					mkdirSync(dirname(path), { recursive: true })
					writeFileSync(path, artifact.content)
					expected.set(path, artifact.content)
				}
			}
			execFileSync(process.execPath, [formatter, '--config', config, '--write', corpus], {
				stdio: 'pipe',
			})
			for (const [path, content] of expected) {
				expect(readFileSync(path, 'utf8')).toBe(content)
			}
		} finally {
			rmSync(root, { recursive: true, force: true })
		}
	})
})

// A generated workspace vendors `format:check` and `lint:check` and runs both on
// the bytes `new` just wrote, so the emitted text is measured against the vendored
// rules directly here. Each instrument's population is every (blueprint, module)
// pair the matrix emits — 2015 of them over 126 blueprints — and each sweep states
// that population as `MODULE_EMITTERS` before the empty finding it draws from it,
// because an empty corpus reports the same empty finding as a clean one. Each rule
// carries a control drawn from outside the emitted population as well, because an
// instrument that has never reported is not evidence that the corpus is clean.
describe('emitted workspaces under their own gates', () => {
	it('counts every selection that emits each module', () => {
		expect(countEmitters(buildSelections())).toStrictEqual(MODULE_EMITTERS)

		// The control is the matrix one selection short, which is outside the
		// population `MODULE_EMITTERS` covers because that population is the pairs
		// all 126 blueprints emit. `browser+server` is the selection every one of
		// whose modules another selection also emits, so the union of paths is
		// bit-identical without it — the assertion these sweeps used to make passes
		// on a corpus missing 30 blueprints. The relation is what moves.
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
	// `new` just wrote, so the emitted project array is measured against Vitest's
	// real published type here rather than against a description of it.
	it('emits a browser project entry Vitest accepts', () => {
		mkdirSync(resolve('tmp'), { recursive: true })
		const root = mkdtempSync(join(resolve('tmp'), 'scaffold-e2-types-'))
		try {
			stageRootConfig(createBlueprint('sample', { app: ['browser'] }), root)
			const emitted = readFileSync(join(root, 'vite.config.ts'), 'utf8')
			expect(checkTypes(root)).toBe('')

			// The control is the row this compiler emitted before the fix: a bare
			// factory reference, which Vitest reads as a `UserProjectConfigFn` and
			// calls with a `ConfigEnv` the factory refuses. It is outside the emitted
			// population, because no selection emits it any more.
			expect(emitted).toContain('\t\t\tappBrowser(),')
			// The evaluated row carries no function name, so the vendored `config`
			// proof finds it by the label instead. That label is emitted here, and the
			// two have to agree or a generated browser workspace fails its own `test`
			// script while passing its `check` script.
			expect(emitted).toContain("name: { label: 'app:browser', color: 'blue' }")
			writeFileSync(
				join(root, 'vite.config.ts'),
				emitted.replace('\t\t\tappBrowser(),', '\t\t\tappBrowser,'),
			)
			expect(checkTypes(root)).toContain("is not assignable to type 'TestProjectConfiguration'")
		} finally {
			rmSync(root, { recursive: true, force: true })
		}
	})

	it('prints no line past the vendored width the formatter could have broken', () => {
		// Three tabs print as six columns, so the first control is one column past
		// the width and the second sits exactly on it. The third is far past it by a
		// literal on a line of its own, which is the one excess the formatter leaves
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
