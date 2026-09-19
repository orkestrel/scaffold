import { expect, inject, it } from 'vitest'

it('receives a variant from the wrapper project', () => {
	expect(['desktop', 'compact']).toContain(inject('variant'))
})
