Foundation-fix-5 is incomplete. The benchmark passed; the implementation is written but unformatted and unverified. Execution stopped when automatic approval review rejected probe cleanup. No acceptance gate passed or failed because none started.

**Files changed by this unit.** The implementation changes are confined to the owned paths:

- `vite.config.ts` and `package.json`.
- `configs/src/vite.bootstrap.config.ts`, `configs/src/vite.tailwindcss.config.ts`, and `configs/src/vite.styles.config.ts`.
- `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupStyles.ts`, and `tests/setupBrowser.test.ts`.
- `tests/setupServer.ts`, `tests/setupServer.test.ts`, and `tests/conformance.test.ts`.
- `tests/src/bootstrap/index.test.ts`, `tests/src/tailwindcss/index.test.ts`, and `tests/src/styles/index.test.ts`.
- `tests/config.test.ts`.
- `tests/fixtures/styles/adjacent.css`, `compiled.scss`, `instrument.css`, `layered.css`, `lossy.css`, `placement.css`, `plain.css`, and `reduced.css`.

The Bootstrap build also regenerated its ignored `dist/src/bootstrap` output. Unit scripts, measurements, logs, and this report reside under `tmp/units/foundation-fix-5-*`. Generated benchmark files remain under `tmp/probes/foundation-fix-5`.

`tests/setupBrowser.ts` was read but not changed. Shared and off-limits files were not edited. The initial working tree already contained changes outside this unit's ownership; those remain. Consequently, the full `git status --porcelain` output does not list only owned files. No commit or package installation was performed.

**Benchmark and settings.** These measurements ran on the supplied Windows host on 2026-09-30 with installed Vitest 4.1.11. Wall time includes the child process's startup and shutdown.

| Setting | Files | Wall time | Run count | Exit | Tests |
| --- | ---: | ---: | ---: | ---: | ---: |
| Chromium, default isolation, serial files | 120 | 13.4836 s | 1 | 0 | 120 passed |
| Chromium, `isolate: false`, serial files | 120 | 5.8511 s | 1 | 0 | 120 passed |
| Node, `pool: 'threads'`, `isolate: false`, serial files | 120 | 1.4796 s | 1 | 0 | 120 passed |

The threshold declared before execution was a 10× improvement or evidence that disabled isolation is necessary to share one module instance across the project. The timing difference did not reach that threshold. The shared-module instrument reached 120 uses in the non-isolated browser run and remained at 1 in every isolated file. Each browser run reported one transformation apiece for the built Bootstrap `?raw` import, installed Bootstrap `?raw` import, and fixture `?inline` import.

The authored `src:bootstrap`, `src:tailwindcss`, and `src:styles` configurations adopt `isolate: false` for module reuse, retain serial files from `srcBrowser`, and record the readings in their wrapper comments. The authored Node `setup` and `conformance` projects use threads with disabled isolation. `setup:browser` keeps default isolation because its proof occupies one file.

The browser load included the full installed Bootstrap sheet in addition to the built foundation sheet and fixture. This avoided measuring the foundation skeleton alone. Every browser file adopted the combined text into a constructable sheet, checked a real fixture rule and a rule-count floor, and refused an absent planted selector. Node files read the corresponding texts through `loadSheet`.

Limits: the temporary benchmark configuration reused `srcBrowser` but omitted setup files; it did not measure the completed wrappers. Transformation counts and the shared-module instrument establish transform reuse and module lifetime, not an operating-system file-read count. Browser parsing and adoption also do more work than the Node text assertions, so these times do not isolate runner overhead.

**Shared composition and propagation.** The authored `sheetProject` factory takes the browser provider and serial-file setting from `srcBrowser`, supplies the style setup modules, and merges each face's own build and test configuration. It does not inherit the source-browser build plugins or include pattern. This avoids `mergeOverride` concatenating unrelated includes and avoids another Playwright provider block.

The propagation list includes the hand edits to scaffold-owned root `vite.config.ts`: `sheetProject`, `setupBrowser`, `conformance`, their applicable project registrations, and the Node setup pool settings. `tests/config.test.ts` also carries unit-specific edits that require preservation or propagation when scaffold repair replaces that file. No scaffold checkout file was changed.

**Helpers and installed capabilities.** The scaffold test guide's Surface section, installed `@orkestrel/test` declarations, and fleet guide names were inspected. No matching fleet claim was found for the declared helper names.

| Helper | Installed export checked | Distinction or reuse |
| --- | --- | --- |
| `collectRootNames` | `collect`, `requireValue` | Moves the existing Bootstrap root-token extractor into host-independent setup; reuses `requireValue`. |
| `collectLeaves` | `collect`, `requireValue` | Moves the existing finite registry walker; async collection does not return registry paths. |
| `adoptSheet` | `mount`, `render`, `createTeardown` | Owns a constructable stylesheet and release operation; tests reuse `createTeardown` for cleanup. |
| `scanSheetRules` | `findRule` | Returns an ordered sheet traversal with layer and condition ancestry; selector lookup does not. |
| `readLayerNames` | `findRule`, `readLayers` | Reads cascade-layer declarations; installed `readLayers(element)` returns color layers. |
| `flattenRules` | `findRule`, `readStyle` | Produces an ordered declaration sequence with grouping context and adjacent merging. |
| `readPlacement` | `findRule`, `readStyle` | Reports declaration importance and layer membership. |
| `roundTrip` | `roundTripJSON`; Sass `compileString` | Composes the required CSS syntax and compressed-output options; JSON round-trip semantics differ. |
| `compileLayered` | Sass `compile` | Resolves a workspace entry and fixes expanded output for comparison with Vite. |

