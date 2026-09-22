<!-- sol on gpt-6-astra, exit 0, retained 2026-09-21. Codex exec thread
01a0c657-b89e-7b43-a670-30bc58d1b36e, launched by units/cl8b-2.sh, journalled at
tmp/codex/cl8b-2.jsonl and swept at acceptance; the thread id is the durable handle. This run made
the tuple correction brief 2 carried and finished the gates the stop left unrun. It supersedes the
stop report at units/cl8b-report.md. -->

CL8b’s implementation and requested CLI proofs are complete. The corrected multiset assertion passes, the row key closes, and the gate chain passes on managed Chromium. The styles, browser-setup, and app-browser projects also pass on Edge. HEAD remains `d2c5bb3`. Nothing was committed, pushed, or installed, and no agents were spawned.

The effective assignment is `cl8b-brief-2.md` over `cl8b-brief.md`. This report supersedes the stop report at `cl8b-report.md`.

The shipped vocabulary is as follows.

| Key | Shipped behavior | Accounting |
| --- | --- | --- |
| `g` | Sets horizontal and vertical gutters through the recorded grouped rules. | Selector row and variable rows for `--bs-gutter-x` and `--bs-gutter-y`. |
| `gx` | Sets the horizontal gutter. | Selector row and `--bs-gutter-x` variable row. |
| `gy` | Sets the vertical gutter. | Selector row and `--bs-gutter-y` variable row. |
| `row-gap` | Sets the row gap in an independent rule, retaining Bootstrap’s important priority. | Selector row; the inventory’s properties object is empty. |
| `row` | Includes its previously deferred row-gap vocabulary. | Its row-gap deferrals are deleted. |

The utilities ship steps `0, 1, 2, 3, 4, 5`, unconditioned and at `sm, md, lg, xl, xxl`. The setup proof binds the step values to the inventory and the infixes to the nonzero ramp members. No assigned selector is withheld. The `gap` and `column-gap` keys remain outside this unit, assigned to the utilities family.

The partial remains at `src/styles/utilities/_gap.scss`, loaded after the component partials through `src/styles/index.scss`. It uses the utilities cascade layer already declared by the token partial. Its shared step list runs inside the grid pattern’s ramp loop, with an empty infix at the zero boundary.

The scale remains in `src/styles/_tokens.scss`, with registry leaves under `TOKEN_NAMES.gap` in `src/core/constants.ts`. The tokens `--vn-gap-0` through `--vn-gap-5` carry `0, 0.25rem, 0.5rem, 1rem, 1.5rem, 3rem`. They contain no density factor and remain distinct from the gutter axis defaults. This follows the existing per-step token form.

The placement and scale-shape Unknowns therefore remain settled as brief 2 confirms. The shared-block Unknown also closes: the setup project passes its assertion that the style partials carry no shared written declaration block. No mixin extraction was needed.

The layout showcase retains the authored “Gutter steps,” “Independent gutters,” and “Responsive gutters and row gap” specimens. Its proof checks their rendered markup and utility selectors. The app-browser project passes on each requested browser.

The tuple correction in `tests/setupStyles.test.ts` is exactly:

```diff
- const recorded = (['row', 'col', 'offset', 'g', 'gx', 'gy', 'row-gap'] as const)
+ const recorded = (['row', 'col', 'offset', 'g', 'gx', 'gy'] as const)
```

The collector prefix remains `/^\.(?:row|col|offset|g|gx|gy)(?:-|[^\w-]|$)/u`. The gutter alternatives admit the gutter selectors; the row alternative already admits row-gap selectors. The recorded tuple avoids repeating the row-gap entries already carried by row. The combined gutter selector remains present in its horizontal rule and its vertical rule.

The corrected setup and conformance commands returned the following results.

```text
bash cl8b-run.sh styles-build-2 npm.cmd run build:src:styles
✓ built in 443ms
EXIT=0

bash cl8b-run.sh setup-corrected npm.cmd run test:setup
 Test Files  3 passed (3)
      Tests  147 passed (147)
EXIT=0

bash cl8b-run.sh conformance-2 npm.cmd run test:conformance
 Test Files  1 passed (1)
      Tests  10 passed (10)
EXIT=0
```

The deleted deferrals cover every listed step under each following selector form.

```text
.row-gap-{step}
.row-gap-sm-{step}
.row-gap-md-{step}
.row-gap-lg-{step}
.row-gap-xl-{step}
.row-gap-xxl-{step}

step = 0, 1, 2, 3, 4, 5
```

