// U7f-harness — throwaway capture harness over Elements' built showcase button page.
//
// One call, one lifecycle: boots a static server (or file:// if that boots), drives managed
// Chromium through Playwright, captures Elements' button portfolio at the same variants and
// states Veneer's own button portfolio uses, and tears every child and listener down before
// returning. Rebuild or delete this script when the showcase build changes.

import { createServer } from 'node:http'
import { readFile, mkdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const playwrightEntry = pathToFileURL(
	'C:/Users/mikes/WebstormProjects/veneer/node_modules/playwright/index.mjs',
).href
const { chromium } = await import(playwrightEntry)

const showcaseDir = 'C:/Users/mikes/WebstormProjects/elements/dist/showcase'
const showcaseFile = path.join(showcaseDir, 'index.html')
const outDir = 'C:/Users/mikes/WebstormProjects/scaffold/tmp/capture/elements'

const VARIANTS = [
	{ name: 'light-1280', mode: 'light', width: 1280, height: 800 },
	{ name: 'light-390', mode: 'light', width: 390, height: 800 },
	{ name: 'dark-1280', mode: 'dark', width: 1280, height: 800 },
	{ name: 'dark-390', mode: 'dark', width: 390, height: 800 },
]

const VARIANTS_SPECIMEN = '#button-variants button.primary'
const TOGGLE_HOST = '#button-toggle button.primary'
const VARIANTS_SECTION = '#button-variants'
const STATES_SECTION = '#button-states'
const FOCUS_RING_PADDING = 12

const unknowns = []
const reportSections = []

// ── static server fallback ──────────────────────────────────────────────
const contentType = (filePath) => {
	if (filePath.endsWith('.html')) return 'text/html; charset=utf-8'
	if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) return 'text/javascript; charset=utf-8'
	if (filePath.endsWith('.css')) return 'text/css; charset=utf-8'
	if (filePath.endsWith('.json')) return 'application/json; charset=utf-8'
	if (filePath.endsWith('.svg')) return 'image/svg+xml'
	return 'application/octet-stream'
}

const startStaticServer = async (rootDir) => {
	const server = createServer((req, res) => {
		const url = new URL(req.url ?? '/', 'http://127.0.0.1')
		const relative = url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\/+/, '')
		const filePath = path.join(rootDir, relative)
		readFile(filePath)
			.then((body) => {
				res.writeHead(200, { 'content-type': contentType(filePath) })
				res.end(body)
			})
			.catch(() => {
				readFile(path.join(rootDir, 'index.html'))
					.then((body) => {
						res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
						res.end(body)
					})
					.catch((error) => {
						res.writeHead(500)
						res.end(String(error))
					})
			})
	})
	await new Promise((resolve, reject) => {
		server.once('error', reject)
		server.listen(0, '127.0.0.1', resolve)
	})
	const address = server.address()
	if (address === null || typeof address === 'string') {
		await new Promise((resolve) => server.close(resolve))
		throw new Error('static server did not bind a port')
	}
	return { server, port: address.port }
}

// ── portfolio bookkeeping ───────────────────────────────────────────────
const steps = []
const logStep = (action, trigger, result) => {
	steps.push({ action, trigger, result })
}

const shootFrame = async (target, filePath) => {
	await target.screenshot({ path: filePath })
}

const boundedTabWalk = async (page, specimenLocator, maxPresses) => {
	await page.evaluate(() => {
		const active = document.activeElement
		if (active instanceof HTMLElement) active.blur()
	})
	let presses = 0
	let matched = false
	while (presses < maxPresses) {
		await page.keyboard.press('Tab')
		presses += 1
		matched = await specimenLocator.evaluate((el) => el === document.activeElement)
		if (matched) break
	}
	return { presses, matched }
}

