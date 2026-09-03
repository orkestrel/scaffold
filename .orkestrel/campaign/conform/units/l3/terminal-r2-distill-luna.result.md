## Question

For every `conform-terminal` row, map the current tree, diff, old-form sweeps, report readings, and available proofs.

## Evidence

### Per-row findings

1. **terminal-obj-2**
   - **Site now:** `src/core/constants.ts:2` imports `CSI` and `ESC`; `:40` defines `KEY_SS3` from `ESC`; `:55-69` uses `CSI`; `:92` uses `ESC`. `src/server/constants.ts:9` imports `CSI`; `:16`, `:21`, `:26`, and `:32` derive sequences from it. The removed declarations do not exist.
   - **Diff:** `conform-terminal.diff:753` (`@@ -1,9 +1,10 @@`) adds the console import; `:775` removes `ESCAPE`; `:801` replaces `KEY_CSI` with `CSI`; `:843` replaces `ESCAPE` with `ESC`; `:1703` removes the server declarations and `:1721` adds the console import. The operative replacement text is present.
   - **Old-form sweep:** `\b(ESCAPE|KEY_CSI|CSI)\b` and case-insensitive `\b(escape|escaped|escaping|escapes|key_csi)\b` over `src`, `tests`, `guides/terminal.md`, `guides/README.md`, and `README.md`: no removed identifier hit. Protocol-word `escape` remains in `src/core/constants.ts:43,83,92`, `src/core/helpers.ts:50,56,58,64,82,88,102`, `src/core/types.ts:21,25`, `tests/setup.test.ts:138`, `tests/src/core/helpers.test.ts:109`, `tests/setupServer.test.ts:89`, and `guides/terminal.md:303,538`.
   - **Report:** `terminal-obj-2 | applied | ESCAPE deleted from both modules, KEY_CSI and the server CSI deleted; CSI and ESC imported from @orkestrel/console and KEY_SS3 built from ESC`. The current sites match.
   - **Proof:** Placement/reuse row; the report’s sweep is the applicable proof. No behavioral control file is named.

2. **terminal-obj-3**
   - **Site now:** `src/core/constants.ts:12,14` retain `RETURN` and `NEWLINE`. `src/server/constants.ts:9,16-32` uses core-independent `CSI` sequences and has no `CARRIAGE_RETURN` or `LINE_FEED`. `src/server/Terminal.ts:30,186,198,310,346,361,368,423,465,473,483,507` uses `NEWLINE`; `src/server/helpers.ts:8,136` uses `RETURN`.
   - **Diff:** `conform-terminal.diff:1699` and `:1729` remove the server declarations; `:1452`, `:1542`, and subsequent Terminal hunks replace `LINE_FEED` with `NEWLINE`; `:1755` and `:1822` replace `CARRIAGE_RETURN` with `RETURN`.
   - **Old-form sweep:** `\b(CARRIAGE_RETURN|LINE_FEED)\b` and case-insensitive inflection sweep over the required paths: no identifier hit. The descriptive phrases “carriage return” and “line feed” remain as protocol concepts at `guides/terminal.md:291-292` and `src/core/constants.ts:11,14`.
   - **Report:** `terminal-obj-3 | applied | CARRIAGE_RETURN and LINE_FEED deleted from src/server/constants.ts; the server reads core's RETURN and NEWLINE`. The current sites match.
   - **Proof:** Placement row; the old-name sweep is the applicable proof.

3. **terminal-obj-4**
   - **Site now:** `src/server/types.ts:10` imports `StreamTargetInterface`; `:62` uses it for `TerminalOptions.output`. `src/server/Terminal.ts:19,46,111,124` uses the foreign type and `isStreamTarget`. `isOutputStream` and `OutputStreamInterface` do not exist.
   - **Diff:** `conform-terminal.diff:1897` adds the foreign import and documentation; `:1924` removes `OutputStreamInterface`; `:1962` changes the option type; `:1788` removes `isOutputStream`.
   - **Old-form sweep:** `\b(OutputStreamInterface|isOutputStream)\b` and case-insensitive `\b(output stream interface|outputstreaminterface|isoutputstream)\b`: no hit in the required paths.
   - **Report:** `terminal-obj-4 | applied | OutputStreamInterface and isOutputStream deleted; TerminalOptions.output is console's StreamTargetInterface, narrowed by isStreamTarget`. The current sites match.
   - **Proof:** Placement/reuse row; the old-form sweep is the applicable proof.

