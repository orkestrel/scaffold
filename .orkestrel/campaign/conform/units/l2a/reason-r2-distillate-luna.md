## Question

For every `unit conform-reason` row, what the tree contains, what the diff changed, and whether the report matches the evidence.

## Evidence

### Per-row evidence

- **reason-subj-1** — Site now: the cited guide and test locations no longer contain `§N`; representative current lines are `guides/reason.md:25` (`parseNumber-coerced`), `:38` (`reasoning` names the axis), `:66` (`typed emitter`), `:82` (workspace builders), and `guides/README.md:39` (`AGENTS.md` — the rules). The cited `tests/setup.ts` and test-file clauses likewise retain their surrounding prose without citations. Diff: guide hunks include `@@ -3 +3 @@`, `@@ -25 +25 @@`, `@@ -38 +38 @@`, `@@ -66 +66 @@`, `@@ -82 +82 @@`, `@@ -1107 +1106 @@`; `guides/README.md` has `@@ -3 +3 @@` and `@@ -39 +39 @@`; test hunks are present in `tests/setup.ts` and every named test file. The deleted citation text is absent from all `+` lines. Sweep: `§[0-9]` and `AGENTS\s*§` over `src/**`, `tests/**` excluding vendored tests, both guides, and `README.md`: no hit. The five consumer guide mirrors remain stale; for example, `qualifier/guides/reason.md:3`, `:25`, and `:38` still contain the removed forms. Report: `applied` — “Every `§N` / `AGENTS §N` citation deleted...” (`conform-reason-report.md:12`). The package tree matches that sentence, but the required mirror propagation is absent. Proof: documentation sweep agrees for the package; no dedicated control file exists. **Report match: no.**

- **reason-subj-2** — Site now: `README.md:3` starts “A synchronous, deterministic reasoning engine”; `guides/reason.md:3` has the same wording; `src/core/types.ts:5` reads `// A synchronous, deterministic reasoning engine.` Diff: `README.md @@ -3 +3 @@`, `guides/reason.md @@ -3 +3 @@`, and `types.ts @@ -5 +5 @@`; `zero-dependency` is absent from all additions. Sweep: case-insensitive `\bzero-dependenc(y|ies|y-related)\b` over the package source, tests, guides, and README: no hit. The consumer mirrors still contain `zero-dependency`, for example `qualifier/guides/reason.md:3`. Report: `applied` — “`zero-dependency` dropped...” (`conform-reason-report.md:13`). The package tree agrees, but mirror propagation is absent. Proof: no behavioral control; placement/documentation sweep agrees locally. **Report match: no.**

- **reason-subj-3** — Site now: `src/core/types.ts:880` says “each is a SELF-OWNING manager”; `types.ts:1363` describes the builder through self-owning manager properties; `SubjectBuilder.ts:15` says “one flat key-value collection, no managers”; `DefinitionBuilder.ts:47` says “through always-present self-owning manager properties”; `guides/reason.md:5`, `:82`, and `:900` contain no `taverna` references. Diff: `types.ts @@ -878,3 +880,2 @@`, `@@ -1308,3 +1363,3 @@`; `SubjectBuilder.ts @@ -15,3 +15,2 @@`; `DefinitionBuilder.ts @@ -46,4 +46,4 @@` and `@@ -58,5 +58,5 @@`; guide hunks `@@ -5 +5 @@`, `@@ -82 +82 @@`, and `@@ -901 +900 @@`. Sweep: case-insensitive `taverna|InstructionManager|AgentContext|Workspace` over `src/**`, `tests/**`, the package guides, and README: no old-name hit; unrelated `shaped` uses remain in test prose and are not the removed external names. Report: `applied` — “Every `taverna X-shaped` clause...” (`conform-reason-report.md:14`). Local tree agrees; consumer mirrors still carry the old clauses. Proof: no control file; naming sweep agrees locally. **Report match: no.**

- **reason-subj-4** — Site now: `guides/reason.md:582` is removed; `:583` begins “These runtime rules hold alongside the numbered invariants”; `LogicalReasoner.ts:274` reads `// VACUOUSLY (forward reports it instead).` No `scsr` remains in package source or tests. Diff: guide `@@ -582,3 +583 @@`; `LogicalReasoner.ts @@ -255 +274 @@`; test hunks update prose and runtime strings. Sweep: case-insensitive `scsr` over package source, tests, guides, and README: no hit. Consumer mirrors still contain the deleted porting paragraphs, for example `qualifier/guides/reason.md:560-562`. Report: `applied` — “The `scsr` porting paragraph deleted...” (`conform-reason-report.md:15`). Local tree agrees; mirror propagation is absent. Proof: the report names `reason-subj-5-subj-8-before.txt` and `...after.txt`; those files exist and record `12 failed, 265 passed` before and `277 passed` after. **Report match: no.**

