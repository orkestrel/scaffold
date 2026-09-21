<!-- Retained from tmp/cursor/cl0-scout.result.txt. Bench lane: grok on Cursor Grok 4.6 High, journal cl0-scout.jsonl, session d503452e-c581-40a8-9202-7b0c0f8f7cc9, 2026-09-21. Elements content specimens for the CL0 calibration instrument. -->

I'll read the scout brief and the orchestration files it depends on, then answer exactly as specified.The brief is a bounded scout: map Elements content specimens, computed styles, light/dark, and what the existing calibration instrument already does. I'll read the named files and the Elements showcase next.I'll map showcase routes and page files in Elements, then read the SCSS partials and the existing calibration instrument.I'll read the router, content pages, SCSS partials, and the `data-mode` write path next so each specimen row can cite a real DOM and token.Checking how App applies the section hash after navigation, and whether `abbr` chrome is only Tailwind preflight.Scout distillate for a `builder` writing the CL0 instrument. Pointers are to Elements at `C:/Users/mikes/WebstormProjects/elements` and scaffold calibration at `.orkestrel/veneer/research/`. Design nothing.

## 1. Surfaces: route, page, DOM, partial

Hash form is `#/{id}` and `#/{id}/{section}` (`elements/app/browser/router.ts:109-112`). `App.vue:87-99` scrolls `#{section}` into `main`. Specimens sit in `main > section#…` (nested `section` zeroes its own padding: `_section.scss:82-90`) with `display:flex; flex-direction:column; gap: var(--set-section-gap)` (`_section.scss:55-64`). `--set-section-gap` is `calc(var(--spacing) * 4)` (`_section.scss:57`); `_sizes.scss:20` treats `--spacing * 2` as `0.5rem`, so this gap is `1rem` at a 16 px root.

