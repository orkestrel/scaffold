# Unit DROPDOWN (`dd`) round 2 report

`opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-dd` (branch `unit/dd`,
round-1 owned files uncommitted over `87ff1d0`). Brief: `tmp/units/dd-brief-3.md`.

## Outcome

Every ruling in `dd-audit-verdict.md` § Rulings is closed. The owned files are edited in place, and
the shared-file changes are one patch, `/home/user/scaffold/.orkestrel/veneer/units/dd-shared-2.patch`, against `c3ac297` in the
post-BPO form. On the validation copy (`c3ac297` plus the owned files plus the patch), every gate
in the brief exits 0, every named mutation reddens a named case, and the unmutated controls are
green. No stop condition fired.

Instruments and logs are in `/home/user/scaffold/.orkestrel/veneer/units/dd-instruments-2/`. The validation copy
`tmp/probe/base/` was deleted after the last reading.

## Touched files

The owned source and proof files, as round-2 edits over round 1. The full round-1-to-round-2 delta
is `/home/user/scaffold/.orkestrel/veneer/units/dd-instruments-2/owned-round-delta.diff`.

| File | Round-2 change |
| --- | --- |
| `src/styles/components/_dropdown.scss` | The caret flag is `$raised` (`true` means `vertical-align: 0.255em`), with the ruled header comment; its comment tokens gain their nouns. The built CSS is byte-identical to round 1. |
| `tests/src/styles/components/dropdown.test.ts` | The `TEXT_MODES` case runs over the dark mode alone under its own title; the alignment case also reads an end menu with no placement attribute. |
| `tests/app/browser/sections/DropdownSection.test.ts` | The containment case measures inside `visitBreakpoint` at 390 and at 1280, one case per width. |
| `app/browser/sections/DropdownSection.ts` | Unchanged. |
| `/home/user/scaffold/.orkestrel/veneer/units/dd-shared-2.patch` | One unified diff against `c3ac297` over every shared file, the guide included. |
| `/home/user/scaffold/.orkestrel/veneer/units/dd-instruments-2/` | `sync-owned.sh`, `gates.sh`, `mutate.py`, `mutations.sh`, `journey.sh`, `apply-guide.py` with its inputs `section.md` and `r1-guide-added.txt`, `owned-round-delta.diff`, and `logs/`. |
| `tmp/units/dd-2.diff`, `tmp/units/dd-2-status.txt` | Review evidence, as § Review evidence names it. |

Diffstat of the owned files against `87ff1d0` (`git diff --no-index --stat /dev/null <file>`), all
untracked:

```text
src/styles/components/_dropdown.scss                 | 300 +
tests/src/styles/components/dropdown.test.ts         | 591 +
app/browser/sections/DropdownSection.ts              |  20 +
tests/app/browser/sections/DropdownSection.test.ts   | 218 +
```

Diffstat of the patch (`git apply --stat /home/user/scaffold/.orkestrel/veneer/units/dd-shared-2.patch`):

```text
 app/browser/Showcase.ts               |    2
 app/browser/constants.ts              |  162 ++++
 app/browser/index.ts                  |    1
 guides/veneer.md                      |  108 +++
 src/styles/index.scss                 |    1
 tests/app/browser/Showcase.test.ts    |    3
 tests/app/browser/index.test.ts       |    3
 tests/app/browser/integration.test.ts |   65 ++
 tests/conformance.test.ts             |    3
 tests/setup.ts                        |  104 +++
 tests/setupServer.test.ts             |    1
 tests/setupStyles.test.ts             |  124 +++
 tests/setupStyles.ts                  |  209 +++++
 13 files changed, 786 insertions(+)
```

Every hunk adds lines only: `grep -c '^-[^-]' /home/user/scaffold/.orkestrel/veneer/units/dd-shared-2.patch` prints `0`.

## Findings: site, before, and after

**Claim 3, the mutations.** Before: the table named mutations that never ran. After: every mutation
in § Mutation table ran in the validation copy, each with its own log.

