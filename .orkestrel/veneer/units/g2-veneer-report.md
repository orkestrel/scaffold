<!-- G2 distillate. Bench: Cursor Grok 4.7 (Grok 4.7 256K High). Journal: tmp/cursor/g2-veneer.jsonl (launch journal, swept at acceptance). Session: 6cb598a6-d961-4f3a-819b-af7b1a406576. Duration ms: 468520. is_error: false -->

I'll read the brief and the scaffold contracts it depends on, then follow the brief's output format exactly.The brief is an absorption pass: I'll read the tenets first, record git status, then map the checkout under the required headings.### A. Module map

`src/core/types.ts` — token-name types. Exports: `TokenLeaf`, `TokenMap`, `TokenName`.
`src/core/constants.ts` — frozen `--vn-*` name tree. Exports: `TOKEN_NAMES`.
`src/core/errors.ts` — programmer error. Exports: `AppError`, `isAppError`.
`src/core/index.ts` — re-exports `./constants.js`, `./errors.js`, `./types.js`.
`src/browser/types.ts` — color-mode, button, and delegate contracts. Exports: `ColorModeState`, `ColorModeOptions`, `ColorModeInterface`, `ButtonDetail`, `ButtonEventMap`, `ButtonHooks`, `ButtonOptions`, `ButtonInterface`, `DelegateOptions`, `DelegateInterface`.
`src/browser/constants.ts` — Bootstrap attribute, storage key, toggle event, selector, active class. Exports: `COLOR_MODE_ATTRIBUTE`, `COLOR_MODE_KEY`, `BUTTON_TOGGLE`, `BUTTON_SELECTOR`, `BUTTON_ACTIVE`.
`src/browser/helpers.ts` — DOM event emit and hook binding. Exports: `emitEvent`, `bindEventMap`.
`src/browser/validators.ts` — mode, host, and event guards. Exports: `isColorModeState`, `isButtonHost`, `isButtonEvent`.
`src/browser/ColorMode.ts` — attribute controller. Exports: `ColorMode`.
`src/browser/Button.ts` — pressed-state owner. Exports: `Button`.
`src/browser/Delegate.ts` — click delegation. Exports: `Delegate`.
`src/browser/index.ts` — re-exports types, constants, helpers, validators, `ColorMode`, `Button`, `Delegate`.
`src/styles/index.ts` — side-effect `import './index.scss'`. Exports: none.
`src/styles/index.scss` — `@use` order: tokens, theme, reset, element partials, component partials, `utilities/gap`. Exports: none.
`src/styles/_tokens.scss` — layer order, `@property` factors, `:root` `--vn-*` values, static `--bs-*` aliases. Exports: none (`$roles`, `$aliased`, `$light`, `$dark`, `$assets`).
`src/styles/_theme.scss` — `[data-bs-theme]` light and dark closures. Exports: none.
`src/styles/_reset.scss` — border-box, `[hidden]`, reduced-motion scroll. Exports: none.
`src/styles/_mixins.scss` — shared mixins and breakpoint functions. Exports: none.
`src/styles/elements/_html.scss` — `html` (`interpolate-size`, `text-size-adjust`). Exports: none.
`src/styles/elements/_body.scss` — `body` via `--bs-body-*`. Exports: none.
`src/styles/elements/_heading.scss` — `h1`–`h6`. Exports: none.
`src/styles/elements/_p.scss` — `p`. Exports: none.
`src/styles/elements/_a.scss` — `a`, including `a:not([href]):not([class])`. Exports: none.
`src/styles/elements/_hr.scss` — `hr`. Exports: none.
`src/styles/elements/_ul.scss` — `ul`. Exports: none.
`src/styles/elements/_ol.scss` — `ol`. Exports: none.
`src/styles/elements/_dl.scss` — `dl`, `dt`, `dd` as separate rules. Exports: none.
`src/styles/elements/_blockquote.scss` — `blockquote`. Exports: none.
`src/styles/elements/_address.scss` — `address`. Exports: none.
`src/styles/elements/_abbr.scss` — `abbr[title]`. Exports: none.
`src/styles/elements/_strong.scss` — `strong`. Exports: none.
`src/styles/elements/_b.scss` — `b`. Exports: none.
`src/styles/elements/_small.scss` — `small`. Exports: none.
`src/styles/elements/_mark.scss` — `mark`. Exports: none.
`src/styles/elements/_sub.scss` — `sub`. Exports: none.
`src/styles/elements/_sup.scss` — `sup`. Exports: none.
`src/styles/elements/_code.scss` — `code`. Exports: none.
`src/styles/elements/_kbd.scss` — `kbd`. Exports: none.
`src/styles/elements/_pre.scss` — `pre`. Exports: none.
`src/styles/elements/_samp.scss` — `samp`. Exports: none.
`src/styles/elements/_var.scss` — `var`. Exports: none.
`src/styles/elements/_figure.scss` — `figure`, `figcaption` as separate rules. Exports: none.
`src/styles/elements/_img.scss` — `img`. Exports: none.
`src/styles/elements/_svg.scss` — `svg`. Exports: none.
`src/styles/elements/_table.scss` — `table`, `caption`, `thead`/`tbody`/`tfoot`/`colgroup`. Exports: none.
`src/styles/elements/_tr.scss` — `tr`, `td`, `th`. Exports: none.
`src/styles/elements/_label.scss` — `label`. Exports: none.
`src/styles/elements/_input.scss` — `input`. Exports: none.
`src/styles/elements/_select.scss` — `select`, `select:disabled`. Exports: none.
`src/styles/elements/_optgroup.scss` — `optgroup`. Exports: none.
`src/styles/elements/_textarea.scss` — `textarea`. Exports: none.
`src/styles/elements/_fieldset.scss` — `fieldset`, `legend` as separate rules. Exports: none.
`src/styles/elements/_output.scss` — `output`. Exports: none.
`src/styles/elements/_iframe.scss` — `iframe`. Exports: none.
`src/styles/elements/_details.scss` — `summary`. Exports: none.
`src/styles/elements/_progress.scss` — `progress`. Exports: none.
`src/styles/elements/_button.scss` — bare `button`, `[role='button']`, `[type='button'|'reset'|'submit']`. Exports: none.
`src/styles/components/_button.scss` — `.btn` family and `--bs-btn-*`. Exports: none.
`src/styles/components/_type.scss` — `.h1`–`.h6`, `.display-*`, `.lead`, `.small`, `.mark`, `.initialism`. Exports: none.
`src/styles/components/_list.scss` — `.list-unstyled`, `.list-inline`, `.list-inline-item`. Exports: none.
`src/styles/components/_quote.scss` — `.blockquote`, `.blockquote-footer`. Exports: none.
`src/styles/components/_image.scss` — `.img-fluid`, `.img-thumbnail`, `.figure`, `.figure-img`, `.figure-caption`. Exports: none.
`src/styles/components/_link.scss` — link utility classes and `--bs-link-*`. Exports: none.
`src/styles/components/_container.scss` — `.container*` and `.navbar > .container*`. Exports: none.
`src/styles/components/_grid.scss` — `.row`, `.col*`, `.offset*`. Exports: none.
`src/styles/components/_table.scss` — `.table*` and `--bs-table-*`. Exports: none.
`src/styles/components/_icon-link.scss` — `.icon-link`, `.icon-link > .bi`. Exports: none.
`src/styles/components/_ratio.scss` — `.ratio`, `.ratio-*`. Exports: none.
`src/styles/components/_vr.scss` — `.vr` reading `--bs-border-width`. Exports: none.
`src/styles/utilities/_gap.scss` — `.g-*`, `.gx-*`, `.gy-*`, `.row-gap-*`. Exports: none.
`app/browser/index.html` — title `Veneer`, module script `/main.ts`. Exports: none.
`app/browser/main.ts` — loads both style entries, `void new Showcase(document.body)`, `void new Delegate()`. Exports: none.
`app/browser/index.ts` — re-exports types, constants, `Showcase`, and the section classes. Exports: those re-exports.
`app/browser/types.ts` — showcase and specimen contracts. Exports: `ShowcaseInterface`, `SectionInterface`, `SectionCopy`, `MarkupSpecimen`, `ButtonSpecimen`.
`app/browser/constants.ts` — showcase copy and specimen tables. Exports: `SHOWCASE_COPY`, `BUTTON_COPY`, `BUTTON_GRID`, `BUTTON_SPECIMENS`, `CONTENT_COPY`, `CONTENT_SPECIMENS`, `TYPE_COPY`, `TYPE_SPECIMENS`, `MEDIA_COPY`, `MEDIA_SPECIMENS`, `LINK_COPY`, `LINK_SPECIMENS`, `LAYOUT_COPY`, `LAYOUT_SPECIMENS`, `TABLE_COPY`, `TABLE_SPECIMENS`.
`app/browser/Showcase.ts` — header, Dark mode `ColorMode`, and sections. Exports: `Showcase`.
`app/browser/sections/SpecimenSection.ts` — shared specimen region. Exports: `SpecimenSection`.
`app/browser/sections/ButtonSection.ts` — button specimens; owns a `Button` when the host misses `BUTTON_SELECTOR`. Exports: `ButtonSection`.
`app/browser/sections/ContentSection.ts` — extends `SpecimenSection`. Exports: `ContentSection`.
`app/browser/sections/TypeSection.ts` — extends `SpecimenSection`. Exports: `TypeSection`.
`app/browser/sections/MediaSection.ts` — extends `SpecimenSection`. Exports: `MediaSection`.
`app/browser/sections/LinkSection.ts` — extends `SpecimenSection`. Exports: `LinkSection`.
`app/browser/sections/LayoutSection.ts` — extends `SpecimenSection`. Exports: `LayoutSection`.
`app/browser/sections/TableSection.ts` — extends `SpecimenSection`. Exports: `TableSection`.
`app/browser/styles/index.scss` — `@use 'shell'`. Exports: none.
`app/browser/styles/_shell.scss` — `@layer shell`, `:root` `color-scheme`, `header button` border. Exports: none.
`tests/setup.ts` — shared constants including `TOKEN_PREFIX`, `BUTTON_STATES`, `CASCADE_KEYS`. Exports include those plus the rest declared in that file.
`tests/setup.test.ts` — `describe('shared setup')`. Exports: none.
`tests/setupBrowser.ts` — viewport, showcase mount, oracle drive, CSSOM readers (`readCascadeSheet`, `collectLayer`). Exports include `mountShowcase`, `driveOracle`, `readCascadeSheet`, `SpecimenManager`, `specimens`.
`tests/setupBrowser.test.ts` — `describe('breakpoint viewport restoration')`, `describe('browser setup')`. Exports: none.
`tests/setupStyles.ts` — style case tables, selector scanners (`matchesLooseTagPair`), Bootstrap variable lists. Exports include those functions and the `TEXT_*` / `BUTTON_*` / `TABLE_*` tables.
`tests/setupStyles.test.ts` — `describe('styles setup')`. Exports: none.
`tests/setupListeners.ts` — `ENTRY_LISTENER_CONTROL`. Exports: `ENTRY_LISTENER_CONTROL`.
`tests/setupConformance.ts` — Bootstrap pin, oracle recorder, ledger readers. Exports include `BOOTSTRAP_VERSION`, `readBootstrapCascade`, `recordButtonOracle`, `readCompatibility`, `readDeferrals`, `FORBIDDEN_RUNTIME`.
`tests/setupConformance.test.ts` — `describe('scanStyleBlocks')`, `describe('setupConformance')`. Exports: none.
`tests/setupPolicy.ts` — vendored policy register. Exports: the `POLICY_*` constants and policy helpers in that file.
`tests/policy.test.ts` — policy describes from `surface policy controls` through `policy configuration wiring`. Exports: none.
`tests/config.test.ts` — `describe('root configuration')`, `describe('policy plugin')`, `describe('configuration helpers')`. Exports: none.
`tests/conformance.test.ts` — Bootstrap identity, component oracle, runtime boundaries. Exports: none.
`tests/distribution.test.ts` — `describe('distribution classifiers')`, `describe('installed package consumer')`. Exports: none.
`tests/guides.test.ts` — runs `GuideCommand` from `@orkestrel/guide/server`. Module-scope `FENCE_LANGUAGES` is not exported.
`tests/fixtures/oracle/inventory.json` — `"version": "5.3.8"` and a `components` selector inventory; head read only.
`tests/fixtures/oracle/button.json` — `"component": "btn"` steps such as `button.initial`.
`tests/src/styles/fixtures/mixins.scss` — fixture that includes `role-each` (`src/styles/_mixins.scss:193`). Exports: none.
`tests/src/core/index.test.ts` — `describe('src core entry')`: import with no `document`, registry freeze. Exports: none.
`tests/src/core/errors.test.ts` — `describe('application errors')`. Exports: none.
`tests/src/browser/index.test.ts` — barrel export names and no document/window listeners. Exports: none.
`tests/src/browser/Button.test.ts` — `describe('Button')`. Exports: none.
`tests/src/browser/ColorMode.test.ts` — `describe('ColorMode')`. Exports: none.
`tests/src/browser/Delegate.test.ts` — `describe('Delegate')`. Exports: none.
`tests/src/browser/helpers.test.ts` — `describe('emitEvent')`, `describe('bindEventMap')`. Exports: none.
`tests/src/browser/validators.test.ts` — `describe('isColorModeState')`, `describe('isButtonHost')`, `describe('isButtonEvent')`. Exports: none.
`tests/src/styles/` root proofs: `index.test.ts` (`shipped cascade` via CSSOM), `tokens.test.ts` (`token cascade`, calibration), `theme.test.ts` (`theme scopes`), `mixins.test.ts` (`declaration mixins`, `breakpoint mixins`), `reset.test.ts` (`document reset`), `integration.test.ts` (`token customization`). Exports: none.
`tests/src/styles/elements/`: one file per tag partial. Each `describe` names that tag’s treatment (`bare button`, `heading scale`, `anchor treatment`, `* text treatment`, `* Reboot treatment`, or `* calibrated/retained treatment`). Exports: none.
`tests/src/styles/components/`: `button.test.ts` (`button classes`), `type.test.ts`, `list.test.ts`, `quote.test.ts`, `image.test.ts`, `link.test.ts`, `container.test.ts`, `grid.test.ts`, `table.test.ts` (`table geometry`, `contextual table colors`, `responsive table wrappers`), `icon-link.test.ts`, `ratio.test.ts`, `vr.test.ts`. Exports: none.
`tests/src/styles/utilities/gap.test.ts` — `describe('gap utilities')`. Exports: none.
`tests/app/browser/index.test.ts` — `describe('app browser entry')`. Exports: none.
`tests/app/browser/Showcase.test.ts` — `describe('Showcase')`. Exports: none.
`tests/app/browser/integration.test.ts` — `describe('journey')`, `describe('refusal')`, `describe('matrix')`, `describe('portfolio')`. Exports: none.
`tests/app/browser/sections/*.test.ts` — one `describe` per section class (`ButtonSection` through `TableSection`, plus `SpecimenSection`). Exports: none.

