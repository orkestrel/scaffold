import { afterEach, describe, expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { createRecorder, requireValue, waitForCondition } from '@orkestrel/test'
import { clickAccessible, fillAccessible } from '@orkestrel/test/browser'
import { COPY, PaymentForm } from '@app/browser'
import { clearSurface, mountView, openSurface } from '../setup.js'

afterEach(async () => {
	clearSurface()
	await page.viewport(1280, 800)
})

describe('PaymentForm', () => {
	it('tells a person what happens to what they type, before any field', () => {
		const { host } = mountView(PaymentForm)
		const notice = requireValue(
			[...host.querySelectorAll('p')].find((node) =>
				(node.textContent ?? '').includes(COPY.privacy),
			),
		)
		const field = requireValue(host.querySelector('#payment-customer'))
		expect(
			notice.compareDocumentPosition(field) & Node.DOCUMENT_POSITION_FOLLOWING,
		).toBeGreaterThan(0)
		expect(host.textContent).not.toContain('Fixture only')
	})

	it.each([320, 390])('keeps every summary link hittable at %i CSS px', async (width) => {
		await page.viewport(width, 844)
		const { host, app } = await openSurface()
		app.open('/payment')
		await waitForCondition(
			'the request form paints',
			() => host.querySelector('#payment-customer') !== null,
		)
		await clickAccessible('button', COPY.pay)
		const links = host.querySelectorAll('#payment-summary a')
		expect(Array.from(links, (link) => link.getAttribute('href'))).toEqual([
			'#payment-customer',
			'#payment-number',
			'#payment-amount',
		])
		for (const link of links) {
			const box = link.getBoundingClientRect()
			const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)
			expect.soft(hit?.closest('a')).toBe(link)
		}
	})

	it('refuses on the quiet danger pair and commits in the application navy', async () => {
		const { host } = mountView(PaymentForm)
		await clickAccessible('button', COPY.pay)
		await waitForCondition('the payment summary paints', () =>
			(document.body.textContent ?? '').includes(COPY.paymentSummary),
		)
		const summary = requireValue(host.querySelector('#payment-summary'))
		expect(summary.getAttribute('role')).toBe('alert')
		expect(summary.classList.contains('alert-danger')).toBe(false)
		expect(summary.classList.contains('bg-danger-subtle')).toBe(true)
		const submit = requireValue(host.querySelector('button[type="submit"]'))
		expect(submit.classList.contains('btn-primary')).toBe(true)
		expect(submit.classList.contains('btn-warning')).toBe(false)
		expect(submit.hasAttribute('disabled')).toBe(false)
	})

	it('refuses the entries without implying a payment would be recorded', async () => {
		const { host } = mountView(PaymentForm)
		await clickAccessible('button', COPY.pay)
		await waitForCondition('the payment summary paints', () =>
			(document.body.textContent ?? '').includes(COPY.paymentSummary),
		)
		const summary = requireValue(host.querySelector('#payment-summary'))
		expect(summary.textContent).toContain('The payment form refused these entries')
		expect(summary.textContent).not.toContain('could not be recorded')
	})

	it('announces a refusal then accepts a valid amount', async () => {
		const { app, host } = mountView(PaymentForm)
		const accepted = createRecorder()
		app.emitter.on('pay', accepted.handler)
		await clickAccessible('button', COPY.pay)
		await waitForCondition('the payment summary paints', () =>
			(document.body.textContent ?? '').includes(COPY.paymentSummary),
		)
		await fillAccessible(COPY.customer, '1001')
		await fillAccessible(COPY.invoice, '1001')
		await fillAccessible(COPY.amount, '78.00')
		expect.soft(host.querySelector('form')).not.toBeNull()
		expect.soft(app.payment.accepted.value).toBeUndefined()
		expect.soft(accepted.count).toBe(0)
		await userEvent.tab()
		expect(accepted.count).toBe(0)
		expect(host.querySelector('[role="alert"]')).toBeNull()
		await fillAccessible(COPY.amount, '0')
		expect(host.querySelector('#payment-amount')?.getAttribute('aria-invalid')).toBe('true')
		expect(host.querySelector('[role="alert"]')).not.toBeNull()
		await fillAccessible(COPY.amount, '78.00')
		await userEvent.tab()
		expect(host.querySelector('form')).not.toBeNull()
		expect(app.payment.accepted.value).toBeUndefined()
		expect(accepted.count).toBe(0)
		await clickAccessible('button', COPY.pay)
		await waitForCondition('the payment is accepted', () => accepted.count === 1)
		expect(app.payment.accepted.value?.amount).toBe(7800)
		expect(host.querySelector('form')).not.toBeNull()
	})
})
