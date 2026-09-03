# Unit conform-browser — report

Every row is `applied`, `noop`, or (for the ruled exceptions) `noop` with the refuter's evidence.
No row stopped. The gate chain is green, `scaffold audit --offline` is clean, and
`git status --short` lists only files under Owned.

## Rows

| Row              | Disposition | Evidence                                                                                                                   |
| ---------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| browser-obj-1    | applied     | `attributeOfBrowserNode` deleted from source, test, guide Surface row, guide import list, and guide fence                   |
| browser-obj-2    | applied     | Every paired `Date.now()` elapsed reading replaced with `performance.now()`; no budget or assertion shape changed           |
| browser-obj-3    | applied     | `CDPTestServer.url` and `.endpoint` now return `127.0.0.1`; the bind at the `listen(0, '127.0.0.1', …)` call is untouched   |
| browser-obj-4    | applied     | A mirrored test file now exists for every `src/core` module the row named                                                   |
| browser-obj-5    | applied     | `service` project, `tests/setupService.ts`, `tests/service/browser.test.ts`, `test:service`, `prepublishOnly` step          |
| browser-obj-6    | applied     | `FileBrowserWriter` class, barrel row, guide Surface row and method table, mirrored test                                    |
| browser-obj-7    | applied     | `export` added to `interface RegisteredFakeBrowser`; its existing TSDoc left alone, per the refuter's strike                |
| browser-obj-8    | noop        | Ruled exception. `parsers.ts` imports no implementation class, so the leaf-pair cycle is the acceptable shape               |
| browser-obj-9    | noop        | Ruled exception. `@orkestrel/process` is undeclared; `readFirstLine` already performs the mandated split-and-trim           |
| browser-subj-1   | applied     | Guide fence now calls `keyToBrowserInput('Enter')`, and the new keyboard suite executes that call                           |
| browser-subj-2   | applied     | Both `AGENTS §22` citations removed from `guides/README.md`                                                                 |
| browser-subj-3   | applied     | `context` added to the `BrowserEventMap` shape cell and the Contract event list; `isolate` added; context members restated  |
| browser-subj-4   | applied     | Contract clause 10 enumerates `BrowserWebSocketInterface`, `BrowserDownloadInterface`, and their classes                    |
| browser-subj-5   | applied     | One `####` method table per behavioral interface the Extended surface introduces, each with a runnable fence                |
| browser-subj-6   | applied     | Every banned substitution replaced in `guides/browser.md`, the two under-reported causal `since` uses included              |
| browser-subj-7   | applied     | `context` and `isolate` bullets added to the `BrowserEventMap` and `BrowserInterface` `@remarks`                            |
| browser-subj-8   | applied     | `via`, `e.g.`, and the causal `since` replaced across `src`                                                                 |
| browser-subj-9   | applied     | `on` and `error` added to `BrowserPageOptions` and `BrowserContextOptions`, threaded with the conditional-spread form       |
| browser-subj-10  | applied     | `BrowserEmulationManager` routes offline and headers through `page.network`; the Network start is pinned by a new test      |
| browser-subj-12  | applied     | `parseBrowserChord` renamed to `extractBrowserChord` in place, with its call site, guide row, import, and fence             |
| browser-subj-14  | applied     | `findInStore` renamed to `findStorePaths`, with its call site, guide row, import, fence, and test                           |
| browser-subj-15  | noop        | Exempt as ruled. The drive methods stay on their published contracts; the split is the Orchestrator's decision              |
| browser-subj-16  | applied     | `buildInstallPaths`, `buildWindowsRoots`, `buildStoreBases`, with every call site, guide row, import, and fence             |
| browser-subj-17  | applied     | `#closed` deleted from `BrowserContext`; every read derives from `this.#shutdown !== undefined`                             |
| browser-subj-18  | applied     | `test.md` and `probe.md` paragraphs added to `## Dependency reference`                                                      |
| fleet-F1         | noop        | `grep -rn "isBrowserVuePath" tests src guides vite.config.ts package.json` returns nothing: the helper is absent            |
| fleet-F2         | noop        | No implementation class declares a public `readonly id: string` field; each stores `readonly #id` and exposes `get id()`    |

Classes read for fleet-F2: `BrowserWorker`, `BrowserDownload`, `BrowserRoute`, `BrowserWebSocket`,
`BrowserContext`, `BrowserPage`, `BrowserFrame`, `BrowserHandle`, `Browser`,
`WebSocketCDPTransport`, `FileBrowserWriter`. The sweep was `grep -rn "readonly id: string$"` over
`src/core/Browser*.ts`, `src/core/CDPClient.ts`, `src/server/Browser.ts`,
`src/server/transports/*.ts`, and `src/server/writers/*.ts`, which returns nothing.

