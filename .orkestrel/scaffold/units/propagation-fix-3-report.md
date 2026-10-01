# Propagation-fix-3 report

Stopped at the generated-script failure required by the original brief, Execution 14. The packed adopter passed lint, typechecking, and build, then `test:src` failed because its `src:styles` browser project found no test files. Acceptance remains unmet. No implementation edit followed that failure.

## Blocking deviation

- **Expected:** the complete packed adopter runs every generated gate, verifies showcase page stamps and CSS consumption, repairs its wrapper, and audits stale content.
- **Found:** `test:src` exited 1 after its ordinary source projects passed and its styles and themes builds succeeded. The generated-file reading includes `tests/src/styles/index.test.ts` and `tests/src/styles/themes/index.test.ts`, but the browser project reported no test files.
- **Evidence:** `tmp/units/propagation-fix-3-resume.log` records the generated paths and the bare failure quoted below.
- **Done:** completed the owned repairs, regenerated the materialized configuration and host inventory, ran the gates through distribution, and let distribution finish naturally. Recorded final read-only format, whitespace, ownership, and cleanup checks.
- **Not done:** a successful adopter, its downstream readings, or the subsequent `desk` scratch generation. The brief requires stopping on a generated-script failure.
- **Hypothesis:** the generated browser project's discovery configuration fails to select the emitted styles proofs. This is unconfirmed; no repair was attempted after the stop.

## Files changed

- `.claude/rules/application.md`
- `.claude/rules/architecture.md`
- `.claude/rules/browser.md`
- `.claude/rules/documentation.md`
- `.claude/rules/styles.md`
- `.claude/rules/workspace.md`
- `configs/policy.ts`
- `configs/src/vite.bin.config.ts`
- `guides/scaffold.md`
- `host.json`
- `src/core/compilers.ts`
- `src/core/parsers.ts`
- `src/core/templates.ts`
- `src/core/types.ts`
- `src/core/validators.ts`
- `tests/config.test.ts`
- `tests/distribution.test.ts`
- `tests/guides.test.ts`
- `tests/setupPolicy.test.ts`
- `tests/setupPolicy.ts`
- `tests/setupServer.ts`
- `tests/src/bin/CLI.test.ts`
- `tests/src/core/compilers.test.ts`
- `tests/src/core/templates.test.ts`
- `vite.config.ts`

The owned changes above are measured against the original unit's starting bytes, so they include the drafts completed by this continuation. The final comparison against this continuation's starting snapshot found no unowned changes, additions, or removals. The older snapshot additionally differs at `.orkestrel/scaffold/ledger.md`; that difference predates this continuation, whose starting bytes remain unchanged. Earlier campaign changes remain intact. `tests/setupServer.ts` changed only the fixture's SFC path and import. `tests/setupServer.test.ts` needed no change. The identity files and `host.json` changed through regeneration only.

Evidence remains under `tmp/units/propagation-fix-3-*`: `diff.patch` contains the unit-relative diff; `finish.json` records the full unit's changed files; `close.json` records continuation ownership, formatting, and cleanup; `continue-gates.*` and `resume.*` contain bare gate output and results.

## Rulings and executed evidence

