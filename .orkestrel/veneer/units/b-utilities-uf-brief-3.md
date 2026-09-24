# Unit UTIL-FONT (`uf`), round 3 — the counts the round-2 audit ruled (successor of `b-utilities-uf-brief-2.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote rounds 1 and 2, continued in the worktree
`/home/user/veneer-uf` (branch `unit/uf` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 2's two counted lines name their members, and nothing else changes: the verdict is
`uf-audit-2-verdict.md`; this brief names the one fix.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/uf-audit-2-verdict.md`
and its lane verdicts (`uf-audit-2-objective-verdict.md`, `uf-audit-2-checker-verdict.md`); round 2's
record under the same folder (`uf-2.diff`, `uf-shared-2.patch`, `b-utilities-uf-report-2.md`).

**Law.** As round 1: `AGENTS.md` in the worktree (§ Writing, the count rule); the scaffold rule files the
round-1 brief names; the mid-campaign notes `w2-w3-note-1.md` to `w2-w3-note-5.md`; the round-1 brief
`b-utilities-uf-brief.md`, whose scope, off-limits list, standing conditions, and host facts bind this
round unchanged; skill: none.

**Host.** As round 1. Write every instrument, extract, draft, and log under this worktree's
`tmp/units/` or `tmp/probe/` with the `uf` prefix, and nothing into the session scratchpad.

**Standing conditions.** The validation copy under `tmp/probe/base/` is rebuilt for this round from
`2a3f223`, your owned files, and your revised shared patch; delete it before the report.

## Unknowns

None.

## Scope

**Owned.** `tests/src/styles/utilities/font.test.ts` (the case title), and any owned line the sweep
finds.

**Shared (report-only).** `tests/setupStyles.ts` (the `FONT_STEP_TABLES` comment), and any shared line
the sweep finds; return one revised `uf-shared-3.patch` against `2a3f223` that supersedes
`uf-shared-2.patch` whole.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The sentences the fix replaces.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-uf/tmp/units/uf-report-3.md`: the fix with its files and the before and
after text; the sweep's pattern, the paths it read, and every hit with its ruling; each gate's command
written exactly as it ran, with every argument, and its result line; the revised patch at
`tmp/units/uf-shared-3.patch`; `uf-3.diff`, `uf-3-status.txt`, and an interdiff against round 2 at
`tmp/units/uf-3-shared-interdiff.txt`. Delivered as that file plus the same text as the final message.
The report follows the writing rule: no temporal `new` or `now`, no count of a growable set, and every
code token followed by a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when the fix cannot be made without
changing what ships beyond the sentence it names. Decide, record, and carry on for re-flowing a comment
the fix touches.

## Fixes

- **F-d.** In the `FONT_STEP_TABLES` comment, replace "the `font` key's single step is the
  `FONT_ENTRY_CASES` table's row" with a sentence naming the step, such as "the `font` key's `monospace`
  step is the `FONT_ENTRY_CASES` table's row". Retitle the `font.test.ts` case "resolves the later value
  of an entry where an element carries two of its classes" so it names the conflict without a tally,
  such as "resolves the later value of an entry where an element carries conflicting classes of it".
  Sweep every line rounds 1 and 2 added to the owned files and the shared patch for a number or number
  word that tallies a set anyone can add to (steps, classes, entries, sizes, keys, rows), and fix each
  hit by naming the members; list what the sweep read.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check`, the round-1 style proof command,
   `tests/setupStyles.test.ts` in the setup project, `npm run test:guides`, and `npm run test:policy`
   exit 0.
3. F-d is present at its sites and the sweep is listed.
4. `uf-shared-3.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `uf-shared-2.patch` only at the F-d sites and any sweep fix the report names.

## Review evidence

`uf-3.diff`, `uf-3-status.txt`, `uf-shared-3.patch`, `uf-3-shared-interdiff.txt`, and `uf-report-3.md`.
