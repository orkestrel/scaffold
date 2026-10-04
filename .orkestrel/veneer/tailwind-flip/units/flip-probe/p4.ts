import { launchBrowser, startServer, writeJSON } from './lib.ts'
import { mountPage, readSurface } from './browser.ts'
const { server, url } = await startServer()
const browser = await launchBrowser()
const results = []
try {
	for (const width of [1280, 390]) {
		const page = await browser.newPage()
		await mountPage(page, url, width)
		await page.evaluate(readSurface, { baseline: true, scope: 'body *:not(script):not(style)' })
		const mutations = await page.evaluate(() => {
			const chrome = new Set(document.querySelectorAll('header, header *, main, main > *, main > * > h2, main section > h3, main section > p, footer, footer *'))
			for (const figure of document.querySelectorAll('figure.card[aria-labelledby]')) {
				chrome.add(figure)
				for (const child of figure.children) {
					chrome.add(child)
					if (child.localName === 'figcaption') for (const element of child.querySelectorAll('*')) chrome.add(element)
				}
			}
			const changes = []
			for (const element of chrome) {
				const before = element.getAttribute('class') ?? ''
				if (element.matches('figure.card.h-100')) {
					element.classList.replace('h-100', 'flex-fill')
					element.parentElement?.classList.add('d-flex')
				}
				if (element.matches('.card-body.w-100')) element.classList.replace('w-100', 'flex-fill')
				if (element.classList.contains('gap-3')) { element.classList.remove('gap-3'); element.classList.add('row-gap-3', 'column-gap-3') }
				if (element.classList.contains('rounded')) element.classList.replace('rounded', 'rounded-2')
				if (element.classList.contains('border')) { element.classList.remove('border'); element.classList.add('border-top', 'border-end', 'border-bottom', 'border-start') }
				if (before !== element.getAttribute('class')) changes.push({ tag: element.localName, before, after: element.getAttribute('class') })
			}
			return changes
		})
		const comparison = await page.evaluate(() => {
			const elements = [...document.querySelectorAll('body *:not(script):not(style)')]
			const departures = []
			for (const previous of window.flipBaseline ?? []) {
				const element = elements[Number.parseInt(previous.key)]
				if (!element) continue
				const style = getComputedStyle(element, previous.pseudo || null)
				for (let index = 0; index < style.length; index++) {
					const property = style[index]
					if (property.startsWith('--')) continue
					const F = style.getPropertyValue(property)
					if (previous.values[property] !== F) departures.push({ key: previous.key, property, A: previous.values[property], F })
				}
				const rect = element.getBoundingClientRect()
				const box = element.getClientRects().length ? [rect.x, rect.y, rect.width, rect.height] : null
				if (JSON.stringify(previous.box) !== JSON.stringify(box)) departures.push({ key: previous.key, property: 'box', A: previous.box, F: box })
			}
			return { subjects: window.flipBaseline?.length, departures }
		})
		const departures = comparison.departures
		let header
		if (width === 390) header = await page.evaluate(() => {
			const group = document.querySelector('[aria-label="Stylesheets"]')
			const button = group?.querySelector('button')
			if (!group || !button) throw new Error('Stylesheets buttons absent')
			const clone = button.cloneNode(true)
			if (!(clone instanceof HTMLElement)) throw new Error('Button clone failed')
			clone.textContent = 'Tailwind without the layer'
			group.append(clone)
			const boxes = [...document.querySelectorAll('header, header > div, header > div > div, [aria-label="Stylesheets"], [aria-label="Stylesheets"] button')].map((element) => ({ tag: element.localName, text: element.textContent, box: element.getBoundingClientRect().toJSON(), wrap: getComputedStyle(element).flexWrap }))
			const buttons = [...group.querySelectorAll('button')].map((element) => element.getBoundingClientRect())
			return { boxes, buttonsWrap: new Set(buttons.map((box) => box.y)).size > 1, overflow: group.getBoundingClientRect().right > innerWidth }
		})
		results.push({ width, expectedDepartures: 0, subjects: comparison.subjects, mutations, departureCount: departures.length, departures, header })
		await page.close()
	}
	writeJSON('out/p4.json', results)
} finally { await browser.close(); server.close() }
console.log('P4 complete')
