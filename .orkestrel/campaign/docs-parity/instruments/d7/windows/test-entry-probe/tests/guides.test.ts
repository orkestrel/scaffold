import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

declare module 'vitest' {
	interface ProvidedContext {
		readonly direction: 'guide' | 'source'
	}
}

if (process.env.VITEST === 'true') {
	const { describe, expect, inject, it } = await import('vitest')
	const { value } = await import('@entry-example')
	describe('test-file entry', () => {
		it('loads worker-only aliases and the explicit direction', () => {
			expect(value).toBe('worker alias resolved')
			expect(inject('direction')).toBe('guide')
		})
	})
} else {
	const args = process.argv.slice(2)
	if (args.length !== 2 || args[0] !== '--to' || args[1] !== 'guide') {
		throw new Error('Expected the exact --to guide command')
	}
	const { createVitest } = await import('vitest/node')
	const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
	const runner = await createVitest('test', {
		root,
		config: false,
		watch: false,
		cache: false,
		reporters: ['dot'],
		include: ['tests/guides.test.ts'],
		provide: { direction: args[1] },
	}, { resolve: { alias: { '@entry-example': resolve(root, 'example.ts') } } })
	try {
		const result = await runner.start()
		if (result.testModules.length === 0 || result.unhandledErrors.length > 0 || result.testModules.some((module) => module.state() !== 'passed')) {
			process.exitCode = 1
		}
	} finally {
		await runner.close()
	}
}

