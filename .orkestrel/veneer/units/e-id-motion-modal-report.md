# E-ID-MOTION-MODAL report

Unit: `opus` on Opus 5.5, native, sole writer in `/home/user/veneer-mmod` (branch `unit/mmod`, base `73326c7`). Every
acceptance criterion reads green in its log. The modal dialog enters from `scale(0.96)` to `none` over
`--vn-motion-panel` on `--vn-ease-panel`. The modal host and both backdrops fade opacity over `--vn-motion-panel` on
`--vn-ease-out`, and the backdrops take it through the `overlay-backdrop` mixin. The unit departs from the brief's wording
in a choice it settled within scope: the ledger classes the host and backdrop transitions as additions, not
departures (see the Unknowns section).

## Searches

- **Brief evidence re-taken at `73326c7`.** Each reading matched the brief: `_modal.scss` `.modal.fade .modal-dialog`
  had `translate(0, -50px)` and `transition(transform 0.3s ease-out)`; `.modal-static` had `scale(1.02)`;
  `.modal-backdrop` had `--bs-backdrop-opacity: 0.5` and included the mixin; the `overlay-backdrop` mixin wrote no
  transition; `_tokens.scss` declared the panel duration and both easing tokens as the brief states.
- **`grep -rnE -- "0\.3s|300ms|0\.15s|150ms|translate\(0, -50px\)" tests/src/browser tests/app`** (exit 0). The hits
  are `Delegate.test.ts` around line 1376 and `Alert.test.ts` around line 426 (each loads its own scene CSS),
  `Tab.test.ts` around lines 64 and 69, `Toast.test.ts` around line 74, and `Popover.test.ts` around line 208. Each hit
  pins a nav link, a toast, a popover, or a test-local `.fade`. None names a modal, a backdrop, or an offcanvas, so no
  engine proof and no showcase proof pins a value this unit changes.
- **`grep -rn -- "-50px\|0\.3s\|300ms" tests/ guides/`** (outside `tests/src/browser` and `tests/app`). The only owned
  pin was `tests/src/styles/components/modal.test.ts`, in the `modal motion` block (`[offset, 'transform', '0.3s',
  'ease-out']`). `offcanvas.test.ts` pins the panel's `0.3s ease-in-out`, which belongs to E-ID-MOTION-OFFCANVAS and
  was left alone. `tests/fixtures/oracle/inventory.json` records the release and was left alone. The `form-*`,
  `carousel`, `fade`, `icon-link`, and `tokens` hits are other components' pins.
- **`grep -rln "modal-backdrop\|offcanvas-backdrop\|overlay-backdrop" tests/src/styles tests/*.ts`**. Hits:
  `modal.test.ts`, `offcanvas.test.ts`, `tests/src/styles/fixtures/mixins.scss` (the mixin fixture, read and not
  edited), `tests/setup.ts`, `tests/setupStyles.test.ts`, and `tests/setupStyles.ts`. The proofs are in
  `modal.test.ts`, `offcanvas.test.ts` (the backdrop case in `offcanvas classes`), and `mixins.test.ts`, which pins the
  mixin through the fixture.

## Unknowns' answers

- **Host timing form: the `.modal` rule, through the `transition` mixin.** This is the only form open to the owned set.
  A `.modal.fade` selector would add a selector outside the release record. `MODAL_SELECTORS` in `tests/setupStyles.ts`
  (shared) is bound to that record by `tests/setupStyles.test.ts` (off-limits), and the owned `modal.test.ts` case
  refuses any modal selector outside that list. `.modal` and `.fade` tie on specificity in the `components` layer, and
  the barrel loads `components/modal` after `components/fade`, so `.modal` wins on a fading modal. A modal without the
  `fade` class holds its opacity, and the host case proves that such a modal starts no transition.
- **Backdrop form: the mixin's `&.fade` compound.** The mixin writes the transition inside `&.fade` through the
  `transition` mixin. `.modal-backdrop.fade` and `.offcanvas-backdrop.fade` outrank `.fade`, and both selectors are
  already in the release record. A backdrop without the `fade` class takes no transition, the same as the release.
- **The offcanvas backdrop moves in this unit.** At base it read `[150, 'ease-out']`. It reads `250` ms on
  `ease-out` from `0` to `0.5` with no blur, doubles at factor `2`, and runs no transition at factor `0` or under the
  reduced-motion preference.
- **Engine and showcase pins: none.** See the Searches section. The engine proofs and `npm run test:app` pass on the
  changed cascade.