### B. Engine

`Button` (`src/browser/Button.ts:35-81`) takes an `HTMLElement`. `isButtonHost` rejects anything else with `AppError` code `BUTTON_HOST_INVALID` (`src/browser/Button.ts:36-44`). A second live owner throws `BUTTON_HOST_OWNED` (`src/browser/Button.ts:46-49`). Construction stores whether `active` is present and the current `aria-pressed` (`src/browser/Button.ts:52-53`), binds `options.on` through `bindEventMap` on an `AbortController` signal (`src/browser/Button.ts:54`), and records the host in a `WeakSet`. There is no `start` or `stop`. `pressed` reads `classList.contains('active')` (`src/browser/Button.ts:62-63`). `toggle` returns that state after `destroy`; otherwise it toggles `active`, sets `aria-pressed` to `"true"` or `"false"`, and emits `toggle.vn.button` (`src/browser/Button.ts:66-71`). `destroy` aborts the signal, restores the original class membership and `aria-pressed` (removing the attribute when it was absent), and drops the host (`src/browser/Button.ts:74-81`). Programmatic `toggle` is not gated on `disabled` (`src/browser/Button.ts:12`).

`emitEvent` dispatches a bubbling, non-cancelable `CustomEvent` (`src/browser/helpers.ts:17-18`). `bindEventMap` listens for `toggle.vn.button` until the signal aborts and forwards only events `isButtonEvent` accepts (`src/browser/helpers.ts:38-46`). No `keydown`, `keyup`, or `focus()` call exists under `src/**/*.ts` (pattern `keydown|keyup|keyboard|focus\(|tabIndex|aria-`).

