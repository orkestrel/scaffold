<!-- BARE-BUTTON design round, subjective lane: planner on Opus 5.5 (native subagent, clean context); the hand-back retained verbatim by the Orchestrator. -->
Lane held: **subjective** (`planner`, Opus 5.5, clean context, read-only). I worked from `/home/user/scaffold/.orkestrel/veneer/units/b-cross-cb-design-brief.md` over `/home/user/veneer`. I could not confirm the branch head `fb0516d` because this lane runs no commands, so every reading below is of the working tree as I found it.

## Unit

**BARE-BUTTON (`cb`)**
- **Writer:** `opus` on Opus 5.5. The unit's load is mostly scope, naming, and guide voice.
- **Audit:** the objective lane on `analyst` (GPT-6 Astra), the engine that did not write the work. The subjective lane on `reviewer` (Opus 5.5). A `checker` for the ledger rows and guide rows.

**Shape this lane proposes.**
- **Every button** — `src/styles/elements/_button.scss` splits into two parts. The first is the release's reboot at the release's values, on every `button`:
  - `margin: 0`, `font-family: inherit`, `font-size: inherit`, `line-height: inherit`, `border-radius: 0`, `text-transform: none`, `-webkit-appearance: button`;
  - the rules that already match the release stay as they are: `button:focus:not(:focus-visible)`, `[role='button']`, the `[type=…]` rules, and the `:not(:disabled)` cursor rules.
- **The bare button** — the second part moves the calibrated surface to `button:not([class])`, with its states nested through `&`, the way `_a.scss` writes the release's `a:not([href]):not([class])` rule. The moved declarations are: padding, border, font-family, font-size, font-weight, line-height, color, background-color, radius, shadow, cursor, the transition and its reduced-motion twin, `:hover`, `:active`, `:focus-visible` with its forced-colors ring, and `:disabled`.
- **Carousel indicators** — in `src/styles/components/_carousel.scss`, the `.carousel-indicators [data-bs-target]` rule writes the release's resolved focus treatment (see R4). The release's markup gives a non-active indicator no class, so the bare rule still reaches it.
- **Showcase shell** — the mode control is hooked by a data attribute instead of the `control` class, so it stays a bare button and keeps the published treatment its `_shell.scss` comment says it borrows (see R5).
- **Guide** — the rule has one home in § Styles, beside the paragraph "A rule in the `elements` layer treats a tag by its name…". Proposed text: "The calibrated button surface selects a `button` element with no `class` attribute, the way the release's reboot selects an anchor with neither an `href` nor a `class` attribute. A button carrying any class takes the release's reboot alone, so a component's button form paints as its anchor form does. Give a classed button the `btn` class to paint it with the Button treatment." § Tailwind carries one sentence pointing back to it for utility-classed buttons.

**Owned files**
- `/home/user/veneer/src/styles/elements/_button.scss`
- `/home/user/veneer/src/styles/components/_carousel.scss` (the indicator rule only)
- `/home/user/veneer/app/browser/styles/_shell.scss` (the `.control` rule and its comment)
- `/home/user/veneer/tests/src/styles/elements/button.test.ts`
- `/home/user/veneer/tests/src/styles/components/nav.test.ts`
- `/home/user/veneer/tests/src/styles/components/dropdown.test.ts`
- `/home/user/veneer/tests/src/styles/components/list-group.test.ts`
- `/home/user/veneer/tests/src/styles/components/carousel.test.ts`
- `/home/user/veneer/tests/src/styles/components/close.test.ts` (the transition comments only)

**Shared, report-only (the unit returns exact patches)**
- `guides/veneer.md`
- `tests/conformance.test.ts`
- `app/browser/Showcase.ts` (the `SHOWCASE_CONTROL` assignment, around line 92)
- `app/browser/constants.ts` (`SHOWCASE_CONTROL`)
- `tests/app/browser/Showcase.test.ts`
- `tests/app/browser/integration.test.ts` (the close-control comment)
- `tests/app/browser/index.test.ts`, if the constant's name changes
- `tests/setupStyles.ts`, if a case table is added

**Off-limits**
- `src/styles/_tokens.scss`, `src/styles/_theme.scss`, `src/styles/index.scss`, and every other `src/styles/**` partial
- `tests/setupServer.ts`: the ledger readers need no change, and a unit that finds it needs one stops.
- `tests/fixtures/oracle/inventory.json`
- `src/browser/**`, `src/core/**`, the vendored files, `configs/**`, and the manifests