const captureVariant = async (browser, variant) => {
	const context = await browser.newContext({
		viewport: { width: variant.width, height: variant.height },
	})
	const page = await context.newPage()
	const consoleMessages = []
	page.on('console', (message) => {
		consoleMessages.push({ type: message.type(), text: message.text() })
	})
	page.on('pageerror', (error) => {
		consoleMessages.push({ type: 'pageerror', text: String(error) })
	})

	const navUrl = `${globalThis.__u7fBaseUrl}#/button`
	await page.goto(navUrl, { waitUntil: 'load' })

	await page.evaluate((mode) => {
		document.documentElement.setAttribute('data-mode', mode)
	}, variant.mode)
	const appliedMode = await page.evaluate(() => document.documentElement.getAttribute('data-mode'))
	if (appliedMode !== variant.mode) {
		throw new Error(`data-mode did not apply for variant ${variant.name}: read "${appliedMode}"`)
	}

	// Wait until the theme transition settles: two consecutive animation frames with an
	// unchanged body background-color, and no running animations.
	const settledBackground = await page.evaluate(async () => {
		const readBackground = () => getComputedStyle(document.body).backgroundColor
		const nextFrame = () => new Promise((resolve) => requestAnimationFrame(resolve))
		let previous = readBackground()
		let stableFrames = 0
		let attempts = 0
		while (stableFrames < 2 && attempts < 120) {
			await nextFrame()
			const current = readBackground()
			if (current === previous && document.getAnimations().length === 0) {
				stableFrames += 1
			} else {
				stableFrames = 0
			}
			previous = current
			attempts += 1
		}
		return { background: previous, stableFrames, attempts, animations: document.getAnimations().length }
	})
	logStep(
		'settle',
		`data-mode=${variant.mode}`,
		`settled background ${settledBackground.background} after ${settledBackground.attempts} frames (stableFrames=${settledBackground.stableFrames}, animations=${settledBackground.animations})`,
	)

	const variantsSection = page.locator(VARIANTS_SECTION)
	await variantsSection.waitFor({ state: 'visible' })
	const specimen = page.locator(VARIANTS_SPECIMEN)
	await specimen.waitFor({ state: 'visible' })

	const ariaSnapshot = await variantsSection.ariaSnapshot()
	if (ariaSnapshot.trim().length === 0) {
		throw new Error(`empty ARIA snapshot for variant ${variant.name}`)
	}
	await writeFile(path.join(outDir, `${variant.name}.txt`), ariaSnapshot, 'utf-8')

	const variantSteps = []
	const logVariantStep = (action, trigger, result) => {
		variantSteps.push({ action, trigger, result })
		logStep(action, trigger, result)
	}

	// rest
	await shootFrame(
		page,
		path.join(outDir, `elements-button-primary-rest--${variant.name}.png`),
	)
	logVariantStep('capture', 'none', `rest frame written for ${variant.name}`)

	// pressed
	const toggleHost = page.locator(TOGGLE_HOST)
	await toggleHost.waitFor({ state: 'visible' })
	await toggleHost.click()
	const pressedAfterFirstClick = await toggleHost.getAttribute('aria-pressed')
	if (pressedAfterFirstClick === 'true') {
		await shootFrame(
			page,
			path.join(outDir, `elements-button-primary-pressed--${variant.name}.png`),
		)
		logVariantStep(
			'capture',
			`click ${TOGGLE_HOST}`,
			`aria-pressed=true, pressed frame written for ${variant.name}`,
		)
	} else {
		logVariantStep(
			'capture-absent',
			`click ${TOGGLE_HOST}`,
			`aria-pressed read "${pressedAfterFirstClick}" after click, expected "true"; pressed frame absent`,
		)
	}
	await toggleHost.click()
	const pressedAfterSecondClick = await toggleHost.getAttribute('aria-pressed')
	logVariantStep(
		'restore',
		`click ${TOGGLE_HOST}`,
		`aria-pressed read "${pressedAfterSecondClick}" after restoring click`,
	)

	// focus
	const tabResult = await boundedTabWalk(page, specimen, 60)
	if (tabResult.matched) {
		await shootFrame(
			page,
			path.join(outDir, `elements-button-primary-focus--${variant.name}.png`),
		)
		logVariantStep(
			'capture',
			`Tab x${tabResult.presses}`,
			`focus reached ${VARIANTS_SPECIMEN} after ${tabResult.presses} presses, focus frame written`,
		)

		// focus ring: element frame of the specimen padded 12px on every side, taken while
		// focus is still held, plus the specimen's computed box-shadow at that moment.
		const focusBoxShadow = await specimen.evaluate((el) => getComputedStyle(el).boxShadow)
		const specimenBox = await specimen.boundingBox()
		if (specimenBox === null) {
			logVariantStep(
				'capture-absent',
				'focus-ring clip',
				`specimen has no bounding box while focused; focus-ring frame absent (box-shadow read "${focusBoxShadow}")`,
			)
		} else {
			const viewport = page.viewportSize()
			const clipX = Math.max(0, specimenBox.x - FOCUS_RING_PADDING)
			const clipY = Math.max(0, specimenBox.y - FOCUS_RING_PADDING)
			const clipWidth =
				specimenBox.width +
				FOCUS_RING_PADDING * 2 -
				Math.max(0, FOCUS_RING_PADDING - specimenBox.x) -
				Math.max(0, viewport === null ? 0 : specimenBox.x + specimenBox.width + FOCUS_RING_PADDING - viewport.width)
			const clipHeight = specimenBox.height + FOCUS_RING_PADDING * 2
			await page.screenshot({
				path: path.join(outDir, `elements-button-primary-focus-ring--${variant.name}.png`),
				clip: { x: clipX, y: clipY, width: Math.max(1, clipWidth), height: Math.max(1, clipHeight) },
			})
			logVariantStep(
				'capture',
				'focus-ring clip',
				`focus-ring frame written for ${variant.name}, padded ${FOCUS_RING_PADDING}px around specimen; computed box-shadow "${focusBoxShadow}"`,
			)
		}
	} else {
		logVariantStep(
			'capture-absent',
			`focus-ring clip`,
			`focus never reached ${VARIANTS_SPECIMEN}; focus-ring frame absent, box-shadow not read`,
		)
		logVariantStep(
			'capture-absent',
			`Tab x${tabResult.presses}`,
			`focus never reached ${VARIANTS_SPECIMEN} within 60 presses; focus frame absent`,
		)
	}
	await page.evaluate(() => {
		const active = document.activeElement
		if (active instanceof HTMLElement) active.blur()
	})

	// hover
	const box = await specimen.boundingBox()
	if (box === null) {
		logVariantStep('capture-absent', 'hover move', 'specimen has no bounding box; hover frame absent')
	} else {
		const centreX = box.x + box.width / 2
		const centreY = box.y + box.height / 2
		await page.mouse.move(centreX, centreY)
		const isHovered = await specimen.evaluate((el) => el.matches(':hover'))
		if (isHovered) {
			await shootFrame(
				specimen,
				path.join(outDir, `elements-button-primary-hover--${variant.name}.png`),
			)
			logVariantStep('capture', 'mouse move to centre', 'matches(":hover") true, hover frame written')
		} else {
			logVariantStep(
				'capture-absent',
				'mouse move to centre',
				'matches(":hover") false after move; hover frame absent',
			)
		}
		await page.mouse.move(0, 0)
	}

	// active
	if (box !== null) {
		const centreX = box.x + box.width / 2
		const centreY = box.y + box.height / 2
		await page.mouse.move(centreX, centreY)
		await page.mouse.down()
		const isActive = await specimen.evaluate((el) => el.matches(':active'))
		if (isActive) {
			await shootFrame(
				specimen,
				path.join(outDir, `elements-button-primary-active--${variant.name}.png`),
			)
			logVariantStep('capture', 'mouse down at centre', 'matches(":active") true, active frame written')
		} else {
			logVariantStep(
				'capture-absent',
				'mouse down at centre',
				'matches(":active") false after mousedown; active frame absent',
			)
		}
		await page.mouse.up()
	}

	// states: element frame of the States section (disabled, loading, .active, hover/focus
	// prose) plus its ARIA snapshot appended to the variant's .txt.
	const statesSection = page.locator(STATES_SECTION)
	await statesSection.waitFor({ state: 'visible' })
	await shootFrame(
		statesSection,
		path.join(outDir, `elements-button-states--${variant.name}.png`),
	)
	const statesAriaSnapshot = await statesSection.ariaSnapshot()
	await writeFile(
		path.join(outDir, `${variant.name}.txt`),
		`${ariaSnapshot}\n\n# States\n${statesAriaSnapshot}`,
		'utf-8',
	)
	logVariantStep(
		'capture',
		'none',
		`states frame written for ${variant.name}; States ARIA snapshot appended to ${variant.name}.txt`,
	)

	await writeFile(
		path.join(outDir, `${variant.name}-steps.jsonl`),
		variantSteps.map((entry) => JSON.stringify(entry)).join('\n') + '\n',
		'utf-8',
	)
	await writeFile(
		path.join(outDir, `${variant.name}-console.json`),
		JSON.stringify(consoleMessages, null, 2),
		'utf-8',
	)

	reportSections.push(
		`Variant ${variant.name}: ${variantSteps.map((s) => `${s.action}(${s.trigger})`).join(', ')}`,
	)

	await context.close()
}

