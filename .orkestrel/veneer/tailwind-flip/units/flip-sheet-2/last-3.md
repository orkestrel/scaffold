Stopped under the brief’s deviation contract. U2b’s implementation, precedence proof, formatting, and record regeneration are done; acceptance remains incomplete.

U3’s conformance pin expects **45** joined `bootstrap` blocks. The folded sheet produces **46**, plus **1** adjacent `:where(.table) th` merge. Updating that pin requires the off-limits [tests/conformance.test.ts](/home/user/veneer/tests/conformance.test.ts:1186). Nothing was committed.

Hypothesis: U3 must remeasure its syntactic-rewrite inventory for the scoped emission.

1. Acceptance results follow in the prescribed order.

| Command | Expected | Measured | Exit |
|---|---|---|---:|
| `npm run build:src:bootstrap` | Build succeeds; prescribed digest | Digest unchanged | 0 |
| `npm run build:src:tailwindcss` | Build succeeds; digest recorded | Digest recorded below | 0 |
| `npx vitest run --config tmp/units/flip-records/vite.writers.config.ts`, run 1 | Both records regenerate | 2 passed | 0 |
| Same writer command, run 2 | Equal digests and Git status | 2 passed; both digests and status identical | 0 |
| `npm run check:src:bootstrap` | Pass | Pass | 0 |
| `npm run check:src:tailwindcss` | Pass | Pass | 0 |
| `npm run check` | Pass | Pass | 0 |
| `npm run lint:check` | Pass | Owned diagnostics repaired; rerun passes | 1 → 0 |
| `npm run format:check` | Pass | Pass after owned-file formatting | 0 |
| `npm run test:src:bootstrap` | Pass | 14 passed | 0 |
| `npm run test:src:tailwindcss` | Pass | 6 passed | 0 |
| `npm run test:setup` | Pass | 153 passed | 0 |
| `npm run test:setup:browser` | Only stated U6 failure permitted | Final run: 127 passed; stated U6 case fails | 1 |
| `npx vitest run --config vite.config.ts --project conformance tests/conformance.test.ts -t "Tailwind compatibility recipe"` | Pass | 9 passed; rewrite-count pin fails; 107 unselected tests skipped | 1 |
| `npm run test:integration` | Observation; report failing titles | Not run after required stop | — |
| `git diff --check` | No whitespace errors | No output | 0 |

Formatting covered the ten inherited modified files and `tests/types.ts`. The final invalid-selector assertion edit also passed the per-file formatter check.

The initial lint failure’s complete output was:

```text
> @orkestrel/veneer@0.0.1 lint:check
> oxlint --config .oxlintrc.json --deny-warnings .

tests/src/tailwindcss/index.test.ts:304:5: error vitest(valid-expect): Expect takes at most 1 argument help: Remove the extra arguments.
tests/src/tailwindcss/index.test.ts:311:5: error vitest(valid-expect): Expect takes at most 1 argument help: Remove the extra arguments.
tests/src/tailwindcss/index.test.ts:312:5: error vitest(valid-expect): Expect takes at most 1 argument help: Remove the extra arguments.
tests/src/tailwindcss/index.test.ts:313:5: error vitest(valid-expect): Expect takes at most 1 argument help: Remove the extra arguments.
tests/src/tailwindcss/index.test.ts:314:5: error vitest(valid-expect): Expect takes at most 1 argument help: Remove the extra arguments.
tests/src/tailwindcss/index.test.ts:445:4: error vitest(valid-expect): Expect takes at most 1 argument help: Remove the extra arguments.
tests/src/tailwindcss/index.test.ts:337:85: error vitest(require-to-throw-message): Require a message for "toThrow". help: Add an error message to "toThrow"
tests/src/tailwindcss/index.test.ts:351:68: error vitest(require-to-throw-message): Require a message for "toThrow". help: Add an error message to "toThrow"
tests/setupStyles.ts:20:12: error typescript(array-type): Array type using 'readonly T[]' is forbidden for non-simple types. Use 'ReadonlyArray<T>' instead. help: Replace `readonly (readonly SelectorReading[])[]` with `ReadonlyArray<readonly SelectorReading[]>`.
tests/setupStyles.test.ts:69:50: error vitest(require-to-throw-message): Require a message for "toThrow". help: Add an error message to "toThrow"
```

