import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { requireValue } from '@orkestrel/test'
import { Entry } from '@app/browser'
import { clearSurface, mountView } from '../setup.js'

afterEach(() => {
	clearSurface()
})

describe('Entry', () => {
	it('carries a title, its supporting facts, and one real destination', () => {
		const { host } = mountView(
			defineComponent(
				() => () =>
					h(Entry, {
						title: 'Coverages Applicable',
						href: '#/shop/coverages-applicable',
						summary: 'The coverage reference every producer keeps open.',
						facts: [
							{ label: 'Price', value: '$189.00' },
							{ label: 'Code', value: 'RN-1042' },
						],
					}),
			),
		)
		const links = [...host.querySelectorAll('a')]
		expect(links).toHaveLength(1)
		const link = requireValue(links[0])
		expect(link.getAttribute('href')).toBe('#/shop/coverages-applicable')
		expect(link.textContent).toBe('Coverages Applicable')
		expect(requireValue(host.querySelector('h3')).contains(link)).toBe(true)
		expect(link.classList.contains('stretched-link')).toBe(true)
		expect(host.textContent).toContain('The coverage reference every producer keeps open.')
		expect([...host.querySelectorAll('dt')].map((node) => node.textContent)).toEqual([
			'Price',
			'Code',
		])
		const values = [...host.querySelectorAll('dd')]
		expect(values.map((node) => node.textContent)).toEqual(['$189.00', 'RN-1042'])
		for (const value of values) {
			expect(getComputedStyle(value).fontVariantNumeric).toBe('tabular-nums')
		}
	})

	it('renders no field it was not given and nests nothing inside its stretched link', () => {
		const { host } = mountView(
			defineComponent(() => () => h(Entry, { title: 'Rough Notes magazine', href: '#/magazine' })),
		)
		expect(host.querySelector('dl')).toBeNull()
		expect(host.querySelector('p')).toBeNull()
		expect(host.querySelectorAll('a, button, input, select, textarea')).toHaveLength(1)
		expect(requireValue(host.querySelector('.stretched-link')).children).toHaveLength(0)
	})

	it('states the standing of a ranked entry above its title and adds no control', () => {
		const { host } = mountView(
			defineComponent(
				() => () =>
					h(Entry, {
						title: 'RoughNotes-Pro',
						href: '#/products/roughnotes-pro',
						rank: 'Most requested',
					}),
			),
		)
		const body = requireValue(host.querySelector('.card-body'))
		expect([...body.children].map((node) => node.tagName)).toEqual(['P', 'H3'])
		const marker = requireValue(host.querySelector('p'))
		expect(marker.textContent?.trim()).toBe('Most requested')
		expect(marker.classList.contains('accent')).toBe(true)
		expect(host.querySelectorAll('a, button, input, select, textarea')).toHaveLength(1)
	})

	it('takes the equal height comparable items in a grid need', () => {
		const { host } = mountView(
			defineComponent(
				() => () => h(Entry, { title: 'PF&M Online', href: '#/products/pfm-online' }),
			),
		)
		expect(requireValue(host.querySelector('article')).classList.contains('h-100')).toBe(true)
	})
})
