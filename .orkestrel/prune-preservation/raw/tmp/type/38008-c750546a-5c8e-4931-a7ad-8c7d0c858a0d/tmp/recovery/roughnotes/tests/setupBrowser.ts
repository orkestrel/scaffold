import * as bootstrap from 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../app/browser/styles/index.scss'

import type { ApplicationInterface } from '@app/browser'
import type { CatalogOptions, Sku } from '@app/core'
import type { CaptureVariant, Color } from '@orkestrel/test/browser'
import type { Component } from 'vue'
import type { JourneyVariant } from '@orkestrel/test'
import { page } from 'vitest/browser'
import { createApp, defineComponent, h } from 'vue'
import { requireValue, waitForCondition, waitForText } from '@orkestrel/test'
import {
	FOCUSABLE_SELECTOR,
	clickAccessible,
	clickAccessibleWithin,
	fillAccessible,
	isReachable,
	measureContrast,
	parseCSSColor,
	readContrast,
	readName,
	readPage,
	readPerception,
	readStates,
	readRefusal,
	readText,
	waitForState,
	waitForAnimations,
	readStyle,
	readToken,
	resolveAccessible,
} from '@orkestrel/test/browser'
import { CATEGORY_LABELS, CHANNEL_LABELS, DEPARTMENT_LABELS, createCatalog } from '@app/core'
import {
	ABOUT_PATH,
	APPLICATION_KEY,
	App,
	CONTACT_PATH,
	COPY,
	HOME_PATH,
	MAGAZINE_PATH,
	MARKETPLACE_PATH,
	MEDIA_PATH,
	NEWSLETTER_PATH,
	PAYMENT_PATH,
	PRODUCTS_PATH,
	PUBLICATIONS_PATH,
	SHOP_PATH,
	SUBSCRIBE_PATH,
	THEME_DARK,
	buildName,
	createApplication,
	createMemoryStorage,
	hashHref,
	useTheme,
} from '@app/browser'

/** Holds the heading the home view paints. */
export const HOME_HEADING = 'The knowledge that makes independent agents unstoppable.'

/** Holds the voice the layer uses when Sign In is absent. */
export const SIGN_IN_ABSENT = 'No interactive element has the accessible name "Sign In"'

/**
 * Holds the voice the layer uses for the compact trigger a wide masthead renders and hides.
 *
 * @remarks
 * The trigger sits inside a `d-lg-none` wrapper, so an expanded masthead keeps it in the document
 * and paints no box for it. That is the present-but-unreachable case, not the absent one.
 */
export const MENU_UNREACHABLE = `Interactive target "${COPY.menu}" is not visible and focus-reachable`

/** Holds the voice the layer uses for the compact dismissal a closed menu renders and hides. */
export const CLOSE_UNREACHABLE = `Interactive target "${COPY.close}" is not visible and focus-reachable`

/**
 * Marks the width, in CSS px, below which the masthead folds its destinations into the compact
 * menu.
 */
export const COMPACT_WIDTH = 992

/**
 * Reports whether the masthead is folded into the compact menu at the current viewport.
 *
 * @returns True below the `lg` breakpoint the masthead expands at
 */
export function readCompact(): boolean {
	return window.innerWidth < COMPACT_WIDTH
}

/** Sets the ratio information-bearing text must reach against the surface behind it. */
export const TEXT_CONTRAST = 4.5

/** Sets the ratio a meaningful textless mark, a state, and focus chrome must reach. */
export const MARK_CONTRAST = 3

/**
 * Describes one resolved-style role the matrix reads: its membership rule and the bar every member
 * clears.
 */
export interface MatrixRole {
	readonly label: string
	readonly selector: string
	readonly bar: number
}

/**
 * Describes one control the matrix focuses, to read the fill its label sits on and the ring it
 * wears.
 */
export interface MatrixControl {
	readonly label: string
	readonly role: string
	readonly name: string
}

/** Pairs one painted gradient surface with the primitive tokens its stops name. */
export interface GradientSurface {
	readonly selector: string
	readonly stops: readonly string[]
}

/**
 * Names every surface whose paint is a gradient rather than a flat fill.
 *
 * @remarks
 * A gradient leaves `background-color` transparent, so a walk up the ancestors reads straight
 * through it to the fill underneath and reports a ratio against a surface nobody sees. Text over
 * one of these is measured against each declared stop instead, and the worst stop is the reading.
 */
export const GRADIENT_SURFACES: readonly GradientSurface[] = Object.freeze([
	Object.freeze({
		selector: '.hero',
		stops: Object.freeze(['--rn-navy-mid', '--rn-navy', '--rn-navy-deep']),
	}),
	Object.freeze({ selector: '.invite', stops: Object.freeze(['--rn-navy', '--rn-navy-mid']) }),
	Object.freeze({ selector: '.issue-head', stops: Object.freeze(['--rn-navy', '--rn-navy-mid']) }),
	Object.freeze({
		selector: ".card[data-bs-theme='dark']",
		stops: Object.freeze(['--rn-navy', '--rn-navy-mid']),
	}),
	Object.freeze({ selector: '.monogram', stops: Object.freeze(['--rn-navy', '--rn-blue']) }),
])

