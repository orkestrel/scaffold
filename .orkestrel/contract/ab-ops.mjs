// Probe worker: hot-path ns/op for one dist copy, one process.
// Run: node ab-ops.mjs </abs/path/to/index.js> [families]
//   families: comma list from is-medium,parse-medium,audit-medium,explain-medium,is-deep,audit-deep (default all)
// Prints one line per family: <family> <median-ns> <min> <max>
/* eslint-disable */
const distPath = process.argv[2]
const families = (process.argv[3] ?? 'is-medium,parse-medium,audit-medium,explain-medium,is-deep,audit-deep').split(',')
const lib = await import(distPath)
const { createContract, arrayShape, booleanShape, integerShape, literalShape, objectShape, stringShape, unionShape } = lib

const medium = objectShape({
	name: stringShape({ min: 1 }),
	age: integerShape({ min: 0, max: 150 }),
	active: booleanShape(),
	tags: arrayShape(stringShape(), { max: 16 }),
	role: literalShape(['admin', 'editor', 'viewer']),
})
const deep = objectShape({
	user: medium,
	addresses: arrayShape(objectShape({ street: stringShape(), city: stringShape(), zip: stringShape({ pattern: /^\d{5}$/ }) }), { max: 4 }),
	contact: unionShape(
		objectShape({ via: literalShape(['email']), value: stringShape() }),
		objectShape({ via: literalShape(['phone']), value: stringShape() }),
	),
	settings: objectShape({
		theme: literalShape(['light', 'dark']),
		notify: booleanShape(),
		limits: objectShape({ daily: integerShape({ min: 0 }), monthly: integerShape({ min: 0 }) }),
	}),
})
const mediumValid = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'admin' }
const mediumInvalidLate = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'guest' }
const deepValid = {
	user: mediumValid,
	addresses: [{ street: 'Main 1', city: 'Bern', zip: '30012' }],
	contact: { via: 'email', value: 'ada@example.test' },
	settings: { theme: 'dark', notify: true, limits: { daily: 10, monthly: 200 } },
}

const contracts = { medium: createContract(medium), deep: createContract(deep) }
let sink = 0

function timeRound(op, calls) {
	const t0 = process.hrtime.bigint()
	for (let i = 0; i < calls; i++) sink += op(i)
	const t1 = process.hrtime.bigint()
	return Number(t1 - t0) / calls
}

function measure(label, op) {
	for (let i = 0; i < 5000; i++) sink += op(i)
	const probe = timeRound(op, 1000)
	const calls = Math.min(1_000_000, Math.max(1000, Math.round(40_000_000 / Math.max(probe, 1))))
	const rounds = []
	for (let r = 0; r < 7; r++) rounds.push(timeRound(op, calls))
	rounds.sort((a, b) => a - b)
	console.log(`${label} ${rounds[3].toFixed(0)} ${rounds[0].toFixed(0)} ${rounds[6].toFixed(0)}`)
}

const ops = {
	'is-medium': () => (contracts.medium.is(mediumValid) ? 1 : 0),
	'is-invalid-medium': () => (contracts.medium.is(mediumInvalidLate) ? 0 : 1),
	'parse-medium': () => (contracts.medium.parse(mediumValid) === undefined ? 0 : 1),
	'audit-medium': () => contracts.medium.audit(mediumValid).length,
	'explain-medium': () => contracts.medium.explain(mediumInvalidLate).length,
	'is-deep': () => (contracts.deep.is(deepValid) ? 1 : 0),
	'audit-deep': () => contracts.deep.audit(deepValid).length,
}
for (const family of families) {
	const op = ops[family]
	if (op === undefined) { console.error(`unknown family ${family}`); process.exit(1) }
	measure(family, op)
}
console.error(`sink ${sink}`)
