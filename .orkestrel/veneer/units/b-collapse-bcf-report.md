# BCF report — the disclosure family's capture fixes

Every row the brief assigns is closed in the owned files. The guide patch is returned rather than
applied. All scoped gates exit 0. At each variant, the capture fails only the portfolio case, and it
fails for the standing reasons the brief names. Nothing is committed.

I read the Orchestrator's page-frame note. Every state this unit adds is an element frame over the
live specimen, lifted to the document's start. `:hover` and `:focus` are read again after each shot.
This unit adds no call of the `page` method and converts no page frame. The `tests/setupBrowser.ts`
file is untouched.

## Rows

### V2 and V18: resting frames start with the pointer released

- **Probe reading.** The cause is the pointer. Inside the resting-key case, `applyTheme(DARK)`
  clicks the Dark mode control, which leaves the pointer where that control sat. Staging the shot
  moves the tester under that pointer, which does not move with it. The lifted copy then lands
  under the pointer.
  - At dark-390, unfixed, the `navbar-scroll` copy receives a `mouseover` on `Scroll depots` at the
    client point 296,134. After the shot, that link reads `rgba(255, 255, 255, 0.8)` against 0.65
    on its siblings. The `navbar-inverted` and `navbar-inverted-class` copies take the same point.
  - The light pass clicks nothing, so the light frames stay clean.
  - Evidence: the `.orkestrel/veneer/units/bcf-instruments/bcf-v2-probe.log.txt` file, with the per-scenario entries in the
    `bcf-v2-entered-unfixed-dark-390.json.txt` file.
  - The `applyTheme` function is in the off-limits `tests/setupBrowser.ts` file, so the fix sits in
    the journey.
- **A further finding from the same probe.** `releasePointer` on its own parks the pointer at the
  page origin. That point lands on the top-left element of each lifted copy. Examples are the
  `Base overview` link, the carousel's previous control, and the flush accordion's `Billing cycle`
  button. Evidence: the `bcf-v2-entered-fixed-dark-390.json.txt` file.
- **Change.** In the resting-key case of the `tests/app/browser/integration.test.ts` file, the
  journey calls `releasePointer()` after each mode switch. Each copy is lifted into a wrapper that
  carries the `pt-5` class, so the parked pointer rests on the padding, above the copy. The case
  also records every `mouseover` that reaches a copy during its shot, and asserts that none did.
  The frames are still shot on the specimen copy, so their extent is unchanged.
- **Red runs** (in the `bcf-mutations.log.txt` file). Each ran the resting case alone at dark-390
  with `CAPTURE=1`, and each reddened only that case:
  - `v2-unfixed`: both halves reverted.
  - `v2-release-only`: the padding reverted.
  - `v2-padding-only`: the release reverted. It lists every scenario whose copy the pointer entered.
- **Frames after the fix.** In the `navbar-scroll--dark-390.png`, `navbar-inverted--dark-1280.png`,
  and `navbar-inverted-class--dark-1280.png` frames, every resting link paints the idle grey.

### V3: `nav-tabs` holds its open menu

- **Change.**
  - The tab holding the menu moves ahead of the `Tabs details` tab and follows the active tab
    directly. Behind the `Tabs details` tab, the menu overran the specimen's end at 390.
  - The pane gains paragraphs, so it runs longer than the menu at 1280.
  - The TSDoc for `NAV_SPECIMENS` states both reasons.
- **Proof.** The `NavSection > keeps the open tab menu inside the specimen that holds it at a
  %i-pixel viewport` case, at 390 and 1280. It ran red at both widths before the fix, in the
  `bcf-red-sections.log.txt` file.
- **Mutations.** `v3-short-pane` reddens the 1280 case. `v3-menu-tab-third` reddens the 390 case.
- **Frames.** The `nav-tabs--*-1280.png` and `nav-tabs--*-390.png` frames hold the whole menu.

### V4: each open toggle carries `show`

- **Change.** In `DROPDOWN_SPECIMENS`, every shown specimen's toggle carries `show`, the ramp
  toggles included. The TSDoc states that the engine writes `show` on the toggle and on the menu
  together.
- **Proof.** The `DropdownSection > marks each toggle of a shown menu with the show class the menu
  carries` case. It ran red before the fix. The `v4-toggle-at-rest` mutation reddens it.
- **Frames.** In `dropdown-menu`, `dropdown-menu-end`, `dropup`, `dropend`, `dropstart`,
  `dropdown-center`, `dropup-center`, `dropdown-menu-inverted`, and `dropdown-align-sm` through
  `dropdown-align-xxl`, each toggle paints the `.btn.show` fill. `dropdown-menu--dark-390.png` is
  an example.

