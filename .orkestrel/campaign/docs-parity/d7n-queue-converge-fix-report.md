# Report — `d7n-queue-converge-fix`

Wall clock: 2026-09-08T01:58:41Z to 2026-09-08T02:03:12Z. Baseline `bb89ae0`, checkout
`/home/user/fleet/queue`, sole writer. No commit, no install, no discard-class git command.
Instruments under `tmp/d7n-queue-converge-fix/`.

## Item 1 — the Guards table (Q1, Ruling 20)

`guides/queue.md` `### Guards` heads `Shape` between `Kind` and `Summary`, under the guard sentence
placed between the heading and the table. Each cell was read from its predicate's return type:
`isQueueError` at `src/core/errors.ts:48` (`value is QueueError`), `isQueueConcurrency` at
`src/core/validators.ts:17`, `isQueueRetries` at `:33`, `isQueueTimeout` at `:51` (each
`value is number`), `isQueueSignal` at `:68` (`value is AbortSignal`), `isStoredEntry` at `:98`
(`value is StoredEntry<unknown>`).

```diff
 ### Guards
 
-| API                  | Kind     | Summary   |
+In a guard table a `Shape` cell holds the type the guard narrows to.
+
+| API                  | Kind     | Shape                  | Summary |
+| `isQueueError`       | function | `QueueError`           | Determines whether an unknown value is a `QueueError`, staying total for a hostile value. |
+| `isQueueConcurrency` | function | `number`               | Determines whether a value is a valid queue concurrency — a positive safe integer. |
+| `isQueueRetries`     | function | `number`               | Determines whether a value is a valid queue retry count — a nonnegative safe integer. |
+| `isQueueTimeout`     | function | `number`               | Determines whether a value is a valid queue timeout — an integer count of milliseconds inside the native timer range. |
+| `isQueueSignal`      | function | `AbortSignal`          | Determines whether a value is a native abort signal usable by the queue, testing the native brand rather than the shape. |
+| `isStoredEntry`      | function | `StoredEntry<unknown>` | Determines whether a value is a valid stored queue entry — a record holding a string `id`, an `input`, and a nonnegative safe-integer `attempts`. |
```

No `Summary` cell moved; `npm run docs` stayed at `disagreements found: 0` across the change.

## Item 2 — `QueueErrorContext`'s clause (Q2, Ruling 7)

`src/core/types.ts` gains the `@remarks` block. The description paragraph and its `Summary` cell are
untouched, so the compared form did not move.

```diff
  * Represents the structured context carried by a {@link QueueError}.
  *
+ * @remarks
+ * `option` names the {@link QueueOption} the failure concerns, and `operation` names the store
+ * call that failed.
+ *
  * @example
```

## Item 3 — one convention, one home (Q3)

`guides/queue.md` takes the pilot's sentence, and the `## Methods` preamble drops the parenthetical
that restated it.

```diff
-`QueueInterface`'s readonly data members stay here, in its `Shape` cell, rather than under [Methods](#methods), and `emitter` is the typed push observation surface described under [Observing](#observing).
+The `emitter`, `count`, `active`, `paused`, and `stopped` members of `QueueInterface` are `readonly` data members (Surface rows, earlier) — its call-signature methods are documented under [Methods](#methods).
 
 ## Methods
 
-The public methods of `QueueInterface` and `QueueStoreInterface` — every call-signature member listed (their `readonly` data members stay Surface rows). Each class …
+The public methods of `QueueInterface` and `QueueStoreInterface` — every call-signature member listed. Each class …
```

The sentence keeps its position as the last paragraph of `## Surface`, which is the pilot's position
relative to `## Methods`. The dropped `emitter` clause pointed at `## Observing`, which the guide's
opening paragraph, `QueueEventMap`'s `Summary` cell, and the `## Observing` section itself already
carry.

## Item 4 — the README's onboarding (Q4, Ruling 6)

