export const VECTORS = Object.freeze([
	Object.freeze({ closing: true, name: 'observes the compact menu lifecycle', opening: true }),
	Object.freeze({
		closing: true,
		name: 'omitting opening fails the opening observation',
		opening: false,
	}),
	Object.freeze({
		closing: false,
		name: 'omitting dismissal fails the closing observation',
		opening: true,
	}),
])
