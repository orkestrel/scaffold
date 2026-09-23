I'll start by reading the brief and the repository's agent contracts so I follow the required process.The brief is a read-only terrain reading. I'll capture git status, then read the named sources directly.Git status is clean. Next I’ll locate the oracle, Veneer, and ruling sites the brief names.The inventory keeps media and keyframes off the component keys. I’ll read the Bootstrap and Veneer sources next.Git status was empty before and after this reading. B-CROSS, in `ROADMAP.md` § The family queue (`B-CROSS`, ~326), is `theme` and `transition`, the media conditions (the breakpoint ramp, `prefers-reduced-motion`, and print), and `keyframes` as a group. The right-to-left mechanism and the `DOMContentLoaded` auto-initialization rows stay refused.

The pinned inventory has component keys `theme` (15 selectors) and `transition` (7 selectors). It has no component key `media`, `keyframes`, or `fade`.

## A. Oracle surface

`_root.scss` (`:root, [data-bs-theme="light"]`, ~1) emits `--#{$prefix}*` with `$prefix` = `bs-` (`_variables.scss` `$prefix`, ~393). Groups, from the maps those loops walk:

- `$colors` (`_variables.scss` ~52): `--bs-blue`, `indigo`, `purple`, `pink`, `red`, `orange`, `yellow`, `green`, `teal`, `cyan`, `black`, `white`, `gray`, `gray-dark`.
- `$grays` (~24): `--bs-gray-100` through `--bs-gray-900`.
- `$theme-colors` (~312): `--bs-primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, `dark`, then the same eight with `-rgb`, `-text-emphasis`, `-bg-subtle`, and `-border-subtle` (`_maps.scss` `$theme-colors-rgb` ~6, `$theme-colors-text` ~10, `$theme-colors-bg-subtle` ~23, `$theme-colors-border-subtle` ~36).
- Written outright (~37–129): `--bs-white-rgb`, `--bs-black-rgb`, `--bs-font-sans-serif`, `--bs-font-monospace`, `--bs-gradient`, `--bs-body-font-family`, `--bs-body-font-size`, `--bs-body-font-weight`, `--bs-body-line-height`, `--bs-body-color`, `--bs-body-color-rgb`, `--bs-body-bg`, `--bs-body-bg-rgb`, `--bs-emphasis-color`, `--bs-emphasis-color-rgb`, `--bs-secondary-color`, `--bs-secondary-color-rgb`, `--bs-secondary-bg`, `--bs-secondary-bg-rgb`, `--bs-tertiary-color`, `--bs-tertiary-color-rgb`, `--bs-tertiary-bg`, `--bs-tertiary-bg-rgb`, `--bs-heading-color`, `--bs-link-color`, `--bs-link-color-rgb`, `--bs-link-decoration`, `--bs-link-hover-color`, `--bs-link-hover-color-rgb`, `--bs-code-color`, `--bs-highlight-color`, `--bs-highlight-bg`, `--bs-border-width`, `--bs-border-style`, `--bs-border-color`, `--bs-border-color-translucent`, `--bs-border-radius`, `-sm`, `-lg`, `-xl`, `-xxl`, `-2xl`, `-pill`, `--bs-box-shadow`, `-sm`, `-lg`, `-inset`, `--bs-focus-ring-width`, `--bs-focus-ring-opacity`, `--bs-focus-ring-color`, `--bs-form-valid-color`, `--bs-form-valid-border-color`, `--bs-form-invalid-color`, `--bs-form-invalid-border-color`.

Guarded names `--bs-root-font-size`, `--bs-body-text-align`, and `--bs-link-hover-decoration` (~50, ~57, ~89) are absent from the inventory `root` map. `--bs-breakpoint-*` is not in this file; `_grid.scss` (~7) emits it. `$enable-dark-mode` is `true` and `$color-mode-type` is `data` (~387).

The dark block (`@include color-mode(dark, true)`, ~132) sets `color-scheme: dark` and rewrites body, emphasis, secondary, tertiary, heading, link, code, highlight, border, and form-valid/invalid properties, plus the three dark theme maps (`_maps.scss` ~54–89). `_variables-dark.scss` (~102 lines) only declares the Sass values those maps and the form, accordion, carousel, and close variables read. It emits no CSS.

`_transitions.scss` (`.fade` ~1, `.collapse` ~10, `.collapsing` ~16) includes `transition()` for fade, collapse height, and horizontal collapse width. `.collapse:not(.show)` is `display: none`.

`mixins/_transition.scss` (`transition`, ~2) emits `transition` when `$enable-transitions` is on, and, when `$enable-reduced-motion` is on and the value is not `null` or `none`, nests `@media (prefers-reduced-motion: reduce) { transition: none }`.

`mixins/_breakpoints.scss`: `breakpoint-infix` (~55) is `""` for the zero breakpoint and `-{name}` otherwise. `media-breakpoint-up` (~61) emits `@media (min-width: …)` and emits bare content when the minimum is null. `media-breakpoint-down` (~74) emits `@media (max-width: …)` with the width reduced by `0.02px` (`breakpoint-max`, ~43). `media-breakpoint-between` (~87) and `media-breakpoint-only` (~109) combine those. `$grid-breakpoints` (~484) is `xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1400px`.

`mixins/_color-mode.scss` (`color-mode`, ~2): `media-query` wraps `:root` or the content in `prefers-color-scheme`; the other branch emits `[data-bs-theme="{mode}"]`.

`_utilities.scss` (`display`, ~67) is the only map entry with `print: true`. `utilities/_api.scss` (~39) is the only `@media print` in the release SCSS: it loops `$utilities` and calls `generate-utility($utility, "-print")` when `print == true`. The same file (~1) loops `media-breakpoint-up` for responsive utilities.

`@keyframes` under `node_modules/bootstrap/scss/`, none of them inside a reduced-motion branch:

| Name | File | Reduced motion |
| --- | --- | --- |
| `spinner-border` | `_spinners.scss` ~18 | The keyframe is unconditional. `prefers-reduced-motion: reduce` (~80) doubles `--bs-spinner-animation-speed` on `.spinner-border, .spinner-grow`. |
| `spinner-grow` | `_spinners.scss` ~50 | Same block. The keyframe carries `/* rtl:ignore */` on the rotate. |
| `progress-bar-stripes` | `_progress.scss` ~5 | Inside `@if $enable-transitions` only. `.progress-bar-animated` (~59) sets `animation: none` under `prefers-reduced-motion: reduce`. |
| `placeholder-glow`, `placeholder-wave` | `_placeholders.scss` ~35, ~47 | No reduced-motion rule in that file. |

`_reboot.scss` (~34) puts `scroll-behavior: smooth` on `:root` under `prefers-reduced-motion: no-preference`. The inventory files that under the `theme` key.

## B. What Veneer ships

`_tokens.scss` (`:root` inside `@layer theme`, ~193) declares the `--vn-*` registry, then `--bs-*` aliases of the mode-independent set (~373–445), including `@each` over `breakpoints()` for `--vn-breakpoint-*` and `--bs-breakpoint-*`. `$roles` (~7) adds `tertiary`. `$aliased` (~10) is the eight Bootstrap roles. `$light` (~17) and `$dark` (~61) are the mode maps. `$dark` also holds `select-indicator`, `switch-knob`, `toggler-icon`, `accordion-icon`, and `accordion-active-icon`. `$assets` (~163) maps only `toggler-icon`, `accordion-icon`, and `accordion-active-icon` onto `--bs-navbar-toggler-icon-bg`, `--bs-accordion-btn-icon`, and `--bs-accordion-btn-active-icon`.

`theme-tokens` (`_mixins.scss` ~254) emits the mode-dependent `--vn-*` names and their `--bs-*` aliases, including `--bs-primary` outside the `$aliased` loop and, per aliased role, `--bs-{role}-text-emphasis`, `-bg-subtle`, and `-border-subtle`. It also emits body, emphasis, secondary, tertiary, heading, link, code, highlight, border, form-valid/invalid, focus-ring color, close filter, and the three carousel aliases (~295–334).

`_theme.scss` (`[data-bs-theme='light']` ~10, `[data-bs-theme='dark']` ~15) is the island mechanism: both selectors are unqualified attribute selectors, each sets `color-scheme` and includes `theme-tokens` with `$light` or `$dark`. The dark block alone walks `$assets` and errors if a key is missing from `$dark`. `:root` in `_tokens.scss` is the light closure before a mode attribute exists. The comment at ~6 states that a nested island returns its subtree to its own mode.

Mixin emission in `_mixins.scss`:

- `breakpoints()` (~109) returns `(xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px, xxl: 1400px)`.
- `breakpoint-up` (~127) emits bare content at width `0`, otherwise `@media (width >= {width})`.
- `breakpoint-each` (~139) walks the ramp and yields an infix (`""` or `-{name}`) inside `breakpoint-up`.
- `breakpoint-down` (~156) emits nothing at width `0`, otherwise `@media (width < {width})`.
- `reduced-motion` (~165) emits `@media (prefers-reduced-motion: reduce)`.
- `transition` (~171) emits `transition: $value` and, inside `reduced-motion`, `transition: none`.
- `forced-colors` (~178) emits `@media (forced-colors: active)`.
- `role-each` (~225) emits `--vn-color-{role}-subtle`, `-emphasis`, and `-border`.
- `theme-tokens` is described above.

`_reset.scss` (~10) is the only `prefers-reduced-motion: no-preference` rule in `src/styles`: `:root { scroll-behavior: smooth }` inside `@layer reset`. There is no `@media print` under `src/`. There is no `.fade`, `.collapse`, or `.collapsing` under `src/`.

`@keyframes` under `src/styles/`, again outside the reduced-motion blocks:

- `progress-bar-stripes` in `components/_progress.scss` (~6). `.progress-bar-animated` (~73) sets `animation: none` inside `reduced-motion`.
- `spinner-border` (~20) and `spinner-grow` in `components/_spinner.scss`. `reduced-motion` (~75) sets `--bs-spinner-animation-speed: 1.5s`. The rotate has no `rtl:ignore` comment; a comment at ~18 says no direction-flipping annotation ships.
- `placeholder-glow` (~37) and `placeholder-wave` (~58) in `components/_placeholder.scss`. That file has no reduced-motion rule.

`guides/veneer.md` § Tokens, `#### Motion, focus, validation, breakpoints, and stacking` (~2065), header row `Token | Value | Source | Alias`. Rows that name motion or the breakpoint ramp: `--vn-motion-feedback` / `--vn-motion-panel` (alias `none`), the three `--vn-ease-*` (alias `none`), and `--vn-breakpoint-xs` through `--vn-breakpoint-xxl` aliased to `--bs-breakpoint-xs` … `-xxl` (~2073–2080). The same table also rows focus, validation, and stacking. The paragraph under it (~2086) says `breakpoint-up(xs)` is unwrapped and `breakpoint-down(xs)` emits nothing.

