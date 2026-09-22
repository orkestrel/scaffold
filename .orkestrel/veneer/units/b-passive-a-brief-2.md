# Unit B-PASSIVE-A-2 — badge, breadcrumb, and close fix round

Successor of `tmp/units/b-passive-a-brief.md` (ran; report `tmp/units/b-passive-a-report.md`). What
changed and why: the audit round returned the analyst verdict
(`tmp/units/ba-audit-analyst-verdict.md`, `FAIL 3, 5, 6, 7, 8, 9; outside the claims: F1`), the
reviewer verdict (`tmp/units/ba-audit-reviewer-verdict.md`, `FAIL 5, 8, 9; outside the claims: F1 to
F4`), and the checker verdict (`tmp/units/ba-audit-checker-verdict.md`). The design verdict the
first round lacked is staged as `tmp/units/b-passive-design-verdict.md`. The `CAPTURE_KEYS`
concatenation rewrite in `tests/setup.test.ts` was granted to every family unit by the
Orchestrator (reviewer R5). This round carries every finding the Orchestrator assigned to the unit;
the rest are named under § Not this unit's.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-ba`, a git worktree detached at `3a9202a` carrying the unit's uncommitted writes.
Perform the assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-ba`
for every command and file, and run every npm and npx command from `/home/user/veneer-ba`; your
shell may start elsewhere. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every finding in § Findings is closed in the owned files, each proof change ran red under its named
mutation and green after, every specimen the family requires is rendered and registered, and the
capture portfolio holds the regenerated frames.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,styles,browser,application,documentation,writing}.md`.
Design: `tmp/units/b-passive-design-verdict.md` and the family record `tmp/units/b-passive-family.md`
(ruling 4 the tokenizing ceiling; ruling 9 every recorded selector rendered by a specimen at least
once; ruling 10 one scenario per specimen; ruling 13 the shared-file rule). Skill: none. Guide:
`guides/veneer.md` § Badge classes, § Breadcrumb classes, § Close classes.

**Decisions since the first round.** D15 and its amendment (staged as
`tmp/units/b-sweep-design-verdict.md`): the report's deviation-1 mixin patch is refused; both copies
stay inline. D17: a specimen whose only paint is an animation frame registers no scenario — the
collapsed badge is an empty box, not an animation, so it registers one with a visible surrounding
region. D18: a partial loads only the modules it reads. D20: `CLOSE_KEYS` stays this family's list
for now; B-PASSIVE-CLOSE consolidates. D22: the `btn-close` attribution and its ledger table are
B-PASSIVE-CLOSE's; write nothing about it.

**Evidence.** `tests/setupBrowser.ts` is where reusable DOM builders live (`.claude/rules/tests.md`
§ Helpers); the round-1 proofs declare theirs inside `badge.test.ts`, `breadcrumb.test.ts`, and
`close.test.ts`, and a function is assigned inside a test callback in `tests/setupStyles.test.ts`
(around line 1475). The badge's own size is `0.75` of the host, so padding written as `0.4875em` of
the host reproduces the table's values at every host size; the input that separates the two
references is `--bs-badge-font-size: 2em` at a 16px host (`20.8` against `7.8`). The Button journey
case re-stages and re-reads its states after each shot because the hand-back moves the document
out from under the pointer (`integration.test.ts`, the Button scenarios); the close case reads its
states only before the shots.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `node_modules` installed, `dist/` present. Sibling
units and gate chains share the container (load 5 to 40): a `test:journey`, `test:policy`, or
`test:setup` timeout is a timing reading you report, never a defect you diagnose. `prettier` must
never run; `oxfmt` is the formatter. `npm run test:setup` and `npm run test:app` are red at
baseline on the standing blockers the round-1 report names (the `tests/setupServer.test.ts` Set
literal and the `ButtonSection.test.ts` variant exclusion, both off-limits); report that they are
the only reds.

**Control identifiers.** none; name every test for what it proves.

## Unknowns

none.

## Findings

1. **Analyst 3 — the close hover binding.** In `tests/src/styles/components/close.test.ts`, add a
   consumer hover override (`--bs-btn-close-hover-opacity` retuned on a scope around the control),
   drive hover with the installed pointer driver, and assert the driven opacity is the retuned
   value. Mutation: the hover rule's opacity written as the literal `0.75` in
   `src/styles/components/_close.scss`; red, revert by the exact reverse edit, green.
2. **Reviewer F1 — the badge geometry rationale.** In `tests/setupStyles.ts`, rewrite the
   `BADGE_GEOMETRY_CASES` doc block to state the rival the second host excludes (padding rewritten
   as an absolute length), and in `badge.test.ts` add the case that separates the badge's own size
   from the host's: mount at a 16px host, `scene.load('.badge { --bs-badge-font-size: 2em; }')`,
   assert `padding-left` reads `20.8`. Mutation: padding written as `0.4875em` of the host; red,
   revert, green. Correct the case comment that repeats the false rationale.
