<!-- Objective lane: analyst on GPT-6 Astra, journal tmp/codex/fu-audit-analyst.jsonl (swept at acceptance), thread 01a0d3b7-abdd-7223-8121-bae9b4f56289, brief fu-audit-analyst-brief.md. -->

1. **CONFIRMED — Scope and P9.** The scope attack found no off-limits change. The actual status matches [fu-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/fu-status.txt:1), and the worktree diff matches the retained diff by SHA-256. Independent digest comparisons against the base commit confirm that [the color-background partial](/home/user/veneer-fu/src/styles/utilities/_color-bg.scss:1) and [its proof](/home/user/veneer-fu/tests/src/styles/utilities/color-bg.test.ts:1) are byte-identical. [The shared patch](/home/user/scaffold/.orkestrel/veneer/units/fu-shared.patch:1) changes only the guide’s Showcase prose and Tests links; it changes no ledger row.

2. **BROKEN — The emphasis state is recorded but its paint change is not asserted.** The population, lifted placement, padding, and structural guard hold at [integration.test.ts:2323](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2323) and [integration.test.ts:2377](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2377). The `link-state-undriven` mutation is distinguished: [its retained log:78](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutation-link-state-undriven-e149d9.log.txt:78) records the held-state assertion rejecting the undriven rows. [The red-first log:104](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-red-journey.log.txt:104) rejects an empty population.

   The counterexample is emphasis paint remaining at rest while hover or focus holds. The membership predicate at [integration.test.ts:2357](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2357) admits only links carrying a hover-suffixed class. The emphasis link carries no such class. Consequently, [the paint-change assertion:2472](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2472) excludes its scenarios.

   I evaluated that exact predicate without writing files, using [the retained readings:1915](/home/user/veneer-fu/tmp/capture/dark-390.txt:1915). Replacing the emphasis scenarios’ driven and framed readings with their resting readings still returned an empty rejection list. Applying the equivalent change to the opacity scenario returned that scenario as rejected. This establishes the assertion gap; it is not a browser execution of a stylesheet mutation.

   The smallest fix is to assert the emphasis rule’s changed color and underline color explicitly, retaining the documented unchanged role-link paint. The existing mutation that removes the drive does not replace this assertion.

   [The reach log:142](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-hover-reach.log.txt:142) supports the specimen split: the opacity target ending at 914 was reached, targets beginning at 919 and 1085 timed out, and [the underline target:212](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-hover-reach.log.txt:212) timed out before the case exhausted its budget.

3. **CONFIRMED — Focus rings.** The declared specimen population and single-link assertion appear at [integration.test.ts:2211](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2211). The resting registry reads the role variable and gives the default ring its resting row at [setup.ts:1978](/home/user/veneer-fu/tests/setup.ts:1978).

   The assertions distinguish the named mutations. Removing the role classes collapses the shadow readings and fails the distinctness assertion; see [the role mutation log:78](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutation-role-rings-default-41ccc7.log.txt:78). Removing wrapper padding fails the frame-boundary assertion on the upper and left edges; see [the padding mutation log:86](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutation-ring-frame-unpadded-41ccc7.log.txt:86). [The red-first log:82](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-red-journey.log.txt:82) also rejects the combined role specimen.

   The focus, rest, blur, boundary, and distinctness assertions are present at [integration.test.ts:2298](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2298). The inspected ring captures contain the complete rings in the named variants.

   The given exclusion holds under the existing names: [setup.test.ts:94](/home/user/veneer-fu/tests/setup.test.ts:94) rejects their mode words, while [the style proof:90](/home/user/veneer-fu/tests/src/styles/components/focus-ring.test.ts:90) exercises the role population, including light and dark.

4. **CONFIRMED — Focusable container.** The journey distinguishes descendant focus from container focus at [integration.test.ts:2525](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2525), then checks resting, revealed, framed, and blurred widths. The section proof independently traverses to the descendant and checks the same visibility transition at [VisibilitySection.test.ts:119](/home/user/veneer-fu/tests/app/browser/sections/VisibilitySection.test.ts:119).

   The `container-always-hidden` mutation preserves focus while preventing the reveal. The width assertions distinguish it: [the journey mutation log:78](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutation-container-always-hidden-628163.log.txt:78) and [the section mutation log:9](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutation-container-always-hidden-926513.log.txt:9) each reject the width remaining at 1. The earlier missing-specimen failures appear in [the journey red log:119](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-red-journey.log.txt:119) and [the section red log:145](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-red-sections.log.txt:145). The supplied captures show the container hidden at rest and revealed under descendant focus.

