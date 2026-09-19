import { afterEach, describe, expect, it } from 'vitest'
import type { Sku } from '@app/core'
import { page } from 'vitest/browser'
import { createApp, nextTick } from 'vue'
import { requireValue } from '@orkestrel/test'
import { SKUS, createCatalog } from '@app/core'
import {
	APPLICATION_KEY,
	COPY,
	ShopView,
	createApplication,
	createMemoryStorage,
} from '@app/browser'
import { clearSurface, mountView } from '../setup.js'

/** The department filter no books-only catalog can fill. */
const BARE_DEPARTMENT = 'Calculator wheels'

/** The host every live order opens on. */
const EXTERNAL_HOST = 'shoppingcart.roughnotes.com'

/**
 * Mounts the shop listing over a catalog holding exactly `skus`.
 *
 * @param skus - The SKUs the catalog reports
 * @returns The mounted host and the teardown that releases it
 */
function openShop(skus: readonly Sku[]): {
	readonly host: HTMLElement
	readonly release: () => void
} {
	const app = createApplication({
		catalog: createCatalog({ skus }),
		storage: createMemoryStorage(),
	})
	app.start()
	const host = document.createElement('div')
	document.body.append(host)
	const vue = createApp(ShopView)
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

/**
 * Presses the filter control carrying `name`.
 *
 * @param host - The mounted host
 * @param name - The control's exact text
 */
async function pressFilter(host: HTMLElement, name: string): Promise<void> {
	const control = [...host.querySelectorAll('button')].find(
		(node) => node.textContent?.trim() === name,
	)
	requireValue(control, `No filter control is named ${name}`).click()
	await nextTick()
}

/**
 * Reads an element's text with every run of whitespace collapsed.
 *
 * @param node - The element to read
 * @returns The collapsed text
 */
function readText(node: Element): string {
	return (node.textContent ?? '').replaceAll(/\s+/gu, ' ').trim()
}

afterEach(() => {
	clearSurface()
})

describe('ShopView', () => {
	it('paints the shop catalog and a fixture SKU', () => {
		const { host } = mountView(ShopView)
		expect(host.textContent).toContain(COPY.catalog)
		expect(host.textContent).toContain(COPY.live)
		expect(host.textContent).toContain('#30040')
	})

	it('paints every item as an entry carrying the figures a buyer compares', () => {
		const { host } = mountView(ShopView)
		const entries = [...host.querySelectorAll('article.card.lift')]
		expect(entries).toHaveLength(SKUS.length)
		const first = requireValue(entries[0])
		expect([...first.querySelectorAll('dt')].map((node) => node.textContent?.trim())).toEqual([
			'Catalog',
			'Price',
		])
		const values = [...first.querySelectorAll('dd')]
		expect(values.map((node) => node.textContent?.trim())).toEqual(['#30040', '$78.00'])
		for (const value of values) {
			expect(value.classList.contains('figures-tabular')).toBe(true)
		}
	})

	it('starts its head and its filters at the same edge and counts the catalog', async () => {
		await page.viewport(1280, 800)
		const { host } = mountView(ShopView)
		const heading = requireValue(host.querySelector('h1'))
		const filters = requireValue(host.querySelector('[role="group"]'))
		expect(filters.getBoundingClientRect().left).toBe(heading.getBoundingClientRect().left)
		expect(host.querySelector('.justify-content-center')).toBeNull()
		expect(readText(host)).toContain(
			`${String(SKUS.length)} of ${String(SKUS.length)} in this catalog`,
		)
	})

	it('reports a department holding nothing and keeps its filters', async () => {
		const books = SKUS.filter((sku) => sku.department === 'books')
		const { host, release } = openShop(books)
		try {
			await pressFilter(host, BARE_DEPARTMENT)
			const notice = requireValue(host.querySelector('[role="status"]'))
			expect(notice.textContent).toContain(COPY.vacant)
			expect(notice.querySelector('.bi-search')).not.toBeNull()
			expect(readText(host)).toContain(`0 of ${String(books.length)} in this catalog`)
			expect(host.querySelectorAll('article.card.lift')).toHaveLength(0)
			const names = [...host.querySelectorAll('button')].map((node) => node.textContent?.trim())
			expect(names).toContain('All items')
			expect(names.filter((name) => name === COPY.every)).toHaveLength(1)
		} finally {
			release()
		}
	})

	it('announces a catalog holding no items and drops the filters it cannot operate', () => {
		const { host, release } = openShop([])
		try {
			const notice = requireValue(host.querySelector('[role="status"]'))
			expect(notice.textContent).toContain('No items in this catalog yet')
			expect(notice.querySelector('.bi-inbox')).not.toBeNull()
			expect(requireValue(notice.querySelector('a')).getAttribute('href')).toBe('#/contact')
			expect(host.querySelector('[role="group"]')).toBeNull()
		} finally {
			release()
		}
	})

	it('ends in the external commit and the in-app action, each distinguishable', () => {
		const { host } = mountView(ShopView)
		const tail = requireValue(host.querySelector('.border-top'))
		const links = [...tail.querySelectorAll('a')]
		expect(links.map((node) => node.textContent?.trim())).toEqual([
			COPY.live,
			COPY.order,
			COPY.payment,
		])
		for (const external of [requireValue(links[0]), requireValue(links[1])]) {
			expect(external.getAttribute('rel')).toBe('noreferrer')
			expect(external.querySelector('.bi-box-arrow-up-right')).not.toBeNull()
			expect(external.querySelector('.bi-arrow-right')).toBeNull()
		}
		expect(requireValue(links[0]).classList.contains('btn-primary')).toBe(true)
		expect(requireValue(links[2]).getAttribute('href')).toBe('#/payment')
		expect(requireValue(links[2]).getAttribute('rel')).toBeNull()
		expect(readText(tail)).toContain(EXTERNAL_HOST)
	})
})
