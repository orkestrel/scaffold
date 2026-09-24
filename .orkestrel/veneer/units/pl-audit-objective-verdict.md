1. **CONFIRMED — Scope.** The live status matches [pl-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/pl-status.txt:1), and the live diff against the `fc3ddfe` commit matches the retained diff byte for byte. The shared patch touches only the guide and passes the applicability check against the unchanged base guide. The attack for unreported source changes failed.

2. **BROKEN — Classification.** The report classifies every tab-size row as directly declared at [b-preflight-host-report.md:18](/home/user/scaffold/.orkestrel/veneer/units/b-preflight-host-report.md:18), contradicting its selector-matching definition at line 15. The retained reading labels the root’s tab-size row declared and the horizontal rule’s row a consequence; see [pl-classify.out.txt:8](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-classify.out.txt:8). The installed reset declares tab size on the root and host selectors, not the universal selector; see [preflight.css:28](/home/user/veneer-pl/node_modules/tailwindcss/preflight.css:28).

   Classify the non-root tab-size rows as inherited consequences with a stable preflight value. Their continued comparison is correct. The retained readings support the text-decoration-color, logical-padding, height, and excluded-width classifications.

3. **BROKEN — Comparison coverage.** The proof does not assert every property Veneer’s elements layer declares. It builds the reading population exclusively from the preflight profile at [preflight.test.ts:50](/home/user/veneer-pl/tests/service/tailwind/preflight.test.ts:50), then checks declared properties only inside that population at [preflight.test.ts:180](/home/user/veneer-pl/tests/service/tailwind/preflight.test.ts:180).

   The existing table caption-side declaration is a counterexample; see [_table.scss:5](/home/user/veneer-pl/src/styles/elements/_table.scss:5). A read-only PostCSS inspection confirms that the built elements layer declares it and the reset does not. The proof never reads or asserts it. This falsifies the coverage claim; it does not establish a rendered caption defect. Read and assert elements-layer longhands separately from the reset’s movement population.

   Within the measured population, the assertions distinguish the named mutations: M2 breaks preserved-value equality, M6 breaks content-extent equality, M3/M4 break move membership, M1b breaks recorded-value resolution, and M5/M12 break forbidden-row checks. The retained [red baseline:20](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-red-baseline.log.txt:20) shows the select-height disagreement and missing table-color rows. The [green log:7](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-green.log.txt:7) records the passing host and emulated-build cases.

4. **CONFIRMED — Emulation.** The staged declarations occupy the theme sublayer at [setupStyles.ts:1852](/home/user/veneer-pl/tests/setupStyles.ts:1852). The control reads the staged table color and select content extent, then checks that the profile overrides the staged background at [preflight.test.ts:129](/home/user/veneer-pl/tests/service/tailwind/preflight.test.ts:129).

   The misplaced-layer attack M7 fails the background assertion; see [pl-mutations.log.txt:96](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations.log.txt:96). The empty-staging attack M8 fails the control while the pairing cases pass; see [pl-mutations.log.txt:110](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations.log.txt:110). These assertions distinguish the mutations from working staging. The classification capture reproduces the recorded select-height, select-background, and table-color differences. This supports the Orchestrator’s bounded emulation ruling, not equivalence to an entire Chromium 153 runtime.

5. **CONFIRMED — Named mutations.** The retained mutation log reports assertion failures rather than collection or launch failures. Each named attack is distinguished from the passing case:

   - M1a produces an unrecorded vertical-alignment value; M1b leaves recorded display values unresolved; see [pl-mutations.log.txt:1](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations.log.txt:1).
   - M2 rebuilds successfully and breaks list-style preservation; see [pl-mutations.log.txt:28](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations.log.txt:28).
   - M3 and M4 produce unrecorded tab-size moves; see [pl-mutations.log.txt:41](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations.log.txt:41).
   - M5 fails the dimension exclusion on the host and recorded-value resolution under emulation; see [pl-mutations.log.txt:69](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations.log.txt:69).
   - M6 produces unequal input content extents; see [pl-mutations.log.txt:84](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations.log.txt:84).
   - M12 fails the declared-pair exclusion; see [pl-mutations.log.txt:154](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations.log.txt:154).
   - M13 fails property membership, height lookup, and the moved-height guard; see [pl-mutation-run.log.txt:8](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutation-run.log.txt:8).

   The driver restores the worktree files before each mutation at [pl-mutations.sh:16](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations.sh:16). The retained M11 diagnostic uses the restructured prefix assertion, and the M13 stack matches the submitted source. These records support the claimed mutation pass against the restructured tree.

