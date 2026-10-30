import type {
	Artifact,
	CatalogEntry,
	Dependency,
	ManifestDependencySet,
	ManifestToken,
	Drift,
	Environment,
	Finding,
	Group,
	Ownership,
	Plan,
	PlanSummary,
	SurfaceClaim,
	SurfaceCollision,
	SurfaceFinding,
} from './types.js'
import { compareValues, isRecord, isString, limitEntries, parseJSON } from '@orkestrel/contract'
import { fillTemplate } from '@orkestrel/template'
import {
	CANON_PATHS,
	CATALOG_AGENT_PATH,
	DEPENDENCY_NAME_PATTERN,
	ENGINES_PATTERN,
	EXTRA_RANGE_PATTERN,
	GROUPS,
	MAX_COLLECTION_ITEMS,
	MAX_DEPENDENCY_NAME_LENGTH,
	MAX_MANIFEST_BYTES,
	MAX_RANGE_LENGTH,
	MINIMUM_NODE_VERSION,
	ORCHESTRATION_PATH_NAMES,
	ORCHESTRATION_PATH_PREFIXES,
	PRINT_WIDTH,
	TAB_WIDTH,
	VERSION_PATTERN,
	WORKSPACE_OWNED_PATHS,
} from './constants.js'
import { ARTIFACT_TEMPLATES } from './templates.js'

/**
 * Collects bare names claimed by distinct owners in sorted order.
 *
 * @remarks
 * Declaration keywords and environments do not enter a claim's identity.
 * Repeated claims by one owner count once.
 *
 * @example
 * ```ts
 * import { collectSurfaceCollisions } from '@orkestrel/scaffold'
 *
 * collectSurfaceCollisions([{ owner: 'router', names: ['Route'] }]) // []
 * ```
 */
export function collectSurfaceCollisions(
	claims: readonly SurfaceClaim[],
): readonly SurfaceCollision[] {
	const grouped = Map.groupBy(
		claims.flatMap(({ owner, names }) => names.map((name) => ({ name, owner }))),
		({ name }) => name,
	)
	return [...grouped]
		.sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
		.flatMap(([name, entries]) => {
			const owners = [...new Set(entries.map(({ owner }) => owner))].sort()
			return owners.length > 1 ? [{ name, owners }] : []
		})
}

/**
 * Compares collisions with the record and reports errors, recorded subsets, and closures.
 *
 * @remarks
 * A name absent from the record or carrying an additional owner is an error.
 * A recorded name absent from the collisions is closed. Results sort by name.
 *
 * @example
 * ```ts
 * import { compareSurfaceCollisions } from '@orkestrel/scaffold'
 *
 * compareSurfaceCollisions([], [{ name: 'Route', owners: ['router', 'server'] }])
 * // [{ name: 'Route', owners: ['router', 'server'], standing: 'closed' }]
 * ```
 */
export function compareSurfaceCollisions(
	collisions: readonly SurfaceCollision[],
	record: readonly SurfaceCollision[],
): readonly SurfaceFinding[] {
	const baseline = new Map(record.map((entry) => [entry.name, entry.owners]))
	const names = new Set(collisions.map(({ name }) => name))
	return [
		...collisions.map(({ name, owners }): SurfaceFinding => ({
			name,
			owners: [...owners],
			standing: owners.every((owner) => baseline.get(name)?.includes(owner)) ? 'recorded' : 'error',
		})),
		...record
			.filter(({ name }) => !names.has(name))
			.map(({ name, owners }): SurfaceFinding => ({
				name,
				owners: [...owners],
				standing: 'closed',
			})),
	].sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0))
}

/**
 * Encodes bytes as exact lowercase hexadecimal text.
 *
 * @param bytes - The bytes to encode.
 * @returns Two lowercase hexadecimal digits per input byte, and `''` for no bytes.
 *
 * @remarks
 * The encoding every byte claim in this package is stated in, so a plan, an
 * audit finding, and a snapshot all compare as text rather than as buffers.
 * `Uint8Array.prototype.toHex` is not available on the oldest Node this package
 * supports, so the digits are produced here.
 *
 * @example
 * ```ts
 * import { bytesToHex } from '@orkestrel/scaffold'
 *
 * bytesToHex(new Uint8Array([0x68, 0x69, 0x0a])) // '68690a'
 * ```
 */
export function bytesToHex(bytes: Uint8Array): string {
	const digits = Array.from({ length: 256 }, (_, value) => value.toString(16).padStart(2, '0'))
	return Iterator.from(bytes)
		.map((byte) => digits[byte] ?? '')
		.toArray()
		.join('')
}

/**
 * Encodes text as the exact lowercase hexadecimal form of its UTF-8 bytes.
 *
 * @param content - The text to encode.
 * @returns The hexadecimal form of the text's exact UTF-8 bytes.
 *
 * @remarks
 * This is the single conversion from an artifact's content to the bytes a
 * comparison is made against, so a template or computed artifact is measured in
 * the same units as a vendored one. Encoding is `TextEncoder`, which every
 * supported host provides, so core stays host-independent.
 *
 * @example
 * ```ts
 * import { contentToHex } from '@orkestrel/scaffold'
 *
 * contentToHex('hi\n') // '68690a'
 * ```
 */
export function contentToHex(content: string): string {
	return bytesToHex(new TextEncoder().encode(content))
}

/**
 * Counts the UTF-8 bytes text encodes to.
 *
 * @param content - The text to measure.
 * @returns The exact number of UTF-8 bytes.
 *
 * @remarks
 * Counted rather than encoded, so measuring a value against a ceiling never
 * allocates the bytes it is about to refuse. An unpaired surrogate counts as
 * the three bytes `TextEncoder` writes for the replacement character, so the
 * count matches {@link contentToHex} for every string.
 *
 * @example
 * ```ts
 * import { computeBytes } from '@orkestrel/scaffold'
 *
 * computeBytes('hi\n') // 3
 * computeBytes('€') // 3
 * ```
 */
