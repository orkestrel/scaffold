# Report — `d7n-pool-converge`

Wall clock: 2026-09-07T16:19:24Z to 2026-09-07T16:27:40Z, in `/home/user/fleet/pool` from `11509e9`.

## Touched files

| File | Change |
| --- | --- |
| `guides/pool.md` | The tagline cut to one noun phrase, the displaced sentence into new opening prose, `### Create a pool` over the demonstrating fence, `### Entities` → `### Classes`, both Methods tables headed `Summary`, every `Summary` cell written from its doc block, `## Tests` naming the equality gate, three voice sites |
| `README.md` | The guide's blockquote under the H1 and a shortened onboarding paragraph |
| `src/core/types.ts` | Seven description paragraphs rewritten, including `PoolInterface.acquire` and `PoolToken.release` |
| `src/core/errors.ts` | The `PoolError` description rewritten |
| `src/core/factories.ts` | The `createPool` description rewritten; its `@example` titled `Create a pool` |
| `src/core/validators.ts` | The `isPoolMax` description rewritten |
| `tests/guides.test.ts` | The equality case, the title pin, the README case, `GUIDE_SPEC`, `README.md` in `ROOT_FILES`, `findDrift` imported, and three Ruling 13 text alignments |

```text
 README.md              |  21 +++++-----
 guides/pool.md         |  84 +++++++++++++++++++++-----------------
 src/core/errors.ts     |   4 +-
 src/core/factories.ts  |   5 ++-
 src/core/types.ts      |  41 ++++++++++++++-----
 src/core/validators.ts |   2 +-
 tests/guides.test.ts   | 107 ++++++++++++++++++++++++++++++++++++++++---------
 7 files changed, 183 insertions(+), 81 deletions(-)
```

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after the three cases landed and before any convergence:
`Tests  3 failed | 25 passed (28)`.

`pairs at least one example title across the guide and the source` (`tests/guides.test.ts:94`):

```text
AssertionError: expected [ Array(1) ] to deeply equal []
+ [
+   "guides/pool.md pairs: guide [\"Surface\",\"Capacity and FIFO\",\"Capacity and FIFO\",\"Observing\",\"Validate public boundaries\",\"Always release and explicitly tear down\"] source []",
+ ]
```

`opens the README with the guide tagline` (`tests/guides.test.ts:108`):

```text
AssertionError: expected undefined not to be undefined
    108|  expect(pitch).not.toBeUndefined()
```

`Pool > keeps every compared summary and example equal to its source` (`tests/guides.test.ts:189`), first lines of its 17-line worklist:

```text
AssertionError: expected [ …(17) ] to deeply equal []
+ [
+   "guides/pool.md function createPool: guide \"Construct a distinct `PoolInterface` from resource lifecycle hooks.\" source \"Creates a resource pool with optional bounded capacity, unique ownership, and FIFO settlement.\"",
+   "guides/pool.md class Pool: guide \"The unique-record FIFO lifecycle engine.\" source \"Represents a capacity-aware resource pool whose opaque ownership records preserve FIFO settlement, cancellation, exact lease release, and deterministic teardown under concurrent hooks.\"",
+   "guides/pool.md class PoolError: guide \"A coded failure retaining a hostile-safe cause and structured context.\" source \"Represents a stable, machine-readable pool failure with the original cause and structured context.\"",
```

The equality case reported 17 rows where the brief's worklist listed 18: the pitch row is the seed's alone and is not part of `findDrift`, so the README case carries it in the suite.

## Criterion 2 — headers and the class rows

Every `## Surface` and `## Methods` table now heads `Summary` beside `Kind` or `Returns` alone:

```text
39: | API          | Kind     | Summary |     (### Factories)
45: | API         | Kind  | Summary |         (### Classes)
52: | API            | Kind     | Summary |  (### Guards)
60: | API                | Kind      | Summary |  (### Types)
83: | Method    | Returns                 | Summary |  (#### `PoolInterface`)
93: | Method    | Returns | Summary |                (#### `PoolToken`)
```

