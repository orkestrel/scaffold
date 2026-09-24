// P3 probe: does lifting a copy of the Vertical group specimen, the way the resting cascade case
// does, uncheck the original's checked radio?
import { build, readStyle } from '@orkestrel/test/browser'
import { afterEach, expect, it } from 'vitest'
import { commands } from 'vitest/browser'
import { mountShowcase, readSpecimen } from '../../tests/setupBrowser.js'

let mounted: Awaited<ReturnType<typeof mountShowcase>>
afterEach(() => mounted.cleanup())

it('reads the original radio after a named copy is lifted and removed', async () => {
	mounted = await mountShowcase()
	const specimen = readSpecimen(mounted.host, 'Vertical group')
	const original = specimen.querySelector<HTMLInputElement>('#column-center')
	const label = specimen.querySelector('label[for="column-center"]')
	if (original === null || label === null) throw new Error('no radio')
	const before = { checked: original.checked, fill: readStyle(label, 'background-color') }
	const lifted = build('div', { classes: 'pt-5' })
	lifted.append(specimen.cloneNode(true))
	document.body.prepend(lifted)
	const copyChecked = lifted.querySelector<HTMLInputElement>('#column-center')?.checked
	lifted.remove()
	const after = { checked: original.checked, fill: readStyle(label, 'background-color') }
	const second = specimen.cloneNode(true)
	if (!(second instanceof HTMLElement)) throw new Error('no copy')
	const secondChecked = second.querySelector<HTMLInputElement>('#column-center')?.checked
	await commands.writeFile(`tmp/probe/ff-out-P3-RADIO-${String(performance.now()).replace('.', '')}.json`, JSON.stringify({ copy: 'named', before, copyChecked, after, secondChecked }))
	expect(after.checked).toBe(false)
})

it('reads the original radio after an unnamed copy is lifted and removed (control)', async () => {
	mounted = await mountShowcase()
	const specimen = readSpecimen(mounted.host, 'Vertical group')
	const original = specimen.querySelector<HTMLInputElement>('#column-center')
	if (original === null) throw new Error('no radio')
	const copy = specimen.cloneNode(true)
	if (!(copy instanceof HTMLElement)) throw new Error('no copy')
	for (const input of copy.querySelectorAll('input[type="radio"]')) input.removeAttribute('name')
	const lifted = build('div', { classes: 'pt-5' })
	lifted.append(copy)
	document.body.prepend(lifted)
	const copyChecked = copy.querySelector<HTMLInputElement>('#column-center')?.checked
	lifted.remove()
	await commands.writeFile(`tmp/probe/ff-out-P3-RADIO-${String(performance.now()).replace('.', '')}.json`, JSON.stringify({ copy: 'unnamed', copyChecked, after: original.checked }))
	expect(original.checked).toBe(true)
})