| Ruling | Change and pinning evidence | Result |
| --- | --- | --- |
| Claim 2 | `blueprintToFaces` projects browser extensions onto occupied axes. Every face compiler uses the projection. `projects only occupied browser axes across every compiler` covers both, individual, and absent axes; the advisory case excludes `appVue` and `srcVue` for the unplaced selection. | Core and guide suites passed. |
| 10a, F4 | Architecture admits methods and accessors in admitted literals, stops at their bodies, and names `app/vue/main.ts`. The policy nested-function cases and the guide's complete emitted-root RuleTester case execute the boundary. | Policy and guide suites passed. |
| 10b | Workspace and documentation sentences name `showcase/<application>.html` and `browser.html`. Compiler mode assertions and the guide's showcase example cover emitted pages. | Core and guide suites passed; adopter page stamps were not reached. |
| 10g, 10h | Workspace sentences name setup seed selection and Vue check scopes. Setup-runtime compiler cases and the guide's Vue scope assertions execute those selections. | Core and guide suites passed. |
| F3 | Browser and application rules place published TypeScript in `src/vue` and SFCs in `app/vue`. The guide proof checks the sentence and source/application includes. | Guide suite passed. |
| 10c, 10d | Guide registration includes sheet faces and distinguishes authored setup proofs from seeded proofs and the policy mirror. Sheet ownership, setup registration, and sibling-proof guide cases assert the text and behavior. | Guide suite passed. |
| 10e | Guide writable-region prose names framework and showcase commands. Vue and showcase cases inspect writable membership. | Core and guide suites passed. |
| 10f | The unplaced-extension guide assertion refuses both root Vue factories. | Guide suite passed. |
| 11a | `collectSheets`, `collectFrameworks`, `readConfigRecord`, `readConfigScript`, `collectFaceWrappers`, `inspectSheetConfiguration`, and `readImportDiagnostics` live in `tests/setupPolicy.ts`. Their sibling cases cover accepted and refusing inputs. Config scratch allocations use `createPolicyScratch`; its optional parent is proved by child cleanup preserving the parent. The plain-object JSON round trip is removed. | Setup, config, and policy suites passed; no fleet-name collision. |
| 11b | Global and styles test templates expose `module` and `proof`; integration variants share their group. Readers and snapshots follow. | Core suite and emitted-format case passed. |
| 11c | `isPolicyPosition` supplies callback, returned-result, and nested-method admission. | Policy suite passed. |
| 11d | Extension guards have examples; added examples have imports. Guide parity and shipped-declaration example assertions execute them. | Guide suite and shipped-example distribution case passed. |
| 11e | The styles seed exports `SheetAdoption`; `adoptSheet` returns it and the seeded proof uses its type. The vacuous inequality was removed; empty and unlayered controls remain. | Core type/format cases passed. The packed adopter did not reach successful browser styles execution. |
| F1 | Executable root factory and wrapper delegate externalization to `resolveExternal`, preserving `@src/`. | Core identity, config, build, and CLI suites passed. |
| F2 | Setup-runtime, writable-script, source/test artifact, and advisory TSDoc now describe the implementation. | Guide parity passed. |
| F5 | The generated index lists occupied Vue source/test/directory faces and selected showcase pages. `indexes occupied framework faces and selected showcase pages` covers enabled, disabled, and unplaced selections. Guide description and assertions follow. | Core and guide suites passed. The final CLI scratch reading was not run after the stop. |
| Writable-region referral | Selected showcase and framework journey scripts enter the writable region. `owns selected showcase and framework journey scripts while retaining authored commands` covers selection, custom commands, absent selection, and a predecessor manifest. | Core suite and mutation proof passed. |
| Factory-binding referral | Filename and external callbacks are module declarations. Showcase plugin methods occupy admitted literals. Emitted bytes were copied from the formatter's scratch output; snapshots follow. | Core fixed-point/type cases, identity case, guide RuleTester, config, and build passed. |
| Global-setup referral | The seeded proof calls the real seeded `setup` repeatedly. `runs the seeded global proof against setup and rejects a teardown-returning control` runs child Vitest against the seed and a changed implementation. | Seed passed its case; the teardown-returning control failed its case as expected. The retained parent case passed in core. |
| Anchoring referral | `excludes an indented module augmentation export and detects a top-level export` pins `^export ` with opposite controls. | Setup suite passed. |
| 13A | Themes seed is exactly `@use '../tokens';` followed by `@use 'default';`. Themes-only blueprints also seed the required tokens file. Rule and guide assertions follow. | Core, guide, config, and adopter Sass builds passed. |
| 13B | Distribution's exact glossed-example list includes the browser and styles `parseExtension` entries. | Shipped-example distribution case passed. |
| 13C | Browser optimization reads an absent browser record as an empty record, avoiding the Node-only integration failure. | Config suite passed. |
| 13D | Fixture SFC and import use `app/vue/SetupComponent.vue`. Its generated blueprint explicitly selects the Vue application extension. | Vue SFC browser-setup distribution case passed. |

The writable membership mutation proof passed type and lint checks for the case and control. Its control excluded showcase commands and failed the runtime assertion:

```text
receipt probe:440f710dd577c11bd1014225dbdd13eb:runtime:typescript@6.0.3:oxlint@1.86.0:vitest@4.1.11:tsconfig.json@3ff9b49b1844f028f70056f15aabfc0d
```

The inherited projection proof restored raw axes in its control and failed the unplaced-factory assertion. Its receipt covers that earlier claim; the continuation's core and guide runs validate the retained matrix:

```text
receipt probe:efc69cfdd6f1f173a18722d7cfe0ec6c:runtime:typescript@6.0.3:oxlint@1.86.0:vitest@4.1.11:tsconfig.json@3ff9b49b1844f028f70056f15aabfc0d
```

## Identity-set diffs

The compiler regeneration probe passed and changed only `vite.config.ts` and `configs/src/vite.bin.config.ts`. The other materialized configuration files retained their bytes. These unit-relative diffs contain the callback hoisting and F1 externalization:

