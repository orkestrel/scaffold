import { describe, expect, it } from 'vitest'
import {
	parseAmount,
	parseInquiry,
	parseInvoice,
	parseOptional,
	parseSubscription,
} from '@app/core'

describe('parseAmount', () => {
	it('accepts dollars with an optional leading dollar sign', () => {
		expect(parseAmount('78.00')).toBe(7800)
		expect(parseAmount('$74.75')).toBe(7475)
		expect(parseAmount('  200  ')).toBe(20000)
		expect(parseAmount('$ 78.00')).toBe(7800)
		expect(parseAmount('78.0')).toBe(7800)
		expect(parseAmount('0')).toBeUndefined()
		expect(parseAmount('-1')).toBeUndefined()
		expect(parseAmount('78.001')).toBeUndefined()
		expect(parseAmount('78.')).toBeUndefined()
		expect(parseAmount('')).toBeUndefined()
	})
})

describe('parseOptional', () => {
	it('returns a trimmed string or undefined', () => {
		expect(parseOptional('  Title  ')).toBe('Title')
		expect(parseOptional('   ')).toBeUndefined()
		expect(parseOptional(1)).toBeUndefined()
		expect(parseOptional(undefined)).toBeUndefined()
	})
})

describe('parseSubscription', () => {
	it('accepts a trimmed name and email', () => {
		const result = parseSubscription({ name: '  Ada Lovelace  ', email: ' ada@agency.com ' })
		expect(result).toEqual({
			success: true,
			value: { name: 'Ada Lovelace', email: 'ada@agency.com' },
		})
	})

	it('reports the fields that failed', () => {
		expect(parseSubscription({ name: '  ', email: 'not-an-email' })).toEqual({
			success: false,
			error: ['name', 'email'],
		})
		expect(parseSubscription({ name: 'Ada', email: 'not-an-email' })).toEqual({
			success: false,
			error: ['email'],
		})
		expect(parseSubscription({ name: '', email: 'ada@agency.com' })).toEqual({
			success: false,
			error: ['name'],
		})
		expect(parseSubscription({ name: 1, email: true })).toEqual({
			success: false,
			error: ['name', 'email'],
		})
		expect(parseSubscription(null)).toEqual({
			success: false,
			error: ['name', 'email'],
		})
	})
})

describe('parseInquiry', () => {
	it('accepts a trimmed inquiry and omits blank optional fields', () => {
		const result = parseInquiry({
			name: '  Ada Lovelace  ',
			title: '  ',
			company: ' Agency ',
			email: ' ada@agency.com ',
			phone: '800-428-4384',
			message: ' Need a desk demo ',
		})
		expect(result).toEqual({
			success: true,
			value: {
				name: 'Ada Lovelace',
				company: 'Agency',
				email: 'ada@agency.com',
				phone: '800-428-4384',
				title: undefined,
				message: 'Need a desk demo',
			},
		})
	})

	it('reports the fields that failed', () => {
		expect(parseInquiry({ name: '', company: '', email: 'no', phone: 'abc' })).toEqual({
			success: false,
			error: ['name', 'company', 'email', 'phone'],
		})
		expect(
			parseInquiry({ name: 'Ada', company: 'Agency', email: 'ada@agency.com', phone: '' }),
		).toEqual({
			success: false,
			error: ['phone'],
		})
		expect(parseInquiry(null)).toEqual({
			success: false,
			error: ['name', 'company', 'email', 'phone'],
		})
	})
})

describe('parseInvoice', () => {
	it('accepts trimmed customer and number with a dollar amount', () => {
		const result = parseInvoice({ customer: ' 1001 ', number: ' 9002 ', amount: '$78.00' })
		expect(result).toEqual({
			success: true,
			value: { customer: '1001', number: '9002', amount: 7800 },
		})
	})

	it('reports the fields that failed', () => {
		expect(parseInvoice({ customer: '', number: '', amount: '0' })).toEqual({
			success: false,
			error: ['customer', 'number', 'amount'],
		})
		expect(parseInvoice({ customer: '1001', number: '1001', amount: 7800 })).toEqual({
			success: false,
			error: ['amount'],
		})
		expect(parseInvoice(null)).toEqual({
			success: false,
			error: ['customer', 'number', 'amount'],
		})
	})
})