| Surface | Route / page | DOM to reach | Partial |
| --- | --- | --- | --- |
| Paragraph rhythm | `#/typography/typography-paragraph` `router.ts:176-181` `TypographyPage.vue:64-83` | `section#typography-paragraph` → `h2` then three adjacent `p` (no class). First `p` starts “The bare `<p>`”; second is `p + p`; third (already the U2 body-copy reach) is `p:last-of-type`. Parent `section` is a flex column with gap. | `_p.scss:12-14` `p + p { margin-block-start: 1em }`. Page copy at `TypographyPage.vue:67-70` says paragraphs keep zero margin; the sibling rule still fires, so a second `p` inside a `section` gets section `gap` **and** `1em` margin-block-start. Read the first `p` and the `p + p` sibling, plus the parent `gap`. Inherit type from `_body.scss:14-24`. |
| Headings h1–h6 | `#/headings/headings-cascade` `router.ts:170-175` `HeadingsPage.vue:69-98` | `section#headings-cascade > div.stack` (`HeadingsPage.vue:91-98`) → bare `h1`…`h6` with texts `Heading level 1 — page title` … `Heading level 6 — sidebar label`. Do not use the page-title `h1` “Headings” (`HeadingsPage.vue:50`). `div.stack` is flex-column with `--set-stack-gap` (`_div.scss:51-59` → `--set-stack-spacing: 1em` `_tokens.scss:210`). | Shared `:where(h1…h6)` `_h1-h6.scss:30-73`; sizes `_h1-h6.scss:77-94` (h1 `2.25rem` … h6 `1rem`). Weight `600`, line-height `1.2`, letter-spacing `-0.01em`, `text-wrap: balance`, `color` via `--set-heading-color` → `--color-text` when no variant. |
| Lists `ul` / `ol` | `#/lists/lists-bare` `router.ts:182-187` `ListsPage.vue:66-109` | `section#lists-bare > div.stack > ul` then `> ol`. Nesting: `ul > li > ul > li > ul` (disc → circle → square); `ol > li > ol > li > ol` (decimal → lower-alpha → lower-roman). No class on the bare lists. | `_ul.scss:40-52` `ul:not(.group)` indent `2rem`, `list-style-type: disc` then nested circle/square. `_ol.scss:28-40` `ol:not(.group)` `decimal` then lower-alpha / lower-roman. Marker colour `surfaces/_marker.scss:60-62` `::marker { color: var(--set-marker-color) }` with `--set-marker-color: var(--color-text-muted)` (`_marker.scss:53`). `.group` chrome is a different surface (`_ul.scss:54+`, `_li.scss`) — not the content-family bare list. |
| Lists `dl` / `dt` / `dd` | `#/lists/lists-definition` `ListsPage.vue:257-289` | `section#lists-definition > dl` → `dt`/`dd` pairs (`Author` / `Ada Lovelace`, …). No class. | `_dl.scss:38-52` grid, `--set-dl-row-gap: 0.5rem`, `--set-dl-column-gap: 1rem`, one column; at `min-width: 640px` `_dl.scss:55-76` two columns `minmax(0, 1fr) minmax(0, 2fr)`. Page copy still describes `max-content`/`1fr` (`ListsPage.vue:264-266`); the partial is the 1:2 grid. `_dt.scss:11-17` weight `600`. `_dd.scss:11-16` `color: var(--color-text-muted)`, `margin-inline-start: 0`. |
| Blockquote | `#/typography/typography-quotations` `TypographyPage.vue:176-198` | `section#typography-quotations > blockquote` (direct child, no class, no `cite`). Text starts “Adding manpower…”. A second specimen lives at `#/figures/figures-quote` as `figure > blockquote` (`FiguresPage.vue:88-100`) — same partial, extra figure chrome. | `_blockquote.scss:16-26`: `--set-blockquote-bar-width: 0.25rem`, `--set-blockquote-color: var(--set-variant-background-color, currentColor)`, `--set-blockquote-padding-inline: 1rem`, `--set-blockquote-margin-block-end: 1rem`, `font-style: italic`. Bare quote uses `currentColor` (body text), not a variant bar. |
| Horizontal rule | `#/typography/typography-hr` `TypographyPage.vue:256-270` | `section#typography-hr > hr` (no class), between two `p`. | `_hr.scss:17-24`: `border: 0; border-block-start: 1px solid var(--set-hr-color)` with `--set-hr-color: var(--set-variant-background-color, currentColor)` and `--set-hr-opacity: 0.2`. Page copy names `--color-border` (`TypographyPage.vue:261-262`); the partial uses `currentColor` at 0.2 opacity. |
| Anchors rest / hover | `#/anchor/anchor-bare` `router.ts:143-148` `AnchorPage.vue:85-98` | `section#anchor-bare > p > a[href="#anchor-bare"]` text “anchor documentation”. Bare, no class, in body copy. | `_a.scss:33-213`. Rest: `color: var(--set-a-color)` → `--color-primary-on-canvas` (`_a.scss:61-64, 103`), `text-decoration: underline` (`_a.scss:72, 98`). Hover `_a.scss:168-170`: `color: color-mix(in srgb, var(--set-a-color) 80%, black)`. No `text-decoration-thickness` or `text-underline-offset` in Elements SCSS. Transition includes `text-decoration-color` (`_a.scss:111-118`) at `--set-transition-duration` (`150ms`, `_tokens.scss:92`). |
| Table (bare) | `#/tables/tables-bare` `router.ts:188-193` `TablesPage.vue:176-205` | `section#tables-bare > table` → `caption` “Recent contributors — bare table”, `thead > tr > th`, `tbody > tr > td`. No class. Hover is default (`TablesPage.vue:16-19`, `_table.scss:161-163`). | `_table.scss:30-169`. `_caption.scss` / `_td.scss` / `_th.scss` / `_thead.scss` / `_tbody.scss` / `_tr.scss` / `_tfoot.scss` declare no rules; cells and caption are nested under `table`. |
| Table striped | `#/tables/tables-striped` `TablesPage.vue:207-234` | `section#tables-striped > table.striped` → `thead`/`tbody` (no caption). Odd body rows tint. | `_table.scss:286-288` `table.striped > tbody > tr:nth-of-type(odd) > *`. Hover override `_table.scss:458-460` still wins. |
| Table bordered + caption | `#/tables/tables-bordered` `TablesPage.vue:278-288` | `section#tables-bordered > table.bordered > caption` “Theme color tokens — light vs dark”. | `_table.scss:301-307` perimeter + every cell edge `1px solid var(--set-table-border-color)`. Caption padding `_table.scss:116-123`. |
| Figure + figcaption | `#/figures/figures-image` `router.ts:200-205` `FiguresPage.vue:59-77` | `section#figures-image > figure` → `img[width="640"][height="360"]` + `figcaption` starting “Fig 1 —”. | `_figure.scss:10-16` flex-column, `--set-figure-gap: 0.5rem`. `_figcaption.scss:9-16` `--set-figcaption-font-size: 0.875em`, `--set-figcaption-line-height: 1.4`, colour `--color-text-muted`. |
| Images | `#/media/media-img` `router.ts:194-199` `MediaPage.vue:122-148` | Block specimen: `section#media-img > img[width="480"][height="320"]`. Inline 20×20: `section#media-img > p > img.inline[width="20"][height="20"]` (`MediaPage.vue:138-145`); `.inline` is Tailwind `display: inline`, not an Elements modifier. | `_img.scss:12-15`: `block-size: auto; vertical-align: middle`. Tailwind preflight already `display:block; max-width:100%` (page copy `MediaPage.vue:10-14`). Picture wrapper `#/media/media-picture` is `display: contents` (`MediaPage.vue:18`, `_picture.scss` not re-read here). |
| `code` (inline) | `#/typography/typography-code` `TypographyPage.vue:133-148` | `section#typography-code li > code` containing `const value = useTemplateRef('dialog')`, or any `p > code` on that page. | `_code.scss:27-43`: `--set-code-background-color: color-mix(in oklab, currentColor 12%, transparent)`, padding `0.25em` / `0.125em`, radius `0.25em`, font-size `0.9em`. |
| `pre` + inner `code` | same section `TypographyPage.vue:170-173` | `section#typography-code > pre > code` (the listing starting `// Pseudocode`). | `_pre.scss:17-36`: bg `--color-surface-raised`, border `1px solid var(--color-border)`, radius `--radius-lg`, padding `1rem` / `0.875rem`, font-size `0.875em`, line-height `1.6`, `overflow-x: auto`. Inner `pre code` drops chip chrome `_code.scss:46-51`. |
| `kbd` | `TypographyPage.vue:150-152` | `section#typography-code kbd` first “Ctrl”, sibling “K”. | `_kbd.scss:11-32`: same 12% oklab mix bg, border `color-mix(in oklab, currentColor 22%, transparent)`, padding `0.375em` / `0.0625em`. Nested `kbd kbd` strips chrome `_kbd.scss:39-44` (not in this specimen). |
| `samp` | `TypographyPage.vue:155-157` | `section#typography-code samp` text `npm run dev`. | `_samp.scss:10-24`: bg `--color-surface-raised` (a chip). Page copy at `TypographyPage.vue:156-157` says samp has no bg chip; the partial paints one. |
| `var` | `TypographyPage.vue:160-162` | `section#typography-code var` text `x`. | `_var.scss:9-31`: bg `--color-surface-raised`, `font-family` ui-monospace stack, `font-style: italic`, `--set-var-padding-block: 0`. |
| `small` | `#/typography/typography-emphasis` `TypographyPage.vue:96` | `section#typography-emphasis p > small` wrapping `&lt;small&gt;`. | `_small.scss:11-15` `font-size: 0.875em`. |
| `mark` | same paragraph `TypographyPage.vue:97` | `section#typography-emphasis p > mark` wrapping `&lt;mark&gt;`. Bare, no variant class. | `_mark.scss:43-72`: colour/bg fall through to system `marktext` / `mark`; chip padding `0.1875em` / `0`, radius `0.1875em`. Dark **system** fallback is `@media (prefers-color-scheme: dark)` (`_mark.scss:65-71`) using `highlighttext` / `highlight`, **not** `[data-mode='dark']`. |
| `abbr` | `#/typography/typography-meta` `TypographyPage.vue:202-207` | `section#typography-meta abbr[title="World Wide Web Consortium"]` text `W3C`. | `_abbr.scss:10-12` only `cursor: help`. Dotted underline comes from Tailwind preflight on `abbr:where([title])` (comment `_abbr.scss:5-6`). |
| `address` | `#/typography/typography-address` `TypographyPage.vue:240-253` | `section#typography-address > address` (contains `br` and nested `a`). Read the `address` host, not the nested links. | `_address.scss:25-36`: colour `--color-text-muted`, font-size `--text-sm` (fallback `0.875rem`), line-height `1.5`, `font-style: normal`, margin-block-end `--set-stack-spacing` (`1em`, `_tokens.scss:210`). |
| `sub` / `sup` | `#/typography/typography-position` `TypographyPage.vue:225-237` | `section#typography-position p > sub` (e.g. `H<sub>2</sub>O`) and `p > sup` (e.g. `mc<sup>2</sup>`). | `_sub.scss:13-19`: `font-size: 0.75em; line-height: 0; vertical-align: baseline; bottom: -0.25em`. `_sup.scss:10-16`: same size/line-height, `top: -0.5em`. |

