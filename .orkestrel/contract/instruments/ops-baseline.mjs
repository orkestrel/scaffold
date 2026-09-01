// Probe: hot-path per-operation CPU for @orkestrel/contract compiled families.
// Run: node ops-baseline.mjs
// Subjects per shape (medium, deep): is(valid), is(invalid-late), parse(valid),
// audit(valid), explain(invalid-late), generate().
// invalid-late = value whose first fault sits at the last declared leaf, so the
// rejection walks the shape rather than exiting on the first field.
// Methodology: calibration round sizes M to ~40ms; warmup 5000 calls; 7 timed
// rounds; median ns/op with min-max spread; results feed a sink printed at exit
// so V8 cannot dead-code-eliminate the loop bodies.
// Controls: (1) timer floor - empty-body loop must measure <= 1/10 of the
// cheapest subject; (2) ordering - deep must cost more than medium per family.
/* eslint-disable */
import {
	createContract,
	arrayShape,
	booleanShape,
	integerShape,
	literalShape,
	objectShape,
	stringShape,
	unionShape,
} from '/home/user/contract/dist/src/core/index.js'

const medium = objectShape({
	name: stringShape({ min: 1 }),
	age: integerShape({ min: 0, max: 150 }),
	active: booleanShape(),
	tags: arrayShape(stringShape(), { max: 16 }),
	role: literalShape(['admin', 'editor', 'viewer']),
})

const address = objectShape({
	street: stringShape(), city: stringShape(), zip: stringShape({ pattern: /^\d{5}$/ }),
})
const deep = objectShape({
	user: medium,
	addresses: arrayShape(address, { max: 4 }),
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
const deepInvalidLate = {
	user: mediumValid,
	addresses: [{ street: 'Main 1', city: 'Bern', zip: '30012' }],
	contact: { via: 'email', value: 'ada@example.test' },
	settings: { theme: 'dark', notify: true, limits: { daily: 10, monthly: -1 } },
}

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
	const median = rounds[3]
	console.log(`${label}: ${median.toFixed(0)} ns/op (min ${rounds[0].toFixed(0)}, max ${rounds[6].toFixed(0)}; ${calls} calls x 7 rounds)`)
	return median
}

// generate refuses pattern-constrained strings (ContractError code 'generate'),
// so the deep generate reading uses the same shape with a patternless zip.
const deepGen = objectShape({
	user: medium,
	addresses: arrayShape(objectShape({ street: stringShape(), city: stringShape(), zip: stringShape() }), { max: 4 }),
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
const contracts = { medium: createContract(medium), deep: createContract(deep) }
const generators = { medium: contracts.medium, deep: createContract(deepGen) }
const values = {
	medium: { valid: mediumValid, invalid: mediumInvalidLate },
	deep: { valid: deepValid, invalid: deepInvalidLate },
}

console.log(`node ${process.version}; adaptive calls targeting 40 ms/round; median of 7 rounds`)
const readings = {}
for (const name of ['medium', 'deep']) {
	const c = contracts[name]
	const v = values[name]
	console.log(`--- shape: ${name}`)
	readings[`${name}:is-valid`] = measure('is(valid)       ', () => (c.is(v.valid) ? 1 : 0))
	readings[`${name}:is-invalid`] = measure('is(invalid-late)', () => (c.is(v.invalid) ? 0 : 1))
	readings[`${name}:parse-valid`] = measure('parse(valid)    ', () => (c.parse(v.valid) === undefined ? 0 : 1))
	readings[`${name}:audit-valid`] = measure('audit(valid)    ', () => c.audit(v.valid).length)
	readings[`${name}:explain-invalid`] = measure('explain(invalid)', () => c.explain(v.invalid).length)
	const g = generators[name]
	readings[`${name}:generate`] = measure('generate()      ', () => (g.generate() === undefined ? 0 : 1))
}

console.log('--- controls')
const floor = measure('CONTROL_TIMER (empty body)', i => i & 1)
const cheapest = Math.min(...Object.values(readings))
console.log(`timer floor ${floor.toFixed(1)} ns/op vs cheapest subject ${cheapest.toFixed(0)} ns/op: ${floor <= cheapest / 10 ? 'DISCRIMINATES' : 'FAILS - subject at timer resolution'}`)
let orderOk = true
for (const fam of ['is-valid', 'is-invalid', 'parse-valid', 'audit-valid', 'explain-invalid', 'generate']) {
	if (!(readings[`deep:${fam}`] > readings[`medium:${fam}`])) {
		orderOk = false
		console.log(`ordering control FAILS for ${fam}: deep ${readings[`deep:${fam}`].toFixed(0)} <= medium ${readings[`medium:${fam}`].toFixed(0)}`)
	}
}
if (orderOk) console.log('ordering control: deep > medium for every family - DISCRIMINATES')
console.log(`sink ${sink}`)
