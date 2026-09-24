1. **CONFIRMED — Scope and delta.** The attack compared the retained patch sections, live status, and live diff against the claimed boundary. [cb-2-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/cb-2-status.txt:1) matches the live owned paths. The live diff and retained diff have identical SHA-256 digests. Comparing the round-1 and round-2 patches finds changes only in the elements, nav, and list-group tests; the partial, shell, and other owned tests remain byte-equal. The shared patch changes only the guide. The [owned interdiff:1](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-interdiff-2.diff:1) and [shared interdiff:1](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-shared-interdiff-2.diff:1) agree. The Orchestrator’s apply ruling stands.

2. **CONFIRMED — List-group case.** The attack checked whether equality could pass without measuring the required properties or establishing keyboard focus. The [case:196](/home/user/veneer-cb/tests/src/styles/components/list-group.test.ts:196) pins the anchor’s size and line height, then compares the disabled forms’ font family, size, and line height. The [focus assertions:213](/home/user/veneer-cb/tests/src/styles/components/list-group.test.ts:213) establish focus-visible state, compare outline and shadow, and require the anchor’s shadow to be the `none` value.

   I read [cb-mutations-2.log.txt:119](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-mutations-2.log.txt:119): removing font-size inheritance fails this case’s font-size comparison. The [unscoped-focus run:139](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-mutations-2.log.txt:139) fails its ring comparison, with the button receiving a suppressed outline and calibrated shadow. These assertions distinguish each mutation from the passing case. The passing run is retained at [cb-green-2.log.txt:422](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-green-2.log.txt:422). The false transition comment is removed at [cb-interdiff-2.diff:116](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-interdiff-2.diff:116); retaining the animation wait is harmless.

3. **CONFIRMED — Wrapper metrics.** The attack checked for another token collision and inspected the mutation’s actual differing values. The [size and line tokens:256](/home/user/veneer-cb/src/styles/_tokens.scss:256) yield no 19px size and no 29px line height at the shipped token sizes or the wrapper’s 19px size. The elements and nav expectations match their wrappers; their comments are true under the test’s root size.

   I read [cb-mutation-2-token-run.log.txt:488](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-mutation-2-token-run.log.txt:488). Writing the named tokens produces size 20 and line height 30 against expected values 19 and 29. The [elements assertion:104](/home/user/veneer-cb/tests/src/styles/elements/button.test.ts:104) therefore distinguishes the mutation from inheritance. The nav comparison also fails, receiving line height 28.5px against 29px at [the retained failure:466](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-mutation-2-token-run.log.txt:466).

4. **CONFIRMED — Guide.** The attack checked empty class attributes, classless target-bearing indicators, enabled cursors, focus suppression, utility precedence, and the showcase hook. The [definition and reboot list:17](/home/user/scaffold/.orkestrel/veneer/units/cb-shared-2.patch:17) agree with the [retained cascade:1](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-cascade-after.txt:1) and [installed Bootstrap reboot:390](/home/user/veneer-cb/node_modules/bootstrap/scss/_reboot.scss:390). The Files row and Additions Reasons use the defined bare-button boundary. The target explanation is split as required. The Tailwind and Showcase paragraphs remain consistent with the layer order and attribute hook.

   The added prose lines fit the 100-column width; table rows retain the guide’s table layout. I read the passing [scratch formatting log:3](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-scratch-2-format.log.txt:3). No contradictory guide statement was established.

5. **CONFIRMED — Coverage matrix.** The attack compared every reported movement with the retained measurements and checked whether inherited geometry was still attributed to removed declarations. The [matrix:119](/home/user/scaffold/.orkestrel/veneer/units/b-cross-cb-report-2.md:119) separates close-control padding from removed bare declarations and includes disabled pointer events for current and resting indicators.

   I read [cb-forms-before.log.txt:33](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-forms-before.log.txt:33), [cb-forms-after.log.txt:34](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-forms-after.log.txt:34), and [cb-matrix.txt:4](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-matrix.txt:4). They record padding changing from 3.5px to 5px and indicator pointer events changing from the `none` value to the `auto` value. The retained [close declaration:25](/home/user/veneer-cb/src/styles/components/_close.scss:25) explains the padding movement. The report explicitly identifies width, height, and background size as unmeasured by that probe.

   The proof matrix’s mutations remain distinguished: widening the selector changes metrics, opacity, corners, or transitions; removing the target exclusion changes indicator corners; leaking hover or active rules changes background; leaking the disabled rule changes opacity or pointer events. I read those failures in [cb-mutations.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/cb-instruments/cb-mutations.log.txt:1) and checked the [elements assertions:104](/home/user/veneer-cb/tests/src/styles/elements/button.test.ts:104). Claims 2 and 3 cover the repaired font and focus proofs. The close geometry failure under removed font inheritance remains a rounding-sensitive observation, not a direct parent-font assertion.

6. **BROKEN — Report compliance.** The report still fails the requirement that every code token be followed by its noun. At [report:14](/home/user/scaffold/.orkestrel/veneer/units/b-cross-cb-report-2.md:14), the brief filenames are followed by “for.” At [report:163](/home/user/scaffold/.orkestrel/veneer/units/b-cross-cb-report-2.md:163), the environment assignment is followed by “keeps,” without an identifying noun. The smallest fix is to add “brief” after each filename and “environment setting” after the assignment.

   The syntax clause holds: the TypeScript AST inspection found no prohibited construct on added owned lines, and the shared changes add none. The gate quotations match the retained worktree and scratch logs, including the explicitly identified command echoes for silent lint and typecheck runs. The case-insensitive temporal pattern `\b(currently|now|new|latest|soon|once|since|then|previously)\b` found no match in the report. The optional diff-stat tally is absent.

   The report states these counts; required diagnostic and run quotations remain valid evidence:

   | Report location | Count stated |
   |---|---|
   | Line 47 | 7 failed, 153 passed, total 160 |
   | Lines 48–49, 59–60 | Diagnostic elisions marked `…(1)` |
   | Lines 59–61 | Each mutation reports 4 failed, 156 passed, total 160 |
   | Line 70 | “both files,” referring to the named stylesheet and retained copy |
   | Line 156 | 160 passed, total 160 |
   | Line 170 | 22 passed, total 22 |
   | Line 171 | 19 passed, total 19 |
   | Line 172 | 4 passed, total 4 |
   | Line 173 | 109 passed, 1 skipped, total 110 |
   | Line 190 | “both” names the attribute definition and bare-button term |

**Findings outside the claims:** None substantiated.

**Attacked and held:** The verdicts carry the attacks. Adjacent behavior remains intentional: an empty class attribute and a target-bearing classless button exclude the calibrated surface; keyboard focus may retain the browser’s outline while carrying no calibrated shadow; close-control geometry follows inherited typography without losing its release declarations.

VERDICT: FAIL 6; outside the claims: none