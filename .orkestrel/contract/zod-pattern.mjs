// Probe: per-instance heap cost of method-attachment strategies, in isolation.
// Run: node --expose-gc zod-pattern.mjs
// Retention is monotonic: every allocated instance stays reachable in SINK until
// process exit, so a measurement window never has prior rounds' garbage to
// collect against and offset the growth it measures.
// Variants:
//   proto     — plain prototype methods (lower bound, no auto-binding)
//   lazy-cold — prototype getters, never accessed (Zod 4.5 "method memoization")
//   lazy-warm — prototype getters, every method accessed once (fully materialized)
//   instance  — constructor assigns arrow-function closures as own properties (Zod pre-4.5)
//   frozen    — lazy variant, instance frozen after construction, then methods accessed
//   control   — CONTROL_BUFFER: proto shape plus one on-heap Array(128) of doubles (1024B payload)
/* eslint-disable */

const METHODS = [
	'parse', 'safeParse', 'parseAsync', 'safeParseAsync', 'spa',
	'refine', 'superRefine', 'transform', 'brand', 'describe',
	'optional', 'nullable', 'nullish', 'array', 'promise',
	'or', 'and', 'catch', 'default', 'readonly',
	'pipe', 'meta', 'check', 'clone',
]

class InstanceBound {
	constructor(def) {
		this._def = def
		for (const name of METHODS) {
			this[name] = (input) => ({ name, def: this._def, input })
		}
	}
}

class LazyBound {
	constructor(def) {
		this._def = def
	}
}
for (const name of METHODS) {
	Object.defineProperty(LazyBound.prototype, name, {
		configurable: true,
		enumerable: false,
		get() {
			const self = this
			const bound = (input) => ({ name, def: self._def, input })
			Object.defineProperty(self, name, {
				configurable: true,
				enumerable: false,
				writable: false,
				value: bound,
			})
			return bound
		},
	})
}

class ProtoMethods {
	constructor(def) {
		this._def = def
	}
}
for (const name of METHODS) {
	Object.defineProperty(ProtoMethods.prototype, name, {
		configurable: true,
		enumerable: false,
		writable: true,
		value: function (input) {
			return { name, def: this._def, input }
		},
	})
}

class ControlBuffer {
	constructor(def) {
		this._def = def
		this.payload = new Array(128).fill(0.5) // on-heap FixedDoubleArray, 1024B payload
	}
}

const SINK = []

function measure(label, build, { count = 30_000, rounds = 3 } = {}) {
	const samples = []
	for (let r = 0; r < rounds; r++) {
		global.gc(); global.gc()
		const before = process.memoryUsage().heapUsed
		const kept = new Array(count)
		for (let i = 0; i < count; i++) kept[i] = build(i)
		global.gc(); global.gc()
		const after = process.memoryUsage().heapUsed
		SINK.push(kept)
		samples.push((after - before) / count)
	}
	samples.sort((a, b) => a - b)
	const median = samples[Math.floor(samples.length / 2)]
	console.log(`${label}: median ${median.toFixed(1)} B/instance (rounds: ${samples.map(s => s.toFixed(1)).join(', ')})`)
	return median
}

if (typeof global.gc !== 'function') {
	console.error('run with --expose-gc')
	process.exit(1)
}

console.log(`node ${process.version}; methods per class: ${METHODS.length}; instances per round: 30000; rounds: 3; retention: monotonic`)
const proto = measure('proto        (prototype methods)      ', i => new ProtoMethods({ id: i }))
const lazyCold = measure('lazy-cold    (getters, untouched)     ', i => new LazyBound({ id: i }))
const lazyWarm = measure('lazy-warm    (getters, all touched)   ', (i) => {
	const item = new LazyBound({ id: i })
	for (const name of METHODS) void item[name]
	return item
})
const instance = measure('instance     (ctor-assigned bound)    ', i => new InstanceBound({ id: i }))
let frozenThrew = ''
const frozen = measure('frozen-lazy  (frozen, then touched)   ', (i) => {
	const item = Object.freeze(new LazyBound({ id: i }))
	try {
		for (const name of METHODS) void item[name]
	}
	catch (error) {
		if (frozenThrew === '') frozenThrew = String(error)
	}
	return item
})
const control = measure('control      (proto + 1024B on-heap)  ', i => new ControlBuffer({ id: i }))

console.log('---')
console.log(`CONTROL_BUFFER delta over proto: ${(control - proto).toFixed(1)} B/instance (expectation: 1024 payload + array headers)`)
console.log(`instance over proto:     +${(instance - proto).toFixed(1)} B/instance`)
console.log(`lazy-cold over proto:    +${(lazyCold - proto).toFixed(1)} B/instance`)
console.log(`lazy-warm over proto:    +${(lazyWarm - proto).toFixed(1)} B/instance`)
console.log(`instance / lazy-cold ratio (headline analogue): ${(instance / Math.max(lazyCold, 1)).toFixed(2)}x`)
console.log(`frozen-lazy touched read: ${frozenThrew === '' ? 'no throw; methods materialized? ' + (frozen > lazyCold + 100 ? 'yes (heap grew)' : 'no (heap flat — getter result not cached on frozen instance)') : 'THREW: ' + frozenThrew}`)
console.log(`frozen-lazy heap: ${frozen.toFixed(1)} B/instance (compare lazy-warm ${lazyWarm.toFixed(1)}, lazy-cold ${lazyCold.toFixed(1)})`)
