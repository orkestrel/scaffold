# B-FORMS design round — `analyst` proposal (GPT-6 Astra, objective lane)

Journal `tmp/codex/b-forms-design-analyst.jsonl` (swept at acceptance), thread `01a0cabc-5794-7853-8cc1-2843dd22cb65`, exit 0. Brief: `.orkestrel/veneer/units/b-forms-design-brief.md`.

Analyst lane, GPT-6 Astra; objective proposal.

**The split.** Keep the release’s functional split, with validation implemented after the integrated controls. Add a serial integration owner for the shared files. Parallel executors return exact shared-file patches; they don’t edit those files. This follows the orchestration contract’s writing-concurrency rule and avoids competing edits to the barrel, specimen constants, capture registry, guide, and ledger. Terrain § B identifies that contention; Bootstrap supplies the functional boundaries in `node_modules/bootstrap/scss/_forms.scss:1`.

Make the accepted foundation and B-PASSIVE commit a launch prerequisite. The supplied checkout doesn’t match the brief’s claimed baseline: `guides/ledger/` is absent, the ledger readers aren’t in its setup module, and its barrel and conformance list omit B-PASSIVE (`src/styles/index.scss:43`, `tests/conformance.test.ts:83`). Terrain § B explicitly takes its ledger evidence from `/home/user/veneer-f5b`; that checkout contains `collectLedger` at `tests/setupServer.ts:1787`. Reconcile the launch commit before authoring against those contracts. Don’t reconstruct them inside Forms.

Treat `form` as a family-wide accounting key. It contains controls, selects, checks, range, floating labels, group relationships, and validation—not merely labels and helper text. Author each selector in its functional partial, then promote `form` only after the family closes. Its repetitions across inventory keys require accounting rows wherever the installed comparison reports them; they don’t require repeated CSS. Terrain §§ A and E; `tests/fixtures/oracle/inventory.json:19239`; `tests/setupServer.ts:793`.

Assign these relationships explicitly:

- Text owns labels, helper text, plaintext, control sizes, file inputs, color inputs, and `.col-form-label*`.
- Floating owns every `.form-floating` relationship, including rules also inventoried under control or select.
- Groups owns sizing, borders, focus stacking, and feedback exclusions within `.input-group`.
- Validation owns the native-validity and explicit-class rules across controls, selects, checks, floating wrappers, groups, feedback, and tooltips.
- Checks exercises the already-shipped `.btn-check` behavior without reauthoring it in `_form-check.scss`. Its existing source remains Button-owned (`src/styles/components/_button.scss:72`; Bootstrap’s original placement is `node_modules/bootstrap/scss/forms/_form-check.scss:168`).

Don’t mark a control key shipped before its floating, grouping, and validation obligations exist. `collectShippedComponents` requires complete selector and variable obligations; an implementation slice isn’t independently a shipped inventory key (`tests/setupServer.ts:793`).

**Naming.** Use Bootstrap’s public class names unchanged. Use descriptive partial names and exact mirrored proof stems; the naming contract permits compound class names and qualified constants. Terrain § B; `/home/user/scaffold/.claude/rules/names.md`, § Files and folders; `/home/user/scaffold/.claude/rules/tests.md`, § Test contract.

Use the following source and showcase names.

