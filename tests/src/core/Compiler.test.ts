import { Compiler, createBlueprint } from '@src/core'
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
		expect(plan.artifacts).toHaveLength(50)
		expect(plan.artifacts.filter(({ origin }) => origin === 'computed')).toHaveLength(1)
		expect(plan.artifacts.filter(({ origin }) => origin === 'template')).toHaveLength(15)
		expect(plan.artifacts.filter(({ origin }) => origin === 'host')).toHaveLength(34)
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