## Files touched

### Source

- `src/core/helpers.ts` — deleted `attributeOfBrowserNode`; renamed `parseBrowserChord` to `extractBrowserChord` and gave it a `@throws` tag naming both refusals.
- `src/core/types.ts` — added `on` and `error` to `BrowserPageOptions` and `BrowserContextOptions` with their `@remarks`; replaced `via` in two published TSDoc blocks.
- `src/core/BrowserPage.ts` — constructor takes a trailing `options?: BrowserPageOptions` and builds its emitter with the conditional-spread form.
- `src/core/BrowserContext.ts` — constructor takes a trailing `options?: BrowserContextOptions`; threads page options into `#attach`; `#closed` deleted and every read derived from `#shutdown`.
- `src/core/BrowserEmulationManager.ts` — offline and header overrides route through `page.network.offline` and `page.network.headers`, matching the `credentials` branch.
- `src/core/BrowserKeyboard.ts` — imports and calls `extractBrowserChord`.
- `src/core/CDPClient.ts`, `src/core/constants.ts` — `via` replaced in published TSDoc.
- `src/server/types.ts` — `context` and `isolate` bullets added to the two `@remarks` blocks; `via` replaced.
- `src/server/helpers.ts` — `defaultInstallPaths`, `windowsRoots`, `defaultStoreBases`, and `findInStore` renamed; `via` and `e.g.` replaced.
- `src/server/constants.ts` — causal `since` replaced with `because`.
- `src/server/factories.ts` — `createBrowserWriter` returns `new FileBrowserWriter()`; the `node:fs/promises` and `node:path` imports moved out.
- `src/server/writers/FileBrowserWriter.ts` — new: the only concrete `BrowserWriterInterface` implementation, as its own class in its own category folder.
- `src/server/index.ts` — barrels `FileBrowserWriter`.
- `src/server/Browser.ts` — `isolate` threads its options into the context it builds.

### Tests

- `tests/setup.ts` — added `AttachedPageFixture`, `createAttachedPage`, and `readCDPParams`, the shared infrastructure the new mirrored suites drive.
- `tests/setup.test.ts` — proofs for both new helpers.
- `tests/setupServer.ts` — `CDPTestServer.url` and `.endpoint` return `127.0.0.1`; `RegisteredFakeBrowser` exported.
- `tests/setupServer.test.ts` — the `webSocketDebuggerUrl` expectation follows the fixture.
- `tests/setupService.ts` — new: the `service` project's readiness contract.
- `tests/setupService.test.ts` — new: proves that contract and pins that every `tests/service` proof resolves through `requireSystemBrowser` and carries no conditional skip.
- `tests/service/browser.test.ts` — new: the live-browser proofs, moved out of the module test.
- `tests/src/server/Browser.test.ts` — the `describe.runIf` real-launch block and its now-unused imports removed; the header names where those proofs live.
- `tests/src/server/helpers.test.ts` — `performance.now()` readings; `findStorePaths` rename.
- `tests/src/server/writers/FileBrowserWriter.test.ts` — new.
- `tests/src/core/helpers.test.ts` — reads `node.attributes[…]` directly.
- `tests/src/core/BrowserPage.test.ts`, `BrowserContext.test.ts` — emitter-option cases.
- `tests/src/core/BrowserEmulationManager.test.ts` — the Network-domain ordering and the clear path.
- New mirrored suites: `BrowserMouse`, `BrowserKeyboard`, `BrowserTouch`, `BrowserSelectorManager`, `BrowserPerformance`, `BrowserTracing`, `BrowserProfiler`, `BrowserCoverage`, `BrowserWorker`, `BrowserDialog`, `BrowserFileChooser`, `BrowserDownload`, `BrowserRoute`, `BrowserWebSocket`, `BrowserPermissionManager`.

### Documentation and configuration

- `guides/browser.md` — the Surface, fence, Contract, vocabulary, and `## Methods` edits every guide row names.
- `guides/README.md` — the section citations and the two mirror paragraphs.
- `vite.config.ts` — the `service` project, in the canonical block and position.
- `package.json` — `test:service`, and its step appended to `prepublishOnly`. No other field moved.

## Failing-first controls

