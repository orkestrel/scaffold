1. **CONFIRMED — Scope and gates.** The omitted-change and stale-diff attacks failed. The live diff equals `t5-6.diff`; an altered-copy control compares unequal. The live status matches `t5-6-status.txt:1`: only `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, and `tests/src/browser/helpers.test.ts` changed. The types hunk equals its round-5 hunk.

   Evidence paths resolve under `/home/user/scaffold/.orkestrel/veneer/units/`. I read the command-written endings in `t5-instruments-6/t5-6-gate-format.log.txt:5`, `t5-6-gate-lint.log.txt:5`, `t5-6-gate-check.log.txt:21`, `t5-6-gate-file.log.txt:11`, and `t5-6-gate-browser.log.txt:49`: each records `exit 0`. The immediate status capture in `t5-instruments-6/t5-6-gates.sh:5` supports those readings.

2. **BROKEN — The unrestricted containment claim exceeds the function’s contract.** Read-only `node -e` execution of the final [computeOffset body](/home/user/test-tf/src/browser/helpers.ts:3261), with only its TypeScript annotations removed, produced:

   | Box `(x, y, width, height)` | Window | Move | Final offending edge |
   |---|---|---|---|
   | `(0, -50, 390, 100)` | `800×513` | `{ top: 0, left: 0 }` | Top remains `-50`. |
   | `(-0.5, 0, 100, 100)` | `800×513` | `{ top: 0, left: 0 }` | Left remains `-0.5`. |

   These boxes fit by size. Their far edges lie inside the window, yet the boxes remain partly outside. The negative-top behavior is intentional and already asserted at [helpers.test.ts:3719](/home/user/test-tf/tests/src/browser/helpers.test.ts:3719). Thus “no input with a fitting box … leaves the box outside the window” is false.

   The bounded repair itself held. My sweep executed the final function over **876096** combinations of positive whole and dyadic-fraction window and box sizes, with nonnegative starting coordinates and frozen inputs. It found **0** containment, positive-move, or unnecessary-move failures. The round-5 arithmetic failed containment on **242480** combinations under the same instrument. This sweep does not establish the unrestricted input claim.

   The specified boundary cases return `-0.5`, `-0.5`, and zero with their stated final edges; the fractional-bottom case retains `-332`. The assertions distinguish `unbounded`, as recorded in `t5-instruments-6/t5-6-mut-unbounded.log.txt:8`, `:30`, and `:52`.

   **Smallest correction:** constrain the containment claim to fitting boxes with nonnegative starting edges. Preserve the documented zero move for an axis already ending inside the window; changing that behavior would contradict the retained negative-top proof.

3. **CONFIRMED — The proofs bind to their mutations.** The stale-site and inert-assertion attacks failed. Every retained edit matches uniquely against the final source; an absent-site control fails that check. The `unbounded` replacement equals the saved round-5 function. The unchanged mutation files equal their round-5 counterparts.

   I read each following log under `t5-instruments-6/`. Each named assertion distinguishes its mutation from the passing case.

   | Mutation | Distinguishing assertion and observed failure | Log |
   |---|---|---|
   | `unbounded` | Boundary moves at test lines 3753, 3760, and 3768 become `-1`, `-1`, and `-0.5`, instead of `-0.5`, `-0.5`, and zero. | `t5-6-mut-unbounded.log.txt:8` |
   | `noceil` | The fractional-bottom and both-edges assertions receive top `-331.5`, expected `-332`. This mutation removes vertical rounding only. | `t5-6-mut-noceil.log.txt:8`, `:30` |
   | `nudge` | The resting-hover floor at test line 3681 becomes blue, expected red; the named leaf assertions also fail. | `t5-6-mut-nudge.log.txt:8` |
   | `origin` | Corner, both-axes, and lifecycle assertions receive nonzero `mouseover` readings instead of zero. | `t5-6-mut-origin.log.txt:8` |
   | `nomove` | Hover padding remains `32`, expected `16`, at test line 876; park-event assertions also fail. | `t5-6-mut-nomove.log.txt:8` |
   | `scrolltop` | The inside-window assertion at test line 3493 receives scroll events instead of zero. | `t5-6-mut-scrolltop.log.txt:8` |
   | `nooffset` | Panel and element floors become white; calling-frame and both-axes movement controls fail. | `t5-6-mut-nooffset.log.txt:8` |
   | `nocomposite` | The fixed-panel floor becomes green, expected blue, at test line 3200. | `t5-6-mut-nocomposite.log.txt:8` |
   | `widened` | The other frame acquires a negative top at test line 3364. The mutation also overwrites the calling frame’s horizontal offset, breaking the both-axes control. | `t5-6-mut-widened.log.txt:8` |
   | `noscrollback` | Scroll restoration assertions receive `500`, `0`, and `0`, expected `200`, `100`, and `600`. | `t5-6-mut-noscrollback.log.txt:8` |

   The final summary records failed runs followed by restoration. `t5-instruments-6/t5-6-digest.log.txt:2` records `bdad0a88cac820278f0ea6e9811877b0c47b4192b427d861d2978e031a82740b`; its subsequent check reports `OK` and `check exit 0`. My digest of the live test file matches. The final helper snapshot also equals the live source.

4. **CONFIRMED — The corrected park mechanism agrees with the evidence.** The coordinate-system and content-covering attacks failed. The installed provider opens its DevTools session on the runner page at `node_modules/@vitest/browser-playwright/dist/index.js:1177`. [releasePointer](/home/user/test-tf/src/browser/helpers.ts:755) sends `mouseMoved` at `(-1, -1)` through that session.

   The both-axes exercise proves that the frame moves above and left of the park point, then requires zero document `mouseover` events at [helpers.test.ts:3532](/home/user/test-tf/tests/src/browser/helpers.test.ts:3532). The `origin` mutation fails its event assertion, while the final file gate passes. The lifecycle exercises likewise distinguish the origin park in `t5-instruments-6/t5-6-mut-origin.log.txt:84`.

   The retained cover probe supplies hover evidence: `t5-instruments-4/t5-park-probe.log.txt:11` records `hover=false` with the offset frame covering `(-1, -1)`; its origin control records `hover=true`. This supports the viewport hit-testing explanation rather than the withdrawn geometric explanation.

   The park-2 counterexample does not survive its cache correction. `t5-instruments-park2/park2-prebundle.log.txt:1` identifies the origin-park pre-bundle in `veneer-rpctl3`; the following readings identify outside-park bundles in the corrected worktrees. The corrected RP runs pass at `rp-rerun-c1.log.txt:76` and `rp-rerun-c0.log.txt:76`. The round-6 consumer log independently records the outside-park pre-bundle at `t5-instruments-6/t5-veneer-probe-6.log.txt:11`.

5. **CONFIRMED — The rename describes a hover, and real holds remain intact.** The accidental-hold and overbroad-rename attacks failed. [The renamed proof](/home/user/test-tf/tests/src/browser/helpers.test.ts:3662) stages the pane, calls `hoverAccessible`, captures, and asserts the red hover floor. It presses no button. The `nudge` mutation distinguishes that floor, as described under claim 3.

   The actual `Held` cases still call `holdAccessible` and assert `:active` at [helpers.test.ts:1001](/home/user/test-tf/tests/src/browser/helpers.test.ts:1001). Their source equals the round-5 copy. The coverage paragraph at [guides/test.md:3722](/home/user/test-tf/guides/test.md:3722) names the staged hover, fractional-top and fractional-left bounds, and unchanged fractional-window case.

6. **CONFIRMED — The consumer runtime runs pass with the round-6 artifact.** The stale-build and stale-pre-bundle attacks failed. `t5-instruments-6/t5-veneer-probe-6.sh:15` builds before packing; `:19` selects Veneer `3203369`; `:21` replaces the dependency contents from the tarball and removes the Vite cache before the journeys.

   I read `t5-instruments-6/t5-6-guides.log.txt:15`, `t5-veneer-journey-6-light-390.log.txt:81`, and `t5-veneer-journey-6-dark-1280.log.txt:81`: each records exit zero. The consumer summary records the bounded-move marker and rebuilt outside-park pre-bundle at `t5-veneer-probe-6.log.txt:6` and `:11`.

   This establishes runtime compatibility with the extracted packed artifact. The script extracts into a copied dependency tree; it does not establish fresh package-manager installation or dependency resolution. The journeys run with `CAPTURE=1`.

7. **CONFIRMED — The remaining round-5 tree is preserved.** The unrelated-edit attack failed. Direct comparisons against `t5-6-helpers-r5.ts.txt`, `t5-6-test-r5.ts.txt`, and `t5-6-guide-r5.md.txt` show only the bounded arithmetic and its documentation/tests, the F1 sentences, and the F2 rename. The fractional both-edges fixture is the briefed R3 change.

   The capture implementation at [helpers.ts:3520](/home/user/test-tf/src/browser/helpers.ts:3520), restoration at [helpers.ts:3598](/home/user/test-tf/src/browser/helpers.ts:3598), and decode refusal at [helpers.ts:3633](/home/user/test-tf/src/browser/helpers.ts:3633) equal their round-5 copies. The retained behavioral mutations still distinguish their assertions, as detailed under claim 3.

   The report’s counts agree with these retained readings:

   | Reported item | Reading |
   |---|---|
   | New boundary cases | `3`; red run: `3 failed`, `8 passed`, `366 skipped` (`t5-6-red-r5.log.txt:77`). |
   | Leaf green run | `11 passed`, `366 skipped` (`t5-6-green-leaf.log.txt:7`). |
   | Final green and file gate | `375 passed`, `2 expected fail`, `377 total` (`t5-6-green.log.txt:8`; `t5-6-gate-file.log.txt:7`). |
   | Browser gate | `429 passed`, `2 expected fail`, `431 total`; `47.53 s` (`t5-6-gate-browser.log.txt:45`). |
   | Mutation series | `4`; the retained summaries agree except that `noceil` changes from `1 failed / 374 passed` to `2 failed / 373 passed` after the fractional both-edges edit. |
   | Final `origin`, `nomove` | Each `9 failed / 366 passed`. |
   | Final `nudge` | `7 failed / 368 passed`. |
   | Final `noceil`, `widened` | Each `2 failed / 373 passed`. |
   | Final `scrolltop`, `nocomposite` | Each `1 failed / 374 passed`. |
   | Final `nooffset` | `5 failed / 370 passed`. |
   | Final `noscrollback`, `unbounded` | Each `3 failed / 372 passed`. |
   | Expected failures per mutation run | `2`; recorded in `t5-6-mutations-summary.log.txt`. |
   | Diff | `4 files`, `879 insertions`, `44 deletions`; matches the live diffstat. |

Findings outside the claims: none.

Attacked and held: an oversized element intentionally receives zero offset; the installed Playwright screenshot path separately selects capture beyond the viewport at `node_modules/playwright-core/lib/coreBundle.js:21764` and `:37436`. A fixed element may receive a document scroll that does not move it; the retained contract requires that scroll to be restored. Neither behavior establishes the unrestricted containment promise broken under claim 2.

VERDICT: FAIL 2; outside the claims: none