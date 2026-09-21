CL5b brief 3 is implemented. The ordered gates passed on Windows on 2026-09-21, including managed Chromium and the specified Edge runs. The sweep still reports no shared block on the unplanted tree.

This report follows `tmp/units/cl5b-brief-3.md`, with briefs 2 and 1 governing unchanged sections, and supersedes `tmp/units/cl5b-report.md` for this fix round. HEAD remains `ea82419`. Work ran directly in the supplied sol-on-Astra role; no agent was spawned. The outer launch's journal path and session identifier were not supplied.

The changes are confined to the sweep function and its cases. The finding sites are as follows.

| Finding | Change and site |
| --- | --- |
| Interpolated property names | `tests/setupConformance.ts:313` admits interpolation within custom, ordinary, and wholly interpolated property names. These declarations enter their brace block. |
| Interpolation whitespace | `tests/setupConformance.ts:301` folds whitespace runs inside interpolation through the same branch as outside interpolation. Quoted whitespace remains intact. |
| Parenthesis floor | `tests/setupConformance.ts:306` uses `Math.max(0, parentheses - 1)`. Observation: a closing parenthesis cannot make the counter negative. No artificial malformed-SCSS case was added. |
| Reported paths | `tests/setupConformance.ts:274` normalizes relative paths to forward slashes before returning the file list or block diagnostics. |

The cases in `tests/setupConformance.test.ts:167` and `:188` pin interpolated property names and interpolation whitespace, including preservation of quoted whitespace. The discovery case at `:48` pins literal forward-slash paths in the file list and every reported block intersection. The threshold of two distinct shared declarations and the exclusion of same-file duplication remain unchanged.

The same focused command ran before and after the implementation changes:

```text
vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupConformance.test.ts -t scanStyleBlocks
```

The recorded results were as follows. Log names in this report resolve under `tmp/units/`.

| Reading | Exit | Final result | Log |
| --- | --- | --- | --- |
| Before fixes | 1 | `Tests 3 failed \| 4 passed \| 38 skipped (45)` | `cl5b-fix-cases-red.log.txt` |
| After fixes | 0 | `Tests 7 passed \| 38 skipped (45)` | `cl5b-fix-cases-green.log.txt` |

Only the path, interpolated-property, and interpolation-whitespace cases failed before the fixes. The skipped cases were excluded by the name filter. The complete setup project later reported `Tests 138 passed (138)` without skips.

The executed sweep reading was `population=48; pairs=1128; hits=0`, exit 0, recorded in `cl5b-fix-population.log.txt`. Its population remains every regular `_*.scss` partial recursively under `src/styles`, including root partials. This agrees with round 1. The temporary population test was removed. The sweep compares written declaration blocks; it does not expand includes or establish semantic CSS equivalence.

`tmp/units/cl5b-fix-plant.mjs` appended an interpolated-property block to previously untouched `src/styles/elements/_address.scss` and `src/styles/components/_quote.scss`. Inside an `@each` loop, it declared `--cl5b-#{$role}-first: 17px` and `--cl5b-#{$role}-second: 23px`. It ran this command with the plant and after restoring the original buffers:

```text
vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup tests/setupStyles.test.ts
```

The plant results were as follows.

| Reading | Exit | Final result | Log |
| --- | --- | --- | --- |
| Plant present | 1 | `Tests 1 failed \| 77 passed (78)` | `cl5b-fix-plant-red.log.txt` |
| Plant removed | 0 | `Tests 78 passed (78)` | `cl5b-fix-plant-green.log.txt` |

Only `carries no shared written declaration block across style partials` failed. Its diagnostic reported the interpolated declarations at `components/_quote.scss:24` and `elements/_address.scss:11`. Removal reported `original bytes restored=true` for each file. Neither plant file has a diff. Searching `src` and `tests` for `cl5b-plant|cl5b-interpolation-plant|--cl5b-` returned no matches, covering the earlier plant and this round's plant.

