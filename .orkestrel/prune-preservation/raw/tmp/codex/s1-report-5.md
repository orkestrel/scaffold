Retained `Blueprint.setup: readonly SetupRuntime[]`, where `SetupRuntime = 'node' | 'browser'`, and `Blueprint.journey: boolean` (`src/core/types.ts:223`, `:231`, `:235`). The runtime list represents the required setup runtimes without a separate presence flag. Exact-case `tests/setupBrowser.test.ts` selects `browser`; other exact-case root `tests/setup*.test.ts` paths select `node`. The default is an empty list.

Retained the birth-owned `configs/app/vite.journey.config.ts` wrapper. Its `readonly JourneyVariant[]` seeds `desktop` at 1280 × 800 and `compact` at 390 × 844 without themes. Its `test.projects` maps each variant to a callback calling `appJourney(variant, VARIANTS)`. The content-owned root factory replaces the ordinary browser project's journey fields, sets the viewport, and provides the variant name, the variant list, and the capture boolean. The root reads `process.env.CAPTURE === '1'`.

The registration probe ran again from `tmp/probe/s1-wrapper`:

```text
node ../../../node_modules/vitest/vitest.mjs run --config configs/app/vite.journey.config.ts --reporter=verbose
```

Exit `0`; `Test Files 2 passed (2)`; `Tests 2 passed (2)`. Vitest executed `journey:desktop` and `journey:compact`, and each received its provided variant. This probe settles wrapper-owned project registration in Node. It uses a minimal Node factory, not the emitted browser root, and has no registration negative control. S1-C3 separately typechecks the materialized generated configurations and rejects a string viewport width. No browser launch ran.

The unit emits the following artifacts and scripts. References identify the emitting source.

| Artifact or script | File and line | Behavior |
| --- | --- | --- |
| `vite.config.ts` journey factory | `src/core/templates.ts:352`; `src/core/compilers.ts:809`, `:925` | Emits `appJourney(variant, variants)` for an enabled browser application. |
| `vite.config.ts` ordinary browser exclusion | `src/core/templates.ts:337`; `src/core/compilers.ts:810` | Excludes `tests/app/browser/integration.test.ts` when journey is enabled. |
| `vite.config.ts` capture value | `src/core/compilers.ts:894` | Reads the capture flag in the root and provides a boolean. |
| `configs/app/vite.journey.config.ts` | `src/core/templates.ts:844`; `src/core/compilers.ts:1084` | Emits the birth-owned variant list and wrapper project registration. |
| `vite.config.ts` Node setup project | `src/core/templates.ts:480`; `src/core/compilers.ts:829` | Collects root setup proofs while excluding the browser proof. |
| `vite.config.ts` browser setup project | `src/core/templates.ts:495`; `src/core/compilers.ts:833` | Collects exactly `tests/setupBrowser.test.ts`, enables Playwright Chromium, and loads the shared and browser setup modules. |
| `configs/browsers.ts` | `src/core/compilers.ts:937`; `src/core/templates.ts:1141` | Emits browser resolution and states the Chromium limit and reopening condition. Browser setup selection also selects this machinery. |
| `tests/setupBrowser.ts` | `src/core/compilers.ts:1228` | Emits the birth-owned setup seed when browser machinery is selected. Generates no browser setup proof. |
| `package.json` → `test:journey` | `src/core/compilers.ts:360` | `vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot` |
| `package.json` → `test:setup` | `src/core/compilers.ts:356` | Runs the Node `setup` project when selected. |
| `package.json` → `test:setup:browser` | `src/core/compilers.ts:358` | Runs the browser `setup:browser` project when selected. |
| `package.json` → `test` | `src/core/compilers.ts:324`, `:327`, `:328` | Chains journey after application projects and invokes the selected setup scripts. |

The controls have the following readings. The S1-C1–S1-C4 and S1-C6 red readings are retained evidence from `tmp/codex/s1-report-4.md`; this execution reran their green commands. S1-C5 received a fresh mutation reading after the manifest-range restoration.

| Control | Command | Before | After |
| --- | --- | --- | --- |
| S1-C1 | Core control command following this table | `1 failed` in the predecessor run | `1 passed` |
| S1-C2 | Core control command following this table | `1 failed` in the predecessor run | `1 passed` |
| S1-C3 | Core control command following this table | `1 failed` in the predecessor run | `1 passed`, including the staged typecheck and invalid-width control |
| S1-C4 | Core control command following this table | `1 failed` in the predecessor run | `1 passed` |
| S1-C5 | `npm.cmd run test:src:bin -- --testNamePattern 'infers journey and setup runtimes'` | `1 failed` with the exact-case guard removed from journey inference | `1 passed` after restoring the guard |
| S1-C6 | `npm.cmd run test:config -- --testNamePattern 'requires and validates every selected target wrapper'` | `1 failed` in the predecessor run, rejecting the planted journey wrapper | `1 passed` after assertion restructuring |