`### Bootstrap variables Veneer retains` (~2177) names `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, `--bs-carousel-control-icon-filter`, then the three dark-only names `--bs-navbar-toggler-icon-bg`, `--bs-accordion-btn-icon`, `--bs-accordion-btn-active-icon`, and says `--bs-form-select-bg-img` and `--bs-form-switch-bg` are declared on the select and switch partials.

§ Compatibility (~3782) has no Component cell `theme` and no Component cell `transition`. The shipped-key list in `tests/conformance.test.ts` (~98) matches that absence. An engine row of Kind `transition` (~3953) records `TRANSITION_END` emulation, status `accepted`. An engine initialization row (~3958) records `onDOMContentLoaded`, status `accepted`. `### Additions` (~3584) says the reset's reduced-motion `:root` rule is one the release records under the `theme` key "this package does not ship."

Proof cases:

- `tests/src/styles/theme.test.ts` (`theme scopes`): retunes body, canvas, border, and ring in dark; holds a mode-independent binding; follows `color-scheme`; returns a nested light island; resolves every role tier and the body tokens over nested modes; carries unlanded dark assets only in the dark scope.
- `tests/src/styles/tokens.test.ts` (`token cascade`): document-scope registry equals `TOKEN_NAMES` and `BOOTSTRAP_ROOT_VARIABLES`; reference-map values resolve in each mode; every theme-dependent name is re-declared in each mode scope; calibrated tiers, channel triplets, retained colors and lengths, focus ring, radius, elevation, inset shadow, density, the space ramp, display sizes, stripe percentage, radius factor, elevation factor, motion factor, invalid factor, invalid token, subtree rescale, cyclic reference, nested light island, and important utility.
- `tests/src/styles/mixins.test.ts`: focus ring; feedback duration collapses under reduced motion; a reduced-motion block with no transition; forced colors; role tiers; each breakpoint condition matches its token; up applies at and above each boundary and down below it.

