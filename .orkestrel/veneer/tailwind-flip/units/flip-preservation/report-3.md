# Flip-preservation-3 report — stopped at the planted-preflight control

The 1280 px population reads **zero preflight and zero unattributed departures**, with **14 dependent colors excluded with their invisible color anchors**. The stripped-curation control detects its departures. The planted-preflight control reports **no departure**, so the focused case exits **1** before reaching 390 px. The first brief's explicit stop when a control does not fail remains in force. Nothing is committed.

## Gate readings

The development run `gate-3-dev` measures the following population. A dash means not reached in this continuation, not zero.

| Width | Elements | Signatures | Utility | Resolved | Dependent attributed | Dependents excluded with anchor | Admitted | Excluded chrome / outer shell | Preflight | Unattributed | Inherited |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1280 | 9611 | 1455 | 3282 | 72 | 0 | 14 | 3 | 218 | 0 | 0 | 0 |
| 390 | — | — | — | — | — | — | — | — | — | — | — |

The excluded dependents count is `propagated` in the result. Those readings also count under their anchor's `invisible` exclusion. Attributed dependents retain the anchor's cause and `through: 'color'`; a dependent that differs from `color` under either face retains its own longhand. Physical/logical twins still count once under the physical name, retaining the departing logical names.

The bounded exclusions and box assertion read:

| Width | Layout | Typography | Invisible, including propagated dependents | Tab-size / shorthand | Position-area | Grid tracks | Boxes before | Lost boxes | Width timer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1280 | 3336 | 0 | 3234 | 1455 | 0 | 7 | 9358 | 0 | 20.9372 s |
| 390 | — | — | — | — | — | — | — | — | — |

The population is the main region's component carriers and lifted-rule descendants. Longhands are read on the first element per signature; boxes are checked on every population element. Both faces read the same mounted elements. The 218 excluded carriers are outside main, including chrome and outer shell elements. These are Chromium default-light element readings, not pseudo-element or interactive-state coverage.

Every required admitted entry occurs at 1280 px; `missing` is empty. All carry reason `typography-documented-description` and logical twin `margin-block-end`:

| Specimen | Element | Longhand | Bootstrap | Tailwind + layer |
| --- | --- | --- | --- | --- |
| Description list in Bootstrap's markup | `dl.row` | `margin-bottom` | 16px | 0px |
| Description list in Bootstrap's markup | `dd.col-sm-9` | `margin-bottom` | 8px | 0px |
| Description list in Bootstrap's markup | `dd.col-sm-8` | `margin-bottom` | 8px | 0px |

The earlier carousel `text-decoration-color` residuals are excluded with their textless anchors at 1280 px. The earlier header `z-index` residual remains outside main. There are no rejected ordinary departures to list at that width. The 390 px result from report-2 is historical evidence and is not represented as a reading of this tree.

The complete inventory is [gate-3-dev.log.readings.json](gate-3-dev.log.readings.json). The unabridged streams are [gate-3-dev.log](gate-3-dev.log) and [gate-3-dev.err](gate-3-dev.err).

## Controls and deviation

**Expected:** each production control alone introduces a departure rejected by the preservation assertion, and its stylesheet mutation is restored.

**Found:** stripping curation introduces the following `preflight` departures on the representative `h5.card-title`, in **Card titles in Bootstrap's markup**:

| Longhand | Bootstrap | Stripped recipe | Cause |
| --- | --- | --- | --- |
| `font-size` | 20px | 16px | preflight |
| `font-weight` | 500 | 400 | preflight |

The empty-rejections comparison throws `to deeply equal []`, as the control's `toThrow` assertion requires. Signature grouping selects the representative from the documented card specimen even though the witness is selected by the Tailwind card specimen's title.

After restoration, appending `@layer base { h6 { font-weight: 300 } }` yields the logged line `Component control planted preflight []`. The control's detection assertion fails at `tests/app/browser/integration.test.ts:1280:76`:

```text
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false
```

The planted control does not reach its empty-rejections comparison. Both stylesheet mutations are restored by their `finally` blocks, including the failing planted control. No control mutation remains in a sheet file.

**Evidence:** the focused command reports 1 failed and 21 skipped. Its title is `showcase matrix > attributes every component departure of the tailwindcss face to a declared cause other than preflight at both widths`; it is outside the Host-bound set. This is a failed control, not an ordinary preflight or unattributed finding. The first brief's Deviation contract says to stop when “a control does not fail”; the later briefs preserve that contract.

**Done:** continued the inherited edits; added `resolveDepartureAnchor` and `resolveDepartureExclusion` in `tests/setupStyles.ts`; made the collector apply the anchor's exclusion before attribution; counted propagated exclusions; added the required textless/text-bearing CSSOM proof; strengthened the production controls to exercise the empty-rejections assertion; ran the focused helper selection and the development gate.

**Not done:** the 390 px reading, successful planted-preflight control, final formatting, caption rows and their wrong-value control, an accepted guide sentence, the acceptance sequence, or full-journey timing. No tracked edit follows the stop. No fragment, caption, guide, source, sheet, configuration, or record was edited.

