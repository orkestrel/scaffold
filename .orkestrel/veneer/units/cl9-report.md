<!-- sol on gpt-6-astra, exit 0, retained 2026-09-22. Codex exec thread
01a0c694-3190-7db1-a5f3-55c40183d636, launched by units/cl9.sh, journalled at tmp/codex/cl9.jsonl
and swept at acceptance; the thread id is the durable handle. First production consumer of the
downward breakpoint mixin, and the unit that taught the emitted-vocabulary comparison the downward
equivalence. -->

CL9 shipped the table key. HEAD remains `8c70787`; nothing was committed or pushed. The terrain record and tree agreed on the assignment. All required gates passed on the final source, including the requested Edge projects.

**Shipped and accounted.** The new components-layer partial ships all 29 recorded selector entries: the base table and cell/section rules; compact `.table-sm`; bordered and borderless rules; striped rows and columns; active and hover states; the eight contextual roles; the group divider; `.caption-top`; and unconditional plus sm/md/lg/xl/xxl responsive wrappers. Contextual variants loop over the role list, and responsive variants loop over the shared breakpoint ramp using the unchanged downward mixin. The styles barrel loads the partial once.

The guide has selector rows for every family and shipped rows for all 14 recorded custom properties. `table` joins both sorted conformance enumerations and the emitted-vocabulary comparison. There are no deferred, excluded, or unaccounted table selectors. The registered TableSection supplies semantic table/caption/header specimens for every variant family, with section, registration, and barrel proofs.

Recorded adaptations and departures are explicit in the guide: physical properties become logical properties; contextual colors derive from Veneer's canonical role tokens instead of fixed Bootstrap hex colors; runtime color mixing can retain fractional channels instead of rounding to bytes. Browser controls restore the inventory's role RGB inputs and compare the resulting colors within one channel. Separate cases verify the shipped canonical colors and their text contrast in both themes. Cell `border-color: inherit` and `vertical-align: inherit` are necessary class-level repairs over Veneer's existing element rules; the browser proves contextual borders, bottom-aligned header cells, and top-aligned body cells. No other partial was edited.

**Unknowns resolved.** The existing `--vn-state-stripe` token already carries the recorded 5% stripe factor, so no token or registry edit was needed. The base striped-background alias reads this token. Active and hover retain their recorded 10% and 7.5% factors; they do not borrow unrelated button state factors. Contextual variants retain their own recorded accent aliases.

The custom-property layers are independent: text resolves state over type over base color; the inset shadow resolves state over type over accent background; the base background remains a separate paint layer. Browser cases read actual stripe, active, and hover paints, including hover activation and state precedence. Sentinel alias values distinguish the fallbacks. The stripe-token mutation is made on the table where its alias resolves, then restored; active and hover stay independent.

Responsive overflow is directly falsifiable. Real viewport visits below, at, and above each breakpoint read computed overflow and attempt horizontal scrolling. The breakpoint wrappers scroll only below their boundaries; unconditional `.table-responsive` scrolls at every tested width. The browser suite also checks logical properties through physical geometry in RTL and vertical writing modes. All 40 table browser cases pass.

The shared-block sweep returns no shared written declaration blocks. Its focused command was `npm.cmd run test:setup -- "--testNamePattern=carries no shared written declaration block"`; output was `Tests 1 passed | 149 skipped (150)`, exit 0. No cross-partial extraction was needed. These skips are the result of the explicit test-name filter.

**Comparison changes.** I found the key tuple in `tests/setupStyles.test.ts`, inside `binds the built grid selector and media-condition multiset to the inventory minus deferrals`, and added `table`. I found the media normalizer inside `collectGridVocabulary` in `tests/setupStyles.ts` and extended it beside the existing upward normalization. The collector also admits table-prefixed selectors and the exact caption selector, so an unknown table-prefixed emission cannot escape the comparison.

The new equivalence is: **“`(max-width: Bpx)` normalizes to `(width < (B + 0.02)px)` for the recorded legacy breakpoint convention; upward conditions remain upward.”** Thus the recorded 575.98, 767.98, 991.98, 1199.98, and 1399.98 boundaries compare with exclusive 576, 768, 992, 1200, and 1400 boundaries. The arithmetic is `(Number(width) * 100 + 2) / 100`, not a spelling-only substitution. The downward mixin and its emitted conditions are unchanged.

I read `parseMediaWidth` and left it unchanged: it recognizes both spellings but returns only the number, losing the direction needed here. Focused tests reject a changed boundary and an opposite direction. Production optimization also spells `:nth-child(even)` as `:nth-child(2n)`; selector normalization now recognizes that equivalence while preserving quoted and escaped text and keeping odd expressions distinct.

