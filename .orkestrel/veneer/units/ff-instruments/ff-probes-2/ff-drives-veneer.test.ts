// FOCUS-FRAME round 2 probe: on Veneer's cascade, the pixels the skip link's and the list-group
// row's `auto` outline paint under each focus drive, light and dark.
import { build } from '@orkestrel/test/browser'
import { it } from 'vitest'
import { commands } from 'vitest/browser'
import { mountShowcase, readSpecimen } from '../../tests/setupBrowser.js'
import { buildWrapper, DRIVES, measureDrive } from './ff-drives-shared.js'

it('measures the Veneer drives', async () => {
	const mounted = await mountShowcase()
	const markup = new Map([
		['skip', readSpecimen(mounted.host, 'Skip link').outerHTML],
		['row', readSpecimen(mounted.host, 'List group actions').outerHTML],
	])
	const out: unknown[] = []
	const press = build('button', { attributes: { type: 'button' } })
	press.textContent = 'Press'
	for (const mode of ['light', 'dark']) {
		document.documentElement.setAttribute('data-bs-theme', mode)
		for (const [subject, html] of markup) {
			const wrapper = buildWrapper(html)
			document.body.prepend(wrapper)
			wrapper.after(press)
			const target = wrapper.querySelector<HTMLElement>(subject === 'skip' ? '.visually-hidden-focusable' : 'a.list-group-item-action:not(.active)')
			if (target === null) throw new Error(subject)
			for (const drive of DRIVES) out.push(await measureDrive('veneer', mode, subject, drive, wrapper, target, press))
			wrapper.remove()
		}
	}
	press.remove()
	mounted.cleanup()
	await commands.writeFile('tmp/probe/ff-out-R2-DRIVES-VENEER.json', JSON.stringify(out, null, 1))
})
