1. **BROKEN — Scope.** The diff artifacts do not differ only in title lines. [apc-3.diff:1](/home/user/scaffold/.orkestrel/veneer/units/apc-3.diff:1) includes source and other tests; [apc-4.diff:1](/home/user/scaffold/.orkestrel/veneer/units/apc-4.diff:1) contains only the color test. The report explicitly names that narrower command at [ap-color-report-4.md:38](/home/user/scaffold/.orkestrel/veneer/units/ap-color-report-4.md:38). Fix the claim to compare the color-test sections, allowing their changed blob headers, or supply diffs with matching scope.

   The adjacent checks held: the saved statuses match, and the live test differs from its round-3 copy only at the prescribed titles. Reversing those titles and removing the blob header makes the color-test diff sections identical; an additional assertion change makes that comparison fail. The retained round-4 gate logs each report exit 0. Those remain unit observations, not landing-chain evidence.

2. **BROKEN — K1.** The title at [color.test.ts:247](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:247) claims that the emphasis class follows a body-text retune. Its emphasis assertion occurs only after the fill retune, at line 269. After the body-text retune at line 272, the assertions read only the role color.

   **Distinguishing mutation:** make the emphasis utility mix the live primary fill with the mode’s default body-color literal. It still follows the fill retune but ignores the body-text retune. By assertion reading, this case cannot distinguish that mutation from passing behavior: it never reads the resulting emphasis color.

   The retained [primary-channel mutation log:184](/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-mutation-primary-channel.log.txt:184) fails at the hard assertion on line 262, before the emphasis and body-text assertions. That red does not establish the missing property. The smallest permitted fix is to narrow the title’s emphasis clause to the fill retune. This finding concerns the title’s proof claim, not a demonstrated production-color defect.

3. **CONFIRMED — K2.** The title matches the population in [setupStyles.ts:2817](/home/user/veneer-apc/tests/setupStyles.ts:2817): primary, secondary, success, info, warning, and danger. [color.test.ts:355](/home/user/veneer-apc/tests/src/styles/utilities/color.test.ts:355) asserts emphasis alpha `1`; line 366 asserts role alpha `0.5`, under `.text-opacity-50` in light and dark modes.

   **Attacks that failed:** making emphasis consume the opacity variable produces `0.5`, distinguished from `1` in the retained [emphasis-opacity mutation log:167](/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-3/apc-3-mutation-emphasis-opacity.log.txt:167). Removing role alpha consumption produces `1`, which the role assertion distinguishes from `0.5`. The [bare-mix log:253](/home/user/scaffold/.orkestrel/veneer/units/apc-instruments/apc-mutation-bare-mix.log.txt:253) records that result in the sibling opacity-steps proof; it is not an executed mutation red for this particular case.

   **Counts stated by the report:** 2 title changes; 1 file in the owned diff; 1456 passed tests across 115 files. The title comparison and diff verify the edit counts; the retained [styles log:8198](/home/user/scaffold/.orkestrel/veneer/units/apc-instruments-4/apc-4-final-test-src-styles.log.txt:8198) verifies the test counts.

Findings outside the claims: none.

Attacked and held: excluding neutral emphasis classes is consistent with K2’s stated population. The role-alpha assertion checks fading; it does not claim channel equality.

VERDICT: FAIL 1, 2; outside the claims: none