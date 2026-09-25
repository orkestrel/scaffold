// Flow-margin probe for unit E-ID-FLOW-2: renders `dl`, `pre`, `hr`, and `figure`, Bootstrap's
// attributed quotation, and Bootstrap's `.figure` pattern in Veneer's built cascade and in Bootstrap
// 5.3.8's, at 390 and 1280 pixels. It prints each tag's block margins, then for each figure pattern
// the figure box height and the distance from the figure's top and bottom edges to the following
// paragraph. A final pass doubles `--vn-factor-density` on the Veneer page.
import { chromium } from '/home/user/veneer-flow2/node_modules/playwright/index.mjs'
const cascades = {
	veneer: '/home/user/veneer-flow2/dist/src/styles/index.css',
	bootstrap: '/home/user/veneer-flow2/node_modules/bootstrap/dist/css/bootstrap.css',
}
const image =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='160'%3E%3C/svg%3E"
const markup =
	'<div id="tags"><dl><dt>Term</dt><dd>Description</dd></dl><pre>code</pre><hr><figure><figcaption>Caption</figcaption></figure><dl class="mb-0"><dt>Term</dt><dd>Utility</dd></dl><p>After</p></div>' +
	'<div class="case" data-name="quotation, bare"><figure><blockquote class="blockquote"><p>Quoted words.</p></blockquote><figcaption class="blockquote-footer">Source</figcaption></figure><p>Following</p></div>' +
	'<div class="case" data-name="quotation, text-center"><figure class="text-center"><blockquote class="blockquote"><p>Quoted words.</p></blockquote><figcaption class="blockquote-footer">Source</figcaption></figure><p>Following</p></div>' +
	'<div class="case" data-name="quotation, fixed heights"><figure><blockquote class="blockquote"><p style="height: 30px">Quoted words.</p></blockquote><figcaption class="blockquote-footer" style="height: 20px">Source</figcaption></figure><p>Following</p></div>' +
	`<div class="case" data-name=".figure pattern"><figure class="figure"><img alt="Figure" width="120" height="80" src="${image}" class="figure-img img-fluid rounded"><figcaption class="figure-caption">A caption for the image.</figcaption></figure><p>Following</p></div>` +
	`<div class="case" data-name=".figure pattern, fixed caption"><figure class="figure"><img alt="Figure" width="120" height="80" src="${image}" class="figure-img img-fluid rounded"><figcaption class="figure-caption" style="height: 20px">Caption</figcaption></figure><p>Following</p></div>`
const read = () => ({
	tags: [...document.querySelector('#tags').children].map((node) => {
		const style = getComputedStyle(node)
		return {
			tag: `${node.localName}${node.className ? '.' + node.className.replace(/ /g, '.') : ''}`,
			top: style.marginTop,
			bottom: style.marginBottom,
		}
	}),
	cases: [...document.querySelectorAll('.case')].map((node) => {
		const figure = node.querySelector('figure').getBoundingClientRect()
		const next = node.querySelector('figure + p').getBoundingClientRect()
		return {
			name: node.dataset.name,
			height: figure.height.toFixed(2),
			fromTop: (next.top - figure.top).toFixed(2),
			fromBottom: (next.top - figure.bottom).toFixed(2),
			margin: getComputedStyle(node.querySelector('figure')).marginBottom,
		}
	}),
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
		await page.evaluate(() => Promise.all([...document.images].map((node) => node.decode())))
		readings[cascade] = await page.evaluate(read)
		if (cascade === 'veneer') {
			await page.evaluate(() =>
				document.documentElement.style.setProperty('--vn-factor-density', '2'),
			)
			readings.doubled = await page.evaluate(read)
		}
		await page.close()
	}
	console.log(`## @${width}: tag margins (top bottom)`)
	readings.veneer.tags.forEach((v, i) => {
		const b = readings.bootstrap.tags[i]
		const d = readings.doubled.tags[i]
		const same = v.top === b.top && v.bottom === b.bottom ? 'same' : 'DIFFERS'
		console.log(
			`  ${v.tag}: veneer ${v.top} ${v.bottom} | bootstrap ${b.top} ${b.bottom} | ${same} | veneer at density 2 ${d.top} ${d.bottom}`,
		)
	})
	console.log(`## @${width}: following paragraph (figure height, next top from figure top, from figure bottom, figure margin-bottom)`)
	readings.veneer.cases.forEach((v, i) => {
		const b = readings.bootstrap.cases[i]
		const d = readings.doubled.cases[i]
		const same = v.fromBottom === b.fromBottom ? 'same gap' : 'GAP DIFFERS'
		console.log(
			`  ${v.name}: veneer ${v.height} ${v.fromTop} ${v.fromBottom} ${v.margin} | bootstrap ${b.height} ${b.fromTop} ${b.fromBottom} ${b.margin} | ${same} | veneer at density 2 ${d.height} ${d.fromTop} ${d.fromBottom} ${d.margin}`,
		)
	})
}
await browser.close()
