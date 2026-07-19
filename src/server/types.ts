import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
import type {
	Audit,
	CatalogEntry,
	Dependency,
	GuideSync,
	Plan,
	SyncReport,
	VersionSync,
} from '@src/core'

// ============================================================================
//  @orkestrel/scaffold/server — the materialization + sync faces' type
//  surface (AGENTS §5 source of truth). The server-marked Types rows from
//  scaffold.md's `## Surface` table — `MaterializeResult`, `ManifestEntry`
//  (one vendored `host/manifest.json` entry), plus the `Materializer` triad
//  (`MaterializerEventMap` / `MaterializerOptions` / `MaterializerInterface`)
//  and the `Sync` triad (`SyncEventMap` / `SyncOptions` / `SyncInterface`).
//  Everything else the server surface touches (`Plan`, `Audit`, `Dependency`,
//  `GuideSync`, `VersionSync`, `SyncReport`, `ScaffoldError`, …) is OWNED by
//  the pure core face (`@src/core`) — imported here, never redeclared.
// ============================================================================

/** The outcome of one materialization (server). */
export interface MaterializeResult {
	readonly target: string
	readonly written: readonly string[]
	readonly copied: readonly string[]
	readonly skipped: readonly string[]
	readonly removed: readonly string[]
}

/** `Materializer`'s push observation surface (AGENTS §13, server). */
export type MaterializerEventMap = {
	readonly copy: readonly [path: string]
	readonly write: readonly [path: string]
	readonly remove: readonly [path: string]
	readonly done: readonly [result: MaterializeResult]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

/**
 * Options for `createMaterializer` / the `Materializer` constructor (server).
 *
 * @remarks
 * `host` is the vendored-data root `host`-origin artifacts are copied FROM;
 * defaults to THIS PACKAGE'S OWN vendored data root (`dist/host`, resolved
 * from the installed module's own location) — the package vendors its host
 * data and ships it with itself, so the default host is never the caller's
 * working directory. A caller-supplied `host` pointing at a raw repo root
 * (no `manifest.json` alongside it) maps artifact paths 1:1 instead of
 * through the manifest — the sibling-repo / test-fixture shape.
 */
export interface MaterializerOptions {
	readonly host?: string
	readonly on?: EmitterHooks<MaterializerEventMap>
	readonly error?: EmitterErrorHandler
}

/** One entry of the vendored host's `manifest.json` (server). */
export interface ManifestEntry {
	readonly storage: string
	readonly destination: string
	readonly executable: boolean
}

/** The materialization contract (server) — the only impure entity in the package. */
export interface MaterializerInterface {
	readonly emitter: EmitterInterface<MaterializerEventMap>
	materialize(plan: Plan, target: string): MaterializeResult
	repair(plan: Plan, audit: Audit, target: string): MaterializeResult
	prune(target: string): MaterializeResult
	destroy(): void
}

/**
 * `Sync`'s push observation surface (AGENTS §13, server).
 *
 * @remarks
 * `package` fires once per `catalog()` entry processed; its `note` is the
 * empty string when both the registry packument and the guide fetch
 * succeeded, else a human-readable explanation of which one degraded (and
 * why) — the same `''`-means-nothing convention `GuideSync.note` /
 * `VersionSync.note` use, just non-optional here since every `catalog()`
 * entry emits exactly once regardless of outcome.
 */
export type SyncEventMap = {
	readonly guide: readonly [name: string]
	readonly version: readonly [name: string]
	readonly package: readonly [name: string, note: string]
	readonly write: readonly [path: string]
	readonly done: readonly [report: SyncReport]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

/**
 * Options for `createSync` / the `Sync` constructor (server).
 *
 * @remarks
 * The endpoint bases + branch are INJECTABLE — `guides.base` defaults to
 * `raw.githubusercontent.com`, `guides.branch` to `main`, `registry.base` to
 * `registry.npmjs.org`, and `guides.timeout` / `registry.timeout` to 10
 * seconds each. `concurrency` bounds in-flight requests (default 6, never an
 * unbounded `Promise.all`); `retries` opts into per-request retry on a
 * transport fault (default 0); `strict` flips a collect-mode failure into a
 * thrown `ScaffoldError('FETCH', …)` (default `false`). `limit` bounds the
 * bytes read from a single response body (declared `Content-Length` or
 * streamed total, whichever trips first) — default 5,242,880 (5 MiB); a body
 * that would exceed it is a transport fault, handled exactly like any other
 * (retry-eligible per `retries`, then `failed` / strict `FETCH`). Every fetch
 * is unauthenticated — no token, no `Authorization` header, anywhere; every
 * fleet repo is public, so plain reachability is the only signal (a guide
 * `404` degrades gracefully rather than needing credentials).
 * `registry.base` also anchors `catalog()`'s org package-list lookup
 * (`<registry.base>/-/org/orkestrel/package`) and its per-package packument
 * fetches (`<registry.base>/<name>`) — the same base every other registry
 * read already uses.
 */
export interface SyncOptions {
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
	readonly strict?: boolean
	readonly limit?: number
	readonly on?: EmitterHooks<SyncEventMap>
	readonly error?: EmitterErrorHandler
}

/**
 * The upstream-synchronization contract (server) — the impure FETCH sibling
 * of `MaterializerInterface`.
 */
export interface SyncInterface {
	readonly emitter: EmitterInterface<SyncEventMap>
	guides(
		deps: readonly Dependency[],
		current?: Readonly<Record<string, string>>,
	): Promise<readonly GuideSync[]>
	versions(deps: readonly Dependency[]): Promise<readonly VersionSync[]>
	catalog(): Promise<readonly CatalogEntry[]>
	pull(target: string): Promise<SyncReport>
	write(report: SyncReport, target: string): Promise<readonly string[]>
	destroy(): void
}
