import type {
	Artifact,
	CatalogEntry,
	Dependency,
	Drift,
	Finding,
	Group,
	Ownership,
	Plan,
	PlanSummary,
} from './types.js'
import { compareValues, isRecord, isString, limitEntries, parseJSON } from '@orkestrel/contract'
import {
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
} from './constants.js'

/**
 * Encode bytes as exact lowercase hexadecimal text.
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
	let hex = ''
	for (const byte of bytes) hex += byte.toString(16).padStart(2, '0')
	return hex
}

/**
 * Encode text as the exact lowercase hexadecimal form of its UTF-8 bytes.
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
 * Count the UTF-8 bytes text encodes to.
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
	let bytes = 0
	for (const character of content) {
		const code = character.codePointAt(0) ?? 0
		bytes += code <= 0x7f ? 1 : code <= 0x7ff ? 2 : code <= 0xffff ? 3 : 4
	}
	return bytes
}

/**
 * Compute the deterministic content identity of text.
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
	let hash = 0xcbf29ce484222325n
	for (let index = 0; index < text.length; index += 1) {
		hash = BigInt.asUintN(64, (hash ^ BigInt(text.charCodeAt(index))) * 0x100000001b3n)
	}
	return hash.toString(16).padStart(16, '0')
}

/**
 * Test whether a path instructs or wires an agent rather than the toolchain.
 *
 * @param path - The target-relative path to test.
 * @returns `true` when the path is beneath a harness directory or is one of the
 * exact root filenames that wires an agent bench.
 *
 * @remarks
 * The one home of the orchestration membership rule. A vendored path and a
 * foreign path found in a target are both classified through here, so a new
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
 * Infer the {@link Group} a path belongs to.
 *
 * @param path - The target-relative path to classify.
 * @returns The group that owns the path.
 *
 * @remarks
 * A path is grouped by what it governs rather than by where it sits. The two
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
	// The licence and the root instruction documents are the workspace's own prose.
	if (path === 'LICENSE') return 'docs'
	if (!path.includes('/') && path.endsWith('.md')) return 'docs'
	return 'configs'
}

/**
 * Serialize one string as a single-quoted TypeScript literal.
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
	let serialized = "'"
	for (let index = 0; index < value.length; index += 1) {
		const code = value.charCodeAt(index)
		const character = value.charAt(index)
		if (character === "'") serialized += "\\'"
		else if (character === '\\') serialized += '\\\\'
		else if (character === '\b') serialized += '\\b'
		else if (character === '\f') serialized += '\\f'
		else if (character === '\n') serialized += '\\n'
		else if (character === '\r') serialized += '\\r'
		else if (character === '\t') serialized += '\\t'
		else if (code === 0x2028) serialized += '\\u2028'
		else if (code === 0x2029) serialized += '\\u2029'
		else if (code < 0x20 || (code >= 0xd800 && code <= 0xdfff)) {
			const next = value.charCodeAt(index + 1)
			if (code >= 0xd800 && code <= 0xdbff && next >= 0xdc00 && next <= 0xdfff) {
				serialized += `${character}${value.charAt(index + 1)}`
				index += 1
			} else serialized += `\\u${code.toString(16).padStart(4, '0')}`
		} else serialized += character
	}
	return `${serialized}'`
}

/**
 * Derive the guide mirror path a package name answers for.
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
 * Test whether one emitted line fits the vendored formatter width.
 *
 * @param line - One emitted line, leading tabs included.
 * @returns `true` when the expanded line fits.
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
 * Derive the declaration rewrite a published face's `beforeWriteFile` applies.
 *
 * @param name - The workspace's own bare package name.
 * @returns The ternary consequent an emitted `vite.{browser,server}.config.ts`
 * fills its `{{replacement}}` span with, indented for that span.
 *
 * @remarks
 * `vite-plugin-dts` rolls a face into one declaration and keeps each source
 * module's own relative depth, so a nested module emits a path that escapes
 * `dist/src` and a flat one resolves only by luck. Both faces rewrite the same
 * relative core path to the package's published root export, so the branch is
 * derived once here. The extension alternation is what the two permitted import
 * spellings produce: an `@src/core` alias resolves to the core source module and
 * prints `.ts`, while a relative import prints the `.js` specifier it was
 * written with. The formatter keeps the call on one line only while the line it
 * prints measures inside the vendored width, and the workspace name is what
 * varies, so the shape is chosen by measuring the candidate: a tab prints as the
 * vendored two columns, and the gate admits a name long enough to push the
 * joined call past 100.
 *
 * @example
 * ```ts
 * import { nameToRewrite } from '@orkestrel/scaffold'
 *
 * nameToRewrite('router').includes("'@orkestrel/router'") // true
 * ```
 */
