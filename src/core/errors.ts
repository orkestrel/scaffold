import type { ScaffoldErrorCode } from './types.js'

/**
 * The one error this package throws, carrying the coded reason it was raised.
 *
 * @remarks
 * A throw is reserved for a caller the package cannot serve: `INVALID` for
 * off-contract input, `DESTROYED` for any call made after teardown, `TARGET`
 * for a destination that is not what the caller's observation said it was,
 * `WRITE` for a mutation that could not be completed, and `FETCH` for an
 * upstream read that produced no answer the caller can be given.
 *
 * A refused blueprint is not one of these. The gate fails closed and returns
 * the questions that closed it, and `BLOCKED` is the code those stage records
 * carry, so a caller reads a refusal from the value it asked for rather than
 * from a stack.
 *
 * `context` carries whatever the raising site can say about the failure. It is
 * `unknown` because nothing narrows it usefully at the catch site; read it for
 * a report, never branch on it.
 *
 * @example
 * ```ts
 * import { ScaffoldError, isScaffoldError } from '@orkestrel/scaffold'
 *
 * try {
 * 	throw new ScaffoldError('INVALID', 'Blueprint is not an exact record')
 * } catch (error) {
 * 	if (isScaffoldError(error)) error.code // 'INVALID'
 * }
 * ```
 */
export class ScaffoldError extends Error {
	readonly code: ScaffoldErrorCode
	readonly context?: unknown

	/**
	 * Construct a coded scaffold error.
	 *
	 * @param code - The coded reason the error is raised.
	 * @param message - What went wrong, in one sentence.
	 * @param context - Whatever the raising site can say about the failure.
	 */
	constructor(code: ScaffoldErrorCode, message: string, context?: unknown) {
		super(message)
		this.name = 'ScaffoldError'
		this.code = code
		this.context = context
	}
}

/**
 * Narrow a caught value to a {@link ScaffoldError}.
 *
 * @param value - The caught value to narrow.
 * @returns `true` when `value` is a {@link ScaffoldError}.
 *
 * @example
 * ```ts
 * import { isScaffoldError } from '@orkestrel/scaffold'
 *
 * isScaffoldError(new Error('plain')) // false
 * isScaffoldError(undefined) // false
 * ```
 */
export function isScaffoldError(value: unknown): value is ScaffoldError {
	return value instanceof ScaffoldError
}