5. **CONFIRMED — Derived specimen populations.** The changed section proofs derive their expected names from the specimen tables at [FocusRingSection.test.ts:42](/home/user/veneer-fu/tests/app/browser/sections/FocusRingSection.test.ts:42), [LinkSection.test.ts:24](/home/user/veneer-fu/tests/app/browser/sections/LinkSection.test.ts:24), and [VisibilitySection.test.ts:35](/home/user/veneer-fu/tests/app/browser/sections/VisibilitySection.test.ts:35).

   The `emphasis-link-merged` mutation changes the emphasis-bearing specimen’s anchor population. The dedicated assertion distinguishes it, as [the mutation log:78](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutation-emphasis-link-merged-cb372d.log.txt:78) records. Removing the default resting row leaves its driven subject without a resting counterpart; [setup.test.ts:127](/home/user/veneer-fu/tests/setup.test.ts:127) distinguishes that mutation, and [the mutation log:17](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-mutation-default-ring-unrested-2075ad.log.txt:17) identifies the stranded default-focus scenario.

6. **CONFIRMED — P18.** The attack compared the rewritten ordering with construction order, rather than relying on the guide gate. [The helper paragraph:20](/home/user/scaffold/.orkestrel/veneer/units/fu-shared.patch:20) follows Type, Media, Links, Layout, Float, Flex, Text, and Color as [Showcase.ts:124](/home/user/veneer-fu/app/browser/Showcase.ts:124) constructs them. The rewritten viewport list follows Toast, Modal, Offcanvas, Overflow, Position, Sizing, and Navbar. The corresponding specimen markup supports those placements. The repeated clauses and dangling fragment are removed. [The scratch guide log:11](/home/user/scaffold/.orkestrel/veneer/units/fu-instruments/fu-gate-guides.log.txt:11) supports the reported parity result.

7. **NOT-EVIDENCED — Visible dark link focus.** The supplied [role-link focus capture](/home/user/veneer-fu/tmp/capture/states/role-links-focus--dark-390.png) does not visibly distinguish keyboard focus from [the hover capture](/home/user/veneer-fu/tmp/capture/states/role-links-hover--dark-390.png). The report acknowledges the missing visible outline at [report:178](/home/user/scaffold/.orkestrel/veneer/units/b-util-frames-report.md:178). The recorded focus state establishes that focus was held; it does not make the focus indicator discernible in the capture.

   The missing evidence is a dark role-link focus capture with a visible indicator. This limitation belongs to the already named FOCUS-FRAME carrier. It does not falsify the focus-driving assertions or establish clipping. The remaining inspected captures show their expected resting paint, changed emphasis or utility paint, icon movement, revealed container, or complete role ring.

