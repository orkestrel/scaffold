Lane held: **subjective** (`planner` on Opus 5.5). The brief's Output section fixes the shape, so this proposal carries only its sections.

## Units

**Order.** UTIL-SPACER → UTIL-PAINT → the parallel wave → UTIL-VERIFY.
- The parallel wave runs UTIL-TEXT, UTIL-FONT, UTIL-SPACING, UTIL-DISPLAY, UTIL-PLACEMENT, UTIL-FLOW, and UTIL-EFFECT, each in its own worktree cut from UTIL-PAINT's landing commit.
- UTIL-SPACER goes first because it lands the scale and the `utility` mixins that every later partial calls.
- UTIL-PAINT goes before the wave because every wave specimen draws its visible box with `.border` and `.bg-body-tertiary`.

**Common to every writing unit.** Each unit's own entry states only what differs from this list.
- **Route.** `opus` on Opus 5.5, native, because the Chromium journeys and the service proof's Chromium are unreachable inside a bench sandbox.
- **Audit.** `analyst` on GPT-6 Astra holds the objective lane. `reviewer` on Opus 5.5 holds the subjective lane. `checker` on the Grok ladder checks the mechanical criteria: the ledger rows, the `listed` literal, the compatibility rows, the registry rows, the barrel subsequence, and the exclusion-line union.
- **Shared report-only files.** The unit edits them in its own worktree as appends at the anchors the family rulings name, and the Orchestrator integrates them serially:
  - `src/styles/index.scss`
  - `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`
  - `tests/conformance.test.ts`
  - `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`
  - `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`
  - `tests/setup.css`, `tests/fixtures/tailwind/consumer.css`, `tests/fixtures/tailwind/preflight.css`, `tests/fixtures/tailwind/markup.html`
  - `guides/veneer.md`
  - `src/styles/_mixins.scss`, for every unit except UTIL-SPACER
- **Off-limits.**
  - `tests/setupPolicy.ts` and `tests/policy.test.ts` (vendored; `scaffold repair` restores them)
  - `tests/fixtures/oracle/**`, `tests/setupServer.ts`, `tests/setupServer.test.ts`
  - `src/styles/_theme.scss`, `src/styles/elements/**`, `src/browser/**`
  - `configs/**`, `vite.config.ts`, `tsconfig.json`, `package.json`, `package-lock.json`, `README.md`
  - `ROADMAP.md`, which is report-only
  - every partial and proof another unit owns
- **Stop condition.** A unit that needs the `attributeSelector` ladder to change stops and reports.
- **Acceptance, cheap first.** A scoped `oxfmt` over owned files, then `npm run format:check`, `npm run lint:check`, and `npm run check`. Then `npm run build:src`, `npm run test:setup`, the owned proofs under `npm run test:src:styles`, and `npm run test:app`. Then `npm run test:conformance`, which covers the four ledger gates, the deferral gate, the priority case, and the compatibility gate. Then `npm run test:guides` and `npm run test:policy`. Then `npm run build:src:styles && npm run test:service`, for every unit that ships a shared name. Last, `npm run test:journey` and `CAPTURE=1 npm run test:journey`, with the frames written listed in the report. The whole `npm test` run is an observation.
- **Report.** Every unit reports three tables:
  - the coverage matrix: each inventory selector and condition against its proof case, its specimen, and its scenario
  - the shared-name table: each name against its measured line status and the longhands Tailwind declares for it
  - the precedence cases, each with its mutation

### UTIL-SPACER

- **Mechanism.** The spacer scale and the gap properties, plus the `utility` and `utility-variable` mixins.
- **Keys.** It adds `gap` and `column-gap`. It re-expresses the shipped `row-gap`, `g`, `gx`, and `gy`.
- **Owned files.**
  - `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/core/constants.ts`
  - `src/styles/utilities/_gap.scss`, `src/styles/components/_grid.scss`
  - `tests/src/styles/utilities/gap.test.ts`, `tests/src/styles/components/grid.test.ts`
  - `tests/src/styles/mixins.test.ts`, `tests/src/styles/fixtures/mixins.scss`
  - `tests/src/styles/tokens.test.ts`, `tests/src/core/index.test.ts`
  - `tests/service/tailwind/profiles.test.ts`, `tests/service/tailwind/consumer.test.ts`
  - `tests/app/browser/sections/LayoutSection.test.ts`