## 2. Computed properties and tokens

Reuse the existing `PROPERTIES` list in `calibration.mjs:29-51` (`font-family`, `font-size`, `line-height`, `font-weight`, padding, `border-top-width`, `border-top-left-radius`, `color`, `background-color`, `border-top-color`, `box-shadow`, `outline`, transition trio, `opacity`, `transform`, `translate`) and add what that list does not carry for this family.

| Read on | Extra computed properties |
| --- | --- |
| Every specimen | `margin-top` / `margin-right` / `margin-bottom` / `margin-left` (or logical block/inline), `font-style`, `letter-spacing` |
| `p + p` and parent `section` | `margin-block-start` on the sibling `p`; `gap` on `section#typography-paragraph` |
| Headings | `letter-spacing`, `text-wrap` |
| `ul` / `ol` / `li` | `padding-inline-start`, `list-style-type`; `color` on `::marker` |
| `dl` | `display`, `grid-template-columns`, `row-gap`, `column-gap` |
| `blockquote` | `border-inline-start-width` / `-style` / `-color`, `padding-inline-start`, `font-style` |
| `hr` | `border-block-start-width` / `-style` / `-color`, `opacity` (the fade is on the element, not the token colour) |
| `a` rest and `:hover` | `text-decoration-line`, `text-decoration-style`, `text-decoration-color`, `text-decoration-thickness`, `text-underline-offset` |
| `table` | `border-collapse`, `border-spacing`, `font-size`, `line-height` |
| `th` / `td` | padding, `border-block-end-width` / `-color`, `background-color` (header band, hover, stripe) |
| `caption` | padding, `color`, `font-size`, `caption-side`, `text-align` |
| `figure` | `display`, `flex-direction`, `gap` |
| `img` | `display`, `max-width` / `max-inline-size`, `block-size` / `height`, `width`, `vertical-align` |
| `code` / `kbd` / `samp` / `var` / `pre` | padding, `border-radius`, `background-color`, `border-top-width`+colour (`pre`, `kbd`), `font-family` (`var`) |
| `small` / `mark` / `abbr` / `address` / `sub` / `sup` | size, colour, bg, `cursor` (`abbr`), `font-style` (`address`), `vertical-align` + `top`/`bottom` (`sub`/`sup`) |

