import type { ApplicationInterface } from '../types.js'
import { inject } from 'vue'
import { APPLICATION_KEY } from '../constants.js'

/**
 * Injects the application controller provided under {@link APPLICATION_KEY}.
 *
 * @returns The provided {@link ApplicationInterface}
 * @throws When no application has been provided
 *
 * @example
 * ```ts
 * const app = useApplication()
 * app.open('/magazine')
 * ```
 */
export function useApplication(): ApplicationInterface {
	const app = inject(APPLICATION_KEY)
	if (app === undefined) {
		throw new Error('useApplication() requires an application provided under APPLICATION_KEY')
	}
	return app
}
