// How does the record shape the gutter and gap utilities? In particular: does a `.g-N` class appear
// as one entry with both declarations or as two entries with one each? The emitted-vocabulary proof
// CL8's fix round retained compares multisets, so this decides how CL8b must emit them.
import { readFileSync } from 'node:fs'

const VENEER = 'C:/Users/mikes/WebstormProjects/veneer'
const inventory = JSON.parse(readFileSync(`${VENEER}/tests/fixtures/oracle/inventory.json`, 'utf8'))

for (const key of ['g', 'gx', 'gy', 'row-gap']) {
	const component = inventory.components[key]
	const occurrences = new Map()
	for (const entry of component.selectors) {
		const rows = occurrences.get(entry.selector) ?? []
		rows.push({
			condition: entry.condition ?? null,
			declarations: (entry.declarations ?? []).map((d) => `${d.property}:${d.value}`),
		})
		occurrences.set(entry.selector, rows)
	}
	const repeated = [...occurrences].filter(([, rows]) => rows.length > 1)
	console.log(`\n== ${key}: ${String(component.selectors.length)} entries, ${String(occurrences.size)} distinct selectors`)
	console.log(`   properties: ${Object.keys(component.properties).join(', ') || '(empty)'}`)
	console.log(`   selectors appearing more than once: ${String(repeated.length)}`)
	const sample = repeated[0] ?? [...occurrences][0]
	if (sample !== undefined) {
		console.log(`   sample ${sample[0]}:`)
		for (const row of sample[1])
			console.log(`      condition=${row.condition ?? '(none)'}  ${row.declarations.join(' ; ')}`)
	}
}
