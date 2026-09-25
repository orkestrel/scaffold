# J-ORACLE-RECORD round 2 — audit claims (2026-09-25)

**Subject.** Veneer `c66e317` on `unit/oracle-record` over `9ea360d`. Read the files at `c66e317` with `git -C C:/Users/mikes/WebstormProjects/veneer show c66e317:<path>`. A lane that cannot run git reads the worktree copies under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-record/`, committed as `c66e317` with a clean status.

**Evidence** (all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`):
- `j-oracle-record-2.diff` and `j-oracle-record-2-status.txt`;
- the brief `j-oracle-record-brief-2.md` and the report `j-oracle-record-report-2.md`;
- round 1's verdicts: `j-oracle-record-audit-verdict.md`, `-audit-objective-verdict.md`, and `-audit-reviewer-verdict.md`;
- the Orchestrator's replay `j-oracle-record-replay-2.log.txt`;
- the instrument `j-oracle-record-mutations-2.py` with its plant `j-oracle-record-mutation-2.test.ts`;
- the census readings in `j-oracle-record-census-2/`;
- the law: `decisions.md` § E28 with its amendment of 2026-09-25, `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, and `.claude/rules/tests.md`.

## Claims

1. **Own-property labels.** Every element map the reader builds holds each label as an own property, and every lookup by label uses `Object.hasOwn`. The cases for an authored `__proto__` label and a `constructor` label read red on round 1's source and green at `c66e317`.
2. **One evaluation per reading.**
   - `reportPluginPage` is the one in-page evaluation. `readPluginState` and `settlePluginState` both read through it, so the motion check and the state come from the same evaluation.
   - `settlePluginState`'s TSDoc names the oracle's limits: shadow trees, engine work scheduled past the quiet interval, inline styles and geometry, non-reflected form state, and hit testing.
3. **The added facets.**
   - The reader records each element's own text (whitespace collapsed), its parent by label, and the settled scroll offsets of the document and of each labelled element that scrolls.
   - `collectEngineDepartures` reports a difference in each.
   - The mutation rows `tooltip.text`, `dropdown.parent`, and `scrollspy.destination` are killed by an assertion.
4. **The case matrix** lives in `tests/setupServer.ts`, and no scenario or recording table is declared in `tests/setupServer.test.ts`.
5. **The vocabulary.**
   - `PluginLibrary` and `library`, `PluginRecording`, `PluginReport`, `'visibility'`, `transforms`, `launchOracleBrowser`, `PLUGIN_OMITTED_ATTRIBUTES`, and `PLUGIN_REFERENCE_ATTRIBUTES` replace round 1's names.
   - No alias or old name remains.
   - "Engine" keeps Veneer's sense in every comment.
6. **The shapes.**
   - `PluginAction` is a union discriminated by `gesture`, and the run-time refusal is gone.
   - The conformance case reads its fixture through `readPluginFixture`, and `scanPluginFixture` takes the recording type.
   - `readPluginState` takes the spawned selectors.
7. **The TSDoc.** `recordPluginOracle`'s remark states the fairness of the comparison correctly, and no sentence counts a growing set with "both".
8. **Clean-up.** `launchOracleBrowser` destroys its scratch directory and closes its browser on every failure path: a failed launch, a failed scratch acquisition, a rejected drive, and a rejected close. A case proves the drive-throws path.
9. **The seams and the instrument.**
   - A case passes a transform to `compileVeneerRuntime` and reads its effect.
   - Each plugin attribute table is asserted frozen.
   - The instrument's classifier reads the failed suites before it counts a kill, and the `control.suite` row is refused.
   - For each row you confirm, say whether the comparison tells the planted difference apart from the passing case.
10. **The recordings and the census.**
    - Every Bootstrap case matches its re-recorded fixture, and `button.json` is byte-identical.
    - The report's census table equals `j-oracle-record-census-2/departures.json`, row for row, including the added ScrollSpy scroll row.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `c66e317`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
