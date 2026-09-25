import { expect, it } from 'vitest'

// Reads the one value in question and nothing else from the environment.
it('reports the mode a project test reads', () => {
	expect(import.meta.env.MODE).toBe('release')
})
