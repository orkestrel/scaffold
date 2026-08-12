import type { EmitterHooks } from '@orkestrel/emitter'
import type {
	Audit,
	Blueprint,
	CatalogEntry,
	CompilerEventMap,
	CompilerOptions,
	ContentArtifact,
	Dependency,
	Finding,
	Group,
	HostArtifact,
	HydratedArtifact,
	Mirror,
	Override,
	Plan,
	Question,
	Scaffolding,
	Snapshot,
} from '@src/core'
import {
	artifactToHex,
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
	selectGroups,
	selectHostPaths,
} from '@src/core'

/**
 * A real call-recording callback over an argument tuple.
 *
 * @remarks
 * Use this instead of a framework spy wherever a test only needs to know that
 * something fired and with what. `handler` is a genuine listener, and `calls`
 * is each invocation's argument tuple in order.
 */
export interface TestRecorderInterface<TArgs extends readonly unknown[]> {
	readonly calls: readonly TArgs[]
	readonly count: number
	readonly handler: (...args: TArgs) => void
	clear(): void
}

/**
 * One adversarial value every total guard, parser, and cloner must survive.
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
 * One guard under test, with what it must accept and what it may admit.
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

/** One coercer under test, beside the guard it is derived from. */
export interface TestParserCase {
	readonly name: string
	readonly parse: (value: unknown) => unknown
	readonly guard: (value: unknown) => boolean
	readonly accepted: readonly unknown[]
	readonly refused: readonly unknown[]
}

/** One candidate path the portable-path law decides. */
export interface TestPathCase {
	readonly label: string
	readonly path: string
	readonly accepted: boolean
}

/**
 * One value carrying a key its union branch forbids, beside its sound twin.
 *
 * @remarks
 * The two records differ by exactly one key, which the suite checks, so a
 * refusal can only be caused by the key under test.
 */
export interface TestUnionCase {
	readonly label: string
	readonly guard: (value: unknown) => boolean
	readonly accepted: Record<string, unknown>
	readonly refused: Record<string, unknown>
}

/** One helper call whose determinism and input independence are measured. */
export interface TestPurityCase {
	readonly helper: string
	readonly call: () => unknown
	readonly inputs: readonly unknown[]
}

/** One declared range measured against a reported version. */
export interface TestRangeCase {
	readonly range: string
	readonly latest: string
	readonly satisfied: boolean
}

/**
 * An instance whose prototype the hostile matrix severs.
 *
 * @remarks
 * Constructed rather than written as a record, so the reparented case measures
 * a real class instance with a broken prototype chain instead of a plain object.
 */
export class TestSample {
	readonly hostile = 'x'
}

/**
 * Create a recorder whose `handler` records every invocation's arguments.
 *
 * @typeParam TArgs - The argument tuple the recorded handler receives.
 * @returns A recorder reporting the recorded calls and their count.
 *
 * @example
 * ```ts
 * const recorder = createRecorder<readonly [Scaffolding]>()
 * const compiler = new Compiler({ on: { compile: recorder.handler } })
 * ```
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
 * Build a valid inert blueprint, with focused field replacements.
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
 * buildBlueprint({ src: ['core', 'server'], bin: true })
 * ```
 */
export function buildBlueprint(fields?: Partial<Blueprint>): Blueprint {
	return {
		name: 'sample',
		keywords: [],
		src: ['core'],
		app: [],
		dependencies: [],
		peers: [],
		extras: [],
		version: DEFAULT_VERSION,
		engines: DEFAULT_ENGINES,
		overrides: [],
		bin: false,
		integration: false,
		services: [],
		global: false,
		showcase: false,
		...fields,
	}
}

/**
 * Build a valid inert runtime dependency, with focused field replacements.
 *
 * @param fields - The dependency fields to replace on the returned value.
 * @returns A dependency carrying the requested fields over minimal defaults.
 */
export function buildDependency(fields?: Partial<Dependency>): Dependency {
	return { name: '@orkestrel/emitter', range: '^0.0.5', ...fields }
}

/**
 * Build a valid inert artifact override, with focused field replacements.
 *
 * @param fields - The override fields to replace on the returned value.
 * @returns An override carrying the requested fields over minimal defaults.
 */
export function buildOverride(fields?: Partial<Override>): Override {
	return { path: 'README.md', content: '# Sample\n', ...fields }
}

/**
 * Build a valid inert question, with focused field replacements.
 *
 * @param fields - The question fields to replace on the returned value.
 * @returns A question carrying the requested fields over minimal defaults.
 */
export function buildQuestion(fields?: Partial<Question>): Question {
	return { field: 'src', message: 'Unknown environment', blocking: true, ...fields }
}

