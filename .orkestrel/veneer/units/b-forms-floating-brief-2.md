# Unit B-FORMS-FLOATING, round 2 — the fix round over the B-FORMS-FLOATING audit

Successor to `tmp/units/b-forms-floating-brief.md` (B-FORMS-FLOOR's `b-forms-floor-brief.md` landed
D32 in this worktree and is closed). What changed and why: the audit round
(`/home/user/scaffold/.orkestrel/veneer/units/bff-audit-analyst-verdict.md`, FAIL 2, 3, 6, 7, 10;
`bff-audit-reviewer-verdict.md`, FAIL 1, 2, 4, 6, 10, F1 to F3, R1 to R6; `bff-audit-checker-verdict.md`;
reconciled in `bff-audit-verdict.md`) found the barrel loading `validation` before the forms
partials (a floating invalid control loses its icon room), a global override no case reads, an
autofill sentence that overclaims, a comment that misstates the measured rewrite, and prose defects;
the Orchestrator ruled D34 (the height and floated top inset scale with density) and D35 (the forms
block follows the release's order, `validation` last, pinned by a conformance case). The original
brief stays in place unedited; its Objective, Context, Scope, Execution, Output, and Deviation
contract bind here except where this brief states otherwise.

## Role and engine

`opus` on Opus (native Claude subagent; the CLI serves Opus 5 for the alias), sole writer in
`/home/user/veneer-bff`, a git worktree detached at `2c10329` with the FLOATING and FLOOR writes
uncommitted in the tree (the state the audit ruled on). Perform the assignment directly and spawn
nothing. Use absolute paths under `/home/user/veneer-bff` for every command and file, and run every
npm and npx command from `/home/user/veneer-bff`; your shell may start elsewhere. Do not commit,
push, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, `git clean`, or `git
checkout-index`; undo a transient plant by the exact reverse edit.

## Objective

Every finding under § Carried findings is closed in the owned files, each proof change goes red under
its named mutation and green after the exact reverse edit, and the gates in § Acceptance criteria
are green.

## Context

**Evidence.** The verdicts cite by line at the audited tree. `src/styles/index.scss:55`
`@use 'components/validation';`, `:61` `form-range`, `:62` `form-floating`.
`src/styles/components/_form-floating.scss`: the density comment around lines 4 to 12, the height
and min-height `calc(3.5rem + calc(var(--bs-border-width) * 2))` at lines 24 to 25, the padding
shorthand at 51 to 54, the autofill comment at 71 to 74 ("into one `:is()` selector"), the floated
`padding-top: 1.625rem` at 67, 76, 81, 86. `src/styles/components/_validation.scss:43-45`
(`.form-control.is-valid`/`.is-invalid` `padding-right: calc(1.5em + 0.75rem)`, off-limits).
`tests/src/styles/components/form-floating.test.ts`: the density case around 344 to 376, the
override table around 390 (no `--bs-secondary-bg`), the disabled-backdrop case around 276, the
autofill case at 464 with its comment at 485 to 486. `tests/setupStyles.ts`: the
`FORM_FLOATING_CASES` TSDoc around 3743 (the autofill sentence). `guides/veneer.md`: `### Form
floating classes` 780 to 845 (the opening sentence 782 to 785; "an autofill" 791; 786 to 787 "belong
to the input-group family"; the evidence sentence 833 to 835; "is recorded beside the reading it
bounds" 834; "which this tree does not ship yet" 842); the § Compatibility row at 3041. The report
`tmp/units/b-forms-floating-report.md` § `ROADMAP.md` patch (lines 268 to 272). The release:
`bootstrap.css:2628-2631` (the floating padding) before its validation block (around 2858). Locate
every site by its symbol; the line numbers are approximate. The space scale: `--vn-space-8` is
`calc(1rem * var(--vn-factor-density))` (`_tokens.scss:292`); no token carries `3.5rem` or
`1.625rem`.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,writing}.md`; no
skill; guide `guides/veneer.md`; the design `tmp/units/b-forms-design-verdict.md` (ruling 3: the
barrel order is the release's `_forms.scss` order) and the rulings D32, D33, D34, D35 in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`,
`server/index.d.ts`), `@orkestrel/contract`, `@orkestrel/guide`: this round adds no helper.

