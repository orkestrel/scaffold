// FOCUS-FRAME round 2 probe: on the Bootstrap 5.3.8 stylesheet alone, the pixels the skip link's and
// the list-group row's `auto` outline paint under each focus drive, light and dark.
import release from 'bootstrap/dist/css/bootstrap.css?raw'
import { build } from '@orkestrel/test/browser'
import { it } from 'vitest'
import { commands } from 'vitest/browser'
import { buildWrapper, DRIVES, measureDrive } from './ff-drives-shared.js'

const MARKUP = new Map([
	['skip', '<p class="position-relative">Press Tab to reveal the link this line holds. <a class="visually-hidden-focusable" href="#main">Skip to main content</a></p>'],
	['row', '<div class="list-group"><a class="list-group-item list-group-item-action" href="#main">Dispatch lane</a><button type="button" class="list-group-item list-group-item-action">Holding lane</button><a class="list-group-item list-group-item-action active" href="#main" aria-current="true">Return lane</a></div>'],
])

it('measures the release drives', async () => {
	const style = build('style')
	style.textContent = release
	document.head.append(style)
	const out: unknown[] = []
	const press = build('button', { attributes: { type: 'button' } })
	press.textContent = 'Press'
	for (const mode of ['light', 'dark']) {
		document.documentElement.setAttribute('data-bs-theme', mode)
		for (const [subject, html] of MARKUP) {
			const wrapper = buildWrapper(html)
			document.body.prepend(wrapper)
			wrapper.after(press)
			const target = wrapper.querySelector<HTMLElement>(subject === 'skip' ? '.visually-hidden-focusable' : 'a.list-group-item-action:not(.active)')
			if (target === null) throw new Error(subject)
			for (const drive of DRIVES) out.push(await measureDrive('release', mode, subject, drive, wrapper, target, press))
			wrapper.remove()
		}
	}
	press.remove()
	await commands.writeFile('tmp/probe/ff-out-R2-DRIVES-RELEASE.json', JSON.stringify(out, null, 1))
})
