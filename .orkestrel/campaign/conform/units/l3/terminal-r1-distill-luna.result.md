## Question

For every `conform-terminal` row, what the current tree carries, what the diff changed, and whether the report matches the tree.

## Evidence

### Per-row

1. **terminal-obj-2**
   - **Site now:** `src/core/constants.ts:2` imports `CSI`/`ESC` from console; `:40` defines `KEY_SS3` from `ESC`; `:55-69` uses `CSI`. `src/server/constants.ts:9` imports `CSI`; `:16-32` derives all sequences from it. The old declarations no longer exist. This follows “Never reimplement or rename-wrap a declared package primitive.”
   - **Diff:** `@@ -1,9 +1,10 @@`, `@@ -13,8 +14,6 @@`, `@@ -33,19 +32,17 @@`, and `@@ -55,21 +52,21 @@`; additions include `import { CSI, ESC, ... }` and `export const KEY_SS3 = \`${ESC}O\``. Server hunks `@@ -1,20 +1,15 @@` and `@@ -13,8 +8,6 @@` remove local primitives. Repair present: yes.
   - **Old form sweep:** Word-boundary and case-insensitive sweep over `src`, `tests`, `guides/terminal.md`, `guides/README.md`, and `README.md`: `ESCAPE`, `KEY_CSI`: no hits. `CSI` still appears intentionally at `src/core/constants.ts:2,7,37,44-69`, `src/server/constants.ts:5,9,16,22,25,32`, and corresponding tests/guides as the imported console primitive.
   - **Report:** `applied`: “`ESCAPE` deleted from both modules, `KEY_CSI` and the server `CSI` deleted; `CSI` and `ESC` imported from `@orkestrel/console` and `KEY_SS3` built from `ESC`.” Matches.
   - **Proof:** No row-specific failing-first control was recorded.

2. **terminal-obj-3**
   - **Site now:** `src/core/constants.ts:11,13` owns `RETURN` and `NEWLINE`; `src/server/constants.ts:9,16-32` contains only cursor/erase sequences; `src/server/Terminal.ts:30,186,198,246,310,346,361,368,423,466,474,484,508` uses `NEWLINE`. The removed server declarations do not exist.
   - **Diff:** Server `@@ -1,20 +1,15 @@` and `@@ -36,12 +31,6 @@` delete `CARRIAGE_RETURN`/`LINE_FEED`; Terminal hunks replace usages with `NEWLINE`; helpers hunk `@@ -1,18 +1,19 @@` imports `RETURN`. Repair present: yes.
   - **Old form sweep:** Exact `CARRIAGE_RETURN`/`LINE_FEED`: no hits. Inflection sweep hits the intentionally generic prose at `guides/terminal.md:181,512`, `src/core/constants.ts:11,13`, `src/core/helpers.ts:156`, `tests/integration.test.ts:131`, `src/server/helpers.ts:127`, and `tests/setupPolicy.ts`-derived text excluded from the owned result. No stale declaration remains.
   - **Report:** `applied`: “`CARRIAGE_RETURN` and `LINE_FEED` deleted from `src/server/constants.ts`; the server reads core's `RETURN` and `NEWLINE`.” Matches.
   - **Proof:** No row-specific failing-first control was recorded.

3. **terminal-obj-4**
   - **Site now:** `src/server/types.ts:10,62` uses console’s `StreamTargetInterface`; `src/server/Terminal.ts:19,46,111,124` types and narrows output through `isStreamTarget`; `src/server/helpers.ts:9` says the boundary is not redeclared. `OutputStreamInterface` and `isOutputStream` are absent.
   - **Diff:** `src/server/types.ts` hunk `@@ -47,24 +48,10 @@`; helpers hunk `@@ -1,18 +1,19 @@` and deletion hunk `@@ -47,24 +48,6 @@`; test infrastructure hunk `@@ -1,7 +1,8 @@`. Repair present: yes.
   - **Old form sweep:** `OutputStreamInterface`, `isOutputStream`, and case-insensitive “output stream interface”: no hits in the requested paths.
   - **Report:** `applied`: “`OutputStreamInterface` and `isOutputStream` deleted; `TerminalOptions.output` is console's `StreamTargetInterface`, narrowed by `isStreamTarget`.” Matches.
   - **Proof:** No row-specific failing-first control was recorded.

