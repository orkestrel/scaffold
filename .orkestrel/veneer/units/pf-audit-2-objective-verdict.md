1. **CONFIRMED — Scope and delta.** The live diff and retained diff have identical SHA-256 digests. The [status record](/home/user/scaffold/.orkestrel/veneer/units/pf-2-status.txt:1) matches the live status and round 1’s owned paths. The [shared patch](/home/user/scaffold/.orkestrel/veneer/units/pf-shared-2.patch:1) changes only the guide.

   The attack was an unrelated change or weakened earlier ruling. The round-2 delta implements P-a through P-d. Bounding, restoration, area admission, arrival placement, and lifted pointer placements remain intact. The Orchestrator’s apply-check ruling stands. File timestamps also support its ordering ruling: the final source modification was at 11:12:46, before the gate and capture records.

2. **CONFIRMED — The settle re-read.** The [settling method](/home/user/veneer-pf/tests/setupBrowser.ts:702) stages the viewport, calculates the taller of content and viewport, stages again unconditionally, compares the resulting effective heights, and names them when refusing. The [shooting method](/home/user/veneer-pf/tests/setupBrowser.ts:670) reads the region afterward.

   The assertions distinguish the named mutations:

   - The viewport-branch mutation bypasses the second staging and resolves the placement. The rejection assertion fails in [its retained log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-2-viewport-branch-skips-reread.log.txt:81).
   - Dropping the refusal resolves the viewport fixture and the growing-document fixture. Their rejection assertions fail in [its retained log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-2-settle-refusal-dropped.log.txt:81).
   - The [unmutated gate log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-2-gate-setup-browser.log.txt:80) supplies the passing control.

   The [observer seam](/home/user/veneer-pf/tests/setupBrowser.test.ts:614) changes a real section’s style after observing the marker. The installed [staging function](/home/user/veneer-pf/node_modules/@orkestrel/test/dist/src/browser/index.js:2731) actually writes that marker. No staging, measurement, or observer behavior is replaced.

3. **CONFIRMED — The pointer guard.** The attack was a pointer-held placement without an unconditional structural assertion. The guards precede Primary hover and active placements at [the Primary case](/home/user/veneer-pf/tests/app/browser/integration.test.ts:573), page-strip hover at line 902, list-group hover and active at lines 1294 and 1317, dropdown hover at line 1375, close hover at line 1474, carousel hover at line 1579, nav hover at line 1850, and navbar hover at line 2024.

   The un-lift mutation fails specifically on containment in [the guarded mutation log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-2-primary-unlifted.log.txt:86). Removing the guards makes that mutation pass in [the unguarded log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-2-primary-unlifted-unguarded.log.txt:76). Thus the containment assertion distinguishes the mutation; the later hover readings alone do not.

   The retained [unlifted column reading](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-2-unlifted-primary-hover-column.txt:3) records RGB (8, 65, 234), while the [lifted reading](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-2-lifted-primary-hover-column.txt:3) records RGB (7, 58, 208), matching the recorded hovered color.

4. **CONFIRMED — Re-read comments.** The attack was a comment still treating the restored document as the bounded shot document. The [restoration block](/home/user/veneer-pf/tests/setupBrowser.ts:675) releases the pane and restores excluded sections before returning. Each rewritten pointer comment instead identifies the lifted specimen’s unchanged position, followed by actual viewport staging.

   This holds at [Primary](/home/user/veneer-pf/tests/app/browser/integration.test.ts:575), [page strip](/home/user/veneer-pf/tests/app/browser/integration.test.ts:905), [close control](/home/user/veneer-pf/tests/app/browser/integration.test.ts:1476), [carousel](/home/user/veneer-pf/tests/app/browser/integration.test.ts:1581), and [nav](/home/user/veneer-pf/tests/app/browser/integration.test.ts:1852). Each specimen is prepended before its shot and restored after its re-read.

   The [checkbox comment](/home/user/veneer-pf/tests/app/browser/integration.test.ts:1662) describes preserved focus and ring treatment, not preserved coordinates. Its assertions compare focus and ring after restoration; the [capture artifact](/home/user/veneer-pf/tmp/capture/light-1280.txt:1881) records preserved focus. Neither prohibited re-read phrase remains in the owned files.

