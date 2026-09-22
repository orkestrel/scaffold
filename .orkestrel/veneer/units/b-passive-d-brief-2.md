# Unit B-PASSIVE-D-2 — pagination fix round

Successor of `tmp/units/b-passive-d-brief.md` (ran; report `tmp/units/b-passive-d-report.md`). What
changed and why: the audit round returned the analyst verdict
(`tmp/units/bd-audit-analyst-verdict.md`, `FAIL 3, 4, 5, 6, 9; outside the claims: O1`), the reviewer
verdict (`tmp/units/bd-audit-reviewer-verdict.md`, `FAIL 1, 2, 5, 6, 7, 9; outside the claims: F1,
F2, F3`), and the checker verdict (`tmp/units/bd-audit-checker-verdict.md`). This round carries every
finding the Orchestrator assigned to the unit; the rest are named under § Not this unit's.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bd`, a git worktree detached at `3a9202a` carrying the unit's uncommitted writes.
Perform the assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-bd`
for every command and file, and run every npm and npx command from `/home/user/veneer-bd`; your
shell may start elsewhere. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every finding in § Findings is closed in the owned files, each proof change ran red under its named
mutation and green after, and the capture portfolio holds the regenerated pagination frames with an
unclipped focus ring.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,styles,browser,application,documentation,writing}.md`.
Design: `/home/user/veneer-bd/tmp/units/b-passive-design-verdict.md` and the family record
`/home/user/veneer-bd/tmp/units/b-passive-family.md` (family ruling 4 is the tokenizing ceiling;
ruling 13 the shared-file rule). Skill: none. Guide: `guides/veneer.md` § Pagination classes.

**Decisions since the first round.** D15 and its amendment
(`/home/user/scaffold/.orkestrel/veneer/b-sweep-design-verdict.md` § Amendment, staged here as
`tmp/units/b-sweep-design-verdict.md`): a declaration block two partials share because each
records an external value is a coincidence; `list-reset` is refused. The report's Patch B (the
`list-reset` mixin) is struck: apply nothing for it and mention nothing of it in the guide. D18:
a partial loads only the modules it reads.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `node_modules` installed, `dist/` present from the
first round. Sibling units and gate chains share the container (load 5 to 40): a `test:journey`,
`test:policy`, or `test:setup` timeout is a timing reading you report, never a defect you diagnose.
`prettier` must never run; `oxfmt` is the formatter. `npm run test:setup` is red at baseline on the
first round's Blocker D1 (the `tests/setupServer.test.ts` Set literal, off-limits) and stays so;
report the failing case names and confirm none is yours.

**Standing conditions.** `tests/setup.ts` carries the first round's `PAGINATION_KEYS` and the
resting rows; do not edit that file this round. The `tests/setupServer.test.ts` Set literal patch
(Patch A) stays a returned patch, unapplied.

**Control identifiers.** none; name every test for what it proves.

## Unknowns

