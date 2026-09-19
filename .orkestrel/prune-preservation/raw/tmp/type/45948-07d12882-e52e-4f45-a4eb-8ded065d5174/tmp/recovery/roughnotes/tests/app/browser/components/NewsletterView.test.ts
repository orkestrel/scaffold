import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { requireValue } from '@orkestrel/test'
import { COPY, NewsletterView, SubscribeView } from '@app/browser'
import { clearSurface, mountView } from '../../../setupBrowser.js'

/** The subscription an accepted screen reads back to the reader. */
const SUBSCRIBER = { name: 'Grace Hopper', email: 'grace@agency.com' }

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

describe('NewsletterView', () => {
	it('composes its own screen rather than repeating the subscribe island', () => {
		const { host } = mountView(NewsletterView)
		expect(requireValue(host.querySelector('h1')).textContent?.trim()).toBe(
			'Rough Notes newsletters',
		)
		expect(host.textContent).toContain('It is about you, the customer')
		expect(host.querySelector('.invite')).toBeNull()
		expect(host.querySelector('[data-bs-theme="dark"]')).toBeNull()
		const benefits = [...host.querySelectorAll('#newsletter-carries ~ ul > li')]
		expect(benefits).toHaveLength(4)
		expect(readText(requireValue(benefits[0]))).toContain('Identify coverage gaps')
	})

	it('shares no region with subscribe beyond the request itself', () => {
		const newsletter = mountView(NewsletterView)
		const carries = [...newsletter.host.querySelectorAll('h2')].map((node) =>
			node.textContent?.trim(),
		)
		expect(newsletter.host.querySelector('.invite')).toBeNull()
		clearSurface()
		const subscribe = mountView(SubscribeView)
		const offers = [...subscribe.host.querySelectorAll('h2')].map((node) =>
			node.textContent?.trim(),
		)
		expect(subscribe.host.querySelector('.invite')).not.toBeNull()
		expect(carries.filter((name) => offers.includes(name))).toEqual([])
	})

	it('ends in the request while nothing is accepted', () => {
		const { host } = mountView(NewsletterView)
		expect(host.querySelector('#subscribe-name')).not.toBeNull()
		expect(host.querySelector('.border-top')).toBeNull()
		expect(host.querySelector('.btn-warning')).toBeNull()
	})

	it('restates the accepted subscription in its own voice and continues', async () => {
		const { app, host } = mountView(NewsletterView)
		expect(app.subscription.submit(SUBSCRIBER)).toBe(true)
		await nextTick()
		expect(host.querySelector('form')).toBeNull()
		expect(host.querySelector('.alert-success')).toBeNull()
		const status = requireValue(host.querySelector('p[role="status"]'))
		expect(status.textContent?.trim()).toBe(COPY.accepted)
		const text = readText(host)
		expect(text).toContain(SUBSCRIBER.name)
		expect(text).toContain(SUBSCRIBER.email)
		const tail = requireValue(host.querySelector('.border-top'))
		const links = [...tail.querySelectorAll('a')]
		expect(links.map((link) => link.textContent?.trim())).toEqual([
			COPY.magazine,
			COPY.publications,
		])
		expect(requireValue(links[0]).getAttribute('href')).toBe('#/magazine')
		expect(requireValue(links[1]).getAttribute('href')).toBe('#/publications')
	})
})
