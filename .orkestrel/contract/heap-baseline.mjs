// Probe: per-call heap and time of @orkestrel/contract compilation surfaces.
// Run: node --expose-gc contract-baseline.mjs
// Measures, per shape size:
//   compiler-cold — new ContractCompiler(shape), no getter read
//   guard-only    — new ContractCompiler(shape) + one .guard read
//   contract      — createContract(shape) (every family, frozen bundle)
// Control: CONTROL_ARRAY — allocation of one Array(1024) filled with numbers per kept slot.
/* eslint-disable */
import {
	ContractCompiler,
	createContract,
	arrayShape,
	booleanShape,
	integerShape,
	literalShape,
	objectShape,
	stringShape,
	unionShape,
} from '/home/user/contract/dist/src/core/index.js'

const small = stringShape({ min: 1, max: 64 })

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

const SINK = []

function measure(label, build, { count = 500, rounds = 3 } = {}) {
	const heaps = []
	const times = []
	for (let r = 0; r < rounds; r++) {
		global.gc(); global.gc()
		const before = process.memoryUsage().heapUsed
		const t0 = performance.now()
		const kept = new Array(count)
		for (let i = 0; i < count; i++) kept[i] = build()
		const t1 = performance.now()
		global.gc(); global.gc()
		const after = process.memoryUsage().heapUsed
		SINK.push(kept)
		heaps.push((after - before) / count)
		times.push(((t1 - t0) / count) * 1000)
	}
	heaps.sort((a, b) => a - b); times.sort((a, b) => a - b)
	const heap = heaps[Math.floor(heaps.length / 2)]
	const time = times[Math.floor(times.length / 2)]
	console.log(`${label}: ${heap.toFixed(0)} B/call, ${time.toFixed(1)} us/call (heap rounds: ${heaps.map(h => h.toFixed(0)).join(', ')})`)
	return heap
}

if (typeof global.gc !== 'function') {
	console.error('run with --expose-gc')
	process.exit(1)
}

console.log(`node ${process.version}; calls per round: 500; rounds: 3; retention: monotonic`)
for (const [name, shape] of [['small', small], ['medium', medium], ['deep', deep]]) {
	console.log(`--- shape: ${name}`)
	measure('compiler-cold', () => new ContractCompiler(shape))
	measure('guard-only   ', () => {
		const c = new ContractCompiler(shape)
		void c.guard
		return c
	})
	measure('contract     ', () => createContract(shape))
}
console.log('--- control')
const controlExpected = 1024 * 8 // 1024 doubles on heap, payload bytes only, headers extra
const control = measure('CONTROL_ARRAY', () => new Array(1024).fill(0.5))
console.log(`control expectation: near ${controlExpected} B payload; measured ${control.toFixed(0)} B/call`)