```diff
diff --git a/tmp/units/propagation-fix-3-start/vite.config.ts b/vite.config.ts
index 4d56f2eb0..73f4ef235 100644
--- a/tmp/units/propagation-fix-3-start/vite.config.ts
+++ b/vite.config.ts
@@ -107,6 +107,17 @@ function isNamedPlugin(plugin: PluginOption): plugin is { name: string } {
 	)
 }
 
+function resolveSourceExternal(id: string): boolean {
+	return (
+		id === '@src/core' ||
+		resolveExternal(id, {
+			peers,
+			refused: [],
+			siblings: [resolveWorkspacePath('src/core/index.ts')],
+		})
+	)
+}
+
 export function srcCore(override?: UserConfig): UserConfig {
 	const project: UserConfig = {
 		resolve,
@@ -128,6 +139,10 @@ export function srcCore(override?: UserConfig): UserConfig {
 	return mergeOverride(project, override)
 }
 
+function resolveServerFilename(format: string): string {
+	return format === 'es' ? 'index.js' : 'index.cjs'
+}
+
 export function srcServer(override?: UserConfig): UserConfig {
 	const project: UserConfig = {
 		resolve,
@@ -140,20 +155,14 @@ export function srcServer(override?: UserConfig): UserConfig {
 			lib: {
 				entry: resolveWorkspacePath('src/server/index.ts'),
 				formats: ['es', 'cjs'],
-				fileName: (format: string) => (format === 'es' ? 'index.js' : 'index.cjs'),
+				fileName: resolveServerFilename,
 			},
 			outDir: 'dist/src/server',
 			target: 'node22',
 			rolldownOptions: {
 				onLog: enforceBuildLog,
 				platform: 'node',
-				external: (id: string) =>
-					id === '@src/core' ||
-					resolveExternal(id, {
-						peers,
-						refused: [],
-						siblings: [resolveWorkspacePath('src/core/index.ts')],
-					}),
+				external: resolveSourceExternal,
 				output: [
 					{
 						format: 'es',
@@ -180,6 +189,14 @@ export function srcServer(override?: UserConfig): UserConfig {
 	return mergeOverride(project, override)
 }
 
+function resolveBinFilename(): string {
+	return 'main.js'
+}
+
+function resolveBinExternal(id: string): boolean {
+	return id.startsWith('@src/') || resolveExternal(id, { peers, refused: [], siblings: [] })
+}
+
 export function srcBin(override?: UserConfig): UserConfig {
 	const project: UserConfig = {
 		resolve,
@@ -192,17 +209,13 @@ export function srcBin(override?: UserConfig): UserConfig {
 			lib: {
 				entry: resolveWorkspacePath('src/bin/main.ts'),
 				formats: ['es'],
-				fileName: () => 'main.js',
+				fileName: resolveBinFilename,
 			},
 			outDir: 'dist/bin',
 			target: 'node22',
 			rolldownOptions: {
 				onLog: enforceBuildLog,
-				external: (id: string) =>
-					id.startsWith('node:') ||
-					id.startsWith('@orkestrel/') ||
-					id.startsWith('@src/') ||
-					peers.some((peer) => id === peer || id.startsWith(peer + '/')),
+				external: resolveBinExternal,
 			},
 		},
 		test: {
```

```diff
diff --git a/tmp/units/propagation-fix-3-start/configs/src/vite.bin.config.ts b/configs/src/vite.bin.config.ts
index 732dc4b47..b731b7684 100644
--- a/tmp/units/propagation-fix-3-start/configs/src/vite.bin.config.ts
+++ b/configs/src/vite.bin.config.ts
@@ -1,5 +1,6 @@
 import { defineConfig } from 'vite'
-import { srcBin } from '../../vite.config.ts'
+import { resolveExternal } from '../helpers.js'
+import { peers, srcBin } from '../../vite.config.ts'
 
 // The `scaffold` executable build — a single ESM lib file, no declarations (an
 // executable ships no types), with the `#!/usr/bin/env node` shebang re-emitted through
