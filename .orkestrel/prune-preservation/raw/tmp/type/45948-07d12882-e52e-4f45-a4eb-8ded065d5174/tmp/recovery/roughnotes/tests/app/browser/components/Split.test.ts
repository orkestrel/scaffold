import { afterEach, describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { defineComponent, h } from 'vue'
import { requireValue } from '@orkestrel/test'
import { readClasses } from '@orkestrel/test/browser'
import { Split } from '@app/browser'
import { clearSurface, mountView } from '../../../setupBrowser.js'

const REGIONS = {
	default: () => h('p', 'Primary region'),
	support: () => h('p', 'Supporting region'),
}

afterEach(() => {
	clearSurface()
})

describe('Split', () => {
	it('sets the supporting region beside the primary one from 992 px', async () => {
		await page.viewport(1280, 800)
		const { host } = mountView(defineComponent(() => () => h(Split, null, REGIONS)))
		const row = requireValue(host.querySelector('.row'))
		const primary = requireValue(row.children[0])
		const support = requireValue(row.children[1])
		expect(primary.getAttribute('class')).toBe('col-12 col-lg-7')
		expect(support.getAttribute('class')).toBe('col-12 col-lg-5')
		expect(getComputedStyle(row).alignItems).toBe('flex-start')
		expect(support.getBoundingClientRect().top).toBe(primary.getBoundingClientRect().top)
		expect(support.getBoundingClientRect().left).toBeGreaterThan(
			primary.getBoundingClientRect().left,
		)
	})

	it('stacks the regions in reading order below 992 px', async () => {
		await page.viewport(390, 844)
		const { host } = mountView(defineComponent(() => () => h(Split, null, REGIONS)))
		const row = requireValue(host.querySelector('.row'))
		const primary = requireValue(row.children[0])
		const support = requireValue(row.children[1])
		expect(primary.textContent).toBe('Primary region')
		expect(support.getBoundingClientRect().top).toBeGreaterThan(
			primary.getBoundingClientRect().bottom - 1,
		)
	})

	it('takes the span it is given and refuses equal heights and CSS reordering', async () => {
		await page.viewport(1280, 800)
		const { host } = mountView(defineComponent(() => () => h(Split, { span: 6 }, REGIONS)))
		const row = requireValue(host.querySelector('.row'))
		expect(requireValue(row.children[0]).getAttribute('class')).toBe('col-12 col-lg-6')
		expect(requireValue(row.children[1]).getAttribute('class')).toBe('col-12 col-lg-6')
		const classes = [...readClasses(host)]
		expect(classes.filter((name) => name === 'h-100' || name.startsWith('order-'))).toEqual([])
	})
})
