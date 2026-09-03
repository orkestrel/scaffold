## Question

What does the current tree carry for every conform-reason row, what did the diff change, and where does the report agree or diverge?

## Evidence

### reason-subj-1

- **Rule:** `.claude/rules/documentation.md`: “no guide, README, test, or source comment cites an `AGENTS §N` section (`AGENTS.md` numbers no section, so every such citation is stale and names nothing)”. Also: “`AGENTS.md` and its linked rules are the sole convention source. Do not create competing instruction copies in guides.”
- **Site now:** The listed guide, README, and test sites now retain their surrounding prose without numbered `AGENTS` citations. The See-also rows are `guides/reason.md:1107` and `guides/README.md:39`: ``[`AGENTS.md`](../AGENTS.md) — the rules.`` The only remaining `§` references in the package are named real rule-file sections in `src/core/helpers.ts:1163` and `:1166`.
- **Diff:** `guides/reason.md` hunks include `@@ -1,8 +1,8 @@`, `@@ -35,7 +35,7 @@`, `@@ -63,7 +63,7 @@`, `@@ -79,7 +79,7 @@`, `@@ -125,7 +125,7 @@`, `@@ -287,8 +288,8 @@`, `@@ -358,54 +359,54 @@`, and `@@ -1104,5 +1103,5 @@`. `guides/README.md` uses `@@ -36,4 +36,4 @@`. `tests/setup.ts` and the changed test files contain corresponding deletion hunks. The repair is present in the `+` lines.
- **Old-form sweep:** `\b§[0-9]\b`, case-insensitive, including inflection forms where applicable, over `src/**`, `tests/**` excluding the three vendored policy files, `guides/reason.md`, `guides/README.md`, and `README.md`: no hit.
- **Report:** `applied` — “Every `§N` / `AGENTS §N` citation deleted from the guide, the guide index, `tests/setup.ts`, and the named `tests/**` files.” The report’s reading matches the tree and `sweeps.txt:1-4`.
- **Proof:** Documentation/placement row. The recorded sweep agrees.

### reason-subj-2

- **Rule:** `.claude/rules/writing.md`: “Claim only what the reader can check.” `.claude/rules/documentation.md`: “Falsify a prose claim the way you falsify a code claim.”
- **Site now:** `README.md:3` says “A synchronous, deterministic **reasoning engine**”; `guides/reason.md:3` has the same wording; `src/core/types.ts:5` says `// A synchronous, deterministic reasoning engine.` `README.md:14` retains the environment-agnostic claim.
- **Diff:** `README.md` hunk `@@ -1,6 +1,6 @@`; `guides/reason.md` hunk `@@ -1,8 +1,8 @@`; `src/core/types.ts` hunk `@@ -2,7 +2,7 @@`. The exact replacement is present.
- **Old-form sweep:** `\bzero-dependency\b`, case-insensitive plural/verb-form sweep over the required package paths: no hit.
- **Report:** `applied` — “`zero-dependency` dropped from `README.md:3`, `guides/reason.md:3`, and the `types.ts` header.” Matches.
- **Proof:** Documentation row; `sweeps.txt:13-19` records no match.

### reason-subj-3

- **Rule:** `AGENTS.md`: “Never import assumptions, names, or logic from another repository.” `.claude/rules/writing.md`: “Claim only what the reader can check.”
- **Site now:** `src/core/types.ts:880-890` describes managers as self-owning package-local managers. `src/core/types.ts:1364-1368` describes the definition builder through always-present managers. `src/core/types.ts:1443-1447` describes the subject builder as one flat key-value collection. `SubjectBuilder.ts:15-17` has the same package-local description; `DefinitionBuilder.ts:47-50` names the scalar envelope and managers. `guides/reason.md:5`, `:82`, and `:900` contain no `taverna`, `AgentContext`, or `Workspace`-shaped comparison.
- **Diff:** Relevant hunks are `guides/reason.md @@ -1,8 +1,8 @@`, `@@ -79,7 +79,7 @@`, `src/core/types.ts @@ -875,15 +877,14 @@`, `@@ -1281,7 +1336,7 @@`, `@@ -1384,8 +1439,8 @@`, `SubjectBuilder.ts @@ -12,17 +12,17 @@`, and `DefinitionBuilder.ts @@ -43,24 +43,45 @@`. Replacement wording is present.
- **Old-form sweep:** `(?i)\b(taverna|AgentContext|Workspace)\b`, `taverna.*shaped`, and `shaped like.*AgentContext`, including plural/derived forms, over the required paths: no hit.
- **Report:** `applied` — “Every `taverna X-shaped` clause and the bare `shaped like AgentContext` restated in this package's own terms.” Matches.
- **Proof:** Naming/documentation sweep agrees.

### reason-subj-4

- **Rule:** `AGENTS.md`: “Never import assumptions, names, or logic from another repository.” `.claude/rules/documentation.md`: “Every backticked API in a guide resolves to a real public export.”
- **Site now:** `guides/reason.md:570-586` contains package invariants and present-tense behavior, with no `scsr`. `src/core/reasoners/LogicalReasoner.ts:274` says `// VACUOUSLY (forward reports it instead).` `guides/reason.md:1063` quotes the current overlay warning. Matching test assertions are at `tests/src/core/reasoners/LogicalReasoner.test.ts:144,184` and `InferentialReasoner.test.ts:426,1555-1557`.
- **Diff:** Guide hunk `@@ -570,18 +571,16 @@`; source hunk `@@ -252,7 +271,7 @@`; test hunks include `LogicalReasoner.test.ts @@ -32,8 +32,8 @@` and `@@ -141,7 +141,7 @@`, plus the inferential assertion hunks. The operative present-tense text and runtime strings are in the `+` lines.
- **Old-form sweep:** `(?i)\bscsr\b`, including plural/derived forms, over the required paths: no hit.
- **Report:** `applied` — “The `scsr` porting paragraph deleted, the divergence paragraph rewritten as present-tense rules, `scsr` gone from source and tests.” Matches.
- **Proof:** Documentation/runtime behavior was included in the recorded `reason-subj-5-subj-8-before.txt` and `after.txt`; the changed assertions are present.

