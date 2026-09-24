# BARE-BUTTON (`cb`) report

The unit is complete with no deviation. The elements layer's calibrated button surface reaches only
the `button:not([class], [data-bs-target])` selector, the universal `button` rule writes the
release's reboot at the release's values, and each owned component proof reads the button form equal
to its anchor or active sibling. The shared patch applies cleanly against `a9dff19`, and the
conformance, guides, Showcase, and app runs are green with it applied in a scratch copy.

- Executor: `opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-cb`, branch `unit/cb`
  from `a9dff19`. Nothing was committed.
- Review evidence: `.orkestrel/veneer/units/cb.diff`, `.orkestrel/veneer/units/cb-status.txt`, `.orkestrel/veneer/units/cb-shared.patch`,
  `.orkestrel/veneer/units/cb-instruments/cb-mutations.log.txt`, and this report.

## Touched files

The following owned files changed.

| File | Change |
| --- | --- |
| `src/styles/elements/_button.scss` | Splits the `button` rule: the universal `button` rule writes the release's reboot values, and the `button:not([class], [data-bs-target])` rule carries the calibrated surface with its hover, active, focus-visible (with the forced-colors ring), disabled, and reduced-motion branches. The reboot's focus, role, typed-input, and enabled-cursor rules are unchanged. |
| `app/browser/styles/_shell.scss` | Selects the mode control by the `[data-control]` attribute selector instead of the `.control` class selector, and the comment states why. |
| `tests/src/styles/elements/button.test.ts` | Adds the case "leaves a classed, an empty-class, and a slide-target button to the reboot alone". |
| `tests/src/styles/components/nav.test.ts` | Adds the case "paints the disabled button link as it paints the disabled anchor link, at full opacity and in the parent type". |
| `tests/src/styles/components/dropdown.test.ts` | Adds the case "paints each button item as its anchor item, disabled on opacity and type and focused on outline and shadow". |
| `tests/src/styles/components/list-group.test.ts` | Extends "disables an item on a class and on the native attribute alike" to opacity and the middle button's corners. |
| `tests/src/styles/components/carousel.test.ts` | Adds the case "squares every pip and focuses the current and a resting pip alike, with no ring". |
| `tests/src/styles/components/close.test.ts` | Drops the comments that credited a transition to the bare button element, and adds the case "declares no transition, as the release declares none, so each state paints the moment it flips". |

The `git diff --stat` command reports `8 files changed, 267 insertions(+), 41 deletions(-)`. The
`git diff --check` command reports nothing.

## Data attribute (B4)

The showcase's mode control carries the `data-control` attribute. The name keeps the shell's
vocabulary (the class it replaces was `control`) and follows the shell's existing `data-specimen`
attribute hook. It avoids the `data-bs-*` namespace, which Veneer's engine reads as Bootstrap's data API, and it avoids
a state word such as `mode`, which the color-mode controller already uses. The `SHOWCASE_CONTROL`
constant keeps its name and holds the attribute name, so the `tests/app/browser/index.test.ts`
export list needs no change.

The class hook is measurably wrong under B1. With the owned shell rule and the unpatched
`Showcase.ts` module, the control keeps a class and takes the reboot alone. The affordance case then
reads `rgb(239, 239, 239)` in light and `rgb(107, 107, 107)` in dark for the `background-color`
property (`.orkestrel/veneer/units/cb-instruments/cb-app-unpatched.log.txt`). With the shared patch applied, the case is green.

## Emitted cascade

The following extracts are the elements layer's button rules from the built `index.css` file,
before the change (`.orkestrel/veneer/units/cb-instruments/cb-cascade-before.txt`).

