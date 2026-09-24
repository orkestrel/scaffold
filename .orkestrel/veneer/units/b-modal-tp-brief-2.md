# Unit TIP (`tp`), round 2 — the audit's fixes (successor of `b-modal-tp-brief.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote round 1, continued in the worktree
`/home/user/veneer-tp` (branch `unit/tp` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 1's owned files and shared patch carry every fix the round-1 audit ruled, and nothing else
changes: the verdict is `tp-audit-verdict.md`; this brief carries each of its findings and names the
one fix for each.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/tp-audit-verdict.md`
and the three lane verdicts beside it (`tp-audit-objective-verdict.md`, `tp-audit-subjective-verdict.md`,
`tp-audit-checker-verdict.md`); round 1's retained record under the same folder (`tp.diff`,
`tp-shared.patch`, `b-modal-tp-report.md`, `tp-instruments/`). Where a verdict quotes a replacement
sentence, that sentence is the fix.

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names;
`/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (M2 on developer-written states, M5
on the `.fade` rule); the mid-campaign notes `w2-w3-note-1.md` and `w2-w3-note-2.md` beside the verdict;
the round-1 brief `b-modal-tp-brief.md`, whose scope, off-limits list, standing conditions, and host
facts bind this round unchanged; skill: none. `tests/src/styles/fixtures/mixins.scss` is Shared for
this round, granted with the mixin case.

**Installed primitives.** As round 1. The installed `@orkestrel/test` exports no `visitBreakpoint`;
the tree's `tests/setupBrowser.ts` copy is the one to use.

**Host.** As round 1: `/home/user/veneer-tp`, npm 11 on `PATH`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
Write every instrument, extract, draft, and log under this worktree's `tmp/units/` or `tmp/probe/` with
the `tp` prefix, and nothing into the session scratchpad.

**Measurements.** Round 1's gates and mutation logs; the Orchestrator's apply check (the round-1 patch
applies to a fresh `2a3f223` extract, exit 0).

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** As round 1: the validation copy under `tmp/probe/base/` is rebuilt for this
round from `2a3f223`, your owned files, and your revised shared patch; delete it before the report.
Sibling units still run in their own worktrees. The paragraph under the stacking table stays as the
base has it; MODAL rewrites it.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files.

**Shared (report-only).** Round 1's shared files; return one revised `tp-shared-2.patch` against
`2a3f223` that supersedes `tp-shared.patch` whole.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The cases each fix edits or adds, the sentences each fix
replaces, and the registrations P2 adds; nothing outside round 1's files.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-tp/tmp/units/tp-report-2.md`: each fix below by its label with the file,
the before and after text or code, and the reading that proves it; each gate's command, written as it
ran, and its result line on the rebuilt validation copy; the mutation log for every case this round
adds or edits and every run P1 names, retained as `tmp/units/tp-mutations-2.log.txt` (the mutated
site, the command, the exits, the summary, the failing case names); the revised patch at
`tmp/units/tp-shared-2.patch`; `tp-2.diff` and `tp-2-status.txt` captured as round 1 captured them.
Delivered as that file plus the same text as the final message. The report follows the writing rule:
no count of a growable set, no list item named by its position, no temporal `new` or `now`, and every
code token followed by a noun; it names what each mutation run changed.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the sentence, case, specimen, or table it names. Decide, record, and carry on
for re-flowing a paragraph the fix touches, the `Untitled popover` markup's body copy, and the form of
the P5 binding.

## Fixes

- **P1 (claim 3).** Execute the T-box mutation (an inset or the text size in `_tooltip.scss` written as
  the release's literal) and the P-box mutation (the same in `_popover.scss`), each on the copy with a
  rebuild, and retain both runs red in `tp-mutations-2.log.txt`.
- **P2 (claims 5a and 7).** Add an `Untitled popover` specimen: the bottom placement, an empty
  `.popover-header`, a populated `.popover-body`, and its own `id`. Add its `CaptureSubject` member and a
  resting `CASCADE_KEYS` row that reads a property a rule sets on the body, and widen the section
  proofs' populations to include it while the explicit-side assertions keep deriving from
  `TIP_PLACEMENTS`. Remove the empty-header decline from the `POPOVER_SPECIMENS` TSDoc, the
  `CASCADE_KEYS` remarks, and the guide. In the Popover `plugin` row, say the release removes the
  header or body when its content is falsy.
- **P3 (claim 5b).** Write each popover header as the release template's `h3` element in
  `POPOVER_SPECIMENS` and in the section proof's expectation, and say so in the TSDoc and the guide.
- **P4 (claims 5c and 7).** In the TSDoc and in `### Tooltip classes` and `### Popover classes`, name
  every utility the arrow carries: "…and the `position-absolute` utility with the `start-50` and
  `translate-middle-x` utilities, or the `top-50` and `translate-middle-y` utilities, on its arrow".
- **P5 (claim 6).** Bind `TIP_ARROW_PROPERTIES` to the inventory in `tests/setupStyles.test.ts` by
  derivation from the recorded arrow declarations of both keys, and prove the binding reddens when one
  property is dropped from the table; retain the run.
- **P6 (claims 7 and 8, and the fade referral).**
  - In the Tooltip `plugin` row, add that the release sets the `show` class, and the `fade` class when
    the tip is animated; in the Popover row, make the `fade` clause conditional the same way. Add one
    sentence to `### Tooltip classes` saying no tooltip rule reads the `fade` class.
  - Replace "its triangle paints the tip's fill on the side toward the host" with "its triangle paints
    the tip's fill on its border facing the tip, so it points at the host", and retitle the
    `tooltip.test.ts` and `popover.test.ts` cases that say "toward it" the same way.
  - Replace every positional name of the arrow's triangles ("the first", "the second") in the guide, the
    `_popover.scss` comment, and `popover.test.ts` with "the `::before` triangle" and "the `::after`
    triangle".
  - Replace "on each side of its host" with "at each explicit placement".
  - Give the tooltip's arrow literals the popover's reason (an arrow is geometry, not spacing).
  - Assert the 390 width limit in `PopoverSection.test.ts`: a popover's width is under `276px` at 390 and
    equal to `276px` at 1280, and retain its red run with the assertion inverted.
  - In the `reset-text` comment, write "resolves the `start` keyword".
  - In the outside-ledger sentence on Elements' popover asymmetry, name both owners: J-ENGINE opens and
    closes a popover, and CROSS-FADE ships the `.fade` rule.
  - Sweep every added line for the same forms, not only the cited sites.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check` and `npm run build:src` exit 0; the round-1 style
   proof command, the round-1 section proof command, `tests/setupStyles.test.ts` and `tests/setup.test.ts`
   in the setup project, `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy`
   exit 0.
3. Each fix P1 to P6 is present at its site, and P1, P5, and the P6 width assertion each carry a
   retained red run.
4. `tp-shared-2.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `tp-shared.patch` only at the sites P1 to P6 name.

**Observations, not criteria.** `npm run test:setup` whole, the journey, `CAPTURE=1`, `test:service`,
and the whole styles project are the Orchestrator's runs at landing.

## Review evidence

`tp-2.diff`, `tp-2-status.txt`, `tp-shared-2.patch`, `tp-report-2.md`, and `tp-mutations-2.log.txt`.
