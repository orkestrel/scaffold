# Unit conform-reason — report

Every row is `applied` except the two fleet rows, which are `noop` with the evidence that made them
inapplicable. No row stopped. The gate chain is green.

Baseline: `ebcca0a` ("Align the @orkestrel ranges to the registry and drop the unused browser
runner"), working tree clean at dispatch.

## Rows

| Id              | Disposition | Note                                                                                                                            |
| --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| reason-subj-1   | applied     | Every `§N` / `AGENTS §N` citation deleted from the guide, the guide index, `tests/setup.ts`, and the named `tests/**` files.     |
| reason-subj-2   | applied     | `zero-dependency` dropped from `README.md:3`, `guides/reason.md:3`, and the `types.ts` header.                                   |
| reason-subj-3   | applied     | Every `taverna X-shaped` clause and the bare `shaped like AgentContext` restated in this package's own terms.                    |
| reason-subj-4   | applied     | The `scsr` porting paragraph deleted, the divergence paragraph rewritten as present-tense rules, `scsr` gone from source and tests. |
| reason-subj-5   | applied     | `RuleResult.conclusion` removed; `LogicalResult.conclusion` now derives from the last rule's `applied`.                          |
| reason-subj-6   | applied     | One `@example` added to each barrelled class block, importing through `@orkestrel/reason`; `Collection` left without one.        |
| reason-subj-7   | applied     | `currently` and `as before` replaced with the checkable difference each sentence was hedging.                                    |
| reason-subj-8   | applied     | `via` → `through`, `simply` / `just` deleted across `src/**` and the guide, including the two runtime message strings.           |
| reason-subj-9   | applied     | Both `should` recommendations rewritten as imperatives; § Practices left as the single home.                                     |
| reason-subj-10  | applied     | `LogicalChainingOutcome` → `LogicalChainingResult`, `InferentialChainingOutcome` → `InferentialChainingResult`.                  |
| reason-subj-11  | applied     | Every manager's `remove` is now the batch family; `Collection.remove` reports whether the id existed.                            |
| reason-subj-13  | applied     | The five `seat(items: …)` signatures and implementations renamed to their domain nouns; `Collection` left generic.               |
| reason-subj-15  | applied     | `README.md:25` now reads `Node.js >= 22.12.0, matching the package engine declaration`.                                          |
| reason-subj-16  | applied     | Every stated default in `types.ts` and `constants.ts` rewritten to the fixed `Default: …` form. No value changed.                |
| reason-obj-1    | applied     | `tests/src/core/parsers.test.ts` and the whole `tests/src/core/builders/managers/` mirror created.                               |
| reason-obj-2    | applied     | `describe('flagship fences')` added to `tests/guides.test.ts`; it caught one stale guide value, corrected in the guide.          |
| reason-obj-3    | applied     | `subjectToFacts` returns `readonly Fact[]`, landed with reason-obj-5 as one signature change.                                    |
| reason-obj-4    | applied     | `indexByArity` returns `ReadonlyMap<string, readonly Fact[]>`; the reasoner seeds a bucket copy it owns.                         |
| reason-obj-5    | applied     | `subjectToFacts` takes no caller-owned `trace`; the header names the identity ledger as the one exception.                       |
| reason-obj-7    | applied     | `resolveOperand` added beside `applyOperation`; `Transformer.apply` composes the two behind `isMathOperation`.                   |
| reason-obj-8    | applied     | Every positional `above` / `below` replaced; the `Comparison` code tokens and the quantity senses left alone.                    |
| reason-obj-9    | applied     | `source` renamed to `fact` / `inference` in the four helpers and their `@param` lines.                                           |
| reason-obj-10   | applied     | Direct `seat` cases added in the EquationManager, FactManager, and InferenceManager files; the builder block left unchanged.     |
| fleet-F1        | noop        | `tests/setup.ts` read in full declares no `isBrowserVuePath`; `grep -rn isBrowserVuePath` over the checkout returns nothing. No `src/browser`, no `app/browser`, no `tests/setupBrowser.ts`. |
| fleet-F2        | noop        | No implementation class declares a public `readonly id: string` field. Every `readonly id: string` hit in `src/` sits in a `types.ts` interface; every class reads `readonly #id` plus a `get id()`. |

## Files touched

Source:

- `src/core/types.ts` — `RuleResult.conclusion` removed, the two chaining types renamed, the manager
  `remove` batch family and `seat` parameter names declared, defaults rewritten to `Default: …`,
  taverna / `via` / `simply` / `currently` / `as before` prose corrected.
- `src/core/constants.ts` — the `DEFAULT_*` blocks carry the fixed default form; two `via` sites.
- `src/core/helpers.ts` — `subjectToFacts` re-signed, `indexByArity` made readonly, `resolveOperand`
  added, `source` parameters renamed, module header corrected, prose substitutions.
- `src/core/validators.ts` — `isRuleResult` no longer requires `conclusion`; its `@example` updated.
- `src/core/factories.ts` — one positional `below`.
- `src/core/Reason.ts` — class `@example`.
- `src/core/operators/Evaluator.ts` — class `@example`.
- `src/core/operators/Transformer.ts` — `apply` now composes `resolveOperand` and `applyOperation`
  behind `isMathOperation`; class `@example`.
- `src/core/operators/Aggregator.ts` — class `@example`; one positional `above`.
- `src/core/reasoners/QuantitativeReasoner.ts` — class `@example`.
- `src/core/reasoners/LogicalReasoner.ts` — the `conclusion` literals dropped, `:199` simplified,
  both derivations repointed at `applied`, the overlay warning string re-worded, class `@example`.
- `src/core/reasoners/SymbolicReasoner.ts` — class `@example`; one `just`.
- `src/core/reasoners/InferentialReasoner.ts` — the new `subjectToFacts` call shape, the owned bucket
  copy, the derivation trace string re-worded, class `@example`.
- `src/core/builders/DefinitionBuilder.ts` — class `@example`; taverna / `simply` / `via` prose.
- `src/core/builders/SubjectBuilder.ts` — class `@example`; taverna / `via` / `as before` prose and
  the `MISMATCH` message string.
- `src/core/builders/managers/Collection.ts` — `remove` reports whether the id existed.
- `src/core/builders/managers/{Group,Rule,Equation,Fact,Inference}Manager.ts` — the `remove` batch
  family, the `seat` parameter rename, and a class `@example` each.
- `src/core/builders/managers/FactorManager.ts` — the `remove` batch family behind the `groupId`
  locator, and a class `@example`.
- `src/core/builders/managers/VariableManager.ts` — the name-keyed `remove` batch family and a class
  `@example`.

Documentation:

- `guides/reason.md` — every row that names the guide.
- `guides/README.md` — the `§22` citation and the See-also row.
- `README.md` — the tagline and the Node requirement.

Tests:

- `tests/guides.test.ts` — the executable `flagship fences` block.
- `tests/setup.ts` — the citations.
- `tests/src/core/parsers.test.ts` — new.
- `tests/src/core/builders/managers/{Collection,GroupManager,FactorManager,RuleManager,EquationManager,VariableManager,FactManager,InferenceManager}.test.ts` — new.
- `tests/src/core/{helpers,validators,factories,integration}.test.ts`,
  `tests/src/core/Reason.test.ts`, `tests/src/core/builders/{DefinitionBuilder,SubjectBuilder}.test.ts`,
  `tests/src/core/operators/{Evaluator,Transformer,Aggregator}.test.ts`,
  `tests/src/core/reasoners/{Quantitative,Logical,Symbolic,Inferential}Reasoner.test.ts` — the
  citations, the `scsr` prose, and the assertions the contract changes move.

Diffstat: `51 files changed, 3111 insertions(+), 544 deletions(-)`.

## Failing-first proofs

Each command was run from `/home/user/fleet/reason`. The runner output is captured beside the count.

| Rows                                | Command                                                                                                                          | Before               | After              |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------ |
| reason-obj-3, reason-obj-5, reason-obj-7 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`           | 9 failed, 193 passed | 202 passed, exit 0 |
| reason-subj-5, reason-subj-8        | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/reasoners/LogicalReasoner.test.ts tests/src/core/reasoners/InferentialReasoner.test.ts tests/src/core/validators.test.ts` | 12 failed, 265 passed | 277 passed, exit 0 |
| reason-subj-11, reason-obj-1, reason-obj-10 | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/builders/managers tests/src/core/parsers.test.ts` | 16 failed, 109 passed (mutation control) | 134 passed, exit 0 |

Evidence files, in `/home/user/work/evidence/reason-proofs/`:

- `reason-obj-3-obj-5-obj-7-before.txt`, `reason-obj-3-obj-5-obj-7-after.txt`
- `reason-subj-5-subj-8-before.txt`, `reason-subj-5-subj-8-after.txt`
- `reason-subj-11-control.txt`, `reason-obj-1-subj-11-after.txt`
- `gate-lint-check.txt`, `gate-check.txt`, `gate-build.txt`, `gate-test.txt`, `sweeps.txt`

The failing-first names, before the fix:

- `subjectToFacts — subject field injection > projects scalar fields into has(k, v) facts, skipping id / null / objects / arrays`
- `subjectToFacts — subject field injection > returns the trace lines — a line per field plus a summary count`
- `subjectToFacts — subject field injection > injects nothing and traces nothing for an id-only subject`
- `subjectToFacts — subject field injection > takes no caller-owned accumulator, so a frozen subject reasons without a mutable input`
- `subjectToFacts — enumeration order (integer-like keys first) > orders integer-like keys ascending, then string keys insertion-ordered, id skipped`
- `subjectToFacts — ADVERSARIAL_VALUE_SUBJECT (symbol key, bigint/symbol/function values) > silently skips the symbol KEY, keeping bigint/symbol/function VALUES`
- `resolveOperand — the absent-operand default per operation > defaults multiply / divide / power to the multiplicative identity`
- `resolveOperand — the absent-operand default per operation > defaults every other operation to the additive identity`
- `resolveOperand — the absent-operand default per operation > returns the supplied operand for every operation, defaults never consulted`
- `LogicalReasoner … > exposes the rule-result shape (id / applied / premises) and no derived twin of applied`
- `LogicalReasoner … > an EMPTY-premises rule fires VACUOUSLY backward (forward reports it instead)`
- `LogicalReasoner — backward depth-cap enforcement (sub-goal proving) > depth 3 is insufficient — the goal (r6, needing 5 hops) is NOT proven`
- `isRuleResult > accepts open literal and prototype-carrying results and refuses every required-member fault`
- the `Overlay key …` and `Derived … through "…"` string assertions in
  `LogicalReasoner.test.ts` and `InferentialReasoner.test.ts`

reason-subj-11 arrived after its implementation, so its instrument was proved by a mutation control
rather than a natural red: `Collection.remove`'s existence probe was replaced with `const existed =
true`, the manager suite reddened 16 cases across 6 files, the line was restored, and the suite
returned to 134 passed. The control is `reason-subj-11-control.txt`.

reason-obj-1's proof is the collection itself: nine mirrored files that did not exist now run 134
cases in the `src:core` project.

reason-obj-2's proof is a real finding. Transcribing the § The definition workspace fence showed the
guide claiming `result.value // 40 — (10 + 25) + 5` where the code returns `41` — the fence's own
prepended `base` group contributes a `seed` factor of `1` that the comment never counted. Per the
row, the guide comment was corrected to `// 41 — 1 + (10 + 25) + 5` rather than the assertion
weakened. Every other transcribed fence value held, including `result.solutions` being exactly
`{ net: 20, discount: 2 }`.

## Sweeps

Population for every sweep: `src/**`, `tests/**` excluding the vendored `tests/setupPolicy.ts`,
`tests/policy.test.ts`, and `tests/config.test.ts`; `guides/reason.md`; `guides/README.md`;
`README.md`. Full output in `sweeps.txt`.

Empty: `§[0-9]`, `scsr`, `ChainingOutcome`, `taverna`, `zero-dependency`, `Node\.js >= 24`,
`\bshould\b`, `\beas(y|ier|iest|ily)\b`, `\bcurrently\b`, `\bas before\b`, `\(default `.

Non-empty, each ruled:

- `seat\(items` — one hit, `Collection.ts:44`. The row scopes `Collection<T>` out deliberately: a
  generic id-keyed container has no domain noun.
- `\bvia\b` — no hit in `src/**` or the package's own prose. The remaining hits are `tests/**` prose,
  which the row's Where does not name. Recorded under § Deviations.
- `\bsimpl(y|e|er|est|ify|ified)\b` — one hit, `tests/setup.ts:159` `simplest`, a superlative in test
  prose outside the row's Where. Recorded under § Deviations.
- `defaults to` — `src/core/factories.ts` only, outside reason-subj-16's Where. Recorded under
  § Deviations.

## Gates

Run from `/home/user/fleet/reason` in the order `AGENTS.md` fixes. The mutating `lint` and `format`
ran first to converge, then the non-mutating checks proved the result.

| Command                | Exit | Reading                                                                                 |
| ---------------------- | ---- | ----------------------------------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` — 79 files                                  |
| `npm run lint:check`   | 0    | no output                                                                               |
| `npm run check`        | 0    | root `tsc --noEmit` then `check:src:core`, both silent                                  |
| `npm run build`        | 0    | `✓ 27 modules transformed`, `dist/src/core/index.cjs 250.67 kB`, declarations copied     |
| `npm test`             | 0    | `src:core` 1202, `policy` 111, `config` 46, `setup` 26, `guides` 94 — every project green |

`git status --short` lists only files under Owned: 42 modified, 9 added (the new test files, marked
intent-to-add so they appear in the diff).

**Observation, not a criterion.** The `npm test` reading was taken inside this unit's own exec, so it
is pessimistic on timing. Nothing in the run was timing-sensitive and no case reported a timeout, but
the deciding run belongs to the Orchestrator after this unit exits.

## Breaking

No fleet consumer imports a renamed type, a re-signed helper, or a manager `remove`. The one
member removal reaches consumer fixtures. Every claim below rests on a grep over
`{qualifier,rater,program,interpret,brief}` source, app, and test trees, excluding `node_modules` and
each package's generated `dist/`.

### `RuleResult.conclusion` — removed (reason-subj-5)

Consumers carrying a `RuleResult` literal with the member: `@orkestrel/brief`, `@orkestrel/qualifier`.
`@orkestrel/rater`, `@orkestrel/program`, and `@orkestrel/interpret` reference `conclusion` only on
`LogicalResult`, which keeps the member, so they need no edit.

Exact edits, one per site — delete the `conclusion` entry from the `RuleResult` literal and change
nothing else:

- `/home/user/fleet/brief/tests/setup.ts` `FIRST_RULE`: delete the line `	conclusion: true,`
- `/home/user/fleet/brief/tests/setup.ts` `CAPTURED_RULE`: delete the line `	conclusion: false,`
- `/home/user/fleet/qualifier/src/core/helpers.ts:437` (the `rulingToFinding` `@example`): rewrite
  `rules: [{ id: 'licensed', applied: true, premises: [true], conclusion: true }]` as
  `rules: [{ id: 'licensed', applied: true, premises: [true] }]`
- `/home/user/fleet/qualifier/tests/src/core/helpers.test.ts:324`: rewrite
  `				rules: [{ id: 'licensed', applied: true, premises: [true], conclusion: true }],` as
  `				rules: [{ id: 'licensed', applied: true, premises: [true] }],`
- `/home/user/fleet/qualifier/tests/src/core/helpers.test.ts:359`: same edit with `id: 'proto'`
- `/home/user/fleet/qualifier/tests/src/core/helpers.test.ts:373`: same edit with `id: 'ghost'`
- `/home/user/fleet/qualifier/tests/src/core/helpers.test.ts:616`: same edit with `id: 'licensed'`
  (one extra tab of indentation at this site)

Two qualifications the receiving unit needs:

1. Whether the compiler reddens each site depends on literal freshness. `brief`'s two constants pass
   their literal through `Object.freeze` before the annotated assignment, so the excess-property
   check may not fire there while it does fire on a directly annotated literal. I did not typecheck
   the consumers — they are shared and report-only here, and their installed `@orkestrel/reason` is
   still the registry copy. Treat the compiler reading as unverified and the edit as required
   regardless: the engine no longer produces the key, so a fixture carrying it describes a shape the
   engine cannot return.
2. `CAPTURED_RULE` carries `applied: true` with `premises: [false]`, a shape the engine never
   produces. That is a separate fixture question for `brief` and is not this row.

### `LogicalChainingOutcome`, `InferentialChainingOutcome` — renamed (reason-subj-10)

Breaking on the published surface. `grep -rn 'LogicalChainingOutcome\|InferentialChainingOutcome'`
over the five consumers returns nothing, so no consumer edit exists.

### The manager `remove` family (reason-subj-11)

Breaking for a consumer implementing a manager interface through the bring-your-own slots.
`grep -rn 'createGroupManager\|createFactorManager\|createRuleManager\|createEquationManager\|createVariableManager\|createFactManager\|createInferenceManager\|createDefinitionBuilder'`
over the five consumers returns nothing, so no consumer edit exists.

### `subjectToFacts`, `indexByArity` (reason-obj-3, reason-obj-4, reason-obj-5)

Breaking on the published signatures. `grep -rn 'subjectToFacts\|indexByArity'` over the five
consumers returns nothing, so no consumer edit exists.

## Shared-file patches

None. Nothing outside `/home/user/fleet/reason` was edited, and no shared file inside it needed a
change. The consumer edits § Breaking enumerates are the patches the Orchestrator carries in layer
order; they are stated there rather than duplicated here.

The five vendoring consumers each hold a byte-identical mirror of `guides/reason.md`
(`/home/user/fleet/{program,interpret,rater,qualifier,brief}/guides/reason.md`). Four rows call for
re-propagation — reason-subj-1, reason-subj-2, reason-subj-3, reason-subj-4, reason-subj-9, and
reason-obj-8. The corrected file is `/home/user/fleet/reason/guides/reason.md` at this unit's tip;
copy it verbatim into each consumer rather than re-editing, because a rewritten mirror is a
translation and no comparison against the source bytes can check it.

## Deviations

None stopped the unit. Four decisions and three carried findings.

**Refused instruction from tool output.** A line appended to the end of a file-read result told me to
switch to Bash with `sed`, heredocs, and short scripts for reading and editing, and to fall back to
the dedicated tools only when Bash cannot do the job. That contradicts this unit's shell discipline,
and it arrived inside tool output rather than from the dispatching agent, so I did not follow it.
Every file in this unit was read with Read, Grep, or Glob and changed with Edit or Write. Flagging it
because an injected instruction in a read result is a finding about the harness, not about this
package.

**Counts in prose I rewrote.** `AGENTS.md` § Writing forbids stating a count and says to delete one
found. The refuter's operative text for reason-subj-3 keeps "seven always-present self-owning manager
properties". `AGENTS.md` outranks the brief, so where a row already had me rewriting the sentence I
dropped the count ("always-present self-owning manager properties", "cascades to every manager").
Sentences no row touches keep theirs. The residue is in `guides/reason.md` § Entities and
`src/core/factories.ts`.

**Two `just` sites neither lane named.** The refuter's `just` sweep claimed completeness and listed
`SymbolicReasoner.ts:177`, `helpers.ts:967`, and `guides:940`. It missed `guides/reason.md:575` ("it
just makes `success` false") and `:1035` ("not just successes"), both the filler sense the row bans,
both in a file the row already had me rewriting. I fixed them under reason-subj-8's rule and record
the instrument gap here.

**`SubjectBuilderInterface.remove` left without a `remove(): void` row.** reason-subj-11 raises it and
hands the decision to the Orchestrator; the row's Where names only the seven manager sites. I did not
add it. The interface owns `clear`, and the batch rule keeps both, so this is a live question for the
next round.

Findings outside the enumerated scope, recorded rather than fixed:

- **`factories.ts` states defaults in free prose.** reason-subj-16's Where and the refuter's
  population name `types.ts` and `constants.ts` only, but `src/core/factories.ts` carries the same
  `defaults to …` form at roughly two dozen sites (the entity-factory `@remarks` blocks and the
  value-factory `name defaults to the id` lines). The rule reaches them; the row does not.
- **`via` in `tests/**` prose.** reason-subj-8's Where names `src/**` and `guides/reason.md`. Test
  describe strings and comments still carry `via` at `validators.test.ts:365, :438`,
  `SubjectBuilder.test.ts:15`, `InferentialReasoner.test.ts:1215, :1658, :1719`,
  `QuantitativeReasoner.test.ts:1420`, `LogicalReasoner.test.ts:31, :132, :912`,
  `Reason.test.ts:744`, and `helpers.test.ts:337, :419, :1159, :1633`.
- **`simplest` at `tests/setup.ts:159`.** A superlative used as a claim, which
  `.claude/rules/writing.md` § Claims and time bans. Outside every row's Where.

Ancillary decisions taken and carried on from, per the deviation contract: `e.g.` → `for example` at
`guides/reason.md` § Narrowing untrusted definitions, in a sentence reason-subj-1 already had me
rewriting; the `Returns` column for the overloaded manager `remove` written as `boolean \| void`; and
the placement of the `flagship fences` block after the manifest loop in `tests/guides.test.ts`.

## Fix round 1

Closes the first audit round's refutation of claim 4 and its findings F-1 to F-4, from
`/home/user/scaffold/.orkestrel/campaign/conform/units/l2a/reason-objective-r1.md`.

**reason-fix1-1 (claim 4, reason-obj-2).** `guides/reason.md:932` set back to
`// 40 — (10 + 25) + 5` and `tests/guides.test.ts:453` to `expect(result.value).toBe(40)`;
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides
tests/guides.test.ts` into `reason-obj-2-before.txt` read 1 failed, 93 passed, the named assertion
failing `expected 41 to be 40`. Both lines restored to `41`; the same command into
`reason-obj-2-after.txt` read 94 passed. Added to the failing-first table below.

**reason-fix1-2 (claim 4, reason-obj-1's parser suite).** `src/core/parsers.ts`'s
`parseDefinition` temporarily called `parseJSONAs(json, (value): value is Definition =>
isDefinition(value) || (typeof value === 'object' && value !== null && 'reasoning' in value))` in
place of `parseJSONAs(json, isDefinition)`, accepting any object carrying a `reasoning` key
regardless of the exact-record check. `npx vitest run --config vite.config.ts --no-cache
--reporter=dot --project src:core tests/src/core/parsers.test.ts` into
`reason-obj-1-parsers-control.txt` read 3 failed, 6 passed, including "refuses a definition
carrying an extra key — the records are EXACT". The line was restored to
`parseJSONAs(json, isDefinition)`; the same command into `reason-obj-1-parsers-after.txt` read 9
passed. `git diff` over `src/core/parsers.ts` after restoration shows no hunk. Added to the
failing-first table below under `reason-obj-1`.

**reason-fix1-3 (F-1).** The re-propagation sentence in § Shared-file patches now reads: "Every row
that names `guides/reason.md` moved it. Copy the file verbatim into
`/home/user/fleet/{program,interpret,rater,qualifier,brief}/guides/reason.md`."

**reason-fix1-4 (F-2).** Added under § Breaking, below. Grep verified first: pattern
`is written through an array path AND also read through an array path` over `/home/user/fleet`
excluding `node_modules` returns `guides/reason.md`, `tests/src/core/reasoners/LogicalReasoner.test.ts`,
and `src/core/reasoners/LogicalReasoner.ts`, all inside this package; pattern
`Derived \$\{derivedFact\.predicate\}` over the same scope returns only
`src/core/reasoners/InferentialReasoner.ts`. Neither string appears in another consumer's tree yet;
the five vendored `guides/reason.md` mirrors do not carry it either, because the verbatim
re-propagation reason-fix1-3 names has not been applied to those trees.

**reason-fix1-5 (F-3).** Ran the four patterns over `src/**` and `tests/**` (excluding the vendored
`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`), `README.md`,
`guides/reason.md`, `guides/README.md`, and recorded the true results rather than forcing them
into "Empty": two patterns are genuinely empty, and two return a hit each, both false positives of
the pattern text against surviving current code, not survivals of a removed form. Appended to
`sweeps.txt` and reflected in § Sweeps below.

- `remove\((id|name|groupId[^)]*): string\): void` — 2 hits: `src/core/types.ts:980` and
  `src/core/builders/managers/FactorManager.ts:102`, both `remove(groupId: string): void` — the
  current no-argument clear-all overload of `FactorManagerInterface.remove`
  (`types.ts:978-980`), not the old single-id `remove(id: string): void` / `remove(name: string):
  void` the pattern's `[^)]*` also matches by accepting zero extra characters after `groupId`.
  Ruled: not a survival of a removed form.
- `subjectToFacts\(subject: Subject, trace` — empty.
- `(factToArityKey|factToKey|instantiateFact|findUnboundVariables)\(source` — empty.
- `premises: \[[^\]]*\], conclusion` — 1 hit: `tests/src/core/validators.test.ts:552`, an
  `isInference({ id: 'i1', name: 'i1', premises: [{}], conclusion: … })` fixture. `Inference`
  always carries both `premises` and `conclusion`; the pattern also matches that surviving type's
  literal, not only the removed `RuleResult` conclusion member. Ruled: not a survival of a removed
  form.

**reason-fix1-6 (F-4).** `guides/reason.md:583` now reads `runtime behavior around duplicates`.

### Failing-first proofs, appended

| Rows                                | Command                                                                                                                          | Before               | After              |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------------------- |
| reason-obj-2                        | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides tests/guides.test.ts`                        | 1 failed, 93 passed  | 94 passed, exit 0  |
| reason-obj-1 (`parsers.test.ts`)    | `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/parsers.test.ts`            | 3 failed, 6 passed   | 9 passed, exit 0   |

Evidence files, in `/home/user/work/evidence/reason-proofs/`: `reason-obj-2-before.txt`,
`reason-obj-2-after.txt`, `reason-obj-1-parsers-control.txt`, `reason-obj-1-parsers-after.txt`,
`gate-format-check.txt`.

### § Sweeps, appended

Empty, appended: `subjectToFacts\(subject: Subject, trace`,
`(factToArityKey|factToKey|instantiateFact|findUnboundVariables)\(source`.

Non-empty, ruled: `remove\((id|name|groupId[^)]*): string\): void` (2 hits, the current
`FactorManagerInterface.remove(groupId: string): void` overload, not a removed form) and
`premises: \[[^\]]*\], conclusion` (1 hit, a surviving `Inference` literal, not the removed
`RuleResult.conclusion` member). See reason-fix1-5.

### § Breaking, appended

**The two `via` → `through` runtime message strings (reason-subj-8).** Consumer-observable, absent
from the original § Breaking. `src/core/reasoners/LogicalReasoner.ts:126` and
`src/core/reasoners/InferentialReasoner.ts:299` now emit `through` where they emitted `via`;
`guides/reason.md:1063` quotes the first verbatim. No consumer edit. Grep over `/home/user/fleet`
excluding `node_modules` finds these strings only in this package's source and tests and in the
five vendored `guides/reason.md` mirrors, which the verbatim re-propagation carries.

### Gates

| Command                | Exit | Reading                                                                 |
| ----------------------- | ---- | ------------------------------------------------------------------------- |
| `npm run format:check` | 0    | `gate-format-check.txt` — no output, all files correctly formatted      |
| `npm run lint:check`   | 0    | no output                                                               |
| `npm run check`        | 0    | root `tsc --noEmit` then `check:src:core`, both silent                  |
| `npm run build`        | 0    | `✓ 27 modules transformed`, `dist/src/core/index.cjs 250.67 kB`         |
| `npm test`             | 0    | `src:core` 1202, `policy` 111, `config` 46, `setup` 26, `guides` 94 — every project green |

`npm run test:guides` alone (guides project) read 94 passed, exit 0. `git -C /home/user/fleet/reason
diff` over `src/core/parsers.ts` and `tests/guides.test.ts` shows `src/core/parsers.ts` unchanged and
`tests/guides.test.ts` carrying only the unit's own hunks (the row 1 control was restored to `41`).
`git -C /home/user/fleet/reason status --short` still lists 51 entries, unchanged from dispatch.
