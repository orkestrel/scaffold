import type { ReadAllowanceInterface } from './types.js'
import { isNonNegativeInteger } from '@orkestrel/contract'
import { ScaffoldError } from '@src/core'

/**
 * Represents the byte allowance one upstream call spends across every read it makes.
 *
 * @remarks
 * Each call constructs its own allowance from the reader's budget, so concurrent
 * calls never spend each other's bytes. A read that brings the call exactly to
 * its budget leaves `remaining` at zero and is accepted; the next request is
 * refused before it is sent, and a body that passes the budget is refused at the
 * chunk that overshoots.
 *
 * @example
 * ```ts
 * import { ReadAllowance } from '@orkestrel/scaffold/server'
 *
 * const allowance = new ReadAllowance(1_024)
 * allowance.spend(1_000)
 * allowance.remaining // 24
 * ```
 */
export class ReadAllowance implements ReadAllowanceInterface {
	#remaining: number

	/**
	 * Constructs an allowance holding the whole budget.
	 *
	 * @param budget - The bytes the call may read in total.
	 * @throws {@link ScaffoldError} coded `INVALID` when `budget` is not a
	 * non-negative safe integer.
	 */
	constructor(budget: number) {
		if (!isNonNegativeInteger(budget) || !Number.isSafeInteger(budget)) {
			throw new ScaffoldError('INVALID', 'The read budget is not a non-negative safe integer.', {
				field: 'budget',
			})
		}
		this.#remaining = budget
	}

	/** The bytes the call has left; negative once a read overshoots the budget. */
	get remaining(): number {
		return this.#remaining
	}

	/**
	 * Spends bytes a read consumed from the allowance.
	 *
	 * @param bytes - The decoded bytes the read consumed.
	 * @returns Nothing.
	 * @throws {@link ScaffoldError} coded `INVALID` when `bytes` is not a
	 * non-negative safe integer.
	 *
	 * @example
	 * ```ts
	 * import { ReadAllowance } from '@orkestrel/scaffold/server'
	 *
	 * const allowance = new ReadAllowance(10)
	 * allowance.spend(12)
	 * allowance.remaining // -2
	 * ```
	 */
	spend(bytes: number): void {
		if (!isNonNegativeInteger(bytes) || !Number.isSafeInteger(bytes)) {
			throw new ScaffoldError('INVALID', 'The spent bytes are not a non-negative safe integer.', {
				field: 'bytes',
			})
		}
		this.#remaining -= bytes
	}
}