The first browser setup run’s complete stdout and stderr follow. Terminal color escapes are omitted; diagnostic text is unchanged. The original bytes remain in [stdout](/home/user/veneer/tmp/units/flip-sheet-2/setup-browser.log) and [stderr](/home/user/veneer/tmp/units/flip-sheet-2/setup-browser.err).

```text
> @orkestrel/veneer@0.0.1 test:setup:browser
> vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser


 RUN  v4.1.11 /home/user/veneer

············x··························································x························································

 Test Files  2 failed (2)
      Tests  2 failed | 126 passed (128)
   Start at  10:13:54
   Duration  90.70s (transform 0ms, setup 611ms, import 315ms, tests 91.74s, environment 0ms)


⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts:827:2 > specimen readings > reads every Tailwind reading the caption claims under both stylesheet sets
AssertionError: expected [ '32px', '16px', '24px', …(11) ] to deeply equal [ '32px', '16px', '24px', …(11) ]

- Expected
+ Received

@@ -8,9 +8,9 @@
    "1140px",
    "800px",
    "grid",
    "flex",
    "16px",
-   "inline",
-   "disc",
+   "block",
+   "none",
    "none",
  ]

 ❯ tests/setupBrowser.test.ts:832:48
    830|    for (const face of ['bootstrap', 'tailwindcss'] as const) {
    831|     await applyFace(face)
    832|     expect(TAILWIND_READINGS.map(readTailwind)).toEqual(
       |                                                ^
    833|      TAILWIND_READINGS.map((reading) => resolveExpectation(reading, fa…
    834|     )

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯

 FAIL  |setup:browser (chromium)| tests/setupStyles.test.ts:42:2 > CSSOM instruments > reads native specificity for selector lists, zero-weight scopes, and functional selectors
AssertionError: expected error to be instance of Error

- Expected:
[Function Error]

+ Received:
{
  "log": [],
  "message": "cdpSession.send: Protocol error (CSS.addRule): SyntaxError Rule text is not valid.",
  "name": "Error",
  "stack": "cdpSession.send: Protocol error (CSS.addRule): SyntaxError Rule text is not valid.
    at BrowserServerCDPHandler.send (/home/user/veneer/node_modules/@vitest/browser/dist/index.js:1413:23)
    at Proxy.sendCdpEvent (/home/user/veneer/node_modules/@vitest/browser/dist/index.js:3303:16)
    at WebSocket.onMessage (/home/user/veneer/node_modules/@vitest/browser/dist/index.js:2951:14)",
}

 ❯ tests/setupStyles.test.ts:69:41
     67|   ])
     68|   expect(await readSpecificities([])).toEqual([])
     69|   await expect(readSpecificities(['['])).rejects.toThrow(Error)
       |                                         ^
     70|   expect((await readSpecificities(['th']))[0]?.[0]?.specificity).toEqu…
     71|  })

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯


exit=1 signal=none capped=false duration_ms=92209
```

The owned failure was repaired by matching CDP’s exact serialized error message. The final browser setup output follows; original bytes remain in [stdout](/home/user/veneer/tmp/units/flip-sheet-2/setup-browser-retry.log) and [stderr](/home/user/veneer/tmp/units/flip-sheet-2/setup-browser-retry.err).

```text
> @orkestrel/veneer@0.0.1 test:setup:browser
> vitest run --config vite.config.ts --no-cache --reporter=dot --project setup:browser


 RUN  v4.1.11 /home/user/veneer

·······································································x························································

 Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 127 passed (128)
   Start at  10:15:54
   Duration  94.52s (transform 0ms, setup 714ms, import 345ms, tests 86.62s, environment 0ms)


⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts:827:2 > specimen readings > reads every Tailwind reading the caption claims under both stylesheet sets
AssertionError: expected [ '32px', '16px', '24px', …(11) ] to deeply equal [ '32px', '16px', '24px', …(11) ]

- Expected
+ Received

@@ -8,9 +8,9 @@
    "1140px",
    "800px",
    "grid",
    "flex",
    "16px",
-   "inline",
-   "disc",
+   "block",
+   "none",
    "none",
  ]

 ❯ tests/setupBrowser.test.ts:832:48
    830|    for (const face of ['bootstrap', 'tailwindcss'] as const) {
    831|     await applyFace(face)
    832|     expect(TAILWIND_READINGS.map(readTailwind)).toEqual(
       |                                                ^
    833|      TAILWIND_READINGS.map((reading) => resolveExpectation(reading, fa…
    834|     )

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


exit=1 signal=none capped=false duration_ms=96236
```

