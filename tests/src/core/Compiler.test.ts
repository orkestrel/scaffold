import { createBlueprint, createCompiler } from '@src/core'
import { describe, expect, it } from 'vitest'

describe('Compiler artifacts', () => {
	it('emits every selected group through its correct origin', () => {
		const compiler = createCompiler()
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
			'guides/README.md',
			'README.md',
		])
		expect(plan.artifacts).toHaveLength(46)
		expect(plan.artifacts.filter(({ origin }) => origin === 'computed')).toHaveLength(1)
		expect(plan.artifacts.filter(({ origin }) => origin === 'template')).toHaveLength(14)
		expect(plan.artifacts.filter(({ origin }) => origin === 'host')).toHaveLength(31)
	})

	it('emits every conditional config path exactly once', () => {
		const compiler = createCompiler()
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
})
