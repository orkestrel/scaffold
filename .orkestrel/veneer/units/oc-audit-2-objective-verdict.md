1. **CONFIRMED.** The scope attack found no unrelated change. The live status matches [oc-2-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/oc-2-status.txt:1), and an in-memory patch check matched every owned file to the retained diff. Comparing the reconstructed shared files across rounds found changes only in the breakpoint comment, the priority-case title, and the specified guide passages and table padding. The other shared files are unchanged. The navbar comment has the explicit grant at [b-modal-oc-brief-2.md:55](/home/user/scaffold/.orkestrel/veneer/units/b-modal-oc-brief-2.md:55). The Orchestrator’s apply ruling stands.

2. **CONFIRMED.** The attack against an altered comparator failed: the reconstructed case differs only in its title, which matches the required wording at [oc-shared-2.patch:953](/home/user/scaffold/.orkestrel/veneer/units/oc-shared-2.patch:953). The `inline-panel-fill-flag-dropped-priority` mutation is distinguished: removing the inline fill’s important flag changes the shipped priority set from normal-and-important to normal. The equality assertion rejects that set. I read its retained failure at [oc-mutations-2.log.txt:49](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutations-2.log.txt:49) and the passing conformance run at [oc-gates-2.log.txt:37](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-gates-2.log.txt:37). A priority swap between conditions remains outside this comparator’s coverage and stays with LEDGER.

3. **CONFIRMED.** The attacks against failed collection and vacuous assertions no longer hold. The mutation preserves the exports at [oc-mutate-2.py.txt:12](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutate-2.py.txt:12). The retained log names the collected specimen-reading failures, rather than an import failure.

   The mutations have distinguishing assertions:

   - The `section-failing-first-specimens-emptied` mutation fails the expected specimen names, backdrop requirement, and explicit nonempty guards at [OffcanvasSection.test.ts:66](/home/user/veneer-oc/tests/app/browser/sections/OffcanvasSection.test.ts:66) and [OffcanvasSection.test.ts:136](/home/user/veneer-oc/tests/app/browser/sections/OffcanvasSection.test.ts:136). The destruction cases legitimately survive. I read [oc-mutations-2.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutations-2.log.txt:1).
   - The `showing-rule-dropped` mutation changes showing visibility and translation. The `hiding-rule-dropped` mutation changes hiding visibility. The state assertion reads those properties independently at [offcanvas.test.ts:196](/home/user/veneer-oc/tests/src/styles/components/offcanvas.test.ts:196), and the selector assertion detects each missing selector. I read the failures at [oc-mutations-2.log.txt:18](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutations-2.log.txt:18) and [oc-mutations-2.log.txt:29](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutations-2.log.txt:29).
   - The renamed-rule and planted-rule controls are distinguished by missing/extra selector-condition membership. The instrument sets its exit status from those differences at [oc-cascade-probe-2.cjs.txt:23](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-cascade-probe-2.cjs.txt:23). I read the clean exit and failing controls at [oc-cascade-2.log.txt:5](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-cascade-2.log.txt:5). This instrument proves membership, not declaration equality.

4. **BROKEN.** The plugin row still promises visibility changes that cancellation prevents. It says the toggle trigger “hides another open panel first” at [oc-shared-2.patch:779](/home/user/scaffold/.orkestrel/veneer/units/oc-shared-2.patch:779).

   Counterexample: panel A is open, its hide-event listener cancels the event, and an enabled trigger targets panel B. Bootstrap calls A’s hide method, which returns before changing its state at [offcanvas.js:133](/home/user/veneer-oc/node_modules/bootstrap/js/src/offcanvas.js:133). The click handler then toggles B without checking that result at [offcanvas.js:250](/home/user/veneer-oc/node_modules/bootstrap/js/src/offcanvas.js:250). A remains open. Without cancellation, hiding is initiated before B’s toggle; its transition need not have completed.

   The unconditional dismiss and Escape wording has the same cancellation problem. A disabled dismiss trigger also returns without hiding at [component-functions.js:21](/home/user/veneer-oc/node_modules/bootstrap/js/src/util/component-functions.js:21).

   The smallest fix is to describe calls to the show/hide methods, state the disabled-dismiss guard, and qualify resulting transitions by acceptance of the cancelable event. The defaults, focus-return guard, static-backdrop branch, transition callbacks, utility composition, row form, and owner ending otherwise match the installed source.

5. **BROKEN.** The requested replacements are present, but the blanket writing claim fails. The added plugin row leaves the `fixed` value and the `keyboard: false` setting without their required nouns at [oc-shared-2.patch:779](/home/user/scaffold/.orkestrel/veneer/units/oc-shared-2.patch:779). The rewritten ramp paragraph similarly leaves the `auto` and `0` values bare at [oc-shared-2.patch:231](/home/user/scaffold/.orkestrel/veneer/units/oc-shared-2.patch:231). Add the nouns.

   The behavioral clauses survive their attacks. The stacking sentence excludes the reversed-rung counterexample. The breakpoint and prescribed comments use the required wording. The `navbar-expanded-width-flag-dropped` mutation is distinguished by the expected slot width at [offcanvas.test.ts:516](/home/user/veneer-oc/tests/src/styles/components/offcanvas.test.ts:516); the later placement width wins when the flag is removed. I read its retained failures at [oc-mutations-2.log.txt:102](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutations-2.log.txt:102).

