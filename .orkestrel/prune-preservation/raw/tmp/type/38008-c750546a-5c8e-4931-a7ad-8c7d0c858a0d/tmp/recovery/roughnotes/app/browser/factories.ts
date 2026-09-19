import type { ApplicationInterface, ApplicationOptions } from './types.js'
import { ApplicationController } from './controllers/ApplicationController.js'
import { MemoryStorage } from './MemoryStorage.js'

/**
 * Creates the knowledge-site application controller.
 *
 * @param options - Optional catalog, storage, and emitter hooks
 * @returns The live {@link ApplicationInterface}
 *
 * @example
 * ```ts
 * createApplication().catalog.product('roughnotes-pro')?.name
 * ```
 */
export function createApplication(options?: ApplicationOptions): ApplicationInterface {
	return new ApplicationController(options)
}

/**
 * Creates an in-memory {@link Storage} for isolated theme tests.
 *
 * @returns A {@link MemoryStorage} instance
 *
 * @example
 * ```ts
 * createMemoryStorage().getItem('roughnotes-theme')
 * ```
 */
export function createMemoryStorage(): Storage {
	return new MemoryStorage()
}
