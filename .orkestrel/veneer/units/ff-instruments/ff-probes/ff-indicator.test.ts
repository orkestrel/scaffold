// P2 probe: the computed focus paint of the valid control, the invalid control, the skip link, and
// the list-group action row, in light and dark, under keyboard focus and under a script focus after
// a pointer press, on Veneer's cascade and on the Bootstrap 5.3.8 release stylesheet.
import release from 'bootstrap/dist/css/bootstrap.css?raw'
import { applyTheme } from '../../tests/setupBrowser.js'
import { build, pressKeys } from '@orkestrel/test/browser'
import { afterEach, it } from 'vitest'
import { commands, userEvent } from 'vitest/browser'
import { mountShowcase, readSpecimen } from '../../tests/setupBrowser.js'

const SUBJECTS = [
	['Valid control', 'input'],
	['Invalid control', 'input'],
	['Skip link', '.visually-hidden-focusable'],
	['List group actions', 'a.list-group-item-action:not(.active)'],
] as const
const PROPERTIES = [
	'box-shadow',
	'outline-style',
	'outline-width',
	'outline-color',
	'outline-offset',
	'border-top-color',
	'background-color',
	'color',
]

let mounted: Awaited<ReturnType<typeof mountShowcase>> | undefined
afterEach(() => {
	mounted?.cleanup()
	document.documentElement.removeAttribute('data-bs-theme')
})

it('reads the Veneer paint', async () => {
	mounted = await mountShowcase()
	const out: unknown[] = []
	for (const variant of ['light-1280', 'dark-1280']) {
		await applyTheme(variant)
		for (const [name, selector] of SUBJECTS) {
			const element = readSpecimen(mounted.host, name).querySelector<HTMLElement>(selector)
			if (element === null) throw new Error(name)
			for (const drive of ['keyboard', 'script-after-press']) {
				if (drive === 'keyboard') {
					element.focus()
					await pressKeys('{Shift>}{/Shift}')
				} else {
					element.blur()
					await userEvent.click(readSpecimen(mounted.host, name).parentElement ?? document.body, {
						position: { x: 1, y: 1 },
					})
					element.focus()
				}
				await new Promise((resolve) => setTimeout(resolve, 300))
				const style = getComputedStyle(element)
				out.push({
					cascade: 'veneer',
					variant,
					name,
					drive,
					focus: element.matches(':focus'),
					visible: element.matches(':focus-visible'),
					...Object.fromEntries(PROPERTIES.map((p) => [p, style.getPropertyValue(p)])),
					body: getComputedStyle(document.body).backgroundColor,
				})
				element.blur()
			}
		}
	}
	await commands.writeFile(`tmp/probe/ff-out-P2-VENEER-${String(performance.now()).replace('.', '')}.json`, JSON.stringify(out, null, 1))
})

it('reads the release paint', async () => {
	mounted = await mountShowcase()
	const markup = SUBJECTS.map(([name]) => readSpecimen(mounted!.host, name).outerHTML).join('')
	mounted.cleanup()
	mounted = undefined
	const frame = build('iframe', { attributes: { style: 'width: 1280px; height: 800px' } })
	document.body.prepend(frame)
	const inner = frame.contentDocument
	if (inner === null) throw new Error('no frame document')
	inner.open()
	inner.write(`<!doctype html><html><head><style>${release}</style></head><body>${markup}</body></html>`)
	inner.close()
	const out: unknown[] = []
	for (const mode of ['light', 'dark']) {
		inner.documentElement.setAttribute('data-bs-theme', mode)
		for (const [name, selector] of SUBJECTS) {
			const holder = inner.querySelector(`[data-specimen="${name}"]`)
			const element = holder?.querySelector<HTMLElement>(selector)
			if (holder === null || element === null || element === undefined) throw new Error(name)
			for (const drive of ['keyboard', 'script-after-press']) {
				if (drive === 'keyboard') {
					element.focus()
					await userEvent.keyboard('{Shift>}{/Shift}')
				} else {
					element.blur()
					await userEvent.click(frame, { position: { x: 1200, y: 780 } })
					element.focus()
				}
				await new Promise((resolve) => setTimeout(resolve, 300))
				const style = inner.defaultView?.getComputedStyle(element)
				out.push({
					cascade: 'release',
					mode,
					name,
					drive,
					focus: element.matches(':focus'),
					visible: element.matches(':focus-visible'),
					...Object.fromEntries(PROPERTIES.map((p) => [p, style?.getPropertyValue(p)])),
					body: inner.defaultView?.getComputedStyle(inner.body).backgroundColor,
				})
				element.blur()
			}
		}
	}
	frame.remove()
	await commands.writeFile(`tmp/probe/ff-out-P2-RELEASE-${String(performance.now()).replace('.', '')}.json`, JSON.stringify(out, null, 1))
})