**Claim 4, the containment case** (`DropdownSection.test.ts`, the case formerly titled `keeps each
shown menu inside the specimen that holds it`).

- Before: one case with no viewport call, so it measured the runner's default width only.
- After: `it.each([390, 1280])('keeps each shown menu inside the specimen that holds it at a %i-pixel viewport', …)`.
  It mounts the section and measures inside `await visitBreakpoint(width, () => { … })`. The
  callback asserts `window.innerWidth` equals the width it asked for, so each case measures at 390
  or at 1280. `visitBreakpoint` imports from `../../../setupBrowser.js`, as `ButtonSection.test.ts`
  imports its helpers; the `app:browser` project loads that module as a setup file.
- The `room-dropped` log is red at 390 and at 1280, each as its own case.

**Claim 6, the partition predicate** (`tests/setupStyles.test.ts`, `dropdown case tables`).

- Before:
  `shared.every((selector) => selector.startsWith('.input-group') || selector.startsWith('.btn-group'))`.
- After:
  `selector.startsWith('.input-group') || selector.startsWith('.btn-group') || selector.startsWith('.nav-tabs')`,
  with a comment stating when the navigation menu joins the shared population.
- The `Nav` deferral row stays in the patch. With the row present the extension is inert:
  `npm run test:setup` is green. With the row removed, the extended predicate is green and the
  round-1 predicate is red (§ Failing first).

**Claim 6, the `raised` column** (`tests/setupStyles.test.ts`, the derivation case). Before: the
case read each caret's sides and never its alignment. After: the case also asserts
`expect(declared.get('vertical-align') !== '0').toBe(raised)` over the recorded rules. The
comparison reads the last alignment the release's rules leave, so the doubled sideways-caret rules
read `false`. The `raised-column-flipped` mutation reddens the case.

**Claim 7, the guide.** Each item in the patched `guides/veneer.md`:

- **The plugin cell.** Before: "… centering included. J-ENGINE owns it.". After: "… centering
  included. Owner: J-ENGINE.".
- **The R8 sentence.** Before: "A `plugin` row records behavior the engine owns, while the classes
  it sets ship and render in markup.". After, NAV's wording verbatim: "A `plugin` row records a
  behavior J-ENGINE owns, while the classes that behavior sets ship in the cascade and render in
  markup.". It sits directly after the § Compatibility table.
- **§ Tests.** Before: no dropdown link. After:
  `[dropdown specimens](../tests/app/browser/sections/DropdownSection.test.ts)` between
  `[content specimens]` and `[form check specimens]` in the application-proof list, and
  `[the dropdown classes](../tests/src/styles/components/dropdown.test.ts)` between
  `[the close classes]` and `[the icon link classes]` in the style-proof list.
- **The `.dropdown-menu-end` sentence.** Before: "The `.dropdown-menu-end` class aligns the menu to
  its wrapper's end and the `.dropdown-menu-start` class to its start, and each breakpoint name
  switches that alignment at its boundary.". After: "The `.dropdown-menu-end` class aligns the menu
  to its wrapper's end when the menu carries the `data-bs-popper` attribute, and publishes the
  `--bs-position` property alone without it. The `.dropdown-menu-start` class does the same towards
  the start, and each breakpoint name switches that alignment at its boundary." The R7 sentence
  follows it verbatim.
- **The sentence gets an executed proof.** `aligns the end menu to its wrapper end under the
  placement attribute, the start and centered menus to its start, and publishes each side` reads an
  end menu with no attribute. That menu sits at its wrapper's start and still publishes `end`. The
  `end-rule-unconditioned` mutation reddens the case.
- **Section position.** `### Dropdown classes` sits directly before `### Button group classes`,
  after `### Validation classes`. `c3ac297` carries no `### Collapse classes` section.
- **Departure table.** `#### dropdown` sits after `#### valid-tooltip` and before `#### card`, the
  barrel's order.
- **The proof sentence.** It names "the end alignment with and without the placement attribute".
- **Placement of the other hunks.** The § Files row sits before the `_button-group.scss` row, the
  deferral rows follow the table's last row, and the `dropdown` selector and variable rows follow
  the `pagination` rows.

