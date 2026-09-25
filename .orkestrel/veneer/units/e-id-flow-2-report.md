# Unit E-ID-FLOW-2 report: Bootstrap's reboot margins on `dl`, `pre`, `hr`, and `figure`

The `dl`, `pre`, `hr`, and `figure` tags take Bootstrap 5.3.8's reboot margins through the space scale. Each ledger row reads `tokenized` or is struck. The attributed quotation and the `.figure` pattern place the following paragraph where Bootstrap places it at 390 and 1280 pixels. Every gate the brief names exits 0, `app:browser` included; the first `test:setup` run timed out under host load and the re-run exits 0. Worktree: `/home/user/veneer-flow2`, branch `unit/flow2`, base `e07b3a6`. Nothing is committed.

## Changes

- `src/styles/elements/_dl.scss`: `margin: 0` becomes `margin-top: 0; margin-bottom: var(--vn-space-8)`, the release's longhand form. The grid, the term padding, and the description margin are unchanged.
- `src/styles/elements/_pre.scss`: `margin: 0` becomes `margin-top: 0; margin-bottom: var(--vn-space-8)`, the release's longhand form.
- `src/styles/elements/_hr.scss`: the rule leaves the `box-reset` mixin and writes `margin: var(--vn-space-8) 0; color: inherit; border: 0;` inline, in the release's order and shorthand. The `@use '../mixins'` line goes, because nothing else in the partial reads a mixin.
  - Reason: the mixin's callers are `_hr.scss` and `_fieldset.scss`, and the release gives `fieldset` a zero margin. The two partials agreed on `margin: 0` because each recorded a release value, not because they share a decision. `.claude/rules/styles.md` keeps such a block inline.
  - Consequence: `box-reset` keeps `_fieldset.scss` as its only caller. The fix touches an off-limits partial, so it is a proposed patch in § Shared-file hunks, not applied.
- `src/styles/elements/_figure.scss`: `margin: 0` becomes `margin: 0 0 var(--vn-space-8)`, the release's shorthand. The figure stays block, and the caption keeps its start margin.
- `guides/veneer.md` (shared): the `reboot` ledger rows and the additions rows, listed in § Shared-file hunks.
- `tests/setupStyles.ts` (shared): the `FLOW_MARGIN` TSDoc names the tags this unit adds and the release's `$hr-margin-y` value. The `TEXT_DL_CASES`, `TEXT_HR_CASES`, and `TEXT_PRE_CASES` margin readings move to the release values.
- Proofs added (owned):
  - `tests/src/styles/elements/dl.test.ts`, `pre.test.ts`, and `figure.test.ts`: `takes the release block margins at the default density and scales the block-end margin with the density factor`. Each proof mounts the tag beside a plain specimen carrying `FLOW_MARGIN`. It asserts a 0 start margin, an end margin equal to the specimen's resolved 16px, and a doubled end margin when `--vn-factor-density` is 2.
  - `tests/src/styles/elements/hr.test.ts`: `takes the release block margins at the default density and scales both block margins with the density factor`. The specimen carries `margin: 1rem 0`, and the proof asserts 16px on each block edge, then 32px on each at density 2.
  - `tests/src/styles/elements/figure.test.ts`: `ends the figure at its caption and starts the next block 16px after it`, under `figure class around a captioned image`. It uses Bootstrap's `.figure` markup with an 80px image and a 20px caption. It asserts a 108px figure box and a following paragraph 124px below the figure's top, which are the Bootstrap readings.
- `tests/src/styles/elements/figure.test.ts`, the existing E-ID-LAYOUT quotation case: its comment now states that the footer's 16px end margin collapses with the figure's own 16px end margin. The assertions are unchanged.

## Figure readings

`/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/flow2-probe.mjs` renders the markup under the built Veneer cascade and under `bootstrap/dist/css/bootstrap.css` in Chromium at 390 and 1280 pixels, then sets `--vn-factor-density` to 2 on the Veneer page. `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/probe.sh` rebuilds the styles first.

- Before: `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/logs/probe-before.log.txt`, exit 0.
- After: `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/logs/probe-after.log.txt`, exit 0.

