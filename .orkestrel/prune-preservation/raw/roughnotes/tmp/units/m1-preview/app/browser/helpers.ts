import type { ApplicationInterface } from './types.js'
import { ARTICLE_PATH, ITEM_PATH, PRODUCT_PATH, THEME_DARK, THEME_LIGHT } from './constants.js'

/**
 * Builds the hash href for an in-app path.
 *
 * @param path - The `/`-prefixed navigator path
 * @returns The `#/` hash href
 *
 * @example
 * ```ts
 * hashHref('/products') // '#/products'
 * ```
 */
export function hashHref(path: string): string {
	return `#${path}`
}

/**
 * Builds the product detail path for a slug.
 *
 * @param slug - The product id
 * @returns The `/products/:slug` path
 *
 * @example
 * ```ts
 * productHref('roughnotes-pro')
 * ```
 */
export function productHref(slug: string): string {
	return PRODUCT_PATH.replace(':slug', slug)
}

/**
 * Builds the article path for a slug.
 *
 * @param slug - The article id
 * @returns The `/magazine/:slug` path
 *
 * @example
 * ```ts
 * articleHref('local-landscape')
 * ```
 */
export function articleHref(slug: string): string {
	return ARTICLE_PATH.replace(':slug', slug)
}

/**
 * Builds the shop SKU path for a slug.
 *
 * @param slug - The SKU id
 * @returns The `/shop/:slug` path
 *
 * @example
 * ```ts
 * skuHref('coverages-applicable')
 * ```
 */
export function skuHref(slug: string): string {
	return ITEM_PATH.replace(':slug', slug)
}

/**
 * Reads a persisted theme flag from `storage`.
 *
 * @param storage - The Storage surface to read
 * @param key - The storage key
 * @returns True when the stored value is `dark`; false when it is anything else, and false when
 * the store refuses the read
 *
 * @remarks
 * This is the one place the color mode reaches the store for a reading, and it is the mirror of
 * `rememberTheme`: a browser holding storage behind a permission raises `SecurityError` from
 * `getItem` the way a full origin raises from `setItem`. The caller reads this while the
 * application is being constructed, so an escaping refusal would cost the whole page rather than
 * one preference. A refused read answers with the light mode, which is what a reader who has
 * stored no preference already gets.
 *
 * @example
 * ```ts
 * readTheme(localStorage, 'roughnotes-theme')
 * ```
 */
export function readTheme(storage: Storage, key: string): boolean {
	try {
		return storage.getItem(key) === THEME_DARK
	} catch {
		return false
	}
}

/**
 * Remembers `dark` for the next session, when the store accepts the write.
 *
 * @param storage - The Storage surface to write
 * @param key - The storage key
 * @param dark - The theme flag
 *
 * @remarks
 * This is the one place the color mode reaches the store, and remembering it is best effort. A
 * store with no room left raises `QuotaExceededError` from `setItem`, and a browser holding
 * storage behind a permission raises from the same call, so a mode a person picked would
 * otherwise reach the window as an unhandled error. The mode is a display preference the
 * document paints for this session either way, so a refusal leaves it unremembered and nothing
 * else: the caller has already painted it, and no interface claim depends on the store.
 *
 * @example
 * ```ts
 * rememberTheme(localStorage, 'roughnotes-theme', true)
 * ```
 */
export function rememberTheme(storage: Storage, key: string, dark: boolean): void {
	try {
		storage.setItem(key, dark ? THEME_DARK : THEME_LIGHT)
	} catch {
		return
	}
}

/**
 * Paints `dark` on `root`, then remembers it for the next session.
 *
 * @param storage - The Storage surface to write
 * @param key - The storage key
 * @param root - The document element that carries `data-bs-theme`
 * @param dark - The theme flag
 *
 * @remarks
 * The paint comes first, so a store that refuses the write leaves the document in the mode the
 * caller asked for rather than one mode behind it.
 */
export function writeTheme(storage: Storage, key: string, root: HTMLElement, dark: boolean): void {
	root.setAttribute('data-bs-theme', dark ? THEME_DARK : THEME_LIGHT)
	rememberTheme(storage, key, dark)
}

/**
 * Returns the current document element, or `undefined` when none exists.
 *
 * @returns `document.documentElement` when a document is present
 */
export function readRoot(): HTMLElement | undefined {
	if (typeof document === 'undefined') return undefined
	return document.documentElement
}

/**
 * Returns `localStorage` when the host exposes it and permits reading it.
 *
 * @returns The localStorage object, or `undefined`
 *
 * @remarks
 * A denied origin keeps the property and raises `SecurityError` from it, and `typeof` reads that
 * property rather than guarding it, so the host check needs the same catch the store's own calls
 * need. The caller falls back to an in-memory store, which keeps the mode for this session.
 */
