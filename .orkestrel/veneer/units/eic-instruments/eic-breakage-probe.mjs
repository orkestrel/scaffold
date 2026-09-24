// E-ID-CODE copy of the E-IDENTITY breakage probe: the code-family fixtures alone, against this worktree's rebuilt
// cascade and Bootstrap 5.3.8's, at 390 and 1280 pixels. It prints every reading where the two differ, then the
// child-against-parent relations each contextual rule governs, in both cascades.
import { chromium } from '/home/user/veneer-eic/node_modules/playwright/index.mjs'
const cascades = {
	veneer: '/home/user/veneer-eic/dist/src/styles/index.css',
	bootstrap: '/home/user/veneer-eic/node_modules/bootstrap/dist/css/bootstrap.css',
}
const fixtures = {
	'preformatted code': '<pre><code>alpha\nbeta</code></pre><p>After</p>',
	'long preformatted line': '<pre><code>' + 'x'.repeat(400) + '</code></pre><p>After</p>',
	'linked code': '<p><a href="#target"><code>identifier</code></a></p>',
	'keyboard composition': '<p>Press <kbd><kbd>Ctrl</kbd> + <kbd>,</kbd></kbd></p>',
	'inline code and output': '<p>Read <code>identifier</code> then <samp>program output</samp>.</p>',
}
const props = ['display', 'gap', 'margin', 'padding', 'border-top-width', 'border-left-width', 'font-size', 'font-style', 'font-weight', 'color', 'background-color', 'opacity', 'line-height']
const read = () => [...document.body.querySelectorAll('*')].map((node, index) => {
	const box = node.getBoundingClientRect()
	const style = getComputedStyle(node)
	const reading = { tag: `${index}:${node.localName}${node.className ? '.' + String(node.className).replace(/ /g, '.') : ''}`, x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.width), h: Math.round(box.height) }
	for (const p of window.PROPS) reading[p] = style.getPropertyValue(p)
	return reading
})
const relate = () => {
	const pixels = (node, p) => parseFloat(getComputedStyle(node).getPropertyValue(p))
	const color = (node) => getComputedStyle(node).color
	const lines = []
	for (const code of document.querySelectorAll('pre code')) {
		const pre = code.closest('pre')
		lines.push(`pre code font-size ${pixels(code, 'font-size')} / pre ${pixels(pre, 'font-size')}; color ${color(code) === color(pre) ? 'equal' : 'differs'}; word-break ${getComputedStyle(code).wordBreak}; padding ${getComputedStyle(code).padding}; background ${getComputedStyle(code).backgroundColor}`)
	}
	for (const code of document.querySelectorAll('a > code')) lines.push(`a > code color ${color(code) === color(code.parentElement) ? 'equal' : 'differs'} (${color(code)} / ${color(code.parentElement)})`)
	for (const key of document.querySelectorAll('kbd kbd')) {
		const outer = key.parentElement
		lines.push(`kbd kbd font-size ${pixels(key, 'font-size')} / outer ${pixels(outer, 'font-size')}; padding ${getComputedStyle(key).padding}; border-top-width ${getComputedStyle(key).borderTopWidth}; background ${getComputedStyle(key).backgroundColor}`)
	}
	return lines
}
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
for (const [name, markup] of Object.entries(fixtures)) {
	for (const width of [390, 1280]) {
		const readings = {}
		const relations = {}
		for (const [cascade, path] of Object.entries(cascades)) {
			const page = await browser.newPage({ viewport: { width, height: 800 } })
			await page.setContent(`<!doctype html><html><head></head><body style="margin:0">${markup}</body></html>`)
			await page.addStyleTag({ path })
			await page.evaluate((p) => { window.PROPS = p }, props)
			readings[cascade] = await page.evaluate(read)
			relations[cascade] = await page.evaluate(relate)
			await page.close()
		}
		const diffs = []
		readings.veneer.forEach((v, i) => {
			const b = readings.bootstrap[i]
			for (const key of Object.keys(v)) if (key !== 'tag' && v[key] !== b[key]) diffs.push(`${v.tag} ${key}: veneer ${v[key]} | bootstrap ${b[key]}`)
		})
		console.log(`## ${name} @${width}: ${diffs.length === 0 ? 'identical' : ''}`)
		for (const d of diffs) console.log('  ' + d)
		for (const [cascade, lines] of Object.entries(relations)) for (const line of lines) console.log(`  relation ${cascade}: ${line}`)
	}
}
await browser.close()
