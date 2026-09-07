# Brief — P.2 `d7n-worker-converge` (worker under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/worker` from the committed baseline `f5ddbd0` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.12`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/worker.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/worker/guides/worker.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-worker-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/worker.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/worker.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/worker.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/worker.md function createWorker: guide "Create a `WorkerInterface` — a `Queue` ⨉ `Pool`; each job runs against an acquired resource." source "Creates a resource-backed job worker — a `Queue` (`@orkestrel/queue`) marrying a `Pool` (`@orkestrel/pool`). Each enqueued input runs through the handler against an automatically acquired pooled resource (released when the job settles), with the queue's bounded concurrency, retries, and per-attempt timeout / abort."
guides/worker.md function createJSONQueueStore: guide "Create a JSON-file `QueueStoreInterface` (`@orkestrel/worker/server`) — durable across restarts." source "Creates a persistent JSON-file `QueueStoreInterface` — the core `createDatabaseQueueStore` over a server `createJSONDriver`."
guides/worker.md function createNodeWorker: guide "Create a `WorkerInterface` over `node:worker_threads` (`@orkestrel/worker/server`) — CPU parallelism." source "Creates a CPU-parallel worker over `node:worker_threads` — a thin specialization of the core `createWorker` whose pooled resource is a worker THREAD."
guides/worker.md function serveWorker: guide "The worker-side entry (`@orkestrel/worker/server`) — a thread script registers its handler with it." source "Registers a worker-thread handler — the worker-side half of `createNodeWorker`."
guides/worker.md function createThread: guide "Create one worker thread and resolve a live `NodeThread` after it comes `online` (an earlier death rejects)." source "Creates one live worker thread and resolves it as a `NodeThread` after it comes online."
guides/worker.md function isReply: guide "Narrow an inbound message to a `Reply` for a correlation id (total, correlated) — a `Dispatch`'s message filter." source "Narrows an inbound `message` to a `Reply` for a given job `id` — no assertion."
guides/worker.md class Dispatch: guide "One job posted to a leased `NodeThread`; its `promise` settles with the narrowed reply." source "Represents one dispatched worker-thread job — the lifecycle entity behind a job posted to a leased `NodeThread`, whose `promise` settles with the narrowed reply."
guides/worker.md class Worker: guide "A resource-backed job worker — a `Queue` composed with a `Pool`." source "Represents a resource-backed job worker — a thin facade composing a `Queue` (`@orkestrel/queue`) with a `Pool` (`@orkestrel/pool`)."
guides/worker.md type WorkerHandler: guide absent source "Runs one worker job with a leased pool resource."
guides/worker.md interface WorkerOptions: guide absent source "Configures `createWorker`."
guides/worker.md interface WorkerInterface: guide absent source "Represents a resource-backed job worker — a Queue whose handler runs against a pooled resource."
guides/worker.md type WorkerEventMap: guide absent source "Represents the push observation surface of a `WorkerInterface` — the job lifecycle a fire-and-forget observer subscribes to, surfacing the underlying queue's moments so a Worker consumer never reaches through to the internal `Queue`."
guides/worker.md interface NodeWorkerOptions: guide absent source "Configures `createNodeWorker` — a CPU-parallel worker over `node:worker_threads`."
guides/worker.md interface ServeWorkerOptions: guide absent source "Configures `serveWorker` — the worker-side entry a thread script registers."
guides/worker.md interface NodeThread: guide absent source "Represents a live worker thread plus its latched liveness state — the pooled resource a `createNodeWorker` leases per job."
guides/worker.md type Reply: guide absent source "Represents a thread→main reply envelope — a success carrying an opaque `value`, or a failure with a message — the reply half of the wire protocol `createNodeWorker` posts and `serveWorker` answers."
guides/worker.md pitch: readme absent tagline "A resource-backed job worker — a thin facade composing a `Queue` (from `@orkestrel/queue`) with a `Pool` (from `@orkestrel/pool`). A `Worker` is a `Queue` whose handler ACQUIRES a pooled resource, runs the caller's handler against it, and RELEASES it in a `finally` — so all concurrency, retries, per-attempt timeout, and lifecycle are the Queue's, and all resource lifecycle (idle reuse, `max` backpressure, FIFO waiting) is the Pool's. The Worker adds only the resource pairing: it does not reimplement either primitive. Construction captures every caller-owned top-level option once. Only `undefined` selects the `concurrency` default (`1`) or matching pool `max`; runtime `null` is invalid and reaches the owning validator. Queue is constructed and validates `concurrency` before the caller's pool option is read; then every declared pool option (`max`, `on`, `error`, `create`, `destroy`, `validate`) is captured once by direct property access before Pool is constructed, preserving structural implementations whose members are inherited or non-enumerable. At most one resource exists per in-flight job by default, and idle resources are reused across jobs. Each job acquires over the attempt's `context.signal`, so an abort / timeout while waiting for a resource rejects the acquire cleanly (no token to release). The worker is observable: its `emitter` RE-EXPOSES the underlying queue's job lifecycle (`enqueue` / `start` / `retry` / `success` / `failure` / `abort` / `drain`) as its own events, bridged at construction, so a consumer never reaches through to the internal `Queue`. For CPU parallelism, `createNodeWorker` (`@orkestrel/worker/server`) specializes `createWorker` over a pool of `node:worker_threads`, with `serveWorker` as the worker-side entry; the structured-clone boundary is narrowed by `input` / `result` guards with zero `as`. Source: `src/core` (the `Worker` facade) and `src/server` (the thread pool + the worker-side entry). Surfaced through the `@orkestrel/worker` and `@orkestrel/worker/server` exports."
rows read: 1, disagreements found: 17
exit 1
```

## Facts for worker (taken 2026-09-07T21:28Z by facts.sh)

- Checkout `/home/user/fleet/worker`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `f5ddbd0`, status: clean
- `package.json`: version `0.0.12`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 6 | summary 6 | banned 0 | tests/setupServer.ts(3) tests/setup.ts(3) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    9:| Concept | Spec                     | Source                                                   | Tests                                                                            |
    10:| ------- | ------------------------ | -------------------------------------------------------- | -------------------------------------------------------------------------------- |
    11:| Worker  | [`worker.md`](worker.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/src/core`](../tests/src/core), [`tests/src/server`](../tests/src/server) |
    17:| Directory    | Guide                    |
    18:| ------------ | ------------------------ |
    19:| `src/core`   | [`worker.md`](worker.md) |
    20:| `src/server` | [`worker.md`](worker.md) |
