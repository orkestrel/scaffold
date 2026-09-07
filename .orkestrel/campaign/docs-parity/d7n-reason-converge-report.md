# Report — P.2 `d7n-reason-converge`

Every criterion closed. Findings to carry: the brief's factory locator is wrong, and the equality
case does not fit the default per-test budget on a guide this size. Wall clock
2026-09-07T15:56:26Z → 2026-09-07T16:27:00Z in `/home/user/fleet/reason`, from the clean baseline
`b4f2e92`.

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after adding the equality case, the title pin, and the README case, and before
any convergence, exit 1:

```text
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 3 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/reason.md pairs: guide [\"Surface\",\"Quantitative scoring\",\"Quantitative scoring\",\"Numeric domains\", …

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:145:20
    145|  expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > Reason > keeps every compared summary and example equal to its source
AssertionError: expected [ …(371) ] to deeply equal []
+   "guides/reason.md function createReason: guide \"Create a `ReasonInterface` — the orchestrator — seeded from `ReasonOptions.reasoners`.\" source \"Creates the reasoning orchestrator.\"",

 Test Files  1 failed (1)
      Tests  3 failed | 94 passed (97)
```

The equality case's shape changed after this reading (see § Finding 2), so its control was re-taken
on the converged tree: replacing one `Summary` cell text with `Lists every rule in orderX.` reddened
it with the worklist line
`guides/reason.md RuleManagerInterface.rules: guide "Lists every rule in orderX." source "Lists every rule in order."`,
`Tests 1 failed | 96 passed (97)`. The plant was reversed by editing and `guides/reason.md` verified
byte-identical by SHA-256 before and after.

## Criterion 2 — headers and class rows

Every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, or `Returns`.
The header rows the unit changed, with the text they carried:

| Guide table | Old last header |
| --- | --- |
| `### Value factories` | `Creates…` |
| `### Validators` | `Narrows to` |
| Every `## Methods` table (`ReasonInterface` through `SubjectBuilderInterface`) | `Behavior` |
| `### Types` | none — the table carried `Shape` and no compared column, and gained `Summary` as its last column |

The final header inventory, read from the tree the unit leaves:

```text
## Surface : ['API', 'Kind', 'Summary'] ×10, ['Type', 'Kind', 'Shape', 'Summary'] ×1
## Methods : ['Method', 'Returns', 'Summary'] ×14
## Patterns: ['Entity', 'Event map', 'Events']   (outside the gate's sections; unchanged)
```

`### Entities` became `### Classes`: every row's `Kind` is `class` (`DefinitionBuilder`,
`GroupManager`, `FactorManager`, `RuleManager`, `EquationManager`, `VariableManager`, `FactManager`,
`InferenceManager`, `SubjectBuilder`). The one in-guide reference moved with it — `(§ Entities)` →
`(§ Classes)` in the § Helpers intro. `### Orchestrator & reasoners` and `### Operators` are also
all-class tables and keep their topical headings, because ruling 5 converts a `### Entities` heading
and nothing else.

No class is documented under its own H3: every H4 in `## Methods` names an interface
(`ReasonInterface` … `SubjectBuilderInterface`), so no `### Classes` row had to be added for an
H3-documented class.

## Criterion 3 — the cells and the doc blocks

**Direction.** Ruling 6's test was applied per row: the source doc block already carried every fact
the guide cell carried, in its description or its `@remarks`, for every row except the ones listed
in this section. The propagation therefore ran source → guide.

**Rows whose literal stayed in `Shape`.** Every row of `### Types`. The `Shape` cell now holds a type
alias's value or an interface's members in braces, and the clause after the em dash moved out of the
cell. Rows whose old `Shape` cell carried no literal at all were given one from the declaration:
`Factor`, `FactorGroup`, `Rule`, `Equation`, `Inference`, `Definition`, `DefinitionEnvelope`,
`ReasonResult`, `ReasonEventMap`, and every `*ManagerInterface`, `*EventMap`, and builder interface.
The convention sentence sits under the `### Types` heading, above the table, the placement the pilot
uses at `/home/user/fleet/abort/guides/abort.md:60`:

