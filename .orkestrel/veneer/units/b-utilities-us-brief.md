# Unit UTIL-SPACER (`us`) — the utility mixins, the gap keys, and the Tailwind contract

## Role and engine

`opus` on Opus 5 (the alias serves `claude-opus-5`), reached as a native Claude subagent in the
worktree `/home/user/veneer-us` (branch `unit/us` from `87ff1d0`). The executor that opens this
brief is that subagent.

## Objective

The `utility` and `utility-variable` mixins land in `src/styles/_mixins.scss` with their fixture
proof; `src/styles/utilities/_gap.scss` ships `gap` and `column-gap` at every step and infix beside
the shipped `row-gap`, written through the mixins, with the gutters untouched; the Tailwind
profiles and consumer proofs state the derived exclusion contract with `gap-*` as the first real
important shared names off the line; the Layout region gains the gap specimens; the guide's gap
section, rows, and the § Tailwind sentence follow as a patch.

## Context

**Evidence.** The family record `/home/user/scaffold/.orkestrel/veneer/units/b-utilities-family.md`
and the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`
(R2, R3, R4, R5, R10, R14) bind this unit; the terrain
`/home/user/scaffold/.orkestrel/veneer/units/b-utilities-terrain-report.md` § A (the `gap`,
`row-gap`, and `column-gap` entries: `$spacers` (6) each, `responsive`, 36 selectors each), § C
(`_gap.scss` today: `@layer utilities`, `breakpoint-each`, literal grouped selectors, `.row-gap-*`
important, the gutters' custom properties normal; `gap.test.ts` 92 lines; the ledger tables
`#### g`, `#### gx`, `#### gy`, `#### row-gap`; no `#### gap` or `#### column-gap`), § D (the
guide's exclusion-line sentences; `SHARED_LONGHANDS`, `collectSharedNames`, `collectImportantNames`
in `tests/setupServer.ts`; the three service proofs and what each asserts), § E (`--vn-gap-0` to
`-5`: `0`, `0.25rem`, `0.5rem`, `1rem`, `1.5rem`, `3rem`, no density factor). The pinned inventory
records `gap-1` under the keys `column-gap`, `gap`, `row`, and `row-gap` (the design brief's
inventory reading). The Tailwind shared set contains `gap-0` to `gap-5` (the design brief § The
Tailwind intersection). The mixins file today: `grep -n '@mixin' src/styles/_mixins.scss` lists
`breakpoint-up`, `breakpoint-each`, `breakpoint-down`, `reduced-motion`, `transition`,
`forced-colors`, `forced-ring`, `focus-ring`, `role-each`, `theme-tokens` among others; the mixins
proof is `tests/src/styles/mixins.test.ts` with its fixture under `tests/src/styles/fixtures/`.

**Law.** `AGENTS.md`; `.claude/rules/{styles,tests,typescript,names,documentation,writing,architecture}.md`;
the skill: none; the guide `guides/veneer.md`; the family record wins over this brief where they
disagree: stop and report.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/core/index.d.cts`
and its `browser` entry) and `@orkestrel/contract`; a helper, guard, wait, recorder, or deferred
whose job an installed export does is a defect; the checker probes the diff for a new exported
symbol against those entries.

**Host.** Linux, `bash`; the worktree `/home/user/veneer-us`; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(run it first in every shell); network reachable; Chromium installed; no sandbox; the service
proofs drive the installed Tailwind compiler (`npm run build:src:styles && npm run test:service`).

**Measurements.** Taken by the staging script at `87ff1d0` (`npm ci --ignore-scripts` and
`npm run build:src` exit 0; the log sits beside this brief as `us-stage.log.txt`). The unit runs
`npm run test:service` and `npx vitest run --config configs/src/vite.styles.config.ts --no-cache
--reporter=dot tests/src/styles/utilities/gap.test.ts tests/src/styles/mixins.test.ts` first and
records the exits and case counts as the baseline.

**Control identifiers.** None. A test is named for what it proves.

**Standing conditions.** `tests/setupPolicy.ts` and `tests/policy.test.ts` are vendored; the
policy mirror law binds a new proof to its partial. `git status --porcelain` is empty at
`87ff1d0`. Sibling units run in their own worktrees: CLOSE-GUIDE owns `guides/veneer.md`,
`tests/guides.test.ts`, and `tests/src/styles/integration.test.ts`; B-PASSIVE-ORDER owns
`src/styles/index.scss` and `tests/conformance.test.ts`; B-PASSIVE-PROSE owns `tests/setupServer.ts`,
`tests/setupStyles.ts`, and `button-group.test.ts`; the B-COLLAPSE wave-1 units own new partials
and sections. Every shared file is report-only for this unit.

## Unknowns

- Whether the exclusion line in `tests/setup.css` and its copies can carry `gap-*` off the line
  while the profiles proof's universal-exclusion cases stand: the unit restates those cases per
  R10 and reports the before and after readings of each service case.
- Whether Tailwind's `gap-N` rule declares only `gap` (then `.gap-N` with important `gap` leaves
  the line) or also a custom property: the unit measures through the consumer proof's expansion
  and reports.

## Scope

**Owned.** `src/styles/_mixins.scss` (the two mixins appended; nothing else changed),
`tests/src/styles/mixins.test.ts` and its fixture under `tests/src/styles/fixtures/` (the mixins'
cases), `src/styles/utilities/_gap.scss`, `tests/src/styles/utilities/gap.test.ts`,
`tests/service/tailwind/profiles.test.ts`, `tests/service/tailwind/consumer.test.ts`,
`tests/setupService.ts` and `tests/setupService.test.ts` where the contract needs them,
`tests/setup.css`, `tests/fixtures/tailwind/consumer.css`, `tests/fixtures/tailwind/preflight.css`,
`tests/fixtures/tailwind/markup.html`, `app/browser/sections/LayoutSection.ts` and
`tests/app/browser/sections/LayoutSection.test.ts` (the gap specimens).

**Shared (report-only).** `src/styles/index.scss` (no new line: `_gap.scss` is loaded),
`tests/conformance.test.ts` (the utilities-order case over the utilities block and the helpers,
R5, as a patch), `tests/setup.ts` and `tests/setup.test.ts` (the gap specimens' resting rows),
`tests/setupStyles.ts` (a `GAP_STEP_CASES` change if any), `app/browser/constants.ts` (the
Layout specimens), `tests/app/browser/integration.test.ts`, `guides/veneer.md` (the
`### Gap utilities` section or the existing gap prose per R15, the `#### gap` and `#### column-gap`
tables, the `### Files` row text, the § Tailwind sentence "No shipped shared name is important…"
restated, the recipe fences' exclusion line), `ROADMAP.md`.

