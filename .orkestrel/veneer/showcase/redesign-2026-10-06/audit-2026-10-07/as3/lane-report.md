AS3 implementation evidence. Implementation, M2, source proofs, and the full 98-case journey pass. Final lint and both recaptures pass. The formal journey comparison has 49 differences, all classified within the prediction. One guide count assertion remains outside the granted ownership. The guide gate has one stale count in a file outside the granted ownership.

All 17 spacing maps route steps 3–5 through the existing `measure` mechanism. The three scale records emit `calc(var(--spacing, 0.25rem) * N)`. There are 17 source calls and 113 emitted tuned-sheet declarations for each step. Steps 0–2 and the grid gutter maps remain literal. No runtime browser or section source changed, and no commit was made.

| Step | Bootstrap alone | Layer, default theme | Layer, `--spacing: 0.5rem` |
| --- | --- | --- | --- |
| 3 | 16 px | 12 px | 24 px |
| 4 | 24 px | 16 px | 32 px |
| 5 | 48 px | 20 px | 40 px |

The saved Bootstrap sheet and rebuilt sheet both contain 332,388 bytes. The initial comparison and the comparison after rebuilding both returned `cmp` exit 0. Both SHA-256 values are `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`.

M2 retains the reference form. Integration's pin 4 passes for the default recipe, the changed spacing theme, and `prefix(tw)`, retaining an 8,131-declaration sequence. Under `prefix(tw)`, the unprefixed Bootstrap references use their 0.25rem fallback. The guide states this namespace limit. [M2 readings](m2.json) contain the complete before/after arrays and sequence evidence.

At 1280, the readings are ordered as `p-5`, `p-md-5`, `gap-5`, `column-gap-5`, `px-5`, `px-5 px-lg-4`, `p-4`, and `p-4 p-md-3`:

| Form | Before mapping | After mapping |
| --- | --- | --- |
| Bootstrap | 48, 48, 48, 48, 48, 24, 24, 16 px | Same |
| Recipe | 20, 48, 20, 48, 20, 24, 16, 16 px | 20, 20, 20, 20, 20, 16, 16, 12 px |
| Changed theme | 40, 48, 40, 48, 40, 24, 32, 16 px | 40, 40, 40, 40, 40, 32, 32, 24 px |
| Prefix | 20, 48, 20, 48, 20, 24, 16, 16 px | 20, 20, 20, 20, 20, 16, 16, 12 px |

The new conformance case failed before the maps changed (`as3-regression-before-3`: exit 1, one failed, 130 skipped) and passed afterward (`as3-regression-after-1`: exit 0, one passed, 130 skipped). It also checks 390, where responsive declarations remain inactive. The full conformance gate passed all 131 tests.

| Pin or record | Before | After | Evidence |
| --- | --- | --- | --- |
| Scale records | 26 | 29 | Three spacer records; full conformance passes |
| Guide token rows | 67 | 70 | Equality with the token record passes; fixed count at `tests/guides.test.ts:215` remains outside ownership |
| Admitted Sass `@use` | `_tokens.scss:437` | `_tokens.scss:440` | Full conformance logs the actual load at 440 |
| Recipe sheet digest | `df6faefecd8f9832e273f66abe7886b075bda47de377bf30beab01e3f6560de1` | `b33a639f7dc74feaba6571ba6d870d288bf54fbe3db378286383037c0fc7473a` | Both recipe writers, `as3-records-1`, exit 0 |
| App recipe characters | 383,727 | 393,332 | Live compiler, unchanged 2,039 candidates |
| Fixture recipe characters | 382,331 | 391,936 | Live compiler, unchanged 2,029 candidates |
| App record SHA-256 | `1c30108bc21c3afb2b91758ea2358460284fea2cbd5f8ad629a173de60662fd3` | `721bfbc8037420a30354924bad4c840175d2b92f3b740c99a5445d4f7bc18145` | Writer's before/after log |
| Fixture record SHA-256 | `b6a0039f9c883a40b1aa026aaa68867c7df61bd441fcf2ebf79106257d27338b` | `767ff49c5593126ff552b6f0979944f96cd9d1e8cbe8bcabe99dac83428269cd` | Writer's before/after log |

The writers report byte-identical unexcluded output: 20,662 characters for the app and 19,266 for the fixture. Bootstrap's 8,214-statement pin and the tuned recipe's 8,582-statement pin did not move; full conformance passes both. The guide's shared base spacer readings already stated 12 and 16 px, and no infixed or Bootstrap-only spacer row existed in `TAILWIND_READINGS`. The guide now states the three mappings and the chrome's 16 px Bootstrap / 12 px layer gap.