Renamed: the `#### PoolInterface` and `#### PoolToken` tables' third header, `Behavior` → `Summary`. The `### Errors` table (`Code | Owner`) and the `## Observing` table (`Event | Emission point`) sit under `## Contract` and `## Observing`, outside the gate's population, and stay.

`### Entities` became `### Classes`: every row's `Kind` is `class` (`Pool`, `PoolError`). Neither class is documented under its own H3 in this guide, so no `### Classes` row was added and no H3 section lost one.

The first column's header stays `API` and `Method` (ruling 10). No table carries a `Shape` column, so no `Shape` idiom sentence was owed and no literal stayed in a `Shape` cell.

## Criterion 3 — the doc blocks, then `--to guide`

Rewritten by hand, verb-first, because the guide cell carried information the block lacked:

| Declaration | What the cell carried that the block did not | New description paragraph |
| --- | --- | --- |
| `createPool` | The returned contract, and that each call is distinct | Creates a distinct `{@link PoolInterface}` from resource lifecycle hooks, with optional bounded capacity, unique ownership, and FIFO settlement. |
| `PoolError` | The cause is retained hostile-safe | Represents a stable, machine-readable pool failure that retains the original thrown value as its cause without unsafe coercion, alongside structured context. |
| `isPoolMax` | Positive safe integers, not "finite" | Tests whether a value is a positive safe integer, the only valid explicit pool maximum. |
| `PoolCode` | The four code literals | Names the machine-readable failure codes produced by `{@link PoolError}`: `invalid`, `destroyed`, `create`, and `cleanup`. |
| `PoolContext` | Its two alternatives | Represents the structured context attached to a `{@link PoolError}`: the rejected input, or the distinct destroy-hook failures an aggregate cleanup collected. |
| `PoolErrorOptions` | Its members | Represents the construction options for `{@link PoolError}`: the stable code, an optional cause, and optional structured context. |
| `PoolEventMap` | The four event names | Represents the observable resource lifecycle events emitted by a `{@link PoolInterface}`: `create`, `acquire`, `release`, and `destroy`. |
| `PoolToken` | The readonly `value` and the idempotent `release` | Represents a unique lease over one pool-owned resource record, exposing that record as a readonly `value` and returning it through an idempotent `release`. |
| `PoolOptions` | The option axes | Represents the resource lifecycle options for `{@link Pool}` and `createPool`: creation, destruction, validation, capacity, and observation. |
| `PoolInterface` | The count and emitter properties | Represents a FIFO resource pool with optional bounded capacity and deterministic teardown, exposing its record counts and a typed lifecycle emitter. |
| `PoolInterface.acquire` | Validate-or-create between the queue and the settlement | Queues the caller in FIFO order, validates an idle record or creates one, and settles queued acquires in that same order. |
| `PoolToken.release` | A call after teardown took ownership is also a no-op | Gives this exact record back to the pool once; a repeat call, and a call after teardown took ownership, are no-ops. |

Adopted unchanged, because the block already carried everything its cell did: `Pool`, `isPoolError`, `isPoolSignal`, `PoolInterface.clear`, `PoolInterface.destroy`. The guide cell for `isPoolSignal` also named the acquire boundary; that is where the guard is used rather than what it decides, and `## Contract` § Cancellation already states it, so the block did not take it.

Ruling 7's split needed no `@remarks` move: `PoolOptions` is the only rewritten block carrying remarks, its remarks state each option key's contract rather than the axes the new description names, and no remark sentence became a repeat, so every sentence stands where it was.

Then:

```text
$ npm run docs -- --to guide
wrote guides/pool.md
rows read: 1, disagreements found: 17, written: 17, reported: 0
$ npx oxfmt --config .oxfmtrc.json --write guides/pool.md   → exit 0
$ npm run docs
rows read: 1, disagreements found: 0
```

No table row was rebuilt by hand. The baseline comparison over every table row (`git show HEAD:guides/pool.md` against the tree, splitting on a pipe not preceded by a backslash) reads:

```text
rows before 33 rows after 33
rows missing after: []
rows added after: []
non-final cells mismatched: 0
```

## Criterion 4 — the titled pair

The pair is `createPool`'s `@example` in `src/core/factories.ts` and the `## Surface` fence that demonstrates it, titled `Create a pool`.

