# Unit B-PASSIVE-E-3 — the flat-fill frame, and the round-2 leftovers

Successor of `tmp/units/b-passive-e-brief-2.md` (ran; report `tmp/units/b-passive-e-report-2.md`).
What changed and why: round 2 closed every carried finding except one acceptance criterion — the
`glowing-placeholder` row now names the bar itself, and the portfolio guard refuses the frame because
a placeholder bar paints one flat fill (report § D1). The Orchestrator rules (D21): a uniform region
whose colour differs from the frame's floor is a paint and is admitted; a uniform region equal to the
floor is blank and stays refused. Round 2 also reported two patches outside its grant (§ D2, § D3) and
one finding outside its scope (the placeholder mode case). This round carries all of them.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-be`, a git worktree detached at `3a9202a` carrying the unit's uncommitted writes.
Perform the assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-be`
for every command and file, and run every npm and npx command from `/home/user/veneer-be`; your
shell may start elsewhere. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

The portfolio guard admits a flat non-floor region and refuses a floor-coloured one, proved both
ways; the `glowing-placeholder` frame passes the guard with the round-2 row unchanged; the placeholder
mode case distinguishes its named mutation; the partial's comment and the report's patch body carry
no false or banned-sense sentence.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,styles,browser,application,documentation,writing}.md`.
Design: `tmp/units/b-passive-design-verdict.md`, the family record `tmp/units/b-passive-family.md`,
D17 and D18 as recorded there. Skill: none. Guide: `guides/veneer.md` § Placeholder classes.

**Evidence.** `tests/setupBrowser.ts`: `measureVariation(encoded, region)` (around line 102)
returns the variation inside a frame's declared region; `tests/setupBrowser.test.ts` (around lines
190 to 205) proves it against `CAPTURE_CONTROLS.blank` and `CAPTURE_CONTROLS.painted`.
`tests/app/browser/integration.test.ts`, the portfolio case `reads every frame this variant left in
the portfolio directory inside its declared region` (around lines 879 to 918): reads each capture
artifact's `region` and `floor`, calls `measureVariation`, and asserts
`expect(variation, \`Uniform frame region: ${path}\`).toBeGreaterThan(0)`. The round-2 measurement:
`glowing-placeholder--light-1280.png` is 1280 by 21, floor `rgb(255, 255, 255)`, region `{ x: 0,
y: 4, width: 746.65625, height: 14 }`, and row 10 reads one grey run `(144, 148, 157)` over columns
0 to 746 then white; the variation is 0. `tests/src/styles/components/placeholder.test.ts`, the case
`takes its fill from the text of whichever mode it renders in`, mounts the host with
`style="color:var(--vn-text-body-base)"` and compares the fill against that text, so replacing
`.placeholder`'s `background-color: currentcolor` with `var(--vn-text-body-base)` leaves every
comparison equal (round-2 report § Findings outside this round's scope). The spinner mode case, as
round 2 rewrote it, is the pattern: read each mode twice, once inherited and once with the mode
scope's own `color` moved to a value no rule of this cascade writes.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `node_modules` installed, `dist/` present. Sibling
units and gate chains share the container (load 5 to 40): a `test:journey`, `test:policy`, or
`test:setup` timeout is a timing reading you report, never a defect you diagnose. `prettier` must
never run; `oxfmt` is the formatter. `npm run test:setup` and `npm run test:app` are red at baseline
on the standing blockers D2, D3, and D4 the round-2 report names; report that they are the only
reds.

**Control identifiers.** none; name every test for what it proves.

## Unknowns

none.

## Findings

1. **D21 — the guard.** Amend the portfolio case's rule: a region whose variation is 0 is refused
   only when its colour equals the frame's `floor`; a flat region of another colour is a paint and
   passes. Put the reading in the reader, not the case: extend or pair `measureVariation` in
   `tests/setupBrowser.ts` so the case can ask whether a uniform region is the floor (settle the
   shape yourself — a second exported reader over the same decoded frame, or a richer return —
   under the single-word entity API law and `names.md`), keep the assertion message naming the path,
   and prove the reader in `tests/setupBrowser.test.ts` both ways with in-memory frames: a flat
   region of the floor colour refused, a flat region of another colour admitted, the existing blank
   and painted controls unchanged. Mutation: the reader treating every uniform region as blank;
   red, revert by the exact reverse edit, green.
2. **The frame.** With the guard amended and the round-2 row unchanged, run
   `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project 'journey:light-1280*' --testTimeout=120000`
   and record that `glowing-placeholder--light-1280.png` is accepted; then the same for
   `light-390`, `dark-1280`, and `dark-390`. Report the placeholder frame list.
3. **The placeholder mode case.** Rework `takes its fill from the text of whichever mode it renders
   in` the way round 2 reworked the spinner's: each mode read twice, the moved reading shifting the
   mode scope's own `color` to `rgb(10, 20, 30)` and requiring the fill to follow it, with the
   assertion that neither mode's body text resolves to that value. Mutation: `background-color:
   currentcolor` replaced by `var(--vn-text-body-base)` in `src/styles/components/_placeholder.scss`;
   red, revert, green, the partial's SHA-256 recorded before and after.
4. **The partial's comment (round-2 § D2).** Apply the exact patch the round-2 report carries to
   `src/styles/components/_placeholder.scss`'s `.placeholder-wave` comment (the managed Chromium and
   Edge receipts, not "the build's targets"). The compiled cascade must not change (compare
   `dist/src/styles/index.css` before and after).
5. **The report's patch body (round-2 § D3).** In `tmp/units/b-passive-e-report.md`, the
   `vite.config.ts` patch body around line 667: `once the passive` reads `after the passive`.

## Not this unit's

- D2 (the `tests/setupServer.test.ts` Set literal), D3 (the sweep case, closed by B-SWEEP-2), D4
  (the showcase `.btn` assertion in `Showcase.test.ts`): the Orchestrator's integration edits at
  landing.
- The `vite.config.ts` patch itself: scaffold-owned; the Orchestrator rules on it at landing.

## Scope

- Owned: `tests/setupBrowser.ts` (the variation reader region only), `tests/setupBrowser.test.ts`
  (its cases and the inventory literal), `tests/app/browser/integration.test.ts` (the portfolio case
  only), `tests/src/styles/components/placeholder.test.ts`, `src/styles/components/_placeholder.scss`
  (the comment of finding 4 and the transient plant of finding 3 only),
  `tmp/units/b-passive-e-report.md` (line of finding 5 only), `tmp/capture/states/**`.
- Shared (report-only): `tests/setup.ts`, `app/browser/constants.ts`, `tests/setupStyles.ts`.
- Off-limits: `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.test.ts`,
  `tests/app/browser/Showcase.test.ts`, `vite.config.ts`, `src/styles/_tokens.scss`,
  `src/styles/_mixins.scss`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/fixtures/**`,
  `configs/**`, `.claude/settings.json`, every other file.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped
`npx oxfmt --config .oxfmtrc.json --write` over the owned files, then `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run build:src`, `npm run test:setup:browser`,
`npm run test:src:styles`, `npm run test:guides`, and the four capture journeys of finding 2, all
from `/home/user/veneer-be`.

## Output

Write `/home/user/veneer-be/tmp/units/b-passive-e-report-3.md` and return the same text: per
finding, the change, the mutation, the red reading (command and count), and the green reading; the
touched files; the gate exits with counts; the placeholder frame list; `git status --porcelain`;
the partial's SHA-256 before and after; deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names. Settle yourself: the reader's shape and
name in finding 1, case titles, the in-memory frames' construction.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:setup:browser` exits 0 with finding 1's cases present; `npm run test:src:styles`
   exits 0 with finding 3's rework present.
3. Every `glowing-placeholder--*` frame is accepted by the portfolio case in its variant's run.
4. `npm run test:guides` exits 0.
5. `git status --porcelain` lists only the E paths plus `tests/setupBrowser.ts` and
   `tests/setupBrowser.test.ts`.

**Observations, not criteria.** `npm run test:journey` (whole), `npm run test:setup`, `npm run
test:app`, and `npm run test:policy` readings under load and the standing blockers.

## Review evidence

The report, the diff of every owned file, and the regenerated frames.
