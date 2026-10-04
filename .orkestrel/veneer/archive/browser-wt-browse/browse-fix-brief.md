# Unit browse-fix — repair the item 10 and Windows portability review findings

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6`, after item 11's commit. Make one commit; never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Law and records

- The worktree's `AGENTS.md` and the rules it maps, above all `.claude/rules/tests.md` (probes, skips, no fakes) and `.claude/rules/portability.md` (host branching, OS claims).
- The two reviews, each with its evidence, its required change, and the Orchestrator's bracketed rulings on the referrals: `tmp/browse-review-item10.md` and `tmp/browse-review-portability.md`. The lane's summary of both is `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\showcase\browse.md` § Review findings to fix.

## Work

Repair every confirmed finding and every ruled referral in both reviews, except portability O4 (history). Re-read each cited `path:line` first: item 11 shifted lines after the reviews were written. For each repair that a test can catch, add the test, show it fails under the review's mutation (or under the defect as it stands) before the repair and passes after, and record the command and counts. The lock-release repair keeps a committed write's result on every host; drive the interleaving the review describes with real directories, not a fake. Where a repair needs a host capability this host lacks, gate only that assertion on a measured capability.

## Gates

After the last edit, read each exit code bare: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:src:core`, `npm run test:src:browser`, `npm run test:src:server`, `npm run test:src:bin`, `npm run test:guides`, `npm run test:policy`, `npm run test:setup`, `npm run test:setup:browser`, then `npm run build` and `npm run test:service`. Then `git diff --check`. One commit naming each repaired finding. The final `git status --porcelain` is empty.

## Output

Write the report to `tmp/codex/browse-fix-report.md` and return it as your final message: per finding, the repair and its red-before and green-after commands with counts; the gate table; the commit hash; and any deviation. No process diary.

## Deviation contract

Stop only for a finding you cannot repair without changing a public type or a documented behavior the reviews do not rule, and report: expected, found, evidence, done or not done, and one hypothesis.
