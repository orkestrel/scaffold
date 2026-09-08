# Report — P.2 `d7n-worker-converge` (worker under the equality gate)

Unit complete. `npm run docs` reads `rows read: 1, disagreements found: 0`, both write
directions read `written: 0`, and every gate the brief names exits 0. One decision beyond the
brief's enumerated sites is recorded under "Decisions", with its measurement: worker's
`## Methods` table was invisible to `@orkestrel/guide`'s readers, so renaming its header alone
would have left the Methods half of the gate vacuous.

Wall clock, first command to last: 2026-09-08T01:25:06Z to 2026-09-08T01:42:24Z, 17m 18s.

## The predecessor's hunks

The predecessor left `tests/guides.test.ts` modified and no report. Every hunk is ruled **keep**;
none was wrong and none was discarded. The whole file now matches the pilot's
`/home/user/fleet/abort/tests/guides.test.ts` byte for byte from
`const root = new URL('../', import.meta.url)` through the manifest loop's closing brace, apart
from worker's own file-scope case (see the last row).

| Hunk | Ruling | Why |
| ---- | ------ | ---- |
| Header lines replaced with the pilot's three lines | keep | Ruling 21's canonical header; matches `/home/user/fleet/abort/tests/guides.test.ts:1-3` byte for byte |
| `findDrift` added to the `@orkestrel/guide` import | keep | The equality case's reader, per the brief's gate cases |
| `GUIDE_SPEC = 'guides/worker.md'` added | keep | The spec constant the pin and the README case use |
| `INTERNAL` doc block: "the paired assertion" → "the assertion that follows it" | keep | Ruling 13's first correction |
| `ROOT_FILES` doc reworded and `README.md` added | keep | The README case reads the file through the inventory |
| `own` manifest lookup added | keep | The pin's `source` module comes from the row |
| Pin case `pairs at least one example title across the guide and the source` | keep | Ruling 11's guard-and-continue form, no local predicate, both title sets in the failure line |
| README case `opens the README with the guide tagline` | keep | Two `not.toBeUndefined()` guards before `toBe` |
| Equality case, inside the manifest loop after the methods loop and before the examples case | keep | Ruling 13's second correction; position verified against the pilot |
| (pre-existing, untouched) `keeps internal orchestration classes out of the public server barrel` | keep | Ruling 20 permits a package's own file-scope case appended after the pilot's cases |

Verification of the canonical text:

```text
$ awk '/^const root = new URL/{on=1} on{print} /^\/\/ The EXECUTED half|^\/\/ Every preceding assertion/{exit}' <pkg>/tests/guides.test.ts
$ diff -u /tmp/dropin-abort.txt /tmp/dropin-worker.txt
  the only hunk is worker's own `keeps internal orchestration classes out of the public server barrel`
  case and the first line of its own executed section
$ grep -n "Interface\$\|new URL('../', import.meta.url)" tests/guides.test.ts
61:const root = new URL('../', import.meta.url)
169:			const entity = group.interface.replace(/Interface$/, '')
230:			const entity = group.interface.replace(/Interface$/, '')
```

## Criterion 1 — red-first on the unconverged tree

