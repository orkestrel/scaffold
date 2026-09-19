# S1 report — stopped on a missing runtime dependency

## Chosen shapes and wrapper probe

Chose `Blueprint.setup: readonly SetupRuntime[]`, where `SetupRuntime = 'node' | 'browser'`, and `Blueprint.journey: boolean`. The runtime list represents generic/server proofs and browser proofs without a redundant presence flag. The contract is at `src/core/types.ts:223`, `:231`, and `:235`. Defaults and validation were updated at `src/core/factories.ts:64`, `:72`, and `src/core/validators.ts:294`, `:302`.

Chose a birth-owned `configs/app/vite.journey.config.ts` wrapper that registers variant project factories through its own `test.projects` list. The intended seed names are `desktop` and `compact`; viewport sizes were not settled before the stop.

The registration probe is `tmp/probe/s1-wrapper/configs/app/vite.journey.config.ts`, importing its factory from `tmp/probe/s1-wrapper/vite.config.ts`. From `tmp/probe/s1-wrapper`, the command was:

```text
node ../../../node_modules/vitest/vitest.mjs run --config configs/app/vite.journey.config.ts --reporter=verbose
```

Exit `0`; totals: `Test Files 2 passed (2)` and `Tests 2 passed (2)`. Vitest executed `journey:desktop` and `journey:compact`, and each received its provided variant. This establishes wrapper registration in Node. It does not establish generated browser configuration loading, viewport behavior, or a browser launch. No negative control was run for this exploratory probe.

## Emitted artifacts and scripts

No requested artifact or script was implemented. There is no emitted journey wrapper, `appJourney` factory, `test:journey` script, `setup:browser` project, or `test:setup:browser` script to cite.

The partial edits are the contract, factory defaults, validator, and blueprint fixture consumers:

- `src/core/types.ts:191` documents the intended axes; `:223` changes the setup contract; `:231` adds the journey axis; `:235` declares the runtime union.
- `src/core/factories.ts:64` defaults setup to `[]`; `:72` defaults journey to `false`.
- `src/core/validators.ts:294` validates setup runtime membership; `:302` validates journey.
- `tests/setup.ts:175` updates the example; `:191` and `:199` update fixture defaults.
- `tests/src/core/compilers.test.ts:362`, `:514`, `:515`, `:945`, and `:1236` use runtime-list inputs.
- `tests/src/bin/CLI.test.ts:1663`, `:2718`, and `:2750` use runtime-list inputs.

The CLI and compiler runtime consumers remain unchanged. The CLI still supplies booleans, and the compiler still checks setup by truthiness. These partial edits are not a working implementation. The rules, guide, templates, and wrapper walk remain unchanged. The pre-existing manifest and lockfile changes were not edited.

## Controls

The control readings are incomplete:

| Control | Command and reading | Before | After |
| --- | --- | --- | --- |
| S1-C1 | Not run; emitted journey behavior is not implemented. | Not measured | Not measured |
| S1-C2 | Not run; absent-browser advisory is not implemented. | Not measured | Not measured |
| S1-C3 | `npm.cmd run test:probe -- tmp/probe/s1-browser-load.test.ts` tested the prerequisite of loading a materialized browser root. Exit `1`; `Tests 1 failed (1)`. This is not the complete control. | 1 prerequisite failure | No passing run |
| S1-C4 | Not run; setup runtime projects are not implemented. | Not measured | Not measured |
| S1-C5 | Not run; CLI inference is not implemented. | Not measured | Not measured |
| S1-C6 | Not run; the vendored wrapper walk is unchanged. | Not measured | Not measured |

## Gate commands and results

The executed checks and probes returned these results:

| Command | Exit code | Totals or diagnostic |
| --- | --- | --- |
| `npm.cmd run check:src:core`, immediately after the type edit | Not retained in the displayed tool output | TS2322 at `src/core/validators.ts:280`: the guard lacked the required `journey` member. No totals line. |
| `npm.cmd run check:src:core`, after default and validator edits | `0` | No diagnostics or totals line. |
| `npm.cmd run check` | `1` | TS2322 at `src/bin/CLI.ts:234` and `:966`: `boolean` is not assignable to `readonly SetupRuntime[]`. No totals line. |
| Wrapper command shown earlier, initial run and confirmation run | Confirmation exit `0`; initial exit was not retained in the displayed output | Each run: `Test Files 2 passed (2)`; `Tests 2 passed (2)`. |
| `npm.cmd run test:probe -- tmp/probe/s1-browser-load.test.ts` | `1` | `Test Files 1 failed (1)`; `Tests 1 failed (1)`. |

Scoped formatting and lint checks, `test:src:core`, `test:src:bin`, `test:config`, and `test:guides` were not run. The observation commands `test:policy`, `test:setup`, and `npm.cmd test` were not run. No build, install, commit, or push ran.

## Unclosed work and deviation

Expected: S1-C3 loads the materialized browser application configuration through the real `loadConfigFromFile` function before inspecting its registered projects.

Found: the generated root imports `@vitejs/plugin-vue`, but that package is absent from this checkout. `Test-Path node_modules/@vitejs/plugin-vue` returned `False`. The real load in `tmp/probe/s1-browser-load.test.ts` failed with:

```text
Error: Cannot find package '@vitejs/plugin-vue' imported from C:\Users\mikes\WebstormProjects\scaffold\node_modules\.vite-temp\vite.config.ts.timestamp-1789671510716-5093a8ac788988.mjs
Serialized Error: { code: 'ERR_MODULE_NOT_FOUND' }
```

The brief prohibits installs and places `package.json` and `package-lock.json` off-limits. Its deviation contract requires stopping when a criterion needs an off-limits change. The existing ambient plugin declaration in `tests/src/core/templates.test.ts:43` supports typechecking but cannot satisfy this runtime import. No substitute plugin, module replacement, or altered generated import was introduced.

Done: wrapper registration probe, setup/journey contract edits, default and validation edits, and fixture input migration. Not done: journey generation, setup runtime wiring and inference, engine-limit documentation, rule and guide changes, acceptance controls, and passing gates. The Orchestrator must provision the real browser configuration dependency before a successor can close the runtime-loading criterion.

## Least-certain claims

- The wrapper result covers Node project registration only. The generated browser variant configuration remains unproved.
- Provisioning `@vitejs/plugin-vue` is necessary for the measured import, but this run does not establish that it is sufficient. Loading stopped at that missing package.
- The selected setup shape has not passed the full consumer migration or guide parity. The checkout remains incomplete and fails `npm.cmd run check`.