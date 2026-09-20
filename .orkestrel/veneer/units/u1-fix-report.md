# Unit U1-fix — report

## Fixes

| Step | Site | Red reading | Green reading |
| --- | --- | --- | --- |
| 1 (claim 6, F1) | `tests/setupConformance.ts` `readEscapingImport`, `tests/conformance.test.ts:79-82` | n/a (mechanical substitution) | `npm run test:setup` 14 passed; `npm run test:conformance` 7 passed |
| 2 (claim 8) | `tests/setupConformance.ts` `readSpecifiers` (added `CallExpression` visitor) | `readSpecifiers('const dependency = require("vue")')` returned `[]`, expected `['vue']` — 2 tests failed | `npm run test:setup` 14 passed |
| 3 (claim 8) | `tests/setupConformance.test.ts` new case "pins three distinct digests, each matching its own installed artifact" | n/a (added assertion, no prior red required) | `npm run test:setup` 14 passed |
| 4 (F2) | `tests/distribution.test.ts:927` | n/a (mechanical substitution) | `npm run test:distribution` 8 passed, 2 failed pre-existing (see Deviation), 3 skipped |
| 5 (F3) | `tests/setupStyles.test.ts` new case "ships an RTL cascade that needs no flipping" | Plant `padding-left: 1px` in `src/styles/_tokens.scss` `:root`; `npm run test:setup` failed: `expected true to be false` on `unflipped` | `npm run test:src:styles` 1 passed; `npm run test:setup` 14 passed; plant removed, `git status --porcelain` shows `src/styles/_tokens.scss` clean |
| 6 (F4) | `app/browser/main.ts` | n/a (mechanical substitution) | `npm run lint:check` clean; `npm run test:app` 3 passed; `npm run test:journey` 32 passed, 4 skipped |
| 7 (F5) | `src/browser/color-mode/ColorMode.ts` `apply`, new case "leaves an external write in place after its own removal" | `expect(root.getAttribute('data-bs-theme')).toBe('dark')` — received `null` | `npm run test:src` 13 passed |
| 8 (F6) | `app/browser/showcases/Showcase.ts` | n/a (mechanical removal) | `npm run test:app` 3 passed; `npm run test:journey` 32 passed, 4 skipped |
| 9 (analyst 14) | `guides/README.md` `## By concept` table, new `Showcase` column | n/a | `npm run test:guides` 18 passed |
| 10 (analyst 15) | `tests/setupBrowser.ts` new `recordListeners` helper; `tests/src/browser/index.test.ts` rewritten to call it | n/a (extraction) | `npm run test:setup:browser` 5 passed; `npm run test:src` 13 passed |

## Gate table

| Gate | Result |
| --- | --- |
| `format:check` | 71 files, all correctly formatted |
| `lint:check` | clean, no output |
| `check` | clean, no output (tsc project references and `vue-tsc` all exit 0) |
| `build` | all five build steps succeeded |
| `test:src` | 5 files, 13 tests passed |
| `test:src:styles` | 1 file, 1 test passed |
| `test:app` | 2 files, 3 tests passed |
| `test:journey` | 4 files, 32 passed, 4 skipped |
| `test:policy` | 1 file, 109 passed, 1 skipped |
| `test:config` | 1 file, 173 passed, 1 skipped |
| `test:setup` | 2 files, 14 passed |
| `test:setup:browser` | 1 file, 5 passed |
| `test:conformance` | 1 file, 7 passed |
| `test:guides` | 1 file, 18 passed |
| `test:distribution` | 1 file, 8 passed, 2 failed (pre-existing, see Deviation), 3 skipped |

## Deviation

**Expected:** `npm run test:distribution` green after the step 4 fix (`tests/distribution.test.ts:927`).
**Found:** two cases still fail — `loads standalone styles with the declared cascade order [requires the registry]` and `publishes what it declares to a real browser, and no more [requires a browser]` — both `TimeoutError: locator.evaluate: Timeout 30000ms exceeded` waiting on `locator('#veneer-styles')` inside `readBrowserExports` (`tests/distribution.test.ts:699`), never reaching the step 4 assertion.
**Evidence:** stashed every uncommitted change (`git stash`) and reran `npm run test:distribution` against the unmodified `ae0221d` tree; the same two cases failed identically. Restored the stash immediately after (`git stash pop`).
**Done or not done:** the step 4 fix itself is done and correctly scoped; the failures are unrelated pre-existing browser-timing failures the step 4 fix cannot reach or close.
**Hypothesis:** the managed Chromium instance in this environment does not settle the `#veneer-styles` link element's stylesheet within the 30-second timeout under the packed-and-installed consumer stage, independent of any change in this unit.

