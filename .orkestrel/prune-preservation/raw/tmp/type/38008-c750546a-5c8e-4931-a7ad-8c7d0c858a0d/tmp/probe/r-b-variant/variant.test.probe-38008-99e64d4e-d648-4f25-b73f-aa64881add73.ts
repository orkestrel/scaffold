import { expect, it } from 'vitest'
import { VARIANT } from '../../../src/core/variantProbe/constants.js'

it('loads the declared journey variant', () => {
	expect(VARIANT.name).toBe('light-390')
	expect(VARIANT.height).toBe(844)
})
// @orkestrel/probe generated specification 38008-99e64d4e-d648-4f25-b73f-aa64881add73
