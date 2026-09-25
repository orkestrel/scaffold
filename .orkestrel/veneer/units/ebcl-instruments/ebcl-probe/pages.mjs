// Probe: reads each button-built class's button form beside its non-button form under one holder,
// at rest, hovered, pressed, under keyboard focus, and disabled, once on a page carrying the built
// Veneer cascade and once on a page carrying Bootstrap 5.3.8's own stylesheet, and prints, per
// class and state, the longhands where the two forms resolve apart on each page.
// Usage: node tmp/units/ebcl-probe/pages.mjs [veneer css path]
// Reads the cases and the holder the proof reads (cases.json, holder.txt, both extracted from
// tests/setupStyles.ts), honours each case's disabled pairing, skips custom properties, and writes
// pages.json: per case, per cascade, per state, the button form's value on each longhand it
// resolves apart from its counterpart.
import { readFileSync, writeFileSync } from 'node:fs'
import { chromium } from 'playwright'

const veneer = readFileSync(process.argv[2] ?? 'dist/src/styles/index.css', 'utf8')
const release = readFileSync('node_modules/bootstrap/dist/css/bootstrap.css', 'utf8')
const holder = readFileSync(new URL('./holder.txt', import.meta.url), 'utf8').trim()
const scope = 'all'
const surface = [
	'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'font-family', 'font-size',
	'font-weight', 'line-height', 'color', 'background-color', 'border-top-width', 'border-top-style',
	'border-top-color', 'border-top-left-radius', 'box-shadow', 'outline-style', 'outline-width',
	'outline-color', 'outline-offset', 'opacity', 'pointer-events', 'transition-property',
	'transition-duration', 'transition-timing-function', 'cursor',
]
// Each class: the markup of its button form and its non-button form, and the selector that finds
// the element read inside each.
const forms = JSON.parse(readFileSync(new URL('./cases.json', import.meta.url), 'utf8'))
const browser = await chromium.launch({
	executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})

async function readSide(css) {
	const out = {}
	for (const { name, button, other, target, paired } of forms) {
		const page = await browser.newPage()
		await page.setContent(
			`<!doctype html><html><head><style>${css}</style></head><body><div style="${holder}; padding: 20px"><div data-side="button">${button}</div><div data-side="other" style="margin-top: 40px">${other}</div></div></body></html>`,
		)
		const read = (state) =>
			page.evaluate(
				([target, state, scope, surface]) => {
					const pick = (side) => document.querySelector(`[data-side="${side}"] ${target}`)
					const b = pick('button')
					const o = pick('other')
					const names = (scope === 'all' ? Array.from(getComputedStyle(b)) : surface).filter((n) => !n.startsWith('--'))
					const diff = {}
					for (const n of names) {
						const x = getComputedStyle(b).getPropertyValue(n)
						const y = getComputedStyle(o).getPropertyValue(n)
						if (x !== y) diff[n] = x
					}
					return { state, diff }
				},
				[target, state, scope, surface],
			)
		const result = [await read('rest')]
		await page.emulateMedia({ reducedMotion: 'reduce' })
		const states = {}
		for (const state of ['hovered', 'pressed', 'focused', 'disabled']) states[state] = {}
		for (const side of ['button', 'other']) {
			const sel = `[data-side="${side}"] ${target}`
			const snap = () =>
				page.evaluate(
					([s, scope, surface]) => {
						const e = document.querySelector(s)
						const names = (scope === 'all' ? Array.from(getComputedStyle(e)) : surface).filter((n) => !n.startsWith('--'))
						return Object.fromEntries(names.map((n) => [n, getComputedStyle(e).getPropertyValue(n)]))
					},
					[sel, scope, surface],
				)
			await page.hover(sel, { force: true })
			if (!(await page.evaluate((s) => document.querySelector(s).matches(':hover'), sel)))
				throw new Error(`${name} ${side} hover`)
			states.hovered[side] = await snap()
			await page.mouse.down()
			if (!(await page.evaluate((s) => document.querySelector(s).matches(':active'), sel)))
				throw new Error(`${name} ${side} active`)
			states.pressed[side] = await snap()
			await page.mouse.up()
			await page.mouse.move(0, 0)
			await page.evaluate((s) => {
				const e = document.querySelector(s)
				e.blur()
				e.focus()
			}, sel)
			await page.keyboard.press('Shift')
			if (!(await page.evaluate((s) => document.querySelector(s).matches(':focus-visible'), sel)))
				throw new Error(`${name} ${side} focus-visible`)
			states.focused[side] = await snap()
			await page.evaluate(([s, paired]) => {
				const e = document.querySelector(s)
				e.blur()
				if (e instanceof HTMLButtonElement) e.disabled = true
				else if (paired) {
					e.classList.add('disabled')
					e.setAttribute('aria-disabled', 'true')
				}
			}, [sel, paired])
			states.disabled[side] = await snap()
		}
		for (const [state, sides] of Object.entries(states)) {
			const diff = {}
			for (const n of Object.keys(sides.button))
				if (sides.button[n] !== sides.other[n]) diff[n] = sides.button[n]
			result.push({ state, diff })
		}
		out[name] = result
		await page.close()
	}
	return out
}

const v = await readSide(veneer)
const b = await readSide(release)
const out = {}
for (const { name } of forms)
	out[name] = {
		veneer: Object.fromEntries(v[name].map(({ state, diff }) => [state, diff])),
		release: Object.fromEntries(b[name].map(({ state, diff }) => [state, diff])),
	}
writeFileSync(new URL('./pages.json', import.meta.url), JSON.stringify(out, null, 1))
await browser.close()