### reason-subj-5

- **Rule:** `AGENTS.md`: “**Derive state.** Compute facts from existing fields. Do not store a second flag or label that can drift.”
- **Site now:** `src/core/types.ts:537-545` defines `RuleResult` with only `id`, `applied`, and `premises`. `LogicalResult.conclusion` remains at `src/core/types.ts:558` and is derived from the final rule’s `applied` at `src/core/reasoners/LogicalReasoner.ts:247-249`. `LogicalReasoner.ts:604-616` constructs no `RuleResult.conclusion`; the guard at `src/core/validators.ts:1095-1105` checks only the new shape.
- **Diff:** Type hunk `@@ -534,21 +536,20 @@`; logical implementation hunk `@@ -592,27 +601,21 @@`; validator hunk `@@ -981,8 +981,7 @@`; guide Surface hunk `@@ -334,12 +335,12 @@`. The `+` lines remove the redundant member and use `.applied`.
- **Old-form sweep:** `\bRuleResult\.conclusion\b` and the old `RuleResult` literal shape, case-insensitive with plural/derived forms, over the required paths: no hit. Legitimate `Rule.conclusion`, `LogicalResult.conclusion`, and chaining-result `conclusion` uses remain.
- **Report:** `applied` — “`RuleResult.conclusion` removed; `LogicalResult.conclusion` now derives from the last rule's `applied`.” Matches.
- **Proof:** `reason-subj-5-subj-8-before.txt`: 12 failed, 265 passed. `reason-subj-5-subj-8-after.txt`: 277 passed, exit 0. The report names the changed rule-result and runtime-string assertions.

### reason-subj-6

- **Rule:** `.claude/rules/architecture.md`: “A row obliges a documented, runnable example, so a class kept public without one is drift that parity cannot see.” `.claude/rules/typescript.md`: “Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable.”
- **Site now:** `@example` blocks exist in every barrelled implementation class: `Reason.ts:37`, `Evaluator.ts:20`, `Transformer.ts:19`, `Aggregator.ts:19`, the four reasoners at `:45`, `:51`, `:43`, `:57`, the two builders at `:65` and `:39`, and all seven managers at `:29-36` or `:30-44`. `Collection.ts` remains internal and has no example.
- **Diff:** Class-example hunks include `Reason.ts @@ -33,6 +33,34 @@`, `DefinitionBuilder.ts @@ -43,24 +43,45 @@`, `SubjectBuilder.ts @@ -35,6 +35,22 @@`, manager class hunks such as `GroupManager.ts @@ -17,9 +18,28 @@`, and corresponding operator/reasoner hunks. Examples import through `@orkestrel/reason`.
- **Old-form sweep:** No removed class-example form applies. `@example` is present for all 17 barrelled classes; no stale class lacking the example was found.
- **Report:** `applied` — “One `@example` added to each barrelled class block, importing through `@orkestrel/reason`; `Collection` left without one.” The substance matches. The report’s “15 classes” count is inaccurate: `src/core/index.ts:8-24` exports 17 classes, and all 17 carry examples.
- **Proof:** Placement/documentation row; `tests/guides.test.ts:128-139` checks method examples, and the source sweep confirms the class examples.

### reason-subj-7

- **Rule:** `.claude/rules/writing.md`: `currently`, `now` → “Delete, or give the date”. Also: “Write the present tense for what exists.”
- **Site now:** `src/core/types.ts:1459-1460` says ``fields()`` returns the live record and ``build()`` returns a fresh copy. `SubjectBuilder.ts:20-22` says the builder is id-ful and explains that `build()` carries the id and `clear()` restores it.
- **Diff:** Type hunk `@@ -1427,7 +1482,7 @@` and builder hunk `@@ -12,17 +12,17 @@`. Replacement text is present.
- **Old-form sweep:** `(?i)\bcurrently\b|\bas before\b|\bnow\b`, including inflections, over the required paths: no hit.
- **Report:** `applied` — “`currently` and `as before` replaced with the checkable difference each sentence was hedging.” Matches.
- **Proof:** Documentation sweep agrees.

### reason-subj-8

