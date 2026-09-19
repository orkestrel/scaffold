import type {
	ApplicationInterface,
	DepartmentChoice,
	FilterChoice,
	NavItem,
	NoticeCategory,
	ShellGroup,
} from './types.js'
import type { InjectionKey } from 'vue'
import {
	CATEGORIES,
	CATEGORY_LABELS,
	DEPARTMENTS,
	DEPARTMENT_LABELS,
	type Category,
	type Department,
} from '@app/core'

/**
 * Holds the Vue injection key for the application controller.
 */
export const APPLICATION_KEY: InjectionKey<ApplicationInterface> = Symbol('application')

/**
 * Holds the localStorage key for the color-mode flag.
 */
export const THEME_STORAGE = 'roughnotes-theme'

/**
 * Holds the `data-bs-theme` value written when `dark` is true.
 */
export const THEME_DARK = 'dark'

/**
 * Holds the `data-bs-theme` value written when `dark` is false.
 */
export const THEME_LIGHT = 'light'

/**
 * Holds the hash path for the home view.
 */
export const HOME_PATH = '/'

/**
 * Holds the hash path for the product listing.
 */
export const PRODUCTS_PATH = '/products'

/**
 * Holds the hash path pattern for a product detail.
 */
export const PRODUCT_PATH = '/products/:slug'

/**
 * Holds the hash path for the magazine listing.
 */
export const MAGAZINE_PATH = '/magazine'

/**
 * Holds the hash path pattern for an article.
 */
export const ARTICLE_PATH = '/magazine/:slug'

/**
 * Holds the hash path for the marketplace search.
 */
export const MARKETPLACE_PATH = '/marketplace'

/**
 * Holds the hash path for the subscription form.
 */
export const SUBSCRIBE_PATH = '/subscribe'

/**
 * Holds the hash path for the about view.
 */
export const ABOUT_PATH = '/about'

/**
 * Holds the hash path for the publications hub.
 */
export const PUBLICATIONS_PATH = '/publications'

/**
 * Holds the hash path for the newsletter view.
 */
export const NEWSLETTER_PATH = '/newsletter'

/**
 * Holds the hash path for the media-kits view.
 */
export const MEDIA_PATH = '/media'

/**
 * Holds the hash path for the contact view.
 */
export const CONTACT_PATH = '/contact'

/**
 * Holds the hash path for the shop listing.
 */
export const SHOP_PATH = '/shop'

/**
 * Holds the hash path pattern for a shop SKU.
 */
export const ITEM_PATH = '/shop/:slug'

/**
 * Holds the hash path for the fixture invoice payment.
 */
export const PAYMENT_PATH = '/payment'

/**
 * Holds magazine filter controls, All articles first.
 */
export const FILTER_CHOICES: readonly FilterChoice[] = Object.freeze([
	Object.freeze({ category: undefined, label: 'All articles' }),
	...CATEGORIES.map((category) => Object.freeze({ category, label: CATEGORY_LABELS[category] })),
])

/**
 * Holds shop department filter controls, All items first.
 */
export const DEPARTMENT_CHOICES: readonly DepartmentChoice[] = Object.freeze([
	Object.freeze({ department: undefined, label: 'All items' }),
	...DEPARTMENTS.map((department) =>
		Object.freeze({ department, label: DEPARTMENT_LABELS[department] }),
	),
])

/**
 * Holds live Rough Notes destinations this application does not authenticate.
 */
export const EXTERNAL_LINKS: Readonly<
	Record<'pro' | 'advantage' | 'shop' | 'order' | 'billing', string>
> = Object.freeze({
	pro: 'https://shoppingcart.roughnotes.com/Insurance-Professional-Products/RNP/RoughNotesProSeries.php',
	advantage:
		'https://shoppingcart.roughnotes.com/Insurance-Professional-Products/RNP/RoughNotesAdvantagePlus.php',
	shop: 'https://shoppingcart.roughnotes.com/Catalog.php',
	order: 'https://shoppingcart.roughnotes.com/images/orderform.pdf',
	billing: 'https://shoppingcart.roughnotes.com/ccpayment/',
})

