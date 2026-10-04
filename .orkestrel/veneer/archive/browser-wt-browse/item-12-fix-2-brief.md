# Unit item-12-fix-2 — close the confirming review of `39ede3a`

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `39ede3a` (pushed). Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The review

Opus, objective, over the snapshot `tmp/codex/review-39ede3a/` (2026-10-03), saved at `tmp/codex/review-39ede3a/verdict.md`: FAIL 3. Claims 1, 2 (the coalescing code under every ordering tried), 4, and 5 hold.

## Required

1. `src/core/BrowserPage.ts:465-478`: the retry path treats "Inspected target navigated or closed" as a navigation even when the page is closed, parks a readiness wait after `#releaseResources` already ran, and that park ends only at the deadline with `BROWSER_WAIT_TIMEOUT`. Call `this.assert()` (or rethrow when `#closed` is true) before clearing `#dom` and parking, so a closed page rejects at once. Add a live test in `tests/service/browser.test.ts`: a pending text wait with a deadline well above the close's latency, then `page.close()`, asserting the wait rejects without `BROWSER_WAIT_TIMEOUT` and well before the deadline; show it red without the fix.
2. `tests/src/browser/BrowserDOMWait.test.ts:136-138`: the departed-root assertion is synchronous, and a leaked listener only schedules a frame, so it cannot fail. Record the shadow root's listener signals with the R3 recorder and assert they are aborted after the departure reconcile while the wait is pending; confirm with the mutation that deletes only `src/browser/BrowserDOMWait.ts:119`.
3. `src/core/compilers.ts:31`: write "checked immediately and on the animation frame after a mutation batch or a `BROWSER_WAIT_EVENTS` event".

## Rulings on the referrals

- **Hidden pages.** Chromium pauses animation frames in a hidden page, so a coalesced check could wait for the deadline there. Probe it in both placements: a page that is not the visible tab (another tab of the same context in front) runs a transition that removes the waited text. If the wait settles only at its deadline, schedule the coalesced check on a task (a `MessageChannel` or a zero-delay timer) instead of an animation frame, keep one check per burst and the final-event wake, and keep the burst and final-event controls green. Report the probe either way and promote it.
- **Element waits and navigation.** `src/core/elements/BrowserElementManager.ts:254` rethrows a navigation error raw, so an element `wait` a navigation interrupts rejects with a `CDPError`, unlike the text wait. Give it the text wait's handling (settle or reject as the guide's navigation sentence states, extended to element waits), with a live test that fails without it, and make the guide sentence name both waits.

## Gates

After the commit, run `node tmp/codex/merge-gates.ts item-12-fix-2` and read each exit code. When `test:service` fails, rerun the failing file alone and report both runs; never raise a budget. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/item-12-fix-2-report.md` and return it as your final message: per item the repair and its red and green evidence, the hidden-page probe readings and the decision, the gate table, the commit hash, and any deviation. No process diary.