**Dependencies**
- Nothing in wave 2 or wave 3 touches `src/styles/elements/**`, so the cascade change can start now.
- The shared patches queue behind the B-MODAL wave-2 landings, which patch `constants.ts`, `integration.test.ts`, and the guide.
- Land before BCF regenerates the portfolio, so the successor lens round covers the V9 frames too (R8).

**Acceptance criteria, cheapest first**
1. Format, lint, and typecheck pass on the owned files, scoped.
2. `npm run build:src:styles` compiles. In the emitted cascade, the `button` rules carry only the release's declarations at the release's values, and `button:not([class])` carries the calibrated set.
3. The scoped styles proofs are green: `elements/button`, `nav`, `dropdown`, `list-group`, `carousel`, and `close`.
4. `tests/conformance.test.ts` and `npm run test:guides` are green after the guide changes:
   - `#### reboot` no longer carries its `button` rows for `border-radius`, `font-family`, `font-size`, and `line-height`;
   - `### Additions` swaps its `button { … }` declaration rows and its `button:hover`, `:active`, `:focus-visible` (both conditions), and `:disabled` selector rows for `button:not([class])` rows under `—`, `@media (prefers-reduced-motion: reduce)`, and `@media (forced-colors: active)`, one for each state, with the Reason reworded to "a button no class claims";
   - any carousel additions are recorded.
5. Every proof in the following table reddens on its mutation, and each mutation log is retained (D45).
6. `Showcase.test.ts`'s "paints one affordance on the mode control in both modes" case is green with the attribute hook.
7. Observations, not criteria (`verifier` takes these after the unit exits): the whole suite and `npm run test:service`, which covers the Tailwind preflight pairing.

The following table names each proof and the mutation it must catch.