| Partial under `src/styles/components/` | Style proof under `tests/src/styles/components/` | Section class | Constants in `app/browser/constants.ts` |
|---|---|---|---|
| `_form.scss` | `form.test.ts` | `FormSection` | `FORM_COPY`, `FORM_SPECIMENS` |
| `_form-control.scss` | `form-control.test.ts` | `FormControlSection` | `FORM_CONTROL_COPY`, `FORM_CONTROL_SPECIMENS` |
| `_form-select.scss` | `form-select.test.ts` | `FormSelectSection` | `FORM_SELECT_COPY`, `FORM_SELECT_SPECIMENS` |
| `_form-check.scss` | `form-check.test.ts` | `FormCheckSection` | `FORM_CHECK_COPY`, `FORM_CHECK_SPECIMENS` |
| `_form-range.scss` | `form-range.test.ts` | `FormRangeSection` | `FORM_RANGE_COPY`, `FORM_RANGE_SPECIMENS` |
| `_form-floating.scss` | `form-floating.test.ts` | `FormFloatingSection` | `FORM_FLOATING_COPY`, `FORM_FLOATING_SPECIMENS` |
| `_input-group.scss` | `input-group.test.ts` | `InputGroupSection` | `INPUT_GROUP_COPY`, `INPUT_GROUP_SPECIMENS` |
| `_validation.scss` | `validation.test.ts` | `ValidationSection` | `VALIDATION_COPY`, `VALIDATION_SPECIMENS` |

Put label and helper-text classes in `_form.scss`; it emits no bare `form` rule. Each section lives under `app/browser/sections/` with its matching proof under `tests/app/browser/sections/`. Follow `TableSection` and `SpecimenSection` (`app/browser/sections/TableSection.ts:12`, `app/browser/sections/SpecimenSection.ts:29`).

Load partials in dependency order: form, control, select, check, range, floating, group, validation. Use their natural Sass namespaces; none conflicts with an element partial in the supplied barrel. Add `as <stem>-component` only if the reconciled launch barrel actually has a namespace collision, as Button and Table do (`src/styles/index.scss:43`, `src/styles/index.scss:51`). Each partial opens `@layer components`; reuse `mixins` with `as *`.

**The icons.** Preserve the recorded URI bytes and Bootstrap’s property bindings. A data URI’s color comes from its encoded SVG; neither an enclosing `color` nor a custom property inside that separate image retints it. Terrain §§ A, C, and D; `src/styles/_tokens.scss:115`.

Apply these bindings:

- Checked checkbox, radio, and indeterminate glyphs set `--bs-form-check-bg-image`; the input reads that property as its background image.
- Switch states set and read `--bs-form-switch-bg`.
- Select sets `--bs-form-select-bg-img` and reads the caret together with `var(--bs-form-select-bg-icon, none)`.
- Validation writes the recorded image directly on text controls and sets `--bs-form-select-bg-icon` on eligible selects.

The sources are `node_modules/bootstrap/scss/forms/_form-check.scss:29`, `node_modules/bootstrap/scss/forms/_form-check.scss:66`, `node_modules/bootstrap/scss/forms/_form-check.scss:124`, `node_modules/bootstrap/scss/forms/_form-select.scss:6`, and `node_modules/bootstrap/scss/mixins/_forms.scss:58`.

Preserve the encoded white check, radio, dash, and checked-switch glyphs; the light switch’s translucent black knob; its focus-colored knob; the light caret; and the recorded success and danger marks. Don’t import Mailbox’s dark checkbox recoloring or Elements’ `currentColor` image. The oracle colors originate in `node_modules/bootstrap/scss/_variables.scss:956`, `node_modules/bootstrap/scss/_variables.scss:975`, `node_modules/bootstrap/scss/_variables.scss:1014`, and `node_modules/bootstrap/scss/_variables.scss:1093`.

The dark caret and resting-switch assets already exist in `tokens.$dark` and are emitted at theme scope (`src/styles/_tokens.scss:103`, `src/styles/_tokens.scss:123`, `src/styles/_theme.scss:15`). That inheritance alone is insufficient after the component introduces a local light value. Emit Bootstrap’s exact dark descendant selectors in the owning component partials, reading the existing Sass map entries through `sass:map`:

- `[data-bs-theme='dark'] .form-select`
- `[data-bs-theme='dark'] .form-switch .form-check-input:not(:checked):not(:focus)`

