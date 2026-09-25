**The mechanism.**

Put the calibrated surface on `button` in the `elements` layer. Keep the layer order declared in [the token partial](/home/user/veneer/src/styles/_tokens.scss):

```css
@layer theme, reset, base, elements, components, utilities;
```

Use `button:where(:hover)`, `button:where(:active)`, `button:where(:focus-visible)`, and `button:where(:disabled)` for the calibrated states. Keep their existing values and media treatments. These selectors inspect the element’s own state, without inspecting its classes, attributes, ancestors, or siblings.

Retain the reboot’s margin, text transform, appearance, pointer-focus handling, and enabled-only cursor rule. Remove the calibrated block’s unconditional `cursor: pointer`; the enabled rule already supplies it. A disabled default button then takes its native cursor while retaining the calibrated disabled paint and `pointer-events: none`.

Put each component’s missing declarations in its owning partial, under `@layer components`. Use selectors such as `:where(button.btn-close)` and `:where(button.dropdown-item:focus-visible)`. Their zero specificity lets the component’s existing rules and a consumer’s class override them.

For carousel indicators, use `:where(.carousel-indicators [data-bs-target]):where(button)`. This extends Bootstrap’s explicit component contract. It does not infer a component from surrounding semantic tags. A standalone button carrying `data-bs-target` retains the tag default.

Centralize the shared `font-family: inherit` and `box-shadow: none` declarations in a declaration-only `button-reset` mixin in `_mixins.scss`. Each owning partial adds its remaining declarations from the matrix.

