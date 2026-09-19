import { describe, expect, it } from 'vitest'
import { requireValue } from '@orkestrel/test'
import {
	ARTICLES,
	ASSETS,
	ERAS,
	FEATURED_PRODUCT,
	MARKETS,
	PRODUCTS,
	SKUS,
	createCatalog,
} from '@app/core'

describe('Catalog', () => {
	it('returns products, articles, markets, SKUs, assets, and eras by id', () => {
		const catalog = createCatalog()
		expect(catalog.product(FEATURED_PRODUCT)?.name).toBe('RoughNotes-Pro')
		expect(catalog.article('local-landscape')?.author).toBe('Christopher W. Cook')
		expect(catalog.market('cyber-data-breach')?.industry).toBe('Technology')
		expect(catalog.sku('coverages-applicable')?.code).toBe('30040')
		expect(catalog.asset('magazine-rate-2027')?.channel).toBe('magazine')
		expect(catalog.era('born')?.span).toBe('1878–1881')
		expect(catalog.product('missing')).toBeUndefined()
		expect(catalog.article('missing')).toBeUndefined()
		expect(catalog.market('missing')).toBeUndefined()
		expect(catalog.sku('missing')).toBeUndefined()
		expect(catalog.asset('missing')).toBeUndefined()
		expect(catalog.era('missing')).toBeUndefined()
	})

	it('returns the fixture collections in declaration order', () => {
		const catalog = createCatalog()
		expect(catalog.products()).toBe(PRODUCTS)
		expect(catalog.articles()).toBe(ARTICLES)
		expect(catalog.markets()).toBe(MARKETS)
		expect(catalog.skus()).toBe(SKUS)
		expect(catalog.assets()).toBe(ASSETS)
		expect(catalog.eras()).toBe(ERAS)
	})

	it('accepts replacement collections without keeping omitted defaults for that kind', () => {
		const only = requireValue(PRODUCTS[0], 'PRODUCTS fixture is empty')
		const catalog = createCatalog({
			products: [
				{
					id: 'only',
					name: 'Only',
					summary: 's',
					audience: 'a',
					inclusions: [],
				},
			],
			articles: [],
			markets: [],
			skus: [],
			assets: [],
			eras: [],
		})
		expect(catalog.products()).toEqual([
			{
				id: 'only',
				name: 'Only',
				summary: 's',
				audience: 'a',
				inclusions: [],
			},
		])
		expect(catalog.product(FEATURED_PRODUCT)).toBeUndefined()
		expect(catalog.product(only.id)).toBeUndefined()
		expect(catalog.articles()).toEqual([])
		expect(catalog.markets()).toEqual([])
		expect(catalog.skus()).toEqual([])
		expect(catalog.assets()).toEqual([])
		expect(catalog.eras()).toEqual([])
	})
})
