# Report — P.1 `d7n-reason-prep`

Every item and every criterion closed. No deviation. Wall clock 2026-09-07T15:38:52Z →
2026-09-07T15:46:21Z in `/home/user/fleet/reason` (branch `claude/orkestrel-npm-audit-deps-14ibta`,
baseline tip `e019d0c`, clean at start). The `docs` worklist sits verbatim under criterion 4, at the
end of this report.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`, exit 0.

```text
0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 27 unchanged, 0 removed in ..
```

`git status --short` directly after, the P21 list exactly:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

```diff
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
 		}
@@
 			const names = guide
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

The import walk's `findMissing(names, surface)` at the `imports only real exports` case is unchanged:
both arguments were already strings. No other change to the suite.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` before the edits, exit 1. The files it named
and the diagnostic that sent each there:

| File | Diagnostic |
| ---- | ---------- |
| `tests/setup.ts` | `policy(no-malformed-summary)` at 32, 49, 64, 79, 96, 124, 138, 148, 158, 174, 199, 214 (voice and name), 228, 242, 266, 288 (voice and name), 308, 326, 350, 370, 373, 390 |
| `tests/src/core/reasoners/InferentialReasoner.test.ts` | `policy(no-banned-term)` at 956: `Replace just in this comment: delete.` |
| `src/core/types.ts` | `policy(no-banned-term)` at 851: `Replace in order to in this comment: to.` |
| `src/core/builders/managers/FactorManager.ts` | `policy(no-banned-term)` at 15: `Replace etc. in this comment: bound the list, or recast the sentence.` |
| `src/core/reasoners/SymbolicReasoner.ts` | `policy(no-banned-term)` at 165: `Replace e.g. in this comment: for example.` |
| `guides/reason.md` | prose sweep at 38 (`in order to (to)`) and 682 (`just (delete)`) |
| `README.md` | prose sweep at 55 (`in order to (to)`) |

No diagnostic named an off-limits file. The rewrites, before → after.

`policy(no-banned-term)`, one fenced pair per diagnostic:

```text
tests/src/core/reasoners/InferentialReasoner.test.ts:956
- // (base rule) and distance-2 (recursive rule reading the just-added distance-1
- // ancestors) — so completeness is reached in L-1 passes, not L, for a chain of L
- // edges.
+ // (base rule) and distance-2 (recursive rule reading the distance-1 ancestors that
+ // same pass added) — so completeness is reached in L-1 passes, not L, for a chain of
+ // L edges.

src/core/types.ts:851 (the ReasonInterface @remarks)
- * batch `reason` overload maps subjects in order to an equal-length result
+ * batch `reason` overload maps subjects in order onto an equal-length result

src/core/builders/managers/FactorManager.ts:15 (the @remarks)
- * factor-level pure helper ({@link appendFactor} etc.), and writes the updated
+ * factor-level pure helper ({@link appendFactor}, {@link prependFactor},
+ * {@link replaceFactor}, or {@link removeFactor}), and writes the updated

src/core/reasoners/SymbolicReasoner.ts:165
- // is non-finite: the pre-round value keeps its exact rendering (e.g. a
- // non-numeric "[object Object]"), a round-overflow renders the ±Infinity.
+ // is non-finite: the pre-round value keeps its exact rendering (for example
+ // a non-numeric "[object Object]"), a round-overflow renders the ±Infinity.
```

`policy(no-malformed-summary)` in `tests/setup.ts`. Each pair is one diagnostic's description
paragraph, first sentence only; every fact the paragraph carried is kept, and the symbol is out of
the first sentence wherever the `name` message named it:

```text
32 expectQuantitative
- Narrow a `reason()` return to a `QuantitativeResult` — throws on a batch array or a result of another reasoning.
+ Narrows a `reason()` return to a `QuantitativeResult` — throws on a batch array or a result of another reasoning.

49 expectLogical
- Narrow a `reason()` return to a `LogicalResult` — throws on a batch array or a result of another reasoning (the {@link expectQuantitative} sibling).
+ Narrows a `reason()` return to a `LogicalResult` — throws on a batch array or a result of another reasoning (the {@link expectQuantitative} sibling).

64 expectSymbolic
- Narrow a `reason()` return to a `SymbolicResult` — throws on a batch array or a result of another reasoning (the {@link expectQuantitative} sibling).
+ Narrows a `reason()` return to a `SymbolicResult` — throws on a batch array or a result of another reasoning (the {@link expectQuantitative} sibling).

79 expectInferential
- Narrow a `reason()` return to an `InferentialResult` — throws on a batch array or a result of another reasoning (the {@link expectQuantitative} sibling).
+ Narrows a `reason()` return to an `InferentialResult` — throws on a batch array or a result of another reasoning (the {@link expectQuantitative} sibling).

96 deepFreeze
- Recursively `Object.freeze` a value and every nested plain object/array it reaches — the deep-frozen-input stress the no-mutation reasoner tests share, …
+ Freezes a value and every nested plain object/array it reaches, recursively — the deep-frozen-input stress the no-mutation reasoner tests share, …

124 BASIC_SUBJECT
- The recurring flat `Subject` of the evaluator / reasoner tests — one field of each scalar kind …
+ Holds the recurring flat `Subject` of the evaluator / reasoner tests — one field of each scalar kind …

138 NESTED_SUBJECT
- The recurring nested `Subject` — two levels of nesting for the `FieldPath` array-descent cases …
+ Holds the recurring nested `Subject` — two levels of nesting for the `FieldPath` array-descent cases …

148 DRIVER_SUBJECT
- The recurring driver-scoring `Subject` — the multi-factor scenario the evaluator and quantitative-reasoner tests share.
+ Holds the recurring driver-scoring `Subject` — the multi-factor scenario the evaluator and quantitative-reasoner tests share.

158 buildStaticDefinition
- Build a minimal runnable `QuantitativeDefinition` — one sum group holding one static factor, …
+ Builds a minimal runnable `QuantitativeDefinition` — one sum group holding one static factor, …

174 createThrowingReasoner
- Create a REAL `ReasonerInterface` whose `reason` always throws `new Error(message)` — …
+ Creates a REAL `ReasonerInterface` whose `reason` always throws `new Error(message)` — …

199 runTwice
- Run `scenario` twice against fresh state and return both outcomes — the shared form of the byte-identical `twice(scenario)` closure …
+ Runs `scenario` twice against fresh state and returns both outcomes — the shared form of the byte-identical `twice(scenario)` closure …

214 sequence (voice and name)
- A `count`-long ascending integer range starting at `start` — the shared
- numeric-sequence fixture the aggregation / scale tests build inputs from,
- replacing repeated `Array.from({ length: n }, (_, i) => i)`.
- an empty range for `count <= 0`.
+ Returns a `count`-long ascending integer range starting at `start` — the
+ shared numeric-range fixture the aggregation / scale tests build inputs from,
+ replacing repeated `Array.from({ length: n }, (_, i) => i)`. Produces an empty
+ range for `count <= 0`.

228 repeatValue
- An array of `count` copies of `value` — the uniform-input fill the aggregator / transformer scale tests exercise.
+ Returns an array of `count` copies of `value` — the uniform-input fill the aggregator / transformer scale tests exercise.

242 EXTREME_NUMBERS
- The curated JavaScript numeric edge values the numeric-quirk tests probe — signed zero, …
+ Lists the curated JavaScript numeric edge values the numeric-quirk tests probe — signed zero, …

266 TRICKY_KEYS
- The curated adversarial / unicode object keys the field-path, subject-key, id, and lookup-table tests probe — …
+ Lists the curated adversarial / unicode object keys the field-path, subject-key, id, and lookup-table tests probe — …

288 sparse (voice and name)
- A `length`-long array with REAL holes everywhere except the given
- `(index, value)` pairs — the sparse-array fixture the array-handling tests
- probe. Built from `new Array(length)`, so unfilled slots are
+ Returns a `length`-long array with REAL holes everywhere except the given
+ `(index, value)` pairs — the hole-bearing array fixture the array-handling
+ tests probe. Built from `new Array(length)`, so unfilled slots are

308 deepCompound
- Nest `leaf` inside `depth` layers of a single-operand `'and'` compound — …
+ Nests `leaf` inside `depth` layers of a single-operand `'and'` compound — …

326 deepAddition
- Left-nest `depth` layers of an `'add'` operation around `leaf`, each layer adding `step` — …
+ Nests `depth` left-leaning layers of an `'add'` operation around `leaf`, each layer adding `step` — …

350 INTEGER_KEY_SUBJECT
- A frozen `Subject` whose integer-like keys are authored deliberately OUT of order — …
+ Holds a frozen `Subject` whose integer-like keys are authored deliberately OUT of order — …

370 ADVERSARIAL_SYMBOL_KEY
- /** A symbol key used by {@link ADVERSARIAL_VALUE_SUBJECT} — invisible to `Object.keys`. */
+ /** Provides the symbol key {@link ADVERSARIAL_VALUE_SUBJECT} carries — invisible to `Object.keys`. */

