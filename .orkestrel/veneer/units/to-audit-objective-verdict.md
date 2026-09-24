# Audit round 1 — TOAST (`to`): objective lane verdict (GPT-6 Astra)

The `analyst` lane's final message, verbatim below the rule. Journal `tmp/codex/to-audit-analyst.jsonl` (swept at acceptance), thread `01a0d0f0-4d70-7192-8c7c-fb20beeb1224`; probe `ready` at 01:03:21 UTC, lane 01:03:21 to 01:10:24 UTC, exit 0; brief `to-audit-analyst-brief.md`, launcher `to-audit-analyst.sh`.

---

1. **CONFIRMED — Scope and delta.** The current status matches [to-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/to-status.txt:1). Reconstructing the added files from the retained diff produced byte-identical worktree files. The tracked diff against `2a3f223` is empty. `git apply --check --verbose` passed against those unchanged base files. The [shared patch:1](/home/user/scaffold/.orkestrel/veneer/units/to-shared.patch:1) changes only authorized shared paths. The attack for sibling changes failed: the deferred modal/offcanvas selectors, sibling ordering, stack values, and stack paragraph remain unchanged. The toast Alias-cell change is explicitly authorized.

2. **CONFIRMED — Partial against the oracle.** Compiling the partial in memory with installed Sass and comparing its parsed declarations against the inventory produced exactly the recorded departures in [to-shared.patch:507](/home/user/scaffold/.orkestrel/veneer/units/to-shared.patch:507). Selector membership and order matched; removing the body rule made that comparison reject the negative control. The component layer, bindings, colors, margins, and states match [the partial:1](/home/user/veneer-to/src/styles/components/_toast.scss:1). No priority flag or transition declaration occurs.

   The spacing attack also failed: [Bootstrap’s variables:1478](/home/user/veneer-to/node_modules/bootstrap/scss/_variables.scss:1478) derive toast spacing from container padding, whose source is the grid gutter at line 525. The selected gutter token preserves that relationship. The adjacent standalone toast correctly declares the stacking slot without consuming it through a stacking declaration.

3. **UNRESOLVED — Mutation discrimination holds; the claimed failing-first execution lacks retained evidence.** The assertions distinguish the named mutations as follows. References are to [toast.test.ts](/home/user/veneer-to/tests/src/styles/components/toast.test.ts:1).

   | Mutation | Distinguishing assertion |
   | --- | --- |
   | Container slot becomes literal `1090` | Line 191 requires computed stacking to become `1234` after the wrapper retune. |
   | Toast slot disappears | Lines 189 and 193 read the standalone toast’s slot, outside the container’s inheritance. |
   | Hidden-state rule disappears | Lines 148–151 require hidden display and geometry beside a displayed toast. |
   | Showing-state rule disappears | Lines 164–170 distinguish opacity, display, and the hidden combination. |
   | Last-child qualifier disappears | Lines 213–224 require the terminal margin to remain zero, including after an individual retune. |
   | Header receives the full radius | Lines 245–258 require the radius minus border width before and after retuning. |
   | Close combinator targets the toast | Lines 273–276 require header margins and zero margins on the body control. |
   | Toast background becomes literal | Lines 321–334 compare themed paint and then retune the aliases. |
   | Body uses vertical/horizontal padding | Lines 294–295 require the horizontal inset on every side; lines 107 and 134 exercise retunes. |
   | Gap uses the density token | Lines 104–110 require the gap to remain unchanged while insets scale. |
   | Rule disappears or an extra toast rule appears | Lines 38–49 compare the complete selector set. |
   | Barrel import disappears | The selector, dimensions, slots, states, geometry, and paint assertions distinguish the missing partial. |

   I read [to-mutate-styles.py:12](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-mutate-styles.py:12) and [to-gate-styles.log.txt:145](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-gate-styles.log.txt:145). The script defines the controls; the log records the passing combined style run. Neither records the mutation failures. The failing-first result exists only in [the author’s report:98](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report.md:98). Retain the mutation output, including collected case names and build/test exits, or rerun the controls on the host to settle the execution claim.

