// Orchestrator instrument: the painted sRGB pixel of each calibrated oklch colour, read back from a
// real element screenshot on managed Chromium and Edge, so an out-of-gamut colour (the dark primary
// reads as a negative red channel through color-mix) gets the triplet the engine actually paints.
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
	'canvas dark dialog': 'rgb(18, 18, 18)',
})

async function readPainted(browser) {
	const page = await browser.newPage({ viewport: { width: 400, height: 300 } })
	await page.setContent('<!doctype html><html><body style="margin:0"><div id="swatch" style="width:64px;height:64px"></div><canvas id="c" width="64" height="64"></canvas></body></html>')
	const rows = {}
	for (const [name, value] of Object.entries(COLOURS)) {
		await page.evaluate((colour) => { document.getElementById('swatch').style.backgroundColor = colour }, value)
		const png = await page.locator('#swatch').screenshot({ type: 'png' })
		const pixel = await page.evaluate(async (base64) => {
			const image = new Image()
			image.src = 'data:image/png;base64,' + base64
			await image.decode()
			const canvas = document.getElementById('c')
			const context = canvas.getContext('2d', { colorSpace: 'srgb' })
			context.drawImage(image, 0, 0)
			const data = context.getImageData(32, 32, 1, 1).data
			return `${data[0]}, ${data[1]}, ${data[2]}`
		}, png.toString('base64'))
		rows[name] = { value, pixel }
	}
	await page.close()
	return rows
}

for (const launch of [{ label: 'chromium', options: {} }, { label: 'msedge', options: { channel: 'msedge' } }]) {
	const browser = await chromium.launch(launch.options)
	const rows = await readPainted(browser)
	console.log(`## ${launch.label} ${browser.version()}`)
	for (const [name, row] of Object.entries(rows)) console.log(`${name}: ${row.value} paints ${row.pixel}`)
	await browser.close()
}
