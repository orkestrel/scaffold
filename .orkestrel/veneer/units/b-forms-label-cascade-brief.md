# Unit B-FORMS-LABEL-CASCADE (`bfl`) — the form key's partial, the tiered attribution ladder, the tables, the shipped-key lists, the col label rows, and the guide

## Role and engine

`opus` on Opus 5.5 (native Claude subagent), sole writer in `/home/user/veneer-bfl` (a worktree
detached at `BFF_LANDED_SHA`, the session branch tip after B-FORMS-CLOSE-FORCED landed, with
`node_modules` installed by the Orchestrator). Perform the assignment directly and spawn nothing.
Use absolute paths under `/home/user/veneer-bfl` for every command and file, and run every npm and
npx command from `/home/user/veneer-bfl`. Do not commit, push, install, or run `git checkout`,
`git restore`, `git stash`, `git reset`, `git clean`, or `git checkout-index`. Routing note for the
record: this unit is objective by work class and runs on the native lane because its style proofs
drive Chromium, which the Codex sandbox denies. The sibling unit B-FORMS-LABEL-SHOW (`bfw`) writes
the section, the specimens, and the capture rows in its own worktree at the same time.

## Objective

The `form` key ships: `_form-label.scss` emits `.form-label`, `.form-text`, and the three
`.col-form-label*` rules with ruling D's bindings, loaded first among the forms partials; the
attribution ladder is tiered with `matchSelectorKey` exported and tested and every moved row
regrouped; `FORM_LABEL_CASES` and a dedicated `FormFloatingCase` carry per-property `reads`; the
shipped-key lists carry `form`; the `.col-form-label*` deferral rows are retired; the guide carries
the § Files row, `### Form label classes`, the `form`, `col`, and moved-key ledger tables, the
split per-key forms tables, the release-ordered forms sections, the Compatibility rows, and the
Showcase and Tests rows `bfw` returns; and the gates in § Acceptance criteria are green.

## Context

**Evidence.** The design ruling is `/home/user/scaffold/.orkestrel/veneer/b-forms-label-design-verdict.md`
(rulings A to L; read it first and follow it as written). The terrain is
`/home/user/scaffold/.orkestrel/veneer/units/b-forms-label-terrain-report.md` (pointers at
`e0c901a`; locate each site by symbol; it wins over any restatement here). The family records are
`/home/user/scaffold/.orkestrel/veneer/b-forms-design-verdict.md` (rulings 1, 2, 3, 8),
`units/b-passive-family.md`, `units/b-passive-baseline.md`; decisions D20, D22, D30, D31, D33,
D34, D35, D39a, D40, D40a in `units/decisions-round-2.md`. The Orchestrator's measurements at
`e0c901a` are recorded in `units/b-forms-label-design-brief.md` § Context (the `form`-only
selectors; the ledger totals today and with `form` shipped under the landed membership step).

Sites (locate by symbol):