/**
 * Lists the roles the shell paints on every screen, all of them on the navy utility bar and footer.
 */
export const SHELL_ROLES: readonly MatrixRole[] = Object.freeze([
	Object.freeze({
		label: 'utility bar contact link',
		selector: "div.small[data-bs-theme='dark'] a",
		bar: TEXT_CONTRAST,
	}),
	Object.freeze({ label: 'footer group heading', selector: 'footer h2', bar: TEXT_CONTRAST }),
	Object.freeze({ label: 'footer link', selector: 'footer a', bar: TEXT_CONTRAST }),
	Object.freeze({
		label: 'footer secondary tier',
		selector: 'footer .text-body-secondary',
		bar: TEXT_CONTRAST,
	}),
])

/** Lists the roles home paints across its paper sections and its navy islands. */
export const HOME_ROLES: readonly MatrixRole[] = Object.freeze([
	Object.freeze({
		label: 'body text',
		selector: '#main p:not(.text-body-secondary):not(.accent)',
		bar: TEXT_CONTRAST,
	}),
	Object.freeze({
		label: 'secondary tier',
		selector: '#main .text-body-secondary',
		bar: TEXT_CONTRAST,
	}),
	Object.freeze({ label: 'section heading', selector: '#main h1, #main h2', bar: TEXT_CONTRAST }),
	Object.freeze({ label: 'Entry title', selector: '#main article.card h3 a', bar: TEXT_CONTRAST }),
	Object.freeze({
		label: 'Entry fact label',
		selector: '#main article.card dt',
		bar: TEXT_CONTRAST,
	}),
	Object.freeze({
		label: 'Entry fact value',
		selector: '#main article.card dd',
		bar: TEXT_CONTRAST,
	}),
	Object.freeze({ label: 'confirm check mark', selector: '#main .confirm', bar: MARK_CONTRAST }),
])

/** Lists the roles a listing paints after its filter row and its records are on screen. */
export const LISTING_ROLES: readonly MatrixRole[] = Object.freeze([
	Object.freeze({
		label: 'secondary tier',
		selector: '#main .text-body-secondary',
		bar: TEXT_CONTRAST,
	}),
	Object.freeze({ label: 'section heading', selector: '#main h1, #main h2', bar: TEXT_CONTRAST }),
	Object.freeze({ label: 'Entry title', selector: '#main article.card h3 a', bar: TEXT_CONTRAST }),
	Object.freeze({
		label: 'Entry fact label',
		selector: '#main article.card dt',
		bar: TEXT_CONTRAST,
	}),
	Object.freeze({
		label: 'Entry fact value',
		selector: '#main article.card dd',
		bar: TEXT_CONTRAST,
	}),
])

/** Lists the roles a refused request paints. */
export const REFUSED_ROLES: readonly MatrixRole[] = Object.freeze([
	Object.freeze({
		label: 'body text',
		selector: '#main p:not(.text-body-secondary):not(.accent)',
		bar: TEXT_CONTRAST,
	}),
	Object.freeze({
		label: 'secondary tier',
		selector: '#main .text-body-secondary',
		bar: TEXT_CONTRAST,
	}),
	Object.freeze({ label: 'form label', selector: '#main .form-label', bar: TEXT_CONTRAST }),
	Object.freeze({
		label: 'invalid-feedback message',
		selector: '#main .invalid-feedback',
		bar: TEXT_CONTRAST,
	}),
	Object.freeze({
		label: 'error summary',
		selector: '#main [role="alert"] p, #main [role="alert"] a',
		bar: TEXT_CONTRAST,
	}),
])

/**
 * Lists the roles a quiet notice paints: the `empty`, `miss`, and `partial` categories share them.
 */
export const NOTICE_ROLES: readonly MatrixRole[] = Object.freeze([
	Object.freeze({
		label: 'notice title',
		selector: '#main [role="status"].bg-body-tertiary p:not(.text-body-secondary)',
		bar: TEXT_CONTRAST,
	}),
	Object.freeze({
		label: 'notice detail',
		selector: '#main [role="status"].bg-body-tertiary .text-body-secondary',
		bar: TEXT_CONTRAST,
	}),
])

/**
 * Holds a fixture book the live listing identifies by its catalog code alone.
 *
 * @remarks
 * Every shipped book carries an ISBN, so the `partial` notice `/shop/:slug` paints for a missing
 * one is unreachable until a catalog reports this record instead.
 */
export const UNINDEXED_SKU: Sku = Object.freeze({
	id: 'unindexed-title',
	name: 'Unindexed Title',
	summary: 'A fixture book the live listing identifies by its catalog code.',
	department: 'books',
	code: '30099',
	price: 4200,
})

/** Names the primary commit the subscribe desk ends on. */
export const COMMIT_CONTROL: MatrixControl = Object.freeze({
	label: 'primary commit',
	role: 'button',
	name: COPY.subscribe,
})

