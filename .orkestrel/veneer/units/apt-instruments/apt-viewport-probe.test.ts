import { expect, it } from 'vitest'

// Reports the reading through a deliberately unequal expectation, since the project silences console output.
it('reads the default viewport', () => {
	const probe = document.createElement('h1')
	document.body.append(probe)
	expect({ width: window.innerWidth, height: window.innerHeight, h1: getComputedStyle(probe).fontSize }).toEqual({})
})