## C. Accounting of conditions

`tests/setupServer.ts`: a departure row's `condition` (~70) is the at-rule text, or absent. `normalizeMediaCondition` (~1291) strips the `@media` prelude and rewrites `(min-width: Npx)` to `(width >= Npx)` and a fractional `(max-width)` up to `(width < ceil(N)px)`. `readCascadeBlocks` (~1358) skips rules inside `@keyframes`, keeps `@layer` on `layer`, and joins every other enclosing at-rule with ` and `. `collectValueGaps` (~2124) matches a recorded rule to an emitted block only when the normalized conditions are equal. `collectAdditions` (~2237) treats a selector the release writes with no such condition as an addition, and a `@keyframes` name absent from that component's `keyframes` field as category `keyframes` with `condition: undefined` (~2298). `collectKeyframeNames` (~1479) is the animation-name list. `renderRuleKey` (~1405) and `collectDeclarationReads` (~1427) keep a reduced-motion twin out of its resting selector by putting the condition in the key.

`tests/setupStyles.ts` does not define `stageMedia`. It exports `REDUCED_MOTION = '(prefers-reduced-motion: reduce)'` (~1127). Case rows such as `FormRangeCase.condition` (~3602) store `` `@media ${REDUCED_MOTION}` `` or `undefined` (~3707). `parseMediaWidth` (~190) reads a pixel width from either range or `min-width`/`max-width` text. `collectGridVocabulary` (~63) rewrites those width forms and lets a preference condition through with whitespace stripped. The style proofs import `stageMedia` from `@orkestrel/test/browser` and call it with `{ motion: false }` or `{ forced: true }`. `collectMediaConditions` lives in `tests/setupBrowser.ts` (~1332) and returns a `CSSMediaRule`'s `conditionText`.

