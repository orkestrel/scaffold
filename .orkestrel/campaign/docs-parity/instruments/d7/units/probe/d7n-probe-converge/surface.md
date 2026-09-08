## Surface

### Contracts

The data shapes, from [`types.ts`](../src/core/types.ts). Every property is readonly, and an absent
optional field is absent rather than empty.

A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after.

| Name | Kind | Shape | Summary |
| --- | --- | --- | --- |
| `Stage` | type | `'type' \| 'lint' \| 'runtime'` | Names an inspection a claim passes through, derived from `PROBE_STAGES`. |
| `Draft` | interface | `{ path, text }` | Carries one proposed file's location and its contents. |
| `Case` | interface | `{ files, test }` | Carries the candidate drafts a claim asserts about and the test that exercises them. |
| `Control` | interface | `Case plus { stage, reason }` | Extends a case with the stage it must fail at and the reason it must fail there. |
| `Claim` | interface | `{ project, case, control }` | Carries everything the service needs to produce one verdict. |
| `Party` | type | `'claimant' \| 'workspace' \| 'instrument'` | Names who must act on an issue or probe failure. |
| `Issue` | interface | `{ origin, path, message, range? }` | Carries one message a stage reported, where it reported it, and whose fault it names. |
| `Check` | interface | `{ stage, elapsed, issues }` | Carries one stage's outcome: what it cost and what it reported. |
| `Toolchain` | interface | `{ typescript, oxlint, vitest }` | Names the tool versions a verdict was produced with. |
| `Project` | interface | `{ path, digest }` | Names the TypeScript project that judged a verdict's candidate drafts. |
| `Verdict` | interface | `{ id, digest, toolchain, project, reason?, case, control, elapsed, receipt? }` | Carries the full result of one claim: every stage, for both the case and its control. |
| `ProbeEventMap` | type | `{ arm, prove, expire, error }` | Reports what a probe observes while it serves. |
| `ProbeOptions` | interface | `{ on?, error?, workspace?, deadline? }` | Configures a probe. |
| `ProbeInterface` | interface | `{ emitter, toolchain } plus prove, destroy` | Answers a claim with type, lint, and runtime evidence in one call. |
| `ProbeErrorCode` | type | `'refused' \| 'missing' \| 'malformed' \| 'destroyed' \| 'deadline'` | Names the condition that ended a probe operation, derived from `PROBE_ERROR_CODES`. |
| `ProbeErrorContext` | interface | `{ stage?, path?, project?, name?, deadline?, value? }` | Carries the structured detail one probe failure reports beside its message. |
| `ProbeErrorOptions` | interface | `{ origin, code, context?, cause? }` | Configures one probe failure at construction. |

