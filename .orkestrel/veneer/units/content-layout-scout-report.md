<!-- Retained from tmp/cursor/content-layout-scout.result.txt. Bench lane: grok on Cursor Grok 4.6 High, journal content-layout-scout.jsonl, session 488b4193-1117-4c17-9083-c0f9914dacf6, 2026-09-21. The Content/layout family terrain for its design round. -->

I'll read the brief first, then gather the cited files and answer it with file:line pointers only.The brief is a read-only scout of Content/layout. I’ll pull the ledger, obligations, Veneer tokens, Elements, and proofs next.Ledger assignations are in. Next I’ll read Bootstrap sources, Veneer tokens, Elements specimens, and the proof suite.Ledger rows and token names are in. Next I’ll pin Bootstrap `--bs-*` usage, Veneer html/body coverage, and Elements specimens.Bootstrap writes `--#{$prefix}` rather than `--bs-*`. I’ll read those sources and the Elements layout/specimen files next.# Content/layout terrain

## 1. The family's rows

Ledger assignment: `.orkestrel/veneer/research/ledger.md:19` — `reboot` (tag-only; see § Exclusions), `container`, `row`, `col`, `g`, `gx`, `gy`, `offset`, `table`, `figure`, `img`, `lead`, `display`, `blockquote`, `initialism`, `mark`, `small`, `h1`–`h6`, `list-unstyled`, `list-inline`, `link`, `icon-link`, `ratio`, `vr`, and the Reboot documentation rows.

Bootstrap groups these in `bootstrap.scss:16-21` then `bootstrap.scss:48` (`reboot` → `type` → `images` → `containers` → `grid` → `tables` → helpers). `$enable-cssgrid` is `false` (`_variables.scss:379`), so `.grid` / `g-col` / `g-start` are not in the inventory.

| Mechanism | Source | Ledger roots (Selectors column) | `--bs-*` |
| --- | --- | --- | --- |
| Reboot tags | `_reboot.scss` | `reboot` 117 | **Reads** `--bs-root-font-size` (`:30`), `--bs-body-font-family/size/weight/line-height/color/text-align/bg` (`:51-57`), `--bs-heading-color` (`:90`), `--bs-highlight-color/bg` (`:220-221`), `--bs-link-color-rgb` and `--bs-link-opacity` (`:245`; hover rewrites `--bs-link-color-rgb` at `:249`), `--bs-code-color` (`:300`). Declares none; inventory `properties` is empty (`inventory.json:2920` on the preceding key, reboot starts `:2925`). Those names are declared on `:root` in `_root.scss:53-95`. |
| Typography classes | `_type.scss` | `h1`–`h4` 3, `h5`/`h6` 2, `lead` 1, `display` 12, `small` 1, `mark` 1, `list-unstyled` 1, `list-inline` 3, `initialism` 1, `blockquote` 4 | None. Uses Sass (`$lead-font-size`, `$display-font-sizes` 1–6 at `_variables.scss:662-669`) and `@extend` of reboot tags (`_type.scss:4-26`, `:48-53`). |
| Links | `_reboot.scss:244-265`; `helpers/_colored-links.scss`; `_utilities.scss:612-649` | `link` 64, Custom properties 2 | **Declares** `--bs-link-opacity` and `--bs-link-underline-opacity` on `.link-opacity-*` / `.link-underline-*` (`inventory.json:88160-88202`). **Reads** `--bs-{role}-rgb`, `--bs-link-opacity`, `--bs-link-underline-opacity`, `--bs-emphasis-color-rgb` (`_colored-links.scss:4-27`). Reboot `a` also reads `--bs-link-color-rgb` / `--bs-link-opacity`. |
| Images and figures | `_images.scss`; reboot `figure`/`img` at `_reboot.scss:328-338` | `img` 2, `figure` 3 | None. Classes: `.img-fluid`, `.img-thumbnail`, `.figure`, `.figure-img`, `.figure-caption`. |
| Containers | `_containers.scss` + `mixins/_container.scss` | `container` 34, Custom properties 2 | **Declares and reads** `--bs-gutter-x` / `--bs-gutter-y` (`mixins/_container.scss:4-8`; inventory `:8305-8335`). |
| Grid and gutters | `_grid.scss` + `mixins/_grid.scss` | `row` 80 (props 2), `col` 87, `offset` 71, `g` 72 (props 2), `gx` 36 (prop 1), `gy` 36 (prop 1) | `:root` **declares** `--bs-breakpoint-{xs,sm,md,lg,xl,xxl}` (`_grid.scss:5-8`; values `_variables.scss:484-491`). `.row` **declares** `--bs-gutter-x`/`--bs-gutter-y` (`mixins/_grid.scss:6-7`) and **reads** them for negative margins (`:11-13`); columns **read** them for padding (`:25-27`). `.g-*` / `.gx-*` / `.gy-*` rewrite those gutters from `$gutters` (`_maps.scss:174` = `$spacers` 0 / 0.25 / 0.5 / 1 / 1.5 / 3rem). Offset classes set `margin-left` only — no custom properties (`mixins/_grid.scss:46-48`, `:102-107`). |
| Tables | `_tables.scss` | `table` 29, Custom properties 14 | **Declares and reads** `--bs-table-color-type`, `--bs-table-bg-type`, `--bs-table-color-state`, `--bs-table-bg-state`, `--bs-table-color`, `--bs-table-bg`, `--bs-table-border-color`, `--bs-table-accent-bg`, `--bs-table-striped-color/bg`, `--bs-table-active-color/bg`, `--bs-table-hover-color/bg` (`_tables.scss:7-21`, `:36-39`, `:114-143`; inventory `:20280`). |
| Helpers in this unit | `helpers/_icon-link.scss`, `_ratio.scss`, `_vr.scss` (imported `_helpers.scss:5-6,12`) | `icon-link` 5 (RTL 2), `ratio` 7 (prop 1), `vr` 1 | `icon-link` **reads** `--bs-link-color-rgb` / `--bs-link-opacity` (`:5`) and `--bs-icon-link-transform` with a Sass fallback (`:22`). `ratio` **declares and reads** `--bs-aspect-ratio` (`:9`, `:24`; inventory `:88994`). `vr` uses `$vr-border-width` / `$hr-opacity` — no `--bs-*`. |