373 ADVERSARIAL_VALUE_SUBJECT
- A frozen `Subject` exercising the adversarial value shapes `subjectToFacts` must classify correctly: …
+ Holds a frozen `Subject` exercising the adversarial value shapes `subjectToFacts` must classify correctly: …

390 buildSubjects
- `count` subjects `{ id: "s0", value: 0 }, { id: "s1", value: 1 }, …` built
- from {@link sequence} — the batch-of-subjects fixture the scale /
+ Builds `count` subjects `{ id: "s0", value: 0 }, { id: "s1", value: 1 }, …`
+ from {@link sequence} — the batch-of-subjects fixture the scale /
```

The `name` message at 214 named `sequence`, which the first sentence carried as
`numeric-sequence fixture`; `numeric-range fixture` states the same fact without it, and the orphan
fragment `an empty range for count <= 0.` took the verb it was missing. The `name` message at 288
named `sparse`, which the first sentence carried as `sparse-array fixture`; `hole-bearing array
fixture` states the same fact, and the `@remarks` sentence after it still names the holes.

The verb openers were chosen against `POLICY_VOICE_PATTERN` (`/^[A-Z][a-z]*s$/u`) and
`POLICY_VOICE_STOPWORDS` in `configs/policy.ts`, so each opener matches the pattern and names no
stopword. No code token moved, nothing was renamed, and no assertion's value changed.

### The prose sweep

`npm run test:policy` after the oxlint fixes named the three lines the standing conditions predicted
and nothing else — `README.md` at 55, `guides/reason.md` at 38 and 682. `README.md` 55 and
`guides/reason.md` 38 carry the same sentence, where `in order` is the ordering sense and `to` opens
the next phrase:

```text
README.md:55, guides/reason.md:38
- the batch overload maps them in order to an equal-length result array.
+ the batch overload maps them in order onto an equal-length result array.