- **Work.**
  - Rename the scale, per FR2.
  - Move the gutters, per FR3.
  - Land the mixins, per FR4.
  - Rewrite `_gap.scss` as `gap`, `row-gap`, and `column-gap` through `utility`, in the release's map order, inside a single `breakpoint-each` walk.
  - Make the Tailwind contract live, per FR11.
  - Return the barrel-subsequence case as a patch for `tests/conformance.test.ts`, per FR5.
  - In the guide, write `### Gap utilities` and rename the token table, whose `Source` cell becomes "spacer step". Strike the sentence saying that `gap` and `column-gap` "remain assigned to the utilities family". Restate the § Tailwind sentence "No shipped shared name is important…" to the shipped state.
- **Specimens,** appended to the Layout region:
  - `Gap steps`: a `.btn-toolbar.gap-N` of secondary buttons at each step.
  - `Responsive gap`: `gap-1 gap-md-4 column-gap-xl-2` on a wrapping toolbar.
  - Each specimen takes one resting capture row.
- **Proofs, with the mutation each proof tells apart:**
  - mixins: "emits every property important and every local and variable normal". It fails when `!important` is dropped from `utility` or added to `utility-variable`.
  - mixins: "emits a responsive entry at each infix and a fixed entry at the empty infix alone". It fails when the mixin ignores `$responsive`, because the fixture's `-md` probe then exists.
  - mixins: "names a null class and a null key the way the release does". It fails when the dash is always inserted, which produces `.-visible` and `.border-`.
  - gap: every `gap`, `column-gap`, and `row-gap` step at each boundary. It fails on a wrong step map, or when a step reads `--vn-space-*`.
  - gap: "a wider infix wins across entries". `.gap-md-4.column-gap-sm-2` at 768px reads a 24px column gap. It fails when the breakpoint loop runs per entry, which reads 8px.
  - gap: steps are density-independent and follow a retuned `--vn-spacer-4`. It fails when a density factor is added to the scale.
  - gap: the priority over a later unlayered rule, and the `@layer utilities` escape. It fails when `!important` is dropped.
  - grid: the moved gutter cases, plus "loads the gutter classes after the row". It fails when the gutters sit ahead of `.row`, because `.row.g-3` then reads 1.5rem.
  - tokens: the spacer rows of the reference map. It fails on a leftover `--vn-gap-*` declaration.
  - profiles and consumer: the executed profile emits exactly the shared names whose importance covers Tailwind's longhands, and the importance branch reads the shipped `gap-3`. Each case fails when `!important` is dropped from `.gap-3`, or when `gap-3` is written onto the exclusion line.
- **Risks.**
  - The rename changes the public `TOKEN_NAMES` export.
  - Every Veneer cell in the `g`, `gx`, `gy`, and `row-gap` ledger tables regenerates.
  - Moving the gutters from the `utilities` layer to the `components` layer changes their layer.

### UTIL-PAINT

- **Mechanism.** Role paint with its local opacity variable, on backgrounds and borders, plus radius.
- **Keys.** `bg`, `border`, `rounded`. The key's opacity, subtle, gradient, and width entries ship with it.
- **Owned files.** `src/styles/utilities/_background.scss`, `src/styles/utilities/_border.scss`, and their mirrored proofs under `tests/src/styles/utilities/`. `app/browser/sections/BackgroundSection.ts` and `BorderSection.ts`, and their section proofs.
- **Specimens.**
  - Background region: `Background roles`, `Subtle backgrounds`, `Body backgrounds`, `Background opacity`, `Background gradient`.
  - Border region: `Additive borders`, `Subtractive borders`, `Border roles`, `Subtle borders`, `Border widths`, `Border opacity`, `Rounded corners`, `Rounded sizes`.