Use property-specific resets. `revert-layer` in `components` would reveal the calibrated `elements` declarations again; `all: revert` would also discard unrelated author styling. Use `inherit` where Bootstrap explicitly inherits and `revert` where Bootstrap leaves the property to the browser. See the [CSS cascade’s explicit defaulting rules](https://www.w3.org/TR/css-cascade-5/#defaulting).

A utility changes only the properties it declares. An unrelated consumer class and an empty `class` attribute leave the default intact. An unlayered consumer class, or a class in a later layer, overrides the default through ordinary declarations.

**The leak matrix.**

This matrix derives from the source at `6882751`, the compiled Veneer stylesheet, and Bootstrap’s installed `5.3.8` stylesheet. Browser outcomes remain Unknown until the proposed proofs run.

The calibrated declaration set is `padding`, `font-family`, `font-size`, `font-weight`, `line-height`, `color`, `background-color`, `border`, `border-radius`, `box-shadow`, and `transition`; its states add `outline`, `opacity`, and `pointer-events`. Shorthands include their constituent longhands.

The reboot’s `margin`, `text-transform`, and appearance declarations remain intentional defaults. Every documented component composition already supplies its padding, background, and border. Existing component declarations therefore override those tag properties across states.

Each reset in the following table applies only to the component’s button form.

| Component contract | Missing resting declarations and proposed resets | Missing state declarations and proposed resets |
|---|---|---|
| `.btn`, including filled, outline, link, size, active, and shown variants | None. Veneer’s `.btn` declares the calibrated properties itself, including its resting shadow and transition. The component layer overrides the tag layer. | None. Existing component focus and disabled rules own the affected properties. Preserve the recorded Elements calibration and existing variant behavior. |
| `.btn-close`, including `.btn-close-white` | `font-family: inherit`; `font-size: inherit`; `font-weight: revert`; `line-height: inherit`; `box-shadow: none`; `transition: none`. The resting shadow requires a declaration even though the default shadow token initially resolves to `none`. | None beyond the resting resets. Existing focus rules replace the shadow and outline; existing disabled rules supply opacity and pointer refusal. The background shorthand blocks the tag’s hover, active, and disabled fills. |
| `.navbar-toggler` | `font-family: inherit`; `font-weight: revert`; `box-shadow: none`. The component already supplies its size, line height, corners, and transition. | On `:disabled`, `opacity: revert` and `pointer-events: revert`. Bootstrap supplies no disabled opacity or pointer-events treatment here. Existing focus rules retain the toggler’s ring. |
| `.accordion-button`, collapsed and expanded | `font-family: inherit`; `font-weight: revert`; `line-height: inherit`; `box-shadow: none`. The shadow reset covers the collapsed resting state. | On `:disabled`, `opacity: revert` and `pointer-events: revert`. Existing expanded and focused rules override the resting shadow reset. Their colors and backgrounds already override the tag states. |
| `.dropdown-item` | `font-family: inherit`; `font-size: inherit`; `line-height: inherit`; `box-shadow: none`; `transition: none`. Weight and corners already have component declarations. | On `:focus-visible`, `outline: revert`. On `:disabled`, `opacity: revert`. Existing disabled rules already supply color, background, and pointer refusal. |
| `.nav-link`, including tabs, pills, underline navigation, and navbar navigation | `font-family: inherit`; `line-height: inherit`; `border-radius: 0`; `box-shadow: none`. Retain the existing font-size and font-weight variable declarations. | On `:disabled`, `opacity: revert`. Existing rules already own disabled color, cursor, and pointer refusal, and keyboard-focus shadow and outline. Tab and pill corner rules override the resting corner reset. |
| `.list-group-item.list-group-item-action`, including contextual, active, horizontal, and flush forms | On `:where(button.list-group-item)`, write `font-family: inherit`; `font-size: inherit`; `font-weight: revert`; `line-height: inherit`; `border-radius: 0`; `box-shadow: none`; `transition: none`. The `.list-group-item` class supplies the action’s padding, background, and border. | On `:focus-visible`, `outline: revert`. On `:disabled`, `opacity: revert`. Existing item rules retain disabled pointer refusal. Boundary and horizontal corner rules override the base corner reset. |
| `.carousel-control-prev` | `font-family: inherit`; `font-size: inherit`; `font-weight: revert`; `line-height: inherit`; `border-radius: 0`; `box-shadow: none`. | On `:disabled`, `pointer-events: revert`. Existing component opacity wins over the tag’s disabled opacity. Existing focus rules keep the outline absent; the shadow reset prevents the tag’s ring. |
| `.carousel-control-next` | `font-family: inherit`; `font-size: inherit`; `font-weight: revert`; `line-height: inherit`; `border-radius: 0`; `box-shadow: none`. | On `:disabled`, `pointer-events: revert`. Preserve its own opacity and outline behavior, as for the previous control. |
| `.carousel-indicators [data-bs-target]`, with and without `.active` | `font-family: inherit`; `font-size: inherit`; `font-weight: revert`; `line-height: inherit`; `color: revert`; `border-radius: 0`; `box-shadow: none`. The component already owns its geometry, background, border, opacity, cursor, and transition. | On `:focus-visible`, `outline: revert`. On `:disabled`, `pointer-events: revert`. The component’s resting and active opacity declarations already defeat the tag’s disabled opacity. |
| `.page-link` | `font-family: inherit`; `font-weight: revert`; `line-height: inherit`; `border-radius: 0`; `box-shadow: none`. Existing size and boundary-corner rules remain authoritative. | On native `:disabled`, `opacity: revert` and `pointer-events: revert`. Bootstrap’s `.disabled` and `.disabled > .page-link` rules remain stronger and retain their pointer refusal. Existing focus rules retain the pagination ring. |

`font-weight: revert` deliberately differs from `inherit`: Bootstrap’s reboot does not make buttons inherit weight. An accordion button inside a heading must retain the browser’s button weight unless a component or consumer declares another value.

The `.nav-link` font declarations require separate attention. Its size variable can be absent, and its weight variable is emitted empty. Invalid computed values default through inheritance; they do not expose the lower-layer calibrated declaration. Preserve that behavior and test it under a parent with deliberately different typography.

The discovery search was `rg -n 'button|\[type=' node_modules/bootstrap/scss --glob '*.scss'`, followed by declaration inspection with the installed PostCSS parser. Documentation searches examined `<button\b[^>]*>` in retrievable `v5.3.8` component MDX and the official component, forms, helpers, and utilities examples.

The additional compositions found use `.dropdown-toggle`, `.dropdown-toggle-split`, `.btn-close-white`, button variants, and utilities alongside an owning base class. They need no independent surface reset. Input-group buttons and buttons containing spinners remain `.btn` compositions. `.btn-check` is an input contract. The brief’s `.page-link` button form remains included even though the inspected pagination examples use anchors and spans. See the release’s [button examples](https://github.com/twbs/bootstrap/blob/v5.3.8/site/src/content/docs/components/buttons.mdx), [dropdown examples](https://getbootstrap.com/docs/5.3/components/dropdowns/), and [carousel examples](https://getbootstrap.com/docs/5.3/components/carousel/).

**States.**

The tag state selectors continue to match component buttons. The component layer determines their effective paint.

- **Hover and active:** Existing component background declarations override the tag’s state backgrounds, including when the component intentionally has no separate hover or active fill. Preserve `.btn` checked-adjacency rules, accordion expansion, selected navigation, active list items, and active indicators.
- **Keyboard focus:** Existing component rings remain authoritative for `.btn`, close, toggler, accordion, navigation, and pagination. Dropdown items, list actions, and indicators restore the browser outline with `outline: revert` and suppress the calibrated shadow. Carousel controls retain their existing outline-free focus treatment.
- **Pointer focus:** Apply the outline restoration only under `:focus-visible`. An unconditional `outline: revert` would override the reboot’s pointer-focus suppression.
- **Disabled:** Restore only properties Bootstrap leaves unset, as named in the matrix. Use native `:disabled`, including disabled-fieldset propagation. Preserve each component’s existing `.disabled` behavior.
- **Reduced motion:** Components with transitions retain their own reduced-motion branches. Close controls, dropdown items, and list items retain no transition.
- **Forced colors:** Component declarations still outrank the tag’s forced-colors branch. Preserve the component rings already recorded by Veneer. Dropdown items, list actions, and indicators regain the browser’s outline; carousel controls retain their existing focus treatment.

**Units.**

Treat the cascade and consumer units as an acceptance group. Do not ship the widened tag selector before its component resets and corrected contract are integrated.

**E-ID-BUTTON-CASCADE — tag default and component isolation.**

Own `src/styles/elements/_button.scss`, `src/styles/_mixins.scss`, and the component partials `_close.scss`, `_navbar.scss`, `_accordion.scss`, `_dropdown.scss`, `_nav.scss`, `_list-group.scss`, `_carousel.scss`, and `_pagination.scss`. Own their mirrored styles tests, the component button regression test, `tests/src/styles/mixins.test.ts`, and the required fixture support in `tests/setupStyles.ts`, `tests/setupBrowser.ts`, and `tests/setupServer.ts`, with their setup proofs.

Use identical markup in isolated Bootstrap-reference and Veneer-candidate documents. Preserve existing recorded differences through independent expected values; do not compare differently styled anchors as the sole oracle for native button behavior.

The browser proofs and their mutations are:

| Proof | Browser reading | Mutation that must redden it |
|---|---|---|
| Default survives markup decoration | Compare a plain button, an empty-class button, a hook-class button, a spacing-utility button, and a standalone target-attribute button. Read calibrated typography, padding, corners, paint, and interaction states. | Restore either exclusion in `button:not([class], [data-bs-target])`. |
| Typography follows the owning contract | Render component buttons under `font: 700 19px/29px serif`. Read family, size, weight, line height, text bounds, and control bounds against the same Bootstrap button markup. | Remove each applicable typography reset separately. Replace `font-weight: revert` with `inherit` to challenge the heading case. |
| Resting chrome remains isolated | Read shadows, corners, backgrounds, borders, and transition properties. Retune `--vn-button-shadow` to a visible shadow so a missing reset cannot pass accidentally. | Remove the owning shadow, corner, or transition reset separately. |
| Component states remain authoritative | Drive real hover, held-pointer active state, keyboard focus, and pointer focus. Assert the intended pseudo-class before reading paint, outline longhands, shadow, and opacity. | Remove an outline restoration or shadow reset; separately place the calibrated states after components in layer precedence. |
| Disabled behavior matches the contract | Read opacity, pointer-events, cursor, hit testing, and activation for native-disabled buttons, disabled fieldsets, and supported `.disabled` forms. Include the fieldset legend exemption. | Remove each disabled reset separately. Reintroduce the unconditional tag cursor to challenge native-disabled cursor parity. |
| Component geometry survives | Read close-control em geometry, accordion bounds and chevron placement, navigation corners, list boundaries, pagination joins, and carousel control and indicator bounds. | Remove the corresponding font or corner reset while retaining the widened tag selector. |
| Media states remain isolated | Repeat focus and disabled readings under forced colors; inspect transition longhands under reduced motion. | Remove the component’s required media treatment or let the tag focus treatment win. |
| Existing `.btn` compositions remain calibrated | Exercise filled, outline, link, size, grouped, checked, active, shown, and disabled forms against the existing identity expectations. | Apply the generic reset to `.btn`, or remove a component declaration that protects it from the tag default. |

Run the owned styles proofs through `configs/src/vite.styles.config.ts` against a fresh stylesheet build. Retain each mutation’s failing reading and the restored passing reading.

**E-ID-BUTTON-CONSUMER — customization and published contract.**

Own `guides/veneer.md`, `tests/conformance.test.ts`, `tests/src/styles/integration.test.ts`, `tests/service/tailwind/consumer.test.ts`, `tests/fixtures/tailwind/markup.html`, and `tests/app/browser/Showcase.test.ts`. Receive fixture-support changes from the cascade unit through serial integration.

Replace the classless definition in the Styles paragraph, the stylesheet-file description, and the Tailwind paragraph. Reconcile the additions and departures against the emitted selectors, properties, and media conditions. Update the forced-colors selector assertions without weakening accounting.

Prove these consumer outcomes:

- A normal consumer class overrides the tag’s background, padding, and focus treatment without selector escalation or `!important`. Removing that class declaration must restore the calibrated reading and fail the override assertion.
- A utility-only button retains calibrated properties outside the utility’s declaration set. Restoring the class exclusion must fail that reading.
- The shipped Tailwind pairing retains the button default while its generated padding utility wins. Removing the generated utility must fail the padding assertion.
- Adding and removing an unrelated class on the showcase mode control preserves its calibrated surface and states. Restoring the old selector must fail that comparison.
- The accounting gate rejects an omitted reset record and a stale excluded-selector record.

Closure requires the matrix’s rendered readings, mutation evidence, customization proofs, and guide accounting to agree. Independent verification then runs the repository’s required gates.

**Risks and open questions.**

- **Unknown — rendered correctness.** This lane ran no browser or Vitest. The cascade analysis predicts behavior; the named browser fixtures must establish it before acceptance.
- **Unknown — native defaults across supported browsers.** Font weight, focus outline, indicator text color, disabled opacity, and pointer behavior depend partly on browser styling. Settle each `revert` declaration against the identical Bootstrap fixture in each supported engine.
- **Unknown — complete release-example coverage.** The installed package contains no documentation corpus, and some pinned GitHub pages were unavailable or exposed incomplete markup. Before closing the matrix, search the complete `v5.3.8` documentation and example sources for button opening tags, inspect generated examples, and classify every discovered class composition. Documentation-site custom classes must remain consumer examples, not become framework reset targets.
- **Compatibility boundary.** Veneer already records calibrated `.btn` geometry, colors, motion, and forced-colors departures. Preserve those rulings. Settle an interpretation requiring literal stock Bootstrap paint by comparing the existing compiled controls against Bootstrap and explicitly ruling on the recorded differences.
- **Unknown — inherited pointer exclusion.** A blanket `pointer-events: auto` could defeat an ancestor’s exclusion. The proposed `revert` must be checked with disabled component buttons beneath `pointer-events: none`, alongside the reference fixture.
- **Token changes can conceal leaks.** Equal initial values do not prove isolation. Retune the button shadow, disabled opacity, and typography independently; the owning component’s readings must remain governed by its own contract.
- **Cursor adjustment.** Removing the unconditional calibrated cursor changes the computed cursor of a disabled default button. Read that case directly, along with enabled buttons and explicit `[role='button']` controls, and record the resulting reboot alignment.