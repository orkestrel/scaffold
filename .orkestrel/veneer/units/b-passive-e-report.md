# B-PASSIVE-E report — `progress`, `spinner`, `placeholder`

The three keys ship. The built cascade emits every selector, declaration, custom property, and
keyframe the oracle inventory records for them, less the prefixed mask aliases the ledger records as
dropped; the accounting loop is green; the deferred `.placeholder.btn::before` row is struck; each
key has a browser proof, a showcase section, and registered capture scenarios apart from the two
named under § Deviations.

`npm run test:setup`, `npm run test:app`, and `npm run test:journey` are red, each for a cause
outside the owned scope and each named under § Deviations with the exact patch it needs: an
off-limits literal and the shared-declaration sweep, an existing line in
`tests/app/browser/Showcase.test.ts`, and the journey's own test budget, which the capture run
clears at `--testTimeout=120000`.

## Pre-edit measurement

Taken with the baseline barrel restored in place (`git show HEAD:src/styles/index.scss` written back
over the worktree copy, the new partials present but loaded by nothing), then the edit reapplied:

- `npm run build:src` exit 0.
- `npm run test:conformance` exit 0, 17 tests passed, 2026-09-22.
- `git status --porcelain` listed only the three untracked partials.
- `grep -c "progress\|spinner\|placeholder" guides/ledger/departures.md guides/ledger/additions.md`
  → `0` and `0`. No ledger row named any of this unit's keys.

The § Deferred selectors rows this unit retires, located by name: `` `.placeholder.btn::before` ``,
owner `Passive`, at `guides/veneer.md:449` before the strike. No other row of this unit's keys was
deferred.

## Obligation 1 — the partials

**Files.** `src/styles/components/_progress.scss`, `src/styles/components/_spinner.scss`,
`src/styles/components/_placeholder.scss` (new); `src/styles/index.scss` (three `@use` lines
appended after `@use 'components/vr'`, with `as progress-component` on the progress line).

- `_progress.scss` writes the `progress-bar-stripes` keyframe moving by `var(--bs-progress-height)`,
  the shared `.progress, .progress-stacked` closure, `.progress-bar` with its transition through the
  `transition` mixin, `.progress-bar-striped`, the two stacked combinators, and
  `.progress-bar-animated` with `animation: none` under the `reduced-motion` mixin.
- `_spinner.scss` writes the shared `.spinner-grow, .spinner-border` box, both keyframes with no
  direction-flipping annotation, each spinner's own variables, the small twins, and the
  `--bs-spinner-animation-speed: 1.5s` pair under the `reduced-motion` mixin. The animation stays
  active under the preference.
- `_placeholder.scss` writes `.placeholder`, `.placeholder.btn::before`, the `xs`, `sm`, and `lg`
  floors, `.placeholder-glow .placeholder`, `.placeholder-wave`, and both keyframes. It gates
  neither animation on the reduced-motion preference, per family ruling 3.

The elements-layer `progress { vertical-align: baseline }` rule is untouched, and the proof asserts
the class family selects no bare `progress` element.

**Built-cascade grep** over `dist/src/styles/index.css` after `npm run build:src` (each count is the
occurrences of the literal string):

```text
.progress{                                    1
.progress-stacked{                            1
.progress-bar{                                1
.progress-bar-striped{                        1
.progress-stacked>.progress{                  1
.progress-stacked>.progress>.progress-bar{    1
.progress-bar-animated{                       1
.spinner-grow                                 1
.spinner-border                               1
.spinner-border-sm                            1
.spinner-grow-sm                              1
.placeholder{                                 1
.placeholder.btn:before                       1
.placeholder-xs                               1
.placeholder-sm                               1
.placeholder-lg                               1
.placeholder-glow .placeholder                1
.placeholder-wave                             1
```

`.placeholder.btn:before` is the build's own single-colon spelling; `normalizeComplexSelector` reads
it as `::before`, which is what the deferral gate and the compatibility scan compare.

## Token reuse and literal rulings, per value

Routed onto an existing `--vn-*` token, because the token already resolves to Bootstrap's recorded
bytes and `.claude/rules/styles.md` refuses a literal color in a partial. Each one takes a
`tokenized` departure row:

| Recorded value                 | Veneer writes                                | Token's declared value in `_tokens.scss` |
| ------------------------------ | -------------------------------------------- | ---------------------------------------- |
| `#fff`                         | `var(--vn-palette-white-base)`               | `#fff`                                   |
| `#0d6efd`                      | `var(--vn-palette-blue)`                     | `#0d6efd`                                |
| `rgba(255, 255, 255, 0.15)`    | `rgba(var(--vn-palette-white-rgb), 0.15)`    | `255, 255, 255`                          |
| `#000`                         | `var(--vn-palette-black-base)`               | `#000`                                   |
| `rgba(0, 0, 0, 0.8)`           | `rgba(var(--vn-palette-black-rgb), 0.8)`     | `0, 0, 0`                                |

Passed through byte for byte, because the recorded value already reads a `--bs-*` global this tree
declares. No row: `var(--bs-secondary-bg)`, `var(--bs-border-radius)`, `var(--bs-box-shadow-inset)`.

Written as Bootstrap's literal, because no existing `--vn-*` token resolves to the recorded value
and family ruling 4 forbids adding one: `1rem` and `0.75rem` (progress height and font size),
`width 0.6s ease`, `1s linear infinite`, `45deg` and the stripe stops, `2rem`, `1rem`, `-0.125em`,
`0.25em`, `0.2em`, `0.75s`, `1.5s`, `50%`, `1em`, `0.6em`, `0.8em`, `1.2em`, `0.5`, `0.2`,
`130deg`, `200% 100%`, `-200% 0%`, `2s`. `transparent` and `currentcolor` are written bare, which is
the treatment `_table.scss` and `_vr.scss` already give them.