4. **terminal-obj-5**
   - **Site now:** `tests/guides.test.ts:251-626` contains the `guide fences` block. It exercises broker, wire, sanitization, reducer, theme, store, manager, and server-helper fence values.
   - **Diff:** `conform-terminal.diff:2086` (`@@ -176,3 +251,376 @@`) adds the block. The fence assertions are present.
   - **Old-form sweep:** No removed-name form applies.
   - **Report:** `terminal-obj-5 | applied | tests/guides.test.ts gained a guide fences block...`.
   - **Proof:** `/home/user/work/evidence/terminal-proofs/terminal-obj-5-red.txt` records `Tests 1 failed | 51 passed (52)` for the planted mismatch. `terminal-obj-5-green.txt` records `Tests 52 passed (52)`. The later fix-round controls also record `fix1-existing-green.txt` and `fix1-manager-green.txt` with `Tests 60 passed (60)`.

5. **terminal-obj-6**
   - **Site now:** `tests/src/core/validators.test.ts:1-23` mirrors `src/core/validators.ts`; `tests/src/core/helpers.test.ts` no longer imports or tests the four guards.
   - **Diff:** `conform-terminal.diff:3124` adds the new file with the validator cases.
   - **Old-form sweep:** `tests/src/core/validators.test.ts` exists; no stale guard cases remain in `helpers.test.ts`.
   - **Report:** `terminal-obj-6 | applied | tests/src/core/validators.test.ts created; the guard cases moved there out of tests/src/core/helpers.test.ts`.
   - **Proof:** `terminal-obj-6-red.txt` records `No test files found, exiting with code 1`. `terminal-obj-6-green.txt` records `Tests 2 passed (2)`.

6. **terminal-obj-7**
   - **Site now:** `tests/setupServer.ts:44-47` defines `FakeTTYOptions`; `:53-106` defines the single `createFakeTTY`. `tests/setupServer.test.ts:34-145` covers manual, scripted, exhausted, and empty scripts.
   - **Diff:** `conform-terminal.diff:2735` removes the duplicate helper; `:2796` adds the unified helper; `:2641` folds the test block.
   - **Old-form sweep:** Exact `\bcreateScriptedTTY\b`: no hit. Case-insensitive `\bscripted ?tty\b` hits English descriptions at `tests/integration.test.ts:3`, `tests/setupServer.test.ts:139`, and `guides/terminal.md:1075`; no function identifier remains.
   - **Report:** `terminal-obj-7 | applied | createScriptedTTY deleted; createFakeTTY(options?: FakeTTYOptions) replays options.scripts when supplied`.
   - **Proof:** `terminal-obj-7-red.txt` records `Tests 1 failed | 7 passed (8)`. `terminal-obj-7-green.txt` records `Tests 8 passed (8)`.

7. **terminal-subj-1**
   - **Site now:** `README.md:18-22` contains the install fence followed directly by `## Requirements`; the tarball paragraph is absent.
   - **Diff:** `conform-terminal.diff:17` (`@@ -18,10 +18,6 @@`) removes the paragraph.
   - **Old-form sweep:** Tarball-pin wording and `file:vendor/orkestrel-form-0.0.1.tgz` have no hit in the required paths.
   - **Report:** `terminal-subj-1 | applied | The false tarball-pin paragraph deleted from README.md`.
   - **Proof:** Documentation row; the paragraph/path sweep is empty.

8. **terminal-subj-2**
   - **Site now:** `guides/terminal.md:52-57` goes from the blank-line section directly to `## Surface`; `## Build and pin` and its fence are absent. `tests/guides.test.ts:99` has `FENCE_LANGUAGES = Object.freeze(['ts'])`.
   - **Diff:** `conform-terminal.diff:162` removes `@@ -51,47 +52,10 @@`; `:2059` removes the `text` fence language.
   - **Old-form sweep:** `^## Build and pin$`, the stale `0.0.7`, `0.0.8`, `0.0.9`, and the file-pin path over the required paths: no hit.
   - **Report:** `terminal-subj-2 | applied | The ## Build and pin section deleted from guides/terminal.md; FENCE_LANGUAGES dropped 'text' and its justifying comment`.
   - **Proof:** Documentation row; section and stale-pin sweeps are empty.

