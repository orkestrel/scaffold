Parts 3 and 4 need the element and component partials that match Bootstrap’s families. I’ll read those next and keep the same citation rules.# Elements styles, parts 3–4

Elements paints Bootstrap’s families on tags, roles, and a few class roots (`.badge`, `.spinner`, `.carousel`). It does not restyle `.alert`, `.card`, `.modal`, `.dropdown-menu`, `.navbar`, `.offcanvas`, `.list-group`, or `.form-control`. Veneer’s `elements` layer follows `bootstrap` (`veneer:ROADMAP.md:26`), so a bare-tag rule in `src/styles` wins on the same element Bootstrap’s markup uses.

## 3. Component and element looks

**Alert.** `aside[role='alert']` is an in-flow flex banner, full inline size, transparent fill, 4px leading bar, radius `--radius-md`. It rests at `block-size: 0`, opacity 0, and a negative `--set-motion-slide-distance` translate, and opens on `[data-alert-open]` to `block-size: auto` (`elements:src/styles/components/_aside.scss:239`, `:304`, `:321`). A direct-child `<header>` or `<footer>` bands the banner. `article aside` is a separate italic callout with the same 4px bar (`:125`).

**Badge.** `.badge` is an inline chip, `0.75em` / weight 500, hidden when empty. A variant class sets subtle background and emphasis text; `.filled` uses the saturated variant; `.pill` sets radius `9999px` (`elements:src/styles/components/_badge.scss:30`, `:62`, `:72`).

**Button.** Bare `button` is an inline-flex control: transparent face until a variant fills it, padding from `--spacing`, type `--text-sm`, radius `--radius-md`. Hover keeps 88% of the fill mixed toward `--color-text-strong`; active keeps 78% (`elements:src/styles/elements/_button.scss:28`, `:148`). `[role='group']` overlaps sibling borders by one pixel, the button-group shape (`elements:src/styles/components/_role-group.scss:44`, `:80`).

**Card.** Bare `article` is a flex column on `--color-surface`, 1px border, `--radius-lg`, small shadow, and a container named `article`. A variant tints the border; `.filled` fills the surface. `article:has(> header:first-child)` drops the top padding so `article > header` sits flush (`elements:src/styles/components/_article.scss:40`, `:92`, `:184`).

**Carousel.** `.carousel` is a region with absolutely stacked `li[role=listitem]`, controls, and indicator buttons. Slide timing is a literal `0.6s` on `cubic-bezier(0.32, 0.72, 0, 1)`. The track uses the Bootstrap next/prev/start/end translate lifecycle the file header states (`elements:src/styles/composables/_carousel.scss:45`, `:27`, `:94`).

**Collapse and accordion.** There is no `.collapse` or `.accordion`. A disclosure is `details` / `summary`; adjacent `details` only add a block margin. Exclusive groups are the browser’s `name` attribute. Open/close height is `::details-content` (`elements:src/styles/elements/_details.scss:134`, `:77`). Table row expansion repeats that height tween on `[data-table-expansion-panel]` (`elements:src/styles/elements/_table.scss:486`).

**Dropdown.** `menu[popover]` and a `menu` inside a non-drawer popover become a nowrap column, `min-inline-size: 12rem`, padding and gap 0, `overflow-block: auto`. `:popover-open` sets `display: flex`. Drawers are excluded (`elements:src/styles/components/_menu.scss:435`, `:484`). The OS `<select>` popup is explicitly unstyled (`elements:src/styles/elements/_select.scss:22`).

**List group.** No `.list-group` rule was in the partials read. The link-list look is a full-width muted row in `body:has(main) > aside menu`, with a 2px bar and `--color-primary-on-canvas` when `aria-current="location"` (`elements:src/styles/components/_menu.scss:266`, `:303`). A comment calls `.group` the list-group chrome (`elements:src/styles/elements/_table.scss:330`); that rule was not read.

**Modal.** Covered in part 2: centered `dialog`, scale `0.96`, scrim on `dialog:modal::backdrop`. Size modifiers: `.small` caps at 20rem, `.large` at 48rem, `.fullscreen[open]` is edge-to-edge (`elements:src/styles/composables/_dialog.scss:20`, `:40`).

**Nav and tabs.** Bare `nav` is a token host. `body` rails are a bordered column. `[role=tablist]` is a wrapping flex row; `[role=tab]` is a quiet button, and `[aria-selected=true]` paints primary subtle fill and emphasis text, not an underline (`elements:src/styles/components/_nav.scss:317`, `:350`, `:396`). `.pills`, `.vertical`, and `.bordered` sit in the composables layer (`elements:src/styles/composables/_tabs.scss:23`). Breadcrumbs are `nav[aria-label=Breadcrumb]` with a masked chevron (`elements:src/styles/components/_nav.scss:433`).

**Navbar.** `body:has(main) > header` is a flex app bar with a bottom border and compact padding. It is not a collapsing `.navbar` (`elements:src/styles/components/_header.scss:82`).

