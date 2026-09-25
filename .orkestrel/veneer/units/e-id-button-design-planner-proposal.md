LANE: e-id-button-design-planner

Perspective held: the subjective lane (shape, naming, how the default and the classes read to a consumer, and the guide's voice). Every CSS claim here comes from reading the code. None is a browser reading, so the proofs in § 4 are what settle them.

## 1. The mechanism

**Recommendation.** Put the calibrated surface on the tag alone. Each class the release builds on `<button>` writes the release's reboot back, at zero specificity, in the `components` layer.

- **Elements layer (`src/styles/elements/_button.scss`).** One `button` rule carries the release's structural reboot (`margin: 0`, `text-transform: none`, `-webkit-appearance: button`) and the calibrated surface. The states are `button:hover`, `button:active`, `button:focus-visible`, and `button:disabled`. The selector reads only the tag name. Changes from today:
  - Delete the `:not([class], [data-bs-target])` scope.
  - Delete the surface's `cursor: pointer`. The reboot rule `button:not(:disabled) { cursor: pointer }` already gives an enabled button the pointer. A disabled button carries `pointer-events: none`, so its cursor never shows.
  - Drop the universal rule's `font-family`, `font-size`, `line-height`, and `border-radius` lines. The surface overrides them in the same layer, so they would be dead. Their release values move into the mixin.
  - Keep `button:focus:not(:focus-visible)`, `[role='button']`, the typed-input rules, and the enabled-cursor rule unchanged.
- **The `button-reboot` mixin (`src/styles/_mixins.scss`).** It is the single home of the undo. For every property the surface writes, in any state, it writes the release's value:
  - Where the release's reboot writes a value: `font-family: inherit`, `font-size: inherit`, `line-height: inherit`, `border-radius: 0`.
  - Where the release leaves the property to the browser, it writes `revert`: `padding`, `font-weight`, `color`, `background-color`, `border`, `box-shadow`, `outline`, `opacity`, `pointer-events`, `transition`.
  - It is named like its siblings `nav-list` and `focus-ring`, for the block it emits: "the button reboot", in the guide's existing words for the release's reboot.
- **Components layer.** Each partial that styles a class the release builds on `<button>` opens that class's block with the reset on the class's own selector:

  ```scss
  :where(button.nav-link) {
  	@include button-reboot;
  }
  ```

  The selectors, one per partial:
  - `:where(button.btn)`
  - `:where(button.btn-close)`
  - `:where(button.navbar-toggler)`
  - `:where(button.accordion-button)`
  - `:where(button.dropdown-item)`
  - `:where(button.nav-link)`
  - `:where(button.list-group-item)`, which covers `.list-group-item-action`
  - `:where(button.page-link)`
  - `:where(button.carousel-control-prev, button.carousel-control-next, .carousel-indicators button[data-bs-target])`

  This follows Addendum 2's model: the class that composes a component writes the resets, the way `.blockquote` does.

**Why this holds together.**
- The cascade decides by layer before it looks at specificity. So a zero-specificity declaration in `components` beats every `elements` declaration, state rules included.
- The `:where()` wrapper gives the reset zero specificity. Every rule the class writes (specificity of at least one class) then beats it, in any order and any state. The reset never needs state rules, and a class that later drops a declaration falls back to the release's value, not to the surface.

**Why no selector reads a tag's context or the presence of a class.**
- The elements rule is `button` and its pseudo-classes, nothing else.
- Each reset names a specific release class on the same element, which the tenet reserves for "explicit classes". It never reads "has any class".
- `.carousel-indicators button[data-bs-target]` is the release's own component selector, composed from an explicit class, and it sits in `components`. This removes the attribute exception from the elements layer. A classless `button[data-bs-target]` used as a collapse trigger outside a carousel keeps the surface, as the tag-only rule requires.
- The resets name `button` so they undo exactly the tag default they answer, and never touch the `a` forms of the same classes.

**Consumer control.**
- A consumer class in unlayered CSS, or in any layer after `elements`, wins over the surface without a specificity contest.
- A utility in `utilities` overrides the property it names, and the rest of the surface stays.
- A consumer rule in any later layer also beats the zero-specificity reset on a component button.

## 2. The leak matrix

After the change, the surface writes these properties:
- at rest: `padding`, `font-family`, `font-size`, `font-weight`, `line-height`, `color`, `background-color`, `border`, `border-radius`, `box-shadow`, `transition`;
- in states: hover and active `background-color`; focus-visible `outline` and `box-shadow`, plus the forced-colors outline; disabled `color`, `background-color`, `opacity`, and `pointer-events`.

Several leaks match the release's value only at the shipped token values: `--vn-weight-body` 400, `--vn-button-shadow` none, and `--vn-line-body` 1.5. A consumer retune separates them, and the proofs must retune to see them (see § 4).

The following table lists, for each class, the surface properties the class does not set today and where each leak shows. Every class takes the same reset, the `button-reboot` include.

| Class | Surface properties the class leaves unset (the leak) | Where the leak shows |
| --- | --- | --- |
| `.btn` (all variants, `.btn-link`, sizes) | None. The class writes every surface property at rest and in every state. | Nowhere. The include is a no-op kept for a uniform rule (see Tensions). |
| `.btn-close` | `font-family`, `font-size`, `font-weight`, `line-height`, resting `box-shadow`, `transition` | `font-size` resizes the 1em box. The release has no transition. |
| `.navbar-toggler` | `font-family`, `font-weight`, resting `box-shadow`, disabled `opacity` and `pointer-events` | Type face; a disabled toggler dims. |
| `.accordion-button` | `font-family`, `font-weight`, `line-height`, `box-shadow` on a collapsed button, disabled `opacity` and `pointer-events` | Header type and height; the collapsed header's shadow. |
| `.dropdown-item` | `font-family`, `font-size`, `line-height`, `box-shadow`, `transition`, focus-visible `outline: none` and ring, disabled `opacity` | Item type differs from `a.dropdown-item`. The keyboard ring replaces the browser's ring, which is the release's focus indication. |
| `.nav-link` | `font-family`, `line-height`, `border-radius` under a plain `.nav` or `.navbar-nav` (tabs and pills write their own), resting `box-shadow`, disabled `opacity` | Rounded focus ring; a disabled link dims against `a.nav-link`. `font-size` and `font-weight` read undeclared variables, so they resolve `unset` and still win. |
| `.list-group-item` with `.list-group-item-action` | `font-family`, `font-size`, `font-weight`, `line-height`, `border-radius` on middle items and on the corners the end-item rules leave unset, `box-shadow`, `transition`, focus-visible `outline: none` and ring, disabled `opacity` | Rounded corners on bordered middle rows (visible); type; the ring. |
| `.page-link` | `font-family`, `font-weight`, `line-height`, `border-radius` on middle links and the inner corners of the end links, resting `box-shadow`, `:disabled` `opacity` and `pointer-events` | Rounded bordered middle links (visible). |
| `.carousel-control-prev`, `.carousel-control-next` | `font-family`, `font-size`, `font-weight`, `line-height`, `border-radius`, resting `box-shadow`, focus-visible ring `box-shadow`, disabled `pointer-events` | A ring the release never draws: its `:focus` sets `outline: 0` and no shadow. |
| `.carousel-indicators [data-bs-target]` (classless at rest) | `font-*`, `line-height`, `color`, `border-radius` (clipped by the 10px borders until a retune raises the radius past them), resting `box-shadow`, focus-visible `outline: none` and ring, disabled `pointer-events` | The pip's shadow and ring. Today the attribute exclusion hides this; the tag-only rule exposes it. |

The search behind the class list:
- Pattern `button` over `node_modules/bootstrap/scss/**/*.scss`. The release's comments name `<button>` forms for `.dropdown-item`, `.list-group-item-action`, `.navbar-toggler`, `.btn-close`, `.accordion-button`, and the carousel indicators.
- Pattern `<button[^>]*class="[a-z-]+` over `/home/user/veneer` excluding `node_modules`. It found `btn`, `btn-close`, `list-group-item`, `dropdown-item`, `nav-link`, `accordion-button`, `navbar-toggler`, `carousel-control-prev`, `carousel-control-next`, and classless `data-bs-target` indicators. No `button.page-link` form appears in Veneer's markup.
- The installed package ships no documentation examples: `node_modules/bootstrap/` holds `dist/`, `js/`, and `scss/`, and no `site/`. The documented-markup half of the search is therefore open (§ 5).

## 3. States

- **Hover and active.** Every listed class writes `background-color` (or the `background` shorthand) at rest in `components`. The layer beats `button:hover` and `button:active` in `elements` whatever their specificity. The reset writes `background-color: revert` too, for any class that later stops writing it.
- **Focus-visible.** The reset writes `outline: revert` and `box-shadow: revert` at rest.
  - A class that draws its own ring beats the reset through `:focus`, `:focus-visible`, or `:not(.collapsed)` (`.btn`, `.btn-close`, `.navbar-toggler`, `.accordion-button`, `.nav-link`, `.page-link`).
  - A class that draws none (`.dropdown-item`, `.list-group-item-action`, `.carousel-control-*`, the indicators) shows the browser's own `:focus-visible` outline, which is what the release shows. Under forced colors the browser's outline applies, as it does in the release.
- **Disabled.** The reset writes `opacity: revert`, `pointer-events: revert`, `color: revert`, and `background-color: revert` at rest. Each class's own disabled rule (`.btn:disabled`, `.btn-close:disabled`, `.nav-link:disabled`, `.dropdown-item:disabled`, `.list-group-item:disabled`) beats the reset on specificity. A class with no disabled rule reads the release's opacity of 1 and the release's pointer events.
- **No `!important`.** Nothing in the surface is `!important`. An important surface declaration would invert layer order and beat every reset, so the property-set proof also refuses one.

## 4. Units

The units run serially in the Veneer checkout after the E-ID landing. The routing ledger:
- E-ID-BUTTON-CORE: `sol` on GPT-6 Astra.
- E-ID-BUTTON-CHROME and E-ID-BUTTON-LISTS: `sol` on GPT-6 Astra, in parallel worktrees cut from the CORE commit. Each returns its `tests/setupStyles.ts` additions as a patch.
- E-ID-BUTTON-PROSE: `opus` on Opus 5.5.
- Gates: one `verifier` on Sonnet runs the gate chain after integration.
- Audits: Astra writes CORE, CHROME, and LISTS, so their audits swap lanes. The objective lane runs on Opus 5.5 and the subjective lane on GPT-6 Astra, with `checker` on Sonnet for the property-set and ledger rows. PROSE is audited with the default lanes.

Every proof mounts under a holder that retunes `--vn-weight-body` to 700 and `--vn-button-shadow` to a visible shadow, and sets `font: 600 19px/29px serif` (the existing button proof's precedent). A leaked declaration then reads a value the release never produces. Without the holder, the weight, shadow, and line-height mutations stay green and the proofs cannot fail.

**E-ID-BUTTON-CORE** (`sol` on GPT-6 Astra)
- Owns:
  - `src/styles/_mixins.scss` (the `button-reboot` mixin);
  - `src/styles/elements/_button.scss`;
  - the include line in each of `src/styles/components/_button.scss`, `_close.scss`, `_navbar.scss`, `_accordion.scss`, `_dropdown.scss`, `_nav.scss`, `_list-group.scss`, `_pagination.scss`, and `_carousel.scss`;
  - `tests/src/styles/elements/button.test.ts`;
  - the mirrored mixins proof;
  - `tests/conformance.test.ts` (the forced-colors selector literal follows the compiled `button:focus-visible`);
  - `tests/src/styles/components/close.test.ts`, whose bare-button wording and transition case change;
  - `tests/fixtures/tailwind/markup.html` and `tests/service/tailwind/consumer.test.ts`;
  - `tests/setupStyles.ts`, where the `BUTTON_BARE_*` cases are renamed for what they prove;
  - the reboot-family ledger rows and additions in `guides/veneer.md`, returned as a patch.
- Proofs:
  - **Tag keeps the surface.** `<button>`, `<button class="">`, `<button class="px-3">`, `<button class="order-action">`, and a classless `<button data-bs-target="#harbor">` outside a carousel read padding (the utility case reads the utility), font-family, font-size, font-weight, line-height, color, background-color, border-radius, box-shadow, and transition-duration equal to the classless button. They also read hover (`hoverAccessible`), press (`holdAccessible`), keyboard focus (`pressKeys`, `:focus-visible`), and disabled equal to the classless button in the same state. Mutations: restoring `:not([class])` reddens the classed cases; restoring `:not([data-bs-target])` reddens the attribute case; scoping any state rule back to `:not([class])` reddens that state.
  - **Consumer override.** A mounted unlayered `<style>` setting `.order-action { padding: 0; border-radius: 2px }` reads 0 and 2px, with every other surface value intact. A second copy inside `@layer components` reads the same. Mutation: marking the surface's padding `!important` reddens it.
  - **Property set.** The property names the elements-layer `button` rule and its state rules declare, read from the loaded sheet's CSSOM, equal the property names a `:where(button.…)` components rule declares, and no surface declaration is important. Mutation: adding `letter-spacing` to the surface without adding it to the mixin reddens it.
  - **Tailwind utility button.** The consumer pairing reads a utility-classed `button` in the markup fixture with the utility's padding and the surface's background. Mutation: restoring `:not([class])` reddens it.

**E-ID-BUTTON-CHROME** (`sol` on GPT-6 Astra)
- Owns the mirrored proofs for `.btn`, `.btn-close`, `.navbar-toggler`, `.accordion-button`, `.page-link`, and the carousel controls and indicators under `tests/src/styles/components/`.
- Proof per class: under the holder, the button form reads every row of § 2 at rest, hover, press, keyboard focus, and disabled. The expectation is the release's value: the holder's inherited face, size, and line height; radius 0; shadow `none`; duration `0s`; opacity 1, or the class's own value; outline style `auto` on keyboard focus where the class draws no ring. Where the class has an anchor form, the proof reads it beside the button form, following BARE-BUTTON's V9 property method.
- Mutation per class: deleting that partial's include reddens at least one row. For `.btn`, the proof shows the include is a no-op: deleting it changes no reading, which the report records as the proof that `.btn` needs no reset.
- Carousel: a resting indicator reads opacity 0.5, the active one 1, the shadow `none`, and focus-visible outline `auto`.

**E-ID-BUTTON-LISTS** (`sol` on GPT-6 Astra)
- Owns the mirrored proofs for `.nav-link` (plain `.nav`, `.navbar-nav`, tabs, pills), `.dropdown-item`, and `.list-group-item-action` (first, middle, and last rows).
- The readings and mutations are the same as CHROME's. The middle list row and the plain nav link read corner radius 0; with the include deleted, they read `--vn-radius-base`.

**E-ID-BUTTON-PROSE** (`opus` on Opus 5.5)
- Runs after CHROME and LISTS land.
- Owns:
  - `guides/veneer.md`: the paragraph that begins "A bare button is a `button` element", the `_button.scss` inventory row, the Tailwind paragraph that begins "A button styled with utility classes", and the mixin's documentation row;
  - the `app/browser/styles/_shell.scss` comment around the `[data-control]` hook;
  - `tests/app/browser/sections/BadgeSection.test.ts`, where its wording names the bare button.
- Retires "bare button" everywhere it appears in the tree (search pattern `bare button|bare treatment|no class claims`). Replacement wording:

  > Every `button` element takes the calibrated button surface and its states, whatever class it carries. Each class the release builds on a `button` element writes the button reboot back at zero specificity in the `components` layer, so the class lays out as the release lays it out, and every rule the class writes wins over the reboot.

- Acceptance: guide parity and the prose sweep are green, and no sentence claims more than a proof reads.

## 5. Risks and open questions

- **`revert` on a button in Chromium.** Does `font-weight: revert` read the UA's `normal` from the form-control `font` shorthand, and do `outline: revert` and `transition: revert` read the UA's values? Settled by the CHROME and LISTS readings against the anchor form and the release, on the pinned Chromium.
- **The `preflight` profile.** `revert` skips Tailwind's `base` layer as well. The component buttons must still resolve what the standalone cascade resolves. Settled by the preflight pairing proof reading a `button.nav-link` and a `button.list-group-item`.
- **First use of `:where()` in Veneer.** No partial under `src/styles/` uses it (Grep `:where\(` returned no matches). The ledger's selector normalizer, the positional scanner, and `npm run test:policy` might mishandle it. Settled by CORE running the ledger and policy gates on the compiled selectors.
- **`transition: revert` against the styles rule** "Never declare a `transition:` without `prefers-reduced-motion: reduce`". The navbar partial writes a bare `transition: none` with a stated reason. Settled by the policy sweep's reading in CORE, which rules on `revert` against the transition mixin.
- **Other documented `<button>` classes.** Unknown until the documented-markup search runs. Hand it to `grok`: pattern `<button[^>]*class=` over `site/content/docs/5.3/**/*.md` at tag `v5.3.8`. From memory, and unverified, `.dropdown-toggle` and `.dropdown-toggle-split` appear only beside `.btn` or `.nav-link`. The search settles it before CORE's brief is written.
- **A consumer who sets `background-color` on their class loses the surface's hover and press tint.** Their rest declaration outranks the elements states. The states mix over `--vn-button-transparent`, so a consumer who retunes that token on their class keeps them. PROSE decides whether the guide names that path. Settled by a reading of a class retuning the token under hover.
- **Anchor forms.** The resets name `button`, so `a.nav-link` and the other anchor forms stay as they are. If Veneer's `a` default leaks into those anchors, that is a separate finding for the capability that owns `a`, not for this round.

## Tensions (for the objective lane or the Orchestrator)

- **Per-partial includes rather than one list.** The alternative is a single `:where(button):where(.btn, .btn-close, …)` rule in one components partial. It costs less in the ledger (one Addition row) and keeps the population in one place. I chose per-partial includes because Addendum 2 has the class write its own resets.
- **`.btn` carries the include although it leaks nothing.** This keeps a uniform rule over every class the release builds on `<button>`.
- **`revert` rather than literal UA values** (`normal`, `none`, `1`, `auto`).
- **The surface drops `cursor`.**
- **"Bare button" retires as a term.**
- **The showcase mode control keeps its `data-control` hook.** It still works, and BARE-BUTTON's B4 reason for it no longer applies.

Key files:
- /home/user/veneer/src/styles/elements/_button.scss
- /home/user/veneer/src/styles/_mixins.scss
- /home/user/veneer/src/styles/components/_close.scss
- /home/user/veneer/src/styles/components/_navbar.scss
- /home/user/veneer/src/styles/components/_accordion.scss
- /home/user/veneer/src/styles/components/_dropdown.scss
- /home/user/veneer/src/styles/components/_nav.scss
- /home/user/veneer/src/styles/components/_list-group.scss
- /home/user/veneer/src/styles/components/_pagination.scss
- /home/user/veneer/src/styles/components/_carousel.scss
- /home/user/veneer/src/styles/components/_button.scss
- /home/user/veneer/tests/src/styles/elements/button.test.ts
- /home/user/veneer/guides/veneer.md
- /home/user/veneer/app/browser/styles/_shell.scss
