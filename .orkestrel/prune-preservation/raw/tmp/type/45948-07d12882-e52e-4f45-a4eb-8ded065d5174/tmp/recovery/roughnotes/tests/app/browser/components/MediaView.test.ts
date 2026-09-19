import { afterEach, describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { requireValue } from '@orkestrel/test'
import { ASSETS, CHANNELS, createCatalog } from '@app/core'
import {
	APPLICATION_KEY,
	COPY,
	MediaView,
	createApplication,
	createMemoryStorage,
} from '@app/browser'
import { clearSurface, mountView } from '../../../setupBrowser.js'

/** The host every fixture document opens on. */
const EXTERNAL_HOST = 'roughnotes.com'

/**
 * Mounts the media screen over a catalog holding no documents.
 *
 * @returns The mounted host and the teardown that releases it
 */
function openEmptyMedia(): { readonly host: HTMLElement; readonly release: () => void } {
	const app = createApplication({
		catalog: createCatalog({ assets: [] }),
		storage: createMemoryStorage(),
	})
	app.start()
	const host = document.createElement('div')
	document.body.append(host)
	const vue = createApp(MediaView)
	vue.provide(APPLICATION_KEY, app)
	vue.mount(host)
	return {
		host,
		release: () => {
			vue.unmount()
			host.remove()
			app.destroy()
		},
	}
}

afterEach(() => {
	clearSurface()
})

describe('MediaView', () => {
	it('paints the media kits and advertising reps', () => {
		const { host } = mountView(MediaView)
		expect(host.textContent).toContain(COPY.media)
		expect(host.textContent).toContain(COPY.advertising)
	})

	it('lists every document as a row rather than a full-width card', () => {
		const { host } = mountView(MediaView)
		const rows = [...host.querySelectorAll('li.list-group-item')]
		expect(rows).toHaveLength(ASSETS.length)
		expect(host.querySelectorAll('a.card')).toHaveLength(0)
		for (const row of rows) {
			expect(row.querySelector('.card')).toBeNull()
		}
	})

	it('names the host a document opens on without joining it to the link name', () => {
		const { host } = mountView(MediaView)
		const rows = [...host.querySelectorAll('li.list-group-item')]
		const names = rows.map((row) => requireValue(row.querySelector('a')).textContent?.trim())
		expect([...names].sort()).toEqual([...ASSETS].map((asset) => asset.name).sort())
		for (const row of rows) {
			expect(requireValue(row.querySelector('a')).textContent).not.toContain(EXTERNAL_HOST)
			expect(row.textContent).toContain(EXTERNAL_HOST)
			expect(row.querySelector('.bi-box-arrow-up-right')).not.toBeNull()
			expect(row.querySelector('.bi-arrow-right')).toBeNull()
		}
	})

	it('announces a channel holding no documents and offers the advertising desk', () => {
		const { host, release } = openEmptyMedia()
		try {
			const notices = [...host.querySelectorAll('[role="status"]')]
			expect(notices).toHaveLength(CHANNELS.length)
			for (const notice of notices) {
				expect(notice.textContent).toContain(COPY.absent)
				expect(requireValue(notice.querySelector('a')).getAttribute('href')).toBe('#/contact')
			}
			expect(host.querySelectorAll('li.list-group-item')).toHaveLength(0)
		} finally {
			release()
		}
	})
})
