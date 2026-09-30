# E-ID-MOTION-TOAST report, round 2

Retained by the Orchestrator from `/home/user/veneer-mtoast/tmp/units/mtoast-report-2.md`. Every `tmp/units/` log, script, diff,
patch, and status file it names is retained in `mtoast-instruments/` beside this report; other paths are relative to
`/home/user/veneer-mtoast/`, and the unit is committed there as `70b1d59` on `unit/mtoast`.

`opus` on Opus 5.5, native, sole writer in `/home/user/veneer-mtoast` (branch `unit/mtoast`, base `6586b11`). This
report covers the whole unit, and `tmp/units/mtoast-report.md` holds round 1's detail. Every gate of the first brief
exits 0, and `npm run test:src:styles` over the whole project also exits 0. The deviation state is clear: the step 1
search found no reading outside the owned set.

## The stop

Round 1 stopped on its deviation contract. The fade case `fades the alert, toast, tooltip, popover, tab pane, and modal,
and leaves each shown component its own opacity` in `tests/src/styles/components/fade.test.ts` expected
`transition-property` to equal `opacity` on the toast rows of `FADE_COMPONENT_CASES`. The toast reads
`opacity, transform` after this change. `tmp/units/mtoast-fade-after.log.txt` records the failure. Round 1 returned an
includes-patch, which this round does not apply, per the ruling.

## Ruling applied

- **`tests/setupStyles.ts`:** each `FADE_COMPONENT_CASES` entry carries a frozen `transitions` list, in the order
  Chromium serializes `transition-property`. The toast's list reads `['opacity', 'transform']`, and every other entry
  reads `['opacity']`. The doc block's remarks state the member.
- **`tests/src/styles/components/fade.test.ts`:** the fade case compares each set's `transition-property` with
  `transitions.join(', ')`, the hidden and the shown set alike. Its comment states that a dropped opacity transition or
  an extra transitioned property reports there.
- **`tests/setupStyles.test.ts`:** the fade case-table proof pins the member. Every list is frozen and contains
  `opacity` (`expect.arrayContaining(['opacity'])`, which also rules out an empty list). Its title is now `names in each
  fade component case the classes its own key and the transition key record, and a frozen transition list naming the
  opacity`.
- **`guides/veneer.md`:** both hunks of `tmp/units/mtoast-guide-report-only.patch` are applied with `patch -p1`: the
  `## Engine` Toast paragraph and the § Compatibility toast selector row, which now reads `resolved geometry, states,
  stacking, motion, and paint are proved`.

This is the `## Engine` hunk as applied:

```diff
-The toast partial declares no transition of its own, and the shipped fade partial fades a toast
-carrying the `fade` token through its opacity over the `--vn-motion-feedback` duration. Hiding
-therefore waits for the fade out the `transition` token starts, and the `--vn-factor-motion` factor
-on the root rescales the wait. Showing a hidden toast takes it from no display to displayed at no
-opacity, which starts no transition; the fade in starts as the `transition` token leaves, and
-`shown.vn.toast` dispatches after it finishes. Showing a shown toast first fades it out under the
-`transition` token and waits for that fade, then waits for the fade in.
+The toast partial transitions a toast carrying the `fade` token through its opacity and its scale
+over the `--vn-motion-feedback` duration. Hiding therefore waits for the motion out the `transition`
+token starts, and the `--vn-factor-motion` factor on the root rescales the wait. Showing a hidden
+toast takes it from no display to displayed at no opacity and a `0.98` scale, which starts no
+transition; the motion in starts as the `transition` token leaves, and `shown.vn.toast` dispatches
+after it finishes. Showing a shown toast first moves it out under the `transition` token and waits
+for that motion, then waits for the motion in.
```

The round-1 work stands unchanged:

- The `.toast.showing` rule gains `transform: scale(0.98)`.
- The `.toast.fade` compound declares `opacity var(--vn-motion-feedback) var(--vn-ease-out), transform
  var(--vn-motion-feedback) var(--vn-ease-standard)` through the `transition` mixin.
- The `toast motion` proofs, § Toast classes, and the toast's § Additions rows are in place.

## Search

`tmp/units/mtoast-search-2.sh` searched every file under `tests/` that spells `toast fade`, `toast show`, `.toast`, or
`toastCascade`. It listed each line within 8 lines of such a spelling that reads `transition-property`,
`transitionProperty`, `transition-duration`, `transitionDuration`, `readDuration`, `getPropertyValue('transition'`,
`'transition'`, or `FADE_COMPONENT_CASES`. The output is in `tmp/units/mtoast-search-2.log.txt`, which also lists a plain
`FADE_COMPONENT_CASES` grep over `tests/`. The hits fall into these groups:

- **Owned:**
  - `tests/src/styles/components/toast.test.ts` (the motion proofs);
  - `tests/setupStyles.ts` (the table);
  - `tests/setupStyles.test.ts` (the case-table proof, and the name inventory around line 417);
  - `tests/src/styles/components/fade.test.ts` (the fade case).
- **Outside the owned set:** `tests/src/browser/Toast.test.ts` lines 19, 67, and 210. These read `readDuration`, the
  longest duration, as `0`, as positive, and as a factor ratio. None reads a transition list, and the engine gate passes
  unchanged.

No hit outside the owned set reads a toast's transition list, so the stop condition did not fire.

## Red and green

