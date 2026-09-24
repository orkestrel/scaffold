# Unit TOAST (`to`), round 3 — the token-identity proof (successor of `b-modal-to-brief-2.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote rounds 1 and 2, continued in the worktree
`/home/user/veneer-to` (branch `unit/to` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Every `TOAST_SLOT_CASES` row's token is proved to be the token the slot reads, including where another
token declares the same length, and nothing else changes: the verdict is `to-audit-2-verdict.md`.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/to-audit-2-verdict.md`
and the lane verdicts beside it (`to-audit-2-objective-verdict.md`, claim 6, and
`to-audit-2-checker-verdict.md`); round 2's retained record under the same folder (`to-2.diff`,
`to-shared-2.patch`, `b-modal-to-report-2.md`, `to-instruments/to-mutations-2.log.txt`).

**Law.** As rounds 1 and 2: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief
names; the mid-campaign notes `w2-w3-note-1.md` and `w2-w3-note-2.md`; the round-1 brief
`b-modal-to-brief.md`, whose scope, off-limits list, standing conditions, and host facts bind this round
unchanged; skill: none.

**Host.** As round 1: `/home/user/veneer-to`, npm 11 on `PATH`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
Write every instrument, extract, draft, and log under this worktree's `tmp/units/` or `tmp/probe/` with
the `to` prefix, and nothing into the session scratchpad.

**Measurements.** The `--vn-gutter-x`, `--vn-size-6`, and `--vn-gap-4` tokens each declare `1.5rem` in
`src/styles/_tokens.scss`, so a proof that compares declared or resolved lengths cannot tell them apart.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** As round 2: rebuild the validation copy under `tmp/probe/base/` from
`2a3f223`, your owned files, and your revised shared patch; delete it before the report.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files.

**Shared (report-only).** Round 1's shared files; return one revised `to-shared-3.patch` against
`2a3f223` that supersedes `to-shared-2.patch` whole.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The toast slot cases in
`tests/src/styles/components/toast.test.ts` and the `toast case tables` case in
`tests/setupStyles.test.ts`; nothing else.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-to/tmp/units/to-report-3.md`: T7 with the file, the before and after
code, and the reading that proves it; each gate's command, written as it ran, and its result line on the
rebuilt validation copy; the mutation log `tmp/units/to-mutations-3.log.txt` (the mutated site, the
command, the exits, the summary, the failing case names); the revised patch at
`tmp/units/to-shared-3.patch`; `to-3.diff` and `to-3-status.txt` captured as before. Delivered as that
file plus the same text as the final message. The report follows the writing rule: no count of a
growable set, no list item named by its position, no temporal `new` or `now`, and every code token
followed by a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when T7 cannot be proved without
changing what ships. Decide, record, and carry on for which file holds the retune assertion.

## Fixes

- **T7 (round-2 claim 6).** For each `TOAST_SLOT_CASES` row, retune that row's token alone (a wrapper
  declaring a distinct length for it) and assert the toast's slot follows the retune, restoring nothing
  by hand because the wrapper is scoped to the case. Retain a red run for the spacing row edited to the
  `--vn-size-6` token, and one for it edited to the `--vn-gap-4` token.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check` and `npm run build:src` exit 0; the round-1 style
   proof command, `tests/setupStyles.test.ts` in the setup project, `npm run test:conformance`,
   `npm run test:guides`, and `npm run test:policy` exit 0.
3. T7 is present, and both substitutions carry a retained red run.
4. `to-shared-3.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `to-shared-2.patch` only at the sites T7 names.

**Observations, not criteria.** `npm run test:setup` whole, the journey, `CAPTURE=1`, `test:service`,
and the whole styles project are the Orchestrator's runs at landing.

## Review evidence

`to-3.diff`, `to-3-status.txt`, `to-shared-3.patch`, `to-report-3.md`, and `to-mutations-3.log.txt`.