4. **terminal-obj-5**
   - **Site now:** `tests/guides.test.ts:80-81` allows only `ts`; the new fence block is `:240-425`, importing real package symbols at `:1-60`. It includes broker, wire, guard, sanitization, selected reducer, theme, store, and server-helper assertions.
   - **Diff:** `@@ -1,20 +1,15 @@`, `@@ -21,12 +77,8 @@`, and `@@ -176,3 +233,194 @@`; repair text is present, including `describe('guide fences')` and `FENCE_LANGUAGES = Object.freeze(['ts'])`.
   - **Old form sweep:** Removed `'text'` fence language and its pin explanation: no stale fence-language entry remains. Generic `text` occurrences remain as legitimate control/type prose.
   - **Report:** `applied`: “`tests/guides.test.ts` gained a `guide fences` block transcribing each value-claiming flagship fence of `guides/terminal.md`.” The added block exists, but “each” is not supported: it does not assert the password, select, checkbox, or editor fence values; the theme fence’s `renderSelectView`; the database-store round trip; or `createTerminalManager({ store: database })`. Therefore report match: no.
   - **Proof:** `/home/user/work/evidence/terminal-proofs/terminal-obj-5-red.txt`: “`Tests 1 failed | 51 passed (52)`”; the planted `renderConfirmView` mismatch is shown at `tests/guides.test.ts:342`. Green: `/terminal-obj-5-green.txt`: “`Tests 52 passed (52)`”. The control proves one transcribed value, not every claimed fence.

5. **terminal-obj-6**
   - **Site now:** `src/core/validators.ts` exports the four guards; new `tests/src/core/validators.test.ts:1-22` mirrors them. The former assertions were removed from `tests/src/core/helpers.test.ts`.
   - **Diff:** `tests/src/core/validators.test.ts` is added by `@@ -0,0 +1,23 @@`; helpers hunk `@@ -421,25 +418,7 @@` removes the guard block. Repair present: yes.
   - **Old form sweep:** No removed symbol; guard names remain in the new mirrored test as intended.
   - **Report:** `applied`: “`tests/src/core/validators.test.ts` created; the guard cases moved there out of `tests/src/core/helpers.test.ts`.” Matches.
   - **Proof:** Red: `/terminal-obj-6-red.txt`: “No test files found, exiting with code 1.” Green: `/terminal-obj-6-green.txt`: “`Tests 2 passed (2)`.” Control file and readings match.

6. **terminal-obj-7**
   - **Site now:** `tests/setupServer.ts:44-46` defines `FakeTTYOptions`; `:53` defines the sole `createFakeTTY`; `:64-68` conditionally replays scripts. `tests/setupServer.test.ts:34` contains the consolidated suite, including script cases at `:96-145`.
   - **Diff:** setup hunk `@@ -1,7 +1,8 @@`, deletion/fold hunk `@@ -39,61 +40,20 @@`, and replay hunk `@@ -101,6 +61,7 @@`; repair present.
   - **Old form sweep:** `createScriptedTTY`: no hits. “scripted TTY” remains as English prose at `tests/setupServer.test.ts:139`, `tests/integration.test.ts:3`, and `guides/terminal.md:1075`; no stale helper identifier.
   - **Report:** `applied`: “`createScriptedTTY` deleted; `createFakeTTY(options?: FakeTTYOptions)` replays `options.scripts` when supplied.” Matches.
   - **Proof:** Red: `/terminal-obj-7-red.txt`: “`Tests 1 failed | 7 passed (8)`,” with empty replay calls. Green: `/terminal-obj-7-green.txt`: “`Tests 8 passed (8)`.” Control file and readings match.