```text
$ npm run test:guides                                        exit 1: Tests  3 failed | 18 passed (21)
FAIL tests/guides.test.ts > pairs at least one example title across the guide and the source
  AssertionError: expected [ Array(1) ] to deeply equal []
  + "guides/worker.md pairs: guide [\"Surface\",\"Threads\",\"NodeWorker\",\"NodeWorker\",\"Persistence\",\"Observing\",\"A resource-backed worker\",\"CPU-parallel jobs over threads\",\"Durable jobs across restarts\"] source []"
FAIL tests/guides.test.ts > opens the README with the guide tagline
  AssertionError: expected undefined not to be undefined
  ❯ tests/guides.test.ts:121:20   expect(pitch).not.toBeUndefined()
FAIL tests/guides.test.ts > Worker > keeps every compared summary and example equal to its source
  AssertionError: expected [ …(16) ] to deeply equal []
  + "guides/worker.md function createWorker: guide \"Create a `WorkerInterface` — a `Queue` ⨉ `Pool`; each job runs against an acquired resource.\" source \"Creates a resource-backed job worker — a `Queue` (`@orkestrel/queue`) marrying a `Pool` (`@orkestrel/pool`). Each enqueued input runs through the handler against an automatically acquired pooled resource (released when the job settles), with the queue's bounded concurrency, retries, and per-attempt timeout / abort.\""
  + "guides/worker.md function createJSONQueueStore: guide \"Create a JSON-file `QueueStoreInterface` (`@orkestrel/worker/server`) — durable across restarts.\" source \"Creates a persistent JSON-file `QueueStoreInterface` — the core `createDatabaseQueueStore` over a server `createJSONDriver`.\""
  + "guides/worker.md function createNodeWorker: …"  (the brief's worklist, verbatim, through `type Reply`)
```

The full log is `/home/user/fleet/worker/tmp/d7n-worker-converge/red-first-guides.log.txt`.

The Methods half of the equality case read red only after the `#### \`WorkerInterface\`` heading
landed (see "Decisions"); that reading is recorded there.

## Criterion 2 — headers and the class rows

```text
$ grep -n '^| ' guides/worker.md   (header rows)
55:  | API | Kind | Summary |                      ### Factories
88:  | API | Kind | Summary |                      ### Threads
97:  | API | Kind | Summary |                      ### Classes
108: | Type | Kind | Shape | Summary |             ### Types
133: | Method | Returns | Summary |                #### `WorkerInterface`
379: | Event map | Events |                        ## Observing (outside `## Surface` and `## Methods`)
```

- `Behavior` renamed to `Summary` in the `## Methods` table.
- `Summary` added as the last column of the `### Types` table; the type literal stayed in `Shape`.
- `### Entities` renamed `### Classes` (`grep -c Entities guides/worker.md` → `0`); every row's
  `Kind` is `class`, so Ruling 16's trigger fires. No class is documented under its own H3, so no
  row was added.
- The first column's header text (`API`, `Type`, `Method`) is unchanged, per Ruling 10.

## Criterion 3 — the doc blocks, the `Shape` idiom, and the propagation

### `Shape` cells rewritten to Ruling 12's idiom

The convention sentence sits at `guides/worker.md:104`, between the `### Types` heading and the
table, in Ruling 15's fleet-wide wording. No extended interface, guard table, or constants table
exists here, so no second sentence was added.

| Row | Before | After |
| --- | ------ | ----- |
| `WorkerHandler` | `` `(input, resource, context) => Promise<TResult> \| TResult` `` plus a prose clause | `` `(input: TInput, resource: TResource, context: QueueContext) => Promise<TResult> \| TResult` `` (Ruling 21: a function-type alias holds its own literal) |
| `WorkerOptions` | prose (`` `createWorker` options — … ``) | `` `{ on?, error?, handler, pool, concurrency?, retries?, timeout?, store? }` `` |
| `WorkerInterface` | prose | `` `{ emitter, count, active, paused, stopped } plus enqueue, restore, start, stop, pause, resume, abort, clear, destroy` `` |
| `WorkerEventMap` | prose | `` `{ enqueue, start, retry, success, failure, abort, drain }` `` (Ruling 19: a tuple-map alias takes bare names) |
| `NodeWorkerOptions` | prose | `` `{ on?, error?, script, input, result, workerData?, concurrency?, retries?, timeout?, store? }` `` |
| `ServeWorkerOptions` | prose | `` `{ input, handler }` `` |
| `NodeThread` | prose | `` `{ worker, alive, death }` `` |
| `Reply` | `` `{ id, ok: true, value }` or `{ id, ok: false, error }` `` plus prose | `` `{ id, ok, value } \| { id, ok, error }` `` |

