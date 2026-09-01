// GC-entry counter for one dist: runs the medium is(valid) loop for a fixed
// call count and reports gc performance entries observed.
// Run: node gc-count.mjs </abs/dist/index.js>
/* eslint-disable */
import { PerformanceObserver } from 'node:perf_hooks'

const lib = await import(process.argv[2])
const { createContract, arrayShape, booleanShape, integerShape, literalShape, objectShape, stringShape } = lib
const medium = objectShape({
	name: stringShape({ min: 1 }), age: integerShape({ min: 0, max: 150 }), active: booleanShape(),
	tags: arrayShape(stringShape(), { max: 16 }), role: literalShape(['admin', 'editor', 'viewer']),
})
const contract = createContract(medium)
const value = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'admin' }

let gcCount = 0
const observer = new PerformanceObserver(list => { gcCount += list.getEntries().length })
observer.observe({ type: 'gc' })

let sink = 0
for (let i = 0; i < 100000; i++) sink += contract.is(value) ? 1 : 0
const t0 = process.hrtime.bigint()
for (let i = 0; i < 2000000; i++) sink += contract.is(value) ? 1 : 0
const t1 = process.hrtime.bigint()
await new Promise(resolve => setTimeout(resolve, 50))
observer.disconnect()
console.log(`gc entries over 2e6 calls: ${gcCount}; ${(Number(t1 - t0) / 2e6).toFixed(0)} ns/op; sink ${sink}`)