A row whose `Shape` cell names call-signature members after `plus` carries those members in
[`## Methods`](#methods); the data members before `plus` stay here.

### Constants

From [`constants.ts`](../src/core/constants.ts). Each is frozen.

A `Shape` cell holds the constant's declared type.

| Name | Kind | Shape | Summary |
| --- | --- | --- | --- |
| `PROBE_STAGES` | const | `readonly ['type', 'lint', 'runtime']` | Lists the stages a claim passes through, in the order a verdict reports them. |
| `PROBE_PARTIES` | const | `readonly ['claimant', 'workspace', 'instrument']` | Lists the parties that can own action on an issue or probe failure. |
| `RECEIPT_PREFIX` | const | `'probe'` | Names the leading token every receipt carries. |
| `RECEIPT_SEPARATOR` | const | `':'` | Names the character joining a receipt's tokens. |
| `PROBE_ERROR_CODES` | const | `readonly ['refused', 'missing', 'malformed', 'destroyed', 'deadline']` | Lists the conditions that can end a probe operation. |
| `PROBE_DEADLINE` | const | `30_000` | Names the default inspection deadline a `Probe` applies when its construction omits one. |
| `LINT_DEADLINE` | const | `2_000` | Names the bound the lint stage holds over the lifecycle exchanges the protocol leaves to the server: the `initialize` reply warming waits for and the `shutdown` reply ending waits for. |
| `PROBE_KEYS` | const | `4096` | Names the total enumerable key bound `ProbeServer` applies to inbound metadata and to produced tool content alike. |
| `PROBE_SPECIFICATIONS` | const | `64` | Names the specification lifetime the runtime stage replaces its resident Vitest service at. |
| `RUNTIME_PLUGIN` | const | `'orkestrel-runtime-overlay'` | Names the Vite plugin the runtime stage installs into a target workspace's Vitest configuration. |
| `TYPE_MIRROR` | const | `'tmp/type'` | Names the workspace-relative directory the type stage keeps its workspace mirror under. |

### Errors

The failure type every served claim reports through, and its guard, from
[`errors.ts`](../src/core/errors.ts).

| Name | Kind | Signature | Summary |
| --- | --- | --- | --- |
| `ProbeError` | class | `new (message: string, options: ProbeErrorOptions)` | Reports one probe failure under stable ownership and condition axes. |
| `isProbeError` | function | `(value: unknown) => value is ProbeError` | Checks whether an unknown value is a `ProbeError`. |
| `createDestroyedError` | function | `(subject: string) => ProbeError` | Creates the failure raised when an instrument is used after it was torn down. |

### Shapes

The blueprints behind both the published tool schema and the guard applied to an arriving call, from
[`shapers.ts`](../src/core/shapers.ts). `CLAIM_SHAPE` compiles to the `prove` tool's JSON Schema. The
schema is the wire contract's shape and `isClaim` is the admission rule, and the rule is narrower on
`Draft.path`: see [The advertised schema is wider than the admission rule](#registering-the-server).

| Name | Kind | Summary |
| --- | --- | --- |
| `DRAFT_SHAPE` | const | Describes one proposed file a claim carries. |
| `CASE_SHAPE` | const | Describes the drafts a claim asserts about and the test that exercises them. |
| `CONTROL_SHAPE` | const | Describes the negative control, which is a case plus where and why it must break. |
| `CLAIM_SHAPE` | const | Describes one claim and is the sole source of both the published tool schema and the guard applied to an arriving claim. |

### Validators

Total guards, from [`validators.ts`](../src/core/validators.ts). Each returns a boolean for any input
and never throws.

In a guard table a `Shape` cell holds the type the guard narrows to.

| Name | Kind | Shape | Summary |
| --- | --- | --- | --- |
| `isStage` | const | `Stage` | Checks whether an unknown value is a `Stage`. |
| `isParty` | const | `Party` | Checks whether an unknown value is a `Party`. |
| `isDraft` | const | `Draft` | Checks whether an unknown value is a `Draft`. |
| `isCase` | const | `Case` | Checks whether an unknown value is a `Case`. |
| `isControl` | const | `Control` | Checks whether an unknown value is a `Control`. |
| `isClaim` | const | `Claim` | Checks whether an unknown value is a `Claim`. |
| `isIssue` | const | `Issue` | Checks whether an unknown value is an `Issue`. |
| `isCheck` | const | `Check` | Checks whether an unknown value is a `Check`. |
| `isToolchain` | const | `Toolchain` | Checks whether an unknown value is a `Toolchain`. |
| `isProject` | const | `Project` | Checks whether an unknown value is a `Project`. |
| `isVerdict` | const | `Verdict` | Checks whether an unknown value is a `Verdict`. |

### Formatters and the token

Pure leaves, from [`helpers.ts`](../src/core/helpers.ts).

| Name | Kind | Signature | Summary |
| --- | --- | --- | --- |
| `formatIssue` | function | `(issue: Issue) => string` | Renders one tool message as a single line an agent can classify and locate. |
| `formatCheck` | function | `(check: Check) => string` | Renders one stage's outcome as its summary line followed by every message it reported. |
| `formatProof` | function | `(verdict: Verdict) => string` | Renders the closing line a rendered verdict ends with: the receipt it earned, or its absence. |
| `formatReceipt` | function | `(verdict: Verdict) => string` | Renders the smallest text a verdict can travel as: what it judged, and how it ended. |
| `formatVerdict` | function | `(verdict: Verdict) => string` | Renders a whole verdict as the text an agent reads. |
| `computeReceipt` | function | `(verdict: Verdict, stage: Stage) => string \| undefined` | Computes the proof token a verdict carries, or returns nothing when the claim was not proven. |
| `formatSpecification` | function | `(text: string, revision: string) => string` | Renders one generated specification: the caller's own test text, then the marker naming the revision that wrote it. |
| `matchesSpecification` | function | `(text: string, revision: string) => boolean` | Checks whether one file's text is the generated specification written for one revision. |

### Server contracts

From [`types.ts`](../src/server/types.ts).

A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. An extended interface's name comes before `plus`, with the members it adds after.

| Name | Kind | Shape | Summary |
| --- | --- | --- | --- |
| `Inspection` | interface | `{ subject, claim }` | Carries one queued inspection: the case a stage reads and the claim it belongs to. |
| `InspectionOptions` | interface | `{ signal }` | Carries the bound a caller holds over one stage inspection. |
| `OverlayInterface` | interface | `{ revision, paths } plus set, text, covers, clear` | Holds the candidate drafts one inspection substitutes for the files a tool would read from disk. |
| `StageInterface` | interface | `{ stage, progress } plus inspect, destroy` | Inspects one case with the workspace's own tool. |
| `TypeStageInterface` | interface | `StageInterface plus inspect, resolve` | Inspects TypeScript source against a caller-named project and reports what that project is. |
| `LintStageInterface` | interface | `StageInterface plus inspect` | Inspects one case under a bound the caller supplies. |
| `WorkspaceManifest` | interface | `{ path, contents }` | Carries one parsed package manifest and the path it came from. |
| `Diagnostic` | interface | `{ path?, range?, message }` | Carries one diagnostic line a compiler run reported, in this package's own coordinates. |
| `ProjectConfig` | interface | `{ compilerOptions, files?, include? }` | Carries what one TypeScript project resolved to, as the compiler itself printed it. |
| `Execution` | interface | `{ status?, stdout, stderr }` | Carries what one spawned workspace command reported when it closed. |
| `ProbeServerInterface` | interface | `{} plus start, destroy` | Serves one probe over this process's Model Context Protocol stdio transport. |
| `ListenerCapture` | type | `ReadonlyMap<string, readonly Function[]>` | Holds the listeners one emitter carried for a set of events at the moment it was captured. |

`StageInterface.progress` is the seam a foreign coordinator reads to decide whose budget an expiry
belongs to, and this is the proof behind it.
[`RuntimeStage.test.ts`](../tests/src/server/stages/RuntimeStage.test.ts) proves the gauge boundary
deterministically: it holds one inspection at the results cache with a FIFO, reads `progress`
elevated while the caller's run is in flight, and reads it level with its pre-inspection value while
the stage evicts.
[`LintStage.test.ts`](../tests/src/server/stages/LintStage.test.ts) reads the same boundary at the
other stage that owns cleanup: it fills the pipe the stage writes to, so the `didClose` the stage
owes its own language server is still waiting for room while the gauge reads level.
Claimant-side expiry is proven end to end through `Probe`, which rejects a claim
that outran the budget with `origin: 'claimant'`, `code: 'deadline'`, and the expired stage in
`context`. The composed instrument-side expiry — a real expiry during stage-owned work, attributed
through `Probe` — has no executed proof, and the gauge is the seam a proof of it reads.

### The engine

The classes, each exported from its own file. Each implements the contract its name names:
[`Probe`](../src/server/Probe.ts) implements `ProbeInterface`,
[`ProbeServer`](../src/server/ProbeServer.ts) implements `ProbeServerInterface`,
[`TypeStage`](../src/server/stages/TypeStage.ts) implements `TypeStageInterface`,
[`LintStage`](../src/server/stages/LintStage.ts) implements `LintStageInterface`,
[`RuntimeStage`](../src/server/stages/RuntimeStage.ts) implements `StageInterface`, and
[`Overlay`](../src/server/Overlay.ts) implements `OverlayInterface`.

| Name | Kind | Summary |
| --- | --- | --- |
| `Probe` | class | Answers claims through its type, lint, and runtime stages. |
| `ProbeServer` | class | Serves one probe over this process's Model Context Protocol stdio transport. |
| `TypeStage` | class | Inspects TypeScript source by running the target workspace's own compiler over a mirror of it. |
| `LintStage` | class | Inspects virtual documents through one resident Oxlint language server. |
| `RuntimeStage` | class | Inspects tests through one resident Vitest service from the target workspace. |
| `Overlay` | class | Holds the candidate drafts one inspection substitutes for the files a tool would read from disk. |

Each stage takes one optional `workspace` argument and defaults to the working directory. A stage
serves one inspection at a time and admits none itself, so drive stages through `Probe` unless you
are building your own coordinator.

`new Overlay()` takes no arguments, so a coordinator of your own can mint one. Mint it per
inspection and release it when that inspection ends. An overlay shared across inspections keeps the
identity a resident tool caches its answers against, so the second inspection reads the first one's
answer as a fresh one.

`RuntimeStage` is the stage that holds one. A lookup key matches a recorded path exactly, after both
sides pass through `normalizePath`, and case is never folded. On a host that resolves two spellings
of one file name to one file, Vite serves a covered path under whichever spelling it met first, and
the stage reports that as the `workspace` issue `The workspace configuration served this module
before the runtime overlay` rather than leaving it answered silently. `TypeStage` holds no overlay:
it writes each draft into its mirror as a real file, so the host's own file-name comparison decides
what a draft shadows.

### Server helpers

Pure leaves and workspace readers, from [`helpers.ts`](../src/server/helpers.ts).

| Name | Kind | Signature | Summary |
| --- | --- | --- | --- |
| `normalizePath` | function | `(path: string) => string` | Rewrites one path into the forward-slash spelling this package compares and reports paths in. |
| `readFaultCode` | function | `(error: unknown) => string \| undefined` | Reads the condition code a native fault carries. |
| `escapesRoot` | function | `(root: string, target: string) => boolean` | Reports whether one path resolves outside the root it is read against. |
| `resolveWorkspaceFile` | function | `(workspace: string, target: string, mutate?: boolean) => string` | Resolves a path inside a target workspace and rejects traversal outside it. |
| `overwriteFile` | function | `(file: string, text: string) => void` | Overwrites a file that already exists, through a descriptor that refuses a symbolic link at the final component. |
| `isRefusedName` | function | `(file: string, error: unknown) => boolean` | Reports whether a fault means the host refuses the name a caller supplied for a file to create. |
| `relativeWorkspaceFile` | function | `(workspace: string, file: string) => string` | Projects an absolute tool path into the workspace-relative form issues expose. |
| `relativeWorkspaceMessage` | function | `(workspace: string, message: string) => string` | Projects the paths one tool named in a message into the forms this package's issues expose. |
| `scanDiagnostics` | function | `(text: string) => readonly Diagnostic[]` | Scans the plain-text output of one compiler run into the diagnostics it reported. |
| `resolveWorkspaceModule` | function | `(workspace: string, specifier: string) => string` | Resolves one installed module from the target workspace. |
| `loadWorkspaceVitest` | function | `(workspace: string) => typeof import('vitest/node')` | Loads the installed `vitest/node` module from a target workspace. |
| `readWorkspaceManifest` | function | `(workspace: string, name: string) => WorkspaceManifest` | Reads one installed package manifest from the target workspace. |
| `resolveWorkspaceBinary` | function | `(workspace: string, name: string, command?: string) => string` | Resolves a package's portable JavaScript binary from the target workspace. |
| `inferTypeProject` | function | `(path: string) => string` | Selects the scoped TypeScript project for one candidate draft path. |
| `inferTestProject` | function | `(path: string) => string \| undefined` | Selects the Vitest project whose environment matches one test path. |
| `inferDocumentLanguage` | function | `(path: string) => string` | Selects the Language Server Protocol language identifier for a source path. |
| `buildRevisionPath` | function | `(workspace: string, path: string, revision: string) => string` | Builds the fresh sibling path a revision's file is written at, preserving the test's resolution directory. |
| `matchesWorkspaceModule` | function | `(path: string) => boolean` | Reports whether a path is a workspace module Vitest can cache. |
| `matchesLiveProcess` | function | `(id: number) => boolean` | Reports whether the host that wrote one file is still running. |
| `collectWorkspaceFiles` | function | `(workspace: string) => readonly string[]` | Collects every regular file a target workspace holds, skipping the trees no inspection reads. |
| `filterUniqueIssues` | function | `(issues: readonly Issue[]) => readonly Issue[]` | Filters one issue list to the distinct issues it carries, in the order they arrived. |
| `describeUnknown` | function | `(value: unknown) => string` | Normalizes a caught or foreign error into readable text. |
| `guardStage` | function | `<T>(stage: Stage, operation: Promise<T>) => Promise<T>` | Guards one stage operation with the stage failure contract. |
| `findRefusedPaths` | function | `(value: unknown) => readonly string[]` | Names every draft member of a claim-shaped value whose `path` this package's guard refuses. |
| `normalizeValue` | function | `(workspace: string, value: unknown) => unknown` | Rewrites every workspace-contained absolute path in a value to its workspace-relative form and sorts every record's keys. |
| `computeDigest` | function | `(workspace: string, value: unknown) => string` | Computes the canonical digest of one value as it stands in a target workspace. |
| `captureListeners` | function | `(emitter: EventEmitter, events: readonly string[]) => ListenerCapture` | Records the listeners one emitter carries for a set of events. |
| `releaseListeners` | function | `(emitter: EventEmitter, capture: ListenerCapture) => void` | Removes every listener one emitter gained for the captured events since its capture. |

### Server parsers

Coercers over the text a tool wrote, from [`parsers.ts`](../src/server/parsers.ts). Each returns
`undefined` for text it cannot read rather than throwing.

| Name | Kind | Signature | Summary |
| --- | --- | --- | --- |
| `parseProjectConfig` | function | `(text: string) => ProjectConfig \| undefined` | Parses the configuration one compiler run printed for a TypeScript project. |
| `parseRevisionOwner` | function | `(revision: string) => number \| undefined` | Parses the process id one revision identity names. |

## Methods

The public call-signature members of each behavioral interface, one table per interface.

#### `ProbeInterface`

| Method | Returns | Summary |
| --- | --- | --- |
| `prove` | `Promise<Verdict>` | Answers one claim with every stage's evidence. |
| `destroy` | `Promise<void>` | Tears down every stage and releases the processes and the mirror they hold. |

#### `StageInterface`

| Method | Returns | Summary |
| --- | --- | --- |
| `inspect` | `Promise<Check>` | Inspects one case. |
| `destroy` | `Promise<void>` | Tears down the resident tool or the mirror and releases its resources. |

#### `TypeStageInterface`

| Method | Returns | Summary |
| --- | --- | --- |
| `inspect` | `Promise<Check>` | Inspects one case, against a caller-named project where the caller names one. |
| `resolve` | `Promise<Project>` | Resolves one project to the path and digest the stage applies for it. |
| `destroy` | `Promise<void>` | Tears down the resident tool or the mirror and releases its resources. |

#### `LintStageInterface`

| Method | Returns | Summary |
| --- | --- | --- |
| `inspect` | `Promise<Check>` | Inspects one case, under the bound the caller supplies. |
| `destroy` | `Promise<void>` | Tears down the resident tool or the mirror and releases its resources. |

#### `OverlayInterface`

| Method | Returns | Summary |
| --- | --- | --- |
| `set` | `void` | Records one candidate's text against the absolute path it stands in for. |
| `text` | `string \| undefined` | Reads the candidate text recorded for one absolute path. |
| `covers` | `boolean` | Checks whether a candidate sits beneath one directory. |
| `clear` | `void` | Releases every candidate. |

#### `ProbeServerInterface`

| Method | Returns | Summary |
| --- | --- | --- |
| `start` | `void` | Serves the probe over this process's standard input and output. |
| `destroy` | `Promise<void>` | Releases the transport, the process listeners, and the probe behind them. |
