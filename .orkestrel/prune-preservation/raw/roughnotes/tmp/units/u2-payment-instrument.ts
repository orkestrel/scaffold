import type { CaptureVariant } from '@orkestrel/test/browser'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { commands, page } from 'vitest/browser'
import { nextTick } from 'vue'
import { requireValue, waitForCondition } from '@orkestrel/test'
import {
	build,
	clearStorage,
	clickAccessible,
	clickAccessibleWithin,
	createJournal,
	createPortfolio,
	describeFocus,
	describeTree,
	expandCaptures,
	extractStyles,
	fillAccessible,
	mount,
	readCascade,
	readClasses,
	readContrast,
	readFrame,
	readPage,
	readRing,
	readStates,
	resolveAccessible,
	resolveRendered,
	traverseAccessible,
} from '@orkestrel/test/browser'
import type { ApplicationInterface } from '@app/browser'
import {
	COPY,
	THEME_DARK,
	CONTACT_PATH,
	PAYMENT_PATH,
	SUBSCRIBE_PATH,
	hashHref,
} from '@app/browser'
import {
	HOME_HEADING,
	SIGN_IN_ABSENT,
	SETTLE_BUDGET,
	SETTLE_INTERVAL,
	buildMarkControl,
	clearSurface,
	closeSite,
	followSite,
	openSite,
	openSurface,
	readRefusal,
	startSubscription,
	toggleThemeControl,
} from './setup.js'

const FAMILIES: readonly string[] = ['journey', 'refusal', 'matrix', 'transport', 'capture']

const STATES: readonly string[] = [
	'home',
	'product-detail',
	'magazine-empty',
	'marketplace-miss',
	'subscribe-refused',
	'subscribe-accepted',
	'about',
	'newsletter',
	'media',
	'shop-listing',
	'shop-detail',
	'contact-refused',
	'payment-refused',
]

function variantDark(name: string): boolean {
	return name.startsWith(`${THEME_DARK}-`)
}

async function paintVariant(app: ApplicationInterface, name: string): Promise<void> {
	app.theme(variantDark(name))
	await nextTick()
}

const VARIANTS: readonly CaptureVariant[] = [
	{ name: 'light-1280', width: 1280, height: 800 },
	{ name: 'dark-1280', width: 1280, height: 800 },
	{ name: 'light-390', width: 390, height: 844 },
	{ name: 'dark-390', width: 390, height: 844 },
]

const ENVIRONMENT: Readonly<Record<string, unknown>> = import.meta.env
const VARIANT =
	typeof ENVIRONMENT.VITE_VARIANT === 'string' ? ENVIRONMENT.VITE_VARIANT : 'light-1280'
const CAPTURING = ENVIRONMENT.VITE_CAPTURE === 'true'
const CURRENT = requireValue(
	VARIANTS.find((candidate) => candidate.name === VARIANT),
	`Capture variant "${VARIANT}" is not declared`,
)

const ABSENT_CLASS = 'roughnotes-undeclared-control'
const ABSENT_MARK = 'roughnotes-undeclared-mark'
const ESCAPE_DECLARATION = 'color: rgb(1, 2, 3)'
const TEXT_CONTRAST = 4.5
const RING_CONTRAST = 3
const JOURNEY_BUDGET = 30_000
const MATRIX_BUDGET = 60_000
const TRANSPORT_BUDGET = 30_000
const ARTIFACT_PATH = `tmp/journeys/${VARIANT}.txt`
const FRAMES_HEADING = '## capture frames'
const FORBIDDEN: readonly string[] = [
	'ApplicationController',
	'Navigator',
	'Orkestrel',
	'hashchange',
	'slug',
]

const portfolio = createPortfolio({
	states: STATES,
	variants: VARIANTS,
	variant: VARIANT,
	directory: '../../../tmp/capture/states',
	enabled: CAPTURING,
})

const PLACED = new Set<string>()
const PROVEN = new Set<string>()
const MATRIX_ROWS: string[] = []
const JOURNAL = createJournal()
const SHOTS = new Map<string, { readonly height: number }>()
let TREE = ''
let FOCUS = ''

async function place(state: string): Promise<void> {
	PLACED.add(state)
	SHOTS.set(`${state}--${VARIANT}.png`, { height: document.documentElement.scrollHeight })
	await portfolio.place(state)
}