The independent token substitution proof passes 486 spacing inputs and 39 preservation controls, covering all spacing families and bands while preserving gutters, component paddings, unrelated selectors, wrong properties, and wrong literals. The source derivation proof reads the retained variable shorthand when Chromium serializes its longhands as empty, and includes a planted multiplier change. The Node prefix proof maps 18 `-moz-column-gap` declarations through the spacer records while retaining its lost-prefix and changed-keyframe controls; full conformance reports 2,625 lifted rules, 2,520 tuned rules, 1,049 shared rules, 69 shared prefixed rules, and five keyframes.

The first full journey's child passed 98 tests, but its runner returned 65 because a dot-only reporter did not write `report.json`. The fresh journey `as3-journey-2` adds the JSON reporter and passes: runner exit 0, 98 passed, zero failed or skipped, fresh JSON report and all four copied artifacts. Its official comparison returns 67 for 49 predicted artifact differences, detailed below. The first journey's original variant artifacts were preserved separately; its preliminary row preview changes only eight preservation summaries and keeps all variant row counts and ordinals.

Both showcase builds pass and produce identical 1,391,480-byte `browser.html` files, SHA-256 `7c1e6578659c5ee6246800b10a7ef877c67cffbeb684e8b1da14989f2de66e10`. Saved hash files compare equal (exit 0). The 1280 light recapture passes: 72 sections per face and no browser errors. Reading `065-spacing.png` against the supplied baseline shows one length per step from Base through xl under each face: 16/24/48 px under Bootstrap and 12/16/20 px under the layer, as corroborated by the conformance readings. The xxl column remains inactive at 1280. The Bootstrap image retains its 912×7,961 geometry; the layer image becomes 924×7,484 (baseline 924×8,044). The 390 light recapture also passes with 72 sections per face and no browser errors. Reading both spacing images confirms that Base shows each face's spacing scale and responsive names stay inactive. The layer's row-gap and column-gap specimens agree with its gap specimens. No split Spacing caption is needed.

[Every queued gate, including earlier failures](gate-ledger.md) records commands, folders, exits, and bare results. The exact expanded argv is in [gate-results.json](gate-results.json).

[Deviations](deviations.md) records expected behavior, observed evidence, resolution, and one cause or hypothesis for each deviation. There was no Vite optimizer import failure and no host-bound exception.

The comparison's 49 differences are fully classified in [journey-classification.md](journey-classification.md), with every before/after field in [journey-classification.json](journey-classification.json). Differences 1–16 are the removed/added copies of eight predicted preservation summaries; 18–33 are their line copies; 34–49 are their journal copies. Difference 17 is the comparator's ordered-content flag: every row retains its ordinal. No case entry or statechart row moves. No outside-prediction finding remains. Section readings, signature coverage, and partition rows remain equal; the predicted possible section changes do not appear as separate artifact rows.

| Preservation summary | Utility count | Resolved count | Layout exclusions |
| --- | --- | --- | --- |
| Closed light 1280 | 1683→1510 | 176→81 | 4165→1107 |
| Closed dark 1280 | 1687→1514 | 179→81 | 4200→1108 |
| Closed light 390 | 1683→1510 | 94→80 | 3559→142 |
| Closed dark 390 | 1687→1514 | 97→80 | 3594→143 |
| Offcanvas, each width/theme | 1→0 | 0 unchanged | 0 unchanged |

These reductions follow the mapped spacer lengths in both the actual sheet and the independent Bootstrap substitution oracle. Every other preservation field remains equal. Variant row counts remain dark-1280 184, dark-390 215, light-1280 183, light-390 180.

The built showcase was preserved as [browser-built.html](browser-built.html), then its tracked generated output was restored after both recaptures. Its preserved hash is the equal two-build hash above. [Capture evidence](capture-evidence.json) records the supplied baseline and new image hashes and dimensions.

Final direct gates pass: `git diff --check` exit 0; `git diff --stat -- src/browser app/browser/sections` empty, exit 0; final Bootstrap `cmp` exit 0; showcase hash-file `cmp` exit 0. [Direct evidence](direct-gates.json) retains each command and empty output.

Final diff: 11 files, 344 insertions and 62 deletions. [Full diff](spacing.patch); [source diff without the two generated recipe records](spacing-source.patch).

`git status --porcelain`:

```
 M app/browser/recipe.json
 M guides/veneer.md
 M src/bootstrap/_utilities.scss
 M src/tailwindcss/_tokens.scss
 M tests/conformance.test.ts
 M tests/fixtures/tailwindcss/recipe.json
 M tests/fixtures/tailwindcss/tokens.json
 M tests/integration.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/tailwindcss/index.test.ts
```

The only unfinished correction is [guide-count.patch](guide-count.patch), changing `tests/guides.test.ts:215` from `toHaveLength(67)` to `toHaveLength(70)`. The full token-table equality passes before this separate count assertion. The original owned-file boundary says “Nothing else” and excludes this test file, so the patch has not been applied. Explicit ownership of this one pin would allow the final guide gate to be rerun.
