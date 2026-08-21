import type { EventSourceInterface } from '@src/core'
import { createRecorders } from '@src/core'

type LoaderEvents = {
	readonly read: readonly [path: string]
	readonly fail: readonly [reason: string, retryable: boolean]
}

export function watch(loader: EventSourceInterface<LoaderEvents>): void {
	const recorders = createRecorders(loader, ['read', 'fail'])
	const paths: readonly (readonly [path: string])[] = recorders.read.calls
	const fails: readonly (readonly [reason: string, retryable: boolean])[] = recorders.fail.calls
	if (paths.length + fails.length < 0) throw new Error('unreachable')
}