### V5: `dropdown-align-*` toggles fit their columns

- **Change.** The ramp labels change from `To the start from <step>` and `To the end from <step>` to
  `Start from <step>` and `End from <step>`. The columns stay `col-6`, and the TSDoc records the
  label choice.
- **Proof.** The `DropdownSection > fits each toggle inside the column that seats it at a %i-pixel
  viewport` case, at 390 and 1280. It checks each toggle against its column's content edge. It ran
  red at 390 before the fix. The `v5-long-labels` mutation reddens the 390 case.
- **Frames.** The `dropdown-align-*--*-390.png` frames show both toggles inside their columns.
  `dropdown-align-xxl--dark-390.png` is an example.

### V6: states that had no frame

- **Accordion, last item expanded.**
  - A specimen named `Accordion last expanded` is added to `ACCORDION_SPECIMENS`, and
    `ACCORDION_COPY` names it.
  - `CASCADE_KEYS` gets the row `accordion-last-expanded`. Its selector is
    `.accordion-item:last-of-type > .accordion-collapse.show`, and it reads the
    `border-bottom-left-radius` property.
  - Proof: the `AccordionSection > hands the outer bottom corners to the panel of an expanded last
    item and squares its button` case. It reads the button's bottom radius as 0 and the panel's as 6,
    against 5 and 6 on the collapsed base. It ran red before the fix. The
    `v6-accordion-last-collapsed` mutation reddens it.
  - Frames: `accordion-last-expanded--{light,dark}-{390,1280}.png`.
- **`nav-underline` hover and focus.**
  - `DRIVEN_KEYS` gets the rows `nav-underline-hover` and `nav-underline-focus`.
  - They are driven by the journey case `drives an underline link to hover and to focus on the
    lifted specimen, and photographs each state`. The live specimen is lifted to the document's
    start and put back afterwards.
  - The hover frame is shot over the specimen.
  - The focus frame is shot over the lifted wrapper, which carries the `p-2` class. An underline
    link sits flush with the specimen's start and top edges, so a frame over the specimen would crop
    the ring. The case reads that the ring's extent sits inside the frame on all four edges.
  - The case asserts that the hover and focus states still held after each shot.
  - Red run: `v6-underline-unregistered`, with the registry rows removed, reddens the case.
  - Frames: `nav-underline-hover--*.png` and `nav-underline-focus--*.png`, at each variant.
- **An open menu inside an expanded navbar.**
  - A specimen named `Navbar with open menu` is added to `NAVBAR_SPECIMENS`, and `NAVBAR_COPY` names
    it. It is a `navbar-expand` bar inside a card. Its open menu carries the `data-bs-popper="static"`
    attribute and hangs over the card body, which is the menu's room.
  - `CASCADE_KEYS` gets the row `navbar-with-open-menu`. Its selector is
    `.navbar-expand .navbar-nav:has(> .dropdown > .dropdown-menu.show)`, and it reads the
    `flex-direction` property. The row names the list rather than the menu, because a key read on the
    hanging menu would take the tooltip branch of the hanging-key check.
  - Proofs:
    - `NavbarSection > hangs an open menu out of flow from the row of an always-expanded bar`. The
      `v6-navbar-collapsed-bar` mutation reddens it.
    - `NavbarSection > keeps each open menu inside the specimen that holds it at a %i-pixel
      viewport`. The `v6-navbar-no-room` mutation reddens it at both widths.
  - The specimen makes false the assertion that every open menu sits in a collapsed bar, so that
    assertion is replaced.
  - Frames: `navbar-with-open-menu--*.png`, at each variant.

### V14: the `.dropdown-header` weight

- **Ruling.** The weight is a departure the guide already records, so no `#### dropdown` row is
  added.
  - Neither cascade's `.dropdown-header` rule declares a weight. Veneer's compiled rule is
    `.dropdown-header{padding…;font-size:var(--vn-size-2);color…;white-space:nowrap;margin-bottom:0;display:block}`.
  - The weight comes from the `h6` element. The ledger records it in the `reboot | h6 | font-weight`
    row, with the value `500` becoming `var(--vn-weight-heading)`.
- **Values.** The release resolves `500` and Veneer resolves `600`. The probe read the
  `h6.dropdown-header` element under `node_modules/bootstrap/dist/css/bootstrap.css` and in the
  Dropdown section: `{"veneer":"H6 600","bootstrap":"500"}`. Evidence: the
  `bcf-v14-weight.log.txt` file.