`ColorMode` (`src/browser/ColorMode.ts:20-52`) defaults `root` to `document.documentElement`. If `storage` holds `light` or `dark`, construction calls `apply`. `mode` is `dark` only when `data-bs-theme` is exactly `dark`; every other value reads `light` (`src/browser/ColorMode.ts:31-32`). `apply('dark')` sets `data-bs-theme="dark"`; `apply('light')` removes the attribute; both write `color-mode` into storage (`src/browser/ColorMode.ts:35-39`). `destroy` removes the attribute only when this instance wrote `dark` (`src/browser/ColorMode.ts:48-51`). The class comment says it registers no listeners (`src/browser/ColorMode.ts:6`). It does not read `prefers-color-scheme` or set `color-scheme`.

`Delegate` (`src/browser/Delegate.ts:32-81`) defaults `root` to `document` and adds a `click` listener with the abort signal. `destroy` aborts that listener and calls `destroy` on every owned `Button`. `#activate` drops buttons whose hosts left the root, then `closest('[data-bs-toggle="button"]')` (`src/browser/constants.ts:11`). It returns unless the host is an `HTMLElement` inside the root. It calls `preventDefault`. It returns without toggling when `disabled === true`, class `disabled` is present, or `aria-disabled="true"` (`src/browser/Delegate.ts:62-67`). It constructs a `Button` or, on `BUTTON_HOST_OWNED`, leaves the existing owner (`src/browser/Delegate.ts:70-78`), then `toggle()`. Importing the barrel installs nothing (`src/browser/Delegate.ts:11`).

