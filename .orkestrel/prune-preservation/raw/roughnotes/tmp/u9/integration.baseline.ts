import type { CaptureVariant } from '@orkestrel/test/browser'
import { afterAll, afterEach, beforeAll, describe, expect, inject, it } from 'vitest'
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
	MAGAZINE_PATH,
	PAYMENT_PATH,
	SUBSCRIBE_PATH,
	hashHref,
	skuHref,
} from '@app/browser'
import type { MatrixControl, MatrixRole } from './setup.js'
import {
	COMMIT_CONTROL,
	CONTENT_CONTROL,
	HOME_HEADING,
	HOME_ROLES,
	LISTING_ROLES,
	MARK_CONTRAST,
	NOTICE_ROLES,
	REFUSED_ROLES,
	SELECTED_CONTROL,
	SHELL_ROLES,
	SIGN_IN_ABSENT,
	SETTLE_BUDGET,
	SETTLE_INTERVAL,
	SUMMARY_CONTROL,
	TEXT_CONTRAST,
	UNINDEXED_SKU,
	UNSELECTED_CONTROL,
	buildMarkControl,
	clearSurface,
	closeSite,
	followSite,
	openSite,
	openSurface,
	readIsland,
	readRefusal,
	readSurface,
	readThemeControl,
	selectRole,
	startSubscription,
	toggleThemeControl,
} from './setup.js'

declare module 'vitest' {
	interface ProvidedContext {
		readonly variant: string
		readonly variants: readonly CaptureVariant[]
	}
}

const FAMILIES: readonly string[] = ['journey', 'refusal', 'matrix', 'transport', 'capture']

// Every screen a person reaches, in each data state a journey drives it to. A screen with no row
// here writes no frame, and a design review that cannot see a screen cannot judge it.
const STATES: readonly string[] = [
	'home',
	'product-listing',
	'product-detail',
	'magazine-listing',
	'magazine-empty',
	'magazine-detail',
	'marketplace-listing',
	'marketplace-miss',
	'subscribe-refused',
	'subscribe-accepted',
	'about',
	'newsletter',
	'newsletter-accepted',
	'media',
	'shop-listing',
	'shop-detail',
	'contact-refused',
	'contact-accepted',
	'payment-refused',
	'payment-accepted',
]

function variantDark(name: string): boolean {
	return name.startsWith(`${THEME_DARK}-`)
}

async function paintVariant(app: ApplicationInterface, name: string): Promise<void> {
	app.theme(variantDark(name))
	await nextTick()
}

/**
 * Reads the declared journey variants the configuration passes in.
 *
 * @param value - The variants the project provides
 * @returns Every declared variant, in declaration order
 */
function parseVariants(value: unknown): readonly CaptureVariant[] {
	if (!Array.isArray(value)) throw new Error('The provided variants are not a list')
	return value.map((entry) => {
		if (typeof entry !== 'object' || entry === null) throw new Error('A variant is not an object')
		const name: unknown = Object.getOwnPropertyDescriptor(entry, 'name')?.value
		const width: unknown = Object.getOwnPropertyDescriptor(entry, 'width')?.value
		const height: unknown = Object.getOwnPropertyDescriptor(entry, 'height')?.value
		if (typeof name !== 'string' || typeof width !== 'number' || typeof height !== 'number') {
			throw new Error('A variant does not declare a name, a width, and a height')
		}
		return { name, width, height }
	})
}

const ENVIRONMENT: Readonly<Record<string, unknown>> = import.meta.env

// `vite.config.ts` declares the variants once and gives each its own project, so the set and the
// current name arrive through Vitest's per-project channel rather than being repeated here.
const VARIANTS: readonly CaptureVariant[] = parseVariants(inject('variants'))
const VARIANT = inject('variant')
const CAPTURING = ENVIRONMENT.VITE_CAPTURE === 'true'
const CURRENT = requireValue(
	VARIANTS.find((candidate) => candidate.name === VARIANT),
	`Capture variant "${VARIANT}" is not declared`,
)

