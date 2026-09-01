// P2: WeakMap construction vs one-entry slot (the pack measured reads, never construction).
// P3: M-B rerun, corrected - keys array timed in EVERY variant; bitmask candidate form.
// P5: readValue behavioral record - hostile options with a SUCCEEDING read (shipped dist).
/* eslint-disable */
import { readValue, isContractError } from '/home/user/contract/dist/src/core/index.js'

let sink = 0
function timeRound(op, calls) {
	const t0 = process.hrtime.bigint()
	for (let i = 0; i < calls; i++) sink += op(i)
	const t1 = process.hrtime.bigint()
	return Number(t1 - t0) / calls
}
function measure(label, op) {
	for (let i = 0; i < 20000; i++) sink += op(i)
	const probe = timeRound(op, 2000)
	const calls = Math.min(2_000_000, Math.max(2000, Math.round(30_000_000 / Math.max(probe, 0.5))))
	const rounds = []
	for (let r = 0; r < 7; r++) rounds.push(timeRound(op, calls))
	rounds.sort((a, b) => a - b)
	console.log(`  ${label}: ${rounds[3].toFixed(1)} ns/op (min ${rounds[0].toFixed(1)}, max ${rounds[6].toFixed(1)}; ${calls} calls)`)
	return rounds[3]
}

// P2 - per-call ledger cost: construct WeakMap + set + get vs slot write + read.
const keyObject = { probe: true }
function viaMapPerCall(i) {
	const memo = new WeakMap()
	memo.set(keyObject, i)
	return memo.get(keyObject) === i ? 1 : 0
}
let slotTag = 0
let slotValue
let slotAnswer = 0
function viaSlot(i) {
	slotTag = i
	slotValue = keyObject
	slotAnswer = i
	return (slotTag === i && slotValue === keyObject && slotAnswer === i) ? 1 : 0
}
console.log('P2 per-call ledger: fresh WeakMap set+get vs one-entry slot write+read')
const mMap = measure('fresh WeakMap  ', viaMapPerCall)
const mSlot = measure('one-entry slot ', viaSlot)
console.log(`  ratio map/slot: ${(mMap / mSlot).toFixed(1)}x`)

// P3 - presence, corrected: every variant pays Object.keys in the timed body.
const value = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'admin' }
const required = ['name', 'age', 'active', 'tags', 'role']
const keysOf = Object.keys
const setAdd = Set.prototype.add
const setHas = Set.prototype.has
const hasOwn = Object.prototype.hasOwnProperty
const positions = Object.create(null)
for (let i = 0; i < required.length; i++) positions[required[i]] = i
const FULL_MASK = (1 << required.length) - 1
function presenceSetCorrected(v) {
	const keys = keysOf(v)
	const present = new Set()
	for (let i = 0; i < keys.length; i++) Reflect.apply(setAdd, present, [keys[i]])
	let ok = 1
	for (let i = 0; i < required.length; i++) {
		if (Reflect.apply(setHas, present, [required[i]]) !== true) ok = 0
	}
	return ok
}
function presenceMask(v) {
	const keys = keysOf(v)
	let mask = 0
	for (let i = 0; i < keys.length; i++) {
		const key = keys[i]
		if (Reflect.apply(hasOwn, positions, [key])) mask |= 1 << positions[key]
	}
	return mask === FULL_MASK ? 1 : 0
}
console.log('P3 presence corrected (keys array timed in both): fresh Set vs bitmask')
const mSetC = measure('fresh Set+apply', () => presenceSetCorrected(value))
const mMask = measure('bitmask        ', () => presenceMask(value))
console.log(`  ratio set/mask: ${(mSetC / mMask).toFixed(2)}x`)

// P5 - shipped readValue behavior: hostile options container, SUCCEEDING read.
const hostileOptions = new Proxy({}, { get() { throw new Error('hostile options get') } })
let outcome
try {
	const answer = readValue(() => 42, 'probe', hostileOptions)
	outcome = `returned ${answer}`
}
catch (error) {
	outcome = isContractError(error) ? `refused with ContractError code '${error.code}': ${error.message}` : `threw non-contract error: ${error}`
}
console.log(`P5 readValue(succeeding read, hostile options): ${outcome}`)
console.log(`sink ${sink}`)
