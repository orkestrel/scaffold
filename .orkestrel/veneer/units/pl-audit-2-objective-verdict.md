1. **CONFIRMED — Coverage.** The reading unions the reset population with the declared longhands, then checks every declared value; see [preflight.test.ts:220](/home/user/veneer-pl/tests/service/tailwind/preflight.test.ts:220). C1 reaches the equality assertion and fails on `caption-side: bottom` against `top`. C2 makes omitted readings compare as `undefined`, but the caption-side value guard catches that omission. These assertions distinguish the mutations from the passing case; see [pl-mutations-2.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations-2.log.txt:1). The corresponding green reading is [pl-green-2.log.txt:10](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-green-2.log.txt:10).

2. **CONFIRMED — Dimension key.** The exported [PreflightDimension interface:1076](/home/user/veneer-pl/tests/setupStyles.ts:1076) types the helper parameter and the table. The height row names only `input`, `select`, and `textarea`; see [setupStyles.ts:1835](/home/user/veneer-pl/tests/setupStyles.ts:1835). Movement handling and forbidden-row checks match the property **and** tag.

   The retained [mutation log:23](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations-2.log.txt:23) distinguishes each attack:

   - D1a fails for the unrecorded `hr | height | 5px` move. D1b passes after that row is recorded, correctly treating the move as an ordinary departure.
   - D2 fails the `select | height` guard.
   - D3 fails the forbidden-height-row assertion on the host and recorded-value resolution under staging.
   - D4 fails content-height equality: `21` against `22`.
   - D5 fails property membership, height lookup, and the moved-height guard.

3. **CONFIRMED — Control.** The control restates the reached longhands at `initial`, compares staged readings against their baseline, and requires the later control layer to move properties from the earlier layers and the elements layer; see [preflight.test.ts:160](/home/user/veneer-pl/tests/service/tailwind/preflight.test.ts:160).

   S1 fails because `box-sizing` moves; S2 fails because `box-sizing` and `border-collapse` move; S3 fails the staged table-color assertion. These are assertion failures that distinguish misplaced or absent staging from the passing case; see [pl-mutations-2.log.txt:94](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations-2.log.txt:94).

   Round 1’s control passed the supplied S1 run; see [pl-r4-round1-base-defaults.log.txt:5](/home/user/veneer-pl/tmp/units/pl-r4-round1-base-defaults.log.txt:5). That log remains in the worktree’s evidence directory; the brief’s named copy under scaffold’s `pl-instruments/` directory is absent.

4. **BROKEN — Guide accuracy.** The rewritten paragraph says the remaining rows concern form controls and the document root; see [pl-shared-2.patch:20](/home/user/scaffold/.orkestrel/veneer/units/pl-shared-2.patch:20). The actual table includes iframe display and vertical alignment, SVG display, and table border colors. The captured readings establish those departures; see [pl-classify.out.txt:93](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-classify.out.txt:93) and [line 128](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-classify.out.txt:128). M1a and M1b also distinguish the replaced-element departures through failing assertions; see [pl-mutations-2.log.txt:130](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations-2.log.txt:130).

   The same sentence incorrectly describes background inheritance. The installed reset sets form-control backgrounds to `transparent`; see [preflight.css:255](/home/user/veneer-pl/node_modules/tailwindcss/preflight.css:255).

   **Smallest fix:** replace that sentence with an accurate description of the remaining rows and the transparent background treatment. The revised titles, explicit staging label, height exception, and stated limit on measuring Chromium 153’s content height hold.

5. **BROKEN — Reported gate command.** The report names `git apply --check .orkestrel/veneer/units/pl-shared-2.patch` in the worktree and reports exit 0; see [report:66](/home/user/scaffold/.orkestrel/veneer/units/b-preflight-host-report-2.md:66). Executing that exact command from `/home/user/veneer-pl` returns exit 128 because the patch path does not exist there. The retained [apply log:1](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-apply-check-2.log.txt:1) records a different command using the absolute scaffold path. That command passes.

   **Smallest fix:** copy the command from the retained log into the report. The patch itself applies.

   The other named gates have printed exit-0 evidence in the retained format, lint, check, setup, preflight, guides, guide-format, and service logs. The round-2 [service log:10](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-test-service-2.log.txt:10) records the full service pass.

   The code-law attack held. A TypeScript AST inspection over added lines found no explicit `any`, prohibited assertion, non-null assertion, or prohibited nested function. Its planted control detected those constructs. The added-line suppression/mock scan found no matches. The live diff matches the retained diff byte for byte.

   The report states these counts:

   - [Line 13](/home/user/scaffold/.orkestrel/veneer/units/b-preflight-host-report-2.md:13): `4 passed (4)`.
   - Lines 25 and 28: “One term” and the service run “once.”
   - Lines 36–46: `2 failed | 2 passed (4)`, `4 passed (4)`, `4 failed (4)`, and `1 failed | 3 passed (4)`.
   - Lines 61–65: `149 passed (149)`, `4 passed (4)`, “both rows,” `20 passed (20)`, and `3 passed (3)` test files.
   - Line 72: “both rounds.”

**Finding outside the claims — report-mutation-summary.** The [report’s opening:3](/home/user/scaffold/.orkestrel/veneer/units/b-preflight-host-report-2.md:3) says every item-2 mutation fails. D1b deliberately passes: the reset moves the horizontal rule’s height, and the guide records that move; see [pl-mutations-2.log.txt:35](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations-2.log.txt:35). The passing behavior is correct. Amend the summary to distinguish rejected mutations from D1b’s accepted recorded departure.

**Attacked and held:** The shared guide patch is intentionally unapplied in the worktree. Its in-memory application matches the retained patched guide. Recorded table-color rows correctly remain acceptable when staging already supplies their preflight values. The staged content-height comparison proves the stated stand-in behavior, not a measurement on Chromium 153.

VERDICT: FAIL 4, 5; outside the claims: report-mutation-summary