6. **CONFIRMED.** The dropped-fill-flag attack is distinguished by the maintained case’s background readings at [offcanvas.test.ts:290](/home/user/veneer-oc/tests/src/styles/components/offcanvas.test.ts:290). At 992 pixels it requires transparency; at 991 pixels it requires each utility’s color and fixed positioning. I read the isolated failure at [oc-mutations-2.log.txt:40](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutations-2.log.txt:40).

   The retained measurements support the claim’s explicit bounds: Veneer’s inline panel and body remain clear, while the release’s inline panel takes the utility color. See [oc-utility-reading-2.log.txt:94](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-utility-reading-2.log.txt:94) and [oc-utility-reading-2.log.txt:126](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-utility-reading-2.log.txt:126). The adjacent fixed-body behavior differs correctly: at 991 pixels, applying the utility to the body paints it.

   The exploratory probe merely asserts that readings exist; its passing status alone proves no color expectation. The maintained case supplies the panel assertions and failing control. The equal clear-fill declarations at [_offcanvas.scss:119](/home/user/veneer-oc/src/styles/components/_offcanvas.scss:119) and Bootstrap’s [_offcanvas.scss:100](/home/user/veneer-oc/node_modules/bootstrap/scss/_offcanvas.scss:100) support leaving this layer-order difference outside the declaration-value ledger.

7. **CONFIRMED.** The regression attack found no change to the previously confirmed cascade declarations, backdrop mixin, registries, or existing assertion bodies. The shared-file comparison preserves those subjects; the owned stylesheet changes only its comment.

   I read the retained [oc-mutations.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-mutations.log.txt:1). Its carried mutations remain distinguishable:

   | Mutation | Distinguishing assertion |
   |---|---|
   | `absent-partial` | Selector membership and fixed positioning. |
   | `literal-rungs` | Retuned stacking values. |
   | `backdrop-without-mixin-no-states` | Fade opacity and selector membership. |
   | `backdrop-without-mixin-full-copy` | Declaration duplication; equivalent rendered CSS correctly cannot distinguish it. |
   | `placements-start-end-transforms-swapped` | Translation sign beside panel size. |
   | `show-rule-dropped` | Shown visibility. |
   | `md-down-and-up-names-shifted-apart`, `ramp-nested-rules-dropped` | Boundary readings and rule membership. |
   | `combinator-widened-to-offcanvas-btn-close` | The body control’s margins. |
   | `literal-colours`, `insets-literal` | Alias and density retunes. |
   | `transition-without-mixin` | Reduced-motion properties and conditions. |
   | `title-margin-reset-dropped` | Title margin against the control heading. |
   | Navbar width, transform, and border flag removals | Slot width, resting translation, and placement borders. |
   | `body-fill-important-dropped` | Priority-set equality. |
   | `state-case-hiding-marked-unslid`, `placement-start-sign-flipped`, `geometry-width-wrong` | Table values compared with recorded declarations. |
   | `app-panel-without-show`, `app-backdrop-on-end-panel`, `app-aria-modal-added`, `app-responsive-frame-dropped`, `app-navbar-offcanvas-specimen-dropped` | Shown class, backdrop parent, absent modal attribute, frame membership, and specimen name. |

   Those assertions remain in [offcanvas.test.ts:47](/home/user/veneer-oc/tests/src/styles/components/offcanvas.test.ts:47), [OffcanvasSection.test.ts:59](/home/user/veneer-oc/tests/app/browser/sections/OffcanvasSection.test.ts:59), and the table-binding patch at [oc-shared-2.patch:1158](/home/user/scaffold/.orkestrel/veneer/units/oc-shared-2.patch:1158). The repaired transition controls are ruled separately under claim 3.

8. **BROKEN.** The syntax exclusions hold, but the report’s writing claim does not. Examples include temporal “now” at [b-modal-oc-report-2.md:43](/home/user/scaffold/.orkestrel/veneer/units/b-modal-oc-report-2.md:43), temporal “new” at line 257, and the bare values reproduced in its plugin quotation. Remove the temporal qualifiers and supply the missing nouns. The retained [oc-gates-2.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/oc-instruments/oc-gates-2.log.txt:1) supports the reported gate exits; the report table paraphrases test results rather than reproducing their result lines.

   The navbar note’s **out-of-scope assertion is false**. The brief grants the comment, not merely the replaced sentence, at [b-modal-oc-brief-2.md:55](/home/user/scaffold/.orkestrel/veneer/units/b-modal-oc-brief-2.md:55). Its causal distinction also needs care: the shipped important visibility declaration wins before specificity at [_navbar.scss:192](/home/user/veneer-oc/src/styles/components/_navbar.scss:192). Higher specificity would still suffice after removing that flag. Redundancy against the shipped hidden rule does not mean the flag participates in no winning declaration.

   **Outside-claim finding — report-counts: BROKEN.** The authored phrase “takes one term” at [b-modal-oc-report-2.md:148](/home/user/scaffold/.orkestrel/veneer/units/b-modal-oc-report-2.md:148) states a terminology tally. Replace it with “uses the `lg` breakpoint throughout.”

   The requested count record also includes “both sheets” in the quoted case titles at lines 20–21, “one backdrop” in the quoted case title at line 37, and “one panel” in the quoted previous comment at line 156. Those quotations identify existing text; they are not additional authored tally findings. Round identifiers, exit codes, viewport widths, color channels, and the model version are values rather than growable-set counts.

Attacked and held: removing specimens legitimately leaves destruction tests passing; equivalent backdrop CSS legitimately survives browser assertions while failing duplication checks; transition-only states legitimately have no showcase frame; the fixed body may take a background utility even though the inline body remains clear.

VERDICT: FAIL 4, 5, 8; outside the claims: report-counts