# J-ALERT — round 2 brief (successor to `j-alert-brief.md`, which stays in place unedited)

What changed and why: round 1 (`j-alert-report.md`) returned green and was audited by the analyst on GPT-6 Astra, the reviewer on Opus 5.5, and the checker; the Orchestrator's reconciled verdict `j-alert-audit-verdict.md` reads `FAIL 2, 3, 6; outside the claims: F1, R1, R2`. This brief carries each finding to one item. It names its source beside each item. Nothing else in the round-1 brief changes: its context, its non-negotiables, its host facts, its execution rule, and its output shape bind here as written.

## Role and engine

`opus` on Opus 5.5 (native subagent, effort high), the round-1 writer, resumed in the same worktree.

## Objective

Close the audit findings in the alert worktree so that every gate is green again and the round-2 instrument reddens every named case.

## Context

- Tree: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/alert`, branch `unit/alert` from Veneer `main` `e24e2c3`, your round-1 work uncommitted. Do not merge `main` and do not commit.
- Sources for this round: `j-alert-audit-verdict.md` (the rulings), `j-alert-audit-objective-verdict.md` (claim 2 for the vector, claim 4 for the bindings), `j-alert-audit-subjective-verdict.md` (claims 3d and 6, F1, R1, R2), `j-alert-probe-reentry-takeover.test.ts` and its log (the reading item A rests on), `../decisions.md` E15 (the ruling item A implements), all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`. Read them before editing.
- Veneer `main` is at `e7b187f`, which includes J-ISINSTANCE: it rewrote the `instanceOf(HTMLElement)(host)` reads in `#routeButton`, `#routeCollapse`, and the `Delegate` guards to `isInstance(host, HTMLElement)`. Your tree still carries the `e24e2c3` form of those lines. Item E rewrites the same lines, and the landing merge takes your version; do not fetch or merge to reconcile it yourself.
- The probe reading (E15's evidence): on your round-1 source a `close.vn.alert` listener calling `close()` again re-entered without bound (44 nested dispatches), the close completed with the host removed and the alert released, no `closed.vn.alert` was dispatched, and no call resolved `true`. The cause is `#closing` being set after the `close` dispatch returns.

## Unknowns

- What ended the probe's recursion at 44 nested dispatches is unmeasured. Item A removes the recursion, so no reading of the terminator is needed; report one only if your instrument happens to expose it.

## Items

**A. A close is in flight from its dispatch (claim 2, E15).** In `close()`, set `#closing = true` before dispatching `close.vn.alert`, inside the `try` whose `finally` clears it, so a prevented close, a refused close, and a completed close all leave the marker clear. Keep the first `#refused()` read; the read after the dispatch becomes `this.#controller.signal.aborted` alone (a listener can still destroy the alert inside the dispatch). Result: a `close()` call made while a close is in flight, including from a `close.vn.alert` listener or a reaction inside that dispatch, resolves `false` with no second dispatch, and the outer call proceeds. Replace the round-1 re-entry case with one whose `close` listener calls `close()` on every dispatch with no guard of its own: assert exactly one `close.vn.alert` event, exactly one `closed.vn.alert` event, the listener's call resolving `false`, the outer call resolving `true`, the host disconnected, and `Alert.find(host)` undefined. Keep the destruction-inside-dispatch case. Add instrument rows: "the marker is set after the dispatch" (must redden the new case), "the marker is not cleared after a prevented close" (must redden the prevention case's later successful close). Rewrite the guide sentence under `#### Alert` that states the inner call resolves `true` and the outer `false`, and the `close` `@returns` sentence in `types.ts` (item F names its wording), to state E15.

**B. `AlertVocabulary` (claim 3d).** Add `AlertVocabulary` to `src/browser/types.ts` mirroring `CollapseVocabulary` (`classes: AlertClassMap`, `attributes: AlertAttributeMap`, `selectors: AlertSelectorMap`, readonly, TSDoc in the same form), add its § Surface row, type `Delegate.#alert` as `AlertVocabulary`, and drop the imports the inline type needed. `types.ts` is granted to you for items B and F only.

