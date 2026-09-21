# CL6 scout — report

Engine: Cursor Grok 4.6 through the Cursor CLI, read-only, under
`.orkestrel/veneer/units/cl6-scout-brief.md`.
Journal: `C:/Users/mikes/WebstormProjects/scaffold/tmp/cursor/cl6-scout.jsonl` (stderr journal
`tmp/cursor/cl6-scout.err`, empty). Session id `af42f8d5-977e-4b1d-815d-382f57f8d9ff`.

The driver reported that the scaffold checkout's status changed during the run, entirely in
`.orkestrel/veneer/` files its script never wrote. That was the Orchestrator's own retention and
commit activity in the same checkout, not an effect of the launch.

The distillate follows, with the raw stream's HTML entities restored.

## 1. The `link` key

`components.link` lives in the Bootstrap 5.3.8 inventory (`tests/fixtures/oracle/inventory.json:7`,
`:78544`). Each selector object carries `selector`, `declarations`, `classes`, and pseudo fields,
and no per-selector `properties` object. The entry-level `properties` keys are
`--bs-link-opacity` and `--bs-link-underline-opacity` (`:80413-80541`). A flattened
`declarations` index follows the selector list (`:79731`) and restates the same rules.

**No selector under this key is emitted by `src/styles/elements/_a.scss`**, which writes `a`,
nested `a:hover`, `a:not([href]):not([class])`, and that compound's hover (`_a.scss:2-15`).

### Coloured links, at rest, hover, and focus

Every state carries the same declaration trio: `color`, `-webkit-text-decoration-color`, and
`text-decoration-color`.

| Selector family | Rest colour and decoration | Hover and focus |
| --- | --- | --- |
| `.link-primary` (`:78547`, `:78569`, `:78591`) | `RGBA(var(--bs-primary-rgb), var(--bs-link-opacity, 1))`, decoration through `--bs-link-underline-opacity` | literal `10, 88, 202` (`:78573`, `:78595`) |
| `.link-secondary` (`:78613`, `:78635`, `:78657`) | `--bs-secondary-rgb` | literal `86, 94, 100` |
| `.link-success` (`:78679`, `:78701`, `:78723`) | `--bs-success-rgb` | literal `20, 108, 67` |
| `.link-info` (`:78745`, `:78767`, `:78789`) | `--bs-info-rgb` | literal `61, 213, 243` |
| `.link-warning` (`:78811`, `:78833`, `:78855`) | `--bs-warning-rgb` | literal `255, 205, 57` |
| `.link-danger` (`:78877`, `:78899`, `:78921`) | `--bs-danger-rgb` | literal `176, 42, 55` |
| `.link-light` (`:78943`, `:78965`, `:78987`) | `--bs-light-rgb` | literal `249, 250, 251` |
| `.link-dark` (`:79009`, `:79031`, `:79053`) | `--bs-dark-rgb` | literal `26, 30, 33` |
| `.link-body-emphasis` (`:79075`) | `RGBA(var(--bs-emphasis-color-rgb), var(--bs-link-opacity, 1))` | the same variable with fallback `0.75` (`:79097`, `:79119`) |

The role classes' hover and focus states use **literal RGB triplets**, not
`--bs-link-hover-color-rgb`.

### The utility families

- **Opacity** (`:79141-79267`): each sets `--bs-link-opacity` alone, at `0.1`, `0.25`, `0.5`,
  `0.75`, and `1`, each with a `-hover:hover` twin. There is no zero member under this key. The
  same names appear as values under `properties["--bs-link-opacity"]` (`:80414-80454`).
- **Offset** (`:79281-79351`): each sets `text-underline-offset` alone, at `0.125em`, `0.25em`,
  and `0.375em`, each with a `-hover:hover` twin.
- **Underline colour** (`:79365-79541`): each sets `--bs-link-underline-opacity: 1` plus the two
  decoration-colour properties, reading `rgba(var(--bs-<role>-rgb), var(--bs-link-underline-opacity))`.
  `.link-underline` reads `var(--bs-link-color-rgb)` with a fallback of `1`.
- **Underline opacity** (`:79563-79717`): each sets `--bs-link-underline-opacity` alone, at `0`,
  `0.1`, `0.25`, `0.5`, `0.75`, and `1`, each with a `-hover:hover` twin.

### The comparison entries

`focus-ring` (`:80547`) is role classes setting `--bs-focus-ring-color` plus `.focus-ring:focus`;
its properties key is `--bs-focus-ring-color` (`:80732`). `icon-link` (`:80772`) is layout plus
`rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 0.5))`, the same Bootstrap variables with
a different fallback; its properties object is empty (`:80972`).