- **reason-subj-5** — Site now: `RuleResult` has only `id`, `applied`, and `premises` at `src/core/types.ts:542-545`; `LogicalReasoner.ts:218` tests only `ruleResult.applied`; `:249` and `:317` derive the logical conclusion from `.applied`; literals at `:362`, `:463`, `:608`, `:611`, and `:618` omit `conclusion`; `validators.ts:978-985` validates only the three published members; `guides/reason.md:343` says `{ id, applied, premises }`. Diff: `types.ts @@ -544 +545,0 @@`; `LogicalReasoner.ts @@ -199 +218 @@`, `@@ -230 +249 @@`, `@@ -343,6 +362 @@`, `@@ -449,6 +463 @@`, `@@ -595,2 +604,2 @@`, `@@ -599 +608 @@`, `@@ -602 +611 @@`, `@@ -610,6 +618 @@`; validator `@@ -984,2 +984 @@`; guide `@@ -342 +343 @@`. Repair text is present in the `+` lines. Sweep: `RuleResult` literals containing `conclusion` and `readonly conclusion: boolean` in package source/tests: no hit; surviving logical-result `conclusion` fields are valid. Report: `applied` — “`RuleResult.conclusion` removed...” (`conform-reason-report.md:16`). The tree agrees. Proof: `reason-subj-5-subj-8-before.txt` records `12 failed, 265 passed`; `reason-subj-5-subj-8-after.txt` records `277 passed`; the named control exists. **Report match: yes.**

- **reason-subj-6** — Site now: all classes exported by `src/core/index.ts:8-24`, except internal `Collection`, have `@example` blocks. Examples begin at `Reason.ts:37`, `Evaluator.ts:20`, `Transformer.ts:19`, `Aggregator.ts:19`, the four reasoners at `QuantitativeReasoner.ts:45`, `LogicalReasoner.ts:51`, `SymbolicReasoner.ts:43`, `InferentialReasoner.ts:57`, the builders at `DefinitionBuilder.ts:65` and `SubjectBuilder.ts:39`, and the seven managers at their respective `@example` lines. The index actually exports 17 classes, with 16 public class examples; the brief/report’s “15” count is inaccurate. Diff: each class file has an insertion hunk, such as `Reason.ts @@ -35,0 +36,28 @@`, `Transformer.ts @@ -15,0 +18,9 @@`, and manager insertions beginning at `@@ -22,0 +... @@`. All examples import from `@orkestrel/reason`; `Collection` remains without one. Sweep: `@example` over the barrelled class files confirms the examples; no old class form is being removed. Report: `applied` — “One `@example` added to each barrelled class block...” (`conform-reason-report.md:19`). The substantive reading matches; its class count does not. Proof: no control file; class/example placement inspection agrees. **Report match: yes, with count discrepancy.**

- **reason-subj-7** — Site now: `src/core/types.ts:1459` says `` `fields()` returns the live record and `build()` returns a fresh copy of it ``; `SubjectBuilder.ts:20-21` says “the builder is id-ful: `build()` carries that `id` and `clear()` restores it.” Diff: `types.ts @@ -1404,2 +1459,2 @@`; `SubjectBuilder.ts @@ -21 +20,2 @@`. Sweep: case-insensitive `currently|now|as before` over package source, tests, guides, and README: no hit. Report: `applied` — “`currently` and `as before` replaced...” (`conform-reason-report.md:20`). The tree agrees. Proof: no control file; placement/TSDoc sweep agrees. **Report match: yes.**

