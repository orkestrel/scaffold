U4 is **incomplete**. I stopped under the deviation contract because the live preflight reading violates the required portable subset. No record was written, and the integration describes remain unchanged.

Expected: every unrecorded mover belongs to `html`, `table`, `button`, `input`, `select`, or `textarea`. Found: Chromium 141 produces these additional `img::backdrop` rows:

| Longhand | Alone | Preflight |
|---|---|---|
| `overflow-block` | `visible` | `clip` |
| `overflow-clip-margin` | `0px` | `content-box` |
| `overflow-inline` | `visible` | `clip` |
| `overflow-x` | `visible` | `clip` |
| `overflow-y` | `visible` | `clip` |

The diagnostic writer exits **1** with:

```text
Error: An unrecorded preflight mover escapes the permitted elements
```

The evidence is in [preflight-3.log](/home/user/veneer/tmp/units/flip-integration/preflight-3.log) and [preflight-3.err](/home/user/veneer/tmp/units/flip-integration/preflight-3.err). Hypothesis: M2’s inline-style mounting and the existing adopted-sheet reader produce different pseudo-element readings. I changed neither the permitted population nor the existing reader.

The record findings are:

| Record | Stored rows before → after | Result |
|---|---:|---|
| `preflight.json` | 2598 → 2598 | Unchanged; `chromium` remains absent |
| `incompatible.json` | 2326 → 2326 | Unchanged; raw re-derivation not run |

The live major reads **141**. The baseline derives **2595** preflight rows, against the brief’s predicted 2594. The diagnostic reports the five image rows above and eight `table` border-color rows; it reports no added `html` rows. Stored records have no row diff because no write occurred. The complete live-versus-record diff was not completed.

SHA-256 values are identical before and after:

```text
preflight.json
50227e6ebdf9441368685a248dc780efa70c9aec1ab83451516b360ead91f66d

incompatible.json
ae0c20e3819134e94333b9375592ef2d658f9330ce3648e5462d8cd8b953c124

tests/fixtures/tailwindcss/recipe.json
bc584af94f97c73e7c6dd5d212e9889c1caa3502b6d2cdb0a60d667eecffc487
```

Both sheets remain unchanged:

```text
bootstrap
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f

tailwindcss
f24045107a143ae750869243ecc1928e77a4084601718de10f02a9c187b84a40
```

The tuned digest matches the recipe record’s `sheet`.

Implemented additions are `readChromiumMajor`, `partitionPreflightRows`, `collectDeclaredLonghands`, `flattenDeclarations`, and `removeLayerBlocks`, each with an instrument case. The scoped instrument suite passes **33 cases**, exit **0**. Existing instrument behavior is unchanged.

The appended Ruling’s `chromium` interface, guard, sample, and malformed-field controls are implemented. **The partial tree’s guard requires `chromium`, while the unchanged fixture lacks it.** The record-binding suite is therefore not ready for acceptance.

Every integration case retains its original source. The disposition and baseline failure classification are:

| Describe | Case | Disposition; baseline result |
|---|---|---|
| `preflight reset drift` | `pins the live moved rows in both directions with planted and removed controls` | Kept unchanged; replacement pending. **Fails, host-bound** |
| | `restores every recorded longhand with base revert counters and fails with counters stripped` | Kept unchanged; deletion pending because the mirror is retired. **Fails, host-bound** |
| | `keeps the thumbnail max-width beside a counter and lets an unlayered consumer win` | Kept unchanged; recipe amendment pending. Passes |
| `compiled Tailwind compatibility recipe` | `keeps hidden elements hidden and records the display utility departure` | Kept unchanged; three-face amendment pending. Passes |
| | `places properties below reset and rejects a separate Veneer sheet loaded first` | Kept unchanged. Passes with 2px/1px assertions |
| | `restores bare images and lists to lifted Bootstrap and rejects a removed mirror` | Kept unchanged; inversion pending. **Fails, not host-bound** |
| | `keeps the height attribute of a sized image under the recipe and rejects a revert mirror` | Kept unchanged; height amendment pending. **Fails, not host-bound** |
| | `keeps a reset layer value under the recipe and rejects a revert mirror` | Kept unchanged; witness replacement pending. **Fails, not host-bound** |
| `computed Tailwind class relationships` | `partitions every shared name, pins incompatible rows both ways, and restores every carrier under the recipe` | Kept unchanged; raw read and inverted restoration pending. **Fails, not host-bound** |
| | `restores every preflight row under the compiled recipe and exposes the row when its mirror is stripped` | Kept unchanged; deletion and composition replacement pending. **Fails, host-bound** |
| | `keeps collapse show visible under the recipe and reads collapse visibility with the rule exposed` | Kept unchanged; composition amendment pending. **Fails, not host-bound** |
| | `keeps every pair of built sheets disjoint in each shared layer` | Kept unchanged; alternative-sheet exemption pending. **Fails, not host-bound** |
| | `reads a composed border modifier as solid on both sides` | Kept unchanged; bare-border amendment pending. Passes |

No witness, misuse, or statement-sequence case was added. The three host-bound titles remain present and failing; no successor exit is available. `cross-face composition` passes unchanged.

The Chromium pin-4 rewrite list remains unimplemented. Its prescribed declaration difference is the missing `.dropstart .dropdown-toggle::after` `display: inline-block` row after merging; empty layer blocks contribute no declaration rows. U3’s committed Node case additionally records consumed source text, empty reset/bootstrap statements, and joined adjacent grouping blocks. No Chromium comparison ran, so no extra difference is established.

Command results are:

| Command | Exit / result |
|---|---|
| Baseline `npm run test:integration` | **1** — 9 failed, 45 passed |
| Scoped `setupStyles.test.ts` browser suite | **0** — 33 passed |
| Writer path probe | **1** — read denied before writing |
| Corrected writer | **1** — portable-subset violation |
| Diagnostic writer repeat | **1** — same violation |
| `git diff --check` | **0** |

The path probe’s exact error was:

```text
Access denied to "/tests/fixtures/tailwindcss/preflight.json".
```

Using the project-relative path successfully reads the same bytes as the absolute path. Only `preflight-record.test.ts` ran in these writer invocations.

Not run after the required stop: successful writer/idempotence runs; incompatible re-derivation; reverse-order measurements; witness and heading-color readings; pin 4; `npm run test:setup:browser`; all three focused integration commands; `npm run test:setup`; final `npm run test:integration`; `npm run check`; `npm run lint:check`; `npm run format:check`; builds; formatting. These commands have no executed error or skip line.

The writer artifacts are:

- [preflight-record.test.ts](/home/user/veneer/tmp/units/flip-integration/preflight-record.test.ts)
- [incompatible-record.test.ts](/home/user/veneer/tmp/units/flip-integration/incompatible-record.test.ts) — prepared, not run
- [vite.writers.config.ts](/home/user/veneer/tmp/units/flip-integration/vite.writers.config.ts) — selects the preflight writer
- [partial.patch](/home/user/veneer/tmp/units/flip-integration/partial.patch)

Edited tracked files are:

- [setupStyles.ts](/home/user/veneer/tests/setupStyles.ts)
- [setupStyles.test.ts](/home/user/veneer/tests/setupStyles.test.ts)
- [setup.ts](/home/user/veneer/tests/setup.ts)
- [setup.test.ts](/home/user/veneer/tests/setup.test.ts)

Final `git status --porcelain` is:

```text
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

All entries are mine. Initial status was empty at U3 commit `54c05ff`; no uncommitted U3 entries appeared. `flip-probe-3`’s ignored files are listed in [foreign-files.txt](/home/user/veneer/tmp/units/flip-integration/foreign-files.txt), are not mine, and remain untouched. Nothing was committed.