```text
A `Shape` cell holds an interface's members in braces, and a type alias's value.
```

**Non-`Summary` cells against the baseline.** Compared against `git show HEAD:guides/reason.md` by
splitting on a pipe not preceded by a backslash:

```text
rows keyed: 334 | baseline row instances: 402 | after: 402
non-Summary differences among same-width rows: 0
rows that gained a column: 95 (all in ### Types — its 94 rows plus its header)
```

No row was lost, no row was added, and no non-`Summary` cell outside `### Types` moved.

**Blocks rewritten by hand.**

- *Interface member doc blocks, new in `src/core/types.ts`.* The `## Methods` tables compared against
  nothing: the interface members carried no doc blocks at all, so the source side of every method row
  read `absent`. Each member of `ReasonInterface`, `ReasonerInterface`, `EvaluatorInterface`,
  `TransformerInterface`, `AggregatorInterface`, `GroupManagerInterface`, `FactorManagerInterface`,
  `RuleManagerInterface`, `EquationManagerInterface`, `FactManagerInterface`,
  `InferenceManagerInterface`, `VariableManagerInterface`, `DefinitionBuilderInterface`, and
  `SubjectBuilderInterface` gained a description paragraph written verb-first from the cell it had to
  equal. `ReasonInterface.reason` and `SubjectBuilderInterface.set` also gained an `@remarks` for the
  reference material the cell could not hold (`MISSING` on an unregistered reasoning; the
  `assignField` delegation). No `@remarks` restates the `// Array overload first…` line comment
  beside it — that line is `src/**` code outside a doc block and off-limits, so the duplicate was
  pruned from the block rather than from the code.
- *Descriptions carrying an all-caps emphasis.* Rewritten so the cell they feed reads plainly:
  `DefinitionBuilder` (`src/core/builders/DefinitionBuilder.ts`), `FactorManager`
  (`src/core/builders/managers/FactorManager.ts`), `Rule` (`src/core/types.ts`),
  `isDefinitionBuilder` and `isSubjectBuilder` (`src/core/validators.ts`), and `findDuplicates`,
  `factToKey`, `computePremiseConfidence`, `containsVariable`, `invertLeft`, `invertRight`,
  `extractConclusions`, `appendById`, `prependById`, `replaceById`, `replaceGroup`, `replaceFactor`,
  `replaceRule`, `replaceEquation`, `replaceFact`, and `replaceInference` (`src/core/helpers.ts`).
- *Blocks the guide cell out-informed.* `isCheckResult` gained the `@remarks` carrying the
  cell's presence-not-value rule and its consequence — `actual: undefined` does not survive
  `JSON.stringify`, so the round-tripped record is refused. `isFactorResult` gained the `@remarks`
  for its absent-or-valid optional members. The claim was run before it was written:
  `node -e "console.log(JSON.stringify(JSON.parse(JSON.stringify({field:'age',met:true,actual:undefined}))))"`
  → `{"field":"age","met":true}`, and `src/core/validators.ts:909` reads
  `Reflect.has(result, 'actual')`.

**The `--to guide` runs.**

```text
npm run docs -- --to guide   rows read: 1, disagreements found: 373, written: 371, reported: 2
npm run docs -- --to guide   rows read: 1, disagreements found: 22,  written: 21,  reported: 1
```

The first run reported the titled example (`the guide fence owns an example`) and the pitch (`the
README pitch is authored by hand`) — both closed by hand afterwards. The second run
carried the caps corrections across. `npx oxfmt --write guides/reason.md` followed each.

## Criterion 4 — the titled pair