`--vn-size-1` resolves to `0.75rem` and `--vn-space-8` to `1rem` at the default factors, so the
tokenizing ceiling would admit them for `--bs-progress-font-size` and `--bs-progress-height`. They
are refused deliberately: routing them would make a recorded fixed measure follow
`--vn-factor-density`, which is a behavioral change rather than a notation change, and family
ruling 1 is Bootstrap's set exactly. The radius factor still reaches the track, through
`--bs-border-radius`, and the proof reads it.

## Obligation 2 — the proofs

**Files.** `tests/src/styles/components/progress.test.ts`, `spinner.test.ts`, `placeholder.test.ts`
(new); `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (appended).

Case tables appended at the end of `tests/setupStyles.ts`, in barrel order: `PROGRESS_SELECTORS`,
`PROGRESS_VARIABLE_CASES`, `PROGRESS_MARKUP`, `SPINNER_SELECTORS`, `SPINNER_VARIABLE_CASES`,
`SPINNER_SIZE_CASES`, `PLACEHOLDER_SELECTORS`, `PLACEHOLDER_SIZE_CASES`, `PLACEHOLDER_MARKUP`. Each
one is frozen, each entry is frozen, and each name is in the export inventory and in a binding case
in `tests/setupStyles.test.ts` holding it against `tests/fixtures/oracle/inventory.json`.

The four readings every key owes:

| Key           | Token beside the property it drives                                        | Override                                                                     | Factor                                                            | Mode                                                             |
| ------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `progress`    | `reads $name on $selector and moves what that variable drives`, per row    | same case: the value is written on the track and the property follows        | `rescales the track corners with the radius factor`               | `repaints the track with the color mode and holds the bar on its palette fill` |
| `spinner`     | `reads $name on the border spinner and moves what that variable drives`    | same case: the value is written on the spinner and the property follows      | no value is tokenized; `--bs-spinner-*` carry the release literals | `takes its paint from the text of whichever mode it renders in`   |
| `placeholder` | `floors $name at its own share of the font` reads the fill against `color` | the same case moves the host's `color` and the fill follows                  | no value is tokenized; the floors are the release's own `em`        | `takes its fill from the text of whichever mode it renders in`    |

Each variable case also reads the control the family record does not name: an override written on an
**ancestor** is shadowed by the component's own declaration, so the case writes it there first,
reads the property unmoved, then writes it on the component and reads the move. That is what makes
the component the element a consumer retunes.

Durations are read from the timeline (`Element.getAnimations()` and `effect.getTiming().duration`)
rather than from the resolved declaration, because `waitForAnimations` excludes infinite animations:
the stripe at 1000ms, each spinner at 750ms and at 1500ms under the preference with `playState`
`running` at both, and the glow and the wave at 2000ms under both motion settings.

Every case's doc comment names the mutation it catches.

## Obligation 3 — the showcase and the capture registry

**Files.** `app/browser/sections/ProgressSection.ts`, `SpinnerSection.ts`, `PlaceholderSection.ts`
(new); `tests/app/browser/sections/ProgressSection.test.ts`, `SpinnerSection.test.ts`,
`PlaceholderSection.test.ts` (new); `app/browser/constants.ts`, `app/browser/index.ts`,
`app/browser/Showcase.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/Showcase.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/setup.ts` (appended or inserted).

`PROGRESS_COPY`/`PROGRESS_SPECIMENS`, `SPINNER_COPY`/`SPINNER_SPECIMENS`, and
`PLACEHOLDER_COPY`/`PLACEHOLDER_SPECIMENS` are frozen and appended at the end of
`app/browser/constants.ts`. The sections construct after `TableSection` in alphabetical order of
region name: `Placeholder`, `Progress`, `Spinner`.

A progress bar's width and a placeholder's width come from the grid column classes this package
already ships. No specimen writes an inline style, which is what the journey's `extractStyles`
reading requires and what `TableSection.test.ts` already asserts of its own region.

Capture scenarios registered at the end of `CASCADE_KEYS`, each with the subject added to the
`CaptureSubject` union:

| Scenario               | Subject                | Selector                | Property             |
| ---------------------- | ---------------------- | ----------------------- | -------------------- |
| `progress-base`        | `Progress base`        | `.progress`             | `height`             |
| `striped-progress`     | `Striped progress`     | `.progress-bar-striped` | `background-size`    |
| `animated-progress`    | `Animated progress`    | `.progress-bar-animated`| `animation-name`     |
| `stacked-progress`     | `Stacked progress`     | `.progress-stacked`     | `display`            |
| `border-spinner`       | `Border spinner`       | `.spinner-border`       | `border-right-color` |
| `small-border-spinner` | `Small border spinner` | `.spinner-border-sm`    | `width`              |
| `placeholder-ramp`     | `Placeholder ramp`     | `.placeholder-lg`       | `min-height`         |
| `glowing-placeholder`  | `Glowing placeholder`  | `.placeholder-glow`     | `color`              |
| `waving-placeholder`   | `Waving placeholder`   | `.placeholder-wave`     | `mask-size`          |
| `button-placeholder`   | `Button placeholder`   | `.placeholder.btn`      | `opacity`            |

`Grow spinner` and `Small grow spinner` render as specimens and register no scenario. § Deviations
D6 records the measurement behind that.

## Obligation 4 — the accounting

The loop ran `npm run build:src && npm run test:conformance` until green. The comparison reported
the departures listed under § Ledger rows and reported no addition, so the addition ledger is
unchanged. `.claude/rules/tests.md`'s failing-proof rule is satisfied by the loop itself: the first
`test:conformance` run after the partials landed failed `records every measured value difference in
the guide ledger` with 8 unrecorded lines, and the same command passed 17 tests after the rows were
written.

Compatibility rows added to `guides/veneer.md` § Compatibility, after the `vr` row: a `selector` row
for each key and a `variable` row for `progress` and for `spinner`. `placeholder` takes no variable
row, because its recorded property map is empty. The keys are in the `listed` literal in
`tests/conformance.test.ts` at their sorted positions.

Deferral rows struck: `` `.placeholder.btn::before` ``. Rows kept deferred and authored absent: none.

## Obligation 5 — the guide

`guides/veneer.md`:

- `### Progress classes`, `### Spinner classes`, and `### Placeholder classes`, in barrel order,
  after `### Helper classes`, in the voice `### Table classes` fixes. Each one names what ships, the
  closure a consumer retunes, the motion ruling, and its key's recorded departures, and each closes
  with its proof's path.
