// Probe: is the build-time tracking memo in #trackGuard/#trackFaults ever read?
// Installs a counting WeakMap subclass BEFORE importing the built package, so the
// module's `static #weakMap = WeakMap` capture and its INTRINSICS.recall/retain
// (WeakMap.prototype.get/set) resolve to the counting forms.
// Control: the call-phase replacement memos MUST show gets and sets — an
// instrument that reports zero reads everywhere has observed nothing.
/* eslint-disable */

const RealWeakMap = globalThis.WeakMap
const registry = []
let phase = 'compile'

class CountingWeakMap extends RealWeakMap {
	constructor(entries) {
		super(entries)
		this.tag = { phase, gets: 0, sets: 0, hass: 0 }
		registry.push(this.tag)
	}
	get(key) {
		this.tag.gets += 1
		return super.get(key)
	}
	set(key, value) {
		this.tag.sets += 1
		return super.set(key, value)
	}
	has(key) {
		this.tag.hass += 1
		return super.has(key)
	}
}
globalThis.WeakMap = CountingWeakMap

const { compileGuard, compileAuditor, objectShape, stringShape, arrayShape } = await import(
	'/home/user/contract/dist/src/core/index.js'
)

// Tracked (repeats) nodes in the guard family: the root object, the array, the
// element object — construction allocates one build-time memo per tracked node.
const shape = objectShape({ items: arrayShape(objectShape({ name: stringShape() })) })

const guard = compileGuard(shape)
const compiled = registry.length
phase = 'call'

const value = { items: [{ name: 'Ada' }, { name: 'Bo' }] }
if (guard(value) !== true) throw new Error('guard rejected a valid value')
if (guard(value) !== true) throw new Error('guard rejected on the second call')
compileAuditor(shape, value)

const compilePhase = registry.filter(tag => tag.phase === 'compile')
const callPhase = registry.filter(tag => tag.phase === 'call')
const compileUntouched = compilePhase.filter(tag => tag.gets === 0 && tag.sets === 0 && tag.hass === 0)
const compileHasOnly = compilePhase.filter(tag => tag.gets === 0 && tag.sets === 0 && tag.hass > 0)
const callRead = callPhase.filter(tag => tag.gets > 0)
const callWritten = callPhase.filter(tag => tag.sets > 0)

console.log(`WeakMap instances constructed during compile: ${compilePhase.length} (of ${compiled} pre-call total)`)
console.log(`  never touched through get, set, or has: ${compileUntouched.length}`)
console.log(`  touched through has alone (cycle or membership checks): ${compileHasOnly.length}`)
console.log(`  touched through get or set: ${compilePhase.length - compileUntouched.length - compileHasOnly.length}`)
console.log(`WeakMap instances constructed during calls: ${callPhase.length}`)
console.log(`  with gets > 0 (control - must be > 0): ${callRead.length}`)
console.log(`  with sets > 0 (control - must be > 0): ${callWritten.length}`)
console.log('---')
if (callRead.length === 0 || callWritten.length === 0) {
	console.log('CONTROL FAILED: the instrument observed no reads or no writes on live memos; readings unusable')
	process.exit(1)
}
console.log(`VERDICT: ${compileUntouched.length} build-time memo allocation(s) were never read or written — dead at build, replaced before first use`)
