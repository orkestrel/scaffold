import { afterEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { createApp, nextTick } from 'vue'
import { requireValue } from '@orkestrel/test'
import { MARKETS, createCatalog } from '@app/core'
import {
	APPLICATION_KEY,
	COPY,
	MarketplaceView,
	createApplication,
	createMemoryStorage,
} from '@app/browser'
import { clearSurface, mountView } from '../../../setupBrowser.js'

/** The width the `measure` role bounds a reading column to, in CSS pixels. */
const MEASURE = 640

/** A query the fixture sample cannot match. */
const NO_MATCH = 'zzzz-no-such-market'

/** A query the fixture sample matches. */
const MATCH = 'liability'

/**
 * Mounts the marketplace over a catalog holding no listings.
 *
 * @returns The mounted host and the teardown that releases it
 */
function openEmptyMarketplace(): { readonly host: HTMLElement; readonly release: () => void } {
	const app = createApplication({
		catalog: createCatalog({ markets: [] }),
		storage: createMemoryStorage(),
	})
	app.start()
	const host = document.createElement('div')
	document.body.append(host)
	const vue = createApp(MarketplaceView)
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
 * Types `query` into the search field and submits the form.
 *
 * @param host - The mounted host
 * @param query - The text to search for
 */
async function runSearch(host: HTMLElement, query: string): Promise<void> {
	const field = requireValue(host.querySelector('input'))
	field.value = query
	field.dispatchEvent(new Event('input', { bubbles: true }))
	await nextTick()
	requireValue(host.querySelector('form')).requestSubmit()
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

describe('MarketplaceView', () => {
	it('paints the marketplace directory', () => {
		const { host } = mountView(MarketplaceView)
		expect(host.textContent).toContain('Insurance Marketplace')
		expect(host.textContent).toContain(COPY.search)
	})

	it('bounds the search field to the words a reader types', async () => {
		await page.viewport(1280, 800)
		const { host } = mountView(MarketplaceView)
		const field = requireValue(host.querySelector('input'))
		expect(field.getBoundingClientRect().width).toBeLessThanOrEqual(MEASURE)
	})

	it('counts the sample it lists and offers no clear path before a search', () => {
		const { host } = mountView(MarketplaceView)
		expect(readText(host)).toContain(
			`${String(MARKETS.length)} of ${String(MARKETS.length)} in this sample`,
		)
		expect(
			[...host.querySelectorAll('button')].some((node) => node.textContent?.trim() === COPY.clear),
		).toBe(false)
	})

	it('reports a miss, keeps the query, and carries the clear path in the notice', async () => {
		const { host } = mountView(MarketplaceView)
		await runSearch(host, NO_MATCH)
		const notice = requireValue(host.querySelector('[role="status"]'))
		expect(notice.textContent).toContain(COPY.empty)
		expect(notice.querySelector('.bi-search')).not.toBeNull()
		expect(readText(host)).toContain(`0 of ${String(MARKETS.length)} in this sample`)
		expect(requireValue(host.querySelector('input')).value).toBe(NO_MATCH)
		const clears = [...host.querySelectorAll('button')].filter(
			(node) => node.textContent?.trim() === COPY.clear,
		)
		expect(clears).toHaveLength(1)
		expect(notice.contains(requireValue(clears[0]))).toBe(true)
	})

	it('keeps one clear path while a search still matches', async () => {
		const { host } = mountView(MarketplaceView)
		await runSearch(host, MATCH)
		const rows = [...host.querySelectorAll('li')]
		expect(rows.length).toBeGreaterThan(0)
		expect(rows.length).toBeLessThan(MARKETS.length)
		expect(readText(host)).toContain(
			`${String(rows.length)} of ${String(MARKETS.length)} in this sample`,
		)
		const clears = [...host.querySelectorAll('button')].filter(
			(node) => node.textContent?.trim() === COPY.clear,
		)
		expect(clears).toHaveLength(1)
		requireValue(clears[0]).click()
		await nextTick()
		expect(host.querySelectorAll('li')).toHaveLength(MARKETS.length)
		expect(requireValue(host.querySelector('input')).value).toBe('')
	})

	it('announces a sample holding no listings and offers the office', () => {
		const { host, release } = openEmptyMarketplace()
		try {
			const notice = requireValue(host.querySelector('[role="status"]'))
			expect(notice.textContent).toContain('No markets in this sample yet')
			expect(notice.querySelector('.bi-inbox')).not.toBeNull()
			expect(requireValue(notice.querySelector('a')).getAttribute('href')).toBe('#/contact')
			expect(host.querySelector('form')).toBeNull()
		} finally {
			release()
		}
	})

	it('ends in one continuation action', () => {
		const { host } = mountView(MarketplaceView)
		const tail = requireValue(host.querySelector('.border-top'))
		const controls = [...tail.querySelectorAll('.btn')]
		expect(controls.map((node) => node.textContent?.trim())).toEqual([COPY.media])
		expect(requireValue(controls[0]).matches('.btn-primary')).toBe(true)
		expect(requireValue(controls[0]).getAttribute('href')).toBe('#/media')
	})
})
