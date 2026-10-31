import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'

/** Names one environment a generated workspace selects on its `src` or `app` axis. */
export type Environment = 'core' | 'browser' | 'server'

/** Names the surface an extension extends. */
export type Surface = 'browser' | 'styles'

/** Names the workspace axis an extension occupies. */
export type Axis = 'src' | 'app'

/** Names a supported browser framework. */
export type Framework = 'vue'

/** Represents a browser framework and its physically occupied axes. */
export interface BrowserExtension {
	readonly surface: 'browser'
	readonly name: Framework
	readonly axes: readonly Axis[]
}

/** Represents a named sheet face under `src/<name>`. */
export interface StylesExtension {
	readonly surface: 'styles'
	readonly name: string
}

/** Represents an extension discriminated by its surface. */
export type Extension = BrowserExtension | StylesExtension

/** Describes the tooling and package boundaries a browser framework contributes. */
export interface FrameworkDefinition {
	/** Names the Vite plugin package. */
	readonly plugin: string
	/** Names the application typechecker executable. */
	readonly checker: string
	/** Lists source file suffixes without their leading dot. */
	readonly suffixes: readonly string[]
	/** Lists refused package names and implementation scope prefixes. */
	readonly refused: readonly string[]
	/** Maps development package names to their version ranges. */
	readonly dependencies: Readonly<Record<string, string>>
}

/** Names one module format a published library environment builds. */
export type BuildFormat = 'es' | 'cjs'

/**
 * Names how an artifact's content is produced.
 *
 * @remarks
 * `host` is byte-copied from this package's vendored data root. `template` is
 * filled from a frozen template definition. `computed` is derived by this
 * package's own combination logic. Origin says nothing about what scaffold
 * claims at the path; {@link Ownership} says that.
 */
export type Origin = 'host' | 'template' | 'computed'

/**
 * Names what scaffold claims at an artifact's path.
 *
 * @remarks
 * `content` claims the bytes: audit compares them, and a write restores a
 * missing file and replaces a stale one. `presence` claims only that the file
 * exists: audit compares existence, and a write restores an absent file and
 * never touches present bytes. `birth` claims only the file's creation: audit
 * never compares it and always reports it aligned, and a write creates it only
 * while it is absent.
 */
export type Ownership = 'content' | 'presence' | 'birth'

/** Names the artifact group a plan selects over. */
export type Group =
	| 'manifest'
	| 'configs'
	| 'source'
	| 'tests'
	| 'guides'
	| 'docs'
	| 'orchestration'

/**
 * Names how one target path compares to the artifact planned for it.
 *
 * @remarks
 * `foreign` is a path the plan does not own at all. It is also the set
 * `overwrite` deletes from, narrowed by the paths no verb may remove and by
 * what git tracks.
 */
export type Drift = 'aligned' | 'stale' | 'missing' | 'foreign'

/**
 * Names how an upstream lookup resolved: found, missing, unmatched, or failed.
 *
 * @remarks
 * `found` carries the answer. `missing` is an upstream `404`, which is a
 * definite answer that the package is not published there. `unmatched` means
 * the answer was read but no version admits under the declared range. `failed`
 * means the read did not complete because of a transport fault, timeout, byte
 * bound, redirect, or refused response shape. Holding these apart from how a
 * local copy compares is what lets a verdict omit the value it never received
 * instead of inventing an empty one.
 */
export type Lookup = 'found' | 'missing' | 'unmatched' | 'failed'

/** Names the compile phases, in the order they run. */
export type CompileStage = 'draft' | 'gate' | 'pin'

/** Names the coded reasons a scaffold error is raised. */
export type ScaffoldErrorCode = 'INVALID' | 'BLOCKED' | 'DESTROYED' | 'TARGET' | 'WRITE' | 'FETCH'

