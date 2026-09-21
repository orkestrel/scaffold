<!-- Retained from u7a-9-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7a-9.jsonl, thread 01a0c188-437b-7041-ba8f-36e85a57c179, exit 0, 2026-09-20 21:33. Every finding closed and both controls red-and-restored; stopped on lint (vitest/no-conditional-expect on the contrast case's branches); superseded by units/u7a-brief-10.md. -->

Stopped at the final lint gate under the brief's deviation contract. The assignment is incomplete. The implementation and expanded styles suite reached 104 passing tests on managed Chromium before the controls. The controls reddened and are restored byte-for-byte. Final formatting passes; final lint exits 1. Edge and the remaining final gates did not run. HEAD remains `2bc922d`; nothing was committed, installed, or delegated.

Expected: the narrowed contrast assertions satisfy the light-role floor and pin the other roles while passing the repository gates.

Found: `tests/src/styles/components/button.test.ts` branches around `expect` to choose the floor or pinned ratio. `npm.cmd run lint:check` rejects those branches under `vitest/no-conditional-expect`. The exact log is `tmp/u7a/gate-lint-9.log`. The carried deviation contract says to stop on “a gate red after your own fix inside owned files.” This is a lint failure in the authored assertions, not a calibration failure to which the reversion ruling applies. No lint repair was attempted after that reading.

The following findings were implemented in the required order. Their browser readings are from Windows on 2026-09-20. Findings 3, 5, 9, 6, and 7 retain their inherited behavior; their earlier reports remain their evidence.

| Finding | Change and evidence |
| --- | --- |
| 2 — light foreground and contrast | The role loop selects `var(--vn-palette-black-base)` for light. Filled rest, hover, active, and disabled use that foreground; outline hover and active use it too. Other roles keep white and their calibrated fills. The guide's binding rows for `--bs-btn-color`, `--bs-btn-hover-color`, `--bs-btn-active-color`, and `--bs-btn-disabled-color` name the light overrides. `BUTTON_CONTRAST_CASES` carries the 4.5 floor for light and exact measured ratios for the other roles, asserted with `toBeCloseTo(..., 2)`. The narrowed suite first fails only the light contrast cases, then passes after the foreground repair. The final lint failure leaves this finding's gate closure incomplete. |
| 4 — installed interaction helpers | Replaced direct keyboard, hover, and click calls with `pressKeys`, `hoverAccessible`, and `clickAccessible`. No `userEvent` or `vitest/browser` reference remains in either Button test file. The checked-label fixture has a button role and tab stop so the installed helper targets the visible label separately from its checkbox. A source-reference instrument fails before replacement and passes after it; the browser suite passes after replacement. |
| 8 — guarded mixin focus | The focus-ring case first clicks the specimen, blurs it, and calls `focus()`, establishing the pointer history that exposes the defect. That case fails its `:focus-visible` assertion. Adding `pressKeys('{ArrowRight}')` before the reading makes the case pass. The pointer precondition remains in the proof. |
| 1 — outline active and focus | `BUTTON_OUTLINE_CASES` carries role, mode, fill, active paint, and ring expectations drawn from the existing calibrated setup data. Each role/mode case reads held `:active` paint, border, and text, releases the pointer, sends a guarded key, and reads the focus-visible ring's color, 3px spread, and suppressed outline. Temporary active-fill and focus-shadow mutations each redden these assertions; restoring the partial gives 104 passing tests. |

The red/green commands and measured counts follow. Each styles command includes the cascade build. Command files clear `PLAYWRIGHT_CHANNEL` for managed Chromium; their matching `.log` files retain the output.

| Finding | Red command and result | Green command and result |
| --- | --- | --- |
| 2 | `cmd /c tmp\u7a\step-2-red-9.cmd`: `npm.cmd run test:src:styles`, exit 1; 2 failed, 86 passed | `cmd /c tmp\u7a\step-2-green-9.cmd`: same styles command, exit 0; 88 passed |
| 4 | `cmd /c tmp\u7a\step-4-red-9.cmd`: `node tmp/u7a/helpers-9.mjs`, exit 1; 10 forbidden source references | `cmd /c tmp\u7a\step-4-green-9.cmd`: same instrument, 0 references, followed by `npm.cmd run test:src:styles`, exit 0; 88 passed |
| 8 | `cmd /c tmp\u7a\step-8-red-9.cmd`: `npm.cmd run test:src:styles`, exit 1; 1 failed, 87 passed | `cmd /c tmp\u7a\step-8-green-9.cmd`: same styles command, exit 0; 88 passed |
| 1, active mutation | `cmd /c tmp\u7a\step-1-active-red-valid-9.cmd`: `npm.cmd run test:src:styles`, exit 1; 34 failed, 70 passed. Outline active-paint cases and applicable contrast pins fail. | `cmd /c tmp\u7a\step-1-green-9.cmd`: same styles command after restoration, exit 0; 104 passed |
| 1, focus mutation | `cmd /c tmp\u7a\step-1-focus-red-9.cmd`: `npm.cmd run test:src:styles`, exit 1; 18 failed, 86 passed. The outline ring lengths are absent instead of `[0, 0, 0, 3]`. | The same `step-1-green-9.cmd` restoration run, exit 0; 104 passed |

Finding 4's source-reference instrument checks only the named test files for the forbidden spellings; it is not a behavioral regression test. Its browser result supplies the interaction evidence. Finding 1's reds are deliberate mutations of the already-correct paint, proving the added coverage.

The first outline mutation run, `tmp/u7a/step-1-active-red-9.log`, failed collection: my table replacement left trailing rows, producing a parse error, 9 failed suites, and no tests. I corrected that instrument-construction error before the valid mutation run. That collection failure is not counted as regression evidence.

No export population grew in this pass. The inherited inventory already includes `BUTTON_CONTRAST_CASES`, `BUTTON_OUTLINE_CASES`, and `BUTTON_MODES`; no enumerating assertion needed another name.

The following table records the exact `readContrast` results from `tmp/u7a/step-2-green-9.log`, without rounding. These are managed-Chromium readings. Disabled opacity and outline rest are outside this contrast measurement. No Edge readings were taken in this pass.

| Role | Mode | Filled rest | Filled hover | Filled active | Outline hover | Outline active |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| primary | light | 7.13190205699499 | 8.321292537367478 | 9.468838584302402 | 7.13190205699499 | 9.468838584302402 |
| primary | dark | 2.585598980085744 | 2.3479062482143407 | 2.1587033506287105 | 2.585598980085744 | 2.1587033506287105 |
| secondary | light | 7.563537438028161 | 8.749400116503336 | 9.878828575748154 | 7.563537438028161 | 9.878828575748154 |
| secondary | dark | 7.563537438028161 | 5.5363095204346084 | 4.325054548528514 | 7.563537438028161 | 4.325054548528514 |
| tertiary | light | 5.8814664908439696 | 7.024698627905617 | 8.169086373260999 | 5.8814664908439696 | 8.169086373260999 |
| tertiary | dark | 5.8814664908439696 | 4.934258143050648 | 4.144861090182687 | 5.8814664908439696 | 4.144861090182687 |
| success | light | 4.9434815772809175 | 5.990499634259924 | 7.068178683303689 | 4.9434815772809175 | 7.068178683303689 |
| success | dark | 4.9434815772809175 | 4.057611167858488 | 3.4324880431092772 | 4.9434815772809175 | 3.4324880431092772 |
| info | light | 5.853633775339754 | 6.963346612944753 | 8.072216837132128 | 5.853633775339754 | 8.072216837132128 |
| info | dark | 5.853633775339754 | 4.678582348998071 | 3.8718776347548687 | 5.853633775339754 | 3.8718776347548687 |
| warning | light | 5.050615049918906 | 6.138443548561103 | 7.259014167973709 | 5.050615049918906 | 7.259014167973709 |
| warning | dark | 5.050615049918906 | 4.140917670015739 | 3.4863715418625962 | 5.050615049918906 | 3.4863715418625962 |
| danger | light | 6.4203452346515215 | 7.735612495959255 | 9.052586315686607 | 6.4203452346515215 | 9.052586315686607 |
| danger | dark | 6.4203452346515215 | 5.878131640543492 | 5.16252485848049 | 6.4203452346515215 | 5.16252485848049 |
| light | light | 19.921989940926597 | 15.278928083353167 | 11.979180124611432 | 19.921989940926597 | 11.979180124611432 |
| light | dark | 19.921989940926597 | 20.049495217443766 | 20.156140274438936 | 19.921989940926597 | 20.156140274438936 |
| dark | light | 15.426285095510265 | 16.11935164305801 | 16.684392559762337 | 15.426285095510265 | 16.684392559762337 |
| dark | dark | 15.426285095510265 | 10.580781289199255 | 7.508976987967094 | 15.426285095510265 | 7.508976987967094 |

The calibrated dark fills remain a design question outside this unit. Primary is below 4.5 in every measured state; secondary, tertiary, and info fall below it in active states; success and warning fall below it in filled hover and active states. Their foregrounds and fills are unchanged, and their measured ratios are pinned rather than presented as meeting the light role's floor.

The required controls ran through `npm.cmd run test:src:styles`, without control-named tests:

| Control | Red reading | Restore proof |
| --- | --- | --- |
| PLANT-LIGHT | `cmd /c tmp\u7a\plant-light-9.cmd`, exit 1; 6 failed, 98 passed. The light contrast cases name the role and read 1.0541115652738484 at rest in each mode against 4.5. The remaining light states fail too; foreground assertions also fail. | `tmp/u7a/plant-light-9.log` records a Buffer byte comparison against `plant-light-before-9.scss`; restored SHA-256 `f3d0214d2660acd2ef4a5c3781355baf14ca8a5faa85872d054512a2de5ff922`. |
| PLANT-CHECK | `cmd /c tmp\u7a\plant-check-9.cmd`, exit 1; 1 failed, 103 passed. The unchecked held label reads `rgb(102, 51, 153) 0px 0px 0px 5px` instead of `none`. | `tmp/u7a/plant-check-9.log` records a Buffer byte comparison against `plant-check-before-9.scss`; the restored SHA-256 is the same. |

The component partial still has that SHA-256 at return. Outline mutations were also restored byte-for-byte; their restore messages are in `step-1-focus-red-9.log` and `step-1-green-9.log`. After the lint stop, `npm.cmd run build:src:styles` ran solely to replace the compiled PLANT-CHECK artifact with the restored source. It exits 0. No post-control browser-green or Edge-green result is claimed.

The final gate chain is `tmp/u7a/gates-9.cmd`, with results in `tmp/u7a/gates-9.status`. It stops on the first failing command. The initial format attempt flagged only the inherited `src/styles/elements/_button.scss`; its log is retained as `gate-format-inherited-9.log`. Scoped formatting of that owned file cleared it. Other formatting was scoped to the edited files; no tree-wide formatter or lint fix ran.

| Final gate | Result |
| --- | --- |
| `npm.cmd run format:check` | Exit 0 |
| `npm.cmd run lint:check` | Exit 1; conditional contrast assertions rejected |
| `npm.cmd run check` | Not run after the stop |
| `npm.cmd run test:src:core` | Not run after the stop |
| `npm.cmd run test:setup -- tests/setupStyles.test.ts` | Not run after the stop |
| `npm.cmd run test:src:styles` | Final gate not run; preceding restored outline run passed 104 tests |
| `npm.cmd run test:conformance` | Not run after the stop |
| `npm.cmd run test:guides` | Not run after the stop |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | Not run after the stop |

The final format output is:

```text
npm notice run @orkestrel/veneer@0.0.1 format:check
npm notice run oxfmt --config .oxfmtrc.json --check .
Checking formatting...

All matched files use the correct format.
Finished in 758ms on 86 files using 16 threads.
```

The final lint output is:

```text
npm notice run @orkestrel/veneer@0.0.1 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
tests/src/styles/components/button.test.ts:47:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:47:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:51:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:51:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:56:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:56:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:60:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:60:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:65:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:65:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:69:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:69:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:75:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:75:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:79:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:79:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:86:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:86:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:90:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
tests/src/styles/components/button.test.ts:90:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
```

The restored cascade is `dist/src/styles/index.css`, SHA-256 `14cbc6faabb24667bcd75068bec54c0d9c1646ec27a7b237bc11c500d6b5d363`. Its final build lines are:

```text
dist/src/styles/index.css      51.55 kB │ gzip: 5.88 kB
dist/src/styles/index.rtl.css  51.55 kB │ gzip: 5.88 kB
dist/src/styles/index.js        0.00 kB │ gzip: 0.02 kB

✓ built in 276ms
```

The actual tracked diff is retained in `tmp/u7a/final-tracked-9.diff`. The untracked partials and tests are captured by `git diff --no-index -- NUL <path>` in `final-component-9.diff`, `final-element-9.diff`, `final-component-test-9.diff`, and `final-element-test-9.diff` under the same directory. The actual `git diff --stat` output is:

```text
 guides/veneer.md                | 180 ++++++++++++++++---
 src/core/constants.ts           |  16 ++
 src/styles/_mixins.scss         |  20 +++
 src/styles/_tokens.scss         |  17 ++
 src/styles/index.scss           |   2 +
 tests/conformance.test.ts       |   2 +-
 tests/setupStyles.test.ts       |  70 ++++++++
 tests/setupStyles.ts            | 385 ++++++++++++++++++++++++++++++++++++++++
 tests/src/styles/index.test.ts  |  17 +-
 tests/src/styles/mixins.test.ts |  21 +++
 10 files changed, 700 insertions(+), 30 deletions(-)
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

Every listed path belongs to the owned set. The report is `u7a-report-9.md`; Git ignores it with the rest of `tmp/`, confirmed by `git check-ignore`, so it does not appear in porcelain output. Git also warned that the user-level ignore file could not be read; the repository status command exited 0. The acceptance criteria remain unmet because lint is red and the later gates, including Edge, are unrun.