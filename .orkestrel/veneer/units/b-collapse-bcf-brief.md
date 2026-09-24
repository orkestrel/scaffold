# Unit BCF (`bcf`) — the disclosure family's capture fixes (B-COLLAPSE VERIFY)

## Role and engine

`opus` on Opus 5.5, a native subagent in the worktree `/home/user/veneer-bcf` (branch `unit/bcf` from the
session head `dc92a09`). The executor that opens this brief is that subagent.

## Objective

The disclosure family's portfolio shows what the verify verdict's rows name: resting frames start
with the pointer released, the `nav-tabs` specimen holds its open menu, every open dropdown's toggle
carries its open state, the `dropdown-align-*` toggles fit their columns at 390, the unframed states
have frames, and the `.dropdown-header` weight is ruled against the ledger. The accordion section's
proof derives its specimen names.

## Context

**Design.** `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md`: this unit carries
rows V2, V3, V4, V5, V6, V14, and V18, each with the ruling in its row. The re-baseline of 2026-09-24
moves row V1 (the focus and hover page frames become element frames over the lifted live specimen) to
the PAGE-FRAME unit, which runs beside this one in `/home/user/veneer-pf`; do not convert an existing
page frame. The `ROADMAP.md` § Carriers row in the worktree naming `AccordionSection.test.ts` gives this unit
the accordion proof's derivation. The lens returns behind each row are
`/home/user/scaffold/.orkestrel/veneer/units/bc-verify-lenses.json` and `bc-verify-lenses-2.json`.

**The rows, restated as the work.**

- **V2 and V18.** `navbar-scroll--dark-390`, `navbar-inverted--dark-1280`, and
  `navbar-inverted-class--dark-1280` each paint one resting link near its hover tint. The verdict
  rules it a capture-order defect: a pointer an earlier driven scenario left over a link. A probe
  names the cause before the fix; the resting capture starts with the pointer released. The
  installed `releasePointer` function is already imported by `tests/app/browser/integration.test.ts`.
- **V3.** `nav-tabs` at 1280 crops the open menu at the frame's bottom edge; the specimen gets the
  room its menu paints into.
- **V4.** Every open-dropdown specimen writes `show` on the menu only; each open specimen's toggle
  carries `show` too, as the engine writes it.
- **V5.** The `dropdown-align-*` toggles overrun their `col-6` column at 390 at every step; the labels
  or the columns change so each toggle fits.