9. **terminal-subj-3**
   - **Site now:** `guides/README.md:25-34` documents `form.md` as a mirror; `:36-43` ends the console paragraph without a release version; `:75-93` names `test.md`, `scaffold.md`, and `probe.md`.
   - **Diff:** `conform-terminal.diff:50` rewrites the form paragraph; `:85` adds the three devDependency mirror paragraphs; `:101` adds the probe paragraph.
   - **Old-form sweep:** The stale “not mirrored”, committed-tarball, and console `0.0.7` wording has no hit in `guides/README.md`.
   - **Report:** `terminal-subj-3 | applied | guides/README.md names form.md as a mirror, drops the console release clause, and adds test.md, scaffold.md, and probe.md paragraphs`.
   - **Proof:** Documentation row; the stale-claim sweep agrees with the current guide.

10. **terminal-subj-4**
    - **Site now:** `guides/README.md:4` ends with “directory.”; `:84` says “the rules this package is written to.” `tests/src/core/stores/DatabaseTerminalStore.test.ts:34` has no `§14` suffix.
    - **Diff:** `conform-terminal.diff:41` removes `AGENTS §22`; `:109` removes the second citation; `:3115` removes `§14 fail-closed`.
    - **Old-form sweep:** `§22`, `§14`, and `documentation-as-contracts` over the required paths: no hit. The valid `§ Errors and outcomes` citation remains at `src/core/errors.ts:3`.
    - **Report:** `terminal-subj-4 | applied | The §N citations removed from guides/README.md:4 and :84 and from the DatabaseTerminalStore test name`.
    - **Proof:** Documentation row; the citation sweep agrees.

11. **terminal-subj-6**
    - **Site now:** The changed Surface rows at `guides/terminal.md:113-372` use noun phrases, including `reduceInput`, `reducePassword`, `reduceConfirm`, `reduceSelect`, `reduceCheckbox`, `reduceEditor`, `renderCursorUp`, and the store factories. Methods behavior remains unchanged at `:390-455`.
    - **Diff:** Surface hunks include `conform-terminal.diff:212,240,306,329,359,372,411,426`; the imperative descriptions are replaced in `+` lines.
    - **Old-form sweep:** The listed imperative Surface starts (`Decode`, `Merge`, `Build`, `Create`, `Narrow`, `Project`, `Hide`, `Show`, `Erase`) have no remaining hit in the Surface tables.
    - **Report:** `terminal-subj-6 | applied | Every imperative Summary cell in the ## Surface tables recast as a noun phrase; the ## Methods Behavior cells untouched`.
    - **Proof:** Naming/documentation sweep agrees with the report.

12. **terminal-subj-7**
    - **Site now:** `guides/terminal.md:45-47` reads “`required` therefore refuses a blank line. A field with no `required` rule accepts an empty answer.”
    - **Diff:** `conform-terminal.diff:144` replaces the entire bullet.
    - **Old-form sweep:** `\bshould\b` over the required paths: no hit.
    - **Report:** `terminal-subj-7 | applied | guides/terminal.md bullet rewritten as "`required` therefore refuses a blank line. A field with no `required` rule accepts an empty answer."`
    - **Proof:** Documentation sweep agrees.

13. **terminal-subj-8**
    - **Site now:** Counts were removed from the cited source and documentation sites. `tests/setup.ts:164` defines `createEveryControlSchema`; its callers use that name.
    - **Diff:** Relevant additions include `conform-terminal.diff:1510`, `:1750`, `:1760`, `:1830`, `:2592`, and `:2601`.
    - **Old-form sweep:** Numeric count pattern `\b\d+ (elements|members|rules|rows|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections|constants|passes|categories)\b`: no hit. Number-word sweep leaves only permitted byte, protocol, fixture, and named-member uses recorded in the report.
    - **Report:** `terminal-subj-8 | applied | Every count over a package-owned set deleted from source, tests, guide, and README; createTwelveControlSchema renamed createEveryControlSchema`.
    - **Proof:** The report records the empty numeric sweep and the permitted remaining word matches.

