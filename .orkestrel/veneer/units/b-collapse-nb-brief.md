# Unit NAVBAR (`nb`) — the `navbar` key and the `$assets` retirement

## Role and engine

`opus` on Opus 5 (the alias serves `claude-opus-5`), reached as a native Claude subagent in the
worktree `/home/user/veneer-nb` (branch `unit/nb` from `a658879`, the commit on which wave 1 has
landed). The executor that opens this brief is that subagent.

## Objective

The `navbar` key ships in the cascade, the showcase, the proofs, the capture registry, the
ledger, and the guide, with the expanded, collapsed, opened, scroll, dark, and per-breakpoint
expand states rendered at rest; the dark toggler icon lands on the component rule; the emptied
`$assets` mechanism, its `_theme.scss` walk, and the undeclared-key case retire; the forced-colours
ring rides the toggler.

## Context

**Evidence.** The oracle surface (terrain § A): `.navbar` with its custom properties (`--bs-navbar-padding-x`
through `-toggler-transition`), `.navbar-brand`, `.navbar-nav` reassigning `--bs-nav-link-*`,
`.navbar-text`, `.navbar-collapse`, `.navbar-toggler`, `.navbar-toggler-icon`, `.navbar-nav-scroll`
(reading `--bs-scroll-height` with the `75vh` fallback), `.navbar-expand` and `.navbar-expand-{infix}`
inside `media-breakpoint-up`, the `.navbar-expand-* .offcanvas` overrides, `.navbar-dark` and
`.navbar[data-bs-theme="dark"]` retuning the colour and toggler variables, the dark
`.navbar-toggler-icon` retune, `.navbar-light` emitting nothing; the `%container-flex-properties`
extend onto the container combinators, which `_container.scss` already emits (R2: author no
combinator). The pinned inventory records the `navbar` key's selectors (terrain § A lists them), and the `nav` and `dropdown`
keys record `.navbar`-bearing selectors NAV and DROPDOWN deferred with owner `Navbar` at `a658879`
(`grep -n "Navbar" guides/veneer.md`): this unit ships each in `_navbar.scss` and deletes its row.
`$assets` in `src/styles/_tokens.scss` (around line 163) holds `toggler-icon`, `accordion-icon`, and `accordion-active-icon`, `_theme.scss` walks it with an `@error` (around lines 19 to 23), `tests/setupStyles.test.ts` carries the undeclared-key case (around lines 591 to 593), `COMPONENT_DARK_ASSETS` sits in `tests/setupStyles.ts` (around line 2818), and the theme proof's asset case is `tests/src/styles/theme.test.ts` (around line 135, "carries the unlanded components' dark assets"); after ACCORDION's patch the map holds this entry alone, so the unit
deletes it, retires the map, the `_theme.scss` walk and its `@error`, and the undeclared-key case
in `tests/setupStyles.test.ts` (R3), and rewrites the theme proof's asset case in
`tests/src/styles/theme.test.ts` because no unlanded asset remains. `breakpoint-each` and
`visitBreakpoint` exist; `GRID_BREAKPOINT_CASES` names the boundaries (`grep -n GRID_BREAKPOINT_CASES tests/setupStyles.ts`).

