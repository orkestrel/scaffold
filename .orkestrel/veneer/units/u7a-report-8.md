<!-- Retained from u7a-8-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7a-8.jsonl, thread 01a0c17a-c664-7020-9ffd-03ecd2280140, exit 0, 2026-09-20 21:11. Closed findings 9 (reverted), 6, and 7; stopped on finding 2: the brief's 4.5:1 floor for every role and mode fails on the calibrated dark fills (dark primary 2.59:1 at rest), which are Elements' measured values; superseded by units/u7a-brief-9.md. -->

Stopped at finding 2 under the brief's deviation contract. The assignment is incomplete. Findings 9, 6, and 7 are closed on managed Chromium; findings 3 and 5 remain as report 7 left them. The role-contrast gate remains red after reverting the light foreground change. The working tree remains uncommitted at HEAD `2bc922d`.

The effective assignment is `u7a-brief-8.md`, carrying brief 7 except for its mixer ruling. Brief 8 says to “stop only when a red survives the reversion.” The final styles run exits 1 with 8 failed and 80 passed tests. No later finding, control, or final gate ran after that reading.

Expected: the requested light-role foreground repair permits every role and mode to meet the 4.5:1 text-over-fill floor while preserving the calibrated colors.

Found: the light repair clears the light-role contrast failures, but the dark-mode primary, secondary, tertiary, success, info, and warning cases still fail. Dark primary already fails at rest: white over `oklch(0.7 0.15 233)` measures 2.585598980085744:1. Its hover and active ratios are 2.3479062482143407:1 and 2.1587033506287105:1. The existing calibration cases stay green. Logs: `tmp/u7a/step-2-after-8.log` and `tmp/u7a/step-2-reverted-8.log`.

The unchanged white foreground and calibrated dark fills conflict with the requested floor. No palette or calibration expectation was changed to make that floor pass.

The finding outcomes follow the required execution order.

| Finding | Change and result |
| --- | --- |
| 9 — light mixer | Restored the light map entry to `color(srgb 0.00742457 0.0232852 0.0925134)` and deleted `retunes the light interaction tints with the body text token`. That case added no setup-table row. The styles suite returns to 69 passed tests. Finding closed as refuted by measurement. |
| 6 — disabled shadow | The disabled rule reads `var(--bs-btn-box-shadow)`. The compatible-overrides case sets a 5px shadow before disabling the button. Before the fix, the reader returns no shadow lengths; after it, the reader returns `[0, 0, 0, 5]`. The same styles command moves from 1 failed / 68 passed to 69 passed. |
| 7 — unchecked label | Removed the bare `.btn:active` selector. Added a held-pointer case for an unchecked input's adjacent label, using `holdAccessible('button', 'Unchecked specimen')` and `releasePointer`. It checks the unchecked state, actual `:active` state, resting fill, absent active shadow, and checked state after release. The same styles command moves from 1 failed / 69 passed to 70 passed. |
| 2 — foreground and contrast | Added `BUTTON_CONTRAST_CASES` and browser assertions for each role and mode, reading filled rest, hover, and held active contrast, plus outline hover and held active contrast. Tried Bootstrap's black foreground for the light role. The suite moves from 8 failed / 80 passed to 6 failed / 82 passed; it never becomes green. Reverted that implementation and its foreground expectations, retaining the failing contrast assertions. The rerun returns 8 failed / 80 passed. Finding remains open. |
| 4 — installed helpers | Not attempted before the stop. The inherited `userEvent` calls remain. |
| 8 — guarded mixin focus | Not attempted before the stop. |
| 1 — outline active and focus | Not completed before the stop. The contrast cases hold outline buttons active, but do not replace the required calibrated active-color and focus-ring proofs. |
| 3 and 5 | Retained without edits in this pass; their evidence remains in report 7. |

Finding 9's refutation is the preceding run retained in `tmp/u7a/step-9-after-7.log`: binding the mixer to the body-text token failed 11 calibration cases, with 59 tests passing. The affected comparisons were the light-mode filled roles, checked-label active paint, and bare-button hover paint. Restoring the literal endpoint makes those comparisons pass again. The measured mixer endpoint is not the body-text token's sRGB rendering.

The unchecked-label proof detects an active shadow rather than a changed fill. While the label is hovered, the more specific `.btn-check + .btn:hover` rule already keeps its resting fill. A compatible `--bs-btn-active-shadow: 0 0 0 5px rebeccapurple` override exposes the bare active selector: the red run reads `rgb(102, 51, 153) 0px 0px 0px 5px` instead of `none`. The fixture gives the label a button role and tab stop so the installed interaction helper can target it distinctly from the associated checkbox. Exploratory runs without that distinction reported an ambiguous target; a fill-only reading passed before the selector fix. Neither reading is claimed as the regression's red proof.