14. **terminal-subj-9**
    - **Site now:** `src/core/helpers.ts:296-304,334-342,351-358,391-397,408-415,473-482,527-534,543-551,596-603,628-636,691-698,730-738,779-789,819-825,839-847,880-888,915-921,941-947,983-991` contain parameter and return documentation. `src/core/validators.ts:10-16,58-65`, `src/server/helpers.ts:210-218,244-253,262-271`, `src/core/errors.ts:25-33`, and both store twins’ point-access methods are documented.
    - **Diff:** Documentation additions appear in `conform-terminal.diff:948-1270`, `:1292-1373`, and `:1424-1444`.
    - **Old-form sweep:** No stale description-only block is named by the row; the added `@param` and `@returns` tags are present.
    - **Report:** `terminal-subj-9 | applied | @param and @returns added to every listed export, to TerminalError's constructor, and to both store twins' get / set / delete`.
    - **Proof:** Documentation/TSDoc sweep agrees.

15. **terminal-subj-10**
    - **Site now:** `src/core/factories.ts:34,64,84,102,121`, `MemoryTerminalStore.ts:27`, and `DatabaseTerminalStore.ts:39-40` use published specifiers. The database example imports `createMemoryDriver` from `@orkestrel/database`.
    - **Diff:** `conform-terminal.diff:883,892,901,910,919,1277,1332` changes the examples.
    - **Old-form sweep:** `@src/core` inside `@example` blocks in the named files: no hit.
    - **Report:** `terminal-subj-10 | applied | Every @example specifier moved from @src/core to @orkestrel/terminal; the DatabaseTerminalStore example splits createMemoryDriver out`.
    - **Proof:** Documentation sweep agrees. `src/core/index.ts:1-11` exports the terminal symbols; it does not re-export the database primitive.

16. **terminal-subj-11**
    - **Site now:** `src/core/helpers.ts:416,483,551,636,738,847` defines the verb-first reducer family. `src/server/Terminal.ts:255,262,273,291,316,331`, tests, guide rows, and fences use the same names.
    - **Diff:** `conform-terminal.diff:1022,1050,1077,1105,1133,1147,1187,607,652,661` updates declarations and consumers.
    - **Old-form sweep:** `\b(input|password|confirm|select|checkbox|editor)Reduce\b|\*Reduce` over the required paths: no hit.
    - **Report:** `terminal-subj-11 | applied | The reducer family renamed to reduceInput, reducePassword, reduceConfirm, reduceSelect, reduceCheckbox, reduceEditor`.
    - **Proof:** Naming sweep agrees; no control file is named.

17. **terminal-subj-12**
    - **Site now:** `src/core/types.ts:642` uses `{ readonly reason: 'target' }`; `src/core/TerminalManager.ts:191` produces it; `tests/src/core/TerminalManager.test.ts:164` expects it; `guides/terminal.md:252,429` documents it.
    - **Diff:** `conform-terminal.diff:1400` changes the union; `:740` changes the producer; `:2837` changes the test; `:359` and `:530` change the guide.
    - **Old-form sweep:** `reason: 'terminal'|reason === 'terminal'|'terminal' }` over the package: no hit. The consumer hit remains at `/home/user/fleet/toolbox/src/server/terminals/TerminalBridge.ts:136`.
    - **Report:** `terminal-subj-12 | applied | TerminalAnswerError's member renamed 'terminal' → 'target' in the type, the producer, the test, and the guide`.
    - **Proof:** `terminal-subj-12-red.txt` records `Tests 1 failed | 12 passed (13)`; `terminal-subj-12-green.txt` records `Tests 13 passed (13)`.

18. **terminal-subj-14**
    - **Site now:** `src/server/helpers.ts:113` defines `renderCursorUp`; `:136` calls it from `redrawPrefix`. `src/server/constants.ts:16` links to it; `guides/terminal.md:340,363,983,1017` and `tests/src/server/helpers.test.ts:56-64` use it.
    - **Diff:** `conform-terminal.diff:1813` and `:1822` rename the helper; `:3375` updates tests; guide hunks at `:426` and `:676` update the public references.
    - **Old-form sweep:** `\bmoveUp\b|\b(moveup|moves up|moved up|moving up)\b`: no hit.
    - **Report:** `terminal-subj-14 | applied | moveUp renamed renderCursorUp at its declaration, its caller, the constant's link, the guide rows and fence, and the test`.
    - **Proof:** Naming sweep agrees.

