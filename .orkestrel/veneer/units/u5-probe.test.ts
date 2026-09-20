// U5 instrument probes (temporary; deleted after research/instruments.md records the readings).
// Runs inside the `src:browser` project on managed Chromium and, through PLAYWRIGHT_CHANNEL=msedge,
// on Edge. Each test reads one capability of the tester document and reports it through the
// assertion message, so the run's output is the reading.

import { cdp, page, userEvent } from 'vitest/browser'
import { afterEach, describe, expect, it } from 'vitest'

const STYLE_ID = 'u5-probe-style'

function installRules(css: string): HTMLStyleElement {
	const style = document.createElement('style')
	style.id = STYLE_ID
	style.textContent = css
	document.head.append(style)
	return style
}

function readUsed(element: Element, property: string, pseudo?: string): string {
	return getComputedStyle(element, pseudo).getPropertyValue(property)
}

afterEach(() => {
	document.getElementById(STYLE_ID)?.remove()
	document.body.replaceChildren()
})

describe('U5 hover', () => {
	it('userEvent.hover matches :hover and changes a used property', async () => {
		installRules('.u5-hover { padding: 16px } .u5-hover:hover { padding: 32px }')
		const button = document.createElement('button')
		button.className = 'u5-hover'
		button.textContent = 'Hover me'
		document.body.append(button)
		const before = readUsed(button, 'padding-top')
		await userEvent.hover(button)
		const during = readUsed(button, 'padding-top')
		await userEvent.unhover(button)
		const after = readUsed(button, 'padding-top')
		console.log(`U5 hover: before=${before} during=${during} after=${after}`)
		expect(before).toBe('16px')
		expect(during).toBe('32px')
		expect(after).toBe('16px')
	})
})

describe('U5 active', () => {
	it('a CDP pointer press produces :active and the release clears it', async () => {
		installRules('.u5-active { padding: 16px } .u5-active:active { padding: 32px }')
		const button = document.createElement('button')
		button.className = 'u5-active'
		button.textContent = 'Press me'
		document.body.append(button)
		const events: string[] = []
		for (const type of ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']) {
			button.addEventListener(type, () => events.push(type))
		}
		const session = await cdp()
		const rect = button.getBoundingClientRect()
		const frameElement = window.frameElement
		const frame = frameElement?.getBoundingClientRect() ?? { left: 0, top: 0, width: innerWidth, height: innerHeight }
		// The tester iframe may be scaled by the orchestrator page; compare its painted box with its
		// own viewport to recover the scale, then map the button's centre through it.
		const scale = frameElement === null ? 1 : frame.width / innerWidth
		const local = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
		const attempts: Array<{ label: string; x: number; y: number }> = [
			{ label: 'scaled', x: frame.left + local.x * scale, y: frame.top + local.y * scale },
			{ label: 'unscaled', x: frame.left + local.x, y: frame.top + local.y },
			{ label: 'local', x: local.x, y: local.y },
		]
		const readings: string[] = []
		let held = '16px'
		let released = '16px'
		for (const attempt of attempts) {
			events.length = 0
			await session.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: attempt.x, y: attempt.y })
			await session.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: attempt.x, y: attempt.y, button: 'left', buttons: 1, clickCount: 1 })
			await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)))
			held = readUsed(button, 'padding-top')
			const active = document.activeElement === button
			await session.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: attempt.x, y: attempt.y, button: 'left', buttons: 0, clickCount: 1 })
			await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)))
			released = readUsed(button, 'padding-top')
			readings.push(`${attempt.label}@${Math.round(attempt.x)},${Math.round(attempt.y)} held=${held} released=${released} focused=${active} events=${events.join('+') || 'none'}`)
			if (held === '32px') break
		}
		console.log(`U5 active: frame=${Math.round(frame.left)},${Math.round(frame.top)} ${Math.round(frame.width)}x${Math.round(frame.height)} inner=${innerWidth}x${innerHeight} scale=${scale.toFixed(3)} dpr=${devicePixelRatio} | ${readings.join(' | ')}`)
		expect(held).toBe('32px')
		expect(released).toBe('16px')
	})
})

