// U3 bound preservation: the 30-level arrayShape chain over (a) a shared value
// graph and (b) an alternating graph with two distinct arrays per level that
// forces slot promotion at every tracked node. Gate: shared is, audit, explain
// each under 1000 ms; alternating within 2x of shared.
// Run: node u3-bounds.mjs </abs/dist/index.js>
/* eslint-disable */
const lib = await import(process.argv[2])
const { createContract, arrayShape, stringShape } = lib

let chain = arrayShape(stringShape())
for (let level = 0; level < 29; level += 1) chain = arrayShape(chain)
const contract = createContract(chain)

let shared = ['leaf']
for (let level = 0; level < 29; level += 1) shared = [shared, shared]

let left = ['leaf']
let right = ['leaf']
for (let level = 0; level < 29; level += 1) {
	const nextLeft = [left, right]
	const nextRight = [left, right]
	left = nextLeft
	right = nextRight
}
const alternating = left

function time(label, op) {
	const t0 = performance.now()
	const out = op()
	const t1 = performance.now()
	console.log(`${label}: ${(t1 - t0).toFixed(1)} ms (result ${JSON.stringify(out).slice(0, 20)})`)
	return t1 - t0
}

const sharedIs = time('shared is      ', () => contract.is(shared))
const sharedAudit = time('shared audit   ', () => contract.audit(shared).length)
const sharedExplain = time('shared explain ', () => contract.explain(shared).length)
const altIs = time('alternating is ', () => contract.is(alternating))
const altAudit = time('alternating audit', () => contract.audit(alternating).length)

const boundOk = sharedIs < 1000 && sharedAudit < 1000 && sharedExplain < 1000
const ratioIs = altIs / Math.max(sharedIs, 0.1)
const ratioAudit = altAudit / Math.max(sharedAudit, 0.1)
console.log(`bounds: shared under 1000 ms ${boundOk ? 'HOLDS' : 'FAILS'}; alternating/shared is ${ratioIs.toFixed(2)}x audit ${ratioAudit.toFixed(2)}x (gate <= 2x)`)
