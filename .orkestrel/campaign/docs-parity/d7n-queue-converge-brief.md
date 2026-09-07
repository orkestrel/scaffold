# Brief — P.2 `d7n-queue-converge` (queue under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/queue` from the committed baseline `4042dda` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.13`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/queue.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/queue/guides/queue.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-queue-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/queue.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/queue.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/queue.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/queue.md function createQueue: guide "A `QueueInterface` over a handler, with optional concurrency / retries / timeout." source "Creates a concurrent, cooperative job queue — a bounded-concurrency engine that runs each enqueued input through a handler, with retries and a per-attempt timeout / abort, all over the L1 `Abort` / `Timeout` primitives."
guides/queue.md function createDatabaseQueueStore: guide "A `QueueStoreInterface` over any `DriverInterface` (memory / JSON / SQLite)." source "Creates a `DatabaseQueueStore` over any `DriverInterface` — the durable, driver-pluggable backing for a queue's outstanding entries."
guides/queue.md function createMemoryQueueStore: guide "The zero-plumbing in-memory `QueueStoreInterface` — a `MemoryQueueStore` over a plain `Map`." source "Creates an in-memory `MemoryQueueStore` — the zero-plumbing DEFAULT queue store over a plain `Map` (the twin of `DatabaseQueueStore`)."
guides/queue.md class Queue: guide "The cooperative concurrent job engine — wake-park loop, retries, timeout, abort." source "Represents a concurrent, cooperative FIFO job queue with optional outstanding-work persistence."
guides/queue.md class QueueError: guide "A queue failure with a lowercase machine code, optional context, and optional cause." source "Represents a failure carrying a machine-readable queue category and optional context."
guides/queue.md class MemoryQueueStore: guide "The zero-plumbing DEFAULT store for outstanding entries — a plain process-lifetime `Map`." source "Represents an in-memory store owning validated, immutable JSON snapshots of outstanding entries."
guides/queue.md class DatabaseQueueStore: guide "The opt-in durable store for outstanding entries over one `database` table (driver-swap)." source "Represents a `QueueStoreInterface` backed by one table of the `@orkestrel/database` layer — a queue's durable state IS a table, so persistence reduces to keyed CRUD over a `TableInterface`."
guides/queue.md interface QueueContext: guide absent source "Represents the per-attempt context a queue handler receives."
guides/queue.md type QueueHandler: guide absent source "Runs one queued entry's work; may reject to trigger a retry."
guides/queue.md interface QueueEntryOptions: guide absent source "Represents the per-entry options for `enqueue`."
guides/queue.md interface QueueOptions: guide absent source "Represents the options for `createQueue`."
guides/queue.md interface QueueInterface: guide absent source "Represents a concurrent, cooperative job queue."
guides/queue.md type QueueEventMap: guide absent source "Represents the push observation surface of a `QueueInterface` — the lifecycle moments a fire-and-forget observer (logging, metrics, tracing) subscribes to, ALONGSIDE the per-entry `enqueue` promise."
guides/queue.md type QueueCode: guide absent source "Represents the machine-readable queue failure categories."
guides/queue.md type QueueOption: guide absent source "Represents the construction and per-entry option keys a queue validates."
guides/queue.md interface QueueErrorContext: guide absent source "Represents the structured context carried by a `QueueError`."
guides/queue.md interface QueueErrorOptions: guide absent source "Represents the construction options for a `QueueError`."
guides/queue.md interface StoredEntry: guide absent source "Represents a durably persisted, still-outstanding queue entry — re-run after a restart."
guides/queue.md interface QueueStoreInterface: guide absent source "Represents the durable backing for a Queue's outstanding entries."
guides/queue.md function isQueueError: guide "Total guard for safely narrowing an unknown caught queue failure." source "Determines whether an unknown value is a `QueueError`."
guides/queue.md function isQueueConcurrency: guide "Total guard for a positive safe-integer concurrency value." source "Determines whether a value is a valid queue concurrency."
guides/queue.md function isQueueRetries: guide "Total guard for a nonnegative safe-integer retry count." source "Determines whether a value is a valid queue retry count."
guides/queue.md function isQueueTimeout: guide "Total guard for integer milliseconds in the native timer range." source "Determines whether a value is a valid queue timeout."
guides/queue.md function isQueueSignal: guide "Total native-brand guard for an entry abort signal." source "Determines whether a value is a native abort signal usable by the queue."
guides/queue.md function isStoredEntry: guide "Total guard for a stored entry — a string `id`, an `input`, and a retry-count `attempts`." source "Checks whether a value is a valid stored queue entry."
guides/queue.md function readOption: guide "One named entry option, read once, with a throwing getter contained as a coded failure." source "Reads one named option from a caller-supplied entry options object."
guides/queue.md function validateOption: guide "One already-read option checked against its guard, or the coded invalid failure." source "Validates one already-read queue option against its guard."
guides/queue.md QueueInterface.enqueue: guide absent source "Reserves and submits one FIFO entry."
guides/queue.md QueueInterface.restore: guide absent source "Re-enqueues outstanding entries loaded from the store; no-op without a store."
guides/queue.md QueueInterface.start: guide absent source "Begins or restarts worker execution."
guides/queue.md QueueInterface.stop: guide absent source "Rejects non-active work and awaits current-loop/durable quiescence."
guides/queue.md QueueInterface.pause: guide absent source "Suspends new execution resumably."
guides/queue.md QueueInterface.resume: guide absent source "Continues execution after a pause."
guides/queue.md QueueInterface.abort: guide absent source "Cancels active work, rejects pending work, and awaits cleanup."
guides/queue.md QueueInterface.clear: guide absent source "Rejects non-active work and awaits its durable cleanup."
guides/queue.md QueueInterface.destroy: guide absent source "Tears down idempotently and destroys observation last."
guides/queue.md QueueStoreInterface.save: guide absent source absent
guides/queue.md QueueStoreInterface.remove: guide absent source absent
guides/queue.md QueueStoreInterface.load: guide absent source absent
guides/queue.md QueueStoreInterface.clear: guide absent source absent
guides/queue.md pitch: readme absent tagline "A concurrent, cooperative FIFO job queue. `Queue` runs enqueued inputs through a handler under bounded concurrency, with retries and a per-attempt timeout / abort; each `enqueue` returns a promise that settles with the job's result. Worker loops are created only when accepted demand exists, up to the smaller of that demand and `concurrency`. A created idle loop does not busy-poll or run a timer — it parks on a wake list, and `enqueue` / `resume` wake exactly one (or all) parked loops, so an idle queue burns zero CPU. Cancellation is built on the L1 `@orkestrel/abort` and `@orkestrel/timeout` primitives: each attempt's `signal` fires on a queue-level abort, the entry's own signal, or the per-attempt deadline, and the handler is raced against it — so an attempt that ignores its `signal` still fails when the clock runs out. Durability is opt-in and outstanding-only. A `QueueStoreInterface` mirrors the jobs that have not yet settled — saved on accept, removed on settle — so a graceful shutdown empties the store and a crash leaves exactly the unfinished rows. Pass a `store` to `createQueue`, and after a restart a fresh queue over the same store `restore()`s precisely that unfinished work. `DatabaseQueueStore` is the durable engine over the `@orkestrel/database` layer (a queue's durable state is a table), driver-pluggable across memory / JSON / SQLite; `MemoryQueueStore` is the zero-plumbing in-process default. `Queue` is observable: it exposes a typed `emitter` (`.claude/rules/patterns.md` § Stateful emitters) carrying its lifecycle moments for fire-and-forget observers — logging, metrics, tracing (see Observing). Observation is a pure side-channel: every event fires after the relevant transition and a throwing listener is isolated, so a buggy observer can never reorder or corrupt the engine. The queue ships no scheduler, no priorities, and no delay / progress / message channels; use `concurrency: 1` for strict ordering. What ships is the cooperative loop and the outstanding-only store. Source: `src/core`."
rows read: 1, disagreements found: 41
exit 1
```

## Facts for queue (taken 2026-09-07T21:13Z by facts.sh)

- Checkout `/home/user/fleet/queue`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `4042dda`, status: clean
- `package.json`: version `0.0.13`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 8 | summary 4 | banned 4 | tests/src/core/Queue.test.ts(4) tests/setup.ts(4) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept | Spec                   | Source                    | Tests                                 |
    9:| ------- | ---------------------- | ------------------------- | ------------------------------------- |
    10:| Queue   | [`queue.md`](queue.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    14:| Directory  | Guide                  |
    15:| ---------- | ---------------------- |
    16:| `src/core` | [`queue.md`](queue.md) |
- Guide `guides/queue.md`: 342 lines. Headings:
    1:# Queue
    35:## Surface
    54:### Factories
    62:### Entities
    71:### Types
    88:### Guards
    115:### Helpers
    133:## Methods
    137:#### `QueueInterface`
    153:#### `QueueStoreInterface`
    164:## Contract
    180:## Persistence
    199:### Wiring a store into a queue
    219:## Observing
    243:## Patterns
    245:### Create a queue
    256:### Bounded concurrency
    268:### Retries
    278:### Per-attempt timeout
    290:### Abort
    302:### Lifecycle
    316:### Practices
    325:## Tests
    335:## See also
- Table headers in `guides/queue.md` (a header row is the row before a `| ---` row):
    56: | API                        | Kind     | Summary                                                                                      |
    64: | API                  | Kind  | Summary                                                                                   |
    73: | Type                  | Kind      | Shape                                                                                                                      |
    90: | API                  | Kind     | Summary                                                                                   |
    119: | API              | Kind     | Summary                                                                                 |
    141: | Method    | Returns            | Behavior                                                                                                             |
    157: | Method   | Returns                              | Behavior                                                                     |
    235: | Event map                | Events                                                                                                                          |
- Rows of any `### Entities` table (the Kind cell):
    66:  `Queue`              | class
    67:  `QueueError`         | class
    68:  `MemoryQueueStore`   | class
    69:  `DatabaseQueueStore` | class
