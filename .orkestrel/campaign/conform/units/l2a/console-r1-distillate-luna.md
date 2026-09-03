## Question
For each conform-console row, the current tree, diff, old-form sweep, report reading, and proof evidence are mapped below.

## Evidence

### Per-row evidence

1. **console-obj-1**
   - **Site now:** `tests/guides.test.ts:55-59` maps the three published specifiers. The guard at `:177-181` now resolves each fence through `sources.source(specifier)`.
   - **Diff:** `@@ -22,22 +22,40 @@`; `@@ -52,6 +70,9 @@`. The operative `MODULES` replacement is present at `tests/guides.test.ts:55-59`.
   - **Old-form sweep:** `\b@src/(core|browser|server)\b` over `src`, `tests`, `guides/console.md`, `guides/README.md`, and `README.md`: hits remain in source/test imports and prose; the removed `MODULES` entries are absent. The report did not record this required path sweep.
   - **Report reading:** `applied` — “`MODULES` ... now maps `@orkestrel/console`, `@orkestrel/console/browser`, `@orkestrel/console/server`.”
   - **Proof:** `/home/user/work/evidence/console-proofs/console-obj-1-red-stale-fence.txt`: `Tests 2 failed | 66 passed (68)`. `/home/user/work/evidence/console-proofs/console-obj-1-5-green.txt`: `Tests 68 passed (68)`. The control matches.

2. **console-obj-2**
   - **Site now:** `tests/guides.test.ts:201-470` adds `describe('flagship fences')`; `:218` declares nested `function visible`; representative assertions are at `:242`, `:297`, `:370`, and `:390`.
   - **Diff:** `@@ -180,3 +201,272 @@`; the execution block and assertions are present.
   - **Old-form sweep:** No removed identifier applies.
   - **Report reading:** `applied` — “Added `describe('flagship fences')` ...”
   - **Proof:** `/home/user/work/evidence/console-proofs/console-obj-2-control-planted.txt`: `Tests 1 failed | 84 passed (85)`, with the expected `1.23s` versus `1234ms` failure. `/home/user/work/evidence/console-proofs/gate-test.txt`: `Tests 85 passed (85)`. The reporter transcription matches.
   - **Finding:** The added `visible` declaration violates the architecture rule against nested functions at `tests/guides.test.ts:218-220`.

3. **console-obj-3**
   - **Site now:** `tests/src/browser/helpers.test.ts:243-245` uses `performance.now()`; `:248` retains `toBeLessThan(2000)`.
   - **Diff:** `@@ -240,9 +240,9 @@`; both replacements are present.
   - **Old-form sweep:** `Date.now()` at this proof site: no hit.
   - **Report reading:** `applied` — “measures the no-blowup interval with `performance.now()`.”
   - **Proof:** No named control file exists for this row. The report supplies no failing-first command and count.

4. **console-obj-4**
   - **Site now:** `tests/src/core/Spinner.test.ts:187-191`, `:208-212`, and `:228-232` call `waitForCondition`; `waitForFrames` is absent.
   - **Diff:** `@@ -36,13 +36,9 @@`, `@@ -188,7 +184,10 @@`, `@@ -206,7 +205,11 @@`, and `@@ -222,7 +225,10 @@`. The operative calls are present.
   - **Old-form sweep:** `\bwaitForFrames\b` and its `-s/-ed/-ing` forms over the required paths: no hit.
   - **Report reading:** `applied` — “Deleted `waitForFrames` ... waits with `waitForCondition`.”
   - **Proof:** `/home/user/work/evidence/console-proofs/console-obj-4-control-planted.txt`: `Tests 1 failed | 450 passed (451)` and the condition-description failure. `/home/user/work/evidence/console-proofs/console-obj-4-green.txt`: `Tests 451 passed (451)`. The control matches.

