import { afterEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { requireValue } from '@orkestrel/test'
import { describeFocus, findRule, readClasses } from '@orkestrel/test/browser'
import { COPY, FOOTER_GROUPS, UTILITY_GROUPS } from '@app/browser'
import { clearSurface, openSurface } from './setup.js'

/** The hrefs the footer owes, in reading order, declared apart from the source that builds them. */
const FOOTER_HREFS: readonly string[] = [
	'#/products/roughnotes-pro',
	'#/products/advantage-plus',
	'#/products/marketplace',
	'#/publications',
	'#/magazine',
	'#/marketplace',
	'#/newsletter',
	'#/subscribe',
	'#/about',
	'#/media',
	'#/contact',
	'#/shop',
	'#/payment',
	'tel:800-428-4384',
	'mailto:rnc@roughnotes.com',
]

/** The viewports the shell changes shape at. */
const WIDTHS: ReadonlyArray<readonly [number, number]> = [
	[1280, 800],
	[390, 844],
]

/**
 * Reads what a pointer aimed at a control's own centre actually reaches.
 *
 * @param control - The control a reader has just scrolled to
 * @returns The control's name paired with what the centre hits
 *
 * @remarks
 * A sticky masthead that covers the scrolled-to control resolves here as the masthead rather
 * than as the control, which is what a reader's tap and a driver's click both land on. The
 * scroll is instant because Bootstrap's reboot declares smooth scrolling on the root, and a
 * reading taken while that animation is still running measures the scroll rather than the cover.
 */
function readCentre(control: Element): string {
	control.scrollIntoView({ behavior: 'instant', block: 'start' })
	const box = control.getBoundingClientRect()
	const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)
	const name = control.textContent?.trim() ?? ''
	if (hit === null) return `${name} reaches nothing`
	if (control.contains(hit)) return `${name} reaches itself`
	if (hit.closest('.masthead') !== null) return `${name} reaches the masthead`
	return `${name} reaches ${hit.tagName}`
}

/**
 * Reads the accessible name of each control in a focus-order description.
 *
 * @param element - The host whose controls are described
 * @returns Each control's accessible name, in the order a keyboard visits them
 *
 * @remarks
 * The role is dropped deliberately. A reader hears two adjacent stops called Get started as a
 * repetition whether one of them is a button, so the name alone is what the pin compares.
 */
function readStops(element: HTMLElement): readonly string[] {
	return describeFocus(element)
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line.length > 0)
		.map((line) => requireValue(/"(.*)"$/u.exec(line)?.[1], `${line} names no control`))
}

afterEach(() => {
	clearSurface()
})

describe('App', () => {
	it('paints the skip control and the home heading', async () => {
		const { host } = await openSurface()
		expect(host.textContent).toContain(COPY.skip)
		expect(host.textContent).toContain('The knowledge that makes independent agents unstoppable.')
	})

	it('renders every footer destination from the declared groups', async () => {
		const { host } = await openSurface()
		const footer = requireValue(host.querySelector('footer'))
		const links = [...footer.querySelectorAll('a')]
		const declared = FOOTER_GROUPS.flatMap((group) => group.links)
		expect(links.map((node) => node.textContent?.trim())).toEqual(
			declared.map((link) => link.label),
		)
		expect(links.map((node) => node.getAttribute('href'))).toEqual(FOOTER_HREFS)
	})

	it('renders every utility destination from the declared groups', async () => {
		const { host } = await openSurface()
		const lists = [...host.querySelectorAll('ul[aria-label]')]
		expect(lists.map((node) => node.getAttribute('aria-label'))).toEqual(
			UTILITY_GROUPS.map((group) => group.title),
		)
		const links = lists.flatMap((list) => [...list.querySelectorAll('a')])
		const declared = UTILITY_GROUPS.flatMap((group) => group.links)
		expect(links.map((node) => node.textContent?.trim())).toEqual(
			declared.map((link) => link.label),
		)
		expect(links.map((node) => node.getAttribute('href'))).toEqual(
			declared.map((link) => link.destination),
		)
	})

	it('opens with the screen heading and gives every footer group a real one', async () => {
		const { host } = await openSurface()
		const headings = [...host.querySelectorAll('h1, h2, h3, h4, h5, h6')]
		const first = requireValue(headings[0])
		expect(first.tagName).toBe('H1')
		expect(requireValue(host.querySelector('#main')).contains(first)).toBe(true)
		const footer = requireValue(host.querySelector('footer'))
		expect([...footer.querySelectorAll('h2')].map((node) => node.textContent?.trim())).toEqual(
			FOOTER_GROUPS.map((group) => group.title),
		)
	})

	it('builds the brand lockup from one definition', async () => {
		const { host } = await openSurface()
		const lockups = [...host.querySelectorAll('.monogram')].map(
			(node) => requireValue(node.parentElement).outerHTML,
		)
		expect(lockups).toHaveLength(2)
		expect(requireValue(lockups[1])).toBe(requireValue(lockups[0]))
		expect(host.querySelector('.navbar-brand .monogram')).not.toBeNull()
		expect(host.querySelector('footer .monogram')).not.toBeNull()
		expect(readClasses(host).has('mark')).toBe(false)
		expect(findRule('.monogram')).toBeDefined()
	})

	it('gives the shell one rank for Get started', async () => {
		const { host } = await openSurface()
		const main = requireValue(host.querySelector('#main'))
		const controls = [...host.querySelectorAll('a')].filter(
			(node) => !main.contains(node) && node.textContent?.trim() === COPY.started,
		)
		expect(controls).toHaveLength(3)
		for (const control of controls) {
			expect(control.classList.contains('btn-primary')).toBe(true)
			expect(control.classList.contains('btn-warning')).toBe(false)
		}
	})

	it('keeps the masthead sticky from lg and lets it scroll away below it', async () => {
		const readings: string[] = []
		for (const [width, height] of WIDTHS) {
			await page.viewport(width, height)
			const { host } = await openSurface()
			const masthead = requireValue(host.querySelector('.masthead'))
			readings.push(`${String(width)} ${getComputedStyle(masthead).position}`)
			clearSurface()
		}
		expect(readings).toEqual(['1280 sticky', '390 static'])
		await page.viewport(1280, 800)
	})

	it('leaves a scrolled-to control reaching itself under the masthead at every width', async () => {
		for (const [width, height] of WIDTHS) {
			await page.viewport(width, height)
			const { host } = await openSurface()
			const main = requireValue(host.querySelector('#main'))
			const controls = [...main.querySelectorAll('.btn')]
			expect(controls.length).toBeGreaterThan(0)
			expect(
				controls.map(readCentre).filter((reading) => !reading.endsWith('reaches itself')),
				`${String(width)} px buries a scrolled-to control`,
			).toEqual([])
			clearSurface()
		}
		await page.viewport(1280, 800)
	})

	it('leaves no two adjacent focus stops sharing an accessible name', async () => {
		for (const [width, height] of WIDTHS) {
			await page.viewport(width, height)
			const { host } = await openSurface()
			const stops = readStops(host)
			expect(stops.length).toBeGreaterThan(0)
			expect(
				stops.filter((stop, index) => index > 0 && stop === stops[index - 1]),
				`${String(width)} px repeats an adjacent name`,
			).toEqual([])
			clearSurface()
		}
	})
})
