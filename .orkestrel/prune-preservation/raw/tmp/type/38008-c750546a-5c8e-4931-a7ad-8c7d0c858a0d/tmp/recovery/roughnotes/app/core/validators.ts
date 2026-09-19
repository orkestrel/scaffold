import type {
	Article,
	Asset,
	Category,
	Channel,
	Department,
	Era,
	Inquiry,
	Invoice,
	Market,
	Office,
	Product,
	Rep,
	Sku,
	Subscription,
	View,
} from './types.js'
import { arrayOf, isRecord, isString } from '@orkestrel/contract'
import { CATEGORIES, CHANNELS, DEPARTMENTS, VIEWS } from './constants.js'

/**
 * Checks whether `value` is a {@link Category}.
 *
 * @param value - The value to inspect
 * @returns True when `value` is one of the declared categories
 *
 * @example
 * ```ts
 * isCategory('coverage') // true
 * isCategory('other') // false
 * ```
 */
export function isCategory(value: unknown): value is Category {
	if (!isString(value)) return false
	for (const category of CATEGORIES) {
		if (category === value) return true
	}
	return false
}

/**
 * Checks whether `value` is a {@link Department}.
 *
 * @param value - The value to inspect
 * @returns True when `value` is one of the declared departments
 *
 * @example
 * ```ts
 * isDepartment('books') // true
 * isDepartment('other') // false
 * ```
 */
export function isDepartment(value: unknown): value is Department {
	if (!isString(value)) return false
	for (const department of DEPARTMENTS) {
		if (department === value) return true
	}
	return false
}

/**
 * Checks whether `value` is a {@link Channel}.
 *
 * @param value - The value to inspect
 * @returns True when `value` is one of the declared channels
 *
 * @example
 * ```ts
 * isChannel('magazine') // true
 * isChannel('other') // false
 * ```
 */
export function isChannel(value: unknown): value is Channel {
	if (!isString(value)) return false
	for (const channel of CHANNELS) {
		if (channel === value) return true
	}
	return false
}

/**
 * Checks whether `value` is a {@link View}.
 *
 * @param value - The value to inspect
 * @returns True when `value` is one of the declared views
 *
 * @example
 * ```ts
 * isView('marketplace') // true
 * isView('desk') // false
 * ```
 */
export function isView(value: unknown): value is View {
	if (!isString(value)) return false
	for (const view of VIEWS) {
		if (view === value) return true
	}
	return false
}

/**
 * Checks whether `value` is a {@link Product}.
 *
 * @param value - The value to inspect
 * @returns True when every product field is present and well typed
 *
 * @example
 * ```ts
 * isProduct({ id: 'x', name: 'X', summary: 's', audience: 'a', inclusions: [] })
 * ```
 */
export function isProduct(value: unknown): value is Product {
	if (!isRecord(value)) return false
	if (!isString(value.id) || value.id.length === 0) return false
	if (!isString(value.name) || value.name.length === 0) return false
	if (!isString(value.summary)) return false
	if (!isString(value.audience)) return false
	return arrayOf(isString)(value.inclusions)
}

/**
 * Checks whether `value` is an {@link Article}.
 *
 * @param value - The value to inspect
 * @returns True when every article field is present and well typed
 *
 * @example
 * ```ts
 * isArticle({
 * 	id: 'x',
 * 	title: 'T',
 * 	dek: 'd',
 * 	author: 'a',
 * 	issued: '2026-09-01',
 * 	category: 'coverage',
 * 	body: 'b',
 * })
 * ```
 */
export function isArticle(value: unknown): value is Article {
	if (!isRecord(value)) return false
	if (!isString(value.id) || value.id.length === 0) return false
	if (!isString(value.title) || value.title.length === 0) return false
	if (!isString(value.dek)) return false
	if (!isString(value.author)) return false
	if (!isString(value.issued)) return false
	if (!isCategory(value.category)) return false
	return isString(value.body)
}

/**
 * Checks whether `value` is a {@link Market}.
 *
 * @param value - The value to inspect
 * @returns True when every market field is present and well typed
 *
 * @example
 * ```ts
 * isMarket({ id: 'x', name: 'X', industry: 'i', coverages: [], notes: '' })
 * ```
 */
export function isMarket(value: unknown): value is Market {
	if (!isRecord(value)) return false
	if (!isString(value.id) || value.id.length === 0) return false
	if (!isString(value.name) || value.name.length === 0) return false
	if (!isString(value.industry)) return false
	if (!isString(value.notes)) return false
	return arrayOf(isString)(value.coverages)
}

/**
 * Checks whether `value` is a {@link Sku}.
 *
 * @param value - The value to inspect
 * @returns True when every SKU field is present and well typed
 *
 * @example
 * ```ts
 * isSku({ id: 'x', name: 'X', summary: 's', department: 'books', code: '1', price: 100 })
 * ```
 */
