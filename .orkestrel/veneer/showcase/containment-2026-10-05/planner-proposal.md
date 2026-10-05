# Showcase containment: planner proposal (subjective lane: shape, specimen craft, naming, guide voice)

I applied the coordinator's correction to the "Tailwind spellings compile" bullet. Candidates come from `TAILWIND_CLASSES`, and `app/browser/recipe.json` is owned and regenerated. My design adds no Tailwind spelling, so `TAILWIND_CLASSES`, `recipe.json`, and the census's declared-token set all stay as they are.

The design does not need a deviation stop. It does conflict with one tree contract that the brief did not name: option (a)'s "inline style for a progress width" (see Refusals and Tensions 1).

## Design

I recommend option (a), face-invariant markup. Within (a), I refuse the inline-style piece. The boundary is:

- **Where the 16 names stay.** They stay only in the two places that demonstrate them:
  - the Sizing matrix (`createShape` `size` template; its frame is already `overflow-hidden`);
  - the Position utilities section (`position-utilities.html`, which owns the `top`, `bottom`, `start`, `end`, and `translate` rows at `constants.ts:890-895`).
- **How those demonstrations change.** They keep the raw names. Each stage, or its padded wrapper, gets `overflow-hidden`, so Tailwind's reading clips inside the figure. Each caption states the reading under the layer.
- **Everywhere else.** The intent is spelled with names that both systems read the same way. Every rule below follows one principle: the container owns full width, and a fraction of the container is written as Bootstrap's grid column class of that fraction.

### Spelling rules

