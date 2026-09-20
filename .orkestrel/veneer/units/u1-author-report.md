U1-author's remaining distribution, guide, and README work is implemented. The required local gates pass on Windows with managed Chromium. The registry-dependent distribution browser case skips locally; its release receipt, the Edge receipt, and the Chrome receipt remain outside this run.

This report covers the whole unit under briefs 1 through 5. Run 5 started from clean commit `9d64c66`. Earlier measurements and mutations are attributed to run 4 or to the Orchestrator; they were not repeated as fresh controls. No agent was spawned, dependency installed, scaffold repair run, shared manifest edited, or Git index changed.

The run 5 baseline measurements before editing were:

| Command | Exit | Final lines |
| --- | --- | --- |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` |
| `npm.cmd run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json` |
| `npm.cmd run test:src` | 0 | `Test Files  5 passed (5)`; `Tests  12 passed (12)` |
| `npm.cmd run test:app` | 0 | `Test Files  2 passed (2)`; `Tests  3 passed (3)` |
| `npm.cmd run test:policy` | 0 | `Test Files  1 passed (1)`; `Tests  109 passed \| 1 skipped (110)` |
| `npm.cmd run test:config` | 0 | `Test Files  1 passed (1)`; `Tests  173 passed \| 1 skipped (174)` |
| `npm.cmd run test:conformance` | 0 | `Test Files  1 passed (1)`; `Tests  7 passed (7)` |
| `npm.cmd run test:guides` | 1 | `Test Files  1 failed (1)`; `Tests  5 failed \| 12 passed (17)` |
| `npm.cmd run test:setup:browser` | 0 | `Test Files  1 passed (1)`; `Tests  3 passed (3)` |

The logs are `tmp/codex/u1-run5-baseline-*.log`. The guide failures covered missing barrel documentation, method groups, a mapped self import, links, and test links.

Run 5 changes these owned paths:

```text
README.md
guides/README.md
guides/veneer.md
tests/distribution.test.ts
tests/guides.test.ts
tmp/codex/u1-author-report.md
```

The distribution page resolves `<installed package>/styles` through the consumer's package resolver, reads that installed target, and bundles its stylesheet link. The added `[requires the registry]` case reads `link.sheet` and the `CSSLayerStatementRule` names in a real browser. It expects `theme, reset, base, elements, components, utilities` and rejects `utilities` alone. The generated cases remain. The local registry readiness check did not answer, so the installed-browser assertions were collected but not executed.

The guide documents the ColorMode surface and methods with summaries equal to the declarations. Its examples import the published browser specifier. The guide proof also executes the scheme-validation example's true and false verdicts. The README pitch still equals the tagline, and Development distinguishes the managed Chromium result from the pending Edge and Chrome receipts.

The styles-axis work carried from run 3 created these owned paths:

```text
configs/src/tsconfig.styles.json
configs/src/vite.styles.config.ts
src/styles/_mixins.scss
src/styles/_theme.scss
src/styles/_tokens.scss
src/styles/index.scss
src/styles/index.ts
tests/setupStyles.test.ts
tests/setupStyles.ts
tests/src/styles/index.test.ts
```

The Orchestrator's vendored `tests/setupPolicy.ts` repair in `f5d31f8` is not an author edit.

The run 4 measurements before editing, carried from its report at `f5d31f8`, were:

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

Run 4 created these paths, committed by the Orchestrator at `9d64c66`:

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

Run 4 changed these existing paths:

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

The report and generated evidence are ignored by Git. Those implementation paths are unchanged in run 5.

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
| Guide/app parity choice | The library faces remain the concept row's source population. The private app barrel is documented in prose and stays outside the published API tables. |

The `vue-tsc` unknown is settled for the authored journey imports. The app scoped check accepts `@orkestrel/test/browser`. Its initial diagnostics concerned incorrect calls in owned tests:

```text
tests/app/browser/integration.test.ts(94,54): error TS2554: Expected 1 arguments, but got 2.
tests/app/browser/integration.test.ts(138,87): error TS2551: Property 'tokens' does not exist on type 'CensusFixture'. Did you mean 'token'?
tests/app/browser/integration.test.ts(139,39): error TS2554: Expected 1 arguments, but got 2.
tests/app/browser/integration.test.ts(140,39): error TS2554: Expected 1 arguments, but got 2.
```

The smallest corrections use `traverseAccessible('Dark mode')`, the fixture's `token` and `mark` fields, and the unary `extractStyles` call. `npm.cmd run check:app:browser` then exited 0. No scoped configuration change was needed.

The planted controls produced these exact assertion readings. Run 4 removed its successful plants. Brief 5 supplies the Orchestrator's peer-control result.

| Control | Command | Red result | Green after removal |
| --- | --- | --- | --- |
| `PLANT-VUE` | `npm.cmd run test:conformance` | Exit 1; `Tests  1 failed \| 6 passed (7)` | Exit 0; `Tests  7 passed (7)` |
| `PLANT-ESCAPE` | `npm.cmd run test:conformance` | Exit 1; `Tests  1 failed \| 6 passed (7)` | Exit 0; `Tests  7 passed (7)` |
| `PLANT-TYPE` | `npm.cmd run build:src:browser`, then `npm.cmd run test:conformance` | Build exit 0; test exit 1; `Tests  2 failed \| 5 passed (7)` | Rebuild exit 0; test exit 0; `Tests  7 passed (7)` |
| `PLANT-BOOTSTRAP` | `npm.cmd run test:conformance` | Exit 1; `Tests  1 failed \| 6 passed (7)` | Exit 0; `Tests  7 passed (7)` |
| `PLANT-PEER` (Orchestrator, 2026-09-20) | `npm run test:conformance` | Exit 1; `runtime boundaries > declares no forbidden runtime dependency or peer`: `expected 'vue' to be undefined` | Manifest restored byte for byte; exit 0; `7 passed (7)` |

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

Run 4's removal commands returned 0 for the manifest and 1 for its authored files because the authorized implementation also changed them. Its pre-plant and post-removal SHA-256 readings were identical:

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

Run 4's gate readings after implementation are intermediate evidence, not a completed final gate chain:

| Command | Last relevant reading |
| --- | --- |
| `npm.cmd run format:check` | Not run in run 4. |
| `npm.cmd run lint:check` | Exit 0; `npm notice run oxlint --config .oxlintrc.json --deny-warnings .`. Taken before the final assertion-message correction and plants. |
| `npm.cmd run check` | Exit 0; final line `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json`. Taken before the final conformance assertion edits. |
| `npm.cmd run build` | Exit 0; final line `✓ built in 257ms`; app output includes `dist/app/browser/index.html` and its assets. |
| `npm.cmd run test:src` | Before-editing baseline only. |
| `npm.cmd run test:src:browser` | Exit 0; `Test Files  4 passed (4)`; `Tests  11 passed (11)`. |
| `npm.cmd run test:src:styles` | Not run in run 4. |
| `npm.cmd run test:app` | Exit 0; `Test Files  2 passed (2)`; `Tests  3 passed (3)`. Taken before browser setup was extended. |
| `npm.cmd run test:journey` | Exit 0; `Test Files  4 passed (4)`; `Tests  32 passed \| 4 skipped (36)`. Capture run: `Tests  36 passed (36)`. |
| `npm.cmd run test:policy` | Exit 0 after the engine; `Tests  109 passed \| 1 skipped (110)`. Not repeated over the completed additions. |
| `npm.cmd run test:config` | Before-editing baseline only. |
| `npm.cmd run test:setup` | Initially `Tests  12 passed (12)`; later exit 1 because the malformed-source expectation used the wrong message. Exact message corrected; not rerun before the stop. |
| `npm.cmd run test:setup:browser` | Exit 0; `Test Files  1 passed (1)`; `Tests  3 passed (3)`. |
| `npm.cmd run test:conformance` | Exit 0 after the last successful plant removal; `Test Files  1 passed (1)`; `Tests  7 passed (7)`. |
| `npm.cmd run test:guides` | Baseline exit 1; guide implementation not reached. |
| `npm.cmd run test:distribution` | Not run; distribution extension not reached. |


Those run 4 intermediate readings are historical. The Orchestrator's `9d64c66` checkpoint and run 5's results supersede their unfinished gates.

The final gate readings are:

| Command | Exit | Final lines |
| --- | --- | --- |
| `npm.cmd run format:check` | 0 | `All matched files use the correct format.`; `Finished in 758ms on 71 files using 16 threads.` |
| `npm.cmd run lint:check` | 0 | `npm notice run oxlint --config .oxlintrc.json --deny-warnings .` |
| `npm.cmd run check` | 0 | `npm notice run vue-tsc --noEmit -p configs/app/tsconfig.browser.json`; all scoped checks ran, including styles. |
| `npm.cmd run build` | 0 | `✓ built in 257ms`; app output includes `dist/app/browser/index.html` and assets. |
| `npm.cmd run test:src` | 0 | `Test Files  5 passed (5)`; `Tests  12 passed (12)` |
| `npm.cmd run test:src:styles` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed (1)` |
| `npm.cmd run test:app` | 0 | `Test Files  2 passed (2)`; `Tests  3 passed (3)` |
| `npm.cmd run test:journey` | 0 | `Test Files  4 passed (4)`; `Tests  32 passed \| 4 skipped (36)` |
| `npm.cmd run test:policy` | 0 | `Test Files  1 passed (1)`; `Tests  109 passed \| 1 skipped (110)` |
| `npm.cmd run test:config` | 0 | `Test Files  1 passed (1)`; `Tests  173 passed \| 1 skipped (174)` |
| `npm.cmd run test:setup` | 0 | `Test Files  2 passed (2)`; `Tests  12 passed (12)` |
| `npm.cmd run test:setup:browser` | 0 | `Test Files  1 passed (1)`; `Tests  3 passed (3)` |
| `npm.cmd run test:conformance` | 0 | `Test Files  1 passed (1)`; `Tests  7 passed (7)` |
| `npm.cmd run test:guides` | 0 | `Test Files  1 passed (1)`; `Tests  18 passed (18)` |
| `npm.cmd run test:distribution` | 0 | `Test Files  1 passed (1)`; `Tests  1 passed \| 6 skipped (7)` |

