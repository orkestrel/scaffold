U1-author stopped after the patch tool rejected the required `PLANT-PEER` write. The assignment is incomplete. The engine, shell, browser setup, journeys, captures, entry proof, and conformance controls are implemented; distribution, guides, README receipts, and final verification remain unfinished.

Measurements were taken on Windows on 2026-09-20, from the brief's `f5d31f8` baseline. Browser readings used the configured default managed Chromium provider. No agent was spawned, dependency installed, scaffold repair run, or Git index changed.

The stopping evidence is exact:

```text
Exit code: 1
Wall time: 0.8 seconds
Output:
Failed to write file C:\Users\mikes\WebstormProjects\veneer\package.json
```

The governing instruction is in [the scaffold orchestration contract](C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md), under Bench laws: “If the sandbox rejects the patch, the unit stops and reports the rejection. Never find another write mechanism.” No alternative write mechanism was attempted. The tool supplied no cause beyond the failed write.

The measurements before editing were:

| Command | Exit | Final result |
| --- | --- | --- |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` |
| `npm.cmd run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` |
| `npm.cmd run test:src` | 0 | `Test Files  2 passed (2)`; `Tests  2 passed (2)` |
| `npm.cmd run test:app` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)` |
| `npm.cmd run test:policy` | 0 | `Test Files  1 passed (1)`; `Tests  109 passed \| 1 skipped (110)` |
| `npm.cmd run test:config` | 0 | `Test Files  1 passed (1)`; `Tests  173 passed \| 1 skipped (174)` |
| `npm.cmd run test:conformance` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)` |
| `npm.cmd run test:guides` | 1 | `Test Files  1 failed (1)`; `Tests  4 failed \| 13 passed (17)` |
| `npm.cmd run test:setup:browser` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)` |

The baseline logs are `tmp/codex/u1-baseline-*.log`. The guides output names the expected findings:

```text
guides/veneer.md has no ## Methods section.
guides/veneer.md has no ## Tests section.
guides/veneer.md has no documented method groups.
guides/veneer.md has no mapped self import.
guides/veneer.md has no links.
guides/veneer.md has no test links.
```

Before creating the journey file, `npm.cmd run test:journey` exited 1 with `No test files found, exiting with code 1`, naming every declared journey variant. This measurement followed the engine and shell work; it was not a before-editing baseline.

The final working tree contains these created paths:

```text
app/browser/constants.ts
app/browser/factories.ts
app/browser/showcases/Showcase.ts
app/browser/styles/_shell.scss
app/browser/styles/index.scss
app/browser/types.ts
src/browser/color-mode/ColorMode.ts
src/browser/constants.ts
src/browser/factories.ts
src/browser/types.ts
src/browser/validators.ts
tests/app/browser/integration.test.ts
tests/app/browser/showcases/Showcase.test.ts
tests/src/browser/color-mode/ColorMode.test.ts
tests/src/browser/factories.test.ts
tests/src/browser/fixtures/constants.ts
tests/src/browser/validators.test.ts
```

These existing paths changed:

```text
app/browser/index.ts
app/browser/main.ts
src/browser/index.ts
tests/app/browser/index.test.ts
tests/conformance.test.ts
tests/setupBrowser.test.ts
tests/setupBrowser.ts
tests/setupConformance.test.ts
tests/setupConformance.ts
tests/src/browser/index.test.ts
tmp/codex/u1-author-report.md
```

The report and generated evidence are ignored by Git. `git status --porcelain` names only owned implementation and test paths. `git diff --check` exits 0. The styles-axis files from the preceding unit remain unchanged.

The public-name check searched code-span table rows in every `node_modules/@orkestrel/scaffold/dist/host/guides/*.md` file. No searched name matched a hosted row. In the following table, “Hosted guides” means that complete installed guide population.

