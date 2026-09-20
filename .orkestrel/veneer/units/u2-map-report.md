# U2-map report (Grok, session f38095a5-d13f-4f9c-9c31-76eafb7b5fdc, 290038 ms)

I'll read the brief and the governing files it requires, then execute it exactly.I'll map the showcase routes, specimens, and the style/factory sources the brief names.I'll read the router and the showcase pages that own those specimens.I'll read the style partials, factories, and theme writers next so each specimen row can cite `file:line`.Question
Where each listed specimen renders in Elements’ showcase, how a Playwright script reaches it, and which partial plus factory produce its rest, states, and motions.

Evidence

Shared chrome (every docs route except Examples)
- Hash router: `#/{id}` and `#/{id}/{section}` — `C:/Users/mikes/WebstormProjects/elements/app/browser/router.ts:109-112`, `navigate` `C:/Users/mikes/WebstormProjects/elements/app/browser/router.ts:673-674`.
- Light/dark (`data-mode`): header button accessible name `Switch theme (currently ${mode})` where `mode` is `light` or `dark` — `C:/Users/mikes/WebstormProjects/elements/app/browser/App.vue:370-374`; click calls `themeCtl.toggle()` `C:/Users/mikes/WebstormProjects/elements/app/browser/App.vue:374` → `createTheme.toggle` `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createTheme.ts:45-49` → `writeMode` `C:/Users/mikes/WebstormProjects/elements/src/browser/theme.ts:73-77` (`system` removes attribute; `light`/`dark` sets `data-mode`). CSS pins: `C:/Users/mikes/WebstormProjects/elements/src/styles/_theme.scss:425-429`.
- Theme core (`data-theme`): combobox accessible name `Theme` — `C:/Users/mikes/WebstormProjects/elements/app/browser/App.vue:359-364`; change calls `themeCtl.select` `C:/Users/mikes/WebstormProjects/elements/app/browser/App.vue:364` → `createTheme.select` `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createTheme.ts:52-58` → `writeName` `C:/Users/mikes/WebstormProjects/elements/src/browser/theme.ts:82-86` (`default` removes attribute). Option labels: Default, Auroramoon, Eclipse, Honeymoon, Lagunamoon — `C:/Users/mikes/WebstormProjects/elements/app/browser/App.vue:15-20`.
- Motion tokens: `--set-transition-duration: 150ms` `C:/Users/mikes/WebstormProjects/elements/src/styles/_tokens.scss:92`; `--set-motion-duration: 250ms` and `--set-motion-timing-function: cubic-bezier(0.32, 0.72, 0, 1)` `C:/Users/mikes/WebstormProjects/elements/src/styles/_tokens.scss:148-149`; `--set-motion-slide-distance: 0.5rem` `C:/Users/mikes/WebstormProjects/elements/src/styles/_tokens.scss:160`. Reduced-motion mixin zeroes `transition` — `C:/Users/mikes/WebstormProjects/elements/src/styles/_mixins.scss:75-92`. Completion helper: `runTransition` `C:/Users/mikes/WebstormProjects/elements/src/browser/helpers.ts:1592-1615` (fallback `400` ms `C:/Users/mikes/WebstormProjects/elements/src/browser/constants.ts:62`); `hasTransitionDuration` `C:/Users/mikes/WebstormProjects/elements/src/browser/helpers.ts:1634-1641`. Generic keyboard ring: `C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_focus.scss:71-78`.

Body copy
- Route `#/typography` (`id: 'typography'` `C:/Users/mikes/WebstormProjects/elements/app/browser/router.ts:176-181`); page `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/TypographyPage.vue`. Deep link `#/typography/typography-paragraph`.
- Reach: passive. Unique paragraph text: `This is a third paragraph to make the rhythm visible. Notice how the gap between paragraphs is consistent without any margin on the paragraph itself — the framework's layout container owns the spacing.` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/TypographyPage.vue:78-82`. Selector: `section#typography-paragraph p` (last of the three).
- Rest: `body` canvas/text/type — `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_body.scss:14-24` (`background-color: var(--color-canvas)`, `color: var(--color-text)`, `font-size: var(--set-font-size-base)`). Paragraphs inherit; no hover/focus/active/disabled/open rules on body copy.
- Factory: none.
- Motion: none.

