import { afterEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { requireValue } from '@orkestrel/test'
import { COPY, HomeView } from '@app/browser'
import { HOME_HEADING, clearSurface, mountView } from '../../../setupBrowser.js'

afterEach(() => {
	clearSurface()
})

describe('HomeView', () => {
	it('paints the home heading', () => {
		const { host } = mountView(HomeView)
		expect(host.textContent).toContain(HOME_HEADING)
	})

	it('paints each repeated record as an entry whose title carries no prose underline', async () => {
		await page.viewport(1280, 800)
		const { host } = mountView(HomeView)
		const entries = [...host.querySelectorAll('article.card.lift')]
		expect(entries.length).toBeGreaterThan(0)
		for (const entry of entries) {
			const link = requireValue(entry.querySelector('a'))
			expect(requireValue(link.parentElement).tagName).toBe('H3')
			expect(getComputedStyle(link).textDecorationColor.endsWith(', 0)')).toBe(true)
		}
	})

	it('starts the trust line and its wordmarks at the same edge', async () => {
		await page.viewport(1280, 800)
		const { host } = mountView(HomeView)
		const band = requireValue(host.querySelector('.bg-body-tertiary'))
		const lead = requireValue(band.querySelector('p'))
		const marks = [...band.querySelectorAll('li')]
		expect(marks).toHaveLength(4)
		const first = requireValue(marks[0]).getBoundingClientRect()
		expect(first.left).toBe(lead.getBoundingClientRect().left)
		expect(lead.getBoundingClientRect().bottom).toBeLessThanOrEqual(first.top)
	})

	it('ends in one continuation action and asks for nothing there', async () => {
		await page.viewport(1280, 800)
		const { host } = mountView(HomeView)
		const invite = requireValue(host.querySelector('.invite'))
		expect(invite.querySelectorAll('input, select, textarea')).toHaveLength(0)
		const controls = [...invite.querySelectorAll('.btn')]
		expect(controls).toHaveLength(1)
		const control = requireValue(controls[0])
		expect(control.textContent?.trim()).toBe(COPY.started)
		expect(control.matches('.btn-primary')).toBe(true)
	})
})
