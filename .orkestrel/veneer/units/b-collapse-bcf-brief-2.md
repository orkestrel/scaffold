# Unit BCF (`bcf`), round 2 — derived populations, one containment helper, a bound ring check, the hanging-menu name

## Role and engine

`opus` on Opus 5.5, the same native subagent that wrote round 1, in the worktree `/home/user/veneer-bcf`
(branch `unit/bcf`). Before this dispatch the Orchestrator committed round 1 on `unit/bcf` and merged the
session branch into it, so the worktree holds round 1's edits over the session head that carries PAGE-FRAME.
The executor that opens this brief is that subagent.

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/bcf-audit-verdict.md` and the three lane
verdicts beside it) confirmed rows V2 to V6, V14, and V18 against the frames and the mutations, and carried
B-a to B-e. Two referrals in the subjective lane's verdict (`bcf-audit-subjective-verdict.md` § Referrals,
R1 and R2) reached no lane and no carrier in the round-1 verdict; this round carries them as B-f and inside
B-a. Round 1's brief (`b-collapse-bcf-brief.md`) stands for everything this one does not change.

## Objective

- **B-a — derived populations (objective lane, claim 7; subjective referral R2).** No section proof
  iterates a literal list of specimen names or breakpoint steps where the population is a specimen table's.
  The panel-corner case in `tests/app/browser/sections/AccordionSection.test.ts` (the case "hands the outer
  bottom corners to the panel of an expanded last item and squares its button") derives its readings from
  `ACCORDION_SPECIMENS`, keeping its ordinary-accordion scope, and reddens when a specimen is added to the
  table alone. Each `['sm', 'md', 'lg', 'xl', 'xxl']` population in
  `tests/app/browser/sections/DropdownSection.test.ts` derives from the `dropdown-align-*` rows of
  `DROPDOWN_SPECIMENS`, or, where the case's population is the breakpoints rather than the specimens, from
  the `BREAKPOINT_INFIXES` constant `tests/setupStyles.ts` exports (the infixes above `xs`); name which in the
  report, and retain the added-row red run for each converted case.
- **B-b — the "first pixel" sentence (objective lane, claim 8).** The shared patch takes PAGE-FRAME's
  rewrite of that sentence, which the session head's guide carries, and drops BCF's own rewrite of it.
- **B-c — one containment helper (subjective lane, F4).** The menu-containment loop that
  `DropdownSection.test.ts`, `NavSection.test.ts`, and `NavbarSection.test.ts` each carry becomes one
  exported helper in `tests/setupBrowser.ts` with its own case in `tests/setupBrowser.test.ts`, and the three
  sections call it. Name it `{verb}{Noun}` per `.claude/rules/names.md`; it returns the measured population
  and the escaped entries, and each section asserts both. The helper's case reddens on a menu moved past its
  specimen's edge and on an empty population.
- **B-d — the hanging-menu name (subjective lane, F2).** The specimen label `Navbar with open menu` becomes
  `Navbar hanging menu`, stem `navbar-hanging-menu`, in `NAVBAR_SPECIMENS`, the `CaptureSubject` union and the
  `CASCADE_KEYS` row in `tests/setup.ts`, the `NavbarSection.test.ts` names, the case title, and each prose
  site; confirm by search that no existing stem is a prefix of the new one.
- **B-e — prose (subjective lane, F1 and F3).** One sentence in the `NAV_SPECIMENS` TSDoc records that at
  390 the open menu lies over the strip's wrapped row and that the disabled tab reads in the 1280 frame; the
  guide patch's four sentences take the subjective lane's fixes (a), (b), (c), and (d), reworded where the
  merged guide requires.
- **B-f — the ring check bound to the shot (subjective referral R1).** In the `nav-underline-focus` case
  of `tests/app/browser/integration.test.ts`, the ring-containment reading measures the element the
  placement shot, so placing the frame on the specimen instead of its padded wrapper reddens the case.
  Retain that mutation's red run, taken with `CAPTURE=1`, and re-run the `v6-underline-unregistered`
  mutation with `CAPTURE=1`, so the held-after-shot assertions run against a placement that took its shot.

## Context

Law, host, and tools as round 1's brief states. The page-frame design verdict
`/home/user/scaffold/.orkestrel/veneer/units/pf-design-verdict.md` binds every placement: every frame the
`FrameManager` class places is bounded to the opening, the section holding the subject, and any lifted
specimen, and every pointer-held placement sits on a lifted specimen behind the structural guard
`expect(mounted.host.querySelector('main')?.contains(<host>)).toBe(false)`, which a pointer-held placement
this round adds or moves carries too. Each changed or added proof runs red first, and each red run is
retained in `tmp/units/bcf-mutations-2.log.txt`.

**Standing conditions.**
- The engine session's Placement proof in `tests/src/browser/Placement.test.ts` fails on Veneer `main` and on
  the session head; it is outside this unit and never a reason to stop.
- THEME runs beside this unit in `/home/user/veneer-ct` and edits `tests/setupServer.ts`, the `Color modes`
  section, and the theme partials; nothing it owns overlaps this round's owned files.
- A capture run is the Orchestrator's observation at landing, except the `CAPTURE=1` runs B-f names; a
  timing failure is an observation you report with its command.

## Scope

**Owned.** Round 1's owned files; `tests/setupBrowser.ts` (the added helper and its TSDoc, nothing else in
the file) and `tests/setupBrowser.test.ts` (the helper's case).

**Shared (report-only).** `guides/veneer.md`. Return one `bcf-shared-2.patch` against the merged head
`unit/bcf` carries at dispatch that supersedes `bcf-shared.patch` whole, and edit nothing there.

**Off-limits.** As round 1, less the two `setupBrowser` files; the `FrameManager` class and every existing
export of `tests/setupBrowser.ts`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-bcf/tmp/units/bcf-report-2.md` and the same text as the final message: each
item's change, with before and after for every rewritten sentence; the red runs, B-f's among them; each
gate's command exactly as it ran with every argument, its exit, and its result line; `bcf-2.diff` (against
the merged head), `bcf-2-status.txt`, and `bcf-shared-2.patch` under `tmp/units/`. The report states no
tally of a growable set and no temporal word, and follows every code token with a noun, list labels
included.

## Deviation contract

As round 1. Decide, record, and carry on for the helper's name and signature, the exact wording of each
rewritten sentence, and where each added case sits in its file. Stop when the merged head leaves a round-1
case red for a cause outside this brief.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. `npm run test:setup` and `npm run test:setup:browser` exit 0, and the helper's case reddens on both its
   mutations.
3. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser
   tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts
   tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts
   tests/app/browser/Showcase.test.ts` exits 0, and each converted population reddens on its added row.
4. The B-f mutation reddens the `nav-underline-focus` case under `CAPTURE=1` at one variant, and the
   unmutated run passes it.
5. `npm run test:guides` exits 0 in a scratch copy under `tmp/probe/` with `bcf-shared-2.patch` applied.

**Observations, not criteria.** The capture runs at every variant are the Orchestrator's at landing.

## Review evidence

`bcf-2.diff`, `bcf-2-status.txt`, `bcf-shared-2.patch`, `bcf-report-2.md`, and `bcf-mutations-2.log.txt`.