```text
src/styles/index.scss                   the forms @use lines (form-control, form-select, form-check, form-range, form-floating, input-group, validation)
src/styles/_mixins.scss                 input-text (the $input-* run) and input-border; not included by the label rules (ruling D)
src/styles/components/_input-group.scss the $sizes precedent (D30) and the `.input-group-text` padding sum
src/styles/elements/_fieldset.scss      the legend values `.col-form-label` overrides
node_modules/bootstrap/scss/forms/_labels.scss and _form-text.scss   the release's rules; _variables.scss for $form-label-*, $form-text-*, $input-padding-y*, $input-border-width, $input-line-height, $input-font-size-*
tests/setupServer.ts                    attributeSelector (the membership step), matchShippedKey (the class-prefix fallback), indexRecordingKeys, collectShippedComponents, readCompatibility, renderRuleKey, collectDeclarationReads, filterComparableBlocks, readDeferrals, scanShippedDeferrals
tests/setupServer.test.ts               the plant "attributes a selector two shipped keys record to the more specific key", the readCompatibility expectation, the exports case
tests/conformance.test.ts               `listed` (the shipped keys), the barrel-order case over the release's _forms.scss sequence, the additions and departures equalities, the deferral scan
tests/setupStyles.ts                    FormControlCase and FormRangeCase (the shapes), FORM_FLOATING_CASES (the joined-string reads to retire), the tables' TSDoc voice
tests/setupStyles.test.ts               the floating Node case (the inline matchAll extraction and the key expressions), the sorted export list, the text-control and range cases routed through collectDeclarationReads and renderRuleKey
tests/src/styles/components/form-floating.test.ts   the components-layer case's joined-string reads half
guides/veneer.md                        § Files, the forms `###` sections (Validation classes … Form floating classes), § Deferred selectors (the three .col-form-label* rows), § Compatibility, § Departures (the pooled #### form-check table; #### row holding the .row-gap-* rows; #### btn; #### btn-close), § Additions, § Showcase, § Tests, the style-proof link paragraph
```

The ledger probe the Orchestrator took (design brief § Context): today 1058 departures and 157
additions; with `form` appended under the landed membership step, 43 departure rows move to
`form`. The tiered ladder (ruling A) is expected to return them and to move `.row-gap-*` from
`row` to `row-gap`, with `.btn-group-vertical` and `.btn-close-white` named as further movers by
the analyst; this unit measures the full list first (criterion 1) and regroups every moved row.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,architecture,writing,documentation}.md`.
Skill: none. Guide: `guides/veneer.md` (owned).

**Installed primitives.** `@orkestrel/test` (server and browser entries under
`node_modules/@orkestrel/test/dist/src/`), `@orkestrel/contract`. A helper whose job an installed
export does is a defect; the audit's checker probes the diff.

**Host.** Linux, bash, `/home/user/veneer-bfl`. Run
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. Never run `corepack use`. Chromium is installed; the scoped styles run is
`npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts --no-cache <files>`;
`npm run build:src` compiles the cascade to `dist/`. A probe under `tmp/probe/` runs through
`npm run test:probe`.

**Measurements.** Criterion 1 is the unit's own measurement of the ladder before any edit. Read
the shipped `legend` values, the `input-text` mixin's line-height token, and the compiled
`--vn-space-*` and `--vn-size-*` values before writing the label proofs' expectations.

**Control identifiers.** Rulings A to L, D22, D30, D35, R6 are this brief's labels. Name a test
for what it proves.