**Law.** `AGENTS.md`; `.claude/rules/{styles,tests,browser,names,documentation,writing,architecture}.md`;
the skill: none; the guide `guides/veneer.md`; the family record
`/home/user/scaffold/.orkestrel/veneer/units/b-collapse-family.md` (rulings 1 to 17, the shared and
off-limits files, the gates, the host facts) and the design verdict
`/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md` (R1 to R19); the B-PASSIVE
records `b-passive-family.md` and `b-passive-baseline.md` still bind; D41 in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`. The family record wins over
this brief where they disagree: stop and report the disagreement.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/core/index.d.cts`
and its `browser` entry: `build`, `mount`, `createRecorder`, `recordEvents`, `stageMedia`,
`readStyle`, `readPixels`, `visitBreakpoint`, `pressKeys`, `traverseAccessible`; read the entry
before writing a helper) and `@orkestrel/contract` (`isInstance`, `literalOf`, and the guard
vocabulary in `node_modules/@orkestrel/contract/dist/src/core/index.d.cts`). A helper, guard,
wait, recorder, or deferred whose job an installed export does is a defect; the checker probes the
diff for a new exported symbol against those entries.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-nb` (branch `unit/nb` from `a658879`);
npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(run it first in every shell; the manifest's `devEngines` pin refuses npm 10); network reachable;
Chromium installed; no sandbox; a `CAPTURE=1` journey run of one variant takes about two minutes and
is the Orchestrator's observation, not this unit's criterion.

**Measurements.** Taken by the staging script at `a658879` in the worktree before the unit starts
(`npm ci --ignore-scripts` and `npm run build:src` exit 0; the log sits beside this brief as
`nb-stage.log.txt`). The unit runs `npm run test:conformance` and the scoped styles project over its
sibling proofs first and records the exits; a red reading at the baseline is a standing condition to
report, never to repair.

**Control identifiers.** None. A test is named for what it proves, never for the row or ruling that
specified it.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and
restored by `scaffold repair`: never edit them; the policy sweep reads every comment and every
authored Markdown file for the banned terms in `.claude/rules/writing.md` § Substitutions and
enforces the mirror law. `git status --porcelain` is empty at `a658879`. The sibling wave-2 units
run in their own worktrees on disjoint files; a shared file is report-only for every one of them. ALERT, CAROUSEL, and the UTIL units land on the session branch while this unit runs, so the Orchestrator applies the shared patch with three-way resolution at landing and a moved context line is not this unit's concern; the section is appended after the last constructed section at `a658879` (`NavSection`), where the Orchestrator moves it if a sibling lands first.
Wave 1 (COLLAPSE, DROPDOWN, NAV) has landed at `a658879`, so `_collapse.scss`, `_dropdown.scss`,
and `_nav.scss` ship and their state classes render.

## Unknowns

- Whether the Layout specimens hosted in `<div class="navbar">` gain the navbar's padding and flex
  (`grep -n "navbar" app/browser/constants.ts tests/src/styles/components/container.test.ts`): the
  unit runs `container.test.ts` first and reports; a changed Layout frame is an observation.
- Whether ACCORDION's `$assets` patch has integrated at `a658879`: if the map still holds the
  accordion entries, the unit deletes its own row only and reports the map's remaining entries
  (the retirement then waits for ACCORDION's landing as a serial patch the Orchestrator applies).

## Scope

**Owned.** `src/styles/components/_navbar.scss`, `tests/src/styles/components/navbar.test.ts`,
`app/browser/sections/NavbarSection.ts`, `tests/app/browser/sections/NavbarSection.test.ts`,
`tests/src/styles/theme.test.ts` (the asset case), `tests/src/styles/components/container.test.ts`
(only if its reading of the navbar host changes), `src/styles/_theme.scss` (the `$assets` walk and
its `@error`), `tests/setupStyles.test.ts` (the undeclared-key case).

**Shared (report-only).** `src/styles/index.scss` (the `@use` line at Bootstrap's position, ruling
8), `tests/setup.ts` and `tests/setup.test.ts` (the `CaptureSubject` members, the `CASCADE_KEYS` and
`DRIVEN_KEYS` rows appended at the end), `tests/setupStyles.ts` and `tests/setupStyles.test.ts`
(any case table), `tests/app/browser/integration.test.ts` (the driven frames), `tests/app/browser/Showcase.test.ts`
and `tests/app/browser/index.test.ts` (the region and export enumerations), `tests/conformance.test.ts`
(the `listed` literal and the order case's expected list), `tests/setupServer.test.ts` (the
compatibility component set), `app/browser/constants.ts` (`<KEY>_COPY`, `<KEY>_SPECIMENS`),
`app/browser/Showcase.ts` and `app/browser/index.ts` (the section), `guides/veneer.md` (every
section, row, and sentence the unit adds or changes, ruling 12), `ROADMAP.md`. For each, the unit
returns an exact patch (a unified diff against `a658879`, or the appended rows verbatim with the
anchor line they follow) in its report and edits nothing there.

**Off-limits.** Every other unit's owned files (ACCORDION: `_accordion.scss`, `accordion.test.ts`,
`AccordionSection.ts`, `AccordionSection.test.ts`; TOGGLES: `_button-group.scss`, `_input-group.scss`,
`button-group.test.ts`, `input-group.test.ts`, `ButtonGroupSection.test.ts`,
`InputGroupSection.test.ts`), `src/browser/**`, `src/core/**`, `tests/src/browser/**`,
`tests/setupServer.ts`, `tests/fixtures/**`, `package.json`, `package-lock.json`, `README.md`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, every partial the unit does not own, every file
under `configs/`.

**What asserts the state this change ends.** The conformance `listed` literal, the ledger and
deferral gates (the `Navbar` rows leave), the order case (Shared); the showcase enumerations
(Shared); `src/styles/_tokens.scss` (`$assets` and its doc comment; Shared patch);
`COMPONENT_DARK_ASSETS` in `tests/setupStyles.ts` (Shared patch); the Layout frames (observation);
`tests/guides.test.ts` (through the integrator).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git
checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format`, `lint
--fix`; `npm run build:src` and `npm run build:src:styles` are permitted (the conformance and
ledger proofs read the built cascade); scoped runs only; a runtime probe lives under `tmp/probe/`
and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-nb/tmp/units/nb-report.md` (the report states no count of a growable set and names no list item by its position) with: the proof matrix (every recorded
selector and condition of the key → proof case, distinguishing mutation, specimen, capture
scenario; ruling 15), the ledger rows written (`#### <key>` departures and `### Additions`) with the
comparison's own category for each, the exact patch for every shared file (ruling 13), the
scoped gate exits with their commands, every deviation, and a closing list of what the unit could
not close. Delivered as that file plus the same text as the final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on a recorded selector the cascade cannot emit without an engine, on a proof whose
reading differs between the worktree and the family record's expectation, on a shared-file change
that cannot be expressed as an appended row or a bounded patch, and on any disagreement between
this brief, the family record, and the tree. Decide, record, and carry on from a specimen's copy,
a section's paragraph order, a case title, and the position of a row inside its table.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. `npm run check` exits 0.
3. `npm run build:src` exits 0, and the built cascade carries every `navbar`-keyed selector the inventory records and every `.navbar`-bearing selector NAV and DROPDOWN deferred, with its declarations and conditions, and no `.navbar-light` rule.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/navbar.test.ts tests/src/styles/theme.test.ts tests/src/styles/components/container.test.ts` exits 0, and each navbar case distinguishes its named mutation: at each boundary and one pixel below it, `.navbar-collapse` display, the toggler's display, `.navbar-nav` flex direction, and the menu's `position` (mutation: `breakpoint-up` with a neighbouring name); `.navbar-expand` expanded at 375 (mutation: treated as a breakpoint variant); `.navbar[data-bs-theme=dark]` and `.navbar-dark` each retuning every colour and toggler variable (mutation: `.navbar-dark` dropped from the list); a plain element in dark reading an empty toggler asset (mutation: the asset left at theme scope); `max-height` falling back to `75vh` without `--bs-scroll-height` (mutation: the fallback missing); a link inside `.navbar-nav` reading the navbar's colour (mutation: the `--bs-nav-link-*` reassignment dropped); above the boundary, `.offcanvas` static with its header hidden (mutation: the rule dropped); the toggler's focus ring, its forced-colours outline, and the reduced-motion reading.
5. The section proof exits 0 under the config the sibling section proofs use, and `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/setupStyles.test.ts` exits 0 with the undeclared-key case retired.
6. The report carries the ledger rows, the resting rows (`Navbar expanded`, `Navbar collapsed`, `Navbar opened`, `Navbar scroll`, `Navbar dark`, `Navbar dark class`, `Navbar expand sm` to `xxl`), the driven rows `navbar-collapsed-focus` and `navbar-expanded-hover`, the `### Navbar classes` section with the R16 limit sentence, the forced-colours `### Additions` row, the `$assets` retirement patch to `_tokens.scss`, the deleted `Navbar` deferral rows, the `### Files` row, and the exact patch for every shared file.

**Observations, not criteria.** The Layout frames may change under the navbar host; the journey and `CAPTURE=1` are the
Orchestrator's runs at landing.

## Review evidence

`git -C /home/user/veneer-nb diff a658879` and `git -C /home/user/veneer-nb status --porcelain`,
captured by the Orchestrator at hand-back as `nb.diff` and `nb-status.txt`, plus the report and
the regenerated frames of the Orchestrator's capture run (the rendered surface's primary evidence;
source is corroboration).
