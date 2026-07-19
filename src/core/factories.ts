import type { ScaffoldInterface, ScaffoldOptions } from './types.js'
import { Scaffold } from './Scaffold.js'

/**
 * Create a `ScaffoldInterface`.
 *
 * @param options - An optional `id` (defaults to a random UUID)
 * @returns A working {@link ScaffoldInterface}
 *
 * @example
 * ```ts
 * import { createScaffold } from '@src/core'
 *
 * const instance = createScaffold({ id: 'example' })
 * ```
 */
export function createScaffold(options: ScaffoldOptions = {}): ScaffoldInterface {
	return new Scaffold(options)
}