**Claim 8, the token nouns.**

- `tests/setupStyles.ts`: "`raised` is true" becomes "The `raised` flag is true …", and "`source`
  is the token" becomes "The `source` field is the token …".
- `app/browser/constants.ts`: "through `aria-label`" becomes "through its `aria-label` attribute".
- Further bare tokens in the same patch and the owned files take their nouns under the same reading:
  - "the `paint` value", "the `clear` value", and "the `none` value";
  - "the {@link GRID_BREAKPOINT_CASES} constant";
  - "The `tests/setupStyles.test.ts` proof";
  - in the variable row, "on the `.dropdown-menu` class", "by the `.dropdown-menu-dark` class", and
    "the `--bs-position` property";
  - in `_dropdown.scss`, "the `::before` pseudo-element", "the `::after` caret", and "the
    `--bs-position` property".

**F1 (objective), the case that could not fail** (`dropdown.test.ts`).

- Before: `it.each(TEXT_MODES)('repaints the plain menu in %s mode and holds the dark menu', …)`.
  Its light instance compared identical markup in identical scopes.
- After: a single case, `repaints the plain menu inside a dark island and holds the dark menu at its own paint`.
  It asserts that the plain menu's `background-color` and `color` differ between the dark island
  and the light reference, and that the dark menu's are equal.
- `TEXT_MODES` is no longer imported. No other case mounts identical markup in identical scopes.

**F1 (subjective), the copy.** `DROPDOWN_COPY.paragraph`:

- Before: "… a menu shown below, above, beside, and centered on its toggle, …".
- After: "… a menu shown below, above, and beside its toggle, and from each centered wrapper, …",
  ending "Hover or focus an item to compare its states.".

**F2 (subjective), one polarity.**

- `_dropdown.scss` before: `$centered`, with `true` for the sideways carets, and the comment
  "whether it sits on the text's middle rather than above the baseline".
- `_dropdown.scss` after: `$raised`, with `true` for the downward and upward carets, emitted
  through `@if not $raised { … vertical-align: 0 }`, and the comment "whether the caret sits above
  the baseline rather than on it".
- `DROPDOWN_DIRECTION_CASES` keeps `raised` with the same polarity. Its remark reads "The `raised`
  flag is true where the caret sits above the baseline, and false where it sits on the baseline.".
- `cmp` of `dist/src/styles/index.css` built before and after the rename prints nothing. The sha256 digest
  of each build is `3d45c113…a450df` (`logs/raised-rename-css.log.txt`).

**F3 (subjective).** This report states no count.

## Failing first

Each of the following commands is `python3 /home/user/scaffold/.orkestrel/veneer/units/dd-instruments-2/mutate.py NAME [TAG]` in the
validation copy. The copy carries the round-1 owned files for the "before" reading and the round-2
files for the "after" reading. The printed line is the proof's own `Tests` line.

| Finding | Mutation and proof | Before (round-1 files) | After (round-2 files) |
| --- | --- | --- | --- |
| Containment unmeasured at 1280 | `dropend-column-narrowed`: the Dropend column becomes `col-lg-2 offset-lg-10`; section proof | `exit 0; 4 passed (4)` (`logs/mutations/dropend-column-narrowed-before.log.txt`) | `exit 1; 1 failed \| 4 passed (5)`: `… at a 1280-pixel viewport` red, the 390 case green (`logs/mutations/dropend-column-narrowed.log.txt`) |
| The light instance cannot fail | `baseline-no-partial`: the barrel's `@use 'components/dropdown'` line removed; styles proof | `exit 1; 46 failed \| 1 passed (47)`, and the survivor is `repaints the plain menu in light mode and holds the dark menu` (`…/baseline-no-partial-before.log.txt`) | `exit 1; 46 failed (46)`, no survivor (`…/baseline-no-partial.log.txt`) |
| The partition predicate after the `Nav` row drops | `nav-row-dropped`: the `.nav-tabs .dropdown-menu` row removed from the guide; `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts -t "dropdown case tables"` | `exit 1; 1 failed \| 1 passed \| 109 skipped (111)`, and the red case is `partitions the recorded dropdown selectors …` (`…/nav-row-dropped-before.log.txt`) | `exit 0; 2 passed \| 109 skipped (111)` (`…/nav-row-dropped.log.txt`). The same drop with the predicate narrowed back (`nav-row-dropped-narrow-predicate`) is red again: `1 failed \| 1 passed \| 109 skipped (111)` |

