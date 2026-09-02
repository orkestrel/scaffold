# Last changes: reason

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `80151ce`, merge base with `origin/main` `aca0718`, layer L2, declared version 0.0.8, registry version 0.0.8.

## Commits since origin/main

```text
0db110a 2026-08-28 Update every dependency to the published latest
13fc802 2026-08-28 Adopt the catalog and guide mirrors for the wave
ef0a158 2026-08-28 Apply the verified src-audit fixes
6a8b5ea 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
9844655 2026-09-01 Adopt the renamed guide helpers in the parity test
a42bd0f 2026-09-02 Move the value constructors to factories and seat a manager's collection
c363201 2026-09-02 Pin the variable manager's seat after destroy and name its parameter
80151ce 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md                           |   17 +-
 README.md                                             |   18 +-
 package.json                                          |    6 +-
 src/core/Reason.ts                                    |    8 +-
 src/core/builders/DefinitionBuilder.ts                |  168 ++++---
 src/core/builders/SubjectBuilder.ts                   |   20 +-
 src/core/builders/managers/Collection.ts              |   77 +++
 src/core/builders/managers/EquationManager.ts         |   59 +--
 src/core/builders/managers/FactManager.ts             |   63 +--
 src/core/builders/managers/FactorManager.ts           |    2 +-
 src/core/builders/managers/GroupManager.ts            |   64 +--
 src/core/builders/managers/InferenceManager.ts        |   59 +--
 src/core/builders/managers/RuleManager.ts             |   64 ++-
 src/core/builders/managers/VariableManager.ts         |   22 +-
 src/core/constants.ts                                 |   43 +-
 src/core/errors.ts                                    |   27 +-
 src/core/factories.ts                                 |  804 ++++++++++++++++++++++++++++---
 src/core/helpers.ts                                   | 1494 ++++++++++++++++++++-------------------------------------
 src/core/index.ts                                     |    1 +
 src/core/operators/Aggregator.ts                      |   19 +-
 src/core/operators/Evaluator.ts                       |   15 +-
 src/core/parsers.ts                                   |   33 ++
 src/core/reasoners/InferentialReasoner.ts             |   41 +-
 src/core/reasoners/LogicalReasoner.ts                 |   10 +-
 src/core/reasoners/QuantitativeReasoner.ts            |   49 +-
 src/core/reasoners/SymbolicReasoner.ts                |    4 +-
 src/core/types.ts                                     |  427 ++++++++++-------
 src/core/validators.ts                                |  370 ++++++++------
 tests/guides.test.ts                                  |   24 +-
 tests/setup.ts                                        |   16 +-
 tests/src/core/Reason.test.ts                         |   44 +-
 tests/src/core/builders/DefinitionBuilder.test.ts     |  263 ++++++----
 tests/src/core/factories.test.ts                      |  327 ++++++++++++-
 tests/src/core/helpers.test.ts                        |  899 +++++++++++++++++-----------------
 tests/src/core/integration.test.ts                    |  430 ++++++++++-------
 tests/src/core/operators/Evaluator.test.ts            |  518 ++++++++++++--------
 tests/src/core/operators/Transformer.test.ts          |  296 +++++++-----
 tests/src/core/reasoners/InferentialReasoner.test.ts  |  836 ++++++++++++++++++++------------
 tests/src/core/reasoners/LogicalReasoner.test.ts      |  365 ++++++++------
 tests/src/core/reasoners/QuantitativeReasoner.test.ts |  744 +++++++++++++++-------------
 tests/src/core/reasoners/SymbolicReasoner.test.ts     |  737 ++++++++++++++++++----------
 tests/src/core/validators.test.ts                     |  429 +++++++++++------
 42 files changed, 5816 insertions(+), 4096 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index f9fdb77..5142c5e 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,10 +1,11 @@
 import type { MathOperation } from './types.js'
 
-// Frozen default data for the reasons module (AGENTS §5 — constants are
-// UPPER_SNAKE_CASE data, the sole home for module-scope literal defaults).
+// Frozen default data for the reasons module — constants are
+// UPPER_SNAKE_CASE data, and this is the sole home for module-scope literal
+// defaults.
 
 /**
- * Default `bail` for the `Reason` orchestrator — a reasoner throw is rethrown
+ * Holds the default `bail` for the `Reason` orchestrator — a reasoner throw is rethrown
  * after the `error` emit.
  *
  * @remarks
@@ -13,32 +14,32 @@ import type { MathOperation } from './types.js'
  */
 export const DEFAULT_REASON_BAIL = true
 
-/** Default `validate` for the `Reason` orchestrator — per-call validation is skipped. */
+/** Holds the default `validate` for the `Reason` orchestrator — per-call validation is skipped. */
 export const DEFAULT_VALIDATE = false
 
 /**
- * Default `depth` for chaining definitions — the forward-iteration /
+ * Holds the default `depth` for chaining definitions — the forward-iteration /
  * backward-recursion cap of the logical and inferential reasoners.
  */
 export const DEFAULT_DEPTH = 10
 
-/** Default `base` added before aggregation, at both group and definition level. */
+/** Holds the default `base` added before aggregation, at both group and definition level. */
 export const DEFAULT_BASE = 0
 
-/** Default `precision` (decimal places) for quantitative values and symbolic solutions. */
+/** Holds the default `precision` (decimal places) for quantitative values and symbolic solutions. */
 export const DEFAULT_PRECISION = 4
 
-/** Default `confidence` for facts, inferences, and injected subject facts. */
+/** Holds the default `confidence` for facts, inferences, and injected subject facts. */
 export const DEFAULT_CONFIDENCE = 1
 
-/** Default factor `weight` at group aggregation. */
+/** Holds the default factor `weight` at group aggregation. */
 export const DEFAULT_WEIGHT = 1
 
-/** Default factor / rule `priority` — evaluation order is ascending and stable. */
+/** Holds the default factor / rule `priority` — evaluation order is ascending and stable. */
 export const DEFAULT_PRIORITY = 0
 
 /**
- * Decimal places a derived fact's confidence is rounded to during forward
+ * Holds the decimal places a derived fact's confidence is rounded to during forward
  * inferential chaining.
  *
  * @remarks
@@ -48,7 +49,7 @@ export const DEFAULT_PRIORITY = 0
 export const CONFIDENCE_PRECISION = 4
 
 /**
- * The math operations the symbolic reasoner can invert while isolating a
+ * Lists the math operations the symbolic reasoner can invert while isolating a
  * target variable — anything else (a `power`, an `abs`) fails the equation
  * with a non-invertible error.
  */
@@ -56,29 +57,29 @@ export const INVERTIBLE_OPERATIONS: ReadonlySet<MathOperation> = Object.freeze(
 	new Set<MathOperation>(['add', 'subtract', 'multiply', 'divide']),
 )
 
-/** Default `id` for an `Evaluator`. */
+/** Names the default `id` for an `Evaluator`. */
 export const EVALUATOR_ID = 'evaluator'
 
-/** Default `id` for a `Transformer`. */
+/** Names the default `id` for a `Transformer`. */
 export const TRANSFORMER_ID = 'transformer'
 
-/** Default `id` for an `Aggregator`. */
+/** Names the default `id` for an `Aggregator`. */
 export const AGGREGATOR_ID = 'aggregator'
 
-/** Default `id` for a `QuantitativeReasoner`. */
+/** Names the default `id` for a `QuantitativeReasoner`. */
 export const QUANTITATIVE_ID = 'quantitative'
 
-/** Default `id` for a `LogicalReasoner`. */
+/** Names the default `id` for a `LogicalReasoner`. */
 export const LOGICAL_ID = 'logical'
 
-/** Default `id` for a `SymbolicReasoner`. */
+/** Names the default `id` for a `SymbolicReasoner`. */
 export const SYMBOLIC_ID = 'symbolic'
 
-/** Default `id` for an `InferentialReasoner`. */
+/** Names the default `id` for an `InferentialReasoner`. */
 export const INFERENTIAL_ID = 'inferential'
 
 /**
- * The `DefinitionBuilder` entity brand — a `unique symbol` key carrying
+ * Holds the `DefinitionBuilder` entity brand — a `unique symbol` key carrying
  * `readonly true` on every `DefinitionBuilderInterface` instance.
  *
  * @remarks
@@ -90,7 +91,7 @@ export const INFERENTIAL_ID = 'inferential'
 export const DEFINITION_BUILDER_BRAND: unique symbol = Symbol('reasons.definitionBuilder')
 
 /**
- * The `SubjectBuilder` entity brand — a `unique symbol` key carrying
+ * Holds the `SubjectBuilder` entity brand — a `unique symbol` key carrying
  * `readonly true` on every `SubjectBuilderInterface` instance.
  *
  * @remarks
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 0ec195d..4ba3554 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,20 +1,25 @@
 import type { ReasonErrorCode } from './types.js'
 
-// AGENTS §12: misuse of the reasons layer `throw`s a `ReasonError` carrying a
+// Misuse of the reasons layer `throw`s a `ReasonError` carrying a
 // machine-readable `code`, so a `catch` branches on `error.code`.
 
 /**
- * An error thrown by the reasons layer.
+ * Represents an error thrown by the reasons layer.
  *
  * @remarks
  * Thrown for: dispatching a definition no registered reasoner handles
- * (`MISSING`), a pre-run validation failure when the orchestrator's `validate`
- * option is on (`INVALID`), handing a reasoner a definition of a different
- * reasoning (`MISMATCH`), any use of a destroyed orchestrator (`DESTROYED`),
- * and an `appendById` / `prependById` (or per-kind `append*` / `prepend*`)
- * `target` id naming no existing element (`TARGET`). `context`, when present,
- * carries the definition id and the reasoning involved (or, for `TARGET`, the
- * offending `id` / `target`).
+ * (`MISSING`); a pre-run validation failure when the orchestrator's `validate`
+ * option is on (`INVALID`); a cross-reasoning definition handed to a reasoner
+ * or to a `DefinitionBuilder`'s `merge`, a `clear` key that is not clearable
+ * for the builder's reasoning, or a write to a `SubjectBuilder`'s immutable
+ * `id` (`MISMATCH`); any use of a destroyed orchestrator, builder, or manager
+ * (`DESTROYED`); a locator id naming no existing element — an `appendById` /
+ * `prependById` (or per-kind `append*` / `prepend*`) `target`, or the required
+ * `groupId` a `FactorManager` verb threads (`TARGET`); and a math operator
+ * outside the accepted vocabulary (`OPERATOR`). `context`, when present,
+ * carries the definition id and the reasoning involved, or the offending
+ * `id` / `target` / `groupId` for `TARGET`, the `key` for a non-clearable
+ * `clear`, and the `operator` for `OPERATOR`.
  */
 export class ReasonError extends Error {
 	readonly code: ReasonErrorCode
@@ -29,10 +34,10 @@ export class ReasonError extends Error {
 }
 
 /**
- * Narrow an unknown caught value to a {@link ReasonError}.
+ * Narrows an unknown caught value to a {@link ReasonError}.
  *
  * @param value - The value to test (typically a `catch` binding)
- * @returns `true` when `value` is a {@link ReasonError}
+ * @returns True if `value` is a {@link ReasonError}; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/core/index.ts b/src/core/index.ts
index 51b53c4..24d6396 100644
--- a/src/core/index.ts
+++ b/src/core/index.ts
@@ -3,6 +3,7 @@ export * from './constants.js'
 export * from './errors.js'
 export * from './validators.js'
 export * from './helpers.js'
+export * from './parsers.js'
 export * from './factories.js'
 export * from './Reason.js'
 export * from './operators/Evaluator.js'
diff --git a/src/core/types.ts b/src/core/types.ts
index fbb8fc0..2314e96 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -9,14 +9,14 @@ import type { DEFINITION_BUILDER_BRAND, SUBJECT_BUILDER_BRAND } from './constant
 // logical / symbolic / inferential), and three injectable operators (Evaluator /
 // Transformer / Aggregator). Nothing mutates its inputs; every result is a fresh
 // object carrying `success`, a human-readable `trace`, and `errors`. Types are
-// the source of truth (AGENTS §2); every discriminant names its axis, never
-// `kind` / `type` (AGENTS §4.4): `reasoning` splits definitions and results,
-// `form` splits expression nodes, `origin` splits factor sources.
+// the source of truth; every discriminant names its axis, never `kind` /
+// `type`: `reasoning` splits definitions and results, `form` splits expression
+// nodes, `origin` splits factor sources.
 
 // === Vocabulary
 
 /**
- * The four reasoning strategies — the axis a {@link Definition} /
+ * Names the four reasoning strategies — the axis a {@link Definition} /
  * {@link ReasonResult} discriminates on.
  *
  * @remarks
@@ -28,13 +28,13 @@ import type { DEFINITION_BUILDER_BRAND, SUBJECT_BUILDER_BRAND } from './constant
 export type Reasoning = 'quantitative' | 'logical' | 'symbolic' | 'inferential'
 
 /**
- * How a chaining reasoner walks its rules: `forward` (data-driven fixpoint) or
+ * Names how a chaining reasoner walks its rules: `forward` (data-driven fixpoint) or
  * `backward` (goal-driven proving).
  */
 export type ChainingStrategy = 'forward' | 'backward'
 
 /**
- * A math operation applied by the {@link TransformerInterface} and inside
+ * Names a math operation applied by the {@link TransformerInterface} and inside
  * {@link SymbolicExpression} trees.
  *
  * @remarks
@@ -57,7 +57,7 @@ export type MathOperation =
 	| 'abs'
 
 /**
- * How the {@link AggregatorInterface} reduces a list of numbers to one.
+ * Names how the {@link AggregatorInterface} reduces a list of numbers to one.
  *
  * @remarks
  * When weights apply: `sum` multiplies each value by its weight, `product`
@@ -67,7 +67,7 @@ export type MathOperation =
 export type Aggregation = 'sum' | 'product' | 'average' | 'minimum' | 'maximum'
 
 /**
- * The comparison a {@link Check} applies between a resolved subject field and
+ * Names the comparison a {@link Check} applies between a resolved subject field and
  * its expected value.
  *
  * @remarks
@@ -92,7 +92,7 @@ export type Comparison =
 	| 'outside'
 
 /**
- * A logical connective inside a compound {@link Expression}.
+ * Names a logical connective inside a compound {@link Expression}.
  *
  * @remarks
  * `not` reads only its first operand (empty operands are vacuously true);
@@ -102,7 +102,7 @@ export type Comparison =
 export type LogicalOperator = 'and' | 'or' | 'not' | 'implies' | 'xor'
 
 /**
- * The data record being reasoned about — a plain readonly bag of fields, read
+ * Represents the data record being reasoned about — a plain readonly bag of fields, read
  * by {@link FieldPath}.
  */
 export type Subject = Readonly<Record<string, unknown>>
@@ -110,8 +110,8 @@ export type Subject = Readonly<Record<string, unknown>>
 // === Checks, transforms & bounds
 
 /**
- * A single field predicate: resolve `field` from the subject and compare it to
- * `value` with `operator`.
+ * Represents a single field predicate: resolves `field` from the subject and compares it
+ * to `value` with `operator`.
  *
  * @remarks
  * `field` follows the {@link FieldPath} idiom — a string is ONE key (never
@@ -125,7 +125,7 @@ export interface Check {
 }
 
 /**
- * The outcome of one {@link Check} evaluation.
+ * Represents the outcome of one {@link Check} evaluation.
  *
  * @remarks
  * `actual` is the resolved subject value (possibly `undefined`); `error` is set
@@ -140,7 +140,7 @@ export interface CheckResult {
 }
 
 /**
- * One math step applied to a number by the {@link TransformerInterface}.
+ * Represents one math step applied to a number by the {@link TransformerInterface}.
  *
  * @remarks
  * The absent-`operand` default is operation-specific: `1` for `multiply` /
@@ -153,7 +153,7 @@ export interface Transform {
 }
 
 /**
- * An inclusive numeric clamp — either side may be absent (unbounded).
+ * Represents an inclusive numeric clamp — either side may be absent (unbounded).
  */
 export interface Bounds {
 	readonly minimum?: number
@@ -162,14 +162,14 @@ export interface Bounds {
 
 // === Quantitative definitions
 
-/** A factor source yielding a fixed number. */
+/** Represents a factor source yielding a fixed number. */
 export interface StaticSource {
 	readonly origin: 'static'
 	readonly value: number
 }
 
 /**
- * A factor source reading a subject field as a number.
+ * Represents a factor source reading a subject field as a number.
  *
  * @remarks
  * The field is coerced with the contracts `parseNumber` — a finite number
@@ -183,7 +183,7 @@ export interface FieldSource {
 }
 
 /**
- * A factor source mapping a subject field through a lookup table.
+ * Represents a factor source mapping a subject field through a lookup table.
  *
  * @remarks
  * A missing or `null` field takes the factor's `fallback` directly (never the
@@ -198,7 +198,7 @@ export interface LookupSource {
 }
 
 /**
- * A factor source banding a numeric subject field through ordered ranges.
+ * Represents a factor source banding a numeric subject field through ordered ranges.
  *
  * @remarks
  * Ranges are scanned in order and the FIRST match wins. A range without
@@ -211,17 +211,17 @@ export interface RangeSource {
 	readonly ranges: readonly FactorRange[]
 }
 
-/** The four factor sources, discriminated by `origin`. */
+/** Represents the four factor sources, discriminated by `origin`. */
 export type Source = StaticSource | FieldSource | LookupSource | RangeSource
 
-/** One band of a {@link RangeSource} — an optional inclusive bounds test and the value it yields. */
+/** Represents one band of a {@link RangeSource} — an optional inclusive bounds test and the value it yields. */
 export interface FactorRange {
 	readonly bounds?: Bounds
 	readonly value: number
 }
 
 /**
- * One scored input of a quantitative group.
+ * Represents one scored input of a quantitative group.
  *
  * @remarks
  * Evaluated as a pipeline: `checks` gate (ALL must be met) → `source` resolve
@@ -248,7 +248,7 @@ export interface Factor {
 }
 
 /**
- * A group of factors aggregated into one value.
+ * Represents a group of factors aggregated into one value.
  *
  * @remarks
  * The group value is `base` (default `0`) plus the aggregation of its APPLIED
@@ -271,7 +271,7 @@ export interface FactorGroup {
 }
 
 /**
- * A quantitative (factor-based numeric scoring) definition.
+ * Defines factor-based numeric scoring.
  *
  * @remarks
  * The final value is `base` (default `0`) plus the aggregation of the applied
@@ -292,24 +292,24 @@ export interface QuantitativeDefinition {
 
 // === Logical definitions
 
-/** A leaf boolean expression — one {@link Check} against the subject. */
+/** Represents a leaf boolean expression — one {@link Check} against the subject. */
 export interface Atom {
 	readonly form: 'atom'
 	readonly check: Check
 }
 
-/** A compound boolean expression — a {@link LogicalOperator} over nested operands. */
+/** Represents a compound boolean expression — a {@link LogicalOperator} over nested operands. */
 export interface Compound {
 	readonly form: 'compound'
 	readonly operator: LogicalOperator
 	readonly operands: readonly Expression[]
 }
 
-/** A boolean expression tree, discriminated by `form`. */
+/** Represents a boolean expression tree, discriminated by `form`. */
 export type Expression = Atom | Compound
 
 /**
- * One deduction rule: when ALL `premises` hold, the `conclusion`'s atoms are
+ * Represents one deduction rule: when ALL `premises` hold, the `conclusion`'s atoms are
  * asserted as derived facts.
  *
  * @remarks
@@ -329,7 +329,7 @@ export interface Rule {
 }
 
 /**
- * A logical (rule-based deduction) definition.
+ * Defines rule-based deduction.
  *
  * @remarks
  * `strategy` picks forward fixpoint chaining or backward goal-driven proving;
@@ -347,20 +347,20 @@ export interface LogicalDefinition {
 
 // === Symbolic definitions
 
-/** A symbolic expression leaf naming a variable. */
+/** Represents a symbolic expression leaf naming a variable. */
 export interface Variable {
 	readonly form: 'variable'
 	readonly name: string
 }
 
-/** A symbolic expression leaf holding a fixed number. */
+/** Represents a symbolic expression leaf holding a fixed number. */
 export interface Constant {
 	readonly form: 'constant'
 	readonly value: number
 }
 
 /**
- * A symbolic operation node.
+ * Represents a symbolic operation node.
  *
  * @remarks
  * `right` is absent for unary operators (`round` / `ceil` / `floor` / `abs`)
@@ -373,11 +373,11 @@ export interface Operation {
 	readonly right?: SymbolicExpression
 }
 
-/** An algebraic expression tree, discriminated by `form`. */
+/** Represents an algebraic expression tree, discriminated by `form`. */
 export type SymbolicExpression = Variable | Constant | Operation
 
 /**
- * One equation `left = right`, solved for the `target` variable.
+ * Represents one equation `left = right`, solved for the `target` variable.
  *
  * @remarks
  * When `target` is unbound and appears on exactly one side, it is isolated
@@ -394,7 +394,7 @@ export interface Equation {
 }
 
 /**
- * A symbolic (equation-solving) definition.
+ * Defines equation-solving.
  *
  * @remarks
  * `variables` seeds the bindings; numeric subject fields OVERRIDE same-named
@@ -415,7 +415,7 @@ export interface SymbolicDefinition {
 // === Inferential definitions
 
 /**
- * One fact: a `predicate` over positional `terms`.
+ * Represents one fact: a `predicate` over positional `terms`.
  *
  * @remarks
  * A string term starting with `?` is a unification variable (the prefix is
@@ -430,7 +430,7 @@ export interface Fact {
 }
 
 /**
- * One inference rule: when every premise pattern unifies against known facts
+ * Represents one inference rule: when every premise pattern unifies against known facts
  * (with consistent variable bindings), the instantiated `conclusion` is
  * derived.
  *
@@ -450,7 +450,7 @@ export interface Inference {
 }
 
 /**
- * An inferential (fact-derivation) definition.
+ * Defines fact-derivation.
  *
  * @remarks
  * `facts` is the base knowledge; scalar subject fields are additionally
@@ -469,7 +469,7 @@ export interface InferentialDefinition {
 	readonly depth?: number
 }
 
-/** Any reasoning definition, discriminated by `reasoning`. */
+/** Represents any reasoning definition, discriminated by `reasoning`. */
 export type Definition =
 	| QuantitativeDefinition
 	| LogicalDefinition
@@ -479,7 +479,7 @@ export type Definition =
 // === Results
 
 /**
- * One factor's evaluation outcome.
+ * Represents one factor's evaluation outcome.
  *
  * @remarks
  * `raw` is the resolved source value before transforms / clamping (absent when
@@ -496,7 +496,7 @@ export interface FactorResult {
 }
 
 /**
- * One group's evaluation outcome — its clamped value and the per-factor
+ * Represents one group's evaluation outcome — its clamped value and the per-factor
  * results (disabled factors omitted entirely).
  *
  * @remarks
@@ -513,7 +513,7 @@ export interface GroupResult {
 }
 
 /**
- * The outcome of quantitative reasoning.
+ * Represents the outcome of quantitative reasoning.
  *
  * @remarks
  * `count` tallies the applied groups. `success` is `false` whenever any error
@@ -531,7 +531,7 @@ export interface QuantitativeResult {
 }
 
 /**
- * One rule's evaluation outcome.
+ * Represents one rule's evaluation outcome.
  *
  * @remarks
  * `applied` and `conclusion` are always equal — both mean "all premises held".
@@ -545,7 +545,7 @@ export interface RuleResult {
 }
 
 /**
- * The outcome of logical reasoning.
+ * Represents the outcome of logical reasoning.
  *
  * @remarks
  * `conclusion` is the LAST evaluated rule's conclusion (`false` when no rule
@@ -563,7 +563,7 @@ export interface LogicalResult {
 }
 
 /**
- * The outcome of symbolic reasoning — final bindings keyed by each equation's
+ * Represents the outcome of symbolic reasoning — final bindings keyed by each equation's
  * `target` (a failed equation's target still appears when bound elsewhere).
  */
 export interface SymbolicResult {
@@ -575,7 +575,7 @@ export interface SymbolicResult {
 }
 
 /**
- * One node of a backward-chaining proof tree.
+ * Represents one node of a backward-chaining proof tree.
  *
  * @remarks
  * `fact` is the proved fact's / goal's id; `inference` is set when the node was
@@ -591,7 +591,7 @@ export interface ProofNode {
 }
 
 /**
- * The outcome of inferential reasoning.
+ * Represents the outcome of inferential reasoning.
  *
  * @remarks
  * `derived` lists the newly derived facts (deriving nothing is still success);
@@ -607,11 +607,11 @@ export interface InferentialResult {
 	readonly errors: readonly string[]
 }
 
-/** Any reasoning result, discriminated by `reasoning`. */
+/** Represents any reasoning result, discriminated by `reasoning`. */
 export type ReasonResult = QuantitativeResult | LogicalResult | SymbolicResult | InferentialResult
 
 /**
- * The outcome of validating a definition — hard `errors` (definition unusable)
+ * Represents the outcome of validating a definition — hard `errors` (definition unusable)
  * and soft `warnings` (suspicious but runnable). `valid` is `true` exactly when
  * `errors` is empty.
  *
@@ -632,7 +632,7 @@ export interface ReasonValidationResult {
 // === Operator options
 
 /**
- * Options for `createEvaluator` / the `Evaluator` constructor.
+ * Configures `createEvaluator` / the `Evaluator` constructor.
  *
  * @remarks
  * `id` — the evaluator's identity string (defaults to `EVALUATOR_ID`).
@@ -642,7 +642,7 @@ export interface EvaluatorOptions {
 }
 
 /**
- * Options for `createTransformer` / the `Transformer` constructor.
+ * Configures `createTransformer` / the `Transformer` constructor.
  *
  * @remarks
  * `id` — the transformer's identity string (defaults to `TRANSFORMER_ID`).
@@ -652,7 +652,7 @@ export interface TransformerOptions {
 }
 
 /**
- * Options for `createAggregator` / the `Aggregator` constructor.
+ * Configures `createAggregator` / the `Aggregator` constructor.
  *
  * @remarks
  * `id` — the aggregator's identity string (defaults to `AGGREGATOR_ID`).
@@ -664,7 +664,7 @@ export interface AggregatorOptions {
 // === Reasoner options
 
 /**
- * Options for `createQuantitativeReasoner` / the `QuantitativeReasoner`
+ * Configures `createQuantitativeReasoner` / the `QuantitativeReasoner`
  * constructor.
  *
  * @remarks
@@ -680,7 +680,7 @@ export interface QuantitativeReasonerOptions {
 }
 
 /**
- * Options for `createLogicalReasoner` / the `LogicalReasoner` constructor.
+ * Configures `createLogicalReasoner` / the `LogicalReasoner` constructor.
  *
  * @remarks
  * `id` — the reasoner's identity string (defaults to `LOGICAL_ID`).
@@ -693,7 +693,7 @@ export interface LogicalReasonerOptions {
 }
 
 /**
- * Options for `createSymbolicReasoner` / the `SymbolicReasoner` constructor.
+ * Configures `createSymbolicReasoner` / the `SymbolicReasoner` constructor.
  *
  * @remarks
  * `id` — the reasoner's identity string (defaults to `SYMBOLIC_ID`).
@@ -703,7 +703,7 @@ export interface SymbolicReasonerOptions {
 }
 
 /**
- * Options for `createInferentialReasoner` / the `InferentialReasoner`
+ * Configures `createInferentialReasoner` / the `InferentialReasoner`
  * constructor.
  *
  * @remarks
@@ -761,7 +761,7 @@ export interface AggregatorInterface {
 }
 
 /**
- * A reasoning strategy adapter — one per {@link Reasoning}.
+ * Declares a reasoning strategy adapter — one per {@link Reasoning}.
  *
  * @remarks
  * `reason` throws a `ReasonError` (`MISMATCH`) when handed a definition of a
@@ -780,21 +780,33 @@ export interface ReasonerInterface {
 }
 
 /**
- * A machine-readable `ReasonError` code.
+ * Names a machine-readable `ReasonError` code.
  *
  * @remarks
  * `MISSING` — no reasoner registered for the definition's reasoning.
  * `INVALID` — pre-run validation failed (`validate: true`). `MISMATCH` — a
- * reasoner was handed a definition of a different reasoning. `DESTROYED` — the
- * orchestrator was used after `destroy()`. `TARGET` — a locator id names no
- * element that exists in the collection it addresses: an optional `target` id
- * passed to `appendById` / `prependById` (and the per-kind `append*` /
- * `prepend*` helpers built on them) that names no existing element.
- */
-export type ReasonErrorCode = 'MISSING' | 'INVALID' | 'MISMATCH' | 'DESTROYED' | 'TARGET'
-
-/**
- * The push observation surface of a {@link ReasonInterface} (AGENTS §13).
+ * cross-reasoning definition handed to a reasoner or to a
+ * {@link DefinitionBuilderInterface}'s `merge`, a `clear` key that is not
+ * clearable for the builder's reasoning, or a write to a
+ * {@link SubjectBuilderInterface}'s immutable `id`. `DESTROYED` — any use of a
+ * destroyed orchestrator, builder, or manager. `TARGET` — any locator id
+ * naming no existing element: the optional `target` id passed to `appendById` /
+ * `prependById` (and the per-kind `append*` / `prepend*` helpers built on
+ * them), or the required `groupId` every {@link FactorManagerInterface} verb
+ * threads. `OPERATOR` — a math operator outside the accepted vocabulary: one
+ * the {@link MathOperation} union does not name, or one outside the invertible
+ * subset the symbolic isolation step can undo.
+ */
+export type ReasonErrorCode =
+	| 'MISSING'
+	| 'INVALID'
+	| 'MISMATCH'
+	| 'DESTROYED'
+	| 'TARGET'
+	| 'OPERATOR'
+
+/**
+ * Represents the push observation surface of a {@link ReasonInterface}.
  *
  * @remarks
  * `register` fires when a reasoner is registered (carrying its reasoning);
@@ -805,18 +817,18 @@ export type ReasonErrorCode = 'MISSING' | 'INVALID' | 'MISMATCH' | 'DESTROYED' |
  * listener routes to the `error` OPTION handler, never onto this map.
  */
 export type ReasonEventMap = {
-	/** A reasoner was registered — carries its reasoning. */
+	/** Fires when a reasoner is registered — carries its reasoning. */
 	readonly register: readonly [reasoning: Reasoning]
-	/** A reasoning run succeeded — carries the produced result. */
+	/** Fires when a reasoning run succeeds — carries the produced result. */
 	readonly reason: readonly [result: ReasonResult]
-	/** A reasoner threw — carries the raw thrown value. */
+	/** Fires when a reasoner throws — carries the raw thrown value. */
 	readonly error: readonly [error: unknown]
-	/** The orchestrator was destroyed. */
+	/** Fires when the orchestrator is destroyed. */
 	readonly destroy: readonly []
 }
 
 /**
- * Options for `createReason` / the `Reason` constructor.
+ * Configures `createReason` / the `Reason` constructor.
  *
  * @remarks
  * `reasoners` — the initial registry (a later entry of the same reasoning
@@ -824,8 +836,7 @@ export type ReasonEventMap = {
  * throw is rethrown after the `error` emit; when `false` it becomes a failure
  * result. `validate` — when `true`, every `reason` call validates the
  * definition first and throws `INVALID` on failure (default `false`). `on` —
- * initial event listeners (AGENTS §8). `error` — the emitter's listener-error
- * handler (AGENTS §13).
+ * initial event listeners. `error` — the emitter's listener-error handler.
  */
 export interface ReasonOptions {
 	readonly reasoners?: readonly ReasonerInterface[]
@@ -836,7 +847,7 @@ export interface ReasonOptions {
 }
 
 /**
- * The reasoning orchestrator — a thin router over registered
+ * Declares the reasoning orchestrator — a thin router over registered
  * {@link ReasonerInterface}s.
  *
  * @remarks
@@ -851,7 +862,7 @@ export interface ReasonOptions {
  */
 export interface ReasonInterface {
 	readonly emitter: EmitterInterface<ReasonEventMap>
-	// Array overload first (AGENTS §9) so a list resolves to the batch form.
+	// Array overload first so a list resolves to the batch form.
 	reason(subjects: readonly Subject[], definition: Definition): readonly ReasonResult[]
 	reason(subject: Subject, definition: Definition): ReasonResult
 	register(reasoner: ReasonerInterface): void
@@ -864,9 +875,9 @@ export interface ReasonInterface {
 
 // === Definitions & subjects capability layer — entity managers
 //
-// The seven `DefinitionBuilder` manager contracts (AGENTS §4.2.2 / §4.5 /
-// §9.1): each is a SELF-OWNING manager (taverna `InstructionManager`-shaped) —
-// it OWNS its collection as private copy-on-write state, OWNS its own
+// The seven `DefinitionBuilder` manager contracts: each is a SELF-OWNING
+// manager (taverna `InstructionManager`-shaped) — it OWNS its collection as
+// private copy-on-write state, OWNS its own
 // {@link EmitterInterface} over its own verb-named event map, and takes its own
 // options record (a seed collection + `on` / `error`). Managers are KIND-FREE:
 // a `DefinitionBuilder` composes all seven regardless of `reasoning`, and an
@@ -876,12 +887,12 @@ export interface ReasonInterface {
 // collection-level pure helpers and emits through the manager's OWN emitter;
 // the accessors are pure reads and do NOT emit. `destroy()` is idempotent and
 // tears the emitter down LAST; any call after it throws
-// `ReasonError('DESTROYED', …)`. The write-only `collection` setter is the
-// owning builder's bulk re-seat channel (used by `merge`) — it replaces the
-// whole collection in one silent assignment (no per-element events).
+// `ReasonError('DESTROYED', …)`. `seat` is the owning builder's bulk re-seat
+// channel (used by `merge`) — it replaces the whole collection in one silent
+// call (no per-element events).
 
 /**
- * The {@link DefinitionBuilderInterface} manager over a quantitative
+ * Declares the {@link DefinitionBuilderInterface} manager over a quantitative
  * definition's `groups` — a self-owning, kind-free collection manager.
  *
  * @remarks
@@ -891,37 +902,36 @@ export interface ReasonInterface {
  */
 export interface GroupManagerInterface {
 	readonly emitter: EmitterInterface<GroupManagerEventMap>
-	set collection(value: readonly FactorGroup[])
 	group(id: string): FactorGroup | undefined
 	groups(): readonly FactorGroup[]
 	append(group: FactorGroup, target?: string): void
 	prepend(group: FactorGroup, target?: string): void
 	replace(group: FactorGroup): void
 	remove(id: string): void
+	seat(items: readonly FactorGroup[]): void
 	destroy(): void
 }
 
-/** The push observation surface of a {@link GroupManagerInterface} (AGENTS §13). */
+/** Represents the push observation surface of a {@link GroupManagerInterface}. */
 export type GroupManagerEventMap = {
-	/** A group was appended — carries its id. */
+	/** Fires when a group is appended — carries its id. */
 	readonly append: readonly [id: string]
-	/** A group was prepended — carries its id. */
+	/** Fires when a group is prepended — carries its id. */
 	readonly prepend: readonly [id: string]
-	/** A group was replaced in place — carries its id. */
+	/** Fires when a group is replaced in place — carries its id. */
 	readonly replace: readonly [id: string]
-	/** A group was removed — carries its id. */
+	/** Fires when a group is removed — carries its id. */
 	readonly remove: readonly [id: string]
-	/** The manager was destroyed. */
+	/** Fires when the manager is destroyed. */
 	readonly destroy: readonly []
 }
 
 /**
- * Options for `createGroupManager` / the `GroupManager` constructor.
+ * Configures `createGroupManager` / the `GroupManager` constructor.
  *
  * @remarks
  * `groups` — the initial collection (defaults to empty). `on` — initial event
- * listeners (AGENTS §8). `error` — the emitter's listener-error handler
- * (AGENTS §13).
+ * listeners. `error` — the emitter's listener-error handler.
  */
 export interface GroupManagerOptions {
 	readonly groups?: readonly FactorGroup[]
@@ -930,7 +940,7 @@ export interface GroupManagerOptions {
 }
 
 /**
- * The {@link DefinitionBuilderInterface} manager over a `FactorGroup`'s
+ * Declares the {@link DefinitionBuilderInterface} manager over a `FactorGroup`'s
  * `factors`, threaded through the required `groupId` locator (a factor lives
  * inside its group).
  *
@@ -955,27 +965,27 @@ export interface FactorManagerInterface {
 	destroy(): void
 }
 
-/** The push observation surface of a {@link FactorManagerInterface} (AGENTS §13). */
+/** Represents the push observation surface of a {@link FactorManagerInterface}. */
 export type FactorManagerEventMap = {
-	/** A factor was appended — carries its id. */
+	/** Fires when a factor is appended — carries its id. */
 	readonly append: readonly [id: string]
-	/** A factor was prepended — carries its id. */
+	/** Fires when a factor is prepended — carries its id. */
 	readonly prepend: readonly [id: string]
-	/** A factor was replaced in place — carries its id. */
+	/** Fires when a factor is replaced in place — carries its id. */
 	readonly replace: readonly [id: string]
-	/** A factor was removed — carries its id. */
+	/** Fires when a factor is removed — carries its id. */
 	readonly remove: readonly [id: string]
-	/** The manager was destroyed. */
+	/** Fires when the manager is destroyed. */
 	readonly destroy: readonly []
 }
 
 /**
- * Options for `createFactorManager` / the `FactorManager` constructor.
+ * Configures `createFactorManager` / the `FactorManager` constructor.
  *
  * @remarks
  * The sibling `GroupManagerInterface` reference is a constructor argument, not
- * an option. `on` — initial event listeners (AGENTS §8). `error` — the
- * emitter's listener-error handler (AGENTS §13).
+ * an option. `on` — initial event listeners. `error` — the
+ * emitter's listener-error handler.
  */
 export interface FactorManagerOptions {
 	readonly on?: EmitterHooks<FactorManagerEventMap>
@@ -983,7 +993,7 @@ export interface FactorManagerOptions {
 }
 
 /**
- * The {@link DefinitionBuilderInterface} manager over a logical definition's
+ * Declares the {@link DefinitionBuilderInterface} manager over a logical definition's
  * `rules` — a self-owning, kind-free collection manager.
  *
  * @remarks
@@ -993,37 +1003,36 @@ export interface FactorManagerOptions {
  */
 export interface RuleManagerInterface {
 	readonly emitter: EmitterInterface<RuleManagerEventMap>
-	set collection(value: readonly Rule[])
 	rule(id: string): Rule | undefined
 	rules(): readonly Rule[]
 	append(rule: Rule, target?: string): void
 	prepend(rule: Rule, target?: string): void
 	replace(rule: Rule): void
 	remove(id: string): void
+	seat(items: readonly Rule[]): void
 	destroy(): void
 }
 
-/** The push observation surface of a {@link RuleManagerInterface} (AGENTS §13). */
+/** Represents the push observation surface of a {@link RuleManagerInterface}. */
 export type RuleManagerEventMap = {
-	/** A rule was appended — carries its id. */
+	/** Fires when a rule is appended — carries its id. */
 	readonly append: readonly [id: string]
-	/** A rule was prepended — carries its id. */
+	/** Fires when a rule is prepended — carries its id. */
 	readonly prepend: readonly [id: string]
-	/** A rule was replaced in place — carries its id. */
+	/** Fires when a rule is replaced in place — carries its id. */
 	readonly replace: readonly [id: string]
-	/** A rule was removed — carries its id. */
+	/** Fires when a rule is removed — carries its id. */
 	readonly remove: readonly [id: string]
-	/** The manager was destroyed. */
+	/** Fires when the manager is destroyed. */
 	readonly destroy: readonly []
 }
 
 /**
- * Options for `createRuleManager` / the `RuleManager` constructor.
+ * Configures `createRuleManager` / the `RuleManager` constructor.
  *
  * @remarks
  * `rules` — the initial collection (defaults to empty). `on` — initial event
- * listeners (AGENTS §8). `error` — the emitter's listener-error handler
- * (AGENTS §13).
+ * listeners. `error` — the emitter's listener-error handler.
  */
 export interface RuleManagerOptions {
 	readonly rules?: readonly Rule[]
@@ -1032,7 +1041,7 @@ export interface RuleManagerOptions {
 }
 
 /**
- * The {@link DefinitionBuilderInterface} manager over a symbolic definition's
+ * Declares the {@link DefinitionBuilderInterface} manager over a symbolic definition's
  * `equations` — a self-owning, kind-free collection manager.
  *
  * @remarks
@@ -1041,37 +1050,36 @@ export interface RuleManagerOptions {
  */
 export interface EquationManagerInterface {
 	readonly emitter: EmitterInterface<EquationManagerEventMap>
-	set collection(value: readonly Equation[])
 	equation(id: string): Equation | undefined
 	equations(): readonly Equation[]
 	append(equation: Equation, target?: string): void
 	prepend(equation: Equation, target?: string): void
 	replace(equation: Equation): void
 	remove(id: string): void
+	seat(items: readonly Equation[]): void
 	destroy(): void
 }
 
-/** The push observation surface of an {@link EquationManagerInterface} (AGENTS §13). */
+/** Represents the push observation surface of an {@link EquationManagerInterface}. */
 export type EquationManagerEventMap = {
-	/** An equation was appended — carries its id. */
+	/** Fires when an equation is appended — carries its id. */
 	readonly append: readonly [id: string]
-	/** An equation was prepended — carries its id. */
+	/** Fires when an equation is prepended — carries its id. */
 	readonly prepend: readonly [id: string]
-	/** An equation was replaced in place — carries its id. */
+	/** Fires when an equation is replaced in place — carries its id. */
 	readonly replace: readonly [id: string]
-	/** An equation was removed — carries its id. */
+	/** Fires when an equation is removed — carries its id. */
 	readonly remove: readonly [id: string]
-	/** The manager was destroyed. */
+	/** Fires when the manager is destroyed. */
 	readonly destroy: readonly []
 }
 
 /**
- * Options for `createEquationManager` / the `EquationManager` constructor.
+ * Configures `createEquationManager` / the `EquationManager` constructor.
  *
  * @remarks
  * `equations` — the initial collection (defaults to empty). `on` — initial
- * event listeners (AGENTS §8). `error` — the emitter's listener-error handler
- * (AGENTS §13).
+ * event listeners. `error` — the emitter's listener-error handler.
  */
 export interface EquationManagerOptions {
 	readonly equations?: readonly Equation[]
@@ -1080,42 +1088,41 @@ export interface EquationManagerOptions {
 }
 
 /**
- * The {@link DefinitionBuilderInterface} manager over an inferential
+ * Declares the {@link DefinitionBuilderInterface} manager over an inferential
  * definition's `facts` — a self-owning, kind-free collection manager.
  */
 export interface FactManagerInterface {
 	readonly emitter: EmitterInterface<FactManagerEventMap>
-	set collection(value: readonly Fact[])
 	fact(id: string): Fact | undefined
 	facts(): readonly Fact[]
 	append(fact: Fact, target?: string): void
 	prepend(fact: Fact, target?: string): void
 	replace(fact: Fact): void
 	remove(id: string): void
+	seat(items: readonly Fact[]): void
 	destroy(): void
 }
 
-/** The push observation surface of a {@link FactManagerInterface} (AGENTS §13). */
+/** Represents the push observation surface of a {@link FactManagerInterface}. */
 export type FactManagerEventMap = {
-	/** A fact was appended — carries its id. */
+	/** Fires when a fact is appended — carries its id. */
 	readonly append: readonly [id: string]
-	/** A fact was prepended — carries its id. */
+	/** Fires when a fact is prepended — carries its id. */
 	readonly prepend: readonly [id: string]
-	/** A fact was replaced in place — carries its id. */
+	/** Fires when a fact is replaced in place — carries its id. */
 	readonly replace: readonly [id: string]
-	/** A fact was removed — carries its id. */
+	/** Fires when a fact is removed — carries its id. */
 	readonly remove: readonly [id: string]
-	/** The manager was destroyed. */
+	/** Fires when the manager is destroyed. */
 	readonly destroy: readonly []
 }
 
 /**
- * Options for `createFactManager` / the `FactManager` constructor.
+ * Configures `createFactManager` / the `FactManager` constructor.
  *
  * @remarks
  * `facts` — the initial collection (defaults to empty). `on` — initial event
- * listeners (AGENTS §8). `error` — the emitter's listener-error handler
- * (AGENTS §13).
+ * listeners. `error` — the emitter's listener-error handler.
  */
 export interface FactManagerOptions {
 	readonly facts?: readonly Fact[]
@@ -1124,7 +1131,7 @@ export interface FactManagerOptions {
 }
 
 /**
- * The {@link DefinitionBuilderInterface} manager over an inferential
+ * Declares the {@link DefinitionBuilderInterface} manager over an inferential
  * definition's `inferences` — a self-owning, kind-free collection manager.
  *
  * @remarks
@@ -1133,37 +1140,36 @@ export interface FactManagerOptions {
  */
 export interface InferenceManagerInterface {
 	readonly emitter: EmitterInterface<InferenceManagerEventMap>
-	set collection(value: readonly Inference[])
 	inference(id: string): Inference | undefined
 	inferences(): readonly Inference[]
 	append(inference: Inference, target?: string): void
 	prepend(inference: Inference, target?: string): void
 	replace(inference: Inference): void
 	remove(id: string): void
+	seat(items: readonly Inference[]): void
 	destroy(): void
 }
 
-/** The push observation surface of an {@link InferenceManagerInterface} (AGENTS §13). */
+/** Represents the push observation surface of an {@link InferenceManagerInterface}. */
 export type InferenceManagerEventMap = {
-	/** An inference was appended — carries its id. */
+	/** Fires when an inference is appended — carries its id. */
 	readonly append: readonly [id: string]
-	/** An inference was prepended — carries its id. */
+	/** Fires when an inference is prepended — carries its id. */
 	readonly prepend: readonly [id: string]
-	/** An inference was replaced in place — carries its id. */
+	/** Fires when an inference is replaced in place — carries its id. */
 	readonly replace: readonly [id: string]
-	/** An inference was removed — carries its id. */
+	/** Fires when an inference is removed — carries its id. */
 	readonly remove: readonly [id: string]
-	/** The manager was destroyed. */
+	/** Fires when the manager is destroyed. */
 	readonly destroy: readonly []
 }
 
 /**
- * Options for `createInferenceManager` / the `InferenceManager` constructor.
+ * Configures `createInferenceManager` / the `InferenceManager` constructor.
  *
  * @remarks
  * `inferences` — the initial collection (defaults to empty). `on` — initial
- * event listeners (AGENTS §8). `error` — the emitter's listener-error handler
- * (AGENTS §13).
+ * event listeners. `error` — the emitter's listener-error handler.
  */
 export interface InferenceManagerOptions {
 	readonly inferences?: readonly Inference[]
@@ -1172,44 +1178,42 @@ export interface InferenceManagerOptions {
 }
 
 /**
- * The {@link DefinitionBuilderInterface} manager over a symbolic definition's
+ * Declares the {@link DefinitionBuilderInterface} manager over a symbolic definition's
  * `variables` — a name-keyed unordered record, so `add` / `remove` are the
  * only write verbs (no placement). A self-owning, kind-free manager.
  */
 export interface VariableManagerInterface {
 	readonly emitter: EmitterInterface<VariableManagerEventMap>
-	set collection(value: Readonly<Record<string, number>>)
 	variable(name: string): number | undefined
 	variables(): Readonly<Record<string, number>>
 	add(name: string, value: number): void
 	remove(name: string): void
+	seat(variables: Readonly<Record<string, number>>): void
 	destroy(): void
 }
 
 /**
- * The push observation surface of a {@link VariableManagerInterface}
- * (AGENTS §13).
+ * Represents the push observation surface of a {@link VariableManagerInterface}.
  *
  * @remarks
  * `variables` is a name-keyed record with no placement, so the honest verbs
  * are `add` / `remove` — each carries the variable NAME.
  */
 export type VariableManagerEventMap = {
-	/** A variable was upserted — carries its name. */
+	/** Fires when a variable is upserted — carries its name. */
 	readonly add: readonly [name: string]
-	/** A variable was removed — carries its name. */
+	/** Fires when a variable is removed — carries its name. */
 	readonly remove: readonly [name: string]
-	/** The manager was destroyed. */
+	/** Fires when the manager is destroyed. */
 	readonly destroy: readonly []
 }
 
 /**
- * Options for `createVariableManager` / the `VariableManager` constructor.
+ * Configures `createVariableManager` / the `VariableManager` constructor.
  *
  * @remarks
  * `variables` — the initial record (defaults to empty). `on` — initial event
- * listeners (AGENTS §8). `error` — the emitter's listener-error handler
- * (AGENTS §13).
+ * listeners. `error` — the emitter's listener-error handler.
  */
 export interface VariableManagerOptions {
 	readonly variables?: Readonly<Record<string, number>>
@@ -1220,7 +1224,7 @@ export interface VariableManagerOptions {
 // === Definitions & subjects capability layer — entities
 
 /**
- * The scalar-only projection of each definition kind — the {@link DefinitionBuilderInterface}
+ * Represents the scalar-only projection of each definition kind — the {@link DefinitionBuilderInterface}
  * implementation's private envelope holds the non-collection fields; `build()` re-composes
  * the kind's collections from the managers' plural accessors.
  */
@@ -1231,8 +1235,60 @@ export type DefinitionEnvelope =
 	| Omit<InferentialDefinition, 'facts' | 'inferences'>
 
 /**
- * The push observation surface of a {@link DefinitionBuilderInterface}
- * (AGENTS §13) — the builder-level lifecycle events; per-element mutation
+ * Names the optional {@link QuantitativeDefinition} fields `clearQuantitativeDefinition`
+ * (and a quantitative {@link DefinitionBuilderInterface}'s `clear`) can delete.
+ */
+export type QuantitativeClearKey = 'description' | 'base' | 'bounds' | 'precision'
+
+/**
+ * Names the optional {@link LogicalDefinition} fields `clearLogicalDefinition` (and a
+ * logical {@link DefinitionBuilderInterface}'s `clear`) can delete.
+ */
+export type LogicalClearKey = 'description' | 'depth'
+
+/**
+ * Names the optional {@link SymbolicDefinition} fields `clearSymbolicDefinition` (and
+ * a symbolic {@link DefinitionBuilderInterface}'s `clear`) can delete.
+ */
+export type SymbolicClearKey = 'description' | 'precision'
+
+/**
+ * Names the optional {@link InferentialDefinition} fields
+ * `clearInferentialDefinition` (and an inferential
+ * {@link DefinitionBuilderInterface}'s `clear`) can delete.
+ */
+export type InferentialClearKey = 'description' | 'depth'
+
+/**
+ * Represents one chaining pass of the `LogicalReasoner` — the overall `conclusion` plus
+ * the per-rule results the pass produced.
+ *
+ * @remarks
+ * The shared return shape of the forward-fixpoint and backward-proving passes;
+ * `LogicalResult.count` is derived from `rules` rather than carried here.
+ */
+export interface LogicalChainingOutcome {
+	readonly conclusion: boolean
+	readonly rules: readonly RuleResult[]
+}
+
+/**
+ * Represents one chaining pass of the `InferentialReasoner` — the facts the pass derived
+ * plus the proof tree, when the pass produced one.
+ *
+ * @remarks
+ * The shared return shape of the forward-fixpoint and backward-proving passes;
+ * `proof` is produced only by the backward pass, and only when a conclusion was
+ * proved.
+ */
+export interface InferentialChainingOutcome {
+	readonly derived: readonly Fact[]
+	readonly proof?: ProofNode
+}
+
+/**
+ * Represents the push observation surface of a {@link DefinitionBuilderInterface} — the
+ * builder-level lifecycle events; per-element mutation
  * events live on the individual managers' own emitters.
  *
  * @remarks
@@ -1240,18 +1296,18 @@ export type DefinitionEnvelope =
  * key; `destroy` fires once on teardown.
  */
 export type DefinitionBuilderEventMap = {
-	/** The definition was reconciled with an incoming definition — carries the reasoning. */
+	/** Fires when the definition is reconciled with an incoming definition — carries the reasoning. */
 	readonly merge: readonly [reasoning: Reasoning]
-	/** An optional field was cleared — carries the field key. */
+	/** Fires when an optional field is cleared — carries the field key. */
 	readonly clear: readonly [key: string]
-	/** The entity was destroyed. */
+	/** Fires when the entity is destroyed. */
 	readonly destroy: readonly []
 }
 
 /**
- * A stateful workspace builder accumulating a {@link Definition} through seven
- * always-present self-owning manager properties, taverna `AgentContext`-shaped
- * (AGENTS §4.2.2): a private scalar envelope plus one manager per collection.
+ * Declares a stateful workspace builder accumulating a {@link Definition} through seven
+ * always-present self-owning manager properties, taverna `AgentContext`-shaped:
+ * a private scalar envelope plus one manager per collection.
  *
  * @remarks
  * `build()` is TOTAL, deterministic, and returns a FRESH plain
@@ -1261,7 +1317,7 @@ export type DefinitionBuilderEventMap = {
  * distributes incoming scalars into the envelope and collections into the
  * managers via the matching `merge*` helper (a cross-reasoning `incoming`
  * throws `ReasonError('MISMATCH', …)`). `clear(key)` is the uniform
- * optional-key selector (AGENTS §4.2.4) over the scalar envelope; a `key` that
+ * optional-key selector over the scalar envelope; a `key` that
  * is not a clearable optional field for the current kind throws
  * `ReasonError('MISMATCH', …, { key, reasoning })`. `destroy()` cascades to all
  * seven managers, emits `destroy`, then tears the builder emitter down LAST;
@@ -1288,14 +1344,14 @@ export interface DefinitionBuilderInterface {
 }
 
 /**
- * Options for `createDefinitionBuilder` / the `DefinitionBuilder` constructor.
+ * Configures `createDefinitionBuilder` / the `DefinitionBuilder` constructor.
  *
  * @remarks
  * `id` — overrides the seed definition's `id` (defaults to `seed.id`). Each of
  * the seven manager slots is BRING-YOUR-OWN — a supplied manager is reused,
  * else one is constructed and seeded from the seed's matching collection. `on`
- * — initial event listeners (AGENTS §8). `error` — the emitter's
- * listener-error handler (AGENTS §13).
+ * — initial event listeners. `error` — the emitter's
+ * listener-error handler.
  */
 export interface DefinitionBuilderOptions {
 	readonly id?: string
@@ -1311,35 +1367,35 @@ export interface DefinitionBuilderOptions {
 }
 
 /**
- * The push observation surface of a {@link SubjectBuilderInterface} (AGENTS
- * §13) — five verb-named events, no generic `change` / `status`.
+ * Represents the push observation surface of a {@link SubjectBuilderInterface} — five
+ * verb-named events, no generic `change` / `status`.
  */
 export type SubjectBuilderEventMap = {
-	/** A field was upserted — carries its key and new value. */
+	/** Fires when a field is upserted — carries its key and new value. */
 	readonly set: readonly [key: string, value: unknown]
-	/** A field was removed — carries its key. */
+	/** Fires when a field is removed — carries its key. */
 	readonly remove: readonly [key: string]
-	/** The subject was reconciled with an incoming subject — carries the incoming record. */
+	/** Fires when the subject is reconciled with an incoming subject — carries the incoming record. */
 	readonly merge: readonly [incoming: Subject]
-	/** Every non-id field was removed. */
+	/** Fires when every non-id field is removed. */
 	readonly clear: readonly []
-	/** The entity was destroyed. */
+	/** Fires when the entity is destroyed. */
 	readonly destroy: readonly []
 }
 
 /**
- * A stateful workspace builder accumulating a {@link Subject}, taverna
- * `Workspace`-shaped (AGENTS §4.2.2): a single flat collection, no managers.
+ * Declares a stateful workspace builder accumulating a {@link Subject}, taverna
+ * `Workspace`-shaped: a single flat collection, no managers.
  *
  * @remarks
  * `id` is OPTIONAL on the entity (`options?.id ?? seed.id`). When present,
  * the builder is id-ful — `build()`'s output carries that `id` and `clear()`
  * restores it. When absent, the builder is ANONYMOUS — `.id` is `undefined`,
  * `build()`'s output carries NO `id` key, and `clear()` empties the record
- * entirely. `field` / `fields` are the AGENTS §9.1 accessor pair over
+ * entirely. `field` / `fields` are the singular / plural accessor pair over
  * TOP-LEVEL keys only. `set(key, value)` delegates to `assignField`;
  * `set('id', …)` throws — id is immutable via the entity, id-ful or
- * anonymous alike. `remove` is the AGENTS §9.2 batch overload, array form
+ * anonymous alike. `remove` is the batch overload, array form
  * declared FIRST. `merge(incoming)` delegates to `mergeSubjects`
  * (incoming-wins, base `id` preserved — plain {@link Subject} data only).
  * `clear()` removes every non-id field. `repeat(count)` returns `count`
@@ -1357,7 +1413,7 @@ export interface SubjectBuilderInterface {
 	field(key: string): unknown
 	fields(): Subject
 	set(key: string, value: unknown): void
-	// Array overload first (AGENTS §9) so a list resolves to the batch form.
+	// Array overload first so a list resolves to the batch form.
 	remove(keys: readonly string[]): boolean
 	remove(key: string): boolean
 	merge(incoming: Subject): void
@@ -1368,14 +1424,13 @@ export interface SubjectBuilderInterface {
 }
 
 /**
- * Options for `createSubjectBuilder` / the `SubjectBuilder` constructor.
+ * Configures `createSubjectBuilder` / the `SubjectBuilder` constructor.
  *
  * @remarks
  * `id` — overrides the seed subject's `id` (defaults to `seed.id`); OPTIONAL
  * — when neither `options.id` nor a string `seed.id` is present the builder
  * is ANONYMOUS (`.id` is `undefined`, `build()` emits no `id` key). `on` —
- * initial event listeners (AGENTS §8). `error` — the emitter's listener-error
- * handler (AGENTS §13).
+ * initial event listeners. `error` — the emitter's listener-error handler.
  */
 export interface SubjectBuilderOptions {
 	readonly id?: string
```
