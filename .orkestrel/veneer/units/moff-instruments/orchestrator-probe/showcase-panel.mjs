// Settles E-ID-MOTION-OFFCANVAS claim 5's showcase half: renders the showcase's "Navbar with offcanvas" specimen
// markup (app/browser/constants.ts, copied verbatim) over the unit's built cascade (dist/src/styles/index.css at
// 73cd4f0) in Chromium 141, and reads the panel's computed opacity, visibility, and transition at 1280 and 390, with a
// control that drops the `show` class.
import { readFileSync } from 'node:fs'
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
const css = readFileSync('/home/user/veneer-moff/dist/src/styles/index.css', 'utf8')
const source = readFileSync('/home/user/veneer-moff/app/browser/constants.ts', 'utf8')
const start = source.indexOf("name: 'Navbar with offcanvas'")
const quote = source.indexOf("'<div", start)
const markup = source.slice(quote + 1, source.indexOf("',", quote))
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
for (const width of [1280, 390]) {
	for (const variant of ['specimen', 'control without show']) {
		const page = await browser.newPage({ viewport: { width, height: 800 } })
		const html = variant === 'specimen' ? markup : markup.replace('offcanvas offcanvas-end show', 'offcanvas offcanvas-end')
		await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body>${html}</body></html>`)
		const reading = await page.evaluate(() => {
			const panel = document.querySelector('#navbar-offcanvas')
			const style = getComputedStyle(panel)
			return { classes: panel.className, opacity: style.opacity, visibility: style.visibility, transform: style.transform, position: style.position, transition: style.transitionProperty + ' ' + style.transitionDuration }
		})
		console.log(`ROW width=${width} ${variant} ${JSON.stringify(reading)}`)
		await page.close()
	}
}
console.log(`BUILD ${browser.version()} markup-length=${markup.length}`)
await browser.close()
