// Probe: how this Chromium serialises the sRGB control Test's paint readings compare against, and what Test's parseColor returns.
import { chromium } from '/home/user/orkestrel/test/node_modules/playwright/index.mjs'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
await page.setContent('<!doctype html><html><body><p id="a" style="color: oklch(0.208 0.042 265.755)">Ink</p><p id="b" style="color: color-mix(in srgb, oklch(0.208 0.042 265.755) 100%, transparent)">Ink</p><p id="c" style="color: color-mix(in srgb, oklch(0.929 0.013 255.508) 100%, transparent)">Ink</p><p id="d" style="color: oklch(0.7 0.4 30)">Ink</p></body></html>')
const result = await page.evaluate(() => {
	const read = (id) => getComputedStyle(document.getElementById(id)).color
	return { ua: navigator.userAgent, oklchDirect: read('a'), colorMixDark: read('b'), colorMixLight: read('c'), outOfGamut: read('d') }
})
console.log(JSON.stringify(result, null, 2))
await browser.close()
