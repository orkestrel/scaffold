The adopter allocation is repaired. The generated workspace passes lint and typechecking, then fails its themes build. Stopped under the brief's deviation contract; acceptance is incomplete.

The continuation changes only `tests/distribution.test.ts`: removes the checkout-specific scratch parent, logs the allocated path, compares page stamps with `computeStamp(page)`, and logs each stamp when reached. The existing `createTeardown` cleanup remains. `tests/setupServer.ts` and `tests/setupServer.test.ts` retain their starting bytes. The build regenerated `host.json` without changing its starting bytes.

Helper changes: none. The retained helpers serve these purposes:

- `createScratch`: allocates the adopter under the host temporary directory by default.
- `createTeardown`: removes the adopter after success or failure.
- `spawnNpm`: launches npm through Node with case-folded environment merging and bounded output.
- `installPackedScaffold`: packs this checkout and installs that archive in the scratch consumer.
- `computeStamp`: computes the page digest with its stamp line removed.

The adopter ran at `C:\Users\mikes\AppData\Local\Temp\propagation-adopter-5TeBGl`. Its results follow; unreached steps have no exit code or output.

| Step | Exit code | Output or result |
| --- | --- | --- |
| Pack and install the packed scaffold consumer | 0 | Existing helper returned successfully; logged `adopter: pack and consumer install: exit 0`. The helper does not print successful npm output. |
| Packed CLI generation | 0 | JSON reports the generated target and written selection; `skipped: []`, `removed: []`, and floor provenance. Complete JSON is in the gate log. |
| Install with `--ignore-scripts --prefer-offline --no-audit --no-fund` | 0 | `added 175 packages in 7s`; lockfile assertion confirms the local scaffold archive. |
| `lint:check` | 0 | Ran `oxlint --config .oxlintrc.json --deny-warnings .`; no diagnostics; 968 ms. |
| `check` | 0 | Root Vue typecheck and the selected source/application isolation checks passed; 12,442 ms. |
| `build` | 1 | Themes Sass compilation rejected `@use 'default';` at line 3; 14,932 ms. Full output is quoted in the failure report. |
| `test:src`, `test:app` | none | Not run: stopped at build. |
| `test:setup`, `test:setup:browser` | none | Not run: stopped at build. |
| `test:config`, `test:policy` | none | Not run: stopped at build. |
| `test:journey`, `test:journey:vue` | none | Not run: stopped at build. |
| `build:showcase`, `build:showcase:vue` | none | Not run; page-stamp readings: none. |
| Consumer imports of `./styles`, `./print`, `./styles/themes` | none | Not run; CSS consumer result: none. |
| Deleted-wrapper `repair --offline --json` | none | Not run; byte comparison: none. |
| Modified-wrapper `audit --offline --json` | none | Not run; stale finding: none. |

The adopter measured 43,236 ms from allocation through cleanup and reported `scratch removed: true`. This is the failed-run duration, not a complete-adopter measurement. Neither its 600,000 ms case limit nor the launch cap fired. Installation succeeded; network use was not measured.

Validation results follow. The ordered launcher used `npm exec --` for the listed `npx` commands. The final format check ran separately after distribution returned its failure.

| Command | Exit code | Test count or output |
| --- | --- | --- |
| `git status --porcelain`, start and finish | 0 | none; recorded in status artifacts |
| `git diff --stat`, start | 0 | none; recorded in the start artifact |
| `npx oxfmt --config .oxfmtrc.json --write tests/distribution.test.ts tests/setupServer.ts tests/setupServer.test.ts` | 0 | none; formatted 3 files |
| `npx tsc --noEmit --project tsconfig.json` | 0 | none; no diagnostics |
| `npx oxlint --config .oxlintrc.json tests` | 0 | none; no diagnostics |
| `npm run test:setup` | 0 | 179 passed, 3 skipped; 3 files passed |
| `npm run build` | 0 | none; 196 host inventory entries staged |
| `npm run test:distribution` | 1 | 4 failed, 6 passed, 1 skipped; 1 file failed; Vitest duration 173.23 s |
| `npx oxfmt --config .oxfmtrc.json --check tests/distribution.test.ts tests/setupServer.ts tests/setupServer.test.ts` | 0 | none; all matched files use the correct format |
| `git diff --check` | 0 | none; no diagnostics |
| `node tmp/units/propagation-6-continue-state.ts` | 0 | none; captured 372 file hashes and an empty scratch baseline |
| `node tmp/units/propagation-6-continue-state.ts --finish` | 0 | none; only the owned distribution file changed; no removed files or remaining scratch directories |
| `node .agents/skills/orkestrel-dispatch/scripts/launch.ts --journal tmp/units/propagation-6-continue-gates.log --errors tmp/units/propagation-6-continue-gates.err --cap 2400 -- node tmp/units/propagation-6-continue-gates.ts` | 1 | Natural exit; `capped=false`; 200,741 ms |

