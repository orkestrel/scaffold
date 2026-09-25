// Flow-margin probe for unit E-ID-FLOW: renders the flow tags and the heading classes in Veneer's
// built cascade and in Bootstrap 5.3.8's, at 390 and 1280 pixels, and prints each margin and the
// block position of every element on both sides, then the rows where the two differ. A final pass
// doubles `--vn-factor-density` on the Veneer page.
import { chromium } from '/home/user/veneer-flow/node_modules/playwright/index.mjs'
const cascades = {
	veneer: '/home/user/veneer-flow/dist/src/styles/index.css',
	bootstrap: '/home/user/veneer-flow/node_modules/bootstrap/dist/css/bootstrap.css',
}
const markup =
	'<h1>One</h1><h2>Two</h2><h3>Three</h3><h4>Four</h4><h5>Five</h5><h6>Six</h6>' +
	'<div class="h1">One</div><div class="h2">Two</div><div class="h3">Three</div><div class="h4">Four</div><div class="h5">Five</div><div class="h6">Six</div>' +
	'<p>Paragraph</p><address>Address</address><ol><li>Entry</li></ol><ul><li>Entry</li></ul>' +
	'<p class="mb-0">Utility</p><ul class="list-unstyled"><li>Entry</li></ul><p>After</p>'
const read = () =>
	[...document.body.children].map((node) => {
		const style = getComputedStyle(node)
		return {
			tag: `${node.localName}${node.className ? '.' + node.className.replace(/ /g, '.') : ''}`,
			top: style.marginTop,
			bottom: style.marginBottom,
		}
	})
const browser = await chromium.launch({
	executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
for (const width of [390, 1280]) {
	const readings = {}
	for (const [cascade, path] of Object.entries(cascades)) {
		const page = await browser.newPage({ viewport: { width, height: 800 } })
		await page.setContent(`<!doctype html><html><head></head><body>${markup}</body></html>`)
		await page.addStyleTag({ path })
		readings[cascade] = await page.evaluate(read)
		if (cascade === 'veneer') {
			await page.evaluate(() =>
				document.documentElement.style.setProperty('--vn-factor-density', '2'),
			)
			readings.doubled = await page.evaluate(read)
		}
		await page.close()
	}
	console.log(`## @${width}`)
	readings.veneer.forEach((v, i) => {
		const b = readings.bootstrap[i]
		const d = readings.doubled[i]
		const same = v.top === b.top && v.bottom === b.bottom ? 'same' : 'DIFFERS'
		console.log(
			`  ${v.tag}: veneer ${v.top} ${v.bottom} | bootstrap ${b.top} ${b.bottom} | ${same} | veneer at density 2 ${d.top} ${d.bottom}`,
		)
	})
}
await browser.close()
