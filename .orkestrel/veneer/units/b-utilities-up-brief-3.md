# Unit UTIL-PAINT (`up`), round 3 — one counted comment (successor of `b-utilities-up-brief-2.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote rounds 1 and 2, continued in the worktree
`/home/user/veneer-up` (branch `unit/up` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

The `_border.scss` comment names its members instead of counting them, and nothing else changes: the
verdict is `up-audit-2-verdict.md`.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/up-audit-2-verdict.md` and its lane verdicts.
**Law.** As round 1: `AGENTS.md` in the worktree (§ Writing, the count rule); the scaffold rule files
the round-1 brief names; the notes `w2-w3-note-1.md` to `w2-w3-note-5.md`; the round-1 brief, whose
scope, off-limits list, standing conditions, and host facts bind this round unchanged; skill: none.
**Host.** As round 1; write nothing into the session scratchpad.

## Unknowns

None.

## Scope

**Owned.** `src/styles/utilities/_border.scss` (the comment), and any owned comment line the sweep
finds. **Shared.** None this round unless the sweep finds a line in a shared patch; then return
`up-shared-3.patch` superseding `up-shared-2.patch` whole. **Off-limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-up/tmp/units/up-report-3.md` and the same text as the final message: the
fix as before and after text; the sweep's pattern, the paths it read, and every hit with its ruling;
each gate's command exactly as it ran with its result line; `up-3.diff` and `up-3-status.txt`. The report
states no temporal word and no tally.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when the fix cannot be made without
changing what ships beyond a comment.

## Fixes

- **P-f.** In the `_border.scss` comment, replace "the five rounded entries" with wording that names the
  rounded entries or drops the tally, keeping the explanation that they share the radius map. Sweep
  every comment and TSDoc line rounds 1 and 2 added for another tally of a growable set.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. `npm run build:src` exits 0 and the round-1 style proof command exits 0 in the worktree.
3. P-f is present and the sweep is listed.

## Review evidence

`up-3.diff`, `up-3-status.txt`, and `up-report-3.md`.
