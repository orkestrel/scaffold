// Probe (E-ID-LAYOUT round 2): does the Horizontal description list specimen overflow the Type region?
// Loads the showcase from the worktree's Vite dev server, reads the Type region's box, then reads the
// specimen's box and its `dl` box for the specimen as the page renders it and for each candidate markup
// injected beside it, at 390 and 1280 pixels. Also reads the document's horizontal scroll extent.
import { chromium } from '/home/user/veneer-eil/node_modules/playwright/index.mjs'
const url = process.argv[2] ?? 'http://localhost:5391/'
const pairs =
	'<dt class="col-sm-3">Term</dt><dd class="col-sm-9">A description beside its term.</dd><dt class="col-sm-3">Second term</dt><dd class="col-sm-9">Another description on the same line as its term.</dd>'
const candidates = {
	bare: `<dl class="row">${pairs}</dl>`,
	container: `<div class="container"><dl class="row">${pairs}</dl></div>`,
	fluid: `<div class="container-fluid"><dl class="row">${pairs}</dl></div>`,
}
const browser = await chromium.launch({
	executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
})
for (const width of [390, 1280]) {
	const page = await browser.newPage({ viewport: { width, height: 900 } })
	await page.goto(url)
	await page.waitForSelector('section[aria-label="Type"]')
	const reading = await page.evaluate((candidates) => {
		const round = (box) =>
			`left=${Math.round(box.left * 10) / 10} right=${Math.round(box.right * 10) / 10} w=${Math.round(box.width * 10) / 10}`
		const region = document.querySelector('section[aria-label="Type"]')
		const result = {
			document: `scrollWidth=${document.documentElement.scrollWidth} clientWidth=${document.documentElement.clientWidth}`,
			region: round(region.getBoundingClientRect()),
		}
		const shipped = region.querySelector('[data-specimen="Horizontal description list"]')
		if (shipped) {
			const dl = shipped.querySelector('dl')
			result.shipped = {
				specimen: round(shipped.getBoundingClientRect()),
				dl: round(dl.getBoundingClientRect()),
				inside:
					dl.getBoundingClientRect().left >= region.getBoundingClientRect().left - 0.5 &&
					dl.getBoundingClientRect().right <= region.getBoundingClientRect().right + 0.5,
				children: [...dl.children].map((node) => {
					const box = node.getBoundingClientRect()
					return `${node.localName} x=${Math.round(box.x)} y=${Math.round(box.y - dl.getBoundingClientRect().y)} w=${Math.round(box.width)}`
				}),
			}
		}
		for (const [name, markup] of Object.entries(candidates)) {
			const holder = document.createElement('div')
			holder.setAttribute('data-probe', name)
			holder.innerHTML = markup
			region.append(holder)
			const dl = holder.querySelector('dl')
			const box = dl.getBoundingClientRect()
			const outer = region.getBoundingClientRect()
			result[name] = {
				specimen: round(holder.getBoundingClientRect()),
				dl: round(box),
				inside: box.left >= outer.left - 0.5 && box.right <= outer.right + 0.5,
				document: `scrollWidth=${document.documentElement.scrollWidth}`,
				children: [...dl.children].map((node) => {
					const child = node.getBoundingClientRect()
					return `${node.localName} x=${Math.round(child.x)} y=${Math.round(child.y - box.y)} w=${Math.round(child.width)}`
				}),
			}
			holder.remove()
		}
		return result
	}, candidates)
	console.log(`@${width}`, JSON.stringify(reading, null, 1))
	await page.close()
}
await browser.close()