- **Why no row.** A `dropdown | .dropdown-header | font-weight` row planted in a scratch copy
  reddens the `cascade ledger > names no departure the compiled cascade no longer carries`
  conformance case as a stale row. Evidence: the `bcf-v14-ledger-planted.log.txt` file, with the
  unplanted baseline in `bcf-v14-ledger-baseline.log.txt`.
- **Patch.** The guide patch adds one sentence under § Dropdown classes that points the header
  weight at that `reboot` row.

### Accordion proof derivation (the ROADMAP § Carriers row)

- **Change.** The state and corner cases iterate `ACCORDION_SPECIMENS.map(({ name }) => …)`, and
  each expected entry is keyed by the specimen's name.
- **Red run.** `accordion-specimen-added` adds a specimen to the table and leaves the proof's list
  unchanged. It reddens the render-order, state, and corner cases.

## Case titles added (red before the fix)

- `AccordionSection > hands the outer bottom corners to the panel of an expanded last item and squares its button`
- `DropdownSection > marks each toggle of a shown menu with the show class the menu carries`
- `DropdownSection > fits each toggle inside the column that seats it at a %i-pixel viewport`
- `NavSection > keeps the open tab menu inside the specimen that holds it at a %i-pixel viewport`
- `NavbarSection > hangs an open menu out of flow from the row of an always-expanded bar`
- `NavbarSection > keeps each open menu inside the specimen that holds it at a %i-pixel viewport`
- `journey > drives an underline link to hover and to focus on the lifted specimen, and photographs each state`
- The resting-key journey case gains the assertion that the pointer entered no lifted copy.