## 2. The anchor partial

`src/styles/elements/_a.scss` is one `@layer elements` block.

The `a` rule (`:2-7`) sets `color: rgba(var(--vn-link-rgb), var(--bs-link-opacity, 1))` at `:3`,
`text-decoration: var(--vn-link-decoration)` at `:4`, and a nested hover at `:5-7` reading
`rgba(var(--vn-link-hover-rgb), var(--bs-link-opacity, 1))`.

The `a:not([href]):not([class])` rule (`:9-15`) sets `color: inherit` and
`text-decoration: none` on the element and its hover, with no token. The case table mounts that
host with `color: var(--vn-text-body-base)` (`a.test.ts:18`).

### The opacity expression

Written twice, at rest and at hover (`_a.scss:3`, `:6`):

```text
rgba( var(--vn-link-rgb) | var(--vn-link-hover-rgb) , var(--bs-link-opacity, 1) )
```

| Operand | Resolves to |
| --- | --- |
| `--vn-link-rgb` | the Veneer channel triplet from `theme-tokens` (`_mixins.scss:218`): light `8, 65, 234` (`_tokens.scss:45`), dark `85, 205, 243` (`:92`) |
| `--vn-link-hover-rgb` | the same mixin (`_mixins.scss:220`): light `6, 52, 187` (`_tokens.scss:47`), dark `119, 215, 246` (`:94`) |
| `--bs-link-opacity` | **not declared** in `_tokens.scss`, `_theme.scss`, or `_mixins.scss`. The fallback `1` applies unless an ancestor sets it. An island proof sets `--bs-link-opacity: 0.5` and reads `rgba(8, 65, 234, 0.5)` (`a.test.ts:52-61`) |

It computes an sRGB colour whose channels come from Veneer's link or link-hover triplet and whose
alpha is Bootstrap's link opacity, opaque by default. Rest reads the link triplet and hover the
hover triplet; the alpha variable is the same in both, and hover is a second `rgba()` call rather
than a reassignment of the rest triplet.

The case table expects those resolved values (`setupStyles.ts:9-16`; `a.test.ts:25`, `:34-35`). A
placeholder anchor with neither `href` nor `class` stays body colour with no underline, including
on hover (`a.test.ts:31-43`); a classed anchor without `href` keeps its underline (`:44-49`).

## 3. The tokens

`_theme.scss` contains no `link` string. It produces the mode-dependent link tokens only by
including `theme-tokens` on the light and dark theme attributes (`_theme.scss:10-17`), and
`:root` includes the light set (`_tokens.scss:311`). The partial's opacity expression is not
produced there.

### Veneer's own tokens

| Token | Light | Dark | Emitted at |
| --- | --- | --- | --- |
| `--vn-link-base` | `var(--vn-color-primary-base)` (`_tokens.scss:44`) | `color-mix(in srgb, var(--vn-palette-white-base) 40%, var(--vn-color-primary-base))` (`:91`) | `_mixins.scss:217` |
| `--vn-link-rgb` | `8, 65, 234` (`:45`) | `85, 205, 243` (`:92`) | `_mixins.scss:218`, read by `_a.scss:3` |
| `--vn-link-hover-base` | `color-mix(in srgb, var(--vn-palette-black-base) 20%, var(--vn-link-base))` (`:46`) | `color-mix(in srgb, var(--vn-palette-white-base) 20%, var(--vn-link-base))` (`:93`) | `_mixins.scss:219` |
| `--vn-link-hover-rgb` | `6, 52, 187` (`:47`) | `119, 215, 246` (`:94`) | `_mixins.scss:220`, read by `_a.scss:6` |
| `--vn-link-decoration` | `underline` | `underline` | `:root` at `_tokens.scss:210`, read by `_a.scss:4` |

The decoration token is mode-independent; the colour tokens are not.

### The Bootstrap properties Veneer aliases

Emitted beside the Veneer tokens (`_mixins.scss:251-254`): `--bs-link-color` reads
`--vn-link-base`, `--bs-link-color-rgb` reads `--vn-link-rgb`, `--bs-link-hover-color` reads
`--vn-link-hover-base`, and `--bs-link-hover-color-rgb` reads `--vn-link-hover-rgb`. A
mode-independent alias on `:root` (`_tokens.scss:365`) gives `--bs-link-decoration` the Veneer
decoration token.

### The Bootstrap properties the partial reads through

`--bs-link-opacity` is consumed at `_a.scss:3` and `:6` with a fallback of `1`, and the inventory
utilities assign it (`inventory.json:79144`, properties key `:80414`); the mixins, tokens, and
theme never write it. `--bs-link-underline-opacity` appears in the inventory only (`:80456`) and
the anchor partial does not read it.

