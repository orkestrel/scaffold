# B-FORMS-LABEL design — analyst proposal (objective lane, GPT-6 Astra through `codex exec --sandbox read-only`)

Retained verbatim from `tmp/codex/b-forms-label-design-analyst-last.md`; journal retained by session id `01a0cd69-1295-7a50-a1eb-23f864f73887` (launch journal `tmp/codex/b-forms-label-design-analyst.jsonl`, swept at acceptance). The brief is `b-forms-label-design-brief.md` beside this file.

---

## Units

Propose B-FORMS-LABEL (`bfl`) as an integrated unit. The label closure and floating-table repair share `tests/setupStyles.ts` and its proof; separating them would require overlapping ownership.

**Role and engine route.** `opus` on native Opus 5.5 implements directly and spawns nothing. `analyst` on GPT-6 Astra audits correctness; `reviewer` on Opus 5.5 reviews design fit against the same claims and capture portfolio. `checker` and `verifier` on Sonnet establish mechanical evidence and the integrated gates. The Orchestrator accepts the result.

**Order and dependencies.** Start after B-FORMS-CLOSE-SPECIMENS, B-FORMS-CLOSE-TABLES, and B-FORMS-CLOSE-FORCED land. Rebase the dispatch onto their integrated commit. Require the property-keyed `FormRangeCase` shape and exported `collectDeclarationReads` helper before implementation.

**Owned files.** Grant ownership at these bounded sites:

- `src/styles/components/_form-label.scss` and `src/styles/index.scss`.
- `tests/setupStyles.ts` and `tests/setupStyles.test.ts`: label markup and cases, their export expectations, and the floating-table reshape and consumers.
- `tests/setupServer.ts` and `tests/setupServer.test.ts`: the attribution ruling, its documentation and regression cases, and the shipped-key expectation.
- `tests/conformance.test.ts`: `listed`, the forms barrel-order comparison, and the union-key accounting proof.
- `tests/src/styles/components/form-label.test.ts` and `tests/src/styles/components/form-floating.test.ts`.
- `app/browser/sections/FormLabelSection.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, and `app/browser/index.ts`.
- `tests/app/browser/sections/FormLabelSection.test.ts`, `tests/app/browser/Showcase.test.ts`, and `tests/app/browser/index.test.ts`.
- `tests/setup.ts`, `tests/setup.test.ts`, and `tests/app/browser/integration.test.ts`: label subjects, resting capture rows, registry assertions, and journey readings.
- `guides/veneer.md`: Files, Form label classes, Compatibility, Deferred selectors, affected ledger tables, Showcase, capture stems, and proof links.

**Shared report-only files.** `ROADMAP.md`, `README.md`, and the scaffold campaign records remain Orchestrator-owned. Report the closure of R5 and R6 for their carrier records.

**Off-limits files.** Keep `_tokens.scss`, `_theme.scss`, `_mixins.scss`, sibling component partials, element partials, runtime source, fixtures, manifests, configuration, vendored policy files, and unrelated proofs unchanged. Every file outside the ownership grant remains read-only.

**Acceptance criteria, ordered cheap-first.** Record the targeted failing proof before repairing an existing defect. Each proof must distinguish the named mutation.

| Acceptance criterion | Proof and distinguishing mutation |
| --- | --- |
| The owned changes satisfy formatting, lint, and types. | Run scoped formatting, then `format:check`, `lint:check`, and `check`. The floating consumers must reject the obsolete array operations after `reads` becomes a map. |
| The partial emits the recorded label, help-text, and horizontal-label declarations in `components`. | Build the cascade. `FORM_LABEL_CASES` binds `.form-label`, `.form-text`, `.col-form-label`, `.col-form-label-lg`, and `.col-form-label-sm` to their independent inventory rows and property-keyed reads through `collectDeclarationReads`. Remove a selector, substitute a token, move its token to another property, or move the rule outside `components`; the corresponding proof must fail. |
| The barrel recognizes the combined label partial and places it before `form-control`. | Update the release-name projection in the existing conformance case. Move `form-label` after `form-control`, or remove its import; the case must fail. The existing filter would silently ignore that partial name. |
| Shipping `form` preserves sibling ledger ownership under the accepted attribution ruling. | Add the membership plant described under Rulings needed. Restoring the existing union-first fallback must fail on sized controls, check inputs, sized selects, and the switch-input transition. |
| The guide closes the union key and the column-label deferrals. | Run setup, conformance, and guide checks against the built cascade. Remove the `form` variable row, omit `form` from `listed`, retain a column-label deferral, or remove a measured departure row; the relevant gate must fail. |
| The floating table binds tokens to their consuming properties and conditions. | Reshape `FORM_FLOATING_CASES`; compare through `collectDeclarationReads`; preserve exact selector-and-condition membership and frozen rows, maps, and arrays. Swap the focused control’s top and bottom padding tokens while preserving their combined token set; the comparison must fail. Remove the reduced-motion twin; the population check must fail. |
| Browser readings prove label geometry and typography. | In `form-label.test.ts`, read margins, horizontal padding, inherited base size, sized typography, and line height. Replace a spacing token with its default literal, omit the border-width term, or swap the size tokens; density or override readings must fail. |
| Relative help typography and theme paint remain correct. | Read `.form-text` under a changed parent font size, light and dark scopes, and a wrapper override of `--bs-secondary-color`. Replacing `0.875em` with `--vn-size-2`, or binding the color directly to a Veneer token, must fail the relevant reading. |
| Component classes override the element treatment they replace. | Render `.col-form-label` on a `legend` and compare its margin, inherited size, padding, and line height. Removing `margin-bottom: 0` or `font-size: inherit` must expose the element-layer treatment and fail. |
| The section renders accessible, correctly sized specimens. | The section proof reads label/control associations, accessible names, help descriptions, horizontal classes, and destruction behavior. Break `for`, `aria-describedby`, or a size class; the corresponding assertion must fail. |
| Registration and captures reach every declared label specimen. | App proofs pin exports, region order, and specimen order. Registry and journey proofs pin the proposed resting rows, resolved readings, and original/lifted agreement. Remove a registration or capture placement, or select the wrong element; the relevant proof or portfolio guard must fail. |

Run the narrow Node proofs before browser work, then the owned style proofs, app proofs, conformance, guides, and policy. Run the journey and regenerate its captures for every registered variant. The final tracked verifier chain runs `format:check`, `lint:check`, `check`, `build`, `test`, `test:service`, and `CAPTURE=1` journey regeneration on the integrated tree.

**Risks.** The predecessor units change shared sites, so symbol-level rebasing is mandatory. The attribution change reaches accounting infrastructure and requires explicit permission in the dispatch. Resting captures alone cannot establish token behavior; retain the value-sensitive browser readings. The installed traversal stops on a repeated element, so use unique control names and specimen-scoped traversal where interaction is needed. Keep autofill evidence explicitly compiled-contract evidence.

## Rulings needed

The Orchestrator must settle the following choices before dispatch.

**Attribution.** Recommend treating `form` as a residual union recorder: when another shipped key records the selector, remove `form` from the membership candidates, then retain the existing longest-exact-class preference and recording-order fallback. Keep layer precedence, withheld-key behavior, and the unrecorded-selector prefix path unchanged.

An in-memory comparison over the real recording index at `e0c901a`, using the existing `attributeSelector` function, preserved every existing selector attribution under this candidate rule. Only `.form-label`, `.form-text`, and `.form-switch` gained attribution to `form`. The unchanged membership rule served as the negative control and returned `form` for the sibling examples.

The alternatives carry these costs:

| Option | Cost | Recommendation |
| --- | --- | --- |
| Residual `form` membership | Explicitly identifies the union key and changes the synthetic bare-selector expectation. | Adopt. |
| General prefix fallback among recording members | Also reattributes `.row-gap-*`, `.btn-group-vertical`, and `.btn-close-white`; the row-gap departures require unrelated guide regrouping. | Decline for this unit. |
| Keep the existing rule and move sibling rows into `form` | Loses the per-key accounting the family verdict intended to preserve. | Decline. |

Name the permanent plant “attributes the forms union only when no shipped sibling records the selector.” Cover `.form-control-sm`, `.form-check-input`, `.form-select-sm`, `.form-switch .form-check-input`, union-only `.form-switch`, sibling-withheld membership, and `.col-form-label`. Preserve a no-class fallback case among ordinary recording keys. Under the proposed amendment, the synthetic `textarea:focus` recorded by `form` and `form-floating` answers to `form-floating`; update that expectation explicitly.

The sibling departures identified in the brief remain under `form-control`, `form-check`, and `form-select`. The switch-input transition remains under `form-check`. Plain `.form-switch` belongs to `form`, but its unchanged `padding-left: 2.5em` earns no departure row.

**Shipped-key lists.** Add `form` to `listed` in `tests/conformance.test.ts` and the `readCompatibility` expectation in `tests/setupServer.test.ts`. Add shipped selector and variable rows to Compatibility. The variable row is required: `collectShippedComponents` reads the union’s nonempty property inventory.

That row covers the existing sibling emissions of `--bs-form-select-bg-img`, `--bs-form-check-bg`, `--bs-form-check-bg-image`, `--bs-form-switch-bg`, and `--bs-form-select-bg-icon`. Emit no duplicate declarations in the label partial. The cost is a union-wide presence obligation; weakening the reader would conceal incomplete shipping.

**Column labels.** Follow the family verdict: `_form-label.scss` emits `.col-form-label`, `.col-form-label-lg`, and `.col-form-label-sm`. Retire those exact Deferred selectors rows. Their declarations attribute to `col` through inventory membership, regardless of their class spelling or source partial.

Create a `col` departure table for their measured tokenized values. Create the `form` table for the label margin and help-text margin. Preserve literal and unchanged `--bs-*` values without invented departure rows.

**Tokens and literals.** Adopt the following bindings without adding tokens or expanding mixins.

| Selector and property | Proposed value |
| --- | --- |
| `.form-label` margin-bottom | `var(--vn-space-4)` |
| `.form-text` margin-top | `var(--vn-space-2)` |
| `.form-text` font-size | `0.875em` |
| `.form-text` color | `var(--bs-secondary-color)` |
| `.col-form-label` padding-top and padding-bottom | `calc(var(--vn-space-3) + var(--bs-border-width))` |
| `.col-form-label` margin-bottom and font-size | `0` and `inherit` |
| `.col-form-label` line-height | `var(--vn-line-body)` |
| `.col-form-label-lg` vertical padding and font-size | `calc(var(--vn-space-4) + var(--bs-border-width))` and `var(--vn-size-5)` |
| `.col-form-label-sm` vertical padding and font-size | `calc(var(--vn-space-2) + var(--bs-border-width))` and `var(--vn-size-2)` |

The `0.875em` value is relative to the parent; the available size token is rem-based. Keep the literal, as validation feedback does. Including `caption-text` would introduce a different color binding. Including the whole `input-text` mixin would introduce typography and color declarations the label inventory does not record. Read its line-height token directly.

Bootstrap’s null label and help-text font-style, font-weight, and color defaults produce no declarations. Preserve that absence.

**Barrel mapping.** Treat Veneer’s `form-label` import as the combined `labels` and `form-text` portion of Bootstrap’s sequence. Expand that import to those release names in the comparison, retaining the existing `floating-labels` mapping. Require the label import’s presence. This costs a bounded rewrite of the order proof and prevents an unrecognized name from passing unnoticed.

**Section, copy, and capture rows.** Recommend `FormLabelSection`, region `Form label`, with `FORM_LABEL_COPY` and `FORM_LABEL_SPECIMENS`. Place the region alphabetically after Form floating and before Form range.

Use this proposed copy: “Compare a field label, help text, and horizontal labels matched to the default, small, and large controls.”

Declare the following subjects in the specimen table and `CaptureSubject`, with matching resting entries in `CASCADE_KEYS`.

| Subject | Scenario | Reading selector | Property |
| --- | --- | --- | --- |
| Form label base | `form-label-base` | `.form-label` | `margin-bottom` |
| Form label help | `form-label-help` | `.form-text` | `font-size` |
| Form label horizontal | `form-label-horizontal` | `.col-form-label` | `padding-top` |
| Form label small | `form-label-small` | `.col-form-label-sm` | `font-size` |
| Form label large | `form-label-large` | `.col-form-label-lg` | `font-size` |

The base specimen carries a labelled control. The help specimen connects visible help text through `aria-describedby`. Horizontal specimens pair the label classes with matching control sizes in the shipped grid. Give every control a unique id and accessible name.

Use whole lifted specimen element frames through the existing resting journey. Register no label-specific driven list or focus scenario. This avoids a `CAPTURE_KEYS` spread change and leaves D20’s consolidation with its existing carrier.

**Floating-table interface.** Recommend a dedicated `FormFloatingCase` interface with readonly `selector`, `condition`, `rendered`, and property-keyed `reads`. Generalizing `FormRangeCase` would mix the range engine axis with floating evidence choices.

Represent reduced-motion twins under their own conditions. An empty reads map means no declaration at that site reads a custom property. Preserve the existing false `rendered` classifications for undrivable autofill and the shadowed disabled twin. Update the Node comparison, browser declaration comparison, freeze checks, and any selector-only expectations affected by condition rows. Keep the resolved geometry and density proofs.

**Ownership exceptions.** Explicitly lift the passive-family prohibition on editing `tests/setupServer.ts` and its proof for the attribution change. Grant bounded rewrites of the floating table, its consumers, the barrel comparison, shipped-key expectations, and affected guide prose. Append-only permission alone cannot close this unit.

## Files the result makes false

For B-FORMS-LABEL, the terrain’s existing assertions and documentation require these changes:

- `tests/conformance.test.ts`: the shipped-key literal omits `form`; the barrel comparison does not recognize `form-label`; emitting column labels invalidates the deferral gate until their rows retire.
- `tests/setupServer.ts`: the membership implementation and its remarks give the union an inappropriate fallback claim.
- `tests/setupServer.test.ts`: the compatibility expectation omits `form`; the bare-selector union expectation conflicts with residual membership.
- `tests/setupStyles.ts`: `FORM_FLOATING_CASES` declares selector-wide token lists.
- `tests/setupStyles.test.ts`: the export inventory lacks the label table and markup; the floating comparison spreads `reads` as an array; selector-only membership and freeze assertions need the accepted shape.
- `tests/src/styles/components/form-floating.test.ts`: its joined-declaration comparison consumes array-shaped `reads`.
- `tests/app/browser/index.test.ts`: the expected exports lack the label copy, specimens, and section.
- `tests/app/browser/Showcase.test.ts`: the region and specimen inventories lack Form label.
- `guides/veneer.md`: Files and Compatibility omit the closure; column labels remain deferred; the label section, departure tables, Showcase description, capture stems, and proof link are absent.
- `ROADMAP.md`: the carried `form` and floating-table obligations require Orchestrator closure reporting.

Appending resting rows does not require a `CAPTURE_KEYS` composition rewrite. The generic journey already iterates `CASCADE_KEYS`; extend its label-specific readings and placement evidence without introducing another capture mechanism.

## Exit criterion

B-FORMS-LABEL ends when these capabilities close:

- **Label cascade:** the partial, barrel import, independent case table, Node binding, and browser proof cover the recorded label, help-text, and horizontal-label surface.
- **Union accounting:** `form` ships through selector and variable obligations; shipped-key lists agree; the accepted attribution rule preserves sibling ownership; measured departures and additions match the guide.
- **Column-label closure:** the label rules ship under `col` accounting and their deferral rows are absent.
- **Showcase evidence:** the section, copy, specimens, registration, accessibility proofs, capture rows, journey readings, and variant captures agree.
- **Floating-table repair:** property-and-condition reads use the shared extraction helper; every consumer follows the map shape; token relocation and missing-condition mutations fail.
- **Family acceptance:** predecessor close obligations remain satisfied, the guide describes the integrated result, independent audits accept the claims and captures, and the tracked final gates pass.

These closures end the forms family. Broader attribution changes, capture-list consolidation, and unrelated guide repairs retain their existing carriers.

## Journal

Journal: `/home/user/scaffold/tmp/codex/b-forms-label-design-analyst.jsonl`

Session id: `01a0cd69-1295-7a50-a1eb-23f864f73887`