export function nameToRewrite(name: string): string {
	const specifier = serializeTypeScriptString(`@orkestrel/${name}`)
	const pattern = '/(?:\\.\\.\\/)+core\\/index\\.[jt]s/g'
	const joined = `\t\t\t\t\t\t? content.replaceAll(${pattern}, ${specifier})`
	if (matchesPrintWidth(joined)) return joined
	return [
		'\t\t\t\t\t\t? content.replaceAll(',
		`\t\t\t\t\t\t\t\t${pattern},`,
		`\t\t\t\t\t\t\t\t${specifier},`,
		'\t\t\t\t\t\t\t)',
	].join('\n')
}

/**
 * Select the host paths a named workspace vendors.
 *
 * @param paths - The candidate host paths, in their declared order.
 * @param name - The target workspace's own bare package name.
 * @returns Every candidate except the workspace's own guide, in input order.
 *
 * @remarks
 * `HOST_PATHS` is a candidate set rather than a plan, because a workspace never
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
 * Select the groups a compile covers, in plan order.
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
 * Project an artifact to the exact bytes it claims, as hexadecimal.
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
 * Infer how one target path compares to the artifact planned for it.
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
 * Test whether {@link inferDrift} could have produced a finding for an ownership.
 *
 * @param ownership - What scaffold claims at the planned path.
 * @param finding - The audit verdict to test.
 * @returns Whether the ownership and verdict are reachable through {@link inferDrift}.
 *
 * @remarks
 * This predicate keeps the comparison law beside the reachability law it
 * restates. A mutation uses it so a refusal can distinguish an impossible
 * verdict from a target that genuinely moved after its audit.
 */
export function matchesDriftReachability(ownership: Ownership, finding: Finding): boolean {
	if (finding.drift === 'aligned') return ownership === 'birth' || finding.observed !== undefined
	if (finding.drift === 'missing') return ownership !== 'birth'
	return finding.drift === 'stale' && ownership === 'content'
}

/**
 * Project a catalog into the layers it publishes in.
 *
 * @param entries - The catalog rows to order.
 * @returns One layer per round, each holding the names publishable together,
 * sorted within the layer; a name whose edges never resolve is omitted.
 *
 * @remarks
 * A layer is a deterministic function of the catalog's own edges, so it is
 * computed here rather than stored on a row that could disagree with them.
 * Only RUNTIME edges between catalogued packages count: a development
 * dependency reaches no consumer, so it constrains nothing about publish order,
 * and an edge leaving the fleet is a package this catalog does not publish.
 *
 * The order matters because these packages are `0.0.x`, where a caret pins one
 * exact release. Publishing a dependent before its dependency leaves the
 * dependent pinned to the older release, and two ranges that disagree install
 * two copies of one package that the compiler reads as two distinct types.
 *
 * A cycle cannot be published in rounds, so its members are omitted rather than
 * placed in an order that would be wrong. An absent name is the report: compare
 * the returned names against the catalog to find one.
 *
 * @example
 * ```ts
 * import { catalogToLayers } from '@orkestrel/scaffold'
 *
 * catalogToLayers(entries)[0] // the names that depend on nothing in the fleet
 * ```
 */
export function catalogToLayers(
	entries: readonly CatalogEntry[],
): ReadonlyArray<readonly string[]> {
	const published = new Set(
		entries.filter((entry) => entry.lookup === 'found').map((entry) => entry.name),
	)
	const pending = new Map<string, Set<string>>()
	for (const entry of entries) {
		if (entry.lookup !== 'found') continue
		const edges = entry.dependencies.map((dependency) => dependency.name)
		pending.set(entry.name, new Set(edges.filter((name) => published.has(name))))
	}
	const layers: string[][] = []
	while (pending.size > 0) {
		const ready = [...pending].filter(([, edges]) => edges.size === 0).map(([name]) => name)
		if (ready.length === 0) break
		for (const name of ready) pending.delete(name)
		for (const edges of pending.values()) for (const name of ready) edges.delete(name)
		layers.push(ready.sort())
	}
	return layers
}

