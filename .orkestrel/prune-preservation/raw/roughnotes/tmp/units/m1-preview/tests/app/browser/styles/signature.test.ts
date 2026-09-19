import { afterEach, describe, expect, it } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { requireValue, waitForCondition } from '@orkestrel/test'
import { build, findRule, readPixels } from '@orkestrel/test/browser'
import { clearSurface, closeSite, openSite, openSurface } from '../setup.js'

afterEach(clearSurface)

describe('signature', () => {
	it('declares the masthead treatment', () => {
		expect(findRule('.masthead')).toBeDefined()
		expect(findRule('.hero')).toBeDefined()
	})

	it('reserves the sticky masthead depth on the scroll container', async () => {
		await page.viewport(1280, 800)
		const { host } = await openSurface()
		const masthead = requireValue(host.querySelector('.masthead'))
		expect(getComputedStyle(masthead).position).toBe('sticky')
		expect(readPixels(document.documentElement, 'scroll-padding-top')).toBeGreaterThanOrEqual(
			masthead.getBoundingClientRect().height,
		)
	})

	it('assigns resting, lifted, and floating surfaces to their elevation tokens', async () => {
		await page.viewport(390, 844)
		const { host } = await openSurface()
		const reference = build('div', { classes: 'shadow-sm' })
		host.append(reference)
		const card = requireValue(host.querySelector('.card.lift'))
		const masthead = requireValue(host.querySelector('.masthead'))
		expect(getComputedStyle(card).boxShadow).toBe(getComputedStyle(reference).boxShadow)
		expect(getComputedStyle(masthead).boxShadow).toBe(getComputedStyle(reference).boxShadow)
		reference.className = 'shadow'
		await userEvent.hover(card)
		await waitForCondition(
			'the card reaches hover elevation',
			() => getComputedStyle(card).boxShadow === getComputedStyle(reference).boxShadow,
		)
		await openSite()
		expect(getComputedStyle(requireValue(host.querySelector('#site-menu'))).boxShadow).toBe(
			getComputedStyle(reference).boxShadow,
		)
		await closeSite()
		reference.className = 'shadow-lg'
		for (const selector of ['.issue', '.invite']) {
			expect(getComputedStyle(requireValue(host.querySelector(selector))).boxShadow).toBe(
				getComputedStyle(reference).boxShadow,
			)
		}
		expect(findRule('.chip')).toBeUndefined()
		expect(findRule('.chip-south')).toBeUndefined()
		expect(findRule('.chip-north')).toBeUndefined()
	})
})