h1–h6
- Route `#/headings` `C:/Users/mikes/WebstormProjects/elements/app/browser/router.ts:170-175`; page `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/HeadingsPage.vue`. Deep link `#/headings/headings-cascade`.
- Reach: passive. Exact text in `div.stack` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/HeadingsPage.vue:91-97`: `Heading level 1 — page title`; `Heading level 2 — section heading`; `Heading level 3 — subsection`; `Heading level 4 — grouping`; `Heading level 5 — small group`; `Heading level 6 — sidebar label`. Do not use the page title `Headings` (`C:/Users/mikes/WebstormProjects/elements/app/browser/pages/HeadingsPage.vue:50`) as the h1 specimen.
- Rest: shared `:where(h1…h6)` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_h1-h6.scss:30-73`; per-level sizes `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_h1-h6.scss:77-94` (h1 `2.25rem` … h6 `1rem`). Color transition only `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_h1-h6.scss:73` via mixin (150ms, reduced-motion none). No hover/focus-visible/active/disabled/open/closed rules on headings.
- Factory: none.
- Motion: none beyond the color token tween.

Bare `<button>`
- Route `#/button` `C:/Users/mikes/WebstormProjects/elements/app/browser/router.ts:137-142`; `#/button/button-bare`.
- Reach: role `button`, name `Save` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/ButtonPage.vue:92`.
- Rest: `button {…}` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_button.scss:28-119` (transparent fill, `--set-button-*` chain). Hover `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_button.scss:148-154` (`color-mix` with `--set-state-hover-mix` `88%` `C:/Users/mikes/WebstormProjects/elements/src/styles/_tokens.scss:84`). Active `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_button.scss:156-163` (`--set-state-active-mix` `78%`). Focus-visible `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_button.scss:185-188` (element ring; surface ring also `C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_focus.scss:71-78`). Disabled `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_button.scss:190-196` (opacity `--set-button-disabled-opacity` `0.5`). Motion: color/background/border/box-shadow/opacity at `--set-button-transition-duration` → `150ms`, mixin-reduced — `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_button.scss:111-119`.
- Factory: `createButton` only mirrors `.active` / `aria-pressed` `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createButton.ts:32-36`; this specimen does not use it. Hover/focus/press/disabled are CSS.

`button.primary`
- Same route; `#/button/button-variants`.
- Reach: role `button`, name `Primary` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/ButtonPage.vue:110-112` (`VARIANTS` starts `primary` `C:/Users/mikes/WebstormProjects/elements/src/browser/modifiers.ts:28-29`).
- Rest: `.primary` tokens `C:/Users/mikes/WebstormProjects/elements/src/styles/modifiers/_variants.scss:49-57` consumed by `_button.scss:32-40`. Same hover/focus/active/disabled rules as bare button.
- Factory: CSS; `createButton` unused here.

`button.subtle`
- `#/button/button-dropdown` (or groups `#/button/button-groups`).
- Reach: role `button`, name `Subtle dropdown` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/ButtonPage.vue:420` (`class="subtle dropdown"`). Alternate unique names in groups: `Left` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/ButtonPage.vue:664`.
- Rest: `.subtle` `C:/Users/mikes/WebstormProjects/elements/src/styles/modifiers/_styles.scss:44-48` → `--set-style-*` into `_button.scss:32-40`. Same interactive states as bare button.
- Factory: CSS.

