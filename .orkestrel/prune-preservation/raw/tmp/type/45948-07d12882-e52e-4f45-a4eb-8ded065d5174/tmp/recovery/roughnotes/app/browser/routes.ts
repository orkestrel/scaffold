import type { RouteMeta } from './types.js'
import type { RouteEntry } from '@orkestrel/router'
import {
	ABOUT_PATH,
	ARTICLE_PATH,
	CONTACT_PATH,
	HOME_PATH,
	ITEM_PATH,
	MAGAZINE_PATH,
	MARKETPLACE_PATH,
	MEDIA_PATH,
	NEWSLETTER_PATH,
	PAYMENT_PATH,
	PRODUCT_PATH,
	PRODUCTS_PATH,
	PUBLICATIONS_PATH,
	SHOP_PATH,
	SUBSCRIBE_PATH,
} from './constants.js'

/**
 * Holds the navigator route table for the knowledge site.
 */
export const ROUTES: ReadonlyArray<RouteEntry<RouteMeta>> = Object.freeze([
	Object.freeze({ path: HOME_PATH, meta: Object.freeze({ view: 'home' }) }),
	Object.freeze({ path: ABOUT_PATH, meta: Object.freeze({ view: 'about' }) }),
	Object.freeze({ path: PUBLICATIONS_PATH, meta: Object.freeze({ view: 'publications' }) }),
	Object.freeze({ path: NEWSLETTER_PATH, meta: Object.freeze({ view: 'newsletter' }) }),
	Object.freeze({ path: PRODUCTS_PATH, meta: Object.freeze({ view: 'products' }) }),
	Object.freeze({ path: PRODUCT_PATH, meta: Object.freeze({ view: 'product' }) }),
	Object.freeze({ path: MAGAZINE_PATH, meta: Object.freeze({ view: 'magazine' }) }),
	Object.freeze({ path: ARTICLE_PATH, meta: Object.freeze({ view: 'article' }) }),
	Object.freeze({ path: MARKETPLACE_PATH, meta: Object.freeze({ view: 'marketplace' }) }),
	Object.freeze({ path: SUBSCRIBE_PATH, meta: Object.freeze({ view: 'subscribe' }) }),
	Object.freeze({ path: MEDIA_PATH, meta: Object.freeze({ view: 'media' }) }),
	Object.freeze({ path: CONTACT_PATH, meta: Object.freeze({ view: 'contact' }) }),
	Object.freeze({ path: SHOP_PATH, meta: Object.freeze({ view: 'shop' }) }),
	Object.freeze({ path: ITEM_PATH, meta: Object.freeze({ view: 'item' }) }),
	Object.freeze({ path: PAYMENT_PATH, meta: Object.freeze({ view: 'payment' }) }),
])
