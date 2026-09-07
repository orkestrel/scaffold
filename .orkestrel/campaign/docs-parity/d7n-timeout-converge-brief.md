# Brief — P.2 `d7n-timeout-converge` (timeout under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/timeout` from the committed baseline `9b09bac` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.10`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/timeout.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/timeout/guides/timeout.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-timeout-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/timeout.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with `npm run docs -- --to source` and record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/timeout.md function createTimeout: guide "Create a `TimeoutInterface` deadline handle from `TimeoutOptions`." source "Creates a controllable deadline whose native signal aborts on expiry."
guides/timeout.md class Timeout: guide "The controllable `setTimeout` wrapper; implements `TimeoutInterface` exactly." source "Represents a controllable deadline whose native `AbortSignal` aborts when it expires."
guides/timeout.md const MAX_TIMEOUT_MS: guide "Largest accepted duration: `2_147_483_647` milliseconds." source "Names the largest timeout duration accepted by the package, in milliseconds."
guides/timeout.md function isTimeoutDuration: guide "Total validator for an integer in the inclusive timeout range." source "Determines whether a value is an accepted timeout duration."
guides/timeout.md function isTimeoutSignal: guide "Total native-brand validator for a genuine `AbortSignal`." source "Determines whether a value is a genuine native `AbortSignal`."
guides/timeout.md function validateTimeoutOptions: guide "Validate once-read timeout options and return a fresh copy omitting absent option keys." source "Validates and normalizes timeout construction options."
guides/timeout.md interface TimeoutOptions: guide absent source "Represents the options for constructing a timeout deadline."
guides/timeout.md interface TimeoutInterface: guide absent source "Represents a controllable deadline exposing a native `AbortSignal` that aborts on expiry."
guides/timeout.md TimeoutInterface.start: guide absent source "Arms or re-arms the deadline."
guides/timeout.md TimeoutInterface.clear: guide absent source "Cancels an armed deadline without aborting its signal and resets expiry state."
guides/timeout.md pitch: readme absent tagline "A controllable `setTimeout` wrapper that exposes an `AbortSignal` which fires on expiry, for racing work against a deadline. A `Timeout` carries a trace `id`, a deadline `ms`, and `start()` / `clear()` controls — arm the deadline, then race its `signal` against work to bound how long that work may run. The time-bound half of the substrate's time-and-cancellation pair. Deliberately thin: it is not a scheduler, not a debounce/throttle, not a retry policy — one `setTimeout` made re-armable, clearable, and parent-linkable. Its native `AbortSignal` is the complete observation surface; there is no separate event map. `start()` arms the deadline, `clear()` cancels it without firing, and calling `start()` again after an expiry swaps in a fresh signal, so a handle is reusable across deadlines without re-construction. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 11
exit 1
```

## Facts for timeout (taken 2026-09-07T15:24Z by facts.sh)

- Checkout `/home/user/fleet/timeout`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `9b09bac`, status: clean
- `package.json`: version `0.0.10`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 0 | summary 0 | banned 0 | 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                       | Source                    | Tests                                 |
    8:| ------- | -------------------------- | ------------------------- | ------------------------------------- |
    9:| Timeout | [`timeout.md`](timeout.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                      |
    14:| ---------- | -------------------------- |
    15:| `src/core` | [`timeout.md`](timeout.md) |
- Guide `guides/timeout.md`: 236 lines. Headings:
    1:# Timeout
    16:## Surface
    46:### Factories
    52:### Entities
    58:### Constants
    64:### Validators
    71:### Helpers
    77:### Types
    89:## Methods
    96:#### `TimeoutInterface`
    106:## Contract
    141:## Patterns
    143:### Race work against a deadline
    160:### Link a parent signal
    185:### Reuse a handle across deadlines
    198:### Practices
    211:## Tests
    227:## See also
- Table headers in `guides/timeout.md` (a header row is the row before a `| ---` row):
    48: | API             | Kind     | Summary                                                            |
    54: | API       | Kind  | Summary                                                                       |
    60: | API              | Kind  | Summary                                                  |
    66: | API                 | Kind     | Summary                                                        |
    73: | API                      | Kind     | Summary                                                                                 |
    79: | Type               | Kind      | Shape                                                                                                |
    101: | Method  | Returns | Behavior                                                                                           |
- Rows of any `### Entities` table (the Kind cell):
    56:  `Timeout` | class
- H1 blockquote (`guides/timeout.md`):
    3: > A controllable `setTimeout` wrapper that exposes an `AbortSignal` which fires
    4: > on expiry, for racing work against a deadline. A `Timeout` carries a trace
    5: > `id`, a deadline `ms`, and `start()` / `clear()` controls — arm the deadline,
    6: > then race its `signal` against work to bound how long that work may run. The
    7: > time-bound half of the substrate's time-and-cancellation pair. Deliberately
    8: > thin: it is not a scheduler, not a debounce/throttle, not a retry policy —
    9: > one `setTimeout` made re-armable, clearable, and parent-linkable. Its native
    10: > `AbortSignal` is the complete observation surface; there is no separate event
    11: > map. `start()` arms the deadline, `clear()` cancels it without firing, and
    12: > calling `start()` again after an expiry swaps in a fresh signal, so a handle
    13: > is reusable across deadlines without re-construction. Source:
    14: > [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    16: ## Surface
    18: Create a deadline handle, arm it, and hand its `signal` to deadline-aware
- README (`README.md`) first lines:
    # @orkestrel/timeout
    
    A typed, **controllable** `setTimeout` wrapper — a deadline handle that
    exposes an `AbortSignal` which fires on expiry, for racing against work.
    Deliberately small: `start()` arms the deadline, `clear()` cancels it without
    firing, and calling `start()` again after expiry reuses the handle for a
    fresh deadline without re-construction. An optional parent `signal` links in
    without inheriting `AbortSignal.any` semantics — a parent abort during the
    timing window _clears_ the timeout (it never expires) rather than firing it.
    Part of the `@orkestrel` line.
    
    ## Install
- `## Patterns` fences, each with its nearest preceding heading:
    21: fence under "## Surface"
    145: fence under "### Race work against a deadline"
    166: fence under "### Link a parent signal"
    187: fence under "### Reuse a handle across deadlines"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:35:export function createTimeout(options: TimeoutOptions): TimeoutInterface {
    src/core/Timeout.ts:29:export class Timeout implements TimeoutInterface {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/validators.ts:2
    src/core/factories.ts:1
    src/core/helpers.ts:1
    src/core/constants.ts:1
    src/core/Timeout.ts:1
    src/core/types.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    21:} from '@orkestrel/guide'
    44:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    53:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    98:		for (const group of guide.methods()) {
    99:			const members = source.methods(group.interface).map((method) => method.name)
    107:					expect(findMissing(members, documented)).toEqual([])
    110:					expect(findMissing(documented, members)).toEqual([])
    116:							: findMissing(
    117:									source.methods(entity).map((method) => method.name),
    135:				findUnexampled(
    138:					source.examples().map((example) => example.name),
    143:		for (const group of guide.methods()) {
    154:							? source.examples(group.interface).map((example) => example.name)
    158:									.concat(source.examples(entity).map((example) => example.name))
    159:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    171:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 211:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/timeout.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/timeout.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-timeout-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