5. **console-obj-5**
   - **Site now:** The factory site no longer exists. `src/server/ProcessCapture.ts:68` carries the class, and `src/server/factories.ts:50-80` contains only `createServerSink`. The guide uses `ProcessCapture` at `guides/console.md:600,613`.
   - **Diff:** `src/server/factories.ts` has `@@ -1,12 +1,6 @@` and `@@ -85,35 +80,3 @@`; the deletion is present. Consumer replacements appear in `README.md:70-74`, the guide, and server tests.
   - **Old-form sweep:** `\bcreateProcessCapture\b` and case-insensitive inflections over the required paths: no hit.
   - **Report reading:** `applied` — “BREAKING. Deleted `createProcessCapture` ... every consumer moved to `new ProcessCapture(...)`.”
   - **Proof:** The stale-fence control records `Tests 2 failed | 66 passed (68)`; the final control records `Tests 68 passed (68)`. The report’s combined proof matches.

6. **console-obj-6**
   - **Site now:** `tests/setupServer.ts:70-82` returns an object with a `write` method; no local `const write` remains.
   - **Diff:** `@@ -72,9 +72,11 @@`; the method form is present.
   - **Old-form sweep:** No removed name applies. The report supplies no placement sweep.
   - **Report reading:** `applied` — “`createWriteProbe` returns an object literal whose `write` is a method.”
   - **Proof:** Placement row; no control file is named.

7. **console-obj-7**
   - **Site now:** `tests/setupBrowser.ts:39-47` returns `restore(): void` as an object method.
   - **Diff:** `@@ -36,10 +36,14 @@`; the method form is present.
   - **Old-form sweep:** No removed name applies. The report supplies no placement sweep.
   - **Report reading:** `applied` — “`captureConsole` declares `restore(): void` as a method.”
   - **Proof:** Placement row; no control file is named.

8. **console-obj-8**
   - **Site now:** The old flat files are absent. `src/core/loggers/Logger.ts:52` and `LoggerManager.ts:44` are present; mirrored tests are under `tests/src/core/loggers/`.
   - **Diff:** Rename hunks are present for both source files and both tests; `src/core/index.ts:5-9` exports the new paths.
   - **Old-form sweep:** Old paths `src/core/Logger.ts`, `src/core/LoggerManager.ts`, and their test paths: no hit.
   - **Report reading:** `applied` — “`Logger.ts` and `LoggerManager.ts` moved to `src/core/loggers/`.”
   - **Proof:** `/home/user/work/evidence/console-proofs/console-obj-8-9-guides.txt`: `Tests 68 passed (68)`. `/home/user/work/evidence/console-proofs/console-obj-8-9-after-move.txt`: `Tests 451 passed (451)`.

9. **console-obj-9**
   - **Site now:** The old flat renderer file is absent. `src/core/renderers/ANSIRenderer.ts:25` is present; `src/core/index.ts:6` and `src/core/factories.ts:11` use the new path.
   - **Diff:** Rename hunk plus `@@ -2,9 +2,9 @@` in the barrel and the factory import hunk are present.
   - **Old-form sweep:** `src/core/ANSIRenderer.ts` and `tests/src/core/ANSIRenderer.test.ts`: no hit.
   - **Report reading:** `applied` — “`ANSIRenderer.ts` moved to `src/core/renderers/`.”
   - **Proof:** The combined guide and core controls above match.

10. **console-subj-1**
    - **Site now:** `src/core/loggers/LoggerManager.ts:119-128` initializes `removed = true`, attempts every name, and returns the all-succeed result. The interface documents it at `src/core/types.ts:487-491`; tests pin it at `tests/src/core/loggers/LoggerManager.test.ts:228-239`.
    - **Diff:** `@@ -118,9 +119,11 @@` and `@@ -488,7 +487,8 @@`; the exact accumulation is present.
    - **Old-form sweep:** `true when any was removed`: no hit.
    - **Report reading:** `applied` — “`remove(names)` attempts every name and returns `true` only when every one was present.”
    - **Proof:** Red: `Tests 2 failed | 449 passed (451)`. Green: `Tests 451 passed (451)`. The control matches.