`button.small`
- `#/button/button-sizes`.
- Reach: `section#button-sizes button.primary.small`, name `Small` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/ButtonPage.vue:129` (also wears `.primary`; two other `Small` buttons exist).
- Rest: `.small` `C:/Users/mikes/WebstormProjects/elements/src/styles/modifiers/_sizes.scss:19-25` → `--set-size-*` into `_button.scss:42-50`. Same states as bare button.
- Factory: CSS.

`button.large`
- `#/button/button-sizes`.
- Reach: `section#button-sizes button.primary.large`, name `Large` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/ButtonPage.vue:131`.
- Rest: `.large` `C:/Users/mikes/WebstormProjects/elements/src/styles/modifiers/_sizes.scss:27-32`. Same states as bare button.
- Factory: CSS.

Disabled button
- `#/button/button-states`.
- Reach: role `button`, name `[disabled]` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/ButtonPage.vue:312` (`class="primary" disabled`).
- State: `_button.scss:190-196`; class `.disabled` also `C:/Users/mikes/WebstormProjects/elements/src/styles/modifiers/_states.scss:12-21`. Hover/active/focus do not apply (`pointer-events: none`).
- Factory: none.

Bare `<dialog>` opened modally
- Route `#/dialog-element` `C:/Users/mikes/WebstormProjects/elements/app/browser/router.ts:161-166`; `#/dialog-element/dialog-element-open-modes`.
- Reach: role `button`, name `Open modal` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/DialogElementPage.vue:118` (`dialogModal.showModal()`). Opened heading `Modal dialog` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/DialogElementPage.vue:136-137`. Close: footer name `Close` or `OK` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/DialogElementPage.vue:144-145`.
- Rest closed: `dialog` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_dialog.scss:81-109` (`opacity: 0`, `transform: scale(0.96)`). Open `[open]` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_dialog.scss:238-241` (`opacity: 1`, `transform: none`). Modal centering `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_dialog.scss:180-186`. Backdrop open `dialog:modal::backdrop` `C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_backdrop.scss:116-119`; backdrop tween on bare `dialog::backdrop` `C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_backdrop.scss:90-97`. No dialog `:hover`/`:disabled`. Focus: UA trap + `_focus.scss` / inner buttons.
- Motion: properties color/background/border (`150ms`), opacity (`250ms` `ease-out`), transform (`250ms` `--set-motion-timing-function`), overlay + display (`250ms` `allow-discrete`), delayed discrete position/inset/translate — `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_dialog.scss:140-154`. `@starting-style dialog[open]` `opacity: 0; transform: scale(0.96)` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_dialog.scss:260-264`. Reduced-motion: mixin `transition: none` `_mixins.scss:87-92`. This page uses native `showModal`/`close`, not the factory. Factory start/complete: `show` → `element.showModal()` then `runTransition` emit open `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createDialog.ts:55-76`; `hide` → `element.close()` then `runTransition` emit close `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createDialog.ts:79-99`. Factory-driven showcase: `#/use-dialog`, `#/playground-dialog`.

Non-modal `<dialog>`
- Same page.
- Reach: role `button`, name `Open inline (non-modal)` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/DialogElementPage.vue:117` (`dialogBare.show()`). Body text starts `Inline dialog` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/DialogElementPage.vue:126-129`. Close: name `Close` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/DialogElementPage.vue:132`. Already-open flush dialogs at `#/dialog-element/dialog-element-flush` are also non-modal (`<dialog open class="flush">` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/DialogElementPage.vue:305`) but are not the open/close motion specimen.
- Open geometry: `&[open]:not(:modal)` `position: static` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_dialog.scss:208-212`. Entry `@starting-style dialog:not(:modal)` `opacity: 0; transform: translateY(calc(var(--set-motion-slide-distance) * -1))` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_dialog.scss:303-311`. Close still uses closed-state `scale(0.96)` (commented jump `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_dialog.scss:195-206`). No `::backdrop` scrim (comment `C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_backdrop.scss:27`). Factory non-modal: `options.modal` false → `element.show()` `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createDialog.ts:62-65`.

