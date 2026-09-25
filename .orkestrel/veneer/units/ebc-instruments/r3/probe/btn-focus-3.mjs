// Probe (round 3): reads `outline-offset`, `outline-style`, and `outline-width` on a keyboard-focused
// `button.btn` and `a.btn` under four stylesheets: the built Veneer cascade, the pre-change Veneer
// cascade, Bootstrap 5.3.8's own stylesheet, and no stylesheet. It also reads the same pair with no
// class, so the user agent's own focus rules show on their own.
// Usage: node tmp/units/ebc-probe/btn-focus-3.mjs
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'

const sheets = [
	['veneer', readFileSync('dist/src/styles/index.css', 'utf8')],
	['veneer before', readFileSync('tmp/units/ebc-probe/before.css', 'utf8')],
	['release', readFileSync('node_modules/bootstrap/dist/css/bootstrap.css', 'utf8')],
	['none', ''],
]
const browser = await chromium.launch({
	executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
for (const [label, css] of sheets) {
	const page = await browser.newPage()
	await page.emulateMedia({ reducedMotion: 'reduce' })
	await page.setContent(
		`<style>${css}</style><div style="padding: 20px"><button type="button" class="btn btn-primary">Harbor</button><a href="#harbor" class="btn btn-primary">Harbor</a><button type="button">Plain</button><a href="#harbor">Plain</a></div>`,
	)
	const rows = []
	for (const selector of ['button.btn', 'a.btn', 'button:not(.btn)', 'a:not(.btn)']) {
		await page.focus(selector)
		await page.keyboard.press('ArrowRight')
		rows.push(
			await page.$eval(selector, (element) => {
				const style = getComputedStyle(element)
				return `${element.matches(':focus-visible')} offset ${style.outlineOffset} style ${style.outlineStyle} width ${style.outlineWidth}`
			}),
		)
		await page.$eval(selector, (element) => element.blur())
	}
	console.log(`${label}: button.btn ${rows[0]} | a.btn ${rows[1]} | button ${rows[2]} | a ${rows[3]}`)
	await page.close()
}
await browser.close()
