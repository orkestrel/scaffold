import { USAGE_CODE } from './constants.js'

/**
 * The error raised when a command line is not a command.
 *
 * @remarks
 * Distinct from `ScaffoldError` because the two answer different questions and
 * exit differently: a `ScaffoldError` says the package could not serve a
 * well-formed request and exits `1`, while this says there was no request to
 * serve and exits `2`. Folding a usage error into `INVALID` would report a
 * mistyped flag as a failed run.
 *
 * It carries no `context`. Everything a caller can act on is in the message,
 * because the reader of a usage error is a person at a terminal rather than a
 * program branching on a cause.
 *
 * @example
 * ```ts
 * import { isUsageError, UsageError } from './errors.js'
 *
 * try {
 * 	throw new UsageError("Unknown command 'pull'.")
 * } catch (error) {
 * 	if (isUsageError(error)) error.code // 'USAGE'
 * }
 * ```
 */
export class UsageError extends Error {
	readonly code: string

	/**
	 * Construct a usage error.
	 *
	 * @param message - What was wrong with the command line, in one sentence.
	 */
	constructor(message: string) {
		super(message)
		this.name = 'UsageError'
		this.code = USAGE_CODE
	}
}

/**
 * Narrow a caught value to a {@link UsageError}.
 *
 * @param value - The caught value to narrow.
 * @returns `true` when `value` is a {@link UsageError}.
 *
 * @example
 * ```ts
 * import { isUsageError } from './errors.js'
 *
 * isUsageError(new Error('plain')) // false
 * isUsageError(undefined) // false
 * ```
 */
export function isUsageError(value: unknown): value is UsageError {
	return value instanceof UsageError
}