export function computeBytes(content: string): number {
	return content[Symbol.iterator]().reduce((bytes, character) => {
		const code = character.codePointAt(0) ?? 0
		return bytes + (code <= 0x7f ? 1 : code <= 0x7ff ? 2 : code <= 0xffff ? 3 : 4)
	}, 0)
}

/**
 * Computes the sum of a list of numbers.
 *
 * @param values - The numbers to add.
 * @returns The sum, and `0` for no numbers.
 *
 * @remarks
 * The one place a running tally is derived from the amounts that make it up, so a
 * byte budget is the allowance less what was spent rather than a counter that is
 * reassigned as reads land.
 *
 * @example
 * ```ts
 * import { computeTotal } from '@orkestrel/scaffold'
 *
 * computeTotal([65536, 65536, 12]) // 131084
 * computeTotal([]) // 0
 * ```
 */
export function computeTotal(values: readonly number[]): number {
	return values.reduce((total, value) => total + value, 0)
}

/**
 * Yields the answer to each value of a source and ends after the first refused answer.
 *
 * @param source - The values to answer, requested one at a time as the answers are read.
 * @param answer - Answers one value, or returns `undefined` to refuse it.
 * @returns A generator of the answers in source order, whose last answer is the first refusal when
 * the source holds one.
 * @throws Thrown when `answer` throws for a value, with that error, or when closing `source` after
 * a refusal throws, with the close's error.
 *
 * @remarks
 * The body is a `for…of` loop, so the source's iterator is requested once, when the first answer
 * is read, and stepped only as the answers are read: a length the source reports never bounds the
 * read, a hole reads as an `undefined` value, and an infinite source is read as far as the first
 * refusal. The iterator is closed after a refusal with a normal completion, so a raising close
 * surfaces, and is closed when `answer` throws with a throw completion, so the error from `answer`
 * wins. An iterator that ends is left alone. A caller that stops at a refusal and keeps what came
 * before it reads the answers into a list and checks that none is `undefined`.
 *
 * @example
 * ```ts
 * import { iterateAnswers } from '@orkestrel/scaffold'
 *
 * const halve = (value: number): number | undefined => (value % 2 === 0 ? value / 2 : undefined)
 *
 * Array.from(iterateAnswers([2, 4, 5, 6], halve)).length // 3
 * Array.from(iterateAnswers([2, 4], halve)) // [1, 2]
 * ```
 */
export function* iterateAnswers<TValue, TAnswer>(
	source: Iterable<TValue>,
	answer: (value: TValue) => TAnswer | undefined,
): Generator<TAnswer | undefined, void, undefined> {
	for (const value of source) {
		const answered = answer(value)
		yield answered
		if (answered === undefined) return
	}
}

/**
 * Computes the deterministic content identity of text.
 *
 * @param text - The text to digest.
 * @returns Sixteen lowercase hexadecimal digits.
 *
 * @remarks
 * The 64-bit FNV-1a fold over the text's UTF-16 code units, which is the
 * identity a pinned plan carries. It reads no clock and no randomness, so the
 * same text answers the same digits on every host and every run.
 *
 * It is an identity, not a security digest: it says two values are the same
 * value, never that nobody could have built a second value answering the same
 * digits. Core cannot do better synchronously — the only cryptographic digest a
 * host-independent scope reaches is `crypto.subtle`, which is asynchronous, and
 * the compiler is synchronous by contract.
 *
 * @example
 * ```ts
 * import { computeHash } from '@orkestrel/scaffold'
 *
 * computeHash('') // 'cbf29ce484222325'
 * ```
 */
export function computeHash(text: string): string {
	// The iterator yields code points; a surrogate pair folds as its two code units.
	const hash = text[Symbol.iterator]().reduce((digest, character) => {
		const first = BigInt.asUintN(64, (digest ^ BigInt(character.charCodeAt(0))) * 0x100000001b3n)
		return character.length === 1
			? first
			: BigInt.asUintN(64, (first ^ BigInt(character.charCodeAt(1))) * 0x100000001b3n)
	}, 0xcbf29ce484222325n)
	return hash.toString(16).padStart(16, '0')
}

/**
 * Tests whether a path instructs or wires an agent rather than the toolchain.
 *
 * @param path - The target-relative path to test.
 * @returns True if the path is beneath a harness directory or is one of the exact
 * root filenames that wires an agent bench; false otherwise.
 *
 * @remarks
 * The one home of the orchestration membership rule. A vendored path and a
 * foreign path found in a target are both classified through here, so an added
 * harness directory is admitted once in `ORCHESTRATION_PATH_PREFIXES` and every
 * caller follows.
 *
 * @example
 * ```ts
 * import { matchesOrchestrationPath } from '@orkestrel/scaffold'
 *
 * matchesOrchestrationPath('.claude/rules/names.md') // true
 * matchesOrchestrationPath('.mcp.json') // true
 * matchesOrchestrationPath('.oxlintrc.json') // false
 * ```
 */
export function matchesOrchestrationPath(path: string): boolean {
	if (ORCHESTRATION_PATH_NAMES.includes(path)) return true
	return ORCHESTRATION_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
}

/**
 * Checks whether another surface owns the vendored bytes at a path.
 *
 * @param path - The target-relative vendored path to test.
 * @returns True if the path is the catalog agent file or a Markdown guide
 * mirror; false otherwise.
 *
 * @remarks
 * The materializer keeps these paths presence-owned because the catalog or
 * mirror surface writes their bytes. A live host fill therefore keeps the
 * installed floor's bytes for them and requests only the host-owned paths.
 *
 * @example
 * ```ts
 * import { isDeferredPath } from '@orkestrel/scaffold'
 *
 * isDeferredPath('guides/router.md') // true
 * isDeferredPath('AGENTS.md') // false
 * ```
 */
