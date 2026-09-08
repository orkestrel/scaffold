# Report — `d7n-queue-converge`

Wall clock: 2026-09-07T21:20:05Z to 2026-09-07T21:29:11Z. Baseline `4042dda`, checkout
`/home/user/fleet/queue`, sole writer. No commit, no install, no discard-class git command.

## Criterion 1 — red-first on the unconverged tree

Command: `npm run test:guides`, after adding the gate cases and before any guide, README, or
doc-block edit. Exit 1, `Test Files 1 failed (1)`, `Tests 3 failed | 26 passed (29)`. The three
new cases were the three failures. Verbatim first lines of each:

`pairs at least one example title across the guide and the source`:

```text
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/queue.md pairs: guide [\"Surface\",\"Guards\",\"Helpers\",\"Persistence\",\"Wiring a store into a queue\",\"Observing\",\"Create a queue\",\"Bounded concurrency\",\"Retries\",\"Per-attempt timeout\",\"Abort\",\"Lifecycle\"] source []",
```

`opens the README with the guide tagline`:

```text
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:117:20
    117|  expect(pitch).not.toBeUndefined()
```

`Queue > keeps every compared summary and example equal to its source`:

```text
AssertionError: expected [ …(40) ] to deeply equal []
+   "guides/queue.md function createQueue: guide \"A `QueueInterface` over a handler, with optional concurrency / retries / timeout.\" source \"Creates a concurrent, cooperative job queue — a bounded-concurrency engine that runs each enqueued input through a handler, with retries and a per-attempt timeout / abort, all over the L1 `Abort` / `Timeout` primitives.\"",
+   "guides/queue.md function createDatabaseQueueStore: guide \"A `QueueStoreInterface` over any `DriverInterface` (memory / JSON / SQLite).\" source \"Creates a `DatabaseQueueStore` over any `DriverInterface` — the durable, driver-pluggable backing for a queue's outstanding entries.\"",
+   "guides/queue.md class Queue: guide \"The cooperative concurrent job engine — wake-park loop, retries, timeout, abort.\" source \"Represents a concurrent, cooperative FIFO job queue with optional outstanding-work persistence.\"",
```

The retained log is `tmp/d7n-queue-converge/red-first.log.txt` in the checkout (git ignores `tmp/`).
No control was planted for the lint reading; the Orchestrator takes that after this unit exits.

## Criterion 2 — headers and class rows

Table headers after the change, every `## Surface` and `## Methods` table heading `Summary` beside
only `Kind`, `Shape`, `Returns`:

| Section | Header row |
| --- | --- |
| `### Factories` | `API \| Kind \| Summary` (already so; unchanged) |
| `### Classes` | `API \| Kind \| Summary` (already so; unchanged) |
| `### Types` | `Type \| Kind \| Shape \| Summary` (gained `Summary` as its last column) |
| `### Guards` | `API \| Kind \| Summary` (already so; unchanged) |
| `### Helpers` | `API \| Kind \| Summary` (already so; unchanged) |
| `#### QueueInterface` | `Method \| Returns \| Summary` (was `Behavior`) |
| `#### QueueStoreInterface` | `Method \| Returns \| Summary` (was `Behavior`) |

`### Entities` became `### Classes`: its every row's `Kind` is `class` (`Queue`, `QueueError`,
`MemoryQueueStore`, `DatabaseQueueStore`). No class is documented under its own H3 in this guide, so
that table is the whole class population and no row was added.

The `Shape` idiom (Ruling 12, Ruling 15's wording, Ruling 19's tuple-map alias) landed with its
convention sentence above the `### Types` table, in the fleet's one wording: "A `Shape` cell holds an
interface's data members as bare names in braces, `?` marking an optional member and `plus`
introducing its call-signature members, and a type alias's own type literal with a union's arms
escaped as `\|`." Every row that spelled a member's type, a prose description, or a call signature
with its return type was rewritten to it. No table other than `### Types` carries `Shape`: the
`### Guards` and `### Helpers` rows are functions and the `### Factories` and `### Classes` rows are
functions and classes, so Ruling 15's interface-or-type-alias trigger reaches only `### Types`, and
no constants table exists in this guide.

`Shape` cells written by hand, each read against its declaration in `src/core/types.ts`:

```text
QueueContext        { id, signal }
QueueHandler        `(input: TInput, context: QueueContext) => Promise<TResult> \| TResult`
QueueEntryOptions   { id?, retries?, timeout?, signal? }
QueueOptions        { on?, error?, handler, concurrency?, retries?, timeout?, store? }
QueueInterface      { emitter, count, active, paused, stopped } plus enqueue, restore, start, stop, pause, resume, abort, clear, destroy
QueueEventMap       { enqueue, start, retry, success, failure, abort, drain }        (Ruling 19)
QueueCode           'invalid' \| 'duplicate' \| … \| 'cleanup'
QueueOption         'id' \| 'concurrency' \| 'retries' \| 'timeout' \| 'signal'
QueueErrorContext   { id?, option?, operation?, value? }
QueueErrorOptions   { code, context?, cause? }
StoredEntry         { id, input, attempts }
QueueStoreInterface {} plus save, remove, load, clear
```

