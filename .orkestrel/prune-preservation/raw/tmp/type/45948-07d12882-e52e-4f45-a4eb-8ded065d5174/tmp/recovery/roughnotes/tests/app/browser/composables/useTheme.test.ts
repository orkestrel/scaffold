import { afterEach, describe, expect, it } from 'vitest'
import { requireValue } from '@orkestrel/test'
import { THEME_DARK } from '@app/browser'
import { THEME_PROBE, clearSurface, mountView } from '../../../setupBrowser.js'

afterEach(() => {
	clearSurface()
})

describe('useTheme', () => {
	it('exposes the persisted dark flag and flips it', () => {
		const { app } = mountView(THEME_PROBE)
		expect(app.dark.value).toBe(false)
		const control = requireValue(document.querySelector('button'), 'theme probe paints no button')
		expect(control).toBeInstanceOf(HTMLButtonElement)
		if (!(control instanceof HTMLButtonElement)) {
			throw new Error('theme probe did not paint a button')
		}
		control.click()
		expect(app.dark.value).toBe(true)
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEME_DARK)
	})
})
