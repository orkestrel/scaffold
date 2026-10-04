# Unit browse-9-10-5 — finish Windows portability and browse-9-10

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Sole writer in the worktree `C:\Users\mikes\WebstormProjects\browser-wt-browse`, branch `ccr-d15a48b1-yyyll6` at `ce66ba3`. Never push, publish, or install outside the worktree. Perform the assignment yourself and spawn nothing.

## Objective

Finish `tmp/codex/browse-9-10-4-brief.md`; read it, the earlier briefs, and all four reports (`tmp/codex/browse-9-10-*-report.md`), and reuse `tmp/codex/portability-capabilities.ts`. The item 9 and C5 edits are uncommitted; keep them.

## Rulings that settle the fourth run's stop

- **The `chmod` permission proof** (`tests/src/server/stores/suite.ts:479-480`): on this host `chmod(file, 0)` leaves the file readable (mode reads back `0444`, the read succeeds), so the case's scenario, an unreadable file, cannot be built with mode bits here. Under `.claude/rules/portability.md` and `.claude/rules/tests.md`, gate the whole case on a runtime probe that `chmod` to `0` refuses a read, and skip it otherwise with that mechanism cited in the skip reason; it keeps running where the probe passes. Use another access-denial mechanism only if one exists without a dependency or an administrator right; otherwise the skip stands.
- **Your decision authority.** For every other server failure, decide with a probe and its control and act, under the same two rules: a product defect is repaired in source for both hosts with a test that fails before; a scenario the host cannot build is skipped on a cited probe; a host-specific assertion is replaced by the property the test claims. Stop only for a product defect you cannot repair without changing a public type or a documented behavior, or for a failure in code item 9 changed.

## Then

Commit A (Windows portability: product repairs and test changes, with the case table), commit 1 (item 9's review findings and the C5 repair), then item 10 as commit 2, each after the full gate list of the first brief plus `npm run test:src:server` and `npm run test:service`. Do not run the scaffold discovery script.

## Output

Write the report to `tmp/codex/browse-9-10-5-report.md` and return it as your final message, covering all five runs: commit A's case table (case, classification, probe and control, repair, red-before and green-after), item 9's findings, item 10's rulings with their red-before and green-after, the gate tables, the commit hashes, and any deviation. No process diary.

## Deviation contract

Stop only under § Your decision authority's stop conditions, and then report: expected, found, evidence, done or not done, and one hypothesis.
