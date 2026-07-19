import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
import type { Audit, Plan } from '@src/core'

// ============================================================================
//  @orkestrel/scaffold/server — the materialization face's type surface
//  (AGENTS §5 source of truth). The four server-marked Types rows from
//  scaffold.md's `## Surface` table — `MaterializeResult` plus the
//  `Materializer` triad (`MaterializerEventMap` / `MaterializerOptions` /
//  `MaterializerInterface`). Everything else the server surface touches
//  (`Plan`, `Audit`, `ScaffoldError`, …) is OWNED by the pure core face
//  (`@src/core`) — imported here, never redeclared.
// ============================================================================

/** The outcome of one materialization (server). */
export interface MaterializeResult {
	readonly target: string
	readonly written: readonly string[]
	readonly copied: readonly string[]
	readonly skipped: readonly string[]
}

/** `Materializer`'s push observation surface (AGENTS §13, server). */
export type MaterializerEventMap = {
	readonly copy: readonly [path: string]
	readonly write: readonly [path: string]
	readonly done: readonly [result: MaterializeResult]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

/**
 * Options for `createMaterializer` / the `Materializer` constructor (server).
 *
 * @remarks
 * `host` is the vendored-data root `host`-origin artifacts are copied FROM;
 * defaults to this package's own root (where `HOST_PATHS` ships as vendored data).
 */
export interface MaterializerOptions {
	readonly host?: string
	readonly on?: EmitterHooks<MaterializerEventMap>
	readonly error?: EmitterErrorHandler
}

/** The materialization contract (server) — the only impure entity in the package. */
export interface MaterializerInterface {
	readonly emitter: EmitterInterface<MaterializerEventMap>
	materialize(plan: Plan, target: string): MaterializeResult
	repair(plan: Plan, audit: Audit, target: string): MaterializeResult
	destroy(): void
}
