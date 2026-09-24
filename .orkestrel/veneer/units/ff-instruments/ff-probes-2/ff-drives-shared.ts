// FOCUS-FRAME round 2 probe support: shoots a padded wrapper through the frame manager with the
// target's outline painted and with it suppressed inline, and counts the pixels that differ.
import { build, createPortfolio, pressKeys, readStyle } from '@orkestrel/test/browser'
import { commands, userEvent } from 'vitest/browser'
import { FrameManager } from '../../tests/setupBrowser.js'

export const DRIVES = ['still-script', 'still-tab', 'press-script', 'press-script-arrow', 'press-tab'] as const

async function decode(path: string): Promise<Uint8ClampedArray> {
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
	return context.getImageData(0, 0, image.width, image.height).data
}

export async function measureDrive(
	cascade: string,
	mode: string,
	subject: string,
	drive: string,
	wrapper: HTMLElement,
	target: HTMLElement,
	press: HTMLElement,
): Promise<Record<string, unknown>> {
	const variant = `${mode}-1280`
	const scenario = subject === 'skip' ? 'skip-link-focus' : 'list-group-actions-focus'
	const shots: string[] = []
	let visible = false
	let outline = ''
	for (const bare of [false, true]) {
		const directory = `./ff-shots/${cascade}-${mode}-${subject}-${drive}-${bare ? 'bare' : 'painted'}`
		const portfolio = createPortfolio({ states: [scenario], variants: [{ name: variant, width: 1280, height: 800 }], variant, directory, enabled: true })
		if (bare) target.style.setProperty('outline', 'none', 'important')
		if (drive.startsWith('press')) await userEvent.click(press)
		if (drive.endsWith('tab')) {
			wrapper.focus()
			await pressKeys('{Tab}')
		} else {
			target.focus()
			if (drive.endsWith('arrow')) await pressKeys('{ArrowRight}')
		}
		visible = target.matches(':focus-visible') && document.activeElement === target
		if (!bare) outline = ['outline-style', 'outline-width', 'outline-offset'].map((p) => readStyle(target, p)).join(' ')
		await new FrameManager(portfolio).place(scenario, target, wrapper)
		shots.push(`tmp/probe/${directory.slice(2)}/${scenario}--${variant}.png`)
		target.style.removeProperty('outline')
		target.blur()
	}
	const painted = await decode(shots[0] ?? '')
	const bare = await decode(shots[1] ?? '')
	let differing = 0
	for (let i = 0; i < painted.length; i += 4) {
		if (painted[i] !== bare[i] || painted[i + 1] !== bare[i + 1] || painted[i + 2] !== bare[i + 2]) differing += 1
	}
	return { cascade, mode, subject, drive, visible, outline, differing }
}

export function buildWrapper(markup: string): HTMLElement {
	const wrapper = build('div', { classes: 'p-3', attributes: { tabindex: '-1', style: 'padding: 16px' } })
	wrapper.innerHTML = markup
	return wrapper
}
