# Last changes: rater

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `1ccb968`, merge base with `origin/main` `d2a3464`, layer L3, declared version 0.0.12, registry version 0.0.12.

## Commits since origin/main

```text
ddf0627 2026-08-28 Update every dependency to the published latest
ec9e4ef 2026-08-28 Adopt the catalog and guide mirrors for the wave
7c6966f 2026-08-28 Apply the verified src-audit fixes
844865e 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
112c7e8 2026-09-01 Adopt the renamed guide helpers in the parity test
458b787 2026-09-02 Name the rater builders and drop the line result's success flag
350608e 2026-09-02 Point the README at the rater guide
1ccb968 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md       |  17 ++++++------
 README.md                         |  12 +++++---
 package.json                      |   6 ++--
 src/core/Rater.ts                 |  29 ++++++++-----------
 src/core/constants.ts             |   6 ++--
 src/core/errors.ts                |   6 ++--
 src/core/factories.ts             |   2 +-
 src/core/helpers.ts               | 119 +++++++++++++++++++++++++++++++++++++++---------------------------------------
 src/core/types.ts                 |  43 ++++++++++++++--------------
 src/core/validators.ts            |  58 +++++++++++++++++++-------------------
 tests/guides.test.ts              |  22 +++++++--------
 tests/setup.test.ts               |   6 ++--
 tests/setup.ts                    |  51 ++++++++++++++++++++--------------
 tests/src/core/Rater.test.ts      |  92 +++++++++++++++++++++++++++++++++---------------------------
 tests/src/core/helpers.test.ts    |  86 ++++++++++++++++++++++++++++++--------------------------
 tests/src/core/validators.test.ts |  15 ++--------
 16 files changed, 294 insertions(+), 276 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 2e4b159..22f8f0d 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,8 +1,8 @@
 /**
- * Rating-domain constants.
+ * Reserves the module for rating-domain constants.
  *
  * @remarks
  * Empty — the current quantitative-only contract needs no shared constant.
- * Kept as a structural module (AGENTS §21): a future constant lands here
- * rather than reintroducing the file.
+ * Kept as a structural module: a future constant lands here rather than
+ * reintroducing the file.
  */
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 8873091..0ed87fe 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,7 +1,7 @@
 import type { RaterErrorCode } from './types.js'
 
 /**
- * A coded programmer error thrown by the rating layer.
+ * Represents a coded programmer error thrown by the rating layer.
  *
  * @remarks
  * `DEFINITION` — the `rate` input failed both the array-of-lines and rating
@@ -28,10 +28,10 @@ export class RaterError extends Error {
 }
 
 /**
- * Narrow a caught value to a {@link RaterError}.
+ * Narrows a caught value to a {@link RaterError}.
  *
  * @param value - The caught value to test
- * @returns `true` when `value` is a `RaterError`
+ * @returns True if `value` is a `RaterError`; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/core/types.ts b/src/core/types.ts
index c6da47e..bdcc1f9 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -8,17 +8,17 @@ import type {
 	Subject,
 } from '@orkestrel/reason'
 
-/** A worksheet derivation step stage. */
+/** Names a worksheet derivation step stage. */
 export type Stage = 'factor' | 'group' | 'total'
 
-/** A coded {@link RaterError} programmer-error code. */
+/** Names a coded {@link RaterError} programmer-error code. */
 export type RaterErrorCode = 'DEFINITION' | 'MISMATCH' | 'DESTROYED'
 
-/** A pure total port over resolved lines. */
+/** Represents a pure total port over resolved lines. */
 export type TotalHandler = (lines: readonly LineResult[]) => number | undefined
 
 /**
- * One rateable line — a quantitative definition joined to display metadata.
+ * Represents one rateable line — a quantitative definition joined to display metadata.
  *
  * @remarks
  * `rate` is a plain reason {@link QuantitativeDefinition}; Rater delegates every
@@ -33,7 +33,7 @@ export interface LineDefinition {
 }
 
 /**
- * A pure authored rating — a named, ordered set of lines.
+ * Represents a pure authored rating — a named, ordered set of lines.
  *
  * @remarks
  * `rate` accepts either a plain `readonly LineDefinition[]` or a full
@@ -48,7 +48,7 @@ export interface RatingDefinition {
 	readonly metadata?: JSONValue
 }
 
-/** A checked-evidence row rendered into a display-neutral sentence. */
+/** Represents a checked-evidence row rendered into a display-neutral sentence. */
 export interface Evidence {
 	readonly field?: FieldPath
 	readonly label?: string
@@ -58,7 +58,7 @@ export interface Evidence {
 	readonly met?: boolean
 }
 
-/** A resolved quantitative factor, joined to its authored metadata. */
+/** Represents a resolved quantitative factor, joined to its authored metadata. */
 export interface WorksheetFactor {
 	readonly id: string
 	readonly name?: string
@@ -68,7 +68,7 @@ export interface WorksheetFactor {
 	readonly evidence: readonly Evidence[]
 }
 
-/** A resolved quantitative group, joined to its authored metadata. */
+/** Represents a resolved quantitative group, joined to its authored metadata. */
 export interface WorksheetGroup {
 	readonly id: string
 	readonly name?: string
@@ -78,7 +78,7 @@ export interface WorksheetGroup {
 	readonly factors: readonly WorksheetFactor[]
 }
 
-/** A display-neutral worksheet derivation step. */
+/** Represents a display-neutral worksheet derivation step. */
 export interface Step {
 	readonly stage: Stage
 	readonly id?: string
@@ -87,7 +87,7 @@ export interface Step {
 	readonly expression?: string
 }
 
-/** A quantitative definition joined to its result — the rating audit trail. */
+/** Represents a quantitative definition joined to its result — the rating audit trail. */
 export interface Worksheet {
 	readonly id: string
 	readonly name: string
@@ -102,28 +102,28 @@ export interface Worksheet {
 }
 
 /**
- * One line's rating outcome.
+ * Represents one line's rating outcome.
  *
  * @remarks
  * `worksheet` is always present — even a failed evaluation resolves to a
  * type-shaped failure worksheet, so a `LineResult` is always constructible.
- * `amount` is present ONLY when `success` is `true`.
+ * The worksheet also carries the line's outcome: `amount` is present ONLY
+ * when `worksheet.success` is `true`.
  */
 export interface LineResult {
 	readonly id: string
 	readonly name: string
 	readonly amount?: number
 	readonly worksheet: Worksheet
-	readonly success: boolean
 }
 
 /**
- * A rated outcome across every line of one `rate` call.
+ * Represents a rated outcome across every line of one `rate` call.
  *
  * @remarks
  * `total` is derived by the {@link TotalHandler} (default {@link sumAmounts})
  * over `lines` — only successfully rated lines carry an `amount`. `success`
- * is `true` only when every line succeeded.
+ * is `true` only when every line's `worksheet.success` is `true`.
  */
 export interface RatingResult {
 	readonly lines: readonly LineResult[]
@@ -132,18 +132,18 @@ export interface RatingResult {
 }
 
 /**
- * The push observation surface of a {@link RaterInterface} (AGENTS §13).
+ * Represents the push observation surface of a {@link RaterInterface}.
  *
  * @remarks
  * `rate` fires once per `rate` call, carrying the rated subject and the result.
  */
 export type RaterEventMap = {
-	/** A subject was rated — carries the subject and its result. */
+	/** Fires when a subject is rated — carries the subject and its result. */
 	readonly rate: readonly [subject: Subject, result: RatingResult]
 }
 
 /**
- * Options for `createRater` / the `Rater` constructor.
+ * Configures `createRater` and the `Rater` constructor.
  *
  * @remarks
  * `engine` — an injected {@link ReasonInterface}; when omitted, `Rater` builds
@@ -161,11 +161,12 @@ export interface RaterOptions {
 }
 
 /**
- * The rating orchestrator over the shared quantitative reasoning engine.
+ * Represents the rating orchestrator over the shared quantitative reasoning engine.
  *
  * @remarks
- * The array-of-lines `rate` overload is declared FIRST (AGENTS §9.2). Both
- * overloads rate a SINGLE subject — there is no batch-of-subjects overload.
+ * The array-of-lines `rate` overload is declared FIRST so a plain line list
+ * resolves to that form. Both overloads rate a SINGLE subject — there is no
+ * batch-of-subjects overload.
  */
 export interface RaterInterface {
 	readonly emitter: EmitterInterface<RaterEventMap>
```
