// Calibration instrument: opens Elements' built showcase, drives every specimen below into every
// state it has, reads resolved styles and motion frames, and writes the readings and captures per
// browser under `.orkestrel/veneer/research/calibration/<browser>/`.
//
// Run: node .orkestrel/veneer/research/calibration.mjs
import { chromium } from 'file:///C:/Users/mikes/WebstormProjects/scaffold/node_modules/playwright/index.mjs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const SHOWCASE_PATH = 'C:/Users/mikes/WebstormProjects/elements/dist/showcase/index.html'
const SHOWCASE_DIGEST = 'cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792'
const SHOWCASE_URL = 'file:///' + SHOWCASE_PATH.replaceAll('\\', '/')
const OUTPUT_ROOT = path.join(HERE, 'calibration')
const VIEWPORT = Object.freeze({ width: 1100, height: 800 })
const ROOT_FONT_SIZE_CSS = 'html { font-size: 16px !important; }'
const MOTION_SAMPLE_MS = 700
// Longest declared transition in the showcase is 0.25 s; every settled read waits this long first.
const SETTLE_MS = 500
const CAPTURE_PADDING = 16

// Every state a specimen can be driven into. Not every specimen supports every state; the
// specimen's own `states` array names which apply.
const STATES = Object.freeze(['rest', 'hover', 'focus-visible', 'active', 'disabled', 'open', 'closed'])

// Every resolved CSS property read on a specimen element per state per mode.
const PROPERTIES = Object.freeze([
	'font-family',
	'font-size',
	'line-height',
	'font-weight',
	'padding-top',
	'padding-right',
	'padding-bottom',
	'padding-left',
	'border-top-width',
	'border-top-left-radius',
	'color',
	'background-color',
	'border-top-color',
	'box-shadow',
	'outline',
	'transition-property',
	'transition-duration',
	'transition-timing-function',
	'opacity',
	'transform',
	'translate',
])

// Every property read once per animation frame during a motion sample, plus the pseudo-element and
// backdrop readings a motion may add.
const MOTION_PROPERTIES = Object.freeze(['opacity', 'transform', 'translate', 'display'])
const MOTION_PSEUDO_PROPERTIES = Object.freeze(['block-size', 'opacity'])
const MOTION_BACKDROP_PROPERTIES = Object.freeze(['background-color', 'backdrop-filter'])

