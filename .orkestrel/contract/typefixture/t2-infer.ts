// Tier 2: tier 1 shapes plus Infer on each, with values held in the inferred types.
import type { Infer } from '@orkestrel/contract'
import { arrayShape, booleanShape, integerShape, literalShape, objectShape, stringShape, unionShape } from '@orkestrel/contract'

export const medium = objectShape({
	name: stringShape({ min: 1 }),
	age: integerShape({ min: 0, max: 150 }),
	active: booleanShape(),
	tags: arrayShape(stringShape(), { max: 16 }),
	role: literalShape(['admin', 'editor', 'viewer']),
})
export const deep = objectShape({
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

export type MediumValue = Infer<typeof medium>
export type DeepValue = Infer<typeof deep>

export const mediumValue: MediumValue = {
	name: 'Ada', age: 36, active: true, tags: ['ops'], role: 'admin',
}
export const deepValue: DeepValue = {
	user: mediumValue,
	addresses: [{ street: 'Main 1', city: 'Bern', zip: '30012' }],
	contact: { via: 'email', value: 'ada@example.test' },
	settings: { theme: 'dark', notify: true, limits: { daily: 10, monthly: 200 } },
}
