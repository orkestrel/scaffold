# Unit B-PASSIVE-C-2 — card and list group fix round

Successor of `tmp/units/b-passive-c-brief.md` (ran; report `tmp/units/b-passive-c-report.md`). What
changed and why: the audit round returned the analyst verdict
(`tmp/units/bc-audit-analyst-verdict.md`, `FAIL 2, 3, 5, 6, 7, 9; outside the claims: none`), the
reviewer verdict (`tmp/units/bc-audit-reviewer-verdict.md`, `FAIL 6, 7; outside the claims: F1 to
F5`), and the checker verdict (`tmp/units/bc-audit-checker-verdict.md`, `FAIL 3, 9`). This round
carries every finding the Orchestrator assigned to the unit; the rest are named under § Not this
unit's.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bc`, a git worktree detached at `3a9202a` carrying the unit's uncommitted writes.
Perform the assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-bc`
for every command and file, and run every npm and npx command from `/home/user/veneer-bc`; your
shell may start elsewhere. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every finding in § Findings is closed in the owned files, each proof change ran red under its named
mutation and green after, every recorded selector is rendered by a specimen, every anchor specimen
is a reachable link, and the capture portfolio holds the regenerated frames and accessibility
artifacts.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,styles,browser,application,documentation,writing}.md`.
Design: `tmp/units/b-passive-design-verdict.md` and the family record `tmp/units/b-passive-family.md`
(ruling 4 the tokenizing ceiling; ruling 9 every recorded selector rendered by a specimen at least
once; ruling 13 the shared-file rule). Skill: none. Guide: `guides/veneer.md` § Card classes and
§ List group classes.

**Decisions since the first round.** D15 and its amendment (staged as
`tmp/units/b-sweep-design-verdict.md`). D18. D20: `LIST_GROUP_KEYS` stays this family's list;
B-PASSIVE-CLOSE consolidates. Orchestrator ruling on the anchors: every anchor specimen carries
`href="#main"`, the form `LINK_SPECIMENS` uses, so the accessibility artifact records each link and
the keyboard reaches it; the traversal cost is an observation you measure, not a reason to withhold
the attribute.

**Evidence.** The recorded selectors no specimen renders: `.card-group > .card:not(:last-child) >
.card-img-top`, `> .card-img-bottom`, `> .card-footer`, the three `:not(:first-child)` twins, and
`.card > .list-group:first-child` and `:last-child` (`tests/fixtures/oracle/inventory.json`, the
`card` key). The list-group token proof reads resolved values without retuning either token, so a
literal `#0d6efd` in place of `var(--vn-palette-blue)` passes it. The card tab guard proof keeps its
resting link inside `.card-header-pills`; the list-group action cases drive only the resting anchor;
the override cases set properties on the component itself.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `node_modules` installed, `dist/` present. Sibling
units and gate chains share the container (load 5 to 40): a `test:journey`, `test:policy`, or
`test:setup` timeout is a timing reading you report, never a defect you diagnose. `prettier` must
never run; `oxfmt` is the formatter. `npm run test:setup` is red at baseline on the standing
blockers the round-1 report names (the `tests/setupServer.test.ts` Set literal, off-limits, and the
sweep case B-SWEEP-2 closes); report that they are the only reds.

**Control identifiers.** none; name every test for what it proves.

## Unknowns

none.

## Findings

1. **Analyst 2 — the palette consequence is unproved.** In
   `tests/src/styles/components/list-group.test.ts`, the token case retunes `--vn-palette-blue` and
   `--vn-color-primary-base` independently on the document element and reads the selected item's
   painted background: it follows the palette retune and ignores the role retune. Mutation:
   `--bs-list-group-active-bg: var(--vn-palette-blue)` written as the literal `#0d6efd` in
   `src/styles/components/_list-group.scss`; red, revert by the exact reverse edit, green.
2. **Analyst 3 — the proofs.** (a) In `card.test.ts`, the tab guard case compares a resting link
   inside `.card-header-tabs` against the active one; mutation: `.active` dropped from the tab
   selector. (b) In `list-group.test.ts`, the action cases drive the selected host and the resting
   host independently, on anchor and button hosts; mutation: `:not(.active)` dropped. (c) The group
   fixture carries `.card-img-top`, `.card-img-bottom`, and `.card-footer` on a non-last and a
   non-first card, and the embedded list first in one card and last in another; mutation: the
   non-last `.card-img-top` rule dropped. (d) The override cases set the override on an ancestor so
   shadowing is read; mutation: the component's own declaration removed so the ancestor's value
   leaks. Each red, revert, green, recorded.