```css
button{text-transform:none;-webkit-appearance:button;padding:var(--vn-space-3) var(--vn-space-6);font-family:var(--vn-font-sans);font-size:var(--vn-size-2);font-weight:var(--vn-weight-body);line-height:var(--vn-line-body);color:var(--vn-text-body-base);background-color:var(--vn-button-transparent);border-radius:var(--vn-radius-base);box-shadow:var(--vn-button-shadow);cursor:pointer;transition:color var(--vn-motion-feedback) var(--vn-ease-standard), background-color var(--vn-motion-feedback) var(--vn-ease-standard), border-color var(--vn-motion-feedback) var(--vn-ease-standard), box-shadow var(--vn-motion-feedback) var(--vn-ease-standard), opacity var(--vn-motion-feedback) var(--vn-ease-standard);border:0;margin:0}
@media (prefers-reduced-motion:reduce){button{transition:none}}
button:hover{background-color:color-mix(in srgb, var(--vn-state-mixer) var(--vn-state-hover), var(--vn-button-transparent))}
button:active{background-color:color-mix(in srgb, var(--vn-state-mixer) var(--vn-state-active), var(--vn-button-transparent))}
button:focus-visible{box-shadow:0 0 0 var(--vn-focus-width) var(--vn-focus-color);outline:none}
@media (forced-colors:active){button:focus-visible{outline:var(--vn-focus-width) solid var(--vn-button-highlight);box-shadow:var(--vn-button-shadow)}}
button:disabled{color:var(--vn-text-body-base);background-color:var(--vn-button-transparent);opacity:var(--vn-button-opacity);pointer-events:none}
button:focus:not(:focus-visible){outline:0}
[role=button]{cursor:pointer}
[type=button],[type=reset],[type=submit]{-webkit-appearance:button}
button:not(:disabled),[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled){cursor:pointer}
```

The following extract is the same set after the change (`.orkestrel/veneer/units/cb-instruments/cb-cascade-after.txt`). The
universal `button` rule carries the release's reboot declarations alone.

```css
button{font-family:inherit;font-size:inherit;line-height:inherit;text-transform:none;-webkit-appearance:button;border-radius:0;margin:0}
button:not([class],[data-bs-target]){padding:var(--vn-space-3) var(--vn-space-6);font-family:var(--vn-font-sans);font-size:var(--vn-size-2);font-weight:var(--vn-weight-body);line-height:var(--vn-line-body);color:var(--vn-text-body-base);background-color:var(--vn-button-transparent);border-radius:var(--vn-radius-base);box-shadow:var(--vn-button-shadow);cursor:pointer;transition:color var(--vn-motion-feedback) var(--vn-ease-standard), background-color var(--vn-motion-feedback) var(--vn-ease-standard), border-color var(--vn-motion-feedback) var(--vn-ease-standard), box-shadow var(--vn-motion-feedback) var(--vn-ease-standard), opacity var(--vn-motion-feedback) var(--vn-ease-standard);border:0}
@media (prefers-reduced-motion:reduce){button:not([class],[data-bs-target]){transition:none}}
button:not([class],[data-bs-target]):hover{background-color:color-mix(in srgb, var(--vn-state-mixer) var(--vn-state-hover), var(--vn-button-transparent))}
button:not([class],[data-bs-target]):active{background-color:color-mix(in srgb, var(--vn-state-mixer) var(--vn-state-active), var(--vn-button-transparent))}
button:not([class],[data-bs-target]):focus-visible{box-shadow:0 0 0 var(--vn-focus-width) var(--vn-focus-color);outline:none}
@media (forced-colors:active){button:not([class],[data-bs-target]):focus-visible{outline:var(--vn-focus-width) solid var(--vn-button-highlight);box-shadow:var(--vn-button-shadow)}}
button:not([class],[data-bs-target]):disabled{color:var(--vn-text-body-base);background-color:var(--vn-button-transparent);opacity:var(--vn-button-opacity);pointer-events:none}
button:focus:not(:focus-visible){outline:0}
[role=button]{cursor:pointer}
[type=button],[type=reset],[type=submit]{-webkit-appearance:button}
button:not(:disabled),[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled){cursor:pointer}
```

The bare rule writes the `border` property directly rather than through the `box-reset` mixin,
because that mixin also writes the `margin` property, which the universal rule owns. The
`_fieldset.scss` and `_hr.scss` partials still include the `box-reset` mixin.

