# Last changes: interpret

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `8fa4740`, merge base with `origin/main` `b71ca58`, layer L3, declared version 0.0.11, registry version 0.0.11.

## Commits since origin/main

```text
99fefeb 2026-08-28 Update every dependency to the published latest
9113d07 2026-08-28 Adopt the catalog and guide mirrors for the wave
e56676e 2026-08-28 Apply the verified src-audit fixes
9afd2ab 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
25948e5 2026-09-01 Adopt the renamed guide helpers in the parity test
8c00711 2026-09-02 Reshape the interpret registry verbs and drop the template and generator options
738bb5b 2026-09-02 Name the registry act add everywhere and state the index binding's reach
8fa4740 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                            |  17 +--
 README.md                                              |  27 ++--
 package.json                                           |   6 +-
 src/core/Interpret.ts                                  |  89 ++++++------
 src/core/{managers => }/InterpretContext.ts            |  14 +-
 src/core/Narrator.ts                                   |   4 +-
 src/core/constants.ts                                  | 100 ++++++-------
 src/core/errors.ts                                     |  25 ++--
 src/core/factories.ts                                  | 105 +++++---------
 src/core/helpers.ts                                    | 257 ++++++++++++++++-----------------
 src/core/index.ts                                      |   4 +-
 src/core/managers/DefinitionManager.ts                 |  99 +++++--------
 src/core/managers/RecordManager.ts                     | 144 +++++++++++++++++++
 src/core/managers/SubjectManager.ts                    | 102 +++++---------
 src/core/managers/TemplateManager.ts                   | 102 +++++---------
 src/core/parsers.ts                                    |  31 ++++
 src/core/stages/Clarifier.ts                           |  52 +++++--
 src/core/stages/Extractor.ts                           |  18 ++-
 src/core/stages/Formatter.ts                           |  45 ++++--
 src/core/stages/Generator.ts                           |  65 ++-------
 src/core/stages/Normalizer.ts                          |  16 ++-
 src/core/types.ts                                      | 439 ++++++++++++++++++++++++++++++++++-----------------------
 src/core/validators.ts                                 |  74 +++++-----
 tests/guides.test.ts                                   |  22 +--
 tests/setup.test.ts                                    |  27 ++--
 tests/setup.ts                                         |  48 ++++---
 tests/src/core/Interpret.test.ts                       |  81 +++++++++--
 tests/src/core/{managers => }/InterpretContext.test.ts |  10 +-
 tests/src/core/Narrator.test.ts                        |  52 ++++---
 tests/src/core/factories.test.ts                       |  42 ++----
 tests/src/core/helpers.test.ts                         | 146 ++++++++++++-------
 tests/src/core/integration.test.ts                     |  42 ++++--
 tests/src/core/managers/DefinitionManager.test.ts      |  33 +++--
 tests/src/core/managers/RecordManager.test.ts          | 100 +++++++++++++
 tests/src/core/managers/SubjectManager.test.ts         |  10 +-
 tests/src/core/managers/TemplateManager.test.ts        |  12 +-
 tests/src/core/parsers.test.ts                         |  15 ++
 tests/src/core/stages/Clarifier.test.ts                | 102 ++++++++++++--
 tests/src/core/stages/Extractor.test.ts                |   4 +-
 tests/src/core/stages/Formatter.test.ts                |  37 ++++-
 tests/src/core/stages/Generator.test.ts                |  55 ++------
 tests/src/core/validators.test.ts                      |  34 +++--
 42 files changed, 1574 insertions(+), 1133 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index b845462..f8cdb43 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,15 +1,14 @@
 import type { InterpretErrorCode, InterpretStage, Lexicon, ProvenanceCategory } from './types.js'
 
-// Frozen default data for the interprets module (AGENTS §5 — constants are
-// UPPER_SNAKE_CASE data, the sole home for module-scope literal defaults).
-// Every vocabulary map here is intentionally NEUTRAL and small — domain
-// worldview (insurance verbs, en-US misspelling corrections, business
-// domains) is the caller's business, supplied via options (AGENTS-flagged
-// scsr defect: a "generic" core module baked in ~100 hardcoded corrections).
+// Frozen default data for the interprets module — the sole home for its
+// module-scope literal defaults. Every vocabulary map here is intentionally
+// NEUTRAL and small: domain worldview (insurance verbs, en-US misspelling
+// corrections, business domains) is the caller's business, supplied through
+// options rather than baked in here.
 
 /**
- * Default `similarity` for `createInterpret` / `matchAlias` — the fuzzy
- * alias-match score threshold (0..1).
+ * Names the default `similarity` for `createInterpret` / `matchAlias` — the
+ * fuzzy alias-match score threshold (0..1).
  *
  * @remarks
  * Domain-qualified (not a bare `DEFAULT_SIMILARITY`) so the name stays free
@@ -19,41 +18,38 @@ import type { InterpretErrorCode, InterpretStage, Lexicon, ProvenanceCategory }
 export const DEFAULT_INTERPRET_SIMILARITY = 0.8
 
 /**
- * Default `floor` for `createInterpret` / `matchTemplate` — the minimum
- * intent confidence a template match (or the classified intent itself) must
+ * Names the default `floor` for `createInterpret` / `matchTemplate` — the
+ * minimum intent confidence a template match (or the classified intent itself) must
  * clear.
  */
 export const DEFAULT_INTERPRET_FLOOR = 0.3
 
-/** Default `history` cap for an `InterpretContext`'s `previous()` ring buffer. */
+/** Names the default `history` cap for an `InterpretContext`'s `previous()` ring buffer. */
 export const DEFAULT_INTERPRET_HISTORY = 16
 
-/** Default `id` for an `Interpret` orchestrator. */
-export const INTERPRET_ID = 'interpret'
-
-/** Confidence assigned to an exact keyword-proximity entity match. */
+/** Names the confidence assigned to an exact keyword-proximity entity match. */
 export const CONFIDENCE_EXACT = 1
 
-/** Confidence assigned to an exact alias-phrase entity match. */
+/** Names the confidence assigned to an exact alias-phrase entity match. */
 export const CONFIDENCE_ALIAS = 0.9
 
-/** Confidence assigned when a single entity mapping collects every extracted number. */
+/** Names the confidence assigned when a single entity mapping collects every extracted number. */
 export const CONFIDENCE_COLLECT = 0.9
 
-/** Confidence assigned to a positional (order-based) entity match fallback. */
+/** Names the confidence assigned to a positional (order-based) entity match fallback. */
 export const CONFIDENCE_POSITIONAL = 0.7
 
-/** Confidence assigned to a same-domain carried-over field. */
+/** Names the confidence assigned to a same-domain carried-over field. */
 export const CONFIDENCE_CARRIED = 0.7
 
-/** Confidence assigned to a template default fill. */
+/** Names the confidence assigned to a template default fill. */
 export const CONFIDENCE_DEFAULT = 1
 
-/** Confidence assigned to a successfully resolved computed field. */
+/** Names the confidence assigned to a successfully resolved computed field. */
 export const CONFIDENCE_COMPUTED = 0.9
 
 /**
- * The numeric-entity extraction pattern shared by `extractNumbers` and
+ * Holds the numeric-entity extraction pattern shared by `extractNumbers` and
  * `assignEntities` — an optional leading `$`, thousands-comma-grouped digits,
  * an optional decimal fraction, and an optional trailing `%`.
  *
@@ -65,8 +61,8 @@ export const CONFIDENCE_COMPUTED = 0.9
 export const NUMBER_PATTERN = /(?:\$\s*)?(\d+(?:,\d{3})*(?:\.\d+)?)\s*%?/g
 
 /**
- * Prototype-pollution-unsafe field-path segments — `setField` refuses to
- * write ANY path containing one, returning its input unchanged.
+ * Lists the prototype-pollution-unsafe field-path segments — `setField` refuses
+ * to write ANY path containing one, returning its input unchanged.
  */
 export const UNSAFE_FIELD_SEGMENTS: readonly string[] = Object.freeze([
 	'__proto__',
@@ -75,7 +71,7 @@ export const UNSAFE_FIELD_SEGMENTS: readonly string[] = Object.freeze([
 ])
 
 /**
- * Neutral built-in contraction expansions for `Normalizer` — small on
+ * Holds the neutral built-in contraction expansions for `Normalizer` — small on
  * purpose; callers merge their own map over this one.
  */
 export const DEFAULT_CONTRACTIONS: Readonly<Record<string, string>> = Object.freeze({
@@ -85,34 +81,22 @@ export const DEFAULT_CONTRACTIONS: Readonly<Record<string, string>> = Object.fre
 	"don't": 'do not',
 })
 
-/** Neutral built-in abbreviation expansions for `Normalizer` — empty by default. */
-export const DEFAULT_ABBREVIATIONS: Readonly<Record<string, string>> = Object.freeze({})
-
-/** Neutral built-in misspelling corrections for `Normalizer` — empty by default. */
-export const DEFAULT_CORRECTIONS: Readonly<Record<string, string>> = Object.freeze({})
-
-/** Neutral built-in action-verb vocabulary for `Extractor#extract`'s intent classification — empty by default. */
-export const DEFAULT_ACTIONS: Readonly<Record<string, string>> = Object.freeze({})
-
-/** Neutral built-in domain-keyword vocabulary for `Extractor#extract`'s intent classification — empty by default. */
-export const DEFAULT_DOMAINS: Readonly<Record<string, readonly string[]>> = Object.freeze({})
-
-/** Neutral built-in intent-verb phrasing for `Formatter#format` — empty by default. */
-export const DEFAULT_VERBS: Readonly<Record<string, string>> = Object.freeze({})
-
 /**
- * The neutral default `Lexicon` a `Narrator` merges caller data over.
+ * Holds the neutral default `Lexicon` a `Narrator` merges caller data over.
  *
  * @remarks
- * `phrases` and `labels` are empty — there is no built-in vocabulary or
- * label overrides (AGENTS §21 mechanism-never-policy). `templates` carries
- * the structural, display-neutral strings the reverse helpers formerly
- * hardcoded, keyed by
- * `{table}.{reasoning}` for the four reasons kinds, `result.quantitative.failed`
- * for the quantitative-result failure suffix, and `subject.fields` /
- * `subject.empty` for `describeSubject`. Every string is a plain
- * @orkestrel/template `fillTemplate` template — `{{name}}`-style placeholders
- * resolved against the caller-supplied `values` record.
+ * `phrases` and `labels` are empty — there is no built-in vocabulary and no
+ * label override, because wording is mechanism rather than policy.
+ * `templates` carries the structural, display-neutral strings both directions
+ * would otherwise hardcode. The reverse direction is keyed by
+ * `{table}.{reasoning}` per reasons kind, plus `result.quantitative.failed`
+ * for the quantitative-result failure suffix and `subject.fields` /
+ * `subject.empty` for `describeSubject`. The forward direction is keyed by
+ * `prompt.*` for the `Formatter`'s clause assembly and `ambiguity.*` for the
+ * questions a `Clarifier` and the orchestrator's match gates raise. Every
+ * string is a plain @orkestrel/template `fillTemplate` template —
+ * `{{name}}`-style placeholders resolved against the caller-supplied `values`
+ * record, so a caller reworded any line by overriding its key.
  */
 export const DEFAULT_LEXICON: Lexicon = Object.freeze({
 	phrases: Object.freeze({}),
@@ -130,11 +114,18 @@ export const DEFAULT_LEXICON: Lexicon = Object.freeze({
 		'result.inferential': 'derived {{count}} fact(s)',
 		'subject.fields': 'with {{fields}}',
 		'subject.empty': 'with no fields',
+		'prompt.base': '{{verb}} {{name}}',
+		'prompt.entities': ' with {{fields}}',
+		'prompt.defaults': ' (defaults: {{fields}})',
+		'prompt.ambiguities': ' needed: {{questions}}',
+		'ambiguity.entity': 'What is your {{entity}}?',
+		'ambiguity.intent': 'Which domain and action did you mean?',
+		'ambiguity.confidence': 'Which did you mean? The intent was too weak to act on.',
 	}),
 })
 
 /**
- * Every `ProvenanceCategory` literal, frozen — the one home the result guards
+ * Lists every `ProvenanceCategory` literal, frozen — the one home the result guards
  * check the union from, so a new category added to `types.ts` is added here
  * rather than silently rejected by `isProvenance`.
  */