`<details>` disclosure
- Route `#/details` `C:/Users/mikes/WebstormProjects/elements/app/browser/router.ts:155-160`; `#/details/details-bare`.
- Reach: role `group` host; toggle is `summary` with name `What is the framework's modifier cascade?` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/DetailsPage.vue:86`. Closed by default (no `open`).
- Rest: `details` box `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_details.scss:26-56`. Summary rest `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_summary.scss:27-86`. Closed content: `&::details-content` `block-size: 0; opacity: 0` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_details.scss:77-85`. Open: `&[open]::details-content` `block-size: auto; opacity: 1` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_details.scss:87-89`. Marker rotate `details[open] > summary::before` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_summary.scss:122-124`. Open margin `details[open] > summary` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_summary.scss:130-132`. Summary focus: surface `_focus.scss:71-78`; details host focus `_details.scss:97-100`. Hover: none on details/summary beyond cursor.
- Motion: `::details-content` `block-size` `250ms` `--set-motion-timing-function`, `opacity` `250ms` `ease-out`, `content-visibility` `250ms` `allow-discrete` — `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_details.scss:81-84` (bare `transition:`, not the mixin — no reduced-motion pairing on this pseudo). Summary `margin-block-end` uses mixin `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_summary.scss:79-81`. Marker `rotate` mixin `150ms` `C:/Users/mikes/WebstormProjects/elements/src/styles/elements/_summary.scss:105`. No `@starting-style`. No `display`/`overlay`. `interpolate-size` named from `_tokens.scss:113` as on `html` in `_html.scss`; `_details.scss:66` names `_root.scss`.
- This page is native `[open]`; factory does not run JS height. Factory: `element.open = true/false` then emit `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createDetails.ts:86-101`; comment `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createDetails.ts:12-16`. Factory showcase: `#/use-details`, `#/playground-details`.

`[popover]` panel
- Route `#/popover-surfaces` `C:/Users/mikes/WebstormProjects/elements/app/browser/router.ts:233-238`; `#/popover-surfaces/popover-surfaces-auto`.
- Reach: role `button`, name `Open auto popover` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/PopoverSurfacesPage.vue:117-119` (`popovertarget="demo-pop-auto"`). Panel heading text `Auto popover` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/PopoverSurfacesPage.vue:122`. Dismiss: Esc / click-outside (native auto).
- Rest: `[popover]` chrome `C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_popover.scss:73-84`. Closed motion values `[popover]:not(:where(aside, dialog, nav))` `opacity: 0; transform: scale(0.98)` `C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_popover.scss:204-215`. Open `:popover-open` `opacity: 1; transform: none` `C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_popover.scss:249-252`. No backdrop scrim (`_backdrop.scss:31`).
- Motion: opacity/transform/overlay/display at `--set-popover-transition-duration` → `150ms`, overlay+display `allow-discrete`, mixin-reduced — `C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_popover.scss:208-215`. `@starting-style` `C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_popover.scss:254-280`. Native `popovertarget` on this page. Factory: `panel.showPopover({ source: anchor })` then `finishOpen`/`runTransition` `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createPopover.ts:189-199`; hide `hidePopover` + `finishClose` `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createPopover.ts:202-208`; skip wait if `!hasTransitionDuration` `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createPopover.ts:165-186`. Factory showcase: `#/use-popover`, `#/playground-popover`.

