# Brief — P.2 `d7n-reason-converge` (reason under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/reason` from the committed baseline `b4f2e92` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.10`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/reason.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/reason/guides/reason.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-reason-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/reason.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/reason.md` and `README.md`; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/reason.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
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
exit 1
```

## Facts for reason (taken 2026-09-07T15:55Z by facts.sh)

- Checkout `/home/user/fleet/reason`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `b4f2e92`, status: clean
- `package.json`: version `0.0.10`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 28 | summary 24 | banned 4 | tests/setup.ts(24) tests/src/core/reasoners/InferentialReasoner.test.ts(1) src/core/types.ts(1) src/core/reasoners/SymbolicReasoner.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                     | Source                    | Tests                                 |
    8:| ------- | ------------------------ | ------------------------- | ------------------------------------- |
    9:| Reason  | [`reason.md`](reason.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                    |
    14:| ---------- | ------------------------ |
    15:| `src/core` | [`reason.md`](reason.md) |
- Guide `guides/reason.md`: 1107 lines. Headings:
    1:# Reason
    7:## Surface
    40:### Entity factories
    62:### Orchestrator & reasoners
    72:### Operators
    80:### Entities
    96:### Value factories
    130:### Helpers
    212:### Validators
    263:### Errors
    270:### Constants
    294:### Types
    393:## Methods
    397:#### `ReasonInterface`
    411:#### `ReasonerInterface`
    421:#### `EvaluatorInterface`
    428:#### `TransformerInterface`
    435:#### `AggregatorInterface`
    441:#### `GroupManagerInterface`
    456:#### `FactorManagerInterface`
    470:#### `RuleManagerInterface`
    485:#### `EquationManagerInterface`
    500:#### `FactManagerInterface`
    515:#### `InferenceManagerInterface`
    530:#### `VariableManagerInterface`
    543:#### `DefinitionBuilderInterface`
    554:#### `SubjectBuilderInterface`
    570:## Contract
    585:## Patterns
    587:### Quantitative scoring
    655:### Numeric domains
    702:### Logical chaining — forward and backward
    746:### Symbolic solving
    794:### Inferential derivation and proof
    851:### Shaping definitions as data
    898:### The definition workspace — `DefinitionBuilder`
    986:### The subject workspace — `SubjectBuilder`
    1008:### Observing
    1045:### Narrowing untrusted definitions
    1067:### Practices
    1084:## Tests
    1102:## See also
- Table headers in `guides/reason.md` (a header row is the row before a `| ---` row):
    42: | API                          | Kind     | Summary                                                                                                                                                                          |
    64: | API                    | Kind  | Summary                                                                                                       |
    74: | API           | Kind  | Summary                                                                                                |
    84: | API                 | Kind  | Summary                                                                                                                                                                                                                     |
    100: | API                            | Kind     | Creates…                                                                                        |
    132: | API                        | Kind     | Summary                                                                                                                           |
    164: | API                           | Kind     | Summary                                                                                                                    |
    216: | API                        | Kind     | Narrows to                                                                                                                                                                                            |
    265: | API             | Kind     | Summary                                                                                                                      |
    272: | API                        | Kind  | Summary                                                                                                                                                                |
    296: | Type                          | Kind      | Shape                                                                                                                                                                                                                    |
    401: | Method      | Returns                          | Behavior                                                                              |
    415: | Method     | Returns                  | Behavior                                                                                           |
    423: | Method     | Returns                  | Behavior                                                                                         |
    430: | Method  | Returns  | Behavior                                                                                        |
    437: | Method      | Returns  | Behavior                                                                                                                |
    445: | Method    | Returns                    | Behavior                                                                                                                                                           |
    460: | Method    | Returns               | Behavior                                                                                                                                                             |
    474: | Method    | Returns             | Behavior                                                                                                                     |
    489: | Method      | Returns                 | Behavior                                                                                                                         |
    504: | Method    | Returns             | Behavior                                                                                                                     |
    519: | Method       | Returns                  | Behavior                                                                                                                          |
    534: | Method      | Returns                            | Behavior                                                                                                                                                                 |
    547: | Method    | Returns      | Behavior                                                                                                                                         |
    558: | Method    | Returns              | Behavior                                                                                                                                                                                                    |
    1027: | Entity              | Event map                   | Events                                                                                                                          |
- Rows of any `### Entities` table (the Kind cell):
    86:  `DefinitionBuilder` | class
    87:  `GroupManager`      | class
    88:  `FactorManager`     | class
    89:  `RuleManager`       | class
    90:  `EquationManager`   | class
    91:  `VariableManager`   | class
    92:  `FactManager`       | class
    93:  `InferenceManager`  | class
    94:  `SubjectBuilder`    | class
