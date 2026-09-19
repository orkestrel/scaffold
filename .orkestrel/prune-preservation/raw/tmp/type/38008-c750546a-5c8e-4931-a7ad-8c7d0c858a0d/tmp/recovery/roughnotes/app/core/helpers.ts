import type {
	Article,
	Asset,
	Category,
	Channel,
	Department,
	Market,
	Product,
	Sku,
} from './types.js'

/**
 * Indexes records by `id` for catalog lookup.
 *
 * @param records - The records to index
 * @returns A map from id to record, last write winning on a duplicate id
 *
 * @example
 * ```ts
 * indexRecords([{ id: 'a', name: 'A' }]).get('a')?.name
 * ```
 */
export function indexRecords<T extends { readonly id: string }>(
	records: readonly T[],
): ReadonlyMap<string, T> {
	const indexed = new Map<string, T>()
	for (const record of records) indexed.set(record.id, record)
	return indexed
}

/**
 * Returns articles in `records` whose `category` matches, or every article when
 * `category` is omitted.
 *
 * @param records - The articles to filter
 * @param category - The category to keep, or `undefined` for the full list
 * @returns The matching articles in original order
 *
 * @example
 * ```ts
 * filterArticles(articles, 'coverage')
 * filterArticles(articles)
 * ```
 */
export function filterArticles(
	records: readonly Article[],
	category?: Category,
): readonly Article[] {
	if (category === undefined) return records
	return records.filter((record) => record.category === category)
}

/**
 * Returns whether `market` matches a trimmed, case-folded `query`.
 *
 * @param market - The listing to test
 * @param needle - The already-trimmed, case-folded query
 * @returns True when the name, industry, a coverage, or the notes contain `needle`
 */
export function matchMarket(market: Market, needle: string): boolean {
	if (market.name.toLowerCase().includes(needle)) return true
	if (market.industry.toLowerCase().includes(needle)) return true
	if (market.notes.toLowerCase().includes(needle)) return true
	for (const coverage of market.coverages) {
		if (coverage.toLowerCase().includes(needle)) return true
	}
	return false
}

/**
 * Returns markets whose name, industry, coverages, or notes contain `query`.
 *
 * @remarks
 * A blank query returns `records` unchanged so the directory can list every
 * fixture. A non-blank query that hits nothing returns an empty list, which
 * the view treats as no-results rather than first-use.
 *
 * @param records - The listings to search
 * @param query - The raw search string
 * @returns The matching listings in original order
 *
 * @example
 * ```ts
 * searchMarkets(markets, 'cyber')
 * searchMarkets(markets, '   ')
 * ```
 */
export function searchMarkets(records: readonly Market[], query: string): readonly Market[] {
	const needle = query.trim().toLowerCase()
	if (needle.length === 0) return records
	return records.filter((market) => matchMarket(market, needle))
}

/**
 * Checks whether `product` is the featured offering.
 *
 * @param product - The product to test
 * @param featured - The featured product id
 * @returns True when the ids match
 *
 * @example
 * ```ts
 * matchesFeatured({ id: 'roughnotes-pro', name: 'RoughNotes-Pro', summary: '', audience: '', inclusions: [] }, 'roughnotes-pro')
 * ```
 */
export function matchesFeatured(product: Product, featured: string): boolean {
	return product.id === featured
}

/**
 * Returns SKUs in `records` whose `department` matches, or every SKU when
 * `department` is omitted.
 *
 * @param records - The SKUs to filter
 * @param department - The department to keep, or `undefined` for the full list
 * @returns The matching SKUs in original order
 *
 * @example
 * ```ts
 * filterSkus(skus, 'books')
 * filterSkus(skus)
 * ```
 */
export function filterSkus(records: readonly Sku[], department?: Department): readonly Sku[] {
	if (department === undefined) return records
	return records.filter((record) => record.department === department)
}

/**
 * Returns assets in `records` whose `channel` matches, or every asset when
 * `channel` is omitted.
 *
 * @param records - The assets to filter
 * @param channel - The channel to keep, or `undefined` for the full list
 * @returns The matching assets in original order
 *
 * @example
 * ```ts
 * filterAssets(assets, 'magazine')
 * filterAssets(assets)
 * ```
 */
export function filterAssets(records: readonly Asset[], channel?: Channel): readonly Asset[] {
	if (channel === undefined) return records
	return records.filter((record) => record.channel === channel)
}

/**
 * Formats integer USD cents as a dollar string with two fractional digits.
 *
 * @param cents - The amount in integer cents. Values below 1 return the input
 *   as a string so a caller can see the unformatted number.
 * @returns A `$dollars.cents` label, or `String(cents)` when `cents` is not a
 *   positive finite integer
 *
 * @example
 * ```ts
 * formatPrice(7800) // '$78.00'
 * formatPrice(7475) // '$74.75'
 * ```
 */
export function formatPrice(cents: number): string {
	if (!Number.isInteger(cents) || cents < 1) return String(cents)
	const dollars = Math.trunc(cents / 100)
	const rest = cents % 100
	const padded = rest < 10 ? `0${rest}` : String(rest)
	return `$${String(dollars)}.${padded}`
}

/**
 * Formats a shop catalog code. Digit-only codes keep the `#` prefix from the
 * live catalog. Other codes paint as stored.
 *
 * @param code - The SKU catalog code
 * @returns The painted catalog code
 *
 * @example
 * ```ts
 * formatCode('30040') // '#30040'
 * formatCode('1–10 workstations') // '1–10 workstations'
 * ```
 */
export function formatCode(code: string): string {
	return /^\d+$/u.test(code) ? `#${code}` : code
}

/**
 * Returns the article that follows `id` in the issue's running order.
 *
 * @remarks
 * Every article in one issue shares its `issued` date, so the collection's own order is the
 * issue's running order and the record after the last one is the first. An issue that holds one
 * article cannot continue, so it returns `undefined` rather than the article the reader is on.
 *
 * @param records - The issue's articles in running order
 * @param id - The article the reader is on
 * @returns The next article, or `undefined` when `id` is absent or the issue cannot continue
 *
 * @example
 * ```ts
 * followArticle(articles, 'local-landscape')?.title
 * ```
 */
export function followArticle(records: readonly Article[], id: string): Article | undefined {
	if (records.length < 2) return undefined
	const index = records.findIndex((record) => record.id === id)
	if (index < 0) return undefined
	return records[(index + 1) % records.length]
}
