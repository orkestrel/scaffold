# B-FORMS-LABEL design verdict

Reconciled by the Orchestrator from the two blind lanes on
`units/b-forms-label-design-brief.md`: `planner` on Opus 5.5 (native subagent, task
`a720a8917bb041407`, retained as `units/b-forms-label-design-planner-proposal.md`) and `analyst` on
GPT-6 Astra (`codex exec --sandbox read-only`, session `01a0cd69-1295-7a50-a1eb-23f864f73887`,
retained as `units/b-forms-label-design-analyst-proposal.md`). Terrain:
`units/b-forms-label-terrain-report.md` (Cursor Grok) and the Orchestrator's ledger probe recorded
in the brief. Tree: Veneer `e0c901a`; the units run on the tree after B-FORMS-CLOSE-FORCED lands.

## Units and routing ledger

| Unit | Short name | Role and engine | Owns | Order |
| --- | --- | --- | --- | --- |
| B-FORMS-LABEL-CASCADE | `bfl` | `opus` on Opus 5.5, native, worktree `/home/user/veneer-bfl` | `src/styles/components/_form-label.scss` (new), `src/styles/index.scss`, `tests/src/styles/components/form-label.test.ts` (new), `tests/src/styles/components/form-floating.test.ts`, `tests/setupStyles.ts` and its proof, `tests/setupServer.ts` and its proof, `tests/conformance.test.ts`, `guides/veneer.md` | after `bff` lands; parallel with `bfw` |
| B-FORMS-LABEL-SHOW | `bfw` | `opus` on Opus 5.5, native, worktree `/home/user/veneer-bfw` | `app/browser/sections/FormLabelSection.ts` (new), `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/app/browser/sections/FormLabelSection.test.ts` (new), `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`, `tests/setup.ts` | parallel with `bfl` from the same baseline |

Each unit's audit runs `analyst` on Astra, `reviewer` on Opus, and `checker` on Sonnet, blind, on
one claims file; the Orchestrator's tracked chain and `CAPTURE=1` regeneration settle the gates and
the frames after both land.

**Routing deviation, recorded.** `bfl` is objective by work class (the ladder, the lists, the
ledger) and runs on the native lane because its browser proofs drive Chromium, which the Codex
sandbox denies (the `bft` and `bff` precedent). `bfw` is subjective and drives the journey.

**Refused shapes, on the record.** The analyst's single integrated unit is split into `bfl` and
`bfw` (disjoint files, the `bfs`/`bft` precedent). The planner's `U0 bfl-probe` (a `builder` probe
run by `verifier`) is folded into `bfl` as its first step: the unit measures every row the tiered
ladder moves before it edits, and its report lists them, so the guide tables follow the
measurement rather than a belief. An objective `sol` ladder unit is refused for the reason the
planner gives (the ladder's expectation file cannot be owned disjointly from the guide's rows).

## Rulings

- **A Attribution.** The tiered ladder: among the shipped recorders of a selector, first the key
  whose name equals a class the selector carries (longest first, unchanged), then the key whose
  name a class opens with (longest first), then the first recorder in inventory order. The second
  step and the existing class-prefix fallback are one computation, extracted as an exported
  `matchSelectorKey(classes, keys)` helper with its own proof; `attributeSelector`'s TSDoc states
  the tiered order. The analyst's residual-union rule (`form` yields whenever a sibling records the
  selector) is refused: it writes one key's name into the mechanism, and D22 already rules that a
  selector belongs to its most specific key, which the tier expresses generally. The planner's
  expectation, to be measured by `bfl`'s first step: the 43 rows return to `form-control`,
  `form-check`, and `form-select`; `.row-gap-*` moves from `row` to `row-gap`; the analyst names
  `.btn-group-vertical` and `.btn-close-white` as further movers; `bfl` regroups every moved row
  into the table of its new key (creating `#### row-gap` and any other table a move needs) and
  reports the full list. The plant in `tests/setupServer.test.ts` pins each step:
  `.form-control-sm` → `form-control`; `.form-switch .form-check-input` → `form-check`;
  `.form-control-color.is-valid` → `is-valid`; `.row-gap-0` → `row-gap`; `textarea:focus`
  (recorded by `form` and `form-floating`) → `form`; and the mutations the planner names (drop the
  prefix step; reorder the steps; drop the longest-first sort).