Those selectors belong to the inventory’s `theme` key, so integration must reconcile its ledger too. Preserve the descendant-selector behavior inside nested theme islands; don’t silently introduce nearest-theme semantics. Terrain § A; `node_modules/bootstrap/scss/forms/_form-select.scss:75`; `node_modules/bootstrap/scss/forms/_form-check.scss:183`.

There is no escaped-SVG helper in `_mixins.scss`. Use the already-escaped oracle literals and existing dark assets. Add no SVG encoder, icon-token family, or runtime tinting mechanism. Apply the family’s Bootstrap-literal exception where no existing canonical token has the recorded value.

**The elements layer.** Retain the existing bare-element rules in place. Component partials must not repeat label display, inherited control typography, select text transformation and disabled opacity, textarea resizing, fieldset and legend resets, or the existing native-input repairs. Terrain § C; `src/styles/_mixins.scss:33`; `src/styles/elements/_input.scss:4`; `src/styles/elements/_select.scss:4`; `src/styles/elements/_textarea.scss:4`.

Distinguish a repeated reset from a required class-qualified declaration. Bootstrap’s `.form-control::-webkit-datetime-edit` and `.form-control::file-selector-button` rules remain component obligations even where the bare input layer handles the same native part. Their class-specific geometry and states must ship (`node_modules/bootstrap/scss/forms/_form-control.scss:67`, `node_modules/bootstrap/scss/forms/_form-control.scss:94`).

Range needs its own appearance reset, dimensions, transparent host background, track, thumb, focus shadows, active fill, disabled treatment, and transitions. Keep WebKit and Gecko pseudo rules separate; grouping them can invalidate the supported selector (`node_modules/bootstrap/scss/forms/_form-range.scss:3`).

Use distinct proof mechanisms:

- Read resolved `::placeholder`, `::file-selector-button`, and floating-label `::after` values.
- Compare inaccessible native-part declarations and their conditions against the compiled oracle through the installed accounting machinery.
- Render the corresponding native controls and capture reachable states.
- Identify Gecko-only and otherwise unreachable native-part rows as compiled-contract evidence, never as Chromium rendering evidence.

The existing input proof already distinguishes native-part text accounting from resolved standard-pseudo readings (`tests/src/styles/elements/input.test.ts:13`). A literal requirement to render every exact Gecko selector cannot close on the named Chromium host. Resolve that acceptance boundary before dispatch; don’t add silent skips or call source inspection a rendered proof.

There is also a Forms-specific D11 conflict to settle: the oracle itself records `margin-inline-end`, `-webkit-margin-end`, and `border-inline-end-width` for file buttons (`tests/fixtures/oracle/inventory.json:19562`), while the roadmap calls for physical properties (`ROADMAP.md:163`). I argue for retaining the oracle declarations under this brief’s explicit Bootstrap-wins rule, without adding RTL output. Record that interpretation in the reconciled design rather than silently substituting properties.

**The showcase.** Use sections per functional surface as named earlier. Group the validation keys in `ValidationSection`; they describe states and messages within the same form. Keep per-key guide and compatibility rows despite that shared section.

Require these specimen populations.

| Surface | Required specimens and states |
|---|---|
| Form | Label and associated helper text; horizontal labels at each recorded size; plaintext controls at each recorded size. |
| Control | Input and textarea sizes; empty and filled placeholders; editable, readonly, disabled, and focused controls; file controls with size and hover states; color controls and sizes; date/time controls for native-part obligations. |
| Select | Default and size variants; `[size="1"]`, another size, and multiple selection; disabled and focused states; light, dark, and nested-theme placements. |
| Check | Checkbox and radio at rest, checked, focused, active, and disabled; indeterminate checkbox; disabled-fieldset behavior; inline and reverse layouts; switch state/layout combinations; existing button-backed checks. |
| Range | Rest, keyboard focus, pointer-active thumb, disabled, and value changes through native keyboard input. |
| Floating | Empty, filled, and focused controls; textarea label backing; plaintext; select; disabled controls; readonly content; actual autofill where the host can drive it. |
| Group | Leading and trailing addons; buttons; check/radio addons; sizes; multiple controls; floating controls; toolbar placement; `.has-validation`; feedback and tooltip siblings; focus stacking and corner removal. |
| Validation | Untouched controls; `.was-validated` with native valid/invalid values; `.is-valid` and `.is-invalid` independently of native validity; focused states; textarea and color-input geometry; eligible and ineligible select icon cases; checked controls and labels; inline feedback; group stacking; feedback and tooltip display. |

