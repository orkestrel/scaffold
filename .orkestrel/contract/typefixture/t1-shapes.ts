// Tier 1: build the medium and deep shapes through the library; never name Infer.
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
