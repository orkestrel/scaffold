<!-- CL3 round-3 fix (brief 5) report, sol on Astra (gpt-6-astra, workspace-write), journal tmp/codex/cl3-4.jsonl (swept at acceptance), thread 01a0c3d8-ba0e-7661-a6ad-7d51fcca2e0c, exit 0, retained 2026-09-21. -->

# CL3 fix report — brief 5

The findings and the duplicate-block sweep are closed. The required gates exit 0. Chromium and Edge resolve the captured styles identically before and after the changes. No proof or expectation changed.

This report implements `cl3-brief-5.md`, succeeding the brief-4 report at `cl3-report-3.md`. The assigned role is `sol` on Astra. Work ran directly on Windows without delegates, commits, pushes, or destructive Git commands. HEAD remains `9f5ffda`; the inherited CL3 changes remain in place.

## Changes and readings

Analyst 7 is closed by `script-text` at `src/styles/_mixins.scss:10`, beside `code-text`. The argument-free mixin emits `position: relative`, `font-size: 75%`, `line-height: 0`, and `vertical-align: baseline`. `_sub.scss:5` and `_sup.scss:5` include it. Their own offsets remain `inset-block-end: -0.25em` and `inset-block-start: -0.5em`, respectively.

The following readings are equal before extraction, after the script extraction, and after the sweep. Each row was captured in managed Chromium and Edge, in light and dark modes.

| Element | Property | Before | After |
| --- | --- | --- | --- |
| `sub`, `sup` | `position` | `relative` | `relative` |
| `sub`, `sup` | `font-size` | `10.5px` | `10.5px` |
| `sub`, `sup` | `line-height` | `0px` | `0px` |
| `sub`, `sup` | `vertical-align` | `baseline` | `baseline` |
| `sub` | `top` / `bottom` | `2.625px` / `-2.625px` | `2.625px` / `-2.625px` |
| `sup` | `top` / `bottom` | `-5.25px` / `5.25px` | `-5.25px` / `5.25px` |
| `sub`, `sup`, light | `color` | `oklch(0.208 0.042 265.755)` | `oklch(0.208 0.042 265.755)` |
| `sub`, `sup`, dark | `color` | `oklch(0.929 0.013 255.508)` | `oklch(0.929 0.013 255.508)` |

The unchanged command `npm.cmd run test:src:styles -- tests/src/styles/elements/sub.test.ts tests/src/styles/elements/sup.test.ts` exits 0 before and after extraction. Each run reports `Test Files 2 passed (2)` and `Tests 4 passed (4)`. The final Chromium and Edge styles gates also run these proofs.

Reviewer 7 is closed by removing `text-size-adjust: 100%` from `src/styles/elements/_body.scss`. The declaration remains at `src/styles/elements/_html.scss:7`. After rebuilding, `npm.cmd run test:src:styles -- tests/src/styles/elements/body.test.ts` exits 0; the before and after runs each report `Test Files 1 passed (1)` and `Tests 4 passed (4)`.

The body proofs retain their readings: size `14px`, line height `21px`, weight `400`, leading family `system-ui`, canvas `rgb(255, 255, 255)`, text `oklch(0.208 0.042 265.755)`, and transition duration `0s`. The compatibility island still reads family `monospace`, size `20px`, weight `600`, line height `40px`, text `rgb(20, 80, 140)`, alignment `end`, and canvas `rgb(240, 230, 220)`. The document body retains size `14px`, alignment `start`, and margin `0px`.

The requested `grep -c text-size-adjust dist/src/styles/index.css` exits 0 and prints `1` before and after removal. It counts matching lines, and the CSS is minified onto one line. The declaration-level reading supplies the distinction that this command cannot measure:

| Declaration | Before | After |
| --- | --- | --- |
| `text-size-adjust:100%` | 2 | 1 |
| `-webkit-text-size-adjust:100%` | 2 | 1 |
| `-moz-text-size-adjust:100%` | 2 | 1 |

The before reading comes from `rg -o '[a-z-]*text-size-adjust:[^;}]*' dist/src/styles/index.css`. The same command confirms the after reading. PostCSS additionally resolves every remaining declaration to the `html` selector; none remains under `body`.

## Sweep

The sweep compares every distinct unordered pair of partials in the following population under `src/styles/elements/`. Each path is paired with every path following it in this list, without omissions or self-pairs:

```text
_a.scss, _abbr.scss, _address.scss, _blockquote.scss, _body.scss,
_button.scss, _code.scss, _dl.scss, _heading.scss, _hr.scss, _html.scss,
_kbd.scss, _mark.scss, _ol.scss, _p.scss, _pre.scss, _samp.scss,
_small.scss, _strong.scss, _sub.scss, _sup.scss, _ul.scss, _var.scss
```

The instrument compiles each partial with Sass source maps and reads declaration blocks through PostCSS. It compares identical property/value/importance declarations within each selector block, including nonadjacent declarations. Source maps exclude declarations already supplied by `_mixins.scss`. The source review covers the same population. The explicit pair records and their results are in `cl3-r4-sweep-before.json` and `cl3-r4-sweep-after.json`; the instrument is `cl3-r4-sweep.mjs`.