/** Describes the build and export settings one published `src` environment contributes. */
export interface SrcDefinition {
	readonly configs: readonly string[]
	readonly project: string
	readonly path: string
	readonly formats: readonly BuildFormat[]
}

/**
 * Describes the configuration and runtime-entry settings one private `app` environment
 * contributes.
 */
export interface AppDefinition {
	readonly configs: readonly string[]
	readonly project: string
	readonly entry?: string
}

/**
 * Names which host-specific pipelines a generated root Vite configuration carries.
 *
 * @remarks
 * Boundary guarantees never vary by blueprint, so they are not selected here:
 * every generated configuration emits the environment-boundary plugin, its
 * module-graph audit, and stylesheet rejection. `browser` selects the shared
 * root CSS analysis and real-browser test machinery. `frameworks` selects the
 * browser extension tooling.
 * `output` selects build-output containment.
 * `showcase` selects the optional single-file application-browser projection.
 */
export interface ViteMachinery {
	readonly browser: boolean
	readonly frameworks: readonly Framework[]
	readonly output: boolean
	readonly showcase: boolean
}

/**
 * Represents one runtime `@orkestrel/*` dependency of a generated workspace.
 *
 * @remarks
 * `optional` is meaningful only on a blueprint's `peers`, where it emits a
 * `peerDependenciesMeta` entry beside the peer.
 */
export interface Dependency {
	readonly name: string
	readonly range: string
	readonly optional?: boolean
}

/** Describes the runtime, development, and peer sections read from an existing package manifest. */
export interface ManifestDependencySet {
	readonly runtime: readonly Dependency[]
	readonly development: readonly Dependency[]
	readonly peer: readonly Dependency[]
}

/** Describes the runtime and development sections a range-writing operation may change. */
export interface DependencyPinSet {
	readonly runtime: readonly Dependency[]
	readonly development: readonly Dependency[]
}

/**
 * Represents one manifest script a region-writing operation may replace.
 *
 * @remarks
 * `command` is the value the write lands. `accepted` is the closed set of
 * values the write is willing to overwrite, so a script holding anything else
 * is a chain its author customized and the write retains rather than takes it.
 * Retaining one differing script does not block another named script from being
 * appended or upgraded. An absent script is always writable and needs no entry
 * in `accepted`.
 */
export interface ManifestScript {
	readonly name: string
	readonly command: string
	readonly accepted: readonly string[]
}

/**
 * Represents one string or object brace found in manifest text.
 *
 * @remarks
 * `text` is the brace character or the quoted string with its quotes, `index` is
 * where it starts in the scanned text, and `depth` counts the objects open after
 * it is read, braces alone. `value` is set only for a string that a colon
 * follows, and is the offset of the first character after that colon and the
 * whitespace beside it, so the character at `value` begins the string's value.
 */
export interface ManifestToken {
	readonly text: string
	readonly index: number
	readonly depth: number
	readonly value: number | undefined
}

/**
 * Represents one in-place replacement of manifest text.
 *
 * @remarks
 * `start` and `end` bound the replaced bytes, with `end` exclusive, and `text` takes their
 * place. A writer collects its edits and lands them from the last offset to the first, so
 * each offset still names the text it was read from.
 */
export interface ManifestEdit {
	readonly start: number
	readonly end: number
	readonly text: string
}

/**
 * Describes the manifest regions a writing operation may change.
 *
 * @remarks
 * Each region is written in place, so every byte outside the named ranges
 * survives. `pins` names the declared ranges and `scripts` the declared script
 * values; a region given nothing to write leaves its section untouched.
 * `additions` names dependencies the manifest does not declare, each inserted
 * into the section its list names: `runtime` into `dependencies` and
 * `development` into `devDependencies`. Absent, nothing is inserted.
 * `overrides` names npm selector maps whose string leaves are replaced or inserted.
 * Malformed ancestors and duplicate selected keys refuse the write. This metadata
 * is independent of the artifact replacements carried by `Blueprint.overrides`.
 */
