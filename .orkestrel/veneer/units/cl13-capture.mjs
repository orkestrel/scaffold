// CL13-harness: captures Bootstrap 5.3.8's own rendering of the four specimens Veneer's
// showcase also renders, at two widths and two themes, using bootstrap.css alone. Throwaway
// instrument, owned by the campaign, never edited by a verdict lane.
//
// Invocation: `node tmp/cl13/capture.mjs` from the Veneer checkout root. Self-contained: it
// starts its own static server pinned to this file's directory, drives its own Chromium page,
// captures every variant, tears both down, then runs the blank-frame control before exiting.

import { createServer } from 'node:http'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = join(HERE, '..', '..')
const BOOTSTRAP_CSS_PATH = join(REPO_ROOT, 'node_modules', 'bootstrap', 'dist', 'css', 'bootstrap.css')
const OUT_DIR = join(HERE, 'portfolio')
mkdirSync(OUT_DIR, { recursive: true })

const BOOTSTRAP_CSS = readFileSync(BOOTSTRAP_CSS_PATH, 'utf8')

// The four specimens, their markup read byte-for-byte out of app/browser/constants.ts. The
// table specimen's markup is the function's own emitted string for classes: 'table' (the
// 'Base' row), not a hand-reduced copy of the class name alone.
const SPECIMENS = [
	{
		specimen: 'capped-container',
		markup: '<div class="container">Capped at each layout boundary.</div>',
	},
	{
		specimen: 'numbered-columns',
		markup:
			'<div class="container-fluid"><div class="row"><div class="col-12 col-md-4">One third at md</div><div class="col-12 col-md-8">Two thirds at md</div></div></div>',
	},
	{
		specimen: 'base-table',
		markup:
			'<div class=""><table class="table table"><caption>Material shipments</caption><thead><tr><th scope="col">Material</th><th scope="col">Status</th></tr></thead><tbody class=""><tr><th scope="row">Oak</th><td>Ready</td></tr><tr><th scope="row">Ash</th><td>Queued</td></tr></tbody></table></div>',
	},
	{
		specimen: 'role-links',
		markup:
			'<p><a href="#main" class="link-primary">Primary link</a> <a href="#main" class="link-secondary">Secondary link</a> <a href="#main" class="link-success">Success link</a> <a href="#main" class="link-info">Info link</a> <a href="#main" class="link-warning">Warning link</a> <a href="#main" class="link-danger">Danger link</a> <a href="#main" class="link-light">Light link</a> <a href="#main" class="link-dark">Dark link</a> <a href="#main" class="link-body-emphasis">Body emphasis link</a></p>',
	},
]

const WIDTHS = [1280, 390]
const THEMES = ['light', 'dark']
const HEIGHT = 720

/** Builds the static page for one specimen and theme. Bootstrap 5.3 reads the theme from the
 * `data-bs-theme` attribute on the root element, confirmed against `bootstrap.css` lines 8 and
 * 128 (`[data-bs-theme=light]` and `[data-bs-theme=dark]`), so this is the only mechanism used. */
function renderPage(markup, theme) {
	return `<!doctype html><html lang="en" data-bs-theme="${theme}"><head><meta charset="utf-8"><style>${BOOTSTRAP_CSS}</style></head><body>${markup}</body></html>`
}

/** Serves the CSS-and-markup page a query string names. Readiness is a normal HTTP response, no
 * client-side signal needed. */
function requestListener(request, response) {
	const url = new URL(request.url ?? '/', 'http://127.0.0.1')
	const name = url.searchParams.get('specimen')
	const theme = url.searchParams.get('theme')
	const found = SPECIMENS.find((entry) => entry.specimen === name)
	if (found === undefined || (theme !== 'light' && theme !== 'dark')) {
		response.writeHead(404)
		response.end('not found')
		return
	}
	response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
	response.end(renderPage(found.markup, theme))
}

/** Starts the static server on an ephemeral port and resolves once it is actually listening —
 * the observable readiness signal, never a fixed sleep. */