- **Rule:** `.claude/rules/writing.md`: `via` → “`through`, `by using`”; `simply`, `easy`, `just` → “Delete”.
- **Site now:** `src/core/helpers.ts:634-648`, `:1000-1005`, `:1473`, `:2018-2019`, `:2063`, `:2100`, and `:2142` use the revised wording. `LogicalReasoner.ts:126` and `InferentialReasoner.ts:299` contain the new runtime strings with `through`. The permitted quantity/temporal uses remain in `guides/reason.md:682` and `:774`.
- **Diff:** Relevant source hunks include `LogicalReasoner.ts @@ -101,10 +120,10 @@`, `InferentialReasoner.ts @@ -264,7 +296,7 @@`, helper prose hunks such as `@@ -35,7 +35,10 @@`, `@@ -1158,7 +1192,7 @@`, and guide hunks `@@ -665,7 +664,7 @@`, `@@ -1033,11 +1032,11 @@`. The two runtime replacement strings are present verbatim in `+` lines.
- **Old-form sweep:**  
  - `(?i)\bvia\b`: hits remain in test prose at `tests/src/core/validators.test.ts:365,438`, `SubjectBuilder.test.ts:15`, `InferentialReasoner.test.ts:1215,1658,1719`, `QuantitativeReasoner.test.ts:1420`, `LogicalReasoner.test.ts:31,132,912`, `Reason.test.ts:744`, and `helpers.test.ts:337,419,1159,1633`. No hit remains in `src/**` or package prose.
  - `(?i)\bsimply\b`: `tests/src/core/reasoners/QuantitativeReasoner.test.ts:672`.
  - `(?i)\bjust\b`: `guides/reason.md:682,774`, `tests/src/core/reasoners/LogicalReasoner.test.ts:339`, `QuantitativeReasoner.test.ts:672`, and `InferentialReasoner.test.ts:956`.
- **Report:** `applied` — “`via` → `through`, `simply` / `just` deleted across `src/**` and the guide, including the two runtime message strings.” The scoped source/guide reading matches; the broader package sweep has the test-prose exceptions recorded above.
- **Proof:** `reason-subj-5-subj-8-before.txt`: 12 failed, 265 passed. After: 277 passed, exit 0. Runtime message assertions are included.

### reason-subj-9

- **Rule:** `.claude/rules/writing.md`: `should` → “`must`, `can`, `might`, or the imperative”. Also: “Never write `should`, and never soften a recommendation into `We recommend`.”
- **Site now:** `guides/reason.md:940` uses “an authoring surface gates its own verbs”; `:1080` uses “offer only the current kind's verbs on an authoring surface.”
- **Diff:** Guide hunks `@@ -925,21 +924,21 @@` and `@@ -1077,7 +1076,7 @@`; imperative/present-tense replacements are in the `+` lines.
- **Old-form sweep:** `\bshould\b`, case-insensitive and inflected sweep over the required paths: no hit.
- **Report:** `applied` — “Both `should` recommendations rewritten as imperatives; § Practices left as the single home.” Matches.
- **Proof:** Documentation sweep agrees.

### reason-subj-10

- **Rule:** `.claude/rules/names.md`: “Outcome/output | `{Entity}Result`”. `AGENTS.md`: “**One concept, one term.** Do not alternate synonyms.”
- **Site now:** `src/core/types.ts:1325` exports `LogicalChainingResult`; `:1339` exports `InferentialChainingResult`. Imports/return annotations are at `LogicalReasoner.ts:5,182,261` and `InferentialReasoner.ts:5,218,321`. Guide Surface rows are `guides/reason.md:338-339`.
- **Diff:** Type hunk `@@ -1281,7 +1336,7 @@`; logical source hunks `@@ -2,7 +2,7 @@`, `@@ -160,7 +179,7 @@`, `@@ -239,7 +258,7 @@`; inferential source hunks `@@ -2,7 +2,7 @@`, `@@ -186,7 +215,7 @@`, and `@@ -286,7 +318,7 @@`. The renamed forms are present in `+` lines.
- **Old-form sweep:** `\bLogicalChainingOutcome\b|\bInferentialChainingOutcome\b`, case-insensitive with plural/derived forms, over the required paths: no hit.
- **Report:** `applied` — “`LogicalChainingOutcome` → `LogicalChainingResult`, `InferentialChainingOutcome` → `InferentialChainingResult`.” Matches.
- **Proof:** Naming sweep agrees. Consumer sweep also found no old names.

### reason-subj-11

- **Rule:** `.claude/rules/patterns.md`: “One single-word verb carries these overloads: `method(): void` / `method(id: string): boolean` / `method(ids: readonly string[]): boolean` … No argument applies to all. One id applies to one. An id list applies to those items and returns true only when all succeed.”
- **Site now:** Manager interfaces carry the batch family:
  - `GroupManagerInterface:910-920`
  - `FactorManagerInterface:974-980`
  - `RuleManagerInterface:1027-1034`
  - `EquationManagerInterface:1081-1088`
  - `FactManagerInterface:1133-1141`
  - `InferenceManagerInterface:1187-1195`
  - `VariableManagerInterface:1267-1275`
  
  Implementations use the same overloads at `GroupManager.ts:81-119`, `FactorManager.ts:100-136`, `RuleManager.ts:84-120`, `EquationManager.ts:86-112`, `FactManager.ts:81-107`, `InferenceManager.ts:91-127`, and `VariableManager.ts:75-122`.
  
  `Collection.ts:64-68` has only `remove(id: string): boolean`; it does not implement the required no-argument clear-all path.
- **Diff:** Manager interface hunk examples: `types.ts @@ -907,8 +912,11 @@`, `@@ -961,8 +974,11 @@`, `@@ -1008,8 +1027,11 @@`, `@@ -1055,8 +1081,11 @@`, `@@ -1098,8 +1133,11 @@`, and `@@ -1145,8 +1187,11 @@`. Implementation hunk examples: `GroupManager.ts @@ -57,15 +77,31 @@`, `FactorManager.ts @@ -68,10 +96,26 @@`, and `Collection.ts @@ -59,9 +61,11 @@`. Manager batch text is present, but the Collection no-argument path is absent.
- **Old-form sweep:** Old declarations `remove(id: string): void`, `remove(groupId: string, id: string): void`, and `remove(name: string): void`, case-insensitive with plural/derived forms, over the required paths: no hit.
- **Report:** `applied` — “Every manager's `remove` is now the batch family; `Collection.remove` reports whether the id existed.” The manager portion matches. The report does not carry the operative required Collection no-argument path.
- **Proof:** `reason-subj-11-control.txt` records the mutation control: replacing the existence probe with `const existed = true` caused 16 failures across six files; restored behavior returned 134 passed. The missing Collection no-argument path is not covered.

