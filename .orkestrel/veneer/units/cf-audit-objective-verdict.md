1. **CONFIRMED — Scope.** The attack was to compare the actual status and every patch destination with the ownership lists. The status matches [cf-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/cf-status.txt:1); every shared-patch destination appears in the brief’s [Shared list:73](/home/user/scaffold/.orkestrel/veneer/units/b-cross-cf-brief.md:73). The off-limits patch adds only the transition entry to the dash-filter expectation at [cf-offlimits.patch:7](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-offlimits.patch:7). No scope escape was found. The Orchestrator’s apply ruling stands.

2. **CONFIRMED — Rules and order.** The attack was an in-memory Sass compilation of the patched barrel, followed by controls omitting the fade import and reversing its position relative to collapse. The control emitted exactly the claimed fade declarations and reduced-motion condition; omission removed them; reversal moved them after collapse. The source agrees at [_fade.scss:18](/home/user/veneer-cf/src/styles/components/_fade.scss:18), and the patch puts the import before collapse at [cf-shared.patch:272](/home/user/scaffold/.orkestrel/veneer/units/cf-shared.patch:272). The widened stem map names fade before collapse at [cf-shared.patch:377](/home/user/scaffold/.orkestrel/veneer/units/cf-shared.patch:377).

   The retained build result is [cf-gate-4.log.txt:56](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-gate-4.log.txt:56). M4 distinguishes the reversed order through the computed transition assertion at [fade.test.ts:154](/home/user/veneer-cf/tests/src/styles/components/fade.test.ts:154) and the conformance order assertion. Their failures are retained at [cf-mutations.log.txt:63](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-mutations.log.txt:63). Compound modal and offcanvas rules remain separate, correctly owned declarations.

3. **BROKEN — The claim overstates the proofs.** The selector case at [fade.test.ts:27](/home/user/veneer-cf/tests/src/styles/components/fade.test.ts:27) reads selector text. The declaration case at [fade.test.ts:52](/home/user/veneer-cf/tests/src/styles/components/fade.test.ts:52) reads rule declarations through the CSS object model. Neither reads computed values. The actual passing implementation therefore falsifies “each case reads computed values.”

   The mutation clauses hold on the retained evidence. Each mutation is distinguished by these assertions, matching the named failures in the mutation log:

   | Mutation | Distinguishing assertion | Retained log |
   |---|---|---|
   | M1: remove hidden state | Selector membership, declaration inventory, hidden opacity, component opacity, and dark-state opacity change. | [Line 1](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-mutations.log.txt:1) |
   | M2: literal duration | Declaration text changes; doubling the motion factor no longer produces the asserted duration. | [Line 23](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-mutations.log.txt:23) |
   | M3: remove reduced-motion twin | The declaration inventory loses its media entry; staged reduced motion retains a transition. | [Line 43](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-mutations.log.txt:43) |
   | M4: reverse partial order | The combined fade/collapsing element transitions opacity instead of height; the barrel sequence differs. | [Line 63](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-mutations.log.txt:63) |
   | M5: bare fade opacity rule | Selector and declaration inventories differ; shown elements become transparent. | [Line 97](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-mutations.log.txt:97) |
   | M6: add shown-state rule | The selector set gains the unrecorded selector. The structural assertion distinguishes it even where computed values stay unchanged. | [Line 120](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-mutations.log.txt:120) |
   | M7: disable hit testing | The hit-test result no longer equals the hidden element. | [Line 139](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-mutations.log.txt:139) |
   | M8: dark opacity override | The selector set gains a rule; the dark hidden opacity differs from the light reading. | [Line 156](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-mutations.log.txt:156) |

   The no-partial failures are retained at [cf-red-fade.log.txt:371](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-red-fade.log.txt:371) and [cf-nopartial-fade.log.txt:370](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-nopartial-fade.log.txt:370), with the passing control at [cf-green-fade.log.txt:77](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-green-fade.log.txt:77).

   The report’s broader assertion that every added case ran red also fails: [cf-base-section.log.txt:13](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-base-section.log.txt:13) records an import failure and no collected tests. With collection working, [cf-nopartial-section.log.txt:41](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-nopartial-section.log.txt:41) records passing section cases alongside the opacity failure.

   **Smallest correction:** preserve the structural checks, pair them with computed readings where D45 requires them, and replace the universal failing-first statement with the evidenced scope. Obtain collected negative-control runs for the remaining claimed cases.

