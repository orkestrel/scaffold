// Usage: node tmp/units/flip-showcase/p4.ts. Exit 1 refuses a chrome or header departure.
import { launchBrowser, startServer, writeJSON } from './lib.ts'
import { mountPage, readSurface } from './browser.ts'

function replaceChrome(inverse: boolean) {
	const chrome = new Set(document.querySelectorAll('header, header *, main, main > *, main > * > h2, main section > h3, main section > p, footer, footer *, #tailwindcss > .alert, #tailwindcss > .alert *, #tailwindcss > pre'))
	for (const figure of document.querySelectorAll('figure.card[aria-labelledby]')) {
		chrome.add(figure)
		for (const child of figure.children) {
			chrome.add(child)
			if (child.localName === 'figcaption') for (const element of child.querySelectorAll('*')) chrome.add(element)
		}
	}
	const census = [...chrome].filter((element) => element.matches('.h-100, .gap-3, .rounded, .border')).map((element) => ({ tag: element.localName, classes: element.getAttribute('class') }))
	const changes = []
	const counts = { figures: 0, bodies: 0, gaps: 0, radii: 0, borders: 0, wideBodies: 0 }
	for (const element of chrome) {
		const before = element.getAttribute('class') ?? ''
		if (inverse) {
			if (element.matches('figure.card.flex-fill')) {
				element.classList.replace('flex-fill', 'h-100')
				element.parentElement?.classList.remove('d-flex')
				counts.figures++
			}
			if (element.matches('.row-gap-3.column-gap-3')) {
				element.classList.remove('row-gap-3', 'column-gap-3')
				element.classList.add('gap-3')
				counts.gaps++
				if (element.matches('.card-body')) counts.bodies++
			}
			if (element.classList.contains('rounded-2')) { element.classList.replace('rounded-2', 'rounded'); counts.radii++ }
			if (element.matches('.border-top.border-end.border-bottom.border-start')) {
				element.classList.remove('border-top', 'border-end', 'border-bottom', 'border-start')
				element.classList.add('border')
				counts.borders++
			}
		} else {
			if (element.matches('figure.card.h-100')) {
				element.classList.replace('h-100', 'flex-fill')
				element.parentElement?.classList.add('d-flex')
				counts.figures++
			}
			if (element.matches('.card-body.w-100')) { element.classList.replace('w-100', 'flex-fill'); counts.wideBodies++ }
			if (element.classList.contains('gap-3')) {
				element.classList.remove('gap-3')
				element.classList.add('row-gap-3', 'column-gap-3')
				counts.gaps++
				if (element.matches('.card-body')) counts.bodies++
			}
			if (element.classList.contains('rounded')) { element.classList.replace('rounded', 'rounded-2'); counts.radii++ }
			if (element.classList.contains('border')) {
				element.classList.remove('border')
				element.classList.add('border-top', 'border-end', 'border-bottom', 'border-start')
				counts.borders++
			}
		}
		if (before !== element.getAttribute('class')) changes.push({ tag: element.localName, before, after: element.getAttribute('class') })
	}
	return { population: chrome.size, census, changes, counts, remaining: [...chrome].filter((element) => element.matches('.h-100, .gap-3, .rounded, .border')).length }
}

const { server, url } = await startServer()
const browser = await launchBrowser()
const results = []
try {
	for (const width of [1280, 390]) {
		const page = await browser.newPage()
		await mountPage(page, url, width)
		const inverted = await page.evaluate(replaceChrome, true)
		await page.evaluate(readSurface, { baseline: true, scope: 'body *:not(script):not(style)' })
		const forward = await page.evaluate(replaceChrome, false)
		const comparison = await page.evaluate(() => {
			const elements = [...document.querySelectorAll('body *:not(script):not(style)')]
			const departures = []
			for (const previous of window.flipBaseline ?? []) {
				const element = elements[Number.parseInt(previous.key)]
				if (!element) throw new Error(`Lost subject ${previous.key}`)
				const style = getComputedStyle(element, previous.pseudo || null)
				for (let index = 0; index < style.length; index++) {
					const property = style[index]
					if (!property || property.startsWith('--')) continue
					const F = style.getPropertyValue(property)
					const A = previous.values[property]
					if (A === F) continue
					const allowed = !previous.pseudo && (
						property === 'display' && A === 'block' && F === 'flex' && element.matches('div.d-flex') && element.querySelector(':scope > figure.card.flex-fill') !== null ||
						element.matches('figure.card.flex-fill') && (property === 'flex-grow' && A === '0' && F === '1' || ['min-height', 'min-block-size'].includes(property) && A === '0px' && F === 'auto')
					)
					departures.push({ key: previous.key, property, A, F, allowed })
				}
				const rect = element.getBoundingClientRect()
				const box = element.getClientRects().length ? [rect.x, rect.y, rect.width, rect.height] : null
				if (JSON.stringify(previous.box) !== JSON.stringify(box)) departures.push({ key: previous.key, property: 'box', A: previous.box, F: box, allowed: false })
			}
			return { subjects: window.flipBaseline?.length, departures }
		})
		const header = width === 390 ? await page.evaluate(() => {
			const group = document.querySelector('[aria-label="Stylesheets"]')
			if (!group) throw new Error('Stylesheets group absent')
			const buttons = [...group.querySelectorAll('button')].map((element) => ({ text: element.textContent, box: element.getBoundingClientRect().toJSON() }))
			return { group: group.getBoundingClientRect().toJSON(), buttons, buttonsWrap: new Set(buttons.map((button) => button.box.y)).size > 1, overflow: group.getBoundingClientRect().right > innerWidth }
		}) : undefined
		const kinds: Record<string, number> = {}
		for (const departure of comparison.departures) kinds[departure.property] = (kinds[departure.property] ?? 0) + 1
		const result = { width, subjects: comparison.subjects, population: forward.population, sourceCensus: inverted.census, census: forward.remaining, counts: forward.counts, mutations: forward.changes, departureCount: comparison.departures.length, kinds, departures: comparison.departures, header }
		results.push(result)
		writeJSON('out/p4.json', results)
		if (inverted.census.length || forward.remaining || comparison.departures.some((row) => !row.allowed) || header?.buttonsWrap || header?.overflow || header && header.buttons.length !== 3) throw new Error(`P4 expectation failed at ${width}; see out/p4.json`)
		console.log(JSON.stringify({ width, kinds, census: forward.remaining, counts: forward.counts, header }))
		await page.close()
	}
} finally { await browser.close(); server.close() }
console.log('P4 complete')
