import type {
	Article,
	Asset,
	CatalogInterface,
	CatalogOptions,
	Era,
	Market,
	Product,
	Sku,
} from './types.js'
import { ARTICLES, ASSETS, ERAS, MARKETS, PRODUCTS, SKUS } from './constants.js'
import { indexRecords } from './helpers.js'

/**
 * Holds the fixture catalog of products, articles, markets, SKUs, assets, and eras.
 *
 * @remarks
 * Lookups return `undefined` when the id is missing. Collections are the
 * frozen arrays passed at construction, or the module constants when omitted.
 */
export class Catalog implements CatalogInterface {
	readonly #products: ReadonlyMap<string, Product>
	readonly #articles: ReadonlyMap<string, Article>
	readonly #markets: ReadonlyMap<string, Market>
	readonly #skus: ReadonlyMap<string, Sku>
	readonly #assets: ReadonlyMap<string, Asset>
	readonly #eras: ReadonlyMap<string, Era>
	readonly #productList: readonly Product[]
	readonly #articleList: readonly Article[]
	readonly #marketList: readonly Market[]
	readonly #skuList: readonly Sku[]
	readonly #assetList: readonly Asset[]
	readonly #eraList: readonly Era[]

	/**
	 * Creates a catalog over optional replacement collections.
	 *
	 * @param options - Replacement products, articles, markets, SKUs, assets, or eras
	 */
	constructor(options?: CatalogOptions) {
		this.#productList = options?.products ?? PRODUCTS
		this.#articleList = options?.articles ?? ARTICLES
		this.#marketList = options?.markets ?? MARKETS
		this.#skuList = options?.skus ?? SKUS
		this.#assetList = options?.assets ?? ASSETS
		this.#eraList = options?.eras ?? ERAS
		this.#products = indexRecords(this.#productList)
		this.#articles = indexRecords(this.#articleList)
		this.#markets = indexRecords(this.#marketList)
		this.#skus = indexRecords(this.#skuList)
		this.#assets = indexRecords(this.#assetList)
		this.#eras = indexRecords(this.#eraList)
	}

	/**
	 * Returns the product for `id`, or `undefined` when it is absent.
	 *
	 * @param id - The product slug
	 * @returns The product, or `undefined`
	 */
	product(id: string): Product | undefined {
		return this.#products.get(id)
	}

	/**
	 * Returns every product in catalog order.
	 *
	 * @returns The product collection
	 */
	products(): readonly Product[] {
		return this.#productList
	}

	/**
	 * Returns the article for `id`, or `undefined` when it is absent.
	 *
	 * @param id - The article slug
	 * @returns The article, or `undefined`
	 */
	article(id: string): Article | undefined {
		return this.#articles.get(id)
	}

	/**
	 * Returns every article in catalog order.
	 *
	 * @returns The article collection
	 */
	articles(): readonly Article[] {
		return this.#articleList
	}

	/**
	 * Returns the market for `id`, or `undefined` when it is absent.
	 *
	 * @param id - The market slug
	 * @returns The market, or `undefined`
	 */
	market(id: string): Market | undefined {
		return this.#markets.get(id)
	}

	/**
	 * Returns every market in catalog order.
	 *
	 * @returns The market collection
	 */
	markets(): readonly Market[] {
		return this.#marketList
	}

	/**
	 * Returns the SKU for `id`, or `undefined` when it is absent.
	 *
	 * @param id - The SKU slug
	 * @returns The SKU, or `undefined`
	 */
	sku(id: string): Sku | undefined {
		return this.#skus.get(id)
	}

	/**
	 * Returns every SKU in catalog order.
	 *
	 * @returns The SKU collection
	 */
	skus(): readonly Sku[] {
		return this.#skuList
	}

	/**
	 * Returns the media-kit asset for `id`, or `undefined` when it is absent.
	 *
	 * @param id - The asset slug
	 * @returns The asset, or `undefined`
	 */
	asset(id: string): Asset | undefined {
		return this.#assets.get(id)
	}

	/**
	 * Returns every media-kit asset in catalog order.
	 *
	 * @returns The asset collection
	 */
	assets(): readonly Asset[] {
		return this.#assetList
	}

	/**
	 * Returns the timeline era for `id`, or `undefined` when it is absent.
	 *
	 * @param id - The era slug
	 * @returns The era, or `undefined`
	 */
	era(id: string): Era | undefined {
		return this.#eras.get(id)
	}

	/**
	 * Returns every timeline era in catalog order.
	 *
	 * @returns The era collection
	 */
	eras(): readonly Era[] {
		return this.#eraList
	}
}
