// appearance-fluid-arithmetic: the APPEARANCE design round's objective-lane probe. Measures whether Chromium 141
// resolves the fluid size expression S - 0.9D + (D / 1rem) * 1.2vw, with D = max(0rem, S - 1.25rem), from a live custom
// property S, including the length-by-length division, at 390, 1199, 1200, and 1280 CSS pixels, for default and retuned
// tokens and a changed root size; then compiles the same expression through the installed Sass and reads it again.
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
import * as sass from '/home/user/veneer/node_modules/sass/sass.node.mjs'
const RAW = 'calc(var(--s) - 0.9 * max(0rem, var(--s) - 1.25rem) + (max(0rem, var(--s) - 1.25rem) / 1rem) * 1.2vw)'
const compiled = sass.compileString(`.probe { font-size: ${RAW}; }`).css
const fromSass = compiled.match(/font-size:\s*([^;]+);/)[1]
console.log(JSON.stringify({ sassOutput: fromSass }))
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const cases = [['2.25rem', '16px'], ['101px', '16px'], ['1.25rem', '16px'], ['1rem', '16px'], ['5rem', '16px'], ['2.25rem', '20px']]
for (const source of [['raw', RAW], ['sass', fromSass]]) {
	for (const width of [390, 1199, 1200, 1280]) {
		const page = await browser.newPage({ viewport: { width, height: 800 } })
		await page.setContent('<!doctype html><html><head></head><body></body></html>')
		const out = await page.evaluate(([expr, cases]) => {
			return cases.map(([s, root]) => {
				document.documentElement.style.fontSize = root
				const el = document.createElement('div')
				el.style.setProperty('--s', s)
				el.style.fontSize = expr
				document.body.append(el)
				const size = getComputedStyle(el).fontSize
				const accepted = el.style.fontSize !== ''
				el.remove()
				return { s, root, accepted, size }
			})
		}, [source[1], cases])
		console.log(JSON.stringify({ source: source[0], width, out }))
		await page.close()
	}
}
await browser.close()
