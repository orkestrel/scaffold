import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'

/** One core, browser, or server environment in the scaffolded workspace. */
export type Environment = 'core' | 'browser' | 'server'

/** One supported library-output module format. */
export type BuildFormat = 'es' | 'cjs'

/** The deterministic build and export settings for one source environment. */
export interface SrcDefinition {
	readonly configs: readonly string[]
	readonly project: string
	readonly path: string
	readonly formats: readonly BuildFormat[]
}

/** The deterministic config, test-project, and runtime-entry settings for one application environment. */
export interface AppDefinition {
	readonly configs: readonly string[]
	readonly project: string
	readonly entry?: string
}

/**
 * Which host-specific machinery a generated root `vite.config.ts` carries.
 *
 * @remarks
 * The boundary GUARANTEES never vary by blueprint: every generated
 * configuration emits the environment-boundary plugin, its module-graph AST
 * audit, and stylesheet rejection, because those enforce owner-independent
 * laws. Only the host-specific pipelines below are selected by the declared
 * environments. `browser` covers everything a declared browser environment
 * needs — the CSS pipeline and the Playwright-backed browser test project;
 * `vue` adds the single-file-component, HTML, and development-server
 * machinery an application browser environment needs; `output` adds build
 * output containment, which an application of `core` alone never builds.
 */
export interface ViteMachinery {
	readonly browser: boolean
	readonly vue: boolean
	readonly output: boolean
}

/**
 * Optional structural facts consumed by a generated root Vite configuration.
 *
 * @remarks
 * `bin`, `integration`, and `service` select their matching projects.
 * `global` records the physical `tests/setupGlobal.ts` module and wires it
 * into every selected project that consumes that shared setup.
 */
export interface ViteFacts {
	readonly bin?: boolean
	readonly integration?: boolean
	readonly service?: boolean
	readonly global?: boolean
}

/** One generated Vitest project factory and its optional browser-project label. */
export interface ViteProjectRegistration {
	readonly project: string
	readonly browser?: string
}

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

/** What a declared public `Member` is in the scaffolded environment. */
export type Category =
	| 'type'
	| 'alias'
	| 'constant'
	| 'factory'
	| 'entity'
	| 'parser'
	| 'guard'
	| 'handler'
	| 'error'

/**
 * One fleet package's catalog row — the `orkestrel` agent's package-catalog
 * section, derived rather than hand-maintained.
 *
 * @remarks
 * `description` is the flattened text of the package's own guide's FIRST
 * blockquote; empty (`''`) when that guide is missing, unreadable, or
 * carries no blockquote — never a placeholder string.
 */
export interface CatalogEntry {
	readonly name: string
	readonly version: string
	readonly description: string
}

/** One `Finding`'s verdict against the target's current content. */
export type Drift = 'aligned' | 'stale' | 'missing' | 'foreign'

/**
 * One `GuideSync` / `VersionSync`'s currency against upstream.
 *
 * @remarks
 * `missing` is an upstream `404`; `failed` is a transport fault.
 */
export type Freshness = 'current' | 'behind' | 'missing' | 'failed'

/** The three fixed pipeline phases, in order. */
export type CompileStage = 'draft' | 'gate' | 'pin'

/** Coded `ScaffoldError` reasons. */
export type ScaffoldErrorCode = 'INVALID' | 'BLOCKED' | 'DESTROYED' | 'TARGET' | 'WRITE' | 'FETCH'

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
	/** Meaningful only when this `Dependency` appears in a `Blueprint`'s `peers` — `true` emits a `peerDependenciesMeta` `{ optional: true }` entry alongside it. */
	readonly optional?: boolean
}

/**
 * One artifact override.
 *
 * @remarks
 * `content` REPLACES the rendered artifact at `path`, never partially merges.
 * An override whose `path` matches no planned artifact, targets a
 * `host`-origin path, or targets `package.json` is a BLOCKING question.
 * Accepted overrides surface as retained non-blocking advisories.
 */
export interface Override {
	readonly path: string
	readonly content: string
}

