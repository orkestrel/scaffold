import { afterEach, describe, expect, it } from 'vitest'
import { requireValue, waitForCondition } from '@orkestrel/test'
import { COPY, ProductView } from '@app/browser'
import { clearSurface, mountView } from '../../../setupBrowser.js'

afterEach(() => {
	clearSurface()
})

describe('ProductView', () => {
	it('paints the featured product from the route slug', async () => {
		const { app, host } = mountView(ProductView)
		app.open('/products/roughnotes-pro')
		await waitForCondition('RoughNotes-Pro paints', () =>
			(host.textContent ?? '').includes('RoughNotes-Pro'),
		)
		expect(requireValue(host.querySelector('h1')).textContent?.trim()).toBe('RoughNotes-Pro')
		expect(host.textContent).toContain('Most requested')
		expect(host.textContent).toContain('Policy Forms & Manual Analysis')
	})

	it('ends in one primary action, a route to the desk, and the listing', async () => {
		const { app, host } = mountView(ProductView)
		app.open('/products/roughnotes-pro')
		await waitForCondition(
			'the continuation paints',
			() => host.querySelector('.border-top') !== null,
		)
		const tail = requireValue(host.querySelector('.border-top'))
		const controls = [...tail.querySelectorAll('.btn')]
		expect(controls.map((node) => node.textContent?.trim())).toEqual([COPY.started, COPY.ask])
		expect(requireValue(controls[0]).matches('.btn-primary')).toBe(true)
		expect(requireValue(controls[0]).getAttribute('href')).toBe('#/subscribe')
		expect(requireValue(controls[1]).matches('.btn-outline-secondary')).toBe(true)
		expect(requireValue(controls[1]).getAttribute('href')).toBe('#/contact')
		const listing = requireValue(tail.querySelector(`a[href="#/products"]`))
		expect(listing.textContent?.trim()).toBe(COPY.listing)
		expect(listing.matches('.btn')).toBe(false)
	})

	it('paints the miss inside the page frame', async () => {
		const { app, host } = mountView(ProductView)
		app.open('/products/missing-product')
		await waitForCondition('the missing product paints', () =>
			(host.textContent ?? '').includes(COPY.missing),
		)
		expect(requireValue(host.querySelector('h1')).textContent?.trim()).toBe('Products')
		expect(host.querySelector(`nav[aria-label="${COPY.trail}"]`)).not.toBeNull()
		const notice = requireValue(host.querySelector('[role="status"]'))
		expect(notice.textContent).toContain(COPY.missing)
		expect(notice.querySelector('.bi-search')).not.toBeNull()
		const recovery = requireValue(notice.querySelector('a'))
		expect(recovery.textContent?.trim()).toBe(COPY.listing)
		expect(recovery.getAttribute('href')).toBe('#/products')
	})
})