- **reason-subj-8** — Site now: source `via` prose is replaced by `through`; the two runtime strings are at `LogicalReasoner.ts:126` and `InferentialReasoner.ts:299`; the guide quotes the first at `guides/reason.md:1063`. `simply` and the targeted `just` sites are removed. Diff: source hunks include `types.ts @@ -621 +622 @@`, `helpers.ts @@ -1001,2 +1035,2 @@`, `LogicalReasoner.ts @@ -107 +126 @@`, and `InferentialReasoner.ts @@ -267 +299 @@`; guide hunks include `@@ -1011 +1010 @@` and `@@ -1064 +1063 @@`. Sweep: `\bvia\b` has no hit in source or package guide prose, but remains in test prose at `helpers.test.ts:337,419,1159,1633`, `Reason.test.ts:744`, `LogicalReasoner.test.ts:31,132,912`, `InferentialReasoner.test.ts:1215,1658,1719`, `QuantitativeReasoner.test.ts:1420`, `SubjectBuilder.test.ts:15`, and `validators.test.ts:365,438`. `\bsimply\b` remains at `QuantitativeReasoner.test.ts:672`; `\bjust\b` remains in test prose at `LogicalReasoner.test.ts:339` and `InferentialReasoner.test.ts:956`. Report: `applied` — “`via` → `through`, `simply` / `just` deleted...” (`conform-reason-report.md:21`). The package source and guide sentence agree, but the specified mirror propagation is absent and the test-prose sweep is non-empty. **Report match: no.**

- **reason-subj-9** — Site now: `guides/reason.md:939` says “an authoring surface gates its own verbs”; `:1079` says “offer only the current kind’s verbs on an authoring surface.” Diff: `@@ -940 +939 @@` and `@@ -1080 +1079 @@`. Sweep: `\bshould\b` over package source, tests, guides, and README: no hit. Consumer mirrors still contain `should`, for example `qualifier/guides/reason.md:896` and `:991`. Report: `applied` — “Both `should` recommendations rewritten...” (`conform-reason-report.md:22`). Local tree agrees; mirror propagation is absent. **Report match: no.**

- **reason-subj-10** — Site now: `LogicalChainingResult` is at `src/core/types.ts:1325`; `InferentialChainingResult` at `:1339`; implementation annotations are at `LogicalReasoner.ts:182,261` and `InferentialReasoner.ts:218,321`; guide rows are `guides/reason.md:338-339`. Diff: type renames `@@ -1270 +1325 @@` and `@@ -1284 +1339 @@`; implementation import/annotation hunks are present; guide `@@ -337,2 +338,2 @@`. Sweep: word-boundary `LogicalChainingOutcome|InferentialChainingOutcome` over package source, tests, guides, README, and the named consumer trees: no hit. Report: `applied` — “`LogicalChainingOutcome` → `LogicalChainingResult`...” (`conform-reason-report.md:23`). The tree agrees. Proof: no behavioral control file; old-name sweep agrees. **Report match: yes.**

- **reason-subj-11** — Site now: manager interfaces carry the batch family at `types.ts:916-918`, `:978-980`, `:1031-1033`, `:1085-1087`, `:1137-1139`, `:1191-1193`, and `:1243-1245`; manager implementations use the same overloads, for example `GroupManager.ts:81-99` and `VariableManager.ts:75-98`. `Collection.ts:64-69` returns whether a single id existed, but it still declares only `remove(id: string): boolean`; it has no no-argument `remove()` path. Diff: manager batch hunks begin at `GroupManager.ts @@ -60,3 +80,19 @@`, `FactorManager.ts @@ -71 +99,5 @@`, and corresponding hunks in the other five managers; `Collection.ts` only has `@@ -62 +64 @@`, `@@ -63,0 +66 @@`, and `@@ -64,0 +68 @@`. The manager repair text is present, but the Collection no-argument repair is absent. Sweep: old `remove(id: string): void` forms are gone from manager interfaces/implementations; `Collection.ts:64` is the remaining point form. Report: `applied` — “Every manager's `remove` is now the batch family; `Collection.remove` reports whether the id existed.” (`conform-reason-report.md:24`). The stated manager reading matches, but the operative Collection repair does not. Proof: `reason-subj-11-control.txt` exists and records `16 failed, 109 passed`; `reason-obj-1-subj-11-after.txt` records `134 passed`. **Report match: no.**

- **reason-subj-13** — Site now: the five interfaces use domain parameters at `types.ts:916` (`groups`), `:1031` (`rules`), `:1085` (`equations`), `:1137` (`facts`), and `:1191` (`inferences`); implementations match. `Collection.ts:44` intentionally retains `seat(items: readonly T[])`. Diff: parameter-renaming hunks appear in the five manager files and `types.ts`; `Collection.ts` has no parameter rename. Sweep: scoped old signatures `seat(items: readonly FactorGroup[]|Rule[]|Equation[]|Fact[]|Inference[])` over source and tests: no hit. The only `seat(items...)` hit is the generic `Collection.ts:44`. Report: `applied` — “The five `seat(items: …)` signatures and implementations renamed...” (`conform-reason-report.md:26`). Tree and report agree. **Report match: yes.**

