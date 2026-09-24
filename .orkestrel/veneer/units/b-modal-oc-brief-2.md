# Unit OFFCANVAS (`oc`), round 2 — the audit's fixes (successor of `b-modal-oc-brief.md`)

## Role and engine

`opus` on Opus 5.5, reached as the native subagent that wrote round 1, continued in the worktree
`/home/user/veneer-oc` (branch `unit/oc` from `2a3f223`). The executor that opens this brief is that
subagent.

## Objective

Round 1's owned files and shared patch carry every fix the round-1 audit ruled, and nothing else
changes: the verdict is `oc-audit-verdict.md`; this brief carries each of its findings and names the
one fix for each.

## Context

**Evidence.** The reconciled verdict `/home/user/scaffold/.orkestrel/veneer/units/oc-audit-verdict.md`
and the three lane verdicts beside it (`oc-audit-objective-verdict.md`, `oc-audit-subjective-verdict.md`,
`oc-audit-checker-verdict.md`); round 1's retained record under the same folder (`oc.diff`,
`oc-shared.patch`, `b-modal-oc-report.md`, `oc-instruments/`). Where a verdict quotes a replacement
sentence, that sentence is the fix.

**Law.** As round 1: `AGENTS.md` in the worktree; the scaffold rule files the round-1 brief names;
`/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`; the mid-campaign notes
`w2-w3-note-1.md` and `w2-w3-note-2.md`; the round-1 brief `b-modal-oc-brief.md`, whose scope,
off-limits list, standing conditions, and host facts bind this round unchanged except where § Scope
widens them; the first terrain `b-modal-terrain-report.md` § B for the Offcanvas plugin obligations;
skill: none.

**Host.** As round 1: `/home/user/veneer-oc`, npm 11 on `PATH`, `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`.
Write every instrument, extract, draft, and log under this worktree's `tmp/units/` or `tmp/probe/` with
the `oc` prefix, and nothing into the session scratchpad.

**Measurements.** Round 1's gates and logs; the Orchestrator's apply check (the round-1 patch applies to
a fresh `2a3f223` extract, exit 0). The cascade's layer order is `theme, reset, base, elements,
components, utilities` (`src/styles/_tokens.scss`), and for important declarations an earlier layer
wins.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** As round 1: rebuild the validation copy under `tmp/probe/base/` from
`2a3f223`, your owned files, and your revised shared patch; delete it before the report. The partial
keeps its two emission sites: RAMP-DOWN collapses them after this unit lands. The priority case keeps
its set comparison: LEDGER keys it by condition later.

## Unknowns

- Whether an important background utility paints the inline `.offcanvas-lg` panel at and above its
  boundary on the built cascade. Take the reading on the copy (O-c) and write what ships; where Veneer
  and the release differ, record it as the ledger's departure form requires, and report the category
  the gate prints.

## Scope

**Owned.** Round 1's owned files, and the comment above the offcanvas rules in
`src/styles/components/_navbar.scss` (that comment alone; no rule changes).

**Shared (report-only).** Round 1's shared files; return one revised `oc-shared-2.patch` against
`2a3f223` that supersedes `oc-shared.patch` whole.

**Off-limits.** As round 1, with the exception § Owned names.

**What asserts the state this change ends.** The priority case's title, the section and style proofs
O-b edits or adds runs against, the sentences and comments O-c replaces, and any ledger row the O-c
reading adds; nothing else.

**Tools and limits.** As round 1.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-oc/tmp/units/oc-report-2.md`: each fix below by its label with the file,
the before and after text or code, and the reading that proves it; each gate's command, written as it
ran, and its result line on the rebuilt validation copy; the mutation log for every run O-b adds and
every case this round edits, retained as `tmp/units/oc-mutations-2.log.txt` (the mutated site, the
command, the exits, the summary, the failing case names); the revised patch at
`tmp/units/oc-shared-2.patch`; `oc-2.diff` and `oc-2-status.txt` captured as round 1 captured them.
Delivered as that file plus the same text as the final message. The report follows the writing rule:
no count of a growable set, no list item named by its position, and every code token followed by a
noun; it names each decision rather than counting them.

## Deviation contract

Stop and report per `.agents/orchestration.md` § Deviation protocol when a fix cannot be made without
changing what ships beyond the case, sentence, comment, or ledger row it names. Decide, record, and
carry on for re-flowing a paragraph a fix touches and for the wording of a plugin clause you check
against the release source.

## Fixes

- **O-a (claim 4).** Retitle the priority case so it says what it compares: each sheet's set of
  priorities for a selector and property.
- **O-b (claim 5).** Redo the failing-first section run so the import graph stays whole and the Offcanvas
  proof's cases are collected and fail (mutate the specimens' behaviour, not the exports). Add a run that
  drops or alters the `.offcanvas.showing` rule and one for the `.offcanvas.hiding` rule, and map their
  failing cases in the report's matrix. Give `oc-cascade-probe.cjs.txt` a negative control (a selector
  dropped from, or an extra rule planted in, a copy of the built cascade) and retain its red reading.
- **O-c (claims 8 and 9, F1).**
  - Rewrite the Offcanvas `plugin` row against `node_modules/bootstrap/js/src/offcanvas.js` at the
    worktree, checking each clause: the defaults; the dismiss trigger; the toggle trigger hiding another
    open panel first and returning focus to a visible trigger after the panel hides; the panels shown on
    `load` and the shown panel hidden on `resize` once its `position` is no longer `fixed`; the events,
    with `hidePrevented.bs.offcanvas` firing in place of `hide` for a static backdrop or the `Escape` key
    under `keyboard: false`; the transition completion; the utilities it composes; "Owner: J-ENGINE." at
    the end. Keep the landed Carousel and Alert rows' form.
  - In `### Navbar classes`, say the bar's higher-specificity rule unfixes and shows the panel, and that
    the width, height, border, and transform flags win over the placement rules the offcanvas partial
    writes later at the same specificity.
  - Bound the stacking sentence to retunes that keep the drawer base rung above the drawer backdrop
    rung.
  - Use one term for the large breakpoint.
  - Take the background-utility reading the § Unknowns names and write what ships in place of the
    unproved sentence.
  - In `offcanvas.test.ts`, follow the file token with its noun and restore the dropped article.
  - In `_navbar.scss`, replace the stale comment with "The offcanvas rules turn a panel into part of the
    row; the offcanvas partial writes the panel itself."
  - Sweep every added line for the same forms, not only the cited sites.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. On the rebuilt validation copy: `npm run check` and `npm run build:src` exit 0; the round-1 style and
   section proof commands, `tests/setupStyles.test.ts` in the setup project, `npm run test:conformance`,
   `npm run test:guides`, and `npm run test:policy` exit 0.
3. Each fix O-a to O-c is present at its site, and O-b's runs and the O-c utility reading are retained.
4. `oc-shared-2.patch` passes `git apply --check` on a fresh extract of `2a3f223`, and it differs from
   `oc-shared.patch` only at the sites O-a to O-c name.

**Observations, not criteria.** `npm run test:setup` whole, the journey, `CAPTURE=1`, `test:service`,
and the whole styles project are the Orchestrator's runs at landing.

## Review evidence

`oc-2.diff`, `oc-2-status.txt`, `oc-shared-2.patch`, `oc-report-2.md`, and `oc-mutations-2.log.txt`.
