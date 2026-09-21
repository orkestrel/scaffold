<!-- CL3 fix round (brief 4) report, sol on Astra (gpt-6-astra, workspace-write), journal tmp/codex/cl3-3.jsonl (swept at acceptance), thread 01a0c3c0-f6f7-71b2-9490-78058c00893f, exit 0, retained 2026-09-21. -->

CL3 brief 4 is implemented in the uncommitted working tree at HEAD `9f5ffda`. The required gate chain exits 0, including the managed Chromium and Edge styles and application-browser runs. Briefs 2 and 3 remain intact. No agent was spawned, and nothing was reset, restored, committed, or pushed.

The findings are closed at these sites:

| Finding | Change |
| --- | --- |
| Analyst 10 | `app/browser/Showcase.ts:31` assigns `this.#main.id = 'main'` immediately after creation. `tests/app/browser/Showcase.test.ts:81` proves the fragment resolves to the shell's main region; line 101 proves it resolves to `null` after destruction. The specimen markup is unchanged. |
| Analyst 11 | `src/styles/_mixins.scss:3` defines `code-text($size: 90%, $padding: 0.125em 0.25em)`. `_code.scss` and `_samp.scss` include its defaults. `_kbd.scss` supplies its existing `87.5%` size and `0.0625em 0.375em` padding. `_pre.scss` supplies its existing `87.5%` size and space-token padding. Each retains its surface and distinct declarations. `_var.scss` remains unchanged because its font stack and inline-only padding differ. The mixin emits no top-level CSS. |
| Analyst 12 | `tests/setupStyles.ts` owns the frozen mode and expected-value tables. Element proofs import them and retain test registration. `tests/setupStyles.test.ts:63,80` lists the added exports in its inventory assertion. |
| Reviewer 10 | Removed the `CL3 code tokens` console call from `tests/src/styles/tokens.test.ts`; its value assertions remain. |
| Reviewer 13 | `tests/src/styles/reset.test.ts:20` includes an unlayered `display: inline-flex !important` competitor and proves the hidden and unhidden readings. |

The setup exports and their homes are:

| Export | Home |
| --- | --- |
| `TEXT_MODES` | `tests/setupStyles.ts:6` |
| `TEXT_A_CASES` | `tests/setupStyles.ts:9` |
| `TEXT_ABBR_CASES` | `tests/setupStyles.ts:20` |
| `TEXT_ADDRESS_CASES` | `tests/setupStyles.ts:36` |
| `TEXT_BLOCKQUOTE_CASES` | `tests/setupStyles.ts:51` |
| `TEXT_CODE_CASES` | `tests/setupStyles.ts:68` |
| `TEXT_DL_CASES` | `tests/setupStyles.ts:91` |
| `TEXT_HEADING_CASES` | `tests/setupStyles.ts:107` |
| `TEXT_HR_CASES` | `tests/setupStyles.ts:119` |
| `TEXT_KBD_CASES` | `tests/setupStyles.ts:135` |
| `TEXT_MARK_CASES` | `tests/setupStyles.ts:162` |
| `TEXT_OL_CASES` | `tests/setupStyles.ts:177` |
| `TEXT_P_CASES` | `tests/setupStyles.ts:192` |
| `TEXT_PRE_CASES` | `tests/setupStyles.ts:208` |
| `TEXT_SAMP_CASES` | `tests/setupStyles.ts:231` |
| `TEXT_SMALL_CASES` | `tests/setupStyles.ts:250` |
| `TEXT_STRONG_CASES` | `tests/setupStyles.ts:261` |
| `TEXT_SUB_CASES` | `tests/setupStyles.ts:272` |
| `TEXT_SUP_CASES` | `tests/setupStyles.ts:289` |
| `TEXT_UL_CASES` | `tests/setupStyles.ts:306` |
| `TEXT_VAR_CASES` | `tests/setupStyles.ts:321` |
| `BUTTON_BARE_VALUES` | `tests/setupStyles.ts:349` |

