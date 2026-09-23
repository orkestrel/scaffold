# Design brief — B-FORMS-LABEL (the `form` key, the forms family's last unit)

## Role and engine

Two lanes on one brief, blind to each other: `planner` on Opus 5.5 (native subagent, clean context,
read-only) holds the **subjective** lane (shape, naming, the feel of the partial, the section, the
proofs, and the guide section a reader meets); `analyst` on GPT-6 Astra (`codex exec --sandbox
read-only` rooted at `/home/user/veneer`) holds the **objective** lane (correctness, constraints,
what the ledger, the readers, and the gates permit). Each lane performs the design directly, spawns
nothing, edits nothing, and returns a proposal; the Orchestrator reconciles the two into the plan.

## Objective

A unit plan for B-FORMS-LABEL: the unit (or units) that ships the `form` key of the forms family
at Veneer `e0c901a`, with owned files, order, acceptance criteria ordered cheap-first, the mutation
each proof distinguishes, the risks, and the rulings the Orchestrator must take before dispatch.

## Context

**Terrain.** `/home/user/scaffold/.orkestrel/veneer/units/b-forms-label-terrain-report.md` (the
Cursor Grok distillate at `e0c901a`, with `file:line` pointers; it wins over any restatement here;
stop and report where the tree disagrees with it).

**Measurements the Orchestrator took at `e0c901a`** (each with the command):

- The selectors the inventory records under `form` and under no other key are exactly
  `.form-label` (`margin-bottom: 0.5rem`), `.form-text` (`margin-top: 0.25rem`,
  `font-size: 0.875em`, `color: var(--bs-secondary-color)`), and `.form-switch`
  (`padding-left: 2.5em`), from a Python set difference over
  `tests/fixtures/oracle/inventory.json` `components.form.selectors` against every other key's
  `(selector, condition)` pairs. `.col-form-label`, `.col-form-label-lg`, and `.col-form-label-sm`
  are recorded under the `col` key only.
- The ledger today (`collectLedger(compileExpandedCascade(), readOracleInventory(), listed)` with
  the `listed` array of `tests/conformance.test.ts`, 55 keys, `col` among them, `form` not) reports
  1058 departures and 157 additions; the forms keys carry `form-check` 14, `form-control` 44,
  `form-select` 28, `form-range` 28, `form-floating` 28, `input-group` 8, and the validation keys
  their rows. The one `.form-switch` row is the `.form-switch .form-check-input` `transition`
  departure under `form-check`.
- The same ledger with `form` appended to `listed` reports the same totals with 43 departure rows
  re-attributed to `form`: `form-check` falls to 2, `form-control` to 21, `form-select` to 20. The
  membership step (`attributeSelector` in `tests/setupServer.ts` around line 1895) prefers a
  shipped key whose name is a class token of the selector and otherwise takes the first shipped
  recorder in inventory order, which is `form`; `.form-control-sm`, `.form-check-input`,
  `.form-select-sm`, and every selector whose tokens are not exactly a sibling key's name therefore
  move. The guide's per-key departure tables (`#### form-control`, `#### form-check`,
  `#### form-select`) would disagree with the measured ledger on those rows.
- No `.form-label`, `.form-text`, or `.col-form-label*` row exists in the ledger today because the
  cascade emits none of them.

**Family rulings.** `/home/user/scaffold/.orkestrel/veneer/b-forms-design-verdict.md`: ruling 1
(the union key attributes every forms selector once shipped), ruling 2 (VALIDATION's longest-class
-token preference), ruling 3 (naming: `_form-label.scss` emits `.form-label`, `.form-text`,
`.col-form-label*`; barrel order is Bootstrap's `_forms.scss` import order, where `labels` and
`form-text` precede `form-control`), ruling 8 (CLOSE retires the three `.col-form-label*` deferral
rows). The close verdict `/home/user/scaffold/.orkestrel/veneer/b-forms-close-design-verdict.md`
R5 (this unit) and R6 (`FORM_FLOATING_CASES` takes the per-property `reads` map under the shape
B-FORMS-CLOSE-TABLES gives the range table: `FormRangeCase` with `reads` keyed by property, the
Node comparison through the exported `collectDeclarationReads` helper). Decisions D20, D31, D33,
D34, D39a, D40, D40a in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`;
`units/b-passive-family.md` and `units/b-passive-baseline.md` bind every B unit.

**Tree.** `/home/user/veneer` at `e0c901a`. Two close units are in flight in their own worktrees
and land before this unit: B-FORMS-CLOSE-SPECIMENS (owns `app/browser/constants.ts`,
`tests/setup.ts`, the journey and the input-group section proof) and B-FORMS-CLOSE-TABLES (owns
`tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupServer.ts` and its proof,
`tests/conformance.test.ts`, the input-group and range style proofs); B-FORMS-CLOSE-FORCED then
owns `src/styles/_mixins.scss`, the forms partials, their proofs, and `guides/veneer.md`. Design
this unit for the tree after those land: name the sites by symbol and treat the range table's
per-property shape and the `collectDeclarationReads` helper as present.

**Bootstrap source.** `node_modules/bootstrap/scss/forms/_labels.scss` and `_form-text.scss`; the
variables in `node_modules/bootstrap/scss/_variables.scss` (`$form-label-*`, `$form-text-*`,
`$input-padding-y*`, `$input-border-width`, `$input-line-height`, `$input-font-size-*`).

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing}.md`; the
dispatch anatomy in `/home/user/scaffold/.agents/orchestration.md` § Dispatch anatomy. The guide
is `guides/veneer.md`.