- H1 blockquote (`guides/queue.md`):
    3: > A concurrent, cooperative FIFO job queue. `Queue` runs enqueued inputs through a handler
    4: > under bounded concurrency, with retries and a per-attempt timeout / abort; each `enqueue`
    5: > returns a promise that settles with the job's result.
    6: >
    7: > Worker loops are created only when accepted demand exists, up to the smaller of that
    8: > demand and `concurrency`. A created idle loop does not
    9: > busy-poll or run a timer — it **parks** on a wake list, and `enqueue` / `resume` wake exactly
    10: > one (or all) parked loops, so an idle queue burns zero CPU. Cancellation is built on the L1
    11: > `@orkestrel/abort` and `@orkestrel/timeout` primitives: each attempt's `signal` fires on a
    12: > queue-level abort, the entry's own signal, or the per-attempt deadline, and the handler is
    13: > _raced_ against it — so an attempt that ignores its `signal` still fails when the clock runs out.
    14: >
    15: > Durability is opt-in and outstanding-only. A `QueueStoreInterface` mirrors the jobs
    16: > that have not yet settled — saved on accept, removed on settle — so a graceful shutdown
    17: > empties the store and a crash leaves exactly the unfinished rows. Pass a `store` to
    18: > `createQueue`, and after a restart a fresh queue over the same store `restore()`s precisely
    19: > that unfinished work. `DatabaseQueueStore` is the durable engine over the
    20: > `@orkestrel/database` layer (a queue's durable state is a table), driver-pluggable
    21: > across memory / JSON / SQLite; `MemoryQueueStore` is the zero-plumbing in-process default.
    22: >
    23: > `Queue` is **observable**: it exposes a typed `emitter` (`.claude/rules/patterns.md`
    24: > § Stateful emitters) carrying its lifecycle
    25: > moments for fire-and-forget observers — logging, metrics, tracing (see [Observing](#observing)).
    26: > Observation is a pure side-channel: every event fires _after_ the relevant transition and a
    27: > throwing listener is isolated, so a buggy observer can never reorder or corrupt the engine.
    28: >
    29: > The queue ships no scheduler, no priorities, and no delay / progress / message channels;
    30: > use `concurrency: 1` for strict ordering. What ships is the cooperative loop and the
    31: > outstanding-only store.
    32: >
    33: > Source: [`src/core`](../src/core).
- Opening prose after the blockquote (first two lines):
    35: ## Surface
    37: Create a queue over a handler, then `enqueue` inputs and await their results:
- README (`README.md`) first lines:
    # @orkestrel/queue
    
    A concurrent, cooperative typed **FIFO job queue**: `Queue` runs enqueued
    inputs through a handler under bounded concurrency, with retries and a
    per-attempt timeout / abort — each `enqueue` returns a promise that settles
    with the job's result. Idle worker loops **park** on a wake list instead of
    busy-polling, so an idle queue burns zero CPU; `enqueue` / `resume` wake
    exactly one (or all) parked loops. Cancellation is built on the L1 abort +
    timeout primitives, so an attempt that ignores its `signal` still fails when
    the per-attempt deadline runs out. Durability is opt-in and outstanding-only —
    pass a `store` and a `restore()` after a restart re-runs precisely the
    unfinished work; `DatabaseQueueStore` persists over any driver, and
- `## Patterns` fences, each with its nearest preceding heading:
    39: fence under "## Surface"
    99: fence under "### Guards"
    124: fence under "### Helpers"
    184: fence under "## Persistence"
    203: fence under "### Wiring a store into a queue"
    223: fence under "## Observing"
    247: fence under "### Create a queue"
    258: fence under "### Bounded concurrency"
    270: fence under "### Retries"
    280: fence under "### Per-attempt timeout"
    292: fence under "### Abort"
    304: fence under "### Lifecycle"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:45:export function createQueue<TInput, TResult>(
    src/core/factories.ts:84:export function createDatabaseQueueStore<TInput extends ContractShape>(
    src/core/factories.ts:95:export function createDatabaseQueueStore(
    src/core/factories.ts:134:export function createMemoryQueueStore<TInput extends ContractShape>(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/stores/DatabaseQueueStore.ts:33:export class DatabaseQueueStore<TInput> implements QueueStoreInterface<TInput> {
    src/core/stores/MemoryQueueStore.ts:21:export class MemoryQueueStore<TInput extends ContractShape> implements QueueStoreInterface<
    src/core/Queue.ts:40:export class Queue<TInput, TResult> implements QueueInterface<TInput, TResult> {
    src/core/errors.ts:11:export class QueueError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/stores/DatabaseQueueStore.ts:1
    src/core/stores/MemoryQueueStore.ts:1
    src/core/Queue.ts:1
    src/core/validators.ts:5
    src/core/factories.ts:3
    src/core/helpers.ts:2
    src/core/types.ts:12
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    3:// `MODULES`, `INTERNAL`, and `ROOT_FILES` constants are this package's own, and are the only
    20:} from '@orkestrel/guide'
    53:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    59:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    104:		for (const group of guide.methods()) {
    105:			const members = source.methods(group.interface).map((method) => method.name)
    113:					expect(findMissing(members, documented)).toEqual([])
    116:					expect(findMissing(documented, members)).toEqual([])
    122:							: findMissing(
    123:									source.methods(entity).map((method) => method.name),
    141:				findUnexampled(
    144:					source.examples().map((example) => example.name),
    149:		for (const group of guide.methods()) {
    154:					? source.examples(group.interface).map((example) => example.name)
    158:							.concat(source.examples(entity).map((example) => example.name))
    165:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    177:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 325:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-queue-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/queue.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/queue.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-queue-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
