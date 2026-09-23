// Stage-only probe: reads the brand color of the class specimen as the section renders it, and of
// the same markup without the bar's own light attribute, so a run with the partial's dark class
// selector removed and a run with it show which paint each surface photographs. It is copied into
// the stage for each run and deleted afterwards; it never enters the worktree's test tree.
import { NAVBAR_SPECIMENS } from '../../../../app/browser/constants.js'
import { requireValue } from '@orkestrel/test'
import { readStyle } from '@orkestrel/test/browser'
import { afterEach, expect, it } from 'vitest'
import { scene } from '../../../setupBrowser.js'

afterEach(() => {
	scene.clear()
})

it('reads the class specimen brand over the dark card', () => {
	const specimen = requireValue(
		NAVBAR_SPECIMENS.find(({ name }) => name === 'Navbar inverted class'),
		'No class specimen',
	)
	const readings = [
		['round-2 markup, light attribute on the bar', specimen.markup],
		['round-1 markup, no attribute on the bar', specimen.markup.replace(' data-bs-theme="light"', '')],
	].map(([surface, markup]) => {
		const host = scene.mount(markup ?? '')
		const brand = requireValue(host.querySelector('.navbar-brand'), 'No brand')
		const reading = { surface, brand: readStyle(brand, 'color') }
		scene.clear()
		return reading
	})
	console.log(`CLASS-SURFACE ${JSON.stringify(readings)}`)
	expect(readings[0]?.surface).toContain('light attribute')
})