`handler` in `WorkerOptions` and in `ServeWorkerOptions` is a property whose type is a function,
not a call-signature member, so it stays inside the braces rather than after `plus`.

### Non-`Summary` cells against the baseline

The `### Types` table was rebuilt by hand. The comparison instrument
(`tmp/d7n-worker-converge/cells.py`, splitting on a pipe not preceded by a backslash) reports:

```text
$ python3 tmp/d7n-worker-converge/cells.py
rows compared: 32
rows missing after: []
non-Summary cells moved: 0
```

That comparison covers every column the baseline carried before its own final column, so the
`Kind`, `Returns`, and key cells of every table are byte-identical. The `Shape` column is the
header the brief names, and its before/after text is the preceding table.

### Doc blocks rewritten before propagation

| Declaration | File | What changed |
| ----------- | ---- | ------------- |
| `createWorker` | `src/core/factories.ts` | Description tightened to one sentence, `marrying` replaced by `composed with` (one concept, one term against `Worker`'s block and the guide); the queue's bounded concurrency, retries, and per-attempt timeout and abort moved to `@remarks` (Ruling 7) |
| `createNodeWorker` | `src/server/factories.ts` | `THREAD` lowercased in the description; the block's `INFER`, `ZERO`, and `TERMINATES` lowercased, and `Both generics` recast as `` `TInput` and `TResult` `` (a count naming no members) |
| `WorkerEventMap` | `src/core/types.ts` | Description reduced to the summary; "surfacing the underlying queue's moments so a Worker consumer never reaches through to the internal `Queue`" moved into `@remarks` with every sentence kept (Ruling 7); `RE-EXPOSES` and `OWN` lowercased |
| `WorkerInterface` | `src/core/types.ts` | Description recast to "Represents the job-worker contract a consumer holds — a `Queue` whose handler runs each job against a pooled resource", so its cell is distinct from the `Worker` class's cell; `Queue` gained its backticks (Ruling 22) |
| `WorkerInterface.enqueue` | `src/core/types.ts` | Doc block added: description plus `@param`/`@returns` |
| `WorkerInterface.start`, `.pause`, `.resume` | `src/core/types.ts` | Description paragraphs added; each member had none, so its cell would have compared `source absent` |
| `WorkerInterface.restore`, `.stop`, `.clear`, `.destroy` | `src/core/types.ts` | Descriptions extended with the fact the cell carried (the queue delegation, the pending-work rejection, in-flight jobs untouched, the stable barrier) |

Every member description was read against `@orkestrel/queue`'s own declarations before it was
propagated: `node_modules/@orkestrel/queue/dist/src/core/index.d.ts:326-355` gives `stop`
"Rejects non-active work and awaits current-loop and durable cleanup quiescence", `pause`
"Suspends new execution while leaving active entries untouched", and `clear` "Rejects non-active
work and awaits its durable cleanup" — which is what makes "rejects pending work" and "leaving
in-flight jobs untouched" true rather than carried across. `Worker`'s `enqueue` through `clear`
delegate straight to the queue (`src/core/Worker.ts:113-143`); `destroy` (`:145`) installs its own
stable barrier over queue-then-pool teardown.

One guide claim was **not** carried into a block: the `abort` cell's "never retried". `abort`'s
existing description states what the code does; the terminal-ness of `abort` is stated in the
guide's `### Practices` list, and no declaration I read establishes the retry claim, so it was
dropped rather than propagated.

### Facts a compared block cannot hold, landed in the guide's prose

Ruling 7's allowance was used once. The `### Factories` lead-in named the entry point each row
belongs to, which no per-declaration description can carry without repeating the module in every
block. It now reads (`guides/worker.md:51-53`):

> The package publishes these factories. `createWorker` is the `@orkestrel/worker` export;
> `createJSONQueueStore`, `createNodeWorker`, and `serveWorker` are the
> `@orkestrel/worker/server` exports.

### The propagation runs

```text
$ npm run docs -- --to guide         rows read: 1, disagreements found: 17, written: 16, reported: 1
$ npx oxfmt --config .oxfmtrc.json --write <owned paths>       exit 0
   (then the `#### `WorkerInterface`` heading landed and the Methods rows entered the population)
$ npm run docs -- --to guide         rows read: 1, disagreements found: 10, written: 9, reported: 1
$ npm run docs                       rows read: 1, disagreements found: 1   (the titled example alone)
```

## Criterion 4 — the titled pair

- **The block:** `createWorker`'s, in `src/core/factories.ts` — the package's primary factory, the
  declaration the guide's H1 subject and its `## Surface` quick-start both name.
- **The title:** `A resource-backed worker`, the flattened text of the heading whose first fence
  demonstrates `createWorker` (`guides/worker.md:394`, under `## Patterns`).
- **Uniqueness, heading-scoped:** `grep -n '^#\+ A resource-backed worker' guides/worker.md` →
  `394:### A resource-backed worker` and nothing else.
- **Fence body read first:** no three-backtick run and no `*/` inside the body; a lead-in sentence
  already sits between the heading and the fence, so Ruling 21's requirement holds and Ruling 9
  did not fire — the heading is a demonstration heading, not a structural one, so no heading was
  added and no fence moved.
- **Ruling 14:** the fence was the fuller side (it carried a two-line explanatory comment and the
  `await worker.destroy()` line the block lacked). `--to source` carried the whole fence body into
  the block, so nothing was deleted from either side.

```text
$ npm run docs -- --to source        rows read: 1, disagreements found: 1, written: 1, reported: 0
$ grep -n '@example' src/**/*.ts
src/core/factories.ts:25: * @example A resource-backed worker
src/server/Dispatch.ts:41: * @example        (untitled)
src/server/factories.ts:33, 63, 109: * @example   (untitled)
src/server/handlers.ts:37: * @example          (untitled)
```

Exactly one block is titled.

## Criterion 5 — the tagline, the opening prose, and the pitch

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold. Its
text, byte-identical in `guides/worker.md:3-5` and `README.md:3-5`:

> A resource-backed job worker: a thin facade composing a `Queue` (`@orkestrel/queue`) with
> a `Pool` (`@orkestrel/pool`), where each job's handler runs against an automatically
> acquired pooled resource released when the job settles.

**Displaced into the guide's opening prose** (`guides/worker.md:7-28`, which the guide previously
lacked — `## Surface` followed the blockquote directly). Two paragraphs now carry: the division of
labour between the Queue and the Pool with the facade adding only the resource pairing; the
construction-time option capture, the `undefined`-only defaulting, the validation order, and the
direct-property-access capture; the one-resource-per-in-flight-job default and idle reuse; the
acquire over `context.signal`; the observability and the emitter bridge; the CPU-parallelism
pointer; and the `Source:` and `Surfaced through` sentences. None of the tagline's clauses is
restated — the opening prose never re-describes the worker as a `Queue` composed with a `Pool`.