**Standing conditions.** The tree is clean at `BFF_LANDED_SHA`. The pre-existing bare tokens in
`tests/setupServer.ts` (`@param blocks` on `collectValueGaps` and `collectAdditions`: "as
{@link readCascadeBlocks} reads them") and `tests/setupStyles.ts` ("so `findRule` reaches") are
this unit's to fix (carrier ruling of the `bft` round-2 verdict): write "as the
{@link readCascadeBlocks} helper reads them" and "so the `findRule` helper reaches". The guide
reorder produces a large moved-block diff; keep the moved blocks byte-identical apart from the
edits the criteria name, so the checker proves it with `git diff --color-moved=plain`.

## Unknowns

- The full list of rows the tiered ladder moves (criterion 1 measures it; the guide tables follow
  the measurement; report every moved row with its old and new key).
- Whether any floating selector reads a variable only under an at-rule condition, which gives
  `FormFloatingCase` a `condition` field; report which selector forced it.

## Scope

**Owned.** `src/styles/components/_form-label.scss` (new), `src/styles/index.scss`,
`tests/src/styles/components/form-label.test.ts` (new),
`tests/src/styles/components/form-floating.test.ts`, `tests/setupStyles.ts`,
`tests/setupStyles.test.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`,
`tests/conformance.test.ts`, `guides/veneer.md`, `tmp/units/bfl-ladder-probe.test.ts` (run under
`tmp/probe/` and retained under `tmp/units/`), `tmp/units/bfl-report.md`.

**Shared (report-only).** `ROADMAP.md`, `README.md`, `tests/setup.ts`, `tests/setup.test.ts`,
`app/**`, `tests/app/**` (`bfw` owns them; `bfw` returns the § Showcase sentence and the § Tests
stem rows as exact text, which the Orchestrator hands you or lands at integration).

**Off-limits.** `src/styles/_tokens.scss`, `src/styles/_theme.scss`, `src/styles/_mixins.scss`,
every other partial, `src/styles/elements/**`, `tests/fixtures/**`, the paths `scaffold repair`
restores, every file not named in Owned.

**What asserts the state this change ends.** `tests/conformance.test.ts` (`listed` omits `form`;
the barrel-order case filters `labels` and `form-text` and guards with `arrayContaining`; the
deferral scan while the rows stand; Owned); `tests/setupServer.test.ts` (the `readCompatibility`
expectation; the plant's comment and rows; the exports case; Owned); `tests/setupServer.ts`
(the `attributeSelector` TSDoc; Owned); `tests/setupStyles.test.ts` (the sorted export list; the
floating spread comparison; Owned); `form-floating.test.ts` (the joined-string half; Owned);
`src/styles/index.scss` (no `form-label` line; Owned); `guides/veneer.md` (the deferral rows, the
missing Compatibility rows, the pooled table, the moved rows' Component cells, the missing tables
and section, § Showcase, § Tests; Owned); `ROADMAP.md` (the carrier rows; the Orchestrator's fold).
Search bound: grep for `FORM_FLOATING_CASES`, `'form-floating'`, `floating-labels`,
`col-form-label`, `.row-gap-0` over `src tests guides`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No commit, push, install, or
destructive git.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Write `tmp/units/bfl-report.md`: the ladder measurement (every moved row), the diff summary, each
criterion with its command and result line, the failing-first evidence, the unknowns' answers, the
mutation evidence, and the claims you flag as weakest. Return the same content as your final
message.

## Deviation contract

Stop and report where the tiered ladder moves a row the guide cannot regroup by the verdict's
rules, where `collectDeclarationReads` or `renderRuleKey` lacks what the label or floating case
needs, or where a criterion needs a file outside Owned. Decide, record, and carry on for the
case titles, the TSDoc wording beyond the quoted sentences, the `$sizes` list's shape, the guide
section's paragraph order, and the exact label specimen markup in `FORM_LABEL_MARKUP`.

## Acceptance criteria

1. **The ladder measured first.** A probe under `tmp/probe/` (retained afterwards as
   `tmp/units/bfl-ladder-probe.test.ts`) takes the ledger with `form` appended to `listed` under
   the landed membership step and under the tiered ladder (exact class, then the longest class
   prefix through `matchSelectorKey`, then recording order), and reports every row whose owner
   differs, with its selector, property, and both owners; the report lists them.
2. `npx oxfmt --check` over the owned files, `npm run format:check`, `npm run lint:check`, and
   `npm run check` exit 0.
3. `tests/setupServer.ts` exports `matchSelectorKey(classes, keys)` (the longest key any class
   equals or opens with) with `attributeSelector` and the class-prefix fallback routed through it,
   the TSDoc stating the tiered order; its proof and the plant pin each step: `.form-control-sm` →
   `form-control`, `.form-switch .form-check-input` → `form-check`, `.form-control-color.is-valid`
   → `is-valid`, `.row-gap-0` → `row-gap`, `textarea:focus` (recorded by `form` and
   `form-floating`) → `form`; mutations (drop the prefix step; reorder the steps; drop the
   longest-first sort) each redden a named row. Failing-first: run the plant before the ladder
   changes and record the red count.
4. `_form-label.scss` opens `@layer components` and writes, in the release's order, `.form-label`,
   `.form-text`, `.col-form-label`, and one `@each` over a local `$sizes` list (large then small,
   D30) for `.col-form-label-lg` and `.col-form-label-sm`, with ruling D's bindings exactly; a
   comment says the horizontal label reads the tokens the control's own inset and type read; the
   barrel loads `components/form-label` directly before `components/form-control`;
   `npm run build:src` exits 0 and the built cascade carries the five selectors in the components
   layer.
5. `tests/setupStyles.ts` declares `FormLabelCase` (`selector`, `component`, per-property `reads`),
   `FORM_LABEL_CASES` (frozen), `FORM_LABEL_MARKUP` (ruling K), and `FormFloatingCase` (`selector`,
   `rendered`, `condition` where a selector forces it, per-property `reads`) with
   `FORM_FLOATING_CASES` retyped and frozen; `tests/setupStyles.test.ts` gains the label Node case
   (selectors equal the inventory selectors whose classes open with `form-label`, `form-text`, or
   `col-form-label`; each recorded under its own `component` key and no other; `reads` equal the
   `collectDeclarationReads` entry through `renderRuleKey`), moves the floating Node case to the
   same per-property equality with no inline `matchAll(/var\(` left, and lists the new exports;
   `form-floating.test.ts`'s components-layer case keeps its layer reading and drops its
   joined-string `reads` half, retitled "authors every case selector in the components layer".
   Mutations: a `var()` moved between two declarations of one floating rule reddens the Node
   case; a row claiming `form` for `.col-form-label` reddens the label case.
6. `tests/src/styles/components/form-label.test.ts` reads, each with its mutation named in the
   report: the label margin from the space scale at density 1 and 2; the help text's margin, its
   `0.875em` size under a 20px parent, and its colour against the resolved `--bs-secondary-color`
   in light and dark and under a wrapper override; the horizontal label's content-box top level
   with the control's at each size (within 0.5px), at density 2, and under `--bs-border-width: 4px`
   on the row, with line height and font size compared; the legend's cleared margin and inherited
   size; the components layer. The scoped styles run over `form-label.test.ts` and
   `form-floating.test.ts` exits 0.
7. `tests/conformance.test.ts`: `listed` gains `'form'` in sort position; a frozen `FORM_PARTIALS`
   record in `tests/setupServer.ts` maps `labels` and `form-text` to `form-label` and
   `floating-labels` to `form-floating`; the barrel-order case asserts the barrel's forms
   subsequence equals the mapped, de-duplicated release list, drops the `arrayContaining` guard
   and the release filter, and is retitled "loads every forms partial in the release order,
   validation last"; `tests/setupServer.test.ts`'s `readCompatibility` expectation gains `form`.
8. `guides/veneer.md`: a § Files row for `_form-label.scss` before the `_form-control.scss` row;
   `### Form label classes` in the sibling sections' voice (the opening, behaviour, departure, and
   closing paragraphs the verdict's ruling E and the planner proposal draft give, with the
   `0.875em` and `--bs-secondary-color` limits stated); the three `.col-form-label*` rows deleted
   from § Deferred selectors; § Compatibility gains a `form` selector row, a `form` variable row
   naming the `--bs-form-*` variables the check and select rules declare, and a `col` row naming
   the label partial; § Departures gains `#### form` (the `.form-label` and `.form-text` margin
   rows, `tokenized`), `#### col` between `#### btn` and `#### container` (the `.col-form-label*`
   padding, line-height, and size font-size rows, `tokenized`), and a table for every other key
   the measured ladder moves rows to, with each moved row's Component cell and table following
   the measurement; the pooled `#### form-check` table is split into one `#### <key>` table per
   forms key in key sort order at its position; the forms `###` sections, Validation included,
   move into the release's order with `### Form label classes` first (D35), the moved blocks
   byte-identical; the style-proof paragraph links `form-label.test.ts`; § Showcase and § Tests
   carry the sentence and stem rows the Orchestrator supplies from `bfw` (or, where `bfw` has not
   returned them, the sentence naming the regions in ruling E's order and the five stems).
9. `npm run test:setup`, `npm run test:conformance` (the ledger equalities with the new tables,
   the deferral scan with the rows retired, the compatibility presence, the `listed` equality, the
   barrel order), `npm run test:guides`, and `npm run test:policy` exit 0.
10. The two pre-existing bare tokens named under Standing conditions carry their nouns.

**Observations, not criteria.** The whole `npm run test:src:styles`; `npm test`; the journey (the
label keys `bfw` registers read the styled values only on the integrated tree).

## Review evidence

The actual diff and status from the worktree, the report with the ladder measurement, the probe,
and `git diff --color-moved=plain -- guides/veneer.md` for the moved blocks.
