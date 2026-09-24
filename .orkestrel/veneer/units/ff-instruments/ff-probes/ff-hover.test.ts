// P3 probe: what does the pointer hover when the check-group focus page frame is shot in dark mode
// at 1280, and does releasing the pointer after the mode switch clear it?
import { createPortfolio, releasePointer, traverseAccessible, waitForAnimations } from '@orkestrel/test/browser'
import { afterEach, expect, it } from 'vitest'
import { commands } from 'vitest/browser'
import { applyTheme, FrameManager, mountShowcase, readSpecimen } from '../../tests/setupBrowser.js'

let mounted: Awaited<ReturnType<typeof mountShowcase>>
afterEach(async () => {
	await releasePointer()
	mounted.cleanup()
	document.documentElement.removeAttribute('data-bs-theme')
})

for (const released of [false, true]) {
	it(`shoots the check-group focus page frame with the pointer ${released ? 'released' : 'left'} after the mode switch`, async () => {
		mounted = await mountShowcase()
				const frames = new FrameManager(
			createPortfolio({
				states: ['check-group-focus'],
				variants: [{ name: 'dark-1280', width: 1280, height: 800 }],
				variant: 'dark-1280',
				directory: released ? './ff-frames-released' : './ff-frames-left',
				enabled: true,
			}),
		)
		await applyTheme('dark-1280')
		if (released) await releasePointer()
		const specimen = readSpecimen(mounted.host, 'Check group')
		const checked = specimen.querySelector('.btn-check:checked + .btn')
		const preceding = readSpecimen(mounted.host, 'Nested groups').querySelector<HTMLElement>('button.btn:last-of-type')
		if (checked === null || preceding === null) throw new Error('missing')
		preceding.focus()
		await traverseAccessible('Align center')
		await waitForAnimations(checked)
		const control = [...document.querySelectorAll('button')].find((b) => b.textContent === 'Dark mode')
		const before = [...document.querySelectorAll(':hover')].map((e) => `${e.tagName}.${e.className}`.slice(0, 60))
		await frames.page('check-group-focus', checked)
		const row = readSpecimen(mounted.host, 'Horizontal group').querySelector('button:nth-of-type(3)')
		await commands.writeFile(`tmp/probe/ff-out-P3-HOVER-${String(performance.now()).replace('.', '')}.json`,
			JSON.stringify({
				released,
				control: control?.getBoundingClientRect().toJSON(),
				before,
				row: row?.textContent,
				rowBox: row?.getBoundingClientRect().toJSON(),
			}),
		)
		expect(true).toBe(true)
	})
}