**Off-limits.** The family record's off-limits list; every sibling unit's owned files; every other
partial and proof.

**What asserts the state this change ends.** `gap.test.ts` and `mixins.test.ts` (Owned); the
three service proofs (Owned); the conformance ledger and order gates (Shared patch); the
Layout section proof (Owned); `tests/guides.test.ts` through the integrator.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, `git checkout`,
`git restore`, `git stash`, `git reset`, or `git clean`; no tree-wide `format` or `lint --fix`;
`npm run build:src` and `npm run build:src:styles` permitted; scoped runs only; probes under
`tmp/probe/`, deleted before the report.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

A report at `/home/user/veneer-us/tmp/units/us-report.md` with: the coverage matrix for `gap` and
`column-gap` (every inventory selector and condition → proof case, specimen, scenario), the
shared-name table (each `gap-*` name against its measured line status and Tailwind's longhands),
the precedence cases with their mutations, the ledger rows, the exact patch for every shared file,
the scoped gate exits with their commands, every deviation, and a closing list of what the unit
could not close. Delivered as that file plus the same text as the final message.

## Deviation contract

Stop and report on a service case that cannot be made true under R10, on a mixin that cannot
reproduce a recorded selector shape, and on any disagreement between this brief, the family record,
and the tree. Decide, record, and carry on from the mixin's parameter names, a specimen's copy, and
the position of a row inside its table.

## Acceptance criteria

1. `npm run format:check` and `npm run lint:check` exit 0.
2. `npm run check` exits 0.
3. `npm run build:src` exits 0, and the built cascade carries every `gap` and `column-gap` selector the inventory records with `!important` on the property and every existing `row-gap`, `g`, `gx`, and `gy` selector unchanged.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/mixins.test.ts tests/src/styles/utilities/gap.test.ts` exits 0, and the mixins cases distinguish: `!important` dropped from `utility` or added to `utility-variable`; `$responsive` ignored (the `-md` probe then exists at the empty infix alone); the dash always inserted (a `.-visible` and a `.border-` selector); and the gap cases distinguish: a wrong step map; a step reading `--vn-space-*`; the breakpoint loop run per entry (`.gap-md-4.column-gap-sm-2` at 768px reads a 24px column gap); a density factor added; `!important` dropped (the priority over a later unlayered rule).
5. `npm run build:src:styles && npm run test:service` exits 0 with `gap-0` to `gap-5` off the exclusion line, the profiles case asserting the executed profile emits exactly the names off the line, the consumer case reading the importance branch on `.gap-3`, and the negative control (`!important` dropped from `.gap-3`, or `gap-3` written onto the line) red, recorded.
6. The Layout section proof exits 0 with the gap specimens (`Gap steps`, `Responsive gap`).
7. The report carries the matrix, the shared-name table, the ledger rows, the guide patch, and every shared-file patch.

**Observations, not criteria.** `npm run test:setup`, `npm run test:conformance` (the ledger gates over the built cascade: the unit reports its reading; the order case is a patch), `npm run test:guides`, and the journey are the Orchestrator's runs at landing.

## Review evidence

`git -C /home/user/veneer-us diff 87ff1d0` and `git -C /home/user/veneer-us status --porcelain`,
captured at hand-back as `us.diff` and `us-status.txt`, plus the report and the regenerated frames.
