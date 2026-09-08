import { expect, inject, test } from 'vitest'

test('reads the requested direction before inventory collection', () => {
	expect(inject('direction')).toBe('guide')
})