```diff
 Create a queue with the `createQueue` function, hand it the handler that does the work, and
-await the promise each input hands back. Pass a `store` where the unfinished work must survive
-a restart, and subscribe to the `emitter` where a logger, a metric, or a trace needs the
-lifecycle moments. Environment-agnostic — no I/O, no browser or server assumptions. Part of
-the `@orkestrel` line.
+await each input's result. Pass a `store` where the unfinished work must survive a restart,
+and subscribe to the `emitter` where a logger, a metric, or a trace needs the lifecycle
+moments. Environment-agnostic — no I/O, no browser or server assumptions. Part of the
+`@orkestrel` line.
```

The blockquote pitch is unchanged and still equals the guide's tagline (`test:guides` case
`opens the README with the guide tagline`, passing).

## Item 5 — the header and the closing items (Q5, Q6, Rulings 13 and 21)

The drop-in header:

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
 // this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
```

The region from `const root = ` through the manifest loop's closing brace was already the pilot's
bytes on this tip and was not edited:

```text
diff <(sed -n '47,258p' /home/user/fleet/abort/tests/guides.test.ts) \
     <(sed -n '57,268p' tests/guides.test.ts)
  no output, exit 0
```

Lead-in sentences added, each one complete, each between its heading (or its table) and the fence,
and each outside the fence:

| Fence, before the edit | Sentence added |
| --- | --- |
| after the `### Guards` table | Call each guard on a sample value to see what it accepts and what it refuses: |
| after the `### Helpers` table | Read one entry option, then validate what you read — the pair `enqueue` runs for every option a caller supplies: |
| under `### Create a queue` (the titled fence) | Build a queue over a handler and await each entry's result — the ordered default first, then a bounded, retried, time-boxed one: |
| under `### Bounded concurrency` | Set `concurrency` to cap how many entries run at once; a later `enqueue` call waits for a slot to free up: |
| under `### Retries` | Set `retries` for the queue default, and override it on the one entry that must not be re-run: |
| under `### Per-attempt timeout` | Set `timeout` to bound each attempt; a deadline that fires counts as a failed attempt: |
| under `### Abort` | Call `abort` to reject pending work and fire every in-flight handler's `signal`: |
| under `### Lifecycle` | Call `pause`, `resume`, `clear`, `stop`, `start`, and `destroy` to suspend, drain, and wind down a running queue: |

The closing brief lists no fence beyond these. The titled fence's body is unchanged, so the
`@example Create a queue` pair still compares equal (`--to source` at `written: 0`).

## Item 6 — `BROAD` (Q7)

```diff
 // The preceding public signature types the store by `Infer<TInput>`. The implementation
-// runs on the BROAD `ContractShape`, so the `entries` row is built and the table read
+// runs on the broad `ContractShape`, so the `entries` row is built and the table read
```

## Item 7 — propagation

```text
npx oxfmt --config .oxfmtrc.json --write guides/queue.md README.md tests/guides.test.ts src/core
  Finished in 921ms on 12 files using 4 threads.   exit 0
npm run docs                    rows read: 1, disagreements found: 0                          exit 0
npm run docs -- --to guide      rows read: 1, disagreements found: 0, written: 0, reported: 0  exit 0
npm run docs -- --to source     rows read: 1, disagreements found: 0, written: 0, reported: 0  exit 0
```

## Criterion 1 — status