The sweep found the following shared blocks after the named findings were fixed:

| Pair | Shared declarations | Extraction |
| --- | --- | --- |
| `_code.scss`, `_kbd.scss` | `background-color: var(--vn-surface-code)`; `border-radius: var(--vn-radius-small)` | Argument-free `code-surface`, `_mixins.scss:17`; includes at `_code.scss:6` and `_kbd.scss:6` |
| `_ol.scss`, `_ul.scss` | `margin: 0`; `padding-inline-start: calc(var(--vn-space-8) * 2)` | Argument-free `list-space`, `_mixins.scss:22`; includes at `_ol.scss:5` and `_ul.scss:5` |

Every other compared pair has no shared block meeting the brief's threshold. After extraction, the instrument returns `[]`: no compared pair retains such a block. The pre-extraction findings establish that the instrument detects the repeated blocks it then reports removed. The existing `code-text` mixin and every existing token remain unchanged.

The capture comparison checks every enumerated computed property of `sub`, `sup`, `code`, `kbd`, `ol`, and `ul` in each mode and browser. `node cl3-r4-compare.mjs` exits 0 for the script extraction and the final state. No extraction changes a captured resolved reading. The sweep's relevant readings are as follows:

| Members | Property | Before and after, Chromium and Edge |
| --- | --- | --- |
| `code`, `kbd`, light | Background | `oklab(0.208 -0.00310889 -0.0418848 / 0.12)` |
| `code`, `kbd`, dark | Background | `oklab(0.929 -0.00325318 -0.0125864 / 0.12)` |
| `code`, `kbd` | Corner radii | `4px` |
| `ol`, `ul` | Each margin side | `0px` |
| `ol`, `ul` | `padding-inline-start` | `32px` |
| `ol` | `list-style-type` | `decimal` |
| `ul` | `list-style-type` | `disc` |

The capture instrument is `cl3-r4-readings.mjs`; its records are `cl3-r4-before.json`, `cl3-r4-script-after.json`, and `cl3-r4-after.json` in the same directory. It loads the rebuilt shipped stylesheet into real Playwright browsers. The unchanged repository proofs separately exercise the test harness's complete cascade. No source or test plant was introduced.

## Gates

`cl3-r4-gates.cmd` runs the brief's exact gate order, ending with `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles`. The chain exits 0. `cl3-r4-edge.cmd` additionally runs conformance and the application browser proofs on Edge; it also exits 0. Browser-independent gates run once on this Windows host and apply to either browser selection.

The following table records each command's exit code and closing output. Commands use `npm.cmd run` followed by the script name shown.

| Script | Engine | Exit | Final output |
| --- | --- | --- | --- |
| `format:check` | Host | 0 | `All matched files use the correct format.`; `Finished in 794ms on 140 files using 16 threads.` |
| `lint:check` | Host | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics |
| `check` | Host | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; no diagnostics |
| `build` | Host | 0 | `dist/app/browser/assets/index-CZRfSuFO.js 11.18 kB │ gzip: 3.25 kB`; `✓ built in 431ms` |
| `test:src:styles` | Chromium | 0 | `Test Files 30 passed (30)`; `Tests 157 passed (157)`; `Duration 21.90s` |
| `test:conformance` | Chromium | 0 | `Test Files 1 passed (1)`; `Tests 8 passed (8)`; `Duration 3.97s` |
| `test:app:browser` | Chromium | 0 | `Test Files 4 passed (4)`; `Tests 13 passed (13)`; `Duration 2.19s` |
| `test:guides` | Host | 0 | `Test Files 1 passed (1)`; `Tests 18 passed (18)`; `Duration 578ms` |
| `test:policy` | Host | 0 | `Test Files 1 passed (1)`; `Tests 109 passed \| 1 skipped (110)`; `Duration 2.04s` |
| `test:setup` | Host | 0 | `Test Files 3 passed (3)`; `Tests 126 passed (126)`; `Duration 6.50s` |
| `test:src:styles` | Edge | 0 | `Test Files 30 passed (30)`; `Tests 157 passed (157)`; `Duration 29.77s` |
| `test:conformance` | Edge | 0 | `Test Files 1 passed (1)`; `Tests 8 passed (8)`; `Duration 4.48s` |
| `test:app:browser` | Edge | 0 | `Test Files 4 passed (4)`; `Tests 13 passed (13)`; `Duration 8.48s` |

The policy skip is the existing `it.skipIf(!isPolicyFile(process.cwd(), POLICY_TERM_FILE))` case at `tests/policy.test.ts:716`, which checks the substitution table only in its authoring workspace. No skip was added. Browser runs emit dependency externalization warnings; their closing results and process exits are green.

Full gate output lives in `cl3-r4-{format,lint,check,build,styles,conformance,app,guides,policy,setup,edge-styles,edge-conformance,edge-app}.log.txt`. `cl3-runs.txt` carries the `r4-*` command exit records. Each SCSS edit was followed by `npm.cmd run build:src:styles`, exit 0, before reading styles proofs.

