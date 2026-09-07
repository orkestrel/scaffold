# Brief — P.2 `d7n-pool-converge` (pool under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/pool` from the committed baseline `11509e9` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.11`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/pool.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/pool/guides/pool.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-pool-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/pool.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/pool.md` and `README.md`; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/pool.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/pool.md function createPool: guide "Construct a distinct `PoolInterface` from resource lifecycle hooks." source "Creates a resource pool with optional bounded capacity, unique ownership, and FIFO settlement."
guides/pool.md class Pool: guide "The unique-record FIFO lifecycle engine." source "Represents a capacity-aware resource pool whose opaque ownership records preserve FIFO settlement, cancellation, exact lease release, and deterministic teardown under concurrent hooks."
guides/pool.md class PoolError: guide "A coded failure retaining a hostile-safe cause and structured context." source "Represents a stable, machine-readable pool failure with the original cause and structured context."
guides/pool.md function isPoolError: guide "Total guard for `PoolError`, including hostile proxy inputs." source "Tests whether an unknown value is a `PoolError`, returning `false` for hostile proxies."
guides/pool.md function isPoolMax: guide "Accept only positive safe integers as explicit pool maxima." source "Tests whether a value is a valid finite pool maximum."
guides/pool.md function isPoolSignal: guide "Total native `AbortSignal` guard for the acquire boundary." source "Tests whether a value is a native `AbortSignal`, returning `false` for hostile proxies."
guides/pool.md type PoolCode: guide "`invalid`, `destroyed`, `create`, or `cleanup`." source "Names the machine-readable failure codes produced by `PoolError`."
guides/pool.md interface PoolContext: guide "Rejected input or distinct aggregate destroy-hook failures." source "Represents the structured context attached to a `PoolError`."
guides/pool.md interface PoolErrorOptions: guide "Code, optional cause, and optional context for `PoolError`." source "Represents the construction options for `PoolError`."
guides/pool.md type PoolEventMap: guide "`create`, `acquire`, `release`, and `destroy` lifecycle signals." source "Represents the observable resource lifecycle events emitted by a `PoolInterface`."
guides/pool.md interface PoolToken: guide "A unique lease with readonly `value` and idempotent `release()`." source "Represents a unique lease over one pool-owned resource record."
guides/pool.md interface PoolOptions: guide "Create, destroy, validation, capacity, and emitter options." source "Represents the resource lifecycle options for `Pool` and `createPool`."
guides/pool.md interface PoolInterface: guide "Count/emitter properties plus `acquire`, `clear`, and `destroy`." source "Represents a FIFO resource pool with optional bounded capacity and deterministic teardown."
guides/pool.md PoolInterface.acquire: guide absent source "Queues and leases one resource in FIFO settlement order."
guides/pool.md PoolInterface.clear: guide absent source "Destroys the records that are idle at this call's synchronous snapshot."
guides/pool.md PoolInterface.destroy: guide absent source "Tears down the pool permanently and returns its stable completion barrier."
guides/pool.md PoolToken.release: guide absent source "Gives this exact lease back once; subsequent calls are no-ops."
guides/pool.md pitch: readme absent tagline "A typed resource pool with optional bounded capacity, unique ownership, FIFO settlement, validated reuse, caller-owned cancellation, explicit cleanup failures, and a stable event-driven teardown barrier. It has no warm floor, eviction timer, acquire timeout, or polling loop."
rows read: 1, disagreements found: 18
exit 1
```

## Facts for pool (taken 2026-09-07T15:48Z by facts.sh)

- Checkout `/home/user/fleet/pool`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `11509e9`, status: clean
- `package.json`: version `0.0.11`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: no
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 2 | summary 2 | banned 0 | tests/setup.ts(2) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                 | Source                    | Tests                                 |
    8:| ------- | -------------------- | ------------------------- | ------------------------------------- |
    9:| Pool    | [`pool.md`](pool.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                |
    14:| ---------- | -------------------- |
    15:| `src/core` | [`pool.md`](pool.md) |
- Guide `guides/pool.md`: 261 lines. Headings:
    1:# Pool
    8:## Surface
    32:### Factories
    38:### Entities
    45:### Guards
    53:### Types
    71:## Methods
    76:#### `PoolInterface`
    84:#### `PoolToken`
    92:## Contract
    94:### Capacity and FIFO
    123:### Cancellation
    136:### Release and cleanup
    152:### Destruction
    165:### Errors
    180:## Observing
    210:## Patterns
    212:### Validate public boundaries
    225:### Always release and explicitly tear down
    242:## Tests
    257:## See also
- Table headers in `guides/pool.md` (a header row is the row before a `| ---` row):
    34: | API          | Kind     | Summary                                                             |
    40: | API         | Kind  | Summary                                                                |
    47: | API            | Kind     | Summary                                                      |
    55: | API                | Kind      | Summary                                                          |
    78: | Method    | Returns                 | Behavior                                                                                  |
    88: | Method    | Returns | Behavior                                                                                                              |
    169: | Code        | Owner                                                                    |
    187: | Event     | Emission point                                                                                                                                                      |
- Rows of any `### Entities` table (the Kind cell):
    42:  `Pool`      | class
    43:  `PoolError` | class
- H1 blockquote (`guides/pool.md`):
    3: > A typed resource pool with optional bounded capacity, unique ownership, FIFO settlement,
    4: > validated reuse, caller-owned cancellation, explicit cleanup failures, and a stable
    5: > event-driven teardown barrier. It has no warm floor, eviction timer, acquire timeout, or
    6: > polling loop.
- Opening prose after the blockquote (first two lines):
    8: ## Surface
    10: `createPool` constructs the interface-oriented form; `Pool` exposes the same contract as a
- README (`README.md`) first lines:
    # @orkestrel/pool
    
    A typed **resource pool** with optional bounded capacity: idle reuse + FIFO
    waiting. `acquire` leases a resource — reusing a validated idle one, growing up
    to `max` when one is set, growing without bound when it is not, or parking on a
    FIFO waiter list until a `release` frees one — and the returned token's
    `release()` returns it for reuse (or hands it straight to the next waiter).
    The FIFO handoff is validated, so a resource that goes bad while leased is
    never handed to the next lessee, and a parked `acquire` given an `AbortSignal`
    rejects and de-queues itself when the signal fires — no leaked waiter. The
    pool is observable (a typed `emitter` surfaces `create` / `acquire` /
    `release` / `destroy`) and deliberately de-bloated — no warm-floor, no
- `## Patterns` fences, each with its nearest preceding heading:
    14: fence under "## Surface"
    101: fence under "### Capacity and FIFO"
    111: fence under "### Capacity and FIFO"
    197: fence under "## Observing"
    214: fence under "### Validate public boundaries"
    227: fence under "### Always release and explicitly tear down"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:38:export function createPool<T>(options: PoolOptions<T>): PoolInterface<T> {
    src/core/Pool.ts:28:export class Pool<T> implements PoolInterface<T> {
    src/core/errors.ts:18:export class PoolError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/validators.ts:2
    src/core/factories.ts:1
    src/core/Pool.ts:1
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    20:} from '@orkestrel/guide'
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
    150:							? source.examples(group.interface).map((example) => example.name)
    154:									.concat(source.examples(entity).map((example) => example.name))
    155:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    167:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 242:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/pool.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/pool.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-pool-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
