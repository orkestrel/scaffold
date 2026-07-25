import { describe, expect, it } from 'vitest'
import { normalizeOrkestrelToken, parseArguments, splitTokens } from '../../../src/bin/parsers.js'

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

	it('splits and normalizes dependency tokens', () => {
		expect(splitTokens(' contract, ,@orkestrel/emitter ')).toEqual([
			'contract',
			'@orkestrel/emitter',
		])
		expect(normalizeOrkestrelToken('contract')).toBe('@orkestrel/contract')
		expect(normalizeOrkestrelToken('@orkestrel/emitter')).toBe('@orkestrel/emitter')
	})
})
