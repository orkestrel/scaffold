# Last changes: qualifier

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `10bd46f`, merge base with `origin/main` `52a7b1c`, layer L3, declared version 0.0.12, registry version 0.0.12.

## Commits since origin/main

```text
708c27b 2026-08-28 Update every dependency to the published latest
a271e71 2026-08-28 Adopt the catalog and guide mirrors for the wave
384854a 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
71536ce 2026-09-01 Apply the verified src-audit fixes
3b1e47b 2026-09-01 Adopt the renamed guide helpers in the parity test
3db5005 2026-09-02 Return reason's validation result and declare the qualifier error context
a8f71dc 2026-09-02 State which qualifier error codes carry a definition and pin reason's validation guard
476fdc7 2026-09-02 Point the README at the guide the package ships
10bd46f 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md       |  17 ++++----
 README.md                         |  14 +++---
 package.json                      |   6 +--
 src/core/Qualifier.ts             | 120 ++++++++++++++++++++++++++++++++++++++++++++++------
 src/core/constants.ts             |   8 ++--
 src/core/errors.ts                |  30 ++++++++-----
 src/core/factories.ts             |   2 +-
 src/core/helpers.ts               | 125 ++++++++++++++++++++++++++++--------------------------
 src/core/types.ts                 | 131 +++++++++++++++++++++++++++++++++++++++++++++++---------
 src/core/validators.ts            |  66 ++++++++++++++++-------------
 tests/guides.test.ts              |  22 +++++-----
 tests/setup.ts                    |  92 ++++++++++++++++++++++++----------------
 tests/src/core/Qualifier.test.ts  | 181 ++++++++++++++++++++++++++++++++++++++++++++++++++++++------------------------
 tests/src/core/helpers.test.ts    | 125 ++++++++++++++++++++++++++++++------------------------
 tests/src/core/validators.test.ts |  91 ++++++---------------------------------
 15 files changed, 640 insertions(+), 390 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index 124be6f..1281e97 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,19 +1,19 @@
 import type { Eligibility, QualificationEffect } from './types.js'
 
-/** Default definition validation policy for `createQualifier` / `Qualifier.qualify`. */
+/** Holds the default definition validation policy for `createQualifier` / `Qualifier.qualify`. */
 export const DEFAULT_QUALIFIER_VALIDATE = true
 
-/** The reserved internal projection namespace a pass's working projection is written under. */
+/** Names the reserved internal projection namespace a pass's working projection is written under. */
 export const QUALIFICATION_KEY = 'qualification'
 
-/** Eligibility severity order — most to least severe. */
+/** Lists the eligibility severities in order — most to least severe. */
 export const ELIGIBILITY_PRECEDENCE: readonly Eligibility[] = Object.freeze([
 	'ineligible',
 	'referral',
 	'eligible',
 ])
 
-/** The eligibility impact of each {@link QualificationEffect}; `condition` remains eligible. */
+/** Maps each {@link QualificationEffect} to its eligibility impact; `condition` remains eligible. */
 export const EFFECT_ELIGIBILITIES: Readonly<Record<QualificationEffect, Eligibility>> =
 	Object.freeze({
 		restriction: 'ineligible',
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 6d4cbd2..fc9debe 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,20 +1,25 @@
-import type { QualifierErrorCode } from './types.js'
+import type { QualifierErrorCode, QualifierErrorContext } from './types.js'
 
 /**
- * A coded programmer error thrown by the qualifier layer.
+ * Represents a coded programmer error thrown by the qualifier layer.
  *
  * @remarks
- * `DEFINITION` — a qualification definition failed semantic validation.
- * `MISMATCH` — a subject is not a record or already carries the reserved
- * `qualification` key. `DESTROYED` — use of a destroyed qualifier.
- * `ENGINE` — the underlying reason engine threw while running a pass (the
- * original throw is preserved as `context.cause`).
+ * `DEFINITION` — a qualification definition failed semantic validation; when
+ * `qualify`'s own validation raises it, `context.definition` names the
+ * definition, and when an engine throw maps to it, `context.pass` names the pass
+ * and `context.cause` preserves the original throw. `MISMATCH` — a subject is
+ * not a record or already carries the reserved `qualification` key.
+ * `DESTROYED` — use of a destroyed qualifier; an engine-mapped one carries
+ * `context.pass` and `context.cause`. `ENGINE` — the underlying reason engine
+ * threw while running a pass; `context.pass` names the pass and `context.cause`
+ * preserves the original throw. `context` is absent for a throw that carries no
+ * payload.
  */
 export class QualifierError extends Error {
 	readonly code: QualifierErrorCode
-	readonly context: unknown
+	readonly context: QualifierErrorContext | undefined
 
-	constructor(code: QualifierErrorCode, message: string, context?: unknown) {
+	constructor(code: QualifierErrorCode, message: string, context?: QualifierErrorContext) {
 		super(message)
 		this.name = 'QualifierError'
 		this.code = code
@@ -22,7 +27,12 @@ export class QualifierError extends Error {
 	}
 }
 
-/** Narrow a caught value to a {@link QualifierError}. */
+/**
+ * Narrows a caught value to a {@link QualifierError}.
+ *
+ * @param value - The caught value to test
+ * @returns True if `value` is a {@link QualifierError} instance; false otherwise
+ */
 export function isQualifierError(value: unknown): value is QualifierError {
 	return value instanceof QualifierError
 }
diff --git a/src/core/types.ts b/src/core/types.ts
index 78e23c3..c1220f8 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -9,35 +9,35 @@ import type {
 	Subject,
 } from '@orkestrel/reason'
 
-/** The eligibility outcome axis. */
+/** Represents the eligibility outcome axis. */
 export type Eligibility = 'eligible' | 'ineligible' | 'referral'
 
-/** An authored ruling's eligibility impact. */
+/** Represents an authored ruling's eligibility impact. */
 export type QualificationEffect = 'restriction' | 'referral' | 'condition'
 
-/** One ordered derivation or rule pass. */
+/** Represents one ordered derivation or rule pass. */
 export type QualificationPass = QuantitativeDefinition | LogicalDefinition
 
-/** One pass's internal working projection. */
+/** Represents one pass's internal working projection. */
 export type QualificationProjection = number | boolean | Readonly<Record<string, unknown>>
 
-/** The internal projection record stored under `QUALIFICATION_KEY`. */
+/** Represents the internal projection record stored under `QUALIFICATION_KEY`. */
 export type QualificationContext = Readonly<Record<string, QualificationProjection>>
 
-/** Optional fields accepted by `rulingDefinition`. */
+/** Carries the optional fields `rulingDefinition` accepts. */
 export interface RulingInput {
 	readonly scope?: string
 	readonly message?: string
 }
 
-/** Optional fields accepted by `qualificationDefinition`. */
+/** Carries the optional fields `qualificationDefinition` accepts. */
 export interface QualificationInput {
 	readonly description?: string
 	readonly rulings?: readonly Ruling[]
 	readonly metadata?: Readonly<Record<string, JSONValue>>
 }
 
-/** An authored consequence for one rule in one logical pass. */
+/** Represents an authored consequence for one rule in one logical pass. */
 export interface Ruling {
 	readonly id: string
 	readonly pass: string
@@ -48,7 +48,7 @@ export interface Ruling {
 }
 
 /**
- * Display-neutral evidence for one condition, in one of two authoring modes.
+ * Represents display-neutral evidence for one condition, in one of two authoring modes.
  * A CHECKED premise carries `field` and `comparison`; a DESCRIBED premise
  * carries neither and renders from `description` instead. The checked form
  * renders only when `field` and `comparison` are BOTH present, and
@@ -66,7 +66,7 @@ export interface Premise {
 	readonly met?: boolean
 }
 
-/** One resolved ruling. */
+/** Represents one resolved ruling. */
 export interface Finding {
 	readonly id: string
 	readonly pass: string
@@ -78,7 +78,7 @@ export interface Finding {
 	readonly premises: readonly Premise[]
 }
 
-/** One quantitative pass's audit result. */
+/** Represents one quantitative pass's audit result. */
 export interface Derivation {
 	readonly id: string
 	readonly value: number
@@ -87,7 +87,7 @@ export interface Derivation {
 	readonly errors: readonly string[]
 }
 
-/** A pure authored qualification definition. */
+/** Represents a pure authored qualification definition. */
 export interface QualificationDefinition {
 	readonly id: string
 	readonly name: string
@@ -97,7 +97,7 @@ export interface QualificationDefinition {
 	readonly metadata?: Readonly<Record<string, JSONValue>>
 }
 
-/** One subject's complete qualification outcome. */
+/** Represents one subject's complete qualification outcome. */
 export interface QualificationResult {
 	readonly id: string
 	readonly name: string
@@ -110,13 +110,25 @@ export interface QualificationResult {
 	readonly errors: readonly string[]
 }
 
-/** Semantic definition validation. */
-export type QualificationValidationResult = ReasonValidationResult
-
-/** A coded {@link QualifierError} programmer-error code. */
+/** Represents a coded {@link QualifierError} programmer-error code. */
 export type QualifierErrorCode = 'DEFINITION' | 'MISMATCH' | 'DESTROYED' | 'ENGINE'
 
-/** The push observation surface of a {@link QualifierInterface} (AGENTS §13). */
+/**
+ * Represents the structured payload a {@link QualifierError} carries.
+ *
+ * @remarks
+ * `pass` names the pass that was running when the engine threw. `definition` names the
+ * qualification definition that failed semantic validation. `cause` is the original throw
+ * an engine failure wrapped, and stays `unknown` because a thrown value can be anything.
+ * Every member is absent rather than `undefined` when the throw does not carry it.
+ */
+export interface QualifierErrorContext {
+	readonly pass?: string
+	readonly definition?: string
+	readonly cause?: unknown
+}
+
+/** Represents the push observation surface of a {@link QualifierInterface} (AGENTS §13). */
 export type QualifierEventMap = {
 	readonly derive: readonly [derivation: Derivation]
 	readonly finding: readonly [finding: Finding]
@@ -124,7 +136,7 @@ export type QualifierEventMap = {
 	readonly destroy: readonly []
 }
 
-/** Options for `createQualifier` / the `Qualifier` constructor. */
+/** Carries the options for `createQualifier` / the `Qualifier` constructor. */
 export interface QualifierOptions {
 	readonly engine?: ReasonInterface
 	readonly validate?: boolean
@@ -133,10 +145,87 @@ export interface QualifierOptions {
 	readonly error?: EmitterErrorHandler
 }
 
-/** One qualifier — owns or borrows one reason engine and returns eligibility. */
+/** Owns or borrows one reason engine and returns eligibility. */
 export interface QualifierInterface {
+	/** Holds the typed observation surface carrying `derive`, `finding`, `qualify`, and `destroy`. */
 	readonly emitter: EmitterInterface<QualifierEventMap>
+	/**
+	 * Qualifies one subject against one authored definition.
+	 *
+	 * @remarks
+	 * Semantic validation runs first when the `validate` option is on, so an invalid
+	 * definition throws before any pass runs. Passes run in authored order and the
+	 * caller's `subject` is never mutated: the working projection under
+	 * `QUALIFICATION_KEY` is built copy-on-write and discarded after the call.
+	 *
+	 * @param subject - The record to qualify
+	 * @param definition - The authored qualification definition
+	 * @returns A fresh, frozen qualification result
+	 * @throws {@link QualifierError} `'DEFINITION'` when validation is enabled and the
+	 * definition fails semantic validation, or when the engine rejects a pass as an invalid
+	 * definition; `'MISMATCH'` when the subject is not a record or already carries the
+	 * reserved `qualification` key; `'DESTROYED'` after `destroy`, or when the engine
+	 * reports itself destroyed mid-pass; `'ENGINE'` for every other engine throw
+	 *
+	 * @example
+	 * ```ts
+	 * import { createQualifier, qualificationDefinition, rulingDefinition } from '@orkestrel/qualifier'
+	 * import { createAtom, createLogicalDefinition, createRule } from '@orkestrel/reason'
+	 *
+	 * const gates = createLogicalDefinition('gates', 'Eligibility gates', [
+	 *   createRule('licensed', [createAtom('licensed', 'equals', false)], createAtom('blocked', 'equals', true)),
+	 * ])
+	 * const definition = qualificationDefinition('standard', 'Standard eligibility', [gates], {
+	 *   rulings: [rulingDefinition('license', 'gates', 'licensed', 'restriction')],
+	 * })
+	 *
+	 * const qualifier = createQualifier()
+	 * qualifier.qualify({ id: 'risk-1', licensed: false }, definition).eligibility // 'ineligible'
+	 * qualifier.destroy()
+	 * ```
+	 */
 	qualify(subject: Subject, definition: QualificationDefinition): QualificationResult
-	validate(definition: QualificationDefinition): QualificationValidationResult
+	/**
+	 * Validates one authored definition semantically, without running it.
+	 *
+	 * @remarks
+	 * Structural shape is `isQualificationDefinition`'s job. This checks the meaning:
+	 * non-empty id and name, valid and uniquely identified passes and rulings, every
+	 * ruling reference resolving to a logical pass and one of its rules, and no pass id
+	 * shadowing `QUALIFICATION_KEY`. An empty definition, a logical pass carrying no
+	 * ruling, and a derivation no later pass reads are warnings rather than errors.
+	 *
+	 * @param definition - The authored qualification definition
+	 * @returns A fresh validation result carrying `valid`, `errors`, and `warnings`
+	 * @throws {@link QualifierError} `'DESTROYED'` after `destroy`
+	 *
+	 * @example
+	 * ```ts
+	 * import { createQualifier, qualificationDefinition } from '@orkestrel/qualifier'
+	 *
+	 * const qualifier = createQualifier()
+	 * qualifier.validate(qualificationDefinition('empty', 'Empty', []))
+	 * // { valid: true, errors: [], warnings: ['Definition has no passes'] }
+	 * qualifier.destroy()
+	 * ```
+	 */
+	validate(definition: QualificationDefinition): ReasonValidationResult
+	/**
+	 * Destroys this qualifier, idempotently.
+	 *
+	 * @remarks
+	 * An owned engine is destroyed; an injected engine stays caller-owned and is left
+	 * alone. The `destroy` event fires before the emitter itself is destroyed, and a
+	 * later call returns without re-emitting.
+	 *
+	 * @example
+	 * ```ts
+	 * import { createQualifier } from '@orkestrel/qualifier'
+	 *
+	 * const qualifier = createQualifier()
+	 * qualifier.destroy()
+	 * qualifier.destroy() // idempotent
+	 * ```
+	 */
 	destroy(): void
 }
```