An initial PowerShell script launcher was refused by the host execution policy before invoking npm. A subsequent PowerShell-redirected scoped run returned shell exit 1 despite reporting passing tests. The ordinary `.cmd` launcher then ran the exact scoped command and recorded npm exit 0. No execution-policy setting changed. The authoritative gate chain uses that `.cmd` launcher throughout.

## Scope evidence

The baseline hash comparison covers every path returned by `git ls-files --cached --others --exclude-standard` before editing. `node cl3-r4-snapshot.mjs after` reports only the following changed paths:

```text
src/styles/elements/_code.scss
src/styles/elements/_kbd.scss
src/styles/elements/_ol.scss
src/styles/elements/_sub.scss
src/styles/elements/_sup.scss
src/styles/elements/_ul.scss
src/styles/_mixins.scss
src/styles/elements/_body.scss
```

All are owned by brief 5. The report and run evidence are under ignored `tmp/`. Every inherited proof, token, core file, application file, guide, and vendored file is byte-identical to the starting tree. `git diff --check` exits 0. The actual diff is retained at `cl3-r4-return.diff`.

The following is the actual `git diff --stat` output against HEAD; it includes the inherited CL3 changes and omits untracked files by Git's normal behavior:

```text
 app/browser/Showcase.ts                  |   4 +-
 app/browser/constants.ts                 |  56 ++++-
 app/browser/index.ts                     |   1 +
 app/browser/types.ts                     |   8 +
 guides/veneer.md                         |  51 +++--
 src/core/constants.ts                    |   1 +
 src/styles/_mixins.scss                  |  25 +++
 src/styles/_tokens.scss                  |   4 +-
 src/styles/elements/_body.scss           |  15 +-
 src/styles/index.scss                    |  21 ++
 tests/app/browser/Showcase.test.ts       |  21 +-
 tests/app/browser/index.test.ts          |   3 +
 tests/setupStyles.test.ts                |  22 ++
 tests/setupStyles.ts                     | 339 +++++++++++++++++++++++++++++++
 tests/src/styles/elements/body.test.ts   |  26 +++
 tests/src/styles/elements/button.test.ts |  14 +-
 tests/src/styles/tokens.test.ts          |  29 +++
 17 files changed, 607 insertions(+), 33 deletions(-)
```

The following is the actual `git status --porcelain --untracked-files=all` output. Its path set matches the starting CL3 path set:

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M app/browser/types.ts
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_tokens.scss
 M src/styles/elements/_body.scss
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/elements/body.test.ts
 M tests/src/styles/elements/button.test.ts
 M tests/src/styles/tokens.test.ts
?? app/browser/sections/ContentSection.ts
?? src/styles/_reset.scss
?? src/styles/elements/_a.scss
?? src/styles/elements/_abbr.scss
?? src/styles/elements/_address.scss
?? src/styles/elements/_blockquote.scss
?? src/styles/elements/_code.scss
?? src/styles/elements/_dl.scss
?? src/styles/elements/_heading.scss
?? src/styles/elements/_hr.scss
?? src/styles/elements/_kbd.scss
?? src/styles/elements/_mark.scss
?? src/styles/elements/_ol.scss
?? src/styles/elements/_p.scss
?? src/styles/elements/_pre.scss
?? src/styles/elements/_samp.scss
?? src/styles/elements/_small.scss
?? src/styles/elements/_strong.scss
?? src/styles/elements/_sub.scss
?? src/styles/elements/_sup.scss
?? src/styles/elements/_ul.scss
?? src/styles/elements/_var.scss
?? tests/app/browser/sections/ContentSection.test.ts
?? tests/src/styles/elements/a.test.ts
?? tests/src/styles/elements/abbr.test.ts
?? tests/src/styles/elements/address.test.ts
?? tests/src/styles/elements/blockquote.test.ts
?? tests/src/styles/elements/code.test.ts
?? tests/src/styles/elements/dl.test.ts
?? tests/src/styles/elements/heading.test.ts
?? tests/src/styles/elements/hr.test.ts
?? tests/src/styles/elements/kbd.test.ts
?? tests/src/styles/elements/mark.test.ts
?? tests/src/styles/elements/ol.test.ts
?? tests/src/styles/elements/p.test.ts
?? tests/src/styles/elements/pre.test.ts
?? tests/src/styles/elements/samp.test.ts
?? tests/src/styles/elements/small.test.ts
?? tests/src/styles/elements/strong.test.ts
?? tests/src/styles/elements/sub.test.ts
?? tests/src/styles/elements/sup.test.ts
?? tests/src/styles/elements/ul.test.ts
?? tests/src/styles/elements/var.test.ts
?? tests/src/styles/reset.test.ts
```

Git also reports that it cannot access `C:\Users\mikes/.config/git/ignore`; the status command exits 0. No stop condition remains. Independent audit and acceptance remain with the Orchestrator.
