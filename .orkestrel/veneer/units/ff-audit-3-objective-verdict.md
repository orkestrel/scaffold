1. **BROKEN — The helper rows.** The horizontal-offset repair holds, but no existing row decides the zero clamp at [tests/setup.ts:2551](/home/user/veneer-ff/tests/setup.ts:2551).

   I evaluated the actual helper and exported fixture tables in memory using Node and the installed TypeScript compiler. Replacing `Math.max(0, outline, ...shadows)` with `Math.max(outline, ...shadows)` leaves every fixture expectation satisfied. The assertions at [tests/setup.test.ts:218](/home/user/veneer-ff/tests/setup.test.ts:218), [tests/setup.test.ts:234](/home/user/veneer-ff/tests/setup.test.ts:234), and [tests/setup.test.ts:250](/home/user/veneer-ff/tests/setup.test.ts:250) **do not distinguish this mutation**.

   This input distinguishes it:

   ```text
   box-shadow:    color(srgb 0.1 0.2 0.3) 0px 0px 0px -3px
   outline-style: solid
   outline-width: 1px
   outline-offset: -4px

   Existing helper: 0
   Without zero clamp: -3
   ```

   The shadow fixtures supply a zero outline; the outline fixtures supply a zero shadow; the combined fixtures have positive contributions. Those values mask removal of the clamp. The smallest correction is a combined fixture with negative shadow reach and negative outline reach, expecting zero. Keep the clamp: the implementation answers this input correctly.

   The prescribed repairs are substantiated:

   - Replacing the offset maximum with `Math.abs(y)`, or dropping the horizontal absolute value, changes the added row from 9 to 6. The assertion distinguishes each mutation. I read [ff-mut3-offset-vertical-only.log.txt:34](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut3-offset-vertical-only.log.txt:34) and [ff-mut3-offset-horizontal-signed.log.txt:34](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut3-offset-horizontal-signed.log.txt:34).
   - Removing the added row lets each mutation pass. I read [ff-mut3-control-vertical-only.log.txt:32](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut3-control-vertical-only.log.txt:32) and [ff-mut3-control-horizontal-signed.log.txt:32](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut3-control-horizontal-signed.log.txt:32).
   - The shadow’s `none` branch is absent at [tests/setup.ts:2540](/home/user/veneer-ff/tests/setup.ts:2540). Its deletion preserves the expected readings, as recorded in [ff-3-none-branch-deleted.log.txt:32](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-3-none-branch-deleted.log.txt:32). The restored setup gate passes in [ff-3-gate-setup.log.txt:32](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-3-gate-setup.log.txt:32).

   The remaining decisions have distinguishing rows. These results came from read-only, in-memory mutations of the actual helper, not a Vitest run:

   | Mutation | Deciding fixture and result |
   | --- | --- |
   | Remove layer splitting | Layer-list fixture: 4 becomes 1. |
   | Remove inset exclusion | Inset-only fixture: 0 becomes 3. |
   | Remove each extraction default separately | The comma-containing `rgba()` fixture returns `NaN` instead of 3. |
   | Drop the vertical contribution or its absolute value | Negative vertical-dominant fixture: 9 becomes 6. |
   | Drop blur or spread | Offset fixture: 9 becomes 6 or 8. |
   | Ignore outline style | `none` style with width 3 and offset 2: 0 becomes 5. |
   | Drop outline width or offset | `auto` outline fixture: 2 becomes 1. |
   | Drop shadow or outline from the final maximum | The corresponding contribution’s fixture fails. |
   | Drop zero from the final maximum | No existing fixture fails. |

   I also read the retained `ff-mut2-reach-no-split.log.txt`, `ff-mut2-reach-inset.log.txt`, `ff-mut2-reach-offset.log.txt`, `ff-mut2-reach-outline.log.txt`, and `ff-mut2-reach-outline-offset.log.txt` logs. Their assertion failures agree with the corresponding evaluations. The horizontal mutation supplied the instrument’s failing control. The zero-clamp finding is a proof gap, not an observed incorrect result from the unchanged helper.

2. **CONFIRMED — The list-group control.** The attack replacing suppression with `outline-color: red !important` fails specifically at [tests/app/browser/integration.test.ts:1683](/home/user/veneer-ff/tests/app/browser/integration.test.ts:1683). The assertion **distinguishes the mutation**: the suppressed reading becomes `0.9952076677316294` instead of zero.

   I read the [mutation diff:1](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-mut3-row-no-control-dark-1280.diff.txt:1), [ff-case3-row-no-control-dark-1280.log.txt:79](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-case3-row-no-control-dark-1280.log.txt:79), and the restored [ff-case3-gate-dark-1280.log.txt:77](/home/user/scaffold/.orkestrel/veneer/units/ff-instruments/ff-case3-gate-dark-1280.log.txt:77). The restored run passes. The inspected painted and suppressed captures agree with the readings in [tmp/capture/dark-1280.txt:2](/home/user/veneer-ff/tmp/capture/dark-1280.txt:2). The earlier missing-control ruling is closed.

3. **CONFIRMED — The rename and TSDoc.** The attack looking for a partial rename or the retained universal wrapper claim failed. The list-group and skip-link cases use `outlineFrames` and write under `tmp/capture/outline/${state}` at [integration.test.ts:1630](/home/user/veneer-ff/tests/app/browser/integration.test.ts:1630) and [integration.test.ts:2685](/home/user/veneer-ff/tests/app/browser/integration.test.ts:2685). The corresponding files exist under the painted and suppressed directories.

   The [SHOWCASE_KEYS TSDoc:504](/home/user/veneer-ff/tests/setup.ts:504) describes what a padded-wrapper placement contains and assigns each scenario’s placement to its journey case. It no longer says every focus frame uses that placement.

4. **CONFIRMED — Scope and the stated code-law constraints.** The attack looking for changes outside the owned files failed. Live status matches [ff-3-status.txt:1](/home/user/scaffold/.orkestrel/veneer/units/ff-3-status.txt:1), and the retained diff matches the worktree diff against `e4a6d7c` byte for byte.

   Inspection with the installed TypeScript parser found no added `any`, prohibited assertion, non-null assertion, or prohibited nested function. A synthetic control containing those constructs was detected. Inspection of added lines found no suppression or mock. The `as const` expressions and anonymous callbacks passed directly as arguments satisfy the stated exceptions.

   The report states these counts:

   - [Report:3](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-3.md:3): “five round-3 items.”
   - [Report:7](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-3.md:7): “both offset rows”; [report:10](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-3.md:10): “two mutations.”
   - [Report:8](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-3.md:8) and [report:9](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-3.md:9): each mutation has 1 failure out of 305.
   - [Report:10](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-3.md:10), [report:12](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-3.md:12), and [report:26](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-3.md:26): 305 passing tests.
   - [Report:13](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-3.md:13): 1 failing test and 46 skipped.
   - [Report:27](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-3.md:27): 2 passed, 45 skipped, 47 total.
   - [Report:35](/home/user/scaffold/.orkestrel/veneer/units/b-focus-frame-report-3.md:35): 1277 insertions, 323 deletions, and three owned files. Live `git diff --numstat` agrees.

**Findings outside the claims:** none.

**Attacked and held:** Negative outline-only fixtures correctly return zero because their shadow contribution is zero. That correct adjacent behavior masks the missing combined-negative fixture. The list-group’s suppressed frame correctly retains its focus fill while losing its exterior outline.

VERDICT: FAIL 1; outside the claims: none