export function readStorage(): Storage | undefined {
	try {
		return typeof localStorage === 'undefined' ? undefined : localStorage
	} catch {
		return undefined
	}
}

/**
 * Checks whether `item` is the current navigation path.
 *
 * @param item - The nav item's path
 * @param current - The navigator's registered pattern, or `undefined`
 * @returns True when the item owns the current screen
 *
 * @example
 * ```ts
 * isCurrent('/products', '/products/:slug') // true
 * ```
 */
export function isCurrent(item: string, current: string | undefined): boolean {
	if (current === undefined) return item === '/'
	if (item === '/') return current === '/'
	return current === item || current.startsWith(`${item}/`)
}

/**
 * Formats an ISO calendar date as a month-year label.
 *
 * @param issued - The `YYYY-MM-DD` value
 * @param months - The twelve month labels in calendar order
 * @returns A readable issued label, or `issued` when the month is out of range
 *
 * @example
 * ```ts
 * formatIssued('2026-09-01', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
 * ```
 */
export function formatIssued(issued: string, months: readonly string[]): string {
	const parts = issued.split('-')
	const year = parts[0]
	const month = parts[1]
	if (year === undefined || month === undefined) return issued
	const index = Number(month) - 1
	const label = months[index]
	if (label === undefined) return issued
	return `${label} ${year}`
}

/**
 * Checks whether `issues` names `field`.
 *
 * @param issues - The failed fields, or `undefined` before submit
 * @param field - The field to test
 * @returns True when `issues` includes `field`
 *
 * @example
 * ```ts
 * includesField(['email'], 'email') // true
 * includesField(undefined, 'name') // false
 * ```
 */
export function includesField<T extends string>(
	issues: readonly T[] | undefined,
	field: T,
): boolean {
	return issues?.includes(field) === true
}

/**
 * Flips the application's persisted dark-mode flag.
 *
 * @param app - The live application controller
 */
export function toggleDark(app: ApplicationInterface): void {
	app.theme(!app.dark.value)
}

/**
 * Returns a function that flips `app`'s persisted dark-mode flag.
 *
 * @param app - The live application controller
 * @returns A zero-argument toggle
 *
 * @example
 * ```ts
 * bindToggle(app)()
 * ```
 */
export function bindToggle(app: ApplicationInterface): () => void {
	return () => {
		toggleDark(app)
	}
}

/**
 * Moves keyboard focus to the element with `id`.
 *
 * @param id - The element's id
 * @returns Nothing. Absence of a matching element leaves focus where it is.
 *
 * @example
 * ```ts
 * focusNode('payment-customer')
 * ```
 */
export function focusNode(id: string): void {
	const node = document.getElementById(id)
	if (!(node instanceof HTMLElement)) return
	node.focus()
}

/**
 * Scrolls the window to the origin and focuses main without moving the viewport.
 *
 * @returns Nothing. Main is focused when it exists.
 *
 * @example
 * ```ts
 * revealView()
 * ```
 */
export function revealView(): void {
	const node = document.getElementById('main')
	if (node instanceof HTMLElement) node.focus({ preventScroll: true })
	const scrolling = document.scrollingElement
	if (scrolling !== null) scrolling.scrollTop = 0
	document.documentElement.scrollTop = 0
	document.body.scrollTop = 0
	window.scrollTo(0, 0)
}

/**
 * Reads the host a destination opens on.
 *
 * @remarks
 * A screen derives its external cue from the destination rather than storing a second field
 * beside it, so a record cannot name one host and link to another.
 *
 * @param href - The destination URL, absolute or relative to the current page
 * @returns The host name the destination resolves to
 *
 * @example
 * ```ts
 * readHost('https://roughnotes.com/kit.pdf') // 'roughnotes.com'
 * ```
 */
export function readHost(href: string): string {
	return new URL(href, window.location.href).hostname
}

/**
 * Resolves a declared destination to the href a link carries.
 *
 * @remarks
 * A declared destination is an in-app navigator path when it starts with `/`, and a complete
 * external or protocol URL otherwise.
 *
 * @param destination - The declared destination
 * @returns The hash href for an in-app path, or `destination` unchanged
 *
 * @example
 * ```ts
 * shellHref('/products') // '#/products'
 * shellHref('tel:800-428-4384') // 'tel:800-428-4384'
 * ```
 */
export function shellHref(destination: string): string {
	return destination.startsWith('/') ? hashHref(destination) : destination
}