The distribution suite completed naturally. Besides the adopter build failure, it reported these failures:

- The shipped-declaration example comparison omits the emitted `parseExtension` examples from its expected glossed list.
- The existing core/server adopter's prepublish chain fails the vendored configuration case `collects both browser setup proofs and optimizes every selected browser factory` with `Expected a configuration record`.
- The existing Vue setup fixture fails collection because `vue` cannot resolve and its Vue component lacks the required transform.

The required deviation report is:

- **Expected:** the complete generated selection builds and proceeds through every adopter assertion.
- **Found:** `npm run build` exits 1 in `src/styles/themes/index.scss` after lint and typechecking pass.
- **Evidence:** the complete failure output follows; the gate log records the exit, elapsed time, and successful teardown.
- **Done:** moved allocation outside the checkout, ran the prescribed gates through natural distribution completion, checked formatting, and verified cleanup and ownership.
- **Not done:** the adopter stages after build, page-stamp readings, CSS consumption, repair, and stale audit. No generator, seed, configuration, or additional test repair was attempted after the stop condition.
- **Hypothesis:** the themes seed places an emitted rule before its Sass `@use` directive.

Other deviations and limits follow:

- The stop condition ended the adopter. The enclosing distribution command continued its existing cases because the continuation explicitly required natural completion.
- The ordered launcher stopped at distribution's nonzero exit; the prescribed non-mutating format check ran separately.
- The earlier run's lint failure is resolved: the same adopter lint script exits 0 outside the checkout. No claim is made that the complete distribution suite passes.
- API Extractor reported its bundled TypeScript 5.9.3 against project TypeScript 6.0.3. Vite reported that explicit output configuration overrides library formats. The existing shell-based pack helper emitted Node's `DEP0190` warning.
- No install ran in the scaffold checkout. No subagent, commit, timeout change, suppression, or unowned source edit occurred.
- The read-only `Get-Process -Id 23604 -ErrorAction SilentlyContinue` lookup returned no process and shell exit 1 after natural completion. The separate `git diff --check` reading exited 0.

The final hash comparison preserves every unowned tracked or unignored file's starting bytes, including `host.json`. No adopter or run-created scaffold scratch directory remains under the checkout or host temporary directory. Reports, logs, and TypeScript instruments remain under the authorized `tmp/units/` directory. Evidence is recorded in `propagation-6-continue-gates.log`, `propagation-6-continue-gates.err`, `propagation-6-continue-gates.json`, `propagation-6-continue-finish.json`, `propagation-6-continue-final.status`, and `propagation-6-continue-diff.patch`.

The distribution runner's complete failure report follows, including the generated scripts' captured output. The repeated adopter build output is quoted here only.