6. **CONFIRMED — Tables and helper.** The exported tables and their nested collections are frozen and documented; see [setupStyles.ts:1815](/home/user/veneer-pl/tests/setupStyles.ts:1815). The helper subtracts the supplied vertical edges only under border-box sizing at [setupStyles.ts:1142](/home/user/veneer-pl/tests/setupStyles.ts:1142).

   M9 distinguishes misplaced staging, M10 distinguishes unconditional subtraction, and M11 distinguishes a margin substituted for a padding edge; see [pl-mutations.log.txt:121](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-mutations.log.txt:121). Their assertions fail for the named mutations. Read-only execution of the extracted declarations also returns 19 for the border-box specimen and 20.5 for its content-box counterpart; M10 returns 19 for that counterpart. The attacks against sizing behavior and actual freezing failed.

7. **BROKEN — Guide accuracy.** The rewritten sentence still says every element-declared property is asserted unchanged; see [pl-shared.patch:6](/home/user/scaffold/.orkestrel/veneer/units/pl-shared.patch:6). The caption-side omission in claim 3 falsifies that sentence. Correct the proof’s declared-property coverage.

   The patch does remove the form-control height rows. The content-extent treatment, informational Standalone column, recorded Chromium differences, and staging description agree with the supplied readings. The guide gate passes in [pl-test-guides.log.txt:11](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-test-guides.log.txt:11), but that result does not prove the coverage sentence. M3, M4, M5, and M12 distinguish invalid departure-table edits through the service assertions.

8. **BROKEN — Law and report.** The changed TypeScript passes the inspected prohibitions: the AST inspection finds only const assertions, with no added explicit-any type, non-null assertion, prohibited nested function, or other type assertion. The changed diff contains no suppression or mocking construct.

   The report nevertheless contains growable-set tallies, including the diffstat and “one more,” and uses the temporal description “new comparison”; see [b-preflight-host-report.md:7](/home/user/scaffold/.orkestrel/veneer/units/b-preflight-host-report.md:7), [line 88](/home/user/scaffold/.orkestrel/veneer/units/b-preflight-host-report.md:88), and [line 10](/home/user/scaffold/.orkestrel/veneer/units/b-preflight-host-report.md:10). It also leaves code tokens without following nouns, including the helper name after “proof for” at [line 11](/home/user/scaffold/.orkestrel/veneer/units/b-preflight-host-report.md:11). Remove the prohibited prose tallies, remove the temporal description, and supply the missing nouns. Preserve necessary run-backed measurements.

   The report states these counts:

   - Line 7: 3 changed files, 284 insertions, and 54 deletions.
   - Line 9: once per build and “two values.”
   - Lines 64 and 70: 1 failed / 2 passed / 3 total; 4 passed / 4 total.
   - Mutation rows at lines 87–100: 2 failed / 2 passed / 4 total; 1 failed / 3 passed / 4 total; 1 failed / 148 passed / 149 total; 4 failed / 4 total. Line 88 also states “one more.”
   - Gate rows at lines 113–118: 149 passed / 149 total; 4 passed / 4 total; 2 failed / 2 passed / 4 total; 20 passed / 20 total; 3 test files passed / 3 total. Line 118 states that the service gate ran once.
   - Line 131: “one sentence.” Line 141: “One slip.”

Findings outside the claims: none.

Attacked and held: The submitted guide is intentionally unapplied in the worktree. Its resulting service failures are expected and are captured in [pl-worktree-unpatched.log.txt:8](/home/user/scaffold/.orkestrel/veneer/units/pl-instruments/pl-worktree-unpatched.log.txt:8). Recorded table-color rows may remain when an emulated default already resolves their preflight value; the recorded-value assertion correctly accepts that state.

VERDICT: FAIL 2, 3, 7, 8; outside the claims: none