- **B Shipped-key lists.** `form` joins `listed` in `tests/conformance.test.ts`, the
  `readCompatibility` expectation in `tests/setupServer.test.ts`, and § Compatibility as a
  selector row and a variable row (the union's `properties` is nonempty, so
  `collectShippedComponents` requires it; the row names the `--bs-form-*` variables the check and
  select rules declare); § Files gains the partial's row.
- **C The `col` label rows.** `_form-label.scss` emits `.col-form-label`, `.col-form-label-lg`,
  and `.col-form-label-sm` (family ruling 3); the ledger files them under `col`, their only
  recorder, in a new `#### col` table at its sort position; the three deferral rows are retired;
  § Compatibility gains a `col` row naming the label partial as the family's home.
- **D Tokens.** `.form-label { margin-bottom: var(--vn-space-4) }`; `.form-text { margin-top:
  var(--vn-space-2); font-size: 0.875em; color: var(--bs-secondary-color) }`; `.col-form-label`
  pads `calc(var(--vn-space-3) + var(--bs-border-width))` top and bottom, `margin-bottom: 0`,
  `font-size: inherit`, `line-height: var(--vn-line-body)`; one `@each` over a local `$sizes` list
  (large then small, D30): large pairs `--vn-space-4` with `--vn-size-5`, small pairs
  `--vn-space-2` with `--vn-size-2`, each padding `calc(<space> + var(--bs-border-width))`. The
  literals `0.875em`, `0`, and `inherit` stay (no published scale is relative to the element's own
  size); `--bs-secondary-color` is written byte for byte; the `input-text` mixin is not included
  (its type and colour are not recorded on a label). The release's null label and help-text
  font-style, font-weight, and colour defaults produce no declarations, and none is added.