/** The closed, JSON-serializable source/application workspace spec. */
export interface Blueprint {
	readonly name: string
	readonly description?: string
	readonly keywords: readonly string[]
	/** Published library environments under `src`; empty for an application-only workspace. */
	readonly src: readonly Environment[]
	/** Private runtime environments under `app`; empty for a library-only workspace. */
	readonly app: readonly Environment[]
	readonly dependencies: readonly Dependency[]
	/** Runtime `@orkestrel/*` peers, emitted as `peerDependencies` — a peer flagged `optional` also gets a `peerDependenciesMeta` entry. */
	readonly peers: readonly Dependency[]
	/** Package-specific `devDependencies` merged into the generated uniform baseline — the middleware pattern of shipping `@orkestrel/{database,router,server}` for its tests. */
	readonly extras: readonly Dependency[]
	readonly version: string
	readonly engines: string
	readonly overrides: readonly Override[]
	/** Structural: `true` only for a repo that ships its own `src/bin` — the self-hosting tax (the manifest's `bin` entry, the `scaffold` script invoking `dist/bin/scaffold.js` directly, the `check/test/build:src:bin` scripts, `build:host`, the `srcBin` vite project) applies ONLY when `true`, never by name. */
	readonly bin: boolean
	/** Structural: `true` only for a repo that ships `tests/integration` — a slow, opt-in proof project over the repo's own built output, outside the default run, never by name. */
	readonly integration: boolean
	/** Structural: `true` only for a repo that ships `tests/service` — a slow, opt-in proof project against a foreign running process, outside the default run, never by name. Derivation requires `tests/setupService.ts` and `scripts/service.sh` beside it and fails `TARGET` otherwise. */
	readonly service: boolean
	/** Structural: `true` only for a repo that carries the physical, exact-case `tests/setupGlobal.ts` module — integration and `srcBrowser` projects consume that shared global setup only under their own additional structural conditions. */
	readonly global: boolean
}

/** One declared public export of the scaffolded package; derived by `blueprintToMembers`, never authored. */
export interface Member {
	readonly name: string
	readonly category: Category
	readonly summary: string
	readonly environment: Environment
}

/** Fields shared by every file in a `Plan`. */
export interface ArtifactBase {
	readonly path: string
	readonly group: Group
	readonly environment?: Environment
}

/** A byte-copied host artifact; `source` falls back to `path` when absent. */
export interface HostArtifact extends ArtifactBase {
	readonly origin: 'host'
	/** Exact lowercase hexadecimal bytes used for byte-safe host auditing. */
	readonly hex?: string
	readonly source?: string
	readonly content?: never
}

/** A text artifact produced by the template or computed compilation path. */
export interface ContentArtifact extends ArtifactBase {
	readonly origin: 'template' | 'computed'
	readonly content: string
	readonly hex?: never
	readonly source?: never
}

/** One origin-discriminated file in a `Plan`. */
export type Artifact = HostArtifact | ContentArtifact

/** Exact lowercase hexadecimal target bytes keyed by artifact-relative path. */
export type Snapshot = Readonly<Record<string, string>>

/**
 * The compiled, ordered artifact list plus the independent source/application selection it covers.
 *
 * @remarks
 * `pinPlan` fills `trace` with explicit `src:` and `app:` axes and fills
 * `hash` from the plan's identity payload.
 */
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
	/** Exact bounded observed bytes for a stale destination, used as the repair precondition. */
	readonly observed?: string
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

/**
 * One dependency guide fetched from upstream at its `path`, plus its
 * `freshness` verdict against the local mirror.
 *
 * @remarks
 * `note` carries the failure/anomaly CAUSE — a transport error message, an
 * `HTTP <status>`, `redirected (redirect following is disabled)`, or a
 * `response exceeded limit (<n> bytes)` — present on every non-`current`
 * outcome that has a discoverable cause; absent on `current` and on `behind`
 * (both are clean outcomes with nothing to explain).
 */
export interface GuideSync {
	readonly name: string
	readonly path: string
	readonly content: string
	readonly freshness: Freshness
	readonly note?: string
	/** SHA-256 of the observed local mirror, or `absent`; omitted outside target-aware pulls. */
	readonly baseline?: string
}

/**
 * One dependency's declared `range` against the registry `latest`, plus its
 * `freshness` verdict.
 *
 * @remarks
 * `note` carries the failure/anomaly CAUSE — see {@link GuideSync.note}.
 */
export interface VersionSync {
	readonly name: string
	readonly range: string
	readonly latest: string
	readonly freshness: Freshness
	readonly note?: string
}

/**
 * The whole outcome of a `Sync.pull`.
 *
 * @remarks
 * `clean` is `true` iff no drift AND no failures; `failed` is the count of
 * guide/version fetches that came back `missing` or `failed`.
 */
export interface SyncReport {
	readonly target: string
	readonly guides: readonly GuideSync[]
	readonly versions: readonly VersionSync[]
	readonly clean: boolean
	readonly failed: number
}

/** The dry-run tally, including the independent source and application environment selections. */
export interface PlanSummary {
	readonly name: string
	readonly src: readonly Environment[]
	readonly app: readonly Environment[]
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

/** `Compiler`'s push observation channel (AGENTS §13). */
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

/** `PlanManager`'s push observation channel (AGENTS §13). */
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
