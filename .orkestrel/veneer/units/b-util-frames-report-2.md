# UTIL-FRAMES (`fu`) report, rounds 1 and 2

The `opus` role on Opus 5.5 ran this unit as a native subagent in the `/home/user/veneer-fu`
worktree, on the `unit/fu` branch from the `cf5e447` commit. Nothing is committed, pushed, or
installed. This report supersedes `b-util-frames-report.md` whole. Brief 1 is
`b-util-frames-brief.md`, and brief 2 is `b-util-frames-brief-2.md`.

## Outcome and deviation state

- **Round 2 closes the audit's claims 2, 7, and 8 and findings F1, F2, and F3.**
  - Claim 2: the link-state case pins the emphasis step and the role-link departure.
  - Claim 7: the dark focus frames paint the outline, and the offsets frame shows the largest step.
  - Claim 8: the property lists and the drive targets moved into `tests/setup.ts` constants.
  - F1, F2, and F3: the prose fixes and the Visibility copy.
- **P9, the `text-bg-*` label polarity: dropped by the coordinator's decision.**
  - I reverted my own edits to the `_color-bg.scss` partial and its proof by writing back their
    baseline text. I did not use git to restore them.
  - The `fu-2-status.txt` file lists neither file, so each matches the `cf5e447` commit.
  - No ledger row changed.
  - The dropped work's logs sit in the `.orkestrel/veneer/units/fu-instruments/fu-p9-dropped/` directory for the LABEL-CONTRAST
    round.
- **The light and dark role rings under focus stay unframed.** The mode-word law stands, per the
  audit's ruling. FRAME-HELPERS merges the limit sentences of this unit and PASSIVE-FRAMES into a shared sentence.
- **Overlap with FOCUS-FRAME.** This unit and FOCUS-FRAME both convert the focus ring journey case
  to element frames. The three-way merge conflicts in that hunk.
- **Stopped for:** nothing.
- **Off-limits file written:** `src/styles/utilities/_link.scss`, by the stylesheet mutations brief 2
  names. The mutation script restores it, and the `fu-2-status.txt` file does not list it.

## Findings and the changes that close them

### Claim 2: the link states

- **Change.** The link-state case asserts that the emphasis link's `color` property moves from rest
  under its hover and focus states. It also asserts that no role link's `color` or
  `text-decoration-color` property moves.
  - The emphasis helper's rule is important in the utilities layer, so the bare link's element rule
    cannot move that color.
  - The role-link assertion pins the departure that § Color utilities records.
- **Readings.**
  - Emphasis link, `light-1280` variant: from `rgb(0, 0, 0)` at rest to `rgba(0, 0, 0, 0.75)` under
    hover and under focus.
  - Emphasis link, `dark-390` variant: from `rgb(255, 255, 255)` to `rgba(255, 255, 255, 0.75)`.
  - Primary role link: holds `rgb(8, 65, 234)` at the `light-1280` variant and `rgb(0, 172, 236)` at
    the `dark-390` variant.
- **Proof.** The journey case "drives a link of each link specimen to the pointer and to keyboard
  focus on its lifted specimen, and photographs each state" in the
  `tests/app/browser/integration.test.ts` file.
- **Mutations** (`.orkestrel/veneer/units/fu-instruments/fu-mutations-2.log.txt`):
  - The `emphasis-state-rule-deleted` mutation deletes the `&:hover` and `&:focus` block of the
    `.link-body-emphasis` rule. The case fails on the emphasis assertion:
    `AssertionError: expected [ [ …(2) ], [ …(2) ] ] to strictly equal []`.
  - The `role-link-hover-color` mutation adds a `.link-<role>:hover` rule painting a darker role
    color. The case fails on the role assertion:
    `AssertionError: expected [ [ 'role-links-hover', { …(4) } ] ] to strictly equal []`.

### Claim 7: the frames

- **Change.** Each focus row of the link-state case, and the link of the focusable-container case,
  is reached by Tab. The Tab starts from the padded wrapper, which carries a `tabindex="-1"`
  attribute, and the case releases the pointer ahead of the Tab. The held check also requires that
  `document.activeElement` holds the link.
- **Cause.** FOCUS-FRAME's § P2 reading: in a run that has pressed a control, the browser paints no
  `auto` outline on a scripted focus, and it paints the outline on a Tab.
- **Change.** The `underline-offsets-hover` row drives the `.link-offset-3-hover` link. That is the
  largest step, and it sits in the pointer's reach.
- **Readings.** The `text-underline-offset` property moves from `auto` to `5.25px` at both the
  `light-1280` and the `dark-390` variant. Round 1 drove the smallest step, which read `1.75px`.
