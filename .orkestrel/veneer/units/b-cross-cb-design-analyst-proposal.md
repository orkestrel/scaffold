## Unit

**BARE-BUTTON (`cb`): separate Bootstrap’s universal button normalization from Veneer’s bare-button treatment.** Keep the normalization on every button. Scope the additional treatment in the elements partial, including every state and media-query branch.

The inspected checkout advanced beyond the brief’s `fb0516d` baseline while sibling units landed. The elements button partial remained unchanged. V9 still agrees with its declarations. This proposal supplies source and compiled-declaration analysis; rendered acceptance remains a host obligation.

**Route:** retain `opus` on Opus 5.5 for implementation, followed by independent objective analysis on Astra, subjective review, and verifier evidence. Dispatch from a clean committed checkpoint in an isolated checkout. No dispatch-named skill applies.

The proposed ownership is:

| Classification | Files |
|---|---|
| Owned source | [src/styles/elements/_button.scss](/home/user/veneer/src/styles/elements/_button.scss) |
| Owned proofs | `tests/src/styles/elements/button.test.ts`; `tests/src/styles/components/nav.test.ts`, `dropdown.test.ts`, and `close.test.ts`; a component integration proof at `tests/src/styles/components/integration.test.ts` |
| Shared, report-only | `guides/veneer.md`; `tests/conformance.test.ts`; `tests/setupStyles.ts` and `tests/setupStyles.test.ts`; `app/browser/Showcase.ts`; `app/browser/styles/_shell.scss`; `tests/app/browser/Showcase.test.ts`; `tests/app/browser/integration.test.ts`; capture registrations in `tests/setup.ts` and their proof in `tests/setup.test.ts`; `ROADMAP.md` |
| Off-limits | Component source partials; other element partials; tokens, theme, mixins, and the styles barrel; engine source and proofs; oracle fixtures; ledger readers; manifests and configuration; installed dependencies; scaffold-owned files, including `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` |

Return exact shared-file patches for serial integration. Do not make another component reset the elements layer’s additions.

The affected population comes from `rg -n '<button' app/browser/constants.ts`, searches for button creation in `app/browser/Showcase.ts`, and `<button` searches through Bootstrap’s documentation pages for accordion, alerts, badge, buttons, button group, card, carousel, close button, collapse, dropdowns, list group, modal, navbar, navs and tabs, offcanvas, pagination, placeholders, popovers, spinners, and toasts and tooltips. The following table bounds the production forms and their relevant omissions. Declaration inspection used Sass’s expanded compile and PostCSS alongside the installed Bootstrap stylesheet.

| Form | Relevant declarations the component does not supply |
|---|---|
| `.dropdown-item` | Font size, font family, line height, opacity, transition, and focus shadow |
| `.nav-link` | Opacity, font family, line height, and a base radius; its font-size declaration exists and reads an undeclared slot |
| `.list-group-item` | Font size, font family, line height, opacity, transition, and focus shadow; boundary rules do not reset every item corner |
| `.btn-close`, including alert, toast, modal, and offcanvas close forms | Font size, font family, line height, and transition; component opacity and focus treatment already exist |
| `.accordion-button`, `.navbar-toggler`, and `.page-link` | Disabled opacity; inherited typography remains partly dependent on Reboot |
| Carousel controls and indicators | Base radius and keyboard-focus shadow; their component opacity already exists |
| `.btn`, including grouped buttons, input-group buttons, and component triggers | Explicit component treatment provides the principal geometry and states; retain it as a control |

Include `.page-link` because the brief names it and its selectors admit a button host. The searched pagination documentation demonstrates anchors and spans, so do not describe a button specimen as a documentation finding.

**Dependencies:** land `cb` before THEME generates its final cascade accounting. Coordinate shared patches with the overlay, utility, and BCF landings. If BCF captures before `cb`, regenerate its affected frames after `cb`; earlier frames cannot close V9. Recheck the committed component population at dispatch, including the offcanvas landing.

Acceptance proceeds cheap-first, with each behavioral proof distinguishing a named mutation:

| Acceptance condition | Mutation the proof must distinguish |
|---|---|
| Scoped formatting, lint, and type checks pass; the diff stays within ownership and returned shared patches. | An unowned component reset or token edit fails the scope review. |
| The expanded cascade retains the inventory’s universal button declarations and selectors. Compatibility presence, departure, addition, priority, and element-tag gates pass after serial guide integration. | Removing the universal `button` selector fails presence. Removing `font-size: inherit` fails value accounting and the inherited-font proof. Restoring an obsolete guide row fails stale-row accounting. |
| The elements proof preserves bare geometry, hover, active, keyboard focus, pointer focus, disabled treatment, reduced motion, and forced colors in light and dark. | Removing each scoped state rule fails its computed-property assertion. Removing a media branch fails its corresponding motion or outline reading. |
| An unrelated class, an empty class attribute, and the agreed indicator attribute boundary opt out while retaining Reboot normalization. Adding and removing those attributes changes eligibility as documented. | Widening the scoped selector back to `button`, or leaving a state branch unscoped, changes a measured font, radius, shadow, transition, opacity, or pointer-events value. |
| Disabled nav and dropdown buttons match equivalent disabled anchors for the properties V9 identifies. Pin opacity to `1`, not equality alone. Dropdown size follows the menu’s computed size and a retuned menu font-size slot. | Restoring broad disabled opacity fails the opacity assertions. Restoring broad font size fails the dropdown size and retune assertions. |
| The component integration proof covers the bounded forms, including classless carousel indicators and inherited close-button sizing. Retune bare-specific tokens to distinguish absence from coincidentally equal defaults. | Removing the indicator exclusion exposes bare radius or focus shadow. Restoring broad family or line-height declarations defeats parent typography. A component reset that merely hides V9 fails other form readings. |
| The showcase mode control explicitly receives its intended button treatment and retains its border, keyboard operation, and light/dark affordance. | Removing its explicit treatment fails measured padding or background expectations; equal values between themes alone are insufficient. |
| Regenerated frames show the corrected nav and dropdown button/anchor pairs, plus affected close and carousel states. Independent review accepts them. | Frames produced from the pre-fix cascade retain the V9 mismatch or the unwanted indicator treatment. |

Use the installed `@orkestrel/test/browser` readers and drivers with the existing scene infrastructure. Retain red-before-fix, green-after-fix, mutation, restoration, and capture receipts under the Orchestrator’s `.orkestrel/veneer/` records.

The host verification includes the scoped styles command after rebuilding CSS:

```sh
npm run build:src:styles
node_modules/.bin/vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/elements/button.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/close.test.ts tests/src/styles/components/integration.test.ts
```

After shared integration, run setup, conformance, guide, policy, and app proofs. The verifier owns the ordered `format:check → lint:check → check → build → test` chain, the affected capture journey, and the Tailwind service proofs.

**Risks:** class-based eligibility changes utility-only and consumer-defined buttons, including the showcase control. Carousel indicators defeat a class-only exclusion. The moving checkout requires a fresh dispatch baseline. Playwright launch failed here with `EROFS` while creating `/tmp/playwright-artifacts-*`; this lane supplies no computed-style or capture receipt.

## Rulings needed

**Where the scope lives.** The options have these costs:

| Option | Cost | Recommendation |
|---|---|---|
| Exclude every class-bearing button | Predictable consumer opt-out, but utility classes and `class=""` also remove the bare treatment. Classless carousel indicators remain exposed. | Use this boundary with the indicator ruling below. |
| Exclude known component classes | Preserves custom-class defaults, but duplicates component membership and must track future classes and attribute-selected forms. | Reject the maintenance obligation. |
| Reset additions in component partials | Requires component-specific restoration of omitted properties, states, inheritance, and browser defaults. Expands ownership and accounting. | Reject. |

For the proposed boundary, use `button:where(:not([class], [data-bs-target]))`, subject to the Orchestrator accepting its consumer cost. Attach hover, active, focus-visible, and disabled states to that same scope.

The `:where()` guard preserves the base selector’s type specificity. Layer order already makes normal component declarations outrank normal element declarations. Reducing specificity alone cannot fix properties the component never declares.