Bootstrap 5.3 markup the engine reads: `data-bs-theme` (`src/browser/constants.ts:2`), `data-bs-toggle="button"`, class `active`, `aria-pressed`, plus the disabled checks above. It does not set `role`, `tabindex`, or `aria-disabled`. Focus and keyboard treatment for a bare `button` is CSS: `button:focus-visible` includes `focus-ring`, and `button:focus:not(:focus-visible)` sets `outline: 0` (`src/styles/elements/_button.scss:50-62`). `.btn` repeats that with `.btn-check + .btn` siblings (`src/styles/components/_button.scss:93-113`).

Pattern `bootstrap|popper|vue|reactivity` (case-insensitive) under `src/` and `app/`: no import specifiers. Comment hits: `src/browser/types.ts:1`, `src/browser/constants.ts:1`, `src/styles/_tokens.scss:6`, `src/styles/_tokens.scss:9`, `src/styles/_theme.scss:18`, `src/styles/_mixins.scss:226`, `src/styles/components/_vr.scss:2`, `src/styles/components/_icon-link.scss:13`, `app/browser/constants.ts:26`. No `@popperjs`, `vue`, or `@vue/reactivity` string in those trees.

### C. Styles

Partials: `src/styles/` holds `_tokens.scss`, `_theme.scss`, `_reset.scss`, `_mixins.scss`, `index.scss`, `index.ts`. `elements/` holds one partial per tag from `_a.scss` through `_var.scss` as listed in A. `components/` holds `_button`, `_type`, `_list`, `_quote`, `_image`, `_link`, `_container`, `_grid`, `_table`, `_icon-link`, `_ratio`, `_vr`. `utilities/` holds `_gap.scss`. `app/browser/styles/` holds `index.scss` and `_shell.scss`.

Layer order is declared once: `src/styles/_tokens.scss:4` `@layer theme, reset, base, elements, components, utilities;`. Element partials open `@layer elements`, components `@layer components`, `_gap.scss:3` `@layer utilities`, `_reset.scss:1` `@layer reset`, `_theme.scss:5` and `_tokens.scss:155` `@layer theme`. No partial opens `@layer base`. The shell declares `@layer shell` (`app/browser/styles/_shell.scss:1`) and states that name sits outside the published order (`app/browser/styles/_shell.scss:8`).

`--vn-*` is declared in `_tokens.scss` (`@property` at `131-152`, `:root` from `156`) and by mixins `role-each` and `theme-tokens` (`src/styles/_mixins.scss:199-269`). `--bs-*` aliases are declared in `_tokens.scss` from `335`, in `theme-tokens` from `_mixins.scss:271`, in `alias-gutters` (`_mixins.scss:4-5`), and as component properties in `_button.scss`, `_table.scss`, `_link.scss`, `_ratio.scss`, and `_gap.scss`. Grep of `--` declarations in `*.scss` showed only those two prefixes.

Theme mechanism: `[data-bs-theme='light']` sets `color-scheme: light` and includes `theme-tokens` with `$light`; `[data-bs-theme='dark']` sets `color-scheme: dark`, includes `$dark`, and writes `$assets` image variables (`src/styles/_theme.scss:10-26`). Pattern `prefers-color-scheme` in `src/styles/**/*.scss` and `app/**/*.scss`: no matches. `data-theme` (without `bs`): no matches. The shell sets `color-scheme: light` on `:root` and `dark` on `:root[data-bs-theme='dark']` (`app/browser/styles/_shell.scss:11-16`).

