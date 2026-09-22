# Veneer

> Elements' look and motion on Bootstrap 5.3 contracts, with an owned engine and standalone CSS.

## Surface

The core entry publishes the token registry and the types that read it. The browser entry
publishes the color-mode controller. The token values those names carry are in § Tokens.

| Name                   | Kind      | Summary                                                                                                                              |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `TOKEN_NAMES`          | const     | Names every canonical custom property the shipped cascade declares, grouped by the surface each one paints or the scale it controls. |
| `TokenLeaf`            | type      | Reduces a group of custom-property names to the union of the names at its leaves.                                                    |
| `TokenMap`             | type      | Describes the grouped tree of custom-property names the token registry carries.                                                      |
| `TokenName`            | type      | Names one canonical custom property the shipped cascade declares.                                                                    |
| `ColorModeState`       | type      | Names the color modes Bootstrap's color-mode attribute accepts.                                                                      |
| `ColorModeOptions`     | interface | Configures the root and optional persistence of a color-mode controller.                                                             |
| `ColorModeInterface`   | interface | Controls the color-mode attribute on one root element.                                                                               |
| `ColorMode`            | class     | Applies and optionally restores a root's color mode without registering listeners.                                                   |
| `isColorModeState`     | function  | Checks whether a value names a supported color mode.                                                                                 |
| `COLOR_MODE_ATTRIBUTE` | const     | Names the Bootstrap color-mode attribute.                                                                                            |
| `COLOR_MODE_KEY`       | const     | Names the storage key for the chosen color mode.                                                                                     |
| `AppError`             | class     | Describes a programmer error with a machine-readable code and optional context.                                                      |
| `isAppError`           | function  | Checks whether a value belongs to the application's error class.                                                                     |
| `BUTTON_ACTIVE`        | const     | Names the class that carries a button's pressed state.                                                                               |
| `BUTTON_SELECTOR`      | const     | Selects hosts activated by delegated button clicks.                                                                                  |
| `BUTTON_TOGGLE`        | const     | Names the bubbling event dispatched after a button toggles.                                                                          |
| `Button`               | class     | Toggles a host's pressed state and restores its original state on destruction.                                                       |
| `ButtonDetail`         | interface | Describes the pressed state after a button toggles.                                                                                  |
| `ButtonEventMap`       | interface | Maps a button's completed toggle to its DOM event.                                                                                   |
| `ButtonHooks`          | interface | Configures the initial DOM event subscriptions for a button.                                                                         |
| `ButtonInterface`      | interface | Controls the pressed class and accessibility attribute on a host.                                                                    |
| `ButtonOptions`        | interface | Configures a button's initial event hooks.                                                                                           |
| `Delegate`             | class     | Activates data-attribute button hosts through a root's delegated click listener.                                                     |
| `DelegateInterface`    | interface | Owns delegated activation and the button engines it constructs.                                                                      |
| `DelegateOptions`      | interface | Configures the root for delegated button activation.                                                                                 |
| `bindEventMap`         | function  | Binds button hooks to their DOM wire events until the signal aborts.                                                                 |
| `emitEvent`            | function  | Dispatches a bubbling, non-cancelable DOM event carrying the supplied detail.                                                        |
| `isButtonEvent`        | function  | Checks whether a DOM event carries a boolean pressed state.                                                                          |
| `isButtonHost`         | function  | Checks whether a value is an HTML host in the current browser realm.                                                                 |

The controller reads its mode from the root on every access. A `dark` attribute selects dark mode;
every other value selects light mode. Applying light mode removes the attribute. Construction
restores a valid stored mode when you supply storage, and otherwise leaves the root unchanged.
Storage operations use the supplied browser storage directly and propagate its errors.

## Methods

The interface exposes the following lifecycle operations.

#### `ColorModeInterface`

| Method    | Summary                                                     |
| --------- | ----------------------------------------------------------- |
| `apply`   | Writes the mode to the root and to storage when configured. |
| `toggle`  | Flips the mode and returns the applied mode.                |
| `destroy` | Removes the attribute only when this controller wrote it.   |

#### `ButtonInterface`

| Method    | Summary                                                                            |
| --------- | ---------------------------------------------------------------------------------- |
| `toggle`  | Toggles the live host, or returns its state without writing after destruction.     |
| `destroy` | Releases hooks and restores the original active membership and aria-pressed value. |

#### `DelegateInterface`

| Method    | Summary                                                             |
| --------- | ------------------------------------------------------------------- |
| `destroy` | Releases the click listener and destroys every owned button engine. |

## Examples

Construct a controller on the document root, select a mode, toggle it, and release its attribute.

```ts
import { ColorMode } from '@orkestrel/veneer/browser'

const controller = new ColorMode()
controller.apply('light')
controller.toggle()
controller.destroy()
```

Supply a particular root and a storage, so construction restores the mode already stored there.

```ts
import { ColorMode } from '@orkestrel/veneer/browser'

const controller = new ColorMode({ root: document.documentElement, storage: sessionStorage })
controller.apply('dark')
controller.destroy()
```

Check an external value before passing it to the controller.

```ts
import { isColorModeState } from '@orkestrel/veneer/browser'

isColorModeState('dark') // true
isColorModeState('auto') // false
```

## Styles

Veneer publishes its cascade through a standalone stylesheet subpath, `./styles`. The
`build:src:styles` script compiles the `src/styles/index.scss` barrel to the
`dist/src/styles/index.css` stylesheet, and the manifest's `exports` map names that file under the
subpath. The manifest lists the `**/*.css` pattern in its `sideEffects` field, so a bundler keeps
an import of that subpath rather than dropping it as unused.

Load the cascade from your entry module, ahead of the rules of your own that override it.

```ts
import '@orkestrel/veneer/styles'
```

The specifier resolves to standalone CSS rather than to a JavaScript module, so the import carries a
stylesheet and declares no binding. A consumer with no bundler resolves the same subpath and serves
the resolved file with a `<link>` element instead.

### Files

The following files carry the axis.

| File                                    | Role                                                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `src/styles/elements/_button.scss`      | The bare button and its same-element states in the elements layer.                               |
| `src/styles/components/_button.scss`    | The Button class vocabulary and state relationships in the components layer.                     |
| `src/styles/components/_type.scss`      | The heading, display, lead, small, mark, and initialism classes in the components layer.         |
| `src/styles/components/_list.scss`      | The unstyled and inline list classes in the components layer.                                    |
| `src/styles/components/_quote.scss`     | The quotation class, its last-child rule, and its footer in the components layer.                |
| `src/styles/components/_link.scss`      | The link color, opacity, offset, and underline classes in the components layer.                  |
| `src/styles/components/_container.scss` | The container family, its breakpoint caps, and navigation combinators in the components layer.   |
| `src/styles/components/_grid.scss`      | The row, column, and offset families and their gutters in the components layer.                  |
| `src/styles/components/_table.scss`     | The table classes, state layers, caption class, and responsive wrappers in the components layer. |
| `src/styles/components/_image.scss`     | The image and figure classes in the components layer.                                            |
| `src/styles/components/_icon-link.scss` | The icon link, its icon combinator, and its hover and focus shifts in the components layer.      |
| `src/styles/components/_ratio.scss`     | The aspect-ratio box, its pseudo-element, and the named aspects in the components layer.         |
| `src/styles/components/_vr.scss`        | The vertical rule in the components layer.                                                       |
| `src/styles/_reset.scss`                | The universal box model, hidden state, and motion-aware root scrolling in the reset layer.       |
| `src/styles/elements/_html.scss`        | The document baseline in the elements layer.                                                     |
| `src/styles/elements/_body.scss`        | The body baseline in the elements layer.                                                         |
| `src/styles/elements/_heading.scss`     | The heading family text treatment in the elements layer.                                         |
| `src/styles/elements/_p.scss`           | The p text treatment in the elements layer.                                                      |
| `src/styles/elements/_hr.scss`          | The hr text treatment in the elements layer.                                                     |
| `src/styles/elements/_a.scss`           | The a text treatment in the elements layer.                                                      |
| `src/styles/elements/_ul.scss`          | The ul text treatment in the elements layer.                                                     |
| `src/styles/elements/_ol.scss`          | The ol text treatment in the elements layer.                                                     |
| `src/styles/elements/_dl.scss`          | The dl text treatment in the elements layer.                                                     |
| `src/styles/elements/_blockquote.scss`  | The blockquote text treatment in the elements layer.                                             |
| `src/styles/elements/_address.scss`     | The address text treatment in the elements layer.                                                |
| `src/styles/elements/_abbr.scss`        | The abbr text treatment in the elements layer.                                                   |
| `src/styles/elements/_strong.scss`      | The strong text treatment in the elements layer.                                                 |
| `src/styles/elements/_small.scss`       | The small text treatment in the elements layer.                                                  |
| `src/styles/elements/_mark.scss`        | The mark text treatment in the elements layer.                                                   |
| `src/styles/elements/_sub.scss`         | The sub text treatment in the elements layer.                                                    |
| `src/styles/elements/_sup.scss`         | The sup text treatment in the elements layer.                                                    |
| `src/styles/elements/_code.scss`        | The code text treatment in the elements layer.                                                   |
| `src/styles/elements/_pre.scss`         | The pre text treatment in the elements layer.                                                    |
| `src/styles/elements/_kbd.scss`         | The kbd text treatment in the elements layer.                                                    |
| `src/styles/elements/_samp.scss`        | The samp text treatment in the elements layer.                                                   |
| `src/styles/elements/_var.scss`         | The var text treatment in the elements layer.                                                    |
| `src/styles/elements/_b.scss`           | The b family and its mandated pairs in the elements layer.                                       |
| `src/styles/elements/_figure.scss`      | The figure family and its mandated pairs in the elements layer.                                  |
| `src/styles/elements/_img.scss`         | The img family and its mandated pairs in the elements layer.                                     |
| `src/styles/elements/_svg.scss`         | The svg family and its mandated pairs in the elements layer.                                     |
| `src/styles/elements/_table.scss`       | The table family and its mandated pairs in the elements layer.                                   |
| `src/styles/elements/_tr.scss`          | The tr family and its mandated pairs in the elements layer.                                      |
| `src/styles/elements/_label.scss`       | The label family and its mandated pairs in the elements layer.                                   |
| `src/styles/elements/_input.scss`       | The input family and its mandated pairs in the elements layer.                                   |
| `src/styles/elements/_select.scss`      | The select family and its mandated pairs in the elements layer.                                  |
| `src/styles/elements/_optgroup.scss`    | The optgroup family and its mandated pairs in the elements layer.                                |
| `src/styles/elements/_textarea.scss`    | The textarea family and its mandated pairs in the elements layer.                                |
| `src/styles/elements/_fieldset.scss`    | The fieldset family and its mandated pairs in the elements layer.                                |
| `src/styles/elements/_output.scss`      | The output family and its mandated pairs in the elements layer.                                  |
| `src/styles/elements/_iframe.scss`      | The iframe family and its mandated pairs in the elements layer.                                  |
| `src/styles/elements/_details.scss`     | The details family and its mandated pairs in the elements layer.                                 |
| `src/styles/elements/_progress.scss`    | The progress family and its mandated pairs in the elements layer.                                |
| `src/styles/utilities/_gap.scss`        | The gutter and row-gap step utilities in the utilities layer.                                    |
| `src/styles/index.scss`                 | The compilation barrel.                                                                          |
| `src/styles/index.ts`                   | The side-effect entry, and the build's library entry.                                            |
| `configs/src/vite.styles.config.ts`     | The build and test wrapper, composed from the root's `srcBrowser` factory.                       |
| `configs/src/tsconfig.styles.json`      | The check-only TypeScript project.                                                               |
| `tests/setupStyles.ts`                  | The shared setup module the styles proofs read.                                                  |
| `tests/src/styles/`                     | The browser proofs of the shipped cascade.                                                       |

