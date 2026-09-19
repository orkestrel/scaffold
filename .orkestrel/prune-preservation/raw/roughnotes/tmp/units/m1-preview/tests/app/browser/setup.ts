import type { ApplicationInterface } from '@app/browser'
import type { CatalogOptions, Sku } from '@app/core'
import type { Color } from '@orkestrel/test/browser'
import type { Component } from 'vue'
import { createApp, defineComponent, h } from 'vue'
import { requireValue, waitForCondition } from '@orkestrel/test'
import {
	build,
	clickAccessible,
	clickAccessibleWithin,
	measureContrast,
	parseCSSColor,
	readCascade,
	readClasses,
	readContrast,
	readName,
	readPage,
	readStates,
	readStyle,
	readToken,
	resolveAccessible,
	resolveRendered,
} from '@orkestrel/test/browser'
import { createCatalog } from '@app/core'
import {
	APPLICATION_KEY,
	App,
	COPY,
	THEME_DARK,
	createApplication,
	createMemoryStorage,
	useTheme,
} from '@app/browser'

/** How long a surface may take to paint a heading after a hash change, in ms. */
export const SETTLE_BUDGET = 4_000

/** How often a settle poll may re-read the page, in ms. */
export const SETTLE_INTERVAL = 25

/** How long a control's paint may keep moving before the matrix refuses to read it, in ms. */
export const PAINT_BUDGET = 4_000

/** The heading the home view paints. */
export const HOME_HEADING = 'The knowledge that makes independent agents unstoppable.'

/** The voice the layer uses when Sign In is absent. */
export const SIGN_IN_ABSENT = 'No interactive element has the accessible name "Sign In"'

/**
 * The voice the layer uses for the compact trigger a wide masthead renders and hides.
 *
 * @remarks
 * The trigger sits inside a `d-lg-none` wrapper, so an expanded masthead keeps it in the document
 * and paints no box for it. That is the present-but-unreachable case, not the absent one.
 */
export const MENU_UNREACHABLE = `Interactive target "${COPY.menu}" is not visible and focus-reachable`

/** The voice the layer uses for the compact dismissal a closed menu renders and hides. */
export const CLOSE_UNREACHABLE = `Interactive target "${COPY.close}" is not visible and focus-reachable`

/** The width, in CSS px, below which the masthead folds its destinations into the compact menu. */
export const COMPACT_WIDTH = 992

/**
 * Reports whether the masthead is folded into the compact menu at the current viewport.
 *
 * @returns True below the `lg` breakpoint the masthead expands at
 */
export function readCompact(): boolean {
	return window.innerWidth < COMPACT_WIDTH
}

/** The ratio information-bearing text must reach against the surface behind it. */
export const TEXT_CONTRAST = 4.5

/** The ratio a meaningful textless mark, a state, and focus chrome must reach. */
export const MARK_CONTRAST = 3

/** One resolved-style role the matrix reads: its membership rule and the bar every member clears. */
export interface MatrixRole {
	readonly label: string
	readonly selector: string
	readonly bar: number
}

/** One control the matrix focuses, to read the fill its label sits on and the ring it wears. */
export interface MatrixControl {
	readonly label: string
	readonly role: string
	readonly name: string
}

/** One painted gradient surface and the primitive tokens its stops name. */
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

/** The roles the shell paints on every screen, all of them on the navy utility bar and footer. */
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

/** The roles home paints across its paper sections and its navy islands. */
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

/** The roles a listing paints once its filter row and its records are on screen. */
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

/** The roles a refused request paints. */
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

/** The roles a quiet notice paints: the `empty`, `miss`, and `partial` categories share them. */
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
 * A fixture book the live listing identifies by its catalog code alone.
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

/** The primary commit the subscribe desk ends on. */
export const COMMIT_CONTROL: MatrixControl = Object.freeze({
	label: 'primary commit',
	role: 'button',
	name: COPY.subscribe,
})

/**
 * The quiet destination the footer carries to the shop.
 *
 * @remarks
 * Home paints no link under this name, so the name resolves to the footer's own destination and
 * the matrix reads the shell's plain link rather than a screen's.
 */
export const CONTENT_CONTROL: MatrixControl = Object.freeze({
	label: 'footer destination',
	role: 'link',
	name: COPY.catalog,
})

/** The magazine filter row's selected control. */
export const SELECTED_CONTROL: MatrixControl = Object.freeze({
	label: 'filter row selected control',
	role: 'button',
	name: 'All articles',
})

