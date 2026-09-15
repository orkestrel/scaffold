<!-- U7 — builder (Sonnet, native), agent tests observe aborts through @orkestrel/test. Retained from the completion notification, 2026-09-15 (115 s, 23 tool uses). -->

Rewrites in `tests/src/core/Agent.test.ts`:

- `:1643` `delivers agent abort inside the tool handler without authority` — the one-shot `abort` listener deferred became `await waitForAbort(context.signal)` inline in the tool's `execute`; the `completion` deferred was dropped; the `observed.calls` assertion moved after `await stream.result` (asserting synchronously right after `agent.abort()` raced the microtask that runs the continuation and failed with `expected [] to deeply equal [['request ended']]` at `:1674`; the reorder does not change what the test proves).
- `:1677` (was `:1685`) `delivers the run deadline inside an authorized tool handler` — the listener deferred became `await waitForAbort(context.signal)`; the `Promise.race([completion.promise, waitForDelay(DEADLINE * 6)])` became `waitForCondition('the deadline observer records the aborted tool handler', () => observed.count === 1, { budget: DEADLINE * 6 })`.
- `:45` the `@orkestrel/test` import gained `waitForAbort, waitForCondition`.
- `waits for a tool that ignores its signal before settling a cancelled run` unchanged (self-resolved latches, observes no abort).

Scoped validation (writer's readings): `grep addEventListener('abort')` none; `grep performance.now()` none; `lint:check` 0; `format:check` 0 (after scoped `oxfmt --write`); `check` 0; `test:src:core` 0, 763 passed. `git diff --stat`: `tests/src/core/Agent.test.ts | 51 +++++++++++++++++++++-----------------------` (24 insertions, 27 deletions). Status: only that file modified. Deviation: the assertion reorder, recorded above.