The pair is `createReason`'s `@example` in `src/core/factories.ts:261` and the `## Surface` fence of
`guides/reason.md`, titled **Create an orchestrator and score a subject**.

The fence sits under the structural heading `## Surface`, so Ruling 9 applied: a `###` heading of
that text was added directly above the fence's paragraph, the structural heading stayed, and no fence
moved. Heading-scoped uniqueness, read on the tree the unit leaves:

```text
$ grep -c '^#\+ Create an orchestrator and score a subject' guides/reason.md
1
$ grep -rn '@example \S' src/
src/core/factories.ts:261: * @example Create an orchestrator and score a subject
```

Fence bodies read before choosing: the `## Surface` fence body (guide lines 12–35 at the time of the
read) carries no three-backtick run and no `*/`, so it was eligible. The `### Quantitative scoring`
fences were the alternative and were not taken (see § Finding 1).

`--to source` ran last, after `npm run docs` read the summaries at zero disagreements:

```text
npm run docs -- --to source
wrote src/core/factories.ts
rows read: 1, disagreements found: 1, written: 1, reported: 0
```

`written: 1`, as the brief predicts for a converged tree.

## Criterion 5 — the tagline, the opening prose, the README

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold, and the
README carries the same text with the same line breaks:

```text
> A synchronous, deterministic reasoning engine: declarative JSON-serializable
> definitions evaluated against plain subject records to produce traceable
> results, through the `quantitative`, `logical`, `symbolic`, and `inferential`
> strategies behind one dispatch surface.
```

The old blockquote's bold, its `[src/core](../src/core)` link, and its "Four strategies" count are
gone. The displaced sentences fold into new paragraphs between the blockquote and `## Surface`,
restating none of the tagline's clauses: the first names what each strategy does and what the
operators and results carry; the second is the design stance; the third is the capability layer, the
build-outside rule, the deliberate absences, and the `src/core` source pointer.

The README's opening paragraph keeps the onboarding it alone carries and gained the entry point the
pitch no longer states:

```text
Register the reasoners you need on an orchestrator with the `createReason`
function, build a definition as plain data, then call `reason` with a subject
and read the traceable result it returns. Environment-agnostic — no I/O, no
browser or server assumptions. Part of the `@orkestrel` line.
```

Further README sentences changed under the voice sweep: `pass an ARRAY of subjects` → `pass an
array of subjects`, and `the four reasoners, the three operators, … the two workspace builders
(DefinitionBuilder / SubjectBuilder)` → `the reasoners, the operators, … the DefinitionBuilder and
SubjectBuilder workspaces`.

**The voice sweep over prose.** All-caps emphasis was removed from every authored paragraph, list
item, and section intro of `guides/reason.md` and `README.md`. Real tokens
stay (`JSON`, `NaN`, `JS`, `UI`, `MCP`, `DSL`, `API`, `AGENTS`, `README`, the `MISSING` / `INVALID` /
`MISMATCH` / `DESTROYED` / `TARGET` / `OPERATOR` codes) and so does the `DOC ↔ SOURCE` label in
§ Contract, which is a stylized label rather than an emphasized word; the pilot keeps the same label
at `/home/user/fleet/abort/guides/abort.md:85`. Counts were deleted rather than corrected:
`the four definition kinds plus a four-helper subject engine` → `every definition kind, plus a
subject engine of pure helpers`; `The three operators (Evaluator / Transformer / Aggregator)` → `The
Evaluator, Transformer, and Aggregator operators`; `Three quirks to design around` → `Quirks to
design around`; `Narrow in two passes` → `Narrow first with … then with …`; `the two meanings of is…`
→ `what each is… guard narrows`; `all ten comparisons` → `every comparison`; `bail both ways` → `bail
on and off`; `exhaustive, both directions` → `exhaustive in each direction`; `the four reasoners` →
`the reasoners`; `The two workspace builders` → `The workspace builders`; `Three chained 5% / 5% /
15% increases` → `Chained 5% / 5% / 15% increases`. Kept as values rather than counts: `vacuously
true below two operands` (a threshold), `one hundred $0.1 line items` and `10,000 levels of nesting`
(worked figures), `4 places` / `4th place` (measurements), `both are caller misuse` in § Contract
item 3 (the sentence names `MISSING` and `INVALID` immediately before it), and every `one` used as a
rate or a singular.

