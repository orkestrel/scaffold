import type { ScaffoldInterface, ScaffoldOptions } from './types.js'

/**
 * A working `Scaffold` — pure data, no behavior.
 *
 * @example
 * ```ts
 * const instance = new Scaffold({ id: 'example' })
 * ```
 */
export class Scaffold implements ScaffoldInterface {
	readonly id: string

	constructor(options: ScaffoldOptions = {}) {
		this.id = typeof options.id === 'string' ? options.id : crypto.randomUUID()
	}
}
