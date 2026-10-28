import { captureError, createRecorder, readProperty } from '@orkestrel/test'
import type { EmitterHooks } from '@orkestrel/emitter'
import type {
	Audit,
	Blueprint,
	CatalogEntry,
	CompilerEventMap,
	CompilerOptions,
	ContentArtifact,
	Dependency,
	Environment,
	Finding,
	Group,
	HostArtifact,
	HydratedArtifact,
	ManifestScript,
	Mirror,
	Override,
	Ownership,
	Plan,
	Question,
	Release,
	Scaffolding,
	Snapshot,
} from '@src/core'
import { VERB_OPTIONS, VERBS } from '../src/bin/constants.js'
import {
	APP_BROWSER_DEV_DEPENDENCIES,
	APP_DEV_DEPENDENCIES,
	APP_SERVER_DEV_DEPENDENCIES,
	BASE_DEV_DEPENDENCIES,
	BROWSE_DEV_DEPENDENCIES,
	DECLARATION_DEV_DEPENDENCIES,
	FRAMEWORK_MATRIX,
	SHOWCASE_DEV_DEPENDENCIES,
	SOURCE_BROWSER_DEV_DEPENDENCIES,
	STYLES_DEV_DEPENDENCIES,
	artifactToHex,
	blueprintToConfigArtifacts,
	blueprintToSourceArtifacts,
	blueprintToTestArtifacts,
	createBlueprint,
	bytesToHex,
	compareVersions,
	computeBytes,
	computeHash,
	contentToHex,
	DEFAULT_ENGINES,
	DEFAULT_VERSION,
	extractVersion,
	HOST_PATHS,
	inferDrift,
	inferGroup,
	isArtifact,
	isAudit,
	isBlueprint,
	isCatalogEntry,
	isCollection,
	isCompilerHooks,
	isCompilerOptions,
	isContent,
	isDependency,
	isDependencyName,
	isEnvironment,
	isFinding,
	isGroup,
	isGroups,
	isHex,
	isManifestScript,
	isMirror,
	isOverride,
	isPath,
	isPlan,
	isQuestion,
	isSnapshot,
	manifestToDependencies,
	manifestToName,
	matchesEngines,
	matchesOrchestrationPath,
	matchesRange,
	MAX_COLLECTION_ITEMS,
	MAX_PATH_LENGTH,
	nameToGuide,
	parseBlueprint,
	parseCompilerOptions,
	parseGroups,
	parseSnapshot,
	planToSummary,
	PRINT_WIDTH,
	RELEASE_PROOF_COMMAND,
	selectGroups,
	selectHostPaths,
	TAB_WIDTH,
} from '@src/core'

/**
 * Describes one adversarial value every total guard, parser, and cloner must survive.
 *
 * @remarks
 * `owned` records whether `cloneValue` can take ownership of the value. A
 * hostile value is not automatically unclonable: a null-prototype record and a
 * proxy whose `get` trap throws both carry exact data behind their hostility,
 * and the cloner reads descriptors rather than accessors, so it owns them.
 */
export interface TestHostileCase {
	readonly label: string
	readonly value: unknown
	readonly owned: boolean
}

/**
 * Describes one guard under test, with what it must accept and what it may admit.
 *
 * @remarks
 * `admits` names the hostile labels this guard answers `true` for. It is the
 * table's only escape hatch, and every entry in it is a deliberate reading of
 * the guard's own contract rather than a tolerated surprise.
 */
export interface TestGuardCase {
	readonly name: string
	readonly guard: (value: unknown) => boolean
	readonly accepted: readonly unknown[]
	readonly admits: readonly string[]
}

/** Describes one coercer under test, beside the guard it is derived from. */
export interface TestParserCase {
	readonly name: string
	readonly parse: (value: unknown) => unknown
	readonly guard: (value: unknown) => boolean
	readonly accepted: readonly unknown[]
	readonly refused: readonly unknown[]
}

/** Describes one candidate path the portable-path law decides. */
export interface TestPathCase {
	readonly label: string
	readonly path: string
	readonly accepted: boolean
}

/**
 * Describes one value carrying a key its union branch forbids, beside its sound twin.
 *
 * @remarks
 * The records differ by exactly one key, which the suite checks, so a
 * refusal can only be caused by the key under test.
 */
export interface TestUnionCase {
	readonly label: string
	readonly guard: (value: unknown) => boolean
	readonly accepted: Record<string, unknown>
	readonly refused: Record<string, unknown>
}

/** Describes one helper call whose determinism and input independence are measured. */
export interface TestPurityCase {
	readonly helper: string
	readonly call: () => unknown
	readonly inputs: readonly unknown[]
}

/** Describes one declared range measured against a reported version. */
export interface TestRangeCase {
	readonly range: string
	readonly latest: string
	readonly satisfied: boolean
}

/**
 * Describes an instance whose prototype the hostile matrix severs.
 *
 * @remarks
 * Constructed rather than written as a record, so the reparented case measures
 * a real class instance with a broken prototype chain instead of a plain object.
 */
export class TestSample {
	readonly hostile = 'x'
}

/**
 * Builds a valid inert blueprint, with focused field replacements.
 *
 * @param fields - The blueprint fields to replace on the returned value.
 * @returns A blueprint carrying the requested fields over minimal defaults.
 *
 * @remarks
 * The defaults are the smallest workspace the gate accepts: one published core
 * environment, no application environment, no dependencies, and no structural
 * extras. `version` and `engines` come from the constants the source declares,
 * so a change there reaches every test rather than drifting against a literal
 * copied here. A caller that needs an invalid blueprint replaces the one field
 * under test and leaves the rest sound.
 *
 * @example
 * ```ts
 * buildBlueprint({ src: ['core', 'server'], bin: true, setup: ['node'] })
 * ```
 */
export function buildBlueprint(fields?: Partial<Blueprint>): Blueprint {
	return {
		name: 'sample',
		keywords: [],
		src: ['core'],
		app: [],
		extensions: [],
		styles: false,
		themes: false,
		dependencies: [],
		peers: [],
		extras: [],
		version: DEFAULT_VERSION,
		engines: DEFAULT_ENGINES,
		overrides: [],
		bin: false,
		setup: [],
		guides: false,
		integration: false,
		conformance: false,
		tree: false,
		service: false,
		vendors: [],
		studies: false,
		global: false,
		showcase: false,
		journey: false,
		skills: false,
		...fields,
	}
}

/** Lists dispatch-build byte pins for selections without a tree proof. */
export const TREE_EMISSION_CASES: ReadonlyArray<{
	readonly fields: Partial<Blueprint>
	readonly vite: string
	readonly scripts: string
}> = Object.freeze([
	{
		fields: { src: ['core'] },
		vite: 'bcfd6d3a4b4723163df9156683f44cc1f2cc13844e14e3553cd078223fa9d616',
		scripts: 'ce1206f9568601061d7d19fb69f8381b007118ae8ced98c139bac182ed0f9ee7',
	},
	{
		fields: { src: [], app: ['server'] },
		vite: 'b9a54ba26fa003fddc2ca1ba1204f7396f1dbc9de85f1cae21e62089db15bd41',
		scripts: '4c07423deacb5eaa8ee362e1dcf7a0d180c2f22113461714bc8211894acec2f1',
	},
	{
		fields: {
			src: ['core', 'browser', 'server'],
			app: ['browser'],
			styles: true,
			themes: true,
			setup: ['node', 'browser'],
			guides: true,
			integration: true,
			conformance: true,
			service: true,
			studies: true,
			global: true,
			journey: true,
			skills: true,
		},
		vite: 'aa78e22e3699276b498654b25149e5a0a49848ed9765ebb491ef8e8ae33bbe3d',
		scripts: 'cfb282751af709e58e7e59889517bd9960a14ca212adc09379b6bc793fc25851',
	},
])

/**
 * Builds a list with holes, which an array literal cannot express.
 *
 * @remarks
 * The list is sized first and then written once per index, so every other index stays a hole. A
 * `for…of` loop and a spread visit a hole as `undefined`, where `map`, `filter`, `flatMap`, `some`,
 * `every`, and `reduce` skip it, so a caller-supplied list built here separates a loop from the
 * method that replaced it.
 *
 * @param length - The length of the list, holes included.
 * @param entries - The entry to write at each index.
 * @returns The sparse list.
 *
 * @example
 * ```ts
 * buildSparse(3, new Map([[1, 'b']])) // a list of length 3 whose indexes 0 and 2 are absent
 * ```
 */
export function buildSparse<T>(length: number, entries: ReadonlyMap<number, T>): T[] {
	const list: T[] = []
	list.length = length
	for (const [index, entry] of entries) list[index] = entry
	return list
}

/**
 * Builds a list that holds one entry and a hole after it.
 *
 * @remarks
 * The entry comes first, so a read that stops at the entry, as a `findIndex` or a search does,
 * never reaches the hole, where a `for…of` loop does. A case built here separates the two.
 *
 * @param entry - The entry at index 0.
 * @returns A list of length 2 whose index 1 is absent.
 *
 * @example
 * ```ts
 * buildTrailingHole('a') // a list of length 2 holding 'a' and a hole
 * ```
 */
export function buildTrailingHole<T>(entry: T): T[] {
	return buildSparse(2, new Map([[0, entry]]))
}

/**
 * Describes a list whose entries are getters, and the indexes those getters have run for.
 *
 * @remarks
 * `reads` lists one index per getter run, in the order the runs happened, so a case sees which
 * entries a reader touched and how often. It copies on every access.
 */
export interface TestObservedList<T> {
	readonly list: T[]
	readonly reads: readonly number[]
}

/**
 * Creates a list whose entries are getters, so a reader's every read of an entry is recorded.
 *
 * @param length - The length of the list, holes included.
 * @param entries - The producer behind each getter, by index; every other index stays a hole.
 * @returns The list and the reads it records.
 *
 * @remarks
 * A getter reports its index and then produces its value, which may throw, so a case sees which
 * entries a reader touched before it stopped. An iterator reads an entry once as it yields it, where
 * a copy of the list reads every entry before the reader sees the first.
 *
 * @example
 * ```ts
 * const observed = createObservedList(2, new Map([[1, () => 'b']]))
 * observed.list[1] // 'b'
 * observed.reads // [1]
 * ```
 */
export function createObservedList<T>(
	length: number,
	entries: ReadonlyMap<number, () => T>,
): TestObservedList<T> {
	const recorder = createRecorder<readonly [number]>()
	const list = buildSparse<T>(length, new Map())
	for (const [index, produce] of entries) {
		Object.defineProperty(list, index, {
			configurable: true,
			enumerable: true,
			get() {
				recorder.handler(index)
				return produce()
			},
		})
	}
	return {
		list,
		get reads() {
			return recorder.calls.map(([index]) => index)
		},
	}
}

/**
 * Describes a list whose entries and iterator record every call made on them, in one ordered log.
 *
 * @remarks
 * `calls` holds `get:<index>` for each read of an entry, `iter` for each iterator the list serves,
 * `next` for each step, and `return` for each close, in the order they happened. It copies on every
 * access, so an earlier answer never changes.
 */
export interface TestClosableList<T> {
	readonly list: T[]
	readonly calls: readonly string[]
}

/**
 * Configures how the iterator of a closable list answers a close and a further request.
 *
 * @remarks
 * `close` produces what `return()` answers, so a case can make a close raise or answer a value that
 * is not an iterator result. `serves` caps how many iterators the list hands out before the next
 * request raises a `RangeError`, so a case can end a reader between two of its passes.
 */
export interface TestClosableOptions {
	readonly close?: () => unknown
	readonly serves?: number
}

/**
 * Creates a list whose iterator records each step and each close beside the reads of its entries.
 *
 * @param length - The length of the list, holes included.
 * @param entries - The producer behind each entry, by index; every other index stays a hole.
 * @param options - How the iterator answers a close and a further request. Default: it closes
 * cleanly and serves every request.
 * @returns The list and the ordered calls made on it.
 *
 * @remarks
 * A `for…of` loop closes its iterator when it stops early or when its body throws, and never when
 * the iterator ends. The iterator yields each entry through the same getter an index read uses, so
 * one log orders the reads of a reader that mixes both against the steps and the closes.
 *
 * @example
 * ```ts
 * const closable = createClosableList(1, new Map([[0, () => 'a']]))
 * for (const entry of closable.list) break
 * closable.calls // ['iter', 'next', 'get:0', 'return']
 * ```
 */
