// Where does the pinned inventory record breakpoint scoping? Read the container key (known
// breakpoint-scoped, shipped by CL7) and the six grid keys, bounded output only.
import { readFileSync } from 'node:fs'

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const components = inventory.components

console.log('== top-level media array:', Array.isArray(inventory.media) ? inventory.media.length : typeof inventory.media)
if (Array.isArray(inventory.media) && inventory.media.length > 0)
	console.log('   member keys:', Object.keys(inventory.media[0]).join(', '))

const container = components.container
console.log('\n== container.media:', container.media.length)
if (container.media.length > 0) {
	console.log('   member keys:', Object.keys(container.media[0]).join(', '))
	console.log('   first member:', JSON.stringify(container.media[0]).slice(0, 400))
}

for (const key of ['row', 'col', 'offset', 'g', 'gx', 'gy']) {
	const entry = components[key]
	console.log(`\n== ${key}: selectors ${String(entry.selectors.length)}, declarations ${String(entry.declarations.length)}, media ${String(entry.media.length)}`)
	console.log('   properties:', Object.keys(entry.properties).join(', ') || '(empty)')
	const sample = entry.selectors.slice(0, 4).map((row) => row.selector)
	console.log('   first selectors:', sample.join(' | '))
	const props = new Set(entry.declarations.map((d) => d.property))
	console.log('   declared properties:', [...props].sort().join(', '))
}