export interface ManifestRegionSet {
	readonly pins: DependencyPinSet
	readonly scripts: readonly ManifestScript[]
	readonly additions?: DependencyPinSet
	readonly overrides?: Readonly<Record<string, Readonly<Record<string, string>>>>
}

/**
 * Represents one artifact override.
 *
 * @remarks
 * `content` replaces the rendered artifact at `path` and never partially
 * merges it. Legality is measured against every artifact the blueprint drafts,
 * before a compile narrows the returned groups. An override that matches none
 * of those artifacts, that targets a host-origin artifact, or that targets the
 * manifest is a blocking question rather than a silent no-op.
 */
export interface Override {
	readonly path: string
	readonly content: string
}

/**
 * Represents the closed, JSON-serializable workspace specification.
 *
 * @remarks
 * `src` selects published library environments and `app` selects private
 * runtime environments. The axes are independent, so library-only,
 * application-only, and mixed workspaces are all first class. `dependencies`
 * are runtime `@orkestrel/*` packages. A peer in the `@orkestrel` scope is a
 * fleet pin; every other peer is a floor. `extras` are package-specific
 * development dependencies and may carry any valid npm name.
 * `bin`, `setup`, `guides`, `integration`, `conformance`, `tree`, `service`,
 * `vendors`, `studies`, `global`, `showcase`, `journey`, `styles`, `themes`, and `skills` are structural facts: each is
 * set only when the workspace physically ships the directory or exact-case file
 * that defines it, never because of the workspace's name and never because a
 * sibling fact is set.
 * `tree` registers the Node proof over the package's real tree at the exact-case
 * `tests/tree.test.ts` path, with `tests/setup.ts` and `tests/setupServer.ts`.
 * `setup` lists the runtimes required by root setup proofs: `node` for generic
 * and server proofs, and `browser` for `tests/setupBrowser.test.ts` and `tests/setupStyles.test.ts`.
 * `journey` selects the birth-owned variant wrapper for a browser application.
 * `skills` registers the `skills` Vitest project over the mirrored proofs of the skill
 * scripts a workspace ships under each `.agents/skills/<skill>/scripts/` directory, and adds their
 * scoped typecheck.
 * `showcase` projects only a browser `app`. The gate answers an absent browser
 * axis with a non-blocking question, so a caller that set the flag learns it
 * emitted nothing and the compile still completes.
 *
 * `service` says the workspace runs a live-service Vitest project over
 * `tests/service`, and it alone registers that project. `vendors` names each
 * external service the workspace drives and emits an inventory skeleton that
 * starts nothing. Neither is derivable from the other: a workspace may declare
 * vendors before it writes a suite, and a suite may drive a service the skeleton
 * does not start.
 *
 * `studies` says the workspace holds at least one exact-case `*.test.ts` file
 * beneath `tests/studies`, nested or direct, outside any `node_modules` or `.git`
 * directory, which Vitest's default exclude never collects, and it alone registers
 * the `studies` Vitest project over that directory. The harness module the study tests import,
 * `tests/setupStudy.ts`, selects nothing and is not planned.
 */
export interface Blueprint {
	readonly name: string
	readonly description?: string
	readonly keywords: readonly string[]
	readonly src: readonly Environment[]
	readonly app: readonly Environment[]
	/** Lists browser faces by their physical axes and sheets by their marker pair. */
	readonly extensions: readonly Extension[]
	/** Selects the exact-case `src/styles/index.scss` marker. */
	readonly styles: boolean
	/** Selects `src/styles/themes/index.scss` beside `src/styles/themes/sheet.ts`. */
	readonly themes: boolean
	readonly dependencies: readonly Dependency[]
	readonly peers: readonly Dependency[]
	readonly extras: readonly Dependency[]
	readonly version: string
	readonly engines: string
	readonly overrides: readonly Override[]
	readonly bin: boolean
	readonly setup: readonly SetupRuntime[]
	readonly guides: boolean
	readonly integration: boolean
	readonly conformance: boolean
	readonly tree: boolean
	readonly service: boolean
	readonly vendors: readonly string[]
	readonly studies: boolean
	readonly global: boolean
	readonly showcase: boolean
	readonly journey: boolean
	readonly skills: boolean
}