Each control's runner output is a file under `/home/user/work/evidence/browser-proofs/`.

| Row             | Command                                                                   | Red                             | Green                     | Files                                              |
| --------------- | ------------------------------------------------------------------------- | ------------------------------- | ------------------------- | -------------------------------------------------- |
| browser-obj-1   | `npm run test:guides`                                                     | 2 failed, 66 passed             | 198 passed                | `browser-obj-1-red.txt`, `browser-subj-5-green.txt` |
| browser-obj-5   | `npm run test:setup`                                                      | 1 failed, 50 passed             | 51 passed                 | `browser-obj-5-red.txt`, `browser-obj-5-setup.txt` |
| browser-obj-6   | `npx vitest run … --project src:server tests/src/server/writers/FileBrowserWriter.test.ts` | 1 failed, 4 passed | 5 passed | `browser-obj-6-red.txt`, `browser-obj-6-green.txt` |
| browser-subj-9  | `npx vitest run … --project src:core tests/src/core/BrowserPage.test.ts tests/src/core/BrowserContext.test.ts` | 2 failed, 102 passed | 104 passed | `browser-subj-9-red.txt`, `browser-subj-9-green.txt` |
| browser-subj-10 | `npx vitest run … --project src:core tests/src/core/BrowserEmulationManager.test.ts` | 1 failed, 7 passed | 8 passed | `browser-subj-10-red.txt`, `browser-subj-10-green.txt` |

How each red was produced:

- **browser-obj-1** — the deletion landed in source and test first, so the guide's stale Surface row and import reddened the parity project.
- **browser-obj-5** — `requireSystemBrowser` planted to refuse only under an explicit engine narrowing, so the readiness proof read the silent-skip behaviour the row exists to remove. Restored by editing.
- **browser-obj-6** — `FileBrowserWriter.write` planted without its `mkdir`, so the nested-path case reddened. Restored by editing.
- **browser-subj-9** and **browser-subj-10** — the tests were written before the fix and read red against the unmodified source.

An earlier readiness control also ran: with discovery handed empty candidate sources, `npm run test:service` reported `Test Files 1 failed`, `Tests no tests`, naming the install routes rather than skipping. That reading is in `browser-obj-5-red.txt`'s predecessor run and is reproduced by the retained `requireSystemBrowser` case.

Structural rows (browser-obj-4, browser-obj-7, browser-subj-17, and the rename rows) carry a sweep plus a gate rather than a planted red, per the brief's placement-and-naming clause. Neither browser-obj-2 nor browser-obj-3 admits a red: the old `localhost` form passes on a host that resolves `localhost` to `127.0.0.1`, and an elapsed reading built from `Date.now()` is green against the same budget as one built from `performance.now()`.

## Sweeps

| Pattern                                                                             | Paths                                                              | Result                                        |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------- |
| `attributeOfBrowserNode\|parseBrowserChord\|findInStore\|defaultInstallPaths\|defaultStoreBases` (case-insensitive) | `src`, `tests`, `guides`, `README.md`, `package.json`, `vite.config.ts` | empty                                         |
| `\bwindowsRoots\b`                                                                  | `src`, `tests`, `guides`, `README.md`, `package.json`, `vite.config.ts` | empty                                     |
| `Date\.now\(`                                                                       | `tests`                                                             | empty; the retained `src` hits (`src/server/helpers.ts:365,367,369,388`, `src/core/BrowserNetworkManager.ts:183,253`, `src/core/BrowserHARManager.ts:101,157,179,228`, `src/core/BrowserClock.ts:35`, `src/core/parsers.ts:377`) are ruled outside browser-obj-2's population, which is paired elapsed readings |
| `localhost`                                                                         | `tests`                                                             | `tests/src/server/Browser.test.ts:527,541,952` and `tests/src/server/factories.test.ts:56` ruled inert string data; `tests/setupServer.ts:28,242` ruled TSDoc prose |
| `\bvia\b\|\be\.g\.\|\bshould\b\|\bsince\b` (case-insensitive)                        | `src`, `guides/browser.md`, `guides/README.md`, `README.md`        | empty                                         |
| `\b(one\|two\|…\|ten)\b` (case-insensitive)                                          | `guides/browser.md`, `guides/README.md`                            | every hit is the singular article or names its members; none is a count |
| `\b[0-9]+ (elements\|members\|…\|categories)\b`                                      | `guides`, `README.md`, `src`, `tests`                              | one hit, inside a Chromium error-message fixture string — data, not prose |
| `isBrowserVuePath`                                                                  | `tests`, `src`, `guides`, `vite.config.ts`, `package.json`         | empty (fleet-F1)                              |
| `readonly id: string$`                                                              | implementation class files                                         | empty (fleet-F2)                              |
| Mirror inventory: `ls src/core` against `ls tests/src/core`                          | —                                                                  | every behavioural module has a mirror; only `constants.ts`, `types.ts`, and `index.ts` have none, which the exemption covers |

