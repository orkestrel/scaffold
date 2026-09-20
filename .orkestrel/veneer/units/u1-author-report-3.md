U1-author stopped under the amended deviation contract. The styles axis builds and its browser proof passes, but the vendored policy rejects the required styles entry. The theme step also conflicts with fleet ownership of public names. The assignment is incomplete.

The measurements below were taken on Windows at `a5de4c4` on 2026-09-20. Browser tests used the configured default Chromium provider.

The baseline measurements, taken before editing, were:

| Command | Exit | Result lines |
| --- | --- | --- |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` |
| `npm.cmd run check` | 1 | `error TS5058: The specified path does not exist: 'configs/src/tsconfig.styles.json'.` |
| `npm.cmd run test:src` | 0 | `Test Files  2 passed (2)`; `Tests  2 passed (2)` |
| `npm.cmd run test:app` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)` |
| `npm.cmd run test:policy` | 0 | `Test Files  1 passed (1)`; `Tests  109 passed \| 1 skipped (110)` |
| `npm.cmd run test:config` | 0 | `Test Files  1 passed (1)`; `Tests  173 passed \| 1 skipped (174)` |
| `npm.cmd run test:conformance` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)` |
| `npm.cmd run test:guides` | 1 | `Test Files  1 failed (1)`; `Tests  4 failed \| 13 passed (17)` |
| `npm.cmd run test:setup:browser` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)` |
| `npm.cmd run test:setup` | 0 | `Test Files  1 passed (1)`; `Tests  4 passed (4)` |
| `npm.cmd run test:journey` | 1 | `No test files found, exiting with code 1` |

The guide findings were:

```text
guides/veneer.md has no ## Methods section.
guides/veneer.md has no ## Tests section.
guides/veneer.md has no documented method groups.
guides/veneer.md has no mapped self import.
guides/veneer.md has no links.
guides/veneer.md has no test links.
```

The journey command collected no file for `journey:light-1280`, `journey:dark-1280`, `journey:light-390`, or `journey:dark-390`. The baseline browser projects that collected tests launched successfully.

The created files are:

- `configs/src/tsconfig.styles.json`
- `configs/src/vite.styles.config.ts`
- `src/styles/index.ts`
- `src/styles/index.scss`
- `src/styles/_tokens.scss`
- `src/styles/_theme.scss`
- `src/styles/_mixins.scss`
- `tests/setupStyles.ts`
- `tests/setupStyles.test.ts`
- `tests/src/styles/index.test.ts`

The overwritten file is `tmp/codex/u1-author-report.md`. No existing tracked file was changed.

The readings after the styles changes were:

| Command | Exit | Result lines |
| --- | --- | --- |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.`; `Finished in 724ms on 54 files using 16 threads.` |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` |
| `npm.cmd run check` | 0 | `npm notice run @orkestrel/veneer@0.0.1 check:app:browser`; `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` |
| `npm.cmd run test:src:styles` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)`; `Duration  1.02s (transform 0ms, setup 15ms, import 5ms, tests 3ms, environment 0ms)` |
| `npm.cmd run test:setup` | 0 | `Test Files  2 passed (2)`; `Tests  6 passed (6)`; `Duration  224ms (transform 50ms, setup 25ms, import 80ms, tests 9ms, environment 0ms)` |
| `npm.cmd run test:policy` | 1 | `Test Files  1 failed (1)`; `Tests  1 failed \| 108 passed \| 1 skipped (110)`; `Duration  1.92s (transform 92ms, setup 16ms, import 264ms, tests 1.49s, environment 0ms)` |
| `npm.cmd run test:config` | 0 | `Test Files  1 passed (1)`; `Tests  173 passed \| 1 skipped (174)`; `Duration  3.49s (transform 215ms, setup 16ms, import 872ms, tests 2.45s, environment 0ms)` |

The styles command ran `npm run build:src:styles` before its browser test. The successful build reported:

```text
dist/src/styles/index.css      0.06 kB │ gzip: 0.08 kB
dist/src/styles/index.rtl.css  0.06 kB │ gzip: 0.08 kB
dist/src/styles/index.js       0.00 kB │ gzip: 0.02 kB

