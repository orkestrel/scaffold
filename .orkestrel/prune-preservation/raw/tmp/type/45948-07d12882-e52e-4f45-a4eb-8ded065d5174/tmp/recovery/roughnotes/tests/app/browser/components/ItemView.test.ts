import { afterEach, describe, expect, it } from 'vitest'
import type { Sku } from '@app/core'
import { createApp } from 'vue'
import { requireValue, waitForCondition } from '@orkestrel/test'
import { createCatalog } from '@app/core'
import {
	APPLICATION_KEY,
	COPY,
	ItemView,
	createApplication,
	createMemoryStorage,
} from '@app/browser'
import { clearSurface, mountView } from '../../../setupBrowser.js'

/** The host every live order opens on. */
const EXTERNAL_HOST = 'shoppingcart.roughnotes.com'

/** A book the live listing publishes no ISBN for. */
const BOOK: Sku = {
	id: 'unindexed-book',
	name: 'Insurance Words and Their Meanings',
	summary: 'The desk glossary agencies hand to a new producer.',
	department: 'books',
	code: '30110',
	price: 4200,
}

/** A calculator wheel, which no listing carries an ISBN for. */
const WHEEL: Sku = {
	id: 'unindexed-wheel',
	name: 'RONOCO short-rate wheel',
	summary: 'The cancellation calculator the service desk keeps beside the phone.',
	department: 'wheels',
	code: '27010',
	price: 7500,
}

/**
 * Mounts the item screen over a catalog holding exactly `skus`, opened at `slug`.
 *
 * @param skus - The SKUs the catalog reports
 * @param opened - The item the reader opens
 * @returns The mounted host and the teardown that releases it
 */
async function openItem(
	skus: readonly Sku[],
	opened: Sku,
): Promise<{ readonly host: HTMLElement; readonly release: () => void }> {
	const app = createApplication({
		catalog: createCatalog({ skus }),
		storage: createMemoryStorage(),
	})
	app.start()
	const host = document.createElement('div')
	document.body.append(host)
	const vue = createApp(ItemView)
	vue.provide(APPLICATION_KEY, app)
	vue.mount(host)
	app.open(`/shop/${opened.id}`)
	await waitForCondition(`${opened.name} paints`, () =>
		(host.textContent ?? '').includes(opened.name),
	)
	return {
		host,
		release: () => {
			vue.unmount()
			host.remove()
			app.destroy()
		},
	}
}

/**
 * Reads an element's text with every run of whitespace collapsed.
 *
 * @param node - The element to read
 * @returns The collapsed text
 */
function readText(node: Element): string {
	const rendered = node instanceof HTMLElement ? node.innerText : (node.textContent ?? '')
	return rendered.replaceAll(/\s+/gu, ' ').trim()
}

afterEach(() => {
	clearSurface()
})

describe('ItemView', () => {
	it('paints the fixture SKU from the route slug', async () => {
		const { app, host } = mountView(ItemView)
		app.open('/shop/coverages-applicable')
		await waitForCondition('the SKU paints', () => (host.textContent ?? '').includes('#30040'))
		expect(requireValue(host.querySelector('h1')).textContent?.trim()).toBe('Coverages Applicable')
		expect(readText(host)).toContain('Catalog #30040')
		const figures = [...host.querySelectorAll('.figures-tabular')].map((node) =>
			node.textContent?.trim(),
		)
		expect(figures).toContain('#30040')
		expect(figures).toContain('$78.00')
		expect(figures).toContain('978-1-56461-339-4')
	})

	it('omits the ISBN line and names the gap on a book that has none', async () => {
		const { host, release } = await openItem([BOOK, WHEEL], BOOK)
		try {
			expect([...host.querySelectorAll('dt')].map((node) => node.textContent?.trim())).toEqual([
				'Catalog',
			])
			const notice = requireValue(host.querySelector('[role="status"]'))
			expect(notice.textContent).toContain('No published ISBN')
			expect(notice.querySelector('.bi-funnel')).not.toBeNull()
			expect(requireValue(notice.querySelector('a')).getAttribute('href')).toBe('#/contact')
		} finally {
			release()
		}
	})

	it('leaves a record that owes no ISBN complete', async () => {
		const { host, release } = await openItem([BOOK, WHEEL], WHEEL)
		try {
			expect(host.textContent).not.toContain('ISBN')
			expect(host.querySelector('[role="status"]')).toBeNull()
		} finally {
			release()
		}
	})

	it('ends in the external commit, the in-app action, and the return', async () => {
		const { app, host } = mountView(ItemView)
		app.open('/shop/coverages-applicable')
		await waitForCondition(
			'the continuation paints',
			() => host.querySelector('.border-top') !== null,
		)
		const tail = requireValue(host.querySelector('.border-top'))
		const links = [...tail.querySelectorAll('a')]
		expect(links.map((node) => node.textContent?.trim())).toEqual([
			COPY.live,
			COPY.payment,
			COPY.stock,
		])
		const external = requireValue(links[0])
		expect(external.matches('.btn-primary')).toBe(true)
		expect(external.getAttribute('rel')).toBe('noreferrer')
		expect(external.querySelector('.bi-box-arrow-up-right')).not.toBeNull()
		expect(external.querySelector('.bi-arrow-right')).toBeNull()
		expect(requireValue(links[1]).getAttribute('href')).toBe('#/payment')
		expect(requireValue(links[2]).getAttribute('href')).toBe('#/shop')
		expect(requireValue(links[2]).matches('.btn')).toBe(false)
		expect(readText(tail)).toContain(EXTERNAL_HOST)
	})

	it('paints the miss inside the page frame', async () => {
		const { app, host } = mountView(ItemView)
		app.open('/shop/missing-item')
		await waitForCondition('the missing SKU paints', () =>
			(host.textContent ?? '').includes(COPY.missing),
		)
		expect(requireValue(host.querySelector('h1')).textContent?.trim()).toBe(COPY.catalog)
		expect(host.querySelector(`nav[aria-label="${COPY.trail}"]`)).not.toBeNull()
		const notice = requireValue(host.querySelector('[role="status"]'))
		expect(notice.textContent).toContain(COPY.missing)
		expect(notice.querySelector('.bi-search')).not.toBeNull()
		const recovery = requireValue(notice.querySelector('a'))
		expect(recovery.textContent?.trim()).toBe(COPY.stock)
		expect(recovery.getAttribute('href')).toBe('#/shop')
	})
})
