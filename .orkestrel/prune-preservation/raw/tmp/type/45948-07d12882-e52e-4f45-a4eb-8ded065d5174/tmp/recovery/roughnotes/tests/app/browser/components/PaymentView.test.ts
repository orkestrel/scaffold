import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { requireValue } from '@orkestrel/test'
import { COPY, PaymentView } from '@app/browser'
import { clearSurface, mountView } from '../../../setupBrowser.js'

/** The invoice an accepted screen reads back to the reader. */
const INVOICE = { customer: '1001', number: '4821', amount: '78.00' }

/** The sentence that tells a reader what to enter when the customer number is unknown. */
const HINT = 'If you do not know'

/** The host the live billing page opens on. */
const EXTERNAL_HOST = 'shoppingcart.roughnotes.com'

/**
 * Reads an element's text with every run of whitespace collapsed.
 *
 * @param node - The element to read
 * @returns The collapsed text
 */
function readText(node: Element): string {
	const rendered = node instanceof HTMLElement ? node.innerText : (node.textContent ?? '')
	return rendered.replaceAll(/\s+/gu, ' ').trim()
}

afterEach(() => {
	clearSurface()
})

describe('PaymentView', () => {
	it('states each field hint once, beside the field it governs', () => {
		const { host } = mountView(PaymentView)
		expect(requireValue(host.querySelector('h1')).textContent?.trim()).toBe(COPY.payment)
		expect(readText(host).split(HINT)).toHaveLength(2)
		const help = requireValue(host.querySelector('#payment-customer-help'))
		expect(readText(help)).toContain(HINT)
		expect(
			requireValue(host.querySelector('#payment-customer')).getAttribute('aria-describedby'),
		).toContain('payment-customer-help')
	})

	it('leaves navy to the chrome and commits in the application navy', () => {
		const { host } = mountView(PaymentView)
		expect(host.querySelector('.invite')).toBeNull()
		expect(host.querySelector('[data-bs-theme="dark"]')).toBeNull()
		expect(host.querySelector('.btn-warning')).toBeNull()
		expect(requireValue(host.querySelector('button[type="submit"]')).matches('.btn-primary')).toBe(
			true,
		)
		expect(host.querySelector('.border-top')).toBeNull()
	})

	it('reads the recorded invoice back and sends the reader on to settle it', async () => {
		const { app, host } = mountView(PaymentView)
		expect(app.payment.submit(INVOICE)).toBe(true)
		await nextTick()
		expect(host.querySelector('form')).toBeNull()
		expect(host.querySelector('.alert-success')).toBeNull()
		const status = requireValue(host.querySelector('p[role="status"]'))
		expect(status.textContent?.trim()).toBe(COPY.paymentAccepted)
		expect([...host.querySelectorAll('dt')].map((node) => node.textContent?.trim())).toEqual([
			COPY.customer,
			COPY.invoice,
			COPY.amount,
		])
		const figures = [...host.querySelectorAll('.figures-tabular')].map((node) =>
			node.textContent?.trim(),
		)
		expect(figures).toEqual([INVOICE.customer, INVOICE.number, '$78.00'])
		expect(readText(host)).toContain('It took no card and settled no invoice')
		expect(readText(host)).not.toContain('Nothing was charged')
		const tail = requireValue(host.querySelector('.border-top'))
		const links = [...tail.querySelectorAll('a')]
		expect(links.map((link) => link.textContent?.trim())).toEqual([COPY.billing, COPY.stock])
		const external = requireValue(links[0])
		expect(external.matches('.btn-primary')).toBe(true)
		expect(external.getAttribute('rel')).toBe('noreferrer')
		expect(external.querySelector('.bi-box-arrow-up-right')).not.toBeNull()
		expect(requireValue(links[1]).getAttribute('href')).toBe('#/shop')
		expect(readText(tail)).toContain(EXTERNAL_HOST)
	})
})
