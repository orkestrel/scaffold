# Unit UTIL-PAINT (`up`) — role paint with its opacity locals, borders, and radius

## Role and engine

`opus` on Opus 5.5, reached as a native Claude subagent in the
worktree `/home/user/veneer-up` (branch `unit/up` from `2a3f223`, Veneer `main`, on which UTIL-SPACER, UTIL-DISPLAY, and
UTIL-PLACEMENT have landed). The executor that opens this brief is that subagent.

## Objective

The keys `bg` (with `bg-opacity`, the subtle backgrounds, the gradient), `border` (the five side entries, `border-color`, the subtle borders, `border-width`, `border-opacity`), `rounded` (the five entries) ship in the cascade through the `utility` and `utility-variable` mixins, in the
showcase as the regions `app/browser/sections/BackgroundSection.ts` (region `Background`), `app/browser/sections/BorderSection.ts` (region `Border`), in the mirrored proofs, the capture registry, the ledger,
and the guide, with every shared name measured against Tailwind's longhands.

## Context

**Evidence.** The wave-3 terrain `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-w3-terrain-report.md` (measured at `2a3f223`) records which facts in this brief
moved or went false (§ 1), the pattern UTIL-DISPLAY and UTIL-PLACEMENT shipped (§ 2), the collision
map with each unit's barrel slot (§ 3), and the files each unit makes false (§ 4). Where the terrain
and this brief disagree, the terrain's reading of the tree wins, and the tree wins over both. Terrain § A rows `border` through `border-opacity`, `background-color`, `bg-opacity`,
`subtle-background-color`, `gradient`, `rounded*` (the map entries, their `local-vars` and
`css-var` flags, and their value sources `$utilities-border-colors`, `$utilities-border-subtle`,
`$border-widths`, `$utilities-bg-colors`, `$utilities-bg-subtle`); the pinned inventory's `bg`
and `border` keys carry `bg-opacity-*` and `border-opacity-*` (the design brief's reading); the
Tailwind shared set contains `bg-black`, `bg-transparent`, `bg-white`, `border`, `border-0`,
`border-1` to `border-5`, `border-black`, `border-white`, `rounded` (the intersection). The release
writes `RGBA(` in its opacity values; the textual ledger compares values after whitespace
collapse (`tests/setupServer.ts`: `collectValueGaps`), so the unit reads how a case difference is
compared before writing `rgba(`. The theme re-declares the role RGB triplets, the subtle and
emphasis tiers, and `--bs-border-*` per mode (`src/styles/_mixins.scss` `theme-tokens`). Partials: `src/styles/utilities/_background.scss`, `src/styles/utilities/_border.scss`.

**Law.** `AGENTS.md` in the worktree;
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing,architecture,typescript}.md`
(the Veneer checkout carries no `.claude/rules/` directory, so read the rule files from the scaffold
checkout);
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
`src/styles/_mixins.scss` (landed by UTIL-SPACER at `2a3f223`; read their doc blocks and the cases
in `tests/src/styles/mixins.test.ts` first) write every entry; no partial writes `!important` by
hand (family ruling 2).

**Host.** Linux, `bash`; the worktree `/home/user/veneer-up` (branch `unit/up` from `2a3f223`);
npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(run it first in every shell); no network needed; `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, Chromium 141
(`chromium-1194`); no sandbox; the service
proofs drive the installed Tailwind compiler (`npm run build:src:styles && npm run test:service`).

**Measurements.** Taken by the staging script `units/b-utilities-w3-stage.sh` at `2a3f223`
(`npm run build:src` and `npm run test:conformance` exit 0 in this worktree; the logs are
`tmp/units/up-stage-build.log.txt` and `tmp/units/up-stage-conformance.log.txt`). The unit runs
`npm run test:conformance` and `npm run test:service` first and records the exits and case counts as
the baseline; a red reading at the baseline is a standing condition to report, never to repair.

**Control identifiers.** None. A test is named for what it proves, never for the ruling that
specified it.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored and
restored by `scaffold repair`: never edit them; the policy sweep reads every comment and every
authored Markdown file for the banned terms and enforces the mirror law (a
`tests/src/styles/utilities/<stem>.test.ts` mirrors `src/styles/utilities/_<stem>.scss`, and a
`tests/src/styles/components/<stem>.test.ts` mirrors `src/styles/components/_<stem>.scss`).
`git status --porcelain` is empty at `2a3f223`. The worktree's `node_modules` is a hard-linked copy
of the checkout's with the Vite and Vitest caches removed: never edit a file under `node_modules`.
`tests/config.test.ts` is vendored too. Read every gate that needs a shared file (`check`, the
section proofs, the built cascade, the style proofs, conformance, the service proofs) on a validation
copy you build under `tmp/probe/base/` (`git archive 2a3f223 | tar -x -C tmp/probe/base`,
`cp -al node_modules tmp/probe/base/node_modules`, your owned files copied over it, your shared
patches applied), record them as the copy's readings, and delete `tmp/probe/` before the report.
`git worktree` is forbidden. The B-MODAL wave-2 units (MODAL, OFFCANVAS, TIP, and TOAST in
`/home/user/veneer-md`, `-oc`, `-tp`, and `-to`) run beside this wave from the same base: their
files are off-limits, and every shared file they patch stays as the base has it in your patch. The sibling UTIL wave units run in their own
worktrees on disjoint files; every shared file is report-only for every one of them; the
exclusion line and its copies integrate as a set union (family ruling 7).