7. **terminal-subj-1**
   - **Site now:** `README.md:17-20` moves from the install fence directly to `## Requirements`; the false tarball paragraph is absent.
   - **Diff:** `@@ -18,10 +14,6 @@`; deletion present.
   - **Old form sweep:** Tarball-pin wording and `file:vendor/orkestrel-form-0.0.1.tgz`: no hits in the requested files.
   - **Report:** `applied`: “The false tarball-pin paragraph deleted from `README.md`.” Matches.

8. **terminal-subj-2**
   - **Site now:** `guides/terminal.md:35-47` contains the blank-line section; `:49` proceeds to the vocabulary section. `## Build and pin` is absent.
   - **Diff:** guide deletion hunks `@@ -51,47 +52,10 @@` and related manifest hunk; `tests/guides.test.ts:80-81` removes `'text'`.
   - **Old form sweep:** `Build and pin`, the old `file:` path, and the old recipe wording: no hits in the requested files.
   - **Report:** `applied`: “The `## Build and pin` section deleted from `guides/terminal.md`; `FENCE_LANGUAGES` dropped `'text'` and its justifying comment.” Matches.

9. **terminal-subj-3**
   - **Site now:** `guides/README.md:27-36` describes `form.md` as a runtime mirror; `:78-92` names `test.md`, `scaffold.md`, and `probe.md`; the console paragraph ends at `:43-46` without the release clause.
   - **Diff:** `@@ -24,25 +24,21 @@`, `@@ -79,23 +75,15 @@`, and additions through `:90-92`; repair present.
   - **Old form sweep:** Old unpublished-form, tarball, and console-`0.0.7` wording: no hits.
   - **Report:** `applied`: “`guides/README.md` names `form.md` as a mirror, drops the console release clause, and adds `test.md`, `scaffold.md`, and `probe.md` paragraphs.” Matches.

10. **terminal-subj-4**
    - **Site now:** `guides/README.md:4` ends with “by concept, and by directory.”; `:94` says “the rules this package is written to.” `tests/src/core/stores/DatabaseTerminalStore.test.ts:34` has no `§14`.
    - **Diff:** `guides/README.md` hunk `@@ -1,7 +1,7 @@` and section hunk `@@ -79,23 +75,15 @@`; test hunk `@@ -31,7 +31,7 @@`. Repair present.
    - **Old form sweep:** `AGENTS §22`, `§22 documentation-as-contracts`, and `§14 fail-closed`: no hits in the owned target files. The legitimate `src/core/errors.ts:3` citation remains.
    - **Report:** `applied`: “The `§N` citations removed from `guides/README.md:4` and `:84` and from the `DatabaseTerminalStore` test name.” Matches.

11. **terminal-subj-6**
    - **Site now:** Surface summaries such as `guides/terminal.md:143-181`, `:192-220`, `:243-280`, and `:327-365` are noun phrases; Methods behavior remains imperative at `:388-456`.
    - **Diff:** guide hunks include `@@ -149,12 +113,12 @@`, `@@ -167,7 +131,7 @@`, `@@ -182,41 +146,41 @@`, `@@ -227,7 +191,7 @@`, `@@ -356,63 +319,58 @@`, and later Surface hunks. Repair present.
    - **Old form sweep:** Imperative Surface starters (`Decode`, `Merge`, `Build`, `Create`, `Narrow`, `Project`, `Hide`, `Show`, `Erase`): no hits in Surface descriptions.
    - **Report:** `applied`: “Every imperative `Summary` cell in the `## Surface` tables recast as a noun phrase; the `## Methods` `Behavior` cells untouched.” Matches.

12. **terminal-subj-7**
    - **Site now:** `guides/terminal.md:45-47` reads: “`required` therefore refuses a blank line. A field with no `required` rule accepts an empty answer.”
    - **Diff:** `@@ -36,14 +37,14 @@`; operative replacement present.
    - **Old form sweep:** `should` and its relevant inflections: no hits in the requested files.
    - **Report:** `applied`: “`guides/terminal.md` bullet rewritten as ‘`required` therefore refuses a blank line. A field with no `required` rule accepts an empty answer.’” Matches.