/**
 * Project a plan into its tally by artifact origin.
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
	let host = 0
	let template = 0
	let computed = 0
	for (const artifact of plan.artifacts) {
		if (artifact.origin === 'host') host += 1
		else if (artifact.origin === 'template') template += 1
		else computed += 1
	}
	return {
		name: plan.blueprint.name,
		src: plan.blueprint.src,
		app: plan.blueprint.app,
		groups: plan.groups,
		host,
		template,
		computed,
	}
}

/**
 * Extract the three numeric components of an exact version.
 *
 * @param version - The candidate version text.
 * @returns The major, minor, and patch numbers, or `undefined` when the text is
 * not the exact three-component syntax.
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
 * Compare two versions by their numeric components.
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
	for (let index = 0; index < first.length; index += 1) {
		const order = compareValues(first[index] ?? 0, second[index] ?? 0)
		if (order !== 0) return order
	}
	return 0
}

/**
 * Test whether a declared range already admits a published version.
 *
 * @param range - The declared dependency range.
 * @param latest - The version the registry reported as latest.
 * @returns `true` when the range admits that version.
 *
 * @remarks
 * The one place this comparison is made. A `Release` records the declared range
 * and the reported version and stores no verdict beside them, because a stored
 * verdict could only disagree with the two fields it sits next to.
 *
 * Readability is decided first, and it is `EXTRA_RANGE_PATTERN`: an optional
 * caret or tilde over three numeric components and an optional prerelease
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
 * Test whether a declared engines floor is at or above the supported minimum.
 *
 * @param engines - The declared `engines.node` range.
 * @returns `true` when the range is the accepted syntax and its floor is at or
 * above `MINIMUM_NODE_VERSION`.
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
 * matchesEngines('>=22.12.0') // true
 * matchesEngines('>=20.0.0') // false
 * matchesEngines('22.12.0') // false
 * ```
 */
export function matchesEngines(engines: string): boolean {
	if (!ENGINES_PATTERN.test(engines)) return false
	return compareVersions(engines.slice(2), MINIMUM_NODE_VERSION) >= 0
}

/**
 * Project a package manifest's text to its own name.
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
 * Project a package manifest's text to the `@orkestrel/*` packages it declares.
 *
 * @param manifest - The `package.json` text.
 * @returns One dependency per declared `@orkestrel` package, in section order,
 * with the first declaration of a repeated name winning.
 *
 * @remarks
 * Runtime, development, and peer sections are read in that order, because a
 * package the fleet publishes is upstream of this workspace wherever it is
 * declared. Every other name is skipped rather than refused: a workspace's
 * unrelated dependencies are not this package's to report on.
 *
 * Never throws, and every row it returns satisfies `isDependency` while the
 * list satisfies `isCollection`, so the result crosses the compiler's own
 * boundary without a second cleaning.
 *
 * @example
 * ```ts
 * import { manifestToDependencies } from '@orkestrel/scaffold'
 *
 * manifestToDependencies('{"dependencies":{"@orkestrel/emitter":"^0.0.5","vite":"~8.2.0"}}')
 * // [{ name: '@orkestrel/emitter', range: '^0.0.5' }]
 * ```
 */
export function manifestToDependencies(manifest: string): readonly Dependency[] {
	if (computeBytes(manifest) > MAX_MANIFEST_BYTES) return []
	const parsed = parseJSON(manifest)
	if (!isRecord(parsed)) return []
	const dependencies: Dependency[] = []
	const seen = new Set<string>()
	for (const section of ['dependencies', 'devDependencies', 'peerDependencies']) {
		const entries = parsed[section]
		if (!isRecord(entries)) continue
		for (const [name, range] of Object.entries(entries)) {
			if (seen.has(name)) continue
			if (!DEPENDENCY_NAME_PATTERN.test(name) || name.length > MAX_DEPENDENCY_NAME_LENGTH) continue
			if (!isString(range) || range.length === 0 || range.length > MAX_RANGE_LENGTH) continue
			seen.add(name)
			dependencies.push({ name, range })
		}
	}
	return limitEntries(dependencies, MAX_COLLECTION_ITEMS)
}