Drive hover with the existing `locator.hover()` then `mouse.move(0,0)` (`calibration.mjs:419-421`) on the bare `a` and on `table tbody tr`. Table hover paints the **cells** (`tbody > tr:hover > *`), so read `td`/`th` under the hovered row, not only the `tr`.

Tokens that are `color-mix` or `--set-*`, with light (`:root`) and dark (`[data-mode='dark']` / the matching `@media` block). Default core: no `data-theme`.

| Token | Light | Dark | Where |
| --- | --- | --- | --- |
| `--color-canvas` | `var(--color-white)` | `oklch(21% 0.013 256)` | `_theme.scss:137`, `:435` |
| `--color-text` | `var(--color-slate-900)` | `var(--color-slate-200)` | `_theme.scss:143`, `:440` |
| `--color-text-muted` | `var(--color-slate-600)` | `var(--color-slate-400)` | `_theme.scss:145`, `:442` |
| `--color-border` | `var(--color-slate-300)` | `oklch(40% 0.022 256)` | `_theme.scss:158`, `:445` |
| `--color-surface-raised` | `var(--color-slate-100)` | `oklch(26.5% 0.014 256)` | `_theme.scss:139`, `:437` |
| `--color-primary` | `oklch(48% 0.255 264)` | `oklch(70% 0.15 233)` | `_theme.scss:103`, `:438` |
| `--color-primary-on-canvas` | `color-mix(in oklab, var(--color-primary) 70%, var(--color-text))` | same mix at **80%** primary | `_theme.scss:215`, `:462` |
| `--color-text-strong` (anchor hover mix target is `black`, not this) | `var(--color-slate-950)` | `var(--color-white)` | `_theme.scss:144`, `:441` |
| `--set-font-size-base` / `--set-line-height-base` | `0.875rem` / `1.5` | same | `_tokens.scss:198-199` |
| `--set-font-family-base` | `system-ui, -apple-system, "Segoe UI", …` | same | `_tokens.scss:200-202` |
| `--set-heading-*` | colour chain → `--color-text`; weight `600`; line-height `1.2`; letter-spacing `-0.01em` | colour follows `--color-text` | `_h1-h6.scss:58-64` |
| `--set-a-color` | `--color-primary-on-canvas` | same chain, dark mix 80% | `_a.scss:61-64` |
| `--set-a-text-decoration` | `underline` | same | `_a.scss:72` |
| Anchor hover | `color-mix(in srgb, var(--set-a-color) 80%, black)` | same formula (mix toward `black` in dark too) | `_a.scss:168-170` |
| `--set-code-background-color` / `--set-kbd-background-color` | `color-mix(in oklab, currentColor 12%, transparent)` | same formula (follows inherited colour) | `_code.scss:32`, `_kbd.scss:18` |
| `--set-kbd-border-color` | `color-mix(in oklab, currentColor 22%, transparent)` | same | `_kbd.scss:19` |
| `--set-pre-background-color` / `--set-samp-background-color` / `--set-var-background-color` | `--color-surface-raised` | dark raised token above | `_pre.scss:19`, `_samp.scss:12`, `_var.scss:11` |
| `--set-table-header-background-color` | `color-mix(in srgb, var(--set-table-border-color) 40%, transparent)` | same formula | `_table.scss:40-44` |
| `--set-table-row-hover-background-color` | mix **25%** border over transparent | same | `_table.scss:45-48` |
| `--set-table-row-striped-background-color` | mix **12%** | same | `_table.scss:50-53` |
| `--set-table-border-color` | `--color-border` | dark border | `_table.scss:33` |
| `--set-table-cell-padding-inline` / `-block` | `calc(var(--spacing) * 3)` / `* 2` → `0.75rem` / `0.5rem` | same | `_table.scss:35-36` |
| `--set-mark-color` / `-background-color` (bare) | system `marktext` / `mark` | system `highlighttext` / `highlight` **only if** `prefers-color-scheme: dark` | `_mark.scss:44-48, 65-70` |
| `--set-hr-color` / `--set-hr-opacity` | `currentColor` / `0.2` | same | `_hr.scss:18-19` |
| `--set-blockquote-color` | `currentColor` (no variant) | same | `_blockquote.scss:17` |
| `--radius-lg` (pre) | `calc(0.5rem * var(--set-radius-factor))` with factor `1` | same | `_tokens.scss:265, 280` |

