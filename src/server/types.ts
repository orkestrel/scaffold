import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
import type { Audit, CatalogEntry, Dependency, Mirror, Plan, Release, Snapshot } from '@src/core'

/**
 * The outcome of one mutation of a target.
 *
 * @remarks
 * `written` names every path this call created or replaced. `skipped` names
 * every path it considered and left alone, whether because the target already
 * matched or because the artifact's ownership forbade touching it. `removed`
 * names every path it deleted.
 */
export interface MaterializeResult {
	readonly target: string
	readonly written: readonly string[]
	readonly skipped: readonly string[]
	readonly removed: readonly string[]
}

/** The materializer's observation channel. */
export type MaterializerEventMap = {
	readonly write: readonly [path: string]
	readonly remove: readonly [path: string]
	readonly finish: readonly [result: MaterializeResult]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

/**
 * Options for the materializer.
 *
 * @remarks
 * `host` is the vendored data root host-origin artifacts are copied from. It
 * defaults to this package's own vendored root, resolved from the installed
 * module's location rather than the caller's working directory. A host that
 * carries no manifest beside it maps artifact paths one to one instead of
 * through the manifest.
 */
export interface MaterializerOptions {
	readonly host?: string
	readonly on?: EmitterHooks<MaterializerEventMap>
	readonly error?: EmitterErrorHandler
}

/** One file record of the vendored host's manifest. */
export interface ManifestEntry {
	readonly storage: string
	readonly destination: string
	readonly executable: boolean
}

/**
 * The complete vendored-host inventory.
 *
 * @remarks
 * `roots` is the sorted directory inventory, which is what distinguishes a
 * declared empty directory. `digest` is the SHA-256 of that exact entry and
 * root membership, so a membership edit that did not update the digest is
 * detected. A self-consistent replacement manifest defines its own smaller
 * membership; authenticating omitted membership is outside a checksum's
 * contract.
 */
export interface HostManifest {
	readonly entries: readonly ManifestEntry[]
	readonly roots: readonly string[]
	readonly digest: string
}

/**
 * What git reports about a target's working tree.
 *
 * @remarks
 * `tracked` is the only set a deletion may draw from: git does not report the
 * loss of an untracked path and `git diff` cannot restore it, so an ignored
 * path such as an installed dependency tree, a build output, or an editor
 * directory survives every verb. `dirty` is every path carrying an uncommitted
 * change, taken repo-wide rather than over a write set, because deletion makes
 * the write set the whole workspace. A clean tree is an empty `dirty`. A target
 * that is not a git repository yields no `Repository` at all, so the caller
 * decides what to do about that rather than reading it out of an invented
 * empty value.
 */
export interface Repository {
	readonly tracked: readonly string[]
	readonly dirty: readonly string[]
}

/**
 * One destination snapshot captured before a write and required to survive it.
 *
 * @remarks
 * `device`, `inode`, `modified`, `size`, and `digest` are present only where
 * the observed shape supplies them.
 */
export interface WriteExpectation {
	readonly path: string
	readonly shape: 'absent' | 'file' | 'directory'
	readonly device?: number
	readonly inode?: number
	readonly modified?: number
	readonly size?: number
	readonly digest?: string
}

/** The narrower caller-observed destination state a write transaction must still match. */
export interface WritePrecondition {
	readonly path: string
	readonly shape: 'absent' | 'file'
	readonly digest?: string
}

/**
 * One physical directory identity captured across a write transaction.
 *
 * @remarks
 * Device and inode locate the directory and do not date it. Two directories
 * occupying one slot at different times share an anchor, so an anchor proves
 * where a write lands and never that the directory was left alone.
 */
export interface WriteAnchor {
	readonly path: string
	readonly device: number
	readonly inode: number
}

/** The final directory anchor of a write transaction and the subset one call created. */
export interface WriteDirectoryResult {
	readonly anchor: WriteAnchor
	readonly created: readonly WriteAnchor[]
}

/**
 * The mutation contract: the package's only filesystem writer.
 *
 * @remarks
 * Every method binds to the observation it was given. It re-derives what it is
 * about to touch, compares that against the supplied preview, and refuses the
 * whole call when membership or bytes moved, rather than racing to be the last
 * writer.
 */
export interface MaterializerInterface {
	readonly emitter: EmitterInterface<MaterializerEventMap>
	/**
	 * Compare a plan with a target through the vendored host that will repair it.
	 *
	 * @param plan - The compiled plan to compare.
	 * @param target - The directory to inspect.
	 * @returns One finding per hydrated planned path, plus foreign files beneath owned host roots.
	 */
	audit(plan: Plan, target: string): Audit
	/**
	 * Write a plan into a vacant target.
	 *
	 * @param plan - The compiled plan to write.
	 * @param target - The directory to write into; it must hold nothing the plan would collide with.
	 * @returns The paths written and skipped.
	 */
	materialize(plan: Plan, target: string): MaterializeResult
	/**
	 * Write a plan into an existing target, guided by an audit of it.
	 *
	 * @param plan - The compiled plan to write.
	 * @param audit - The preview returned by this materializer's `audit` method.
	 * @param target - The directory to write into.
	 * @returns The paths written and skipped, each decided by its artifact's ownership.
	 *
	 * @remarks
	 * The audit is checked for agreement rather than for plausibility, so a verdict
	 * the comparison could not have produced — a birth-owned path reported stale,
	 * which the `Finding` shape admits — disagrees with the derived one and is
	 * refused.
	 *
	 * The whole audit is guarded before any of it is read, so an audit produced by
	 * an earlier version of this package is refused at runtime rather than only at
	 * compile time. A planned finding carries `ownership`, which findings made
	 * before that field existed do not, and the guard refuses the call with
	 * `INVALID`. Take a fresh audit from this materializer; a stored one is a record
	 * of what a target looked like then, not an argument to a fresh write. The
	 * refusal is deliberate at `0.0.x` and there is no migration.
	 */
	repair(plan: Plan, audit: Audit, target: string): MaterializeResult
	/**
	 * Write fetched dependency guides to their local mirrors.
	 *
	 * @param mirrors - The fetched guides; each carries the local bytes its write is held to.
	 * @param target - The directory to write into.
	 * @returns The mirror paths written and skipped; a mirror already current is skipped.
	 */
	mirror(mirrors: readonly Mirror[], target: string): MaterializeResult
	/**
	 * Rewrite the marker-bounded package table in the target's catalog agent file.
	 *
	 * @param entries - The published packages the table must list.
	 * @param target - The directory to write into.
	 * @returns The catalog path, written when the region's bytes moved and skipped otherwise.
	 */
	catalog(entries: readonly CatalogEntry[], target: string): MaterializeResult
	/**
	 * Rewrite the declared dependency ranges the caller names in the target's manifest.
	 *
	 * @param dependencies - The names and ranges the manifest must declare.
	 * @param target - The directory to write into.
	 * @returns The manifest path, written when a declared range moved and skipped otherwise.
	 *
	 * @remarks
	 * No other part of the manifest is read back out or rewritten, so a
	 * consumer's own description, keywords, and scripts survive the call.
	 */
	declare(dependencies: readonly Dependency[], target: string): MaterializeResult
	/**
	 * Re-derive and delete the tracked files the plan does not own.
	 *
	 * @param plan - The compiled plan that decides which paths are foreign.
	 * @param audit - The preview returned by this materializer's `audit` method; it must agree with the candidate set this call re-derives.
	 * @param repository - The target's git state; only a tracked path is ever deleted.
	 * @param target - The directory to delete from.
	 * @returns The paths removed.
	 *
	 * @remarks
	 * The candidate set is re-derived and compared against the audit before
	 * anything moves, and every file is quarantined and re-verified rather than
	 * unlinked, so a failure part way through restores what it already took.
	 * The package's own source and application trees are never candidates,
	 * whatever the audit reports.
	 *
	 * The whole audit is guarded before any of it is read, so an audit produced by
	 * an earlier version of this package is refused at runtime rather than only at
	 * compile time. Only foreign findings are candidates and those never carried
	 * `ownership`, but the guard reads every finding, so one planned finding made
	 * before that field existed refuses the whole call with `INVALID`. Take a fresh
	 * audit from this materializer. The refusal is deliberate at `0.0.x` and there
	 * is no migration.
	 *
	 * The whole call refuses when the preview disagrees with the re-derivation on
	 * any foreign finding, including one the deletion itself would skip, because a
	 * preview stale anywhere is stale evidence.
	 */
	remove(plan: Plan, audit: Audit, repository: Repository, target: string): MaterializeResult
	/**
	 * Tear the materializer down. Every later call throws, and teardown is idempotent.
	 *
	 * @returns Nothing.
	 */
	destroy(): void
}

/**
 * The upstream reader's observation channel.
 *
 * @remarks
 * Each verdict is published whole rather than as a name beside a summary, so a
 * listener reads the same value the call returns and a failed lookup is told
 * apart from a successful one by the verdict's own discriminant rather than by
 * which event carried it.
 */
export type UpstreamEventMap = {
	readonly release: readonly [release: Release]
	readonly mirror: readonly [mirror: Mirror]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

/**
 * Options for the upstream reader.
 *
 * @remarks
 * The endpoints are grouped under the entity each configures: `guides`
 * takes the guide host's `base`, its `branch`, and its `timeout`; `registry`
 * takes the registry's `base` and `timeout`. `concurrency` bounds requests in
 * flight and `retries` opts into per-request retry on a transport fault.
 * `limit` bounds the bytes read from one response body and `budget` bounds the
 * bytes read across a whole call, so neither one oversized answer nor many
 * small ones can exhaust the caller. Every request is unauthenticated and
 * follows no redirect.
 */
export interface UpstreamOptions {
	readonly guides?: {
		readonly base?: string
		readonly branch?: string
		readonly timeout?: number
	}
	readonly registry?: {
		readonly base?: string
		readonly timeout?: number
	}
	readonly concurrency?: number
	readonly retries?: number
	readonly limit?: number
	readonly budget?: number
	readonly on?: EmitterHooks<UpstreamEventMap>
	readonly error?: EmitterErrorHandler
}

/**
 * The upstream contract: the package's only network reader, and it never writes.
 *
 * @remarks
 * A per-package failure is collected as a verdict carrying its cause, not
 * thrown, so one unreachable package never costs the caller the rest of the
 * answer. The organization list is the exception: without it there is no fleet
 * to report, so an unreachable or malformed list is a coded failure.
 */
export interface UpstreamInterface {
	readonly emitter: EmitterInterface<UpstreamEventMap>
	/**
	 * Look up the newest release each declared range admits.
	 *
	 * @param dependencies - The declared dependencies to look up.
	 * @returns One release verdict per dependency, in input order.
	 */
	lookup(dependencies: readonly Dependency[]): Promise<readonly Release[]>
	/**
	 * Fetch each named package's guide, beside the local mirror it answers for.
	 *
	 * @param names - The packages to fetch: the target's declared set, or the whole organization.
	 * @param current - The target's local mirrors as exact bytes, keyed by mirror path.
	 * @returns One mirror verdict per name, in input order.
	 */
	fetch(names: readonly string[], current: Snapshot): Promise<readonly Mirror[]>
	/**
	 * Catalog the published fleet from the registry's organization package list.
	 *
	 * @returns One row per published package, sorted by name.
	 */
	catalog(): Promise<readonly CatalogEntry[]>
	/**
	 * Tear the reader down, aborting every request in flight. Teardown is idempotent.
	 *
	 * @returns Nothing.
	 */
	destroy(): void
}
