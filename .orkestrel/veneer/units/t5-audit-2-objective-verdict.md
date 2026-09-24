1. **CONFIRMED — Scope and gates.** The worktree status matches `t5-2-status.txt:1`: only `guides/test.md`, `src/browser/helpers.ts`, and `tests/src/browser/helpers.test.ts` changed. The retained diff and the live diff have identical SHA-256 digests. The attack for an omitted change failed.

   I read the `t5-2-gate-format.log.txt`, `t5-2-gate-lint.log.txt`, `t5-2-gate-check.log.txt`, `t5-2-gate-file.log.txt`, and `t5-2-gate-browser.log.txt` logs under `t5-instruments-2/`. Their outputs support the reported gate results. The guide gate is explicitly recorded as not run at `t5-test-frame-report-2.md:150`; this claim does not establish guide acceptance.

2. **CONFIRMED — Declared geometry.** At [helpers.ts:3483](/home/user/test-tf/src/browser/helpers.ts:3483), the element reading uses its rounded height, floored at the declared height. Its document position cannot enlarge that reading. The attack that restored bottom-edge staging fails the height assertions or refuses captures that must succeed: see the `t5-2-mut-edgereading.log.txt` log and [helpers.test.ts:3194](/home/user/test-tf/tests/src/browser/helpers.test.ts:3194), [helpers.test.ts:3244](/home/user/test-tf/tests/src/browser/helpers.test.ts:3244), [helpers.test.ts:3260](/home/user/test-tf/tests/src/browser/helpers.test.ts:3260), and [helpers.test.ts:3293](/home/user/test-tf/tests/src/browser/helpers.test.ts:3293). Those proofs distinguish the mutation.

   Comparison with `80c419e:src/browser/helpers.ts:3455` found no changed page-frame reading, growth carry, or refusal boundary. Equality still wins before refusal at the bound. The page screenshot remains the base call at [helpers.ts:3502](/home/user/test-tf/src/browser/helpers.ts:3502). The `t5-2-green.log.txt` log supports the existing page proofs and the repaired element proofs.

3. **CONFIRMED — Hand-back.** The saved scroll precedes staging at [helpers.ts:3476](/home/user/test-tf/src/browser/helpers.ts:3476). Cleanup restores it after pane release at [helpers.ts:3552](/home/user/test-tf/src/browser/helpers.ts:3552).

   Removing restoration produces the distinguishing scroll failures in the `t5-2-mut-noscrollback.log.txt` log: the below-pane case returns at 500 instead of 200, and the element-refusal case returns at 0 instead of 100. The final green log records those cases passing.

   The attack that leaves the offset active during file verification fails on control flow: the inner cleanup at [helpers.ts:3532](/home/user/test-tf/src/browser/helpers.ts:3532) restores the attribute before path verification begins. Screenshot rejection also crosses that cleanup and the outer scroll cleanup. That rejection-path conclusion is source evidence; the retained restoration mutations directly exercise passing and staging-refusal paths.

4. **CONFIRMED — Offset scope.** The offset writes only through the calling frame reference at [helpers.ts:3513](/home/user/test-tf/src/browser/helpers.ts:3513). The cleanup restores the saved attribute string, including distinguishing an absent attribute from an empty one.

   The widened-offset attack is distinguished by the scope assertion at [helpers.test.ts:3357](/home/user/test-tf/tests/src/browser/helpers.test.ts:3357). The `t5-2-mut-widened.log.txt` log records the other frame at −331; the final green log records the proof passing. The missing-restoration mutation also fails the exact attribute assertion at [helpers.test.ts:3360](/home/user/test-tf/tests/src/browser/helpers.test.ts:3360).

   The alternate attribute value is justified. The installed provider uses the strict locator at `node_modules/@vitest/browser-playwright/dist/index.js:1135`, and `t5-2-red-r1.log.txt:111` records its refusal with matching frames. This confirms isolation of the added offset; the inherited staging stylesheet still applies its shared placement rule.

5. **BROKEN — The stated pointer limit is not exhaustive.** The arithmetic at [helpers.ts:3505](/home/user/test-tf/src/browser/helpers.ts:3505) and [helpers.ts:3518](/home/user/test-tf/src/browser/helpers.ts:3518) admits these counterexamples:

   - Runner window 800×513; declared pane 390×200; zero margins; a 300-pixel spacer followed by a 390×200 element. The helper scrolls by 300, placing the element at `(0, 0)` without any frame offset. The element is shorter than the runner window.
   - Runner window 1000×513; declared pane 2000×844; a fixed element at `left:1000px; top:0`, sized 1000×100. No document scroll is needed. The horizontal offset is 1000, placing this short element at `(0, 0)`.

   A read-only Node evaluation of the source’s arithmetic produced those positions. These are source-derived geometry counterexamples, not fresh browser measurements. The retained `t5-2-mut-toorigin.log.txt` log establishes the associated hover hazard: moving the element onto the origin produces a mouseover and loses held hover.

   The passing parked-pointer proof covers an element away from the origin; it does not exclude these cases. Replace the single-case limit with the actual containment boundary and pin the scroll and horizontal cases. If avoiding the park point remains mandatory, handle or refuse captures that cannot satisfy that constraint.