/** Names the runtime a root setup proof requires. */
export type SetupRuntime = 'node' | 'browser'

/**
 * Represents one package row of the fleet catalog.
 *
 * @remarks
 * A row whose lookup did not find a version carries the cause instead. It is
 * still a row: dropping it would hide a package the organization publishes
 * behind one failed request, and inventing a version would state something
 * upstream never said.
 *
 * `dependencies` are the RUNTIME edges the published version declares, which is
 * what a publish order is computed over: a runtime bump obliges every dependent
 * to re-pin and republish, while a development bump obliges nothing beyond the
 * repository that declares it. `peers` are the edges the published version
 * declares under `peerDependencies`. A peer edge orders a dependent the same
 * way a runtime edge does: at `0.0.x` a caret peer range pins one exact
 * release, so the peer must be on the registry before the dependent publishes.
 * No layer is recorded here, because a layer is a deterministic function of
 * these edges across the whole catalog — a stored one could only disagree with
 * the rows it was derived from. Read it through {@link catalogToLayers}.
 */
export type CatalogEntry =
	| {
			readonly name: string
			readonly lookup: 'found'
			readonly version: string
			readonly dependencies: readonly Dependency[]
			readonly peers: readonly Dependency[]
			readonly note?: never
	  }
	| {
			readonly name: string
			readonly lookup: 'missing' | 'unmatched' | 'failed'
			readonly note: string
			readonly version?: never
			readonly dependencies?: never
			readonly peers?: never
	  }

/**
 * Represents one foreign tool range required by a browser framework.
 *
 * @remarks
 * `framework` selects the workspaces the hold applies to. `range` supplies their development
 * floor, and `reason` names why that framework cannot use the baseline toolchain.
 */
export interface ToolchainHold {
	readonly framework: Framework
	readonly range: string
	readonly reason: string
}

/**
 * Represents one declared dependency range measured against a registry release.
 *
 * @remarks
 * `range` is the declared range, and `latest` is the version the producer
 * selected. A found lookup carries that selected version; one that produced no
 * answer carries the cause and no selected version. `major`, when present, is
 * the stable major named by the registry's `latest` tag in the same answer.
 */
export type Release =
	| {
			readonly name: string
			readonly range: string
			readonly lookup: 'found'
			readonly latest: string
			readonly major?: number
			readonly note?: never
	  }
	| {
			readonly name: string
			readonly range: string
			readonly lookup: 'missing' | 'unmatched' | 'failed'
			readonly note: string
			readonly major?: number
			readonly latest?: never
	  }

/**
 * Represents one vendored file read from the repository, beside the target bytes it answers for.
 *
 * @remarks
 * `path` is the target-relative path, which is also the checkout-relative path
 * the repository serves, so the file read and the file answered for cannot
 * drift apart. A found lookup carries the file's exact bytes as hexadecimal;
 * one that produced no answer carries the cause and no bytes. `observed` is the target's
 * file as exact bytes when the read was made, and is absent when the target
 * holds no such file; it is the precondition the write is held to, exactly as
 * {@link Finding.observed} is.
 *
 * A found row may carry the target's own bytes rather than read ones, where
 * those bytes already satisfy the claim the read was going to check. They are
 * the same bytes either way, so the row does not record which it holds.
 */
export type HostFile =
	| {
			readonly path: string
			readonly lookup: 'found'
			readonly hex: string
			readonly observed?: string
			readonly note?: never
	  }
	| {
			readonly path: string
			readonly lookup: 'missing' | 'unmatched' | 'failed'
			readonly note: string
			readonly observed?: string
			readonly hex?: never
	  }

