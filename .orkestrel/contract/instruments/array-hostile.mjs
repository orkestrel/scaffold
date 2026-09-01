// Evidence instrument for the packed-array fast path: runs hostile and honest
// array views through readArrayEntries, arrayOf, and a compiled contract on a
// given dist and prints one line per vector. Two dists must print identical
// lines. Run: node array-hostile.mjs </abs/dist/index.js>
/* eslint-disable */
const lib = await import(process.argv[2])
const { readArrayEntries, arrayOf, isString, createContract, arrayShape, stringShape, integerShape } = lib
const contract = createContract(arrayShape(stringShape(), { max: 2000 }))
const guard = arrayOf(isString)
function describeRead(value) {
	try {
		const read = readArrayEntries(value)
		if (!read.success) return `refused:${read.error instanceof Error ? read.error.message : String(read.error)}`
		const entries = read.value.entries
		const owned = Reflect.ownKeys(entries).filter(k => typeof k === 'string' && k !== 'length').length
		return `ok dense=${read.value.dense} length=${entries.length} owned=${owned} frozen=${Object.isFrozen(entries)} first=${JSON.stringify(entries[0])} last=${JSON.stringify(entries[entries.length - 1])}`
	} catch (error) { return `THREW ${error && error.message}` }
}
function describe(name, value) {
	let auditText
	try { auditText = JSON.stringify(contract.audit(value)).slice(0, 90) } catch (e) { auditText = `THREW ${e && e.code} ${e && e.message}` }
	console.log(`${name}: read[${describeRead(value)}] arrayOf=${guard(value)} is=${contract.is(value)} audit=${auditText}`)
}
const plain = ['a', 'b', 'c']
describe('packed', plain)
describe('empty', [])
describe('extra own key', Object.assign(['a', 'b'], { note: 'x' }))
describe('symbol key', Object.assign(['a', 'b'], { [Symbol('s')]: 1 }))
describe('sparse middle', ['a', , 'c'])
describe('trailing hole', (() => { const a = ['a']; a.length = 3; return a })())
describe('frozen', Object.freeze(['a', 'b']))
describe('non-writable index', Object.defineProperty(['a', 'b'], '0', { writable: false }))
describe('accessor index', Object.defineProperty(['a', 'b'], '1', { get: () => 'g', enumerable: true, configurable: true }))
describe('length 1024', Array.from({ length: 1024 }, (_, i) => `v${i}`))
describe('length 1025', Array.from({ length: 1025 }, (_, i) => `v${i}`))
describe('length 1500', Array.from({ length: 1500 }, (_, i) => `v${i}`))
describe('proto index on hole', (() => { const a = ['a', , 'c']; Object.setPrototypeOf(a, Object.assign(Object.create(Array.prototype), { 1: 'proto' })); return a })())
const target = ['a', 'b']
describe('proxy canonical keys, disowned index', new Proxy(target, { ownKeys: () => ['0', '1', 'length'], getOwnPropertyDescriptor: (t, k) => k === '1' ? undefined : Reflect.getOwnPropertyDescriptor(t, k) }))
describe('proxy descending keys', new Proxy(target, { ownKeys: () => ['1', '0', 'length'] }))
describe('proxy length before indices', new Proxy(target, { ownKeys: () => ['length', '0', '1'] }))
describe('proxy lying length larger', new Proxy(target, { get: (t, k, r) => k === 'length' ? 5 : Reflect.get(t, k, r) }))
describe('proxy lying length smaller', new Proxy(['a', 'b', 'c'], { get: (t, k, r) => k === 'length' ? 2 : Reflect.get(t, k, r) }))
describe('proxy index get throws', new Proxy(target, { get: (t, k, r) => { if (k === '1') throw new Error('boom') ; return Reflect.get(t, k, r) } }))
describe('proxy ownKeys throws', new Proxy(target, { ownKeys: () => { throw new Error('keys') } }))
describe('proxy extra reported key', new Proxy(target, { ownKeys: () => ['0', '1', 'length', 'ghost'], getOwnPropertyDescriptor: (t, k) => k === 'ghost' ? { value: 1, configurable: true, enumerable: true, writable: true } : Reflect.getOwnPropertyDescriptor(t, k) }))
describe('proxy canonical but index text mismatch', new Proxy(target, { ownKeys: () => ['0', '01', 'length'], getOwnPropertyDescriptor: (t, k) => k === '01' ? { value: 'x', configurable: true, enumerable: true, writable: true } : Reflect.getOwnPropertyDescriptor(t, k) }))
describe('typed array', new Uint8Array([1, 2]))
describe('array-like object', { 0: 'a', 1: 'b', length: 2 })
describe('non-array', 'text')
