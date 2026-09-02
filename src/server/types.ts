import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
import type {
	Audit,
	CatalogEntry,
	HostFile,
	Dependency,
	Lookup,
	ManifestRegionSet,
	Mirror,
	Plan,
	Release,
	Snapshot,
} from '@src/core'

/**
 * Reports the outcome of one mutation of a target.
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

/** Represents the materializer's observation channel. */
export type MaterializerEventMap = {
	readonly write: readonly [path: string]
	readonly remove: readonly [path: string]
	readonly finish: readonly [result: MaterializeResult]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

/**
 * Represents the options for the materializer.
 *
 * @remarks
 * `host` is the vendored data root host-origin artifacts are copied from, in
 * either representation. A string is a directory: it defaults to this package's
 * own vendored root, resolved from the installed module's location rather than
 * the caller's working directory, and a directory that carries no manifest
 * beside it maps artifact paths one to one instead of through the manifest. A
 * {@link Host} is the same root supplied as a value, so a caller that already
 * holds the bytes never stages them to a directory to be read back.
 */
export interface MaterializerOptions {
	readonly host?: string | Host
	readonly on?: EmitterHooks<MaterializerEventMap>
	readonly error?: EmitterErrorHandler
}

/**
 * Represents one file record of the vendored host's manifest.
 *
 * @remarks
 * `digest` is the SHA-256 of the file's exact bytes. A live read compares it
 * against the target's copy, and verifies host-supplied bytes against it before
 * treating them as that entry.
 */
export interface ManifestEntry {
	readonly storage: string
	readonly destination: string
	readonly executable: boolean
	readonly digest: string
}

/**
 * Represents the complete vendored-host inventory.
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
 * Represents a whole vendored host supplied as a value: the membership beside the bytes filling it.
 *
 * @remarks
 * `manifest` carries the membership, the roots, and the executable declarations
 * the installed release fixed, and each entry's `digest` is the digest of the
 * bytes this value actually holds. `bytes` is keyed by each entry's
 * `destination` and covers exactly the entries the fill holds, so an entry with
 * no bytes and a byte string under no entry are each a refusal rather than a
 * gap a reader has to work around.
 *
 * Membership never moves without a release. A fill therefore states which of
 * the release's paths it carries and never introduces one the release did not
 * declare, which is what keeps a value host's reach identical to the installed
 * root's however the bytes were obtained.
 */
export interface Host {
	readonly manifest: HostManifest
	readonly bytes: Snapshot
}

/**
 * Describes what git reports about a target's working tree.
 *
 * @remarks
 * `tracked` is the only set a deletion may draw from: git does not report the
 * loss of an untracked path and `git diff` cannot restore it, so an ignored
 * path such as an installed dependency tree, a build output, or an editor
 * directory survives every verb. `dirty` is every path carrying an uncommitted
 * change, taken repo-wide rather than over a write set, because deletion makes
 * the write set the whole workspace. A clean tree is an empty `dirty`. A target
 * that is not a git repository yields no `Worktree` at all, so the caller
 * decides what to do about that rather than reading it out of an invented
 * empty value.
 */
export interface Worktree {
	readonly tracked: readonly string[]
	readonly dirty: readonly string[]
}

/**
 * Represents one destination snapshot captured before a write and required to survive it.
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

/**
 * Describes the narrower caller-observed destination state a write transaction must
 * still match.
 */
export interface WritePrecondition {
	readonly path: string
	readonly shape: 'absent' | 'file'
	readonly digest?: string
}

/**
 * Represents one physical directory identity captured across a write transaction.
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

/** Reports the final directory anchor of a write transaction and the subset one call created. */
export interface WriteDirectoryResult {
	readonly anchor: WriteAnchor
	readonly created: readonly WriteAnchor[]
}

/**
 * Describes the mutation contract: the package's only filesystem writer.
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
	 * Compares a plan with a target through the vendored host that will repair it.
	 *
	 * @param plan - The compiled plan to compare.
	 * @param target - The directory to inspect.
	 * @returns One finding per hydrated planned path, plus foreign files beneath owned host roots.
	 */
	audit(plan: Plan, target: string): Audit
	/**
	 * Writes a plan into a vacant target.
	 *
	 * @param plan - The compiled plan to write.
	 * @param target - The directory to write into; it must hold nothing the plan would collide with.
	 * @returns The paths written and skipped.
	 */
	materialize(plan: Plan, target: string): MaterializeResult
	/**
	 * Writes a plan into an existing target, guided by an audit of it.
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
	 * Writes fetched dependency guides to their local mirrors.
	 *
	 * @param mirrors - The fetched guides; each carries the local bytes its write is held to.
	 * @param target - The directory to write into.
	 * @returns The mirror paths written and skipped; a mirror already current is skipped.
	 */
	mirror(mirrors: readonly Mirror[], target: string): MaterializeResult
	/**
	 * Rewrites the marker-bounded package table in the target's catalog agent file.
	 *
	 * @param entries - The published packages the table must list.
	 * @param target - The directory to write into.
	 * @returns The catalog path, written when the region's bytes moved and skipped otherwise.
	 */
	catalog(entries: readonly CatalogEntry[], target: string): MaterializeResult
	/**
	 * Rewrites the manifest regions the caller names in the target's manifest.
	 *
	 * @param regions - The dependency ranges and script values the manifest must declare.
	 * @param target - The directory to write into.
	 * @returns The manifest path, written when a named region moved and skipped otherwise.
	 *
	 * @remarks
	 * No other part of the manifest is read back out or rewritten. The method
	 * never reads or writes `peerDependencies` or `peerDependenciesMeta`. A
	 * script region naming a value the manifest does not accept is skipped
	 * without a byte moving, and the range region is written regardless.
	 */
	declare(regions: ManifestRegionSet, target: string): MaterializeResult
	/**
	 * Re-derives and deletes the tracked files the plan does not own.
	 *
	 * @param plan - The compiled plan that decides which paths are foreign.
	 * @param audit - The preview returned by this materializer's `audit` method; it must agree with the candidate set this call re-derives.
	 * @param worktree - The target's git state; only a tracked path is ever deleted.
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
	remove(plan: Plan, audit: Audit, worktree: Worktree, target: string): MaterializeResult
	/**
	 * Tears the materializer down. Every later call throws, and teardown is idempotent.
	 *
	 * @returns Nothing.
	 */
	destroy(): void
}

