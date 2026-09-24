<!-- Retained from Workflow run wf_acdf8e19-cd6, agent a57db59f8519a089a (reviewer on Opus 5.5). -->

**Lane: subjective, held by `reviewer` on Opus 5.5.** I ran nothing. Every ruling rests on reading the source, the diff, and the supplied logs. A ruling marked "derived" is a source trace and was not executed.

1. **Scope and gates: UNRESOLVED.**
   - **File set: holds.** `t5-2-status.txt:1-3` lists `M` on exactly `guides/test.md`, `src/browser/helpers.ts`, and `tests/src/browser/helpers.test.ts`. The diff touches no other path.
   - **Gates: open.** No gate log records an exit status.
   - **Lint log.** `t5-instruments-2/t5-2-gate-lint.log.txt:1-4` holds only the npm header and no oxlint summary line.
   - **Guide gate.** The unit did not run `test:guides`. The Orchestrator's `t5-2-guides-host.log.txt:11` (`Tests  51 passed (51)`) and `t5-veneer-probe-2.log.txt:1-3` (`build exit=0`, `guides exit=0`) cover it.
   - **To settle:** `checker` or `verifier` re-runs the gate chain and records exit codes.

2. **Declared geometry (`T5-FIT`): CONFIRMED.**
   - **Element no taller than the declared pane.** The reading is `max(ceil(element height), options.height)` (`/home/user/test-tf/src/browser/helpers.ts:3483-3488`). So `reading === options.height === pane`, and the loop breaks at staging 0 without restaging (`:3491`). This holds wherever the element sits, in flow or fixed.
   - **Taller element.** It enters the same loop, the same growth carry, and the same `CAPTURE_STAGINGS` refusal (`:3489-3498`).
   - **Page frame.** I traced it against the base: r0 with zero growth, then `rn + (rn − rn−1)`, and the refusal fires with the same `covered` and `pane` values. The shot is the base call (`:3502`).
   - **Mutation.** `edgereading` restores the round-1 bottom-edge staging. It reddens the fixed-panel, `50vh` (900 vs 422), `30vh` (refused), and tall-element (1445 over 1447) proofs (`t5-2-mut-edgereading.log.txt:8,27,46,59`). Each proof asserts a height or a refusal that the mutation changes, so each one distinguishes it.
   - **Design fit.** Reading the element's own height is the right re-reading. It makes the element, not the document, the thing the pane must hold, and it removes the round-1 chase after an edge that moves with every pane.

3. **Hand-back (`T5-BACK`): UNRESOLVED.**
   - **What holds.** The scroll is saved before `stagePane` (`helpers.ts:3476`) and restored after `releasePane` (`:3553-3554`), so the release has already restored the viewport that bounds the scroll. The offset and the compositing hint come off in the inner `finally` (`:3532-3535`), before the path check (`:3537`) and the byte check (`:3548`).
   - **Mutation.** `noscrollback` reddens the below-pane proof (`scrollY` 200) and the refusal proof (`scrollY` 100) (`t5-2-mut-noscrollback.log.txt:8,27`). Both assertions distinguish it.
   - **No proof pins the order.** A mutation that moves the attribute restore into the outer `finally` passes every assertion.
   - **Open path.** "Every path" has one path I cannot rule on: see referral RA.

