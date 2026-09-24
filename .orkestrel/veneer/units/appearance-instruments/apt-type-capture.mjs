// Captures the heading elements, the display classes, the size utilities, and a bare fieldset legend over AP-TYPE's
// built cascade (/home/user/veneer-apt, unit/apt) in the host's Chromium 141, in light and dark at 390 and 1280 CSS
// pixels, under reduced motion. It settles the audit's rendered claim for the display classes and the legend, which no
// journey frame renders. Writes apt-type--<mode>-<width>.png beside itself and logs each specimen's computed font size and
// whether its box overflows the page.
import { readFileSync } from 'node:fs'
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
const here = '/home/user/scaffold/.orkestrel/veneer/units/appearance-instruments'
const css = readFileSync('/home/user/veneer-apt/dist/src/styles/index.css', 'utf8')
const levels = [1, 2, 3, 4, 5, 6]
const body = [
	...levels.map((n) => `<h${n} id="h${n}">Heading ${n}</h${n}>`),
	...levels.map((n) => `<p class="display-${n}" id="d${n}">Display ${n}</p>`),
	...levels.map((n) => `<p class="fs-${n}" id="f${n}">Size ${n}</p>`),
	'<fieldset><legend id="lg">Legend</legend><p>Body text beside the legend.</p></fieldset>',
].join('')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
console.log(JSON.stringify({ browser: browser.version() }))
for (const width of [390, 1280]) {
	const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
	await page.setContent(`<!doctype html><html><head></head><body><main class="p-3">${body}</main></body></html>`)
	await page.addStyleTag({ content: css })
	for (const mode of ['light', 'dark']) {
		await page.evaluate((m) => document.documentElement.setAttribute('data-bs-theme', m), mode)
		await page.waitForTimeout(400)
		const read = await page.evaluate(() => [...document.querySelectorAll('main [id]')].map((e) => [e.id, getComputedStyle(e).fontSize, e.scrollWidth > e.clientWidth]))
		console.log(JSON.stringify({ mode, width, pageOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), read }))
		await page.screenshot({ path: `${here}/apt-type--${mode}-${width}.png`, fullPage: true })
	}
	await page.close()
}
await browser.close()
