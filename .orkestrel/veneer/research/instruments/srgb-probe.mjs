// Orchestrator instrument: the sRGB channel triplets of the calibrated oklch colours, read from the
// engines themselves through color-mix() in srgb (which serializes as color(srgb r g b)), on managed
// Chromium and Edge. The token contract needs `--vn-*-rgb` triplets that Elements never declares.
import { chromium } from 'file:///C:/Users/mikes/WebstormProjects/scaffold/node_modules/playwright/index.mjs'

const COLOURS = Object.freeze({
	'primary light': 'oklch(0.48 0.255 264)',
	'primary dark': 'oklch(0.7 0.15 233)',
	'text light': 'oklch(0.208 0.042 265.755)',
	'text dark': 'oklch(0.929 0.013 255.508)',
	'border light': 'oklch(0.869 0.022 252.894)',
	'border dark': 'oklch(0.4 0.022 256)',
	'raised light': 'oklch(0.984 0.003 247.858)',
	'raised dark': 'oklch(0.235 0.013 256)',
})

async function readTriplets(browser) {
	const page = await browser.newPage()
	await page.setContent('<!doctype html><html><body></body></html>')
	const rows = await page.evaluate((colours) => {
		const out = {}
		for (const [name, value] of Object.entries(colours)) {
			const probe = document.createElement('div')
			probe.style.backgroundColor = `color-mix(in srgb, ${value} 100%, transparent 0%)`
			document.body.append(probe)
			const mixed = getComputedStyle(probe).backgroundColor
			const match = mixed.match(/color\(srgb ([\d.]+) ([\d.]+) ([\d.]+)/)
			const triplet = match ? match.slice(1, 4).map((channel) => Math.round(Number(channel) * 255)).join(', ') : 'unparsed'
			probe.style.backgroundColor = value
			const direct = getComputedStyle(probe).backgroundColor
			out[name] = { value, mixed, triplet, direct, inGamut: CSS.supports('color', value) }
			probe.remove()
		}
		return out
	}, COLOURS)
	await page.close()
	return rows
}

for (const launch of [{ label: 'chromium', options: {} }, { label: 'msedge', options: { channel: 'msedge' } }]) {
	const browser = await chromium.launch(launch.options)
	const rows = await readTriplets(browser)
	console.log(`## ${launch.label} ${browser.version()}`)
	for (const [name, row] of Object.entries(rows)) console.log(`${name}: ${row.value} -> ${row.triplet} (${row.mixed}; direct ${row.direct})`)
	await browser.close()
}
