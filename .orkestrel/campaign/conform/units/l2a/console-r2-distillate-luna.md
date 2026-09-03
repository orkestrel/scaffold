## Question
For every `conform-console` row, compare the current tree, diff, report, and available proof evidence.

## Evidence

### Per-row evidence

1. **console-obj-1**
   - **Site now:** `tests/guides.test.ts:58-65` documents published core, `/browser`, and `/server` specifiers; `tests/guides.test.ts:185-190` resolves each mapped face.
   - **Diff:** `conform-console.diff:1863` (`@@ -22,22 +22,47 @@`) and `:1900-1912`; the exact replacement map and comment are present.
   - **Old-form sweep:** `\b@src/(core|browser|server)\b`, across `src`, `tests`, `guides/console.md`, `guides/README.md`, `README.md`: hits remain only in source/test imports and guide prose, not in `MODULES`; no stale fence mapping remains.
   - **Report:** `conform-console-report.md:6` says the map uses published face specifiers. Current lines match.
   - **Proof:** `/home/user/work/evidence/console-proofs/console-obj-1-red-stale-fence.txt` records `2 failed`, `66 passed (68)`; `console-obj-1-5-green.txt` records `68 passed (68)`.

2. **console-obj-2**
   - **Site now:** `tests/guides.test.ts:218-570` contains `describe('flagship fences')`, runtime assertions, and presence guards.
   - **Diff:** `conform-console.diff:1928` (`@@ -180,3 +208,364 @@`); the block is present in `+` lines.
   - **Old-form sweep:** No removed identifier; the former absent transcription is replaced by the block.
   - **Report:** `conform-console-report.md:7` says runnable fences and commented values are executed. Current block contains the listed surface, logging, retention, animation, renderer, server, and guard cases.
   - **Proof:** `console-obj-2-control-planted.txt` records `1 failed`, `84 passed (85)` for the wrong duration; the report records green `85 passed (85)`.

3. **console-obj-3**
   - **Site now:** `tests/src/browser/helpers.test.ts:243-245` uses `performance.now()` for both readings; the assertion remains at `:248`.
   - **Diff:** `conform-console.diff:2524` (`@@ -240,9 +240,9 @@`), with both `performance.now()` lines present.
   - **Old-form sweep:** `Date\.now\(\)` in the target test has no hit.
   - **Report:** `conform-console-report.md:8` says the interval uses `performance.now()`. Current lines match.
   - **Proof:** `console-obj-3-control-red.txt` exists but records `79 passed (79)`; `console-obj-3-green.txt` also records `79 passed (79)`. The report explains that an upper-bound assertion cannot expose truncation.

4. **console-obj-4**
   - **Site now:** `tests/src/core/Spinner.test.ts:5` imports `waitForCondition`; `:187-191`, `:209-213`, and `:228-232` use it. `waitForFrames` is absent.
   - **Diff:** `conform-console.diff:2892` (`@@ -36,13 +36,9 @@`) removes the helper; `:2909`, `:2921`, and `:2934` add the condition calls.
   - **Old-form sweep:** `waitForFrames` across `src` and `tests`: no hit.
   - **Report:** `conform-console-report.md:9` says the dependency helper replaced the local loop and leak guards remain. Current lines match.
   - **Proof:** `console-obj-4-control-planted.txt` records `1 failed`, `450 passed (451)` with `Condition "the spinner wrote 3 frames" did not hold`; `console-obj-4-green.txt` records `451 passed (451)`.

5. **console-obj-5**
   - **Site now:** `src/server/factories.ts:50-80` contains only `createServerSink`; `createProcessCapture` is absent. `ProcessCapture` is constructed directly at `guides/console.md:600,613`, `README.md:72`, and throughout `tests/src/server/ProcessCapture.test.ts`.
   - **Diff:** `conform-console.diff:1612` (`@@ -1,12 +1,6 @@`) removes imports; `:1669` removes the factory; `:3044` begins direct-construction test changes.
   - **Old-form sweep:** `\bcreateProcessCapture(s|d|ing)?\b`, across required paths: no hit.
   - **Report:** `conform-console-report.md:10` says the factory was deleted and consumers use `new ProcessCapture(...)`. Current tree and diff match.
   - **Proof:** `console-obj-1-red-stale-fence.txt` records the stale export failure; `console-obj-1-5-green.txt` records `68 passed (68)` after the fence update.

