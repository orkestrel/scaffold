# Unit motion-wait — pad a transition wait that has nothing running, as Bootstrap does

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\veneer-wt-page`, branch `showcase-proofs` at `9401839` (veneer `main`), with the Orchestrator's candidate fix applied and uncommitted (`tmp/codex/motion-wait.patch`). Make one commit for this unit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The defect

Your fourth `showcase-proofs` run found it (`tmp/codex/showcase-proofs-4-report.md`, claim 15): under reduced motion, closing the start offcanvas through its backdrop restores focus to the opener and then focus moves to `main#content`, while Bootstrap 5.3.8 keeps focus on the opener. `awaitTransition` (`src/browser/helpers.ts`) resolved at once when no CSS transition runs; Bootstrap's `executeAfterTransition` (`node_modules/bootstrap/js/src/util/index.js:229-256`) always waits the computed duration plus 5 ms. Its backdrop starts the hide on `mousedown`, so the engine finished the hide inside the press and the browser's default focus action for that press ran after the restore. Your control (`tmp/codex/proofs4-focus.test.ts.txt`, run D) passed with a 5 ms wait.

## The candidate fix (applied)

With nothing running, the wait resolves on the padded timer alone (the computed duration and delay plus 5 ms), still abortable; `@param animated` states it; the reduced-motion helper case asserts the wait is deferred past the current task and lasts at least 4 ms. The departure ledger then reports differences: `Modal.test.ts` "matches Bootstrap for overlap" and "consumes every selected departure" fail, because the overlap rows (`guides/veneer.md` § Engine departures, scenario `modal:overlap:*`, reason "Without transitions the shared overlapping lock skips repeated saves and the hide and show writes settle in one order") recorded the instant completion's write order.

## Work

1. Keep or improve the fix: confirm it matches `executeAfterTransition` for every caller of `awaitTransition` (search `src/browser/`), including abort and teardown during the padded wait. Change nothing else in engine behavior.
2. Re-derive every departure row the fix moves, across all family tests (run `npm run test:src:browser` and read each ledger difference): where the engine now matches Bootstrap, delete the row; where it still differs, rewrite the row with the measured values and a true reason. Never widen a row to absorb a difference you have not explained. The guide's departure table is the ledger's source.
3. Add an oracle case in `tests/src/browser/Offcanvas.test.ts`: under emulated reduced motion, a real CDP pointer press on the backdrop of a shown offcanvas leaves focus on its opener in both the Bootstrap realm and the engine; park the pointer at `(-1, -1)` in `finally`. Show it red with the fix reverted and green with it (record commands and counts).
4. Run, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm run test:src:browser`, `npm run test:setup:browser`, `npm run test:app:browser`, `npm run test:journey`, `npm run test:guides`, `npm run test:policy`; then `git diff --check`. If `app/browser` or any page input changed, run `npm run build:showcase` and commit the rebuilt `showcase/browser.html`.
5. Commit this unit alone, naming the defect, the fix, and every departure row removed or rewritten. The final `git status --porcelain` is empty. Your `showcase-proofs` draft (`tmp/codex/showcase-proofs-4-draft.patch`) stays out of this commit.

## Output

Write `tmp/codex/motion-wait-report.md` and return it as your final message: the fix, each departure row's fate with its evidence, the red and green runs, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only for a difference you cannot explain or a caller whose behavior the padded wait breaks, and report: expected, found, evidence, done or not done, and one hypothesis.