- **V6.** Three states take a specimen or a driven scenario with frames: the accordion's last item
  expanded, `nav-underline` hover and focus, and an open menu inside an expanded navbar. A focus frame
  follows the lifted-specimen shape the `dropdown-menu-focus` scenario uses (the live specimen moved
  to the document's start and put back, the frame over the specimen).
- **V14.** Read whether the `.dropdown-header` weight is a recorded departure in the `#### dropdown`
  ledger rows of `guides/veneer.md`; record the row if it is missing, with the release value read from
  `node_modules/bootstrap/dist/css/bootstrap.css` and the value Veneer resolves.

**Terrain, at `dc92a09` (re-measure before editing).** The specimen tables are `DROPDOWN_SPECIMENS`,
`NAV_SPECIMENS`, `ACCORDION_SPECIMENS`, and `NAVBAR_SPECIMENS` in `app/browser/constants.ts`. The
capture registry is `tests/setup.ts` (`CASCADE_KEYS`, `DRIVEN_KEYS`, and `CAPTURE_SCENARIOS`); the
rows `nav-tabs`, `nav-underline`, `dropdown-align-sm` to `dropdown-align-xxl`, `navbar-scroll`,
`navbar-inverted`, and `navbar-inverted-class` sit in `CASCADE_KEYS`, and `nav-tabs-hover` and
`accordion-base-focus` in `DRIVEN_KEYS`. The section proofs are `tests/app/browser/sections/{Accordion,
Dropdown,Nav,Navbar}Section.test.ts`.

**Standing conditions.**
- The capture's portfolio case (`portfolio > reads every frame this variant left in the portfolio
  directory inside its declared region`) fails at `dc92a09` for two reasons PAGE-FRAME carries: every
  page frame at the 1280-wide variants is over the browser's decode ceiling, and the
  `bottom-offcanvas` region at 390 is read in a layout the shot does not use. The journey writes every
  frame before that case runs, so a `CAPTURE=1` run still writes this unit's frames; read the failure
  of that case as this standing condition and report any other failing case.
- Other units run beside this one: FADE, LEDGER, and PAGE-FRAME. Their shared patches touch
  `tests/setup.ts`, `tests/app/browser/integration.test.ts`, `app/browser/constants.ts`, and the guide,
  and every patch merges three-way at landing.
- The container is loaded. A timing failure is an observation you report with its command; the
  Orchestrator re-runs it alone after you exit.

**Law.** `AGENTS.md` in the worktree; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,documentation,writing,architecture}.md`;
the notes `/home/user/scaffold/.orkestrel/veneer/units/w2-w3-note-1.md` and `w2-w3-note-2.md`; skill:
none. Every added case runs red first against the tree without its fix, and each named mutation's red
run is retained. A test is named for what it proves, never for a row identifier.

**Host.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`; the worktree's `node_modules` is a hard-linked copy. Build
the styles (`npm run build:src`) before any browser proof. A capture run is
`CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:<variant>*"`
with a variant from `light-1280`, `dark-1280`, `light-390`, and `dark-390`; run one variant at a time.
Write every instrument, extract, and log under the worktree's `tmp/units/` or `tmp/probe/` with the
`bcf` prefix, and nothing into the session scratchpad or the system temporary directory.

## Unknowns

- The cause of V2: which driven scenario leaves the pointer where the resting frames are shot. Probe it
  and record the reading before the fix.
- Whether V14's weight is a departure the ledger already records. Read and record.

## Scope

**Owned.** `app/browser/constants.ts` (the four disclosure specimen tables and their TSDoc);
`tests/app/browser/integration.test.ts` (the pointer staging before the resting frames, and the V6
driven scenarios); `tests/setup.ts` (the registry rows this unit adds or changes, and their TSDoc);
`tests/app/browser/sections/{Accordion,Dropdown,Nav,Navbar}Section.test.ts`; and any case in
`tests/setup.test.ts` or `tests/app/browser/Showcase.test.ts` whose assertion a registry or specimen
change makes false, each named in the report.

**Shared (report-only).** `guides/veneer.md` (the V14 ledger row, § Showcase, and each sentence the
specimen or registry changes make false; find them by searching the guide for each changed specimen
label and scenario stem, and name the searches in the report). Return one `bcf-shared.patch` against
`dc92a09` and edit nothing there.

**Off-limits.** `src/styles/**` (a row that needs a cascade change stops the unit); `tests/setupBrowser.ts`
and `tests/setupBrowser.test.ts` (PAGE-FRAME's); every frame placement that calls the `page` method of
the `FrameManager` class (PAGE-FRAME's); `tests/fixtures/oracle/**`; `src/browser/**`; `src/core/**`;
`tests/src/**`; `configs/**`; the manifests; the vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`,
and `tests/config.test.ts`; `ROADMAP.md` (the Orchestrator's fold).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`; scoped
runs only; a probe lives under `tmp/probe/` and is deleted before the report.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-bcf/tmp/units/bcf-report.md` and the same text as the final message:
for each row, what changed, the proof or frame that shows it, and the red run or the frame before and
after; the V2 probe's reading; the V14 ruling with both values; the frames this unit's scenarios wrote,
each named by path; each gate's command exactly as it ran with every argument, its exit, and its
result line; the mutation log `tmp/units/bcf-mutations.log.txt`; `bcf-shared.patch`, `bcf.diff`, and
`bcf-status.txt` under `tmp/units/`. The report states no tally of a growable set, no temporal word, and
no list item by position, and follows every code token with a noun.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a row needs
an off-limits file, when the V2 probe names a cause outside the pointer, or when a specimen change
reddens a case the owned set does not hold. Decide, record, and carry on for specimen labels, the
added scenarios' stems, case titles, the order of added rows inside their tables, and where each
added case sits in its file.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files and `npm run lint:check` exit 0; `npm run check` exits 0.
2. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser
   tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts
   tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts
   tests/app/browser/Showcase.test.ts` exits 0, and the accordion proof's derivation reddens when a
   specimen is added to `ACCORDION_SPECIMENS` and the proof's list is not changed with it.
3. `npm run test:setup` exits 0 with the added registry rows.
4. `npm run test:guides` exits 0 in a scratch copy under `tmp/probe/` with `bcf-shared.patch` applied.
5. A `CAPTURE=1` run at each variant writes every frame this unit adds or changes, and every case other
   than the portfolio case the standing conditions name exits green; each changed frame is named in the
   report with what it shows.

**Observations, not criteria.** The whole suite, `npm run test:service`, and the portfolio readback at
the 1280-wide variants are the Orchestrator's runs after PAGE-FRAME lands.

## Review evidence

`bcf.diff`, `bcf-status.txt`, `bcf-shared.patch`, `bcf-report.md`, `bcf-mutations.log.txt`, and the
frames the report names. The capture frames are the review input for every row about a rendered
surface; source is corroboration.
