// Probe: CPU-profile attribution of contract hot paths.
// Run: node --cpu-prof --cpu-prof-dir=<dir> cpu-attribution.mjs <subject>
//   subject: medium-is | deep-audit | medium-explain | medium-parse | deep-explain
// Runs the hot loop ~2s, exits; the caller parses the .cpuprofile with parse-cpuprofile.mjs.
/* eslint-disable */
import {
	createContract,
	arrayShape,
	booleanShape,
	integerShape,
	literalShape,
	objectShape,
	stringShape,
	unionShape,
} from '/home/user/contract/dist/src/core/index.js'

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
const mediumValid = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'admin' }
const deepValid = {
	user: mediumValid,
	addresses: [{ street: 'Main 1', city: 'Bern', zip: '30012' }],
	contact: { via: 'email', value: 'ada@example.test' },
	settings: { theme: 'dark', notify: true, limits: { daily: 10, monthly: 200 } },
}

const subject = process.argv[2]
let sink = 0
const c = { 'medium-is': createContract(medium), 'deep-audit': createContract(deep), 'medium-explain': createContract(medium), 'medium-parse': createContract(medium), 'deep-explain': createContract(deep) }[subject]
if (c === undefined) { console.error('subject: medium-is | deep-audit | medium-explain | medium-parse | deep-explain'); process.exit(1) }

const deadline = performance.now() + 2000
const mediumInvalidLate = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'guest' }
const deepInvalidLate = { ...deepValid, settings: { theme: 'dark', notify: true, limits: { daily: 10, monthly: -1 } } }
if (subject === 'medium-explain') {
	while (performance.now() < deadline) {
		for (let i = 0; i < 1000; i++) sink += c.explain(mediumInvalidLate).length
	}
}
else if (subject === 'medium-parse') {
	while (performance.now() < deadline) {
		for (let i = 0; i < 1000; i++) sink += c.parse(mediumValid) === undefined ? 0 : 1
	}
}
else if (subject === 'deep-explain') {
	while (performance.now() < deadline) {
		for (let i = 0; i < 1000; i++) sink += c.explain(deepInvalidLate).length
	}
}
else if (subject === 'medium-is') {
	while (performance.now() < deadline) {
		for (let i = 0; i < 1000; i++) sink += c.is(mediumValid) ? 1 : 0
	}
}
else {
	while (performance.now() < deadline) {
		for (let i = 0; i < 200; i++) sink += c.audit(deepValid).length
	}
}
console.log(`${subject} sink ${sink}`)