The following cases are written or rewritten this round. Each one ran red under the mutation
named beside it:

- `keeps each shown menu inside the specimen that holds it at a %i-pixel viewport`: `room-dropped`
  at 390 and 1280; `dropend-column-narrowed` at 1280.
- `repaints the plain menu inside a dark island and holds the dark menu at its own paint`:
  `plain-background-fixed`, `dark-block-on-menu`, and `baseline-no-partial`.
- `aligns the end menu to its wrapper end under the placement attribute, …`:
  `end-rule-unconditioned`, `centering-added`, and `position-swapped`.
- `partitions the recorded dropdown selectors among this partial, the partials sharing them, and the deferrals`:
  `nav-row-dropped-narrow-predicate`.
- `derives each caret side, the dark slots, the space slots, and the ramp from the recorded rules`:
  `raised-column-flipped`.

## Mutation table

Every mutation ran in the validation copy with the round-2 owned files and the patch applied.

- **Script.** `/home/user/scaffold/.orkestrel/veneer/units/dd-instruments-2/mutate.py`, driven by `mutations.sh`. It edits, rebuilds
  the styles where a source or the built sheet changed, runs the proof, restores, and rebuilds.
- **Summary.** `logs/mutations.log.txt`. Each row's own log is `logs/mutations/<name>.log.txt`.
- **Proofs.**
  - "styles" is `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=verbose tests/src/styles/components/dropdown.test.ts`.
  - "section" is `npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=verbose tests/app/browser/sections/DropdownSection.test.ts`.
  - "setup" is the `dropdown case tables` run named in § Failing first.
- **The layer case** is `hides the menu at rest, shows it through the class, and reaches the
  components layer with every recorded selector`.

The first case in each row's Red cases cell is the case the mutation names.

