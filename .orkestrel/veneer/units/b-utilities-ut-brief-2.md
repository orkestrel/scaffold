# Unit UTIL-TEXT (`ut`), round 2 — the audit's fixes (successor of `b-utilities-ut-brief.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote round 1, continued in the worktree
`/home/user/veneer-ut` (branch `unit/ut` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 1's owned files and shared patch carry every fix the round-1 audit ruled, the pair helper loads
ahead of the colored-link helper as the release loads it, and nothing else changes: the verdict is
`ut-audit-verdict.md`; this brief names the one fix for each finding.

## Context

**Evidence.** `/home/user/scaffold/.orkestrel/veneer/units/ut-audit-verdict.md` and its three lane
verdicts beside it; round 1's record (`ut.diff`, `ut-shared.patch`, `b-utilities-ut-report.md`,
`ut-instruments/`). Where a verdict quotes a replacement sentence, that sentence is the fix.

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names; the
family record and the design verdict; the notes `w2-w3-note-1.md` to `w2-w3-note-5.md`; the round-1
brief, whose scope, off-limits list, standing conditions, and host facts bind this round unchanged
except where T-d changes the partial layout; skill: none.

**Ruling that changes round 1's layout.** The `.text-bg-*` pairs leave the head of `_color.scss` and
ship from their own partial, `src/styles/utilities/_color-bg.scss`, in the utilities layer, loaded in the
barrel ahead of `utilities/link`, as the release's `_helpers.scss` loads `color-bg` before
`colored-links`. The partial is Owned for this round.

**Host.** As round 1. Write every instrument, extract, and log under this worktree's `tmp/units/` or
`tmp/probe/` with the `ut` prefix, and nothing into the session scratchpad.

**Standing conditions.** The validation copy under `tmp/probe/` is rebuilt for this round from
`2a3f223`, your owned files, and your revised shared patch; delete it before the report. UTIL-PAINT's
revised profiles patch (`up-unscoped-profiles-2.patch` beside the verdict) is the profiles proof the
wave lands with; read the service project over your copy with that patch applied, as an observation.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files, plus `src/styles/utilities/_color-bg.scss`. **Shared (report-only).**
Round 1's shared files; return one revised `ut-shared-2.patch` against `2a3f223` that supersedes
`ut-shared.patch` whole. **Off-limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-ut/tmp/units/ut-report-2.md` and the same text as the final message: each
fix by its label with the file, the before and after text or code, and the reading that proves it; each
gate's command exactly as it ran with every argument, its exit, and its result line; the mutation log
for every case this round adds or edits, retained as `tmp/units/ut-mutations-2.log.txt`; the revised
patch at `tmp/units/ut-shared-2.patch`; `ut-2.diff` and `ut-2-status.txt`; an interdiff of the patch
against round 1 at `tmp/units/ut-2-shared-interdiff.txt`. The report states no tally of a growable set
and no list item by position, and follows every code token with a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the partial, case, sentence, or specimen it names. Decide, record, and carry
on for re-flowing a paragraph a fix touches.

## Fixes

- **T-a (claim 5).** Redo the "pairs in the components layer" control so it moves the pair rules into the
  top-level components layer, re-run the cases it names, and retain the run.
- **T-b (claim 8).** Rewrite the `### Text utilities` opening as the subjective lane gives it ("The text
  formatting entries of the `text` key ship in the utilities layer from the
  `src/styles/utilities/_text.scss` partial: …", with a pointer to § Color utilities for the key's
  colours); qualify the `text` row with "except the `.text-truncate` helper, which the `text-truncate`
  row records"; restrict the text-opacity statement to the release's colour-map entries; replace the
  prefixed-decoration bullet with § Icon links' sentence that the build emits the prefixed alias from the
  standard property; add "proof" after each bare proof path in the `link` rows and "flag" after the
  importance token in the Tailwind paragraph.
- **T-c (claim 9).** Write "a two-twelfths column" for the `.col-2` column; write "A normal rule inside
  the utilities layer outranks a normal rule in the components layer" in the truncation proof's comment;
  write "behavior".
- **T-d (pair-link-order, F1).** Move the pairs into `src/styles/utilities/_color-bg.scss`, loaded ahead
  of `utilities/link` in the barrel; set the order case's `helperPaths` entry for `color-bg` to that path;
  update the `### Files` rows and § Color utilities; add a proof case that reads
  `<a class="text-bg-light link-danger">` resolving the danger link colour, as the release does, and
  retain its red run with the pairs loaded after the link helper.
- **T-e (F2).** Put the `text-dark` specimen on the light pair's surface, as the remark's rule says, with
  the matching reading in `ColorSection.test.ts`.
- **T-f (F3).** Write "…and the pairs that set the foreground the release records on each role's fill" in
  `COLOR_COPY`.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check` and `npm run build:src` exit 0; the round-1 style and
   section proof commands, `tests/setupStyles.test.ts` in the setup project, `npm run test:conformance`
   (the order case among them), `npm run test:guides`, and `npm run test:policy` exit 0.
3. T-a to T-f are present at their sites, and T-a and T-d carry retained red runs.
4. `ut-shared-2.patch` passes `git apply --check` on a fresh extract of `2a3f223`.

**Observations, not criteria.** The service project with UTIL-PAINT's revised profiles patch, the whole
styles project, the journey, and `CAPTURE=1` are the Orchestrator's runs at landing.

## Review evidence

`ut-2.diff`, `ut-2-status.txt`, `ut-shared-2.patch`, `ut-2-shared-interdiff.txt`, `ut-report-2.md`, and
`ut-mutations-2.log.txt`.
