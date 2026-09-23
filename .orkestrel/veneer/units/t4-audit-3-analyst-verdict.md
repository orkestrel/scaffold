## Verdict — T4 TEST-CLIP audit round 3, objective lane on GPT-6 Astra

Bench unit: `analyst` route, `codex exec --sandbox read-only` rooted at `/home/user/test`, launched by `codex-queue-26.sh` after `t4-audit-3-analyst.sh`; journal `tmp/codex/t4-audit-3-analyst.jsonl` (swept at acceptance), thread id `01a0d02d-dc6d-7de0-a8da-fc57806ab166`, started 21:31:01 UTC, ended 21:34:59 UTC, exit 0, 42 items. The lane's returned message follows verbatim.

1. **CONFIRMED.** The border-origin, ignored-keyword, and scrolling-margin attacks fail against [helpers.ts:2968](/home/user/test/src/browser/helpers.ts:2968). The guard returns absence exactly when the clipping predicate returns false. Hidden, auto, and scroll overflow return the padding edge; clip overflow and visible overflow with paint containment select the requested box before adding the margin. This agrees with the published [CSS Overflow §3.2](https://www.w3.org/TR/css-overflow-3/#overflow-clip-margin) and [CSS Containment paint-containment rules](https://www.w3.org/TR/css-contain-2/#paint-containment). This is a source/specification review, not an executed browser proof. The barrel exports the helper at [index.ts:27](/home/user/test/src/browser/index.ts:27), and its summary matches [test.md:360](/home/user/test/guides/test.md:360).

2. **CONFIRMED.** The ancestor-skipping and lost-frame-border attacks fail against [helpers.ts:3075](/home/user/test/src/browser/helpers.ts:3075): the loop visits every ancestor before the body, applies every defined cap, preserves each element’s own border-box-plus-margin contribution, takes the maximum, and adds the body/root spacing.

   The earlier bordered fixture still reads 403 because the frame’s contribution exceeds its child’s corrected 400 cap. The other earlier fixtures have unchanged caps. Their assertions remain at [helpers.test.ts:2949](/home/user/test/tests/src/browser/helpers.test.ts:2949). Removing the cap distinguishes the viewport-height fixtures from their fixed expectations; dropping bottom spacing distinguishes 1600 from 1700. I read [t4-2-gates.log.txt:49](/home/user/scaffold/.orkestrel/veneer/units/t4-2-gates.log.txt:49), which records the earlier passing run. Preservation follows from the source comparison; that log does not establish a round-3 execution.

3. **UNRESOLVED.** The table and assertion structure hold at [setupBrowser.ts:44](/home/user/test/tests/setupBrowser.ts:44), [helpers.test.ts:2920](/home/user/test/tests/src/browser/helpers.test.ts:2920), and [helpers.test.ts:3028](/home/user/test/tests/src/browser/helpers.test.ts:3028). The table and its entries are frozen, contain the prescribed rows, and use the required fixture helpers.

   The assertions distinguish each named mutation. A non-writing Node arithmetic check produced these source-derived comparisons:

   | Mutation | Passing expectation | Mutated result | Distinguished |
   |---|---:|---:|---|
   | Border origin, clip edge | 420 | 423 | Yes |
   | Border origin, expanded clip edge | 520 | 523 | Yes |
   | Border origin, bordered content measurement | 500 | 503 | Yes |
   | Ignore content-box keyword | 500 | 520 | Yes |
   | Remove ancestor cap | 500 | 600 | Yes |

   Execution remains unverified. The retained [mutation script:14](/home/user/scaffold/.orkestrel/veneer/units/t4-r3-instruments/mutate.py:14) identifies the command, but its output is absent from the supplied records. The claimed failures and passing round-3 run appear only in [the writer’s report:47](/home/user/scaffold/.orkestrel/veneer/units/t4-r3-report.md:47). The round-2 log I read predates these cases. Retain the round-3 passing and mutation outputs, including assertion failures and exit codes, to settle this claim.

4. **BROKEN.** The selected-box wording overstates the helper’s behavior at [test.md:625](/home/user/test/guides/test.md:625) and [test.md:3431](/home/user/test/guides/test.md:3431). For a frame with 400px content height, 20px bottom padding, a 3px bottom border, hidden overflow, and a content-box clip margin of zero, the prose selects the content edge at 400; [helpers.ts:2973](/home/user/test/src/browser/helpers.ts:2973) correctly returns the padding edge at 420.

   Qualify box selection as applying to clip overflow or paint containment with visible overflow, and state that hidden/scrolling overflow uses the padding edge. Ordinary clip-overflow wording remains correct.

   Row placement, summary equality, and the named tokens’ nouns hold. Changing only the Surface summary would fail the drift assertion at [guides.test.ts:279](/home/user/test/tests/guides.test.ts:279); that assertion cannot detect this behavioral prose error. The guides result in [t4-2-gates.log.txt:64](/home/user/scaffold/.orkestrel/veneer/units/t4-2-gates.log.txt:64) predates the delta. Round-3 green is supported only by the writer’s report.

5. **BROKEN.** The report contains the prohibited temporal term “now” at [t4-r3-report.md:3](/home/user/scaffold/.orkestrel/veneer/units/t4-r3-report.md:3) and the growable-set count “four owned files” at [line 7](/home/user/scaffold/.orkestrel/veneer/units/t4-r3-report.md:7). These violate [writing.md:41](/home/user/scaffold/.claude/rules/writing.md:41) and [AGENTS.md:172](/home/user/scaffold/AGENTS.md:172). Remove those terms without changing the recorded measurements.

   Scope holds: the committed delta exactly matches the retained diff, touches only the owned paths, and leaves the checkout clean. Inspection found none of the claimed prohibited code additions. Gate execution remains unresolved: the available round-3 typecheck log contains command output without an exit marker, while the remaining round-3 exits appear only in the report. Earlier gate logs cannot establish those exits.

Findings outside the claims: none.

Attacked and held: a frame’s border and bottom margin can legitimately extend the document reading beyond its descendant cap. Uncontained visible overflow remains uncapped; a horizontal-only clip does not impose a vertical cap.

VERDICT: FAIL 3, 4, 5; outside the claims: none