# Unit journey-cost-check — Objective check of veneer journey run-cost plan v3

## Role and engine

Analyst (objective check) on gpt-6-astra, effort high, reached as `codex exec` under the `read-only` sandbox. Executor: BENCH_ENGINE. This unit is READ-ONLY: write no file other than the final message the CLI records.

## Objective

Return a verdict (holds, holds with corrections, fails), with evidence and listed corrections, on each of six questions about the veneer journey run-cost tuning plan, third draft: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/plan-v3.md`.

## Context

- **Evidence.**
  - Plan and inputs, folder `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/`: `plan-v3.md` (under check), `measure.md`, `proposal-0-Instrument-level--cu.json`, `proposal-1-Structure-level--cha.json`, `proposal-2-Runtime-level--the-V.json`, `judge.md` (v1), `critic.md`, `plan-v2.md`, `plan-v2-checks.json` (38 findings v3 claims to close), `README.md`.
  - Code the plan changes, checkout `/home/user/veneer` at commit 4d21de7: `/home/user/veneer/tests/app/browser/integration.test.ts`, `/home/user/veneer/tests/setupBrowser.ts`, `/home/user/veneer/tests/setupStyles.ts`, `/home/user/veneer/configs/app/vite.journey.config.ts`, `/home/user/veneer/vite.config.ts`, `/home/user/veneer/configs/browsers.ts`, `/home/user/veneer/package.json`.
  - Runs the plan cites: run A (858.59 s) `/home/user/veneer/tmp/units/tokens-t3/journey-6.log`; run B (817.88 s, preserved copy) `/home/user/veneer/tmp/units/tokens-t3/review/landing-prev/test_journey.log`; the 591.13 s run with per-case timings `/home/user/veneer/tmp/units/flip-preservation/journey-4.json`; the landing gates `/home/user/veneer/tmp/units/flip-gates-2/gates-4d21de7.txt`.
  - J0c records: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/j0c-brief.md`, `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/j0c-scope.md`, `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/j0c-report.md`.
  - Lanes log: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` (§ Rules, § Host-bound set).
- **Law.** `/home/user/scaffold/.claude/rules/tests.md`; `/home/user/scaffold/.claude/rules/writing.md`. The user's constraint: no proof lost (every assertion, control, reading, and logged line's content kept).
- **Installed primitives.** none read by this unit.
- **Host (as the plan targets it).** Linux, 4 CPUs, 15 GB RAM, Playwright Chromium at `/opt/pw-browsers`, util-linux `flock`, worktrees each with their own `node_modules`. Working path `/home/user/veneer`. Your sandbox: read-only, network denied, no servers, no subprocess trees. Do not run the test suite or any browser; recompute figures from the logs with read-only commands (e.g. `grep`, `awk`, `node -e` reading files).
- **Standing conditions.** A nested `git` in the sandbox may report `not a git repository`; do not diagnose the checkout. If `git` works, `git -C /home/user/veneer show 4d21de7:<path>` is fine to confirm file content at that commit.

## Unknowns

Any figure you cannot recompute from the cited logs: mark it `unverified` with the reason; do not estimate.

## Scope

- **Owned.** none (read-only).
- **Shared (report-only).** all files above; propose corrections as text, not patches applied.
- **Off-limits.** writes anywhere.
- **Made false by this change.** none.
- **Tools and limits.** read-only shell commands only.

## Execution

Perform the assignment yourself and spawn nothing. Answer each question with evidence (file and line, or a figure recomputed from the logs):

1. Does every adopted item keep every assertion, control, reading, and logged line's content? Name any item that loses one.
2. Are the figures right: the per-project model, the end rule, the scale factors, the floor/central/ceiling sums, the modeled reductions? Recompute at least the layer-1 sums and one row of the end table from the logs.
3. Is the plan feasible on this host as written, in particular the lock or queue protocol, the memory measure, the evidence handling, and the lane order?
4. Does v3 close each of the 38 findings in `plan-v2-checks.json` as its 'Check findings closed' section claims? Give a per-finding row (id, closed / partly / not, evidence).
5. What is the smallest set of items whose savings are measured rather than modeled, and what floor can the acceptance hold the unit to?
6. Which questions genuinely need the user, and is each recommendation sound?

## Output

Final message in Markdown: per question, a verdict line (holds | holds with corrections | fails), the evidence (path:line or recomputed figure with the command), and a numbered corrections list. Then the 38-row findings table. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) if a cited file is missing or unreadable, or if answering would require a write. Settle reading-order and recomputation-method choices yourself and record them.

## Acceptance criteria

1. Every one of the six questions carries a verdict and evidence.
2. Layer-1 sums and at least one end-table row are recomputed from the logs with the command shown.
3. All 38 findings in `plan-v2-checks.json` appear in the table.

**Observations, not criteria.** none.

**Measurement.** Run logs A and B and the per-case timings JSON above are the loads every cost figure is read under.

## Review evidence

The plan, its inputs, and the logs listed above; no diff (read-only).
