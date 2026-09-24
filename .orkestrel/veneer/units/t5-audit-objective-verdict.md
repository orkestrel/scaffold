1. **UNRESOLVED — Scope and gates.** The current status matches `/home/user/scaffold/.orkestrel/veneer/units/t5-status.txt:1`; the current diff matches the retained diff byte-for-byte. No off-limits change appears.

   The logs read under `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/` were `g1.txt`, `g2.txt`, `g3.txt`, `g4.txt`, `g5.txt`, `g6.txt`, and `t5-build.log.txt`. They support the reported formatting, lint, typecheck, browser-test, missing-build refusal, and subsequent build results. I did not locate the post-build guide run supporting `/home/user/scaffold/.orkestrel/veneer/units/t5-audit-claims.md:9`. Supply that run’s output and exit status to settle the remaining assertion. The missing evidence does not establish that the run failed.

2. **CONFIRMED — Staging.** Source comparison against `80c419e:src/browser/helpers.ts:3455` did not expose a changed reading, growth carry, or refusal boundary. At [helpers.ts:3473](/home/user/test-tf/src/browser/helpers.ts:3473), the initial reading precedes the equality check; each subsequent reading follows its staging and updates growth before the next equality check. This preserves the base ordering, including settlement at the bound before refusal. The element branch uses the rounded document-coordinate bottom, floored at the declared height.

   The attack was an off-by-one refusal or an extra initial growth carry. Neither occurs. The content-edge mutation instead changes the element branch’s input: `mut-contentedge.txt` records 480 against the fixed-panel assertion of 254 at [helpers.test.ts:3193](/home/user/test-tf/tests/src/browser/helpers.test.ts:3193). That assertion distinguishes the mutation.

3. **BROKEN — The lift is not caller-scoped.** [helpers.ts:3499](/home/user/test-tf/src/browser/helpers.ts:3499) selects every matching iframe in the owner document. The installed runner creates the matching attribute at `node_modules/@vitest/browser/dist/client/__vitest_browser__/orchestrator-jtzFEKPy.js:267`. Its isolated-file loop retains earlier frames: preparation appends another frame at line 168, and the completed-file path at line 156 sends cleanup without removing that frame.

   Failing state: a runner document contains an earlier tester and the calling tester. An element capture in the caller applies its offsets and compositing hint to each matching frame. This is a source-derived counterexample; no browser reproduction ran in this lane.

   Scope the lift to the actual calling frame and restore any marker used to identify it. The adjacent cleanup claim holds: [helpers.ts:3523](/home/user/test-tf/src/browser/helpers.ts:3523) removes the stylesheet after success, screenshot rejection, and path or byte refusal. A staging refusal precedes its creation. With no frame element, staging already refuses, so no lift is installed.

4. **BROKEN — Scroll position is not restored.** [helpers.ts:3469](/home/user/test-tf/src/browser/helpers.ts:3469) explicitly scrolls an element capture to `(0, 0)`. The function never saves the incoming position. Its cleanup removes the lift and releases the pane; [helpers.ts:3218](/home/user/test-tf/src/browser/helpers.ts:3218) restores viewport dimensions, not scroll coordinates.

   Failing state: the fixed-panel fixture starts at `scrollY = 400`, as asserted at [helpers.test.ts:3182](/home/user/test-tf/tests/src/browser/helpers.test.ts:3182), then captures the panel. Nothing restores that position on return or refusal. The proof checks the image but omits the post-call scroll assertion.

   Save the scroll coordinates before staging and restore them after pane release, including failure paths. Pane restoration and stylesheet removal are separate behaviors and do not repair this omission.

5. **CONFIRMED — Sized refusal.** The attack covered empty bytes, non-PNG bytes, truncated PNG prefixes, and unsigned dimensions above the signed integer range. A read-only Node probe executed the actual refusal callback extracted from [helpers.ts:3563](/home/user/test-tf/src/browser/helpers.ts:3563). Truncated headers retained the bare message; complete dimension fields produced the expected unsigned values and preserved the decode cause. Removing the length guard made the truncated-header control throw `RangeError`.

   The installed file command at `node_modules/@vitest/browser/dist/index.js:1910` returns filesystem-generated base64 for this call, so arbitrary file contents do not supply malformed base64 to the prefix decode. The length guard protects each dimension read; omitted endianness arguments give big-endian reads.

   `red-final.txt` records the PNG assertion failing without the size suffix. `mut-nosize.txt` records the disabled size branch failing the exact-message assertion; `mut-baresized.txt` records an unwanted suffix failing the non-image assertion at [helpers.test.ts:3283](/home/user/test-tf/tests/src/browser/helpers.test.ts:3283). These assertions distinguish the mutations. The mutation logs use an earlier suffix wording; the final red log and final scoped green log cover the shipped wording.

