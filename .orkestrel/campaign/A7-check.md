<!-- A7 — checker (Sonnet, native), mechanical close of U7. Retained from the completion notification, 2026-09-15 (44 s, 6 tool uses). -->

Verdict: PASS

1. Met — only `tests/src/core/Agent.test.ts` changed (`A7-diff.patch:113`).
2. Met — no `addEventListener('abort'` and no `performance.now()`; the remaining `Promise.withResolvers` are self-resolved latches (`entered` at `:1651`, resolved by the handler at `:1658`; the untouched ignore-signal test's pair at `:1723-1725`, resolved by the test at `:1750`/`:1762`).
3. Met — `delivers agent abort inside the tool handler without authority` keeps `partial: true` and `observed.calls` equal to `[['request ended']]` (`:1674-1675`), the assertion moved after `await stream.result`.
4. Met — `delivers the run deadline inside an authorized tool handler` waits with `waitForCondition('the deadline observer records the aborted tool handler', …, { budget: DEADLINE * 6 })` (`:1705-1717`); every other assertion retained unchanged.
5. Met — in both handlers `observed.handler(...)` runs on the line after `await waitForAbort(context.signal)` and before `return` (`:1657-1662`, `:1690-1695`).
6. Met — no `any`, bare `as`, `!`, suppression, or nested function; import list alphabetical (`:9-17`); the installed declarations (`index.d.ts:727`, `:741`) match the call sites.

Referrals: none.