async function waitForText(description: string, text: string): Promise<void> {
	await waitForCondition(description, () => readPage().includes(text), {
		budget: SETTLE_BUDGET,
		interval: SETTLE_INTERVAL,
	})
}

async function followField(id: string, name: string, path: string): Promise<void> {
	const target = document.getElementById(id)
	const events: string[] = []
	const controller = new AbortController()
	for (const event of ['pointerdown', 'pointerup', 'click', 'blur', 'focus', 'focusin', 'focusout']) {
		document.addEventListener(event, (entry) => {
			events.push(`${entry.type}: ${entry.target instanceof HTMLElement ? entry.target.outerHTML.slice(0, 280) : String(entry.target)}`)
		}, { capture: true, signal: controller.signal })
	}
	console.log('U2 field before', id, document.activeElement?.id, target?.isConnected)
	await clickAccessible('link', name)
	controller.abort()
	console.log('U2 events', id, events)
	console.log('U2 field after', id, document.activeElement?.tagName, document.activeElement?.id, target?.isConnected, target === document.getElementById(id))
	expect(document.activeElement?.id).toBe(id)
	expect(window.location.hash).toBe(hashHref(path))
}

async function waitForOrigin(): Promise<void> {
	await waitForCondition(
		'the view starts at the origin',
		() => document.activeElement?.id === 'main' && window.scrollY === 0,
		{
			budget: SETTLE_BUDGET,
			interval: SETTLE_INTERVAL,
		},
	)
}

function readFileName(path: string): string {
	return requireValue(
		path.replaceAll('\\', '/').split('/').pop(),
		`Capture path ${path} names no file`,
	)
}

function readOpeningTag(markup: string): string {
	return markup.slice(0, markup.indexOf('>') + 1)
}

async function readWrittenFrames(): Promise<readonly string[]> {
	try {
		const written = await commands.readFile(ARTIFACT_PATH)
		const [, listed] = written.split(`${FRAMES_HEADING}\n`)
		if (listed === undefined) return []
		return listed
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line.length > 0)
	} catch {
		return []
	}
}

async function writeArtifact(): Promise<void> {
	JOURNAL.stop()
	const frames = CAPTURING ? portfolio.paths.map(readFileName) : await readWrittenFrames()
	const lines: readonly string[] = [
		`variant: ${VARIANT}`,
		`viewport: ${String(CURRENT.width)}x${String(CURRENT.height)}`,
		`capturing: ${String(CAPTURING)}`,
		'',
		'## accessible tree',
		TREE,
		'',
		'## focus order',
		FOCUS,
		'',
		'## resolved styles',
		...MATRIX_ROWS,
		'',
		'## journal steps',
		...JOURNAL.steps.map((step) => `${step.action} | ${step.trigger} | ${step.result}`),
		'',
		'## page output',
		...JOURNAL.output,
		'',
		FRAMES_HEADING,
		...frames,
	]
	await commands.writeFile(ARTIFACT_PATH, `${lines.join('\n')}\n`)
}

beforeAll(() => {
	JOURNAL.start()
})

afterEach(() => {
	clearSurface()
	clearStorage()
})

afterAll(async () => {
	await writeArtifact()
})