19. **fleet-F1**
    - **Site now:** `isBrowserVuePath` is absent; `src/browser`, `app/browser`, and `tests/setupBrowser.ts` are absent. `tests/setup.ts:1-406` contains other setup exports.
    - **Diff:** No related hunk.
    - **Old-form sweep:** `\bisBrowserVuePath\b` over the terminal tree: no hit.
    - **Report:** `fleet-F1 | noop | isBrowserVuePath is absent... The workspace has no src/browser, no app/browser, and no tests/setupBrowser.ts`.
    - **Proof:** The absence sweep agrees.

20. **fleet-F2**
    - **Site now:** No implementation class has a public `readonly id: string` field. The report’s class inventory is consistent with the visible implementation files. `PromptClient`’s `url` field is unrelated to this trigger.
    - **Diff:** No related hunk.
    - **Old-form sweep:** No `readonly id: string` implementation-field trigger exists.
    - **Report:** `fleet-F2 | noop | No implementation class declares a public readonly id: string`.
    - **Proof:** No class requires the JSON serialization check.

### Across the unit

**Scope.** Every status path is under the brief’s Owned scope:

`README.md`; `guides/README.md`; `guides/terminal.md`; `src/core/TerminalManager.ts`; `src/core/constants.ts`; `src/core/errors.ts`; `src/core/factories.ts`; `src/core/helpers.ts`; `src/core/stores/DatabaseTerminalStore.ts`; `src/core/stores/MemoryTerminalStore.ts`; `src/core/types.ts`; `src/core/validators.ts`; `src/server/Terminal.ts`; `src/server/constants.ts`; `src/server/factories.ts`; `src/server/helpers.ts`; `src/server/types.ts`; `tests/guides.test.ts`; `tests/integration.test.ts`; `tests/setup.test.ts`; `tests/setup.ts`; `tests/setupServer.test.ts`; `tests/setupServer.ts`; `tests/src/core/TerminalManager.test.ts`; `tests/src/core/helpers.test.ts`; `tests/src/core/stores/DatabaseTerminalStore.test.ts`; `tests/src/core/validators.test.ts`; `tests/src/server/Terminal.test.ts`; `tests/src/server/factories.test.ts`; `tests/src/server/helpers.test.ts`. No shared or off-limits path appears in the evidence status.

**Diff hunks in files not named by a row’s `Where`.**

