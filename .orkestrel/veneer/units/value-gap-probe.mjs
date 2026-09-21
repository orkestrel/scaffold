// How big is the value-accounting gap across EVERY shipped key, not just the grid? Compiles the
// Veneer styles entry unminified and compares each listed key's recorded declarations against the
// emitted ones, applying the logical-property ruling. Read-only; writes nothing into the subject.
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

const VENEER = 'C:/Users/mikes/WebstormProjects/veneer'
const sass = await import(pathToFileURL(`${VENEER}/node_modules/sass/sass.node.mjs`).href)
const postcssModule = await import(pathToFileURL(`${VENEER}/node_modules/postcss/lib/postcss.mjs`).href)
const postcss = postcssModule.default ?? postcssModule

const inventory = JSON.parse(readFileSync(`${VENEER}/tests/fixtures/oracle/inventory.json`, 'utf8'))
const css = sass.compile(`${VENEER}/src/styles/index.scss`, {
	loadPaths: [`${VENEER}/src/styles`],
	style: 'expanded',
}).css

const listedSource = readFileSync(`${VENEER}/tests/conformance.test.ts`, 'utf8')
const listed = [...listedSource.matchAll(/^\t{3}'([a-z0-9-]+)',$/gm)].map((match) => match[1])

const logical = new Map([
	['margin-left', ['margin-inline', 'margin-inline-start']],
	['margin-right', ['margin-inline', 'margin-inline-end']],
	['margin-top', ['margin-block-start', 'margin-block']],
	['margin-bottom', ['margin-block-end', 'margin-block']],
	['width', ['inline-size']],
	['max-width', ['max-inline-size']],
	['height', ['block-size']],
	['max-height', ['max-block-size']],
	['padding-left', ['padding-inline', 'padding-inline-start']],
	['padding-right', ['padding-inline', 'padding-inline-end']],
	['padding-top', ['padding-block-start', 'padding-block']],
	['padding-bottom', ['padding-block-end', 'padding-block']],
	['border-left', ['border-inline-start']],
	['border-right', ['border-inline-end']],
	['border-top', ['border-block-start']],
	['border-bottom', ['border-block-end']],
])

const norm = (selector) => selector.replaceAll(/\s*([>+~])\s*/g, '$1').replaceAll(/\s+/g, ' ').trim()
const emitted = new Map()
postcss.parse(css).walkRules((rule) => {
	for (const selector of rule.selectors) {
		const key = norm(selector)
		const map = emitted.get(key) ?? new Map()
		rule.walkDecls((d) => map.set(d.prop, d.value.replaceAll(/\s+/g, ' ').trim()))
		emitted.set(key, map)
	}
})

const rows = []
for (const key of listed) {
	const component = inventory.components[key]
	if (component === undefined) continue
	let compared = 0
	let differing = 0
	let absentSelectors = 0
	const samples = []
	for (const entry of component.selectors) {
		const selector = norm(String(entry.selector))
		const map = emitted.get(selector)
		if (map === undefined) {
			absentSelectors += 1
			continue
		}
		for (const declaration of entry.declarations ?? []) {
			const property = String(declaration.property)
			const recorded = String(declaration.value).replaceAll(/\s+/g, ' ').trim()
			const candidates = [property, ...(logical.get(property) ?? [])]
			const found = candidates.map((name) => map.get(name)).find((value) => value !== undefined)
			compared += 1
			if (found === undefined || found !== recorded) {
				differing += 1
				if (samples.length < 2)
					samples.push(`${selector} ${property}: rec ${recorded} | emit ${found ?? '(none)'}`)
			}
		}
	}
	rows.push({ key, compared, differing, absentSelectors, samples })
}

rows.sort((a, b) => b.differing - a.differing)
console.log('key           compared  differing  selectors-absent')
for (const row of rows)
	console.log(
		`${row.key.padEnd(14)}${String(row.compared).padStart(8)}${String(row.differing).padStart(11)}${String(row.absentSelectors).padStart(18)}`,
	)
console.log('\nsamples from the keys with the most differences:')
for (const row of rows.slice(0, 5))
	for (const sample of row.samples) console.log(`   ${row.key}: ${sample}`)
