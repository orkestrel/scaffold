import { describe, expect, it } from 'vitest'
import { isVerb } from '../../../src/bin/validators.js'

describe('bin command validation', () => {
	it('accepts every command and rejects arbitrary input', () => {
		for (const command of ['new', 'pull', 'audit', 'repair', 'fleet', 'catalog']) {
			expect(isVerb(command)).toBe(true)
		}
		expect(isVerb('sync')).toBe(false)
		expect(isVerb('')).toBe(false)
	})
})