11. **console-subj-2**
    - **Site now:** `src/core/Progress.ts:102-110` exposes `succeed`; `:58`, `:83-85`, and `:109` use `succeeded` and the `succeed` event. Types are at `src/core/types.ts:1130-1145` and `:1201-1218`. Guide methods are at `guides/console.md:373-378`.
    - **Diff:** Progress and type hunks replace `complete`, `completed`, and the event with `succeed`/`succeeded`.
    - **Old-form sweep:** API-shaped `complete\(|completed\b|'complete'` over the required paths: no hit. Generic prose still contains `complete` at `guides/console.md:82,188`, `src/core/constants.ts:465`, and other unrelated sites. The report’s sweep covered only `Progress.ts` and its test.
    - **Report reading:** `applied` — “`Progress.complete` → `succeed`, `completed` → `succeeded`, event `complete` → `succeed`.”
    - **Proof:** No dedicated control file is named; this is a naming/API row.

12. **console-subj-3**
    - **Site now:** `src/core/types.ts:972-980` declares `BarOptions`; `src/core/helpers.ts:704-707` accepts it; guide rows are at `guides/console.md:145,230`.
    - **Diff:** `@@ -969,7 +969,7 @@`, helper import/signature hunks, and the guide replacement are present.
    - **Old-form sweep:** `\bProgressBarOptions\b` and inflections over the required paths: no hit.
    - **Report reading:** `applied` — “`ProgressBarOptions` → `BarOptions` in `types.ts`, `helpers.ts`, ... and the guide rows.”
    - **Proof:** No dedicated control file is named.

13. **console-subj-4**
    - **Site now:** `src/browser/helpers.ts:149-155` declares `scanParameters`; its call is at `:86`; tests use it at `tests/src/browser/helpers.test.ts:404-439`; the guide row is `guides/console.md:228`.
    - **Diff:** `@@ -145,4 +138,5 @@` and the call/test renames are present.
    - **Old-form sweep:** `\bparseParameters\b` and inflections over the required paths: no hit.
    - **Report reading:** `applied` — “`parseParameters` → `scanParameters`; placement stays `src/browser/helpers.ts`.”
    - **Proof:** No dedicated control file is named.

14. **console-subj-5**
    - **Site now:** `src/server/types.ts:54-59` declares `stdout`/`stderr`; `src/server/factories.ts:55-59` reads them; the guide row is `guides/console.md:248`.
    - **Diff:** `@@ -39,19 +39,21 @@`, `@@ -55,9 +50,9 @@`, and test replacement hunks are present.
    - **Old-form sweep:** Option-key pattern `\b(out|err)\s*:` over `src/server` and `tests/src/server`: no hit. Short local variables and prose remain at `src/server/factories.ts:52-53` and `tests/setupServer.ts:38`; the report did not perform the required broader case-insensitive sweep.
    - **Report reading:** `applied` — “`ServerSinkOptions.out` / `.err` → `stdout` / `stderr`.”
    - **Proof:** No dedicated control file is named.

15. **console-subj-6**
    - **Site now:** `src/core/helpers.ts:257-263` uses `columns` in `align`; `:326-331` uses it in `repeatTo`; their `@param` lines are `:246` and `:317`.
    - **Diff:** `@@ -254,10 +254,10 @@` and `@@ -323,12 +323,12 @@`; body references are updated.
    - **Old-form sweep:** Parameter declarations `align(text, target` and `repeatTo(unit, count` plus their `@param` forms: no hit.
    - **Report reading:** `applied` — “`align`'s second parameter and `repeatTo`'s second parameter are both `columns`.”
    - **Proof:** No dedicated control file is named.

16. **console-subj-7**
    - **Site now:** `src/browser/types.ts:70-73` makes both channels optional; `src/browser/helpers.ts:64-65` resets to attributes only; reads at `:77-78` test `!== undefined`; guide row is `guides/console.md:224`.
    - **Diff:** `@@ -57,12 +57,9 @@`, `@@ -77,8 +74,8 @@`, and `@@ -64,3 +64,3 @@`; the operative reset object is present.
    - **Old-form sweep:** `foreground: ''|background: ''` and `!== ''` over the required paths: no hit.
    - **Report reading:** `applied` — “`StyleAccumulator.foreground` / `.background` are optional.”
    - **Proof:** No dedicated control file is named.