- **reason-subj-15** — Site now: `README.md:25` reads `- Node.js >= 22.12.0, matching the package engine declaration`; `package.json:91-93` remains the matching engine declaration. Diff: `README.md @@ -25 +25 @@`. Sweep: `Node\.js >= 24` over package source, tests, guides, and README: no hit. Report: `applied` — “`README.md:25` now reads...” (`conform-reason-report.md:27`). Tree agrees. **Report match: yes.**

- **reason-subj-16** — Site now: `Default: ...` appears throughout `types.ts`, including `:147`, `:230-231`, `:254`, `:278`, `:281`, `:318`, `:338`, `:405`, `:425`, `:442`, `:461`, and option blocks through `:1405`; constants use the fixed form at `constants.ts:8-52`. Diff: representative hunks are `types.ts @@ -146,3 +146,3 @@`, `@@ -230,2 +230,2 @@`, `@@ -537,2 +539,2 @@`, and the constants default-block insertions. Sweep: `\(default ` over package source, tests, guides, and README: no hit. `defaults to` remains in out-of-scope `src/core/factories.ts:81,103,124,145,174-175,200,225,282,316,349,402,425,448,471,494,518,587,735,768,774,798,909,938,962,987,1010,1039,1070,1101,1132`. Report: `applied` — “Every stated default in `types.ts` and `constants.ts` rewritten...” (`conform-reason-report.md:28`). The scoped tree agrees. **Report match: yes.**

- **reason-obj-1** — Site now: `tests/src/core/parsers.test.ts` exists, and all manager mirrors exist under `tests/src/core/builders/managers/`; their additions begin at line 1. Diff: each new file has `@@ -0,0 +1,... @@`, including `parsers.test.ts @@ -0,0 +1,99 @@` and the eight manager test files. The tests include parser exactness, manager accessors, write verbs, events, destruction, and batch removal. Sweep: mirrored source paths exist for `src/core/parsers.ts` and all manager classes; corresponding test paths now exist. Report: `applied` — “`parsers.test.ts` and the whole ... mirror created.” (`conform-reason-report.md:29`). The tree agrees. Proof: `reason-obj-1-parsers-control.txt` records `3 failed, 6 passed`; `reason-obj-1-parsers-after.txt` records `9 passed`; `reason-obj-1-subj-11-after.txt` records `134 passed`. **Report match: yes.**

- **reason-obj-2** — Site now: `tests/guides.test.ts:210-509` contains the `describe('flagship fences')` block. It asserts values such as `:228` = 35, `:258` = 144, `:287-288` = 21.1312 and 21.1313, `:320` = true, `:355` = `{ net: 20, discount: 2 }`, and `:453` = 41. `guides/reason.md:932` now says `// 41 — 1 + (10 + 25) + 5`. Diff: `tests/guides.test.ts @@ -5,0 +6,38 @@` and `@@ -170,0 +210,300 @@`; guide `@@ -933 +932 @@`. Report: `applied` — “`flagship fences` added... it caught one stale guide value...” (`conform-reason-report.md:30`). The tree agrees. Proof: `reason-obj-2-before.txt` records `1 failed, 93 passed`; `reason-obj-2-after.txt` records `94 passed`. **Report match: yes.**

- **reason-obj-3** — Site now: `helpers.ts:650-674` returns `{ facts, trace }`, with readonly members; the former `Fact[]` return and caller-owned trace parameter are absent. Diff: `helpers.ts @@ -638,2 +641 @@`, `@@ -645,2 +647 @@`, `@@ -649 +650,4 @@`, and `@@ -668 +673 @@`; caller update at `InferentialReasoner.ts:193-198`. Sweep: `subjectToFacts\(subject: Subject, trace` over source/tests/guides/README: no hit. Report: `applied` — “`subjectToFacts` returns `readonly Fact[]`, landed with reason-obj-5...” (`conform-reason-report.md:31`). The tree has the amended object return from reason-obj-5, so the report’s shorter description is incomplete but not contradictory. Proof: grouped control exists and records `9 failed, 193 passed` before and `202 passed` after. **Report match: yes.**

