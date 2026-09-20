// Orchestrator probe: list the candidate specimen elements on each showcase route so the
// calibration reaches can be made unique, and read the full failure of the modal open click.
import { chromium } from 'file:///C:/Users/mikes/WebstormProjects/scaffold/node_modules/playwright/index.mjs'

const BASE = 'file:///C:/Users/mikes/WebstormProjects/elements/dist/showcase/index.html'
const ROUTES = [
	['#/dialog-element/dialog-element-open-modes', 'dialog, button'],
	['#/details/details-bare', 'details, summary'],
	['#/popover-surfaces/popover-surfaces-auto', '[popover], button'],
	['#/popover-surfaces/popover-surfaces-hint', '[popover], button, [popovertarget]'],
	['#/aside/aside-popover', 'aside[popover], button'],
	['#/button/button-states', 'button[disabled]'],
	['#/button/button-bare', 'button'],
]
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1100, height: 800 } })
for (const [route, selector] of ROUTES) {
	await page.goto(BASE + route)
	await page.waitForTimeout(800)
	const rows = await page.evaluate((query) => {
		const main = document.querySelector('main') ?? document.body
		return Array.from(main.querySelectorAll(query)).map((element) => ({
			tag: element.tagName.toLowerCase(),
			id: element.id || undefined,
			className: element.className || undefined,
			popover: element.getAttribute('popover') ?? undefined,
			target: element.getAttribute('popovertarget') ?? undefined,
			text: (element.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 50),
			section: element.closest('section')?.id,
		}))
	}, selector)
	console.log('## ' + route)
	for (const row of rows) console.log(JSON.stringify(row))
}
await page.goto(BASE + '#/dialog-element/dialog-element-open-modes')
await page.waitForTimeout(800)
try {
	await page.getByRole('button', { name: 'Open modal', exact: true }).click({ timeout: 4000 })
	console.log('modal click ok; open dialogs:', await page.locator('dialog[open]').count())
	await page.keyboard.press('Escape')
} catch (error) {
	console.log('modal click failed:\n' + String(error).slice(0, 1500))
}
await browser.close()