export function isDeferredPath(path: string): boolean {
	return path === CATALOG_AGENT_PATH || (path.startsWith('guides/') && path.endsWith('.md'))
}

/**
 * Checks whether a path belongs to the instruction canon a target reads rather than holds.
 *
 * @param path - The target-relative path to test.
 * @returns True if the path is a {@link CANON_PATHS} member or sits beneath a
 * member that is a directory; false otherwise.
 *
 * @remarks
 * The one reading of canon membership, so the live overlay and the executable's
 * fetch list never disagree about what a path is. The match runs to a segment
 * boundary, so a sibling whose name opens with a member's name —
 * `.claude/rulesets` beside `.claude/rules` — stays outside.
 *
 * Membership answers whether scaffold owns the path, not whether a plan claims
 * it. A plan claims `AGENTS.md` and {@link CATALOG_AGENT_PATH} at canon paths
 * deliberately, so a consumer deciding whether to write, restore, or remove a
 * path reads the plan rather than this predicate. A member the checkout no
 * longer holds is still canon, so a copy a target keeps reports as foreign.
 *
 * @example
 * ```ts
 * import { isCanonPath } from '@orkestrel/scaffold'
 *
 * isCanonPath('.claude/rules/names.md') // true
 * isCanonPath('.claude/settings.json') // false
 * ```
 */
export function isCanonPath(path: string): boolean {
	return CANON_PATHS.some((canon) => path === canon || path.startsWith(`${canon}/`))
}

/**
 * Checks whether another surface owns a target's present bytes at a path.
 *
 * @param path - The target-relative path to test.
 * @returns True if the path is a {@link WORKSPACE_OWNED_PATHS} member or a
 * deferred path; false otherwise.
 *
 * @remarks
 * The one reading of presence ownership. A workspace-owned path carries bytes
 * the consumer's own workspace writes, and a deferred path carries bytes the
 * catalog or mirror surface writes, so a vendored expansion plans either by
 * presence rather than reading and claiming its content.
 *
 * @example
 * ```ts
 * import { isRetainedPath } from '@orkestrel/scaffold'
 *
 * isRetainedPath('.gitignore') // true
 * isRetainedPath('LICENSE') // false
 * ```
 */
export function isRetainedPath(path: string): boolean {
	return WORKSPACE_OWNED_PATHS.includes(path) || isDeferredPath(path)
}

/**
 * Checks whether a destination's floor bytes survive a live overlay.
 *
 * @param path - The target-relative destination to test.
 * @returns True if the path is deferred or belongs to the instruction
 * canon; false otherwise.
 *
 * @remarks
 * The one reading of what a live fill does not replace, so the overlay assembler
 * and the executable's fetch list never disagree about a destination. A deferred
 * path's bytes belong to the catalog or mirror verb, and a canon destination is
 * staged for reading rather than for a target, so the installed floor's bytes
 * stand for both. A reader that requested either would spend a round trip on
 * bytes the overlay would not take.
 *
 * @example
 * ```ts
 * import { isFloorPath } from '@orkestrel/scaffold'
 *
 * isFloorPath('AGENTS.md') // true
 * isFloorPath('scripts/codex.sh') // false
 * ```
 */
export function isFloorPath(path: string): boolean {
	return isDeferredPath(path) || isCanonPath(path)
}

/**
 * Infers the {@link Group} a path belongs to.
 *
 * @param path - The target-relative path to classify.
 * @returns The group that owns the path.
 *
 * @remarks
 * A path is grouped by what it governs rather than by where it sits. The
 * manifest files are named exactly; anything
 * {@link matchesOrchestrationPath} accepts is orchestration; `src` and `app`
 * are source; `tests`, `guides`, and `docs` carry their own names; the licence
 * and a root Markdown document are docs; and everything else is configuration.
 * A vendored path and a foreign path found in a target are classified here
 * alike, so the plan and the audit never disagree about what a path is.
 *
 * @example
 * ```ts
 * import { inferGroup } from '@orkestrel/scaffold'
 *
 * inferGroup('src/core/index.ts') // 'source'
 * inferGroup('AGENTS.md') // 'docs'
 * inferGroup('.editorconfig') // 'configs'
 * ```
 */
export function inferGroup(path: string): Group {
	if (path === 'package.json' || path === 'package-lock.json') return 'manifest'
	if (matchesOrchestrationPath(path)) return 'orchestration'
	if (path.startsWith('src/') || path.startsWith('app/')) return 'source'
	if (path.startsWith('tests/')) return 'tests'
	if (path.startsWith('guides/')) return 'guides'
	if (path.startsWith('docs/')) return 'docs'
	// The row holds the licence, the workspace's own front page, and the
	// scaffold-owned root pointers. The group carries placement rather than
	// authorship, so `Ownership` is what separates them.
	if (path === 'LICENSE') return 'docs'
	if (!path.includes('/') && path.endsWith('.md')) return 'docs'
	return 'configs'
}

/**
 * Serializes one string as a single-quoted TypeScript literal.
 *
 * @param value - The string to serialize.
 * @returns A complete single-quoted literal with line-breaking and delimiter
 * characters escaped.
 *
 * @remarks
 * Configuration templates insert blueprint-derived strings into TypeScript.
 * Keeping this one serializer at that boundary prevents a name from becoming
 * syntax and preserves oxfmt's configured single-quote fixed point.
 *
 * @example
 * ```ts
 * import { serializeTypeScriptString } from '@orkestrel/scaffold'
 *
 * serializeTypeScriptString("it's") // `'it\\'s'`
 * ```
 */
