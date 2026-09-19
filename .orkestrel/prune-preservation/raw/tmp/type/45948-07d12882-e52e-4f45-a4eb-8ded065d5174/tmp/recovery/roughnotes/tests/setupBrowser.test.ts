import { afterEach, describe, expect, it } from 'vitest'
import { createRecorder, requireValue, waitForText } from '@orkestrel/test'
import {
	build,
	readContrast,
	readName,
	readPage,
	readPerception,
	readRefusal,
	readStates,
	readStyle,
	resolveAccessible,
	waitForAnimations,
} from '@orkestrel/test/browser'
import {
	ABOUT_PATH,
	CONTACT_PATH,
	COPY,
	HomeView,
	MAGAZINE_PATH,
	PAYMENT_PATH,
	PRODUCTS_PATH,
	SHOP_PATH,
	SUBSCRIBE_PATH,
	buildName,
} from '@app/browser'
import {
	CENSUS_ROUTES,
	COMMIT_CONTROL,
	CONTENT_CONTROL,
	DATA_CASES,
	GRADIENT_SURFACES,
	HOME_HEADING,
	HOME_ROLES,
	MARK_CONTRAST,
	MENU_UNREACHABLE,
	SELECTED_CONTROL,
	SHELL_NAMES,
	SIGN_IN_ABSENT,
	SUMMARY_CONTROL,
	TEXT_CONTRAST,
	THEME_PROBE,
	UNSELECTED_CONTROL,
	UNINDEXED_SKU,
	applyTheme,
	clearSurface,
	closeSite,
	followRoute,
	followSite,
	mountView,
	openSite,
	openSurface,
	readCompact,
	readGradient,
	readGradientContrast,
	readHeading,
	readIsland,
	readNames,
	readShared,
	readThemeControl,
	resizeViewport,
	searchMissingMarket,
	selectEmptyCategory,
	selectEmptyDepartment,
	selectRole,
	startSubscription,
	submitEmptyInquiry,
	submitEmptyInvoice,
	submitEmptySubscription,
	submitInquiry,
	submitInvoice,
	submitSubscription,
	toggleThemeControl,
	readFileName,
	readOpeningTag,
	waitForOrigin,
} from './setupBrowser.js'

afterEach(clearSurface)