// Every specimen the map names, keyed by its own id, with its route, its reach, and the states it
// supports. `reach` is either `{ role, name }` (an accessible-name lookup) or `{ css }` (a
// selector), because several specimens (sized buttons, the disabled button, body copy, headings)
// have no unambiguous accessible name in the showcase.
const SPECIMENS = Object.freeze([
	Object.freeze({
		id: 'body-copy',
		route: '#/typography/typography-paragraph',
		reach: Object.freeze({ css: 'section#typography-paragraph p:last-of-type' }),
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h1',
		route: '#/headings/headings-cascade',
		reach: Object.freeze({ css: 'div.stack h1' }),
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h2',
		route: '#/headings/headings-cascade',
		reach: Object.freeze({ css: 'div.stack h2' }),
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h3',
		route: '#/headings/headings-cascade',
		reach: Object.freeze({ css: 'div.stack h3' }),
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h4',
		route: '#/headings/headings-cascade',
		reach: Object.freeze({ css: 'div.stack h4' }),
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h5',
		route: '#/headings/headings-cascade',
		reach: Object.freeze({ css: 'div.stack h5' }),
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'heading-h6',
		route: '#/headings/headings-cascade',
		reach: Object.freeze({ css: 'div.stack h6' }),
		states: Object.freeze(['rest']),
	}),
	Object.freeze({
		id: 'button-bare',
		route: '#/button/button-bare',
		reach: Object.freeze({ role: 'button', name: 'Save' }),
		states: Object.freeze(['rest', 'hover', 'focus-visible', 'active']),
	}),
	Object.freeze({
		id: 'button-primary',
		route: '#/button/button-variants',
		reach: Object.freeze({ role: 'button', name: 'Primary' }),
		states: Object.freeze(['rest', 'hover', 'focus-visible', 'active']),
	}),
	Object.freeze({
		id: 'button-subtle',
		route: '#/button/button-dropdown',
		reach: Object.freeze({ role: 'button', name: 'Subtle dropdown' }),
		states: Object.freeze(['rest', 'hover', 'focus-visible', 'active']),
	}),
	Object.freeze({
		id: 'button-small',
		route: '#/button/button-sizes',
		reach: Object.freeze({ css: 'section#button-sizes button.primary.small' }),
		states: Object.freeze(['rest', 'hover', 'focus-visible', 'active']),
	}),
	Object.freeze({
		id: 'button-large',
		route: '#/button/button-sizes',
		reach: Object.freeze({ css: 'section#button-sizes button.primary.large' }),
		states: Object.freeze(['rest', 'hover', 'focus-visible', 'active']),
	}),
	Object.freeze({
		id: 'button-disabled',
		route: '#/button/button-states',
		reach: Object.freeze({ role: 'button', name: '[disabled]' }),
		states: Object.freeze(['disabled']),
	}),
	Object.freeze({
		id: 'dialog-modal',
		route: '#/dialog-element/dialog-element-open-modes',
		reach: Object.freeze({ css: 'section#dialog-element-open-modes dialog:nth-of-type(2)' }),
		states: Object.freeze(['closed', 'open']),
		open: Object.freeze({ role: 'button', name: 'Open modal' }),
		close: Object.freeze({ css: 'section#dialog-element-open-modes dialog:nth-of-type(2) button' }),
		backdrop: true,
	}),
	Object.freeze({
		id: 'dialog-nonmodal',
		route: '#/dialog-element/dialog-element-open-modes',
		reach: Object.freeze({ css: 'section#dialog-element-open-modes dialog:nth-of-type(1)' }),
		states: Object.freeze(['closed', 'open']),
		open: Object.freeze({ role: 'button', name: 'Open inline (non-modal)' }),
		close: Object.freeze({ css: 'section#dialog-element-open-modes dialog:nth-of-type(1) button' }),
		backdrop: false,
	}),
	Object.freeze({
		id: 'details',
		route: '#/details/details-bare',
		reach: Object.freeze({ css: 'section#details-bare details' }),
		states: Object.freeze(['closed', 'open']),
		open: Object.freeze({ css: 'section#details-bare summary' }),
		close: Object.freeze({ css: 'section#details-bare summary' }),
		pseudo: '::details-content',
	}),
	Object.freeze({
		id: 'popover',
		route: '#/popover-surfaces/popover-surfaces-auto',
		reach: Object.freeze({ css: '#demo-pop-auto' }),
		states: Object.freeze(['closed', 'open']),
		open: Object.freeze({ role: 'button', name: 'Open auto popover' }),
		close: Object.freeze({ key: 'Escape' }),
		backdrop: false,
	}),
	Object.freeze({
		id: 'popover-hint',
		route: '#/popover-surfaces/popover-surfaces-hint',
		reach: Object.freeze({ css: '#demo-pop-hint' }),
		states: Object.freeze(['closed', 'open']),
		open: Object.freeze({ role: 'button', name: 'Hover-ish trigger' }),
		close: Object.freeze({ key: 'Escape' }),
		backdrop: false,
	}),
	Object.freeze({
		id: 'aside-drawer',
		route: '#/aside/aside-popover',
		reach: Object.freeze({ css: '#aside-drawer-end' }),
		states: Object.freeze(['closed', 'open']),
		open: Object.freeze({ role: 'button', name: 'Slide from end (default)' }),
		close: Object.freeze({ css: '#aside-drawer-end button[popovertarget="aside-drawer-end"]' }),
		backdrop: true,
	}),
])

// Every motion the brief names: which specimen it drives, the trigger that opens it, the control
// that closes it, and whether it carries a pseudo-element or backdrop reading beside the element
// readings.
const MOTIONS = Object.freeze([
	Object.freeze({ id: 'dialog-modal-open', specimenId: 'dialog-modal', direction: 'open', backdrop: true }),
	Object.freeze({ id: 'dialog-modal-close', specimenId: 'dialog-modal', direction: 'close', backdrop: true }),
	Object.freeze({ id: 'dialog-nonmodal-open', specimenId: 'dialog-nonmodal', direction: 'open', backdrop: false }),
	Object.freeze({ id: 'dialog-nonmodal-close', specimenId: 'dialog-nonmodal', direction: 'close', backdrop: false }),
	Object.freeze({ id: 'details-open', specimenId: 'details', direction: 'open', pseudo: '::details-content' }),
	Object.freeze({ id: 'details-close', specimenId: 'details', direction: 'close', pseudo: '::details-content' }),
	Object.freeze({ id: 'popover-open', specimenId: 'popover', direction: 'open', backdrop: false }),
	Object.freeze({ id: 'popover-close', specimenId: 'popover', direction: 'close', backdrop: false }),
	Object.freeze({ id: 'popover-hint-open', specimenId: 'popover-hint', direction: 'open', backdrop: false }),
	Object.freeze({ id: 'popover-hint-close', specimenId: 'popover-hint', direction: 'close', backdrop: false }),
	Object.freeze({ id: 'drawer-open', specimenId: 'aside-drawer', direction: 'open', backdrop: true }),
	Object.freeze({ id: 'drawer-close', specimenId: 'aside-drawer', direction: 'close', backdrop: true }),
])