The ordered gate chain ran before the added guide-example assertion. After that test-only edit, format, lint, typechecking, guide parity, and conformance passed again. Logs are `tmp/codex/u1-run5-final-*.log`. The guide repair first changed `5 failed | 12 passed` to `17 passed`; the executed example adds the passing case in the final reading.

The journey skips are the capture-flag cases; run 4's enabled capture receipt appears earlier. The policy skip requires an authored local substitution-table file, which this scaffold target does not carry. The configuration skip is the unavailable-extractor branch because the extractor is installed. Distribution skips require registry readiness. Every required test project collected files. The styles import failure described in brief 5 did not recur.

The final build contains:

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

API Extractor reports bundled TypeScript 5.9.3 against workspace TypeScript 6.0.3; the build exits 0. The prescribed Vitest and TypeScript dependency ranges remain unchanged.

Run 5 verified plant removal against the committed checkpoint. `git diff --exit-code --` returned 0 for each of `package.json`, `src/browser/index.ts`, `tests/src/browser/index.test.ts`, and `app/browser/main.ts`. `Test-Path src/browser/probe.ts` returned `False`. The Orchestrator's peer-control log is `../scaffold/tmp/units/u1-plant-peer.log.txt`; brief 5 records the restored manifest digest prefix `b0589825…`. No peer plant was attempted in run 5.

