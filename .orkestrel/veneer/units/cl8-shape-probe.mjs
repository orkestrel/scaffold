// Read the pinned inventory's top-level shape and one key's record shape, bounded output only.
import { readFileSync } from 'node:fs'

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
console.log('top-level keys:', Object.keys(inventory).slice(0, 10).join(', '))
const root = inventory.components ?? inventory
console.log('root is inventory.components:', inventory.components !== undefined)
const row = root.row
console.log('row record keys:', Object.keys(row).join(', '))
for (const [name, value] of Object.entries(row)) {
	const shape = Array.isArray(value) ? `array(${String(value.length)})` : typeof value
	console.log(`  ${name}: ${shape}`)
	if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null)
		console.log(`    member keys: ${Object.keys(value[0]).join(', ')}`)
	else if (Array.isArray(value) && value.length > 0) console.log(`    first: ${String(value[0])}`)
	else if (typeof value === 'object' && value !== null)
		console.log(`    keys: ${Object.keys(value).join(', ')}`)
}