**Vocabulary controls and restoration.** Each command below was executed in order. The control helper saves the original bytes before planting and compares SHA-256 after restoring. Full outputs are retained in `tmp/units/cl9-final-{missing,extra,boundary}-{plant,red,restore,green}.log`.

Missing recorded selector:

```text
node tmp/units/cl9-control.mjs plant missing -final
npm.cmd run test:setup -- "--testNamePattern=binds the built grid selector"
node tmp/units/cl9-control.mjs restore missing -final
npm.cmd run test:setup -- "--testNamePattern=binds the built grid selector"
```

The planted change removes `.table-responsive-sm` from built CSS. The failing output includes:

```text
-   "[\".table-responsive-sm\",[\"(width<576px)\"]]",
Tests  1 failed | 149 skipped (150)
EXIT: 1
```

Unrecorded selector:

```text
node tmp/units/cl9-control.mjs plant extra -final
npm.cmd run test:setup -- "--testNamePattern=binds the built grid selector"
node tmp/units/cl9-control.mjs restore extra -final
npm.cmd run test:setup -- "--testNamePattern=binds the built grid selector"
```

The planted change adds `.table-unrecorded` under `(width < 576px)`. The failing output includes:

```text
+   "[\".table-unrecorded\",[\"(width<576px)\"]]",
Tests  1 failed | 149 skipped (150)
EXIT: 1
```

Boundary shifted outside the equivalence:

```text
node tmp/units/cl9-control.mjs plant boundary -final
npm.cmd run test:setup -- "--testNamePattern=binds the built grid selector"
node tmp/units/cl9-control.mjs restore boundary -final
npm.cmd run test:setup -- "--testNamePattern=binds the built grid selector"
```

The planted change moves the small wrapper to `(width < 577px)`. The failing output includes:

```text
-   "[\".table-responsive-sm\",[\"(width<576px)\"]]",
+   "[\".table-responsive-sm\",[\"(width<577px)\"]]",
Tests  1 failed | 149 skipped (150)
EXIT: 1
```

After each of these three restorations, the same comparison command reports:

```text
Test Files  1 passed | 2 skipped (3)
     Tests  1 passed | 149 skipped (150)
EXIT: 0
```

Each restoration reports the same original built-CSS digest:

```text
RESTORED dist/src/styles/index.css
SHA256 787bdd8c0571639e85461b239780e6c2f4fd2d8ed3465ce930013ca4e53c6c90
MATCH true
EXIT: 0
```

An additional normalizer regression control removes the fractional correction itself:

```text
node tmp/units/cl9-control.mjs plant normalizer
npm.cmd run test:setup -- "--testNamePattern=equates fractional maximum"
node tmp/units/cl9-control.mjs restore normalizer
npm.cmd run test:setup -- "--testNamePattern=equates fractional maximum"
```

The red output distinguishes `(width<575.98px)` from `(width<576px)` and reports `Tests 1 failed | 149 skipped (150)`, exit 1. Restoring reports `Tests 1 passed | 149 skipped (150)`, exit 0, with:

```text
RESTORED tests/setupStyles.ts
SHA256 20cb243d2c35fab0575fe2e56871059952165eec206b2639bd1032b61b58869f
MATCH true
```

**Emitted-value control.** The source mutation changes base cell block padding from `0.5rem` to `0.75rem`. The styles command builds the cascade before browser readings:

```text
node tmp/units/cl9-control.mjs plant value -final
npm.cmd run test:src:styles -- tests/src/styles/components/table.test.ts
node tmp/units/cl9-control.mjs restore value -final
npm.cmd run test:src:styles -- tests/src/styles/components/table.test.ts
```

Red output:

```text
AssertionError: expected 12 to be 8 // Object.is equality
Test Files  1 failed (1)
     Tests  3 failed | 37 passed (40)
EXIT: 1
```

Green output after restoration:

```text
Test Files  1 passed (1)
     Tests  40 passed (40)
EXIT: 0
```

Restoration evidence:

```text
RESTORED src/styles/components/_table.scss
SHA256 d617669b789e4dbf5dfec5147890aed31aa6dc3260a64f27632fc58cb52d296e
MATCH true
EXIT: 0
```

Full evidence is in `tmp/units/cl9-final-value-{plant,red,restore,green}.log`. The unmutated geometry proof also initially exposed inherited alignment and border-color failures; both were repaired within the owned partial and are covered by the final passing cases.

