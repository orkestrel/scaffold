# Report — `d7n-reason-converge-fix`

2026-09-07; the closing gate runs finished at 20:45 UTC. Sole writer in `/home/user/fleet/reason`, baseline `49648b5`, uncommitted.

## The resumed run's partial hunks

Kept every hunk of the terminated run except the following. No hunk was discarded whole.

| Site | Ruling |
| --- | --- |
| `src/core/helpers.ts` `equalValues` remarks | Corrected. "derives exactly one time" back to "derives exactly once" — the frequency sense the substitution table leaves permitted. |
| `src/core/reasoners/LogicalReasoner.ts:190` | Corrected, same reason: "errors one time" back to "errors once". |
| `src/core/helpers.ts` `appendEquation`, `src/core/builders/managers/EquationManager.ts` | Corrected. "Order is load-bearing without exception" reads as a claim the clause after it already carries; both now read "Order is load-bearing" and keep "equations solve strictly in order and each rounded solution feeds forward". |
| `src/core/factories.ts` `createDefinitionBuilder` remarks | Corrected. The rewrite dropped an opening parenthesis and left "collection). `on`" unbalanced. |
| `src/core/factories.ts`, `src/core/builders/DefinitionBuilder.ts`, `src/core/types.ts` `DefinitionBuilderOptions` | Corrected. "is a supplied one where the caller passes one" reads as a garden path; each now reads "takes the manager the caller supplies, or a fresh one seeded from the seed's matching collection". |
| `src/core/validators.ts:92` `@returns` | Corrected. The member list ran to 111 characters against the file's 100-character tag-line high mark; now "names a reasoning strategy", matching the file's existing `names a clearable … field` form and its `:159`, `:181`, `:208` siblings. |
| `src/core/types.ts` `Factor`, `ReasonEventMap`; `src/core/builders/SubjectBuilder.ts`; `src/core/reasoners/{Inferential,Quantitative}Reasoner.ts` | Corrected by rewrapping only: the edits left prose lines past each block's own wrap. No wording moved. |

## Items

1. **R1 counts.** `src/core/types.ts` `Reasoning` (`:19`), `SubjectBuilderEventMap`; `src/core/validators.ts` `isSource` (`:349`), `isDefinition` (`:755`) and the `@returns` lines at `:92`, `:159`, `:181`, `:208`; `src/core/factories.ts` `@param seed`; `src/core/helpers.ts` § Subject engine. `src/core/types.ts:214` `Source` was still uncorrected and now reads "a static, field, lookup, or range factor source, discriminated by `origin`". `guides/reason.md:704`'s fence comment names its members, so the number went. Propagated with `--to guide`.
2. **R2 all-caps.** Every site the brief named, plus the sweep's remaining hits in the same blocks. `guides/reason.md` fence comments and cell: `ERROR`, `DOWN`, `ALL`, `OWN`, and the `OUTSIDE` hits at `:942` and `:1012`, which the brief did not name. Kept as real tokens: `JSON`, `NaN`, `FAILED` (`SymbolicReasoner.ts:172` emits it), the `ReasonErrorCode` members, `DOC ↔ SOURCE`, `AGENTS`, `README`, `API`, `DSL`, `MCP`, and the `AND` inside the `LogicalReasoner.ts:126` warning string, which is a code token the scope forbids moving.
3. **R3 drop-in.** Lines 1 to 3 now equal the pilot's. The `INTERNAL` doc block takes the pilot's sentence. The hoist comment keeps the loop-scope `findDrift` call, drops the row count for `5192 ms measured on this guide, 2026-09-07`, and replaces "the readers above" with "the preceding readers" per the banned-pointer rule. `drifts` / `drift` renamed. Title now `§ Quantitative scoring — the operators driven directly`.
4. **R4 elision.** `SubjectBuilderInterface.set`'s description reads "setting `id` throws, because the id is immutable …", propagated to the `:573` cell; the guide body at `:1017` reads "Setting `id` or removing `id` throws `MISMATCH`".
5. **R5 manager `remove` rows.** Every manager's `remove` rewritten in `src/core/types.ts` to the brief's one-parse sentence, each naming its own noun, with the emit clause moved to `@remarks` per Ruling 7 where one existed. Landed at `guides/reason.md:463`, `:478`, `:492`, `:507`, `:522`, `:537`, `:550`, `:574`.
6. **R6 `Shape` idiom.** The convention sentence at `:305` is Ruling 15's wording verbatim. Every interface row that differed rewritten: discriminant literals dropped to bare names, call-signature members moved behind `plus`. Cells derived by parsing `src/core/types.ts` with `tmp/d7n-reason-converge-fix/shape.mjs`, spot-checked by hand against `ReasonInterface`, `DefinitionBuilderInterface`, `GroupManagerInterface`, and `AggregatorInterface`. Alias rows keep their own literal; the event-map aliases keep bare names in braces, because Ruling 12 bars a member's type from the cell and the payload tuples are member types.
7. **R7 brand fact.** A sentence closes the `### Classes` intro at `:91`, naming `DEFINITION_BUILDER_BRAND`, `SUBJECT_BUILDER_BRAND`, and the `isDefinitionBuilder` and `isSubjectBuilder` guards that read them through `Reflect.get`. Outside every compared cell.
8. **Propagation.** `oxfmt --write` over the owned paths; `oxfmt` formats Markdown, so it owns the guide's table padding. `npm run docs -- --to guide` wrote every disagreeing row and reported the `Create an orchestrator and score a subject` fence as guide-owned; that fence's `IS registered` was corrected by hand.