/**
 * Holds the published voice and contact lines.
 */
export const COPY = Object.freeze({
	brand: 'Rough Notes',
	mark: 'Since 1878',
	phone: '800-428-4384',
	email: 'rnc@roughnotes.com',
	skip: 'Skip to content',
	menu: 'Menu',
	close: 'Close menu',
	dark: 'Use dark theme',
	light: 'Use light theme',
	pro: 'RoughNotes-Pro Login',
	advantage: 'Advantage-Plus Login',
	shop: 'Shop',
	live: 'Live catalog',
	order: 'Order form (PDF)',
	billing: 'Pay on Rough Notes',
	started: 'Get started',
	explore: 'Explore products',
	feature: 'Read the feature',
	magazine: 'Read the magazine',
	search: 'Search markets',
	ask: 'Ask about this product',
	query: 'Coverage or industry',
	subscribe: 'Subscribe free',
	name: 'Full name',
	mail: 'Work email',
	title: 'Title',
	company: 'Company',
	phoneLabel: 'Phone',
	message: 'Message',
	customer: 'Customer number',
	invoice: 'Invoice number',
	amount: 'Invoice amount',
	send: 'Send inquiry',
	pay: 'Review payment',
	summary: 'The subscription form refused these entries',
	inquirySummary: 'The inquiry form refused these entries',
	paymentSummary: 'The payment form refused these entries',
	accepted: 'No subscription was started',
	inquiryAccepted: 'No inquiry was sent',
	paymentAccepted: 'No payment was made',
	privacy:
		'What you type here stays in this browser. It is not sent to Rough Notes or anyone else, and this page discards it when you close or reload it.',
	empty: 'No markets match this search.',
	clear: 'Clear search',
	none: 'No articles in this category.',
	vacant: 'No items in this department.',
	absent: 'No documents in this channel.',
	all: 'Show all articles',
	every: 'Show all items',
	missing: 'That page is not in this catalog.',
	listing: 'All products',
	stock: 'All shop items',
	issue: 'Magazine issue',
	delivery: 'Free magazine delivery',
	site: 'Site',
	content: 'Content',
	footer: 'Site footer',
	logins: 'Logins',
	resources: 'Resources',
	trail: 'Breadcrumb',
	introduction: 'Introduction',
	offerings: 'Product offerings',
	join: 'Join the community',
	about: 'About',
	story: 'Our story',
	publications: 'Publications',
	products: 'Products',
	desks: 'Publication desks',
	newsletter: 'Newsletter',
	media: 'Media kits',
	contact: 'Contact',
	write: 'Write to us',
	catalog: 'Shop catalog',
	payment: 'Pay a bill',
	bill: 'Existing invoice',
	history: 'Company timeline',
	team: 'Our team',
	board: 'Editorial board',
	advertising: 'Advertising representatives',
})

/**
 * Holds in-app navigation labels in header order.
 *
 * @remarks
 * Every label a published word already names is taken from {@link COPY}, so the masthead, the
 * compact menu, and the copy a test resolves a destination by cannot drift apart.
 */
export const NAV_ITEMS: readonly NavItem[] = Object.freeze([
	Object.freeze({ path: ABOUT_PATH, label: COPY.about }),
	Object.freeze({ path: PUBLICATIONS_PATH, label: COPY.publications }),
	Object.freeze({ path: PRODUCTS_PATH, label: COPY.products }),
	Object.freeze({ path: SHOP_PATH, label: COPY.shop }),
])

/**
 * Holds the compact menu's destinations in reading order.
 *
 * @remarks
 * The menu carries every header destination and Contact, which the header has no room for.
 */
export const MENU_ITEMS: readonly NavItem[] = Object.freeze([
	...NAV_ITEMS,
	Object.freeze({ path: CONTACT_PATH, label: COPY.contact }),
])

/**
 * Holds the utility bar's clusters of destinations outside this application.
 */