6. **console-obj-6**
   - **Site now:** `tests/setupServer.ts:70-80` returns an object with `write(...)` as a method; no local `const write` remains.
   - **Diff:** `conform-console.diff:2464` (`@@ -72,9 +72,11 @@`) contains the method form.
   - **Old-form sweep:** `\bconst (write|restore) =` over `tests`: no hit in `tests/setupServer.ts`; unrelated `createOverloadProbe` hit remains at `tests/src/server/ProcessCapture.test.ts:31`.
   - **Report:** `conform-console-report.md:11` says `createWriteProbe` now uses an object-literal method. Current lines match.
   - **Proof:** Placement/infrastructure change; no dedicated failing-first control is named.

7. **console-obj-7**
   - **Site now:** `tests/setupBrowser.ts:39-48` returns `restore(): void` as a method.
   - **Diff:** `conform-console.diff:2411` (`@@ -36,10 +36,14 @@`) contains the method form.
   - **Old-form sweep:** `\bconst restore =` across `tests`: no hit.
   - **Report:** `conform-console-report.md:12` says `captureConsole` declares `restore` on the returned literal. Current lines match.
   - **Proof:** Placement/infrastructure change; no dedicated failing-first control is named.

8. **console-obj-8**
   - **Site now:** `src/core/loggers/Logger.ts` and `LoggerManager.ts` exist; old flat files are absent. `src/core/index.ts:5-7` exports the moved paths. Tests are at `tests/src/core/loggers/`.
   - **Diff:** `conform-console.diff:1185` updates barrel exports; `:1200` and `:1221` record the renames; imports use `../`.
   - **Old-form sweep:** old paths `src/core/Logger.ts`, `src/core/LoggerManager.ts`, and old test paths: no hit. Remaining `./Logger.js` at `src/core/loggers/LoggerManager.ts:8` is the new sibling path.
   - **Report:** `conform-console-report.md:13` says classes and mirrored tests moved and links were updated. Current tree matches.
   - **Proof:** `console-obj-8-9-after-move.txt` exists; `console-obj-8-9-guides.txt` exists.

9. **console-obj-9**
   - **Site now:** `src/core/renderers/ANSIRenderer.ts:25`; `src/core/index.ts:5` and `src/core/factories.ts:11` reference `renderers/`. The test is under `tests/src/core/renderers/`.
   - **Diff:** `conform-console.diff:1264` records the rename; `:1271` rewrites imports; `:879` updates the factory import.
   - **Old-form sweep:** old `src/core/ANSIRenderer.ts`, `./ANSIRenderer.js`, and old test path: no hit.
   - **Report:** `conform-console-report.md:14` says the renderer and test moved and imports were updated. Current tree matches.
   - **Proof:** `console-obj-8-9-after-move.txt` exists.

10. **console-subj-1**
    - **Site now:** `src/core/loggers/LoggerManager.ts:119-129` starts `removed` as `true`, attempts every name, and returns false when any deletion fails. The TSDoc is at `:24-28`; the interface wording is at `src/core/types.ts:487-492`. Tests are at `tests/src/core/loggers/LoggerManager.test.ts:228-239`.
    - **Diff:** `conform-console.diff:1237` and `:1250` change implementation and documentation; `:1360` changes the interface contract; `:3012` changes tests.
    - **Old-form sweep:** `true when any was removed` across required paths: no hit.
    - **Report:** `conform-console-report.md:20` says all names are attempted and success requires every name. Current lines match.
    - **Proof:** `console-subj-1-red.txt` records `2 failed`, `449 passed (451)`; `console-subj-1-green.txt` records `451 passed (451)`.

11. **console-subj-2**
    - **Site now:** `Progress.succeed`, `Progress.succeeded`, and the `succeed` event appear at `src/core/Progress.ts:83-109` and `src/core/types.ts:1129-1215`. Guide rows are at `guides/console.md:151,153,376-377,576,580,695`.
    - **Diff:** `conform-console.diff:664` begins the implementation hunk; `:1489` begins the type changes; test changes begin at `:2605`.
    - **Old-form sweep:** `\bcomplete(s|d|ing|ion)?\b`: remaining hits are generic prose only, including `src/core/helpers.ts:711`, `src/core/types.ts:544`, `src/core/constants.ts:248,465`, and `guides/console.md:82,188`; no old Progress API member or event remains.
    - **Report:** `conform-console-report.md:21` says the positive vocabulary is unified on `succeed`/`succeeded`. Current tree matches.
    - **Proof:** The report identifies the core suite as the control; no separate control file is named for this row.

