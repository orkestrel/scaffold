import type { Dependency } from '@src/core'
import { describe, expect, it } from 'vitest'
import {
	createBlueprint,
	DEFAULT_ENGINES,
	DEFAULT_VERSION,
	isScaffoldError,
	MAX_COLLECTION_ITEMS,
} from '@src/core'

describe('createBlueprint defaults', () => {
	it('takes the package defaults for the version and the engines floor', () => {
		const blueprint = createBlueprint('router')
		expect(blueprint.version).toBe(DEFAULT_VERSION)
		expect(blueprint.engines).toBe(DEFAULT_ENGINES)
	})

	it('empties every collection the caller omitted', () => {
		const blueprint = createBlueprint('router')
		expect(blueprint.keywords).toStrictEqual([])
		expect(blueprint.src).toStrictEqual([])
		expect(blueprint.app).toStrictEqual([])
		expect(blueprint.dependencies).toStrictEqual([])
		expect(blueprint.peers).toStrictEqual([])
		expect(blueprint.extras).toStrictEqual([])
		expect(blueprint.overrides).toStrictEqual([])
		expect(blueprint.vendors).toStrictEqual([])
	})

	it('clears every flag the caller omitted', () => {
		const blueprint = createBlueprint('router')
		expect(blueprint.bin).toBe(false)
		expect(blueprint.setup).toBe(false)
		expect(blueprint.guides).toBe(false)
		expect(blueprint.integration).toBe(false)
		expect(blueprint.conformance).toBe(false)
		expect(blueprint.service).toBe(false)
		expect(blueprint.global).toBe(false)
		expect(blueprint.showcase).toBe(false)
	})

	it('keeps the name it was given, including one the gate refuses', () => {
		expect(createBlueprint('router').name).toBe('router')
		expect(createBlueprint('Router').name).toBe('Router')
	})
})

describe('createBlueprint supplied fields', () => {
	it('lets a supplied string, list, and flag each win over its default', () => {
		const blueprint = createBlueprint('router', {
			version: '1.2.3',
			src: ['core', 'server'],
			bin: true,
		})
		expect(blueprint.version).toBe('1.2.3')
		expect(blueprint.src).toStrictEqual(['core', 'server'])
		expect(blueprint.bin).toBe(true)
	})

	it('omits the description key entirely rather than setting it undefined', () => {
		expect('description' in createBlueprint('router')).toBe(false)
	})

	it('carries the description key when the caller supplies one', () => {
		const blueprint = createBlueprint('router', { description: 'A router.' })
		expect('description' in blueprint).toBe(true)
		expect(blueprint.description).toBe('A router.')
	})
})

describe('createBlueprint ownership', () => {
	it('shares no list with the input the caller kept', () => {
		const keywords = ['scaffold']
		const dependencies: Dependency[] = [{ name: '@orkestrel/emitter', range: '^0.0.5' }]
		const blueprint = createBlueprint('router', { keywords, dependencies })
		keywords.push('forged')
		dependencies.push({ name: '@orkestrel/contract', range: '^0.0.9' })
		expect(blueprint.keywords).toStrictEqual(['scaffold'])
		expect(blueprint.dependencies).toHaveLength(1)
		expect(blueprint.dependencies[0]?.name).toBe('@orkestrel/emitter')
		expect(blueprint.dependencies[0]?.range).toBe('^0.0.5')
	})

	it('shares no nested record with the input the caller kept', () => {
		const dependency = { name: '@orkestrel/emitter', range: '^0.0.5' }
		const blueprint = createBlueprint('router', { dependencies: [dependency] })
		expect(blueprint.dependencies[0]).not.toBe(dependency)
	})
})

describe('createBlueprint refusal', () => {
	it('throws INVALID when a supplied list exceeds the collection bound', () => {
		const keywords = Array.from({ length: MAX_COLLECTION_ITEMS + 1 }, (_value, index) =>
			String(index),
		)
		let refusal: unknown
		try {
			createBlueprint('router', { keywords })
		} catch (error) {
			refusal = error
		}
		expect(isScaffoldError(refusal) ? refusal.code : undefined).toBe('INVALID')
	})

	it('throws INVALID when the name is empty', () => {
		let refusal: unknown
		try {
			createBlueprint('')
		} catch (error) {
			refusal = error
		}
		expect(isScaffoldError(refusal) ? refusal.code : undefined).toBe('INVALID')
	})
})