The conformance failure’s complete output was:

```text
 RUN  v4.1.11 /home/user/veneer

 ❯ |conformance| tests/conformance.test.ts (117 tests | 1 failed | 107 skipped) 1792ms
     × pins the tuned-sheet statement sequence to the measured syntactic rewrites 127ms

 Test Files  1 failed (1)
      Tests  1 failed | 9 passed | 107 skipped (117)
   Start at  10:17:37
   Duration  2.89s (transform 577ms, setup 563ms, import 367ms, tests 1.79s, environment 0ms)


⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |conformance| tests/conformance.test.ts > Tailwind compatibility recipe > pins the tuned-sheet statement sequence to the measured syntactic rewrites
AssertionError: expected [ [ 'empty reset', 1 ], …(10) ] to deeply equal [ [ 'empty reset', 1 ], …(9) ]

- Expected
+ Received

@@ -7,11 +7,15 @@
      "empty bootstrap",
      215,
    ],
    [
      "@layer bootstrap {",
-     45,
+     46,
+   ],
+   [
+     ":where(.table) th {",
+     1,
    ],
    [
      ".dropstart .dropdown-toggle::after {",
      1,
    ],

 ❯ tests/conformance.test.ts:1186:23
    1184|   }
    1185|   expect(stack).toEqual([])
    1186|   expect([...counts]).toEqual([
       |                       ^
    1187|    ['empty reset', 1],
    1188|    ['empty bootstrap', 215],

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


exit=1 signal=none capped=false duration_ms=4433
```

The ellipses inside these diagnostics are Vitest’s output.

2. The folded table contains **30 reboot, 10 restore, and 6 scoped rows**.

| Form | Classes or selectors | Longhands |
|---|---|---|
| reboot | `modal-title`, `offcanvas-title`, `card-title`, `accordion-header` | `font-size, font-weight` |
| reboot | `popover-header` | `font-weight` |
| reboot | `card-text`, `pagination`, `placeholder-glow`, `lead`, `display-1`, `display-2`, `display-3`, `display-4`, `display-5`, `list-unstyled` | `margin-block-end, margin-bottom` |
| reboot | `stretched-link`, `visually-hidden-focusable`, `card-link` | `color, text-decoration-color, text-decoration-line` |
| reboot | `icon-link` | `color, text-decoration-line` |
| reboot | `alert-link`, `link-primary`, `link-secondary`, `link-success`, `link-danger`, `link-warning`, `link-info`, `link-light`, `link-dark`, `link-body-emphasis` | `text-decoration-line` |
| reboot | `focus-ring` | `color` |
| restore | `svg:where(.bi)`, `img:where(.figure-img)`, `img:where(.img-fluid)` | `display` |
| restore | `img:where(.card-img)`, `img:where(.card-img-top)`, `img:where(.card-img-bottom)` | `max-width` |
| restore | `input:where(.form-check-input)`, `input:where(.btn-check)`, `input:where(.form-range)` | `color` |
| restore | `button:where(.accordion-button)` | `font-weight` |
| scoped | `:where(.table) thead`, `:where(.table) tfoot`, `:where(.table) tr`, `:where(.table) th`, `:where(.table) td` | Four physical border colors |
| scoped | `:where(.table) tbody` | Four physical border colors and `border-top-width` |

Every separately named reboot and restore row reads **1 element**. Scoped counts and readings follow. Color tuples are top, right, bottom, left:

- `D` = `rgb(222, 226, 230)`
- `F` = `rgb(33, 37, 41)`
- `V` = `rgb(166, 181, 204)`
- `B` = `rgb(0, 0, 0)`

Bootstrap alone and the compiled recipe agree on every plain and hazard reading.