`[popover='hint']` tooltip
- `#/popover-surfaces/popover-surfaces-hint`.
- Reach: role `button`, name `Hover-ish trigger` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/PopoverSurfacesPage.vue:199` (click, not hover; native `popovertarget`). Panel text `Inverted tooltip — light text on dark surface in light mode.` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/PopoverSurfacesPage.vue:205-207`.
- Rest: `[popover='hint'], [role='tooltip']` `C:/Users/mikes/WebstormProjects/elements/src/styles/surfaces/_popover.scss:344-351` plus generic `[popover]` chrome and the same `150ms` scale `0.98` motion as generic popover (`_popover.scss:204-280`).
- Factory for this markup: none (native `popover="hint"`). `createTooltip` writes `panel.popover = 'manual'` and `role='tooltip'` `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createTooltip.ts:230-236`, hover/focus `mouseenter`/`focusin` `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createTooltip.ts:197-198`, `showPopover`/`hidePopover` + `runTransition` `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createTooltip.ts:154-170`. Hover factory specimen (same hint chrome via `role=tooltip`, not `popover=hint`): `#/use-tooltip`, button name `Save` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/UseTooltipPage.vue:204`.

`aside[popover]` drawer
- Route `#/aside` `C:/Users/mikes/WebstormProjects/elements/app/browser/router.ts:221`; `#/aside/aside-popover`.
- Reach: role `button`, name `Slide from end (default)` — `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/AsidePage.vue:415` (`popovertarget="aside-drawer-end"`). Panel header `End drawer` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/AsidePage.vue:439-441`. Close: button name `Close` `C:/Users/mikes/WebstormProjects/elements/app/browser/pages/AsidePage.vue:442-450`.
- Rest/geometry: `:is(aside, nav)[popover]` `C:/Users/mikes/WebstormProjects/elements/src/styles/components/_aside.scss:665-677` (default end: `transform: translateX(100%)`, `opacity: 0`). Open `:popover-open` `display: flex; transform: translateX(0); opacity: 1` `C:/Users/mikes/WebstormProjects/elements/src/styles/components/_aside.scss:685-688`. `.end` restates `C:/Users/mikes/WebstormProjects/elements/src/styles/components/_aside.scss:772-779`. `composables/_aside.scss` is empty `C:/Users/mikes/WebstormProjects/elements/src/styles/composables/_aside.scss:32-35`. Backdrop: `:is(aside, nav)[popover]:popover-open::backdrop` `_backdrop.scss:116-119`.
- Motion: transform `250ms` `--set-motion-timing-function`, opacity `250ms` `ease-out`, overlay+display `250ms` `allow-discrete`, mixin-reduced — `C:/Users/mikes/WebstormProjects/elements/src/styles/components/_aside.scss:656-663`. `@starting-style` default `translateX(100%)` `opacity: 0` `C:/Users/mikes/WebstormProjects/elements/src/styles/components/_aside.scss:695-699`; `.end` `C:/Users/mikes/WebstormProjects/elements/src/styles/components/_aside.scss:777-779`. Native `popovertarget` on this page. Factory: `showPopover`/`hidePopover` immediately, no `runTransition` wait `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createAside.ts:109-125` (comment `C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createAside.ts:40-42`). Factory showcase: `#/use-aside`, `#/playground-aside`.

Distillate

