# Unit UTIL-FLOW (`ufl`), round 3 — the TSDoc token nouns (successor of `b-utilities-ufl-brief-2.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote rounds 1 and 2, continued in the worktree
`/home/user/veneer-ufl` (branch `unit/ufl` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Every code token and `{@link}` tag in the TSDoc round 2 added is followed by its noun, and nothing else
changes: the verdict is `ufl-audit-2-verdict.md`.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/ufl-audit-2-verdict.md`
and `ufl-audit-2-objective-verdict.md` (claim 3) beside it; round 2's retained record
(`ufl-shared-2.patch`, `ufl-routeb-2.patch`, `b-utilities-ufl-report-2.md`).

**Law.** As rounds 1 and 2: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names,
with `.claude/rules/writing.md` for the token-noun rule and `.claude/rules/documentation.md` for how a
`{@link}` tag reads; the round-1 brief `b-utilities-ufl-brief.md`, whose scope, off-limits list,
standing conditions, and host facts bind this round unchanged; skill: none.

**Host.** As round 1: `/home/user/veneer-ufl`, npm 11 on `PATH`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
Write every instrument, extract, draft, and log under this worktree's `tmp/units/` or `tmp/probe/` with
the `ufl` prefix, and nothing into the session scratchpad.

**Control identifiers.** None.

**Standing conditions.** As round 2: rebuild the validation copy under `tmp/probe/base/` from
`2a3f223`, your owned files, and your revised patches; delete it before the report.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files; none changes this round unless the sweep finds a site there.

**Shared (report-only).** `tests/setupStyles.ts` this round; return one revised `ufl-shared-3.patch`
against `2a3f223` that supersedes `ufl-shared-2.patch` whole, and `ufl-routeb-3.patch` equal to
`ufl-routeb-2.patch` unless the revised shared patch shifts its context.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The `computeCornerPoints`, `HIT_CORNERS`, and
`STRETCHED_LINK_HOSTS` doc blocks; `npm run test:policy` reads the comments.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-ufl/tmp/units/ufl-report-3.md`: U6 with each sentence before and after;
each gate's command, written as it ran, and its exit on the rebuilt validation copy, with the log path in
place of a repeated test total; the revised patches at `tmp/units/ufl-shared-3.patch` and
`tmp/units/ufl-routeb-3.patch`; `ufl-3.diff` and `ufl-3-status.txt` captured as before. Delivered as that
file plus the same text as the final message. The report follows the writing rule, every file and class
token in it followed by its noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix needs a change beyond a
TSDoc or comment sentence. Decide, record, and carry on for the noun each token takes.

## Fixes

- **U6.** Write "such as a live `DOMRect` instance a proof reads", "in the order the {@link HIT_CORNERS}
  table names the corners", and "each corner of the {@link HIT_CORNERS} table reaches". Sweep every line
  rounds 1 and 2 added to the owned files and both patches for a code token or `{@link}` tag with no
  noun after it, fix each hit, and list the sweep's pattern and paths in the report.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check`, `tests/setupStyles.test.ts` in the setup project,
   `npm run test:guides`, and `npm run test:policy` exit 0.
3. U6 is present at each site, and the sweep's pattern, paths, and hits are listed.
4. `ufl-shared-3.patch` passes `git apply --check` on a fresh extract of `2a3f223`, `ufl-routeb-3.patch`
   over it and the owned files, and they differ from round 2's patches only in comment and TSDoc lines.

## Review evidence

`ufl-3.diff`, `ufl-3-status.txt`, `ufl-shared-3.patch`, `ufl-routeb-3.patch`, and `ufl-report-3.md`.
