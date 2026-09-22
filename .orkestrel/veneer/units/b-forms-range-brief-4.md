# Unit B-FORMS-RANGE-4 — range fix round

Successor of `tmp/units/b-forms-range-brief-3.md` (ran; report `tmp/units/b-forms-range-report-3.md`).
What changed and why: the audit round returned the analyst verdict
(`tmp/units/bfr-audit-analyst-verdict.md`, `FAIL 3, 4, 5, 6, 7, 9; outside the claims: none`), the
reviewer verdict (`tmp/units/bfr-audit-reviewer-verdict.md`, `FAIL 3, 5, 7, 9; outside the claims:
F1 to F7`), and the checker verdict (`tmp/units/bfr-audit-checker-verdict.md`). The claims' "29
rows" numeral and the checker's scope finding are the round's own defects (the claims file was wrong;
RANGE-2's brief granted `tests/setupServer.test.ts`) and carry nothing here. This round carries every
finding the Orchestrator assigned to the unit; the rest are named under § Not this unit's.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bfr`, a git worktree detached at `3a9202a` carrying the unit's uncommitted writes.
Perform the assignment directly and spawn nothing. Use absolute paths under `/home/user/veneer-bfr`
for every command and file, and run every npm and npx command from `/home/user/veneer-bfr`; your
shell may start elsewhere. Do not commit, push, install, or run `git checkout`, `git restore`,
`git stash`, `git reset`, `git clean`, or `git checkout-index`.

## Objective

Every finding in § Findings is closed in the owned files, each proof change ran red under its named
mutation and green after, the thumb paint reads the palette token the tokenizing ceiling names, and
the capture portfolio holds the range frames for every registered variant.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{tests,typescript,names,styles,browser,application,documentation,writing}.md`.
Design: `/home/user/veneer-bfr/tmp/units/b-forms-design-verdict.md` (ruling 10: the focus shadow
binds like `_button.scss`, which stays as shipped) and the family record
`/home/user/veneer-bfr/tmp/units/b-passive-family.md` (ruling 4, the tokenizing ceiling: an existing
`--vn-*` token binds only where it resolves to the recorded value; `--vn-palette-blue` resolves to
`#0d6efd` and `--vn-palette-white-base` to `#fff` in `src/styles/_tokens.scss`, while
`--vn-color-primary-base` resolves to an `oklch()` role color in each mode). Skill: none. Guide:
`guides/veneer.md` § Form range classes, § Compatibility (the `form-range` row), § Tests (the style
proofs list).

**Decisions since the first round.** D15 and its amendment (staged as
`tmp/units/b-sweep-design-verdict.md`): a shared block that records an external value is a
coincidence and both copies stay inline; the `flush-box` reversal of RANGE-3 stands. D18: a partial
loads only the modules it reads.

**Host.** Linux, bash, Node 22, npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`, `node_modules` installed, `dist/` present. Sibling
units and gate chains share the container (load 5 to 40): a `test:journey`, `test:policy`, or
`test:setup` timeout is a timing reading you report, never a defect you diagnose. `prettier` must
never run; `oxfmt` is the formatter. `npm run test:setup` is red at baseline on the sweep case
(`repeats no partial's ...` or `carries no shared written declaration block ...`) until B-SWEEP-2
lands; report that it is the only red.

**Control identifiers.** none; name every test for what it proves.

## Unknowns

none.

## Findings

1. **The tokenizing ceiling (family ruling 4).** In `src/styles/components/_form-range.scss`, the
   thumb's `background-color: var(--vn-color-primary-base)` (the `#0d6efd` the release records)
   and the held tint's `color-mix(in srgb, var(--vn-color-primary-base) 30%, #fff)` (the
   release's `#b6d4fe`) bind a role token that does not resolve to the recorded value. Rewrite
   them to `var(--vn-palette-blue)` and `color-mix(in srgb, var(--vn-palette-blue) 30%,
   var(--vn-palette-white-base))`, update the `form-range` rows in `guides/ledger/departures.md`
   (Veneer cell, `tokenized`), and have `tests/src/styles/components/form-range.test.ts` bind the
   thumb rule's declared value to `var(--vn-palette-blue)` through `readRules` beside the existing
   readings. Mutation: the role token restored in the thumb rule; red, revert, green. Then state in
   § Form range classes that a `--vn-color-primary-base` retune leaves the thumb on Bootstrap's
   blue, because it reads the palette token, the way the pagination section states it for the
   current page.
2. **Analyst 6, reviewer F1, F4, R3 — the guide overclaims the evidence.** In § Compatibility the
   `form-range` row says resolved geometry, paint, and motion are proved; rewrite it to name what
   is resolved (the host) and what is read as a declaration (the thumb and track rules) and where
   (`form-range.test.ts`). In § Form range classes' evidence paragraph: drop the "Two limits"
   tally; add the held-thumb drive limit the report records (a real pointer cannot hold the thumb
   through the readers); state that the ring's rendered evidence is open (the page frame shows the
   thumb and track, the ring's paint is not resolved on a part) and that the ring's contrast is
   uncompared for this key because `readRing` reads a part Chromium withholds. In `tests/setup.ts`,
   rewrite the `FORM_RANGE_KEYS` doc block's reason for the page frame to the blank-frame
   measurement `CASCADE_KEYS` states (an element frame taken where the showcase renders these
   specimens comes back blank), not the ring cropping; narrow the journey comment beside the
   `range-focus` placement in `tests/app/browser/integration.test.ts` the same way.