`Summary` cells were left out of the prose sweep and corrected at their source instead, because a
cell rewritten without its doc block reddens the gate.

## Criterion 6 — the seed

```text
$ npm run docs                        rows read: 1, disagreements found: 0            exit 0
$ npm run docs -- --to guide          rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source         rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

```text
$ npx oxfmt --check README.md guides/reason.md tests/guides.test.ts src/core/
All matched files use the correct format.
Finished in 1059ms on 29 files using 4 threads.                                       exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings README.md guides/reason.md tests/guides.test.ts src/core/
(no output)                                                                           exit 0

$ npm run check                                                                       exit 0

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  97 passed (97)
   Duration  10.10s (transform 693ms, setup 774ms, import 8.16s, tests 962ms, environment 0ms)

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
```

Observations, not criteria:

```text
$ npm run test:src:core     Test Files 23 passed (23)   Tests 1203 passed (1203)       exit 0
$ npm run test:config       Test Files  1 passed (1)    Tests 172 passed | 1 skipped (173)  exit 0
```

## Criterion 8 — status

```text
$ git status --short
 M README.md
 M guides/reason.md
 M src/core/builders/DefinitionBuilder.ts
 M src/core/builders/managers/FactorManager.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. `package.json`, `package-lock.json`, `guides/README.md`, `tests/setup*.ts`,
`tests/src/**`, and every vendored file are untouched.

```text
 README.md                                   |  32 +-
 guides/reason.md                            | 973 ++++++++++++++--------------
 src/core/builders/DefinitionBuilder.ts      |   4 +-
 src/core/builders/managers/FactorManager.ts |   4 +-
 src/core/factories.ts                       |  32 +-
 src/core/helpers.ts                         |  42 +-
 src/core/types.ts                           | 296 ++++++++-
 src/core/validators.ts                      |  14 +-
 tests/guides.test.ts                        |  80 ++-
 9 files changed, 940 insertions(+), 537 deletions(-)
```

## Reader and seed findings

### Finding 1 — the brief's primary-factory locator names the wrong function

The brief's facts block, under `@example` blocks and exported factories, lists these factories from
`src/core/factories.ts` and no others:

```text
    src/core/factories.ts:95:export function createEvaluator(options?: EvaluatorOptions): EvaluatorInterface {
    src/core/factories.ts:116:export function createTransformer(options?: TransformerOptions): TransformerInterface {
    src/core/factories.ts:137:export function createAggregator(options?: AggregatorOptions): AggregatorInterface {
```

`grep -n '^export function' src/core/factories.ts` returns every factory of that one file,
`createReason` among them at line 273 of the baseline and 289 of the tree this unit leaves. The facts block's `src/**/*.ts` glob under-collected, so
"the first `create*` the facts block lists" points at `createEvaluator` — an operator factory, not
this package's primary factory. The brief's governing phrase is "the primary factory's block", and it
delegates "which of two eligible fences carries the title" to the unit, so the title went to
`createReason`: the orchestrator the guide's § Surface opens with, whose fence the README's onboarding
now names. `createEvaluator` has no heading whose *first* fence demonstrates it either — the operators
appear in the second fence of `### Quantitative scoring` — so titling it would have needed a new
heading above a mid-section fence for no gain.

No brief fact was relied on unverified elsewhere; the manifest rows, the heading list, the table
header lines, and the first `docs` worklist all matched the tree.

### Finding 2 — `findDrift` does not fit the default per-test budget on a guide this size

