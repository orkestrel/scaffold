# Unit conform-queue — report

Every row is `applied` or `noop`. The deviation contract did not fire. The gate chain is green in
order at `/home/user/fleet/queue`, and `git status --short` lists only files under Owned.

## Rows

| Row            | Disposition | Evidence                                                                                                                                                                                                     |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| queue-obj-1    | `applied`   | `README.md:28` now reads `- ESM and CommonJS builds from one entry point`. `package.json` and `configs/src/vite.core.config.ts` untouched.                                                                     |
| queue-obj-2    | `applied`   | `README.md:27` now reads `- Node.js >= 22.12.0`, matching `engines.node`. `engines` untouched.                                                                                                                 |
| queue-obj-3    | `applied`   | `describe('guide fences', …)` appended to `tests/guides.test.ts`. Red/green control in § Failing-first controls.                                                                                               |
| queue-obj-4    | `applied`   | The type-import-after-value-import violation is gone: `queue-obj-5` deleted `entryOf`, the only consumer of `StoredEntry` in that file, so the type import went with it. See § Composition note.               |
| queue-obj-5    | `applied`   | `createStubStore`, `createStoredEntry`, `createDriverQueueStore`, `QUEUE_EVENTS`, and `QueueEvent` moved to `tests/setup.ts`; `failingSaveStore`, `entryOf`, `memoryStore`, and all 22 inline store literals routed through them; `tests/setup.test.ts` rewritten. |
| queue-obj-6    | `applied`   | `tests/src/core/stores/DatabaseQueueStore.test.ts` header now names `src/core/stores/DatabaseQueueStore.ts`. `workers/` sweep is empty.                                                                        |
| queue-subj-1   | `applied`   | Every numbered citation deleted from `src/core/types.ts`, `src/core/factories.ts`, and `src/core/stores/DatabaseQueueStore.ts`; each surrounding sentence left intact per the refuter's operative form.        |
| queue-subj-2   | `applied`   | Numbered citations in `guides/queue.md` and `guides/README.md` replaced with named sections as plain prose, never as markdown links. See-also lines rewritten.                                                 |
| queue-subj-3   | `applied`   | `§16` → `.claude/rules/tests.md` § Test contract; `§13` → `.claude/rules/patterns.md` § Stateful emitters; `AGENTS §1` → `AGENTS.md` § Non-negotiable rules; the citation at `DatabaseQueueStore.test.ts:206` deleted. |
| queue-subj-4   | `applied`   | § Vendored guides rewritten without a count and covering every mirror; § Dependency reference lists each runtime dependency's local mirror beside its upstream link, and names the development-dependency mirrors. `## By concept` and `## By directory` left byte-identical. |
| queue-subj-5   | `applied`   | The Factories and Helpers rows recast as noun phrases; nothing else in the tables changed.                                                                                                                     |
| queue-subj-6   | `applied`   | `should`, `via`, positional `above`/`below`, and minimizing `just` removed at every confirmed site, including the refuter's addition at `guides/queue.md:181`.                                                 |
| queue-subj-7   | `applied`   | The three tallies removed. `both` kept where its sentence names its members.                                                                                                                                  |
| queue-subj-8   | `applied`   | The `"cooperative" is load-bearing` sentence and the `the cuts are the design` clause deleted; every fact in both paragraphs kept.                                                                             |
| queue-subj-9   | `applied`   | `src/core/Queue.ts:141` now reads `@throws {QueueError} Thrown synchronously when an option is inaccessible or invalid.`                                                                                       |
| queue-subj-10  | `applied`   | Every default restated as `Default: …` with its constraint as its own sentence, in `types.ts` (`id`, `concurrency`, `retries`, `timeout`) and `factories.ts`. The `retries` and `timeout` bullets of `QueueEntryOptions` untouched per the refuter's amendment. |
| queue-subj-11  | `applied`   | `via` → `through` (`types.ts:75`, `:209`); `e.g.` → `for example` (`:182`); `just` deleted (`:276`); `above` → `preceding` at `factories.ts:87`. The comparative `above` at `types.ts:221` left alone.        |
| queue-subj-12  | `applied`   | `databases` → `@orkestrel/database` in both doc blocks and in the two test comments the refuter added. Package-wide `databases` sweep is empty.                                                                |
| queue-subj-13  | `applied`   | **BREAKING.** `QueueExecution` → `QueueContext`; `QueueHandler`'s parameter → `context`. Guide row, shape, and every `context.` token updated; test import, all nine annotations, and the section comment updated. Consumer patches in § Breaking. |
| queue-subj-14  | `applied`   | `tests/guides.test.ts:2-3` now names the five constants; line 1 unchanged.                                                                                                                                     |
| fleet-F1       | `noop`      | `grep -rn "isBrowserVuePath" tests src vite.config.ts` returns nothing. The workspace has no browser environment: no `src/browser`, no `app/`, no `tests/setupBrowser.ts` (`find src tests guides -type f`). No edit made under this id. |
| fleet-F2       | `noop`      | No implementation class declares a public `readonly id: string` field. Classes read: `src/core/Queue.ts` (only `#` fields), `src/core/stores/DatabaseQueueStore.ts` (`readonly #table`), `src/core/stores/MemoryQueueStore.ts` (`readonly #contract`, `readonly #entries`), `src/core/errors.ts` (`QueueError`, whose public fields are `name`, `code`, `context`). |

