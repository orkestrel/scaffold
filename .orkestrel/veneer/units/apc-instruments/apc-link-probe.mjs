// Instrument: node tmp/units/apc-link-probe.mjs (log tmp/units/apc-link-probe.log.txt). Reads, against this worktree's built cascade in the host Chromium, the computed `a` link color and hover color
// and the `--vn-link-base` and `--vn-link-hover-base` tokens in light and dark, each as the engine serializes it and
// as whole sRGB channels, so the dark `link-rgb` and `link-hover-rgb` triplets and the TEXT_A_CASES values can be set.
import { readFileSync } from 'node:fs'
import { chromium } from '/home/user/veneer-apc/node_modules/playwright/index.mjs'
const css = readFileSync('/home/user/veneer-apc/dist/src/styles/index.css', 'utf8')
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const page = await browser.newPage()
await page.setContent('<!doctype html><html><head></head><body><div id="p">x</div><a id="a" href="#x">a</a></body></html>')
await page.addStyleTag({ content: css })
console.log(JSON.stringify({ browser: browser.version() }))
for (const mode of ['light', 'dark']) {
	const row = await page.evaluate((mode) => {
		document.documentElement.setAttribute('data-bs-theme', mode)
		const c = document.createElement('canvas'); c.width = c.height = 1
		const x = c.getContext('2d', { willReadFrequently: true })
		const probe = document.getElementById('p')
		const channels = (color) => { probe.style.color = color; const v = getComputedStyle(probe).color; x.clearRect(0, 0, 1, 1); x.fillStyle = v; x.fillRect(0, 0, 1, 1); return { computed: v, rgb: [...x.getImageData(0, 0, 1, 1).data].slice(0, 3).join(', ') } }
		const anchor = document.getElementById('a')
		return {
			mode,
			a: getComputedStyle(anchor).color,
			link: channels('var(--vn-link-base)'),
			hover: channels('var(--vn-link-hover-base)'),
			tier: channels('var(--vn-color-primary-emphasis)'),
			linkRgb: getComputedStyle(document.documentElement).getPropertyValue('--vn-link-rgb'),
			hoverRgb: getComputedStyle(document.documentElement).getPropertyValue('--vn-link-hover-rgb'),
		}
	}, mode)
	console.log(JSON.stringify(row))
}
await browser.close()