/**
 * Represents the upstream reader's observation channel.
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
	readonly file: readonly [file: HostFile]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

/**
 * Represents the options for the upstream reader.
 *
 * @remarks
 * The endpoints are grouped under the entity each configures: `repository`
 * takes the raw content host's `base`, its `branch`, and its `timeout`;
 * `registry` takes the registry's `base` and `timeout`. One raw content host
 * serves both the fleet's guides and this package's own vendored files, so one
 * group configures both. `concurrency` bounds requests in
 * flight and `retries` opts into per-request retry on a transport fault.
 * `limit` bounds the bytes read from one response body and `budget` bounds the
 * bytes read across a whole call, so neither one oversized answer nor many
 * small ones can exhaust the caller. Every request is unauthenticated and
 * follows no redirect.
 */
export interface UpstreamOptions {
	readonly repository?: {
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
 * Represents the byte allowance one whole upstream call spends across every read it makes.
 *
 * @remarks
 * `remaining` is deliberately mutable, and it is the one member of this module's
 * contracts that is. The carrier is what makes `budget` a bound on a call rather
 * than on a request: each read subtracts what it consumed from the same object,
 * so many small answers exhaust the call exactly as one oversized answer does.
 * Each call constructs its own carrier from `budget`, because concurrent calls
 * own separate budgets and must not spend each other's.
 */
export interface ReadAllowance {
	remaining: number
}

/**
 * Represents the committed vendored-file inventory as one call's reads are decided against.
 *
 * @remarks
 * `lookup` is the verdict of the inventory read itself, and every row of the
 * call inherits it when it is not `found`. `digests` maps a target-relative
 * destination to the exact bytes the inventory declares for it, `duplicates`
 * names every destination the inventory claims more than once, and `note` states
 * why a lookup that is not `found` produced no inventory.
 */
export interface HostInventory {
	readonly lookup: Lookup
	readonly digests: ReadonlyMap<string, string>
	readonly duplicates: ReadonlySet<string>
	readonly note: string
}

/**
 * Reports the outcome of one bounded read whose body is taken as text.
 *
 * @remarks
 * `content` carries the body only when `lookup` is `found`; otherwise it is
 * empty and `note` states what happened. A read that is not `found` is an answer
 * rather than a throw, which is what lets one dead row sit beside live ones.
 */
export interface TextReadResult {
	readonly lookup: Lookup
	readonly content: string
	readonly note: string
}

/**
 * Reports the outcome of one bounded read whose body is taken as exact bytes.
 *
 * @remarks
 * `hex` carries the body as lowercase hexadecimal, and only when `lookup` is
 * `found`; otherwise it is empty and `note` states what happened. Bytes rather
 * than text, because a vendored file is compared by digest and a decode would
 * change what is hashed.
 */
export interface BytesReadResult {
	readonly lookup: Lookup
	readonly hex: string
	readonly note: string
}

/**
 * Describes the upstream contract: the package's only network reader, and it never writes.
 *
 * @remarks
 * A per-package failure is collected as a verdict carrying its cause, not
 * thrown, so one unreachable package never costs the caller the rest of the
 * answer. The organization list is the exception: without it there is no fleet
 * to report, so an unreachable or malformed list is a coded failure.
 *
 * The vendored-file inventory is the other whole-answer read, and it fails
 * softly: an inventory that produces no answer fails every row of that call
 * rather than throwing, which is what leaves the caller one whole baseline to
 * fall back to instead of a mixture.
 */
export interface UpstreamInterface {
	readonly emitter: EmitterInterface<UpstreamEventMap>
	/**
	 * Looks up the newest release each declared range admits.
	 *
	 * @param dependencies - The declared dependencies to look up.
	 * @returns One release verdict per dependency, in input order.
	 */
	lookup(dependencies: readonly Dependency[]): Promise<readonly Release[]>
	/**
	 * Fetches each named package's guide, beside the local mirror it answers for.
	 *
	 * @param names - The packages to fetch: the target's declared set, or the whole organization.
	 * @param current - The target's local mirrors as exact bytes, keyed by mirror path.
	 * @returns One mirror verdict per name, in input order.
	 */
	fetch(names: readonly string[], current: Snapshot): Promise<readonly Mirror[]>
	/**
	 * Reads each named vendored file from the repository, beside the target bytes it answers for.
	 *
	 * @param paths - The target-relative vendored paths to read.
	 * @param current - The target files as exact bytes, keyed by the same paths.
	 * @returns One file verdict per path, in input order.
	 */
	read(paths: readonly string[], current: Snapshot): Promise<readonly HostFile[]>
	/**
	 * Catalogs the published fleet from the registry's organization package list.
	 *
	 * @returns One row per published package, sorted by name.
	 */
	catalog(): Promise<readonly CatalogEntry[]>
	/**
	 * Tears the reader down, aborting every request in flight. Teardown is idempotent.
	 *
	 * @returns Nothing.
	 */
	destroy(): void
}