export function createClosableList<T>(
	length: number,
	entries: ReadonlyMap<number, () => T>,
	options: TestClosableOptions = {},
): TestClosableList<T> {
	const { close, serves = Infinity } = options
	const recorder = createRecorder<readonly [string]>()
	const observed = createObservedList(
		length,
		new Map(
			Iterator.from(entries)
				.map(([index, produce]): [number, () => T] => [
					index,
					() => {
						recorder.handler(`get:${String(index)}`)
						return produce()
					},
				])
				.toArray(),
		),
	)
	Object.defineProperty(observed.list, Symbol.iterator, {
		configurable: true,
		value: () => {
			recorder.handler('iter')
			if (recorder.calls.filter(([call]) => call === 'iter').length > serves) {
				throw new RangeError('The list serves no further iterator')
			}
			const cursor = observed.list.keys()
			return {
				next: () => {
					recorder.handler('next')
					const step = cursor.next()
					return step.done ? step : { done: false, value: observed.list[step.value] }
				},
				return: () => {
					recorder.handler('return')
					return close === undefined ? { done: true, value: undefined } : close()
				},
			}
		},
	})
	return {
		list: observed.list,
		get calls() {
			return recorder.calls.map(([call]) => call)
		},
	}
}

/**
 * Creates a list whose iterator serves the entries a case names, whatever the list holds itself.
 *
 * @param base - The entries the list holds, which its `length` and its indexes read.
 * @param served - The entries its replaced iterator yields, in order, before it reports done.
 * @returns The list and the ordered calls made on its iterator.
 *
 * @remarks
 * A `for…of` loop reads the entries the iterator yields, however long the list says it is, where an
 * index loop reads `base`. A case therefore gives the iterator more entries than `base` holds, fewer,
 * or the same entries in another order, and reads which of the two a reader followed. `calls` holds
 * `iter` for each iterator the list serves, `next` for each step, and `return` for each close, in the
 * order they happened, and copies on every access. The entries come from `served`, not from the
 * list, so the log holds no `get:<index>`; a case that orders reads of the list's own entries uses
 * `createClosableList`. The iterator closes cleanly, and it hands every pass the one cursor over
 * `served`, so a second pass resumes where the first stopped.
 *
 * @example
 * ```ts
 * const served = createServedList([1, 2, 3], [9])
 * Array.from(served.list) // [9]
 * served.calls // ['iter', 'next', 'next']
 * ```
 */
export function createServedList<T>(base: readonly T[], served: readonly T[]): TestClosableList<T> {
	const recorder = createRecorder<readonly [string]>()
	const cursor = served.values()
	const list = Object.defineProperty([...base], Symbol.iterator, {
		value: () => {
			recorder.handler('iter')
			return {
				next: () => {
					recorder.handler('next')
					return cursor.next()
				},
				return: () => {
					recorder.handler('return')
					return { done: true, value: undefined }
				},
			}
		},
	})
	return {
		list,
		get calls() {
			return recorder.calls.map(([call]) => call)
		},
	}
}

/**
 * Throws the error a getter raises when its entry refuses to be read.
 *
 * @returns Never.
 * @throws RangeError - Thrown when called.
 */
export function refuseRead(): never {
	throw new RangeError('The entry refused its read')
}

/** Names the lists a lazy reader is run over, each of length two. */
export type TestReadShape =
	| 'hole-before-entry'
	| 'hole-before-refusal'
	| 'refusal-before-entry'
	| 'dense-pair'
	| 'missing-iterator'

/** Holds what one reader did over one list: the constructor it raised, and the entries it read. */
export interface TestReadResult {
	readonly outcome: string
	readonly reads: readonly number[]
}

/**
 * Creates the producer of an object a reader fails on once it holds it.
 *
 * @param entry - The producer of an object the reader accepts.
 * @returns A producer of that object revoked, whose every property read raises a `TypeError`.
 */
export function refuseObject<T extends object>(entry: () => T): () => T {
	return () => {
		const { proxy, revoke } = Proxy.revocable(entry(), {})
		revoke()
		return proxy
	}
}

/** Holds a value no text reader accepts, which a case feeds a reader that expects text. */
export const REFUSED_VALUES = Object.freeze({ symbol: Symbol('refused') })

/**
 * Produces a symbol where a reader expects text, so the reader fails once it holds the entry.
 *
 * @returns The symbol, typed as the text the reader expects.
 */
export function refuseText<T extends string = string>(): T {
	// The property read answers the claimed type, so a value the signature refuses reaches the reader.
	return readProperty<T>(REFUSED_VALUES, 'symbol')
}

/**
 * Runs a reader over one recorded list of two entries and reports what it did.
 *
 * @param shape - The list to run over: a hole before an entry, a hole before a getter that fails, a
 * value the reader refuses before an entry, two entries, or two entries whose list has no iterator.
 * @param entry - The producer of every entry the reader accepts.
 * @param run - The reader, called with the list.
 * @param refusal - The producer of a value the reader fails on once it holds it.
 * @returns `return` or the constructor name the reader raised, and the indexes it read in order.
 *
 * @remarks
 * A `for…of` loop reads one entry, works on it, and stops at the first failure, where a copy of the
 * list reads every entry first. The reads therefore separate a reader that consumes one entry at a
 * time from one that reads ahead, and the constructor separates a hole from the failure behind it.
 * A list whose `Symbol.iterator` is `undefined` is one a loop refuses with a `TypeError`, where
 * `Array.from` and `values()` fall back to the indexes, so that shape separates a reader that takes
 * the iterator protocol from one that does not.
 *
 * @example
 * ```ts
 * readLazily('hole-before-entry', () => 'b', (list) => list.map((entry) => entry.length), refuseText)
 * // { outcome: 'return', reads: [1] }
 * ```
 */
export function readLazily<T>(
	shape: TestReadShape,
	entry: () => T,
	run: (list: T[]) => unknown,
	refusal: () => T,
): TestReadResult {
	const entries: ReadonlyMap<TestReadShape, ReadonlyMap<number, () => T>> = new Map([
		['hole-before-entry', new Map([[1, entry]])],
		['hole-before-refusal', new Map([[1, refuseRead]])],
		[
			'refusal-before-entry',
			new Map([
				[0, refusal],
				[1, entry],
			]),
		],
		[
			'dense-pair',
			new Map([
				[0, entry],
				[1, entry],
			]),
		],
		[
			'missing-iterator',
			new Map([
				[0, entry],
				[1, entry],
			]),
		],
	])
	const observed = createObservedList(2, entries.get(shape) ?? new Map())
	if (shape === 'missing-iterator') {
		Object.defineProperty(observed.list, Symbol.iterator, { value: undefined })
	}
	const error = captureError(() => run(observed.list))
	return {
		outcome:
			error === undefined
				? 'return'
				: error instanceof Error
					? error.constructor.name
					: typeof error,
		reads: observed.reads,
	}
}

/**
 * Describes one reader run over each recorded list, with the result each list must show.
 *
 * @remarks
 * `hole` is a hole before an entry, `refused` is a hole before a getter that fails, `refusal` is a
 * value the reader fails on before an entry, and `dense` is two entries.
 */
export interface TestLazyCase {
	readonly label: string
	readonly read: (shape: TestReadShape) => TestReadResult
	readonly hole: TestReadResult
	readonly refused: TestReadResult
	readonly refusal: TestReadResult
	readonly dense: TestReadResult
}

/**
 * Builds one lazy-reader case, with focused result replacements.
 *
 * @param label - The text naming the reader and the list it reads.
 * @param read - The reader, run over the list a shape names.
 * @param fields - The results to replace on the returned case.
 * @returns A case whose defaults are a refusal of the hole, at the hole and at the entry behind it
 * alike, with no entry read, a refusal of the first entry after one read, and a return after one
 * read of each entry in order.
 */
export function buildLazyCase(
	label: string,
	read: (shape: TestReadShape) => TestReadResult,
	fields?: Partial<Omit<TestLazyCase, 'label' | 'read'>>,
): TestLazyCase {
	return {
		label,
		read,
		hole: { outcome: 'TypeError', reads: [] },
		refused: { outcome: 'TypeError', reads: [] },
		refusal: { outcome: 'TypeError', reads: [0] },
		dense: { outcome: 'return', reads: [0, 1] },
		...fields,
	}
}

/**
 * Describes one reader run over a list that has no iterator, with the entries it may read first.
 *
 * @remarks
 * `reads` lists the indexes the reader reads, in order, before it takes the iterator and is refused.
 */
export interface TestMissingCase {
	readonly label: string
	readonly read: () => TestReadResult
	readonly reads: readonly number[]
}

/**
 * Builds one case that runs a reader over a list whose `Symbol.iterator` is `undefined`.
 *
 * @param label - The text naming the reader and the list it reads.
 * @param entry - The producer of the two entries the list holds.
 * @param run - The reader, called with the list.
 * @param reads - The indexes the reader reads before it takes the iterator. Default: none.
 * @returns A case whose result must be a `TypeError` after exactly those reads.
 *
 * @example
 * ```ts
 * buildMissingCase('the names a reader lists', () => 'a', (names) => listNames(names)).reads // []
 * ```
 */
export function buildMissingCase<T>(
	label: string,
	entry: () => T,
	run: (list: T[]) => unknown,
	reads: readonly number[] = [],
): TestMissingCase {
	return { label, reads, read: () => readLazily('missing-iterator', entry, run, entry) }
}

/**
 * Throws the error an iterator raises when it is closed.
 *
 * @returns Never.
 * @throws EvalError - Thrown when called.
 */
export function refuseClose(): never {
	throw new EvalError('close')
}

/**
 * Creates a producer that builds one fixture anew, over the same replacements, on each call.
 *
 * @param build - The builder of the fixture.
 * @param fields - The replacements handed to the builder on each call.
 * @returns A producer of a fresh fixture.
 *
 * @example
 * ```ts
 * createProducer(buildDependency, { name: 'vue', range: '^3.5.0' })().name // 'vue'
 * ```
 */
export function createProducer<F, T>(build: (fields?: F) => T, fields: F): () => T {
	return () => build(fields)
}

/**
 * Creates a list whose iterator yields the one value for ever.
 *
 * @param value - The value every step yields.
 * @returns A list a reader can take only as far as it chooses to stop.
 */
export function createEndlessList<T>(value: T): Iterable<T> {
	return {
		*[Symbol.iterator]() {
			for (;;) yield value
		},
	}
}

/**
 * Doubles a number, as the answer a reader keeps for each value it is given.
 *
 * @param value - The number to double.
 * @returns Twice the number.
 */
export function doubleValue(value: number): number {
	return value * 2
}

/**
 * Builds the entry a length reader accepts.
 *
 * @returns An object whose length is one.
 */
export function buildLengthEntry(): { readonly length: number } {
	return { length: 1 }
}

/**
 * Reads the length of each entry through the iterator the list names, one entry at a time.
 *
 * @param list - The list of entries to read.
 * @returns The length of each entry, in order.
 */
export function readLengthsByIterator(list: Array<{ readonly length: number }>): number[] {
	return Iterator.from(list)
		.map((item) => item.length)
		.toArray()
}

/**
 * Reads the length of each entry through the index methods, which skip a hole and need no iterator.
 *
 * @param list - The list of entries to read.
 * @returns The length of each entry, in order.
 */
export function readLengthsByIndex(list: Array<{ readonly length: number }>): number[] {
	return list.map((item) => item.length)
}

/**
 * Builds the result of a reader that returned without reading an entry.
 *
 * @returns A `return` outcome with no reads.
 */
export function buildReturnResult(): TestReadResult {
	return { outcome: 'return', reads: [] }
}

/**
 * Lists the paths of one file set whose bytes another file set does not share.
 *
 * @param base - The file set whose paths are read.
 * @param other - The file set measured against it.
 * @returns The paths of the base set, in order, that the other set lacks or carries different bytes for.
 */
export function listDifferingPaths(
	base: Readonly<Record<string, string>>,
	other: Readonly<Record<string, string>>,
): readonly string[] {
	return Object.keys(base).filter((path) => other[path] !== base[path])
}

