# Check A7 — mechanical close of U7 (`@orkestrel/agent` tests observe aborts through `@orkestrel/test`)

## Role and lane

`checker` on Sonnet (native; Read, Grep, Glob). One lane; the unit was a fully specified cleanup on
Sonnet, so this check plus the Orchestrator's gate run close it. Perform the check directly; spawn
nothing.

## Subject

The `agent` working tree after U7 on checkpoint `ac7ef43`. Evidence:
`C:/Users/mikes/WebstormProjects/scaffold/tmp/units/A7-diff.patch` (`git diff` and `git status
--porcelain`). Brief `tmp/units/U7-agent-reuse-brief.md`; report
`.orkestrel/campaign/U7-agent-reuse-report.md` (writer's). The installed helper declarations:
`C:/Users/mikes/WebstormProjects/agent/node_modules/@orkestrel/test/dist/src/core/index.d.ts`
(`waitForAbort`, `waitForCondition`, `WaitOptions`).

## Checklist (met / not met, with `file:line`)

1. Only `tests/src/core/Agent.test.ts` changed.
2. No `addEventListener('abort'` and no `performance.now()` remains in that file; every
   `Promise.withResolvers` left is a latch the test resolves itself (name each remaining one and
   what resolves it).
3. `delivers agent abort inside the tool handler without authority` still proves what it proved:
   the handler observes the abort reason (`observed.calls` equals `[['request ended']]` or the
   reason the test seeds), the run settles `partial: true`, and no assertion was weakened or
   removed; the moved assertion is after `await stream.result` and still binds to the reason.
4. `delivers the run deadline inside an authorized tool handler` still proves the handler observed
   `context.signal.aborted === true` within `DEADLINE * 6`, with the same `signals.count` and
   the same result assertions; the `waitForCondition` description names the condition.
5. The `waitForAbort` continuation runs the recording before the handler returns, so the
   recorder is written before the run settles (read the rewritten handlers; name the line).
6. Rules: no `any`, bare `as`, `!`, suppression, or nested function introduced; the import list
   stays sorted as the file had it; LF endings.

## Output

The Checklist shape: Verdict PASS or FAIL; item → met / not met → evidence; not-met items as
re-dispatchable instructions; referrals.
