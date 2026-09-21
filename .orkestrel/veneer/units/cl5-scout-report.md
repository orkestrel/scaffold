# CL5 scout — report

Engine: Cursor Grok 4.6 through the Cursor CLI, read-only, under
`.orkestrel/veneer/units/cl5-scout-brief.md`.
Journal: `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/cl5-scout.jsonl` (stderr journal
`tmp/cursor/cl5-scout.err`, empty). Session id `3d1df649-f9a7-4ad2-93d7-34ddbab64362`.

The distillate follows verbatim, with the raw stream's HTML entities restored to the characters
they name.

---

Inventory entries are class selectors with empty `properties` objects. The inventory field is
`selectors` (objects with a `selector` string), not a root `selector` array. Every CL5 key's
`properties` object is `{}`; property names below come from that key's `declarations`.

## 1. The keys by partial

Every inventory selector for these keys is a class selector (`"elements": []`). The allowed files
never define a symbol named "elements-layer guard". What they do show: CL3 and CL4 element
partials emit **tag** selectors inside `@layer elements`; CL4's `components/_button.scss` emits
**class** selectors inside `@layer components`.

**No inventory selector string is already emitted verbatim** by a CL3 or CL4 partial. Named
overlaps (class key against tag partial) are marked on the row. A **candidate exclusion** is a
selector that would be refused if placed in `@layer elements` (class, not tag), or that repeats
work an element partial already does.

### `components/_type.scss`

**`h1`** — selectors: `.h1` (`tests/fixtures/oracle/inventory.json:5452`, `:5482`, `:5497` with
`@media (min-width: 1200px)`). Declaration properties: `margin-top`, `margin-bottom`,
`font-weight`, `line-height`, `color`, `font-size`. **Overlap:** `elements/_heading.scss:2-16`
already emits the **tag** `h1` (margin `0`, `font-weight: var(--vn-weight-heading)` which is
`600` at `_tokens.scss:239`, `line-height: var(--vn-line-heading)`,
`color: var(--bs-heading-color)`, `font-size: var(--vn-size-8)` = `2.25rem` at
`_tokens.scss:226`). Inventory `.h1` uses weight `500`, `margin-bottom: 0.5rem`, fluid
`font-size` `calc(1.375rem + 1.5vw)` capping at `2.5rem`. **Candidate exclusion from
`@layer elements`:** `.h1` is a class.

**`h2`** — selectors: `.h2` (`inventory.json:5348`, `:5379`, `:5393` with
`@media (min-width: 1200px)`). Properties: `margin-top`, `margin-bottom`, `font-weight`,
`line-height`, `color`, `font-size`. **Overlap:** tag `h2` in `_heading.scss` (`--vn-size-7` =
`1.875rem`). **Candidate exclusion from `@layer elements`:** `.h2` is a class.

**`h3`** — selectors: `.h3` (`inventory.json:5244`, `:5275`, `:5289` with
`@media (min-width: 1200px)`). Same property names as `h1`. **Overlap:** tag `h3` (`--vn-size-6`
= `1.5rem`). **Candidate exclusion from `@layer elements`:** `.h3` is a class.

**`h4`** — selectors: `.h4` (`inventory.json:5140`, `:5171`, `:5185` with
`@media (min-width: 1200px)`). Same property names. **Overlap:** tag `h4` (`--vn-size-5` =
`1.25rem`). **Candidate exclusion from `@layer elements`:** `.h4` is a class.

**`h5`** — selectors: `.h5` (`inventory.json:5056`, `:5087`). Same property names; no media
condition. Inventory `font-size` `1.25rem` equals `--vn-size-5`, which `_heading.scss:15` assigns
to **tag `h4`**, not `h5` (`--vn-size-4` = `1.125rem`). **Candidate exclusion from
`@layer elements`:** `.h5` is a class.

**`h6`** — selectors: `.h6` (`inventory.json:4972`, `:5003`). Same property names; no media
condition. Inventory `font-size` `1rem` equals `--vn-size-3` used for tag `h6`. **Candidate
exclusion from `@layer elements`:** `.h6` is a class.

