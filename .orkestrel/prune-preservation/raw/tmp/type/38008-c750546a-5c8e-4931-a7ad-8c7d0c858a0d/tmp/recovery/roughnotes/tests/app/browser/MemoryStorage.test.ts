import { describe, expect, it } from 'vitest'
import { createMemoryStorage } from '@app/browser'

describe('MemoryStorage', () => {
	it('implements Storage over an isolated map', () => {
		const storage = createMemoryStorage()
		expect(storage.length).toBe(0)
		storage.setItem('roughnotes-theme', 'dark')
		expect(storage.getItem('roughnotes-theme')).toBe('dark')
		expect(storage.key(0)).toBe('roughnotes-theme')
		expect(storage.length).toBe(1)
		storage.removeItem('roughnotes-theme')
		expect(storage.getItem('roughnotes-theme')).toBeNull()
		storage.setItem('a', '1')
		expect(storage.key(99)).toBeNull()
		expect(storage.key(-1)).toBeNull()
		storage.clear()
		expect(storage.length).toBe(0)
	})
})