Reset (`src/styles/_reset.scss:1-14`): `*, *::before, *::after { box-sizing: border-box }`; `[hidden] { display: none !important }`; inside `@media (prefers-reduced-motion: no-preference)`, `:root { scroll-behavior: smooth }`.

Selectors that style a bare tag by position (descendant, child, sibling, or `:has`). Pattern `:has(` in `*.scss`: no matches. Element partials style each tag as its own rule; `fieldset`/`legend`, `dl`/`dt`/`dd`, `figure`/`figcaption`, and `table`/`caption` are not nested combinators (`src/styles/elements/_fieldset.scss:4-16`, `_dl.scss:2-13`, `_figure.scss:4-14`, `_table.scss:4-18`). Combinator hits whose subject is a tag:

```25:26:app/browser/styles/_shell.scss
	header button {
		border: var(--vn-border-width) var(--vn-border-style) var(--vn-border-color);
```

```38:43:src/styles/components/_table.scss
	.table > tbody {
		vertical-align: inherit;
	}
	.table > thead {
		vertical-align: bottom;
	}
```

```77:77:src/styles/components/_table.scss
	.table-striped > tbody > tr:nth-of-type(odd) > * {
```

```82:82:src/styles/components/_table.scss
	.table-striped-columns > :not(caption) > tr > :nth-child(even) {
```

```92:92:src/styles/components/_table.scss
	.table-hover > tbody > tr:hover > * {
```

Also tag-negation compounds whose subject is `*`: `.table > :not(caption) > * > *` (`_table.scss:26`), `.table-sm > :not(caption) > * > *` (`:54`), `.table-bordered > :not(caption) > *` (`:59`) and `> * > *` (`:64`), `.table-borderless > :not(caption) > * > *` (`:69`). Class-to-class siblings such as `.btn-check + .btn` (`src/styles/components/_button.scss:76`) and `.icon-link > .bi` (`_icon-link.scss:17`) are not bare tags. The guide lists `ol ol`, `ul ul`, `ol ul`, `ul ol`, `pre code`, `a > code`, `kbd kbd`, and `legend + *` as excluded (`guides/veneer.md:314-321`). `index.test.ts` expects `matchesLooseTagPair` to be empty for elements-layer rules (`tests/src/styles/index.test.ts:23-26`).

Literal colour outside `_tokens.scss`. Pattern `rgba?\(|oklch\(|oklab\(|#[0-9a-fA-F]{3,8}`: `src/styles/elements/_a.scss:3` and `:6` `rgb(from …)`; `src/styles/components/_link.scss` `rgba(` at `8`, `9`, `17`, `18`, `24`, `25`, `49`, `58`; `src/styles/components/_icon-link.scss:8` `rgba(`; `src/styles/components/_table.scss:15`, `:17`, `:19` `rgba(`. Keyword `transparent` as a colour: `_body.scss` tap highlight, `_kbd.scss:7` `color-mix(… transparent)`, `_table.scss:13` `--bs-table-accent-bg: transparent`, `_mixins.scss:245-246` and `:267`. Hex and `oklch(` literals in the cascade sit in `_tokens.scss` (`162-197` and the `$light`/`$dark` maps).

Mixins in `src/styles/_mixins.scss`: `alias-gutters`, `pad-gutters`, `heading-text`, `image-size`, `mark-text`, `control-text`, `border-reset`, `box-reset`, `caption-text`, `cell-space`, `code-text`, `script-text`, `code-surface`, `list-space`, `breakpoint-up`, `breakpoint-each`, `breakpoint-down`, `reduced-motion`, `transition`, `forced-colors`, `focus-ring`, `role-each`, `theme-tokens`. Functions, not mixins: `breakpoints` (`:93`), `breakpoint` (`:99`).

`transition` is emitted only by the mixin, which also sets `transition: none` under `prefers-reduced-motion: reduce` (`src/styles/_mixins.scss:155-159`). Call sites: `src/styles/elements/_button.scss:23`, `src/styles/components/_button.scss:59`, `src/styles/components/_icon-link.scss:22`. Pattern `animation:` in `src/styles/**/*.scss`: no matches. The reset’s `scroll-behavior` is gated by `prefers-reduced-motion: no-preference` (`_reset.scss:10-13`), not by the `transition` mixin.

### D. Tests and proofs

Root `vite.config.ts:401-414` registers these factories. `src:core` (`104-122`): `tests/src/core/**/*.test.ts`, environment `node`, setup `./tests/setup.ts`, browser disabled. `src:browser` (`125-163`): `tests/src/browser/**/*.test.ts`, Playwright Chromium headless, setup `./tests/setup.ts` and `./tests/setupBrowser.ts`. `app:browser` (`166-197`): `tests/app/browser/**/*.test.ts` excluding `integration.test.ts`, same browser setup, Vue plugin. `policy` (`265-276`): `tests/policy.test.ts`, `node`, `./tests/setup.ts`. `config` (`279-294`): `tests/config.test.ts`, `node`, `./tests/setup.ts`, `testTimeout: 60_000`. `setup` (`297-308`): `tests/setup*.test.ts` excluding `setupBrowser.test.ts`, `node`, `./tests/setup.ts`. `setup:browser` (`312-327`): `tests/setupBrowser.test.ts`, Chromium, setup `./tests/setup.ts` and `./tests/setupBrowser.ts`, Vue plugin. `guides` (`330-342`): `tests/guides.test.ts`, `node`, `./tests/setup.ts`. `conformance` (`347-358`): `tests/conformance.test.ts`, `node`, `./tests/setup.ts`. `distribution` (`361-374`): `tests/distribution.test.ts`, `node`, `./tests/setup.ts`, timeouts `120_000`. `probe` (`382-396`): `tmp/probe/**/*.test.ts`, `node`, `./tests/setup.ts`; the comment says no gate selects it (`vite.config.ts:377-378`).