Could not be found: an inventory `grid` CSS-grid root; `--bs-icon-link-transform` as an inventory-declared property (read with fallback only).

## 2. Token bindings

Veneer already has the `--vn-*` surfaces this family would bind, and already aliases most reboot/root `--bs-*` names.

**Present (`_tokens.scss` + `_mixins.scss` `theme-tokens`):**

| `--vn-*` | Binds to | Where |
| --- | --- | --- |
| `--vn-space-1`…`--vn-space-8` (0.125rem–1rem × density) | would cover `$spacers` 0.25 / 0.5 / 1rem (`$spacers` 1–3) | `_tokens.scss:222-229` |
| `--vn-size-1`…`--vn-size-8` (0.75–2.25rem) | `$font-size-base` and heading steps that fit under 2.25rem | `:208-215` |
| `--vn-line-body` 1.5, `--vn-line-heading` 1.2 | `$line-height-base`, `$headings-line-height` (`_variables.scss:657`) | `_tokens.scss:217-218` |
| `--vn-weight-body` 400, `--vn-weight-heading` 600 | `$font-weight-base`; heading weight in Bootstrap is 500 (`_variables.scss:656`) — Veneer is already 600 | `:219-220` |
| `--vn-font-sans`, `--vn-font-mono` | `--bs-body-font-family`, `--bs-font-sans-serif`, `--bs-font-monospace` | `:202-205`, `:338-339`, `:342` |
| `--vn-text-body-base/rgb`, `--vn-surface-body-base/rgb` | `--bs-body-color/rgb`, `--bs-body-bg/rgb` | `_mixins.scss:94-103`, `:129-132` |
| `--vn-text-heading` (`inherit`) | `--bs-heading-color` / `$headings-color` inherit | `_tokens.scss:194`; `_mixins.scss:143` |
| `--vn-text-emphasis-*`, `--vn-text-secondary`, `--vn-text-tertiary` | `--bs-emphasis-*`, `--bs-secondary-color`, `--bs-tertiary-color` | `_mixins.scss:96-99`, `:133-142` |
| `--vn-surface-secondary/tertiary-*` | `--bs-secondary-bg`, `--bs-tertiary-bg` | `_mixins.scss:105-108`, `:137-142` |
| `--vn-link-base/rgb`, `--vn-link-hover-*`, `--vn-link-decoration` | `--bs-link-color/rgb`, `--bs-link-hover-color/rgb`, `--bs-link-decoration` | `_mixins.scss:110-113`, `:144-147`; `_tokens.scss:200`, `:347` |
| `--vn-text-code`, `--vn-text-highlight`, `--vn-surface-highlight` | `--bs-code-color`, `--bs-highlight-color/bg` | `_mixins.scss:100-101`, `:109`, `:148-150` |
| `--vn-border-width/style/color`, radii | `--bs-border-*`, `--bs-border-radius-*` | `_tokens.scss:231-239`, `:349-357`; `_mixins.scss:151-152` |
| `--vn-breakpoint-xs`…`xxl` (0 / 576 / 768 / 992 / 1200 / 1400) | `--bs-breakpoint-*` and `$grid-breakpoints` | `_tokens.scss:275-280`, `:367-372` |

