# Unit UTIL-FONT (`uf`), round 2 — the audit's fixes (successor of `b-utilities-uf-brief.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote round 1, continued in the worktree
`/home/user/veneer-uf` (branch `unit/uf` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 1's owned files and shared patch carry every fix the round-1 audit ruled, and nothing else
changes: the verdict is `uf-audit-verdict.md`; this brief carries each of its findings and names the
one fix for each.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/uf-audit-verdict.md`
and the three lane verdicts beside it (`uf-audit-objective-verdict.md`, `uf-audit-subjective-verdict.md`,
`uf-audit-checker-verdict.md`); round 1's retained record under the same folder (`uf.diff`,
`uf-shared.patch`, `b-utilities-uf-report.md`, `uf-instruments/`). Where a verdict quotes a replacement
sentence, that sentence is the fix.

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names; the
family record `b-utilities-family.md` and the design verdict
`/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`; the mid-campaign notes
`w2-w3-note-1.md` to `w2-w3-note-3.md`; the round-1 brief `b-utilities-uf-brief.md`, whose scope,
off-limits list, standing conditions, and host facts bind this round unchanged; skill: none.

**Host.** As round 1: `/home/user/veneer-uf`, npm 11 on `PATH`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
Write every instrument, extract, draft, and log under this worktree's `tmp/units/` or `tmp/probe/` with
the `uf` prefix, and nothing into the session scratchpad.

**Measurements.** Round 1's gates and mutation logs; the Orchestrator's apply check (the round-1 patch
applies to a fresh `2a3f223` extract, exit 0). The `.fs-1` class resolves 36px where the release caps
at 40px, the `.fs-4` class 20px where the release caps at 24px, and the `.fs-5` class 18px where the
release resolves 20px.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** As round 1: rebuild the validation copy under `tmp/probe/base/` from
`2a3f223`, your owned files, and your revised shared patch; delete it before the report. The
`9 - $level` mapping stays written where it is; a later unit centralizes it.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files.

**Shared (report-only).** Round 1's shared files; return one revised `uf-shared-2.patch` against
`2a3f223` that supersedes `uf-shared.patch` whole.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The binding case F-b moves, the sentences each fix
replaces, and the comment F-c edits; nothing outside round 1's files.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-uf/tmp/units/uf-report-2.md`: each fix below by its label with the file,
the before and after text or code, and the reading that proves it; each gate's command, written as it
ran, and its result line on the rebuilt validation copy; the mutation log for the binding F-b moves,
retained as `tmp/units/uf-mutations-2.log.txt` (the mutated site, the command, the exits, the summary,
the failing case names); the revised patch at `tmp/units/uf-shared-2.patch`; `uf-2.diff` and
`uf-2-status.txt` captured as `git status --porcelain` and `git diff 2a3f223` plus each untracked file
through `git diff --no-index /dev/null`. Delivered as that file plus the same text as the final
message. The report follows the writing rule: no count of a growable set, no list item or criterion
named by its position or number, no temporal `now`, and every code token followed by a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the sentence, case, or table it names. Decide, record, and carry on for
re-flowing a paragraph the fix touches and for the exported name of the table F-b adds.

## Fixes

- **F-a (claim 7 and F1).** In `guides/veneer.md`:
  - Replace "The weights, the styles, and the other line heights stay literal, because no published
    Veneer token carries them." with "The weights, the styles, and the other line heights stay literal.
    A weight class names a point on the weight scale, and the `--vn-weight-body` and
    `--vn-weight-heading` tokens name the weight of a role, so a retuned body weight leaves the
    `.fw-normal` class at 400. No published Veneer token carries a style or the other line heights."
  - Replace the § Showcase sentence with "The font utilities join Type beside the heading classes, whose
    sizes the size classes share."
  - Replace "a retuned body line" and "under a retuned body line" with "a retuned `--vn-line-body` token"
    and "under a retuned `--vn-line-body` token".
  - Append to the `fs` departure bullet: "so the classes resolve Veneer's heading sizes rather than the
    release's: the `.fs-1` class resolves 36px where the release caps at 40px, and the `.fs-5` class
    resolves 18px where the release resolves 20px." Check each value on the copy before writing it.
- **F-b (claim 8, the case matrix).** Move the key, property, and table tuples the binding case in
  `tests/setupStyles.test.ts` iterates into a frozen, exported table in `tests/setupStyles.ts`, iterate
  it in the case, and keep every inventory comparison; prove the case reddens when one tuple is dropped
  from the table, and retain that run.
- **F-c (claim 8, the prose).** In `font.test.ts`, replace "the one read above" with a phrase naming the
  case it points to. Replace "under two parent weights" in the guide, the `fw` compatibility row, and
  the test comment with "under a 400 and a 600 parent weight", and "its first four sizes" with "the
  `.fs-1` to `.fs-4` sizes". Sweep every added line for the same forms, not only the cited sites.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check` and `npm run build:src` exit 0; the round-1 style
   proof command, the round-1 section proof command, `tests/setupStyles.test.ts` in the setup project,
   `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
3. Each fix F-a to F-c is present at its site, and F-b carries a retained red run.
4. `uf-shared-2.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `uf-shared.patch` only at the sites F-a to F-c name.

**Observations, not criteria.** `npm run test:setup` whole, the journey, `CAPTURE=1`, `test:service`,
and the whole styles project are the Orchestrator's runs at landing.

## Review evidence

`uf-2.diff`, `uf-2-status.txt`, `uf-shared-2.patch`, `uf-report-2.md`, and `uf-mutations-2.log.txt`.
