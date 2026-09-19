import { describe, expect, it } from 'vitest'
import { requireValue } from '@orkestrel/test'
import {
	ARTICLES,
	ASSETS,
	CATEGORIES,
	DEPARTMENTS,
	ERAS,
	MARKETS,
	OFFICE,
	PRODUCTS,
	REPS,
	SKUS,
	VIEWS,
	isArticle,
	isAsset,
	isCategory,
	isChannel,
	isDepartment,
	isEra,
	isInquiry,
	isInvoice,
	isMarket,
	isOffice,
	isProduct,
	isRep,
	isSku,
	isSubscription,
	isView,
} from '@app/core'

describe('isCategory', () => {
	it('accepts declared categories and refuses other values', () => {
		expect(isCategory('coverage')).toBe(true)
		expect(isCategory('other')).toBe(false)
		expect(isCategory(1)).toBe(false)
		expect(CATEGORIES.includes('coverage')).toBe(true)
	})
})

describe('isDepartment', () => {
	it('accepts declared departments and refuses other values', () => {
		expect(isDepartment('books')).toBe(true)
		expect(isDepartment('other')).toBe(false)
		expect(DEPARTMENTS.includes('books')).toBe(true)
	})
})

describe('isChannel', () => {
	it('accepts declared channels and refuses other values', () => {
		expect(isChannel('magazine')).toBe(true)
		expect(isChannel('other')).toBe(false)
	})
})

describe('isView', () => {
	it('accepts every declared view and refuses unknown names', () => {
		for (const view of VIEWS) expect(isView(view)).toBe(true)
		expect(isView('desk')).toBe(false)
		expect(isView(null)).toBe(false)
	})
})

describe('record guards', () => {
	it('accepts fixture records and refuses hostile values', () => {
		const product = requireValue(PRODUCTS[0], 'PRODUCTS fixture is empty')
		const article = requireValue(ARTICLES[0], 'ARTICLES fixture is empty')
		const market = requireValue(MARKETS[0], 'MARKETS fixture is empty')
		const sku = requireValue(SKUS[0], 'SKUS fixture is empty')
		const asset = requireValue(ASSETS[0], 'ASSETS fixture is empty')
		const era = requireValue(ERAS[0], 'ERAS fixture is empty')
		const rep = requireValue(REPS[0], 'REPS fixture is empty')
		expect(isProduct(product)).toBe(true)
		expect(isArticle(article)).toBe(true)
		expect(isMarket(market)).toBe(true)
		expect(isSku(sku)).toBe(true)
		expect(isAsset(asset)).toBe(true)
		expect(isEra(era)).toBe(true)
		expect(isRep(rep)).toBe(true)
		expect(isOffice(OFFICE)).toBe(true)
		expect(isProduct({ id: 'x' })).toBe(false)
		expect(isProduct({ id: '', name: 'X', summary: '', audience: '', inclusions: [] })).toBe(false)
		expect(isArticle(null)).toBe(false)
		expect(isMarket(1)).toBe(false)
		expect(isSku({ id: 'x' })).toBe(false)
		expect(
			isSku({ id: 'x', name: 'X', summary: '', department: 'books', code: '1', price: 0 }),
		).toBe(false)
		expect(isAsset(null)).toBe(false)
		expect(isEra(1)).toBe(false)
		expect(isRep({ name: 'Ada' })).toBe(false)
		expect(isOffice({ city: 'Carmel' })).toBe(false)
		expect(isSubscription({ name: 'Ada', email: 'ada@agency.com' })).toBe(true)
		expect(isSubscription({ name: '', email: 'ada@agency.com' })).toBe(false)
		expect(
			isInquiry({
				name: 'Ada',
				company: 'Agency',
				email: 'ada@agency.com',
				phone: '800-428-4384',
			}),
		).toBe(true)
		expect(
			isInquiry({
				name: '',
				company: 'Agency',
				email: 'ada@agency.com',
				phone: '800-428-4384',
			}),
		).toBe(false)
		expect(
			isInquiry({ name: 'Ada', company: 'Agency', email: 'ada@agency.com', phone: '1', title: 1 }),
		).toBe(false)
		expect(isInvoice({ customer: '1001', number: '1001', amount: 7800 })).toBe(true)
		expect(isInvoice({ customer: '1001', number: '1001', amount: 0 })).toBe(false)
		expect(isInvoice({ customer: '1001', number: '1001', amount: Number.NaN })).toBe(false)
	})
})
