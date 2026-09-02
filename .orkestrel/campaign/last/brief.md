# Last changes: brief

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `2324035`, merge base with `origin/main` `c5d8671`, layer L4, declared version 0.0.6, registry version 0.0.6.

## Commits since origin/main

```text
e418b7d 2026-08-28 Update every dependency to the published latest
eff22df 2026-08-28 Adopt the catalog and guide mirrors for the wave
65d1e99 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
c5b3c79 2026-09-01 Apply the verified src-audit fixes
0322df7 2026-09-01 Adopt the renamed guide helpers in the parity test
3b94bdb 2026-09-02 Rename the brief manager's tally to count and adopt the interpret and reason surfaces
bc0f767 2026-09-02 Drop every count over a set in the brief guide and explain the bound delegate once
2324035 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md         |  17 ++++----
 package.json                        |   6 +--
 src/core/BriefCompiler.ts           |   2 +-
 src/core/BriefManager.ts            |  10 ++---
 src/core/cloners.ts                 |   2 +-
 src/core/constants.ts               |  28 ++++++------
 src/core/errors.ts                  |   6 +--
 src/core/factories.ts               |  11 ++---
 src/core/helpers.ts                 | 179 ++++++++++++++++++++++++++++++++++++++++++++--------------------------------
 src/core/parsers.ts                 |   2 +-
 src/core/shapers.ts                 |  30 ++++++-------
 src/core/types.ts                   | 150 ++++++++++++++++++++++++++++++++-------------------------------
 src/core/validators.ts              |  36 ++++++++--------
 tests/guides.test.ts                |  29 +++++++------
 tests/setup.test.ts                 |   2 +-
 tests/setup.ts                      |  31 +++++++------
 tests/src/core/BriefManager.test.ts |  24 +++++------
 tests/src/core/factories.test.ts    |   4 +-
 tests/src/core/helpers.test.ts      |  16 +++++++
 19 files changed, 321 insertions(+), 264 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 040a09f..e079815 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,7 +1,7 @@
 import type { Interpretation } from '@orkestrel/interpret'
 import type { OutputFormat, RiskSeverity, TaskDomain, TaskOperation } from './types.js'
 
-/** The twelve `TaskOperation` values, frozen. */
+/** Lists the `TaskOperation` values, frozen. */
 export const TASK_OPERATIONS: readonly TaskOperation[] = Object.freeze([
 	'create',
 	'refactor',
@@ -17,7 +17,7 @@ export const TASK_OPERATIONS: readonly TaskOperation[] = Object.freeze([
 	'plan',
 ])
 
-/** The eight `TaskDomain` values, frozen. */
+/** Lists the `TaskDomain` values, frozen. */
 export const TASK_DOMAINS: readonly TaskDomain[] = Object.freeze([
 	'code',
 	'writing',
@@ -29,7 +29,7 @@ export const TASK_DOMAINS: readonly TaskDomain[] = Object.freeze([
 	'other',
 ])
 
-/** The five `OutputFormat` values, frozen. */
+/** Lists the `OutputFormat` values, frozen. */
 export const OUTPUT_FORMATS: readonly OutputFormat[] = Object.freeze([
 	'markdown',
 	'json',
@@ -38,11 +38,11 @@ export const OUTPUT_FORMATS: readonly OutputFormat[] = Object.freeze([
 	'prose',
 ])
 
-/** The three `RiskSeverity` values, frozen. */
+/** Lists the `RiskSeverity` values, frozen. */
 export const RISK_SEVERITIES: readonly RiskSeverity[] = Object.freeze(['low', 'medium', 'high'])
 
 /**
- * Every published `Interpretation` member name, frozen.
+ * Lists every published `Interpretation` member name, frozen.
  *
  * @remarks
  * The capture list `BriefCompiler` hands `captureValue` at each interpret door — the borrowed
@@ -73,7 +73,7 @@ export const INTERPRETATION_MEMBERS = Object.freeze([
 ] satisfies ReadonlyArray<keyof Interpretation>)
 
 /**
- * `16` — the default turn cap `briefToGoal` renders.
+ * Holds `16` — the default turn cap `briefToGoal` renders.
  *
  * @remarks
  * Domain-qualified so the barrel stays collision-free as sibling modules add their own
@@ -81,23 +81,23 @@ export const INTERPRETATION_MEMBERS = Object.freeze([
  */
 export const DEFAULT_BRIEF_TURNS = 16
 
-/** `'gate'` — the id of the `gateDefinition()` logical definition. */
+/** Holds `'gate'` — the id of the `gateDefinition()` logical definition. */
 export const GATE_ID = 'gate'
 
 /**
- * Every line terminator a brief field refuses.
+ * Matches every line terminator a brief field refuses.
  *
  * @remarks
- * The four ECMAScript line terminators, not just `\n`: a renderer that splits on any of
- * them would let the other three forge a markdown row. CRLF leads the alternation so a
- * Windows exemplar splits as ONE break rather than two, which would insert a blank line the
- * caller never wrote. Kept unanchored and stateless — no `g` flag — so `test` never carries
+ * Every ECMAScript line terminator, not just `\n`: a renderer that splits on any of them
+ * would let the others forge a markdown row. CRLF leads the alternation so a Windows
+ * exemplar splits as ONE break rather than two, which would insert a blank line the caller
+ * never wrote. Kept unanchored and stateless — no `g` flag — so `test` never carries
  * `lastIndex` between calls.
  */
 export const LINE_BREAK_PATTERN = /\r\n|[\n\r\u2028\u2029]/
 
 /**
- * The positive form of {@link LINE_BREAK_PATTERN}, for the shape DSL.
+ * Holds the positive form of {@link LINE_BREAK_PATTERN}, for the shape DSL.
  *
  * @remarks
  * `stringShape`'s `pattern` must MATCH an accepted value, so the guard's refusal regex
@@ -107,7 +107,7 @@ export const LINE_BREAK_PATTERN = /\r\n|[\n\r\u2028\u2029]/
 export const SINGLE_LINE_PATTERN = /^[^\n\r\u2028\u2029]*$/
 
 /**
- * A string of one or more spaces and nothing else.
+ * Matches a string of one or more spaces and nothing else.
  *
  * @remarks
  * The one exemplar side `exampleToLines` must NOT pad. CommonMark strips a fully-blank code
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 5d7ccd9..ec368ef 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,7 +1,7 @@
 import type { BriefErrorCode } from './types.js'
 
 /**
- * The one error class this package throws.
+ * Represents the one error class this package throws.
  *
  * @remarks
  * Throws are reserved for caller misuse: `assertBrief`, `snapshotBrief`, and `pinBrief` on
@@ -33,10 +33,10 @@ export class BriefError extends Error {
 }
 
 /**
- * Narrow a caught value to a {@link BriefError}.
+ * Narrows a caught value to a {@link BriefError}.
  *
  * @param value - The caught value to inspect.
- * @returns `true` when `value` is a `BriefError`.
+ * @returns True if `value` is a `BriefError`; false otherwise.
  *
  * @example
  * ```ts