Both runs used `npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts
tests/src/styles/components/fade.test.ts` through `tmp/units/mtoast-2-fade.sh`, on the ruled table.

| Toast entry | Result | Log |
| --- | --- | --- |
| `['opacity']` | `Tests 1 failed \| 9 passed (10)`, `exit=1`, an `AssertionError` whose diff is the toast row's `"opacity"` against `"opacity, transform"` for the hidden and the shown set | `tmp/units/mtoast-2-fade-red.log.txt` |
| `['opacity', 'transform']` | `Tests 10 passed (10)`, `exit=0` | `tmp/units/mtoast-2-fade-green.log.txt` |

Round 1's toast proofs read `Tests 6 failed | 16 passed (22)` on the base partial (`tmp/units/mtoast-red.log.txt`). They
read `Tests 22 passed (22)` on the final partial (`tmp/units/mtoast-green.log.txt`).

## Plants

`tmp/units/mtoast-2-plants.sh` ran every plant on the final files. Each plant rebuilt the styles, ran its proof, and
restored the planted file by copy. Every log reads `restore identical` on its sha256, and every failure is an
`AssertionError`.

| Plant | File and edit | Proof | Result | Log |
| --- | --- | --- | --- | --- |
| drop-scale | `_toast.scss`: delete `transform: scale(0.98);` | `toast.test.ts` | `5 failed \| 17 passed` | `tmp/units/mtoast-2-plant-drop-scale.log.txt` |
| move-transition | `_toast.scss`: `.toast.fade {` becomes `.toast {` | `toast.test.ts` | `3 failed \| 19 passed` | `tmp/units/mtoast-2-plant-move-transition.log.txt` |
| ease-out | `_toast.scss`: the `transform` entry on `var(--vn-ease-out)` | `toast.test.ts` | `3 failed \| 19 passed` | `tmp/units/mtoast-2-plant-ease-out.log.txt` |
| fade-transitions | `setupStyles.ts`: the toast's `transitions` set to `['opacity']` | `fade.test.ts` | `1 failed \| 9 passed` | `tmp/units/mtoast-2-plant-fade-transitions.log.txt` |

## Gates

`tmp/units/mtoast-2-gates.sh` ran the gates. After the setup case-title edit, `tmp/units/mtoast-2-gates-setup.sh`
re-ran format and setup, and `tmp/units/mtoast-2-gates-lint.sh` re-ran lint and check, into the same logs. Each log
echoes its command first and ends with its exit and `/proc/loadavg`. All logs are under `tmp/units/`.

| Gate | Result | Exit | Load (1/5/15) | Log |
| --- | --- | --- | --- | --- |
| oxfmt `--check` on the owned files (`_toast.scss`, `toast.test.ts`, `fade.test.ts`, `setupStyles.ts`, `setupStyles.test.ts`, `veneer.md`) | All matched files use the correct format | 0 | 4.76 5.95 5.77 | `mtoast-format-2.log.txt` |
| `npm run lint:check` | clean | 0 | 4.68 5.77 5.71 | `mtoast-lint-2.log.txt` |
| `npm run check` | clean | 0 | 6.72 6.12 5.83 | `mtoast-check-2.log.txt` |
| `npm run build:src` | built | 0 | 13.38 9.11 6.02 | `mtoast-build-src-2.log.txt` |
| Toast and fade style proofs | `Tests 32 passed (32)` | 0 | 12.58 9.16 6.08 | `mtoast-styles-2.log.txt` |
| `npm run test:setup` | `Tests 357 passed (357)` | 0 | 4.62 5.79 5.72 | `mtoast-setup-2.log.txt` |
| `npm run test:conformance` | `Tests 45 passed (45)` | 0 | 5.10 7.23 5.84 | `mtoast-conformance-2.log.txt` |
| `npm run test:guides` | `Tests 26 passed (26)` | 0 | 5.24 7.19 5.84 | `mtoast-guides-2.log.txt` |
| `npm run test:policy` | `Tests 109 passed \| 1 skipped (110)` | 0 | 5.22 7.16 5.84 | `mtoast-policy-2.log.txt` |
| `Toast.test.ts` (src:browser, after `build:src`) | `Tests 45 passed (45)`, unchanged | 0 | 5.71 7.16 5.87 | `mtoast-engine-2.log.txt` |
| `npm run test:app` | `Tests 223 passed (223)` | 0 | 8.89 7.73 6.14 | `mtoast-app-2.log.txt` |
| `npm run test:src:styles` | `Tests 1561 passed (1561)` | 0 | 5.04 6.13 5.82 | `mtoast-src-styles-2.log.txt` |

## Diff and status

The diff is in `tmp/units/mtoast-2.diff` (`git diff 6586b11`). The status is in `tmp/units/mtoast-2-status.txt`, which
holds `M` for `guides/veneer.md`, `src/styles/components/_toast.scss`, `tests/setupStyles.test.ts`,
`tests/setupStyles.ts`, `tests/src/styles/components/fade.test.ts`, and `tests/src/styles/components/toast.test.ts`.
`git diff --stat 6586b11` reads `335 insertions(+), 26 deletions(-)` over those files.

## Notes

- `tmp/units/mtoast-fade-test.patch` stays on disk unapplied, as round 1's superseded proposal.
- The Orchestrator still owes the engine session the `## Engine` hunk before the landing, per ruling 2.