Whether `npx oxfmt --check` reports `guides/ledger/departures.md` (the reviewer measured the
`#### \`pagination\`` table's header and separator one character wider than its rows by eye). Run it
first and report the reading; fix the padding only if it reports.

## Findings

1. **Analyst 3 — the disabled forms lack a pointer assertion.** In
   `tests/src/styles/components/pagination.test.ts`, the direct-form and parent-form disabled cases
   (around the equivalence case near line 184 and the pointer case near line 197) assert
   `pointer-events: none` on the link under each form, `.page-item.disabled .page-link` and
   `.page-link.disabled`. Mutation: `.page-link.disabled` given `pointer-events: auto` in
   `src/styles/components/_pagination.scss` while the parent form keeps `none`; record red, revert by
   the exact reverse edit, record green.
2. **Analyst 4 — the lifted specimen clips its focus ring.** In
   `tests/app/browser/integration.test.ts`, the pagination case (around line 672) prepends the
   specimen to `document.body`, so the ring's outward shadow above Page 1 has no captured space.
   Keep space around the lifted specimen (a wrapper the case creates and removes in the same
   `finally`, padded by at least the ring's spread, or an equivalent you name) and regenerate the
   pagination frames for every registered variant:
   `CAPTURE=1 npm run test:journey -- --project 'journey:light-390*'` and the same for
   `light-1280`, `dark-390`, `dark-1280`. Report the frame list under `tmp/capture/states/` and read
   `page-strip-focus--light-390.png` yourself: the ring must have space on every side.
3. **Analyst 6 — the guide promises an unobscured ring.** In `guides/veneer.md` § Pagination
   classes, the sentence that adjacent pages never cut the focus ring (around line 399) is false:
   focused and active links each stack at `z-index: 3`, so a later active sibling covers the earlier
   focused link's ring, as `page-strip-focus--light-1280.png` shows. Rewrite it to state the stacking
   values and their consequence, promising nothing the frame refutes. Bootstrap's declarations stay.
4. **Reviewer 6 — the palette consequence.** In the same section, after the sentence that the
   current page reads `--vn-palette-blue`, add one sentence stating that a
   `--vn-color-primary-base` retune leaves the current page and the page focus ring on Bootstrap's
   blue, because both read the palette token, and naming the overrides that move them
   (`--bs-pagination-active-bg`, `--bs-pagination-active-border-color`,
   `--bs-pagination-focus-box-shadow` on the strip), which the token-override case in
   `pagination.test.ts` proves a consumer can set. Do not touch § Customization (B-PASSIVE-CLOSE
   carries that bounding).
5. **Analyst O1 — `mountPagination` is a hidden reusable builder.** Move it from
   `pagination.test.ts` to `tests/setupBrowser.ts` (append it in that file's specimen-builder
   region, exported, with TSDoc in the file's voice), add it to the export inventory and give it a
   case in `tests/setupBrowser.test.ts`, and import it in the proof. Mutation for its case: the
   builder mounting one fewer page than asked; red, revert, green.
6. **Reviewer F2 — case-table rows addressed by position.** Replace `PAGINATION_STATE_CASES[2]`,
   `[0]`, `[1]`, `[0]` (around lines 128 to 142) and `PAGINATION_SIZE_CASES[0]` (around line 214)
   with a lookup by `name` through `requireValue(...find(({ name }) => name === 'hover'), 'No hover
   state case')` in the tree's idiom (`button.test.ts`, `container.test.ts`).
7. **State vocabulary (reviewer 6, noted; family ruling from the RANGE round).** In § Pagination
   classes and in `pagination.test.ts` doc comments, write `active` and `disabled` (the class
   words) where "current" and "unavailable" name the class states; keep "current" only where it
   names `aria-current`.
8. **The ledger padding (§ Unknowns).**

## Not this unit's

- Reviewer F1 (`CASCADE_KEYS` doc block) and the § Customization bounding: B-PASSIVE-CLOSE.
- Reviewer F3 and analyst 7 (the `list-reset` extraction): closed by D15's amendment; nothing lands.
- Patch A (`tests/setupServer.test.ts`): the Orchestrator's integration edit at landing.
- Analyst 5, 9; reviewer 5, 9: the Orchestrator's verifier chain.

## Scope

- Owned: `src/styles/components/_pagination.scss` (transient plants only; byte-identical at the
  end, SHA-256 recorded), `tests/src/styles/components/pagination.test.ts`,
  `app/browser/sections/PaginationSection.ts`,
  `tests/app/browser/sections/PaginationSection.test.ts`, `guides/veneer.md` (§ Pagination classes
  only), `tests/app/browser/integration.test.ts` (the pagination case only),
  `tests/setupBrowser.ts` (append `mountPagination` only), `tests/setupBrowser.test.ts` (the
  inventory literal and one case), `guides/ledger/departures.md` (padding only, per § Unknowns),
  `tmp/capture/states/**` (regenerated frames).
- Shared (report-only): `tests/setup.ts`, `tests/setup.test.ts`, `app/browser/constants.ts`.
- Off-limits: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.ts`,
  `tests/setupStyles.test.ts`, `src/styles/_mixins.scss`, `src/styles/_tokens.scss`,
  `src/styles/components/_list.scss`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
  `tests/fixtures/**`, `configs/**`, `.claude/settings.json`, every other file.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src` (which the styles proof needs).

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped
`npx oxfmt --config .oxfmtrc.json --write` over the owned files, then `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run build:src`, `npm run test:src:styles`,
`npm run test:app`, `npm run test:setup:browser`, `npm run test:guides`, and the four capture
journeys of finding 2, all from `/home/user/veneer-bd`.

## Output

Write `/home/user/veneer-bd/tmp/units/b-passive-d-report-2.md` and return the same text: per
finding, the change, the mutation, the red reading (command and count), and the green reading; the
touched files; the gate exits with counts; the frame list; `git status --porcelain`; the SHA-256 of
`_pagination.scss` before and after; deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names, and on any finding whose fix needs an
off-limits line. Settle yourself: sentence placement inside the section, case titles, the wrapper's
shape in finding 2, the builder's TSDoc.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:styles` exits 0 with findings 1, 5, and 6 present; `npm run test:setup:browser`
   exits 0 with the `mountPagination` case present.
3. `npm run test:app` and `npm run test:guides` exit 0.
4. Every pagination frame exists for the four variants and `page-strip-focus--light-390.png` shows
   the ring with space on every side.
5. `git status --porcelain` lists only the first round's paths plus `tests/setupBrowser.ts` and
   `tests/setupBrowser.test.ts`.

**Observations, not criteria.** `npm run test:journey` (whole) and `npm run test:setup` readings
under load.

## Review evidence

The report, the diff of every owned file, and the regenerated frames.
