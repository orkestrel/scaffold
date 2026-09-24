# Unit BCF (`bcf`), round 3 — the collapsed bar's in-flow menu and the release's static placement attribute

## Role and engine

`opus` on Opus 5.5, the same native subagent that wrote rounds 1 and 2, in the worktree `/home/user/veneer-bcf`
(branch `unit/bcf`, round 2's uncommitted edits over `f4e5693`). The executor that opens this brief is that
subagent.

## What changed and why

Round 2's report named the subjective lane's referrals R3 to R6 (`bcf-audit-subjective-verdict.md`
§ Referrals) as carried by no brief. The Orchestrator rules them here:
- **R3 (retention and bare output) and R7 (the guide collision)** are closed on the record: R3 is the round's
  report form, and round 2's patch appends BCF's sentence without rewrapping PAGE-FRAME's.
- **R4 (the dark-1280 capture log)** is settled by the Orchestrator's capture runs at landing.
- **R5 and R6** are this round's work. They change a proof and a specimen, and both sit in files this unit
  owns.

Rounds 1 and 2's briefs stand for everything this one does not change. The audit that follows runs over
rounds 2 and 3 together.

## Objective

- **R5 — the collapsed bar's in-flow menu.** No case reads where an open menu inside a collapsed bar lands,
  since round 1 filtered the hang case to bars carrying a `navbar-expand` class; the comment introducing
  those cases in `tests/app/browser/sections/NavbarSection.test.ts` ("the following cases read where each
  one lands") claims more than they read. Add the reading: every shown menu inside a bar without an
  expansion class sits in flow (its computed `position` is `static`, as the release's
  `.navbar-nav .dropdown-menu` rule writes), over a population derived from `NAVBAR_SPECIMENS` that the case
  requires non-empty. Retain the red run of a mutation that makes such a menu absolute, and make the
  comment say exactly what the cases read.
- **R6 — the release's static placement attribute.** The release's dropdown script writes
  `data-bs-popper="static"` on a menu inside a navbar (`node_modules/bootstrap/js/src/dropdown.js`, the
  `this._inNavbar` branch that calls `Manipulator.setDataAttribute(this._menu, 'popper', 'static')`). The
  `Navbar hanging menu` specimen's menu carries it; the `Navbar opened` specimen's shown menu does not, so the
  TSDoc sentence beside them contradicts that specimen. Give every shown navbar menu in `NAVBAR_SPECIMENS`
  the attribute the script writes, and read in a proof that each one carries it (a population derived from
  the table, non-empty). Record in the report what the attribute changes in the resolved cascade of the
  `Navbar opened` menu (the `.dropdown-menu[data-bs-popper]` rule's `top`, `left`, and `margin-top`), read
  in the browser before and after.

## Context

Law, host, and tools as round 1's brief states. Each changed or added proof runs red first, and each red run
is retained in `tmp/units/bcf-mutations-3.log.txt`.

**Standing conditions.** As round 2. CLOSE-OUT runs in `/home/user/veneer-xo` and owns none of this round's
files.

## Scope

**Owned.** `app/browser/constants.ts` (the `NAVBAR_SPECIMENS` table and its TSDoc) and
`tests/app/browser/sections/NavbarSection.test.ts`. Round 2's owned set stays owned; this round edits no
other file unless a named case goes false, and the report names each such file.

**Shared (report-only).** `guides/veneer.md`: a sentence the change makes false goes into `bcf-shared-3.patch`
against `f4e5693`, superseding `bcf-shared-2.patch` whole. When no sentence changes, say so, and
`bcf-shared-2.patch` stands.

**Off-limits.** As round 2.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-bcf/tmp/units/bcf-report-3.md` and the same text as the final message: each
item's change, its proof, and its red run; the before and after cascade reading R6 names; each gate's command
exactly as it ran with every argument, its exit, and its result line; `bcf-3.diff` (the whole diff against
`f4e5693`, rounds 2 and 3 together) and `bcf-3-status.txt` under `tmp/units/`. The report states no tally of
a growable set and no temporal word, and follows every code token with a noun.

## Deviation contract

As round 1. Decide, record, and carry on for the case titles, where each added case sits, and the comment's
wording. Stop when the attribute moves a frame the capture registry pins in a way a proof reddens on, and
report the reading.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. The section command of round 2's criterion 3 exits 0, and each added reading reddens on its mutation.
3. `npm run test:setup` exits 0.
4. When the guide changes, `npm run test:guides` exits 0 in a scratch copy under `tmp/probe/` with
   `bcf-shared-3.patch` applied.

**Observations, not criteria.** The capture runs are the Orchestrator's at landing.

## Review evidence

`bcf-3.diff`, `bcf-3-status.txt`, the shared patch that stands, `bcf-report-3.md`, and
`bcf-mutations-3.log.txt`.