`tmp/units/cl5b-fix-gates.mjs` ran the ordered chain through `cl5b-run.mjs`, capturing actual child exit codes. Managed runs remove `PLAYWRIGHT_CHANNEL`; Edge runs set it to `msedge`. The browser-selection check returned `{}` for managed Chromium and `{"launchOptions":{"channel":"msedge"}}` for Edge.

The gate exits and final substantive lines were as follows. Every listed log ends with `EXIT_CODE=0`.

| Command | Browser | Exit | Final lines | Log |
| --- | --- | --- | --- | --- |
| `npm run format:check` | Independent | 0 | `All matched files use the correct format.`; `Finished in 827ms on 184 files using 16 threads.` | `cl5b-fix-format.log.txt` |
| `npm run lint:check` | Independent | 0 | `oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics | `cl5b-fix-lint.log.txt` |
| `npm run check` | Independent | 0 | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; no diagnostics | `cl5b-fix-check.log.txt` |
| `npm run build` | Independent | 0 | `✓ built in 505ms` | `cl5b-fix-build.log.txt` |
| `npm test` | Managed Chromium | 0 | Final guides project: `Test Files 1 passed (1)`; `Tests 18 passed (18)` | `cl5b-fix-test.log.txt` |
| `npm run test:src:styles` | Edge | 0 | `Test Files 50 passed (50)`; `Tests 239 passed (239)` | `cl5b-fix-edge-styles.log.txt` |
| `npm run test:setup:browser` | Edge | 0 | `Test Files 1 passed (1)`; `Tests 33 passed (33)` | `cl5b-fix-edge-setup.log.txt` |
| `npm run test:app:browser` | Edge | 0 | `Test Files 6 passed (6)`; `Tests 17 passed (17)` | `cl5b-fix-edge-app.log.txt` |

The managed Chromium chain also recorded styles `239 passed`, browser setup `33 passed`, and application `17 passed`. Existing journey, policy, and configuration conditional skips remain; this round added none. The first format check exited 1 for the edited files; scoped formatting corrected them, then the entire ordered chain ran green. That initial reading remains in `cl5b-fix-format-development.log.txt`.

The earlier extractions and fixture move remain unchanged. The heading, type, element-image, and component-image proofs passed in the Chromium and Edge style suites without expectation changes. Re-running `cl5b-compare.mjs` exited 0: the rebuilt CSS and original baseline each contain 59921 bytes, with SHA-256 `620a2cd86fe7f88e9e42393d9959a7e5c2eb24c79608edf661a45c98a6236a09`; `byte-identical: true`, and `changed-byte control identical: false`.

The actual `git diff --stat` output is as follows.

```text
 src/styles/_mixins.scss                   |  12 ++
 src/styles/components/_image.scss         |   5 +-
 src/styles/components/_type.scss          |   7 +-
 src/styles/elements/_heading.scss         |   7 +-
 src/styles/elements/_img.scss             |   5 +-
 tests/setupConformance.test.ts            | 180 ++++++++++++++++++++++++++++++
 tests/setupConformance.ts                 | 120 +++++++++++++++++++-
 tests/setupStyles.test.ts                 |  14 ++-
 tests/setupStyles.ts                      |   4 +
 tests/src/styles/components/image.test.ts |   7 +-
 tests/src/styles/elements/img.test.ts     |   4 +-
 11 files changed, 343 insertions(+), 22 deletions(-)
```

The actual `git status --porcelain --untracked-files=all` output, including environment warnings, is as follows.

```text
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied
 M src/styles/_mixins.scss
 M src/styles/components/_image.scss
 M src/styles/components/_type.scss
 M src/styles/elements/_heading.scss
 M src/styles/elements/_img.scss
 M tests/setupConformance.test.ts
 M tests/setupConformance.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/components/image.test.ts
 M tests/src/styles/elements/img.test.ts
```

The status lists the same paths as round 1, with no addition. `git diff --check` exited 0. No dependency was added; the manifest and lockfile have no diff, and no `source-map-js` import was introduced. No commit was created.

Automatic approval review rejected `probe.prove`: `MCP tool call requires approval, but approval policy is never`. It ran no stages and produced no receipt. The evidence reported here comes from the executed Vitest red/green runs, plant, comparison, and gate chain.
