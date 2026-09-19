import { afterEach, describe, expect, it } from 'vitest'
import { createApp } from 'vue'
import { requireValue } from '@orkestrel/test'
import { PRODUCTS, createCatalog } from '@app/core'
import {
	APPLICATION_KEY,
	COPY,
	ProductsView,
	createApplication,
	createMemoryStorage,
} from '@app/browser'
import { clearSurface, mountView } from '../../../setupBrowser.js'

/**
 * Mounts the product listing over a catalog holding no products.
 *
 * @returns The mounted host and the teardown that releases it
 */
function openEmptyProducts(): { readonly host: HTMLElement; readonly release: () => void } {
	const app = createApplication({
		catalog: createCatalog({ products: [] }),
		storage: createMemoryStorage(),
	})
	app.start()
	const host = document.createElement('div')
	document.body.append(host)
	const vue = createApp(ProductsView)
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

describe('ProductsView', () => {
	it('paints the product offerings', () => {
		const { host } = mountView(ProductsView)
		expect(host.textContent).toContain('Products')
		expect(host.textContent).toContain('RoughNotes-Pro')
		expect(host.querySelector(`[aria-label="${COPY.offerings}"]`)).not.toBeNull()
	})

	it('states the most requested product on the one entry that holds it', () => {
		const { host } = mountView(ProductsView)
		const offerings = requireValue(host.querySelector(`[aria-label="${COPY.offerings}"]`))
		expect(offerings.querySelectorAll('a[href="#/products/roughnotes-pro"]')).toHaveLength(1)
		const entries = [...offerings.querySelectorAll('article.card.lift')]
		expect(entries).toHaveLength(PRODUCTS.length)
		for (const entry of entries) {
			expect(requireValue(entry.querySelector('a')).parentElement?.tagName).toBe('H3')
		}
		const ranked = entries.filter((entry) => entry.querySelector('.accent') !== null)
		expect(ranked).toHaveLength(1)
		const featured = requireValue(ranked[0])
		expect(requireValue(featured.querySelector('.accent')).textContent?.trim()).toBe(
			'Most requested',
		)
		expect(requireValue(featured.querySelector('a')).getAttribute('href')).toBe(
			'#/products/roughnotes-pro',
		)
	})

	it('counts the records it lists', () => {
		const { host } = mountView(ProductsView)
		const offerings = requireValue(host.querySelector(`[aria-label="${COPY.offerings}"]`))
		expect([...offerings.querySelectorAll('h2')].map((node) => node.textContent?.trim())).toEqual([
			'Every product',
		])
		expect(readText(offerings)).toContain(
			`${String(PRODUCTS.length)} of ${String(PRODUCTS.length)} in this catalog`,
		)
	})

	it('announces a catalog holding no products and offers the office', () => {
		const { host, release } = openEmptyProducts()
		try {
			const notice = requireValue(host.querySelector('[role="status"]'))
			expect(notice.textContent).toContain('No products in this catalog yet')
			expect(notice.querySelector('.bi-inbox')).not.toBeNull()
			expect(requireValue(notice.querySelector('a')).getAttribute('href')).toBe('#/contact')
			expect(host.querySelectorAll('article.card.lift')).toHaveLength(0)
		} finally {
			release()
		}
	})

	it('ends in one continuation action', () => {
		const { host } = mountView(ProductsView)
		const tail = requireValue(host.querySelector('.border-top'))
		const controls = [...tail.querySelectorAll('.btn')]
		expect(controls.map((node) => node.textContent?.trim())).toEqual([COPY.contact])
		expect(requireValue(controls[0]).matches('.btn-primary')).toBe(true)
	})
})
