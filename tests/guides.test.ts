import type { Question } from '@src/core'
import { isRecord } from '@orkestrel/contract'
import {
	createGuide,
	createSource,
	fenceImports,
	findMissing,
	findUnlisted,
	isExternalLink,
	METHODS,
	missingSymbols,
	parseManifest,
	resolveLink,
	SURFACE,
	TESTS,
} from '@orkestrel/guide'
import { requireValue } from '@orkestrel/test'
import { createScratch } from '@orkestrel/test/server'
import {
	ARTIFACT_TEMPLATES,
	blueprintToTestArtifacts,
	Compiler,
	createBlueprint,
	isQuestion,
	isScaffoldError,
	ScaffoldError,
} from '@src/core'
import { globSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { runInNewContext } from 'node:vm'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'
import { renderUsage } from '../src/bin/helpers.js'
import { CLI } from '../src/bin/CLI.js'
import { buildTargetManifest, createSink, createStagedHost } from './setupServer.js'

// The inventory the extractor reflects over. `Source` never touches disk, so the
// consumer gathers the files; the root is resolved from this module rather than
// from the process, so the reading does not depend on where the runner started.
// Keys are root-relative with forward slashes, because that is the shape module
// scoping, link resolution, and the existence check all read.
// This repository's guides carry shell and plain-text fences beside the TypeScript ones,
// so the language list is wider than the fleet's usual `['ts']` and only `ts` fences carry
// imports worth checking.
const FENCE_LANGUAGES = Object.freeze(['sh', 'text', 'ts'])
const EXAMPLE_LANGUAGE = 'ts'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const files: Record<string, string> = {}
for (const key of globSync(['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md'], {
	cwd: root,
})) {
	files[key.replaceAll('\\', '/')] = readFileSync(resolve(root, key), 'utf8')
}

// `guides/README.md` is the map, so it decides what this proof covers. Each row
// of its concept index names one guide and the source directories that guide
// documents. The vendored dependency mirrors beside it are not rows: each
// documents another package's surface and the catalog verb refetches it, so
// nothing in this repository is their bijection partner.
const index = files['guides/README.md']
if (index === undefined) throw new Error('The inventory carries no guides/README.md to index from')
const inspected = parseManifest(index, 'guides').map((entry) => {
	const markdown = files[entry.spec]
	if (markdown === undefined) {
		throw new Error(`The concept index names ${entry.spec}, which the inventory does not carry`)
	}
	return {
		entry,
		guide: createGuide(markdown),
		source: createSource({ files, module: entry.source }),
	}
})

describe('guides', () => {
	it('indexes at least one guide', () => {
		expect(inspected.length).toBeGreaterThan(0)
	})

	it('extracts a non-vacuous surface, methods, and tests section', () => {
		const vacant: string[] = []
		for (const { entry, guide } of inspected) {
			const sections = guide.sections()
			for (const heading of [SURFACE, METHODS, TESTS]) {
				if (!sections.includes(heading)) vacant.push(`${entry.spec}: no ## ${heading} section`)
			}
			if (guide.surface().length === 0) vacant.push(`${entry.spec}: the surface section is empty`)
			if (guide.methods().length === 0) vacant.push(`${entry.spec}: the methods section is empty`)
			if (guide.tests().length === 0) vacant.push(`${entry.spec}: the tests section is empty`)
			const examples = guide.fences().filter((fence) => fence.language === EXAMPLE_LANGUAGE)
			if (examples.length === 0) vacant.push(`${entry.spec}: no code fence`)
			for (const language of findUnlisted(guide.fences(), FENCE_LANGUAGES)) {
				vacant.push(`${entry.spec}: unlisted fence language ${language}`)
			}
		}
		expect(vacant).toEqual([])
	})

	it('documents every barrel-reachable export', () => {
		const undocumented: string[] = []
		for (const { entry, guide, source } of inspected) {
			for (const key of missingSymbols(source.surface(), guide.surface())) {
				undocumented.push(`${entry.spec}: ${key}`)
			}
		}
		expect(undocumented).toEqual([])
	})

	it('documents nothing the barrels do not export', () => {
		const invented: string[] = []
		for (const { entry, guide, source } of inspected) {
			for (const key of missingSymbols(guide.surface(), source.surface())) {
				invented.push(`${entry.spec}: ${key}`)
			}
		}
		expect(invented).toEqual([])
	})

	it('documents the members of every behavioural declaration', () => {
		const drifted: string[] = []
		for (const { entry, guide, source } of inspected) {
			const documented = guide.methods().map((group) => group.interface)
			const declared = new Set(source.surface().map((symbol) => symbol.name))
			for (const group of guide.methods()) {
				const listed = [...group.methods].sort().join(', ')
				const members = source.methods(group.interface).join(', ')
				if (listed !== members) {
					drifted.push(`${entry.spec}: ${group.interface} documents ${listed}, declares ${members}`)
				}
			}
			for (const symbol of source.surface()) {
				if (symbol.kind !== 'interface' && symbol.kind !== 'class') continue
				const members = source.methods(symbol.name)
				if (members.length === 0) continue
				// A class implementing a documented contract is proven against that
				// contract instead of documented twice: the guide's table belongs to the
				// interface, and the class owes it exactly, nothing missing and nothing
				// extra. Everything else owes a table of its own.
				const contract = `${symbol.name}Interface`
				const implementing = symbol.kind === 'class' && declared.has(contract)
				const owed = implementing ? source.methods(contract).join(', ') : undefined
				if (owed !== undefined && owed !== members.join(', ')) {
					drifted.push(`${entry.spec}: ${symbol.name} exposes ${members.join(', ')}, owes ${owed}`)
				}
				if (owed === undefined && !documented.includes(symbol.name)) {
					drifted.push(`${entry.spec}: ${symbol.name} declares members and carries no method table`)
				}
			}
		}
		expect(drifted).toEqual([])
	})

	it('publishes HostFile without the former Copy row type', () => {
		const names = inspected.flatMap(({ source }) => source.surface().map((symbol) => symbol.name))
		expect(names).toContain('HostFile')
		expect(names).not.toContain('Copy')
	})

	it('publishes Worktree without the former Repository contract', () => {
		const names = inspected.flatMap(({ source }) => source.surface().map((symbol) => symbol.name))
		expect(names).toContain('Worktree')
		expect(names).not.toContain('Repository')
	})

	it('publishes read without the former files reader method', () => {
		const methods = inspected.flatMap(({ source }) => source.methods('UpstreamInterface'))
		expect(methods).toContain('read')
		expect(methods).not.toContain('files')
	})

	it('resolves every relative link to a real file', () => {
		const broken: string[] = []
		for (const { entry, guide, source } of inspected) {
			for (const href of guide.links()) {
				if (isExternalLink(href)) continue
				if (!source.exists(resolveLink(entry.spec, href))) broken.push(`${entry.spec}: ${href}`)
			}
		}
		expect(broken).toEqual([])
	})

	it('imports only real exports in its code fences', () => {
		const undeclared: string[] = []
		for (const { entry, guide, source } of inspected) {
			const names = source.surface().map((symbol) => symbol.name)
			for (const fence of guide.fences()) {
				if (fence.language !== EXAMPLE_LANGUAGE) continue
				for (const statement of fenceImports(fence.code)) {
					if (!statement.specifier.startsWith('@orkestrel/scaffold')) continue
					for (const name of findMissing(statement.names, names)) {
						undeclared.push(`${entry.spec}: ${statement.specifier} exports no ${name}`)
					}
				}
			}
		}
		expect(undeclared).toEqual([])
	})
})

describe('guide examples', () => {
	it('keeps the command reference aligned with rendered usage', () => {
		const markdown = files['guides/scaffold.md']
		if (markdown === undefined) throw new Error('The inventory carries no scaffold guide')
		const matched = markdown.match(
			/`scaffold --help` prints the whole reference:\r?\n\r?\n```text\r?\n([\s\S]*?)\r?\n```/,
		)
		const reference = matched?.[1]
		if (reference === undefined) throw new Error('The scaffold guide carries no command reference')
		expect(reference).toBe(renderUsage().join('\n'))
	})

	it('executes the blueprint defaults example', () => {
		const blueprint = createBlueprint('router', {
			src: ['core', 'server'],
			dependencies: [{ name: '@orkestrel/emitter', range: '^0.0.5' }],
			bin: true,
		})

		expect(blueprint.version).toBe('0.0.1')
		expect(blueprint.engines).toBe('>=22.12.0')
	})

	it('executes the compile refusal example', () => {
		const compiler = new Compiler()
		try {
			const scaffolding = compiler.compile(
				createBlueprint('router', { src: ['browser', 'server'] }),
			)

			expect(scaffolding.plan === undefined || scaffolding.questions.length > 0).toBe(true)
		} finally {
			compiler.destroy()
		}
	})

	it('executes the error-code narrowing example', () => {
		let code: string | undefined
		try {
			throw new ScaffoldError('TARGET', 'The target carries no readable manifest.')
		} catch (error) {
			if (!isScaffoldError(error)) throw error
			code = error.code
		}
		expect(code).toBe('TARGET')
	})

	it('reports a retained setup seed when the planned release seed differs', async () => {
		const markdown = requireValue(files['guides/scaffold.md'])
		expect(markdown).toContain('raises the question on every target materialized before it')
		const workspace = createScratch({ prefix: 'scaffold-guide-release-skew-' })
		try {
			const host = createStagedHost(workspace)
			const target = workspace.ensure('target')
			const blueprint = createBlueprint('sample', { src: ['core'], global: true })
			workspace.write('target/package.json', buildTargetManifest(blueprint))
			workspace.ensure('target/src/core')
			const retained = `export function setup(): void {
	return
}
`
			const readings: Question[][] = []
			for (const content of [ARTIFACT_TEMPLATES.tests.global, retained]) {
				workspace.write('target/tests/setupGlobal.ts', content)
				const sink = createSink()
				await new CLI(sink.options).execute([
					'audit',
					'--offline',
					'--from',
					host,
					'--target',
					target,
					'--groups',
					'tests',
					'--json',
				])
				const parsed: unknown = JSON.parse(requireValue(sink.output[0]))
				if (
					!isRecord(parsed) ||
					!Array.isArray(parsed.questions) ||
					!parsed.questions.every(isQuestion)
				) {
					throw new Error('The guide audit returned no question list')
				}
				readings.push(parsed.questions)
			}

			const planned = requireValue(readings[0])
			const skewed = requireValue(readings[1])
			expect(planned.filter(({ field }) => field === 'setup')).toStrictEqual([])
			expect(skewed.filter(({ field }) => field === 'setup')).toStrictEqual([
				{
					field: 'setup',
					message: `The target at ${target} carries a test setup module that no proof covers: tests/setupGlobal.ts. Add tests/setupGlobal.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.`,
					blocking: false,
				},
			])
		} finally {
			workspace.destroy()
		}
	})

	it('skips rejected package targets only while traversing fallback lists', () => {
		const markdown = requireValue(files['guides/scaffold.md'])
		expect(markdown).toContain(
			'`node_modules` segment is skipped rather than resolved or collected',
		)
		const proof = blueprintToTestArtifacts(createBlueprint('sample', { src: ['core'] })).find(
			({ path }) => path === 'tests/distribution.test.ts',
		)
		const content = requireValue(proof?.content)
		const source = ts.createSourceFile(
			'distribution.test.ts',
			content,
			ts.ScriptTarget.ESNext,
			true,
		)
		const names = [
			'isRecord',
			'isList',
			'isPackageTarget',
			'resolvePackageTarget',
			'resolveTarget',
			'collectTargets',
		]
		const declarations: string[] = []
		const declared: string[] = []
		for (const statement of source.statements) {
			if (!ts.isFunctionDeclaration(statement) || statement.name === undefined) continue
			if (!names.includes(statement.name.text)) continue
			declared.push(statement.name.text)
			declarations.push(statement.getText(source))
		}
		expect(declared).toStrictEqual(names)
		const compiled = ts.transpileModule(
			`${declarations.join('\n\n')}\n\nexport { ${names.join(', ')} }\n`,
			{
				compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ESNext },
			},
		)
		const classifier: Record<string, unknown> = {}
		runInNewContext(compiled.outputText, { exports: classifier })
		const calls: string[] = []
		const expected: unknown[] = []
		for (const target of [
			'../outside.cjs',
			'./x/./outside.cjs',
			'./x/../outside.cjs',
			'./x/node_modules/outside.cjs',
		]) {
			calls.push(
				`classifier.resolveTarget([${JSON.stringify(target)}, './valid.cjs'], ['import'])`,
				`classifier.collectTargets([${JSON.stringify(target)}, './valid.cjs'])`,
				`classifier.resolveTarget(${JSON.stringify(target)}, ['import'])`,
				`classifier.collectTargets(${JSON.stringify(target)})`,
			)
			expected.push('./valid.cjs', ['./valid.cjs'], target, [target])
		}
		const answers: unknown = runInNewContext(`[${calls.join(', ')}]`, { classifier })
		if (!Array.isArray(answers)) throw new Error('The emitted classifier returned no answer list')
		expect(structuredClone(answers)).toStrictEqual(expected)
	})

	it('documents declaration substitution and each runtime condition set', () => {
		const markdown = requireValue(files['guides/scaffold.md'])
		expect(markdown).toContain('`.cjs` maps to `.d.cts`, `.mjs` maps to `.d.mts`')
		expect(markdown).toContain('and `.js` maps to `.d.ts`')
		expect(markdown).toContain('`node-addons`, `node`, `require`, and `module-sync`')
		expect(markdown).toContain('A directory named `package.json` starts no scope')
	})
})
