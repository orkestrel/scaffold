// CL9 terrain: the `table` key. Fold its selectors into families, name its declared properties and
// its custom properties, and report whether anything else rides under the prefix the way the grid
// keys carried gap utilities and form labels. Read-only, bounded output.
import { readFileSync } from 'node:fs'

const VENEER = 'C:/Users/mikes/WebstormProjects/veneer'
const inventory = JSON.parse(readFileSync(`${VENEER}/tests/fixtures/oracle/inventory.json`, 'utf8'))
const component = inventory.components.table

const families = new Map()
const conditions = new Set()
const properties = new Set()
for (const entry of component.selectors) {
	const family = String(entry.selector)
		.replaceAll(/-(sm|md|lg|xl|xxl)(?=-|$| |>|\+|~)/g, '-{bp}')
		.replaceAll(/\d+/g, '{n}')
	families.set(family, (families.get(family) ?? 0) + 1)
	if (entry.condition) conditions.add(String(entry.condition))
	for (const declaration of entry.declarations ?? []) properties.add(String(declaration.property))
}

console.log(`table: ${String(component.selectors.length)} selector entries, ${String(component.declarations.length)} declarations`)
console.log(`properties object: ${Object.keys(component.properties).join(', ') || '(empty)'}`)
console.log(`conditions: ${[...conditions].join(' | ') || '(none)'}`)
console.log(`\ndeclared properties:\n   ${[...properties].sort().join(', ')}`)
console.log(`\nfamilies (${String(families.size)} shapes):`)
for (const [family, count] of [...families].sort((a, b) => b[1] - a[1]))
	console.log(`   ${String(count).padStart(3)}  ${family}`)

// what else keys under a table-ish prefix, and is any of it recorded twice?
const others = Object.keys(inventory.components).filter((key) =>
	/^(caption|table|th|td|tr|tbody|thead|tfoot)/.test(key),
)
console.log(`\nneighbouring keys: ${others.join(', ')}`)
for (const key of others) {
	if (key === 'table') continue
	const rows = inventory.components[key].selectors.map((entry) => entry.selector)
	const shared = rows.filter((selector) =>
		component.selectors.some((entry) => entry.selector === selector),
	)
	console.log(`   ${key}: ${String(rows.length)} selectors, ${String(shared.length)} also under table`)
}