**`small`** — selectors: `.small` (`inventory.json:5556`). Properties: `font-size` (`0.875em`).
**Overlap:** tag `small` in `elements/_small.scss:2-3` (`font-size: 87.5%`). **Candidate
exclusion from `@layer elements`:** `.small` is a class.

**`mark`** — selectors: `.mark` (`inventory.json:5585`). Properties: `padding`, `color`,
`background-color`. **Overlap:** tag `mark` in `elements/_mark.scss:2-3` (`padding: 0 0.1875em`
only; no color or background). Inventory `.mark` uses `padding: 0.1875em` on all sides plus
`var(--bs-highlight-color)` and `var(--bs-highlight-bg)`. **Candidate exclusion from
`@layer elements`:** `.mark` is a class.

**`lead`** — selectors: `.lead` (`inventory.json:5632`). Properties: `font-size`, `font-weight`.
**Overlap:** none on this selector. `elements/_p.scss:2-3` styles tag `p` with `margin: 0` only.
**Candidate exclusion from `@layer elements`:** `.lead` is a class.

**`display`** — selectors: `.display-1`, `.display-2`, `.display-3`, `.display-4`, `.display-5`,
`.display-6` (each once unbounded and once under `@media (min-width: 1200px)`; starts
`inventory.json:5670`). Properties: `font-weight`, `line-height`, `font-size`. **Overlap with
heading classes:** `.display-6` unbounded `font-size` `calc(1.375rem + 1.5vw)` and cap `2.5rem`
(`inventory.json:5867`, `:5881`) match `.h1` (`inventory.json:5486`, `:5500`). **Overlap with
heading elements:** none on these selectors; tag `h1` uses `--vn-size-8` (`2.25rem`) with no
media query (`_heading.scss:14-16`). Tokens already name `--vn-display-1` through
`--vn-display-6` (`_tokens.scss:228-233`) matching the large-viewport caps. **Candidate exclusion
from `@layer elements`:** every `.display-*` is a class.

**`initialism`** — selectors: `.initialism` (`inventory.json:6136`). Properties: `font-size`,
`text-transform`. **Overlap:** none on this selector. `elements/_abbr.scss:2-5` styles
`abbr[title]`, not `.initialism`. **Candidate exclusion from `@layer elements`:** `.initialism`
is a class.

### `components/_list.scss`

**`list-unstyled`** — selectors: `.list-unstyled` (`inventory.json:6022`). Properties:
`padding-left`, `list-style`. **Overlap:** none on this selector. `elements/_ul.scss:4-6` and
`elements/_ol.scss:4-6` emit tags `ul` and `ol` through `list-space` (start padding, not zero).
**Candidate exclusion from `@layer elements`:** `.list-unstyled` is a class.

**`list-inline`** — selectors: `.list-inline`, `.list-inline-item`,
`.list-inline-item:not(:last-child)` (`inventory.json:6060`, `:6078`, `:6092`). Properties:
`padding-left`, `list-style`, `display`, `margin-right`. **Overlap:** none on these selectors;
same tag `ul` and `ol` partials as the preceding row. **Candidate exclusion from
`@layer elements`:** all three are class selectors.

### `components/_quote.scss`

**`blockquote`** — selectors: `.blockquote`, `.blockquote > :last-child`, `.blockquote-footer`,
`.blockquote-footer::before` (`inventory.json:6174`, `:6192`, `:6206`, `:6232`). Properties:
`margin-bottom`, `font-size`, `margin-top`, `color`, `content`. **Overlap:** tag `blockquote` in
`elements/_blockquote.scss:2-6` (`margin`, inline padding, inline border, `font-style: italic`),
not these class selectors. **Candidate exclusion from `@layer elements`:** all four are class
selectors.

### `components/_image.scss`

