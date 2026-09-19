import { afterEach, describe, expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { createRecorder, requireValue, waitForCondition } from '@orkestrel/test'
import { clickAccessible, fillAccessible, readHit } from '@orkestrel/test/browser'
import { COPY, SubscribeForm } from '@app/browser'
import { clearSurface, mountView, openSurface } from '../../../setupBrowser.js'

afterEach(async () => {
	clearSurface()
	await page.viewport(1280, 800)
})

describe('SubscribeForm', () => {
	it('tells a person what happens to what they type, before any field', () => {
		const { host } = mountView(SubscribeForm)
		const notice = requireValue(
			[...host.querySelectorAll('p')].find((node) =>
				(node.textContent ?? '').includes(COPY.privacy),
			),
		)
		const field = requireValue(host.querySelector('#subscribe-name'))
		expect(
			notice.compareDocumentPosition(field) & Node.DOCUMENT_POSITION_FOLLOWING,
		).toBeGreaterThan(0)
		expect(host.textContent).not.toContain('Fixture only')
	})

	it.each([320, 390])('keeps every summary link hittable at %i CSS px', async (width) => {
		await page.viewport(width, 844)
		const { host, app } = await openSurface()
		app.open('/subscribe')
		await waitForCondition(
			'the request form paints',
			() => host.querySelector('#subscribe-name') !== null,
		)
		await clickAccessible('button', COPY.subscribe)
		const links = host.querySelectorAll('#subscribe-summary a')
		expect(Array.from(links, (link) => link.getAttribute('href'))).toEqual([
			'#subscribe-name',
			'#subscribe-email',
		])
		for (const link of links) {
			const hit = readHit(link)
			expect.soft(hit?.closest('a')).toBe(link)
		}
	})

	it('refuses on the quiet danger pair and commits in the application navy', async () => {
		const { host } = mountView(SubscribeForm)
		await clickAccessible('button', COPY.subscribe)
		await waitForCondition('the subscription summary paints', () =>
			(document.body.textContent ?? '').includes(COPY.summary),
		)
		const summary = requireValue(host.querySelector('#subscribe-summary'))
		expect(summary.getAttribute('role')).toBe('alert')
		expect(summary.matches('.alert-danger')).toBe(false)
		expect(summary.matches('.bg-danger-subtle')).toBe(true)
		const submit = requireValue(host.querySelector('button[type="submit"]'))
		expect(submit.matches('.btn-primary')).toBe(true)
		expect(submit.matches('.btn-warning')).toBe(false)
		expect(submit.hasAttribute('disabled')).toBe(false)
	})

	it('refuses the entries without implying a subscription would be sent', async () => {
		const { host } = mountView(SubscribeForm)
		await clickAccessible('button', COPY.subscribe)
		await waitForCondition('the subscription summary paints', () =>
			(document.body.textContent ?? '').includes(COPY.summary),
		)
		const summary = requireValue(host.querySelector('#subscribe-summary'))
		expect(summary.textContent).toContain('The subscription form refused these entries')
		expect(summary.textContent).not.toContain('could not be sent')
	})

	it('announces a refusal then accepts a valid request', async () => {
		const { app, host } = mountView(SubscribeForm)
		const accepted = createRecorder()
		app.emitter.on('subscribe', accepted.handler)
		await clickAccessible('button', COPY.subscribe)
		await waitForCondition('the subscription summary paints', () =>
			(document.body.textContent ?? '').includes(COPY.summary),
		)
		await fillAccessible(COPY.name, 'Ada Lovelace')
		await fillAccessible(COPY.mail, 'ada@agency.com')
		expect.soft(host.querySelector('form')).not.toBeNull()
		expect.soft(app.subscription.accepted.value).toBeUndefined()
		expect.soft(accepted.count).toBe(0)
		await userEvent.tab()
		expect(accepted.count).toBe(0)
		expect(host.querySelector('[role="alert"]')).toBeNull()
		await fillAccessible(COPY.mail, 'invalid')
		expect(host.querySelector('#subscribe-email')?.getAttribute('aria-invalid')).toBe('true')
		expect(host.querySelector('[role="alert"]')).not.toBeNull()
		await fillAccessible(COPY.mail, 'ada@agency.com')
		await userEvent.tab()
		expect(host.querySelector('form')).not.toBeNull()
		expect(app.subscription.accepted.value).toBeUndefined()
		expect(accepted.count).toBe(0)
		await clickAccessible('button', COPY.subscribe)
		await waitForCondition('the subscription is accepted', () => accepted.count === 1)
		expect(app.subscription.accepted.value).toEqual({
			name: 'Ada Lovelace',
			email: 'ada@agency.com',
		})
		expect(host.querySelector('form')).not.toBeNull()
	})
})