| Mutation | Edit | Proof | Result line | Red cases (named case first) |
| --- | --- | --- | --- | --- |
| `control` | none | styles | `exit 0; 46 passed (46)` | none |
| `control-section` | none | section | `exit 0; 5 passed (5)` | none |
| `control-setup` | none | setup | `exit 0; 2 passed \| 109 skipped (111)` | none |
| `centering-added` | appends `.dropdown-center .dropdown-menu[data-bs-popper]{left:50%;transform:translateX(-50%)}` after the partial's layer block | styles | `exit 1; 1 failed \| 45 passed (46)` | `aligns the end menu to its wrapper end under the placement attribute, the start and centered menus to its start, and publishes each side` |
| `active-rule-dropped` | drops the `.dropdown-item.active, .dropdown-item:active` rule | styles | `exit 1; 2 failed \| 44 passed (46)` | `paints the selected and the pressed item from the active slots and refuses each disabled host`; the layer case |
| `disabled-rule-dropped` | drops the `.dropdown-item.disabled, .dropdown-item:disabled` rule | styles | `exit 1; 3 failed \| 43 passed (46)` | `paints the selected and the pressed item …`; the layer case; `paints the dark menu from its retuned slots` |
| `header-rule-dropped` | drops the `.dropdown-header` rule | styles | `exit 1; 3 failed \| 43 passed (46)` | `lays out the items, the header, the divider, and the item text from the menu slots`; the layer case; `paints the dark menu from its retuned slots` |
| `divider-rule-dropped` | drops the `.dropdown-divider` rule | styles | `exit 1; 2 failed \| 44 passed (46)` | `lays out the items, the header, the divider, and the item text …`; the layer case |
| `item-text-rule-dropped` | drops the `.dropdown-item-text` rule | styles | `exit 1; 2 failed \| 44 passed (46)` | `lays out the items, the header, the divider, and the item text …`; the layer case |
| `position-swapped` | exchanges `--bs-position: start` and `--bs-position: end` in the ramp | styles | `exit 1; 6 failed \| 40 passed (46)` | `aligns the end menu …`; `switches the 'sm'` (and `'md'`, `'lg'`, `'xl'`, `'xxl'`) `alignment and the published side at its boundary` |
| `sm-end-boundary` | moves the `.dropdown-menu-sm-end` rule alone to `@media (width>=768px)` in the built sheet; its `[data-bs-popper]` twin and the `-sm-start` pair stay at 576px | styles | `exit 1; 1 failed \| 45 passed (46)` | `switches the 'sm' alignment and the published side at its boundary` (reads `[ 'end\|', 'start\|start' ]` for `[ 'end\|end', 'start\|start' ]`) |
| `sm-end-pair-boundary` | moves the `.dropdown-menu-sm-end` rule and its `[data-bs-popper]` twin to 768px in the built sheet | styles | `exit 1; 1 failed \| 45 passed (46)` | `switches the 'sm' alignment and the published side at its boundary` (reads `[ 'start\|', 'start\|start' ]`) |
| `room-dropped` | every empty room column in the specimens set to zero repeats | section | `exit 1; 2 failed \| 3 passed (5)` | `keeps each shown menu inside the specimen that holds it at a 390-pixel viewport`; `… at a 1280-pixel viewport` |
| `dropend-column-narrowed` | the Dropend column becomes `col-lg-2 offset-lg-10` | section | `exit 1; 1 failed \| 4 passed (5)` | `… at a 1280-pixel viewport` |
| `specimen-drops-show` | the shown specimens lose the `show` class | section | `exit 1; 3 failed \| 2 passed (5)` | `sets every state in markup and announces each toggle as its menu stands`; `… at a 390-pixel viewport`; `… at a 1280-pixel viewport` |
| `baseline-no-partial` | removes the barrel's `@use 'components/dropdown'` line | styles | `exit 1; 46 failed (46)` | every case |
| `show-rule-missing` | drops the `.dropdown-menu.show` rule | styles | `exit 1; 15 failed \| 31 passed (46)` | the layer case; each `opens the … menu …` case; the alignment and ramp cases; the item cases; the density case |
| `dropup-copies-top` | the dropup placement writes `top: 100%` | styles | `exit 1; 1 failed \| 45 passed (46)` | `opens the 'dropup' menu on the 'top' side of its toggle, one spacer away` |
| `spacer-dropped` | every `var(--bs-dropdown-spacer)` becomes `0` | styles | `exit 1; 5 failed \| 41 passed (46)` | each `opens the … menu … one spacer away` case; `rescales the menu with the density factor and stacks it from the dropdown tier` |
| `two-carets-on-dropstart` | drops the `::after` hide on the start caret | styles | `exit 1; 1 failed \| 45 passed (46)` | `draws the 'dropstart' caret on '::before' alone` |
| `empty-rule-dropped` | drops the `:empty` caret rule from the loop | styles | `exit 1; 5 failed \| 41 passed (46)` | each `drops the caret margin on an empty … toggle` case; the layer case |
| `raised-flag-flipped` | sets the `.dropend` tuple's `$raised` to `true` | styles | `exit 1; 1 failed \| 45 passed (46)` | `draws the 'dropend' caret on '::after' alone` |
| `raised-column-flipped` | sets the `dropend` row's `raised` to `true` in `DROPDOWN_DIRECTION_CASES` | setup | `exit 1; 1 failed \| 1 passed \| 109 skipped (111)` | `derives each caret side, the dark slots, the space slots, and the ramp from the recorded rules` |
| `position-omitted` | drops every `--bs-position` declaration | styles | `exit 1; 7 failed \| 39 passed (46)` | `aligns the end menu …`; each ramp case; the layer case |
| `end-rule-unconditioned` | writes the end placement on `.dropdown-menu{infix}-end` without `[data-bs-popper]` | styles | `exit 1; 7 failed \| 39 passed (46)` | `aligns the end menu …`; each ramp case; the layer case |
| `wrong-boundary` | moves the whole `sm` block to `@media (width>=768px)` in the built sheet | styles | `exit 1; 1 failed \| 45 passed (46)` | `switches the 'sm' alignment and the published side at its boundary` |
| `literal-hover-background` | the hover rule paints `rgb(233, 236, 239)` | styles | `exit 1; 1 failed \| 45 passed (46)` | `paints a hovered and a focused item from the hover slots the menu declares` |
| `dark-block-on-menu` | the dark block's selector becomes `.dropdown-menu` | styles | `exit 1; 11 failed \| 35 passed (46)` | each `retunes … on the dark menu alone` case whose slot moves; `repaints the plain menu inside a dark island …`; `positions every wrapper …`; the layer case |
| `plain-background-fixed` | `--bs-dropdown-bg` reads `var(--vn-palette-white-base)` | styles | `exit 1; 1 failed \| 45 passed (46)` | `repaints the plain menu inside a dark island and holds the dark menu at its own paint` |
| `literal-zindex` | `--bs-dropdown-zindex: 1000` | styles | `exit 1; 1 failed \| 45 passed (46)` | `rescales the menu with the density factor and stacks it from the dropdown tier` |
| `nav-row-dropped` | removes the `Nav` deferral row | setup | `exit 0; 2 passed \| 109 skipped (111)` | none: the extended predicate admits the selector |
| `nav-row-dropped-narrow-predicate` | removes the `Nav` row and the `.nav-tabs` clause | setup | `exit 1; 1 failed \| 1 passed \| 109 skipped (111)` | `partitions the recorded dropdown selectors among this partial, the partials sharing them, and the deferrals` |