**Offcanvas.** `:is(aside, nav)[popover]` is `position: fixed`, default inline-end, `inline-size: min(token, 100dvw)`, `block-size: 100dvh`, closed at `translateX(100%)` and opacity 0. `:popover-open` sets `translateX(0)` and opacity 1. `@starting-style` repeats the off-screen pair (`elements:src/styles/components/_aside.scss:578`, `:676`, `:685`, `:695`).

**Pagination.** `nav[aria-label=Pagination]` lays links in a joined row: shared borders, end radii on the first and last, hover tint `currentColor` at 8%, active fill `--color-primary` (`elements:src/styles/components/_nav.scss:103`, `:487`, `:544`).

**Popover and tooltip.** Part 2: `[popover]` panel at 17.25rem, and `[popover=hint]` / `[role=tooltip]` inverted, max 12.5rem, entry `scale(0.98)`.

**Progress.** Bare `progress` is `appearance: none`, height `0.625rem`, pill radius, track `--color-border`, fill from the variant or `currentColor`, painted on the WebKit and Mozilla value pseudos (`elements:src/styles/elements/_progress.scss:28`, `:45`).

**Spinner.** `.spinner` is a 2em ring, one side transparent, `0.75s` linear. Reduced motion sets the duration to `1.5s` rather than `none` (`elements:src/styles/components/_spinner.scss:28`, `:60`).

**Toast.** `[popover][role=status]` is a flex banner, design width 22rem via `floater-bounds`, large shadow, z-index 1090. `display: flex` is gated on `:popover-open` (`elements:src/styles/components/_output.scss:87`, `:199`, `:206`). The part 2 scale-in still matches this popover, because the scale rule excludes `aside`, `dialog`, and `nav` only.

**Forms.** `form` is a column with gap (`elements:src/styles/components/_form.scss:31`). Text inputs take canvas fill, `--color-border-strong`, `--radius-md`, and their own focus ring (`elements:src/styles/elements/_input.scss:41`). `select` strips the OS chevron and paints a data-URL (`elements:src/styles/elements/_select.scss:34`). Checkbox and radio start at `elements:src/styles/elements/_input.scss:319`.

**Tables.** `table` is full width, collapsed borders, `--text-sm`, header wash 40% of the border color, row hover 25%. The stripe token is 12% of the border color (`elements:src/styles/elements/_table.scss:30`, `:50`). A comment names `.striped > tbody > tr:nth-of-type(odd)` (`:454`); that assignment was not in the lines read. Variant classes tint a row with `bg-subtle` (`:384`). Sortable `th[data-key]` masks a chevron (`:175`).

## 4. Relation

**Parts 1–2, short.** Factors, the 150/250 split, the panel curve, reduced-motion `transition: none`, tertiary, and the oklab tier mix are mechanisms to take over; Bootstrap has no density or radius factor. The Sass 4.5 contrast pick is new ground: elements does not implement it, and the source row marks it `bootstrap` (`scaffold:.orkestrel/veneer/distillates/absorb-styles-source-distillate.md:39`) while identity C01 marks the floor `carry` (`scaffold:.orkestrel/veneer/distillates/absorb-styles-identity-distillate.md:59`). `retune` is already Veneer’s pack hook; elements’ `data-theme` cores are a different hook, and their hsl palettes are identity. Identity-drop values still in elements: primary `oklch(48% 0.255 264)` (T08, `:16`), dark primary light-cyan (C08, `:67`), body `0.875rem` (T07, `:15`). Native `dialog`, `[popover]`, `::backdrop`, `::details-content`, anchor positioning, `@starting-style`, `interpolate-size`, and `scrollbar-gutter` are new ground. Bootstrap already covers class `:focus-visible` and `.form-control::placeholder`. Identity-drop on those native rules: dialog `scale(0.96)` (M09, `:37`), popover and toast `scale(0.98)` (M18–M19, `:45`), backdrop `blur(2px)` plus `@starting-style` (M25, `:53`). Root `interpolate-size` is a styles reuse (`absorb-styles-source-distillate.md:57`); using it for collapse is an identity drop (M24, `absorb-styles-identity-distillate.md:51`).

**Alert.** Bootstrap covers `.alert` (`veneer:src/bootstrap/components/_alert.scss:4`). The `aside[role=alert]` banner is new ground. Its height tween is the M24 collapse pattern, so that motion is an identity drop. The 4px bar is the same measure identity drops on bare `blockquote` (S05, `:114`); the alert use was not itself marked.

**Badge.** Bootstrap covers `.badge` (`veneer:src/bootstrap/components/_badge.scss:4`). Elements’ `.badge` is the same class, so a styles rule takes it over and wins by layer. Subtle-by-default is not Bootstrap’s saturated badge. Not an identity row.