describe('knowledge site journeys', () => {
	it(
		'lands on home and reaches subscribe through the content Get started control',
		async () => {
			PROVEN.add('journey')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { host, app } = await openSurface()
			await paintVariant(app, VARIANT)
			expect(readPage()).toContain(HOME_HEADING)
			expect(readPage()).toContain('RoughNotes-Pro')
			expect(readRefusal(variantDark(VARIANT) ? COPY.light : COPY.dark)).toBeUndefined()
			for (const word of FORBIDDEN) {
				expect(readPage()).not.toContain(word)
			}
			TREE = describeTree(host)
			FOCUS = describeFocus(host)
			await openSite()
			await traverseAccessible(COPY.shop)
			await closeSite()
			await place('home')
			await startSubscription()
			await waitForText('the subscribe view paints', 'Free print and digital delivery')
			expect(readPage()).toContain('Subscribe')
			JOURNAL.record('click', COPY.started, 'subscribe')
		},
		JOURNEY_BUDGET,
	)

	it(
		'opens the featured product from the site navigation',
		async () => {
			PROVEN.add('journey')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { app } = await openSurface()
			await paintVariant(app, VARIANT)
			await followSite('Products')
			await waitForText('the products listing paints', 'Choose the desk your agency needs')
			await traverseAccessible(COPY.skip)
			await clickAccessible('link', COPY.skip)
			expect(document.activeElement?.id).toBe('main')
			expect(readPage()).toContain('Choose the desk your agency needs')
			await clickAccessibleWithin(COPY.offerings, 'link', 'RoughNotes-Pro')
			await waitForText('the product page paints', 'Policy Forms & Manual Analysis')
			expect(readPage()).toContain('The producer toolkit')
			await place('product-detail')
			JOURNAL.record('click', 'RoughNotes-Pro', 'product')
		},
		JOURNEY_BUDGET,
	)

	it(
		'filters the magazine to an empty category and can show every article again',
		async () => {
			PROVEN.add('journey')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { app } = await openSurface()
			await paintVariant(app, VARIANT)
			await followSite('Publications')
			await waitForText('the publications hub paints', 'The magazine and the Insurance Marketplace')
			await clickAccessibleWithin(COPY.publications, 'link', 'Rough Notes magazine')
			await waitForText('the magazine paints', 'Coverage, markets, and agency practice')
			expect(readRefusal(COPY.all)).toBe(
				`No interactive element has the accessible name "${COPY.all}"`,
			)
			await clickAccessible('button', 'Program business')
			await waitForText('the empty category paints', COPY.none)
			await place('magazine-empty')
			await clickAccessible('button', COPY.all)
			await waitForText('the full listing returns', 'Mass shootings; mass confusion?')
			expect(readPage()).not.toContain(COPY.none)
			JOURNAL.record('click', 'Program business', COPY.none)
		},
		JOURNEY_BUDGET,
	)

	it(
		'searches the marketplace sample, reports a miss, and restores the directory',
		async () => {
			PROVEN.add('journey')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { app } = await openSurface()
			await paintVariant(app, VARIANT)
			await followSite('Publications')
			await waitForText('the publications hub paints', 'The magazine and the Insurance Marketplace')
			await clickAccessibleWithin(COPY.publications, 'link', 'The Insurance Marketplace')
			await waitForText('the marketplace paints', 'Search a fixture sample of specialty markets')
			expect(readPage()).toContain('Restaurant general liability')
			expect(readRefusal(COPY.clear)).toBe(
				`No interactive element has the accessible name "${COPY.clear}"`,
			)
			await fillAccessible(COPY.query, 'zzzz-no-such-market')
			await clickAccessible('button', COPY.search)
			await waitForText('the miss paints', COPY.empty)
			await place('marketplace-miss')
			await clickAccessible('button', COPY.clear)
			await waitForText('the directory returns', 'Restaurant general liability')
			expect(readPage()).not.toContain(COPY.empty)
			JOURNAL.record('click', COPY.search, COPY.empty)
		},
		JOURNEY_BUDGET,
	)

	it(
		'keeps subscribe enabled, announces a refusal, and accepts a valid request',
		async () => {
			PROVEN.add('journey')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { app } = await openSurface()
			await paintVariant(app, VARIANT)
			await startSubscription()
			await waitForText('the subscribe view paints', 'Subscribe')
			const send = resolveAccessible('button', COPY.subscribe)
			expect(send.hasAttribute('disabled')).toBe(false)
			await clickAccessible('button', COPY.subscribe)
			await waitForText('the error summary paints', COPY.summary)
			const nameField = resolveAccessible('textbox', COPY.name)
			expect(nameField.getAttribute('aria-invalid')).toBe('true')
			expect(readStates(nameField)).toContain('invalid')
			await followField('subscribe-name', `${COPY.name} is required.`, SUBSCRIBE_PATH)
			await followField('subscribe-email', `${COPY.mail} must be an email address.`, SUBSCRIBE_PATH)
			await place('subscribe-refused')
			await fillAccessible(COPY.name, 'Ada Lovelace')
			await fillAccessible(COPY.mail, 'ada@agency.com')
			if (readRefusal(COPY.subscribe) === undefined) {
				await clickAccessible('button', COPY.subscribe)
			}
			await waitForText('the accepted status paints', COPY.accepted)
			expect(readPage()).not.toContain(COPY.summary)
			await place('subscribe-accepted')
			JOURNAL.record('click', COPY.subscribe, COPY.accepted)
		},
		JOURNEY_BUDGET,
	)

	it(
		'opens about from the site navigation',
		async () => {
			PROVEN.add('journey')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { app } = await openSurface()
			await paintVariant(app, VARIANT)
			await followSite('About')
			await waitForText('the about view paints', 'About Rough Notes')
			await waitForOrigin()
			expect(readPage()).toContain('Serve the independent agent market')
			await place('about')
			JOURNAL.record('click', 'About', 'about')
		},
		JOURNEY_BUDGET,
	)

	it(
		'opens the newsletter from the publications hub',
		async () => {
			PROVEN.add('journey')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { app } = await openSurface()
			await paintVariant(app, VARIANT)
			await followSite('Publications')
			await waitForText('the publications hub paints', 'The magazine and the Insurance Marketplace')
			await clickAccessibleWithin(COPY.publications, 'link', COPY.newsletter)
			await waitForText('the newsletter view paints', 'It is about you, the customer')
			expect(readPage()).toContain('Rough Notes newsletters')
			await place('newsletter')
			JOURNAL.record('click', COPY.newsletter, 'newsletter')
		},
		JOURNEY_BUDGET,
	)

	it(
		'opens media kits and keeps the PDF destinations external',
		async () => {
			PROVEN.add('journey')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { app } = await openSurface()
			await paintVariant(app, VARIANT)
			await clickAccessible('link', COPY.media)
			await waitForText(
				'the media view paints',
				'Files open on Rough Notes. They are not stored in this application.',
			)
			const rate = resolveAccessible('link', '2027 Rough Notes magazine rate card')
			expect(rate.getAttribute('href')).toContain('roughnotes.com/wp-content/uploads')
			expect(rate.getAttribute('rel')).toBe('noreferrer')
			await place('media')
			JOURNAL.record('click', COPY.media, 'media')
		},
		JOURNEY_BUDGET,
	)

	it(
		'opens the shop catalog and a SKU detail',
		async () => {
			PROVEN.add('journey')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { app } = await openSurface()
			await paintVariant(app, VARIANT)
			await followSite('Shop')
			await waitForText('the shop paints', 'A fixture sample of books')
			const live = resolveAccessible('link', COPY.live)
			expect(live.getAttribute('href')).toContain('shoppingcart.roughnotes.com')
			expect(live.getAttribute('rel')).toBe('noreferrer')
			await place('shop-listing')
			await clickAccessible('link', 'Coverages Applicable')
			await waitForText('the SKU paints', 'Catalog #30040')
			expect(readPage()).toContain('$78.00')
			await place('shop-detail')
			JOURNAL.record('click', 'Coverages Applicable', 'item')
		},
		JOURNEY_BUDGET,
	)

	it(
		'keeps contact enabled, announces a refusal, and accepts a valid inquiry',
		async () => {
			PROVEN.add('journey')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { app } = await openSurface()
			await paintVariant(app, VARIANT)
			await clickAccessible('link', COPY.write)
			await waitForText('the contact view paints', 'Write the Indianapolis office')
			await waitForOrigin()
			const send = resolveAccessible('button', COPY.send)
			expect(send.hasAttribute('disabled')).toBe(false)
			await clickAccessible('button', COPY.send)
			await waitForText('the inquiry summary paints', COPY.inquirySummary)
			await followField('inquiry-name', `${COPY.name} is required.`, CONTACT_PATH)
			await followField('inquiry-company', `${COPY.company} is required.`, CONTACT_PATH)
			await followField('inquiry-email', `${COPY.mail} must be an email address.`, CONTACT_PATH)
			await followField('inquiry-phone', `${COPY.phoneLabel} must include a number.`, CONTACT_PATH)
			await place('contact-refused')
			await fillAccessible(COPY.name, 'Ada Lovelace')
			await fillAccessible(COPY.company, 'Agency')
			await fillAccessible(COPY.mail, 'ada@agency.com')
			await fillAccessible(COPY.phoneLabel, '800-428-4384')
			if (readRefusal(COPY.send) === undefined) {
				await clickAccessible('button', COPY.send)
			}
			await waitForText('the inquiry status paints', COPY.inquiryAccepted)
			JOURNAL.record('click', COPY.send, COPY.inquiryAccepted)
		},
		JOURNEY_BUDGET,
	)

	it(
		'keeps invoice review enabled, announces a refusal, and accepts a valid amount',
		async () => {
			PROVEN.add('journey')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { app } = await openSurface()
			await paintVariant(app, VARIANT)
			await followSite('Shop')
			await waitForText('the shop paints', 'A fixture sample of books')
			await clickAccessible('link', COPY.payment)
			await waitForText('the payment view paints', COPY.payment)
			await waitForOrigin()
			const send = resolveAccessible('button', COPY.pay)
			expect(send.hasAttribute('disabled')).toBe(false)
			await clickAccessible('button', COPY.pay)
			await waitForText('the payment summary paints', COPY.paymentSummary)
			await followField('payment-customer', `${COPY.customer} is required.`, PAYMENT_PATH)
			await followField('payment-number', `${COPY.invoice} is required.`, PAYMENT_PATH)
			await followField(
				'payment-amount',
				`${COPY.amount} must be a positive dollar amount.`,
				PAYMENT_PATH,
			)
			await place('payment-refused')
			await fillAccessible(COPY.customer, '1001')
			await fillAccessible(COPY.invoice, '1001')
			await fillAccessible(COPY.amount, '78.00')
			if (readRefusal(COPY.pay) === undefined) {
				await clickAccessible('button', COPY.pay)
			}
			await waitForText('the payment status paints', COPY.paymentAccepted)
			JOURNAL.record('click', COPY.pay, COPY.paymentAccepted)
		},
		JOURNEY_BUDGET,
	)

	it(
		'leaves Sign In absent and keeps live logins as external links',
		async () => {
			PROVEN.add('refusal')
			await page.viewport(CURRENT.width, CURRENT.height)
			const { app } = await openSurface()
			await paintVariant(app, VARIANT)
			expect(readRefusal('Sign In')).toBe(SIGN_IN_ABSENT)
			const pro = resolveAccessible('link', COPY.pro)
			expect(pro.getAttribute('href')).toContain('shoppingcart.roughnotes.com')
			expect(pro.getAttribute('rel')).toBe('noreferrer')
			await openSite()
			const shop = resolveAccessible('link', COPY.shop)
			expect(shop.getAttribute('href')).toBe('#/shop')
			expect(readRefusal('PF&M database')).toBe(
				'No interactive element has the accessible name "PF&M database"',
			)
			JOURNAL.record('read', COPY.pro, 'external')
			await closeSite()
		},
		JOURNEY_BUDGET,
	)

	it(
		'reads contrast, focus chrome, authored classes, and style escapes in every variant',
		async () => {
			PROVEN.add('matrix')
			clearSurface()
			const holder = mount(
				build('div', { attributes: { style: 'background-color: rgb(120,120,120)' } }),
			)
			const origin = build('button', {
				text: 'Focus origin control',
				attributes: { type: 'button' },
			})
			const ringControl = build('button', {
				text: 'Focus ring control',
				attributes: { type: 'button', style: 'outline: 3px solid rgb(120,120,120)' },
			})
			const contrastControl = build('p', {
				text: 'Contrast control',
				attributes: { style: 'color: rgb(130,130,130); background-color: rgb(120,120,120)' },
			})
			holder.append(origin, ringControl, contrastControl)
			await clickAccessible('Focus origin control')
			await traverseAccessible('Focus ring control')
			expect(readRing(ringControl)).toBeLessThan(RING_CONTRAST)
			expect(readContrast(contrastControl)).toBeLessThan(TEXT_CONTRAST)
			expect(
				extractStyles(build('div', { attributes: { style: ESCAPE_DECLARATION } })),
			).toHaveLength(1)

			const read: string[] = []
			for (const variant of VARIANTS) {
				await page.viewport(variant.width, variant.height)
				const { host, app } = await openSurface()
				await paintVariant(app, variant.name)
				read.push(variant.name)

				const escapeControl = build('p', {
					text: 'Escape control',
					attributes: { style: ESCAPE_DECLARATION },
				})
				host.append(escapeControl)
				const escapes = extractStyles(host).map(readOpeningTag)
				escapeControl.remove()
				expect(escapes).toEqual([readOpeningTag(escapeControl.outerHTML)])

				const mark = buildMarkControl(ABSENT_MARK)
				host.append(mark)
				const authored = readClasses(host)
				mark.remove()
				const defined = readCascade()
				expect(authored.size).toBeGreaterThan(0)
				expect([...authored, ABSENT_CLASS].filter((name) => !defined.has(name)).sort()).toEqual([
					ABSENT_CLASS,
					ABSENT_MARK,
				])

				const shop = resolveRendered('link', COPY.catalog)
				const shopContrast = readContrast(shop)
				expect(shopContrast).toBeGreaterThanOrEqual(TEXT_CONTRAST)

				await startSubscription()
				await waitForText('subscribe is on screen', COPY.subscribe)
				const send = resolveRendered('button', COPY.subscribe)
				const sendContrast = readContrast(send)
				expect(sendContrast).toBeGreaterThanOrEqual(TEXT_CONTRAST)
				await traverseAccessible(COPY.subscribe)
				const sendRing = requireValue(
					readRing(resolveRendered('button', COPY.subscribe)),
					`${COPY.subscribe} paints no focus chrome in ${variant.name}`,
				)
				expect(sendRing).toBeGreaterThanOrEqual(RING_CONTRAST)

				if (variant.name === VARIANT) {
					MATRIX_ROWS.push(`contrast | ${COPY.catalog} | ${shopContrast.toFixed(3)}`)
					MATRIX_ROWS.push(`contrast | ${COPY.subscribe} | ${sendContrast.toFixed(3)}`)
					MATRIX_ROWS.push(`ring | ${COPY.subscribe} | ${sendRing.toFixed(3)}`)
				}
			}
			expect(read).toEqual(VARIANTS.map((variant) => variant.name))
		},
		MATRIX_BUDGET,
	)

	it(
		'hands the persisted theme to a second session over the same storage',
		async () => {
			PROVEN.add('transport')
			await page.viewport(CURRENT.width, CURRENT.height)
			const first = await openSurface()
			await toggleThemeControl()
			await waitForCondition(
				'the first session paints dark',
				() => document.documentElement.getAttribute('data-bs-theme') === THEME_DARK,
				{ budget: SETTLE_BUDGET, interval: SETTLE_INTERVAL },
			)
			expect(first.storage.getItem('roughnotes-theme')).toBe(THEME_DARK)

			const second = await openSurface(first.storage)
			await waitForCondition(
				'the second session restores dark',
				() => document.documentElement.getAttribute('data-bs-theme') === THEME_DARK,
				{ budget: SETTLE_BUDGET, interval: SETTLE_INTERVAL },
			)
			expect(second.app.dark.value).toBe(true)
			JOURNAL.record('theme', THEME_DARK, 'restored')
		},
		TRANSPORT_BUDGET,
	)

	it('expands the registry across every declared variant into unique filenames', () => {
		PROVEN.add('capture')
		const files = expandCaptures(STATES, VARIANTS)
		expect(files).toEqual(portfolio.files)
		expect(new Set(files).size).toBe(files.length)
	})

	it.runIf(CAPTURING)('writes every frame this run owes', async () => {
		const expected = expandCaptures(STATES, [CURRENT])
		const written = portfolio.paths.map(readFileName)
		expect([...written].sort()).toEqual([...expected].sort())
		for (const path of portfolio.paths) {
			const file = readFileName(path)
			const shot = requireValue(SHOTS.get(file), `No shot was recorded for ${file}`)
			const frame = await readFrame(path)
			expect(frame.width).toBe(CURRENT.width)
			expect(frame.height).toBeGreaterThanOrEqual(shot.height)
		}
	})

	it('proves every declared family and claims no family it did not prove', () => {
		expect([...PROVEN].sort()).toEqual([...FAMILIES].sort())
	})

	it('places every registered state and places nothing else', () => {
		expect([...PLACED].sort()).toEqual([...STATES].sort())
	})
})
