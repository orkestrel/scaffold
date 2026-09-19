Retained `Blueprint.setup: readonly SetupRuntime[]`, with `SetupRuntime = 'node' | 'browser'`, and `Blueprint.journey: boolean` from the checkpoint (`src/core/types.ts:223`, `:231`, `:235`). The runtime list represents the setup proofs without a separate presence flag. CLI construction uses an empty list; inference collects Node proofs and the exact-case browser proof (`src/bin/CLI.ts:236`, `:964`).

The journey wrapper is birth-owned and declares `readonly JourneyVariant[]`. Its seeds are `desktop` at 1280 × 800 and `compact` at 390 × 844, without themes. Its `test.projects` list maps each variant to a callback calling `appJourney(variant, VARIANTS)`. The root factory composes `appBrowser()`, replaces the journey include and exclusion, provides the variant name, variant list, and capture boolean, and sets the viewport. Capture reads `process.env.CAPTURE === '1'` in the root configuration.

The retained registration probe ran from `tmp/probe/s1-wrapper`:

```text
node ../../../node_modules/vitest/vitest.mjs run --config configs/app/vite.journey.config.ts --reporter=verbose
```

Exit `0`; `Test Files 2 passed (2)`; `Tests 2 passed (2)`. Vitest executed `journey:desktop` and `journey:compact` and delivered each provided variant. This proves wrapper registration in Node. No registration negative control ran. The staged generated-browser proof separately passed TypeScript checking and rejected a string viewport width. No browser launch ran.

The partial implementation emits these artifacts and scripts. References name the emitting source, not generated files committed to this checkout.

| Artifact or script | Source | Implemented behavior |
| --- | --- | --- |
| `vite.config.ts` | `src/core/templates.ts:352`; `src/core/compilers.ts:798`, `:879` | Emits `appJourney`, the ordinary browser project's journey exclusion, and the root capture reading when journey and browser application selections are enabled. |
| `configs/app/vite.journey.config.ts` | `src/core/templates.ts:843`; `src/core/compilers.ts:1067`; `src/core/constants.ts:367` | Emits the birth-owned variant wrapper. |
| `vite.config.ts` setup projects | `src/core/templates.ts:480`, `:495`; `src/core/compilers.ts:819`, `:823` | Selects Node `setup` and browser `setup:browser` from the runtime list. The Node template excludes `tests/setupBrowser.test.ts`; the browser template collects that exact path with Playwright and the shared/browser setup modules. |
| `configs/browsers.ts` | `src/core/templates.ts:1141`; `src/core/compilers.ts:922` | States the Chromium limit and its reopening condition. Browser setup selection also selects browser machinery. |
| `tests/setupBrowser.ts` | `src/core/compilers.ts:1211` | Emits the birth-owned setup seed when browser machinery is selected. No browser setup proof is generated. |
| `package.json` → `test:journey` | `src/core/compilers.ts:357` | `vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot` |
| `package.json` → `test:setup` | `src/core/compilers.ts:354` | Runs `--project setup` only for the Node setup runtime. |
| `package.json` → `test:setup:browser` | `src/core/compilers.ts:355` | Runs `--project setup:browser` only for the browser setup runtime. |
| `package.json` → `test` | `src/core/compilers.ts:322`, `:325` | Chains journey after application projects and chains the selected setup runtimes. |

The acceptance controls have these readings. Counts are measurements from the named commands.

| Control | Command | Before | After |
| --- | --- | --- | --- |
| S1-C1 | Core control command shown next | 1 failed | 1 passed |
| S1-C2 | Core control command shown next | 1 failed | 1 passed |
| S1-C3 | Core control command shown next | 1 failed | 1 passed, including staged typechecking and the invalid-width control |
| S1-C4 | Core control command shown next | 1 failed | 1 passed |
| S1-C5 | `npm.cmd run test:src:bin -- --testNamePattern 'infers journey and setup runtimes'` | 1 failed before inference assertions | No passing run; 1 failed at the registry prerequisite |
| S1-C6 | `npm.cmd run test:config -- --testNamePattern 'requires and validates every selected target wrapper'` | 1 failed: planted journey name rejected | 1 passed: planted wrapper loaded through the extended branch |

The core control command was identical for the red and green readings:

```text
npm.cmd run test:src:core -- --testNamePattern 'emits journey wiring|advises a journey selection|partitions root setup|typechecks journey variants'
```

The control cases are at `tests/src/core/compilers.test.ts:912`, `:934`, `:948`, `tests/src/core/templates.test.ts:1078`, `tests/src/bin/CLI.test.ts:1601`, and `tests/config.test.ts:432`. The S1-C5 failure does not establish that its inference assertions detect a defect: execution never reached them.

