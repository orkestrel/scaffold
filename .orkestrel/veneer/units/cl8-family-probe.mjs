// Fold each grid key's selectors into families, and find where the inventory records a media
// condition. Bounded output: families and counts only, never the selector list.
import { readFileSync } from 'node:fs'

const inventory = JSON.parse(readFileSync('tests/fixtures/oracle/inventory.json', 'utf8'))
const components = inventory.components

const extra = new Set()
for (const row of components.container.selectors)
	for (const name of Object.keys(row)) extra.add(name)
console.log('container selector-row fields:', [...extra].join(', '))
const conditioned = components.container.selectors.filter(
	(row) => row.media !== undefined || row.condition !== undefined || row.atRule !== undefined,
)
console.log('container rows carrying a media-ish field:', conditioned.length)
if (conditioned.length > 0) console.log('  sample:', JSON.stringify(conditioned[0]).slice(0, 300))

for (const key of ['row', 'col', 'offset', 'g', 'gx', 'gy']) {
	const families = new Map()
	for (const row of components[key].selectors) {
		const family = String(row.selector)
			.replaceAll(/-(sm|md|lg|xl|xxl)(?=-|$| )/g, '-{bp}')
			.replaceAll(/\d+/g, '{n}')
		families.set(family, (families.get(family) ?? 0) + 1)
	}
	console.log(`\n== ${key} families (${String(components[key].selectors.length)} rows)`)
	for (const [family, count] of [...families].sort((a, b) => b[1] - a[1]))
		console.log(`   ${String(count).padStart(3)}  ${family}`)
}
