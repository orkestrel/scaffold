import { describe, expect, it } from 'vitest'
import { dependency } from '@src/core'
import {
	normalizeOrkestrelToken,
	parseArguments,
	parsePullDependencies,
	splitTokens,
} from '../../../src/bin/parsers.js'

describe('bin argument parsers', () => {
	it('strips one npm passthrough separator without mutating the caller', () => {
		const argv: readonly string[] = ['--', 'audit', '--json']
		const parsed = parseArguments(argv)
		expect(parsed.positionals).toEqual(['audit'])
		expect(parsed.values.json).toBe(true)
		expect(argv).toEqual(['--', 'audit', '--json'])
	})

	it('retains repeated --from values for command-specific policy', () => {
		const parsed = parseArguments(['catalog', '--from', 'first', '--from', 'second'])
		expect(parsed.values.from).toEqual(['first', 'second'])
	})

	it('round-trips the repair computed opt-in', () => {
		const parsed = parseArguments(['repair', '--computed'])
		expect(parsed.positionals).toEqual(['repair'])
		expect(parsed.values.computed).toBe(true)
	})

	it('parses source and application environment selections independently', () => {
		const parsed = parseArguments([
			'new',
			'workspace',
			'--src',
			'core,server',
			'--app',
			'core,browser',
		])
		expect(parsed.values.src).toBe('core,server')
		expect(parsed.values.app).toBe('core,browser')
	})

	it('strictly rejects the unsupported --surfaces option', () => {
		expect(() => parseArguments(['new', 'workspace', '--surfaces', 'core'])).toThrow(
			/Unknown option '--surfaces'/,
		)
	})

	it.each(['\n', '\r', '\u001b', '\u0085', '\u2028', '\u202e'])(
		'rejects terminal control %j anywhere in the argument vector',
		(control) => {
			expect(() => parseArguments([`--hostile${control}key`])).toThrow(
				'Command arguments must not contain control characters',
			)
			expect(() => parseArguments(['new', `hostile${control}name`])).toThrow(
				'Command arguments must not contain control characters',
			)
			expect(() => parseArguments(['audit', '--target', `hostile${control}target`])).toThrow(
				'Command arguments must not contain control characters',
			)
			expect(() => parseArguments(['audit', '--from', `hostile${control}source`])).toThrow(
				'Command arguments must not contain control characters',
			)
		},
	)

	it('splits and normalizes dependency tokens', () => {
		expect(splitTokens(' contract, ,@orkestrel/emitter ')).toEqual([
			'contract',
			'@orkestrel/emitter',
		])
		expect(normalizeOrkestrelToken('contract')).toBe('@orkestrel/contract')
		expect(normalizeOrkestrelToken('@orkestrel/emitter')).toBe('@orkestrel/emitter')
	})

	it('resolves pull selections exactly and rejects typos, duplicates, and empty tokens', () => {
		const declared = [
			dependency('@orkestrel/contract', '^0.0.5'),
			dependency('@orkestrel/emitter', '^0.0.5'),
		]

		expect(parsePullDependencies(undefined, declared)).toBeUndefined()
		expect(parsePullDependencies('@orkestrel/emitter', declared)).toEqual([declared[1]])
		for (const raw of [
			'@orkestrel/missing',
			'@orkestrel/contract,@orkestrel/contract',
			'@orkestrel/contract,',
			'contract',
		]) {
			expect(() => parsePullDependencies(raw, declared)).toThrowError(
				expect.objectContaining({ code: 'INVALID' }),
			)
		}
	})
})