function startServer() {
	return new Promise((resolve, reject) => {
		const server = createServer(requestListener)
		server.on('error', reject)
		server.listen(0, '127.0.0.1', () => resolve(server))
	})
}

/** Reads the fraction of a decoded PNG's pixels that differ from its first pixel, driven inside
 * the page so the read matches `tests/setupBrowser.ts`'s `measureFrameVariation` in approach:
 * decode into a canvas, sample every pixel. Reused rather than reimplemented in Node because no
 * PNG decoder is declared here and none may be added. */
async function measureVariation(page, base64) {
	return page.evaluate(async (encoded) => {
		const image = new Image()
		image.src = `data:image/png;base64,${encoded}`
		await image.decode()
		const canvas = document.createElement('canvas')
		canvas.width = image.width
		canvas.height = image.height
		const context = canvas.getContext('2d')
		if (context === null) throw new Error('capture requires a 2D canvas')
		context.drawImage(image, 0, 0)
		const pixels = context.getImageData(0, 0, image.width, image.height).data
		const first = [pixels[0], pixels[1], pixels[2], pixels[3]]
		let differing = 0
		const total = pixels.length / 4
		for (let index = 0; index < pixels.length; index += 4) {
			if (
				pixels[index] !== first[0] ||
				pixels[index + 1] !== first[1] ||
				pixels[index + 2] !== first[2] ||
				pixels[index + 3] !== first[3]
			) {
				differing += 1
			}
		}
		return differing / total
	}, base64)
}

/** Runs the blank-frame control: asserts the reader reports zero variation on a deliberately
 * uniform image, and reports both readings so the report can quote a red and a green. */
async function proveBlankCheck(page) {
	const blankCanvas = await page.evaluate(async () => {
		const canvas = document.createElement('canvas')
		canvas.width = 4
		canvas.height = 4
		const context = canvas.getContext('2d')
		if (context === null) throw new Error('control requires a 2D canvas')
		context.fillStyle = '#336699'
		context.fillRect(0, 0, 4, 4)
		return canvas.toDataURL('image/png').split(',')[1]
	})
	const blankVariation = await measureVariation(page, blankCanvas)
	const paintedCanvas = await page.evaluate(async () => {
		const canvas = document.createElement('canvas')
		canvas.width = 4
		canvas.height = 4
		const context = canvas.getContext('2d')
		if (context === null) throw new Error('control requires a 2D canvas')
		context.fillStyle = '#336699'
		context.fillRect(0, 0, 4, 4)
		context.fillStyle = '#ffcc00'
		context.fillRect(0, 0, 2, 2)
		return canvas.toDataURL('image/png').split(',')[1]
	})
	const paintedVariation = await measureVariation(page, paintedCanvas)
	return { blankVariation, paintedVariation }
}

const log = []
function step(message) {
	const line = `[${new Date().toISOString()}] ${message}`
	log.push(line)
	console.log(line)
}

