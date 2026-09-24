# BCF round 2 report — derived populations, one containment helper, a bound ring check, the hanging-menu name

Every item the successor brief assigns, B-a to B-f, is closed in the owned files. The guide patch is
returned, not applied. Every gate the acceptance criteria name exits 0, and each red run is in the
`.orkestrel/veneer/units/bcf-instruments/bcf-mutations-2.log.txt` file, with the whole runner output beside it. Nothing is
committed.

The merged head `f4e5693` left no round-1 case red. Before any edit, the section command in the
Gates section exited 0 with `Tests 26 passed (26)` (the `bcf-2-baseline-sections.log.txt` file).

## B-a: derived populations

- **The panel-corner case in the `AccordionSection.test.ts` file.** The case "hands the outer bottom
  corners to the panel of an expanded last item and squares its button" derives its population from
  the `ACCORDION_SPECIMENS` table. It filters to the ordinary groups, the specimens whose markup
  carries no `accordion-flush` class, and keys each expected reading by the specimen's name.
  - Before: `['Accordion base', 'Accordion last expanded'].map((name) => …)`.
  - After: `ACCORDION_SPECIMENS.filter(({ markup }) => !markup.includes('accordion-flush')).map(({ name }) => …)`.
  - Red run `accordion-ordinary-added`: an ordinary specimen named `Accordion spare` is added to the
    table alone. It reddens this case and the render-order, state, and group-corner cases, with
    `Tests 4 failed | 22 passed (26)`.
- **The selector case in the `DropdownSection.test.ts` file.** The case "sets every state in markup
  and announces each toggle as its menu stands" reads every name the partial writes a rule for. Its
  population is the breakpoints, not the specimens, so it iterates the `BREAKPOINT_INFIXES` constant
  that the `tests/setupStyles.ts` file exports.
  - Before: `...['sm', 'md', 'lg', 'xl', 'xxl'].flatMap(…)`.
  - After: `...BREAKPOINT_INFIXES.flatMap(…)`.
  - Red run `dropdown-infix-added`: an infix is added at the use site, as
    `[...BREAKPOINT_INFIXES, 'xxxl']`. The `tests/setupStyles.ts` file is not owned, so the added row
    goes in at the case. It reddens only this case, with `Tests 1 failed | 25 passed (26)`.
- **The fit case and the menu-containment case in the `DropdownSection.test.ts` file.** Their
  population is the ramp specimens, so each derives it from the `DROPDOWN_SPECIMENS` rows whose name
  opens with `Dropdown align `. The fit case attributes each seated toggle to its specimen through the
  `data-specimen` attribute.
  - Fit case, before: every literal step expected `seated.filter((name) => name.endsWith(` ${step}`))`
    to have length 2.
  - Fit case, after: every ramp specimen expects `{ name, seated: 2 }`.
  - Containment case, before: every literal step expected a pair of menus under
    `Dropdown align ${step}`.
  - Containment case, after: every ramp specimen expects `{ name, menus: 2 }`.
  - Red run `dropdown-ramp-row-added`: a row named `Dropdown align huge` is added to the table, with
    one unseated toggle and one shown menu. It reddens the fit case and the containment case at the
    390 and 1280 widths. The fit case reads `seated: 0` against 2, and the containment case reads
    `menus: 1` against 2. The render-order case reddens as well, with
    `Tests 5 failed | 21 passed (26)`.

## B-b: the "first pixel" sentence

The `bcf-shared-2.patch` file leaves the "first pixel" sentence as PAGE-FRAME wrote it on the merged
head, and it rewraps none of PAGE-FRAME's lines. BCF's own sentence is appended after the paragraph's
final line, as B-e (d) states.

## B-c: one containment helper