/**
 * Names the quiet destination the footer carries to the shop.
 *
 * @remarks
 * The footer announces the column carrying each destination, so this name reaches the footer's own
 * link and the matrix reads the shell's plain link rather than a screen's.
 */
export const CONTENT_CONTROL: MatrixControl = Object.freeze({
	label: 'footer destination',
	role: 'link',
	name: buildName(COPY.catalog, COPY.company),
})

/** Names the magazine filter row's selected control. */
export const SELECTED_CONTROL: MatrixControl = Object.freeze({
	label: 'filter row selected control',
	role: 'button',
	name: 'All articles',
})

/** Names the magazine filter row's unselected control. */
export const UNSELECTED_CONTROL: MatrixControl = Object.freeze({
	label: 'filter row unselected control',
	role: 'button',
	name: 'Program business',
})

/** Names the plain link a refused inquiry's summary offers. */
export const SUMMARY_CONTROL: MatrixControl = Object.freeze({
	label: 'plain link',
	role: 'link',
	name: `${COPY.name} is required.`,
})

/**
 * Names the masthead color-mode control the painted mode obliges the shell to offer.
 *
 * @param dark - Whether the document paints the dark mode
 * @returns The outline control the matrix reads at that mode
 */
export function readThemeControl(dark: boolean): MatrixControl {
	return { label: 'outline control', role: 'button', name: dark ? COPY.light : COPY.dark }
}

/**
 * Finds the gradient surface `node` is painted on, when one sits between it and the nearest fill.
 *
 * @param node - The element whose backdrop is in question
 * @returns The gradient surface, or `undefined` when an opaque fill is nearer
 */
export function readGradient(node: Element): GradientSurface | undefined {
	let current: Element | null = node
	while (current !== null) {
		for (const surface of GRADIENT_SURFACES) {
			if (current.matches(surface.selector)) return surface
		}
		const own = parseCSSColor(readStyle(current, 'background-color'))
		if (own !== undefined && own[3] === 1) return undefined
		current = current.parentElement
	}
	return undefined
}

/**
 * Reads the contrast `node` reaches against the surface a person actually sees behind it.
 *
 * @remarks
 * Chromium at 1280 and 390 reads the hero, invite, and issue head as 13.302707 through
 * readContrast and 9.927318 against their declared stops. The monogram reads 15.537530
 * through readContrast and 4.634055 against its stops. The published reader composites
 * background colors and does not sample background images. This reading takes the worst
 * declared stop; it does not sample overlays or image pixels.
 * @param node - The element to measure
 * @returns The ratio, taken against the worst declared stop wherever that surface is a gradient
 */
export function readGradientContrast(node: Element): number {
	const gradient = readGradient(node)
	if (gradient === undefined) return readContrast(node)
	const front = requireValue(
		parseCSSColor(readStyle(node, 'color')),
		'The measured element exposes no foreground color',
	)
	const ratios: number[] = []
	for (const stop of gradient.stops) {
		const back: Color = requireValue(
			parseCSSColor(readToken(node, stop)),
			`${stop} resolves to no color`,
		)
		ratios.push(measureContrast(front, back))
	}
	return Math.min(...ratios)
}

/**
 * Selects every painted member of a role's population inside `root`.
 *
 * @param root - The subtree to read
 * @param role - The role whose membership rule selects the population
 * @returns Every match that is visible and paints a box, in document order
 */
export function selectRole(root: ParentNode, role: MatrixRole): readonly Element[] {
	return [...root.querySelectorAll(role.selector)].filter((node) => {
		const box = node.getBoundingClientRect()
		return (
			node.checkVisibility({ opacityProperty: true, visibilityProperty: true }) &&
			box.width > 0 &&
			box.height > 0
		)
	})
}

/**
 * Reports whether `node` sits inside a declared color-mode island rather than on the page surface.
 *
 * @param node - The element to place
 * @returns True when the nearest declared mode is not the document's own
 */
export function readIsland(node: Element): boolean {
	return node.closest('[data-bs-theme]') !== document.documentElement
}

/** Describes the host one journey mounted and the application it provided. */
export interface JourneySurface {
	readonly host: HTMLElement
	readonly app: ApplicationInterface
	readonly storage: Storage
}

/** Describes how one journey opens the shipped shell. */
export interface SurfaceOptions {
	readonly storage?: Storage | undefined
	readonly catalog?: CatalogOptions | undefined
	readonly path?: string | undefined
}

/** Holds the cleanup acts for mounted Vue resources. */
export const TEARDOWNS: Array<() => void> = []

/**
 * Tears down whatever the page is holding so the next journey meets a clean document.
 */
export function clearSurface(): void {
	while (TEARDOWNS.length > 0) TEARDOWNS.pop()?.()
	document.body.replaceChildren()
	window.location.hash = ''
	document.documentElement.setAttribute('data-bs-theme', 'light')
}

/**
 * Mounts the shipped root at its entry route over an isolated store and waits for its screen.
 *
 * @param options - Storage to reuse across sessions, and the collections the catalog reports
 * @returns The host, controller, and storage
 */