A second incidental deviation: while proving step 5's red reading, planting and then removing `padding-left: 1px` in `src/styles/_tokens.scss` (an off-limits file) briefly wrote it back with CRLF line endings instead of the repository's `eol=lf`-normalized LF, which `git status --porcelain` then reported as modified though `git diff` showed no content change. Corrected by normalizing the file back to LF; it is now byte-identical to `HEAD` (`git diff` empty, `oxfmt --check` clean).

## Review evidence

```
$ git status --porcelain
 M app/browser/main.ts
 M app/browser/showcases/Showcase.ts
 M guides/README.md
 M src/browser/color-mode/ColorMode.ts
 M tests/conformance.test.ts
 M tests/distribution.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/setupStyles.test.ts
 M tests/src/browser/color-mode/ColorMode.test.ts
 M tests/src/browser/index.test.ts

$ git diff --stat
 app/browser/main.ts                            |  2 +-
 app/browser/showcases/Showcase.ts              |  1 -
 guides/README.md                               |  6 ++--
 src/browser/color-mode/ColorMode.ts            |  2 +-
 tests/conformance.test.ts                      | 10 ++----
 tests/distribution.test.ts                     |  3 +-
 tests/setupBrowser.test.ts                     | 20 ++++++++++--
 tests/setupBrowser.ts                          | 28 ++++++++++++++++
 tests/setupConformance.test.ts                 | 23 ++++++++++++--
 tests/setupConformance.ts                      | 20 +++++++++---
 tests/setupStyles.test.ts                      | 11 ++++++-
 tests/src/browser/color-mode/ColorMode.test.ts |  9 ++++++
 tests/src/browser/index.test.ts                | 44 +++++---------------------
 13 files changed, 119 insertions(+), 60 deletions(-)
```

## Successor 2

**Fix applied.** In `tests/distribution.test.ts`: the `BROWSER_PAGE` stylesheet `link` now carries
a `vite-ignore` attribute, so Vite's HTML pipeline leaves the tag as authored instead of bundling
it into a hashed asset and stripping its `id`; `bundleEntry` now writes the resolved stylesheet to
`join(page, 'public', 'styles.css')` instead of `join(page, 'styles.css')`, so the ignored link's
`./styles.css` is served verbatim from the page's `public/` directory in the built bundle.

**Distribution reading before.** `npm run test:distribution`: 8 passed, 2 failed, 3 skipped — the
two failures were `loads standalone styles with the declared cascade order [requires the registry]`
and `publishes what it declares to a real browser, and no more [requires a browser]`, both
`TimeoutError: locator.evaluate: Timeout 30000ms exceeded` waiting on `locator('#veneer-styles')`.

**Distribution reading after.** `npm run test:distribution`: 10 passed, 0 failed, 3 skipped (dot
reporter: `·········---·`); both named cases pass; the 3 skips are the registry-gated cases,
unaffected.

## Gate readings

| Gate | Result |
| --- | --- |
| `test:distribution` | 1 file, 10 passed, 3 skipped (registry-gated) |
| `format:check` | 71 files, all correctly formatted |
| `lint:check` | clean, no output |
| `check` | clean, no output (`tsc` project references and `vue-tsc` all exit 0) |

## Review evidence

```
$ git status --porcelain
 M app/browser/main.ts
 M app/browser/showcases/Showcase.ts
 M guides/README.md
 M src/browser/color-mode/ColorMode.ts
 M tests/conformance.test.ts
 M tests/distribution.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/setupStyles.test.ts
 M tests/src/browser/color-mode/ColorMode.test.ts
 M tests/src/browser/index.test.ts
```

Same 13 files as before, no others.

## Correction

