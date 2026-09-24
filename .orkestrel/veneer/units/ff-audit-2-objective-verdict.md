1. **CONFIRMED — Scope.** The retained diff matches the worktree diff against `e4a6d7c` byte for byte. The live status matches [ff-2-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/ff-2-status.txt:1). The [shared patch:1](/home/user/scaffold/.orkestrel/veneer/units/ff-shared-2.patch:1) touches the guide alone. The attack looking for changes outside the owned files failed.

2. **UNRESOLVED — The outline guard.** The implementation and retained captures substantiate the pixel readings. The cases compute the strip, photograph painted and suppressed states, and assert positive painted variation and zero suppressed variation; see [list-group guard:1623](/home/user/veneer-ff/tests/app/browser/integration.test.ts:1623) and [skip-link guard:2678](/home/user/veneer-ff/tests/app/browser/integration.test.ts:2678). The inspected guard images agree with the [dark manifest:4](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-final-2/dark-1280.txt:4) and [light manifest:4](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-final-2/light-390.txt:4).

   The retained mutations distinguish these failures:

   | Mutation | Assertion that distinguishes it | Raw log read |
   | --- | --- | --- |
   | Skip-link scripted focus | Focus-visible assertion receives false; the pixel assertion is not reached. | [skip-script:80](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-case-mut2-skip-script-dark-1280.log.txt:80) |
   | Skip-link scripted focus plus key | Painted variation receives zero. | [skip-script-key:79](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-case-mut2-skip-script-key-dark-1280.log.txt:79) |
   | List-group scripted focus | Positive-reach assertion receives zero; the pixel assertion is not reached. | [row-script:80](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-case-mut2-row-script-dark-1280.log.txt:80) |
   | List-group scripted focus plus key | Painted variation receives zero. | [row-script-key:79](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-case-mut2-row-script-key-dark-1280.log.txt:79) |
   | Skip-link suppression removed | Suppressed variation receives 1 instead of zero. | [guard-no-control:80](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-case-mut2-guard-no-control-dark-1280.log.txt:80) |

   The claim also attributes a control-removal red to the list-group case. The supplied [mutation instrument:23](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-r2-mutate.py:23) removes suppression only from the skip-link case. No retained list-group control-removal run supplies that result. Its assertion predicts rejection, but that prediction is not an executed reading. Supply that run or restrict the claim’s control-removal statement to the skip-link case.

3. **BROKEN — The helper logic is not wholly decided by the proof rows.** The horizontal offset calculation at [setup.ts:2545](/home/user/veneer-ff/tests/setup.ts:2545) survives without a distinguishing row. The nonzero offset fixture at [setup.ts:2606](/home/user/veneer-ff/tests/setup.ts:2606) makes the vertical magnitude larger.

   I evaluated the actual helper and exported tables in memory through a read-only Node instrument. Replacing the maximum of the offset magnitudes with the vertical magnitude alone leaves every expected shadow, outline, and worn-pair reading satisfied. Removing only the horizontal absolute-value operation also leaves them satisfied. For the computed shadow value `rgb(0, 0, 0) -5px 2px 3px 1px`, the unchanged helper returns 9; either mutant returns 6. The assertions at [setup.test.ts:218](/home/user/veneer-ff/tests/setup.test.ts:218), [setup.test.ts:234](/home/user/veneer-ff/tests/setup.test.ts:234), and [setup.test.ts:250](/home/user/veneer-ff/tests/setup.test.ts:250) cannot distinguish these mutations.

   The instrument’s control removed the complete offset contribution and changed the existing offset row from 9 to 4, agreeing with the retained offset-mutation log. This was an in-memory evaluation, not a Vitest run. Add a negative horizontal-dominant row with expected reach 9 and retain its mutation red. The implementation itself returns the correct result for that input.

   The moved tables are frozen exports with TSDoc. The reported mutations do distinguish their named behaviors:

   | Mutation | Distinguishing result | Raw log read |
   | --- | --- | --- |
   | Layer split removed | Outer-layer readings become 1 instead of 4 and zero instead of 2. | [reach-no-split:34](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut2-reach-no-split.log.txt:34) |
   | Outline contribution removed | Outline-only and worn-pair proofs fail. | [reach-outline:34](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut2-reach-outline.log.txt:34) |
   | Inset exclusion removed | Inset readings become 3 and 6 instead of zero and 2. | [reach-inset:34](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut2-reach-inset.log.txt:34) |
   | Offset contribution removed | Shadow reach becomes 4 instead of 9. | [reach-offset:34](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut2-reach-offset.log.txt:34) |
   | Outline offset removed | Outline readings disagree with the expected array. | [reach-outline-offset:34](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut2-reach-outline-offset.log.txt:34) |
   | Left-edge reach removed | The crossed-edge proof loses the left edge. | [cropped-left:34](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut2-cropped-left.log.txt:34) |
   | Top-edge reach removed | The crossed-edge proof loses the top edge. | [cropped-top:34](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut2-cropped-top.log.txt:34) |
   | Band moved inside the box | The band’s vertical coordinate becomes 16 instead of 14. | [ring-band-inside:34](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut2-ring-band-inside.log.txt:34) |

   The [plain-split removal log:32](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut2-reach-plain-split.log.txt:32) and [color-stripping removal log:32](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut2-reach-no-strip.log.txt:32) remain green. Their removal does not explain or close the horizontal-offset proof gap.