### Composition note on queue-obj-4

The row's operative repair moves `import type { StoredEntry } from '@src/core'` to line 1. That
declaration no longer exists: queue-obj-5 deletes `entryOf`, which was `StoredEntry`'s only
consumer in the file, and `noUnusedLocals` refuses a retained unused type import. The violation the
row names — a type import following a value import — is therefore closed by deletion rather than by
a move, and the file's remaining imports are all value imports. The old form is gone, which is what
acceptance criterion 6 asks for.

## Files touched

| File                                                | Change                                                                                                            |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `/home/user/fleet/queue/README.md`                  | Corrected the runtime floor to `>= 22.12.0` and the build claim to ESM plus CommonJS.                             |
| `/home/user/fleet/queue/guides/README.md`           | Replaced the numbered citations, rewrote § Vendored guides without a count, and listed every mirror by dependency class. |
| `/home/user/fleet/queue/guides/queue.md`            | Removed the aphorisms, counts, numbered citations, and banned vocabulary; recast the Factories and Helpers rows as noun phrases; renamed `QueueExecution` and every `execution.` token. |
| `/home/user/fleet/queue/src/core/Queue.ts`          | Rewrote `enqueue`'s `@throws` tag into the fixed `Thrown when …` form.                                             |
| `/home/user/fleet/queue/src/core/factories.ts`      | Deleted the numbered citations, restated the option defaults in the fixed form, and replaced the positional `above`. |
| `/home/user/fleet/queue/src/core/stores/DatabaseQueueStore.ts` | Deleted the numbered citation and corrected the `databases` token to `@orkestrel/database`.             |
| `/home/user/fleet/queue/src/core/types.ts`          | Renamed `QueueExecution` to `QueueContext` and its handler parameter to `context`; deleted every numbered citation; restated every default in the fixed form; replaced `via`, `e.g.`, `just`, and `databases`. |
| `/home/user/fleet/queue/tests/guides.test.ts`       | Named the package-owned constants in the header, and appended the executable `guide fences` block over the guards, helpers, and persistence fences. |
| `/home/user/fleet/queue/tests/setup.test.ts`        | Replaced the export-emptiness case with behavioural proofs of the four new setup exports.                          |
| `/home/user/fleet/queue/tests/setup.ts`             | Added the shared `createStubStore`, `createStoredEntry`, `createDriverQueueStore`, `QUEUE_EVENTS`, `QueueEvent`, `StubStoreOptions`, and `StubStoreResult` declarations. |
| `/home/user/fleet/queue/tests/src/core/Queue.test.ts` | Deleted `failingSaveStore` and the local event table, routed all 22 inline store literals through `createStubStore`, renamed `QueueExecution`, and replaced the numbered citations. |
| `/home/user/fleet/queue/tests/src/core/stores/DatabaseQueueStore.test.ts` | Deleted `memoryStore` for `createDriverQueueStore`, corrected the module path in the header, and replaced the numbered citation. |
| `/home/user/fleet/queue/tests/src/core/stores/MemoryQueueStore.test.ts` | Deleted `entryOf` for `createStoredEntry`, ordered the imports, and replaced the numbered citation and the `databases` term. |

