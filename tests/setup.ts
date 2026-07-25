import type { Surface, SyncReport } from '@src/core'
import { attempt, isRecord, parseJSON } from '@orkestrel/contract'

// ── Call recorder (a real callback, not a mock) ──────────────────────────────
//
// AGENTS §16.1: when a test only needs to count calls or inspect arguments, use a
// recorder — a real listener that records every invocation — rather than a test-
// framework spy. `handler` is a genuine callback; `calls` is each invocation's
// argument tuple, in order.

/** A real call-recording callback over an argument tuple (AGENTS §16.1). */
export interface TestRecorderInterface<TArgs extends readonly unknown[]> {
	readonly calls: readonly TArgs[]
	readonly count: number
	readonly handler: (...args: TArgs) => void
	clear(): void
}

/**
 * Create a {@link TestRecorderInterface} — a real callback that records each
 * invocation's arguments, for asserting what fired and with what (AGENTS §16.1).
 *
 * @typeParam TArgs - The argument tuple the recorded handler receives
 * @returns A recorder whose `handler` records into `calls`
 */
export function createRecorder<TArgs extends readonly unknown[]>(): TestRecorderInterface<TArgs> {
	const calls: TArgs[] = []
	return {
		get calls() {
			return calls
		},
		get count() {
			return calls.length
		},
		handler(...args: TArgs) {
			calls.push(args)
		},
		clear() {
			calls.length = 0
		},
	}
}

/**
 * Run `thunk` and return the value it threw, or `undefined` if it returned normally — the
 * one shared form of the `try { …; return undefined } catch (error) { return error }` IIFE
 * the error-path tests repeat (AGENTS §16.1). Lets a caller assert on the captured fault
 * unconditionally, never inside a conditional `expect`. For a synchronous throw site; an
 * async rejection is asserted with `await expect(…).rejects` instead.
 *
 * @param thunk - The (synchronous) operation to run and capture the throw of
 * @returns The thrown value, or `undefined` when `thunk` did not throw
 */
export function captureError(thunk: () => unknown): unknown {
	const result = attempt(thunk)
	return result.success ? undefined : result.error
}

/** Parse generated package-manifest text into the record shape tests inspect. */
export function readManifest(content: string | undefined): Record<string, unknown> {
	const parsed = parseJSON(content ?? '{}')
	if (!isRecord(parsed)) throw new Error('expected package.json to parse to a JSON object')
	return parsed
}

/** Require an unknown generated JSON field to be a record. */
export function readRecord(value: unknown): Record<string, unknown> {
	if (!isRecord(value)) throw new Error('expected a JSON object')
	return value
}

/** Build the implementation stub paths emitted for one surface. */
export function buildSurfaceStubPaths(surface: Surface, pascal = 'Router'): readonly string[] {
	return [
		`src/${surface}/types.ts`,
		`src/${surface}/${pascal}.ts`,
		`src/${surface}/factories.ts`,
		`src/${surface}/index.ts`,
	]
}

/** Build the test paths emitted for one surface. */
export function buildSurfaceTestPaths(surface: Surface, pascal = 'Router'): readonly string[] {
	return [`tests/src/${surface}/${pascal}.test.ts`, `tests/src/${surface}/factories.test.ts`]
}

/** Build a complete sync-report fixture with focused overrides. */
export function buildSyncReport(overrides?: Partial<SyncReport>, target = '.'): SyncReport {
	return {
		target,
		guides: [],
		versions: [],
		clean: true,
		failed: 0,
		...overrides,
	}
}

/** Build a populated sync report for guard and parser boundary tests. */
export function buildPopulatedSyncReport(
	overrides?: Partial<SyncReport>,
	target = '.',
): SyncReport {
	return buildSyncReport(
		{
			guides: [
				{
					name: '@orkestrel/contract',
					path: 'guides/src/contract.md',
					content: '# contract',
					freshness: 'current',
				},
			],
			versions: [
				{
					name: '@orkestrel/contract',
					range: '^0.0.5',
					latest: '0.0.5',
					freshness: 'current',
				},
			],
			...overrides,
		},
		target,
	)
}