**Lacking (no `--vn-*` and/or no `--bs-*` alias yet):**

| Missing binding | Bootstrap variable / property |
| --- | --- |
| `--bs-link-opacity` | reboot/links read it with fallback `1` (`_reboot.scss:245`); Veneer never declares it |
| `--bs-link-underline-opacity` | link utilities declare it on `.link-underline-*` (`_utilities.scss:638`) |
| `--bs-body-text-align` | `$body-text-align: null` (`_variables.scss:437`); `_root.scss:58` emits the property only when non-null; reboot still reads it (`_reboot.scss:56`) |
| `--bs-gutter-x` / `--bs-gutter-y` | `$grid-gutter-width: 1.5rem` (`_variables.scss:520`); not in the token layer |
| `--bs-table-*` (the fourteen names in §1) | `$table-color` and the striped/active/hover/border Sass set |
| `--bs-aspect-ratio` | `$aspect-ratios` on `.ratio-*` |
| `--bs-icon-link-transform` | `$icon-link-icon-transform` fallback in `helpers/_icon-link.scss:22` |
| A `--vn-space-*` at 1.5rem and 3rem | `$spacers` 4 and 5 (`_variables.scss:411-417`); `--vn-space-8` stops at 1rem |
| Display-heading sizes 5 / 4.5 / 4 / 3.5 / 3 / 2.5rem | `$display-font-sizes` (`_variables.scss:662-669`); `--vn-size-8` is 2.25rem |

Could not be found: a `--vn-gutter` token; a `--vn-table-*` set; a `--vn-opacity` for link opacity.

## 3. Elements' equivalents

Elements paints tags, not Bootstrap class roots. There is no 12-column `row`/`col`/`offset`/`g` system. There is a CSS grid, but it is a named-area body shell plus an auto-fit tile primitive.

| Surface | File | Specimen |
| --- | --- | --- |
| Headings | `elements/src/styles/elements/_h1-h6.scss:29` (`:where(h1…h6)`) | `#/headings` — `HeadingsPage.vue` (`router.ts:170-174`) |
| Paragraphs | `_p.scss:12` (`p + p` spacing only) | `#/typography` — `TypographyPage.vue:8` (block: `p`) |
| Links | `_a.scss` (bare underline; modifiers opt into chrome) | `#/anchor` — `AnchorPage.vue` (`router.ts:143-147`) |
| Lists | `_ul.scss`, `_ol.scss` (bare restore; `.group` is list-group chrome) | `#/lists` — `ListsPage.vue` (`router.ts:182-186`) |
| Code | `_code.scss`, `_pre.scss` | `#/typography` — `TypographyPage.vue:13` (`code`/`kbd`/`samp`/`var`) |
| Tables | `_table.scss` (`--set-table-*`; `border-collapse: collapse`) | `#/tables` — `TablesPage.vue` (`router.ts:188-192`) |
| Images | `_img.scss:12` | `#/media` — `MediaPage.vue` (`router.ts:194-198`) |
| Figures | `_figure.scss:10` (flex column + gap); `_figcaption.scss:9` | `#/figures` — `FiguresPage.vue` (`router.ts:200-204`) |
| Blockquotes | `_blockquote.scss:16` (inline-start bar, italic) | `#/typography` — `TypographyPage.vue:8,14` |
| `small` / `mark` | `_small.scss:11`, `_mark.scss` | `#/typography` — `TypographyPage.vue:10` |
| Layout: body grid | `components/_body.scss:3-19` — `:has(main)` promotes `body` to a named-area CSS grid (`header` / `nav` / `main` / `aside` / `footer`) | `#/sectioning` — `SectioningPage.vue:36-38` (the page sits inside that shell) |
| Layout: stack / cluster / frame | `components/_div.scss:51-110` — `div.stack` / `div.cluster` / `div.frame` | Used across showcase pages (`HeadingsPage`, `ListsPage`, `ModifiersPage`); not a dedicated layout route |
| Layout: tiles (auto-fit grid) | `_div.scss:127-134` — `display: grid; repeat(auto-fit, minmax(...))` with `--set-tiles-gap` | No page uses `class="tiles"` |
| Layout: container | Explicitly skipped — `_div.scss:26-27` (Tailwind `.container` clash) | None |
| Layout: Bootstrap gutters | None. Gaps are `--set-stack-gap`, `--set-cluster-gap`, `--set-tiles-gap`, `--set-main-padding-inline` (`SectioningPage.vue:9`) | None as `g`/`gx`/`gy` |

