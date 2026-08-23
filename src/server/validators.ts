import type { Guard } from '@orkestrel/contract'
import type { EmitterHooks } from '@orkestrel/emitter'
import type { CatalogEntry, Dependency, ManifestRegionSet, Mirror } from '@src/core'
import type {
	Host,
	HostManifest,
	ManifestEntry,
	MaterializerEventMap,
	MaterializerOptions,
	Worktree,
	UpstreamEventMap,
	UpstreamOptions,
} from './types.js'
import {
	andOf,
	arrayOf,
	boundsOf,
	holds,
	isArray,
	isBoolean,
	isFunction,
	isInteger,
	isString,
	recordOf,
	stringOf,
	unionOf,
} from '@orkestrel/contract'
import {
	computeBytes,
	CONTROL_CHARACTER_PATTERN,
	isCatalogEntry,
	isCollection,
	isDependency,
	isDependencyName,
	isManifestScript,
	isMirror,
	isPath,
	isSnapshot,
	MAX_ARTIFACT_BYTES,
	MAX_PATH_LENGTH,
	MAX_TOTAL_ARTIFACT_BYTES,
} from '@src/core'
import {
	BRANCH_PATTERN,
	DIGEST_PATTERN,
	DRIVE_PATTERN,
	INVALID_SEGMENT_CHARACTER_PATTERN,
	MAX_BRANCH_LENGTH,
	MAX_ENDPOINT_LENGTH,
	MAX_INVENTORY_PATHS,
	MAX_PATH_DEPTH,
	MAX_PATH_SEGMENT_BYTES,
	MAX_UPSTREAM_CONCURRENCY,
	MAX_UPSTREAM_RETRIES,
	MAX_UPSTREAM_TIMEOUT,
	RESERVED_SEGMENT_PATTERN,
} from './constants.js'

/**
 * Narrow a value to a path naming a location on this host.
 *
 * @param value - The candidate host path.
 * @returns `true` for a bounded absolute or relative path whose every segment is
 * portable across the supported filesystems.
 *
 * @remarks
 * The counterpart to the core path law, not a copy of it. A target directory and
 * the vendored host root are locations on the machine rather than paths inside a
 * workspace, so a drive prefix, a UNC share, and a backslash separator are all
 * admitted here and `..` is a legitimate way to name a sibling directory.
 * Containment is still enforced, but by the core law over the artifact paths
 * written beneath the target, not by this one.
 *
 * What it does refuse is a segment no supported filesystem can hold: an empty
 * one, a reserved Windows device name, a trailing dot or space, a wildcard or
 * redirection character, a colon anywhere but the drive prefix, and a name past
 * the byte ceiling. The character ceiling is read first so an oversized string is
 * refused before it is split.
 *
 * The spellings of an empty segment are answered differently. A trailing
 * separator terminates a directory rather than opening a segment, and every
 * supported filesystem and every Node path API reads `project/` and `project` as
 * one location, so it is admitted. A doubled separator is a genuine empty
 * segment, so `project//src` is refused. Nothing normalizes the argument first —
 * every server entry point guards the caller's text and resolves it afterwards —
 * so a directory taken from a shell completion arrives carrying the separator the
 * shell appended and names the directory it appears to name.
 *
 * @example
 * ```ts
 * import { isFilesystemPath } from '@orkestrel/scaffold/server'
 *
 * isFilesystemPath('C:/Users/sample/project') // true
 * isFilesystemPath('../sibling') // true
 * isFilesystemPath('project/') // true
 * isFilesystemPath('project//src') // false
 * isFilesystemPath('project/nul') // false
 * ```
 */