4. **CONFIRMED — The pointer watcher.** The grouped-alignment release deletion passes in [checkgroup-norelease:77](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-case-r2-checkgroup-norelease-dark-1280.log.txt:77). The [pointer record:15](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-probes-2/ff-pointer-dark-1280.txt:15) records wrapper entries and an empty specimen-hover population for that scenario.

   The moved watcher records specimen entries at [integration.test.ts:2553](/home/user/veneer-ff/tests/app/browser/integration.test.ts:2553). Deleting its release is distinguished by the empty-record assertion: the [accordion mutation log:79](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-case-mut2-accordion-no-release-dark-1280.log.txt:79) receives the leading button and body text. The [restored filtered run:78](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-case-r2-green-dark-1280.log.txt:78) passes. The attack alleging that this watcher also remains empty failed.

5. **CONFIRMED — The drive readings.** I checked the complete [Veneer output:1](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-probes-2/ff-out-R2-DRIVES-VENEER.json:1), [release output:1](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-probes-2/ff-out-R2-DRIVES-RELEASE.json:1), and [drive log:5](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-probes-2/ff-drives.log.txt:5). The attack looking for omitted drive rows or disagreement between the cascades failed.

   For each subject and mode, scripted focus after a press records an unmatched pseudo-class and zero differing pixels. Adding the key records a matched pseudo-class but still zero differing pixels. Tab records a matched pseudo-class and positive differing pixels. Scripted focus without a preceding press also paints.

   The [instrument:37](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-probes-2/ff-drives-shared.ts:37) compares painted and suppressed frames. Changing Tab to scripted focus plus the key is distinguished by the permanent pixel assertions and their mutation logs under claim 2. Computed outline properties alone do not distinguish that mutation.

6. **CONFIRMED — The stated code-law claim.** Inspection of the changed declarations with the installed TypeScript parser found no added prohibited type, assertion, or nested function. The parser control detected deliberately supplied prohibited constructs. The changed-line review found no suppression, mock, spy, or fake clock. Anonymous callbacks passed directly to calls are permitted; logical negation is not a non-null assertion.

   The tables reside in the setup module with TSDoc at [setup.ts:2587](/home/user/veneer-ff/tests/setup.ts:2587), [setup.ts:2616](/home/user/veneer-ff/tests/setup.ts:2616), and [setup.ts:2632](/home/user/veneer-ff/tests/setup.ts:2632). The attack looking for a table left in the proof file failed.

   The report states these counts:

   - At [report:46](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-2.md:46): `304 passed (304)`.
   - At [report:64](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-2.md:64): `1 passed | 46 skipped (47)`.
   - At [report:73](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-2.md:73): the diagnostic’s abbreviated remainder, `…(2)`.
   - At [report:81](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-2.md:81): differing-pixel measurements 0, 668, 768, 1010, 1160, 5164, 5176, 7748, and 7766.
   - At [report:167](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-2.md:167): `305 passed (305)`; the following capture rows state `4 passed | 43 skipped (47)`; the guide row states `19 passed (19)`.
   - “One layer” and “one edge” describe mutation inputs at report lines 52 and 57. “One list-group action” occurs in quoted case names and the selection command. Round identifiers, dimensions, reach values, ratios, versions, and exit codes are not growable-set tallies.

**SETUP-FOCUS-UNIVERSAL — BROKEN, outside the claims.** The changed TSDoc at [setup.ts:503](/home/user/veneer-ff/tests/setup.ts:503) describes a focus frame as using a padded wrapper. The dropdown placement at [integration.test.ts:1744](/home/user/veneer-ff/tests/app/browser/integration.test.ts:1744) and carousel placement at [integration.test.ts:1982](/home/user/veneer-ff/tests/app/browser/integration.test.ts:1982) use their specimens directly. These call sites falsify the unqualified description. Restrict the TSDoc to the converted scenarios, as the guide patch does. This requires no change to the drives assigned to FRAME-HELPERS.

**REPORT-TOKEN-NOUNS — BROKEN, outside the claims.** The report’s assertion that every code token has a following noun at [report:96](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-2.md:96) is false. The radio-name token ends its sentence at [report:112](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-2.md:112). The wrapper and lifted-variable tokens lack following nouns at [report:199](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-2.md:199). Add the identifying nouns. This is a report-contract defect; it does not invalidate the recorded behavioral results.

**Attacked and held.** The supplied painted and suppressed frames visibly distinguish the outlines. A matching focus-visible pseudo-class with no painted automatic outline is a measured adjacent state. The grouped-alignment watcher’s empty reading is correct for its padded placement. The assignment of shared frame helpers and unconverted dropdown/carousel drives to FRAME-HELPERS stands.

VERDICT: FAIL 2, 3; outside the claims: SETUP-FOCUS-UNIVERSAL, REPORT-TOKEN-NOUNS