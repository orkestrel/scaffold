import { afterEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { requireValue, waitForCondition } from '@orkestrel/test'
import {
	clickAccessible,
	describeFocus,
	findRule,
	readClasses,
	readName,
	readHit,
	readPerception,
	readStates,
	readRefusal,
	resolveAccessible,
	waitForState,
} from '@orkestrel/test/browser'
import {
	ABOUT_PATH,
	COPY,
	FOOTER_GROUPS,
	PRODUCTS_PATH,
	UTILITY_GROUPS,
	hashHref,
} from '@app/browser'
import {
	CENSUS_ROUTES,
	CLOSE_UNREACHABLE,
	MENU_UNREACHABLE,
	DATA_CASES,
	DETAIL_SLUGS,
	SHELL_NAMES,
	SIBLING_SLUG,
	clearSurface,
	closeSite,
	followRoute,
	openSite,
	openSurface,
	readCompact,
	readNames,
	readShared,
} from '../../setupBrowser.js'

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

/** Caps the walk over every screen at both widths, in ms. */
const CENSUS_BUDGET = 180_000

/** Caps the walk over every declared data state at both widths, in ms. */
const STATES_BUDGET = 300_000

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
			expect(control.matches('.btn-primary')).toBe(true)
			expect(control.matches('.btn-warning')).toBe(false)
		}
	})

	it('names every shell destination for the region carrying it', async () => {
		const { host } = await openSurface()
		const utility = [...host.querySelectorAll('ul[aria-label]')].flatMap((list) => [
			...list.querySelectorAll('a'),
		])
		const masthead = [...host.querySelectorAll('.masthead .btn-primary, .masthead .nav-link')]
		const menu = [...host.querySelectorAll('#site-menu .nav-link, #site-menu .btn-primary')]
		const footer = [...requireValue(host.querySelector('footer')).querySelectorAll('a')]
		expect([...utility, ...masthead, ...menu, ...footer].map((node) => readName(node))).toEqual(
			SHELL_NAMES,
		)
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
				controls
					.map((control) => {
						// Instant scroll excludes the root's smooth scrolling from the cover reading.
						control.scrollIntoView({ behavior: 'instant', block: 'start' })
						const hit = readHit(control)
						const name = readName(control)
						if (hit === undefined) return `${name} reaches nothing`
						if (control.contains(hit)) return `${name} reaches itself`
						if (hit.closest('.masthead') !== null) return `${name} reaches the masthead`
						return `${name} reaches ${hit.tagName}`
					})
					.filter((reading) => !reading.endsWith('reaches itself')),
				`${String(width)} px buries a scrolled-to control`,
			).toEqual([])
			clearSurface()
		}
		await page.viewport(1280, 800)
	})

	it('observes the compact menu trigger as collapsed, expanded, and collapsed again', async () => {
		await page.viewport(390, 844)
		await openSurface()
		const trigger = resolveAccessible('button', COPY.menu)
		expect(readStates(trigger)).toContain('collapsed')
		await openSite()
		expect(trigger.isConnected).toBe(true)
		expect(readStates(trigger)).toContain('expanded')
		expect(readRefusal('button', COPY.menu)).toBe(MENU_UNREACHABLE)
		expect(readPerception(COPY.menu)).toContain(COPY.shop)
		await closeSite()
		expect(readStates(resolveAccessible('button', COPY.menu))).toContain('collapsed')
		clearSurface()
		await page.viewport(1280, 800)
	})

	it(
		'leaves no reachable control on any screen sharing a name with another',
		async () => {
			const findings: string[] = []
			const unread: string[] = []
			for (const [width, height] of WIDTHS) {
				await page.viewport(width, height)
				await openSurface()
				for (const [index, path] of CENSUS_ROUTES.entries()) {
					if (index > 0) await followRoute(path)
					if (readNames().length === 0) unread.push(`${String(width)} px | ${path}`)
					findings.push(...readShared().map((voice) => `${String(width)} px | ${path} | ${voice}`))
					if (!readCompact()) continue
					await openSite()
					findings.push(
						...readShared().map((voice) => `${String(width)} px | ${path} | menu open | ${voice}`),
					)
					await closeSite()
				}
				clearSurface()
			}
			await page.viewport(1280, 800)
			expect(unread, 'a screen offered the census no reachable control').toEqual([])
			expect(findings).toEqual([])
		},
		CENSUS_BUDGET,
	)

	it(
		'leaves no reachable control sharing a name in any state the guide declares',
		async () => {
			const findings: string[] = []
			const unread: string[] = []
			for (const [width, height] of WIDTHS) {
				await page.viewport(width, height)
				for (const reached of DATA_CASES) {
					await openSurface(reached.catalog === undefined ? {} : { catalog: reached.catalog })
					await followRoute(reached.path)
					await reached.act?.()
					const place = `${String(width)} px | ${reached.path} | ${reached.state}`
					if (readNames().length === 0) unread.push(place)
					findings.push(...readShared().map((voice) => `${place} | ${voice}`))
					clearSurface()
				}
			}
			await page.viewport(1280, 800)
			expect(unread, 'a declared data state offered the census no reachable control').toEqual([])
			expect(findings).toEqual([])
		},
		STATES_BUDGET,
	)

	it('hides the compact menu on a navigation taken while it is still opening', async () => {
		await page.viewport(390, 844)
		const { host } = await openSurface()
		const menu = requireValue(host.querySelector('#site-menu'))
		menu.addEventListener(
			'show.bs.offcanvas',
			() => {
				window.location.hash = hashHref(ABOUT_PATH)
			},
			{ once: true },
		)
		await clickAccessible('button', COPY.menu)
		await waitForCondition(
			'the compact menu has left the screen',
			() => readRefusal(COPY.close) === CLOSE_UNREACHABLE,
			{ budget: 4_000, interval: 25 },
		)
		expect(await waitForState('button', COPY.menu, 'collapsed', { budget: 4_000 })).toContain(
			'collapsed',
		)
		clearSurface()
		await page.viewport(1280, 800)
	})

	it('hides the compact menu on a navigation that stays on one view', async () => {
		await page.viewport(390, 844)
		await openSurface()
		await followRoute(`${PRODUCTS_PATH}/${requireValue(DETAIL_SLUGS.product)}`)
		await openSite()
		await followRoute(`${PRODUCTS_PATH}/${SIBLING_SLUG}`)
		await waitForCondition(
			'the compact menu has left the screen',
			() => readRefusal(COPY.close) === CLOSE_UNREACHABLE,
			{ budget: 4_000, interval: 25 },
		)
		expect(await waitForState('button', COPY.menu, 'collapsed', { budget: 4_000 })).toContain(
			'collapsed',
		)
		clearSurface()
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
