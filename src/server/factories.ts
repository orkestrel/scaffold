import type {
	MaterializerInterface,
	MaterializerOptions,
	UpstreamInterface,
	UpstreamOptions,
} from './types.js'
import { Materializer } from './Materializer.js'
import { Upstream } from './Upstream.js'

/**
 * Construct a {@link Materializer}.
 *
 * @param options - The vendored host root, the initial listeners, and the listener-error handler.
 * @returns The materializer, typed as the contract consumers program against.
 * @throws {@link ScaffoldError} coded `INVALID` when `options` is present but is
 * not an option bag the materializer accepts, and `TARGET` when the host carries
 * a manifest that cannot be read or does not match what it stores.
 *
 * @example
 * ```ts
 * import { createMaterializer } from '@orkestrel/scaffold/server'
 *
 * const materializer = createMaterializer({ host: './dist/host' })
 * materializer.destroy()
 * ```
 */
export function createMaterializer(options?: MaterializerOptions): MaterializerInterface {
	return new Materializer(options)
}

/**
 * Construct an {@link Upstream}.
 *
 * @param options - The two endpoints, the request bounds, the initial listeners,
 * and the listener-error handler.
 * @returns The reader, typed as the contract consumers program against.
 * @throws {@link ScaffoldError} coded `INVALID` when `options` is present but is
 * not an option bag the reader accepts, or when either endpoint names a scheme,
 * host, or form the reader will not request.
 *
 * @example
 * ```ts
 * import { createUpstream } from '@orkestrel/scaffold/server'
 *
 * const upstream = createUpstream({ guides: { branch: 'main' } })
 * upstream.destroy()
 * ```
 */
export function createUpstream(options?: UpstreamOptions): UpstreamInterface {
	return new Upstream(options)
}