The barrel's `@use` rules name the `_tokens.scss` and `_theme.scss` partials and the element
partials under the `elements/`, `components/`, and `utilities/` directories; the `_mixins.scss` partial reaches the build through the
token and theme partials rather than through the barrel. The entry imports the `./index.scss`
barrel and nothing else, and the JavaScript wrapper the build emits from it stays unexported,
because the `./styles` subpath names the stylesheet.

The wrapper replaces the plugins, the output directory, the library entry, the build options
(keeping the root's build-log handler and dropping the browser externals and output paths), and the
test fields it inherits, and it declares the `src:styles` project. The check-only project extends
the root `tsconfig.json` file, narrows the `lib` option to the `ESNext` value and the `types`
option to the `vite/client` value over the `src/styles/**/*.ts` sources, and emits nothing.
The setup module carries the direction scanners, the shadow readers, and the Bootstrap
compatibility oracle's retained values, and it imports no stylesheet of its own: the styles project
loads the built cascade through its `setupFiles` array instead. Each partial has one proof of the
same name under the `tests/src/styles/` directory, and `tests/src/styles/integration.test.ts`
reads the customization recipe beside them. § Tests links the cascade-wide proofs, the document
and body baselines, the class proofs, and the gutter utilities; each remaining tag proof sits
beside its element partial.

### Scripts

Each script names the styles target alone, and the `src` chain it belongs to runs it after the core
and browser targets.

| Script             | Contract                                                                                            | Chained from                                                                       |
| ------------------ | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `build:src:styles` | Builds the `dist/src/styles` directory from the `configs/src/vite.styles.config.ts` wrapper.        | The `build:src` chain, after the `build:src:core` and `build:src:browser` scripts. |
| `check:src:styles` | Typechecks the `src/styles/**/*.ts` sources against the `configs/src/tsconfig.styles.json` project. | The `check:src` chain, after the `check:src:core` and `check:src:browser` scripts. |
| `test:src:styles`  | Builds the cascade, then runs the `src:styles` project.                                             | The `test:src` chain, after the root's `src:core` and `src:browser` projects.      |

The `test:src:styles` script builds first because the proof's subject is the compiled cascade: the
project loads the `dist/src/styles/index.css` file through its `setupFiles` array, and a case
reading that file reads the rules the browser resolved from it rather than the declarations the
SCSS sources carry. The mixin proofs compile their own fixture partial,
`tests/src/styles/fixtures/mixins.scss`, and the token proofs also drive declarations the case
writes.

### Table classes

The table key ships whole, including compact cells, bordered and borderless cells, row and column
stripes, active and hover states, contextual colors, the group divider, the caption class, and
responsive wrappers. The component partial loads after the grid in the components layer.

Cells resolve state color before stripe color before base color. Their inset shadow resolves state
background before stripe background before accent background; the base background paints underneath.
The stripe alias reads the existing `--vn-state-stripe` percentage. Active and hover retain the
recorded 10% and 7.5% accents; Button's 22% and 12% percentages do not change table states.

Contextual table backgrounds tint the canonical role fill with white at 20%, except light and dark,
which use their canonical fills directly. Borders mix the text into that background at 20%; stripe,
active, and hover mixes use 5%, 10%, and 7.5%. This is a recorded color departure: the canonical
palette retunes Bootstrap's fixed contextual colors, and runtime mixes retain fractional channels
instead of rounding them to hexadecimal bytes. The state slots and their precedence are retained.
The class restores inherited cell alignment and border color over the bare-cell treatment: header
cells resolve bottom, body cells resolve top, and cell borders receive the table's contextual color.
Class padding overrides the bare cell's density spacing.

Responsive wrappers use logical inline overflow and the downward breakpoint mixin. Their overflow
scrolls below the named boundary and is absent at and above it. The unconditional wrapper scrolls
at every viewport. The vocabulary proof compares Bootstrap's `max-width: (N - 0.02)px` boundary
with Veneer's `width < Npx` form by adding 0.02 to the recorded boundary.

### Helper classes

The helper keys ship whole, each in its own partial after the table in the components layer: the
icon link with its icon combinator and its hover and focus shifts, the aspect-ratio box with its
named aspects, and the vertical rule.

The icon link lays its content out as an inline flex row, tints its underline from `--vn-link-rgb`
at the `--bs-link-opacity` a consumer sets, and offsets that underline by `0.25em`. Its icon
combinator sizes the icon to `1em` on each axis, fills it from the current color, and transitions its
transform. The `.icon-link-hover` class is what arms the shift: hover and keyboard focus each move
the icon by `--bs-icon-link-transform`, and the resting `.icon-link` class alone moves nothing.

The combinator names `.bi`, which is Bootstrap Icons' class. Veneer declares no rule for that class
and no rule selects it alone, so the combinator matches nothing until a consumer brings the icon
markup. This is the ruling the container's navigation combinators already carry: the declarations are
self-contained on the element Veneer owns.

The aspect-ratio box holds its own proportion through a pseudo-element whose block-start padding is a
percentage, which resolves against the containing block's inline size. Each named aspect declares
`--bs-aspect-ratio` as its own height over its width, so the name is the whole declaration of the
value and a consumer setting the property directly retunes any box. Sass emits ten decimal places,
which is the precision this family's official values carry; `_grid.scss` rounds its column
percentages to eight instead, because the official arithmetic rounds there. The build then shortens
every percentage to six significant digits, the shipped column widths included, so the widest aspect
ships as `42.8571%` where the source declares `42.8571428571%`.

The vertical rule reads `--bs-border-width` for its inline size, stretches to its flex line, holds a
`1em` floor, and paints the current color at a literal `0.25` opacity. The alias `_tokens.scss`
declares over `--vn-border-width` is what carries a retune of either name into the rule. The opacity
stays a literal because no published scale retunes it, which is the treatment the `hr` rule gives its
own opacity.

`tests/src/styles/components/icon-link.test.ts`, `tests/src/styles/components/ratio.test.ts`, and
`tests/src/styles/components/vr.test.ts` read each resolved treatment in the browser. The icon link's
reduced-motion collapse is read under the staged preference, and the declaration the rule carries
under that condition is read from the built cascade beside it.

These are the keys' recorded departures.

- **The prefixed backface property is absent.** The official cascade carries
  `-webkit-backface-visibility` beside `backface-visibility`; the build's targets emit the standard
  property alone. The prefixed `-webkit-text-decoration-color` alias is not a departure: the build
  emits it from the standard property without the source declaring it.
- **The icon's transition reads Veneer's motion tokens.** The official value is `0.2s ease-in-out`;
  Veneer writes `var(--vn-motion-feedback) var(--vn-ease-standard)`, which resolves to `0.15s ease`
  and rescales with `--vn-factor-motion`, as `.btn` does. A transition written outside those tokens
  would ignore the motion factor the package publishes.
- **The shift's inline direction is physical.** `translate3d(0.25em, 0, 0)` carries an inline
  direction no logical property replaces, and one byte stream serves either writing direction, so
  the icon shifts the same way under each. Bootstrap's own right-to-left sheet flips it.
  The direction scanner's ruled families exclude transforms, so this is recorded here rather than
  reported there.

### Deferred selectors

Each row names an official selector or custom property withheld from the built cascade, its reason,
and the owning unit that deletes the row when it ships the name, or the terminal owner `Excluded` for a name no unit will ship and that must remain absent from the cascade.
`readDeferrals` in `tests/setupConformance.ts` reads the `Name`, `Owner`, and `Reason` columns, and
the conformance proof refuses a deferred name it finds in the built cascade. That reader is why this
table carries an owner and a reason where the `Name` and `Waiting on` table under § Tokens carries
neither.

| Name                                                                | Owner      | Reason                                                                                                                                                                                                          |
| ------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ol ol`                                                             | Excluded   | Nested list treatment infers styling from tag composition.                                                                                                                                                      |
| `ul ul`                                                             | Excluded   | Nested list treatment infers styling from tag composition.                                                                                                                                                      |
| `ol ul`                                                             | Excluded   | Nested list treatment infers styling from tag composition.                                                                                                                                                      |
| `ul ol`                                                             | Excluded   | Nested list treatment infers styling from tag composition.                                                                                                                                                      |
| `pre code`                                                          | Excluded   | Contextual code treatment infers styling from tag composition.                                                                                                                                                  |
| `a > code`                                                          | Excluded   | Contextual code treatment infers styling from tag composition.                                                                                                                                                  |
| `kbd kbd`                                                           | Excluded   | Nested keyboard treatment infers styling from tag composition.                                                                                                                                                  |
| `legend + *`                                                        | Excluded   | Sibling clearing infers layout from adjacency to a legend.                                                                                                                                                      |
| `::-moz-focus-inner`                                                | Excluded   | This Gecko-only pseudo-element is unreachable on the managed Chromium and Edge receipts.                                                                                                                        |
| `::-webkit-file-upload-button`                                      | Excluded   | The standard `::file-selector-button` ships the same control part. The build's targets make the prefixed alias redundant and remove it from the cascade; its authored rule is omitted to preserve that absence. |
| `.input-group .btn`                                                 | Forms      | The owning component supplies this relationship.                                                                                                                                                                |
| `.input-group .btn:focus`                                           | Forms      | The owning component supplies this relationship.                                                                                                                                                                |
| `.input-group-lg > .btn`                                            | Forms      | The owning component supplies this relationship.                                                                                                                                                                |
| `.input-group-sm > .btn`                                            | Forms      | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group`                                                        | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical`                                               | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn`                                                 | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn`                                        | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn-check:checked + .btn`                            | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn-check:focus + .btn`                              | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn:hover`                                           | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn:focus`                                           | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn:active`                                          | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn.active`                                          | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn-check:checked + .btn`                   | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn-check:focus + .btn`                     | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn:hover`                                  | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn:focus`                                  | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn:active`                                 | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn.active`                                 | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-toolbar`                                                      | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-toolbar .input-group`                                         | Forms      | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > :not(.btn-check:first-child) + .btn`                  | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn-group:not(:first-child)`                         | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn:not(:last-child):not(.dropdown-toggle)`          | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn.dropdown-toggle-split:first-child`               | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn-group:not(:last-child) > .btn`                   | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn:nth-child(n+3)`                                  | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > :not(.btn-check) + .btn`                              | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group > .btn-group:not(:first-child) > .btn`                  | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-sm + .dropdown-toggle-split`                                  | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-sm > .btn + .dropdown-toggle-split`                     | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-lg + .dropdown-toggle-split`                                  | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-lg > .btn + .dropdown-toggle-split`                     | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn-group`                                  | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn:not(:first-child)`                      | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn-group:not(:first-child)`                | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle)` | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn-group:not(:last-child) > .btn`          | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn:nth-child(n+3)`                         | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > :not(.btn-check) + .btn`                     | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-group-vertical > .btn-group:not(:first-child) > .btn`         | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn .badge`                                                       | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.alert-dismissible .btn-close`                                     | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-close`                                                        | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-close:hover`                                                  | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-close:focus`                                                  | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-close:disabled`                                               | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-close.disabled`                                               | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.btn-close-white`                                                  | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `.toast-header .btn-close`                                          | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
| `.modal-header .btn-close`                                          | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
| `.offcanvas-header .btn-close`                                      | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
| `.placeholder.btn::before`                                          | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
| `--bs-btn-close-color`                                              | Passive    | Close button supplies this property.                                                                                                                                                                            |
| `--bs-btn-close-bg`                                                 | Passive    | Close button supplies this property.                                                                                                                                                                            |
| `--bs-btn-close-opacity`                                            | Passive    | Close button supplies this property.                                                                                                                                                                            |
| `--bs-btn-close-hover-opacity`                                      | Passive    | Close button supplies this property.                                                                                                                                                                            |
| `--bs-btn-close-focus-shadow`                                       | Passive    | Close button supplies this property.                                                                                                                                                                            |
| `--bs-btn-close-focus-opacity`                                      | Passive    | Close button supplies this property.                                                                                                                                                                            |
| `--bs-btn-close-disabled-opacity`                                   | Passive    | Close button supplies this property.                                                                                                                                                                            |
| `.col-form-label`                                                   | Forms      | Form-label typography belongs to Forms; the col inventory key is its only record.                                                                                                                               |
| `.col-form-label-lg`                                                | Forms      | Form-label typography belongs to Forms; the col inventory key is its only record.                                                                                                                               |
| `.col-form-label-sm`                                                | Forms      | Form-label typography belongs to Forms; the col inventory key is its only record.                                                                                                                               |

### Departures from the workspace rows

The `.claude/rules/workspace.md` rule file carries a row for the styles axis in each table it keys
by environment: a `src/styles/` row in the environment table, a `@src/styles` row in the alias
table, and the matching rows of its build-output, test-project, and scoped-check tables. Veneer's
pilot departs from those rows as follows, and each departure names its cause.

- **No `@src/styles` alias.** The root `tsconfig.json` file is the package's own content, so the
  alias could sit there; the lint allowlist is what forecloses it. The
  `import/no-unassigned-import` rule permits an unassigned import only for a stylesheet suffix, and
  an alias carries none. The showcase shell imports the barrel through its
  `../../src/styles/index.scss` relative path instead, and a generator that emits the alias widens
  that allowlist in the same release.
- **The wrapper composes the root's browser factory.** The root `vite.config.ts` file declares no
  styles factory to compose, so the `configs/src/vite.styles.config.ts` wrapper spreads the
  `srcBrowser` factory and replaces the differing fields by assignment. The root's `mergeOverride`
  helper is not that mechanism: it keeps a base plugin no override names, so the
  `environmentBoundary('src/browser')` plugin would stay on a styles build, and it concatenates
  every other array, so the include list and the setup files would double.
- **No environment boundary and no lint fence owns the `src/styles` directory.** The root's
  `srcBrowser` and `appBrowser` factories plant the `environmentBoundary` plugin on the
  `src/browser` and `app/browser` environments, and the `configs/src/vite.core.config.ts` wrapper
  plants it on the `src/core` environment. The `.oxlintrc.json` file fences each of those
  environments with its own `no-restricted-imports` patterns. Neither the boundary nor the fence
  names the `src/styles` directory, so the generic `src/**` rules govern the styles entry alone.
- **The `src:styles` project is declared in its own wrapper.** The root `vite.config.ts` file
  registers the `src:core`, `src:browser`, and `app:browser` projects and the cross-cutting ones;
  the styles project is declared in the `configs/src/vite.styles.config.ts` wrapper. So the
  `--project src:styles` selection at the root matches no project and Vitest refuses the run, and
  the `probe` workbench, which runs from the root configuration, cannot name the project either.
  The `test:src:styles` script reaches it with the `--config` flag.
- **The vendored `tests/config.test.ts` proof asserts nothing about the axis.** That proof iterates
  the environments scaffold generates, so its alias, project, and plugin cases pass over the
  `src/styles` directory and the `src:styles` project. The proofs under the `tests/src/styles/`
  directory prove the cascade, the tokens, the theme, the mixins, and the elements, and no proof
  asserts the alias, the project registration, or the configuration plugins for the axis; that gap
  is a departure recorded here, not covered.
- **The `tests/setup.css` file arrives with the Tailwind unit.** The workspace rows describe that
  file as the declaration of cascade-layer order ahead of the `@import 'tailwindcss'` rule and its
  `@source` rule. Veneer declares no Tailwind dependency and carries no such file, so it lands with
  the unit that adds one.

Scaffold's `SRC_MATRIX` constant is closed on the `core`, `browser`, and `server` environments, so
this axis is hand-authored and its configuration files, `configs/src/vite.styles.config.ts` and
`configs/src/tsconfig.styles.json`, are the package's own. Emitting the axis from the generator
means the `@src/styles` alias in the root `tsconfig.json` file, the matching lint allowlist entry
and fence, a `src/styles` owner in the environment boundary, a `srcStyles` factory and its project
registration in the root `vite.config.ts` file, and the environment lists in the
`tests/config.test.ts` proof.

## Tokens

Veneer publishes the token registry through the `@orkestrel/veneer` specifier and the cascade that
declares those tokens through `@orkestrel/veneer/styles`. `src/core/constants.ts` holds the names,
`src/styles/_tokens.scss` holds the light and dark value maps, and `src/styles/_theme.scss` holds the
scopes that apply them.

Veneer declares one canonical token per value and one `--bs-*` alias per Bootstrap root variable. A
registry path is its name: `TOKEN_NAMES.color.primary.subtle` is `--vn-color-primary-subtle`. A
registry member is a group exactly where the cascade declares more than one property for it, so
`TOKEN_NAMES.border.color` is a leaf while `TOKEN_NAMES.color.primary` carries `base`, `rgb`, and
the tiers. A group's own value takes the `base` member and the `-base` suffix with it, which is why
`--vn-text-body-base` sits beside `--vn-text-body-rgb` and the tierless `--vn-text-secondary` takes
no suffix at all. Read a channel triplet through the alpha form it exists for:
`rgba(var(--vn-color-primary-rgb), 0.5)`.

A table with a `Source` column names in each cell where that row's value comes from. The factor
table, the tier table, and the departures table carry no such column: the factor table's values are
Veneer's own neutral multipliers, the tier table gives each tier's expression in the row, and the
departures table sets Veneer's value beside Bootstrap's. The table lists every `Source` value a
cell can carry, and gives in each row what that value names.

| Source      | Meaning                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------- |
| `elements`  | Read from Elements' built showcase on 2026-09-20; the cell names the reading                  |
| `bootstrap` | Bootstrap 5.3.8's own value, retained because no Elements specimen measures it                |
| `derived`   | An expression over other Veneer tokens; the cell gives the expression or the value it targets |

### Reference map

#### Factors

Each factor is a registered `<number>` that inherits, so an invalid value falls back to `1` rather
than dropping every length built on it. Each value here is the neutral multiplier of the scale the
token's own name gives: `density` multiplies the space scale, `radius` the radius scale,
`elevation` the shadow scale, and `motion` the durations. A factor is Veneer's own, so it carries
no `Source` column.

| Token                   | Value | Alias |
| ----------------------- | ----- | ----- |
| `--vn-factor-density`   | `1`   | none  |
| `--vn-factor-radius`    | `1`   | none  |
| `--vn-factor-elevation` | `1`   | none  |
| `--vn-factor-motion`    | `1`   | none  |

A factor takes effect where the scale it multiplies is declared. Veneer declares the scales at
`:root`, so a factor set on the root element rescales the document. A subtree that sets a factor
alone keeps the root's lengths, because a custom property carries its `var()` references already
substituted; to rescale a subtree, declare the factor and the scale together on that subtree.

#### Palette and gray ramp

No Elements specimen measures a hue outside the semantic roles, so every value here is Bootstrap's.

| Token                                               | Value                                                                                                        | Source      | Alias                             |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ----------- | --------------------------------- |
| `--vn-palette-blue` through `--vn-palette-cyan`     | `#0d6efd`, `#6610f2`, `#6f42c1`, `#d63384`, `#dc3545`, `#fd7e14`, `#ffc107`, `#198754`, `#20c997`, `#0dcaf0` | `bootstrap` | `--bs-blue` through `--bs-cyan`   |
| `--vn-palette-black-base`, `--vn-palette-black-rgb` | `#000`, `0, 0, 0`                                                                                            | `bootstrap` | `--bs-black`, `--bs-black-rgb`    |
| `--vn-palette-white-base`, `--vn-palette-white-rgb` | `#fff`, `255, 255, 255`                                                                                      | `bootstrap` | `--bs-white`, `--bs-white-rgb`    |
| `--vn-gray-100` through `--vn-gray-900`             | `#f8f9fa`, `#e9ecef`, `#dee2e6`, `#ced4da`, `#adb5bd`, `#6c757d`, `#495057`, `#343a40`, `#212529`            | `bootstrap` | `--bs-gray-100` … `--bs-gray-900` |

`--bs-gray` reads `var(--vn-gray-600)` and `--bs-gray-dark` reads `var(--vn-gray-800)`, which are
Bootstrap's own values for them, so neither gets a canonical token of its own.

#### Semantic roles

Each role carries a fill, its channel triplet, and the subtle, emphasis, and border tiers. Veneer
takes Bootstrap's role names as the compatibility axis and Elements' measured fills as the identity.
`tertiary` is Veneer's own role and answers no Bootstrap alias.

| Role        | Fill                                                | Source                                             | Alias            |
| ----------- | --------------------------------------------------- | -------------------------------------------------- | ---------------- |
| `primary`   | `oklch(0.48 0.255 264)`, dark `oklch(0.7 0.15 233)` | `elements` — primary fill and border               | `--bs-primary`   |
| `secondary` | `oklch(0.446 0.043 257.281)`                        | `elements` — secondary fill                        | `--bs-secondary` |
| `tertiary`  | `oklch(0.541 0.281 293.009)`                        | `elements` — tertiary fill                         | none             |
| `success`   | `oklch(0.527 0.154 150.069)`                        | `elements` — success fill                          | `--bs-success`   |
| `info`      | `oklch(0.5 0.134 242.749)`                          | `elements` — the fill of the `information` variant | `--bs-info`      |
| `warning`   | `oklch(0.555 0.163 48.998)`                         | `elements` — warning fill                          | `--bs-warning`   |
| `danger`    | `oklch(0.505 0.213 27.518)`                         | `elements` — danger fill                           | `--bs-danger`    |
| `light`     | `var(--vn-gray-100)`                                | `bootstrap` — no Elements specimen renders it      | `--bs-light`     |
| `dark`      | `var(--vn-gray-900)`                                | `bootstrap` — no Elements specimen renders it      | `--bs-dark`      |

Only the primary fill retunes by mode. Each role's tiers are oklab mixes over that role's own fill,
so a retuned fill carries its whole family with it.

| Tier                         | Light expression                                               | Dark expression                                           | Alias                       |
| ---------------------------- | -------------------------------------------------------------- | --------------------------------------------------------- | --------------------------- |
| `--vn-color-{role}-subtle`   | `color-mix(in oklab, {fill} 12%, var(--vn-surface-body-base))` | the same mix at `15%`                                     | `--bs-{role}-bg-subtle`     |
| `--vn-color-{role}-emphasis` | `color-mix(in oklab, {fill} 70%, var(--vn-text-body-base))`    | the same mix                                              | `--bs-{role}-text-emphasis` |
| `--vn-color-{role}-border`   | `color-mix(in oklab, {fill} 35%, var(--vn-surface-body-base))` | `color-mix(in oklab, {fill} 50%, oklch(0.235 0.013 256))` | `--bs-{role}-border-subtle` |

The percentages are Elements' own, and `tests/src/styles/tokens.test.ts` resolves each measured
role's tier against the color Elements renders for it. The dark border tier mixes against a literal
rather than against `--vn-surface-raised`, because that literal is the surface the tiers were
calibrated on and the raised surface carries its own content reading; `src/styles/_tokens.scss`
holds it as the dark `anchor` entry.

`--vn-color-{role}-rgb` carries the fill's sRGB rendering as channels, for a consumer writing
`rgba(var(--vn-color-primary-rgb), 0.5)`. A fill outside the sRGB gamut takes the color the engine
paints for it, which is the clamped rendering: the dark primary is `0, 172, 236` rather than the
negative red channel its `color-mix()` serialization reports.

#### Text and surface

The table lists the body text tokens and the surface tokens they are painted on. Each row gives
its light value, its dark value, the `Source` the preceding legend decides, and the `--bs-*`
variables it answers.

| Token                                 | Light                                                                                                     | Dark                                                                           | Source                                                 | Alias                                            |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------ |
| `--vn-text-body-base`, `-rgb`         | `oklch(0.208 0.042 265.755)`, `15, 23, 43`                                                                | `oklch(0.929 0.013 255.508)`, `226, 232, 240`                                  | `elements` — text                                      | `--bs-body-color`, `--bs-body-color-rgb`         |
| `--vn-text-emphasis-base`, `-rgb`     | `var(--vn-palette-black-base)`, `var(--vn-palette-black-rgb)`                                             | `var(--vn-palette-white-base)`, `var(--vn-palette-white-rgb)`                  | `elements` — dialog text                               | `--bs-emphasis-color`, `--bs-emphasis-color-rgb` |
| `--vn-text-secondary`                 | `color-mix(in srgb, var(--vn-text-body-base) 75%, transparent)`                                           | the same expression                                                            | `derived` — Bootstrap's own 75% step                   | `--bs-secondary-color`                           |
| `--vn-text-tertiary`                  | the same expression at `50%`                                                                              | the same expression                                                            | `derived` — Bootstrap's own 50% step                   | `--bs-tertiary-color`                            |
| `--vn-text-muted`                     | `oklch(0.446 0.043 257.281)`                                                                              | `oklch(0.704 0.04 256.788)`                                                    | `elements` — address and description text              | none                                             |
| `--vn-text-heading`                   | `inherit`                                                                                                 | `inherit`                                                                      | `bootstrap` — headings take the body color             | `--bs-heading-color`                             |
| `--vn-text-code`                      | `var(--vn-text-body-base)`                                                                                | the same expression                                                            | `elements` — inline code text                          | `--bs-code-color`                                |
| `--vn-text-highlight`                 | `var(--vn-text-body-base)`                                                                                | the same expression                                                            | `bootstrap` — the highlight takes body copy            | `--bs-highlight-color`                           |
| `--vn-text-mark`                      | `marktext`                                                                                                | `marktext`                                                                     | `elements` — the mark highlight Elements binds         | none                                             |
| `--vn-surface-body-base`, `-rgb`      | `var(--vn-palette-white-base)`, `var(--vn-palette-white-rgb)`                                             | `oklch(0.21 0.013 256)`, `20, 25, 30`                                          | `elements` — the page canvas                           | `--bs-body-bg`, `--bs-body-bg-rgb`               |
| `--vn-surface-raised`                 | `oklch(0.968 0.007 247.896)`                                                                              | `oklch(0.265 0.014 256)`                                                       | `elements` — code block, sample, and variable surface  | none                                             |
| `--vn-surface-secondary-base`, `-rgb` | `var(--vn-gray-200)`, `233, 236, 239`                                                                     | `var(--vn-gray-800)`, `52, 58, 64`                                             | `bootstrap` — no Elements specimen renders the tier    | `--bs-secondary-bg`, `--bs-secondary-bg-rgb`     |
| `--vn-surface-tertiary-base`, `-rgb`  | `var(--vn-gray-100)`, `248, 249, 250`                                                                     | `color-mix(in srgb, var(--vn-gray-800) 50%, var(--vn-gray-900))`, `43, 48, 53` | `derived` — reaches Bootstrap's `#2b3035`              | `--bs-tertiary-bg`, `--bs-tertiary-bg-rgb`       |
| `--vn-surface-highlight`              | `color-mix(in srgb, var(--vn-palette-white-base) 80%, var(--vn-color-warning-base))`                      | the same mix over `var(--vn-palette-black-base) 60%`                           | `derived` — Bootstrap's own tint over the warning role | `--bs-highlight-bg`                              |
| `--vn-surface-mark`                   | `mark`                                                                                                    | `mark`                                                                         | `elements` — the mark highlight Elements binds         | none                                             |
| `--vn-surface-code`                   | `color-mix(in oklab, var(--vn-text-body-base) 12%, transparent)`                                          | the same expression                                                            | `elements` — inline code surface                       | none                                             |
| `--vn-surface-gradient`               | `linear-gradient(180deg, color-mix(in srgb, var(--vn-palette-white-base) 15%, transparent), transparent)` | the same expression                                                            | `bootstrap` — Bootstrap's own gradient                 | `--bs-gradient`                                  |

`--vn-surface-raised` is the color Elements paints behind a code block, a sample, and a variable,
and the `pre`, `samp`, and `var` tags read it. No other rule in the shipped cascade reads it.

`--vn-text-mark` and `--vn-surface-mark` are the `marktext` and `mark` system colors a browser
paints a bare `mark` with, which is what Elements binds its own mark tokens to. They carry one
value in each mode and answer no `--bs-*` variable, so a consumer retunes the mark highlight
through them rather than through `--bs-highlight-bg`.

`--vn-text-muted` is the muted text Elements renders on an address and on a description in a
description list, and those two tags read it. `--vn-text-secondary` is Bootstrap's own 75% step over
the body text and answers `--bs-secondary-color`, which Bootstrap's `.text-muted` class reads, so
the two names carry different values for different consumers.

#### Links

The table lists the link tokens: the resting color, the hover color, and the decoration. Each row
gives its light value, its dark value, its `Source`, and the `--bs-*` variables it answers.

| Token                          | Light                                                                                     | Dark                                                                                                 | Source                                                                                                 | Alias                                                |
| ------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `--vn-link-base`, `-rgb`       | `var(--vn-color-primary-base)`, `8, 65, 234`                                              | `color-mix(in srgb, var(--vn-palette-white-base) 40%, var(--vn-color-primary-base))`, `85, 205, 243` | `derived` — light takes the primary fill unchanged, and dark is Bootstrap's own 40% white tint over it | `--bs-link-color`, `--bs-link-color-rgb`             |
| `--vn-link-hover-base`, `-rgb` | `color-mix(in srgb, var(--vn-palette-black-base) 20%, var(--vn-link-base))`, `6, 52, 187` | `color-mix(in srgb, var(--vn-palette-white-base) 20%, var(--vn-link-base))`, `119, 215, 246`         | `derived` — Bootstrap's own shade step                                                                 | `--bs-link-hover-color`, `--bs-link-hover-color-rgb` |
| `--vn-link-decoration`         | `underline`                                                                               | `underline`                                                                                          | `bootstrap` — retained, because no Elements specimen measures a link's decoration                      | `--bs-link-decoration`                               |

#### Type

The table lists the type tokens: the families, the size scale, the line heights, and the weights.
Each row gives one value for every mode, its `Source`, and the `--bs-*` variables it answers.

| Token                                                   | Value                                                                                              | Source                                                                                     | Alias                                            |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `--vn-font-sans`                                        | Elements' system stack, beginning `system-ui`                                                      | `elements` — the family on every specimen                                                  | `--bs-font-sans-serif`, `--bs-body-font-family`  |
| `--vn-font-mono-base`                                   | `SFMono-Regular`, `Menlo`, `Monaco`, `Consolas`, `'Liberation Mono'`, `'Courier New'`, `monospace` | `elements` — the code family's stack, after the leading `ui-monospace` each partial writes | `--bs-font-monospace`                            |
| `--vn-font-mono-short`                                  | `SFMono-Regular`, `Menlo`, `monospace`                                                             | `elements` — the shorter stack a variable takes                                            | none                                             |
| `--vn-size-1` through `--vn-size-8`                     | `0.75rem`, `0.875rem`, `1rem`, `1.125rem`, `1.25rem`, `1.5rem`, `1.875rem`, `2.25rem`              | `elements` — the type table's 12 to 36 px steps                                            | `--bs-body-font-size` reads `--vn-size-2`        |
| `--vn-display-1` through `--vn-display-6`               | `5rem`, `4.5rem`, `4rem`, `3.5rem`, `3rem`, `2.5rem`                                               | `bootstrap` — `$display-font-sizes`                                                        | none                                             |
| `--vn-line-body`, `--vn-line-heading`, `--vn-line-code` | `1.5`, `1.2`, `1.6`                                                                                | `elements` — the type table's rhythm, and the looser rhythm a code block takes             | `--bs-body-line-height` reads `--vn-line-body`   |
| `--vn-weight-body`, `--vn-weight-heading`               | `400`, `600`                                                                                       | `elements` — the type table's weights                                                      | `--bs-body-font-weight` reads `--vn-weight-body` |

#### Space, border, radius, and elevation

The table lists the length tokens the layout is built from: the space scale, the border, the radius
scale, and the elevation rungs. Each row gives its value, its `Source`, and the `--bs-*` variables
it answers, and a row whose dark mode differs writes the dark reading into its own `Value` cell.

| Token                                     | Value                                                                                                                                                                                                                                                                                                                                                                                 | Source                                              | Alias                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------- |
| `--vn-space-1`                            | `calc(0.125rem * var(--vn-factor-density))`, giving 2 px                                                                                                                                                                                                                                                                                                                              | `derived` — the scale expression at N = 1           | none                                                                   |
| `--vn-space-2` through `--vn-space-8`     | the scale expression `calc(N * 0.125rem * var(--vn-factor-density))` at N = 2 through 8, giving 4 to 16 px                                                                                                                                                                                                                                                                            | `elements` — the space table's paddings             | none                                                                   |
| `--vn-space-12`, `--vn-space-24`          | the same expression at N = 12 and N = 24, giving 24 px and 48 px                                                                                                                                                                                                                                                                                                                      | `bootstrap` — `$spacers` 4 and 5                    | none                                                                   |
| `--vn-border-width`, `--vn-border-style`  | `1px`, `solid`                                                                                                                                                                                                                                                                                                                                                                        | `elements` — every bordered specimen draws 1 px     | `--bs-border-width`, `--bs-border-style`                               |
| `--vn-border-color`                       | `oklch(0.869 0.022 252.894)`, dark `oklch(0.4 0.022 256)`                                                                                                                                                                                                                                                                                                                             | `elements` — border                                 | `--bs-border-color`                                                    |
| `--vn-border-translucent`                 | `color-mix(in srgb, var(--vn-palette-black-base) 17.5%, transparent)`, dark white at `15%`                                                                                                                                                                                                                                                                                            | `bootstrap` — Bootstrap's own translucent edge      | `--bs-border-color-translucent`                                        |
| `--vn-radius-small`, `-base`, `-large`    | `calc(0.25rem * var(--vn-factor-radius))`, `0.375rem`, `0.5rem` scaled the same way                                                                                                                                                                                                                                                                                                   | `elements` — the 4, 6, 8 px radius scale            | `--bs-border-radius-sm`, `--bs-border-radius`, `--bs-border-radius-lg` |
| `--vn-radius-xlarge`, `-xxlarge`, `-pill` | `1rem` and `2rem` scaled the same way, then `50rem`                                                                                                                                                                                                                                                                                                                                   | `bootstrap` — no Elements specimen renders them     | `--bs-border-radius-xl`, `-xxl`, `-2xl`, `-pill`                       |
| `--vn-shadow-1`, `-2`, `-3`               | Elements' hint, popover, and dialog pairs, each length in `rem` scaled by `var(--vn-factor-elevation)` and each color `rgba(var(--vn-palette-black-rgb), α)`: `0 0.0625rem 0.125rem` at `0.05` over `0 0.0625rem 0.1875rem` at `0.09`; `0 0.125rem 0.25rem` at `0.06` over `0 0.5rem 1rem -0.25rem` at `0.12`; `0 0.25rem 0.5rem` at `0.07` over `0 1.5rem 2.75rem -0.5rem` at `0.22` | `elements` — the elevation table                    | `--bs-box-shadow-sm`, `--bs-box-shadow`, `--bs-box-shadow-lg`          |
| `--vn-shadow-inset`                       | `inset 0 0.0625rem 0.125rem` at `0.075`, each length scaled by `var(--vn-factor-elevation)` and the color written the same way as the preceding rungs                                                                                                                                                                                                                                 | `bootstrap` — no Elements specimen renders an inset | `--bs-box-shadow-inset`                                                |

The container widths and the default gutters are fixed lengths, and neither scale carries a factor.
Bootstrap writes each container width as a literal inside its own breakpoint rule, so a container
token answers no `--bs-*` variable; the container and row rules declare the gutter aliases over the
gutter tokens.

| Token                | Value    | Source                                              | Alias           |
| -------------------- | -------- | --------------------------------------------------- | --------------- |
| `--vn-container-sm`  | `540px`  | `bootstrap` — the official `sm` container cap       | none            |
| `--vn-container-md`  | `720px`  | `bootstrap` — the official `md` container cap       | none            |
| `--vn-container-lg`  | `960px`  | `bootstrap` — the official `lg` container cap       | none            |
| `--vn-container-xl`  | `1140px` | `bootstrap` — the official `xl` container cap       | none            |
| `--vn-container-xxl` | `1320px` | `bootstrap` — the official `xxl` container cap      | none            |
| `--vn-gutter-x`      | `1.5rem` | `bootstrap` — the official container and row gutter | `--bs-gutter-x` |
| `--vn-gutter-y`      | `0`      | `bootstrap` — the official row gutter               | `--bs-gutter-y` |

The container partial reads each width inside the `breakpoint-up` mixin for the name that width
carries, so `--vn-container-sm` caps `.container` and `.container-sm` from the `sm` boundary up,
and each wider name caps its own family from its own boundary. `.container-fluid` reads no cap.

The gutter and row-gap utilities read a separate scale. Its tokens carry no density factor,
matching the default gutter tokens. Override a step to retune its utilities without changing the
default gutters. The `gap` and `column-gap` keys remain assigned to the utilities family.

| Token        | Value     | Source                              | Alias |
| ------------ | --------- | ----------------------------------- | ----- |
| `--vn-gap-0` | `0`       | `bootstrap` — gutter and gap step 0 | none  |
| `--vn-gap-1` | `0.25rem` | `bootstrap` — gutter and gap step 1 | none  |
| `--vn-gap-2` | `0.5rem`  | `bootstrap` — gutter and gap step 2 | none  |
| `--vn-gap-3` | `1rem`    | `bootstrap` — gutter and gap step 3 | none  |
| `--vn-gap-4` | `1.5rem`  | `bootstrap` — gutter and gap step 4 | none  |
| `--vn-gap-5` | `3rem`    | `bootstrap` — gutter and gap step 5 | none  |

#### Motion, focus, validation, breakpoints, and stacking

The table lists the durations and easings, the focus ring, the validation pair, the breakpoint
ladder, and the stacking ladder. Each row gives its value, its `Source`, and the `--bs-*` variables
it answers, and a row whose dark mode differs writes the dark reading into its own cell.

| Token                                                    | Value                                                                                               | Source                                                                                                                                              | Alias                                                                                                                |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `--vn-motion-feedback`, `--vn-motion-panel`              | `calc(150ms * var(--vn-factor-motion))`, `calc(250ms * …)`                                          | `elements` — the motion table's durations                                                                                                           | none                                                                                                                 |
| `--vn-ease-standard`, `--vn-ease-out`, `--vn-ease-panel` | `ease`, `ease-out`, `cubic-bezier(0.32, 0.72, 0, 1)`                                                | `elements` — the motion table's easings                                                                                                             | none                                                                                                                 |
| `--vn-focus-width`, `--vn-focus-opacity`                 | `0.1875rem`, `0.45`                                                                                 | `elements` — the focus-visible ring                                                                                                                 | `--bs-focus-ring-width`, `-opacity`                                                                                  |
| `--vn-focus-color`                                       | `color-mix(in oklab, var(--vn-color-primary-base) 45%, transparent)`                                | `derived` — reproduces the calibrated ring: `oklab(0.48 -0.0266547 -0.253603 / 0.45)` in light and `oklab(0.7 -0.0902723 -0.119795 / 0.45)` in dark | `--bs-focus-ring-color`                                                                                              |
| `--vn-focus-highlight`, `--vn-focus-reset`               | `Highlight`, `none`                                                                                 | `derived` — system outline and shadow reset for the shared focus mixin                                                                              | none                                                                                                                 |
| `--vn-form-valid`, `--vn-form-invalid`                   | `var(--vn-color-success-base)` and `var(--vn-color-danger-base)`, dark the `-emphasis` tier of each | `bootstrap` — Bootstrap's own pairing                                                                                                               | `--bs-form-valid-color`, `--bs-form-valid-border-color`, `--bs-form-invalid-color`, `--bs-form-invalid-border-color` |
| `--vn-breakpoint-xs` through `--vn-breakpoint-xxl`       | `0`, `576px`, `768px`, `992px`, `1200px`, `1400px`                                                  | `bootstrap` — the documented wire vocabulary                                                                                                        | `--bs-breakpoint-xs` … `-xxl`                                                                                        |
| `--vn-stack-dropdown`, `-sticky`, `-fixed`               | `1000`, `1020`, `1030`                                                                              | `bootstrap` — retained from `$zindex-dropdown`, `$zindex-sticky`, and `$zindex-fixed`                                                               | none                                                                                                                 |
| `--vn-stack-drawer-backdrop`, `-drawer-base`             | `1040`, `1045`                                                                                      | `bootstrap` — retained from `$zindex-offcanvas-backdrop` and `$zindex-offcanvas`                                                                    | none                                                                                                                 |
| `--vn-stack-dialog-backdrop`, `-dialog-base`             | `1050`, `1055`                                                                                      | `bootstrap` — retained from `$zindex-modal-backdrop` and `$zindex-modal`                                                                            | none                                                                                                                 |
| `--vn-stack-popover`, `-hint`, `-toast`                  | `1070`, `1080`, `1090`                                                                              | `bootstrap` — retained from `$zindex-popover`, `$zindex-tooltip`, and `$zindex-toast`                                                               | none                                                                                                                 |

Veneer keeps Bootstrap's breakpoint names verbatim because a consumer predicts `--bs-breakpoint-md`
from `--vn-breakpoint-md`. `src/styles/_mixins.scss` holds the one Sass source those widths are
emitted from, and the `breakpoint-up` and `breakpoint-down` mixins gate a partial's declarations at
the same widths: `breakpoint-up` reaches every viewport at and above a name's boundary, and
`breakpoint-down` every viewport below it. The zero boundary is at or below every viewport and
above none, so `breakpoint-up(xs)` emits its content unwrapped and `breakpoint-down(xs)` emits
nothing. A name the ramp does not carry fails the build.

The stacking ladder takes Veneer's own component words: `drawer` is
Bootstrap's offcanvas, `dialog` its modal, and `hint` its tooltip. Bootstrap declares that ladder as
Sass variables on its component rules rather than as root custom properties, so each rung retains
Bootstrap's own number and answers no `--bs-*` alias.

### Button states and bindings

Button uses the following canonical defaults. The state tokens among them are shared; each component binds the percentages its retained
contract specifies. Tables use the stripe percentage and retain their own active and hover accents. The light mixer is
the measured sRGB endpoint of the bare hover fill, rather than literal black or the body-text
token. The dark mixer is white.
The hover and active percentages reproduce the run-6 filled-role readings in managed Chromium
and Edge; the bare fills carry the same endpoint at the corresponding alpha.

| Token                     | Value                                                                                   | Source                                                                                                  | Alias                                           |
| ------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `--vn-state-mixer`        | light `color(srgb 0.00742457 0.0232852 0.0925134)`; dark `var(--vn-palette-white-base)` | `elements` — the bare hover and active endpoints                                                        | Button hover and active backgrounds             |
| `--vn-state-hover`        | `12%`                                                                                   | `elements` — hover tint                                                                                 | Button hover backgrounds                        |
| `--vn-state-active`       | `22%`                                                                                   | `elements` — active tint                                                                                | Button active backgrounds                       |
| `--vn-state-stripe`       | `5%`                                                                                    | `bootstrap` — retained `$table-striped-bg-factor`, until an Elements table specimen measures a row tint | Striped table-row backgrounds                   |
| `--vn-button-opacity`     | `0.65`                                                                                  | `bootstrap` — retained disabled opacity; Elements' opacity was not calibrated                           | `--bs-btn-disabled-opacity`                     |
| `--vn-button-shadow`      | `none`                                                                                  | `elements` — button elevation                                                                           | `--bs-btn-box-shadow`, `--bs-btn-active-shadow` |
| `--vn-button-transparent` | `transparent`                                                                           | `elements` — bare resting fill                                                                          | Neutral Button backgrounds and borders          |
| `--vn-button-face`        | `ButtonFace`                                                                            | `derived` — system button surface under forced colors                                                   | Button background fallbacks                     |
| `--vn-button-text`        | `ButtonText`                                                                            | `derived` — system button foreground under forced colors                                                | Button foreground and border fallbacks          |
| `--vn-button-highlight`   | `Highlight`                                                                             | `derived` — system focus and selection under forced colors                                              | Button focus outline and state backgrounds      |
| `--vn-button-disabled`    | `GrayText`                                                                              | `derived` — system disabled foreground under forced colors                                              | Button disabled foreground and border fallbacks |

The state tokens are declared at the root and inside each explicit theme scope, so a light island
inside a dark island restores the light mixer. The declaration-only `focus-ring` mixin takes a
color, a width, and an optional shadow expression. Its element caller uses the calibrated primary
ring; its component caller reads `--bs-btn-focus-box-shadow`. In forced colors, the mixin replaces
the shadow with an outline in the system highlight color.

The following table names the compatible properties declared on the base class.

| Compatible property              | Binding on `.btn`                                                                                               |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `--bs-btn-padding-x`             | `var(--vn-space-6)`                                                                                             |
| `--bs-btn-padding-y`             | `var(--vn-space-3)`                                                                                             |
| `--bs-btn-font-family`           | `var(--vn-font-sans)`                                                                                           |
| `--bs-btn-font-size`             | `var(--vn-size-2)`                                                                                              |
| `--bs-btn-font-weight`           | `var(--vn-weight-body)`                                                                                         |
| `--bs-btn-line-height`           | `var(--vn-line-body)`                                                                                           |
| `--bs-btn-color`                 | `var(--vn-text-body-base)`; `.btn-light` overrides with `var(--vn-palette-black-base)`                          |
| `--bs-btn-bg`                    | `var(--vn-button-transparent)`                                                                                  |
| `--bs-btn-border-width`          | `var(--vn-border-width)`                                                                                        |
| `--bs-btn-border-color`          | `var(--vn-button-transparent)`                                                                                  |
| `--bs-btn-border-radius`         | `var(--vn-radius-base)`                                                                                         |
| `--bs-btn-box-shadow`            | `var(--vn-button-shadow)`                                                                                       |
| `--bs-btn-focus-shadow-rgb`      | `var(--vn-color-primary-rgb)`                                                                                   |
| `--bs-btn-focus-box-shadow`      | `0 0 0 var(--vn-focus-width) var(--vn-focus-color)`                                                             |
| `--bs-btn-hover-color`           | `var(--vn-text-body-base)`; `.btn-light` and `.btn-outline-light` overrides with `var(--vn-palette-black-base)` |
| `--bs-btn-hover-bg`              | `color-mix(in srgb, var(--vn-state-mixer) var(--vn-state-hover), var(--vn-button-transparent))`                 |
| `--bs-btn-hover-border-color`    | `var(--vn-button-transparent)`                                                                                  |
| `--bs-btn-active-color`          | `var(--vn-text-body-base)`; `.btn-light` and `.btn-outline-light` overrides with `var(--vn-palette-black-base)` |
| `--bs-btn-active-bg`             | `color-mix(in srgb, var(--vn-state-mixer) var(--vn-state-active), var(--vn-button-transparent))`                |
| `--bs-btn-active-border-color`   | `var(--vn-button-transparent)`                                                                                  |
| `--bs-btn-active-shadow`         | `var(--vn-button-shadow)`                                                                                       |
| `--bs-btn-disabled-color`        | `var(--vn-text-body-base)`; `.btn-light` overrides with `var(--vn-palette-black-base)`                          |
| `--bs-btn-disabled-bg`           | `var(--vn-button-transparent)`                                                                                  |
| `--bs-btn-disabled-border-color` | `var(--vn-button-transparent)`                                                                                  |
| `--bs-btn-disabled-opacity`      | `var(--vn-button-opacity)`                                                                                      |

Filled roles bind resting and disabled background and border to `--vn-color-{role}-base`, and
text to `--vn-palette-white-base`. Hover and active backgrounds mix that fill with
`--vn-state-mixer` at `--vn-state-hover` and `--vn-state-active`; the border keeps the
resting fill. Outline roles use the role color for resting text and border over a transparent
background, fill on hover, and take the active mix while pressed. Their disabled state restores
the transparent surface and role text. The ring remains primary for every role.

The `.btn-link` class takes `--vn-link-base`, `--vn-link-hover-base`, and
`--vn-link-decoration`; its surface stays transparent. The small size and its group child take
space-2 block padding, space-4 inline padding, size-1 type, and radius-small. The large size and
its group child take space-4, space-8, size-3, and radius-large respectively.
The inherited `--bs-gradient` binding remains `var(--vn-surface-gradient)`.
The retained `--bs-btn-close-filter` declaration remains U3's compatibility value; Button
neither binds it nor defers it.

### Bootstrap variables Veneer retains

`--bs-btn-close-filter`, `--bs-carousel-indicator-active-bg`, `--bs-carousel-caption-color`, and
`--bs-carousel-control-icon-filter` paint a component Veneer does not own yet. Each keeps
Bootstrap's value in the alias scope until the component that paints it lands its canonical token. A
data URI cannot read a custom property, so the forward path for each is a `mask-image` treatment in
the unit that owns the component.

Bootstrap also retunes `--bs-form-select-bg-img`, `--bs-form-switch-bg`,
`--bs-navbar-toggler-icon-bg`, `--bs-accordion-btn-icon`, and `--bs-accordion-btn-active-icon` under
a dark component selector, and declares no light counterpart at theme scope. Veneer declares each in
its dark scope with Bootstrap's own value. A light island nested inside a dark one therefore
inherits the dark asset, and the component unit that owns each one closes that.

### Customization

Override a canonical token in your own unlayered rule. Veneer declares its tokens inside
`@layer theme`, so an unlayered rule wins, and every derived tier and every `--bs-*` alias follows
the override because each one is an expression over the token you changed.

```css
:root {
	--vn-factor-density: 1.25;
	--vn-color-primary-base: #2e7d32;
	--vn-color-primary-rgb: 46, 125, 50;
}

[data-bs-theme='dark'] {
	--vn-color-primary-base: #66bb6a;
	--vn-color-primary-rgb: 102, 187, 106;
}

.brand-veil {
	background-color: rgba(var(--vn-color-primary-rgb), 0.5);
}
```

That rule rescales the space scale from 6 px to 7.5 px at `--vn-space-3`, repaints `--bs-primary` in
the color you named, and carries that color through `--bs-primary-bg-subtle`,
`--bs-primary-text-emphasis`, and `--bs-primary-border-subtle`. The channel triplet is a literal
rather than an expression, so override `--vn-color-primary-rgb` alongside the fill; the
`.brand-veil` rule, and any other rule of yours reading the triplet, otherwise keeps painting the
old brand. That rule is also the alpha form itself: a triplet is comma-separated, so it takes
`rgba(triplet, alpha)` and not the slash syntax a modern `rgb()` accepts. The
`[data-bs-theme='dark']` rule is what carries the brand into a dark island, which keeps its own fill
and mixes its own tiers from it. `tests/src/styles/integration.test.ts` executes this recipe and
reads the rescaled spacing, the fill, the subtle, emphasis, and border tiers, the triplet, the
translucent fill the alpha form paints, what a fill override without the triplet leaves that
translucent fill painting, and the dark island's own fill and tiers.

### Departures from Bootstrap

Veneer takes Elements' identity wherever a specimen measures it, so these values differ from the
Bootstrap release they alias.

| Token                                    | Veneer value                                                                                                                                                    | Bootstrap 5.3.8 value                                                                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `figure`, `figcaption`                   | Elements' zero figure margin, column layout, 8px gap, and muted caption at .875em with 1.4 line height                                                          | Figure end margin 1rem; no figcaption treatment                                                                                       |
| `img`                                    | Elements' block display, 100% maximum inline size, and automatic block size; middle alignment retained                                                          | Middle alignment only                                                                                                                 |
| `table`, `caption`                       | Elements' top caption, 8px/12px caption padding, .875em muted caption, and logical start alignment                                                              | Bottom caption, 8px block padding, body-sized secondary text, and left alignment                                                      |
| `td`, `th`                               | Elements' 8px/12px padding, 1px token-backed end border, middle alignment, and heading weight 600                                                               | Bare cells have zero-width borders; headings inherit weight                                                                           |
| `colgroup`                               | Inherited border color, solid border style, and zero border width, shared with the table groups                                                                 | Omitted from the Reboot border-reset group                                                                                            |
| `th` text alignment                      | Inherited alignment without the WebKit fallback                                                                                                                 | `text-align: inherit` followed by `text-align: -webkit-match-parent`                                                                  |
| `legend`                                 | Logical inline-start float and inline size; Bootstrap's responsive font size and 8px end margin retained; the sibling-clear selector is Excluded                | Physical left float and width, with sibling clearing                                                                                  |
| `button`                                 | U7's calibrated font, padding, radius, and paint retained with Reboot's margin, transform, appearance, and cursor repairs                                       | Inherited typography and zero radius                                                                                                  |
| `h1`–`h6`                                | Fixed `36/30/24/20/18/16px` scale through `--vn-size-8` to `-3`                                                                                                 | Fluid heading sizes through Bootstrap RFS                                                                                             |
| `.h1`–`.h6`                              | The heading tag treatment at every viewport: `36/30/24/20/18/16px`, weight `600`, and zero margin, so the class twin renders as its own tag                     | `2.5/2/1.75/1.5/1.25/1rem` from the `xl` width up and a fluid size at narrower viewports, with weight `500` and a `0.5rem` end margin |
| `.display-1`–`.display-6`                | Bootstrap's own `5/4.5/4/3.5/3/2.5rem` at every viewport, through `--vn-display-1` to `-6`                                                                      | The same sizes from the `xl` width up and a fluid size at narrower viewports                                                          |
| `.img-fluid`, `.img-thumbnail`           | `max-inline-size` and `block-size`, the logical properties the `img` tag already reads                                                                          | `max-width` and `height`                                                                                                              |
| `[hidden]`                               | Important display suppression in the `reset` layer wins over later-layer important declarations                                                                 | Source order decides between important unlayered declarations                                                                         |
| `--bs-body-text-align`                   | The body reads `var(--bs-body-text-align, start)`                                                                                                               | No explicit fallback in the Reboot consumer                                                                                           |
| `--vn-text-code`                         | Body text in light and dark; `--bs-code-color` keeps this alias                                                                                                 | `$code-color` is `#d63384`; dark code is `#e685b5`                                                                                    |
| `--vn-size-2`                            | `0.875rem`                                                                                                                                                      | `1rem`                                                                                                                                |
| `--vn-weight-heading`                    | `600`                                                                                                                                                           | `500`                                                                                                                                 |
| `--vn-color-primary-base`                | `oklch(0.48 0.255 264)`, dark `oklch(0.7 0.15 233)`                                                                                                             | `#0d6efd` in light and dark                                                                                                           |
| `--vn-color-secondary-base`              | `oklch(0.446 0.043 257.281)`                                                                                                                                    | `#6c757d`                                                                                                                             |
| `--vn-color-success-base`                | `oklch(0.527 0.154 150.069)`                                                                                                                                    | `#198754`                                                                                                                             |
| `--vn-color-info-base`                   | `oklch(0.5 0.134 242.749)`                                                                                                                                      | `#0dcaf0`                                                                                                                             |
| `--vn-color-warning-base`                | `oklch(0.555 0.163 48.998)`                                                                                                                                     | `#ffc107`                                                                                                                             |
| `--vn-color-danger-base`                 | `oklch(0.505 0.213 27.518)`                                                                                                                                     | `#dc3545`                                                                                                                             |
| `--vn-text-body-base`                    | `oklch(0.208 0.042 265.755)` / `oklch(0.929 0.013 255.508)`                                                                                                     | `#212529` / `#dee2e6`                                                                                                                 |
| `--vn-surface-body-base` dark            | `oklch(0.21 0.013 256)`                                                                                                                                         | `#212529`                                                                                                                             |
| `--vn-border-color`                      | `oklch(0.869 0.022 252.894)` / `oklch(0.4 0.022 256)`                                                                                                           | `#dee2e6` / `#495057`                                                                                                                 |
| `--vn-shadow-1`, `-2`, `-3`              | Elements' hint, popover, and dialog pairs                                                                                                                       | `0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)`, `0 0.5rem 1rem rgba(0, 0, 0, 0.15)`, `0 1rem 3rem rgba(0, 0, 0, 0.175)`                    |
| `--vn-focus-width`, `--vn-focus-opacity` | `0.1875rem`, `0.45`                                                                                                                                             | `0.25rem`, `0.25`                                                                                                                     |
| `--bs-btn-focus-shadow-rgb`              | `var(--vn-color-primary-rgb)`, declared for consumers and read by no Veneer rule, because `--bs-btn-focus-box-shadow` carries its own ring expression           | Each role's own channel triplet, read by `--bs-btn-focus-box-shadow` as `rgba(var(--bs-btn-focus-shadow-rgb), 0.5)`                   |
| `--vn-font-sans`                         | `system-ui`, `-apple-system`, `'Segoe UI'`, `roboto`, `'Helvetica Neue'`, `arial`, `sans-serif`, `'Apple Color Emoji'`, `'Segoe UI Emoji'`, `'Segoe UI Symbol'` | the same stack with `"Noto Sans"` and `"Liberation Sans"` added before `Arial`, and `"Noto Color Emoji"` added at the end             |

Bootstrap's `--bs-body-font-size` reads `--vn-size-2` and its `--bs-font-sans-serif` reads
`--vn-font-sans`, so those rows are the departures a Bootstrap component meets through its own
variable rather than through a Veneer token it names directly.

Veneer drops the `"Noto Sans"`, `"Liberation Sans"`, and `"Noto Color Emoji"` families Bootstrap
lists, because no Elements specimen renders any of them.

`--vn-line-heading` at `1.2`, `--vn-radius-base` at `0.375rem`, and `--vn-font-mono-base` agree with
Bootstrap's own values. They are recorded here rather than in the table, so a reader looking for them
meets the agreement instead of an omission.

The remaining bare form and interactive tag repairs retain Bootstrap 5.3.8's Reboot values: inherited control typography, native appearance corrections, disabled select opacity, vertical textarea resizing, fieldset reset, and the label, output, frame, summary, and progress treatments. Attribute-only button selectors live in the button partial; input pseudo-elements live in the input partial. The standard file-selector button ships; its redundant prefixed alias is Excluded.

The `.btn-tertiary` and `.btn-outline-tertiary` classes are Veneer additions over the tertiary
role. Filled-role text stays white and the border keeps its resting fill during hover and active
states, following Elements rather than Bootstrap's contrasting text and border-shade choices.

Veneer's `tertiary` role has no Bootstrap counterpart, and Bootstrap's `light` and `dark` roles have
no Elements specimen, so each of those keeps the other project's value unchanged.

These Elements behaviors are departures Veneer does not copy. Elements' disclosure still
interpolates its content height when the engine reports `prefers-reduced-motion: reduce`; Veneer's
`transition` mixin emits the reduced-motion pair for every transition it writes, and
`tests/src/styles/mixins.test.ts` reads the collapse. Elements' popover snaps open and fades closed;
that asymmetry belongs to the overlay units and is recorded as an Elements decision rather than a
Bootstrap one.

### Deferred names

These names are not declared in this release. Each one lands with the first consumer that reads it,
and each is named here so a consumer does not look for it. No reader parses this table, and these
are Veneer's own names rather than official ones, so each row records what its name waits on
instead of the owner and reason `readDeferrals` requires of the § Styles table.

| Name                                             | Waiting on                                      |
| ------------------------------------------------ | ----------------------------------------------- |
| `scroll-padding` on the document                 | The first sticky header, which fixes the offset |
| The hint surface and the component-scoped tokens | The components that paint them                  |

## Compatibility

This section is the ledger of what Veneer accepts from Bootstrap 5.3.8. The
tests/conformance.test.ts proof reads its rows and compares their named steps with the official
Button recording. The Component column carries the inventory key, so later component units extend
the same table; engine names the shared official engine and is never shipped as CSS.

The table records the Reboot obligations, the typography and media class obligations, the Button
obligations, and the engine obligations assigned to its unit.
Button's forced-colors browser reading remains open: the installed Test `MediaOptions` contract
stages print and motion only. The cascade supplies system-color fallbacks, but a later Test unit
must add a forced-colors axis before this reading closes.

| Component     | Kind           | Obligation                                                                                                                                                                                                                        | Proof                 | Status   |
| ------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------- |
| g             | selector       | Every official .g step and breakpoint selector ships; resolved margins, padding, and row gaps are proved in tests/src/styles/utilities/gap.test.ts.                                                                               | —                     | shipped  |
| g             | variable       | The `--bs-gutter-x` property reads the density-independent `--vn-gap-{n}` scale; resolved geometry is proved in tests/src/styles/utilities/gap.test.ts.                                                                           | —                     | shipped  |
| g             | variable       | The `--bs-gutter-y` property reads the density-independent `--vn-gap-{n}` scale; resolved geometry is proved in tests/src/styles/utilities/gap.test.ts.                                                                           | —                     | shipped  |
| gx            | selector       | Every official .gx step and breakpoint selector ships; resolved margins, padding, and row gaps are proved in tests/src/styles/utilities/gap.test.ts.                                                                              | —                     | shipped  |
| gx            | variable       | The `--bs-gutter-x` property reads the density-independent `--vn-gap-{n}` scale; resolved geometry is proved in tests/src/styles/utilities/gap.test.ts.                                                                           | —                     | shipped  |
| gy            | selector       | Every official .gy step and breakpoint selector ships; resolved margins, padding, and row gaps are proved in tests/src/styles/utilities/gap.test.ts.                                                                              | —                     | shipped  |
| gy            | variable       | The `--bs-gutter-y` property reads the density-independent `--vn-gap-{n}` scale; resolved geometry is proved in tests/src/styles/utilities/gap.test.ts.                                                                           | —                     | shipped  |
| row-gap       | selector       | Every official .row-gap step and breakpoint selector ships; resolved margins, padding, and row gaps are proved in tests/src/styles/utilities/gap.test.ts.                                                                         | —                     | shipped  |
| row           | selector       | Every `.row-gap-*` selector ships; resolved row gaps are proved in `tests/src/styles/utilities/gap.test.ts`.                                                                                                                      | —                     | shipped  |
| row           | selector       | The `.row` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                                | —                     | shipped  |
| row           | selector       | The `.row > *` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                            | —                     | shipped  |
| row           | selector       | The `.row-cols-auto > *` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                  | —                     | shipped  |
| row           | selector       | The `.row-cols-{n} > *` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                   | —                     | shipped  |
| row           | selector       | The `.row-cols-{bp}-auto > *` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.             | —                     | shipped  |
| row           | selector       | The `.row-cols-{bp}-{n} > *` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.              | —                     | shipped  |
| col           | selector       | The `.col` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                                | —                     | shipped  |
| col           | selector       | The `.col-auto` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                           | —                     | shipped  |
| col           | selector       | The `.col-{n}` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                            | —                     | shipped  |
| col           | selector       | The `.col-{bp}` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                           | —                     | shipped  |
| col           | selector       | The `.col-{bp}-auto` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                      | —                     | shipped  |
| col           | selector       | The `.col-{bp}-{n}` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                       | —                     | shipped  |
| offset        | selector       | The `.offset-{n}` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                         | —                     | shipped  |
| offset        | selector       | The `.offset-{bp}-{n}` family ships with logical sizing and margins; resolved behavior is proved in `tests/src/styles/components/grid.test.ts`. Withheld names are recorded under Styles / Deferred selectors.                    | —                     | shipped  |
| row           | variable       | The `--bs-gutter-x` property aliases `--vn-gutter-x`; default gutters and canonical and direct overrides are resolved in `tests/src/styles/components/grid.test.ts`.                                                              | —                     | shipped  |
| row           | variable       | The `--bs-gutter-y` property aliases `--vn-gutter-y`; default gutters and canonical and direct overrides are resolved in `tests/src/styles/components/grid.test.ts`.                                                              | —                     | shipped  |
| container     | selector       | Every official container selector is present, including the navigation combinators; breakpoint caps and fluid widths are resolved in `tests/src/styles/components/container.test.ts`.                                             | —                     | shipped  |
| container     | variable       | The `--bs-gutter-x` property resolves from `--vn-gutter-x` and controls inline padding, with canonical and direct overrides proved in `tests/src/styles/components/container.test.ts`.                                            | —                     | shipped  |
| container     | variable       | The `--bs-gutter-y` property resolves from `--vn-gutter-y`, with its zero default and canonical and direct overrides proved in `tests/src/styles/components/container.test.ts`.                                                   | —                     | shipped  |
| link          | selector       | Every official link selector is present; role colors read Veneer's role tokens at rest, hover, and focus instead of Bootstrap's literal state colors.                                                                             | —                     | shipped  |
| link          | variable       | The `--bs-link-opacity` utilities resolve their declared alpha; the anchor behavior is proved in `tests/src/styles/elements/a.test.ts` and the scale in `tests/src/styles/components/link.test.ts`.                               | —                     | shipped  |
| link          | variable       | The `--bs-link-underline-opacity` utilities resolve their declared alpha and control decoration independently of text, proved in `tests/src/styles/components/link.test.ts`.                                                      | —                     | shipped  |
| reboot        | selector       | Every official Reboot selector is present in the built cascade except the Excluded names under § Styles.                                                                                                                          | —                     | shipped  |
| h1            | selector       | The official `.h1` class is present in the built cascade, carrying the size token its `h1` tag carries.                                                                                                                           | —                     | shipped  |
| h2            | selector       | The official `.h2` class is present in the built cascade, carrying the size token its `h2` tag carries.                                                                                                                           | —                     | shipped  |
| h3            | selector       | The official `.h3` class is present in the built cascade, carrying the size token its `h3` tag carries.                                                                                                                           | —                     | shipped  |
| h4            | selector       | The official `.h4` class is present in the built cascade, carrying the size token its `h4` tag carries.                                                                                                                           | —                     | shipped  |
| h5            | selector       | The official `.h5` class is present in the built cascade, carrying the size token its `h5` tag carries.                                                                                                                           | —                     | shipped  |
| h6            | selector       | The official `.h6` class is present in the built cascade, carrying the size token its `h6` tag carries.                                                                                                                           | —                     | shipped  |
| small         | selector       | The official `.small` class is present in the built cascade.                                                                                                                                                                      | —                     | shipped  |
| mark          | selector       | The official `.mark` class is present in the built cascade, painting from `--vn-text-mark` and `--vn-surface-mark`.                                                                                                               | —                     | shipped  |
| lead          | selector       | The official `.lead` class is present in the built cascade.                                                                                                                                                                       | —                     | shipped  |
| display       | selector       | Every official `.display-*` class is present in the built cascade, each carrying its own `--vn-display-*` token.                                                                                                                  | —                     | shipped  |
| list-unstyled | selector       | The official `.list-unstyled` class is present in the built cascade.                                                                                                                                                              | —                     | shipped  |
| list-inline   | selector       | Every official `.list-inline` selector is present in the built cascade, its item and the spacing between items included.                                                                                                          | —                     | shipped  |
| initialism    | selector       | The official `.initialism` class is present in the built cascade.                                                                                                                                                                 | —                     | shipped  |
| blockquote    | selector       | Every official `.blockquote` selector is present in the built cascade, its last-child rule and its footer prefix included.                                                                                                        | —                     | shipped  |
| img           | selector       | The official `.img-fluid` and `.img-thumbnail` classes are present in the built cascade, written on the inline and block axes.                                                                                                    | —                     | shipped  |
| figure        | selector       | Every official `.figure` selector is present in the built cascade, its image and its caption included.                                                                                                                            | —                     | shipped  |
| btn           | selector       | Every official `.btn` selector the ledger assigns to Button is present in the built cascade; the deferred selectors are listed under § Styles                                                                                     | —                     | shipped  |
| btn           | identity       | Button identifies itself as button, bs.button, and .bs.button; defaults and type defaults are inherited empty.                                                                                                                    | button.initial        | accepted |
| btn           | attribute      | The data-bs-toggle="button" click prevents its default action and creates or reuses the instance to toggle active and aria-pressed.                                                                                               | button.click.toggle   | accepted |
| btn           | method         | toggle() flips active and aria-pressed on every activation, without a no-op guard.                                                                                                                                                | button.click.toggle   | accepted |
| btn           | method         | toggle() flips active and aria-pressed on every activation, without a no-op guard.                                                                                                                                                | button.click.release  | accepted |
| btn           | method         | The static jQueryInterface invokes toggle only when config is toggle.                                                                                                                                                             | —                     | accepted |
| btn           | initialization | defineJQueryPlugin registers Button.                                                                                                                                                                                              | —                     | accepted |
| btn           | accessibility  | A toggle announces the button role and its pressed state, rather than a checkbox role.                                                                                                                                            | button.click.toggle   | accepted |
| btn           | accessibility  | A toggle announces the button role and its pressed state, rather than a checkbox role.                                                                                                                                            | button.pressed.click  | accepted |
| btn           | accessibility  | A disabled anchor carries disabled, aria-disabled="true", tabindex="-1", and role="button"; pointer activation is refused.                                                                                                        | button.disabled.click | accepted |
| btn           | variable       | Every official `--bs-btn-*` custom property less the deferred ones is declared                                                                                                                                                    | —                     | shipped  |
| table         | selector       | The `.table` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                                                           | —                     | shipped  |
| table         | selector       | The `.table > :not(caption) > * > *` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                                   | —                     | shipped  |
| table         | selector       | The `.table > tbody` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                                                   | —                     | shipped  |
| table         | selector       | The `.table > thead` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                                                   | —                     | shipped  |
| table         | selector       | The `.table-group-divider` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                                             | —                     | shipped  |
| table         | selector       | The `.caption-top` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                                                     | —                     | shipped  |
| table         | selector       | The `.table-sm > :not(caption) > * > *` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                                | —                     | shipped  |
| table         | selector       | The `.table-bordered > :not(caption) > *` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                              | —                     | shipped  |
| table         | selector       | The `.table-bordered > :not(caption) > * > *` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                          | —                     | shipped  |
| table         | selector       | The `.table-borderless > :not(caption) > * > *` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                        | —                     | shipped  |
| table         | selector       | The `.table-borderless > :not(:first-child)` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                           | —                     | shipped  |
| table         | selector       | The `.table-striped > tbody > tr:nth-of-type(odd) > *` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                 | —                     | shipped  |
| table         | selector       | The `.table-striped-columns > :not(caption) > tr > :nth-child(even)` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                   | —                     | shipped  |
| table         | selector       | The `.table-active` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                                                    | —                     | shipped  |
| table         | selector       | The `.table-hover > tbody > tr:hover > *` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                              | —                     | shipped  |
| table         | selector       | The `.table-responsive` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                                                | —                     | shipped  |
| table         | selector       | The `.table-{role}` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                                                    | —                     | shipped  |
| table         | selector       | The `.table-responsive-{bp}` family ships in the components layer; the table browser proof reads its resolved behavior.                                                                                                           | —                     | shipped  |
| table         | variable       | The `--bs-table-color-type` property ships with the recorded table fallback and override mechanism.                                                                                                                               | —                     | shipped  |
| table         | variable       | The `--bs-table-bg-type` property ships with the recorded table fallback and override mechanism.                                                                                                                                  | —                     | shipped  |
| table         | variable       | The `--bs-table-color-state` property ships with the recorded table fallback and override mechanism.                                                                                                                              | —                     | shipped  |
| table         | variable       | The `--bs-table-bg-state` property ships with the recorded table fallback and override mechanism.                                                                                                                                 | —                     | shipped  |
| table         | variable       | The `--bs-table-color` property ships with the recorded table fallback and override mechanism.                                                                                                                                    | —                     | shipped  |
| table         | variable       | The `--bs-table-bg` property ships with the recorded table fallback and override mechanism.                                                                                                                                       | —                     | shipped  |
| table         | variable       | The `--bs-table-border-color` property ships with the recorded table fallback and override mechanism.                                                                                                                             | —                     | shipped  |
| table         | variable       | The `--bs-table-accent-bg` property ships with the recorded table fallback and override mechanism.                                                                                                                                | —                     | shipped  |
| table         | variable       | The `--bs-table-striped-color` property ships with the recorded table fallback and override mechanism.                                                                                                                            | —                     | shipped  |
| table         | variable       | The `--bs-table-striped-bg` property ships with the recorded table fallback and override mechanism.                                                                                                                               | —                     | shipped  |
| table         | variable       | The `--bs-table-active-color` property ships with the recorded table fallback and override mechanism.                                                                                                                             | —                     | shipped  |
| table         | variable       | The `--bs-table-active-bg` property ships with the recorded table fallback and override mechanism.                                                                                                                                | —                     | shipped  |
| table         | variable       | The `--bs-table-hover-color` property ships with the recorded table fallback and override mechanism.                                                                                                                              | —                     | shipped  |
| table         | variable       | The `--bs-table-hover-bg` property ships with the recorded table fallback and override mechanism.                                                                                                                                 | —                     | shipped  |
| icon-link     | selector       | Ships the icon combinator and hover/focus shifts; underline color reads `--vn-link-rgb`, and timing reads Veneer's motion tokens instead of Bootstrap values. Proof: `tests/src/styles/components/icon-link.test.ts`.             | —                     | shipped  |
| ratio         | selector       | Every official `.ratio` selector ships, the pseudo-element and the named aspects included; resolved boxes and child fill are proved in `tests/src/styles/components/ratio.test.ts`.                                               | —                     | shipped  |
| ratio         | variable       | The `--bs-aspect-ratio` property carries each name's own height over its width, and a direct override retunes any box; both are proved in `tests/src/styles/components/ratio.test.ts`.                                            | —                     | shipped  |
| vr            | selector       | The `.vr` family ships in the components layer, reading `--bs-border-width` for its inline size; resolved width, stretch, and paint are proved in `tests/src/styles/components/vr.test.ts`.                                       | —                     | shipped  |
| engine        | identity       | Cross-cutting engine: `VERSION` `'5.3.8'`; `DATA_KEY` `bs.${NAME}`; `EVENT_KEY` `.${DATA_KEY}`; `eventName(name)` returns `${name}${EVENT_KEY}`                                                                                   | —                     | accepted |
| engine        | option         | Cross-cutting engine: `Default`/`DefaultType` inherited empty from `Config` unless a component overrides                                                                                                                          | —                     | accepted |
| engine        | attribute      | Cross-cutting engine: `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last                                                                                                     | —                     | accepted |
| engine        | method         | Cross-cutting engine: `constructor(element, config)` no-op when `getElement(element)` is falsy; `dispose()`; `_queueCallback` through `executeAfterTransition`                                                                    | —                     | accepted |
| engine        | method         | Cross-cutting engine: static `getInstance`, static `getOrCreateInstance(element, config = {})`, static `VERSION`                                                                                                                  | —                     | accepted |
| engine        | initialization | Cross-cutting engine: `Data.set(this._element, DATA_KEY, this)` on construction                                                                                                                                                   | —                     | accepted |
| engine        | method         | Cross-cutting engine: All API methods are asynchronous, return to the caller before the transition ends, and a method call mid-transition is ignored                                                                              | —                     | accepted |
| engine        | method         | Cross-cutting engine: `dispose()` must not follow `hide()` immediately; wait for the completion event                                                                                                                             | —                     | accepted |
| engine        | event          | Cross-cutting engine: Every plugin fires paired infinitive/past-participle events; `EventHandler.trigger` builds `new Event(event, { bubbles, cancelable: true })` and hydrates the payload                                       | —                     | accepted |
| engine        | event          | Cross-cutting engine: Infinitive events are cancelable through `event.preventDefault()`; returning `false` from a handler also cancels                                                                                            | —                     | accepted |
| engine        | option         | Cross-cutting engine: `Config._mergeConfigObj`: `Default`, then `data-bs-config` JSON, then `getDataAttributes`, then the `config` object; `_typeCheckConfig` type-checks against `DefaultType`                                   | —                     | accepted |
| engine        | attribute      | Cross-cutting engine: `Manipulator.getDataAttributes` reads every `dataset` key starting `bs` except `bsConfig`, kebab-cased through `data-bs-*`                                                                                  | —                     | accepted |
| engine        | method         | Cross-cutting engine: `SelectorEngine.getSelector` reads `data-bs-target` else `href`; `find`, `findOne`, `children`, `parents`, `prev`, `next`, `focusableChildren`, `getElementFromSelector`, `getMultipleElementsFromSelector` | —                     | accepted |
| engine        | method         | Cross-cutting engine: `Data.set`/`get`/`remove`; one instance per element, a second key logs an error and returns                                                                                                                 | —                     | accepted |
| engine        | attribute      | Cross-cutting engine: `enableDismissTrigger(component, method = 'hide')` binds document `click.dismiss${EVENT_KEY}` on `[data-bs-dismiss="${NAME}"]`                                                                              | —                     | accepted |
| engine        | transition     | Cross-cutting engine: `TRANSITION_END` emulation: listens `transitionend`, emulates after `getTransitionDurationFromElement` plus `5` ms padding through `executeAfterTransition`                                                 | —                     | accepted |
| engine        | accessibility  | Cross-cutting engine: Sanitizer allowlist and `sanitizeFn` override on Tooltip/Popover content                                                                                                                                    | —                     | accepted |
| engine        | attribute      | Cross-cutting engine: Native `querySelector`/`querySelectorAll`; a CSS special character in a selector must be escaped                                                                                                            | —                     | accepted |
| engine        | option         | util/config.js: Base `Config` class; `Default: {}`, `DefaultType: {}`; `NAME` getter throws; extended by `BaseComponent`, `Backdrop`, `FocusTrap`, `Swipe`, `TemplateFactory`                                                     | —                     | accepted |
| engine        | method         | util/index.js: `getUID`, `getElement`, `isElement`, `isVisible`, `isDisabled`, `isRTL`, `toType`, `noop`, `parseSelector`, `reflow`, `execute`, `findShadowRoot`, `getNextActiveElement` exported as shared utilities             | —                     | accepted |
| engine        | initialization | util/index.js: `getjQuery` skipped when `document.body` carries `data-bs-no-jquery`; `defineJQueryPlugin` registers `$.fn[NAME]` after `onDOMContentLoaded`                                                                       | —                     | accepted |

An accepted row records scope; a named Proof step obliges the official recording to agree with the
row. A shipped selector or variable row requires its official vocabulary less the deferrals under
§ Styles to be present in the built cascade; no deferred name may be present, and each must belong
to the official inventory of a component with a CSS row. The conformance component list includes a
key exactly when its selector and variable rows are shipped. Those CSS rows carry a dash in Proof,
as do source and engine obligations the Button interaction recording cannot drive. Transition, dismissal, sanitizer, and selector
engine rows record shared engine scope; they do not claim that Button dispatches transition events.
The jQuery rows retain the source inventory while the exclusion that follows limits the claim.

The compatibility claim excludes contextual Reboot selectors that combine bare tags: nested
ordered and unordered lists, code inside preformatted text or links, nested keyboard tags, and the
sibling after a legend. It also excludes the jQuery interface and plugin registration, the
window.bootstrap global and UMD namespace, and Bootstrap's Sass variables, maps, and mixins as a
source API. Popper pass-through positioning options remain accepted wire keys with platform
anchoring as an accepted difference. The sanitizer allowlist and sanitizer overrides remain in
scope for the overlay unit.

## Showcase

The private application renders the Veneer heading, the Dark mode button, a Showcase region, and a
Buttons region carrying every declared button specimen, a Content region carrying the
text specimens, lists, quotations, code, media, tables, form controls, and interactive tags, a Type
region carrying the typography, list, and quotation classes, and a Media region carrying the image
and figure classes beside the aspect-ratio boxes, and a Links region carrying the link classes and
the icon links, and a Layout region carrying the container, grid, and gutter specimens and the
vertical rule, and a Table region carrying the table variant and responsive specimens. Each helper
key sits in the region whose subject it belongs to rather than in a region of its own, which is how
every other section is grouped: the image classes and the figure classes share Media, and the
quotation classes sit in Type. Its button drives the controller and
announces the selected mode, and its entry constructs a `Delegate` instance beside the showcase.
The application barrel is a workspace implementation surface and is outside this guide's published
API tables.

Scaffold mandates the Vue toolchain for an `app/browser` environment, and this shell declares no
component in it: the shell is framework-free by design, so the showcase drives the published
cascade and the published engine with no framework between them and what renders.

The styles entry declares the cascade order `theme, reset, base, elements, components, utilities`,
every `--vn-*` token, every `--bs-*` root alias Bootstrap 5.3.8 declares, and the document and body
baseline. It also ships the bare button treatment in the `elements` layer, and the `.btn` treatments beside
the typography, list, quotation, image, link, container, grid, table, icon-link, ratio, and
vertical-rule classes in the `components` layer. The document baseline also
declares `interpolate-size: allow-keywords`, and `tests/src/styles/elements/html.test.ts` reads it
there.
That proves the declaration reaches the document; what it interpolates is proved by the first unit
that animates a keyword length. § Tokens gives each token's value and
source.

## Tests

The core proof reads the registry's export set, its freeze, and its path law; see
[token registry](../tests/src/core/index.test.ts).
The browser proofs cover the controller and the guard; see
[controller behavior](../tests/src/browser/ColorMode.test.ts) and
[mode validation](../tests/src/browser/validators.test.ts).
The application proofs drive the shell through its interface; see
[showcase mounting and destruction](../tests/app/browser/Showcase.test.ts),
[specimen rendering and engine ownership](../tests/app/browser/sections/ButtonSection.test.ts),
[typography class specimens](../tests/app/browser/sections/TypeSection.test.ts),
[media class specimens](../tests/app/browser/sections/MediaSection.test.ts), and
[showcase journeys](../tests/app/browser/integration.test.ts).
The style proofs bind the cascade to the registry and to the calibration; see
[token parity and values](../tests/src/styles/tokens.test.ts),
[theme scopes](../tests/src/styles/theme.test.ts),
[declaration mixins](../tests/src/styles/mixins.test.ts),
[layer order and direction neutrality](../tests/src/styles/index.test.ts),
[the reset layer](../tests/src/styles/reset.test.ts),
[the document baseline](../tests/src/styles/elements/html.test.ts),
[the body baseline](../tests/src/styles/elements/body.test.ts),
[the typography classes](../tests/src/styles/components/type.test.ts),
[the list classes](../tests/src/styles/components/list.test.ts),
[the quotation classes](../tests/src/styles/components/quote.test.ts),
[the image classes](../tests/src/styles/components/image.test.ts),
[the button classes](../tests/src/styles/components/button.test.ts),
[the link classes](../tests/src/styles/components/link.test.ts),
[the container classes](../tests/src/styles/components/container.test.ts),
[the grid classes](../tests/src/styles/components/grid.test.ts),
[the table classes](../tests/src/styles/components/table.test.ts),
[the icon link classes](../tests/src/styles/components/icon-link.test.ts),
[the ratio classes](../tests/src/styles/components/ratio.test.ts),
[the vertical rule](../tests/src/styles/components/vr.test.ts),
[the gutter utilities](../tests/src/styles/utilities/gap.test.ts), and
[the customization recipe](../tests/src/styles/integration.test.ts).

The conformance proofs pin the official release and its artifact digests, reject runtime boundary
escapes, check shipped CSS vocabulary, compare each live Button step with its fixture, and
cross-check the compatibility rows; see [Bootstrap conformance](../tests/conformance.test.ts).
The helper proofs read compatibility tables, built CSS, and the pinned inventory; see
[conformance readers and recorder](../tests/setupConformance.test.ts).
