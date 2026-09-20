U6 successor brief 3 is complete. Every requested gate exits 0 on managed Chromium. All control mutations are removed. HEAD remains `f49bc7f`.

The changes made in this fix round are:

| Owned file | Diff summary |
| --- | --- |
| `src/browser/helpers.ts` | Reads and refuses an existing pointer hold before resolving the target; records the marker before `mousePressed`. Release remains conditional on the marker alone. Media staging re-sends effective color-scheme and forced-colors readings beside motion. TSDoc states the reset scope and the precise read-back coverage. |
| `tests/src/browser/helpers.test.ts` | Stages motion opposite the recorded host reading before restore; proves print paint survives a motion-only stage, unnamed color-scheme and forced-colors overrides survive staging, and an absent second name receives the double-hold voice. Removes diagnostic logs and annotates the sentinel assertions. Uses the existing condition helper for asynchronous feature delivery and restoration. Existing control names remain unchanged. |
| `guides/test.md` | Aligns the release summary with TSDoc, documents clearing provider-configured overrides, distinguishes verified stages from `print: false`, updates the motion-restore example and its proof, and joins the Bounds list. |

The controls used `npm.cmd run test:src:browser -- tests/src/browser/helpers.test.ts -t '<filter>'`. Each red/green pair ran the same command; every log is under ``.

| Control and filter | Red reading | Green reading | Logs |
| --- | --- | --- | --- |
| Scale: `misses at the unscaled point` | With `const scale = 1`, exit 1; the mapped hold rejects with `Interactive target "Scaled" did not enter the pressed state`. The case fails at `await holdAccessible('Scaled')`, before its `32` padding assertion. | Restored frame ratio: exit 0; `1 passed`, with the unscaled point reading `16` and the mapped hold reading `32`. | `u6-3-plant-scale-red.log`, `u6-3-plant-scale-green.log` |
| Pseudo: `distinguishes pseudo-element paint` | Dropping the `pseudo` argument gives exit 1: `expected '0px' to be '7px'`. | Restored argument: exit 0; `1 passed`; pseudo reads `'7px'`/`7`, originating element reads `'0px'`. | `u6-3-plant-pseudo-red.log`, `u6-3-plant-pseudo-green.log` |
| Release: `holds the pressed paint` | Omitting the explicit release gives exit 1: `expected 32 to be 16`. | Restored release: exit 0; `1 passed`; padding returns to `16`, active state clears, and the trusted pointer-up is recorded. | `u6-3-plant-release-red.log`, `u6-3-plant-release-green.log` |

The removed diagnostics were captured in `u6-3-readings.log.txt` by the filter `holds the pressed paint|pins the base` (exit 0, `2 passed`):

```text
userAgent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36
devicePixelRatio: 1
document.activeElement === button: true
window.innerWidth: 414
frame: {"x":275.23187255859375,"y":110,"width":156.8800048828125,"height":339.5277099609375,"top":110,"right":432.11187744140625,"bottom":449.5277099609375,"left":275.23187255859375}
restored media: {"reduced":false,"print":false,"padding":1}
```

The additional media readings record the engine's own `dark: false`, `forced: false`, and `reduced: false` in `u6-3-axes-readings.log.txt`. The corrected focused run, `u6-3-axes-green.log`, exits 0 with `2 passed`: dark and active forced-colors each survive a motion-only stage, then restore to their recorded host readings. Neither re-sent feature was refused. The print-preservation case reads `print: true` and padding `3` after staging motion.

The following commands ran in the required order. Gate logs are under ``, named `u6-3-<suffix>.log` as listed.

| Command | Exit | Final output lines | Log suffix |
| --- | --- | --- | --- |
| `npx.cmd oxfmt --config .oxfmtrc.json --write src/browser/helpers.ts tests/src/browser/helpers.test.ts guides/test.md` | 0 | `Finished in 934ms on 3 files using 16 threads.` | `format-owned` |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.` / `Finished in 1185ms on 60 files using 16 threads.` | `format-check` |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` | `lint-check` |
| `npm.cmd run check` | 0 | `npm notice run @orkestrel/test@0.0.18 check:src:server` / `npm notice run tsc --noEmit -p configs/src/tsconfig.server.json` | `check` |
| `npm.cmd run build` | 0 | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts` | `build` |
| `npm.cmd run test:src` | 0 | `Test Files 7 passed (7)` / `Tests 607 passed \| 2 expected fail \| 9 skipped (618)` / `Duration 30.86s` | `test-src` |
| `npm.cmd run test:policy` | 0 | `Test Files 1 passed (1)` / `Tests 101 passed \| 1 skipped (102)` / `Duration 1.89s` | `test-policy` |
| `npm.cmd run test:config` | 0 | `Test Files 1 passed (1)` / `Tests 173 passed \| 1 skipped (174)` / `Duration 3.41s` | `test-config` |
| `npm.cmd run test:setup` | 0 | `Test Files 3 passed (3)` / `Tests 24 passed (24)` / `Duration 412ms` | `test-setup` |
| `npm.cmd run test:guides` | 0 | `Test Files 1 passed (1)` / `Tests 50 passed \| 1 skipped (51)` / `Duration 1.14s` | `test-guides` |

The build emits the named browser declarations. Its log and the config log retain the API Extractor diagnostic about bundled TypeScript `5.9.3` versus project TypeScript `6.0.3`. The source-suite log retains `[Unhandled error] Error: Ignored` at `tests/src/browser/factories.test.ts:480`, where the existing test dispatches that named error. These commands still exit 0; no off-limits file was edited.

The deviations and ancillary decisions are:

| Expected | Found and exact evidence | Done or not done | Hypothesis |
| --- | --- | --- | --- |
| The immediate post-release color-scheme read equals the recorded host value. | `u6-3-axes-readings.log`: `expected true to be false` at the assertion after `releaseMedia()`; recorded `dark: false`. | Done: the owned test waits for the recorded value through `waitForCondition`; the same command in `u6-3-axes-green.log` passes. | Media-query invalidation can settle after the helper's frame wait. |
| Preliminary runner quoting preserves the full test filter. | PowerShell reported `pins : The term 'pins' is not recognized`; an intermediate runner invocation reported `1 skipped` and `288 skipped`, proving no case ran. | Done: the runner constructs the quoted filter and uses `windowsVerbatimArguments`; the retained control logs prove each named case executed. No skipped run is used as control evidence. | None. |
| The brief leaves assertion wording, case order, and TSDoc phrasing to this unit. | Tests sit beside their siblings; the motion sequence keeps its base/reduced readings and adds the host-inverse stage before print; an additional forced-colors case proves the required re-send. | Done: guide transcription matches, and the gates pass. | None. |

As the brief specifies, the controls use the CLI; `prove` was not run because the brief records it blocked. Edge was not run in this unit.

Final review evidence is saved as `u6-3-final-diff.txt` and `u6-3-final-status.txt`. `git diff --check` exits 0. The search `rg -n 'console\.log' tests/src/browser/helpers.test.ts` finds no match. Final `git status --porcelain` is exactly:

```text
 M guides/test.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/setup.ts
 M tests/src/browser/helpers.test.ts
```
