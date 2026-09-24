// Measures, against Veneer's built cascade (dist/src/styles/index.css) in the host's Chromium 141, each role's emphasis
// tier as text on the canvas in light and dark (tertiary included), the proposed colored-link hover (the tier moved 20
// percent toward black in light and white in dark, in srgb and in oklab), and the `a` link at the 70 percent dark tier with
// its hover. Every contrast is against the mode's computed body background.
import { readFileSync } from 'node:fs'
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
const css = readFileSync('/home/user/veneer/dist/src/styles/index.css', 'utf8')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
await page.setContent('<!doctype html><html><head></head><body><div id="p">x</div></body></html>')
await page.addStyleTag({ content: css })
console.log(JSON.stringify({ browser: browser.version() }))
for (const mode of ['light', 'dark']) {
	const rows = await page.evaluate((mode) => {
		document.documentElement.setAttribute('data-bs-theme', mode)
		const c = document.createElement('canvas'); c.width = c.height = 1
		const x = c.getContext('2d', { willReadFrequently: true })
		const probe = document.getElementById('p')
		const canvasColor = getComputedStyle(document.body).backgroundColor
		const paint = (color) => { probe.style.color = color; const v = getComputedStyle(probe).color; x.fillStyle = canvasColor; x.fillRect(0, 0, 1, 1); x.fillStyle = v; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3) }
		const lum = ([r, g, b]) => [r, g, b].map((v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4 }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0)
		const ratio = (a, b) => { const [h, l] = [lum(a), lum(b)].sort((m, n) => n - m); return Math.round(((h + 0.05) / (l + 0.05)) * 100) / 100 }
		const canvas = paint(canvasColor)
		const end = mode === 'light' ? 'black' : 'white'
		const out = { mode, canvas: canvasColor }
		for (const role of ['primary', 'secondary', 'tertiary', 'success', 'info', 'warning', 'danger']) {
			const tier = `var(--vn-color-${role}-emphasis)`
			out[role] = {
				tier: ratio(paint(tier), canvas),
				hoverSrgb: ratio(paint(`color-mix(in srgb, ${tier} 80%, ${end})`), canvas),
				hoverOklab: ratio(paint(`color-mix(in oklab, ${tier} 80%, ${end})`), canvas),
				raw: ratio(paint(`var(--vn-color-${role}-base)`), canvas),
			}
		}
		out.a70 = ratio(paint('var(--vn-color-primary-emphasis)'), canvas)
		out.a70hover = ratio(paint(`color-mix(in srgb, var(--vn-color-primary-emphasis) 65%, ${end})`), canvas)
		out.aShipped = ratio(paint('var(--vn-link-base)'), canvas)
		out.validLight = ratio(paint('var(--vn-color-success-emphasis)'), canvas)
		out.invalidLight = ratio(paint('var(--vn-color-danger-emphasis)'), canvas)
		return out
	}, mode)
	console.log(JSON.stringify(rows))
}
await browser.close()