The conformance assertion requires the shipped selectors and properties, rejects the remaining deferrals if emitted, and compares the guide’s shipped keys with the sorted listing containing `g`, `gx`, `gy`, and `row-gap`. The supplemental accounting command returned:

```text
bash cl8b-run.sh accounting-2 node cl8b-accounting-2.mjs
row-gap recorded=36 emitted=36 missing=0 extra=0 deferred=0
g: entries=72 distinct=36 properties=["--bs-gutter-x","--bs-gutter-y"]
steps=[0,1,2,3,4,5]
gx: entries=36 distinct=36 properties=["--bs-gutter-x"]
steps=[0,1,2,3,4,5]
gy: entries=36 distinct=36 properties=["--bs-gutter-y"]
steps=[0,1,2,3,4,5]
row-gap: entries=36 distinct=36 properties=[]
steps=[0,1,2,3,4,5]
EXIT=0
```

The multiset controls modify only the built `dist/src/styles/index.css` file. Their instrument is `cl8b-control-2.mjs`. It saves the original bytes, makes the named change through PostCSS, and restores those exact bytes. The assertion measures selector multiplicity and media ancestry within its admitted prefixes; it does not measure declaration values.

For the missing-selector control, the instrument removes `.gx-0` from its horizontal rule while retaining `.g-0`. These are the exact commands and relevant failing output.

```text
bash cl8b-run.sh missing-plant-2 node cl8b-control-2.mjs plant missing
bash cl8b-run.sh missing-red-2 npm.cmd run test:setup -- tests/setupStyles.test.ts -t "binds the built grid selector and media-condition multiset"

FAIL |setup| tests/setupStyles.test.ts > styles setup > binds the built grid selector and media-condition multiset to the inventory minus deferrals
AssertionError: expected [ '[".col",[]]', …(377) ] to deeply equal [ '[".col",[]]', …(378) ]

- Expected
+ Received
-   "[\".gx-0\",[]]",

 Test Files  1 failed (1)
      Tests  1 failed | 86 skipped (87)
EXIT=1

bash cl8b-run.sh missing-restore-2 node cl8b-control-2.mjs restore missing
bash cl8b-run.sh missing-green-2 npm.cmd run test:setup -- tests/setupStyles.test.ts -t "binds the built grid selector and media-condition multiset"

 Test Files  1 passed (1)
      Tests  1 passed | 86 skipped (87)
EXIT=0
```

For the extra-selector control, the instrument appends `.gx-unrecorded { --bs-gutter-x: 0 }`. That selector lies under an admitted gutter prefix and outside the recorded vocabulary. The commands and relevant output are:

```text
bash cl8b-run.sh extra-plant-2 node cl8b-control-2.mjs plant extra
bash cl8b-run.sh extra-red-2 npm.cmd run test:setup -- tests/setupStyles.test.ts -t "binds the built grid selector and media-condition multiset"

FAIL |setup| tests/setupStyles.test.ts > styles setup > binds the built grid selector and media-condition multiset to the inventory minus deferrals
AssertionError: expected [ '[".col",[]]', …(379) ] to deeply equal [ '[".col",[]]', …(378) ]

- Expected
+ Received
+   "[\".gx-unrecorded\",[]]",

 Test Files  1 failed (1)
      Tests  1 failed | 86 skipped (87)
EXIT=1

bash cl8b-run.sh extra-restore-2 node cl8b-control-2.mjs restore extra
bash cl8b-run.sh extra-green-2 npm.cmd run test:setup -- tests/setupStyles.test.ts -t "binds the built grid selector and media-condition multiset"

 Test Files  1 passed (1)
      Tests  1 passed | 86 skipped (87)
EXIT=0
```

The initial browser run exposed a lexical mismatch in the authored token assertion: the minified cascade returns `.25rem`, while the inventory writes `0.25rem`. The partial already carries the recorded length. The proof expands an omitted leading zero before its exact token comparison: `readToken(row, token).replace(/^\./u, '0.')`. The expected values and every resolved geometry assertion remain unchanged. No partial value needed correction.

The same browser command failed before that normalization and passed after it:

```text
bash cl8b-run.sh gap-browser-2 npm.cmd run test:src:styles -- tests/src/styles/utilities/gap.test.ts

AssertionError: expected '.25rem' to be '0.25rem' // Object.is equality
 Test Files  1 failed (1)
      Tests  6 failed | 1 passed (7)
EXIT=1

bash cl8b-run.sh gap-browser-normalized-2 npm.cmd run test:src:styles -- tests/src/styles/utilities/gap.test.ts

 Test Files  1 passed (1)
      Tests  7 passed (7)
EXIT=0
```

