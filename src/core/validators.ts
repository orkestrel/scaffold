import type { Guard } from '@orkestrel/contract'
import type { EmitterHooks } from '@orkestrel/emitter'
import type {
	Artifact,
	Audit,
	Blueprint,
	CatalogEntry,
	CompilerEventMap,
	CompilerOptions,
	Dependency,
	Environment,
	Finding,
	Group,
	Mirror,
	Override,
	Plan,
	Question,
	Snapshot,
} from './types.js'
import {
	andOf,
	arrayOf,
	enumerableKeys,
	holds,
	isArray,
	isBoolean,
	isFunction,
	isRecord,
	isString,
	literalOf,
	recordOf,
	stringOf,
	unionOf,
} from '@orkestrel/contract'
import {
	CONTROL_CHARACTER_PATTERN,
	DEPENDENCY_NAME_PATTERN,
	ENVIRONMENTS,
	GROUPS,
	HEX_PATTERN,
	INVALID_PATH_CHARACTER_PATTERN,
	MANIFEST_PATH,
	MAX_ARTIFACT_BYTES,
	MAX_ARTIFACT_HEX_LENGTH,
	MAX_AUDIT_FINDINGS,
	MAX_COLLECTION_ITEMS,
	MAX_DEPENDENCY_NAME_LENGTH,
	MAX_NAME_LENGTH,
	MAX_PATH_LENGTH,
	MAX_RANGE_LENGTH,
} from './constants.js'

/**
 * Narrow a value to a logical target-relative path.
 *
 * @param value - The candidate path.
 * @returns `true` for a bounded relative path with no traversal, empty segment,
 * control character, or reserved syntax character.
 *
 * @remarks
 * Every path this package reads or writes passes here, so one law covers a
 * planned artifact, an override target, an audit finding, a guide mirror, and a
 * snapshot key. Rejecting `..`, a leading `/`, and a backslash at the guard is
 * what stops a caller-supplied path from naming a destination outside the
 * target. Host-location validation is a separate server boundary: this guard
 * does not reject a device spelling, a trailing dot or space, or a segment that
 * exceeds a host filesystem's byte ceiling.
 *
 * @example
 * ```ts
 * import { isPath } from '@orkestrel/scaffold'
 *
 * isPath('configs/src/tsconfig.core.json') // true
 * isPath('../secrets') // false
 * ```
 */
export function isPath(value: unknown): value is string {
	return holds(() => {
		if (!isString(value) || value.length === 0 || value.length > MAX_PATH_LENGTH) return false
		if (CONTROL_CHARACTER_PATTERN.test(value)) return false
		if (INVALID_PATH_CHARACTER_PATTERN.test(value)) return false
		for (const segment of value.split('/')) {
			if (segment === '' || segment === '.' || segment === '..') return false
		}
		return true
	})
}

/**
 * Narrow a value to exact lowercase hexadecimal bytes within one artifact's limit.
 *
 * @remarks
 * Two digits per byte, so an odd length is refused and empty content is valid.
 * The bound is exact rather than approximate: the encoding is ASCII, so the
 * string's length is twice the byte count it stands for.
 *
 * @example
 * ```ts
 * import { isHex } from '@orkestrel/scaffold'
 *
 * isHex('68690a') // true
 * isHex('68690A') // false
 * ```
 */
export const isHex: Guard<string> = stringOf({
	max: MAX_ARTIFACT_HEX_LENGTH,
	pattern: HEX_PATTERN,
})

/**
 * Narrow a value to text this package will accept as one artifact's content.
 *
 * @remarks
 * The bound is a code-unit ceiling rather than a byte count, because a string
 * of more code units than {@link MAX_ARTIFACT_BYTES} cannot encode within that
 * budget under any encoding this package writes. The exact UTF-8 measurement
 * belongs to the compiler and the writer, which are the places the bytes
 * are actually produced.
 */
export const isContent: Guard<string> = stringOf({ max: MAX_ARTIFACT_BYTES })

/**
 * Narrow a value to an array within the limit one public collection accepts.
 *
 * @param value - The candidate collection.
 * @returns `true` for an array of no more than `MAX_COLLECTION_ITEMS` items.
 *
 * @remarks
 * Compose this ahead of an element guard so the item count is settled before
 * anything walks the items. A hostile `length` accessor answers `false` here
 * rather than escaping as a thrown error.
 *
 * @example
 * ```ts
 * import { isCollection } from '@orkestrel/scaffold'
 *
 * isCollection(['manifest']) // true
 * isCollection('manifest') // false
 * ```
 */
