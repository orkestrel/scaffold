# Brief — P.2 `d7n-budget-converge` (budget under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/budget` from the committed baseline `3e77fe5` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.10`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/budget.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/budget/guides/budget.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-budget-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/budget.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with `npm run docs -- --to source` and record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/budget.md function createBudget: guide "Create a `BudgetInterface<T>` for `max` with a `consumer`, optionally a trace `id` and a parent `signal`." source "Creates a cumulative budget whose native signal aborts at its ceiling."
guides/budget.md function createTokenConsumer: guide "Create a unary consumer that charges one selected `TokenUsage` field." source "Creates a validated token consumer for one selected usage field."
guides/budget.md function createTokenBudget: guide "Create a `BudgetInterface<TokenUsage>` charging a chosen `scope` field (`completion` default / `total` / `prompt`)." source "Creates a token budget charging one validated usage field per provider call."
guides/budget.md function isBudgetAmount: guide "Guard a finite nonnegative numeric budget amount." source "Determines whether a value is a valid budget amount."
guides/budget.md function isBudgetSignal: guide "Guard a genuine native `AbortSignal` without throwing on hostile input." source "Determines whether a value is a genuine native `AbortSignal`."
guides/budget.md function isTokenScope: guide "Guard a supported `TokenScope` field selector." source "Determines whether a value selects a supported token usage field."
guides/budget.md function isTokenUsage: guide "Guard three finite nonnegative token counts without throwing." source "Determines whether a value is readable token usage with valid numeric fields."
guides/budget.md function validateBudgetOptions: guide "Validate once-read budget options and return a fresh copy omitting absent optional keys." source "Validates and normalizes budget construction options."
guides/budget.md function validateTokenBudgetOptions: guide "Validate once-read token-budget options and return a fresh copy omitting absent optional keys." source "Validates and normalizes token-budget construction options."
guides/budget.md class Budget: guide "A cumulative consumption tally whose `signal` fires when `consumed` reaches the `max` ceiling." source "Represents a cumulative cost handle whose native `AbortSignal` aborts at its ceiling."
guides/budget.md interface BudgetOptions: guide absent source "Represents the options for constructing a cumulative budget."
guides/budget.md interface TokenBudgetOptions: guide absent source "Represents the options for constructing a token budget."
guides/budget.md interface BudgetInterface: guide absent source "Represents a cumulative cost handle whose native signal aborts at its ceiling."
guides/budget.md type TokenScope: guide absent source "Names the token-usage field selected as the charge for a token budget."
guides/budget.md interface TokenUsage: guide absent source "Represents the canonical finite nonnegative token counts reported for one provider call."
guides/budget.md BudgetInterface.start: guide absent source "Re-arms a fresh signal without resetting the cumulative tally."
guides/budget.md BudgetInterface.consume: guide absent source "Validates and atomically adds the charge extracted from a domain value."
guides/budget.md BudgetInterface.clear: guide absent source "Resets the tally and re-arms a fresh signal."
guides/budget.md pitch: readme absent tagline "The cost primitive: a cumulative consumption tally against a ceiling that exposes an `AbortSignal` firing the moment the budget is exhausted. You charge a `Budget<T>` as work spends — `consume(value)` adds to a running `consumed` total — and race its `signal` against that work to cap how much it may burn (tokens, bytes, calls). When `consumed` crosses `max`, `signal` aborts; fold it into a loop's bound so the loop stops generating after the budget is spent. This is the substrate's third bounding signal, a peer to a cancellation signal (fires on `abort()`) and a deadline signal (fires on expiry). All three are plain `AbortSignal`s by design, so an agent loop combines them into one bound with `AbortSignal.any([abort, timeout, budget])` and reacts to whichever trips first — cancel, deadline, or cost. A budget deliberately carries no Emitter, clock, or I/O: its native signal is the complete observation boundary. It is a functional counter with a signal bolted to its ceiling — nothing more, so the surface stays small. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 19
exit 1
```

## Facts for budget (taken 2026-09-07T15:12Z by facts.sh)

- Checkout `/home/user/fleet/budget`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `3e77fe5`, status: clean
- `package.json`: version `0.0.10`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 2 | summary 2 | banned 0 | tests/setup.ts(2) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                     | Source                    | Tests                                 |
    8:| ------- | ------------------------ | ------------------------- | ------------------------------------- |
    9:| Budget  | [`budget.md`](budget.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                    |
    14:| ---------- | ------------------------ |
    15:| `src/core` | [`budget.md`](budget.md) |
- Guide `guides/budget.md`: 191 lines. Headings:
    1:# Budget
    9:## Surface
    27:### Factories
    35:### Validators
    44:### Helpers
    51:### Entities
    57:### Types
    69:## Methods
    73:#### `BudgetInterface`
    83:## Contract
    101:## Patterns
    103:### Race work against the ceiling
    121:### A token budget folded into an agent loop's bound
    142:### Re-arm per request, spend across the session
    157:### Reuse a handle with `clear()`
    172:### Practices
    180:## Tests
    188:## See also
- Table headers in `guides/budget.md` (a header row is the row before a `| ---` row):
    29: | API                   | Kind     | Summary                                                                                                             |
    37: | API              | Kind     | Summary                                                                 |
    46: | API                          | Kind     | Summary                                                                                        |
    53: | API      | Kind  | Summary                                                                                        |
    59: | Type                 | Kind      | Shape                                                                                                                                |
    77: | Method    | Returns | Behavior                                                                                                                       |
- Rows of any `### Entities` table (the Kind cell):
    55:  `Budget` | class
