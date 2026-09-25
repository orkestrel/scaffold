// E-ID-LAYOUT round 4 probe. Renders each fixture in Veneer's built cascade
// (/home/user/veneer-eil/dist/src/styles/index.css) and in Bootstrap 5.3.8's, at the named widths, and prints each
// element's box and the properties the round moves, side by side. Run: node tmp/units/eil-4-probe.mjs
// Negative control: CONTROL=flex node tmp/units/eil-4-probe.mjs adds `figure { display: flex; flex-direction: column }`
// to Veneer's page only and runs the attributed quotation fixtures, so the instrument must report the flex figure's box.
import { chromium } from '/home/user/veneer-eil/node_modules/playwright/index.mjs'
const cascades = {
	veneer: '/home/user/veneer-eil/dist/src/styles/index.css',
	bootstrap: '/home/user/veneer-eil/node_modules/bootstrap/dist/css/bootstrap.css',
}
const image =
	'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%2780%27%3E%3C/svg%3E'
const quotation = (attribute, text, footer) =>
	`<figure${attribute}><blockquote class="blockquote"><p${text}>Quoted words.</p></blockquote><figcaption class="blockquote-footer"${footer}>Source</figcaption></figure><p>Following words.</p>`
const both = [390, 1280]
const fixtures = [
	['bare list', '<dl style="width: 520px"><dt>A</dt><dt>B</dt><dd>Shared</dd><dt>C</dt><dd>One</dd><dd>Two</dd></dl>', both],
	['utility-classed list', '<dl class="mb-0" style="width: 520px"><dt>Term</dt><dd>Description</dd></dl>', both],
	[
		'horizontal description list',
		'<div class="container"><dl class="row"><dt class="col-sm-3">Term</dt><dd class="col-sm-9">Definition</dd><dt class="col-sm-3">Second</dt><dd class="col-sm-9">Another</dd></dl></div>',
		[390, 575, 576, 1280],
	],
	['bare quotation', '<blockquote><p>Quoted words.</p></blockquote>', both],
	['utility-classed quotation', '<blockquote class="mb-0"><p>Quoted words.</p></blockquote>', both],
	['class quotation', '<blockquote class="blockquote"><p>Quoted words.</p></blockquote>', both],
	['attributed quotation, then a paragraph', quotation('', '', ''), both],
	['centered attributed quotation, then a paragraph', quotation(' class="text-center"', '', ''), both],
	['end-aligned attributed quotation, then a paragraph', quotation(' class="text-end"', '', ''), both],
	[
		'fixed-geometry attributed quotation (text 30px, footer 20px), then a paragraph',
		quotation('', ' style="height: 30px"', ' style="height: 20px"'),
		both,
	],
	[
		'fixed-geometry centered attributed quotation, then a paragraph',
		quotation(' class="text-center"', ' style="height: 30px"', ' style="height: 20px"'),
		both,
	],
	[
		'fixed-geometry end-aligned attributed quotation, then a paragraph',
		quotation(' class="text-end"', ' style="height: 30px"', ' style="height: 20px"'),
		both,
	],
	['captioned image', `<figure><img alt="Box" width="120" height="80" src="${image}"><figcaption>Caption</figcaption></figure>`, both],
	[
		'captioned image in a d-block figure',
		`<figure class="d-block"><img alt="Box" width="120" height="80" src="${image}"><figcaption>Caption</figcaption></figure>`,
		both,
	],
	[
		'figure class pattern',
		`<figure class="figure"><img alt="Box" width="120" height="80" src="${image}" class="figure-img img-fluid rounded"><figcaption class="figure-caption">A caption for the image.</figcaption></figure>`,
		both,
	],
	[
		'figure class pattern, end-aligned caption',
		`<figure class="figure"><img alt="Box" width="120" height="80" src="${image}" class="figure-img img-fluid rounded"><figcaption class="figure-caption text-end">A caption for the image.</figcaption></figure>`,
		both,
	],
	[
		'figure class around a swatch (the showcase swatch markup)',
		'<div style="width: 200px"><figure class="figure w-100"><div class="ratio ratio-4x3 bg-success"></div><figcaption class="figure-caption">bg-success</figcaption></figure></div>',
		both,
	],
]
const props = [
	'display',
	'flex-direction',
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
const control = process.env.CONTROL === 'flex'
for (const [name, markup, widths] of fixtures) {
	if (control && !name.includes('attributed quotation')) continue
	for (const width of widths) {
		console.log(`## ${name} @${width}`)
		for (const [cascade, path] of Object.entries(cascades)) {
			const page = await browser.newPage({ viewport: { width, height: 800 } })
			await page.setContent(`<!doctype html><html><head></head><body style="margin:0">${markup}</body></html>`)
			await page.addStyleTag({ path })
			if (control && cascade === 'veneer') await page.addStyleTag({ content: 'figure { display: flex; flex-direction: column }' })
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
