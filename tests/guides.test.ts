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
		blueprintToConfigArtifacts,
		blueprintToDevDependencies,
		blueprintToExports,
		blueprintToGuideArtifacts,
		blueprintToMachinery,
		blueprintToManifest,
		blueprintToQuestions,
		blueprintToRootTsconfig,
		blueprintToRootVite,
		blueprintToScripts,
		blueprintToSourceArtifacts,
		blueprintToTestArtifacts,
		blueprintToWritableScripts,
		Compiler,
		createBlueprint,
		FRAMEWORK_MATRIX,
		FRAMEWORKS,
		HOST_PATHS,
		isQuestion,
		isScaffoldError,
		isSheetName,
		isSurface,
		parseExtension,
		RESERVED_SHEET_NAMES,
		ScaffoldError,
		STYLES_DEV_DEPENDENCIES,
	} = await import('@src/core')
	const { describe, expect, it } = await import('vitest')
	const { readFileSync } = await import('node:fs')
	const { join } = await import('node:path')
	const { fileURLToPath } = await import('node:url')
	const { RuleTester } = await import('oxlint/plugins-dev')
	const { computeStamp, resolveApplication, resolveExternal, stampPage } =
		await import('../configs/helpers.js')
	const { NESTED_RULE } = await import('../configs/policy.js')
	const { argvToCommand, renderUsage, selectionToExtensions, targetToExtensions, targetToFacts } =
		await import('../src/bin/helpers.js')
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

		it('states the Node floor the published manifest requires', () => {
			// Read from the manifest rather than from the constant the compiler emits with:
			// what a reader installing this package is gated on is `engines.node` in the
			// published manifest, and the README sentence is a second statement of it that
			// can drift on its own.
			const manifest: unknown = JSON.parse(
				readFileSync(fileURLToPath(new URL('../package.json', import.meta.url)), 'utf8'),
			)
			if (!isRecord(manifest) || !isRecord(manifest.engines)) {
				throw new Error('The package manifest declares no engines record')
			}
			const declared: unknown = manifest.engines.node
			if (typeof declared !== 'string') {
				throw new Error('The package manifest declares no engines.node range')
			}
			const readme = requireValue(files['README.md'])
			const stated = /Node (?<floor>\d+\.\d+\.\d+) or later/u.exec(readme)?.groups?.floor
			expect(stated).toBe(declared.replace(/^>=/u, ''))
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
			expect(blueprint.engines).toBe('>=22.18.0')
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
			expect(markdown).toContain(
				'raises the question on an exporting module retained from that release',
			)
			expect(markdown).toContain('or augmentation-only module with no such line raises no question')
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
				for (const content of [
					ARTIFACT_TEMPLATES.tests.global.module,
					retained,
					"declare module 'vitest' { interface ProvidedContext { readonly capture: boolean } }\n",
				]) {
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
				expect(requireValue(readings[2]).filter(({ field }) => field === 'setup')).toStrictEqual([])
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

	describe('surfaces and extensions', () => {
		it('executes the extension parsing example', () => {
			expect(parseExtension('browser:vue')).toStrictEqual({
				surface: 'browser',
				name: 'vue',
				axes: [],
			})
			expect(parseExtension('styles:print')).toStrictEqual({ surface: 'styles', name: 'print' })
			expect(parseExtension('styles:themes')).toBeUndefined()
			expect(parseExtension('browser:react')).toBeUndefined()
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain('so `styles:print` parses and `themes:print` does not.')
			expect(parseExtension('themes:print')).toBeUndefined()
			const surfaces = [isSurface('browser'), isSurface('styles'), isSurface('themes')]
			expect(surfaces).toStrictEqual([true, true, false])
			expect(FRAMEWORKS).toStrictEqual(['vue'])
			const reserved = ['core', 'browser', 'server', 'bin', 'styles', 'themes', 'vue']
			expect(RESERVED_SHEET_NAMES).toStrictEqual(reserved)
			const names = [isSheetName('print'), isSheetName('styles'), isSheetName('Print')]
			expect(names).toStrictEqual([true, false, false])
		})

		it('executes the styles-only export map example', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain('A styles-only workspace publishes those')
			const blueprint = createBlueprint('paper', { styles: true, themes: true })
			const exports = blueprintToExports(blueprint)

			const keys = ['./styles', './styles/scss', './styles/themes', './styles/themes/scss']
			expect(Object.keys(exports)).toStrictEqual([...keys, './package.json'])
			expect(exports['./styles']).toBe('./dist/src/styles/index.css')
			expect(exports['./styles/scss']).toBe('./src/styles/index.scss')
			const manifest: unknown = JSON.parse(blueprintToManifest(blueprint))
			if (!isRecord(manifest) || !isArray(manifest.files)) {
				throw new Error('The styles-only manifest carries no files list')
			}
			const fields = ['main', 'module', 'types'].filter((key) => Object.hasOwn(manifest, key))
			expect(fields).toStrictEqual([])
			expect(manifest.exports).toStrictEqual(exports)
			expect(manifest.sideEffects).toStrictEqual(['**/*.css', '**/*.scss'])
			const stubs = ['!dist/src/styles/index.js', '!dist/src/styles/themes/index.js']
			expect(manifest.files).toEqual(expect.arrayContaining([...stubs, 'src/styles/**/*.scss']))
			expect(markdown).toContain('Publishing at least one `src` environment or one sheet face is')
			const styled = blueprintToTestArtifacts(createBlueprint('paper', { styles: true }))
			const proof = styled.find(({ path }) => path === 'tests/distribution.test.ts')
			expect(proof?.ownership).toBe('presence')
		})

		it('derives every structural fact and extension from its own markers', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				'Every reading verb derives the structural facts and the extensions from the tree on each run',
			)
			expect(markdown).toContain('A reserved directory name is skipped')
			expect(markdown).toContain('**A face missing one of its markers reads as absent.**')
			const workspace = createScratch({ prefix: 'scaffold-guide-markers-' })
			try {
				const target = workspace.ensure('target')
				const empty = { styles: false, themes: false, showcase: false }
				expect(targetToFacts(target)).toStrictEqual(empty)
				expect(targetToExtensions(target)).toStrictEqual([])
				workspace.write('target/src/styles/index.scss', '')
				workspace.write('target/src/styles/themes/index.scss', '')
				workspace.write('target/src/print/index.scss', '')
				workspace.write('target/src/zeta/sheet.ts', '')
				workspace.write('target/src/core/index.scss', '')
				workspace.write('target/src/core/sheet.ts', '')
				workspace.ensure('target/app/vue')
				const partial = targetToExtensions(target)
				const styled = { styles: true, themes: false, showcase: false }
				expect(targetToFacts(target)).toStrictEqual(styled)
				expect(partial).toStrictEqual([{ surface: 'browser', name: 'vue', axes: ['app'] }])
				const sheets = partial.filter(({ surface }) => surface === 'styles')
				const unread = createBlueprint('paper', { src: ['core'], extensions: sheets })
				const drafted = blueprintToSourceArtifacts(unread).map(({ path }) => path)
				const configured = blueprintToConfigArtifacts(unread).map(({ path }) => path)
				const paths = [...drafted, ...configured]
				expect(paths.filter((path) => path.includes('print'))).toStrictEqual([])
				expect(blueprintToRootVite(unread)).not.toContain('vite.print.config.ts')

				workspace.write('target/src/styles/themes/sheet.ts', '')
				workspace.write('target/src/print/sheet.ts', '')
				workspace.ensure('target/src/vue')
				workspace.ensure('target/showcase')
				const full = targetToExtensions(target)
				const complete = { styles: true, themes: true, showcase: true }
				expect(targetToFacts(target)).toStrictEqual(complete)
				expect(full).toStrictEqual([
					{ surface: 'browser', name: 'vue', axes: ['src', 'app'] },
					{ surface: 'styles', name: 'print' },
				])
				const read = createBlueprint('paper', {
					src: ['core'],
					extensions: full.filter(({ surface }) => surface === 'styles'),
				})
				expect(blueprintToRootVite(read)).toContain("'./configs/src/vite.print.config.ts'")
			} finally {
				workspace.destroy()
			}
		})

		it('refuses each malformed creation selection before it writes', async () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				'`new` refuses each of the following command lines with exit code `2` before it writes a file:',
			)
			const workspace = createScratch({ prefix: 'scaffold-guide-create-' })
			try {
				const target = join(workspace.path, 'paper')
				const refusals: ReadonlyArray<readonly string[]> = [
					['--app', 'browser', '--themes'],
					['--src', 'core', '--showcase'],
					['--app', 'browser', '--extend', 'styles:print'],
					['--src', 'core', '--extend', 'browser:vue'],
					['--app', 'browser', '--extend', 'browser:react'],
					['--styles', '--extend', 'styles:themes'],
					['--app', 'browser', '--extend', 'browser:vue,browser:vue'],
					['--app', 'browser', '--styles', '--extend', 'browser:vue', '--extend', 'styles:print'],
					['--surfaces', 'browser'],
				]
				const codes: number[] = []
				for (const options of refusals) {
					const sink = createSink()
					const argv = ['new', 'paper', ...options, '--offline', '--target', target]
					codes.push(await new CLI(sink.options).execute(argv))
				}
				expect(codes).toStrictEqual(refusals.map(() => 2))
				expect(workspace.has('paper')).toBe(false)
				const selection = ['new', 'paper', '--styles', '--extend', 'browser:vue,styles:print']
				expect(argvToCommand(selection)).toMatchObject({ verb: 'new', styles: true })
				expect(argvToCommand(selection)).toMatchObject({ extensions: 'browser:vue,styles:print' })
				const selected = selectionToExtensions('browser:vue,styles:print', ['src', 'app'], true)
				expect(selected).toStrictEqual([
					{ surface: 'browser', name: 'vue', axes: ['src', 'app'] },
					{ surface: 'styles', name: 'print' },
				])
			} finally {
				workspace.destroy()
			}
		})

		it('plans every sheet face path under its stated ownership', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				"In the following table, `<face>` is `styles` or the extension's name",
			)
			expect(markdown).toContain(
				'`sheet.ts` imports `./index.scss` and nothing else, and `index.ts` star-exports `./sheet.js`.',
			)
			const blueprint = createBlueprint('paper', {
				src: ['core'],
				styles: true,
				themes: true,
				extensions: [{ surface: 'styles', name: 'print' }],
			})
			const sources = blueprintToSourceArtifacts(blueprint)
			const configured = blueprintToConfigArtifacts(blueprint)
			const tested = blueprintToTestArtifacts(blueprint)
			const all = [...configured, ...sources, ...tested]
			const pairs = all.map(({ path, ownership }): [string, string] => [path, ownership])
			const planned = Object.fromEntries(pairs)
			const expected: Record<string, string> = {
				'src/styles/themes/index.scss': 'birth',
				'src/styles/themes/_default.scss': 'birth',
				'src/styles/themes/sheet.ts': 'birth',
				'tests/src/styles/themes/index.test.ts': 'birth',
				'tests/setupStyles.ts': 'birth',
				'tests/setupStyles.test.ts': 'birth',
				'configs/src/vite.themes.config.ts': 'content',
				'tests/distribution.test.ts': 'presence',
			}
			const seeds = ['index.scss', '_tokens.scss', '_mixins.scss', 'sheet.ts', 'index.ts']
			for (const face of ['styles', 'print']) {
				for (const name of seeds) expected[`src/${face}/${name}`] = 'birth'
				expected[`tests/src/${face}/index.test.ts`] = 'birth'
				expected[`configs/src/vite.${face}.config.ts`] = 'content'
				expected[`configs/src/tsconfig.${face}.json`] = 'content'
				for (const folder of ['elements', 'components', 'utilities']) {
					const barrels = sources.filter(({ path }) => path.startsWith(`src/${face}/${folder}/`))
					const found = barrels.map(({ path, ownership, content }) => [path, ownership, content])
					expect(found).toStrictEqual([[`src/${face}/${folder}/_index.scss`, 'birth', '']])
				}
			}
			expect(planned).toMatchObject(expected)
			expect(planned['configs/src/tsconfig.themes.json']).toBeUndefined()
			const bare = createBlueprint('paper', { styles: true })
			const seeded = blueprintToSourceArtifacts(bare).map(({ path }) => path)
			const wrapped = blueprintToConfigArtifacts(bare).map(({ path }) => path)
			expect([...seeded, ...wrapped].filter((path) => path.includes('themes'))).toStrictEqual([])
			const statement = '@layer theme, reset, base, elements, components, utilities;'
			const texts = sources.map(({ path, content }): [string, string] => [path, content])
			const contents = Object.fromEntries(texts)
			expect(contents['src/print/sheet.ts']).toBe("import './index.scss'\n")
			expect(contents['src/print/index.ts']).toBe("export * from './sheet.js'\n")
			expect(contents['src/print/_tokens.scss']?.startsWith(statement)).toBe(true)
			expect(markdown).toContain(
				'`index.scss` loads `tokens` and then the `elements`, `components`, and `utilities` folder barrels',
			)
			const loads = "@use 'tokens';\n@use 'elements';\n@use 'components';\n@use 'utilities';\n"
			expect(contents['src/print/index.scss']).toBe(loads)
			expect(contents['src/styles/themes/index.scss']).toBe("@use '../tokens';\n@use 'default';\n")
		})

		it('declares the scripts, projects, dependencies, and aliases each sheet face needs', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				"`test:src:<face>` builds the face before it runs the face's project.",
			)
			expect(markdown).toContain(
				'Each sheet face adds its `check:src:<face>` and `build:src:<face>` scripts.',
			)
			expect(markdown).toContain('of `STYLES_DEV_DEPENDENCIES`, is a seed as well')
			const blueprint = createBlueprint('paper', {
				src: ['core'],
				styles: true,
				themes: true,
				extensions: [{ surface: 'styles', name: 'print' }],
			})
			const vitest = 'vitest run --config vite.config.ts --no-cache --reporter=dot'
			const project = `${vitest} --project src:print`
			const styled = 'vite build --config configs/src/vite.styles.config.ts'
			const themed = 'vite build --config configs/src/vite.themes.config.ts'
			const printed = 'vite build --config configs/src/vite.print.config.ts'
			const scripts = blueprintToScripts(blueprint)
			expect(scripts['build:src:styles']).toBe(`${styled} && ${themed}`)
			expect(scripts['build:src:print']).toBe(printed)
			expect(scripts['check:src:print']).toBe('tsc --noEmit -p configs/src/tsconfig.print.json')
			expect(scripts['test:src:print']).toBe(`npm run build:src:print && ${project}`)
			expect(scripts.test).toContain('npm run test:setup:browser')
			const writable = blueprintToWritableScripts(blueprint)
			const direct = ['check:src:styles', 'check:src:print', 'build:src:print']
			expect(writable.map(({ name }) => name)).toEqual(expect.arrayContaining(direct))
			const rebuilt = writable.find(({ name }) => name === 'build:src:styles')
			const retested = writable.find(({ name }) => name === 'test:src:print')
			expect(rebuilt?.accepted).toStrictEqual([styled])
			expect(retested?.accepted).toStrictEqual([project])
			const vite = blueprintToRootVite(blueprint)
			expect(vite).toContain("'./configs/src/vite.print.config.ts'")
			expect(vite).toContain('export function sheetProject(')
			expect(vite).toContain('isolate: false')
			expect(vite).toContain(
				"setupFiles: ['./tests/setup.ts', './tests/setupBrowser.ts', './tests/setupStyles.ts']",
			)
			const collected = "include: ['tests/setupBrowser.test.ts', 'tests/setupStyles.test.ts']"
			expect(vite).toContain(collected)
			const dependencies = blueprintToDevDependencies(blueprint)
			expect(STYLES_DEV_DEPENDENCIES).toStrictEqual({ sass: '^1.105.1' })
			expect(dependencies.sass).toBe(STYLES_DEV_DEPENDENCIES.sass)
			expect(Object.hasOwn(dependencies, 'playwright')).toBe(true)
			expect(Object.hasOwn(dependencies, '@vitest/browser-playwright')).toBe(true)
			const tsconfig = blueprintToRootTsconfig(blueprint)
			expect(tsconfig).toContain('"@src/print": ["./src/print/index.ts"]')
			expect(tsconfig).toContain('"@src/styles": ["./src/styles/index.ts"]')
		})

		it('maps both browser setup proofs to the browser runtime', async () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				'`browser` for the exact-case `tests/setupBrowser.test.ts` and `tests/setupStyles.test.ts` proofs and',
			)
			const node = createBlueprint('sample', { src: ['core'], setup: ['node'] })
			const excluded = "exclude: ['tests/setupBrowser.test.ts', 'tests/setupStyles.test.ts']"
			expect(blueprintToRootVite(node)).toContain(excluded)
			const workspace = createScratch({ prefix: 'scaffold-guide-runtime-' })
			try {
				const manifest = '{ "name": "@orkestrel/sample", "scripts": {} }\n'
				const proofs = [
					'setupStyles.test.ts',
					'setupBrowser.test.ts',
					'setup.test.ts',
					'setupServer.test.ts',
				]
				const readings: Array<readonly [string, boolean]> = []
				for (const [index, proof] of proofs.entries()) {
					const name = `runtime-${String(index)}`
					const target = workspace.ensure(name)
					workspace.write(`${name}/package.json`, manifest)
					workspace.write(`${name}/tests/${proof}`, '')
					const sink = createSink()
					await new CLI(sink.options).execute(['repair', '--target', target, '--json'])
					const parsed: unknown = JSON.parse(requireValue(sink.output[0]))
					if (
						!isRecord(parsed) ||
						!isRecord(parsed.error) ||
						typeof parsed.error.message !== 'string'
					) {
						throw new Error('The refused repair returned no failure envelope')
					}
					// The refusal lists every planned development dependency the manifest lacks,
					// and only the browser runtime plans the Playwright provider.
					readings.push([proof, parsed.error.message.includes('"playwright"')])
				}
				expect(readings).toStrictEqual([
					['setupStyles.test.ts', true],
					['setupBrowser.test.ts', true],
					['setup.test.ts', false],
					['setupServer.test.ts', false],
				])
			} finally {
				workspace.destroy()
			}
		})

		it('adds Vue tooling only with the vue browser extension', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain('A browser application without the `vue` extension')
			expect(markdown).toContain(
				'The browser setup project applies the Vue single-file-component transform only when the workspace',
			)
			const plain = createBlueprint('desk', { app: ['browser'], setup: ['browser'] })
			const framed = createBlueprint('desk', {
				app: ['browser'],
				setup: ['browser'],
				extensions: [{ surface: 'browser', name: 'vue', axes: ['app'] }],
			})
			const packages = Object.keys(FRAMEWORK_MATRIX.vue.dependencies)
			expect(packages).toStrictEqual(['@vitejs/plugin-vue', 'vue', 'vue-tsc'])
			const declared = Object.keys(blueprintToDevDependencies(plain))
			expect(declared.filter((name) => packages.includes(name))).toStrictEqual([])
			expect(blueprintToDevDependencies(framed)).toMatchObject(FRAMEWORK_MATRIX.vue.dependencies)
			expect(blueprintToRootVite(plain)).not.toContain('vue()')
			expect(blueprintToRootVite(framed)).toContain('plugins: [vue()],')
			expect(blueprintToMachinery(framed).frameworks).toStrictEqual(['vue'])
			expect(markdown).toContain(
				'`vue` to its `optimizeDeps.include`, so your `tests/setupBrowser.ts`',
			)
			const included = "optimizeDeps: { include: [...optimizeDeps.include, 'vue'] }"
			const setups = [plain, framed].map((blueprint) => {
				const vite = blueprintToRootVite(blueprint)
				const start = vite.indexOf('export function setupBrowser(')
				const end = vite.indexOf('\nexport function ', start + 1)
				return start === -1 ? '' : vite.slice(start, end === -1 ? undefined : end)
			})
			expect(setups.map((setup) => setup.includes(included))).toStrictEqual([false, true])
			expect(setups.every((setup) => setup.includes('\t\tresolve,\n'))).toBe(true)
		})

		it('refuses to write a target holding Vue sources under app/browser', async () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			const sentence =
				'Move Vue components from app/browser to app/vue before regenerating this workspace.'
			expect(markdown).toContain(`\`${sentence}\``)
			const workspace = createScratch({ prefix: 'scaffold-guide-migration-' })
			try {
				const manifest = '{ "name": "@orkestrel/sample", "scripts": {} }\n'
				const guarded = workspace.ensure('guarded')
				workspace.write('guarded/package.json', manifest)
				workspace.write('guarded/app/browser/App.vue', '<template><h1>Sample</h1></template>\n')
				// The control holds no Vue source and still refuses, on its missing development
				// dependencies, so the comparison isolates the guard's sentence.
				const control = workspace.ensure('control')
				workspace.write('control/package.json', manifest)
				workspace.write('control/app/browser/main.ts', '')
				const readings: Array<readonly [number, string, boolean]> = []
				for (const target of [guarded, control]) {
					for (const verb of ['repair', 'overwrite']) {
						const sink = createSink()
						const code = await new CLI(sink.options).execute([verb, '--target', target, '--json'])
						const parsed: unknown = JSON.parse(requireValue(sink.output[0]))
						if (
							!isRecord(parsed) ||
							!isRecord(parsed.error) ||
							typeof parsed.error.code !== 'string' ||
							typeof parsed.error.message !== 'string'
						) {
							throw new Error('The refused verb returned no failure envelope')
						}
						readings.push([code, parsed.error.code, parsed.error.message.includes(sentence)])
					}
				}
				expect(readings).toStrictEqual([
					[1, 'TARGET', true],
					[1, 'TARGET', true],
					[1, 'TARGET', false],
					[1, 'TARGET', false],
				])
				expect(workspace.has('guarded/app/browser/App.vue')).toBe(true)
			} finally {
				workspace.destroy()
			}
		})

		it('vendors the shared configuration and content-owns every compiled wrapper', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain('`tests/config.test.ts` are `HOST_PATHS` members')
			const vendored = [
				'configs/helpers.ts',
				'.oxlintrc.json',
				'.prettierignore',
				'tests/config.test.ts',
			]
			expect(HOST_PATHS).toEqual(expect.arrayContaining(vendored))
			const blueprint = createBlueprint('desk', {
				src: ['core'],
				app: ['browser'],
				showcase: true,
				journey: true,
				styles: true,
				extensions: [{ surface: 'styles', name: 'print' }],
			})
			const configured = blueprintToConfigArtifacts(blueprint)
			const pairs = configured.map(({ path, ownership }): [string, string] => [path, ownership])
			const claims = Object.fromEntries(pairs)
			expect(claims).toMatchObject({
				'tsconfig.json': 'content',
				'vite.config.ts': 'content',
				'configs/src/vite.core.config.ts': 'content',
				'configs/src/vite.print.config.ts': 'content',
				'configs/app/vite.showcase.config.ts': 'content',
				'configs/app/vite.journey.config.ts': 'birth',
			})
			const wrappers = Object.entries(claims).filter(([path]) => path.startsWith('configs/src/'))
			expect(wrappers.filter(([, claim]) => claim !== 'content')).toStrictEqual([])
		})

		it('raises one question for each extension the workspace does not place', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				'raises one `extensions` question for each such entry, with the following messages:',
			)
			const blueprints = [
				createBlueprint('paper', {
					styles: true,
					extensions: [
						{ surface: 'styles', name: 'print' },
						{ surface: 'styles', name: 'print' },
					],
				}),
				createBlueprint('desk', {
					app: ['browser'],
					extensions: [{ surface: 'browser', name: 'vue', axes: [] }],
				}),
				createBlueprint('desk', {
					app: ['core'],
					extensions: [{ surface: 'browser', name: 'vue', axes: ['app'] }],
				}),
				createBlueprint('paper', {
					src: ['core'],
					extensions: [{ surface: 'styles', name: 'print' }],
				}),
				createBlueprint('desk', {
					app: ['browser'],
					extensions: [{ surface: 'browser', name: 'vue', axes: ['app'] }],
				}),
			]
			const readings = blueprints.map((blueprint) =>
				blueprintToQuestions(blueprint)
					.filter(({ field }) => field === 'extensions')
					.map(({ message, blocking }) => [message, blocking]),
			)
			expect(readings).toStrictEqual([
				[['styles:print is declared more than once on extensions.', true]],
				[['browser:vue occupies no axis.', false]],
				[['browser:vue occupies app, whose selection lacks browser.', false]],
				[['styles:print extends a styles surface this workspace does not declare.', false]],
				[],
			])
			const unplaced = requireValue(blueprints[2])
			const placed = requireValue(blueprints[4])
			expect(blueprintToMachinery(unplaced).frameworks).toStrictEqual([])
			expect(blueprintToRootVite(unplaced)).not.toContain('appVue')
			expect(blueprintToRootVite(unplaced)).not.toContain('srcVue')
			expect(blueprintToMachinery(placed).frameworks).toStrictEqual(['vue'])
			expect(Object.hasOwn(blueprintToDevDependencies(unplaced), 'vue')).toBe(false)
			expect(Object.hasOwn(blueprintToDevDependencies(placed), 'vue')).toBe(true)
		})

		it('plans the Vue face on each axis the extension occupies', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				'it adds the published `src/vue` face: a barrel holding one comment line',
			)
			expect(markdown).toContain(
				'`check` script typechecks the whole tree through `vue-tsc` in place of `tsc`.',
			)
			const blueprint = createBlueprint('desk', {
				src: ['core', 'browser'],
				app: ['core', 'browser'],
				extensions: [{ surface: 'browser', name: 'vue', axes: ['src', 'app'] }],
			})
			const configured = blueprintToConfigArtifacts(blueprint)
			const sources = blueprintToSourceArtifacts(blueprint)
			const tested = blueprintToTestArtifacts(blueprint)
			const all = [...configured, ...sources, ...tested]
			const pairs = all.map(({ path, ownership }): [string, string] => [path, ownership])
			expect(Object.fromEntries(pairs)).toMatchObject({
				'src/vue/index.ts': 'birth',
				'tests/src/vue/index.test.ts': 'birth',
				'configs/src/vite.vue.config.ts': 'content',
				'configs/src/tsconfig.vue.json': 'content',
				'app/vue/index.ts': 'birth',
				'app/vue/main.ts': 'birth',
				'app/vue/App.vue': 'birth',
				'app/vue/index.html': 'birth',
				'tests/app/vue/index.test.ts': 'birth',
				'configs/app/vite.vue.config.ts': 'content',
				'configs/app/tsconfig.vue.json': 'content',
			})
			const texts = all.map(({ path, content }): [string, string | undefined] => [path, content])
			const contents = Object.fromEntries(texts)
			const barrel = requireValue(contents['src/vue/index.ts'])
			expect(barrel.startsWith('// ')).toBe(true)
			expect(barrel.trimEnd().split('\n')).toHaveLength(1)
			expect(contents['app/vue/index.ts']).toBe('')
			expect(contents['app/vue/main.ts']).toContain("import App from './App.vue'")
			expect(contents['app/vue/main.ts']).toContain('createApp(App).mount(')
			expect(contents['app/vue/App.vue']).toBe('<template>\n\t<h1>desk</h1>\n</template>\n')
			expect(contents['app/browser/main.ts']).toContain(".textContent = 'desk'")
			const wrapper = requireValue(contents['configs/src/vite.vue.config.ts'])
			expect(wrapper).toContain('rewriteBrowserSpecifier(rewriteCoreSpecifier(content))')
			expect(wrapper).toContain("refused: ['vue', '@vue/'],")
			const vitest = 'vitest run --config vite.config.ts --no-cache --reporter=dot'
			const scripts = blueprintToScripts(blueprint)
			expect(scripts.check?.startsWith('vue-tsc --noEmit --project tsconfig.json')).toBe(true)
			expect(scripts['check:src']).toContain('npm run check:src:vue')
			expect(scripts['check:src:vue']).toBe('tsc --noEmit -p configs/src/tsconfig.vue.json')
			expect(readFileSync('.claude/rules/browser.md', 'utf8')).toContain(
				'Publish only TypeScript composables and contracts from `src/vue`',
			)
			expect(contents['configs/src/tsconfig.vue.json']).not.toContain('**/*.vue')
			expect(contents['configs/app/tsconfig.vue.json']).toContain('**/*.vue')
			expect(markdown).toContain(
				'Each occupied framework face adds `check:<axis>:vue` and `build:<axis>:vue`',
			)
			expect(blueprintToWritableScripts(blueprint).map(({ name }) => name)).toEqual(
				expect.arrayContaining([
					'check:src:vue',
					'build:src:vue',
					'check:app:vue',
					'build:app:vue',
					'dev:vue',
				]),
			)
			expect(scripts['build:src:vue']).toBe('vite build --config configs/src/vite.vue.config.ts')
			expect(scripts['test:src:vue']).toBe(`${vitest} --project src:vue`)
			expect(scripts['check:app:vue']).toBe('vue-tsc --noEmit -p configs/app/tsconfig.vue.json')
			expect(scripts['build:app:vue']).toBe('vite build --config configs/app/vite.vue.config.ts')
			expect(scripts['dev:vue']).toBe('vite --config configs/app/vite.vue.config.ts')
			expect(scripts['test:app:vue']).toBe(`${vitest} --project app:vue`)
			const tsconfig = blueprintToRootTsconfig(blueprint)
			expect(tsconfig).toContain('"@src/vue": ["./src/vue/index.ts"]')
			expect(tsconfig).toContain('"@app/vue": ["./app/vue/index.ts"]')
			expect(blueprintToExports(blueprint)['./vue']).toStrictEqual({
				import: { types: './dist/src/vue/index.d.ts', default: './dist/src/vue/index.js' },
			})
			const published = createBlueprint('desk', {
				src: ['browser'],
				extensions: [{ surface: 'browser', name: 'vue', axes: ['src'] }],
			})
			const bare = createBlueprint('desk', { src: ['browser'] })
			expect(Object.hasOwn(blueprintToExports(published), './browser')).toBe(true)
			expect(Object.hasOwn(blueprintToExports(bare), './browser')).toBe(false)
			expect(blueprintToScripts(published).check?.startsWith('tsc --noEmit')).toBe(true)
		})

		it('refuses a framework import with each resolveExternal message', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				'`vue` and the `@vue/` scope, and the helper refuses that build with one of two messages:',
			)
			const scoped =
				'The import @vue/runtime-core is refused; import from vue instead of the @vue/ implementation scope.'
			const unpeered =
				'The import vue is refused; declare its public package in peerDependencies with peerDependenciesMeta marking it optional.'
			expect(markdown).toContain(`\`${scoped}\``)
			expect(markdown).toContain(`\`${unpeered}\``)
			const refused = FRAMEWORK_MATRIX.vue.refused
			const closed = { peers: [], refused, siblings: [] }
			const peered = { peers: ['vue', '@vue/runtime-core'], refused, siblings: [] }
			expect(() => resolveExternal('@vue/runtime-core', peered)).toThrow(
				`[orkestrel-build] ${scoped}`,
			)
			expect(() => resolveExternal('vue', closed)).toThrow(`[orkestrel-build] ${unpeered}`)
			const sibling = '/workspace/src/core/index.ts'
			const admitted = [
				resolveExternal('vue', peered),
				resolveExternal('vue/runtime-dom', peered),
				resolveExternal('node:fs', closed),
				resolveExternal('@orkestrel/test', closed),
				resolveExternal(sibling, { ...closed, siblings: [sibling] }),
				resolveExternal('@src/core', { ...closed, siblings: ['@src/core'] }),
				resolveExternal('lodash', closed),
			]
			expect(admitted).toStrictEqual([true, true, true, true, true, false, false])
			const faces = createBlueprint('desk', { src: ['core', 'server'] })
			const configured = blueprintToConfigArtifacts(faces)
			const core = configured.find(({ path }) => path === 'configs/src/vite.core.config.ts')
			expect(core?.content).toContain('resolveExternal(id, { peers, refused: [], siblings: [] })')
			const vite = blueprintToRootVite(faces)
			expect(vite).toContain("id === '@src/core' ||")
			expect(vite).toContain('resolveExternal(id, {')
			expect(vite).toContain("siblings: [resolveWorkspacePath('src/core/index.ts')],")
		})

		it('builds one stamped showcase page per application mode', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain('Selected showcase pages add `showcase`')
			expect(markdown).toContain(
				'The factory builds into the root `showcase/` directory without emptying it, so one mode',
			)
			expect(markdown).toContain('Stamping a stamped page returns it unchanged.')
			const blueprint = createBlueprint('desk', {
				src: ['core'],
				app: ['browser'],
				showcase: true,
				journey: true,
				extensions: [{ surface: 'browser', name: 'vue', axes: ['app'] }],
			})
			const location = 'configs/app/vite.showcase.config.ts'
			const scripts = blueprintToScripts(blueprint)
			const writable = blueprintToWritableScripts(blueprint).map(({ name }) => name)
			expect(writable).toEqual(
				expect.arrayContaining([
					'showcase',
					'showcase:vue',
					'build:showcase',
					'build:showcase:vue',
					'test:journey:vue',
				]),
			)
			expect(scripts.showcase).toBe(`vite --config ${location}`)
			expect(scripts['build:showcase']).toBe(`vite build --config ${location}`)
			expect(scripts['showcase:vue']).toBe(`vite --config ${location} --mode vue`)
			expect(scripts['build:showcase:vue']).toBe(`vite build --config ${location} --mode vue`)
			const rebuilt =
				'npm run build && npm run build:showcase && npm run build:showcase:vue && npm test'
			expect(scripts.prepublishOnly).toContain(rebuilt)
			const shown = createBlueprint('desk', { app: ['browser'], showcase: true })
			const unpublished = blueprintToScripts(shown)
			expect(unpublished['build:showcase']).toBe(`vite build --config ${location}`)
			expect(unpublished.prepublishOnly).toBeUndefined()
			const configured = blueprintToConfigArtifacts(blueprint)
			const wrapper = configured.find((artifact) => artifact.path === location)
			expect(wrapper?.ownership).toBe('content')
			expect(wrapper?.content).toContain(
				'export default defineConfig(({ mode }) => appShowcase(mode))',
			)
			const vite = blueprintToRootVite(blueprint)
			expect(vite).toContain(
				'export function appShowcase(mode: string, override?: UserConfig): UserConfig {',
			)
			expect(vite).toContain('const application = resolveApplication(mode, applications)')
			expect(vite).toContain("const output = 'showcase'")
			expect(vite).toContain('emptyOutDir: false,')
			expect(vite).toContain('file.source = stampPage(file.source)')
			expect(vite).toContain("resolvePath(options.dir, application + '.html'),")
			expect(vite).toContain('\tbrowser: appBrowser,\n\tvue: appVue,\n')
			const applications = { browser: true, vue: true }
			expect(markdown).toContain('The generated guide index lists each occupied Vue face')
			const index = blueprintToGuideArtifacts(blueprint)[0]?.content
			expect(index).toContain('../app/vue')
			expect(index).toContain('../tests/app/vue')
			expect(index).toContain('../showcase/browser.html')
			expect(index).toContain('../showcase/vue.html')
			expect(
				blueprintToGuideArtifacts({ ...blueprint, showcase: false })[0]?.content,
			).not.toContain('showcase/')
			const modes = [undefined, 'production', 'test', 'browser', 'vue']
			const selected = modes.map((mode) => resolveApplication(mode, applications))
			expect(selected).toStrictEqual(['browser', 'browser', 'browser', 'browser', 'vue'])
			expect(() => resolveApplication('vue', { browser: true })).toThrow(
				'The application mode "vue" is not declared.',
			)
			expect(scripts.showcase).not.toContain('--mode')
			expect(resolveApplication('development', applications)).toBe('browser')
			const ignore = fileURLToPath(new URL('../.prettierignore', import.meta.url))
			expect(readFileSync(ignore, 'utf8').split(/\r?\n/u)).toContain('showcase/')
		})

		it('stamps a final page with the digest of the page without its stamp', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				'where `DIGEST` is what `computeStamp` returns for the page without that line',
			)
			expect(computeStamp('')).toBe(
				'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
			)
			expect(computeStamp('abc')).toBe(
				'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad',
			)
			const page = '<html>\n\t<head>\n\t</head>\n</html>\n'
			const line = `\t\t<meta name="build-id" content="${computeStamp(page)}" />\n`
			const stamped = stampPage(page)
			expect(stamped).toBe(page.replace('\t</head>', `${line}\t</head>`))
			expect(computeStamp(stamped)).toBe(computeStamp(page))
			expect(stampPage(stamped)).toBe(stamped)
			const repeated = stamped.replace('\t</head>', `${line}\t</head>`)
			expect(() => stampPage(repeated)).toThrow(
				'A showcase page must carry at most one well-formed build stamp line.',
			)
			const malformed = page.replace('<head>', '<head>\n\t\t<meta name="build-id">')
			expect(() => stampPage(malformed)).toThrow(
				'A showcase page must carry at most one well-formed build stamp line.',
			)
			expect(() => stampPage('<html><head></head></html>')).toThrow(
				'A showcase page must close its head on its own line.',
			)
		})

		it('runs one journey per application mode from its seeded arrival journey', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				'application and `test:journey:<framework>`, the same command with `--mode <framework>`, for each',
			)
			expect(markdown).toContain('name, then proves the Journey, Refusal, and Matrix families')
			const blueprint = createBlueprint('desk', {
				src: ['core'],
				app: ['browser'],
				journey: true,
				extensions: [{ surface: 'browser', name: 'vue', axes: ['app'] }],
			})
			const command =
				'vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot'
			const scripts = blueprintToScripts(blueprint)
			expect(scripts['test:journey']).toBe(command)
			expect(scripts['test:journey:vue']).toBe(`${command} --mode vue`)
			const chain = 'npm run test:app && npm run test:journey && npm run test:journey:vue'
			expect(scripts.test).toContain(chain)
			const vite = blueprintToRootVite(blueprint)
			expect(vite).toContain('\tmode?: string,\n): UserConfig {')
			expect(vite).toContain('const application = resolveApplication(mode, applications)')
			expect(vite).toContain('exclude: [],')
			expect(vite).toContain('provide: { variant: variant.name, variants, capture },')
			expect(vite).toContain("const capture = process.env.CAPTURE === '1'")
			const location = 'configs/app/vite.journey.config.ts'
			const configured = blueprintToConfigArtifacts(blueprint)
			const wrapper = configured.find((artifact) => artifact.path === location)
			expect(wrapper?.ownership).toBe('birth')
			expect(wrapper?.content).toContain('(variant) => () => appJourney(variant, VARIANTS, mode)')
			expect(wrapper?.content).toContain("{ name: 'desktop', width: 1280, height: 800 },")
			expect(wrapper?.content).toContain("{ name: 'compact', width: 390, height: 844 },")
			const tested = blueprintToTestArtifacts(blueprint)
			const pattern = /^tests\/app\/[a-z]+\/integration\.test\.ts$/u
			const journeys = tested.filter(({ path }) => pattern.test(path))
			const claims = journeys.map(({ path, ownership }) => [path, ownership])
			expect(claims).toStrictEqual([
				['tests/app/browser/integration.test.ts', 'birth'],
				['tests/app/vue/integration.test.ts', 'birth'],
			])
			const families =
				"const families = new Set(['Journey', 'Refusal', 'Matrix', ...(CAPTURE ? ['Capture'] : [])])"
			const [base, framed] = journeys.map(({ content }) => content)
			expect(base).toContain("await import('../../../app/browser/main.js')")
			expect(framed).toContain("import App from '../../../app/vue/App.vue'")
			expect(framed).toContain('app.mount(container)')
			for (const content of [base, framed]) {
				expect(content).toContain(families)
				expect(content).toContain("name: 'desk',")
				expect(content).toContain('level: 1,')
				const refusal = `expect(readRefusal('Continue')).toBe(
				'No interactive element has the accessible name "Continue"',
			)`
				const roles =
					'for (const role of ACCESSIBLE_ROLES) expect(page.getByRole(role).elements()).toEqual([])'
				const recorded = "proven.add('Refusal')"
				const journey = requireValue(content)
				expect(journey).toContain(refusal)
				expect(journey).toContain(roles)
				expect(journey).toContain(recorded)
				expect(() => expect(journey.replace(refusal, '')).toContain(refusal)).toThrow()
				expect(() => expect(journey.replace(roles, '')).toContain(roles)).toThrow()
				expect(() => expect(journey.replace(recorded, '')).toContain(recorded)).toThrow()
			}
			const setup = tested.find(({ path }) => path === 'tests/setupBrowser.ts')
			expect(setup?.content).toContain('export interface ProvidedContext')
		})

		it('seeds a sibling proof beside each setup seed that declares an export', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain(
				'Scaffold plans each setup seed that declares an export beside its sibling proof',
			)
			expect(markdown).toContain('so an exporting seeded module whose proof was deleted meets it')
			const blueprint = createBlueprint('desk', {
				src: ['core'],
				app: ['browser'],
				journey: true,
				global: true,
				styles: true,
			})
			const tested = blueprintToTestArtifacts(blueprint)
			const paths = tested.map(({ path }) => path)
			const seeds = tested.filter(({ path }) => /^tests\/setup[A-Za-z]*\.ts$/u.test(path))
			const readings = seeds.map(({ path, ownership, content }) => [
				path,
				ownership,
				/^export /mu.test(content),
				content.length > 0,
				paths.includes(path.replace(/\.ts$/u, '.test.ts')),
			])
			expect(readings).toEqual(
				expect.arrayContaining([
					['tests/setup.ts', 'birth', false, false, false],
					['tests/setupBrowser.ts', 'birth', false, true, false],
					['tests/setupStyles.ts', 'birth', true, true, true],
					['tests/setupGlobal.ts', 'birth', true, true, true],
				]),
			)
			const texts = tested.map(({ path, content }): [string, string] => [path, content])
			const contents = Object.fromEntries(texts)
			expect(contents['tests/setupGlobal.test.ts']).toContain(
				"import { setup } from './setupGlobal.js'",
			)
			expect(contents['tests/src/styles/index.test.ts']).toContain(
				"import { adoptSheet, readLayerNames } from '../../setupStyles.js'",
			)
			const scripts = blueprintToScripts(blueprint)
			const vitest = 'vitest run --config vite.config.ts --no-cache --reporter=dot'
			expect(scripts['test:setup']).toBe(`${vitest} --project setup`)
			expect(scripts.test).toContain('npm run test:setup')
		})

		it('reports the migration guard to an unscoped audit as a non-blocking question', async () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain('An `audit` that covers every group reports the same')
			const sentence =
				'Move Vue components from app/browser to app/vue before regenerating this workspace.'
			const workspace = createScratch({ prefix: 'scaffold-guide-guard-' })
			try {
				const host = createStagedHost(workspace)
				const target = workspace.ensure('target')
				const created = createSink()
				const argv = ['new', 'desk', '--app', 'browser', '--offline', '--from', host]
				expect(await new CLI(created.options).execute([...argv, '--target', target])).toBe(0)
				workspace.write('target/app/browser/App.vue', '<template><h1>Arrival</h1></template>\n')
				const scopes: ReadonlyArray<readonly string[]> = [[], ['--groups', 'source']]
				const readings: Array<readonly [number, readonly Question[]]> = []
				for (const scope of scopes) {
					const sink = createSink()
					const code = await new CLI(sink.options).execute([
						'audit',
						'--offline',
						'--from',
						host,
						'--target',
						target,
						'--json',
						...scope,
					])
					const parsed: unknown = JSON.parse(requireValue(sink.output[0]))
					if (
						!isRecord(parsed) ||
						!isArray(parsed.questions) ||
						!parsed.questions.every(isQuestion)
					) {
						throw new Error('The guide audit returned no question list')
					}
					readings.push([code, parsed.questions.filter(({ field }) => field === 'extensions')])
				}
				expect(readings).toStrictEqual([
					[0, [{ field: 'extensions', message: sentence, blocking: false }]],
					[0, []],
				])
			} finally {
				workspace.destroy()
			}
		})
	})

	describe('nested-function admission', () => {
		RuleTester.describe = describe
		RuleTester.it = it

		it('documents the admission the plugin rule enforces', () => {
			const markdown = requireValue(files['guides/scaffold.md'])
			expect(markdown).toContain('passes the rule, and a function bound to a local name fails it.')
		})

		const tester = new RuleTester({ languageOptions: { parserOptions: { lang: 'ts' } } })
		tester.run('no-nested-functions', NESTED_RULE, {
			valid: [
				{
					name: 'admits the emitted root factories after callback hoisting',
					code: blueprintToRootVite(
						createBlueprint('desk', {
							src: ['core', 'browser', 'server'],
							app: ['core', 'browser', 'server'],
							bin: true,
							styles: true,
							themes: true,
							showcase: true,
							journey: true,
							extensions: [{ surface: 'browser', name: 'vue', axes: ['src', 'app'] }],
						}),
					),
				},
				{
					name: 'admits an event map passed as an option from inside a function body',
					code: [
						'function configure() {',
						'create({ on: { thing: function that() { return 1 }, other: () => 2 } })',
						'}',
					].join('\n'),
				},
			],
			invalid: [
				{
					name: 'refuses a function bound to a local name',
					code: 'function projectValue() { const readValue = () => 1; return readValue() }',
					errors: [{ messageId: 'nested' }],
				},
			],
		})
	})
})