| Proof | Reads (computed values) | Mutation it must catch |
| --- | --- | --- |
| Elements: a classed button | A fictional hook class (`class="order-action"`) inside a 20px parent resolves font-size 20px, inherited line-height and family, radius 0, disabled opacity 1, and on focus-visible no shadow ring. The existing bare case stays as it is. | Widen the bare selector back to `button`: the classed button reads 14px and 0.65. Separately, delete `font-size: inherit` from the every-button rule: the classed button reads the user-agent size. |
| Nav | Disabled `button.nav-link` against `a.nav-link.disabled` (the `Base export` and `Base archive` pair): opacity, font-size, font-family, line-height, and color are equal. | Bare selector back to `button`: 0.65 against 1. |
| Dropdown | Disabled `button.dropdown-item` against `a.dropdown-item.disabled`: font-size (the menu's 16px), opacity, and line-height are equal. The keyboard-focused button item and anchor item resolve the same `outline-style` and `box-shadow`. | Same widening: 14px against 16px, 0.65 against 1, and a ring against the user-agent outline. |
| List group | Extend "disables an item on a class and on the native attribute alike" (Oak and Ash) to opacity and the middle item's corner radius. | Same widening: 0.65 and 6px. |
| Carousel | The focused active and non-active indicators resolve equal `outline-style` and `box-shadow`. | Delete the indicator's focus rule: the non-active indicator shows the bare ring. |
| Shell | The mode control's affordance reads the same in both modes. | Hook back to a class: `background-color` follows the user agent's `ButtonFace` per mode (unmeasured, see Risks). |

**Risks**
- **Published behaviour change.** A utility-classed or consumer-classed button (Bootstrap utilities, Tailwind utilities, a consumer's own component) loses the calibrated surface. It takes the release's reboot, plus Tailwind's preflight in that profile. This matches the release byte for byte, but it is a runtime change to the published cascade and bumps the package. Evidence to settle: the guide sentence, and the commit message naming the change.
- **User-agent chrome showing through.** Where a component partial dropped a release declaration because the elements layer supplied it, the user agent's button chrome now shows. The partials I read (`_close`, `_dropdown`, `_nav`, `_navbar`, `_accordion`, `_pagination`, `_list-group`, `_carousel`) each write their own border and background. Evidence: the unit reads each key's `dropped` rows for a button-form selector.
- **Carousel controls lose the Veneer shadow ring.** Keyboard focus then shows only the release's opacity step. This matches the release and the carousel test's own comment ("The recorded focus treatment is an opacity change and no ring"), but it is an accessibility step down. Evidence: the `captioned-carousel-focus` frame.
- **The close control loses its transition.** State flips become instant. The waits stay harmless, but three comments become false.
- **The shell's `ButtonFace` difference between modes is unmeasured.** It matters only if the class hook stays.

## Rulings needed

**R1 — Where the scope lives.**
- **A: `button:not([class])`.**
  - Costs: every classed button loses the calibrated surface, including a consumer hook or a utility-only class. The showcase shell hits this at once (R5). Non-active carousel indicators have no class and stay bare (R4).
  - Gains: it is the release's own idiom for a bare element (reboot's `a:not([href]):not([class])`, mirrored in `_a.scss`). It fixes the V9 class of defect for every component, including a consumer's own. Nothing needs maintaining.
- **B: an exclusion list of component selectors in the elements partial.**
  - Costs: the elements layer names component vocabulary. The list drifts with every component that has a button form, so it needs its own gate. A consumer's own component (`<button class="menu-entry">` beside `<a class="menu-entry">`) keeps the V9 defect. Excluding the indicators needs `.carousel-indicators [data-bs-target]`, a positional condition that the guide's rule forbids (see R4).
- **C: a reset in each component partial.**
  - Costs: many added declaration rows across the ledger, and each future component has to remember the reset. The re-baseline recommendation argues against it.

Recommendation: **A**. The re-baseline's wording, "a button no component class claims", describes B. A is broader, and the extra reach is the argument for it: a classed button renders exactly as the release renders it.

On specificity: the layer order in `_tokens.scss` puts `elements` under `components`, so any declaration a component writes wins whatever its specificity. `button:not([class])` at (0,1,1) outranks `button` at (0,0,1) inside the elements layer, which the split needs. Refuse `:where()`, because at (0,0,0) the bare rule would lose to the every-button rule.

The following list shows what the bare rule writes that each component's own rule does not. I read it from each partial's base, state, and disabled rules; the unit's proofs settle it.
- `.btn`: nothing.
- `.btn-close`: font properties, transition, resting shadow.
- `.dropdown-item`: font-family, font-size, line-height, resting shadow, transition, the focus-visible ring, and disabled opacity (V9).
- `.nav-link`: font-family, line-height, radius outside tabs and pills, resting shadow, and disabled opacity (V9).
- `.list-group-item`: font properties, radius (visible on middle items), shadow, transition, the focus ring, and disabled opacity.
- `.accordion-button`: font-family, font-weight, line-height, shadow while collapsed.
- `.navbar-toggler`: font-family, font-weight, resting shadow.
- `.page-link`: font properties, line-height, and radius on middle items.
- `.carousel-control-prev` and `.carousel-control-next`: font properties, radius, and the focus-visible shadow ring.

**R2 — What stays on every button.** The release's reboot declarations at the release's values, as the brief already requires. Cost: the `#### reboot` rows for `button` `border-radius`, `font-family`, `font-size`, and `line-height` disappear, because the ledger reads the last `button` block and finds the release's values. The calibrated values move to the bare selector's addition rows. Recommend.

**R3 — What a consumer's classed button receives.** The release's reboot and nothing more. The guide tells the developer to add the `btn` class for the Button treatment. Do not claim that `.btn` equals the bare surface: `.btn` carries a 1px transparent border and the bare surface has none. Recommend.

**R4 — The non-active carousel indicators.** Under A they stay bare, while the active one (`class="active"`) does not. On keyboard focus that gives the Veneer ring on some indicators and the user-agent outline on the other. The change creates this split: today every indicator gets the ring.
- **(a)** The indicator rule writes the release's resolved treatment: the user-agent focus outline (`outline: revert`) and no shadow, at rest and on focus-visible. Cost: carousel addition rows.
- **(b)** Every indicator gets Veneer's ring through the `focus-ring` mixin. Cost: a new departure from the release, and it contradicts the partial's "ships the release's recorded surface" voice.
- **(c)** Exclude the indicators in the elements selector. Refused by guide § Styles: "A rule in the `elements` layer treats a tag by its name, never by where the markup puts that tag."

Recommend **(a)**.

**R5 — The showcase mode control** (`Showcase.ts` sets `className = SHOWCASE_CONTROL`, and `_shell.scss` `.control` adds only a border).
- **(i)** Hook it by a data attribute. The control stays bare, the page frames do not change, and the shell comment stays true.
- **(ii)** The shell paints its own padding and fill, which duplicates published values.
- **(iii)** Add the `btn` class. Refused by the design `Showcase.test.ts` states: "stays outside the `.btn` treatment the showcase exists to prove".

Recommend **(i)**. The unit settles the attribute's name.

**R6 — The ledger and the guide.** Rewrite the `### Additions` rows as selector-category rows under `button:not([class])`. Drop the four `#### reboot` `button` rows named in R2. Update the § Files row for `_button.scss`: "The release's reboot button rules on every button, and the calibrated surface and its states on a button no class claims, in the elements layer." Give the rule its § Styles paragraph, with one pointer from § Tailwind. No new gate: `collectAdditions` already attributes the elements layer to `reboot` through `LAYER_COMPONENTS` (`attributeSelector` in `tests/setupServer.ts`, around line 2052). Recommend.

**R7 — Which proofs change.** The nav and dropdown pairs close V9 as the finding names it. Add list-group: it has the same defect and the showcase already carries the Oak and Ash specimen. Add carousel under R4. Leave pagination without a proof, because the showcase shows no `button.page-link`. Recommend.

**R8 — Order against BCF.** Land before BCF regenerates the frames, so one successor lens round rules on the V9 frames: `Base export`, the disabled button menu items, `Ash`, the carousel control focus, and the close-control states. Recommend.

## Files the result makes false

- `guides/veneer.md`:
  - the `#### reboot` `button` rows (around lines 4552–4555);
  - the `### Additions` rows from `button { padding }` through `button:disabled` (around lines 5249–5262);
  - the § Files `_button.scss` row (around line 681).
  - Search: Grep `button` over the guide, and Grep `[Bb]are (button|control)`.
- `tests/conformance.test.ts`: the `'button:focus-visible @media (forced-colors: active)'` literal, which appears in the "emits one forced-colors block per selector…" case (around lines 336 and 346). Search: Grep `button:(hover|active|disabled|focus-visible)` over `tests/`.
- `tests/src/styles/components/close.test.ts` (around lines 72 and 111) and `tests/app/browser/integration.test.ts` (around line 1382, in the close-control capture case). Each carries a comment saying the close control has a transition from the bare button element. Search: Grep `[Bb]are button`.
- `app/browser/styles/_shell.scss` (the `.control` rule and its comment), `app/browser/Showcase.ts`, and `app/browser/constants.ts` (`SHOWCASE_CONTROL`). Without R5, `tests/app/browser/Showcase.test.ts` goes red as well: its mode-control affordance case compares the background colour across modes, and the user agent's button fill differs by mode. Search: Grep `SHOWCASE_CONTROL` over `app/` and `tests/`.
- **Capture frames:** the changed scenarios named in R8.
- **Search bound:** Grep `<button` over `app/browser/constants.ts` (the specimen set). Glob `node_modules/bootstrap/site/**` returned nothing, so the release's docs markup is not installed and cannot bound the set. I did not sweep `tests/**` for classed buttons that rely on the calibrated surface. The unit re-derives that set by running the styles, app, and conformance projects before editing.

## Exit criterion

BARE-BUTTON closes when all of the following hold on evidence:
- In the showcase, every component button form (including both states of the carousel indicators) resolves no bare-rule declaration that its own component rule does not write. Each disabled button form reads equal to its anchor form on opacity and font metrics. Each focused button form reads equal to its anchor form, or to its active sibling, on outline and shadow.
- The classless bare button keeps its calibrated values (the existing elements proof stays green).
- A classed consumer button resolves the release's reboot.
- The ledger, the additions table, and guide parity are green, and the rewritten guide sentences read true.
- The shell's affordance case is green.
- Every mutation log is retained.
- The changed frames are regenerated and ruled in the successor lens round, which BCF and VERIFY carry.

Sections this lane leaves empty: `Constraints`, `Refusals`, and `Measurements` belong to the objective lane. No measurement was supplied for this round. The one this design needs is the mode control's `background-color` in each mode with a class hook, from `tests/app/browser/Showcase.test.ts` "paints one affordance on the mode control in both modes".