- **reason-obj-4** — Site now: `helpers.ts:409` returns `ReadonlyMap<string, readonly Fact[]>`; `InferentialReasoner.ts:243-244` copies each bucket into `new Map<string, Fact[]>` before later `push` operations. Diff: `helpers.ts @@ -399 +409 @@` and `@@ -406 +409 @@`; reasoner `@@ -211,2 +240,5 @@`. Sweep: old `indexByArity(...): Map<string, Fact[]>` signature: no hit. Report: `applied` — “`indexByArity` returns `ReadonlyMap...`; the reasoner seeds a bucket copy...” (`conform-reason-report.md:32`). Tree agrees. Proof: no dedicated failing-first entry names reason-obj-4; the grouped helper control does not fail specifically on this type/copy change. **Report match: yes for the tree, incomplete for proof evidence.**

- **reason-obj-5** — Site now: `helpers.ts:38-41` names the `termToKey` / `factToKey` identity-ledger exception; `subjectToFacts` is the object-returning function at `:650`; `InferentialReasoner.ts:193-198` pushes `injected.trace` and passes `injected.facts`. Diff: header `helpers.ts @@ -38 +38,4 @@`; function `@@ -638,2 +641 @@`, `@@ -649 +650,4 @@`, and `@@ -668 +673 @@`; caller `InferentialReasoner.ts @@ -165 +193,2 @@`. Sweep: old `trace: string[]` subject accumulator signature and old mutation wording: no hit; identity-ledger mutation remains intentionally named. Report: `applied` — “`subjectToFacts` takes no caller-owned `trace`; the header names the identity ledger...” (`conform-reason-report.md:33`). Tree agrees. Proof: grouped control records `9 failed, 193 passed` before and `202 passed` after. **Report match: yes.**

- **reason-obj-7** — Site now: `helpers.ts:919-946` contains exported `resolveOperand`; `Transformer.ts:40-48` guards with `isMathOperation` and delegates to `applyOperation` plus `resolveOperand`. Diff: helper insertion `@@ -913,0 +919,29 @@`; Transformer import insertion `@@ -1,0 +2,2 @@` and replacement `@@ -29,33 +40,8 @@`. Sweep: the duplicated 13-arm Transformer switch is absent; `applyOperation` remains the single arithmetic implementation. Report: `applied` — “`resolveOperand` added beside `applyOperation`; `Transformer.apply` composes...” (`conform-reason-report.md:34`). Tree agrees. Proof: grouped control records `9 failed, 193 passed` before and `202 passed` after. **Report match: yes.**

- **reason-obj-8** — Site now: guide positional references use named sections or preceding/following wording, for example `guides/reason.md:128` names `§ Validators`, `:161` names `§ Entities`, `:667` says “preceding float noise”, and `:791`, `:826-827` name preceding fences. Source comments use `helpers.ts:1195`, `:2308`, `factories.ts:514`, and `Aggregator.ts:75`. Code tokens and quantity wording remain at guide `:302`, `:644-645`, `:725`, `:742`, and types `:74,85-86,99`. Diff: guide hunks include `@@ -128 +128 @@`, `@@ -161 +162 @@`, `@@ -582,3 +583 @@`, `@@ -658 +657 @@`, `@@ -668 +667 @@`, `@@ -792 +791 @@`, and `@@ -827,2 +826,2 @@`; source hunks include the listed comment replacements. Sweep: prose-direction old references are absent; remaining `above`/`below` hits are code tokens or the quantity phrase `below two operands`. The five consumer mirrors remain stale. Report: `applied` — “Every positional `above` / `below` replaced...” (`conform-reason-report.md:35`). Local tree agrees; mirror propagation is absent. Proof: no control file; positional sweep agrees locally. **Report match: no.**

- **reason-obj-9** — Site now: `helpers.ts:381` uses `fact`, `:484` uses `fact`, `:572` uses `fact`, and `:702` uses `inference`; matching `@param` lines are `:370`, `:471`, `:561`, and `:690`. Diff: hunks `@@ -378,3 +381,3 @@`, `@@ -481 +484 @@`, `@@ -569,2 +572,2 @@`, and `@@ -697 +702 @@`. Sweep: `(factToArityKey|factToKey|instantiateFact|findUnboundVariables)\(source` and matching `@param source` in those blocks: no hit. The unrelated `resolveSource` parameter remains valid at `helpers.ts:177`. Report: `applied` — “`source` renamed to `fact` / `inference`...” (`conform-reason-report.md:36`). Tree agrees. **Report match: yes.**

- **reason-obj-10** — Site now: direct `seat` cases exist in `EquationManager.test.ts:150-162`, `FactManager.test.ts:141-153`, and `InferenceManager.test.ts:153-165`, including silent recorder checks and post-destroy errors. Diff: each file has a hunk around its new direct seat block; the existing DefinitionBuilder block remains unchanged. Sweep: direct calls on `equations`, `facts`, and `inferences` now exist. Report: `applied` — “Direct `seat` cases added... the builder block left unchanged.” (`conform-reason-report.md:37`). Tree agrees. Proof: covered by the manager control/after files; no separate row-specific control exists. **Report match: yes.**

