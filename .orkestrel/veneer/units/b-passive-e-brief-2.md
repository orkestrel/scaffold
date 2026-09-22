# Unit B-PASSIVE-E-2 — the fix round

Successor to `tmp/units/b-passive-e-brief.md`. What changed: the audit round (`analyst` on Astra
`VERDICT: FAIL 1, 3, 4, 5, 6, 7, 8, 9`; `reviewer` on Opus `VERDICT: FAIL 1, 5, 9; outside: F1 to
F5`; `checker` `PASS`) reconciled by the Orchestrator. Settled outside this unit: the `@use
'../tokens'` conjunct (amended as D18: a partial loads only what it reads — no change); the grow
spinner frames (amended as D17: no frame for an empty resting paint — no change); the shared-block
overlaps (D15 — no mixin); the shipped-key Set literal and the showcase `.btn` scoping (integration
patches); the journey budget (the family's close reads it after B's traversal reorder); the gate
readings (the Orchestrator's runs). This round carries the findings that are the unit's own.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-be` (detached at `3a9202a`, carrying the E writes, which you keep). Perform the
assignment directly and spawn nothing. Do not commit, push, install, or run any git command that
discards a working-tree change. Use absolute paths under `/home/user/veneer-be`; your harness cwd
may read differently and is not your subject.

## Objective

The findings below are closed in the owned files, each proof change with its red-then-green
reading, and the guide and fixtures no longer claim what the tree does not do.

## Context

**Evidence.** The lane verdicts `tmp/units/be-audit-analyst-verdict.md` and
`tmp/units/be-audit-reviewer-verdict.md`, and the unit's report `tmp/units/b-passive-e-report.md`.
Sites (locate by symbol and text):

- Analyst 3: `tests/src/styles/components/spinner.test.ts` mode case (around `takes its paint from
  the text of whichever mode it renders in`) does not distinguish replacing the ring's
  `currentcolor` with `var(--vn-text-body-base)`, because the host uses that token — vary the
  inherited host colour independently within each mode and read the ring follow it.
  `tests/src/styles/components/placeholder.test.ts` sizing case (`floors $name at its own share of
  the font`) always supplies a 40px font, so a `40px` literal floor passes — repeat the reading after
  changing the font size. Add the missing mutation comments before the cases around
  `progress.test.ts` line 72 and `spinner.test.ts` line 124.
- Reviewer F4: the three cases titled `writes every recorded selector into the components layer and
  no name beyond them` (progress, spinner, placeholder) assert a subset and one hand-picked absent
  name; retitle each to `writes every recorded selector into the components layer` and keep the
  absent-name assertion as the lookup's control the doc comment already names.
- Reviewer F1: `tests/setup.ts` registers `glowing-placeholder` with selector `.placeholder-glow` and
  property `color`, which no rule of the key sets (the registry's own rule: each property is one the
  key's own rule sets); change the row to selector `.placeholder-glow .placeholder` and property
  `animation-name`, the shape `animated-progress` uses; re-run the capture for that scenario and
  confirm the frame.
- Reviewer F3 and analyst 4: `PLACEHOLDER_MARKUP` in `tests/setupStyles.ts` renders the button
  placeholder with `href`, `role="button"`, `aria-disabled`, and an `aria-label` and its remark claims
  release fidelity, while `app/browser/constants.ts` renders it with `tabindex="-1"` and
  `aria-hidden="true"` (D10); bring the fixture to D10's shape, drop the inert `tabindex` (an `<a>`
  without `href` is not focusable) in both, and make each remark state D10's reason (a placeholder
  stands in for a label that has not arrived, so it is hidden rather than announced as an unnamed
  control) rather than a release-fidelity claim; correct the D10 attribution in your report
  (Bootstrap's documentation shows a no-`href` anchor with `aria-disabled="true"` and `aria-hidden`
  on the containing card; the shipped shape is Veneer's own ruling).
- Analyst 6 and reviewer referral: `guides/veneer.md` § Placeholder classes says the build's targets
  resolve the standard mask properties; the styles wrapper declares no targets (Vite's defaults are
  `chrome111`, `edge111`, `firefox114`, `safari16.4`, `ios16.4`) and unprefixed `mask-*` support
  begins at Chromium 120 — rewrite the sentence to rest on the browsers the guide supports (read the
  guide's own support statement and cite it), and rewrite the two pre-existing sentences of the same
  shape in § Helper classes (`-webkit-backface-visibility`) and the file-upload passage
  (`::-webkit-file-upload-button`) to the same footing, since they are now load-bearing for
  `dropped` ledger rows; add one sentence to § Placeholder classes naming the `-webkit-mask-position`
  alias dropped inside the wave keyframe, which the ledger cannot record because the comparison
  reads no keyframe.
- Analyst 6 and reviewer F2: the spinner compatibility row in § Compatibility says every official
  `--bs-spinner-*` property is declared on each spinner; the grow spinner declares no border-width
  variable — reword to "each on the spinner that declares it", matching `tests/setupStyles.ts`'s
  own comment.
- Reviewer referral: `placeholder.test.ts` selects the bare placeholder with `p > .placeholder`,
  which also matches the button specimen and resolves only by document order; select it
  unambiguously.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,documentation,writing}.md`.
Guide: `guides/veneer.md`. Family record: `tmp/units/b-passive-family.md` (ruling 8 amended).

**Host.** npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. Sibling lanes share the container; a timeout is
a timing reading you report. `prettier` must never run; `oxfmt` is the formatter.

**Standing conditions.** `npm run test:setup` reads red on the shared-block sweep and the
shipped-key literal (D2, D3 of your report) until integration; `npm run test:app` reads red on the
showcase `.btn` assertion (D4) until integration; report those readings as expected.

## Unknowns

none.

## Scope

- Owned: `tests/src/styles/components/{progress,spinner,placeholder}.test.ts`, `tests/setup.ts`
  (the `glowing-placeholder` row only), `tests/setupStyles.ts` (`PLACEHOLDER_MARKUP` and its remark
  only), `app/browser/constants.ts` (the button placeholder specimen and its remark only),
  `guides/veneer.md` (§ Placeholder classes, the two named sentences in § Helper classes and the
  file-upload passage, the spinner § Compatibility row only), `tests/app/browser/sections/PlaceholderSection.test.ts`
  (if the attribute change moves an assertion), `tmp/units/b-passive-e-report.md` (the D10
  attribution).
- Off-limits: every other file and every other region of the owned files.
- Tools and limits: Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
  `build` beyond `npm run build:src`.

## Execution

Perform the assignment directly and spawn nothing. Validate with scoped `npx oxfmt`, then
`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build:src`,
`npm run test:src:styles`, `npm run test:guides`, `npm run test:policy`,
`npx vitest run --project app:browser tests/app/browser/sections`, and
`CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --project 'journey:light-1280*' --testTimeout=120000`
(the `glowing-placeholder--light-1280.png` frame re-written); `npm run test:setup` and
`npm run test:app` as observations.

## Output

Write `tmp/units/b-passive-e-report-2.md` and return the same text: per finding, the change and
(for a proof change) the red reading of the named mutation with its command and count, then green;
the touched files; the gate exits; `git status --porcelain`; deviations per § Deviation protocol.
No process diary.

## Deviation contract

Stop and report on any file outside § Scope a finding needs. Settle yourself: wording, the
disambiguating selector.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run test:src:styles` exits 0 with the two reworked cases' mutations recorded red then green
   and the three titles corrected.
3. `npm run test:guides` and `npm run test:policy` exit 0.
4. The section proofs exit 0 scoped, and the light-1280 capture run writes
   `glowing-placeholder--light-1280.png` with the new row.
5. `git status --porcelain` lists the E files and nothing new.

**Observations, not criteria.** `npm run test:setup`, `npm run test:app`.

## Review evidence

The report and the diff of every owned file.