| Public names checked | Checked against | Result |
| --- | --- | --- |
| `ColorScheme`, `ColorModeOptions`, `ColorModeInterface` | Hosted guides | No claim found |
| `ColorMode`, `createColorMode`, `isColorScheme` | Hosted guides | No claim found |
| `COLOR_MODE_ATTRIBUTE`, `COLOR_MODE_KEY` | Hosted guides | No claim found |
| `ShowcaseInterface`, `Showcase`, `createShowcase`, `SHOWCASE_COPY` | Hosted guides | No claim found |
| `mountShowcase`, `applyTheme` | Hosted guides | No claim found |
| `BOOTSTRAP_CSS_DIGEST`, `BOOTSTRAP_RTL_CSS_DIGEST`, `BOOTSTRAP_BUNDLE_DIGEST` | Hosted guides | No claim found |
| `FORBIDDEN_RUNTIME`, `readForbiddenDependency`, `readForbiddenSource` | Hosted guides | No claim found |
| `readEscapingImport`, `readImportClosure`, `readSpecifiers`, `readFileDigest` | Hosted guides | No claim found |
| Existing `BOOTSTRAP_VERSION`, `BOOTSTRAP_MANIFEST_PATH`, `WORKSPACE_PATH`, `readManifestMember` | Hosted guides | No claim found |
| Fixture export `ENTRY_LISTENER_CONTROL` | Hosted guides | No claim found |

The amended engine names were checked before declaration. The completed check of every added setup constant and the fixture export occurred after declaration; the brief's before-declaration timing was not fully met.

The implementation decisions and placement readings are:

| Subject | Reading |
| --- | --- |
| App import alias | `@src/browser`; the root paths declare it and the app scoped check passes. |
| Guard placement | `src/browser/validators.ts`, as brief 3 requires; no `guards.ts` exists. |
| Engine placement | `src/browser/color-mode/ColorMode.ts`, as brief 4 requires; no `src/browser/theme/` directory was created. |
| Declaration placement | Types, constants, factories, validators, and classes use their prescribed files. No additional filename correction was needed. |
| Shell perception | The requested named `main` contains a named `section` and its paragraph. The installed perception reader excludes the `main` role and accepts `region`. |
| Shell paint | App-only SCSS uses native `color-scheme`, `Canvas`, and `CanvasText`. No package token or component style was added. |
| Styles entry import | `main.ts` awaits `import('../../src/styles/index.ts')` before mounting. The unassigned static TypeScript import failed lint; an empty named import also failed lint. The dynamic import passed lint and build. |
| RTL mechanism | Retained the existing single Vite build. Its post-build plugin copies the layer-only CSS asset to `index.rtl.css`. There are no physical declarations to flip in this cascade. |
| Conformance parser | Vite's installed `parseSync` and `Visitor`; no parser dependency was added. TypeScript compiler-API imports were rejected by the vendored lint rule and removed. |
| Closure mechanism | Follows relative module edges, substitutes source extensions for emitted JavaScript extensions, resolves real paths, and uses Sass's `loadedUrls` for Sass dependencies. |
| Guide/app parity choice | Not completed. Existing guide rows and prose remain unchanged. |

The `vue-tsc` unknown is settled for the authored journey imports. The app scoped check accepts `@orkestrel/test/browser`. Its initial diagnostics concerned incorrect calls in owned tests:

```text
tests/app/browser/integration.test.ts(94,54): error TS2554: Expected 1 arguments, but got 2.
tests/app/browser/integration.test.ts(138,87): error TS2551: Property 'tokens' does not exist on type 'CensusFixture'. Did you mean 'token'?
tests/app/browser/integration.test.ts(139,39): error TS2554: Expected 1 arguments, but got 2.
tests/app/browser/integration.test.ts(140,39): error TS2554: Expected 1 arguments, but got 2.
```

The smallest corrections use `traverseAccessible('Dark mode')`, the fixture's `token` and `mark` fields, and the unary `extractStyles` call. `npm.cmd run check:app:browser` then exited 0. No scoped configuration change was needed.

The planted controls produced these exact assertion readings. Every successful plant was removed before the rejected peer write.

