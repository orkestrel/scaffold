import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'

/** The environment surface an artifact or member belongs to (the SCAFFOLDED package's faces, not scaffold's own). */
export type Surface = 'core' | 'browser' | 'server'

/**
 * How an `Artifact`'s content is produced: `host` byte-copied from the vendored
 * data root, `template` filled from a frozen `TemplateDefinition` by
 * `@orkestrel/template`'s pure fill engine, `computed` derived by the core's
 * own combination logic.
 */
export type Origin = 'host' | 'template' | 'computed'

/** The closed artifact-group vocabulary a plan selects over. */
export type Group =
	| 'manifest'
	| 'configs'
	| 'source'
	| 'tests'
	| 'guides'
	| 'docs'
	| 'orchestration'

/** What a declared `Member` IS in the scaffolded surface. */
export type Category = 'type' | 'constant' | 'factory' | 'entity'

/** One `Finding`'s verdict against the target's current content. */
export type Drift = 'aligned' | 'stale' | 'missing' | 'foreign'

/** The three fixed pipeline phases, in order. */
export type CompileStage = 'draft' | 'gate' | 'pin'

/** Coded `ScaffoldError` reasons. */
export type ScaffoldErrorCode = 'INVALID' | 'BLOCKED' | 'DESTROYED' | 'TARGET' | 'WRITE'

/**
 * One runtime `@orkestrel/*` dependency.
 *
 * @remarks
 * Drives its `package.json` entry, the build externals, and its
 * `guides/src/<dep>.md` mirror — byte-correct for a dep this package vendors
 * (contract / emitter / markdown / template / terminal / console / guide),
 * a `host`-origin pointer the caller syncs otherwise.
 */
export interface Dependency {
	readonly name: string
	readonly range: string
}

/**
 * One caller template override.
 *
 * @remarks
 * `content` REPLACES the rendered artifact at `path`, never partially merges.
 * An override whose `path` matches no planned artifact, or targets a
 * `host`-origin path, is a BLOCKING question — never a silent add.
 */
export interface Override {
	readonly path: string
	readonly content: string
}

/** The closed, JSON-serializable package spec. */
export interface Blueprint {
	readonly name: string
	readonly description?: string
	readonly keywords: readonly string[]
	readonly surfaces: readonly Surface[]
	readonly dependencies: readonly Dependency[]
	readonly version: string
	readonly engines: string
	readonly overrides: readonly Override[]
}

/** One declared public export of the scaffolded package; derived by `blueprintToMembers`, never authored. */
export interface Member {
	readonly name: string
	readonly category: Category
	readonly summary: string
	readonly surface: Surface
}

/**
 * One file in a `Plan`.
 *
 * @remarks
 * `content` present for `template` / `computed`, `source` (a host-relative
 * path) for `host`.
 */
export interface Artifact {
	readonly path: string
	readonly group: Group
	readonly origin: Origin
	readonly surface?: Surface
	readonly content?: string
	readonly source?: string
}

/** The compiled, ordered artifact list plus the selection it covers; `trace` / `hash` filled by the pin. */
export interface Plan {
	readonly blueprint: Blueprint
	readonly groups: readonly Group[]
	readonly artifacts: readonly Artifact[]
	readonly trace?: string
	readonly hash?: string
}

/** One audit drift result. */
export interface Finding {
	readonly path: string
	readonly group: Group
	readonly drift: Drift
}

/**
 * The whole diff of a plan against a target's current content.
 *
 * @remarks
 * A `Compiler.audit` over a gate-failing blueprint sets `complete: false` with
 * the gate's `questions` and zero findings, while `diffPlan` over an existing
 * plan is always `complete: true`.
 */
export interface Audit {
	readonly findings: readonly Finding[]
	readonly clean: boolean
	readonly complete: boolean
	readonly questions: readonly Question[]
	readonly drifted: number
	readonly missing: number
	readonly foreign: number
}

/**
 * One validation issue.
 *
 * @remarks
 * `blocking: true` fails the gate closed, `false` is an advisory that rides a
 * complete result.
 */
export interface Question {
	readonly field: string
	readonly text: string
	readonly blocking: boolean
	readonly candidates?: readonly string[]
}

/** The semantic pass over a blueprint; returns, never throws. */
export interface Validation {
	readonly valid: boolean
	readonly questions: readonly Question[]
	readonly warnings: readonly string[]
}

/** The dry-run tally. */
export interface PlanSummary {
	readonly name: string
	readonly surfaces: readonly Surface[]
	readonly groups: readonly Group[]
	readonly artifacts: number
	readonly host: number
	readonly template: number
	readonly computed: number
}

/** A structured input/output snapshot of one pipeline phase. */
export interface CompileRecord {
	readonly stage: CompileStage
	readonly input: unknown
	readonly output: unknown
	readonly failed: boolean
	readonly error?: string
}

/** A visible marker for a stage that failed. */
export interface CompileFailure {
	readonly stage: CompileStage
	readonly code: ScaffoldErrorCode
	readonly message: string
}

/** The full, replayable outcome of one `compile()` call. */
export interface Scaffolding {
	readonly blueprint: Blueprint
	readonly plan?: Plan
	readonly questions: readonly Question[]
	readonly stages: readonly CompileRecord[]
	readonly failures: readonly CompileFailure[]
	readonly complete: boolean
	readonly digest: string
}

/** A versioned, content-hashed `Plan` inside a `PlanManager`. */
export interface PlanRecord {
	readonly id: string
	readonly plan: Plan
	readonly version: number
	readonly hash: string
}

/** `Compiler`'s push observation surface (AGENTS §13). */
export type CompilerEventMap = {
	readonly compile: readonly [scaffolding: Scaffolding]
	readonly audit: readonly [audit: Audit]
	readonly block: readonly [questions: readonly Question[]]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

/** Options for `createCompiler` / the `Compiler` constructor. */
export interface CompilerOptions {
	readonly on?: EmitterHooks<CompilerEventMap>
	readonly error?: EmitterErrorHandler
}

/** The compilation orchestrator contract. */
export interface CompilerInterface {
	readonly emitter: EmitterInterface<CompilerEventMap>
	compile(blueprint: Blueprint, groups?: readonly Group[]): Scaffolding
	audit(
		blueprint: Blueprint,
		current: Readonly<Record<string, string>>,
		groups?: readonly Group[],
	): Audit
	destroy(): void
}

/** `PlanManager`'s push observation surface (AGENTS §13). */
export type PlanManagerEventMap = {
	readonly add: readonly [id: string]
	readonly remove: readonly [id: string]
	readonly destroy: readonly []
}

/** Options for `createPlanManager` / the `PlanManager` constructor. */
export interface PlanManagerOptions {
	readonly plans?: readonly Plan[]
	readonly on?: EmitterHooks<PlanManagerEventMap>
	readonly error?: EmitterErrorHandler
}

/** The plan registry contract (AGENTS §9). */
export interface PlanManagerInterface {
	readonly emitter: EmitterInterface<PlanManagerEventMap>
	readonly size: number
	has(id: string): boolean
	plan(id: string): PlanRecord | undefined
	plans(): readonly PlanRecord[]
	add(plan: Plan): PlanRecord
	remove(ids: readonly string[]): boolean
	remove(id: string): boolean
	remove(): void
	destroy(): void
}