- **Proofs, with the mutation each proof tells apart:**
  - Each role resolves its role's RGB channels, iterated through `$aliased`. It fails on a literal role list or an emitted `-tertiary`.
  - `.bg-success.bg-opacity-25` reads alpha 0.25, and `.bg-opacity-25` alone paints nothing. It fails when the local is written after the property, or written important.
  - The subtle and emphasis tiers inside `[data-bs-theme="dark"]` read the dark tokens. It fails on a written light value.
  - `.border.border-top-0` reads a top width of 0, following the map order. It fails when the side entries are emitted before `border`.
  - `--vn-factor-radius: 2` doubles `.rounded-2`, and a `--vn-border-width` retune moves `.border`.
  - The priority over an unlayered rule.
- **Risks.** The release writes `RGBA(`, and the textual ledger might read Veneer's `rgba(` as `declared`. `border-1` through `border-5` are expected on the exclusion line, which the unit measures.

### UTIL-TEXT

- **Mechanism.** Text alignment, wrapping, transform, and decoration; text role colors with their local opacity; the color-and-background pairs; the truncation helper; and the `link` key's layer.
- **Keys.** `text` ships whole: alignment at every infix, decoration, transform, `text-wrap`, `text-nowrap`, `text-break`, role colors, black, white, body tiers, muted, black-50, white-50, emphasis, reset, `text-opacity`, and `.text-bg-*`. `text-truncate` ships too. `link` relocates.
- **Owned files.**
  - `src/styles/utilities/_text.scss`, `src/styles/utilities/_color.scss`, `src/styles/components/_text-truncation.scss`
  - `src/styles/utilities/_link.scss`, moved from `components/`
  - `src/styles/components/_button.scss`
  - the mirrored proofs, including `tests/src/styles/utilities/link.test.ts`, moved from `components/`
  - `TextSection.ts`, `ColorSection.ts`, and their section proofs
- **Shared patch.** The `foreground($role)` function in `_mixins.scss`, per FR9.
- **Specimens.**
  - Text region: `Text alignment`, `Responsive text alignment`, `Wrapping`, `Word break`, `Text transform`, `Text decoration`, `Truncated text`. `Truncated text` is a `.row > .col-4.text-truncate`.
  - Color region: `Text roles`, `Text emphasis`, `Body text tiers`, `Text opacity`, `Text reset`, `Color and background pairs`. `Color and background pairs` is `.badge.text-bg-{role}`.
- **Proofs, with the mutation each proof tells apart:**
  - `.text-bg-{role}` paints the same foreground as `.btn-{role}`. It fails on the release's literal `#000` for warning.
  - `.link-primary.text-danger` resolves to the danger color. It fails when `_link.scss` stays in `components`.
  - `.text-bg-primary.bg-danger` resolves a danger background. It fails when the pairs load after `_background.scss`.
  - A wider alignment infix wins.
  - The ellipsis resolves with `scrollWidth > clientWidth`.
  - Emphasis reads dark in a dark island.
  - `_button.scss` compiles byte-identical before and after routing through `foreground`. This follows the D40 method.
- **Risks.** The info and warning pairs depart from the release's `#000`. The move changes a shipped key's layer.

### UTIL-FONT

- **Keys.** `font`, `fs`, `fst`, `fw`, `lh`.
- **Owned files.** `src/styles/utilities/_font.scss`, `tests/src/styles/utilities/font.test.ts`, `tests/app/browser/sections/TypeSection.test.ts`.
- **Specimens,** appended to the Type region: `Font sizes`, `Font weights`, `Font styles`, `Line heights`, `Monospace`.
- **Proofs, with the mutation each proof tells apart:**
  - `.fs-N` equals `.hN` at 390px and 1280px, and under a retune of `--vn-size-{9-N}`. It fails when the fluid `calc()` or the release's literal is written.
  - `.lh-base` follows a `--vn-line-body` retune. It fails on a literal `1.5`.
  - `.font-monospace` follows `--vn-font-mono-base`.
- **Risk.** Dropping the release's font-size scaling (the `rfs` pass, the `fs` query at `(min-width: 1200px)`) departs on narrow viewports. It is the `.hN` treatment.

### UTIL-SPACING

