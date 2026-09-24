1. **CONFIRMED — Scope.** The live diff matches the retained diff byte for byte. The [status record](/home/user/scaffold/.orkestrel/veneer/units/pf-status.txt:1) names only the owned test files; the [shared patch](/home/user/scaffold/.orkestrel/veneer/units/pf-shared.patch:1) changes only the guide. The attack was an additional or omitted changed path; none appeared. The supplied apply-check ruling stands.

2. **CONFIRMED — Bounding and restoration.** The [exclusion method](/home/user/veneer-pf/tests/setupBrowser.ts:682) preserves children containing the subject or frame and children already hidden. The [outer finally block](/home/user/veneer-pf/tests/setupBrowser.ts:674) removes only attributes this placement added.

   The assertions distinguish every named mutation:
   - No bounding: the displayed-child assertion fails in [the mutation log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-no-bounding.log.txt:82).
   - Subject child hidden: the expected retained child disappears in [the mutation log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-subject-child-hidden.log.txt:82).
   - Element frames unbounded: the expected empty displayed-child collection differs in [the mutation log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-element-frames-unbounded.log.txt:82).
   - Restoration outside finally: the refused placement leaves a previously visible child hidden in [the mutation log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-restore-outside-finally.log.txt:81).
   - Clearing every hidden attribute: the previously hidden child becomes visible in [the mutation log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-restore-clears-every-hidden.log.txt:81).

   These are assertion failures against the claimed behavior, not collection failures. The [passing browser log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-gate-setup-browser.log.txt:80) supplies the control.

3. **BROKEN — The agreeing re-read is conditional.** When bounded content fits the viewport, the [settling method](/home/user/veneer-pf/tests/setupBrowser.ts:700) measures content and returns immediately at line 702. It never reaches the re-read at line 704. The [lifted-panel fixture](/home/user/veneer-pf/tests/setupBrowser.test.ts:487) exercises this state: its panel remains at the viewport height. Thus the unconditional requirement for an agreeing re-read is false.

   The taller-document proofs do distinguish their mutations. The viewport-pane mutation produces 896 instead of 3000 in [its log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-region-at-viewport-pane.log.txt:82). Reading before bounding produces incorrect coordinates and a region height of 268.796875 instead of 900 in [its log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-region-before-bounding.log.txt:82). Dropping the settle refusal resolves the growing-document placement in [its log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-settle-refusal-dropped.log.txt:81).

   Smallest correction: remove the early return so the viewport-sized branch also reaches the staged re-read. This finding concerns the stated contract; the supplied captures do not demonstrate incorrect geometry from that shortcut.

4. **CONFIRMED — Area admission.** The [constant declaration](/home/user/veneer-pf/tests/setup.ts:34) exports the required value. The [admission method](/home/user/veneer-pf/tests/setupBrowser.ts:716) rounds device dimensions upward, rejects only an area exceeding the limit, and names the scenario and dimensions. Admission precedes scenario and region recording.

   The [boundary case](/home/user/veneer-pf/tests/setupBrowser.test.ts:542) distinguishes equality from an excess row and checks that refused scenarios leave no recorded placement. The inclusive-comparison mutation rejects the permitted boundary in [its log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-area-off-by-one.log.txt:82). Dropping refusal resolves the oversized placement in [its log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-area-refusal-dropped.log.txt:82). Removing the export fails the export-membership assertion in [its log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-mutation-frame-area-unexported.log.txt:33). These assertions distinguish the mutations from the passing cases.

5. **CONFIRMED — Placements.** The [arrival call](/home/user/veneer-pf/tests/app/browser/integration.test.ts:250) remains a page placement. The [page-strip calls](/home/user/veneer-pf/tests/app/browser/integration.test.ts:898) use the padded stage as their element frame. The [Primary lift](/home/user/veneer-pf/tests/app/browser/integration.test.ts:541) precedes its hover and active placements, with state readings after each shot.

   The attack was a pointer-held placement left inside its showcase section or lacking its subsequent state reading. The call sites for list-group actions, dropdown, close control, carousel, navigation, and navbar retain their lifts and readings. The saved arrival, Primary hover, and page-strip focus images corroborate those placements.

