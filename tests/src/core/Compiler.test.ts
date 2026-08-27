import { artifactsToQuestions, Compiler, createBlueprint, isCanonPath } from '@src/core'
import { describe, expect, it } from 'vitest'

describe('Compiler artifacts', () => {
	it('emits every selected group through its correct origin', () => {
		const compiler = new Compiler()
		const plan = compiler.compile(createBlueprint('widget', { src: ['core', 'server'] })).plan
		compiler.destroy()
		if (plan === undefined) throw new Error('The valid config blueprint was blocked')

		const templates = plan.artifacts
			.filter(({ group, origin }) => group === 'configs' && origin === 'template')
			.map(({ path }) => path)
		expect(templates).toStrictEqual([
			'tsconfig.json',
			'vite.config.ts',
			'configs/src/vite.core.config.ts',
			'configs/src/tsconfig.core.json',
			'configs/src/vite.server.config.ts',
			'configs/src/tsconfig.server.json',
		])
		expect(plan.artifacts).toContainEqual({
			path: 'configs/helpers.ts',
			group: 'configs',
			ownership: 'presence',
			origin: 'host',
		})
		expect(plan.artifacts).toContainEqual({
			path: 'tests/policy.test.ts',
			group: 'tests',
			ownership: 'presence',
			origin: 'host',
		})
		expect(plan.artifacts).toContainEqual({
			path: 'tests/config.test.ts',
			group: 'tests',
			ownership: 'presence',
			origin: 'host',
		})
		expect(
			plan.artifacts.filter(({ origin }) => origin === 'template').map(({ path }) => path),
		).toStrictEqual([
			'tsconfig.json',
			'vite.config.ts',
			'configs/src/vite.core.config.ts',
			'configs/src/tsconfig.core.json',
			'configs/src/vite.server.config.ts',
			'configs/src/tsconfig.server.json',
			'src/core/index.ts',
			'src/server/index.ts',
			'tests/setup.ts',
			'tests/setupServer.ts',
			'tests/src/core/index.test.ts',
			'tests/src/server/index.test.ts',
			'tests/distribution.test.ts',
			'guides/README.md',
			'README.md',
			'AGENTS.md',
			'CLAUDE.md',
		])
		// The generated packed-package proof is the one template artifact claimed by
		// presence: a target lacking it reports as drift, and a package that wrote a
		// better proof of its own keeps those bytes untouched.
		expect(plan.artifacts).toContainEqual({
			path: 'tests/distribution.test.ts',
			group: 'tests',
			ownership: 'presence',
			origin: 'template',
			content: expect.stringContaining('installed package consumer'),
		})
		expect(plan.artifacts).toHaveLength(39)
		expect(plan.artifacts.filter(({ origin }) => origin === 'computed')).toHaveLength(1)
		expect(plan.artifacts.filter(({ origin }) => origin === 'template')).toHaveLength(17)
		expect(plan.artifacts.filter(({ origin }) => origin === 'host')).toHaveLength(21)
	})

	// The canon left the vendored set, so the root instruction documents are
	// planned as this package's own content instead. Each has to claim its path
	// once: a second claimant would make the plan's last writer win silently, which
	// is what the plan gate refuses.
	it('plans each root instruction pointer once, as content nothing vendors', () => {
		const compiler = new Compiler()
		const scaffolding = compiler.compile(createBlueprint('widget', { src: ['core'] }))
		compiler.destroy()
		const plan = scaffolding.plan
		if (plan === undefined) throw new Error('The pointer blueprint was blocked')

		for (const path of ['AGENTS.md', 'CLAUDE.md']) {
			const claimants = plan.artifacts.filter((artifact) => artifact.path === path)
			expect(claimants).toHaveLength(1)
			expect(claimants[0]?.group).toBe('docs')
			expect(claimants[0]?.origin).toBe('template')
			expect(claimants[0]?.ownership).toBe('content')
			expect(claimants[0]?.content).toContain(`# ${path}`)
		}
		expect(artifactsToQuestions(plan.artifacts)).toStrictEqual([])
		// The control the collision claim needs: the gate does report a second
		// claimant, so an empty result is a measurement rather than a silent pass.
		expect(
			artifactsToQuestions([...plan.artifacts, ...plan.artifacts]).map(({ field }) => field),
		).toContain('artifacts')
		// A target holds a file at a canon path only where the plan claims it, and
		// these are every path the plan claims: the pointer pair as this package's
		// own template content, and the catalog file as the vendored bytes `catalog`
		// rewrites in place. Everything else at a canon path a target reads from the
		// package it installs.
		expect(
			plan.artifacts
				.filter((artifact) => isCanonPath(artifact.path))
				.map(({ path, origin }) => `${path}:${origin}`),
		).toStrictEqual([
			'AGENTS.md:template',
			'CLAUDE.md:template',
			'.claude/agents/orkestrel.md:host',
		])
	})

	it('emits every conditional config path exactly once', () => {
		const compiler = new Compiler()
		const plan = compiler.compile(
			createBlueprint('widget', {
				src: ['core', 'browser', 'server'],
				app: ['core', 'browser', 'server'],
				bin: true,
				integration: true,
				global: true,
				showcase: true,
			}),
			['configs'],
		).plan
		compiler.destroy()
		if (plan === undefined) throw new Error('The full config blueprint was blocked')

		const paths = plan.artifacts.map(({ path }) => path)
		expect(new Set(paths).size).toBe(paths.length)
		expect(paths).toEqual(
			expect.arrayContaining([
				'tsconfig.json',
				'vite.config.ts',
				'configs/src/vite.core.config.ts',
				'configs/src/tsconfig.core.json',
				'configs/src/vite.browser.config.ts',
				'configs/src/tsconfig.browser.json',
				'configs/src/vite.server.config.ts',
				'configs/src/tsconfig.server.json',
				'configs/src/vite.bin.config.ts',
				'configs/src/tsconfig.bin.json',
				'configs/app/tsconfig.core.json',
				'configs/app/vite.browser.config.ts',
				'configs/app/tsconfig.browser.json',
				'configs/app/vite.server.config.ts',
				'configs/app/tsconfig.server.json',
				'configs/app/vite.showcase.config.ts',
				'configs/helpers.ts',
			]),
		)
	})

	// `CLI.#derive` reconstructs `src` from the directories a target ships, so a
	// workspace publishing browser and server without core is a real shape the
	// reading verbs meet. While the gate refused it, `audit` reported nothing about
	// such a target and `repair` could not reach the paths that needed repairing.
	it('describes an existing workspace whose published axis lacks core', () => {
		const compiler = new Compiler()
		const blueprint = createBlueprint('widget', { src: ['browser', 'server'] })
		const scaffolding = compiler.compile(blueprint)
		const audit = compiler.audit(blueprint, {})
		compiler.destroy()

		expect(scaffolding.questions.every(({ blocking }) => !blocking)).toBe(true)
		expect(scaffolding.questions.map(({ field }) => field)).toStrictEqual(['src'])
		expect(scaffolding.plan?.artifacts.length).toBeGreaterThan(20)
		expect(audit.findings.length).toBe(scaffolding.plan?.artifacts.length)
		expect(audit.findings.every(({ drift }) => drift === 'missing' || drift === 'aligned')).toBe(
			true,
		)
	})

	// The Limits section of `guides/scaffold.md` states that the library does not
	// enforce the creating verb's policy, and this is the fact that statement rests
	// on. The plan handed to a caller for this shape is complete and its manifest
	// names a `core` build the workspace never runs, which is exactly what the
	// advisory beside it said. Nothing downstream re-reads that advisory, so a
	// creating caller reads it here or writes this manifest.
	it('plans a manifest naming a core build for a published axis that declares no core', () => {
		const compiler = new Compiler()
		const scaffolding = compiler.compile(createBlueprint('widget', { src: ['browser', 'server'] }))
		compiler.destroy()

		expect(
			scaffolding.questions.map(({ field, blocking }) => `${field}:${String(blocking)}`),
		).toStrictEqual(['src:false'])
		const manifest = scaffolding.plan?.artifacts.find(({ path }) => path === 'package.json')
		if (manifest?.content === undefined) throw new Error('The plan carries no manifest content')
		const parsed: unknown = JSON.parse(manifest.content)
		if (typeof parsed !== 'object' || parsed === null) {
			throw new Error('The planned manifest is not a record')
		}
		const exports: unknown = Object.getOwnPropertyDescriptor(parsed, 'exports')?.value
		const root: unknown =
			typeof exports === 'object' && exports !== null
				? Object.getOwnPropertyDescriptor(exports, '.')?.value
				: undefined
		const imported: unknown =
			typeof root === 'object' && root !== null
				? Object.getOwnPropertyDescriptor(root, 'import')?.value
				: undefined
		expect(
			typeof imported === 'object' && imported !== null
				? Object.getOwnPropertyDescriptor(imported, 'default')?.value
				: undefined,
		).toBe('./dist/src/core/index.js')
		expect(scaffolding.plan?.artifacts.some(({ path }) => path === 'src/core/index.ts')).toBe(false)
	})

	it('accepts an override outside a narrowed group selection', () => {
		const compiler = new Compiler()
		const blueprint = createBlueprint('widget', {
			src: ['core'],
			overrides: [{ path: 'README.md', content: '# Widget\n' }],
		})
		const scaffolding = compiler.compile(blueprint, ['manifest'])
		compiler.destroy()

		expect(scaffolding.questions).toStrictEqual([])
		expect(scaffolding.plan?.artifacts.map(({ path }) => path)).toStrictEqual(['package.json'])
	})
})
