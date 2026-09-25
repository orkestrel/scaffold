# Unit STATES report

The range thumb's press, disabled, and transition states are now read from painted frames, and a disabled `.btn-link` has a rendered case. Every acceptance gate exits 0. Each planted mutation fails its own case with an `AssertionError` and no other case, and each plant was restored byte for byte. No shared-file patch is needed. No deviation was raised.

Worktree `/home/user/veneer-sts`, branch `unit/sts`, base `2376710`. Nothing is committed.

## Touched files

- `tests/src/styles/components/form-range.test.ts`: adds the press case and the disabled case. Replaces the reduced-motion case, which read declarations, with a case that reads painted frames and keeps only the declaration facts the frames can't show. The `afterEach` hook also releases the pointer and the pane and removes the motion-factor override.
- `tests/src/styles/components/button.test.ts`: adds the disabled `.btn-link` case, covering the button and its anchor twin.
- `guides/veneer.md`: in § Form range classes, the proof prose now says how each thumb state is read (held, disabled, transition). The following sentence names the `driveHold` function by name, because the list moved it away from its earlier referent. § Tests links by file, and both files are already linked, so it gains no entry.

The diffstat against `2376710` is:

```
 guides/veneer.md                               |  34 ++++-
 tests/src/styles/components/button.test.ts     |  27 ++++
 tests/src/styles/components/form-range.test.ts | 183 +++++++++++++++++++++----
 3 files changed, 212 insertions(+), 32 deletions(-)
```

Review evidence:

- Diff: `tmp/units/sts.diff` (`git diff 2376710`).
- Status: `tmp/units/sts-status.txt` (`git status --short`), which lists only the three owned files as ` M`.

## Evidence re-readings

Every Evidence reading matched the worktree at `2376710`, apart from the command noted at the end of this section.

- `src/styles/components/_form-range.scss` carries these rules:
  - `.form-range:disabled { pointer-events: none }`;
  - the thumb transition through the `transition` mixin, whose `_mixins.scss` body emits the `reduced-motion` twin;
  - `.form-range#{$thumb}:active` with `color-mix(in srgb, var(--vn-palette-blue) 30%, var(--vn-palette-white-base))`;
  - `.form-range:disabled#{$thumb}` with `var(--bs-secondary-color)`.
- `form-range.test.ts` drove keyboard focus only. The case `gates the thumb transition on the reduced-motion preference and reads it from the motion tokens` read the gated rule's declarations.
- In `button.test.ts`, the case `keeps the link surface transparent and follows link colors` reads an enabled `.btn-link` only.
- `tests/src/styles/utilities/object-fit.test.ts` shoots with `page.screenshot({ element, save: false })` under `stagePane` and reads regions through the `measureVariation` and `readRegion` functions in `tests/setupBrowser.ts`.
- Pixel readers:
  - The installed `@orkestrel/test/browser` exports no region pixel reader for an in-memory shot. The `readFrame` function reads only a written file's size and bottom-row floor.
  - The installed `readHit` function is the `elementFromPoint` hit test at an element's centre, so the cases use it rather than calling `document.elementFromPoint` directly.
  - The cases use the setup readers `measureVariation`, `measureDifference`, and `readRegion` from `tests/setupBrowser.ts`.
- Searching `tests/` for `form-range` finds these other files: `setupStyles.test.ts`, `setupServer.ts`, `setup.ts`, `integration.test.ts` (styles), `conformance.test.ts`, the app browser tests, `setupServer.test.ts`, and `setupStyles.ts`. None of them asserts the rendered disabled or transition state, and none goes false under this change. The app journey (`tests/app/browser/integration.test.ts`) reads the held range's centre pixel against its focused pixel, and it is unchanged.
- The command in Acceptance criterion 2, `npx vitest run --project src:styles …`, exits with `No projects matched the filter "src:styles"`, because the root `vite.config.ts` registers no such project. Every styles run here uses `npx vitest run --config configs/src/vite.styles.config.ts <files>` after `npm run build:src:styles`, as the Orchestrator's correction states.

## Unknowns' answers

