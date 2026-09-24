<!-- Retained from Workflow run wf_d0a9503a-5af, agent a4a2557fb2f33d705 (reviewer on Opus 5.5). -->

**Lane: subjective, held by `reviewer` on Opus 5.5.** I ran nothing. Every ruling comes from reading the diff, the source in `/home/user/test-tf`, and the retained logs. A ruling marked "derived" is a source trace that was not executed.

1. **Scope and gates: CONFIRMED.**
   - `t5-3-status.txt:1-3` marks exactly `guides/test.md`, `src/browser/helpers.ts`, and `tests/src/browser/helpers.test.ts` as modified. `t5-3.diff` touches no other path.
   - Each gate log ends with the line the script appended after the run (`t5-3-gates.sh:6,8,10,13,15`). The values are: format `exit 0` (`t5-3-gate-format.log.txt:5`), lint `exit 0` (`t5-3-gate-lint.log.txt:5`), check `exit 0` (`t5-3-gate-check.log.txt:21`), file `exit 0` (`t5-3-gate-file.log.txt:11`), and browser `exit 0` (`t5-3-gate-browser.log.txt:49`).
   - The attack for an omitted change failed.

2. **The park point (P5): BROKEN. The scroll rule does not cover every element the API accepts. The nudge is the right mechanism, and the residual case is acceptable.**
   - **Nudge: right mechanism.** The nudge is computed in the same task as the scroll and the offset, before any frame renders (`helpers.ts:3517-3544`). The parked pointer therefore never sees an in-between position. It uses the existing offset channel, the frame's own `style` attribute, so the existing restore covers it (`:3545-3560`). It moves the frame the minimum distance and never touches the pointer. Moving down first, then right, is a sound choice.
   - **Residual case: acceptable and accurate.** After the nudge the new bottom is `height + 1` and the new right edge is `width + 1`, whatever `top` was. So the nudge fails only when `height > H − 1` and `width > W − 1`, which is exactly "fills both its height and its width". The case needs an element that matches the runner window in both axes. It is rare, and the TSDoc (`:3463-3464`) and the guide (`guides/test.md:676-677`) both name it.
   - **Failing input (derived).**
     - The fixture from the fixed-element proof (`helpers.test.ts:3443-3446`), with an `<svg width="100" height="50">` inside the `.low` box.
     - The call `captureFrame({ width: 390, height: 844, element: svg })`.
   - **What happens.** `SVGSVGElement` is not an `HTMLElement`, so the walk loop never runs (`helpers.ts:3513`). `anchor` stays the `svg` element, and its computed `position` is `static`, so `scrolls` is `true` (`:3516`). The box bottom is 850, past the 844-row pane, so `down` is 6 and `window.scrollBy` runs (`:3520-3521`). That is the needless scroll under a resting pointer that round 2 ruled out.
   - **Why this is in scope.** `FrameOptions.element` is typed `Element` (`src/browser/types.ts:40`), so the public API admits this input.
   - **Right looks like.** When the element is not an `HTMLElement`, take its outermost `svg` root:
     - If that root's computed `position` is `fixed`, the scroll does not move the element.
     - Otherwise, start the `offsetParent` walk from the root's nearest `HTMLElement` ancestor.
     - Add the `svg` case to the fixed-element proof.
   - **Mutation named for the new proofs.** `nonudge` reddens both parked-pointer proofs (1 `mouseover` each, `t5-3-mut-nonudge.log.txt:10,29`). `scrollfixed` reddens the fixed-element proof (`t5-3-mut-scrollfixed.log.txt:9`). Each assertion distinguishes its mutation.
   - **Claim wording.** "Ends on a fixed box exactly when the viewport is the element's containing block" is loose. A static child of a fixed box ends the walk on that box, and its containing block is the box, not the viewport. The code comment at `:3510-3511` ("that box's containing block") is the correct statement, and the behavior is right.

3. **Round-2 behavior holds: CONFIRMED.**
   - **T5-FIT.** The loop at `helpers.ts:3488-3505` reads the same as the round-2 copy (`t5-3-helpers-r2.ts.txt:3482-3499`). `edgereading` still reddens the fixed-panel, `50vh`, `30vh`, and tall-element proofs (summary lines 45-48). Each proof asserts a height or a refusal the mutation changes.
   - **T5-SCOPE.** The only change is the offset test, from `> 0` to `!== 0` (`:3546`). It admits the nudge's negative `rise` or `shift` on the same frame-only attribute path.
     - `widened` reddens the second-frame filter (summary line 13).
     - `norestyle`, run alone, reddens the attribute assertion (line 52).
   - **T5-BACK.** Scroll restoration is unchanged apart from the RA nesting. `noscrollback` reddens `scrollY` 200 and `scrollY` 100 (lines 8-9).
   - **`readFrame`.** It is line-for-line identical: `:3586-3657` against the round-2 copy at `:3558-3629`.

