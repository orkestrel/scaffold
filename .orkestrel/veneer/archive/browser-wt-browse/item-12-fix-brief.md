# Unit item-12-fix — repair item 12's review

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `5900987` (pushed). Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The review

Opus, objective, over `cc93a2b..5900987` (2026-10-03), saved at `tmp/codex/review-item-12/verdict.md`: FAIL 4 (text semantics against the capture) and 6 (unproved guide prose; one release proof cannot fail). Claims 1, 2, 3, 5, and 7 hold. Repair R1 to R5 exactly as the verdict states them, with these rulings on the rest:

- Rename the nine test titles that open "item 12" or "item 12 P1" to describe the behavior they prove; a title names no roadmap row or probe.
- Move `BROWSER_WAIT_EVENTS` beside `BROWSER_STABLE_FRAME_COUNT` in `src/core/constants.ts`, as the design placed it.
- `tests/service/browser.test.ts:951`: take `start` before the removal is sent, so the at-least check keeps its margin under load.
- Fix the fence comments at `guides/browser.md:1729` and `:2875` with R5.
- The DOM engine re-checks on every `transitionend` and `animationend` with no frame coalescing, so one class change that transitions many elements runs one full text read (or outline capture, for an element wait) per event. Measure it on a realistic heavy case (veneer's showcase under a theme or motion change that transitions many elements at once), saying before the run what added cost would be too much and why; coalesce to one check per frame only if the measurement shows it, and keep the wake on the last event. No figure here is a target or a cap.
- The rename's guide row landing in the guide commit is accepted; no change.
- The tool copy stays as it is.

## Gates

After the commit, run `node tmp/codex/merge-gates.ts item-12-fix` and read each exit code. When `test:service` fails, rerun the failing file alone and report both runs; never raise a budget. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/item-12-fix-report.md` and return it as your final message: per required change and ruling the repair and its red and green evidence (each added assertion failing without its repair), the cost measurement and the decision, the gate table, the commit hash, and any deviation. No process diary.