export function serializeTypeScriptString(value: string): string {
	const escapes: Readonly<Record<string, string>> = {
		"'": "\\'",
		'\\': '\\\\',
		'\b': '\\b',
		'\f': '\\f',
		'\n': '\\n',
		'\r': '\\r',
		'\t': '\\t',
		' ': '\\u2028',
		' ': '\\u2029',
	}
	// The iterator yields code points, so a surrogate pair is one two-unit character
	// that passes through and a lone surrogate is a one-unit character that escapes.
	const serialized = Array.from(value, (character) => {
		const escape = escapes[character]
		if (escape !== undefined) return escape
		const code = character.charCodeAt(0)
		return character.length === 1 && (code < 0x20 || (code >= 0xd800 && code <= 0xdfff))
			? `\\u${code.toString(16).padStart(4, '0')}`
			: character
	}).join('')
	return `'${serialized}'`
}

/**
 * Derives the guide mirror path a package name answers for.
 *
 * @param name - A bare or `@orkestrel`-scoped package name.
 * @returns The mirror path, `guides/<bare name>.md`.
 *
 * @remarks
 * The single shape of a mirror path, read by the fetch that fills one and by
 * the plan that leaves the target's own guide out of its host set. Only the
 * segment after the final `/` is used, so the scope never reaches the path.
 * Whether the derived path is safe to write is `isPath`'s answer and the gate's,
 * which is why `DEPENDENCY_NAME_PATTERN` closes the name to a bare scoped one
 * before it ever arrives here.
 *
 * @example
 * ```ts
 * import { nameToGuide } from '@orkestrel/scaffold'
 *
 * nameToGuide('@orkestrel/router') // 'guides/router.md'
 * nameToGuide('scaffold') // 'guides/scaffold.md'
 * ```
 */
export function nameToGuide(name: string): string {
	return `guides/${name.slice(name.lastIndexOf('/') + 1)}.md`
}

/**
 * Tests whether one emitted line fits the vendored formatter width.
 *
 * @param line - One emitted line, leading tabs included.
 * @returns True if the expanded line fits; false otherwise.
 *
 * @remarks
 * A generator writes source the formatter then reads back, so a line packed
 * past the vendored width is rewrapped on the next `format` run and the emitted
 * bytes stop matching the plan the audit compares against. The generator
 * therefore measures a candidate line and chooses the shape the formatter would
 * have chosen. Tabs are expanded first because the formatter counts them as
 * `TAB_WIDTH` columns rather than as one character.
 *
 * @example
 * ```ts
 * import { matchesPrintWidth } from '@orkestrel/scaffold'
 *
 * matchesPrintWidth('\t\tprojects: [core],') // true
 * ```
 */
export function matchesPrintWidth(line: string): boolean {
	return line.replaceAll('\t', ' '.repeat(TAB_WIDTH)).length <= PRINT_WIDTH
}

/**
 * Selects the single published environment a package root points at.
 *
 * @param src - The declared published environments.
 * @returns That environment, or `undefined` when the selection declares none or
 * several.
 *
 * @remarks
 * A workspace publishing exactly one environment puts it at the package root,
 * so its entry fields and its `'.'` export condition both name that
 * environment's build. A workspace publishing several puts core at the root and
 * gives every other environment a subpath, so there is no single root to name.
 * Both callers read the same answer, which is why the branch is decided once
 * here rather than twice.
 *
 * @example
 * ```ts
 * import { srcToRoot } from '@orkestrel/scaffold'
 *
 * srcToRoot(['browser']) // 'browser'
 * srcToRoot(['core', 'server']) // undefined
 * ```
 */
export function srcToRoot(src: readonly Environment[]): Environment | undefined {
	if (src.length !== 1) return undefined
	return src[0]
}

/**
 * Selects the host paths a named workspace vendors.
 *
 * @param paths - The candidate host paths, in their declared order.
 * @param name - The target workspace's own bare package name.
 * @returns Every candidate except the workspace's own guide, in input order.
 *
 * @remarks
 * The candidates include the seed guide mirrors beside `HOST_PATHS`. A workspace never
 * mirrors its own guide: that file is the workspace's own product, and vendoring
 * it would have the target overwrite its guide with the copy it published.
 *
 * @example
 * ```ts
 * import { HOST_PATHS, selectHostPaths } from '@orkestrel/scaffold'
 *
 * selectHostPaths(HOST_PATHS, 'scaffold').includes('guides/scaffold.md') // false
 * ```
 */
export function selectHostPaths(paths: readonly string[], name: string): readonly string[] {
	const guide = nameToGuide(name)
	return paths.filter((path) => path !== guide)
}

/**
 * Selects the groups a compile covers, in plan order.
 *
 * @param groups - The requested selection; every group when absent.
 * @returns The requested groups in `GROUPS` order, without repeats.
 *
 * @remarks
 * A caller's selection is data, so it arrives in whatever order and with
 * whatever repeats the caller wrote. Plan order is this package's, so the
 * selection is read as membership and the order comes from `GROUPS`. An empty
 * selection covers nothing, which is a caller asking for an empty plan rather
 * than a caller asking for everything.
 *
 * @example
 * ```ts
 * import { selectGroups } from '@orkestrel/scaffold'
 *
 * selectGroups(['tests', 'manifest', 'tests']) // ['manifest', 'tests']
 * selectGroups() // every group, in plan order
 * ```
 */
export function selectGroups(groups?: readonly Group[]): readonly Group[] {
	const selection = groups ?? GROUPS
	return GROUPS.filter((group) => selection.includes(group))
}

/**
 * Projects an artifact to the exact bytes it claims, as hexadecimal.
 *
 * @param artifact - The planned artifact to read.
 * @returns The claimed bytes, or `undefined` when the artifact claims none.
 *
 * @remarks
 * A hydrated artifact carries its vendored source's bytes directly; a template
 * or computed artifact carries text, which is encoded here. An unhydrated host
 * artifact claims no bytes at all, and answers `undefined` rather than an empty
 * string, because no bytes and no content are different facts.
 *
 * @example
 * ```ts
 * import { artifactToHex } from '@orkestrel/scaffold'
 *
 * artifactToHex({
 * 	path: 'README.md',
 * 	group: 'docs',
 * 	ownership: 'birth',
 * 	origin: 'template',
 * 	content: 'hi\n',
 * }) // '68690a'
 * ```
 */
