// Tier 6: the documented primary entry point - createContract over the deep shape,
// with the compiled families read while a value is held.
import { arrayShape, booleanShape, createContract, integerShape, literalShape, objectShape, stringShape, unionShape } from '@orkestrel/contract'

const medium = objectShape({
	name: stringShape({ min: 1 }),
	age: integerShape({ min: 0, max: 150 }),
	active: booleanShape(),
	tags: arrayShape(stringShape(), { max: 16 }),
	role: literalShape(['admin', 'editor', 'viewer']),
})
const deep = objectShape({
	user: medium,
	addresses: arrayShape(objectShape({ street: stringShape(), city: stringShape(), zip: stringShape() }), { max: 4 }),
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

export const contract = createContract(deep)

export const accepted: boolean = contract.is({
	user: { name: 'Ada', age: 36, active: true, tags: ['ops'], role: 'admin' },
	addresses: [{ street: 'Main 1', city: 'Bern', zip: '30012' }],
	contact: { via: 'email', value: 'ada@example.test' },
	settings: { theme: 'dark', notify: true, limits: { daily: 10, monthly: 200 } },
})
export const parsed = contract.parse({ user: { name: 'Ada' } })
export const generated = contract.generate()