17. **console-subj-9**
    - **Site now:** The requested source and guide sweep is empty for `should|via|just|simply|currently|e.g.|and/or` in the banned senses. The report’s cited population is `src/**/*.ts` and `guides/console.md`.
    - **Diff:** Multiple source hunks replace the listed prose terms.
    - **Old-form sweep:** Case-insensitive pattern `\b(should|via|just|simply|currently)\b|e\.g\.|and/or` over `src`, `tests`, `guides/console.md`, `guides/README.md`, and `README.md`: no banned-sense hit in the package-owned changed prose. The report omitted `tests`, both README paths, and several required terms.
    - **Report reading:** `applied` — “Final sweep reads empty.”
    - **Proof:** Naming/prose row; no control file is named.

18. **console-subj-10**
    - **Site now:** `src/core/types.ts:19-21` says `INVARIANT` is the only thrown code; `guides/console.md:135-137` carries the matching Surface text.
    - **Diff:** `@@ -16,9 +16,8 @@` and the guide hunk are present.
    - **Old-form sweep:** `today|richer taxonomy|second throw site` over the required paths: no hit.
    - **Report reading:** `applied` — “`ConsoleErrorCode` TSDoc and the guide Surface row drop `today` and the future-taxonomy clause.”
    - **Proof:** No dedicated control file is named.

19. **console-subj-11**
    - **Site now:** `src/core/factories.ts:136-179` places the full TSDoc before the async overload; `:184-191` documents the sync overload; `:195-198` leaves the implementation with `//` comments.
    - **Diff:** `@@ -137,10 +136,0 @@`, `@@ -152,2 +142 @@`, and `@@ -190,0 +179,16 @@`; the `@orkestrel/console` example is present at `:162`.
    - **Old-form sweep:** No removed identifier applies. The remaining `@src/core` examples are at `src/core/factories.ts:35,70,118` and `src/core/types.ts:160`, as the report itself records.
    - **Report reading:** `applied` — “The full TSDoc moved above the async overload; the sync overload carries its own short block.”
    - **Proof:** No dedicated control file is named.

20. **console-subj-12**
    - **Site now:** Package-owned citations are absent from `guides/console.md`, `guides/README.md`, and the tests named by the row. Titles such as `tests/src/core/Progress.test.ts:260` now name the proof.
    - **Diff:** Citation-removal hunks occur across the guide, setup, and test files.
    - **Old-form sweep:** `AGENTS §|§[0-9]` over the package-owned paths: no hit. Vendored guide mirrors remain excluded.
    - **Report reading:** `applied` — “Every `AGENTS §N` and bare `§N` citation ... is deleted or re-pointed.”
    - **Proof:** Documentation row; no control file is named.

21. **console-subj-13**
    - **Site now:** Function Surface rows such as `createStyler`, `renderSeparator`, `createCaptureResult`, `createBrowserSink`, and `createServerSink` are noun phrases at `guides/console.md:46-109`, `:127`, and `:225-263`.
    - **Diff:** Guide hunks `@@ -31,24 +31,24 @@`, `@@ -91,67 +91,67 @@`, and related Surface hunks are present.
    - **Old-form sweep:** Imperative-leading Surface descriptions over `guides/console.md`: no listed function row retains the old imperative form.
    - **Report reading:** `applied` — “Every `function` Surface row is a noun phrase.”
    - **Proof:** Documentation row; no control file is named.

