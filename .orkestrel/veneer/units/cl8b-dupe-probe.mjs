// Which of CL8b's keys have their selectors ALSO recorded under another key? A key added to the
// recorded tuple whose selectors another tuple member already carries double-counts them against a
// cascade that emits each once. Read-only, bounded output.
import { readFileSync } from 'node:fs'

const VENEER = 'C:/Users/mikes/WebstormProjects/veneer'
const inventory = JSON.parse(readFileSync(`${VENEER}/tests/fixtures/oracle/inventory.json`, 'utf8'))
const components = inventory.components

const of = (key) => (components[key]?.selectors ?? []).map((entry) => String(entry.selector))

// the tuple the binding would carry after CL8b
const candidates = ['row', 'col', 'offset', 'g', 'gx', 'gy', 'row-gap']

console.log('pairwise selector overlap among the candidate tuple members:')
for (const a of candidates) {
	for (const b of candidates) {
		if (a >= b) continue
		const setB = new Set(of(b))
		const shared = of(a).filter((selector) => setB.has(selector))
		if (shared.length > 0)
			console.log(`   ${a} ∩ ${b} = ${String(shared.length)}   sample ${shared.slice(0, 3).join(', ')}`)
	}
}

console.log('\nper-key entry and distinct counts:')
for (const key of candidates) {
	const rows = of(key)
	console.log(`   ${key.padEnd(8)} entries ${String(rows.length).padStart(3)}   distinct ${String(new Set(rows).size).padStart(3)}`)
}

// what the recorded multiset would be, with and without row-gap in the tuple
for (const tuple of [
	['row', 'col', 'offset', 'g', 'gx', 'gy', 'row-gap'],
	['row', 'col', 'offset', 'g', 'gx', 'gy'],
]) {
	const all = tuple.flatMap((key) => of(key))
	const gapOnly = all.filter((selector) => selector.startsWith('.row-gap-'))
	console.log(
		`\ntuple [${tuple.join(',')}]: total ${String(all.length)}, row-gap selectors counted ${String(gapOnly.length)} (distinct ${String(new Set(gapOnly).size)})`,
	)
}