export async function openSurface(options?: SurfaceOptions): Promise<JourneySurface> {
	clearSurface()
	window.location.hash = hashHref(options?.path ?? HOME_PATH)
	const store = options?.storage ?? createMemoryStorage()
	const app = createApplication({
		storage: store,
		...(options?.catalog === undefined ? {} : { catalog: createCatalog(options.catalog) }),
	})
	const host = document.createElement('div')
	document.body.append(host)
	const vue = createApp(App, { application: app })
	vue.mount(host)
	TEARDOWNS.push(() => {
		vue.unmount()
		host.remove()
		app.destroy()
	})
	await waitForCondition('the entry screen has painted', () => readHeading().length > 0, {
		budget: 4_000,
		interval: 25,
	})
	return { host, app, storage: store }
}

/**
 * Opens subscribe through the home Introduction Get started control.
 */
export async function startSubscription(): Promise<void> {
	await clickAccessibleWithin(COPY.introduction, 'link', buildName(COPY.started, COPY.introduction))
}

/**
 * Follows an in-app destination from the header, opening the compact menu when it is reachable.
 *
 * @param name - The destination's accessible name
 */
export async function followSite(name: string): Promise<void> {
	await openSite()
	await clickAccessible('link', name)
	await waitForCondition('the destination has focus', () => document.activeElement?.id === 'main', {
		budget: 4_000,
		interval: 25,
	})
	if (readCompact()) {
		await waitForCondition(
			'the menu trigger returns reachable',
			() => readRefusal('button', COPY.menu) === undefined,
			{ budget: 4_000 },
		)
		await waitForState('button', COPY.menu, 'collapsed', { budget: 4_000 })
	}
	await waitForAnimations(document.body, { budget: 4_000 })
}

/**
 * Opens the compact navigation, and refuses a trigger that disagrees with the viewport.
 *
 * @remarks
 * A wide viewport carries the destinations inline and hides the trigger the `d-lg-none` wrapper
 * still renders, so this pins {@link MENU_UNREACHABLE} rather than skipping on any refusal. A
 * trigger that turned reachable, and one that left the document altogether, each throw a voice
 * this comparison rejects. A trigger that vanishes at a compact viewport reaches `clickAccessible`
 * and refuses there.
 */
export async function openSite(): Promise<void> {
	if (!readCompact()) {
		const refusal = readRefusal(COPY.menu)
		if (refusal !== MENU_UNREACHABLE) {
			throw new Error(
				`${COPY.menu} answers "${refusal ?? 'with no refusal'}" at ${String(window.innerWidth)}px, where the masthead carries its destinations inline and hides the trigger`,
			)
		}
		return
	}
	const trigger = resolveAccessible('button', COPY.menu)
	await clickAccessible('button', COPY.menu)
	await waitForCondition(
		'the menu trigger exposes its completed opening',
		() => trigger.isConnected && readStates(trigger).includes('expanded'),
		{ budget: 4_000 },
	)
	await waitForAnimations(document.body, { budget: 4_000 })
	await waitForText(
		'the compact menu paints its destinations',
		() => readPerception(COPY.menu),
		COPY.shop,
		{ budget: 4_000 },
	)
	resolveAccessible('button', COPY.close)
}

/**
 * Closes the compact navigation, and refuses a dismissal that disagrees with the viewport.
 *
 * @remarks
 * The dismissal sits inside the offcanvas, which a wide viewport keeps in the document and hides,
 * so this pins {@link CLOSE_UNREACHABLE} — the one voice that case means.
 */
export async function closeSite(): Promise<void> {
	if (!readCompact()) {
		const refusal = readRefusal(COPY.close)
		if (refusal !== CLOSE_UNREACHABLE) {
			throw new Error(
				`${COPY.close} answers "${refusal ?? 'with no refusal'}" at ${String(window.innerWidth)}px, where no compact menu is open`,
			)
		}
		return
	}
	await clickAccessible('button', COPY.close)
	await waitForCondition(
		'the menu trigger returns reachable',
		() => readRefusal('button', COPY.menu) === undefined,
		{ budget: 4_000 },
	)
	await waitForState('button', COPY.menu, 'collapsed', { budget: 4_000 })
	await waitForAnimations(document.body, { budget: 4_000 })
}

/**
 * Toggles color mode through the control the painted mode obliges the masthead to offer.
 *
 * @remarks
 * The name is derived from `data-bs-theme` rather than chosen by whichever control resolves, so a
 * control offering the mode the document already paints refuses instead of passing.
 */
export async function toggleThemeControl(): Promise<void> {
	const dark = document.documentElement.getAttribute('data-bs-theme') === THEME_DARK
	await clickAccessible('button', dark ? COPY.light : COPY.dark)
}

/** Maps detail views to a fixture slug the catalog actually holds. */
export const DETAIL_SLUGS: Readonly<Record<string, string>> = Object.freeze({
	product: 'roughnotes-pro',
	article: 'local-landscape',
	item: 'coverages-applicable',
})