With the equality case written the pilot's way — `findDrift(guide, source)` called inside the `it` —
`npm run test:guides` failed on the converged tree:

```text
 FAIL  |guides| tests/guides.test.ts > Reason > keeps every compared summary and example equal to its source
Error: Test timed out in 5000ms.
 ❯ tests/guides.test.ts:219:3
```

Measured on the host, with the readers constructed first so only the comparison is timed:

```text
construct ms 61
findDrift ms 5192 rows 0
findDrift second ms 4846
```

`npm run docs` over the same pair takes `real 0m10.108s`, so the cost is the comparison rather than
collection or startup, and the second call shows it is not a warm-up. A second probe split
`findDrift`'s own work over the same readers and located it:

```text
source.surface()            115 ms
source.surface() again        0 ms
method groups                14
every source.methods(group) 435 ms
collectTitles              4694 ms
```

`collectTitles` is the hot spot. `findDrift` calls it unconditionally, and it walks the titled
`@example` blocks reachable from every documented declaration head and every own member of every
documented class and interface — which on this guide is the whole `### Types` table plus every
`## Methods` group — to resolve the titles the fences carry. This guide carries one titled fence.

**What the unit did.** The `findDrift` call moved out of the `it` into the manifest loop's own scope,
beside the `createGuide` and `createSource` calls that already sit there; the `it` formats the drift
rows and asserts. The collected line shape, the `absent` rendering, and the case's position inside
`describe(entry.concept)` are all unchanged, and the case still reddens (the control under
§ Criterion 1). No timeout was inflated and no configuration file was touched.

**What the guide's release should decide.** A per-package workaround is not a fix: any fleet package
with a guide of this size meets the same wall. The cheap fix is inside `collectTitles` — it can stop
once the guide's own fence titles are resolved, rather than collecting every reachable block first —
and the fleet template can place the `findDrift` call at loop scope as this unit now does. Both
probes ran from a throwaway file under the checkout's git-ignored `tmp/`, against
`@orkestrel/guide@0.0.18` and `guides/reason.md`, and both files were deleted before the unit
returned. `tmp/units/` predates this unit and was left alone.

No other reader defect was met. `replaceCell` re-rendered every four-column `### Types` row, its
escaped pipes inside union literals, and its nested code spans without disturbing a cell outside the
written column, and `replaceExample` carried the titled fence body in on one write.

## Ancillary decisions recorded

- The `Shape` convention sentence sits between the `### Types` heading and its table, matching the
  pilot's placement, rather than after the table.
- `### Orchestrator & reasoners` and `### Operators` keep their topical headings although every row
  is a class; ruling 5 names `### Entities` and only that.
- The `SUBJECT_BUILDER_BRAND` and `DEFINITION_BUILDER_BRAND` facts left the `DefinitionBuilder` and
  `SubjectBuilder` `Summary` cells when those cells took their doc blocks' descriptions. Both survive in the guide: in the
  `### Types` `Shape` cells for `SubjectBuilderInterface` and `DefinitionBuilderInterface`, and in the
  `### Constants` rows for the brand symbols themselves.
- The `// Array overload first so a list resolves to the batch form.` line comments were left in
  place. They are `src/**` code outside a doc block and off-limits, so the `@remarks` restating them
  was pruned instead.
- Nothing was planted for the lint control; the § Criterion 1 plant is the equality case's own
  control on a file this unit owns, and it was reversed and hash-verified.

## Deviation

None. No cell went unlocated after the header changes, no doc block refused the titled body, no test
outside `tests/guides.test.ts` went red, no vendored file needed an edit, no reader returned an
undescribed shape, and no residual disagreement survived a doc-block rewrite under the P16
comparator.

---

**Orchestrator annotation (audit, 2026-09-07):** the audit read a count in this report's prose (line 369) and in the prep report (lines 278, 293, 299). The tree is authoritative; the reports stand annotated.