## Gates on the validation copy

The validation copy was built from `git archive c3ac297` with hard-linked `node_modules` and its own
git commit. Its tree hash equals that of `c3ac297`: `git rev-parse c3ac297^{tree}` and
`git -C tmp/probe/base rev-parse HEAD^{tree}` each print `3e87fe08292705b63b060135c874e2f69e7171ea`.

- **The guide.** It is `apply-guide.py` over `c3ac297`'s guide, followed by
  `npx oxfmt --config .oxfmtrc.json guides/veneer.md`. The formatter re-pads the variable row and the
  plugin row this round rewrote.
- **The other shared files.** Round 1's hunks apply to `c3ac297` with line offsets only, and
  `dd-shared-post-bpo.patch` supplies the barrel and conformance hunks. The rulings are edited in.
- **The final chain.** Script `gates.sh`, with logs `logs/gate-<name>.log.txt` and exit codes in
  `logs/summary.txt` under "final chain after the last edit". It ran after the last edit to any
  file.

| Command | Result line |
| --- | --- |
| `npm run format:check` | exit 0; `All matched files use the correct format.` |
| `npm run lint:check` | exit 0; oxlint printed no finding |
| `npm run check` | exit 0 |
| `npm run build:src` | exit 0; `✓ built in 1.76s` |
| `npm run test:setup` | exit 0; `Tests  252 passed (252)` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/dropdown.test.ts` | exit 0; `Tests  46 passed (46)` |
| `npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/DropdownSection.test.ts` | exit 0; `Tests  5 passed (5)` |
| `npm run test:conformance` | exit 0; `Tests  22 passed (22)` |
| `npm run test:guides` | exit 0; `Tests  19 passed (19)` |
| `npm run test:policy` | exit 0; `Tests  109 passed \| 1 skipped (110)` |

Observations from the runs:

- **The policy skip.** Round 1 recorded the same skip on every replica, and this round did not
  identify the skipped case.
- **The first departure table.** The first chain's `test:conformance` ran with an empty
  `#### dropdown` table, because the guide script took the heading without its rows. The ledger
  case reported the missing rows: `Tests  1 failed | 21 passed (22)`. The script was corrected and
  the chain re-ran green.