13. **terminal-subj-8**
    - **Site now:** Count-free wording appears at `src/server/Terminal.ts:82`, `src/server/helpers.ts:2`, `src/core/types.ts:7`, `src/core/helpers.ts:41`, `src/core/constants.ts:114`, `tests/setup.ts:164,199`, `guides/terminal.md:3,18,49,1105,1126`, `guides/README.md:27`, and `README.md:4`.
    - **Diff:** count-removal hunks span the guide, README, source comments, and setup fixture; `tests/setup.ts:164` now exports `createEveryControlSchema`.
    - **Old form sweep:** `createTwelveControlSchema` and the targeted count phrases: no stale hits. Surviving words such as `two-byte`, `Single Shift Three`, and fixture values are permitted by sense.
    - **Report:** `applied`: “Every count over a package-owned set deleted from source, tests, guide, and README; `createTwelveControlSchema` renamed `createEveryControlSchema`.” Matches.
    - **Proof:** No row-specific failing-first control was recorded.

14. **terminal-subj-9**
    - **Site now:** Representative completed blocks are `src/core/helpers.ts:303-312`, `:411-414`, `:478-481`, `:785-788`, `:918-921`, `:988-990`; validators `:12-22` and `:64-69`; server helpers `:218-225`, `:256-263`, `:274-281`; constructor `src/core/errors.ts:24-32`; store twins `MemoryTerminalStore.ts:38-68` and `DatabaseTerminalStore.ts:60-88`.
    - **Diff:** helper TSDoc hunks throughout `src/core/helpers.ts`; validator hunk `@@ -51,7 +54,13 @@`; errors hunk `@@ -22,6 +22,13 @@`; store hunks add parameter/return tags. Repair present.
    - **Old form sweep:** No removed identifier; the former description-only blocks are replaced by tagged blocks.
    - **Report:** `applied`: “`@param` and `@returns` added to every listed export, to `TerminalError`'s constructor, and to both store twins' `get` / `set` / `delete`.” Matches.

15. **terminal-subj-10**
    - **Site now:** `src/core/factories.ts:32-34,62-64,82-84,100-102,119-121`, `MemoryTerminalStore.ts:25-27`, and `DatabaseTerminalStore.ts:37-40` use published imports; the database example separately imports `createMemoryDriver` from `@orkestrel/database`.
    - **Diff:** factory hunks at `@@ -61,7 +61,7 @@`, `@@ -79,7 +79,7 @@`, `@@ -99,7 +99,7 @@`, `@@ -118,7 +118,7 @@`; store example hunks likewise. Repair present.
    - **Old form sweep:** `@src/core` remains in implementation imports and test imports, e.g. `src/server/types.ts:9`, `src/server/Terminal.ts:17,43`, and test files, but no longer appears in the targeted `@example` blocks. Targeted example sweep agrees.
    - **Report:** `applied`: “Every `@example` specifier moved from `@src/core` to `@orkestrel/terminal`; the `DatabaseTerminalStore` example splits `createMemoryDriver` out.” Matches.

16. **terminal-subj-11**
    - **Site now:** `src/core/helpers.ts:416,483,551,636,738,847` exports the `reduce*` family; `src/server/Terminal.ts:32-37,255,262,273,291,316-317,331-332` calls it; `src/core/types.ts:133` links `reduceInput`; guide rows are `:151,156,159,163,168,172`.
    - **Diff:** reducer renames occur in helper hunks `@@ -362 +391`, `@@ -419 +457`, `@@ -480 +527`, `@@ -542 +596`, `@@ -628 +691`, `@@ -707 +779`; call-site and test hunks update imports/calls. Repair present.
    - **Old form sweep:** `inputReduce`, `passwordReduce`, `confirmReduce`, `selectReduce`, `checkboxReduce`, `editorReduce`, and `*Reduce`: no hits.
    - **Report:** `applied`: “The reducer family renamed to `reduceInput`, `reducePassword`, `reduceConfirm`, `reduceSelect`, `reduceCheckbox`, `reduceEditor`.” Matches.