At 390 and at 1280 pixels the readings are identical. The following table gives the distance from the figure's bottom edge to the following paragraph, with the figure box height in parentheses.

| Pattern | Veneer before | Veneer after | Bootstrap | Veneer after, density 2 |
| --- | --- | --- | --- | --- |
| Attributed quotation, bare figure | 16px (47.14) | 16px (47.14) | 16px (51.00) | 32px |
| Attributed quotation, `.text-center` | 16px (47.14) | 16px (47.14) | 16px (51.00) | 32px |
| Attributed quotation, fixed 30px and 20px heights | 16px (50.00) | 16px (50.00) | 16px (50.00) | 32px |
| `.figure` pattern | 0.86px (105.14) | 16px (105.14) | 16px (109.00) | 32px |
| `.figure` pattern, fixed 20px caption | 0px (108.00) | 16px (108.00) | 16px (108.00) | 32px |

- Attributed quotation: the paragraph sits 16px after the figure before and after the change. The footer's end margin and the figure's end margin collapse to one 16px, as they do in Bootstrap. The box height differs by the type, which the fixed-height row removes. The E-ID-LAYOUT placement proof stays green.
- `.figure` pattern: before the change, the paragraph sat on the caption's line. The class lays the figure out inline-block, so the figure's end margin stays outside the box and extends the line. After the change, the gap matches Bootstrap.
- Tag margins, same log: `dl`, `pre`, and `figure` read 0px top and 16px bottom on both sides, and `hr` reads 16px on each block edge on both sides. At density 2, Veneer doubles each non-zero margin. `dl.mb-0` reads 0px on both sides, so the utility class keeps control.
- No placement needs a contextual selector, `:not([class])`, or `:has()`.

## Failing-first table

Command: `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/owned.sh <log>`. It rebuilds the styles, then runs `npx vitest run --config configs/src/vite.styles.config.ts --no-cache` on `tests/src/styles/elements/{dl,pre,hr,figure}.test.ts`.

| Stage | Reading | Log |
| --- | --- | --- |
| Proofs added, source at base | 5 failed, 21 passed. The failures are the proofs this unit added: the density proof for `dl`, `pre`, `hr`, and `figure` (`expected +0 to be 16`), and the `.figure` placement proof (`expected 108 to be close to 124`) | `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/logs/owned-red.log.txt` |
| Source changed, calibrations not yet updated | New proofs green. The light and dark calibration cases for `dl`, `pre`, `hr`, and `figure` are red: 8 failed, 18 passed | `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/logs/owned-fixed.log.txt` |
| Calibrations updated | 26 passed | `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/logs/owned-green.log.txt` |

## Mutation table

`/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/mutations.sh` runs every mutation through `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/mutate.sh`. That script copies the partial, applies one replacement, rebuilds the styles, runs the owned files, copies the partial back, and compares the SHA-256 digests. After the last mutation it rebuilds the styles from the restored source (`logs/build-restored.log.txt`, exit 0). Console output: `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/logs/mutations-run.log.txt`. Each log sits under `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/logs/`.