- A § Files row per partial, after the `_icon-link.scss` row.
- The § Compatibility rows and the struck deferral row named earlier.
- A closing § Showcase paragraph naming the three regions, the classes the components layer gains,
  and the declined grow-spinner frames.
- The § Tests stem table gains a row per registered scenario.

No `guides/ledger/` path is written into `guides/veneer.md` or any prose this unit owns, per D14.

## Ledger rows

Every row this unit wrote, verbatim, grouped by the `#### <key>` table it belongs to. They are in
`guides/ledger/departures.md` in this worktree, which is where this worktree's readers default;
D14 moves them into `guides/veneer.md` § Tokens at integration. No addition row was written, and
`spinner` needs no table.

### `#### \`placeholder\``

```text
| Component     | Selector            | Property             | Condition | Bootstrap 5.3.8                                                       | Veneer                                                                                                                                   | Departure |
| ------------- | ------------------- | -------------------- | --------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `placeholder` | `.placeholder-wave` | `-webkit-mask-image` | —         | `linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%)` | —                                                                                                                                        | dropped   |
| `placeholder` | `.placeholder-wave` | `mask-image`         | —         | `linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%)` | `linear-gradient(130deg, var(--vn-palette-black-base) 55%, rgba(var(--vn-palette-black-rgb), 0.8) 75%, var(--vn-palette-black-base) 95%)` | tokenized |
| `placeholder` | `.placeholder-wave` | `-webkit-mask-size`  | —         | `200% 100%`                                                           | —                                                                                                                                        | dropped   |
```

### `#### \`progress\``