/** Holds a slug no fixture collection reports, for the lookup every detail screen misses on. */
export const MISSING_SLUG = 'no-such-record'

/** Holds a second product slug the catalog reports, for a navigation that stays on one view. */
export const SIBLING_SLUG = 'advantage-plus'

/**
 * Holds the accessible name every shell destination announces, in reading order, declared apart
 * from the source that builds them.
 */
export const SHELL_NAMES: readonly string[] = [
	'800-428-4384, Contact',
	'rnc@roughnotes.com, Contact',
	'RoughNotes-Pro Login, Logins',
	'Advantage-Plus Login, Logins',
	'Get started, Site',
	'About, Site',
	'Publications, Site',
	'Products, Site',
	'Shop, Site',
	'Get started, Site',
	'About, Site',
	'Publications, Site',
	'Products, Site',
	'Shop, Site',
	'Contact, Site',
	'Get started, Site',
	'RoughNotes-Pro, Products',
	'Advantage-Plus, Products',
	'The Insurance Marketplace, Products',
	'Publication desks, Resources',
	'Magazine issue, Resources',
	'Marketplace search, Resources',
	'Newsletter, Resources',
	'Free magazine delivery, Resources',
	'Our story, Company',
	'Media kits, Company',
	'Write to us, Company',
	'Shop catalog, Company',
	'Existing invoice, Company',
	'800-428-4384, Company',
	'rnc@roughnotes.com, Company',
]

/**
 * Holds the screens the product guide's data-state table names, each detail on a slug the catalog
 * holds.
 */
export const CENSUS_ROUTES: readonly string[] = [
	HOME_PATH,
	ABOUT_PATH,
	PUBLICATIONS_PATH,
	PRODUCTS_PATH,
	`${PRODUCTS_PATH}/${requireValue(DETAIL_SLUGS.product)}`,
	MAGAZINE_PATH,
	`${MAGAZINE_PATH}/${requireValue(DETAIL_SLUGS.article)}`,
	MARKETPLACE_PATH,
	SHOP_PATH,
	`${SHOP_PATH}/${requireValue(DETAIL_SLUGS.item)}`,
	MEDIA_PATH,
	SUBSCRIBE_PATH,
	NEWSLETTER_PATH,
	CONTACT_PATH,
	PAYMENT_PATH,
]

/** Names the voice the resolver raises when one name answers for several reachable controls. */
export const AMBIGUOUS = 'is ambiguous across'

/**
 * Reads the screen heading the shell is painting.
 *
 * @returns The rendered `h1` text, or an empty string before a screen has painted one
 */
export function readHeading(): string {
	const heading = document.querySelector('#main h1')
	return heading === null ? '' : readText(heading)
}

/**
 * Lands on one screen the way a person opening a bookmark lands on it, and waits for its heading.
 *
 * @param path - The registered path to land on
 *
 * @remarks
 * The navigator carries `history: false`, so a hash write is the same navigation a destination link
 * performs. The wait reads the painted heading rather than the controller, because a heading that
 * has replaced the previous one is what tells a reader the screen arrived.
 */
export async function followRoute(path: string): Promise<void> {
	const previous = readHeading()
	window.location.hash = hashHref(path)
	await waitForCondition(
		`${path} paints its own heading`,
		() => readHeading().length > 0 && readHeading() !== previous,
		{ budget: 4_000, interval: 25 },
	)
}

/**
 * Reads the accessible name of every control the painted screen offers a person.
 *
 * @returns Each reachable control's name, in document order, repeats included
 *
 * @remarks
 * The population is what the layer counts as focusable, filtered by the layer's own reachability,
 * so a census over this walks the controls a person can reach rather than a hand-picked list. A
 * caller reads the length to establish the census read a screen at all.
 */
export function readNames(): readonly string[] {
	const names: string[] = []
	for (const node of document.querySelectorAll(FOCUSABLE_SELECTOR)) {
		if (!isReachable(node)) continue
		const name = readName(node)
		if (name.length > 0) names.push(name)
	}
	return names
}

/**
 * Reads every accessible name the painted screen offers a person more than one control under.
 *
 * @returns The resolver's own refusal for each shared name, in reading order
 *
 * @remarks
 * Each name {@link readNames} reported goes back through the resolver, so the finding is the voice
 * a journey would meet rather than a comparison this module makes itself.
 */
export function readShared(): readonly string[] {
	const names = new Set(readNames())
	const shared: string[] = []
	for (const name of names) {
		const refusal = readRefusal(name)
		if (refusal !== undefined && refusal.includes(AMBIGUOUS)) shared.push(refusal)
	}
	return shared
}

/** Names the states the product guide's data-state table declares, as that table spells them. */
export type DataState = 'Reduced' | 'Absent' | 'Missed' | 'Refused' | 'Accepted'

/** Describes one data state the guide's table declares, and how a reader reaches it. */
export interface DataCase {
	/** Names the state as the guide's table names it. */
	readonly state: DataState
	/** Holds the screen the state belongs to. */
	readonly path: string
	/** Holds the collections the catalog reports, where the state needs a catalog of its own. */
	readonly catalog?: CatalogOptions | undefined
	/** Drives the painted screen into the state, where landing on it is not enough. */
	readonly act?: (() => Promise<void>) | undefined
}

