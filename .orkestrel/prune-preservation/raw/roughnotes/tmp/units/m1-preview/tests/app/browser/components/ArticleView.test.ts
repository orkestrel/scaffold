import { afterEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { requireValue, waitForCondition } from '@orkestrel/test'
import { ARTICLES, followArticle } from '@app/core'
import { ArticleView, COPY } from '@app/browser'
import { clearSurface, mountView } from '../setup.js'

/** The article every case opens. */
const SLUG = 'local-landscape'

afterEach(() => {
	clearSurface()
})

describe('ArticleView', () => {
	it('paints the featured article from the route slug', async () => {
		const { app, host } = mountView(ArticleView)
		app.open(`/magazine/${SLUG}`)
		await waitForCondition('the article paints', () =>
			(host.textContent ?? '').includes('A permanent part of the local landscape'),
		)
		expect(requireValue(host.querySelector('h1')).textContent?.trim()).toBe(
			'A permanent part of the local landscape',
		)
		expect(host.textContent).toContain('Christopher W. Cook')
	})

	it('puts the headline before the category band', async () => {
		await page.viewport(390, 844)
		const { app, host } = mountView(ArticleView)
		app.open(`/magazine/${SLUG}`)
		await waitForCondition('the band paints', () => host.querySelector('.tone') !== null)
		const heading = requireValue(host.querySelector('h1'))
		const band = requireValue(host.querySelector('.tone'))
		expect(heading.getBoundingClientRect().bottom).toBeLessThanOrEqual(
			band.getBoundingClientRect().top,
		)
		expect(band.textContent?.trim()).toBe('Management')
	})

	it('ends in the next article in the issue and a way back to it', async () => {
		const { app, host } = mountView(ArticleView)
		app.open(`/magazine/${SLUG}`)
		await waitForCondition(
			'the continuation paints',
			() => host.querySelector('.border-top') !== null,
		)
		const next = requireValue(followArticle(ARTICLES, SLUG), 'the issue cannot continue')
		const tail = requireValue(host.querySelector('.border-top'))
		const entry = requireValue(tail.querySelector('article.card.lift'))
		const title = requireValue(entry.querySelector('h3 a'))
		expect(title.textContent?.trim()).toBe(next.title)
		expect(title.getAttribute('href')).toBe(`#/magazine/${next.id}`)
		const controls = [...tail.querySelectorAll('.btn')]
		expect(controls.map((node) => node.textContent?.trim())).toEqual([COPY.magazine])
		expect(requireValue(controls[0]).getAttribute('href')).toBe('#/magazine')
	})

	it('paints the miss inside the page frame', async () => {
		const { app, host } = mountView(ArticleView)
		app.open('/magazine/missing-article')
		await waitForCondition('the missing article paints', () =>
			(host.textContent ?? '').includes(COPY.missing),
		)
		expect(requireValue(host.querySelector('h1')).textContent?.trim()).toBe('Magazine')
		expect(host.querySelector(`nav[aria-label="${COPY.trail}"]`)).not.toBeNull()
		const notice = requireValue(host.querySelector('[role="status"]'))
		expect(notice.textContent).toContain(COPY.missing)
		expect(notice.querySelector('.bi-search')).not.toBeNull()
		const recovery = requireValue(notice.querySelector('a'))
		expect(recovery.textContent?.trim()).toBe(COPY.magazine)
		expect(recovery.getAttribute('href')).toBe('#/magazine')
	})
})