describe('U5 pseudo-elements', () => {
	it('reads ::after, ::backdrop, and ::details-content used values', async () => {
		installRules(`
			.u5-after::after { content: ""; display: block; padding-top: 7px }
			dialog.u5-dialog::backdrop { background-color: rgb(1, 2, 3) }
			details.u5-details::details-content { padding-top: 9px; display: block }
		`)
		const box = document.createElement('div')
		box.className = 'u5-after'
		const dialog = document.createElement('dialog')
		dialog.className = 'u5-dialog'
		dialog.textContent = 'Dialog'
		const details = document.createElement('details')
		details.className = 'u5-details'
		details.open = true
		details.innerHTML = '<summary>Sum</summary><p>Body</p>'
		document.body.append(box, dialog, details)
		dialog.showModal()
		const after = readUsed(box, 'padding-top', '::after')
		const backdrop = readUsed(dialog, 'background-color', '::backdrop')
		const content = readUsed(details, 'padding-top', '::details-content')
		dialog.close()
		console.log(`U5 pseudo: ::after=${after} ::backdrop=${backdrop} ::details-content=${content}`)
		expect(after).toBe('7px')
		expect(backdrop).toBe('rgb(1, 2, 3)')
		expect(content).toBe('9px')
	})
})

describe('U5 media emulation', () => {
	it('cdp Emulation.setEmulatedMedia switches reduced motion and print, and restores', async () => {
		installRules(`
			.u5-media { padding-top: 1px }
			@media (prefers-reduced-motion: reduce) { .u5-media { padding-top: 2px } }
			@media print { .u5-media { padding-top: 3px } }
		`)
		const box = document.createElement('div')
		box.className = 'u5-media'
		document.body.append(box)
		const session = await cdp()
		const base = readUsed(box, 'padding-top')
		await session.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
		await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)))
		const reduced = readUsed(box, 'padding-top')
		const reducedMatches = matchMedia('(prefers-reduced-motion: reduce)').matches
		await session.send('Emulation.setEmulatedMedia', { media: 'print', features: [] })
		await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)))
		const print = readUsed(box, 'padding-top')
		await session.send('Emulation.setEmulatedMedia', { media: '', features: [] })
		await new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)))
		const restored = readUsed(box, 'padding-top')
		console.log(`U5 media: base=${base} reduced=${reduced} (matchMedia=${reducedMatches}) print=${print} restored=${restored}`)
		expect(base).toBe('1px')
		expect(reduced).toBe('2px')
		expect(print).toBe('3px')
		expect(restored).toBe('1px')
	})
})

describe('U5 syntax capabilities', () => {
	it('reports the token and theme syntax the tester engine exposes', () => {
		const supports: Record<string, boolean> = {
			'@property': typeof CSS.registerProperty === 'function',
			'light-dark()': CSS.supports('color', 'light-dark(black, white)'),
			'color-mix()': CSS.supports('color', 'color-mix(in oklab, red, blue)'),
			'oklch()': CSS.supports('color', 'oklch(0.5 0.1 200)'),
			'@layer': CSS.supports('selector(:is(a))') && 'CSSLayerBlockRule' in window,
			':has()': CSS.supports('selector(:has(a))'),
			'@starting-style': 'CSSStartingStyleRule' in window,
			'transition-behavior': CSS.supports('transition-behavior', 'allow-discrete'),
			'overlay': CSS.supports('overlay', 'auto'),
			'::details-content': CSS.supports('selector(::details-content)'),
			'popover': 'popover' in HTMLElement.prototype,
			'anchor-name': CSS.supports('anchor-name', '--a'),
			'position-anchor': CSS.supports('position-anchor', '--a'),
			'position-try-fallbacks': CSS.supports('position-try-fallbacks', 'flip-block'),
			'@container': 'CSSContainerRule' in window,
			'round()': CSS.supports('width', 'round(10.5px, 1px)'),
			'inset-inline': CSS.supports('inset-inline', '0'),
			'forced-colors': matchMedia('(forced-colors: active)').media === '(forced-colors: active)',
		}
		installRules('@property --u5-length { syntax: "<length>"; inherits: false; initial-value: 5px } .u5-prop { padding-top: var(--u5-length) }')
		const box = document.createElement('div')
		box.className = 'u5-prop'
		document.body.append(box)
		const registered = readUsed(box, 'padding-top')
		console.log(`U5 syntax: ${JSON.stringify(supports)} @property-initial=${registered}`)
		expect(registered).toBe('5px')
		expect(Object.values(supports).every((value) => value)).toBe(true)
	})
})

describe('U5 tester engine', () => {
	it('names the engine that produced these readings', () => {
		console.log(`U5 engine: ${navigator.userAgent} | ${page.config?.browser?.name ?? 'unknown'}`)
		expect(navigator.userAgent).toContain('Chrome')
	})
})