4. **The rejected release (RA): CONFIRMED.**
   - `helpers.ts:3577-3583` is `try { await releasePane() } finally { window.scrollTo(…) }`.
   - The report states that no proof covers the rejection (`t5-test-frame-report-3.md:54-55,177-178`).
   - **Mutation.** Flattening this back to sequential calls passes every proof (derived: no case makes `releasePane` reject). The claim concedes this.
   - **Observation.** The report calls a proof unreachable without naming a search for a real vector. See referral R4.

5. **Host-independent proofs (H6): CONFIRMED.**
   - **Below-pane and scope proofs.** With `declared = max(844, H+200)` (`helpers.test.ts:3207`, `:3342`), the element's bottom after the scroll is `declared`. That gives `rise ≥ 200` on any host.
   - **Fixed panel.** `10·ceil((H+100)/7)` gives whole rows, and it places the panel's top at least 70 rows past the window.
   - **Whole rows.** The below-pane proof expects 100 rows, and the panel proof expects `declared·3/10`, an integer.
   - **Bound left unstated.** The 390-wide fixtures fit only a runner window at least 390 columns wide, and the report states only the height bound. This is not a practical host, so it does not break the claim.

6. **The retained mutations (RB, RC, RD): UNRESOLVED.**
   - **What holds.**
     - Each JSON file applies through `t5-3-run.sh:9-23`, which asserts that each edit matches once.
     - Every run prints `restored` (summary log).
     - Every failure line number matches the final test file: 3168, 3201, 3228, 3250, 3274, 3298, 3324, 3365, 3389, 3414, 3440, 3463, 3479, 3502.
     - `emptystyle` reddens the no-attribute proof with `expected true to be false` (`t5-3-mut-emptystyle.log.txt:9,20`). That assertion distinguishes it.
     - Each other mutation fails an assertion on the property it breaks, as listed under claim 3.
   - **What is open.** "Digest checked … after" rests on the report alone (`report:98`). No log records the `sha256sum -c` output, and `t5-3-run.sh` performs no check.
   - **To settle.** Run `sha256sum /home/user/test-tf/tests/src/browser/helpers.test.ts` and compare the result with `f7c97f00…6b78` (`t5-3-test-final.sha256.txt:1`).

7. **The new proofs: CONFIRMED.**
   - Red: `t5-3-mut-red-r2.log.txt:9,28,47,68` shows the three proofs failing and `3 failed | 23 passed | 334 skipped`.
   - Green: `t5-3-green.log.txt:8` shows `26 passed | 334 skipped`.
   - **Mutation.** The round-2 source (`red-r2.json`) reddens all three: 1 `mouseover`, 1 `mouseover`, and 2 scroll events. The assertions distinguish it.

