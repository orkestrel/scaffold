# Unit showcase-proofs-4 — the proofs, with the disabled tab, pill, and list route ruled

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\veneer-wt-page`, branch `showcase-proofs`, fast-forwarded to veneer `main` (the carousel fix; see § Tree). Commit once at the end; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Objective

Do the unit `tmp/codex/showcase-proofs-brief.md` describes. It governs, with the rulings of `tmp/codex/showcase-proofs-3-brief.md` and the rulings that follow, which supersede where they differ. Read the three stopped runs' reports first (`tmp/codex/showcase-proofs-run1.md`, `tmp/codex/showcase-proofs-run2.md`, `tmp/codex/showcase-proofs-3-report.md`).

## Rulings

- **Claim 11, tab, pill, and list.** On the shipped page Bootstrap blocks both user routes to these three disabled triggers: its CSS gives them `pointer-events: none` (`node_modules/bootstrap/scss/_nav.scss:50`, `_list-group.scss:70`), and its roving `tabindex="-1"` and arrow skip keep them out of the keyboard order. The engine's restriction stays reachable through activation that skips hit testing, the route an assistive technology's default action takes. So each of the three refusal rows:
  1. asserts the shipped trigger computes `pointer-events: none` and the post-boot `tabIndex` is `-1`;
  2. activates the trigger with `HTMLElement.click()` and reads the state unchanged;
  3. fails when that family's `restricted: true` is removed (record the mutation and the counts).
  The other six families keep their keyboard rows. Make no page change.
- **Your authority** stays as the third brief states it.

## Tree

`main` carries the carousel fix (its commit's message names it): the four live carousel hosts carry `slide`, so a slide takes Bootstrap's 0.6 s transition; `actOnCarouselControl` in `tests/setupBrowser.ts` checks the first frame of every slide, and `arrangeCarouselSelection` settles each click. Claim 15's both-motion rows and every table that waits on a carousel run on that timing.

## Output

Write the report to `tmp/codex/showcase-proofs-4-report.md` and return it as your final message, in the first brief's output shape, plus the table of premises adapted under your authority with their Bootstrap references. No process diary.

## Deviation contract

Stop only under the third brief's stop condition, and report: expected, found, evidence, done or not done, and one hypothesis.