Diffstat: 13 files changed. The full diff is `/home/user/work/evidence/conform-queue.diff` (1809 lines)
and the status is `/home/user/work/evidence/conform-queue.status` (13 entries), both written by
`node /home/user/scaffold/tmp/work/evidence.mjs queue`.

## Failing-first controls

Both controls plant a wrong value, run the exact command, restore, and run the same command.

**queue-obj-5** — plant: `createStubStore`'s `save` records after delegating instead of before, and
`createStoredEntry`'s `attempts` defaults to `1`.

- Command: `npm --prefix /home/user/fleet/queue run test:setup`
- Red: `Tests 2 failed | 5 passed (7)` — `/home/user/work/evidence/queue-proofs/queue-obj-5-setup-red.txt`
- Green: `Tests 7 passed (7)` — `/home/user/work/evidence/queue-proofs/queue-obj-5-setup-green.txt`

**queue-obj-3** — plant: the transcribed `isQueueTimeout(Infinity)` expectation inverted to `true`,
and the persistence fence's upserted `attempts` expectation dropped to `0`.

- Command: `npm --prefix /home/user/fleet/queue run test:guides`
- Red: `Tests 2 failed | 24 passed (26)` — `/home/user/work/evidence/queue-proofs/queue-obj-3-guides-red.txt`
- Green: `Tests 26 passed (26)` — `/home/user/work/evidence/queue-proofs/queue-obj-3-guides-green.txt`

Every planted line was restored by editing it back; no `git` restore command was run.

## Sweeps

Each sweep ran over `src`, `tests`, `guides/queue.md`, `guides/README.md`, and `README.md` unless
its row names a narrower population.

| Pattern                                                                                                          | Population                                          | Result                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `QueueExecution`                                                                                                  | `src`, `tests`, `guides`, `README.md`               | empty                                                                                                   |
| `queueexecution\|entryOf\|memoryStore(\|failingSaveStore` (case-insensitive, covers the `-s`/`-ed`/`-ing` forms)   | `src`, `tests`, `guides`, `README.md`               | empty                                                                                                   |
| `§[0-9]`                                                                                                          | `src`, `tests`, `guides/queue.md`, `guides/README.md`, `README.md` | empty                                                                                    |
| `\bdatabases\b\|workers/` (case-insensitive)                                                                      | same                                                | empty                                                                                                   |
| `\bvia\b\|e\.g\.\|i\.e\.\|\bjust\b\|\bshould\b\|\bsimply\b` (case-insensitive)                                     | `src`, `guides/queue.md`, `guides/README.md`, `README.md` | empty                                                                                             |
| `\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b` (case-insensitive)                               | `guides/queue.md`, `guides/README.md`, `README.md`  | hits ruled permitted; see the following list                                                            |
| `\b[0-9]+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b` | `src`, `tests`, `guides`, `README.md` | empty                                             |

Number-word hits ruled permitted, by sense:

- `guides/queue.md:44`, `:45`, `:271`, and `README.md:37`, `:38` read the literal `4`, `2`, and `3`
  in their own fences — values the reader needs, not tallies.
- Every other hit is the singular article or pronoun `one` (`one entry's work`, `exactly one parked
  worker`, `one named property`, `one row`, `one engine`, `one queue instance`, `one-read`,
  `one-at-a-time`, `one-word members`, `drops one`), which answers no "how many" about a growable
  set. `README.md:28`'s `one entry point` is the same sense.
- `both` at `guides/queue.md:117`, `:155`, `:177`, and `:178` stays because each sentence names its
  members.

## Gates

Run in order at `/home/user/fleet/queue`, each exit code 0, each captured under
`/home/user/work/evidence/queue-proofs/`.

| Command                                          | Exit | Evidence                  |
| ------------------------------------------------ | ---- | ------------------------- |
| `npm --prefix /home/user/fleet/queue run format:check` | 0 | `gate-format-check.txt` |
| `npm --prefix /home/user/fleet/queue run lint:check`   | 0 | `gate-lint-check.txt`   |
| `npm --prefix /home/user/fleet/queue run check`        | 0 | `gate-check.txt`        |
| `npm --prefix /home/user/fleet/queue run build`        | 0 | `gate-build.txt`        |
| `npm --prefix /home/user/fleet/queue test`             | 0 | `gate-test.txt`         |
| `cd /home/user/fleet/queue && npx scaffold audit --offline` | 0 | `scaffold-audit.txt` — `0 of 34 planned paths drifted from the plan.` |

