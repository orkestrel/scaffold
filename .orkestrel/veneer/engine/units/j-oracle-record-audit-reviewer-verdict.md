# J-ORACLE-RECORD audit — the subjective lane (reviewer on Opus 5.5)

Retained verbatim from the lane's final message in its completion notification on 2026-09-25. The brief is `units/j-oracle-record-audit-reviewer-brief.md`; the claims are `units/j-oracle-record-audit-claims.md`.

---

**J-ORACLE-RECORD audit: subjective lane (reviewer, Opus 5.5)**

This is the subjective lane: shape, naming, and design fit. I read the diff, the report, E28, the claims file, and the worktree at `9ea360d`. Line numbers below refer to `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-record/tests/setupServer.ts` unless another file is named.

Claims 11 and 14 fail. Claims 9, 12, and 13 hold.

## Per-claim verdicts

**9. The conventions: CONFIRMED.**
- **Helper names.** Every helper takes the `{verb}{Noun}` form. The prefixes carry their fixed meanings:
  - `readPluginState` (:4396) reads a live page.
  - `inferPluginState` (:4437) derives.
  - `scanPluginSteps` and `scanPluginFixture` (:4674, :4709) return findings.
  - `collectEngineDepartures` (:4788) gathers.
  - `filterAddedDepartures` (:4926) keeps members in order and does not mutate its input.
  - `isPluginState` (:4730) is a total guard.
- **Discriminants.** They name their axis: `engine` (:349), `gesture` (:370), and `facet` (:468). None is named `kind` or `type`. The word chosen for the `engine` axis is a vocabulary defect, ruled under claim 11.
- **Readonly.** Every interface property is readonly (:338–:488), and the two collection returns are `readonly EngineDeparture[]`.
- **Frozen tables.** The four new tables are frozen at the top level with `Object.freeze` (:522, :532, :558, :914), which matches the file's existing `ORACLE_BINDINGS` (:221).
- **No duplicate of `@orkestrel/test`.** The settle wait uses `waitForCondition` and the scaffold uses `createScratch` and `ScratchInterface` (:17, :21–22). The in-browser helpers in `@orkestrel/test` (`waitForAnimations`, `readFocus`, `readClasses`) run in Vitest browser mode. They can't be referenced inside a `page.evaluate` callback: the report's probe shows an imported name fails there with `ReferenceError`. So nothing duplicates them.

**11. The oracle reads as one family: FAIL.** Three required changes and several lesser ones.

- **R11-1: "engine" names two different things.**
  - The new code uses "engine" for the whole library, Bootstrap or Veneer:
    - `PluginEngine = 'bootstrap' | 'veneer'` (:338), `PluginRuntime.engine` (:349);
    - the prose at :346, :364, :380–387, :443, :529, :548, :4386, :4496, and :4596–4607;
    - the `drivePluginAction` parameter (:4566, :4573) and `runtime.engine` (:4640, :4648, :4656).
  - Veneer's own language uses "engine" for one plugin class, or for the engine component:
    - `guides/veneer.md:47` ("the engines it constructs") and `guides/veneer.md:59–60` ("one engine class");
    - `component !== 'engine'` in the same file (:3749, :3762);
    - the new code itself at :553: "Veneer's setup constructs a `Delegate` instance and each engine no data route reaches".
  - Both senses appear in the same `PLUGIN_SCENARIOS` doc block. This matters because `EngineDeparture` and `EngineFacet` map to the guide's `## Engine` › `### Departures` section, which uses Veneer's sense. As written, a reader can't tell which sense "engine departure" means.
  - **Repair:**
    - Rename `PluginEngine` to `PluginLibrary`, and rename the `engine` member and parameter to `library`.
    - Rewrite each "engine" that means Bootstrap-or-Veneer as "library". This covers :4297 and :4354, and the `.engine` assertions and the `'bootstrap'` argument in `tests/setupServer.test.ts`.
    - Keep "engine" for Veneer's plugin classes and for the `Engine*` departure family.