This population follows Terrain § A and Bootstrap’s control, floating, grouping, and validation sources, particularly `node_modules/bootstrap/scss/forms/_floating-labels.scss:31`, `node_modules/bootstrap/scss/forms/_input-group.scss:98`, and `node_modules/bootstrap/scss/mixins/_forms.scss:51`.

Keep an inventory-selector-and-condition matrix linking each obligation to its owner, proof case, specimen, capture scenario, and evidence limitation. Include cross-key duplicates and theme rules.

Extend the capture grammar for actual registered readings: `checked`, `disabled`, `readonly`, `indeterminate`, `filled`, `valid`, and `invalid`; retain `focus`, `hover`, and `active`. Add `autofill` only with a working native autofill drive. Filling an input doesn’t prove `:-webkit-autofill`. The supplied `CaptureState` lacks these form states (`tests/setup.ts:98`).

Drive focus through keyboard traversal, checks through native activation, and validity through native constraints or explicit Bootstrap classes. Set `indeterminate` through the native input property; an HTML attribute doesn’t establish that state. `FormCheckSection` must initialize its indeterminate specimen so the ordinary showcase renders it too, rather than leaving that behavior exclusively in tests. The base specimen renderer only inserts markup (`app/browser/sections/SpecimenSection.ts:36`).

Preserve runtime state when lifting specimens. Assert checkedness, indeterminacy, current value, validity, and focus on the photographed node before and after capture. Use `FrameManager.place(scenario, control, specimen)` when the specimen contains the complete ring or tooltip; use `page` when the required paint extends beyond that frame. Keep the declared filename grammar and aggregate state readings into the subject’s accessibility artifact (`tests/setup.ts:123`, `tests/setupBrowser.ts:444`, `tests/setupBrowser.ts:521`, `tests/setupBrowser.ts:542`).

**The deferred rows.** Retire the Forms-owned names in the same integrated change that emits them.

| Owner within Forms | Deferred names to retire |
|---|---|
| Text | `.col-form-label`, `.col-form-label-lg`, `.col-form-label-sm` |
| Groups | `.input-group .btn`, `.input-group .btn:focus`, `.input-group-lg > .btn`, `.input-group-sm > .btn`, `.btn-toolbar .input-group` |

The guide assigns these names to Forms (`guides/veneer.md:396`, `guides/veneer.md:417`, `guides/veneer.md:457`). Ordinary input-group button relationships therefore aren’t Disclosure-owned.

Withhold the actual dropdown-specific relationships for Disclosure: `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)` and `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)`. The supplied deferral table doesn’t yet contain those rows; add them when introducing the input-group compatibility obligation. Keep generic group rules containing `:not(.dropdown-menu)` or `:not(.dropdown-toggle)` because ordinary groups use them. Bootstrap separates these cases at `node_modules/bootstrap/scss/forms/_input-group.scss:100`.

Leave the existing split-toggle and Overlays rows untouched (`guides/veneer.md:421`, `guides/veneer.md:426`, `guides/veneer.md:439`). Validation’s `valid-tooltip` and `invalid-tooltip` belong to Forms; they aren’t the Overlays tooltip component.