Does Elements have a grid? Yes: the body named-area grid (`_body.scss`), `div.tiles` auto-fit (`_div.scss:127`), and `dl` as a 2-column grid (`tests/src/styles/elements/_dl.test.ts` / `_dl.scss`). It does not have Bootstrap's 12-column flex grid.

Could not be found: an Elements specimen whose job is container, 12-column grid, or `g`/`gx`/`gy`; any `class="tiles"` usage under `app/browser`.

## 4. What Veneer's proofs already reach

**Styles suite (`veneer/tests/src/styles/`):** `tokens.test.ts`, `theme.test.ts`, `integration.test.ts`, `mixins.test.ts`, `index.test.ts`, `elements/html.test.ts`, `elements/body.test.ts`, plus Button's element/component tests. No layout/content files yet.

| Instrument | What it already proves | Layout reuse |
| --- | --- | --- |
| `readCascadeSheet` `setupBrowser.ts:521` | Selects the sheet that owns the `theme` layer block | Reuse: any new content/layout rule is in that sheet |
| `collectLayer` `setupBrowser.ts:614` | Rules inside one named layer | Reuse: `elements` / `components` / `utilities` as each mechanism lands |
| `readCascade` | From `@orkestrel/test/browser` (`ButtonSection.test.ts:8`); census of class names on the live document | Reuse: class-root inventory vs rendered specimens |
| `index.test.ts:7-21` | Layer order `theme, reset, base, elements, components, utilities` | Reuse as-is |
| `index.test.ts:23-26` | No two bare tags joined in any `elements`-layer selector | Directly encodes the reboot compound-selector exclusion |
| `html.test.ts:5-10` | `interpolate-size` and `text-size-adjust` on `html` | Pattern for new tag proofs; does not cover reboot |
| `body.test.ts:5-16` | Body type 14px/21px/400/system-ui; canvas/copy colours | Pattern for reboot body; values already differ from Bootstrap's 1rem |
| Viewport in styles | None under `tests/src/styles/` | **Must add** if grid breakpoints are proven there |

**Conformance:** `readDeferrals` `setupConformance.ts:527` reads `guides/veneer.md` § Styles / Deferred selectors (`veneer.md:171`). `collectShippedComponents` `:596` requires a selector row and a variable row, every one `shipped`. `scanCompatibilityPresence` `:623` checks shipped names against `dist/src/styles/index.css` (`readBuiltCascade` `:581`) and refuses deferred names that appear. `conformance.test.ts:52-61` lists only `btn` as shipped. Content/layout would add compatibility rows and deferrals; the readers stay.

**Journey capture:** `integration.test.ts:63` families are `journey`, `refusal`, `matrix`, and `capture` when enabled. Portfolio states `setup.ts:39-44` are `home` / `home-dark` and the Button states. Variants `configs/app/vite.journey.config.ts:7-11`: `light-1280` / `dark-1280` (1280×800) and `light-390` / `dark-390` (390×844). That is a mode × two-width photography axis, not `$grid-breakpoints` (576 / 768 / 992 / 1200 / 1400).