3. **Analyst 8 — specimens and scenarios.** Add a button-host specimen rendering `.btn .badge`
   (family ruling 9), asserted in `BadgeSection.test.ts`; register a resting scenario in
   `CASCADE_KEYS` (append) for `Badge word`, `Badge at heading scale`, `Badge collapsed`, and
   `Breadcrumb single step`, the collapsed badge's region being its visible label host; regenerate
   every badge, breadcrumb, and close frame for the four variants
   (`CAPTURE=1 npm run test:journey -- --project 'journey:<variant>*'`) and report the frame list.
   The Button-region host count moves by the button-host specimen: that is the off-limits
   `ButtonSection.test.ts` exclusion the Orchestrator patches at landing; report the new red case
   name.
4. **Analyst F1 — helper placement.** Move the reusable fixture builders out of `badge.test.ts`,
   `breadcrumb.test.ts`, and `close.test.ts` into `tests/setupBrowser.ts` (exported, TSDoc in the
   file's voice, inventory rows and cases in `tests/setupBrowser.test.ts`); replace the function
   assigned inside the test callback in `tests/setupStyles.test.ts` (around line 1475, the unit's
   own case) with an inline expression or an exported, tested leaf in `tests/setupStyles.ts`.
5. **Reviewer F2 — the inverted close specimen.** In `app/browser/constants.ts`, the dark cell's
   visible text is `Inverted notice`, distinct from the control's accessible name `Dismiss the
   inverted notice`; update `CloseSection.test.ts` and regenerate the frame.
6. **Reviewer R2 — the close journey case.** In `tests/app/browser/integration.test.ts`, the close
   case re-stages and re-reads `rest`, `hovered`, and `focused` after each shot the way the Button
   scenarios do, and asserts them there.
7. **Analyst 6 — the guide.** In § Badge classes, narrow "every length the badge carries is
   relative" to the font, the padding, and the `em` box (the `top: -1px` offset is absolute); in
   § Close classes, narrow "every part scales with the surrounding text" to the `em` box (the radius
   and the focus shadow read `rem`). Write `active` and `disabled` (the class words) wherever the
   sections name those states.

## Not this unit's

- Reviewer F3 (`CLOSE_KEYS` naming): D20, B-PASSIVE-CLOSE. Reviewer F4 and R1 (the `btn-close`
  attribution): D22, B-PASSIVE-CLOSE.
- The `tests/setupServer.test.ts` Set literal and the `ButtonSection.test.ts` exclusion: the
  Orchestrator's integration edits at landing.
- Analyst 5, 7, 9; reviewer 5, 9; R3 (the claims file's counts): the claims file and the
  Orchestrator's verifier chain.

## Scope

- Owned: `src/styles/components/{_badge,_breadcrumb,_close}.scss` (transient plants only;
  byte-identical at the end, SHA-256 recorded), `tests/src/styles/components/{badge,breadcrumb,close}.test.ts`,
  `app/browser/sections/{Badge,Breadcrumb,Close}Section.ts` and their proofs under
  `tests/app/browser/sections/`, `app/browser/constants.ts` (the badge, breadcrumb, and close
  blocks only), `guides/veneer.md` (the three sections only), `tests/setup.ts` (append-only rows
  and the unit's own `CLOSE_KEYS` block), `tests/setup.test.ts` (the unit's own sites),
  `tests/setupStyles.ts` (the unit's own tables), `tests/setupStyles.test.ts` (the unit's own
  case), `tests/setupBrowser.ts` (append the builders only), `tests/setupBrowser.test.ts` (the
  inventory literal and the builders' cases), `tests/app/browser/integration.test.ts` (the close
  case only), `tmp/capture/states/**`.
- Shared (report-only): `tests/app/browser/Showcase.test.ts`.
- Off-limits: `tests/setupServer.ts`, `tests/setupServer.test.ts`,
  `tests/app/browser/sections/ButtonSection.test.ts`, `src/styles/_mixins.scss`,
  `src/styles/_tokens.scss`, `src/styles/components/_button.scss`, `guides/ledger/**`,
  `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/fixtures/**`, `configs/**`,
  `.claude/settings.json`, every other file.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped
`npx oxfmt --config .oxfmtrc.json --write` over the owned files, then `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run build:src`, `npm run test:src:styles`,
`npm run test:setup:browser`, `npm run test:app` (the standing blocker red only),
`npm run test:conformance`, `npm run test:guides`, and the four capture journeys, all from
`/home/user/veneer-ba`.

## Output

Write `/home/user/veneer-ba/tmp/units/b-passive-a-report-2.md` and return the same text: per
finding, the change, the mutation, the red reading (command and count), and the green reading; the
touched files; the gate exits with counts; the frame list; `git status --porcelain`; the partials'
SHA-256 before and after; deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names, and on any finding whose fix needs an
off-limits line. Settle yourself: the button-host specimen's copy, case titles, the builders' names
under `names.md`, the sentence forms in the guide.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:styles` exits 0 with findings 1 and 2 present; `npm run test:setup:browser`
   exits 0 with the builders' cases present.
3. `npm run test:conformance` and `npm run test:guides` exit 0; `npm run test:app` reports the
   standing blocker (and the button-host consequence of finding 3) as its only reds.
4. Every badge, breadcrumb, and close frame exists for the four variants, the new scenarios
   included.
5. `git status --porcelain` lists only the unit's paths plus `tests/setupBrowser.ts` and
   `tests/setupBrowser.test.ts`.

**Observations, not criteria.** `npm run test:journey` (whole), `npm run test:setup`, and
`npm run test:policy` readings under load.

## Review evidence

The report, the diff of every owned file, and the regenerated frames.
