// Probe: does Bootstrap's horizontal description list (dl.row with .col-sm-* children) lay out on one line in
// Veneer's built cascade as it does in Bootstrap 5.3.8's? Reads each dt and dd box at 1280px wide in both cascades.
import { chromium } from '/home/user/veneer-read/node_modules/playwright/index.mjs'
const cascades = {
	veneer: '/home/user/veneer-read/dist/src/styles/index.css',
	bootstrap: '/home/user/veneer-read/node_modules/bootstrap/dist/css/bootstrap.css',
}
const markup = `<div class="container"><dl class="row"><dt class="col-sm-3">Term</dt><dd class="col-sm-9">Definition</dd><dt class="col-sm-3">Second</dt><dd class="col-sm-9">Another</dd></dl></div>`
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
for (const [name, path] of Object.entries(cascades)) {
	const page = await browser.newPage({ viewport: { width: 1280, height: 600 } })
	await page.setContent(`<!doctype html><html><head></head><body>${markup}</body></html>`)
	await page.addStyleTag({ path })
	const reading = await page.evaluate(() => {
		const dl = document.querySelector('dl')
		const style = getComputedStyle(dl)
		const boxes = [...dl.children].map((node) => {
			const box = node.getBoundingClientRect()
			return `${node.localName} x=${Math.round(box.x)} y=${Math.round(box.y)} w=${Math.round(box.width)}`
		})
		return { display: style.display, gap: style.gap, columns: style.gridTemplateColumns, boxes }
	})
	console.log(name, JSON.stringify(reading))
	await page.close()
}
await browser.close()
