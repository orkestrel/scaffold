1. **CONFIRMED — Scope and gates.** The omitted-file attack failed: the live status matches `t5-3-status.txt:1`, naming only the guide, browser helper, and mirrored test file. The retained gate script records each command’s exit immediately after running it at `t5-instruments-3/t5-3-gates.sh:5`.

   I read the gate logs. Their terminal lines are `exit 0`: format at line 5, lint at line 5, check at line 21, file at line 11, and browser at line 49. These are the `t5-3-gate-{format,lint,check,file,browser}.log.txt` files under `t5-instruments-3/`. This confirms the stated gates; it does not establish the deferred build, guide, or round-3 consumer results.

2. **BROKEN — The park-point exception is incomplete, and the walk does not cover every permitted element.** At [helpers.ts:3542](/home/user/test-tf/src/browser/helpers.ts:3542), escaping the origin requires a whole CSS pixel of spare height or width.

   A concrete counterexample is a runner window of 1000×513, a declared pane of 2000×844, and a fixed element at `(1000, 0)` sized 999.5×512.5. The source computes a horizontal offset of 1000, then rejects either nudge. The resulting box starts at `(0, 0)` despite leaving spare height and width. It does not satisfy the documented full-window exception.

   A read-only Node execution of the source’s arithmetic returned `rise=0`, `shift=1000`, and `coversOrigin=true`. A 999×512 control moved down successfully; disabling the nudge made the short-element control cover the origin. This establishes the arithmetic defect, without claiming a fresh browser measurement. The `t5-3-mut-nonudge.log.txt` log independently establishes the hover hazard for the existing integer-sized fixtures.

   The ancestry test at [helpers.ts:3513](/home/user/test-tf/src/browser/helpers.ts:3513) also stops immediately on an SVG element. The public option admits any element at [types.ts:40](/home/user/test-tf/src/browser/types.ts:40). An ordinary SVG child inside a viewport-fixed panel can therefore produce `scrolls=true`: the code examines the SVG child’s static position without reaching its fixed ancestor. A panel at `top:800px` containing a 100-pixel SVG, over a scrollable document in an 844-pixel pane, reaches the unnecessary-scroll branch. This is a source-derived counterexample; the retained offset-parent probe does not exercise it.

   I read `t5-3-probe-offsetparent.log.txt` and `t5-3-probe-tentative.log.txt`. Their recorded cases do not establish the universal ancestry claim. Use the available fractional clearance for the nudge, and make the ancestry check cover non-HTML elements while preserving transformed and paint-contained behavior.

3. **CONFIRMED — The specified round-2 behavior remains.** The regression attack through comparison with `t5-instruments-3/t5-3-helpers-r2.ts.txt` found only the stated park-point, scroll-classification, rejected-release, and accompanying prose changes.

   The height reading and growth loop at [helpers.ts:3488](/home/user/test-tf/src/browser/helpers.ts:3488), calling-frame attribute scope at [helpers.ts:3526](/home/user/test-tf/src/browser/helpers.ts:3526), and attribute cleanup at [helpers.ts:3557](/home/user/test-tf/src/browser/helpers.ts:3557) remain intact. The declaration beginning at [helpers.ts:3613](/home/user/test-tf/src/browser/helpers.ts:3613) is identical to the round-2 copy; an altered decoding-call control made that comparison unequal.

   The `edgereading`, `widened`, `noscrollback`, and isolated `norestyle` mutations distinguish the corresponding geometry, scope, scroll, and attribute properties. I read their `t5-3-mut-*.log.txt` logs and the passing `t5-3-green.log.txt` log. The earlier consumer log, `t5-instruments-2/t5-veneer-probe-2.log.txt`, establishes round-2 consumer success only.

