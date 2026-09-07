# Brief — P.1 `d7n-queue-prep` (queue's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/queue` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `4de9d60`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

queue's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== queue 2026-09-07T16:42:44Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
82:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 1s
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### queue (4de9d60, version 0.0.12, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 27 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/src/core/Queue.test.ts(4)
   tests/setup.ts(4)
-- docs
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
-- check
   tests/guides.test.ts(112,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(115,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(119,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(134,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(149,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 8 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  8 failed | 18 passed (26)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 8 | summary 4 | banned 4 | tests/src/core/Queue.test.ts(4) tests/setup.ts(4) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for queue (taken 2026-09-07T16:43Z by facts.sh)

- Checkout `/home/user/fleet/queue`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `4de9d60`, status: clean
- `package.json`: version `0.0.12`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    105:			const members = source.methods(group.interface)
    112:					expect(findMissing(members, group.methods)).toEqual([])
    115:					expect(findMissing(group.methods, members)).toEqual([])
    119:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    134:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    137:		for (const group of guide.methods()) {
    147:							? source.examples(group.interface)
    148:							: source.examples(group.interface).concat(source.examples(entity))
    149:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    161:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 325:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.12"` → `"version": "0.0.13"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-queue-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
