# Report — `d7n-worker-converge-fix` (worker's fix round on the audit's findings)

Unit complete. Every item landed, every criterion passes, no stop condition fired. The
lifecycle readings the item 3 case asserts were settled by a runtime probe before they were
written, and none of them falsified the fence's comments.

Wall clock, first command to last: 2026-09-08T02:30:42Z to 2026-09-08T02:45:09Z, 14m 27s.

## Item 1 (K1) — `abort`'s dropped fact

`src/core/types.ts`, `WorkerInterface.abort`'s description paragraph, so the fact reaches the
compared `Summary` cell:

```diff
 	/**
-	 * Cancels in-flight work, rejects pending work, and awaits queue-owned cleanup.
+	 * Cancels in-flight work, rejects pending work, and awaits queue-owned cleanup; an
+	 * aborted attempt is never retried.
 	 *
 	 * @param reason - Optional cause retained by the queue's coded abort error
```

The queue's own contract in the installed head start states it at
`node_modules/@orkestrel/queue/dist/src/core/index.d.ts:81` ("A queue-level `abort` never
retries") and again at `:396` ("A queue-level abort never retries"), and `Worker.abort`
(`src/core/Worker.ts:137-139`) returns `this.#queue.abort(reason)` unchanged, so the fact is
the delegate's and it is true here.

`--to guide` carried it to `guides/worker.md:135`.

## Item 2 (K2) — `isReply`'s correlation `id`

`src/server/helpers.ts`:

```diff
- * Narrows an inbound `message` to a {@link Reply} for a given job `id` — no assertion.
+ * Narrows an inbound `message` to a {@link Reply} for a given correlation `id` — no assertion.
@@
- * @param id - The job id a matching reply must carry
- * @returns True if the value is this job's well-formed reply; false otherwise
+ * @param id - The per-dispatch correlation id a matching reply must carry
+ * @returns True if the value is this dispatch's well-formed reply; false otherwise
```

Read against `src/server/Dispatch.ts:60` (`readonly #id = crypto.randomUUID()`), `:108-113`
(the posted envelope carries `id: this.#id` beside `job: this.#context.id`), and `:123`
(`isReply(value, this.#id)`): the argument is the per-dispatch correlation key, never the
stable Queue job id. `--to guide` carried the cell to `guides/worker.md:85`.

## Item 3 (K3) — the executed lifecycle case

`tests/guides.test.ts`, appended inside the package's own executed section after the
CPU-parallel case, named for what it proves:

```ts
it('the lifecycle fence drains, suspends dequeuing, restarts after stop, and is terminal after abort', async () => {
```

It drives one real `createWorker` through `enqueue`, the `drain` hook, `pause`, `resume`,
`clear`, `stop`, `start`, `abort`, and `destroy`, and asserts the fence's comments:

- the `drain` hook fires and leaves `count` and `active` at `0`;
- with a blocking job in flight, `pause` sets `paused`, the blocking job still resolves, and
  the job enqueued while paused never reaches the handler (`started` stays at the jobs that
  ran, `count` stays at `1`);
- `resume` clears `paused` and the parked job resolves;
- `clear` rejects a pending job with `queue is cleared` while in-flight work is untouched;
- `stop` sets `stopped` and a later `enqueue` rejects with `queue is stopped`;
- `start` clears `stopped` and a later `enqueue` resolves;
- `abort` leaves the worker terminal: `stopped` stays set through a following `start`, and a
  later `enqueue` still rejects with `queue is aborted`.

**Readings settled before they were asserted.** A runtime probe under `tmp/probe/` (deleted
after it settled its question, per the brief) drove the same sequence and printed the state.
Its control (`expect(1).toBe(2)`, drawn from outside the population) failed on every run, so
the instrument reported rather than always passing. The readings:

```text
afterDrain={"count":0,"active":0,"paused":false,"stopped":false}
paused={"paused":true,"active":1,"started":["first","blocker"]}
whilePaused={"started":["first","blocker"],"count":2,"active":1}
afterBlockerSettled={"started":["first","blocker"],"count":1}
resumed={"paused":false,"pending":"pending","started":["first","blocker","pending"]}
queuedRejected=QueueError: queue is cleared
afterClear={"count":1,"active":1,"started":["blocker"]}
afterStop={"stopped":true,"paused":false,"count":0,"active":0}
enqueueWhileStopped="rejected: QueueError: queue is stopped"
afterStart={"stopped":false}
restarted="resolved: restarted"
afterAbort={"stopped":true,"paused":false,"count":0,"active":0}
enqueueAfterAbort="rejected: QueueError: queue is aborted"
restartAfterAbort="start returned; stopped=true"
enqueueAfterRestart="rejected: QueueError: queue is aborted"
```

No comment on the fence was falsified. `restartAfterAbort` and `enqueueAfterRestart` are what
"terminal" means observably, so the case asserts them rather than the weaker "`stopped` after
`abort`".

**The case can fail.** Planted control: `expect(worker.stopped).toBe(false)` after the
post-abort `start`.

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides            (control planted)
FAIL tests/guides.test.ts > worker.md fences return the values they claim >
  the lifecycle fence drains, suspends dequeuing, restarts after stop, and is terminal after abort
AssertionError: expected true to be false // Object.is equality
      Tests  2 failed | 25 passed (27)

$ PATH=/opt/npm11/bin:$PATH npm run test:guides            (control removed by editing it back)
      Tests  27 passed (27)
```

The planted line sat in this unit's own new case and was removed by editing; `diff` against
the pre-plant copy reported the file identical afterwards.

## Item 4 (K4) — the pointers

Every `(§N)` in `src` now names its destination. The brief enumerated `src/core/factories.ts:15`,
`src/core/Worker.ts:36`, `:50`, and `src/core/types.ts`'s `(§4.5)`; criterion 4 sweeps all of
`src`, so `src/core/Worker.ts:28` (`(§10)`) and `src/core/types.ts:62` (`(§8)`) are cleared with
them. Each decision is recorded under "Ancillary decisions".

| Site | Was | Is |
| ---- | --- | -- |
| `src/core/Worker.ts:28` | `- **Lifecycle (§10).**` | `- **Lifecycle (see the guide's `## Methods` section).**` |
| `src/core/Worker.ts:36` | `- **Observable (§13).**` | `- **Observable (see the guide's `## Observing` section).**` |
| `src/core/Worker.ts:50` | `// The PUSH observation surface (§13) —` | `// The push observation surface (see the guide's `## Observing` section) —` |
| `src/core/factories.ts:15` | `Observable (§13): a typed` | `It is observable (see the guide's `## Observing` section): a typed` |
| `src/core/types.ts:21` | `Declared as a `type` alias (§4.5).` | the fleet's own sentence (following) |
| `src/core/types.ts:62` | `the reserved {@link EmitterHooks} key (§8):` | `the reserved {@link EmitterHooks} key:` |

The `(§4.5)` replacement is the sentence the rest of the fleet already carries for an event
map, verified against the installed emitter (`node_modules/@orkestrel/emitter/dist/src/core/index.d.ts:174`
declares `EventMap` as a `type`):

```diff
- * Declared as a `type` alias (§4.5).
+ *
+ * Declared as a `type` alias (not `interface extends EventMap` — `EventMap` is a
+ * `type` kind): a type-literal satisfies the `EventMap` constraint
+ * (`Record<string, readonly unknown[]>`) structurally, whereas an interface lacks the
+ * required index signature.
```

The `(§8)` strike takes the fleet's form for the same bullet (`agent/src/core/types.ts:1098`,
`console/src/core/types.ts:396`), where the word `reserved` already carries the fact the
number pointed at.

## Item 5 (K5) — the all-caps sites

Every site the converge report's finding 1 listed, plus `src/server/factories.ts:55`
(`SAME`), plus the `OR` on `src/server/factories.ts:16` inside a block this item was already
rewriting:

| File | Was | Is |
| ---- | --- | -- |
| `src/core/Worker.ts:14` | `handler ACQUIRES a pooled resource` | ``handler `acquire`s a pooled resource`` |
| `src/core/Worker.ts:15` | `and RELEASES it in a `finally`` | ``and `release`s it in a `finally``` |
| `src/core/Worker.ts:36` | `RE-EXPOSES the` | `re-exposes the` |
| `src/core/Worker.ts:38` | `as the worker's OWN events` | `as the worker's own events` |
| `src/core/Worker.ts:50` | `The PUSH observation surface`, `the worker's OWN emitter` | `The push observation surface`, `the worker's own emitter` |
| `src/core/Worker.ts:180` | `onto the worker's OWN emitter` | `onto the worker's own emitter` |
| `src/server/handlers.ts:4` | `SELF-CONTAINED by necessity`, `loads as RAW` | `It is self-contained by necessity`, `loads as raw` |
| `src/server/handlers.ts:5` | `it imports ONLY` | `it imports only` |
| `src/server/handlers.ts:29` | `side ALSO terminates` | `side also terminates` |
| `src/server/handlers.ts:84` | `carries BOTH ids` | `carries both ids` (the sentence names `id` and `job`, which the writing rule permits) |
| `src/server/factories.ts:16` | `an early `error` OR an `exit`` | ``an early `error` or on an `exit``` |
| `src/server/factories.ts:19` | `to `false` AND latch` | ``to `false` and latch`` |
| `src/server/factories.ts:22` | `attaches AFTER the death` | `attaches after the death` |
| `src/server/factories.ts:55` | `over the SAME `path`` | ``over the same `path``` |
| `src/server/Dispatch.ts:20` | `A thread that ALREADY died` | `A thread that had already died` |
| `src/server/types.ts:32` | `` `death` LATCHES the first `` | `` `death` latches the first `` |
| `src/server/types.ts:34` | `dispatched AFTER the thread died` | `dispatched after the thread died` |
| `src/server/types.ts:61` | `narrows the work payload BEFORE it crosses` | `narrows the work payload before it crosses` |

The contrast each site carried is kept by the surrounding clause rather than by case:
`acquire`/`release` take the backticked pool verbs the guide's `## Contract` already uses;
`had already died` keeps the ordering the sentence's next clause explains; `both ids` keeps
the pairing the same sentence names.

**The ruled sweep.** Pattern `\b[A-Z]{3,}\b`, paths `src guides/worker.md README.md`:

```text
$ grep -rnE '\b[A-Z]{3,}\b' src guides/worker.md README.md
```

Every remaining hit is a permitted token; no emphasis all-caps survives.

| Token | Sense | Sites |
| ----- | ----- | ----- |
| `URL` | the `URL` class and the `string \| URL` type | `src/server/Thread.ts:26`, `src/server/NodeWorker.ts:21`, `src/server/factories.ts:37`, `:41`, `:114`, `src/server/Dispatch.ts:47`, `src/server/types.ts:88`, `guides/worker.md:68`, `:275`, `:418`, `README.md:56` |
| `JSON` | the data format and the `createJSONQueueStore` / `createJSONDriver` names | `src/server/factories.ts:46`, `:50`, `:51`, `:54`, `:55`, `:59`, `:61`, `guides/worker.md:52`, `:252`, `:253`, `:330`, `:540` |
| `CPU` | the processor abbreviation | `src/server/factories.ts:83`, `:98`, `src/server/Dispatch.ts:26`, `src/server/types.ts:54`, `guides/worker.md:16`, `:53`, `:108`, `:209`, `:259`, `:312`, `:408`, `:493`, `:495`, `:508`, `README.md:11`, `:48` |
| `FIFO` | first-in, first-out ordering | `src/core/types.ts:101`, `guides/worker.md:8`, `:129`, `:611` |
| `API` | the Surface tables' first-column header | `guides/worker.md:49`, `:82`, `:91` |
| `README` | the `README.md` filename in a link and in prose | `guides/worker.md:507`, `:615` |
| `ESM` | the module format | `README.md:30` |
| `MIT`, `LICENSE` | the licence name and the linked file | `README.md:80` |

(Line numbers are the post-edit files'.)

## Item 6 (K6) — the opening prose

`guides/worker.md:7-22`. The clause 2 restatement (construction capture, the `undefined`-only
defaulting, the validation order, the direct-property-access capture) and the observability
restatement are gone; each displaced tagline fact keeps one sentence and the clause is
pointed at rather than repeated:

```diff
-adds only the resource pairing, and it reimplements neither primitive. Construction captures
-every caller-owned top-level option once. Only `undefined` selects the `concurrency` default
-(`1`) or matching pool `max`; runtime `null` is invalid and reaches the owning validator.
-Queue is constructed and validates `concurrency` before the caller's pool option is read;
-then every declared pool option (`max`, `on`, `error`, `create`, `destroy`, `validate`) is
-captured once by direct property access before Pool is constructed, preserving structural
-implementations whose members are inherited or non-enumerable. At most one resource exists
-per in-flight job by default, and idle resources are reused across jobs. Each job acquires
-over the attempt's `context.signal`, so an abort or a timeout while waiting for a resource
-rejects the acquire cleanly (no token to release).
-
-The worker is **observable**: its `emitter` re-exposes the underlying queue's job lifecycle
-(`enqueue` / `start` / `retry` / `success` / `failure` / `abort` / `drain`) as its own
-events, bridged at construction, so a consumer never reaches through to the internal
-`Queue`. For CPU parallelism, `createNodeWorker` (`@orkestrel/worker/server`) specializes
+adds only the resource pairing, and it reimplements neither primitive. At most one resource
+exists per in-flight job by default, and idle resources are reused across jobs. Each job
+acquires over the attempt's `context.signal`, so an abort or a timeout while waiting for a
+resource rejects the acquire cleanly (no token to release). For what construction captures,
+when each value is validated, and which validator a runtime `null` reaches, see
+`## Contract`.
+
+The worker is observable through its own `emitter` — see [Observing](#observing). For CPU
+parallelism, `createNodeWorker` (`@orkestrel/worker/server`) specializes
```

The division of labour, the one-resource-per-job default, the acquire over `context.signal`,
the CPU-parallelism pointer, and the `Source:` / `Surfaced through` sentences all stay, one
sentence each.

## Item 7 (K7) — the lifecycle pattern

The brief's preferred path: the fence enqueues one job and awaits `drain` before the
lifecycle tour, so `### Pause, drain, and shut down` and its lead-in are true as written.

```diff
-Drive the lifecycle between enqueues, and close the worker down when its work is finished:
+Enqueue work, wait for the `drain` event, then drive the lifecycle and close the worker down:

 ```ts
 import { createWorker } from '@orkestrel/worker'

-const worker = createWorker({ pool: { create: () => connect() }, handler: run })
+const idle = Promise.withResolvers<void>()
+const worker = createWorker({
+	pool: { create: () => connect() },
+	handler: run,
+	on: { drain: () => idle.resolve() }, // fires when nothing is pending and nothing in flight
+})
+
+await worker.enqueue('https://example.com')
+await idle.promise // the queue has drained

 worker.pause() // suspends dequeuing; jobs already in flight keep running
@@
-await worker.abort('shutting down') // cancels in-flight jobs; the worker is terminal after it
+await worker.abort('shutting down') // cancels in-flight jobs; `start` cannot revive the worker
```

The abort comment now states the terminal claim in the form the probe settled and the item 3
case asserts. The item 3 case covers the enqueue and the drain.

## Item 8 (K8) — the closing sweep's items

Each item of `d7n-worker-close-brief.md` was checked against the tree. The `Shape` idiom, the
`#` links, the drop-in, and the fence lead-ins were already closed on this tip and needed no
edit; the readings are recorded so the closure is auditable rather than assumed.

- **The `Shape` idiom (Rulings 15, 18, 20, 21, 25, 26).** The one table carrying `Shape` is
  `### Types`, with the canonical convention sentence between its heading and the table. The
  close brief's only open sub-item was `plus` on `WorkerOptions`, `NodeWorkerOptions`, and
  `ServeWorkerOptions`. Read from the declarations (`src/core/types.ts:66-76`,
  `src/server/types.ts:85-96`, `:114-117`): every member of each is a data property —
  `handler` is a property whose type is a function, not a call signature — so no row takes
  `plus` and no cell changed. No guard table, no constants table, and no extended interface
  exists here, so Rulings 20, 21, 25, and 26 have no site in this guide. Verified:
  `grep -n '| interface *| `{[^`]*:' guides/worker.md` prints nothing, and the only `…` in
  the file (`:442`) is inside a fence comment, not a `Shape` cell.
- **`#` links (close brief item 2).** `npm run docs` reads `disagreements found: 0`, so no
  row disagrees on a member reference.
- **The drop-in (Rulings 13, 20, 21).** Lines 1 to 3 equal the pilot's (`diff` prints
  nothing), and the region from `const root = ` through the manifest loop's closing brace
  equals the pilot's apart from worker's own file-scope case appended after the pilot's
  README case, which Ruling 20 permits:

  ```text
  $ diff <pilot region> <worker region>
  65a66,71
  > it('keeps internal orchestration classes out of the public server barrel', () => {
  > 	const barrel = requireValue(files['src/server/index.ts'], 'Missing file: src/server/index.ts')
  > 	const names = ['NodeWorker', 'Thread']
  > 	expect(names.every((name) => !barrel.includes(`./${name}.js`))).toBe(true)
  > })
  ```

  The package's own imports and the executed section that closes the file sit outside the
  region, as Ruling 21's header sentence states.
- **Fence lead-ins (Ruling 21).** The sweep prints nothing: every fence in `guides/worker.md`
  sits under a complete sentence.

## Item 9 — propagation

```text
$ npx oxfmt --config .oxfmtrc.json --write guides/worker.md README.md tests/guides.test.ts src
Finished in 576ms on 15 files using 4 threads.

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
wrote guides/worker.md
rows read: 1, disagreements found: 2, written: 2, reported: 0

$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0
```

The rows written are the `abort` and `isReply` cells of items 1 and 2.

## Acceptance criteria

### 1. Scope

```text
$ git status --short
 M guides/worker.md
 M src/core/Worker.ts
 M src/core/factories.ts
 M src/core/types.ts
 M src/server/Dispatch.ts
 M src/server/factories.ts
 M src/server/handlers.ts
 M src/server/helpers.ts
 M src/server/types.ts
 M tests/guides.test.ts

$ git diff -U0 -- src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'
   (no output)
```

Owned files only; every `src` line changed is a doc block or a comment. `README.md` needed no
edit and is unmodified. Instruments sit in `tmp/d7n-worker-converge-fix/`, which git ignores;
`tmp/probe/` was removed after it settled item 3.

### 2. Formatter, lint, typecheck

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/worker.md README.md tests/guides.test.ts src
All matched files use the correct format.
Finished in 472ms on 15 files using 4 threads.                                   exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src
   (no diagnostics)                                                              exit 0

$ PATH=/opt/npm11/bin:$PATH npm run check                                        exit 0
> tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
```

`oxlint` first reported `vitest(require-to-throw-message)` against the new case's bare
`toThrow()` calls. The `while stopped` call now names `queue is stopped` and the `after abort`
call names `queue is aborted`, the rejections the probe read, which is a stronger assertion
than the bare form.

### 3. The seed

```text
$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

### 4. The greps

```text
$ grep -ic 'never retried' guides/worker.md
1
$ grep -in 'never retried' guides/worker.md
135:| `abort`   | `Promise<void>`    | Cancels in-flight work, rejects pending work, and awaits queue-owned cleanup; an aborted attempt is never retried. |

$ grep -c 'job `id`' src/server/helpers.ts
0

$ grep -rnE '\(§[0-9.]+\)' src
   (no output)

$ grep -c 'SAME' src/server/factories.ts
0

$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
   (no output)

$ awk '/^#/{h=NR; blank=0; next} /^[[:space:]]*$/{if(h)blank=1; next} /^```/{ if(h && blank) print h" -> "NR; h=0; next } {h=0}' guides/worker.md
   (no output)
```

### 5. The suites

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides                                  exit 0
 Test Files  1 passed (1)
      Tests  27 passed (27)

$ PATH=/opt/npm11/bin:$PATH npm run test:policy                                  exit 0
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
```

The guides suite carried 26 passing cases on the committed tip and carries 27 with the item 3
case. The policy run's skip is the pre-existing conditional skip on this tip.

Observation, not a criterion:

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:src:core                                exit 0
 Test Files  2 passed (2)
      Tests  37 passed (37)
```

The `ExperimentalWarning: SQLite is an experimental feature` line in the guides run is the
installed `@orkestrel/database` driver's and predates this unit.

### Diffstat

```text
 guides/worker.md        | 70 +++++++++++++++++++++++---------------------
 src/core/Worker.ts      | 42 +++++++++++++--------------
 src/core/factories.ts   |  5 ++--
 src/core/types.ts       | 11 +++++--
 src/server/Dispatch.ts  |  2 +-
 src/server/factories.ts |  8 ++---
 src/server/handlers.ts  |  8 ++---
 src/server/helpers.ts   |  6 ++--
 src/server/types.ts     |  6 ++--
 tests/guides.test.ts    | 77 ++++++++++++++++++++++++++++++++++++++++++++++++-
 10 files changed, 160 insertions(+), 75 deletions(-)
```

## Ancillary decisions

1. **The K7 path.** The fence enqueues and awaits `drain` (the brief's preferred option), so
   the heading and lead-in stand as written rather than being renamed. The `drain` listener is
   wired through the reserved `on` option rather than through `emitter.on`, because the fence
   then demonstrates the option a reader of `### Types` meets in `WorkerOptions` and needs no
   listener-removal line.
2. **The case's name.** `the lifecycle fence drains, suspends dequeuing, restarts after stop,
   and is terminal after abort` — the claims it proves, not the fence's heading.
3. **The `(§N)` sites the item list did not name.** `src/core/Worker.ts:28` (`(§10)`) and
   `src/core/types.ts:62` (`(§8)`) fall inside criterion 4's sweep of `src` but outside item
   4's enumerated sites. Each was cleared, because leaving either red would fail the
   criterion. `(§8)` is struck rather than repointed: the fleet's own form of that bullet
   carries no pointer, and `reserved` already states the fact.
4. **`src/server/factories.ts:16` (`OR`).** An all-caps emphasis too short for criterion 5's
   `\b[A-Z]{3,}\b` pattern, sitting inside the same doc block as the `AND` the item does
   name. Lowered with it rather than left as the surviving emphasis in a rewritten paragraph.
5. **The `## Tests` bullet.** Adding the item 3 case made the existing sentence ("It also
   transcribes the Threads, NodeWorker, Persistence, and CPU-parallel fences") false about
   what the suite runs, so the bullet now names the lifecycle fence and what the case checks
   for it. `guides/worker.md` is owned, and the parity contract requires the guide to describe
   the tests it links.
6. **`abort`'s fact placed in the description, not `@remarks`.** Criterion 4 requires
   `never retried` on the guide's `abort` row, and only the description paragraph reaches a
   `Summary` cell.

## Findings outside this unit's scope

1. **`guides/worker.md:250` names a `## Contract` clause by its number** ("it inherits the
   Worker's `emitter` unchanged (clause 3)"). `.claude/rules/writing.md` § Sentence and
   paragraph order bans naming a list item by its position. It sits inside `## Contract`
   itself, which no item of this brief opens. Carrier: worker's next guide unit.
2. **`src/server/handlers.ts:4-11` and `src/server/factories.ts:19-27` still hand-wrap below
   the formatter's width in places the formatter cannot reflow.** No rule is broken; the
   ragged wrap is inherited. Carrier: none needed unless a later unit rewrites those blocks.

## Deviation state

No deviation. No gate outside the owned files went red, no residual disagreement survived
`--to guide`, and the item 3 probe falsified none of the fence's comments — every claim the
fence makes was confirmed before it was asserted.
