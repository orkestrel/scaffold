<!-- A2c-C — checker (Sonnet, native), mechanical close of U2d. Retained from the completion notification, 2026-09-15 (123 s, 19 tool uses). -->

Verdict: PASS

1. Met — `#authorize` is synchronous and runs before the guard; the guard (`if (abort.signal.aborted) { … break }`) is the last statement before the assistant append (diff `:531-540`); `#dispatch` receives `{ allowed, denials } | undefined`; the no-authority branch is `tools.execute(calls, { signal })` with no consumer code between (`:594-612`); one `deny` per denied call in call order (`:564-592`).
2. Met — `abort in a deny listener preserves only the prior conversation` asserts no `tool` chunk, messages equal `[seed]`, `partial: true`, `executed.count === 0`, exactly one `deny` (`:936-974`).
3. Met — the ignoring-handler test is byte-identical to its post-U2c form.
4. Met — the lede now folds the budget into the run signal and splits the destinations; invariant 5 and the cancellation section consistent (`:10`, `:74-116`).
5. Met — 14 paths, all Owned plus `src/core/shapers.ts`; no manifest, lockfile, vendored file, suppression, `any`, bare `as`, `!`, or nested function.

Referrals: none.