`src:styles` is not in that array. `configs/src/vite.styles.config.ts:44-53` sets include `tests/src/styles/**/*.test.ts`, copies the browser project’s Playwright settings, and uses setup `./tests/setup.ts`, `./tests/setupBrowser.ts`, `./tests/setupStyles.ts`, and `./dist/src/styles/index.css`. Journey is `configs/app/vite.journey.config.ts:14-16`, one project per variant from `appJourney` (`vite.config.ts:243-262`): include only `tests/app/browser/integration.test.ts`, viewport from the variant, `provide` of `variant`, `variants`, and `capture`.

Resolved style or pixels use `@orkestrel/test/browser`. `readPixels` is imported by `utilities/gap.test.ts`, `integration.test.ts`, `tokens.test.ts`, `mixins.test.ts`, `elements/button.test.ts`, `pre.test.ts`, `code.test.ts`, `kbd.test.ts`, `fieldset.test.ts`, `body.test.ts`, `img.test.ts`, `components/icon-link.test.ts`, `vr.test.ts`, `container.test.ts`, `table.test.ts`, `grid.test.ts`, `ratio.test.ts`, `image.test.ts`, `button.test.ts`. The other `tests/src/styles/**/*.test.ts` files import `readStyle` (and often `matchesColor` or `readToken`) except `index.test.ts`. `index.test.ts` reads the loaded sheet through `readCascadeSheet`, `collectNestedRules`, and `collectLayer` (`tests/src/styles/index.test.ts:3-8`) and does not call `readStyle` or `readPixels`. `tokens.test.ts:12` also imports `../../../dist/src/styles/index.rtl.css?raw`.

Conformance: `tests/setupConformance.ts:190` pins `BOOTSTRAP_VERSION = '5.3.8'`. Digests for `bootstrap.css`, `bootstrap.rtl.css`, and `bootstrap.bundle.js` are `203-212`. `BOOTSTRAP_MANIFEST_PATH` resolves `bootstrap/package.json` (`228-230`). `readBootstrapCascade` reads `dist/css/bootstrap.css` beside that manifest (`532-533`). `recordButtonOracle` (`1017-1037`) launches Chromium, writes that CSS and `bootstrap.bundle.js` into a scratch page with official button markup, and returns a recording. `tests/fixtures/oracle/button.json:1-6` is the stored `btn` recording. `tests/fixtures/oracle/inventory.json:1-8` stores version `5.3.8`, the CSS digests, and a `components` selector inventory. `tests/conformance.test.ts:32-48` compares the installed version and the three digests. `51-120` runs `scanCompatibilityPresence` over `readCompatibility()`, `readOracleInventory()`, `readDeferrals()`, and `readBuiltCascade()`. `122-141` re-records the button oracle and compares it to `button.json` via `scanOracleFixture`, then checks each compatibility row with `scanOracleObligation`. `145-164` rejects runtime dependencies and source imports named in `FORBIDDEN_RUNTIME` (`tests/setupConformance.ts:215-221`): `vue`, `@vue/`, `bootstrap`, `@popperjs/`, `tailwindcss`, `@tailwindcss/`.

Journey: `tests/app/browser/integration.test.ts:147` `describe('journey')` mounts the showcase (`mountShowcase` from `tests/setupBrowser.ts`), applies the injected variant, and drives it with `@orkestrel/test/browser` exports imported at `2-37`: `build`, `buildCensus`, `buildContrast`, `buildEscapes`, `clickAccessible`, `createJournal`, `createPortfolio`, `describeFocus`, `describeTree`, `expandCaptures`, `extractStyles`, `holdAccessible`, `hoverAccessible`, `mount`, `pressKeys`, `readCensus`, `readContrast`, `readHit`, `readName`, `readPage`, `readPerception`, `readRefusal`, `readRing`, `readStates`, `readStyle`, `releaseMedia`, `releasePane`, `releasePointer`, `resolveAccessible`, `stageMedia`, `stagePane`, `traverseAccessible`, `waitForAnimations`, `waitForState`. `requireValue` comes from `@orkestrel/test` (`integration.test.ts:1`). The first case reads the Showcase and Buttons regions (`148-160`). Later describes are `refusal` (`659`), `matrix` (`686`), and `portfolio` (`739`).

`vi.mock`, `vi.fn`, `vi.spyOn`, `vi.useFakeTimers`: the only matches are string fixtures inside `tests/config.test.ts`, including `code: "vi.mock('./x')"` at `908` and `code: 'vi.useFakeTimers()'` at `928`, and a scratch file string at `1884`. No call sites. `.skip` / conditional skip: `tests/policy.test.ts:716` `it.skipIf(!isPolicyFile(...))`; `tests/config.test.ts:2284` `it.skipIf(!publishes)`, `:2426` and `:2439` `it.skipIf(extractorPath === undefined)`, `:2431` `it.skipIf(extractorPath !== undefined)`; `tests/distribution.test.ts:1011` `context.skip` when `npm ping` fails, and `:1025`, `:1057`, `:1261`, `:1291` `context.skip` when the browser launch fails and `RELEASE` is unset. Pattern `.todo(` and `describe.skip` / `it.skip(` / `test.skip(`: no matches outside those `skipIf` and `context.skip` sites.

