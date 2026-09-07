# Report — P.1 `d7n-brief-prep` (brief's prep)

`implementer` on Claude Opus 5. Checkout `/home/user/fleet/brief`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, baseline tip `4c71834`. Nothing committed, installed, or
discarded.

## The resumed partial work

The terminated run left the item 1 repair, the item 2 adaptation, the item 3 voice sites, and the
item 4 bump already in the tree. Every hunk was ruled against the brief before any further edit.

**Kept, verified against the tip's own bytes.** The repair's whole-file writes — `configs/helpers.ts`,
`configs/policy.ts`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, and the
untracked `scripts/docs.ts` — compare byte-identical to
`…/docs/d7/pass/tip/package/dist/host/<path>` under `diff -q`, so `repair` was not re-run. The
repair's merged rows are each the row P21 named and nothing beside it: `.oxlintrc.json` gains the
`policy/no-malformed-summary` and `policy/no-banned-term` entries, `tsconfig.json` gains the
own-specifier `"@orkestrel/brief"` path, `package.json` gains the `docs` script row.

**Kept.** Item 2's adaptation of `tests/guides.test.ts`, item 4's `"version": "0.0.8"`, and every
item 3 rewrite listed under Item 3 in the following section. Each matches the before-text the brief
named, changes no code token, and moves no assertion's value.

**Corrected.** `tests/setup.ts` alone. The partial run's rewrites lengthened doc-block first lines
past the `printWidth: 100` the `.oxfmtrc.json` file sets, in a file whose committed copy carried no
such line (`git show HEAD:tests/setup.ts | awk 'length($0)>100'` prints nothing). The paragraphs at
`buildFailingInterpret`, `AccessorInterpretation`, `ShiftingAccessorInterpretation`,
`ShiftingForeignInterpretation`, `buildStableReason`, and `ShiftingLogicalResult` were re-wrapped
inside the paragraph, and `buildReadyManifest` lost an awkward `each`. Facts and wording are
otherwise unchanged; `awk 'length($0)>100' tests/setup.ts` prints nothing against the tree this
unit leaves.

**Discarded.** Nothing.

## Item 1 — `repair --offline`

Not re-run, per the dispatch. The terminated run captured its summary at
`tmp/d7n-brief-prep/repair.log.txt`:

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

That summary line is P21's. The whole-file writes are byte-identical to the tip inventory (evidence
in the preceding section). `git status --short` at return:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/brief.md
 M package.json
 M src/core/BriefManager.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/src/core/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

The repair list is `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`,
`tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, and the
untracked `scripts/docs.ts`. The rows beside it are item 2's `tests/guides.test.ts`, item 3's
`guides/brief.md`, `src/core/BriefManager.ts`, `src/core/constants.ts`, `src/core/helpers.ts`,
`src/core/types.ts`, `tests/setup.ts`, `tests/src/core/helpers.test.ts`, and item 4's `package.json`.
No other path is dirty.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

The methods case, at `tests/guides.test.ts:160-174`:

```diff
 		for (const group of groups) {
 			expect(group.methods.length).toBeGreaterThan(0)
-			const declared = source.methods(group.interface)
-			expect(declared.length).toBeGreaterThan(0)
-			expect(findMissing(group.methods, declared)).toStrictEqual([])
-			expect(findMissing(declared, group.methods)).toStrictEqual([])
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
+			expect(members.length).toBeGreaterThan(0)
+			expect(findMissing(documented, members)).toStrictEqual([])
+			expect(findMissing(members, documented)).toStrictEqual([])
 			const implementation = group.interface.replace(/Interface$/u, '')
-			expect(findMissing(source.methods(implementation), group.methods)).toStrictEqual([])
+			expect(
+				findMissing(
+					source.methods(implementation).map((method) => method.name),
+					documented,
+				),
+			).toStrictEqual([])
 		}
```

The examples case, at `tests/guides.test.ts:196-222`:

```diff
-		expect(findUnexampled(functions, fences, source.examples())).toStrictEqual([])
-		expect(findUnexampled(['neverDocumented'], fences, source.examples())).toStrictEqual([
-			'neverDocumented',
-		])
+		expect(
+			findUnexampled(
+				functions,
+				fences,
+				source.examples().map((example) => example.name),
+			),
+		).toStrictEqual([])
+		expect(
+			findUnexampled(
+				['neverDocumented'],
+				fences,
+				source.examples().map((example) => example.name),
+			),
+		).toStrictEqual(['neverDocumented'])
 		for (const group of guide.methods()) {
 			const implementation = group.interface.replace(/Interface$/u, '')
-			expect(findUnexampled(group.methods, fences, source.examples(implementation))).toStrictEqual(
-				[],
-			)
+			const documented = group.methods.map((method) => method.name)
+			const examples = source.examples(implementation).map((example) => example.name)
+			expect(findUnexampled(documented, fences, examples)).toStrictEqual([])
 		}
