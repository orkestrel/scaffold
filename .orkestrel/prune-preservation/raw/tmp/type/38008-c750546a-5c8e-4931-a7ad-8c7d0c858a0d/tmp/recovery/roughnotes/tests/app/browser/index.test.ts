import * as entry from '@app/browser'
import { describe, expect, it } from 'vitest'
import { createApplication, createMemoryStorage } from '@app/browser'

describe('app browser entry', () => {
	it('exports the composition root and the shipped shell', () => {
		expect(typeof entry.createApplication).toBe('function')
		expect(typeof entry.createMemoryStorage).toBe('function')
		expect(entry.App).toBeTypeOf('object')
		const app = createApplication({ storage: createMemoryStorage() })
		expect(app.catalog.product('roughnotes-pro')?.name).toBe('RoughNotes-Pro')
		app.destroy()
	})
})
