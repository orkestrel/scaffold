# Unit browse-11-5 — repair item 11's review, with the user's performance rule

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `9ef60f9`, with your stopped run's uncommitted edits in `src/browser/helpers.ts`, `src/core/compilers.ts`, `src/core/types.ts`, `tests/setup.ts`, and `tests/src/browser/helpers.test.ts`; continue from them. Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Assignment

Do `tmp/codex/browse-11-4-brief.md` (the review at `tmp/codex/browse-11-review.md` and every ruling there), except its cost item, which this section replaces.

## Cost: the user's rule (2026-10-03)

The user wants performance reasonable and measurable, and is opposed to fractional or micro optimization: a change for speed must be worth it under a heavy load real pages produce, never an invented one.

1. **Fixtures, before any change:** veneer's showcase page (`C:\Users\mikes\WebstormProjects\veneer\showcase\browser.html`, served locally); a data-table page with 5,000 rows, once visible and once inside a collapsed panel (the review's quadratic case); a form page with 200 mixed controls. Measure capture time per placement as a guarded bench (`.claude/rules/tests.md` § Probes), at least 10 samples each, with what else was running on the host (`Get-Process chrome,msedge,node`).
2. **Threshold, declared before the run:** a cost change stays only when it removes a superlinear term the fixtures show (the time grows faster than the row count) or cuts the median capture time on a fixture by at least 25% beyond both sides' spread.
3. **Keep:** the quadratic re-walk repair (snapshot the child lists or walk sibling pairs), measured before and after on the 5,000-row fixtures.
4. **Drop unless they clear the threshold on their own measurement:** hoisting per-node arrays into `Set`s, caching one style read per slot or option group, and reading `aria-label` before `innerText`. Revert any of these your stopped run already made that does not clear it.
5. Report every measurement, kept or dropped, with its numbers; promote the bench that settled the kept repair into the mirrored suite behind the benchmark guard, as § Probes requires.

## Gates, output, deviation

As `tmp/codex/browse-11-4-brief.md` states, with the report at `tmp/codex/browse-11-5-report.md`.