### reason-subj-13

- **Rule:** `.claude/rules/names.md`: “Generic words: `data`, `info`, `item`, `thing`, `obj`.”
- **Site now:** Published manager signatures use domain nouns: `types.ts:919` `seat(groups...)`, `:1033` `seat(rules...)`, `:1087` `seat(equations...)`, `:1140` `seat(facts...)`, `:1194` `seat(inferences...)`; `:1269` retains `seat(variables...)`. Generic `Collection` accessors remain at `Collection.ts:32,37,44`.
- **Diff:** Type hunk `@@ -907,8 +912,11 @@` and corresponding manager hunks, for example `GroupManager.ts @@ -57,15 +77,31 @@`, `RuleManager.ts @@ -58,15 +80,31 @@`, and `VariableManager.ts @@ -52,12 +71,26 @@`. The domain-noun replacements are in the `+` lines.
- **Old-form sweep:** `\bseat\(items\b`, case-insensitive: one intentional hit at `src/core/builders/managers/Collection.ts:44`. The row explicitly scopes generic `Collection<T>` out.
- **Report:** `applied` — “The five `seat(items: …)` signatures and implementations renamed to their domain nouns; `Collection` left generic.” Matches.

### reason-subj-15

- **Rule:** `.claude/rules/writing.md`: “Claim only what the reader can check.” `.claude/rules/documentation.md`: “A parity failure identifies drift; never suppress or weaken the test.”
- **Site now:** `README.md:25` says `- Node.js >= 22.12.0, matching the package engine declaration`; `package.json:91-93` declares `>=22.12.0`.
- **Diff:** `README.md @@ -22,7 +22,7 @@ npm install @orkestrel/reason`; exact replacement is in the `+` line.
- **Old-form sweep:** `Node\.js >= 24`, case-insensitive: no hit in the required package paths.
- **Report:** `applied` — “`README.md:25` now reads `Node.js >= 22.12.0, matching the package engine declaration`.” Matches.
- **Proof:** Documentation sweep agrees.

### reason-subj-16

- **Rule:** `.claude/rules/typescript.md`: “Write a default as `Default: …` and a thrown error as `Thrown when …`.”
- **Site now:** Defaults in the cited `types.ts` members and `constants.ts` blocks use `Default:`. Example: `src/core/types.ts:639` says `Default: \`EVALUATOR_ID\`.`; `:1404-1405` carries the corrected SubjectBuilder wording. Constants blocks at `src/core/constants.ts:7-39` use the fixed form.
- **Diff:** Type hunks include `@@ -143,9 +143,9 @@`, `@@ -227,8 +227,8 @@`, `@@ -251,7 +251,8 @@`, `@@ -274,9 +275,10 @@`, `@@ -635,7 +636,7 @@`, and the option/default hunks through `@@ -1181,13 +1226,23 @@`. Constants hunks are `@@ -14,28 +14,43 @@`, `@@ -83,7 +98,7 @@`, and `@@ -95,7 +110,7 @@`.
- **Old-form sweep:** `\(default `, case-insensitive: no hit. `defaults to` remains in `src/core/factories.ts` and some test prose outside this row’s cited `types.ts`/`constants.ts` population.
- **Report:** `applied` — “Every stated default in `types.ts` and `constants.ts` rewritten to the fixed `Default: …` form. No value changed.” Matches within the row’s scope.
- **Proof:** Documentation sweep agrees; `sweeps.txt:65-130` records the out-of-scope `defaults to` hits.

### reason-obj-1

- **Rule:** `.claude/rules/tests.md`: “Mirror module/application structure: `tests/{src,app}/[environment]/[domain]/[module].test.ts`.” Also: “Do not create test files solely for `constants.ts`, barrels, error definitions, or `types.ts`.”
- **Site now:** `tests/src/core/parsers.test.ts` exists. The manager mirror exists at `tests/src/core/builders/managers/` with `Collection`, `EquationManager`, `FactManager`, `FactorManager`, `GroupManager`, `InferenceManager`, `RuleManager`, and `VariableManager` tests.
- **Diff:** New-file hunks: `parsers.test.ts @@ -0,0 +1,99 @@`; each manager file has a `@@ -0,0 +N @@` hunk, including `Collection 146`, `EquationManager 195`, `FactManager 186`, `FactorManager 203`, `GroupManager 232`, `InferenceManager 198`, `RuleManager 187`, and `VariableManager 150`.
- **Old-form sweep:** The absent mirror paths have no stale replacement form; all required paths now exist.
- **Report:** `applied` — “`tests/src/core/parsers.test.ts` and the whole `tests/src/core/builders/managers/` mirror created.” Matches.
- **Proof:** `reason-obj-1-subj-11-after.txt`: 134 passed, exit 0. The report records nine mirrored files and the suite executes them.

### reason-obj-2