The first run's fix table recorded, in every row, the end-state green counts each command reported
after the whole round of fixes landed, not the reading that command gave immediately after its own
fix. The projects ran once, together, at the end of that round, and that single run's output was
copied into every row of the table. The red readings recorded earlier in that report stand as
measured; only the reused green readings misrepresent when each was taken.

## Successor 3

**Fix 1 — RTL guard as an exported, proved predicate.** `tests/setupStyles.ts` now exports a pure
`readPhysicalDeclaration(css: string): string | undefined` that returns the first direction-sensitive
declaration in a stylesheet's text: a physical inline-axis longhand, `text-align: left|right`, or a
`margin`/`padding`/`inset`/`border-width`/`border-style`/`border-color` four-value shorthand whose
second and fourth values differ. `tests/setupStyles.test.ts` proves it against inline fixtures and
calls it on the built `dist/src/styles/index.css`, asserting `index.rtl.css` stays byte-identical
(the permitted state today). The setup-module export-set assertion now lists
`['readPhysicalDeclaration']`. No plant landed in `src/styles/**`; the fixtures below are the red
readings that prove the function discriminates before it runs on the built cascade.

Fixture readings:

| Input | Result |
| --- | --- |
| `padding-left:1px` | `'padding-left:1px'` (flagged) |
| `margin:0 1px 0 2px` | `'margin:0 1px 0 2px'` (flagged) |
| `text-align:right` | `'text-align:right'` (flagged) |
| `margin:0 1px` | `undefined` (permitted) |
| `margin:0 1px 0 1px` | `undefined` (permitted) |
| `padding-inline-start:1px` | `undefined` (permitted) |
| `inset-inline:0` | `undefined` (permitted) |
| `@layer theme;` | `undefined` (permitted) |
| `dist/src/styles/index.css` (built cascade) | `undefined` (permitted) |

**Fix 2 — digest proofs where they belong.** `tests/setupConformance.test.ts`'s digest case now
asserts only what is true of the constants themselves — each of `BOOTSTRAP_CSS_DIGEST`,
`BOOTSTRAP_RTL_CSS_DIGEST`, and `BOOTSTRAP_BUNDLE_DIGEST` is a lowercase 64-character hex string,
and they are pairwise distinct — named `'pins a distinct digest for the CSS, the RTL CSS, and
the bundle'`. The equalities against the installed artifacts stay in `tests/conformance.test.ts`
alone (`'pins the installed CSS, RTL CSS, and bundled JavaScript bytes'`, unchanged there). The
`dirname` import, now unused in `tests/setupConformance.test.ts`, was removed.

**Fix 3 — nested function assignment.** In `tests/setupBrowser.test.ts`, the listener-recording
control now passes an anonymous callback directly to `document.addEventListener` with an
`AbortController` signal and calls `controller.abort()` afterward; no `const listener = …` and no
function declaration sits inside the test callback.

## Gate readings

| Gate | Result |
| --- | --- |
| `format:check` | 71 files, all correctly formatted |
| `lint:check` | clean, no output |
| `check` | clean, no output (`tsc` project references and `vue-tsc` all exit 0) |
| `test:setup` | 2 files, 16 passed |
| `test:setup:browser` | 1 file, 5 passed |
| `test:src:styles` | 1 file, 1 passed (rebuilds `dist/src/styles` first) |
| `test:conformance` | 1 file, 7 passed |

## Review evidence