- **Keys.** `m`, `mx`, `my`, `mt`, `me`, `mb`, `ms`, `p`, `px`, `py`, `pt`, `pe`, `pb`, `ps`, `user-select`. The `pe` key closes padding-end and pointer-events together.
- **Owned files.** `src/styles/utilities/_spacing.scss`, `src/styles/utilities/_interaction.scss`, and their mirrored proofs. `SpacingSection.ts`, `InteractionSection.ts`, and their section proofs.
- **Specimens.**
  - Spacing region: `Margin steps`, `Padding steps`, `Side margins`, `Side padding`, `Auto margins`, `Responsive spacing`.
  - Interaction region: `Text selection`, `Pointer events`.
- **Proofs, with the mutation each proof tells apart:**
  - Every side, step, and boundary, through `GRID_BREAKPOINT_CASES`, the renamed step table, and a `SPACING_SIDE_CASES` table.
  - `.m-md-3.mx-sm-1` at 768px reads a 16px `margin-left`. It fails when the breakpoint loop runs per entry.
  - `.p-3.px-1` reads the `px` value. It fails when `padding-x` is emitted before `padding`.
  - A spacer retune moves every side, and density leaves it.
  - `.pe-none` lets `elementFromPoint` reach the element underneath. It fails on `pointer-events: auto`.
- **Risks.** This unit carries the largest volume of ledger rows. The logical Tailwind longhands keep `mx`, `my`, `ms`, `me`, `px`, `py`, `ps`, and `pe` on the exclusion line, which the unit measures.

### UTIL-DISPLAY

- **Keys.** `d`, including its print pass. `flex`, `justify-content`, `align-items`, `align-content`, `align-self`, `order`, `align`, `hstack`, `vstack`.
- **Owned files.** `utilities/_display.scss`, `utilities/_flex.scss`, `utilities/_vertical-align.scss`, `components/_stacks.scss`, and their mirrored proofs. `DisplaySection.ts`, `FlexSection.ts`, and their section proofs.
- **Specimens.**
  - Display region: `Display values`, `Responsive display`, `Print display`, `Vertical alignment`.
  - Flex region: `Flex direction`, `Flex wrap`, `Justified content`, `Aligned items`, `Aligned content`, `Aligned self`, `Fill, grow, and shrink`, `Flex order`, `Horizontal stack`, `Vertical stack`.
- **Proofs, with the mutation each proof tells apart:**
  - Under `stageMedia({ print: true })`, `.d-print-none` reads `none` and `.d-none.d-print-block` reads `block`, and the screen reading returns afterwards. It fails when the print block is omitted or placed under a screen condition.
  - Each flex property at each boundary.
  - A stack is a centered row, and `.hstack.gap-3` composes. It fails when the stack's `display` is dropped.

### UTIL-PLACEMENT

- **Keys.** `w`, `h`, `mw`, `mh`, `vw`, `vh`, `min`, `position`, `top`, `bottom`, `start`, `end`, `translate-middle`, `z`, `fixed`, `sticky`, `visually-hidden`, `visible`, `invisible`.
- **Owned files.**
  - `utilities/_sizing.scss`, `utilities/_position.scss` (which includes z-index), `utilities/_visually-hidden.scss`, `utilities/_visibility.scss`
  - `components/_position.scss`, loaded `as position-component`
  - their mirrored proofs
  - `SizingSection.ts`, `PositionSection.ts`, `VisibilitySection.ts`, and their section proofs
  - `app/browser/styles/_shell.scss`, which gains a layout-only `.viewport` frame: `contain: layout paint`, a bounded height, `overflow: auto`
- **Specimens.**
  - Sizing region: `Width steps`, `Height steps`, `Maximum sizes`, `Viewport sizes`.
  - Position region: `Position values`, `Edge offsets`, `Centered translation`, `Stacking levels`, `Fixed bars`, `Sticky bars`.
  - Visibility region: `Visible and invisible`, `Visually hidden`, `Skip link`. `Skip link` is driven by focus.
  - `Viewport sizes`, `Fixed bars`, and `Sticky bars` render inside `.viewport`.
- **Proofs, with the mutation each proof tells apart:**
  - The `.fixed-top` z-index follows a `--vn-stack-fixed` retune. It fails on a literal `1030`.
  - Sticky applies at each boundary.
  - `.visually-hidden.position-relative` resolves `relative`. It fails when the helper sits in `components`.
  - The skip link widens past 1px under `traverseAccessible`. It fails when `:not(:focus)` is dropped.
  - `.invisible` keeps its box.