export function isCollection(value: unknown): value is readonly unknown[] {
	return holds(() => isArray(value) && value.length <= MAX_COLLECTION_ITEMS)
}

/**
 * Narrow a value to one {@link Environment} a workspace may select.
 *
 * @example
 * ```ts
 * import { isEnvironment } from '@orkestrel/scaffold'
 *
 * isEnvironment('browser') // true
 * isEnvironment('worker') // false
 * ```
 */
export const isEnvironment: Guard<Environment> = literalOf(ENVIRONMENTS)

/**
 * Narrow a value to one {@link Group} a plan selects over.
 *
 * @example
 * ```ts
 * import { isGroup } from '@orkestrel/scaffold'
 *
 * isGroup('manifest') // true
 * isGroup('readme') // false
 * ```
 */
export const isGroup: Guard<Group> = literalOf(GROUPS)

/** Narrow a value to a bounded group selection. */
export const isGroups: Guard<readonly Group[]> = andOf(isCollection, arrayOf(isGroup))

/**
 * Narrow a value to the scoped package name a runtime dependency carries.
 *
 * @remarks
 * A dependency name reaches a path, because a workspace's guide mirror is
 * derived from it. Fixing the scope and admitting nothing but a bare name after
 * it is what keeps that derivation inside the directory the mirror belongs in.
 * A blueprint's development extras are deliberately wider and are measured by
 * the gate instead, which is why {@link isDependency} does not apply this.
 *
 * @example
 * ```ts
 * import { isDependencyName } from '@orkestrel/scaffold'
 *
 * isDependencyName('@orkestrel/router') // true
 * isDependencyName('@orkestrel/../etc') // false
 * ```
 */
export const isDependencyName: Guard<string> = stringOf({
	max: MAX_DEPENDENCY_NAME_LENGTH,
	pattern: DEPENDENCY_NAME_PATTERN,
})

/**
 * Narrow a value to a {@link Dependency}.
 *
 * @remarks
 * Structural and bounded: which names and ranges a blueprint may declare is a
 * gate law, reported as a {@link Question} carrying its accepted candidates, so
 * refusing it here would replace an answerable question with a bare `false`.
 *
 * @example
 * ```ts
 * import { isDependency } from '@orkestrel/scaffold'
 *
 * isDependency({ name: '@orkestrel/emitter', range: '^0.0.5' }) // true
 * isDependency({ name: '@orkestrel/emitter' }) // false
 * ```
 */
export const isDependency: Guard<Dependency> = recordOf(
	{
		name: stringOf({ min: 1, max: MAX_DEPENDENCY_NAME_LENGTH }),
		range: stringOf({ min: 1, max: MAX_RANGE_LENGTH }),
		optional: isBoolean,
	},
	['optional'],
)

/**
 * Narrow a value to an {@link Override}.
 *
 * @remarks
 * Whether the path names a planned artifact is a gate law; whether it names a
 * destination at all is this guard's.
 *
 * @example
 * ```ts
 * import { isOverride } from '@orkestrel/scaffold'
 *
 * isOverride({ path: 'README.md', content: '# Title\n' }) // true
 * ```
 */
export const isOverride: Guard<Override> = recordOf({ path: isPath, content: isContent })

/**
 * Narrow a value to a {@link Blueprint}.
 *
 * @remarks
 * The whole closed record, its literal axes, and the count and length bounds
 * this package admits. The syntactic laws over a name, a version, a range, and
 * an engines floor stay with the gate, which reports each one as a
 * {@link Question} instead of refusing the value outright.
 *
 * @example
 * ```ts
 * import { isBlueprint } from '@orkestrel/scaffold'
 *
 * isBlueprint({ name: 'router', src: ['core'] }) // false — not the whole record
 * ```
 */