**Host.** bash; `/home/user/veneer-bff`; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
Chromium at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`); foreground
commands are capped at 10 minutes; sibling units and a landing chain run beside you; `prettier` must
never run, `oxfmt` is the formatter; no network is needed.

**Measurements.** Taken by the Orchestrator on 2026-09-23: `git status --short` lists the FLOATING
writes (four `A`, thirteen `M`) and FLOOR's `tests/setupServer.ts` and `tests/setupServer.test.ts`;
the analyst's compile matched the release and its grouped-autofill build reproduced
`:-webkit-any(…)` and `:is(…:autofill)`; `npm run check` exited 0 in the analyst lane; `npm run
test:setup` reports one failure (the Set literal) and `npm run test:conformance` one (GROUP's absent
`.input-group > .form-floating`).

**Control identifiers.** none; name every test for what it proves rather than for the control that
specified it.

**Standing conditions.** No sibling writes this worktree. The `probe` MCP server is unavailable: take
the runtime-probe fallback (mutation with exact revert) with its negative control, and report each
control's reading. `_validation.scss`, `_tokens.scss`, `_theme.scss`, `_mixins.scss` stay
off-limits. `tests/setupServer.test.ts` (the Set literal) and `ROADMAP.md` are the Orchestrator's
integration edits: the successor report carries the patches. `npm run test:conformance` stays red
on the sibling-absent presence reading until GROUP lands (an observation); every other conformance
case, the new barrel-order case included, must be green.

## Unknowns

none.

## Carried findings

1. **D35 (both lanes, claim 2): the barrel order.** Move `@use 'components/validation';` to
   directly after `@use 'components/form-floating';` (the forms block then reads `form-range`,
   `form-floating`, `validation`; the Orchestrator inserts the sibling partials at integration in
   the release's order: `form-control`, `form-select`, `form-check`, `form-range`, `form-floating`,
   `input-group`, `validation`). Add a case to `tests/conformance.test.ts` that reads
   `src/styles/index.scss` and asserts the forms partials present load as a subsequence of that
   release order (`form-control`, `form-select`, `form-check`, `form-range`, `form-floating`,
   `input-group`, `validation`), named for what it proves; plant: move the `validation` line back to
   its old position; the case must redden; reverse exactly. In `form-floating.test.ts`, add a case
   mounting a floating `.form-control.is-invalid` (and the valid twin) and asserting its
   `padding-right` resolves the validation icon's room (`calc(1.5em + 0.75rem)` at the control's
   font size), which the moved order restores; plant: the same barrel move; the case must redden.
2. **D34: the height and the floated top inset scale with density.** Write `height` and
   `min-height` as `calc(var(--vn-space-8) * 3.5 + calc(var(--bs-border-width) * 2))` and the
   floated `padding-top` as `calc(var(--vn-space-8) * 1.625)` on every rule that carries it; the
   density case asserts that at `--vn-factor-density: 2` the height and every inset scale together
   and the control's content box stays non-negative (height minus the vertical insets and borders
   ≥ 0), and that at factor 1 each resolves the release's value; run `npm run build:src && npm run
   test:conformance` and apply the ledger rows it prints (the `declared` height rows become
   `tokenized`; the `padding-top` rows appear as `tokenized`); rewrite the guide's density sentence
   and the partial's comment to state that the whole control scales with density and that the
   backdrop's `em` height and the `1.25` line height are relative already.
3. **Claim 6 (analyst): the `--bs-secondary-bg` override.** Add `--bs-secondary-bg` to the override
   table and assert the disabled textarea's backdrop follows an ancestor override; plant: drop the
   backdrop's `background-color` binding; the case must redden.
4. **Claim 6 (both): the autofill sentence.** At the guide (around 835), the `FORM_FLOATING_CASES`
   TSDoc, and the proof comment, replace the universal claim with "The installed browser exports
   offer no way to put a control into the autofilled state, so …".
5. **Claim 1 and F1: the autofill comment and case.** The partial's comment at the autofill rules
   and the proof's comment state the measured rewrite once, identically (a grouped list is rewritten
   by the build into `:-webkit-any(…)` and `:is(…:autofill)`, so each selector keeps its own rule);
   retitle the case "holds each autofill rule to the release's declarations, one selector per rule".
6. **Claim 6 (reviewer): the section's prose.** "which this tree does not ship yet" → "which Veneer
   does not ship yet"; split the opening sentence's nested serial list (782 to 785); "an autofill" →
   "the browser's autofill"; name the proof in "is recorded beside the reading it bounds"; rewrite
   786 to 787 to state that GROUP emits the input-group rules for a floating child and that their
   departures record under this key's table by attribution.
7. **F2: the § Compatibility row.** "…resolved geometry, paint, and motion, and the autofill and
   class-qualified disabled declarations, are proved in…".
8. **F3: the ROADMAP patch.** In the successor report: one carrier per row (B-FORMS-CONTROL
   recaptures the empty, filled, textarea, disabled, plaintext, and empty-focus scenarios and
   rewrites the guide's bare-controls sentence; B-FORMS-SELECT recaptures `form-floating-select`
   and, for the select line-height row, owns the `toBe('normal')` assertion and its comment and the
   guide sentence at 839 to 841); drop the floor row (D32 landed); drop the D34 row (closed here);
   add a B-PASSIVE-CLOSE row for the `MOTION` literal repeated across proofs (with the range,
   select, pagination, progress, icon-link, and spinner proofs named).

## Scope

**Owned.** `src/styles/components/_form-floating.scss`, `src/styles/index.scss` (the `validation`
line's position), `tests/src/styles/components/form-floating.test.ts`, `tests/conformance.test.ts`
(the new barrel-order case), `tests/setupStyles.ts` (the `FORM_FLOATING_*` tables and their TSDoc),
`guides/veneer.md` (`### Form floating classes`, the `form-floating` § Compatibility row, and the
`#### \`form-floating\`` ledger rows the gate prints), `tmp/units/b-forms-floating-report-2.md`
(the successor report).