12. **console-subj-3**
    - **Site now:** `BarOptions` is declared at `src/core/types.ts:972`; `renderBar` uses it at `src/core/helpers.ts:707`; guide rows are at `guides/console.md:99,145,698`.
    - **Diff:** `conform-console.diff:1438` changes the interface; `:986` and `:1144` update helper references; `:850` updates constant links.
    - **Old-form sweep:** `\bProgressBarOptions(s|d|ing)?\b` across required paths: no hit.
    - **Report:** `conform-console-report.md:22` says the type was renamed to `BarOptions` in source, links, and guide rows. Current tree matches.
    - **Proof:** Naming/contract change; no dedicated failing-first control is named.

13. **console-subj-4**
    - **Site now:** `scanParameters` is declared at `src/browser/helpers.ts:153`, called at `:86`, documented at `:139-150`, and tested at `tests/src/browser/helpers.test.ts:404-443`.
    - **Diff:** `conform-console.diff:577` (`@@ -142,21 +135,22 @@`) contains the rename and updated documentation; test changes are at `:2493`.
    - **Old-form sweep:** `\bparseParameters(s|d|ing)?\b` across required paths: no hit.
    - **Report:** `conform-console-report.md:23` says the helper was renamed in place and retains its helper placement. Current tree matches.
    - **Proof:** Naming change; no dedicated failing-first control is named.

14. **console-subj-5**
    - **Site now:** `ServerSinkOptions.stdout` and `.stderr` are at `src/server/types.ts:54-56`; resolution is at `src/server/factories.ts:52-59`; guide row is at `guides/console.md:248`.
    - **Diff:** `conform-console.diff:1731` and `:1740` update documentation and fields; `:1660` updates option reads; tests use `stdout`/`stderr`.
    - **Old-form sweep:** `\b(out|err)\s*:` across required paths has only the prose hit `tests/src/core/renderers/ANSIRenderer.test.ts:6` (`string out:`); no old option key remains.
    - **Report:** `conform-console-report.md:24` says the public fields changed while local bindings may remain short. Current tree matches.
    - **Proof:** Naming change; no dedicated failing-first control is named.

15. **console-subj-6**
    - **Site now:** `align(text, columns, ...)` is at `src/core/helpers.ts:257`; `repeatTo(unit, columns)` is at `:326`; bodies and TSDoc use `columns`.
    - **Diff:** `conform-console.diff:1020` and `:1060` contain the parameter and prose changes.
    - **Old-form sweep:** `align(...target...)`, `repeatTo(...count...)`, `@param target`, and `@param count` across the checkout: only valid stream-target parameters remain at `src/server/helpers.ts:20,39`; no old layout-helper binding remains.
    - **Report:** `conform-console-report.md:25` says both parameters are `columns` and positional call sites need no change. Current tree matches.
    - **Proof:** Naming change; no dedicated failing-first control is named.

16. **console-subj-7**
    - **Site now:** `StyleAccumulator` has optional channels at `src/browser/types.ts:70-73`; reset values are created at `src/browser/helpers.ts:62,89`; reads use `!== undefined` at `:78-79`; guide row is at `guides/console.md:224`.
    - **Diff:** `conform-console.diff:623` and `:647` update the contract; `:525`, `:541`, and `:552` update implementation.
    - **Old-form sweep:** `(foreground|background)\s*:\s*''` and `(foreground|background)\s*!==\s*''` across required paths: no hit.
    - **Report:** `conform-console-report.md:26` says channels are optional and reset omits them. Current tree matches.
    - **Proof:** Naming/absence-contract change; no dedicated failing-first control is named.

17. **console-subj-9**
    - **Site now:** The cited source population has no hit for `\b(should|via|just|simply|currently)\b|e\.g\.|and/or`, case-insensitive. The guide has no such hit.
    - **Diff:** relevant replacement hunks include `conform-console.diff:1000`, `:1010`, `:1100`, `:1121`, `:1135`, `:1379`, and `:1720`.
    - **Old-form sweep:** source and `guides/console.md` are clean for the row’s pattern. The optional test sweep still finds `tests/src/browser/helpers.test.ts:438` (`e.g.`), plus other test prose hits recorded in the report.
    - **Report:** `conform-console-report.md:27` says the source and guide sweep is clean and records the wider-path survivors. Current tree matches that reading.
    - **Proof:** Writing/placement change; no dedicated failing-first control is named.