**Distribution:** `package.json` `"./styles": "./dist/src/styles/index.css"`. `tests/distribution.test.ts` packs the artifact and reads exports/declarations/runtime modules — it does not assert selectors. A layout family that ships CSS rides the existing `./styles` export; it does not need a new distribution stage.

**Reuse vs add:** reuse cascade readers, layer-order, no-compound-tag, html/body test shape, deferral/shipped scan, journey families, 390/1280 capture harness, `./styles` distribution. Add per-mechanism styles tests, guide selector/variable rows, Content/layout capture states, and a proof axis at Bootstrap's breakpoint widths (390 and 1280 do not land on 576 / 768 / 992 / 1200 / 1400).

Could not be found: a styles-suite media-breakpoint harness; any Content/layout capture state; a shipped key other than `btn`.

## 5. Reboot exclusions and obligations vs `_html.scss` / `_body.scss`

**Excluded compound selectors** (`.orkestrel/veneer/research/ledger.md:585`): `ol ol`, `ul ul`, `ol ul`, `ul ol`, `pre code`, `a > code`, `kbd kbd`, `legend + *`. Source: `_reboot.scss:171-176`, `:291-295`, `:304-306`, `:316-320`, `:506-508`. Veneer `index.test.ts:23-26` already forbids joining two bare tags in the `elements` layer. `_html.scss` and `_body.scss` do not emit any of these.

**No-`href` and `[hidden]`:**

| Obligation | Bootstrap | Veneer `_html.scss` / `_body.scss` |
| --- | --- | --- |
| `a:not([href]):not([class])` resets color/decoration | `_reboot.scss:259-264`; ledger `:556`; obligations.md `:239` | Absent. `_html.scss` has no `a` rule; `_body.scss` has none. |
| `[hidden] { display: none !important }` | `_reboot.scss:615-617`; ledger `:557`; obligations.md `:240` | Absent. |

**`--bs-body-*` and `--bs-heading-color`:**

Declared in `theme-tokens` (`_mixins.scss:129-143`) and included from `:root` (`_tokens.scss:293`) and from `[data-bs-theme='light'|'dark']` (`_theme.scss:10-17`): `--bs-body-color/rgb`, `--bs-body-bg/rgb`, `--bs-heading-color` ← `--vn-text-heading`. Also on `:root` (`_tokens.scss:342-345`): `--bs-body-font-family/size/weight/line-height`. Not declared: `--bs-body-text-align`, `--bs-link-opacity` (obligations.md `:241` lists `--bs-link-opacity` with the body/heading set).

**What `_html.scss` / `_body.scss` satisfy:**

| Obligation piece | `_html.scss:2-8` | `_body.scss:2-8` |
| --- | --- | --- |
| `box-sizing: border-box` globally | No | No |
| `text-size-adjust: 100%` | Yes (`:7`; webkit-prefixed in the html test) | Bootstrap puts `-webkit-text-size-adjust` on `body` (`_reboot.scss:58`), not `html` |
| `interpolate-size: allow-keywords` | Yes (`:5`) — Veneer-only; not a reboot obligation | — |
| `font-family/weight/line-height/color` + `background-color` | — | Yes, via `--vn-*` (`:3-8`) |
| `font-size: 1rem` | — | No — `--vn-size-2` (0.875rem); `body.test.ts:6` reads 14px |
| `margin: 0` on body | — | No |
| `text-align: var(--bs-body-text-align)` | — | No |
| Heading / `p` / `a` / lists / code / table / forms / `address` / `blockquote` / `summary` | No heading or other tag rules in either file | No |

`_html.scss` and `_body.scss` therefore cover a slice of the body type/canvas obligation (at Veneer's calibrated size, not Bootstrap's 1rem) and none of `[hidden]`, no-`href`, heading color application, or global `box-sizing`. Token aliases for `--bs-body-color/bg` and `--bs-heading-color` live in the token layer, not in those two partials.

Could not be found: any `[hidden]` or `a:not([href])` rule in Veneer `src/styles/`; a `--bs-body-text-align` or `--bs-link-opacity` declaration in `_tokens.scss` / `_theme.scss` / `_html.scss` / `_body.scss`.