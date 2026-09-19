import { describe, expect, it } from 'vitest'
import { FEATURED_PRODUCT, createCatalog } from '@app/core'

describe('createCatalog', () => {
	it('returns a catalog over the default fixtures', () => {
		expect(createCatalog().product(FEATURED_PRODUCT)?.name).toBe('RoughNotes-Pro')
	})
})
