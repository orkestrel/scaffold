<!-- Retained from Workflow run wf_af6f121e-023, agent a9ab4c4b95ab77ec8 (reviewer on Opus 5.5). -->

1. **Scope and gates: UNRESOLVED.** The file list holds. `/home/user/scaffold/.orkestrel/veneer/units/t5-status.txt:1-3` shows `M` on `guides/test.md`, `src/browser/helpers.ts`, and `tests/src/browser/helpers.test.ts`, and on nothing else. The diff touches no other path, and `src/browser/types.ts` and `src/browser/constants.ts` are unmodified. The gate half has no supplied evidence. The gate table comes only from the writer (`t5-test-frame-report.md:138-147`). The claims file states the Orchestrator's `npm run build` and `npm run test:guides` run, but no log for that run was supplied. To settle this claim, the Orchestrator must supply the retained logs of `npm run build` and `npm run test:guides` from the worktree, and have `verifier` run the gate chain.

2. **Staging: CONFIRMED** (from reading the source). I traced the base loop from the diff's removed lines (`t5.diff:154-177`) against the changed loop at `/home/user/test-tf/src/browser/helpers.ts:3470-3490`.
   - **Staging 0.** Both loops read r0 with zero growth, compare the pane with r0, and stage r0.
   - **Staging n.** Both loops read rn, set growth to `max(0, rn − rn−1)`, compare, and stage `rn + growth`.
   - **Refusal.** Both loops refuse at `staging === CAPTURE_STAGINGS` after the same number of readings, with the same `covered` and `pane` values in the same text (`helpers.ts:3483-3486`).
   - **Element branch.** The element branch reads `Math.ceil(element.getBoundingClientRect().bottom + window.scrollY)`, floored by `Math.max(…, options.height)` (`helpers.ts:3474-3479`). The scroll to the top at `helpers.ts:3469` runs before the first reading.

3. **The lift: BROKEN, on the word "only".** The selector matches every tester frame in the runner page, not only the calling one.
   - **Evidence.** The installed orchestrator runs a batch's files in sequence (`/home/user/test-tf/node_modules/@vitest/browser/dist/client/__vitest_browser__/orchestrator-jtzFEKPy.js:73-87`). It removes a tester iframe only when the same file runs again (`:139-141`). It empties the container only when the next batch starts (`:60-62`, `:69-72`). Every tester iframe carries `data-vitest="true"` (`:267`). So while file N captures, the frames of files 1 to N−1 are still in the container, and `html iframe[data-vitest]{top:…;left:…;will-change:transform}` (`helpers.ts:3499`) moves and composites them too.
   - **Effect.** Nothing changes on paint. The calling tester is appended last, so it paints over the stale frames. The `stagePane` rule has the same breadth already (`helpers.ts:3174`).
   - **What holds.** The selector does match the installed runner's frame (`orchestrator-jtzFEKPy.js:267`, `orchestrator.html:20`). The rule is removed on every path after it is created, because `lift?.remove()` sits in `finally` (`helpers.ts:3523-3524`). A refusal from the staging loop or from `stagePane` leaves `lift` undefined. A tester with no `frameElement` gives `owner === undefined` and skips the lift (`helpers.ts:3491-3492`). That branch is unreachable in practice, because `stagePane` throws first (`helpers.ts:3164-3166`).
   - **Mechanism fit (focus).** The dependence on the runner's `data-vitest` attribute is acceptable. `stagePane` already documents that attribute as its contract (`helpers.ts:3125-3128`), and a rename makes `stagePane`'s size check throw before the lift runs, so the lift cannot fail silently. The rule's hidden dependence on `stagePane`'s own rule is not acceptable as it stands; see finding F2.
   - **Smallest fix.** Restate the claim, or scope the rule to the calling frame. For example, `stagePane` could mark `window.frameElement` itself and the lift could select on that mark.

4. **Hand-back: BROKEN.** `captureFrame` does not hand back the tester's scroll position.
   - **Evidence.** An element frame calls `window.scrollTo({ top: 0, left: 0, behavior: 'instant' })` (`helpers.ts:3469`). The `finally` block restores only the lift and the pane (`helpers.ts:3523-3526`). Nothing records or restores `scrollX` or `scrollY`.
   - **Failing input.** The fixed-panel test scrolls the tester to 400 and asserts it (`/home/user/test-tf/tests/src/browser/helpers.test.ts`, `it('shoots a fixed viewport-height panel…')`, near line 3176). After the capture returns, `window.scrollY` is 0. No assertion checks it after the capture, so no proof holds this claim.
   - **Prose affected.** The guide's layout rule keeps "What the capture borrows it gives back —" directly after the sentence this unit added about the element frame (`t5.diff:77-80`). That sentence is false for the scroll.
   - **Fix.** Read `scrollX` and `scrollY` before the element branch's `scrollTo`. Restore them with `behavior: 'instant'` in `finally` after `releasePane()`, because the restored viewport bounds the scroll. Add `expect(window.scrollY).toBe(400)` after the capture in the fixed-panel test. Name the scroll in the TSDoc's hand-back paragraph.
   - **What holds.** The pane is handed back through `releasePane`, and the runner page through `lift?.remove()`.