```text
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 4 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |distribution| tests/distribution.test.ts > installed package consumer > runs the complete selection through a packed CLI adopter and repairs its wrapper
AssertionError: build

> @orkestrel/paper@0.0.1 build
> npm run clean && npm run build:src && npm run build:app

vite v8.3.1 building client environment for production...
transforming...
✓ 2 modules transformed.
rendering chunks...
computing gzip size...
dist/src/core/index.js  0.00 kB │ gzip: 0.02 kB

transforming...
✓ 2 modules transformed.
rendering chunks...
computing gzip size...
dist/src/core/index.cjs  0.00 kB │ gzip: 0.02 kB

✓ built in 39ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
vite v8.3.1 building client environment for production...
transforming...
✓ 2 modules transformed.
rendering chunks...
computing gzip size...
dist/src/browser/index.js  0.00 kB │ gzip: 0.02 kB

✓ built in 25ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
vite v8.3.1 building client environment for production...
transforming...
✓ 2 modules transformed.
rendering chunks...
computing gzip size...
dist/src/vue/index.js  0.00 kB │ gzip: 0.02 kB

✓ built in 26ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
vite v8.3.1 building client environment for production...
transforming...
✓ 3 modules transformed.
rendering chunks...
computing gzip size...
dist/src/styles/index.css  0.07 kB │ gzip: 0.08 kB
dist/src/styles/index.js   0.00 kB │ gzip: 0.02 kB

✓ built in 449ms
vite v8.3.1 building client environment for production...
transforming...
✓ 2 modules transformed.
npm notice run @orkestrel/paper@0.0.1 clean
npm notice run node -e "require('node:fs').rmSync('dist',{recursive:true,force:true})"
npm notice run @orkestrel/paper@0.0.1 build:src
npm notice run npm run build:src:core && npm run build:src:browser && npm run build:src:vue && npm run build:src:styles && npm run build:src:print
npm notice run @orkestrel/paper@0.0.1 build:src:core
npm notice run vite build --config configs/src/vite.core.config.ts && npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts
npm notice run @orkestrel/paper@0.0.1 copy
npm notice run node -e "const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)" dist/src/core/index.d.ts dist/src/core/index.d.cts
npm notice run @orkestrel/paper@0.0.1 build:src:browser
npm notice run vite build --config configs/src/vite.browser.config.ts
npm notice run @orkestrel/paper@0.0.1 build:src:vue
npm notice run vite build --config configs/src/vite.vue.config.ts
npm notice run @orkestrel/paper@0.0.1 build:src:styles
npm notice run vite build --config configs/src/vite.styles.config.ts && vite build --config configs/src/vite.themes.config.ts
✗ Build failed in 133ms
error during build:
Build failed with 1 error:

[plugin vite:css] C:/Users/mikes/AppData/Local/Temp/propagation-adopter-5TeBGl/generated/src/styles/themes/index.scss
Error: [sass] @use rules must be written before any other rules.
  ╷
3 │ @use 'default';
  │ ^^^^^^^^^^^^^^
  ╵
  src\styles\themes\index.scss 3:1  root stylesheet
[sass] @use rules must be written before any other rules.
  ╷
3 │ @use 'default';
  │ ^^^^^^^^^^^^^^
  ╵
  src\styles\themes\index.scss 3:1  root stylesheet
Error: @use rules must be written before any other rules.
  ╷
3 │ @use 'default';
  │ ^^^^^^^^^^^^^^
  ╵
  src\styles\themes\index.scss 3:1  root stylesheet
    at Object.wrapException (C:\Users\mikes\AppData\Local\Temp\propagation-adopter-5TeBGl\generated\node_modules\sass\sass.dart.js:2317:47)
    at ScssParser0.error$3 (C:\Users\mikes\AppData\Local\Temp\propagation-adopter-5TeBGl\generated\node_modules\sass\sass.dart.js:119170:17)
    at ScssParser0.error$2 (C:\Users\mikes\AppData\Local\Temp\propagation-adopter-5TeBGl\generated\node_modules\sass\sass.dart.js:119175:19)
    at ScssParser0.atRule$2$root (C:\Users\mikes\AppData\Local\Temp\propagation-adopter-5TeBGl\generated\node_modules\sass\sass.dart.js:125571:19)
    at ScssParser0._stylesheet0$_statement$1$root (C:\Users\mikes\AppData\Local\Temp\propagation-adopter-5TeBGl\generated\node_modules\sass\sass.dart.js:125163:22)
    at StylesheetParser_parse__closure0.call$0 (C:\Users\mikes\AppData\Local\Temp\propagation-adopter-5TeBGl\generated\node_modules\sass\sass.dart.js:129198:17)
    at ScssParser0.statements$1 (C:\Users\mikes\AppData\Local\Temp\propagation-adopter-5TeBGl\generated\node_modules\sass\sass.dart.js:120628:30)
    at StylesheetParser_parse_closure0.call$0 (C:\Users\mikes\AppData\Local\Temp\propagation-adopter-5TeBGl\generated\node_modules\sass\sass.dart.js:129184:23)
    at ScssParser0.wrapSpanFormatException$1$1 (C:\Users\mikes\AppData\Local\Temp\propagation-adopter-5TeBGl\generated\node_modules\sass\sass.dart.js:119201:25)
    at ScssParser0.wrapSpanFormatException$1 (C:\Users\mikes\AppData\Local\Temp\propagation-adopter-5TeBGl\generated\node_modules\sass\sass.dart.js:119258:19)
    at aggregateBindingErrorsIntoJsError (file:///C:/Users/mikes/AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/rolldown/dist/shared/error-Bj1xBdEY.mjs:49:18)
    at unwrapBindingResult (file:///C:/Users/mikes/AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/rolldown/dist/shared/error-Bj1xBdEY.mjs:19:128)
    at #build (file:///C:/Users/mikes/AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/rolldown/dist/shared/rolldown-jmAeXo_f.mjs:133:34)
    at async buildEnvironment (file:///C:/Users/mikes/AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/vite/dist/node/chunks/node.js:34445:66)
    at async Object.build (file:///C:/Users/mikes/AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/vite/dist/node/chunks/node.js:34866:19)
    at async Object.buildApp (file:///C:/Users/mikes/AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/vite/dist/node/chunks/node.js:34863:153)
    at async CAC.<anonymous> (file:///C:/Users/mikes/AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/vite/dist/node/cli.js:780:3) {
  errors: [Getter/Setter]
}
: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ Object.wrapException ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/sass/sass.dart.js:2317:47
 ❯ ScssParser0.error$3 ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/sass/sass.dart.js:119170:17
 ❯ ScssParser0.error$2 ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/sass/sass.dart.js:119175:19
 ❯ ScssParser0.atRule$2$root ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/sass/sass.dart.js:125571:19
 ❯ ScssParser0._stylesheet0$_statement$1$root ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/sass/sass.dart.js:125163:22
 ❯ StylesheetParser_parse__closure0.call$0 ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/sass/sass.dart.js:129198:17
 ❯ ScssParser0.statements$1 ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/sass/sass.dart.js:120628:30
 ❯ StylesheetParser_parse_closure0.call$0 ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/sass/sass.dart.js:129184:23
 ❯ ScssParser0.wrapSpanFormatException$1$1 ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/sass/sass.dart.js:119201:25
 ❯ ScssParser0.wrapSpanFormatException$1 ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/sass/sass.dart.js:119258:19
 ❯ aggregateBindingErrorsIntoJsError ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/rolldown/dist/shared/error-Bj1xBdEY.mjs:49:18
 ❯ unwrapBindingResult ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/rolldown/dist/shared/error-Bj1xBdEY.mjs:19:128
 ❯ #build ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/rolldown/dist/shared/rolldown-jmAeXo_f.mjs:133:34
 ❯ buildEnvironment ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/vite/dist/node/chunks/node.js:34445:66
 ❯ Object.build ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/vite/dist/node/chunks/node.js:34866:19
 ❯ Object.buildApp ../../AppData/Local/Temp/propagation-adopter-5TeBGl/generated/node_modules/vite/dist/node/chunks/node.js:34863:153
 ❯ tests/distribution.test.ts:286:65
    284|     )
    285|     expect(run.truncated).toBe(false)
    286|     expect(run.failed, `${script}\n${run.stdout}${run.stderr}`).toBe(f…
       |                                                                 ^
    287|     expect(run.code).toBe(0)
    288|    }

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/4]⎯

 FAIL  |distribution| tests/distribution.test.ts > installed package consumer > answers every example its shipped declarations print exactly as printed
AssertionError: expected [ …(35) ] to strictly equal [ …(33) ]

- Expected
+ Received

@@ -6,10 +6,12 @@
    "dist/src/core/index.d.ts: scaffolding.stages // one CompileRecord per stage that ran",
    "dist/src/core/index.d.ts: ).length // 1 — the range is not caret-pinned",
    "dist/src/core/index.d.ts: extractRangeMajor('^6') // the declared major",
    "dist/src/core/index.d.ts: isBlueprint({ name: 'router', src: ['core'] }) // false — not the whole record",
    "dist/src/core/index.d.ts: parseCompilerOptions({ on: { compile: () => {} } }) // the same record",
+   "dist/src/core/index.d.ts: parseExtension('browser:vue') // { surface: 'browser', name: 'vue', axes: [] }",
+   "dist/src/core/index.d.ts: parseExtension('styles:print') // { surface: 'styles', name: 'print' }",
    "dist/src/core/index.d.ts: planToSummary(plan).computed // the number of computed artifacts",
    "dist/src/core/index.d.ts: replacePlanRanges(plan, pins) // the plan carrying the resolved writable ranges",
    "dist/src/core/index.d.ts: selectGroups() // every group, in plan order",
    "dist/src/core/index.d.ts: serializeTypeScriptString(\"it's\") // `'it\\\\'s'`",
    "dist/src/core/index.d.ts: SHOWCASE_DEV_DEPENDENCIES['vite-plugin-singlefile'] // the showcase plugin range",

 ❯ tests/distribution.test.ts:805:20
    803|    // the line moving with it. The lists are long because most shipped…
    804|    // are prose, and reporting that is the point of naming them.
    805|    expect(glossed).toStrictEqual([
       |                    ^
    806|     "dist/src/core/index.d.ts: ) // { path: 'README.md', group: 'docs'…
    807|     'dist/src/core/index.d.ts: blueprintToDevDependencies(blueprint).t…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/4]⎯

 FAIL  |distribution| tests/distribution.test.ts > installed package consumer > installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]
AssertionError: Checking formatting...

All matched files use the correct format.
Finished in 979ms on 54 files using 16 threads.
vite v8.3.1 building client environment for production...
transforming...
✓ 2 modules transformed.
rendering chunks...
computing gzip size...
dist/src/core/index.js  0.00 kB │ gzip: 0.02 kB

transforming...
✓ 2 modules transformed.
rendering chunks...
computing gzip size...
dist/src/core/index.cjs  0.00 kB │ gzip: 0.02 kB

✓ built in 38ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
vite v8.3.1 building client environment for production...
transforming...
✓ 2 modules transformed.
rendering chunks...
computing gzip size...
dist/src/server/index.js  0.01 kB │ gzip: 0.03 kB

transforming...
✓ 2 modules transformed.
rendering chunks...
computing gzip size...
dist/src/server/index.cjs  0.00 kB │ gzip: 0.02 kB

✓ built in 37ms
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.
Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
vite v8.3.1 building client environment for production...
transforming...
✓ 2 modules transformed.
rendering chunks...
computing gzip size...
dist/bin/main.js  0.02 kB │ gzip: 0.04 kB

✓ built in 18ms

 RUN  v4.1.11 C:/Users/mikes/AppData/Local/Temp/scaffold-e4-install-7f9fgA/generated

···

 Test Files  3 passed (3)
      Tests  3 passed (3)
   Start at  00:24:22
   Duration  401ms (transform 89ms, setup 111ms, import 95ms, tests 20ms, environment 0ms)


 RUN  v4.1.11 C:/Users/mikes/AppData/Local/Temp/scaffold-e4-install-7f9fgA/generated

············································································································-·········

 Test Files  1 passed (1)
      Tests  117 passed | 1 skipped (118)
   Start at  00:24:23
   Duration  2.93s (transform 104ms, setup 17ms, import 284ms, tests 2.47s, environment 0ms)


 RUN  v4.1.11 C:/Users/mikes/AppData/Local/Temp/scaffold-e4-install-7f9fgA/generated

····x·····························································································································································································stdout | tests/config.test.ts > configuration helpers > rolls one face into a single declaration and rewrites its core and browser specifiers
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

··-stdout | tests/config.test.ts > configuration helpers > rolls one face into a single declaration and rewrites its core and browser specifiers
Analysis will use the bundled TypeScript version 5.9.3
*** The target project appears to use TypeScript 6.0.3 which is newer than the bundled compiler engine; consider upgrading API Extractor.

·

 Test Files  1 failed (1)
      Tests  1 failed | 196 passed | 1 skipped (198)
   Start at  00:24:27
   Duration  4.52s (transform 237ms, setup 16ms, import 538ms, tests 3.80s, environment 0ms)


npm notice run @orkestrel/proof@0.0.1 prepublishOnly
npm notice run npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:distribution -- --mode release
npm notice run @orkestrel/proof@0.0.1 format:check
npm notice run oxfmt --config .oxfmtrc.json --check .
npm notice run @orkestrel/proof@0.0.1 lint:check
npm notice run oxlint --config .oxlintrc.json --deny-warnings .
npm notice run @orkestrel/proof@0.0.1 check
npm notice run tsc --noEmit --project tsconfig.json && npm run check:src
npm notice run @orkestrel/proof@0.0.1 check:src
npm notice run npm run check:src:core && npm run check:src:server && npm run check:src:bin
npm notice run @orkestrel/proof@0.0.1 check:src:core
npm notice run tsc --noEmit -p configs/src/tsconfig.core.json
npm notice run @orkestrel/proof@0.0.1 check:src:server
npm notice run tsc --noEmit -p configs/src/tsconfig.server.json
npm notice run @orkestrel/proof@0.0.1 check:src:bin
npm notice run tsc --noEmit -p configs/src/tsconfig.bin.json
npm notice run @orkestrel/proof@0.0.1 build
npm notice run npm run clean && npm run build:src
npm notice run @orkestrel/proof@0.0.1 clean
npm notice run node -e "require('node:fs').rmSync('dist',{recursive:true,force:true})"
npm notice run @orkestrel/proof@0.0.1 build:src
npm notice run npm run build:src:core && npm run build:src:server && npm run build:src:bin
npm notice run @orkestrel/proof@0.0.1 build:src:core
npm notice run vite build --config configs/src/vite.core.config.ts && npm run copy dist/src/core/index.d.ts dist/src/core/index.d.cts
npm notice run @orkestrel/proof@0.0.1 copy
npm notice run node -e "const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)" dist/src/core/index.d.ts dist/src/core/index.d.cts
npm notice run @orkestrel/proof@0.0.1 build:src:server
npm notice run vite build --config configs/src/vite.server.config.ts && npm run copy dist/src/server/index.d.ts dist/src/server/index.d.cts
"build.lib.formats" will be ignored because "build.rolldownOptions.output" is already an array format.
npm notice run @orkestrel/proof@0.0.1 copy
npm notice run node -e "const fs=require('node:fs'),p=require('node:path'),a=process.argv[1],b=process.argv[2];fs.mkdirSync(p.dirname(b),{recursive:true});fs.cpSync(a,b,{force:true});console.log('Copied: '+a+' to '+b)" dist/src/server/index.d.ts dist/src/server/index.d.cts
npm notice run @orkestrel/proof@0.0.1 build:src:bin
npm notice run vite build --config configs/src/vite.bin.config.ts
npm notice run @orkestrel/proof@0.0.1 test
npm notice run npm run test:src && npm run test:policy && npm run test:config && npm run test:integration
npm notice run @orkestrel/proof@0.0.1 test:src
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core --project src:server --project src:bin
npm notice run @orkestrel/proof@0.0.1 test:policy
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project policy
npm notice run @orkestrel/proof@0.0.1 test:config
npm notice run vitest run --config vite.config.ts --no-cache --reporter=dot --project config

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |config| tests/config.test.ts > selected faces > collects both browser setup proofs and optimizes every selected browser factory
Error: Expected a configuration record
 ❯ readConfigRecord tests/config.test.ts:109:9
    107| export function readConfigRecord(value: unknown): Readonly<Record<stri…
    108|  if (typeof value !== 'object' || value === null || Array.isArray(valu…
    109|   throw new Error('Expected a configuration record')
       |         ^
    110|  return Object.fromEntries(Object.entries(value))
    111| }
 ❯ tests/config.test.ts:507:8

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

: expected 1 to be +0 // Object.is equality

- Expected
+ Received

- 0
+ 1

 ❯ tests/distribution.test.ts:1267:62
    1265|      shell: NPM_LAUNCHER.shell,
    1266|     })
    1267|     expect(gates.status, `${gates.stdout}\n${gates.stderr}`).toBe(0)
       |                                                              ^
    1268|    } finally {
    1269|     workspace.destroy()

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/4]⎯

 FAIL  |distribution| tests/distribution.test.ts > installed package consumer > renders a Vue SFC through the generated browser setup project [requires a reachable npm registry]
