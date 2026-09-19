import { describe, expect, it } from 'vitest'
import { FEATURED_PRODUCT } from '@app/core'
import { createApplication, createMemoryStorage } from '@app/browser'

describe('createApplication', () => {
	it('returns a live controller over the default catalog', () => {
		const app = createApplication({ storage: createMemoryStorage() })
		expect(app.catalog.product(FEATURED_PRODUCT)?.name).toBe('RoughNotes-Pro')
		app.destroy()
	})
})

describe('createMemoryStorage', () => {
	it('returns an isolated Storage', () => {
		const storage = createMemoryStorage()
		storage.setItem('probe', '1')
		expect(createMemoryStorage().getItem('probe')).toBeNull()
	})
})