## Red first

`npm run docs` before propagation: `rows read: 1, disagreements found: 15`. After: `disagreements found: 0`.

Control on an owned file, planted and reversed: restoring "Names the four reasoning strategies" to the `Reasoning` `Summary` cell reddened `npm run test:guides` at `Tests 1 failed | 96 passed (97)`, naming `guides/reason.md type Reasoning` in the collected line. Reversed; the same command returns `Tests 97 passed (97)`.

## Acceptance criteria

1. `git status --short` — owned files only: `guides/reason.md`, the `src/core/**` files listed in the diffstat, and `tests/guides.test.ts`. Instruments sit in the ignored `tmp/d7n-reason-converge-fix/`.
2. `npx oxfmt --config .oxfmtrc.json --check <owned>` → `All matched files use the correct format.` exit 0. `npx oxlint --config .oxlintrc.json --deny-warnings <owned .ts>` → no output, exit 0 (oxlint 1.81.0 prints no summary for explicit paths). `npm run check` → exit 0.
3. `npm run docs` → `rows read: 1, disagreements found: 0`. `--to guide` and `--to source` → `disagreements found: 0, written: 0, reported: 0`.
4. `grep -nE '\b(four|five|three|two) (reasoning|factor|definition|verb|operators|constants)' guides/reason.md src/core/*.ts tests/guides.test.ts` → no match. The convention sentence appears at `:305` alone, under `### Types` at `:303`. `grep -n '| interface *| `{[^`]*:' guides/reason.md` → no match. `grep -n '…' guides/reason.md` → `:907` (a sequence continuation) and `:1092` (the `is…` name pattern); no `Shape` cell.
5. `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` → empty. `diff` of the pilot's `36,41p` against this file's `74,79p` → empty.
6. `npm run test:guides` → `Test Files 1 passed (1)`, `Tests 97 passed (97)`, 4.78 s. `npm run test:policy` → `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, 862 ms.

Observation, not a criterion: `npm run test:src` → `Test Files 23 passed (23)`, `Tests 1203 passed (1203)`, 3.65 s.

## Ancillary decisions

- The plain replacements chosen for the capitalized words: `BOTH` → "a number on each side" and "met by neither"; `ONE` → "a single key"; `ONLY` / `NO` / `NOT emit` → "only" / "no" / "emits nothing"; `BRING-YOUR-OWN` → "the manager the caller supplies"; `ANONYMOUS` / `OPTIONAL` / `KIND-FREE` / `TOTAL` / `DEDUPES` → lowercase; `STRONGLY load-bearing` → "load-bearing"; `same-predicate-AND-same-arity` → "one of the same predicate and arity".
- The event-map alias rows keep bare member names rather than their payload tuples, resolving Ruling 12's "a type alias's own type literal" against its "a member's type never appears in the cell" in favour of the latter.

## Carried out of scope

`tests/guides.test.ts:303` still diverges from the pilot's canonical drop-in text: this file reads "The parity assertions above resolve NAMES. …" where the pilot reads "The EXECUTED half. Every preceding check reads a name …". It carries a banned `above` and a capitalized `NAMES`. The brief's R3 enumerates the drop-in corrections this round takes and does not name it, and Ruling 13 makes the pilot's paragraph the text the next drop-in update copies — so converging it belongs to the closing sweep's drop-in copy, not here. Recorded, unchanged.

## Deviation state

None. No gate outside the owned files went red, and no `Shape` cell resisted Ruling 12.

## Touched files

| File | Change |
| --- | --- |
| `guides/reason.md` | Ruling 15's convention sentence, Ruling 12's `Shape` cells, the brand sentence, the `…` removal at `:1017`, the all-caps fence comments and cell, and the `Summary` cells `--to guide` wrote |
| `src/core/types.ts` | The count-free `Reasoning`, `Source`, and `SubjectBuilderEventMap` descriptions, the manager `remove` sentences, the `set` elision, and the decapitalized doc blocks |
| `src/core/validators.ts` | Count-free `isSource` and `isDefinition` descriptions and `@returns` lines; decapitalized guard remarks |
| `src/core/helpers.ts` | Decapitalized remarks and module comments; the count-free § Subject engine heading comment |
| `src/core/factories.ts` | Decapitalized factory remarks; the repaired manager-slot sentence; the count-free `@param seed` |
| `src/core/builders/SubjectBuilder.ts` | Decapitalized and rewrapped class remarks; the `set` wording; the fence comment |
| `src/core/builders/DefinitionBuilder.ts` | Decapitalized class remarks; the repaired manager-slot sentence |
| `src/core/builders/managers/*.ts` | Decapitalized manager remarks; `EquationManager` drops the intensifier |
| `src/core/reasoners/*.ts`, `src/core/operators/*.ts`, `src/core/Reason.ts`, `src/core/parsers.ts`, `src/core/constants.ts` | Decapitalized doc blocks and inline comments; rewraps where an edit overran the block's wrap |
| `tests/guides.test.ts` | The pilot's header and `INTERNAL` sentence, the count-free hoist comment, the `drifts` / `drift` rename, and the count-free test title |

```text
 guides/reason.md                               | 250 ++++++++++++-------------
 src/core/Reason.ts                             |  14 +-
 src/core/builders/DefinitionBuilder.ts         |  16 +-
 src/core/builders/SubjectBuilder.ts            |  39 ++--
 src/core/builders/managers/EquationManager.ts  |  10 +-
 src/core/builders/managers/FactManager.ts      |   8 +-
 src/core/builders/managers/FactorManager.ts    |   6 +-
 src/core/builders/managers/GroupManager.ts     |   8 +-
 src/core/builders/managers/InferenceManager.ts |   8 +-
 src/core/builders/managers/RuleManager.ts      |  10 +-
 src/core/builders/managers/VariableManager.ts  |   8 +-
 src/core/constants.ts                          |   6 +-
 src/core/factories.ts                          |  41 ++--
 src/core/helpers.ts                            | 123 ++++++------
 src/core/operators/Aggregator.ts               |   6 +-
 src/core/operators/Evaluator.ts                |  10 +-
 src/core/operators/Transformer.ts              |   2 +-
 src/core/parsers.ts                            |   4 +-
 src/core/reasoners/InferentialReasoner.ts      |  45 ++---
 src/core/reasoners/LogicalReasoner.ts          |  28 +--
 src/core/reasoners/QuantitativeReasoner.ts     |  29 +--
 src/core/reasoners/SymbolicReasoner.ts         |  20 +-
 src/core/types.ts                              | 194 ++++++++++---------
 src/core/validators.ts                         |  52 ++---
 tests/guides.test.ts                           |  22 +--
 25 files changed, 485 insertions(+), 474 deletions(-)
```