Non-`Summary` cell comparison against `git show HEAD:guides/queue.md`, run by
`tmp/d7n-queue-converge/cells.mjs` (splits on a pipe not preceded by a backslash, keys each row by
its table index and first cell, and excludes the compared column under either the `Behavior` or the
`Summary` header):

```text
rows before: 41, rows after: 41
rows missing after: 0
non-Summary cells changed: 12
```

Every one of the twelve is a `### Types` `Shape` cell — the header this brief names. No `Kind`,
`Type`, `API`, `Method`, or `Returns` cell moved, and no row was cut.

## Criterion 3 — doc blocks rewritten, then propagated

Ruling 7's direction: each block whose guide cell carried information the block lacked was rewritten
verb-first first, then `npm run docs -- --to guide` wrote the cells and
`npx oxfmt --config .oxfmtrc.json --write guides/queue.md` restored the alignment.

`npm run docs -- --to guide`: `rows read: 1, disagreements found: 29, written: 28, reported: 1`. The
one reported row is the titled `Create a queue` example, which the seed leaves to `--to source`
("the guide fence owns an example"). The pre-write reading was
`rows read: 1, disagreements found: 29`, down from the brief's 41 because the Types rows and the
pitch row converged first.

Blocks rewritten by hand, and what the guide cell carried that the block lacked:

| Declaration | Carried in |
| --- | --- |
| `createDatabaseQueueStore` | the memory, JSON, and SQLite driver list |
| `createMemoryQueueStore` | the zero-plumbing preference, restated as the contract it returns; `DEFAULT` lowercased |
| `Queue` | the wake-park loop, retries, timeout, and abort |
| `QueueError` | the lowercase machine `code`, the structured context, and the cause |
| `MemoryQueueStore` | the process-lifetime `Map` |
| `DatabaseQueueStore` | the opt-in durable role; `IS` lowercased |
| `isQueueError` | totality over a hostile value |
| `isQueueConcurrency`, `isQueueRetries`, `isQueueTimeout` | the value range each guard accepts |
| `isQueueSignal` | the native brand rather than the shape |
| `isStoredEntry` | the record's members; `Checks` became `Determines`, the term its siblings use |
| `readOption` | the exactly-once read and the contained throwing getter |
| `validateOption` | the coded invalid failure, its option, and the refused value |
| `QueueHandler` | `may reject` recast as the retry condition |
| `QueueInterface` | a distinct paragraph, because `Queue`'s row would otherwise carry the same sentence |
| `QueueEventMap` | `ALONGSIDE` lowercased to `beside` |
| `QueueStoreInterface` | the small keyed surface a restart resumes from; `Queue` recast as `a queue` |
| `QueueInterface`'s `enqueue`, `restore`, `start`, `stop`, `pause`, `resume`, `abort`, `clear`, `destroy` | every fact the `Behavior` cell carried, rewritten third-person |
| `QueueStoreInterface`'s `save`, `remove`, `load`, `clear` | the interface carried no member blocks at all; each gained one, so the store's Methods rows compare against a real paragraph instead of `absent` on both sides |

`createQueue`'s description already carried everything its cell did (`optional` is stated by the
`@param` defaults), so it was left as written.