| Mutation | Assertion it reddens | Reading | Log | Restore |
| --- | --- | --- | --- | --- |
| `_dl.scss` `margin-bottom: var(--vn-space-8)` → `1rem` | `dl` density proof, `release * 2` (`expected 16 to be 32`) | 1 failed, 25 passed | `mutation-dl-literal.log.txt` | identical, `90219960…905d` |
| `_dl.scss` `margin-bottom: var(--vn-space-8)` → `0` | `dl` density proof (`expected +0 to be 16`) and the `dl` calibration in each mode | 3 failed, 23 passed | `mutation-dl-zero.log.txt` | identical |
| `_pre.scss` `margin-bottom: var(--vn-space-8)` → `1rem` | `pre` density proof, `release * 2` | 1 failed, 25 passed | `mutation-pre-literal.log.txt` | identical, `ef232e82…afe` |
| `_pre.scss` `margin-bottom: var(--vn-space-8)` → `0` | `pre` density proof and the `pre` calibration in each mode | 3 failed, 23 passed | `mutation-pre-zero.log.txt` | identical |
| `_hr.scss` `margin: var(--vn-space-8) 0` → `margin: 1rem 0` | `hr` density proof, `release * 2` | 1 failed, 25 passed | `mutation-hr-literal.log.txt` | identical, `26434b4d…c3` |
| `_hr.scss` `margin: var(--vn-space-8) 0` → `margin: 0` | `hr` density proof and the `hr` calibration in each mode | 3 failed, 23 passed | `mutation-hr-zero.log.txt` | identical |
| `_figure.scss` `margin: 0 0 var(--vn-space-8)` → `margin: 0 0 1rem` | `figure` density proof, `release * 2` | 1 failed, 25 passed | `mutation-figure-literal.log.txt` | identical, `9e9f9257…a002` |
| `_figure.scss` `margin: 0 0 var(--vn-space-8)` → `margin: 0` | `figure` density proof, the `figure` calibration in each mode, and the `.figure` placement proof (`expected 108 to be close to 124`) | 4 failed, 22 passed | `mutation-figure-zero.log.txt` | identical |
| `_figure.scss` `margin: 0 0 var(--vn-space-8)` → `margin: 0 0 calc(var(--vn-space-8) * 2)` | The preceding figure assertions, plus the E-ID-LAYOUT quotation placement case for each holder (`expected 82 to be close to 66`) | 7 failed, 19 passed | `mutation-figure-double.log.txt` | identical |

The zero-margin mutation leaves the quotation placement case green. That is the expected reading: the footer's own 16px end margin places the paragraph whether or not the figure writes its margin. The doubled-margin row shows that the case reads the figure margin once the figure margin exceeds the footer's.

## Tests the change made false and each fix

The suites found each of these after the change:

- `tests/setupStyles.ts` `TEXT_DL_CASES`: `margin` goes from `0px` to `0px 0px 16px`.
- `tests/setupStyles.ts` `TEXT_PRE_CASES`: `margin` goes from `0px` to `0px 0px 16px`.
- `tests/setupStyles.ts` `TEXT_HR_CASES`: `margin` goes from `0px` to `16px 0px`.
- `tests/src/styles/elements/figure.test.ts` (`resolves the calibrated values in %s mode`): the figure's `margin` goes from `0px` to `0px 0px 16px`.
- No other test went red. `npm run test:src:styles`, `npm run test:conformance` after the ledger edit, `npm run test:guides`, and the `app:browser` project were green on their first run after the change. So no component test, specimen, section test, or app layout changed.

## Gate table

The run is `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/gates.sh 1`, with console output in `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/logs/gates-1-run.log.txt`. Each log sits under `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/logs/` and ends in `exit=<code>`. The mutations ran after this gate run and restored every partial byte for byte, so the gate readings hold for the final source.

| Gate | Exit | Reading | Log |
| --- | --- | --- | --- |
| `npm run format:check` | 0 | — | `format-check-1.log.txt` |
| `npm run lint:check` | 0 | — | `lint-check-1.log.txt` |
| `npm run check` | 0 | — | `check-1.log.txt` |
| `npm run build:src` | 0 | — | `build-src-1.log.txt` |
| Owned files (styles project) | 0 | 26 passed | `owned-1.log.txt` |
| `npm run test:conformance` | 0 | 26 passed | `conformance-1.log.txt` |
| `npm run test:src:styles` | 0 | 1500 passed | `src-styles-1.log.txt` |
| `npm run test:setup` | 1 | 1 failed, 308 passed, 12 skipped | `setup-1.log.txt` |
| `npm run test:setup`, re-run | 0 | 321 passed | `setup-2.log.txt` |
| `npm run test:guides` | 0 | 20 passed | `guides-1.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --project app:browser` | 0 | 223 passed | `app-browser-1.log.txt` |

- `setup-1`: this is a timing observation, not a fix. `tests/setupServer.test.ts` timed out at 10100ms in the `oracle action bindings and exclusions` hook and in `records and reads official control state and rejects contradicted or absent obligation steps`. That file reads no cascade this unit changed. The re-run exits 0 with load average 7.05, 10.89, 9.12 (`uptime` after the run). The deciding reading belongs to the Orchestrator.
- `npm run test:conformance` first ran before the ledger edit (`logs/conformance-1.log.txt` was later overwritten by the gate run). It printed the four `reboot` rows to update, the two `margin-top` rows to strike, and the two additions to strike, and nothing else.
- After the gate run, the `FLOW_MARGIN` TSDoc wording changed in `tests/setupStyles.ts`. `oxfmt --check` and `oxlint --deny-warnings` on that file exit 0 (`logs/setupStyles-recheck.log.txt`).