### E. Guide

Heading map of `guides/veneer.md`: `# Veneer` (`1`); `## Surface` (`5`); `## Methods` (`47`); `#### ColorModeInterface` (`51`); `#### ButtonInterface` (`59`); `#### DelegateInterface` (`66`); `## Examples` (`72`); `## Styles` (`104`); `### Files` (`122`); `### Scripts` (`207`); `### Table classes` (`225`); `### Helper classes` (`250`); `### Deferred selectors` (`303`); `### Departures from the workspace rows` (`389`); `## Tokens` (`439`); `### Reference map` (`467`); `#### Factors` (`469`); `#### Palette and gray ramp` (`489`); `#### Semantic roles` (`503`); `#### Text and surface` (`541`); `#### Links` (`580`); `#### Type` (`591`); `#### Space, border, radius, and elevation` (`606`); `#### Motion, focus, validation, breakpoints, and stacking` (`659`); `### Button states and bindings` (`692`); `### Bootstrap variables Veneer retains` (`766`); `### Customization` (`780`); `### Departures from Bootstrap` (`816`); `### Deferred names` (`881`); `## Compatibility` (`894`); `## Showcase` (`1043`); `## Tests` (`1074`).

`guides/README.md` headings: `# Guides` (`1`), `## By concept` (`6`), `## By directory` (`26`). `guides/scaffold.md` and `guides/guide.md` were read by headings only; their heading lists are the `#` / `##` / `###` / `####` lines from the heading grep (Scaffold from `# Scaffold` through `## See also`; Guide from `# Guide` through `## See also`).

`## Surface` table names (`guides/veneer.md:12-40`): `TOKEN_NAMES`, `TokenLeaf`, `TokenMap`, `TokenName`, `ColorModeState`, `ColorModeOptions`, `ColorModeInterface`, `ColorMode`, `isColorModeState`, `COLOR_MODE_ATTRIBUTE`, `COLOR_MODE_KEY`, `AppError`, `isAppError`, `BUTTON_ACTIVE`, `BUTTON_SELECTOR`, `BUTTON_TOGGLE`, `Button`, `ButtonDetail`, `ButtonEventMap`, `ButtonHooks`, `ButtonInterface`, `ButtonOptions`, `Delegate`, `DelegateInterface`, `DelegateOptions`, `bindEventMap`, `emitEvent`, `isButtonEvent`, `isButtonHost`.

Compatibility table (`907-1024`) Component keys: `g`, `gx`, `gy`, `row-gap`, `row`, `col`, `offset`, `container`, `link`, `reboot`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `small`, `mark`, `lead`, `display`, `list-unstyled`, `list-inline`, `initialism`, `blockquote`, `img`, `figure`, `btn`, `table`, `icon-link`, `ratio`, `vr`, `engine`. Status cells in that range are `shipped` or `accepted`.

Deferred selectors (`314-387`): tag compositions `ol ol`, `ul ul`, `ol ul`, `ul ol`, `pre code`, `a > code`, `kbd kbd`, `legend + *` with owner `Excluded`; `::-moz-focus-inner` and `::-webkit-file-upload-button` owner `Excluded`; `.input-group…` and `.col-form-label*` owner `Forms`; `.btn-group*`, `.btn-toolbar`, `.btn-close*`, `.placeholder.btn::before`, and `--bs-btn-close-*` owner `Passive` except the dropdown-split and `.btn.dropdown-toggle-split` rows owner `Disclosure` and the close-button rows inside alert, toast, modal, and offcanvas owner `Overlays`. Deferred names (`889-892`): `scroll-padding` on the document; the hint surface and the component-scoped tokens.

Sentences on Bootstrap compatibility, Tailwind, framework independence, or native platform use:

`guides/veneer.md:3` “Elements' look and motion on Bootstrap 5.3 contracts, with an owned engine and standalone CSS.”

`guides/veneer.md:428` “Veneer declares no Tailwind dependency and carries no such file, so it lands with”

`guides/veneer.md:446` “Veneer declares one canonical token per value and one `--bs-*` alias per Bootstrap root variable.”

`guides/veneer.md:698` “The hover and active percentages reproduce the run-6 filled-role readings in managed Chromium”

`guides/veneer.md:865` “The remaining bare form and interactive tag repairs retain Bootstrap 5.3.8's Reboot values: inherited control typography, native appearance corrections,”

`guides/veneer.md:896-897` “This section is the ledger of what Veneer accepts from Bootstrap 5.3.8. The tests/conformance.test.ts proof reads its rows”

`guides/veneer.md:1035-1038` “The compatibility claim excludes contextual Reboot selectors that combine bare tags” through “window.bootstrap global and UMD namespace, and Bootstrap's Sass variables, maps, and mixins as a source API.”

`guides/veneer.md:1060-1061` “component in it: the shell is framework-free by design, so the showcase drives the published cascade and the published engine with no framework between them and what renders.”

`app/browser/styles/_shell.scss:3` “The showcase is framework-free, so this file is the whole document shell”

### F. Dependencies

