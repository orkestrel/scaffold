import { afterEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { nextTick } from 'vue'
import { requireValue } from '@orkestrel/test'
import { COPY, ContactView } from '@app/browser'
import { clearSurface, mountView } from '../setup.js'

/** An inquiry whose optional title and message were left blank. */
const BARE = {
	name: 'Ada Lovelace',
	company: 'Lovelace Agency',
	email: 'ada@agency.com',
	phone: '800-428-4384',
}

/** The same inquiry with every optional field filled in. */
const FULL = { ...BARE, title: 'Principal', message: 'Send the marketplace rate card.' }

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

/**
 * Reads the labels of a definition list inside `host`.
 *
 * @param host - The mounted screen
 * @returns Every definition term, in document order
 */
function readLabels(host: HTMLElement): readonly string[] {
	return [...host.querySelectorAll('dt')].map((node) => node.textContent?.trim() ?? '')
}

afterEach(async () => {
	clearSurface()
	await page.viewport(1280, 800)
})

describe('ContactView', () => {
	it('leaves the office panel at its own height on a quiet surface', async () => {
		await page.viewport(1280, 800)
		const { host } = mountView(ContactView)
		const office = requireValue(host.querySelector('section[aria-labelledby="contact-office"]'))
		expect(office.className).not.toContain('h-100')
		expect(office.closest('[data-bs-theme="dark"]')).toBeNull()
		const column = requireValue(requireValue(host.querySelector('form')).closest('div.col-12'))
		expect(office.getBoundingClientRect().height).toBeLessThan(
			column.getBoundingClientRect().height,
		)
	})

	it('puts the office before the form so a phone number costs no scrolling', () => {
		const { host } = mountView(ContactView)
		const office = requireValue(host.querySelector('section[aria-labelledby="contact-office"]'))
		const form = requireValue(host.querySelector('form'))
		expect(office.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeGreaterThan(
			0,
		)
		expect(host.textContent).toContain(COPY.phone)
		expect(host.querySelector('.btn-warning')).toBeNull()
		expect(host.querySelector('.border-top')).toBeNull()
	})

	it('restates an accepted inquiry without implying what was never entered', async () => {
		const { app, host } = mountView(ContactView)
		expect(app.inquiry.submit(BARE)).toBe(true)
		await nextTick()
		expect(host.querySelector('form')).toBeNull()
		expect(host.querySelector('.alert-success')).toBeNull()
		const status = requireValue(host.querySelector('p[role="status"]'))
		expect(status.textContent?.trim()).toBe(COPY.inquiryAccepted)
		expect(readLabels(host)).toEqual([COPY.name, COPY.company, COPY.mail, COPY.phoneLabel])
		const text = readText(host)
		expect(text).toContain(BARE.company)
		expect(text).not.toContain(COPY.message)
		expect(text).toContain('Nothing reached the Indianapolis office')
		expect(text).not.toContain('answers on the number')
		const gap = requireValue(host.querySelector('div[role="status"]'))
		expect(readText(gap)).toContain('You left out a job title and a message')
		expect(requireValue(gap.querySelector('a')).getAttribute('href')).toBe(`tel:${COPY.phone}`)
	})

	it('claims no gap on an inquiry that filled every field', async () => {
		const { app, host } = mountView(ContactView)
		expect(app.inquiry.submit(FULL)).toBe(true)
		await nextTick()
		expect(readLabels(host)).toEqual([
			COPY.name,
			COPY.company,
			COPY.mail,
			COPY.phoneLabel,
			COPY.title,
			COPY.message,
		])
		expect(host.querySelector('div[role="status"]')).toBeNull()
		expect(readText(host)).toContain(FULL.message)
	})

	it('ends the accepted screen in the desks a reader can actually open', async () => {
		const { app, host } = mountView(ContactView)
		expect(app.inquiry.submit(BARE)).toBe(true)
		await nextTick()
		const tail = requireValue(host.querySelector('.border-top'))
		const links = [...tail.querySelectorAll('a')]
		expect(links.map((link) => link.textContent?.trim())).toEqual([COPY.explore, COPY.magazine])
		expect(requireValue(links[0]).getAttribute('href')).toBe('#/products')
		expect(requireValue(links[0]).classList.contains('btn-primary')).toBe(true)
		expect(requireValue(links[1]).getAttribute('href')).toBe('#/magazine')
	})
})