/**
 * Builds a found catalog entry for a package that depends on nothing.
 *
 * @returns A found entry with no dependencies and no peers.
 */
export function buildCatalogEntry(): CatalogEntry {
	return {
		name: '@orkestrel/free',
		lookup: 'found',
		version: '1.0.0',
		dependencies: [],
		peers: [],
	}
}

/**
 * Builds a found release of a package whose declared range already names the latest version.
 *
 * @returns A found release.
 */
export function buildRelease(): Release {
	return { name: 'vite', range: '^8.2.2', lookup: 'found', latest: '8.2.2' }
}

/**
 * Builds a valid inert runtime dependency, with focused field replacements.
 *
 * @param fields - The dependency fields to replace on the returned value.
 * @returns A dependency carrying the requested fields over minimal defaults.
 */
export function buildDependency(fields?: Partial<Dependency>): Dependency {
	return { name: '@orkestrel/emitter', range: '^0.0.5', ...fields }
}

/**
 * Builds a valid inert manifest script, with focused field replacements.
 *
 * @param fields - The script fields to replace on the returned value.
 * @returns A script carrying the requested fields over minimal defaults.
 */
export function buildManifestScript(fields?: Partial<ManifestScript>): ManifestScript {
	return { name: 'test', command: 'vitest run', accepted: ['vitest'], ...fields }
}

/**
 * Builds a valid inert artifact override, with focused field replacements.
 *
 * @param fields - The override fields to replace on the returned value.
 * @returns An override carrying the requested fields over minimal defaults.
 */
export function buildOverride(fields?: Partial<Override>): Override {
	return { path: 'README.md', content: '# Sample\n', ...fields }
}

/**
 * Builds a valid inert question, with focused field replacements.
 *
 * @param fields - The question fields to replace on the returned value.
 * @returns A question carrying the requested fields over minimal defaults.
 */
export function buildQuestion(fields?: Partial<Question>): Question {
	return { field: 'src', message: 'Unknown environment', blocking: true, ...fields }
}

/**
 * Builds a planned host artifact whose bytes have not been read.
 *
 * @param fields - The artifact fields to replace on the returned value.
 * @returns A host artifact carrying the requested fields over minimal defaults.
 */
export function buildHostArtifact(fields?: Partial<HostArtifact>): HostArtifact {
	return { path: 'AGENTS.md', group: 'docs', ownership: 'presence', origin: 'host', ...fields }
}

/**
 * Builds a planned host artifact whose vendored bytes have been read.
 *
 * @param fields - The artifact fields to replace on the returned value.
 * @returns A hydrated artifact carrying the requested fields over minimal defaults.
 */
export function buildHydratedArtifact(fields?: Partial<HydratedArtifact>): HydratedArtifact {
	return {
		path: 'LICENSE',
		group: 'docs',
		ownership: 'content',
		origin: 'host',
		hex: contentToHex('MIT\n'),
		...fields,
	}
}

/**
 * Builds a planned artifact whose text this package produces.
 *
 * @param fields - The artifact fields to replace on the returned value.
 * @returns A content artifact carrying the requested fields over minimal defaults.
 */
export function buildContentArtifact(fields?: Partial<ContentArtifact>): ContentArtifact {
	return {
		path: 'README.md',
		group: 'docs',
		ownership: 'content',
		origin: 'computed',
		content: '# Sample\n',
		...fields,
	}
}

/**
 * Builds a valid inert plan, with focused field replacements.
 *
 * @param fields - The plan fields to replace on the returned value.
 * @returns A plan carrying the requested fields over minimal defaults.
 */
export function buildPlan(fields?: Partial<Plan>): Plan {
	return {
		blueprint: buildBlueprint(),
		groups: ['manifest'],
		artifacts: [buildContentArtifact()],
		...fields,
	}
}

/**
 * Builds a valid inert target snapshot.
 *
 * @returns One path keyed to the exact hexadecimal bytes of its content.
 */
export function buildSnapshot(): Snapshot {
	return { 'AGENTS.md': contentToHex('# Agents\n') }
}

/**
 * Builds a valid inert finding against a destination that holds no file.
 *
 * @returns A missing finding, the one branch that records no observed bytes.
 */
export function buildFinding(): Finding {
	return { path: 'AGENTS.md', group: 'docs', ownership: 'content', drift: 'missing' }
}

/**
 * Builds a valid inert audit carrying one finding and one question.
 *
 * @returns An audit over a single missing destination.
 */
export function buildAudit(): Audit {
	return { findings: [buildFinding()], questions: [buildQuestion()] }
}

/**
 * Builds the compiler's initial listener record.
 *
 * @returns A hooks record wiring one real listener to the `compile` event.
 */
export function buildHooks(): EmitterHooks<CompilerEventMap> {
	return { compile: createRecorder<readonly [Scaffolding]>().handler }
}

/**
 * Builds a valid inert compiler option bag.
 *
 * @returns Options carrying the hooks record and no error handler.
 */
export function buildCompilerOptions(): CompilerOptions {
	return { on: buildHooks() }
}

/** Holds the trap table whose key enumeration throws. */
export const THROWING_KEYS_TRAP: ProxyHandler<object> = {
	ownKeys() {
		throw new Error('ownKeys trap')
	},
}

/** Holds the trap table whose property read throws. */
export const THROWING_GET_TRAP: ProxyHandler<object> = {
	get() {
		throw new Error('get trap')
	},
}

/** Holds the trap table whose prototype read throws. */
export const THROWING_PROTOTYPE_TRAP: ProxyHandler<object> = {
	getPrototypeOf() {
		throw new Error('getPrototypeOf trap')
	},
}

/** Holds the descriptor that installs a throwing accessor over a guarded property. */
export const THROWING_ACCESSOR_DESCRIPTOR: PropertyDescriptor = {
	enumerable: true,
	configurable: true,
	get() {
		throw new Error('accessor')
	},
}

/** Holds the descriptor that installs an accessor answering a value a guard would accept. */
export const BENIGN_ACCESSOR_DESCRIPTOR: PropertyDescriptor = {
	enumerable: true,
	configurable: true,
	get() {
		return 'sample'
	},
}

/**
 * Lists every name the emitted `configs/browsers.ts` publishes, in emission order.
 *
 * @remarks
 * The emitted root configuration reaches `resolveBrowser` and
 * `resolvePinnedBrowser`, and the rest are the precedence ladder those are built
 * from. A generated workspace owns the
 * file, so the whole surface is stated here and compared against the module a
 * runtime actually loaded rather than against the template text.
 */
export const BROWSER_RESOLVER_EXPORTS: readonly string[] = Object.freeze([
	'CHROMIUM_LAYOUTS',
	'CHROMIUM_ENTRY_PATTERN',
	'CHROMIUM_REVISION_PATTERN',
	'BUNDLED_BROWSERS_ROOT',
	'BUNDLED_CHROMIUM_LAYOUTS',
	'SYSTEM_BROWSER_CHANNELS',
	'isBrowserExecutable',
	'compareRevisions',
	'resolvePinnedBrowser',
	'resolveManagedBrowser',
	'resolveBundledBrowser',
	'resolveSystemBrowser',
	'resolveBrowser',
])

/** Holds a package manifest declaring one fleet package per section, and one foreign name. */
export const MANIFEST_SAMPLE =
	'{"name":"@orkestrel/sample","dependencies":{"@orkestrel/emitter":"^0.0.5","vite":"~8.2.0"},"devDependencies":{"@orkestrel/emitter":"^9.9.9","@orkestrel/guide":"^0.0.9"}}'

/**
 * Builds the adversarial values every total boundary in this package must survive.
 *
 * @returns One case per hostile construction, freshly built.
 *
 * @remarks
 * Every value is built through a variable rather than written at the call site,
 * because a fresh object literal passed to a typed position is measured by
 * TypeScript's excess-property check instead of by the runtime law under test.
 * Each call rebuilds them, so one test's read of a revoked proxy or a cyclic
 * record cannot reach another's.
 */
export function buildHostileCases(): readonly TestHostileCase[] {
	const cyclic: Record<string, unknown> = { hostile: 'x' }
	cyclic.self = cyclic
	const nullPrototype: Record<string, unknown> = Object.create(null)
	nullPrototype.hostile = 'x'
	const reparented: unknown = Object.setPrototypeOf(new TestSample(), null)
	const revocable = Proxy.revocable({ hostile: 'x' }, {})
	revocable.revoke()
	const accessor: Record<string, unknown> = { ...buildBlueprint() }
	Object.defineProperty(accessor, 'name', THROWING_ACCESSOR_DESCRIPTOR)
	const sparse: unknown[] = ['manifest']
	sparse.length = 3
	const oversized: readonly string[] = Array.from(
		{ length: MAX_COLLECTION_ITEMS + 1 },
		() => 'manifest',
	)
	return [
		{ label: 'cyclic record', value: cyclic, owned: false },
		{ label: 'null-prototype record', value: nullPrototype, owned: true },
		{ label: 'reparented instance', value: reparented, owned: true },
		{ label: 'revoked proxy', value: revocable.proxy, owned: false },
		{
			label: 'throwing ownKeys proxy',
			value: new Proxy({ hostile: 'x' }, THROWING_KEYS_TRAP),
			owned: false,
		},
		{
			label: 'throwing get proxy',
			value: new Proxy({ hostile: 'x' }, THROWING_GET_TRAP),
			owned: true,
		},
		{
			label: 'throwing getPrototypeOf proxy',
			value: new Proxy({ hostile: 'x' }, THROWING_PROTOTYPE_TRAP),
			owned: false,
		},
		{ label: 'throwing accessor', value: accessor, owned: false },
		{ label: 'sparse array', value: sparse, owned: false },
		// The item ceiling is a guard law over one public collection, not a clone law:
		// the cloner's own node ceiling is far above it, so ownership is taken here.
		{ label: 'oversized array', value: oversized, owned: true },
	]
}

/**
 * Selects one hostile case by its label.
 *
 * @param label - The case label to select.
 * @returns The freshly built case.
 * @throws When no case carries that label.
 */
export function selectHostileCase(label: string): TestHostileCase {
	const hostile = buildHostileCases().find((candidate) => candidate.label === label)
	if (hostile === undefined) throw new Error(`No hostile case is labelled ${label}`)
	return hostile
}

/**
 * Counts a value's own enumerable keys without containing a hostile read.
 *
 * @param value - The value to read.
 * @returns The number of own enumerable string keys.
 * @throws Whatever a hostile value's reflective operation throws.
 *
 * @remarks
 * The negative control for the hostile matrix, drawn from outside the
 * population that matrix covers: this is a naive reader rather than a total
 * guard, so it must fail exactly where a total guard must not. A matrix whose
 * control never fails has measured nothing.
 */
export function readKeyCount(value: unknown): number {
	return Object.keys(Object(value)).length
}

/**
 * Builds every guard this package publishes, with what each must accept.
 *
 * @returns One case per guard, freshly built.
 */
