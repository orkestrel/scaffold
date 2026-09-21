// What exactly does the inventory record for `.row` and `.row > *`? Settles whether the row rule
// carries a row-gap declaration of its own. Read-only, bounded output.
import { readFileSync } from 'node:fs'

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
for (const wanted of ['.row', '.row > *']) {
	const row = inventory.components.row.selectors.find((entry) => entry.selector === wanted)
	console.log(`${wanted}:`)
	for (const declaration of row.declarations ?? [])
		console.log(`   ${declaration.property}: ${declaration.value}`)
}
const rowGap = inventory.components.row.declarations.filter(
	(declaration) => declaration.property === 'row-gap',
)
console.log(`\nrow-gap declarations under the row key: ${String(rowGap.length)}`)
console.log(`   selectors carrying them: ${[...new Set(rowGap.map((d) => d.selector))].slice(0, 4).join(', ')} …`)