Per-project counts from `gate-test.txt`, which is the refuter's requested observation on
`tests/setup.ts` gaining `@src/core` imports as `setupFiles[0]` of every project:

| Project        | Result                    |
| -------------- | ------------------------- |
| `src:core`     | 151 passed (6 files)      |
| `policy`       | 111 passed (1 file)       |
| `config`       | 46 passed (1 file)        |
| `setup`        | 7 passed (1 file)         |
| `guides`       | 26 passed (1 file), up from 23 at the baseline |

Loading the source graph in every project cost nothing measurable: no project reddened, and the
`@orkestrel/database` root export the setup module reaches is host-independent
(`grep -c "node:" node_modules/@orkestrel/database/dist/src/core/index.js` returns `0`), so
`tests/setup.ts` still holds no `node:*`, DOM, or Vue dependency.

Baseline check, taken before any edit: `format:check`, `lint:check`, `check`, and `test` were all
green at `d0c08e3`. No gate was red at the baseline for a reason no row names.

## Breaking

`queue-subj-13` renames the published type `QueueExecution` to `QueueContext` and renames
`QueueHandler`'s second parameter to `context`. Nothing in this package re-exports the old name and
no compatibility alias was added, so every consumer breaks at its next re-pin. The consumers do not
see the rename until `@orkestrel/queue` publishes, so these patches belong to each consumer's own
unit in layer order.

## Shared-file patches

Each patch is the exact type-name substitution at the site the brief names. I made no edit in any of
these trees.

### @orkestrel/worker

`/home/user/fleet/worker/src/core/types.ts`

```diff
-import type { QueueEntryOptions, QueueExecution, QueueStoreInterface } from '@orkestrel/queue'
+import type { QueueContext, QueueEntryOptions, QueueStoreInterface } from '@orkestrel/queue'
```

```diff
-	execution: QueueExecution,
+	context: QueueContext,
```

`/home/user/fleet/worker/src/core/Worker.ts`

```diff
-import type { QueueEntryOptions, QueueExecution } from '@orkestrel/queue'
+import type { QueueContext, QueueEntryOptions } from '@orkestrel/queue'
```

```diff
-	async #handle(input: TInput, execution: QueueExecution): Promise<TResult> {
+	async #handle(input: TInput, context: QueueContext): Promise<TResult> {
```

`/home/user/fleet/worker/src/server/types.ts`

```diff
-import type { QueueExecution, QueueStoreInterface } from '@orkestrel/queue'
+import type { QueueContext, QueueStoreInterface } from '@orkestrel/queue'
```

```diff
-	readonly handler: (input: TInput, execution: QueueExecution) => Promise<TResult> | TResult
+	readonly handler: (input: TInput, context: QueueContext) => Promise<TResult> | TResult
```

`/home/user/fleet/worker/src/server/Dispatch.ts`

```diff
-import type { QueueExecution } from '@orkestrel/queue'
+import type { QueueContext } from '@orkestrel/queue'
```

```diff
-	readonly #execution: QueueExecution
+	readonly #context: QueueContext
```

```diff
-		execution: QueueExecution,
+		context: QueueContext,
```

`/home/user/fleet/worker/src/server/helpers.ts`

```diff
-import type { QueueExecution } from '@orkestrel/queue'
+import type { QueueContext } from '@orkestrel/queue'
```

```diff
-	execution: QueueExecution,
+	context: QueueContext,
```

`/home/user/fleet/worker/src/server/NodeWorker.ts`

```diff
-import type { QueueExecution, QueueStoreInterface } from '@orkestrel/queue'
+import type { QueueContext, QueueStoreInterface } from '@orkestrel/queue'
```

```diff
-	#handle(input: TInput, thread: NodeThread, execution: QueueExecution): Promise<TResult> {
+	#handle(input: TInput, thread: NodeThread, context: QueueContext): Promise<TResult> {
```

### @orkestrel/workflow

