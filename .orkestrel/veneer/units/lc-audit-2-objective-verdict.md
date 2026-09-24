1. **CONFIRMED — Downstream set.** Restoring the removed dark-primary entries makes the strict comparison at [integration.test.ts:515](/home/user/veneer-lc2/tests/app/browser/integration.test.ts:515) fail, as [lc2-journey-light-1.log.txt:9](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-journey-light-1.log.txt:9) records. The corrected cases pass in [lc2-journey-light-2.log.txt:6](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-journey-light-2.log.txt:6) and [lc2-journey-dark-2.log.txt:6](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-journey-dark-2.log.txt:6); [lc2-app.log.txt:12](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-app.log.txt:12) records exit 0. The link assertion rejects unchanged or reversed hover/focus colors. Searching the deleted fill literals across the named oracle, app-test, specimen, source, and guide paths found no surviving pin. The oracle records Bootstrap’s behavior; its stylesheet digest matches the installed Bootstrap artifact.

2. **CONFIRMED — Root attribute.** The white-immediate, black-after-400-ms, and black-with-motion-off readings in [lc2-probe-1.log.txt:15](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-probe-1.log.txt:15) support the transition diagnosis. The assertion at [button.test.ts:158](/home/user/veneer-lc2/tests/src/styles/components/button.test.ts:158) distinguishes R1’s incorrect root-rule order and R2’s unstaged transition from the passing case. [lc2-mutation-R1.log.txt:12](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-mutation-R1.log.txt:12) and [lc2-mutation-R2.log.txt:12](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-mutation-R2.log.txt:12) show that assertion failing; R1 leaves the island case green. The passing run is [lc2-green-1.log.txt:179](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-green-1.log.txt:179).

3. **BROKEN — “Never moves the fill” exceeds the proof.** The counterexample is a primary button under the lowered dark consumer rule, without a mode attribute, while hovered or active. Its resting fill stays light, but its mixing endpoint changes from near-black to white. [The button partial:155](/home/user/veneer-lc2/src/styles/components/_button.scss:155) uses that scheme-dependent endpoint for hover and active backgrounds. Read-only Sass compilation confirms those declarations.

   The assertion at [button.test.ts:176](/home/user/veneer-lc2/tests/src/styles/components/button.test.ts:176) compares resting backgrounds only. It cannot distinguish a change confined to hover or active fills. R3 does distinguish the incorrect white-label expectation, as [lc2-mutation-R3.log.txt:12](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-mutation-R3.log.txt:12) records, but proves nothing about those state fills.

   The stylesheet routes and recorded resting readings hold. The installed Lightning CSS compiler also produces the table’s lowered declarations. The error is the universal sentence at [veneer.md:3002](/home/user/veneer-lc2/guides/veneer.md:3002), including the Orchestrator’s prescribed wording. **Smallest fix:** qualify the unchanged fill as the resting role fill and state that scheme-dependent hover and active endpoints can change.

4. **CONFIRMED — Link amount.** [link.test.ts:75](/home/user/veneer-lc2/tests/src/styles/utilities/link.test.ts:75) compares the browser result with independent sRGB channel arithmetic using the pinned 0.2 weight. R4 preserves direction while changing magnitude, so the arithmetic assertion distinguishes it from the passing case. [lc2-mutation-R4.log.txt:6](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-mutation-R4.log.txt:6) names every role in light and dark modes, and identifies the arithmetic assertion as the failure. The unchanged case passes in the retained green and styles-gate logs.

5. **CONFIRMED — Terminology and emitted bytes.** Inspection found no remaining calls to the renamed function or references to the former triplet map. The declarations and callers agree at [mixins:218](/home/user/veneer-lc2/src/styles/_mixins.scss:218), [tokens:212](/home/user/veneer-lc2/src/styles/_tokens.scss:212), and the component and utility call sites.

   [lc2-gate-5.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-gate-5.log.txt:1) records the actual comparison command and exit 0. Independent SHA-256 readings of the retained baseline and worktree build match. An in-memory comparison accepts those bytes and rejects a control with an appended byte. The attack against concealed emitted drift failed.

6. **BROKEN — The parity comment overstates its fixture’s coverage.** [mixins:189](/home/user/veneer-lc2/src/styles/_mixins.scss:189) attributes agreement for Veneer’s fills and Bootstrap’s fills to the fixture. [contrast.scss:30](/home/user/veneer-lc2/tests/src/styles/fixtures/contrast.scss:30) iterates only Bootstrap’s theme-color map.

   An in-memory mutation selecting black specifically for Veneer’s light-primary triplet `(8, 65, 234)` leaves that fixture’s compiled output identical. A control targeting Bootstrap’s primary triplet `(13, 110, 253)` changes it. The fixture’s assertions therefore cannot distinguish the excluded Veneer mutation. Other floor tests can reject it; this finding concerns the cited parity proof. Independent compilation found the shipped role picks agreeing, so no shipped label mismatch is established. **Smallest fix:** restrict the fixture attribution to Bootstrap’s theme-color fills. The Orchestrator’s earlier fixture attribution has the same coverage error.

   The moved tables, retune guidance, and floor-state wording hold. [setupStyles.test.ts:2648](/home/user/veneer-lc2/tests/setupStyles.test.ts:2648) rejects mismatched island names, incorrectly named scheme selectors, unfrozen entries, self-transitions, and repeated destination states. [button.test.ts:57](/home/user/veneer-lc2/tests/src/styles/components/button.test.ts:57) reads the states the guide names. The setup and styles gate logs record passing runs.

7. **CONFIRMED — Enumerated syntax restrictions and gate exits.** Inspection of the changed lines found no prohibited assertion, suppression, nested helper, or mock. Direct anonymous callbacks and literal const assertions are permitted. The individual gate logs record exit 0; [lc2-gates.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/lc-instruments/lc2-gates.log.txt:1) agrees with them.

   The report states these run counts:

   | Reading | Reported count |
   |---|---|
   | Light and dark filtered journeys | Each: `2 passed | 47 skipped (49)` |
   | App | `60 passed (60)` files; `202 passed (202)` tests |
   | Setup | `308 passed (308)` |
   | Conformance | `26 passed (26)` |
   | Guides | `20 passed (20)` |
   | Styles | `1413 passed (1413)` |
   | Touched styles | `228 passed (228)` |

   These match the retained logs and are run measurements. Their report locations are [report:21](/home/user/scaffold/.orkestrel/veneer/units/b-label-lc-report-2.md:21), [report:31](/home/user/scaffold/.orkestrel/veneer/units/b-label-lc-report-2.md:31), and [report:139](/home/user/scaffold/.orkestrel/veneer/units/b-label-lc-report-2.md:139).

**Outside the claims — F4: BROKEN, detached export documentation.** Inserting the shift constant between the offset description and its declaration leaves the offset export undocumented at [setupStyles.ts:1181](/home/user/veneer-lc2/tests/setupStyles.ts:1181). The installed TypeScript parser reports no attached JSDoc for the `LINK_OFFSET_CASES` declaration. The exported values remain correct. **Smallest fix:** move the offset description immediately before its declaration.

**Attacked and held:** An immediate white reading during the enabled transition is valid intermediate behavior. A declared scheme without lowering leaves the shipped label white. Outline resting states remain outside the floor claim. These adjacent behaviors do not establish the defects described above.

VERDICT: FAIL 3, 6; outside the claims: F4