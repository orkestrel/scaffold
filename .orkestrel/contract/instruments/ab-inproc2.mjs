// Paired in-process A/B: both dist copies in one process, per-family rounds
// alternating order (A-first on even rounds, B-first on odd), so machine drift
// cancels in the pairing. Reports per-family median ns/op per side, the median
// of per-round B/A ratios, and the ratio spread.
// Run: node ab-inproc.mjs <A/index.js> <B/index.js> [families]
// Coverage: both copies share one isolate, so cross-copy IC pollution of shared
// builtins is possible; each copy's own call sites are distinct closures. The
// identity control bounds whatever that costs.
/* eslint-disable */
const [pathA, pathB] = [process.argv[2], process.argv[3]]
const familyList = (process.argv[4] ?? 'is-medium,parse-medium,audit-medium,explain-medium,is-deep,audit-deep').split(',')

async function armSide(path) {
	const lib = await import(path)
	const { createContract, arrayShape, booleanShape, integerShape, literalShape, objectShape, stringShape, unionShape } = lib
	const medium = objectShape({
		name: stringShape({ min: 1 }), age: integerShape({ min: 0, max: 150 }), active: booleanShape(),
		tags: arrayShape(stringShape(), { max: 16 }), role: literalShape(['admin', 'editor', 'viewer']),
	})
	const deep = objectShape({
		user: medium,
		addresses: arrayShape(objectShape({ street: stringShape(), city: stringShape(), zip: stringShape({ pattern: /^\d{5}$/ }) }), { max: 4 }),
		contact: unionShape(
			objectShape({ via: literalShape(['email']), value: stringShape() }),
			objectShape({ via: literalShape(['phone']), value: stringShape() }),
		),
		settings: objectShape({ theme: literalShape(['light', 'dark']), notify: booleanShape(), limits: objectShape({ daily: integerShape({ min: 0 }), monthly: integerShape({ min: 0 }) }) }),
	})
	const list = arrayShape(stringShape({ min: 1 }), { max: 64 })
	return { medium: createContract(medium), deep: createContract(deep), list: createContract(list) }
}

const mediumValid = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'admin' }
const mediumInvalidLate = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'guest' }
const listValid = Array.from({ length: 48 }, (unused, index) => `entry-${index}`)
const deepInvalidLate = {
	user: mediumValid,
	addresses: [{ street: 'Main 1', city: 'Bern', zip: '30012' }],
	contact: { via: 'email', value: 'ada@example.test' },
	settings: { theme: 'dark', notify: true, limits: { daily: 10, monthly: -1 } },
}
const deepValid = {
	user: mediumValid,
	addresses: [{ street: 'Main 1', city: 'Bern', zip: '30012' }],
	contact: { via: 'email', value: 'ada@example.test' },
	settings: { theme: 'dark', notify: true, limits: { daily: 10, monthly: 200 } },
}

function opsFor(side) {
	return {
		'is-medium': () => (side.medium.is(mediumValid) ? 1 : 0),
		'parse-medium': () => (side.medium.parse(mediumValid) === undefined ? 0 : 1),
		'audit-medium': () => side.medium.audit(mediumValid).length,
		'explain-medium': () => side.medium.explain(mediumInvalidLate).length,
		'is-deep': () => (side.deep.is(deepValid) ? 1 : 0),
		'audit-deep': () => side.deep.audit(deepValid).length,
		'explain-deep': () => side.deep.explain(deepInvalidLate).length,
		'parse-deep': () => (side.deep.parse(deepValid) === undefined ? 0 : 1),
		'is-list48': () => (side.list.is(listValid) ? 1 : 0),
		'audit-list48': () => side.list.audit(listValid).length,
	}
}

let sink = 0
function timeRound(op, calls) {
	const t0 = process.hrtime.bigint()
	for (let i = 0; i < calls; i++) sink += op(i)
	const t1 = process.hrtime.bigint()
	return Number(t1 - t0) / calls
}

const sideA = opsFor(await armSide(pathA))
const sideB = opsFor(await armSide(pathB))

for (const family of familyList) {
	const opA = sideA[family]
	const opB = sideB[family]
	if (opA === undefined || opB === undefined) { console.error(`unknown family ${family}`); process.exit(1) }
	for (let i = 0; i < 5000; i++) sink += opA(i) + opB(i)
	const probe = timeRound(opA, 1000)
	const calls = Math.min(200_000, Math.max(500, Math.round(8_000_000 / Math.max(probe, 1))))
	const aRounds = []
	const bRounds = []
	const ratios = []
	for (let round = 0; round < 49; round += 1) {
		let a
		let b
		if (round % 2 === 0) {
			a = timeRound(opA, calls)
			b = timeRound(opB, calls)
		}
		else {
			b = timeRound(opB, calls)
			a = timeRound(opA, calls)
		}
		aRounds.push(a)
		bRounds.push(b)
		ratios.push(b / a)
	}
	const mid = list => [...list].sort((x, y) => x - y)[Math.floor(list.length / 2)]
	console.log(`${family}: A ${mid(aRounds).toFixed(0)} ns/op  B ${mid(bRounds).toFixed(0)} ns/op  B/A median ${mid(ratios).toFixed(3)} (ratio p25 ${[...ratios].sort((x, y) => x - y)[12].toFixed(3)} p75 ${[...ratios].sort((x, y) => x - y)[36].toFixed(3)})`)
}
console.error(`sink ${sink}`)
