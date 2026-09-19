import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { requireValue } from '@orkestrel/test'
import { COPY, Frame } from '@app/browser'
import { clearSurface, mountView } from '../../../setupBrowser.js'

afterEach(() => {
	clearSurface()
})

describe('Frame', () => {
	it('names the screen with one heading, bounds its introduction, and spaces its sections', () => {
		const { host } = mountView(
			defineComponent(
				() => () =>
					h(
						Frame,
						{ title: 'Publication desks', lead: 'Where each desk reports from.' },
						{
							default: () => [h('section', 'First desk'), h('section', 'Second desk')],
							next: () => h('a', { href: '#/contact' }, COPY.write),
						},
					),
			),
		)
		const headings = [...host.querySelectorAll('h1, h2, h3, h4, h5, h6')]
		expect(headings.map((node) => node.tagName)).toEqual(['H1'])
		expect(requireValue(headings[0]).textContent).toBe('Publication desks')
		const lead = requireValue(host.querySelector('.lead'))
		expect(lead.textContent).toBe('Where each desk reports from.')
		expect(lead.matches('.measure')).toBe(true)
		const sections = [...host.querySelectorAll('section')]
		expect(sections.map((node) => node.textContent)).toEqual(['First desk', 'Second desk'])
		const rhythm = requireValue(requireValue(sections[0]).parentElement)
		expect(Number.parseFloat(getComputedStyle(rhythm).rowGap)).toBeGreaterThan(0)
		expect(requireValue(host.querySelector('a')).getAttribute('href')).toBe('#/contact')
	})

	it('renders the trail it is given and invents no step', () => {
		const { host } = mountView(
			defineComponent(
				() => () =>
					h(Frame, {
						title: 'RoughNotes-Pro',
						trail: [{ label: 'Products', path: '/products' }, { label: 'RoughNotes-Pro' }],
					}),
			),
		)
		const steps = [...host.querySelectorAll('.breadcrumb-item')]
		expect(steps.map((node) => node.textContent?.trim())).toEqual(['Products', 'RoughNotes-Pro'])
		expect(requireValue(steps[0]).querySelector('a')?.getAttribute('href')).toBe('#/products')
		expect(requireValue(steps[1]).querySelector('a')).toBeNull()
		expect(requireValue(steps[1]).getAttribute('aria-current')).toBe('page')
		expect(requireValue(host.querySelector('nav')).getAttribute('aria-label')).toBe(COPY.trail)
	})

	it('refuses a hero, an eyebrow, a minimum height, and a trail it was not given', () => {
		const { host } = mountView(defineComponent(() => () => h(Frame, { title: 'Media kits' })))
		expect(requireValue(host.firstElementChild).getAttribute('class')).toBe('container-xl py-5')
		expect(host.querySelector('nav')).toBeNull()
		expect(host.querySelector('.lead')).toBeNull()
		expect(host.querySelector('.hero')).toBeNull()
		expect(host.querySelector('.accent')).toBeNull()
		expect(host.textContent).toBe('Media kits')
	})
})