18. **console-subj-10**
    - **Site now:** `src/core/types.ts:19-22` says `INVARIANT` is the only thrown code; `guides/console.md:135` says the same without `today`.
    - **Diff:** `conform-console.diff:1283` changes the TSDoc; guide changes are in `:133` and the surrounding guide hunk.
    - **Old-form sweep:** `\btoday\b` across required paths has one unrelated hit at `src/core/errors.ts:13`; the targeted `ConsoleErrorCode` and guide text are clean.
    - **Report:** `conform-console-report.md:28` says the future-taxonomy and `today` wording were removed. Current lines match.
    - **Proof:** Writing change; no dedicated failing-first control is named.

19. **console-subj-11**
    - **Site now:** `src/core/factories.ts:137-202` places complete TSDoc before the async overload, gives the sync overload its own TSDoc, and leaves the implementation with `//` notes. Both examples import `@orkestrel/console`.
    - **Diff:** `conform-console.diff:927` (`@@ -171,23 +159,46 @@`) contains the overload documentation restructuring.
    - **Old-form sweep:** `from '@src/core'` remains in unrelated examples at `src/core/factories.ts:35,70,118`, `src/core/types.ts:160`, and `src/core/Styler.ts:102`; the two `createCaptureResult` examples use the published specifier.
    - **Report:** `conform-console-report.md:29` says overload documentation and separate examples were added. Current lines match.
    - **Proof:** Documentation change; no dedicated failing-first control is named.

20. **console-subj-12**
    - **Site now:** Own guide, README, tests, and setup files contain no `AGENTS §N` or bare `§N` citations. `guides/console.md:709` points to titled sections; `guides/README.md:63` uses the same form.
    - **Diff:** `conform-console.diff:21`, `:58`, `:1851`, `:2297`, `:2393`, and related test hunks remove or re-point citations.
    - **Old-form sweep:** `AGENTS\s*§|§[0-9]+` over the owned guide, README, and tests: no hit.
    - **Report:** `conform-console-report.md:30` says all package-owned citations were removed or re-pointed and describe titles were rewritten. Current tree matches.

21. **console-subj-13**
    - **Site now:** Function Surface rows at `guides/console.md:46-50,63-64,94-109,127,137,225-228,258-263` use noun phrases. Remaining `Whether` rows at `:104,137,259,263` are nominal clauses.
    - **Diff:** `conform-console.diff:133` and `:451` contain the guide table rewrite.
    - **Old-form sweep:** function-row imperative pattern over `guides/console.md`: no `Creates`, `Returns`, `Checks`, `Builds`, `Renders`, `Repeats`, `Pads`, `Walks`, `Formats`, or `Decodes` rows remain.
    - **Report:** `conform-console-report.md:31` says every function Surface row is a noun phrase. Current rows match.

22. **console-subj-14**
    - **Site now:** The cited guide references use named contracts and `preceding`/`following`; the remaining `above`/`below` hits are severity senses at `guides/console.md:423,690`.
    - **Diff:** `conform-console.diff:63`, `:74`, `:243`, `:381`, and `:408` contain the changes.
    - **Old-form sweep:** `\b(above|below)\b` over `guides/console.md`: only severity hits at `:423` and `:690`. Removed counts and positional labels have no target hits in the guide or `src/core/types.ts`.
    - **Report:** `conform-console-report.md:32` says guide references and counts were repaired while severity senses remain. Current tree matches.

23. **console-subj-15**
    - **Site now:** `guides/README.md:42` lists `probe.md`; `:56` lists `test.md`, alongside the existing dependency mirrors.
    - **Diff:** `conform-console.diff:30` and `:44` add the two paragraphs.
    - **Old-form/presence sweep:** `probe\.md|test\.md` over `guides/README.md`: hits at `:42` and `:56`.
    - **Report:** `conform-console-report.md:33` says both mirrors were added in alphabetical order. Current directory and map agree.

24. **fleet-F1**
    - **Site now:** `tests/setup.ts` contains no `isBrowserVuePath`; `src/browser/` and `tests/setupBrowser.ts` exist.
    - **Diff:** no F1-specific deletion hunk.
    - **Report:** `conform-console-report.md:34` records `noop` because the helper is absent but a browser environment exists. Current tree matches.

25. **fleet-F2**
    - **Site now:** No implementation class has a public `readonly id: string` field. The source sweep finds no such declaration; `src/core/errors.ts:16` has `code`, not `id`.
    - **Diff:** no F2-specific hunk.
    - **Report:** `conform-console-report.md:35` records `noop`. Current tree matches.