8. **Prose (W8): BROKEN. These changed sentences do not state what ships.**
   - **(a) The fixed-element sentence.** `helpers.ts:3450-3451` and `guides/test.md:664-665` say "nor for a fixed element, which that scroll cannot move".
     - A fixed element inside a transformed or `contain: paint` ancestor is moved by the scroll, and the walk scrolls it (`t5-3-probe-offsetparent.log.txt:6`; claim 2's own wording).
     - Right: "nor for an element the scroll cannot move: a fixed element whose containing block is the viewport, or anything inside one."
   - **(b) "is not offset" is false after the nudge.** `helpers.ts:3458-3459` and `guides/test.md:672` say "An element inside the window, or too large for it, is not offset."
     - Failing input (derived): the scrolled-corner fixture without its `scrollTo` (`helpers.test.ts:3394-3396`). The element sits inside the window at `(0, 0)`. `rise` becomes -1 and `top:1px !important` is written (`:3539-3552`).
     - A too-large element that is flush with the left edge and scrolled to row 0 is always offset, because the nudge's bounds are infinite (`:3540-3542`).
     - Right: "is not offset up or left".
     - Round 2's prescription of this wording was correct for round-2 code, but the P5 fix made it false. The two rulings were not reconciled against each other.
   - **(c) "One further row down" understates the move.** `helpers.ts:3462-3463` and `guides/test.md:675` say the frame moves one further row.
     - The code moves `1 − top` rows (`:3542`). For `.bar { position: fixed; top: -50px; left: 0; height: 100px }` the frame moves 51 rows.
     - The code comment ("to its first free row or column", `:3534`) and the report (`:29-30`) are accurate.
     - Right: "offset down to its first free row, or else right to its first free column".
   - **(d) "An element that needs neither changes nothing the pointer rests on" is false.** This is at `helpers.ts:3468` and `guides/test.md:679-680`.
     - The element in (b) needs neither a scroll nor an offset, and the nudge moves it off the pointer.
     - Staging already moves the tester to the origin under the parked pointer (`helpers.test.ts:3480-3482`; `stagePane` rule `helpers.ts:3175`).
     - Right: state that staging puts the tester at the runner page's origin under the parked pointer, and that the element frame then moves nothing further for an element off that point.
   - **What holds.** Every changed code token carries its noun: the `element` option, the `captureFrame`, `stagePane`, `releasePointer`, `releasePane`, and `readFrame` functions, the `style` attribute, the `mouseover` event, the `page.viewport` method, the `30vh` panel, and the `50vh` element. No token is possessivized. The changed prose states no count; "one row", 422, 844, 900, and 30% are values. The F3 comment is corrected (`helpers.test.ts:3325-3334`).
   - **Cosmetic, not ruled.** `guides/test.md:1510` runs to about 118 characters, where the lines around it wrap near 100. Items 18 and the parity paragraph wrap unevenly.
   - **Counts the report states:**
     - Red: 3 failed, 23 passed, 334 skipped. Green: 26 passed, 334 skipped.
     - Red readings: `expected 1 to be +0` twice, and `expected 2 to be +0`.
     - Mutations:

       | Mutation | Result |
       | --- | --- |
       | `noscrollback` | 2 failed, 24 passed |
       | `widened` | 1 failed, 25 passed |
       | `toorigin` | 4 failed, 22 passed |
       | `nonudge` | 2 failed, 24 passed |
       | `scrollfixed` | 1 failed, 25 passed |
       | `nooffset` | 5 failed, 21 passed |
       | `nocomposite` | 1 failed, 25 passed |
       | `edgereading` | 4 failed, 22 passed |
       | `norestyle` | 1 failed, 359 skipped |
       | `norestyle-all` | 4 failed, 22 passed |
       | `emptystyle` | 1 failed, 25 passed |

     - Helpers file gate: 358 passed, 2 expected fail (360).
     - `test:src:browser`: 412 passed, 2 expected fail (414), 44.88 s.
     - Diffstat: 3 files changed, 539 insertions, 34 deletions.
     - Fixture values: a window of about 81 rows; 70 rows past the window; 200 rows; 100 whole rows; `declared + 2000`.
     - Restyle reading: `top:-331px`.
     - Every figure I compared against a log matches. I did not check the diffstat or the 44.88 s.

**Findings outside the claims**

- **F4: the park-point arithmetic is an inline pure computation, and one of its branches has no proof.**
  - **Where.** `helpers.ts:3528-3544` computes `fits`, `rise`, `shift`, and the nudge from a box and the window size. This is a pure projection inside the ~100-line `captureFrame` function.
  - **Rule.** `AGENTS.md` § Design laws ("Functional core, imperative shell. Export pure leaves.") and `.claude/rules/architecture.md:176-185` ("Pure self-contained computation … → exported helper. Extract pure leaves aggressively.").
  - **Cost (derived).** The right-nudge branch (`:3543`) runs only for a fitting element at least `H − 1` rows tall. No fixture has one, so deleting the `else if` passes every proof. The residual case and the negative-top move in 8(c) are unproven for the same reason.
  - **Right looks like.** Declare the box-to-offset result in `src/browser/types.ts`, and export the arithmetic from `helpers.ts` as a `{verb}{Noun}` leaf. `captureFrame` stays its caller. Pin these cases deterministically: the down nudge, the right nudge, the residual, the too-large element, and a negative top. Add the guide row for the export.

**Attacked and held**

- **Walk on a fixed box inside a transformed ancestor** correctly scrolls. Walk on `body { position: fixed }` (scroll lock) correctly skips the scroll.
- **Fractional box edges.** `top` or `left` in (0, 1) does not cover the hit point `(0, 0)`, so skipping the nudge is correct.
- **Held pointer.** A pointer held on the element is moved by one row at most when the element covers the origin. It stays inside the element except on the element's bottom row.

**Referrals**

To the objective lane:
- **R1.** Execute the `svg` vector from claim 2 and count the scroll events.
- **R2.** Execute the mutation that deletes `helpers.ts:3543` against the final suite, and confirm it stays green.
- **R3.** The report says a too-large element is safe because "the provider then captures beyond the viewport" (`report:30-32`). That is unverified. No proof puts the parked pointer on an element too large for the window. Check whether the provider's element screenshot scrolls the tester and undoes the one-row nudge. Round 2 named this shape as exposed.
- **R4.** Look for a real vector that makes `releasePane` reject, for example a `CAPTURE_PANE` value that makes `page.viewport` reject. If one exists, RA needs no stand-in.

To the Orchestrator:
- **R5.** The probe instruments behind `t5-3-probe-offsetparent.log.txt` and `t5-3-probe-tentative.log.txt` are not retained. Both logs come from a `zzprobe` case at `helpers.test.ts:4916`, and their encoded readings cannot be read or re-run.
- **R6.** `t5-veneer-probe-3.sh` is retained with no log. Veneer prepends each lifted copy at the document start, and the nudge now offsets every copy at the origin, so the `journey:light-390` rerun carries weight.
- **R7.** The report names its brief `t5-brief-3.md` (`report:4`). No file has that name.
- **R8.** This is the third round on the element-move and pointer seam. `.claude/rules/quality.md` § Rounds and verdicts makes the next unit a ruling on the mechanism, for example whether the capture owns the pointer for the shot, rather than a fourth repair.

VERDICT: FAIL 2, 6, 8; outside the claims: F4
