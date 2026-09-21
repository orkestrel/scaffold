// Do the gap utilities and the form-label classes appear under their own keys as well as under
// the row and col prefix buckets? Bounded output only.
import { readFileSync } from 'node:fs'

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const components = inventory.components

const selectorsOf = (key) =>
	new Set((components[key]?.selectors ?? []).map((entry) => String(entry.selector)))

for (const key of ['gap', 'row-gap', 'column-gap']) {
	const entry = components[key]
	if (entry === undefined) {
		console.log(`${key}: ABSENT`)
		continue
	}
	const families = new Map()
	for (const line of entry.selectors) {
		const family = String(line.selector)
			.replaceAll(/-(sm|md|lg|xl|xxl)(?=-|$| )/g, '-{bp}')
			.replaceAll(/\d+/g, '{n}')
		families.set(family, (families.get(family) ?? 0) + 1)
	}
	console.log(`\n== ${key}: ${String(entry.selectors.length)} rows, properties ${Object.keys(entry.properties).join(',') || '(empty)'}`)
	for (const [family, count] of families) console.log(`   ${String(count).padStart(3)}  ${family}`)
}

const rowSelectors = selectorsOf('row')
const rowGapSelectors = selectorsOf('row-gap')
const shared = [...rowSelectors].filter((selector) => rowGapSelectors.has(selector))
console.log(`\nselectors recorded under BOTH row and row-gap: ${String(shared.length)}`)
console.log(`  sample: ${shared.slice(0, 3).join(' | ')}`)

const colSelectors = [...selectorsOf('col')].filter((selector) => selector.includes('form-label'))
console.log(`\ncol rows naming a form label: ${String(colSelectors.length)} — ${colSelectors.join(' | ')}`)
for (const key of ['form-label', 'form-control', 'form']) {
	const set = selectorsOf(key)
	const hit = colSelectors.filter((selector) => set.has(selector))
	console.log(`  also under ${key}: ${String(hit.length)}`)
}