## Unknowns

- The exclusion-line status of each shared name the unit ships: measured through the consumer
  proof's expansion and reported in the shared-name table; the family's per-owner predictions are
  inputs, never the answer.
- The exact `attributeSelector` assignment of each selector to its key (`tests/setupServer.ts`,
  off-limits): the unit reads it before writing and stops if a selector cannot reach its key.

## Scope

**Owned.** `src/styles/utilities/_background.scss`, `src/styles/utilities/_border.scss`; their mirrored proofs under `tests/src/styles/utilities/` and
`tests/src/styles/components/`; `app/browser/sections/BackgroundSection.ts` (region `Background`), `app/browser/sections/BorderSection.ts` (region `Border`) and their section proofs under
`tests/app/browser/sections/`.

**Shared (report-only).** `src/styles/index.scss` (the `@use` lines at the release's map
position in the utilities block, and a components-layer helper at its `_helpers.scss` position,
ruling 4), `src/styles/_mixins.scss` (a needed change is a patch with its fixture case; UTIL-SPACER
owns the file), `tests/setup.ts` and `tests/setup.test.ts` (the `CaptureSubject` members and the
resting and driven rows appended at the end), `tests/setupStyles.ts` and `tests/setupStyles.test.ts`
(any case table), `tests/conformance.test.ts` (the `listed` literal and the order case's expected
list), `tests/setupServer.test.ts` (the compatibility component set), `app/browser/constants.ts`
(`<KEY>_COPY`, `<KEY>_SPECIMENS`), `app/browser/Showcase.ts` and `app/browser/index.ts` (the sections,
constructed after `VisibilitySection` and before `NavbarSection`, in the family's barrel order), `tests/app/browser/Showcase.test.ts`
and `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts` (the driven frames),
`tests/setup.css`, `tests/fixtures/tailwind/consumer.css`, `tests/fixtures/tailwind/preflight.css`,
`tests/fixtures/tailwind/markup.html` (the unit's shared names appended; the line names returned
for the union), `guides/veneer.md` (the `### <Page> utilities` section, the `### Files` rows, the
compatibility rows, the `#### <key>` tables, the `### Additions` rows, the § Tests links, ruling
11), `ROADMAP.md`. For each, the unit returns an exact patch (a unified diff against `2a3f223`, or
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

A report at `/home/user/veneer-up/tmp/units/up-report.md` with: the coverage matrix (every
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

Read criteria 2 to 7 on the validation copy the standing conditions describe.

1. `npm run format:check` and `npm run lint:check` exit 0 in the worktree.
2. `npm run check` exits 0.
3. `npm run build:src` exits 0, and the built cascade carries every selector the inventory records under the unit's keys with `!important` on each property declaration and none on a custom property, and no other selector under those keys (the report lists the inventory's count beside the cascade's).
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot <every owned proof>` exits 0, and each case distinguishes its named mutation: each role resolving its role's RGB channels through the theme's aliases (mutation: a literal role list, or an emitted `-tertiary`); `.bg-success.bg-opacity-25` reading alpha 0.25 while `.bg-opacity-25` alone paints nothing (mutation: the local written after the property, or written important); the subtle and emphasis tiers inside `[data-bs-theme="dark"]` reading the dark tokens (mutation: a written light value); `.border.border-top-0` reading a top width of 0 in the map order (mutation: the side entries emitted before `border`); `--vn-factor-radius: 2` doubling `.rounded-2` and a `--vn-border-width` retune moving `.border` (mutation: a literal); each responsive-free entry at the empty infix only; the priority over an unlayered rule and the `@layer utilities` escape.
5. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser <every owned
   section proof>` exits 0, with the specimens: Background region: `Background roles`, `Subtle backgrounds`, `Body backgrounds`, `Background opacity`, `Background gradient`. Border region: `Additive borders`, `Subtractive borders`, `Border roles`, `Subtle borders`, `Border widths`, `Border opacity`, `Rounded corners`, `Rounded sizes`.
6. `npm run test:conformance` reads green over the built cascade with the unit's ledger rows applied through its patch in a scratch copy, or the unit reports the exact gap the integrator must close (the ledger rows are a shared patch; the unit proves them by applying them to a copy of the guide under `tmp/probe/` and running the conformance project against it).
7. `npm run build:src:styles && npm run test:service` exits 0 with the unit's shared names on or off the exclusion line as measured, the consumer proof reading each name resolving to the cascade's declaration, and the negative control (a shipped important shared name written onto the line, or its `!important` dropped) red, recorded.
8. The report carries the matrix, the shared-name table, the precedence cases, the ledger rows, the section text, and every shared-file patch.

**Observations, not criteria.** `npm run test:setup`, `npm run test:guides`, the journey, and `CAPTURE=1` are the Orchestrator's runs at landing.

## Review evidence

`git -C /home/user/veneer-up diff 2a3f223` and `git -C /home/user/veneer-up status --porcelain`,
captured by the Orchestrator at hand-back as `up.diff` and `up-status.txt`, plus the report and
the regenerated frames of the Orchestrator's capture run.
