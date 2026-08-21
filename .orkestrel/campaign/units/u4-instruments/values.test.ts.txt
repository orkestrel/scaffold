import type { EventSourceInterface } from '@src/core'
import {
	createRecorder,
	createRecorders,
	createResourceFactory,
	createSignal,
	flattenHeaders,
	invokeUnchecked,
	readProperty,
	waitForAbort,
} from '@src/core'
import { describe, expect, it } from 'vitest'

type LoaderEvents = {
	readonly read: readonly [path: string]
	readonly fail: readonly [reason: string, retryable: boolean]
}

class Loader implements EventSourceInterface<LoaderEvents> {
	readonly #handlers = createRecorder<readonly [event: keyof LoaderEvents, handler: unknown]>()
	on<K extends keyof LoaderEvents>(event: K, handler: (...args: LoaderEvents[K]) => void): void {
		this.#handlers.handler(event, handler)
	}
	emit(event: keyof LoaderEvents, args: readonly unknown[]): void {
		for (const [name, handler] of this.#handlers.calls) {
			if (name === event) invokeUnchecked<void>(this, handler, args)
		}
	}
}

describe('fence values', () => {
	it('records an emitter', () => {
		const loader = new Loader()
		const recorders = createRecorders<LoaderEvents, 'read' | 'fail'>(loader, ['read', 'fail'])
		loader.emit('read', ['src/index.ts'])
		loader.emit('fail', ['locked', true])
		loader.emit('read', ['src/types.ts'])
		expect(recorders.read.count).toBe(2)
		expect(recorders.read.calls).toStrictEqual([['src/index.ts'], ['src/types.ts']])
		expect(recorders.fail.calls).toStrictEqual([['locked', true]])
	})

	it('counts abort listeners', async () => {
		const instrument = createSignal()
		expect(instrument.count).toBe(0)
		const recorder = createRecorder<readonly [event: Event]>()
		instrument.signal.addEventListener('abort', recorder.handler)
		expect(instrument.count).toBe(1)
		instrument.signal.addEventListener('abort', recorder.handler)
		expect(instrument.count).toBe(1)
		instrument.signal.removeEventListener('abort', recorder.handler)
		expect(instrument.count).toBe(0)

		const once = (): void => {}
		instrument.signal.addEventListener('abort', once, { once: true })
		expect(instrument.count).toBe(1)
		const parked = waitForAbort(instrument.signal)
		expect(instrument.count).toBe(2)
		instrument.controller.abort()
		await parked
		expect(instrument.count).toBe(0)
		expect(recorder.count).toBe(0)
	})

	it('numbers resources', () => {
		const resources = createResourceFactory()
		const first = resources.create()
		const second = resources.create()
		resources.destroy(first)
		expect(first).toBe(1)
		expect(second).toBe(2)
		expect(resources.created.calls).toStrictEqual([[1], [2]])
		expect(resources.destroyed.calls).toStrictEqual([[1]])
		resources.created.clear()
		expect(resources.create()).toBe(1)
	})

	it('bounds an unchecked call', () => {
		const store = new Map<string, number>([['runs', 3]])
		const size: number = invokeUnchecked(store, readProperty(store, 'get'), ['runs'])
		expect(size).toBe(3)
		expect(readProperty<number | undefined>(store, 'missing')).toBeUndefined()
		expect(() => invokeUnchecked<void>(store, 'get', [])).toThrow(TypeError)
		expect(() => invokeUnchecked<void>(store, 'get', [])).toThrow('Method must be callable')
		expect(() => readProperty<string>(null, 'name')).toThrow('Target must be an object or function')
	})

	it('flattens headers', () => {
		expect(flattenHeaders({ 'Content-Type': 'application/json' })).toStrictEqual({
			'content-type': 'application/json',
		})
		expect(
			flattenHeaders([
				['x-run', '1'],
				['X-Run', '2'],
			]),
		).toStrictEqual({ 'x-run': '1, 2' })
		expect(Object.isFrozen(flattenHeaders(new Headers({ accept: 'text/plain' })))).toBe(true)
		expect(flattenHeaders(new Headers({ accept: 'text/plain' }))).toStrictEqual({
			accept: 'text/plain',
		})
	})
})
