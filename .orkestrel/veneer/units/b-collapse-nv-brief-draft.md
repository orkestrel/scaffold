# Unit NAV (`nv`) — the `nav` key

## Role and engine

`opus` on Opus 5 (the alias serves `claude-opus-5`), reached as a native Claude subagent in the
worktree `/home/user/veneer-nv` (branch `unit/nv` from `BASE_SHA`). The executor that opens this
brief is that subagent.

## Objective

The `nav` key ships in the cascade, the showcase, the proofs, the capture registry, the ledger,
and the guide, with base, tabs, pills, underline, fill, justified, disabled, active, parent-`.show`,
and tab-pane states rendered at rest; the card header specimens take the release's markup; the
forced-colours ring rides the nav link; the Tab and ScrollSpy plugin rows name J-ENGINE.

## Context

**Evidence.** The oracle surface (terrain § A): `.nav`, `.nav-link` (`:hover`, `:focus`, `:focus-visible`,
`.disabled`, `:disabled`, the `transition` include), `.nav-tabs` with `.nav-link`,
`.nav-link.active`, `.nav-item.show .nav-link`, `.dropdown-menu` (the menu pulled up by the tab
border with cleared top radii), `.nav-pills` (`.nav-link.active`, `.show > .nav-link`),
`.nav-underline` (the same pair), `.nav-fill`, `.nav-justified`, `.tab-content > .tab-pane`,
`.tab-content > .active`; the custom properties `--bs-nav-link-*`, `--bs-nav-tabs-*`,
`--bs-nav-pills-*`, `--bs-nav-underline-*`; no keyframes, no at-rule, no dark retune. The pinned
inventory records `nav` with 42 selectors, of which 8 name `.navbar` (`.navbar-nav .nav-link.active`,
`.navbar-nav .nav-link.show`, the `.navbar-expand-*` forms): those ship with NAVBAR, deferred here
with owner `Navbar` (a `### Deferred selectors` row each). The card partial already writes
`.card-header-tabs .nav-link.active` (`grep -n "nav-link" src/styles/components/_card.scss`) and the
card specimens use reduced markup while nav was withheld (`grep -n "card-header-tabs\|card-header-pills"
app/browser/constants.ts`; the guide sentence around `### Card classes` naming Navigation:
`grep -n "Navigation" guides/veneer.md`). The `forced-ring` mixin exists (`src/styles/_mixins.scss`;
the `.page-link:focus` precedent in `_pagination.scss`). The plugin obligations for the Tab and
ScrollSpy rows are terrain § B's Tab and ScrollSpy columns; `scrollspy` has no inventory key
(R8).

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

**Host.** Linux, `bash`; the worktree `/home/user/veneer-nv` (branch `unit/nv` from `BASE_SHA`);
npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(run it first in every shell; the manifest's `devEngines` pin refuses npm 10); network reachable;
Chromium installed; no sandbox; a `CAPTURE=1` journey run of one variant takes about two minutes and
is the Orchestrator's observation, not this unit's criterion.

**Measurements.** Taken by the staging script at `BASE_SHA` in the worktree before the unit starts
(`npm ci --ignore-scripts` and `npm run build:src` exit 0; the log sits beside this brief as
`nv-stage.log.txt`). The unit runs `npm run test:conformance` and the scoped styles project over its
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

- Whether any registered card scenario or frame depends on the reduced card-header markup
  (`grep -n "card-header" tests/setup.ts tests/app/browser/integration.test.ts`): the unit
  measures first and lists the rows the release markup changes.
- Whether the nav tabs specimen's `.nav-item.dropdown.show` menu renders inside reserved room
  without DROPDOWN's partial (a sibling unit in this wave): the specimen carries the markup; the
  frame's look before DROPDOWN lands is an observation the Orchestrator rules at the family verdict
  round; the proof reads nav rules only.

## Scope

**Owned.** `src/styles/components/_nav.scss`, `tests/src/styles/components/nav.test.ts`,
`app/browser/sections/NavSection.ts`, `tests/app/browser/sections/NavSection.test.ts`,
`tests/app/browser/sections/CardSection.test.ts` (the card header specimens' release markup, R12).

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
deferral gates, the order case (Shared); the showcase enumerations (Shared); the card specimen
constants (`app/browser/constants.ts`, Shared: the release markup as a patch) and the card frames;
`tests/guides.test.ts` (through the integrator).

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git
checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format`, `lint
--fix`; `npm run build:src` and `npm run build:src:styles` are permitted (the conformance and
ledger proofs read the built cascade); scoped runs only; a runtime probe lives under `tmp/probe/`
and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-nv/tmp/units/nv-report.md` with: the proof matrix (every recorded
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
3. `npm run build:src` exits 0, and the built cascade carries every `nav`-keyed selector the inventory records except the `.navbar`-bearing ones the report defers with owner `Navbar`, with its declarations.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/nav.test.ts tests/src/styles/components/card.test.ts` exits 0, and each nav case distinguishes its named mutation: a keyboard-focused link reads the ring and a pointer-held link none (mutation: the ring on `:focus`); the active tab's background covering the strip line at the seam through `readPixels` (mutation: the negative `margin-bottom` dropped); `.nav-item.show .nav-link` reading the active paint (mutation: left out of the list); `.nav-tabs .dropdown-menu` zero top radii and negative top margin (mutation: dropped); justified items equal width while fill items differ (mutation: justified written as fill); `display` on a pane and on the active pane (mutation: dropped); in card markup, `nav-tabs card-header-tabs` reading `border-bottom-width` 0 (mutation: nav loads after card); a wrapper override of `--bs-nav-link-color`, the dark-island reading, and the forced-colours outline under `stageMedia({ forced: true })` (mutation: `forced-ring` omitted).
5. The section proofs (`NavSection.test.ts`, `CardSection.test.ts`) exit 0 under the config the sibling section proofs use.
6. The report carries the ledger rows, the resting rows (`Nav base`, `Nav tabs`, `Nav pills`, `Nav underline`, `Nav fill`, `Nav justified`, `Tab panes`), the driven rows `nav-base-hover`, `nav-base-focus`, `nav-tabs-hover`, the `### Nav classes` section, the forced-colours `### Additions` row, the Tab and ScrollSpy `plugin` rows, the card sentence rewrite, the deferral rows with owner `Navbar`, the `### Files` row, and the exact patch for every shared file including the card specimens' release markup.

**Observations, not criteria.** The card frames change under the release markup; the journey and `CAPTURE=1` are the
Orchestrator's runs at landing.

## Review evidence

`git -C /home/user/veneer-nv diff BASE_SHA` and `git -C /home/user/veneer-nv status --porcelain`,
captured by the Orchestrator at hand-back as `nv.diff` and `nv-status.txt`, plus the report and
the regenerated frames of the Orchestrator's capture run (the rendered surface's primary evidence;
source is corroboration).