export function artifactToHex(artifact: Artifact): string | undefined {
	if (artifact.origin !== 'host') return contentToHex(artifact.content)
	return artifact.hex
}

/**
 * Infers how one target path compares to the artifact planned for it.
 *
 * @param artifact - The planned artifact.
 * @param observed - The destination's exact bytes as hexadecimal; absent when
 * the destination holds no file.
 * @returns `aligned`, `stale`, or `missing`.
 *
 * @remarks
 * Ownership decides the comparison and nothing else does. A `birth`-owned
 * artifact is never compared and is always aligned, so a file the workspace has
 * outgrown is never reported as drift. A `presence`-owned artifact compares
 * existence only. A `content`-owned artifact compares bytes, and it always
 * carries the bytes to compare, so the comparison can always be made.
 *
 * `foreign` is not answerable here: it describes a path the plan does not own,
 * so no artifact exists to pass in.
 *
 * @example
 * ```ts
 * import type { Artifact } from '@orkestrel/scaffold'
 * import { inferDrift } from '@orkestrel/scaffold'
 *
 * const artifact: Artifact = {
 * 	path: 'README.md',
 * 	group: 'docs',
 * 	ownership: 'content',
 * 	origin: 'computed',
 * 	content: 'hi\n',
 * }
 *
 * inferDrift(artifact, '68690a') // 'aligned'
 * inferDrift(artifact, '6279650a') // 'stale'
 * inferDrift(artifact) // 'missing'
 * ```
 */
export function inferDrift(artifact: Artifact, observed?: string): Exclude<Drift, 'foreign'> {
	if (artifact.ownership === 'birth') return 'aligned'
	if (observed === undefined) return 'missing'
	if (artifact.ownership === 'presence') return 'aligned'
	return observed === artifactToHex(artifact) ? 'aligned' : 'stale'
}

/**
 * Projects one planned artifact and the bytes found at its path into a verdict.
 *
 * @param artifact - The planned artifact.
 * @param observed - The destination's exact bytes as hexadecimal; absent when
 * the destination holds no file.
 * @returns The finding, carrying the artifact's ownership and `observed`
 * exactly where bytes were read.
 *
 * @remarks
 * The comparison itself is {@link inferDrift}'s, so ownership decides it here
 * exactly as it does everywhere else. This adds only the shape: a missing
 * destination has no bytes to record, and every other verdict records the bytes
 * it was given, which is the precondition the mutation that follows is held to.
 * Ownership is copied rather than inferred from drift because aligned findings
 * span every ownership tier.
 *
 * `foreign` is not answerable here, because it describes a path no artifact was
 * planned for.
 *
 * @example
 * ```ts
 * import { artifactToFinding } from '@orkestrel/scaffold'
 *
 * artifactToFinding(
 * 	{ path: 'README.md', group: 'docs', ownership: 'content', origin: 'computed', content: 'hi\n' },
 * 	'6279650a',
 * ) // { path: 'README.md', group: 'docs', ownership: 'content', drift: 'stale', observed: '6279650a' }
 * ```
 */
export function artifactToFinding(artifact: Artifact, observed?: string): Finding {
	const path = artifact.path
	const group = artifact.group
	const ownership = artifact.ownership
	if (observed === undefined) {
		return inferDrift(artifact) === 'aligned'
			? { path, group, ownership, drift: 'aligned' }
			: { path, group, ownership, drift: 'missing' }
	}
	return inferDrift(artifact, observed) === 'stale'
		? { path, group, ownership, drift: 'stale', observed }
		: { path, group, ownership, drift: 'aligned', observed }
}

/**
 * Tests whether {@link inferDrift} could have produced a finding for an ownership.
 *
 * @param ownership - What scaffold claims at the planned path.
 * @param finding - The audit verdict to test.
 * @returns True if the ownership and verdict are reachable through
 * {@link inferDrift}; false otherwise.
 *
 * @remarks
 * This predicate keeps the comparison law beside the reachability law it
 * restates. A mutation uses it so a refusal can distinguish an impossible
 * verdict from a target that genuinely moved after its audit.
 *
 * @example
 * ```ts
 * import type { Finding } from '@orkestrel/scaffold'
 * import { matchesDriftReachability } from '@orkestrel/scaffold'
 *
 * const aligned: Finding = {
 * 	path: 'README.md',
 * 	group: 'docs',
 * 	ownership: 'birth',
 * 	drift: 'aligned',
 * }
 * const stale: Finding = {
 * 	path: 'README.md',
 * 	group: 'docs',
 * 	ownership: 'birth',
 * 	drift: 'stale',
 * 	observed: '6279650a',
 * }
 *
 * matchesDriftReachability('birth', aligned) // true
 * matchesDriftReachability('birth', stale) // false
 * ```
 */
export function matchesDriftReachability(ownership: Ownership, finding: Finding): boolean {
	if (finding.drift === 'aligned') return ownership === 'birth' || finding.observed !== undefined
	if (finding.drift === 'missing') return ownership !== 'birth'
	return finding.drift === 'stale' && ownership === 'content'
}

