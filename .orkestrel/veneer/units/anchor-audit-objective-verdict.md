1. **CONFIRMED.** The computed-value claim survives the declaration-deletion attack on the recorded Chromium 141 run. The assertions distinguish the passing value from `always` in [dropdown.test.ts:94](/home/user/veneer-anchor/tests/src/styles/components/dropdown.test.ts:94), [tooltip.test.ts:181](/home/user/veneer-anchor/tests/src/styles/components/tooltip.test.ts:181), and [popover.test.ts:89](/home/user/veneer-anchor/tests/src/styles/components/popover.test.ts:89). Each case also compares the closed element with a bare element’s initial value and asserts that the unlayered consumer class computes `always`. Read: [anchor-red.log.txt:233](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-red.log.txt:233) and [anchor-green.log.txt:230](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-green.log.txt:230). These prove computed values; they do not prove suppression after clipping.

2. **BROKEN — the comment overclaims; placement and attribution hold.** The combined-rule attack confirms the writer’s correction of the Orchestrator: [attributeSelector:4072](/home/user/veneer-anchor/tests/setupServer.ts:4072) returns one owner, and [collectLedger:4566](/home/user/veneer-anchor/tests/setupServer.ts:4566) does not distribute that rule across components. Read: [anchor-attribution-probe.log.txt:9](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-attribution-probe.log.txt:9): the control has no drift; the combined plant produces only `dropdown` additions. The probe contains no assertions, so its green test status alone proves nothing; its differing output supports the attribution reading.

   D46 supports sharing this decision through a mixin. However, [_mixins.scss:644](/home/user/veneer-anchor/src/styles/_mixins.scss:644) promises that the overlay shows “only while its anchor is visible.” The retained viewport counterexample under claim 7 falsifies that description. Smallest fix: describe the computed declaration and the measured suppression boundary accurately. Keep the per-partial placement; no separate naming defect was established.

3. **CONFIRMED.** The rows at [veneer.md:10487](/home/user/veneer-anchor/guides/veneer.md:10487) and [veneer.md:10584](/home/user/veneer-anchor/guides/veneer.md:10584) carry `—` for selectors and `anchors-visible` for declarations. The deletion mutation distinguishes them from the passing cascade: Sass removes the emptied rules, and [conformance.test.ts:277](/home/user/veneer-anchor/tests/conformance.test.ts:277) rejects every stale selector and declaration row. Read: [anchor-mutation-conformance.log.txt:12](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-mutation-conformance.log.txt:12), which names the stale rows for `dropdown`, `tooltip`, and `popover`; [anchor-test-conformance.log.txt:10](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-test-conformance.log.txt:10) records the restored passing case.

4. **CONFIRMED.** Each selector is admitted explicitly in [dropdown.test.ts:61](/home/user/veneer-anchor/tests/src/styles/components/dropdown.test.ts:61), [tooltip.test.ts:54](/home/user/veneer-anchor/tests/src/styles/components/tooltip.test.ts:54), and [popover.test.ts:54](/home/user/veneer-anchor/tests/src/styles/components/popover.test.ts:54). Deleting the declaration removes the selector and fails each enumeration assertion. Read: [anchor-mutation-styles.log.txt:575](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-mutation-styles.log.txt:575), :612, and :653.

   The tooltip and popover assertions distinguish missing and extra selectors; their sets intentionally ignore duplicate rules. Dropdown checks required-selector presence and makes no extra-selector rejection claim. Its title also matches its `display: none` and `display: block` assertions. These boundaries follow the [seam ruling:35](/home/user/scaffold/.orkestrel/veneer/units/ebc-audit-3-verdict.md:35).

5. **CONFIRMED.** A read-only PostCSS enumeration of [dist/src/styles/index.css:1](/home/user/veneer-anchor/dist/src/styles/index.css:1) found the following complete components-layer population whose selectors start with `:where(`. The predicates are at [mixins.test.ts:215](/home/user/veneer-anchor/tests/src/styles/mixins.test.ts:215).

   | Selector | Old population | New population |
   |---|---|---|
   | `:where(button.dropdown-item)` | Admitted | Admitted |
   | `:where(.dropdown-menu):popover-open` | Admitted | Excluded |
   | `:where(button.nav-link)` | Admitted | Admitted |
   | `:where(button.navbar-toggler)` | Admitted | Admitted |
   | `:where(button.accordion-button)` | Admitted | Admitted |
   | `:where(button.page-link)` | Admitted | Admitted |
   | `:where(button.list-group-item)` | Admitted | Admitted |
   | `:where(button.btn-close)` | Admitted | Admitted |
   | `:where(.tooltip):popover-open` | Admitted | Excluded |
   | `:where(.popover):popover-open` | Admitted | Excluded |
   | `:where(button.carousel-control-prev,button.carousel-control-next)` | Admitted | Admitted |
   | `:where(.carousel-indicators [data-bs-target])` | Admitted | Admitted |

   Every retained rule writes the button reboot. The carousel indicator selector legitimately belongs despite not requiring a button tag.

   The property case at [mixins.test.ts:267](/home/user/veneer-anchor/tests/src/styles/mixins.test.ts:267) walks declarations throughout the built cascade. Its assertion distinguishes deletion, changed value, removed open-state suffix, `!important`, duplicate declarations, and an extra declaration outside the components layer. Read: [anchor-mutation-styles.log.txt:540](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-mutation-styles.log.txt:540); independent in-memory mutations also changed the assertion’s result.