Settled canvas/text/border strings already in `research/calibration.md` (body `rgb(255, 255, 255)` / `oklch(0.21 0.013 256)`; text `oklch(0.208 0.042 265.755)` / `oklch(0.929 0.013 255.508)`; border `oklch(0.869 0.022 252.894)` / `oklch(0.4 0.022 256)`; raised surface sRGB `248, 250, 252` / `26, 30, 36`). Primary-on-canvas and table/code mixes have no CL0 reading yet — the instrument must take them.

`[data-mode='light']` only sets `color-scheme: light` (`_theme.scss:425-427`); light colours live on `:root` (`_theme.scss:133+`). Dark colours live on `[data-mode='dark']` (`_theme.scss:429+`) and on `:root:not([data-mode])` inside `@media (prefers-color-scheme: dark)` (`_theme.scss:285-286`).

## 3. Light / dark and reset

| Step | Pointer | Reading |
| --- | --- | --- |
| Header control | `App.vue:370-374` | Button accessible name `Switch theme (currently ${mode})`; click calls `themeCtl.toggle()`. |
| Toggle | `createTheme.ts:45-49` | `set(mode === 'dark' ? 'light' : 'dark')` — pins an explicit mode, never `'system'`. |
| Write path (U7f scout) | `theme.ts:71-77` | `writeMode`: `'system'` **removes** `data-mode`; `'light'` / `'dark'` **sets** `html[data-mode]`. Palette is the separate `data-theme` axis (`theme.ts:80-86`). |
| CSS pins | `_theme.scss:425-429` | `[data-mode='light']` / `[data-mode='dark']`; OS-follow `_theme.scss:285` `:root:not([data-mode])`. |
| U7f instrument path | `units/u7f-harness-4.mjs:177-183` | After boot, `page.evaluate` `document.documentElement.setAttribute('data-mode', mode)` and assert the attribute. Does not click the header button. The Vue `setting` ref is not updated, so a later `writeMode('system')` would strip it; a reload re-applies stored `setting` from `localStorage` (`theme.ts:138-140, 161`). |
| U7f settle | `u7f-harness-4.mjs:190+` | Two consecutive animation frames with unchanged `body` `background-color` (cap 120 frames). Do not wait on `getAnimations().length === 0` (the button page’s spinner never idles; content pages are quieter but this settle still works). |
| Calibration `setMode` | `calibration.mjs:370-381` | Clicks the header button, then `waitForFunction` `(getAttribute('data-mode') ?? 'light') === expected`. Comment at `calibration.mjs:375-376` still says the showcase **removes** the attribute for light. That matched a 2026-09-20 probe of default `'system'` (`plan.md` U2 note: light wait treated absence as light). After a toggle, `writeMode('light')` **writes** `data-mode="light"`. Treat absence as light only for the default `'system'` boot. |
| Root font | `calibration.mjs:18, 501` | `html { font-size: 16px !important; }` after every load. |
| Per-specimen reset | `calibration.mjs:499-501` | `goto(SHOWCASE_URL + route)` then `reload` then the font tag. Reload was added so a leftover top-layer surface cannot steal the next click (`plan.md` U2). Content pages do not open overlays; keep the reload so `localStorage` theme and hash scroll re-apply from a known boot. |
| Section land | `App.vue:151-152`, `:87-99` | After hash parse, `scrollIntoView` on `#${section}`. Wait for the reach locator `attached` (`calibration.mjs:504`) before reading. |
| Hover cleanup | `calibration.mjs:419-421` | `mouse.move(0, 0)` after hover. Required for `a:hover` and `tbody tr:hover`. |
| Palette | `App.vue:359-367` | Leave `<select aria-label="Theme">` at Default (no `data-theme`). |
| `mark` in dark | `_mark.scss:65-71` | Pinning `data-mode="dark"` does **not** flip bare `mark` system colours. If the instrument must read the dark system `highlight` fallback, also `emulateMedia({ colorScheme: 'dark' })`; if it only pins `data-mode`, report that the mark chip may still be light-scheme `mark`/`marktext`. |
| Viewport | `calibration.mjs:17` | `1100 × 800` keeps `dl` on the two-column rule (`min-width: 640px`). |