4. **Scope (`T5-SCOPE`): CONFIRMED. The inline `style` attribute is the right scope.**
   - **Structural scoping.** The write lands on `window.frameElement` alone (`helpers.ts:3513,3524-3527`). No selector exists that could widen, and no marker needs to be set or found.
   - **Exact restore.** The restore compares the whole attribute string (`:3520,3533-3534`).
   - **Nothing is reverted.** The installed runner writes the tester's inline style only when it creates the frame (`node_modules/@vitest/browser/dist/client/__vitest_browser__/orchestrator-jtzFEKPy.js:268-270`). `setIframeViewport` rewrites the pane's `cssText`, not the frame's (`:404-409`). Restoring the saved string therefore reverts no runner write, and the `stagePane` argument for a declared rule (the pane's inline properties are rewritten) does not apply to the frame.
   - **F2 closed.** The override and its dependence on the fixed placement are stated where the offset is written (`:3510-3512`) and in the TSDoc (`:3456-3458`). The cascade reason given is correct: an inline `!important` declaration outranks a stylesheet `!important` declaration.
   - **Second frame.** `data-vitest="earlier"` is the honest choice, because the provider's strict locator refuses a second `true` frame (`t5-2-red-r1.log.txt:111`).
   - **Mutation.** `widened` puts the second frame at -331 at every reading (`t5-2-mut-widened.log.txt:9`). The passing case never reads below 0. The filter assertion distinguishes the two, and the calling-frame control proves a reading was taken under the offset. `norestyle` reddens the attribute assertion (`t5-2-mut-norestyle.log.txt:8`).
   - **Caveat.** The mutation's exact text is not retained (RB). Also, "no other frame moves" holds for the offset only. `stagePane`'s existing `iframe[data-vitest]` rule still pins every matching frame at the origin (`helpers.ts:3174-3177`). That is why the second frame reads 0. It is not part of this change.

5. **Pointer (`T5-POINTER`): BROKEN.** The stated limit is not the only case in which the element lands on the park point. The limit therefore needs the fix the mid-round note names: never move the element onto the point `releasePointer` parks at.
   - **Failing input (derived).**
     - Tester stylesheet `html, body { margin: 0 }`.
     - Fixture `<div style="height: 100px">Target</div><div style="height: 3000px">After</div>`.
     - Tester scrolled to 1000, then `releasePointer()`.
     - `captureFrame({ width: 390, height: 844, element: Target })`.
   - **What happens.** `box.top` is -1000, so `down = box.top` and `scrollBy` puts Target's top-left at tester (0,0) (`helpers.ts:3505-3509`). Target fits the window at row 0, so `rise` and `shift` are 0 and no offset follows (`:3518-3519`). The frame is fixed at page (0,0), so the parked pointer at page (0,0) (`releasePointer`, `helpers.ts:749`) now rests on Target. Chromium delivers `mouseover` to content moved under a still pointer, as `t5-2-mut-toorigin.log.txt:9` measures.
   - **Which elements are exposed.** Any flush-left element that lies above the tester's scroll position is exposed. So is any flush-left element taller than the declared pane: the pane grows to its height, and the scroll aligns its top with row 0.
   - **Consumer exposure.** Veneer prepends each lifted copy at the document's start (`/home/user/veneer/tests/app/browser/integration.test.ts:781-794`), so a copy shot from a scrolled tester is exactly this shape. The round-2 `journey:light-390` pass (`t5-veneer-journey-2-light-390.log.txt:9`, 62 passed) shows only that this run never scrolled such a copy.
   - **Needless scroll.** A fixed element extending past the pane gets `down > 0`, and the tester's document scrolls although the scroll cannot move that element (`:3505-3509`). This move brings nothing inside, yet it moves content under the pointer.
   - **What holds.** An element inside the window gets `down`, `across`, `rise`, and `shift` all 0 and moves nothing. Every required move is the minimal one. The parked-pointer proof and the held-hover proof both redden on `toorigin` (mouseover 1; floor blue), so they distinguish that mutation. Neither proof exercises a scroll.
   - **What right looks like.**
     - After computing the scroll and the offset, test whether the element's final box contains the page origin. Where it does, move one further row or column away from the origin wherever the pane and the window leave room.
     - Skip the scroll when the element does not move with the document's scroll.
     - Name any residual case in the TSDoc.
     - Add a parked-pointer proof with a flush-left element above a scrolled tester. It must assert no `mouseover` event and redden on the current code.

