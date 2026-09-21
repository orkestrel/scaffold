<!-- Retained from tmp/cursor/elements-button-scout-result.md. Bench lane: grok on Cursor Grok 4.6 High, journal elements-button-scout.jsonl, session d5e3ebf2-20de-4698-b293-51a40592c548, 2026-09-21. Elements has no capture harness and no state grid; only the numeric calibration Veneer already holds. -->

I'll open the brief and the governing agent files first, then answer it exactly as written without editing anything.The brief is a read-only scout of Elements’ button specimens and capture harness. I’ll confirm HEAD, then locate the demo page, harness, states, tokens, and any Elements–Veneer comparison artifacts.HEAD matches the brief. Next I’ll map Elements’ button demo, capture harness, reachable states, tokens, and any comparison artifacts.I have the specimen page. Next I’ll pin routing, theme control, token values, package scripts, and whether a capture harness exists.Confirmed HEAD: Elements `3b41900`, Veneer `92aad70`. Distilled evidence only.

## 1. Where Elements renders button specimens

| What | Pointer | Reading |
| --- | --- | --- |
| Demo page | `elements/app/browser/pages/ButtonPage.vue:64` | Canonical `<button>` showcase; hash route `#/button`. |
| Route | `elements/app/browser/router.ts:137` | `id: 'button'`, group `Elements — Interactive`, page `ButtonPage`. |
| Hash parse | `elements/app/browser/router.ts:639` | `#/button` and `#/button/<section-id>` (section ids such as `button-states`). |
| App mount | `elements/app/browser/main.ts:10` | Showcase app mounts `App.vue`. |
| Shell | `elements/app/browser/App.vue:338` | Header, nav, and theme controls wrap every non-example page, including Button. |
| Component | `elements/src/styles/elements/_button.scss:27` | Bare `button` cascade and `--set-button-*` tokens. |
| Factory / composable | `elements/src/browser/factories/createButton.ts:18`, `elements/src/browser/composables/useButton.ts:15` | Toggle semantics; used on this page and the playground. |
| Extra pages | `elements/app/browser/pages/UseThemeButtonPage.vue:77` (`#/use-theme-button`), `elements/app/browser/playgrounds/ButtonPlaygroundPage.vue:134` (`#/playground-button`) | Theme+toggle demo; `createButton` statechart with one `primary large` host — not the appearance matrix. |

Specimen list on `ButtonPage.vue`:

| Axis | Where | Members |
| --- | --- | --- |
| Variants | `:100`, registry `elements/src/browser/modifiers.ts:28` | `primary`, `secondary`, `tertiary`, `success`, `warning`, `danger`, `information`, plus a classless Default. |
| Sizes | `:120` | `small`, default (no size class), `large` — shown on `primary` / `secondary` / `danger`. |
| Styles | `:145` | Classless (page copy calls this bare), `.subtle`, `.filled`. On a button, classless `.primary` already fills: `elements/tests/src/styles/elements/_button.test.ts:96` and `:191` (`.primary.filled` mirrors classless `.primary`). Extra treatments: `.flat` `:172`, `.flush` `:209`, `.compact` `:352`, `.dropdown` `:390`, `.reveal` / `.reveal.end` `:448`. |
| States | `:299` | Live hover / `:focus-visible` (no class). Static: `.active` + `aria-pressed="true"`, `[disabled]`, `.loading` + spinner. |
| Disabled | `:312`, `:191`, `:754` | `[disabled]` on filled primary, each `.flat` row, and forced-colors row. No `.disabled` class on this page (`ButtonPage.test.ts:69`). |
| Anchor hosts | `:633` | `<a href="#button-link" class="primary filled">`, `.success`, `.danger.subtle`, `.information.large`. Chrome-shaped anchors: `elements/src/styles/elements/_a.scss:134`. |
| Groups | `:654` | `[role="group"]` and `[role="toolbar"]`. |

Theme control (shell, so it is on Button):