Bootstrap 5.3.8's installed `node_modules/bootstrap/dist/css/bootstrap.css` binds the light filled foreground, hover foreground, active foreground, and disabled foreground to `#000`, and the outline-light hover and active foregrounds to `#000`. The attempted binding used `--vn-palette-black-base`. After reversion, those Veneer properties again read `--vn-palette-white-base`; the light contrast defect remains. The guide's base-property binding rows were unchanged, and no guide edit was made in this pass.

The following contrast results come from `readContrast` in the final managed-Chromium run, `tmp/u7a/step-2-reverted-8.log`. Ratios are rounded to six decimals. “Pass” means the assertion measured at least 4.5:1; the test runner did not retain an exact value for a passing assertion. Disabled opacity and outline rest are outside this measurement.

| Role | Mode | Filled rest | Filled hover | Filled active | Outline hover | Outline active |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| primary | light | Pass | Pass | Pass | Pass | Pass |
| primary | dark | 2.585599 | 2.347906 | 2.158703 | 2.585599 | 2.158703 |
| secondary | light | Pass | Pass | Pass | Pass | Pass |
| secondary | dark | Pass | Pass | 4.325055 | Pass | 4.325055 |
| tertiary | light | Pass | Pass | Pass | Pass | Pass |
| tertiary | dark | Pass | Pass | 4.144861 | Pass | 4.144861 |
| success | light | Pass | Pass | Pass | Pass | Pass |
| success | dark | Pass | 4.057611 | 3.432488 | Pass | 3.432488 |
| info | light | Pass | Pass | Pass | Pass | Pass |
| info | dark | Pass | Pass | 3.871878 | Pass | 3.871878 |
| warning | light | Pass | Pass | Pass | Pass | Pass |
| warning | dark | Pass | 4.140918 | 3.486372 | Pass | 3.486372 |
| danger | light | Pass | Pass | Pass | Pass | Pass |
| danger | dark | Pass | Pass | Pass | Pass | Pass |
| light | light | 1.054112 | 1.374442 | 1.753042 | 1.054112 | 1.753042 |
| light | dark | 1.054112 | 1.047408 | 1.041866 | 1.054112 | 1.041866 |
| dark | light | Pass | Pass | Pass | Pass | Pass |
| dark | dark | Pass | Pass | Pass | Pass | Pass |

With the attempted black foreground, every measured light-role state passes in each mode; see `tmp/u7a/step-2-after-8.log`. The other roles retain the results in the table. Exact passing ratios and Edge contrast readings were not retained or run.

The standing enumeration clause required an inventory update. In `tests/setupStyles.test.ts`, the case `exports the scanner, the predicates, the collectors, and the compatibility oracle, and nothing the document has to answer` now includes `BUTTON_CONTRAST_CASES`. The table is exported and frozen in `tests/setupStyles.ts`; it carries each role, mode, foreground expectation, and the 4.5 floor. The setup gate did not run before the stop.

Every run that follows invokes `npm.cmd run test:src:styles`, including its cascade build, with `PLAYWRIGHT_CHANNEL` cleared in the named command file. These are Windows readings from 2026-09-20.

Mixer reversion: `tmp/u7a/step-9-green-8.cmd` exits 0. The final lines of `tmp/u7a/step-9-green-8.log` are:

```text
 Test Files  9 passed (9)
      Tests  69 passed (69)
   Start at  21:03:01
   Duration  12.25s (transform 0ms, setup 333ms, import 312ms, tests 7.39s, environment 0ms)
```

Disabled shadow, red: `tmp/u7a/step-6-red-8.cmd` exits 1. The final lines of `tmp/u7a/step-6-red-8.log` are:

```text
 Test Files  1 failed | 8 passed (9)
      Tests  1 failed | 68 passed (69)
   Start at  21:03:35
   Duration  9.56s (transform 0ms, setup 362ms, import 303ms, tests 7.38s, environment 0ms)
```

Disabled shadow, green: `tmp/u7a/step-6-green-8.cmd` exits 0. The final lines of `tmp/u7a/step-6-green-8.log` are:

```text
 Test Files  9 passed (9)
      Tests  69 passed (69)
   Start at  21:04:04
   Duration  9.56s (transform 0ms, setup 366ms, import 291ms, tests 7.35s, environment 0ms)
```

Unchecked label, red: `tmp/u7a/step-7-red-8.cmd` exits 1. The final lines of `tmp/u7a/step-7-red-8.log` are:

```text
 Test Files  1 failed | 8 passed (9)
      Tests  1 failed | 69 passed (70)
   Start at  21:06:23
   Duration  9.76s (transform 0ms, setup 365ms, import 297ms, tests 7.56s, environment 0ms)
```