| specimen | route | reach | states to read | motion |
|---|---|---|---|---|
| body copy | `#/typography/typography-paragraph` | `section#typography-paragraph p` text `This is a third paragraph to make the rhythm visible…` | rest only (`_body.scss:14-24`) | none |
| h1–h6 | `#/headings/headings-cascade` | headings named `Heading level 1 — page title` … `Heading level 6 — sidebar label` | rest (`_h1-h6.scss:30-94`); color tween only | none |
| bare button | `#/button/button-bare` | button `Save` | rest/hover/focus-visible/active; disabled N/A | color, background-color, border-color, box-shadow, opacity; `150ms`; mixin RM |
| `button.primary` | `#/button/button-variants` | button `Primary` | same + `.primary` tokens `_variants.scss:49-57` | same `150ms` |
| `button.subtle` | `#/button/button-dropdown` | button `Subtle dropdown` | same + `.subtle` `_styles.scss:44-48` | same `150ms` |
| `button.small` | `#/button/button-sizes` | `section#button-sizes button.primary.small` name `Small` | same + `.small` `_sizes.scss:19-25` | same `150ms` |
| `button.large` | `#/button/button-sizes` | `section#button-sizes button.primary.large` name `Large` | same + `.large` `_sizes.scss:27-32` | same `150ms` |
| disabled button | `#/button/button-states` | button `[disabled]` | disabled opacity `0.5`; no hover | opacity in the `150ms` list |
| modal dialog | `#/dialog-element/dialog-element-open-modes` | button `Open modal` → heading `Modal dialog` | closed `opacity 0` `scale(0.96)`; open `[open]`; `::backdrop` dim | opacity `250ms ease-out`, transform `250ms cubic-bezier(0.32, 0.72, 0, 1)`, overlay+display `250ms allow-discrete`; `@starting-style` scale `0.96`; mixin RM; factory `createDialog.ts:63+73` / `87+96` (page is native) |
| non-modal dialog | same | button `Open inline (non-modal)` | `[open]:not(:modal)` static; no backdrop | entry `@starting-style` `translateY(-0.5rem)`; close still `scale(0.96)` |
| details | `#/details/details-bare` | summary `What is the framework's modifier cascade?` | closed `::details-content` `block-size 0` `opacity 0`; open `auto`/`1` | `block-size`+`content-visibility allow-discrete`+`opacity` `250ms`; **no mixin RM on `::details-content`**; factory sets `[open]` only |
| `[popover]` | `#/popover-surfaces/popover-surfaces-auto` | button `Open auto popover` | closed `opacity 0` `scale(0.98)`; `:popover-open` `1`/`none`; no backdrop | opacity+transform+overlay+display `150ms allow-discrete` on overlay/display; `@starting-style` scale `0.98`; mixin RM; factory `createPopover.ts:197+165` |
| `[popover=hint]` | `#/popover-surfaces/popover-surfaces-hint` | button `Hover-ish trigger` (click) | hint chrome `_popover.scss:344-351`; same motion as `[popover]` | same `150ms` scale `0.98`; `createTooltip` is **not** this markup (`popover=manual`+`role=tooltip`; hover at `#/use-tooltip` button `Save`) |
| `aside[popover]` | `#/aside/aside-popover` | button `Slide from end (default)` | closed `translateX(100%)` `opacity 0`; open `translateX(0)` `opacity 1`; backdrop | transform `250ms cubic-bezier(0.32, 0.72, 0, 1)`, opacity `250ms ease-out`, overlay+display `250ms allow-discrete`; `@starting-style` `translateX(100%)`; mixin RM; factory `createAside.ts:113/122` **no** `runTransition` |
| light/dark | any docs hash | button `/Switch theme \(currently (light\|dark)\)/` | `html[data-mode]` `_theme.scss:425-429` | n/a |
| theme core | any docs hash | combobox `Theme` | `html[data-theme]` via `theme.ts:82-86` | n/a |

Unknowns
- `interpolate-size: allow-keywords` is not in the listed partials; `_tokens.scss:113` points at `_html.scss`, `_details.scss:66` points at `_root.scss`.
- Named theme-core palettes for `[data-theme]` are not in listed `_theme.scss` (only `data-mode` pins).
- Showcase `button.small` / `button.large` specimens also wear `.primary`; no size-only button.
- `[popover='hint']` is native-only on PopoverSurfacesPage; `createTooltip` never sets `popover='hint'`.
- Dialog/details/popover/drawer element pages drive native APIs; factories run on `#/use-*` and `#/playground-*` only.
- `createTheme.ts:12-16` comment still says light/dark writes `data-theme`; live writes are `data-mode` in `theme.ts:73-77`.
- Details content motion has no reduced-motion mixin (`_details.scss:81-84`); motion.md observed duration remaining under RM.

Journal
f38095a5-d13f-4f9c-9c31-76eafb7b5fdc

Deviation
Listed style bound omitted `_html.scss`; `interpolate-size` line was taken from that file after the tokens pointer. `theme.ts` was read because `createTheme` imports it.