diff --git a/src/core/types.ts b/src/core/types.ts
index 49a7a65..cbd8b98 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,13 +1,13 @@
 import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkestrel/emitter'
-import type { Interpretation, InterpretInterface, ManagerAddOptions } from '@orkestrel/interpret'
+import type { Interpretation, InterpretInterface, RecordOptions } from '@orkestrel/interpret'
 import type { LogicalResult, ReasonInterface, Subject } from '@orkestrel/reason'
 
 /**
- * The closed vocabulary of what a brief asks for.
+ * Names the closed vocabulary of what a brief asks for.
  *
  * @remarks
- * A request that fits none of these twelve is mis-scoped rather than a missing
- * literal. Compose with `literalOf(TASK_OPERATIONS)` or `parseEnum(value, TASK_OPERATIONS)`.
+ * A request that fits none of these is mis-scoped rather than a missing literal. Compose
+ * with `literalOf(TASK_OPERATIONS)` or `parseEnum(value, TASK_OPERATIONS)`.
  */
 export type TaskOperation =
 	| 'create'
@@ -23,7 +23,7 @@ export type TaskOperation =
 	| 'document'
 	| 'plan'
 
-/** The closed vocabulary of the subject matter a brief operates on. */
+/** Names the closed vocabulary of the subject matter a brief operates on. */
 export type TaskDomain =
 	| 'code'
 	| 'writing'