| Control | Command | Red result | Green after removal |
| --- | --- | --- | --- |
| `PLANT-VUE` | `npm.cmd run test:conformance` | Exit 1; `Tests  1 failed \| 6 passed (7)` | Exit 0; `Tests  7 passed (7)` |
| `PLANT-ESCAPE` | `npm.cmd run test:conformance` | Exit 1; `Tests  1 failed \| 6 passed (7)` | Exit 0; `Tests  7 passed (7)` |
| `PLANT-TYPE` | `npm.cmd run build:src:browser`, then `npm.cmd run test:conformance` | Build exit 0; test exit 1; `Tests  2 failed \| 5 passed (7)` | Rebuild exit 0; test exit 0; `Tests  7 passed (7)` |
| `PLANT-BOOTSTRAP` | `npm.cmd run test:conformance` | Exit 1; `Tests  1 failed \| 6 passed (7)` | Exit 0; `Tests  7 passed (7)` |
| `PLANT-PEER` | Patch attempt only | Write rejected; control not executed | Manifest unchanged; no post-plant test exists |

For `PLANT-VUE`, the failing case was `imports no forbidden runtime package from source, application, or tests`:

```diff
  {
-   "forbidden": undefined,
+   "forbidden": "vue",
    "path": "src/browser/probe.ts",
  }
```

For `PLANT-ESCAPE`, the failing case was `keeps relative module imports inside the workspace`:

```diff
  {
-   "escape": undefined,
+   "escape": "../../../../elements/src/core/index.js",
    "path": "tests/src/browser/index.test.ts",
  }
```

For `PLANT-TYPE`, the source assertion reported:

```diff
  {
-   "forbidden": undefined,
+   "forbidden": "vue",
    "path": "src/browser/index.ts",
  }
```

Its built-declaration assertion also failed exactly as required:

```text
FAIL  |conformance| tests/conformance.test.ts > runtime boundaries > ships only relative or Orkestrel module specifiers after npm run build
AssertionError: browser/index.d.ts: vue: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false
```

For `PLANT-BOOTSTRAP`, the failing source assertion reported:

```diff
  {
-   "forbidden": undefined,
+   "forbidden": "bootstrap",
    "path": "app/browser/main.ts",
  }
```

The required removal commands were run. `git diff --exit-code -- package.json` exits 0. The commands for `tests/src/browser/index.test.ts`, `src/browser/index.ts`, and `app/browser/main.ts` exit 1 because those files also contain the authorized implementation. Their pre-plant and post-removal SHA-256 readings are identical:

| File | SHA-256 before and after |
| --- | --- |
| `tests/src/browser/index.test.ts` | `EC5F1A4D14D3E6E3F15C88C73EC4AB5B5A8ED5F28A0CCC0A0F9618CBC1CFD9E6` |
| `src/browser/index.ts` | `A21E07B25732D98288FA01145A3741C5C91F6D98433A34380085171413E82DF7` |
| `app/browser/main.ts` | `7E6E0190B8EB8FBA88E12C094C231D39E2FBF5D63D16FF2EE9E0D658A5558923` |
| `package.json` | `B0589825EF21E7453258847B5AEF56638EECB19A69B822288B6CDE84B9FCB2D7` |

`Test-Path src/browser/probe.ts` returns `False`.

The journey mutations also ran red and returned green:

| Mutation | Command | Result |
| --- | --- | --- |
| Omit the toggle act | `npm.cmd run test:journey -- -t 'switches the announced'` | Exit 1; `Tests  4 failed \| 32 skipped (36)` |
| Render `Sign in` | `npm.cmd run test:journey -- -t 'reports the absent'` | Exit 1; `Tests  4 failed \| 32 skipped (36)` |
| Restore the journey and shell | `npm.cmd run test:journey` | Exit 0; `Test Files  4 passed (4)`; `Tests  32 passed \| 4 skipped (36)` |
| Enable captures | `CAPTURE=1` in PowerShell, then `npm.cmd run test:journey` | Exit 0; `Test Files  4 passed (4)`; `Tests  36 passed (36)` |