The passing browser proofs read the following resolved values. Each sequence follows the step order `0, 1, 2, 3, 4, 5`.

| Reading at an active utility | Resolved pixels |
| --- | --- |
| Horizontal row margins for `g` and `gx` | `0, -2, -4, -8, -12, -24` |
| Child horizontal padding for `g` and `gx` | `0, 2, 4, 8, 12, 24` |
| Row top margin for `g` and `gy` | `0, -4, -8, -16, -24, -48` |
| Child top margin for `g` and `gy` | `0, 4, 8, 16, 24, 48` |
| Row gap for `row-gap` | `0, 4, 8, 16, 24, 48` |

Before activation, the readings retain horizontal row margins of `-12px`, child padding of `12px`, vertical margins of `0px`, and a row gap of `normal`. Axis-specific utilities leave the other axis at its default. The proofs visit `575/576/577`, `767/768/769`, `991/992/993`, `1199/1200/1201`, and `1399/1400/1401` pixels, plus `375` and `1401` for the unconditioned classes.

The authored density and retuning case also passes. With the specimen’s density factor set to `2`, step 4 retains `12px` child padding, `-24px` row top margin, and `24px` row gap. Retuning its step token to `2rem` produces `-16px` horizontal row margin, `16px` child padding, `-32px` row top margin, and `32px` child top margin and row gap. The default row retains its `-12px` horizontal margin.

The emitted-value control changes the horizontal declaration shared by `.g-1` and `.gx-1` from `var(--vn-gap-1)` to `var(--vn-gap-2)`. It invokes Vitest directly so the styles script does not rebuild over the planted value. These are the commands and output.

```text
bash cl8b-run.sh value-plant-2 node cl8b-control-2.mjs plant value
bash cl8b-run.sh value-red-2 node node_modules/vitest/vitest.mjs run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/gap.test.ts -t "resolves every step around the 'xs' boundary"

FAIL |[object Object] (chromium)| tests/src/styles/utilities/gap.test.ts:13:32 > gap utilities > resolves every step around the 'xs' boundary
AssertionError: expected -4 to be -2 // Object.is equality

- Expected
+ Received
- -2
+ -4

 Test Files  1 failed (1)
      Tests  1 failed | 6 skipped (7)
EXIT=1

bash cl8b-run.sh value-restore-2 node cl8b-control-2.mjs restore value
bash cl8b-run.sh value-green-2 node node_modules/vitest/vitest.mjs run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/utilities/gap.test.ts -t "resolves every step around the 'xs' boundary"

 Test Files  1 passed (1)
      Tests  1 passed | 6 skipped (7)
EXIT=0
```

The following SHA-256 readings prove restoration of the built CSS. Each restore command exits 0 and compares the restored bytes with its saved original.

| Control | Planted SHA-256 |
| --- | --- |
| Missing selector | `72bf20ce60316450cc7c3f6906c12b30fa0a45dfc2772c8da25d564d8d26904f` |
| Extra selector | `0da0674d24e8f88ad7de2194ae51f10f24738fb2d6214d1b7c977d699cbcd421` |
| Emitted value | `c756ff434245e41d26a5f6cc31f7c29e3da4cc71b68503f5e47308fbb0fe6611` |

Every control records this same original and restored digest:

```text
RESTORED dist/src/styles/index.css SHA256=a03077e3f0d1087a6df9f0a1415ddfc4c4fbcdc5fac17c6b0f82b841a48bb0b6
ORIGINAL SHA256=a03077e3f0d1087a6df9f0a1415ddfc4c4fbcdc5fac17c6b0f82b841a48bb0b6
```

The final build after the browser gates has that digest too. The filtered control commands account for their reported skipped tests; they introduce no skipped test declarations.

The browser-host instrument launched the resolved browsers on Windows on 2026-09-21. Its commands were:

```text
bash cl8b-run.sh browser-host-2 node --experimental-strip-types cl8b-browser-host-2.mjs
bash cl8b-run.sh browser-edge-host-2 env PLAYWRIGHT_CHANNEL=msedge node --experimental-strip-types cl8b-browser-host-2.mjs
```

Managed Chromium resolved to `C:\Users\mikes\AppData\Local\ms-playwright\chromium-1243\chrome-win64\chrome.exe`, with no executable, endpoint, or channel override; its version was `153.0.8010.12`. Edge resolved through `{"launchOptions":{"channel":"msedge"}}` and returned version `153.0.4234.48`. Each launch exited 0.

