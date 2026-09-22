# Unit B-PASSIVE-B-2 — button group fix round

Successor of `tmp/units/b-passive-b-brief.md` (ran; report `tmp/units/b-passive-b-report.md`). What
changed and why: the audit round returned the analyst verdict
(`tmp/units/bb-audit-analyst-verdict.md`, `FAIL 1, 3, 4, 5, 6, 7, 9; outside the claims:
F-DROPDOWN, F-WIDE`), the reviewer verdict (`tmp/units/bb-audit-reviewer-verdict.md`, `FAIL 1, 3,
5, 9; outside the claims: F1 to F6`), and the checker verdict (`tmp/units/bb-audit-checker-verdict.md`).
The design verdict the first round lacked is staged as `tmp/units/b-passive-design-verdict.md`.
This round carries every finding the Orchestrator assigned to the unit; the rest are named under
§ Not this unit's.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bb`, a git worktree detached at `3a9202a` carrying the unit's uncommitted writes.
Perform the assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-bb`
for every command and file, and run every npm and npx command from `/home/user/veneer-bb`; your
shell may start elsewhere. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every finding in § Findings is closed in the owned files, every shipped selector's treatment is read
by a proof whose named mutation reddens it, the showcase renders the dropdown-toggle child the first
brief required and one toolbar specimen, and the capture portfolio holds the regenerated frames.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,styles,browser,application,documentation,writing}.md`.
Design: `tmp/units/b-passive-design-verdict.md` and the family record `tmp/units/b-passive-family.md`
(ruling 13 the shared-file rule: a unit appends and never rewrites an existing line it did not
write; the lines this unit appended in the first round are its own). Skill: none. Guide:
`guides/veneer.md` § Button group classes and § Button toolbar classes.

**Decisions since the first round.** D15 and its amendment (staged as
`tmp/units/b-sweep-design-verdict.md`): the `.btn-toolbar` and `.row` flex pair is a coincidence
and both copies stay inline; the report's Blocker 2 is closed. D18: a partial loads only the modules
it reads.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `node_modules` installed, `dist/` present. Sibling
units and gate chains share the container (load 5 to 40): a `test:journey`, `test:policy`, or
`test:setup` timeout is a timing reading you report, never a defect you diagnose. `prettier` must
never run; `oxfmt` is the formatter. `npm run test:setup` is red at baseline on Blocker D1 (the
`tests/setupServer.test.ts` Set literal, off-limits) and `npm run test:app` on Blocker 3 (the
`ButtonSection.test.ts` exclusion, off-limits); both stay so; report the failing case names and
confirm none is yours.

**Evidence.** The installed pointer driver moves onto the target before pressing
(`node_modules/@orkestrel/test/dist/src/browser/index.js`, the press path), so a rendered reading of
`:active` cannot separate it from `:hover`. The `.btn-check` label rules ship under both
`.btn-group` and `.btn-group-vertical` for `:checked + .btn` and `:focus + .btn`. The light-390 frame
of `Wide toolbar` shows its groups on two lines.

**Control identifiers.** none; name every test for what it proves.

## Unknowns

none.

## Findings