6. **BROKEN — The recorded runs hold, but proof independence and host independence do not.** The `t5-2-red-r1-final.log.txt` and `t5-2-green.log.txt` logs contain the claimed red and green results.

   The mutation evidence distinguishes behavior as follows:

   | Mutation and log read | Distinguishing result |
   |---|---|
   | `noscrollback`, `t5-2-mut-noscrollback.log.txt` | Yes: passing-path and refusal-path scroll assertions fail. |
   | `widened`, `t5-2-mut-widened.log.txt` | Yes: the other frame acquires a negative top. |
   | `toorigin`, `t5-2-mut-toorigin.log.txt` | Yes: the parked-pointer event assertion and held-hover floor assertion fail. |
   | `nooffset`, `t5-2-mut-nooffset.log.txt` | Yes on the recorded host: panel, below-pane, and half-height floors fail; the scope movement control fails. |
   | `nocomposite`, `t5-2-mut-nocomposite.log.txt` | Yes on the recorded host: the fixed panel reads green instead of blue. |
   | `edgereading`, `t5-2-mut-edgereading.log.txt` | Yes: panel and half-height dimensions disagree; the fractional-height and tall-element captures reject instead of succeeding. |
   | `norestyle`, `t5-2-mut-norestyle.log.txt` | The scope attribute assertion distinguishes it. The held-hover case does **not**: it times out during hover setup before its capture or floor assertion. Later failures inherit leaked state. |

   The report’s universal assertion-distinction sentence at `t5-test-frame-report-2.md:131` is therefore false. The held-hover timeout is recorded at `t5-2-mut-norestyle.log.txt:25`; its setup call is [helpers.test.ts:3391](/home/user/test-tf/tests/src/browser/helpers.test.ts:3391). Isolate the restoration mutation and credit the attribute assertion; do not count setup failures as independent capture proofs.

   Host independence also fails:

   - The below-pane and scope fixtures keep a declared height of 844 at [helpers.test.ts:3216](/home/user/test-tf/tests/src/browser/helpers.test.ts:3216) and [helpers.test.ts:3348](/home/user/test-tf/tests/src/browser/helpers.test.ts:3348). After scrolling, their element bottom is 844. With a runner height of 1000, the computed offset is zero. The scope assertion at [helpers.test.ts:3356](/home/user/test-tf/tests/src/browser/helpers.test.ts:3356) then fails on correct code, while widening an offset that never executes cannot distinguish scope.
   - With runner height 400, [helpers.test.ts:3175](/home/user/test-tf/tests/src/browser/helpers.test.ts:3175) chooses 844. The assertion expects 253.2 image rows at line 3194, although decoded image dimensions are integral.
   - With runner height 200, that panel is taller than the window, so the fit guard suppresses the offset entirely.

   Read-only evaluation reproduced these arithmetic results. Choose fixture dimensions that force the required movement **after scrolling**, satisfy the fit guard, and have valid pixel expectations. The earlier ruling that initial placement beyond the window establishes host independence does not survive the round-2 scrolling mechanism.

7. **CONFIRMED — Sized refusal unchanged.** The complete declaration and TSDoc at [helpers.ts:3585](/home/user/test-tf/src/browser/helpers.ts:3585) are byte-identical to the retained round-1 declaration. Their SHA-256 digest is `302e489f2f3ced22e32d90f9020108f233933eabae91766da7d7b4fb0f77f1b7`.

   The attack for an unnoticed dimension-read change failed. A control changing the width read from offset 16 to offset 20 made the comparison unequal. This establishes declaration identity, without reasserting unexecuted browser behavior.

8. **BROKEN — Prose overstates movement behavior and retains a token violation.** The changed TSDoc says an element inside the window, or too large for it, “moves nothing” at [helpers.ts:3459](/home/user/test-tf/src/browser/helpers.ts:3459). Document scrolling occurs before the window-fit guard. The short-pane counterexample in claim 5 contradicts the inside-window wording; a tall element outside the pane can also scroll despite exceeding the runner window. State separately when document scrolling occurs and when the frame receives no offset.

   The changed sentence at [test.md:1502](/home/user/test-tf/guides/test.md:1502) still says “so `captureFrame` stages” without the required noun. Write “the `captureFrame` function stages.” The offset terminology and removal of the possessivized token do hold.

   The report states these counts:

   - Final red: **9 failed, 13 passed, 334 skipped**.
   - Draft red: **9 failed, 13 passed**.
   - Final green: **22 passed, 334 skipped**.
   - Scroll-restoration and origin mutations: **2 failed, 20 passed** each.
   - Widened-offset and compositing mutations: **1 failed, 21 passed** each.
   - Missing-offset, edge-reading, and missing-restoration mutations: **4 failed, 18 passed** each.
   - Helpers gate: **354 passed, 2 expected fail (356)**.
   - Browser gate: **408 passed, 2 expected fail (410)**.
   - Diffstat: **3 files changed, 397 insertions, 31 deletions**.
   - The reported **“One limit remains”** is contradicted by claim 5’s counterexamples.

Findings outside the claims: none.

Attacked and held: the disclosed clipping boundary for fixed content extending beyond the declared pane does not require growing that pane merely to reach its position. Initial staging can also move an existing hover; the retained debug log establishes why the held-hover proof stages before positioning the pointer. These adjacent behaviors do not repair the pointer-limit or proof claims.

VERDICT: FAIL 5, 6, 8; outside the claims: none