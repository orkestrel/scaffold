# J-ORACLE-RECORD — audit verdict (2026-09-25)

**Subject.** Veneer `9ea360d` on `unit/oracle-record`. The claims are `units/j-oracle-record-audit-claims.md`.

**Lanes.**
- **Objective:** `analyst` on GPT-6 Astra, thread `01a0d6e5-3af4-73e1-96c9-9cd74f97c0fa` (`units/j-oracle-record-audit-objective-verdict.md`): `VERDICT: FAIL 1,3,7,9`, with claim 6 UNRESOLVED.
- **Subjective:** `reviewer` on Opus 5.5 (`units/j-oracle-record-audit-reviewer-verdict.md`): `VERDICT: FAIL 11 14`.
- **Checker job:** Grok, session `b555daed-f101-4b39-8a41-bf07bef40f38`, on claims 8 and 10 (`units/j-oracle-record-audit-checker-verdict.md`): `VERDICT: PASS`.

**A launch deviation.** The first objective-lane launch (`tmp/codex/j-oracle-record-audit.jsonl`) ran before its brief existed. The Orchestrator stopped its process tree by the recorded PID (`taskkill /PID 27276 /T`) and discarded its journal. It then wrote the brief and relaunched the lane as `j-oracle-record-audit-objective`. No verdict came from the first launch.

**Rulings: the objective lane.**
- **Claim 1: FAIL, upheld.** An authored `id="__proto__"` vanishes from the serialized state, because the reader assigns labels into a plain object. Build the element map so that every label is an own property, and read it with `Object.hasOwn`.
- **Claim 3: FAIL, upheld in part.**
  - **Upheld:** the motion check and the state read are separate evaluations, so a change can fall between them. They become one evaluation (E28 amended).
  - **Documented as limits, not fixed:** shadow-root motion and delayed engine work sit outside the oracle's contract (E28 amended), and the reader's TSDoc names them.
  - The scroll sampling gap closes with the single evaluation.
- **Claim 6: UNRESOLVED, closed by retention.** The instrument's TypeScript plant file `tmp/probe/mutation.test.ts` was not retained. The Orchestrator retains it with round 2's records. The lane's row-level readings stand: each row's difference is one the comparator reports.
- **Claim 7: FAIL, upheld.**
  - A label such as `constructor` resolves to an inherited member, so the comparator throws instead of reporting the element absent. Use own-property lookups throughout.
  - The facets E28's amendment adds, which are text, parent, and scroll offsets, close the lane's text, scroll, and parent rows.
  - The other rows it lists (inline styles and dimensions, form state, shadow contents, and hit testing) are documented limits.
- **Claim 9: FAIL, upheld.** The scenario and recording matrix declared in `tests/setupServer.test.ts` belongs in a setup module (`tests.md`). Move it to `tests/setupServer.ts`.
- **Outside the claims, all upheld:**
  - the mutation classifier returns `KILLED` before it reads the failed suites, so a kill inside a broken run counts;
  - a scratch-acquisition failure leaks the browser;
  - a rejected `browser.close()` skips the scratch clean-up.
- **The ScrollSpy coverage limit** stands as J-ORACLE-GATE's scenario (`units/j-oracle-census-0925.md`).

**Rulings: the subjective lane.**
- **Claim 11: FAIL, upheld.**
  - Rename `PluginEngine` to `PluginLibrary`, and the `engine` member and parameter to `library`. "Engine" keeps Veneer's sense.
  - Rename `PluginFixture` to `PluginRecording`, and document `version` as the tracked Bootstrap release for either library's recording.
  - Rename `PluginReading` to `PluginReport`.
  - Rename the facet literal `'visible'` to `'visibility'`.
  - Rename `compileVeneerRuntime`'s `plugins` parameter to `transforms`.
  - Rename `driveOracleBrowser` to `launchOracleBrowser`.
  - Rename `ORACLE_OMITTED_ATTRIBUTES` and `ORACLE_REFERENCE_ATTRIBUTES` to `PLUGIN_OMITTED_ATTRIBUTES` and `PLUGIN_REFERENCE_ATTRIBUTES`.
  - The two senses of "control" are ruled acceptable: E28 names the falsification controls, and `readOracleControl` is the Button oracle's existing reader.
- **Claim 14: FAIL, upheld.** `recordPluginOracle`'s remark states the comparison's fairness wrongly. Use the lane's sentence: the two recordings differ only in the library and each library's setup and `call` scripts. Name the members where "both" counts a set.
- **The shape findings outside the claims:**
  - **Upheld:** `PluginAction` becomes a discriminated union on `gesture`, which retires the run-time refusal and its case.
  - **Upheld:** one reader for the fixture file. The conformance case reads through `readPluginFixture`, and `scanPluginFixture` takes the recording type.
  - **Upheld:** `readPluginState` takes the spawned selectors it uses, not the whole scenario.
  - **O3, the repeated build pattern:** `compileVeneerRuntime` repeats three lines of the vendored `configs/src/vite.styles.config.ts`. A vendored file is never edited in a target, so the finding is carried to the scaffold, which vendors the configuration (plan § Carried findings).
- **The referrals:**
  - **Upheld:** add a case that passes a transform to `compileVeneerRuntime`.
  - **Upheld:** add a freeze assertion for each plugin attribute table.
  - The `@throws When …` form runs across `src` and `tests`, while `typescript.md` requires "Thrown when …". That drift is repository-wide and has its own carrier, J-THROWS. This unit follows the file's current form until then.
  - **Run by the replay:** the Button re-recording, and the loading of the root configuration in every worker that loads `setupServer.ts`. The replay's `test:conformance` and `test:setup` runs cover both, and `distribution` runs in the landing chain.
- **Claims 2, 4, 5, 8, 10, 12, and 13: CONFIRMED.**

**Carried.** Every upheld finding goes to `units/j-oracle-record-brief-2.md`, its one carrier, except O3 (the scaffold) and the `@throws` form (J-THROWS).

VERDICT: FAIL 1, 3, 7, 9, 11, 14 — round 2 (`units/j-oracle-record-brief-2.md`)
