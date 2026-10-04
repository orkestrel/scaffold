# Unit showcase-proofs — the proofs' fixes from the showcase audit

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\veneer-wt-page`, on the branch `showcase-proofs` from `showcase-page` at `7593cfe`. Commit once on that branch at the end; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Law and records

- The worktree's `AGENTS.md` and its rules, above all `C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\tests.md` § Browser tests and `quality.md`. One rule governs here that scaffold `main` does not carry yet (it is on scaffold's unmerged `scaffold-defects` branch, so the file you read lacks it): when a case moves the real pointer through CDP (`Input.dispatchMouseEvent`), it moves the pointer to `(-1, -1)` in its `finally`, because Chromium hovers whatever a later case renders under a resting pointer. This brief is that rule's authority for this unit.
- The ruling: `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase-audit-verdict.md` § Carried, the `showcase-proofs` bullet and its bound, with the lane verdicts it cites (`C:\Users\mikes\WebstormProjects\veneer\tmp\codex\showcase-audit-verdict.md`, `C:\Users\mikes\WebstormProjects\veneer\tmp\units\showcase-subjective-verdict.md`).
- The page unit's report, `tmp/codex/showcase-page-report.md`, with the stable ids of the new specimens: the disabled triggers (`alerts-disabled-dismiss`, `toasts-disabled-dismiss`, `modal-disabled-dismiss`, `offcanvas-disabled-dismiss`, `offcanvas-disabled-toggle`, `navs-tabs-disabled-tab`, `navs-tabs-disabled-pill`, `list-group-disabled-list`, `dropdowns-disabled-toggle`, each with its target as the report's table names) and the frozen alert (`alerts-frozen-dismissible`, its close `alerts-frozen-close`, figure `alerts-frozen`).
- Owned: the showcase section of `tests/setupBrowser.ts` (the journey and statechart helpers, `buildShowcase`, `buildJourney`, the tables, `REFUSED_CONTROLS`, the readings) and `tests/setupBrowser.test.ts`'s showcase blocks, `tests/app/browser/integration.test.ts`, `tests/app/browser/main.test.ts`, `tests/app/browser/sections/integration.test.ts`, and `configs/app/vite.journey.config.ts` only if a carried item needs it. The engine section of the harness is out of scope.

## Work

Implement every item of the `showcase-proofs` bullet. For each item that names a defect, show the proof fails under the mutation the verdict names (or the one you name) before it passes, with the command and counts. Claim 13 is a recorded run: apply a no-op act and a sibling-reader mutation to each of the 21 tables, report which tables survive each, and fix every table that survives the no-op. Claim 15: make each burst row's expectation true under both motion preferences, and run the tables whose rows depend on a transition under both, keeping the journey inside its timeouts.

## Acceptance

After the last edit, in order, each exit code read bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm run test:setup:browser`, `npm run test:app:browser`, `npm run test:journey` (record its duration), `CAPTURE=1 npm run test:journey` into an emptied `tmp/captures/states/`, `npm run test:guides`, `npm run test:policy`, `npm run test:src:browser`, then `git diff --check`. One commit; an empty `git status --porcelain`.

## Output

Write the report to `tmp/codex/showcase-proofs-report.md` and return it as your final message: per carried item, the proof, its mutation, and its red-before and green-after commands with counts; claim 13's table of surviving mutations; the gate table with the journey's duration; the commit hash; and any deviation. No process diary.

## Deviation contract

On any conflict with the verdict, the law, or the tree, stop and report: expected, found, evidence, done or not done, and one hypothesis.