The bare excluded `::-webkit-file-upload-button` name doesn’t automatically exclude the class-qualified form-control selectors. Resolve each exact recorded selector against the accepted build and deferral contract (`guides/veneer.md:395`, `tests/fixtures/oracle/inventory.json:19496`). A selector that ships must leave the deferral table; an additions or departures row cannot excuse a stale deferral (`tests/setupServer.ts:858`; the proposed baseline’s `scanShippedDeferrals` is at `/home/user/veneer-f5b/tests/setupServer.ts:1760`).

**Departures and additions.** Carry no Elements or Mailbox behavior into this baseline merely because it is useful. Rule their candidates as follows.

| Candidate from Terrain § D | Proposed ruling |
|---|---|
| Bare-tag checkbox, radio, switch, and range chrome | Refuse the selector expansion. Preserve the mechanisms only where Bootstrap’s explicit classes require them. |
| Elements’ automatic `:user-invalid` and unfocused-invalid treatment | Refuse; it changes when validation appears. Evidence: `/home/user/elements/src/styles/elements/_input.scss:155`. |
| `form[data-form-validated]` replacing `.was-validated` | Refuse the replacement and alias. Evidence: `/home/user/elements/src/styles/components/_form.scss:105`. |
| Mailbox’s `:user-valid`/`:user-invalid` treatment and search exception | Refuse; these are additional validation triggers and product policy. Evidence: `/home/user/mailbox/src/styles/_forms.scss:887`. |
| Additional light/dark checkbox, dash, radio, and switch token families | Refuse under the tokenizing ceiling. Evidence: `/home/user/mailbox/src/styles/_tokens.scss:86`. |
| Elements’ `currentColor` caret and alternate encoded colors | Refuse; preserve the oracle assets and explicit dark retunes. Evidence: Terrain § D; `/home/user/elements/src/styles/_tokens.scss:342`. |
| Mailbox’s custom `.select` and range-slider widgets | Refuse; they are separate capabilities, not Bootstrap form-select or form-range implementations. Evidence: Terrain § D, `/home/user/mailbox/src/styles/_select.scss:3`, `/home/user/mailbox/src/styles/_range-slider.scss:5`. |

Unshipped candidates receive no addition-ledger row. Record only actual emitted additions and measured departures. Retained Bootstrap custom properties aren’t compatibility aliases prohibited by D7 (`ROADMAP.md:158`).

Use the baseline addendum’s ledger homes and exact columns, including `Condition`, `(empty)`, and `—`. Run the installed comparison over the integrated family. Reconcile repeated-key departures and affected `theme`, `col`, `btn`, and `btn-toolbar` rows; don’t manually force every finding under its authoring unit. Terrain § B; `/home/user/veneer-f5b/tests/setupServer.ts:1468`, `/home/user/veneer-f5b/tests/setupServer.ts:1524`.

**Proof shape.** Pair exact declaration accounting with resolved readings and state captures. A passing selector-presence check cannot establish a correct URI, shadow, padding, transition, or stacking value.

Use the installed `@orkestrel/test` browser entry directly. Its relevant exports are documented at `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`:

- `readStyle` at line 2456, `readPixels` at 2239, `readToken` at 2501, and `readRootToken` at 2365 for resolved properties, dimensions, and bindings.
- `matchesColor`, `readLayers` at 2147, `readContrast` at 2017, and `readRing` at 2325 for paint readings. `readRing` returns contrast, not shadow geometry.
- `readRules` at 2413 and `findRule` at 1205 for parsed cascade inspection. `findRule` uses substring matching and cannot prove completeness.
- `traverseAccessibleWithin` at 2912, `clickAccessibleWithin` at 401, `holdAccessibleWithin` at 1392, `hoverAccessible` at 1406, `pressKeys` at 1867, and `typeAccessible` at 2930 for interaction.
- `stageMedia` at 2787, `releaseMedia` at 2541, `releasePointer` at 2590, `waitForAnimations` at 2992, `readStates` at 2435, and `describeTree` at 976 for media, cleanup, settling, and state evidence.

