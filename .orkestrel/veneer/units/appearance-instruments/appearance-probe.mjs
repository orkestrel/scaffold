// Appearance probe for the user's P7 and P8 ruling. Renders the same specimens under Veneer's built cascade
// (/home/user/veneer/dist/src/styles/index.css, built from cbee3bb, the last styles commit) and under Bootstrap 5.3.8's
// release stylesheet, in light and dark, in the host's Chromium 141. Reads each computed color through a canvas, so
// oklch and color-mix values resolve to sRGB, and computes the WCAG 2.2 contrast ratio of text against its background.
// Reads the computed font size, weight, and bottom margin of the type specimens. Prints one JSON line per reading.
import { readFileSync } from 'node:fs'
import { chromium } from '/home/user/veneer/node_modules/playwright/index.mjs'

const SHEETS = {
	veneer: readFileSync('/home/user/veneer/dist/src/styles/index.css', 'utf8'),
	bootstrap: readFileSync('/home/user/veneer/node_modules/bootstrap/dist/css/bootstrap.min.css', 'utf8'),
}
const MARKUP = `
<main class="p-3">
  <button id="btn" type="button" class="btn btn-primary">Save changes</button>
  <span id="badge" class="badge text-bg-primary">New</span>
  <input type="checkbox" class="btn-check" id="chk" checked autocomplete="off"><label id="outline" class="btn btn-outline-primary" for="chk">Checked outline</label>
  <p id="info" class="text-info">Info text on the page background.</p>
  <p id="danger" class="text-danger">Danger text on the page background.</p>
  <p id="body">Body paragraph text.</p>
  <h2 id="h2">Section heading</h2>
  <div class="mb-3"><label id="label" class="form-label" for="email">Email address</label><input id="control" type="email" class="form-control" value="name@example.com"></div>
  <div class="form-floating"><input id="fcontrol" type="text" class="form-control" placeholder="x" value=""><label id="flabel" for="fcontrol">Floating label</label></div>
  <p id="fs" class="fs-1">fs-1 text</p>
  <p id="display" class="display-1">Display</p>
</main>`

const PROBE = () => {
	const canvas = document.createElement('canvas')
	canvas.width = 1
	canvas.height = 1
	const context = canvas.getContext('2d', { willReadFrequently: true })
	const toRgb = (color, under) => {
		context.clearRect(0, 0, 1, 1)
		context.fillStyle = under
		context.fillRect(0, 0, 1, 1)
		context.fillStyle = color
		context.fillRect(0, 0, 1, 1)
		const [r, g, b] = context.getImageData(0, 0, 1, 1).data
		return [r, g, b]
	}
	const luminance = ([r, g, b]) => {
		const lin = (c) => {
			const s = c / 255
			return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
		}
		return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
	}
	const ratio = (a, b) => {
		const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m)
		return Math.round(((x + 0.05) / (y + 0.05)) * 100) / 100
	}
	const hex = ([r, g, b]) => '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')
	const page = toRgb(getComputedStyle(document.body).backgroundColor, '#ffffff')
	const pair = (id, backgroundId) => {
		const element = document.getElementById(id)
		const style = getComputedStyle(element)
		const holder = backgroundId === undefined ? element : document.getElementById(backgroundId)
		const background = toRgb(getComputedStyle(holder).backgroundColor, hex(page))
		const text = toRgb(style.color, hex(background))
		return { text: hex(text), background: hex(background), contrast: ratio(text, background) }
	}
	const type = (id) => {
		const style = getComputedStyle(document.getElementById(id))
		return { size: style.fontSize, weight: style.fontWeight, marginBottom: style.marginBottom, lineHeight: style.lineHeight }
	}
	return {
		page: hex(page),
		button: pair('btn'),
		badge: pair('badge'),
		outline: pair('outline'),
		info: { ...pair('info'), background: hex(page) },
		danger: { ...pair('danger'), background: hex(page) },
		body: { ...pair('body'), background: hex(page) },
		types: {
			body: type('body'),
			h2: type('h2'),
			label: type('label'),
			control: type('control'),
			button: type('btn'),
			floatingLabel: type('flabel'),
			fs1: type('fs'),
			display1: type('display'),
		},
	}
}

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
for (const [name, css] of Object.entries(SHEETS)) {
	for (const theme of ['light', 'dark']) {
		for (const width of [1280, 390]) {
			const page = await browser.newPage({ viewport: { width, height: 900 } })
			await page.setContent(`<!doctype html><html data-bs-theme="${theme}"><head><style>${css}</style></head><body>${MARKUP}</body></html>`)
			const reading = await page.evaluate(PROBE)
			console.log(JSON.stringify({ sheet: name, theme, width, ...reading }))
			await page.close()
		}
	}
}
await browser.close()
