// CL8 terrain probe: summarize the six grid keys' selector families and declared properties from
// the pinned inventory, without dumping the selector lists. Read-only. Run from the Veneer root.
import { readFileSync } from 'node:fs'

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const keys = ['row', 'col', 'offset', 'g', 'gx', 'gy']

for (const key of keys) {
	const entry = inventory[key]
	if (entry === undefined) {
		console.log(`${key}: ABSENT`)
		continue
	}
	const rows = entry.selectors ?? []
	const families = new Map()
	const conditions = new Set()
	const properties = new Set()
	for (const row of rows) {
		const selector = String(row.selector)
		// family = the selector with digits and breakpoint infixes folded out
		const family = selector
			.replaceAll(/-(sm|md|lg|xl|xxl)(?=-|\b)/g, '-{bp}')
			.replaceAll(/\d+/g, '{n}')
		families.set(family, (families.get(family) ?? 0) + 1)
		if (row.condition !== undefined && row.condition !== null) conditions.add(String(row.condition))
		for (const declaration of row.declarations ?? []) {
			const property = declaration.property ?? declaration.prop
			if (property !== undefined) properties.add(String(property))
		}
	}
	console.log(`\n== ${key}: ${String(rows.length)} selector rows`)
	console.log(`   properties object: ${Object.keys(entry.properties ?? {}).join(', ') || '(empty)'}`)
	console.log(`   conditions: ${[...conditions].sort().join(' | ') || '(none)'}`)
	console.log(`   declared properties: ${[...properties].sort().join(', ')}`)
	console.log('   families:')
	for (const [family, count] of [...families].sort((a, b) => b[1] - a[1]))
		console.log(`     ${String(count).padStart(3)}  ${family}`)
}
