# Unit A1-fix (third brief) — repair the findings of audit round A1-R1

This brief supersedes `tmp/units/a1-fix-brief-2.md`, which superseded `tmp/units/a1-fix-brief.md`.
Read the first brief, its report `tmp/units/a1-fix-report.md`, the second brief, its report
`tmp/units/a1-fix-report-2.md`, and this one, in that order. Apply every section of the earlier
briefs as written except where this file replaces them. The tree carries the first run's landed
work (F1, F2, F3, F4, F6b, F6d, F6e); nothing from the second run.

## What changed and why

The second run stopped on F8's observation limit: three assertions
(`tests/src/core/AgentProvider.test.ts:608`, `:626`, `:650`) observe the combined signal after a
`headers` hook rejection, a caller cancel during the hook, and a deadline expiry during the hook —
exits that never reach the transport, so `RecordedTransport` cannot see the signal, and the second
brief told the unit to stop rather than restore the global patch. The Orchestrator rules the seam
in:

**F8, ruled — the hook receives the call's signal.** Change `ProviderOptions.headers` to
`readonly headers?: (signal: AbortSignal) => Readonly<Record<string, string>> | Promise<Readonly<Record<string, string>>>`.
The base passes the combined signal (the caller's bound folded with the deadline) as the hook's
argument, so a hook that fetches or refreshes a token can bound its own request by the same
deadline — that is why the design welcomes the seam (`../scaffold/.claude/rules/tests.md`
§ "Untestable usually means missing seam"). Document the argument in the option's TSDoc. Every
existing hook that ignores its argument keeps working; the relay and ollama consumers pass the
option through unchanged. In the tests, a fixture hook records the signal it receives, and the
three assertions observe that recorded signal instead of a patched global: listener absence
through `getEventListeners(signal, 'abort')` imported from `node:events` in the test file (the
`src:core` project runs in Node; never import `node:*` in `tests/setup.ts`), and the cleared
deadline by reading `signal.aborted` after the deadline would have fired. Delete `RecordedSignals`
and every use of it. The successful-hook case keeps observing the same signal through the
transport, so the two observations agree on one object. This closes F8; do not stop on it again.
(Owned for this item: `src/core/types.ts` for the one signature and its TSDoc,
`src/core/AgentProvider.ts` for passing the signal, `tests/setup.ts`, and the mirrored test.)

**F7, F6a, F6c — complete them as the second brief specifies.** F7 replaces the `pipeThrough`
cancellation with reader-owned cancellation in `readChunks` and `readText` (the second brief's
text is unchanged and binding, including the `combined.throwIfAborted()` after the read loop and
after the non-OK read); F6a writes `ProviderError`'s `@remarks` and member docs; F6c writes the
subclass `@example` on `AgentProvider`.

**Scope of the deviation contract, restated.** Stop only when a fix would change a behaviour the
ruled contract fixes, when a file outside Owned must change, or when a rule forbids an
instruction. An assertion you cannot observe is not a stop: record it under Observations with the
vector, keep every other item moving, and finish the unit.

## Output (replaces the earlier path)

Write the report to `tmp/units/a1-fix-report-3.md` and return the same text as your final message;
leave the two earlier reports untouched. `Red then green` carries F7 and F8 beside the carried
first-run records; `Scoped validation` ends with `npm.cmd run test:src:core` and
`npm.cmd run test:setup` fully green.

## Acceptance criteria (replace the second brief's added items 10–12)

10. F7: `grep -n "pipeThrough" src/core/AgentProvider.ts` returns nothing; the interleaved test
    and the two reader tests were red before and are green after; `npm.cmd run test:src:core`
    exits 0 with every file collected.
11. F8: `grep -rn "RecordedSignals\|AbortSignal.any =" tests` returns nothing;
    `ProviderOptions.headers` takes `(signal: AbortSignal)`; the three hook-exit assertions read a
    signal the fixture hook recorded; `grep -n "node:" tests/setup.ts` returns nothing.
12. F6a and F6c: `ProviderError` carries `@remarks` and documented `code` and `status` members;
    the `AgentProvider` `@example` declares a subclass.