| Control | Pointer | Reading |
| --- | --- | --- |
| Palette `<select aria-label="Theme">` | `App.vue:359` | `themeCtl.select` writes `<html data-theme>` (`default` removes it). Cores: Default, Auroramoon, Eclipse, Honeymoon, Lagunamoon (`App.vue:15`). |
| Light/dark button | `App.vue:370` | `themeCtl.toggle()`; `aria-label` `Switch theme (currently ${mode})`; icon from resolved mode (`App.vue:233`). |
| Write path | `elements/src/browser/theme.ts:71` | `data-mode="light"|"dark"`; `'system'` removes `data-mode` so `@media (prefers-color-scheme: dark)` owns the flip. Palette name is the separate `data-theme` axis (`theme.ts:80`). |
| CSS pins | `elements/src/styles/_theme.scss:425` | `[data-mode='light']` / `[data-mode='dark']`; OS-follow at `_theme.scss:285`. |
| In-page picker (not on Button) | `UseThemeButtonPage.vue:119` | `role="radiogroup" aria-label="Theme"` for the composable demo. |

Could not be found: a named rest / pressed / focus / hover / active specimen grid matching Veneer’s `<state>--<variant>.png` set; Button’s states are live CSS plus a few static classes.

## 2. Capture harness / portfolio

| Claim | Pointer | Reading |
| --- | --- | --- |
| Vitest + Playwright | `elements/vite.config.ts:6`, `:88`, `:204`, `:242`, `:279`, `:299` | Browser provider is Playwright Chromium. Projects: `src:browser`, `src:styles`, `app:browser`, `app:styles`. |
| Button page test | `elements/tests/app/browser/pages/ButtonPage.test.ts:32` | Vue `createApp(ButtonPage)` smoke + class presence. No journey, no capture, no pointer/keyboard drive. |
| Style tests | `elements/tests/src/styles/elements/_button.test.ts:1` | Real `getComputedStyle` in Chromium. No `:hover` / `:focus-visible` drive. |
| Statechart playground | `ButtonPlaygroundPage.vue:1`, `StatechartHarness.vue` | URL query autoplay for `createButton` toggle. Not a capture family. |
| Scripts | `elements/package.json:31` | Browser-touching names: `test`, `test:app`, `test:app:browser`, `test:app:styles`, `test:src`, `test:src:browser`, `test:src:styles`, `dev`, `showcase`, `build:showcase`, `show`. |
| Manual screenshot note | `elements/guides/contribute.md:420` | Process text: sample variants × states on the preview server. Not a harness. |

Could not be found: a `CAPTURE` injection, a capture family, a `tmp/capture` directory or convention, a `test:journey` script, or a Playwright spec file outside Vitest.

## 3. States reachable by real input on `#/button`

| State | Reachable? | How the page announces it |
| --- | --- | --- |
| Hover | Yes, on any non-disabled button. Page says so at `ButtonPage.vue:301`. Paint: `elements/_button.scss:148` (`&:hover`). | CSS `:hover` only. No hover class, no ARIA. |
| Active (press) | Yes, pointer-down on a non-disabled button. Paint: `_button.scss:156` (`&:active, &.active`). | Transient `:active`. Persistent demo uses class `.active` (`ButtonPage.vue:311`). |
| Focus-visible | Yes, Tab onto a button. Page: `ButtonPage.vue:301`. Paint: `_button.scss:185` and `elements/src/styles/surfaces/_focus.scss:71` (surfaces is the later layer). | CSS `:focus-visible` only. `outline: none` + `box-shadow` ring. Click does not paint the ring (`_focus.scss:5`). |
| Pressed / checked | Yes, click the `useButton` host at `#button-toggle` (`ButtonPage.vue:694`). Factory: `createButton.ts:28` writes `aria-pressed` and toggles `.active`. Static demos already carry `aria-pressed="true"` (`ButtonPage.vue:311`, `:665`, `:755`). Selected paint: `_button.scss:179` (`&[aria-pressed='true']` fills the variant). | `.active` class + `aria-pressed="true"|"false"`. Event `elements:button:toggle`. Group Center is a static pressed segment, not a live exclusive group. |
| Disabled | Present, not toggled by a control. Specimens use the `disabled` attribute (`ButtonPage.vue:312`). | `[disabled]` / `:disabled`. Paint: `_button.scss:190` — `cursor: not-allowed`, `pointer-events: none`, `opacity: var(--set-button-disabled-opacity)`. `.disabled` class exists in `modifiers/_states.scss:12` but is not on this page. Disabled buttons cannot take hover / active / focus from input. |
| Loading (extra) | Static class only (`ButtonPage.vue:313`). | `.loading`; inner `<span class="spinner" role="status" aria-label="Loading">`. Cursor from `modifiers/_states.scss:29` (`progress`). |

