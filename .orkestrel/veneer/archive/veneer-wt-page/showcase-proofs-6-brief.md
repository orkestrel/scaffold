# Unit showcase-proofs-6 — repair the run 5 review and measure the journey

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\veneer-wt-page`, branch `showcase-proofs` at `3807993`. Make one commit on top; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Assignment

Repair every required finding in `tmp/codex/showcase-proofs-review-5.md`: claim 14, the three cost changes, the four rules changes, and O1, O2, and O3. This unit owns `tests/app/browser/Showcase.test.ts` for claim 14 and the oracle block of `tests/setupBrowser.test.ts` for O2. The earlier briefs' rulings (`tmp/codex/showcase-proofs-brief.md`, `-3-brief.md`, `-4-brief.md`, `-5-brief.md`) still hold; every control those runs committed stays green.

## Cost: the user's rule (2026-10-03)

Keep the journey's cost reasonable and measurable, and make no fractional or micro optimization: a change for speed must be worth it under the journey's real load. No figure in this brief or in the review is a target or a cap; the review's savings are estimates to confirm or refute.

- Before the cost changes, run `npm run test:journey` with a reporter that records each project's and each test's duration (for example `--reporter=json --outputFile=...` beside the dot reporter) and keep that output. Run it again after, the same way. Report wall time, per-project time, and the slowest tests before and after, with the host's other load (`Get-Process chrome,msedge,node,codex`).
- Say before the after-run what result would make each cost change worth keeping, and why. Keep a change only when it holds its proof and its measurement shows a gain worth having; report every measurement, kept or dropped.
- Derive every wait from the condition or the engine's own timing, never from a fixed figure chosen for speed.

## Gates

After the last edit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run test:setup:browser`, `npm run test:app:browser`, `npm run test:journey`, `npm run test:journey:vue`; then `git diff --check`. The final `git status --porcelain` is empty. The commit changes no page input, so the showcase needs no rebuild; say so if a change reaches `app/browser`.

## Output

Write `tmp/codex/showcase-proofs-6-report.md` and return it as your final message: per finding the repair and its red and green evidence (each control that fails without the repair), the journey measurements before and after, the gate table, the commit hash, and any deviation. No process diary.

## Deviation contract

Stop only when a repair cannot hold without weakening a control an earlier run committed or changing engine source, and report: expected, found, evidence, done or not done, and one hypothesis.
