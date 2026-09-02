# Last changes: program

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `af03b38`, merge base with `origin/main` `ff8a97b`, layer L4, declared version 0.0.11, registry version 0.0.11.

## Commits since origin/main

```text
f4392d5 2026-08-28 Update every dependency to the published latest
8af7eb3 2026-08-28 Adopt the catalog and guide mirrors for the wave
9f6513d 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
6115ec8 2026-09-01 Apply the verified src-audit fixes
5c519c3 2026-09-01 Adopt the renamed guide helpers in the parity test
f0c1ae8 2026-09-02 Name the program builders and clone metadata with structuredClone
7ef860d 2026-09-02 State what buildProgramDefinition copies and sort the test import lists
1a53925 2026-09-02 Point the README at the guide the package ships
af03b38 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                    |  17 +++---
 README.md                                      |  30 +++++----
 package.json                                   |   6 +-
 src/core/constants.ts                          |  19 ++++--
 src/core/errors.ts                             |  37 ++++++++++--
 src/core/factories.ts                          |   9 +--
 src/core/helpers.ts                            | 145 +++++++++++++++++---------------------------
 src/core/programs/Program.ts                   |  22 ++++---
 src/core/programs/ProgramManager.ts            |   4 +-
 src/core/types.ts                              |  53 ++++++++--------
 src/core/validators.ts                         |  70 ++++++++++-----------
 tests/guides.test.ts                           |  22 +++----
 tests/setup.test.ts                            |   4 +-
 tests/setup.ts                                 | 180 +++++++++++++++++++++++++++++++-----------------------
 tests/src/core/factories.test.ts               |  28 +++++----
 tests/src/core/helpers.test.ts                 | 215 ++++++++++++++++++++++++++++++++++-------------------------------
 tests/src/core/integration.test.ts             |   2 +-
 tests/src/core/programs/Program.test.ts        | 104 +++++++++++++++++--------------
 tests/src/core/programs/ProgramManager.test.ts |  18 +++---
 tests/src/core/validators.test.ts              |  44 ++++++++------
 20 files changed, 548 insertions(+), 481 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 0b6cab1..d334777 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,10 +1,19 @@
 import type { Decision, Status } from './types.js'
 import type { Eligibility } from '@orkestrel/qualifier'
 
-/** Default definition validation policy for `createProgram` / `ProgramManager.add`. */
+/** Names the default definition validation policy for `createProgram` / `ProgramManager.add`. */
 export const DEFAULT_PROGRAM_VALIDATE = true
 
-/** Status tally precedence order — least to most resolved. */
+/** Lists every {@link Status} literal — the source the union and its guard derive from. */
+export const STATUSES = Object.freeze([
+	'ineligible',
+	'referral',
+	'conditional',
+	'unrated',
+	'eligible',
+] as const)
+
+/** Lists the status tally precedence order — least to most resolved. */
 export const STATUS_PRECEDENCE: readonly Status[] = Object.freeze([
 	'ineligible',
 	'referral',
@@ -13,15 +22,15 @@ export const STATUS_PRECEDENCE: readonly Status[] = Object.freeze([
 	'eligible',
 ])
 
-/** The deterministic authority decision for each global eligibility. */
+/** Maps each global eligibility to its deterministic authority decision. */
 export const ELIGIBILITY_DECISIONS: Readonly<Record<Eligibility, Decision>> = Object.freeze({
 	eligible: 'approved',
 	ineligible: 'denied',
 	referral: 'submitted',
 })
 
-/** The reserved working-subject key a batch's aggregate projection is written under. */
+/** Names the reserved working-subject key a batch's aggregate projection is written under. */
 export const AGGREGATE_KEY = 'aggregate'
 
-/** The reserved working-subject key the authority's outcome projection is written under. */
+/** Names the reserved working-subject key the authority's outcome projection is written under. */
 export const OUTCOME_KEY = 'outcome'
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 4e93f11..92f1161 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,7 +1,7 @@
 import type { ProgramErrorCode } from './types.js'
 
 /**
- * A coded programmer error thrown by the program layer.
+ * Reports a coded programmer error thrown by the program layer.
  *
  * @remarks
  * `DUPLICATE` — a program id collision on `ProgramManager.add`, or a duplicate
@@ -11,20 +11,49 @@ import type { ProgramErrorCode } from './types.js'
  * policy failed validation. `MISMATCH` — an injected entity or a returned
  * reason result has the wrong contract. `RESERVED` — a subject already
  * carries `aggregate` or `outcome`. `DESTROYED` — use of a destroyed entity.
+ *
+ * @example
+ * ```ts
+ * import { ProgramError } from '@orkestrel/program'
+ *
+ * const error = new ProgramError('RESERVED', 'Subject carries a reserved key', 'aggregate')
+ * error.code // 'RESERVED'
+ * ```
  */
 export class ProgramError extends Error {
 	readonly code: ProgramErrorCode
 	readonly context?: unknown
 
-	constructor(code: ProgramErrorCode, message: string, context?: unknown) {
-		super(message)
+	/**
+	 * Creates a coded program error.
+	 *
+	 * @param code - The machine-readable failure category
+	 * @param message - The human-readable failure description
+	 * @param context - Optional structured context for the failure
+	 * @param cause - Optional underlying value the failure wraps
+	 */
+	constructor(code: ProgramErrorCode, message: string, context?: unknown, cause?: unknown) {
+		super(message, cause === undefined ? undefined : { cause })
 		this.name = 'ProgramError'
 		this.code = code
 		this.context = context
 	}
 }
 
-/** Narrow a caught value to a {@link ProgramError}. */
+/**
+ * Checks whether a caught value is a {@link ProgramError}.
+ *
+ * @param value - The candidate value
+ * @returns True if the value is a {@link ProgramError}; false otherwise
+ *
+ * @example
+ * ```ts
+ * import { isProgramError, ProgramError } from '@orkestrel/program'
+ *
+ * isProgramError(new ProgramError('RESERVED', 'Subject carries a reserved key')) // true
+ * isProgramError(new Error('Subject carries a reserved key')) // false
+ * ```
+ */
 export function isProgramError(value: unknown): value is ProgramError {
 	return value instanceof ProgramError
 }
diff --git a/src/core/types.ts b/src/core/types.ts
index c387d95..58e8d51 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -9,17 +9,18 @@ import type {
 } from '@orkestrel/qualifier'
 import type { RatingDefinition, RatingResult, RaterInterface } from '@orkestrel/rater'
 import type { LogicalDefinition, ReasonInterface, Subject } from '@orkestrel/reason'
+import type { STATUSES } from './constants.js'
 
-/** A final authority outcome, derived from global eligibility. */
+/** Identifies a final authority outcome, derived from global eligibility. */
 export type Decision = 'approved' | 'denied' | 'submitted'
 
-/** The presentation and tally status derived from eligibility, conditions, and rating success. */
-export type Status = 'ineligible' | 'referral' | 'conditional' | 'unrated' | 'eligible'
+/** Identifies the presentation and tally status derived from eligibility, conditions, and rating success. */
+export type Status = (typeof STATUSES)[number]
 
-/** A post-qualification program determination effect. */
+/** Identifies a post-qualification program determination effect. */
 export type ProgramEffect = 'notice' | 'limit'
 
-/** A coded {@link ProgramError} programmer-error code. */
+/** Identifies a coded {@link ProgramError} programmer-error code. */
 export type ProgramErrorCode =
 	| 'DUPLICATE'
 	| 'MISSING'
@@ -29,7 +30,7 @@ export type ProgramErrorCode =
 	| 'DESTROYED'
 
 /**
- * Optional fields accepted by `noticeDefinition`.
+ * Describes the optional fields accepted by `buildNotice`.
  *
  * @remarks
  * `scope` — the rating-line id the notice presents against; omitted for an
@@ -40,7 +41,7 @@ export interface NoticeInput {
 }
 
 /**
- * Optional fields accepted by `aggregateDefinition`.
+ * Describes the optional fields accepted by `buildAggregateDefinition`.
  *
  * @remarks
  * `by` — the partition key field; omitted skips partitioning. `gates` — a
@@ -53,7 +54,7 @@ export interface AggregateInput {
 }
 
 /**
- * Optional fields accepted by `programDefinition`.
+ * Describes the optional fields accepted by `buildProgramDefinition`.
  *
  * @remarks
  * `description` — a free-text summary. `notices` — authored unconditional
@@ -69,14 +70,14 @@ export interface ProgramInput {
 	readonly metadata?: JSONValue
 }
 
-/** An authored, unconditional program notice. */
+/** Describes an authored, unconditional program notice. */
 export interface Notice {
 	readonly id: string
 	readonly message: string
 	readonly scope?: string
 }
 
-/** One resolved notice or authority-limit outcome. */
+/** Describes one resolved notice or authority-limit outcome. */
 export interface Determination {
 	readonly id: string
 	readonly effect: ProgramEffect
@@ -86,35 +87,35 @@ export interface Determination {
 	readonly premises: readonly Premise[]
 }
 
-/** Batch aggregate fields, an optional partition key, and optional gates. */
+/** Describes batch aggregate fields, an optional partition key, and optional gates. */
 export interface AggregateDefinition {
 	readonly fields: readonly FieldPath[]
 	readonly by?: FieldPath
 	readonly gates?: LogicalDefinition
 }
 
-/** One subject's private aggregate working projection. */
+/** Describes one subject's private aggregate working projection. */
 export interface AggregateProjection {
 	readonly count: number
 	readonly sums: Readonly<Record<string, number>>
 	readonly group?: AggregateGroup
 }
 
-/** One batch aggregate partition. */
+/** Describes one batch aggregate partition. */
 export interface AggregateGroup {
 	readonly key: string
 	readonly count: number
 	readonly sums: Readonly<Record<string, number>>
 }
 
-/** A status tally — a count plus summed aggregate fields. */
+/** Describes a status tally — a count plus summed aggregate fields. */
 export interface Tally {
 	readonly count: number
 	readonly sums: Readonly<Record<string, number>>
 }
 
 /**
- * A pure authored program definition.
+ * Describes a pure authored program definition.
  *
  * @remarks
  * `qualification` runs first through `@orkestrel/qualifier`; `rating` runs only
@@ -144,13 +145,15 @@ export interface ProgramDefinition {
 	readonly metadata?: JSONValue
 }
 
-/** One subject's complete program outcome. */
+/** Describes one subject's complete program outcome. */
 export interface ProgramResult {
 	readonly id: string
 	readonly name: string
 	readonly eligibility: Eligibility
 	readonly status: Status
 	/**
+	 * Holds the final authority outcome.
+	 *
 	 * @remarks
 	 * Present ONLY when the program HAS an `authority`, the execution SUCCEEDED
 	 * (qualification, rating when it ran, and authority all produced no errors),
@@ -165,7 +168,7 @@ export interface ProgramResult {
 	readonly errors: readonly string[]
 }
 
-/** A batch program outcome across every subject. */
+/** Describes a batch program outcome across every subject. */
 export interface AggregateResult {
 	readonly id: string
 	readonly name: string
@@ -180,7 +183,7 @@ export interface AggregateResult {
 	readonly errors: readonly string[]
 }
 
-/** Semantic definition validation. */
+/** Describes semantic definition validation. */
 export interface ProgramValidationResult {
 	readonly valid: boolean
 	readonly errors: readonly string[]
@@ -188,7 +191,7 @@ export interface ProgramValidationResult {
 }
 
 /**
- * The push observation surface of a {@link ProgramInterface} (AGENTS §13).
+ * Describes the push observation surface of a {@link ProgramInterface} (AGENTS §13).
  *
  * @remarks
  * `rate` fires only when at least one line was selected. `determine` fires once
@@ -206,7 +209,7 @@ export type ProgramEventMap = {
 }
 
 /**
- * Options for `createProgram` / the `Program` constructor.
+ * Describes the options for `createProgram` / the `Program` constructor.
  *
  * @remarks
  * `qualifier` — an injected, caller-owned qualifier; created and owned by the
@@ -229,8 +232,8 @@ export interface ProgramOptions {
 }
 
 /**
- * One compiled program — composes one qualifier and one rater over a shared
- * reason engine.
+ * Defines one compiled program that composes one qualifier and one rater over a
+ * shared reason engine.
  *
  * @remarks
  * The array-of-subjects `execute` overload is declared FIRST (AGENTS §9.2) so a
@@ -247,7 +250,7 @@ export interface ProgramInterface {
 	destroy(): void
 }
 
-/** The push observation surface of a {@link ProgramManagerInterface} (AGENTS §13). */
+/** Describes the push observation surface of a {@link ProgramManagerInterface} (AGENTS §13). */
 export type ProgramManagerEventMap = {
 	readonly add: readonly [id: string]
 	readonly remove: readonly [id: string]
@@ -255,7 +258,7 @@ export type ProgramManagerEventMap = {
 }
 
 /**
- * Options for `createProgramManager` / the `ProgramManager` constructor.
+ * Describes the options for `createProgramManager` / the `ProgramManager` constructor.
  *
  * @remarks
  * `qualifier` — an injected, caller-owned qualifier; created and owned when
@@ -278,7 +281,7 @@ export interface ProgramManagerOptions {
 	readonly error?: EmitterErrorHandler
 }
 
-/** An ordered manager over compiled programs (AGENTS §9), sharing one qualifier and rater. */
+/** Defines an ordered manager over compiled programs (AGENTS §9), sharing one qualifier and rater. */
 export interface ProgramManagerInterface {
 	readonly emitter: EmitterInterface<ProgramManagerEventMap>
 	readonly size: number
```