The omitted-act reading for `journey:light-1280` was:

```text
Error: Condition ""Dark mode" to announce "pressed=true"" did not hold within 1000ms (waited 1005.6000000014901ms) (last states: ["pressed=false"])
```

The refusal mutation reported:

```text
AssertionError: expected undefined to be 'No interactive element has the access…' // Object.is equality

- Expected:
"No interactive element has the accessible name \"Sign in\""

+ Received:
undefined
```

The journeys prove arrival, mode changes, keyboard activation, and the absent sign-in control. The matrix reads every declared variant. Ordinary runs prove filename uniqueness and placement membership; capture runs prove the returned written filenames. The installed capture helper reads each image back. The run also records class and style populations with published controls. This unit adds no statechart or persistence family to the nonpersistent shell.

The capture directory contains:

```text
tmp/capture/states/home--dark-1280.png
tmp/capture/states/home--dark-390.png
tmp/capture/states/home--light-1280.png
tmp/capture/states/home--light-390.png
tmp/capture/states/home-dark--dark-1280.png
tmp/capture/states/home-dark--dark-390.png
tmp/capture/states/home-dark--light-1280.png
tmp/capture/states/home-dark--light-390.png
```

The variant artifacts are `tmp/capture/light-1280.txt`, `dark-1280.txt`, `light-390.txt`, and `dark-390.txt`. They contain the accessible tree, focus description, style readings, journal entries, and capture paths. The `home-dark` state records the journey's dark state even in a variant whose initial mode is light.

The gate readings after implementation are intermediate evidence, not a completed final gate chain:

| Command | Last relevant reading |
| --- | --- |
| `npm.cmd run format:check` | Not run in this attempt. |
| `npm.cmd run lint:check` | Exit 0; `npm notice run oxlint --config .oxlintrc.json --deny-warnings .`. Taken before the final assertion-message correction and plants. |
| `npm.cmd run check` | Exit 0; final line `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json`. Taken before the final conformance assertion edits. |
| `npm.cmd run build` | Exit 0; final line `✓ built in 257ms`; app output includes `dist/app/browser/index.html` and its assets. |
| `npm.cmd run test:src` | Before-editing baseline only. |
| `npm.cmd run test:src:browser` | Exit 0; `Test Files  4 passed (4)`; `Tests  11 passed (11)`. |
| `npm.cmd run test:src:styles` | Not run in this attempt. |
| `npm.cmd run test:app` | Exit 0; `Test Files  2 passed (2)`; `Tests  3 passed (3)`. Taken before browser setup was extended. |
| `npm.cmd run test:journey` | Exit 0; `Test Files  4 passed (4)`; `Tests  32 passed \| 4 skipped (36)`. Capture run: `Tests  36 passed (36)`. |
| `npm.cmd run test:policy` | Exit 0 after the engine; `Tests  109 passed \| 1 skipped (110)`. Not repeated over the completed additions. |
| `npm.cmd run test:config` | Before-editing baseline only. |
| `npm.cmd run test:setup` | Initially `Tests  12 passed (12)`; later exit 1 because the malformed-source expectation used the wrong message. Exact message corrected; not rerun before the stop. |
| `npm.cmd run test:setup:browser` | Exit 0; `Test Files  1 passed (1)`; `Tests  3 passed (3)`. |
| `npm.cmd run test:conformance` | Exit 0 after the last successful plant removal; `Test Files  1 passed (1)`; `Tests  7 passed (7)`. |
| `npm.cmd run test:guides` | Baseline exit 1; guide implementation not reached. |
| `npm.cmd run test:distribution` | Not run; distribution extension not reached. |

The setup-message failure and its unverified correction are explicit:

```text
AssertionError: expected [Function] to throw error matching /Unexpected token/u but got 'Expected `}` but found `EOF`'
```

The assertion now expects `Expected `}` but found `EOF``. No green rerun is claimed for that correction.