/**
 * Represents one dependency guide fetched from upstream, beside the local mirror it answers for.
 *
 * @remarks
 * A found lookup carries the fetched bytes; one that produced no answer carries
 * the cause and no bytes. Either way `observed` is the local mirror's exact
 * bytes as they stood when the fetch was made, and is absent when the mirror
 * was not there; it is the precondition the write is held to, exactly as
 * {@link Finding.observed} is. Whether the mirror is behind is not recorded,
 * because it is `content` against `observed` and a stored answer could only
 * disagree with them. These bytes belong to the catalog verb, which is why a
 * guide mirror is presence-owned: repair restores one that is absent and never
 * replaces one that is present.
 */
export type Mirror =
	| {
			readonly name: string
			readonly path: string
			readonly lookup: 'found'
			readonly content: string
			readonly observed?: string
			readonly note?: never
	  }
	| {
			readonly name: string
			readonly path: string
			readonly lookup: 'missing' | 'unmatched' | 'failed'
			readonly note: string
			readonly observed?: string
			readonly content?: never
	  }

/** Describes the fields every planned file carries. */
export interface ArtifactBase {
	readonly path: string
	readonly group: Group
	readonly ownership: Ownership
	readonly environment?: Environment
}

/**
 * Represents a file byte-copied from the vendored data root, planned before its bytes are read.
 *
 * @remarks
 * `source` falls back to `path` when absent. The pure core face cannot read the
 * vendored root, so a plan it compiles alone claims only that these files
 * exist. That is why the ownership here is narrowed away from `content`: a
 * claim over bytes nobody has read is a claim that cannot be checked. Reading
 * the vendored root turns the ones scaffold owns the bytes of into
 * {@link HydratedArtifact}. Workspace-owned paths and paths whose bytes belong
 * to another verb stay plain host artifacts, because this writer claims only
 * their presence.
 *
 * `pointer`, when true, makes hydration derive the bytes from the vendored file
 * rather than copy them, by `renderSkillPointer`; absence means a copy.
 */
export interface HostArtifact extends ArtifactBase {
	readonly origin: 'host'
	readonly ownership: 'presence' | 'birth'
	readonly source?: string
	readonly pointer?: boolean
	readonly hex?: never
	readonly content?: never
}

/**
 * Represents a vendored file whose exact bytes have been read, so its content can be compared.
 *
 * @remarks
 * `hex` is the canonical lowercase byte pairs of the vendored source. It is
 * required, which is what makes content ownership honest: every artifact
 * claiming a byte comparison carries the bytes that comparison needs. Hydration
 * leaves a guide-mirror pointer and the catalog agent as plain host artifacts,
 * because another verb owns those bytes.
 */
export interface HydratedArtifact extends ArtifactBase {
	readonly origin: 'host'
	readonly ownership: 'content'
	readonly source?: string
	readonly hex: string
	readonly content?: never
}

/** Represents a text file produced by the template or computed compilation path. */
export interface ContentArtifact extends ArtifactBase {
	readonly origin: 'template' | 'computed'
	readonly content: string
	readonly hex?: never
	readonly source?: never
}

/**
 * Represents one file in a plan, discriminated by how its content is produced and what
 * scaffold claims of it.
 *
 * @remarks
 * Every branch that claims `content` ownership carries the bytes to back it:
 * a hydrated artifact through `hex`, a template or computed artifact through
 * `content`. No branch can claim a byte comparison it cannot perform.
 */
export type Artifact = HostArtifact | HydratedArtifact | ContentArtifact

/** Holds exact lowercase hexadecimal target bytes keyed by artifact-relative path. */
export type Snapshot = Readonly<Record<string, string>>

/**
 * Holds the compiled, ordered artifact list and the selection it covers.
 *
 * @remarks
 * `hash` is the plan's content identity and is absent until the pin stage
 * fills it. An artifact at `package.json` carries `birth` ownership because the
 * compiler emits the manifest that way. A plan claiming another ownership at
 * that path contradicts the compiler and is outside this contract.
 */