**`img`** — selectors: `.img-fluid`, `.img-thumbnail` (`inventory.json:6296`, `:6314`).
Properties: `max-width`, `height`, `padding`, `background-color`, `border`, `border-radius`.
**Overlap:** tag `img` in `elements/_img.scss:2-6` (`display: block`, `max-inline-size: 100%`,
`block-size: auto`, `vertical-align: middle`). **Candidate exclusion:** `.img-fluid`
(`max-width: 100%`; `height: auto`) repeats the fluid sizing `_img.scss` already applies to every
`img` (logical against physical property names). `.img-thumbnail` adds padding, background,
border, and radius on top of that sizing, which is not the same as the element rule. **Candidate
exclusion from `@layer elements`:** both are classes.

**`figure`** — selectors: `.figure`, `.figure-img`, `.figure-caption` (`inventory.json:6398`,
`:6412`, `:6430`). Properties: `display`, `margin-bottom`, `line-height`, `font-size`, `color`.
**Overlap:** `elements/_figure.scss:4-14` emits tags `figure` (`display: flex`; column; gap;
`margin: 0`) and `figcaption` (`caption-text` plus `line-height: 1.4`). Inventory `.figure` is
`display: inline-block`. A `figure.figure` host would carry the element flex rule and the class
`inline-block` rule; `@layer` order puts `components` after `elements` (`_tokens.scss:4`).
**Candidate exclusion from `@layer elements`:** all three are classes.

## 2. The section interface

**Contract** (`app/browser/types.ts:10-15`): `SectionInterface` with `readonly host: HTMLElement`
and `destroy(): void`.

`ShowcaseInterface` (`types.ts:2-7`) is the same pair on the page shell: `host` and `destroy()`.

**Construction** (`app/browser/Showcase.ts:26-35`, `:53-68`): the constructor writes `#sections`
from `#mount()`. `#mount()` appends `header` and `main` to `host`, then returns
`[new ButtonSection(this.#main), new ContentSection(this.#main)]`. Each section's constructor
takes the host and mounts immediately (`ContentSection.ts:22-36`; `ButtonSection.ts:32-36`).

**Destruction** (`Showcase.ts:41-47`): `destroy()` calls `section.destroy()` for each entry in
`#sections`, then removes the theme listener, `header`, `main`, and the `ColorMode` controller.
`ContentSection.destroy()` (`ContentSection.ts:42-44`) removes its region only.
`ButtonSection.destroy()` (`ButtonSection.ts:42-46`) destroys engines in construction order, then
removes the region.

**Specimens in `constants.ts`:** a frozen copy object plus a frozen specimens array.

- Content: `CONTENT_COPY` (`constants.ts:235-238`) and
  `CONTENT_SPECIMENS: readonly ContentSpecimen[]` (`constants.ts:241-354`). `ContentSpecimen`
  (`types.ts:18-23`) is `name` plus `markup`.
- Buttons: `BUTTON_COPY` (`constants.ts:12-15`), `BUTTON_GRID` (`constants.ts:18`), and
  `BUTTON_SPECIMENS: readonly ButtonSpecimen[]` (`constants.ts:29-232`). `ButtonSpecimen`
  (`types.ts:26-41`) is `name`, `tag`, `classes`, `attributes`, `nested`.

**Pattern to mirror:** `ContentSection` (`app/browser/sections/ContentSection.ts`) and
`tests/app/browser/sections/ContentSection.test.ts`. These CL5 keys have no engine in the
inventory. `ContentSection` mounts markup from `CONTENT_SPECIMENS`, exposes `host`, and
`destroy()` only removes the region. The proof asserts region `aria-label`, specimen name order,
markup fidelity, frozen tables, and repeated `destroy()` leaving a neighbour
(`ContentSection.test.ts:7-135`).

`CONTENT_SPECIMENS` already renders **tag** counterparts (`<h1>` through `<h6>`, `<small>`,
`<mark>`, `<blockquote>`, `<figure>`, `<img>` at `constants.ts:242-296`) and does not render
`.h1`, `.lead`, `.display-*`, `.list-unstyled`, `.list-inline`, `.initialism`, `.blockquote`,
`.img-fluid`, or `.figure`. `ButtonSection` is the other live `SectionInterface` implementor; it
is the class-grid and engine pattern (`ButtonSection.ts:22-76`, `ButtonSection.test.ts`).

