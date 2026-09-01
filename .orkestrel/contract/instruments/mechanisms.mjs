// Probe: isolated per-call mechanism costs (no contract import).
// Run: node mechanisms.mjs
// Per measurement: warmup 20k, 7 rounds of adaptive calls, median ns/op, variants
// alternate per round. Identity control: M-A runs try/catch twice as tryA/tryB.
/* eslint-disable */

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

const value = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'admin' }
const required = ['name', 'age', 'active', 'tags', 'role']
const tags = ['ops', 'ml', 'infra', 'web']

// M-A: attempt closure + Result vs bare try/catch (non-throwing body).
function bodyWork(v) {
	return typeof v.name === 'string' && typeof v.age === 'number' ? 1 : 0
}
function attemptLike(callback) {
	try {
		return { success: true, value: callback() }
	}
	catch (error) {
		return { success: false, error }
	}
}
function viaAttempt(v) {
	const outcome = attemptLike(() => bodyWork(v))
	return outcome.success ? outcome.value : 0
}
function viaTryA(v) {
	try {
		return bodyWork(v)
	}
	catch {
		return 0
	}
}
function viaTryB(v) {
	try {
		return bodyWork(v)
	}
	catch {
		return 0
	}
}

console.log('M-A attempt+Result vs bare try/catch (identity control: tryA vs tryB)')
const mAttempt = measure('attempt+Result ', () => viaAttempt(value))
const mTryA = measure('try/catch A    ', () => viaTryA(value))
const mTryB = measure('try/catch B    ', () => viaTryB(value))
console.log(`  ratio attempt/try: ${(mAttempt / mTryA).toFixed(2)}x; identity |A-B|/A: ${(Math.abs(mTryA - mTryB) / mTryA * 100).toFixed(1)}%`)

// M-B: presence via fresh Set + Reflect.apply admits vs hasOwnProperty vs plain reads.
const setAdd = Set.prototype.add
const setHas = Set.prototype.has
const hasOwn = Object.prototype.hasOwnProperty
const keysOf = Object.keys
function presenceSet(v) {
	const keys = keysOf(v)
	const present = new Set()
	for (let i = 0; i < keys.length; i++) Reflect.apply(setAdd, present, [keys[i]])
	let ok = 1
	for (let i = 0; i < required.length; i++) {
		if (Reflect.apply(setHas, present, [required[i]]) !== true) ok = 0
	}
	return ok
}
function presenceOwn(v) {
	let ok = 1
	for (let i = 0; i < required.length; i++) {
		if (!Reflect.apply(hasOwn, v, [required[i]])) ok = 0
	}
	return ok
}
function presenceRead(v) {
	let ok = 1
	for (let i = 0; i < required.length; i++) {
		if (v[required[i]] === undefined) ok = 0
	}
	return ok
}

console.log('M-B required-key presence: fresh Set vs hasOwnProperty.call vs plain reads')
const mSet = measure('fresh Set+apply', () => presenceSet(value))
const mOwn = measure('hasOwn apply   ', () => presenceOwn(value))
const mRead = measure('plain reads    ', () => presenceRead(value))
console.log(`  ratio set/own: ${(mSet / mOwn).toFixed(2)}x; set/read: ${(mSet / mRead).toFixed(2)}x`)

// M-C: defensive array snapshot vs honest packed walk.
const namesOf = Object.getOwnPropertyNames
const freeze = Object.freeze
const sortFn = Array.prototype.sort
function compareValues(a, b) { return a < b ? -1 : a > b ? 1 : 0 }
function arraySnapshot(list) {
	try {
		const length = list.length
		const collected = []
		const members = namesOf(list)
		for (let position = 0; position < members.length; position += 1) {
			const key = members[position]
			if (typeof key !== 'string') continue
			const index = Number(key)
			if (Number.isInteger(index) && index >= 0 && index < 2 ** 32 - 1 && String(index) === key) {
				if (index >= length) throw new Error('views disagree')
				collected[collected.length] = index
			}
		}
		Reflect.apply(sortFn, collected, [compareValues])
		const entries = new Array(length)
		for (let position = 0; position < collected.length; position += 1) {
			const index = collected[position]
			if (!Reflect.apply(hasOwn, list, [String(index)])) throw new Error('views disagree')
			entries[index] = list[index]
		}
		freeze(entries)
		return entries.length
	}
	catch {
		return 0
	}
}
function arrayHonest(list) {
	try {
		const length = list.length
		if (!Number.isInteger(length) || length < 0) return 0
		for (let i = 0; i < length; i += 1) {
			if (list[i] === undefined && !(i in list)) return 0
		}
		return length
	}
	catch {
		return 0
	}
}

console.log('M-C array read: defensive snapshot vs honest packed walk (4 elements)')
const mSnap = measure('snapshot       ', () => arraySnapshot(tags))
const mHonest = measure('honest walk    ', () => arrayHonest(tags))
console.log(`  ratio snapshot/honest: ${(mSnap / mHonest).toFixed(2)}x`)

// M-D: WeakMap read via Reflect.apply vs pre-bound get vs plain call.
const memo = new WeakMap()
const keyObject = { probe: true }
memo.set(keyObject, 1)
const weakGet = WeakMap.prototype.get
const boundGet = Function.prototype.bind.call(weakGet, memo)
function viaApply(k) { return Reflect.apply(weakGet, memo, [k]) ?? 0 }
function viaBound(k) { return boundGet(k) ?? 0 }
function viaPlain(k) { return memo.get(k) ?? 0 }

console.log('M-D WeakMap read: Reflect.apply vs compile-bound get vs plain method call')
const mApply = measure('Reflect.apply  ', () => viaApply(keyObject))
const mBound = measure('pre-bound get  ', () => viaBound(keyObject))
const mPlain = measure('plain get      ', () => viaPlain(keyObject))
console.log(`  ratio apply/bound: ${(mApply / mBound).toFixed(2)}x; apply/plain: ${(mApply / mPlain).toFixed(2)}x`)

// M-E: freeze fresh internal array per call vs unfrozen.
function keysFrozen(v) { return freeze(keysOf(v)).length }
function keysBare(v) { return keysOf(v).length }

console.log('M-E fresh keys array: frozen vs unfrozen')
const mFrozen = measure('freeze(keys)   ', () => keysFrozen(value))
const mBare = measure('keys bare      ', () => keysBare(value))
console.log(`  ratio frozen/bare: ${(mFrozen / mBare).toFixed(2)}x`)

console.log(`sink ${sink}`)