/**
 * Build a planned host artifact whose bytes have not been read.
 *
 * @param fields - The artifact fields to replace on the returned value.
 * @returns A host artifact carrying the requested fields over minimal defaults.
 */
export function buildHostArtifact(fields?: Partial<HostArtifact>): HostArtifact {
	return { path: 'AGENTS.md', group: 'docs', ownership: 'presence', origin: 'host', ...fields }
}

/**
 * Build a planned host artifact whose vendored bytes have been read.
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
 * Build a planned artifact whose text this package produces.
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
 * Build a valid inert plan, with focused field replacements.
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
 * Build a valid inert target snapshot.
 *
 * @returns One path keyed to the exact hexadecimal bytes of its content.
 */
export function buildSnapshot(): Snapshot {
	return { 'AGENTS.md': contentToHex('# Agents\n') }
}

/**
 * Build a valid inert finding against a destination that holds no file.
 *
 * @returns A missing finding, the one branch that records no observed bytes.
 */
export function buildFinding(): Finding {
	return { path: 'AGENTS.md', group: 'docs', ownership: 'content', drift: 'missing' }
}

/**
 * Build a valid inert audit carrying one finding and one question.
 *
 * @returns An audit over a single missing destination.
 */
export function buildAudit(): Audit {
	return { findings: [buildFinding()], questions: [buildQuestion()] }
}

/**
 * Build the compiler's initial listener record.
 *
 * @returns A hooks record wiring one real listener to the `compile` event.
 */
export function buildHooks(): EmitterHooks<CompilerEventMap> {
	return { compile: createRecorder<readonly [Scaffolding]>().handler }
}

/**
 * Build a valid inert compiler option bag.
 *
 * @returns Options carrying the hooks record and no error handler.
 */
export function buildCompilerOptions(): CompilerOptions {
	return { on: buildHooks() }
}

/** The trap table whose key enumeration throws. */
export const THROWING_KEYS_TRAP: ProxyHandler<object> = {
	ownKeys() {
		throw new Error('ownKeys trap')
	},
}

/** The trap table whose property read throws. */
export const THROWING_GET_TRAP: ProxyHandler<object> = {
	get() {
		throw new Error('get trap')
	},
}

/** The trap table whose prototype read throws. */
export const THROWING_PROTOTYPE_TRAP: ProxyHandler<object> = {
	getPrototypeOf() {
		throw new Error('getPrototypeOf trap')
	},
}

/** The descriptor that installs a throwing accessor over a guarded property. */
export const THROWING_ACCESSOR_DESCRIPTOR: PropertyDescriptor = {
	enumerable: true,
	configurable: true,
	get() {
		throw new Error('accessor')
	},
}

/** The descriptor that installs an accessor answering a value a guard would accept. */
export const BENIGN_ACCESSOR_DESCRIPTOR: PropertyDescriptor = {
	enumerable: true,
	configurable: true,
	get() {
		return 'sample'
	},
}

/** A package manifest declaring one fleet package per section, and one foreign name. */
export const MANIFEST_SAMPLE =
	'{"name":"@orkestrel/sample","dependencies":{"@orkestrel/emitter":"^0.0.5","vite":"~8.2.0"},"devDependencies":{"@orkestrel/emitter":"^9.9.9","@orkestrel/guide":"^0.0.9"}}'

/**
 * Build the adversarial values every total boundary in this package must survive.
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
 * Select one hostile case by its label.
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
 * Count a value's own enumerable keys without containing a hostile read.
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
 * Build every guard this package publishes, with what each must accept.
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
			// count law this guard states is satisfied by a sparse array of three items.
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
		{ name: 'isOverride', guard: isOverride, accepted: [buildOverride()], admits: [] },
		{
			name: 'isBlueprint',
			guard: isBlueprint,
			accepted: [buildBlueprint(), buildBlueprint({ description: 'A sample workspace.' })],
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
 * Build every coercer this package publishes, beside the guard it derives from.
 *
 * @returns One case per parser, freshly built.
 */
export function buildParserCases(): readonly TestParserCase[] {
	return [
		{
			name: 'parseBlueprint',
			parse: parseBlueprint,
			guard: isBlueprint,
			accepted: [buildBlueprint(), buildBlueprint({ description: 'A sample workspace.' })],
			refused: [buildBlueprint({ name: '' }), { name: 'sample' }, undefined, 'sample'],
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
 * Build the values whose sole defect is one key a union branch forbids.
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
 * Build one call of every helper this package publishes.
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

/** Every candidate the portable-path law decides, with the verdict it owes. */
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

/** Every declared range measured against a reported version, with the verdict it owes. */
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
 * Wait for a real elapsed delay.
 *
 * @param ms - The milliseconds to wait.
 * @returns A promise that settles once the host timer fires.
 */
export function waitForDelay(ms = 0): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}