- **Risks.** `.vw-100` overflows the page unless it is framed. `.viewport` is shell chrome and must paint nothing.

### UTIL-FLOW

- **Keys.** `float`, `clearfix`, `overflow` including its `-x` and `-y` entries, `object-fit`, `stretched-link`.
- **Owned files.** `utilities/_float.scss`, `utilities/_overflow.scss`, `utilities/_object-fit.scss`, `components/_clearfix.scss`, `components/_stretched-link.scss`, and their mirrored proofs. `FloatSection.ts`, `OverflowSection.ts`, `ObjectFitSection.ts`, and their section proofs. `tests/app/browser/sections/LinkSection.test.ts`.
- **Specimens.**
  - Float region: `Float sides`, `Responsive float`, `Cleared floats`.
  - Overflow region: `Overflow values`, `Axis overflow`.
  - Object fit region: `Object fit values`, `Responsive object fit`.
  - Links region, appended: `Stretched link`, a card.
- **Proofs, with the mutation each proof tells apart:**
  - The clearfix host's height contains its floats. It fails when `clear: both` is omitted.
  - `elementFromPoint` at a card corner returns the link. It fails when the `::after` inset is omitted.
  - The `overflow-x` and `overflow-y` entries act independently.

### UTIL-EFFECT

- **Keys.** `shadow`, `opacity`, `focus-ring`.
- **Owned files.** `utilities/_shadow.scss`, `utilities/_opacity.scss`, `components/_focus-ring.scss`, and their mirrored proofs. `ShadowSection.ts`, `OpacitySection.ts`, `FocusRingSection.ts`, and their section proofs.
- **Specimens.** `Shadows`, `Opacity steps`, `Focus ring`, `Focus ring roles`. The focus-ring specimens take driven focus scenarios.
- **Proofs, with the mutation each proof tells apart:**
  - `.shadow` follows `--vn-factor-elevation`.
  - `readRing` reads the default color and each role color.
  - `stageMedia({ forced: true })` reads the outline. It fails when `forced-ring` is omitted.
- **Risk.** Tailwind's shadow rules declare `--tw-shadow`, which keeps the `shadow*` names on the exclusion line if the reader counts custom properties. The unit measures this.

### UTIL-VERIFY

- **Route.** `verifier` on Sonnet, after integration.
- **Work.** Run the authoritative chain, `test:service`, and `CAPTURE=1 npm run test:journey`.
- **After it.** The Orchestrator closes the carrier rows from each unit's shared-name table, and the family's capture-portfolio verdict round runs.
- **Owned files.** None.

## Family rulings

**FR1 Key closure.**
- Option: assign each inventory key whole to one unit, and split partials by mechanism inside that unit.
- Cost: `text` pulls alignment in beside the colors, and `pe` pulls pointer-events in beside the spacing.
- Recommendation: adopt it. The alternative is a split key carried by cross-unit deferral rows, which forces serial order and leaves a unit unable to measure its own ledger.

**FR2 One spacer scale.**
- Option: margin, padding, `gap`, `row-gap`, `column-gap`, and the gutters all read `--vn-spacer-0` through `--vn-spacer-5` with no density factor. The scale is renamed from `--vn-gap-*`, and `TOKEN_NAMES.gap` becomes `TOKEN_NAMES.spacer`.
- Cost: a public-export rename, and ledger rows for every tokenized spacing declaration.
- Recommendation: adopt it. `--vn-space-*` would make `.p-3` and `.gap-3` disagree under density, and `margin-top: var(--vn-gap-3)` names the wrong concept.

**FR3 The gutters' home.**
- Option: `.g-*`, `.gx-*`, and `.gy-*` move into `components/_grid.scss` after the row rules, which is the release's `make-grid-columns` home, and `_gap.scss` keeps only the gap properties.
- Cost: those rules change layer.
- Recommendation: adopt it.

