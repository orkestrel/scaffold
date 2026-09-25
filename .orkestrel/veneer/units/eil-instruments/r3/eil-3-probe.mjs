// E-ID-LAYOUT round 3 probe. Renders each fixture in Veneer's built cascade
// (/home/user/veneer-eil/dist/src/styles/index.css) and in Bootstrap 5.3.8's, at the named widths, and prints each
// element's box and the properties the round moves, side by side. Run: node tmp/units/eil-3-probe.mjs
import { chromium } from '/home/user/veneer-eil/node_modules/playwright/index.mjs'
const cascades = {
	veneer: '/home/user/veneer-eil/dist/src/styles/index.css',
	bootstrap: '/home/user/veneer-eil/node_modules/bootstrap/dist/css/bootstrap.css',
}
const image =
	'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%2780%27%3E%3C/svg%3E'
const fixtures = [
	['bare list', '<dl style="width: 520px"><dt>A</dt><dt>B</dt><dd>Shared</dd><dt>C</dt><dd>One</dd><dd>Two</dd></dl>', [390]],
	['utility-classed list', '<dl class="mb-0" style="width: 520px"><dt>Term</dt><dd>Description</dd></dl>', [390]],
	[
		'horizontal description list',
		'<div class="container"><dl class="row"><dt class="col-sm-3">Term</dt><dd class="col-sm-9">Definition</dd><dt class="col-sm-3">Second</dt><dd class="col-sm-9">Another</dd></dl></div>',
		[575, 576, 1280],
	],
	['bare quotation', '<blockquote><p>Quoted words.</p></blockquote>', [390]],
	['utility-classed quotation', '<blockquote class="mb-0"><p>Quoted words.</p></blockquote>', [390]],
	['class quotation', '<blockquote class="blockquote"><p>Quoted words.</p></blockquote>', [390]],
	[
		'attributed quotation',
		'<figure><blockquote class="blockquote"><p>Quoted words.</p></blockquote><figcaption class="blockquote-footer">Source</figcaption></figure>',
		[390, 1280],
	],
	[
		'centered attributed quotation',
		'<figure class="text-center"><blockquote class="blockquote"><p>Quoted words.</p></blockquote><figcaption class="blockquote-footer">Source</figcaption></figure>',
		[390],
	],
	[
		'end-aligned attributed quotation',
		'<figure class="text-end"><blockquote class="blockquote"><p>Quoted words.</p></blockquote><figcaption class="blockquote-footer">Source</figcaption></figure>',
		[390],
	],
	['captioned image', `<figure><img alt="Box" width="120" height="80" src="${image}"><figcaption>Caption</figcaption></figure>`, [390]],
	[
		'figure class pattern',
		`<figure class="figure"><img alt="Box" width="120" height="80" src="${image}" class="figure-img img-fluid rounded"><figcaption class="figure-caption">A caption for the image.</figcaption></figure>`,
		[390, 1280],
	],
	[
		'figure class pattern, end-aligned caption',
		`<figure class="figure"><img alt="Box" width="120" height="80" src="${image}" class="figure-img img-fluid rounded"><figcaption class="figure-caption text-end">A caption for the image.</figcaption></figure>`,
		[390],
	],
	[
		'figure class around a swatch (the showcase swatch markup)',
		'<div style="width: 200px"><figure class="figure w-100"><div class="ratio ratio-4x3 bg-success"></div><figcaption class="figure-caption">bg-success</figcaption></figure></div>',
		[390],
	],
]
const props = [
	'display',
	'gap',
	'margin',
	'padding',
	'border-left-width',
	'font-style',
	'grid-template-columns',
]
const read = () =>
	[...document.body.querySelectorAll('*')].map((node, index) => {
		const box = node.getBoundingClientRect()
		const style = getComputedStyle(node)
		const values = window.PROPS.map((p) => `${p}=${style.getPropertyValue(p)}`).join(' ')
		return `${index}:${node.localName}${node.className ? '.' + String(node.className).replace(/ /g, '.') : ''} x=${box.x.toFixed(2)} y=${box.y.toFixed(2)} w=${box.width.toFixed(2)} h=${box.height.toFixed(2)} bottom=${box.bottom.toFixed(2)} ${values}`
	})
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
for (const [name, markup, widths] of fixtures) {
	for (const width of widths) {
		console.log(`## ${name} @${width}`)
		for (const [cascade, path] of Object.entries(cascades)) {
			const page = await browser.newPage({ viewport: { width, height: 800 } })
			await page.setContent(`<!doctype html><html><head></head><body style="margin:0">${markup}</body></html>`)
			await page.addStyleTag({ path })
			await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode())))
			await page.evaluate((p) => {
				window.PROPS = p
			}, props)
			for (const line of await page.evaluate(read)) console.log(`  ${cascade.padEnd(9)} ${line}`)
			await page.close()
		}
	}
}
await browser.close()
