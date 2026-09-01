import { expect, test } from 'vitest'

const Native = Set
let armed = false

class Hostile extends Native {
	constructor(iterable?: Iterable<unknown>) {
		if (armed) throw new TypeError('hostile Set')
		super(iterable)
	}
}

Reflect.set(globalThis, 'Set', Hostile)

const api = await import('@src/core')

function shapeOf(width: number) {
	const properties: Record<string, unknown> = {}
	for (let index = 0; index < width; index += 1) properties['k' + index] = api.stringShape()
	return api.objectShape(properties as never)
}

function valueOf(width: number) {
	const value: Record<string, string> = {}
	for (let index = 0; index < width; index += 1) value['k' + index] = 'v'
	return value
}

function measure(run: () => unknown) {
	armed = true
	try {
		return { thrown: false, value: run() }
	} catch (error) {
		const carried: Record<string, unknown> = {}
		if (error instanceof Error) {
			carried.name = error.name
			carried.message = error.message
			carried.code = Reflect.get(error, 'code')
			carried.context = Reflect.get(error, 'context')
		}
		return { thrown: true, ...carried }
	} finally {
		armed = false
	}
}

for (const width of [2, 40]) {
	test('reporter answers a fault array under a pre-load hostile Set at width ' + width, () => {
		const outcome = measure(() => api.compileReporter(shapeOf(width), valueOf(width)))
		expect(outcome).toEqual({
			thrown: false,
			value: [{ reason: 'type', path: [], expected: 'object', received: 'object' }],
		})
	})

	test('auditor refuses carrying path under a pre-load hostile Set at width ' + width, () => {
		const outcome = measure(() => api.compileAuditor(shapeOf(width), valueOf(width)))
		expect(outcome.thrown).toBe(true)
		expect(Reflect.get(outcome, 'code')).toBe('structure')
		expect(Reflect.get(outcome, 'context')).toEqual({ path: [], shape: 'object' })
	})
}
