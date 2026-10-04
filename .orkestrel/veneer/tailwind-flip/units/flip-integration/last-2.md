U4 remains **incomplete**. The records regenerate successfully, but the prescribed witness equality fails and requires a ruling beyond Owned scope.

| Record | Rows before → after | `chromium` | Result |
|---|---:|---|---|
| `preflight.json` | 2598 → 2595 | absent → `141` | Regenerated; repeat is byte-identical |
| `incompatible.json` | 2326 → 1870 | Not applicable | Changed under `[built, unexcluded]`; repeat writes nothing |

The blocking measurement is the requirement that every longhand in P equal its preflight-only computed value. The live probe finds **127 differences**, including:

| Witness | Longhand | Preflight-only | Recipe |
|---|---|---|---|
| `h1` | `border-top-color` | `rgb(0, 0, 0)` | `rgb(33, 37, 41)` |
| `a[href]` | `color` | `rgb(0, 0, 0)` | `rgb(33, 37, 41)` |
| `button`, `input[type=text]` | `font-family` | Tailwind’s stack | Bootstrap’s stack |

Preflight declares inherited values and border colors dependent on the element’s color, while the recipe retains Bootstrap’s body color and font. Changing the comparison requires a ruling; changing the sheets is off-limits. Implementation stopped before editing the integration describes.

The probe exits **1** with:

```text
AssertionError: expected [ { element: 'h1', …(5) }, …(126) ] to deeply equal []
```

See [measurement source](/home/user/veneer/tmp/units/flip-integration/measurements.test.ts), [witness readings](/home/user/veneer/tmp/units/flip-integration/witness-reading.json), and [failure output](/home/user/veneer/tmp/units/flip-integration/measurements-1.err).

Hypothesis: the witness contract needs to distinguish inherited and color-dependent computed values from declaration equality.

The preflight row changes are grouped as follows; [the complete diff](/home/user/veneer/tmp/units/flip-integration/preflight-diff.json) retains every value.

| Element | Change |
|---|---|
| `button`, `input`, `select`, `textarea`, including their recorded pseudos | Removed 16 unenumerated `row-rule-color` rows |
| `button` | Updated `background-color` |
| `input` | Updated `inline-size`, `width`, `perspective-origin`, `transform-origin` |
| `select` | Updated `background-color`, `block-size`, `height`, `perspective-origin`, `transform-origin` |
| `textarea` | Updated `inline-size`, `width`, `perspective-origin`, `transform-origin` |
| `table` | Added eight physical and logical border-color rows |
| `img::backdrop` | Added `overflow-block`, `overflow-inline`, `overflow-x`, `overflow-y`: `visible` → `clip`; `overflow-clip-margin`: `0px` → `content-box` |

This is 14 updated rows, 16 removed rows, and 13 added rows. The difference from M2’s predicted 2594 is **five `img::backdrop` movers minus four predicted `html` font-family movers absent from this reading**, yielding net +1. No row was dropped to match the prediction.

The portable instrument accepts the pre-regeneration record: **502 reproduced, 2096 skipped**, and eight permitted unrecorded `table` rows. The skipped population includes all pseudo-element and form-control rows under the follow-up ruling. The saved pre-regeneration input has the original record’s SHA-256.

The incompatible re-read changes only `border`, `border-0`, `border-1`, `border-2`, `border-3`, `border-4`, and `border-5`.

Reverse-order measurements find **no differing longhands on the witness elements** and no incompatible class-delta differences across the shared names and `RELATION_WIDTHS`. The unexcluded text opens with its banner, `@layer properties;`, then `LAYER_STATEMENT`; reversing adoption cannot reorder the already declared shared layers.

Every heading, `h1` through `h6`, reads **`rgb(33, 37, 41)`** under the recipe. The R-minus-P pixel differences observed are heading `line-height` on `h1` through `h5`; these belong to the prescribed ratio rule and are excluded from the failing P assertion.

Record digests are:

```text
preflight.json
before 50227e6ebdf9441368685a248dc780efa70c9aec1ab83451516b360ead91f66d
after  b268723cd388e7711e535fa0d153295a256f9018da6d8b61718fd11b42728430

incompatible.json
before ae0c20e3819134e94333b9375592ef2d658f9330ce3648e5462d8cd8b953c124
after  315d0306b2e68ca0fa44a50f550c77606e07300565707ebf364be3931fe6cd5f
```

Both writers pass together twice. The incompatible file was formatted after its first write; the subsequent run preserves both formatted record digests and `git status --porcelain`.

The CSSOM comparison measures **8042 tuned declaration rows and 8041 recipe rows**. Removing exactly this expected row produces ordered equality:

```text
context:  ""
layer:    bootstrap
selector: .dropstart .dropdown-toggle::after
property: display
value:    inline-block
priority: ""
```

Empty layer blocks contribute no declaration rows. No additional difference appears. See [sequence readings](/home/user/veneer/tmp/units/flip-integration/sequence-reading.json). This comparison is in the scratch probe; the committed case and its planted-rule control remain pending.

Every integration case remains **kept unchanged in source**. The required dispositions and baseline results are:

| Describe / case | Required work still pending | Baseline result |
|---|---|---|
| `preflight reset drift` — `pins the live moved rows in both directions with planted and removed controls` | Amend with version gate, controls, and composition clause | Failed; host-bound title |
| `restores every recorded longhand with base revert counters and fails with counters stripped` | Delete retired counter proof; replace through record/witness proofs | Failed; host-bound title |
| `keeps the thumbnail max-width beside a counter and lets an unlayered consumer win` | Amend to recipe-only composition and retitle | Passed |
| `compiled Tailwind compatibility recipe` — `keeps hidden elements hidden and records the display utility departure` | Amend to three faces and add `until-found` | Passed |
| `places properties below reset and rejects a separate Veneer sheet loaded first` | Keep behavior; rename binding to `tuned` | Passed with 2px/1px |
| `restores bare images and lists to lifted Bootstrap and rejects a removed mirror` | Invert expectations; use deleted `base` control | Failed; not host-bound |
| `keeps the height attribute of a sized image under the recipe and rejects a revert mirror` | Amend to 24px/48px/48px | Failed; not host-bound |
| `keeps a reset layer value under the recipe and rejects a revert mirror` | Delete; replace with witness case | Failed; not host-bound |
| `computed Tailwind class relationships` — `partitions every shared name, pins incompatible rows both ways, and restores every carrier under the recipe` | Amend raw composition and invert utility/component clause | Failed; not host-bound |
| `restores every preflight row under the compiled recipe and exposes the row when its mirror is stripped` | Delete retired mirror proof; replace with record composition clause | Failed; host-bound title |
| `keeps collapse show visible under the recipe and reads collapse visibility with the rule exposed` | Amend compositions | Failed; not host-bound |
| `keeps every pair of built sheets disjoint in each shared layer` | Exempt alternatives `(0, 1)` with control | Failed; not host-bound |
| `reads a composed border modifier as solid on both sides` | Amend exposed composition and add recipe bare-border reading | Passed |

The witness, misuse, and statement-sequence integration cases are **not added**. The three host-bound titles remain present; no replacement has a passing exit. Their requested mapping therefore remains pending. `cross-face composition` passes unchanged in the baseline.

Gate results, including every required acceptance command, are:

| Command | Exit / result |
|---|---|
| Preflight writer alone, twice | **0**, **0** |
| Both writers through `vite.writers.config.ts`, twice | **0**, **0**; two writer cases each |
| `npm run test:setup` | **0**; 153 passed |
| `npm run test:setup:browser` | Not run |
| Scoped `setupStyles.test.ts` browser suite | **0**; 33 passed |
| Integration `-t "preflight reset drift"` | Not run |
| Integration `-t "compiled Tailwind compatibility recipe"` | Not run |
| Integration `-t "computed Tailwind class relationships"` | Not run |
| Baseline `npm run test:integration` | **1**; 9 failed, 45 passed; all failing titles listed above |
| Final `npm run test:integration` | Not run |
| `npm run check` | Not run |
| `npm run lint:check` | Not run |
| `npm run format:check` | Not run |
| `git diff --check` | **0** |
| Sheet SHA-256 check | **0**; both prescribed digests match |
| Witness/sequence measurement probe | **1**; P equality failure quoted above |

Commands marked not run were withheld after the required stop. They have **no executed error or skip line**. Builds did not run.

The final sheet digests remain:

```text
bootstrap
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f

tailwindcss
f24045107a143ae750869243ecc1928e77a4084601718de10f02a9c187b84a40
```

The recipe record remains unchanged at `bc584af94f97c73e7c6dd5d212e9889c1caa3502b6d2cdb0a60d667eecffc487`.

Edited tracked files are:

- [preflight.json](/home/user/veneer/tests/fixtures/tailwindcss/preflight.json)
- [incompatible.json](/home/user/veneer/tests/fixtures/tailwindcss/incompatible.json)
- [setup.ts](/home/user/veneer/tests/setup.ts)
- [setup.test.ts](/home/user/veneer/tests/setup.test.ts)
- [setupStyles.ts](/home/user/veneer/tests/setupStyles.ts)
- [setupStyles.test.ts](/home/user/veneer/tests/setupStyles.test.ts)

Owned-file formatting covered those files except `preflight.json`, whose writer preserves the required serialization. The setup-file edits retain the first run’s instruments and typed guard; this run amends the portable helper and its pseudo-element controls.

The writers and configurations are:

- [preflight-record.test.ts](/home/user/veneer/tmp/units/flip-integration/preflight-record.test.ts)
- [incompatible-record.test.ts](/home/user/veneer/tmp/units/flip-integration/incompatible-record.test.ts)
- [vite.writers.config.ts](/home/user/veneer/tmp/units/flip-integration/vite.writers.config.ts)
- [vite.measurements.config.ts](/home/user/veneer/tmp/units/flip-integration/vite.measurements.config.ts)

Final `git status --porcelain` is:

```text
 M tests/fixtures/tailwindcss/incompatible.json
 M tests/fixtures/tailwindcss/preflight.json
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

These are U4’s changes, including the inherited partial edits. No uncommitted U3 entries appear. `flip-probe-3`’s ignored entries are listed in [foreign-files.txt](/home/user/veneer/tmp/units/flip-integration/foreign-files.txt); they are **not mine**, remain untouched, and do not appear in porcelain status. Nothing was committed.