The gate chain ran in the required order. The table gives the exact commands, exit codes, and final result lines.

| Command | Exit | Final result |
| --- | --- | --- |
| `bash cl8b-run.sh gate-format-2 npm.cmd run format:check` | 0 | `All matched files use the correct format.` |
| `bash cl8b-run.sh gate-lint-2 npm.cmd run lint:check` | 0 | `EXIT=0`; no diagnostic output. |
| `bash cl8b-run.sh gate-check-2 npm.cmd run check` | 0 | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`, then `EXIT=0`. |
| `bash cl8b-run.sh gate-build-2 npm.cmd run build` | 0 | `✓ built in 567ms`, then `EXIT=0`. |
| `bash cl8b-run.sh gate-test-2 npm.cmd test` | 0 | Guides finished with `Test Files  1 passed (1)`, `Tests  18 passed (18)`, then `EXIT=0`. |

The managed-Chromium test chain contains these actual result lines.

| Project or command segment | Test files | Tests |
| --- | --- | --- |
| Core and browser source | `8 passed (8)` | `51 passed (51)` |
| Styles | `54 passed (54)` | `356 passed (356)` |
| App browser | `9 passed (9)` | `24 passed (24)` |
| Journeys | `4 passed (4)` | `84 passed \| 4 skipped (88)` |
| Policy | `1 passed (1)` | `109 passed \| 1 skipped (110)` |
| Configuration | `1 passed (1)` | `173 passed \| 1 skipped (174)` |
| Setup | `3 passed (3)` | `147 passed (147)` |
| Browser setup | `1 passed (1)` | `33 passed (33)` |
| Conformance | `1 passed (1)` | `10 passed (10)` |
| Guides | `1 passed (1)` | `18 passed (18)` |

The existing conditional skips concern capture-file assertions when capture is disabled, the policy term-file check when its target-local rule file is absent, and the unavailable-extractor case when the extractor is installed. No CL8b proof is skipped in the full run.

The explicit app-browser alias and the Edge commands returned these results.

| Command | Exit | Final result lines |
| --- | --- | --- |
| `bash cl8b-run.sh chromium-app-browser-2 npm.cmd run test:app:browser` | 0 | `Test Files  9 passed (9)`; `Tests  24 passed (24)` |
| `bash cl8b-run.sh edge-styles-2 env PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | 0 | `Test Files  54 passed (54)`; `Tests  356 passed (356)` |
| `bash cl8b-run.sh edge-setup-browser-2 env PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser` | 0 | `Test Files  1 passed (1)`; `Tests  33 passed (33)` |
| `bash cl8b-run.sh edge-app-browser-2 env PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | 0 | `Test Files  9 passed (9)`; `Tests  24 passed (24)` |

The logs retain the browser externalization warnings and API Extractor’s TypeScript-version notice; neither caused a failing gate. Every wrapper command writes its complete output to `cl8b-<label>.log.txt`, where the label is the argument following `cl8b-run.sh`.

The actual final `git diff --stat` output is:

```text
 app/browser/constants.ts                         | 21 +++++-
 guides/veneer.md                                 | 85 ++++++++++--------------
 src/core/constants.ts                            |  8 +++
 src/styles/_tokens.scss                          |  6 ++
 src/styles/index.scss                            |  1 +
 tests/app/browser/sections/LayoutSection.test.ts |  9 +++
 tests/conformance.test.ts                        |  4 ++
 tests/setupConformance.test.ts                   |  4 ++
 tests/setupStyles.test.ts                        | 42 +++++++++++-
 tests/setupStyles.ts                             | 12 +++-
 10 files changed, 140 insertions(+), 52 deletions(-)
```

The actual final `git status --porcelain --untracked-files=all` output is:

```text
 M app/browser/constants.ts
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_tokens.scss
 M src/styles/index.scss
 M tests/app/browser/sections/LayoutSection.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? src/styles/utilities/_gap.scss
?? tests/src/styles/utilities/gap.test.ts
```

Git also reports:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
```

Every reported worktree path belongs to the brief. The untracked partial and browser proof are not included in the diff statistic. The report, instruments, control snapshots, and logs remain under ignored `tmp/`. The `git diff --check` command exits 0.

No assigned implementation or requested CLI gate remains open. The expected probe-tool limitation remains as recorded by the prior run: `MCP tool call requires approval, but approval policy is never`. No probe receipt was produced; the evidence in this report is the executed CLI controls and gates.