guides/reason.md:682
- but the float chain's accumulated binary error lands just under it, so `roundTo` rounds the wrong way:
+ but the float chain's accumulated binary error lands slightly under it, so `roundTo` rounds the wrong way:
```

The same sentence in the `src/core/types.ts` `@remarks` took the same recast, so the three read
alike.

Ancillary decisions recorded: `in order onto` over a longer recast, because it keeps the ordering
fact in place and holds the `README.md` line inside its wrap; `slightly` over deleting `just`,
because the sentence's point is that the error lands barely below the boundary; `hole-bearing array`
and `numeric-range` as the two `name`-diagnostic replacements.

## Item 4 — the bump

```diff
 {
 	"name": "@orkestrel/reason",
-	"version": "0.0.9",
+	"version": "0.0.10",
```

`package-lock.json` untouched. The `package.json` diff also carries the `docs` script row `repair`
wrote.

## Criteria

### 1. `git status --short` and the files item 3 edited

```text
 M .oxlintrc.json
 M README.md
 M configs/helpers.ts
 M configs/policy.ts
 M guides/reason.md
 M package.json
 M src/core/builders/managers/FactorManager.ts
 M src/core/reasoners/SymbolicReasoner.ts
 M src/core/types.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/src/core/reasoners/InferentialReasoner.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

That is the P21 repair list, plus `tests/guides.test.ts` (item 2), plus the files item 3 edited
(`tests/setup.ts`, `tests/src/core/reasoners/InferentialReasoner.test.ts`, `src/core/types.ts`,
`src/core/builders/managers/FactorManager.ts`, `src/core/reasoners/SymbolicReasoner.ts`,
`guides/reason.md`, `README.md`), and nothing else. `package.json` carries both `repair`'s `docs`
row and item 4's bump. Diffstat:

```text
 .oxlintrc.json                                     |   4 +-
 README.md                                          |   2 +-
 configs/helpers.ts                                 |  15 +-
 configs/policy.ts                                  | 534 ++++++++++++++++---
 guides/reason.md                                   |   4 +-
 package.json                                       |   5 +-
 src/core/builders/managers/FactorManager.ts        |   3 +-
 src/core/reasoners/SymbolicReasoner.ts             |   4 +-
 src/core/types.ts                                  |   2 +-
 tests/config.test.ts                               | 431 +++++++++++++++-
 tests/guides.test.ts                               |  36 +-
 tests/policy.test.ts                               | 128 ++++-
 tests/setup.ts                                     |  60 +--
 tests/setupPolicy.ts                               | 572 ++++++++++++++++++---
 .../src/core/reasoners/InferentialReasoner.test.ts |   6 +-
 tsconfig.json                                      |   3 +-
 16 files changed, 1584 insertions(+), 225 deletions(-)
```

### 2. `format:check`, `oxlint`, `check`

`npm run format` ran before the gate. `npm run format:check`, exit 0:

```text
All matched files use the correct format.
Finished in 6096ms on 80 files using 4 threads.
```

`npx oxlint --config .oxlintrc.json --deny-warnings .`, exit 0 — it prints nothing on a clean run
(captured to a file: zero bytes).

`npm run check`, exit 0:

```text
> @orkestrel/reason@0.0.10 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

### 3. `test:guides`, `test:policy`, `test:config`

`npm run test:guides`, exit 0:

```text
 Test Files  1 passed (1)
      Tests  94 passed (94)
   Duration  3.77s (transform 559ms, setup 585ms, import 2.13s, tests 867ms, environment 0ms)
```

`npm run test:policy`, exit 0:

```text
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.23s (transform 521ms, setup 467ms, import 166ms, tests 402ms, environment 0ms)
```

`npm run test:config`, exit 0:

```text
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
   Duration  5.72s (transform 865ms, setup 519ms, import 782ms, tests 4.20s, environment 0ms)
```

### 4. `npm run docs`

Exit 1, `rows read: 1, disagreements found: 372` — the converge unit's worklist, unchanged in shape
from P21's reading. Verbatim, every line it printed:

```text

> @orkestrel/reason@0.0.10 docs
> node --experimental-strip-types scripts/docs.ts

guides/reason.md function createReason: guide "Create a `ReasonInterface` — the orchestrator — seeded from `ReasonOptions.reasoners`." source "Creates the reasoning orchestrator."
guides/reason.md function createQuantitativeReasoner: guide "Create the factor-scoring reasoner (injectable `evaluator` / `transformer` / `aggregator`)." source "Creates the quantitative reasoner — factor-based numeric scoring."
guides/reason.md function createLogicalReasoner: guide "Create the rule-deduction reasoner (injectable `evaluator`)." source "Creates the logical reasoner — rule-based deduction with forward / backward chaining."
guides/reason.md function createSymbolicReasoner: guide "Create the equation-solving reasoner." source "Creates the symbolic reasoner — algebraic equation solving by variable isolation."
guides/reason.md function createInferentialReasoner: guide "Create the fact-derivation reasoner." source "Creates the inferential reasoner — fact derivation with unification variables and proof trees."
guides/reason.md function createEvaluator: guide "Create an `EvaluatorInterface` — the check evaluator operator." source "Creates a check evaluator."
guides/reason.md function createTransformer: guide "Create a `TransformerInterface` — the math-transform operator." source "Creates a math transformer."
guides/reason.md function createAggregator: guide "Create an `AggregatorInterface` — the list-reduction operator." source "Creates a number aggregator."
guides/reason.md function createDefinitionBuilder: guide "Create a `DefinitionBuilderInterface` — the stateful definition builder — seeded from a `Definition` (`id` default: `seed.id`)." source "Creates a `DefinitionBuilder` — a stateful workspace builder accumulating a `Definition` through the `groups`, `factors`, `rules`, `equations`, `variables`, `facts`, and `inferences` self-owning manager properties."
guides/reason.md function createSubjectBuilder: guide "Create a `SubjectBuilderInterface` — the stateful subject builder — seeded from a `Subject` (`id` default: `seed.id`; OPTIONAL — an anonymous builder when neither is a string)." source "Creates a `SubjectBuilder` — a stateful workspace builder accumulating a `Subject`."
guides/reason.md function createGroupManager: guide "Create a `GroupManagerInterface` — a self-owning, kind-free manager over a quantitative definition's `groups`." source "Creates a `GroupManager` — a self-owning manager over a quantitative definition's `groups`."
guides/reason.md function createFactorManager: guide "Create a `FactorManagerInterface` — the divergent factors manager, threaded through an injected sibling `GroupManagerInterface`." source "Creates a `FactorManager` — the divergent manager over a group's `factors`, threaded through a required `groupId` locator."
guides/reason.md function createRuleManager: guide "Create a `RuleManagerInterface` — a self-owning, kind-free manager over a logical definition's `rules`." source "Creates a `RuleManager` — a self-owning manager over a logical definition's `rules`."
guides/reason.md function createEquationManager: guide "Create an `EquationManagerInterface` — a self-owning, kind-free manager over a symbolic definition's `equations`." source "Creates an `EquationManager` — a self-owning manager over a symbolic definition's `equations`."
guides/reason.md function createVariableManager: guide "Create a `VariableManagerInterface` — a self-owning, kind-free manager over a symbolic definition's `variables` (`add` / `remove` only)." source "Creates a `VariableManager` — a self-owning manager over a symbolic definition's `variables` (a name-keyed record; `add` / `remove` only)."
guides/reason.md function createFactManager: guide "Create a `FactManagerInterface` — a self-owning, kind-free manager over an inferential definition's `facts`." source "Creates a `FactManager` — a self-owning manager over an inferential definition's `facts`."
guides/reason.md function createInferenceManager: guide "Create an `InferenceManagerInterface` — a self-owning, kind-free manager over an inferential definition's `inferences`." source "Creates an `InferenceManager` — a self-owning manager over an inferential definition's `inferences`."
guides/reason.md class Reason: guide "The orchestrator — a registry of reasoners, dispatch by `reasoning`, a typed `emitter`, `bail` policy." source "Implements the reasoning orchestrator — a thin router over registered `ReasonerInterface`s."
guides/reason.md class QuantitativeReasoner: guide "Factor-based numeric scoring: per-factor pipeline → group aggregation → definition aggregation." source "Performs factor-based numeric scoring."
guides/reason.md class LogicalReasoner: guide "Rule-based boolean deduction: forward fixpoint chaining or backward goal-driven proving over `Expression`s." source "Deduces booleans from rules with forward or backward chaining."
guides/reason.md class SymbolicReasoner: guide "Algebraic equation solving: bind variables (subject overrides), isolate each `target`, substitute forward." source "Solves algebraic equations by variable isolation."
guides/reason.md class InferentialReasoner: guide "Fact derivation by positional unification: forward derives every fact, backward proves one with a proof tree." source "Derives facts with unification variables and proof trees."
guides/reason.md class Evaluator: guide "Evaluates `Check`s against subjects — total (an unknown operator is a `CheckResult.error`, no throw)." source "Evaluates `Check`s against subjects — the shared predicate engine of the quantitative and logical reasoners."
guides/reason.md class Transformer: guide "Applies math `Transform`s — per-operation operand defaults, unknown operation is a no-op." source "Applies math `Transform`s to numbers — the quantitative reasoner's per-factor pipeline stage."
guides/reason.md class Aggregator: guide "Reduces number lists per `Aggregation` — optional weights, fixed empty-input identities, never throws." source "Reduces number lists to one number per `Aggregation` — the quantitative reasoner's group and definition combiner."
guides/reason.md class DefinitionBuilder: guide "The `DEFINITION_BUILDER_BRAND`-carrying stateful builder — `groups` / `factors` / `rules` / `equations` / `variables` / `facts` / `inferences` self-owning manager properties, `build` / `merge` / `clear` / `destroy`." source "Implements a stateful workspace builder accumulating a `Definition` through always-present self-owning manager properties: a private SCALAR ENVELOPE (reasoning / id / name plus the kind's scalars) composed with each collection read from its manager."
guides/reason.md class GroupManager: guide "The self-owning, kind-free manager over a quantitative definition's `groups`." source "Implements the `GroupManagerInterface` — a self-owning, kind-free manager over a quantitative definition's `groups`."
guides/reason.md class FactorManager: guide "The divergent manager over a group's `factors`, `groupId`-threaded (holds no state; reads/writes through the sibling `GroupManager`)." source "Implements the `FactorManagerInterface` — the sole DIVERGENT manager: factors nest inside groups, so it holds NO collection state of its own and threads a required `groupId` locator."
guides/reason.md class RuleManager: guide "The self-owning, kind-free manager over a logical definition's `rules`." source "Implements the `RuleManagerInterface` — a self-owning, kind-free manager over a logical definition's `rules`."
guides/reason.md class EquationManager: guide "The self-owning, kind-free manager over a symbolic definition's `equations`." source "Implements the `EquationManagerInterface` — a self-owning, kind-free manager over a symbolic definition's `equations`."
guides/reason.md class VariableManager: guide "The self-owning, kind-free manager over a symbolic definition's `variables` (name-keyed record) — `add` / `remove` only, no placement." source "Implements the `VariableManagerInterface` — a self-owning, kind-free manager over a symbolic definition's `variables`, a name-keyed unordered record."
guides/reason.md class FactManager: guide "The self-owning, kind-free manager over an inferential definition's `facts`." source "Implements the `FactManagerInterface` — a self-owning, kind-free manager over an inferential definition's `facts`."
guides/reason.md class InferenceManager: guide "The self-owning, kind-free manager over an inferential definition's `inferences`." source "Implements the `InferenceManagerInterface` — a self-owning, kind-free manager over an inferential definition's `inferences`."
guides/reason.md class SubjectBuilder: guide "The `SUBJECT_BUILDER_BRAND`-carrying stateful builder — a flat single-collection workspace — `field` / `fields` + `set` / `remove` (no argument / one key / key list) / `merge` / `clear` / `repeat` / `build` / `destroy`." source "Implements a stateful workspace builder accumulating a `Subject` — one flat key-value collection, no managers."
guides/reason.md function createCheck: guide absent source "Creates a `Check` — one field predicate."
guides/reason.md function createAtom: guide absent source "Creates an atom `Expression` — a leaf wrapping one `Check`."
guides/reason.md function createCompound: guide absent source "Creates a compound `Expression` — a logical connective over nested operands."
guides/reason.md function createRule: guide absent source "Creates a `Rule` — premises and a conclusion."
guides/reason.md function createTransform: guide absent source "Creates a `Transform` — one math step."
guides/reason.md function createBounds: guide absent source "Creates a `Bounds` — an inclusive numeric clamp."
guides/reason.md function createVariable: guide absent source "Creates a variable `SymbolicExpression` leaf."
guides/reason.md function createConstant: guide absent source "Creates a constant `SymbolicExpression` leaf."
guides/reason.md function createOperation: guide absent source "Creates an operation `SymbolicExpression` node."
guides/reason.md function createEquation: guide absent source "Creates an `Equation` — `left = right`, solved for `target`."
guides/reason.md function createFact: guide absent source "Creates a `Fact` — a predicate over positional terms."
guides/reason.md function createInference: guide absent source "Creates an `Inference` — premise patterns and a conclusion pattern."
guides/reason.md function createStaticSource: guide absent source "Creates a static `Source` — a fixed number."
guides/reason.md function createFieldSource: guide absent source "Creates a field `Source` — a subject field read as a number."
guides/reason.md function createLookupSource: guide absent source "Creates a lookup `Source` — a subject field mapped through a table."
guides/reason.md function createRangeSource: guide absent source "Creates a range `Source` — a numeric subject field banded through ordered ranges (first match wins)."
guides/reason.md function createStaticFactor: guide absent source "Creates a `Factor` over a static `Source`."
guides/reason.md function createFieldFactor: guide absent source "Creates a `Factor` over a field `Source`."
guides/reason.md function createLookupFactor: guide absent source "Creates a `Factor` over a lookup `Source`."
guides/reason.md function createRangeFactor: guide absent source "Creates a `Factor` over a range `Source`."
guides/reason.md function createFactorGroup: guide absent source "Creates a `FactorGroup`."
guides/reason.md function createQuantitativeDefinition: guide absent source "Creates a `QuantitativeDefinition`."
guides/reason.md function createLogicalDefinition: guide absent source "Creates a `LogicalDefinition`."
guides/reason.md function createSymbolicDefinition: guide absent source "Creates a `SymbolicDefinition`."
guides/reason.md function createInferentialDefinition: guide absent source "Creates an `InferentialDefinition`."
guides/reason.md function formatField: guide "Format a `FieldPath` for display — the string key itself, or the array segments joined with `.`." source "Formats a `FieldPath` for display — the single string key itself, or the array segments joined with `.`."
guides/reason.md function clamp: guide "Clamp a number to inclusive `Bounds` (either side optional; no bounds → unchanged)." source "Clamps a number to inclusive `Bounds`."
guides/reason.md function roundTo: guide "Round to a fixed count of decimal places (`Math.round` semantics; extreme precisions pass the value through)." source "Rounds a number to a fixed count of decimal places."
guides/reason.md function matchesBounds: guide "Whether a value is a number inside an inclusive `[minimum, maximum]` array range — the `between` / `outside` range test." source "Checks whether a value falls inside an inclusive range expressed as an array."
guides/reason.md function emptyAggregate: guide "The empty-input identity of one `Aggregation` (`sum` / `average` → `0`, `product` → `1`, `minimum` / `maximum` → `NaN`)." source "Returns the empty-input identity of one `Aggregation`."
guides/reason.md function resolveSource: guide "Resolve one factor `Source` against a subject, taking the `fallback` when it does not resolve." source "Resolves one `Source` against a subject, falling back when it cannot."
guides/reason.md function equalValues: guide "SameValueZero equality (`NaN` equals `NaN`, `+0` equals `-0`) — the chaining reasoners' derivation equality." source "Determines whether two values are SameValueZero-equal — strict `===` with `NaN` equal to itself (and, unlike `Object.is`, `+0` equal to `-0`)."
guides/reason.md function sortByPriority: guide "Stable ascending copy-sort by `priority ?? DEFAULT_PRIORITY` — the shared factor / rule evaluation order." source "Sorts items ascending by `priority ?? DEFAULT_PRIORITY` — a stable copy sort."
guides/reason.md function findDuplicates: guide "The ids appearing more than once in an id-carrying list (once each) — behind `validate`'s uniqueness warnings." source "Collects the ids that appear MORE THAN ONCE in an id-carrying list — each duplicated id reported once, in first-occurrence order."
guides/reason.md function factToArityKey: guide "A fact's predicate+arity bucket key, length-prefixed so the delimiter cannot be forged." source "Derives a fact's predicate+arity bucket key — length-prefixed so the delimiter cannot be forged."
guides/reason.md function indexByArity: guide "Bucket facts by predicate+arity (append order kept) — the inferential same-predicate-and-arity join index." source "Buckets facts by predicate+arity, preserving append order within each bucket."
guides/reason.md function termToKey: guide "One fact term's dedup key — typeof-prefixed SameValueZero for primitives, reference identity for objects." source "Derives one fact term's contribution to a dedup key — reference identity for non-null objects / functions, a SameValueZero value string for primitives."
guides/reason.md function factToKey: guide "A fact's canonical dedup key — predicate + arity + terms, length-prefixed so no delimiter is forgeable (confidence excluded)." source "Derives a fact's canonical dedup key — predicate + arity + per-term SameValueZero identity (confidence is NOT part of it)."
guides/reason.md function matchFacts: guide "Bidirectional positional unification of a pattern fact against a candidate — bindings or `undefined`." source "Unifies a pattern fact positionally against a candidate fact — returning the variable bindings on success, `undefined` on mismatch."
guides/reason.md function instantiateFact: guide "Substitute a fact's bound `'?'`-variables — a fresh fact, unbound terms passed through." source "Substitutes a fact's bound `'?'`-variables with their values — a fresh fact with unbound terms passed through unchanged."
guides/reason.md function subjectToFacts: guide "Project a subject's scalar fields into `has(key, value)` base facts plus their trace lines (skips `id` / null / objects)." source "Projects a subject's scalar fields into `has(key, value)` base facts — the inferential reasoner's subject-injection step."
guides/reason.md function computePremiseConfidence: guide "The product of each premise's FIRST matching fact's confidence, read from a predicate+arity index." source "Computes the confidence a set of matched premises contributes to a derived fact — the product of each premise's FIRST matching fact's confidence."
guides/reason.md function containsVariable: guide "Whether a `SymbolicExpression` holds an UNBOUND occurrence of a target variable (a pre-bound target does not count)." source "Determines whether a symbolic expression contains an UNBOUND occurrence of a target variable."
guides/reason.md function invertLeft: guide "Invert `x op right = value` for the LEFT operand — zero-division inverse is `NaN`, a non-invertible operator throws `OPERATOR`." source "Inverts a `x op right = value` step, solving for the LEFT operand `x`."
guides/reason.md function invertRight: guide "Invert `left op x = value` for the RIGHT operand — zero-division inverse is `NaN`, a non-invertible operator throws `OPERATOR`." source "Inverts a `left op x = value` step, solving for the RIGHT operand `x`."
guides/reason.md function applyOperation: guide "Apply one `MathOperation` to evaluated operands — divide-by-zero `NaN`, an unknown operator throws `OPERATOR`." source "Applies one binary/unary math operation to already-evaluated operands."
guides/reason.md function resolveOperand: guide "The effective right operand of a `MathOperation` — the supplied one, else its identity-preserving default (`1` or `0`)." source "Resolves the effective right operand of a math operation — the supplied `operand`, or the operation's own identity-preserving default when absent."
guides/reason.md function extractAtoms: guide "Every atom leaf of an expression tree, depth-first left-to-right — the shared conclusion/merge atom-walk." source "Returns every atom leaf of an expression tree, depth-first, left-to-right."
guides/reason.md function extractConclusions: guide "Flatten a logical conclusion into its `formatField(field) = value` pairs — connectives ignored, later operands win." source "Flattens a logical conclusion expression into its asserted `field = value` pairs — connectives IGNORED."
guides/reason.md function findOverlayMismatches: guide "The array-path conclusion overlay keys also read by an array-path premise elsewhere — the `validate` cross-rule mismatch warning." source "Collects the flattened overlay keys written through an array path and also read through an array path."
guides/reason.md function findUnboundVariables: guide "An inference conclusion's `?variables` absent from every premise's terms — the `validate` unbound-variable warning." source "Collects the `'?'`-prefixed conclusion variables no premise binds."
guides/reason.md function buildErrorResult: guide "The empty, type-shaped failure `ReasonResult` for a definition's reasoning — the orchestrator's `bail: false` fallback." source "Builds the empty, type-shaped failure `ReasonResult` matching a definition's reasoning."
guides/reason.md function appendById: guide "Insert an id-carrying item into a collection — dedup-then-insert at the end, or immediately after `target`." source "Inserts `item` into an id-keyed collection, deduping any existing element sharing its id, then placing it at the END (or immediately AFTER `target`)."
guides/reason.md function prependById: guide "Insert an id-carrying item into a collection — dedup-then-insert at the start, or immediately before `target`." source "Inserts `item` into an id-keyed collection, deduping any existing element sharing its id, then placing it at the START (or immediately BEFORE `target`)."
guides/reason.md function replaceById: guide "Swap the same-id item IN PLACE, preserving position (appends when absent)." source "Swaps the element sharing `item.id` IN PLACE, preserving its position."
guides/reason.md function removeById: guide "Filter every same-id item out of a collection (no-op when absent)." source "Filters every element sharing `id` out of an id-keyed collection."
guides/reason.md function mergeById: guide "Reconcile two id-keyed collections — incoming order first, then base-only survivors, deduped." source "Reconciles two id-keyed collections — an incoming-order upsert with base-only survivors appended after."
guides/reason.md function definitionToEnvelope: guide "Project a `Definition` to its scalar envelope — the kind's collections drop out." source "Projects a `Definition` to its scalar envelope — the kind's collections drop out."
guides/reason.md function appendGroup: guide "Insert a `FactorGroup` into a `QuantitativeDefinition.groups`." source "Inserts `group` into a `QuantitativeDefinition`'s `groups` — dedup-then- insert at the end, or immediately after `target`."
guides/reason.md function prependGroup: guide "Insert a `FactorGroup` at the start of `QuantitativeDefinition.groups`." source "Inserts `group` into a `QuantitativeDefinition`'s `groups` — dedup-then- insert at the start, or immediately before `target`."
guides/reason.md function replaceGroup: guide "Swap a same-id `FactorGroup` in place." source "Swaps the group sharing `group.id` in a `QuantitativeDefinition` IN PLACE, preserving its position (appends when absent)."
guides/reason.md function removeGroup: guide "Remove a `FactorGroup` by id." source "Removes every group sharing `id` from a `QuantitativeDefinition` (no-op when absent)."
guides/reason.md function appendFactor: guide "Insert a `Factor` into a `FactorGroup.factors`." source "Inserts `factor` into a `FactorGroup`'s `factors` — dedup-then-insert at the end, or immediately after `target`."
guides/reason.md function prependFactor: guide "Insert a `Factor` at the start of a `FactorGroup.factors`." source "Inserts `factor` into a `FactorGroup`'s `factors` — dedup-then-insert at the start, or immediately before `target`."
guides/reason.md function replaceFactor: guide "Swap a same-id `Factor` in place." source "Swaps the factor sharing `factor.id` in a `FactorGroup` IN PLACE, preserving its position (appends when absent)."
guides/reason.md function removeFactor: guide "Remove a `Factor` by id." source "Removes every factor sharing `id` from a `FactorGroup` (no-op when absent)."
guides/reason.md function appendRule: guide "Insert a `Rule` into a `LogicalDefinition.rules` (the new last rule becomes the forward conclusion, absent `target`)." source "Inserts a rule into a `LogicalDefinition`'s `rules` — dedup-then-insert at the end, or immediately after `target`."
guides/reason.md function prependRule: guide "Insert a `Rule` at the start of `LogicalDefinition.rules`." source "Inserts a rule into a `LogicalDefinition`'s `rules` — dedup-then-insert at the start, or immediately before `target`."
guides/reason.md function replaceRule: guide "Swap a same-id `Rule` in place." source "Swaps the rule sharing `rule.id` in a `LogicalDefinition` IN PLACE, preserving its position (appends when absent)."
guides/reason.md function removeRule: guide "Remove a `Rule` by id." source "Removes every rule sharing `id` from a `LogicalDefinition` (no-op when absent)."
guides/reason.md function appendEquation: guide "Insert an `Equation` into a `SymbolicDefinition.equations` (solve order is load-bearing)." source "Inserts an equation into a `SymbolicDefinition`'s `equations` — dedup- then-insert at the end, or immediately after `target`."
guides/reason.md function prependEquation: guide "Insert an `Equation` at the start of `SymbolicDefinition.equations`." source "Inserts an equation into a `SymbolicDefinition`'s `equations` — dedup- then-insert at the start, or immediately before `target`."
guides/reason.md function replaceEquation: guide "Swap a same-id `Equation` in place." source "Swaps the equation sharing `equation.id` in a `SymbolicDefinition` IN PLACE, preserving its position (appends when absent)."
guides/reason.md function removeEquation: guide "Remove an `Equation` by id." source "Removes every equation sharing `id` from a `SymbolicDefinition` (no-op when absent)."
guides/reason.md function addVariable: guide "Upsert one entry of `SymbolicDefinition.variables`." source "Upserts one entry of a `SymbolicDefinition`'s `variables`."
guides/reason.md function removeVariable: guide "Delete one entry of `SymbolicDefinition.variables` (key omitted, never `undefined`)." source "Removes one entry of a `SymbolicDefinition`'s `variables`."
guides/reason.md function appendFact: guide "Insert a `Fact` into an `InferentialDefinition.facts`." source "Inserts a fact into an `InferentialDefinition`'s `facts` — dedup-then- insert at the end, or immediately after `target`."
guides/reason.md function prependFact: guide "Insert a `Fact` at the start of an `InferentialDefinition.facts`." source "Inserts a fact into an `InferentialDefinition`'s `facts` — dedup-then- insert at the start, or immediately before `target`."
guides/reason.md function replaceFact: guide "Swap a same-id `Fact` in place." source "Swaps the fact sharing `fact.id` in an `InferentialDefinition` IN PLACE, preserving its position (appends when absent)."
guides/reason.md function removeFact: guide "Remove a `Fact` by id." source "Removes every fact sharing `id` from an `InferentialDefinition` (no-op when absent)."
guides/reason.md function appendInference: guide "Insert an `Inference` into an `InferentialDefinition.inferences` (declaration order is load-bearing)." source "Inserts an inference into an `InferentialDefinition`'s `inferences` — dedup-then-insert at the end, or immediately after `target`."
guides/reason.md function prependInference: guide "Insert an `Inference` at the start of an `InferentialDefinition.inferences`." source "Inserts an inference into an `InferentialDefinition`'s `inferences` — dedup-then-insert at the start, or immediately before `target`."
guides/reason.md function replaceInference: guide "Swap a same-id `Inference` in place." source "Swaps the inference sharing `inference.id` in an `InferentialDefinition` IN PLACE, preserving its position (appends when absent)."
guides/reason.md function removeInference: guide "Remove an `Inference` by id." source "Removes every inference sharing `id` from an `InferentialDefinition` (no-op when absent)."
guides/reason.md function mergeQuantitativeDefinition: guide "Whole-definition reconciliation onto `base.id` — id-keyed `groups`, factors recursing one level, incoming-wins scalars." source "Reconciles two `QuantitativeDefinition`s onto `base`'s id."
guides/reason.md function mergeLogicalDefinition: guide "Whole-definition reconciliation onto `base.id` — id-keyed `rules`, incoming-wins scalars." source "Reconciles two `LogicalDefinition`s onto `base`'s id."
guides/reason.md function mergeSymbolicDefinition: guide "Whole-definition reconciliation onto `base.id` — id-keyed `equations`, spread-merged `variables`, incoming-wins scalars." source "Reconciles two `SymbolicDefinition`s onto `base`'s id."
guides/reason.md function mergeInferentialDefinition: guide "Whole-definition reconciliation onto `base.id` — id-keyed `inferences` / `facts`, incoming-wins scalars." source "Reconciles two `InferentialDefinition`s onto `base`'s id."
guides/reason.md function clearQuantitativeDefinition: guide "Delete one optional `QuantitativeDefinition` field (`description` / `base` / `bounds` / `precision`)." source "Deletes one optional field of a `QuantitativeDefinition`."
guides/reason.md function clearLogicalDefinition: guide "Delete one optional `LogicalDefinition` field (`description` / `depth`)." source "Deletes one optional field of a `LogicalDefinition`."
guides/reason.md function clearSymbolicDefinition: guide "Delete one optional `SymbolicDefinition` field (`description` / `precision`)." source "Deletes one optional field of a `SymbolicDefinition`."
guides/reason.md function clearInferentialDefinition: guide "Delete one optional `InferentialDefinition` field (`description` / `depth`)." source "Deletes one optional field of an `InferentialDefinition`."
guides/reason.md function parseDefinition: guide "Parse JSON into a `Definition` — `parseJSONAs` composed with `isDefinition`, failing safe to `undefined`." source "Parses a JSON string into a `Definition`, failing safe to `undefined`."
guides/reason.md function assignField: guide "Upsert one `Subject` field — copy-on-write spread (id-agnostic)." source "Upserts one field of a `Subject` — copy-on-write spread."
guides/reason.md function removeField: guide "Delete one `Subject` field (key omitted, never `undefined`)." source "Deletes one field of a `Subject` — destructure-rest omit."
guides/reason.md function mergeSubjects: guide "Reconcile two `Subject`s — incoming-wins spread, base `id` preserved when present." source "Reconciles two `Subject`s — incoming-wins spread, with the base `id` preserved when present."
guides/reason.md function repeatSubject: guide "Produce `count` deterministic clones of a `Subject`, minting ``${baseId}-${index}`` ids when the base has a string id." source "Produces `count` deterministic clones of a `Subject`."
guides/reason.md const isReasoning: guide absent source "Determines whether a value is a `Reasoning` literal."
guides/reason.md const isChainingStrategy: guide absent source "Determines whether a value is a `ChainingStrategy` literal."
guides/reason.md const isMathOperation: guide absent source "Determines whether a value is a `MathOperation` literal."
guides/reason.md const isAggregation: guide absent source "Determines whether a value is an `Aggregation` literal."
guides/reason.md const isComparison: guide absent source "Determines whether a value is a `Comparison` literal."
guides/reason.md const isLogicalOperator: guide absent source "Determines whether a value is a `LogicalOperator` literal."
guides/reason.md const isFieldPath: guide absent source "Determines whether a value is a `FieldPath` — a single string key or an array of keys descending into nested objects."
guides/reason.md const isNumberRecord: guide absent source "Determines whether a value is a record whose every value is a finite number — the shape of a `LookupSource.table` and a `SymbolicDefinition.variables`."
guides/reason.md function isCheck: guide absent source "Determines whether a value is a `Check` — a field / operator / value predicate."
guides/reason.md function isTransform: guide absent source "Determines whether a value is a `Transform` — one math step."
guides/reason.md function isBounds: guide absent source "Determines whether a value is a `Bounds` — an inclusive numeric clamp."
guides/reason.md function isFactorRange: guide absent source "Determines whether a value is a `FactorRange` — one band of a range source."
guides/reason.md function isSource: guide absent source "Determines whether a value is a `Source` — any of the four factor sources, discriminated by `origin`."
guides/reason.md function isFactor: guide absent source "Determines whether a value is a `Factor` — one scored input of a quantitative group."
guides/reason.md function isFactorGroup: guide absent source "Determines whether a value is a `FactorGroup` — a group of factors aggregated into one value."
guides/reason.md function isExpression: guide absent source "Determines whether a value is an `Expression` — a boolean expression tree of atoms and compounds, discriminated by `form`."
guides/reason.md function isRule: guide absent source "Determines whether a value is a `Rule` — premises and a conclusion."
guides/reason.md function isSymbolicExpression: guide absent source "Determines whether a value is a `SymbolicExpression` — an algebraic expression tree of variables, constants, and operations, discriminated by `form`."
guides/reason.md function isEquation: guide absent source "Determines whether a value is an `Equation` — `left = right`, solved for `target`."
guides/reason.md function isFact: guide absent source "Determines whether a value is a `Fact` — a predicate over positional terms."
guides/reason.md function isInference: guide absent source "Determines whether a value is an `Inference` — premise patterns and a conclusion pattern."
guides/reason.md function isQuantitativeDefinition: guide absent source "Determines whether a value is a `QuantitativeDefinition`."
guides/reason.md function isLogicalDefinition: guide absent source "Determines whether a value is a `LogicalDefinition`."
guides/reason.md function isSymbolicDefinition: guide absent source "Determines whether a value is a `SymbolicDefinition`."
guides/reason.md function isInferentialDefinition: guide absent source "Determines whether a value is an `InferentialDefinition`."
guides/reason.md function isDefinition: guide absent source "Determines whether a value is a `Definition` — any of the four definition shapes, discriminated by `reasoning`."
guides/reason.md const isQuantitativeClearKey: guide absent source "Determines whether a value is a `QuantitativeClearKey` — an optional field `clearQuantitativeDefinition` can delete."
guides/reason.md const isLogicalClearKey: guide absent source "Determines whether a value is a `LogicalClearKey` — an optional field `clearLogicalDefinition` can delete."
guides/reason.md const isSymbolicClearKey: guide absent source "Determines whether a value is a `SymbolicClearKey` — an optional field `clearSymbolicDefinition` can delete."
guides/reason.md const isInferentialClearKey: guide absent source "Determines whether a value is an `InferentialClearKey` — an optional field `clearInferentialDefinition` can delete."
guides/reason.md function isResultFact: guide absent source "Determines whether a value is a result-side `Fact`."
guides/reason.md function isCheckResult: guide absent source "Determines whether a value is a `CheckResult`."
guides/reason.md function isFactorResult: guide absent source "Determines whether a value is a `FactorResult`."
guides/reason.md function isGroupResult: guide absent source "Determines whether a value is a `GroupResult`."
guides/reason.md function isRuleResult: guide absent source "Determines whether a value is a `RuleResult`."
guides/reason.md function isProofNode: guide absent source "Determines whether a value is a depth-bounded, acyclic `ProofNode` tree."
guides/reason.md function isQuantitativeResult: guide absent source "Determines whether a value is a `QuantitativeResult`."
guides/reason.md function isLogicalResult: guide absent source "Determines whether a value is a `LogicalResult`."
guides/reason.md function isSymbolicResult: guide absent source "Determines whether a value is a `SymbolicResult`."
guides/reason.md function isInferentialResult: guide absent source "Determines whether a value is an `InferentialResult`."
guides/reason.md function isReasonResult: guide absent source "Determines whether a value is any `ReasonResult` arm."
guides/reason.md function isReasonValidationResult: guide absent source "Determines whether a value is a `ReasonValidationResult`."
guides/reason.md function isDefinitionBuilder: guide absent source "Determines whether a value is a `DefinitionBuilder` ENTITY — the brand-guarded stateful workspace, not the plain `Definition` data union."
guides/reason.md function isSubjectBuilder: guide absent source "Determines whether a value is a `SubjectBuilder` ENTITY — the brand-guarded stateful workspace, not the plain `Subject` data record."
guides/reason.md class ReasonError: guide "Carries a `ReasonErrorCode` (`MISSING` / `INVALID` / `MISMATCH` / `DESTROYED` / `TARGET` / `OPERATOR`) + optional `context`." source "Represents an error thrown by the reasons layer."
guides/reason.md function isReasonError: guide "Narrow an unknown caught value to a `ReasonError`." source "Narrows an unknown caught value to a `ReasonError`."
guides/reason.md const DEFAULT_REASON_BAIL: guide "`true` — a reasoner throw is rethrown after the `error` emit (domain-qualified name — keeps the barrel collision-free as sibling modules add their own bail defaults)." source "Holds the default `bail` for the `Reason` orchestrator — a reasoner throw is rethrown after the `error` emit. Default: `true`."
guides/reason.md const DEFAULT_VALIDATE: guide "`false` — per-call validation is opt-in." source "Holds the default `validate` for the `Reason` orchestrator — per-call validation is skipped. Default: `false`."
guides/reason.md const DEFAULT_DEPTH: guide "`10` — the forward-iteration / backward-recursion cap of the chaining reasoners." source "Holds the default `depth` for chaining definitions — the forward-iteration / backward-recursion cap of the logical and inferential reasoners. Default: `10`."
guides/reason.md const DEFAULT_BASE: guide "`0` — added before aggregation at both group and definition level." source "Holds the default `base` added before aggregation, at both group and definition level. Default: `0`."
guides/reason.md const DEFAULT_PRECISION: guide "`4` — decimal places for quantitative values and symbolic solutions." source "Holds the default `precision` (decimal places) for quantitative values and symbolic solutions. Default: `4`."
guides/reason.md const DEFAULT_CONFIDENCE: guide "`1` — for facts, inferences, and injected subject facts." source "Holds the default `confidence` for facts, inferences, and injected subject facts. Default: `1`."
guides/reason.md const DEFAULT_WEIGHT: guide "`1` — per-factor weight at group aggregation." source "Holds the default factor `weight` at group aggregation. Default: `1`."
guides/reason.md const DEFAULT_PRIORITY: guide "`0` — factor / rule evaluation order (ascending, stable)." source "Holds the default factor / rule `priority` — evaluation order is ascending and stable. Default: `0`."
guides/reason.md const CONFIDENCE_PRECISION: guide "`4` — fixed rounding of derived-fact confidences (NOT per-definition overridable)." source "Holds the decimal places a derived fact's confidence is rounded to during forward inferential chaining."
guides/reason.md const INVERTIBLE_OPERATIONS: guide "The operations symbolic isolation can invert: `add` / `subtract` / `multiply` / `divide`." source "Lists the math operations the symbolic reasoner can invert while isolating a target variable — anything else (a `power`, an `abs`) fails the equation with a non-invertible error."
guides/reason.md const EVALUATOR_ID: guide "`'evaluator'` — the default `Evaluator` id." source "Names the default `id` for an `Evaluator`."
guides/reason.md const TRANSFORMER_ID: guide "`'transformer'` — the default `Transformer` id." source "Names the default `id` for a `Transformer`."
guides/reason.md const AGGREGATOR_ID: guide "`'aggregator'` — the default `Aggregator` id." source "Names the default `id` for an `Aggregator`."
guides/reason.md const QUANTITATIVE_ID: guide "`'quantitative'` — the default `QuantitativeReasoner` id." source "Names the default `id` for a `QuantitativeReasoner`."
guides/reason.md const LOGICAL_ID: guide "`'logical'` — the default `LogicalReasoner` id." source "Names the default `id` for a `LogicalReasoner`."
guides/reason.md const SYMBOLIC_ID: guide "`'symbolic'` — the default `SymbolicReasoner` id." source "Names the default `id` for a `SymbolicReasoner`."
guides/reason.md const INFERENTIAL_ID: guide "`'inferential'` — the default `InferentialReasoner` id." source "Names the default `id` for an `InferentialReasoner`."
guides/reason.md const DEFINITION_BUILDER_BRAND: guide "A `unique symbol` — the `DefinitionBuilder` builder brand key (`isDefinitionBuilder` reads it through `Reflect.get`)." source "Holds the `DefinitionBuilder` entity brand — a `unique symbol` key carrying `readonly true` on every `DefinitionBuilderInterface` instance."
guides/reason.md const SUBJECT_BUILDER_BRAND: guide "A `unique symbol` — the `SubjectBuilder` builder brand key (`isSubjectBuilder` reads it through `Reflect.get`), distinct from `DEFINITION_BUILDER_BRAND`." source "Holds the `SubjectBuilder` entity brand — a `unique symbol` key carrying `readonly true` on every `SubjectBuilderInterface` instance."
guides/reason.md type Reasoning: guide absent source "Names the four reasoning strategies — the axis a `Definition` / `ReasonResult` discriminates on."
guides/reason.md type ChainingStrategy: guide absent source "Names how a chaining reasoner walks its rules: `forward` (data-driven fixpoint) or `backward` (goal-driven proving)."
guides/reason.md type MathOperation: guide absent source "Names a math operation applied by the `TransformerInterface` and inside `SymbolicExpression` trees."
guides/reason.md type Aggregation: guide absent source "Names how the `AggregatorInterface` reduces a list of numbers to one."
guides/reason.md type Comparison: guide absent source "Names the comparison a `Check` applies between a resolved subject field and its expected value."
guides/reason.md type LogicalOperator: guide absent source "Names a logical connective inside a compound `Expression`."
guides/reason.md type Subject: guide absent source "Represents the data record being reasoned about — a plain readonly bag of fields, read by `FieldPath`."
guides/reason.md interface Check: guide absent source "Represents a single field predicate: resolves `field` from the subject and compares it to `value` with `operator`."
guides/reason.md interface CheckResult: guide absent source "Represents the outcome of one `Check` evaluation."
guides/reason.md interface Transform: guide absent source "Represents one math step applied to a number by the `TransformerInterface`."
guides/reason.md interface Bounds: guide absent source "Represents an inclusive numeric clamp — either side may be absent (unbounded)."
guides/reason.md interface StaticSource: guide absent source "Represents a factor source yielding a fixed number."
guides/reason.md interface FieldSource: guide absent source "Represents a factor source reading a subject field as a number."
guides/reason.md interface LookupSource: guide absent source "Represents a factor source mapping a subject field through a lookup table."
guides/reason.md interface RangeSource: guide absent source "Represents a factor source banding a numeric subject field through ordered ranges."
guides/reason.md type Source: guide absent source "Represents the four factor sources, discriminated by `origin`."
guides/reason.md interface FactorRange: guide absent source "Represents one band of a `RangeSource` — an optional inclusive bounds test and the value it yields."
guides/reason.md interface Factor: guide absent source "Represents one scored input of a quantitative group."
guides/reason.md interface FactorGroup: guide absent source "Represents a group of factors aggregated into one value."
guides/reason.md interface QuantitativeDefinition: guide absent source "Defines factor-based numeric scoring."
guides/reason.md interface Atom: guide absent source "Represents a leaf boolean expression — one `Check` against the subject."
guides/reason.md interface Compound: guide absent source "Represents a compound boolean expression — a `LogicalOperator` over nested operands."
guides/reason.md type Expression: guide absent source "Represents a boolean expression tree, discriminated by `form`."
guides/reason.md interface Rule: guide absent source "Represents one deduction rule: when ALL `premises` hold, the `conclusion`'s atoms are asserted as derived facts."
guides/reason.md interface LogicalDefinition: guide absent source "Defines rule-based deduction."
guides/reason.md interface Variable: guide absent source "Represents a symbolic expression leaf naming a variable."
guides/reason.md interface Constant: guide absent source "Represents a symbolic expression leaf holding a fixed number."
guides/reason.md interface Operation: guide absent source "Represents a symbolic operation node."
guides/reason.md type SymbolicExpression: guide absent source "Represents an algebraic expression tree, discriminated by `form`."
guides/reason.md interface Equation: guide absent source "Represents one equation `left = right`, solved for the `target` variable."
guides/reason.md interface SymbolicDefinition: guide absent source "Defines equation-solving."
guides/reason.md interface Fact: guide absent source "Represents one fact: a `predicate` over positional `terms`."
guides/reason.md interface Inference: guide absent source "Represents one inference rule: when every premise pattern unifies against known facts (with consistent variable bindings), the instantiated `conclusion` is derived."
guides/reason.md interface InferentialDefinition: guide absent source "Defines fact-derivation."
guides/reason.md type Definition: guide absent source "Represents any reasoning definition, discriminated by `reasoning`."
guides/reason.md type DefinitionEnvelope: guide absent source "Represents the scalar-only projection of each definition kind — the `DefinitionBuilderInterface` implementation's private envelope holds the non-collection fields; `build()` re-composes the kind's collections from the managers' plural accessors."
guides/reason.md type QuantitativeClearKey: guide absent source "Names the optional `QuantitativeDefinition` fields `clearQuantitativeDefinition` (and a quantitative `DefinitionBuilderInterface`'s `clear`) can delete."
guides/reason.md type LogicalClearKey: guide absent source "Names the optional `LogicalDefinition` fields `clearLogicalDefinition` (and a logical `DefinitionBuilderInterface`'s `clear`) can delete."
guides/reason.md type SymbolicClearKey: guide absent source "Names the optional `SymbolicDefinition` fields `clearSymbolicDefinition` (and a symbolic `DefinitionBuilderInterface`'s `clear`) can delete."
guides/reason.md type InferentialClearKey: guide absent source "Names the optional `InferentialDefinition` fields `clearInferentialDefinition` (and an inferential `DefinitionBuilderInterface`'s `clear`) can delete."
guides/reason.md interface LogicalChainingResult: guide absent source "Represents one chaining pass of the `LogicalReasoner` — the overall `conclusion` plus the per-rule results the pass produced."
guides/reason.md interface InferentialChainingResult: guide absent source "Represents one chaining pass of the `InferentialReasoner` — the facts the pass derived plus the proof tree, when the pass produced one."
guides/reason.md interface FactorResult: guide absent source "Represents one factor's evaluation outcome."
guides/reason.md interface GroupResult: guide absent source "Represents one group's evaluation outcome — its clamped value and the per-factor results (disabled factors omitted entirely)."
guides/reason.md interface QuantitativeResult: guide absent source "Represents the outcome of quantitative reasoning."
guides/reason.md interface RuleResult: guide absent source "Represents one rule's evaluation outcome."
guides/reason.md interface LogicalResult: guide absent source "Represents the outcome of logical reasoning."
guides/reason.md interface SymbolicResult: guide absent source "Represents the outcome of symbolic reasoning — final bindings keyed by each equation's `target` (a failed equation's target still appears when bound elsewhere)."
guides/reason.md interface ProofNode: guide absent source "Represents one node of a backward-chaining proof tree."
guides/reason.md interface InferentialResult: guide absent source "Represents the outcome of inferential reasoning."
guides/reason.md type ReasonResult: guide absent source "Represents any reasoning result, discriminated by `reasoning`."
guides/reason.md interface ReasonValidationResult: guide absent source "Represents the outcome of validating a definition — hard `errors` (definition unusable) and soft `warnings` (suspicious but runnable). `valid` is `true` exactly when `errors` is empty."
guides/reason.md interface EvaluatorOptions: guide absent source "Configures `createEvaluator` / the `Evaluator` constructor."
guides/reason.md interface TransformerOptions: guide absent source "Configures `createTransformer` / the `Transformer` constructor."
guides/reason.md interface AggregatorOptions: guide absent source "Configures `createAggregator` / the `Aggregator` constructor."
guides/reason.md interface QuantitativeReasonerOptions: guide absent source "Configures `createQuantitativeReasoner` / the `QuantitativeReasoner` constructor."
guides/reason.md interface LogicalReasonerOptions: guide absent source "Configures `createLogicalReasoner` / the `LogicalReasoner` constructor."
guides/reason.md interface SymbolicReasonerOptions: guide absent source "Configures `createSymbolicReasoner` / the `SymbolicReasoner` constructor."
guides/reason.md interface InferentialReasonerOptions: guide absent source "Configures `createInferentialReasoner` / the `InferentialReasoner` constructor."
guides/reason.md interface EvaluatorInterface: guide absent source "Evaluates `Check`s against subjects."
guides/reason.md interface TransformerInterface: guide absent source "Applies math `Transform`s to numbers."
guides/reason.md interface AggregatorInterface: guide absent source "Reduces number lists to one number per `Aggregation`."
guides/reason.md interface ReasonerInterface: guide absent source "Declares a reasoning strategy adapter — one per `Reasoning`."
guides/reason.md type ReasonErrorCode: guide absent source "Names a machine-readable `ReasonError` code."
guides/reason.md type ReasonEventMap: guide absent source "Represents the push observation surface of a `ReasonInterface`."
guides/reason.md interface ReasonOptions: guide absent source "Configures `createReason` / the `Reason` constructor."
guides/reason.md interface ReasonInterface: guide absent source "Declares the reasoning orchestrator — a thin router over registered `ReasonerInterface`s."
guides/reason.md interface GroupManagerInterface: guide absent source "Declares the `DefinitionBuilderInterface` manager over a quantitative definition's `groups` — a self-owning, kind-free collection manager."
guides/reason.md type GroupManagerEventMap: guide absent source "Represents the push observation surface of a `GroupManagerInterface`."
guides/reason.md interface GroupManagerOptions: guide absent source "Configures `createGroupManager` / the `GroupManager` constructor."
guides/reason.md interface FactorManagerInterface: guide absent source "Declares the `DefinitionBuilderInterface` manager over a `FactorGroup`'s `factors`, threaded through the required `groupId` locator (a factor lives inside its group)."
guides/reason.md type FactorManagerEventMap: guide absent source "Represents the push observation surface of a `FactorManagerInterface`."
guides/reason.md interface FactorManagerOptions: guide absent source "Configures `createFactorManager` / the `FactorManager` constructor."
guides/reason.md interface RuleManagerInterface: guide absent source "Declares the `DefinitionBuilderInterface` manager over a logical definition's `rules` — a self-owning, kind-free collection manager."
guides/reason.md type RuleManagerEventMap: guide absent source "Represents the push observation surface of a `RuleManagerInterface`."
guides/reason.md interface RuleManagerOptions: guide absent source "Configures `createRuleManager` / the `RuleManager` constructor."
guides/reason.md interface EquationManagerInterface: guide absent source "Declares the `DefinitionBuilderInterface` manager over a symbolic definition's `equations` — a self-owning, kind-free collection manager."
guides/reason.md type EquationManagerEventMap: guide absent source "Represents the push observation surface of an `EquationManagerInterface`."
guides/reason.md interface EquationManagerOptions: guide absent source "Configures `createEquationManager` / the `EquationManager` constructor."
guides/reason.md interface FactManagerInterface: guide absent source "Declares the `DefinitionBuilderInterface` manager over an inferential definition's `facts` — a self-owning, kind-free collection manager."
guides/reason.md type FactManagerEventMap: guide absent source "Represents the push observation surface of a `FactManagerInterface`."
guides/reason.md interface FactManagerOptions: guide absent source "Configures `createFactManager` / the `FactManager` constructor."
guides/reason.md interface InferenceManagerInterface: guide absent source "Declares the `DefinitionBuilderInterface` manager over an inferential definition's `inferences` — a self-owning, kind-free collection manager."
guides/reason.md type InferenceManagerEventMap: guide absent source "Represents the push observation surface of an `InferenceManagerInterface`."
guides/reason.md interface InferenceManagerOptions: guide absent source "Configures `createInferenceManager` / the `InferenceManager` constructor."
guides/reason.md interface VariableManagerInterface: guide absent source "Declares the `DefinitionBuilderInterface` manager over a symbolic definition's `variables` — a name-keyed unordered record, so `add` / `remove` are the only write verbs (no placement). A self-owning, kind-free manager."
guides/reason.md type VariableManagerEventMap: guide absent source "Represents the push observation surface of a `VariableManagerInterface`."
guides/reason.md interface VariableManagerOptions: guide absent source "Configures `createVariableManager` / the `VariableManager` constructor."
guides/reason.md type DefinitionBuilderEventMap: guide absent source "Represents the push observation surface of a `DefinitionBuilderInterface` — the builder-level lifecycle events; per-element mutation events live on the individual managers' own emitters."
guides/reason.md interface DefinitionBuilderInterface: guide absent source "Declares a stateful workspace builder accumulating a `Definition` through always-present self-owning manager properties: a private scalar envelope plus one manager per collection."
guides/reason.md interface DefinitionBuilderOptions: guide absent source "Configures `createDefinitionBuilder` / the `DefinitionBuilder` constructor."
guides/reason.md type SubjectBuilderEventMap: guide absent source "Represents the push observation surface of a `SubjectBuilderInterface` — five verb-named events, no generic `change` / `status`."
guides/reason.md interface SubjectBuilderInterface: guide absent source "Declares a stateful workspace builder accumulating a `Subject` — one flat key-value collection, no managers."
guides/reason.md interface SubjectBuilderOptions: guide absent source "Configures `createSubjectBuilder` / the `SubjectBuilder` constructor."
guides/reason.md ReasonInterface.reason: guide absent source absent
guides/reason.md ReasonInterface.register: guide absent source absent
guides/reason.md ReasonInterface.reasoner: guide absent source absent
guides/reason.md ReasonInterface.reasoners: guide absent source absent
guides/reason.md ReasonInterface.supports: guide absent source absent
guides/reason.md ReasonInterface.validate: guide absent source absent
guides/reason.md ReasonInterface.destroy: guide absent source absent
guides/reason.md ReasonerInterface.supports: guide absent source absent
guides/reason.md ReasonerInterface.validate: guide absent source absent
guides/reason.md ReasonerInterface.reason: guide absent source absent
guides/reason.md EvaluatorInterface.evaluate: guide absent source absent
guides/reason.md EvaluatorInterface.batch: guide absent source absent
guides/reason.md TransformerInterface.apply: guide absent source absent
guides/reason.md TransformerInterface.chain: guide absent source absent
guides/reason.md AggregatorInterface.aggregate: guide absent source absent
guides/reason.md GroupManagerInterface.group: guide absent source absent
guides/reason.md GroupManagerInterface.groups: guide absent source absent
guides/reason.md GroupManagerInterface.append: guide absent source absent
guides/reason.md GroupManagerInterface.prepend: guide absent source absent
guides/reason.md GroupManagerInterface.replace: guide absent source absent
guides/reason.md GroupManagerInterface.remove: guide absent source absent
guides/reason.md GroupManagerInterface.seat: guide absent source absent
guides/reason.md GroupManagerInterface.destroy: guide absent source absent
guides/reason.md FactorManagerInterface.factor: guide absent source absent
guides/reason.md FactorManagerInterface.factors: guide absent source absent
guides/reason.md FactorManagerInterface.append: guide absent source absent
guides/reason.md FactorManagerInterface.prepend: guide absent source absent
guides/reason.md FactorManagerInterface.replace: guide absent source absent
guides/reason.md FactorManagerInterface.remove: guide absent source absent
guides/reason.md FactorManagerInterface.destroy: guide absent source absent
guides/reason.md RuleManagerInterface.rule: guide absent source absent
guides/reason.md RuleManagerInterface.rules: guide absent source absent
guides/reason.md RuleManagerInterface.append: guide absent source absent
guides/reason.md RuleManagerInterface.prepend: guide absent source absent
guides/reason.md RuleManagerInterface.replace: guide absent source absent
guides/reason.md RuleManagerInterface.remove: guide absent source absent
guides/reason.md RuleManagerInterface.seat: guide absent source absent
guides/reason.md RuleManagerInterface.destroy: guide absent source absent
guides/reason.md EquationManagerInterface.equation: guide absent source absent
guides/reason.md EquationManagerInterface.equations: guide absent source absent
guides/reason.md EquationManagerInterface.append: guide absent source absent
guides/reason.md EquationManagerInterface.prepend: guide absent source absent
guides/reason.md EquationManagerInterface.replace: guide absent source absent
guides/reason.md EquationManagerInterface.remove: guide absent source absent
guides/reason.md EquationManagerInterface.seat: guide absent source absent
guides/reason.md EquationManagerInterface.destroy: guide absent source absent
guides/reason.md FactManagerInterface.fact: guide absent source absent
guides/reason.md FactManagerInterface.facts: guide absent source absent
guides/reason.md FactManagerInterface.append: guide absent source absent
guides/reason.md FactManagerInterface.prepend: guide absent source absent
guides/reason.md FactManagerInterface.replace: guide absent source absent
guides/reason.md FactManagerInterface.remove: guide absent source absent
guides/reason.md FactManagerInterface.seat: guide absent source absent
guides/reason.md FactManagerInterface.destroy: guide absent source absent
guides/reason.md InferenceManagerInterface.inference: guide absent source absent
guides/reason.md InferenceManagerInterface.inferences: guide absent source absent
guides/reason.md InferenceManagerInterface.append: guide absent source absent
guides/reason.md InferenceManagerInterface.prepend: guide absent source absent
guides/reason.md InferenceManagerInterface.replace: guide absent source absent
guides/reason.md InferenceManagerInterface.remove: guide absent source absent
guides/reason.md InferenceManagerInterface.seat: guide absent source absent
guides/reason.md InferenceManagerInterface.destroy: guide absent source absent
guides/reason.md VariableManagerInterface.variable: guide absent source absent
guides/reason.md VariableManagerInterface.variables: guide absent source absent
guides/reason.md VariableManagerInterface.add: guide absent source absent
guides/reason.md VariableManagerInterface.remove: guide absent source absent
guides/reason.md VariableManagerInterface.seat: guide absent source absent
guides/reason.md VariableManagerInterface.destroy: guide absent source absent
guides/reason.md DefinitionBuilderInterface.build: guide absent source absent
guides/reason.md DefinitionBuilderInterface.merge: guide absent source absent
guides/reason.md DefinitionBuilderInterface.clear: guide absent source absent
guides/reason.md DefinitionBuilderInterface.destroy: guide absent source absent
guides/reason.md SubjectBuilderInterface.field: guide absent source absent
guides/reason.md SubjectBuilderInterface.fields: guide absent source absent
guides/reason.md SubjectBuilderInterface.set: guide absent source absent
guides/reason.md SubjectBuilderInterface.remove: guide absent source absent
guides/reason.md SubjectBuilderInterface.merge: guide absent source absent
guides/reason.md SubjectBuilderInterface.clear: guide absent source absent
guides/reason.md SubjectBuilderInterface.repeat: guide absent source absent
guides/reason.md SubjectBuilderInterface.build: guide absent source absent
guides/reason.md SubjectBuilderInterface.destroy: guide absent source absent
guides/reason.md pitch: readme absent tagline "A synchronous, deterministic reasoning engine: declarative, JSON-serializable definitions are evaluated against subjects (plain data records) to produce traceable results. Four strategies behind one dispatch surface — `quantitative` (factor-based numeric scoring), `logical` (rule-based boolean deduction with forward / backward chaining), `symbolic` (algebraic equation solving by variable isolation), `inferential` (fact derivation with unification variables and proof trees) — each a `ReasonerInterface` registered on the thin `Reason` orchestrator, with three injectable operators (`Evaluator` / `Transformer` / `Aggregator`) doing the shared arithmetic. Every result is a fresh object carrying `success`, a human-readable `trace`, and accumulated `errors`; nothing mutates its inputs. The design stance is data in, data out, no surprises: definitions are pure data (built by hand or with the shipped value factories), the orchestrator holds NO strategy logic (dispatch is a registry lookup by the `reasoning` discriminant), the operators are total (an unknown comparison surfaces as a `CheckResult.error`, an unknown math operation is a no-op, divide-by-zero is `NaN` — never a throw), and a reasoner never assumes `validate` ran — a malformed definition yields a failure RESULT, reserving throws for caller misuse (a coded `ReasonError`). On top of the evaluation engine sits the definitions & subjects capability layer: a pure copy-on-write helper family that changes / extends / merges / round-trips definitions as data, and two brand-guarded workspace builders — `DefinitionBuilder` (one self-owning manager per collection) and `SubjectBuilder` (one flat collection) — that accumulate state through named methods and `build()` a fresh plain payload on demand. Building happens OUTSIDE the engine: `reason` and `validate` take only the plain data, so a builder's `build()` output is passed at the call site. Deliberately absent: async reasoners, definition persistence, and probabilistic strategies beyond the multiplicative `confidence` of inferential facts. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 372
```

## Deviation

None. `repair` wrote the P21 list exactly, every before-text was found verbatim, no voice diagnostic
named an off-limits file, `test:policy` named only lines inside this unit's scope, and no gate other
than `docs` read red.