export function isFilesystemPath(value: unknown): value is string {
	return holds(() => {
		if (!isString(value) || value.length === 0 || value.length > MAX_PATH_LENGTH) return false
		if (CONTROL_CHARACTER_PATTERN.test(value)) return false
		const normalized = value.replaceAll('\\', '/')
		// A UNC share and a POSIX root are prefixes rather than segments, so the
		// root comes off before the segment law applies to what remains.
		const rooted = normalized.startsWith('//')
			? normalized.slice(2)
			: normalized.startsWith('/')
				? normalized.slice(1)
				: normalized
		// A trailing separator terminates a directory rather than opening a segment,
		// and every supported filesystem and every Node path API reads the
		// spellings as one location. A doubled separator is a genuine empty segment
		// and stays refused below.
		const segments = (rooted.endsWith('/') ? rooted.slice(0, -1) : rooted).split('/')
		if (segments.length > MAX_PATH_DEPTH) return false
		for (const [index, segment] of segments.entries()) {
			if (segment === '.' || segment === '..') continue
			if (index === 0 && DRIVE_PATTERN.test(segment)) continue
			if (segment.length === 0) return false
			if (INVALID_SEGMENT_CHARACTER_PATTERN.test(segment)) return false
			if (segment.endsWith('.') || segment.endsWith(' ')) return false
			if (computeBytes(segment) > MAX_PATH_SEGMENT_BYTES) return false
			if (RESERVED_SEGMENT_PATTERN.test(segment)) return false
		}
		return true
	})
}

/**
 * Narrow a value to one exact SHA-256 digest.
 *
 * @remarks
 * The identity a vendored host manifest and a write precondition are both stated
 * in. Fixed at sixty-four lowercase digits, so the value either is a digest of
 * that algorithm or is refused; there is no shorter or longer accepted form.
 *
 * @example
 * ```ts
 * import { isDigest } from '@orkestrel/scaffold/server'
 *
 * isDigest('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855') // true
 * isDigest('E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855') // false
 * ```
 */
export const isDigest: Guard<string> = stringOf({ pattern: DIGEST_PATTERN })

/**
 * Narrow a value to a working-tree inventory within the limit one target may report.
 *
 * @param value - The candidate inventory.
 * @returns `true` for an array of no more than `MAX_INVENTORY_PATHS` items.
 *
 * @remarks
 * Compose this ahead of an element guard exactly as the core collection guard is
 * composed, and for the same reason: the item count is settled before anything
 * walks the items, and a hostile `length` accessor answers `false` rather than
 * escaping as a throw. It exists beside that guard rather than reusing it
 * because they bound different things — one bounds what a caller may hand a
 * public method, this one bounds what a checkout may contain.
 *
 * @example
 * ```ts
 * import { isInventory } from '@orkestrel/scaffold/server'
 *
 * isInventory(['AGENTS.md']) // true
 * isInventory('AGENTS.md') // false
 * ```
 */
export function isInventory(value: unknown): value is readonly unknown[] {
	return holds(() => isArray(value) && value.length <= MAX_INVENTORY_PATHS)
}

/**
 * Narrow a value to a bounded upstream endpoint.
 *
 * @remarks
 * Length only. Which schemes and hosts an endpoint may name is the reader's law,
 * because it builds the request and can report why one was refused, where a
 * guard has only `false` to say.
 */
export const isEndpoint: Guard<string> = stringOf({ min: 1, max: MAX_ENDPOINT_LENGTH })

/**
 * Narrow a value to a Git branch the repository endpoint accepts.
 *
 * @remarks
 * A branch reaches the repository URL's path, so the syntax is closed rather than
 * merely bounded and no `..` is admitted anywhere in it.
 *
 * @example
 * ```ts
 * import { isBranch } from '@orkestrel/scaffold/server'
 *
 * isBranch('main') // true
 * isBranch('main/../etc') // false
 * ```
 */
export const isBranch: Guard<string> = stringOf({
	min: 1,
	max: MAX_BRANCH_LENGTH,
	pattern: BRANCH_PATTERN,
})

/**
 * Narrow a value to a per-request timeout in milliseconds.
 *
 * @remarks
 * A whole number of milliseconds, at least one and no more than
 * {@link MAX_UPSTREAM_TIMEOUT}. Zero is refused because a request that may not
 * take any time is a request that cannot succeed.
 */
export const isTimeout: Guard<number> = andOf(isInteger, boundsOf(1, MAX_UPSTREAM_TIMEOUT))

/**
 * Narrow a value to a bounded list of `@orkestrel` package names.
 *
 * @remarks
 * Composed from the core collection and dependency-name guards rather than
 * restated, so the scope law that keeps a derived guide mirror inside its
 * directory has exactly one home.
 *
 * @example
 * ```ts
 * import { isDependencyNames } from '@orkestrel/scaffold/server'
 *
 * isDependencyNames(['@orkestrel/router']) // true
 * isDependencyNames(['router']) // false
 * ```
 */