**Required gate chain.** The final chain ran in the required order using Windows' runnable `npm.cmd` entry. Logs are `tmp/units/cl9-final-{format-check,lint-check,check,build,test}.log`.

| Command | Exit | Final result |
| --- | --- | --- |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.` / `Finished in 786ms on 202 files using 16 threads.` |
| `npm.cmd run lint:check` | 0 | No diagnostics; `EXIT: 0` |
| `npm.cmd run check` | 0 | Final `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` completed; `EXIT: 0` |
| `npm.cmd run build` | 0 | Final app build: `✓ built in 593ms`; `EXIT: 0` |
| `npm.cmd test` | 0 | Every project below passed; `EXIT: 0` |

Final result lines from the whole test chain, with managed Chromium for browser projects:

| Project | Test Files | Tests |
| --- | --- | --- |
| src:core and src:browser | `8 passed (8)` | `51 passed (51)` |
| src:styles | `55 passed (55)` | `397 passed (397)` |
| app:browser | `10 passed (10)` | `26 passed (26)` |
| journey | `4 passed (4)` | `84 passed \| 4 skipped (88)` |
| policy | `1 passed (1)` | `109 passed \| 1 skipped (110)` |
| config | `1 passed (1)` | `173 passed \| 1 skipped (174)` |
| setup | `3 passed (3)` | `150 passed (150)` |
| setup:browser | `1 passed (1)` | `33 passed (33)` |
| conformance | `1 passed (1)` | `10 passed (10)` |
| guides | `1 passed (1)` | `18 passed (18)` |

The requested second-engine commands also passed:

| Command | Exit | Final result lines |
| --- | --- | --- |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | 0 | `Test Files 55 passed (55)`; `Tests 397 passed (397)` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser` | 0 | `Test Files 1 passed (1)`; `Tests 33 passed (33)` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | 0 | `Test Files 10 passed (10)`; `Tests 26 passed (26)` |

Edge logs are `tmp/units/cl9-edge-test-{src-styles,setup-browser,app-browser}.log`. Host-only formatting, lint, type, and build gates do not select a browser engine. Existing conditional skips concern capture-only journey cases, the unavailable policy canon term file, and the alternate extractor branch; this unit adds no skips.

Showcase captures at 390px/light and 1024px/dark were generated with `node --experimental-strip-types tmp/units/cl9-capture.mjs`, exit 0. I inspected the responsive and contextual specimens. The narrow responsive wrapper measured 390px with 569px content and `overflow: auto`; at desktop the small wrapper read `overflow: visible`. The changed-source text-integrity sweep reported `TEXT INTEGRITY []`. `git diff --check` exited 0.

**Actual diff and status.** `git diff --stat` output follows; Git does not include the four untracked new source/proof files in this stat.

```text
 app/browser/Showcase.ts            |   2 +
 app/browser/constants.ts           |  42 ++++++++
 app/browser/index.ts               |   1 +
 guides/veneer.md                   | 172 +++++++++++++++++++++-----------
 src/styles/index.scss              |   1 +
 tests/app/browser/Showcase.test.ts |   3 +
 tests/app/browser/index.test.ts    |   3 +
 tests/conformance.test.ts          |   1 +
 tests/setupConformance.test.ts     |   1 +
 tests/setupStyles.test.ts          | 123 ++++++++++++++++++++++-
 tests/setupStyles.ts               | 197 +++++++++++++++++++++++++++++++++++--
 11 files changed, 482 insertions(+), 64 deletions(-)
```

`git status --porcelain --untracked-files=all` output:

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/conformance.test.ts
 M tests/setupConformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/TableSection.ts
?? src/styles/components/_table.scss
?? tests/app/browser/sections/TableSection.test.ts
?? tests/src/styles/components/table.test.ts
```

All listed source and proof paths are owned by this brief. Evidence and this report remain under ignored `tmp/units/`.

**Limits and remaining work.** No required product change or gate remains open. The supplemental frontend audit returned a false positive at unchanged `src/browser/Delegate.ts:25`, interpreting `new Set<Button>()` as an actionless HTML button; its output is retained in `tmp/units/cl9-premium-audit.json`. The build reports API Extractor's bundled TypeScript 5.9.3 versus project TypeScript 6.0.3 warning but exits successfully. Neither observation required an out-of-scope change.

The available probe invocation was rejected with `MCP tool call requires approval, but approval policy is never`. No probe receipt was issued. The executed Vitest red/green controls and restoration digests above are the available falsification evidence; no receipt is claimed.