So the partial mixes Veneer's own triplets with Bootstrap's opacity variable. It does not read
`--bs-link-color`, `--bs-link-color-rgb`, or `--bs-link-hover-color-rgb`; those aliases exist for
other consumers, and the inventory's `.link-underline` and `.icon-link` read the colour triplet.

## 4. The record and the guide

The calibration table's anchor section is `calibration-content.md:1205-1338`. The Chromium and
Edge columns agree on every row, and the states recorded are rest and hover.

**Type**, identical at rest and hover (`:1209-1214`, `:1274-1279`): the system font stack
beginning `system-ui`, `font-size` `14px`, `line-height` `21px`, `font-weight` `400`,
`font-style` `normal`, `letter-spacing` `normal`.

**Colour.** Rest `color` (`:1215`) is `oklab(0.3984 -0.019591 -0.190088)` light and
`oklab(0.7458 -0.0728685 -0.0983535)` dark. Hover `color` (`:1280`) is
`color(srgb 0.0407929 0.170295 0.538144)` light and `color(srgb 0.248988 0.580565 0.745237)`
dark. The decoration colour tracks the colour in each state (`:1245`, `:1310`). The specimen's
own `--set-a-color` (`:1272`, `:1337`) equals `--color-primary-on-canvas` (`:1270`, `:1335`), a
70% mix of primary over the canvas text in light and an 80% mix in dark, and **it does not change
on hover**. The specimen's `--color-primary` (`:1269`, `:1334`) carries the same numbers as
Veneer's `--vn-color-primary-base` (`_tokens.scss:24`, `:68`).

**Decoration** (`:1243-1247`, `:1308-1312`, `:1273`, `:1338`): line `underline`, style `solid`,
thickness `auto`, offset `auto`.

**Opacity** (`:1263`, `:1328`) is `1` in every engine, mode, and state. That is the element's own
`opacity` property, not the Bootstrap link opacity variable.

**Box and user-agent rows** (rest `:1216-1262`, hover `:1281-1327`): transparent background, zero
margin, padding, and border width, `display` `inline`, `cursor` `pointer`, `text-align` `start`,
automatic sizes.

### What the shipped anchor matches

`a.test.ts:13` already records that the tokens keep their current values and that the calibration
difference is reported.

| Recorded reading | The shipped anchor |
| --- | --- |
| Rest colour and decoration colour | **Does not match.** The shipped rest is `rgb(8, 65, 234)` light and `rgb(85, 205, 243)` dark (`setupStyles.ts:13`; `_a.scss:3`), the primary fill channels rather than the record's mix (`:1272`) |
| Hover colour | **Does not match.** The shipped hover is `rgb(6, 52, 187)` light and `rgb(119, 215, 246)` dark (`setupStyles.ts:14`; `_a.scss:6`), a 20% shade of the link base rather than the record's pair (`:1280`) |
| The specimen's own colour property | **Not shipped.** Veneer has no such property |
| Decoration line `underline` | **Matches** through `--vn-link-decoration` (`_tokens.scss:210`; `_a.scss:4`; `a.test.ts:26`) |
| Element opacity `1` | **Matches** the opaque fallback when the Bootstrap variable is unset |
| The specimen's primary against Veneer's primary base | **Matches as a token**, not as something the partial sets |
| Type rows | **Match the body tokens** (`_tokens.scss:211-239`); the partial sets none of them |
| `cursor: pointer` | **Not in the partial.** It is the user-agent rule for a linked anchor |
| The placeholder anchor's inherited colour | **Not in the record**, whose specimen is a real link. Shipped and proved (`_a.scss:9-14`; `a.test.ts:31-43`) |

### The guide rows

No row in the parity table (`guides/veneer.md:758-792`) has `link` as its Component; that table
carries `reboot`, `btn`, and `engine` only.

The token subsection under links (`:472-481`) has Token, Light, Dark, Source, and Alias columns
rather than Status and Owner. The link base and its triplet take Source `derived` and alias the
Bootstrap colour pair (`:479`); the hover base and its triplet do the same (`:480`); the
decoration token takes Source `bootstrap`, because no Elements specimen measures decoration, and
aliases the Bootstrap decoration property (`:481`).

One deferral row names an anchor selector: `a > code` (`:220`), Owner `Excluded`, because a
contextual code treatment infers styling from tag composition.

The showcase text still says the cascade ships the bare button and its class and no treatment for
another component (`:824-827`). No link showcase section exists in the guide yet.