- **R11-2: `PluginFixture` also types recordings that are never fixtures.**
  - E28 says fixtures hold Bootstrap's recording alone. Yet `PluginFixture` (:443–449) types:
    - every Veneer recording, through `recordPluginOracle` (:4610);
    - the `veneer` parameter of `collectEngineDepartures` (:4788);
    - the baseline and seam recordings in `recordPluginControl` (:4895).
  - Its own doc says "one engine's recording", and the `recordPluginOracle` `@returns` says "without writing or accepting a fixture". So the type calls the thing a fixture while the prose calls it a recording.
  - Veneer recordings also carry `version: BOOTSTRAP_VERSION` (:4658), which reads as Veneer's version.
  - **Repair:**
    - Rename the type to `PluginRecording`.
    - Keep the `readPluginFixture` and `scanPluginFixture` names, because they read and scan the saved file, and type them in `PluginRecording`.
    - Document the `version` member as the tracked Bootstrap release for a recording of either library.
- **R11-3: `PluginReading` is the page's "report", and "reading" means two other things.**
  - The prose calls the raw type "the page's report" (:420, :4389, :4425).
  - "Reading" also names the labelled state: "the readings … agree" (:4491), "a plugin reading omits" (:521), and :529.
  - It also names the facet: "Names the reading an engine departure differs in" (:451).
  - **Repair:** rename `PluginReading` (:431) to `PluginReport` and the `inferPluginState` parameter to `report`. Keep "reading" for the labelled state that a read returns.
- **Lesser terms in the same claim.** Fix these in the same pass:
  - `EngineFacet` (:452) mixes the adjective `'visible'` with nouns (`'lock'`, `'focus'`, `'class'`), and its doc says "the visibility". Rename the literal to `'visibility'`.
  - The `plugins: readonly Plugin[]` parameter of `compileVeneerRuntime` (:4320) holds Vite plugins inside a family where "plugin" means a Bootstrap or Veneer plugin. Rename it to `transforms`.
  - `drive*` has two senses:
    - `drivePluginAction` sends input, which matches `@orkestrel/test`'s `driveHold` and `driveTraversal`;
    - `driveOracleBrowser` (:4271) launches a browser, lends it to a callback, and releases it.

    Rename `driveOracleBrowser` to `launchOracleBrowser`, which matches its first sentence.
  - `ORACLE_OMITTED_ATTRIBUTES` and `ORACLE_REFERENCE_ATTRIBUTES` (:522, :532) serve only the plugin reader (:4461, :4467), and their docs say "a plugin reading". Qualify both as `PLUGIN_`.
  - "Control" now has two senses in the oracle family:
    - `readOracleControl` (:3863) reads a UI control;
    - `PluginControl`, `PLUGIN_CONTROLS`, and `recordPluginControl` are falsification controls.

    E28 chose the word "controls", so this is referred to the Orchestrator rather than required here.

**12. No superfluous wrapper: CONFIRMED.**
- `readPluginFixture` (:4757) is a validation boundary. It narrows `unknown` into a typed recording and enforces the plugin-identity invariant.
- `readBootstrapRuntime` (:4295) composes two artifact reads into the runtime shape that `compileVeneerRuntime` also returns. It also removes the Button recorder's inline copy of the same reads.
- `readBuildOutput` (:4367) translates Vite's three result shapes into text, and fails when the file is absent. It has two callers.
- `filterAddedDepartures` (:4926) is the `filter*` form exactly: `filter`, `some`, and deep equality composed together. It has one caller but is exported and tested, which `AGENTS.md` allows.

**13. The shared scaffold: CONFIRMED.**
- **One launch path.** `setupServer.ts` launches Chromium in one place (:4277). Both `recordButtonOracle` (:4151) and `recordPluginOracle` go through it. The other launches (`tests/distribution.test.ts:638`, `tests/setupService.ts:361`) are not oracle recorders.
- **Button steps.** The Button recorder's body (:4155–4258) is the diff's unchanged context. Only where the assets come from changed: `readBootstrapRuntime` reads the same bundle path, and reads the stylesheet through `readBootstrapCascade` (:1848), which is the same `dist/css/bootstrap.css`. `j-oracle-record-status.txt` doesn't list `button.json`, so the file is untouched.
- **Where the Vite imports belong.** The imports at :33–34 belong in `setupServer.ts`.
  - `tests.md` places Node-only helpers there and names no narrower setup module for a slice of one domain.
  - `workspace.md` § Configuration authority keeps shared build logic in the root config, and every `configs/src/*.config.ts` imports it. Reusing `srcBrowser()` and the styles wrapper follows that direction instead of copying build settings.
  - The imports create no cycle: `vite.config.ts` imports only `configs/` leaves.
  - They add no failure mode, because Vitest already evaluates `vite.config.ts` to register every project.

