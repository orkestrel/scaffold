# Unit UTIL-PLACEMENT (`upl`) — sizing, position, offsets, stacking, visibility, and visually hidden

## Role and engine

`opus` on Opus 5 (the alias serves `claude-opus-5`), reached as a native Claude subagent in the
worktree `/home/user/veneer-upl` (branch `unit/upl` from `BASE_SHA`, the commit on which UTIL-SPACER
has landed). The executor that opens this brief is that subagent.

## Objective

The keys `w`, `h`, `mw`, `mh`, `vw`, `vh`, `min`, `position`, `top`, `bottom`, `start`, `end`, `translate-middle`, `z`, `fixed`, `sticky`, `visually-hidden` (with `.visually-hidden-focusable`), `visible`, `invisible` ship in the cascade through the `utility` and `utility-variable` mixins, in the
showcase as the regions `app/browser/sections/SizingSection.ts` (region `Sizing`), `app/browser/sections/PositionSection.ts` (region `Position`), `app/browser/sections/VisibilitySection.ts` (region `Visibility`), in the mirrored proofs, the capture registry, the ledger,
and the guide, with every shared name measured against Tailwind's longhands.

## Context

**Evidence.** Terrain § A rows `width` through `min-viewport-height`, `position`, `top`, `bottom`, `start`,
`end`, `translate-middle`, `z-index` (the recorded `.z-n1` to `.z-3`), `visibility`, and § B
`position` (`.fixed-top`, `.fixed-bottom`, `.sticky{infix}-top`, `-bottom`) and `visually-hidden`
(the mixin's all-important declarations, the `caption` exception, `.visually-hidden-focusable:not(:focus):not(:focus-within)`);
the position helpers sit under the `fixed` and `sticky` keys (the analyst's correction); R2 binds
`.fixed-*` to `--vn-stack-fixed` and `.sticky-*` to `--vn-stack-sticky` and keeps the percentages,
`.z-*`, and the widths literal. The shared set contains `top-*`, `bottom-*`, `start-*`, `end-*`,
`h-*`, `w-*`, `visible`, `invisible`, `z-*`. Partials: `src/styles/utilities/_sizing.scss`, `src/styles/utilities/_position.scss` (with `z-index`), `src/styles/utilities/_visually-hidden.scss` (an important helper, utilities layer, R5), `src/styles/utilities/_visibility.scss`, `src/styles/components/_position.scss` as `position-component` (the `.fixed-*` and `.sticky-*` helpers); `app/browser/styles/_shell.scss` gains a layout-only `.viewport` frame (`contain: layout paint`, a bounded height, `overflow: auto`) that paints nothing.

**Law.** `AGENTS.md`; `.claude/rules/{styles,tests,browser,names,documentation,writing,architecture}.md`;
the skill: none; the guide `guides/veneer.md`; the family record
`/home/user/scaffold/.orkestrel/veneer/units/b-utilities-family.md` (rulings 1 to 15, the shared
and off-limits files, the gates, the host facts) and the design verdict
`/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md` (R1 to R17); the B-PASSIVE
records still bind; D2 and D6 (every utility with Bootstrap's `!important`; Bootstrap wins where a
class exists in both libraries); D5 (no rtl output). The family record wins over this brief where
they disagree: stop and report the disagreement.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/core/index.d.cts`
and its `browser` entry: `build`, `mount`, `stageMedia` (`print`, `forced`, the reduced-motion
preference), `readStyle`, `readPixels`, `visitBreakpoint`, `pressKeys`, `traverseAccessible`; read
the entry before writing a helper) and `@orkestrel/contract`. A helper, guard, wait, recorder, or
deferred whose job an installed export does is a defect; the checker probes the diff for a new
exported symbol against those entries. The `utility` and `utility-variable` mixins in
`src/styles/_mixins.scss` (landed by UTIL-SPACER at `BASE_SHA`; read their doc blocks and the cases
in `tests/src/styles/mixins.test.ts` first) write every entry; no partial writes `!important` by
hand (family ruling 2).

**Host.** Linux, `bash`; the worktree `/home/user/veneer-upl` (branch `unit/upl` from `BASE_SHA`);
npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(run it first in every shell); network reachable; Chromium installed; no sandbox; the service
proofs drive the installed Tailwind compiler (`npm run build:src:styles && npm run test:service`).

**Measurements.** Taken by the staging script at `BASE_SHA` (`npm ci --ignore-scripts` and
`npm run build:src` exit 0; the log sits beside this brief as `upl-stage.log.txt`). The unit runs
`npm run test:conformance` and `npm run test:service` first and records the exits and case counts as
the baseline; a red reading at the baseline is a standing condition to report, never to repair.

**Control identifiers.** None. A test is named for what it proves, never for the ruling that
specified it.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and
restored by `scaffold repair`: never edit them; the policy sweep reads every comment and every
authored Markdown file for the banned terms and enforces the mirror law (a
`tests/src/styles/utilities/<stem>.test.ts` mirrors `src/styles/utilities/_<stem>.scss`, and a
`tests/src/styles/components/<stem>.test.ts` mirrors `src/styles/components/_<stem>.scss`).
`git status --porcelain` is empty at `BASE_SHA`. The sibling UTIL wave units run in their own
worktrees on disjoint files; every shared file is report-only for every one of them; the
exclusion line and its copies integrate as a set union (family ruling 7).

## Unknowns

- The exclusion-line status of each shared name the unit ships: measured through the consumer
  proof's expansion and reported in the shared-name table; the family's per-owner predictions are
  inputs, never the answer.
- The exact `attributeSelector` assignment of each selector to its key (`tests/setupServer.ts`,
  off-limits): the unit reads it before writing and stops if a selector cannot reach its key.

## Scope

**Owned.** `src/styles/utilities/_sizing.scss`, `src/styles/utilities/_position.scss` (with `z-index`), `src/styles/utilities/_visually-hidden.scss` (an important helper, utilities layer, R5), `src/styles/utilities/_visibility.scss`, `src/styles/components/_position.scss` as `position-component` (the `.fixed-*` and `.sticky-*` helpers); `app/browser/styles/_shell.scss` gains a layout-only `.viewport` frame (`contain: layout paint`, a bounded height, `overflow: auto`) that paints nothing; their mirrored proofs under `tests/src/styles/utilities/` and
`tests/src/styles/components/`; `app/browser/sections/SizingSection.ts` (region `Sizing`), `app/browser/sections/PositionSection.ts` (region `Position`), `app/browser/sections/VisibilitySection.ts` (region `Visibility`) and their section proofs under
`tests/app/browser/sections/`.

**Shared (report-only).** `src/styles/index.scss` (the `@use` lines at the release's map
position in the utilities block, and a components-layer helper at its `_helpers.scss` position,
ruling 4), `src/styles/_mixins.scss` (a needed change is a patch with its fixture case; UTIL-SPACER
owns the file), `tests/setup.ts` and `tests/setup.test.ts` (the `CaptureSubject` members and the
resting and driven rows appended at the end), `tests/setupStyles.ts` and `tests/setupStyles.test.ts`
(any case table), `tests/conformance.test.ts` (the `listed` literal and the order case's expected
list), `tests/setupServer.test.ts` (the compatibility component set), `app/browser/constants.ts`
(`<KEY>_COPY`, `<KEY>_SPECIMENS`), `app/browser/Showcase.ts` and `app/browser/index.ts` (the
sections, constructed after every component region in barrel order), `tests/app/browser/Showcase.test.ts`
and `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts` (the driven frames),
`tests/setup.css`, `tests/fixtures/tailwind/consumer.css`, `tests/fixtures/tailwind/preflight.css`,
`tests/fixtures/tailwind/markup.html` (the unit's shared names appended; the line names returned
for the union), `guides/veneer.md` (the `### <Page> utilities` section, the `### Files` rows, the
compatibility rows, the `#### <key>` tables, the `### Additions` rows, the § Tests links, ruling
11), `ROADMAP.md`. For each, the unit returns an exact patch (a unified diff against `BASE_SHA`, or
the appended rows verbatim with the anchor line they follow) in its report and edits nothing there.

**Off-limits.** Every other UTIL unit's partials, proofs, and sections; `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/fixtures/oracle/**`, `tests/setupServer.ts`,
`src/styles/_theme.scss`, `src/styles/_tokens.scss`, `src/styles/elements/**`, `src/browser/**`,
`src/core/**`, `configs/**`, `vite.config.ts`, `tsconfig.json`, `package.json`,
`package-lock.json`, `README.md`, every component partial the unit does not own.

**What asserts the state this change ends.** The conformance `listed` literal, the ledger, the
deferral and priority gates, and the order case (Shared); the showcase enumerations (Shared); the
Tailwind profiles and consumer proofs over the union of shared names (Shared through the union);
`tests/guides.test.ts` (through the integrator); the owned proofs.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git
checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint
--fix`; `npm run build:src` and `npm run build:src:styles` are permitted; scoped runs only; a
runtime probe lives under `tmp/probe/` and is deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-upl/tmp/units/upl-report.md` with: the coverage matrix (every
inventory selector and condition of the unit's keys → proof case, distinguishing mutation,
specimen, capture scenario), the shared-name table (each shared name the unit ships against its
measured exclusion-line status and the longhands Tailwind declares for it), the precedence cases
with their mutations, the ledger rows written (`#### <key>` departures and `### Additions`) with the
comparison's own category, the exact patch for every shared file, the scoped gate exits with their
commands, every deviation, and a closing list of what the unit could not close. Delivered as that
file plus the same text as the final message.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on a recorded selector the mixins cannot reproduce, on a shared name whose exclusion
status the consumer proof cannot settle, on a change the `attributeSelector` ladder in
`tests/setupServer.ts` would need (family ruling 15), and on any disagreement between this brief,
the family record, and the tree. Decide, record, and carry on from a specimen's copy, a section's
paragraph order, a case title, and the position of a row inside its table.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. `npm run check` exits 0.
3. `npm run build:src` exits 0, and the built cascade carries every selector the inventory records under the unit's keys with `!important` on each property declaration and none on a custom property, and no other selector under those keys (the report lists the inventory's count beside the cascade's).
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot <every owned proof>` exits 0, and each case distinguishes its named mutation: percentages resolving against definite containing dimensions and viewport units against the viewport (mutation: a same-number length); `min-vw` and `min-vh` under the `min` key (mutation: a branch omitted); `.fixed-top` z-index following a `--vn-stack-fixed` retune (mutation: a literal `1030`); sticky applying at each boundary inside a real scroll container (mutation: `absolute`); `.visually-hidden.position-relative` resolving `relative` (mutation: the helper in `components`); the skip link widening past 1px under `traverseAccessible` (mutation: `:not(:focus)` dropped); `.invisible` keeping its box (mutation: `display: none`); the priority over an unlayered rule and the escape.
5. The section proofs exit 0 under the config the sibling section proofs use, with the specimens: Sizing region: `Width steps`, `Height steps`, `Maximum sizes`, `Viewport sizes` (inside `.viewport`). Position region: `Position values`, `Edge offsets`, `Centered translation`, `Stacking levels`, `Fixed bars` and `Sticky bars` (inside `.viewport`). Visibility region: `Visible and invisible`, `Visually hidden`, `Skip link` (driven by focus).
6. `npm run test:conformance` reads green over the built cascade with the unit's ledger rows applied through its patch in a scratch copy, or the unit reports the exact gap the integrator must close (the ledger rows are a shared patch; the unit proves them by applying them to a copy of the guide under `tmp/probe/` and running the conformance project against it).
7. `npm run build:src:styles && npm run test:service` exits 0 with the unit's shared names on or off the exclusion line as measured, the consumer proof reading each name resolving to the cascade's declaration, and the negative control (a shipped important shared name written onto the line, or its `!important` dropped) red, recorded.
8. The report carries the matrix, the shared-name table, the precedence cases, the ledger rows, the section text, and every shared-file patch.

**Observations, not criteria.** `npm run test:setup`, `npm run test:guides`, the journey, and `CAPTURE=1` are the Orchestrator's runs at landing.

## Review evidence

`git -C /home/user/veneer-upl diff BASE_SHA` and `git -C /home/user/veneer-upl status --porcelain`,
captured by the Orchestrator at hand-back as `upl.diff` and `upl-status.txt`, plus the report and
the regenerated frames of the Orchestrator's capture run.
