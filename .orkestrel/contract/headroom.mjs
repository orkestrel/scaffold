// Probe: headroom bound - what a hardened hand-written guard costs for the
// medium shape, same methodology as ops-baseline.mjs (7 rounds, median ns/op).
// Semantics approximated for HONEST inputs: plain-record check, declared-key
// checks (name string min 1; age integer 0..150; active boolean; tags array of
// strings max 16; role in vocab), open-object undeclared reads, throw
// containment via try/catch. NOT full parity (no exotic-view refusal, no
// cross-realm brand nuances) - this is a bound, not a drop-in.
// Control: the hand guard must return false for each of a set of invalid
// values that the real guard also rejects (spot parity), and true for valid.
/* eslint-disable */
import { createContract, arrayShape, booleanShape, integerShape, literalShape, objectShape, stringShape } from '/home/user/contract/dist/src/core/index.js'

const medium = objectShape({
	name: stringShape({ min: 1 }),
	age: integerShape({ min: 0, max: 150 }),
	active: booleanShape(),
	tags: arrayShape(stringShape(), { max: 16 }),
	role: literalShape(['admin', 'editor', 'viewer']),
})
const contract = createContract(medium)

const ROLES = new Set(['admin', 'editor', 'viewer'])
const protoOf = Object.getPrototypeOf
const OBJECT_PROTO = Object.prototype

function handIs(value) {
	try {
		if (typeof value !== 'object' || value === null) return false
		const proto = protoOf(value)
		if (proto !== OBJECT_PROTO && proto !== null) return false
		const name = value.name
		if (typeof name !== 'string' || name.length < 1) return false
		const age = value.age
		if (typeof age !== 'number' || !Number.isInteger(age) || age < 0 || age > 150) return false
		if (typeof value.active !== 'boolean') return false
		const tags = value.tags
		if (!Array.isArray(tags)) return false
		const length = tags.length
		if (length > 16) return false
		for (let i = 0; i < length; i++) {
			const entry = tags[i]
			if (typeof entry !== 'string') {
				if (entry === undefined && !(i in tags)) return false
				return false
			}
		}
		if (!ROLES.has(value.role)) return false
		return true
	}
	catch {
		return false
	}
}

const valid = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'admin' }
const invalids = [
	{ name: '', age: 36, active: true, tags: ['ops'], role: 'admin' },
	{ name: 'Ada', age: -1, active: true, tags: ['ops'], role: 'admin' },
	{ name: 'Ada', age: 36, active: 'yes', tags: ['ops'], role: 'admin' },
	{ name: 'Ada', age: 36, active: true, tags: 'ops', role: 'admin' },
	{ name: 'Ada', age: 36, active: true, tags: ['ops'], role: 'guest' },
	null,
	[],
	Object.create({ hostile: true }),
]

let parity = true
for (const bad of invalids) {
	const hand = handIs(bad)
	const real = contract.is(bad)
	if (hand !== real) { parity = false; console.log(`parity split on ${JSON.stringify(bad)}: hand ${hand}, real ${real}`) }
}
if (handIs(valid) !== true || contract.is(valid) !== true) { parity = false; console.log('parity split on valid') }
console.log(`spot parity over invalid set and valid: ${parity ? 'AGREES' : 'SPLITS - read rows above'}`)

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
	console.log(`${label}: ${rounds[3].toFixed(0)} ns/op (min ${rounds[0].toFixed(0)}, max ${rounds[6].toFixed(0)}; ${calls} calls x 7 rounds)`)
	return rounds[3]
}

console.log(`node ${process.version}`)
const hand = measure('hand-hardened is(valid)   ', () => (handIs(valid) ? 1 : 0))
const real = measure('contract is(valid)        ', () => (contract.is(valid) ? 1 : 0))
console.log(`headroom: contract/hand = ${(real / hand).toFixed(1)}x`)
console.log(`sink ${sink}`)