22. **console-subj-14**
    - **Site now:** The named guide cross-references are at `guides/console.md:243,279,281,291`; Contract names are at `:402-408`; source count wording is corrected at `src/core/types.ts:63,241,866`.
    - **Diff:** Guide and type hunks contain the requested replacements and deletions.
    - **Old-form sweep:** `\b(above|below)\b` over the guide still hits severity senses at `guides/console.md:423,690`; no cited positional-reference hit remains. `Contract [0-9]+` has no cited cross-reference hit.
    - **Report reading:** `applied` — “`above` / `below` at the four cited guide sites replaced.”
    - **Proof:** Documentation row; no control file is named.

23. **console-subj-15**
    - **Site now:** `guides/README.md:42-48` lists `probe.md`; `:56-62` lists `test.md`; the directory index remains at `:13-17`.
    - **Diff:** `@@ -41,0 +42,7 @@` and `@@ -48,0 +56,7 @@`; both paragraphs are present.
    - **Old-form sweep:** Missing guide names `probe.md|test.md` in the dependency-reference section: no hit.
    - **Report reading:** `applied` — “`guides/README.md` gains `probe.md` and `test.md` paragraphs.”
    - **Proof:** Documentation row; no control file is named.

24. **fleet-F1**
    - **Site now:** `isBrowserVuePath` is absent; the workspace has `src/browser` and `tests/setupBrowser.ts`.
    - **Diff:** No F1 hunk.
    - **Old-form sweep:** `\bisBrowserVuePath\b` over the checkout excluding `node_modules`: no hit.
    - **Report reading:** `noop` — “Both conditions for the row are absent.”
    - **Proof:** The noop evidence matches the tree.

25. **fleet-F2**
    - **Site now:** No implementation class has a public `readonly id` field. The current public class data fields include `Logger.name` and error fields, not `id`.
    - **Diff:** No F2 hunk.
    - **Old-form sweep:** `\breadonly id\b` over `src`: no hit.
    - **Report reading:** `noop` — “No implementation class declares a public `readonly id` data field.”
    - **Proof:** The noop evidence matches the tree.

### Across the unit

**Scope.** Every status path is under `Owned`:

- `README.md`
- `guides/README.md`, `guides/console.md`
- `src/browser/{factories,helpers,types}.ts`
- `src/core/{Capture,Progress,Reporter,constants,factories,helpers,index,types}.ts`
- `src/core/loggers/{Logger,LoggerManager}.ts`
- `src/core/renderers/ANSIRenderer.ts`
- `src/server/{ProcessCapture,constants,factories,helpers,types,validators}.ts`
- `tests/guides.test.ts`, `tests/setup.ts`, `tests/setupBrowser.ts`, `tests/setupServer.ts`
- `tests/src/browser/{factories,helpers}.test.ts`
- `tests/src/core/{Capture,Progress,Reporter,Spinner}.test.ts`
- `tests/src/core/loggers/{Logger,LoggerManager}.test.ts`
- `tests/src/core/renderers/ANSIRenderer.test.ts`
- `tests/src/server/{ProcessCapture,factories}.test.ts`

Shared and off-limits paths are absent from the status file. All diff hunks map to at least one named row.

**Residue.** Added diff lines contain no `.skip(`, `.only(`, `.todo(`, `retry`, `timeout`, `TODO`, `FIXME`, or `debugger` hits: the added-line sweep exits 1. The tree sweep finds no such residue in the package-owned `src` and `tests` population after excluding the vendored policy/config/distribution tests. Expected `console.` hits remain throughout the console implementation and tests, including `src/core/factories.ts:106-138`, `src/browser/factories.ts:7-57`, `src/core/Capture.ts:18-152`, `tests/src/core/Capture.test.ts:40-479`, and `tests/src/browser/factories.test.ts:9-194`; these are the documented console boundary, not debug residue.

**Parity.**

