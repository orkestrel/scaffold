# Brief — P.1 `d7n-worker-prep` (worker's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/worker` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `5c8df36`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

worker's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== worker 2026-09-07T16:43:50Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
94:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 788ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### worker (5c8df36, version 0.0.11, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 32 unchanged, 0 removed in ..
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
   tests/setupServer.ts(3)
   tests/setup.ts(3)
-- docs
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
-- check
   tests/guides.test.ts(123,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(126,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(130,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(145,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(160,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
    Test Files  1 passed (1)
         Tests  18 passed (18)
   exit 0
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 6 | summary 6 | banned 0 | tests/setupServer.ts(3) tests/setup.ts(3) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for worker (taken 2026-09-07T16:44Z by facts.sh)

- Checkout `/home/user/fleet/worker`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `5c8df36`, status: clean
- `package.json`: version `0.0.11`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    116:			const members = source.methods(group.interface)
    123:					expect(findMissing(members, group.methods)).toEqual([])
    126:					expect(findMissing(group.methods, members)).toEqual([])
    130:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    145:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    148:		for (const group of guide.methods()) {
    158:							? source.examples(group.interface)
    159:							: source.examples(group.interface).concat(source.examples(entity))
    160:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    172:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 472:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.11"` → `"version": "0.0.12"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-worker-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