5. **The sized refusal: CONFIRMED** (from reading the source).
   - **Header read.** `encoded` is padded standard base64 from the runner's `readFile` command. A 32-character slice is 4-aligned, and padding occurs only at the end of the whole string, so `atob(encoded.slice(0, 32))` cannot throw (`helpers.ts:3565`).
   - **Short files.** A short file or an empty file fails the `startsWith` check, or the `byteLength >= 24` check (`helpers.ts:3566-3568`), and falls through to the bare text (`helpers.ts:3575`).
   - **Byte order.** `DataView.getUint32` defaults to big-endian, and it reads at offsets 16 and 20.
   - **Proof.** The PNG-header proof asserts the exact message `40000x30000`. Two mutations would change it: swapping the offsets gives 30000x40000, and reading little-endian gives other values. The assertion distinguishes both from the passing case.

6. **The proofs: UNRESOLVED.** The red, green, and mutation counts come only from the writer (`t5-test-frame-report.md:110-132`). Each mutation below is distinguished from the passing case on the source:
   - **Dropped scroll.** The panel grows past a 254-row height.
   - **Staging read from `measureContent`.** The frame is 480 rows tall, not 254.
   - **Dropped `will-change`.** The floor is not blue.
   - **Dropped lift.** The panel's floor is not blue, and the element below the pane reads white instead of green.
   - **Size appended to the bare refusal.** The exact-message `toHaveProperty('message', …)` assertion catches it.

   The element-below-pane fixture places the element at `Math.max(844, requireValue(window.top).innerHeight) + 400` (`helpers.test.ts`, near line 3283). That puts it past both the window and the pane on any host, so that sentence holds. To settle the claim, the Orchestrator must re-run the baseline command against base `helpers.ts` and against the change, and re-run each mutation in the table. Referral R2 concerns whether the fixed-panel proof depends on the host.

7. **Page frames untouched: CONFIRMED.** With `element === undefined`:
   - The scroll is skipped (`helpers.ts:3469`).
   - The reading is `Math.max(measureContent(), options.height)` (`helpers.ts:3474-3479`).
   - The lift branch is gated on `element !== undefined` (`helpers.ts:3492`).
   - The shot is `page.screenshot({ path: options.path, base64: true })` (`helpers.ts:3506`), which is byte-identical to the base (`t5.diff:195`).
   - `lift?.remove()` is a no-op.

   The rule stays in the page for the whole element-frame shot, and it also stays through the path check and the `readFile` byte check before `finally` removes it (`helpers.ts:3504-3524`). That scope is still limited to element frames.

8. **Prose: BROKEN.** Several changed sentences state things that do not ship, and some break the writing rule.
   - **(a) Geometry overclaim.** The TSDoc says "With an element, the frame is that element at the declared viewport's geometry." (`helpers.ts:3441-3442`). The guide says "An element frame is the element at the declared viewport's geometry" (`t5.diff:18`). Neither holds for an in-flow, viewport-bound element below the declared fold.
     - **Input:** `<div style="height:900px"></div><div style="height:50vh"></div>`, with the second div as the element, at 390x844.
     - **Result:** the loop stages 1322 and then 1800, and settles at 1800. The frame is 900 rows tall, not 422.
     - **With `height:30vh` after the same 900px div:** the loop stages 1154 and then 1300, where the pane and the edge agree. The frame is 390 rows tall, not 253.2. With a 1000px spacer the readings oscillate (1254, 1377, 1450, 1457, 1440), and the capture is refused.
     - These results are derived from CSS `vh` resolution and the loop at `helpers.ts:3473-3490`. I did not execute them; see referral R1.
     - **Fix:** limit the sentence to what ships. For example: "the pane reaches the element's own bottom edge, so an element above the fold keeps the declared geometry". Alternatively, change the mechanism under R1.
   - **(b) The lift described as `stagePane`'s placement.** The layout rule says "lifts the tester to the window's origin for the shot" (`t5.diff:78-79`). `stagePane` already puts the tester at the window's origin (`helpers.ts:3125`, `3175`). The shipped lift moves the tester up and left past that origin so that the element sits at it (`helpers.ts:3499`). Write "moves the tester until the element sits at the window's origin".
   - **(c) Scroll.** "What the capture borrows it gives back" is false for the scroll; see claim 4.
   - **(d) Code tokens without a noun.** The writing rule (`/home/user/scaffold/.claude/rules/writing.md` § Code tokens) requires each code token to be followed by a noun, and forbids possessives. Changed lines break it:
     - "so `captureFrame` also lifts the tester" (`t5.diff:26`)
     - "`readFrame`'s remaining refusals" (`t5.diff:58`), a possessive code token
     - "`readFrame` takes a written frame's size" (`t5.diff:95-96`)

     Write "the `captureFrame` function" and "the `readFrame` function's remaining refusals".
   - **(e) Stale `@throws`.** The `@throws` of `captureFrame` still says "when the document's height never settles" (`helpers.ts:3397-3398`). For an element frame, the same refusal fires when the element's edge never settles.
   - **What holds.** No changed sentence states a count. "remaining" replaces "other two". "Both are removed" names its members in the preceding sentence. The only hits in the substitution table's rows are spatial uses of `below`, which is a permitted sense. The first TSDoc sentences are unchanged (`helpers.ts:3393`, `3530`), so the Surface rows are correctly unchanged.
   - **Counts the report states:**
     - Baseline: 12 passed, 334 skipped.
     - Red: 3 failed, 12 passed, 334 skipped.
     - Green: 15 passed, 334 skipped.
     - Mutations: 1 failed and 14 passed for each single-proof mutation; 2 failed and 13 passed for the dropped lift.
     - Helpers file: 347 passed, 2 expected fail (349).
     - `test:src:browser`: 401 passed, 2 expected fail (403), in 46.39 s.
     - Readings: runner window 800x513; panel 390x254, against 480 rows unfixed; tall element 390x700; `80vh` panel 390x676.
     - Diffstat: 3 files changed, 168 insertions, 23 deletions.
     - The Orchestrator's `test:guides` run (from the claims file): 51 passed (51).

