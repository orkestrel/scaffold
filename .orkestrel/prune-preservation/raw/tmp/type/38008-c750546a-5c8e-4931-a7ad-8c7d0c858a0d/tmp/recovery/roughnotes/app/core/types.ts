import type { Result } from '@orkestrel/contract'

/**
 * Names one magazine article's subject axis.
 *
 * @remarks
 * The axis is `category`, never `kind` or `type`. Absence of a filter is
 * `undefined`, not a sentinel member.
 */
export type Category =
	| 'coverage'
	| 'specialty'
	| 'management'
	| 'technology'
	| 'personal'
	| 'program'

/**
 * Names one shop department in the fixture catalog.
 *
 * @remarks
 * Knowledge-desk offerings stay {@link Product} records. Shop SKUs are
 * orderable books, wheels, and supplies. Absence of a filter is `undefined`.
 */
export type Department = 'books' | 'wheels' | 'supplies'

/**
 * Names the advertising channel a media-kit {@link Asset} belongs to.
 */
export type Channel = 'magazine' | 'marketplace' | 'banner'

/**
 * Names one hash-routed screen the knowledge site can show.
 *
 * @remarks
 * Detail screens (`product`, `article`, `item`) carry their record id in the
 * route params, not on this union.
 */
export type View =
	| 'home'
	| 'about'
	| 'publications'
	| 'newsletter'
	| 'products'
	| 'product'
	| 'magazine'
	| 'article'
	| 'marketplace'
	| 'subscribe'
	| 'media'
	| 'contact'
	| 'shop'
	| 'item'
	| 'payment'

/**
 * Names one subscription field that can fail validation.
 */
export type SubscriptionField = 'name' | 'email'

/**
 * Names one contact-inquiry field that can fail validation.
 *
 * @remarks
 * `title` and `message` may be omitted. They are not members of this union.
 */
export type InquiryField = 'name' | 'company' | 'email' | 'phone'

/**
 * Names one invoice-payment field that can fail validation.
 */
export type InvoiceField = 'customer' | 'number' | 'amount'

/**
 * Represents one Rough Notes product offering.
 *
 * @remarks
 * `id` is the slug used in `/products/:slug`. Featured status is derived from
 * the featured product id constant rather than stored on the record.
 */
export interface Product {
	readonly id: string
	readonly name: string
	readonly summary: string
	readonly audience: string
	readonly inclusions: readonly string[]
}

/**
 * Represents one magazine article in the fixture catalog.
 *
 * @remarks
 * `id` is the slug used in `/magazine/:slug`. `issued` is an ISO `YYYY-MM-DD`
 * calendar date. `dek` is the standfirst a listing shows under the title.
 */
export interface Article {
	readonly id: string
	readonly title: string
	readonly dek: string
	readonly author: string
	readonly issued: string
	readonly category: Category
	readonly body: string
}

/**
 * Represents one Insurance Marketplace listing in the fixture sample.
 *
 * @remarks
 * `industry` is a free-form specialty-market label, not {@link Category}.
 */
export interface Market {
	readonly id: string
	readonly name: string
	readonly industry: string
	readonly coverages: readonly string[]
	readonly notes: string
}

/**
 * Represents one orderable shop SKU in the fixture catalog.
 *
 * @remarks
 * `id` is the slug used in `/shop/:slug`. `price` is integer USD cents.
 * `isbn` is omitted when the live listing does not publish one.
 */
export interface Sku {
	readonly id: string
	readonly name: string
	readonly summary: string
	readonly department: Department
	readonly code: string
	readonly price: number
	readonly isbn?: string | undefined
}

/**
 * Represents one downloadable advertising document.
 *
 * @remarks
 * `href` is the live public PDF. This application does not vendor the file.
 */
export interface Asset {
	readonly id: string
	readonly name: string
	readonly channel: Channel
	readonly href: string
}

/**
 * Represents one era on the company timeline.
 *
 * @remarks
 * `span` is the display years. Fixtures are a sample of the public history,
 * not a scrape of every era page.
 */
export interface Era {
	readonly id: string
	readonly span: string
	readonly title: string
	readonly body: string
}

/**
 * Represents one advertising representative.
 */
export interface Rep {
	readonly name: string
	readonly role: string
	readonly phone: string
	readonly email: string
}

/**
 * Represents the published mailing office.
 */
export interface Office {
	readonly street: string
	readonly suite: string
	readonly city: string
	readonly region: string
	readonly postal: string
	readonly voice: string
	readonly fax: string
}

/**
 * Represents a validated magazine-subscription request.
 */
export interface Subscription {
	readonly name: string
	readonly email: string
}

/**
 * Represents a validated contact inquiry.
 *
 * @remarks
 * `title` and `message` are omitted when the sender left them blank.
 */
export interface Inquiry {
	readonly name: string
	readonly company: string
	readonly email: string
	readonly phone: string
	readonly title?: string | undefined
	readonly message?: string | undefined
}

/**
 * Represents a validated fixture invoice payment.
 *
 * @remarks
 * `amount` is integer USD cents. Nothing is sent off the device.
 */
export interface Invoice {
	readonly customer: string
	readonly number: string
	readonly amount: number
}

/**
 * Represents optional fixture replacements for a {@link CatalogInterface}.
 *
 * @remarks
 * Omitted collections fall back to the frozen constants. Used by tests to
 * supply a smaller catalog without replacing the class.
 */
export interface CatalogOptions {
	readonly products?: readonly Product[] | undefined
	readonly articles?: readonly Article[] | undefined
	readonly markets?: readonly Market[] | undefined
	readonly skus?: readonly Sku[] | undefined
	readonly assets?: readonly Asset[] | undefined
	readonly eras?: readonly Era[] | undefined
}

/**
 * Represents the host-independent catalog of products, articles, markets,
 * shop SKUs, media-kit assets, and timeline eras.
 *
 * @remarks
 * Lookups return `undefined` when the id is absent. Listing methods return the
 * full frozen collection; filtering and search live in helpers so the class
 * does not grow a toolbox of query modes.
 */
export interface CatalogInterface {
	product(id: string): Product | undefined
	products(): readonly Product[]
	article(id: string): Article | undefined
	articles(): readonly Article[]
	market(id: string): Market | undefined
	markets(): readonly Market[]
	sku(id: string): Sku | undefined
	skus(): readonly Sku[]
	asset(id: string): Asset | undefined
	assets(): readonly Asset[]
	era(id: string): Era | undefined
	eras(): readonly Era[]
}

/**
 * Represents the outcome of parsing a subscription form.
 */
export type SubscriptionResult = Result<Subscription, readonly SubscriptionField[]>

/**
 * Represents the outcome of parsing a contact inquiry.
 */
export type InquiryResult = Result<Inquiry, readonly InquiryField[]>

/**
 * Represents the outcome of parsing a fixture invoice payment.
 */
export type InvoiceResult = Result<Invoice, readonly InvoiceField[]>