- **The `readMenuContainment` helper.** It is added to the `tests/setupBrowser.ts` file, with its
  TSDoc and a `MenuContainment` result interface.
  - Signature: `readMenuContainment(root: ParentNode, width: number): Promise<MenuContainment>`.
  - It returns a `measured` list (the specimen label of each shown menu) and an `escaped` list (the
    label of each shown menu that reaches past its specimen's box or paints no box).
  - It visits the width through the `visitBreakpoint` function, and throws when the viewport does not
    reach that width.
  - Nothing else in the file changes.
- **The sections.** The `DropdownSection.test.ts`, `NavSection.test.ts`, and `NavbarSection.test.ts`
  files each call the helper in place of their copied loop, and each asserts the `measured` list and
  the `escaped` list.
- **The helper's case.** The case "reads each shown menu against the specimen holding it, at the width
  it visits, and restores the viewport" sits in the `menu containment` block of the
  `tests/setupBrowser.test.ts` file. Its fixture has a held menu, a closed menu, a spilled menu, and
  an unrendered menu. The export-set case in that file also lists the helper's name.
  - Red run `helper-menu-spilled`: the held menu moves past its specimen's edge. Only the helper's
    case reddens, with `Tests 1 failed | 74 passed (75)`.
  - Red run `helper-empty-population`: every `show` class is removed. Only the helper's case
    reddens, with `Tests 1 failed | 74 passed (75)`.

## B-d: the hanging-menu name

- **Rename.** The `Navbar with open menu` label becomes `Navbar hanging menu`, with the stem
  `navbar-hanging-menu`. It changes in these places:
  - the `NAVBAR_SPECIMENS` table;
  - the `CaptureSubject` union, and the `CASCADE_KEYS` row's `scenario` and `subject` fields, in the
    `tests/setup.ts` file;
  - the render-order list in the `NavbarSection.test.ts` file;
  - the bar's accessible name, which changes from `Open menu bar` to `Hanging menu bar`.
- **Case titles and prose.** No case title carried the old label. The case title "hangs an open menu
  out of flow from the row of an always-expanded bar" and every prose site already say the menu
  hangs: the `NAVBAR_COPY` paragraph, the `NAVBAR_SPECIMENS` TSDoc, and the guide patch.
- **Prefix search.** The search matched every registered scenario stem and every `CaptureSubject`
  stem in the `tests/setup.ts` file against the stem `navbar-hanging-menu`. It found no proper
  prefix. As a control, the same search for the stem `navbar-expanded-hover` returns
  `navbar-expanded`. Evidence: the `bcf-2-stem-prefix.log.txt` file.
- **Frames.** The `navbar-with-open-menu--*.png` frames under the `tmp/capture/states` directory
  predate the rename. The Orchestrator's capture runs at landing write the frames under the
  `navbar-hanging-menu` stem.

## B-e: prose

**The `NAV_SPECIMENS` TSDoc.** One sentence is added after the sentence on the tab order.
- Before: "… and a tab further along the strip would push the menu past the specimen's end at the
  narrow width."
- After: that sentence, then "At the narrow width the strip wraps its later tabs onto another row,
  and the open menu also lies over that row, as the release places it, so the wrapped disabled tab is
  covered there and reads in the wide frame."

**The guide patch.** The `bcf-shared-2.patch` file is against `unit/bcf` at `f4e5693` and supersedes
the `bcf-shared.patch` file whole. Each of its sentences is set out here, with its source text.

- **(a) The Navbar region paragraph.**
  - Before (round 1): "That bar's card body is the room its menu lies over, so the frame shot on
    that specimen carries the whole menu at both widths the journey renders."
  - After: "The hanging-menu bar's card body is the room its menu lies over, so the frame shot on that
    specimen carries the whole menu at the 390 and 1280 widths the journey renders."
  - The list sentence before it is round 1's, and adds "an always-expanded bar whose open menu hangs
    over the body of the card holding it".
- **(b) The V14 sentence in § Dropdown classes.**
  - Before (round 1): "The header's weight is not the partial's: the release's `.dropdown-header`
    rule declares no weight and neither does Veneer's, so a header written as the release's `h6`
    element takes the heading weight, which the `reboot` row for the `h6` element in § Departures
    records as the `var(--vn-weight-heading)` value, resolving to `600`, against the release's `500`
    value."
  - After: "The header's weight does not come from the partial. Neither the release's
    `.dropdown-header` rule nor Veneer's declares a weight, so a header written as the release's `h6`
    element takes the heading weight. The `reboot` row for the `h6` element in § Departures records
    that departure: the release's `500` value becomes the `var(--vn-weight-heading)` value, which
    resolves to the `600` weight."
- **(c) The Accordion region paragraph.**
  - Before (round 1): "The Accordion region renders the release's own arrangement, the first item
    expanded above collapsed items, the same group with its last item expanded, so the last panel
    carries the group's outer bottom corners, and a flush accordion whose middle item is expanded, so
    its first and last items rest collapsed."
  - After: "The Accordion region renders the release's own arrangement, the same group with its last
    item expanded, and a flush accordion whose middle item is expanded. The release's arrangement
    expands its first item above collapsed items. The last-expanded group hands the group's outer
    bottom corners to its last panel. The flush group rests its first and last items collapsed."
- **(d) The element-frame paragraph in § Tests.**
  - Before (round 1): "The journey releases the pointer before it shoots the resting frames and
    lifts each copy below a padded top, so the released pointer rests off every copy and no resting
    frame carries a hover paint."
  - After: "The journey shoots each resting element frame on a copy of its specimen lifted to the
    document's start below a padded top, after releasing the pointer, so the released pointer rests
    off every copy and no resting frame carries a hover paint."

## B-f: the ring check bound to the shot

- **Change.** The `nav-underline-focus` case reads the link's box from the region that the
  `FrameManager` class recorded when it placed the shot, in the shot frame's own device pixels. The
  ring's reach is checked against that region's left and top edges. The right and bottom edges are
  checked against the size of the element held in the `shot` variable, which is the element the
  placement photographs.
- **Before.** The check read `link.getBoundingClientRect()` against `lifted.getBoundingClientRect()`,
  whichever element the placement shot.
- **Structural guard.** The case also carries the guard
  `expect(mounted.host.querySelector('main')?.contains(link)).toBe(false)` before its pointer-held
  placement.
- **Red run `underline-focus-on-specimen`.** Only the placement argument changes, to
  `FRAMES.place('nav-underline-focus', link, specimen)`, and the run uses `CAPTURE=1` at dark-390.
  - The case reddens on the ring reading: `expected [ false, true, true, true ] to strictly equal
    [ true, true, true, true ]`.
  - Command: `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache
    --reporter=dot --project journey:dark-390* -t 'drives an underline link to hover and to focus'`.
  - Result: exit 1, `Tests 1 failed | 45 skipped (46)`.
- **The unmutated run.** The same command on the unmutated tree exits 0, with
  `Tests 1 passed | 45 skipped (46)`. It ran again after the red run, so the
  `nav-underline-hover--dark-390.png` and `nav-underline-focus--dark-390.png` frames on disk are the
  unmutated shots. The focus frame shows the whole ring inside the padding.
- **Red run `v6-underline-unregistered-capture`.** It removes the `nav-underline-hover` and
  `nav-underline-focus` rows from the `DRIVEN_KEYS` table and uses the same command under
  `CAPTURE=1`.
  - The case reddens with exit 1 and `Tests 1 failed | 45 skipped (46)`.
  - Observation: the case reddens at the placement, because the portfolio refuses the scenario
    before any shot (`Capture state "nav-underline-hover" is not registered`). So this mutation never
    reaches the held-after-shot assertions under `CAPTURE=1`. Those assertions run against written
    shots in the unmutated `CAPTURE=1` run, which passes.

## Gates

Each command ran from the `.orkestrel/veneer/units/bcf-instruments/bcf-gates-2.sh` file after the last source edit and after
every mutation restore. The summary is the `bcf-gates-2.log.txt` file, and each command's whole
output is in the `bcf-gates-2-<step>.log.txt` file.

- `npx oxfmt --config .oxfmtrc.json --check app/browser/constants.ts tests/setup.ts tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts`
  — exit 0, "All matched files use the correct format."
- `npm run lint:check` — exit 0. The runner prints no summary line under the `--deny-warnings` flag.
- `npm run check` — exit 0. The runner prints no summary line.
- `npm run test:setup` — exit 0, `Test Files 4 passed (4)`, `Tests 299 passed (299)`.
- `npm run test:setup:browser` — exit 0, `Test Files 1 passed (1)`, `Tests 75 passed (75)`.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/AccordionSection.test.ts tests/app/browser/sections/DropdownSection.test.ts tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/NavbarSection.test.ts tests/app/browser/Showcase.test.ts`
  — exit 0, `Test Files 5 passed (5)`, `Tests 26 passed (26)`.
- `npm run test:guides` — run in a scratch copy under the `tmp/probe/` directory. The copy is a
  `git archive HEAD` extract with the modified owned files copied in and `bcf-shared-2.patch`
  applied. Result: exit 0, `Test Files 1 passed (1)`, `Tests 19 passed (19)`, in the
  `bcf-test-guides-2.log.txt` file.
- `git apply --check .orkestrel/veneer/units/bcf-shared-2.patch` — exit 0 against the worktree.

No run showed a timing failure.

## Red-run commands

The sections and setup:browser red runs used these commands, and each is logged with its site, exit,
summary, failing cases, and whole output:

- The section command in the Gates section, for `accordion-ordinary-added`, `dropdown-infix-added`,
  and `dropdown-ramp-row-added`.
- `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser`, for
  `helper-menu-spilled` and `helper-empty-population`.

## Files

- **Owned files touched:** `app/browser/constants.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`
  (the helper and its interface only), `tests/setupBrowser.test.ts` (the helper's case and its
  export-set entry), `tests/app/browser/integration.test.ts`,
  `tests/app/browser/sections/AccordionSection.test.ts`,
  `tests/app/browser/sections/DropdownSection.test.ts`,
  `tests/app/browser/sections/NavSection.test.ts`, and
  `tests/app/browser/sections/NavbarSection.test.ts`.
- **Records under `/home/user/veneer-bcf/tmp/units/`:**
  - `bcf-2.diff` and `bcf-2-status.txt`, against the merged head `f4e5693`;
  - `bcf-shared-2.patch`;
  - `bcf-mutations-2.log.txt`, with the runner `bcf-mutate-2.py` and the whole outputs in the
    `bcf-mutation-2-<name>.log.txt` files;
  - `bcf-gates-2.sh` and `bcf-gates-2.log.txt`;
  - `bcf-2-stem-prefix.log.txt`;
  - `bcf-report-2.md`.
- **The `tmp/probe/` directory** holds nothing of this unit.

## Deviation state

No stop. These ancillary choices are settled within the unit's scope:

- the `readMenuContainment` name and signature, and the `MenuContainment` interface;
- a menu that paints no box counts as escaped, because a setup module holds no assertion;
- the helper's case placed in its own `menu containment` block;
- the wording of each rewritten sentence;
- the bar's accessible name following the rename.

One slip: early in the round I wrote one throwaway stem list to the session scratchpad, which note 2
forbids. I deleted it straight away, by the path I created. It is not part of any record.

Referrals R3 to R6 from the subjective lane name no carrier in this brief, so they stay unaddressed
here.