| Scoped tag | Elements | Plain reading | Hazard reading | Repair removed |
|---|---:|---|---|---|
| `thead` | 1 | `D,D,D,D` | None prescribed | `F,F,F,F` |
| `tbody` | 2 | `D,D,D,D`; top width `0px` | Divider: `F,D,D,D`; top width `2px` | Both `F,F,F,F`; widths unchanged |
| `tfoot` | 1 | `D,D,D,D` | None prescribed | `F,F,F,F` |
| `tr` | 2 | `D,D,D,D` | Primary variant: `V,V,V,V` | Plain becomes `F,F,F,F`; variant unchanged |
| `th` | 2 | `D,D,D,D` | Primary variant: `V,V,V,V` | Both become `B,B,B,B` |
| `td` | 2 | `D,D,D,D` | Primary variant: `V,V,V,V` | Both become `B,B,B,B` |

The inventory follows the [audit’s disposition table and items 2–4 and 8](/home/user/scaffold/tmp/codex/flip-curation-audit-last.md), [probe curation](/home/user/veneer/tmp/probes/flip4/curation.json), and [design verdict §§2–4 and 12](/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design-verdict.md), amended by the supplied briefs.

3. The derivation proof computes and pins **73 originals, 72 curated copies, and 7 scoped copies**.

