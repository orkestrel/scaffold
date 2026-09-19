import type {
	Inquiry,
	InquiryField,
	InquiryResult,
	Invoice,
	InvoiceField,
	InvoiceResult,
	SubscriptionField,
	SubscriptionResult,
} from './types.js'
import { isRecord, isString, stringToFormat } from '@orkestrel/contract'

/**
 * Parses a dollar amount into integer USD cents.
 *
 * @remarks
 * Accepts an optional leading `$`, whole dollars, or dollars with one or two
 * fractional digits. Zero, negative, and other strings fail.
 *
 * @param input - The raw amount string
 * @returns Integer cents, or `undefined` when the string is not a positive amount
 *
 * @example
 * ```ts
 * parseAmount('78.00') // 7800
 * parseAmount('$74.75') // 7475
 * parseAmount('0') // undefined
 * ```
 */
export function parseAmount(input: string): number | undefined {
	const trimmed = input.trim()
	if (trimmed.length === 0) return undefined
	const raw = trimmed.startsWith('$') ? trimmed.slice(1).trim() : trimmed
	if (!/^\d+(\.\d{1,2})?$/.test(raw)) return undefined
	const cents = Math.round(Number(raw) * 100)
	if (!Number.isInteger(cents) || cents < 1) return undefined
	return cents
}

/**
 * Returns `text` trimmed, or `undefined` when the result is empty.
 *
 * @param value - The unknown field value
 * @returns The trimmed string, or `undefined`
 */
export function parseOptional(value: unknown): string | undefined {
	if (!isString(value)) return undefined
	const trimmed = value.trim()
	if (trimmed.length === 0) return undefined
	return trimmed
}

/**
 * Parses a subscription payload into a {@link Subscription} or the fields that failed.
 *
 * @remarks
 * `name` must be a non-empty trimmed string. `email` must classify as the
 * contract `email` format after trimming. Submit stays enabled in the form;
 * this parser never throws.
 *
 * @param input - The unknown form payload
 * @returns The subscription, or the failed field names
 *
 * @example
 * ```ts
 * parseSubscription({ name: 'Ada Lovelace', email: 'ada@agency.com' })
 * parseSubscription({ name: '  ', email: 'not-an-email' })
 * ```
 */
export function parseSubscription(input: unknown): SubscriptionResult {
	if (!isRecord(input)) {
		return { success: false, error: Object.freeze(['name', 'email']) }
	}
	const issues: SubscriptionField[] = []
	const rawName = input.name
	const rawEmail = input.email
	const name = isString(rawName) ? rawName.trim() : ''
	const email = isString(rawEmail) ? rawEmail.trim() : ''
	if (name.length === 0) issues.push('name')
	if (stringToFormat(email) !== 'email') issues.push('email')
	if (issues.length > 0) return { success: false, error: Object.freeze(issues) }
	return { success: true, value: Object.freeze({ name, email }) }
}

/**
 * Parses a contact payload into an {@link Inquiry} or the fields that failed.
 *
 * @remarks
 * `name`, `company`, `email`, and `phone` are required. `email` must classify
 * as the contract `email` format. `phone` must contain a digit after trimming.
 * `title` and `message` may be omitted. Submit stays enabled; this parser
 * never throws.
 *
 * @param input - The unknown form payload
 * @returns The inquiry, or the failed field names
 *
 * @example
 * ```ts
 * parseInquiry({
 * 	name: 'Ada Lovelace',
 * 	company: 'Agency',
 * 	email: 'ada@agency.com',
 * 	phone: '800-428-4384',
 * })
 * ```
 */
export function parseInquiry(input: unknown): InquiryResult {
	if (!isRecord(input)) {
		return { success: false, error: Object.freeze(['name', 'company', 'email', 'phone']) }
	}
	const issues: InquiryField[] = []
	const name = isString(input.name) ? input.name.trim() : ''
	const company = isString(input.company) ? input.company.trim() : ''
	const email = isString(input.email) ? input.email.trim() : ''
	const phone = isString(input.phone) ? input.phone.trim() : ''
	if (name.length === 0) issues.push('name')
	if (company.length === 0) issues.push('company')
	if (stringToFormat(email) !== 'email') issues.push('email')
	if (phone.length === 0 || !/\d/.test(phone)) issues.push('phone')
	if (issues.length > 0) return { success: false, error: Object.freeze(issues) }
	const inquiry: Inquiry = Object.freeze({
		name,
		company,
		email,
		phone,
		title: parseOptional(input.title),
		message: parseOptional(input.message),
	})
	return { success: true, value: inquiry }
}

/**
 * Parses an invoice payload into an {@link Invoice} or the fields that failed.
 *
 * @remarks
 * `customer` and `number` must be non-empty trimmed strings. `amount` must
 * parse as a positive dollar amount. Submit stays enabled; this parser never
 * throws.
 *
 * @param input - The unknown form payload
 * @returns The invoice, or the failed field names
 *
 * @example
 * ```ts
 * parseInvoice({ customer: '1001', number: '1001', amount: '78.00' })
 * parseInvoice({ customer: '', number: '', amount: '0' })
 * ```
 */
export function parseInvoice(input: unknown): InvoiceResult {
	if (!isRecord(input)) {
		return { success: false, error: Object.freeze(['customer', 'number', 'amount']) }
	}
	const issues: InvoiceField[] = []
	const customer = isString(input.customer) ? input.customer.trim() : ''
	const number = isString(input.number) ? input.number.trim() : ''
	const rawAmount = isString(input.amount) ? input.amount : ''
	const amount = parseAmount(rawAmount)
	if (customer.length === 0) issues.push('customer')
	if (number.length === 0) issues.push('number')
	if (amount === undefined) issues.push('amount')
	if (issues.length > 0) return { success: false, error: Object.freeze(issues) }
	if (amount === undefined) return { success: false, error: Object.freeze(['amount']) }
	const invoice: Invoice = Object.freeze({ customer, number, amount })
	return { success: true, value: invoice }
}
