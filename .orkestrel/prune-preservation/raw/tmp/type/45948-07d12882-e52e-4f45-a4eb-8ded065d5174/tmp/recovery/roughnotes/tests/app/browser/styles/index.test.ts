import { describe, expect, it } from 'vitest'
import { build, findRule, mount } from '@orkestrel/test/browser'

describe('styles entry', () => {
	it('compiles Bootstrap layout utilities used by the shell', () => {
		expect(findRule('.container-xl')).toBeDefined()
	})

	it('generates the readable-figure utility', () => {
		const figure = mount(build('span', { classes: 'figures-tabular', text: '$78.00' }))
		try {
			expect(getComputedStyle(figure).fontVariantNumeric).toBe('tabular-nums')
			expect(findRule('.figures-tabular')).toBeDefined()
		} finally {
			figure.remove()
		}
	})
})
