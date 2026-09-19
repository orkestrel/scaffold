import { afterEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { createApp, nextTick } from 'vue'
import { requireValue } from '@orkestrel/test'
import { ARTICLES, createCatalog } from '@app/core'
import {
	APPLICATION_KEY,
	COPY,
	MagazineView,
	createApplication,
	createMemoryStorage,
} from '@app/browser'
import { clearSurface, mountView } from '../setup.js'

/** The category no fixture article carries, so its filter reports a miss. */
const BARE_CATEGORY = 'Program business'

/**
 * Mounts the magazine listing over a catalog holding no articles.
 *
 * @returns The mounted host and the teardown that releases it
 */
function openEmptyMagazine(): { readonly host: HTMLElement; readonly release: () => void } {
	const app = createApplication({
		catalog: createCatalog({ articles: [] }),
		storage: createMemoryStorage(),
	})
	app.start()
	const host = document.createElement('div')
	document.body.append(host)
	const vue = createApp(MagazineView)
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

describe('MagazineView', () => {
	it('paints the magazine listing', () => {
		const { host } = mountView(MagazineView)
		expect(host.textContent).toContain('Magazine')
		expect(host.textContent).toContain('A permanent part of the local landscape')
	})

	it('starts its head and its filters at the same edge', async () => {
		await page.viewport(1280, 800)
		const { host } = mountView(MagazineView)
		const heading = requireValue(host.querySelector('h1'))
		const filters = requireValue(host.querySelector('[role="group"]'))
		expect(filters.getBoundingClientRect().left).toBe(heading.getBoundingClientRect().left)
		expect(host.querySelector('.text-center')).toBeNull()
		expect(host.querySelector('.justify-content-center')).toBeNull()
	})

	it('paints every article as an entry carrying its category and its issue', () => {
		const { host } = mountView(MagazineView)
		const entries = [...host.querySelectorAll('article.card.lift')]
		expect(entries).toHaveLength(ARTICLES.length)
		const first = requireValue(entries[0])
		expect([...first.querySelectorAll('dt')].map((node) => node.textContent?.trim())).toEqual([
			'Category',
			'Issued',
		])
		expect([...first.querySelectorAll('dd')].map((node) => node.textContent?.trim())).toEqual([
			'Coverage',
			'September 2026',
		])
		expect(host.querySelector('.tone')).toBeNull()
	})

	it('counts the issue and keeps its filters when a category matches nothing', async () => {
		const { host } = mountView(MagazineView)
		expect(readText(host)).toContain(
			`${String(ARTICLES.length)} of ${String(ARTICLES.length)} in this issue`,
		)
		await pressFilter(host, BARE_CATEGORY)
		const notice = requireValue(host.querySelector('[role="status"]'))
		expect(notice.textContent).toContain(COPY.none)
		expect(notice.querySelector('.bi-search')).not.toBeNull()
		expect(readText(host)).toContain(`0 of ${String(ARTICLES.length)} in this issue`)
		expect(host.querySelectorAll('article.card.lift')).toHaveLength(0)
		const names = [...host.querySelectorAll('button')].map((node) => node.textContent?.trim())
		expect(names).toContain('All articles')
		expect(names.filter((name) => name === COPY.all)).toHaveLength(1)
	})

	it('announces an issue holding no articles and drops the filters it cannot operate', () => {
		const { host, release } = openEmptyMagazine()
		try {
			const notice = requireValue(host.querySelector('[role="status"]'))
			expect(notice.textContent).toContain('No articles in this issue yet')
			expect(notice.querySelector('.bi-inbox')).not.toBeNull()
			expect(requireValue(notice.querySelector('a')).getAttribute('href')).toBe('#/publications')
			expect(host.querySelector('[role="group"]')).toBeNull()
			expect(
				[...host.querySelectorAll('button')].some((node) => node.textContent?.trim() === COPY.all),
			).toBe(false)
		} finally {
			release()
		}
	})

	it('ends in the delivery offer and a way back to the desks', () => {
		const { host } = mountView(MagazineView)
		const tail = requireValue(host.querySelector('.border-top'))
		const controls = [...tail.querySelectorAll('.btn')]
		expect(controls.map((node) => node.textContent?.trim())).toEqual([
			COPY.started,
			COPY.publications,
		])
		expect(requireValue(controls[0]).classList.contains('btn-primary')).toBe(true)
		expect(requireValue(controls[0]).getAttribute('href')).toBe('#/subscribe')
	})
})