**Button and button group.** Bootstrap covers `.btn` and `.btn-group` (`veneer:src/bootstrap/components/_buttons.scss:58`, `veneer:src/bootstrap/components/_button-group.scss:37`). A bare `button` rule takes over every Bootstrap button element. Identity S15 keeps a tag surface and has each release class write the reboot back (`absorb-styles-identity-distillate.md:123`). The 88/78 mixes toward `--color-text-strong` are not the carried contrast direction (C02, `:61`). `[role=group]` is new ground beside `.btn-group`.

**Card.** Bootstrap covers `.card` (`veneer:src/bootstrap/components/_card.scss:4`). `article` is new ground and also restyles every `<article>`, including one inside a Bootstrap card.

**Carousel.** Bootstrap covers `.carousel` (`veneer:src/bootstrap/components/_carousel.scss:4`). Elements’ `.carousel` takes that class over. The `0.6s` duration matches the carried slide token (M05, `:33`). The panel bezier on the slide is not marked identity. A fade variant was not read.

**Collapse and accordion.** Bootstrap covers `.collapse` and `.collapsing` (`veneer:src/bootstrap/components/_transitions.scss:15`, `:18`) and `.accordion` (`veneer:src/bootstrap/components/_accordion.scss:4`). Native `details` is new ground. Copying `interpolate-size` onto that disclosure is the M24 identity drop. Bootstrap’s `0.35s` collapse timing stays on the Bootstrap face (`absorb-styles-source-distillate.md:61`).

**Dropdown.** Bootstrap covers `.dropdown-menu` (`veneer:src/bootstrap/components/_dropdown.scss:28`). `menu[popover]` is new ground. Identity M20 keeps the Bootstrap menu immediate and leaves Elements’ menu scale unshipped (`absorb-styles-identity-distillate.md:46`); the panel still inherits the part 2 `scale(0.98)` because `menu` is not in the aside/dialog/nav exclusion.

**List group.** Bootstrap covers `.list-group` (`veneer:src/bootstrap/components/_list-group.scss:4`). Elements’ menu rows are new ground. The `.group` list chrome is unverified.

**Modal.** Bootstrap covers `.modal` (`veneer:src/bootstrap/components/_modal.scss:37`). Native `dialog` is new ground. `scale(0.96)` and `blur(2px)` are identity drops (M09, M25). `.small` / `.large` / `.fullscreen` are new ground beside `.modal-sm` and `.modal-lg`.

**Nav, tabs, navbar, pagination.** Bootstrap covers `.nav`, `.nav-tabs`, `.nav-pills` (`veneer:src/bootstrap/components/_nav.scss:4`, `:50`, `:82`), `.navbar` (`veneer:src/bootstrap/components/_navbar.scss:4`), and `.page-link` (`veneer:src/bootstrap/components/_pagination.scss:29`). Role tablists, `body > header`, and `aria-label` pagination are new ground, not take-overs of those classes. Pagination’s active fill is `--color-primary`, which is the dropped oklch (T08), not the fixed blue T17 keeps for Bootstrap pagination (`absorb-styles-identity-distillate.md:25`).

**Offcanvas.** Bootstrap covers `.offcanvas` (`veneer:src/bootstrap/components/_offcanvas.scss:423`). The popover drawer is new ground. `translateX(100%)` matches the travel M12 keeps (`absorb-styles-identity-distillate.md:38`). Opacity 0 on the closed drawer is the fade M13 drops (`:39`).

**Popover and tooltip.** Bootstrap covers `.popover` and `.tooltip` (`veneer:src/bootstrap/components/_popover.scss:4`, `veneer:src/bootstrap/components/_tooltip.scss:4`). `[popover]` and `[role=tooltip]` are new ground. `scale(0.98)` is the M18 identity drop.

**Progress.** Bootstrap covers `.progress` (`veneer:src/bootstrap/components/_progress.scss:9`). Native `progress` is new ground. No stripe animation was read.

**Spinner.** Bootstrap covers `.spinner-border` (`veneer:src/bootstrap/components/_spinners.scss:5`). Elements’ `.spinner` takes a different class, so it does not collide, and it is new ground. Reduced motion at `1.5s` is the M23 identity drop (`absorb-styles-identity-distillate.md:49`). The carried rule is `animation: none` (M21, `:47`).

**Toast.** Bootstrap covers `.toast` (`veneer:src/bootstrap/components/_toasts.scss:4`). `[popover][role=status]` is new ground. The inherited `scale(0.98)` is the M19 identity drop.

**Forms.** Bootstrap covers `.form-control` (`veneer:src/bootstrap/components/_form-control.scss:4`). Bare `input` and `select` take over those elements wherever Bootstrap’s markup uses the tags. That is the same tag-surface choice S15 records for `button`.

**Tables.** Bootstrap covers `.table` (`veneer:src/bootstrap/components/_tables.scss:4`). Bare `table` takes over every table, including `.table`. The 12% stripe token matches the stripe T03 drops (`absorb-styles-identity-distillate.md:12`); Bootstrap’s stripe stays 5% (T01, `:8`). Header weight 600 matches the heading weight T16 drops (`:24`). The expansion panel’s `interpolate-size` tween is the M24 pattern.