const ABSENT_CLASS = 'roughnotes-undeclared-control'
const ABSENT_MARK = 'roughnotes-undeclared-mark'
const ESCAPE_DECLARATION = 'color: rgb(1, 2, 3)'
const JOURNEY_BUDGET = 30_000
const MATRIX_BUDGET = 180_000
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
	const target = resolveAccessible('link', name)
	const box = target.getBoundingClientRect()
	const centre = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2)
	// A wrapped inline link spans two line boxes with a gap between them, and its bounding-box
	// centre falls in that gap. A pointer aimed at the centre lands on the list item instead, so
	// the reading names what the centre actually hits.
	const reading = `viewport ${String(window.innerWidth)}x${String(window.innerHeight)} | link box ${String(Math.round(box.width))}x${String(Math.round(box.height))} | centre hits ${centre?.tagName ?? 'nothing'} | reaches link ${String(centre !== null && target.contains(centre))}`
	await clickAccessible('link', name)
	expect(`${document.activeElement?.id ?? 'nothing'} | ${reading}`).toBe(`${id} | ${reading}`)
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

/**
 * Measures one group of a role's population and holds its worst member to the role's bar.
 *
 * @param label - The screen, the role, and the scope the group was read in
 * @param members - The elements the group holds
 * @param bar - The ratio every member must clear
 * @param report - Whether this variant owns the written artifact
 */
function readGroup(label: string, members: readonly Element[], bar: number, report: boolean): void {
	if (members.length === 0) return
	const lowest = Math.min(...members.map(readSurface))
	expect(
		lowest,
		`${label} reads ${lowest.toFixed(3)} across ${String(members.length)} against a ${String(bar)} bar`,
	).toBeGreaterThanOrEqual(bar)
	if (report) {
		MATRIX_ROWS.push(
			`contrast | ${label} | ${lowest.toFixed(3)} | ${String(members.length)} read | bar ${String(bar)}`,
		)
	}
}

/**
 * Reads one role's whole population on the screen, split by page surface and mode island.
 *
 * @param screen - The screen and data state the population was drawn from
 * @param role - The role whose membership rule selects the population
 * @param root - The subtree to read
 * @param report - Whether this variant owns the written artifact
 */
function readRole(screen: string, role: MatrixRole, root: ParentNode, report: boolean): void {
	const members = selectRole(root, role)
	expect(members.length, `${screen} | ${role.label} selects nothing`).toBeGreaterThan(0)
	readGroup(
		`${screen} | ${role.label} | page surface`,
		members.filter((node) => !readIsland(node)),
		role.bar,
		report,
	)
	readGroup(`${screen} | ${role.label} | mode island`, members.filter(readIsland), role.bar, report)
}

/**
 * Reads one control's label against its fill, then the ring it wears under keyboard focus.
 *
 * @param screen - The screen the control sits on
 * @param control - The control to resolve, read, and focus
 * @param report - Whether this variant owns the written artifact
 */
