# Unit TOGGLES (`tg`) — the Disclosure deferral rows

## Role and engine

`opus` on Opus 5 (the alias serves `claude-opus-5`), reached as a native Claude subagent in the
worktree `/home/user/veneer-tg` (branch `unit/tg` from `a658879`, the commit on which wave 1 has
landed). The executor that opens this brief is that subagent.

## Objective

Every `.dropdown-toggle` name the release writes in `_button-group.scss` and `_input-group.scss`
ships in those partials with its specimen in its partial's region, and every `Disclosure` row
leaves `### Deferred selectors`.

## Context

**Evidence.** The `Disclosure` rows in `### Deferred selectors` at `a658879` (`grep -n "Disclosure" guides/veneer.md`; around lines 1966 to 1981 when read on the landing tree), the button-group and input-group rows: `.btn-group > .btn.dropdown-toggle-split:first-child`,
`.btn-sm + .dropdown-toggle-split`, `.btn-group-sm > .btn + .dropdown-toggle-split`,
`.btn-lg + .dropdown-toggle-split`, `.btn-group-lg > .btn + .dropdown-toggle-split`,
`.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)`,
`.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)`; and the split-toggle rows DROPDOWN deferred with owner `Disclosure` (R5): `.dropdown-toggle-split`, `.dropdown-toggle-split::after`, `.dropup .dropdown-toggle-split::after`, `.dropend .dropdown-toggle-split::after`, `.dropstart .dropdown-toggle-split::before`, which the release writes in `_button-group.scss`. The guide's `### Button group classes` and `### Input group classes` prose that says Disclosure withholds them (around lines 1212, 1420, and 1438 on the landing tree) is rewritten in the same patch. The
release writes them in `_button-group.scss` (the split toggle, lines 75-98; `.btn-group.show
.dropdown-toggle` 103-110) and `forms/_input-group.scss` (101-111, 123). Veneer's partials carry the
comments that Disclosure withholds these rules (`grep -n "Disclosure\|dropdown" src/styles/components/_button-group.scss src/styles/components/_input-group.scss`)
and the guide's `### Button group classes` and `### Input group classes` sentences say the same
(`grep -n "Disclosure" guides/veneer.md`); `app/browser/constants.ts` carries the button-group doc
block naming the withheld toggle. `_dropdown.scss` ships at `a658879` (DROPDOWN landed), so the
`.dropdown-toggle` caret renders on a specimen's toggle.

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

**Host.** Linux, `bash`; the worktree `/home/user/veneer-tg` (branch `unit/tg` from `a658879`);
npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(run it first in every shell; the manifest's `devEngines` pin refuses npm 10); network reachable;
Chromium installed; no sandbox; a `CAPTURE=1` journey run of one variant takes about two minutes and
is the Orchestrator's observation, not this unit's criterion.

**Measurements.** Taken by the staging script at `a658879` in the worktree before the unit starts
(`npm ci --ignore-scripts` and `npm run build:src` exit 0; the log sits beside this brief as
`tg-stage.log.txt`). The unit runs `npm run test:conformance` and the scoped styles project over its
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

- Whether the excluded-toggle geometry case in `button-group.test.ts` moves when the split toggle
  ships (the unit runs it first and reports the reading).
- Whether `.btn-group.show .dropdown-toggle` is already shipped through the button-group shadow
  mixin (the guide names it; `grep -n "show" src/styles/components/_button-group.scss`): the unit
  reports its status and ships nothing twice.

## Scope

**Owned.** `src/styles/components/_button-group.scss`, `src/styles/components/_input-group.scss`,
`tests/src/styles/components/button-group.test.ts`, `tests/src/styles/components/input-group.test.ts`,
`tests/app/browser/sections/ButtonGroupSection.test.ts`, `tests/app/browser/sections/InputGroupSection.test.ts`.

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
`AccordionSection.ts`, `AccordionSection.test.ts`; NAVBAR: `_navbar.scss`, `navbar.test.ts`, `NavbarSection.ts`,
`NavbarSection.test.ts`, `theme.test.ts`, `container.test.ts`, `_theme.scss`, `setupStyles.test.ts`'s
undeclared-key case), `src/browser/**`, `src/core/**`, `tests/src/browser/**`,
`tests/setupServer.ts`, `tests/fixtures/**`, `package.json`, `package-lock.json`, `README.md`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, every partial the unit does not own, every file
under `configs/`.

**What asserts the state this change ends.** The deferral gate over the built cascade (a shipped
name must leave `### Deferred selectors`; Shared patch to the guide); the button-group and
input-group proofs (Owned); the section proofs (Owned) and the specimen constants
(`app/browser/constants.ts`, Shared patch: `Split button`, `Split button small`, `Split button
large`, `Split dropstart`, `Input group dropdown`, `Input group dropdown validated`); the ledger
rows (Shared); `tests/guides.test.ts` (through the integrator).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git
checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format`, `lint
--fix`; `npm run build:src` and `npm run build:src:styles` are permitted (the conformance and
ledger proofs read the built cascade); scoped runs only; a runtime probe lives under `tmp/probe/`
and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-tg/tmp/units/tg-report.md` (the report states no count of a growable set and names no list item by its position) with: the proof matrix (every recorded
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
3. `npm run build:src` exits 0, and the built cascade carries every Disclosure-row selector with the declarations the inventory records under its key, and `grep -c "Disclosure" guides/veneer.md` in the report's patch reads zero rows under `### Deferred selectors`.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts` exits 0, and each added case distinguishes its named mutation: the split toggle's inline padding per size form (mutation: the rule omitted, the toggle reading the base padding); the first-child split keeping its trailing corners (mutation: the selector dropped); the input-group toggle's trailing corners squared when not last, with and without `.has-validation` (mutation: the selector left out of the list).
5. The Button group and Input group section proofs exit 0 under the config the sibling section proofs use.
6. The report carries the ledger rows, the resting rows for the specimens named under What asserts, the rewritten partial comments, the guide sentence rewrites and the deleted deferral rows, the constants doc-block patch, and the exact patch for every shared file.

**Observations, not criteria.** The Button group and Input group frames change; the journey and `CAPTURE=1` are the Orchestrator's
runs at landing.

## Review evidence

`git -C /home/user/veneer-tg diff a658879` and `git -C /home/user/veneer-tg status --porcelain`,
captured by the Orchestrator at hand-back as `tg.diff` and `tg-status.txt`, plus the report and
the regenerated frames of the Orchestrator's capture run (the rendered surface's primary evidence;
source is corroboration).