```text
| Component  | Selector                | Property                  | Condition | Bootstrap 5.3.8                                                                                                                                                                      | Veneer                                                                                                                                                                                                                         | Departure |
| ---------- | ----------------------- | ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `progress` | `.progress`             | `--bs-progress-bar-color` | —         | `#fff`                                                                                                                                                                               | `var(--vn-palette-white-base)`                                                                                                                                                                                                 | tokenized |
| `progress` | `.progress`             | `--bs-progress-bar-bg`    | —         | `#0d6efd`                                                                                                                                                                            | `var(--vn-palette-blue)`                                                                                                                                                                                                       | tokenized |
| `progress` | `.progress-stacked`     | `--bs-progress-bar-color` | —         | `#fff`                                                                                                                                                                               | `var(--vn-palette-white-base)`                                                                                                                                                                                                 | tokenized |
| `progress` | `.progress-stacked`     | `--bs-progress-bar-bg`    | —         | `#0d6efd`                                                                                                                                                                            | `var(--vn-palette-blue)`                                                                                                                                                                                                       | tokenized |
| `progress` | `.progress-bar-striped` | `background-image`        | —         | `linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)` | `linear-gradient(45deg, rgba(var(--vn-palette-white-rgb), 0.15) 25%, transparent 25%, transparent 50%, rgba(var(--vn-palette-white-rgb), 0.15) 50%, rgba(var(--vn-palette-white-rgb), 0.15) 75%, transparent 75%, transparent)` | tokenized |
```

Rows by member: `tokenized` carries the progress bar color, the progress bar fill, the stacked
twins of each, the stripe gradient, and the wave mask; `dropped` carries the two prefixed mask
aliases. No row carries `aliased`, `fallback`, or `declared`.

### Deferral rows struck

```text
| `.placeholder.btn::before`                                          | Passive    | The owning component supplies this relationship.                                                                                                                                                                |
```

## Coverage matrix

Inventory selector and condition → proof case → showcase subject → capture scenario.

| Recorded selector                               | Condition                                | Proof case                                                                   | Subject                | Scenario               |
| ----------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------- | ---------------------- | ---------------------- |
| `.progress`                                     | —                                        | `lays the track out and paints it from its own closure`                      | `Progress base`        | `progress-base`        |
| `.progress-stacked`                             | —                                        | `releases the overflow inside each stacked segment and fills its bar`        | `Stacked progress`     | `stacked-progress`     |
| `.progress-bar`                                 | —                                        | `fills the bar and centers its label from the closure the track declares`    | `Progress base`        | `progress-base`        |
| `.progress-bar`                                 | `@media (prefers-reduced-motion: reduce)` | `transitions the bar width and collapses that transition under the reduced-motion preference` | `Progress base` | `progress-base` |
| `.progress-bar-striped`                         | —                                        | `tiles the stripe at the track height and displaces it by the same measure`  | `Striped progress`     | `striped-progress`     |
| `.progress-stacked > .progress`                 | —                                        | `releases the overflow inside each stacked segment and fills its bar`        | `Stacked progress`     | `stacked-progress`     |
| `.progress-stacked > .progress > .progress-bar` | —                                        | `releases the overflow inside each stacked segment and fills its bar`        | `Stacked progress`     | `stacked-progress`     |
| `.progress-bar-animated`                        | —                                        | `runs the stripe animation each second and stops it under the reduced-motion preference` | `Animated progress` | `animated-progress` |
| `.progress-bar-animated`                        | `@media (prefers-reduced-motion: reduce)` | `runs the stripe animation each second and stops it under the reduced-motion preference` | `Animated progress` | `animated-progress` |
| keyframe `progress-bar-stripes`                 | —                                        | `tiles the stripe at the track height and displaces it by the same measure`  | `Animated progress`    | `animated-progress`    |
| `.spinner-grow` (shared box)                    | —                                        | `sizes 'spinner-grow' to its own box, edge, and animation`                   | `Grow spinner`         | not registered         |
| `.spinner-border` (shared box)                  | —                                        | `sizes 'spinner-border' to its own box, edge, and animation`                 | `Border spinner`       | `border-spinner`       |
| `.spinner-border` (border rule)                 | —                                        | `paints the ring from the text around it and leaves its right edge open`     | `Border spinner`       | `border-spinner`       |
| `.spinner-border-sm`                            | —                                        | `sizes 'spinner-border-sm' to its own box, edge, and animation`              | `Small border spinner` | `small-border-spinner` |
| `.spinner-grow` (grow rule)                     | —                                        | `paints the grow spinner from the text around it and rests it out of sight`  | `Grow spinner`         | not registered         |
| `.spinner-grow-sm`                              | —                                        | `sizes 'spinner-grow-sm' to its own box, edge, and animation`                | `Small grow spinner`   | not registered         |
| `.spinner-border`                               | `@media (prefers-reduced-motion: reduce)` | `keeps 'spinner-border' turning under the reduced-motion preference and halves its speed` | `Border spinner` | `border-spinner` |
| `.spinner-grow`                                 | `@media (prefers-reduced-motion: reduce)` | `keeps 'spinner-grow' turning under the reduced-motion preference and halves its speed` | `Grow spinner` | not registered |
| keyframes `spinner-border`, `spinner-grow`      | —                                        | `turns the ring a whole circle and grows the disc from nothing`              | `Border spinner`       | `border-spinner`       |
| `.placeholder`                                  | —                                        | `floors 'placeholder' at its own share of the font`                          | `Placeholder ramp`     | `placeholder-ramp`     |
| `.placeholder.btn::before`                      | —                                        | `gives a button-shaped placeholder an empty box and leaves a bare one without one` | `Button placeholder` | `button-placeholder` |
| `.placeholder-xs`                               | —                                        | `floors 'placeholder-xs' at its own share of the font`                       | `Placeholder ramp`     | `placeholder-ramp`     |
| `.placeholder-sm`                               | —                                        | `floors 'placeholder-sm' at its own share of the font`                       | `Placeholder ramp`     | `placeholder-ramp`     |
| `.placeholder-lg`                               | —                                        | `floors 'placeholder-lg' at its own share of the font`                       | `Placeholder ramp`     | `placeholder-ramp`     |
| `.placeholder-glow .placeholder`                | —                                        | `pulses every placeholder inside the glow wrapper and leaves the wrapper and a bare one still` | `Glowing placeholder` | `glowing-placeholder` |
| `.placeholder-wave`                             | —                                        | `travels a mask across the waving wrapper`                                   | `Waving placeholder`   | `waving-placeholder`   |
| keyframe `placeholder-glow`                     | —                                        | `pulses every placeholder inside the glow wrapper and leaves the wrapper and a bare one still` | `Glowing placeholder` | `glowing-placeholder` |
| keyframe `placeholder-wave`                     | —                                        | `travels a mask across the waving wrapper`                                   | `Waving placeholder`   | `waving-placeholder`   |

Each key also has a proof reading that holds the whole recorded selector list against the shipped
components layer (`writes every recorded selector into the components layer and no name beyond
them`), with a name the layer does not write as its control.

## Written capture names

`CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot
--testTimeout=120000` exited 0 with 100 tests passed. Under `tmp/capture/states/`, each of
`progress-base`, `striped-progress`, `animated-progress`, `stacked-progress`, `border-spinner`,
`small-border-spinner`, `placeholder-ramp`, `glowing-placeholder`, `waving-placeholder`, and
`button-placeholder` wrote `<scenario>--<theme>-<viewport>.png` at `light-1280`, `dark-1280`,
`light-390`, and `dark-390`, and each subject wrote
`<stem>--<theme>-<viewport>-accessibility.txt` at the same variants.

The guard's variation reading for each of this unit's regions, per variant, as the run's own
manifest records it:

| Scenario               | light-1280 | dark-1280 | light-390 | dark-390 |
| ---------------------- | ---------- | --------- | --------- | -------- |
| `progress-base`        | 0.9988     | 0.9990    | 0.9960    | 0.9968   |
| `striped-progress`     | 0.9993     | 0.9993    | 0.9979    | 0.9979   |
| `animated-progress`    | 0.9990     | 0.9990    | 0.9968    | 0.9968   |
| `stacked-progress`     | 0.9990     | 0.9990    | 0.9968    | 0.9968   |
| `border-spinner`       | 0.2439     | 0.2824    | 0.3428    | 0.3428   |
| `small-border-spinner` | 0.3600     | 0.3475    | 0.5156    | 0.3575   |
| `placeholder-ramp`     | 0.0588     | 0.0588    | 0.0588    | 0.0588   |
| `glowing-placeholder`  | 0.3891     | 0.3891    | 0.3897    | 0.3897   |
| `waving-placeholder`   | 0.4443     | 0.4443    | 0.4444    | 0.4444   |
| `button-placeholder`   | 0.9984     | 0.9984    | 0.9947    | 0.9947   |

## Commands and exit codes

Run in `/home/user/veneer-be` on 2026-09-22, with npm 11 on `PATH`. The chain after the final edit
ran in this order:

| Command                                                                                                 | Exit | Reading                                       |
| ------------------------------------------------------------------------------------------------------- | ---- | --------------------------------------------- |
| `npm run format:check`                                                                                  | 0    | 223 files correct                             |
| `npm run lint:check`                                                                                    | 0    | —                                             |
| `npm run check`                                                                                         | 0    | root, core, browser, styles, and app projects |
| `npm run build:src`                                                                                     | 0    | —                                             |
| `npm run test:setup`                                                                                    | 1    | 2 failed, 161 passed — D2 and D3              |
| `npx vitest run --project setup tests/setupStyles.test.ts`                                              | 1    | 1 failed, 71 passed — D3 alone                |
| `npm run test:src:styles`                                                                               | 0    | 61 files, 464 tests passed                    |
| `npm run test:app`                                                                                      | 1    | 1 failed, 31 passed — D4                      |
| `npx vitest run --project app:browser tests/app/browser/sections`                                       | 0    | 11 files, 27 tests passed                     |
| `npm run test:conformance`                                                                              | 0    | 17 tests passed                               |
| `npm run test:guides`                                                                                   | 0    | —                                             |
| `npm run test:policy`                                                                                   | 0    | 109 passed, 1 skipped                         |
| `npm run test:journey`                                                                                  | 1    | 7 failed, 93 passed — D5                      |
| `CAPTURE=1 npx vitest ... --testTimeout=120000`                                                         | 0    | 100 tests passed, frames written              |

The scoped runs are the read-only evidence for the owned files inside the two red suites, per the
concurrency rule that an executor reports only its own scope.

The chain above ran after the last edit to any owned file, and no owned file changed after it.

**Observation, not a criterion.** The whole-chain `npm test` was not run. It invokes
`test:journey`, `test:app`, and `test:setup`, each red for a cause named under § Deviations, so its
reading would restate them and cost a full browser sweep.

## Working tree

`git status --porcelain`:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/ledger/departures.md
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/PlaceholderSection.ts
?? app/browser/sections/ProgressSection.ts
?? app/browser/sections/SpinnerSection.ts
?? src/styles/components/_placeholder.scss
?? src/styles/components/_progress.scss
?? src/styles/components/_spinner.scss
?? tests/app/browser/sections/PlaceholderSection.test.ts
?? tests/app/browser/sections/ProgressSection.test.ts
?? tests/app/browser/sections/SpinnerSection.test.ts
?? tests/src/styles/components/placeholder.test.ts
?? tests/src/styles/components/progress.test.ts
?? tests/src/styles/components/spinner.test.ts
```