- `src/core/TerminalManager.ts`: `@@ -188,7 +188,7 @@` — `+ if (broker === undefined) return ...`.
- `src/core/errors.ts`: `@@ -22,6 +22,13 @@` — `+/**`.
- `src/core/factories.ts`: `@@ -31,7 +31,7`, `@@ -61,7 +61,7`, `@@ -81,7 +81,7`, `@@ -99,7 +99,7`, `@@ -118,7 +118,7` — each adds `+ * import ... from '@orkestrel/terminal'`.
- `src/core/stores/MemoryTerminalStore.ts`: `@@ -24,7 +24,7` — `+ * import { createMemoryTerminalStore } ...`; `@@ -35,18 +35,34` — `+/**`.
- `src/server/Terminal.ts`: import, reducer, output-type, constructor, newline, renderer, and reducer-call hunks at `@@ -16,11 +16,10`, `@@ -28,19 +27,23`, `@@ -51,7 +54,6` (no addition), `@@ -59,7 +61,6` (no addition), `@@ -83,7 +84,7`, `@@ -107,7 +108,7`, `@@ -120,7 +121,7`, `@@ -182,7 +183,7`, `@@ -194,7 +195,7`, `@@ -242,23 +243,23`, `@@ -269,7 +270,7`, `@@ -287,7 +288,7`, `@@ -306,15 +307,13`, `@@ -329,7 +328,7`, `@@ -344,7 +343,7`, `@@ -359,14 +358,14`, `@@ -421,7 +420,7`, `@@ -463,7 +462,7`, `@@ -471,7 +470,7`, `@@ -481,7 +480,7`, and `@@ -505,7 +504,7`.
- `src/server/factories.ts`: `@@ -16,7 +16,7` — `+ * - **Every control renders.** The line-read controls ...`.
- `tests/integration.test.ts`: `@@ -15,7 +15,7`, `@@ -186,7 +186,7`, `@@ -212,20 +212,22`.
- `tests/setup.test.ts`: `@@ -8,7 +8,7`, `@@ -22,11 +22,11`, `@@ -132,7 +132,7`, `@@ -196,9 +196,9`, `@@ -221,7 +221,7`, `@@ -230,7 +230,7`.
- `tests/setup.ts`: `@@ -161,7 +161,7`, `@@ -224,7 +224,7`.
- `tests/setupServer.test.ts`: `@@ -1,19 +1,14`, `@@ -97,11 +92,22`, `@@ -119,7 +125,7`, `@@ -128,9 +134,15`.
- `tests/src/core/TerminalManager.test.ts`: `@@ -156,12 +156,12` — `+ it('returns target...')`.
- `tests/src/core/stores/DatabaseTerminalStore.test.ts`: `@@ -31,7 +31,7` — `+ it('an off-shape stored row...')`.
- `tests/src/core/validators.test.ts`: `@@ -0,0 +1,23 @@` — `+import { isPendingForm...`.
- `tests/src/server/Terminal.test.ts`: import and fixture hunks at `@@ -1,43 +1,39`, `@@ -62,7 +58,7`, `@@ -75,10 +71,12`, `@@ -87,7 +85,7`, `@@ -108,7 +106,7`, `@@ -134,7 +132,7`, `@@ -154,10 +152,12`, `@@ -207,7 +207,7`, `@@ -216,7 +216,7`, `@@ -235,7 +235,7`, and `@@ -266,7 +266,7`.
- `tests/src/server/factories.test.ts`: `@@ -1,6 +1,6`, `@@ -12,7 +12,7`.
- `tests/src/server/helpers.test.ts`: `@@ -1,17 +1,15`, `@@ -20,7 +18,7`, `@@ -34,12 +32,6` (no addition), and `@@ -61,15 +53,15`.

**Residue sweep.** Pattern `(\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger)` over `src` and `tests`, excluding the named vendored files, returned these legitimate hits:

- `src/core/stores/DatabaseTerminalStore.ts:43`; `src/core/stores/MemoryTerminalStore.ts:30`.
- `src/core/validators.ts:64,67,68`.
- `src/core/TerminalManager.ts:38,71,79,112,118,207,216`.
- `src/core/types.ts:369,415,427,453,473,623,629,704,710`.
- `src/core/PromptClient.ts:46,47`; `src/core/Prompt.ts:41,49,96`.
- `tests/src/core/stores/DatabaseTerminalStore.test.ts:10,37`; `tests/src/core/stores/MemoryTerminalStore.test.ts:7`; `tests/src/core/Prompt.test.ts:131`; `tests/src/core/PromptClient.test.ts:121,159,160`; `tests/src/core/factories.test.ts:49,50`; `tests/src/core/TerminalManager.test.ts:188,189`; `tests/src/core/validators.test.ts:19,20,21`; `tests/src/server/Terminal.test.ts:154,164,195,196`.
- `tests/setup.ts:355,358,361,371,372,375,397,398,402,403`.

No `.skip`, `.only`, `.todo`, `TODO`, `FIXME`, or debugger residue was found.