What is proved today: a selector rule's enclosing media condition, compared as text after the width normalization above, and a keyframe name as an addition category. A component `media` array is not what those readers compare. `stageMedia` is how a browser proof turns the reduced-motion or forced-colors preference on.

## D. Rulings

§ Tenets does not name theme, dark mode, islands, print, or breakpoints. § Rulings, standing (~95, ~100–103): "Ship no right-to-left support." "Refuse the `./browser/auto` entry, its wrapper, its manifest rows, and the rule amendment. The data API is `Delegate`." "Keep `index.rtl.css` emitted and unexported until D5 rules, and spend no unit's work on it before that ruling."

Design rulings (~121–125) require the departures table to include the enclosing condition and an additions table for every emitted selector, declaration, custom property, and keyframe. (~133) takes motion tokens from rendered specimens when the identity phase opens. (~146–148) adopts reduced-motion gating in script and completion read from the actual transition, and refuses the fixed transition fallback. (~160) D5: remove the `index.rtl.css` twin, its plugin, its proofs, the guide's direction sentences, the RTL digest pin, and the inventory's `rtl` fields. The section's preamble (~75) says a design ruling wins where it and a standing ruling disagree. `src/` no longer names `index.rtl.css`. The inventory still has `digests["bootstrap.rtl.css"]` (`inventory.json` ~5).