8. **BROKEN — Law and report.** The added property populations at [integration.test.ts:2333](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2333) and [integration.test.ts:2419](/home/user/veneer-fu/tests/app/browser/integration.test.ts:2419) are literal data tables inside a test. [The testing rule:187](/home/user/scaffold/.claude/rules/tests.md:187) places such tables in setup files. Move these populations to frozen, exported setup declarations.

   [Report:199](/home/user/scaffold/.orkestrel/veneer/units/b-util-frames-report.md:199) replaces the section command’s pathname arguments with prose. It therefore does not quote the command exactly as run, as [the brief:92](/home/user/scaffold/.orkestrel/veneer/units/b-util-frames-brief.md:92) requires. Expand that command with its actual arguments. The retained gate summaries support the reported results; the lint and typecheck entries describe silent output rather than quote result lines.

   The added growable-set tally at [setup.ts:602](/home/user/veneer-fu/tests/setup.ts:602), repeated in [the shared patch:69](/home/user/scaffold/.orkestrel/veneer/units/fu-shared.patch:69), also violates the count rule. Delete the tally without changing the named exclusions.

   The syntax attack found no added prohibited assertion, non-null assertion, explicit-any type, or prohibited nested function. Inspection of the added lines found no suppression, mock, spy, or fake clock. These conclusions cover the retained diff.

   The following inventory refers to [the report file](/home/user/scaffold/.orkestrel/veneer/units/b-util-frames-report.md:1).

   **Counts and ordinals recorded in the report:** line 12, “both” files; line 14, “2 failed | 4 passed” and “both modes”; line 17, “one limit”; line 42, “3 failed | 45 skipped (48)”; line 50, “one subject”; line 59, the anchor counts in the expected-array diagnostic; line 65, “one line”; line 72, “first link”; line 95, “both hover and focus”; line 99, “one specimen per role”; line 100, “single” row; line 101, “one element” and “one subject”; lines 110 and 112, “one ring link per specimen”; line 114, “both” proofs; line 115, the link counts in the expected-array diagnostic; line 125, the diagnostic’s object-field count; line 148, “Both” named scenarios; line 153, “two places”; line 179, “both” named variants; line 185, “First” run; line 195, “last stage”; line 197, “first run” and “1 failed | 298 passed (299)”; line 198, “299 passed (299)”; line 199, “19 passed (19)” files and “66 passed (66)” tests; lines 200–201, “48 passed (48)”; line 202, “20 passed (20)”; line 207, “109 passed | 1 skipped (110)”; line 219, the distinct-ring diagnostic’s expected and actual counts; line 220, “2 failed | 1 passed”; line 231, the anchor-count diagnostic; line 238, “one focus ring specimen per role”; line 248, “single-link”; line 250, “7 files changed, 554 insertions(+), 83 deletions(-)”; line 257, “once.” The “three-way” term at line 22 names the merge operation. Dimensions, durations, opacity steps, color components, contrast ratios, exit codes, and source-line references are values rather than growable-set tallies.

   **Temporal wording recorded in the report:** line 8, “mid-campaign”; line 9, “already”; line 20, “existing”; line 22, “will”; line 39, “while,” “again,” and “after”; line 65, “next”; line 72, “first”; line 76, “after”; line 78, “until”; line 101, “at a time”; line 111, “after”; line 135, “while”; line 137, “after” and “then”; line 138, “then” at each transition; line 139, “while”; line 140, “again” and “after”; line 185, “First”; line 187, “rerun”; line 195, “last”; line 197, “first”; line 198, “rerun”; line 216, “pre-run”; line 233, “red-first” and “before.” The “once” word at line 257 describes frequency, not temporal succession.

   **Code spans without a following noun:** every code span on report lines 3–4, 9–13, 19, 29, 31, 38, 42, 51–52, 56, 58–60, 64–65, 67–71, 74–78, 91, 97, 99, 102, 105–106, 112, 114–115, 121, 124, 127, 131–133, 136, 139, 141–142, 146–149, 155, 157, 161–162, 164–174, 179, 181, 191, 193–201, 206–207, 209, 214–216, 219–220, 223–224, 227, 230–231, 237, 243, 245–247, 250–251, and 255. This location inventory includes command cells and quoted diagnostic spans.

   The mixed lines leave these particular spans without a following noun:

   - Line 14: the failure-summary span and the `info` token.
   - Line 30: the scenario-name spans.
   - Line 34: the `LINK_SPECIMENS` token.
   - Line 49: the `Role links` token.
   - Line 85: the `0.1` value span.
   - Line 86: the `auto` and `1.75px` value spans.
   - Line 87: the `1` and `0` value spans.
   - Line 92: the `icon-links-focus` token.
   - Line 94: the `none` and matrix-value spans.
   - Line 100: the `Primary focus ring` and `Dark focus ring` spans.
   - Lines 122 and 242: the setup-test pathname spans.
   - Line 125: the diagnostic span.
   - Line 129: the `VISIBILITY_SPECIMENS` token.
   - Line 182: the capture-log pathname span.
   - Line 202: the command, temporary-directory, patch-name, patch-command, and test-summary spans.
   - Line 210: the `fu-gate-`, `fu-capture-`, and `fu-red-` prefix spans.
   - Lines 218, 221, 225, and 228: the mutation-name spans.
   - Line 240: the setup pathname span.

Findings outside the claims: none.

Attacked and held: the named mutations establish the specific failures recorded in the numbered verdicts. Unchanged role-link color under hover or focus is documented behavior, not the emphasis assertion gap. An absent ring at rest is expected. The accepted light/dark registry exclusion does not establish a visual frame for those roles.

VERDICT: FAIL 2, 7, 8; outside the claims: none