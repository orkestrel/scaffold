## Verdict — TOGGLES (`tg`) audit round 2, checker (claims 1, 6, 7)

**Dispatch defect noted first:** the brief's Context section instructs the checker to verify base-hash equality through `git -C /home/user/veneer-tg show a658879:<path>` and to confirm `git apply --check`, but my tool allowlist is `Read`, `Grep`, `Glob` only — no command execution. Per the checker charter this is a dispatch defect naming a command I cannot run; I have ruled every sub-clause reachable through Read/Grep and flagged the one sub-clause that rests only on the writer's self-quoted command output.

### Claim 1 — Delta and scope

CONFIRMED, with one sub-clause UNRESOLVED.

- File lists match exactly. `tg-2-status.txt` lines 1–6 list precisely `src/styles/components/_button-group.scss`, `src/styles/components/_input-group.scss`, `tests/app/browser/sections/ButtonGroupSection.test.ts`, `tests/app/browser/sections/InputGroupSection.test.ts`, `tests/src/styles/components/button-group.test.ts`, `tests/src/styles/components/input-group.test.ts`.
- `tg-2.diff` `diff --git` headers (lines 1, 66, 93, 218, 307, 478) touch exactly those six files, no more.
- `_input-group.scss` is byte-identical to round 1: `tg.diff:65-91` and `tg-2.diff:66-92` show the identical `index 3fe0e3c..37b2bcb` hunk, same content.
- `tg-shared-2.patch` `diff --git` headers (lines 1, 106, 980, 1040, 1367) touch exactly `app/browser/constants.ts`, `guides/veneer.md`, `tests/setup.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts` — nothing else. No line touches a vendored file, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, or `ROADMAP.md`.
- `index` lines (`tg-shared-2.patch:2,107,981,1041,1368`) carry the base hashes `18b0a6da…`, `605d1a55…`, `8ec9f251…`, `daef14f5…`, `bbe11e6e…`, matching the report's stated hashes (`b-collapse-tg-report-2.md:291-294`) exactly, and matching round 1's base hashes for the same files (continuity with the round-1 ruling the Orchestrator names as given).
- UNRESOLVED: "applies to `a658879` (`git apply --check`)" rests only on the report's own quoted command and exit reading (`b-collapse-tg-report-2.md:295-298`); I have no exec tool to reproduce it, so per the falsification law this sub-clause cannot be CONFIRMED from my evidence.

### Claim 6 — The gates

CONFIRMED. Each gate log under `tg-instruments-2/logs/` shows `exit=0` and the exact counts the report states:

- `gate-format.log.txt:8-10` — `All matched files use the correct format.`, `exit=0`.
- `gate-lint.log.txt:6` — `exit=0`, no findings.
- `gate-check.log.txt:30` — `exit=0`.
- `gate-build.log.txt:58` — `exit=0`.
- `gate-setup.log.txt:7-8` — `Tests  114 passed (114)`, `exit=0`.
- `gate-styles.log.txt:146-151` — `Tests  61 passed (61)`, `exit=0`.
- `gate-sections.log.txt:77-82` — `Tests  9 passed (9)`, `exit=0`.
- `gate-conformance.log.txt:11-16` — `Tests  22 passed (22)`, `exit=0`.
- `gate-guides.log.txt:11-16` — `Tests  19 passed (19)`, `exit=0`.
- `gate-policy.log.txt:11-16` — `Tests  109 passed | 1 skipped (110)`, `exit=0`.

All ten match `b-collapse-tg-report-2.md:260-269` exactly, each logged and each taken after the last edit per the report's timestamps.

**Counts the report states, listed** (acceptance criterion): `347 insertions(+), 14 deletions(-)` over `6 files` (`report:37`); `801 insertions(+), 420 deletions(-)` over `5 files` (`report:288`); `114 passed (114)`; `61 passed (61)`; `9 passed (9)`; `22 passed (22)`; `19 passed (19)`; `109 passed | 1 skipped (110)`; `113 passed (114)` (eight table-control rows, `report:236-243`); `1575 lines`, SHA-256 `d0ddeffd1b3bd3c1905e3514169dd315355ab2928ca1541dbbbbf397f8424715` (`report:275-276`). Each is a measurement cited beside the run or command that produced it, which the writing rule permits.

### Claim 7 — Law and report

CONFIRMED.

- No `any`, no `as` type assertion (the only `as` occurrences are TypeScript generic annotations such as `ReadonlyArray<readonly [boolean, number]>`, not assertions), no `!` non-null assertion, no `@ts-*` suppression, no `eslint-disable`, no mock/spy/fake clock, no nested function declaration beyond an arrow callback passed directly to `.map`/`.filter`/`.find` — verified across `tg-2.diff` (full read) and `tg-shared-2.patch` (full read of `app/browser/constants.ts`, `guides/veneer.md`, `tests/setup.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts` diffs).
- No new exported helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export; the new exports (`BUTTON_GROUP_SPLIT_CASES`, `BUTTON_GROUP_CARET_CASES`, `BUTTON_GROUP_SPLIT_FORMS`, `INPUT_GROUP_TOGGLE_CASES`) are frozen test-fixture tables, not framework helpers.
- Writing rule sweep across `tg-2.diff`, `tg-shared-2.patch`, and `b-collapse-tg-report-2.md` for every unconditionally banned substitution-table term (`should`, `simply`, `easy`, `just`, `utilize`, `leverage`, `e.g.`, `i.e.`, `etc.`, `performant`, `robust`, `allows you to`, `and/or`, `please`, `sanity check`, `dummy`, `blacklist`/`whitelist`, `master`/`slave`) returned no matches.
- No list item is named by its position; the "first-child" hits (`report:211`) are the literal CSS `:first-child` pseudo-class, not a positional list reference.
- Each token followed by a noun: spot-checked across the guide diff and doc-block diff (`app/browser/constants.ts`, `guides/veneer.md`) — every backticked token (`.dropdown-toggle-split`, `has-validation`, `dropdown-menu-end`, etc.) is followed by a noun or reads as a selector literal in a code context.
- The report records each gate's command and result line matching the logs (confirmed under claim 6), bounds each choice it names under § Deviations and choices, and names the retained patch path (`report:9-10, 275-279`).

### Findings outside the claims (BROKEN standard)

None. No defect was found and independently proven outside claims 1, 6, and 7 during this read.

VERDICT: FAIL 1; outside the claims: none

The sole reason for FAIL rather than PASS is claim 1's `git apply --check` sub-clause, which is UNRESOLVED because it rests only on the writer's self-quoted command output and I hold no tool to reproduce it — every other examined element of claims 1, 6, and 7 is CONFIRMED on direct evidence.