export interface Plan {
	readonly blueprint: Blueprint
	readonly groups: readonly Group[]
	readonly artifacts: readonly Artifact[]
	readonly hash?: string
}

/**
 * Represents one drift verdict against a target path.
 *
 * @remarks
 * `observed` carries the destination's exact bytes and is the precondition the
 * mutation is held to: a write that replaces stale bytes and a deletion that
 * removes a foreign file each fail when the destination no longer matches what
 * the finding recorded. Both therefore require it, and the requirement is in
 * the type rather than in prose, because a deletion that cannot bind to what
 * the audit showed is the one thing the destructive verb must never do. A
 * missing destination has no bytes to record. An aligned one may have gone
 * uncompared, which is what a birth-owned path always does, so it records
 * bytes only where they were actually read. Every planned finding carries its
 * artifact's {@link Ownership}, so a consumer reads what scaffold claims at the
 * path from the finding itself. A foreign finding has no planned artifact and
 * therefore no ownership.
 *
 * Which combinations of `ownership`, `drift`, and `observed` a real audit
 * produces is {@link inferDrift}'s law, not this type's. A birth-owned path is
 * never compared and is always aligned, a presence-owned path compares existence
 * only, and bytes are recorded only where they were read. This shape therefore
 * admits a combination that law never produces — a birth-owned path reported
 * stale is the plainest one — and it admits it deliberately: restating the
 * comparison's case analysis here would be a second copy of it, able to disagree
 * with the one that decides. What closes the gap is the writer: `repair` and
 * `remove` re-derive every verdict themselves and refuse a caller's audit that
 * does not match, so a verdict the comparison could not have reached is refused
 * rather than acted on.
 */
export type Finding =
	| {
			readonly path: string
			readonly group: Group
			readonly ownership: Ownership
			readonly drift: 'stale'
			readonly observed: string
	  }
	| {
			readonly path: string
			readonly group: Group
			readonly ownership?: never
			readonly drift: 'foreign'
			readonly observed: string
	  }
	| {
			readonly path: string
			readonly group: Group
			readonly ownership: Ownership
			readonly drift: 'missing'
			readonly observed?: never
	  }
	| {
			readonly path: string
			readonly group: Group
			readonly ownership: Ownership
			readonly drift: 'aligned'
			readonly observed?: string
	  }

/**
 * Represents the whole comparison of a plan against a target's current content.
 *
 * @remarks
 * A blocking question means the gate refused the blueprint, so `findings` is
 * empty and says nothing about the target. Tallies are not stored: count
 * `findings` by `drift` or `ownership`. The finding bound is the sum of the
 * separately bounded plan artifacts and snapshot paths.
 */
export interface Audit {
	readonly findings: readonly Finding[]
	readonly questions: readonly Question[]
}

/**
 * Represents one validation issue raised against a blueprint or a plan.
 *
 * @remarks
 * A blocking question fails the gate closed. A non-blocking question is an
 * advisory that rides a complete result. `candidates` names the accepted
 * values when the issue is a rejected choice.
 */
export interface Question {
	readonly field: string
	readonly message: string
	readonly blocking: boolean
	readonly candidates?: readonly string[]
}

/** Represents the tally of one plan by artifact origin. */
export interface PlanSummary {
	readonly name: string
	readonly src: readonly Environment[]
	readonly app: readonly Environment[]
	readonly groups: readonly Group[]
	readonly host: number
	readonly template: number
	readonly computed: number
}

/** Represents the coded reason one compile stage failed. */
export interface CompileFailure {
	readonly code: ScaffoldErrorCode
	readonly message: string
}

/**
 * Holds the input and output snapshot of one compile stage.
 *
 * @remarks
 * `failure` is present exactly when the stage failed.
 */
