import { describe, expect, it } from 'vitest'
import { parseCSSColor, readRootToken } from '@orkestrel/test/browser'

describe('tokens', () => {
	it('publishes the navy token as a parseable color', () => {
		const navy = readRootToken('--rn-navy')
		expect(parseCSSColor(navy)).not.toBeUndefined()
	})
})