### Across-unit evidence

- **Scope:** Every status path is `owned`: `README.md`, `guides/README.md`, `guides/console.md`, all listed `src/**` files, all listed `tests/**` files, and the six renamed paths. No status path is `shared` or `off-limits`. The status is `/home/user/work/evidence/conform-console.status:1-40`.
- **Unmapped diff hunks:** None. Every diff file is named by a row’s `Where` or by that row’s repair population.
- **Diff residue:** Pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` over `+` lines in `conform-console.diff`: no skip, only, todo, retry, timeout, TODO, FIXME, or debugger hits. Intentional `console.` additions are at `:67,70,166,188,197,395,399,446,494,516,619,936,948,1129,1327,1398,1821,1936,2272,2424-2426,2489`.
- **Tree residue:** The same pattern over `src` and `tests`, excluding the four vendored test files, has no `.skip`, `.only`, `.todo`, retry, timeout, TODO, FIXME, or debugger hit. `console.` hits are intentional API, implementation, test, and setup references; representative locations include `src/core/Capture.ts:18-19`, `src/core/factories.ts:106-129`, `src/browser/factories.ts:7-57`, `src/server/ProcessCapture.ts:27-29`, `tests/setupBrowser.ts:9-46`, `tests/guides.test.ts:551`, and the console-interception tests.
- **Breaking sweep:** Across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding this checkout and vendored guide mirrors, old published names have no fleet hits. `LoggerManager` has no non-console fleet consumer; the report records the consumer search at `conform-console-report.md:320-326`.
- **Gates:** The report records:
  - `npm run format:check` → exit `0`, `/home/user/work/evidence/console-proofs/gate-format-check.txt`
  - `npm run lint:check` → exit `0`, `gate-lint-check.txt`
  - `npm run check` → exit `0`, `gate-check.txt`
  - `npm run build` → exit `0`, `gate-build.txt`
  - `npm test` → exit `0`, `gate-test.txt`
- **Writing sweep:** The report’s required substitution pattern over `src/**/*.ts`, tests, guides, and README records no source or guide hits for `should`, `via`, `just`, `simply`, `currently`, `e.g.`, `i.e.`, or `and/or`; test survivors are recorded at `tests/src/core/factories.test.ts:274`, `tests/src/core/Progress.test.ts:7,11,197,203`, `tests/src/core/Spinner.test.ts:17,80,89,308,314`, `tests/src/browser/helpers.test.ts:119,143,438`, and other listed test files. Code-token uses of `new` and `console.` are intentional.
- **Parity:** `src/core/types.ts:97-102` / `guides/console.md:286-288`: `RendererInterface.render`; no readonly data properties; barrel `src/core/index.ts:5`.
  `src/core/types.ts:438-453` / `guides/console.md:302-311`: `LoggerInterface.debug, info, warn, error, entries, clear, destroy`; data `emitter, level, name` at `:439-441`, Surface at `guides/console.md:70`; barrel star export through `src/core/index.ts:7`.
  `src/core/types.ts:497-512` / `guides/console.md:316-326`: `LoggerManagerInterface.register, logger, loggers, debug, info, warn, error, remove`; data `count` at `:498`, Surface at `guides/console.md:70`; barrel `:7`.
  `src/core/types.ts:1201-1218` / `guides/console.md:372-378`: `ProgressInterface.update, succeed, fail, destroy`; data `emitter, active, succeeded, current, total` at `:1202-1210`, Surface at `guides/console.md:153`; barrel `src/core/index.ts:12`.
  `src/server/types.ts:216-230` / `guides/console.md:380-388`: `ProcessCaptureInterface.start, stop, messages, clear, destroy`; data `emitter, active` at `:217-219`, Surface at `guides/console.md:256`; barrel `src/server/index.ts:5`.
  `BarOptions` data `current, total, width, fill, empty, styler, style` at `src/core/types.ts:972-979`; Surface at `guides/console.md:99,145`; barrel through `types.ts`.
  `StyleAccumulator` data `foreground?, background?, attributes` at `src/browser/types.ts:70-73`; Surface at `guides/console.md:224`; barrel through `src/browser/index.ts:1`.
  `ServerSinkOptions` data `stdout?, stderr?, styled?, environment?, columns?` at `src/server/types.ts:54-59`; Surface at `guides/console.md:248`; barrel through `types.ts`.
  All added guide API identifiers resolve through the corresponding star barrels: core `src/core/index.ts:1-16`, browser `src/browser/index.ts:1-5`, and server `src/server/index.ts:1-6`. Guide path identifiers such as `src/core`, `src/browser`, `src/server`, `console.md`, `AGENTS.md`, and dependency mirror names are paths or documents, not exported symbols.

## Distillate

- `console-obj-1`: site now `tests/guides.test.ts:58-65` | diff present yes | old form hits 0 stale mappings | report matches yes
- `console-obj-2`: site now `tests/guides.test.ts:218-570` | diff present yes | old form hits 0 | report matches yes
- `console-obj-3`: site now `tests/src/browser/helpers.test.ts:243-245` | diff present yes | old form hits 0 | report matches yes
- `console-obj-4`: site now `tests/src/core/Spinner.test.ts:187-232` | diff present yes | old form hits 0 | report matches yes
- `console-obj-5`: site now `src/server/factories.ts:50-80` and direct `ProcessCapture` consumers | diff present yes | old form hits 0 | report matches yes
- `console-obj-6`: site now `tests/setupServer.ts:70-80` | diff present yes | old form hits 0 at target | report matches yes
- `console-obj-7`: site now `tests/setupBrowser.ts:39-48` | diff present yes | old form hits 0 | report matches yes
- `console-obj-8`: site now `src/core/loggers/` and `tests/src/core/loggers/` | diff present yes | old stale paths 0 | report matches yes
- `console-obj-9`: site now `src/core/renderers/` and `tests/src/core/renderers/` | diff present yes | old stale paths 0 | report matches yes
- `console-subj-1`: site now `LoggerManager.remove` all-succeed semantics | diff present yes | old contract hits 0 | report matches yes
- `console-subj-2`: site now `Progress.succeed/succeeded` | diff present yes | old Progress API hits 0 | report matches yes
- `console-subj-3`: site now `BarOptions` | diff present yes | old name hits 0 | report matches yes
- `console-subj-4`: site now `scanParameters` | diff present yes | old name hits 0 | report matches yes
- `console-subj-5`: site now `stdout/stderr` | diff present yes | old option-key hits 0 | report matches yes
- `console-subj-6`: site now `columns` parameters | diff present yes | old layout bindings 0 | report matches yes
- `console-subj-7`: site now optional accumulator channels | diff present yes | sentinel hits 0 | report matches yes
- `console-subj-9`: site now cleaned source and guide prose | diff present yes | target-pattern hits 0 | report matches yes
- `console-subj-10`: site now present-tense invariant wording | diff present yes | targeted `today` hits 0 | report matches yes
- `console-subj-11`: site now overload-attached TSDoc | diff present yes | target example alias hits 0 | report matches yes
- `console-subj-12`: site now titled/no-number citations | diff present yes | citation hits 0 | report matches yes
- `console-subj-13`: site now noun-phrase function rows | diff present yes | imperative row hits 0 | report matches yes
- `console-subj-14`: site now named cross-references and no open-ended counts | diff present yes | targeted reference/count hits 0 | report matches yes
- `console-subj-15`: site now maps `probe.md` and `test.md` | diff present yes | presence hits 2 | report matches yes
- `fleet-F1`: site now absent helper with browser environment present | diff present no | stale helper hits 0 | report matches yes
- `fleet-F2`: site now no matching public `id` field | diff present no | matching class hits 0 | report matches yes

Scope tags: every path in `conform-console.status` is `owned`; no `shared` or `off-limits` path appears.

Residue: no added skip/only/todo/retry/timeout/TODO/FIXME/debugger; intentional `console.` additions only.

Writing hits: no targeted source/guide hits; test prose survivors are listed above.

Parity: method tables and readonly Surface rows match for `RendererInterface`, `LoggerInterface`, `LoggerManagerInterface`, `ProgressInterface`, `ProcessCaptureInterface`, `BarOptions`, `StyleAccumulator`, and `ServerSinkOptions`; barrels export the corresponding symbols.

## Unknowns

- The gate captures were read, but the gates were not independently rerun in this read-only audit.
- The diff file exceeded the single-read limit; its hunk index and all row-relevant hunk ranges were inspected.
- No dedicated failing-first control file is named for the placement, naming, and documentation rows; the report treats those rows as sweep-based proofs.

## Journal

Driver journal:

## Deviation

No tree change was made during this audit. No requested input file was inaccessible. No relevant row sweep was unavailable; the full diff required paginated inspection.