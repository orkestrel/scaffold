// Probe: shape-builder tier cost (unmeasured by ops-baseline). Median of 7
// rounds, ns/op, for stringShape(), objectShape(medium) and compileGuard(medium).
/* eslint-disable */
const lib = await import(process.argv[2])
const { arrayShape, booleanShape, integerShape, literalShape, objectShape, stringShape, compileGuard, createContract } = lib
let sink = 0
function timeRound(op, calls) { const t0 = process.hrtime.bigint(); for (let i = 0; i < calls; i++) sink += op(i) ? 1 : 0; return Number(process.hrtime.bigint() - t0) / calls }
function measure(name, op) {
	for (let i = 0; i < 2000; i++) sink += op(i) ? 1 : 0
	const probe = timeRound(op, 200)
	const calls = Math.max(200, Math.round(40_000_000 / Math.max(probe, 1)))
	const rounds = []
	for (let r = 0; r < 7; r++) rounds.push(timeRound(op, calls))
	rounds.sort((a, b) => a - b)
	console.log(`${name}: ${rounds[3].toFixed(0)} ns/op (min ${rounds[0].toFixed(0)}, max ${rounds[6].toFixed(0)}; ${calls} calls x 7 rounds)`)
}
const mediumShape = () => objectShape({
	name: stringShape({ min: 1 }), age: integerShape({ min: 0, max: 150 }), active: booleanShape(),
	tags: arrayShape(stringShape(), { max: 16 }), role: literalShape(['admin', 'editor', 'viewer']),
})
const prebuilt = mediumShape()
measure('stringShape()', () => stringShape())
measure('stringShape({min:1,max:8})', () => stringShape({ min: 1, max: 8 }))
measure('objectShape(medium, leaves rebuilt)', mediumShape)
measure('compileGuard(medium prebuilt)', () => compileGuard(prebuilt))
measure('createContract(medium prebuilt)', () => createContract(prebuilt))
console.error('sink', sink)
