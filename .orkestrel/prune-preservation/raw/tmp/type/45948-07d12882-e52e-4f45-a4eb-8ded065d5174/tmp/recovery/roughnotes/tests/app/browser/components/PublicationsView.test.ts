import { afterEach, describe, expect, it } from 'vitest'
import { requireValue } from '@orkestrel/test'
import { COPY, PublicationsView, SUBSCRIBE_PATH, hashHref } from '@app/browser'
import { clearSurface, mountView } from '../../../setupBrowser.js'

afterEach(() => {
	clearSurface()
})

describe('PublicationsView', () => {
	it('paints the publication desks', () => {
		const { host } = mountView(PublicationsView)
		expect(host.textContent).toContain('Publications')
		expect(host.textContent).toContain(COPY.newsletter)
	})

	it('carries the catalog fact a reader chooses each desk by', () => {
		const { host } = mountView(PublicationsView)
		const labels = [...host.querySelectorAll('dt')].map((node) => node.textContent?.trim())
		const values = [...host.querySelectorAll('dd')].map((node) => node.textContent?.trim())
		expect(labels).toEqual(['Issue', 'Listings', 'Documents'])
		expect(values).toEqual(['September 2026', '12', '9'])
	})

	it('lists the newsletters desk once and keeps magazine delivery out of the desks', () => {
		const { host } = mountView(PublicationsView)
		const desks = requireValue(host.querySelector(`[aria-label="${COPY.publications}"]`))
		const links = [...desks.querySelectorAll('a')]
		expect(links.map((node) => node.textContent?.trim())).toEqual([
			'Rough Notes magazine',
			'The Insurance Marketplace',
			COPY.newsletter,
			COPY.media,
		])
		expect(desks.querySelector(`a[href="${hashHref(SUBSCRIBE_PATH)}"]`)).toBeNull()
	})

	it('ends in the delivery offer the desks no longer repeat', () => {
		const { host } = mountView(PublicationsView)
		const controls = [...host.querySelectorAll('.btn')]
		expect(controls.map((node) => node.textContent?.trim())).toEqual([COPY.started, COPY.magazine])
		expect(requireValue(controls[0]).getAttribute('href')).toBe(hashHref(SUBSCRIBE_PATH))
	})
})