**Host facts for the unit.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`;
Chromium installed; a `CAPTURE=1` journey run of one variant takes about two minutes; the
installed `driveTraversal` walk stops at the first element it reaches twice.

## Unknowns

- **Attribution.** How the ledger keeps the per-key tables when `form` ships: rule on the
  membership step (a prefix preference — a shipped sibling key whose name prefixes a class token
  wins over the union key; or attributing to `form` only what no sibling records; or another
  rule), name the plant in `tests/setupServer.test.ts` that pins it, and state what the guide's
  tables become for `.form-switch` (recorded under `form` alone) and for the 43 rows.
- **Shipped-key lists.** Every site that must gain `form` (`listed` in `tests/conformance.test.ts`,
  `readCompatibility` expectations in `tests/setupServer.test.ts`, the guide's Compatibility
  rows, the § Files row) and whether `collectShippedComponents` requires a shipped variable row
  for `form` (the inventory's `form.properties` is nonempty; the terrain cites
  `tests/setupServer.ts` around line 2432).
- **The `col` label rows.** Whether `_form-label.scss` ships `.col-form-label*` (recorded under
  `col`, a shipped Layout key) as the family verdict rules, and how the ledger attributes them
  (`col` is shipped; the selectors carry no `col` class token); name the deferral rows retired and
  the departure table the rows join.
- **Tokens.** Which tokens `.form-label`, `.form-text`, and `.col-form-label*` read: the space
  tokens for `0.5rem` and `0.25rem`, a size token for `0.875em` if the release's `$form-text-font-size`
  maps to one the cascade already ships (the feedback rule writes `font-size: 0.875em` in
  `_validation.scss`; read how it is bound there), the `input-text` mixin's line height and the
  `$input-padding-y + $input-border-width` sum (compare `.input-group-text` in `_input-group.scss`),
  and the `--bs-secondary-color` read; rule where a literal stays.
- **The section.** The showcase section's name and specimens (`FormLabelSection` per the family
  verdict; a labelled control, a help text, a horizontal `.col-form-label` row at each size), its
  copy, its `CaptureSubject` members and capture rows, and its proofs; the capture scenarios the
  key registers (resting frames only, as the sibling forms keys).
- **`FORM_FLOATING_CASES` (R6).** The interface it takes (its own, or `FormRangeCase` generalized)
  and the consumers its shape change makes false (`tests/setupStyles.test.ts` and
  `form-floating.test.ts`, per the terrain).

## Scope

Read-only. Read the terrain, the measurements, the family and close verdicts, the decisions, the
guide, and the tree. Edit nothing. Propose; do not decide for the Orchestrator.

## Execution

**A native subagent (planner):** perform the design directly and spawn nothing. **The bench engine
(analyst) reading this inside its own CLI:** perform the design directly and spawn nothing.

## Output

Return one proposal with these sections: `Units` (each with a name, role and engine route, owned
files, shared report-only files, off-limits files, order and dependencies, acceptance criteria
ordered cheap-first, the mutation each proof distinguishes, and the risks); `Rulings needed`
(each unknown, with the option, its cost, and a recommendation); `Files the result makes false`
(per unit, derived from the terrain's distillate); `Exit criterion` (the enumerated capabilities
whose closure ends B-FORMS-LABEL and, with it, the forms family); and, for the analyst, `Journal`
(the journal path and session id). No process diary.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. A lane that finds the
terrain and the tree disagreeing reports the disagreement and rules on the tree.

## Acceptance criteria

The proposal names the closure of the `form` key (partial, barrel line, table, Node case, browser
proof, section, registration, copy, specimens, capture rows, section proof, guide section and
ledger tables, shipped-key lists, deferral rows retired), every unit's owned files are disjoint
from every other unit's, and every proof named carries the mutation it distinguishes.