## Shared-file hunks

The exact bytes are in `/home/user/scaffold/.orkestrel/veneer/units/flow2.diff`.

- `guides/veneer.md`, the `reboot` departures table:
  - `hr` `margin`: Veneer `0` becomes `var(--vn-space-8) 0`, and `declared` becomes `tokenized`.
  - `dl` `margin-top` and `pre` `margin-top`: struck, because both sides write `0`.
  - `dl` `margin-bottom` and `pre` `margin-bottom`: Veneer `—` becomes `var(--vn-space-8)`, and `dropped` becomes `tokenized`.
  - `figure` `margin`: Veneer `0` becomes `0 0 var(--vn-space-8)`, and `declared` becomes `tokenized`.
- `guides/veneer.md`, the additions table: the `dl { margin }` and `pre { margin }` rows are struck. `oxfmt` left the column widths unchanged.
- `tests/setupStyles.ts`:
  - The `FLOW_MARGIN` TSDoc reads: "Holds the block-end margin Bootstrap 5.3.8's reboot writes on the `p`, `address`, `ol`, `ul`, `dl`, `pre`, and `figure` tags, and on both block edges of `hr`: the release's `$paragraph-margin-bottom` value, its `$hr-margin-y` value, and the literal its address, list, description list, code block, and figure rules write."
  - The value edits listed in § Tests the change made false.
- `tests/setupStyles.test.ts`, `src/styles/_mixins.scss`, and `app/browser/**`: untouched.
- Proposed patch, not applied. `_fieldset.scss` is off-limits, and deleting the mixin alone breaks the build. Apply the following patch to retire the `box-reset` mixin, whose only caller is now `_fieldset.scss`:

  ```diff
  --- a/src/styles/_mixins.scss
  +++ b/src/styles/_mixins.scss
  @@ -77,8 +77,3 @@
  -@mixin box-reset {
  -	margin: 0;
  -	@content;
  -	border: 0;
  -}
  -
   @mixin caption-text {
  --- a/src/styles/elements/_fieldset.scss
  +++ b/src/styles/elements/_fieldset.scss
  @@ -4,7 +4,8 @@
   	fieldset {
   		min-width: 0;
   		padding: 0;
  -		@include box-reset;
  +		margin: 0;
  +		border: 0;
   	}
  ```

  The compiled `fieldset` rule keeps its declarations in the same order, so the ledger reads no change. The patch has no run here. Its carrier needs `npm run build:src:styles`, `tests/src/styles/elements/fieldset.test.ts`, and `npm run test:conformance`.

## Diff and status

- `/home/user/scaffold/.orkestrel/veneer/units/flow2.diff` is `git diff e07b3a6`.
- `/home/user/scaffold/.orkestrel/veneer/units/flow2-status.txt` is `git status --short`. It lists `M` for `guides/veneer.md`, `src/styles/elements/{_dl,_figure,_hr,_pre}.scss`, `tests/setupStyles.ts`, and `tests/src/styles/elements/{dl,figure,hr,pre}.test.ts`.
- Instruments and logs: `/home/user/scaffold/.orkestrel/veneer/units/flow2-instruments/` (`env.sh`, `probe.sh`, `flow2-probe.mjs`, `owned.sh`, `mutate.sh`, `mutations.sh`, `gates.sh`, and `logs/`).

## Deviation state

No stop. The unit settled these choices itself:

- `hr` writes its declarations inline instead of calling `box-reset`. The retirement of that mixin is the proposed patch in the preceding section.
- `dl` and `pre` use the release's longhands, and `hr` and `figure` use its shorthands, so each ledger row compares like with like.
- The `.figure` placement proof sits in `figure.test.ts`, because it reads the `figure` tag's margin under the class.
- The quotation case's comment was reworded, and its assertions are unchanged.
- The `setup` timeout is recorded as an observation with its re-run.
