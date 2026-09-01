// P0: differential answer parity between two dist copies, all six artifacts.
// Run: node parity.mjs <A/index.js> <B/index.js>
// Corpus: generated declarations across width, depth, sharing, union arity, and
// refinements, paired with valid, invalid, hostile, and exotic values. generate
// runs under an injected deterministic random source. Throws compare by
// ContractError code + message. Exit 0 with 'PARITY: IDENTICAL' or exit 1
// listing every difference.
/* eslint-disable */
const [pathA, pathB] = [process.argv[2], process.argv[3]]
const A = await import(pathA)
const B = await import(pathB)

function buildDeclarations(lib) {
	const { arrayShape, booleanShape, integerShape, literalShape, numberShape, objectShape, optionalShape, nullableShape, stringShape, unionShape, oneOfShape } = lib
	const declarations = {}
	declarations.leaf = stringShape({ min: 1, max: 8 })
	declarations.flat = objectShape({
		name: stringShape({ min: 1 }), age: integerShape({ min: 0, max: 150 }), active: booleanShape(),
	})
	declarations.medium = objectShape({
		name: stringShape({ min: 1 }), age: integerShape({ min: 0, max: 150 }), active: booleanShape(),
		tags: arrayShape(stringShape(), { max: 16 }), role: literalShape(['admin', 'editor', 'viewer']),
	})
	const address = objectShape({ street: stringShape(), city: stringShape(), zip: stringShape({ pattern: /^\d{5}$/ }) })
	declarations.deep = objectShape({
		user: declarations.medium,
		addresses: arrayShape(address, { max: 4 }),
		contact: unionShape(
			objectShape({ via: literalShape(['email']), value: stringShape() }),
			objectShape({ via: literalShape(['phone']), value: stringShape() }),
		),
		settings: objectShape({
			theme: literalShape(['light', 'dark']), notify: booleanShape(),
			limits: objectShape({ daily: integerShape({ min: 0 }), monthly: integerShape({ min: 0 }) }),
		}),
	})
	const sharedChild = objectShape({ label: stringShape(), count: integerShape() })
	declarations.shared = objectShape({ left: sharedChild, right: sharedChild })
	declarations.wrapped = objectShape({
		maybe: optionalShape(stringShape({ min: 2 })), orNull: nullableShape(integerShape()),
		list: arrayShape(nullableShape(booleanShape()), { min: 0, max: 3 }),
	})
	declarations.exclusive = oneOfShape(
		objectShape({ via: literalShape(['a']), value: stringShape() }),
		objectShape({ via: literalShape(['b']), value: integerShape() }),
	)
	declarations.numeric = objectShape({ score: numberShape({ min: -1.5, max: 1.5 }), count: integerShape({ min: 0 }) })
	let chain = arrayShape(stringShape())
	for (let level = 0; level < 8; level += 1) chain = arrayShape(chain)
	declarations.chain = chain
	return declarations
}

function buildValues() {
	const hostileProto = Object.create({ hostile: true })
	hostileProto.name = 'Ada'
	const throwingGetter = {}
	Object.defineProperty(throwingGetter, 'name', { enumerable: true, get() { throw new Error('hostile get') } })
	const sparse = [1, , 3]
	const protoKey = JSON.parse('{"__proto__": {"polluted": true}, "name": "Ada", "age": 5, "active": true}')
	const lyingLength = new Proxy([1, 2], { get(target, key, receiver) { return key === 'length' ? 5 : Reflect.get(target, key, receiver) } })
	const nested = level => {
		let value = ['leaf']
		for (let i = 0; i < level; i += 1) value = [value, value]
		return value
	}
	return {
		validString: 'Ada', emptyString: '', longString: 'x'.repeat(64),
		validFlat: { name: 'Ada', age: 36, active: true },
		invalidFlat: { name: '', age: -1, active: 'yes' },
		extraFlat: { name: 'Ada', age: 36, active: true, extra: 'later' },
		missingFlat: { name: 'Ada' },
		validMedium: { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'admin' },
		invalidLateMedium: { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'guest' },
		coercibleMedium: { name: 'Ada', age: '36', active: true, tags: ['ops'], role: 'admin' },
		validDeep: {
			user: { name: 'Ada', age: 36, active: true, tags: ['ops'], role: 'admin' },
			addresses: [{ street: 'Main 1', city: 'Bern', zip: '30012' }],
			contact: { via: 'email', value: 'ada@example.test' },
			settings: { theme: 'dark', notify: true, limits: { daily: 10, monthly: 200 } },
		},
		invalidDeep: {
			user: { name: 'Ada', age: 36, active: true, tags: ['ops'], role: 'admin' },
			addresses: [{ street: 'Main 1', city: 'Bern', zip: 'no' }],
			contact: { via: 'fax', value: 'x' },
			settings: { theme: 'blue', notify: 'yes', limits: { daily: -1, monthly: 200 } },
		},
		sharedValue: (() => { const child = { label: 'x', count: 1 }; return { left: child, right: child } })(),
		wrappedFull: { maybe: 'ok', orNull: null, list: [true, null] },
		wrappedEmpty: { orNull: 3, list: [] },
		exclusiveA: { via: 'a', value: 'text' },
		exclusiveBoth: { via: 'a', value: 5 },
		numericEdge: { score: -0.0, count: 0 },
		numericNaN: { score: Number.NaN, count: 1 },
		hostileProto, throwingGetter, sparse, protoKey, lyingLength,
		nullValue: null, undefinedValue: undefined, arrayAsObject: [],
		nestedShallow: nested(3), nestedShared: nested(12),
	}
}