4. **CONFIRMED — Close combinator move.** The [patch:17](/home/user/scaffold/.orkestrel/veneer/units/to-shared.patch:17) moves the selector into the shipped table and deletes its guide deferral at line 486. It leaves the partition assertion unchanged.

   The attack that leaves the selector deferred while deleting its guide row is distinguished by [setupStyles.test.ts:2735](/home/user/veneer-to/tests/setupStyles.test.ts:2735). The landed rule also violates the deferred-rule absence assertion in [close.test.ts:96](/home/user/veneer-to/tests/src/styles/components/close.test.ts:96). Broadening the combinator is distinguished by [toast.test.ts:276](/home/user/veneer-to/tests/src/styles/components/toast.test.ts:276). I read the passing [setup log:32](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-gate-setup.log.txt:32) and [style log:145](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-gate-styles.log.txt:145). The unchanged close proof remains applicable.

5. **BROKEN — Specimen documentation is incomplete.** The complete specimen TSDoc in [to-shared.patch:334](/home/user/scaffold/.orkestrel/veneer/units/to-shared.patch:334) explains the replacement margin utility generically but never names the `me-auto` class and never records the excluded colored specimens. The guide records those facts at lines 467–470. The visible section paragraph at line 330 also omits the required explanation that shipped placement utilities position absolute containers inside the frame. Add those explanations to their required locations.

   The implementation and mutation assertions otherwise hold. [ToastSection.ts:18](/home/user/veneer-to/app/browser/sections/ToastSection.ts:18) delegates to the shared section. In [ToastSection.test.ts](/home/user/veneer-to/tests/app/browser/sections/ToastSection.test.ts:24), the inline-style mutation fails line 24; missing visibility class fails line 40; changed accessible attributes fail line 53; missing close label fails lines 61–62; removed frame fails lines 88–89; changed centering utility fails lines 102–105 and 154–155. I read [to-mutate-section.py:18](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-mutate-section.py:18) and the passing [section log:76](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-gate-section.log.txt:76). The mutation execution outputs are absent.

   Compiling the unchanged base barrel confirmed the placement, growth, and close utilities exist and the named margin/background substitutes do not. This finding requires documentation changes, not additional specimens.

6. **CONFIRMED — Registries and orders.** The omission/order attack failed against the [capture registrations:161](/home/user/scaffold/.orkestrel/veneer/units/to-shared.patch:161), [conformance registrations:269](/home/user/scaffold/.orkestrel/veneer/units/to-shared.patch:269), and [showcase construction:383](/home/user/scaffold/.orkestrel/veneer/units/to-shared.patch:383). Subjects, selectors, properties, exports, expected labels, and the plural release stem agree. The patch adds no driven registration.

   Removing the toast construction would disagree with the exact showcase label/specimen expectations; removing its stem mapping would disagree with the release-order expectation. I read the passing [application log:7](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-gate-app.log.txt:7), [conformance log:11](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-gate-conformance.log.txt:11), and [journey log:287](/home/user/scaffold/.orkestrel/veneer/units/to-instruments/to-journey-observation.log.txt:287). Declining a showing-state capture is consistent with the recorded resting-state ruling.

7. **BROKEN — The guide overstates standalone stacking behavior.** [To-shared.patch:437](/home/user/scaffold/.orkestrel/veneer/units/to-shared.patch:437) says retuning the rung moves every toast and container. A standalone shown toast is the counterexample: [the partial:12](/home/user/veneer-to/src/styles/components/_toast.scss:12) declares its slot but supplies no stacking declaration; only the container consumes the slot at line 53. The section proof explicitly expects the standalone toast to remain static at [line 95](/home/user/veneer-to/tests/app/browser/sections/ToastSection.test.ts:95). The style proof reads that toast’s custom property, not a changed computed stacking value.

   Correct the guide and matching partial comment to distinguish slot retuning from container stacking. Preserve the oracle-compatible CSS.

   The ledger and plugin attacks otherwise held. The compiled departures match the guide rows, including the prefixed widths recorded as declared departures. [Bootstrap’s Toast source:75](/home/user/veneer-to/node_modules/bootstrap/js/src/toast.js:75) supports the listed methods, cancellation points, state classes, and timer behavior. Its listeners at line 184 include mouse and focus events, so the report correctly rejects the terrain’s focus-only account. [Dismiss handling:12](/home/user/veneer-to/node_modules/bootstrap/js/src/util/component-functions.js:12) defaults to hiding the selected or ancestor toast. The row ends with the required owner. I read the passing conformance and guide logs; their success does not establish the disputed prose.