- H1 blockquote (`guides/reason.md`):
    3: > A synchronous, deterministic reasoning engine: declarative, **JSON-serializable definitions** are evaluated against **subjects** (plain data records) to produce traceable **results**. Four strategies behind one dispatch surface — `quantitative` (factor-based numeric scoring), `logical` (rule-based boolean deduction with forward / backward chaining), `symbolic` (algebraic equation solving by variable isolation), `inferential` (fact derivation with unification variables and proof trees) — each a `ReasonerInterface` registered on the thin `Reason` orchestrator, with three injectable operators (`Evaluator` / `Transformer` / `Aggregator`) doing the shared arithmetic. Every result is a fresh object carrying `success`, a human-readable `trace`, and accumulated `errors`; nothing mutates its inputs.
    4: >
    5: > The design stance is **data in, data out, no surprises**: definitions are pure data (built by hand or with the shipped value factories), the orchestrator holds NO strategy logic (dispatch is a registry lookup by the `reasoning` discriminant), the operators are total (an unknown comparison surfaces as a `CheckResult.error`, an unknown math operation is a no-op, divide-by-zero is `NaN` — never a throw), and a reasoner never assumes `validate` ran — a malformed definition yields a failure RESULT, reserving throws for caller misuse (a coded `ReasonError`). On top of the evaluation engine sits the definitions & subjects capability layer: a pure copy-on-write helper family that changes / extends / merges / round-trips definitions as data, and two brand-guarded workspace builders — `DefinitionBuilder` (one self-owning manager per collection) and `SubjectBuilder` (one flat collection) — that accumulate state through named methods and `build()` a fresh plain payload on demand. Building happens OUTSIDE the engine: `reason` and `validate` take only the plain data, so a builder's `build()` output is passed at the call site. Deliberately absent: async reasoners, definition persistence, and probabilistic strategies beyond the multiplicative `confidence` of inferential facts. Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    7: ## Surface
    9: Create an orchestrator over the reasoners you need, build a definition, then evaluate subjects against it:
- README (`README.md`) first lines:
    # @orkestrel/reason
    
    A synchronous, deterministic **reasoning engine**: declarative,
    JSON-serializable **definitions** are evaluated against **subjects** (plain
    data records) to produce traceable **results**. Four strategies behind one
    dispatch surface — `quantitative` (factor-based numeric scoring), `logical`
    (rule-based boolean deduction with forward / backward chaining), `symbolic`
    (algebraic equation solving by variable isolation), `inferential` (fact
    derivation with unification variables and proof trees) — each a
    `ReasonerInterface` registered on the thin `Reason` orchestrator, with three
    injectable operators (`Evaluator` / `Transformer` / `Aggregator`) doing the
    shared arithmetic. Every result is a fresh object carrying `success`, a