- **Does `document.getAnimations()` list the thumb's transition in Chromium 141?** It does not. During a held press, `document.getAnimations()` and `element.getAnimations()` both returned no animations while the thumb's fill visibly changed. The transition case therefore reads painted frames.
  - One probe ran at the shipped factor. The frame shot about 100 ms after the hold read `171,205,255`, which is between the rest fill `13,110,253` and the held fill `182,212,254`.
  - A second probe ran at factor 100. Shots about 500 ms apart read `15,111,253` and then `26,115,253`.
- **Does a held pointer keep `:active` long enough to shoot?** It does. After the `holdAccessible` function, `element.matches(':active')` read `true` at the first shot, 400 ms later, and 1.4 s later, and the value stayed `50`. The held centre read `182,212,254` (`#b6d4fe`) at both later shots.

## Cases

These cases are in `tests/src/styles/components/form-range.test.ts`:

- **`paints the held thumb with the blue palette entry mixed three tenths over white`** (added).
  - The case sets `--vn-factor-motion` to `0`, so each fill lands at once and this case does not depend on the reduced-motion twin.
  - Under a trusted hold it asserts `:active` and the value `50`.
  - The resting centre paints the resolved `--vn-palette-blue`.
  - The held centre paints the resolved `color-mix` and the release literal `rgb(182, 212, 254)`, and it differs from the resting fill.
- **`lets the pointer through the disabled host and paints its thumb with the secondary text color`** (added).
  - `pointer-events` resolves to `auto` on the enabled host and `none` on the disabled one.
  - The `readHit` function lands on the enabled control. On the disabled control it lands on the wrapper underneath.
  - The disabled centre paints one color, and that color equals a gauge range whose thumb a consumer sheet fills with `var(--bs-secondary-color)`. As a control, the enabled thumb differs from the gauge at every centre pixel.
  - The gauge is a thumb rather than a box because the token is translucent. A box composited over the track read `69,76,92`, while the thumb read `70,76,92`.
- **`runs the thumb fill transition with motion allowed and lands each fill at once under reduced motion`** (replaces `gates the thumb transition on the reduced-motion preference and reads it from the motion tokens`).
  - The end fills are shot first, at factor `0`.
  - At factor `50` (7.5 s) with motion allowed, the case asserts these readings:
    - the first shot after the hold is not the held fill;
    - a shot taken after the fill moves differs from the first shot, the rest fill, and the held fill.
  - Under `stageMedia({ motion: false })` at the same factor, the case asserts these readings:
    - the release transition is cancelled, so the fill is at rest at once;
    - the next hold lands the held fill at once;
    - the next release lands the rest fill at once.
  - The case keeps two declaration readings the frames can't show: the thumb's only media condition is `REDUCED_MOTION`, and the gated rule declares nothing beyond `transition-*` longhands.
  - It drops the old `transition-property`, `transition-duration`, `matchMedia`, and motion-token readings, because the rendered reading covers them.

This case is in `tests/src/styles/components/button.test.ts`:

- **`dims a disabled link button and its anchor twin to the secondary text and lets the pointer through`** (added). The case renders an enabled `.btn-link`, `<button class="btn btn-link" disabled>`, and `<a class="btn btn-link disabled">`.
  - The enabled control reads the link color, opacity `1`, and `pointer-events: auto`, and the `readHit` function lands on it.
  - Each disabled control reads the color resolved from `--vn-text-secondary` and the opacity from `--vn-button-opacity`, which is `0.65`. Each resolves `pointer-events: none`, and the `readHit` function passes through it to the wrapper.

## Mutation table

Each command ran after `npm run build:src:styles` on the planted tree. The runner is `tmp/units/sts-plant.py`. Every plant was restored by a file copy, confirmed with `filecmp`, `git status` was empty for the file, and the styles were rebuilt.