export interface CompileRecord {
	readonly stage: CompileStage
	readonly input: unknown
	readonly output: unknown
	readonly failure?: CompileFailure
}

/**
 * Represents the replayable outcome of one compile.
 *
 * @remarks
 * `plan` is present exactly when the compile completed, so it is also the
 * completeness test, and `result.plan.blueprint` carries the blueprint it
 * was compiled from. A gated compile returns the questions that closed the gate
 * and the stage records up to it, and no plan; the caller still holds the
 * blueprint it passed in, so repeating it at this level would be one fact stored
 * twice and free to disagree with itself.
 */
export interface CompileResult {
	readonly plan?: Plan
	readonly questions: readonly Question[]
	readonly stages: readonly CompileRecord[]
}

/** Represents the compiler's observation channel. */
export type CompilerEventMap = {
	readonly compile: readonly [result: CompileResult]
	readonly audit: readonly [audit: Audit]
	readonly block: readonly [questions: readonly Question[]]
	readonly error: readonly [error: unknown]
	readonly destroy: readonly []
}

/** Represents the options for the compiler. */
export interface CompilerOptions {
	readonly on?: EmitterHooks<CompilerEventMap>
	readonly error?: EmitterErrorHandler
}

/** Describes the compilation contract: pure, synchronous, and host-independent. */
export interface CompilerInterface {
	readonly emitter: EmitterInterface<CompilerEventMap>
	/**
	 * Compiles a blueprint into a plan through the draft, gate, and pin stages.
	 *
	 * @param blueprint - The workspace specification to compile.
	 * @param groups - The artifact groups to cover; every group when absent.
	 * @returns The compile result, carrying a plan only when the gate passed.
	 */
	compile(blueprint: Blueprint, groups?: readonly Group[]): CompileResult
	/**
	 * Compiles a blueprint and compares its plan to a target's current content.
	 *
	 * @param blueprint - The workspace specification to compile.
	 * @param current - The target's exact bytes, keyed by artifact-relative path.
	 * @param groups - The artifact groups to cover; every group when absent.
	 * @returns The audit; empty findings and blocking questions when the gate refused.
	 */
	audit(blueprint: Blueprint, current: Snapshot, groups?: readonly Group[]): Audit
	/**
	 * Tears the compiler down. Every later call throws, and teardown is idempotent.
	 *
	 * @returns Nothing.
	 */
	destroy(): void
}

/** Represents one owner's bare exported names, including an empty candidate surface. */
export interface SurfaceClaim {
	readonly owner: string
	readonly names: readonly string[]
}

/** Represents a bare name claimed by distinct package owners. */
export interface SurfaceCollision {
	readonly name: string
	readonly owners: readonly string[]
}

/**
 * Represents a declared transfer of one bare name to the package a roadmap item rules keeps it.
 *
 * @remarks
 * `keeper` is the owner admitted into the name's recorded owner set, and `item` is the
 * `ROADMAP.md` item that rules the transfer.
 */
export interface SurfaceTransfer {
	readonly name: string
	readonly keeper: string
	readonly item: number
}

/** Reports a collision's standing against the recorded owner set. */
export interface SurfaceFinding extends SurfaceCollision {
	readonly standing: 'error' | 'recorded' | 'closed'
}

/** Represents a bare name one owner's barrels export from two or more of its environments. */
export interface SurfaceConflict {
	readonly name: string
	readonly owner: string
	readonly environments: readonly string[]
}

/**
 * Represents one owner's claim with the guide `Signature` cell of each name a Surface row documents.
 *
 * @remarks
 * `signatures` maps a claimed name to its cell; a name only a barrel claims has no entry.
 */
export interface SurfaceContract extends SurfaceClaim {
	readonly signatures: ReadonlyMap<string, string>
}

/** Represents a candidate checkout's contract with each name two or more of its environments export. */
export interface SurfaceCandidate extends SurfaceContract {
	readonly conflicts: readonly SurfaceConflict[]
}

