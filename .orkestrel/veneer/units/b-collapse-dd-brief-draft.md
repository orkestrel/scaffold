# Unit DROPDOWN (`dd`) — the `dropdown` key

## Role and engine

`opus` on Opus 5 (the alias serves `claude-opus-5`), reached as a native Claude subagent in the
worktree `/home/user/veneer-dd` (branch `unit/dd` from `BASE_SHA`). The executor that opens this
brief is that subagent.

## Objective

The `dropdown` key ships in the cascade, the showcase, the proofs, the capture registry, the
ledger, and the guide, with every menu, placement, alignment, item state, and the legacy dark menu
rendered at rest inside wrappers that reserve their room; the caret ships inline; `--bs-position`
ships as recorded; the Dropdown plugin row names J-ENGINE; the dropdown-key names the release writes
in `_button-group.scss` or `_input-group.scss` are deferred with owner `Disclosure` for TOGGLES.

## Context

**Evidence.** The oracle surface (terrain § A): the wrappers `.dropup`, `.dropend`, `.dropdown`, `.dropstart`,
`.dropup-center`, `.dropdown-center`; `.dropdown-toggle` with the caret mixin (`white-space:
nowrap`; `::after` and, for dropstart, `::before`; the `:empty::after` margin rule);
`.dropdown-menu` with its custom properties (`--bs-dropdown-zindex` through
`--bs-dropdown-header-padding-y`), `&[data-bs-popper]` placement, `.dropdown-menu{infix}-start` and
`-end` under each breakpoint, the placement blocks, `.dropdown-divider`, `.dropdown-item` and its
`:hover`, `:focus`, `.active`, `:active`, `.disabled`, `:disabled`, `.dropdown-menu.show`,
`.dropdown-header`, `.dropdown-item-text`, `.dropdown-menu-dark`; `--bs-position: start|end`; no
keyframes, no `[data-bs-theme]`, no transition. The pinned inventory records `dropdown` with 85
selectors, of which 7 name `.navbar` (`.navbar-nav .dropdown-menu` and the `.navbar-expand-*`
forms; the Orchestrator's read on 2026-09-23). The family record's ruling 1 makes the inventory the
authority: the unit ships every `dropdown`-keyed selector `_dropdown.scss` writes, defers each
`.navbar`-bearing one to NAVBAR with owner `Navbar` (a `### Deferred selectors` row each), and
defers the `.dropdown-toggle-split` and input-group toggle names to TOGGLES with owner
`Disclosure` (R5). `--bs-dropdown-zindex` binds to `--vn-stack-dropdown` (`grep -n stack-dropdown
src/styles/_tokens.scss`). The mixins `breakpoint-each` and `breakpoint-up` exist
(`src/styles/_mixins.scss`); `visitBreakpoint` reads a boundary (`grep -n visitBreakpoint tests/`).
The button-group `Row menu` toggle gains a caret when `.dropdown-toggle` ships (an observation: the
Button group frames change).

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

**Host.** Linux, `bash`; the worktree `/home/user/veneer-dd` (branch `unit/dd` from `BASE_SHA`);
npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(run it first in every shell; the manifest's `devEngines` pin refuses npm 10); network reachable;
Chromium installed; no sandbox; a `CAPTURE=1` journey run of one variant takes about two minutes and
is the Orchestrator's observation, not this unit's criterion.

**Measurements.** Taken by the staging script at `BASE_SHA` in the worktree before the unit starts
(`npm ci --ignore-scripts` and `npm run build:src` exit 0; the log sits beside this brief as
`dd-stage.log.txt`). The unit runs `npm run test:conformance` and the scoped styles project over its
sibling proofs first and records the exits; a red reading at the baseline is a standing condition to
report, never to repair.

**Control identifiers.** None. A test is named for what it proves, never for the row or ruling that
specified it.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and
restored by `scaffold repair`: never edit them; the policy sweep reads every comment and every
authored Markdown file for the banned terms in `.claude/rules/writing.md` § Substitutions and
enforces the mirror law (a `tests/src/styles/components/<stem>.test.ts` mirrors
`src/styles/components/_<stem>.scss`). `git status --porcelain` is empty at `BASE_SHA`. The
sibling wave-1 units run in their own worktrees on disjoint files; a shared file is report-only for
every one of them.

## Unknowns

- Whether the registry's hanging-key branch in `tests/app/browser/integration.test.ts` (the comment
  "hanging key") fires on a menu specimen framed on its wrapper: ruling 10 says the wrapper reserves
  the room and is the subject, so no hanging key is registered; the unit confirms by reading the
  branch and reports.
- The exact set of `dropdown`-keyed selectors the release writes outside `_dropdown.scss`
  (`grep -n "dropdown" node_modules/bootstrap/scss/_button-group.scss node_modules/bootstrap/scss/forms/_input-group.scss node_modules/bootstrap/scss/_nav.scss node_modules/bootstrap/scss/_navbar.scss`
  against the inventory's `dropdown.selectors`): the unit lists each with its deferral owner.

## Scope

**Owned.** `src/styles/components/_dropdown.scss`, `tests/src/styles/components/dropdown.test.ts`,
`app/browser/sections/DropdownSection.ts`, `tests/app/browser/sections/DropdownSection.test.ts`.

**Shared (report-only).** `src/styles/index.scss` (the `@use` line at Bootstrap's position, ruling
8), `tests/setup.ts` and `tests/setup.test.ts` (the `CaptureSubject` members, the `CASCADE_KEYS` and
`DRIVEN_KEYS` rows appended at the end), `tests/setupStyles.ts` and `tests/setupStyles.test.ts`
(any case table), `tests/app/browser/integration.test.ts` (the driven frames), `tests/app/browser/Showcase.test.ts`
and `tests/app/browser/index.test.ts` (the region and export enumerations), `tests/conformance.test.ts`
(the `listed` literal and the order case's expected list), `tests/setupServer.test.ts` (the
compatibility component set), `app/browser/constants.ts` (`<KEY>_COPY`, `<KEY>_SPECIMENS`),
`app/browser/Showcase.ts` and `app/browser/index.ts` (the section), `guides/veneer.md` (every
section, row, and sentence the unit adds or changes, ruling 12), `ROADMAP.md`. For each, the unit
returns an exact patch (a unified diff against `BASE_SHA`, or the appended rows verbatim with the
anchor line they follow) in its report and edits nothing there.

**Off-limits.** Every other unit's owned files (COLLAPSE: `_collapse.scss`, `collapse.test.ts`,
`CollapseSection.ts`, `CollapseSection.test.ts`, the Tailwind fixtures and `tests/setup.css`;
DROPDOWN: `_dropdown.scss`, `dropdown.test.ts`, `DropdownSection.ts`, `DropdownSection.test.ts`;
NAV: `_nav.scss`, `nav.test.ts`, `NavSection.ts`, `NavSection.test.ts`, `CardSection.test.ts`),
`src/browser/**`, `src/core/**`, `tests/src/browser/**`, `tests/setupServer.ts`, `tests/fixtures/**`
(except where Owned grants a file), `package.json`, `package-lock.json`, `README.md`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, every partial the unit does not own, every file under
`configs/`.

**What asserts the state this change ends.** The conformance `listed` literal, the ledger and
deferral gates over the built cascade, the order case (Shared); the showcase enumerations
(Shared); the button-group proof's excluded-toggle geometry case
(`tests/src/styles/components/button-group.test.ts`; off-limits: the unit runs it first and reports
a changed reading as a deviation rather than editing it); `tests/guides.test.ts` (through the
integrator).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git
checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format`, `lint
--fix`; `npm run build:src` and `npm run build:src:styles` are permitted (the conformance and
ledger proofs read the built cascade); scoped runs only; a runtime probe lives under `tmp/probe/`
and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-dd/tmp/units/dd-report.md` with: the proof matrix (every recorded
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
3. `npm run build:src` exits 0, and the built cascade carries every `dropdown`-keyed selector the inventory records except the ones the report defers with an owner, with its declarations and conditions.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/dropdown.test.ts tests/src/styles/components/button-group.test.ts` exits 0, and each dropdown case distinguishes its named mutation: `display` at rest and with `.show` (mutation: the `.show` rule missing); placement against the toggle's rect in each direction with the `--bs-dropdown-spacer` gap (mutation: the dropup copies `top: 100%`, or the spacer dropped); the caret's border sides on `::after` per host and dropstart's `::before` with `::after` hidden (mutation: two carets on dropstart); the `:empty` toggle's zero margin (mutation: the rule dropped); the `-end` right edge and the `-{bp}-start` and `-{bp}-end` alignment through `visitBreakpoint` at the boundary and one pixel below (mutation: a condition on the wrong boundary); `--bs-position` reading `start` and `end` (mutation: omitted); hover and focus paint moved by a wrapper override of `--bs-dropdown-link-hover-bg` (mutation: a literal background); the `.active` and `.disabled` paints; the dark class retuning each variable (mutation: the block on `.dropdown-menu`); `--vn-stack-dropdown` moving `z-index` (mutation: a literal `1000`); the dark-island reading.
5. The section proof exits 0 under the config the sibling section proofs use.
6. The report carries the ledger rows, the resting rows (`Dropdown closed`, `Dropdown menu`, `Dropdown menu end`, `Dropup`, `Dropend`, `Dropstart`, `Dropdown center`, `Dropup center`, `Dropdown menu dark`, and the alignment ramp `Dropdown align sm` to `xxl`), the driven rows `dropdown-menu-hover` and `dropdown-menu-focus`, the `### Dropdown classes` section with the `--bs-position` sentence (R7) and the centering limit (R9), the Dropdown `plugin` row, the deferral rows with their owners, the `### Files` row, and the exact patch for every shared file.

**Observations, not criteria.** The Button group frames (the caret appears on the `Row menu` toggle) and the journey are the
Orchestrator's observations at landing.

## Review evidence

`git -C /home/user/veneer-dd diff BASE_SHA` and `git -C /home/user/veneer-dd status --porcelain`,
captured by the Orchestrator at hand-back as `dd.diff` and `dd-status.txt`, plus the report and
the regenerated frames of the Orchestrator's capture run (the rendered surface's primary evidence;
source is corroboration).