**README sentences changed.** The opening paragraph's first half restated the tagline (the
`Worker`-is-a-`Queue`-with-a-`Pool` sentence and the "Composition, not reimplementation" sentence)
and was removed with the blockquote taking its place. What remains is onboarding the README alone
carries, recast as instructions: create a worker with `createWorker` and what to give it; subscribe
to the `emitter`; reach for `createNodeWorker` where the work is CPU-bound; what a thread handler
receives and what the stable `id` is and is not. Two sentences were dropped as duplicates of the
guide rather than onboarding — the fresh-correlation-id sentence (the guide's `## Contract` clause
5 carries it) and the ambient-context sentence (the guide's `## NodeWorker` carries it).
`Part of the `@orkestrel` line.` stays.

## Criterion 6 — the seed

```text
$ npm run docs                       exit 0: rows read: 1, disagreements found: 0
$ npm run docs -- --to guide         exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source        exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/worker.md README.md src/core/types.ts \
    src/core/factories.ts src/server/factories.ts tests/guides.test.ts
    exit 0: All matched files use the correct format.
$ npx oxlint --config .oxlintrc.json --deny-warnings src/core/types.ts src/core/factories.ts \
    src/server/factories.ts tests/guides.test.ts                       exit 0 (no diagnostics)
$ npm run check                                                        exit 0
$ npm run test:guides                                                  exit 0: Tests  26 passed (26)
$ npm run test:policy                                    exit 0: Tests  90 passed | 1 skipped (91)
```

Observations, not criteria:

```text
$ npm run test:src:core          exit 0: Test Files  2 passed (2);  Tests  37 passed (37)
$ npm run test:src:server        exit 0: Test Files  3 passed (3);  Tests  74 passed (74)
```

No suite timed out under the sibling load.

## Criterion 8 — scope

```text
$ git status --short
 M README.md
 M guides/worker.md
 M src/core/factories.ts
 M src/core/types.ts
 M src/server/factories.ts
 M tests/guides.test.ts

$ git diff --stat
 README.md               |  31 +++----
 guides/worker.md        | 221 +++++++++++++++++++++++++++---------------------
 src/core/factories.ts   |  13 +--
 src/core/types.ts       |  35 +++++---
 src/server/factories.ts |  10 +--
 tests/guides.test.ts    |  85 +++++++++++++++++--
 6 files changed, 253 insertions(+), 142 deletions(-)
```

Owned files only. Instruments sit in `tmp/d7n-worker-converge/`, which git ignores. No control was
planted for the Orchestrator's lint reading. `package.json` and the lockfile were not touched and
no install ran.

## Reader and seed defects met

None. `replaceCell` placed every `Summary` cell it was given, including the ones added as empty
cells to the `### Types` table; the `--to guide` round trip disturbed no non-`Summary` cell;
`--to source` wrote the titled example alone once the summaries agreed; and `oxfmt` restored the
committed table alignment. The one line the seed reported and did not write was the titled example
under `--to guide`, with the correct reason, `the guide fence owns an example`.

## Decisions

### 1. The `## Methods` table needed an interface heading before the gate could read it

**The measurement.** `@orkestrel/guide`'s `collectGroups`
(`node_modules/@orkestrel/guide/dist/src/core/index.js:1604-1619`) only associates a `## Methods`
table with an interface when a **level-4 heading carrying that interface's backticked name**
precedes it. Worker's `## Methods` section carried no such heading, so `guide.methods()` returned
nothing: the Methods rows were outside `findDrift`'s population, and the methods bijection cases
ran over an empty loop. Renaming `Behavior` to `Summary` alone would have left the brief's
objective — "every `## Surface` and `## Methods` table … every cell equals its doc block's
description paragraph" — unenforced, with the gate reading green.

I added `#### \`WorkerInterface\`` at `guides/worker.md:131`, the shape the pilot carries at
`/home/user/fleet/abort/guides/abort.md:75` and the shape `.claude/rules/documentation.md` § Parity
requires ("Use one method table per interface, keyed by its backticked name").

**What that turned on, measured before it was closed:**

```text
$ npm run test:guides            exit 1: Tests  2 failed | 24 passed (26)
FAIL Worker > keeps every compared summary and example equal to its source
  AssertionError: expected [ …(10) ] to deeply equal []      (the 9 method rows plus the example)
FAIL Worker > WorkerInterface examples > documents an example for every method
  AssertionError: expected [ 'start', 'stop', 'pause', …(3) ] to deeply equal []
```

The three bijection cases passed on arrival, so `WorkerInterface`'s documented members already
matched its declaration and `Worker`'s public surface. The equality half closed through the doc
blocks and `--to guide`.

### 2. A lifecycle fence closes `documents an example for every method`

`findUnexampled` (`.../index.js:862-869`) clears a member when its name appears as a word in any
fence body or as a source `@example` name. No fence demonstrated `start`, `stop`, `pause`,
`resume`, `clear`, or `abort`. I added `### Pause, drain, and shut down` under `## Patterns`
(`guides/worker.md:453`) with a lead-in sentence and one `ts` fence driving those members. The
fence claims no return value in any comment, so `.claude/rules/documentation.md`'s transcription
rule owes it nothing and § Tests names no new transcription. It imports only `createWorker` from
`@orkestrel/worker`, which `imports only real exports in every ```ts fence` reads and passes.

This is the one place I added guide content the brief did not enumerate. It is the cheapest way to
close a case the brief's own criterion 7 requires green, and it does not touch the titled pair: the
new heading's text differs from `A resource-backed worker`, so the pairing cannot repoint.

### 3. The titled declaration is `createWorker`, not the facts block's first `create*`

The brief defines the primary factory as "the first `create*` the facts block lists". That list is
in `grep` order, which put `src/server/factories.ts` before `src/core/factories.ts` and therefore
named `createThread` first. `createThread` is a lower-level helper the guide documents under
`### Threads`; `createWorker` is the package's entry, the subject of the H1, and the export the
`## Surface` quick-start and the first `## Patterns` fence both demonstrate. I read the parenthetical
as a way to read the facts block rather than as a ranking, and followed the ruling's words ("the
primary factory") and the pilot's precedent (`createAbort` titled with a `## Patterns` H3).

### 4. Ancillary decisions

- **Which eligible fence carries the title.** The `## Surface` quick-start fence and the
  `### A resource-backed worker` fence both demonstrate `createWorker`. I took the Patterns fence,
  matching the pilot exactly and avoiding a Ruling 9 heading insertion above the quick-start.
- **Where the displaced sentences sit.** In two paragraphs between the blockquote and `## Surface`,
  split at the observability sentence, rather than one block.
- **`zero \`as\`` in prose.** Recast as `no \`as\`` in `guides/worker.md`, `README.md`, and
  `src/server/factories.ts`, because it answers "how many" about a set anyone can add to. The
  compound adjective `` zero-`as` `` (the guide's and `src/server/types.ts`'s name for the bridge)
  is kept, so one concept keeps one term.
- **The `### Types` trailing paragraph.** Kept. It points `emitter` at `## Observing`, the
  call-signature members at `## Methods`, and `Queue`/`Pool` at their own guides, so it does more
  than list the members the `Shape` cell now carries; the pilot keeps the analogous sentence.
- **The convention sentence is unwrapped** (`guides/worker.md:104`, 228 characters on one line),
  matching the pilot's `/home/user/fleet/abort/guides/abort.md:60`.

## Voice sweeps applied

All-caps emphasis corrected in `guides/worker.md`: `ACQUIRES`, `RELEASES`, `RE-EXPOSES`,
`DOC ↔ SOURCE` (twice), `IGNORES`, `AFTER`, `NEVER`, `NOT`, `INFER`, `ZERO`, `TERMINATES`,
`EVERY`, `AND` (twice), `MUST`, `THREAD`, `SAME`, `ACROSS`, `REAL`, `MANUALLY`, `SYNC`, `ASYNC`.
`README.md` carried none after its rewrite.

Counts in prose corrected: `aggregates two failures in that order` →
`aggregates the queue's failure and the pool's in that order`; `Both generics INFER` and
`Both generics infer` → `` `TInput` and `TResult` infer ``; `both terminal paths evicting their
thread` → `each terminal path evicting its thread`; `once across two real jobs` →
`once across successive real jobs`. Every surviving `both` names its members in the same sentence
(`exhaustive, both directions`, `failures from both queue and pool`, `both the core and server
entry points`), which the writing rule permits.

Substitution-table sweep over `guides/worker.md` and `README.md`, case-insensitively and across
inflections, for `should`, `simply`, `easy`/`easier`/`easiest`, `just`, `currently`, `utilize`,
`leverage`, `via`, `in order to`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`,
`allows you to`, `and/or`, `sanity check`, `dummy`, `blacklist`, `whitelist`, `master`, `slave`,
`please`: no hit. The permitted-sense rows were ruled by hand — every `once` is the frequency sense
("captured once", "reads neither option"), never the temporal sense, and `a new worker` in
`### Practices` names a fresh instance rather than a version.

Two lines I edited exceeded the guide's wrap width after the edit and were rewrapped by hand
(`guides/worker.md` `## Contract` clause 2, and the `tests/src/server/helpers.test.ts` bullet in
`## Tests`), because the formatter does not reflow prose. No hyphenated compound sits at a line end
in any description paragraph: `grep -rnE '^\s*\*.*[a-z]-$' src --include=*.ts` reports nothing.

Every `{@link}` tag in a description paragraph is unchanged in form:
`{@link WorkerInterface}`, `{@link NodeThread}`, `{@link QueueStoreInterface}`,
`{@link createJSONDriver}`, `{@link Reply}`, `{@link createNodeWorker}`, `{@link promise}`.

## § Tests

The `tests/guides.test.ts` bullet (`guides/worker.md:500-508`) now names the equality gate
descriptively, in the pilot's shape and with no SQ/MQ/EQ/RQ identifier: every `Summary` cell
against its declaration's description paragraph; the titled `A resource-backed worker` fence
against the `@example` block of that title, pinned so the titled pair cannot be retired silently;
and the README pitch against this guide's tagline. The bullet keeps the transcribed Threads,
NodeWorker, Persistence, and CPU-parallel fences.

## Findings recorded outside this unit's scope

1. **All-caps emphasis survives in doc blocks this unit did not rewrite.** The brief's sweep covers
   the guide, the README, and blocks I rewrote, so these were left rather than widened into a
   package-wide sweep. Every one sits in `@remarks` or a code comment, so none reaches a compared
   `Summary` cell: `src/core/Worker.ts:14`, `:15`, `:36`, `:38`, `:50`, `:180`;
   `src/server/handlers.ts:4`, `:5`, `:29`, `:84`; `src/server/factories.ts:19`, `:22`;
   `src/server/Dispatch.ts:20`; `src/server/types.ts:32`, `:34`, `:61`. Carrier: the closing sweep's
   per-package unit.
2. **A `## Methods` table with no `#### \`Interface\`` heading is silently outside the gate.** Worker
   met it; any package whose guide writes the interface name only in the section's prose has the
   same hole, and its Methods rows never compare. Carrier: the closing sweep, or a `checker` claim
   asserting each converged guide's `guide.methods()` is non-empty where a `## Methods` section
   exists.

## Deviation state

No deviation. No stop condition fired: every `Summary` cell the seed was asked to place was placed,
the titled body fit its block, no test outside `tests/guides.test.ts` went red, no vendored file
needed an edit, no reader returned an undescribed shape, and no residual disagreement stands.

Decision 1 (the `#### \`WorkerInterface\`` heading) and decision 2 (the lifecycle fence) go beyond
the brief's enumerated sites and are surfaced here for the Orchestrator's ruling rather than
carried silently; both are inside `guides/worker.md`, which the brief owns, and both are what the
brief's own objective and criterion 7 require.

---

Orchestrator's annotation (2026-09-08, the audit): every lane ruled claim 12 FAIL on counts in this report's prose (cases, rows, and steps tallied rather than named); every citation was verified against the tree. The finding 1 site list omits `src/server/factories.ts:55`, which the fix round carries; the ground given for dropping `abort`'s "never retried" was false against the installed queue's contract, which the fix round restores.