**FR4 Mixins and order.**
- `utility($class, $properties, $values, $infix: '', $responsive: false, $locals: ())` writes `!important` on every property and writes its locals normal.
- `utility-variable($class, $variable, $values)` writes `--bs-{variable}` normal.
- Each partial walks `breakpoint-each` once and calls its entries in the release's `$utilities` map order.
- Recommendation: adopt it. The `!important` rule and the cross-infix order each have one home, and the fixture proves every branch.

**FR5 Layer by importance.**
- A helper the release writes with `!important` sits in the `utilities` layer, loaded ahead of the utility partials: `_link`, `_visually-hidden`, and the `.text-bg-*` rules at the head of `_color`.
- A helper with normal declarations sits in `components`, under the release's helper filename.
- The barrel's utilities block loads `link`, `visually-hidden`, `vertical-align`, `float`, `object-fit`, `opacity`, `overflow`, `display`, `shadow`, `position`, `border`, `sizing`, `flex`, `spacing`, `gap`, `font`, `text`, `color`, `background`, `interaction`, `visibility`, in that order.
- The components helpers follow the release's `_helpers.scss` order: `clearfix`, `focus-ring`, `icon-link`, `ratio`, `position`, `stacks`, `stretched-link`, `text-truncation`, `vr`.
- A `tests/conformance.test.ts` case asserts the subsequence.
- Cost: `_link.scss` moves.
- Recommendation: adopt it. An important rule in `components` beats an important rule in `utilities`, which reverses the release's source order.

**FR6 Token binding.**
- Bind a token only where it names the release value's concept and resolves to its value:
  - margin, padding, and gap read the spacer scale
  - `.fs-N` reads `--vn-size-{9-N}`
  - `.lh-base` reads `--vn-line-body`
  - `.fixed-*` reads `--vn-stack-fixed`, and `.sticky-*` reads `--vn-stack-sticky`
- Every release `var(--bs-*)` reference is written byte for byte.
- Everything else is a literal and records nothing: the opacity steps, the position percentages, `.z-*`, `.fw-*`, the other line heights, the widths, and the border widths.

**FR7 Dark axis.** No utility partial carries a mode rule. The subtle and emphasis tiers and the body tiers read the `--bs-*` aliases that `theme-tokens` re-declares in every mode scope. Each proof reads its values inside a `data-bs-theme="dark"` island.

**FR8 Font size is heading size.**
- Option: `.fs-N` resolves what `.hN` resolves, and drops the release's font-size scaling (the `rfs` pass) the way the `#### h1` rows do.
- Cost: `tokenized` and `dropped` ledger rows.
- Recommendation: adopt it.

**FR9 Foreground on a role fill.**
- Option: a `foreground($role)` function shared by `.btn-*` and `.text-bg-*`.
- Cost: a `_button.scss` grant, with the button compile byte-identical.
- Recommendation: adopt it. `.badge.text-bg-warning` has to match `.btn-warning`.

**FR10 Negative margins.** Ship none. The release default emits none, and the inventory records no key and no selector for them. The guide states this in one sentence.

**FR11 Tailwind contract.**
- A shared name whose Veneer `!important` covers every longhand Tailwind declares for it leaves the exclusion line. Every other shared name joins the line.
- The profiles proof asserts that the executed profile emits exactly the names off the line.
- Each unit measures its names, adds them to `markup.html`, and returns its line names. Integration writes the line and its copies as a set union. This is the one named exception to append-only edits.

**FR12 Showcase.**
- A region is a mechanism, named for the release's documentation page.
- Specimens show a value ramp, a responsive behavior, or a driven state, and never one class alone.
- A specimen composes only classes shipped at the unit's launch commit plus the unit's own classes.
- Utility regions are constructed after every component region, in barrel order.

**FR13 Capture.** Each specimen takes one resting `CASCADE_KEYS` row. Focus reveals take `DRIVEN_KEYS` rows. The print pass is read by the proof and takes no print frame. D17's decline rule stands.

**FR14 Proof shape.** Each proof takes these readings:
- the token reading and its retune
- the factor reading, or the absence of a factor
- the mode reading
- every infix at its boundary
- the cross-entry order
- the priority over an unlayered rule
- the escape through `@layer utilities`

