// P1 probe: how far past its border box does a focus indicator paint? The indicator's pixels are
// the difference between two capture frames of one padded wrapper, written through the installed
// portfolio: the focused target as the cascade paints it, and the same focused target with its
// outline and shadow removed inline. The Primary button's shadow ring, whose declared spread is the
// focus width, is the instrument's control.
import { build, createPortfolio, pressKeys, readStyle, stageMedia, releaseMedia } from '@orkestrel/test/browser'
import { afterEach, it } from 'vitest'
import { commands } from 'vitest/browser'
import { applyTheme, FrameManager, mountShowcase, readButton, readSpecimen } from '../../tests/setupBrowser.js'

let mounted: Awaited<ReturnType<typeof mountShowcase>>
afterEach(() => {
	mounted.cleanup()
	document.documentElement.removeAttribute('data-bs-theme')
})

async function decode(path: string) {
	const encoded = await commands.readFile(path, 'base64')
	const image = new Image()
	image.src = `data:image/png;base64,${encoded}`
	await image.decode()
	const canvas = document.createElement('canvas')
	canvas.width = image.width
	canvas.height = image.height
	const context = canvas.getContext('2d')
	if (context === null) throw new Error('no context')
	context.drawImage(image, 0, 0)
	return { width: image.width, height: image.height, data: context.getImageData(0, 0, image.width, image.height).data }
}

it('measures the painted extent of the skip link outline and the Primary ring', async () => {
	mounted = await mountShowcase()
	const out: unknown[] = []
	await stageMedia({ motion: false })
	for (const variant of ['light-1280', 'dark-1280']) {
		await applyTheme(variant)
		for (const [name, scenario, inline] of [['Skip link', 'skip-link-focus', ''], ['Skip link', 'skip-link-focus', 'color-scheme: light'], ['Skip link', 'skip-link-focus', 'outline: 2px solid red'], ['Primary', 'primary-focus', '']] as const) {
			const target =
				name === 'Primary'
					? readButton(mounted.section, 'Primary')
					: readSpecimen(mounted.host, 'Skip link').querySelector<HTMLElement>('.visually-hidden-focusable')
			if (target === null) throw new Error(name)
			const holder = name === 'Primary' ? target : readSpecimen(mounted.host, name)
			const marker = document.createComment('m')
			holder.before(marker)
			const wrapper = build('div', { attributes: { style: 'padding: 24px' } })
			wrapper.append(holder)
			document.body.prepend(wrapper)
			try {
				const shots: string[] = []
				for (const bare of [false, true]) {
					const directory = `./ff-shots/extent-${variant}-${inline.replace(/[^a-z]+/gu, '')}-${bare ? 'bare' : 'painted'}`
					const portfolio = createPortfolio({ states: [scenario], variants: [{ name: variant, width: 1280, height: 800 }], variant, directory, enabled: true })
					if (bare) {
						target.style.setProperty('outline', 'none', 'important')
						target.style.setProperty('box-shadow', 'none', 'important')
					}
					if (inline !== '') target.setAttribute('style', `${target.getAttribute('style') ?? ''}; ${inline}`)
					target.focus()
					await pressKeys('{Shift>}{/Shift}')
					await new FrameManager(portfolio).place(scenario, target, wrapper)
					shots.push(`tmp/probe/${directory.slice(2)}/${scenario}--${variant}.png`)
					target.removeAttribute('style')
				}
				const painted = await decode(shots[0] ?? '')
				const bare = await decode(shots[1] ?? '')
				const w = wrapper.getBoundingClientRect()
				const t = target.getBoundingClientRect()
				const ratio = painted.width / w.width
				let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity
				for (let y = 0; y < painted.height; y++) {
					for (let x = 0; x < painted.width; x++) {
						const i = (y * painted.width + x) * 4
						const d = Math.abs(painted.data[i] - bare.data[i]) + Math.abs(painted.data[i + 1] - bare.data[i + 1]) + Math.abs(painted.data[i + 2] - bare.data[i + 2])
						if (d > 0) { left = Math.min(left, x); top = Math.min(top, y); right = Math.max(right, x + 1); bottom = Math.max(bottom, y + 1) }
					}
				}
				const box = { left: (t.left - w.left) * ratio, top: (t.top - w.top) * ratio, right: (t.right - w.left) * ratio, bottom: (t.bottom - w.top) * ratio }
				out.push({
					variant, name, inline, visible: target.matches(':focus-visible'), ratio, image: [painted.width, painted.height], wrapper: [w.width, w.height],
					outline: ['outline-style', 'outline-width', 'outline-offset', 'outline-color'].map((p) => readStyle(target, p)),
					shadow: readStyle(target, 'box-shadow'),
					reach: { left: box.left - left, top: box.top - top, right: right - box.right, bottom: bottom - box.bottom },
				})
				target.blur()
			} finally {
				marker.replaceWith(holder)
				wrapper.remove()
			}
		}
	}
	await releaseMedia()
	await commands.writeFile(`tmp/probe/ff-out-P1-EXTENT.json`, JSON.stringify(out, null, 1))
})
