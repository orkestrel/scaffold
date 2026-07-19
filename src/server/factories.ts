import type {
	MaterializerInterface,
	MaterializerOptions,
	SyncInterface,
	SyncOptions,
} from './types.js'
import { Materializer } from './Materializer.js'
import { Sync } from './Sync.js'

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

/**
 * Create a `SyncInterface` (server) — the upstream-synchronization entity,
 * seeded from `SyncOptions`.
 *
 * @param options - Optional endpoint bases/branch, concurrency, retries, strict, emitter hooks, and error handler
 * @returns A {@link SyncInterface}
 *
 * @example
 * ```ts
 * import { createSync } from '@orkestrel/scaffold/server'
 *
 * const sync = createSync()
 * sync.destroy()
 * ```
 */
export function createSync(options?: SyncOptions): SyncInterface {
	return new Sync(options)
}