**FR15 Guide.**
- Write one `### <Page> utilities` section per region, in the voice of `### Table classes`. Each section documents the helpers of its mechanism beside its utilities.
- Add a § Files row per partial, the compatibility rows, the ledger tables, the Additions rows, and the § Tests links.

**FR16 Forced colors.** `.focus-ring:focus` includes `forced-ring` and records it as an Additions row, following the D37 precedent.

## Rulings needed

**Unit split.** Take the units in the preceding section. The alternative splits UTIL-SPACER into a `builder` rename unit and an `opus` mixin unit. That costs file disjointness, because both units would hold `_gap.scss` and `gap.test.ts`. Recommendation: keep UTIL-SPACER as a single unit.

**The `gap` contradiction.** Ship `gap` and `column-gap` in `_gap.scss` beside `row-gap`, and split the gutters out to `_grid.scss` (FR3). The cost is a layer change for the `g`, `gx`, and `gy` keys. Recommendation: adopt it, which closes the CL8b carrier row.

**Unlisted entries** (exit criterion item 3). Every entry ships with its key's closure:

| Entry | Key | Ruling |
| --- | --- | --- |
| `overflow-x`, `overflow-y` | `overflow` | UTIL-FLOW ships them |
| `text-decoration`, `text-opacity`, `.text-bg-*` | `text` | UTIL-TEXT ships them |
| `bg-opacity` | `bg` | UTIL-PAINT ships it |
| `border-opacity` | `border` | UTIL-PAINT ships it |
| `pointer-events` | `pe` | UTIL-SPACING ships it |
| the `link-*` utility entries and the colored links | `link` | already shipped; UTIL-TEXT relocates them |
| `.visually-hidden-focusable` | `visually-hidden` | UTIL-PLACEMENT ships it |
| the focus-ring map | `focus-ring` | UTIL-EFFECT ships it |

Nothing is excluded.

**Negative margins and the font-size scaling.** Adopt FR10 and FR8. The inventory records one `(min-width: 1200px)` block for `.fs-1` through `.fs-4`.

**The shared-name contract and its carriers.** Adopt FR11. The consumer pairing's cases "derives the shared class names, and mounts an element for every one of them" and "leaves every shared name resolving to the declaration the cascade ships" prove every name. So does the profiles case that UTIL-SPACER restates. The owning unit's style proof adds a reading of each name's value. The line statuses in this table are predictions; each owning unit measures them.

| Owner | Expected off the line | Expected on the line |
| --- | --- | --- |
| UTIL-SPACER | `gap-*` | — |
| UTIL-PAINT | `bg-black`, `bg-white`, `bg-transparent`, `border`, `border-0`, `border-black`, `border-white`, `rounded` | `border-1` through `border-5` |
| UTIL-TEXT | `text-center`, `text-start`, `text-end`, `text-black`, `text-white` | `text-wrap`, `text-nowrap` |
| UTIL-SPACING | `m`, `mt`, `mb`, `p`, `pt`, `pb` at every step | `mx`, `my`, `ms`, `me`, `px`, `py`, `ps`, `pe` |
| UTIL-DISPLAY | `align-*`, the shared `flex-*` names, `order-*` | — |
| UTIL-PLACEMENT | `top-*`, `bottom-*`, `z-*`, `w-*`, `h-*`, `visible`, `invisible` | `start-*`, `end-*` |
| UTIL-FLOW | `float-*`, `overflow-*` | — |
| UTIL-EFFECT | `opacity-*` | `shadow*` |

- The carrier for the "all normal" row is UTIL-VERIFY. The family ships no shared name whose declarations are all normal, and it is the last family that ships class names.
- The carrier for the helper-home row is each helper's unit, and UTIL-VERIFY records the closure.

**Showcase and captures.** Adopt FR12 and FR13. The alternative is one "Utilities" region, which would render as an unnavigable wall of specimens.

**Token binding.** Adopt FR2 and FR6. The alternative writes the release's spacing literals: that means no spacing ledger rows, but no retune reaches the spacing utilities, and gap and spacing split onto different treatments.

**Dark axis.** Adopt FR7.