- `## Patterns` fences, each with its nearest preceding heading:
    11: fence under "## Surface"
    591: fence under "### Quantitative scoring"
    634: fence under "### Quantitative scoring"
    661: fence under "### Numeric domains"
    669: fence under "### Numeric domains"
    677: fence under "### Numeric domains"
    684: fence under "### Numeric domains"
    692: fence under "### Numeric domains"
    706: fence under "### Logical chaining — forward and backward"
    750: fence under "### Symbolic solving"
    798: fence under "### Inferential derivation and proof"
    855: fence under "### Shaping definitions as data"
    902: fence under "### The definition workspace — `DefinitionBuilder`"
    943: fence under "### The definition workspace — `DefinitionBuilder`"
    990: fence under "### The subject workspace — `SubjectBuilder`"
    1012: fence under "### Observing"
    1037: fence under "### Observing"
    1049: fence under "### Narrowing untrusted definitions"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/builders/DefinitionBuilder.ts:86:export class DefinitionBuilder implements DefinitionBuilderInterface {
    src/core/builders/SubjectBuilder.ts:57:export class SubjectBuilder implements SubjectBuilderInterface {
    src/core/builders/managers/RuleManager.ts:47:export class RuleManager implements RuleManagerInterface {
    src/core/builders/managers/FactorManager.ts:58:export class FactorManager implements FactorManagerInterface {
    src/core/builders/managers/GroupManager.ts:44:export class GroupManager implements GroupManagerInterface {
    src/core/builders/managers/FactManager.ts:44:export class FactManager implements FactManagerInterface {
    src/core/builders/managers/EquationManager.ts:49:export class EquationManager implements EquationManagerInterface {
    src/core/builders/managers/InferenceManager.ts:54:export class InferenceManager implements InferenceManagerInterface {
    src/core/builders/managers/VariableManager.ts:44:export class VariableManager implements VariableManagerInterface {
    src/core/builders/managers/Collection.ts:24:export class Collection<T extends { readonly id: string }> {
    src/core/reasoners/InferentialReasoner.ts:85:export class InferentialReasoner implements ReasonerInterface {
    src/core/reasoners/LogicalReasoner.ts:70:export class LogicalReasoner implements ReasonerInterface {
    src/core/reasoners/QuantitativeReasoner.ts:64:export class QuantitativeReasoner implements ReasonerInterface {
    src/core/reasoners/SymbolicReasoner.ts:63:export class SymbolicReasoner implements ReasonerInterface {
    src/core/operators/Aggregator.ts:27:export class Aggregator implements AggregatorInterface {
    src/core/operators/Evaluator.ts:29:export class Evaluator implements EvaluatorInterface {
    src/core/operators/Transformer.ts:28:export class Transformer implements TransformerInterface {
    src/core/factories.ts:95:export function createEvaluator(options?: EvaluatorOptions): EvaluatorInterface {
    src/core/factories.ts:116:export function createTransformer(options?: TransformerOptions): TransformerInterface {
    src/core/factories.ts:137:export function createAggregator(options?: AggregatorOptions): AggregatorInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/builders/DefinitionBuilder.ts:1
    src/core/builders/SubjectBuilder.ts:1
    src/core/builders/managers/RuleManager.ts:1
    src/core/builders/managers/FactorManager.ts:1
    src/core/builders/managers/GroupManager.ts:1
    src/core/builders/managers/FactManager.ts:1
    src/core/builders/managers/EquationManager.ts:1
    src/core/builders/managers/InferenceManager.ts:1
    src/core/builders/managers/VariableManager.ts:1
    src/core/reasoners/InferentialReasoner.ts:1
    src/core/reasoners/LogicalReasoner.ts:1
    src/core/reasoners/QuantitativeReasoner.ts:1
    src/core/reasoners/SymbolicReasoner.ts:1
    src/core/operators/Aggregator.ts:1
    src/core/operators/Evaluator.ts:1
    src/core/operators/Transformer.ts:1
    src/core/validators.ts:44
    src/core/factories.ts:42
    src/core/helpers.ts:71
    src/core/Reason.ts:1
    src/core/parsers.ts:1
    src/core/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    57:} from '@orkestrel/guide'
    80:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    86:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    131:		for (const group of guide.methods()) {
    132:			const members = source.methods(group.interface).map((method) => method.name)
    140:					expect(findMissing(members, documented)).toEqual([])
    143:					expect(findMissing(documented, members)).toEqual([])
    149:							: findMissing(
    150:									source.methods(entity).map((method) => method.name),
    168:				findUnexampled(
    171:					source.examples().map((example) => example.name),
    176:		for (const group of guide.methods()) {
    181:					? source.examples(group.interface).map((example) => example.name)
    185:							.concat(source.examples(entity).map((example) => example.name))
    192:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    204:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1084:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/reason.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/reason.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-reason-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