- **Deviation, recorded and settled within scope: additions, not departures.** The ledger classes the host and
  backdrop transitions as `declaration` additions, because the release writes no `transition` on `.modal`,
  `.modal-backdrop.fade`, or `.offcanvas-backdrop.fade`. They are recorded in § Additions with their reduced-motion
  pairs. The dialog's `transform` and `transition` are recorded in § Departures. The guide states why under § Modal
  classes.

## Failing-first and green

The command for both runs is `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts
tests/src/styles/components/modal.test.ts tests/src/styles/components/offcanvas.test.ts
tests/src/styles/mixins.test.ts`, run through `mmod-instruments/mmod-styles.sh`.

The following table lists each run with its log, result, and load.

| Run | Log | Result | `/proc/loadavg` |
| --- | --- | --- | --- |
| Base cascade, with the proofs | `mmod-instruments/mmod-red.log.txt` | exit 1: 7 failed, 104 passed (111), each an `AssertionError` | `3.33 3.74 7.45` |
| After the rules | `mmod-instruments/mmod-green.log.txt` | exit 0: 111 passed (111) | `3.60 3.84 5.27` |

The green log is the final run. It includes the no-`fade` control that was added to the host case after the red run.
That case was already red at base on its first assertion (`[150, 'ease-out', '0']` against `[250, …]`).

These are the failing-first tests and their base readings:

- `modal motion > enters the dialog from a 0.96 scale to none over the panel duration on the panel curve as the show
  class joins, and leaves on the same timing`: `'matrix(1, 0, 0, 1, 0, -50)'` against `'matrix(0.96, 0, 0, 0.96, 0,
  0)'`.
- `modal motion > bounces a shown dialog to a 1.02 scale over the panel duration on the panel curve as the static class
  joins`: `[300, 'ease-out']` against `[250, …]`.
- `modal motion > fades the modal host over the panel duration on the ease-out curve in place of the feedback timing of
  the fade rule`: `[150, 'ease-out', '0']` against `[250, 'ease-out', '0']`.
- `modal motion > doubles the running duration of the host, the dialog, and the backdrop at a doubled motion factor,
  and runs none at a zero factor or under the reduced-motion preference`: `[2, 1, 2]` against `[2, 2, 2]`.
- `modal backdrop > fades the backdrop from transparent to its opacity over the panel duration on the ease-out curve,
  with no blur`: `[150, 'ease-out', '0']` against `[250, 'ease-out', '0']`.
- `offcanvas classes > fades the backdrop in over the panel duration on the ease-out curve, rescaled by the motion
  factor and still under the reduced-motion preference`: `[150, 'ease-out']` against `[250, 'ease-out']`.
- `declaration mixins > fades a fading backdrop to its opacity over the panel duration on the ease-out curve, and
  leaves a backdrop without the fade class still`: `[150, 'ease-out', '0']` against `[250, 'ease-out', '0']`.

The `modal motion` block's former cases were replaced: the entrance case that pinned `0.3s ease-out` and
`-50`, and the static-scale case. Every proof reads the running transition through `sampleTransition` and compares it
with the panel duration and easing, which `readDuration` and `readStyle` resolve on a specimen. The factor cases assert
the ratio `doubled / base` as `2`. The `afterEach` hooks in `modal.test.ts` and `offcanvas.test.ts` also clear the
`--vn-factor-motion` property.

## Rules as written

```scss
// src/styles/components/_modal.scss, inside `.modal`
@include transition(opacity var(--vn-motion-panel) var(--vn-ease-out));

// src/styles/components/_modal.scss
.modal.fade .modal-dialog {
	transform: scale(0.96);
	@include transition(transform var(--vn-motion-panel) var(--vn-ease-panel));
}
// `.modal.modal-static .modal-dialog { transform: scale(1.02) }` is unchanged and runs on the dialog's transition.

// src/styles/_mixins.scss, `overlay-backdrop`
&.fade {
	opacity: 0;
	@include transition(opacity var(--vn-motion-panel) var(--vn-ease-out));
}
```

The comments in the partial and the mixin were updated to match. Rendered readings on this host's Chromium: the dialog
starts at `matrix(0.96, 0, 0, 0.96, 0, 0)` and ends at `none`, over 250 ms on `cubic-bezier(0.32, 0.72, 0, 1)`. The
host and both backdrops run 250 ms on `ease-out`, from `0` to `1` for the host and from `0` to `0.5` for each backdrop.

## Guide rows

These are the rows `npm run test:conformance` printed after the rules changed (log
`mmod-instruments/mmod-conformance-first.log.txt`, exit 1 before the rows, load `2.83 3.46 6.97`). They are recorded in
`guides/veneer.md`. The departure rows sit beside the existing `modal` rows in the table under the `toast` heading:

```text
modal | .modal.fade .modal-dialog | transform | — | translate(0, -50px) | scale(0.96) | declared
modal | .modal.fade .modal-dialog | transition | — | transform 0.3s ease-out | transform var(--vn-motion-panel) var(--vn-ease-panel) | tokenized
```

The addition rows are appended at the end of the § Additions table, each with a `Reason` cell:

```text
modal | .modal { transition } | — | declaration | opacity var(--vn-motion-panel) var(--vn-ease-out)
modal | .modal { transition } | @media (prefers-reduced-motion: reduce) | declaration | none
modal | .modal-backdrop.fade { transition } | — | declaration | opacity var(--vn-motion-panel) var(--vn-ease-out)
modal | .modal-backdrop.fade { transition } | @media (prefers-reduced-motion: reduce) | declaration | none
offcanvas | .offcanvas-backdrop.fade { transition } | — | declaration | opacity var(--vn-motion-panel) var(--vn-ease-out)
offcanvas | .offcanvas-backdrop.fade { transition } | @media (prefers-reduced-motion: reduce) | declaration | none
```

These prose edits were made in `guides/veneer.md`:

- **§ Modal classes, dialog paragraph:** the `0.96` entrance, the panel timing, the static bounce on the same timing, the
  host fade and why `.modal` outranks `.fade`, and the reduced-motion behaviour.
- **§ Modal classes, backdrop paragraph:** the `0` to `0.5` fade on the panel timing with no blur, written by the mixin
  on the `.fade` compound and shared with the offcanvas backdrop.
- **§ Modal classes, departures and proof:** a departure bullet for the dialog entrance, a sentence routing the host and
  backdrop fades to § Additions, and an updated proof enumeration.
- **§ Offcanvas classes:** a sentence on the backdrop's fade, and the proof enumeration now names the backdrop fade.
- **Offcanvas engine section:** "the fade partial fades the backdrop through its `.fade` rule" now reads "the
  `overlay-backdrop` mixin fades the backdrop over the `--vn-motion-panel` token". The panel's `0.3s` wording is
  unchanged, because the panel belongs to E-ID-MOTION-OFFCANVAS.

After the rows were recorded, `npm run test:conformance` exited 0 with 29 passed (`mmod-instruments/mmod-conformance.log.txt`,
load `1.67 2.46 5.98`).

## Plant table

`mmod-instruments/mmod-plant.sh` ran each plant. The script backs up the file, applies one edit, rebuilds the styles, runs the
owned proof files, restores the file from the backup, and runs `cmp`.

| Plant | Edit | Failing proof and assertion | Log | Restored |
| --- | --- | --- | --- | --- |
| `translate` | `_modal.scss`: `transform: scale(0.96)` becomes `transform: translate(0, -50px)` | 1 failed, 110 passed: the dialog entrance case, `AssertionError: expected 'matrix(1, 0, 0, 1, 0, -50)' to be 'matrix(0.96, 0, 0, 0.96, 0, 0)'` | `mmod-instruments/mmod-plant-translate.log.txt` | `restored=identical` |
| `backdrop-feedback` | `_mixins.scss`: the transition include in `&.fade` removed, which returns both backdrops to the `.fade` rule's feedback timing | 4 failed, 107 passed: the modal backdrop case, the factor case (`AssertionError: expected [] to deeply equal [ '(prefers-reduced-motion: reduce)' ]`), the offcanvas backdrop case, and the mixin case, each `AssertionError` reading `150` against `250` | `mmod-instruments/mmod-plant-backdrop-feedback.log.txt` | `restored=identical` |

## Gate table

Each gate is logged under `tmp/units/` with `exit=` and `/proc/loadavg` appended.

| Gate | Log | Result | Load |
| --- | --- | --- | --- |
| `npm run check` | `mmod-check.log.txt` | exit 0 | `4.08 3.93 5.23` |
| `npm run lint:check` | `mmod-lint-check.log.txt` | exit 0 | `4.08 3.93 5.23` |
| `oxfmt --check` on the owned files | `mmod-oxfmt-check.log.txt` | exit 0, "All matched files use the correct format." | `6.18 4.44 5.36` |
| Owned style proofs, red then green | `mmod-red.log.txt`, `mmod-green.log.txt` | exit 1 (7 failed), then exit 0 (111 passed) | see the Failing-first section |
| `npm run test:conformance` | `mmod-conformance.log.txt` | exit 0, 29 passed | `1.67 2.46 5.98` |
| `npm run test:guides` | `mmod-guides.log.txt` | exit 0, 26 passed | `2.81 2.68 6.02` |
| `npm run test:policy` | `mmod-policy.log.txt` | exit 0, 109 passed, 1 skipped (the vendored `skipIf` around line 716 of `tests/policy.test.ts`) | `6.60 4.40 5.89` |
| `npm run build:src` | `mmod-build-src.log.txt` | exit 0 | `6.26 4.45 5.87` |
| `npx vitest run --config vite.config.ts --no-cache --project src:browser` with the Modal, Backdrop, and Offcanvas proofs | `mmod-engine.log.txt` | exit 0, 136 passed | `3.46 3.98 5.56` |
| `npm run test:app` | `mmod-app.log.txt` | exit 0, 61 files, 223 passed | `3.40 3.85 5.44` |
| Observation: `npm run test:src:styles` | `mmod-src-styles.log.txt` | exit 0, 115 files, 1515 passed | `4.90 3.59 5.78` |

