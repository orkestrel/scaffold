import type { MaterializerInterface, MaterializerOptions } from './types.js'
import { Materializer } from './Materializer.js'

/**
 * Create a `MaterializerInterface` (server) — the materialization entity,
 * seeded from `MaterializerOptions`.
 *
 * @param options - Optional `host` root override, emitter hooks, and error handler
 * @returns A {@link MaterializerInterface}
 *
 * @example
 * ```ts
 * import { createMaterializer } from '@orkestrel/scaffold/server'
 *
 * const materializer = createMaterializer()
 * materializer.destroy()
 * ```
 */
export function createMaterializer(options?: MaterializerOptions): MaterializerInterface {
	return new Materializer(options)
}