/**
 * Projects a catalog into the layers it publishes in.
 *
 * @param entries - The catalog rows to order.
 * @returns One layer per round, each holding the names publishable together,
 * sorted within the layer; a name whose edges never resolve is omitted.
 *
 * @remarks
 * A layer is a deterministic function of the catalog's own edges, so it is
 * computed here rather than stored on a row that could disagree with them.
 * Only RUNTIME and PEER edges between catalogued packages count: a development
 * dependency reaches no consumer, so it constrains nothing about publish order,
 * and an edge leaving the fleet is a package this catalog does not publish. A
 * peer edge counts like a runtime edge, because a caret peer range at `0.0.x`
 * names one exact release the dependent cannot publish ahead of.
 *
 * The order matters because these packages are `0.0.x`, where a caret pins one
 * exact release. Publishing a dependent before its dependency leaves the
 * dependent pinned to the older release, and ranges that disagree install
 * duplicate copies of one package that the compiler reads as distinct types.
 *
 * A cycle cannot be published in rounds, so its members are omitted rather than
 * placed in an order that would be wrong. An absent name is the report: compare
 * the returned names against the catalog to find one.
 *
 * @example Fleet catalog
 * ```ts
 * import { catalogToLayers } from '@orkestrel/scaffold'
 *
 * const layers = catalogToLayers(entries)
 * layers[0] // the names that depend on nothing else in the fleet
 * ```
 */
export function catalogToLayers(
	entries: readonly CatalogEntry[],
): ReadonlyArray<readonly string[]> {
	// The names come from a first pass that skips a hole. The edges come from a second pass, whose
	// iterator consumes one entry at a time and which reads a hole as an `undefined` entry, as a
	// `for…of` over the list would.
	const published = new Set(
		entries.filter((entry) => entry.lookup === 'found').map((entry) => entry.name),
	)
	// A later entry of one name replaces an earlier one at the earlier position, as a keyed
	// write does, and an edge to a name that is not published constrains nothing.
	const found = Iterator.from(entries)
		.flatMap((entry): ReadonlyArray<readonly [string, readonly string[]]> =>
			entry.lookup === 'found'
				? [
						[
							entry.name,
							[...entry.dependencies, ...entry.peers]
								.map((dependency) => dependency.name)
								.filter((name) => published.has(name)),
						],
					]
				: [],
		)
		.toArray()
	const dependencies = new Map(found)
	// Each round places every name whose edges are all placed, in name order. A round that places
	// nothing leaves the state as it was, which ends the layers: a cycle never becomes ready.
	// One round per found entry is enough, because a round that places anything places one name.
	return found.reduce<{
		readonly layers: ReadonlyArray<readonly string[]>
		readonly placed: ReadonlySet<string>
	}>(
		(state) => {
			const ready = [...dependencies]
				.filter(
					([name, edges]) =>
						!state.placed.has(name) && edges.every((edge) => state.placed.has(edge)),
				)
				.map(([name]) => name)
				.sort()
			return ready.length === 0
				? state
				: { layers: [...state.layers, ready], placed: new Set([...state.placed, ...ready]) }
		},
		{ layers: [], placed: new Set() },
	).layers
}

/**
 * Projects a plan into its tally by artifact origin.
 *
 * @param plan - The plan to summarize.
 * @returns The workspace's name, both environment axes, the covered groups, and
 * one count per origin.
 *
 * @remarks
 * Lossy on purpose: the summary is what a report prints, and it holds nothing a
 * caller could mistake for the plan itself. The counts are derived on each call
 * rather than stored on the plan, so they cannot disagree with the artifacts
 * beside them.
 *
 * @example
 * ```ts
 * import { planToSummary } from '@orkestrel/scaffold'
 *
 * planToSummary(plan).computed // the number of computed artifacts
 * ```
 */
export function planToSummary(plan: Plan): PlanSummary {
	// The iterator reads a hole as an `undefined` artifact, as a `for…of` over the list would, and the
	// tally counts the artifacts it yields rather than the length the list reports.
	const origins = Iterator.from(plan.artifacts)
		.map((artifact) => artifact.origin)
		.toArray()
	const host = origins.filter((origin) => origin === 'host').length
	const template = origins.filter((origin) => origin === 'template').length
	return {
		name: plan.blueprint.name,
		src: plan.blueprint.src,
		app: plan.blueprint.app,
		groups: plan.groups,
		host,
		template,
		computed: origins.length - host - template,
	}
}

/**
 * Extracts the major, minor, and patch components of an exact version.
 *
 * @param version - The candidate version text.
 * @returns The major, minor, and patch numbers, or `undefined` when the text is
 * not the exact `major.minor.patch` syntax.
 *
 * @remarks
 * Deliberately narrow: a prerelease or build suffix is not extracted, because
 * this package compares released versions and refusing to read one is honest
 * where guessing its precedence would not be.
 *
 * @example
 * ```ts
 * import { extractVersion } from '@orkestrel/scaffold'
 *
 * extractVersion('0.0.23') // [0, 0, 23]
 * extractVersion('1.2.3-beta.1') // undefined
 * ```
 */
export function extractVersion(
	version: string,
): readonly [major: number, minor: number, patch: number] | undefined {
	if (!VERSION_PATTERN.test(version)) return undefined
	const [major, minor, patch] = version.split('.').map((component) => Number(component))
	if (major === undefined || minor === undefined || patch === undefined) return undefined
	return [major, minor, patch]
}

/**
 * Extracts the major component of an admitted dependency range.
 *
 * @param range - The candidate range text.
 * @returns The major number, or `undefined` when the text is not a canonical
 * major caret or an admitted full-version form.
 *
 * @remarks
 * A canonical toolchain range is `^MAJOR`. Existing consumer declarations may
 * instead carry an exact `major.minor.patch` version or that version under a
 * caret or tilde. The projection reads those forms without deciding whether a
 * version satisfies them; {@link matchesRange} owns that separate question.
 *
 * @example
 * ```ts
 * import { extractRangeMajor } from '@orkestrel/scaffold'
 *
 * extractRangeMajor('^6') // the declared major
 * extractRangeMajor('>=6.0.0') // undefined
 * ```
 */