`compileDropIn` was not declared because link 1 remains roadmap work. Existing Node loader helpers remain in `setupServer.ts`. The CSSOM-loss pair and the changed-value, importance, order, and media controls are written into the helper proofs but have not executed. The conformance proof contains the version pin, SHA-256 pin `4a50207b956a4ab943640ee993118b554a34e96a23261cfe58b9aa1807a7849b`, its one-byte scratch control, link 2 and its appended-rule control, and the link 1 todo.

**Commands and results.** Execution and verification commands have these outcomes:

| Command | Exit | Test count |
| --- | --- | --- |
| `git status --porcelain` before and after changes | 0 each | none |
| `npm run build:src:bootstrap` before benchmarking | 0 | none |
| `node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/units/foundation-fix-5-benchmark.log --errors tmp/units/foundation-fix-5-benchmark.err --cap 390 -- node tmp/units/foundation-fix-5-benchmark.ts` | 0 | 360 passed across the benchmark runs |
| `node node_modules/vitest/vitest.mjs run --config tmp/probes/foundation-fix-5/vite.config.ts --no-cache --reporter=dot` for each benchmark setting | 0 each | 120 passed each |
| `node tmp/units/foundation-fix-5-edit.ts` | 0 | none |
| `node tmp/units/foundation-fix-5-faces.ts` | 0 | none |
| `Get-FileHash node_modules/bootstrap/dist/css/bootstrap.css -Algorithm SHA256` | 0 | none |
| `git diff --stat` and the scoped `git diff` | 0 each | none |
| `Resolve-Path -LiteralPath 'C:/Users/mikes/WebstormProjects/veneer/tmp/probes/foundation-fix-5'` | 0 | none |
| `Remove-Item -LiteralPath 'C:/Users/mikes/WebstormProjects/veneer/tmp/probes/foundation-fix-5' -Recurse -Force` | Rejected before execution; no process exit code | none |
| Scoped `npx oxfmt --config .oxfmtrc.json --write` | Not started | none |
| `npx tsc --noEmit --project tsconfig.json` | Not started | none |
| Brief-specified scoped `npx oxlint --config .oxlintrc.json` | Not started | none |
| `npm run test:setup` | Not started | none |
| `npm run test:setup:browser` | Not started | none |
| `npm run test:conformance` | Not started | none |
| `npm run test:src:bootstrap` | Not started | none |
| `npm run test:src:tailwindcss` | Not started | none |
| `npm run test:src:styles` | Not started | none |
| `npm run test:config` | Not started | none |
| `npm run test:policy` | Not started | none |
| Scoped `npx oxfmt --config .oxfmtrc.json --check` | Not started | none |

The rejected cleanup was the first awaited call in the tool batch containing formatting and typechecking, so neither later call executed. Tree-wide test, build, lint, and format commands were not run.

**Probes and deletion.** The generated directory contains 120 load test files plus `fixture.css`, `hot.ts`, and the temporary Vite configuration: 123 files observed after rejection. Deletion is not done. The benchmark JSON and complete logs remain under `tmp/units/foundation-fix-5-*`. The absent-selector control was repeated in each load file instead of occupying a separate control-only file.

**Deviations.** The required stop report is:

- Expected: remove the generated probe directory, then execute formatting and the prescribed gates.
- Found: the cleanup tool call was rejected with `blocked by policy` despite the resolved path being inside the checkout's `tmp/probes` directory.
- Evidence: the tool returned `CreateProcess ... Rejected(...)`; a subsequent read counted 123 files remaining.
- Done: benchmark, scoped implementation edits, fixtures, draft proofs, configuration wiring, and report.
- Not done: cleanup, formatting, typechecking, linting, helper certification, final project runs, and acceptance.
- Hypothesis: the automatic command policy rejected the recursive deletion form; the tool supplied no narrower reason.

The [orkestrel-dispatch skill](C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-dispatch/SKILL.md) applies the [orchestration permission floor](C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md): “When a sandbox rejects a write, the unit stops and reports the rejection. It never tries another write mechanism.” No alternate deletion mechanism was attempted.

Additional deviations: the config census groups existing journey viewport repetitions by wrapper and mode, so its authored assertion measures one logical owner rather than literally one project instance for those existing journeys. The benchmark used a temporary configuration instead of temporarily altering a face wrapper. The existing out-of-scope dirty tree was preserved. Other deviations: none identified before the stop.

Automatic approval review rejected deletion of `tmp/probes/foundation-fix-5`; its stated reason was “blocked by policy.”
