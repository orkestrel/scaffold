import { launchBrowser, startServer, writeJSON } from './lib.ts'
import { mountPage } from './browser.ts'
const { server, url } = await startServer()
const browser = await launchBrowser()
const results = []
try {
	for (const width of [1280, 390]) for (const face of ['bootstrap', 'unexcluded', 'tailwindcss']) {
		const page = await browser.newPage()
		await mountPage(page, url, width, 'dark', face)
		const reading = await page.evaluate(() => {
			const subjects = [...document.querySelectorAll('header, header *, figure.card[aria-labelledby], figure.card[aria-labelledby] > .card-body, figure.card[aria-labelledby] > figcaption')]
			for (const name of ['border', 'shadow', 'rounded', 'bg-white', 'bg-transparent', 'text-white']) {
				const specimen = document.querySelector(`main .card-body .${name}`)
				if (specimen) subjects.push(specimen)
			}
			return subjects.map((element, index) => {
				const style = getComputedStyle(element)
				const properties: Record<string, string> = {}
				for (let position = 0; position < style.length; position++) {
					const property = style[position]
					if (/^border-.+-color$/.test(property) || ['box-shadow', 'background-color', 'color'].includes(property)) properties[property] = style.getPropertyValue(property)
				}
				properties['border-radius'] = style.getPropertyValue('border-radius')
				return { index, tag: element.localName, classes: [...element.classList], owner: element.getAttribute('aria-labelledby'), properties }
			})
		})
		results.push({ width, face, expected: 'Bootstrap and unexcluded keep Bootstrap shared utilities; tailwindcss uses Tailwind shared utilities', reading })
		await page.close()
	}
	writeJSON('out/p8.json', results)
} finally { await browser.close(); server.close() }
console.log('P8 complete')
