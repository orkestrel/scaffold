<!-- Retained from u7a-10-last.md. Bench lane: sol on Astra, codex exec workspace-write -C C:/Users/mikes/WebstormProjects/veneer, journal u7a-10.jsonl, thread 01a0c198-a0e8-78a2-b3fa-4c506a08b474, exit 0, 2026-09-20 21:40. The fix round complete: unconditional contrast assertions over two tables, every gate exit 0 on Chromium and Edge, the 90 contrast readings equal to report 9's on both engines, cascade digest 14cbc6fa…. -->

The brief-10 implementation and required gates are complete. Lint exits 0, and the styles suite passes 104 tests on managed Chromium and Edge. Every captured contrast reading exactly matches report 9. HEAD remains `2bc922d`; nothing was committed, installed, or delegated.

This round changes `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `tests/src/styles/components/button.test.ts`. The inherited working tree remains intact. No partial changed; report 9's control readings and restore proofs stand.

The exported tables in `tests/setupStyles.ts` are frozen, including their rows and ratio arrays. Their consumers in `tests/src/styles/components/button.test.ts` are:

| Table | Population and assertion | Registered case |
| --- | --- | --- |
| `BUTTON_CONTRAST_FLOOR_CASES` | The light role in light and dark modes; unconditional `toBeGreaterThanOrEqual(4.5)` for filled rest, hover, active, and outline hover and active | `meets the contrast floor for %s text over its filled and hovered-outline surfaces in %s mode` |
| `BUTTON_CONTRAST_RATIO_CASES` | Every other role in light and dark modes; unconditional `toBeCloseTo(ratios[index], 2)` for those same states, with the inherited values unchanged | `pins the measured contrast for %s text over its filled and hovered-outline surfaces in %s mode` |

The foreground lookups in `paints %s in %s mode across rest, focus, hover, active, pressed, and disabled states` and `paints outline %s in %s mode across rest, hover, active, focus, and disabled states` read the combined tables. No `BUTTON_CONTRAST_CASES` reader remains under `tests/`, so that export was removed. Neither Button test file contains a conditional `expect`.

## Export-inventory update

In `tests/setupStyles.test.ts`, the case `exports the scanner, the predicates, the collectors, and the compatibility oracle, and nothing the document has to answer` adds `BUTTON_CONTRAST_FLOOR_CASES` and `BUTTON_CONTRAST_RATIO_CASES`, and removes `BUTTON_CONTRAST_CASES`. The setup gate passes.

The lint red is the inherited `npm.cmd run lint:check` result in `tmp/u7a/gate-lint-9.log`: exit 1, with `vitest/no-conditional-expect` diagnostics at the contrast branches. Its final diagnostic is:

```text
tests/src/styles/components/button.test.ts:90:5: error vitest(no-conditional-expect): Unexpected conditional expect help: Avoid calling `expect` conditionally
```

The green is the same command after the restructure: exit 0. An initial PowerShell capture included native-stderr wrapper text, so the command was repeated through the command file for an unpolluted log. The required gate chain is `cmd /c tmp\u7a\gates-10.cmd`; its terminal exit is 0, and `tmp/u7a/gates-10.status` records every command's exit. The following final lines are from those logs, in execution order. These are Windows readings from 2026-09-20; the script clears `PLAYWRIGHT_CHANNEL` until the Edge gate.

`npm.cmd run lint:check` exits 0; log: `tmp/u7a/gate-lint-10.log`. Its final lines are:

```text
npm notice run @orkestrel/veneer@0.0.1 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
```

`npm.cmd run test:src:styles` exits 0; log: `tmp/u7a/gate-styles-10.log`. Its final lines are:

```text
 Test Files  9 passed (9)
      Tests  104 passed (104)
   Start at  21:36:30
   Duration  21.68s (transform 0ms, setup 332ms, import 312ms, tests 16.85s, environment 0ms)
```

`npm.cmd run format:check` exits 0; log: `tmp/u7a/gate-format-10.log`. Its final lines are:

```text
npm notice run @orkestrel/veneer@0.0.1 format:check
npm notice run oxfmt --config .oxfmtrc.json --check .
Checking formatting...

All matched files use the correct format.
Finished in 744ms on 86 files using 16 threads.
```

`npm.cmd run check` exits 0; log: `tmp/u7a/gate-check-10.log`. Its final lines are:

```text
npm notice run @orkestrel/veneer@0.0.1 check:app
npm notice run npm run check:app:browser
npm notice run @orkestrel/veneer@0.0.1 check:app:browser
npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json
```

`npm.cmd run test:src:core` exits 0; log: `tmp/u7a/gate-core-10.log`. Its final lines are:

```text
 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  21:36:59
   Duration  249ms (transform 43ms, setup 39ms, import 28ms, tests 30ms, environment 0ms)