@@ -34,31 +34,31 @@ export type TaskDomain =
 	| 'ops'
 	| 'other'
 
-/** The closed vocabulary of deliverable shapes. */
+/** Names the closed vocabulary of deliverable shapes. */
 export type OutputFormat = 'markdown' | 'json' | 'code' | 'diff' | 'prose'
 
-/** The closed vocabulary of risk severities. */
+/** Names the closed vocabulary of risk severities. */
 export type RiskSeverity = 'low' | 'medium' | 'high'
 
-/** The four fixed compilation phases, in pipeline order. */
+/** Names the fixed compilation phases, in pipeline order. */
 export type BriefStage = 'interpret' | 'draft' | 'gate' | 'pin'
 
 /**
- * The machine-readable reasons a {@link BriefError} carries.
+ * Names the machine-readable reasons a {@link BriefError} carries.
  *
  * @remarks
- * Inside `compile` every stage failure is CONTAINED: the four `*_FAILED` codes and
- * `BLOCKED` mark it on the {@link Briefing} rather than throwing.
+ * Inside `compile` every stage failure is CONTAINED: the `*_FAILED` codes and `BLOCKED`
+ * mark it on the {@link Briefing} rather than throwing.
  *
  * `INTERPRET_FAILED` needs a FOREIGN `InterpretInterface`. `@orkestrel/interpret` contains
  * its own stage failures and returns a degraded `Interpretation` rather than throwing, so
  * the default engine never raises it; `BriefCompilerOptions.interpret` is the seam a caller
- * reaches it through. Three codes also reach a
- * throw, from methods outside that containment — `INVALID` from `assertBrief`,
- * `snapshotBrief`, and `pinBrief`; `DESTROYED` from any method after
- * `destroy()`; and `GATE_FAILED` from `BriefCompiler.gate` when a borrowed reasoner returns a
- * non-logical result OR throws its own error, which is translated rather than leaked so that
- * every throw out of this module stays a `BriefError` an `isBriefError` catch can narrow.
+ * reaches it through. Other codes also reach a throw, from methods outside that containment —
+ * `INVALID` from `assertBrief`, `snapshotBrief`, and `pinBrief`; `DESTROYED` from any method
+ * after `destroy()`; and `GATE_FAILED` from `BriefCompiler.gate` when a borrowed reasoner
+ * returns a non-logical result OR throws its own error, which is translated rather than
+ * leaked so that every throw out of this module stays a `BriefError` an `isBriefError` catch
+ * can narrow.
  */
 export type BriefErrorCode =
 	| 'INTERPRET_FAILED'
@@ -70,7 +70,7 @@ export type BriefErrorCode =
 	| 'DESTROYED'
 
 /**
- * What the brief asks for, in one imperative sentence.
+ * States what the brief asks for, in one imperative sentence.
  *
  * @remarks
  * A compound `statement` is two briefs — `validateBrief` errors on more than one sentence.
@@ -82,7 +82,7 @@ export interface Task {
 }
 
 /**
- * One referenced path and why it is listed.
+ * Represents one referenced path and why it is listed.
  *
  * @remarks
  * The ONE path record. A reference means different things in different containers, and the
@@ -101,7 +101,7 @@ export interface Reference {
 }
 
 /**
- * The four disjoint file partitions of a brief.
+ * Represents the disjoint file partitions of a brief.
  *
  * @remarks
  * `read` order is the reading order. A path in more than one partition is a
@@ -115,7 +115,7 @@ export interface Manifest {
 }
 
 /**
- * One ranked outcome — a result, never a step.
+ * Represents one ranked outcome — a result, never a step.
  *
  * @remarks
  * `required: true` gates "done"; a demoted outcome is desirable but not blocking.
@@ -126,14 +126,14 @@ export interface Outcome {
 	readonly required: boolean
 }
 
-/** One context fact handed to the executor — a convention, a version, a constraint value. */
+/** Represents one context fact handed to the executor — a convention, a version, a constraint value. */
 export interface Given {
 	readonly category: string
 	readonly name: string
 	readonly value: string
 }
 