- **Rule:** `.claude/rules/tests.md`: “Transcribe each flagship fence and assert the values its comments claim. Name resolution is not a behavioural proof, so a fence documenting a value the code contradicts passes every parity assertion.” `.claude/rules/documentation.md`: “That proof has a home: `tests/guides.test.ts` executes the flagship fences.”
- **Site now:** `tests/guides.test.ts:207-509` contains `describe('flagship fences')` and executable transcriptions. Assertions include evaluator values at `:265-270`, quantitative value at `:280`, logical values at `:307-321`, symbolic solutions at `:348`, inferential derivation at `:382-390`, builder value at `:428`, and subject-builder behavior at `:470-509`. The guide now says `41` at `guides/reason.md:933`.
- **Diff:** `tests/guides.test.ts` new block hunk `@@ -168,3 +207,303 @@`; guide correction hunk `@@ -925,21 +924,21 @@`. The operative assertions and corrected `41` are present.
- **Old-form sweep:** No old symbol or placement form applies; the previous non-executed fence assertion is replaced by the executable block.
- **Report:** `applied` — “`describe('flagship fences')` added to `tests/guides.test.ts`; it caught one stale guide value, corrected in the guide.” Matches the tree.
- **Proof:** No dedicated failing-first command/count or `reason-obj-2` proof file exists. This behavioural row is covered only indirectly by the full `guides` project result.

### reason-obj-3

- **Rule:** `.claude/rules/typescript.md`: “Public collection properties and return types use `readonly T[]`, `ReadonlyMap<K, V>`, or `ReadonlySet<T>`.”
- **Site now:** `src/core/helpers.ts:649-653` defines `subjectToFacts(subject: Subject)` returning `{ readonly facts: readonly Fact[]; readonly trace: readonly string[] }`. The caller at `InferentialReasoner.ts:193-199` uses `injected.facts`.
- **Diff:** Helper hunk `@@ -665,7 +670,7 @@` plus the signature hunk `@@ -694,9 +699,9 @@`; caller hunk `@@ -162,12 +190,13 @@`. The readonly return contract is present.
- **Old-form sweep:** `subjectToFacts\(subject: Subject, trace: string\[\]\): Fact\[\]`, case-insensitive with inflections: no hit.
- **Report:** `applied` — “`subjectToFacts` returns `readonly Fact[]`, landed with reason-obj-5 as one signature change.” The actual implementation returns the stronger object containing readonly facts and trace, as required by reason-obj-5; report wording is abbreviated but consistent.
- **Proof:** `reason-obj-3-obj-5-obj-7-before.txt`: 9 failed, 193 passed. After: 202 passed, exit 0.

### reason-obj-4

- **Rule:** `.claude/rules/typescript.md`: “Public collection properties and return types use `readonly T[]`, `ReadonlyMap<K, V>`, or `ReadonlySet<T>`.” Also: “Return copies or readonly views; never leak a mutable internal reference.”
- **Site now:** `src/core/helpers.ts:406-416` returns `ReadonlyMap<string, readonly Fact[]>`. `InferentialReasoner.ts:243-244` creates `new Map<string, Fact[]>()` and copies each bucket with `[...bucket]` before mutation at `:291-293`.
- **Diff:** Helper return hunk `@@ -403,7 +406,7 @@`; inferential seed hunk `@@ -208,8 +237,11 @@`; exact readonly return and locally owned copy are in the `+` lines.
- **Old-form sweep:** `indexByArity\(facts: readonly Fact\[\]\): Map<string, Fact\[\]>`, case-insensitive with derived forms: no hit.
- **Report:** `applied` — “`indexByArity` returns `ReadonlyMap<string, readonly Fact[]>`; the reasoner seeds a bucket copy it owns.” Matches.
- **Proof:** Included in `reason-obj-3-obj-5-obj-7-before.txt` and `after.txt`.

### reason-obj-5

- **Rule:** `.claude/rules/typescript.md`: “Never mutate caller-owned inputs.”
- **Site now:** `src/core/helpers.ts:634-650` has no caller-owned trace parameter; local `trace` is created at `:652`, and the function returns both readonly collections at `:672`. The header names the `termToKey`/`factToKey` identity ledger exception at `:35-41`. `InferentialReasoner.ts:193-199` pushes the returned trace and passes returned facts.
- **Diff:** Helper header hunk `@@ -35,7 +35,10 @@`; function hunk `@@ -665,7 +670,7 @@`; caller hunk `@@ -162,12 +190,13 @@`. The operative signature and exception wording are present.
- **Old-form sweep:** Old signature `subjectToFacts\(subject: Subject, trace: string\[\]\)` and old phrase `never touches its input`, case-insensitive with inflections: no hit.
- **Report:** `applied` — “`subjectToFacts` takes no caller-owned `trace`; the header names the identity ledger as the one exception.” Matches.
- **Proof:** `reason-obj-3-obj-5-obj-7-before.txt`: 9 failed, 193 passed. After: 202 passed.

### reason-obj-7

- **Rule:** `.claude/rules/architecture.md`: “Centralize any pattern repeated twice.”
- **Site now:** `src/core/helpers.ts:916-947` contains `resolveOperand`; `Transformer.ts:37-50` validates the operation, resolves the operand, and delegates to `applyOperation`.
- **Diff:** Helper hunk `@@ -911,6 +916,35 @@`; Transformer hunk `@@ -26,39 +37,14 @@`. The requested helper and composition are present in `+` lines.
- **Old-form sweep:** The duplicated 13-arm switch in `Transformer.apply` is absent; `case`-arm sweep over the required package paths finds no duplicate Transformer switch.
- **Report:** `applied` — “`resolveOperand` added beside `applyOperation`; `Transformer.apply` composes the two behind `isMathOperation`.” Matches.
- **Proof:** `reason-obj-3-obj-5-obj-7-before.txt`: 9 failed, 193 passed. After: 202 passed.

### reason-obj-8

