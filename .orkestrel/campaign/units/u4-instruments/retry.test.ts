import { retryUntil } from '@src/core'
import { describe, expect, it } from 'vitest'

describe('retry rendering', () => {
	it('carries the last unsatisfying value, cut at 200 characters', async () => {
		const short: unknown = await retryUntil('short', () => ({ ok: false }), () => false, {
			attempts: 1,
			budget: 0,
		}).catch((reason: unknown) => reason)
		expect(short).toBeInstanceOf(Error)
		const shortMessage = short instanceof Error ? short.message : ''
		expect(shortMessage).toContain('(last value: {"ok":false})')

		const long: unknown = await retryUntil('long', () => 'x'.repeat(500), () => false, {
			attempts: 1,
			budget: 0,
		}).catch((reason: unknown) => reason)
		const longMessage = long instanceof Error ? long.message : ''
		const rendered = longMessage.slice(longMessage.indexOf('(last value: ') + 13, -1)
		expect(rendered.length).toBe(200)
		expect(rendered.endsWith('...')).toBe(true)
	})
})