17. **terminal-subj-12**
    - **Site now:** `src/core/types.ts:637-642` defines `{ readonly reason: 'target' }`; `src/core/TerminalManager.ts:191` returns `{ reason: 'target' }`; guide rows are `:252` and `:429`; test assertion is `tests/src/core/TerminalManager.test.ts:164`.
    - **Diff:** type hunk `@@ -635,10 +585,9 @@`; producer hunk `@@ -188,7 +188,7 @@`; test hunk `@@ -156,12 +156,12 @@`; guide changes at corresponding answer rows. Repair present.
    - **Old form sweep:** `reason: 'terminal'`, `reason === 'terminal'`, and the targeted literal: no hits in this package.
    - **Report:** `applied`: “`TerminalAnswerError`'s member renamed `'terminal'` → `'target'` in the type, the producer, the test, and the guide.” Matches.
    - **Proof:** Red: `/terminal-subj-12-red.txt`: “`Tests 1 failed | 12 passed (13)`,” showing expected `terminal` versus received `target`. Green: `/terminal-subj-12-green.txt`: “`Tests 13 passed (13)`.” Control file and readings match.

18. **terminal-subj-14**
    - **Site now:** `src/server/helpers.ts:113-116` defines `renderCursorUp`; `:136` uses it; `src/server/constants.ts:12` links it; guide rows are `:360,473`; tests use it at `tests/src/server/helpers.test.ts:17,66-69`.
    - **Diff:** helper hunk `@@ -127,7 +110,7 @@`; caller hunk `@@ -150,16 +133,16 @@`; guide/test import and call hunks update the name. Repair present.
    - **Old form sweep:** `moveUp`, `moveup`, `moves up`, `moved up`, `moving up`: no hits.
    - **Report:** `applied`: “`moveUp` renamed `renderCursorUp` at its declaration, its caller, the constant's `{@link}`, the guide rows and fence, and the test.” Matches.

19. **fleet-F1**
    - **Site now:** `tests/setup.ts` has no `isBrowserVuePath`; the workspace has no `src/browser`, `app/browser`, or `tests/setupBrowser.ts`.
    - **Diff:** no row-specific diff; report records `noop`.
    - **Old form sweep:** `isBrowserVuePath`: no hits.
    - **Report:** `noop`: “`isBrowserVuePath` is absent… The workspace has no `src/browser`, no `app/browser`, and no `tests/setupBrowser.ts`.” Matches.

20. **fleet-F2**
    - **Site now:** Classes read include `Prompt`, `PromptClient`, `TerminalManager`, `Terminal`, `MemoryTerminalStore`, `DatabaseTerminalStore`, and `TerminalError`; none declares a public `readonly id: string` ahead of private fields. `PromptClient` has `readonly url` at `src/core/PromptClient.ts:62`, which is outside the trigger.
    - **Diff:** no F2 repair hunk.
    - **Old form sweep:** No F2 old form.
    - **Report:** `noop`: “No implementation class declares a public `readonly id: string`.” Matches.

### Across the unit