3. **Reviewer F3, analyst 3 — the specimens.** `Card group` renders one card with `.card-img-top`
   and `.card-footer` and one with `.card-img-bottom`; a second list specimen (settle the name)
   places the group first in one card and last in another, so every selector in § Evidence is
   rendered (family ruling 9); assert both in `CardSection.test.ts`; register the resting
   scenario in `CASCADE_KEYS` (append).
4. **Analyst 7, reviewer 7 — the anchors.** Every `.card-link`, header `.nav-link`, and list-group
   action anchor carries `href="#main"`; the accessible names stay distinct; regenerate every card
   and list-group frame and artifact for the four variants
   (`CAPTURE=1 npm run test:journey -- --project 'journey:<variant>*'`) and confirm the artifacts
   record the links and the focus order reaches them. Measure the keyboard-walk case's duration
   before and after and report it.
5. **Analyst 6, reviewer 6, F5 — the guide.** In § Card classes: drop the counts ("the three image
   placements", "both header navigations", "Six slots declare no value" — name the slots without
   tallying); in both sections the barrel sentence reads "The component partial loads in the
   components layer, at the barrel's Bootstrap order"; the button-host state sentence in § List
   group classes is true only after finding 2(b) lands. Write `active` and `disabled` (the class
   words) wherever the sections name those states.
6. **Reviewer F2 — the `LIST_GROUP_KEYS` doc block.** State that the journey drives the state,
   shoots an element frame of the specimen lifted to the document's start, and reads the state back
   after its own shot, with the reason D7 measured (an in-place element frame comes back blank).
7. **Minor.** One comment above the `#{''}` empty declarations in `_card.scss` naming why they are
   written; the card-group case title reads "only at and above its boundary" without interpolating
   the key.

## Not this unit's

- Reviewer F1 (`CASCADE_KEYS` doc block): B-PASSIVE-CLOSE. Reviewer F4: D20.
- The `tests/setupServer.test.ts` Set literal: the Orchestrator's integration edit at landing.
- Analyst 5, 9; reviewer 9; checker 3, 9: the Orchestrator's verifier chain.

## Scope

- Owned: `src/styles/components/{_card,_list-group}.scss` (the comment of finding 7 and transient
  plants only; SHA-256 recorded), `tests/src/styles/components/{card,list-group}.test.ts`,
  `app/browser/sections/{Card,ListGroup}Section.ts` and their proofs under
  `tests/app/browser/sections/`, `app/browser/constants.ts` (the card and list-group blocks only),
  `guides/veneer.md` (the two sections only), `tests/setup.ts` (append-only rows and the unit's own
  `LIST_GROUP_KEYS` block), `tests/setup.test.ts` (the unit's own sites), `tests/setupStyles.ts`
  (the unit's own tables), `tests/setupStyles.test.ts` (the unit's own cases),
  `tests/app/browser/integration.test.ts` (the list-group case only), `tmp/capture/states/**`.
- Shared (report-only): `tests/app/browser/Showcase.test.ts`.
- Off-limits: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `src/styles/_mixins.scss`,
  `src/styles/_tokens.scss`, `src/styles/components/_ratio.scss`, `src/styles/elements/_figure.scss`,
  `guides/ledger/**`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/fixtures/**`,
  `configs/**`, `.claude/settings.json`, every other file.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped
`npx oxfmt --config .oxfmtrc.json --write` over the owned files, then `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run build:src`, `npm run test:src:styles`,
`npm run test:app`, `npm run test:conformance`, `npm run test:guides`, and the four capture
journeys, all from `/home/user/veneer-bc`.

## Output

Write `/home/user/veneer-bc/tmp/units/b-passive-c-report-2.md` and return the same text: per
finding, the change, the mutation, the red reading (command and count), and the green reading; the
touched files; the gate exits with counts; the frame and artifact list; the keyboard-walk durations;
`git status --porcelain`; the partials' SHA-256 before and after; deviations per § Deviation
protocol in `/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names, and on any finding whose fix needs an
off-limits line. Settle yourself: the second list specimen's name and copy, case titles, the
sentence forms in the guide.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:styles` exits 0 with findings 1 and 2 present.
3. `npm run test:app`, `npm run test:conformance`, `npm run test:guides` exit 0.
4. Every card and list-group frame and artifact exists for the four variants, and each artifact
   records its links.
5. `git status --porcelain` lists only the unit's paths.

**Observations, not criteria.** `npm run test:journey` (whole), `npm run test:setup`, and
`npm run test:policy` readings under load; the keyboard-walk durations.

## Review evidence

The report, the diff of every owned file, and the regenerated frames and artifacts.
