// Orchestrator probe: what the Elements showcase exposes for the theme switch, so the calibration
// instrument's setMode wait can be corrected from a reading rather than a guess.
import { chromium } from 'file:///C:/Users/mikes/WebstormProjects/scaffold/node_modules/playwright/index.mjs'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1100, height: 800 } })
await page.goto('file:///C:/Users/mikes/WebstormProjects/elements/dist/showcase/index.html#/button/button-bare')
await page.waitForTimeout(1000)
const before = await page.evaluate(() => ({
	mode: document.documentElement.getAttribute('data-mode'),
	theme: document.documentElement.getAttribute('data-theme'),
	html: Array.from(document.documentElement.attributes).map((a) => `${a.name}=${a.value}`),
	buttons: Array.from(document.querySelectorAll('button')).slice(0, 12).map((b) => ({ text: b.textContent?.trim(), label: b.getAttribute('aria-label'), pressed: b.getAttribute('aria-pressed') })),
	combos: Array.from(document.querySelectorAll('select')).map((s) => ({ label: s.getAttribute('aria-label'), value: s.value, options: Array.from(s.options).map((o) => o.value) })),
	saveButton: document.querySelector('main button')?.outerHTML.slice(0, 200),
}))
console.log(JSON.stringify(before, null, 2))
const toggle = page.getByRole('button', { name: /Switch theme/ })
console.log('toggle count', await toggle.count())
if ((await toggle.count()) > 0) {
	await toggle.first().click()
	await page.waitForTimeout(500)
	const after = await page.evaluate(() => ({
		mode: document.documentElement.getAttribute('data-mode'),
		theme: document.documentElement.getAttribute('data-theme'),
		html: Array.from(document.documentElement.attributes).map((a) => `${a.name}=${a.value}`),
	}))
	console.log(JSON.stringify(after, null, 2))
}
await browser.close()