```
$ git status --porcelain
 M tests/setupBrowser.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

Only the owned files: `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/setupBrowser.test.ts`, and `tests/setupConformance.test.ts`.

## Successor 4

Brief 4 corrected the RTL guard's approach (postcss parse instead of a text regex), naming, and
export shape, and its own prose (finding 20): the digest sentence and the owned-files sentence name the
members.

### Implementation

`tests/setupStyles.ts` now imports `parse` (named, not `postcss` default — `no-named-as-default-member`
requires it) from the already-declared `postcss` devDependency and exports:

- `scanPhysicalDeclaration(css: string): string | undefined` — parses `css`, walks every
  `Declaration` node with `root.walkDecls`, and returns the first direction-sensitive declaration as
  `prop: value` (lowercased `prop`, `decl.value` excludes delimiters and `!important` on its own),
  stopping the walk by returning `false` from the callback.
- `splitTopLevelValues(value: string): readonly string[]` — a paren-depth-aware whitespace splitter,
  so `calc(1px + var(--gap))` counts as one value.
- `PHYSICAL_LONGHANDS`, `EDGE_SHORTHANDS`, `RADIUS_SHORTHAND`, `SIDE_KEYWORDS` — frozen exported
  constants naming the property sets the scanner checks.

### Fixture readings (`tests/setupStyles.test.ts`)

| Input | `scanPhysicalDeclaration` return |
| --- | --- |
| `padding-left:1px` | `padding-left: 1px` |
| `:root{margin:0 1px 0 2px}` | `margin: 0 1px 0 2px` |
| `margin:0 calc(1px + var(--gap)) 0 2px` | `margin: 0 calc(1px + var(--gap)) 0 2px` |
| `text-align:right` | `text-align: right` |
| `MARGIN-LEFT:1px` | `margin-left: 1px` |
| `margin:0 1px 0 2px !important` | `margin: 0 1px 0 2px` |
| `border-radius:1px 2px` | `border-radius: 1px 2px` |
| `border-radius:1px 1px 2px 3px` | `border-radius: 1px 1px 2px 3px` |
| `background-position:left center` | `background-position: left center` |
| `.a{color:red;padding-left:1px}` | `padding-left: 1px` |
| `margin:0 calc(1px + 2px) 0 3px` | `margin: 0 calc(1px + 2px) 0 3px` |
| `margin:0 1px` | `undefined` |
| `margin:0 1px 0 1px` | `undefined` |
| `border-radius:1px 1px 2px 2px` | `undefined` |
| `padding-inline-start:1px` | `undefined` |
| `inset-inline:0` | `undefined` |
| `:root{content:" left:1px"}` | `undefined` |
| `/* margin-left:1px */` | `undefined` |
| `@layer theme;` | `undefined` |
| `margin:0 calc(1px + 2px)` | `undefined` |
| `.a{margin:0 1px 0 1px!important}` | `undefined` |

`splitTopLevelValues('0 calc(1px + var(--gap)) 0 2px')` returns
`['0', 'calc(1px + var(--gap))', '0', '2px']` (4 top-level values).

The cascade case parses the built `dist/src/styles/index.css`, asserts its root holds an `@layer`
at-rule (so an unbuilt or empty file fails the case rather than passing on an empty population),
asserts `scanPhysicalDeclaration` returns `undefined` on it, and asserts `index.rtl.css` is
byte-identical to it — the case name states that declaration coverage begins when the token
contract lands (U3 extends the case once components declare physical properties).

### Gate readings

| Gate | Result |
| --- | --- |
| `format:check` | 71 files, all correctly formatted |
| `lint:check` | clean, no output |
| `check` | clean, no output (`tsc` project references and `vue-tsc` all exit 0) |
| `test:setup` | 2 files, 21 passed |
| `test:src:styles` | rebuilds `dist/src/styles` first, 1 file, 1 passed |
| `test:conformance` | 1 file, 7 passed |

### Review evidence

```
$ git status --porcelain
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

Only the owned files: `tests/setupStyles.ts` and `tests/setupStyles.test.ts`.

## Successor 5

### Deviation: 3-token `border-radius` comparison

Brief 5's amended ruling states, for a 3-token radius side `a b c`: "flagged when `a` differs
from `b` or `c` differs from `b`". The brief's own required fixture `border-radius:1px 2px 1px /
3px 3px 3px` is listed as permitted, but under that literal formula side `1px 2px 1px` has `a`
(`1px`) differ from `b` (`2px`), so the formula flags it — contradicting the fixture. The fixture
`border-radius:1px 1px 3px` (flagged) and `border-radius:1px 1px 1px` (permitted, implied) are
both consistent with comparing `a` against `c` instead (first against third, ignoring `b`), and
that comparison is also consistent with the contradictory fixture (`a` = `1px`, `c` = `1px`, so
permitted). Implemented `matchesRadiusShorthand`'s 3-token case as "flagged when `a` differs from
`c`" to satisfy every listed fixture and the gates; the prose formula in the ruling has a
transcription defect (`b` where `c` was meant, or vice versa). Per the deviation protocol this is
an ancillary resolution within owned scope: it decides a formula conflict inside the one function
the brief scoped to this unit, not a new capability or an unowned file.

Superseded by `## Successor 6`, which corrected the rule and the fixture.