| Plant | Command | Failing assertion | Restored |
| --- | --- | --- | --- |
| `held-mix`: `_form-range.scss` held mix 30% → 60% | `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/form-range.test.ts -t 'paints the held thumb with the blue palette entry mixed three tenths over white'` | `AssertionError: expected [ +0, 1, 1, 1 ] to deeply equal [ +0, +0, +0, 1 ]`. 1 failed, 9 skipped. Log: `tmp/units/sts-plant-held-mix.log.txt` | byte-identical: True |
| `disabled-token`: disabled thumb fill `--bs-secondary-color` → `--bs-tertiary-color` | same config, `-t 'lets the pointer through the disabled host and paints its thumb with the secondary text color'` | `AssertionError: expected [ +0, 1, 1 ] to deeply equal [ +0, +0, 1 ]`. 1 failed, 9 skipped. Log: `tmp/units/sts-plant-disabled-token.log.txt` | byte-identical: True |
| `motion-twin`: thumb `@include transition(...)` → a bare `transition:` declaration, which drops the reduced-motion twin | same config, `-t 'runs the thumb fill transition with motion allowed and lands each fill at once under reduced motion'` | `AssertionError`: `settled` 0 → 1 and `collapsed` 0 → 1. 1 failed, 9 skipped. Log: `tmp/units/sts-plant-motion-twin.log.txt` | byte-identical: True |
| `button-opacity`: delete `opacity: var(--bs-btn-disabled-opacity);` from the `.btn:disabled` group in `_button.scss` | `npx vitest run --config configs/src/vite.styles.config.ts tests/src/styles/components/button.test.ts -t 'dims a disabled link button and its anchor twin to the secondary text and lets the pointer through'` | `AssertionError`: disabled `opacity` `"0.65"` → `"1"`. 1 failed, 87 skipped. Log: `tmp/units/sts-plant-button-opacity.log.txt` | byte-identical: True |

## Gate table

The runner is `tmp/units/sts-gates.sh`. Each log ends with `exit=<code>`.

| Gate | Command | Result | Log |
| --- | --- | --- | --- |
| check | `npm run check` | exit=0 | `tmp/units/sts-check.log.txt` |
| lint | `npm run lint:check` | exit=0 | `tmp/units/sts-lint.log.txt` |
| format | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --check` on the owned files | exit=0, "All matched files use the correct format." | `tmp/units/sts-format.log.txt` |
| scoped styles | `npm run build:src:styles`, then `npx vitest run --config configs/src/vite.styles.config.ts` on the form-range and button test files | exit=0, 2 files and 98 tests passed | `tmp/units/sts-styles.log.txt` |
| guides | `npm run test:guides` | exit=0, 20 passed | `tmp/units/sts-guides.log.txt` |
| policy | `npm run test:policy` | exit=0, 109 passed and 1 skipped | `tmp/units/sts-policy.log.txt` |
| styles project (observation) | `npm run test:src:styles` | exit=0, 115 files and 1508 tests passed. This run was under load from other worktrees. | `tmp/units/sts-styles-project.log.txt` |

## Shared-file patches

None. The cases need no helper outside the installed exports and `tests/setupBrowser.ts`.

Observation for the Orchestrator: the centre region literal `{ x: box.width / 2 - 2, y: box.height / 2 - 2, width: 4, height: 4 }` appears in each of the three form-range cases. `tests/app/browser/integration.test.ts` reads a frame's centre pixel inline as well. A `tests/setupBrowser.ts` helper returning an element's centre region could serve both, with its proof in `tests/setupBrowser.test.ts`. Both of those files are outside this unit's scope, so no carrier is named here.

## Deviation state

None raised. The criterion 2 command could not run as written, and the Orchestrator's correction resolved it. Choices settled within scope:

- the case titles and where each case sits in its file;
- a 4x4 device-pixel centre region;
- the zero and stretched motion factors, applied through the published `--vn-factor-motion` retune;
- the thumb-shaped gauge for the translucent disabled fill.

## Addendum: plant backups and restore verification

After the plants ran, the Orchestrator instructed that plant backups live under the worktree's `tmp/units/`. The executed driver, `tmp/units/sts-plant.py`, kept its backups in the Orchestrator's scratchpad instead. The paths were per plant: `plant-held-mix.orig`, `plant-disabled-token.orig`, `plant-motion-twin.orig`, and `plant-button-opacity.orig`. The driver never used the shared `plant-backup` path. The driver is kept unchanged, as the instrument that produced the logs.

Every restore was then checked against `HEAD` rather than against those backups. The log is `tmp/units/sts-restore-verify.log.txt`.

- Both `src/styles/components/_form-range.scss` and `src/styles/components/_button.scss` are byte-identical to `HEAD` by `cmp`, which exited 0. The `HEAD` copies are `tmp/units/sts-head-*.txt`.
- `git diff --stat -- src` and `git status --short -- src` are both empty.

This unit's files are removed from the scratchpad: the plant backups, `form-range.orig.ts`, `button.orig.ts`, and `probe.ts`. Nothing else there was touched.
