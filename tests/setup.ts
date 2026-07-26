import type { Environment, Plan, SyncReport } from '@src/core'
import { attempt, isRecord, parseJSON } from '@orkestrel/contract'
import {
	artifactShape,
	blueprint,
	blueprintShape,
	dependencyShape,
	memberShape,
	overrideShape,
	planShape,
	syncReportShape,
} from '@src/core'

/** Return the exact distinct canonical plans that share the documented 32-bit pin. */
export function collisionPlans(): readonly [Plan, Plan] {
	return [
		{
			blueprint: blueprint('x', { description: 'ld72wp13ky550' }),
			groups: [],
			artifacts: [],
		},
		{
			blueprint: blueprint('x', { description: '1ll8cflf8mf8c' }),
			groups: [],
			artifacts: [],
		},
	]
}

/** Published-source environment matrices exercised by compiler generation tests. */
export const SOURCE_VARIANTS: readonly {
	readonly label: string
	readonly src: readonly Environment[]
}[] = Object.freeze([
	Object.freeze({ label: 'core-only', src: Object.freeze<Environment[]>(['core']) }),
	Object.freeze({
		label: 'core+server',
		src: Object.freeze<Environment[]>(['core', 'server']),
	}),
	Object.freeze({
		label: 'core+browser',
		src: Object.freeze<Environment[]>(['core', 'browser']),
	}),
	Object.freeze({
		label: 'core+browser+server',
		src: Object.freeze<Environment[]>(['core', 'browser', 'server']),
	}),
	Object.freeze({ label: 'server-only', src: Object.freeze<Environment[]>(['server']) }),
	Object.freeze({ label: 'browser-only', src: Object.freeze<Environment[]>(['browser']) }),
])

/** Private-application environment matrices exercised by compiler generation tests. */
export const APPLICATION_VARIANTS: readonly {
	readonly label: string
	readonly app: readonly Environment[]
}[] = Object.freeze([
	Object.freeze({ label: 'core', app: Object.freeze<Environment[]>(['core']) }),
	Object.freeze({ label: 'browser', app: Object.freeze<Environment[]>(['browser']) }),
	Object.freeze({ label: 'server', app: Object.freeze<Environment[]>(['server']) }),
	Object.freeze({
		label: 'core+browser',
		app: Object.freeze<Environment[]>(['core', 'browser']),
	}),
	Object.freeze({
		label: 'core+server',
		app: Object.freeze<Environment[]>(['core', 'server']),
	}),
	Object.freeze({
		label: 'core+browser+server',
		app: Object.freeze<Environment[]>(['core', 'browser', 'server']),
	}),
])

/** App-only and mixed workspace matrices exercised by compiler generation tests. */
export const WORKSPACE_VARIANTS: readonly {
	readonly label: string
	readonly src: readonly Environment[]
}[] = Object.freeze([
	Object.freeze({ label: 'app-only', src: Object.freeze<Environment[]>([]) }),
	Object.freeze({ label: 'mixed', src: Object.freeze<Environment[]>(['core']) }),
])

/** Every contract-shape factory whose schema and guard remain in lockstep. */
export const CONTRACT_SHAPES = Object.freeze({
	dependency: dependencyShape,
	override: overrideShape,
	member: memberShape,
	artifact: artifactShape,
	blueprint: blueprintShape,
	plan: planShape,
	syncReport: syncReportShape,
})

/** Contract-shape factories that support deterministic value generation. */
export const GENERATABLE_CONTRACT_SHAPES = Object.freeze({
	dependency: dependencyShape,
	override: overrideShape,
	member: memberShape,
	artifact: artifactShape,
	blueprint: blueprintShape,
	plan: planShape,
})

/** Required top-level fields in every generated published-source manifest fixture. */
export const SOURCE_MANIFEST_FIELDS: readonly string[] = Object.freeze([
	'name',
	'version',
	'description',
	'keywords',
	'homepage',
	'bugs',
	'license',
	'repository',
	'files',
	'type',
	'sideEffects',
	'main',
	'module',
	'exports',
	'publishConfig',
	'scripts',
	'devDependencies',
	'engines',
])

/** Required aggregate script keys in every generated published-source manifest fixture. */
export const SOURCE_SCRIPT_KEYS: readonly string[] = Object.freeze([
	'clean',
	'copy',
	'scaffold',
	'check',
	'check:src',
	'format',
	'format:check',
	'lint:check',
	'test',
	'test:src',
	'test:guides',
	'build',
	'build:src',
	'prepublishOnly',
])

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

/** Build the implementation stub paths emitted for one environment. */
export function buildEnvironmentStubPaths(
	environment: Environment,
	pascal = 'Router',
): readonly string[] {
	return [
		`src/${environment}/types.ts`,
		`src/${environment}/${pascal}.ts`,
		`src/${environment}/factories.ts`,
		`src/${environment}/index.ts`,
	]
}

/** Build the test paths emitted for one environment. */
export function buildEnvironmentTestPaths(
	environment: Environment,
	pascal = 'Router',
): readonly string[] {
	return [
		`tests/src/${environment}/${pascal}.test.ts`,
		`tests/src/${environment}/factories.test.ts`,
	]
}

/** Whether a repository-relative Vue SFC path belongs to the private browser application. */
export function isBrowserVuePath(path: string): boolean {
	const normalized = path.replaceAll('\\', '/')
	return normalized.startsWith('app/browser/')
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

/** Build a hostile data-property graph that yields a fresh record at every traversed node. */
export function buildGenerativeDataProxy(): object {
	const handler: ProxyHandler<object> = {
		ownKeys: () => ['next'],
		getOwnPropertyDescriptor: () => ({
			configurable: true,
			enumerable: true,
			value: new Proxy({}, handler),
			writable: true,
		}),
	}
	return new Proxy({}, handler)
}
