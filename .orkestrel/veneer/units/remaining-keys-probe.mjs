// What is actually left? Compare every key the pinned record carries against the keys the
// conformance listing admits, and size each unlisted key. Read-only, bounded output.
import { readFileSync } from 'node:fs'

const VENEER = 'C:/Users/mikes/WebstormProjects/veneer'
const inventory = JSON.parse(readFileSync(`${VENEER}/tests/fixtures/oracle/inventory.json`, 'utf8'))
const listedSource = readFileSync(`${VENEER}/tests/conformance.test.ts`, 'utf8')

// the listed array members sit one per line inside the `listed` declaration
const listedBlock = /const listed[^=]*=\s*\[([\s\S]*?)\]/.exec(listedSource)
const listed = new Set(
	[...(listedBlock?.[1] ?? '').matchAll(/'([a-z0-9-]+)'/g)].map((match) => match[1]),
)

const keys = Object.keys(inventory.components)
const rows = []
for (const key of keys) {
	const component = inventory.components[key]
	rows.push({
		key,
		listed: listed.has(key),
		selectors: component.selectors.length,
		declarations: component.declarations.length,
		properties: Object.keys(component.properties).length,
	})
}

const shipped = rows.filter((row) => row.listed)
const remaining = rows.filter((row) => !row.listed)
console.log(`keys in the record: ${String(rows.length)}`)
console.log(`listed as shipped:  ${String(shipped.length)}`)
console.log(`not yet listed:     ${String(remaining.length)}`)

const totalRemaining = remaining.reduce((sum, row) => sum + row.selectors, 0)
const totalShipped = shipped.reduce((sum, row) => sum + row.selectors, 0)
console.log(`\nselectors shipped: ${String(totalShipped)}   selectors remaining: ${String(totalRemaining)}`)

console.log('\nthe twenty largest unlisted keys, by selector count:')
for (const row of remaining.sort((a, b) => b.selectors - a.selectors).slice(0, 20))
	console.log(
		`   ${row.key.padEnd(18)} selectors ${String(row.selectors).padStart(4)}   declarations ${String(row.declarations).padStart(4)}   properties ${String(row.properties).padStart(3)}`,
	)

console.log('\nevery unlisted key, by name:')
console.log(
	remaining
		.map((row) => row.key)
		.sort()
		.join(', '),
)