function makeRandom() {
	let state = 0x2545F491
	return () => {
		state = (Math.imul(state, 1103515245) + 12345) >>> 0
		return state / 4294967296
	}
}

function record(fn) {
	try {
		return { kind: 'value', value: fn() }
	}
	catch (error) {
		const code = error !== null && typeof error === 'object' && 'code' in error ? error.code : undefined
		const message = error instanceof Error ? error.message : String(error)
		return { kind: 'throw', code, message }
	}
}

function serialize(entry) {
	if (entry.kind === 'throw') return `THROW ${String(entry.code)} ${entry.message}`
	const value = entry.value
	if (value === undefined) return 'UNDEFINED'
	const seen = new WeakSet()
	return JSON.stringify(value, (key, item) => {
		if (typeof item === 'object' && item !== null) {
			if (seen.has(item)) return '[circular]'
			seen.add(item)
		}
		if (typeof item === 'number') return Object.is(item, -0) ? '-0' : (Number.isNaN(item) ? 'NaN' : item)
		return item
	})
}

const sides = { A: { lib: A }, B: { lib: B } }
for (const side of Object.values(sides)) {
	side.declarations = buildDeclarations(side.lib)
	side.contracts = {}
	for (const [name, shape] of Object.entries(side.declarations)) {
		side.contracts[name] = record(() => side.lib.createContract(shape))
	}
}

const values = buildValues()
const differences = []
let comparisons = 0

for (const name of Object.keys(sides.A.declarations)) {
	const cA = sides.A.contracts[name]
	const cB = sides.B.contracts[name]
	if (cA.kind !== cB.kind || (cA.kind === 'throw' && serialize(cA) !== serialize(cB))) {
		differences.push(`${name}: createContract ${serialize(cA)} vs ${serialize(cB)}`)
		continue
	}
	if (cA.kind === 'throw') continue
	const schemaA = serialize(record(() => cA.value.schema))
	const schemaB = serialize(record(() => cB.value.schema))
	comparisons += 1
	if (schemaA !== schemaB) differences.push(`${name}: schema differs`)
	for (const [valueName, value] of Object.entries(values)) {
		for (const family of ['is', 'parse', 'audit', 'explain']) {
			const a = serialize(record(() => cA.value[family](value)))
			const b = serialize(record(() => cB.value[family](value)))
			comparisons += 1
			if (a !== b) differences.push(`${name}.${family}(${valueName}): ${a.slice(0, 120)} VS ${b.slice(0, 120)}`)
		}
	}
	const genA = serialize(record(() => cA.value.generate(makeRandom())))
	const genB = serialize(record(() => cB.value.generate(makeRandom())))
	comparisons += 1
	if (genA !== genB) differences.push(`${name}.generate: ${genA.slice(0, 120)} VS ${genB.slice(0, 120)}`)
}

console.log(`comparisons: ${comparisons}`)
if (differences.length === 0) {
	console.log('PARITY: IDENTICAL')
}
else {
	for (const difference of differences.slice(0, 40)) console.log(`DIFF ${difference}`)
	console.log(`PARITY: ${differences.length} DIFFERENCES`)
	process.exit(1)
}