export const isDependencyNames: Guard<readonly string[]> = andOf(
	isCollection,
	arrayOf(isDependencyName),
)

/**
 * Narrow a value to a bounded list of target-relative paths.
 *
 * @remarks
 * Composed from the core collection and path guards rather than restated, so
 * the containment law that keeps a caller-supplied path inside its target has
 * exactly one home. It bounds what a caller may hand a public method, which is
 * why it is not {@link isInventory}: that one bounds what a checkout may hold.
 *
 * @example
 * ```ts
 * import { isPaths } from '@orkestrel/scaffold/server'
 *
 * isPaths(['AGENTS.md']) // true
 * isPaths(['../secrets']) // false
 * ```
 */
export const isPaths: Guard<readonly string[]> = andOf(isCollection, arrayOf(isPath))

/** Narrow a value to a bounded list of declared runtime dependencies. */
export const isDependencies: Guard<readonly Dependency[]> = andOf(
	isCollection,
	arrayOf(isDependency),
)

/**
 * Narrow a value to one {@link ManifestRegionSet}.
 *
 * @remarks
 * The whole closed record a manifest-writing method accepts, so a caller
 * naming a region the writer does not carry is refused before any byte moves.
 * Each region is bounded by the same collection law its own list guard applies.
 *
 * @example
 * ```ts
 * import { isManifestRegionSet } from '@orkestrel/scaffold/server'
 *
 * isManifestRegionSet({ pins: { runtime: [], development: [] }, scripts: [] }) // true
 * isManifestRegionSet({ pins: { runtime: [], development: [] } }) // false
 * ```
 */
export const isManifestRegionSet: Guard<ManifestRegionSet> = recordOf({
	pins: recordOf({ runtime: isDependencies, development: isDependencies }),
	scripts: andOf(isCollection, arrayOf(isManifestScript)),
})

/** Narrow a value to a bounded list of fetched guide mirrors. */
export const isMirrors: Guard<readonly Mirror[]> = andOf(isCollection, arrayOf(isMirror))

/** Narrow a value to a bounded list of fleet catalog rows. */
export const isCatalogEntries: Guard<readonly CatalogEntry[]> = andOf(
	isCollection,
	arrayOf(isCatalogEntry),
)

/**
 * Narrow a value to one {@link ManifestEntry}.
 *
 * @remarks
 * Both paths are measured by the core path law, because a vendored host's
 * storage name and the destination it maps to are each a path inside a
 * workspace. That is what stops a hand-edited manifest from mapping a vendored
 * file to a destination outside the target.
 *
 * @example
 * ```ts
 * import { isManifestEntry } from '@orkestrel/scaffold/server'
 *
 * isManifestEntry({
 *   storage: 'AGENTS.md',
 *   destination: 'AGENTS.md',
 *   executable: false,
 *   digest: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
 * }) // true
 * ```
 */
export const isManifestEntry: Guard<ManifestEntry> = recordOf({
	storage: isPath,
	destination: isPath,
	executable: isBoolean,
	digest: isDigest,
})

/**
 * Narrow a value to one {@link HostManifest}.
 *
 * @remarks
 * The manifest is read from a directory a caller named, so it is the least
 * trusted value the server face handles and is guarded whole: every entry, every
 * declared root, and the digest that authenticates their membership.
 */
export const isHostManifest: Guard<HostManifest> = recordOf({
	entries: andOf(isCollection, arrayOf(isManifestEntry)),
	roots: andOf(isCollection, arrayOf(isPath)),
	digest: isDigest,
})

/**
 * Narrow a value to one {@link Host}.
 *
 * @remarks
 * A whole vendored host handed in as a value is as untrusted as one read from a
 * directory a caller named, so both halves are guarded: the manifest by the same
 * membership law a read root is held to, and the bytes by the core snapshot law,
 * which bounds the fill and reads every key as a path and every value as exact
 * lowercase hexadecimal. Whether those halves agree with each other is the
 * reader's question rather than this one's, because a guard has only `false` to
 * say and a mismatch has a path to name.
 *
 * @example
 * ```ts
 * import { isHost } from '@orkestrel/scaffold/server'
 *
 * const digest = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
 *
 * isHost({ manifest: { entries: [], roots: [], digest }, bytes: {} }) // true
 * isHost({ manifest: { entries: [], roots: [], digest } }) // false
 * ```
 */
