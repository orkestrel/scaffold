# Unit UTIL-SPACING (`usp`), round 2 — the audit's fixes (successor of `b-utilities-usp-brief.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote round 1, continued in the worktree
`/home/user/veneer-usp` (branch `unit/usp` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 1's owned files and shared patch carry every fix the round-1 audit ruled, and nothing else
changes: the verdict is `usp-audit-verdict.md`; this brief names the one fix for each finding.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/usp-audit-verdict.md` and its three lane
verdicts beside it; round 1's record (`usp.diff`, `usp-shared.patch`, `b-utilities-usp-report.md`,
`usp-instruments/`). Where a verdict quotes a replacement sentence, that sentence is the fix.

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names; the
family record and the design verdict; the notes `w2-w3-note-1.md` to `w2-w3-note-5.md`; the round-1
brief, whose scope, off-limits list, standing conditions, and host facts bind this round unchanged;
skill: none.

**Host.** As round 1. Write every instrument, extract, and log under this worktree's `tmp/units/` or
`tmp/probe/` with the `usp` prefix, and nothing into the session scratchpad or the system temporary
directory.

**Standing conditions.** The validation copy under `tmp/probe/` is rebuilt for this round from
`2a3f223`, your owned files, and your revised shared patch; delete it before the report. UTIL-PAINT's
revised profiles patch (`up-unscoped-profiles-2.patch` beside the verdict) is the profiles proof the
wave lands with; read the service project over your copy with that patch applied, as an observation.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files. **Shared (report-only).** Round 1's shared files; return one revised
`usp-shared-2.patch` against `2a3f223` that supersedes `usp-shared.patch` whole. **Off-limits.** As
round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-usp/tmp/units/usp-report-2.md` and the same text as the final message:
each fix by its label with the file, the before and after text or code, and the reading that proves it;
each gate's command exactly as it ran with every argument, its exit, and its result line; the mutation
log for every case this round adds or edits, retained as `tmp/units/usp-mutations-2.log.txt`; the
revised patch at `tmp/units/usp-shared-2.patch`; `usp-2.diff` and `usp-2-status.txt`; an interdiff of
the patch against round 1 at `tmp/units/usp-2-shared-interdiff.txt`. The report states no tally of a
growable set, no temporal word, and no list item by position, and follows every code token with a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the case, sentence, name, or instrument it names. Decide, record, and carry
on for re-flowing a paragraph a fix touches and for the wording of S6.

## Fixes

- **S1 (claims 4 and 6).** In `SpacingSection.test.ts`, derive the auto-margin names from
  `SPACING_SIDE_CASES` and the side order from the shorthand entry's `sides` field, keeping a bespoke
  expectation per name. Make every auto-margin member's assertion distinguish its auto margin written as
  `0`: the `.me-auto` card reads its distance from the line's end or its sibling, and the `.my-auto`
  reading uses a context where the stretch default does not already center the box. Retain a red run per
  member with the auto margin written as `0`.
- **S2 (claim 7).** Write "…with the `!important` flag"; write "…the `pointer-events-none`,
  `pointer-events-auto`, and `select-*` utilities"; replace the density sentence with the subjective
  lane's sentence: "…moves the margin and padding the `1` to `5` steps set, and a retuned
  `--vn-space-8` token moves the margin the `.m-3` rule sets and the padding the `.p-3` rule sets on every
  side."
- **S3 (claim 8).** Give the importance token its noun in the `spacing.test.ts` and `interaction.test.ts`
  comments, and the `auto` field and the boolean values their nouns in the `SPACING_*` TSDoc. Sweep every
  added line for the same form.
- **S4 (F1).** Rename the `initial` field of `SPACING_PROPERTY_CASES` to `prefix`, the setup file's term,
  in the table, its TSDoc, its binding case, and every reader.
- **S5 (F2).** Write "the `none` and `auto` value keys" and "The `user-select` key".
- **S6 (F3).** Rewrite the Interaction copy so it says what one click on each link does: a click on the
  link that takes no pointer events lands on what lies beneath it, and a click on each other link
  reaches that link.
- **S7 (claim 2).** Give the cascade census `usp-cascade.mjs` a negative control: a copy of the built
  cascade with a planted extra selector under the unit's keys and a copy with one declaration written
  normal each read red, and the built cascade reads green; retain the runs.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check` and `npm run build:src` exit 0; the round-1 style and
   section proof commands, `tests/setupStyles.test.ts` in the setup project, `npm run test:conformance`,
   `npm run test:guides`, and `npm run test:policy` exit 0.
3. S1 to S7 are present at their sites, and S1 and S7 carry retained red runs.
4. `usp-shared-2.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `usp-shared.patch` only at the sites S1 to S6 name and their re-flow.

**Observations, not criteria.** The service project with UTIL-PAINT's revised profiles patch, the whole
styles project, the journey, and `CAPTURE=1` are the Orchestrator's runs at landing.

## Review evidence

`usp-2.diff`, `usp-2-status.txt`, `usp-shared-2.patch`, `usp-2-shared-interdiff.txt`, `usp-report-2.md`,
and `usp-mutations-2.log.txt`.