- **E Section.** `FormLabelSection`, region `Form label`, `FORM_LABEL_COPY` and
  `FORM_LABEL_SPECIMENS` (the region follows the partial's name, as Validation and Input group do).
  Specimens, in order: `Form label stacked` (a `.form-label` for an email control, the control, a
  `.form-text` the control names through `aria-describedby`), `Form label horizontal` (a `.row`
  with a `col-* col-form-label` label and a `.col-*` control), `Form label horizontal large` and
  `Form label horizontal small` (derived from one size list), `Form label legend` (a
  `fieldset.row` with a `legend.col-* col-form-label` labelling a date control with its own
  `aria-label`); breakpoint-free columns; ids prefixed `form-label-`; unique control names. Copy:
  "Compare a label and its help text around a control, and a horizontal label level with the
  control beside it at each size and over a group." Registration after `FormControlSection` and
  before `FormRangeSection`; `bfw` also moves `FormControlSection` ahead of `FormFloatingSection`
  (D35's alphabetical order). Capture: resting rows only in `CASCADE_KEYS` (`form-label-stacked`
  `.form-label` `margin-bottom`; `form-label-horizontal` `.col-form-label` `padding-top`;
  `form-label-horizontal-large` `.col-form-label-lg` `font-size`; `form-label-horizontal-small`
  `.col-form-label-sm` `font-size`; `form-label-legend` `legend.col-form-label` `margin-bottom`);
  no driven scenario (D20's consolidation keeps its carrier).
- **F `FORM_FLOATING_CASES` (R6).** A dedicated `FormFloatingCase` (`selector`, `rendered`,
  `condition` where a selector reads a variable only under an at-rule, per-property `reads`), the
  Node case moved to the per-property equality through `collectDeclarationReads` and
  `renderRuleKey`, the browser case in `form-floating.test.ts` keeping its layer reading and
  dropping its joined-string `reads` half (retitled "authors every case selector in the components
  layer"); frozen rows, maps, and lists.
- **G Decomposition.** Two parallel native units (`bfl`, `bfw`), as the routing ledger states.
- **H Guide order.** `bfl` moves the forms `###` sections, Validation included, into the release's
  order with `### Form label classes` first (D35), and splits the pooled `#### form-check`
  departure table into one `#### <key>` table per forms key at its sort position; the checker
  proves the moved blocks byte-identical (`git diff --color-moved=plain`). The whole § Departures
  section's key order is outside the family: carrier B-PASSIVE-CLOSE-B.
- **I Barrel order.** A frozen `FORM_PARTIALS` record in `tests/setupServer.ts` maps the release's
  `labels` and `form-text` to `form-label` and `floating-labels` to `form-floating`; the
  conformance case asserts the barrel's forms subsequence equals the mapped, de-duplicated release
  list, drops the `arrayContaining` guard and the release filter, and is retitled "loads every
  forms partial in the release order, validation last". `@use 'components/form-label';` precedes
  `form-control` in the barrel.
- **J One partial.** `_form-label.scss` alone (family ruling 3); a second `_form-text.scss` is
  refused.
- **K `FORM_LABEL_CASES`.** A `FormLabelCase` (`selector`, `component` naming the inventory key
  recording it, per-property `reads`), `FORM_LABEL_MARKUP` (the stacked label, control, and help
  text under a 20px parent; the horizontal label at each size beside the matching control; a
  `fieldset.row` whose `legend.col-form-label` labels a text control), and the Node case asserting
  the selectors equal the inventory selectors whose classes open with `form-label`, `form-text`,
  or `col-form-label`, each recorded under its own `component` key and no other, with `reads`
  equal to the extraction.
- **L Proofs.** `form-label.test.ts` reads: the label margin from the space scale at density 1 and
  2; the help text's margin, `0.875em` size under a 20px parent, and colour against the resolved
  `--bs-secondary-color` in light and dark and under a wrapper override; the horizontal label's
  content-box top level with the control's at each size, at density 2, and under a
  `--bs-border-width: 4px` retune, with line height and font size compared; the legend's cleared
  margin and inherited size; the components layer. Each names the mutation the planner lists.

## Findings and carriers

| Finding | Carrier |
| --- | --- |
| The `form` key: partial, barrel, ladder, tables, lists, deferrals, guide | `bfl` |
| `FORM_FLOATING_CASES` per-property reads (R6) | `bfl` |
| The section, specimens, registration, capture rows, section proof | `bfw` |
| `FormControlSection` before `FormFloatingSection` (D35) | `bfw` |
| Rows the tiered ladder moves outside the forms family (`row-gap`, `btn-group`, `btn-close`) | `bfl` (measured first, regrouped in the same change) |
| The whole § Departures section's key order | B-PASSIVE-CLOSE-B |
| The `ROADMAP.md` `form` key and R6 carrier rows | the Orchestrator's fold at landing |

## Exit criterion

B-FORMS-LABEL ends, and with it the forms family, when each capability is implemented, repaired, or
excluded on evidence, and the tracked chain with `CAPTURE=1` regeneration is green on the
integrated tree: the ladder (tiered, `matchSelectorKey` exported and tested, the plant pinning each
step, every moved row regrouped); the partial and barrel; the tables (`FORM_LABEL_CASES`,
`FormFloatingCase`); the proofs; the showcase section, registration, and order; the capture rows
and frames in every variant; the guide (§ Files row, `### Form label classes`, the Showcase
sentence, the proof link, the `form`, `col`, and moved-key tables, the split pooled table, the
release-ordered forms sections); the shipped-key lists; the retired deferral rows; the carrier rows
struck.

## Lanes

Both lanes ran on the one brief, blind, and returned proposals; neither is empty. The analyst's
journal head carries the `thread.started` event with the session id named in the preamble, and its
launcher (`units/b-forms-label-design-analyst.sh`) names `--model gpt-6-astra`.