**C. Resolver names (F1).** Rename `#dismiss` to `#reach` and `#dismissed` to `#locate` in `Delegate.ts`; update the call in `#conflicts` and both comments so each describes what the method returns.

**D. Focus control (R1).** In the trusted-click case ("closes an alert through a trusted click on its close control, moving focus nowhere"), add a focusable element outside the alert in the fixture, and add an instrument row that moves focus to it inside the route (the row must redden that case).

**E. One closest-inside-root path (R2, E6).** Route `#routeButton` and `#routeCollapse` through `#closest`, removing their inline `closest` and `contains` pairs. Existing Delegate cases pin the behaviour; report the scoped run.

**F. The false summaries and the guide (claim 6).** In `types.ts`, reword `AlertAttributeMap`, `AlertSelectorMap`, `AlertOptions.attributes`, and `AlertOptions.selectors` in the `Button` form (the delegate's dismiss route reads or matches by it; an alert constructed directly reads or matches with none), and update the four § Surface rows to match so `test:guides` parity holds. Reword the `close` `@returns` sentence with no faculty given to tokens and in the present tense ("is in flight"), and copy it to the guide's `AlertInterface` Methods row. In § Examples, give the fence's host the `alert-dismissible` token or drop "dismissible" from the lead-in. Reword the departure bullet "A completed close keeps the alert's end state" to the one departure: a later `close` resolves `false` where Bootstrap throws.

Not yours: the § Delegation paragraph (W5 Integration carries it), the `#reach` parameter types (the Modal and Toast units widen them), any edit to `helpers.ts`, `HostSnapshot.ts`, `Button.ts`, `Collapse.ts`, `tests/setupBrowser.ts`, `ROADMAP.md`, or a vendored file.

## Scope

Owned: `src/browser/Alert.ts`, `src/browser/Delegate.ts`, `src/browser/types.ts` (items B and F only), `tests/src/browser/Alert.test.ts`, `tests/src/browser/Delegate.test.ts`, `guides/veneer.md` (the Alert § Surface rows, the Alert fence, `#### Alert`, the `AlertInterface` Methods row, and the `plugin` row), `tmp/j-alert/**`. Off-limits: everything else, including every vendored file. Tools: read, edit, write, the scoped commands under Acceptance. No install, no commit, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`, no merge.

## Execution

Perform the assignment directly in the worktree and spawn nothing. The `prove` MCP server is not reachable from a subagent; record that no call was made.

## Output

Your final message is the report, in the round-1 shape: files touched, per item the red reading and the green reading with the exact command, the instrument's log (`tmp/j-alert/mutations-2.py`, `tmp/j-alert/mutations-2.log.txt`, every round-1 row kept and the new rows added, one full run, receipt), the acceptance commands with exit codes and the summary lines, `git status --short` and `git diff --stat`, and the deviation state. No process diary.

## Deviation contract

Follow `.agents/orchestration.md` § Deviation protocol. You settle yourself: the exact wording of the reworded sentences within the forms named, where the new case sits in its file, the fixture's focusable element, and the instrument row titles. Stop and report if an item cannot be closed inside the owned files or if a gate outside your items reddens.

## Acceptance criteria

In this order, each exit 0 from the worktree: `npm run check:src:browser`; `npx oxlint --config .oxlintrc.json --deny-warnings src/browser tests/src/browser`; `npx oxfmt --config .oxfmtrc.json --check src/browser tests/src/browser guides/veneer.md`; `npm run test:src:browser`; `npm run test:guides`; `npm run test:policy`; `npm run build:src:core`, `npm run build:src:styles`, `npm run build:src:browser`; `npm run test:conformance`; `npm run test:setup`. The instrument's full run reddens every row's named case and ends `receipt: restored byte for byte`.

## Review evidence

The Orchestrator captures the diff and status with its own gate run after you return; your report carries the status and diffstat.