Prose truth, read against the code before propagation: the `QueueInterface.clear` paragraph first
read "Rejects pending work"; `Queue.clear` at `src/core/Queue.ts:330` drains admitting entries as
well as pending ones, so it was corrected to "Rejects non-active work" before the write.
`QueueStoreInterface.remove` doing nothing for an absent id was read against
`MemoryQueueStore.remove` (`Map.delete`) and `DatabaseQueueStore.remove` (the table's own `remove`).

Remark pruned because the description now repeats it: `readOption`'s "The property is read exactly
once, inside a boundary that contains a throwing getter." The remark keeps its second sentence.

Facts a cell carried that no compared block can hold, landed in the guide's prose beside its table:
none. The three prose paragraphs that only restated what the cells now carry were pruned instead —
the `### Helpers` intro (keeps the call sites `enqueue` and the constructor), the
`#### QueueInterface` intro (keeps the lifecycle-vocabulary pointer), and the
`#### QueueStoreInterface` intro (keeps the dual-store convention, the no-cast narrowing, and the
driver swap). The readonly-members sentence after the `### Helpers` fence was recast to the fleet's
form: `QueueInterface`'s readonly data members stay in its `Shape` cell rather than under
`## Methods`.

Voice sweep over the prose this unit owns: every all-caps emphasis in `guides/queue.md` was
corrected — `PARKS`, `RACED`, `CLEARS`, `AFTER` (twice), `CUT`, `SAME`, `NEVER`, `OWN`, `NOT`, `AND`,
and the two `DEFAULT` cells the write replaced — and `DOC ↔ SOURCE` was kept, because it labels the
two artifacts a bijection relates and every converged sibling keeps it. In `src/core` the same sweep
reached `PARK`, `ALONGSIDE`, `AFTER`, `ONLY`, `OUTSTANDING`, `IS`, and `NOT` inside doc blocks. The
temporal `once` at the per-attempt-timeout paragraph became `after`. No count was introduced and none
was found: every `both` in this guide names its members in the same sentence, and `200 entries` is a
fixture size. The `// runs on the BROAD ContractShape` comment at `src/core/factories.ts:90` is an
implementation comment rather than a doc block, so it is outside this unit's scope and untouched.

## Criterion 4 — the titled pair

The pair is `createQueue`'s `@example Create a queue` block against the `### Create a queue` fence in
`## Patterns`. `createQueue` is the first `create*` the facts block lists, so Ruling 3 fixes the
block; the fence chosen is the one under the already-descriptive `### Create a queue` heading, so
Ruling 9 did not fire, no heading was added, no fence moved, and the structural `## Surface` heading
is untouched. That was the ancillary choice between two eligible fences: the `## Surface` fence at
the top of the guide also demonstrates `createQueue`, and taking it would have required a new
`###` heading between the introducing sentence and the fence it introduces, and a heading whose text
`^#\+ Create a queue` also matches the existing `### Create a queue`.

Heading uniqueness, heading-scoped: `grep -n '^#\+ Create a queue' guides/queue.md` returns
`245:### Create a queue` alone.

Fence bodies read before titling: the `### Create a queue` fence carries no three-backtick run and
no `*/`; nor does the block's existing `@example`.

Ruling 14 applied. The fence demonstrated the ordered default and the block demonstrated the
option-bearing form, so the fence was extended with the block's demonstration and nothing was
deleted from either side. The converged body is:

```ts
import { createQueue } from '@orkestrel/queue'

// Ordered (concurrency defaults to 1): each entry runs to completion before the next.
const queue = createQueue<Job, Output>({ handler: (job) => run(job) })

const output = await queue.enqueue(job)

// Bounded, retried, and time-boxed: four in flight, two extra attempts, 5s per attempt.
const fetches = createQueue<string, number>({
	handler: async (url, { signal }) => (await fetch(url, { signal })).status,
	concurrency: 4,
	retries: 2,
	timeout: 5_000,
})

const status = await fetches.enqueue('https://example.com')
```

Runs, in the brief's order. The block was titled first, then `--to guide` ran, then `--to source` ran
last with the summaries already at zero:

```text
npm run docs -- --to guide    rows read: 1, disagreements found: 29, written: 28, reported: 1
npm run docs -- --to source   rows read: 1, disagreements found: 1,  written: 1,  reported: 0
```

`written: 1` is the titled example alone. No `{@link}` tag was flattened and no remark was repeated
inside a description; `grep -rn '@example \S' src/core` returns `src/core/factories.ts:31` alone, so
every other block stays untitled.

## Criterion 5 — the tagline, the pitch, and the opening prose

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold:

```text
> A concurrent, cooperative FIFO job queue: a bounded-concurrency engine that runs each
> enqueued input through a handler with retries and a per-attempt timeout or abort, and
> hands back one promise per `enqueue` that settles with that job's result.
```

`README.md` carries that blockquote under its H1 with the same line breaks. The guide's opening prose
after the blockquote carries the displaced sentences, in four paragraphs and without restating the
tagline's clauses: the wake-park loop and the zero-CPU idle; the L1 cancellation and the raced
handler; the opt-in outstanding-only durability with `DatabaseQueueStore` and `MemoryQueueStore`; the
observable emitter as a pure side-channel; and the closing paragraph on what the queue does not ship,
ending `Source: [`src/core`](../src/core).` — the link that could not stay inside a tagline.

The README's opening paragraph keeps the onboarding it alone carries and restates no tagline clause:

```text
Create a queue with the `createQueue` function, hand it the handler that does the work, and
await the promise each input hands back. Pass a `store` where the unfinished work must survive
a restart, and subscribe to the `emitter` where a logger, a metric, or a trace needs the
lifecycle moments. Environment-agnostic — no I/O, no browser or server assumptions. Part of
the `@orkestrel` line.
```

The rest of the README (install, requirements, usage fence, guide link, package, license) is
unchanged. `npm run test:guides` was run after the README edit and read `Tests 29 passed (29)`.

## Criterion 6 — the seed

```text
npm run docs                   exit 0: rows read: 1, disagreements found: 0
npm run docs -- --to guide     exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
npm run docs -- --to source    exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates

```text
npx oxfmt --config .oxfmtrc.json --check README.md guides/queue.md src/core tests/guides.test.ts
  All matched files use the correct format.   exit 0 (12 files)
npx oxlint --config .oxlintrc.json --deny-warnings src/core tests/guides.test.ts   exit 0, no diagnostics
npm run check                                                                     exit 0
npm run test:guides    Test Files 1 passed (1)   Tests 29 passed (29)             exit 0
npm run test:policy    Test Files 1 passed (1)   Tests 90 passed | 1 skipped (91) exit 0
```

Observation, not a criterion: `npm run test:src:core` read `Test Files 6 passed (6)`,
`Tests 151 passed (151)`, `Duration 1.28s`, exit 0, taken under sibling-unit load.

## Criterion 8 — status

```text
 M README.md
 M guides/queue.md
 M src/core/Queue.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/stores/DatabaseQueueStore.ts
 M src/core/stores/MemoryQueueStore.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. `package.json` and `package-lock.json` untouched; `@orkestrel/guide` stays at the
`--no-save` head start and `package.json` keeps `^0.0.17`.

```text
 README.md                             |  24 ++--
 guides/queue.md                       | 206 ++++++++++++++++++----------------
 src/core/Queue.ts                     |   3 +-
 src/core/errors.ts                    |   6 +-
 src/core/factories.ts                 |  22 ++--
 src/core/helpers.ts                   |   9 +-
 src/core/stores/DatabaseQueueStore.ts |   8 +-
 src/core/stores/MemoryQueueStore.ts   |   3 +-
 src/core/types.ts                     |  46 ++++----
 src/core/validators.ts                |  13 ++-
 tests/guides.test.ts                  |  82 +++++++++++++-
 11 files changed, 259 insertions(+), 163 deletions(-)
```

## The drop-in's canonical text

`tests/guides.test.ts` from `const root = new URL('../', import.meta.url)` through the close of the
manifest loop is byte-identical to `/home/user/fleet/abort/tests/guides.test.ts:47-258`:

```text
diff <(sed -n '47,258p' abort/tests/guides.test.ts) <(the same region of queue/tests/guides.test.ts)
  exit 0, no output
```

The constants block matches the pilot's modulo the package name (`diff` of the two blocks with
`abort`/`queue` normalized: exit 0, no output), so `GUIDE_SPEC`, the `INTERNAL` doc block reading
"the assertion that follows it fails when a name here stops being stranded", and `ROOT_FILES` holding
`AGENTS.md` and `README.md` are the canonical text. The header's first line reads "The constants that
follow are this package's own" — Ruling 13's amendment, which the pilot has not yet taken. The
equality case sits directly after the methods loop and before the examples case, and the examples
case is named `documents an example for every Surface function`. The pin is the guard-and-continue
loop with no local type predicate and the both-sides failure line. The README case guards each side
with `not.toBeUndefined()` before `toBe`. This package's own executed half, `describe('guide fences')`,
follows the loop unchanged.

