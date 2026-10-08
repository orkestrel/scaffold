// Reads whether the showcase engine boots in a secure and in an insecure context on an Android
// descriptor. Usage: node insecure.ts [CHROMIUM_EXECUTABLE]
import { readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'node:http'
import { chromium } from 'playwright'

const page_html = readFileSync('/home/user/veneer/showcase/browser.html', 'utf8')
const descriptor = {
	viewport: { width: 384, height: 854 },
	deviceScaleFactor: 2.8125,
	isMobile: true,
	hasTouch: true,
	userAgent:
		'Mozilla/5.0 (Linux; Android 14; SM-G996B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36 EdgA/141.0.0.0',
}
const probe = `(() => {
	const sort = document.querySelector('[data-vn-sort] th button')
	const th = sort ? sort.closest('th') : null
	const before = th ? th.getAttribute('aria-sort') : 'no-button'
	if (sort) sort.click()
	const copy = document.querySelector('button[command="--copy"]')
	if (copy) copy.click()
	const list = document.querySelector('[data-vn-drag]')
	const order = list ? Array.from(list.children).map((c) => (c.textContent || '').trim().slice(0, 12)) : []
	const next = list ? list.querySelector('button[command="--next"]') : null
	if (next) next.click()
	const after = list ? Array.from(list.children).map((c) => (c.textContent || '').trim().slice(0, 12)) : []
	return {
		secure: window.isSecureContext,
		randomUUID: typeof crypto.randomUUID,
		commandForElement: 'commandForElement' in HTMLButtonElement.prototype,
		moveBefore: typeof Element.prototype.moveBefore,
		sortBefore: before,
		sortAfter: th ? th.getAttribute('aria-sort') : 'no-button',
		copyStatus: (document.querySelector('[data-vn-copy] ~ output, output[aria-live]') || {}).value ?? null,
		outputs: Array.from(document.querySelectorAll('output')).map((o) => [o.getAttribute('aria-label') || o.id || '', o.value || o.textContent]).slice(0, 12),
		orderBefore: order,
		orderAfter: after,
		moved: JSON.stringify(order) !== JSON.stringify(after),
	}
})()`

async function main(): Promise<void> {
	const executablePath = process.argv[2] ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
	const build = process.argv[3] ?? '141'
	const server = createServer((request, response) => {
		response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
		response.end(page_html)
	})
	await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()))
	const address = server.address()
	const port = typeof address === 'object' && address ? address.port : 0
	const browser = await chromium.launch({ executablePath })
	const readings: Record<string, unknown> = {}
	for (const [name, url] of [
		['file', 'file:///home/user/veneer/showcase/browser.html'],
		['localhost', `http://127.0.0.1:${port}/browser.html`],
		['insecure-host', 'http://veneer.test/browser.html'],
	] as const) {
		const context = await browser.newContext(descriptor)
		await context.route('http://veneer.test/**', (route) =>
			route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: page_html }),
		)
		const page = await context.newPage()
		const errors: string[] = []
		page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`))
		page.on('console', (message) => {
			if (message.type() === 'error' || message.type() === 'warning') errors.push(`${message.type()}: ${message.text()}`)
		})
		await page.goto(url, { waitUntil: 'load' })
		await page.waitForTimeout(1500)
		const reading = await page.evaluate(probe)
		await page.waitForTimeout(500)
		const outputs = await page.evaluate(
			'Array.from(document.querySelectorAll("output")).map((o) => [o.getAttribute("aria-label") || o.id || "", o.value || o.textContent]).slice(0, 12)',
		)
		readings[name] = { url, ...(reading as object), outputsAfter: outputs, errors: errors.slice(0, 10) }
		await context.close()
	}
	await browser.close()
	server.close()
	writeFileSync(`/home/user/veneer/tmp/units/mobile-2026-10-08/insecure-${build}.json`, JSON.stringify(readings, null, '\t'))
	console.log(JSON.stringify(readings, null, '\t'))
}

await main()
