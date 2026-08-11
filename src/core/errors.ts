import type { ScaffoldErrorCode } from './types.js'

/**
 * The one error this package throws, carrying the coded reason it was raised.
 *
 * @remarks
 * Each code names one cause: `INVALID` for off-contract input, `DESTROYED` for
 * any call made after teardown, `TARGET` for a destination that is not what the
 * caller's observation said it was, `WRITE` for a mutation that could not be
 * completed, `FETCH` for an upstream read that produced no answer the caller can
 * be given, and `BLOCKED` for a refused blueprint.
 *
 * `BLOCKED` covers both refusals a blueprint can meet, because they are one fact
 * — this blueprint will not be built — and the questions say which. The compiler
 * answers its refusal rather than throwing it: the gate fails closed, returns the
 * questions that closed it, and records `BLOCKED` on its stage, so a caller reads
 * that refusal from the value it asked for. A verb that creates a workspace
 * throws it, because it chose the shape and has nothing to hand back. A blocking
 * question closed the gate; a non-blocking one is a shape this package can
 * describe and declines to create.
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
