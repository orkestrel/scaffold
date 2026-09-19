import { createStorage } from '@orkestrel/test/browser'
import { afterEach, describe, expect, it } from 'vitest'
import { createRecorder, waitForCondition } from '@orkestrel/test'
import {
	THEME_DARK,
	THEME_LIGHT,
	THEME_STORAGE,
	ROUTES,
	createApplication,
	createMemoryStorage,
} from '@app/browser'
import { readPage } from '@orkestrel/test/browser'
import { DETAIL_SLUGS, HOME_HEADING, clearSurface, openSurface } from '../../../setupBrowser.js'

afterEach(() => {
	clearSurface()
	window.location.hash = ''
	document.documentElement.setAttribute('data-bs-theme', 'light')
})

describe('ApplicationController', () => {
	it('starts on the fallback path and opens a named view', async () => {
		const app = createApplication({ storage: createMemoryStorage() })
		app.start()
		expect(app.location.value?.meta.view).toBe('home')
		app.open('/products')
		await waitForCondition(
			'the products view is active',
			() => app.location.value?.meta.view === 'products',
		)
		app.open('/products/roughnotes-pro')
		await waitForCondition(
			'the product detail is active',
			() =>
				app.location.value?.meta.view === 'product' &&
				app.location.value.params.slug === 'roughnotes-pro',
		)
		app.open('/shop/coverages-applicable')
		await waitForCondition(
			'the shop item is active',
			() =>
				app.location.value?.meta.view === 'item' &&
				app.location.value.params.slug === 'coverages-applicable',
		)
		app.open('/about')
		await waitForCondition(
			'the about view is active',
			() => app.location.value?.meta.view === 'about',
		)
		app.destroy()
	})

	it('accepts a valid subscription and keeps submit possible after a refusal', () => {
		const app = createApplication({ storage: createMemoryStorage() })
		const accepted = createRecorder()
		app.emitter.on('subscribe', accepted.handler)
		expect(app.subscription.submit({ name: '  ', email: 'not-an-email' })).toBe(false)
		expect(app.subscription.issues.value).toEqual(['name', 'email'])
		expect(app.subscription.accepted.value).toBeUndefined()
		expect(app.subscription.check({ name: 'Ada Lovelace', email: 'ada@agency.com' })).toBe(true)
		expect(app.subscription.issues.value).toEqual([])
		expect(app.subscription.accepted.value).toBeUndefined()
		expect(accepted.count).toBe(0)
		expect(app.subscription.submit({ name: 'Ada Lovelace', email: 'ada@agency.com' })).toBe(true)
		expect(app.subscription.issues.value).toBeUndefined()
		expect(app.subscription.accepted.value).toEqual({
			name: 'Ada Lovelace',
			email: 'ada@agency.com',
		})
		expect(accepted.calls).toEqual([[{ name: 'Ada Lovelace', email: 'ada@agency.com' }]])
		expect(app.subscription.check({})).toBe(false)
		expect(app.subscription.accepted.value?.name).toBe('Ada Lovelace')
		expect(accepted.count).toBe(1)
		app.destroy()
	})

	it('accepts a valid inquiry and keeps submit possible after a refusal', () => {
		const app = createApplication({ storage: createMemoryStorage() })
		const accepted = createRecorder()
		app.emitter.on('inquire', accepted.handler)
		expect(app.inquiry.submit({ name: '', company: '', email: 'no', phone: 'abc' })).toBe(false)
		expect(app.inquiry.issues.value).toEqual(['name', 'company', 'email', 'phone'])
		expect(app.inquiry.accepted.value).toBeUndefined()
		expect(
			app.inquiry.check({
				name: 'Ada Lovelace',
				company: 'Agency',
				email: 'ada@agency.com',
				phone: '1',
			}),
		).toBe(true)
		expect(app.inquiry.issues.value).toEqual([])
		expect(app.inquiry.accepted.value).toBeUndefined()
		expect(accepted.count).toBe(0)
		expect(
			app.inquiry.submit({
				name: 'Ada Lovelace',
				company: 'Agency',
				email: 'ada@agency.com',
				phone: '800-428-4384',
			}),
		).toBe(true)
		expect(app.inquiry.issues.value).toBeUndefined()
		expect(app.inquiry.accepted.value?.company).toBe('Agency')
		expect(accepted.count).toBe(1)
		expect(app.inquiry.check({})).toBe(false)
		expect(app.inquiry.accepted.value?.company).toBe('Agency')
		expect(accepted.count).toBe(1)
		app.destroy()
	})

	it('accepts a valid invoice and keeps submit possible after a refusal', () => {
		const app = createApplication({ storage: createMemoryStorage() })
		const accepted = createRecorder()
		app.emitter.on('pay', accepted.handler)
		expect(app.payment.submit({ customer: '', number: '', amount: '0' })).toBe(false)
		expect(app.payment.issues.value).toEqual(['customer', 'number', 'amount'])
		expect(app.payment.accepted.value).toBeUndefined()
		expect(app.payment.check({ customer: '1001', number: '1001', amount: '78.00' })).toBe(true)
		expect(app.payment.issues.value).toEqual([])
		expect(app.payment.accepted.value).toBeUndefined()
		expect(accepted.count).toBe(0)
		expect(app.payment.submit({ customer: '1001', number: '1001', amount: '78.00' })).toBe(true)
		expect(app.payment.issues.value).toBeUndefined()
		expect(app.payment.accepted.value).toEqual({ customer: '1001', number: '1001', amount: 7800 })
		expect(accepted.calls).toEqual([[{ customer: '1001', number: '1001', amount: 7800 }]])
		expect(app.payment.check({})).toBe(false)
		expect(app.payment.accepted.value?.amount).toBe(7800)
		expect(accepted.count).toBe(1)
		app.destroy()
	})

	it('persists the dark flag onto storage and the document', () => {
		const storage = createMemoryStorage()
		const app = createApplication({ storage })
		app.start()
		app.theme(true)
		expect(storage.getItem(THEME_STORAGE)).toBe(THEME_DARK)
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEME_DARK)
		app.destroy()
	})

	it('paints the mode a refusing store will not keep, and lets no refusal escape', () => {
		// A store with no room left refuses every write, so `start` and the control a person
		// presses next each meet the refusal. The mode is a display preference, so it applies for
		// this session and stays unremembered; what must never happen is a flag announcing a mode
		// the document does not paint, or an error reaching the window.
		const storage = createStorage({ quota: 0 })
		expect(() => storage.setItem(THEME_STORAGE, THEME_DARK)).toThrow(
			new DOMException(`No room is left for ${THEME_STORAGE}`, 'QuotaExceededError'),
		)
		const theme = createRecorder()
		const app = createApplication({ storage, on: { theme: theme.handler } })
		expect(() => {
			app.start()
		}).not.toThrow()
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEME_LIGHT)
		expect(() => {
			app.theme(true)
		}).not.toThrow()
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEME_DARK)
		expect(app.dark.value).toBe(true)
		expect(storage.getItem(THEME_STORAGE)).toBeNull()
		expect(theme.calls).toEqual([[true]])
		app.destroy()
	})

	it('keeps the flag and the document agreeing when the store accepts the write', () => {
		const storage = createStorage({ quota: 4 })
		const app = createApplication({ storage })
		app.start()
		app.theme(true)
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEME_DARK)
		expect(storage.getItem(THEME_STORAGE)).toBe(THEME_DARK)
		expect(app.dark.value).toBe(true)
		app.destroy()
	})

	it('constructs and paints the light default when the host refuses the read', async () => {
		// A browser holding storage behind a permission raises from `getItem`, and the controller
		// reads the remembered mode while it is being constructed, so an unguarded read escapes
		// `createApplication` before any view is mounted and the reader is left with a blank page.
		// The mode a refused read answers with is the light one a reader with no stored preference
		// already gets.
		const storage = createStorage({ reads: false, writes: false })
		const app = createApplication({ storage })
		expect(app.dark.value).toBe(false)
		expect(() => {
			app.start()
		}).not.toThrow()
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEME_LIGHT)
		app.destroy()
		const surface = await openSurface({ storage })
		expect(readPage()).toContain(HOME_HEADING)
		expect(surface.app.dark.value).toBe(false)
		expect(document.documentElement.getAttribute('data-bs-theme')).toBe(THEME_LIGHT)
	})

	it('opens every registered path to its view', async () => {
		const app = createApplication({ storage: createMemoryStorage() })
		app.start()
		for (const route of ROUTES) {
			const slug = DETAIL_SLUGS[route.meta.view]
			const path = slug === undefined ? route.path : route.path.replace(':slug', slug)
			app.open(path)
			await waitForCondition(
				`${route.meta.view} is active`,
				() => app.location.value?.meta.view === route.meta.view,
			)
		}
		expect(app.location.value?.meta.view).toBe(ROUTES.at(-1)?.meta.view)
		app.destroy()
	})

	it('forwards navigate and theme through the emitter', async () => {
		const navigate = createRecorder()
		const theme = createRecorder()
		const app = createApplication({
			storage: createMemoryStorage(),
			on: {
				navigate: navigate.handler,
				theme: theme.handler,
			},
		})
		app.start()
		await waitForCondition('home has navigated', () => navigate.count > 0)
		app.theme(true)
		expect(theme.count).toBeGreaterThan(0)
		expect(app.dark.value).toBe(true)
		app.destroy()
	})
})