**S1. Fill the card body (the `w-100` wrappers, 195 tokens including the Tailwind section's 11).**
- **Which bodies.** A card body whose element children all carry `w-100` becomes a "stack body": `card-body vstack` plus its row gap (`row-gap-N` stays as is; `gap-N` becomes `row-gap-N`). Its children drop `w-100`.
- **Why it holds.** Bootstrap documents `vstack` children as full width. `vstack` is Bootstrap-only.
- **Mixed bodies.** Where some children carry `w-100` and some do not (for example `badge.html:46-61`), the body still becomes a stack body. Each maximal run of children without `w-100` moves into one `div` carrying the old body's flex classes minus `card-body` (for example `d-flex flex-wrap align-content-start align-items-start gap-2`).
- **Wrap bodies.** A body with no `w-100` child keeps its wrap classes.

**S2. Redundant `w-100` (delete it).** Delete `w-100` wherever the element already fills its container:
- on `.ratio`, which declares `width: 100%`;
- on a block-level child of a block container: `list-group.html:193` and `:201` inside a block `list-group-item`, and the `d-flex` containers of the factories' `container` and `item` templates inside a `td`;
- on any child of a stack body or of a stretch column (`vstack`, or `flex-column` without `align-items-*`).

**S3. A fraction of the container.** Map each width name to the grid column class of the same fraction: `w-25` to `col-3`, `w-50` to `col-6`, `w-75` to `col-9`, `w-100` to `col-12`.
- **Precedent.** Bootstrap documents grid column classes as widths outside a row (`components.md:709-724`).
- **Why it holds under every face.** The exclusion keeps `col-*` Bootstrap's under the layer (R2, `design-verdict.md:8`). Under `unexcluded`, Tailwind's `col-N` sets only `grid-column`, and none of these elements is a grid item.
- **Uses:**
  - progress bars;
  - `progress-stacked` segments;
  - `tables.html` `th.w-25`;
  - `text-truncation.html:32`;
  - carousel `img.d-block.w-100`, which becomes `d-block col-12`;
  - the factories' `wrap` and `margin` templates.

**S4. Placement on a percentage inset.** Spell each placement with zero offsets, which agree under every face, plus Bootstrap-only alignment:
- **Center a sized box on one axis:** use `start-0 end-0 mx-auto`, or `top-0 bottom-0 my-auto`. This applies to the tooltip and popover arrows, which have a definite width and height.
- **Center content over a box:** use `position-absolute top-0 start-0 bottom-0 end-0 d-flex align-items-center justify-content-center`. This applies to the DRAFT watermark.
- **Center a badge on a corner:** use a zero-size anchor `span.position-absolute.top-0.end-0` that holds `span.position-absolute.top-0.start-0.translate-middle.badge…`.
- **A transform that keeps its place:** use `offset-6 translate-middle-x` (margin 50%, translate -50%). The transform still makes the frame the containing block for fixed descendants.

**S5. Half-size overlapping panels (z-index).** Each panel is `position-absolute … col-6 z-N` and holds a `ratio ratio-21x9`, so its height is half the stage's.
- The centered panel is `bottom-0 end-0 translate-middle col-6`, which puts its center at the stage center.

**S6. Frozen offcanvas previews.**
- **Start and end panels.** A wrapper `position-absolute top-0 bottom-0 start-0 col-9` (or `end-0`) holds the panel. Bootstrap's own `max-width: 100%` caps the panel at the wrapper.
- **Top and bottom panels.** A wrapper `position-absolute top-0 start-0 end-0` (or `bottom-0`) holds a `ratio ratio-21x9`, which holds the panel. Bootstrap's own `max-height: 100%` caps it.
- **Backdrops.** They drop `w-100 h-100`. Their own `100vw` × `100vh` box is clipped by the preview frame's `overflow-hidden`.

`mw-100` (9 uses) is not shared and stays.

This answers Unknown 1. Every `tailwindcss` entry in `census-1.json` carries one of the 16 names or descends from an element that does: the `alerts` children, the `list-group` children, and the `visually-hidden` spans inside the badges. One entry has a different cause: the tooltips grid `row row-cols-2 g-4 w-100` reads `top: 7` under every face from `g-4`'s negative top margin (`census-1.json:13-16`, `:121-124`). Its side overflow at 390 px under `tailwindcss` does trace to `w-100`.

This answers Unknown 2, with a wider search than the brief's. Grep over `tests/` for the touched figure ids, `tooltip-arrow`, `popover-arrow`, `progress-bar`, `offcanvas-start`, `vstack`, and the card-body class string found no journey or statechart step that selects a touched specimen or reads its geometry. Hits come only from engine tests with their own markup (`tests/src/browser/Tip.test.ts`, `Offcanvas.test.ts`) and two fixtures in `tests/setupBrowser.ts` (`:5487`, `:6282`).

## Alternatives

- **(a) Face-invariant markup: recommended, with S1 to S6 as its spellings.** The objective decides it: every specimen must hold its geometry under all three faces with no counter. (a) is the only option that changes neither the face definitions nor the records.
- **Inline `style="width: N%"` for progress (part of (a) as written): refused.** The page's no-style contract and the skill's static-width rule foreclose it (see Refusals). `col-3`, `col-6`, `col-9`, and `col-12` give the same widths with classes alone.
- **(b) Face-aware rewrite: refused.** The faces are defined as "the same markup and differ only in the `style` elements" (`guides/veneer.md:2163-2164`). A rewrite would show markup under Tailwind that the `bootstrap` face never renders. It would also:
  - grow `TAILWIND_CLASSES` and regenerate `recipe.json`;
  - put fraction spellings outside the Tailwind section, which the section census forbids (`tests/app/browser/sections/integration.test.ts:61-64`);
  - add escaped selectors (`.w-1\/2`) to the census-limit list (`guides/veneer.md:2344-2354`).
- **(c) Hybrid, rewriting only the demonstrative specimens: refused.** Ruling 14 (`design-verdict.md:130`) wants those specimens to show Tailwind's reading. A rewrite erases exactly the reading they exist to show, and the hybrid carries all of (b)'s record cost.
- **(d) Size the stages for Tailwind's readings: refused.**
  - Tailwind's readings are fixed lengths (12.5rem, 25rem), and the stages are fractions of the card (410 px at 1280 px, about 290 px at 390 px), so no single stage size holds at both widths.
  - The 390 px overflows are wrappers, not stages: `alerts` has 20 and `list-group` 9 (`census-1.json:661-1024`).
  - A stage sized for 400 px leaves the `bootstrap` face's percentage geometry different from the layer face's, so it fails the objective.
- **A static Tailwind-section specimen pairing `w-50` with `w-1/2` (not in the decision space; deferred).** `documentation.md` favors it because it would execute the guide's `w-full` advice at `guides/veneer.md:1324`. It costs a `TAILWIND_CLASSES` entry, a regenerated `recipe.json`, a `TAILWIND_READINGS` row whose width reading depends on the viewport, and a census-limit change. I leave it to the Orchestrator (Tensions 8).

## Constraints

- **No `style` attribute.**
  - Guide: `guides/veneer.md:2084-2085` ("its markup carries no stylesheet of its own and no `style` attribute").
  - Pinned by `tests/app/browser/sections/integration.test.ts:65`, `tests/app/browser/factories.test.ts:904`, and the `extractStyles` reading at `tests/app/browser/integration.test.ts:1085`.
- **Same markup on every face.** The faces render the same markup (`guides/veneer.md:2163-2164`; `app/browser/Showcase.ts:14-20`).
- **Page census.** The page's class tokens equal the registry, `TAILWIND_CLASSES`, and the icon tokens (`tests/app/browser/integration.test.ts:1053-1072`). Each section shows every name it owns (`sections/integration.test.ts:59`). `TAILWIND_CLASSES` is admitted only in the Tailwind section (`:61-64`).
- **Chrome replaced names.** The chrome case refuses `w-100` and `gap-3` on a card body (`sections/integration.test.ts:229-259`). A stack body passes it.
- **Position names.** The position rows carry no template (`app/browser/constants.ts:890-895`), so the position names live only in `position-utilities.html`. Ruling 14 names a "position matrix" that does not exist (`design-verdict.md:130`).
- **Sizing matrix.** The rows `constants.ts:902-943` render through the `size` shape, whose frame is `overflow-hidden` (`app/browser/factories.ts:245-258`).
- **Wrap template.** The `wrap` shape serves `flex-nowrap` (`constants.ts:821-825`; `factories.ts:161-174`). `col-6` alone sets `flex-shrink: 0` and would overflow under `nowrap`, so the wrap items write `col-6 flex-shrink-1`.
- **Bootstrap's own patterns.** Placeholders are sized by `col-*` (`.agents/skills/enterprise-bootstrap/references/components.md:709-724`). Progress width belongs to a host script only for dynamic progress (`components.md:755`).
- **Settled partition.** R1 refuses a counter (`design-verdict.md:7`); the chrome paragraph is at `:79`, ruling 4 at `:120`, ruling 8 at `:124`, and ruling 14 at `:130`. The composition table reads `w-100` as `400px` at 640 px (`guides/veneer.md:1300`), and the ruling-4 prose is at `:1321-1324` and `:1329`.
- **Test placement.**
  - Instruments go in `tests/setupBrowser.ts`, with a control from outside the population (`.claude/rules/tests.md:139`, `:190`).
  - A selector over a population with no role is declared in the setup module with its reason (`.agents/skills/orkestrel-journey/SKILL.md:60-62`).
  - A per-variant case uses the `it.skipIf(VARIANT !== …)` pattern (`tests/app/browser/integration.test.ts:1440-1447`), over the variants `light-1280`, `dark-1280`, `light-390`, and `dark-390` (`configs/app/vite.journey.config.ts:11-14`).
- **Installed primitives.** `clipsOverflow` and `isRendered` (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:477`, `:1636`) do the clipping and hidden filters. No local helper may duplicate them.

## Refusals

- **Inline progress width.** Refused by `guides/veneer.md:2084-2085`: "its markup carries no stylesheet of its own and no `style` attribute". Also by `components.md:755`: "Keep all other widths in shipped utilities or the project stylesheet."
- **A counter on a shared name** (any CSS that restores 50% under the layer). Refused by `design-verdict.md:7`: "The counter mechanism is refused on measurement."
- **Option (b).** Refused by `guides/veneer.md:2163-2164`: "The three faces render the same markup and differ only in the `style` elements the document holds."
- **Tailwind spellings outside the Tailwind section.** Refused by `sections/integration.test.ts:61-64`, which admits `TAILWIND_CLASSES` only when `section.id === TAILWIND_SECTION`.
- **Writing the 16 names into a section that does not own them as a fix.** Refused by the R1 partition plus `.claude/rules/styles.md:46`: "Verify every treatment against the shipped resolved cascade". Under the layer, those names resolve to Tailwind's lengths.

## Measurements

**Supplied:**
- `census-1.json`, read at the lines cited: at 1280 px, `bootstrap` and `unexcluded` 1 and `tailwindcss` 13; at 390 px, 13, 13, and 46. The z-index panel reads 205 × 87.84 px in a 410 × 175.70 px stage (`census-1.json:22-43`).
- `containment-fractions-1`.
- `percentage-uses.txt`.

**Missing** (all through the host queue):
- the candidate's census at both widths and all faces, with the target that each face's list equals the `bootstrap` list;
- the candidate's z-index panels, with the target 205 × 87.84 px under every face at 1280 px;
- card-body content widths at 1280 px and 390 px, needed to confirm the span case fails on 2026-10-05 (expected: 400 px against about 410 px at 1280 px);
- `offcanvas-bottom` preview fill at 1280 × 800 and 390 × 844, with the target of no gap under the panel;
- Tailwind's compiled `col-N` rule, read from the `unexcluded` field of `recipe.json` (expected: `grid-column` only);
- whether `flex-shrink-1` is shared; it reads `flex-shrink: 1` under both systems in either case;
- the set of shared names whose built `./bootstrap` rule declares a percentage (expected: exactly the 16);
- light-mode containment;
- `test:journey` wall time (an observation only; this unit claims no timing).

## Units

The order is U1 through U6, serial, with one writer per checkout in a worktree under `/home/user/.wave/`. The units land after the journey-cost unit's acceptance. Every Chromium command runs through `flock -x /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts …`.

### U1 containment-proofs (`astra`, GPT-6 Astra)

**Owned files:**
- `tests/setupBrowser.ts`
- `tests/setupBrowser.test.ts`
- `tests/app/browser/integration.test.ts` (the added case only)
- `tests/app/browser/Showcase.test.ts` (the added case only)
- `tests/app/browser/sections/integration.test.ts` (the added case only)

**Dependencies:** none.

**Work:**
1. **`PERCENTAGE_NAMES` constant.** Add it to `tests/setupBrowser.ts`, listing the 16 names.
2. **`collectOverflows(root: ParentNode)` instrument.** For each `figure.card`, report each descendant whose border box leaves the figure's border box by more than 1 px on any edge. Skip an element when it is `position: fixed`, when `isRendered` is false, or when an ancestor between it and the figure answers `clipsOverflow`. Return readonly records `{ figure, index, edges }`:
   - `figure` is the `aria-labelledby` value, or `SECTION#N` when it is absent;
   - `index` is the element's position in `figure.querySelectorAll('*')`;
   - `edges` is a sorted list of edge names.
   Declare the `figure.card` selector beside the instrument with its reason: the population carries no role.
3. **`collectSpans(root: ParentNode)` instrument.** Return the `{ figure, index }` of every unclipped, rendered element whose width is within 1 px of its nearest `.card-body` content width.
4. **Instrument proofs in `setupBrowser.test.ts`.** Prove each instrument with a planted overflowing child, a clipped child, a fixed child, and a hidden child as controls.
5. **Journey case `keeps every specimen inside its figure under every face at both widths`.** Run it with `it.skipIf(VARIANT !== 'dark-1280')`. Comment: "The containment ruling reads the user's dark screenshots; this case reads both widths itself." For each width (1280, 390), call `buildJourney({ ...OWN, width }, true)`, read `collectOverflows(document.body)` under each face through `applyFace`, and require the `unexcluded` and `tailwindcss` lists to equal the `bootstrap` list.
6. **Journey case `spans the card body under every face wherever the bootstrap face spans it`.** Same variant and loop. Every member of the `bootstrap` face's `collectSpans` must read spanning under the other two faces.
7. **Showcase case `holds each z-index panel at half its stage under every face`.** In `Showcase.test.ts`, for each face, the three `#z-index-stack` panels read width and height equal to half the stage's within 1 px, and the `z-2` panel's center equals the stage center within 1 px. Locate the panels through a selector declared in `tests/setupBrowser.ts`.
8. **Section case `spells the percentage names only in the sizing matrix and the position section`.**
   - Every element carrying a `PERCENTAGE_NAMES` member sits in the `sizing` or `position-utilities` section.
   - Guard: `PERCENTAGE_NAMES` equals the `comparison.json` `shared` names whose rule in `dist/src/bootstrap/index.css` declares a percentage value.
   - Control: plant `w-100` on an alert.

**Acceptance, cheapest first:**
1. `npx vitest run --config vite.config.ts --project setup:browser tests/setupBrowser.test.ts` is green.
2. `npm run check` is green.
3. On the 2026-10-05 tree, each of the four added cases fails and the run records the command and failing count. The section case and the Showcase case run directly; the two journey cases run through the queue, filtered to the `dark-1280` project by `-t`.
4. The existing census case `reads resolved values, Tailwind readings, the census, and contrast under its declared variant` stays green.

### U2 stack-bodies (`builder`, Sonnet)

**Owned files:** every `app/browser/sections/*.html` that U3 does not own, which includes `tailwindcss.html`.

**Dependencies:** U1.

**Work:** apply S1 and S2 mechanically, and edit nothing else.

**Acceptance, cheapest first:**
1. `rg -n '\b(w|h)-(25|50|75|100)\b|\b(top|bottom|start|end)-(50|100)\b' app/browser/sections` reports no hit in the owned files.
2. `npx vitest run --config vite.config.ts --project app:browser tests/app/browser/sections/integration.test.ts` is green, including `keeps chrome classes off every replaced name`.
3. `npm run format:check` is green on the owned files.

### U3 specimen-structure (`builder`, Sonnet; every spelling is fixed here, so the unit carries no taste load)

**Owned files:** `badge.html`, `carousel.html`, `engine-states.html`, `list-group.html`, `modal.html`, `offcanvas.html`, `popovers.html`, `position-helpers.html`, `position-utilities.html`, `progress.html`, `tables.html`, `text-truncation.html`, `tooltips.html`, and `z-index.html`, all under `app/browser/sections/`.

**Dependencies:** U2.

**Work:** apply S1 and S2 in these files, then the following per file.

- **`z-index.html:5-21`.**
  - The stage becomes `ratio ratio-21x9` (drop `w-100`).
  - Panel z-3: `div.position-absolute.top-0.start-0.col-6.z-3 > div.ratio.ratio-21x9 > div` carrying `d-flex align-items-end justify-content-end p-2 border border-primary-subtle rounded bg-primary-subtle text-primary-emphasis small fw-semibold` and the text `z-3`.
  - Panel z-2: `position-absolute bottom-0 end-0 translate-middle col-6 z-2`, success tones.
  - Panel z-1: `position-absolute bottom-0 end-0 col-6 z-1`, warning tones.
  - Watermark (`:42`): `position-absolute top-0 start-0 bottom-0 end-0 d-flex align-items-center justify-content-center z-n1 display-1 fw-bold text-body-tertiary opacity-50`.
  - Captions are unchanged.
- **`badge.html:30-33`.**
  - Wrap the counter in `<span class="position-absolute top-0 end-0">`. The badge becomes `position-absolute top-0 start-0 translate-middle badge rounded-pill text-bg-danger`.
  - The caption code becomes `badge rounded-pill position-absolute top-0 end-0 start-0 translate-middle`.
  - Add the caption line: "A zero-size anchor at `top-0` and `end-0` marks the button's corner, and `translate-middle` centers the badge on it under every face; the Position utilities section shows Bootstrap's `start-100` spelling."
- **`tooltips.html` and `popovers.html` arrows.**
  - `start-50 translate-middle-x` becomes `start-0 end-0 mx-auto`.
  - `top-50 translate-middle-y` becomes `top-0 bottom-0 my-auto`.
- **`progress.html`.**
  - Bars: `w-25`, `w-50`, `w-75`, `w-100` become `col-3`, `col-6`, `col-9`, `col-12`.
  - Stacked segments: `progress w-25` becomes `progress col-3`.
  - Caption code at `:52` becomes `progress progress-bar col-3 col-6 col-9 col-12`. The sentence becomes: "Grid column classes set each bar in quarter steps, so no style attribute is needed, and each bar reads the same width under every face."
  - Caption code at `:226` becomes `progress-stacked progress col-3 progress-bar`.
- **`tables.html:242-282`.** `th.w-25` becomes `th.col-3`.
- **`text-truncation.html:32`.** `w-75` becomes `col-9`, and the caption code becomes `d-inline-block text-truncate col-9`.
- **`carousel.html`.** Every `d-block w-100` image becomes `d-block col-12`.
- **`list-group.html:193`, `:201`.** Drop `w-100`.
- **`modal.html:201`, `:246`, and the `offcanvas.html` backdrops.** Drop `w-100 h-100`.
- **`offcanvas.html:168`, `:217` and `engine-states.html:136`, `:172` (start and end panels).**
  - Wrap the panel in `div.position-absolute.top-0.bottom-0.start-0.col-9` (use `end-0` for the end panel) and drop `w-75`.
  - The caption at `:193` becomes: "A `position-absolute` wrapper with `col-9` holds the panel to three quarters of this frame, because the panel's own maximum width follows its container; `showing` holds it open, where `show` would let the engine open it over the page."
- **`offcanvas.html:263`, `:303` (top and bottom panels).**
  - Wrap the panel in `div.position-absolute.top-0.start-0.end-0 > div.ratio.ratio-21x9` (use `bottom-0` for the bottom panel) and drop `h-50`.
  - The caption at `:281` becomes: "A `ratio-21x9` wrapper holds the panel height inside this frame, because the panel's own maximum height follows its container."
- **`position-helpers.html:10-16`.**
  - The frame child becomes `offset-6 translate-middle-x d-flex align-items-center justify-content-center`, and the text `div` keeps only `small`.
  - The caption at `:29-30` becomes: "The frame's `translate-middle-x` transform, which `offset-6` moves back into place, makes it the containing block, so the bars pin to the frame instead of the window."
- **`position-utilities.html`.**
  - Arrange stage at `:9` and axis stage at `:94`: add `overflow-hidden`.
  - Center wrapper at `:39` and outside wrapper at `:136`: add `overflow-hidden`. The center wrapper's `p-2` becomes `p-3`.
  - Badge wrapper at `:168`: add `overflow-hidden`.
  - Fixed figure at `:257-258`: `start-50` becomes `offset-6`; the `d-flex align-items-center justify-content-center` classes move onto the frame child; the text `div` keeps `small`. The caption at `:271-272` reads like `position-helpers`, with "the badge" in place of "the bars".
  - Caption sentences to add, in the form the tables wrappers caption uses:
    - Arrange: "With the layer, `top-50`, `bottom-50`, `start-50`, and `end-50` read Tailwind's `12.5rem` spacing multiple, so those markers sit 200 px from their edges and the frame clips them."
    - Center: "With the layer, the `-50` offsets read `12.5rem` and the `-100` offsets `25rem`, so most dots leave the frame and the frame clips them."
    - Axis: "With the layer, `top-50` and `start-50` read `12.5rem`, so the centered squares move and the frame clips them."
    - Outside: "With the layer, `bottom-100` and `end-100` read `25rem`, so both squares leave the frame and the frame clips them."
    - Badge: "With the layer, `start-100` reads `25rem`, so the badge leaves the button and the frame clips it."

**Acceptance, cheapest first:**
1. The same `rg` returns hits only in `position-utilities.html`, in class attributes and in caption `<code>` text.
2. The sections file is green.
3. `npm run test:app:browser` is green.
4. `npm run format:check` is green.

### U4 factory-shapes (`builder`, Sonnet)

**Owned files:** `app/browser/factories.ts`, `tests/app/browser/factories.test.ts`.

**Dependencies:** U3.

**Work:**
- `factories.ts:145` and `:183`: drop `w-100`.
- `:170`: the wrap items become `col-6 flex-shrink-1 border bg-body-tertiary small`.
- `:261`: the margin box becomes `bg-body col-9 ${name} p-2`.
- In `gives wrapping flex specimens separate lines and free cross-axis space`, keep the `w-25` host, because it adopts `./bootstrap` alone (`factories.test.ts:2`). Add one assertion: the `flex-nowrap` shape keeps all four items inside its container. This is the control for a dropped `flex-shrink-1`.
- Update the TSDoc example only if it names a changed class.

**Acceptance:**
1. The touched test file is green.
2. `npm run test:app:browser` is green.
3. `npm run check` is green.

### U5 containment-prose (`opus`)

**Owned files:** `guides/veneer.md` (§ Showcase and its subsections only), `ROADMAP.md`.

**Dependencies:** U4.

**Work:** apply the guide sentences in Tensions-independent form, as given in the following "Guide changes" subsection. Add a `ROADMAP.md` row beside `:144`: "Showcase containment (2026-10-05): specimen markup keeps one geometry under the three faces; the percentage names stay in the Sizing matrix and the Position utilities section, whose frames clip."

**Acceptance:**
1. `npm run test:guides` is green.
2. `npm run test:policy` is green.
3. Every backticked case title resolves to a test title.

### U6 gates and rebuild (`verifier`)

**Dependencies:** U5.

**Gates, read bare:**
1. `format:check`
2. `lint:check`
3. `check`
4. `build`
5. `test:app:browser`
6. `test:setup:browser`
7. `test:guides`
8. `test:policy`
9. one `test:journey` through the queue
10. `build:showcase`, then commit the whole `showcase/browser.html` file

**Reading:** rerun `node /home/user/veneer/tmp/units/containment/census.ts` through the queue into a `containment-census-2` folder.
- Acceptance: every face's overflow list equals the `bootstrap` face's at both widths.
- Acceptance: the z-index panel reads 205 × 87.84 px under all three faces at 1280 px.

### Proofs that fail on 2026-10-05 and pass on the candidate

- **`keeps every specimen inside its figure under every face at both widths`.** On 2026-10-05, `tailwindcss` reads 13 entries against `bootstrap`'s 1 at 1280 px, and 46 against 13 at 390 px.
- **`spans the card body under every face wherever the bootstrap face spans it`.** On 2026-10-05, a `w-100` wrapper reads 400 px against a card body of about 410 px at 1280 px. The card-body widths are not yet measured.
- **`holds each z-index panel at half its stage under every face`.** On 2026-10-05 the panels read 200 × 200 px against a 400 × 171 px stage.
- **`spells the percentage names only in the sizing matrix and the position section`.** On 2026-10-05, `alerts.html:6` carries `w-100`.
- **Guard: `reads resolved values, Tailwind readings, the census, and contrast under its declared variant`.** It passes on both trees and keeps every registry name under every face.

### Guide changes (U5)

**§ Showcase, after `:2102`, a new paragraph:** "A card body whose specimens each fill its width carries the `vstack` class and a `row-gap-*` class, and those specimens carry no width class, because a `vstack` child takes the full width under every face; a card body whose specimens sit side by side keeps the `d-flex` and `flex-wrap` classes."

**A new subsection `### Specimen geometry`, after § Faces (before § Class coverage).**

Opening paragraph:

"Every specimen holds the geometry the `bootstrap` face gives it under the other two faces. Tailwind defines Bootstrap's percentage names `w-25`, `w-50`, `w-75`, `w-100`, `h-25`, `h-50`, `h-75`, `h-100`, `top-50`, `top-100`, `bottom-50`, `bottom-100`, `start-50`, `start-100`, `end-50`, and `end-100` as spacing multiples, so under the `tailwindcss` face the `w-100` class reads `400px`, as the composition table in the Tailwind compatibility sheet section states. The page writes those names only in the Sizing matrix and the Position utilities section, which demonstrate them: their frames clip, so a marker that Tailwind's reading moves stays inside its figure, and each caption states the reading under the layer. Elsewhere the page spells each intent with names both systems read alike, as the following table states:"

| Intent | Spelling | Specimen |
| --- | --- | --- |
| Fill the card body | a `vstack` card body and no width class | Alerts |
| A fraction of the container | `col-3`, `col-6`, `col-9`, or `col-12` | Values with labels, the carousels |
| Center a sized box on one axis | `start-0 end-0 mx-auto`, or `top-0 bottom-0 my-auto` | Tooltip and popover arrows |
| Center content over a box | `top-0 start-0 bottom-0 end-0` with `d-flex align-items-center justify-content-center` | Layer below the content |
| Center a badge on a corner | a `top-0 end-0` anchor holding a `top-0 start-0 translate-middle` badge | Counters on buttons |
| A transform that keeps its place | `offset-6 translate-middle-x` | Fixed top and bottom |
| Hold a frozen panel inside its frame | a positioned wrapper sized by `col-9` or by a `ratio-21x9` box | The offcanvas previews |

Closing paragraph:

"Bootstrap documents the grid column classes as widths outside a row for placeholders, and the exclusion keeps them Bootstrap's under the recipe, so a page of your own can write `col-12` where Bootstrap markup must read the same width with and without Tailwind. The `keeps every specimen inside its figure under every face at both widths` case reads, in the dark color mode at 1280 px and 390 px, every figure descendant whose box leaves its figure by more than 1 px outside a clipping ancestor, and requires each face's list to equal the `bootstrap` face's, which holds the Typography description lists at 390 px and the Tooltips placement grid's top gutter; the `spans the card body under every face wherever the bootstrap face spans it` case reads each element that fills its card body under the `bootstrap` face filling it under the other two; see the [browser journeys](../tests/app/browser/integration.test.ts). The `holds each z-index panel at half its stage under every face` case reads the Index over source order panels; see the [Showcase proofs](../tests/app/browser/Showcase.test.ts). The `spells the percentage names only in the sizing matrix and the position section` case refuses those names in any other section; see the [section proofs](../tests/app/browser/sections/integration.test.ts)."

**§ Faces:** no sentence changes.

**The ruling-4 sentence at `guides/veneer.md:1321-1322`:** it survives unchanged as a statement about a consumer's markup. It sits outside the owned sections.

### Amendment text (report-only; the Orchestrator applies it in scaffold)

- **Ruling 8 (`design-verdict.md:124`):** "Chrome: replace `h-100`, card-body `w-100`, `gap-3`, `rounded`, `border` with Bootstrap-only names; a card body whose specimens each fill its width is `card-body vstack` with a `row-gap-*` class, and those specimens carry no width class; accept Tailwind's scale on the remaining chrome spacing (2026-10-05, `showcase-containment`)."
- **Ruling 14 (`:130`):** "Percentage shared names (`w-25`, `top-50`, `start-100`) read Tailwind's spacing multiples under the layer (R1); the Sizing matrix and the Position utilities section carry them, clip their frames so the reading stays inside the figure, and state it in their captions, and the guide states it. Every other specimen spells a fraction of its container with a grid column class (`col-3`, `col-6`, `col-9`, `col-12`), a `vstack` body, or zero offsets, and holds the same geometry under the three faces (2026-10-05, `showcase-containment`)."
- **Chrome paragraph (`:79`):** replace "`w-100` inside specimen markup stays and reads Tailwind's value." with "Specimen markup carries none of the 16 percentage names outside the Sizing matrix and the Position utilities section (§ 10 item 14)."
- **Ruling 4 (`:120`):** it survives. Append: "This governs a consumer's markup; the showcase spells its own markup face-invariantly (§ 10 item 14)."

## Tensions

1. **`col-*` as a width outside a row versus inline style.** I rule for `col-*`, on Bootstrap's placeholder precedent and the page's no-style contract. The objective lane might prefer Bootstrap's literal `style="width: 25%"`, which needs the guide sentence at `:2084` and three pinned proofs amended. The Orchestrator rules.
2. **Clipped demonstrations.** Under the layer face, the Position utilities specimens show markers clipped away. That reading is ruling 14's intent, but the user might still read it as weird. The cure is fraction twins, which cost `TAILWIND_CLASSES` growth and a `recipe.json` regeneration.
3. **Badge markup.** The Badge section's counter departs from Bootstrap's documented `start-100` markup (it adds an anchor). Bootstrap's own spelling stays in the Position utilities section.
4. **Pre-existing overflows.** Equality to the `bootstrap` face accepts the two pre-existing overflows (Typography at 390 px, the Tooltips gutter) without an exemption list.
5. **Ruling 14's wording.** It names a "position matrix" that does not exist (`constants.ts:890-895`). The amendment text names the section instead.
6. **Brief versus contract.** The brief's option (a) text includes the inline style, which the tree forbids. I recorded this instead of stopping.
7. **Light mode.** The containment proof reads dark mode only, which mirrors the screenshots. Light mode is unread.
8. **The `w-1/2` specimen.** I deferred the Tailwind-section `w-1/2` specimen; the Orchestrator rules whether to add it.

## Risks

- **Bottom offcanvas preview.** It leaves a gap under the panel wherever `30vh` falls short of the `ratio-21x9` wrapper's height. That does not happen at 1280 × 800 or 390 × 844; untested viewports might show it.
- **Specificity of `.ratio > *`.** The top and bottom previews rely on `.ratio > *` losing on height to `.offcanvas.offcanvas-top` (0,2,0) and winning on position. `position-absolute` stays on the panel as insurance. U3's census rerun reads it.
- **`col-*` flex side effect.** `col-*` adds `flex: 0 0 auto`. Any converted element inside a `nowrap` flex row stops shrinking. The `wrap` template is covered by `flex-shrink-1` and U4's assertion; the U6 census catches the rest.
- **Stack-body geometry.** A `.row` inside a stack body stretches to the card body width plus its gutter. This is Bootstrap's normal row geometry, and it changes the `bootstrap` face's own boxes. Equality across faces still holds.
- **Span case and the Tailwind section.** If a Tailwind-section reading changes a spanning width by design, the span case reports it. The fix is a declared, reasoned exemption in `tests/setupBrowser.ts`, never a weaker case.
- **Journey wall time.** The two journey cases add to `test:journey` wall time. I claim no figure; the Orchestrator reads it under the journey-cost rules.
- **Guard derivation.** If the derived percentage-name set differs from the 16, U1's guard fails first. That is a finding to report, not something to patch.