AssertionError: 
 RUN  v4.1.11 C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated


 Test Files  1 failed (1)
      Tests  no tests
   Start at  00:25:29
   Duration  4.01s (transform 0ms, setup 0ms, import 0ms, tests 0ms, environment 0ms)

JSON report written to C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/tmp/setup-vue-results.json

(!) Failed to run dependency scan. Skipping dependency pre-bundling. Error: The following dependencies are imported but could not be resolved:

  vue (imported by C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/tests/setupBrowser.ts)

Are they installed?
    at file:///C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:28264:33
    at file:///C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:35568:15
12:25:33 AM [vite] Internal server error: Failed to resolve import "vue" from "tests/setupBrowser.ts". Does the file exist?
  Plugin: vite:import-analysis
  File: C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/tests/setupBrowser.ts:2:26
  1  |  import { createApp } from "vue";
     |                             ^
  2  |  import SetupComponent from "../app/browser/SetupComponent.vue";
  3  |  export function renderSetupComponent(container) {
      at TransformPluginContext._formatLog (file:///C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:8736:39)
      at TransformPluginContext.error (file:///C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:8733:14)
      at normalizeUrl (file:///C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:26423:18)
      at file:///C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:26493:30
      at async Promise.all (index 0)
      at TransformPluginContext.transform (file:///C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:26459:4)
      at EnvironmentPluginContainer.transform (file:///C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:8515:14)
      at loadAndTransform (file:///C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:19998:26)
12:25:33 AM [vite] (client) Pre-transform error: Failed to parse source for import analysis because the content contains invalid JS syntax. Install @vitejs/plugin-vue to handle .vue files.
  Plugin: vite:import-analysis
  File: C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/app/browser/SetupComponent.vue:3:9
  1  |  <script setup lang="ts">
  2  |  const message = 'Generated Vue setup renders'
  3  |  </script>
     |           ^
  4  |  <template><p data-setup="vue">{{ message }}</p></template>
  5  |  

⎯⎯⎯⎯⎯⎯ Failed Suites 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |setup:browser (chromium)| tests/setupBrowser.test.ts [ tests/setupBrowser.test.ts ]
Error: Failed to import test file C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/tests/setupBrowser.ts
Caused by: TypeError: Failed to fetch dynamically imported module: http://localhost:63315/@fs/C:/Users/mikes/AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/tests/setupBrowser.ts?import&browserv=1790828733851
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

: expected 1 to be +0 // Object.is equality

- Expected
+ Received

- 0
+ 1

 ❯ ../../AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:28264:33
 ❯ ../../AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:35568:15
 ❯ TransformPluginContext._formatLog ../../AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:8736:39
 ❯ TransformPluginContext.error ../../AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:8733:14
 ❯ normalizeUrl ../../AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:26423:18
 ❯ ../../AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:26493:30
 ❯ TransformPluginContext.transform ../../AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:26459:4
 ❯ EnvironmentPluginContainer.transform ../../AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:8515:14
 ❯ loadAndTransform ../../AppData/Local/Temp/scaffold-vue-setup-install-FfZUJJ/generated/node_modules/vite/dist/node/chunks/node.js:19998:26
 ❯ tests/distribution.test.ts:1383:60
    1381|      { workspace: generated.path, environment: generated.environment, …
    1382|     )
    1383|     expect(proof.code, `${proof.stdout}\n${proof.stderr}`).toBe(0)
       |                                                            ^
    1384|     expect(proof.stdout).toContain('setup:browser')
    1385|     expect(proof.stdout).toContain('tests/setupBrowser.test.ts')

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/4]⎯
```