Unchecked label, green: `tmp/u7a/step-7-green-8.cmd` exits 0. The final lines of `tmp/u7a/step-7-green-8.log` are:

```text
 Test Files  9 passed (9)
      Tests  70 passed (70)
   Start at  21:06:50
   Duration  9.71s (transform 0ms, setup 346ms, import 297ms, tests 7.57s, environment 0ms)
```

Role contrast, red before the foreground change: `tmp/u7a/step-2-red-8.cmd` exits 1. The final lines of `tmp/u7a/step-2-red-8.log` are:

```text
 Test Files  1 failed | 8 passed (9)
      Tests  8 failed | 80 passed (88)
   Start at  21:07:53
   Duration  17.03s (transform 0ms, setup 386ms, import 303ms, tests 14.68s, environment 0ms)
```

Role contrast, after the light foreground change: `tmp/u7a/step-2-after-8.cmd` exits 1. The final lines of `tmp/u7a/step-2-after-8.log` are:

```text
 Test Files  1 failed | 8 passed (9)
      Tests  6 failed | 82 passed (88)
   Start at  21:08:49
   Duration  16.65s (transform 0ms, setup 349ms, import 310ms, tests 14.41s, environment 0ms)
```

Role contrast, after reverting the foreground change: `tmp/u7a/step-2-reverted-8.cmd` exits 1. The final lines of `tmp/u7a/step-2-reverted-8.log` are:

```text
 Test Files  1 failed | 8 passed (9)
      Tests  8 failed | 80 passed (88)
   Start at  21:09:43
   Duration  16.58s (transform 0ms, setup 330ms, import 312ms, tests 14.44s, environment 0ms)
```

Neither `PLANT-LIGHT` nor `PLANT-CHECK` ran. No control was planted, and no control byte-restoration proof is claimed. The foreground reversion is part of the stop reading, not a completed control.

The final gates have the following status. No unexecuted gate has final lines to report.

| Final gate | Result |
| --- | --- |
| `npm.cmd run format:check` | Not run |
| `npm.cmd run lint:check` | Not run |
| `npm.cmd run check` | Not run |
| `npm.cmd run test:src:core` | Not run |
| `npm.cmd run test:setup -- tests/setupStyles.test.ts` | Not run |
| `npm.cmd run test:src:styles` | Final-chain invocation not run; the last step invocation exits 1 as recorded |
| `npm.cmd run test:conformance` | Not run |
| `npm.cmd run test:guides` | Not run |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | Not run |

The cascade SHA-256 after the final step build is `53971322a8cdad598598b32d3f8fe5d5e3995346596924fe70c4ff97af68b3a9`. This identifies the stopped tree, not an accepted cascade.

The evidence command `node tmp/u7a/evidence-8.mjs` exits 0. It retains the actual tracked diff and the untracked source/test file diffs in `tmp/u7a/actual-diff-8.patch`, whose SHA-256 is `24b2dfc44e1f89a097de13148238ad8143bb1320fb68cbabfc1ca20dd99ae0c1`. The `git diff --check` command exits 0. Git reports that it cannot access `C:\Users\mikes/.config/git/ignore`; the evidence commands succeed.

The actual `git diff --stat` output is:

```text
 guides/veneer.md                | 180 ++++++++++++++++++++++++++----
 src/core/constants.ts           |  16 +++
 src/styles/_mixins.scss         |  20 ++++
 src/styles/_tokens.scss         |  17 +++
 src/styles/index.scss           |   2 +
 tests/conformance.test.ts       |   2 +-
 tests/setupStyles.test.ts       |  70 ++++++++++++
 tests/setupStyles.ts            | 235 ++++++++++++++++++++++++++++++++++++++++
 tests/src/styles/index.test.ts  |  17 ++-
 tests/src/styles/mixins.test.ts |  16 +++
 10 files changed, 545 insertions(+), 30 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_tokens.scss
 M src/styles/index.scss
 M tests/conformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/index.test.ts
 M tests/src/styles/mixins.test.ts
?? src/styles/components/_button.scss
?? src/styles/elements/_button.scss
?? tests/src/styles/components/button.test.ts
?? tests/src/styles/elements/button.test.ts
```

The report and instruments reside under ignored `tmp/`. No agent was spawned, dependency installed, commit made, or scaffold-owned file edited. No full build, tree-wide formatter, lint fix, or prohibited Git recovery command ran. A formatter ran only over the owned setup files, Button test files, and component partial before the final step reading. The brief marks `prove` blocked, so this report claims command evidence and no receipt. The dispatch supplied no launching CLI journal path or session identifier. Independent acceptance has not run.