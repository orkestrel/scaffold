// P1 probe: can the range thumb's focus shadow be read through the pseudo-element argument, and
// what padding does the `p-3` utility resolve to?
import { build, readStyle, traverseAccessible } from '@orkestrel/test/browser'
import { afterEach, it } from 'vitest'
import { commands } from 'vitest/browser'
import { mountShowcase, readSpecimen } from '../../tests/setupBrowser.js'

let mounted: Awaited<ReturnType<typeof mountShowcase>>
afterEach(() => mounted.cleanup())

it('reads the thumb shadow and the padding', async () => {
	mounted = await mountShowcase()
	const specimen = readSpecimen(mounted.host, 'Range')
	const control = specimen.querySelector<HTMLElement>('.form-range')
	if (control === null) throw new Error('no range')
	const marker = document.createComment('m')
	specimen.before(marker)
	const lifted = build('div', { classes: 'p-3', attributes: { tabindex: '-1' } })
	lifted.append(specimen)
	document.body.prepend(lifted)
	lifted.focus()
	const reached = await traverseAccessible(control.getAttribute('aria-label') ?? (control.labels?.[0]?.textContent ?? ''))
	const out = {
		reached: reached === control,
		visible: control.matches(':focus-visible'),
		padding: readStyle(lifted, 'padding-top'),
		host: readStyle(control, 'box-shadow'),
		thumb: readStyle(control, 'box-shadow', '::-webkit-slider-thumb'),
		thumbWidth: readStyle(control, 'width', '::-webkit-slider-thumb'),
		value: (control as HTMLInputElement).value,
		box: control.getBoundingClientRect().toJSON(),
		specimenBox: specimen.getBoundingClientRect().toJSON(),
		html: specimen.outerHTML.slice(0, 300),
	}
	marker.replaceWith(specimen)
	lifted.remove()
	await commands.writeFile('tmp/probe/ff-out-P1-RANGE.json', JSON.stringify(out, null, 1))
})
