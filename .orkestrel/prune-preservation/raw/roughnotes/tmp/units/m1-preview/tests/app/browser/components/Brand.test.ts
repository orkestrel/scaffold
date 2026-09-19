import { afterEach, describe, expect, it } from 'vitest'
import { requireValue } from '@orkestrel/test'
import { findRule, readClasses } from '@orkestrel/test/browser'
import { Brand, COPY } from '@app/browser'
import { clearSurface, mountView } from '../setup.js'

afterEach(() => {
	clearSurface()
})

describe('Brand', () => {
	it('paints the monogram beside the wordmark', () => {
		const { host } = mountView(Brand)
		expect(requireValue(host.querySelector('.monogram')).textContent).toBe('R')
		expect(host.textContent).toContain(COPY.brand)
		expect(host.textContent).toContain(COPY.mark)
	})

	it('takes a badge class Bootstrap does not already own', () => {
		const { host } = mountView(Brand)
		expect(readClasses(host).has('mark')).toBe(false)
		expect(findRule('.monogram')).toBeDefined()
	})
})