/** The magazine filter row's unselected control. */
export const UNSELECTED_CONTROL: MatrixControl = Object.freeze({
	label: 'filter row unselected control',
	role: 'button',
	name: 'Program business',
})

/** The plain link a refused inquiry's summary offers. */
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
 * @param node - The element to measure
 * @returns The ratio, taken against the worst declared stop wherever that surface is a gradient
 */
export function readSurface(node: Element): number {
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
 * Reports whether one animation is still moving the paint it drives.
 *
 * @param animation - The animation to judge
 * @returns True while the animation is running
 */
export function isRunning(animation: Animation): boolean {
	return animation.playState === 'running'
}

/**
 * Reads the contrast `node` reaches once its own paint has stopped moving.
 *
 * @param node - The element to measure
 * @returns The ratio the settled paint reaches, against the surface a person sees behind it
 * @throws When the paint is still moving after {@link PAINT_BUDGET}
 *
 * @remarks
 * A control transitions its fill and its label color over 0.15s whenever the pointer crosses it,
 * and a viewport change, a scroll, or a remount moves the page under a stationary pointer. A
 * reading taken inside that window reports an interpolated frame — `background-color` at a
 * fraction of its alpha, `color` part way between two values — that no state of the application
 * paints, so the number is neither the rest reading nor the hover reading. Waiting for the
 * element's own animations to finish reads the paint a person sees, whichever state it settles in.
 */
export async function readSettled(node: Element): Promise<number> {
	const deadline = Date.now() + PAINT_BUDGET
	while (Date.now() < deadline) {
		const running = node.getAnimations().filter(isRunning)
		if (running.length === 0) return readSurface(node)
		await Promise.allSettled(running.map((animation) => animation.finished))
	}
	throw new Error(`The paint on ${readName(node)} is still moving after ${String(PAINT_BUDGET)}ms`)
}

/**
 * Selects every painted member of a role's population inside `root`.
 *
 * @param root - The subtree to read
 * @param role - The role whose membership rule selects the population
 * @returns Every match that is announced and paints a box, in document order
 */
export function selectRole(root: ParentNode, role: MatrixRole): readonly Element[] {
	return [...root.querySelectorAll(role.selector)].filter(isPainted)
}

/**
 * Reports whether an element paints a box a reader can see.
 *
 * @param node - The element to judge
 * @returns True when the box has width and height and nothing hides it
 *
 * @remarks
 * This asks about paint rather than announcement, because a meaningful mark carries
 * `aria-hidden="true"` and still has to meet its contrast bar.
 */
export function isPainted(node: Element): boolean {
	const box = node.getBoundingClientRect()
	if (box.width === 0 || box.height === 0) return false
	return readStyle(node, 'visibility') === 'visible' && readStyle(node, 'opacity') !== '0'
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

/** The host one journey mounted and the application it provided. */
export interface JourneySurface {
	readonly host: HTMLElement
	readonly app: ApplicationInterface
	readonly storage: Storage
}

/** How one journey opens the shipped shell. */
export interface SurfaceOptions {
	readonly storage?: Storage | undefined
	readonly catalog?: CatalogOptions | undefined
}

/** How many writes a {@link QuotaStorage} accepts before its quota is spent. */
export interface QuotaOptions {
	readonly writes: number
}

/**
 * Implements the Web Storage interface over a real store whose quota runs out after `writes`.
 *
 * @remarks
 * A browser raises `QuotaExceededError` from `setItem` once the origin has no room left, and every
 * write after that raises it again. This is that condition made reachable: the first `writes`
 * writes land in a real store, and each later one refuses the way a full origin does. Reads answer
 * from what the store actually accepted, so a journey can read what the application kept after the
 * refusal. It is a real Storage, not a behavioral fake.
 */
export class QuotaStorage implements Storage {
	readonly #values: Storage = createMemoryStorage()
	#writes: number

	/**
	 * @param options - How many writes this store accepts
	 */
	constructor(options: QuotaOptions) {
		this.#writes = options.writes
	}

	/**
	 * Returns the number of stored keys.
	 */
	get length(): number {
		return this.#values.length
	}

	/**
	 * Removes every stored key.
	 */
	clear(): void {
		this.#values.clear()
	}

	/**
	 * Returns the value for `key`, or `null` when it is absent.
	 *
	 * @param key - The storage key
	 * @returns The stored string, or `null`
	 */
	getItem(key: string): string | null {
		return this.#values.getItem(key)
	}

	/**
	 * Returns the key at `index`, or `null` when the index is out of range.
	 *
	 * @param index - The zero-based key index
	 * @returns The key, or `null`
	 */
	key(index: number): string | null {
		return this.#values.key(index)
	}

	/**
	 * Removes `key` when it is present.
	 *
	 * @param key - The storage key
	 */
	removeItem(key: string): void {
		this.#values.removeItem(key)
	}

	/**
	 * Stores `value` under `key` while the quota holds.
	 *
	 * @param key - The storage key
	 * @param value - The string to store
	 * @throws A `QuotaExceededError` once the declared number of writes is spent
	 */
	setItem(key: string, value: string): void {
		if (this.#writes <= 0) {
			throw new DOMException(`No room is left for ${key}`, 'QuotaExceededError')
		}
		this.#writes -= 1
		this.#values.setItem(key, value)
	}
}

/** Which operations the host's storage permission covers. */
export interface PermissionOptions {
	readonly reads: boolean
	readonly writes: boolean
}

/**
 * Implements the Web Storage interface over a real store the host holds behind a permission.
 *
 * @remarks
 * A browser with cookies blocked, a sandboxed frame, and a hardened privacy mode all raise
 * `SecurityError` from the storage object rather than answering, and the refusal covers every
 * operation the permission withholds. This is that condition made reachable: a refused read
 * raises the way a denied origin does, a permitted one answers from the real store beneath, and
 * `permit` grants what the host withheld so a test can read what the store kept while reads were
 * refused. It is a real Storage, not a behavioral fake.
 */
export class PermissionStorage implements Storage {
	readonly #values: Storage = createMemoryStorage()
	#reads: boolean
	#writes: boolean

	/**
	 * @param options - Which operations the permission covers
	 */
	constructor(options: PermissionOptions) {
		this.#reads = options.reads
		this.#writes = options.writes
	}

	/**
	 * Returns the number of stored keys.
	 *
	 * @throws A `SecurityError` while the permission withholds reads
	 */
	get length(): number {
		if (!this.#reads) throw this.#denial('this document')
		return this.#values.length
	}

	/**
	 * Grants the reads and writes the host withheld, the way a person allowing site data does.
	 */
	permit(): void {
		this.#reads = true
		this.#writes = true
	}

	/**
	 * Removes every stored key.
	 *
	 * @throws A `SecurityError` while the permission withholds writes
	 */
	clear(): void {
		if (!this.#writes) throw this.#denial('this document')
		this.#values.clear()
	}

	/**
	 * Returns the value for `key`, or `null` when it is absent.
	 *
	 * @param key - The storage key
	 * @returns The stored string, or `null`
	 * @throws A `SecurityError` while the permission withholds reads
	 */
	getItem(key: string): string | null {
		if (!this.#reads) throw this.#denial(key)
		return this.#values.getItem(key)
	}

	/**
	 * Returns the key at `index`, or `null` when the index is out of range.
	 *
	 * @param index - The zero-based key index
	 * @returns The key, or `null`
	 * @throws A `SecurityError` while the permission withholds reads
	 */
	key(index: number): string | null {
		if (!this.#reads) throw this.#denial('this document')
		return this.#values.key(index)
	}

	/**
	 * Removes `key` when it is present.
	 *
	 * @param key - The storage key
	 * @throws A `SecurityError` while the permission withholds writes
	 */
	removeItem(key: string): void {
		if (!this.#writes) throw this.#denial(key)
		this.#values.removeItem(key)
	}

	/**
	 * Stores `value` under `key` when the permission covers writes.
	 *
	 * @param key - The storage key
	 * @param value - The string to store
	 * @throws A `SecurityError` while the permission withholds writes
	 */
	setItem(key: string, value: string): void {
		if (!this.#writes) throw this.#denial(key)
		this.#values.setItem(key, value)
	}

	// The voice Chromium raises from a denied origin, so a test reads the name a real refusal carries.
	#denial(detail: string): DOMException {
		return new DOMException(`Access is denied for ${detail}`, 'SecurityError')
	}
}

const TEARDOWNS: Array<() => void> = []

/**
 * Reads the layer's exact refusal voice for `name`, or `undefined` when it resolves.
 *
 * @param name - The control's accessible name
 * @returns The refusal sentence, or `undefined`
 */
export function readRefusal(name: string): string | undefined {
	try {
		resolveRendered(name)
		return undefined
	} catch (error) {
		return error instanceof Error ? error.message : String(error)
	}
}

/**
 * Reads the states one painted control announces, `pressed` among them.
 *
 * @param name - The control's accessible name
 * @returns Every state the layer reads from it, such as `pressed=true` or `pressed=false`
 */
export function readAnnounced(name: string): readonly string[] {
	return readStates(resolveAccessible('button', name))
}

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
 * Mounts the shipped root over an isolated memory store and waits until home has painted.
 *
 * @param options - Storage to reuse across sessions, and the collections the catalog reports
 * @returns The host, controller, and storage
 */
export async function openSurface(options?: SurfaceOptions): Promise<JourneySurface> {
	clearSurface()
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
	await waitForCondition('home has painted', () => readPage().includes(HOME_HEADING), {
		budget: SETTLE_BUDGET,
		interval: SETTLE_INTERVAL,
	})
	return { host, app, storage: store }
}

/**
 * Opens subscribe through the home Introduction Get started control.
 */
export async function startSubscription(): Promise<void> {
	await clickAccessibleWithin(COPY.introduction, 'link', COPY.started)
}

/**
 * Follows an in-app destination from the header, opening the compact menu when it is reachable.
 *
 * @param name - The destination's accessible name
 */
export async function followSite(name: string): Promise<void> {
	await openSite()
	await clickAccessible('link', name)
	await waitForCondition(
		'the destination has focus and the compact menu has closed',
		() => document.activeElement?.id === 'main' && readMenuSettled(false),
		{ budget: SETTLE_BUDGET, interval: SETTLE_INTERVAL },
	)
}

/**
 * Checks whether the compact menu has finished opening or closing.
 *
 * @param opened - If true, checks for an open menu; if false, checks for a closed menu.
 * @returns True if the menu has reached the requested state; false otherwise.
 */
export function readMenuSettled(opened: boolean): boolean {
	const menu = document.getElementById('site-menu')
	return (
		menu instanceof HTMLElement &&
		menu.classList.contains('show') === opened &&
		!menu.classList.contains('showing') &&
		!menu.classList.contains('hiding')
	)
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
	await clickAccessible('button', COPY.menu)
	await waitForCondition('the compact menu is open', () => readMenuSettled(true), {
		budget: SETTLE_BUDGET,
		interval: SETTLE_INTERVAL,
	})
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
	await waitForCondition('the compact menu is closed', () => readMenuSettled(false), {
		budget: SETTLE_BUDGET,
		interval: SETTLE_INTERVAL,
	})
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

/**
 * Builds an SVG carrying an undefined class token for the census extractor control.
 *
 * @param name - The class token no stylesheet declares
 * @returns The SVG element
 */
export function buildMarkControl(name: string): SVGElement {
	const mark = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	mark.setAttribute('class', name)
	return mark
}

/** The opaque fill a composited stack ends on, which is what the reader's walk must reach. */
export const STACK_BASE = 'rgb(255, 255, 255)'

/** The translucent layer a composited stack paints over {@link STACK_BASE}. */
export const STACK_TINT = 'rgba(0, 0, 0, 0.06)'

/** A foreground the flat reading clears and the composited reading fails. */
export const STACK_REFUSED = 'rgb(150, 150, 150)'

/** A foreground the composited reading clears and the flat reading fails. */
export const STACK_ACCEPTED = 'rgb(0, 0, 0)'

/** One translucent stack and the two foregrounds the composited-contrast control reads over it. */
export interface CompositeStack {
	readonly base: HTMLElement
	readonly refused: HTMLElement
	readonly accepted: HTMLElement
}

/**
 * Builds a translucent stack whose composited reading and flat reading disagree in both directions.
 *
 * @returns The opaque base carrying the tint, and the two foregrounds over it
 *
 * @remarks
 * Every other harness control the matrix composes paints its own opaque background, so the
 * ancestor walk and the alpha blend {@link readSurface} exists for never run. This stack exercises
 * them: {@link STACK_TINT} over {@link STACK_BASE} composites to a near-white surface, which
 * {@link STACK_REFUSED} fails and {@link STACK_ACCEPTED} clears, while a reader taking the tint at
 * full strength reports the opposite pair. No single non-compositing reading satisfies both.
 */
export function buildCompositeStack(): CompositeStack {
	const base = build('div', { attributes: { style: `background-color: ${STACK_BASE}` } })
	const tint = build('div', { attributes: { style: `background-color: ${STACK_TINT}` } })
	const refused = build('p', {
		text: 'Composited contrast control',
		attributes: { style: `color: ${STACK_REFUSED}` },
	})
	const accepted = build('p', {
		text: 'Composited contrast survivor',
		attributes: { style: `color: ${STACK_ACCEPTED}` },
	})
	tint.append(refused, accepted)
	base.append(tint)
	return { base, refused, accepted }
}

/**
 * Reads the contrast `node` reaches against its nearest declared background taken at full strength.
 *
 * @param node - The element to measure
 * @returns The ratio a reader that never composites would report
 * @throws When the element exposes no foreground color, or sits on no declared background
 *
 * @remarks
 * This is the rival reading {@link readSurface} must exclude. It stops at the first ancestor
 * declaring a background color and discards that color's alpha, so a translucent tint reads as a
 * full-strength paint and the surface a person sees never enters the number.
 */
export function readFlat(node: Element): number {
	const front = requireValue(
		parseCSSColor(readStyle(node, 'color')),
		'The measured element exposes no foreground color',
	)
	let current: Element | null = node
	while (current !== null) {
		const own = parseCSSColor(readStyle(current, 'background-color'))
		if (own !== undefined && own[3] > 0) return measureContrast(front, [own[0], own[1], own[2], 1])
		current = current.parentElement
	}
	throw new Error(`${readName(node)} sits on no declared background`)
}

/** The membership rule every census row names. */
export const CENSUS_RULE =
	'every class token the mounted subtree carries, against every loaded stylesheet'

/** One authored-class census: the population it walked and the tokens the cascade never declares. */
export interface CensusReading {
	readonly elements: number
	readonly tokens: number
	readonly undeclared: readonly string[]
}

/**
 * Takes the authored-class census of one mounted screen, both controls included.
 *
 * @param root - The mounted subtree to walk
 * @param fed - The undefined token handed straight to the set comparison
 * @param carried - The undefined token an appended SVG carries through the extractor
 * @returns What the census walked, and every token no loaded stylesheet declares
 *
 * @remarks
 * The carried token reaches the difference through `readClasses` rather than beside it, so a
 * reader blind to an SVG's non-string `className` reports one token where two are present.
 */
export function readCensus(root: ParentNode, fed: string, carried: string): CensusReading {
	const mark = buildMarkControl(carried)
	root.append(mark)
	const authored = readClasses(root)
	const elements = root.querySelectorAll('*').length
	mark.remove()
	const declared = readCascade()
	return {
		elements,
		tokens: authored.size,
		undeclared: [...authored, fed].filter((name) => !declared.has(name)).sort(),
	}
}

/** The fixtures one style-escape reading carries, and the block it must leave alone. */
export interface EscapeFixtures {
	readonly inline: HTMLElement
	readonly block: HTMLStyleElement
	readonly permitted: HTMLStyleElement
}

/**
 * Builds one fixture per style-escape branch, plus the permitted document stylesheet block.
 *
 * @param declaration - The inline declaration the escaping fixtures carry
 * @returns The inline escape, the component-scoped block, and the permitted head block
 *
 * @remarks
 * `inline` feeds the attribute branch and `block` the element branch, which is the half no
 * previous reading fed. `permitted` is the standalone-HTML project stylesheet the styling ladder
 * allows in `<head>`: the same reader reports it when the head is the population and must leave it
 * out when the mounted surface is, so a reader passing by rejecting every style element is caught.
 */
export function buildEscapeFixtures(declaration: string): EscapeFixtures {
	const inline = build('p', { text: 'Inline escape control', attributes: { style: declaration } })
	const block = document.createElement('style')
	block.textContent = `.roughnotes-escape-block { ${declaration} }`
	const permitted = document.createElement('style')
	permitted.id = 'roughnotes-stylesheet'
	permitted.textContent = `#roughnotes-permitted { ${declaration} }`
	return { inline, block, permitted }
}

/** Maps detail views to a fixture slug the catalog actually holds. */
export const DETAIL_SLUGS: Readonly<Record<string, string>> = Object.freeze({
	product: 'roughnotes-pro',
	article: 'local-landscape',
	item: 'coverages-applicable',
})

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
