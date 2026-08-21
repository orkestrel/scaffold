import type { EventSourceInterface } from '@src/core'
import { createRecorder, createRecorders } from '@src/core'

type LoaderEvents = {
	readonly read: readonly [path: string]
	readonly fail: readonly [reason: string, retryable: boolean]
}

class Loader implements EventSourceInterface<LoaderEvents> {
	readonly #subscriptions = createRecorder<readonly [event: keyof LoaderEvents, handler: unknown]>()
	on<K extends keyof LoaderEvents>(event: K, handler: (...args: LoaderEvents[K]) => void): void {
		this.#subscriptions.handler(event, handler)
	}
}

export function watch(loader: Loader): void {
	const explicit = createRecorders<LoaderEvents, 'read'>(loader, ['read'])
	const paths: readonly (readonly [path: string])[] = explicit.read.calls
	if (paths.length < 0) throw new Error('unreachable')
}
