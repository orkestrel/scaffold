// Measures Elements' on-canvas tier (color-mix in oklab, role 70%, text 30%) against Elements' canvas in light and
// dark, beside the raw role color Veneer's text utilities use, in the host's Chromium 141. Canvas and text values are
// Elements' base theme (src/styles/_theme.scss): dark canvas oklch(21% 0.013 256) with slate-200 text; light canvas
// white with Elements' light text token read from the same file.
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
const out = await page.evaluate(() => {
	const c = document.createElement('canvas'); c.width = c.height = 1
	const x = c.getContext('2d', { willReadFrequently: true })
	const probe = document.createElement('div'); document.body.append(probe)
	const rgb = (color, under = '#ffffff') => { probe.style.color = color; const v = getComputedStyle(probe).color; x.fillStyle = under; x.fillRect(0, 0, 1, 1); x.fillStyle = v; x.fillRect(0, 0, 1, 1); return [...x.getImageData(0, 0, 1, 1).data].slice(0, 3) }
	const lum = ([r, g, b]) => [r, g, b].map((v) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4 }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0)
	const ratio = (a, b) => { const [h, l] = [lum(a), lum(b)].sort((m, n) => n - m); return Math.round(((h + 0.05) / (l + 0.05)) * 100) / 100 }
	const hex = (a) => '#' + a.map((v) => v.toString(16).padStart(2, '0')).join('')
	const modes = { dark: { canvas: 'oklch(21% 0.013 256)', text: '#e2e8f0' }, light: { canvas: '#ffffff', text: '#0f172b' } }
	const roles = { danger: '#c10007', information: '#0069a8' }
	const rows = []
	for (const [mode, m] of Object.entries(modes)) {
		const canvas = rgb(m.canvas)
		for (const [role, color] of Object.entries(roles)) {
			const raw = rgb(color, hex(canvas))
			const tier = rgb(`color-mix(in oklab, ${color} 70%, ${m.text})`, hex(canvas))
			rows.push({ mode, role, canvas: hex(canvas), raw: hex(raw), rawContrast: ratio(raw, canvas), onCanvas: hex(tier), onCanvasContrast: ratio(tier, canvas) })
		}
	}
	return rows
})
for (const row of out) console.log(JSON.stringify(row))
await browser.close()