Every executed gate command returned the following readings. The wrapper probe's result appears earlier.

| Command | Exit | Totals or diagnostic |
| --- | --- | --- |
| Core control command, before implementation | `1` | `Test Files 2 failed \| 7 skipped (9)`; `Tests 4 failed \| 421 skipped (425)` |
| Core control command, after implementation | `0` | `Test Files 2 passed \| 7 skipped (9)`; `Tests 4 passed \| 421 skipped (425)` |
| S1-C5 command, every invocation | `1` | Each: `Test Files 1 failed \| 2 skipped (3)`; `Tests 1 failed \| 257 skipped (258)`. The diagnostic-bearing invocation reports `absent: FETCH: The registry named no release for @orkestrel/test.` |
| `npm.cmd run check` | `1` | Before CLI migration: TS2322 at `src/bin/CLI.ts:234` and `:966`, boolean not assignable to `readonly SetupRuntime[]`. No totals line. Not rerun after migration. |
| S1-C6 command, before branch change | `1` | `Test Files 1 failed (1)`; `Tests 1 failed \| 173 skipped (174)` |
| S1-C6 command, after branch change | `0` | `Test Files 1 passed (1)`; `Tests 1 passed \| 173 skipped (174)` |
| `npm.cmd run test:src:core` | `1` | `Snapshots 3 failed`; `Test Files 3 failed \| 6 passed (9)`; `Tests 6 failed \| 419 passed (425)` |
| `npm.cmd run test:src:bin -- --testNamePattern 'rejects wrong-case structural paths while deriving every exact fact'` | `1` | `Test Files 1 failed \| 2 skipped (3)`; `Tests 1 failed \| 257 skipped (258)` |

Scoped formatting and lint, full `test:src:bin`, full `test:config`, `test:guides`, and the observation commands `test:policy`, `test:setup`, and `npm.cmd test` were not run. No build, install, commit, or push ran.

The unit stopped under the brief's deviation contract. Expected: the required core and CLI projects pass while the manifest and lockfile remain off-limits. Found: the tarball install changes the compiler's own dependency input. `src/core/constants.ts:539` reads the `@orkestrel/test` range directly from `package.json`, whose value is `file:../test/tmp/pack/orkestrel-test-0.0.16.tgz`.

The exact core failures attributable to that value are:

- `keeps the browser application toolchain in an app-only workspace` at `tests/src/core/compilers.test.ts:449`: snapshot expects `^0.0.16`, receives the tarball path.
- `keeps a generated source workspace manifest byte-stable` at `tests/src/core/compilers.test.ts:508`: the same range mismatch.
- `registers and gates setup proofs only when the blueprint selects them` at `tests/src/core/compilers.test.ts:521`: the same range mismatch.
- `carries a full-triple caret on every foreign table row` at `tests/src/core/constants.test.ts:150`: receives `["base @orkestrel/test: file:../test/tmp/pack/orkestrel-test-0.0.16.tgz"]` instead of `[]`.

The CLI registry fixture at `tests/src/bin/CLI.test.ts:209` derives its published version by slicing the same range. The measured S1-C5 diagnostic is `FETCH: The registry named no release for @orkestrel/test.` The existing exact-case inference case also fails before its inference assertions. I left the manifest, lockfile, dependency table, and range assertions unchanged. Restoring the declared registry range while retaining the installed tarball requires an Orchestrator action on the off-limits manifest.

The core run also reports unfinished owned work: `createBlueprint defaults > clears every flag the caller omitted` still expects `false` for setup at `tests/src/core/factories.test.ts:33`. The root configuration parity case at `tests/src/core/compilers.test.ts:1315` differs because the emitted Node setup template includes the browser-proof exclusion while the off-limits root configuration does not.

Done: journey and setup compiler wiring, CLI migration, Chromium-limit template prose, targeted core controls, and the planted journey wrapper branch. Not done: rules and guide updates, default-test migration, configuration parity convergence, formatter/linter convergence, full acceptance gates, and observation runs. The partial tree is not ready for acceptance. The pre-existing manifest, lockfile, and campaign changes remain untouched by this unit.

The least-certain claims are the browser runtime behavior, which has only staged type evidence; CLI inference and birth preservation, whose test is blocked before its assertions; and browser-only setup machinery without a browser source/application axis, which was implemented but received no dedicated proof. The wrapper check covers the planted configuration shape and does not establish that every adopter variant is registered. No claim here establishes a passing final typecheck, formatting gate, lint gate, or guide parity gate.