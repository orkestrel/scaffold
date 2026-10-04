Completed the reading-review repairs in commit `c52714f783034f58335d85dadb5d1c68063dd681` on `ccr-d15a48b1-yyyll6`. All required gates exited 0. Final `git status --porcelain` is empty.

The repairs and evidence are:

| Required change or ruling | Repair and evidence |
| --- | --- |
| Resume the preserved patch | Applied `reading-fix-incomplete.patch` and incorporated the revised ruling from the brief. Removed its withdrawn page-tool `what` refusal assertion. |
| Rename the helpers | Renamed both helpers to `scanBrowserOutline` and `scanBrowserText` throughout source, tests, TSDoc, and guide rows and examples. No aliases remain. The old-name search is empty; typechecks, guide parity, and built declarations confirm the replacement names. Existing matching assertions remain unchanged. |
| Preserve the first row’s leading token | Reservation is allowed only when the cut retains the token through its first space; otherwise the first row uses the available room and the later row is skipped. Added offset, reference, nearly-full later-row, and exact-boundary cases. Removing the reservation guard fails the named regression; restoration passes. TSDoc and the receipt explanation agree. |
| Suppress an ellipsis-only block | Added the empty-cut guard and cases with space 1 and 2. Removing the guard produces `Matches:\n…\n\n` and fails the regression; restoration passes. |
| Reach the surrogate guard | Changed the test’s room to 28. Deleting the surrogate guard produces `a\uD83D…` and fails the changed test; restoration passes. |
| Prove synthetic `purpose` | A parameterless adopted tool advertises required `purpose`, accepts it, and records `{}` at its page handler. Removing the strip fails because the handler receives `purpose`; renaming the placeholder fails the schema assertion. Both restorations pass. The test asserts nothing about page-tool `what`. |
| Remove the dead search branch | Passed `search` directly to `outline`. The diff removes the impossible `undefined` branch; typechecks and the core suite pass. |
| Correct toolset and MCP TSDoc | Restored the page-backed native-tool list and included `plain` and `forget` in the MCP vocabulary. Guide parity and typechecks pass. |
| Explain the copy bounds in the present | The test comment and guide derive 6,600 from the measured 6,559 characters, and 3,100 from 3,090. The existing vocabulary-bound test passes. Historical measurements, 6,023 → 6,559 and 3,067 → 3,090 UTF-16 code units, are in the commit message. |
| Correct prompt provenance and wording | The opening guide paragraph identifies the reading vocabulary and the recorded proof’s earlier prompt. The later paragraph quotes “the site's search box”. No Ollama migration was made. |
| Complete the receipt table | Added singular/plural line, tab, and journey match headings; defined the widened placeholders; included `plain` in continuation and limit receipts; documented that a pending move note precedes the tab list. Source comparison and the guide gate pass. |
| Correct the journey example | Added its match heading and offset row. A real journey-tool execution matches the guide’s comments. Removing the heading fails exactly this guide test: 1 failed, 249 passed; restoration gives 250 passed. |
| Label adapted transcripts | Both historical examples identify their adaptation to `search` and `plain`. Removed the tool-name count and changed the unfiltered journey request to `search: ''`. Guide parity passes. |
| Use a matching README search word | Replaced `the form` with `Email`, matching the preceding example’s textbox. Documentation checks pass. |
| Retain the excluded advisories | Left double HTML mapping, headings counting omitted matches, and authored optional `purpose` behavior unchanged. No files outside the worktree were edited. |

The mutation run `node tmp/codex/reading-fix-mutations.ts` executes the following tests through `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core FILE -t SELECTOR`. Each control collected and failed exactly the named test with exit 1; each restoration passed it with exit 0.

| File | Selector | Breaking edit |
| --- | --- | --- |
| `tests/src/core/helpers.test.ts` | `preserves the first offset` | Remove the reservation floor |
| `tests/src/core/helpers.test.ts` | `omits a block with no room` | Remove the empty-cut guard |
| `tests/src/core/helpers.test.ts` | `bounds matches, cuts a long first row safely` | Remove the surrogate guard |
| `tests/src/core/BrowserToolset.test.ts` | `strips synthetic purpose` | Remove argument stripping |
| `tests/src/core/BrowserToolset.test.ts` | `strips synthetic purpose` | Rename required `purpose` to `reason` |

The guide control used `node --experimental-strip-types tests/guides.test.ts`. The complete touched-file command, `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/helpers.test.ts tests/src/core/BrowserToolset.test.ts`, finished with 317 passed across both files. Red/green logs are under `tmp/codex/reading-fix-*`; the completed mutation journal is `reading-fix-mutations-3.log`.

The required gates ran in the prescribed order after the last tracked edit, on Windows:

| Command | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run test:src:core` | 0 | 1,212 passed |
| `npm run test:src:browser` | 0 | 402 passed, 1 skipped |
| `npm run test:src:server` | 0 | 253 passed, 9 skipped |
| `npm run test:src:bin` | 0 | 4 passed, 1 skipped |
| `npm run test:guides` | 0 | 250 passed |
| `npm run test:policy` | 0 | 119 passed, 1 skipped |
| `npm run test:setup` | 0 | 175 passed, 3 skipped |
| `npm run test:setup:browser` | 0 | 22 passed; teardown warning described below |
| `npm run build` | 0 | Passed |
| `npm run test:service` | 0 | 138 passed |
| `git diff --check` | 0 | Clean |
| `git status --porcelain` | 0 | Empty after commit |

The setup-browser gate passed its tests but reported `close timed out after 10000ms`. After the gate chain finished, `node node_modules/vitest/vitest.mjs run --config vite.config.ts --no-cache --project setup:browser tests/setupBrowser.test.ts` passed all 22 tests, exited 0, and emitted no close-timeout warning. No test budget was raised. Existing skips concern unavailable host capabilities and scaffold-only policy coverage. The build also reported its existing API Extractor/compiler-version and Vite output-format warnings.

Scope deviations: none. The supplementary installed scaffold discovery command, `node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-harden/scripts/discovery.js --projects src:core`, exited 1: it compared the browser instance names ending in `(chromium)` with unsuffixed gate names and reported them as ungated/empty. Direct browser-gate executions prove those projects are collected and gated. Discovery also confirmed the core and guide populations. Scaffold-owned files were left untouched.

One commit was made. No agents were spawned; nothing was pushed, published, or installed.