- **Scope:** All 30 status paths are `owned`: `README.md`; `guides/README.md`; `guides/terminal.md`; `src/core/{TerminalManager.ts,constants.ts,errors.ts,factories.ts,helpers.ts,stores/DatabaseTerminalStore.ts,stores/MemoryTerminalStore.ts,types.ts,validators.ts}`; `src/server/{Terminal.ts,constants.ts,factories.ts,helpers.ts,types.ts}`; `tests/{guides.test.ts,integration.test.ts,setup.test.ts,setup.ts,setupServer.test.ts,setupServer.ts}`; `tests/src/core/{TerminalManager.test.ts,helpers.test.ts,stores/DatabaseTerminalStore.test.ts,validators.test.ts}`; `tests/src/server/{Terminal.test.ts,factories.test.ts,helpers.test.ts}`. No diff hunk belongs to a file absent from a row’s `Where`.
- **Residue in diff `+` lines:** Pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: hits at diff lines `479`, `516`, `1029`, `1060`, `1153`, `1156`, `1158`, `1197`, `1848`, `2094`, `2136`, `2213-2214`, and `2948-2950`; all are legitimate documentation, timeout/retry names, or validator tests. No skip/only/todo/TODO/FIXME/console/debugger residue.
- **Residue in tree:** Same pattern, excluding the four vendored test files, hits legitimate `retry`/`timeout` text and values at `tests/guides.test.ts:258,300,377-378`; `tests/src/core/stores/DatabaseTerminalStore.test.ts:10,37`; `tests/src/server/Terminal.test.ts:154,164,195-196`; `tests/setup.ts:355,358,361,371-372,375,397-403`; `tests/src/core/validators.test.ts:19-21`; `tests/src/core/TerminalManager.test.ts:188-189`; `src/core/stores/{DatabaseTerminalStore.ts:43,MemoryTerminalStore.ts:30}`; `src/core/TerminalManager.ts:38,71,79,112,118,207,216`; `src/core/types.ts:369,415,427,453,473,623,629,704,710`; `src/core/Prompt.ts:41,49,96`; `src/core/PromptClient.ts:46-47`; `tests/src/core/{Prompt.test.ts:131,PromptClient.test.ts:121,159-160,factories.test.ts:49-50,stores/MemoryTerminalStore.test.ts:7}`. No forbidden residue was found.
- **Gates:** The report states verbatim:
  - `npm run format:check` — exit `0`
  - `npm run lint:check` — exit `0`
  - `npm run check` — exit `0`
  - `npm run build` — exit `0`
  - `npm test` — exit `0`
  - `npx scaffold audit --offline` — exit `0`
- **Breaking sweep:** Across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding terminal, node_modules, and guide mirrors, all old published names had no hits except `/home/user/fleet/toolbox/src/server/terminals/TerminalBridge.ts:136`, which still checks `result.error.reason === 'terminal'`. The required shared patch is to use `'target'`.
- **Writing sweep:** Pattern hits in added prose are:
  - `guides/terminal.md:479`: “a new field group”
  - `guides/terminal.md:516`: “before the new one”
  - `src/core/helpers.ts` diff lines `1029,1060,1153,1156,1158,1197`: “new state”, “new list”, “currently ticked”, “new buffer”
  - `src/server/helpers.ts` diff line `1848`: “a new field group”
  The added `new DOMException` at diff line `2106` is code, not prose. Count-pattern sweep returned no hits.

### Parity

- `TerminalInterface`: `src/core/types.ts:324` member `ask`; guide Methods table `guides/terminal.md:388-394` member `ask`. Implemented by `src/server/Terminal.ts:109`.
- `PromptInterface`: `src/core/types.ts:491-500` members `park`, overloaded `pending`, `answer`, overloaded `stop`, `destroy`; guide `:396-406` matches.
- `PromptClientInterface`: `src/core/types.ts:592-598` members `connect`, `disconnect`, `destroy`; guide `:408-416` matches. Implemented by `PromptClient`.
- `TerminalManagerInterface`: `src/core/types.ts:670-685` members `terminal`, `terminals`, `add`, `ask`, overloaded `pending`, `answer`, `open`, `save`, overloaded `remove`, `destroy`; guide `:418-433` matches. Implemented by `TerminalManager`.
- `TerminalStoreInterface`: `src/core/types.ts:728-730` members `get`, `set`, `delete`; guide `:435-443` matches. Implemented by both store classes.
- `InputStreamInterface`: `src/server/types.ts:32-37` members `on`, `off`, optional `setRawMode`, `resume`, `pause`; guide `:445-456` matches.
- Readonly data properties are documented by the matching Surface rows: `KeyEvent` (`types.ts:35-39`, guide `:118`), `PromptTheme` (`:112-113`, guide `:132`), `PromptThemeOptions` (`:123-124`, guide `:133`), reducer states (`:143-238`, guide `:148-172`), `PromptStep` (`:267-270`, guide `:109`), broker records/options (`:358-440`, guide `:195-204`), bridge records/options (`:516-569`, guide `:232-235`), manager options/errors (`:627-642`, guide `:250-252`), wire/store records (`:695-730`, guide `:215,262-263`), and server options (`src/server/types.ts:61-63`, guide `:326-327`). Guide `:382-386` explicitly identifies data-only and union/callable types as having no Methods table.
- Backticked identifiers added in guide prose resolve as follows: package-owned names such as `TerminalInterface`, `PromptInterface`, `PromptClientInterface`, `TerminalManagerInterface`, `TerminalStoreInterface`, `Terminal`, `InputStreamInterface`, all `reduce*`/`render*`/`create*` helpers, constants, guards, serializers, and error types are exported by `src/core/index.ts` or `src/server/index.ts`. Dependency/path identifiers such as `@orkestrel/form`, `@orkestrel/database`, `@orkestrel/console`, `form.md`, `test.md`, `scaffold.md`, and `probe.md` are not terminal-barrel exports and are correctly external links/imports.