describe('browser setup infrastructure', () => {
	it('mounts and clears an isolated view and theme probe', async () => {
		const view = mountView(HomeView)
		await waitForText('the mounted view paints', readPage, HOME_HEADING)
		expect(view.host.isConnected).toBe(true)
		clearSurface()
		expect(view.host.isConnected).toBe(false)
		const probe = mountView(THEME_PROBE)
		expect(readStates(resolveAccessible(COPY.dark))).toContain('pressed=false')
		await toggleThemeControl()
		expect(readStates(resolveAccessible(COPY.light))).toContain('pressed=true')
		clearSurface()
		expect(probe.host.isConnected).toBe(false)
		expect(document.body.children).toHaveLength(0)
	})

	it('opens and closes compact navigation and resolves only the modal action', async () => {
		await resizeViewport(390, 844)
		const { host } = await openSurface()
		const menu = requireValue(host.querySelector('#site-menu'))
		const lifecycle = createRecorder<readonly [Event]>()
		console.log(
			`menu-motion | reduced ${String(matchMedia('(prefers-reduced-motion: reduce)').matches)} | transition ${readStyle(menu, 'transition-duration')}`,
		)
		menu.addEventListener('shown.bs.offcanvas', lifecycle.handler)
		menu.addEventListener('hidden.bs.offcanvas', lifecycle.handler)
		expect(readCompact()).toBe(true)
		const trigger = resolveAccessible('button', COPY.menu)
		await openSite()
		expect(readStates(trigger)).toContain('expanded')
		expect(readRefusal('button', COPY.menu)).toBe(MENU_UNREACHABLE)
		expect(readPerception(COPY.menu)).toContain(COPY.shop)
		const action = resolveAccessible('link', buildName(COPY.started, COPY.site))
		expect(action.closest('[aria-modal="true"]')).not.toBeNull()
		expect(readName(action)).toBe('Get started, Site')
		expect(readShared()).toEqual([])
		await closeSite()
		expect(lifecycle.calls.map((call) => call[0].type)).toEqual([
			'shown.bs.offcanvas',
			'hidden.bs.offcanvas',
		])
		menu.removeEventListener('shown.bs.offcanvas', lifecycle.handler)
		menu.removeEventListener('hidden.bs.offcanvas', lifecycle.handler)
		expect(readStates(resolveAccessible(COPY.menu))).toContain('collapsed')
		expect(() => readPerception(COPY.menu)).toThrow('Named region "Menu" is not visible')
		await followSite(buildName(COPY.about, COPY.site))
		await waitForOrigin()
		expect(readHeading()).toBe('About Rough Notes')
		await resizeViewport(1280, 800)
		await openSurface()
		expect(readCompact()).toBe(false)
		await openSite()
		expect(readRefusal(COPY.menu)).toBe(MENU_UNREACHABLE)
		await closeSite()
	})

	it('applies dark and light color modes through the theme control', async () => {
		await resizeViewport(1280, 800)
		await openSurface()
		await applyTheme('dark-390')
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark')
		expect(readThemeControl(true).name).toBe(COPY.light)
		await applyTheme('light-1280')
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light')
		expect(readThemeControl(false).name).toBe(COPY.dark)
	})

	it('reads gradient stops and excludes invisible role members', async () => {
		await resizeViewport(1280, 800)
		const { host } = await openSurface()
		await waitForAnimations(host)
		for (const surface of GRADIENT_SURFACES) {
			const specimen = build('p', {
				text: 'Declared gradient paint',
				attributes: {
					class:
						surface.selector === ".card[data-bs-theme='dark']" ? 'card' : surface.selector.slice(1),
					'data-bs-theme': 'dark',
					style: 'color: rgb(255, 255, 255)',
				},
			})
			host.append(specimen)
			expect(readGradient(specimen)).toEqual(surface)
			expect(readStyle(specimen, 'background-image')).not.toBe('none')
			const stops = readGradientContrast(specimen)
			const published = readContrast(specimen)
			console.log(
				`gradient | ${surface.selector} | published ${published.toFixed(6)} | stops ${stops.toFixed(6)}`,
			)
			expect(stops).toBeGreaterThanOrEqual(TEXT_CONTRAST)
			expect(published).not.toBe(stops)
			specimen.remove()
		}
		const opaque = build('p', {
			attributes: { style: 'color: rgb(0, 0, 0); background-color: rgb(255, 255, 255)' },
		})
		host.append(opaque)
		expect(readGradient(opaque)).toBeUndefined()
		expect(readGradientContrast(opaque)).toBe(21)
		expect(readIsland(opaque)).toBe(false)
		opaque.setAttribute('data-bs-theme', 'dark')
		expect(readIsland(opaque)).toBe(true)
		const hidden = build('p', { attributes: { hidden: '' } })
		host.append(hidden)
		const role = requireValue(HOME_ROLES.find((entry) => entry.label === 'body text'))
		expect(selectRole(host, role).length).toBeGreaterThan(0)
		expect(
			selectRole(host, { label: 'hidden fixture', selector: '[hidden]', bar: TEXT_CONTRAST }),
		).toEqual([])
		expect(MARK_CONTRAST).toBe(3)
		expect(readFileName('tmp\\capture\\states\\home--light-390.png')).toBe('home--light-390.png')
		expect(readOpeningTag('<p class="card">Text</p>')).toBe('<p class="card">')
		expect(CONTENT_CONTROL.name).toBe('Shop catalog, Company')
		expect(COMMIT_CONTROL.name).toBe(COPY.subscribe)
		expect(SELECTED_CONTROL.name).toBe('All articles')
		expect(UNSELECTED_CONTROL.name).toBe('Program business')
		expect(SUMMARY_CONTROL.name).toBe(`${COPY.name} is required.`)
	})

	it('reads the declared route and data-state census through real mounted screens', async () => {
		await resizeViewport(1280, 800)
		await openSurface()
		expect(readNames()).toContain('Get started, Site')
		expect(readShared()).toEqual([])
		expect(readRefusal('Sign In')).toBe(SIGN_IN_ABSENT)
		expect(SHELL_NAMES).toContain('Get started, Site')
		expect(CENSUS_ROUTES).toContain(ABOUT_PATH)
		await followRoute(PRODUCTS_PATH)
		expect(readHeading()).toBe('Products')
		for (const entry of DATA_CASES) {
			await openSurface({
				path: entry.path,
				...(entry.catalog === undefined ? {} : { catalog: entry.catalog }),
			})
			await entry.act?.()
			expect(readHeading().length).toBeGreaterThan(0)
			expect(readNames().length).toBeGreaterThan(0)
			expect(readShared(), `${entry.state} ${entry.path}`).toEqual([])
		}
	}, 30_000)

	it('drives the application-specific empty-result and request acts', async () => {
		await resizeViewport(1280, 800)
		await openSurface({ path: MAGAZINE_PATH })
		await selectEmptyCategory()
		expect(readPage()).toContain(COPY.none)
		await openSurface({ path: SHOP_PATH, catalog: { skus: [UNINDEXED_SKU] } })
		await selectEmptyDepartment()
		expect(readPage()).toContain(COPY.vacant)
		await openSurface({ path: '/marketplace' })
		await searchMissingMarket()
		expect(readPage()).toContain(COPY.empty)
		await openSurface()
		await startSubscription()
		await submitEmptySubscription()
		expect(readPage()).toContain(COPY.summary)
		await submitSubscription()
		expect(readPage()).toContain(COPY.accepted)
		await openSurface({ path: CONTACT_PATH })
		await submitEmptyInquiry()
		expect(readPage()).toContain(COPY.inquirySummary)
		await submitInquiry()
		expect(readPage()).toContain(COPY.inquiryAccepted)
		await openSurface({ path: PAYMENT_PATH })
		await submitEmptyInvoice()
		expect(readPage()).toContain(COPY.paymentSummary)
		await submitInvoice()
		expect(readPage()).toContain(COPY.paymentAccepted)
		expect(SUBSCRIBE_PATH).toBe('/subscribe')
	}, 30_000)
})
