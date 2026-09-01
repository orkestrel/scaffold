// Probe: differential profile - does sortValues/collectMembers time come from
// literal-membership machinery or from the object walk itself?
// Run: node --cpu-prof --cpu-prof-dir=profiles --cpu-prof-name=<name>.cpuprofile cpu-differential.mjs <subject>
//   subject: with-literal (medium as baselined) | no-literal (role key removed)
/* eslint-disable */
import {
	createContract,
	arrayShape,
	booleanShape,
	integerShape,
	literalShape,
	objectShape,
	stringShape,
} from '/home/user/contract/dist/src/core/index.js'

const withLiteral = objectShape({
	name: stringShape({ min: 1 }),
	age: integerShape({ min: 0, max: 150 }),
	active: booleanShape(),
	tags: arrayShape(stringShape(), { max: 16 }),
	role: literalShape(['admin', 'editor', 'viewer']),
})
const noLiteral = objectShape({
	name: stringShape({ min: 1 }),
	age: integerShape({ min: 0, max: 150 }),
	active: booleanShape(),
	tags: arrayShape(stringShape(), { max: 16 }),
})
const valueWith = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'], role: 'admin' }
const valueWithout = { name: 'Ada', age: 36, active: true, tags: ['ops', 'ml'] }

const subject = process.argv[2]
const picked = subject === 'with-literal'
	? { contract: createContract(withLiteral), value: valueWith }
	: subject === 'no-literal'
		? { contract: createContract(noLiteral), value: valueWithout }
		: undefined
if (picked === undefined) { console.error('subject: with-literal | no-literal'); process.exit(1) }

let sink = 0
const deadline = performance.now() + 2000
while (performance.now() < deadline) {
	for (let i = 0; i < 1000; i++) sink += picked.contract.is(picked.value) ? 1 : 0
}
console.log(`${subject} sink ${sink}`)