export function buildGuardCases(): readonly TestGuardCase[] {
	const alignedFinding: Finding = {
		path: 'AGENTS.md',
		group: 'docs',
		ownership: 'birth',
		drift: 'aligned',
	}
	const staleFinding: Finding = {
		path: 'AGENTS.md',
		group: 'docs',
		ownership: 'content',
		drift: 'stale',
		observed: contentToHex('# Stale\n'),
	}
	const foreignFinding: Finding = {
		path: 'notes.txt',
		group: 'configs',
		drift: 'foreign',
		observed: contentToHex('notes\n'),
	}
	const foundMirror: Mirror = {
		name: '@orkestrel/router',
		path: 'guides/router.md',
		lookup: 'found',
		content: '# Router\n',
	}
	const failedMirror: Mirror = {
		name: '@orkestrel/router',
		path: 'guides/router.md',
		lookup: 'failed',
		note: 'The registry did not answer.',
	}
	const foundEntry: CatalogEntry = {
		name: '@orkestrel/router',
		lookup: 'found',
		version: '0.0.8',
		dependencies: [],
		peers: [],
	}
	const missingEntry: CatalogEntry = {
		name: '@orkestrel/router',
		lookup: 'missing',
		note: 'The package is not published.',
	}
	return [
		{
			name: 'isPath',
			guard: isPath,
			accepted: ['configs/src/tsconfig.core.json', '.mcp.json', 'a'.repeat(MAX_PATH_LENGTH)],
			admits: [],
		},
		{ name: 'isHex', guard: isHex, accepted: ['68690a', ''], admits: [] },
		{ name: 'isContent', guard: isContent, accepted: ['# Title\n', ''], admits: [] },
		{
			name: 'isCollection',
			guard: isCollection,
			accepted: [[], ['manifest'], Array.from({ length: MAX_COLLECTION_ITEMS }, () => 'manifest')],
			// A hole reads as `undefined`, which the composed element guard refuses; the
			// count law this guard states is satisfied by a sparse array.
			admits: ['sparse array'],
		},
		{
			name: 'isEnvironment',
			guard: isEnvironment,
			accepted: ['core', 'browser', 'server'],
			admits: [],
		},
		{ name: 'isGroup', guard: isGroup, accepted: ['manifest', 'orchestration'], admits: [] },
		{ name: 'isGroups', guard: isGroups, accepted: [[], ['manifest', 'configs']], admits: [] },
		{
			name: 'isDependencyName',
			guard: isDependencyName,
			accepted: ['@orkestrel/router', '@orkestrel/a'],
			admits: [],
		},
		{
			name: 'isDependency',
			guard: isDependency,
			accepted: [buildDependency(), buildDependency({ optional: true })],
			admits: [],
		},
		{
			name: 'isManifestScript',
			guard: isManifestScript,
			accepted: [
				{ name: 'test', command: 'vitest run', accepted: [] },
				{ name: 'prepublishOnly', command: 'npm test', accepted: ['npm run test'] },
			],
			admits: [],
		},
		{ name: 'isOverride', guard: isOverride, accepted: [buildOverride()], admits: [] },
		{
			name: 'isBlueprint',
			guard: isBlueprint,
			accepted: [
				buildBlueprint(),
				buildBlueprint({ description: 'A sample workspace.' }),
				buildBlueprint({ tree: true }),
			],
			admits: [],
		},
		{
			name: 'isArtifact',
			guard: isArtifact,
			accepted: [buildHostArtifact(), buildHydratedArtifact(), buildContentArtifact()],
			admits: [],
		},
		{
			name: 'isPlan',
			guard: isPlan,
			accepted: [buildPlan(), buildPlan({ hash: computeHash('sample') })],
			admits: [],
		},
		{
			name: 'isQuestion',
			guard: isQuestion,
			accepted: [buildQuestion(), buildQuestion({ candidates: ['core', 'browser', 'server'] })],
			admits: [],
		},
		{
			name: 'isFinding',
			guard: isFinding,
			accepted: [buildFinding(), alignedFinding, staleFinding, foreignFinding],
			admits: [],
		},
		{ name: 'isAudit', guard: isAudit, accepted: [buildAudit()], admits: [] },
		{ name: 'isMirror', guard: isMirror, accepted: [foundMirror, failedMirror], admits: [] },
		{
			name: 'isCatalogEntry',
			guard: isCatalogEntry,
			accepted: [foundEntry, missingEntry],
			admits: [],
		},
		{ name: 'isSnapshot', guard: isSnapshot, accepted: [buildSnapshot(), {}], admits: [] },
		{ name: 'isCompilerHooks', guard: isCompilerHooks, accepted: [buildHooks(), {}], admits: [] },
		{
			name: 'isCompilerOptions',
			guard: isCompilerOptions,
			accepted: [buildCompilerOptions(), {}],
			admits: [],
		},
	]
}

/**
 * Builds every coercer this package publishes, beside the guard it derives from.
 *
 * @returns One case per parser, freshly built.
 */
export function buildParserCases(): readonly TestParserCase[] {
	return [
		{
			name: 'parseBlueprint',
			parse: parseBlueprint,
			guard: isBlueprint,
			accepted: [
				buildBlueprint(),
				buildBlueprint({ description: 'A sample workspace.' }),
				buildBlueprint({ tree: true }),
			],
			refused: [
				buildBlueprint({ name: '' }),
				{ name: 'sample' },
				undefined,
				'sample',
				{ ...buildBlueprint(), tree: undefined },
				{ ...buildBlueprint(), tree: 'true' },
				Object.fromEntries(Object.entries(buildBlueprint()).filter(([key]) => key !== 'tree')),
			],
		},
		{
			name: 'parseGroups',
			parse: parseGroups,
			guard: isGroups,
			accepted: [[], ['manifest', 'configs'], ['tests', 'manifest', 'tests']],
			refused: [['readme'], 'manifest', undefined],
		},
		{
			name: 'parseSnapshot',
			parse: parseSnapshot,
			guard: isSnapshot,
			accepted: [{}, buildSnapshot()],
			refused: [{ 'AGENTS.md': 'hi' }, { '../secrets': '68690a' }, undefined],
		},
		{
			name: 'parseCompilerOptions',
			parse: parseCompilerOptions,
			guard: isCompilerOptions,
			accepted: [{}, buildCompilerOptions()],
			refused: [{ on: { compiled: () => {} } }, { retries: 2 }, undefined],
		},
	]
}

/**
 * Builds the values whose sole defect is one key a union branch forbids.
 *
 * @returns One case per forbidden key, each paired with its sound twin.
 */
export function buildUnionCases(): readonly TestUnionCase[] {
	const hostArtifact: Record<string, unknown> = { ...buildHostArtifact() }
	const hydratedArtifact: Record<string, unknown> = { ...buildHydratedArtifact() }
	const contentArtifact: Record<string, unknown> = { ...buildContentArtifact() }
	const missingFinding: Record<string, unknown> = { ...buildFinding() }
	const foreignFinding: Record<string, unknown> = {
		path: 'notes.txt',
		group: 'configs',
		drift: 'foreign',
		observed: contentToHex('notes\n'),
	}
	const foundEntry: Record<string, unknown> = {
		name: '@orkestrel/router',
		lookup: 'found',
		version: '0.0.8',
		dependencies: [],
		peers: [],
	}
	const foundMirror: Record<string, unknown> = {
		name: '@orkestrel/router',
		path: 'guides/router.md',
		lookup: 'found',
		content: '# Router\n',
	}
	const missingMirror: Record<string, unknown> = {
		name: '@orkestrel/router',
		path: 'guides/router.md',
		lookup: 'missing',
		note: 'The package is not published.',
	}
	const hooks: Record<string, unknown> = { ...buildHooks() }
	const options: Record<string, unknown> = { ...buildCompilerOptions() }
	return [
		{
			label: 'host artifact carrying content',
			guard: isArtifact,
			accepted: hostArtifact,
			refused: { ...hostArtifact, content: '# Sample\n' },
		},
		{
			label: 'host artifact claiming byte ownership it cannot back',
			guard: isArtifact,
			accepted: hostArtifact,
			refused: { ...hostArtifact, ownership: 'content' },
		},
		{
			label: 'hydrated artifact carrying content',
			guard: isArtifact,
			accepted: hydratedArtifact,
			refused: { ...hydratedArtifact, content: '# Sample\n' },
		},
		{
			label: 'computed artifact carrying hex',
			guard: isArtifact,
			accepted: contentArtifact,
			refused: { ...contentArtifact, hex: contentToHex('# Sample\n') },
		},
		{
			label: 'missing finding carrying observed',
			guard: isFinding,
			accepted: missingFinding,
			refused: { ...missingFinding, observed: contentToHex('# Stale\n') },
		},
		{
			label: 'stale finding without observed',
			guard: isFinding,
			accepted: missingFinding,
			refused: { ...missingFinding, drift: 'stale' },
		},
		{
			label: 'foreign finding carrying ownership',
			guard: isFinding,
			accepted: foreignFinding,
			refused: { ...foreignFinding, ownership: 'content' },
		},
		{
			label: 'found catalog entry carrying a note',
			guard: isCatalogEntry,
			accepted: foundEntry,
			refused: { ...foundEntry, note: 'The registry did not answer.' },
		},
		{
			label: 'found mirror carrying a note',
			guard: isMirror,
			accepted: foundMirror,
			refused: { ...foundMirror, note: 'The registry did not answer.' },
		},
		{
			label: 'missing mirror carrying content',
			guard: isMirror,
			accepted: missingMirror,
			refused: { ...missingMirror, content: '# Router\n' },
		},
		{
			label: 'hooks carrying a misspelled event',
			guard: isCompilerHooks,
			accepted: hooks,
			refused: { ...hooks, compiled: createRecorder<readonly [Scaffolding]>().handler },
		},
		{
			label: 'options carrying an unknown key',
			guard: isCompilerOptions,
			accepted: options,
			refused: { ...options, retries: 2 },
		},
	]
}

/**
 * Builds one call of every helper this package publishes.
 *
 * @returns One case per helper, each freshly built with the inputs it reads.
 *
 * @remarks
 * `inputs` are the caller-owned values the call passes, so a suite can prove
 * the helper left every one of them exactly as it found it.
 */
export function buildPurityCases(): readonly TestPurityCase[] {
	const bytes = new Uint8Array([0x68, 0x69, 0x0a])
	const paths = [...HOST_PATHS]
	const groups: Group[] = ['tests', 'manifest', 'tests']
	const artifact = buildContentArtifact()
	const plan = buildPlan({
		artifacts: [buildHostArtifact(), buildHydratedArtifact(), buildContentArtifact()],
	})
	return [
		{ helper: 'bytesToHex', call: () => bytesToHex(bytes), inputs: [bytes] },
		{ helper: 'contentToHex', call: () => contentToHex('hi\n'), inputs: [] },
		{ helper: 'computeBytes', call: () => computeBytes('hi €😀\n'), inputs: [] },
		{ helper: 'computeHash', call: () => computeHash('scaffold'), inputs: [] },
		{
			helper: 'matchesOrchestrationPath',
			call: () => matchesOrchestrationPath('.claude/rules/names.md'),
			inputs: [],
		},
		{ helper: 'inferGroup', call: () => inferGroup('src/core/index.ts'), inputs: [] },
		{ helper: 'nameToGuide', call: () => nameToGuide('@orkestrel/router'), inputs: [] },
		{
			helper: 'selectHostPaths',
			call: () => selectHostPaths(paths, 'scaffold'),
			inputs: [paths],
		},
		{ helper: 'selectGroups', call: () => selectGroups(groups), inputs: [groups] },
		{ helper: 'artifactToHex', call: () => artifactToHex(artifact), inputs: [artifact] },
		{
			helper: 'inferDrift',
			call: () => inferDrift(artifact, contentToHex('# Sample\n')),
			inputs: [artifact],
		},
		{ helper: 'planToSummary', call: () => planToSummary(plan), inputs: [plan] },
		{ helper: 'extractVersion', call: () => extractVersion('1.2.3'), inputs: [] },
		{ helper: 'compareVersions', call: () => compareVersions('0.0.9', '0.0.10'), inputs: [] },
		{ helper: 'matchesRange', call: () => matchesRange('^0.5.3', '0.5.4'), inputs: [] },
		{ helper: 'matchesEngines', call: () => matchesEngines(DEFAULT_ENGINES), inputs: [] },
		{ helper: 'manifestToName', call: () => manifestToName(MANIFEST_SAMPLE), inputs: [] },
		{
			helper: 'manifestToDependencies',
			call: () => manifestToDependencies(MANIFEST_SAMPLE),
			inputs: [],
		},
	]
}

/** Lists every candidate the portable-path law decides, with the verdict it owes. */
export const PATH_CASES: readonly TestPathCase[] = [
	{ label: 'parent traversal', path: '../secrets', accepted: false },
	{ label: 'nested parent traversal', path: 'configs/../../secrets', accepted: false },
	{ label: 'leading slash', path: '/etc/passwd', accepted: false },
	{ label: 'empty segment', path: 'configs//vite.config.ts', accepted: false },
	{ label: 'trailing slash', path: 'configs/', accepted: false },
	{ label: 'single dot segment', path: './configs/vite.config.ts', accepted: false },
	{ label: 'bare dot', path: '.', accepted: false },
	{ label: 'backslash', path: 'configs\\vite.config.ts', accepted: false },
	{ label: 'drive colon', path: 'C:/configs/vite.config.ts', accepted: false },
	{ label: 'ASCII control character', path: 'configs/\u0007vite.config.ts', accepted: false },
	{ label: 'empty string', path: '', accepted: false },
	{
		label: 'one over the length ceiling',
		path: `${'a'.repeat(MAX_PATH_LENGTH)}b`,
		accepted: false,
	},
	{ label: 'at the length ceiling', path: 'a'.repeat(MAX_PATH_LENGTH), accepted: true },
	{ label: 'nested configuration file', path: 'configs/src/tsconfig.core.json', accepted: true },
	{ label: 'root dotfile', path: '.oxlintrc.json', accepted: true },
	{ label: 'dotted directory', path: '.claude/rules/names.md', accepted: true },
]