```

`npm.cmd run test:setup -- tests/setupStyles.test.ts` exits 0; log: `tmp/u7a/gate-setup-10.log`. Its final lines are:

```text
 Test Files  1 passed (1)
      Tests  71 passed (71)
   Start at  21:37:01
   Duration  1.13s (transform 112ms, setup 31ms, import 708ms, tests 240ms, environment 0ms)
```

`npm.cmd run test:conformance` exits 0; log: `tmp/u7a/gate-conformance-10.log`. Its final lines are:

```text
 Test Files  1 passed (1)
      Tests  8 passed (8)
   Start at  21:37:03
   Duration  3.81s (transform 81ms, setup 31ms, import 665ms, tests 2.96s, environment 0ms)
```

`npm.cmd run test:guides` exits 0; log: `tmp/u7a/gate-guides-10.log`. Its final lines are:

```text
 Test Files  1 passed (1)
      Tests  18 passed (18)
   Start at  21:37:07
   Duration  503ms (transform 50ms, setup 31ms, import 314ms, tests 6ms, environment 0ms)
```

`PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:src:styles` exits 0; log: `tmp/u7a/gate-edge-10.log`. Its final lines are:

```text
 Test Files  9 passed (9)
      Tests  104 passed (104)
   Start at  21:37:10
   Duration  26.69s (transform 0ms, setup 374ms, import 306ms, tests 18.15s, environment 0ms)
```

The exact-reading instrument is `tmp/u7a/contrast-10.config.ts`, run by `cmd /c tmp\u7a\contrast-10.cmd`. It adds logging during Vite transformation of the contrast assertions without editing their source. Each engine run exits 0 with 18 contrast cases passing; the `-t contrast` filter excludes the unrelated cases. The full styles gates exclude nothing and pass 104 tests each.

The comparison reads the role/mode/state population from report 9 and the instrument's browser logs. It rejects missing, duplicate, or unequal readings. `cmd /c tmp\u7a\compare-contrast-10.cmd` first changes the collected light/light/filled-rest reading to 0 in memory: comparison exit 1, retained in `contrast-comparison-red-10.log`. With the actual readings, comparison exit 0, retained in `contrast-comparison-green-10.log`. Its output is:

```text
chromium: all 90 contrast readings exactly equal report 9; no missing or duplicate role/mode/state readings
edge: all 90 contrast readings exactly equal report 9; no missing or duplicate role/mode/state readings
```

The raw logs and JSON readings are `tmp/u7a/contrast-chromium-10.log`, `contrast-edge-10.log`, `contrast-chromium-10.json`, and `contrast-edge-10.json`. This comparison covers the states in report 9's contrast table; it claims no disabled-opacity or outline-rest contrast measurement. The inherited `prove` limitation remains; no receipt is claimed.

The cascade `dist/src/styles/index.css` has SHA-256 `14cbc6faabb24667bcd75068bec54c0d9c1646ec27a7b237bc11c500d6b5d363`, exactly the brief's expected digest.

The actual tracked diff is `tmp/u7a/final-tracked-10.diff`. The untracked-file diffs are `final-component-10.diff`, `final-element-10.diff`, `final-component-test-10.diff`, and `final-element-test-10.diff` under `tmp/u7a/`. `git diff --check` exits 0.

The actual `git diff --stat` output is:

```text
 guides/veneer.md                | 180 ++++++++++++++++---
 src/core/constants.ts           |  16 ++
 src/styles/_mixins.scss         |  20 +++
 src/styles/_tokens.scss         |  17 ++
 src/styles/index.scss           |   2 +
 tests/conformance.test.ts       |   2 +-
 tests/setupStyles.test.ts       |  71 ++++++++
 tests/setupStyles.ts            | 388 ++++++++++++++++++++++++++++++++++++++++
 tests/src/styles/index.test.ts  |  17 +-
 tests/src/styles/mixins.test.ts |  21 +++
 10 files changed, 704 insertions(+), 30 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output is:

```text
 M guides/veneer.md
 M src/core/constants.ts
 M src/styles/_mixins.scss
 M src/styles/_tokens.scss
 M src/styles/index.scss
 M tests/conformance.test.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/index.test.ts
 M tests/src/styles/mixins.test.ts
?? src/styles/components/_button.scss
?? src/styles/elements/_button.scss
?? tests/src/styles/components/button.test.ts
?? tests/src/styles/elements/button.test.ts
```

The status contains only the owned set. The report exists at `u7a-report-10.md`; `git check-ignore` confirms that `tmp/` hides it from ordinary status. Git also reports that the sandbox cannot read `C:/Users/mikes/.config/git/ignore`; the status command exits 0. No off-limits file was edited.