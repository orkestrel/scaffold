import { describe, expect, it } from 'vitest'
import { parseBlueprint, parseCompilerOptions, parseGroups, parseSnapshot } from '@src/core'
import { buildBlueprint, buildHostileCases, buildParserCases, buildSnapshot } from '../../setup.js'

describe('parser soundness', () => {
	for (const parserCase of buildParserCases()) {
		it(`${parserCase.name} returns the identical reference for every value its guard accepts`, () => {
			expect(parserCase.accepted.length).toBeGreaterThan(0)
			for (const value of parserCase.accepted) {
				expect(parserCase.guard(value)).toBe(true)
				expect(parserCase.parse(value)).toBe(value)
			}
		})

		it(`${parserCase.name} refuses every value its guard rejects`, () => {
			expect(parserCase.refused.length).toBeGreaterThan(0)
			for (const value of parserCase.refused) {
				expect(parserCase.guard(value)).toBe(false)
				expect(parserCase.parse(value)).toBeUndefined()
			}
		})

		it(`${parserCase.name} answers every hostile value with undefined and never throws`, () => {
			for (const hostile of buildHostileCases()) {
				expect(() => parserCase.parse(hostile.value)).not.toThrow()
				expect(parserCase.parse(hostile.value)).toBeUndefined()
			}
		})

		it(`${parserCase.name} produces nothing its guard would reject`, () => {
			const pool: readonly unknown[] = [
				...parserCase.accepted,
				...parserCase.refused,
				...buildHostileCases().map((hostile) => hostile.value),
			]
			for (const value of pool) {
				const parsed = parserCase.parse(value)
				if (parsed === undefined) continue
				expect(parserCase.guard(parsed)).toBe(true)
				expect(parsed).toBe(value)
			}
		})
	}
})

describe('parseGroups', () => {
	it('preserves the caller order and repetition it was given', () => {
		const requested: readonly string[] = ['tests', 'manifest', 'tests']
		expect(parseGroups(requested)).toStrictEqual(['tests', 'manifest', 'tests'])
	})

	it('refuses a selection carrying an unknown group', () => {
		const requested: readonly string[] = ['manifest', 'readme']
		expect(parseGroups(requested)).toBeUndefined()
	})
})

describe('absent input', () => {
	it('reads absence as a refusal rather than as defaults', () => {
		expect(parseBlueprint(undefined)).toBeUndefined()
		expect(parseGroups(undefined)).toBeUndefined()
		expect(parseSnapshot(undefined)).toBeUndefined()
		expect(parseCompilerOptions(undefined)).toBeUndefined()
	})
})

describe('field-level refusals', () => {
	it('refuses a blueprint whose one field under test is off contract', () => {
		const emptyName = buildBlueprint({ name: '' })
		const wrongEnvironment: Record<string, unknown> = { ...buildBlueprint(), src: ['worker'] }
		const wrongOverride: Record<string, unknown> = {
			...buildBlueprint(),
			overrides: [{ path: '../secrets', content: 'x' }],
		}
		expect(parseBlueprint(emptyName)).toBeUndefined()
		expect(parseBlueprint(wrongEnvironment)).toBeUndefined()
		expect(parseBlueprint(wrongOverride)).toBeUndefined()
		expect(parseBlueprint(buildBlueprint())).toStrictEqual(buildBlueprint())
	})

	it('refuses a snapshot whose one entry under test is off contract', () => {
		const snapshot = buildSnapshot()
		const stray: Record<string, unknown> = { ...snapshot, '../secrets': '68690a' }
		const text: Record<string, unknown> = { ...snapshot, 'README.md': 'hi' }
		expect(parseSnapshot(snapshot)).toBe(snapshot)
		expect(parseSnapshot(stray)).toBeUndefined()
		expect(parseSnapshot(text)).toBeUndefined()
	})
})
