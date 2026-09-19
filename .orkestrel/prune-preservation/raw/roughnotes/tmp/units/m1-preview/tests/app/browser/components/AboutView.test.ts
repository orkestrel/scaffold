import { afterEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { requireValue } from '@orkestrel/test'
import { AboutView, COPY } from '@app/browser'
import { clearSurface, mountView } from '../setup.js'

/** The width the `measure` role bounds a reading column to, in CSS pixels. */
const MEASURE = 640

/**
 * Finds the section a heading titles.
 *
 * @param host - The mounted host
 * @param heading - The exact `h2` text the section carries
 * @returns The matching section
 * @throws When no section carries that heading
 */
function findPanel(host: HTMLElement, heading: string): HTMLElement {
	const match = [...host.querySelectorAll('section')].find(
		(node) => node.querySelector('h2')?.textContent?.trim() === heading,
	)
	if (!(match instanceof HTMLElement)) throw new Error(`No section is headed ${heading}`)
	return match
}

afterEach(() => {
	clearSurface()
})

describe('AboutView', () => {
	it('paints the company timeline', () => {
		const { host } = mountView(AboutView)
		expect(host.textContent).toContain('About Rough Notes')
		expect(host.textContent).toContain(COPY.history)
	})

	it('leaves the mission and the credo at their own heights', async () => {
		await page.viewport(1280, 800)
		const { host } = mountView(AboutView)
		const mission = findPanel(host, 'Serve the independent agent market')
		const credo = findPanel(host, 'Satisfaction, or your money back')
		expect(credo.getBoundingClientRect().height).toBeLessThan(
			mission.getBoundingClientRect().height,
		)
		for (const panel of [mission, credo]) {
			expect(panel.classList.contains('h-100')).toBe(false)
		}
	})

	it('bounds every timeline entry to the reading measure', async () => {
		await page.viewport(1280, 800)
		const { host } = mountView(AboutView)
		const timeline = requireValue(host.querySelector('[aria-labelledby="company-timeline"]'))
		const bodies = [...timeline.querySelectorAll('li p:last-child')]
		expect(bodies.length).toBeGreaterThan(0)
		for (const body of bodies) {
			expect(body.getBoundingClientRect().width).toBeLessThanOrEqual(MEASURE)
		}
	})

	it('ranks its continuation and leaves the masthead to carry home', () => {
		const { host } = mountView(AboutView)
		const controls = [...host.querySelectorAll('.btn')]
		expect(controls.map((node) => node.textContent?.trim())).toEqual([
			COPY.explore,
			COPY.publications,
		])
		expect(requireValue(controls[0]).classList.contains('btn-primary')).toBe(true)
		expect(requireValue(controls[1]).classList.contains('btn-outline-secondary')).toBe(true)
		expect(host.querySelector('a[href="#/"]')).toBeNull()
	})
})
