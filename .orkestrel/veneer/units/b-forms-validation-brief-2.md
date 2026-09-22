# Unit B-FORMS-VALIDATION-2 — the fix round

Successor to `tmp/units/b-forms-validation-brief.md`. What changed: the audit round
(`analyst` on Astra `VERDICT: FAIL 2, 4, 6, 7, 8, 9, 10; outside: tooltip-density`; `reviewer` on
Opus `VERDICT: FAIL 7, 8, 10; outside: F2, F3, F4, F5, F6`; `checker` `FAIL 7`) reconciled by the
Orchestrator: claims 2, 6, 7, 9, and 10 are settled outside this unit (the theme-scope removal is
carried by SELECT and CHECK; the tooltip specimens by GROUP; the gate readings by the
Orchestrator's runs; D5's blast radius by the single-writer worktree). This round carries the
findings that are the unit's own.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bfv` (detached at `3a9202a`, carrying the VALIDATION writes, which you keep).
Perform the assignment directly and spawn nothing. Do not commit, push, install, or run any git
command that discards a working-tree change (`git checkout-index` included).

## Objective

The findings below are closed in the owned files, each with its red-then-green reading where it
is a proof change, and the guide and test prose no longer claims what the tree does not do.

## Context

**Evidence.** The lane verdicts: `tmp/units/bfv-audit-analyst-verdict.md`,
`tmp/units/bfv-audit-reviewer-verdict.md` (staged beside this brief). The unit's own report
`tmp/units/b-forms-validation-report.md`. Cited sites (locate by symbol and text, never by number):

- Analyst 4: `tests/src/styles/components/validation.test.ts` compares the focus ring's painted
  lengths against a hard-coded `[0, 0, 0, 3]` (two sites); a `3px` literal in the partial would
  pass. Read the resolved `--vn-focus-width` token and exercise a different width (override the
  token on the document element and read the ring move), so a severed binding reddens.
- Analyst 8 and reviewer 8: `guides/veneer.md` § Validation classes — the § Files row names the
  partial and not its proof (add the proof); the sentence claiming the tooltip type rescales with
  density is false (`--vn-size-2` is fixed; the unit's own proof pins `14px` before and after
  doubling the factor) — say the gap and the padding rescale and the type is held fixed; the
  temporal `once` ("again once the control is filled") becomes `after`; the phrases the analyst read
  as counts ("one partial", "one mixin") are recast without the numeral.
- Reviewer F2: `VALIDATION_COPY`'s lead paragraph in `app/browser/constants.ts` names "stacking"
  no specimen renders; drop the item (GROUP adds it with its specimen).
- Reviewer F3: the journey case title `paints a validation focus ring on each validated control in
  this run own variant` in `tests/app/browser/integration.test.ts` — retitle to name the passing
  and the failing text control and the run's variant, grammatically.
- Reviewer F4: the banned-sense hits — `validation.test.ts` case title "clears it once filled"
  (`after`), "read in the cases above" and "in the check case above" (`preceding`/`earlier`),
  `integration.test.ts` "the assertion below" (`following`), `tests/setup.ts` "Only the two text
  controls are driven" (drop the count). The test comment "Doubling them doubles every tokenized
  length here" beside the density case is the same false generalization as the guide's; fix both.
- Reviewer F5: `attributeSelector` in `tests/setupServer.ts` recomputes
  `collectSelectorClasses(selector)` for the fallback and spreads `[...members]` before a `filter`;
  reuse `classes` and drop the spread.
- Reviewer F6: the `VALIDATION_COPY` doc block reads "Holds the Validation region's accessible name
  and lead paragraph" while every sibling reads "Holds the X section's visible copy and accessible
  name"; match the siblings.
- Reviewer R1: the tooltip case compares `border-top-left-radius` to `border-top-right-radius`,
  true for any uniform radius; read the radius against `readToken('--bs-border-radius')` (or the
  token the declaration reads) so a dropped declaration reddens.
- Reviewer R2: `$icons` carries seven entries no shipped rule reads (`check`, `radio`,
  `indeterminate`, `switch-knob`, `switch-focus`, `switch-checked`, `select-indicator`), held by a
  comment; extend the binding in `tests/setupStyles.test.ts` (the case pinning `FORM_ICON_CASES`
  against the release's declarations) so every `$icons` value is read from the compiled cascade or
  the token map and compared to the release declaration that bakes it (the release's compiled
  `bootstrap.css` carries each URI in a `--bs-form-*` or `background-image` declaration; the D1
  unit named the release variable per key).

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,documentation,writing}.md`.
Guide: `guides/veneer.md`.

**Host.** npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Sibling units share the container; a timeout
is a timing reading you report. `prettier` must never run; `oxfmt` is the formatter.

**Standing conditions.** `tests/setupServer.test.ts` and `tests/src/styles/tokens.test.ts` stay as
they are; the theme-scope removal is not this unit's.

## Unknowns

Whether every `$icons` URI appears verbatim in the release's compiled stylesheet (the switch and
check images are declared under `--bs-form-switch-bg`, `--bs-form-check-bg-image`, and the
`.form-check-input:checked` rules); settle by grep and bind each key to the declaration you find,
reporting any key whose release declaration differs from the escaped `$icons` value.

## Scope

- Owned: `tests/src/styles/components/validation.test.ts`, `guides/veneer.md` (§ Validation
  classes and its § Files row only), `app/browser/constants.ts` (the `VALIDATION_COPY` block only),
  `tests/app/browser/integration.test.ts` (the validation case only), `tests/setup.ts` (the
  `VALIDATION_KEYS` remark only), `tests/setupServer.ts` (`attributeSelector` only),
  `tests/setupStyles.test.ts` (the icon binding case only), `tests/setupStyles.ts`
  (`FORM_ICON_CASES` only, if the binding needs rows).
- Off-limits: every other file and every other region of the owned files.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped `npx oxfmt`, then
`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build:src`,
`npm run test:setup`, `npm run test:src:styles`, `npm run test:app`, `npm run test:guides`,
`npm run test:policy`; `npm run test:journey` as an observation.

## Output

Write `tmp/units/b-forms-validation-report-2.md` and return the same text: per finding, the change
and (for a proof change) the red reading of the named mutation with its command and count, then
green; the touched files; the gate exits; `git status --porcelain`; deviations per § Deviation
protocol. No process diary.

## Deviation contract

Stop and report on any file outside § Scope a finding needs. Settle yourself: wording.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:styles` exits 0 with the focus-width token reading and the radius token
   reading present and their mutations recorded red.
3. `npm run test:setup` exits 0 with every `$icons` key bound to a release declaration.
4. `npm run test:app`, `npm run test:guides`, `npm run test:policy` exit 0.
5. A sweep of the owned prose for `once|above|below|should|simply|just` in the banned sense returns
   no hit (name the pattern and paths).
6. `git status --porcelain` lists the VALIDATION files and nothing new.

**Observations, not criteria.** `npm run test:journey`.

## Review evidence

The report and the diff of every owned file.
