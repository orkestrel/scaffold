# Unit browse-9-10-2 — finish browse-9-10

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6`. Never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Objective

Finish the unit `tmp/codex/browse-9-10-brief.md` describes; that brief governs except where this one states otherwise. Read it and the first run's report `tmp/codex/browse-9-10-report.md`. Its item 9 repairs (F1 to F12, and F13's test) are uncommitted in the worktree; keep them.

## The gate blocker

`BrowserRegistry > C5 drops foreign responses outside a reply window during a long invocation` (`tests/src/core/BrowserRegistry.test.ts`) times out at 5,000 ms on this Windows host, unchanged from `655906b`, because its second loop awaits `waitForDelay()` 1,000 times to let each `registry.execute` send its request, and a macrotask delay here costs several milliseconds where the Linux host it was written on costs about one. Repair the test, not the budget: replace each per-iteration `waitForDelay()` with a wait on the request's send itself (resolve a deferred from the `transport.onSend('WebMCP.invokeTool', …)` handler, for example with `Promise.withResolvers`, or a `waitForEvent` from `@orkestrel/test` on an event the transport emits), keeping all 1,000 id reuses the proof needs and adding no polling loop. Show the case still fails when a retained foreign response would settle a fresh invocation (name the mutation and its count), and passes in well under its budget on this host (record the duration). Check the first loop and the case's other waits the same way. Include this repair in commit 1 and name it in the commit message as a host-independence fix to an unchanged test.

## Then

Commit 1 (item 9's review findings plus the C5 repair) after its gates, then item 10 as commit 2, each gated exactly as the first brief lists. Do not run the scaffold discovery script (a known scaffold defect, being repaired separately); take the census by hand with `npx vitest list --config vite.config.ts --project <project> --json=tmp/codex/list-<project>.json` where you need one.

## Output

Write the report to `tmp/codex/browse-9-10-2-report.md` and return it as your final message, in the first brief's output shape, covering both runs. No process diary.

## Deviation contract

On any conflict with the briefs, the design, or the tree, stop and report: expected, found, evidence, done or not done, and one hypothesis.
