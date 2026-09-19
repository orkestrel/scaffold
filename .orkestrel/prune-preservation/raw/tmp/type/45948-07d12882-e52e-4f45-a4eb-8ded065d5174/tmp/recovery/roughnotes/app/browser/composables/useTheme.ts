import type { ThemeView } from '../types.js'
import { bindToggle } from '../helpers.js'
import { useApplication } from './useApplication.js'

/**
 * Exposes the persisted dark-mode flag and its toggle.
 *
 * @returns The readonly `dark` ref and `toggle`
 *
 * @example
 * ```ts
 * const { dark, toggle } = useTheme()
 * toggle()
 * ```
 */
export function useTheme(): ThemeView {
	const app = useApplication()
	return {
		dark: app.dark,
		toggle: bindToggle(app),
	}
}
