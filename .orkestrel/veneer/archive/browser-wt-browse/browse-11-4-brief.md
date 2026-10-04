# Unit browse-11-4 — repair item 11's review

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `9ef60f9` (your item 11 commit). Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## The review and the rulings

`tmp/codex/browse-11-review.md`: `FAIL 1, 4, 7` and O1 to O7. Repair each as it states, in both placements, with these rulings:

- **1, privacy.** Both fixes: the final sweep that removes every password and hidden input from the root before serialization, and skipping children only for elements the lowering actually replaces. Pin the namespaced `select` case in both placements and the adopted iframe-realm `select` in the DOM placement.
- **4, SVG.** Nested `svg` and `foreignObject` keep their visible text, as the review says; add both to `CAPTURE_CASES`.
- **7, cost.** Every listed change. Record the bench (B1) before and after on veneer's showcase and on the 5,000-row fixture, with what else was running on the host (`Get-Process chrome,msedge,node`).
- **O1.** A direct element read applies the same visibility rules to its ancestors as the page-level walk (closed `details`, `content-visibility: hidden`, replaced-element fallback, unassigned shadow-host child), so it never returns text the page read removes.
- **O2.** Replace `expect.poll` with `waitForCondition`, and the fixed `waitForDelay(100)` with a sentinel request issued after the capture.
- **O3 and O4.** A case for each untested branch and each privacy context the review lists, each red with its branch removed.
- **O5.** An empty `textarea` whose placeholder is painted lowers that placeholder, as an empty text input does.
- **O6.** "might select".
- **O7.** Declare the carrier separators in the `BrowserReadingInput` remarks and the guide: the `html` handle is the normalized capture.

For every repair that a test can catch, show the test red before and green after (command and counts).

## Gates

After the last edit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:src:browser`, `npm run test:src:server`, `npm run test:src:bin`, `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, `npm run test:setup:browser`, then `npm run build` and `npm run test:service`; then `git diff --check`. One commit. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/browse-11-4-report.md` and return it as your final message: per finding the repair and its red and green evidence, the bench readings, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only for a finding you cannot repair without changing a public contract the design does not name, and report: expected, found, evidence, and one hypothesis.
