// Breadth probe for the E-IDENTITY design round: renders each Bootstrap-documented fixture in Veneer's built cascade
// and in Bootstrap 5.3.8's, at 390 and 1280 pixels, and prints every reading where the two differ.
import { chromium } from '/home/user/veneer-read/node_modules/playwright/index.mjs'
const cascades = {
	veneer: '/home/user/veneer-read/dist/src/styles/index.css',
	bootstrap: '/home/user/veneer-read/node_modules/bootstrap/dist/css/bootstrap.css',
}
const fixtures = {
	'repeated definitions': '<dl><dt>Term</dt><dd>Definition</dd><dd>Alternative</dd><dt>Next</dt><dd>Value</dd></dl><p>After</p>',
	'nested horizontal list': '<div class="container"><dl class="row"><dt class="col-sm-3 text-truncate">Long terminology that truncates here</dt><dd class="col-sm-9"><dl class="row"><dt class="col-sm-4">Inner</dt><dd class="col-sm-8">Value</dd></dl></dd></dl></div>',
	'sourced quotation': '<figure class="text-center"><blockquote class="blockquote"><p>Quoted words.</p></blockquote><figcaption class="blockquote-footer">Source</figcaption></figure><p>After</p>',
	'end-aligned quotation': '<figure class="text-end"><blockquote class="blockquote"><p>Quoted words.</p></blockquote><figcaption class="blockquote-footer">Source</figcaption></figure><p>After</p>',
	'preformatted code': '<pre><code>alpha\nbeta</code></pre><p>After</p>',
	'long preformatted line': '<pre><code>' + 'x'.repeat(400) + '</code></pre><p>After</p>',
	'linked code': '<p><a href="#target"><code>identifier</code></a></p>',
	'keyboard composition': '<p>Press <kbd><kbd>Ctrl</kbd> + <kbd>,</kbd></kbd></p>',
	'inline code and output': '<p>Read <code>identifier</code> then <samp>program output</samp>.</p>',
	'rule customization': '<div class="text-success"><hr></div><hr class="border border-danger border-2 opacity-50"><p>After</p>',
	'native toggle': '<input class="btn-check" type="checkbox" id="choice" autocomplete="off"><label class="btn btn-primary" for="choice">Choice</label>',
}
const props = ['display', 'gap', 'margin', 'padding', 'border-top-width', 'border-left-width', 'font-size', 'font-style', 'font-weight', 'color', 'background-color', 'opacity', 'line-height']
const read = () => [...document.body.querySelectorAll('*')].map((node, index) => {
	const box = node.getBoundingClientRect()
	const style = getComputedStyle(node)
	const reading = { tag: `${index}:${node.localName}${node.className ? '.' + String(node.className).replace(/ /g, '.') : ''}`, x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.width), h: Math.round(box.height) }
	for (const p of window.PROPS) reading[p] = style.getPropertyValue(p)
	return reading
})
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
for (const [name, markup] of Object.entries(fixtures)) {
	for (const width of [390, 1280]) {
		const readings = {}
		for (const [cascade, path] of Object.entries(cascades)) {
			const page = await browser.newPage({ viewport: { width, height: 800 } })
			await page.setContent(`<!doctype html><html><head></head><body style="margin:0">${markup}</body></html>`)
			await page.addStyleTag({ path })
			await page.evaluate((p) => { window.PROPS = p }, props)
			readings[cascade] = await page.evaluate(read)
			await page.close()
		}
		const diffs = []
		readings.veneer.forEach((v, i) => {
			const b = readings.bootstrap[i]
			for (const key of Object.keys(v)) if (key !== 'tag' && v[key] !== b[key]) diffs.push(`${v.tag} ${key}: veneer ${v[key]} | bootstrap ${b[key]}`)
		})
		console.log(`## ${name} @${width}: ${diffs.length === 0 ? 'identical' : ''}`)
		for (const d of diffs) console.log('  ' + d)
	}
}
await browser.close()