6. **UNRESOLVED — the base-run claim lacks evidence for the added mixin case.** [anchor-red.log.txt:3](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-red.log.txt:3) runs only the component files with the `computes anchored visibility` filter. It cannot establish a base failure for [mixins.test.ts:262](/home/user/veneer-anchor/tests/src/styles/mixins.test.ts:262).

   The retained deletion mutation does establish assertion failures for every affected case:

   | Case | Distinguishing assertion | Mutation-log line |
   |---|---|---|
   | Dropdown computed value | `always` differs from `anchors-visible` | 596 |
   | Tooltip computed value | `always` differs from `anchors-visible` | 678 |
   | Popover computed value | `always` differs from `anchors-visible` | 637 |
   | Dropdown enumeration | Required selector becomes missing | 575 |
   | Tooltip enumeration | Actual selector set loses the admitted selector | 653 |
   | Popover enumeration | Actual selector set loses the admitted selector | 612 |
   | Mixin property case | Declaration reading becomes empty | 540 |

   These are assertion failures in [anchor-mutation-styles.log.txt](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-mutation-styles.log.txt:540), not harness failures. The restored suite passes in [anchor-test-src-styles.log.txt:8202](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-test-src-styles.log.txt:8202). Deletion distinguishes the component cases on Chromium 141; it would not distinguish them on a browser whose initial value is already `anchors-visible`. The structural mixin assertion remains discriminating there. Supply the missing base-run evidence or narrow the historical claim to the component cases.

7. **BROKEN.** The universal visibility statement at [veneer.md:4715](/home/user/veneer-anchor/guides/veneer.md:4715), repeated at :5641 and :5722, exceeds the measured behavior. The dropdown Reason cells at [veneer.md:10487](/home/user/veneer-anchor/guides/veneer.md:10487) also contradict the retained reading.

   Exact counterexample: [viewportClip:1012](/home/user/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3.test.ts:1012) scrolls the toggle’s bottom beyond the viewport’s top. Read: [j-native-probe-3-141.log.txt:120](/home/user/scaffold/.orkestrel/veneer/units/native141/j-native-probe-3-141.log.txt:120). Under the candidate rule, the menu still computes `anchors-visible`, remains open, and remains hit-testable. The full-scroller dropdown reading at [:114](/home/user/scaffold/.orkestrel/veneer/units/native141/j-native-probe-3-141.log.txt:114) likewise reports `hitIsOverlay: true`.

   The adjacent tooltip and popover scroller readings at :122 and :124 do distinguish the candidate from `always`. The computed-value rule therefore stands; the universal prose does not. Smallest fix: state the computed-value alignment and accurately bound the suppression claims to the measured cases.

8. **CONFIRMED.** The scope attack found no unowned path. Live status and diff equal the retained [anchor-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/anchor-status.txt:1) and `anchor.diff`; the conditional mixin ownership is satisfied.

   Each retained gate log records exit 0: [format:9](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-format-check.log.txt:9), [lint:5](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-lint-check.log.txt:5), [check:29](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-check.log.txt:29), [styles:8207](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-test-src-styles.log.txt:8207), [conformance:15](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-test-conformance.log.txt:15), [guides:15](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-test-guides.log.txt:15), and [policy:15](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-test-policy.log.txt:15). These are retained results, not gates rerun by this lane.

**Outside the claims — MID-LOG — BROKEN.** [e-id-anchor-report.md:40](/home/user/scaffold/.orkestrel/veneer/units/e-id-anchor-report.md:40) cites `anchor-mid.log.txt` as showing the button-reboot case failing. The cited [log:538](/home/user/scaffold/.orkestrel/veneer/units/anchor-instruments/anchor-mid.log.txt:538) reports a passing run and contains no assertion failure. Smallest fix: remove that claimed observation or cite the actual failing run. This evidence error does not invalidate the final filter or the separately retained deletion failures.

VERDICT: FAIL 2, 6, 7; outside the claims: MID-LOG