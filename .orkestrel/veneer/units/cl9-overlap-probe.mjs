// Does any OTHER key in the record carry a selector the table key carries? The CL9 terrain checked
// prefix-neighbours only, which is how the row-gap overlap was missed for CL8. Check every key.
// Read-only, bounded output.
import { readFileSync } from 'node:fs'

const VENEER = 'C:/Users/mikes/WebstormProjects/veneer'
const inventory = JSON.parse(readFileSync(`${VENEER}/tests/fixtures/oracle/inventory.json`, 'utf8'))
const components = inventory.components

const of = (key) => (components[key]?.selectors ?? []).map((entry) => String(entry.selector))
const table = new Set(of('table'))

const overlaps = []
for (const key of Object.keys(components)) {
	if (key === 'table') continue
	const shared = of(key).filter((selector) => table.has(selector))
	if (shared.length > 0) overlaps.push({ key, shared })
}

console.log(`keys sharing a selector with table: ${String(overlaps.length)}`)
for (const { key, shared } of overlaps)
	console.log(`   ${key}: ${String(shared.length)} — ${shared.slice(0, 4).join(', ')}`)

// and the reverse question: does the table key carry selectors whose class prefix is another key's?
const prefixes = new Set(Object.keys(components))
const foreign = [...table].filter((selector) => {
	const match = /^\.([a-z0-9-]+)/.exec(selector)
	if (match === null) return false
	const name = match[1]
	if (name === 'table' || name.startsWith('table-')) return false
	return true
})
console.log(`\ntable selectors whose leading class is not a table name: ${String(foreign.length)}`)
for (const selector of foreign) {
	const leading = /^\.([a-z0-9-]+)/.exec(selector)?.[1]
	console.log(`   ${selector}   leading class "${leading}" is itself a key: ${String(prefixes.has(leading ?? ''))}`)
}