4. **NOT-EVIDENCED — Actual capture frames are missing.** The source and retained browser results support the region’s markup, state, accessibility attribute, and reserved box. The specimen declarations and rationale appear at [cf-shared.patch:34](/home/user/scaffold/.orkestrel/veneer/units/cf-shared.patch:34).

   S1 removes the shown-state match and changes its computed opacity; S2 removes the hidden-state match and changes its computed opacity; S3 makes the reserved-height assertion false. The assertions distinguish these mutations at [FadeSection.test.ts:36](/home/user/veneer-cf/tests/app/browser/sections/FadeSection.test.ts:36) and [FadeSection.test.ts:56](/home/user/veneer-cf/tests/app/browser/sections/FadeSection.test.ts:56). Their failures and passing control are retained at [cf-mutations.log.txt:176](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-mutations.log.txt:176).

   The capture rows select the shown body’s opacity and the hidden body’s enclosing card height at [cf-shared.patch:425](/home/user/scaffold/.orkestrel/veneer/units/cf-shared.patch:425). Their consumer clones and lifts the specimen, then calls the element-placement method at [integration.test.ts:673](/home/user/veneer-cf/tests/app/browser/integration.test.ts:673) and [integration.test.ts:714](/home/user/veneer-cf/tests/app/browser/integration.test.ts:714). No fade placement calls the page method.

   However, [b-cross-cf-report.md:311](/home/user/scaffold/.orkestrel/veneer/units/b-cross-cf-report.md:311) explicitly says the journey and capture run were not executed. Supply the fade-shown and fade-hidden captures and their region readings from the assigned landing run. The missing evidence does not establish a defect in the configured route.

5. **CONFIRMED — Ledger.** The attack was to compare the patched row with the gate’s actual missing-row diagnostic and challenge whether compound ownership was inferred from partial names. The row at [cf-shared.patch:207](/home/user/scaffold/.orkestrel/veneer/units/cf-shared.patch:207) matches [cf-conformance-1.log.txt:20](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-conformance-1.log.txt:20). Removing that row is distinguished by the unrecorded-departure assertion; restoring it corresponds to the passing [cf-gate-6.log.txt:11](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-gate-6.log.txt:11).

   The ladder’s raw output assigns the generic selectors to transition, the dialog and modal backdrop compounds to modal, and the offcanvas backdrop compound to offcanvas at [cf-ladder.log.txt:9](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-ladder.log.txt:9). The implemented exact-class and prefix tiers agree at [setupServer.ts:2061](/home/user/veneer-cf/tests/setupServer.ts:2061); identical recordings are excluded from duplicate measurement at [setupServer.ts:2174](/home/user/veneer-cf/tests/setupServer.ts:2174).

   This confirms the recorded reading, not a regression guarantee from the ladder probe: its assertion checks only nonempty output at [cf-ladder.test.ts.txt:20](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-ladder.test.ts.txt:20). A mutation returning the wrong owner would survive that assertion.

6. **CONFIRMED — Guide, within its stated cascade and class-contract scope.** The attack was to compare every fade search hit with the patch and the installed engine’s class changes. The added section and rewritten paragraphs appear at [cf-shared.patch:87](/home/user/scaffold/.orkestrel/veneer/units/cf-shared.patch:87). The whole-guide search named at [b-cross-cf-report.md:245](/home/user/scaffold/.orkestrel/veneer/units/b-cross-cf-report.md:245) reaches the affected sentences.

   Alert dismissal removes the shown class before removal at [alert.js:44](/home/user/veneer-cf/node_modules/bootstrap/js/src/alert.js:44). Toast applies its animated and transitioning classes at [toast.js:84](/home/user/veneer-cf/node_modules/bootstrap/js/src/toast.js:84) and [toast.js:119](/home/user/veneer-cf/node_modules/bootstrap/js/src/toast.js:119). Popover inherits the tooltip behavior at [popover.js:42](/home/user/veneer-cf/node_modules/bootstrap/js/src/popover.js:42). The component assertions distinguish M1 and M5 through hidden or shown opacity, as retained in the mutation log.

   Component-specific statements about rules remain scoped to their components; the carousel-fade class remains distinct. The Files, Compatibility, Showcase, and Tests additions match the configured implementation. The passing guide result is [cf-gate-7.log.txt:11](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-gate-7.log.txt:11). Actual capture evidence remains the gap ruled under claim 4.