`createPool` is the first and only `create*` export, so it is the primary factory. Its fence sat directly under the structural `## Surface` heading, so Ruling 9 applies: `### Create a pool` was added one level deeper, directly above the fence, and no fence moved. The heading occurs once, heading-scoped:

```text
$ grep -n '^#\+ Create a pool' guides/pool.md
17:### Create a pool
```

The fence body read before titling: the `createPool` import, the typed `createPool<Connection>` call with `create`, `destroy`, `validate`, and `max: 8`, and the `acquire` / `try` / `finally` / `release()` block. It carries no three-backtick run and no `*/`, so it qualified and no second fence was needed.

The title landed by hand on the block, and the run after the summaries agreed wrote nothing, because the block's body already equalled the fence's:

```text
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

Read directly from the readers in the checkout: the fence titles are `Create a pool`, `Capacity and FIFO` (twice), `Observing`, `Validate public boundaries`, `Always release and explicitly tear down`; the only titled source example is `createPool` / `Create a pool`; `collectTitles` pairs exactly `Create a pool`; and `fence.code === block.code` is `true` with both languages `ts`. Every other `@example` block (`Pool`, `PoolError`, `isPoolError`, `isPoolMax`, `isPoolSignal`) stays untitled. The instrument ran from inside the checkout as `tmp/pair.mjs` because `@orkestrel/guide` resolves only there, and was removed; `git status --short` after it lists the owned files alone.

## Criterion 5 — the tagline, the opening prose, and the pitch

The blockquote lost its second sentence and is now one noun phrase in plain text and code spans, with no link and no bold:

```text
> A typed resource pool with optional bounded capacity, unique ownership, FIFO settlement,
> validated reuse, caller-owned cancellation, explicit cleanup failures, and a stable
> event-driven teardown barrier.
```

The guide had no prose between the blockquote and `## Surface`; it gained a paragraph carrying the displaced sentence and nothing that restates a tagline clause:

> The pool has no warm floor, eviction timer, acquire timeout, or polling loop. Every wait parks on a promise or a signal listener and wakes when a settlement reaches it, and the lifecycle hooks are the caller's, so the engine itself performs no I/O.

`README.md` gained that blockquote verbatim, with the same line breaks, under its H1. Its opening paragraph was the old pitch, which restated every tagline clause and the displaced sentence; it now carries the onboarding the README alone owes:

> Create a pool with the `createPool` function, hand it the hooks that make, check, and tear down one resource, and `await pool.acquire()` wherever the work needs one. Release the token in a `finally` block, and `await pool.destroy()` when the process is done with the pool. Environment-agnostic — no I/O, no browser or server assumptions. Part of the `@orkestrel` line.

Sentences removed from the README: the FIFO-waiting and `max`-growth walkthrough, the validated-handoff sentence, the `AbortSignal` de-queue sentence, and the observable-plus-de-bloated sentence — each restates a tagline clause or the displaced sentence. Kept: the environment-agnostic line and the `@orkestrel` line. The `## Install`, `## Requirements`, `## Usage`, `## Guide`, `## Package`, and `## License` sections are unchanged.

`npm run test:guides` ran after the README edit and is green.

## Criterion 6 — the seed's readings

```text
$ npm run docs                     → rows read: 1, disagreements found: 0        exit 0
$ npm run docs -- --to guide       → rows read: 1, disagreements found: 0, written: 0, reported: 0   exit 0
$ npm run docs -- --to source      → rows read: 1, disagreements found: 0, written: 0, reported: 0   exit 0
```

## Criterion 7 — the gates

Each scoped to `guides/pool.md README.md tests/guides.test.ts src/core`:

```text
$ npx oxfmt --config .oxfmtrc.json --check <paths>     exit 0  (All matched files use the correct format, 9 files)
$ npx oxlint --config .oxlintrc.json --deny-warnings <paths>   exit 0  (no output)
$ npm run check                                        exit 0
$ npm run test:guides                                  exit 0  Tests  28 passed (28)
$ npm run test:policy                                  exit 0  Tests  90 passed | 1 skipped (91)
```

