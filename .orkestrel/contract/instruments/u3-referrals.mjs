// Reproduces the U3 objective lane's vectors on a dist: (1) shape.pattern read
// count per createStringFaults call, with a third read that throws; (2) a
// supplied g-flag pattern applied as given (lastIndex movement, alternating
// answers). Run: node u3-referrals.mjs </abs/dist/index.js>
/* eslint-disable */
const lib = await import(process.argv[2])
const { createStringFaults, ContractError } = lib
let reads = 0
const counting = { type: 'string', get pattern() { reads += 1; return /^a$/ } }
createStringFaults(counting, 'b', [])
console.log(`pattern accessor reads per call: ${reads}`)
reads = 0
const throwingThird = { type: 'string', get pattern() { reads += 1; if (reads === 3) throw new Error('boom'); return /^a$/ } }
try { const r = createStringFaults(throwingThird, 'b', []); console.log(`third read throws: returned ${JSON.stringify(r).slice(0, 80)}`) } catch (e) { console.log(`third read throws: THREW ${e instanceof ContractError ? 'ContractError' : 'raw'} ${e.message}`) }
if (createStringFaults.length >= 4 || true) {
	const caller = /^abc$/g
	const outs = []
	for (let i = 0; i < 3; i++) { const r = createStringFaults({ type: 'string', pattern: /^abc$/ }, 'abc', [], caller); outs.push(`${r.length}@${caller.lastIndex}`) }
	console.log(`supplied g pattern, three calls (faults@lastIndex): ${outs.join(' ')}`)
}