| Entity | Interface/event members | Guide methods | Readonly data and Surface |
|---|---|---|---|
| `RendererInterface` / `ANSIRenderer` | `render` at `src/core/types.ts:102`; class method at `src/core/renderers/ANSIRenderer.ts:30` | `guides/console.md:286` | No interface data members; class has no public data |
| `LoggerInterface` / `Logger` | `debug`, `info`, `warn`, `error`, `entries`, `clear`, `destroy` at `src/core/types.ts:443-455`; class methods at `src/core/loggers/Logger.ts:91-115` | `guides/console.md:306-312` | `emitter`, `level`, `name` at `src/core/types.ts:439-441`; Surface rows `:65,70` |
| `LoggerManagerInterface` / `LoggerManager` | `register`, `logger`, `loggers`, `debug`, `info`, `warn`, `error`, `remove` at `src/core/types.ts:499-512`; class methods at `src/core/loggers/LoggerManager.ts:69-128` | `guides/console.md:318-325` | `count` at `src/core/types.ts:498`; Surface row `guides/console.md:72` |
| `ProgressEventMap` / `Progress` | `update`, `succeed` at `src/core/types.ts:1143-1145`; interface methods at `:1212-1218`; class methods at `src/core/Progress.ts:95-121` | `guides/console.md:375-378` | `emitter`, `active`, `succeeded`, `current`, `total` at `src/core/types.ts:1202-1210`; Surface row `:154` |
| `ProcessCaptureEventMap` / `ProcessCapture` | `capture`, `start`, `stop` at `src/server/types.ts:154-158`; interface methods at `:221-231`; class methods at `src/server/ProcessCapture.ts:112-163` | `guides/console.md:384-388` | `emitter`, `active` at `src/server/types.ts:217-219`; Surface row `:257` |
| `StyleAccumulator` | No methods | No methods | `foreground?`, `background?`, `attributes` at `src/browser/types.ts:70-73`; Surface row `guides/console.md:224` |
| `BarOptions` | No methods | No methods | `current`, `total`, `width?`, `fill?`, `empty?`, `styler?`, `style?` at `src/core/types.ts:973-979`; Surface row `guides/console.md:145` |
| `ServerSinkOptions` | No methods | No methods | `stdout?`, `stderr?`, `styled?`, `environment?`, `columns?` at `src/server/types.ts:55-59`; Surface row `guides/console.md:248` |

Backticked identifiers in the added guide Surface and methods sentences resolve through the core, browser, or server star barrels at `src/core/index.ts:1-14`, `src/browser/index.ts:1-4`, and `src/server/index.ts:1-7`. Non-API backticks such as `AGENTS.md`, test paths, and option-property names are links or data members, not barrel exports.

**Gates.** The report records:

| Command | Exit |
|---|---:|
| `npm run format:check` | `0` |
| `npm run lint:check` | `0` |
| `npm run check` | `0` |
| `npm run build` | `0` |
| `npm test` | `0` |

The report’s gate evidence exists under `/home/user/work/evidence/console-proofs/`. The build evidence includes the mutating `clean` step, so it is not an independent read-only audit result.

**Breaking.** The report names the affected published symbols and consumer edits at `conform-console-report.md:130-137`. The fleet source/test sweep for `ProgressBarOptions`, `parseParameters`, `createProcessCapture`, and `waitForFrames` found no hits outside `console`; the terminal guide mirror still contains stale names at `/home/user/fleet/terminal/guides/console.md:101,146,231,262,586,599,675`, as the report notes.

**Writing sweep.** The required full added-line pattern finds no banned prose hit. Added `new` occurrences are executable code or examples, such as `new Date` at `src/core/helpers.ts:182` and constructors in `tests/guides.test.ts`; they are not prose uses. The report records only the narrower `should|via|just|simply|currently|e.g.|and/or` sweep over `src` and `guides/console.md`, so its recorded sweep is incomplete against the brief.

## Distillate

