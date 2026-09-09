import type { Question } from '@src/core'
import type { GuideModule } from '@orkestrel/guide'
import { GuideCommand } from '@orkestrel/guide/server'
import { readInventory } from '@orkestrel/test/server'
import { createVitest } from 'vitest/node'

const PATTERNS: readonly string[] = ['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md']
const FENCE_LANGUAGES: readonly string[] = Object.freeze(['sh', 'text', 'ts'])
const EXAMPLE_LANGUAGE = 'ts'
const MODULES: Readonly<Record<string, GuideModule>> = Object.freeze({
	'@orkestrel/scaffold': 'src/core',
	'@orkestrel/scaffold/server': 'src/server',
})

await new GuideCommand({
	root: new URL('../', import.meta.url),
	patterns: PATTERNS,
	modules: MODULES,
	languages: FENCE_LANGUAGES,
	language: EXAMPLE_LANGUAGE,
	reader: readInventory,
	runner: createVitest,
}).execute(async ({ files, report, root, rows }) => {
	const { isArray, isRecord } = await import('@orkestrel/contract')
	const { createGuide } = await import('@orkestrel/guide')
	const { requireValue } = await import('@orkestrel/test')
	const { createScratch } = await import('@orkestrel/test/server')
	const {
		ARTIFACT_TEMPLATES,
		blueprintToTestArtifacts,
		Compiler,
		createBlueprint,
		isQuestion,
		isScaffoldError,
		ScaffoldError,
	} = await import('@src/core')
	const { describe, expect, it } = await import('vitest')
	const { renderUsage } = await import('../src/bin/helpers.js')
	const { CLI } = await import('../src/bin/CLI.js')
	const { buildTargetManifest, createSink, createStagedHost, driveClassifier, readStatements } =
		await import('./setupServer.js')

	describe('guides', () => {
		it('indexes every manifest input', () => {
			expect(root.length).toBeGreaterThan(0)
			expect(report.input).toEqual([])
			expect(rows.length).toBeGreaterThan(0)
		})

		it('keeps direct, barrel, and documented surfaces aligned', () => {
			expect(report.surface).toEqual([])
		})

		it('carries every required section and a documented method group', () => {
			expect(report.sections).toEqual([])
		})

		it('documents every behavioural declaration and exact named class contract', () => {
			expect(report.declarations).toEqual([])
		})

		it('resolves every relative link to a real file', () => {
			expect(report.links).toEqual([])
		})

		it('links a non-vacuous test population', () => {
			expect(report.tests).toEqual([])
		})

		it('uses only admitted fence languages', () => {
			expect(report.fences).toEqual([])
		})

		it('carries an example fence in the configured language', () => {
			expect(report.examples.fences).toEqual([])
		})

		it('imports only real exports in its code fences', () => {
			expect(report.imports).toEqual([])
		})

		it('keeps every compared summary and example equal to its source', () => {
			expect(report.drift).toEqual([])
		})

		it('opens the README with the guide tagline', () => {
			expect(report.pitch).toEqual([])
			const readme = createGuide(requireValue(files['README.md']))
			const documented = requireValue(rows.find(({ entry }) => entry.spec === 'guides/scaffold.md'))
			expect(readme.tagline()).toBe(documented.guide.tagline())
		})

		it('pairs a top-level example title across the guide and the source', () => {
			const documented = requireValue(rows.find(({ entry }) => entry.spec === 'guides/scaffold.md'))
			expect(
				report.examples.titles.filter((finding) => finding.spec === documented.entry.spec),
			).toEqual([])
		})

		it('publishes HostFile without the former Copy row type', () => {
			const names = rows.flatMap(({ source }) => source.surface().map((symbol) => symbol.name))
			expect(names).toContain('HostFile')
			expect(names).not.toContain('Copy')
		})

		it('publishes Worktree without the former Repository contract', () => {
			const names = rows.flatMap(({ source }) => source.surface().map((symbol) => symbol.name))
			expect(names).toContain('Worktree')
			expect(names).not.toContain('Repository')
		})

		it('publishes read without the former files reader method', () => {
			const methods = rows.flatMap(({ source }) =>
				source.methods('UpstreamInterface').map((method) => method.name),
			)
			expect(methods).toContain('read')
			expect(methods).not.toContain('files')
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
			if (reference === undefined)
				throw new Error('The scaffold guide carries no command reference')
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
				const readings: Array<readonly Question[]> = []
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
						!isArray(parsed.questions) ||
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

		it('skips rejected package targets only while traversing fallback lists', async () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				'`node_modules` segment is skipped rather than resolved or collected',
			)
			const proof = blueprintToTestArtifacts(createBlueprint('sample', { src: ['core'] })).find(
				({ path }) => path === 'tests/distribution.test.ts',
			)
			const content = requireValue(proof?.content)
			const names = [
				'isRecord',
				'isList',
				'isPackageTarget',
				'resolvePackageTarget',
				'resolveTarget',
				'collectTargets',
			]
			// The parser names the declarations and their extents, so the lift carries the
			// emitted text whatever width the formatter printed it at, and a name the proof
			// stopped declaring fails the order assertion rather than thinning the drive.
			const declarations: string[] = []
			const declared: string[] = []
			for (const statement of readStatements(content, 'distribution.test.ts')) {
				if (statement.syntax !== 'FunctionDeclaration') continue
				for (const { name } of statement.declarations) {
					if (!names.includes(name)) continue
					declared.push(name)
					declarations.push(statement.text)
				}
			}
			expect(declared).toStrictEqual(names)
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
			const answers = await driveClassifier(
				`${declarations.join('\n\n')}\n\nexport { ${names.join(', ')} }\n`,
				calls,
			)
			expect(answers).toStrictEqual(expected)
		})

		it('documents declaration substitution and each runtime condition set', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain('`.cjs` maps to `.d.cts`, `.mjs` maps to `.d.mts`')
			expect(markdown).toContain('and `.js` maps to `.d.ts`')
			expect(markdown).toContain('`node-addons`, `node`, `require`, and `module-sync`')
			expect(markdown).toContain('A directory named `package.json` starts no scope')
		})
	})
})