-/** One input to output exemplar — the highest-leverage ambiguity remover. */
+/** Represents one input to output exemplar — the highest-leverage ambiguity remover. */
 export interface Example {
 	readonly input: string
 	readonly output: string
@@ -141,7 +141,7 @@ export interface Example {
 }
 
 /**
- * One external source — what it is called, where it lives, and why it is cited.
+ * Represents one external source — what it is called, where it lives, and why it is cited.
  *
  * @remarks
  * List ORDER is the trust order; there is no per-entry weight.
@@ -161,12 +161,14 @@ export interface Example {
  * and the shape DSL's seeded generator builds a random alphanumeric string and throws when it
  * fails the pattern — so any pattern requiring a scheme's colon makes `createBriefContract()`
  * ungeneratable for the whole brief. Constraining only the guard would leave the guard and the
- * compiled shape disagreeing, which is the parity this package holds in lockstep. Four working
- * mechanisms beat one stricter member.
+ * compiled shape disagreeing, which is the parity this package holds in lockstep. Keeping the
+ * guard, the compiled shape, the generator, and `createBriefContract()` working beats one
+ * stricter member.
  *
  * The cost lands on one migration: `citation` takes `(name, url, note)` where it once took
- * `(name, role, url)` — three strings either way, so a stale call still compiles and still
- * passes the guard, and only renders wrong. Nothing is published, so a version bump carries it.
+ * `(name, role, url)` — strings in the same positions either way, so a stale call still
+ * compiles and still passes the guard, and only renders wrong. Nothing is published, so a
+ * version bump carries it.
  */
 export interface Citation {
 	readonly name: string
@@ -175,7 +177,7 @@ export interface Citation {
 }
 
 /**
- * One unknown the brief has not resolved.
+ * Represents one unknown the brief has not resolved.
  *
  * @remarks
  * `blocking: true` means no safe default exists and the gate must fail closed. An
@@ -188,7 +190,7 @@ export interface Gap {
 	readonly candidates?: readonly string[]
 }
 
-/** One pre-empted risk and the mitigation that answers it. */
+/** Represents one pre-empted risk and the mitigation that answers it. */
 export interface Risk {
 	readonly severity: RiskSeverity
 	readonly text: string
@@ -196,7 +198,7 @@ export interface Risk {
 }
 
 /**
- * The closed shape of the deliverable.
+ * Represents the closed shape of the deliverable.
  *
  * @remarks
  * `format` is required; `sections` / `include` / `exclude` refine it.
@@ -209,10 +211,10 @@ export interface Output {
 }
 
 /**
- * One mechanical, transcript-provable check.
+ * Represents one mechanical, transcript-provable check.
  *
  * @remarks
- * `command` should carry a clear exit signal — it becomes the `/goal` condition verbatim.
+ * Give `command` a clear exit signal; it becomes the `/goal` condition verbatim.
  */
 export interface Proof {
 	readonly text: string
@@ -220,7 +222,7 @@ export interface Proof {
 }
 
 /**
- * The closed execution contract — a rough request with every implicit decision resolved.
+ * Represents the closed execution contract — a rough request with every implicit decision resolved.
  *
  * @remarks
  * `trace` and `hash` are DERIVED by `pinBrief`. The `brief` builder cannot set them, so
@@ -252,14 +254,15 @@ export interface Brief {
 }
 
 /**
- * One `compile()` input.
+ * Represents one `compile()` input.
  *
  * @remarks
- * THREE classes of input, not two. `text` selects the interpret stage. `interpretation`
- * supplies that stage's result directly: with no `text` it drives `deriveTask`,
- * `deriveGivens`, and `deriveGaps` without running the language pipeline at all, and with
- * `text` present it is also the FALLBACK the draft uses when the interpret engine throws.
- * Every remaining key is a caller-authored section merged OVER whatever the draft derived.
+ * `text`, `interpretation`, and the caller-authored sections are SEPARATE classes of input.
+ * `text` selects the interpret stage. `interpretation` supplies that stage's result
+ * directly: with no `text` it drives `deriveTask`, `deriveGivens`, and `deriveGaps` without
+ * running the language pipeline at all, and with `text` present it is also the FALLBACK the
+ * draft uses when the interpret engine throws. Every remaining key is a caller-authored
+ * section merged OVER whatever the draft derived.
  *
  * Supplying both `text` and `interpretation` is therefore meaningful: the engine's result
  * wins when it succeeds, and the supplied one carries the compile when it does not.
@@ -284,7 +287,7 @@ export interface BriefInput {
 }
 
 /**
- * The `interpret` phase snapshot — raw text in, an `Interpretation` out.
+ * Records the `interpret` phase snapshot — raw text in, an `Interpretation` out.
  *
  * @remarks
  * `output` is absent exactly when `error` is present, which is what makes the phase
@@ -297,7 +300,7 @@ export interface InterpretStageRecord {
 	readonly error?: string
 }
 
-/** The `draft` phase snapshot — the caller's input in, an unpinned `Brief` out. */
+/** Records the `draft` phase snapshot — the caller's input in, an unpinned `Brief` out. */
 export interface DraftStageRecord {
 	readonly stage: 'draft'
 	readonly input: BriefInput
@@ -305,7 +308,7 @@ export interface DraftStageRecord {
 	readonly error?: string
 }
 
-/** The `gate` phase snapshot — the readiness `Subject` in, the reasoner's verdict out. */
+/** Records the `gate` phase snapshot — the readiness `Subject` in, the reasoner's verdict out. */
 export interface GateStageRecord {
 	readonly stage: 'gate'
 	readonly input: Subject
@@ -313,7 +316,7 @@ export interface GateStageRecord {
 	readonly error?: string
 }
 
-/** The `pin` phase snapshot — the drafted `Brief` in, the pinned `Brief` out. */
+/** Records the `pin` phase snapshot — the drafted `Brief` in, the pinned `Brief` out. */
 export interface PinStageRecord {
 	readonly stage: 'pin'
 	readonly input: Brief
@@ -322,7 +325,7 @@ export interface PinStageRecord {
 }
 
 /**
- * One pipeline phase, discriminated by `stage`.
+ * Represents one pipeline phase, discriminated by `stage`.
  *
  * @remarks
  * Narrowing on `stage` types both payloads exactly, so a consumer reads a replay without
@@ -334,7 +337,7 @@ export type BriefStageRecord =
 	| GateStageRecord
 	| PinStageRecord
 
-/** A visible marker for a phase that failed. */
+/** Represents a visible marker for a phase that failed. */
 export interface BriefStageFailure {
 	readonly stage: BriefStage
 	readonly code: BriefErrorCode
@@ -342,7 +345,7 @@ export interface BriefStageFailure {
 }
 
 /**
- * The full, replayable outcome of one `compile()` call.
+ * Represents the full, replayable outcome of one `compile()` call.
  *
  * @remarks
  * `brief` is present exactly when the compile completed, so it is ALSO the completeness
@@ -371,23 +374,24 @@ export interface Briefing {
 }
 
 /**
- * The subagent projection of a brief.
+ * Represents the subagent projection of a brief.
  *
  * @remarks
- * Two orthogonal axes, not five partitions. PERMISSION is `read`, `edit`, `locked`, and
- * `forbidden`, with `edit` the owned set two concurrent dispatches must not intersect on and
- * `locked` and `forbidden` do-not-touch. PRECEDENCE is `authority`, in ranked order, index 0
- * winning every conflict.
+ * PERMISSION and PRECEDENCE are orthogonal axes rather than one flat partition set.
+ * PERMISSION is `read`, `edit`, `locked`, and `forbidden`, with `edit` the owned set two
+ * concurrent dispatches must not intersect on and `locked` and `forbidden` do-not-touch.
+ * PRECEDENCE is `authority`, in ranked order, index 0 winning every conflict.
  *
  * `authority` therefore OVERLAPS the permission arrays by design: a ranked path ALWAYS also
  * sits in `read`, `edit`, or `locked`, because the executor has to open what it obeys, and
- * the `granted` gate rule refuses a brief where it does not. Read the four to decide what may
- * be touched and `authority` to decide what wins. Never union all five — that was already
- * wrong before `authority` existed, because `forbidden` is an exclusion rather than a grant.
+ * the `granted` gate rule refuses a brief where it does not. Read the permission arrays to
+ * decide what may be touched and `authority` to decide what wins. Never union the permission
+ * arrays with `authority` — that was already wrong before `authority` existed, because
+ * `forbidden` is an exclusion rather than a grant.
  * `authority` is a path list rather than a rendered section because a machine consumer must
  * reach mandatory authority without parsing `prompt`, which is written for a model.
  *
- * The four permission arrays are mutually disjoint in a GATED brief — `findManifestOverlaps`
+ * The permission arrays are mutually disjoint in a GATED brief — `findManifestOverlaps`
  * measures it and the `disjoint` rule refuses on it. `briefToDispatch` is a pure projection
  * and runs no gate, so projecting an unvetted draft can produce arrays that intersect. Gate
  * before you dispatch, or treat disjointness as unproven.
@@ -401,7 +405,7 @@ export interface Dispatch {
 	readonly forbidden: readonly string[]
 }
 
-/** A versioned, content-hashed `Brief` inside a {@link BriefManagerInterface}. */
+/** Represents a versioned, content-hashed `Brief` inside a {@link BriefManagerInterface}. */
 export interface BriefRecord {
 	readonly id: string
 	readonly brief: Brief
@@ -409,16 +413,16 @@ export interface BriefRecord {
 	readonly hash: string
 }
 
-/** The `BriefCompiler`'s push observation surface. */
+/** Declares the `BriefCompiler`'s push observation surface. */
 export type BriefCompilerEventMap = {
-	compile: readonly [briefing: Briefing]
-	block: readonly [questions: readonly Gap[]]
-	error: readonly [error: unknown]
-	destroy: readonly []
+	readonly compile: readonly [briefing: Briefing]
+	readonly block: readonly [questions: readonly Gap[]]
+	readonly error: readonly [error: unknown]
+	readonly destroy: readonly []
 }
 
 /**
- * Input to `createBriefCompiler`.
+ * Represents the input to `createBriefCompiler`.
  *
  * @remarks
  * `interpret` and `reason` are BORROWED when supplied — the compiler destroys only
@@ -465,7 +469,7 @@ export interface BriefCompilerOptions {
 	readonly error?: EmitterErrorHandler
 }
 
-/** The compilation orchestrator contract. */
+/** Declares the compilation orchestrator contract. */
 export interface BriefCompilerInterface {
 	readonly emitter: EmitterInterface<BriefCompilerEventMap>
 	readonly interpret: InterpretInterface
@@ -475,14 +479,14 @@ export interface BriefCompilerInterface {
 	destroy(): void
 }
 
-/** The `BriefManager`'s push observation surface. */
+/** Declares the `BriefManager`'s push observation surface. */
 export type BriefManagerEventMap = {
-	add: readonly [id: string]
-	remove: readonly [id: string]
-	destroy: readonly []
+	readonly add: readonly [id: string]
+	readonly remove: readonly [id: string]
+	readonly destroy: readonly []
 }
 
-/** Input to `createBriefManager`. */
+/** Represents the input to `createBriefManager`. */
 export interface BriefManagerOptions {
 	readonly briefs?: readonly Brief[]
 	readonly on?: EmitterHooks<BriefManagerEventMap>
@@ -490,21 +494,21 @@ export interface BriefManagerOptions {
 }
 
 /**
- * The brief registry contract.
+ * Declares the brief registry contract.
  *
  * @remarks
  * The array overload of `remove` is declared FIRST so an id list resolves to the batch
- * form. `add` takes the fleet's own `ManagerAddOptions` from `@orkestrel/interpret`;
+ * form. `add` takes the fleet's own `RecordOptions` from `@orkestrel/interpret`;
  * omit its `id` and the record is keyed by the brief's own content hash, so re-adding
  * unchanged content is a version no-op.
  */
 export interface BriefManagerInterface {
 	readonly emitter: EmitterInterface<BriefManagerEventMap>
-	readonly size: number
+	readonly count: number
 	has(id: string): boolean
 	brief(id: string): BriefRecord | undefined
 	briefs(): readonly BriefRecord[]
-	add(brief: Brief, options?: ManagerAddOptions): BriefRecord
+	add(brief: Brief, options?: RecordOptions): BriefRecord
 	remove(ids: readonly string[]): boolean
 	remove(id: string): boolean
 	remove(): void
```