/** Lists native diagnostic filenames whose characters and directory context must survive. */
export const POLICY_FILENAMES: readonly string[] = Object.freeze([
	'src/plain.ts',
	'src/space name.ts',
	'src/percent%name.ts',
	'src/hash#name.ts',
	'src/Unicode-雪.ts',
	'src/literal%20name.ts',
])

/** Lists every declared range measured against a reported version, with the verdict it owes. */
export const RANGE_CASES: readonly TestRangeCase[] = [
	{ range: '^0.0.5', latest: '0.0.5', satisfied: true },
	{ range: '^0.0.5', latest: '0.0.7', satisfied: false },
	{ range: '^0.0.5', latest: '0.0.4', satisfied: false },
	{ range: '^0.5.3', latest: '0.5.3', satisfied: true },
	{ range: '^0.5.3', latest: '0.5.4', satisfied: true },
	{ range: '^0.5.3', latest: '0.6.0', satisfied: false },
	{ range: '^0.5.3', latest: '0.5.2', satisfied: false },
	{ range: '^7.58.12', latest: '7.60.0', satisfied: true },
	{ range: '^7.58.12', latest: '8.0.0', satisfied: false },
	{ range: '^7.58.12', latest: '7.58.11', satisfied: false },
	{ range: '~8.2.0', latest: '8.2.0', satisfied: true },
	{ range: '~8.2.0', latest: '8.2.4', satisfied: true },
	{ range: '~8.2.0', latest: '8.3.0', satisfied: false },
	{ range: '~0.0.5', latest: '0.0.7', satisfied: true },
	{ range: '1.2.3', latest: '1.2.3', satisfied: true },
	{ range: '1.2.3', latest: '1.2.4', satisfied: false },
	{ range: '1.2.3-beta.1', latest: '1.2.3-beta.1', satisfied: true },
	{ range: '1.2.3-beta.1', latest: '1.2.3-beta.2', satisfied: false },
	{ range: '^1.2.3-beta.1', latest: '1.2.3-beta.1', satisfied: true },
	{ range: '^1.2.3-beta.1', latest: '1.2.3-beta.2', satisfied: false },
	{ range: '^1.2.3', latest: '1.2.3-beta.1', satisfied: false },
	{ range: '>=1.2.3', latest: '1.2.3', satisfied: false },
	{ range: '^1.2', latest: '1.2.3', satisfied: false },
	{ range: '^01.2.3', latest: '1.2.3', satisfied: false },
	{ range: 'not-a-range', latest: '1.2.3', satisfied: false },
	{ range: 'not-a-range', latest: 'not-a-range', satisfied: false },
	{ range: '', latest: '', satisfied: false },
	{ range: '>=1.2.3', latest: '>=1.2.3', satisfied: false },
	{ range: '^1.2', latest: '1.2', satisfied: false },
	{ range: '^01.2.3', latest: '01.2.3', satisfied: false },
]

/**
 * Holds a manifest with every dependency section, for the insertion proofs.
 */
export const INSERTION_MANIFEST = `{
	"name": "@orkestrel/sample",
	"dependencies": {
		"@orkestrel/emitter": "^0.0.5"
	},
	"devDependencies": {
		"@microsoft/api-extractor": "^7.59.3",
		"@orkestrel/contract": "^0.0.18",
		"typescript": "^6.0.3"
	},
	"peerDependencies": {
		"@orkestrel/browser": ">=0.0.1"
	}
}
`

/**
 * Holds a manifest whose scripts section the writable script proofs read.
 */
export const SCRIPT_MANIFEST = `{
	"name": "@orkestrel/sample",
	"description": "Kept exactly as written, punctuation and all.",
	"scripts": {
		"test": "vitest run",
		"prepublishOnly": "npm test"
	},
	"dependencies": {
		"@orkestrel/emitter": "^0.0.5"
	}
}
`

/**
 * Holds the scripts section of the script manifest, byte for byte.
 */
export const SCRIPT_SECTION = `"scripts": {
		"test": "vitest run",
		"prepublishOnly": "npm test"
	}`

/**
 * Holds the distribution proof script a region carries beside the release command.
 */
export const SCRIPT_PROOF: ManifestScript = {
	name: 'test:distribution',
	command: 'vitest run --project distribution',
	accepted: [],
}

/**
 * Holds the writable script region the release command and the distribution proof form.
 */
export const SCRIPT_REGION: readonly ManifestScript[] = [
	{
		name: 'prepublishOnly',
		command: `npm test && ${RELEASE_PROOF_COMMAND}`,
		accepted: ['npm test'],
	},
	SCRIPT_PROOF,
]

/**
 * Names the package-owned guides entry the workspace runs.
 *
 * The package-owned entry is driven as the process a workspace runs. The synthetic
 * guides project collects its observation at a separate path, so it never replaces
 * the entry's Guide behavior.
 */
export const ENTRY_PATH = 'tests/guides.test.ts'

/**
 * Names the path the synthetic guides project collects its observation at.
 */
export const ENTRY_OBSERVATION_PATH = 'tests/fixture.test.ts'

/**
 * Holds the manifest of the entry workspace, which declares the guides script.
 */
export const ENTRY_MANIFEST = [
	'{',
	'\t"name": "@sample/widget",',
	'\t"private": true,',
	'\t"type": "module",',
	'\t"scripts": {',
	'\t\t"test:guides": "node --experimental-strip-types tests/guides.test.ts"',
	'\t}',
	'}',
	'',
].join('\n')

/**
 * Holds the README of the entry workspace, whose pitch equals the guide tagline.
 */
export const ENTRY_README = [
	'# Widget',
	'',
	'> A widget toolkit the sample workspace publishes.',
	'',
].join('\n')

/**
 * Holds a README whose pitch differs from the guide tagline.
 *
 * The pair the entry reports and never writes: the README pitch against the
 * guide tagline. Ruling 6 keeps the README authored by hand.
 */
export const ENTRY_PITCH = [
	'# Widget',
	'',
	'> A widget kit the sample workspace publishes.',
	'',
].join('\n')

/**
 * Holds the guide index that names the widget guide.
 */
export const ENTRY_INDEX = [
	'# Guides',
	'',
	'## By concept',
	'',
	'| Concept | Spec | Source | Tests |',
	'| --- | --- | --- | --- |',
	'| Widget | [`widget.md`](widget.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |',
	'',
].join('\n')

/**
 * Holds the source barrel of the entry workspace.
 */
export const ENTRY_BARREL = ["export * from './widget.js'", ''].join('\n')

/**
 * Holds the widget guide whose summaries and example disagree with the source.
 *
 * Surface and Methods cells and a titled fence, each planted against
 * the source beneath. Every other byte of this file is what a write must leave.
 */
export const ENTRY_GUIDE = [
	'# Widget',
	'',
	'> A widget toolkit the sample workspace publishes.',
	'',
	'## Surface',
	'',
	'| Name | Kind | Summary |',
	'| --- | --- | --- |',
	'| `shape` | function | Shapes a widget from its parts. |',
	'| `Widget` | interface | One widget the workspace renders. |',
	'',
	'## Methods',
	'',
	'#### `Widget`',
	'',
	'| Method | Summary |',
	'| --- | --- |',
	'| `paint` | Paints the widget onto the surface. |',
	'',
	'## Examples',
	'',
	'### Shape a widget',
	'',
	'```ts',
	"shape('round')",
	'```',
	'',
	'## Tests',
	'',
	'- [`tests/src/core/widget.test.ts`](../tests/src/core/widget.test.ts)',
	'',
].join('\n')

/**
 * Holds the widget guide a write toward the guide must produce.
 *
 * What `--to guide` owes: the planted cells carrying the source text and
 * every other byte of `ENTRY_GUIDE` unmoved. A sampled reading cannot see a row
 * the table re-render drops, a heading it disturbs, or padding it re-aligns,
 * which is the class the claim exists to catch, so the write is compared whole.
 */
export const ENTRY_GUIDE_WRITTEN = [
	'# Widget',
	'',
	'> A widget toolkit the sample workspace publishes.',
	'',
	'## Surface',
	'',
	'| Name | Kind | Summary |',
	'| --- | --- | --- |',
	'| `shape` | function | Shapes a widget from the parts it is given. |',
	'| `Widget` | interface | One widget the workspace renders. |',
	'',
	'## Methods',
	'',
	'#### `Widget`',
	'',
	'| Method | Summary |',
	'| --- | --- |',
	'| `paint` | Paints the widget onto the frame. |',
	'',
	'## Examples',
	'',
	'### Shape a widget',
	'',
	'```ts',
	"shape('square')",
	'```',
	'',
	'## Tests',
	'',
	'- [`tests/src/core/widget.test.ts`](../tests/src/core/widget.test.ts)',
	'',
].join('\n')

/**
 * Holds the widget source the guide is compared against.
 */
export const ENTRY_SOURCE = [
	'/**',
	' * Shapes a widget from the parts it is given.',
	' *',
	' * @param parts - The parts to shape.',
	' * @returns The shaped widget.',
	' *',
	' * @example Shape a widget',
	' * ```ts',
	" * shape('square')",
	' * ```',
	' */',
	'export function shape(parts: string): string {',
	'\treturn parts',
	'}',
	'',
	'/** One widget the workspace renders. */',
	'export interface Widget {',
	'\t/** Paints the widget onto the frame. */',
	'\tpaint(): void',
	'}',
	'',
].join('\n')

/**
 * Holds the guide of the reported workspace.
 *
 * The reported workspace: every summary and example already agrees, the guide
 * documents one export carrying no doc block, and the pitch differs. Neither
 * disagreement has a side a write can take.
 */
export const ENTRY_REPORTED_GUIDE = [
	'# Widget',
	'',
	'> A widget toolkit the sample workspace publishes.',
	'',
	'## Surface',
	'',
	'| Name | Kind | Summary |',
	'| --- | --- | --- |',
	'| `shape` | function | Shapes a widget from the parts it is given. |',
	'| `measure` | function | Measures a widget against the frame it fills. |',
	'| `Widget` | interface | One widget the workspace renders. |',
	'',
	'## Methods',
	'',
	'#### `Widget`',
	'',
	'| Method | Summary |',
	'| --- | --- |',
	'| `paint` | Paints the widget onto the frame. |',
	'',
	'## Tests',
	'',
	'- [`tests/src/core/widget.test.ts`](../tests/src/core/widget.test.ts)',
	'',
].join('\n')

/**
 * Holds an export that carries no doc block.
 */
export const ENTRY_UNDOCUMENTED = [
	'',
	'export function measure(parts: string): number {',
	'\treturn parts.length',
	'}',
	'',
].join('\n')

/**
 * Maps each file of the entry workspace to its text.
 */
export const ENTRY_FILES: Readonly<Record<string, string>> = Object.freeze({
	'package.json': ENTRY_MANIFEST,
	'README.md': ENTRY_README,
	'guides/README.md': ENTRY_INDEX,
	'guides/widget.md': ENTRY_GUIDE,
	'src/core/index.ts': ENTRY_BARREL,
	'src/core/widget.ts': ENTRY_SOURCE,
})

/**
 * Holds the Vitest configuration that collects the synthetic guides project.
 */
export const ENTRY_VITE = [
	"import { defineConfig } from 'vitest/config'",
	'',
	'export default defineConfig({',
	'\ttest: {',
	'\t\tprojects: [',
	'\t\t\t{',
	"\t\t\t\ttest: { name: { label: 'guides', color: 'green' }, include: ['tests/fixture.test.ts'], environment: 'node' },",
	'\t\t\t},',
	'\t\t],',
	'\t},',
	'})',
	'',
].join('\n')

/**
 * Holds the configuration that collects the authored entry instead of the observation.
 */
export const ENTRY_AUTHORED_VITE = ENTRY_VITE.replace(ENTRY_OBSERVATION_PATH, ENTRY_PATH)