- H1 blockquote (`guides/budget.md`):
    3: > The cost primitive: a cumulative consumption tally against a ceiling that exposes an `AbortSignal` firing the moment the budget is **exhausted**. You charge a `Budget<T>` as work spends — `consume(value)` adds to a running `consumed` total — and race its `signal` against that work to cap how much it may burn (tokens, bytes, calls). When `consumed` crosses `max`, `signal` aborts; fold it into a loop's bound so the loop stops generating after the budget is spent.
    4: >
    5: > This is the substrate's third bounding signal, a peer to a cancellation signal (fires on `abort()`) and a deadline signal (fires on expiry). All three are plain `AbortSignal`s by design, so an agent loop combines them into one bound with `AbortSignal.any([abort, timeout, budget])` and reacts to whichever trips first — cancel, deadline, or cost. A budget deliberately carries no Emitter, clock, or I/O: its native signal is the complete observation boundary. It is a functional counter with a signal bolted to its ceiling — nothing more, so the surface stays small.
    6: >
    7: > Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    9: ## Surface
    11: Create a cost handle, `start()` it, and race its `signal` against work; `consume(value)` to charge the tally as work spends:
- README (`README.md`) first lines:
    # @orkestrel/budget
    
    A typed spending budget — a cumulative consumption tally against a ceiling
    that exposes an `AbortSignal` firing the moment the budget is **exhausted**.
    Charge a `Budget<T>` as work spends — `consume(value)` adds to a running
    `consumed` total — and race its `signal` against that work to cap how much it
    may burn (tokens, bytes, calls). A convenience `createTokenBudget` factory
    wraps the canonical LLM cost unit (`TokenUsage`) so callers don't have to
    write their own consumer. Deliberately small: a pure, functional counter
    with a signal bolted to its ceiling, no Emitter, no clock, no I/O of its own.
    Part of the `@orkestrel` line.
    
- `## Patterns` fences, each with its nearest preceding heading:
    13: fence under "## Surface"
    107: fence under "### Race work against the ceiling"
    125: fence under "### A token budget folded into an agent loop's bound"
    146: fence under "### Re-arm per request, spend across the session"
    161: fence under "### Reuse a handle with `clear()`"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/Budget.ts:30:export class Budget<T> implements BudgetInterface<T> {
    src/core/factories.ts:29:export function createBudget<T>(options: BudgetOptions<T>): BudgetInterface<T> {
    src/core/factories.ts:47:export function createTokenConsumer(scope: TokenScope): BudgetOptions<TokenUsage>['consumer'] {
    src/core/factories.ts:118:export function createTokenBudget(options: TokenBudgetOptions): BudgetInterface<TokenUsage> {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/Budget.ts:1
    src/core/validators.ts:4
    src/core/factories.ts:3
    src/core/helpers.ts:2
    src/core/types.ts:5
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    43:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    49:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    94:		for (const group of guide.methods()) {
    95:			const members = source.methods(group.interface).map((method) => method.name)
    103:					expect(findMissing(members, documented)).toEqual([])
    106:					expect(findMissing(documented, members)).toEqual([])
    112:							: findMissing(
    113:									source.methods(entity).map((method) => method.name),
    131:				findUnexampled(
    134:					source.examples().map((example) => example.name),
    139:		for (const group of guide.methods()) {
    144:					? source.examples(group.interface).map((example) => example.name)
    148:							.concat(source.examples(entity).map((example) => example.name))
    155:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    167:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 180:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/budget.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/budget.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-budget-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