Require these value-sensitive assertions:

- Compare each resolved background image with an independently recorded expected URI, accounting for browser serialization. Assert select image-layer order, positions, sizes, and suppression for multiple/listbox selects.
- Read `appearance`, host geometry, padding, borders, disabled opacity, placeholder paint, file-button geometry, floating transforms, label backing, and group corners.
- Preserve Bootstrap’s ordinary form focus shadows. The oracle records a literal `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` for checks (`tests/fixtures/oracle/inventory.json:20543`). Veneer’s `--bs-focus-ring-*` aliases resolve to different values (`guides/veneer.md:785`). Don’t silently substitute them. Prove that changing unrelated focus-ring aliases doesn’t change the baseline control shadow.
- Read validation text and borders through `--bs-form-valid-*` and `--bs-form-invalid-*`; read tooltip backgrounds and validation shadows through their separate success/danger bindings. Don’t expect a form-border override to recolor an embedded SVG. Bootstrap separates these bindings at `node_modules/bootstrap/scss/_variables.scss:1107`.
- Test overrides on the element where a component-local property is declared; a wrapper override cannot defeat that local declaration. Test inherited global properties on wrappers.
- Test density and radius factors only where an approved existing token actually drives the declaration. Assert unchanged literal geometry elsewhere.
- Stage reduced motion and assert Bootstrap’s exact transition behavior for controls, file buttons, selects, switches, range thumbs, and floating labels. Don’t add a checkbox transition that Bootstrap leaves absent (`node_modules/bootstrap/scss/_variables.scss:933`, `node_modules/bootstrap/scss/_variables.scss:945`, `src/styles/_mixins.scss:155`).

Validate the proofs with targeted wrong-value controls: wrong URI, missing dark selector, incorrect shadow width, swapped validation binding, incorrect group corner, or a surviving reduced-motion transition. Browser and capture acceptance must run on the host; the analyst sandbox provides no browser receipt.

**Risks.** The main acceptance risks are an unreconciled baseline, premature shipped status for overlapping keys, inherited dark assets being shadowed locally, substituted focus semantics, false native-pseudo evidence, lost input state during capture, and stale cross-family deferrals. The unit criteria below bind each risk to an observable failure.

The proposed units use `S` for the shared integration surface: `src/styles/index.scss`; `app/browser/constants.ts`, `Showcase.ts`, and `index.ts`; `tests/setup.ts`, `setup.test.ts`, `setupStyles.ts`, `setupStyles.test.ts`, `setupBrowser.ts`, and `setupBrowser.test.ts`; the showcase, barrel, and journey proofs; `tests/conformance.test.ts`; `guides/veneer.md`; and the ledger files. Executors return patches for `S`; the integration owner applies them serially. Frozen case tables remain in the established setup files.