- **Frames re-shot, and what each shows:**
  - The `role-links-focus--dark-390.png` frame: the white `auto` outline around the "Primary link"
    link, on the dark canvas.
  - The `role-links-focus--light-1280.png` frame: the dark outline around the same link.
  - The `focusable-container-focus--dark-390.png` frame: the revealed sentence, with the white outline
    around the "the link inside it" link.
  - The `focusable-container-focus--light-1280.png` frame: the same sentence with the dark outline.
  - The `underline-offsets-hover--light-1280.png` frame: the "Hover offset 3" link's underline sits
    visibly lower than its neighbours' underlines.
  - The `underline-offsets-hover--dark-390.png` frame: the same underline drop, and the hover color
    on that link.
  - The `body-emphasis-link-focus--dark-390.png` and `icon-links-focus--dark-390.png` frames: each
    shows the white outline, and the icon link's arrow is shifted.

### Claim 8: the populations

- **Change.** Frozen, exported constants in the `tests/setup.ts` file, each with TSDoc, hold the
  data the link-state case reads:
  - The `LINK_STATE_TARGETS` table names the link each link-state row drives.
  - The `LINK_STEP_PROPERTIES` list holds the properties a hover step writes.
  - The `LINK_PAINT_PROPERTIES` list holds the paint properties.
  - The `FOCUS_INDICATOR_PROPERTIES` list holds the properties a focus indicator paints through.
- **Assertion.** The case asserts that every link-state row has a target.
- **Proof.** The `tests/setup.test.ts` case "names a class selector for driven rows alone, and holds
  the link and focus property lists apart". The export-list case in the same file names each of
  those constants.
- **Mutation.** The `link-tables-absent` mutation removes those declarations. The table case and the export-list
  case fail:
  `AssertionError: expected [ 'CAPTURE_CONTROLS', …(17) ] to deeply equal [ 'CAPTURE_CONTROLS', …(21) ]`
  and `TypeError: Cannot convert undefined or null to object`.

### Findings F1, F2, and F3: the prose

- **F1.**
  - The `tests/setup.ts` file and the guide patch both read "These states lie outside the journey's
    variants".
  - The `VISIBILITY_SPECIMENS` TSDoc in the `app/browser/constants.ts` file reads "which are the
    conditions the focusable helper answers to".
- **F2.** The viewport sentence in the guide patch reads "the frame clips what an Overflow card
  under the `visible` value spills and gives the Overflow axis cards a bounded height to share".
- **F3.** The `VISIBILITY_COPY` constant adds "and a container that appears while the link inside it
  holds focus", and it ends "Press Tab to reach each link".
  - The `VisibilitySection.test.ts` file reads the paragraph from the constant.
  - The `Showcase.test.ts` file reads the specimen names from the tables.

### Round 1 rows, which the audit confirmed

- **Role-link hover and focus.** The `Role links` specimen with the `role-links-hover` and
  `role-links-focus` rows.
- **The emphasis link.** The `Body emphasis link` specimen with the `body-emphasis-link`,
  `body-emphasis-link-hover`, and `body-emphasis-link-focus` rows.
- **The scale specimens.** The `Link opacity`, `Underline offsets`, `Underline colors`, and
  `Underline opacity` specimens carry resting rows, and the hover rows are `link-opacity-hover`,
  `underline-offsets-hover`, and `underline-opacity-hover`. Each scale specimen writes its hover
  steps on a line of their own. At the `light-1280` variant the pointer reaches no point past about
  915 CSS pixels (`.orkestrel/veneer/units/fu-instruments/fu-hover-reach.log.txt`).
- **Icon links.** The `icon-links`, `icon-links-hover`, and `icon-links-focus` rows.
- **Focus rings.** The default ring and each role ring are specimens of their own:
  - resting rows run from the `default-focus-ring` row through the `danger-focus-ring` row;
  - focus rows run from the `primary-focus-ring-focus` row through the `danger-focus-ring-focus` row;
  - the focus ring journey case holds each ring inside its element frame.
- **The focusable container.** The `Focusable container` specimen with the `focusable-container`
  and `focusable-container-focus` rows.
- **P18.** § Showcase names each region in the order the showcase mounts it, and the link-classes
  link sits beside the color-and-background companion in § Tests.
- **Mutations** (round 1, `.orkestrel/veneer/units/fu-instruments/fu-mutations.log.txt`):
  - `role-rings-default`
  - `ring-frame-unpadded`
  - `link-state-undriven`
  - `container-always-hidden`
  - `default-ring-unrested`
  - `emphasis-link-merged`

  Each reddened its proof, and the red-first runs are appended to that log.

## States left unframed

- **The light and dark role rings under focus.** The mode-word law in the `tests/setup.test.ts`
  file refuses their stems. The `focus-ring.test.ts` style proof reads each role's ring under
  focus.
