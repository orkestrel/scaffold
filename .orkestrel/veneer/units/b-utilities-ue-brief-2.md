# Unit UTIL-EFFECT (`ue`), round 2 — the audit's fixes (successor of `b-utilities-ue-brief.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote round 1, continued in the worktree
`/home/user/veneer-ue` (branch `unit/ue` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 1's owned files and shared patch carry every fix the round-1 audit ruled, and nothing else
changes: the verdict is `ue-audit-verdict.md`; this brief carries each of its findings and names the
one fix for each.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/ue-audit-verdict.md`
and the three lane verdicts beside it (`ue-audit-objective-verdict.md`, `ue-audit-subjective-verdict.md`,
`ue-audit-checker-verdict.md`); round 1's retained record under the same folder (`ue.diff`,
`ue-shared.patch`, `b-utilities-ue-report.md`, `ue-instruments/`). Where a verdict quotes a replacement
sentence, that sentence is the fix.

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names; the
family record `b-utilities-family.md` and the design verdict
`/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`; the mid-campaign notes
`w2-w3-note-1.md` to `w2-w3-note-3.md`; the round-1 brief `b-utilities-ue-brief.md`, whose scope,
off-limits list, standing conditions, and host facts bind this round unchanged; skill: none.

**Host.** As round 1: `/home/user/veneer-ue`, npm 11 on `PATH`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
Write every instrument, extract, draft, and log under this worktree's `tmp/units/` or `tmp/probe/` with
the `ue` prefix, and nothing into the session scratchpad.

**Measurements.** Round 1's gates and logs; the Orchestrator's apply check (the round-1 patch applies
to a fresh `2a3f223` extract, exit 0). The `--bs-box-shadow*` aliases are declared on `:root` over the
`--vn-shadow-*` tokens, so a subtree that retunes the elevation factor or a shadow step moves no
`.shadow*` class; only an alias set on the subtree does.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** As round 1: rebuild the validation copy under `tmp/probe/base/` from
`2a3f223`, your owned files, and your revised shared patch; delete it before the report.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files.

**Shared (report-only).** Round 1's shared files; return one revised `ue-shared-2.patch` against
`2a3f223` that supersedes `ue-shared.patch` whole.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The registry row E-b drops and the capture cases that read
it, the sentences and comment E-c replaces, and the runs E-a adds; nothing else.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-ue/tmp/units/ue-report-2.md`: each fix below by its label with the file,
the before and after text or code, and the reading that proves it; each gate's command, written as it
ran, and its result line on the rebuilt validation copy; the mutation log for every run E-a adds and
every case this round edits, retained as `tmp/units/ue-mutations-2.log.txt` (the mutated site, the
command, the exits, the summary, the failing case names); the revised patch at
`tmp/units/ue-shared-2.patch`; `ue-2.diff` and `ue-2-status.txt` captured as `git status --porcelain`
and `git diff 2a3f223` plus each untracked file through `git diff --no-index /dev/null`. Delivered as
that file plus the same text as the final message. The report follows the writing rule: no count of a
growable set, no list item named by its position, and every code token followed by a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the row, sentence, or comment it names. Decide, record, and carry on for
re-flowing a paragraph a fix touches.

## Fixes

- **E-a (claim 3).** Run the `.shadow-sm` alias swap (the class written over another step's alias) on
  the copy and retain it red. Give `ue-cascade-keys.mjs` negative controls: an extra `.shadow-xl` rule
  planted in a copy of the built cascade, and one utility's `!important` dropped there; retain the
  readings that report the extra selector and the priority mismatch.
- **E-b (claim 6).** Drop the `default-focus-ring` resting row from `CASCADE_KEYS`; keep the
  `Default focus ring` subject for its `default-focus-ring-focus` driven row; record in the
  `CASCADE_KEYS` remarks, beside the declines already there, that the helper paints only under focus,
  so its frame is the driven row; update any case or list that enumerates the resting row.
- **E-c (claim 7 and F1).** In the guide:
  - Exclude the `.shadow-none` class from "Each class reads the release's own alias byte for byte" and
    from the `shadow` compatibility row, and say it writes the absence value.
  - Replace the opacity sentence with "A step also overrides the opacity a component rests at, because
    the utilities layer follows the components layer: each bar in the Opacity region overrides the
    `0.5` opacity of the `.placeholder` class." Run the reading behind it on the copy (a `.opacity-25`
    bar with the utility's `!important` dropped still resolves `0.25`) and retain it.
  - Say the factor and step retunes move a shadow class when set on the root element, and that a
    subtree moves a shadow class only by setting the alias.
  - Replace "as it does in the release, where the utility follows the helper" with "as it does in the
    release, where the utility's `!important` flag beats the helper's normal declaration".
  In `focus-ring.test.ts`, replace the comment with "The important shadow utility beats the helper's
  normal declaration whatever layer each sits in, as it does in the release." Sweep every added line
  for the same forms, not only the cited sites.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check` and `npm run build:src` exit 0; the round-1 style and
   section proof commands, `tests/setupStyles.test.ts` and `tests/setup.test.ts` in the setup project,
   `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
3. Each fix E-a to E-c is present at its site, and E-a and the E-c opacity reading each carry a
   retained run.
4. `ue-shared-2.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `ue-shared.patch` only at the sites E-a to E-c name.

**Observations, not criteria.** `npm run test:setup` whole, the journey, `CAPTURE=1`, `test:service`,
and the whole styles project are the Orchestrator's runs at landing.

## Review evidence

`ue-2.diff`, `ue-2-status.txt`, `ue-shared-2.patch`, `ue-report-2.md`, and `ue-mutations-2.log.txt`.