## Component button forms

The following searches derived the set of shipped button forms before editing:

- `grep -o '<button[^>]*>' app/browser/constants.ts`, grouped by class, over the showcase specimens;
- `grep -n "createElement('button')\|<button" app/browser/*.ts`, which finds only the mode control
  in the `Showcase.ts` module;
- the styles, app, and conformance projects run on the unchanged tree (`cb-baseline-*.log.txt`),
  all green.

The specimen forms are the `btn` class family (including the dropdown toggles and splits), the
`btn-close` class, the `navbar-toggler` class, the `accordion-button` class in both states, the
carousel controls, the carousel indicators in both states, the disabled `dropdown-item` class, the
`list-group-item-action` class enabled and disabled, the disabled `nav-link` class, and the
classless Reboot button. The showcase carries no `button.page-link` element; the probe read one
anyway.

A throwaway probe (`.orkestrel/veneer/units/cb-instruments/cb-forms-probe.ts.txt`, run once against each cascade and then
deleted) mounted each form inside a `font: 20px/30px serif` wrapper and read the rest, hover,
keyboard-focus, and disabled values. The following table lists every property whose reading moved
(`.orkestrel/veneer/units/cb-instruments/cb-matrix.txt`, from `cb-forms-before.log.txt` and `cb-forms-after.log.txt`). Hover
moved on no form, because every component rule writes its own background.