- Guide `guides/worker.md`: 582 lines. Headings:
    1:# Worker
    32:## Surface
    51:### Factories
    62:### Threads
    93:### Entities
    102:### Types
    123:## Methods
    149:## Contract
    258:## NodeWorker
    330:## Persistence
    353:## Observing
    388:## Patterns
    390:### A resource-backed worker
    410:### CPU-parallel jobs over threads
    430:### Durable jobs across restarts
    449:### Practices
    472:## Tests
    570:## See also
- Table headers in `guides/worker.md` (a header row is the row before a `| ---` row):
    55: | API                    | Kind     | Summary                                                                                               |
    88: | API            | Kind     | Summary                                                                                                          |
    97: | API        | Kind  | Summary                                                                                 |
    106: | Type                 | Kind      | Shape                                                                                                                                                          |
    129: | Method    | Returns            | Behavior                                                                                           |
    375: | Event map                 | Events                                                                                                                          |
- Rows of any `### Entities` table (the Kind cell):
    99:  `Dispatch` | class
    100:  `Worker`   | class
- H1 blockquote (`guides/worker.md`):
    3: > A resource-backed job worker — a thin facade composing a [`Queue`](queue.md) (from
    4: > `@orkestrel/queue`) with a [`Pool`](pool.md) (from `@orkestrel/pool`). A `Worker` is a
    5: > `Queue` whose handler ACQUIRES a pooled resource, runs the caller's handler against it,
    6: > and RELEASES it in a `finally` — so all concurrency, retries, per-attempt timeout, and
    7: > lifecycle are the Queue's, and all resource lifecycle (idle reuse, `max` backpressure,
    8: > FIFO waiting) is the Pool's. The Worker adds only the resource pairing: it does not
    9: > reimplement either primitive.
    10: >
    11: > Construction captures every caller-owned top-level option once. Only `undefined` selects
    12: > the `concurrency` default (`1`) or matching pool `max`; runtime `null` is invalid and
    13: > reaches the owning validator. Queue is constructed and validates `concurrency` before the
    14: > caller's pool option is read; then every declared pool option (`max`, `on`, `error`, `create`,
    15: > `destroy`, `validate`) is captured once by direct property access before Pool is constructed,
    16: > preserving structural implementations whose members are inherited or non-enumerable.
    17: > At most one resource exists per in-flight job by default, and idle resources are reused
    18: > across jobs. Each job acquires over the
    19: > attempt's `context.signal`, so an abort / timeout while waiting for a resource rejects
    20: > the acquire cleanly (no token to release). The worker is **observable**: its
    21: > `emitter` RE-EXPOSES the underlying queue's job lifecycle (`enqueue` / `start` / `retry` /
    22: > `success` / `failure` / `abort` / `drain`) as its own events, bridged at construction, so a
    23: > consumer never reaches through to the internal `Queue`.
    24: >
    25: > For CPU parallelism, `createNodeWorker` (`@orkestrel/worker/server`) specializes `createWorker` over a
    26: > pool of `node:worker_threads`, with `serveWorker` as the worker-side entry; the
    27: > structured-clone boundary is narrowed by `input` / `result` guards with zero `as`.
    28: > Source: [`src/core`](../src/core) (the `Worker` facade) and
    29: > [`src/server`](../src/server) (the thread pool + the worker-side entry). Surfaced
    30: > through the `@orkestrel/worker` and `@orkestrel/worker/server` exports.