## 4. What `calibration.mjs` already does, and what it lacks

**Reuse**

| Piece | Pointer | Reading |
| --- | --- | --- |
| Showcase lock | `calibration.mjs:13-15, 355-360` | `file:///` `elements/dist/showcase/index.html`, digest `cdb622ef4100e17999e41cb546ab1b1b0b589334130ef87bd6a6df1ac091e792`. |
| Browsers | `calibration.mjs:348-351, 615-656` | Playwright Chromium import plus `channel: 'msedge'`; write `calibration/<browser>/calibration.json`. |
| Viewport + font | `:17-18` | `1100×800`, 16 px root. |
| Navigation | `:499-501, 63-66` | Hash route on the file URL; `reach` is `{ css }` or `{ role, name }`; `.first()` (`:363-367`). |
| Mode loop | `:353, 509-525` | `light` then `dark` per specimen; `SETTLE_MS = 500` (`:21`) after mode, after state, after close. |
| Readers | `:384-397` | `getComputedStyle` → named properties + `getBoundingClientRect`. Pseudo reader `:399-415` (not needed for this family except optional `::marker`). |
| Hover / focus / active drivers | `:417-450` | Hover and Tab trail already exist; content family needs hover on `a` and table rows. |
| Output shape | `:645-654` | `{ browser, version, date, showcaseDigest, specimens: { [id]: { light: { state: { style, rect } }, dark: … } }, motions, unknowns }`. Captures `{id}--{state}--{mode}.png` (`:519`). |
| Motion sampler | `:333-346, 539-612` | Not required for rest typography; table hover is a 150 ms colour tween (`_table.scss:148-150`) — the 500 ms settle covers it. |