7. **BROKEN — Report wording does not meet its contract.** The report uses the table identifier directly as the subject of “pairs,” without the required noun, at [b-cross-cf-report.md:295](/home/user/scaffold/.orkestrel/veneer/units/b-cross-cf-report.md:295). Bare path tokens also appear at [b-cross-cf-report.md:45](/home/user/scaffold/.orkestrel/veneer/units/b-cross-cf-report.md:45). Under the claim’s literal temporal-word prohibition, “after dispatch” at [b-cross-cf-report.md:23](/home/user/scaffold/.orkestrel/veneer/units/b-cross-cf-report.md:23) is another counterexample.

   The changed TypeScript contains no prohibited assertion, explicit unsafe type, suppression, or disallowed nested function. The added tables are documented and frozen. Removing their freezes is distinguished by the frozen-state assertions at [cf-shared.patch:505](/home/user/scaffold/.orkestrel/veneer/units/cf-shared.patch:505) and [FadeSection.test.ts:42](/home/user/veneer-cf/tests/app/browser/sections/FadeSection.test.ts:42).

   The gate result lines match the retained gate logs, including the setup failure and its corrected run. The command/exit record is [cf-gates.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-gates.log.txt:1); the corrected setup result is [cf-setup-offlimits.log.txt:32](/home/user/scaffold/.orkestrel/veneer/units/cf-instruments/cf-setup-offlimits.log.txt:32).

   **Smallest correction:** add the missing nouns and rewrite the temporal report wording. Preserve the accurately quoted gate results.

   The report states these counts; repeated occurrences are grouped:

   | Report location | Counts stated |
   |---|---|
   | Lines 13, 16, 188 | 1 failed, 286 passed, total 287; corrected 287 passed, total 287 |
   | Lines 76–81 | Owned additions: 25, 218, 20, 111; total 374. Shared: 251 insertions, 28 deletions. Per-file figures: +106 with 19 deletions; +52; +36; +31; +21 with 9 deletions; +21; app additions +1 to +3 |
   | Lines 110–111 | One color; a one-color region |
   | Lines 153, 156, 184, 187, 225 | 8 failed, total 8; 8 passed, total 8 |
   | Lines 161, 224 | 1 failed, 2 passed, total 3 |
   | Line 164 | 3 failed, 139 passed, total 142 |
   | Line 167 | 3 failed, 19 passed, total 22 |
   | Line 169 | 1 failed, 21 passed, total 22 |
   | Lines 180, 199 | 419 files; line 180 also states 4 threads |
   | Lines 185–186 | 22 passed, total 22; 19 passed, total 19 |
   | Line 189 | 109 passed, 1 skipped, total 110 |
   | Lines 190, 308 | 1288 passed, total 1288 |
   | Line 197 | At least one target file |
   | Lines 214, 218 | 5 failed, 3 passed, total 8 |
   | Lines 215–216, 221 | 2 failed, 6 passed, total 8 |
   | Lines 217, 219–220 | 1 failed, 7 passed, total 8 |
   | Lines 222–223 | 2 failed, 1 passed, total 3 |
   | Line 225 | Section control: 3 passed, total 3 |

**Outside the claims — BROKEN: report-diffstat.** The report labels the guide change “+106 with 19 deletions” and the conformance change “+21 with 9 deletions” at [b-cross-cf-report.md:79](/home/user/scaffold/.orkestrel/veneer/units/b-cross-cf-report.md:79). Counting added and removed lines in the supplied patch yields guide additions 87/deletions 19 and conformance additions 12/deletions 9. The reported figures are total changed lines, incorrectly marked as additions. The aggregate 251 insertions and 28 deletions is correct. Replace the per-file addition figures or label them as changed-line totals.

**Attacked and held.** The off-limits expectation change remains a brief-list omission, supported by the retained setup failure and corrected run. The Orchestrator’s ruling stands. Structural selector assertions also remain useful: M6 demonstrates a recorded-surface violation that can leave the sampled computed values unchanged.

VERDICT: FAIL 3, 4, 7; outside the claims: report-diffstat