```text
git status --short
 M README.md
 M guides/queue.md
 M src/core/factories.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only. `guides/README.md`, every vendored file, `package.json`,
`package-lock.json`, `tests/src/**`, and `tests/setup*.ts` are untouched. `src/core/Queue.ts`,
`src/core/errors.ts`, `src/core/helpers.ts`, `src/core/validators.ts`, and the store files needed no
edit and carry none. Instruments live under the git-ignored `tmp/d7n-queue-converge-fix/`.

```text
 README.md             |  8 ++++----
 guides/queue.md       | 38 ++++++++++++++++++++++++++++----------
 src/core/factories.ts |  2 +-
 src/core/types.ts     |  4 ++++
 tests/guides.test.ts  |  2 +-
 5 files changed, 38 insertions(+), 16 deletions(-)
```

## Criterion 2 — format, lint, typecheck

```text
npx oxfmt --config .oxfmtrc.json --check guides/queue.md README.md tests/guides.test.ts src/core
  All matched files use the correct format.
  Finished in 448ms on 12 files using 4 threads.          exit 0
npx oxlint --config .oxlintrc.json --deny-warnings tests/guides.test.ts src/core
  no diagnostics                                          exit 0
npm run check
  > tsc --noEmit -p configs/src/tsconfig.core.json        exit 0
```

## Criterion 3 — the seed at zero

Quoted under item 7. All three readings taken after the last edit.

## Criterion 4 — the greps

Each command and its output, taken after the last edit (`tmp/d7n-queue-converge-fix/final.log.txt`;
the same commands on the baseline are in `before.log.txt`).

| Command | Before | After |
| --- | --- | --- |
| `grep -c 'In a guard table' guides/queue.md` | `0` | `1` |
| `grep -n '^\| API *\| Kind *\| Shape *\| Summary' guides/queue.md` | no match, exit 1 | `92:\| API \| Kind \| Shape \| Summary \|`, exit 0 |
| `grep -c 'QueueOption' src/core/types.ts` | `5` | `6` |
| `grep -c 'stay Surface rows' guides/queue.md` | `1` | `0` |
| `grep -c 'hands back' README.md` | `2` | `1` |
| `diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)` | `3c3`, exit 1 | no output, exit 0 |
| `grep -c 'BROAD' src/core/factories.ts` | `1` | `0` |
| the `awk` fence scan over `guides/queue.md` | `245 -> 247`, `266 -> 268`, `278 -> 280`, `288 -> 290`, `300 -> 302`, `312 -> 314` | no output |

The one remaining `hands back` in `README.md` is the tagline's, at line 5.

## Criterion 5 — the suites

```text
PATH=/opt/npm11/bin:$PATH npm run test:guides
  Test Files  1 passed (1)
       Tests  29 passed (29)
    Duration  579ms                                        exit 0
npm run test:policy
  Test Files  1 passed (1)
       Tests  90 passed | 1 skipped (91)
    Duration  726ms                                        exit 0
```

Observation, not a criterion:

```text
npm run test:src:core
  Test Files  6 passed (6)
       Tests  151 passed (151)
    Duration  1.28s                                        exit 0
```

## Ancillary decisions recorded

- **The lead-in sentences are mine**, written to name what each fence demonstrates rather than to
  restate the heading. Each ends with a colon, the pilot's form at `/home/user/fleet/abort/guides/abort.md:101`.
- **The titled fence's lead-in avoids the tagline's verb.** The first draft read "await the promise
  each `enqueue` hands back", which is the tagline's clause and the same echo item 4 removes from the
  README; it was rewritten to "await each entry's result" before the gates.
- **The convention sentence stays where it was**, as the last paragraph of `## Surface`. The pilot
  places it directly after its Types table because nothing else follows; in this guide `### Guards`
  and `### Helpers` sit between, so the analogous position is the last paragraph before `## Methods`.
- **The dropped `emitter` clause is not re-homed.** The guide's opening paragraph, `QueueEventMap`'s
  `Summary` cell, and `## Observing` each carry it already.
- **`### Helpers` and the `## Methods` tables gain no `Shape` column.** Ruling 15's trigger is an
  interface or type-alias row, and Ruling 20's guard-table trigger is a table whose every row is a
  guard; the `### Helpers` rows are `readOption` and `validateOption`, which narrow nothing.
- **`src/core/factories.ts` keeps the backticks around `ContractShape`.** Item 6 names the lowercase
  word, and the code token's span is the surrounding comment's own convention.

## Deviation state

None. No gate outside the owned files went red, no cell fell outside Ruling 12, and no vendored or
shared file needed an edit. No shared-file patch is owed.
