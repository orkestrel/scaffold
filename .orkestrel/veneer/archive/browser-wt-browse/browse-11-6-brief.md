# Unit browse-11-6 — repair item 11's review, with the user's performance rule

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `9ef60f9`, with your stopped runs' uncommitted edits in `src/browser/helpers.ts`, `src/core/compilers.ts`, `src/core/types.ts`, `tests/setup.ts`, and `tests/src/browser/helpers.test.ts`; continue from them. Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Assignment

Do `tmp/codex/browse-11-4-brief.md` (the review at `tmp/codex/browse-11-review.md` and every ruling there), except its cost item, which this section replaces. Ignore `tmp/codex/browse-11-5-brief.md`; this brief supersedes it.

## Cost: the user's rule (2026-10-03)

Keep performance reasonable and measurable. Make no fractional or micro optimization: a change for speed must be worth it under a heavy load real pages produce, never under an invented one. No figure in this brief is a target or a cap; size every fixture, sample count, and threshold to the case, and state the reasoning behind each choice.

- Before changing code for speed, measure capture time per placement as a guarded bench (`.claude/rules/tests.md` § Probes) on veneer's showcase page (`C:\Users\mikes\WebstormProjects\veneer\showcase\browser.html`, served locally) and on fixtures that represent the heavy pages the review's cases describe (a large data table, visible and inside a collapsed panel; a form-heavy page), sized to what real pages carry. Report the host's other load (`Get-Process chrome,msedge,node`).
- Say before the run what result would make a change worth keeping, and why, for this case.
- The review's quadratic re-walk is an algorithmic term; repair it when your measurement shows it growing faster than the page does, and report the before and after.
- The review's other cost items (hoisting per-node arrays, caching one style read per slot or option group, reading `aria-label` before `innerText`) are micro changes: keep one only if its own measurement shows a gain worth having on a realistic heavy page. Revert any your stopped runs already made that does not.
- Report every measurement, kept or dropped, with its numbers, and promote the bench that settled a kept repair into the mirrored suite behind the benchmark guard, as § Probes requires.

## Gates, output, deviation

As `tmp/codex/browse-11-4-brief.md` states, with the report at `tmp/codex/browse-11-6-report.md`.