/**
 * Names how an added name resembles a name another owner claims.
 *
 * @remarks
 * `case` is a case-fold twin, `plural` a singular or plural form, `edit` a name one insertion,
 * deletion, or substitution away, and `signature` a different name with an equal structure cell.
 */
export type SurfaceSimilarity = 'case' | 'plural' | 'edit' | 'signature'

/**
 * Reports a name a candidate adds beside a near name or an equal contract another owner claims.
 *
 * @remarks
 * `name` and `owner` are the candidate's; `peer` is the other owner's claimed name.
 */
export interface SurfaceAdvisory {
	readonly name: string
	readonly owner: string
	readonly peer: { readonly name: string; readonly owner: string }
	readonly similarity: SurfaceSimilarity
}

/** Represents the configuration template text, grouped by the artifact each template builds. */
export interface ConfigTemplateSet {
	readonly root: { readonly tsconfig: string; readonly vite: string }
	readonly factories: {
		readonly sheet: string
		readonly src: {
			readonly core: string
			readonly vue: string
			readonly browser: string
			readonly server: string
			readonly bin: string
		}
		readonly app: {
			readonly core: string
			readonly browser: string
			readonly vue: string
			readonly journey: string
			readonly showcase: string
			readonly server: string
		}
		readonly policy: string
		readonly config: string
		readonly setup: string
		readonly browser: string
		readonly guides: string
		readonly skills: string
		readonly tree: string
		readonly conformance: string
		readonly service: string
		readonly studies: string
		readonly distribution: string
		readonly probe: string
		readonly integration: { readonly sheet: string; readonly module: string }
	}
	readonly tsconfigs: {
		readonly vue: { readonly src: string; readonly app: string }
		readonly sheet: string
		readonly src: { readonly core: string; readonly browser: string; readonly server: string }
		readonly app: { readonly core: string; readonly browser: string; readonly server: string }
		readonly bin: string
		readonly skills: string
	}
	readonly vites: {
		readonly sheet: string
		readonly src: {
			readonly core: string
			readonly vue: string
			readonly browser: string
			readonly server: string
		}
		readonly bin: string
		readonly app: {
			readonly vue: string
			readonly browser: string
			readonly server: string
			readonly showcase: string
			readonly journey: string
		}
	}
	readonly browsers: string
	readonly commands: string
}

/** Represents the source, test, document, guide, and service template text. */
export interface ArtifactTemplateSet {
	readonly source: {
		readonly sheet: {
			readonly 'index.scss': string
			readonly '_tokens.scss': string
			readonly '_mixins.scss': string
			readonly 'elements/_index.scss': string
			readonly 'components/_index.scss': string
			readonly 'utilities/_index.scss': string
			readonly 'sheet.ts': string
			readonly 'index.ts': string
		}
		readonly themes: {
			readonly 'index.scss': string
			readonly '_default.scss': string
			readonly 'sheet.ts': string
		}
		readonly empty: string
		readonly barrel: string
		readonly main: string
		readonly vue: { readonly 'main.ts': string; readonly 'App.vue': string }
		readonly browser: string
	}
	readonly tests: {
		readonly journey: string
		readonly browser: string
		readonly sheet: string
		readonly styles: { readonly module: string; readonly proof: string }
		readonly setup: string
		readonly global: { readonly module: string; readonly proof: string }
		readonly entry: string
		readonly bin: string
		readonly distribution: {
			readonly module: string
			readonly proof: string
			readonly transport: string
			readonly types: string
			readonly launcher: string
			readonly import: string
			readonly helpers: string
			readonly drive: string
			readonly guard: string
		}
		readonly integration: string
	}
	readonly docs: { readonly readme: string; readonly agents: string }
	readonly guides: { readonly readme: string }
	readonly orchestration: { readonly skill: string; readonly service: string }
}