let server
let browser
try {
	step('starting static server')
	server = await startServer()
	const address = server.address()
	if (address === null || typeof address === 'string') throw new Error('server did not bind a port')
	const port = address.port
	step(`server listening on 127.0.0.1:${port}`)

	step('launching chromium')
	browser = await chromium.launch()
	step('chromium launched')

	const written = []

	for (const { specimen } of SPECIMENS) {
		for (const theme of THEMES) {
			for (const width of WIDTHS) {
				const context = await browser.newContext({ viewport: { width, height: HEIGHT } })
				const page = await context.newPage()
				const consoleLines = []
				page.on('console', (message) => consoleLines.push(`${message.type()}: ${message.text()}`))
				page.on('pageerror', (error) => consoleLines.push(`pageerror: ${String(error)}`))

				const url = `http://127.0.0.1:${port}/?specimen=${specimen}&theme=${theme}`
				step(`navigating to ${url} at width ${width}`)
				const response = await page.goto(url, { waitUntil: 'load' })
				if (response === null || !response.ok()) {
					throw new Error(`navigation to ${url} did not return an ok response`)
				}
				step(`navigation ok, status ${response.status()}`)

				await page.waitForLoadState('networkidle')

				const stem = `${specimen}--${theme}--${width}`
				const framePath = join(OUT_DIR, `${stem}.png`)
				await page.screenshot({ path: framePath })
				step(`captured frame ${stem}.png`)

				const base64 = readFileSync(framePath).toString('base64')
				const variation = await measureVariation(page, base64)
				step(`variation for ${stem}: ${variation}`)
				if (variation <= 0) {
					throw new Error(`frame ${stem}.png reported zero pixel variation; capture is blank`)
				}

				// Playwright 1.63 dropped `page.accessibility.snapshot`; `locator.ariaSnapshot` is its
				// replacement, returning the same roles/names/states tree as YAML.
				const snapshot = await page.locator('body').ariaSnapshot()
				const snapshotPath = join(OUT_DIR, `${stem}.accessibility.yaml`)
				writeFileSync(snapshotPath, `${snapshot}\n`)
				step(`wrote accessibility snapshot ${stem}.accessibility.yaml`)

				const stepLogPath = join(OUT_DIR, `${stem}.steps.log.txt`)
				const variantLog = [
					`specimen: ${specimen}`,
					`theme: ${theme}`,
					`width: ${width}`,
					`url: ${url}`,
					`navigation status: ${response.status()}`,
					`pixel variation: ${variation}`,
					`console output:`,
					...(consoleLines.length > 0 ? consoleLines : ['(none)']),
				].join('\n')
				writeFileSync(stepLogPath, `${variantLog}\n`)
				step(`wrote step log ${stem}.steps.log.txt`)

				written.push(stem)
				await context.close()
			}
		}
	}

	step('running blank-frame control on a fresh page')
	const controlContext = await browser.newContext()
	const controlPage = await controlContext.newPage()
	const control = await proveBlankCheck(controlPage)
	step(`blank-frame control: uniform image variation = ${control.blankVariation}`)
	step(`blank-frame control: painted image variation = ${control.paintedVariation}`)

	// The exact assertion the capture loop applies to every real frame (`if (variation <= 0)
	// throw`), run here against both a deliberately blank image and a deliberately painted one, to
	// prove the check itself can fail rather than only reasoning about it.
	const RED = 'RED (assertion threw, as required for a blank frame)'
	const GREEN = 'GREEN (assertion passed, as required for a non-blank frame)'
	let blankReading
	try {
		if (control.blankVariation <= 0) throw new Error(`frame reported zero pixel variation; capture is blank`)
		blankReading = 'did not throw — DEFECT: the check failed to catch a blank frame'
	} catch (error) {
		blankReading = `${RED}: ${String(error)}`
	}
	step(`blank-frame control, applied to the uniform image: ${blankReading}`)
	if (!blankReading.startsWith(RED)) throw new Error('blank-frame control did not fail on a uniform image')

	let paintedReading
	try {
		if (control.paintedVariation <= 0) throw new Error(`frame reported zero pixel variation; capture is blank`)
		paintedReading = GREEN
	} catch (error) {
		paintedReading = `threw unexpectedly — DEFECT: ${String(error)}`
	}
	step(`blank-frame control, applied to the painted image: ${paintedReading}`)
	if (paintedReading !== GREEN) throw new Error('blank-frame control incorrectly failed on a painted image')

	await controlContext.close()

	writeFileSync(join(OUT_DIR, 'control.json'), `${JSON.stringify({ ...control, blankReading, paintedReading }, null, 2)}\n`)
	writeFileSync(join(OUT_DIR, 'manifest.json'), `${JSON.stringify({ frames: written }, null, 2)}\n`)

	step(`capture complete: ${written.length} frames written`)
} finally {
	if (browser !== undefined) {
		await browser.close()
		step('chromium closed')
	}
	if (server !== undefined) {
		await new Promise((resolve) => server.close(() => resolve(undefined)))
		step('server closed')
	}
	writeFileSync(join(OUT_DIR, 'harness.log.txt'), `${log.join('\n')}\n`)
}