```

Every `findMissing` whose arguments were already strings stays untouched: the
`findMissingSymbols` pairs at `:130-150`, and the import walk's call at `:341`. No other change to
the suite.

## Item 3 — the voice sites

The pre-edit population has two independent readings that agree. The terminated run captured the
live tree's reading at `tmp/d7n-brief-prep/oxlint-before.log.txt` before touching a doc block, and
this run reproduced it from the committed copies of the named files through the same configuration
(`npx oxlint --config .oxlintrc.json --deny-warnings --no-ignore tmp/d7n-brief-prep/baseline/<paths>`,
exit 1). Both tally to the population P20 read:

```text
      1 src/core/BriefManager.ts  policy(no-banned-term)
      1 src/core/constants.ts  policy(no-banned-term)
      1 src/core/helpers.ts  policy(no-banned-term)
      2 src/core/types.ts  policy(no-banned-term)
     24 tests/setup.ts  policy(no-malformed-summary)
      2 tests/src/core/helpers.test.ts  policy(no-banned-term)
```

The instrument was proved able to fail: a control file carrying the doc block "A control record
that simply proves the rule fires." drew both `policy(no-banned-term)` and `policy(no-malformed-summary)` at
exit 1, and it was deleted before the gates ran.

### `src/core/BriefManager.ts` — `policy(no-banned-term)`: `just`, delete

Diagnostic at `103:3`, a comment inside `remove`:

- before: "returned false for a record it had just removed."
- after: "returned false for a record it had already removed."

### `src/core/constants.ts` — `policy(no-banned-term)`: `just`, delete

Diagnostic at `86:1`, the `LINE_BREAK_PATTERN` doc block; the sentence sits at line 90:

- before: "Every ECMAScript line terminator, not just `\n`: a renderer that splits on any of them"
- after: "Every ECMAScript line terminator, not only `\n`: a renderer that splits on any of them"

### `src/core/helpers.ts` — `policy(no-banned-term)`: `simply`, delete

Diagnostic at `494:1`, the `findUngrantedAuthority` doc block; the sentence sits at line 506:

- before: "entirely: the brief simply never says the executor may open what it must obey."
- after: "entirely: the brief never says the executor may open what it must obey."

### `src/core/types.ts` — `policy(no-banned-term)`: `leverage`, use; `just`, delete

Diagnostic at `136:1`, the `Example` doc block:

- before: "Represents one input to output exemplar — the highest-leverage ambiguity remover."
- after: "Represents one input to output exemplar — the ambiguity remover that leaves the least to interpret."

Diagnostic at `346:1`, the `Briefing` doc block; the sentence sits at line 360:

- before: "two identical compiles share it and a refused compile has one just as a complete one does."
- after: "two identical compiles share it and a refused compile has one the same way a complete one does."

### `tests/src/core/helpers.test.ts` — `policy(no-banned-term)`: `just`, delete; `simply`, delete

Diagnostic at `393:3`:

- before: "// may open what it must obey. Nothing is banned here — the manifest is just silent."
- after: "// may open what it must obey. Nothing is banned here — the manifest is silent."

Diagnostic at `536:3`:

- before: "// Simply never granted — the case a forbidden-only check could not see."
- after: "// Never granted at all — the case a forbidden-only check could not see."

The `it('reports an authority no partition opens, whether banned or simply absent', …)` title at
`:392` is a string literal the rule does not read, so it stays.

### `tests/setup.ts` — `policy(no-malformed-summary)` at every declaration listed

Each rewrite opens the description paragraph with a third-person verb ending in `s`, names no
symbol it documents in that first sentence, and keeps the paragraph's facts. Before → after, in
file order:

- `FIRST_RULE`: "The single rule result the counting and stable engines agree on for a first read." becomes "Holds the single rule result the counting and stable engines agree on for a first read."
- `CAPTURED_RULE`: "The refused rule a captured shifting verdict must retain." becomes "Holds the refused rule a captured shifting verdict must retain."
- `buildReadyTask`: "The canonical valid task every fixture builds on." becomes "Returns the canonical valid task every fixture builds on."
- `buildReadyManifest`: "A manifest whose four partitions are populated and disjoint." becomes "Returns a manifest whose partitions are populated and disjoint." Dropping `four` also clears the ban on stating a count.
- `buildReadyBrief`: "A gate-passing brief: one sentence, a required outcome, a proof, disjoint partitions." becomes "Returns a gate-passing brief: one sentence, a required outcome, a proof, disjoint partitions."
- `buildReadyInput`: "A `BriefInput` the gate passes: a task, a disjoint manifest, one outcome, one proof." becomes "Returns a `BriefInput` the gate passes: a task, a disjoint manifest, one outcome, one proof."
- `buildInterpret`: "A real interpret pipeline driven by an injected extractor." becomes "Returns a real interpret pipeline driven by an injected extractor."
- `buildFailingInterpret`: "An interpret engine whose `interpret` throws, for driving the `interpret` stage's failure." becomes "Returns an interpret engine whose `interpret` throws, for driving the `interpret` stage's failure."
- `buildForeignInterpret`: "An interpret engine whose entity carries whatever value the caller names." becomes "Returns an interpret engine whose entity carries whatever value the caller names."
- `AccessorInterpretation`: "A conforming `Interpretation` carried entirely by prototype getters — the class satisfies the interface, and `structuredClone` keeps own members only, …" becomes "Implements a conforming `Interpretation` carried entirely by prototype getters — the class satisfies the interface, and `structuredClone` keeps own members only, …"
- `ShiftingAccessorInterpretation`: "A conforming supplied interpretation whose prototype getters change after their first read." becomes "Implements a conforming supplied interpretation whose prototype getters change after their first read."
- `ShiftingForeignInterpretation`: "A conforming engine interpretation with shifting prototype getters and a function-valued `Entity.value`." becomes "Implements a conforming engine interpretation with shifting prototype getters and a function-valued `Entity.value`."
- `buildShiftingInterpret`: "A borrowed engine that returns the shifting function-valued interpretation." becomes "Returns a borrowed engine that yields the shifting function-valued interpretation."
- `buildAccessorInterpret`: "A borrowed engine whose `interpret` returns a CONFORMING class-instance `Interpretation` that the ownership clone cannot carry …" becomes "Returns a borrowed engine whose `interpret` yields a CONFORMING class-instance `Interpretation` that the ownership clone cannot carry …"
- `readErrorCode`: "Read a caught value's `BriefErrorCode` without branching at the assertion site." becomes "Reads a caught value's `BriefErrorCode` without branching at the assertion site."
- `buildPermissiveEvaluator`: "An evaluator that reports every check met." becomes "Returns an evaluator that reports every check met."
- `buildCountingReason`: "A reasons engine whose verdict answers differently on every read after the first." becomes "Returns a reasons engine whose verdict answers differently on every read after the first."
- `buildStableReason`: "The static twin of `buildCountingReason` — each member's first answer, as plain data." becomes "Returns the static twin of `buildCountingReason` — each member's first answer, as plain data."
- `buildShiftingReason`: "A reasons engine whose uncloneable logical result shifts after its captured answers." becomes "Returns a reasons engine whose uncloneable logical result shifts after its captured answers."
- `ShiftingLogicalResult`: "A logical result whose function member forces capture and whose declared getters shift." becomes "Implements a logical result whose function member forces capture and whose declared getters shift."
- `buildSilentReason`: "A reasons engine that refuses through `conclusion` alone and names no failing rule." becomes "Returns a reasons engine that refuses through `conclusion` alone and names no failing rule."
- `readConclusion`: "Read a reasoner verdict's conclusion without narrowing at the assertion site." becomes "Reads a reasoner verdict's conclusion without narrowing at the assertion site."
- `readErrorContext`: "Read a caught `BriefError`'s `context`, or `undefined` for any other value." becomes "Reads a caught `BriefError`'s `context`, or `undefined` for any other value."
- `buildInheritedActions`: "A `Record` whose prototype carries the mapping, so a lookup that ignores ownership resolves a key the caller never declared." becomes "Returns a `Record` whose prototype carries the mapping, so a lookup that ignores ownership resolves a key the caller never declared."

Nothing under `tests/setup.ts` drew `policy(no-banned-term)`, and no rewrite moved a code token,
renamed a symbol, or changed an assertion's value. `git diff --stat -- tests/setup.ts` reports
`1 file changed, 38 insertions(+), 29 deletions(-)`, every hunk inside a comment block.

### The prose sweep's hits in `guides/**`

The lines the sweep named are the only lines touched in the guide, and `README.md` was not touched.

Line 100, the `Example` row of the `### Types` table — `leverage`:

- before: "`{ input, output, note? }` — one input-to-output exemplar; the highest-leverage ambiguity remover."
- after: "`{ input, output, note? }` — one input-to-output exemplar; the ambiguity remover that leaves the least to interpret."

Line 552 — `simply`:

- before: "brief simply never says the executor may open what it must obey."
- after: "brief never says the executor may open what it must obey."

Lines 1119 and 1120 — `via`, at every hit the sweep named there:

- before: "parse-then-trust boundary: shape via the compiled guard, semantics via `validateBrief`," and "readiness via the gate. Each check answers its own question."
- after: "parse-then-trust boundary: shape through the compiled guard, semantics through" and "`validateBrief`, readiness through the gate. Each check answers its own question."

The replacement in the guide's `Example` row and the replacement in the `src/core/types.ts` doc
block are the same words on purpose: the row and the block carry the same sentence, and the `###
Types` table's third column is `Shape` rather than `Summary`, so `findDrift` compares neither side
and the `docs` worklist is unchanged by the pair.

## Item 4 — the bump

```diff
-	"version": "0.0.7",
+	"version": "0.0.8",
```

`package-lock.json` untouched, and `@orkestrel/guide` still declares `^0.0.17`.

## Acceptance criteria

**1. `git status --short` lists the P21 repair list plus the item files and nothing else.** The
status is quoted under Item 1; the file-to-diagnostic mapping is under Item 3.

**2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run
check` exit 0.**

```text
$ npm run format:check
All matched files use the correct format.
Finished in 2317ms on 54 files using 4 threads.
EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings .
(no output)
EXIT 0

$ npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
EXIT 0
```

`npm run format` ran before each check and reported `Finished in 4750ms on 54 files using 4
threads.` with no path left unformatted; the vendored files re-compare byte-identical to the tip
after it.

**3. `npm run test:guides`, `npm run test:policy`, and `npm run test:config` exit 0.**

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  20 passed (20)
EXIT 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
EXIT 0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
EXIT 0
```

P21's guides failures were the record shapes alone, and item 2 closed them; P21's policy failure was
the `prose` rule, and item 3 closed it.

**Observations, not criteria.** The suites the edits also feed read green on the same loaded host:
`npm run test:setup` — `Test Files 1 passed (1)`, `Tests 27 passed (27)`, exit 0; `npm run test:src`
— `Test Files 10 passed (10)`, `Tests 281 passed (281)`, exit 0. No timing failure occurred, so
none is carried.

**4. `npm run docs` reads a non-zero `rows read` and exits 1.** `rows read: 1, disagreements found:
133`, exit 1 — the reading P21 recorded. The run before the `tests/setup.ts` re-wrap and the run
after it produced byte-identical worklists.

## The `docs` worklist, verbatim

```text
> node --experimental-strip-types scripts/docs.ts

guides/brief.md type TaskOperation: guide absent source "Names the closed vocabulary of what a brief asks for."
guides/brief.md type TaskDomain: guide absent source "Names the closed vocabulary of the subject matter a brief operates on."
guides/brief.md type OutputFormat: guide absent source "Names the closed vocabulary of deliverable shapes."
guides/brief.md type RiskSeverity: guide absent source "Names the closed vocabulary of risk severities."
guides/brief.md type BriefStage: guide absent source "Names the fixed compilation phases, in pipeline order."
guides/brief.md type BriefErrorCode: guide absent source "Names the machine-readable reasons a `BriefError` carries."
guides/brief.md interface Task: guide absent source "States what the brief asks for, in one imperative sentence."
guides/brief.md interface Reference: guide absent source "Represents one referenced path and why it is listed."
guides/brief.md interface Manifest: guide absent source "Represents the disjoint file partitions of a brief."
guides/brief.md interface Outcome: guide absent source "Represents one ranked outcome — a result, never a step."
guides/brief.md interface Given: guide absent source "Represents one context fact handed to the executor — a convention, a version, a constraint value."
guides/brief.md interface Example: guide absent source "Represents one input to output exemplar — the ambiguity remover that leaves the least to interpret."
guides/brief.md interface Citation: guide absent source "Represents one external source — what it is called, where it lives, and why it is cited."
guides/brief.md interface Gap: guide absent source "Represents one unknown the brief has not resolved."
guides/brief.md interface Risk: guide absent source "Represents one pre-empted risk and the mitigation that answers it."
guides/brief.md interface Output: guide absent source "Represents the closed shape of the deliverable."
guides/brief.md interface Proof: guide absent source "Represents one mechanical, transcript-provable check."
guides/brief.md interface Brief: guide absent source "Represents the closed execution contract — a rough request with every implicit decision resolved."
guides/brief.md interface BriefInput: guide absent source "Represents one `compile()` input."
guides/brief.md interface Briefing: guide absent source "Represents the full, replayable outcome of one `compile()` call."
guides/brief.md interface Dispatch: guide absent source "Represents the subagent projection of a brief."
guides/brief.md interface InterpretStageRecord: guide absent source "Records the `interpret` phase snapshot — raw text in, an `Interpretation` out."
guides/brief.md interface DraftStageRecord: guide absent source "Records the `draft` phase snapshot — the caller's input in, an unpinned `Brief` out."
guides/brief.md interface GateStageRecord: guide absent source "Records the `gate` phase snapshot — the readiness `Subject` in, the reasoner's verdict out."
guides/brief.md interface PinStageRecord: guide absent source "Records the `pin` phase snapshot — the drafted `Brief` in, the pinned `Brief` out."
guides/brief.md type BriefStageRecord: guide absent source "Represents one pipeline phase, discriminated by `stage`."
guides/brief.md interface BriefStageFailure: guide absent source "Represents a visible marker for a phase that failed."
guides/brief.md interface BriefRecord: guide absent source "Represents a versioned, content-hashed `Brief` inside a `BriefManagerInterface`."
guides/brief.md type BriefCompilerEventMap: guide absent source "Declares the `BriefCompiler`'s push observation surface."
guides/brief.md interface BriefCompilerOptions: guide absent source "Represents the input to `createBriefCompiler`."
guides/brief.md interface BriefCompilerInterface: guide absent source "Declares the compilation orchestrator contract."
guides/brief.md type BriefManagerEventMap: guide absent source "Declares the `BriefManager`'s push observation surface."
guides/brief.md interface BriefManagerOptions: guide absent source "Represents the input to `createBriefManager`."
guides/brief.md interface BriefManagerInterface: guide absent source "Declares the brief registry contract."
guides/brief.md const TASK_OPERATIONS: guide "The `TaskOperation` values, frozen — compose with `literalOf(…)` / `parseEnum(…)`." source "Lists the `TaskOperation` values, frozen."
guides/brief.md const TASK_DOMAINS: guide "The `TaskDomain` values, frozen." source "Lists the `TaskDomain` values, frozen."
guides/brief.md const OUTPUT_FORMATS: guide "The `OutputFormat` values, frozen." source "Lists the `OutputFormat` values, frozen."
guides/brief.md const RISK_SEVERITIES: guide "The `RiskSeverity` values, frozen." source "Lists the `RiskSeverity` values, frozen."
guides/brief.md const INTERPRETATION_MEMBERS: guide "Every published `Interpretation` member name, frozen — the capture list, pinned to `keyof Interpretation`." source "Lists every published `Interpretation` member name, frozen."
guides/brief.md const DEFAULT_BRIEF_TURNS: guide "`16` — the default turn cap `briefToGoal` renders; domain-qualified to keep the barrel clean." source "Holds `16` — the default turn cap `briefToGoal` renders."
guides/brief.md const GATE_ID: guide "`'gate'` — the id of the `buildGateDefinition()` logical definition." source "Holds `'gate'` — the id of the `buildGateDefinition()` logical definition."
guides/brief.md const LINE_BREAK_PATTERN: guide "The ECMAScript line terminators a brief field refuses; unanchored and flagless-`g`." source "Matches every line terminator a brief field refuses."
guides/brief.md const SINGLE_LINE_PATTERN: guide "The positive form of `LINE_BREAK_PATTERN`, for `stringShape`'s `pattern` — the same class as `LINE_BREAK_PATTERN`, expressed the other way." source "Holds the positive form of `LINE_BREAK_PATTERN`, for the shape DSL."
guides/brief.md const BLANK_PATTERN: guide "One or more spaces and nothing else — the one exemplar side `exampleToLines` must not pad; an EMPTY side is padded like any other, because CommonMark strips a fully-blank span to nothing while an unpadded empty span leaves an unclosed backtick run." source "Matches a string of one or more spaces and nothing else."
guides/brief.md class BriefError: guide "Carries a `BriefErrorCode` and optional `context`." source "Represents the one error class this package throws."
guides/brief.md function isBriefError: guide "Narrow a caught value to a `BriefError`." source "Narrows a caught value to a `BriefError`."
guides/brief.md const isText: guide absent source "Checks whether the value is a string holding no line terminator, empty included."
guides/brief.md const isLine: guide absent source "Checks whether the value is a non-empty string holding no line terminator."
guides/brief.md const isTaskOperation: guide absent source "Checks whether the value is one of the `TaskOperation` literals."
guides/brief.md const isTaskDomain: guide absent source "Checks whether the value is one of the `TaskDomain` literals."
guides/brief.md const isOutputFormat: guide absent source "Checks whether the value is one of the `OutputFormat` literals."
guides/brief.md const isRiskSeverity: guide absent source "Checks whether the value is one of the `RiskSeverity` literals."
guides/brief.md const isTask: guide absent source "Checks whether the value is a well-formed `Task` — both vocabularies closed, statement one line."
guides/brief.md const isReference: guide absent source "Checks whether the value is a well-formed `Reference` — both members required, both single-line."
guides/brief.md const isManifest: guide absent source "Checks whether the value is a well-formed `Manifest`."
guides/brief.md const isOutcome: guide absent source "Checks whether the value is a well-formed `Outcome` — `rank` a positive integer."
guides/brief.md const isGiven: guide absent source "Checks whether the value is a well-formed `Given` — its `value` may be empty but stays one line."
guides/brief.md const isExample: guide absent source "Checks whether the value is a well-formed `Example`."
guides/brief.md const isCitation: guide absent source "Checks whether the value is a well-formed `Citation` — every member single-line."
guides/brief.md const isGap: guide absent source "Checks whether the value is a well-formed `Gap`."
guides/brief.md const isRisk: guide absent source "Checks whether the value is a well-formed `Risk` — `severity` on the closed vocabulary."
guides/brief.md const isOutput: guide absent source "Checks whether the value is a well-formed `Output` — `format` on the closed vocabulary."
guides/brief.md const isProof: guide absent source "Checks whether the value is a well-formed `Proof`."
guides/brief.md const isBrief: guide absent source "Checks whether the value satisfies the whole exact-record `Brief` contract."
guides/brief.md const textShape: guide absent source "Describes a single-line string of any length, including empty."
guides/brief.md const lineShape: guide absent source "Describes a non-empty single-line string — the shape mirror of `isLine`."
guides/brief.md const taskShape: guide absent source "Describes the `Task` shape — closed operation and domain vocabularies plus a non-empty statement."
guides/brief.md const referenceShape: guide absent source "Describes the `Reference` shape — a path and the note that justifies listing it."
guides/brief.md const manifestShape: guide absent source "Describes the `Manifest` shape — disjoint reference partitions."
guides/brief.md const outcomeShape: guide absent source "Describes the `Outcome` shape — a one-based rank, the result text, and whether it gates done."
guides/brief.md const givenShape: guide absent source "Describes the `Given` shape — one categorized context fact."
guides/brief.md const exampleShape: guide absent source "Describes the `Example` shape — one input to output exemplar."
guides/brief.md const citationShape: guide absent source "Describes the `Citation` shape — a name, a locator, and why the source is cited."
guides/brief.md const gapShape: guide absent source "Describes the `Gap` shape — an unknown, whether it blocks, and the candidates that would close it."
guides/brief.md const riskShape: guide absent source "Describes the `Risk` shape — a closed severity, the risk, and its mitigation."
guides/brief.md const outputShape: guide absent source "Describes the `Output` shape — a closed format plus its optional refinements."
guides/brief.md const proofShape: guide absent source "Describes the `Proof` shape — the claim and the command that settles it."
guides/brief.md const briefShape: guide absent source "Describes the whole `Brief` shape, section shapes composed."
guides/brief.md function buildTask: guide absent source "Assembles a `Task` from an operation, a domain, and a statement."
guides/brief.md function buildReference: guide absent source "Assembles a `Reference` from a path and the note that justifies listing it."
guides/brief.md function buildManifest: guide absent source "Assembles a `Manifest`, defaulting every absent partition to an empty list."
guides/brief.md function buildOutcome: guide absent source "Assembles an `Outcome` from a rank and its result text."
guides/brief.md function buildGiven: guide absent source "Assembles a `Given` from a category, a name, and a value."
guides/brief.md function buildExample: guide absent source "Assembles an `Example` from an exemplar input and its expected output."
guides/brief.md function buildCitation: guide absent source "Assembles a `Citation` from a name, a URL, and the note that justifies citing it."
guides/brief.md function buildGap: guide absent source "Assembles a `Gap` from the section it belongs to and the question that would close it."
guides/brief.md function buildRisk: guide absent source "Assembles a `Risk` from a severity, what could go wrong, and the mitigation that answers it."
guides/brief.md function buildOutput: guide absent source "Assembles an `Output` from a format plus its optional refinements."
guides/brief.md function buildProof: guide absent source "Assembles a `Proof` from what the check settles and the command that settles it."
guides/brief.md function buildBrief: guide absent source "Assembles a `Brief` from a `Task` plus section overrides."
guides/brief.md function buildGateDefinition: guide absent source "Assembles the fail-closed readiness gate as a reasons `LogicalDefinition`."
guides/brief.md function briefToMarkdown: guide "Project a `Brief` into the copy-ready agent prompt — sections in authority order, paths referenced, never inlined; an empty section is omitted." source "Projects a brief into the copy-ready agent prompt."
guides/brief.md function briefToGoal: guide "Project a `Brief` into a `/goal` completion condition — the proofs' commands verbatim plus a turn cap defaulting to `DEFAULT_BRIEF_TURNS`." source "Projects a brief into a `/goal` completion condition."
guides/brief.md function briefToDispatch: guide "Project a `Brief` into a `Dispatch` — `manifest.edit` becomes the owned set, `locked` and `forbidden` do-not-touch, and `authority` the ranked precedence list." source "Projects a brief into a subagent `Dispatch`."
guides/brief.md function briefToSubject: guide "Project a `Brief` into a reasons `Subject` of readiness measures the gate rules read." source "Projects a brief into the reasons `Subject` of readiness measures the gate reads."
guides/brief.md function briefToHash: guide "The canonical structural digest of a brief's content, with `trace` and `hash` stripped first." source "Computes the canonical structural digest of a brief's content."
guides/brief.md function briefToTrace: guide "The one-line census `pinBrief` stamps on — operation/domain, outcomes, blocking-over-total gaps, proofs; re-derived by `BriefManager` to reconcile an inbound `trace`." source "Renders the one-line census `pinBrief` stamps onto a brief."
guides/brief.md function briefToContent: guide "The canonical TEXT the hash describes — the identity two briefs must share to be the same brief, since eight hex digits are not identity." source "Renders the canonical text of exactly what a brief's hash describes."
guides/brief.md function findUnmetRules: guide "The readiness rules a brief fails, measured in CODE — the gate's decision, which `compile` makes rather than delegating to a borrowed engine." source "Lists the readiness rules a brief fails, computed directly from its own measures."
guides/brief.md function pinBrief: guide "Return a fresh `Brief` with `trace` and `hash` filled — deterministic, no clocks, no run-specific data, idempotent, and deeply frozen." source "Returns a fresh brief with `trace` and `hash` derived from its own content."
guides/brief.md function snapshotBrief: guide "One deeply owned, deeply frozen, validated reading of a `Brief` — the door `pinBrief`, `BriefManager`, `briefToMarkdown`, `briefToGoal`, and `briefToDispatch` cross." source "Returns a deeply owned, deeply frozen copy of a brief, refusing anything off-contract."
guides/brief.md function captureValue: guide "A primitive passes through; an object a structured clone refuses becomes a frozen plain view of its own enumerable members, each named published member read once." source "Captures one stable, frozen view of a foreign contract value."
guides/brief.md function assertBrief: guide "Narrow unknown data to a `Brief` by IDENTITY, throwing `BriefError` `INVALID` when the guard refuses." source "Narrows unknown data to a `Brief`, throwing when it is off-contract."
guides/brief.md function exampleToLines: guide "Render one `Example` as markdown lines — a single-line pair becomes one row, a multi-line pair becomes a fenced block." source "Renders one exemplar as markdown lines."
guides/brief.md function validateBrief: guide "The semantic pass over an already-shape-valid brief; returns a reasons `ReasonValidationResult`, never throws." source "Runs the semantic pass over an already-shape-valid brief."
guides/brief.md function countSentences: guide "The sentence count of a statement — `validateBrief` errors when it is not exactly one." source "Counts the sentences a statement holds."
guides/brief.md function findBlockingGaps: guide "The gaps with `blocking: true`; non-empty means the gate MUST fail closed." source "Lists the gaps that block emission."
guides/brief.md function findManifestOverlaps: guide "The paths appearing in more than one manifest partition, once each." source "Lists the paths appearing in more than one manifest partition."
guides/brief.md function findUngrantedAuthority: guide "The authority paths no partition opens — every ranked path must appear in `read`, `edit`, or `locked`, because the executor cannot obey what it cannot open." source "Lists the authority paths the manifest never grants access to."
guides/brief.md function findUnpairedGaps: guide "The open gaps past the assumption count — the discipline is exactly one recorded assumption per open gap." source "Lists the open gaps with no assumption to stand on."
guides/brief.md function deriveStatement: guide "Derive one imperative statement from free text — whitespace collapsed, first letter raised, terminator appended; `undefined` for empty or whitespace-only text." source "Derives one imperative statement from free text."
guides/brief.md function deriveTask: guide "Derive a `Task` from an interprets `Intent` through CALLER action and domain vocabularies; `undefined` when either side is unmapped." source "Derives a `Task` from an interprets `Intent` through the caller's vocabularies."
guides/brief.md function deriveGivens: guide "Derive `Given[]` from an interprets `Entity[]` — each becomes a `{ category: 'extracted', name, value }` fact." source "Derives `Given[]` from an interprets `Entity[]`."
guides/brief.md function deriveGaps: guide "Derive `Gap[]` from an interprets `Ambiguity[]` — REQUIRED ambiguities become BLOCKING gaps, the rest open." source "Derives `Gap[]` from an interprets `Ambiguity[]`."
guides/brief.md function errorToMessage: guide "Render a value thrown by a stage into the message a `BriefStageFailure` carries — TOTAL, because it runs inside the `catch` that contains a stage failure." source "Renders a value thrown by a stage into a message."
guides/brief.md function freezeDeep: guide "Freeze a value and everything reachable from it, cycles included — `Object.freeze` is shallow, so a frozen record's nested arrays stayed writable." source "Freezes a value and everything reachable from it."
guides/brief.md function freezeBranch: guide "Freeze one branch against a shared visited set — the recursion `freezeDeep` drives." source "Freezes one branch of a value graph, skipping what the visited set already holds."
guides/brief.md function parseBrief: guide "Parse a JSON string into a `Brief`, or `undefined` on invalid JSON or a shape that fails `isBrief`." source "Parses a JSON string into a `Brief`."
guides/brief.md function createBriefCompiler: guide absent source "Creates a compilation orchestrator."
guides/brief.md function createBriefManager: guide absent source "Creates a brief registry."
guides/brief.md function createBriefContract: guide absent source "Compiles `briefShape` into a guard, parser, JSON Schema, and seeded generator bundle."
guides/brief.md class BriefCompiler: guide "The compilation orchestrator — runs the `interpret` → `draft` → `gate` → `pin` pipeline and owns or borrows the interpret pipeline and the gate's `Reason`." source "Implements the compilation orchestrator — the `[interpret, draft, gate, pin]` pipeline."
guides/brief.md class BriefManager: guide "The self-owning, versioned and content-hashed brief registry — record ids default to each brief's own content hash." source "Implements the self-owning, versioned and content-hashed brief registry."
guides/brief.md BriefCompilerInterface.compile: guide absent source absent
guides/brief.md BriefCompilerInterface.gate: guide absent source absent
guides/brief.md BriefCompilerInterface.destroy: guide absent source absent
guides/brief.md BriefManagerInterface.has: guide absent source absent
guides/brief.md BriefManagerInterface.brief: guide absent source absent
guides/brief.md BriefManagerInterface.briefs: guide absent source absent
guides/brief.md BriefManagerInterface.add: guide absent source absent
guides/brief.md BriefManagerInterface.remove: guide absent source absent
guides/brief.md BriefManagerInterface.destroy: guide absent source absent
guides/brief.md pitch: readme absent tagline "A synchronous, deterministic specification compiler on top of the `@orkestrel/reason` engine. A rough request compiles into a `Brief` — a closed, JSON-serializable execution contract another agent can run with no interpretation left to do — and every downstream artifact is PROJECTED from that one source of truth, never authored separately. FORWARD: raw text runs through an injected `@orkestrel/interpret` pipeline, its `Interpretation` is drafted into brief sections (intent to `task`, entities to `givens`, ambiguities to `gaps`), caller-supplied sections merge OVER the draft, the fail-closed gate is evaluated as a reasons `LogicalDefinition` — a traceable verdict, never an ad-hoc `if` — and a passing brief is pinned (`trace` and `hash` derived, never authored). REVERSE: `briefToMarkdown` / `briefToGoal` / `briefToDispatch` project the pinned brief into its downstream views. Nothing here is an LLM, provider, or agent: the markdown a projection renders is FOR an external model, never consumed internally. A brief with blocking gaps yields a visible INCOMPLETE `Briefing` carrying the questions, because a half-specified brief is worse than a question. Every discriminant names its axis, never `kind` or `type`: `stage` splits the pipeline phases, `severity` splits risks, `code` splits coded errors — and a record whose container already fixes what it is, like a referenced path, or whose candidate vocabulary was neither closed nor disjoint, like a cited source, carries no discriminant at all. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 133
```

## Decisions recorded

- **The examples loop keeps `source.examples(implementation)`.** Item 2's third bullet describes the
  pilot's `entity === group.interface` conditional and its concatenation. This package's file has
  neither: its loop reads the implementation's examples alone, and its `it` blocks are named for
  this suite's codes rather than split per group the way the pilot's are. Adopting the conditional
  would widen what the assertion reads, which item 2's "No other change to the suite" forbids, so
  the mapped-to-name adaptation was applied to the expression already there. The file therefore does
  not match the pilot byte for byte, and it could not: reconciling the whole file is a restructure
  outside this unit.
- **The re-wrap in `tests/setup.ts` is a comment-only reflow** inside paragraphs the unit already
  rewrote, taken because the committed file carried no line past the configured `printWidth: 100`
  and the partial run introduced several.
- **`src/core/types.ts:136` stays a single line at 108 characters,** matching its neighbour at
  `:129` (106 characters, committed) and every other single-line interface doc block in that file.

## Deviation state

None. `repair` wrote no path outside the P21 list, every before-text was found verbatim, no voice
diagnostic named an off-limits file, `test:policy` reds on nothing, and no gate other than `docs`
reads red.

## Wall clock

First command 2026-09-07T20:33:44Z, last command 2026-09-07T20:45:31Z — 11 minutes 47 seconds.

Instruments and logs retained under `/home/user/fleet/brief/tmp/d7n-brief-prep/`. From the
terminated run: `repair.log.txt`, `voice.py`, `apply.py`, `oxlint-before.log.txt`,
`oxlint-after.log.txt`, `test-policy-before.log.txt`, `test-policy-after.log.txt`,
`test-guides-after.log.txt`, `test-config-after.log.txt`. From this run: `baseline/`,
`baseline-lint.log.txt`, `oxlint.log.txt`, `oxlint2.log.txt`, `format.log.txt`, `format2.log.txt`,
`formatcheck.log.txt`, `formatcheck2.log.txt`, `check.log.txt`, `check2.log.txt`,
`test-guides.log.txt`, `test-guides2.log.txt`, `test-policy.log.txt`, `test-policy2.log.txt`,
`test-config.log.txt`, `test-config2.log.txt`, `test-setup.log.txt`, `test-src.log.txt`,
`docs.log.txt`, `docs2.log.txt`. The whole directory is under the checkout's ignored `tmp/`.