**One hypothesis:** the folded Bootstrap-layer heading curation masks the normal `base`-layer `font-weight: 300` mutation on `h6.dropdown-header`. No further mutation or browser probe was run after the stop to establish this cause.

The focused helper selection passes 4 tests with 137 skipped by the filter, exit 0, in 9.85 s Vitest wall / 11.811 s launcher wall. It includes the textless/text-bearing propagation proof, independent-color behavior, retained Bootstrap attribution, and the existing planted-preflight/lost-box helper proof. Those helper controls do not replace the failed production control. See [helpers-3b.log](helpers-3b.log) and [helpers-3b.err](helpers-3b.err).

An initial helper run exited 1 because `readLonghands` was imported twice in `tests/setupStyles.test.ts`; removing the added duplicate corrected collection. Its complete diagnostics remain in [helpers-3.err](helpers-3.err). That collection failure is not a negative-control result. No `prove` receipt is claimed for these rendered Chromium tests.

## Caption rows and guide sentence

No `TAILWIND_READINGS` rows were added before the stop. The F7 specimens and S7 caption therefore have no completed three-face measurements from this continuation. The admitted description-list readings preceding this paragraph cover only Bootstrap and Tailwind + layer at 1280 px; they are not caption triples.

The guide is unchanged. No sentence for the **Tailwind + layer** row is advanced as a passing claim because the gate and its controls have not completed at both widths.

## Acceptance commands and timing

The prescribed acceptance sequence was not reached. The exact focused command ran during development before that sequence:

```text
npx vitest run --config configs/app/vite.journey.config.ts --project journey:light-1280 -t "attributes every component departure" tests/app/browser/integration.test.ts
```

The measured case stops after the first width's controls. Its internal timer is **22.0269 s**, runner timer **22.501 s**, Vitest wall **31.44 s**, and launcher wall **33.092 s**, uncapped. These partial-run times are not a completed two-width cost comparison against the partition's 53 s. The gate's wall time inside the full journey is **unmeasured**. The archived 449 s and 487 s journey readings remain references. No other browser suite ran alongside either completed development run.

The acceptance status is:

| Command | Expected | Measured | Exit |
| --- | --- | --- | --- |
| `npm run check` | No type errors | Not run after development stop | Not run |
| `npm run lint:check` | No lint findings | Not run | Not run |
| `npm run format:check` | Formatted owned files and clean tree check | Not run; owned files were not formatted in this continuation | Not run |
| Focused gate, exact command preceding this table | Both widths and effective controls | Development: 1280 px ordinary reading clear; planted control ineffective; 1 failed, 21 skipped; 33.092 s launcher wall | 1 |
| `npm run test:setup:browser` | Full setup browser project passes | Not run; the focused helper selection is not this suite | Not run |
| `npm run test:app:browser` | App browser project passes | Not run | Not run |
| `npm run test:journey` | Failures confined to the Host-bound set; gate duration recorded | Not run; no full-run failure inventory or gate duration | Not run |
| `git diff --check` | No whitespace errors | No output; read-only after stop | 0 |
| `sha256sum dist/src/bootstrap/index.css dist/src/tailwindcss/index.css` | Required digests unchanged | Both match | 0 |
| `git status --porcelain` | Only owned files | Exactly the owned paths following this table | 0 |

The full failed focused command diagnostics are preserved without truncation in `gate-3-dev.err`; its complete stdout is `gate-3-dev.log`. No acceptance pass is inferred from report-2.

## Digests and tracked status

The final digest command reads:

```text
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f  dist/src/bootstrap/index.css
b946eefe63628fa64183e8a1518cffb0b145ea6ccd083c69105ae1f6fe900662  dist/src/tailwindcss/index.css
```

HEAD remains `bc35a3e`. Final `git status --porcelain` reads:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

This continuation edits the integration gate, the showcase collector, and the style helper and proof. `tests/setupBrowser.test.ts` remains as inherited from report-2. The status includes all inherited edits. No subagent, install, network request, commit, or write outside the owned files and `tmp/units/flip-preservation` ran. The unit remains unaccepted at the prescribed control stop.

## Complete focused gate diagnostic

The following is the complete stderr, with terminal color escapes removed and no diagnostic lines omitted.

```text

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |journey:light-1280 (chromium)| tests/app/browser/integration.test.ts:1098:3 > showcase matrix > attributes every component departure of the tailwindcss face to a declared cause other than preflight at both widths
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ tests/app/browser/integration.test.ts:1280:76
    1278|       )
    1279|       console.info('Component control planted preflight', JSON.stringi…
    1280|       expect(control.departures.some(({ cause }) => cause === 'preflig…
       |                                                                            ^
    1281|       expect(() =>
    1282|        expect(control.departures.filter(({ cause }) => cause === 'pref…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


exit=1 signal=none capped=false duration_ms=33092

```
