import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { requireValue } from '@orkestrel/test'
import { COPY, SubscribeView } from '@app/browser'
import { clearSurface, mountView } from '../setup.js'

/** The subscription an accepted screen reads back to the reader. */
const SUBSCRIBER = { name: 'Ada Lovelace', email: 'ada@agency.com' }

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

describe('SubscribeView', () => {
	it('paints the offer and the request while nothing is accepted', () => {
		const { host } = mountView(SubscribeView)
		expect(requireValue(host.querySelector('h1')).textContent?.trim()).toBe('Subscribe')
		expect(host.textContent).toContain('Free print and digital delivery')
		expect(host.querySelector('#subscribe-name')).not.toBeNull()
		expect(host.textContent).not.toContain(COPY.accepted)
	})

	it('commits in the application navy rather than in gold', () => {
		const { host } = mountView(SubscribeView)
		const submit = requireValue(host.querySelector('button[type="submit"]'))
		expect(submit.classList.contains('btn-primary')).toBe(true)
		expect(host.querySelector('.btn-warning')).toBeNull()
	})

	it('restates the accepted subscription and carries a real continuation', async () => {
		const { app, host } = mountView(SubscribeView)
		expect(app.subscription.submit(SUBSCRIBER)).toBe(true)
		await nextTick()
		expect(host.querySelector('form')).toBeNull()
		expect(host.querySelector('.alert-success')).toBeNull()
		const status = requireValue(host.querySelector('p[role="status"]'))
		expect(status.textContent?.trim()).toBe(COPY.accepted)
		const text = readText(host)
		expect(text).toContain(SUBSCRIBER.name)
		expect(text).toContain(SUBSCRIBER.email)
		expect([...host.querySelectorAll('h2')].map((node) => node.textContent?.trim())).toContain(
			'What a subscription carries',
		)
		expect(text).toContain('no print or digital issue follows')
		expect(text).not.toContain('delivery is recorded')
		const links = [...host.querySelectorAll('a')]
		expect(links.map((link) => link.textContent?.trim())).toEqual([COPY.magazine, COPY.explore])
		expect(requireValue(links[0]).getAttribute('href')).toBe('#/magazine')
		expect(requireValue(links[0]).classList.contains('btn-primary')).toBe(true)
		expect(requireValue(links[1]).getAttribute('href')).toBe('#/products')
		expect(requireValue(links[1]).classList.contains('btn-outline-secondary')).toBe(true)
	})
})
