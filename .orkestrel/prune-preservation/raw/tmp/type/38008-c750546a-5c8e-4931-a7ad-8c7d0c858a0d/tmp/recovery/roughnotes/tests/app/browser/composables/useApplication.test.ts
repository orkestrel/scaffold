import { afterEach, describe, expect, it } from 'vitest'
import { captureError } from '@orkestrel/test'
import { createApp } from 'vue'
import { HomeView } from '@app/browser'
import { clearSurface } from '../../../setupBrowser.js'

afterEach(() => {
	clearSurface()
})

describe('useApplication', () => {
	it('throws when APPLICATION_KEY has not been provided', () => {
		const host = document.createElement('div')
		document.body.append(host)
		const vue = createApp(HomeView)
		const error = captureError(() => {
			vue.mount(host)
		})
		expect(error).toBeInstanceOf(Error)
		expect(String(error)).toContain('APPLICATION_KEY')
		host.remove()
	})
})