6. **The proofs: BROKEN, on "force their move on any runner window size".**
   - **Failing state (derived).** A runner window 844 rows tall or taller.
     - Below-pane proof: `depth = max(844, Hwin) + 400` (`tests/src/browser/helpers.test.ts`, the "ends below the declared pane" case, around line 3205). The scroll puts the element's bottom at the pane's bottom, which is page row 844. With `Hwin ≥ 844`, `rise = max(0, 844 − Hwin) = 0`, so no offset happens and `nooffset` cannot redden this proof.
     - Scope proof: its control `Math.min(...calling) < 0` (around line 3356) fails on correct code.
     - The report's own reading shows the dependence: the -331 in `t5-2-mut-widened.log.txt:9` is 844 − 513. Round 1's formula guaranteed a position past the window before a scroll to the top. Round 2 scrolls to the pane's bottom, so the formula no longer holds.
   - **Fix.** In both proofs, declare the pane taller than the window, for example `height: Math.max(844, requireValue(window.top).innerHeight + 200)`. The element at the pane's bottom then lies past the window after the scroll.
   - **What holds.** The counts match the logs:
     - `t5-2-red-r1-final.log.txt:171`: 9 failed | 13 passed | 334 skipped.
     - `t5-2-green.log.txt:7`: 22 passed | 334 skipped.
     - The mutation logs: noscrollback 2/20, widened 1/21, toorigin 2/20, nooffset 4/18, nocomposite 1/21, edgereading 4/18, norestyle 4/18. Each log names the proofs the report names.
     - The fixed-panel fixture places the panel's top at least 100 rows past the window, from `declared = max(844, 10·ceil((Hwin+100)/7))` (around line 3175). The panel still has to fit the window, which it does for any window of about 254 rows or more.
     - Each named proof distinguishes its mutation, as listed under claims 2 through 5.
   - **Notes.**
     - The fixed panel's `scrollY` 400 assertion cannot fail under `noscrollback`, because that fixture never scrolls; it distinguishes only round 1's scroll to the top.
     - The red and mutation runs were taken on an earlier test file (RC).

7. **Sized refusal: CONFIRMED.** `readFrame` at `helpers.ts:3585-3629` reads identical, line for line, to `t5-instruments-2/t5-2-helpers-r1.ts.txt:3556-3600`, including the TSDoc paragraph (`:3546-3549` vs `:3575-3578`).

8. **Prose: BROKEN.** These changed sentences state what does not ship:
   - **(a) The scroll sentence overclaims.** `helpers.ts:3449-3450` says "Where the element lies outside the pane, the tester's document is scrolled only as far as brings it inside". The guide says "An element outside the pane is scrolled into it only as far as it must go" (`guides/test.md:663-664`). For a fixed element extending past the pane, the document scrolls and the element is never brought inside (claim 5). Carrier: the claim-5 fix, or limit both sentences to elements that move with the document's scroll.
   - **(b) An unproven, vague sentence.** `helpers.ts:3450-3451` says "A fixed element that extends past the declared pane is shot as that pane shows it." The report files this as "Behavior carried as stated, not proven" (`t5-test-frame-report-2.md:172-174`), and "as that pane shows it" names no checkable frame. Either add a proof that asserts that frame's height and floor, or delete the sentence.
   - **(c) "Moves nothing" is false for a large element.** `helpers.ts:3458-3459` says "An element inside the window, or too large for it, moves nothing." An element too large for the window that lies outside the pane is still scrolled (`:3505-3509`). The tall-element proof's element is scrolled. Write "is not offset".
   - **What holds.**
     - The offset has its own word everywhere it is named. "lift" survives only for `stagePane` (`helpers.ts:3125`, `guides/test.md:586`, both unchanged).
     - Every changed code token carries its noun: the `element` option, the `captureFrame` function, the `stagePane` function, the `style` attribute, the `mouseover` event, the `releasePane` function, the `page.viewport` method, the `readFrame` function, and the `readCascade` function.
     - The possessive is gone (`guides/test.md:1146`).
     - No changed sentence states a count. 422, 844, 900, and 30% are values.
     - The `@throws` names the element height (`helpers.ts:3397-3399`).
     - "What the capture borrows it gives back" names the viewport, the scroll, and the `style` attribute (`guides/test.md:1514-1516`).
   - **Counts the report states:**
     - Unknown readings: 390x422 for `50vh` under a 900-pixel spacer; 390x254 for `30vh` under 900 and under 1000.
     - Red, final tests on the round-1 code: 9 failed, 13 passed, 334 skipped. Red, first draft: 9 failed, 13 passed.
     - Green: 22 passed, 334 skipped.
     - Red readings: fixed panel +0 vs 400; below-pane +0 vs 200; `50vh` 900 vs 422; `30vh` 1295 over a 1314 pane; tall element 1445 over a 1447 pane; element refusal +0 vs 100; frame scope -1244; parked pointer 1 mouseover; held hover blue vs red.
     - Mutations: noscrollback 2 failed, 20 passed; widened 1/21; toorigin 2/20; nooffset 4/18; nocomposite 1/21; edgereading 4/18; norestyle 4/18.
     - Host window: 513 rows.
     - Tall element: 1111.2 rows, 1112-row frame.
     - Helpers file: 354 passed | 2 expected fail (356).
     - `test:src:browser`: 408 passed | 2 expected fail (410), 46.77 s.
     - Diffstat: 3 files changed, 397 insertions, 31 deletions.