6. **CONFIRMED — Captures.** Each retained capture log reports a passing run and exit 0: [light-390](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-capture-light-390.log.txt:78), [dark-390](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-capture-dark-390.log.txt:78), [light-1280](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-capture-light-1280.log.txt:78), and [dark-1280](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-capture-dark-1280.log.txt:78). The [portfolio assertions](/home/user/veneer-pf/tests/app/browser/integration.test.ts:2343) require registered-region membership, readable frames, positive variation, and capture completeness.

   The attacks were the former oversized arrival, a bottom panel stretched to its specimen, and a cropped page-strip ring. PNG-header reads confirm the reported dimensions. The viewed images show the opening alone, the Primary hover fill, the complete page-strip ring, and the opening with the Form range section.

   The [bottom-panel reading](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-frames.log.txt:4) places its region at y 130.8125 with height 253.1875, ending at row 384 inside the 392-pixel frame. The image’s top border appears at row 131. The element-unbounded and viewport-pane mutation assertions distinguish the corresponding geometry regressions, as ruled in claims 2 and 3.

7. **BROKEN — Settling prose exceeds the implementation.** The [class remarks](/home/user/veneer-pf/tests/setupBrowser.ts:562) require an additional agreeing reading before the region is read. The [private-method comment](/home/user/veneer-pf/tests/setupBrowser.ts:693) likewise promises a second reading. The viewport-sized return identified in claim 3 contradicts these sentences. The correction in claim 3 closes this mismatch.

   The remaining framing changes held against the call sites and images. The case-insensitive sweep for whole-page, whole-document, tall-page, and 8000-pixel wording found no remaining assertion that a frame includes the unbounded showcase. The guide’s floor-based variation description agrees with the reader and sampler.

8. **BROKEN — Report requirements.** The [report](/home/user/scaffold/.orkestrel/veneer/units/b-cross-pf-report.md:69) uses temporal “now,” repeated in its rewritten-sentence descriptions. Its sentence beginning with the bare scenario token at [line 131](/home/user/scaffold/.orkestrel/veneer/units/b-cross-pf-report.md:131) lacks the required following noun. The guide-format row says “clean” at [line 238](/home/user/scaffold/.orkestrel/veneer/units/b-cross-pf-report.md:238), rather than quoting “All matched files use the correct format.” from [the log](/home/user/scaffold/.orkestrel/veneer/units/pf-instruments/pf-guide-format.log.txt:3). Correct those report sentences and quote the recorded result.

   The code-law portion held: inspection of added syntax found no prohibited assertion, suppression, or nested function declaration or assignment. The [placement recorder](/home/user/veneer-pf/tests/setupBrowser.ts:523) records calls and live layout readings without implementing capture, bounding, settling, or admission behavior. It fits the permitted boundary-recorder rule.

   The report states these counts, including quoted material:
   - An interruption “once”; “one observer”; the frame forms described as “Both”; “one more reading” and “one agreeing reading”; “one log per mutation”; “four capture runs”; and “one variant at a time.”
   - Quoted framing descriptions name “one main child,” “one section,” “one shot,” “one image,” “one document,” “one host,” “both registered widths,” and “one color.”
   - The red setup-browser result is 6 failed, 67 passed, total 73; its green result is 73 passed, total 73.
   - Mutation failures are: no bounding 3; subject hidden 2; region before bounding 2; element frames unbounded 2; viewport-pane region 3; inclusive area comparison 1; dropped area refusal 2; restoration outside finally 1; clearing hidden attributes 1; dropped settle refusal 1; removed export 1.
   - Gate results state 287 setup tests, 73 browser-setup tests, and 19 guide tests. Each capture result states 45 tests.
   - The diffstat states changed-line counts of 128, 1, 49, 183, and 185 for the listed files. Image dimensions, pixel coordinates, durations, dates, versions, and exit codes are measurements or identifiers rather than growable-set tallies.

Findings outside the claims: none.

Attacked and held: preserving an already-hidden child is correct restoration, not incomplete cleanup. A taller retained section is permitted when its geometry settles and its frame passes admission. Portfolio-level refusals can retain an admitted scenario; the no-recording proof in claim 4 covers admission refusals. A resting arrival page frame is permitted alongside the focus page frames.

VERDICT: FAIL 3, 7, 8; outside the claims: none