/**
 * Holds an authored guides project that registers its own worker callback.
 */
export const ENTRY_AUTHORED_TEST = [
	"import { GuideCommand } from '@orkestrel/guide/server'",
	"import { readInventory } from '@orkestrel/test/server'",
	"import { createVitest } from 'vitest/node'",
	'',
	'await new GuideCommand({',
	"\troot: new URL('../', import.meta.url),",
	"\tpatterns: ['src/**/*.ts', 'tests/**/*.ts', 'guides/*.md', '*.md'],",
	"\tmodules: { '@sample/widget': 'src/core' },",
	"\tlanguages: ['ts'],",
	"\tlanguage: 'ts',",
	'\treader: readInventory,',
	'\trunner: createVitest,',
	'}).execute(async ({ report }) => {',
	"\tconst { expect, it } = await import('vitest')",
	'',
	"\tit('runs the authored worker callback', () => {",
	'\t\texpect(report.input).toEqual([])',
	'\t})',
	'})',
	'',
].join('\n')

/**
 * Holds a guides project whose one case passes.
 */
export const ENTRY_PASSING_TEST = [
	"import { expect, it } from 'vitest'",
	'',
	"it('runs the generated guides project', () => {",
	'\texpect(true).toBe(true)',
	'})',
	'',
].join('\n')

/**
 * Holds a guides project that reads source bytes written before Vitest starts.
 */
export const ENTRY_FRESH_TEST = [
	"import { readFileSync } from 'node:fs'",
	"import { resolve } from 'node:path'",
	"import { expect, it } from 'vitest'",
	'',
	"const source = readFileSync(resolve('src/core/widget.ts'), 'utf8')",
	'',
	"it('reads source bytes written before Vitest starts', () => {",
	"\texpect(source).toContain(' * Shapes a widget from its parts.')",
	'})',
	'',
].join('\n')

/**
 * Holds a guides project whose one case fails.
 */
export const ENTRY_FAILING_TEST = [
	"import { expect, it } from 'vitest'",
	'',
	"it('propagates a guides-project failure', () => {",
	"\texpect('failed').toBe('passed')",
	'})',
	'',
].join('\n')

/**
 * Holds a guides project that records its startup on disk.
 */
export const ENTRY_START_TEST = [
	"import { writeFileSync } from 'node:fs'",
	"import { expect, it } from 'vitest'",
	'',
	"writeFileSync('vitest-started', 'started\\n', 'utf8')",
	'',
	"it('records project startup', () => {",
	'\texpect(true).toBe(true)',
	'})',
	'',
].join('\n')

/**
 * Holds a guides project that passes while reporting an unhandled error.
 */
export const ENTRY_UNHANDLED_TEST = [
	"import { expect, it } from 'vitest'",
	'',
	"Promise.reject(new Error('unhandled guides error'))",
	'',
	"it('passes while the project reports an unhandled error', () => {",
	'\texpect(true).toBe(true)',
	'})',
	'',
].join('\n')

/**
 * Maps the files of the reported workspace, where the pitch and the source disagree.
 */
export const ENTRY_REPORTED: Readonly<Record<string, string>> = Object.freeze({
	...ENTRY_FILES,
	'README.md': ENTRY_PITCH,
	'guides/widget.md': ENTRY_REPORTED_GUIDE,
	'src/core/widget.ts': `${ENTRY_SOURCE}${ENTRY_UNDOCUMENTED}`,
})

/**
 * Holds a manifest that declares no name.
 *
 * A manifest declaring no `name`, so native own-guide selection finds no package
 * guide: the standing drift still prints, and no pitch line ever joins it.
 */
export const ENTRY_NAMELESS_MANIFEST = [
	'{',
	'\t"private": true,',
	'\t"type": "module",',
	'\t"scripts": {',
	'\t\t"test:guides": "node --experimental-strip-types tests/guides.test.ts"',
	'\t}',
	'}',
	'',
].join('\n')

/**
 * Maps the files of the reported workspace under a manifest that declares no name.
 */
export const ENTRY_NAMELESS: Readonly<Record<string, string>> = Object.freeze({
	...ENTRY_REPORTED,
	'package.json': ENTRY_NAMELESS_MANIFEST,
})

/**
 * Holds a guide index that names a guide under a spec other than the workspace's own.
 *
 * The index the whole run reads from, naming a guide under a spec other than
 * this workspace's own: the manifest still names `widget`, but no row's `spec`
 * is `guides/widget.md`, so native own-guide selection finds nothing and the
 * pitch block never runs even though the manifest names one.
 */
export const ENTRY_UNOWNED_INDEX = [
	'# Guides',
	'',
	'## By concept',
	'',
	'| Concept | Spec | Source | Tests |',
	'| --- | --- | --- | --- |',
	'| Widget | [`component.md`](component.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |',
	'',
].join('\n')

/**
 * Maps the files of a workspace whose index names no guide of its own.
 */
export const ENTRY_UNOWNED: Readonly<Record<string, string>> = Object.freeze({
	'package.json': ENTRY_MANIFEST,
	'README.md': ENTRY_PITCH,
	'guides/README.md': ENTRY_UNOWNED_INDEX,
	'guides/component.md': ENTRY_REPORTED_GUIDE,
	'src/core/index.ts': ENTRY_BARREL,
	'src/core/widget.ts': `${ENTRY_SOURCE}${ENTRY_UNDOCUMENTED}`,
})

/**
 * Holds the guide index of the overlapping workspace.
 *
 * The overlapping workspace: a parent row over `src/core` and a child row over
 * `src/core/panels`, each documenting one declaration of the same source file.
 * A module scope selects every file beneath it, so each row reaches
 * `src/core/panels/panel.ts`, and a run that seeds its texts per row from the
 * frozen inventory writes that file once per row and keeps the later rewrite
 * alone.
 */
export const ENTRY_OVERLAP_INDEX = [
	'# Guides',
	'',
	'## By concept',
	'',
	'| Concept | Spec | Source | Tests |',
	'| --- | --- | --- | --- |',
	'| Widget | [`widget.md`](widget.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |',
	'| Panel | [`panel.md`](panel.md) | [`src/core/panels`](../src/core/panels) | [`tests/src/core/panels`](../tests/src/core/panels) |',
	'',
].join('\n')

/**
 * Holds the guide of the parent row over `src/core`.
 */
export const ENTRY_OVERLAP_PARENT = [
	'# Widget',
	'',
	'> A widget toolkit the sample workspace publishes.',
	'',
	'## Surface',
	'',
	'| Name | Kind | Summary |',
	'| --- | --- | --- |',
	'| `frame` | function | Frames a widget for the panel. |',
	'',
	'## Tests',
	'',
	'- [`tests/src/core/panels/panel.test.ts`](../tests/src/core/panels/panel.test.ts)',
	'',
].join('\n')

/**
 * Holds the guide of the child row over `src/core/panels`.
 *
 * A third row duplicating the parent's `frame` declaration with the parent's
 * cell text byte-identical: after the parent row's rewrite, the child row's
 * rewrite of that same block is a no-op, which is the shape that exercises
 * the written-count no-op limb.
 */
export const ENTRY_OVERLAP_CHILD = [
	'# Panel',
	'',
	'> A panel the widget toolkit renders into.',
	'',
	'## Surface',
	'',
	'| Name | Kind | Summary |',
	'| --- | --- | --- |',
	'| `paint` | function | Paints the panel onto the frame. |',
	'| `frame` | function | Frames a widget for the panel. |',
	'',
	'## Tests',
	'',
	'- [`tests/src/core/panels/panel.test.ts`](../tests/src/core/panels/panel.test.ts)',
	'',
].join('\n')

/**
 * Holds the panel source both overlapping rows document.
 */
export const ENTRY_OVERLAP_SOURCE = [
	'/**',
	' * Frames a widget for the panel it sits in.',
	' *',
	' * @param widget - The widget to frame.',
	' * @returns The framed widget.',
	' */',
	'export function frame(widget: string): string {',
	'\treturn widget',
	'}',
	'',
	'/**',
	' * Paints the panel onto the frame it was given.',
	' *',
	' * @param panel - The panel to paint.',
	' * @returns The painted panel.',
	' */',
	'export function paint(panel: string): string {',
	'\treturn panel',
	'}',
	'',
].join('\n')

/**
 * Holds the panel source after both overlapping rows have written.
 */
export const ENTRY_OVERLAP_WRITTEN = [
	'/**',
	' * Frames a widget for the panel.',
	' *',
	' * @param widget - The widget to frame.',
	' * @returns The framed widget.',
	' */',
	'export function frame(widget: string): string {',
	'\treturn widget',
	'}',
	'',
	'/**',
	' * Paints the panel onto the frame.',
	' *',
	' * @param panel - The panel to paint.',
	' * @returns The painted panel.',
	' */',
	'export function paint(panel: string): string {',
	'\treturn panel',
	'}',
	'',
].join('\n')

/**
 * Maps the files of the overlapping workspace.
 */
export const ENTRY_OVERLAP: Readonly<Record<string, string>> = Object.freeze({
	'package.json': ENTRY_MANIFEST,
	'README.md': ENTRY_README,
	'guides/README.md': ENTRY_OVERLAP_INDEX,
	'guides/widget.md': ENTRY_OVERLAP_PARENT,
	'guides/panel.md': ENTRY_OVERLAP_CHILD,
	'src/core/index.ts': ["export * from './panels/index.js'", ''].join('\n'),
	'src/core/panels/index.ts': ["export * from './panel.js'", ''].join('\n'),
	'src/core/panels/panel.ts': ENTRY_OVERLAP_SOURCE,
})

/**
 * Maps the files of a workspace that carries no guide index.
 *
 * The index the whole run reads from, absent.
 */
export const ENTRY_UNINDEXED: Readonly<Record<string, string>> = Object.freeze(
	Object.fromEntries(Object.entries(ENTRY_FILES).filter(([path]) => path !== 'guides/README.md')),
)

/**
 * Maps the files of a workspace whose index row names a guide it does not carry.
 *
 * An index row naming a guide the workspace does not carry.
 */
export const ENTRY_UNCARRIED: Readonly<Record<string, string>> = Object.freeze({
	...ENTRY_FILES,
	'guides/README.md': [
		ENTRY_INDEX.trimEnd(),
		'| Panel | [`panel.md`](panel.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |',
		'',
	].join('\n'),
})

/**
 * Holds the time in milliseconds one entry run may take.
 *
 * Two child runs of the guides entry take about 4.2 s on an idle host, which leaves the 5 s
 * default no margin under load.
 */
export const ENTRY_RUN_TIMEOUT = 15_000

/**
 * Holds the columns one tab prints as in the vendored formatter configuration.
 *
 * The vendored `.oxfmtrc.json` a generated workspace receives: a tab prints as
 * `TAB_WIDTH` columns and a line is printed to fit `PRINT_WIDTH` of them. The
 * emitted text conforms to those bytes, never the reverse, so every width here is
 * measured against the same constants the emitters measure against, which
 * `tests/src/core/helpers.test.ts` asserts against the vendored file itself.
 */
export const TAB_COLUMNS = ' '.repeat(TAB_WIDTH)

/**
 * Matches an import of a stylesheet, the one unassigned import the vendored rule exempts.
 *
 * The specifiers the vendored `import/no-unassigned-import` rule exempts.
 */
export const STYLE_IMPORT =
	/^import\s+'[^']+\.(?:css|less|sass|scss|styl|stylus|pcss|postcss|sss)'/u

/**
 * Holds the ambient module declarations that let a typecheck reach an emitted browser configuration.
 *
 * These are the specifiers an emitted browser configuration names that this
 * repository does not install, because scaffold generates a Vue application
 * without being one. Declaring their Vite-facing shapes lets the typecheck reach
 * the emitted configuration itself; the controls below prove a clean run cannot
 * be a typecheck that resolved nothing.
 */
export const BROWSER_PLUGIN_DECLARATIONS = `declare module '@vitejs/plugin-vue' {
	import type { PluginOption } from 'vite'
	const plugin: (...options: never[]) => PluginOption
	export default plugin
}

declare module 'vite-plugin-singlefile' {
	import type { PluginOption } from 'vite'
	export function viteSingleFile(options?: unknown): PluginOption
}
`

/**
 * Lists the environment selections the compiler accepts for one axis.
 */