export const isBlueprint: Guard<Blueprint> = recordOf(
	{
		name: stringOf({ min: 1, max: MAX_NAME_LENGTH }),
		description: isString,
		keywords: andOf(isCollection, arrayOf(isString)),
		src: andOf(isCollection, arrayOf(isEnvironment)),
		app: andOf(isCollection, arrayOf(isEnvironment)),
		dependencies: andOf(isCollection, arrayOf(isDependency)),
		peers: andOf(isCollection, arrayOf(isDependency)),
		extras: andOf(isCollection, arrayOf(isDependency)),
		version: isString,
		engines: isString,
		overrides: andOf(isCollection, arrayOf(isOverride)),
		bin: isBoolean,
		setup: isBoolean,
		guides: isBoolean,
		distribution: isBoolean,
		integration: isBoolean,
		conformance: isBoolean,
		service: isBoolean,
		vendors: andOf(isCollection, arrayOf(isString)),
		global: isBoolean,
		showcase: isBoolean,
	},
	['description'],
)

/**
 * Narrow a value to an {@link Artifact}.
 *
 * @remarks
 * One branch per way content is produced, discriminated by `origin` and
 * narrowed by `ownership`. Each branch declares only the keys its branch has,
 * so a host artifact carrying `content`, a hydrated artifact carrying anything
 * but `content` ownership, and a template artifact carrying `hex` are all
 * refused rather than admitted to the wrong branch.
 *
 * @example
 * ```ts
 * import { isArtifact } from '@orkestrel/scaffold'
 *
 * isArtifact({ path: 'AGENTS.md', group: 'docs', ownership: 'presence', origin: 'host' }) // true
 * ```
 */
export const isArtifact: Guard<Artifact> = unionOf(
	recordOf(
		{
			path: isPath,
			group: isGroup,
			ownership: literalOf('presence', 'birth'),
			environment: isEnvironment,
			origin: literalOf('host'),
			source: isPath,
		},
		['environment', 'source'],
	),
	recordOf(
		{
			path: isPath,
			group: isGroup,
			ownership: literalOf('content'),
			environment: isEnvironment,
			origin: literalOf('host'),
			source: isPath,
			hex: isHex,
		},
		['environment', 'source'],
	),
	recordOf(
		{
			path: isPath,
			group: isGroup,
			ownership: literalOf('content', 'presence', 'birth'),
			environment: isEnvironment,
			origin: literalOf('template', 'computed'),
			content: isContent,
		},
		['environment'],
	),
)

/**
 * Narrow a value to a {@link Plan}.
 *
 * @remarks
 * A plan reaches the writer, and the writer has no question channel, so this
 * carries the whole law of the value: every artifact path, every claimed byte,
 * and the blueprint it was compiled from. An artifact at {@link MANIFEST_PATH}
 * must carry `birth` ownership. A plan claiming `content` or `presence` there
 * is refused because the compiler emits the manifest only as birth-owned.
 */
export const isPlan: Guard<Plan> = andOf(
	recordOf(
		{
			blueprint: isBlueprint,
			groups: isGroups,
			artifacts: andOf(isCollection, arrayOf(isArtifact)),
			hash: isHex,
		},
		['hash'],
	),
	(plan: Plan) =>
		plan.artifacts.every(
			(artifact) => artifact.path !== MANIFEST_PATH || artifact.ownership === 'birth',
		),
)

/**
 * Narrow a value to a {@link Question}.
 *
 * @example
 * ```ts
 * import { isQuestion } from '@orkestrel/scaffold'
 *
 * isQuestion({ field: 'src', message: 'Unknown environment', blocking: true }) // true
 * ```
 */
export const isQuestion: Guard<Question> = recordOf(
	{
		field: isString,
		message: isString,
		blocking: isBoolean,
		candidates: andOf(isCollection, arrayOf(isString)),
	},
	['candidates'],
)

/**
 * Narrow a value to a {@link Finding}.
 *
 * @remarks
 * `observed` is required exactly where the mutation it precedes is held to it,
 * absent where the destination had no bytes to record, and optional where the
 * comparison may not have been made. Planned findings require `ownership`;
 * foreign findings forbid it because no artifact was planned for their path.
 *
 * That is the whole claim. This guard proves the shape a reader may destructure
 * and nothing about whether the verdict is one an audit could have reached: the
 * correlation between `ownership`, `drift`, and `observed` belongs to
 * {@link inferDrift}, and it is re-derived at the verb that acts on the finding.
 */
export const isFinding: Guard<Finding> = unionOf(
	recordOf({
		path: isPath,
		group: isGroup,
		ownership: literalOf('content', 'presence', 'birth'),
		drift: literalOf('stale'),
		observed: isHex,
	}),
	recordOf({
		path: isPath,
		group: isGroup,
		drift: literalOf('foreign'),
		observed: isHex,
	}),
	recordOf({
		path: isPath,
		group: isGroup,
		ownership: literalOf('content', 'presence', 'birth'),
		drift: literalOf('missing'),
	}),
	recordOf(
		{
			path: isPath,
			group: isGroup,
			ownership: literalOf('content', 'presence', 'birth'),
			drift: literalOf('aligned'),
			observed: isHex,
		},
		['observed'],
	),
)

