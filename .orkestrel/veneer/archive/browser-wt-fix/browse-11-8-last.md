Implemented browse-11-8 on `browse-11-repair`. Commit: `176de9366415dd3c4a1ccc3e2264fc42417de6d7`. The repair checks pass; the full service gate remains nonzero with intermittent failures recorded in this report.

Both capture placements contain the repairs. Counts include the DOM and compiled placements.

| Finding | Repair | Red and green evidence |
| --- | --- | --- |
| HTML `switch` regression | Scope branch selection and pruning to the SVG namespace. Preserve HTML text and mixed children. | Command A at `52cc34f`: 4 failed across the HTML rows. Repaired: 4 passed. |
| Direct read under an unselected SVG branch | Apply the same branch selection in the ancestor walk. | Command A at `52cc34f`: 2 failed. Repaired: 2 passed. |
| `symbol` and `defs` referenced by `use` | When no child has client rects, retain the first child element. | Command A at `52cc34f`: 4 failed, returning empty text. Repaired: 4 passed, each returning `Used label` once. |
| Input guard mutation survivor | Add a direct read of a programmatically appended input descendant. | Command B with the `HTMLInputElement` ancestor clause deleted: 2 failed, exit 1. Restored: 2 passed, exit 0. |
| Select/optgroup guard mutation survivor | Add non-option descendants under both controls. | Command C with the select/optgroup ancestor clause deleted: 4 failed, exit 1. Restored: 4 passed, exit 0. |
| Offscreen `content-visibility: auto` | Add the page row and a test after Chromium skips the subtree, including direct reads. | Chromium returned branch rect counts `[0, 1]` after the SVG’s visibility check returned false. The page row passed at baseline. The dedicated test failed in both placements because the unselected direct read leaked; both passed after repair. |
| Pruning-list parity | Document SVG branch selection and the no-rect fallback in the guide and `BrowserReadingInput`. | Guide gate: 248 passed. The SVG tests supply behavioral evidence; no behavioral red applies to the prose edit. |

The evidence commands were:

```text
A: node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts -t "HTML switch|SVG switch symbol use|SVG switch defs use|SVG switch offscreen auto visibility|unselected switch branch|input control|select non-option descendant|optgroup non-option descendant|after offscreen auto"
B: node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts -t "under.*input control"
C: node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts -t "non-option descendant"
```

Command A: baseline exit 1, 12 failed, 8 passed, 294 filtered out; repaired exit 0, 20 passed, 294 filtered out. Command B filtered out 312 tests; Command C filtered out 310. All mutations were restored.

The full touched-file command, `npx vitest run --config vite.config.ts --project src:browser tests/src/browser/helpers.test.ts`, passed all 314 tests, exit 0.

The prescribed gates ran after the final source and test edits on Windows. Every exit code was read without an output-filtering pipe.

| Command | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run test:src:core` | 0 | 1202 passed |
| `npm run test:src:browser` | 0 | 437 passed, 1 skipped |
| `npm run test:src:server` | 0 | 253 passed, 9 skipped |
| `npm run test:guides` | 0 | 248 passed |
| `npm run test:policy` | 0 | 119 passed, 1 skipped |
| `npm run test:setup` | 0 | 175 passed, 3 skipped |
| `npm run test:setup:browser` | 0 | 22 passed |
| `npm run build` | 0 | Passed |
| `npm run test:service` | 1, 1, 1, 1 | Runs: 1 failed/148 passed; 2 failed/147 passed; 1 failed/148 passed; 2 failed/147 passed |
| `git diff --check` | 0 | Passed |

Deviation: the input, select, optgroup, and offscreen page rows already passed at `52cc34f`, so a pristine-baseline red for every added row would be false. The control rows have mutation-red/restored-green evidence; the dedicated offscreen direct-read test has baseline-red/repaired-green evidence. Chromium supplied rects for the selected offscreen branch, so no additional auto-visibility fallback was needed. The ancestor rule includes the authorized first-child fallback to keep direct and page reads consistent. The `closest('svg, foreignObject')` lines are unchanged.

The service failures were:

| Full run | Failure evidence |
| --- | --- |
| 1 | `tests/service/journey.test.ts:738`: replay outcome `stopped`, expected `complete`. |
| 2 | `journey.test.ts:833` and `toolset.test.ts:1179`: `CDP request timed out: Runtime.callFunctionOn`. |
| 3 | `document.test.ts:521`: document-toolset startup exceeded its 10000 ms budget. Journey and toolset files passed. |
| 4 | `journey.test.ts:747`: document-toolset startup exceeded its 10000 ms budget; `toolset.test.ts:1076`: `Runtime.callFunctionOn` timeout. |

Each affected file was rerun alone with `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project service FILE`:

| FILE | Isolated results in run order |
| --- | --- |
| `tests/service/journey.test.ts` | Exit 0: 32 passed; exit 1: 1 failed/31 passed at the line-833 CDP timeout; exit 0: 32 passed |
| `tests/service/toolset.test.ts` | Exit 0: 34 passed; exit 1: 1 failed/33 passed at the line-1076 CDP timeout |
| `tests/service/document.test.ts` | Exit 0: 52 passed |

No source or budget changed between these runs. The full service gate is not claimed green. Host contention is a hypothesis, not an established cause.

Some focused runs and the setup-browser gate printed `close timed out after 10000ms` after passing their tests and exited 0. The full helper-file run passed without that warning. No budget was raised.

One commit was made. Nothing was pushed, published, or installed. Final `git status --porcelain` output is empty.