**14. The TSDoc states each export's contract: FAIL.**
- **R14-1 (:4605–4606).** The `recordPluginOracle` remark says both engines "receive the same trusted input, so the only difference between the two recordings is the engine".
  - A `call` action is not trusted input: `PluginAction` (:364–365) calls it "each runtime's own API rather than a shared gesture".
  - The setup scripts also differ per library.
  - A reader relies on this sentence for the comparison's fairness, and it hides exactly the per-library scripts where unfairness could sit. For example, Veneer's toast setup constructs instances that Bootstrap's setup does not (:1208–1211 in the diff).
  - **Repair:** "Both libraries load the same page and receive the same trusted input for every gesture. A `call` action and the setup run each library's own script, so the two recordings differ only in the library and those scripts."
- **R14-2 (low, :4268–4269).** "Both oracle recorders" uses `both` to count a set that can grow. Name the members instead: "The `recordButtonOracle` and `recordPluginOracle` helpers launch through this helper".

## Shape findings outside the claims

- **O1: make `PluginAction` a union by `gesture` (:368–377).** It is a bag of optional members checked at run time: `drivePluginAction` refuses a missing input at :4583–4592, and a `click.nothing` test case pins that refusal. Make it a discriminated union:
  - `press` with `key` and an optional `target`;
  - `wheel` with `target` and `delta`;
  - `point` with `point`;
  - `call` with `call`;
  - `click`, `hover`, and `focus` with `target`.

  Invalid actions then can't be written, and the run-time refusal and its test case go away.
- **O2: one reader for the fixture file.**
  - The conformance case parses the raw JSON into `scanPluginFixture(recording, unknown)` (`tests/conformance.test.ts:320`).
  - The controls read the same file through `readPluginFixture` (:4757), which validates more.

  Route the conformance case through `readPluginFixture`, type the `fixture` parameter as the recording type, and delete the separate shape check at :4710–4711. The Button family's use of `unknown` (`tests/conformance.test.ts:286–287`) is precedent for Button only.
- **O3: a build pattern is repeated.** `compileVeneerRuntime` (:4322–4327) repeats `configs/src/vite.styles.config.ts:5–10` (strip `external` and `output` from `srcBrowser()`'s rolldown options), which breaks "Centralize any pattern repeated twice". The fix is one exported root-config factory that both files consume. It sits outside this unit's owned files, so the Orchestrator picks who carries it.
- **O4: `readPluginState` takes more than it uses (:4398).** It takes the whole scenario to read `spawned` alone. Take `spawned: readonly string[]` instead.

## Referrals to the objective lane (Astra)

- **Untested seam.** The `plugins` parameter of `compileVeneerRuntime` has no committed case that passes a plugin. The compile case in `tests/setupServer.test.ts` calls it with none. The retained mutation run is its only consumer, so the seam that run depends on is not pinned by the suite.
- **Missing freeze assertion.** Nothing asserts `ORACLE_OMITTED_ATTRIBUTES` is frozen: the test uses `toEqual` only (diff line 304), while the sibling tables assert `isFrozen`.
- **`@throws` wording.** Every new block writes `@throws When …`. `typescript.md` § Comments asks for "Thrown when …". The file's precedent (:1855) uses the same form as the new blocks, so this needs a mechanical ruling.
- **Button re-recording.** Whether a fresh Button recording at `9ea360d` still equals `button.json` is a run claim. The status file shows only that the fixture itself is untouched.
- **Workers loading the root config.** The claim 13 placement ruling assumes the module-scope work in `vite.config.ts` (:14 `resolveBrowser`, :22–30 manifest check) is safe in each worker that loads `setupServer.ts`: `conformance`, `distribution`, `setup`, and `service`. One `distribution` run confirms it.

VERDICT: FAIL 11 14