§ The family queue (`B-CROSS`, ~326–328), quoted above. § Carriers rows that name theme: "Theme-scope select caret and switch knob" (~384), closed by B-FORMS-ASSETS, which removes `select-indicator` and `switch-knob` from `$assets`; "`BUTTON_OUTLINE_CASES` … binds `theme`" (~389), closed by renaming that axis to `mode`; "Audit claim 10: theme islands are proved for the probed tokens only" (~427), carried by F6's role-token matrix. No § Carriers row names B-CROSS, print, keyframes, or a breakpoint. The `index.rtl.css` row (~415) names D5, not those words.

Exit criterion (~236–246): item 2, every emitted selector, declaration, custom property, and keyframe maps to a recorded value, a departure, or an addition, and every recorded name ships or holds a deferral; item 3, every key the pinned record carries ends `shipped`, deferred with an owner, or excluded with a reason; item 6, every documented token's declared value is read from the built cascade, and overriding each token group moves a resolved consumer.

`decisions-round-2.md`: D5 (~15, ~40), "get rid of any RTL, no plans to support," and the reading that removes the twin, plugin, proofs, direction sentences, RTL digest pin, and inventory `rtl` fields. D26 (~250) still says `$assets` maps `select-indicator` and `switch-knob` and that `_theme.scss` emits them. The carriers row and the current `$assets` map (~163) say those two entries are gone. D28 (~267) says a light island nested in a dark island keeps the dark switch knob, matching the release selector. No decision in that file names print, the breakpoint ramp, or `prefers-reduced-motion`.

`src/` contains no `DOMContentLoaded`. The guide's accepted engine initialization row (~3958) still names `onDOMContentLoaded`.

## E. Sizing

Release SCSS: `_root.scss` 187, `_variables-dark.scss` 102, `_maps.scss` 174, `_transitions.scss` 27, `mixins/_transition.scss` 26, `mixins/_breakpoints.scss` 127, `mixins/_color-mode.scss` 21, `_utilities.scss` 806, `utilities/_api.scss` 47, `_spinners.scss` 86, `_progress.scss` 68, `_placeholders.scss` 51.

Veneer: `_tokens.scss` 447, `_theme.scss` 28, `_reset.scss` 15, `_mixins.scss` 335, `components/_spinner.scss` 81, `components/_progress.scss` 79, `components/_placeholder.scss` 63.

## F. Files the family makes false

These assertions enumerate a closed set:

- `tests/conformance.test.ts` `carries every shipped component selector and custom property in the built cascade` (~95) expects `collectShippedComponents` to equal a fixed list that has no `theme` and no `transition`, and expects `scanCompatibilityPresence` to be undefined.
- The same file's `records every measured value difference in the guide ledger` (~207), `names no departure the compiled cascade no longer carries` (~211), `records every emitted name the official inventory lacks` (~215), and `names no addition the compiled cascade no longer emits` (~219) compare the cascade, including keyframe names, to the guide ledger.
- `tests/setupServer.test.ts` `pins the copied inventory release and digests and reads its component vocabulary` (~573) expects `btn` keyframes `[]` and `spinner` keyframes to contain `spinner-border`. `selects shipped CSS keys independently of behavior rows` (~1185) and `partitions shipped vocabulary against written CSS` (~1232) define a shipped CSS key as selector and variable rows with status `shipped`.
- `tests/src/styles/tokens.test.ts` `declares the canonical registry and the compatibility list at the document scope` (~43) requires `:root` `--vn-*` to equal `TOKEN_NAMES` and `:root` `--bs-*` to equal `BOOTSTRAP_ROOT_VARIABLES`. `re-declares every theme-dependent name inside each mode scope` (~133) requires the dark scope's `--bs-*` list to equal `BOOTSTRAP_DARK_VARIABLES` plus `THEME_DARK_ADDITIONS`, minus `COMPONENT_DARK_ASSETS`. `resolves every value the reference map states` (~65) requires every registry name outside `UNMAPPED_TOKENS` to appear in § Tokens.
- `tests/src/styles/theme.test.ts` `resolves every role tier and the body tokens per island over nested modes` (~93) walks the registry's roles. `carries the unlanded components' dark assets…` (~135) expects `--bs-navbar-toggler-icon-bg` only in dark and every `COMPONENT_DARK_ASSETS` name empty on an element with no component rule.
- `guides/veneer.md` `### Files` (~182) lists partials through `src/styles/index.scss` and the setup modules. `_tokens.scss`, `_theme.scss`, and `_mixins.scss` are named in the paragraph after the table (~271), not as rows. § Tokens tables (~2065, ~2177) are the rows `collectReferenceRows` reads.