5. **CONFIRMED — Opening and staging prose.** The attack was a surviving definition that includes the Showcase region in the opening. The [registry remarks](/home/user/veneer-pf/tests/setup.ts:495), [class remarks](/home/user/veneer-pf/tests/setupBrowser.ts:553), and [guide patch](/home/user/scaffold/.orkestrel/veneer/units/pf-shared-2.patch:24) consistently distinguish the heading and Dark mode control from the region. The inspected arrival frame agrees.

   The [group-focus comment](/home/user/veneer-pf/tests/app/browser/integration.test.ts:1027) names Button group, matching the [section declaration](/home/user/veneer-pf/app/browser/constants.ts:885). The [range comment](/home/user/veneer-pf/tests/app/browser/integration.test.ts:1078) dates the blank measurement to before bounding. The constant references carry their noun, and the staging comments match the ordering established under claim 2.

6. **BROKEN — “A refused placement records nothing” is too broad.** The derived getter and its existing readers are correct, but recording precedes the portfolio call at [the shooting method](/home/user/veneer-pf/tests/setupBrowser.ts:673). A portfolio refusal therefore retains an admitted placement.

   The concrete input is the existing portfolio fixture’s registry containing `role-links`, with capture enabled, followed by a geometrically admissible `base` placement. The manager records that scenario before the installed [portfolio method](/home/user/veneer-pf/node_modules/@orkestrel/test/dist/src/browser/index.js:3415) rejects it as unregistered. A read-only execution of the unchanged installed portfolio declarations confirmed that refusal; the disabled control resolved. This execution tested the portfolio branch, not browser placement.

   The empty-list assertions at [the refusal cases](/home/user/veneer-pf/tests/setupBrowser.test.ts:600) distinguish recording before settling or admission. They do **not** test portfolio refusals. The successful-placement assertions at [the recording case](/home/user/veneer-pf/tests/setupBrowser.test.ts:413) distinguish omitting admitted placements.

   Smallest correction: restrict the claim to settling and area-admission refusals. Preserve the admitted-placement contract. Portfolio refusals already retained admitted scenarios in round 1; this is an overstatement in the claim, not a regression introduced by derivation.

7. **CONFIRMED — Capture evidence.** The [capture log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-2-capture-light-1280.log.txt:77) records the passing unmutated run and exit 0 after the final source modification.

   The attacks were the former oversized arrival and the stretched bottom panel. Direct PNG-header reads and image inspection confirm the arrival at 1280 × 800, bottom offcanvas at 1280 × 392, and navbar collapsed focus at 1280 × 1648. The navbar frame is also the tallest PNG in the variant. The [frame record](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-2-frames-light-1280.log.txt:3) places the bottom panel at y 144 with height 240, matching 30vh of the 800-pixel viewport and the visible border.

   The column records support the color values under claim 3. The [portfolio assertions](/home/user/veneer-pf/tests/app/browser/integration.test.ts:2372) distinguish missing registered regions, unreadable frames, blank sampled regions, and incomplete capture populations. They do not independently identify incorrect hover paint; claim 3’s mutation establishes that boundary.