## 3. The component folder

`src/styles/components/` holds `src/styles/components/_button.scss` only.

`src/styles/index.scss:43` loads it with `@use 'components/button' as button-component;`. There is
no `@use` of a type, list, quote, or image partial. `src/styles/index.ts:1` re-exports the sheet
through `import './index.scss'`.

Layer order is `@layer theme, reset, base, elements, components, utilities` (`_tokens.scss:4`).
`_button.scss:4` wraps its rules in `@layer components`. Element typography and content partials
wrap in `@layer elements` (`_heading.scss:1`, `_small.scss:1`, `_mark.scss:1`,
`_blockquote.scss:1`, `_img.scss:1`, `_figure.scss:3`, `_ul.scss:3`, `_ol.scss:3`, `_p.scss:1`).

The rest of `src/styles/` as it stands: `_tokens.scss`, `_mixins.scss`, `_reset.scss`,
`_theme.scss`, `index.scss`, `index.ts`, `elements/` (html, body, heading, p, hr, a, ul, ol, dl,
blockquote, address, abbr, strong, small, mark, sub, sup, code, kbd, pre, samp, var, b, figure,
img, svg, table, tr, label, input, select, optgroup, textarea, fieldset, output, iframe, details,
progress, button), and `components/_button.scss`. `index.scss:1-43` `@use`s tokens, theme, reset,
those element partials, then the button component.

**Mixins a type, list, quote, or image partial would read** (inventory media is
`@media (min-width: 1200px)`; `breakpoints()` names that width `xl` at `_mixins.scss:65`):

- `caption-text` (`_mixins.scss:22-26`) — already included by `elements/_figure.scss:1,11`
- `list-space` (`_mixins.scss:52-55`) — already included by `elements/_ul.scss:1,5` and
  `_ol.scss:1,5`
- `breakpoints` (`_mixins.scss:64-66`), `breakpoint` (`_mixins.scss:70-76`), `breakpoint-up`
  (`_mixins.scss:82-91`) — the `h1` through `h4` and `display-*` inventory media
- `border-reset` (`_mixins.scss:10-14`) — thumbnail-style border reset

**Also exported from `_mixins.scss`:** `control-text` (`:3`), `box-reset` (`:16`), `cell-space`
(`:28`), `code-text` (`:33`), `script-text` (`:40`), `code-surface` (`:47`), `breakpoint-down`
(`:98`), `reduced-motion` (`:107`), `transition` (`:113`), `forced-colors` (`:120`),
`focus-ring` (`:126`), `role-each` (`:157`), `theme-tokens` (`:186`).
`components/_button.scss:2` already includes this file as `*`.

## 4. The guide rows

**§ Compatibility** (`guides/veneer.md:746-792`) columns are Component, Kind, Obligation, Proof,
**Status**. Inventory keys present: `reboot` (selector, Status `shipped`, `:760`), `btn`
(selector, identity, attribute, method, initialization, accessibility, and variable rows, Status
`shipped` or `accepted`, `:761-771`), `engine` (Status `accepted`, `:772-792`).

These CL5 keys **do not appear** as Component values: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`,
`small`, `mark`, `lead`, `display`, `list-unstyled`, `list-inline`, `initialism`, `blockquote`,
`img`, `figure`.

**§ Deferred selectors** (`guides/veneer.md:208-285`) columns are Name, **Owner**, Reason. No
Status column. No row's Name is a CL5 inventory selector (`.h1` through `.h6`, `.small`, `.mark`,
`.lead`, `.display-1` through `.display-6`, `.list-unstyled`, `.list-inline`,
`.list-inline-item`, `.initialism`, `.blockquote`, `.blockquote-footer`, `.img-fluid`,
`.img-thumbnail`, `.figure`, `.figure-img`, `.figure-caption`). Nearby list rows are `ol ol`,
`ul ul`, `ol ul`, `ul ol` (Owner `Excluded`, `:215-218`), not `list-unstyled` or `list-inline`.