- `console-obj-1`: site now `tests/guides.test.ts:55-59` | diff present yes | old form hits 0 for removed `MODULES` entries | report matches yes
- `console-obj-2`: site now `tests/guides.test.ts:201-470` | diff present yes | old form hits 0 | report matches partial; nested `visible` function is a new rule violation
- `console-obj-3`: site now `tests/src/browser/helpers.test.ts:243-248` | diff present yes | old form hits 0 at the proof site | report matches partial; no failing-first control
- `console-obj-4`: site now `tests/src/core/Spinner.test.ts:187-232` | diff present yes | old form hits 0 | report matches yes
- `console-obj-5`: site now `src/server/ProcessCapture.ts:68` | diff present yes | old form hits 0 | report matches yes
- `console-obj-6`: site now `tests/setupServer.ts:70-82` | diff present yes | old form hits 0 | report matches yes
- `console-obj-7`: site now `tests/setupBrowser.ts:39-47` | diff present yes | old form hits 0 | report matches yes
- `console-obj-8`: site now `src/core/loggers/` | diff present yes | old path hits 0 | report matches yes
- `console-obj-9`: site now `src/core/renderers/` | diff present yes | old path hits 0 | report matches yes
- `console-subj-1`: site now `LoggerManager.ts:119-128` | diff present yes | old wording hits 0 | report matches yes
- `console-subj-2`: site now `Progress.ts:102-110` and `types.ts:1130-1218` | diff present yes | API-form old hits 0 | report matches partial; generic `complete` words remain and the report sweep is narrow
- `console-subj-3`: site now `types.ts:972-980` | diff present yes | old form hits 0 | report matches yes
- `console-subj-4`: site now `browser/helpers.ts:149-155` | diff present yes | old form hits 0 | report matches yes
- `console-subj-5`: site now `server/types.ts:54-59` | diff present yes | option-key hits 0 | report matches partial; broader required sweep was not recorded
- `console-subj-6`: site now `helpers.ts:257-331` | diff present yes | old parameter forms 0 | report matches yes
- `console-subj-7`: site now `browser/types.ts:70-73` and `browser/helpers.ts:64-78` | diff present yes | sentinel hits 0 | report matches yes
- `console-subj-9`: site now required prose sweep empty | diff present yes | banned-sense hits 0 | report matches partial; population and pattern were incomplete
- `console-subj-10`: site now `types.ts:19-21`, guide `:135-137` | diff present yes | old clause hits 0 | report matches yes
- `console-subj-11`: site now `factories.ts:136-198` | diff present yes | old form hits 0 | report matches yes
- `console-subj-12`: site now package-owned citations absent | diff present yes | citation hits 0 | report matches yes
- `console-subj-13`: site now noun-phrase Surface rows | diff present yes | imperative rows 0 | report matches yes
- `console-subj-14`: site now named cross-references corrected | diff present yes | cited positional hits 0 | report matches yes
- `console-subj-15`: site now `guides/README.md:42-62` | diff present yes | missing-guide hits 0 | report matches yes
- `fleet-F1`: site now helper absent and browser setup present | diff present no | hits 0 | report matches yes
- `fleet-F2`: site now no public `id` class field | diff present no | hits 0 | report matches yes

Scope tags: all status paths are `owned`; `shared` and `off-limits` have no status entries.

Residue: added diff lines have no prohibited residue. Expected `console.` references remain in the implementation and tests. Writing terms are clean in the required senses, but the report omitted the full required population and pattern.

## Unknowns

- The failing-first proof for `console-obj-3` is not present.
- The report does not provide per-row placement, naming, or documentation sweep commands for `console-obj-6`, `console-obj-7`, `console-obj-8`, `console-obj-9`, `console-subj-3`, `console-subj-4`, `console-subj-5`, `console-subj-6`, `console-subj-7`, `console-subj-10`, `console-subj-11`, `console-subj-12`, `console-subj-13`, `console-subj-14`, or `console-subj-15`.
- The flagship block does not independently execute every runnable guide fence; it covers the named representative groups only.
- The added nested `visible` function at `tests/guides.test.ts:218` remains unresolved against the architecture rule.
- The report does not record the required full residue-hit list or full writing-hit list.
- The report does not provide an independent post-unit gate run.

## Journal

Driver journal.

## Deviation

The audit performed no file creation, edit, deletion, staging, installation, build, or other tree mutation. The initial status and `/home/user/work/evidence/conform-console.status` agree. No file was unreadable.