## Reader and seed defects met

None. `--to guide` located every cell after the header change, `writeGuide` refused no row, the
round trip disturbed no non-`Summary` cell, `--to source` wrote the titled body alone at
`written: 1`, and both write directions are idempotent at `written: 0`. No residual disagreement
survived a doc-block rewrite under the P16 comparator.

## Ancillary decisions recorded

- **The titled fence.** `### Create a queue` in `## Patterns` over the `## Surface` fence, for the
  reasons under criterion 4. The `## Surface` fence keeps its demonstration and is untouched.
- **The `| Event map | Events |` table under `## Observing` stays.** It sits under neither
  `## Surface` nor `## Methods`, no reader locates a column in it, and it carries each event's
  payload arity (`retry(id, attempt)`, `success(id, result)`), which Ruling 19 keeps out of the
  `Shape` cell and no compared block can hold. It is not prose that only lists the members, so
  Ruling 15's deletion clause does not reach it.
- **`### Guards` and `### Helpers` gain no `Shape` column.** Ruling 15's trigger is a table carrying
  an interface or type-alias row; every row in those tables is a function.
- **`DOC ↔ SOURCE` kept** in the `## Contract` list, as a label for the two artifacts rather than an
  emphasis, matching converged siblings.

## Deviation state

None. No cell was unlocatable, no titled body exceeded its block, no test outside
`tests/guides.test.ts` went red, no vendored file needed an edit, and no reader returned a shape this
brief does not describe.

---

Orchestrator's annotation (2026-09-08, from the audit verdict): this report states counts in prose; the tree is authoritative and every cited line matched it on the audit's re-read. The unit's instruments are retained under `instruments/d7/units/queue/`.
