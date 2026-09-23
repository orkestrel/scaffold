# Unit ACCORDION (`ac`) — the `accordion` key

## Role and engine

`opus` on Opus 5 (the alias serves `claude-opus-5`), reached as a native Claude subagent in the
worktree `/home/user/veneer-ac` (branch `unit/ac` from `BASE_SHA`, the commit on which wave 1 has
landed). The executor that opens this brief is that subagent.

## Objective

The `accordion` key ships in the cascade, the showcase, the proofs, the capture registry, the
ledger, and the guide, with the expanded and `.collapsed` buttons, ordinary and flush groups, and
boundary items rendered at rest; the dark icon retune lands on the component rule and the unit's
`$assets` rows leave the map; the forced-colours ring rides the button.

## Context

**Evidence.** The oracle surface (terrain § A): `.accordion` with its custom properties (`--bs-accordion-color`
through `-active-bg`), `.accordion-button` with `:not(.collapsed)`, `::after`, `:hover`, `:focus`,
`.accordion-header`, `.accordion-item` (`:first-of-type`, `:not(:first-of-type)`, `:last-of-type`),
`.accordion-body`, `.accordion-flush` and its item, collapse, and button children; the dark retune
`[data-bs-theme="dark"] .accordion-button::after` on `--bs-accordion-btn-icon` and
`-btn-active-icon`; reduced motion through `transition` on the button and the icon; no keyframes,
no rtl. The pinned inventory records `accordion` with 24 selectors. `_collapse.scss` ships at
`BASE_SHA` (COLLAPSE landed), so `.accordion-collapse` panels carry `.collapse` and `.show`. The
`$assets` map in `src/styles/_tokens.scss` holds `accordion-icon` and `accordion-active-icon`
(`grep -n "accordion" src/styles/_tokens.scss src/styles/_theme.scss`), and `COMPONENT_DARK_ASSETS`
in `tests/setupStyles.ts` lists their `--bs-*` names; the guide's `### Bootstrap variables Veneer
retains` paragraph names them (R3: delete the unit's own rows in the same patch; the theme proof's
asset case is NAVBAR's to rewrite). The `forced-ring` mixin exists (`_pagination.scss` precedent).

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

**Host.** Linux, `bash`; the worktree `/home/user/veneer-ac` (branch `unit/co` from `87ff1d0`);
npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(run it first in every shell; the manifest's `devEngines` pin refuses npm 10); network reachable;
Chromium installed; no sandbox; a `CAPTURE=1` journey run of one variant takes about two minutes and
is the Orchestrator's observation, not this unit's criterion.

**Measurements.** Taken by the staging script at `87ff1d0` in the worktree before the unit starts
(`npm ci --ignore-scripts` and `npm run build:src` exit 0; the log sits beside this brief as
`ac-stage.log.txt`). The unit runs `npm run test:conformance` and the scoped styles project over its
sibling proofs first and records the exits; a red reading at the baseline is a standing condition to
report, never to repair.

**Control identifiers.** None. A test is named for what it proves, never for the row or ruling that
specified it.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and
restored by `scaffold repair`: never edit them; the policy sweep reads every comment and every
authored Markdown file for the banned terms in `.claude/rules/writing.md` § Substitutions and
enforces the mirror law. `git status --porcelain` is empty at `BASE_SHA`. The sibling wave-2 units
run in their own worktrees on disjoint files; a shared file is report-only for every one of them.
Wave 1 (COLLAPSE, DROPDOWN, NAV) has landed at `BASE_SHA`, so `_collapse.scss`, `_dropdown.scss`,
and `_nav.scss` ship and their state classes render.

## Unknowns

- Whether the light icon data URIs sit in an `$icons` map today (`grep -n "\$icons" src/styles/_tokens.scss`):
  the unit adds the light entries there (R3) or reports the map's absence and writes the URIs in
  the partial with the reason.
- How `tokens.$dark` is read from a component rule today (`_form-select.scss` precedent: `grep -n
  "tokens.\$dark\|map.get" src/styles/components/_form-select.scss`): copy that form.

## Scope

**Owned.** `src/styles/components/_accordion.scss`, `tests/src/styles/components/accordion.test.ts`,
`app/browser/sections/AccordionSection.ts`, `tests/app/browser/sections/AccordionSection.test.ts`.

**Shared (report-only).** `src/styles/index.scss` (the `@use` line at Bootstrap's position, ruling
8), `tests/setup.ts` and `tests/setup.test.ts` (the `CaptureSubject` members, the `CASCADE_KEYS` and
`DRIVEN_KEYS` rows appended at the end), `tests/setupStyles.ts` and `tests/setupStyles.test.ts`
(any case table), `tests/app/browser/integration.test.ts` (the driven frames), `tests/app/browser/Showcase.test.ts`
and `tests/app/browser/index.test.ts` (the region and export enumerations), `tests/conformance.test.ts`
(the `listed` literal and the order case's expected list), `tests/setupServer.test.ts` (the
compatibility component set), `app/browser/constants.ts` (`<KEY>_COPY`, `<KEY>_SPECIMENS`),
`app/browser/Showcase.ts` and `app/browser/index.ts` (the section), `guides/veneer.md` (every
section, row, and sentence the unit adds or changes, ruling 12), `ROADMAP.md`. For each, the unit
returns an exact patch (a unified diff against `87ff1d0`, or the appended rows verbatim with the
anchor line they follow) in its report and edits nothing there.

**Off-limits.** Every other unit's owned files (ACCORDION: `_accordion.scss`, `accordion.test.ts`,
`AccordionSection.ts`, `AccordionSection.test.ts`; TOGGLES: `_button-group.scss`, `_input-group.scss`,
`button-group.test.ts`, `input-group.test.ts`, `ButtonGroupSection.test.ts`,
`InputGroupSection.test.ts`; NAVBAR: `_navbar.scss`, `navbar.test.ts`, `NavbarSection.ts`,
`NavbarSection.test.ts`, `theme.test.ts`, `container.test.ts`, `_theme.scss`, `setupStyles.test.ts`'s
undeclared-key case), `src/browser/**`, `src/core/**`, `tests/src/browser/**`,
`tests/setupServer.ts`, `tests/fixtures/**`, `package.json`, `package-lock.json`, `README.md`,
`tests/setupPolicy.ts`, `tests/policy.test.ts`, every partial the unit does not own, every file
under `configs/`.

**What asserts the state this change ends.** The conformance `listed` literal, the ledger and
deferral gates, the order case (Shared); the showcase enumerations (Shared); `_tokens.scss`
(`$assets` rows, Shared patch) and `COMPONENT_DARK_ASSETS` in `tests/setupStyles.ts` (Shared
patch); `tests/src/styles/theme.test.ts` (reads the dark scope's assets; NAVBAR owns its rewrite
and this unit names the case its patch changes); `tests/guides.test.ts` (through the integrator).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git
checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format`, `lint
--fix`; `npm run build:src` and `npm run build:src:styles` are permitted (the conformance and
ledger proofs read the built cascade); scoped runs only; a runtime probe lives under `tmp/probe/`
and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-ac/tmp/units/ac-report.md` with: the proof matrix (every recorded
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
3. `npm run build:src` exits 0, and the built cascade carries every `accordion`-keyed selector the inventory records with its declarations and the reduced-motion conditions, the dark icon retune on `[data-bs-theme='dark'] .accordion-button::after`, and no other `accordion`-keyed selector.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/accordion.test.ts` exits 0, and each case distinguishes its named mutation: the expanded button reading the active colour, background, inset shadow, and rotated icon while a `.collapsed` button reads none (mutation: `:not(.collapsed)` inverted); the `::after` `background-image` differing between the states (mutation: one icon variable for both); first-of-type and last-of-type radii and the zero top border on later items at the seams (mutation: the rule dropped); flush zeroing borders and radii (mutation: dropped); a button inside a dark island reading the dark icon URI and a plain element there reading empty (mutation: the value left at theme scope); focus reading the shadow and `z-index: 3`; the reduced-motion readings on the button and the icon; a wrapper override moving the consumer; the forced-colours outline under `stageMedia({ forced: true })` (mutation: `forced-ring` omitted).
5. The section proof exits 0 under the config the sibling section proofs use.
6. The report carries the ledger rows, the resting rows (`Accordion items`, `Accordion flush`), the driven row `accordion-items-focus`, the `### Accordion classes` section, the forced-colours `### Additions` row, the `$assets` and `COMPONENT_DARK_ASSETS` patches, the retained-variables paragraph patch, the `### Files` row, and the exact patch for every shared file.

**Observations, not criteria.** The journey and `CAPTURE=1` are the Orchestrator's runs at landing; the theme proof's asset case
after this unit's `$assets` patch is NAVBAR's reading.

## Review evidence

`git -C /home/user/veneer-ac diff 87ff1d0` and `git -C /home/user/veneer-ac status --porcelain`,
captured by the Orchestrator at hand-back as `ac.diff` and `ac-status.txt`, plus the report and
the regenerated frames of the Orchestrator's capture run (the rendered surface's primary evidence;
source is corroboration).