| Unit | Keys | Owned files | Shared files | Depends on | Acceptance criteria | Risks |
|---|---|---|---|---|---|---|
| B-FORMS-READY | Family prerequisites | Launch evidence only | Report-only | Accepted foundation and B-PASSIVE | Pin the actual accepted commit; verify ledger/capture contracts; resolve D11 file-button declarations, qualified vendor aliases, and native-pseudo evidence limits. | Designing against absent contracts or claiming unreachable rendering. |
| B-FORMS-TEXT | `form` label/text rows; base `form-control`; Forms-owned `col` rows | `_form.scss`, `_form-control.scss`; their mirrored style proofs; `FormSection.ts`, `FormControlSection.ts`; their mirrored section proofs | `S`, patch-only | READY | Exact owned selector/value coverage; sizes, plaintext, readonly, disabled, file/color/date controls; label deferrals retired at integration; no repeated bare resets. | Losing class-qualified native rules or confusing `form` with a labels-only key. |
| B-FORMS-SELECT | Base `form-select`; select dark-theme rule | `_form-select.scss`; mirrored style proof; `FormSelectSection.ts`; mirrored section proof | `S`, patch-only | READY | Caret bytes and geometry; listbox suppression; focus and disabled values; dark and nested-theme behavior; validation icon slot retained. | Local light property masking the dark asset. |
| B-FORMS-CHECK | Base `form-check`; switch dark-theme rule; existing `btn-check` composition | `_form-check.scss`; mirrored style proof; `FormCheckSection.ts`; mirrored section proof | `S`, patch-only | READY; accepted Button/B-PASSIVE | Checkbox, radio, switch, reverse, inline, active, focused, disabled, and indeterminate specimens; exact image states; existing Button rules reused. | Reauthoring Button rules, false indeterminate markup, or incorrect switch-state precedence. |
| B-FORMS-RANGE | `form-range` | `_form-range.scss`; mirrored style proof; `FormRangeSection.ts`; mirrored section proof | `S`, patch-only | READY | Separate vendor rules; exact track/thumb declarations; native keyboard behavior; reachable focus/active/disabled captures; reduced-motion evidence. | Treating a host computed style as a thumb measurement. |
| B-FORMS-FLOATING | `form-floating`; overlapping control/select rules | `_form-floating.scss`; mirrored style proof; `FormFloatingSection.ts`; mirrored section proof | `S`, patch-only | TEXT, SELECT integrated | Empty/filled/focused transforms; plaintext/select treatment; textarea backing; disabled labels; independent autofill obligation and evidence boundary. | Mistaking typed content for autofill or losing label paint during capture. |
| B-FORMS-GROUP | `input-group`; Forms-owned Button/toolbar relationships | `_input-group.scss`; mirrored style proof; `InputGroupSection.ts`; mirrored section proof | `S`, patch-only | TEXT, SELECT, CHECK, FLOATING; B-PASSIVE | Addon/button sizing; wrapping; shared borders; corners; focus stacking; toolbar geometry; exact deferral retirement and Disclosure omissions. | Omitting ordinary button rules or withholding generic rules merely because they mention dropdown exclusions. |
| B-FORMS-VALIDATION | `was-validated`, `is-valid`, `is-invalid`, feedback and tooltip keys; validation portions of other keys | `_validation.scss`; mirrored style proof; `ValidationSection.ts`; mirrored section proof | `S`, patch-only | Integrated controls, FLOATING, GROUP | Native and explicit states; feedback/tooltip display; icon eligibility; mode-sensitive bindings; textarea/color geometry; checked labels; invalid/valid/focus stacking; no invented range-validation rules. | Correct border with wrong icon, message, focus shadow, or stacking. |
| B-FORMS-INTEGRATE | Complete family and affected existing keys | `S` | Exclusive serial owner | Runs between dependency waves; final acceptance after VALIDATION | Apply reviewed patches; wire real files without stubs; close the selector/condition matrix; promote complete keys together; refresh ledger; prove guide/showcase parity; run host gates and captures. | False green from withheld keys, shared-file contention, or incomplete capture registration. |

Launch TEXT, SELECT, CHECK, and RANGE in parallel worktrees. Integrate their shared patches before dependent proofs. FLOATING precedes GROUP; VALIDATION follows the integrated controls and relationships. Executors can compile their owned Sass independently, but final style receipts must exercise the published barrel. No implementation slice earns family acceptance from an incomplete worktree.

Close the integrated family with formatting, lint, typechecking, build, setup and browser-setup proofs, style and application proofs, conformance, guide and policy gates, journey tests, and `CAPTURE=1 npm run test:journey`, followed by independent review and the authoritative gate chain. Require the registered frame and accessibility artifacts, not merely a successful capture command.

PROPOSAL: Reconcile the accepted baseline, implement the release-shaped Forms units in disjoint worktrees with shared patches integrated serially, and accept the family only after validation, accounting, and host-rendered evidence close every declared obligation.