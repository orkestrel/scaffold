// Captures every outline button at rest, and disabled, over AP-COLOR's built cascade (/home/user/veneer-apc, unit/apc)
// in the host's Chromium 141, in light and dark at 390 and 1280 CSS pixels, on the page canvas. It settles the audit's
// rendered claim that an outline border stays on the fill while its label takes the on-canvas tier. Writes
// apc-outline-rest--<mode>-<width>.png beside itself, under reduced motion and after a settle wait so no transition is mid-way, and logs each button's computed label and border colors.
import { readFileSync } from 'node:fs'
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
const here = '/home/user/scaffold/.orkestrel/veneer/units/appearance-instruments'
const css = readFileSync('/home/user/veneer-apc/dist/src/styles/index.css', 'utf8')
const roles = ['primary', 'secondary', 'tertiary', 'success', 'info', 'warning', 'danger', 'light', 'dark']
const rows = roles.map((role) => `<div class="mb-2"><button class="btn btn-outline-${role}">Outline ${role}</button> <button class="btn btn-outline-${role}" disabled>Disabled ${role}</button></div>`).join('')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
console.log(JSON.stringify({ browser: browser.version() }))
for (const width of [390, 1280]) {
	const page = await browser.newPage({ viewport: { width, height: 700 }, reducedMotion: 'reduce' })
	await page.setContent(`<!doctype html><html><head></head><body><main class="p-3">${rows}</main></body></html>`)
	await page.addStyleTag({ content: css })
	for (const mode of ['light', 'dark']) {
		await page.evaluate((m) => document.documentElement.setAttribute('data-bs-theme', m), mode)
		await page.waitForTimeout(600)
		const read = await page.evaluate(() => [...document.querySelectorAll('button:not([disabled])')].map((b) => [b.textContent, getComputedStyle(b).color, getComputedStyle(b).borderTopColor]))
		console.log(JSON.stringify({ mode, width, read }))
		await page.locator('main').screenshot({ path: `${here}/apc-outline-rest--${mode}-${width}.png` })
	}
	await page.close()
}
await browser.close()