`package.json` has no `dependencies` key and no `peerDependencies` key (the file ends its dependency block at `devDependencies`, `91-115`). `devDependencies`: `@microsoft/api-extractor` `^7.59.1`, `@orkestrel/contract` `^0.0.17`, `@orkestrel/guide` `^0.0.20`, `@orkestrel/html` `^0.0.10`, `@orkestrel/markdown` `^0.0.15`, `@orkestrel/probe` `^0.0.16`, `@orkestrel/scaffold` `^0.0.76`, `@orkestrel/test` `^0.0.18`, `@types/node` `^26.6.2`, `@vitejs/plugin-vue` `^6.0.9`, `@vitest/browser-playwright` `^4.1.11`, `bootstrap` `5.3.8`, `oxfmt` `^0.68.0`, `oxlint` `^1.83.0`, `playwright` `^1.63.0`, `postcss` `^8.5.15`, `sass` `^1.104.1`, `typescript` `^6.0.3`, `vite` `^8.3.0`, `vite-plugin-singlefile` `^2.3.3`, `vitest` `^4.1.11`, `vue` `^3.5.43`, `vue-tsc` `^3.3.11`.

`exports` (`23-42`): `"."` import and require to `dist/src/core`; `"./browser"` import only to `dist/src/browser`; `"./styles"` to `dist/src/styles/index.css`; `"./package.json"` to `./package.json`. `files` (`13-16`): `dist/src`, `README.md`.

Pattern `from '@orkestrel/` under `src/**/*.ts`: no matches. Under `tests/**/*.ts` the imported specifiers are `@orkestrel/contract`, `@orkestrel/test`, `@orkestrel/test/browser`, `@orkestrel/test/server`, `@orkestrel/guide`, `@orkestrel/guide/server`, `@orkestrel/markdown`, `@orkestrel/scaffold`.

### G. Rule-conformance evidence

Patterns were run on `*.ts` under `src/`, `app/`, `tests/`, and `configs/`, plus `vite.config.ts`, excluding nothing else those globs miss. `node_modules` and `dist` were not searched.

`: any` and `<any>`: pattern `: any[^a-zA-Z]|<any>| as any` matched nothing. A looser `: any` matched CSS `anywhere` inside HTML strings in element tests (for example `tests/src/styles/elements/iframe.test.ts:15`), not a type.

` as ` excluding `as const`: `src/**/*.ts` hits are only `as const` in `src/core/constants.ts` (from `:22` through `:308`). `app/**/*.ts` hits are the word “as” inside comments in `app/browser/types.ts:39` and `:46`. `tests/**/*.ts` uses `as const` (example `tests/src/styles/index.test.ts:34`, `tests/setupStyles.ts:12`).

Non-null `!.` or `!)`: no matches in `src/`, `app/`, or `tests/` `*.ts`.

`@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, `eslint-disable`, `oxlint-disable`: no matches in `*.{ts,tsx,js,mjs,scss,json}` at the repo root of the search.

`export default`: `vite.config.ts:399`; `configs/src/vite.styles.config.ts:17`; `configs/src/vite.browser.config.ts:7`; `configs/src/vite.core.config.ts:5`; `configs/app/vite.journey.config.ts:14`; `configs/app/vite.showcase.config.ts:4`; `configs/app/vite.browser.config.ts:4`; `configs/policy.ts:1378`. No matches in `src/` or `app/` `*.ts`.

`public `, `protected `, `private ` on class members: no matches in `src/` or `app/` `*.ts`. `tests/config.test.ts` contains those keywords only inside fixture strings (`949-965`, `1885-1887`). `tests/setupPolicy.ts:1012` uses “public” in a comment.

Nested `function` or `const name = (` inside function bodies: pattern `const \w+ = \(` and indented `function ` in `src/**/*.ts` and `app/**/*.ts` matched nothing. Arrow callbacks passed as arguments, which that pattern does not name: `Delegate` constructor (`src/browser/Delegate.ts:34`) and `bindEventMap` (`src/browser/helpers.ts:42`).

Module-scope declarations in `*.ts` implementation files that are not the one class: `Button.ts`, `ColorMode.ts`, `Delegate.ts`, `Showcase.ts`, and each section file contain one `export class` plus imports. `src/styles/index.ts` contains one side-effect import. `src/core/errors.ts` is the errors file and exports both `AppError` and `isAppError`.

Non-exported module-scope declarations in `types.ts`, `constants.ts`, `helpers.ts`, `validators.ts`, `errors.ts`: every `const`, `function`, `class`, `type`, and `interface` in `src/core`, `src/browser`, and `app/browser` copies of those names is exported (grep of `^(export )?(const|let|function|class|type|interface)` on those files). `app/browser` has `types.ts` and `constants.ts` only.

### H. Unknowns

`tests/fixtures/oracle/inventory.json` was read only through the start of `components.progress`; the rest of that file was not read.
Installed Bootstrap bytes under `node_modules` were not opened; the path and digests are those `tests/setupConformance.ts` declares.
Element partials other than the ones quoted were surveyed by selector and combinator grep, not by reading every declaration line.
No test command was run, so pass or fail of the proofs is not established here.
`prefers-color-scheme` absence is the grep of `src/styles` and `app` stylesheets, not a runtime media query.

### Journal

Before reading, the first completed `git -C /home/user/veneer status --porcelain` printed no lines:

```
```

Before answering, `git status --porcelain` in `/home/user/veneer` printed no lines:

```
```