6. **CONFIRMED — Proofs, within the recorded runs.** `red.txt` records the pre-fix failures; `red-final.txt` records the final assertions failing against the base implementation. `green.txt:8` records the scoped green run, and `g4.txt:8` records the completed file passing after the final wording change.

   The mutation logs distinguish the passing case as follows:

   | Mutation | Log read | Distinguishing assertion |
   | --- | --- | --- |
   | Remove the initial scroll | `mut-noscroll.txt` | Panel height is 587 instead of 254; `helpers.test.ts:3193`. |
   | Remove the compositing hint | `mut-nowillchange.txt` | Panel floor is green instead of blue; `helpers.test.ts:3196`. |
   | Remove the lift | `mut-nolift.txt` | Panel and below-pane floors are white instead of blue and green; `helpers.test.ts:3196` and `helpers.test.ts:3218`. |
   | Replace the element edge with document content | `mut-contentedge.txt` | Panel height is 480 instead of 254; `helpers.test.ts:3193`. |
   | Disable the size branch | `mut-nosize.txt` | Exact PNG refusal message lacks its dimensions; `helpers.test.ts:3296`. |
   | Append dimensions to the bare refusal | `mut-baresized.txt` | Exact non-image refusal message rejects the suffix; `helpers.test.ts:3283`. |

   The host-height attack also fails: [helpers.test.ts:3203](/home/user/test-tf/tests/src/browser/helpers.test.ts:3203) places the preceding block beyond the maximum of the declared pane and the measured runner-window height. This confirms the fixture’s placement rule; it does not establish unrecorded browser runs on other hosts.

7. **BROKEN as worded — Compositing outlives the screenshot operation.** The page branch itself remains the base call at [helpers.ts:3506](/home/user/test-tf/src/browser/helpers.ts:3506), and it adds no scroll, lift, or compositing hint.

   The temporal assertion is false. Failing interleaving: the element screenshot resolves, then the file read at [helpers.ts:3519](/home/user/test-tf/src/browser/helpers.ts:3519) remains pending. The compositing stylesheet still applies until the outer cleanup at line 3524. It also applies during the frame waits before the screenshot.

   State that the hint lasts through the element capture’s preparation and verification, or remove it immediately after the screenshot settles if that narrower lifetime is required. The page branch’s unchanged behavior does not establish the claimed lifetime.

8. **BROKEN — Changed prose violates the token rule.** [test.md:666](/home/user/test-tf/guides/test.md:666) uses the function token without its noun. [test.md:1144](/home/user/test-tf/guides/test.md:1144) possessivizes the function token. [helpers.ts:3440](/home/user/test-tf/src/browser/helpers.ts:3440) uses the option token without its noun. These directly violate `/home/user/scaffold/.claude/rules/writing.md:41`.

   Rewrite these as “the … function” and “the … option.” The Surface-row assertion holds: the description sentences remain unchanged and match [test.md:368](/home/user/test-tf/guides/test.md:368).

   The report states these counts:

   - Baseline: 12 passed, 334 skipped.
   - Red: 3 failed, 12 passed, 334 skipped.
   - Green: 15 passed, 334 skipped.
   - Each mutation except lift removal: 1 failed, 14 passed.
   - Lift removal: 2 failed, 13 passed.
   - Scoped browser file: 347 passed, 2 expected failures, 349 total.
   - Browser project: 401 passed, 2 expected failures, 403 total.
   - Diff: 3 files changed, 168 insertions, 23 deletions.
   - Typecheck description: 3 source projects.
   - Added capture cases: 2.
   - Lift preparation: 2 frame waits.

Findings outside the claims: none.

Attacked and held: malformed and truncated file contents do not bypass the header guard; page-loop settlement retains the base refusal boundary; stylesheet cleanup covers the named exits. A staging refusal creates no lift, and the no-frame case refuses before lift installation.

VERDICT: FAIL 1, 3, 4, 7, 8; outside the claims: none