4. **CONFIRMED — The rejected release cannot skip the restoration call.** The attack against a rejection from the awaited release fails on the nested cleanup at [helpers.ts:3577](/home/user/test-tf/src/browser/helpers.ts:3577): execution enters the inner `finally` and calls the scroll restoration.

   This is a control-flow ruling. No retained test or mutation drives release rejection, as `t5-test-frame-report-3.md:54` explicitly states. The `noscrollback` mutation proves ordinary success and staging-refusal restoration; its assertions do not distinguish the rejected-release path.

5. **BROKEN — Vertical independence holds over the requested range, but window-size independence does not.** The fixtures retain a declared width of 390 at [helpers.test.ts:3188](/home/user/test-tf/tests/src/browser/helpers.test.ts:3188), [helpers.test.ts:3217](/home/user/test-tf/tests/src/browser/helpers.test.ts:3217), and [helpers.test.ts:3349](/home/user/test-tf/tests/src/browser/helpers.test.ts:3349). The fit test at [helpers.ts:3529](/home/user/test-tf/src/browser/helpers.ts:3529) checks width as well as height.

   With a runner window of 389×513, the below-pane and scope elements are 390×100, and the fixed panel is 390×264. Every element fails the width condition, so the source computes zero offset. The scope proof then fails its movement control on correct code, while removing the offset cannot distinguish the missing movement.

   Read-only execution of the source’s arithmetic reproduced this boundary: at width 389, the offsets were zero; at width 390, the below-pane and panel offsets were 331 and 367 respectively.

   The arithmetic sweep over integer window heights from 200 through 1200 found no vertical-fit or integral-height failure when sufficient width was available. The retained `nooffset` and `nocomposite` logs distinguish their intended properties on the recorded host. Derive the fixtures’ width from the runner window as well as deriving their height.

6. **CONFIRMED — The retained mutations apply and the credited assertions distinguish them.** The stale-target attack failed: every replacement site matches uniquely in the final source, which matches the retained final source copy. The retained pre-run test digest matches an independent post-run `sha256sum -c` check, which returned `OK`. The digest is `f7c97f006617f1b1e68f93660239f862effc12ca7a69d06b01db3f521d8a6b78`.

   The mutation runner changes the helper file and restores it at `t5-instruments-3/t5-3-run.sh:27`; it does not edit the test file. I read every following log under `t5-instruments-3/`. The mutation files have the corresponding names under its `t5-3-mutations/` directory.

   | Mutation | Log read | Distinction |
   |---|---|---|
   | `red-r2.json` | `t5-3-mut-red-r2.log.txt` | Yes: the parked-pointer assertions and fixed-element scroll assertion fail. |
   | `noscrollback.json` | `t5-3-mut-noscrollback.log.txt` | Yes: scroll positions are 500 instead of 200, and 0 instead of 100. |
   | `widened.json` | `t5-3-mut-widened.log.txt` | Yes: the other frame acquires a negative top. |
   | `toorigin.json` | `t5-3-mut-toorigin.log.txt` | Yes: pointer-entry assertions fail, and held-hover paint becomes blue instead of red. |
   | `nonudge.json` | `t5-3-mut-nonudge.log.txt` | Yes: each corner proof records a mouseover. |
   | `scrollfixed.json` | `t5-3-mut-scrollfixed.log.txt` | Yes: the fixed-element proof records scroll events. |
   | `nooffset.json` | `t5-3-mut-nooffset.log.txt` | Yes: floor assertions, the scope movement control, and the scrolled-corner event assertion fail. |
   | `nocomposite.json` | `t5-3-mut-nocomposite.log.txt` | Yes: the panel’s floor is green instead of blue. |
   | `edgereading.json` | `t5-3-mut-edgereading.log.txt` | Yes: dimensions disagree, or captures reject where success is required. |
   | `norestyle.json` | `t5-3-mut-norestyle.log.txt` | Yes: the isolated exact-attribute assertion retains the offset text. |
   | `norestyle-all.json` | `t5-3-mut-norestyle-all.log.txt` | The attribute assertions distinguish missing restoration. The held-hover setup timeout and later page failure are contaminated results, not independent proofs. |
   | `emptystyle.json` | `t5-3-mut-emptystyle.log.txt` | Yes: the absence assertion receives `true` instead of `false`. |

   The no-attribute branch is proved at [helpers.test.ts:3383](/home/user/test-tf/tests/src/browser/helpers.test.ts:3383). The report’s blanket attribution of later failures to leaked state needs qualification: this test removes the incoming attribute at line 3375, so its missing-restoration failure also arises from its own capture.

