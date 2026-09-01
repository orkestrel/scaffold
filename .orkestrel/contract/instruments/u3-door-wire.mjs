// Probe for the round-2 objective finding B: does a counting `pattern`
// accessor on a hand-rolled string shape observe whether the compiled doors
// hand the captured pattern down? Prints the accessor's read count after the
// contract is built and after several answers through every door.
// Run: node u3-door-wire.mjs </abs/dist/index.js>
/* eslint-disable */
const lib = await import(process.argv[2])
const { createContract, compileAuditor, compileReporter, objectShape } = lib
function counting() {
	let reads = 0
	const shape = { type: 'string', min: 1, get pattern() { reads += 1; return /^[a-z]+$/ } }
	return { shape, count: () => reads }
}
const leaf = counting()
const contract = createContract(leaf.shape)
const afterBuild = leaf.count()
const values = ['abc', 'ABC', 'def', '', 'ghi', 'jkl', 'MNO']
for (const value of values) { contract.audit(value); contract.explain(value); contract.is(value); contract.parse(value) }
console.log(`createContract leaf: after build ${afterBuild}, after ${values.length} values x 4 doors ${leaf.count()}`)
const nested = counting()
const outer = createContract(objectShape({ code: nested.shape }))
const afterOuter = nested.count()
for (const value of values) { outer.audit({ code: value }); outer.explain({ code: value }) }
console.log(`createContract nested: after build ${afterOuter}, after ${values.length} values x 2 doors ${nested.count()}`)
const direct = counting()
for (const value of values) { compileAuditor(direct.shape, value, []); compileReporter(direct.shape, value, []) }
console.log(`direct doors: after ${values.length} values x 2 doors ${direct.count()}`)
