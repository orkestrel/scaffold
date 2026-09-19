import type { CatalogInterface, CatalogOptions } from './types.js'
import { Catalog } from './Catalog.js'

/**
 * Creates a {@link CatalogInterface} over optional replacement fixtures.
 *
 * @param options - Replacement products, articles, markets, SKUs, assets, or eras
 * @returns The catalog
 *
 * @example
 * ```ts
 * createCatalog().product('roughnotes-pro')?.name
 * ```
 */
export function createCatalog(options?: CatalogOptions): CatalogInterface {
	return new Catalog(options)
}