**The profiles proof contradicts the guide.** The `profiles.test.ts` case "withholds every shared class name…" holds every shared name on the line, and "fills Tailwind reset only…" expects an empty profile. The consumer equality requires the important names off the line. These cannot both hold after UTIL-SPACER ships `gap-*`. Recommendation: the guide's rule wins (FR11), and UTIL-SPACER restates the profiles proof. The alternative keeps every shared name withheld, which puts a very long list of names into every consumer's recipe.

**Terrain against tree.** The tree wins on each point:
- The `rfs` pass (the release's font-size scaling) emits one `(min-width: 1200px)` block, not one block per breakpoint (terrain § A and § G).
- The `text` key also records `.text-truncate` and `.text-bg-*` (terrain § B).
- `TOKEN_NAMES.gap` is a public export in `src/core/constants.ts`, which terrain § H omits.
- The important colored-link rules in `components/_link.scss` invert the release's resolution against `.text-*`.

## Files the result makes false

- **UTIL-SPACER**
  - `src/core/constants.ts` (`TOKEN_NAMES.gap`) and `tests/src/core/index.test.ts`
  - `tokens.test.ts`, `gap.test.ts`, `grid.test.ts`
  - `GAP_STEP_CASES` in `tests/setupStyles.ts`
  - the `Gutter steps` markup in `app/browser/constants.ts`, the `LAYOUT_COPY` paragraph, and `LayoutSection.test.ts`
  - the `profiles.test.ts` cases named in the preceding section
  - the `consumer.test.ts` branch comment
  - in the guide: the § Tailwind sentence "No shipped shared name is important…", the gap token prose and table, the `_gap.scss` and `_grid.scss` § Files rows, and the `g`, `gx`, `gy`, and `row-gap` ledger cells
  - the `listed` literal
- **UTIL-TEXT**
  - `components/_link.scss` and `components/link.test.ts`, both moved
  - the `_link.scss` § Files row
  - the barrel's `components/link` line
  - `_button.scss`, which stays byte-identical
- **UTIL-FONT.** `TYPE_SPECIMENS`, `TYPE_COPY`, and `TypeSection.test.ts`.
- **UTIL-FLOW.** `LINK_SPECIMENS`, `LINK_COPY`, and `LinkSection.test.ts`.
- **UTIL-PLACEMENT.** `_shell.scss`.
- **Every unit**
  - the `listed` literal in `tests/conformance.test.ts`
  - the regions and specimen concatenation in `tests/app/browser/Showcase.test.ts`, the export literal in `tests/app/browser/index.test.ts`, and `app/browser/index.ts`
  - `Showcase.ts`
  - the `CaptureSubject` union, `CASCADE_KEYS`, and `DRIVEN_KEYS` in `tests/setup.ts`, with the matching `setup.test.ts` rows
  - the exclusion line in `tests/setup.css`, its copies (the two guide recipe fences, `consumer.css`, `preflight.css`), and `markup.html`, for every unit that ships a shared name
  - § Files, § Compatibility, § Departures, § Additions, and the § Tests links in `guides/veneer.md`
  - the barrel

## Exit criterion

1. Every queue key, and every unlisted entry the table in `Rulings needed` names, ships whole in the cascade. The ledger gates, the deferral gate, and the priority case are green, and each key sits in § Compatibility and `listed`.
2. `gap` and `column-gap` ship beside `row-gap`. The CL8b carrier row closes.
3. The spacer scale is the single scale for spacing, gap, and gutters. A retune of it moves every consumer, and density leaves it unchanged.
4. Every key renders in a mechanism region. Every helper has a real-consumer specimen, which closes the helper-home carrier row.
5. Every specimen is registered, or declined with a recorded reason. The `CAPTURE=1` frames are written.
6. Every partial has a mirrored proof carrying the FR14 readings, and every named mutation reddens it.
7. The consumer and profiles proofs are green over every shared name. The line and its copies agree, and the "all normal" carrier row closes.
8. The `link` rules, the `.visually-hidden` rules, and the `.text-bg-*` rules sit in the `utilities` layer, with the release's precedence proved.
9. The guide's sections, § Tokens, and § Tailwind state the shipped state.
10. UTIL-VERIFY's chain is green.
