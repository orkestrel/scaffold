# Unit CLOSE-OUT report (the `xo` unit prefix)

The `opus` role on Opus 5.5, as a native subagent in the `/home/user/veneer-xo` worktree (the
`unit/xo` branch at the `ec98064` commit). Nothing committed, installed, or pushed.

## Deviation state

The unit finished with the following deviations recorded. Each is open for the Orchestrator to rule on.

- **Item 1 needs a file outside the unit's scope.** Removing the `CLOSE_DEFERRED` constant breaks
  the `tests/src/styles/components/close.test.ts` file, which imports that constant and asserts
  over it. The brief lists that file as neither owned nor off-limits. The unit made the owned edits
  and returns the fix as the report-only `.orkestrel/veneer/units/xo-instruments/xo-unscoped.patch` file. Until that patch
  applies, the `npm run check` command in the worktree exits 2, and its only errors are the
  `tests/src/styles/components/close.test.ts(19,2): error TS2305 … no exported member 'CLOSE_DEFERRED'`
  diagnostic and the `(94,33): error TS7006` diagnostic. With the unscoped patch and the shared patch applied in a scratch copy, the `npm run check`
  command exits 0.
- **Item 5's premise does not hold.** The `A toggle announces the button role…` obligation appears
  in more than one row, but each row names a different proof step (the `button.click.toggle` step
  and the `button.pressed.click` step). The rows date from the `1b80ccb` commit (U4b), not from a merge. The
  `toggle() flips active…` method obligation has the same shape (the `button.click.toggle` and
  `button.click.release` steps). Deleting the second toggle row would redden the
  `requires an explicit pressed attribute even when the accessible toggle is released` case in the
  `tests/setupServer.test.ts` file, which looks up the row by the `button.pressed.click` proof. So
  the unit added the uniqueness assertion over whole rows, as the brief words it ("every row it
  returns is unique"), and deleted no ledger row. The assertion does not redden on the guide at
  the `ec98064` commit, because no row there is a whole-row copy. It does redden on a planted whole-row copy
  (see the mutation log). An assertion keyed on component, kind, and obligation does redden at
  the `ec98064` commit, on the toggle obligation and the method obligation (the
  `.orkestrel/veneer/units/xo-instruments/xo-ledger-obligation-key.log.txt` log). Choosing that key
  means deleting a proof-step row, which drops a proof, so the unit did not choose it.
  Hypothesis: the ledger intends one row per proof step, and the carrier row misread the pair as a
  copy.

## Items

### Item 1: the close deferral

- Changes: removed the `CLOSE_DEFERRED` constant from the `tests/setupStyles.ts` file. In the
  `tests/setupStyles.test.ts` file, removed its import, its export-list row, its freeze-list row,
  and its offcanvas-case assertion. The close binding case compares the `CLOSE_SELECTORS` constant
  directly against the recorded `btn-close` selectors and asserts that no deferral row names the
  `Overlays` owner. Retired stale comments that named the deferred list.
- Shared patch: deletes the § Close classes clause "a combinator whose partial has not landed stays
  listed under § Deferred selectors". No other guide text names the deferral or the `Overlays`
  owner (searched the `guides/veneer.md` file with the
  `grep -n "Overlays\|CLOSE_DEFERRED\|deferred combinator"` command).
- Unscoped patch (the `.orkestrel/veneer/units/xo-instruments/xo-unscoped.patch` file): the `close.test.ts` file drops the import and the
  vacuous deferred assertion. Its case takes the `carries a rule for every shipped close name` title.
- Red run: the `npm run test:setup -- tests/setupStyles.test.ts` command, with the test edits
  applied and the constant still present, exits 1 with the `Tests  1 failed | 143 passed (144)`
  line. The failing case is the `styles setup > exports the cascade and guide readers, …` case (the
  `.orkestrel/veneer/units/xo-instruments/xo-red-close-export.log.txt` log). The same command after the fix exits 0 with the
  `Tests  144 passed (144)` line.
- Mutations: dropping the `.modal-header .btn-close` selector from the `CLOSE_SELECTORS` constant,
  and planting a deferral row with the `Overlays` owner, each redden only the
  `passive component case tables > binds the breadcrumb, badge, and close selector tables …` case.

### Item 2: the heading size mapping

- Changes: added the `heading-size` function to the `src/styles/_mixins.scss` file. It returns the
  `var(--vn-size-#{9 - $level})` value and is documented beside the `breakpoints` and `breakpoint`
  functions. The `_heading.scss`, `_type.scss`, and `_font.scss` partials call it. The mixins
  fixture writes one `.vn-fixture-heading-hN` class per level, and the `value functions` case in
  the `tests/src/styles/mixins.test.ts` file compares each declared `font-size` value with the
  `TYPE_HEADING_TOKEN_CASES` table's token.
- Decision: the unit treats the `tests/src/styles/fixtures/mixins.scss` fixture as part of the
  mixins proof the brief grants.
- Red run: the `npm run test:src:styles -- tests/src/styles/mixins.test.ts` command, before the
  function existed, exits 1 with the `Tests  1 failed | 14 passed (15)` line. The failing case is
  the `value functions > returns the size token each heading level names, from the largest level down`
  case, where every reading is the `''` value (the `xo-red-heading-size.log.txt` log). After the
  fix the command exits 0 with the `Tests  15 passed (15)` line.
- Mutation: changing the `9 - $level` expression to the `8 - $level` expression reddens only that
  case (the `h1` level reads the `var(--vn-size-7)` value).
- Byte equality: the `npm run build:src` command exits 0 before and after. Every file under the
  `dist/src/` directory is byte-equal to the base build by the `cmp` command, and the file sets match (the
  `.orkestrel/veneer/units/xo-instruments/xo-byte-equality.log.txt` log, with base digests in the `xo-dist-base.sha256.txt`
  file). The final gate build (the `xo-gate-build.log.txt` log) also leaves the `dist/src/styles/index.css` file
  byte-equal to the base.

### Item 3: the carousel proof's names

- Changes: every population in the `CarouselSection.test.ts` file derives from the
  `CAROUSEL_SPECIMENS` table through a class its markup writes:
  - rendered names: the table's names in order;
  - indicated carousels: markup opening the `class="carousel-indicators"` attribute;
  - control names: every specimen's controls;
  - captioned carousels: markup writing the `class="carousel-caption` attribute text;
  - inverted carousels: captioned specimens writing the `carousel-dark` class;
  - fading carousels: the `carousel-fade` class;
  - advancing carousels: the `carousel-item-next` class.

  Each derived population asserts it is not empty. The per-slide caption check left the naming
  case, because the contrast case's `requireValue` call already refuses a captioned slide without
  a caption. Case titles that listed specimens name the population instead.
- Red runs (the `.orkestrel/veneer/units/xo-instruments/xo-plant-carousel.py` script plants a copy of the captioned specimen into the
  table alone):
  - At base, the planted row with an unnamed first indicator does not trip the naming case for
    that indicator. The case reddens only because the region's button names differ from the
    inline list, with the `expected [ '', 'Chart 1', …(13) ] to deeply equal [ 'Chart 1', …(9) ]`
    message.
  - Derived, the same row reddens the naming case on its own record, with the
    `expected [ { tag: 'BUTTON', text: '', …(2) } ] to deeply equal []` message.
  - With a valid planted row, the base proof reddens the rendered-names case and the naming case,
    and the derived proof keeps those cases green.
- Green: the gate command in § Gates.
- Observation: any planted specimen, valid or not, reddens the advancing case at base and
  derived alike. The `readHit` call returns the `undefined` value for the incoming picture after the
  `scrollIntoView` call. The pre-existing hit reading depends on the region's height. The unit did
  not investigate further.

### Item 4: the inline case pairs

- Changes: added the `NAV_MODE_CASES` table (`target` and `reads` fields) and the
  `INPUT_GROUP_MODE_CASES` table (`reads` and `source` fields), each frozen with frozen rows and
  documented in the `tests/setupStyles.ts` file. The mode cases in the `nav.test.ts` and
  `input-group.test.ts` files iterate them. The nav targets use the `NAV_COLOR_CASES` table's
  selector spelling (the `nav.nav > .nav-link:not(.disabled)` selector reaches the same `#one`
  link).
- Bindings by derivation, in the `tests/setupStyles.test.ts` file:
  - every nav mode row must be a `NAV_COLOR_CASES` row whose `source` value is not a
    `--vn-palette-*` token;
  - every input-group mode row's `source` value must appear in the `.input-group-text` row of the
    `INPUT_GROUP_CASES` table, under its property or under the shorthand that writes it.

  The nav table joins the nav case's freeze lists, and the input-group table joins the
  `freezes the input-group tables …` case.
- Red runs: the `npm run test:setup -- tests/setupStyles.test.ts` command exits 1 with the
  `Tests  4 failed | 140 passed (144)` line. The
  `npm run test:src:styles -- tests/src/styles/components/nav.test.ts tests/src/styles/components/input-group.test.ts`
  command exits 1 on the missing exports. Each exits 0 after the fix, with the
  `Tests  144 passed (144)` line and the `Tests  56 passed (56)` line.
- Mutations: each of the following reddens its own case alone.
  - unfreezing the `NAV_MODE_CASES` table or one of its rows reddens the nav case;
  - unfreezing the `INPUT_GROUP_MODE_CASES` table reddens the `freezes the input-group tables …`
    case;
  - a pill row in the nav table reddens the nav binding;
  - a `--bs-secondary-bg` source value in the input-group table reddens the reads binding.

### Item 5: the obligation ledger

- Changes: the guide proof's callback reads the rows through the
  `const { readCompatibility } = await import('./setupServer.js')` statement, beside its other
  dynamic imports. No circular import exists: the `setupServer.ts` file imports the `setupStyles.ts` file,
  and neither imports the guide proof. The added `holds each compatibility ledger row once` case
  compares each row's JSON text. The shared patch deletes no ledger row (see § Deviation state).
- Mutation: duplicating the ledger line of the toggle obligation reddens only that case (the
  `Tests  1 failed | 19 passed (20)` line, run again after renaming the `rows` binding to the
  `ledger` binding for the `no-shadow` lint rule).

### Item 6: the utility region order

- Order rule: the utility regions, the `### … utilities` sections under § Styles, and the utility
  links under § Tests each follow the order in which the `src/styles/index.scss` barrel loads the
  partial each one is named for. The Focus ring entry leads, because the barrel loads the
  `_focus-ring.scss` partial among the components. The Visibility entry closes. The Navbar region
  follows the utility regions.
- Resulting order: Focus ring, Float, Object fit, Opacity, Overflow, Display, Shadow, Position,
  Border, Sizing, Flex, Spacing, (Gap, Font: guide only), Text, Color, Background, Interaction,
  Visibility.
- Moved regions: in the `Showcase.ts` file and the `index.ts` file, the Opacity, Display, Shadow,
  Position, Sizing, Flex, Spacing, Background, and Visibility entries moved. A comment in the
  `#mount` method states the rule.
- Shared patch: moves the `### … utilities` sections into that order. It moves each section's links
  under § Tests into that order, grouping each section's helper links after it. It moves the
  stretched-link helper link ahead of the utility links, because no utility section documents it.
  It corrects the stray `and` words that joined items in that list, and states the rule in § Showcase.
- Red run: the `npx vitest run … --project app:browser tests/app/browser/Showcase.test.ts`
  command with the reordered expectations exits 1 with the `Tests  1 failed | 3 passed (4)` line
  (the `mounts its sections after the region …` case). It is green after the move. The `index.test.ts` proof
  compares sorted keys, so the move changes none of its readings.
- Observation: the unit ran no capture run. Region order changes which section follows which, and
  the Orchestrator's capture run reports whether any page frame moved.

### Item 7: prose

- Departures (shared patch): every `#### ` table in § Departures sits in the sorted run the
  section states (code-unit order, the order the JavaScript default sort gives). That covers the
  cluster after the `table` table and the `icon-link` table, which also sat after the
  `placeholder` table. No proof
  reads the table order. The `test:conformance` script in the scratch copy exits 0.
- TSDoc field tokens in the `tests/setupStyles.ts` file each take a noun. The blocks touched are
  the doc blocks of the `TEXT_DL_CASES`, `FLEX_ENTRY_CASES`, `CALIBRATED_TIERS`, `PAGINATION_SIZE_CASES`,
  `PAGINATION_STATE_CASES`, `FORM_RANGE_CASES`, `FORM_CHECK_ICON_CASES`, `INPUT_GROUP_SIZE_CASES`,
  `INPUT_GROUP_FLOATING_CASES`, `FORM_FLOATING_CASES`, `FORM_SELECT_CASES`, `FORM_CONTROL_CASES`,
  `NAV_LENGTH_CASES`, and `NAV_COLOR_CASES` constants. Only the edited paragraphs were reflowed.
  The scanner is the `.orkestrel/veneer/units/xo-instruments/xo-field-scan.py` script, with its readings before and after. Its remaining
  hits each carry a noun (map, flag, step, sizes). It covers only doc blocks directly followed by
  an exported table whose rows carry keyed fields.
- Guide § Alert classes and § Carousel classes (shared patch): every bare variable, token, value,
  class, and property token takes its noun, and the edited paragraphs are reflowed to 100 columns.
- The `TYPE_SPECIMENS` remark: narrowed to the 390 and 1280 journey widths the `line-heights` frames
  show.

## Gates (worktree unless marked scratch)

Each gate below is listed with its exact command, its exit code, and its result line.

- The `npx oxfmt --config .oxfmtrc.json --check <every changed owned file>` command: exit 0, the
  `All matched files use the correct format.` line.
- The `npm run lint:check` command: exit 0, with no findings.
- The `npm run check` command: exit 2, with only the errors of the `close.test.ts` file quoted in
  § Deviation state.
  In the scratch copy with the `xo-shared.patch` patch and the `xo-unscoped.patch` patch applied:
  exit 0.
- The `npm run build:src` command: exit 0, and the `dist/` directory is byte-equal to the base build.
- The `npm run test:setup` command: exit 0, the `Tests  299 passed (299)` line. The export list
  omits the `CLOSE_DEFERRED` constant.
- The `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CarouselSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts`
  command: exit 0, the `Tests  12 passed (12)` line.
- The `npm run test:src:styles -- tests/src/styles/components/nav.test.ts tests/src/styles/components/input-group.test.ts tests/src/styles/mixins.test.ts`
  command: exit 0, the `Tests  71 passed (71)` line.
- The `npm run test:guides` command (worktree, guide at the `ec98064` commit): exit 0, the
  `Tests  20 passed (20)` line.
- In the scratch copy with the shared patch and the unscoped patch applied, under the `tmp/probe/`
  directory and deleted after the runs:
  - the `npm run test:guides` command: exit 0, the `Tests  20 passed (20)` line;
  - the `npm run test:setup` command: exit 0, the `Tests  299 passed (299)` line;
  - the `npm run test:conformance` command: exit 0, the `Tests  24 passed (24)` line;
  - the `npm run test:src:styles -- tests/src/styles/components/close.test.ts` command: exit 0,
    the `Tests  18 passed (18)` line;
  - the `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md tests/src/styles/components/close.test.ts`
    command: exit 0.
- Scratch logs: the `.orkestrel/veneer/units/xo-instruments/xo-scratch-*.log.txt` files.

## Failing-first test names

- The `styles setup > exports the cascade and guide readers, …` case (item 1)
- The `value functions > returns the size token each heading level names, from the largest level down` case (item 2)
- The `CarouselSection > names every indicator and control, and marks the current indicator in every indicated carousel` case (item 3, planted row)
- The `nav case tables > binds the nav selectors, …`, `input group case tables > writes each recorded input-group rule …`, and `input group case tables > freezes the input-group tables …` cases (item 4)
- The `holds each compatibility ledger row once` case (item 5, planted copy only)
- The `Showcase > mounts its sections after the region and destroys them before removing the nodes` case (item 6)

## Touched files

The following files changed, each with a one-line summary.

- `src/styles/_mixins.scss` file: adds the `heading-size` function.
- `src/styles/elements/_heading.scss`, `src/styles/components/_type.scss`, and
  `src/styles/utilities/_font.scss` files: call the `heading-size` function.
- `tests/src/styles/fixtures/mixins.scss` file: adds the per-level heading-size fixture classes.
- `tests/src/styles/mixins.test.ts` file: adds the `value functions` case.
- `tests/setupStyles.ts` file: drops the `CLOSE_DEFERRED` constant, adds the `NAV_MODE_CASES` and
  `INPUT_GROUP_MODE_CASES` tables, and gives each field token its noun.
- `tests/setupStyles.test.ts` file: holds the close binding without the deferral, the mode-table
  bindings and freezes, and the export list.
- `tests/src/styles/components/nav.test.ts` and `tests/src/styles/components/input-group.test.ts`
  files: iterate the mode tables.
- `tests/app/browser/sections/CarouselSection.test.ts` file: derives every population from the
  `CAROUSEL_SPECIMENS` table.
- `tests/guides.test.ts` file: adds the ledger-row uniqueness case.
- `app/browser/Showcase.ts` and `app/browser/index.ts` files: put the utility regions in barrel
  order.
- `tests/app/browser/Showcase.test.ts` file: holds the region and specimen order.
- `app/browser/constants.ts` file: changes the `TYPE_SPECIMENS` remark only.

Diffstat, as the `git diff --stat` command reported it: the
`16 files changed, 326 insertions(+), 200 deletions(-)` line (the `.orkestrel/veneer/units/xo-instruments/xo-diffstat.txt`
file).

## Artifacts

The unit's artifacts are these files.

- `.orkestrel/veneer/units/xo.diff` file and `.orkestrel/veneer/units/xo-status.txt` file: owned changes and status.
- `.orkestrel/veneer/units/xo-shared.patch` file: the `guides/veneer.md` file's changes against the
  `ec98064` commit. It applies under the `git apply --check` command.
- `.orkestrel/veneer/units/xo-instruments/xo-unscoped.patch` file: the `tests/src/styles/components/close.test.ts` file's
  changes.
- `.orkestrel/veneer/units/xo-instruments/xo-mutations.log.txt` file: every mutation with its site, its diff, its command, its
  exit code, its summary line, and its failing case names. Each mutation's full output sits in the
  `xo-mutation-<label>.log.txt` log.
- Instruments: the `xo-mutate.sh`, `xo-mutate-py.sh`, `xo-plant-carousel.py`,
  `xo-field-scan.py`, `xo-guide-nouns.py`, `xo-reflow.py`, and `xo-unreflow.py` scripts.

## Findings outside scope, for their owners

- The guide's § Showcase paragraph carries merged fragments ("The Flex beside the flex utilities, the
  truncation helper sits in Text…", a repeated list-and-quotation clause, and a dangling
  "every Offcanvas specimen, … render inside" run after the frame paragraph). The owning carrier is
  unknown.
- The advancing case in the carousel proof, which reads the `readHit` helper, reddens on any added specimen (item 3
  observation).