**Red-before-fix run.** The `app/browser/constants.ts` file was held at `dc92a09`, with the tests
and registry written. Command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot
--project app:browser tests/app/browser/sections/AccordionSection.test.ts
tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts
tests/app/browser/sections/NavbarSection.test.ts tests/app/browser/Showcase.test.ts`.

- Result: exit 1, `Tests 10 failed | 16 passed (26)`, in the `bcf-red-sections.log.txt` file.
- The same command after the fix: exit 0, `Tests 26 passed (26)`.

## Gates

The gate commands ran from `.orkestrel/veneer/units/bcf-instruments/bcf-gates.sh` after the last source edit, and their log is
`.orkestrel/veneer/units/bcf-instruments/bcf-gates.log.txt`. That edit rewords the `NAV_SPECIMENS` remarks to name the menu tab by
its neighbour rather than by its place. It changes no markup and postdates the capture runs.

| Command | Exit | Result |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files | 0 | All matched files use the correct format. |
| `npm run lint:check` | 0 | — |
| `npm run check` | 0 | — |
| The criterion 2 section command (the red-before-fix command) | 0 | `Test Files 5 passed (5)`, `Tests 26 passed (26)` |
| `npm run test:setup` | 0 | `Test Files 4 passed (4)`, `Tests 287 passed (287)` |

**Criterion 4.** `npm run test:guides` ran in a scratch copy under `tmp/probe/` with
`bcf-shared.patch` applied. Result: exit 0, `Tests 19 passed (19)`, in `bcf-test-guides.log.txt`.
`git apply --check` accepts the patch against the worktree.

**Criterion 5.** `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache
--reporter=dot --project "journey:<variant>*"` ran once per variant, after the last markup edit. The
runner is `.orkestrel/veneer/units/bcf-instruments/bcf-capture.sh`, and the logs are `bcf-capture-<variant>.log.txt`.

| Variant | Exit | Result | Failing case, and reason |
| --- | --- | --- | --- |
| dark-390 | 1 | `Tests 1 failed \| 45 passed (46)` | Portfolio case: a blank `bottom-offcanvas--dark-390.png` region |
| light-390 | 1 | `Tests 1 failed \| 45 passed (46)` | Portfolio case: a blank `bottom-offcanvas--light-390.png` region |
| dark-1280 | 1 | `Tests 1 failed \| 45 passed (46)` | Portfolio case: `showcase--dark-1280.png` is over the decode ceiling |
| light-1280 | 1 | `Tests 1 failed \| 45 passed (46)` | Portfolio case: `showcase--light-1280.png` is over the decode ceiling |

- Each failure is the brief's standing condition, which the PAGE-FRAME unit carries. No other case
  fails.
- The scoped unit runs showed no timing failure.

## Frames written by this unit's scenarios

All frames are under `/home/user/veneer-bcf/tmp/capture/states/`, at each of `light-390`,
`dark-390`, `light-1280`, and `dark-1280`.

- **Added.**
  - `accordion-last-expanded--<variant>.png`: the last panel expanded, with the rounded outer bottom
    corners.
  - `navbar-with-open-menu--<variant>.png`: the expanded bar's menu hanging over the card body.
  - `nav-underline-hover--<variant>.png`: the hovered link's `currentcolor` underline.
  - `nav-underline-focus--<variant>.png`: the underline and the whole focus ring.
- **Changed.**
  - `navbar-scroll`, `navbar-inverted`, and `navbar-inverted-class`: resting links at the idle
    paint.
  - `nav-tabs`: the whole menu inside the frame.
  - `dropdown-menu`, `dropdown-menu-end`, `dropup`, `dropend`, `dropstart`, `dropdown-center`,
    `dropup-center`, `dropdown-menu-inverted`, and `dropdown-align-sm` through `dropdown-align-xxl`:
    the opened toggle fill. The align frames also show the shorter labels inside their columns.
- **Every resting frame.** Every resting frame is shot with the pointer off its copy. The
  resting-key case asserts this.

## Shared-file patch

The patch is `.orkestrel/veneer/units/bcf-shared.patch`, against `dc92a09`, and it touches only the
`guides/veneer.md` file. It edits these places:

- § Dropdown classes: the header-weight sentence (V14).
- § Navbar classes: the region sentence names the bar with an open menu and its room.
- § Accordion classes: the region sentence names the last-expanded group.
- § Tests: the element-frame paragraph states the pointer release and the padded lift.

I searched `guides/veneer.md` for each changed label and each added stem. The patterns and their hit
counts are in the `.orkestrel/veneer/units/bcf-instruments/bcf-guide-searches.txt` file. Hits outside the region sentences are
token-table rows and are not affected. No guide sentence names the old ramp labels, the tab order,
or a stem this unit adds.

## Owned files touched

- `app/browser/constants.ts`: the V3, V4, V5, and V6 specimen and copy changes, with their TSDoc.
- `tests/setup.ts`: the `Accordion last expanded` and `Navbar with open menu` subject members, the
  `accordion-last-expanded` and `navbar-with-open-menu` rows in `CASCADE_KEYS`, the
  `nav-underline-hover` and `nav-underline-focus` rows in `DRIVEN_KEYS`, and the `CASCADE_KEYS`
  TSDoc on the pointer and on the hanging menu's row.
- `tests/app/browser/integration.test.ts`: the pointer release, the padded lift, and the entered
  assertion in the resting-key case, plus the underline hover and focus case.
- `tests/app/browser/sections/AccordionSection.test.ts`: the derived names and the last-expanded
  case.
- `tests/app/browser/sections/DropdownSection.test.ts`: the toggle `show` case and the column-fit
  case.
- `tests/app/browser/sections/NavSection.test.ts`: the cascade import and the menu-room case.
- `tests/app/browser/sections/NavbarSection.test.ts`: the cascade import, the added specimen name,
  the replaced collapsed-bar-only assertion, and the expanded-bar and menu-room cases.

The `tests/setup.test.ts` and `tests/app/browser/Showcase.test.ts` files needed no change. Their
assertions derive from the tables.

Diffstat against `dc92a09`: 7 files changed, 511 insertions(+), 60 deletions(-).

## Records

The Orchestrator retained the records: the report, diff, status, and shared patch under `.orkestrel/veneer/units/`, and every other file under `.orkestrel/veneer/units/bcf-instruments/`:

- **Diff and status:** `bcf.diff`, `bcf-status.txt`, and `bcf-shared.patch`.
- **Mutations:** `bcf-mutations.log.txt`. The runner is `bcf-mutate.py`, and the full logs are
  `bcf-mutation-*.log.txt`.
- **V2 probe:** `bcf-v2-probe.log.txt` and `bcf-v2-entered-*.json.txt`. The instruments are
  retained as `bcf-probe-*.txt` and `bcf-probe.sh.txt`.
- **V14:** `bcf-v14-*.log.txt`.
- **Gates and capture:** `bcf-gates.sh`, `bcf-gates.log.txt`, `bcf-capture.sh`, and
  `bcf-capture-*.log.txt`.

The `tmp/probe/` directory holds nothing of this unit.

## Deviation state

No stop. I settled these choices within my scope:

- The specimen labels `Accordion last expanded` and `Navbar with open menu`. The latter avoids a stem
  that another subject's stem prefixes.
- The ramp labels `Start from <step>` and `End from <step>`.
- The added stems and case titles.
- Shooting the underline focus frame over the padded lifted wrapper rather than over the specimen,
  so the ring is not cropped.
- The `pt-5` lift in the resting case. The probe measured that the release alone parks the pointer
  on each copy's top-left element.
