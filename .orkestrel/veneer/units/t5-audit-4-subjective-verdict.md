<!-- Retained from Workflow run wf_32586156-1e5, agent a29d2398685367d98 (reviewer on Opus 5.5). -->

**Lane held: subjective**, by `reviewer` on Opus 5.5. I ran nothing. I built every ruling from the diff, the worktree source, and the retained logs. A ruling marked "derived" comes from tracing source by hand, not from a run.

1. **Scope and gates: CONFIRMED.**
   - `t5-4-status.txt:1-4` marks exactly `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, and `tests/src/browser/helpers.test.ts`. The diff touches no other path.
   - `t5-4-gates.sh:5-15` appends each exit status after its command runs. Each log ends on `exit 0`: format `t5-4-gate-format.log.txt:5`, lint `t5-4-gate-lint.log.txt:5`, check `t5-4-gate-check.log.txt:21`, file `t5-4-gate-file.log.txt:12`, and browser `t5-4-gate-browser.log.txt:50`.
   - `npm run test:guides` was not run, as the brief stated.

2. **The leaf (F4, P2): CONFIRMED.**
   - **Code.** `computeOffset` at `helpers.ts:3259-3272` is pure. It reads only the box and two numbers, and it returns a fresh `FrameOffset`. `captureFrame` calls it at `helpers.ts:3593-3596` and keeps no copy of the arithmetic.
   - **Residual (derived).** On the covering branch, `rows > -upper` holds exactly when `H > box.height`, and `columns > -start` holds exactly when `W > box.width`. A fitting element therefore stays on the origin only when it matches the window in both axes, which is the stated residual. A partial step moves the element's top to `upper + rows`, which is greater than 0, so fractional room clears the origin.
   - **Cases.** I recomputed all ten results against `helpers.test.ts:3621-3689`, and each holds.
   - **Mutations.**
     - `noright` gives `{0,0}` against `{0,1}` (`t5-4-mut-noright.log.txt:10`).
     - `wholenudge` gives `{0,0}` against `{0.5,0}` (`t5-4-mut-wholenudge.log.txt:10`).
     - Changing `>` to `>=` (derived) returns `{0,0}` for the right-nudge case, so that boundary is also covered.
     - All of these assertions separate the mutation from the passing case.
   - **Shape and placement.**
     - `compute*` is the deterministic prefix (`names.md:94`).
     - `FrameOffset` follows the `Frame{Noun}` data precedent of `FrameReading` and `FrameOptions` (`types.ts:32,58`).
     - The `top` and `left` members are one word each and readonly. They mirror the CSS declarations the capture writes (`helpers.ts:3603`).
     - The interface sits in `types.ts` and the leaf in `helpers.ts` (`architecture.md:18,21`). The barrel star-exports both (`src/browser/index.ts:25,27`), and the tests mirror the source at `helpers.test.ts:3621`.
     - One word, "offset", is used for moves in both directions across the TSDoc and the guide.

3. **SVG elements (S2): BROKEN.**
   - **What holds.**
     - The decision logic at `helpers.ts:3566-3580` matches the claim.
     - `htmlonly` reproduces the round-3 decision exactly (`t5-4-helpers-r3.ts.txt:3512-3516`) and reads `expected 2 to be +0` (`t5-4-mut-htmlonly.log.txt:10`).
     - `nofixedroot` reads the same failure (`t5-4-mut-nofixedroot.log.txt:10`).
     - Both assertions separate the mutation from the passing case.
   - **What breaks: "the only case".**
     - The decision reads only the root's own computed `position` (`helpers.ts:3571`). It never looks at an ancestor.
     - So every ancestor that gives fixed descendants their containing block goes undistinguished, not only a transformed one. That includes `filter`, `perspective`, `contain: paint`, `will-change: transform`, and `backdrop-filter`.
     - Failing input (derived): `<div style="filter: blur(0)"><svg style="position:fixed;top:800px" …>` in a 3000-row document, shot at 390x844. The document's scroll moves the root, but the decision takes no scroll.
   - **What breaks: "stated".**
     - The report says the assumption is stated in the code comment (`report:213-214`). The comment instead asserts it as fact: "its outermost svg root, which is fixed to the viewport where its own position is fixed" (`helpers.ts:3563-3564`).
     - The shipped positive sentence overclaims for this case: "Where the document's scroll moves the element and the element lies outside the pane, … is scrolled" (`helpers.ts:3494-3495`, `guides/test.md:665-666`).
     - The HTML path does separate these cases through `offsetParent`, so the two paths now disagree.
   - **Is the assumption acceptable?** Yes, as a stated bound. It is reachable only by a fixed svg root under such an ancestor that also lies outside the pane, and the scroll restore still runs. It is not acceptable while unstated.
   - **Required change.**
     - Rewrite the comment at `helpers.ts:3563-3565` to say that the root "is taken as fixed to the viewport where its own position is fixed; a fixed root inside an ancestor that holds fixed descendants, such as one with a transform, a filter, or paint containment, is not told apart, and the document is not scrolled for it."
     - Add one sentence with that limit after `helpers.ts:3497` and after `guides/test.md:668`.

4. **The ordering fix: BROKEN.**
   - **What holds.**
     - `helpers.ts:3609-3615` restores the scroll in the same task as the style restore.
     - The pre-fix run reads `expected [ true ] to strictly equal []` (`t5-4-red-return.log.txt:9`), and `latescroll` gives the same reading (`t5-4-mut-latescroll.log.txt:10`). That mutation is distinguished.
     - The shipped TSDoc and guide say "in the same task … between the two" (`helpers.ts:3523-3524`, `guides/test.md:686-687`), which is correct.
   - **"Never returns to the park point after the shot" is false (derived).**
     - Failing input: the proof's own fixture without its `window.scrollTo({ top: 1000 })` (`helpers.test.ts:3420-3450`).
     - Staging puts the frame at (0,0), and the element sits at (0,0). `computeOffset` gives `{1,0}`. The style restore puts the frame, and the element, back on the origin until the release.
     - The observer then records `[false, true]`.
     - The return is to the state staging made, which `guides/test.md:677-678` already describes. The code is not wrong; the claim and the test name overclaim.
   - **"Before it restores the `style` attribute" is inert.**
     - Named mutation `swaporder`: the style restore first, then `scrollTo`, in the same `finally` block.
     - The `MutationObserver` callback runs at the microtask checkpoint, after both writes. The assertions therefore cannot separate `swaporder` from the passing case (derived). The order within the task is also harmless.
   - **Required change.** Rename `helpers.test.ts:3420` to what the test proves, for example "hands the scroll back in the task that takes the offset off, so the scroll never leaves the element on the park point". Restate the claim's property the same way.

5. **Width-independent fixtures (W5): CONFIRMED.**
   - The fixtures set `across = Math.min(390, window.top.innerWidth)` at `helpers.test.ts` in the fixed-panel, below-pane, scope, and no-attribute cases.
   - Only the fixed-panel and below-pane cases read a frame, and each expects `across`. The scope and no-attribute cases read no frame, so the claim's "expect that width" applies only to the frame-reading fixtures.
   - The other 390-wide fixtures still force their move on a narrower window, because the element then does not fit and `rows` is infinite.

6. **The retained mutations: CONFIRMED.**
   - `t5-4-run.sh:17` asserts that each edit matches exactly once, and no run prints "did not apply" (`t5-4-mutations-summary.log.txt`).
   - Every run prints `restored`.
   - The digest log shows `13d1db06…8494118` before the series and `OK` with `check exit 0` after it (`t5-4-digest.log.txt:1-5`).
   - The failing line numbers (3169, 3204, 3232, 3302, 3328, 3395, 3420, 3453, 3502, 3533, 3637-3679) match the worktree test file. The helpers copy matches the worktree at lines 3259, 3612, and 3636.
   - Each assertion separates its mutation from the passing case: a floor color, a `mouseover` count, a scroll count, `scrollY`, a list of frame tops, a leaf result, or `readings.length`.

7. **Round-3 behavior holds: CONFIRMED.**
   - The staging loop (`helpers.ts:3538-3556`, against `r3:3488-3505`), the frame-only `style` offset, the post-release restore at `:3632-3637`, and `readFrame` are unchanged.
   - Adjacent difference: a null `window.top` now gives no nudge, where round 3 nudged. That path is unreachable in an attached tester frame.

8. **Prose (W8) and parity: BROKEN.**
   - **(a) Code tokens without nouns.** `types.ts:48-49` reads "A negative `top` moves the frame up … a negative `left` moves it left". This breaks the rule in `writing.md` § Code tokens.
     - Right: delete the sign sentence, which the member docs at `types.ts:52,54` already carry, and keep "Both are zero where the frame stays at the origin."
   - **(b) "By no more than the room the window leaves" is false for a too-large element.** The sentence is at `helpers.ts:3510-3511` and `guides/test.md:680-681`.
     - The case `(0,0,390,1112)` returns `{1,0}` (`helpers.test.ts:3680`), while the window leaves no room below.
     - "A fraction of a row" also leaves out columns, which the code treats the same way.
     - Right: "…by no more than the room the window leaves, a fraction included; an element too large for the window moves off the point whatever room is left, because the provider shoots it beyond the viewport."
   - **(c) The positive scroll sentence.** `helpers.ts:3494-3495` and `guides/test.md:665-666` share the defect in claim 3. Claim 3 is the carrier.
   - **What holds.**
     - Every other changed token carries its noun.
     - No changed sentence states a count: 422, 844, 900, and 30% are values.
     - Both Surface rows equal their TSDoc descriptions, reading `{@link releasePointer}` as `` `releasePointer` `` (`guides/test.md:257,367` against `types.ts:44-45` and `helpers.ts:3231-3232`).
   - **Counts the report states, checked against the logs.**
     - Green: 38 passed, 334 skipped. The three repeat runs each read 38 passed.
     - Pre-fix red: 1 failed, 371 skipped.
     - Mutations: `noright`, `wholenudge`, `htmlonly`, `nofixedroot`, `latescroll`, `noscrollback`, `nocomposite`, and `widened` each read 1 failed, 37 passed. `nonudge` reads 10 failed, 28 passed. `nooffset` reads 7 failed, 31 passed.
     - Helpers-file gate: 370 passed, 2 expected fail (372). `test:src:browser`: 424 passed, 2 expected fail (426), in 47.89 s.
     - Digest: `13d1db06…94118`.
     - Leaf table: 10 rows, each recomputed.
     - All of these match. I did not check the diffstat (4 files, 790 insertions, 34 deletions).

**Findings outside the claims**

- **C1: the guide's coverage list leaves out the ordering proof.**
  - The test at `helpers.test.ts:3420` is a round-4 proof. The captureFrame coverage entry at `guides/test.md:3709-3723` does not name it, although the report says "The guide's coverage list names the new cases" (`report:93`). The guide's contract is that each entry names what its file proves.
  - Right: add "a scroll handed back in the task that takes the offset off, so no reading finds the element back on the park point" to the entry.

**Attacked and held**

- **Leaf edge cases.** A `>=` mutation is caught by the right-nudge case. A too-large element always nudges down because `rows` is infinite, and the flush-left too-large proof covers that (`t5-4-mut-nonudge.log.txt:60`).
- **Name.** I tested `computeOffset` against fleet ownership. No guide under `/home/user` claims `computeOffset` or `FrameOffset`. `computeFrameOffset` would name the subject more exactly, but no rule requires it.
- **Styling.** The ragged wraps at `guides/test.md:3723-3729` and at item 18's "That height is" are cosmetic, and I did not rule on them.

**Referrals**

To the objective lane:
- **R1.** Run the claim-3 input with `filter` and with `contain: paint`, and count the scrolls. Also check whether Chromium applies `position: fixed` to a `<math>` element. If it does, the decision scrolls for an element the scroll cannot move, and `helpers.ts:3496-3497` is false.
- **R2.** No SVG case expects a scroll. Named mutation: `const scrolls = element instanceof HTMLElement && (…)`. By derivation it survives every proof, so the walk to the nearest HTML element is not proved.
- **R3.** A fixed too-large element with a negative top gets a move of `1 − top` rows. No browser proof shoots one.
- **R4.** The fractional move (`top:0.5px`) is proved only by the leaf. Check the hit test and the shot's edge in a real browser. Also, removing `Math.ceil` from `helpers.ts:3261-3262` (named mutation `noceil`) survives every case by derivation.
- **R5.** Run the claim-4 input and confirm the reading `[false, true]`.

To the Orchestrator:
- **R6.** Round 4 is the fourth repair round on the moved-element and parked-pointer seam, and it found a new defect there: the ordering defect. `quality.md` § Rounds and verdicts calls for a ruling unit next. Round-3 R8 got no answer in `t5-audit-3-verdict.md`.
- **R7.** The retained report still names `tmp/units/` paths (`report:4-6,151-156,191-203`). Retention requires rewriting them to the retained paths.
- **R8.** Settle the Surface rows with `npm run build` and then `npm run test:guides`. Compare `sha256sum /home/user/test-tf/tests/src/browser/helpers.test.ts` against `13d1db06…8494118`.

Relevant paths: `/home/user/test-tf/src/browser/helpers.ts`, `/home/user/test-tf/src/browser/types.ts`, `/home/user/test-tf/tests/src/browser/helpers.test.ts`, `/home/user/test-tf/guides/test.md`, `/home/user/scaffold/.orkestrel/veneer/units/t5-test-frame-report-4.md`.

VERDICT: FAIL 3, 4, 8; outside the claims: C1