const BROWSERS = Object.freeze([
	Object.freeze({ id: 'chromium', launch: {} }),
	Object.freeze({ id: 'msedge', launch: { channel: 'msedge' } }),
])

const MODES = Object.freeze(['light', 'dark'])

async function verifyDigest() {
	const buffer = await readFile(SHOWCASE_PATH)
	const digest = createHash('sha256').update(buffer).digest('hex')
	if (digest !== SHOWCASE_DIGEST) {
		throw new Error(`showcase digest mismatch: expected ${SHOWCASE_DIGEST}, read ${digest}`)
	}
}

function resolveLocator(page, reach) {
	// First match: the showcase repeats a specimen's tag and name across sections, and the map's
	// route lands the specimen section first (Orchestrator DOM probe, 2026-09-20).
	if ('css' in reach) return page.locator(reach.css).first()
	return page.getByRole(reach.role, { name: reach.name, exact: true }).first()
}

async function setMode(page, mode) {
	const button = page.getByRole('button', { name: /Switch theme \(currently (light|dark)\)/ })
	const label = await button.getAttribute('aria-label').catch(() => null)
	const current = (label ?? (await button.textContent().catch(() => ''))).includes('dark') ? 'dark' : 'light'
	if (current !== mode) await button.click()
	// The showcase writes `data-mode="dark"` and removes the attribute for light, so an absent
	// attribute reads as light (Orchestrator probe, 2026-09-20, Chromium).
	await page.waitForFunction(
		(expected) => (document.documentElement.getAttribute('data-mode') ?? 'light') === expected,
		mode,
		{ timeout: 5000 },
	)
}

async function readElementStyle(locator, unknowns, context) {
	try {
		return await locator.evaluate((element, properties) => {
			const computed = getComputedStyle(element)
			const style = {}
			for (const property of properties) style[property] = computed.getPropertyValue(property)
			const rect = element.getBoundingClientRect()
			return { style, rect: { width: rect.width, height: rect.height } }
		}, PROPERTIES)
	} catch (error) {
		unknowns.push({ context, reason: 'element unreachable for style read', message: String(error) })
		return null
	}
}

async function readPseudoStyle(locator, pseudo, unknowns, context) {
	try {
		return await locator.evaluate(
			(element, pseudoSelector) => {
				const computed = getComputedStyle(element, pseudoSelector)
				return {
					'block-size': computed.getPropertyValue('block-size'),
					opacity: computed.getPropertyValue('opacity'),
				}
			},
			pseudo,
		)
	} catch (error) {
		unknowns.push({ context, reason: 'pseudo-element style read failed', message: String(error) })
		return null
	}
}

async function driveState(page, locator, state, specimen, unknowns) {
	if (state === 'rest' || state === 'closed' || state === 'disabled') return async () => {}
	if (state === 'hover') {
		await locator.hover()
		return () => page.mouse.move(0, 0)
	}
	if (state === 'active') {
		const box = await locator.boundingBox()
		if (!box) {
			unknowns.push({ context: specimen.id, reason: 'no bounding box for active state' })
			return async () => {}
		}
		await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
		await page.mouse.down()
		return async () => page.mouse.up()
	}
	if (state === 'focus-visible') {
		await page.locator('body').focus().catch(() => {})
		const focusable = await page.locator('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').count()
		const trail = []
		let reached = false
		for (let index = 0; index < focusable; index += 1) {
			await page.keyboard.press('Tab')
			const isTarget = await locator.evaluate((element) => element === document.activeElement).catch(() => false)
			trail.push(isTarget)
			if (isTarget) {
				reached = true
				break
			}
		}
		if (!reached) unknowns.push({ context: specimen.id, reason: 'focus-visible not reached by trail', trailLength: trail.length })
		return async () => {}
	}
	return async () => {}
}

