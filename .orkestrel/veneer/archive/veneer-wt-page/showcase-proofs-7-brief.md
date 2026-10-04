# Unit showcase-proofs-7 — prove the observation covers descendants

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\veneer-wt-page`, branch `showcase-proofs` at `608d646`. Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Finding

The confirming review of `608d646` (Opus, objective, 2026-10-03) passed claims 1 and 3 to 7 and failed claim 2 on one gap. The controls at `tests/setupBrowser.test.ts:1053-1077` pass the witness itself as the observation root (`observeShowcaseStability([panel], …)`), so removing `subtree: true` or `childList: true` from the observer at `tests/setupBrowser.ts:1657` leaves every control green; in the journey the roots are whole figures or regions (`tests/setupBrowser.ts:1698-1701`), so descendant observation is what catches a class or ARIA change below the root. The review also ruled the matrix slowdown host load, not this commit.

## Assignment

- Pass the `render` container (`[root]`) as the observation root in those controls and keep writing the transient class and ARIA change on `panel`, a descendant.
- Add a connection case that removes and re-appends `panel` at half the window.
- Each case rejects with `Refusal changed state: delayed class, ARIA, or connection mutation`.
- Show each control red with `subtree: true` removed, red with `childList: true` removed (the connection case), and green restored, with the command and counts.

## Gates

After the last edit, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:setup`, `npm run test:setup:browser`, `npm run test:app:browser`, `npm run test:journey`; then `git diff --check`. The final `git status --porcelain` is empty.

## Output

Write `tmp/codex/showcase-proofs-7-report.md` and return it as your final message: the repair, its red and green evidence, the gate table, the commit hash, and any deviation. No process diary.