/**
 * Filters the magazine to the category the fixture issue holds no article in.
 */
export async function selectEmptyCategory(): Promise<void> {
	await clickAccessible('button', CATEGORY_LABELS.program)
	await waitForText('the magazine reports the filtered-empty issue', readPage, COPY.none, {
		budget: 4_000,
		interval: 25,
	})
}

/**
 * Filters the shop to the department the mounted catalog holds no SKU in.
 */
export async function selectEmptyDepartment(): Promise<void> {
	await clickAccessible('button', DEPARTMENT_LABELS.wheels)
	await waitForText('the shop reports the filtered-empty department', readPage, COPY.vacant, {
		budget: 4_000,
		interval: 25,
	})
}

/**
 * Searches the marketplace for a query the sample matches nothing for.
 */
export async function searchMissingMarket(): Promise<void> {
	await fillAccessible(COPY.query, 'zzzz-no-such-market')
	await clickAccessible('button', COPY.search)
	await waitForText('the marketplace reports the missed search', readPage, COPY.empty, {
		budget: 4_000,
		interval: 25,
	})
}

/**
 * Submits the subscription request with every field empty, so the desk refuses it.
 */
export async function submitEmptySubscription(): Promise<void> {
	await clickAccessible('button', COPY.subscribe)
	await waitForText('the subscribe desk refuses the empty request', readPage, COPY.summary, {
		budget: 4_000,
		interval: 25,
	})
}

/**
 * Fills and submits a subscription request the desk accepts.
 */
export async function submitSubscription(): Promise<void> {
	await fillAccessible(COPY.name, 'Ada Lovelace')
	await fillAccessible(COPY.mail, 'ada@agency.com')
	await clickAccessible('button', COPY.subscribe)
	await waitForText('the subscribe desk accepts the request', readPage, COPY.accepted, {
		budget: 4_000,
		interval: 25,
	})
}

/**
 * Submits the inquiry with every field empty, so the desk refuses it.
 */
export async function submitEmptyInquiry(): Promise<void> {
	await clickAccessible('button', COPY.send)
	await waitForText('the contact desk refuses the empty inquiry', readPage, COPY.inquirySummary, {
		budget: 4_000,
		interval: 25,
	})
}

/**
 * Fills and submits an inquiry the desk accepts, leaving its optional fields empty.
 */
export async function submitInquiry(): Promise<void> {
	await fillAccessible(COPY.name, 'Ada Lovelace')
	await fillAccessible(COPY.company, 'Agency')
	await fillAccessible(COPY.mail, 'ada@agency.com')
	await fillAccessible(COPY.phoneLabel, '800-428-4384')
	await clickAccessible('button', COPY.send)
	await waitForText('the contact desk accepts the inquiry', readPage, COPY.inquiryAccepted, {
		budget: 4_000,
		interval: 25,
	})
}

/**
 * Submits the invoice with every field empty, so the desk refuses it.
 */
export async function submitEmptyInvoice(): Promise<void> {
	await clickAccessible('button', COPY.pay)
	await waitForText('the payment desk refuses the empty invoice', readPage, COPY.paymentSummary, {
		budget: 4_000,
		interval: 25,
	})
}

/**
 * Fills and submits an invoice the desk accepts.
 */
export async function submitInvoice(): Promise<void> {
	await fillAccessible(COPY.customer, '1001')
	await fillAccessible(COPY.invoice, '1001')
	await fillAccessible(COPY.amount, '78.00')
	await clickAccessible('button', COPY.pay)
	await waitForText('the payment desk accepts the invoice', readPage, COPY.paymentAccepted, {
		budget: 4_000,
		interval: 25,
	})
}

/**
 * Holds every data state the product guide's table declares outside its Full column, in the
 * table's own order.
 *
 * @remarks
 * The Full column is what {@link CENSUS_ROUTES} walks, so this table carries the states a bare
 * landing does not reach: the catalog a screen reports nothing from, the filter and the search that
 * match nothing, the lookup that misses, the record the catalog holds incompletely, and what each
 * desk paints after refusing and after accepting a request.
 */