### Across the unit

#### Scope

`conform-reason.status` lists only owned paths: `README.md`, `guides/README.md`, `guides/reason.md`, `src/core/**`, and `tests/**` excluding the three vendored test files. No shared fleet checkout, off-limits file, `package-lock.json`, or `node_modules/**` appears. Every diff file is named by at least one row’s `Where`; there is no unassigned diff hunk. The new test hunks are `tests/guides.test.ts @@ -5,0 +6,38 @@`, `@@ -170,0 +210,300 @@`, the eight manager files’ `@@ -0,0 +1,... @@`, and `parsers.test.ts @@ -0,0 +1,99 @@`.

#### Residue

Diff `+`-line sweep:

- `guides/reason.md:1017`: `console.error(...)`
- `guides/reason.md:1018`: `console.warn(...)`

Tree sweep over `src/**` and `tests/**`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`:

- `src/core/factories.ts:267`: `console.log(...)`

No other `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` hit occurred in that population.

#### Parity

| Entity | Interface members in `src/core/types.ts` | Guide Methods rows | Readonly data properties and guide surface |
|---|---|---|---|
| `Reason` | `supports`, `validate`, `reason` — `types.ts:778-780`; class interface adds `reason`, `register`, `reasoner`, `reasoners`, `supports`, `validate`, `destroy` — `:868-875` | `guides/reason.md:400-408` | `emitter` at `types.ts:866`; guide Surface row `:66` |
| `Reasoner` | `supports`, `validate`, `reason` — `types.ts:778-780`; `id`, `reasoning` — `:776-777` | `guides/reason.md:415-420` | `id`, `reasoning`; Surface rows for the four reasoners at `:72-75` |
| `Evaluator` | `evaluate`, `batch` — `types.ts:729-730` | `guides/reason.md:423-427` | `id` at `types.ts:728`; Surface row `:68` |
| `Transformer` | `apply`, `chain` — `types.ts:743-744` | `guides/reason.md:430-434` | `id` at `:742`; Surface row `:69` |
| `Aggregator` | `aggregate` — `types.ts:757-761` | `guides/reason.md:436-439` | `id` at `:756`; Surface row `:70` |
| `GroupManager` | `group`, `groups`, `append`, `prepend`, `replace`, three `remove` overloads, `seat`, `destroy` — `types.ts:910-920` | `guides/reason.md:445-456` | `emitter` at `:909`; Surface row `:365` |
| `FactorManager` | `factor`, `factors`, `append`, `prepend`, `replace`, three locator-aware `remove` overloads, `destroy` — `types.ts:972-981` | `guides/reason.md:461-467` | `emitter` at `:971`; Surface row `:368` |
| `RuleManager` | `rule`, `rules`, `append`, `prepend`, `replace`, three `remove` overloads, `seat`, `destroy` — `types.ts:1025-1035` | `guides/reason.md:474-482` | `emitter` at `:1024`; Surface row `:371` |
| `EquationManager` | `equation`, `equations`, `append`, `prepend`, `replace`, three `remove` overloads, `seat`, `destroy` — `types.ts:1079-1089` | `guides/reason.md:489-497` | `emitter` at `:1078`; Surface row `:374` |
| `FactManager` | `fact`, `facts`, `append`, `prepend`, `replace`, three `remove` overloads, `seat`, `destroy` — `types.ts:1131-1141` | `guides/reason.md:504-512` | `emitter` at `:1130`; Surface row `:377` |
| `InferenceManager` | `inference`, `inferences`, `append`, `prepend`, `replace`, three `remove` overloads, `seat`, `destroy` — `types.ts:1185-1195` | `guides/reason.md:519-527` | `emitter` at `:1184`; Surface row `:380` |
| `VariableManager` | `variable`, `variables`, `add`, three `remove` overloads, `seat`, `destroy` — `types.ts:1239-1247` | `guides/reason.md:534-541` | `emitter` at `:1238`; Surface row `:383` |
| `DefinitionBuilder` | `build`, `merge`, `clear`, `destroy` — `types.ts:1395-1398` | `guides/reason.md:548-553` | `id`, `reasoning`, `emitter`, and seven manager properties at `types.ts:1385-1394`; Surface rows `:386-390` |
| `SubjectBuilder` | `field`, `fields`, `set`, `remove`, `merge`, `clear`, `repeat`, `build`, `destroy` — `types.ts:1471-1481` | `guides/reason.md:560-568` | `id` is optional in the subject contract; `emitter` at `types.ts:1470`; Surface row `:393` |

The added guide identifiers `resolveOperand`, `LogicalChainingResult`, `InferentialChainingResult`, `RuleResult`, `subjectToFacts`, manager names, `DefinitionBuilder`, `SubjectBuilder`, `DEFAULT_PRECISION`, and the referenced factories resolve through the `src/core/index.ts` star exports at `:1-24`. The guide’s added runtime message references match `LogicalReasoner.ts:126` and `InferentialReasoner.ts:299`.

#### Gates

The report records these § Gates entries:

- `npm run format:check` — exit `0`; “All matched files use the correct format.”
- `npm run lint:check` — exit `0`; no output.
- `npm run check` — exit `0`; root `tsc --noEmit` and `check:src:core` were silent.
- `npm run build` — exit `0`; 27 modules transformed and `dist/src/core/index.cjs 250.67 kB`.
- `npm test` — exit `0`; the report records green `src:core`, `policy`, `config`, `setup`, and `guides` projects (`conform-reason-report.md:169-177`).

The gate evidence files exist. The build evidence also shows that `npm run build` removed and recreated `dist/`; the final status contains no `dist` path. No independent gate run was performed in this audit lane.

#### Breaking

The report names these entries:

- `RuleResult.conclusion` removed: required edits in `/home/user/fleet/brief/tests/setup.ts` and qualifier examples/tests, with no edits for consumers that use `LogicalResult.conclusion` (`conform-reason-report.md:190-220`).
- `LogicalChainingOutcome` and `InferentialChainingOutcome` renamed: no consumer hits.
- Manager `remove` family changed: no consumer manager calls or implementations.
- `subjectToFacts` and `indexByArity` signatures changed: no consumer hits.
- Runtime `via` strings changed to `through`: no consumer edit (`conform-reason-report.md:223-239`, `:386-393`).

Breaking-name sweep over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding `node_modules`, this repository, and vendored guide mirrors:

- `\bLogicalChainingOutcome\b`: no hit.
- `\bInferentialChainingOutcome\b`: no hit.
- `\bsubjectToFacts\b`: no hit.
- `\bindexByArity\b`: no hit.
- The broad `\bconclusion\b` sweep has many valid `LogicalResult` and unrelated-domain hits. Relevant `RuleResult`-shaped consumer literals remain at `qualifier/src/core/helpers.ts:437`, `qualifier/tests/src/core/helpers.test.ts:324,359,373,616`, and `brief/tests/setup.ts:29,37`; these are exactly the consumer edits named by the report. Other hits include `program/tests/setup.test.ts:123,128,672,713`, `program/tests/src/core/helpers.test.ts:903`, `mcp/tests/src/core/MCPServer.test.ts:6471`, `contract/tests/src/core/combinators.test.ts:529,535,536,578,580,581,627,632,634`, `contract/src/core/ShapeValidator.ts:145`, `contract/src/core/combinators.ts:501-502`, `contract/tests/setup.ts:1747`, `rater/tests/src/core/Rater.test.ts:371`, `qualifier/tests/setup.test.ts:67`, `qualifier/tests/src/core/helpers.test.ts:316,319,326,333,343,354,365,368,375,590,611`, `interpret/tests/src/core/Narrator.test.ts:232,243,273,296,422`, and the numerous valid `LogicalResult` uses in `brief/tests/**` and `brief/src/**`.

#### Writing sweep

Added prose-line substitutions:

- `guides/reason.md:38`: `in order to`
- `guides/reason.md:180`: `new`
- `guides/reason.md:478`: `new`
- `guides/reason.md:657`: `new dependency`
- `guides/reason.md:682`: `new dependency`
- `guides/reason.md:774`: `just`
- `src/core/builders/managers/RuleManager.ts:21`: `new`
- `tests/setup.ts:291`: ``new Array(length)``
- `tests/src/core/operators/Aggregator.test.ts:13`: `one options object`
- `tests/src/core/operators/Transformer.test.ts:12`: `one options object`

The substitutions are either permitted technical wording, code comments, temporal `just`, or pre-existing guide/test claims; they are still hits under the requested mechanical sweep.

## Distillate

- `reason-subj-1`: site now citations removed locally | diff present yes | old form hits 0 locally | report matches no
- `reason-subj-2`: non-zero-dependency wording locally removed | diff present yes | old form hits 0 locally | report matches no
- `reason-subj-3`: external repository names removed locally | diff present yes | old form hits 0 locally | report matches no
- `reason-subj-4`: `scsr` paragraph/comment removed locally | diff present yes | old form hits 0 locally | report matches no
- `reason-subj-5`: `RuleResult` has `{ id, applied, premises }` | diff present yes | old form hits 0 | report matches yes
- `reason-subj-6`: public classes have examples; `Collection` does not | diff present yes | old form hits 0 | report matches yes
- `reason-subj-7`: dated wording replaced | diff present yes | old form hits 0 | report matches yes
- `reason-subj-8`: source/guide substitutions applied; test prose remains | diff present yes | old form hits 16 | report matches no
- `reason-subj-9`: `should` removed locally | diff present yes | old form hits 0 locally | report matches no
- `reason-subj-10`: chaining types use `Result` | diff present yes | old form hits 0 | report matches yes
- `reason-subj-11`: manager batch family present; `Collection.remove()` lacks no-argument path | diff present yes | old form hits 1 | report matches no
- `reason-subj-13`: domain `seat` parameters present; generic Collection exception remains | diff present yes | old form hits 1 intentional | report matches yes
- `reason-subj-15`: README engine floor matches manifest | diff present yes | old form hits 0 | report matches yes
- `reason-subj-16`: scoped defaults use `Default:` | diff present yes | old form hits 0 for `(default ` | report matches yes
- `reason-obj-1`: parser and manager mirrors exist | diff present yes | old form hits 0 | report matches yes
- `reason-obj-2`: flagship fences execute asserted values | diff present yes | old form hits 0 | report matches yes
- `reason-obj-3`: `subjectToFacts` owns trace and returns readonly facts | diff present yes | old form hits 0 | report matches yes
- `reason-obj-4`: readonly index plus owned bucket copy | diff present yes | old form hits 0 | report matches yes
- `reason-obj-5`: caller-owned trace mutation removed | diff present yes | old form hits 0 | report matches yes
- `reason-obj-7`: operand resolution centralized | diff present yes | old form hits 0 | report matches yes
- `reason-obj-8`: positional prose references replaced locally | diff present yes | old form hits 0 prose hits; permitted code hits remain | report matches no
- `reason-obj-9`: helper parameters use domain nouns | diff present yes | old form hits 0 | report matches yes
- `reason-obj-10`: direct `seat` tests added | diff present yes | old form hits 0 | report matches yes
- `fleet-F1`: helper absent and browser environment absent | diff present no | old form hits 0 | report matches yes
- `fleet-F2`: no public `id` field precedes private fields | diff present no | old form hits 0 | report matches yes

Scope tags: all status paths are `owned`; no `shared` or `off-limits` status paths appear. No diff hunk is outside a row’s named `Where`.

Residue hits: added diff lines at `guides/reason.md:1017-1018`; tree hit at `src/core/factories.ts:267`.

Writing hits: `guides/reason.md:38,180,478,657,682,774`; `RuleManager.ts:21`; `tests/setup.ts:291`; `Aggregator.test.ts:13`; `Transformer.test.ts:12`.

Parity: interface method names and guide tables align for the listed entities except the documented `Collection` internal exception; `RuleResult.conclusion` is removed from the package contract; the guide’s public class count is numerically inaccurate.

## Unknowns

- Independent authoritative gate results were not obtained; the report’s gate files are recorded evidence, not a fresh landing run.
- The exact compiler impact of consumer fixture edits was not tested because those trees are shared/report-only and their installed package copies were not changed.
- The brief’s stated public-class count conflicts with `src/core/index.ts:8-24`, which exports 17 classes including no `Collection`; the tree has 16 public class examples.
- `Collection.remove()` no-argument semantics remain unresolved because the required implementation is absent from `Collection.ts:64-69`.
- The complete single-read of `conform-reason.diff` was unavailable because it exceeds the file-read limit; per-file diffs, hunk lists, and targeted sweeps were read instead.

## Journal

## Deviation

The report marks rows requiring consumer guide re-propagation as applied, but none of the five consumer guide mirrors appears in `conform-reason.status`; those mirrors retain the old text. `reason-subj-11` also lacks the required no-argument `Collection.remove()` path. The report omits a dedicated failing-first proof for reason-obj-4 and does not record the requested residue and writing sweeps in their own sections.