| Original selector | Scoped copy |
|---|---|
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) thead` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) tbody` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) tfoot` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) tr` |
| `th` | `:where(.table) th` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) th` |
| `thead, tbody, tfoot, tr, td, th` | `:where(.table) td` |

4. The precedence case passes with **79 copy rules and 138 equal specificity pairs**, grouped under **67 distinct original selector lists**.

Chromium reads both sides through the same native parser. All copies occupy `bootstrap`. Their flattened style-rule positions precede `.lead` at **165**; scoped copies occupy **158–164**.

The required focused-button pair is:

```text
button:focus:not(:focus-visible)                    (0,2,1)
button:focus:not(:focus-visible):where(…)           (0,2,1)
copy position: 98; component boundary: 165
```

The following table reports counts per original. Semicolons separate independent original selector lists; counts apply to each. `001`, for example, means `(0,0,1)`. Every listed tuple equals its copy’s tuple.

| Original selector list | Copies | Equal pairs |
|---|---:|---|
| `*, ::before, ::after` | 1 | `1×000, 2×001` |
| `:root` | 1 | `1×010` |
| `body`; `hr`; `p`; `address`; `dt`; `dd`; `blockquote`; `sub`; `sup`; `a`; `pre`; `code`; `kbd`; `figure`; `table`; `caption`; `label`; `button`; `select`; `textarea`; `fieldset`; `legend + *`; `::-webkit-inner-spin-button`; `::-webkit-search-decoration`; `::-webkit-color-swatch-wrapper`; `::-webkit-file-upload-button`; `::file-selector-button`; `output`; `iframe`; `summary`; `progress` | 1 each | `1×001` each |
| `h6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1` | 1 | `6×001, 6×010` |
| `h1, .h1`; `h2, .h2`; `h3, .h3`; `h4, .h4` | 2 each | `2×001, 2×010` each |
| `h5, .h5`; `h6, .h6`; `small, .small`; `mark, .mark` | 1 each | `1×001, 1×010` each |
| `abbr[title]`; `a:hover`; `select:disabled`; `[type="search"]::-webkit-search-cancel-button` | 1 each | `1×011` each |
| `ol, ul`; `b, strong`; `sub, sup`; `img, svg`; `button, select` | 1 each | `2×001` each |
| `ol, ul, dl` | 1 | `3×001` |
| `ol ol, ul ul, ol ul, ul ol` | 1 | `4×002` |
| `pre, code, kbd, samp` | 1 | `4×001` |
| `pre code`; `a > code`; `kbd kbd` | 1 each | `1×002` each |
| `th` | 2 | `2×001` |
| `thead, tbody, tfoot, tr, td, th` | 7 | `12×001` |
| `button:focus:not(:focus-visible)` | 1 | `1×021` |
| `input, button, select, optgroup, textarea` | 1 | `5×001` |
| `[role="button"]`; `[type="search"]` | 1 each | `1×010` each |
| `button, [type="button"], [type="reset"], [type="submit"]` | 1 | `1×001, 3×010` |
| `button:not(:disabled), [type="button"]:not(:disabled), [type="reset"]:not(:disabled), [type="submit"]:not(:disabled)` | 1 | `1×011, 3×020` |
| `legend` | 2 | `2×001` |
| `::-webkit-datetime-edit-fields-wrapper, ::-webkit-datetime-edit-text, ::-webkit-datetime-edit-minute, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-year-field` | 1 | `7×001` |

Both controls reject the planted defect:

| Control | Measured failure |
|---|---|
| `.table tr { border-color: inherit }` in `bootstrap` | `(0,1,1)` differs from original `tr` at `(0,0,1)` |
| Appended `:where(.table) tr` copy | Position `2503` fails the requirement to precede `165` |

Ancillary choice: the component boundary is the first component rule **after the reboot region**, `.lead`. Reboot heading classes and classes inside copied restrictions do not establish that boundary.

Exact selectors, contexts, positions, specificity tuples, and witness arrays are retained in [measurements.json](/home/user/veneer/tmp/units/flip-sheet-2/measurements.json).

5. Border widths under Bootstrap alone and the compiled recipe are identical.

| Witness | Bootstrap alone: top, right, bottom, left | Compiled recipe |
|---|---|---|
| `a.card-link` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |
| `svg.bi` inside `.btn` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |
| `input.btn-check[type=checkbox]` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |
| `input.form-range[type=range]` | `0px, 0px, 0px, 0px` | `0px, 0px, 0px, 0px` |

6. SHA-256 measurements follow.

| Artifact | Digest |
|---|---|
| Rebuilt default Bootstrap | `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f` |
| `$layered: false`, saved before artifact | `214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7` |
| `$layered: false`, saved after artifact | `214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7` |
| `$layered: false`, fresh formatted-source compile | `214ee52257fcfdaf61a52a73da9cbdd388deeff0ee94ecdffe8d4bb8888118f7` |
| Rebuilt Tailwind sheet | `22f33114084c835a177ed2d8cf971670b75eabbd309d96915e62108b3146cf43` |
| Fixture recipe, writer run 1 | `a8ec0debf2ed4d3a44dd6953ff36987b8e998f439a4c3076be570d1ba336f045` |
| Fixture recipe, writer run 2 | `a8ec0debf2ed4d3a44dd6953ff36987b8e998f439a4c3076be570d1ba336f045` |
| App recipe, writer run 1 | `d28b2580bb0542e89dffc8736e00b8127901bc8b107ca57dca98f19485358799` |
| App recipe, writer run 2 | `d28b2580bb0542e89dffc8736e00b8127901bc8b107ca57dca98f19485358799` |

Both records’ `sheet` fields equal the rebuilt Tailwind digest. Git status is identical after both writer runs.

7. Observations follow.

- `test:integration` was not run after the conformance stop. No result is claimed for `preflight reset drift`, `compiled Tailwind compatibility recipe`, or `computed Tailwind class relationships`.
- Grid-track and `position-area` departures remain geometry exclusions.
- The `a.nav-link` color channels require the scrollspy state snapshot.
- `-webkit-text-fill-color` is not invisible by definition.
- Launch HEAD was `1b15a22`, carrying U4’s commit, on `ccr-d15a48b1-yyyll6`. The inherited modifications matched the authorized launch state.
- No agent was spawned, no unowned tracked file was edited, and nothing was committed.

8. The edited-file inventory and final `git status --porcelain` are:

```text
 M app/browser/recipe.json
 M guides/veneer.md
 M src/bootstrap/_mixins.scss
 M src/bootstrap/_reset.scss
 M src/bootstrap/_tokens.scss
 M src/tailwindcss/_tokens.scss
 M tests/fixtures/tailwindcss/recipe.json
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/tailwindcss/index.test.ts
?? tests/types.ts
```

The guide changes are confined to table rows. Both recipe files changed through U3’s writers only. The continuation adds the native specificity reader, its proof, the precedence case, and the associated types, and formats the inherited changes.

Every entry under `tmp/probes/flip4/**` belongs to `flip-probe-3`, is **not mine**, and remains unchanged. The complete entry list is in [probe-files-not-mine.txt](/home/user/veneer/tmp/units/flip-sheet-2/probe-files-not-mine.txt).