@@ -10,6 +11,8 @@ export default defineConfig(
 	srcBin({
 		build: {
 			rolldownOptions: {
+				external: (id: string) =>
+					id.startsWith('@src/') || resolveExternal(id, { peers, refused: [], siblings: [] }),
 				output: {
 					banner: '#!/usr/bin/env node',
 					paths: {
```

`npm run build` regenerated `host.json`. The subsequent server and config inventory assertions passed. Its changed digests correspond to the owned vendored rule, guide, config, and test-infrastructure edits; it was not hand-edited.

## Packed adopter

| Step | Exit | Measured duration |
| --- | --- | --- |
| Pack and consumer install | 0 | none reported |
| Generate complete selection | 0 | none reported |
| Install generated workspace | 0 | 7 s reported by npm |
| `lint:check` | 0 | 971 ms |
| `check` | 0 | 11935 ms |
| `build` | 0 | 18045 ms |
| `test:src` | 1 | 8454 ms |
| Subsequent adopter steps | not run | none |

The failing script output was:

```text
adopter: test:src: exit 1, 8454 ms

> @orkestrel/paper@0.0.1 test:src
> vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core --project src:browser --project src:vue && npm run test:src:styles && npm run test:src:print


 RUN  v4.1.11 C:/Users/mikes/AppData/Local/Temp/propagation-adopter-FS9npj/generated

···

 Test Files  3 passed (3)
      Tests  3 passed (3)
   Start at  01:05:41
   Duration  4.57s (transform 22ms, setup 51ms, import 55ms, tests 8ms, environment 0ms)

vite v8.3.1 building client environment for production...
transforming...
✓ 3 modules transformed.
rendering chunks...
computing gzip size...
dist/src/styles/index.css  0.07 kB │ gzip: 0.08 kB
dist/src/styles/index.js   0.00 kB │ gzip: 0.02 kB

✓ built in 201ms
vite v8.3.1 building client environment for production...
transforming...
✓ 3 modules transformed.
rendering chunks...
computing gzip size...
dist/src/styles/themes/index.css  0.07 kB │ gzip: 0.08 kB
dist/src/styles/themes/index.js   0.00 kB │ gzip: 0.02 kB

✓ built in 155ms

 RUN  v4.1.11 C:/Users/mikes/AppData/Local/Temp/propagation-adopter-FS9npj/generated


npm notice run @orkestrel/paper@0.0.1 test:src:styles
npm notice run npm run build:src:styles && vitest run --config vite.config.ts --no-cache --reporter=dot --project src:styles
npm notice run @orkestrel/paper@0.0.1 build:src:styles
npm notice run vite build --config configs/src/vite.styles.config.ts && vite build --config configs/src/vite.themes.config.ts
No test files found, exiting with code 1

projects: src:styles

|src:styles (chromium)| 

include: tests/src/styles/**/*.test.ts
exclude:  **/node_modules/**, **/.git/**



stdout | tests/distribution.test.ts > installed package consumer > runs the complete selection through a packed CLI adopter and repairs its wrapper
adopter: wall time 54738 ms; scratch removed: true
```

Page stamps: none. CSS-consumer result: none; successful CSS emission is recorded above, but the consumer check was not reached. Repair byte comparison: none. Stale audit reading: none. Adopter wall time: 54738 ms. Scratch removal was reported true and confirmed by the closing filesystem check.

## Final scratch readings

- Generated `guides/README.md`: none; the prescribed `desk` generation follows distribution and was not run after the stop.
- Generated manifest showcase and journey scripts: none for that scratch; core and guide assertions passed.
- Generated root factory bodies: none for that scratch; emitted-root RuleTester, formatting, and type cases passed.

No `os.tmpdir()/scaffold-fix-3` directory or unit-owned probe remains.

## Commands and results

`<owned files>` is the explicit path list in `tmp/units/propagation-fix-3-continue-gates.ts` and `propagation-fix-3-close.ts`. `npm exec --` invokes the same installed executables as the requested `npx` commands. Gate output was read without a filtering pipeline.

| Command | Exit | Test count or result |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --write <owned files>` | 0 | formatted owned scope |
| `git diff --check` | 0 | no whitespace errors |
| `npx tsc --noEmit --project tsconfig.json` | 0 | none |
| `npm run check:src:core` | 0 | none |
| `npm run check:src:server` | 0 | none |
| `npm run check:src:bin` | 0 | none |
| `npx oxlint --config .oxlintrc.json src tests configs` | 0 | none |
| `npm run test:src:core` | 0 | 479 passed |
| `npm run test:src:server`, before inventory regeneration | 1 | 2 failed, 476 passed, 7 skipped; stale owned host digests |
| `npm run build` | 0 | host and inventory regenerated |
| `npm run test:src:server`, after build | 0 | 478 passed, 7 skipped |
| `npm run test:src:bin` | 0 | 286 passed |
| `npm run test:setup` | 0 | 188 passed, 3 skipped |
| `npm run test:config` | 0 | 197 passed, 1 skipped |
| `npm run test:policy` | 0 | 118 passed |
| `npm run test:guides` | 0 | 45 passed |
| `npm run lint:check` | 0 | none |
| `npm run test:distribution` | 1 | 1 failed, 9 passed, 1 skipped; 195.90 s Vitest duration |
| `npx oxfmt --config .oxfmtrc.json --check <owned files>` | 0 | read-only final check |
| Final `git diff --check` | 0 | no whitespace errors |

Additional development and evidence commands:

| Command | Exit | Test count or result |
| --- | --- | --- |
| `node tmp/units/propagation-fix-3-continue-state.ts` | 0 | starting bytes captured |
| `node node_modules/vitest/vitest.mjs run --config vite.config.ts --project src:core tests/src/core/templates.test.ts -t "is an oxfmt fixed point"` | 1 | 1 failed, 36 filtered; reproduced draft plugin indentation |
| Focused Vitest run of `tests/src/core/compilers.test.ts` and `tests/src/core/templates.test.ts`, logged as `files.log` | 1 | 7 failed, 199 passed; snapshots, formatter bytes, helper import detection, and typed control repaired |
| Same focused run, `files-2.log` | 1 | 38 passed; compiler suite failed collection on doubled snapshot escaping |
| Same focused run, `files-3.log` | 1 | 1 failed, 205 passed; themes-only expected paths needed the required tokens seed |
| Identity regeneration probe in project `probe` | 0 | 1 passed; regenerated from compiler output; probe removed |
| Root TypeScript checks during editing | 1, then 0 | guide proof used `markdown` before declaration; fixed |
| Scoped Oxlint during editing | 1, then 0 | invalid second `expect` argument; fixed |
| Owned formatter writes during editing | 0 | emitted scratch bytes and owned files formatted |
| Early scratch formatter invocation | 1 | no target existed yet; later stdin formatter run succeeded |
| `node tmp/units/propagation-fix-3-continue-edit.ts` | 1 | stopped on an unmatched indentation replacement after preceding replacements; remaining edits completed explicitly |
| `node tmp/units/propagation-fix-3-continue-format.ts` | 0 | copied formatter bytes into the template |
| `node node_modules/oxfmt/bin/oxfmt --config .oxfmtrc.json --stdin-filepath showcase.ts` | 0 | formatter output saved as `propagation-fix-3-showcase-format.ts`; that file was a formatting artifact, not executed |
| `node tmp/units/propagation-fix-3-snapshot.ts` | 0 | aligned the emitted showcase snapshot |
| Attempted build using a guessed npm CLI path | 1 | `MODULE_NOT_FOUND`; no build ran; corrected launch resolved npm beside `process.execPath` |
| Capped launch of `propagation-fix-3-continue-gates.ts` | 1 | stopped at stale-inventory server assertions |
| Capped launch of `propagation-fix-3-resume.ts` | 1 | completed distribution naturally; 337157 ms launcher duration; uncapped |
| `node tmp/units/propagation-fix-3-close.ts` | 0 | final checks, ownership, and cleanup readings |
| `node tmp/units/propagation-fix-3-finish.ts` | 0 | full unit-relative hashes and diff |
| `node tmp/units/propagation-fix-3-report.ts` | 0 | assembled this report from saved evidence |
| `git diff --no-index` for changed files | 1 per diff | expected differences |
| `git status --porcelain`, `git diff`, `Get-Content`, and `rg` inspections | 0, or 1 for no-match searches | no test count |

The previous run's state, projection, helper, grouping, documentation, hoisting, and finish instruments exited 0. Its root typecheck passed; its final whitespace check exited 1 for the extra EOF blank line in `tests/setupPolicy.ts`, now cleared. Its scout census exited 0. Both `prove` tools returned receipts rather than shell exit codes.

## Other deviations

- The specified gate order exposed stale host digests before the planned build. The failures referred to owned vendored edits. Ran the authorized build and repeated the same server command to green before continuing. No server implementation was changed.
- The Vue fixture test already generates through `installGeneratedWorkspace` with a blueprint expression. Added the equivalent explicit `browser:vue` application extension there; did not replace its harness with a CLI command or edit the shared helper.
- The committed predecessor's base showcase commands already equal their current generated commands. The predecessor case uses those actual strings. Newly introduced framework variants have no older generated spelling; no invented predecessor was added.
- Themes-only compiler selections needed `src/styles/_tokens.scss` once the barrel imported it. Added that birth-owned seed and updated the existing themes-only matrix.
- No implementation continued after the generated-script stop. Only completion of the running distribution command and read-only closing/report work followed. The requested standalone scratch generation remains unrun.

No subagent or commit was created. No dependency was added to this checkout. Installs occurred only inside the prescribed distribution fixtures. No earlier campaign work was cleaned or reverted. Acceptance criteria remain unmet.
