import { describe, expect, it } from 'vitest'
import { requireValue } from '@orkestrel/test'
import {
	ARTICLES,
	ASSETS,
	FEATURED_PRODUCT,
	MARKETS,
	PRODUCTS,
	SKUS,
	filterArticles,
	filterAssets,
	filterSkus,
	followArticle,
	formatCode,
	formatPrice,
	indexRecords,
	matchMarket,
	matchesFeatured,
	searchMarkets,
} from '@app/core'

describe('filterArticles', () => {
	it('returns every article when the category is omitted', () => {
		expect(filterArticles(ARTICLES)).toBe(ARTICLES)
	})

	it('keeps only the requested category', () => {
		const coverage = filterArticles(ARTICLES, 'coverage')
		expect(coverage.every((article) => article.category === 'coverage')).toBe(true)
		expect(coverage.length).toBeGreaterThan(0)
		expect(filterArticles(ARTICLES, 'coverage')).not.toEqual(ARTICLES)
		expect(filterArticles(ARTICLES, 'program')).toEqual([])
	})
})

describe('searchMarkets', () => {
	it('returns the full directory for a blank query', () => {
		expect(searchMarkets(MARKETS, '')).toBe(MARKETS)
		expect(searchMarkets(MARKETS, '   ')).toBe(MARKETS)
	})

	it('matches name, industry, coverage, and notes', () => {
		expect(
			searchMarkets(MARKETS, 'cyber').some((market) => market.id === 'cyber-data-breach'),
		).toBe(true)
		expect(searchMarkets(MARKETS, 'Hospitality').length).toBeGreaterThan(0)
		expect(
			searchMarkets(MARKETS, 'MCS-90').some((market) => market.id === 'trucking-liability'),
		).toBe(true)
	})

	it('returns an empty list when nothing matches', () => {
		expect(searchMarkets(MARKETS, 'zzzz-no-such-market')).toEqual([])
	})
})

describe('matchMarket', () => {
	it('matches against name, industry, notes, and coverages', () => {
		const market = requireValue(
			MARKETS.find((candidate) => candidate.id === 'restaurant-gl'),
			'restaurant-gl fixture is missing',
		)
		expect(matchMarket(market, 'restaurant')).toBe(true)
		expect(matchMarket(market, 'hospitality')).toBe(true)
		expect(matchMarket(market, 'liquor')).toBe(true)
		expect(matchMarket(market, 'submission')).toBe(true)
		expect(matchMarket(market, 'zzzz')).toBe(false)
	})
})

describe('filterSkus', () => {
	it('returns every SKU when the department is omitted', () => {
		expect(filterSkus(SKUS)).toBe(SKUS)
	})

	it('keeps only the requested department', () => {
		const books = filterSkus(SKUS, 'books')
		expect(books.every((sku) => sku.department === 'books')).toBe(true)
		expect(books.length).toBeGreaterThan(0)
		expect(filterSkus(SKUS, 'books')).not.toEqual(SKUS)
	})
})

describe('filterAssets', () => {
	it('returns every asset when the channel is omitted', () => {
		expect(filterAssets(ASSETS)).toBe(ASSETS)
	})

	it('keeps only the requested channel', () => {
		const magazine = filterAssets(ASSETS, 'magazine')
		expect(magazine.every((asset) => asset.channel === 'magazine')).toBe(true)
		expect(magazine.length).toBeGreaterThan(0)
		expect(filterAssets(ASSETS, 'banner')).not.toEqual(ASSETS)
	})
})

describe('formatPrice', () => {
	it('formats integer cents with two fractional digits', () => {
		expect(formatPrice(7800)).toBe('$78.00')
		expect(formatPrice(7475)).toBe('$74.75')
		expect(formatPrice(1)).toBe('$0.01')
		expect(formatPrice(0)).toBe('0')
		expect(formatPrice(1.5)).toBe('1.5')
		expect(formatPrice(Number.NaN)).toBe('NaN')
		expect(formatPrice(Number.POSITIVE_INFINITY)).toBe('Infinity')
		expect(formatPrice(-1)).toBe('-1')
	})
})

describe('formatCode', () => {
	it('prefixes digit-only catalog numbers and leaves other codes', () => {
		expect(formatCode('30040')).toBe('#30040')
		expect(formatCode('1–10 workstations')).toBe('1–10 workstations')
		expect(formatCode('')).toBe('')
	})
})

describe('indexRecords', () => {
	it('indexes by id and keeps the last write on a duplicate', () => {
		const first = {
			id: 'dup',
			name: 'First',
			summary: 's',
			audience: 'a',
			inclusions: [],
		}
		const second = {
			id: 'dup',
			name: 'Second',
			summary: 's',
			audience: 'a',
			inclusions: [],
		}
		expect(indexRecords([]).size).toBe(0)
		expect(indexRecords([first]).get('dup')?.name).toBe('First')
		expect(indexRecords([first, second]).get('dup')?.name).toBe('Second')
	})
})

describe('matchesFeatured', () => {
	it('compares product id to the featured id', () => {
		const product = requireValue(PRODUCTS[0], 'PRODUCTS fixture is empty')
		expect(matchesFeatured(product, FEATURED_PRODUCT)).toBe(true)
		expect(matchesFeatured(product, 'advantage-plus')).toBe(false)
	})
})

describe('followArticle', () => {
	it('returns the article after the named one and wraps at the end of the issue', () => {
		const first = requireValue(ARTICLES[0], 'ARTICLES fixture is empty')
		const second = requireValue(ARTICLES[1], 'ARTICLES fixture holds one article')
		const last = requireValue(ARTICLES.at(-1), 'ARTICLES fixture is empty')
		expect(followArticle(ARTICLES, first.id)).toBe(second)
		expect(followArticle(ARTICLES, last.id)).toBe(first)
	})

	it('returns undefined for an absent id and for an issue that cannot continue', () => {
		const first = requireValue(ARTICLES[0], 'ARTICLES fixture is empty')
		expect(followArticle(ARTICLES, 'no-such-article')).toBeUndefined()
		expect(followArticle([], first.id)).toBeUndefined()
		expect(followArticle([first], first.id)).toBeUndefined()
	})
})