The inflected sweep `windowsroots?` matches the new `buildWindowsRoots` name; each of those hits was
ruled as the new name, and the word-boundary sweep over the old name is empty.

## Gates

| Command                        | Exit | Reading                                                                                              |
| ------------------------------ | ---- | ---------------------------------------------------------------------------------------------------- |
| `npm run format:check`         | 0    | All matched files use the correct format (135 files)                                                 |
| `npm run lint:check`           | 0    | No diagnostic                                                                                        |
| `npm run check`                | 0    | Root, `src:core`, and `src:server` typechecks clean                                                  |
| `npm run build`                | 0    | `dist/src/core` and `dist/src/server` emitted with declarations                                      |
| `npm test`                     | 0    | `src` 45 files / 610 tests; `policy` 111; `config` 46; `setup` 3 files / 51; `guides` 198 — all passed |
| `npm run test:service`         | 0    | 1 file / 14 tests passed against a real Chromium in 37.02s                                           |
| `npx scaffold audit --offline` | 0    | 0 of 40 planned paths drifted                                                                        |

Gate output files: `gate-format-check.txt`, `gate-lint-check.txt`, `gate-check.txt`,
`gate-build.txt`, `gate-test.txt`, `browser-obj-5-green.txt`, `scaffold-audit.txt`.

`npm test` ran with no other writer in this checkout, but the reading is still a unit's own; the
authoritative run belongs to the Orchestrator after this unit exits.

## Breaking

Three published symbols moved. The Luna reconcile sweep named under § Consumers found no source
consumer of any of them in any fleet checkout or in scaffold, so no consumer patch is owed. The
exact edit a consumer would need:

| Removed or renamed        | Replacement                        | Consumer edit                                                               |
| ------------------------- | ---------------------------------- | --------------------------------------------------------------------------- |
| `attributeOfBrowserNode`  | none — read the property           | `attributeOfBrowserNode(node, name)` becomes `node.attributes[name]`, which already yields `string \| undefined` under `noUncheckedIndexedAccess` |
| `parseBrowserChord`       | `extractBrowserChord`              | Rename the import and every call; the signature and the throwing behaviour are unchanged |
| `findInStore`             | `findStorePaths`                   | Rename the import and every call                                            |
| `defaultInstallPaths`     | `buildInstallPaths`                | Rename the import and every call                                            |
| `windowsRoots`            | `buildWindowsRoots`                | Rename the import and every call                                            |
| `defaultStoreBases`       | `buildStoreBases`                  | Rename the import and every call                                            |

`FileBrowserWriter` is a pure addition to the server barrel and breaks nothing.

## Shared-file patches

None. No file outside Owned needed an edit, and no other fleet checkout was touched.

## Recorded corrections and ancillary decisions

These are decisions the deviation contract leaves to the executor. Each is recorded rather than
escalated, because none contradicts a row's objective.

1. **The `service` project's `setupFiles` follows the vendored canon, not the finder's list.** The
   finder named `['./tests/setup.ts', './tests/setupServer.ts', './tests/setupService.ts']`. The
   vendored `tests/config.test.ts` asserts `['./tests/setup.ts', './tests/setupService.ts']`, and
   `tests/config.test.ts` is off-limits. The project uses the vendored shape;
   `tests/service/browser.test.ts` imports the `tests/setupServer.ts` helpers it needs directly and
   runs their teardown from its own `afterEach`, so nothing is lost. Red reading before the
   correction: `tests/config.test.ts` 1 failed, 45 passed.
2. **The `service` block matches the scaffold plan byte for byte.** `scaffold audit --offline`
   reported `vite.config.ts` stale against its plan. The plan's block uses `color: 'red'`, carries
   `browser: { enabled: false }`, sits before `distribution` in both the declarations and the
   `projects` array, and opens with the comment naming `scripts/service.sh`. The file now matches.