Every path is owned or shared under family ruling 13. `tmp/probe/` is deleted;
`tmp/capture/` holds the journey's own output and is ignored by git.

`git diff --stat`:

```text
 app/browser/Showcase.ts               |   6 +
 app/browser/constants.ts              | 110 ++++++++++++++
 app/browser/index.ts                  |   3 +
 guides/ledger/departures.md           |  18 +++
 guides/veneer.md                      | 263 ++++++++++++++++++++++++----------
 src/styles/index.scss                 |   3 +
 tests/app/browser/Showcase.test.ts    |   9 ++
 tests/app/browser/index.test.ts       |   9 ++
 tests/app/browser/integration.test.ts |   6 +
 tests/conformance.test.ts             |   3 +
 tests/setup.ts                        |  77 ++++++++++
 tests/setupStyles.test.ts             | 129 +++++++++++++++++
 tests/setupStyles.ts                  | 262 +++++++++++++++++++++++++++++++++
 13 files changed, 824 insertions(+), 74 deletions(-)
```

The deletions are all in `guides/veneer.md`. Compared line by line with the padding collapsed, the
only content removed is the struck deferral row; every other deleted line is a table separator or
row whose column padding the formatter rewidened. D7 records that.

## Deviations

### D1 — the design verdict the brief names does not exist