// ── main ───────────────────────────────────────────────────────────────
const main = async () => {
	if (!existsSync(showcaseFile)) {
		throw new Error(`showcase file missing: ${showcaseFile}`)
	}

	await rm(outDir, { recursive: true, force: true })
	await mkdir(outDir, { recursive: true })

	const browser = await chromium.launch()
	let server = null
	let baseUrl = null

	try {
		// Try file:// first.
		const fileUrl = pathToFileURL(showcaseFile).href
		const probeContext = await browser.newContext()
		const probePage = await probeContext.newPage()
		let fileBoots = false
		try {
			await probePage.goto(fileUrl, { waitUntil: 'load', timeout: 10000 })
			await probePage.locator('#button-variants').waitFor({ state: 'visible', timeout: 5000 })
			fileBoots = true
		} catch {
			fileBoots = false
		}
		await probeContext.close()

		if (fileBoots) {
			baseUrl = fileUrl.replace(/index\.html$/, '')
			unknowns.push('file:// boot: the showcase booted directly from a file:// URL; no static server was needed.')
		} else {
			const started = await startStaticServer(showcaseDir)
			server = started.server
			baseUrl = `http://127.0.0.1:${started.port}/`
			unknowns.push(
				'file:// boot: the showcase did NOT boot from file:// (module script or fetch refusal); fell back to a minimal node:http static server on an ephemeral port.',
			)
		}

		globalThis.__u7fBaseUrl = baseUrl

		for (const variant of VARIANTS) {
			await captureVariant(browser, variant)
		}
	} finally {
		await browser.close()
		if (server !== null) {
			await new Promise((resolve) => server.close(resolve))
		}
	}

	unknowns.push(
		`Selectors used: variants-section specimen "${VARIANTS_SPECIMEN}" (ButtonPage.vue:100-108, the button.primary inside #button-variants), pressed host "${TOGGLE_HOST}" (ButtonPage.vue:694, the button.primary inside #button-toggle). #button-toggle itself is a <section>, not the button; the brief's "#button-toggle" names that section.`,
	)

	await writeFile(path.join(outDir, 'unknowns.txt'), unknowns.join('\n\n') + '\n', 'utf-8')
	await writeFile(
		path.join(outDir, 'steps-all.jsonl'),
		steps.map((entry) => JSON.stringify(entry)).join('\n') + '\n',
		'utf-8',
	)

	console.log('U7f-harness complete.')
	console.log(`Output directory: ${outDir}`)
	for (const line of unknowns) console.log(`- ${line}`)
}

await main()
