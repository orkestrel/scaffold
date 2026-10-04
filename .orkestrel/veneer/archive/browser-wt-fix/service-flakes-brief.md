# Unit service-flakes â€” find why service tests fail intermittently, and fix the causes

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-fix`, branch `service-flakes` at `d6937be` (the browse branch with item 12 and its repairs). Another writer may land a review repair on the browse branch in `C:\Users\mikes\WebstormProjects\browser-wt-browse`; touch nothing there; the Orchestrator merges your branch. Commit each established fix separately; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The failures

During 2026-10-03, with several writers loading this host, these failed intermittently and passed alone. Two isolated reruns also failed once each, so isolation does not always clear them:

- `tests/service/journey.test.ts`: a secret-journey `Runtime.callFunctionOn` timeout (`:833` at `176de93`); a replay whose outcome was `stopped`, expected `complete` (`:738`); a document-toolset startup over its 10000 ms budget (`:747`); an appearance-control replay assertion.
- `tests/service/toolset.test.ts`: `Runtime.callFunctionOn` timeouts (`:1076`, `:1179` at `176de93`); a cross-process frame submission timeout; a `beforeunload` dialog case.
- `tests/service/document.test.ts`: a document-toolset startup over its 10000 ms budget (`:521`).
- `tests/setupGlobal.test.ts`: "releases every acquired resource when a later step throws" timed out.
- `tests/src/server/stores/FileBrowserStore.test.ts`: the empty-lock-removal race test at its 5000 ms limit.
- `test:setup:browser` and focused runs print `close timed out after 10000ms` after passing.

The line numbers drift with each commit; find each case by name at the tip.

## Assignment

1. **Measure the rate.** On this host, with the other writers' load recorded (`Get-Process chrome,msedge,chrome-headless-shell,node,codex` before and after each run), run the whole `test:service` project and the affected setup and server files enough times quiet, and again under a load you generate (CPU contention from a script you write, sized to resemble several concurrent test runs), to tell a rare failure from a frequent one. Say before the runs how many runs settle the question for this case and why. Record every run.
2. **Classify each failure** by its cause, read from the code and the run evidence (stack, CDP traffic, timings): a test that assumes a timing the code never promised; a fixed budget smaller than the work under real load; a real race or leak in `@orkestrel/browser` (an event missed, a listener left, a promise never settled, a lock not released, a teardown that outlives its caller); or a Chromium or host fact.
3. **Fix each cause** at its source, with a test that fails before the fix (under the condition that exposes it, such as an ordering the test forces) and passes after. A library race gets a library fix. A test that assumes a timing waits on the condition instead (`.claude/rules/tests.md` Â§ Condition). Never raise a budget or a timeout to make a run pass; when a budget is wrong for the work it bounds, derive the right one from the measured work and state the derivation, or replace it with a condition. When a failure belongs to Chromium or the host, record the evidence and leave the code.
4. **Prove it held**: repeat step 1's runs after the fixes, quiet and loaded, the same way.

## Cost: the user's rule (2026-10-03)

Keep performance reasonable and measurable, with no fractional or micro optimization. No figure in this brief is a target or a cap; size runs, loads, and thresholds to the case and state the reasoning.

## Gates

After the last commit, run `node tmp/codex/merge-gates.ts service-flakes` and read each exit code. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/service-flakes-report.md` and return it as your final message: the run tables before and after (quiet and loaded, with load readings), each failure's established cause with its evidence, each fix with its red and green command and counts, every failure left unfixed with why, the gate table, the commit hashes, and any deviation. No process diary.

## Deviation contract

Stop only when a cause cannot be fixed without changing a public contract no design names, and report: expected, found, evidence, and one hypothesis.