export const DATA_CASES: readonly DataCase[] = Object.freeze([
	Object.freeze({ state: 'Absent', path: PRODUCTS_PATH, catalog: { products: [] } }),
	Object.freeze({ state: 'Missed', path: `${PRODUCTS_PATH}/${MISSING_SLUG}` }),
	Object.freeze({ state: 'Reduced', path: MAGAZINE_PATH, act: selectEmptyCategory }),
	Object.freeze({ state: 'Absent', path: MAGAZINE_PATH, catalog: { articles: [] } }),
	Object.freeze({ state: 'Missed', path: `${MAGAZINE_PATH}/${MISSING_SLUG}` }),
	Object.freeze({ state: 'Reduced', path: MARKETPLACE_PATH, act: searchMissingMarket }),
	Object.freeze({ state: 'Absent', path: MARKETPLACE_PATH, catalog: { markets: [] } }),
	Object.freeze({
		state: 'Reduced',
		path: SHOP_PATH,
		catalog: { skus: [UNINDEXED_SKU] },
		act: selectEmptyDepartment,
	}),
	Object.freeze({ state: 'Absent', path: SHOP_PATH, catalog: { skus: [] } }),
	Object.freeze({ state: 'Missed', path: `${SHOP_PATH}/${MISSING_SLUG}` }),
	Object.freeze({
		state: 'Refused',
		path: `${SHOP_PATH}/${UNINDEXED_SKU.id}`,
		catalog: { skus: [UNINDEXED_SKU] },
	}),
	Object.freeze({ state: 'Absent', path: MEDIA_PATH, catalog: { assets: [] } }),
	Object.freeze({ state: 'Refused', path: SUBSCRIBE_PATH, act: submitEmptySubscription }),
	Object.freeze({ state: 'Accepted', path: SUBSCRIBE_PATH, act: submitSubscription }),
	Object.freeze({ state: 'Refused', path: NEWSLETTER_PATH, act: submitEmptySubscription }),
	Object.freeze({ state: 'Accepted', path: NEWSLETTER_PATH, act: submitSubscription }),
	Object.freeze({ state: 'Refused', path: CONTACT_PATH, act: submitEmptyInquiry }),
	Object.freeze({ state: 'Accepted', path: CONTACT_PATH, act: submitInquiry }),
	Object.freeze({ state: 'Refused', path: PAYMENT_PATH, act: submitEmptyInvoice }),
	Object.freeze({ state: 'Accepted', path: PAYMENT_PATH, act: submitInvoice }),
])

/** Describes a bookmarked screen and the interface outcome the product renders there. */
export interface ArrivalCase {
	readonly path: string
	readonly heading: string
	readonly control: string
	readonly region?: string | undefined
}

/** Holds the arrivals covered by the product guide's route and screen sections. */
export const ARRIVAL_CASES: readonly ArrivalCase[] = Object.freeze([
	{ path: HOME_PATH, heading: HOME_HEADING, control: COPY.explore, region: COPY.introduction },
	{ path: ABOUT_PATH, heading: 'About Rough Notes', control: COPY.explore },
	{
		path: PUBLICATIONS_PATH,
		heading: 'Publications',
		control: 'Rough Notes magazine',
		region: COPY.publications,
	},
	{ path: NEWSLETTER_PATH, heading: 'Rough Notes newsletters', control: COPY.subscribe },
	{ path: PRODUCTS_PATH, heading: 'Products', control: 'RoughNotes-Pro', region: COPY.offerings },
	{ path: `${PRODUCTS_PATH}/roughnotes-pro`, heading: 'RoughNotes-Pro', control: COPY.ask },
	{ path: MAGAZINE_PATH, heading: 'Magazine', control: 'Program business', region: COPY.issue },
	{
		path: `${MAGAZINE_PATH}/local-landscape`,
		heading: 'Mass shootings; mass confusion?',
		control: COPY.magazine,
	},
	{ path: MARKETPLACE_PATH, heading: 'Insurance Marketplace', control: COPY.query },
	{ path: SUBSCRIBE_PATH, heading: 'Subscribe', control: COPY.subscribe },
	{ path: MEDIA_PATH, heading: 'Media kits', control: '2027 Rough Notes magazine rate card' },
	{ path: CONTACT_PATH, heading: 'Contact', control: COPY.send },
	{ path: SHOP_PATH, heading: 'Shop catalog', control: COPY.live },
	{
		path: `${SHOP_PATH}/coverages-applicable`,
		heading: 'Coverages Applicable',
		control: COPY.live,
	},
	{ path: PAYMENT_PATH, heading: 'Pay a bill', control: COPY.customer },
])

/** Describes an absent collection and its real recovery control. */
export interface EmptyCase {
	readonly destination: string
	readonly path: string
	readonly catalog: CatalogOptions
	readonly text: string
	readonly control: string
	readonly state: string
}

/** Holds the catalog-empty states the product guide declares. */
export const EMPTY_CASES: readonly EmptyCase[] = Object.freeze([
	{
		path: PRODUCTS_PATH,
		catalog: { products: [] },
		text: 'No products in this catalog yet.',
		control: buildName(COPY.contact, COPY.offerings),
		destination: 'Write the Indianapolis office',
		state: 'products-unpopulated',
	},
	{
		path: MAGAZINE_PATH,
		catalog: { articles: [] },
		text: 'No articles in this issue yet.',
		control: buildName(COPY.publications, COPY.issue),
		destination: 'The magazine and the Insurance Marketplace are the public editorial desks.',
		state: 'magazine-unpopulated',
	},
	{
		path: MARKETPLACE_PATH,
		catalog: { markets: [] },
		text: 'No markets in this sample yet.',
		control: COPY.contact,
		destination: 'Write the Indianapolis office',
		state: 'marketplace-unpopulated',
	},
	{
		path: SHOP_PATH,
		catalog: { skus: [] },
		text: 'No items in this catalog yet.',
		control: COPY.contact,
		destination: 'Write the Indianapolis office',
		state: 'shop-unpopulated',
	},
	{
		path: MEDIA_PATH,
		catalog: { assets: [] },
		text: COPY.absent,
		control: buildName(COPY.contact, CHANNEL_LABELS.magazine),
		destination: 'Write the Indianapolis office',
		state: 'media-unpopulated',
	},
])