Could not be found: a page control that enables/disables a specimen; a hover or focus-visible class or ARIA; a test that reaches hover / focus-visible / press with real pointer or Tab.

## 4. Primary-role tokens (default theme, light and dark)

Default core (no `data-theme`). Opt-in cores such as `elements/src/styles/themes/_auroramoon.scss:14` retune `--color-primary` and are a different calibration.

| Token | Light | Dark | Declared at |
| --- | --- | --- | --- |
| Fill `--color-primary` | `oklch(48% 0.255 264)` | `oklch(70% 0.15 233)` | Light: `_theme.scss:103` (`@theme`). Dark OS-follow: `_theme.scss:291`. Dark pin: `_theme.scss:438`. |
| Button uses that fill | `--set-variant-background-color: var(--color-primary)` | same | `modifiers/_variants.scss:49`. Button consumes it via `--set-button-background-color` (`_button.scss:33`). |
| Text `--set-variant-color` | `white` | `white` | `_variants.scss:50`. Proven: `_button.test.ts:103`. |
| Focus width `--set-focus-box-shadow-width` | `0.1875rem` | same | `_tokens.scss:35`. |
| Focus opacity `--set-focus-box-shadow-opacity` | `0.45` | same | `_tokens.scss:36`. |
| Focus color | `var(--set-variant-background-color, var(--color-primary))` → primary fill | same | Button shadow: `_button.scss:56`. Surface `--set-focus-color`: `_focus.scss:48`. Ring mix: `color-mix(in oklab, <fill> 45%, transparent)` (`_button.scss:57`, `_focus.scss:73`). Layer order in `_tokens.scss:27` puts `surfaces` after `elements`. |
| Hover mix `--set-state-hover-mix` | `88%` of the button fill kept, mixed in `srgb` toward `--color-text-strong` | same percentage | Mix amount: `_tokens.scss:84`. Rule: `_button.scss:148`. |
| Active mix `--set-state-active-mix` | `78%` of the fill kept, same mixer | same percentage | `_tokens.scss:85`. Rule: `_button.scss:156`. |
| Mixer `--color-text-strong` | `var(--color-slate-950)` | `var(--color-white)` | Light: `_theme.scss:144`. Dark: `_theme.scss:297` and `:441`. |
| Disabled opacity `--set-button-disabled-opacity` | `0.5` | same | `_button.scss:55`. Sibling `--set-state-disabled-opacity: 0.5` at `_tokens.scss:62`. |

Could not be found: a declared post-mix hover/active fill number; a source literal for `--color-slate-950` (Tailwind palette, not pinned in Elements). Veneer later records that mixer as `color(srgb 0.00742457 0.0232852 0.0925134)` — see section 5.

## 5. Elements-versus-Veneer comparison artifacts

Token calibration exists in Veneer, taken from this Elements HEAD. PNG-beside-PNG does not.

| Artifact | Pointer | Reading |
| --- | --- | --- |
| Source legend | `veneer/guides/veneer.md:314` | `elements` = “Read from Elements' built showcase on 2026-09-20”. |
| Primary fill map | `veneer/guides/veneer.md:362` | `oklch(0.48 0.255 264)`, dark `oklch(0.7 0.15 233)` — same values as Elements’ percent form. |
| Button state map | `veneer/guides/veneer.md:483` | Mixer, hover `12%`, active `22%` (complement of Elements’ `88%` / `78%` retained fill), focus width/opacity at `veneer.md:467`. |
| Emitted maps | `veneer/src/styles/_tokens.scss:16` | `$light` / `$dark` `state-mixer`, `state-hover`, `state-active`, `primary`. |
| Measured fixture | `veneer/tests/setupStyles.ts:1652` | `CALIBRATED_TIERS` from `dist/showcase/index.html` at commit `3b41900` on 2026-09-20 (Chromium `153.0.8010.12`, Edge `153.0.4234.48`). Primary light/dark base: `:1666`. |
| Drift test | `veneer/tests/src/styles/tokens.test.ts:22` | Asserts Veneer tokens against `CALIBRATED_TIERS`. |

Could not be found: a screenshot or frame-set that places Elements specimens beside Veneer’s `tmp/capture/states/` portfolio; an Elements-side Veneer fixture or comparison test; any `.png` under either checkout via workspace glob (Veneer’s capture directory is not in the tree this scout could list).