8. **BROKEN — Report wording requirements.** The added-code restrictions hold. Inspection of the changed syntax found no prohibited assertion, suppression, nested function declaration or assignment, mock, spy, or fake clock. The placement recorder observes calls and layout without implementing capture behavior.

   Gate transcriptions also match the retained logs, including the formatter sentence and the absence of a result sentence from lint and typechecking. The report nevertheless leaves code tokens without following nouns, contrary to the successor brief. For example, [the report](/home/user/scaffold/.orkestrel/veneer/units/b-cross-pf-report-2.md:245) says “asserting `frames.scenarios` pass.” Add the appropriate nouns to authored prose; retain required historical quotations and result text as identified quotations.

   The following inventory uses line numbers in that report.

   **Counts and ordering quantities stated:**

   - “one meaning” at line 14; “one more reading” at line 34; “two readings” at lines 39 and 49; “two stagings” at line 46.
   - Second-reading or second-staging references at lines 23, 27, 29, 39, 45, 49, 61, and 228; first-reading references at lines 23, 62, 63, and 228. The message template at line 32 also names first and second readings.
   - “both guards” at line 104; “Both readings” at lines 119, 123, 135, and 138; “one section” at lines 176, 179, 220, and 223; “both” exception tags at line 182; “both files” at line 330.
   - Result quotations: `2 failed | 72 passed (74)` at lines 70 and 77; `1 failed | 73 passed (74)` at line 75; `74 passed (74)` at lines 79 and 259; `1 failed | 44 skipped (45)` at line 99; `1 passed | 44 skipped (45)` at line 105; `287 passed (287)` at line 258; `19 passed (19)` at line 260; `45 passed (45)` at line 262.
   - Diffstat quantities at lines 308–312: 202, 1, 51, 212, and 195.
   - Image dimensions, RGB values, column position, exit codes, dates, version identifiers, and the viewport multiplier are measurements or identifiers, not growable-set tallies.

   **Temporal wording stated:**

   - The report uses “before,” “after,” “again,” “first,” “second,” “then,” “when,” and “while” in procedure descriptions, case names, and before/after quotations.
   - It also uses “never” in the earlier error quotation at line 31, “old” at line 73, “already” at line 212, “no longer” at line 234, “last” at line 250, “original” and “next” at line 303, and “followed” at line 330.
   - The prohibited present-state markers “currently,” “now,” “new,” “latest,” and “soon” are absent. “Above” at lines 126, 132, 139, 145, and 158 describes physical layout. “Following” at lines 250 and 276 describes textual position.

   **Code spans without a following noun:**

   - Identity and location spans: the unit identifier at line 1; the role, worktree path, and branch at line 3; the commit identifier at lines 4, 215, and 305; the variant identifier at lines 11 and 330.
   - Source paths: the browser setup path at lines 19 and 175; its test path at lines 58 and 188; the setup path at line 165; the integration-test path at lines 84, 200, and 280; the guide path at line 215.
   - Expressions and statements: the maximum-height expression at line 21; the early-return statement at lines 27 and 74; the guard expression at line 83; the mapping expression at line 235; the scenario getter reference at line 245.
   - Case-name spans at lines 57 and 66; message or diagnostic spans at lines 31, 32, 67, 72, and 100; the color span at line 108.
   - Historical bare references: the constant link at line 51, capture-function token at line 186, maximum-height property at line 188, undefined-value token at line 196, and error-class token at line 198.
   - Patch names at line 215 and the successor patch at line 260; scratch-directory path at line 260; image names at lines 106, 328, and 329; capture-directory path at line 329.
   - Instrument and log paths at lines 71, 79, 107, 109, 113, 114, 250, 251, 256, 257, 260, 261, 262, and 266; artifact-directory paths at lines 286 and 287; the mutation-log filename pattern at line 293.
   - Command spans at lines 70, 98, 255–262, 275, and 290; result spans at lines 70, 75, 77, 79, 99, 105, 255, 258–262.
   - Search-pattern spans at lines 276, 279, and 281.

Findings outside the claims: none.

Attacked and held: an already-hidden section remains hidden after restoration. A settled retained section may exceed the viewport while remaining within area admission. Keyboard-focus placements after pointer release do not require a pointer guard. The derived getter returns a fresh collection, but the existing readers consume its contents immediately; none depends on the former collection’s identity.

VERDICT: FAIL 6, 8; outside the claims: none