The tables, rows, nested value objects, and nested arrays are frozen. The added setup declarations contain no DOM or window access. `BUTTON_BARE_VALUES` carries the existing duration and focus-ring arrays from the bare-button proof. Expected values were moved without changing them.

The required red/green pairs ran against real implementations:

| Command | Red | Green |
| --- | --- | --- |
| `npm.cmd run test:app:browser -- tests/app/browser/Showcase.test.ts` | Exit 1; 1 failed, 3 passed. The fragment assertion received `null` from the id-less shell. | Exit 0; 4 passed after assigning the id. |
| `npm.cmd run test:setup` | Exit 1; 1 failed, 125 passed. Only the setup export inventory failed on the missing `TEXT_*` entries. | Exit 0; 126 passed after listing the exports. |
| `npm.cmd run test:setup` | Exit 1; 1 failed, 125 passed. Only the inventory failed on the missing `BUTTON_BARE_VALUES` entry. | Exit 0; 126 passed after listing it. |

The application-browser suite then passed 13 tests. The styles suite passed 157 tests in 30 files before the mixin change, after its initial extraction, after its final member selection, and after the table moves. Each SCSS edit was followed by `npm.cmd run build:src:styles` before reading a styles proof. The mixin verification ran before moving any expectations.

The managed Chromium before/after readings are identical. The final Edge styles suite also passed the member proofs. In the following table, each cell records the same value before and after:

| Member | Font family | Font size | Padding | Color, light / dark | Background, light / dark |
| --- | --- | --- | --- | --- | --- |
| `code` | F | `12.6px` | `1.575px 3.15px` | L / D | SL / SD |
| `samp` | F | `12.6px` | `1.575px 3.15px` | L / D | `rgba(0, 0, 0, 0)` / same |
| `kbd` | F | `12.25px` | `0.765625px 4.59375px` | L / D | SL / SD |
| `pre` | F | `12.25px` | `14px 16px` | L / D | `rgba(0, 0, 0, 0)` / same |
| `var` | `ui-monospace, SFMono-Regular, Menlo, monospace` | `13.3px` | `0px 3.325px` | L / D | `rgba(0, 0, 0, 0)` / same |

The table abbreviations preserve these exact readings:

- F: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`.
- L: `oklch(0.208 0.042 265.755)`.
- D: `oklch(0.929 0.013 255.508)`.
- SL: `oklab(0.208 -0.00310889 -0.0418848 / 0.12)`.
- SD: `oklab(0.929 -0.00325318 -0.0125864 / 0.12)`.

The raw readings are in `cl3-readings-before.log.txt.txt` and `cl3-readings-final.log.txt.txt`.

The reset reading agrees with the brief. With `hidden` present, the component-normal, unlayered-normal, later-layer-important, and unlayered-important competitors all read `display: none`. Removing `hidden` exposes `block`, `flex`, `grid`, and `inline-flex`, respectively. The targeted command `npm.cmd run test:src:styles -- tests/src/styles/reset.test.ts` exits 0 with 3 passed tests. The final Chromium and Edge styles gates retain that proof. This finding creates no contrary reading for CL12.

The final gates ran in the brief's order through `cl3-gates.cmd`. The host gates ran on Windows; the browser gates used managed Chromium by default, then `PLAYWRIGHT_CHANNEL=msedge` for the named Edge runs. The recorded final output is:

| Command | Exit | Final output |
| --- | --- | --- |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.` / `Finished in 837ms on 140 files using 16 threads.` |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics followed. |
| `npm.cmd run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; no diagnostics followed. |
| `npm.cmd run build` | 0 | `dist/app/browser/assets/index-CjSlLhVY.js 11.18 kB │ gzip: 3.25 kB` / `✓ built in 429ms` |
| `npm.cmd run test:src:styles` | 0 | `Test Files 30 passed (30)` / `Tests 157 passed (157)` / `Duration 21.91s` |
| `npm.cmd run test:setup` | 0 | `Test Files 3 passed (3)` / `Tests 126 passed (126)` / `Duration 6.54s` |
| `npm.cmd run test:app:browser` | 0 | `Test Files 4 passed (4)` / `Tests 13 passed (13)` / `Duration 2.23s` |
| `npm.cmd run test:conformance` | 0 | `Test Files 1 passed (1)` / `Tests 8 passed (8)` / `Duration 3.88s` |
| `npm.cmd run test:guides` | 0 | `Test Files 1 passed (1)` / `Tests 18 passed (18)` / `Duration 579ms` |
| `npm.cmd run test:policy` | 0 | `Test Files 1 passed (1)` / `Tests 109 passed │ 1 skipped (110)` / `Duration 2.17s` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` | 0 | `Test Files 30 passed (30)` / `Tests 157 passed (157)` / `Duration 29.84s` |
| `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:app:browser` | 0 | `Test Files 4 passed (4)` / `Tests 13 passed (13)` / `Duration 8.52s` |