**Findings outside the claims**

- **F1: "lift" names two mechanisms.** The `stagePane` TSDoc says the tester is "unscaled and lifted to the window's own origin" (`helpers.ts:3125`). `captureFrame` now uses "lift" for a different offset (`helpers.ts:3449-3452`, `3494`, and the guide at `t5.diff:26`, `78-79`). This breaks the "One concept, one term" law in `AGENTS.md`, and it already produced the false guide sentence in 8(b). Name the new mechanism with its own word, such as "offset", in the TSDoc, the code comment, and the guide. Keep "lift" for `stagePane`'s placement, or rename it there consistently.
- **F2: the offset overrides `stagePane`'s rule with no stated dependency.**
  - **What depends on what.** The rule at `helpers.ts:3499` works only because `stagePane` made the tester `position:fixed` (`helpers.ts:3175`). It beats `stagePane`'s `top:0 !important;left:0 !important` only because the `html ` prefix raises its specificity at equal importance.
  - **Where it is not stated.** Neither the comment (`helpers.ts:3493-3496`) nor the TSDoc says so.
  - **Why it matters.** The tester's placement is now owned by two functions. The only guard is the element-below-pane proof.
  - **Fix.** Place the offset with the staging mechanism that owns placement, next to `stagePane` and `releasePane`, or with an exported helper tested there. At minimum, state in the comment that the rule overrides `stagePane`'s placement by specificity and depends on its fixed position.

**Referrals to the objective lane**

- **R1: the element-edge staging for in-flow, viewport-bound elements below the fold.** Run the inputs in 8(a) through `captureFrame`. If they reproduce, the staging moves the unit's own defect, a `vh` length resolved against a taller pane, from fixed elements to in-flow ones. The oscillating 30vh case also shows that the growth carry lands exactly only for a half-pane rule. This finding decides whether an element frame can instead scroll its element to the tester's top at the declared pane and grow the pane only for an element taller than that pane.
- **R2: the fixed-panel proof may depend on the host.** The panel's top sits at row 590 of an 844-row pane. The dropped-lift and dropped-`will-change` mutations redden it only while the runner's window is shorter than 590 rows; the report measured 800x513 with the UI enabled. The report says Vitest sets no viewport only when its UI is enabled, so a headless run whose window is 590 rows or taller might leave the compositing hint with no proof. Check the window size on the gate host and on continuous integration, or make the fixture read `window.top.innerHeight` the way the element-below-pane fixture does.

**Attacked and held**

- The page-frame loop is equivalent to the base under the restructure (claim 2).
- The `atob` slice cannot throw on padded base64 from the runner (claim 5).
- The removal holds on a screenshot rejection and on the path and byte refusals, because `finally` runs `lift?.remove()` before `releasePane` (claim 3).
- A renamed runner attribute makes `stagePane` throw before the lift can fail silently.
- The adjacent behaviour that looks like a defect is correct: the staging-loop refusal fires before `lift` exists, so there is nothing to remove on that path.

VERDICT: FAIL 1, 3, 4, 6, 8; outside the claims: F1, F2