8. **BROKEN — Law and report.** [The report:87](/home/user/scaffold/.orkestrel/veneer/units/b-modal-to-report.md:87) uses the prohibited cross-reference “below”; line 164 identifies a documented option by position; line 183 uses temporal “new.” Added guide prose also leaves code tokens without their required nouns, for example [to-shared.patch:425](/home/user/scaffold/.orkestrel/veneer/units/to-shared.patch:425). Rewrite those passages.

   The frame-case population at [ToastSection.test.ts:120](/home/user/veneer-to/tests/app/browser/sections/ToastSection.test.ts:120) is an inline case table rather than an exported, frozen setup table. Centralize and bind that population. The added named toast tables themselves are frozen and bound at [to-shared.patch:106](/home/user/scaffold/.orkestrel/veneer/units/to-shared.patch:106). No added helper duplicates the installed test primitives; the forbidden assertion, suppression, mock, and spy attacks found no violation in the owned files or patch.

   **Outside-claim finding REPORT-COUNTS — BROKEN.** As requested, the report’s counts are recorded here. Its authored specimen tallies, including “the pair” and “the single toast” at line 83 and “a pair”/“one container” at lines 650–651, violate the no-count rule. Replace those tallies with specimen names. Required run measurements remain evidence; listing them here does not establish that their runs occurred.

   | Report location | Counts stated |
   | --- | --- |
   | Lines 9–12, owned additions | Toast partial `+90`; style proof `+337`; section `+20`; section proof `+180`. |
   | Lines 18–30, shared diffstats | Style barrel `+1 −0`; style setup `+48 −1`; setup proof `+52 −0`; capture setup `+26 −0`; integration `+2 −0`; showcase proof `+3 −0`; export proof `+3 −0`; conformance `+7 −3`; server setup proof `+1 −0`; constants `+40 −0`; showcase `+2 −0`; application barrel `+1 −0`; guide `+99 −8`. |
   | Lines 91–92, baseline | `22 passed (22)`; `17 passed (17)`. |
   | Lines 98–109, style controls | `17 failed (17)`; literal/dropped slot and full radius each `1 failed / 16 passed`; hidden rule and body inset each `3 failed / 14 passed`; showing rule, qualifier, combinator, literal paint, and density gap each `2 failed / 15 passed`; restored partial `17 passed (17)`. |
   | Lines 113–114, partition controls | `1 failed / 16 passed (17)`, then `17 passed (17)`; `1 failed / 121 passed (122)`, then `122 passed (122)`. |
   | Lines 120–125, specimen controls | Removed frame and changed centering each `3 failed / 2 passed`; changed accessibility, missing visibility class, inline style, and missing label each `1 failed / 4 passed`. The mutation descriptions also specify “one toast” or “one toast body.” |
   | Lines 135–141, gates | Styles `34 passed (34)`; section `5 passed (5)`; application `5 passed (5)`; setup `267 passed (267)`; conformance `22 passed (22)`; guides `19 passed (19)`; policy `109 passed / 1 skipped (110)`. |
   | Lines 147–148, observations | “One” setup run; `1 failed / 266 passed`; `267 passed (267)`; journey `8 passed / 168 skipped (176)` across `4 passed (4)` files. |
   | Lines 83, 164, 650–651, authored prose | “the pair,” “the single toast,” “accessible pair,” “first documented pair,” “a pair of toasts,” and “one container.” |

VERDICT: FAIL 3, 5, 7, 8; outside the claims: REPORT-COUNTS