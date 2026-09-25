# J-ORACLE-RECORD round 2 audit — the subjective lane (reviewer on Opus 5.5)

Retained verbatim from the lane's final message in its completion notification on 2026-09-25. The brief is `units/j-oracle-record-audit-2-reviewer-brief.md`; the claims are `units/j-oracle-record-audit-claims-2.md`.

---

**J-ORACLE-RECORD round 2 audit: subjective lane (`reviewer` on Opus 5.5)**

I held the subjective lane. Line numbers refer to `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-record/tests/setupServer.ts` at `c66e317` unless another file is named.

Claim 5 fails at one site. Claims 4, 6, and 7 hold.

## Per-claim verdicts

**4. The case matrix lives in `tests/setupServer.ts`: CONFIRMED.**
- The sample fixtures are exported from the setup module at :1264–:1489: `PLUGIN_SAMPLE_SCENARIO`, `PLUGIN_SAMPLE_RECORDING`, `PLUGIN_SAMPLE_REPORT`, `PLUGIN_SAMPLE_OFFICIAL`, and `PLUGIN_SAMPLE_DIVERGENT`.
- The plugin block of `tests/setupServer.test.ts` only aliases them (:1128–1130). Each case then derives one variant from them: `without` at around :1332, `unchanged` at :1372, and `departure` at :1354.
- None of those variants is a scenario or recording table, so the matrix rule in `tests.md` is met.
- This follows the file's existing pattern for sample data: the `LEDGER_GUIDE` and `LEDGER_CASCADE` constants.

**5. The vocabulary: FAIL.**
- **Every rename landed, with no alias left:**
  - `PluginLibrary` (:338) and its `library` member (:349);
  - `library` as the `drivePluginAction` parameter (:4933) and `runtime.library` (:5006, :5014, :5023);
  - `PluginRecording` (:522), `PluginReport` (:500), and `'visibility'` (:534, :5237, and every control row);
  - `transforms` (:4640, :4652), `launchOracleBrowser` (:4588), `PLUGIN_OMITTED_ATTRIBUTES` (:612), and `PLUGIN_REFERENCE_ATTRIBUTES` (:622).
- **Old-name search.** I searched `tests/` for `PluginEngine`, `PluginFixture\b`, `PluginReading`, `driveOracleBrowser`, `ORACLE_OMITTED`, `ORACLE_REFERENCE`, `PluginGesture`, `\.engine\b`, and the literal `'visible'`.
  - None of the old names remains in the oracle family.
  - The `'visible'` hits are CSS values or class keys (for example `conformance.test.ts:257`).
  - The `engine:` hits in `setupStyles.ts` and `distribution.test.ts` belong to other domains.