**Shared (report-only).** `tests/setupServer.test.ts` (the Set literal), `ROADMAP.md` (the patch
restated with finding 8 applied).

**Off-limits.** Every other file: `_tokens.scss`, `_theme.scss`, `_mixins.scss`, `_validation.scss`,
`tests/fixtures/oracle/inventory.json`, `tests/setupServer.ts`, `tests/setupServer.test.ts`,
`tests/setup.ts`, `tests/setup.test.ts`, `app/**`, `configs/**`, `package.json`, `ROADMAP.md`, the
vendored files, and the earlier briefs and reports under `tmp/units/`.

**What asserts the state this change ends.** `tests/conformance.test.ts` (the new order case and the
ledger case reading the changed rows; owned); `tests/src/styles/components/form-floating.test.ts`
(the density, override, and validated-padding cases; owned); `tests/setupStyles.test.ts`'s
pinned-inventory binding stays true (the selectors are unchanged); derived by running `npm run
build:src`, `npm run test:conformance`, `npm run test:setup`, and the scoped browser run, bounded by
a grep for `3.5rem`, `1.625rem`, `this tree`, and `No script can` over `src/`, `tests/`, and
`guides/`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `git mv`; `git add -N` only to render diff evidence; no
`npm install`; no git command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-floating-report-2.md` (the successor report: every carried finding with the
site it changed, the plant table with each mutation's reddening cases and its exact revert, the
ledger rows the gate printed, the ROADMAP patch with finding 8 applied, the shipped key
`form-floating` for the Set literal, the gate table with exit codes, and the claims you flag as
unverified). Return as your final message: the report path, the `git status --short` output, and
the gate table. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on a finding whose fix would require an off-limits file, or on a ledger row the gate
prints that names a category other than `tokenized` for the D34 values. Decide, record, and carry on
from the new cases' titles and placement, the wording of the density sentence, and the nouns chosen
for the tokens.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files and `npx oxlint` over the owned TypeScript files exit 0;
   `npm run check` exits 0.
2. `npm run build:src` exits 0 and `npm run test:setup` reports exactly one failure (the Set literal).
3. `npm run test:conformance` reports exactly one failure (the sibling-absent presence reading), the
   new barrel-order case green, and under the finding 1 plant that case red.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-floating.test.ts`
   exits 0, and under each named plant the named case reddens and is green after the exact reverse
   edit.
5. `npm run test:guides` exits 0.
6. `tmp/units/b-forms-floating-report-2.md` exists with every section § Output names.

**Observations, not criteria.** `npm run test:src:styles`, `npm run test:journey`, and the four
`CAPTURE=1` runs (the frames change under D34: rerun them and report; the Orchestrator regenerates
at the landing).

## Review evidence

A code change: the actual diff against `2c10329` and the actual `git status --short`; the successor
report.
