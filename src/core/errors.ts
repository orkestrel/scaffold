import type { ScaffoldErrorCode } from './types.js'

/**
 * Carries a `ScaffoldErrorCode` + optional `context` (AGENTS §12).
 *
 * @remarks
 * Throws are reserved for caller misuse: `createBlueprint` on off-contract
 * data throws `INVALID`, any method after `destroy()` throws `DESTROYED`, and
 * on the server surface a non-vacant target throws `TARGET` while a failed
 * write throws `WRITE`. A failing gate is NOT an error — it fails closed into
 * an incomplete `Scaffolding` whose `failures` carry a `BLOCKED` marker.
 *
 * @example
 * ```ts
 * import { ScaffoldError, isScaffoldError } from '@orkestrel/scaffold'
 *
 * try {
 * 	throw new ScaffoldError('INVALID', 'Blueprint failed the exact-record contract')
 * } catch (error) {
 * 	if (isScaffoldError(error)) error.code // 'INVALID'
 * }
 * ```
 */
export class ScaffoldError extends Error {
	readonly code: ScaffoldErrorCode
	readonly context?: unknown

	constructor(code: ScaffoldErrorCode, message: string, context?: unknown) {
		super(message)
		this.name = 'ScaffoldError'
		this.code = code
		this.context = context
	}
}

/**
 * Narrow a caught value to a `ScaffoldError`.
 *
 * @param value - The caught value to narrow.
 * @returns `true` when `value` is a {@link ScaffoldError}.
 *
 * @example
 * ```ts
 * import { isScaffoldError } from '@orkestrel/scaffold'
 *
 * isScaffoldError(new Error('plain')) // false
 * ```
 */
export function isScaffoldError(value: unknown): value is ScaffoldError {
	return value instanceof ScaffoldError
}