7. **CONFIRMED — The named proofs have distinguishing red and green evidence.** The wrong-test and unrelated-failure attacks failed. The `t5-3-mut-red-r2.log.txt:68` record names the final test locations and reports the claimed red result. Its failures occur at the mouseover assertions at [helpers.test.ts:3410](/home/user/test-tf/tests/src/browser/helpers.test.ts:3410) and [helpers.test.ts:3435](/home/user/test-tf/tests/src/browser/helpers.test.ts:3435), and the scroll-event assertion at [helpers.test.ts:3460](/home/user/test-tf/tests/src/browser/helpers.test.ts:3460).

   The replacement mutation uses the retained round-2 source. The independent `nonudge` and `scrollfixed` mutations reproduce the respective failures. The `t5-3-green.log.txt:8` record reports the claimed passing result. These assertions distinguish the tested integer-sized cases; they do not cover claim 2’s fractional or SVG counterexamples.

8. **BROKEN — Changed prose still contradicts the implementation.** The statement that an element inside the window “is not offset” at [helpers.ts:3459](/home/user/test-tf/src/browser/helpers.ts:3459) and [test.md:672](/home/user/test-tf/guides/test.md:672) is false for a short element starting at the origin. The source-arithmetic control moved that already-visible element down by one pixel.

   The categorical fixed-element statement at [test.md:665](/home/user/test-tf/guides/test.md:665) also contradicts the intended treatment of fixed elements inside transformed or paint-contained ancestors. The residual-case wording at [test.md:676](/home/user/test-tf/guides/test.md:676) omits claim 2’s fractional-clearance case.

   Qualify the no-offset sentence with the park-point exception, distinguish viewport-fixed elements from fixed elements whose containing block moves, and align the residual wording with the repaired arithmetic. The code-token nouns, removal of possessivized tokens, and absence of growing-set counts in the changed prose withstand inspection.

   The report states these counts, checked against its named logs and the live diff:

   - P5 proofs: **3**; described mechanism changes: **3**.
   - Round-2 replacement: **3 failed, 23 passed, 334 skipped**.
   - Final scoped green: **26 passed, 334 skipped**.
   - Scroll-restoration mutation: **2 failed, 24 passed**.
   - Widened-scope mutation: **1 failed, 25 passed**.
   - Origin mutation: **4 failed, 22 passed**.
   - Nudge mutation: **2 failed, 24 passed**.
   - Fixed-scroll mutation: **1 failed, 25 passed**.
   - Offset mutation: **5 failed, 21 passed**.
   - Compositing mutation: **1 failed, 25 passed**.
   - Edge-reading mutation: **4 failed, 22 passed**.
   - Isolated restoration mutation: **1 failed, 359 skipped**.
   - Group restoration mutation: **4 failed, 22 passed**.
   - Empty-attribute mutation: **1 failed, 25 passed**.
   - Helpers gate: **358 passed, 2 expected fail (360)**.
   - Browser gate: **412 passed, 2 expected fail (414)**.
   - Diff: **3 files changed, 539 insertions, 34 deletions**.

Findings outside the claims: none.

Attacked and held: the documented exact-window-fill residual is legitimate. The installed provider bases capture beyond the viewport on element dimensions at `node_modules/playwright-core/lib/coreBundle.js:21764` and `:37436`. The inherited staging stylesheet affects matching tester frames, while the added offset remains scoped to the calling frame. Neither adjacent behavior repairs the counterexamples above.

VERDICT: FAIL 2, 5, 8; outside the claims: none