/**
 * Narrow a value to an {@link Audit}.
 *
 * @remarks
 * An audit reaches the writer and the destructive verb, so it is guarded as
 * strictly as the plan beside it. Findings use the sum of the producer
 * bounds: one per planned artifact, then one per unplanned snapshot path.
 */
export const isAudit: Guard<Audit> = recordOf({
	findings: andOf(
		(value: unknown): value is readonly unknown[] =>
			holds(() => isArray(value) && value.length <= MAX_AUDIT_FINDINGS),
		arrayOf(isFinding),
	),
	questions: andOf(isCollection, arrayOf(isQuestion)),
})

/**
 * Narrow a value to a {@link Mirror}.
 *
 * @remarks
 * `content` is the fetched guide text and `observed` is the local mirror's
 * exact bytes, so they carry different laws: one is content this package
 * writes, the other is the precondition that write is held to.
 */
export const isMirror: Guard<Mirror> = unionOf(
	recordOf(
		{
			name: isDependencyName,
			path: isPath,
			lookup: literalOf('found'),
			content: isContent,
			observed: isHex,
		},
		['observed'],
	),
	recordOf(
		{
			name: isDependencyName,
			path: isPath,
			lookup: literalOf('missing', 'unmatched', 'failed'),
			note: isString,
			observed: isHex,
		},
		['observed'],
	),
)

/**
 * Narrow a value to a {@link CatalogEntry}.
 *
 * @remarks
 * A row that found no version carries the cause instead, and neither branch may
 * carry the other's field.
 */
export const isCatalogEntry: Guard<CatalogEntry> = unionOf(
	recordOf({
		name: isDependencyName,
		lookup: literalOf('found'),
		version: isString,
		dependencies: andOf(isCollection, arrayOf(isDependency)),
	}),
	recordOf({
		name: isDependencyName,
		lookup: literalOf('missing', 'unmatched', 'failed'),
		note: isString,
	}),
)

/**
 * Narrow a value to a {@link Snapshot}.
 *
 * @param value - The candidate target snapshot.
 * @returns `true` for a bounded plain record whose every key is a path and
 * whose every value is exact lowercase hexadecimal bytes.
 *
 * @remarks
 * Read through the shared total key lens, so a hostile `ownKeys` trap and a
 * throwing accessor both answer `false` rather than escaping. There is no
 * dictionary combinator upstream to compose this from: the key law and the
 * value law are both this package's own.
 *
 * @example
 * ```ts
 * import { isSnapshot } from '@orkestrel/scaffold'
 *
 * isSnapshot({ 'AGENTS.md': '68690a' }) // true
 * isSnapshot({ 'AGENTS.md': 'hi' }) // false
 * ```
 */
export function isSnapshot(value: unknown): value is Snapshot {
	return holds(() => {
		if (!isRecord(value)) return false
		const keys = enumerableKeys(value)
		if (keys === undefined || keys.length > MAX_COLLECTION_ITEMS) return false
		for (const key of keys) {
			if (!isPath(key) || !isHex(value[key])) return false
		}
		return true
	})
}

/**
 * Narrow a value to the compiler's initial listener record.
 *
 * @remarks
 * Every event is optional and every declared value is a function. A key outside
 * the compiler's event map is refused, so a listener wired to a misspelled
 * event fails at construction instead of never firing.
 */
export const isCompilerHooks: Guard<EmitterHooks<CompilerEventMap>> = recordOf(
	{
		compile: isFunction,
		audit: isFunction,
		block: isFunction,
		error: isFunction,
		destroy: isFunction,
	},
	true,
)

/**
 * Narrow a value to {@link CompilerOptions}.
 *
 * @example
 * ```ts
 * import { isCompilerOptions } from '@orkestrel/scaffold'
 *
 * isCompilerOptions({}) // true
 * isCompilerOptions({ retries: 2 }) // false
 * ```
 */
export const isCompilerOptions: Guard<CompilerOptions> = recordOf(
	{ on: isCompilerHooks, error: isFunction },
	true,
)