Observation, not a criterion: `npm run test:src:core` exit 0, `Test Files 3 passed (3)`, `Tests 47 passed (47)`.

## Criterion 8 — the tree

```text
$ git status --short
 M README.md
 M guides/pool.md
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. No untracked residue.

## The gate cases

- `keeps every compared summary and example equal to its source` sits inside the manifest loop's `describe(entry.concept)` block, directly after the methods loop and before the examples case, collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` with `absent` for an undefined side.
- `pairs at least one example title across the guide and the source` sits at file scope in the pilot's form — the guard-and-continue loop over `guide.fences()`, no local type predicate — and fails with `${GUIDE_SPEC} pairs: guide [...] source [...]`.
- `opens the README with the guide tagline` sits at file scope with `expect(pitch).not.toBeUndefined()` and `expect(tagline).not.toBeUndefined()` before `toBe`.
- `GUIDE_SPEC = 'guides/pool.md'` carries the spec path for the pin, the README case, and the flagship block. `ROOT_FILES` gained `README.md`. `findDrift` was imported beside the existing readers.

## Voice sites corrected in prose this unit owns

- `guides/pool.md` § Methods: "with the one operation that returns its record" → "with the operation that returns its record".
- `guides/pool.md` § Capacity and FIFO: "One reentrancy-safe pump may assign" → "The reentrancy-safe pump may assign".
- `guides/pool.md` § Release and cleanup: "a lease released after one snapshot is not part of it" → "a lease released after a snapshot is taken is not part of it".
- No all-caps emphasis and no substitution-table term was found in either owned Markdown file. Patterns swept case-insensitively over `guides/pool.md` and `README.md`: `\b(NOT|MUST|NEVER|ALWAYS)\b` filtered to all-caps matches, `\b(one|two|three|four|five|both|single|a pair|couple)\b`, and `\b(simply|easy|easier|just|currently|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|performant|robust|allows you to|and/or|should|please|dummy|sanity check|whitelist|blacklist)\b`. No rewritten sentence borrows a sibling export's name as its product noun.
- Kept as values rather than counts, and named here so the audit can rule them: "one cleanup promise per record" and "one microtask after" in `guides/pool.md`, and "Published as a single typed entry point per the `exports` field" in `README.md` — the last is the accepted pilot's own wording at `/home/user/fleet/abort/README.md`.

## Reader and seed defects met

None. `--to guide` located and wrote every one of the 17 disagreeing cells (`reported: 0`), `--to source` located the titled block, `replaceCell` disturbed no non-`Summary` cell, and no residual disagreement stood after the doc-block rewrites. No `{@link}` flattening, whitespace, or code-span boundary case under the P16 comparator needed a hand correction.

## Ancillary decisions

- `### Create a pool` is the new heading's wording, one level deeper than `## Surface`, taken from the demonstration the fence shows rather than from the factory's name alone.
- The `### Types` table gained no `Shape` column. The brief fixes `Summary` beside the allowed columns and the table already carried `API | Kind | Summary`; the type literals the guide cells used to enumerate (`PoolCode`'s codes, `PoolEventMap`'s events) moved into their description paragraphs instead, so no information left the guide and no row was rebuilt by hand.
- Three Ruling 13 alignments landed in `tests/guides.test.ts` beyond the gate cases, because that ruling makes the drop-in's text canonical outside the constants block and P.1 left them: the `INTERNAL` doc block now reads "the assertion that follows it", the file header now reads "The constants that follow", and the mapped `examples` binding moved out of the `it` callback to sit beside `documented` in the examples loop. The `EXECUTED half` comment took the pilot's wording adapted to this package's single flagship fence. Each removes an `above` or `below` reference the writing rules ban.
- `## Tests` names the equality gate's three checks descriptively, with no SQ/MQ/EQ/RQ identifier, and names the titled fence as `Create a pool`.
- The README's `## Requirements`, `## Usage`, `## Guide`, and `## Package` sections were left as they stand; the brief scopes the README to its blockquote and its opening paragraph.

## Deviation state

No deviation. Every fixed item in the brief landed, and every acceptance criterion is closed with the reading recorded here.