**Classless indicators.** Bootstrap’s indicators include buttons without a class attribute; see the [carousel indicator markup](https://getbootstrap.com/docs/5.3/components/carousel/#indicators). The local carousel proof also mounts an indicator with `data-bs-target` and no `data-bs-slide-to`.

An ancestor-based exclusion would make the elements rule position-dependent, contrary to the guide. Excluding only `[data-bs-slide-to]` misses the target-only form. A component reset would require the broader ownership rejected above.

Exclude `[data-bs-target]` on the button itself. Record the cost explicitly: a classless modal or collapse trigger carrying that attribute also receives Reboot normalization without Veneer’s bare treatment. Do not describe this boundary as merely “no component class.”

**Universal normalization versus additions.** Preserve the following split, derived from `node_modules/bootstrap/scss/_reboot.scss` and the pinned inventory’s `reboot.selectors` entries:

| Universal release behavior | Scoped Veneer treatment |
|---|---|
| `margin: 0`; `font-family`, `font-size`, and `line-height: inherit`; `border-radius: 0`; `text-transform: none`; `-webkit-appearance: button` | Token-based typography and radius, padding, font weight, color, transparent fill, border removal, shadow, unconditional pointer cursor, and transition |
| `button:focus:not(:focus-visible) { outline: 0 }` | Hover and active fill; focus-visible shadow and forced-colors treatment; disabled color, fill, opacity, and pointer refusal |
| Existing role-button cursor, typed-input appearance, and enabled-control cursor selectors | Their existing behavior remains outside the scoped treatment |

Moving the whole original rule behind the guard would drop required normalization from classed controls. Moving only font size and opacity would leave the other additions exposed. Adopt the complete split.

**Consumer classes and the showcase.** Bootstrap’s Reboot does not exempt class-bearing buttons. Under the proposed design, a consumer’s custom class retains that normalization and supplies its own presentation; adding `.btn` explicitly selects Veneer’s component presentation.

The showcase’s `control` class currently relies on the bare treatment. Give its button `.btn` alongside `control`, retain the shell border override, and revise the corresponding comments and proof. Keeping implicit treatment through a special `control` exclusion would make library CSS depend on private application markup.

**Guide and ledger accounting.** Keep the `reboot | selector` compatibility row shipped: its inventory selectors remain present. Clarify the bare-treatment scope in § Styles and the button file row.

Remove the `button` departure rows for border radius, font family, font size, and line height after those universal declarations match Reboot. Replace the old broad button additions with the measured scoped selector additions, including reduced-motion and forced-colors sites.

`LAYER_COMPONENTS.elements` already attributes these selectors to `reboot`. No attribution change is needed. The ledger’s unrecorded/stale departure and addition cases judge the change; compatibility presence and the element-tag case remain separate obligations. Update the forced-colors selector expectations in `tests/conformance.test.ts`.

**Proof placement.** Extend the existing elements, nav, and dropdown proofs. Put the component-form matrix in the component integration proof, with shared case data in `tests/setupStyles.ts`. Update close-proof comments and assert its missing transition directly. Keeping only selector-presence checks would not detect V9; keeping only nav/dropdown assertions would leave classless indicators unproved.

## Files the result makes false

The following searches identify text, expectations, or retained evidence requiring integration:

| File or artifact | Search and required correction |
|---|---|
| `guides/veneer.md` | Searches for `reboot` rows containing `button`, `bare button`, and `bare control` find the broad departures and additions. Replace them with measured scoped accounting and document the eligibility boundary. |
| `tests/conformance.test.ts` | `rg -n -F 'button:focus-visible' tests/conformance.test.ts` finds forced-colors selector expectations. Change them to the compiled scoped selector. |
| `tests/src/styles/components/close.test.ts` | Searching `bare button element` finds comments attributing color and opacity transitions to the element rule. Remove that claim and prove the component’s resulting transition behavior. |
| `tests/app/browser/integration.test.ts` | The same search finds the close-capture transition explanation. Correct it without weakening state or capture assertions. |
| `app/browser/Showcase.ts`, `app/browser/styles/_shell.scss`, and `tests/app/browser/Showcase.test.ts` | Searches for `SHOWCASE_CONTROL`, `.control`, and `bare-button` reveal the private control’s dependency and the statement that it stays outside `.btn`. Integrate the explicit treatment and revise that statement. |
| Nav, dropdown, close, carousel, and showcase capture evidence | `rg -n 'nav-base|dropdown-menu|close-control|captioned-carousel' tests/setup.ts` identifies existing capture subjects. Regenerate affected frames; retain their scenario names. |

The existing bare-button expected values remain the preservation contract. Do not rewrite those values to accommodate a regression.

## Exit criterion

Close `cb` when the agreed scope excludes the bounded component forms, every button retains release normalization, bare-button treatment remains intact, and the nav/dropdown regressions and indicator boundary have computed-style proofs with retained mutation receipts. Shared guide, accounting, showcase, and comment patches must be integrated. The verifier’s gates and affected capture review must pass on the same committed cascade.

The Orchestrator must rule the class/attribute eligibility boundary and its consumer cost before dispatch.

## Journal

Path: `/home/user/scaffold/tmp/codex/b-cross-cb-design-analyst.jsonl`

Session id: `01a0d165-79a7-77d2-8460-12d27898da29`