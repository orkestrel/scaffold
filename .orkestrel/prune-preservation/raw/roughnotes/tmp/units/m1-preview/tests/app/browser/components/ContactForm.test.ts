import { afterEach, describe, expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { createRecorder, requireValue, waitForCondition } from '@orkestrel/test'
import { clickAccessible, fillAccessible } from '@orkestrel/test/browser'
import { COPY, ContactForm } from '@app/browser'
import { clearSurface, mountView, openSurface } from '../setup.js'

afterEach(async () => {
	clearSurface()
	await page.viewport(1280, 800)
})

describe('ContactForm', () => {
	it('tells a person what happens to what they type, before any field', () => {
		const { host } = mountView(ContactForm)
		const notice = requireValue(
			[...host.querySelectorAll('p')].find((node) =>
				(node.textContent ?? '').includes(COPY.privacy),
			),
		)
		const field = requireValue(host.querySelector('#inquiry-name'))
		expect(
			notice.compareDocumentPosition(field) & Node.DOCUMENT_POSITION_FOLLOWING,
		).toBeGreaterThan(0)
		expect(host.textContent).not.toContain('Fixture only')
	})

	it.each([320, 390])('keeps every summary link hittable at %i CSS px', async (width) => {
		await page.viewport(width, 844)
		const { host, app } = await openSurface()
		app.open('/contact')
		await waitForCondition(
			'the request form paints',
			() => host.querySelector('#inquiry-name') !== null,
		)
		await clickAccessible('button', COPY.send)
		const links = host.querySelectorAll('#inquiry-summary a')
		expect(Array.from(links, (link) => link.getAttribute('href'))).toEqual([
			'#inquiry-name',
			'#inquiry-company',
			'#inquiry-email',
			'#inquiry-phone',
		])
		for (const link of links) {
			const box = link.getBoundingClientRect()
			const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2)
			expect.soft(hit?.closest('a')).toBe(link)
		}
	})

	it('refuses on the quiet danger pair and commits in the application navy', async () => {
		const { host } = mountView(ContactForm)
		await clickAccessible('button', COPY.send)
		await waitForCondition('the inquiry summary paints', () =>
			(document.body.textContent ?? '').includes(COPY.inquirySummary),
		)
		const summary = requireValue(host.querySelector('#inquiry-summary'))
		expect(summary.getAttribute('role')).toBe('alert')
		expect(summary.classList.contains('alert-danger')).toBe(false)
		expect(summary.classList.contains('bg-danger-subtle')).toBe(true)
		const submit = requireValue(host.querySelector('button[type="submit"]'))
		expect(submit.classList.contains('btn-primary')).toBe(true)
		expect(submit.classList.contains('btn-warning')).toBe(false)
		expect(submit.hasAttribute('disabled')).toBe(false)
	})

	it('refuses the entries without implying an inquiry would be sent', async () => {
		const { host } = mountView(ContactForm)
		await clickAccessible('button', COPY.send)
		await waitForCondition('the inquiry summary paints', () =>
			(document.body.textContent ?? '').includes(COPY.inquirySummary),
		)
		const summary = requireValue(host.querySelector('#inquiry-summary'))
		expect(summary.textContent).toContain('The inquiry form refused these entries')
		expect(summary.textContent).not.toContain('could not be sent')
	})

	it('announces a refusal then accepts a valid inquiry', async () => {
		const { app, host } = mountView(ContactForm)
		const accepted = createRecorder()
		app.emitter.on('inquire', accepted.handler)
		await clickAccessible('button', COPY.send)
		await waitForCondition('the inquiry summary paints', () =>
			(document.body.textContent ?? '').includes(COPY.inquirySummary),
		)
		await fillAccessible(COPY.name, 'Ada Lovelace')
		await fillAccessible(COPY.company, 'Agency')
		await fillAccessible(COPY.mail, 'ada@agency.com')
		await fillAccessible(COPY.phoneLabel, '800-428-4384')
		expect.soft(host.querySelector('form')).not.toBeNull()
		expect.soft(app.inquiry.accepted.value).toBeUndefined()
		expect.soft(accepted.count).toBe(0)
		await userEvent.tab()
		expect(accepted.count).toBe(0)
		expect(host.querySelector('[role="alert"]')).toBeNull()
		await fillAccessible(COPY.phoneLabel, 'letters')
		expect(host.querySelector('#inquiry-phone')?.getAttribute('aria-invalid')).toBe('true')
		expect(host.querySelector('[role="alert"]')).not.toBeNull()
		await fillAccessible(COPY.phoneLabel, '800-428-4384')
		await userEvent.tab()
		expect(host.querySelector('form')).not.toBeNull()
		expect(app.inquiry.accepted.value).toBeUndefined()
		expect(accepted.count).toBe(0)
		await clickAccessible('button', COPY.send)
		await waitForCondition('the inquiry is accepted', () => accepted.count === 1)
		expect(app.inquiry.accepted.value?.company).toBe('Agency')
		expect(host.querySelector('form')).not.toBeNull()
	})
})
