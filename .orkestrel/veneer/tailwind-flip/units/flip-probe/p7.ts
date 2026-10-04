import { launchBrowser, startServer, writeJSON } from './lib.ts'
import { mountPage, openFamily } from './browser.ts'
const { server, url } = await startServer()
const browser = await launchBrowser()
const results = []
try {
	for (const family of ['dropdown', 'popover', 'tooltip', 'modal']) {
		const readings = []
		for (const face of ['bootstrap', 'tailwindcss']) {
			const page = await browser.newPage()
			try {
				await mountPage(page, url, 1280, 'light', face)
				const event = await openFamily(page, family)
				const reading = await page.evaluate((family) => {
					let panel: Element | null = null
					if (family === 'dropdown') panel = document.querySelector('#dropdowns [data-bs-toggle="dropdown"][aria-expanded="true"]')?.parentElement?.querySelector('.dropdown-menu') ?? null
					else if (family === 'modal') panel = document.querySelector('#modal-live-archive')
					else {
						const id = document.querySelector(`#${family === 'tooltip' ? 'tooltips' : 'popovers'} [data-bs-toggle="${family}"]`)?.getAttribute('aria-describedby')
						panel = id ? document.getElementById(id) : null
					}
					if (!(panel instanceof HTMLElement)) throw new Error(`Missing ${family} panel`)
					const computed = getComputedStyle(panel)
					const properties = ['margin', 'inset', 'width', 'position']
					return { style: panel.getAttribute('style'), inline: Object.fromEntries(properties.map((property) => [property, panel.style.getPropertyValue(property)])), computed: Object.fromEntries(properties.map((property) => [property, computed.getPropertyValue(property)])), body: { style: document.body.getAttribute('style'), inline: document.body.style.paddingRight, computed: getComputedStyle(document.body).paddingRight } }
				}, family)
				readings.push({ face, event, reading })
			} catch (error) { readings.push({ face, error: String(error) }) }
			finally { await page.close() }
		}
		results.push({ family, expected: 'same inline declarations; computed placement may follow changed geometry', readings })
	}
	writeJSON('out/p7.json', results)
} finally { await browser.close(); server.close() }
console.log('P7 complete')