export function isSku(value: unknown): value is Sku {
	if (!isRecord(value)) return false
	if (!isString(value.id) || value.id.length === 0) return false
	if (!isString(value.name) || value.name.length === 0) return false
	if (!isString(value.summary)) return false
	if (!isDepartment(value.department)) return false
	if (!isString(value.code) || value.code.length === 0) return false
	if (typeof value.price !== 'number' || !Number.isInteger(value.price) || value.price < 1)
		return false
	if (value.isbn !== undefined && !isString(value.isbn)) return false
	return true
}

/**
 * Checks whether `value` is an {@link Asset}.
 *
 * @param value - The value to inspect
 * @returns True when every asset field is present and well typed
 *
 * @example
 * ```ts
 * isAsset({ id: 'x', name: 'X', channel: 'magazine', href: 'https://example.com/x.pdf' })
 * ```
 */
export function isAsset(value: unknown): value is Asset {
	if (!isRecord(value)) return false
	if (!isString(value.id) || value.id.length === 0) return false
	if (!isString(value.name) || value.name.length === 0) return false
	if (!isChannel(value.channel)) return false
	return isString(value.href) && value.href.length > 0
}

/**
 * Checks whether `value` is an {@link Era}.
 *
 * @param value - The value to inspect
 * @returns True when every era field is present and well typed
 *
 * @example
 * ```ts
 * isEra({ id: 'x', span: '1878', title: 'T', body: 'b' })
 * ```
 */
export function isEra(value: unknown): value is Era {
	if (!isRecord(value)) return false
	if (!isString(value.id) || value.id.length === 0) return false
	if (!isString(value.span) || value.span.length === 0) return false
	if (!isString(value.title) || value.title.length === 0) return false
	return isString(value.body)
}

/**
 * Checks whether `value` is a {@link Rep}.
 *
 * @param value - The value to inspect
 * @returns True when every representative field is present and well typed
 *
 * @example
 * ```ts
 * isRep({ name: 'Ada', role: 'Editor', phone: '800-428-4384', email: 'ada@agency.com' })
 * ```
 */
export function isRep(value: unknown): value is Rep {
	if (!isRecord(value)) return false
	if (!isString(value.name) || value.name.length === 0) return false
	if (!isString(value.role) || value.role.length === 0) return false
	if (!isString(value.phone) || value.phone.length === 0) return false
	return isString(value.email) && value.email.length > 0
}

/**
 * Checks whether `value` is an {@link Office}.
 *
 * @param value - The value to inspect
 * @returns True when every office field is present and well typed
 *
 * @example
 * ```ts
 * isOffice({
 * 	street: '1 Main',
 * 	suite: 'Suite 1',
 * 	city: 'Carmel',
 * 	region: 'Indiana',
 * 	postal: '46032',
 * 	voice: '317-582-1600',
 * 	fax: '800-321-1909',
 * })
 * ```
 */
export function isOffice(value: unknown): value is Office {
	if (!isRecord(value)) return false
	if (!isString(value.street) || value.street.length === 0) return false
	if (!isString(value.suite) || value.suite.length === 0) return false
	if (!isString(value.city) || value.city.length === 0) return false
	if (!isString(value.region) || value.region.length === 0) return false
	if (!isString(value.postal) || value.postal.length === 0) return false
	if (!isString(value.voice) || value.voice.length === 0) return false
	return isString(value.fax) && value.fax.length > 0
}

/**
 * Checks whether `value` is a {@link Subscription}.
 *
 * @param value - The value to inspect
 * @returns True when name and email are non-empty strings
 *
 * @example
 * ```ts
 * isSubscription({ name: 'Ada', email: 'ada@agency.com' })
 * ```
 */
export function isSubscription(value: unknown): value is Subscription {
	if (!isRecord(value)) return false
	if (!isString(value.name) || value.name.length === 0) return false
	return isString(value.email) && value.email.length > 0
}

/**
 * Checks whether `value` is an {@link Inquiry}.
 *
 * @param value - The value to inspect
 * @returns True when required inquiry fields are present and well typed
 *
 * @example
 * ```ts
 * isInquiry({
 * 	name: 'Ada',
 * 	company: 'Agency',
 * 	email: 'ada@agency.com',
 * 	phone: '800-428-4384',
 * })
 * ```
 */
export function isInquiry(value: unknown): value is Inquiry {
	if (!isRecord(value)) return false
	if (!isString(value.name) || value.name.length === 0) return false
	if (!isString(value.company) || value.company.length === 0) return false
	if (!isString(value.email) || value.email.length === 0) return false
	if (!isString(value.phone) || value.phone.length === 0) return false
	if (value.title !== undefined && !isString(value.title)) return false
	if (value.message !== undefined && !isString(value.message)) return false
	return true
}

/**
 * Checks whether `value` is an {@link Invoice}.
 *
 * @param value - The value to inspect
 * @returns True when customer, number, and a positive integer amount are present
 *
 * @example
 * ```ts
 * isInvoice({ customer: '1001', number: '1001', amount: 7800 })
 * ```
 */
export function isInvoice(value: unknown): value is Invoice {
	if (!isRecord(value)) return false
	if (!isString(value.customer) || value.customer.length === 0) return false
	if (!isString(value.number) || value.number.length === 0) return false
	return typeof value.amount === 'number' && Number.isInteger(value.amount) && value.amount > 0
}