async function openSpecimen(page, specimen, unknowns) {
	if (!specimen.open) return
	if ('key' in specimen.open) return
	const trigger = resolveLocator(page, specimen.open)
	try {
		await trigger.click()
	} catch (error) {
		unknowns.push({ context: specimen.id, reason: 'open trigger click failed', message: String(error) })
	}
}

async function closeSpecimen(page, specimen, unknowns) {
	if (!specimen.close) return
	try {
		if ('key' in specimen.close) {
			await page.keyboard.press(specimen.close.key)
		} else {
			const control = resolveLocator(page, specimen.close)
			await control.click()
		}
	} catch (error) {
		unknowns.push({ context: specimen.id, reason: 'close control failed', message: String(error) })
	}
}

async function captureScreenshot(page, locator, filePath, unknowns, context) {
	try {
		const box = await locator.boundingBox()
		if (!box) {
			unknowns.push({ context, reason: 'no bounding box for screenshot' })
			return
		}
		const clip = {
			x: Math.max(0, box.x - CAPTURE_PADDING),
			y: Math.max(0, box.y - CAPTURE_PADDING),
			width: box.width + CAPTURE_PADDING * 2,
			height: box.height + CAPTURE_PADDING * 2,
		}
		await page.screenshot({ path: filePath, clip })
	} catch (error) {
		unknowns.push({ context, reason: 'screenshot failed', message: String(error) })
	}
}

async function readSpecimen(page, specimen, outputDir, browserId, unknowns) {
	const readings = {}
	await page.goto(SHOWCASE_URL + specimen.route, { waitUntil: 'load' })
	await page.reload({ waitUntil: 'load' })
	await page.addStyleTag({ content: ROOT_FONT_SIZE_CSS })
	const locator = resolveLocator(page, specimen.reach)
	try {
		await locator.waitFor({ state: 'attached', timeout: 10000 })
	} catch (error) {
		unknowns.push({ context: specimen.id, reason: 'reach target not attached', message: String(error) })
		return readings
	}
	for (const mode of MODES) {
		await setMode(page, mode)
		await page.waitForTimeout(SETTLE_MS)
		readings[mode] = {}
		for (const state of specimen.states) {
			if (state === 'open') await openSpecimen(page, specimen, unknowns)
			const cleanup = await driveState(page, locator, state, specimen, unknowns)
			await page.waitForTimeout(SETTLE_MS)
			const style = await readElementStyle(locator, unknowns, `${specimen.id}:${state}:${mode}`)
			readings[mode][state] = style
			const shotPath = path.join(outputDir, `${specimen.id}--${state}--${mode}.png`)
			await captureScreenshot(page, locator, shotPath, unknowns, `${specimen.id}:${state}:${mode}`)
			await cleanup()
			if (state === 'open' && specimen.close) await closeSpecimen(page, specimen, unknowns)
			await page.waitForTimeout(SETTLE_MS)
		}
	}
	return readings
}

function firstSettledFrame(frames) {
	if (frames.length === 0) return null
	for (let index = 1; index < frames.length; index += 1) {
		const previous = JSON.stringify(frames[index - 1])
		const current = JSON.stringify(frames[index])
		if (previous === current) return { index, elapsedMs: frames[index].elapsedMs }
	}
	return { index: frames.length - 1, elapsedMs: frames[frames.length - 1].elapsedMs }
}

async function runMotion(page, motion, specimen, outputDir, browserId, reducedMotion, unknowns) {
	await page.goto(SHOWCASE_URL + specimen.route, { waitUntil: 'load' })
	await page.reload({ waitUntil: 'load' })
	await page.addStyleTag({ content: ROOT_FONT_SIZE_CSS })
	const locator = resolveLocator(page, specimen.reach)
	const cssSelector = 'css' in specimen.reach ? specimen.reach.css : null
	if (motion.direction === 'close') {
		await openSpecimen(page, specimen, unknowns)
		await locator.waitFor({ state: 'attached', timeout: 10000 }).catch(() => {})
		await page.waitForTimeout(MOTION_SAMPLE_MS)
	}
	const trigger =
		motion.direction === 'open' ? () => openSpecimen(page, specimen, unknowns) : () => closeSpecimen(page, specimen, unknowns)
	const samplePromise = cssSelector
		? sampleMotionBySelector(page, cssSelector, motion.pseudo, motion.backdrop)
		: Promise.resolve({ frames: [], animationCount: 0, error: 'no css selector for motion sampling' })
	await trigger()
	const result = await samplePromise
	const settled = firstSettledFrame(result.frames)
	const settledFrame = settled ? result.frames[settled.index] : null
	if (settledFrame && cssSelector) {
		const shotPath = path.join(outputDir, `${motion.id}--settled.png`)
		await captureScreenshot(page, locator, shotPath, unknowns, motion.id)
	}
	return { ...result, settled, reducedMotion }
}