**Added-line residue sweep.** Pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` over added diff lines hit `conform-terminal.diff:236,377,1443,2115,2165,2319,2320,2329,2330,2406,2408,3148,3149,3150`. These are documentation words, timeout data, retry prose, or validator fixtures; no prohibited test modifier or debug statement was added.

**Guide parity.**

| Entity or contract | Type members | Guide rows | Data/surface alignment |
|---|---|---|---|
| `TerminalInterface` | `ask` — `src/core/types.ts:323-324` | `guides/terminal.md:394-397` | No readonly data members |
| `TerminalManagerInterface` | `terminal`, `terminals`, `add`, `ask`, `pending`, `answer`, `open`, `save`, `remove`, `destroy` — `src/core/types.ts:669-683` | `guides/terminal.md:424-433` | `emitter` and `count` are represented in the Surface row at `:247` |
| `TerminalStoreInterface` | `get`, `set`, `delete` — `src/core/types.ts:727-730` | `guides/terminal.md:441-443` | No readonly data members |
| `TerminalOptions` | `input`, `output`, `theme` — `src/server/types.ts:60-63` | `guides/terminal.md:326-327` | `output` is `StreamTargetInterface` |
| `MemoryTerminalStore` | Implements `get`, `set`, `delete` | `guides/terminal.md:441-443` | No public data members |
| `DatabaseTerminalStore` | Implements `get`, `set`, `delete` | `guides/terminal.md:441-443` | No public data members |
| Reducer and server helper exports | `reduce*`, `renderCursorUp`, and related functions are exported through `src/core/index.ts:1-11` and `src/server/index.ts:1-6` | Surface rows at `guides/terminal.md:146-372` | Renamed rows and fences use the exported names |

Added guide identifiers resolve as follows: core names resolve through `src/core/index.ts:1-11`; server names resolve through `src/server/index.ts:1-6`; `StreamTargetInterface`, `isStreamTarget`, `StylerInterface`, `strip`, `stripControls`, `freezeStyle`, and `createMemoryDriver` intentionally resolve to their originating packages and are not terminal-barrel exports. `AGENTS.md` is a documentation link, not an API identifier.

**Breaking.** The report names removed `ESCAPE`, `KEY_CSI`, server `CSI`, `CARRIAGE_RETURN`, `LINE_FEED`, `OutputStreamInterface`, and `isOutputStream`; renamed the six reducer helpers and `moveUp`; and changed the `TerminalAnswerError` literal and `TerminalOptions.output` type. The exact consumer patch is `/home/user/fleet/toolbox/src/server/terminals/TerminalBridge.ts:136`: replace `reason === 'terminal'` with `reason === 'target'`. The fleet sweep found no other old published identifiers in `/home/user/fleet/toolbox/src`, `/home/user/fleet/toolbox/tests`, or `/home/user/scaffold/src`.

**Gates.** The report’s `§ Gates` table states:

- `npm run format:check` — exit `0`; `All matched files use the correct format.`
- `npm run lint:check` — exit `0`; no diagnostic.
- `npm run check` — exit `0`; root, core, and server projects clean.
- `npm run build` — exit `0`; core and server ESM+CJS builds completed.
- `npm test` — exit `0`; source, policy, config, setup, guides, and integration suites passed.
- `npx scaffold audit --offline` — exit `0`; `0 of 40 planned paths drifted from the plan.`

The named capture files exist under `/home/user/work/evidence/terminal-proofs/`. These gates were not independently rerun here.

**Writing sweep.** Pattern `(?i)\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e.g.|i.e.|etc.|please|sanity|dummy|ensure|guarantee)\b` plus the growable-set count pattern over added diff lines returned these matches:

`conform-terminal.diff:139 "one question"`; `:224 "One decoded"`; `:227 "One line-editing"`; `:236 "console"`; `:249 "default"`; `:268 "default"`; `:269 "one row"`; `:276 "every value"`; `:279 "One index"`; `:286 "editor reducer"`; `:300 "One single-line"`; `:342 "One SSE-shaped"`; `:377 "numeric timeout"`; `:417 "KEY_SS3"`; `:422 "console"`; `:439 "interactive driver"`; `:440 "factory"`; `:472 "How many"`; `:473 "sequence"`; `:474 "reposition"`; `:476 "One held"`; `:480 "read-only"`; `:483 "numbered"`; `:513 "template"`; `:514 "new"`; `:516 "new one"`; `:517 "per control"`; `:518 "one path"`; `:521 "mark"`; `:523 "prompt"`; `:524 "prompt"`; `:525 "hint"`; `:526 "hint"`; `:572 "Each"`; `:593 "already carries"`; `:709 "renderCursorUp"`; `:723 "ticket"`; `:783 "Single Shift Three"`; `:872-874 "@param"`; `:938-939 "create*State"`; `:949-953 "Checks whether"`; `:1014-1017 "new state"`; `:1042-1045 "password"`; `:1055 "reduceInput"`; `:1097-1100 "select"`; `:1125-1128 "checkbox"`; `:1153-1158 "new"`; `:1193-1197 "new buffer"`; `:1246-1247 "form"`; `:1258 "expire"`; `:1297 "numeric timeout"`; `:1320 "Drops"`; `:1368 "Drops"`; `:1387 "controls"`; `:1443 "numeric timeout"`; `:1725 "renderCursorUp"`; `:1751 "Every control"`; `:1768-1773 "families"`; `:1906 "new"`; `:1955 "StreamTargetInterface"`; `:2138 "wire frames"`; `:2169 "sanitizes"`; `:2203 "reducer values"`; `:2218 "password"`; `:2231 "select"`; `:2249 "focused box"`; `:2267 "new"`; `:2271 "editor"`; `:2281 "themed"`; `:2317 "snapshot"`; `:2323 "no-op"`; `:2327 "database-store"`; `:2411 "restored"`; `:2418 "server-helper"`; `:2439 "YYYY-MM-DD"`; `:2606 "every field"`; `:2622-2623 "recording TTY"`; `:3120 "off-shape"`; `:3206,3208 "date"`; `:3405-3406 "new"`.

## Distillate

- `terminal-obj-2`: site now uses console `CSI`/`ESC` | diff present yes | old form hits 0 | report matches yes
- `terminal-obj-3`: server uses core `RETURN`/`NEWLINE` | diff present yes | old form hits 0 | report matches yes
- `terminal-obj-4`: output uses console `StreamTargetInterface`/`isStreamTarget` | diff present yes | old form hits 0 | report matches yes
- `terminal-obj-5`: guide-fence block exists and covers value claims | diff present yes | old form hits 0 | report matches yes
- `terminal-obj-6`: mirrored validator test exists | diff present yes | old form hits 0 | report matches yes
- `terminal-obj-7`: one configurable `createFakeTTY` remains | diff present yes | old identifier hits 0; phrase hits 3 | report matches yes
- `terminal-subj-1`: stale README paragraph absent | diff present yes | old form hits 0 | report matches yes
- `terminal-subj-2`: stale guide section absent | diff present yes | old form hits 0 | report matches yes
- `terminal-subj-3`: dependency mirror index corrected | diff present yes | old form hits 0 | report matches yes
- `terminal-subj-4`: invalid section citations absent | diff present yes | old form hits 0 | report matches yes
- `terminal-subj-6`: Surface summaries are noun phrases | diff present yes | old form hits 0 | report matches yes
- `terminal-subj-7`: `should` absent | diff present yes | old form hits 0 | report matches yes
- `terminal-subj-8`: package-set counts removed | diff present yes | old form hits 0 | report matches yes
- `terminal-subj-9`: TSDoc tags present at listed exports | diff present yes | old form hits 0 | report matches yes
- `terminal-subj-10`: examples use published specifiers | diff present yes | old form hits 0 | report matches yes
- `terminal-subj-11`: reducer names are verb-first | diff present yes | old form hits 0 | report matches yes
- `terminal-subj-12`: reason literal is `target` | diff present yes | old form hits 0 | report matches yes
- `terminal-subj-14`: helper is `renderCursorUp` | diff present yes | old form hits 0 | report matches yes
- `fleet-F1`: browser helper and browser environment absent | diff present no | old form hits 0 | report matches yes
- `fleet-F2`: no matching public `id` field exists | diff present no | old form hits 0 | report matches yes

Scope tags: every evidence-status path is `owned`; no `shared` or `off-limits` path appears.

Residue: no prohibited modifier, TODO, FIXME, or debugger was added. Existing timeout, retry, console, and fixture matches are listed in Evidence.

Writing hits: the added-line writing sweep returned only the `conform-terminal.diff` matches listed in Evidence.

Parity: the changed interfaces and classes match their guide method rows; readonly `TerminalOptions` data is represented in its Surface row; terminal-barrel exports remain in `src/core/index.ts` and `src/server/index.ts`.

## Unknowns

- The authoritative gate chain was not rerun because `npm run build` includes tree-mutating cleanup and build steps, and the request forbids tree changes.
- The report’s first gate table records `guides` as `52 passed (52)`, while the appended fix-round table records `guides` as `60 passed (60)`; both readings are retained, but the latest gate result is not independently verified.
- The live status comparison was not independently rerun; the supplied status file was read and all its paths are Owned.
- No journal path or session identifier was supplied; the `Journal` line remains driver-owned.

## Journal

Journal — leave this line for the driver.

## Deviation

No tree change was observed in the supplied evidence. No required input file was unread. The independent gate and live-status checks remain unperformed for the reasons listed under `Unknowns`.