The core control command is:

```text
npm.cmd run test:src:core -- --testNamePattern 'emits journey wiring|advises a journey selection|partitions root setup|typechecks journey variants'
```

Its predecessor red result was `Tests 4 failed | 421 skipped (425)`. Its result in this execution was `Tests 4 passed | 421 skipped (425)`, exit `0`. The cases are at `tests/src/core/compilers.test.ts:912`, `:940`, `:955`, and `tests/src/core/templates.test.ts:1078`.

The S1-C5 mutation changed journey inference to accept a resolved path without checking that an exact-case file existed. The named test failed at its assertion on the emitted `appJourney` factory, rather than at the registry prerequisite. The mutation was restored; `src/bin/CLI.ts` has no final diff. The passing test also exercises setup runtime inference and preservation of adopter wrapper content.

The scoped formatter and linter commands used this explicit population:

```text
.\node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --check src/core/types.ts src/core/constants.ts src/core/validators.ts src/core/factories.ts src/core/templates.ts src/core/compilers.ts src/core/helpers.ts src/bin/CLI.ts tests/setup.ts tests/src/core tests/src/bin tests/config.test.ts vite.config.ts .claude/rules/tests.md .claude/rules/workspace.md guides/scaffold.md guides/README.md

.\node_modules\.bin\oxlint.cmd --config .oxlintrc.json --deny-warnings src/core/types.ts src/core/constants.ts src/core/validators.ts src/core/factories.ts src/core/templates.ts src/core/compilers.ts src/core/helpers.ts src/bin/CLI.ts tests/setup.ts tests/src/core tests/src/bin tests/config.test.ts vite.config.ts .claude/rules/tests.md .claude/rules/workspace.md guides/scaffold.md guides/README.md
```

Every gate command executed in this round has the following result. Measurements are from this Windows checkout on 2026-09-17. Repeated unchanged readings are grouped.

| Command | Exit | Totals line or diagnostic |
| --- | --- | --- |
| `npm.cmd run test:src:core -- --testNamePattern 'createBlueprint defaults\|keeps the root configuration'`, before correction | `1` | `Test Files 1 failed \| 8 skipped (9)`; `Tests 1 failed \| 3 passed \| 421 skipped (425)`. Only the default cases matched. |
| Same default command, after correction | `0` | `Test Files 1 passed \| 8 skipped (9)`; `Tests 4 passed \| 421 skipped (425)` |
| `npm.cmd run test:src:core -- --testNamePattern 'keeps this repository byte-identical'`, before correction | `1` | `Test Files 1 failed \| 8 skipped (9)`; `Tests 1 failed \| 424 skipped (425)` |
| Same configuration-parity command, after correction | `0` | `Test Files 1 passed \| 8 skipped (9)`; `Tests 1 passed \| 424 skipped (425)` |
| Core control command | `0` | `Test Files 2 passed \| 7 skipped (9)`; `Tests 4 passed \| 421 skipped (425)` |
| S1-C5 command, baseline, restored, and final readings | `0` | Each: `Test Files 1 passed \| 2 skipped (3)`; `Tests 1 passed \| 257 skipped (258)` |
| S1-C5 command, mutation | `1` | `Test Files 1 failed \| 2 skipped (3)`; `Tests 1 failed \| 257 skipped (258)` |
| S1-C6 command | `0` | `Test Files 1 passed (1)`; `Tests 1 passed \| 173 skipped (174)` |
| `npm.cmd run check`, before and after test restructuring | `0` | Root, core, server, and bin typechecks completed. No totals line. |
| Scoped formatter check, before convergence | `1` | `Format issues found in above 7 files.` |
| Scoped formatter check, after convergence and final reading | `0` | `All matched files use the correct format.` |
| Scoped linter, before convergence | `1` | `vitest(no-conditional-expect)` in `tests/config.test.ts` and `tests/src/bin/CLI.test.ts`. No totals line. |
| Scoped linter, after convergence and final reading | `0` | No diagnostics or totals line. |
| `npm.cmd run test:src:core` | `0` | `Test Files 9 passed (9)`; `Tests 425 passed (425)` |
| `npm.cmd run test:src:bin` | `1` | `Test Files 1 failed \| 2 passed (3)`; `Tests 5 failed \| 253 passed (258)` |
| `npm.cmd run test:config` | `1` | `Test Files 1 failed (1)`; `Tests 1 failed \| 172 passed \| 1 skipped (174)` |
| `npm.cmd run test:guides`, before documentation | `1` | `Test Files 1 failed (1)`; `Tests 1 failed \| 22 passed (23)` |
| `npm.cmd run test:guides`, after documentation and final reading | `0` | Each: `Test Files 1 passed (1)`; `Tests 23 passed (23)` |
| `npm.cmd run test:policy` | `0` | `Test Files 1 passed (1)`; `Tests 110 passed (110)` |
| `npm.cmd run test:setup` | `1` | `Test Files 1 failed \| 2 passed (3)`; `Tests 1 failed \| 160 passed \| 3 skipped (164)` |
| `npm.cmd test` | `1` | Core: `Test Files 9 passed (9)`; `Tests 425 passed (425)`. Server: `Test Files 1 failed \| 4 passed (5)`; `Tests 1 failed \| 465 passed \| 7 skipped (473)`. The chain stopped at server. |
| `git diff --check` | `0` | No diagnostics. |