| Form | Properties it no longer takes from the bare rule | Proof case | Mutations it distinguishes |
| --- | --- | --- | --- |
| Disabled `button.nav-link` element | `font-family`, `border-radius` (6px to 0), disabled `opacity` (0.65 to 1) | nav: "paints the disabled button link as it paints the disabled anchor link, at full opacity and in the parent type" | bare selector widened; disabled branch unscoped |
| `button.dropdown-item` element | `font-family`, `font-size` (14px to the menu's 16px), `line-height`, the transition, the keyboard ring (`box-shadow` ring to `none`, `outline-style` from `none` to `auto`), disabled `opacity` | dropdown: "paints each button item as its anchor item, disabled on opacity and type and focused on outline and shadow" | bare selector widened; `font-size: inherit` dropped; focus-visible branch unscoped; disabled branch unscoped |
| `button.list-group-item-action` element | `font-family`, `font-size`, `line-height`, `border-radius` on a middle item, the transition, the keyboard ring, disabled `opacity` | list-group: "disables an item on a class and on the native attribute alike" | bare selector widened; disabled branch unscoped |
| Carousel indicator, current and resting | `font-family`, `font-size`, `line-height`, `color`, `border-radius`, the keyboard ring | carousel: "squares every pip and focuses the current and a resting pip alike, with no ring" | bare selector widened; `[data-bs-target]` exclusion dropped; focus-visible branch unscoped |
| `.btn-close` control | `font-family`, `font-size`, `line-height` (its `em` box follows the parent's size), the transition | close: "declares no transition, as the release declares none, so each state paints the moment it flips"; close geometry case | bare selector widened; `font-size: inherit` dropped (reddens the geometry case) |
| `.carousel-control-prev` and `.carousel-control-next` controls | `font-family`, `font-size`, `line-height`, `border-radius`, the keyboard ring, disabled `pointer-events` | elements: "leaves a classed, an empty-class, and a slide-target button to the reboot alone" (the same class boundary) | bare selector widened; each state branch unscoped |
| `.navbar-toggler` control | `font-family`, disabled `opacity` and `pointer-events` | elements case, as for the carousel controls | as for the carousel controls |
| `.accordion-button` control, both states | `font-family`, `line-height` (24px to the heading's 19.2px, the release's inheritance), disabled `opacity` and `pointer-events` | elements case, as for the carousel controls | as for the carousel controls |
| `button.page-link` element (not in the showcase) | `font-family`, `line-height`, `border-radius`, disabled `opacity` and `pointer-events` | elements case, as for the carousel controls | as for the carousel controls |
| `.btn` family | Nothing moved | existing Button proofs, green | none |
| Classless Reboot button | Nothing moved | existing elements case "resolves the calibrated geometry and interaction paint" | active branch unscoped reddens it as well |

No form lost a declaration its release rule writes: every moved value is a Veneer addition the bare
rule had supplied, and each form reads the release's inheritance after the change.

## Failing-first run

The added and extended cases were written first and run against the unchanged partial with the
unchanged built cascade (`cmp` confirmed `dist/src/styles/index.css` equal to the baseline copy).

- Command: `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/elements/button.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/carousel.test.ts tests/src/styles/components/close.test.ts`
- Red, before the fix: exit 1, `Tests  6 failed | 153 passed (159)` (`.orkestrel/veneer/units/cb-instruments/cb-red.log.txt`).
- Green, after the fix and `npm run build:src`: exit 0, `Tests  159 passed (159)`
  (`.orkestrel/veneer/units/cb-instruments/cb-green.log.txt`).

The failing cases, each for the reason it names, were:

- `button.test.ts` "leaves a classed, an empty-class, and a slide-target button to the reboot alone":
  the hooked button read the calibrated values;
- `nav.test.ts` "paints the disabled button link as it paints the disabled anchor link, at full
  opacity and in the parent type": opacity `0.65` against `1`;
- `dropdown.test.ts` "paints each button item as its anchor item, disabled on opacity and type and
  focused on outline and shadow": opacity `0.65` against `1`;
- `list-group.test.ts` "disables an item on a class and on the native attribute alike": opacity
  `0.65` against `1`;
- `carousel.test.ts` "squares every pip and focuses the current and a resting pip alike, with no
  ring": corner radius `6` against `0`;
- `close.test.ts` "declares no transition, as the release declares none, so each state paints the
  moment it flips": `transition-property` read the bare list against `all`.

## Mutation log

The `.orkestrel/veneer/units/cb-instruments/cb-mutate.sh` script ran every mutation from a saved copy of the fixed partial,
rebuilt the styles, ran the owned-proof command that § Failing-first run names, and restored the
partial byte for byte.
The restored build's cascade equals `.orkestrel/veneer/units/cb-instruments/cb-after-index.css` (`cmp` reported no difference).
The full log, with each diff, is `.orkestrel/veneer/units/cb-instruments/cb-mutations.log.txt`.

| Mutation | Build exit | Test exit | Summary | Failing cases |
| --- | --- | --- | --- | --- |
| Bare selector widened back to `button` | 0 | 1 | `Tests  6 failed \| 153 passed (159)` | every added or extended case: elements, nav, dropdown, list-group, carousel, close |
| `font-size: inherit` dropped from the universal rule | 0 | 1 | `Tests  3 failed \| 156 passed (159)` | elements reboot case; dropdown button-item case; close "resolves the recorded content box, inset, and mark" |
| `[data-bs-target]` exclusion dropped | 0 | 1 | `Tests  2 failed \| 157 passed (159)` | elements reboot case; carousel pip case |
| Hover branch left unscoped (`@at-root button:hover`) | 0 | 1 | `Tests  1 failed \| 158 passed (159)` | elements reboot case |
| Active branch left unscoped | 0 | 1 | `Tests  3 failed \| 156 passed (159)` | elements reboot case; the existing bare case in light and dark mode, because the unscoped active rule loses to the scoped hover rule |
| Focus-visible branch left unscoped | 0 | 1 | `Tests  3 failed \| 156 passed (159)` | elements reboot case; dropdown button-item case; carousel pip case |
| Disabled branch left unscoped | 0 | 1 | `Tests  4 failed \| 155 passed (159)` | elements reboot case; dropdown button-item case; list-group disabled case; nav disabled-link case |
| Shell hook left on the class (shared patch withheld) | n/a | 1 | `Tests  1 failed \| 148 passed (149)` | `Showcase.test.ts` "paints one affordance on the mode control in both modes" |

## Gates

Worktree gates, run in `/home/user/veneer-cb` with the npm 11 `PATH` entry and
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`:

| Command | Exit | Result line |
| --- | --- | --- |
| `npm run format:check` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | No diagnostic printed (`oxlint --config .oxlintrc.json --deny-warnings .`). |
| `npm run check` | 0 | Every `tsc` and `vue-tsc` step exited 0. |
| `npm run build:src` | 0 | `dist/src/styles/index.css  220.53 kB │ gzip: 28.23 kB` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/elements/button.test.ts tests/src/styles/components/nav.test.ts tests/src/styles/components/dropdown.test.ts tests/src/styles/components/list-group.test.ts tests/src/styles/components/carousel.test.ts tests/src/styles/components/close.test.ts` | 0 | `Tests  159 passed (159)` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot` (whole styles project) | 0 | `Tests  1233 passed (1233)` (`cb-styles-full.log.txt`; baseline `Tests  1228 passed (1228)`) |

The whole styles project ran before a type-only lint correction to the carousel and dropdown cases
(`{ … }[]` to `Array<{ … }>`); the owned-proof run in the preceding table followed that correction.

Scratch-copy gates, run in `tmp/probe/cb-copy` (a `git archive a9dff19` extract plus the owned
changes, the shared patch, and a copied `node_modules` directory) and then removed. The logs are
retained as `.orkestrel/veneer/units/cb-instruments/cb-scratch-*.log.txt`.

| Command | Exit | Result line |
| --- | --- | --- |
| `npm run build:src` | 0 | build completed |
| `npm run test:conformance` | 0 | `Tests  22 passed (22)` |
| `npm run test:guides` | 0 | `Tests  19 passed (19)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/Showcase.test.ts` | 0 | `Tests  4 passed (4)` |
| `npm run test:app` | 0 | `Tests  149 passed (149)` |
| `npm run test:policy` | 0 | `Tests  109 passed \| 1 skipped (110)` |
| `npm run check` | 0 | Every step exited 0. |
| `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md app/browser/constants.ts app/browser/Showcase.ts app/browser/styles/_shell.scss tests/app/browser/Showcase.test.ts tests/app/browser/integration.test.ts tests/conformance.test.ts` | 0 | `All matched files use the correct format.` |
| `npx oxlint --config .oxlintrc.json --deny-warnings app/browser/constants.ts app/browser/Showcase.ts tests/app/browser/Showcase.test.ts tests/app/browser/integration.test.ts tests/conformance.test.ts` | 0 | No diagnostic printed. |

## Ledger and additions rows as the gate printed them

Without the shared patch, `npm run test:conformance` exits 1 (`.orkestrel/veneer/units/cb-instruments/cb-conformance-unpatched.log.txt`).
The "names no departure the compiled cascade no longer carries" case printed these stale rows:

```text
reboot | button | border-radius | — | 0 | var(--vn-radius-base) | tokenized
reboot | button | font-family | — | inherit | var(--vn-font-sans) | tokenized
reboot | button | font-size | — | inherit | var(--vn-size-2) | tokenized
reboot | button | line-height | — | inherit | var(--vn-line-body) | tokenized
```

The "records every emitted name the official inventory lacks" case printed these unrecorded rows:

```text
reboot | button:not([class], [data-bs-target]) | — | selector
reboot | button:not([class], [data-bs-target]) | @media (prefers-reduced-motion: reduce) | selector
reboot | button:not([class], [data-bs-target]):hover | — | selector
reboot | button:not([class], [data-bs-target]):active | — | selector
reboot | button:not([class], [data-bs-target]):focus-visible | — | selector
reboot | button:not([class], [data-bs-target]):focus-visible | @media (forced-colors: active) | selector
reboot | button:not([class], [data-bs-target]):disabled | — | selector
```

The "names no addition the compiled cascade no longer emits" case printed these stale rows:

```text
reboot | button { padding } | — | declaration
reboot | button { font-weight } | — | declaration
reboot | button { color } | — | declaration
reboot | button { background-color } | — | declaration
reboot | button { border } | — | declaration
reboot | button { box-shadow } | — | declaration
reboot | button { cursor } | — | declaration
reboot | button { transition } | — | declaration
reboot | button { transition } | @media (prefers-reduced-motion: reduce) | declaration
reboot | button:hover | — | selector
reboot | button:active | — | selector
reboot | button:focus-visible | — | selector
reboot | button:focus-visible | @media (forced-colors: active) | selector
reboot | button:disabled | — | selector
```

The planted-literal case and the forced-colors grouping case failed on the same rows and on the
`button:focus-visible @media (forced-colors: active)` literal. With the patch, every conformance case
is green and `LAYER_COMPONENTS` needed no change.

## Shared patch

`.orkestrel/veneer/units/cb-shared.patch` is one unified diff against `a9dff19`; `git apply --check` accepts it
in the worktree. It touches no file outside the brief's shared list.

- `guides/veneer.md`:
  - rewrites the § Files row for the `_button.scss` partial;
  - adds a § Styles paragraph after the elements-layer paragraph, stating the scope, the reboot a
    classed button keeps, why the `data-bs-target` attribute is excluded, the `btn` class advice,
    and a link to the elements proof;
  - adds a § Tailwind paragraph after the order-line paragraph, pointing a utility-classed button
    back to § Styles;
  - states the `data-control` attribute hook in § Showcase;
  - drops the `#### reboot` departure rows the gate printed as stale;
  - replaces the `### Additions` button rows with the rows the gate printed as unrecorded, each
    Reason naming "a button no class claims".
- `tests/conformance.test.ts`: the forced-colors key literal follows the compiled selector, in the
  expected-keys list and in the declaration-order loop.
- `app/browser/constants.ts`: the `SHOWCASE_CONTROL` constant holds `'data-control'`, and its doc
  block names an attribute.
- `app/browser/Showcase.ts`: the control takes `setAttribute(SHOWCASE_CONTROL, '')` in place of the
  `className` assignment.
- `tests/app/browser/Showcase.test.ts`: the mounting case's comment names the attribute.
- `tests/app/browser/integration.test.ts`: drops the close-capture comment that credited an opacity
  transition to the bare button element.

The `tests/app/browser/index.test.ts`, `tests/setupStyles.ts`, and `tests/setupStyles.test.ts`
files need no change: the constant's name stands, and no case table was added. The added cases read
named subjects rather than a population, so no setup table was needed.

## Deviation state

No stop. The unit settled these ancillary choices under the deviation contract:

- the `data-control` attribute name, for the reasons in § Data attribute (B4);
- the case titles, and each added case placed beside the existing case that reads the same form
  (the dropdown case before the layout case, the nav case before the hover case, the carousel case
  after the pip layout case, the close case before the forced-colors case);
- the close proof keeps its `waitForAnimations` calls, which are harmless without a transition, and
  drops only the comments that credited the bare element.

## Observations for the Orchestrator

- Land `cb-shared.patch` with the owned change. Without it, the conformance project fails its ledger
  cases and the app project fails the Showcase affordance case, as the preceding sections record.
- The published cascade changes for any classed or utility-classed button, which takes the reboot
  alone. The commit message owes that statement (B3).
- The whole suite, `npm run test:service` (which covers the preflight pairing's `button` row), the
  journey, and `CAPTURE=1` were not run; they are the Orchestrator's runs at landing.
- An earlier scratch copy linked `node_modules` instead of copying it, and the Vite
  package-root guard refused it. That attempt ran Vite through the link, so Vite wrote its config
  timestamp file under the worktree's `node_modules/.vite-temp` cache directory. The copy was then rebuilt with a real `node_modules` directory; the evidence rests on
  that run.
- Every instrument and extract sits under `tmp/units/` with the `cb` prefix; `tmp/probe/` was
  created by this unit and removed. Nothing was written to the session scratchpad or the system
  temporary directory.