The final status names only:

```text
 M README.md
 M guides/README.md
 M guides/veneer.md
 M tests/distribution.test.ts
 M tests/guides.test.ts
```

The report exists under ignored `tmp/codex/`; Git status therefore does not list it. `git diff --check` exits 0. A text-integrity scan of those changed paths found no replacement character, prohibited control character, or matched mojibake sequence using `\uFFFD|[\u0000-\u0008\u000B\u000C\u000E-\u001F]|Ã.|Â.|â€`. No source API or setup export was added in run 5. Existing package primitives and the distribution stage are reused.

No permanent or temporary shared-file patch remains necessary.

The deviations and limits are:

| Subject | Expected | Found and exact evidence | Done or not done |
| --- | --- | --- | --- |
| Peer control, run 4 | Temporarily plant the forbidden peer. | Patch tool: `Failed to write file C:\Users\mikes\WebstormProjects\veneer\package.json`. | Run 4 stopped; the Orchestrator completed the red/green control recorded earlier. Run 5 changed no manifest. |
| Plant-removal evidence, run 4 | Clean diffs for planted existing files. | Authored implementation also changed them, so removal commands returned 1; pre/post hashes matched. | Plants removed then; run 5's checkpoint-relative commands return 0. |
| Native main perception | Read the named main through `readPerception`. | `Error: Named region "Showcase" is not visible`; installed reader omits the main role. | Run 4 added a named section inside main. Final app and journey tests pass. |
| Shared setup isolation | Load browser setup for source tests. | Eager app CSS import raised `Published modules cannot depend on private application modules`. | Run 4 moved the import into `mountShowcase`; final source tests pass. |
| Artifact destination | Write text artifacts under workspace tmp. | `Access denied to "C:\Users\tmp\capture\light-1280.txt"` with the screenshot-relative path. | Run 4 used root-relative text paths and retained the prescribed capture path. |
| Parser authority | Reuse installed tooling. | Compiler API imports raised `the in-process compiler API is not a surface the fleet uses`. | Run 4 adopted Vite's parser; final lint and setup tests pass. |
| Setup-message assertion | Match the real parser refusal. | Run 4 expected `/Unexpected token/u` but received ``Expected `}` but found `EOF` ``. | Corrected in the checkpoint; run 5's `test:setup` passes. |
| Name-check timing | Check names before declaration. | Run 4 checked added setup constants and its fixture export afterward; no hosted claim matched. | Historical timing deviation retained; run 5 adds no public name. |
| Conformance coverage | Inspect module specifiers and relative closures. | Source scan reads JavaScript/TypeScript modules under src, app, and tests; built scan reads `.js` and `.d.ts`. | Literal static/dynamic imports, re-exports, type imports, and relative closure controls are proven. Computed dynamic expressions and HTML/CSS import syntax remain outside that instrument. |
| Prior entry-proof duplication | Consolidate repeated recorder setup. | Run 4 recorded duplicate listener instrumentation in `tests/src/browser/index.test.ts`. | Unchanged under brief 5's completed-step boundary; no claim that this historical cleanup finding was repaired. |
| Scoped formatting | Run the formatter only over touched files. | The manifest's `format` script contains `--write .`; appending paths would retain the tree target. | Used `npx.cmd oxfmt --config .oxfmtrc.json --write` with explicit touched paths, then the full nonmutating format gate. |
| Distribution execution | Prove the installed stylesheet in a browser. | Local result: `1 passed \| 6 skipped (7)`; registry readiness did not answer. | Implementation done; installed-browser assertion and its red control are not executed here. The Orchestrator must take `npm run test:distribution -- --mode release` on the host. |
| Browser receipts | Record managed Chromium and Edge separately; leave Chrome open. | Managed Chromium gates pass. Brief 5 assigns Edge to the Orchestrator; Chrome is absent per the standing evidence. | README records each status. No fresh Edge or Chrome result claimed. |
| Proof service | Obtain applicable instrument receipts. | The brief declares `prove` blocked; run 4 recorded the installed Probe 0.0.16 threads-pool limitation. | No Probe receipt claimed. Real gates and the carried browser mutations are the evidence. |

This unit adds no token, component, or appearance claim. Independent audit and final acceptance remain with the Orchestrator.