The build leaves:

```text
dist/src/core/index.cjs
dist/src/core/index.d.cts
dist/src/core/index.d.ts
dist/src/core/index.js
dist/src/browser/index.d.ts
dist/src/browser/index.js
dist/src/browser/index.js.map
dist/src/styles/index.css
dist/src/styles/index.js
dist/src/styles/index.rtl.css
```

API Extractor reports its bundled TypeScript 5.9.3 against workspace TypeScript 6.0.3; the build exits 0. The dependency ranges remain unchanged.

The shared-file patch needed to execute the outstanding temporary control is:

```diff
--- a/package.json
+++ b/package.json
@@
 	"dependencies": {},
+	"peerDependencies": {
+		"vue": "^3.5.43"
+	},
 	"devDependencies": {
```

This patch is temporary: run the conformance control, remove exactly those added lines, and verify the original manifest. No permanent shared-file patch is proposed.

The deviations and remaining limits are:

| Subject | Expected | Found and exact evidence | Done or not done |
| --- | --- | --- | --- |
| Peer control | Temporarily add the forbidden peer and observe the assertion fail. | Patch tool: `Failed to write file C:\Users\mikes\WebstormProjects\veneer\package.json`. | Not done; stopped. No cause established. |
| Removal evidence | Clean `git diff --exit-code` for planted existing files. | Exit 1 on authored files; exit 0 on the manifest; pre/post hashes match. | Plants removed and byte identity checked. |
| Native main perception | Read the named main through `readPerception`. | `Error: Named region "Showcase" is not visible`; installed reader's role list omits `main`. | Added a named section within main; app tests pass. |
| Shared setup isolation | Browser setup can load for source tests. | Eager app CSS import raised `Published modules cannot depend on private application modules`. | Moved the CSS import into `mountShowcase`; source browser tests pass. |
| Artifact destination | Write variant text under workspace `tmp/capture`. | `Access denied to "C:\Users\tmp\capture\light-1280.txt"` when using the screenshot-relative path for the file command. | Used root-relative `tmp/capture` for text; capture directory remains test-relative as briefed. |
| Parser authority | Implement the import instrument using installed tooling. | TypeScript imports raised `the in-process compiler API is not a surface the fleet uses`. | Replaced them with Vite's parser; lint and setup proofs passed before the later message-only assertion edit. |
| Name-check timing | Check every public name before declaration. | Setup constants and fixture name received the complete check afterward. | No collision found; timing deviation remains. |
| Conformance coverage | Inspect module import specifiers and relative closures. | Source scan selects JavaScript/TypeScript modules under `src`, `app`, and `tests`; built scan selects `.js` and `.d.ts`. Computed dynamic expressions are not resolved; non-module HTML/CSS import syntax is not scanned. | Literal static/dynamic imports, re-exports, type imports, and source closure controls are proven. Broader runtime independence is not claimed. |
| Consolidation | Complete the prescribed cleanup sweep. | Entry tests still duplicate listener-recording setup. | Not completed before the stop. |
| Guides and README | Document the engine, decide app parity, and state browser receipts. | Existing documentation remains unchanged. | Not done. |
| Distribution | Extend the real installed-browser stage with the CSS target. | `tests/distribution.test.ts` remains unchanged. | Not done. |
| Final gates | Run the full ordered gate list on the final tree. | Intermediate readings only; no final format or complete gate sweep. | Not done. |
| Browser receipts | Distinguish managed Chromium, Edge, and Chrome. | Managed Chromium ran. Edge receipt belongs to the Orchestrator; Chrome receipt remains open. | Edge and Chrome not run; README receipt text not written. |
| Proof service | Obtain applicable receipts where available. | Brief declares `prove` blocked; installed Probe 0.0.16 runtime pins the threads pool. | No Probe receipt claimed; browser mutations and real gates supply the recorded evidence. |

No acceptance claim is made. The Orchestrator retains independent audit and final acceptance.