async function readControl(screen: string, control: MatrixControl, report: boolean): Promise<void> {
	const fill = readSurface(resolveRendered(control.role, control.name))
	expect(
		fill,
		`${screen} | ${control.label} reads ${fill.toFixed(3)} against a ${String(TEXT_CONTRAST)} bar`,
	).toBeGreaterThanOrEqual(TEXT_CONTRAST)
	await traverseAccessible(control.name)
	const ring = requireValue(
		readRing(resolveRendered(control.role, control.name)),
		`${screen} | ${control.label} paints no focus chrome`,
	)
	expect(
		ring,
		`${screen} | ${control.label} ring reads ${ring.toFixed(3)} against a ${String(MARK_CONTRAST)} bar`,
	).toBeGreaterThanOrEqual(MARK_CONTRAST)
	if (report) {
		MATRIX_ROWS.push(`contrast | ${screen} | ${control.label} | ${fill.toFixed(3)}`)
		MATRIX_ROWS.push(`ring | ${screen} | ${control.label} | ${ring.toFixed(3)}`)
	}
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
			await place('product-listing')
			await clickAccessibleWithin(COPY.offerings, 'link', 'RoughNotes-Pro')
			await waitForText('the product page paints', 'Policy Forms & Manual Analysis')
			expect(readPage()).toContain('The producer toolkit')
			await place('product-detail')
			JOURNAL.record('click', 'RoughNotes-Pro', 'product')
		},
		JOURNEY_BUDGET,
	)

	it(
		'filters the magazine to an empty category, shows every article again, and opens one',
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
			await place('magazine-listing')
			await clickAccessible('button', 'Program business')
			await waitForText('the empty category paints', COPY.none)
			await place('magazine-empty')
			await clickAccessible('button', COPY.all)
			await waitForText('the full listing returns', 'Mass shootings; mass confusion?')
			expect(readPage()).not.toContain(COPY.none)
			await clickAccessible('link', 'Mass shootings; mass confusion?')
			await waitForText(
				'the article paints',
				'Court readings of occurrence continue to split insurers',
			)
			await place('magazine-detail')
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
			await place('marketplace-listing')
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
			// Repairing the fields commits nothing: the control is still reachable and no
			// acceptance has painted. A form that submits itself while the reader types removes
			// the control and paints the acceptance here, so both reads go red before the click.
			expect(readRefusal(COPY.subscribe)).toBeUndefined()
			expect(readPage()).not.toContain(COPY.accepted)
			await clickAccessible('button', COPY.subscribe)
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
		'opens the newsletter from the publications hub and joins the list',
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
			await fillAccessible(COPY.name, 'Ada Lovelace')
			await fillAccessible(COPY.mail, 'ada@agency.com')
			expect(readRefusal(COPY.subscribe)).toBeUndefined()
			expect(readPage()).not.toContain(COPY.accepted)
			await clickAccessible('button', COPY.subscribe)
			await waitForText('the newsletter acceptance paints', COPY.accepted)
			await place('newsletter-accepted')
			JOURNAL.record('click', COPY.subscribe, COPY.accepted)
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
			expect(readRefusal(COPY.send)).toBeUndefined()
			expect(readPage()).not.toContain(COPY.inquiryAccepted)
			await clickAccessible('button', COPY.send)
			await waitForText('the inquiry status paints', COPY.inquiryAccepted)
			await place('contact-accepted')
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
			expect(readRefusal(COPY.pay)).toBeUndefined()
			expect(readPage()).not.toContain(COPY.paymentAccepted)
			await clickAccessible('button', COPY.pay)
			await waitForText('the payment status paints', COPY.paymentAccepted)
			await place('payment-accepted')
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
			expect(readRing(ringControl)).toBeLessThan(MARK_CONTRAST)
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

				const report = variant.name === VARIANT
				for (const role of SHELL_ROLES) readRole('shell', role, host, report)
				for (const role of HOME_ROLES) readRole('home', role, host, report)
				await readControl('home', CONTENT_CONTROL, report)
				await readControl('home', readThemeControl(variantDark(variant.name)), report)

				await startSubscription()
				await waitForText('subscribe is on screen', COPY.subscribe)
				await readControl('subscribe', COMMIT_CONTROL, report)

				app.open(MAGAZINE_PATH)
				await waitForText('the magazine is on screen', 'Coverage, markets, and agency practice')
				for (const role of LISTING_ROLES) readRole('magazine', role, host, report)
				await readControl('magazine', SELECTED_CONTROL, report)
				await readControl('magazine', UNSELECTED_CONTROL, report)
				await clickAccessible('button', UNSELECTED_CONTROL.name)
				await waitForText('the filtered miss is on screen', COPY.none)
				for (const role of NOTICE_ROLES) readRole('magazine miss', role, host, report)

				app.open(CONTACT_PATH)
				await waitForText('the contact desk is on screen', 'Write the Indianapolis office')
				await clickAccessible('button', COPY.send)
				await waitForText('the inquiry summary is on screen', COPY.inquirySummary)
				for (const role of REFUSED_ROLES) readRole('contact refused', role, host, report)
				await readControl('contact refused', SUMMARY_CONTROL, report)

				await fillAccessible(COPY.name, 'Ada Lovelace')
				await fillAccessible(COPY.company, 'Agency')
				await fillAccessible(COPY.mail, 'ada@agency.com')
				await fillAccessible(COPY.phoneLabel, '800-428-4384')
				await clickAccessible('button', COPY.send)
				await waitForText('the partial inquiry is on screen', COPY.inquiryAccepted)
				for (const role of NOTICE_ROLES) readRole('contact partial', role, host, report)

				// The shipped fixtures fill every collection, so the `empty` category is unreachable
				// without reducing one. The application is the real one; only the catalog is smaller.
				const empty = await openSurface({ catalog: { articles: [] } })
				await paintVariant(empty.app, variant.name)
				empty.app.open(MAGAZINE_PATH)
				await waitForText('the empty issue is on screen', 'No articles in this issue yet.')
				for (const role of NOTICE_ROLES) readRole('magazine empty', role, empty.host, report)

				const unindexed = await openSurface({ catalog: { skus: [UNINDEXED_SKU] } })
				await paintVariant(unindexed.app, variant.name)
				unindexed.app.open(skuHref(UNINDEXED_SKU.id))
				await waitForText('the unindexed book is on screen', 'No published ISBN')
				for (const role of NOTICE_ROLES) readRole('item partial', role, unindexed.host, report)
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

			const second = await openSurface({ storage: first.storage })
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