export const isHost: Guard<Host> = recordOf({ manifest: isHostManifest, bytes: isSnapshot })

/**
 * Narrow a value to a {@link Worktree}.
 *
 * @remarks
 * Both path lists are target-relative, so both are measured by the core path
 * law: a reported path that is not one this package could have planned is not a
 * path it will delete. The inventory guard bounds the lists, because a checkout
 * is legitimately far larger than any collection a caller hands a method.
 *
 * @example
 * ```ts
 * import { isWorktree } from '@orkestrel/scaffold/server'
 *
 * isWorktree({ tracked: ['AGENTS.md'], dirty: [] }) // true
 * isWorktree({ tracked: ['../secrets'], dirty: [] }) // false
 * ```
 */
export const isWorktree: Guard<Worktree> = recordOf({
	tracked: andOf(isInventory, arrayOf(isPath)),
	dirty: andOf(isInventory, arrayOf(isPath)),
})

/**
 * Narrow a value to the materializer's initial listener record.
 *
 * @remarks
 * Every event is optional and every declared value is a function. A key outside
 * the materializer's event map is refused, so a listener wired to a misspelled
 * event fails at construction instead of never firing.
 */
export const isMaterializerHooks: Guard<EmitterHooks<MaterializerEventMap>> = recordOf(
	{
		write: isFunction,
		remove: isFunction,
		finish: isFunction,
		error: isFunction,
		destroy: isFunction,
	},
	true,
)

/**
 * Narrow a value to {@link MaterializerOptions}.
 *
 * @remarks
 * `host` admits both representations of one vendored root: a directory path and
 * a whole {@link Host} value. They share a key because they are one setting
 * stated two ways rather than two settings, so nothing downstream has to
 * reconcile a pair that could disagree.
 *
 * @example
 * ```ts
 * import { isMaterializerOptions } from '@orkestrel/scaffold/server'
 *
 * isMaterializerOptions({}) // true
 * isMaterializerOptions({ host: 'dist/host*' }) // false
 * ```
 */
export const isMaterializerOptions: Guard<MaterializerOptions> = recordOf(
	{ host: unionOf(isFilesystemPath, isHost), on: isMaterializerHooks, error: isFunction },
	true,
)

/**
 * Narrow a value to the upstream reader's initial listener record.
 *
 * @remarks
 * Closed to the reader's own events for the same reason the materializer's
 * record is closed to its own.
 */
export const isUpstreamHooks: Guard<EmitterHooks<UpstreamEventMap>> = recordOf(
	{
		release: isFunction,
		mirror: isFunction,
		file: isFunction,
		error: isFunction,
		destroy: isFunction,
	},
	true,
)

/**
 * Narrow a value to {@link UpstreamOptions}.
 *
 * @remarks
 * Each grouped endpoint is closed to its own leaves, so a setting written under
 * the wrong entity is refused rather than ignored. Every numeric leaf is a whole
 * number inside a ceiling: an unbounded concurrency, retry count, response
 * limit, or call budget is a way to exhaust the caller, so the ceiling is stated
 * here rather than left to the reader. The byte ceilings are the core
 * artifact and total-artifact limits, because a fetched guide is an artifact and
 * a whole call retains no more than a whole plan.
 *
 * @example
 * ```ts
 * import { isUpstreamOptions } from '@orkestrel/scaffold/server'
 *
 * isUpstreamOptions({ repository: { branch: 'main' }, concurrency: 4 }) // true
 * isUpstreamOptions({ concurrency: 0 }) // false
 * ```
 */
export const isUpstreamOptions: Guard<UpstreamOptions> = recordOf(
	{
		repository: recordOf({ base: isEndpoint, branch: isBranch, timeout: isTimeout }, true),
		registry: recordOf({ base: isEndpoint, timeout: isTimeout }, true),
		concurrency: andOf(isInteger, boundsOf(1, MAX_UPSTREAM_CONCURRENCY)),
		retries: andOf(isInteger, boundsOf(0, MAX_UPSTREAM_RETRIES)),
		limit: andOf(isInteger, boundsOf(1, MAX_ARTIFACT_BYTES)),
		budget: andOf(isInteger, boundsOf(1, MAX_TOTAL_ARTIFACT_BYTES)),
		on: isUpstreamHooks,
		error: isFunction,
	},
	true,
)