3. **Reviewer F2 site A.** In § Tests, insert
   `[the range classes](../tests/src/styles/components/form-range.test.ts)` after the vertical-rule
   link, in the list's own form.
4. **Reviewer F3 — one term for the state.** Write `disabled` at every site that names the class
   state `unavailable`: `app/browser/constants.ts` (the range paragraph and the accessible name
   `Disabled range value`), `guides/veneer.md` (§ Form range classes, "the disabled thumb"),
   `tests/app/browser/sections/FormRangeSection.test.ts` (title, bindings, expectations),
   `tests/app/browser/integration.test.ts` (the range case), `tests/setupStyles.test.ts` (the
   comment). Keep `unavailable` in `form-range.test.ts` where it names a reading that cannot be
   obtained. The accessible names stay distinct.
5. **Reviewer F5 — misfiled cases.** In `tests/setupStyles.test.ts`, move the two range cases out
   of `describe('reference map refusals')` to the end of `describe('styles setup')`, and retitle
   the markup case `carries the classed pair, the disabled control, and the bare control in the
   range markup`.
6. **Reviewer R1 — the compiled-cascade reading folds a conditioned twin into its resting rule.**
   In the moved binding case, key the written map by selector and condition (the tree's
   `collectMediaConditions` reading or the block's own `@media` text), so a dropped
   reduced-motion twin is its own missing entry. Mutation: the `::-moz-range-thumb` reduced-motion
   twin dropped from the partial; red, revert, green.
7. **Reviewer F6.** `form-range.test.ts`: "the declaration above" reads "the preceding declaration".
8. **Reviewer F7.** The easing and ring-width departure bullets in § Form range classes add the
   resolved clause in the icon-link bullet's form ("which resolves to `0.15s ease`"; "which
   resolves to a `0.1875rem` ring").
9. **Analyst 3 — the mutation readings.** Re-take each mutation the round-1 report names
   (appearance dropped, literal height, literal focus shadow, transition outside the mixin, the
   Gecko row dropped) with the exact command the analyst names, and record red and green in the
   report.
10. **Analyst 4, reviewer R2 — the portfolio.** Regenerate the range frames for every registered
    variant: `CAPTURE=1 npm run test:journey -- --project 'journey:light-390*'` and the same for
    `light-1280`, `dark-390`, `dark-1280`. Report the `range*` frame list under
    `tmp/capture/states/`; `range-focus--dark-390.png` and `range-focus--dark-1280.png` must exist.

## Not this unit's

- Reviewer F2 site B (the showcase-regions sentence and the components-layer class list in the
  guide's shared paragraphs): B-FORMS-CLOSE.
- Analyst 5, reviewer 5, checker 5 and 8: the claims file's defects; nothing to change.
- Analyst 7, 9; reviewer 7, 9: the Orchestrator's verifier chain and B-SWEEP-2.

## Scope

- Owned: `src/styles/components/_form-range.scss`, `tests/src/styles/components/form-range.test.ts`,
  `app/browser/sections/FormRangeSection.ts`, `tests/app/browser/sections/FormRangeSection.test.ts`,
  `app/browser/constants.ts` (the range copy and specimens only), `guides/veneer.md` (§ Form range
  classes, the `form-range` § Compatibility row, the § Tests list insertion only),
  `guides/ledger/departures.md` (the `form-range` rows only), `tests/setup.ts` (the
  `FORM_RANGE_KEYS` doc block only), `tests/app/browser/integration.test.ts` (the range case only),
  `tests/setupStyles.test.ts` (the two range cases only), `tmp/capture/states/**`.
- Shared (report-only): `tests/setup.test.ts`, `tests/setupServer.test.ts`.
- Off-limits: `tests/setupServer.ts`, `tests/setupStyles.ts`, `src/styles/_tokens.scss`,
  `src/styles/_theme.scss`, `src/styles/_mixins.scss`, `src/styles/elements/_fieldset.scss`,
  `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/fixtures/**`, `configs/**`,
  `.claude/settings.json`, every other file.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src` (which the styles proof and the ledger comparison need).

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped
`npx oxfmt --config .oxfmtrc.json --write` over the owned files, then `npm run format:check`,
`npm run lint:check`, `npm run check`, `npm run build:src`, `npm run test:src:styles`,
`npm run test:app`, `npm run test:conformance`, `npm run test:guides`, `npm run test:setup`
(baseline red on the sweep case alone), and the four capture journeys of finding 10, all from
`/home/user/veneer-bfr`.

## Output

Write `/home/user/veneer-bfr/tmp/units/b-forms-range-report-4.md` and return the same text: per
finding, the change, the mutation, the red reading (command and count), and the green reading; the
touched files; the gate exits with counts; the `range*` frame list; `git status --porcelain`;
deviations per § Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. No process
diary.

## Deviation contract

Stop and report on any file outside § Scope a gate names, and on any finding whose fix needs an
off-limits line. Settle yourself: sentence placement inside a section, case titles, the shape of
the selector-and-condition key in finding 6.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:styles` exits 0 with findings 1 and 9 present; `npm run test:setup` reports
   the sweep case as its only red, with the moved cases green.
3. `npm run test:app`, `npm run test:conformance`, `npm run test:guides` exit 0.
4. Every `range*` frame exists for the four variants.
5. `git status --porcelain` lists only the RANGE unit's paths.

**Observations, not criteria.** `npm run test:journey` (whole) and `npm run test:policy` readings
under load.

## Review evidence

The report, the diff of every owned file, and the regenerated frames.
