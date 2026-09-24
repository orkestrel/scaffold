1. **CONFIRMED — Scope and gates.** The omitted-change and stale-artifact attacks failed. The live diff equals `t5-5.diff`; the status names only `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, and `tests/src/browser/helpers.test.ts`.

   Log references below resolve under `/home/user/scaffold/.orkestrel/veneer/units/t5-instruments-5/`. I read the command-written `exit 0` endings in `t5-5-gate-format.log.txt:5`, `t5-5-gate-lint.log.txt:5`, `t5-5-gate-check.log.txt:21`, `t5-5-gate-file.log.txt:11`, and `t5-5-gate-browser.log.txt:49`. The runner records each status immediately after its command.

2. **CONFIRMED — The park implements P1.** The coordinate-system attack failed. [releasePointer](/home/user/test-tf/src/browser/helpers.ts:733) attempts the recorded button release before sending `mouseMoved` at `(-1, -1)`. The installed provider creates the DevTools session on the runner page; the protocol defines these coordinates relative to the main-frame viewport.

   The both-axes proof asserts the frame’s `100×100` dimensions, movement above and left of `(-1, -1)`, and zero document `mouseover` events at [helpers.test.ts:3524](/home/user/test-tf/tests/src/browser/helpers.test.ts:3524). `t5-5-green.log.txt:7` supplies its passing run. The retained park probe, `t5-instruments-4/t5-park-probe.log.txt:11`, also records no hover while the offset frame covers the outside point.

   The `nomove` mutation distinguishes failed hover clearing: `t5-5-mut-nomove.log.txt:8` records padding remaining `32` instead of returning to `16`, at [helpers.test.ts:876](/home/user/test-tf/tests/src/browser/helpers.test.ts:876). The hold-refusal and retry assertions remain in the passing final file; changing the park leaves their release machinery unchanged.

3. **CONFIRMED — The origin mutation is distinguished.** The assertion-equivalence attack failed. I read `t5-5-mut-origin.log.txt`: the scrolled corner, horizontal-offset corner, oversized corner, and both-axes proof each record `1` event where their assertions require `0`.

   Those assertions are at [helpers.test.ts:3416](/home/user/test-tf/tests/src/browser/helpers.test.ts:3416), [3441](/home/user/test-tf/tests/src/browser/helpers.test.ts:3441), [3469](/home/user/test-tf/tests/src/browser/helpers.test.ts:3469), and [3533](/home/user/test-tf/tests/src/browser/helpers.test.ts:3533). The both-axes proof observes the tester document; it does not claim that the captured element itself covers the origin. Its reading nevertheless distinguishes the park positions.

4. **CONFIRMED — The removed mechanism is absent.** A fresh search over the final `src/browser/helpers.ts` found no `offsetParent`, `SVGSVGElement`, or `ownerSVGElement` reference, agreeing with `t5-5-criterion4.log.txt:1`.

   [computeOffset](/home/user/test-tf/src/browser/helpers.ts:3258) contains no nudge. [captureFrame](/home/user/test-tf/src/browser/helpers.ts:3517) contains no pointer read or pointer command. Its screenshot cleanup restores only the style attribute; its sole explicit scroll restoration follows `releasePane` at [helpers.ts:3596](/home/user/test-tf/src/browser/helpers.ts:3596). The retained-branch attack failed.

5. **BROKEN — The arithmetic can move a fitting box outside the window.** Read-only Node execution of the actual `computeOffset` body produced these counterexamples:

   | Input box `(x, y, width, height)` | Window | Returned move | Result |
   |---|---|---|---|
   | `(0, 0.5, 100, 513)` | `800×513` | `{ top: -1, left: 0 }` | Top becomes `-0.5`, outside the window. |
   | `(0.5, 0, 800, 100)` | `800×513` | `{ top: 0, left: -1 }` | Left becomes `-0.5`, outside the window. |
   | `(0, 0, 800, 512.5)` | `800×512.5` | `{ top: -0.5, left: 0 }` | An already-contained box moves outside. |

   The cause is unconditional edge rounding at [helpers.ts:3261](/home/user/test-tf/src/browser/helpers.ts:3261), without bounding the move by the opposite edge’s available space. The integer-window examples admit ordinary fractional element geometry. The fractional-window example additionally contradicts the exported helper’s stated no-move behavior.

   This falsifies the general window-fit claim, including the ruling’s prescribed arithmetic. It does not falsify purity or the nonpositive-result property. These are executed arithmetic counterexamples, not newly measured screenshot failures.

   The smallest correction is to leave an already-contained axis unchanged and cap an overflowing axis’s rounded move before its opposite edge crosses zero. An in-memory candidate returns `-0.5` for the full-height example and preserves the retained fractional-bottom expectation of `-332`. Add those boundary assertions without removing the existing fractional-bottom proof.

   The remaining mechanism holds: the height loop matches the round-4 source; the calling frame’s attribute is restored exactly; compositing remains; and nested `finally` blocks preserve the post-release scroll attempt when release rejects. The assertions distinguish `noceil`, `nooffset`, `nocomposite`, `widened`, and `noscrollback`, as detailed under claim 8.

6. **CONFIRMED — The specified P2 proofs discriminate.** The unnecessary-scroll attack is caught at [helpers.test.ts:3493](/home/user/test-tf/tests/src/browser/helpers.test.ts:3493). `t5-5-mut-scrolltop.log.txt:8` records `2` scroll events instead of `0`; the final green run passes the same assertion.

   The held-hover fixture stages before hovering and uses an origin-touching element one pixel tall. Its pixel assertion at [helpers.test.ts:3681](/home/user/test-tf/tests/src/browser/helpers.test.ts:3681) distinguishes the `nudge` mutation: `t5-5-mut-nudge.log.txt:8` records blue instead of the required red. Claim 5’s fitting-boundary defect does not affect this contained, integer-window fixture.

7. **CONFIRMED — Every named lifecycle exercise distinguishes the origin park.** The empty-observation attack failed. The exercises register document listeners across capture and the following frame wait, then assert zero events.

   I read `t5-5-mut-origin.log.txt`. It records `1` instead of `0` for origin-touching, window-filling, shadow-host SVG, and containing-block SVG exercises; the clamped-scroll exercise records `2`. Their assertions are at [helpers.test.ts:3552](/home/user/test-tf/tests/src/browser/helpers.test.ts:3552), [3578](/home/user/test-tf/tests/src/browser/helpers.test.ts:3578), [3604](/home/user/test-tf/tests/src/browser/helpers.test.ts:3604), [3632](/home/user/test-tf/tests/src/browser/helpers.test.ts:3632), and [3659](/home/user/test-tf/tests/src/browser/helpers.test.ts:3659). `t5-5-green.log.txt:7` supplies the passing run.

8. **CONFIRMED — The retained mutations apply and produce the reported failures.** Every replacement matches uniquely against the final source in memory. The retained final helper copy equals the live source, and the `nudge` replacement equals the round-4 function. An absent-site control fails the uniqueness check.

   The live test SHA-256 is `edaef7e7cd38fdbc8518381ba87f15301d8b666875545274d17b240bc18db242`, matching `t5-5-digest.log.txt:2`. That log records `OK` afterward. `t5-5-run.sh:21` runs the whole final test file; the summary records restoration after each mutation.

   I read each following log. Every named assertion distinguishes its mutation.

   | Mutation | Log | Distinguishing failure |
   |---|---|---|
   | `origin` | `t5-5-mut-origin.log.txt:8` | Corner and lifecycle event assertions receive nonzero readings. |
   | `nomove` | `t5-5-mut-nomove.log.txt:8` | Hover padding remains `32`, expected `16`. |
   | `nudge` | `t5-5-mut-nudge.log.txt:8` | Held-hover floor becomes blue; leaf assertions also fail. |
   | `noceil` | `t5-5-mut-noceil.log.txt:8` | Offset becomes `-331.5`, expected `-332`. |
   | `scrolltop` | `t5-5-mut-scrolltop.log.txt:8` | Scroll events become nonzero. |
   | `nooffset` | `t5-5-mut-nooffset.log.txt:8` | Incorrect floor colors and missing frame-movement controls. |
   | `nocomposite` | `t5-5-mut-nocomposite.log.txt:8` | Green document floor replaces the blue fixed-panel floor. |
   | `widened` | `t5-5-mut-widened.log.txt:8` | The other frame moves; overwriting the calling frame’s horizontal offset also breaks the both-axes control. |
   | `noscrollback` | `t5-5-mut-noscrollback.log.txt:8` | Restored scroll readings differ from `200`, `100`, and `600`. |

9. **CONFIRMED — The retained consumer runs use the round-5 artifact and pass.** The stale-build attack failed: the consumer’s browser bundle equals the built Test bundle byte-for-byte and contains the outside park.

   `t5-veneer-probe-5.sh:12` builds before packing, and `:16` selects Veneer `1ee0faf`. `t5-veneer-probe-5.log.txt:1` records successful build and guide results; `t5-veneer-journey-5.log.txt:249` and `t5-veneer-journey-5b.log.txt:249` record passing journeys.

   The committed consumer source registers the `entered` recorder around frame placement and asserts its emptiness. The origin mutation demonstrates the corresponding event distinction in Test’s final suite; the consumer run itself was not mutation-tested here.

   The installation method is tarball extraction into a copied dependency tree at `t5-veneer-probe-5.sh:18`. This establishes runtime compatibility with that artifact, not fresh package-manager installation or dependency resolution.

10. **CONFIRMED — P5 wording and Surface parity hold.** The stale-summary attack failed. Normalized comparisons found the changed `releasePointer`, `computeOffset`, and `FrameOffset` Surface summaries equal to their source description paragraphs; altered-description controls compare unequal.

    The boundary text appears at [helpers.ts:711](/home/user/test-tf/src/browser/helpers.ts:711), [3240](/home/user/test-tf/src/browser/helpers.ts:3240), and [3500](/home/user/test-tf/src/browser/helpers.ts:3500). The capture documentation states P2 without naming the park coordinate or `releasePointer`. This confirms the requested wording and parity; it does not cure claim 5’s behavioral counterexample.

    The report states these counts:

    | Reported item | Count |
    |---|---|
    | After the park-only step | `370 passed`; this intermediate reading is report-only in the supplied round-5 logs. |
    | Final green and helpers gate | `372 passed`, `2 expected fail`, `374 total`. |
    | Browser gate | `426 passed`, `2 expected fail`, `428 total`. |
    | `origin`, `nomove` | Each `9 failed`, `363 passed`. |
    | `nudge` | `4 failed`, `368 passed`, including `3` leaf cases. |
    | `noceil`, `scrolltop`, `nocomposite` | Each `1 failed`, `371 passed`. |
    | `nooffset` | `5 failed`, `367 passed`. |
    | `widened` | `2 failed`, `370 passed`. |
    | `noscrollback` | `3 failed`, `369 passed`. |
    | Expected failures in every mutation run | `2`. |
    | Diff | `4 files`, `847 insertions`, `44 deletions`. |
    | Forbidden-reference search | `0` matches. |
    | Passing park-event and inside-window scroll assertions | `0` events. |
    | Explicit capture scroll restoration | `1`. |
    | Reported post-mutation edit | `1` guide sentence; the test digest remains unchanged. |

Findings outside the claims: none.

Attacked and held: a fixed element may receive a document scroll that does not move it; P3 explicitly permits that scroll and requires restoration. An oversized element’s zero offset is also intentional. Neither behavior is the fractional fitting-box defect under claim 5.

VERDICT: FAIL 5; outside the claims: none