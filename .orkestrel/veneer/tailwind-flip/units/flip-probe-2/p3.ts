import type { Departure, ResidualGroup } from './types.ts'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { OUT, COMPONENTS, ATTRIBUTION_NAMES, LIFTED, compileTuned, compileRecipe, launchBrowser, startServer, writeJSON, flattenSheet } from './lib.ts'
import { mountPage, setFace, readSurface, openFamily } from './browser.ts'

const curated = new Set<string>()
const restored: Record<string, string[]> = {}
const curation: { form: string; class?: string; selector?: string; longhands: string[]; witness: string; A: string; F: string; iteration: number; readings: { property: string; A: string; F: string; witness: string }[] }[] = []
const iterations = []
const errors: { iteration: number; width: number; theme: string; state: string; error: string }[] = []
const { server, url } = await startServer()
const browser = await launchBrowser()
try {
	for (let iteration = 0; iteration < 3; iteration++) {
		const tuned = compileTuned([...curated].sort(), restored)
		writeFileSync(resolve(OUT, `sheets/tuned.i${iteration}.css`), tuned)
		const recipe = await compileRecipe()
		writeFileSync(resolve(OUT, 'sheets/recipe.css'), recipe)
		writeFileSync(resolve(OUT, `sheets/recipe.i${iteration}.css`), recipe)
		const inspection = await browser.newPage()
		const sheet = await inspection.evaluate(flattenSheet, { text: tuned })
		await inspection.close()
		const copies = sheet.rules.filter((rule, index) => rule.context.includes('@layer bootstrap') && sheet.rules[index - 1]?.context.includes('@layer reset') && sheet.rules[index - 1]?.declarations === rule.declarations)
		const results = []
		const breaking: Departure[] = []
		for (const width of [1280, 390]) for (const theme of ['light', 'dark']) for (const state of ['closed', 'tooltip', 'popover', 'dropdown', 'modal', 'offcanvas', 'toast']) {
			const page = await browser.newPage()
			try {
				await mountPage(page, url, width, theme)
				await page.evaluate(() => {
					const section = document.createElement('section')
					section.id = 'flip-grafts'
					section.innerHTML = '<h5>Harbor schedule</h5><div class="h5">Harbor schedule</div><div class="card"><div class="card-body"><h5 class="card-title">Arrival</h5><p class="card-text">Cargo cleared</p><p>Next arrival</p><button class="btn btn-primary"><svg class="bi" width="16" height="16"></svg>Details</button></div></div><h5 class="offcanvas-title">Shipment filters</h5><h1 class="modal-title fs-5">Archive shipment</h1>'
					document.querySelector('main')?.append(section)
				})
				const event = state === 'closed' ? '' : await openFamily(page, state)
				const scope = width === 390 ? '#navbar, #navbar *, #offcanvas, #offcanvas *, #collapse, #collapse *, #modal, #modal *, #containers, #containers *, #tables, #tables *, #flip-grafts, #flip-grafts *, body > .tooltip, body > .tooltip *, body > .popover, body > .popover *, #toasts-live-toast, #toasts-live-toast *, #dropdowns [aria-expanded="true"], #dropdowns .dropdown-menu.show, #dropdowns .dropdown-menu.show *' : undefined
				const baseline = await page.evaluate(readSurface, { baseline: true, scope })
				await setFace(page, 'tailwindcss')
				const result = await page.evaluate(readSurface, { compare: true, components: COMPONENTS, utilities: ATTRIBUTION_NAMES, lifted: LIFTED, scope })
				if (!('departures' in result)) throw new Error('Comparison returned no departures')
				const preflight = result.departures.filter((row) => row.attribution === 'preflight')
				breaking.push(...preflight)
				results.push({ width, theme, state, event, baseline, elements: result.elements, subjects: result.subjects, counts: result.counts, departures: result.departures })
				console.log(`P3 iteration ${iteration} ${width} ${theme} ${state}: ${preflight.length} preflight`)
			} catch (error) { errors.push({ iteration, width, theme, state, error: String(error) }); console.log(String(error)) }
			finally { await page.close() }
		}
		iterations.push({ iteration, curated: [...curated].sort(), restored: structuredClone(restored), copies: copies.length, breaking: breaking.length, results })
		writeJSON(`out/p3.i${iteration}.json`, iterations[iterations.length - 1])
		if (breaking.length === 0 || iteration === 2) break
		for (const row of breaking) {
			for (const name of row.classes.filter((name) => COMPONENTS.includes(name))) {
				const selector = `${row.tag}:where(.${name})${row.pseudo}`
				const form = row.reboot ? 'reboot' : 'restore'
				if (row.reboot) curated.add(name)
				else restored[selector] = [...new Set([...(restored[selector] ?? []), row.property])].sort()
				const existing = curation.find((entry) => entry.form === form && (row.reboot ? entry.class === name : entry.selector === selector))
				if (existing) {
					if (!existing.longhands.includes(row.property)) existing.longhands.push(row.property)
					if (!existing.readings.some((reading) => reading.property === row.property && reading.A === row.A && reading.F === row.F)) existing.readings.push({ property: row.property, A: row.A, F: row.F, witness: row.markup })
				} else curation.push({ form, ...(row.reboot ? { class: name } : { selector }), longhands: [row.property], witness: row.markup, A: row.A, F: row.F, iteration, readings: [{ property: row.property, A: row.A, F: row.F, witness: row.markup }] })
			}
		}
	}
	const seed = ['modal-title', 'card-title', 'card-text', 'accordion-header', 'pagination', 'placeholder-glow', 'stretched-link', 'visually-hidden-focusable', 'alert-link', 'card-link', 'icon-link']
	const outside = curation.filter((row) => row.form === 'reboot' ? !seed.includes(row.class ?? '') && !row.class?.startsWith('link-') : !['svg:where(.bi)', 'img:where(.figure-img)', 'input:where(.form-check-input)', 'input:where(.btn-check)', 'input:where(.form-range)'].includes(row.selector ?? ''))
	const groups = new Map<string, ResidualGroup>()
	for (const condition of iterations[iterations.length - 1]?.results ?? []) for (const row of condition.departures) {
		if (!['preflight', 'unattributed'].includes(row.attribution)) continue
		const group = { attribution: row.attribution, classes: [...row.classes].sort(), tag: row.tag, property: row.property, A: row.A, F: row.F }
		const key = JSON.stringify(group)
		groups.set(key, { ...group, count: (groups.get(key)?.count ?? 0) + 1 })
	}
	const residuals = [...groups.entries()].sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0).map(([, group]) => group)
	const restoreSeedNotReproduced = [['svg:where(.bi)', 'display'], ['img:where(.figure-img)', 'display'], ['input:where(.form-check-input)', 'color'], ['input:where(.btn-check)', 'color'], ['input:where(.form-range)', 'color']].filter(([selector, property]) => !restored[selector]?.includes(property))
	writeJSON('curation.json', { rows: curation, outsideSeed: outside, seedNotReproduced: seed.filter((name) => !curated.has(name)), restoreSeedNotReproduced, residuals: iterations[iterations.length - 1], groups: residuals, errors })
	writeJSON('out/p3.json', { expected: 'zero breaking departures within three iterations', iterations, curation, outsideSeed: outside, seedNotReproduced: seed.filter((name) => !curated.has(name)), restoreSeedNotReproduced, residuals, errors })
} finally { await browser.close(); server.close() }
console.log('P3 complete')