@@ -147,8 +138,8 @@ export const PROVENANCE_CATEGORIES: readonly ProvenanceCategory[] = Object.freez
 ])
 
 /**
- * Every `InterpretStage` literal in pipeline order, frozen — the one home the
- * result guards check the union from.
+ * Lists every `InterpretStage` literal in pipeline order, frozen — the one home
+ * the result guards check the union from.
  */
 export const INTERPRET_STAGES: readonly InterpretStage[] = Object.freeze([
 	'normalize',
@@ -159,7 +150,7 @@ export const INTERPRET_STAGES: readonly InterpretStage[] = Object.freeze([
 ])
 
 /**
- * Every `InterpretErrorCode` literal, frozen — the one home the result guards
+ * Lists every `InterpretErrorCode` literal, frozen — the one home the result guards
  * check the union from.
  */
 export const INTERPRET_ERROR_CODES: readonly InterpretErrorCode[] = Object.freeze([
@@ -170,6 +161,5 @@ export const INTERPRET_ERROR_CODES: readonly InterpretErrorCode[] = Object.freez
 	'GENERATE_FAILED',
 	'NO_TEMPLATE',
 	'LOW_CONFIDENCE',
-	'INVALID_TEMPLATE',
 	'DESTROYED',
 ])
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 22f12f7..e068ebd 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,20 +1,19 @@
 import type { InterpretErrorCode } from './types.js'
 
-// AGENTS §12: misuse of the interprets layer `throw`s an `InterpretError`
-// carrying a machine-readable `code`, so a `catch` branches on `error.code`.
+// Misuse of the interprets layer `throw`s an `InterpretError` carrying a
+// machine-readable `code`, so a `catch` branches on `error.code`.
 
 /**
- * An error thrown by the interprets layer.
+ * Represents an error thrown by the interprets layer.
  *
  * @remarks
- * Thrown for: an injected stage implementation throwing during its phase
- * (`NORMALIZE_FAILED` / `EXTRACT_FAILED` / `CLARIFY_FAILED` /
- * `FORMAT_FAILED` / `GENERATE_FAILED`), `createTemplate` handed data that
- * fails `isTemplate` (`INVALID_TEMPLATE`), and any use of a destroyed
- * `Interpret` / manager / context (`DESTROYED`). `NO_TEMPLATE` and
- * `LOW_CONFIDENCE` never throw — they surface as a visible incomplete
- * {@link Interpretation} instead (never an arbitrary fallback template).
- * `context`, when present, carries the offending stage / template id.
+ * `DESTROYED` is the code that throws, on any use of a destroyed `Interpret`
+ * / manager / context. Every other {@link InterpretErrorCode} reaches a caller
+ * as data rather than as a throw — `NO_TEMPLATE` and `LOW_CONFIDENCE` on a
+ * visible incomplete {@link Interpretation}, and the per-stage `*_FAILED`
+ * codes on that result's `failures`, beside the raw thrown value re-emitted
+ * as `error`. `context` carries structured detail when a throw site supplies
+ * one; the throw sites in this package supply none.
  */
 export class InterpretError extends Error {
 	readonly code: InterpretErrorCode
@@ -33,10 +32,10 @@ export class InterpretError extends Error {
 }
 
 /**
- * Narrow an unknown caught value to an {@link InterpretError}.
+ * Narrows an unknown caught value to an {@link InterpretError}.
  *
  * @param value - The value to test (typically a `catch` binding)
- * @returns `true` when `value` is an {@link InterpretError}
+ * @returns True if `value` is an {@link InterpretError}; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/core/index.ts b/src/core/index.ts
index 2121473..0f63c56 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -3,15 +3,17 @@ export * from './constants.js'
 export * from './errors.js'
 export * from './validators.js'
 export * from './helpers.js'
+export * from './parsers.js'
 export * from './factories.js'
 export * from './Interpret.js'
+export * from './InterpretContext.js'
 export * from './Narrator.js'
 export * from './stages/Normalizer.js'
 export * from './stages/Extractor.js'
 export * from './stages/Clarifier.js'
 export * from './stages/Formatter.js'
 export * from './stages/Generator.js'
+export * from './managers/RecordManager.js'
 export * from './managers/TemplateManager.js'
 export * from './managers/SubjectManager.js'
 export * from './managers/DefinitionManager.js'
-export * from './managers/InterpretContext.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index d6eeabf..5baf2d4 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -5,22 +5,21 @@ import type { Definition, ReasonResult, Subject, SymbolicExpression } from '@ork
 // Interprets — a zero-dependency, synchronous, deterministic bidirectional
 // bridge between natural language and the reasons engine, plus the manager
 // that owns the interpretation lifecycle. FORWARD: raw text is normalized,
-// classified into an intent, matched against a registered `Template`, mined
+// classified into an intent, matched against an added `Template`, mined
 // for numeric entities, clarified (carry-over / defaults / computed fields),
 // formatted into a refined prompt, then generated into a `Subject` +
 // `Definition` pair ready for `Reason.reason`. REVERSE: `Definition` /
 // `Subject` / `ReasonResult` render to display-neutral prose, complementing
 // (never duplicating) raters' `describe*` family. Nothing here is an LLM,
 // provider, or agent — the `prompt` a result carries is FOR an external
-// model, never consumed internally. Types are the source of truth (AGENTS
-// §2); every discriminant names its axis, never `kind` / `type` (AGENTS
-// §4.4): `stage` splits pipeline phases, `category` splits provenance,
-// `code` splits coded errors.
+// model, never consumed internally. Types are the source of truth, and every
+// discriminant names its axis, never `kind` / `type`: `stage` splits pipeline
+// phases, `category` splits provenance, `code` splits coded errors.
 
 // === Vocabulary
 
 /**
- * How one {@link FieldMapping} / {@link Entity} value was obtained.
+ * Names how one {@link FieldMapping} / {@link Entity} value was obtained.
  *
  * @remarks
  * `extracted` — mined from the raw text via keyword / alias / positional
@@ -33,7 +32,7 @@ import type { Definition, ReasonResult, Subject, SymbolicExpression } from '@ork
 export type ProvenanceCategory = 'extracted' | 'carried' | 'default' | 'computed' | 'subject'
 
 /**
- * The five fixed pipeline phases an {@link InterpretInterface#interpret} run
+ * Names the five fixed pipeline phases an {@link InterpretInterface#interpret} run
  * produces one {@link StageRecord} for, in order.
  *
  * @remarks
@@ -44,17 +43,16 @@ export type ProvenanceCategory = 'extracted' | 'carried' | 'default' | 'computed
 export type InterpretStage = 'normalize' | 'extract' | 'clarify' | 'format' | 'generate'
 
 /**
- * Coded misuse / failure conditions thrown as an {@link InterpretError} or
+ * Names the coded misuse / failure conditions thrown as an {@link InterpretError} or
  * carried on a {@link StageFailure}.
  *
  * @remarks
  * `NORMALIZE_FAILED` / `EXTRACT_FAILED` / `CLARIFY_FAILED` / `FORMAT_FAILED`
  * / `GENERATE_FAILED` — an injected stage implementation threw during that
- * phase. `NO_TEMPLATE` — no registered {@link Template} scored at or above
+ * phase. `NO_TEMPLATE` — no added {@link Template} scored at or above
  * the confidence floor (or the registry is empty). `LOW_CONFIDENCE` — a
  * template matched but the classified {@link Intent}'s confidence fell below
- * the floor. `INVALID_TEMPLATE` — `createTemplate` was handed data that
- * fails `isTemplate`. `DESTROYED` — any use of a destroyed entity.
+ * the floor. `DESTROYED` — any use of a destroyed entity.
  */
 export type InterpretErrorCode =
 	| 'NORMALIZE_FAILED'
@@ -64,13 +62,12 @@ export type InterpretErrorCode =
 	| 'GENERATE_FAILED'
 	| 'NO_TEMPLATE'
 	| 'LOW_CONFIDENCE'
-	| 'INVALID_TEMPLATE'
 	| 'DESTROYED'
 
 // === Template data model — pure JSON-serializable, versionable, diffable, hashable
 
 /**
- * One entity-extraction rule inside a {@link Template}: which literal alias
+ * Represents one entity-extraction rule inside a {@link Template}: which literal alias
  * phrases identify a value, and which subject field it lands on.
  *
  * @remarks
@@ -85,24 +82,32 @@ export interface EntityMapping {
 	readonly required?: boolean
 }
 
-/** A fallback value a {@link Template} fills onto a field left unresolved by extraction. */
+/** Represents a fallback value a {@link Template} fills onto a field left unresolved by extraction. */
 export interface FieldDefault {
 	readonly field: FieldPath
 	readonly value: unknown
 }
 
 /**
- * A declaratively computed field: evaluate `expression` against the entities
+ * Represents a declaratively computed field: evaluate `expression` against the entities
  * already resolved for this interpretation, and land the result on `field`.
  *
  * @remarks
- * Renamed from scsr's `InferenceRule` — the reasons engine already owns
+ * Named `ComputedField` rather than a rule: `@orkestrel/reason` already owns
  * `Inference` for fact derivation, a different concept. `expression` is a
  * reasons {@link SymbolicExpression} tree (pure JSON `Variable` / `Constant`
  * / `Operation`), evaluated by the pure `resolveExpression` helper rather
- * than a closure, so a `Template` stays JSON-serializable end to end.
- * Dependencies are derived from the tree (`variablesOf`) — scsr's explicit
- * `from: string[]` list is gone.
+ * than a closure, so a `Template` stays JSON-serializable end to end. A
+ * `ComputedField` declares no dependency list of its own — `variablesOf`
+ * derives every dependency from the tree. A `Variable` names a resolved field,
+ * or one numeric element of an array-valued field as `{field}.{index}`, so a
+ * computation addressing each element in turn declares an aggregate over a
+ * collection of KNOWN length; a collection whose length varies per turn has no
+ * declarable aggregate, because `resolveExpression` returns `undefined` for an
+ * unbound variable and abandons the whole expression. When a scalar field's
+ * path formats to the same binding key as an array element's — the `FieldPath`
+ * `['value', '0']` and the first element of `value` both format to `value.0` —
+ * the entity resolved later overwrites the earlier binding.
  */
 export interface ComputedField {
 	readonly field: FieldPath
@@ -110,16 +115,16 @@ export interface ComputedField {
 }
 
 /**
- * A named, versionable interpretation template: which intents it answers,
+ * Represents a named, versionable interpretation template: which intents it answers,
  * how to mine entities for it, its fallback data, its computed fields, and
  * the reasons `Definition` it ultimately produces a `Subject` for.
  *
  * @remarks
- * `definition` is inline and already expressed in terrain reasons vocabulary
- * (`reasoning` / `Check` / `terms` / `form` / `origin`) — there is no
- * scsr-era `template.id === definition.id` invariant; a `Template` and its
- * `Definition` are simply the same authored record. `intents` lists the
- * `Intent.action` values this template answers.
+ * `definition` is inline and already expressed in `@orkestrel/reason`
+ * vocabulary (`reasoning` / `Check` / `terms` / `form` / `origin`). A
+ * `Template` and its `Definition` are one authored record, and their ids stay
+ * independent: nothing requires `template.id` to equal `definition.id`.
+ * `intents` lists the `Intent.action` values this template answers.
  */
 export interface Template {
 	readonly id: string
@@ -134,28 +139,30 @@ export interface Template {
 
 // === Intent, entity, ambiguity, provenance
 
-/** How one value landed — its origin category plus an optional strategy detail. */
+/** Describes how one value landed — its origin category plus an optional strategy detail. */
 export interface Provenance {
 	readonly category: ProvenanceCategory
 	readonly detail?: string
 }
 
 /**
- * The classified action + domain for one interpretation, with a combined
+ * Represents the classified action + domain for one interpretation, with a combined
  * confidence.
  *
  * @remarks
  * Produced by `classifyIntent` against caller-supplied `actions` / `domains`
  * vocabularies only — there is no built-in en-US worldview and no
- * auto-classification from a registered template's own `domain` name.
+ * auto-classification from an added template's own `domain` name. An axis
+ * the vocabularies leave unmatched is absent (`undefined`), never an empty
+ * string, so a reader tells "unclassified" from "classified as `''`".
  */
 export interface Intent {
-	readonly action: string
-	readonly domain: string
+	readonly action?: string
+	readonly domain?: string
 	readonly confidence: number
 }
 
-/** One value assigned to a template's entity mapping, with its provenance and confidence. */
+/** Represents one value assigned to a template's entity mapping, with its provenance and confidence. */
 export interface Entity {
 	readonly name: string
 	readonly value: unknown
@@ -163,7 +170,7 @@ export interface Entity {
 	readonly confidence: number
 }
 
-/** An unresolved field surfaced as a human-readable question, never bare prose. */
+/** Represents an unresolved field surfaced as a human-readable question, never bare prose. */
 export interface Ambiguity {
 	readonly field: FieldPath
 	readonly question: string
@@ -172,13 +179,12 @@ export interface Ambiguity {
 }
 
 /**
- * One audited field of the built subject — its resolved value, provenance,
+ * Represents one audited field of the built subject — its resolved value, provenance,
  * and confidence.
  *
  * @remarks
  * Emitted for EVERY field that lands in the generated subject, including
- * defaults and computed fields (scsr silently omitted those from its audit
- * trail; this closes that gap).
+ * defaults and computed fields.
  */
 export interface FieldMapping {
 	readonly field: FieldPath
@@ -188,7 +194,7 @@ export interface FieldMapping {
 	readonly confidence: number
 }
 
-/** One normalization substitution applied to the raw text. */
+/** Represents one normalization substitution applied to the raw text. */
 export interface TextChange {
 	readonly from: string
 	readonly to: string
@@ -197,12 +203,12 @@ export interface TextChange {
 // === Per-stage record + failure marker
 
 /**
- * A structured input/output snapshot of one pipeline phase.
+ * Represents a structured input/output snapshot of one pipeline phase.
  *
  * @remarks
  * `input` / `output` are live structured values, never a stringified JSON
- * blob. No `duration` field — strict core forbids wall-clock timing
- * (AGENTS §17.7); the audit story here is structural, not temporal.
+ * blob. No `duration` field — strict core reads no wall clock; the audit
+ * story here is structural, not temporal.
  */
 export interface StageRecord {
 	readonly stage: InterpretStage
@@ -212,7 +218,7 @@ export interface StageRecord {
 	readonly error?: string
 }
 
-/** A visible marker for a stage that threw, carrying its coded reason. */
+/** Represents a visible marker for a stage that threw, carrying its coded reason. */
 export interface StageFailure {
 	readonly stage: InterpretStage
 	readonly code: InterpretErrorCode
@@ -221,14 +227,14 @@ export interface StageFailure {
 
 // === Stage result shapes
 
-/** The `Normalizer` stage's output: the cleaned text plus every substitution applied. */
+/** Represents the `Normalizer` stage's output: the cleaned text plus every substitution applied. */
 export interface NormalizeResult {
 	readonly text: string
 	readonly changes: readonly TextChange[]
 }
 
 /**
- * The `Extractor` stage's output: intent classification plus raw numbers.
+ * Represents the `Extractor` stage's output: intent classification plus raw numbers.
  *
  * @remarks
  * Template-agnostic by design — extraction never sees a `Template`, only the
@@ -242,19 +248,19 @@ export interface ExtractResult {
 	readonly complete: boolean
 }
 
-/** The `Clarifier` stage's output: resolved entities plus any remaining ambiguities. */
+/** Represents the `Clarifier` stage's output: resolved entities plus any remaining ambiguities. */
 export interface ClarifyResult {
 	readonly entities: readonly Entity[]
 	readonly ambiguities: readonly Ambiguity[]
 	readonly complete: boolean
 }
 
-/** The `Formatter` stage's output: the refined natural-language prompt. */
+/** Represents the `Formatter` stage's output: the refined natural-language prompt. */
 export interface FormatResult {
 	readonly prompt: string
 }
 
-/** The `Generator` stage's output: the built subject/definition pair plus its full field audit. */
+/** Represents the `Generator` stage's output: the built subject/definition pair plus its full field audit. */
 export interface GenerateResult {
 	readonly subject: Subject
 	readonly definition: Definition
@@ -265,12 +271,12 @@ export interface GenerateResult {
 // === The result
 
 /**
- * The full, replayable outcome of one `interpret()` call.
+ * Represents the full, replayable outcome of one `interpret()` call.
  *
  * @remarks
  * `subject` / `definition` are absent on an incomplete `NO_TEMPLATE` /
- * `LOW_CONFIDENCE` result — there is never a fabricated fallback template
- * (scsr's `templates[0]` double-fallback defect). `stages` always holds
+ * `LOW_CONFIDENCE` result — there is never a fabricated fallback template.
+ * `stages` always holds
  * exactly five records, `[normalize, extract, clarify, format, generate]`,
  * in order. `digest` is `digestValue` over `{text, templateId,
  * templateVersion, subject, definition}` — re-running the same original text
@@ -297,13 +303,12 @@ export interface Interpretation {
 // === Versioned, content-hashed records
 
 /**
- * A versioned, content-hashed {@link Template} as held by a
+ * Represents a versioned, content-hashed {@link Template} as held by a
  * {@link TemplateManagerInterface}.
  *
  * @remarks
  * `version` bumps only when `hash` (derived from `template`'s content, not
- * `id`) actually changes — an identical re-add keeps the same version,
- * unlike scsr's version-bumps-on-every-add defect.
+ * `id`) actually changes — an identical re-add keeps the same version.
  */
 export interface TemplateRecord {
 	readonly id: string
@@ -313,13 +318,12 @@ export interface TemplateRecord {
 }
 
 /**
- * A versioned, content-hashed {@link Subject} as held by a
+ * Represents a versioned, content-hashed {@link Subject} as held by a
  * {@link SubjectManagerInterface}.
  *
  * @remarks
  * `id` is the manager's OWN minted identity — never `definition.id` — so
- * successive turns never silently overwrite one shared subject (scsr's
- * defect).
+ * successive turns never silently overwrite one shared subject.
  */
 export interface SubjectRecord {
 	readonly id: string
@@ -328,7 +332,7 @@ export interface SubjectRecord {
 	readonly hash: string
 }
 
-/** A versioned, content-hashed {@link Definition} as held by a {@link DefinitionManagerInterface}. */
+/** Represents a versioned, content-hashed {@link Definition} as held by a {@link DefinitionManagerInterface}. */
 export interface DefinitionRecord {
 	readonly id: string
 	readonly definition: Definition
@@ -336,97 +340,85 @@ export interface DefinitionRecord {
 	readonly hash: string
 }
 
-// === Event map (AGENTS §13)
+// === Event maps
 
 /**
- * The push observation surface of an {@link InterpretInterface} (AGENTS §13).
+ * Represents the push observation surface of an {@link InterpretInterface}.
  *
  * @remarks
- * `interpret` fires once per completed `interpret()` call (complete OR
- * incomplete — visibility is the point, unlike scsr's silent fallbacks).
- * `register` fires when a template is registered, carrying its id. `error`
- * fires with the raw thrown value when an injected stage implementation
- * throws. `destroy` fires once on teardown. Listener isolation is the
- * emitter's own (AGENTS §13) — never routed onto this map.
+ * `interpret` fires once per completed `interpret()` call, complete OR
+ * incomplete — visibility is the point. `add` fires when a template is added,
+ * carrying its id, and names the same act as the {@link RecordEventMap} row
+ * the call forwards to. `error` fires with the raw thrown value when an
+ * injected stage implementation throws. `destroy` fires once on teardown.
+ * Listener isolation is the emitter's own — never routed onto this map.
  */
 export type InterpretEventMap = {
-	/** An `interpret()` call completed — carries the full result. */
+	/** Fires when an `interpret()` call completes — carries the full result. */
 	readonly interpret: readonly [result: Interpretation]
-	/** A template was registered — carries its id. */
-	readonly register: readonly [templateId: string]
-	/** An injected stage implementation threw — carries the raw thrown value. */
+	/** Fires when a template is added — carries its id. */
+	readonly add: readonly [templateId: string]
+	/** Fires when an injected stage implementation throws — carries the raw thrown value. */
 	readonly error: readonly [error: unknown]
-	/** The orchestrator was destroyed. */
+	/** Fires when the orchestrator is destroyed. */
 	readonly destroy: readonly []
 }
 
 /**
- * The push observation surface of a {@link TemplateManagerInterface} (AGENTS
- * §13) — an id-keyed registry, so `add` / `remove` are the events (never
- * ordered-list `append`/`prepend`).
+ * Represents the push observation surface shared by every record registry — an id-keyed
+ * collection, so `add` / `remove` are the events (never ordered-list
+ * `append`/`prepend`).
  */
-export type TemplateManagerEventMap = {
-	/** A template record was added — carries its record id. */
+export type RecordEventMap = {
+	/** Fires when a record is added — carries its record id. */
 	readonly add: readonly [id: string]
-	/** A template record was removed — carries its record id. */
+	/** Fires when a record is removed — carries its record id. */
 	readonly remove: readonly [id: string]
-	/** The manager was destroyed. */
+	/** Fires when the registry is destroyed. */
 	readonly destroy: readonly []
 }
 
-/** The push observation surface of a {@link SubjectManagerInterface} (AGENTS §13). */
-export type SubjectManagerEventMap = {
-	/** A subject record was added — carries its (own-minted) record id. */
-	readonly add: readonly [id: string]
-	/** A subject record was removed — carries its record id. */
-	readonly remove: readonly [id: string]
-	/** The manager was destroyed. */
-	readonly destroy: readonly []
-}
+/** Represents the push observation surface of a {@link TemplateManagerInterface}. */
+export type TemplateManagerEventMap = RecordEventMap
 
-/** The push observation surface of a {@link DefinitionManagerInterface} (AGENTS §13). */
-export type DefinitionManagerEventMap = {
-	/** A definition record was added — carries its record id. */
-	readonly add: readonly [id: string]
-	/** A definition record was removed — carries its record id. */
-	readonly remove: readonly [id: string]
-	/** The manager was destroyed. */
-	readonly destroy: readonly []
-}
+/** Represents the push observation surface of a {@link SubjectManagerInterface}, whose `add` carries the own-minted record id. */
+export type SubjectManagerEventMap = RecordEventMap
+
+/** Represents the push observation surface of a {@link DefinitionManagerInterface}. */
+export type DefinitionManagerEventMap = RecordEventMap
 
 /**
- * The push observation surface of an {@link InterpretContextInterface} (AGENTS
- * §13).
+ * Represents the push observation surface of an {@link InterpretContextInterface}.
  *
  * @remarks
  * An {@link Interpretation} carries no `id` of its own — `add` carries the
  * entry's `digest` instead, the closest content-derived identity it has.
  */
 export type InterpretContextEventMap = {
-	/** A completed interpretation was added to the history — carries its digest. */
+	/** Fires when a completed interpretation is added to the history — carries its digest. */
 	readonly add: readonly [digest: string]
-	/** The history and both registries were cleared. */
+	/** Fires when the history and both registries are cleared. */
 	readonly clear: readonly []
-	/** The context was destroyed. */
+	/** Fires when the context is destroyed. */
 	readonly destroy: readonly []
 }
 
 // === Narrator — lexicon-driven reverse rendering (mechanism, never policy)
 
 /**
- * A pure formatting function for one lexicon `value()` unit.
+ * Represents a pure formatting function for one lexicon `value()` unit.
  *
  * @remarks
- * A `Narrator` calls this from `value()` inside a `try`/`catch` (AGENTS §21 —
- * a wording engine must never crash a render) — a throwing formatter is
- * caught and the raw value falls back to `String(raw)`.
+ * A `Narrator` calls this from `value()` inside a `try`/`catch`, because a
+ * wording engine must never crash a render — a throwing formatter is caught
+ * and the raw value falls back to `String(raw)`.
  */
 export type NarratorFormatter = (value: unknown) => string
 
 /**
- * Caller-injected wording data for the reverse direction — mechanism, never
- * policy (AGENTS §21). Every phrase, label, and template string a `Narrator`
- * renders is DATA supplied here, never a core literal.
+ * Represents caller-injected wording data for the reverse direction — mechanism, never
+ * policy. Every phrase, label, and template string a `Narrator` renders is
+ * DATA supplied here, never a core literal.
  *
  * @remarks
  * `phrases` is a two-level lookup (`table` → `key` → phrase) for domain
@@ -438,7 +430,7 @@ export type NarratorFormatter = (value: unknown) => string
  * for the pinned neutral key set. Token grammar (the `[^{}]` token class, the
  * `\{{` literal escape, whitespace trimming, and dotted-token path
  * resolution) is defined by @orkestrel/template — see the vendored
- * `guides/src/template.md` for the authoritative contract.
+ * `guides/template.md` for the authoritative contract.
  */
 export interface Lexicon {
 	readonly phrases?: Readonly<Record<string, Readonly<Record<string, string>>>>
@@ -446,7 +438,7 @@ export interface Lexicon {
 	readonly templates?: Readonly<Record<string, string>>
 }
 
-/** Options for `createNarrator` / the `Narrator` constructor. */
+/** Represents the options for `createNarrator` / the `Narrator` constructor. */
 export interface NarratorOptions {
 	readonly lexicon?: Lexicon
 	readonly formatters?: Readonly<Record<string, NarratorFormatter>>
@@ -455,11 +447,14 @@ export interface NarratorOptions {
 // === Options records
 
 /**
- * Options for `createNormalizer` / the `Normalizer` constructor.
+ * Represents the options for `createNormalizer` / the `Normalizer` constructor.
  *
  * @remarks
- * Each map is merged OVER the neutral built-in defaults, applied in order
- * contractions → abbreviations → corrections, before whitespace collapse.
+ * The maps apply in order — contractions → abbreviations → corrections —
+ * before whitespace collapse. `contractions` merges OVER
+ * `DEFAULT_CONTRACTIONS`; `abbreviations` and `corrections` carry no built-in
+ * vocabulary, because an abbreviation or a misspelling set is domain worldview
+ * rather than mechanism.
  */
 export interface NormalizerOptions {
 	readonly contractions?: Readonly<Record<string, string>>
@@ -468,11 +463,11 @@ export interface NormalizerOptions {
 }
 
 /**
- * Options for `createExtractor` / the `Extractor` constructor.
+ * Represents the options for `createExtractor` / the `Extractor` constructor.
  *
  * @remarks
  * `actions` / `domains` are the caller's intent vocabulary — there is no
- * built-in worldview (AGENTS-flagged scsr defect). Neither `floor` nor
+ * built-in worldview. Neither `floor` nor
  * `similarity` lives here: the confidence floor gate is the orchestrator's
  * `matchTemplate` step, never the classifier itself.
  */
@@ -482,47 +477,51 @@ export interface ExtractorOptions {
 }
 
 /**
- * Options for `createClarifier` / the `Clarifier` constructor.
+ * Represents the options for `createClarifier` / the `Clarifier` constructor.
  *
  * @remarks
- * `floor` is the confidence axis honored when raising ambiguities — never
- * hardcoded (scsr hardcoded its confidence constant instead of honoring the
- * configured value).
+ * `floor` is the confidence axis honored when raising ambiguities — the
+ * configured value, never a hardcoded constant. `narrator` supplies the
+ * wording seam: every {@link Ambiguity} question renders through
+ * `narrator.line('ambiguity.entity', …)`, so a caller rewords the question by
+ * overriding that key in a {@link Lexicon}. A fresh `Narrator` over
+ * `DEFAULT_LEXICON` is constructed when omitted.
  */
 export interface ClarifierOptions {
 	readonly floor?: number
-}
-
-/** Options for `createFormatter` / the `Formatter` constructor — caller-supplied intent-verb phrasing. */
-export interface FormatterOptions {
-	readonly verbs?: Readonly<Record<string, string>>
+	readonly narrator?: NarratorInterface
 }
 
 /**
- * Options for `createGenerator` / the `Generator` constructor.
+ * Represents the options for `createFormatter` / the `Formatter` constructor.
  *
  * @remarks
- * Currently an empty extension seam — the `Generator` stage takes no
- * configuration today, but keeps its own options type so a future knob
- * never has to change the `GeneratorInterface#generate` call signature.
+ * `verbs` maps an `Intent.action` to its display verb. `narrator` supplies the
+ * rest of the wording seam: every prompt clause renders through
+ * `narrator.line('prompt.…', …)`, so a caller rewords the clause assembly by
+ * overriding those keys in a {@link Lexicon}. A fresh `Narrator` over
+ * `DEFAULT_LEXICON` is constructed when omitted.
  */
-export interface GeneratorOptions {}
+export interface FormatterOptions {
+	readonly verbs?: Readonly<Record<string, string>>
+	readonly narrator?: NarratorInterface
+}
 
-/** Options for `createTemplateManager` / the `TemplateManager` constructor — the initial seed collection. */
+/** Represents the options for `createTemplateManager` / the `TemplateManager` constructor — the initial seed collection. */
 export interface TemplateManagerOptions {
 	readonly templates?: readonly Template[]
 	readonly on?: EmitterHooks<TemplateManagerEventMap>
 	readonly error?: EmitterErrorHandler
 }
 
-/** Options for `createSubjectManager` / the `SubjectManager` constructor — the initial seed collection. */
+/** Represents the options for `createSubjectManager` / the `SubjectManager` constructor — the initial seed collection. */
 export interface SubjectManagerOptions {
 	readonly subjects?: readonly Subject[]
 	readonly on?: EmitterHooks<SubjectManagerEventMap>
 	readonly error?: EmitterErrorHandler
 }
 
-/** Options for `createDefinitionManager` / the `DefinitionManager` constructor — the initial seed collection. */
+/** Represents the options for `createDefinitionManager` / the `DefinitionManager` constructor — the initial seed collection. */
 export interface DefinitionManagerOptions {
 	readonly definitions?: readonly Definition[]
 	readonly on?: EmitterHooks<DefinitionManagerEventMap>
@@ -530,19 +529,92 @@ export interface DefinitionManagerOptions {
 }
 
 /**
- * Per-call options shared by every manager's `add` method.
+ * Represents the identity, version, and content hash a {@link RecordManagerInterface}
+ * derives for one record before its concrete shape is built.
+ *
+ * @remarks
+ * `hash` is derived from the held value's CONTENT alone (id-independent), and
+ * `version` bumps only when that hash changes at a reused id — so an
+ * identical re-add keeps its version. Every record type in this module
+ * (`TemplateRecord` / `SubjectRecord` / `DefinitionRecord`) carries `id`,
+ * `version`, and `hash` plus its own value field.
+ */
+export interface RecordStamp {
+	readonly id: string
+	readonly version: number
+	readonly hash: string
+}
+
+/**
+ * Builds one concrete record from the {@link RecordStamp} its registry derived
+ * and the value that record holds.
+ *
+ * @remarks
+ * The one place a concrete manager decides its record's own value field, so
+ * `TemplateManager` names it `template`, `SubjectManager` names it `subject`,
+ * and `DefinitionManager` names it `definition` while every registry shares
+ * one engine.
+ */
+export type RecordFunction<TValue, TRecord extends RecordStamp> = (
+	stamp: RecordStamp,
+	value: TValue,
+) => TRecord
+
+/**
+ * Represents the options for the `RecordManager` constructor.
+ *
+ * @remarks
+ * `entity` names what the registry holds, and is the only wording the engine
+ * emits: a call after `destroy()` throws
+ * `InterpretError('DESTROYED', '{entity} manager has been destroyed')`.
+ */
+export interface RecordManagerOptions {
+	readonly entity: string
+	readonly on?: EmitterHooks<RecordEventMap>
+	readonly error?: EmitterErrorHandler
+}
+
+/**
+ * Represents the shared registry engine every record manager composes — the `Map`, the
+ * content-hash and version rule, the batch `remove` overloads, and teardown.
+ *
+ * @remarks
+ * Generic over the value it holds and the record it mints, so one
+ * implementation serves `TemplateManagerInterface`,
+ * `SubjectManagerInterface`, and `DefinitionManagerInterface`. Each concrete
+ * manager keeps its own accessor noun pair, its own id source, and its own
+ * {@link RecordFunction}; everything else lives here. `remove`'s batch form is
+ * all-or-nothing: any missing id in the list leaves the collection untouched
+ * and returns `false`. `destroy()` is idempotent and tears the emitter down
+ * LAST; every method afterwards throws `InterpretError('DESTROYED', …)`.
+ */
+export interface RecordManagerInterface<TValue, TRecord extends RecordStamp> {
+	readonly emitter: EmitterInterface<RecordEventMap>
+	readonly count: number
+	has(id: string): boolean
+	record(id: string): TRecord | undefined
+	records(): readonly TRecord[]
+	add(id: string, value: TValue, build: RecordFunction<TValue, TRecord>): TRecord
+	remove(ids: readonly string[]): boolean
+	remove(id: string): boolean
+	remove(): void
+	destroy(): void
+}
+
+/**
+ * Represents the per-call options for the record a manager's `add` mints.
  *
  * @remarks
  * `id` overrides the minted record id. `TemplateManagerInterface#add` /
  * `DefinitionManagerInterface#add` default to the added value's own `id`
  * field when omitted; `SubjectManagerInterface#add` mints a fresh id when
- * omitted, since a `Subject` carries no `id` field of its own.
+ * omitted, because a `Subject` carries no `id` field of its own.
  */
-export interface ManagerAddOptions {
+export interface RecordOptions {
 	readonly id?: string
 }
 
-/** Options for `createInterpretContext` / the `InterpretContext` constructor. */
+/** Represents the options for `createInterpretContext` / the `InterpretContext` constructor. */
 export interface InterpretContextOptions {
 	readonly session?: string
 	readonly history?: number
@@ -551,20 +623,26 @@ export interface InterpretContextOptions {
 }
 
 /**
- * Options for `createInterpret` / the `Interpret` constructor.
+ * Represents the options for `createInterpret` / the `Interpret` constructor.
  *
  * @remarks
  * `templates` seeds the registry. `context` supplies a shared
  * {@link InterpretContextInterface} (a fresh one is constructed when
- * omitted). Each stage slot is BRING-YOUR-OWN — a supplied implementation is
- * used as-is, else the built-in stage is constructed from the matching
- * per-stage options. `similarity` (fuzzy alias-match threshold, default
+ * omitted); a supplied context stays the caller's to tear down, and
+ * `destroy()` leaves it alive for the other orchestrators sharing it. Each
+ * stage slot is BRING-YOUR-OWN — a supplied implementation is
+ * used as-is, else the built-in stage is constructed with its own defaults,
+ * so a caller who wants a configured stage constructs that stage and supplies
+ * the instance. There are no per-stage option keys here: `floor` is the one
+ * value threaded into a built-in stage, reaching the `Clarifier`.
+ * `similarity` (fuzzy alias-match threshold, default
  * `DEFAULT_INTERPRET_SIMILARITY`) and `floor` (intent confidence floor,
  * default `DEFAULT_INTERPRET_FLOOR`) are two distinct, clearly named axes —
- * both honored wherever they apply, never a single overloaded `threshold`
- * (scsr's defect). `history` caps the context's `previous()` ring buffer.
- * `on` — initial event listeners (AGENTS §8). `error` — the emitter's
- * listener-error handler (AGENTS §13).
+ * each honored wherever it applies, never a single overloaded `threshold`.
+ * `history` caps the context's `previous()` ring buffer. `narrator` groups the
+ * wording settings the orchestrator builds its own {@link NarratorInterface}
+ * from, keeping them clear of the `formatter` stage slot beside them. `on` —
+ * initial event listeners. `error` — the emitter's listener-error handler.
  */
 export interface InterpretOptions {
 	readonly templates?: readonly Template[]
@@ -577,26 +655,25 @@ export interface InterpretOptions {
 	readonly similarity?: number
 	readonly floor?: number
 	readonly history?: number
-	readonly lexicon?: Lexicon
-	readonly formatters?: Readonly<Record<string, NarratorFormatter>>
+	readonly narrator?: NarratorOptions
 	readonly on?: EmitterHooks<InterpretEventMap>
 	readonly error?: EmitterErrorHandler
 }
 
-// === Class interfaces (AGENTS §22 — exact bijection with the implementing class)
+// === Class interfaces — an exact bijection with the implementing class
 
-/** The `Normalizer` stage contract: raw text in, cleaned text + applied changes out. */
+/** Represents the `Normalizer` stage contract: raw text in, cleaned text + applied changes out. */
 export interface NormalizerInterface {
 	normalize(text: string): NormalizeResult
 }
 
-/** The `Extractor` stage contract: template-agnostic intent classification + raw number mining. */
+/** Represents the `Extractor` stage contract: template-agnostic intent classification + raw number mining. */
 export interface ExtractorInterface {
 	extract(text: string): ExtractResult
 }
 
 /**
- * The `Clarifier` stage contract: resolve carry-over, defaults, and computed
+ * Represents the `Clarifier` stage contract: resolve carry-over, defaults, and computed
  * fields against a set of already-assigned entities, surfacing ambiguities
  * for anything required that stays unresolved.
  */
@@ -609,7 +686,7 @@ export interface ClarifierInterface {
 	): ClarifyResult
 }
 
-/** The `Formatter` stage contract: render the refined natural-language prompt for a matched template. */
+/** Represents the `Formatter` stage contract: render the refined natural-language prompt for a matched template. */
 export interface FormatterInterface {
 	format(
 		intent: Intent,
@@ -619,13 +696,22 @@ export interface FormatterInterface {
 	): FormatResult
 }
 
-/** The `Generator` stage contract: build the final subject/definition pair plus its field audit. */
+/**
+ * Represents the `Generator` stage contract: build the final subject/definition pair plus
+ * its field audit.
+ *
+ * @remarks
+ * Every field the built subject carries comes from an entity the caller's own
+ * {@link Template} declared — a mapping, a default, or a
+ * {@link ComputedField}. The stage derives no field of its own, so a subject
+ * never gains a sibling the template author did not ask for.
+ */
 export interface GeneratorInterface {
 	generate(entities: readonly Entity[], template: Template): GenerateResult
 }
 
 /**
- * The `Narrator` contract — a stateless, TOTAL, lexicon-driven rendering
+ * Represents the `Narrator` contract — a stateless, TOTAL, lexicon-driven rendering
  * engine for the reverse direction.
  *
  * @remarks
@@ -652,22 +738,21 @@ export interface NarratorInterface {
 }
 
 /**
- * The template registry — a self-owning, versioned/hashed record-holder
- * (AGENTS §9.1 singular/plural accessors, §9.2 batch overloads).
+ * Represents the template registry — a self-owning, versioned/hashed record-holder with
+ * the singular/plural accessor pair and the batch `remove` overloads.
  *
  * @remarks
- * `size` (never `count` — this is the sole tally in scope) mirrors the
- * raters `ProgramManagerInterface` registry precedent. `remove`'s batch form
- * is all-or-nothing: any missing id in the list leaves the collection
- * untouched and returns `false`.
+ * `count` is the registry's lone tally. `remove`'s batch form is
+ * all-or-nothing: any missing id in the list leaves the collection untouched
+ * and returns `false`.
  */
 export interface TemplateManagerInterface {
 	readonly emitter: EmitterInterface<TemplateManagerEventMap>
-	readonly size: number
+	readonly count: number
 	has(id: string): boolean
 	template(id: string): TemplateRecord | undefined
 	templates(): readonly TemplateRecord[]
-	add(template: Template, options?: ManagerAddOptions): TemplateRecord
+	add(template: Template, options?: RecordOptions): TemplateRecord
 	remove(ids: readonly string[]): boolean
 	remove(id: string): boolean
 	remove(): void
@@ -675,30 +760,30 @@ export interface TemplateManagerInterface {
 }
 
 /**
- * The subject registry — a self-owning, versioned/hashed record-holder
+ * Represents the subject registry — a self-owning, versioned/hashed record-holder
  * that mints its own record ids (a `Subject` carries none).
  */
 export interface SubjectManagerInterface {
 	readonly emitter: EmitterInterface<SubjectManagerEventMap>
-	readonly size: number
+	readonly count: number
 	has(id: string): boolean
 	subject(id: string): SubjectRecord | undefined
 	subjects(): readonly SubjectRecord[]
-	add(subject: Subject, options?: ManagerAddOptions): SubjectRecord
+	add(subject: Subject, options?: RecordOptions): SubjectRecord
 	remove(ids: readonly string[]): boolean
 	remove(id: string): boolean
 	remove(): void
 	destroy(): void
 }
 
-/** The definition registry — a self-owning, versioned/hashed record-holder. */
+/** Represents the definition registry — a self-owning, versioned/hashed record-holder. */
 export interface DefinitionManagerInterface {
 	readonly emitter: EmitterInterface<DefinitionManagerEventMap>
-	readonly size: number
+	readonly count: number
 	has(id: string): boolean
 	definition(id: string): DefinitionRecord | undefined
 	definitions(): readonly DefinitionRecord[]
-	add(definition: Definition, options?: ManagerAddOptions): DefinitionRecord
+	add(definition: Definition, options?: RecordOptions): DefinitionRecord
 	remove(ids: readonly string[]): boolean
 	remove(id: string): boolean
 	remove(): void
@@ -706,7 +791,7 @@ export interface DefinitionManagerInterface {
 }
 
 /**
- * Cross-turn interpretation context: a capped, replayable history plus the
+ * Represents the cross-turn interpretation context: a capped, replayable history plus the
  * subject/definition registries carry-over reads from.
  *
  * @remarks
@@ -729,25 +814,33 @@ export interface InterpretContextInterface {
 }
 
 /**
- * The interpretation orchestrator — the sole public entry point, mirroring
+ * Represents the interpretation orchestrator — the sole public entry point, mirroring
  * `reasons`' `Reason` orchestrator shape.
  *
  * @remarks
- * `interpret` is genuinely SYNCHRONOUS (scsr's `interpret()` was fake-async
- * with zero `await`s). `register` / `unregister` / `template` / `templates`
- * delegate to an internal {@link TemplateManagerInterface} but expose plain
- * {@link Template} data, not the richer versioned record. `describe` /
+ * `interpret` is genuinely SYNCHRONOUS — it returns its
+ * {@link Interpretation} directly, never a `Promise`. `add` / `remove` /
+ * `template` / `templates` name the same acts as the
+ * {@link TemplateManagerInterface} they delegate to, and expose plain
+ * {@link Template} data rather than the richer versioned record — which is why
+ * `add` returns `void` where `TemplateManagerInterface#add` returns the record
+ * it minted. `remove` carries the same batch overloads as that delegate, so
+ * the shared verb promises no form the orchestrator lacks. `describe` /
  * `narrate` are the reverse direction — structure-to-prose, complementing
  * (never duplicating) raters' `describe*` family. After `destroy()` every
  * method except the `emitter` getter and `destroy` itself throws
- * `InterpretError('DESTROYED', …)`; `destroy()` is idempotent and tears the
+ * `InterpretError('DESTROYED', …)`; `destroy()` is idempotent, tears down the
+ * template registry and the context it constructed itself — never a `context`
+ * the caller supplied, which outlives this orchestrator — and tears the
  * emitter down LAST.
  */
 export interface InterpretInterface {
 	readonly emitter: EmitterInterface<InterpretEventMap>
 	interpret(text: string): Interpretation
-	register(template: Template): void
-	unregister(id: string): boolean
+	add(template: Template): void
+	remove(ids: readonly string[]): boolean
+	remove(id: string): boolean
+	remove(): void
 	template(id: string): Template | undefined
 	templates(): readonly Template[]
 	describe(definition: Definition): string
```