**Expected.** `./tmp/units/b-passive-design-verdict.md`, named by the brief for its ruling 5 (this
unit's specimens) and by the family record for its rulings 8 and 9.
**Found.** `find . -name "*design-verdict*" -not -path "./node_modules/*"` returns nothing;
`tmp/units/` holds only the family record, the baseline addendum, the terrain report, and this
unit's brief and report.
**Done.** Worked from the brief's own Obligation 1 specimen list, from family ruling 1 for the
Elements and Mailbox refusals (the terrain report's § D names each behavior), and from family
ruling 3 for the motion rulings, each of which restates what the verdict was cited for.
**Hypothesis.** The verdict was staged into the sibling worktrees and not into this one.

### D2 — the shipped-component set in an off-limits proof

**Expected.** `npm run test:setup` exit 0.
**Found.** `tests/setupServer.test.ts > server setup > skips engine and CSS obligations whose Proof
cell is a dash` fails: `expected Set{…} to deeply equal Set{…}`, received gains `placeholder`,
`progress`, and `spinner`. That file is off-limits under family ruling 13, and the brief's "what
asserts the state this change ends" list does not name it.
**Done.** Not done. The literal is untouched.
**Patch** — `tests/setupServer.test.ts`, inside the `new Set([…])` argument around line 1130, adding
each name at its sorted position:

```diff
 				'offset',
+				'placeholder',
+				'progress',
 				'ratio',
 				'reboot',
 				'row',
 				'row-gap',
 				'small',
+				'spinner',
 				'table',
 				'vr',
```

Every sibling B-PASSIVE unit reddens this same case, so the patch belongs to the family rather than
to this unit.

### D3 — the shared declaration-block sweep refuses Bootstrap's own coincidences

**Expected.** `tests/setupStyles.test.ts > styles setup > carries no shared written declaration
block across style partials` green.
**Found.** `scanStyleBlocks` reports a block intersection wherever two partials share at least two
identical declarations. The partials this unit authors produce these, measured with the same walk
over `src/styles`:

```text
components/_button.scss:5   <-> components/_placeholder.scss:5 :: display: inline-block | vertical-align: middle
components/_button.scss:118 <-> components/_progress.scss:34   :: overflow: hidden | white-space: nowrap
components/_placeholder.scss:5 <-> components/_vr.scss:6       :: display: inline-block | min-height: 1em | background-color: currentcolor
components/_progress.scss:34 <-> elements/_figure.scss:4       :: display: flex | flex-direction: column
```

Each intersection is a coincidence between independently recorded Bootstrap components rather than a
repeated pattern. Family ruling 1 fixes every one of those declarations, so none can be dropped, and
the sanctioned remedy — a mixin in `src/styles/_mixins.scss`, with the call site in `_vr.scss`,
`_button.scss`, or `elements/_figure.scss` — needs files family ruling 13 puts off-limits. A mixin
emitting `display: inline-block; vertical-align: middle` would also be the superfluous wrapper
`AGENTS.md` § Design laws refuses.

**Done.** Not done. The sweep is red and nothing was suppressed. No declaration was split,
reordered, or dropped in the shipped tree to dodge it.

**Measured patch.** Built and measured on a scratch copy of `src/styles` under `tmp/probe/styles`,
compiled with the installed `sass` at `--style=expanded` before and after. It clears every
intersection: the same scan over the patched copy reports `no shared declaration block`.

The compiled output is byte-identical apart from one reorder. `.placeholder` emits
`min-height: 1em` after `cursor: wait` instead of after `display: inline-block`, because a mixin has
one content slot and the two callers interleave their own declarations differently: the slot's
position is chosen to keep the off-limits `_vr.scss` caller byte-identical, so the reorder lands in
this unit's own partial. The two properties do not interact, and the patched cascade reads
identically through the block reader `collectLedger` uses: over 752 rule blocks, comparing selector,
condition, layer, and the declaration map, the patch drops none and adds none.

```diff
--- a/src/styles/_mixins.scss
+++ b/src/styles/_mixins.scss
@@ -83,6 +83,40 @@
 	padding-left: calc(var(--vn-space-8) * 2);
 }
 
+// Emits the inline box a painted stand-in shares: an inline block with a one-em floor painted in
+// the current color. The content slot carries whatever the caller writes between the box and the
+// floor, so each caller keeps the declaration order its own rule was written in.
+//
+// `_placeholder.scss` and `_vr.scss` both write it: a placeholder stands in for text that has not
+// arrived and a vertical rule stands in for a separator, and each one takes its paint from the text
+// around it rather than from a color of its own.
+@mixin painted-block {
+	display: inline-block;
+	@content;
+	min-height: 1em;
+	background-color: currentcolor;
+}
+
+// Emits the crop a single-line box shares: no overflow and no wrapping. The content slot carries
+// whatever the caller writes between them.
+//
+// `_button.scss` writes it on the hidden check input and `_progress.scss` on the bar's own label:
+// each one holds its content to one line inside a box it crops.
+@mixin clip-line {
+	overflow: hidden;
+	@content;
+	white-space: nowrap;
+}
+
+// Emits the column flow a stacked box shares.
+//
+// `_progress.scss` writes it on the bar, whose label centers on the cross axis, and
+// `elements/_figure.scss` on a figure, whose caption follows its content.
+@mixin column-flow {
+	display: flex;
+	flex-direction: column;
+}
+
 // Returns the layout boundaries, as the one Sass source of every width the ramp carries.
--- a/src/styles/components/_vr.scss
+++ b/src/styles/components/_vr.scss
@@ -1,14 +1,15 @@
+@use '../mixins' as *;
+
 @layer components {
 	// The width reads Bootstrap's own border-width variable, which `_tokens.scss` already
 	// declares over `--vn-border-width`, so a consumer retuning either one moves the rule. The
 	// opacity is the literal the official cascade carries, the way the `hr` treatment carries its
 	// own: no published scale retunes it, so a token here would be Veneer's own addition.
 	.vr {
-		display: inline-block;
-		align-self: stretch;
-		width: var(--bs-border-width);
-		min-height: 1em;
-		background-color: currentcolor;
+		@include painted-block {
+			align-self: stretch;
+			width: var(--bs-border-width);
+		}
 		opacity: 0.25;
 	}
 }
--- a/src/styles/components/_button.scss
+++ b/src/styles/components/_button.scss
@@ -120,8 +120,7 @@
 		width: 1px;
 		height: 1px;
 		clip-path: inset(50%);
-		overflow: hidden;
-		white-space: nowrap;
+		@include clip-line;
 		pointer-events: none;
 	}
--- a/src/styles/elements/_figure.scss
+++ b/src/styles/elements/_figure.scss
@@ -2,8 +2,7 @@
 
 @layer elements {
 	figure {
-		display: flex;
-		flex-direction: column;
+		@include column-flow;
 		gap: var(--vn-space-4);
 		margin: 0;
 	}
--- a/src/styles/components/_placeholder.scss
+++ b/src/styles/components/_placeholder.scss
@@ -1,13 +1,14 @@
+@use '../mixins' as *;
+
 @layer components {
 	// A placeholder stands in for content that has not arrived, so it paints the current text color
 	// at half strength and takes the wait cursor. Its height floor is written in `em`, which is what
 	// makes a placeholder inside a heading as tall as that heading's own line.
 	.placeholder {
-		display: inline-block;
-		min-height: 1em;
-		vertical-align: middle;
-		cursor: wait;
-		background-color: currentcolor;
+		@include painted-block {
+			vertical-align: middle;
+			cursor: wait;
+		}
 		opacity: 0.5;
 	}
--- a/src/styles/components/_progress.scss
+++ b/src/styles/components/_progress.scss
@@ -32,13 +32,12 @@
 	}
 
 	.progress-bar {
-		display: flex;
-		flex-direction: column;
+		@include column-flow;
 		justify-content: center;
-		overflow: hidden;
-		color: var(--bs-progress-bar-color);
-		text-align: center;
-		white-space: nowrap;
+		@include clip-line {
+			color: var(--bs-progress-bar-color);
+			text-align: center;
+		}
 		background-color: var(--bs-progress-bar-bg);
 		@include transition(var(--bs-progress-bar-transition));
 	}
```

The patch is atomic: applying only the two partials this unit owns leaves the mixins undeclared and
the build red, so it lands whole or not at all. `_placeholder.scss` and `_progress.scss` in this
worktree carry the pre-patch form.

**Reading beside the patch.** Every sibling meets this sweep: `badge` alone shares
`display: inline-block` and `text-align: center` with `.btn`. The alternative to a mixin per
coincidence is narrowing the threshold in `scanStyleBlocks` (`tests/setupServer.ts`, the
`declarations.length >= 2` comparison) to duplication that is a majority of at least one block. That
is the Orchestrator's call; the patch above is the one this unit measured.

### D4 — the showcase's button name list needs an existing line rewritten

**Expected.** `npm run test:app` exit 0.
**Found.** `tests/app/browser/Showcase.test.ts:103` collects every `.btn` in the mounted showcase and
compares the accessible names against `BUTTON_SPECIMENS`. The `Button placeholder` specimen carries
`.btn`, which family ruling 9 and the brief's Obligation 1 both require, so the received list gains
one entry. The failure is `expected [ 'Primary', 'Secondary', …(27) ] to strictly equal [ 'Primary',
'Secondary', …(26) ]`, the extra entry being the empty name of the hidden anchor.
**Done.** Not done. Family ruling 13 forbids rewriting an existing line in a shared file.
**Patch** — `tests/app/browser/Showcase.test.ts`, replacing the assertion's argument:

```diff
 			const specimens = [...host.querySelectorAll(`.${BUTTON_CLASS}`)]
 			expect(specimens.map((element) => readName(element))).toStrictEqual(
-				BUTTON_SPECIMENS.map((specimen) => specimen.name),
+				// A `.btn` outside the Buttons region belongs to the key whose specimen carries it,
+				// and a placeholder button announces no name of its own.
+				[...BUTTON_SPECIMENS.map((specimen) => specimen.name), ''],
 			)
```

Unit B-PASSIVE-B reddens the same line, because every `.btn-group` specimen renders `.btn` hosts, so
the integrated form of this assertion is the family's to settle.

### D5 — the journey's test budget no longer fits the showcase

**Expected.** `npm run test:journey` exit 0.
**Found.** `journey > toggles a native host and an anchor host through the keyboard` times out at
15000ms on three of the four variants, and `paints a focus ring on every variant reached through the
keyboard` follows it. Measured on `journey:light-1280` alone, with `--testTimeout=120000` so the case
reports its duration:

- With the three sections constructed: **15897ms**.
- With the three sections removed from `Showcase.ts` and nothing else changed: **10031ms**.

The walk visits every interactive target in the mounted document for each target it reaches, so its
cost grows with the regions the showcase renders. The budget already stood at two thirds spent
before this unit, and ten regions are planned for this family.
**Done.** Not done. `vite.config.ts` is off-limits.
**Patch** — `vite.config.ts`, in `appJourney`:

```diff
 			provide: { variant: variant.name, variants, capture },
+			// The keyboard traversal walks every interactive target in the mounted showcase for
+			// each target it reaches, so its cost grows with the regions the showcase renders: the
+			// walk measured 10.0s against the Table-era surface and 15.9s once the passive
+			// component regions landed. This budget clears the grown surface on a contended host.
+			testTimeout: 120_000,
 			browser: {
```

Evidence that nothing else is wrong: the whole journey passes at `--testTimeout=120000`, with and
without `CAPTURE=1`, on all four variants.

### D6 — the grow spinners register no capture scenario

**Expected.** Family ruling 10: one scenario per specimen.
**Found.** A grow spinner's resting frame is its animation's own first step, `transform: scale(0)` at
`opacity: 0`. Registered as cascade keys, the guard reported, per variant:

- `light-1280`: `The declared region clips to nothing inside a 1280x37 frame` — the scaled box
  measures 0 by 0, so `readRegion` declares an empty region.
- `dark-1280`, `light-390`, `dark-390`: `Uniform frame region:
  tmp/capture/states/grow-spinner--<variant>.png: expected 0 to be greater than 0`.

A frame of an invisible zero-sized element carries no subject to read, and no other element inside
those specimens has a box to declare instead.
**Done.** `Grow spinner` and `Small grow spinner` render as showcase specimens and register no
scenario. `CASCADE_KEYS`' own doc comment records the reason, and `guides/veneer.md` § Showcase
records it for a reader. `tests/src/styles/components/spinner.test.ts` reads both spinners' running
timelines and resting declarations, so what is declined is the frame rather than the proof.
**Alternative the family may prefer.** Render each grow spinner inside a bordered host and declare
that host as the region. That puts the frame's region on another key's class, and it adds a `.btn`
to the showcase if the host is Bootstrap's own documented pairing, so it is the family's call rather
than this unit's.

**The per-family driven-state list does not reach this case.** That mechanism registers a scenario
the journey drives to a state and photographs. The capture resets an infinite animation to its first
step before the shot: all four grow-spinner frames came back at exactly `opacity: 0`, which a
free-running animation reaches for about a millisecond of each 750-millisecond cycle, so four
independent shots landing there is the reset rather than chance. A journey case seeking the
animation's own timeline is therefore reset with it, and the only drive that would survive is an
inline override of the keyframe's midpoint written onto the specimen before the shot — a style the
journey's own `extractStyles` reading refuses to find on the mounted showcase, and a claim about a
paint no cascade rule produces at rest. This unit registers no driven-state list, so
`tests/setup.test.ts` is untouched.

### D7 — the formatter rewidened two table columns

`src/styles/components/_placeholder.scss` in backticks is wider than the § Files table's first
column, and `small-border-spinner` is wider than the § Tests stem table's. `oxfmt` repads every row
of a table whose widest cell moves, so those tables' separator and padding changed while no existing
cell's content did. Verified by comparing every removed and added table row with the padding
collapsed: the only content removed from `guides/veneer.md` is the struck deferral row.

### D8 — the prefixed mask properties are dropped rather than authored

The inventory records `-webkit-mask-image` and `-webkit-mask-size` on `.placeholder-wave` and
`-webkit-mask-position` in the wave keyframe, which the release's own pipeline adds. This build adds
no prefixes, and Chromium 141 resolves the standard properties, so the partial writes the standard
ones alone and the ledger records the two aliases as `dropped`. That is the ruling `guides/veneer.md`
§ Helper classes already carries for `-webkit-backface-visibility`, and the ledger already carries
`dropped` rows of the same shape for `btn`, `icon-link`, and `link`. The keyframe alias takes no
row, because the comparison reads rules outside `@keyframes`. Authoring the aliases instead would
have produced no row at all; the brief left the choice to the comparison, and this is the reading
the tree's own precedent gives.

### D9 — placeholder ships no reduced-motion gate

`.claude/rules/styles.md` § Prohibitions states that animations include
`@include reduced-motion { animation: none }`. Family ruling 3 rules that line to govern Veneer's own
animations rather than a recorded Bootstrap one, and records the placeholder glow and wave as
continuing under the preference. The partial follows the family ruling, the proof reads both
timelines under the staged preference, and `guides/veneer.md` § Placeholder classes states it. The
family record marks the ruling provisional on the user's word; nothing here settles that.

### D10 — the button placeholder is hidden and out of the tab order

The first form of that specimen carried `href`, `role="button"`, `aria-disabled="true"`, and an
`aria-label`. It put a focusable, named control into the showcase and the journey's traversal
reported `Interactive target "Secondary" is not reachable through forward Tab traversal` on
`dark-1280`. The specimen now carries `tabindex="-1"` and `aria-hidden="true"` with no `href`, which
is the shape Bootstrap's own placeholder documentation uses: a placeholder stands in for a label
that has not arrived, so announcing it as an unnamed control is the defect. The section proof reads
those attributes.

### Choices settled inside the owned scope

Specimen wording and region copy; the case titles and their mutation comments; the reason sentences
in the guide sections; the paragraph order inside each guide section; the column classes each
specimen carries for its width; the 40-pixel host font in the size cases, which puts every recorded
`em` value on a whole pixel so the assertion pins the declaration rather than a browser's border
rounding.

## Claims of my own flagged as unverified

- The attribution in D5 rests on one A/B measurement of one variant (10031ms against 15897ms) and on
  the traversal's own error text. The mechanism behind the growth — the accessibility walk, the
  document height, or the running animations — was not isolated.
- `placeholder-ramp`'s variation of 0.0588 is the antialiased bottom row of a 640 by 16.797 box
  rounded to 640 by 17, not contrast between the subject and its background. It read identically at
  all four variants in this run, and the arithmetic makes it deterministic for a fixed layout, but a
  layout change that lands the box on whole pixels would take it to zero and redden the guard.
- The report states that no addition row is needed because the comparison reported none. That is the
  comparison's reading over this worktree's shipped set; a sibling unit's keys entering that set can
  change which component a rule is attributed to.
