# Unit UTIL-FLOW (`ufl`), round 2 — the audit's fixes (successor of `b-utilities-ufl-brief.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote round 1, continued in the worktree
`/home/user/veneer-ufl` (branch `unit/ufl` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 1's owned files, shared patch, and Route B patch carry every fix the round-1 audit ruled, and
nothing else changes: the verdict is `ufl-audit-verdict.md`; this brief carries each of its findings
and names the one fix for each.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/ufl-audit-verdict.md`
and the three lane verdicts beside it (`ufl-audit-objective-verdict.md`,
`ufl-audit-subjective-verdict.md`, `ufl-audit-checker-verdict.md`); round 1's retained record under the
same folder (`ufl.diff`, `ufl-shared.patch`, `ufl-routeb.patch`, `b-utilities-ufl-report.md`,
`ufl-instruments/`). Where a verdict quotes a replacement sentence, that sentence is the fix.

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names;
`/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`, `b-utilities-family.md`, and
D46 in `decisions-round-2.md`; the mid-campaign notes `w2-w3-note-1.md`, `w2-w3-note-2.md`, and
`w2-w3-note-3.md` beside them; the round-1 brief `b-utilities-ufl-brief.md`, whose scope, off-limits
list, standing conditions, and host facts bind this round unchanged; skill: none.

**Installed primitives.** As round 1.

**Host.** As round 1: `/home/user/veneer-ufl`, npm 11 on `PATH`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
Write every instrument, extract, draft, and log under this worktree's `tmp/units/` or `tmp/probe/` with
the `ufl` prefix, and nothing into the session scratchpad.

**Measurements.** Round 1's gates and mutation logs; the Orchestrator's apply checks (both patches
apply to a fresh `2a3f223` extract, exit 0).

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** As round 1: the validation copy under `tmp/probe/base/` is rebuilt for this
round from `2a3f223`, your owned files, your revised shared patch, and your revised Route B patch;
delete it before the report. Sibling units still run in their own worktrees.

## Unknowns

None.

## Scope

**Owned.** Round 1's owned files.

**Shared (report-only).** Round 1's shared files; return one revised `ufl-shared-2.patch` against
`2a3f223` that supersedes `ufl-shared.patch` whole, and one revised `ufl-routeb-2.patch` that applies
over it and supersedes `ufl-routeb.patch` whole.

**Off-limits.** As round 1.

**What asserts the state this change ends.** The cases each fix edits, the sentences each fix
replaces, and the construction-order lists U5 names; nothing outside round 1's files.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-ufl/tmp/units/ufl-report-2.md`: each fix below by its label with the
file, the before and after text or code, and the reading that proves it; each gate's command and
result line on the rebuilt validation copy; the mutation log for every case this round adds or edits,
retained as `tmp/units/ufl-mutations-2.log.txt` (the mutated site, the command, the exits, the summary,
the failing case names); the revised patches at `tmp/units/ufl-shared-2.patch` and
`tmp/units/ufl-routeb-2.patch`; `ufl-2.diff` and `ufl-2-status.txt` captured as round 1 captured them.
Delivered as that file plus the same text as the final message. The report follows the writing rule:
it states no count of a growable set, names no list item by its position, and follows every code
token with a noun.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the sentence, case, or order it names. Decide, record, and carry on for
re-flowing a paragraph the fix touches and for the name of a setup table U1 adds.

## Fixes

- **U1 (claim 6, case populations).** Move the selector population `['.stretched', '.bare']` in
  `tests/src/styles/components/stretched-link.test.ts` and the corner descriptors in
  `tests/app/browser/sections/LinkSection.test.ts` into frozen, exported tables in
  `tests/setupStyles.ts` bound in `tests/setupStyles.test.ts`, keeping the coordinates derived from the
  live rectangles; derive the float classes `FloatSection.test.ts` lists by hand from `FLOAT_VALUES`,
  `BREAKPOINT_INFIXES`, or the rendered specimens. Prove each derivation reddens when one member is
  dropped, and retain those runs.
- **U2 (claim 8 and claim 4's comment).** In `src/styles/utilities/_overflow.scss`, replace "None of the
  three entries is responsive" with a sentence that names the `overflow`, `overflow-x`, and
  `overflow-y` entries. In the `OBJECT_FIT_*` TSDoc, name the region by where it lies rather than
  "The last region", and replace "both pictures" and "the two pictures" with "the wide and the narrow
  picture". Open the `cover-block` mixin's comment with "Emits", as its sibling mixins' comments open.
  Sweep every added line for the same forms, not only the cited sites.
- **U3 (F1).** Replace "then a tall picture whose box changes its value at the md boundary" in
  `OBJECT_FIT_COPY.paragraph` with "then a tall picture that switches from contain to cover at the md
  boundary", and the matching guide sentence if the guide repeats it.
- **U4 (claim 3's gap).** With `ufl-routeb-2.patch` applied on the copy, delete `right: 0;` from the
  `cover-block` mixin, rebuild, and run the mixins proof, the stretched-link proof, and the card proof;
  the mixins cover case, the stretched-link corner cases, and the card overlay case must go red.
  Restore, and retain the run in `ufl-mutations-2.log.txt`.
- **U5 (region order).** Construct and export the regions in the barrel's order, Float, Object fit,
  Overflow, in `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/app/browser/Showcase.test.ts`,
  and `tests/app/browser/index.test.ts`, and order the guide's utility sections and § Tests links the
  same way.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check` and `npm run build:src` exit 0; the round-1 style
   proof command, the round-1 section proof command, `tests/setupStyles.test.ts` in the setup project,
   `npm run test:conformance`, `npm run test:guides`, and `npm run test:policy` exit 0.
3. Each fix U1 to U5 is present at its site, and U1 and U4 each carry a retained red run.
4. `ufl-shared-2.patch` passes `git apply --check` on a fresh extract of `2a3f223`, `ufl-routeb-2.patch`
   passes it over the applied shared patch and the owned files, and together they differ from round 1's
   patches only at the sites U1 to U5 name.

**Observations, not criteria.** `npm run test:setup` whole, the journey, `CAPTURE=1`, `test:service`,
and the whole styles project are the Orchestrator's runs at landing.

## Review evidence

`ufl-2.diff`, `ufl-2-status.txt`, `ufl-shared-2.patch`, `ufl-routeb-2.patch`, `ufl-report-2.md`, and
`ufl-mutations-2.log.txt`.