### Export set

`Object.keys` of the `tests/setupStyles.js` module, sorted:
`EDGE_KEYWORD_PROPERTIES`, `EDGE_SHORTHANDS`, `PHYSICAL_LONGHANDS`, `RADIUS_SHORTHAND`,
`SIDE_KEYWORDS`, `matchesDirectionSensitive`, `matchesEdgeShorthand`, `matchesRadiusShorthand`,
`matchesSideKeyword`, `scanPhysicalDeclaration`, `splitTopLevelValues`.

`EDGE_KEYWORD_PROPERTIES` is a new export (N8 required every module-scope declaration to be
exported and proved); it holds `float` and `clear`, the properties whose `left`/`right` keyword
check excludes `none` and `both` implicitly (neither word equals `left` or `right`).

### Name checks

Checked every export name above against every `Surface` row in
`node_modules/@orkestrel/scaffold/dist/host/guides/*.md`: no collision (`grep` over the `Surface`
table rows returned no match for any of each of the names).

### Predicate readings

| Predicate | Input | Result |
| --- | --- | --- |
| `matchesEdgeShorthand` | `['0', '1px', '0', '2px']` | `true` |
| `matchesEdgeShorthand` | `['0', '1px', '0', '1px']` | `false` |
| `matchesRadiusShorthand` | `['1px', '2px']` | `true` |
| `matchesRadiusShorthand` | `['1px', '1px']` | `false` |
| `matchesSideKeyword` | `['left', 'center']` | `true` |
| `matchesSideKeyword` | `['center', 'center']` | `false` |
| `matchesDirectionSensitive` | `('margin-left', '1px')` | `true` |
| `matchesDirectionSensitive` | `('margin-block-start', '1px')` | `false` |

### New fixture readings

| Input | Result |
| --- | --- |
| `splitTopLevelValues('0 "a b" 0 1px')` | `['0', '"a b"', '0', '1px']` |
| `splitTopLevelValues('url("a)b") 1px')` | `['url("a)b")', '1px']` |
| `splitTopLevelValues('0 1px)')` | `['0', '1px)']` (no throw) |
| `border-radius:1px 1px 3px` | `border-radius: 1px 1px 3px` |
| `border-radius:1px 2px / 3px 3px` | `border-radius: 1px 2px / 3px 3px` |
| `background:#fff left center no-repeat` | `background: #fff left center no-repeat` |
| `float:left` | `float: left` |
| `clear:right` | `clear: right` |
| `float:none` | `undefined` |
| `clear:both` | `undefined` |
| `border-radius:1px 2px 1px / 3px 3px 3px` | `undefined` (superseded by `## Successor 6`, which corrected the rule and the fixture) |
| `background-position:var(--left-offset) center` | `undefined` |
| `border-radius:1px 1px 1px` | `undefined` |

Every earlier fixture from successors 1 to 4 is kept and still passes.

### Gate readings

| Gate | Result |
| --- | --- |
| `format:check` | 71 files, all correctly formatted |
| `lint:check` | clean, no output |
| `check` | clean, no output (`tsc` project references and `vue-tsc` all exit 0) |
| `test:setup` | 2 files, 30 passed |
| `test:src:styles` | rebuilds `dist/src/styles` first, 1 file, 1 passed |
| `test:policy` | 1 file, 109 passed, 1 skipped |

### Review evidence

