# Report — `d7n-queue-prep`

Wall clock: 2026-09-07T21:06:37Z to 2026-09-07T21:09:51Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.` … `9 written, 27 unchanged, 0 removed in ..`

`git status --short` after: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (all modified) and `scripts/docs.ts` (untracked) — matches the P21 list exactly.

## Item 2 — drop-in adaptation (`tests/guides.test.ts`)

Methods loop: replaced `const members = source.methods(group.interface)` with the mapped-to-name form plus a new `const documented = group.methods.map((method) => method.name)`; both `findMissing` calls in that `describe` now take `members`/`documented`; the `exposes no undocumented method` case now maps `source.methods(entity)` to names before calling `findMissing`.

```diff
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 ...
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
```

Examples case: `findUnexampled(names, fences, source.examples())` now maps `source.examples()` to names.

```diff
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
```

Examples loop: `documented` and the mapped `examples` now bind at the loop's own scope, above the `describe`, matching `/home/user/fleet/abort/tests/guides.test.ts:209-227`.

```diff
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

The already-string `findMissing` calls (the import-walk sites and `findMissing(names, surface)`) were left unchanged. Diffed the adapted sections against `/home/user/fleet/abort/tests/guides.test.ts:146-227`: the shared logic matches byte for byte outside this package's own constants.

## Item 3 — voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named the files P20 read: `tests/src/core/Queue.test.ts` (`no-banned-term`) and `tests/setup.ts` (`no-malformed-summary`).

`tests/src/core/Queue.test.ts`:

- line 349, `no-banned-term` (`just` → delete):
  `// A terminal failure removes the row just like a success.` → `// A terminal failure removes the row like a success.`
- line 409, `no-banned-term` (`simply` → delete):
  `// B is meant to restore; a paused A simply holds them.)` → `// B is meant to restore; a paused A holds them.)`
- line 1092, `no-banned-term` (`via` → `through`):
  `// Fire 50 enqueues, alternating success and rejection via a throwing branch.` → `// Fire 50 enqueues, alternating success and rejection through a throwing branch.`
- line 1473, `no-banned-term` (`just` → recast, per item 3's `just`/`simply`/`easy` "deleted or recast": a bare deletion here drops the "only" sense the sentence carries):
  `// EVERY throw (not just the first) was routed to the emitter's error handler — (error, event).` → `// EVERY throw (not only the first) was routed to the emitter's error handler — (error, event).`

`tests/setup.ts`:

- line 17, `no-malformed-summary` (`StubStoreOptions` doc block):
  `/** The scripted primitives a stub store may override; each unsupplied one resolves a no-op. */` → `/** Lists the scripted primitives a stub store may override; each unsupplied one resolves a no-op. */`
- line 25, `no-malformed-summary` (`StubStoreResult` doc block):
  `/** A scripted store paired with the live records of what the queue asked it to persist. */` → `/** Pairs a scripted store with the live records of what the queue asked it to persist. */`
- line 32, `no-malformed-summary` (`QUEUE_EVENTS` doc block):
  `/** The \`QueueEventMap\` names the emitter suites record. */` → `/** Lists the \`QueueEventMap\` names the emitter suites record. */`
- line 43, `no-malformed-summary` (`QueueEvent` doc block, first sentence only):
  `* The recorded-name union, derived from the list rather than from \`keyof QueueEventMap\`:` → `* Represents the recorded-name union, derived from the list rather than from \`keyof QueueEventMap\`:`

Every rewrite keeps every fact the paragraph carried, opens with a third-person verb ending in `s`, and names no symbol in its first sentence. No code token moved and no assertion value changed.

Rerun after fixes: `npx oxlint --config .oxlintrc.json --deny-warnings .` exit 0, no diagnostics.

`npm run test:policy` after item 1 (before any item-3 edit) already read green — `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)` — so its `prose` rule named no line in `guides/**` or `README.md` to fix; no file in that scope was touched.

## Item 4 — the bump

`package.json`: `"version": "0.0.12"` → `"version": "0.0.13"`. `package-lock.json` untouched.

## Acceptance criteria

1. `git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/src/core/Queue.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

The P21 repair list plus `tests/guides.test.ts` (item 2), `tests/setup.ts` and `tests/src/core/Queue.test.ts` (item 3), and nothing else. Each file item 3 edited and its diagnostic is named in the preceding section.

2. Gates:

- `npm run format:check` — `All matched files use the correct format.` exit 0.
- `npx oxlint --config .oxlintrc.json --deny-warnings .` — no output, exit 0.
- `npm run check` — `tsc --noEmit --project tsconfig.json && npm run check:src` then `tsc --noEmit -p configs/src/tsconfig.core.json`, no diagnostics, exit 0.

3. Tests:

- `npm run test:guides` — `Test Files 1 passed (1)`, `Tests 26 passed (26)`, exit 0. (P21's `test:guides` failures under `0.0.17` were the readers' record-shape mismatch alone; item 2 closed them.)
- `npm run test:policy` — `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`, exit 0.
- `npm run test:config` — `Test Files 1 passed (1)`, `Tests 172 passed | 1 skipped (173)`, exit 0.

4. `npm run docs` — exit 1 (confirmed via direct redirect, not through `tee`, to avoid pipe-status masking). Verbatim worklist:

```
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
```

This is the converge unit's worklist, out of this unit's scope per the objective (`guides/**`, `README.md`, and every doc block under `src/**` belong to the converge unit).

## Deviations

None. No `repair` path fell outside the P21 list, every before-text was found verbatim, no voice diagnostic named an off-limits file, `test:policy` read green with no file outside scope, and every gate other than `docs` read green after the items (`docs` reading red with a nonzero `rows read` is the expected, brief-named reading).

---

Orchestrator's annotation (2026-09-08, from the audit verdict): this report states counts in prose; the tree is authoritative and every cited line matched it on the audit's re-read. The unit's instruments are retained under `instruments/d7/units/queue/`.