- **Where it breaks: setupServer.ts:4891.** A sentence added by this round reintroduces the library sense that R11-1 removed.
  - The text is: "engine work scheduled past the quiet interval, such as a tooltip `delay`".
  - `settlePluginState` settles both libraries' pages, so that "engine" covers Bootstrap's Tooltip too.
  - Veneer's own language never calls Bootstrap's code an engine. `guides/veneer.md:788` says "a page running Bootstrap's scripts beside the engine", and :645 in this file contrasts "each engine" (Veneer) with "Bootstrap's".
  - The phrase came from the brief (`j-oracle-record-brief-2.md:14`) and from `decisions.md:405` (E28's amendment), so the unit copied its instruction. The claim's text is still false at this site.
  - **Repair:** at :4891, write "work a plugin schedules past the quiet interval, such as a tooltip `delay`". Amend `decisions.md:405` to use the same words, so the two don't drift. Keep "engine" at :645 and in the `Engine*` family.

**6. The shapes: CONFIRMED.**
- **The action union.** `PluginAction` (:402–407) is a union discriminated by `gesture`, over `PluginTargetAction` (click, hover, and focus, with a required `target`), `PluginPressAction`, `PluginWheelAction`, `PluginPointAction`, and `PluginCallAction` (:354–394).
- **The refusal is gone.** `drivePluginAction` (:4930–4959) is a `switch` with no refusal branch, and its `@throws` names only a browser refusal (:4928). The `click.nothing` case is deleted (diff :644–646).
- **One fixture reader.** The conformance case reads its fixture through `readPluginFixture` (`tests/conformance.test.ts:321`), and `scanPluginFixture` takes `fixture: PluginRecording` (:5076–5079). The `Invalid plugin oracle fixture` shape check and its cases are gone (diff :1917–1919, :532–533).
- **The spawned selectors.** `readPluginState(page, spawned, authored)` takes the selectors it uses (:4795–4799).

**7. The TSDoc: CONFIRMED.**
- **The fairness remark.** The `recordPluginOracle` remark (:4971–4974) is round 1's repair sentence word for word:
  - Both libraries load the same page and receive the same trusted input for every gesture.
  - A `call` action and the setup run each library's own script.
  - So the recordings differ only in the library and those scripts.
- **"Both" in the plugin family.** Each remaining use is allowed:
  - :411 and :5302 name their members ("the Bootstrap and Veneer libraries both receive"; "Both Veneer recordings, under the default setup and under the control's").
  - :4971 "Both libraries" refers to the fixed pair `PluginLibrary` declares at :338, which is not a set that can grow.
- **R14-2.** The `launchOracleBrowser` remark (:4585–4586) names `recordButtonOracle` and `recordPluginOracle`.
- **Bound.** This ruling covers the plugin oracle family and the diff's added lines. Older "both" uses elsewhere in the file (for example :2075 and :3101) were outside this round.

## Round 1 findings: closure

| Finding | Status | Closing text |
| --- | --- | --- |
| R11-1 | Closed except :4891 | :338, :349, :4933, :5006; diff :566/:587 (`.library` assertions); :645 keeps Veneer's sense. The residual is ruled under claim 5. |
| R11-2 | Closed | `PluginRecording` at :522. The `version` remark reads "the Bootstrap release this package tracks … for a recording of either library" and "A saved fixture holds Bootstrap's recording alone" (:518–520). `readPluginFixture` and `scanPluginFixture` keep their names and return or take `PluginRecording` (:5138, :5078). |
| R11-3 | Closed, with a residual (V1) | `PluginReport` at :500 and `report` as the `inferPluginState` parameter (:4817). "Reading" names the labelled state (:414, :611, :4879–4885). |
| Lesser terms | Closed | `'visibility'` (:534), `transforms` (:4640), `launchOracleBrowser` (:4588), and the `PLUGIN_` qualifier (:612, :622). The two senses of "control" were ruled acceptable by the Orchestrator. |
| R14-1 | Closed | :4971–4974 |
| R14-2 | Closed | :4585–4586 |
| O1 | Closed | :354–407 and :4935–4958 |
| O2 | Closed | `conformance.test.ts:321` and :5076–5079 |
| O4 | Closed | :4795–4799 |

## Findings outside the claims

- **V1 (low): setupServer.ts:4805, a stale `@param` on a line this round edited.**
  - It reads: "`@param report` - The elements the page reported, in document order, and its lock reading."
  - `PluginReport` also carries `animating` and `span` (:503–504), so the description no longer matches the type.
  - "Lock reading" also gives "reading" a third sense, which R11-3 set out to remove.
  - **Repair:** "`@param report` - What one evaluation of the page reported, as the {@link reportPluginPage} function returns it."
- **V2 (low): `tests/setupServer.test.ts:1179`, a test title that isn't grammatical.**
  - It reads: "…and reads each one own text, parent, and scroll offsets".
  - **Repair:** "…and reads the own text, parent, and scroll offsets of each".

## Observations (no change required)

- **`readPluginState` has no caller outside its test.**
  - `settlePluginState` repeats its composition inline, `page.evaluate(reportPluginPage, …)` followed by `inferPluginState`, at :4906–4907, because the settle needs `report.animating` and `report.span`.
  - I searched the worktree for `readPluginState`. The only call is `tests/setupServer.test.ts:1542`.
  - `AGENTS.md` keeps a capability that already exists, so I don't require removing it. The Orchestrator may still decide whether a single read with no settle is worth keeping.
- **`PluginTargetAction` (:355) is named for a member two other variants also carry** (`target` on press and wheel). Naming it for its gestures, or splitting it into one type per gesture, would read more exactly. The present grouping matches round 1's O1 prescription.
- **The constants `PLUGIN_SAMPLE_OFFICIAL` and `PLUGIN_SAMPLE_DIVERGENT` end on adjectives, not nouns.** Names such as `PLUGIN_SAMPLE_BOOTSTRAP` and `PLUGIN_SAMPLE_VENEER` would match the comparator's `bootstrap`/`veneer` parameters. The present names are clear enough in use.
- **`open` is destructured at `tests/setupServer.test.ts:1130` but used only in the guard at :1370.**

## Referral to the objective lane (Astra)

- **The `drivePluginAction` switch has no exhaustiveness check** (:4935–4958). If a new `PluginAction` member is added, the code compiles, and the action sends no input. Its step would then fail only through `scanPluginSteps`'s unchanged-state check, and only when the step isn't refused. Whether a `never` check is owed is an objective ruling.

VERDICT: FAIL 5; outside the claims: V1, V2
