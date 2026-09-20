// Orchestrator probe: the DOM position of the two dialogs on the open-modes route, so the
// calibration instrument can reach each with a selector the DOM parses.
import { chromium } from 'file:///C:/Users/mikes/WebstormProjects/scaffold/node_modules/playwright/index.mjs'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1100, height: 800 } })
await page.goto('file:///C:/Users/mikes/WebstormProjects/elements/dist/showcase/index.html#/dialog-element/dialog-element-open-modes')
await page.waitForTimeout(800)
const rows = await page.evaluate(() => {
	const section = document.querySelector('section#dialog-element-open-modes')
	if (!section) return ['no section']
	return Array.from(section.querySelectorAll('dialog')).map((dialog) => {
		const parent = dialog.parentElement
		const siblings = parent ? Array.from(parent.children) : []
		const same = siblings.filter((node) => node.tagName === 'DIALOG')
		return {
			text: (dialog.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 30),
			parent: parent ? `${parent.tagName.toLowerCase()}#${parent.id}.${parent.className}` : 'none',
			childIndex: siblings.indexOf(dialog),
			dialogIndex: same.indexOf(dialog),
			id: dialog.id,
			className: dialog.className,
			buttons: Array.from(dialog.querySelectorAll('button')).map((b) => b.textContent?.trim()),
			candidates: [
				`section#dialog-element-open-modes dialog:nth-of-type(${same.indexOf(dialog) + 1})`,
			].map((selector) => ({ selector, matches: document.querySelectorAll(selector).length, first: document.querySelector(selector) === dialog })),
		}
	})
})
console.log(JSON.stringify(rows, null, 1))
await browser.close()