**Lacks**

| Gap | Reading |
| --- | --- |
| Specimens | `SPECIMENS` (`calibration.mjs:63-328`) already has `body-copy` and `heading-h1`…`h6` at rest. It has no list, `p + p`, blockquote, `hr`, `a`, table, figure, `img`, code family, `small`, `mark`, `abbr`, `address`, `sub`/`sup`. |
| Properties | No `margin-*`, `gap`, `text-decoration*`, `text-underline-offset`, `border-collapse` / `border-spacing`, `list-style-type`, `grid-template-columns`, logical border on blockquote/hr, `font-style`, `vertical-align`, `::marker`. `border-top-*` misses `border-inline-start` (blockquote) and `border-block-start` (`hr`) and `border-block-end` (cells). |
| States | No hover on anchors or table rows. Headings/copy are rest-only (correct). |
| Tokens | Does not dump `getPropertyValue('--color-primary-on-canvas')` etc.; only computed used-on-element strings. CL0 still needs those computed strings; optional extra is reading the custom properties on `:root` per mode. |
| Mode write | Uses the header toggle + “absence = light”, not the U7f `setAttribute` path. A CL0 instrument that follows U7f must set `data-mode` after each reload (reload restores stored `'system'` / stored pin). |
| `mark` | No `prefers-color-scheme` emulation. |
| Thumbnail | Nothing to extend — Elements has no thumbnail class. |

Could not be found: a framework `thumbnail` (or similar) class on `img`; any `text-decoration-thickness` / `text-underline-offset` declaration; a `[data-mode='dark']` override for bare `mark` system colours; rules in `_caption.scss` / `_td.scss` / `_th.scss` / `_thead.scss` / `_tbody.scss` / `_tr.scss` (caption and cells are nested in `_table.scss` only).