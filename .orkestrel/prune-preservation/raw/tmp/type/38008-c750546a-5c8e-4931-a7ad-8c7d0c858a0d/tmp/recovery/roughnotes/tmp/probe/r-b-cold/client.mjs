import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { resolveBrowser, resolvePinnedBrowser } from '../../../configs/browsers.ts'

const LIMIT = 20

const TARGETS = Object.freeze({
	historical: 'http://127.0.0.1:5198/',
	plain: 'http://127.0.0.1:5197/',
})

function appendError(errors, value) {
	if (errors.length < LIMIT) errors.push(value)
}

function readPath(value) {
	const url = new URL(value)
	return `${url.origin}${url.pathname}`
}

function readTarget(url, stem) {
	if (TARGETS[stem] === undefined || TARGETS[stem] !== url) {
		throw new Error(
			'Pass plain with http://127.0.0.1:5197/ or historical with http://127.0.0.1:5198/',
		)
	}
	return TARGETS[stem]
}

function readError(error) {
	return error instanceof Error ? error.message : String(error)
}

const [url, stem] = process.argv.slice(2)
const target = readTarget(url, stem)
const directory = resolve(fileURLToPath(new URL(`./${stem}/`, import.meta.url)))
const arrival = resolve(directory, 'arrival.png')
const destination = resolve(directory, 'products.png')
const errors = { page: [], request: [], script: [] }
const report = {
	destination,
	errors,
	final: undefined,
	heading: undefined,
	passed: false,
	screenshots: { arrival, destination },
	url: target,
}

let browser
let context

try {
	await mkdir(directory, { recursive: true })
	const provider = resolveBrowser(resolvePinnedBrowser(), process.platform, process.env)
	if (provider.connectOptions !== undefined) {
		browser = await chromium.connect(provider.connectOptions)
	} else {
		browser = await chromium.launch({ ...provider.launchOptions, headless: true })
	}
	context = await browser.newContext({ viewport: { height: 844, width: 390 } })
	const page = await context.newPage()
	page.on('pageerror', (error) => appendError(errors.page, readError(error)))
	page.on('requestfailed', (request) => {
		appendError(errors.request, {
			failure: request.failure()?.errorText ?? 'unknown request failure',
			path: readPath(request.url()),
		})
	})
	page.on('response', (response) => {
		if (response.request().resourceType() === 'script' && response.status() >= 400) {
			appendError(errors.script, { path: readPath(response.url()), status: response.status() })
		}
	})

	await page.goto(target, { waitUntil: 'networkidle' })
	const home = page.getByRole('heading', {
		level: 1,
		name: 'The knowledge that makes independent agents unstoppable.',
	})
	await home.waitFor({ state: 'visible' })
	report.heading = await home.innerText()
	await page.screenshot({ path: arrival })

	await page.getByRole('button', { name: 'Menu' }).click()
	const dialog = page.getByRole('dialog', { name: 'Menu' })
	await dialog.waitFor({ state: 'visible' })
	await dialog.getByRole('link', { name: 'Products, Site' }).click()
	const products = page.getByRole('heading', { level: 1, name: 'Products' })
	await products.waitFor({ state: 'visible' })
	await dialog.waitFor({ state: 'hidden' })
	await page.screenshot({ path: destination })

	await page.getByRole('button', { name: 'Menu' }).click()
	await dialog.waitFor({ state: 'visible' })
	await dialog.getByRole('button', { name: 'Close menu' }).click()
	await dialog.waitFor({ state: 'hidden' })
	report.final = page.url()
	if (errors.page.length > 0 || errors.request.length > 0 || errors.script.length > 0) {
		throw new Error('The dev entry reported application or module-loading errors')
	}
	report.passed = true
} catch (error) {
	report.error = readError(error)
	throw error
} finally {
	if (context !== undefined) await context.close()
	if (browser !== undefined) await browser.close()
	await mkdir(directory, { recursive: true })
	await writeFile(resolve(directory, 'report.json'), `${JSON.stringify(report, undefined, 2)}\n`)
	console.log(JSON.stringify(report))
}