export function extractRangeMajor(range: string): number | undefined {
	const match =
		/^(?:\^(0|[1-9]\d*)|(?:\^|~)?(0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?)$/.exec(
			range,
		)
	const major = match?.[1] ?? match?.[2]
	return major === undefined ? undefined : Number(major)
}

/**
 * Compares two versions by their numeric components.
 *
 * @param left - The version ordered first when it compares lower.
 * @param right - The version compared against.
 * @returns `-1`, `1`, or `0` as `left` sorts before, after, or with `right`.
 *
 * @remarks
 * Major, then minor, then patch, each compared as a number so `0.0.10` sorts
 * above `0.0.9`. The function is total: a version this package cannot read
 * sorts below one it can, and two unreadable versions fall back to a code-unit
 * comparison, so an ordering is never decided by which side failed to parse.
 *
 * @example
 * ```ts
 * import { compareVersions } from '@orkestrel/scaffold'
 *
 * compareVersions('0.0.9', '0.0.10') // -1
 * compareVersions('1.2.3', '1.2.3') // 0
 * ```
 */
export function compareVersions(left: string, right: string): number {
	const first = extractVersion(left)
	const second = extractVersion(right)
	if (first === undefined || second === undefined) {
		if (first !== undefined) return 1
		if (second !== undefined) return -1
		return compareValues(left, right)
	}
	for (const [index, component] of first.entries()) {
		const order = compareValues(component, second[index] ?? 0)
		if (order !== 0) return order
	}
	return 0
}

/**
 * Tests whether a declared range already admits a published version.
 *
 * @param range - The declared dependency range.
 * @param latest - The version the registry's `latest` tag reports.
 * @returns True if the range admits that version; false otherwise.
 *
 * @remarks
 * The one place this comparison is made. A `Release` records the declared range
 * and the reported version and stores no verdict beside them, because a stored
 * verdict could only disagree with the fields it sits next to.
 *
 * Readability is decided first, and it is `EXTRA_RANGE_PATTERN`: an optional
 * caret or tilde over `major.minor.patch` and an optional prerelease
 * suffix. That pattern already covers every `ORKESTREL_RANGE_PATTERN` range and
 * every `VERSION_PATTERN` version, so the subset is stated once rather than
 * assembled here. Text outside it is never admitted, including text handed in on
 * both sides, so an unreadable declaration surfaces as work instead of matching
 * itself.
 *
 * The accepted subset is the one that pattern admits: an exact pin, a tilde
 * range, and a caret range. An exact pin is satisfied by that version alone. A
 * tilde range holds the minor and admits a later patch. A caret range holds the
 * leading nonzero component, which is why `^0.0.5` is an exact pin and `^0.5.3`
 * admits `0.5.4` but not `0.6.0`.
 *
 * Identity is the door a prerelease passes through, and the only one: this
 * package does not order prerelease precedence, so `1.2.3-beta.1` is satisfied
 * by that exact string and by nothing else. The version side needs no separate
 * readability test, because identity already proves it equals a readable
 * declaration and every other branch reads it through {@link extractVersion}.
 *
 * @example
 * ```ts
 * import { matchesRange } from '@orkestrel/scaffold'
 *
 * matchesRange('^0.0.5', '0.0.5') // true
 * matchesRange('^0.0.5', '0.0.7') // false
 * matchesRange('~8.2.0', '8.2.4') // true
 * matchesRange('^7.58.12', '7.60.0') // true
 * matchesRange('not-a-range', 'not-a-range') // false
 * ```
 */
export function matchesRange(range: string, latest: string): boolean {
	if (!EXTRA_RANGE_PATTERN.test(range)) return false
	const operator = range.startsWith('^') || range.startsWith('~') ? range.slice(0, 1) : ''
	const declared = range.slice(operator.length)
	if (declared === latest) return true
	if (operator === '') return false
	const left = extractVersion(declared)
	const right = extractVersion(latest)
	if (left === undefined || right === undefined) return false
	if (left[0] !== right[0]) return false
	if (operator === '^' && left[0] === 0 && left[1] === 0) return false
	if ((operator === '~' || left[0] === 0) && left[1] !== right[1]) return false
	return compareVersions(latest, declared) >= 0
}

/**
 * Tests whether a declared engines floor is at or above the supported minimum.
 *
 * @param engines - The declared `engines.node` range.
 * @returns True if the range is the accepted syntax and its floor is at or above
 * `MINIMUM_NODE_VERSION`; false otherwise.
 *
 * @remarks
 * The declaration states a floor, so the comparison is against the oldest Node
 * the generated toolchain supports rather than against a published version. The
 * `>=` prefix is read here, so no caller repeats the offset.
 *
 * @example
 * ```ts
 * import { matchesEngines } from '@orkestrel/scaffold'
 *
 * matchesEngines('>=22.18.0') // true
 * matchesEngines('>=20.0.0') // false
 * matchesEngines('22.18.0') // false
 * ```
 */
export function matchesEngines(engines: string): boolean {
	if (!ENGINES_PATTERN.test(engines)) return false
	return compareVersions(engines.slice(2), MINIMUM_NODE_VERSION) >= 0
}

/**
 * Projects a package manifest's text to its own name.
 *
 * @param manifest - The `package.json` text.
 * @returns The declared name, or `undefined` when the text is oversized,
 * malformed, not an object, or carries no bounded string name.
 *
 * @remarks
 * Never throws: a manifest is a file a target owns, so unreadable is an answer
 * rather than a fault. The name is bounded by the registry's own package-name
 * ceiling, because it reaches a path through {@link nameToGuide}.
 *
 * @example
 * ```ts
 * import { manifestToName } from '@orkestrel/scaffold'
 *
 * manifestToName('{"name":"@orkestrel/router"}') // '@orkestrel/router'
 * manifestToName('{') // undefined
 * ```
 */
export function manifestToName(manifest: string): string | undefined {
	if (computeBytes(manifest) > MAX_MANIFEST_BYTES) return undefined
	const parsed = parseJSON(manifest)
	if (!isRecord(parsed)) return undefined
	const name = parsed.name
	if (!isString(name) || name.length === 0 || name.length > MAX_DEPENDENCY_NAME_LENGTH) {
		return undefined
	}
	return name
}

/**
 * Projects a package manifest's text to the `@orkestrel/*` packages each dependency
 * section declares.
 *
 * @param manifest - The `package.json` text.
 * @returns The runtime, development, and peer declarations as separate lists.
 *
 * @remarks
 * Every other name is skipped rather than refused: a workspace's unrelated
 * dependencies are not this package's to report on. Keeping the sections
 * separate prevents a caller from treating a peer as a writable floor.
 *
 * Never throws, and every row it returns satisfies `isDependency` while each
 * list satisfies `isCollection`, so the result crosses the compiler's own
 * boundary without a second cleaning.
 *
 * @example
 * ```ts
 * import { manifestToDependencies } from '@orkestrel/scaffold'
 *
 * manifestToDependencies('{"dependencies":{"@orkestrel/emitter":"^0.0.5","vite":"~8.2.0"}}')
 * // { runtime: [{ name: '@orkestrel/emitter', range: '^0.0.5' }], development: [], peer: [] }
 * ```
 */
export function manifestToDependencies(manifest: string): ManifestDependencySet {
	if (computeBytes(manifest) > MAX_MANIFEST_BYTES) {
		return { runtime: [], development: [], peer: [] }
	}
	const parsed = parseJSON(manifest)
	if (!isRecord(parsed)) return { runtime: [], development: [], peer: [] }
	const [runtime = [], development = [], peer = []] = [
		'dependencies',
		'devDependencies',
		'peerDependencies',
	].map((section): readonly Dependency[] => {
		const entries = parsed[section]
		return isRecord(entries)
			? Object.entries(entries).flatMap(([name, range]): readonly Dependency[] =>
					!DEPENDENCY_NAME_PATTERN.test(name) ||
					name.length > MAX_DEPENDENCY_NAME_LENGTH ||
					!isString(range) ||
					range.length === 0 ||
					range.length > MAX_RANGE_LENGTH
						? []
						: [{ name, range }],
				)
			: []
	})
	return {
		runtime: limitEntries(runtime, MAX_COLLECTION_ITEMS),
		development: limitEntries(development, MAX_COLLECTION_ITEMS),
		peer: limitEntries(peer, MAX_COLLECTION_ITEMS),
	}
}

/**
 * Renders the `SKILL.md` pointer a target carries in place of a canonical skill.
 *
 * @param canonical - The canonical `SKILL.md` text, which opens with a frontmatter block.
 * @param name - The skill directory name the pointer body names.
 * @returns The canonical frontmatter block copied line for line, from its opening `---` line through
 * its closing `---` line, then the filled `ARTIFACT_TEMPLATES.orchestration.skill` body, with `\n`
 * line endings; `undefined` when the canonical text does not open with a complete frontmatter block.
 *
 * @remarks
 * The frontmatter is copied rather than rewritten, so every harness that
 * discovers the pointer reads the canonical `name` and `description` and
 * triggers the skill exactly as the canonical file would. A CRLF canonical
 * text yields the same pointer as its LF form.
 *
 * @example
 * ```ts
 * import { renderSkillPointer } from '@orkestrel/scaffold'
 *
 * renderSkillPointer('---\nname: orkestrel-harden\ndescription: Hardens a package.\n---\n\n# Harden\n', 'orkestrel-harden')?.startsWith('---\nname: orkestrel-harden\ndescription: Hardens a package.\n---\n\n# Load the canonical skill\n') // true
 * renderSkillPointer('# Harden\n', 'orkestrel-harden') // undefined
 * ```
 */
export function renderSkillPointer(canonical: string, name: string): string | undefined {
	const lines = canonical.split(/\r\n|\n/u)
	if (lines[0] !== '---') return undefined
	const end = lines.indexOf('---', 1)
	if (end === -1) return undefined
	const frontmatter = lines.slice(0, end + 1).join('\n')
	return `${frontmatter}\n${fillTemplate(ARTIFACT_TEMPLATES.orchestration.skill, { name })}`
}

/**
 * Scans manifest text for its strings and object braces, in order.
 *
 * @param text - The manifest text to scan.
 * @returns One token per quoted string and per `{` or `}` outside a string, or
 * `undefined` when a string is never closed.
 *
 * @remarks
 * Native JSON validation owns syntax; this scan only locates the byte ranges an
 * in-place writer edits. A string is opaque, so a brace inside one is never read,
 * and a backslash escapes the character after it. Depth counts objects alone and
 * ignores arrays, exactly as the range writers count them, so a key nested inside
 * another object never reads as a top-level one. A string that a colon follows
 * carries `value`, the offset of the character after that colon and the
 * whitespace beside it.
 *
 * @example
 * ```ts
 * import { scanManifestTokens } from '@orkestrel/scaffold'
 *
 * scanManifestTokens('{"a": "b"}')?.length // 4
 * scanManifestTokens('{"a') // undefined
 * ```
 */
export function scanManifestTokens(text: string): readonly ManifestToken[] | undefined {
	const tokens: ManifestToken[] = []
	for (const match of text.matchAll(
		/(?<string>"(?:\\[\s\S]|[^"\\])*")(?<colon>\s*:\s*)?|[{}]|"/gu,
	)) {
		if (match[0] === '"') return undefined
		const literal = match.groups?.string
		const depth = (tokens.at(-1)?.depth ?? 0) + (match[0] === '{' ? 1 : match[0] === '}' ? -1 : 0)
		tokens.push(
			literal === undefined
				? { text: match[0], index: match.index, depth, value: undefined }
				: {
						text: literal,
						index: match.index,
						depth,
						value: match.groups?.colon === undefined ? undefined : match.index + match[0].length,
					},
		)
	}
	return tokens
}
