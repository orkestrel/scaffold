// Reads the rendered results the retired tokens could reach: every focus-ring caller under forced
// colors, and every tertiary button in each mode and state. Prints one JSON line per reading set.
import { requireValue } from '@orkestrel/test'
import {
	holdAccessible,
	hoverAccessible,
	pressKeys,
	readRules,
	readStyle,
	readToken,
	releaseMedia,
	releasePointer,
	stageMedia,
} from '@orkestrel/test/browser'
import { afterEach, expect, it } from 'vitest'
import { scene } from '../../../tests/setupBrowser.js'

afterEach(async () => {
	await releasePointer()
	await releaseMedia()
	scene.clear()
})

const PAINT = ['color', 'background-color', 'border-left-color', 'box-shadow', 'outline-style', 'outline-width', 'outline-color', 'opacity']

function readPaint(element: Element): Record<string, string> {
	return Object.fromEntries(PAINT.map((property) => [property, readStyle(element, property)]))
}

it('reads the forced-colors focus ring on every shipped caller', async () => {
	const declared: Array<[string, string]> = []
	for (const rule of readRules()) {
		if (!(rule instanceof CSSMediaRule) || rule.conditionText !== '(forced-colors: active)') continue
		for (const nested of Array.from(rule.cssRules))
			if (nested instanceof CSSStyleRule && nested.style.getPropertyValue('box-shadow') !== '')
				declared.push([nested.selectorText, nested.style.getPropertyValue('box-shadow')])
	}
	const host = scene.mount(
		'<button id="element">Element ring</button><button id="class" class="btn btn-primary">Class ring</button><button id="link" class="btn btn-link">Link ring</button>',
	)
	const readings: Record<string, Record<string, string>> = {}
	for (const forced of [false, true]) {
		await stageMedia({ motion: false, forced })
		for (const id of ['element', 'class', 'link']) {
			const button = requireValue(host.querySelector<HTMLButtonElement>(`#${id}`), id)
			button.focus()
			await pressKeys('{ArrowRight}')
			expect(button.matches(':focus-visible')).toBe(true)
			readings[`${id} ${forced ? 'forced' : 'normal'}`] = readPaint(button)
			button.blur()
		}
		await releaseMedia()
	}
	console.log(`TRET-FOCUS ${JSON.stringify({ declared, readings })}`)
})

it('reads every tertiary button in each mode and state', async () => {
	const readings: Record<string, Record<string, string>> = {}
	for (const mode of ['light', 'dark']) {
		for (const variant of ['btn-tertiary', 'btn-outline-tertiary']) {
			const name = `${variant} ${mode}`
			const button = requireValue(
				scene
					.mount(`<div data-bs-theme="${mode}"><button class="btn ${variant}">${name}</button></div>`)
					.querySelector('button'),
				name,
			)
			await stageMedia({ motion: false })
			readings[`${name} rest`] = readPaint(button)
			button.focus()
			await pressKeys('{ArrowRight}')
			readings[`${name} focus`] = readPaint(button)
			await hoverAccessible(name)
			readings[`${name} hover`] = readPaint(button)
			await holdAccessible(name)
			readings[`${name} active`] = readPaint(button)
			await releasePointer()
			button.blur()
			button.disabled = true
			readings[`${name} disabled`] = readPaint(button)
			readings[`${name} tokens`] = Object.fromEntries(
				['base', 'emphasis', 'subtle', 'border', 'rgb'].map((tier) => [
					tier,
					readToken(button, `--vn-color-tertiary-${tier}`),
				]),
			)
			await releaseMedia()
			scene.clear()
		}
	}
	console.log(`TRET-BUTTON ${JSON.stringify(readings)}`)
})