export const ENVIRONMENT_SELECTIONS: ReadonlyArray<readonly Environment[]> = [
	[],
	['core'],
	['browser'],
	['server'],
	['core', 'browser'],
	['core', 'server'],
	['browser', 'server'],
	['core', 'browser', 'server'],
]

/**
 * Counts, per emitted module path, the blueprints of the selection matrix that emit it.
 *
 * The population the sweeps below walk, stated as the relation it actually
 * is: one entry per (blueprint, module path) pair the selection matrix emits,
 * projected onto the path as the number of blueprints that emit it. The
 * union of those paths is a weaker claim and does not stand in for this one. One
 * maximal blueprint emits every path `MODULE_EMITTERS` names by itself, so under a
 * union assertion every blueprint but that one could emit nothing and nothing
 * would move; the counts move for any selection that stops emitting anything.
 * The control beside the first sweep runs that exact narrowing.
 */
export const MODULE_EMITTERS: Readonly<Record<string, number>> = Object.freeze({
	'app/browser/index.ts': 64,
	'app/browser/main.ts': 64,
	'app/core/index.ts': 64,
	'app/server/index.ts': 64,
	'app/server/main.ts': 64,
	'configs/app/vite.browser.config.ts': 64,
	'configs/app/vite.server.config.ts': 64,
	'configs/app/vite.showcase.config.ts': 32,
	'configs/browsers.ts': 96,
	'configs/commands.ts': 96,
	'configs/src/vite.bin.config.ts': 63,
	'configs/src/vite.browser.config.ts': 64,
	'configs/src/vite.core.config.ts': 64,
	'configs/src/vite.server.config.ts': 64,
	'src/bin/main.ts': 63,
	'src/browser/index.ts': 64,
	'src/core/index.ts': 64,
	'src/server/index.ts': 64,
	'tests/app/browser/index.test.ts': 64,
	'tests/app/core/index.test.ts': 64,
	'tests/app/server/index.test.ts': 64,
	'tests/setupDistribution.ts': 112,
	'tests/distribution.test.ts': 112,
	'tests/integration.test.ts': 63,
	'tests/setup.ts': 126,
	'tests/setupBrowser.ts': 96,
	'tests/setupGlobal.ts': 63,
	'tests/setupGlobal.test.ts': 63,
	'tests/setupServer.ts': 111,
	'tests/src/bin/main.test.ts': 63,
	'tests/src/browser/index.test.ts': 64,
	'tests/src/core/index.test.ts': 64,
	'tests/src/server/index.test.ts': 64,
	'vite.config.ts': 126,
})

/**
 * Holds a `configs/commands.ts` module that registers one probe command.
 *
 * @remarks
 * The command's body returns a constant, so a configuration load evaluates the module without
 * reaching any workspace source.
 */
export const COMMANDS_PROBE_TEXT = `import type { BrowserConfigOptions } from 'vitest/node'

export const commands: Readonly<NonNullable<BrowserConfigOptions['commands']>> = Object.freeze({
	probe: () => 'probed',
})
`

/**
 * Holds a `configs/commands.ts` module that loads aliased server source in two ways.
 *
 * @remarks
 * The `native` command imports `src/server/index.ts` natively from the configuration bundle, which
 * Node resolves without the workspace's aliases. The `routed` command imports the same file through
 * the root Vitest server, whose `resolve.alias` the root configuration derives from the tsconfig
 * paths.
 */
export const COMMANDS_ROUTE_TEXT = `import type { BrowserCommandContext, BrowserConfigOptions } from 'vitest/node'
import { fileURLToPath } from 'node:url'

const SERVER_ENTRY = fileURLToPath(new URL('../src/server/index.ts', import.meta.url))

export const commands: Readonly<NonNullable<BrowserConfigOptions['commands']>> = Object.freeze({
	native: () => import(new URL('../src/server/index.ts', import.meta.url).href),
	routed: async (context: BrowserCommandContext): Promise<string | undefined> => {
		const loaded = await context.project.vitest.import<unknown>(SERVER_ENTRY)
		if (typeof loaded !== 'object' || loaded === null || !('message' in loaded)) return undefined
		return typeof loaded.message === 'string' ? loaded.message : undefined
	},
})
`

/**
 * Lists the packages installed into the staged externalization workspace, each with the token it exports.
 *
 * The packages installed into the staged externalization workspace, each
 * exporting one token the emitted bundle either keeps as an import or inlines.
 * Only `sample-peer` is declared as a peer, so `sample-plain` is the control.
 */
export const PEER_FIXTURE_PACKAGES: ReadonlyArray<readonly [name: string, token: string]> =
	Object.freeze([
		['sample-peer', 'PEER_TOKEN'],
		['sample-plain', 'PLAIN_TOKEN'],
	])

/**
 * Lists each published face the externalization workspace builds, by factory and environment.
 *
 * Each published face the externalization workspace builds, named by the root
 * factory that configures it and by the environment whose entry and bundle it
 * owns.
 */
export const PUBLISHED_FACES: ReadonlyArray<readonly [factory: string, environment: string]> =
	Object.freeze([
		['srcBrowser', 'browser'],
		['srcServer', 'server'],
	])

/** Names the emitted harness exports exercised by the classifier cases. */
export const CLASSIFIER_DECLARATIONS: readonly string[] = [
	'DISTRIBUTION_MODULE_EXTENSIONS',
	'DISTRIBUTION_ADDON_EXTENSION',
	'DISTRIBUTION_DECLARATION_EXTENSIONS',
	'DISTRIBUTION_BROWSER_OUTPUT',
	'DISTRIBUTION_RUNTIME_CONDITIONS',
	'DISTRIBUTION_BUNDLER_CONDITIONS',
	'DISTRIBUTION_DECLARATION_CONDITIONS',
	'isDistributionRecord',
	'isDistributionList',
	'matchesDistributionPackageTarget',
	'readDistributionJSON',
	'resolveDistributionPackageTarget',
	'resolveDistributionTarget',
	'resolvesDistributionBrowser',
	'matchesDistributionFile',
	'targetToDistributionDeclaration',
	'resolveDistributionDeclaration',
	'readDistributionPackageType',
	'resolvesDistributionCommonJS',
	'declaresDistributionCommonJS',
	'collectDistributionTargets',
	'matchesDistributionModule',
	'matchesDistributionDeclaration',
	'readDistributionDeclaration',
	'filterDistributionEntries',
	'filterDistributionUntypable',
]

/**
 * Pairs each classification the emitted proof performs with the answer it owes.
 *
 * One classification the emitted proof performs, written as the driver evaluates it
 * and paired with the answer it owes. Each export shape here is one Node accepts:
 * an array is a fallback list, a condition value may be an array, and a subpath may
 * answer `require` alone.
 */
export const CLASSIFIER_CASES: ReadonlyArray<readonly [call: string, answer: unknown]> = [
	[
		`classifier.collectDistributionTargets(['./dist/src/core/index.js'])`,
		['./dist/src/core/index.js'],
	],
	[
		`classifier.collectDistributionTargets(['./a.js', { require: './b.cjs' }])`,
		['./a.js', './b.cjs'],
	],
	[
		`classifier.collectDistributionTargets({ import: { types: './x.d.ts', default: './x.js' } })`,
		['./x.d.ts', './x.js'],
	],
	[`classifier.resolveDistributionTarget(['./a.js', './b.js'], ['import'])`, './a.js'],
	[
		`classifier.resolveDistributionTarget([{ types: './x.d.ts', default: './x.js' }], ['types', 'import'])`,
		'./x.d.ts',
	],
	[`classifier.matchesDistributionModule('./dist/src/core/index.js')`, true],
	[`classifier.matchesDistributionModule('./dist/src/core/index.mjs')`, true],
	[`classifier.matchesDistributionModule('./dist/src/core/index.cjs')`, true],
	[`classifier.matchesDistributionModule('./dist/src/core/addon.node')`, true],
	[`classifier.matchesDistributionModule('./dist/src/core/feature')`, true],
	[`classifier.matchesDistributionModule('./dist/bundle.js/feature')`, true],
	[`classifier.matchesDistributionModule('./dist/src/core/module.wasm')`, false],
	[`classifier.matchesDistributionModule('./dist/src/styles/main.css')`, false],
	[`classifier.matchesDistributionModule('./package.json')`, false],
	[`classifier.matchesDistributionModule('./dist/src/core/index.d.ts')`, false],
	[`classifier.matchesDistributionModule('./dist/src/core/index.d.cts')`, false],
]

/**
 * Holds the setup seed a target is born with, transcribed from a run that printed it.
 *
 * The setup seeds a target is born with, transcribed from a run that printed them
 * rather than derived from the templates the pin reads. `audit` decides whether a
 * setup module is filled by comparing its text against the seed the installed
 * release plans at that path, and it holds no earlier seed, so a moved byte here
 * moves that reading on every target materialized before the move. Transcribing
 * the bytes makes such a move a deliberate edit rather than a silent one.
 */
export const PLANNED_SETUP_SEED = ''

/**
 * Holds the global setup seed a target is born with, transcribed from a run that printed it.
 */
export const PLANNED_GLOBAL_SEED = 'export function setup(): void {}\n'

/** Lists publishing shapes whose distribution harness and proof must be planned together. */
export const DISTRIBUTION_SELECTIONS: ReadonlyArray<Partial<Omit<Blueprint, 'name'>>> =
	Object.freeze([
		{ src: ['core'] },
		{ src: ['browser'] },
		{ src: ['server'] },
		{ src: [], styles: true },
		{ src: [], themes: true },
	])

/**
 * Builds a blueprint for every selection the compiler accepts, in both structural states it branches on.
 *
 * Every selection the compiler accepts, in both structural states it branches on.
 * A shape is emitted for each non-empty `src` x `app` pair drawn from `SELECTIONS`
 * twice: once with no structural fact set, and once with every one of them set, so
 * no conditional span is measured in one state alone.
 *
 * @returns Each blueprint, with no structural fact set and then with every one set.
 */
export function buildSelections(): readonly Blueprint[] {
	return ENVIRONMENT_SELECTIONS.flatMap((src) =>
		ENVIRONMENT_SELECTIONS.flatMap((app) =>
			src.length === 0 && app.length === 0
				? []
				: [
						createBlueprint('sample', { src, app }),
						createBlueprint('sample', {
							src,
							app,
							bin: true,
							integration: true,
							tree: true,
							global: true,
							showcase: true,
						}),
					],
		),
	)
}

/**
 * Builds the TypeScript modules `scaffold new` writes for a blueprint.
 *
 * Every TypeScript module `scaffold new` writes for a selection: the root config,
 * each scoped config wrapper, each barrel and runtime entry, and each test module.
 *
 * @param blueprint - The selection to emit.
 * @returns Each emitted module path mapped to its text.
 */
export function buildModules(blueprint: Blueprint): ReadonlyMap<string, string> {
	return new Map(
		[
			...blueprintToConfigArtifacts(blueprint),
			...blueprintToSourceArtifacts(blueprint),
			...blueprintToTestArtifacts(blueprint),
		].flatMap((artifact): Array<[string, string]> =>
			artifact.origin === 'host' || !artifact.path.endsWith('.ts')
				? []
				: [[artifact.path, artifact.content]],
		),
	)
}

/**
 * Collects the configuration wrappers a blueprint writes, keyed by path.
 *
 * A wrapper is a `*.config.ts` file beneath `configs/`. The root configuration and the files the
 * host supplies are not wrappers.
 *
 * @param blueprint - The selection to emit.
 * @returns Each emitted wrapper's text, keyed by its path.
 */
export function collectWrappers(blueprint: Blueprint): Readonly<Record<string, string>> {
	return Object.fromEntries(
		blueprintToConfigArtifacts(blueprint).flatMap((artifact): Array<[string, string]> =>
			artifact.origin === 'host' ||
			!artifact.path.endsWith('.config.ts') ||
			!artifact.path.startsWith('configs/')
				? []
				: [[artifact.path, artifact.content]],
		),
	)
}

/**
 * Counts, for every emitted module path, the blueprints that emit it.
 *
 * The emitter relation over one corpus, for a walk that reads nothing else. Each
 * sweep counts its own pairs while it reads content, so this is the shape both
 * halves compare in rather than a second way of deriving it.
 *
 * @param blueprints - The corpus to walk.
 * @returns The number of emitting blueprints per path.
 */