- **The `xxl` step, print media, and scrollbars.** These lie outside the journey's variants.
  - The installed Playwright launches headless Chromium with the `--hide-scrollbars` switch
    (`node_modules/playwright-core/lib/coreBundle.js`).
  - The `display.test.ts` proof reads the print medium, and the `overflow.test.ts` proof reads each
    overflow value.

## Observation

The `npm run test:setup` command exited 1 with `Tests  2 failed | 286 passed | 12 skipped (300)`.
Every failure sits in the `tests/setupServer.test.ts` file, which this unit does not touch:

- `Error: Hook timed out in 10100ms.`
- `Error: Test timed out in 10100ms.`
- `Error: Test timed out in 5000ms.`

The load average read 12.00. Per the coordinator's decision, I did not repeat that project's run. The scoped reading over the file this unit touched is in the gate table.

## Gates

Each command ran in the `/home/user/veneer-fu` directory. The `PATH` variable carried the npm 11
entry, and the `PLAYWRIGHT_BROWSERS_PATH` variable held `/opt/pw-browsers`. The result column
quotes each log.

| Command | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --check app/browser/constants.ts tests/setup.ts tests/setup.test.ts tests/app/browser/integration.test.ts tests/app/browser/sections/FocusRingSection.test.ts tests/app/browser/sections/LinkSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | the log ends at `> oxlint --config .oxlintrc.json --deny-warnings .` and prints no finding |
| `npm run check` | 0 | the log ends at `> vue-tsc --noEmit -p configs/app/tsconfig.browser.json` and prints no diagnostic |
| `npm run build:src` | 0 | `✓ built in 3.76s` |
| `npm run test:setup` | 1 | `Tests  2 failed \| 286 passed \| 12 skipped (300)` (see the observation) |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts` | 0 | `Tests  21 passed (21)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/LinkSection.test.ts tests/app/browser/sections/FocusRingSection.test.ts tests/app/browser/sections/VisibilitySection.test.ts tests/app/browser/Showcase.test.ts` | 0 | `Tests  14 passed (14)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:dark-390*" -t "drives a link of each link specimen\|reveals the focusable container"` | 0 | `Tests  2 passed \| 46 skipped (48)` |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-1280*" -t "drives a link of each link specimen\|reveals the focusable container"` | 0 | `Tests  2 passed \| 46 skipped (48)` |
| `npm run test:guides`, in a scratch copy under the `tmp/probe/` directory, with the `fu-shared-2.patch` file applied by `patch -p1` to the `cf5e447` guide | 0 | `Tests  20 passed (20)` |
| `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md`, in the same scratch copy | 0 | `All matched files use the correct format.` |

Round 1's unfiltered capture runs at the `light-1280` and `dark-390` variants each read
`Tests  48 passed (48)`. Round 2 leaves the ring case and the resting case as round 1 ran them. I
removed the scratch copy and every probe.

## Artifacts

All of the following sit under the `/home/user/veneer-fu/tmp/units/` directory:

- The `fu-report-2.md` file: this report.
- The `fu-mutations-2.log.txt` file: the round-2 mutation log, from the `fu-mutate-2.sh` and
  `fu-mutate-2.py` scripts. The log ends with the line confirming every touched file matches its
  recorded digest.
- The `fu-mutations.log.txt` file: the round-1 mutation log.
- The `fu-shared-2.patch` file: the guide patch against the `cf5e447` commit. It supersedes the
  `fu-shared.patch` file whole. It covers the § Showcase helper-key and viewport paragraphs with F2,
  the unframed-states paragraphs with F1, and the § Tests link move. It touches no ledger row.
- The `fu-2.diff` file: rounds 1 and 2 against the `cf5e447` commit. Its diffstat line reads
  `7 files changed, 683 insertions(+), 84 deletions(-)`.
- The `fu-2-status.txt` file.
- The `fu2-*` logs: the gate and capture logs.

The frames sit under the `/home/user/veneer-fu/tmp/capture/states/` directory.

## Touched files

- The `app/browser/constants.ts` file:
  - the link, focus ring, and visibility specimen tables and their TSDoc;
  - the `VISIBILITY_COPY` paragraph.
- The `tests/setup.ts` file:
  - the subject members and the registry rows;
  - the `CASCADE_KEYS` TSDoc;
  - the link-state target table and the property lists.
- The `tests/setup.test.ts` file: the removed exemption, the export list, and the table case.
- The `tests/app/browser/integration.test.ts` file:
  - the focus ring case;
  - the link-state case;
  - the focusable-container case.
- The `FocusRingSection.test.ts`, `LinkSection.test.ts`, and `VisibilitySection.test.ts` section
  proofs.