- **Rule:** `.claude/rules/writing.md`: “Point to other material with `preceding`, `following`, `earlier`, or `later`, never with `above` or `below`.”
- **Site now:** Directional prose was corrected in `guides/reason.md:128,161,544,578,584,658,668,792,827,828,900`, `helpers.ts:1192`, `:2305`, `factories.ts:511`, and `Aggregator.ts:72`. Remaining `above`/`below` are code tokens, quantity semantics, or test prose.
- **Diff:** Guide hunk `@@ -125,7 +125,7 @@`, broad contract hunk `@@ -570,18 +571,16 @@`, numeric hunks `@@ -655,7 +654,7 @@` and `@@ -665,7 +664,7 @@`, and source hunks `helpers.ts @@ -1158,7 +1192,7 @@`, `factories.ts @@ -2271,7 +2305,7 @@`, `Aggregator.ts @@ -64,7 +72,7 @@`. Replacement terms are in the `+` lines.
- **Old-form sweep:** `\b(above|below)\b` over the full required population still finds intentional hits:
  - Guide code/API/quantity hits: `guides/reason.md:302,644,645,725,742`.
  - Source type/API hits: `src/core/types.ts:74,85,86,99`; `validators.ts:194-195,279`; `Evaluator.ts:25-26,63,65`; `factories.ts:91`.
  - Test prose/code hits include `tests/guides.test.ts:74,211,265,270,307`; `helpers.test.ts:141,423`; `integration.test.ts:290,383,563,845`; `factories.test.ts:317,438`; `Aggregator.test.ts:339,403`; `Evaluator.test.ts:18,30,107-157,394,408-409,427,441,445-446,499,510-537,614-616,720-721,741,812-828,837`; `Reason.test.ts:743`; `QuantitativeReasoner.test.ts:979,1030,1479`; `InferentialReasoner.test.ts:1113,1623`; `validators.test.ts:180-181,234,327`. These are not the prohibited positional prose sites.
- **Report:** `applied` — “Every positional `above` / `below` replaced; the `Comparison` code tokens and the quantity senses left alone.” Matches the source/guide scope; the broader sweep necessarily retains the listed semantic/test hits.
- **Proof:** Naming/documentation sweep agrees for prohibited directional prose.

### reason-obj-9

- **Rule:** `AGENTS.md`: “One concept, one term. Do not alternate synonyms.”
- **Site now:** `src/core/helpers.ts:378` uses `fact`, `:481` uses `fact`, `:569` uses `fact`, and `:697` uses `inference`; corresponding `@param` lines are updated.
- **Diff:** Helper hunks `@@ -393,7 +396,7 @@`, `@@ -465,8 +468,8 @@`, `@@ -555,7 +558,7 @@`, and `@@ -694,9 +699,9 @@`. Replacement names are present.
- **Old-form sweep:** `factToArityKey(source`, `factToKey(source`, `instantiateFact(source`, and `findUnboundVariables(source`, case-insensitive with inflections: no hit.
- **Report:** `applied` — “`source` renamed to `fact` / `inference` in the four helpers and their `@param` lines.” Matches.
- **Proof:** Naming sweep agrees.

### reason-obj-10

- **Rule:** `.claude/rules/tests.md`: “confirm each assertion would fail for the defect it claims to catch”; “Cover happy paths, error paths, empty input, boundary values.”
- **Site now:** `EquationManager.test.ts`, `FactManager.test.ts`, and `InferenceManager.test.ts` contain direct `seat` tests, including replacement, exact plural accessor contents, event silence, and post-destroy behavior.
- **Diff:** New-file hunks `EquationManager.test.ts @@ -0,0 +1,195 @@`, `FactManager.test.ts @@ -0,0 +1,186 @@`, and `InferenceManager.test.ts @@ -0,0 +1,198 @@`; the direct seat cases are in the `+` lines.
- **Old-form sweep:** No absent direct-seat test form remains for these three managers.
- **Report:** `applied` — “Direct `seat` cases added in the EquationManager, FactManager, and InferenceManager files; the builder block left unchanged.” Matches.
- **Proof:** Combined manager control: `reason-subj-11-control.txt` shows 16 failures under mutation; `reason-obj-1-subj-11-after.txt` shows 134 passed.

### fleet-F1

- **Site now:** `tests/setup.ts` contains no `isBrowserVuePath`; no browser environment paths exist under the workspace.
- **Diff:** No applicable diff hunk. The helper was already absent.
- **Old-form sweep:** `\bisBrowserVuePath\b`, case-insensitive with inflections, over the checkout: no hit.
- **Report:** `noop` — “`tests/setup.ts` read in full declares no `isBrowserVuePath`; `grep -rn isBrowserVuePath` over the checkout returns nothing. No `src/browser`, no `app/browser`, no `tests/setupBrowser.ts`.” Matches.
- **Proof:** No behavioral proof required for a no-op.

### fleet-F2

- **Site now:** Every implementation class uses a private `#id` and prototype getter; no implementation class declares a public `readonly id: string` field. The interface declarations remain public in `types.ts`.
- **Diff:** No applicable diff hunk. The class shape was already compliant.
- **Old-form sweep:** `readonly id: string` in implementation classes, case-insensitive with inflections: no hit; interface-only occurrences remain in `types.ts`.
- **Report:** `noop` — “No implementation class declares a public `readonly id: string` field. Every `readonly id: string` hit in `src/` sits in a `types.ts` interface; every class reads `readonly #id` plus a `get id()`.” Matches.
- **Proof:** No behavioral proof required for a no-op.

### Across the unit — Scope