✓ built in 173ms
```

The full `npm.cmd run build` command was not run. After editing, `test:src`, `test:app`, `test:journey`, `test:setup:browser`, `test:conformance`, and `test:guides` were not rerun. Distribution, release-mode distribution, Edge journeys, and captures were not run. No final acceptance is claimed.

The blocking deviations are:

- **Styles entry policy.** Expected: `src/styles/index.ts` contains only `import './index.scss'`, as brief 1 and Scaffold's workspace rule require. Found: the vendored surface instrument treats that entry as a public barrel. Exact evidence: `npm.cmd run test:policy` fails `repository policy > enforces the workspace policy laws including surface ownership` at `tests/policy.test.ts:758` with the finding below. Done: implemented and proved the styles build, loaded cascade, layer order, setup exports, and output existence. Not done: policy repair. Changing `tests/setupPolicy.ts` or `tests/policy.test.ts` is off-limits; replacing the required import would violate the brief. The owning Scaffold instrument needs correction.
- **Theme public names.** Expected: declare `Theme`, `ThemeOptions`, and `createTheme` as brief 2 requires. Found: `../scaffold/.claude/rules/names.md`, “Fleet name ownership,” requires: “Give every bare exported name one owning package across the `@orkestrel` fleet.” The installed `node_modules/@orkestrel/scaffold/dist/host/guides/console.md:64`, `:65`, and `:68` claim `Theme`, `ThemeOptions`, and `createTheme`, respectively. The console contracts describe terminal style vocabulary, not a DOM color-mode controller. The installed hosted `guides/veneer.md` does not exist, so no Veneer grandfather claim is present. Done: checked the ownership evidence before declaring those names. Not done: theme implementation or renaming. This is a declaration conflict, not the filename conflict brief 3 authorizes correcting. No gate failure for the unimplemented theme names is claimed. A successor brief must reconcile the required public names with fleet ownership.

The exact executed policy failure is:

```text
FAIL  |policy| tests/policy.test.ts > repository policy > enforces the workspace policy laws including surface ownership
AssertionError: expected [ { rule: 'surface', …(3) } ] to deeply equal []

- Expected
+ Received

- []
+ [
+   {
+     "line": 1,
+     "message": "surface population incomplete: barrel requires a relative .js star export on one line",
+     "path": "src/styles/index.ts",
+     "rule": "surface",
+   },
+ ]
```

The corrected build deviation is:

- Expected: emit RTL CSS from the generated CSS asset. Found: the initial plugin ran before CSS emission. Exact red output from `npm.cmd run test:src:styles`: `[plugin veneer-logical-rtl]` followed by `Error: The styles build emitted no index.css`; exit 1. Done: added `enforce: 'post'` to the plugin and reran the same command successfully, as recorded in the gate table. No hypothesis remains.

The implementation decisions and unknowns are:

| Item | Reading |
| --- | --- |
| RTL mechanism | One Vite library build emits `index.css`; a post plugin emits the same bytes as `index.rtl.css`. The shipped cascade contains only layer order, so no physical declaration needs flipping. This does not claim a general physical-property transformer. |
| `vue-tsc` unknown | The existing app scope passes after adding the styles configuration. The requested reading with a journey importing `@orkestrel/test/browser` remains unanswered because that journey was not authored. |
| App alias used to reach the engine | None. The engine and its consumer were not implemented. The root paths declaration includes `@src/browser`. |
| Placement corrections | None made. Brief 3's `validators.ts` correction is accepted; implementation did not reach that file. |
| Shared-file patch | None proposed. No `package.json` change is needed for the completed styles work; its existing styles script runs successfully. |
| Remaining implementation | Theme engine, shell, browser helpers, journeys, entry proofs, boundary controls, distribution extension, and guides remain unimplemented. |
| Dependency advisories | No dependency range or lockfile was changed. |
| Probe receipts | None. The brief records `prove` as blocked; browser evidence comes from the actual styles project. |

The control readings are:

| Control | Exact red output | Green after removal |
| --- | --- | --- |
| `PLANT-VUE` | Not run; never planted | Not run |
| `PLANT-ESCAPE` | Not run; never planted | Not run |
| `PLANT-TYPE` | Not run; never planted | Not run |
| `PLANT-BOOTSTRAP` | Not run; never planted | Not run |
| `PLANT-PEER` | Not run; never planted | Not run |
| Journey: omit toggle act | Not run; never mutated | Not run |
| Refusal: render `Sign in` | Not run; never mutated | Not run |

The existing control targets are unchanged: `git diff --exit-code -- src/browser/index.ts tests/src/browser/index.test.ts app/browser/main.ts package.json` produced no diff. `Test-Path src/browser/probe.ts` returned `False`.

Review evidence remains in the checkout. Ordinary `git status --porcelain` reports only the owned styles configuration, source, and test additions. `git diff --stat` is empty because the implementation files are untracked additions; `git diff --check` exits 0. Git reports `warning: unable to access 'C:\Users\mikes/.config/git/ignore': Permission denied`. The report is under ignored `tmp/` and does not appear in ordinary status.

The inspected built styles tree holds `index.css` at 67 bytes, `index.rtl.css` at 67 bytes, and `index.js` at 0 bytes. These outputs establish the styles step only; they do not establish the full distribution criterion.