async function sampleMotionBySelector(page, selector, pseudo, backdrop) {
	return page.evaluate(
		({ selector: sel, sampleMs, pseudoSelector, hasBackdrop, elementProps, pseudoProps, backdropProps }) => {
			return new Promise((resolve) => {
				const element = document.querySelector(sel)
				if (!element) {
					resolve({ frames: [], animationCount: 0, error: 'element not found' })
					return
				}
				const start = performance.now()
				const frames = []
				const animationCount = element.getAnimations ? element.getAnimations().length : 0
				const sample = () => {
					const elapsed = performance.now() - start
					const computed = getComputedStyle(element)
					const frame = { elapsedMs: elapsed }
					for (const prop of elementProps) frame[prop] = computed.getPropertyValue(prop)
					if (pseudoSelector) {
						const pseudoComputed = getComputedStyle(element, pseudoSelector)
						frame.pseudo = {}
						for (const prop of pseudoProps) frame.pseudo[prop] = pseudoComputed.getPropertyValue(prop)
					}
					if (hasBackdrop) {
						const backdropComputed = getComputedStyle(element, '::backdrop')
						frame.backdrop = {}
						for (const prop of backdropProps) frame.backdrop[prop] = backdropComputed.getPropertyValue(prop)
					}
					frames.push(frame)
					if (elapsed < sampleMs) {
						requestAnimationFrame(sample)
					} else {
						resolve({ frames, animationCount })
					}
				}
				requestAnimationFrame(sample)
			})
		},
		{
			selector,
			sampleMs: MOTION_SAMPLE_MS,
			pseudoSelector: pseudo,
			hasBackdrop: backdrop,
			elementProps: MOTION_PROPERTIES,
			pseudoProps: MOTION_PSEUDO_PROPERTIES,
			backdropProps: MOTION_BACKDROP_PROPERTIES,
		},
	)
}

async function runBrowser(browserConfig) {
	const outputDir = path.join(OUTPUT_ROOT, browserConfig.id)
	await mkdir(outputDir, { recursive: true })
	const unknowns = []
	const browser = await chromium.launch(browserConfig.launch)
	const version = browser.version()
	const page = await browser.newPage({ viewport: VIEWPORT })

	const specimenReadings = {}
	for (const specimen of SPECIMENS) {
		specimenReadings[specimen.id] = await readSpecimen(page, specimen, outputDir, browserConfig.id, unknowns)
	}

	const motionReadings = {}
	for (const motion of MOTIONS) {
		const specimen = SPECIMENS.find((candidate) => candidate.id === motion.specimenId)
		if (!specimen) {
			unknowns.push({ context: motion.id, reason: 'no specimen for motion' })
			continue
		}
		motionReadings[motion.id] = {
			ordinary: await runMotion(page, motion, specimen, outputDir, browserConfig.id, false, unknowns),
		}
		await page.emulateMedia({ reducedMotion: 'reduce' })
		motionReadings[motion.id].reduced = await runMotion(page, motion, specimen, outputDir, browserConfig.id, true, unknowns)
		await page.emulateMedia({ reducedMotion: 'no-preference' })
	}

	await browser.close()

	const output = {
		browser: browserConfig.id,
		version,
		date: new Date().toISOString(),
		showcaseDigest: SHOWCASE_DIGEST,
		specimens: specimenReadings,
		motions: motionReadings,
		unknowns,
	}
	await writeFile(path.join(outputDir, 'calibration.json'), JSON.stringify(output, null, 2))
	return { unknownCount: unknowns.length }
}

async function main() {
	await verifyDigest()
	await mkdir(OUTPUT_ROOT, { recursive: true })
	for (const browserConfig of BROWSERS) {
		try {
			await runBrowser(browserConfig)
		} catch (error) {
			console.error(`browser ${browserConfig.id} failed to launch or run: ${String(error)}`)
			process.exitCode = 1
		}
	}
}

main().catch((error) => {
	console.error(String(error && error.stack ? error.stack : error))
	process.exitCode = 1
})
