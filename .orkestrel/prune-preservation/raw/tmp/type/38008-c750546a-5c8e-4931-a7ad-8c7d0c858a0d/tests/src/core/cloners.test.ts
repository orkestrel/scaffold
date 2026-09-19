import { describe, expect, it } from 'vitest'
import { isRecord } from '@orkestrel/contract'
import { cloneValue, parseBlueprint, parseSnapshot } from '@src/core'
import { createRecorder } from '@orkestrel/test'
import {
	BENIGN_ACCESSOR_DESCRIPTOR,
	buildBlueprint,
	buildHostileCases,
	buildSnapshot,
	selectHostileCase,
	THROWING_ACCESSOR_DESCRIPTOR,
} from '../../setup.js'

describe('hostile ownership', () => {
	it('answers every hostile value without throwing', () => {
		for (const hostile of buildHostileCases()) {
			expect(() => cloneValue(hostile.value)).not.toThrow()
		}
	})

	it('takes ownership only where the value carries exact data behind its hostility', () => {
		const hostileCases = buildHostileCases()
		const observed = hostileCases.map(
			(hostile) => `${hostile.label} -> ${String(cloneValue(hostile.value) !== undefined)}`,
		)
		const expected = hostileCases.map((hostile) => `${hostile.label} -> ${String(hostile.owned)}`)
		expect(observed).toStrictEqual(expected)
	})

	it('reads a property through its descriptor rather than through a hostile trap', () => {
		const hostile = selectHostileCase('throwing get proxy')
		expect(cloneValue(hostile.value)).toEqual({ hostile: 'x' })
	})
})

describe('accessor properties', () => {
	it('refuses a record whose guarded property is a throwing accessor', () => {
		const hostile = selectHostileCase('throwing accessor')
		expect(cloneValue(hostile.value)).toBeUndefined()
		expect(parseBlueprint(cloneValue(hostile.value))).toBeUndefined()
	})

	it('refuses a record whose accessor would answer a valid value', () => {
		const source: Record<string, unknown> = { ...buildBlueprint() }
		Object.defineProperty(source, 'name', BENIGN_ACCESSOR_DESCRIPTOR)
		expect(source.name).toBe('sample')
		expect(cloneValue(source)).toBeUndefined()
	})

	it('refuses a nested record whose property is an accessor', () => {
		const inner: Record<string, unknown> = {}
		Object.defineProperty(inner, 'value', THROWING_ACCESSOR_DESCRIPTOR)
		const source: Record<string, unknown> = { inner }
		expect(cloneValue(source)).toBeUndefined()
	})
})

describe('owned shape', () => {
	it('returns a frozen null-prototype record at every depth', () => {
		const source: Record<string, unknown> = { inner: { deep: ['a'] } }
		const clone = cloneValue(source)
		expect(clone).toEqual({ inner: { deep: ['a'] } })
		expect(Object.isFrozen(clone)).toBe(true)
		expect(Object.getPrototypeOf(clone)).toBeNull()
		const inner = isRecord(clone) ? clone.inner : undefined
		expect(inner).toEqual({ deep: ['a'] })
		expect(Object.isFrozen(inner)).toBe(true)
		expect(Object.getPrototypeOf(inner)).toBeNull()
	})

	it('returns a frozen intrinsic array', () => {
		const source: readonly string[] = ['a', 'b']
		const clone = cloneValue(source)
		expect(clone).toEqual(['a', 'b'])
		expect(Array.isArray(clone)).toBe(true)
		expect(Object.isFrozen(clone)).toBe(true)
		expect(Object.getPrototypeOf(clone)).toBe(Array.prototype)
	})

	it('returns a primitive unchanged', () => {
		expect(cloneValue('text')).toBe('text')
		expect(cloneValue(42)).toBe(42)
		expect(cloneValue(true)).toBe(true)
		expect(cloneValue(null)).toBeNull()
	})

	it('shares nothing with the value it was taken from', () => {
		const inner: Record<string, unknown> = { deep: 'first' }
		const source: Record<string, unknown> = { inner }
		const clone = cloneValue(source)
		inner.deep = 'second'
		expect(isRecord(clone) ? clone.inner : undefined).not.toBe(inner)
		expect(clone).toEqual({ inner: { deep: 'first' } })
	})
})

describe('inexact data', () => {
	it('refuses a value carrying anything JSON cannot state exactly', () => {
		const withFunction: Record<string, unknown> = { call: createRecorder<readonly []>().handler }
		const withAbsence: Record<string, unknown> = { absent: undefined }
		const withNaN: Record<string, unknown> = { count: Number.NaN }
		const withInfinity: Record<string, unknown> = { count: Number.POSITIVE_INFINITY }
		const withSymbolKey: Record<string, unknown> = { ok: true }
		Object.defineProperty(withSymbolKey, Symbol('hidden'), {
			value: 'x',
			enumerable: true,
			configurable: true,
		})
		expect(cloneValue(withFunction)).toBeUndefined()
		expect(cloneValue(withAbsence)).toBeUndefined()
		expect(cloneValue(withNaN)).toBeUndefined()
		expect(cloneValue(withInfinity)).toBeUndefined()
		expect(cloneValue(withSymbolKey)).toBeUndefined()
		expect(cloneValue(undefined)).toBeUndefined()
	})
})

describe('composition with the parsers', () => {
	it('parses a blueprint snapshot the cloner produced', () => {
		const source = buildBlueprint({ description: 'A sample workspace.', src: ['core', 'server'] })
		const parsed = parseBlueprint(cloneValue(source))
		expect(parsed).toBeDefined()
		expect(parsed).toEqual(source)
		expect(Object.isFrozen(parsed)).toBe(true)
	})

	it('parses a target snapshot the cloner produced', () => {
		const source = buildSnapshot()
		const parsed = parseSnapshot(cloneValue(source))
		expect(parsed).toBeDefined()
		expect(parsed).toEqual(source)
	})

	it('refuses a blueprint the cloner could not take ownership of', () => {
		const source: Record<string, unknown> = { ...buildBlueprint() }
		source.self = source
		expect(cloneValue(source)).toBeUndefined()
		expect(parseBlueprint(cloneValue(source))).toBeUndefined()
	})
})