- Opening prose after the blockquote (first two lines):
    32: ## Surface
    34: Create a worker over a resource lifecycle and a handler, then `enqueue` inputs and await
- README (`README.md`) first lines:
    # @orkestrel/worker
    
    A typed, resource-backed **job worker** for the `@orkestrel` line: a `Worker`
    is a `Queue` (`@orkestrel/queue`) whose handler runs against an automatically
    acquired resource leased from a `Pool` (`@orkestrel/pool`) — released when the
    job settles, even on throw. Composition, not reimplementation: all
    concurrency, retries, per-attempt timeout, abort, and durability are the
    Queue's; all idle reuse and `max` backpressure are the Pool's. The worker is
    observable (a typed `emitter` re-exposes the underlying queue's job lifecycle
    — `enqueue` / `start` / `retry` / `success` / `failure` / `abort` / `drain`).
    For CPU-parallel work, the server surface's `createNodeWorker` specializes the
    core `createWorker` over a pool of `node:worker_threads`, crossing the
- `## Patterns` fences, each with its nearest preceding heading:
    37: fence under "## Surface"
    69: fence under "### Threads"
    271: fence under "## NodeWorker"
    296: fence under "## NodeWorker"
    337: fence under "## Persistence"
    360: fence under "## Observing"
    394: fence under "### A resource-backed worker"
    414: fence under "### CPU-parallel jobs over threads"
    434: fence under "### Durable jobs across restarts"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/factories.ts:41:export function createThread(script: string | URL, workerData?: unknown): Promise<NodeThread> {
    src/server/factories.ts:75:export function createJSONQueueStore<TInput extends ContractShape>(
    src/server/factories.ts:124:export function createNodeWorker<TInput, TResult>(
    src/core/factories.ts:39:export function createWorker<TInput, TResource, TResult>(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/Thread.ts:13:export class Thread implements NodeThread {
    src/server/NodeWorker.ts:18:export class NodeWorker<TInput, TResult> {
    src/server/Dispatch.ts:54:export class Dispatch<TResult> {
    src/core/Worker.ts:47:export class Worker<TInput, TResource, TResult> implements WorkerInterface<TInput, TResult> {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/handlers.ts:1
    src/server/factories.ts:3
    src/server/Dispatch.ts:1
    src/core/factories.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    21:} from '@orkestrel/guide'
    58:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    64:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    115:		for (const group of guide.methods()) {
    116:			const members = source.methods(group.interface).map((method) => method.name)
    124:					expect(findMissing(members, documented)).toEqual([])
    127:					expect(findMissing(documented, members)).toEqual([])
    133:							: findMissing(
    134:									source.methods(entity).map((method) => method.name),
    152:				findUnexampled(
    155:					source.examples().map((example) => example.name),
    160:		for (const group of guide.methods()) {
    165:					? source.examples(group.interface).map((example) => example.name)
    169:							.concat(source.examples(entity).map((example) => example.name))
    176:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    188:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 472:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-worker-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/worker.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/worker.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-worker-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