All status paths are within Owned scope:

- Documentation: `README.md`, `guides/README.md`, `guides/reason.md`.
- Source: all listed `src/**` paths, including `types.ts`, `constants.ts`, helpers, validators, factories, operators, reasoners, builders, and managers.
- Tests: all listed `tests/**` paths, including the nine added mirrors.
- No status entry is under `package-lock.json`, `node_modules/**`, `.claude/**`, `.agents/**`, `scripts/**`, or another off-limits path.
- No diff hunk belongs to a file outside at least one row’s operative repair scope.

### Across the unit — Residue

- Diff `+`-line sweep: `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: two hits in the guide examples:
  - `guides/reason.md:1017`: `on: { error: (error) => console.error('reasoner threw:', error) },`
  - `guides/reason.md:1018`: `error: (error, event) => console.warn(...)`
  
  These are example logging calls, not debug residue, but they are literal matches to the requested pattern.
- Tree sweep over `src/**` and non-vendored `tests/**`: `src/core/factories.ts:267` contains `console.log(result.success)` in an example. No `.skip`, `.only`, `.todo`, `TODO`, `FIXME`, or `debugger` hit was found outside the excluded policy/distribution fixtures.
- The excluded vendored files contain their own policy/test fixtures, as expected.

### Across the unit — Parity

| Entity | Interface members in `src/core/types.ts` | Guide Methods rows | Readonly data properties / guide Surface |
|---|---|---|---|
| `Reason` / `ReasonInterface` | `reason` `:869`; `register`, `reasoner`, `reasoners`, `supports`, `validate`, `destroy` `:870-876` | `guides/reason.md:398-409` | `emitter`: `types.ts:868`; Surface `guides/reason.md:362` |
| `Evaluator` / `EvaluatorInterface` | `evaluate`, `batch`: `types.ts:729-730` | `guides/reason.md:422-426` | `id`: `types.ts:728`; Surface `:357` |
| `Transformer` / `TransformerInterface` | `apply`, `chain`: `types.ts:739-740` | `guides/reason.md:430-434` | `id`: `types.ts:738`; Surface `:358` |
| `Aggregator` / `AggregatorInterface` | `aggregate`: `types.ts:759-763` | `guides/reason.md:436-439` | `id`: `types.ts:758`; Surface `:359` |
| Four reasoners / `ReasonerInterface` | `supports`, `validate`, `reason`: `types.ts:778-780` | `guides/reason.md:412-418` | `id`, `reasoning`: `types.ts:777`; Surface `:360` |
| `GroupManager` | `group`, `groups`, `append`, `prepend`, `replace`, three `remove` overloads, `seat`, `destroy`: `types.ts:910-920` | `guides/reason.md:444-456` | `emitter`: `types.ts:909`; Surface `:364` |
| `FactorManager` | `factor`, `factors`, three locator-preserving `remove` overloads, plus writes/destroy: `types.ts:974-981` | `guides/reason.md:458-468` | `emitter`: `types.ts:973`; Surface `:366` |
| `RuleManager` | `rule`, `rules`, writes, three `remove` overloads, `seat`, `destroy`: `types.ts:1027-1034` | `guides/reason.md:470-482` | `emitter`: `types.ts:1026`; Surface `:364` |
| `EquationManager` | `equation`, `equations`, writes, three `remove` overloads, `seat`, `destroy`: `types.ts:1081-1088` | `guides/reason.md:484-496` | `emitter`: `types.ts:1080`; Surface `:368` |
| `FactManager` | `fact`, `facts`, writes, three `remove` overloads, `seat`, `destroy`: `types.ts:1133-1141` | `guides/reason.md:498-511` | `emitter`: `types.ts:1132`; Surface `:370` |
| `InferenceManager` | `inference`, `inferences`, writes, three `remove` overloads, `seat`, `destroy`: `types.ts:1187-1195` | `guides/reason.md:513-526` | `emitter`: `types.ts:1186`; Surface `:372` |
| `VariableManager` | `variable`, `variables`, `add`, three `remove` forms, `seat`, `destroy`: `types.ts:1240-1248` | `guides/reason.md:528-541` | `emitter`: `types.ts:1239`; Surface `:374` |
| `DefinitionBuilder` | `build`, `merge`, `clear`, `destroy`: `types.ts:1392-1395` | `guides/reason.md:545-552` | brand, `id`, `reasoning`, `emitter`, seven manager properties: `types.ts:1383-1391`; Surface `:376` |
| `SubjectBuilder` | `field`, `fields`, `set`, two `remove` overloads, `merge`, `clear`, `repeat`, `build`, `destroy`: `types.ts:1466-1478` | `guides/reason.md:557-571` | brand, `id`, `emitter`: `types.ts:1463-1465`; Surface `:378` |

Guide fences import through `@orkestrel/reason`; `tests/guides.test.ts:207-509` executes the flagship examples. The changed public identifiers resolve through `src/core/index.ts:1-24`, including the renamed chaining types, `resolveOperand`, builders, operators, reasoners, and managers.

### Across the unit — Gates

The report’s gate table (`conform-reason-report.md:168-176`) records:

- `npm run format:check` — exit `0`; “All matched files use the correct format.”
- `npm run lint:check` — exit `0`; no output.
- `npm run check` — exit `0`; root `tsc --noEmit` and `check:src:core` silent.
- `npm run build` — exit `0`; “✓ 27 modules transformed”, declarations copied.
- `npm test` — exit `0`; `src:core` 1202, `policy` 111, `config` 46, `setup` 26, `guides` 94.

### Across the unit — Breaking

The report’s breaking entries (`conform-reason-report.md:190-238`) name:

- `RuleResult.conclusion` removal: consumer fixtures in `brief/tests/setup.ts` and examples/tests in `qualifier`; no old member hit in the other named consumers.
- `LogicalChainingOutcome` and `InferentialChainingOutcome`: no hit across consumer `src`, `tests`, or `app` trees.
- Manager `remove` family: no consumer manager-interface or factory usage.
- `subjectToFacts` and `indexByArity`: no consumer usage.

Independent old-name sweeps across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding `reason`, generated guides, and `node_modules`, found no `LogicalChainingOutcome` or `InferentialChainingOutcome`, no old helper signatures, and no `RuleResult` `conclusion:` literal.

### Across the unit — Writing sweep

Diff `+`-line prose/comment sweep:

- `guides/reason.md:478`: “absent `target` makes it the **new** forward conclusion.”
- `guides/reason.md:657`: “not a **new** dependency.”
- `guides/reason.md:939`: “makes the **new** rule the forward conclusion.”
- `guides/reason.md:682`: “lands **just under** it”.
- `guides/reason.md:774`: “`net` has **just** been fed forward.”
- `tests/setup.ts:292`: “Built from **new** `Array(length)`...”

No added prose hit the count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`.

## Distillate

- `reason-subj-1: site now clean | diff present yes | old form hits 0 | report matches yes`
- `reason-subj-2: zero-dependency removed | diff present yes | old form hits 0 | report matches yes`
- `reason-subj-3: package-local shape wording | diff present yes | old form hits 0 | report matches yes`
- `reason-subj-4: scsr removed and messages rewritten | diff present yes | old form hits 0 | report matches yes`
- `reason-subj-5: RuleResult carries no conclusion; LogicalResult derives it | diff present yes | old form hits 0 | report matches yes`
- `reason-subj-6: examples present on all 17 public classes; Collection excluded | diff present yes | old form hits 0 | report matches yes`
- `reason-subj-7: present-tense builder wording | diff present yes | old form hits 0 | report matches yes`
- `reason-subj-8: source/guide replacements complete; test-prose residues remain | diff present yes | old form hits 18 | report matches yes within scope`
- `reason-subj-9: imperative wording | diff present yes | old form hits 0 | report matches yes`
- `reason-subj-10: both chaining types renamed | diff present yes | old form hits 0 | report matches yes`
- `reason-subj-11: managers batch-capable; Collection lacks no-argument remove | diff present partial | old form hits 0 | report matches no`
- `reason-subj-13: published seat parameters use domain nouns | diff present yes | old form hits 1 intentional Collection hit | report matches yes`
- `reason-subj-15: README engine floor matches manifest | diff present yes | old form hits 0 | report matches yes`
- `reason-subj-16: cited defaults use Default form | diff present yes | old form hits 0 for \(default; out-of-scope defaults-to hits remain | report matches yes`
- `reason-obj-1: parser and manager mirrors exist | diff present yes | old form hits 0 | report matches yes`
- `reason-obj-2: executable flagship fences exist and guide value is corrected | diff present yes | old form hits 0 | report matches no for missing failing-first proof`
- `reason-obj-3: subjectToFacts return is readonly | diff present yes | old form hits 0 | report matches yes`
- `reason-obj-4: readonly map and owned bucket copies | diff present yes | old form hits 0 | report matches yes`
- `reason-obj-5: no caller-owned trace mutation | diff present yes | old form hits 0 | report matches yes`
- `reason-obj-7: operand resolution centralized | diff present yes | old form hits 0 | report matches yes`
- `reason-obj-8: prohibited positional prose removed | diff present yes | old prohibited-prose hits 0 | report matches yes`
- `reason-obj-9: helper parameters use fact/inference | diff present yes | old form hits 0 | report matches yes`
- `reason-obj-10: direct seat tests added | diff present yes | old form hits 0 | report matches yes`
- `fleet-F1: helper absent and no browser axis | diff present no | old form hits 0 | report matches yes`
- `fleet-F2: classes already use private id plus getter | diff present no | old form hits 0 | report matches yes`

Scope tags: all 51 status paths are `owned`; no shared-file or off-limits status entries.

Residue: diff `+` lines have two intentional guide-example `console.` matches at `guides/reason.md:1017-1018`; the non-vendored tree has `src/core/factories.ts:267` with an example `console.log`. No skip/only/todo/retry/timeout/TODO/FIXME/debugger residue was found in the scoped tree.

## Unknowns

- The report does not provide a dedicated failing-first command, count, or proof file for `reason-obj-2`.
- The report claims the Collection part of `reason-subj-11` is complete, but `src/core/builders/managers/Collection.ts:64-68` has no `remove(): void` overload or clear-all implementation.
- The report says there are 15 barrelled classes in reason-subj-6; `src/core/index.ts:8-24` exports 17 classes, all of which currently have examples.
- The report’s “via/simply/just” sweep is scoped to source and package prose; broader package test-prose hits remain as listed.
- The report’s gate results are recorded evidence only; no independent deciding gate run was performed in this read-only lane.

## Journal

## Deviation

The tree contains only Owned-path changes according to `conform-reason.status`; no file was inaccessible and no required sweep was unavailable. The evidence map diverges from the report in two substantive places: the Collection no-argument remove repair is absent, and reason-obj-2 lacks the required failing-first proof. Additional non-blocking findings are the intentional `console.` example matches, the count discrepancy in the class-example report, and test-prose substitutions outside reason-subj-8’s scoped `Where`.