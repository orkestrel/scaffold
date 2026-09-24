// P2 probe: does the skip link paint the browser's focus outline, on the Bootstrap 5.3.8 stylesheet
// alone, in each mode, with and without a pointer press on a button before the focus? Two capture
// frames per row differ by the outline alone: one as painted, one with the outline removed inline.
import release from 'bootstrap/dist/css/bootstrap.css?raw'
import { build, createPortfolio, pressKeys, readStyle } from '@orkestrel/test/browser'
import { it } from 'vitest'
import { commands, userEvent } from 'vitest/browser'
import { FrameManager } from '../../tests/setupBrowser.js'

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
	return { data: context.getImageData(0, 0, image.width, image.height).data }
}

it('measures the release skip link outline in light and dark, still and after a press', async () => {
	const style = build('style')
	style.textContent = release
	document.head.append(style)
	const out: unknown[] = []
	for (const [mode, press, tab] of [['light', true, true], ['dark', true, true], ['dark', true, false]] as const) {
		document.documentElement.setAttribute('data-bs-theme', mode)
		const button = build('button', { attributes: { type: 'button' } })
		button.textContent = 'Press'
		document.body.prepend(button)
		if (press) await userEvent.click(button)
		const focused = document.hasFocus()
		const wrapper = build('div', { attributes: { style: 'padding: 24px' } })
		wrapper.innerHTML = '<p class="position-relative">Press Tab to reveal the link this line holds. <a class="visually-hidden-focusable" href="#main">Skip to main content</a></p>'
		button.after(wrapper)
		const target = wrapper.querySelector('a')
		if (target === null) throw new Error('no link')
		const shots: string[] = []
		for (const bare of [false, true]) {
			const variant = `${mode}-1280`
			const directory = `./ff-shots/release-${mode}-${press ? 'press' : 'still'}-${tab ? 'tab' : 'script'}-${bare ? 'bare' : 'painted'}`
			const portfolio = createPortfolio({ states: ['skip-link-focus'], variants: [{ name: variant, width: 1280, height: 800 }], variant, directory, enabled: true })
			if (bare) target.style.setProperty('outline', 'none', 'important')
			if (tab) {
				button.focus()
				await pressKeys('{Tab}')
			} else {
				target.focus()
				await pressKeys('{Shift>}{/Shift}')
			}
			await new FrameManager(portfolio).place('skip-link-focus', target, wrapper)
			shots.push(`tmp/probe/${directory.slice(2)}/skip-link-focus--${variant}.png`)
			target.removeAttribute('style')
		}
		const painted = await decode(shots[0] ?? '')
		const bare = await decode(shots[1] ?? '')
		let differing = 0
		for (let i = 0; i < painted.data.length; i += 4) {
			if (painted.data[i] !== bare.data[i] || painted.data[i + 1] !== bare.data[i + 1] || painted.data[i + 2] !== bare.data[i + 2]) differing += 1
		}
		out.push({ mode, press, tab, active: document.activeElement === target, focused, after: document.hasFocus(), visible: target.matches(':focus-visible'), outline: ['outline-style', 'outline-width', 'outline-offset', 'outline-color'].map((p) => readStyle(target, p)), differing })
		target.blur()
		wrapper.remove()
		button.remove()
	}
	await commands.writeFile('tmp/probe/ff-out-P2-RELEASE-EXTENT.json', JSON.stringify(out, null, 1))
})
