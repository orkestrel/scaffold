import { ReadAllowance } from '@src/server'
import { describe, expect, it } from 'vitest'
import { captureScaffoldCode } from '../../setupServer.js'

describe('ReadAllowance', () => {
	it('starts at the budget and lowers by each spend', () => {
		const allowance = new ReadAllowance(1_024)
		expect(allowance.remaining).toBe(1_024)
		allowance.spend(1_000)
		expect(allowance.remaining).toBe(24)
		allowance.spend(24)
		expect(allowance.remaining).toBe(0)
	})

	it('goes negative once a spend overshoots the budget', () => {
		const allowance = new ReadAllowance(10)
		allowance.spend(12)
		expect(allowance.remaining).toBe(-2)
		allowance.spend(3)
		expect(allowance.remaining).toBe(-5)
	})

	it('changes nothing on a spend of zero bytes', () => {
		const allowance = new ReadAllowance(7)
		allowance.spend(0)
		expect(allowance.remaining).toBe(7)
	})

	it('starts a zero budget at zero', () => {
		expect(new ReadAllowance(0).remaining).toBe(0)
	})

	it('refuses a budget that is not a non-negative safe integer', () => {
		for (const budget of [-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, 2 ** 53]) {
			expect(captureScaffoldCode(() => new ReadAllowance(budget))).toBe('INVALID')
		}
		// The control: the largest safe integer is a budget.
		expect(new ReadAllowance(Number.MAX_SAFE_INTEGER).remaining).toBe(Number.MAX_SAFE_INTEGER)
	})

	it('refuses a spend that is not a non-negative safe integer and keeps what was left', () => {
		const allowance = new ReadAllowance(100)
		for (const bytes of [-1, 0.5, Number.NaN, Number.POSITIVE_INFINITY]) {
			expect(captureScaffoldCode(() => allowance.spend(bytes))).toBe('INVALID')
		}
		expect(allowance.remaining).toBe(100)
	})

	it('keeps one allowance apart from another built from the same budget', () => {
		const first = new ReadAllowance(50)
		const second = new ReadAllowance(50)
		first.spend(30)
		expect(first.remaining).toBe(20)
		expect(second.remaining).toBe(50)
	})
})
