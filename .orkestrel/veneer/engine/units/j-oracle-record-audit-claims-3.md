# J-ORACLE-RECORD round 3 — audit claims (2026-09-25)

**Subject.** Veneer `6880e63` on `unit/oracle-record` over `c66e317`. Read the files at `6880e63` with `git -C C:/Users/mikes/WebstormProjects/veneer show 6880e63:<path>`.

**Evidence** (all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`):
- `j-oracle-record-3.diff` and `j-oracle-record-3-status.txt`;
- the brief `j-oracle-record-brief-3.md` and the report `j-oracle-record-report-3.md`;
- round 2's verdicts: `j-oracle-record-audit-2-verdict.md`, `-audit-2-objective-verdict.md`, and `-audit-2-reviewer-verdict.md`;
- the Orchestrator's replay `j-oracle-record-replay-3.log.txt`;
- the instrument `j-oracle-record-mutations-3.py` with its plant `j-oracle-record-mutation-3.test.ts`;
- the census readings in `j-oracle-record-census-3/`;
- the law: `decisions.md` § E28 with both amendments of 2026-09-25, `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, and `.claude/rules/tests.md`.

## Claims

1. **Exact scroll.** The reader records scroll offsets as the platform reports them. The fractional-scroll witness, read on a scroller zoomed so that Chromium keeps the fraction, reads red on round 2's source and green at `6880e63`.
2. **Tags.** The reader records each element's tag, and the comparator reports a tag difference. The button-to-div witness reads red on round 2's source.
3. **Ordered content.**
   - Each element's content is its ordered child nodes: each text run with whitespace collapsed, and each child element by label.
   - It replaces own text, and the comparator reports a content difference.
   - The swapped-siblings and text-placement witnesses read red on round 2's source.
   - The mutation rows `tooltip.tag`, `tooltip.order`, and `tooltip.placement` are killed by an assertion.
4. **Exhaustiveness.** `drivePluginAction` ends in a `never` check. An unhandled `PluginAction` member fails to compile, which the report's `never-probe.py` reading shows.
5. **The wording.**
   - The settle's limit sentence speaks of work a plugin schedules, not of engine work.
   - `inferPluginState`'s `@param report` names a report from `reportPluginPage`.
   - The corrected test title is grammatical.
6. **The recordings and the census.**
   - Every Bootstrap case matches its re-recorded fixture, and `button.json` is byte-identical.
   - The census equals round 2's: the new facets add no departure.
   - The prevented-show control's added row, the body's content losing the backdrop, is a real departure the seam adds.
7. **The proofs bind.**
   - Every mutation row reads as expected, and every kill names an assertion.
   - The controls hold or are refused as recorded.
   - The sources are unchanged.
   - For each row you confirm, say whether the comparison tells the planted difference apart from the passing case.

Rule each claim CONFIRMED, FAIL, or UNRESOLVED, with `file:line` evidence at `6880e63`. Then report any behaviour defect outside the claims, with the smallest input that reaches it. End with one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claims>`.