The `check`, `lint:check`, and `oxfmt --check` gates were re-run after the no-`fade` control was added to
`modal.test.ts`. The whole-project styles observation ran before that addition, which changed only `modal.test.ts`, and
the final owned green run covers it.

## Shared-file patches

None. `tests/setupStyles.ts` and `tests/setupBrowser.ts` are unchanged.

## Patch for the E-ID-MOTION-FACTOR paragraph (mid-campaign decision)

Apply this at landing to the § Factors paragraph that E-ID-MOTION-FACTOR adds. It removes `modal dialog` from the
exception list and changes nothing else:

```diff
-The motion factor scales every transition duration the cascade writes except the collapse, modal dialog, offcanvas panel, carousel slide and indicator, and accordion chevron timings, which keep the release's literals as their own sections record. A scaled duration reads a `--vn-motion-*` token or multiplies the release's own duration by the factor, so it resolves to the release's value at a factor of `1`, doubles at a factor of `2`, and starts no transition at a factor of `0`.
+The motion factor scales every transition duration the cascade writes except the collapse, offcanvas panel, carousel slide and indicator, and accordion chevron timings, which keep the release's literals as their own sections record. A scaled duration reads a `--vn-motion-*` token or multiplies the release's own duration by the factor, so it resolves to the release's value at a factor of `1`, doubles at a factor of `2`, and starts no transition at a factor of `0`.
```

The paragraph is wrapped in the landed file, so match on the phrase `the collapse, modal dialog, offcanvas panel,` and
replace it with `the collapse, offcanvas panel,`. Re-wrap and run oxfmt afterwards.

## Diff and status

`mmod.diff` holds `git diff 73326c7`, and `mmod-status.txt` holds `git status --short`: every
touched file is a tracked file shown as modified, and nothing is untracked outside the ignored `tmp/`.

```text
 guides/veneer.md                              | 137 ++++++++-----
 src/styles/_mixins.scss                       |   6 +-
 src/styles/components/_modal.scss             |  20 +-
 tests/src/styles/components/modal.test.ts     | 272 +++++++++++++++++++++-----
 tests/src/styles/components/offcanvas.test.ts |  74 +++++++
 tests/src/styles/mixins.test.ts               |  40 +++-
```

Most of the guide's diffstat is oxfmt re-aligning the table under the `toast` heading, because the
`.modal.fade .modal-dialog` selector widened its columns.

These are the touched files and what changed in each:

- `/home/user/veneer-mmod/src/styles/components/_modal.scss`: the dialog enters from `scale(0.96)` on the panel timing,
  and the `.modal` rule fades the host on the panel duration and `ease-out`.
- `/home/user/veneer-mmod/src/styles/_mixins.scss`: `overlay-backdrop` writes the panel-timed opacity transition on
  `&.fade`.
- `/home/user/veneer-mmod/tests/src/styles/components/modal.test.ts`: the motion proofs are rewritten on
  `sampleTransition` (entrance, static bounce, host fade with a no-`fade` control, factor and reduced motion), and a
  backdrop fade case is added.
- `/home/user/veneer-mmod/tests/src/styles/components/offcanvas.test.ts`: an offcanvas backdrop fade case is added
  (timing, factor ratio, zero factor, reduced motion).
- `/home/user/veneer-mmod/tests/src/styles/mixins.test.ts`: a mixin fade case is added through the existing fixture.
- `/home/user/veneer-mmod/guides/veneer.md`: the departure and addition rows and the modal and backdrop motion prose.

## Deviation state

No stop was triggered. An ancillary choice was settled within scope: the host and backdrop fades are recorded as
additions, because that is how the ledger classes a declaration the release does not write. The choices the brief left
to this unit were the host's timing form (the `.modal` rule), the backdrop compound (`&.fade`), the case titles, and the
prose wording. Nothing was committed, and nothing was written outside `/home/user/veneer-mmod`.