1. **Analyst 3, reviewer 3 — three selectors have no treatment reading.** In
   `tests/src/styles/components/button-group.test.ts`: drive an unchecked `.btn-check` input to
   keyboard focus (the tree's `traverseAccessible` idiom) and read its label's `z-index` against the
   unfocused sibling's, with `BUTTON_GROUP_CHECK_MARKUP` mounted under `.btn-group` and under
   `.btn-group-vertical`; read the vertical checked lift; extend the dropdown-toggle exclusion case
   to `.btn-group-vertical`; and bind the `:active` member of each stacking selector list through
   `readRules` beside the rendered hover reading, stating in the case why the rendered reading cannot
   isolate it. Mutations, one per reading: the `:focus + .btn` selector dropped from the horizontal
   list; the same from the vertical list; the vertical `:checked + .btn` dropped; the vertical
   `:not(.dropdown-toggle)` dropped; the `:active` member dropped. Red, revert by the exact reverse
   edit, green, each recorded. Correct the coverage matrix in the report.
2. **Analyst F-DROPDOWN — the required child.** The first brief's Obligation 1 required a
   `.dropdown-toggle` child so the `:not(.dropdown-toggle)` exclusion is exercised; no specimen
   carries one. Add a `.btn.dropdown-toggle` child in a non-last position of a group specimen (a
   plain button after it, so the toggle's trailing corners visibly stay while the plain child's go),
   with `aria-expanded="false"` and no split-toggle markup and no behaviour; assert it in
   `ButtonGroupSection.test.ts`; keep the split-toggle rules deferred.
3. **Reviewer F2, analyst F-WIDE — one toolbar specimen.** Remove `Wide toolbar`; rename
   `Crowded toolbar` to `Wrapping toolbar` and its groups' labels to match; rewrite the
   `BUTTON_GROUP_SPECIMENS` doc block to the measured behaviour (one line at 1280, wrapped at 390);
   remove the resting row this unit appended for the removed specimen in `tests/setup.ts` and any
   `wide-toolbar--*` frame and artifact under `tmp/capture/states/`.
4. **Reviewer F1 — the registry name.** Rename `GROUP_KEYS` to `BUTTON_GROUP_KEYS` at its
   declaration and spread in `tests/setup.ts` and at its import, literal row (sorted position), and
   spread in `tests/setup.test.ts`.
5. **Reviewer F5 — the registry remark.** State in the `BUTTON_GROUP_KEYS` doc block that the
   journey copies the specimen to the document's start and renames the clone's inputs and labels
   before the frame, the way `CASCADE_KEYS` states its copy.
6. **Reviewer F3.** `tests/app/browser/Showcase.test.ts`: add `BUTTON_COPY` to the `@app/browser`
   import and write ``section[aria-label="${BUTTON_COPY.region}"] .${BUTTON_CLASS}``.
7. **Reviewer F4, D18.** Drop `@use '../tokens'` and `@use '../mixins' as *` from
   `src/styles/components/_button-group.scss`; the compiled cascade must not change (compare the
   `.btn-group` block of `dist/src/styles/index.css` before and after).
8. **Reviewer F6.** The split-toggle bullet in § Button group classes points at § Deferred
   selectors without enumerating, or names every deferred split-toggle selector; settle which.
9. **Analyst 6.** The § Files row for `_button-group.scss` names its proof (`read by
   tests/src/styles/components/button-group.test.ts`), the way the validation row does.
10. **The portfolio.** Regenerate every button-group frame for the four variants:
    `CAPTURE=1 npm run test:journey -- --project 'journey:light-390*'` and the same for
    `light-1280`, `dark-390`, `dark-1280`; report the frame list and open
    `wrapping-toolbar--light-390.png` and the dropdown child's frame yourself.

## Not this unit's

- Patch A (`tests/setupServer.test.ts` Set literal) and Patch C (`ButtonSection.test.ts`
  exclusion): the Orchestrator's integration edits at landing.
- Blocker 2 (the toolbar and row flex pair): closed by D15.
- Analyst 1 and 4 (claim wording), 5 and 9; reviewer 5 and 9: the claims file and the
  Orchestrator's verifier chain.

## Scope

- Owned: `src/styles/components/_button-group.scss`,
  `tests/src/styles/components/button-group.test.ts`, `app/browser/sections/ButtonGroupSection.ts`,
  `tests/app/browser/sections/ButtonGroupSection.test.ts`, `app/browser/constants.ts` (the
  button-group block only), `guides/veneer.md` (§ Button group classes, § Button toolbar classes,
  the `_button-group.scss` § Files row only), `tests/setup.ts` (the rows and the block this unit
  appended only), `tests/setup.test.ts` (the sites this unit added only),
  `tests/app/browser/Showcase.test.ts` (the authorized line and its import only),
  `tests/app/browser/integration.test.ts` (the button-group cases only), `tests/setupStyles.ts`
  (the button-group tables only), `tmp/capture/states/**`.
- Shared (report-only): none.
- Off-limits: `tests/setupServer.ts`, `tests/setupServer.test.ts`,
  `tests/app/browser/sections/ButtonSection.test.ts`, `src/styles/_grid.scss`,
  `src/styles/_mixins.scss`, `src/styles/_tokens.scss`, `src/styles/components/_button.scss`,
  `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/fixtures/**`, `configs/**`,
  `.claude/settings.json`, every other file.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped
`npx oxfmt --config .oxfmtrc.json --write` over the owned files, then `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run build:src`, `npm run test:src:styles`,
`npm run test:app` (Blocker 3 red only), `npm run test:conformance`, `npm run test:guides`,
`npm run test:setup` (Blocker D1 red only), and the four capture journeys, all from
`/home/user/veneer-bb`.

## Output

Write `/home/user/veneer-bb/tmp/units/b-passive-b-report-2.md` and return the same text: per
finding, the change, the mutation, the red reading (command and count), and the green reading; the
corrected coverage matrix; the touched files; the gate exits with counts; the frame list;
`git status --porcelain`; deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names, and on any finding whose fix needs an
off-limits line. Settle yourself: which specimen carries the dropdown-toggle child, case titles,
the sentence forms in the guide, the labels of the renamed toolbar's groups.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:styles` exits 0 with finding 1's readings present.
3. `npm run test:conformance` and `npm run test:guides` exit 0; `npm run test:app` reports Blocker 3
   as its only red and `npm run test:setup` Blocker D1 as its only red.
4. Every button-group frame exists for the four variants and no `wide-toolbar` frame remains.
5. `git status --porcelain` lists only the unit's paths.

**Observations, not criteria.** `npm run test:journey` (whole) and `npm run test:policy` readings
under load.

## Review evidence

The report, the diff of every owned file, and the regenerated frames.