Full gate output lives in `cl3-gate-*.log.txt`; exit records live in `cl3-runs.txt`. The policy skip is the existing `POLICY_TERM_FILE` presence condition at `tests/policy.test.ts:716`, not an added skip. Styles runs emit PostCSS browser-externalization warnings and exit 0. A PowerShell logging launcher was refused by the host execution policy before npm ran; the runs used the brief's permitted `.cmd` route.

Temporary instrumentation and controls are accounted for:

- The id-less negative control was the inherited implementation. The id assignment replaces it; the mounted and destroyed assertions remain.
- The inventory negative controls were omitted export entries. Every entry is present in the final inventory, proven by the green setup gate.
- The temporary `CL3_READING` console calls were removed from the code-family proofs. `rg -n 'CL3_READING|CL3 code tokens|console\.' tests/src/styles/elements tests/src/styles/tokens.test.ts` returns no matches, exit 1.
- `grep -n console tests/src/styles/tokens.test.ts` returns no output, exit 1.
- The reset competitor remains as the requested regression fixture and is removed from the live document by `specimens.clear()` in `afterEach` at line 7. `rg -n 'unlayered-important' src app` returns no matches, exit 1; no planted production rule remains.
- `rg -n 'it.each\(\[|toEqual\(\{|toEqual\(\[|mode ===' tests/src/styles/elements` returns no matches, exit 1.
- `git diff --check` exits 0 with no output.

The working tree retains CL3's inherited paths. This round's edits stay within brief 4's owned set; scratch launchers and logs are under ignored `tmp/`. Git reports the following actual `git diff --stat` output, which excludes untracked files:

```text
 app/browser/Showcase.ts                  |   4 +-
 app/browser/constants.ts                 |  56 ++++-
 app/browser/index.ts                     |   1 +
 app/browser/types.ts                     |   8 +
 guides/veneer.md                         |  51 +++--
 src/core/constants.ts                    |   1 +
 src/styles/_mixins.scss                  |   8 +
 src/styles/_tokens.scss                  |   4 +-
 src/styles/elements/_body.scss           |  16 +-
 src/styles/index.scss                    |  21 ++
 tests/app/browser/Showcase.test.ts       |  21 +-
 tests/app/browser/index.test.ts          |   3 +
 tests/setupStyles.test.ts                |  22 ++
 tests/setupStyles.ts                     | 339 +++++++++++++++++++++++++++++++
 tests/src/styles/elements/body.test.ts   |  26 +++
 tests/src/styles/elements/button.test.ts |  14 +-
 tests/src/styles/tokens.test.ts          |  29 +++
 17 files changed, 591 insertions(+), 33 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

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

Git exits 0; it also warns that the user-level `C:\Users\mikes/.config/git/ignore` file is inaccessible. The report is written at `cl3-report-3.md`.