export const UTILITY_GROUPS: readonly ShellGroup[] = Object.freeze([
	Object.freeze({
		title: COPY.contact,
		links: Object.freeze([
			Object.freeze({ label: COPY.phone, destination: `tel:${COPY.phone}`, mark: 'bi-telephone' }),
			Object.freeze({
				label: COPY.email,
				destination: `mailto:${COPY.email}`,
				mark: 'bi-envelope',
			}),
		]),
	}),
	Object.freeze({
		title: COPY.logins,
		links: Object.freeze([
			Object.freeze({ label: COPY.pro, destination: EXTERNAL_LINKS.pro }),
			Object.freeze({ label: COPY.advantage, destination: EXTERNAL_LINKS.advantage }),
		]),
	}),
])

/**
 * Holds the footer's destinations, grouped as the footer paints them.
 *
 * @remarks
 * The footer is the product's largest navigation surface, so it is declared here rather than
 * written as markup, and the shell renders every group through one loop.
 */
export const FOOTER_GROUPS: readonly ShellGroup[] = Object.freeze([
	Object.freeze({
		title: COPY.products,
		links: Object.freeze([
			Object.freeze({ label: 'RoughNotes-Pro', destination: `${PRODUCTS_PATH}/roughnotes-pro` }),
			Object.freeze({ label: 'Advantage-Plus', destination: `${PRODUCTS_PATH}/advantage-plus` }),
			Object.freeze({
				label: 'The Insurance Marketplace',
				destination: `${PRODUCTS_PATH}/marketplace`,
			}),
		]),
	}),
	Object.freeze({
		title: COPY.resources,
		links: Object.freeze([
			Object.freeze({ label: COPY.desks, destination: PUBLICATIONS_PATH }),
			Object.freeze({ label: COPY.issue, destination: MAGAZINE_PATH }),
			Object.freeze({ label: 'Marketplace search', destination: MARKETPLACE_PATH }),
			Object.freeze({ label: COPY.newsletter, destination: NEWSLETTER_PATH }),
			Object.freeze({ label: COPY.delivery, destination: SUBSCRIBE_PATH }),
		]),
	}),
	Object.freeze({
		title: COPY.company,
		links: Object.freeze([
			Object.freeze({ label: COPY.story, destination: ABOUT_PATH }),
			Object.freeze({ label: COPY.media, destination: MEDIA_PATH }),
			Object.freeze({ label: COPY.write, destination: CONTACT_PATH }),
			Object.freeze({ label: COPY.catalog, destination: SHOP_PATH }),
			Object.freeze({ label: COPY.bill, destination: PAYMENT_PATH }),
			Object.freeze({ label: COPY.phone, destination: `tel:${COPY.phone}`, mark: 'bi-telephone' }),
			Object.freeze({
				label: COPY.email,
				destination: `mailto:${COPY.email}`,
				mark: 'bi-envelope',
			}),
		]),
	}),
])

/**
 * Holds Bootstrap Icons class names for each product id.
 */
export const PRODUCT_MARKS: Readonly<Record<string, string>> = Object.freeze({
	'roughnotes-pro': 'bi-compass',
	'advantage-plus': 'bi-people',
	marketplace: 'bi-search',
	'pfm-online': 'bi-bar-chart',
	books: 'bi-rulers',
	magazine: 'bi-newspaper',
})

/**
 * Holds Bootstrap Icons class names for each shop department.
 */
export const DEPARTMENT_MARKS: Readonly<Record<Department, string>> = Object.freeze({
	books: 'bi-book',
	wheels: 'bi-disc',
	supplies: 'bi-folder',
})

/**
 * Holds Bootstrap Icons class names for each notice category.
 */
export const NOTICE_MARKS: Readonly<Record<NoticeCategory, string>> = Object.freeze({
	empty: 'bi-inbox',
	miss: 'bi-search',
	partial: 'bi-funnel',
})

/**
 * Holds signature tone classes for each magazine category.
 */
export const CATEGORY_TONES: Readonly<Record<Category, string>> = Object.freeze({
	coverage: 'tone-coverage',
	specialty: 'tone-specialty',
	management: 'tone-management',
	technology: 'tone-technology',
	personal: 'tone-personal',
	program: 'tone-program',
})

/**
 * Holds month names in calendar order for issued-date labels.
 */
export const MONTHS: readonly string[] = Object.freeze([
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
])