## Distillate

- `terminal-obj-2`: console `ESC`/`CSI` reused; diff present yes; old form hits 0; report matches yes.
- `terminal-obj-3`: server uses core `RETURN`/`NEWLINE`; diff present yes; old form hits 9 generic prose hits; report matches yes.
- `terminal-obj-4`: console `StreamTargetInterface`/`isStreamTarget`; diff present yes; old form hits 0; report matches yes.
- `terminal-obj-5`: fence block exists but is incomplete; diff present yes; old form hits 0; report matches no.
- `terminal-obj-6`: mirrored validator test exists; diff present yes; old form hits 0; report matches yes.
- `terminal-obj-7`: one configurable `createFakeTTY`; diff present yes; old form hits 3 prose hits; report matches yes.
- `terminal-subj-1`: false README pin paragraph removed; diff present yes; old form hits 0; report matches yes.
- `terminal-subj-2`: obsolete build/pin section removed; diff present yes; old form hits 0; report matches yes.
- `terminal-subj-3`: dependency mirror index corrected; diff present yes; old form hits 0; report matches yes.
- `terminal-subj-4`: invalid section citations removed; diff present yes; old form hits 0; report matches yes.
- `terminal-subj-6`: Surface summaries use noun phrases; diff present yes; old form hits 0; report matches yes.
- `terminal-subj-7`: `should` removed; diff present yes; old form hits 0; report matches yes.
- `terminal-subj-8`: package-set counts removed and fixture renamed; diff present yes; old form hits 0; report matches yes.
- `terminal-subj-9`: TSDoc tags added; diff present yes; old form hits 0; report matches yes.
- `terminal-subj-10`: examples use published specifiers; diff present yes; old form hits 0 targeted hits; report matches yes.
- `terminal-subj-11`: reducer family is verb-first; diff present yes; old form hits 0; report matches yes.
- `terminal-subj-12`: answer error uses `'target'`; diff present yes; old form hits 0 in package, 1 shared consumer; report matches yes.
- `terminal-subj-14`: `moveUp` is `renderCursorUp`; diff present yes; old form hits 0; report matches yes.
- `fleet-F1`: browser-path helper absent in non-browser workspace; diff present no; old form hits 0; report matches yes.
- `fleet-F2`: no matching public `id` field shape; diff present no; old form hits 0; report matches yes.

Scope: all 30 status paths owned; no unmatched diff-file hunks.  
Residue: no forbidden skip/only/todo/TODO/FIXME/console/debugger usage; only legitimate retry/timeout text.  
Writing hits: `new`, `currently` in added prose as listed above; no count-pattern hits.  
Parity: interface Methods tables and readonly Surface properties agree, except the guide-fence proof is incomplete.

## Unknowns

- The report’s independent deciding whole-suite run was not available; only its captured unit run was read.
- The report does not provide a separate failing-first control for rows terminal-obj-2, terminal-obj-3, terminal-obj-4, or terminal-subj-9 through terminal-subj-11 and terminal-subj-14.
- The guide-fence claim cannot be treated as complete because the current test block omits several value assertions listed above.
- `@src/core` remains in ordinary source/test imports by design; only public `@example` blocks were checked for replacement.

## Journal

Leave this line for the driver.

## Deviation

No tree change was made. No file was created, edited, or deleted. All requested evidence files and tree inputs were readable; all requested sweeps were run read-only.