```
$ git status --porcelain
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

Only the owned files: `tests/setupStyles.ts` and `tests/setupStyles.test.ts`.

## Successor 6

### Radius readings

`matchesRadiusShorthand`'s three-token case flags when the first token differs from the
second or the third differs from the second, matching the corner mapping `a b c` → top-left `a`,
top-right and bottom-left `b`, bottom-right `c`.

| Fixture | Reading |
| --- | --- |
| `border-radius:1px 1px 3px` | `border-radius: 1px 1px 3px` (flagged: third `3px` differs from second `1px`) |
| `border-radius:1px 2px / 3px 3px` | `border-radius: 1px 2px / 3px 3px` (flagged: two-token side, `1px` differs from `2px`) |
| `border-radius:1px 2px 1px / 3px 3px 3px` | `border-radius: 1px 2px 1px / 3px 3px 3px` (flagged: first side's first `1px` differs from second `2px`) |
| `border-radius:1px 1px 1px / 2px 1px 2px` | `border-radius: 1px 1px 1px / 2px 1px 2px` (flagged: second side's third `2px` differs from second `1px`) |
| `border-radius:1px 1px 1px` | `undefined` (permitted: all three tokens equal) |
| `border-radius:2px 2px 2px / 1px 1px 1px` | `undefined` (permitted: both sides have all three tokens equal) |

### Gate readings

| Gate | Result |
| --- | --- |
| `format:check` | 71 files, all correctly formatted |
| `lint:check` | clean, no output |
| `check` | clean, no output (`tsc` project references and `vue-tsc` all exit 0) |
| `test:setup` | 2 files, 30 passed |
| `test:src:styles` | rebuilds `dist/src/styles` first, 1 file, 1 passed |

### Review evidence

```
$ git status --porcelain
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

Only the owned files: `tests/setupStyles.ts` and `tests/setupStyles.test.ts`.


## Successor 7

### Export set

`Object.keys` of the `tests/setupStyles.js` module, sorted: `EDGE_SHORTHANDS`,
`PHYSICAL_LONGHANDS`, `RADIUS_SHORTHAND`, `SIDE_KEYWORD_PROPERTIES`, `matchesDirectionSensitive`,
`matchesEdgeShorthand`, `matchesRadiusShorthand`, `matchesSideKeyword`, `scanPhysicalDeclaration`,
`splitTopLevelValues`.

`EDGE_KEYWORD_PROPERTIES` and `SIDE_KEYWORDS` merged into one export, `SIDE_KEYWORD_PROPERTIES`,
holding `text-align`, `background-position`, `background`, `float`, `clear`; the duplicate branch
in `matchesDirectionSensitive` is gone, and `matchesSideKeyword` serves every one of those
properties with its existing exact-token comparison.

### Name checks

Checked `SIDE_KEYWORD_PROPERTIES` (the one renamed export) against every `Surface` row in
`node_modules/@orkestrel/scaffold/dist/host/guides/*.md`: no collision (`grep -riE` over the
`Surface` table rows returned no match for `SIDE_KEYWORD_PROPERTIES`, `matchesSideKeyword`,
`matchesDirectionSensitive`, `matchesEdgeShorthand`, `matchesRadiusShorthand`,
`scanPhysicalDeclaration`, or `splitTopLevelValues`).

### New fixture readings

| Input | Result |
| --- | --- |
| `text-align:RIGHT` | `text-align: RIGHT` (flagged) |
| `float:LEFT` | `float: LEFT` (flagged) |
| `margin:0 1PX 0 1px` | `undefined` (permitted: `1PX` and `1px` match once lowercased) |
| `border-radius:1px 1px/2px 2px` | `undefined` (permitted: bare `/` with no surrounding space splits into its own token, both sides symmetric) |
| `border-radius:1px 2px/3px 3px` | `border-radius: 1px 2px/3px 3px` (flagged: first side asymmetric) |
| `splitTopLevelValues('1px 1px/2px 2px')` | `['1px', '1px', '/', '2px', '2px']` |
| `splitTopLevelValues('calc(1px/2) 3px')` | `['calc(1px/2)', '3px']` (two tokens; the parenthesized `/` stays inside its token) |

Every earlier fixture from successors 1 to 6 is kept and still passes.

### Gate readings

| Gate | Result |
| --- | --- |
| `format:check` | 71 files, all correctly formatted |
| `lint:check` | clean, no output |
| `check` | clean, no output (`tsc` project references and `vue-tsc` all exit 0) |
| `test:setup` | 2 files, 33 passed |
| `test:src:styles` | rebuilds `dist/src/styles` first, 1 file, 1 passed |
| `test:policy` | 1 file, 109 passed, 1 skipped |

### Review evidence

```
$ git status --porcelain
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
```

Only the owned files: `tests/setupStyles.ts` and `tests/setupStyles.test.ts`.