Scoped formatting converged with this command, exit `0`, reporting `Finished in 687ms on 7 files using 16 threads.`:

```text
.\node_modules\.bin\oxfmt.cmd --config .oxfmtrc.json --write .claude/rules/workspace.md guides/scaffold.md src/core/compilers.ts tests/config.test.ts tests/src/bin/CLI.test.ts tests/src/core/compilers.test.ts tests/src/core/templates.test.ts
```

The `�|Ã|Â|â€` text-integrity search over the final changed files returned no matches. No tree-wide formatter, mutating linter, build, install, commit, or push ran. The manifest and lockfile remain unchanged.

Completed: the test-project rules, guide descriptions and surface parity, default expectation migration, the root configuration's browser-proof exclusion, scoped formatting and lint convergence, and the requested measurements. The root configuration diff contains only the emitted exclusion. The conditional journey assertions retain their checks outside selection branches; adopter-content preservation is asserted after collection.

Acceptance remains incomplete. Expected: the required projects exit `0`. Found: inventory-dependent gates read the off-limits `host.json` baseline after owned vendored bytes changed. The brief reserves regeneration for the Orchestrator and treats these inventory readings as observations. No inventory bytes were rewritten.

The exact inventory and CLI failures are:

- `tests/config.test.ts:763`, `keeps the committed host inventory aligned with the vendored checkout bytes`: `The committed host inventory is stale at .claude/rules/tests.md, .claude/rules/workspace.md, guides/README.md, guides/scaffold.md, tests/config.test.ts`.
- `tests/src/bin/CLI.test.ts:693`, `takes the host live when every declared digest matches and takes the floor when the repository is dark`: `The vendored host cannot read the declared file at .claude/rules/tests.md`.
- `tests/src/bin/CLI.test.ts:766`, `asks the repository for no canon path while fetching a drifted vendored one`: the same host-read refusal.
- `tests/src/bin/CLI.test.ts:822`, `writes the same distributed new baseline when transport forces it and when offline selects it`: expected exit `0`, received `1`.
- `tests/src/bin/CLI.test.ts:897`, `makes offline audit answer drift alone and offline repair match a forced floor write`: expected floor provenance, received `undefined`.
- `tests/src/bin/CLI.test.ts:971`, `runs the overwrite floor half offline and refuses its catalog half`: expected floor provenance, received `undefined`.
- The whole test chain's `tests/src/server/helpers.test.ts:1619`, `reads the default host floor and hydrates as the default materializer does`: `The vendored host cannot read the declared file at .claude/rules/tests.md`.

Hypothesis: the stale inventory also causes the CLI exit and provenance mismatches. Regeneration and an Orchestrator gate run must settle that attribution.

The setup observation has a separate unfinished consumer: `tests/setup.test.ts:48`, `buildBlueprint > returns the minimal published workspace and replaces only the fields the caller names`, expects `base.setup` to be `false` and receives `[]`. That file is outside this brief's owned paths. It remains unchanged and needs an authorized expectation migration. No requirement was hidden by skipping or weakening its proof.

The least-certain claims remain actual browser execution and capture behavior: the generated browser configuration received staged typechecking, while the registration probe ran in Node. The wrapper probe has no negative registration control. The assertion that all CLI floor failures disappear after inventory regeneration remains a hypothesis. The full acceptance suite is not green, and no post-build or published-artifact claim is made.