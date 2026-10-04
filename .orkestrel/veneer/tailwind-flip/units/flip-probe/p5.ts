import { launchBrowser, startServer, writeJSON, readSheet } from './lib.ts'
import { mountPage } from './browser.ts'
const rows = [
	['Tailwind padding on a Bootstrap button', 'padding', 'button', 'padding-left', '12px', '32px', '32px'],
	['Shared spacing and radius follow Tailwind', 'spacing', '.mt-3', 'margin-top', '16px', '16px', '12px'],
	['Shared spacing and radius follow Tailwind', 'spacing', '.gap-4', 'column-gap', '24px', '24px', '16px'],
	['Shared spacing and radius follow Tailwind', 'spacing', 'span.rounded', 'border-top-left-radius', '6px', '6px', '4px'],
	['Collapse stays visible', 'collapse', '.collapse', 'display', 'block', 'block', 'block'],
	['Collapse stays visible', 'collapse', '.collapse', 'visibility', 'visible', 'collapse', 'visible'],
	["Container keeps Bootstrap's widths", 'container', '.container', 'padding-left', '12px', '12px', '12px'],
	["Container keeps Bootstrap's widths", 'container', '.container', 'max-width', '1140px', '1280px', '1140px'],
	['Pill radius beside rounded-full', 'radius', 'button', 'border-top-left-radius', '800px', '800px', '800px'],
	['Tailwind grid in a card body', 'grid', '.grid', 'display', 'block', 'grid', 'grid'],
	['Tailwind variant at the md breakpoint', 'responsive', '.md\\:flex', 'display', 'block', 'flex', 'flex'],
	['Arbitrary margin value', 'arbitrary', '.mt-\\[1rem\\]', 'margin-top', '0px', '16px', '16px'],
	['Bare heading beside a heading class', 'scratch', '#bare-heading', 'font-size', '20px', '20px', '16px'],
	['Bare heading beside a heading class', 'scratch', '.h5', 'font-size', '20px', '20px', '20px'],
	["Bootstrap card on Tailwind's reset", 'scratch', '.card-title', 'font-weight', '500', '500', '500'],
	["Bootstrap card on Tailwind's reset", 'scratch', '.card-text', 'margin-bottom', '16px', '16px', '16px'],
	["Bootstrap card on Tailwind's reset", 'scratch', '#bare-paragraph', 'margin-bottom', '16px', '16px', '0px'],
	['Bare image and list', 'bare', 'img', 'display', 'inline', 'block', 'block'],
	['Bare image and list', 'bare', 'ul', 'list-style-type', 'disc', 'none', 'none'],
	['Icon in a Bootstrap button', 'scratch', 'svg.bi', 'display', 'inline', 'block', 'inline'],
	['Hidden attribute with a display utility', 'departure', '[hidden]', 'display', 'flex', 'none', 'none'],
	['Border width without a border style', 'scratch', '.border-1', 'border-top-width', '0px', '1px', '1px'],
]
const { server, url } = await startServer()
const browser = await launchBrowser()
const results = []
try {
	for (const width of [1280, 390]) {
		const readings: string[][] = rows.map(() => [])
		for (const face of ['bootstrap', 'unexcluded', 'tailwindcss']) {
			const page = await browser.newPage()
			const scratch = await browser.newPage({ viewport: { width, height: 800 } })
			await mountPage(page, url, width, 'light', face)
			const bootstrap = readSheet('lifted.css')
			const css = face === 'bootstrap' ? bootstrap : face === 'unexcluded' ? readSheet('unexcluded.css') + bootstrap : readSheet('recipe.css')
			await scratch.setContent(`<!doctype html><html data-bs-theme="light"><head><style>${css}</style></head><body><h5 id="bare-heading">Harbor schedule</h5><div class="h5">Harbor schedule</div><div class="card"><div class="card-body"><h5 class="card-title">Arrival</h5><p class="card-text">Cargo cleared</p><p id="bare-paragraph">Next arrival</p><button class="btn btn-primary"><svg class="bi" width="16" height="16"></svg>Details</button></div></div><div class="border-1">Border width</div></body></html>`)
			for (const [index, row] of rows.entries()) {
				const [, id, subject, property] = row
				const target = id === 'scratch' ? scratch.locator(subject) : page.locator(`figure[aria-labelledby="tailwindcss-${id}-title"]`).locator(subject)
				readings[index].push(await target.first().evaluate((element, property) => getComputedStyle(element).getPropertyValue(property), property))
			}
			await page.close()
			await scratch.close()
		}
		for (const [index, row] of rows.entries()) {
			const expected = width === 390 && row[3] === 'max-width' ? ['none', 'none', 'none'] : width === 390 && row[1] === 'responsive' ? ['block', 'block', 'block'] : row.slice(4)
			results.push({ specimen: row[0], subject: row[2], property: row[3], source: row[1] === 'scratch' ? 'scratch page' : 'shipped page', width, expected, measured: readings[index], matches: JSON.stringify(expected) === JSON.stringify(readings[index]) })
		}
	}
	const measured = []
	for (const face of ['bootstrap', 'unexcluded', 'tailwindcss']) {
		const page = await browser.newPage({ viewport: { width: 768, height: 800 } })
		const css = face === 'bootstrap' ? readSheet('lifted.css') : face === 'unexcluded' ? readSheet('unexcluded.css') + readSheet('lifted.css') : readSheet('recipe.css')
		await page.setContent(`<!doctype html><style>${css}</style><div class="text-center text-md-start">Responsive alignment</div>`)
		measured.push(await page.locator('div').evaluate((element) => getComputedStyle(element).textAlign))
		await page.close()
	}
	results.push({ specimen: 'Responsive alignment at md', subject: '.text-center.text-md-start', property: 'text-align', source: 'scratch page', width: 768, expected: ['left', 'left', 'start'], measured, matches: JSON.stringify(measured) === JSON.stringify(['left', 'left', 'start']), designWording: 'start' })
	writeJSON('out/p5.json', results)
} finally { await browser.close(); server.close() }
console.log('P5 complete')