export function countEmitters(blueprints: readonly Blueprint[]): Readonly<Record<string, number>> {
	const paths = blueprints.flatMap((blueprint) => [...buildModules(blueprint).keys()])
	return Object.fromEntries(
		[...Map.groupBy(paths, (path) => path)].map(([path, emitters]): [string, number] => [
			path,
			emitters.length,
		]),
	)
}

/**
 * Measures a line in the columns the vendored formatter prints it in.
 *
 * @param line - The line to measure.
 * @returns The line length with each tab counted as its columns.
 */
export function measureWidth(line: string): number {
	return line.replaceAll('\t', TAB_COLUMNS).length
}

/**
 * Builds one `resolveBrowser` call expression for the driver to evaluate.
 *
 * One `resolveBrowser` call, written as the driver evaluates it. The platform is
 * fixed so the answer is a property of the fixture rather than of this host.
 *
 * @param pinned - The pinned browser, or undefined for none.
 * @param environment - The environment the call reads.
 * @param root - The managed browsers directory.
 * @returns The call source.
 */
export function buildResolveCall(
	pinned: string | undefined,
	environment: Readonly<Record<string, string>>,
	root: string,
): string {
	const target = pinned === undefined ? 'undefined' : JSON.stringify(pinned)
	const settings = JSON.stringify(environment)
	return `resolver.resolveBrowser(${target}, 'linux', ${settings}, ${JSON.stringify(root)})`
}

/**
 * Extracts the identifiers one import clause binds.
 *
 * The identifiers one import clause binds, aliases resolved to the bound name.
 *
 * @param clause - The import clause between `import` and `from`.
 * @returns Each bound name, aliases resolved to the bound name.
 */
export function extractBindings(clause: string): readonly string[] {
	const inner = clause
		.replace(/\/\/[^\r\n]*|\/\*[\s\S]*?\*\//gu, '')
		.trim()
		.replace(/^type\s+/u, '')
	const named = /^\{(?<names>[^}]*)\}$/u.exec(inner)
	if (named?.groups?.names !== undefined) {
		return named.groups.names
			.split(',')
			.map((part) => part.trim())
			.filter((part) => part.length > 0)
			.map((part) => part.split(/\s+as\s+/u).at(-1) ?? part)
	}
	const namespace = /^\*\s+as\s+(?<name>[A-Za-z_$][\w$]*)$/u.exec(inner)
	if (namespace?.groups?.name !== undefined) return [namespace.groups.name]
	return inner.length === 0 ? [] : [inner]
}

/**
 * Extracts every import statement in a module, whole.
 *
 * Every import statement in a module, whole. The vendored formatter breaks an
 * import whose bindings pass the print width across lines, so a rule that reads
 * one line reads a fragment of the statement and every binding below the first
 * line is invisible to it. An import clause carries no quote, which is what lets
 * the span reach its specifier across as many lines as the formatter used and
 * stop there.
 *
 * @param content - The module text.
 * @returns Each import statement, across as many lines as the formatter used.
 */
export function extractImports(content: string): readonly string[] {
	return content.match(/^import\s+(?:[^']*?\s+from\s+)?'[^']*'/gmu) ?? []
}

/**
 * Finds the imported names a module never mentions outside its import statements.
 *
 * What the vendored `no-unused-vars` rule reports on an import: a bound name the
 * module never mentions outside its import statements.
 *
 * @param content - The module text.
 * @returns Each unused binding.
 */
export function findStrays(content: string): readonly string[] {
	const statements = extractImports(content)
	const body = statements.reduce((text, statement) => text.replace(statement, ''), content)
	const tokens = new Set(body.split(/[^\w$]+/u))
	return statements.flatMap((statement) => {
		const clause = /^import\s+(?<clause>[^']*?)\s+from\s+'[^']*'$/u.exec(statement)?.groups?.clause
		return clause === undefined
			? []
			: extractBindings(clause).filter((binding) => !tokens.has(binding))
	})
}

/**
 * Finds the imports that bind nothing and name something other than a stylesheet.
 *
 * What the vendored `import/no-unassigned-import` rule reports: an import that
 * binds nothing and names something other than a stylesheet.
 *
 * @param content - The module text.
 * @returns Each offending import line.
 */
export function findUnassigned(content: string): readonly string[] {
	return content
		.split('\n')
		.filter((line) => /^import\s+'[^']+'/u.test(line) && !STYLE_IMPORT.test(line))
}

/**
 * Finds the lines the vendored formatter would have printed narrower.
 *
 * A line the vendored formatter would have printed narrower. The one excess it
 * leaves is a string literal the formatter has already given a line of its own:
 * no break shortens a literal, so a workspace name long enough to pass the width
 * on its own line stays there. Every other over-width line is a line the formatter
 * would have broken, which is what `format:check` refuses.
 *
 * @param content - The module text.
 * @returns Each line wider than the print width that the formatter could have broken.
 */
export function findWide(content: string): readonly string[] {
	return content
		.split('\n')
		.filter((line) => measureWidth(line) > PRINT_WIDTH && !/^\t*'[^']*',?$/u.test(line))
}

/**
 * Changes one byte of a seed, or adds one to a seed holding none.
 *
 * One byte of a seed changed: the trailing byte becomes a space, and a seed
 * holding no bytes gains one, because a byte that is not there cannot be replaced.
 * Every planned seed is ASCII, so a byte and a code unit are the same thing here.
 *
 * @param seed - The seed text.
 * @returns The seed with its trailing byte replaced by a space.
 */
export function mutateSeed(seed: string): string {
	return `${seed.slice(0, -1)} `
}

/**
 * Plants the sealed declaration back into emitted or template text.
 *
 * The sealed declaration planted back into a copy of emitted or template text: the
 * override taken away, which is the shape this rule replaced. Every root
 * configuration declares `policy`, so the plant lands in each one the sweep walks and
 * an empty finding is a finding rather than a module the parser skipped.
 *
 * @param content - The module text.
 * @returns The text with the policy override taken away.
 */
export function sealParameter(content: string): string {
	return content.replace(
		'export function policy(override?: UserConfig): UserConfig {',
		'export function policy(): UserConfig {',
	)
}

/**
 * Holds one value that a setup hook allocates and a later case or teardown hook reads.
 *
 * @remarks
 * A suite that allocates in `beforeAll` and clears in `afterAll` needs state that outlives one
 * call, so the state lives in this holder's `#` field instead of in a reassigned binding. The
 * holder holds one value at a time: `hold` refuses while the holder holds a value rather than
 * replacing it, and only `clear`, a later call, gives the value up.
 */
export class TestHolder<TValue> {
	#value: TValue | undefined

	/** The held value. Thrown when the holder holds none. */
	get value(): TValue {
		if (this.#value === undefined) throw new Error('The holder holds no value')
		return this.#value
	}

	/**
	 * Holds a value.
	 *
	 * @param value - The value to hold.
	 * @returns The value that was passed in.
	 * @throws Thrown when the holder already holds a value.
	 */
	hold(value: TValue): TValue {
		if (this.#value !== undefined) throw new Error('The holder already holds a value')
		this.#value = value
		return value
	}

	/**
	 * Gives up the held value.
	 *
	 * @returns The value that was held, or `undefined` when the holder held none.
	 */
	clear(): TValue | undefined {
		const value = this.#value
		this.#value = undefined
		return value
	}
}

/**
 * Holds a setup module a maintainer wrote into.
 *
 * A setup module a maintainer wrote into. What separates it from what scaffold
 * seeds at that path is that its text is not the seed's.
 */
export const FILLED_SETUP_TEXT = "export const SAMPLE_FIXTURE = 'sample'\n"

/**
 * Holds a hook-only setup module.
 *
 * A hook-only module has no exported behavior for a sibling proof to cover.
 */
export const HOOK_SETUP_TEXT = [
	"import { afterEach } from 'vitest'",
	'',
	'afterEach(() => {',
	'\tSAMPLE_REGISTRY.clear()',
	'})',
	'',
].join('\n')

/**
 * Lists the fleet packages the upstream fixtures answer for.
 */
export const FLEET_NAMES: readonly string[] = Object.freeze([
	'@orkestrel/emitter',
	'@orkestrel/guide',
	'@orkestrel/probe',
	'@orkestrel/scaffold',
	'@orkestrel/test',
])

/**
 * Builds the advisory question raised over one filled setup module no proof covers.
 *
 * The advisory audit raises over one filled setup module no proof covers.
 * Several fixtures carry such a module to reach another subject, and each of
 * them has to state this question exactly rather than loosen its assertion. The
 * proof is derived from the module the same way the question derives it, so a
 * fixture naming a module other than `tests/setup.ts` states the remedy that
 * module actually wants.
 *
 * @param target - The audited target path.
 * @param module - The setup module the question names.
 * @returns The question, non-blocking, stating the proof the module wants.
 */
export function buildSetupQuestion(target: string, module: string): Question {
	const proof = `${module.slice(0, -'.ts'.length)}.test.ts`
	return {
		field: 'setup',
		message: `The target at ${target} carries a test setup module that no proof covers: ${module}. Add ${proof} to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.`,
		blocking: false,
	}
}

/**
 * Matches a toolchain floor, a caret over a whole `major.minor.patch` version.
 *
 * A floor is a caret over a whole `major.minor.patch` version: the newest the
 * registry served when the floor was last raised. A bare `^6` loses the minor
 * and patch an offline generation would otherwise propagate as `6.0.0`, a `~`
 * pins the wrong axis, a bare version pins one release, and a prerelease is not
 * a floor anyone runs. Fleet rows answer to `ORKESTREL_RANGE_PATTERN` instead,
 * because a `0.x` caret means something different.
 */
export const TOOLCHAIN_RANGE_PATTERN = /^\^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/

/**
 * Labels every shared dependency table a generated workspace can receive.
 *
 * Every shared table a generated workspace can receive, labelled so a failure
 * names the table it came from rather than the row alone.
 */
export const DEPENDENCY_TABLES = [
	['base', BASE_DEV_DEPENDENCIES],
	['declaration', DECLARATION_DEV_DEPENDENCIES],
	['browse', BROWSE_DEV_DEPENDENCIES],
	['source browser', SOURCE_BROWSER_DEV_DEPENDENCIES],
	['app', APP_DEV_DEPENDENCIES],
	['app browser', APP_BROWSER_DEV_DEPENDENCIES],
	['vue', FRAMEWORK_MATRIX.vue.dependencies],
	['app server', APP_SERVER_DEV_DEPENDENCIES],
	['showcase', SHOWCASE_DEV_DEPENDENCIES],
	['styles', STYLES_DEV_DEPENDENCIES],
] as const

/**
 * Lists the ownership tiers a planned artifact can carry.
 */
export const OWNERSHIPS: readonly Ownership[] = ['content', 'presence', 'birth']

/**
 * Holds the text a planned artifact is born with.
 */
export const PLANNED_TEXT = '# Sample\n'

/**
 * Holds the hexadecimal bytes of the planned text, which a matching observation carries.
 */
export const MATCHING_HEX = contentToHex(PLANNED_TEXT)

/**
 * Holds the hexadecimal bytes of an edited text, which a differing observation carries.
 */
export const DIFFERING_HEX = contentToHex('# Edited\n')

/**
 * Lists every option token some verb documents, once, in verb order.
 *
 * Every option token some verb documents, once, in verb order.
 */
export const DOCUMENTED_OPTIONS: readonly string[] = [
	...new Set(VERBS.flatMap((verb) => VERB_OPTIONS[verb])),
]

/**
 * Lists the negative control for every membership claim about documented options.
 *
 * The negative control for every membership claim below, drawn from outside the
 * population those claims cover: one word the executable has never accepted, and
 * the flags the retired surface carried. An instrument that answers
 * "documented" or "accepted" for these has measured nothing.
 */
export const UNDOCUMENTED_OPTIONS: readonly string[] = ['--surfaces <list>', '--apply', '--prune']

/**
 * Lists the paths a materialization of the compiled plan writes first.
 */
export const MATERIALIZED_PATHS = [
	'package.json',
	'AGENTS.md',
	'.claude/agents/orkestrel.md',
	'.claude/rules/names.md',
	'guides/guide.md',
	'scripts/codex.sh',
]