## Inventory, and what "as a group" can mean

`inventory.json` `components.theme` (~1408) has 15 selector records and `counts.theme` (~112876) is selectors 15, declarations 0, properties 0, keyframes 0, media 0. The records are `:root` (the light custom properties), `[data-bs-theme=light]`, `[data-bs-theme=dark]`, `:root` under `@media (prefers-reduced-motion: no-preference)` (`scroll-behavior`), `:root` with the six `--bs-breakpoint-*` properties, four dark component selectors (`.form-select`, the switch knob, `.navbar-toggler-icon`, `.accordion-button::after`), and the close-filter and carousel triples on `:root`, `[data-bs-theme=light]`, and `[data-bs-theme=dark]`. The component-level `declarations` array is empty (~2806).

`components.transition` (~47961) has seven selector records and `counts.transition` (~113177) is selectors 7, declarations 8, keyframes 0, media 0. The selectors are `.fade`, `.fade` under `prefers-reduced-motion: reduce`, `.fade:not(.show)`, `.modal.fade .modal-dialog` and its reduced-motion twin, `.modal-backdrop.fade`, and `.offcanvas-backdrop.fade`. `.collapse` is the separate key `collapse` (~48114), three selectors.

Every component object has `keyframes` and `media` arrays. The only non-empty `keyframes` arrays are `progress` (`progress-bar-stripes`), `spinner` (`spinner-border`, `spinner-grow`), and `placeholder` (`placeholder-glow`, `placeholder-wave`). Every component `media` array is empty, and every `counts.*.media` value is 0. Conditions sit on selector records as `condition`, and again as the top-level `media` array (~112833): `prefers-reduced-motion: no-preference`, five `min-width` queries (576, 768, 992, 1200, 1400), five `max-width` queries (575.98 through 1399.98), `prefers-reduced-motion: reduce`, five `max-width` and `reduce` combinations, and `print`. There is no top-level `prefers-color-scheme` or `forced-colors` entry.

The top-level `keyframes` array (~112744) repeats those five names. `root` (~111112) is 127 `--bs-*` values for the light `:root` set, including the six breakpoints. `dark` (~111241) is 61 dark overrides, including the image assets and carousel values that `_root.scss` does not emit. `references` (~111304) maps a `--bs-*` name to the properties and variables that read it. None of those three maps holds a media condition or a keyframe.

`fade` occurs as a class on `transition` selectors, not as a key.

"As a group" cannot mean a `components` entry: `keyframes` is not one, and neither is `media`. The grouping the file already has is the top-level `keyframes` array together with the three component fields that own those five names, and, for conditions, the top-level `media` array together with each selector's `condition`, while every per-key `media` field stays an empty list. `theme` and `transition` are the opposite shape: they are component keys with selector counts and empty `keyframes` and `media`.

Contradictions: the standing RTL sentence (~102) still says to keep `index.rtl.css` until D5, and the design ruling (~160) says to remove it; the preamble says the design ruling wins, and `src/` does not name that file, but `digests.bootstrap.rtl.css` is still in the inventory. D26's text still describes the caret and knob inside `$assets`; the map and the closed carriers row do not. The additions table says the `theme` key is not shipped, and the family queue assigns `theme` to this family. The queue says the `DOMContentLoaded` rows stay refused, and § Compatibility still has an accepted engine row that names `onDOMContentLoaded`.

Unresolved inputs: `guides/veneer.md` is the pre-CLOSE-GUIDE path. Whether print, whose only release SCSS site is the display utility's `print: true` loop, is closed with this family or with the utility keys is not stated beyond the queue's word "print". Whether "keyframes as a group" is closed by the three owning keys or by something with no inventory key is not stated beyond that phrase. The queue names `transition` and not `collapse`.