3. **`tests/setupService.ts` resolves readiness on call rather than at module load.** The audit
   refuses a setup module no proof covers, and a proof cannot import a module that throws at load on
   a browserless host without pulling a browser requirement into `npm test`. Readiness stays
   hard-required — `requireSystemBrowser` throws a named error and never skips — and
   `tests/setupService.test.ts` pins that every `tests/service` proof calls it and carries no
   conditional skip, so the contract is enforced rather than remembered.
4. **The moved live-browser cases dropped their per-case timeout arguments.** The `service` project
   sets `testTimeout: 120_000` and `hookTimeout: 120_000`, which is the point of isolating the
   proofs. The inline 20s, 30s, and 40s caps would have overridden it downward.
5. **`it.runIf(COOPERATIVE_SIGTERM)` stays in `tests/src/server/Browser.test.ts`**, as the refuter
   directed: its condition is a named platform mechanism the rule permits.
6. **Renamed guide rows and import lines kept their tables alphabetical.** `extractBrowserChord`
   moved from the `parse*` run to sit after `encodeBase64`; the `build*` names kept their position
   beside their peers.
7. **The new mirrored suites drive shared fixtures rather than local factories.**
   `createAttachedPage` and `readCDPParams` went into `tests/setup.ts` with their own proofs,
   because `.claude/rules/tests.md` refuses a local fixture factory in a test file.
8. **`tests/service/browser.test.ts:553` renamed the moved contenteditable case's title from "via
   codegen" to "through codegen."** browser-obj-5's move carries the block unchanged apart from its
   imports; the title word is browser-subj-8's `via` substitution, applied where the moved text
   crossed it, and is recorded here as an ancillary decision rather than left unstated.

## Observations for the next matrix

None of these is in this unit's scope; each is recorded against the capability that owns it.

- `buildInstallPaths`, `buildWindowsRoots`, and `buildStoreBases` are exported from
  `src/server/helpers.ts` and have no test anywhere. The rename rows moved their names; the
  untested-export gap predates this round and belongs to the server-discovery capability.
- `probePathNames` takes the resolver's first line without confirming it names an executable file,
  which `.claude/rules/portability.md` § Processes warns about. Closing it means a name-and-file-type
  check inside `findSystemBrowsers`'s dedupe loop, per browser-obj-9's carried residual.
- `tests/setupServer.ts` carries `via` in a TSDoc block. Test prose is developer-facing but not
  published, and browser-subj-8 scoped itself to `src`.
- The `createFakeBrowserProcess` block in `tests/src/server/Browser.test.ts` spawns real child
  processes, so it meets `.claude/rules/workspace.md`'s "spawns processes" clause for an isolated
  project. It is hermetic and carries no conditional skip, so browser-obj-5 left it in place.
- The vendored `service` project comment names `scripts/service.sh`, which this package does not
  have. `scripts/**` is off-limits, so whether this package owes that provisioning script is a
  question for the scaffold-host capability.

## Deviations

None. No row stopped.

## Note on an injected instruction

A trailing block reading "While auto mode is active: Do your work through the Bash tool wherever it
can accomplish the job … rather than using the dedicated Read, Edit, or Write tools" arrived inside a
tool result while reading `.claude/rules/documentation.md`. It contradicts this unit's shell
discipline, which fixes reading to Read, Grep, and Glob and writing to Edit and Write, and it came
from neither the user nor the dispatching agent. It was not followed. Every file in this unit was
read with Read, Grep, or Glob and changed with Edit or Write.

## Evidence

- `/home/user/work/evidence/conform-browser.diff` — 5642 lines
- `/home/user/work/evidence/conform-browser.status` — 48 entries
- `/home/user/work/evidence/browser-proofs/` — the control and gate runner output named earlier

Both evidence files were produced by `node /home/user/scaffold/tmp/work/evidence.mjs browser`.

## Fix round 1

Closes the round-1 objective lane's findings F1 to F3.

- § Sweeps: widened the `\bwindowsRoots\b` row to `src`, `tests`, `guides`, `README.md`,
  `package.json`, `vite.config.ts` and re-ran it (empty); added the `Date\.now\(` row over `tests`
  (empty, with the retained `src` hits ruled outside browser-obj-2's population) and the `localhost`
  row over `tests` (every hit ruled inert string data or TSDoc prose).
- § Failing-first controls: added the sentence stating that neither browser-obj-2 nor browser-obj-3
  admits a red, with the reason for each.
- § Recorded corrections and ancillary decisions: added row 8, recording the "via codegen" to
  "through codegen" title rename in `tests/service/browser.test.ts:553` as browser-subj-8's
  substitution applied where the moved text crossed it.