/** Describes a missing catalog record and its listing recovery. */
export interface MissingCase {
	readonly path: string
	readonly text: string
	readonly control: string
	readonly destination: string
	readonly state: string
}

/** Holds the missing-record screens the product guide declares. */
export const MISSING_CASES: readonly MissingCase[] = Object.freeze([
	{
		path: `${PRODUCTS_PATH}/${MISSING_SLUG}`,
		text: 'The product you asked for is not one this fixture catalog holds.',
		control: COPY.listing,
		destination: 'Choose the desk your agency needs',
		state: 'product-missing',
	},
	{
		path: `${MAGAZINE_PATH}/${MISSING_SLUG}`,
		text: 'The article you asked for is not in this fixture issue.',
		control: COPY.magazine,
		destination: 'Coverage, markets, and agency practice',
		state: 'article-missing',
	},
	{
		path: `${SHOP_PATH}/${MISSING_SLUG}`,
		text: 'The item you asked for is not one this fixture catalog holds.',
		control: COPY.stock,
		destination: 'A fixture sample of books',
		state: 'shop-missing',
	},
])

/**
 * Mounts a view that injects {@link APPLICATION_KEY} over an isolated application.
 *
 * @param component - The view or form to mount
 * @returns The host, controller, and storage
 */
export function mountView(component: Component): JourneySurface {
	clearSurface()
	const store = createMemoryStorage()
	const app = createApplication({ storage: store })
	app.start()
	const host = document.createElement('div')
	document.body.append(host)
	const vue = createApp(component)
	vue.provide(APPLICATION_KEY, app)
	vue.mount(host)
	TEARDOWNS.push(() => {
		vue.unmount()
		host.remove()
		app.destroy()
	})
	return { host, app, storage: store }
}

/**
 * Renders the theme composable so tests can drive `toggle` without the shell.
 */
export const THEME_PROBE = defineComponent({
	setup() {
		const theme = useTheme()
		return () =>
			h(
				'button',
				{
					type: 'button',
					'aria-pressed': theme.dark.value,
					'aria-label': theme.dark.value ? COPY.light : COPY.dark,
					onClick: theme.toggle,
				},
				'theme',
			)
	},
})

/** Declares the journey axis provided by the workspace configuration. */
declare module 'vitest' {
	interface ProvidedContext {
		readonly variant: string
		readonly variants: readonly JourneyVariant[]
		readonly capture: boolean
	}
}

/**
 * Applies the variant's color mode through the masthead control and reads its authored state.
 * @param name - The variant pairing color mode with viewport
 * @returns A promise resolving when the document paints that mode and the control exposes its state
 */
export async function applyTheme(name: string): Promise<void> {
	const dark = name.startsWith(`${THEME_DARK}-`)
	const painted = document.documentElement.getAttribute('data-bs-theme') === THEME_DARK
	if (painted !== dark) await toggleThemeControl()
	await waitForState('button', dark ? COPY.light : COPY.dark, `pressed=${String(dark)}`, {
		budget: 4_000,
	})
	await waitForCondition(
		'the variant color mode paints',
		() => (document.documentElement.getAttribute('data-bs-theme') === THEME_DARK) === dark,
		{ budget: 4_000 },
	)
	await waitForAnimations(document.body, { budget: 4_000 })
}

/**
 * Sizes the browser viewport for the variant being read.
 * @param width - The width in CSS pixels
 * @param height - The height in CSS pixels
 * @returns A promise resolving after the viewport changes
 */
export async function resizeViewport(width: number, height: number): Promise<void> {
	await page.viewport(width, height)
}

/**
 * Composes the interface color-mode act into each provided capture variant.
 * @param variants - The serializable journey axis
 * @returns The variants carrying their interface acts
 */
export function buildVariants(variants: readonly JourneyVariant[]): readonly CaptureVariant[] {
	return variants.map((variant) => ({ ...variant, apply: () => applyTheme(variant.name) }))
}

void bootstrap

/** Waits until the arriving main view holds focus at the page origin. */
export async function waitForOrigin(): Promise<void> {
	await waitForCondition(
		'the view starts at the origin',
		() => document.activeElement?.id === 'main' && window.scrollY === 0,
		{ budget: 4_000, interval: 25 },
	)
}

/** Reads a portable file name from a capture path. */
export function readFileName(path: string): string {
	return requireValue(
		path.replaceAll('\\', '/').split('/').pop(),
		`Capture path ${path} names no file`,
	)
}

/** Reads the opening element tag from serialized markup. */
export function readOpeningTag(markup: string): string {
	return markup.slice(0, markup.indexOf('>') + 1)
}