**`git apply --check`.** The patch was reverse-applied in the validation copy, leaving the tree at
`c3ac297` plus the owned files. Then
`git -C /home/user/veneer-dd/tmp/probe/base apply --check /home/user/veneer-dd//home/user/scaffold/.orkestrel/veneer/units/dd-shared-2.patch`
printed nothing and exited 0 (`logs/apply-check.log.txt`). The patch's file list is the Shared row
exactly: `src/styles/index.scss`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`,
`tests/setup.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`,
`tests/app/browser/index.test.ts`, `app/browser/constants.ts`, `app/browser/Showcase.ts`,
`app/browser/index.ts`, and `guides/veneer.md`.

## Journey observations

The journey ran after the gate chain, one variant at a time, in the validation copy with the patch
applied:
`npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project journey:<variant>`
(script `journey.sh`, logs `logs/journey-<variant>.log.txt`). No `CAPTURE=1` run was made.

| Variant | Result line | Driven dropdown case |
| --- | --- | --- |
| `light-390` | exit 0; `Tests  39 passed (39)` | `drives one menu item to hover and to focus and photographs each state` passed, 691ms |
| `light-1280` | exit 0; `Tests  39 passed (39)` | passed, 568ms |
| `dark-390` | exit 0; `Tests  39 passed (39)` | passed, 782ms |
| `dark-1280` | exit 0; `Tests  39 passed (39)` | passed, 856ms |

In each variant, the lifted-frame case (`reads every resting cascade key the same on its lifted frame
as in the showcase, in light and dark`) passed.

## Decisions within the deviation contract

- **`sm-end-boundary` is read literally.** It moves the `.dropdown-menu-sm-end` rule alone. The
  paired move is run separately as `sm-end-pair-boundary`, and each one reddens the `sm` ramp case.
- **The containment case runs as one case per width.** It is `it.each([390, 1280])`, so a mutation's log
  names each width it reddens. The callback runs inside `await visitBreakpoint(width, …)`, because a
  case that measured 390 and 1280 in turn would stop at the first failing width.
- **The style-proof link's position.** That list is not sorted as a whole. The link takes the
  alphabetical slot between `[the close classes]` and `[the icon link classes]`, beside the slot
  COLLAPSE's link takes after `[the close classes]`.
- **`centering-added` is unlayered.** It appends its rule after the partial's `@layer components`
  block.
- **The case title for the dark mode** is `repaints the plain menu inside a dark island and holds the
  dark menu at its own paint`.
- **Where the logs sit.** Each mutation log is under `logs/mutations/` and each gate log is under
  `logs/`.
- **The unplaced end-menu reading.** It was added to the alignment case so the rewritten
  `.dropdown-menu-end` sentence has an executed proof, per `.claude/rules/documentation.md`
  § Parity on prose claims.
- **`tmp/probe/keys.mjs` is left in place.** This round deleted `tmp/probe/base/`, the only thing it
  created under `tmp/probe/`. `tmp/probe/keys.mjs` is dated 2026-09-23 12:58, and round 1's report
  states that the round-1 run did not create it either, so this round did not delete a file it
  cannot attribute. The Orchestrator decides whether to remove it.

## Deviation state

No stop. None of the deviation contract's stop conditions fired:

- Every guide site the ruling names was located on `c3ac297`.
- Every named mutation reddened a case.
- `visitBreakpoint` is reachable from the section proof's project.

## Review evidence

- `/home/user/scaffold/.orkestrel/veneer/units/dd-shared-2.patch`.
- `tmp/units/dd-2.diff`: `git diff 87ff1d0` (empty) followed by
  `git diff --no-index /dev/null <path>` for each untracked owned file.
- `tmp/units/dd-2-status.txt`: `git status --porcelain`, which lists the owned source and proof
  files as untracked and nothing else.
- This report.
- `/home/user/scaffold/.orkestrel/veneer/units/dd-instruments-2/`, with the round delta `owned-round-delta.diff`.