`/home/user/fleet/workflow/src/core/Runner.ts`

```diff
-import type { QueueExecution, QueueInterface } from '@orkestrel/queue'
+import type { QueueContext, QueueInterface } from '@orkestrel/queue'
```

```diff
-	#dispatch(unit: RunnerUnit<TInput>, execution: QueueExecution): Promise<TResult> | TResult {
+	#dispatch(unit: RunnerUnit<TInput>, context: QueueContext): Promise<TResult> | TResult {
```

### @orkestrel/agent

`/home/user/fleet/agent/src/core/helpers.ts`

```diff
-import type { QueueExecution } from '@orkestrel/queue'
+import type { QueueContext } from '@orkestrel/queue'
```

```diff
-	execution: QueueExecution,
+	context: QueueContext,
```

### What each consumer unit must carry beyond the substitution

- Rename each `execution` binding's use inside the body it belongs to, and the `#execution` field's
  reads in `Dispatch.ts`. I list the declaration lines only, because the brief names those sites; the
  bodies are in files I must not read into this patch as edits.
- `worker/src/core/types.ts:44` and `worker/src/server/types.ts:101` are published function-type
  parameter names, so each appears in that package's `.d.ts` and its guide. Update the guide's
  matching Surface row and shape in the same unit, or the parity suite reddens.
- Order the units by layer: `queue` publishes first, then `worker`, `workflow`, and `agent` re-pin
  against the version the registry serves and re-run their gates.

## Deviations

None. The deviation contract did not fire: no row's repair contradicted a rule, collided with an
existing name, required a file outside Owned, or required a consumer edit to keep this package's own
gates green. `QueueContext` was free — the package declared `QueueErrorContext` and no `QueueContext`
before the rename.

### Ancillary decisions I made and carried on from

- Renamed the local `execution` bindings in `tests/src/core/Queue.test.ts` to `context` alongside the
  type annotations the row names, so the test reads in one term with the contract it drives. No
  assertion's expected value changed.
- Wrote `factories.ts:87` as `The preceding public signature types the store by …` rather than the
  refuter's literal word order, which reads as the verb phrase `preceding types`.
- Wrote each rule-file reference as a parenthetical noun phrase, never as a markdown link, per the
  refuter's constraint on `queue-subj-2`.
- Named the new setup exports' types `StubStoreOptions` and `StubStoreResult`, and kept
  `createStubStore`'s records as plain arrays rather than `RecorderInterface` values, per the
  refuter's amendment.
- At `tests/src/core/Queue.test.ts`'s best-effort-save case, drove the flaky-save decision from a
  `createRecorder` counter rather than from the stub's own `saves` array. Referencing `saves` inside
  the call that initializes it is a circular initializer: `tsc` reported
  `error TS7022: 'saves' implicitly has type 'any' because it does not have a type annotation and is
  referenced directly or indirectly in its own initializer`. The recorded-then-decide order matches
  the deleted literal exactly.
- Updated three header comments that the fixture consolidation made false — they described stores and
  entries as built inline or hand-written. They now name `createStubStore` and `createStoredEntry`.

### Findings outside the confirmed rows, recorded for the next change

Neither is mine to repair under this brief's fixed scope, and I left both untouched.

- `tests/src/core/stores/DatabaseQueueStore.test.ts:206` carries the positional pointer `below` in a
  comment. `queue-subj-6` scopes positional pointers to the guide and the guides map, and
  `queue-subj-14` scopes them to `tests/guides.test.ts`, so no confirmed row reaches this site. I
  changed it and reverted it once I ruled it out of scope.
- `tests/src/core/stores/MemoryQueueStore.test.ts:11` states the count `four-method`, and
  `tests/guides.test.ts:36` carries `the second assertion below`. `queue-subj-7` scopes counts to
  `guides/queue.md` and `queue-subj-14` scopes its rewrite to lines 2-3 of `tests/guides.test.ts`.

## Observations, not criteria

- The `npm test` reading is this unit's own, taken inside its exec. The deciding run belongs to the
  Orchestrator after this unit exits.
- `guides/queue.md`'s `## Tests` list gained no row for `tests/setup.test.ts`. That proof covers test
  infrastructure rather than a `src/core` module, no confirmed row names it, and the parity suite
  does not require it.