**Findings outside the claims**

- **F3: the scope proof's comment describes a state the report measured as impossible.**
  - **Where.** `tests/src/browser/helpers.test.ts:3323` says "A second tester frame stands in the runner page the way an earlier file's tester does."
  - **Why it is wrong.** An earlier file's tester carries `data-vitest="true"`, and the provider refuses every locator action while a second such frame exists (`t5-2-red-r1.log.txt:111`; report lines 177-178).
  - **Right.** "A second frame the staging selector matches stands in for any other `iframe[data-vitest]` frame. It carries another value because the provider's locator refuses a second `true` frame."

**Referrals**

To the objective lane:
- **RA.** In `helpers.ts:3552-3555`, a rejected `await releasePane()` skips `window.scrollTo`, so claim 3's "every path" fails on that path. Candidate fix: `try { await releasePane() } finally { window.scrollTo(...) }`.
- **RB.** `t5-2-mutate.sh:6` takes each mutation's text as command-line arguments, and no retained file records them, so no mutation can be re-run from the record.
- **RC.** The red and mutation logs place the scope proof at line 3316 (`t5-2-red-r1-final.log.txt:110`, `t5-2-mut-widened.log.txt:8`). The final file places it at 3322. The `50vh` and `30vh` cases grew after those runs, and the claim that those edits were comment-only rests on the writer alone.
- **RD.** The `removeAttribute` branch (`helpers.ts:3533`) is unreachable under the installed runner, which always writes an inline style, and no proof covers it.

To the Orchestrator:
- **RE.** `t5-veneer-probe-2b.sh` (`journey:dark-1280`) has no result line in `t5-veneer-probe-2.log.txt`. Only that run exercises the horizontal `shift` path, with a declared width wider than the window.

**Attacked and held**
- **Growth carry.** The loop restructure preserves the base page-frame sequence at every staging.
- **Exact restore.** The installed runner writes the frame's inline style only at creation, so the exact-string restore reverts nothing.
- **Cascade reason.** The comment's claim that an inline declaration outranks a stylesheet declaration of equal importance is correct.
- **Round-1 Veneer failure.** The round-2 build passes `journey:light-390` (62 passed), and it carries no round-1 selector (`t5-veneer-probe-2.log.txt:6-8`).

VERDICT: FAIL 1, 3, 5, 6, 8; outside the claims: F3
