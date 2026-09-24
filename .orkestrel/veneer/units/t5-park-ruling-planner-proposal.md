<!-- Retained from the planner lane on Opus 5.5 (native subagent), T5 park-point ruling. -->

# T5 park-point ruling: subjective-lane proposal

I held the **subjective** lane as `planner` on Opus 5.5. I worked in a clean context, ran no commands, and edited nothing. Every reading below comes from source, the retained records, or the Orchestrator's park probe. A claim marked "derived" comes from reading source, not from a run.

**Recommendation: adopt candidate A.** Park the pointer outside the runner page. Delete the geometric avoidance: the nudge, the ancestor walk, and the in-task scroll ordering. Keep every piece of capture machinery that exists for paint rather than for the pointer. One hit-test reading must come back before A is final (Risk R1).

## Design

### 1. The invariant

State the ruling in the shape `.claude/rules/quality.md:92` asks for.

- **Invariant.** The `releasePointer` function parks the pointer at (-1, -1) in the runner page's coordinates, which is outside that page's viewport. The `captureFrame` function reads no pointer position and sends no pointer input. It computes its scroll and its offset from the element's box, the pane, and the runner window alone.
- **Constraint against over-correction.** The capture never takes the pointer. It never parks it, moves it, or re-seats it. A case that holds a hover or a press on the element needs the pointer where the case put it. The capture also moves nothing for an element already inside both the pane and the runner window.
- **Interface where the consumer meets the obligation.** Call `releasePointer` before a resting frame. To keep a hover in a frame, stage the pane at the frame's size first, then hover, then capture.

The probe is the evidence for the park point. Parked at (-1, -1), a target scrolled across the origin took 0 `mouseover` events and no `:hover`. Parked at (0, 0), it took 1 event and `:hover` (`t5-instruments-4/t5-park-probe.log.txt:4-5`).

### 2. The mechanism

**These pieces go:**
- **The nudge.** The covering-origin branch in `computeOffset` (`helpers.ts:3263-3270`) and its TSDoc paragraph (`helpers.ts:3246-3251`).
- **The scroll decision's ancestor walk.** The `offsetParent` chain, the fixed-`svg` root stop, and the `scrolls` flag (`helpers.ts:3561-3580`). Round 4 broke it twice: a shadow root stops `parentElement` (objective verdict, claim 3) and non-transform containing blocks escape it (subjective verdict, claim 3). The walk is also a hand-written copy of CSS containing-block rules, which cuts against `AGENTS.md` § Project model ("Do not add a second parser … to duplicate … CSS"). Its only stated purpose was the pointer: "a scroll taken for it would only move the content under a resting pointer" (`helpers.test.ts:3480-3481`).
  - **Replacement rule.** If the element's box lies outside the pane, scroll the document by the distance that would bring it inside. Then read the box again and take the offset from that reading (`helpers.ts:3582-3586` already does this without the flag).
- **The inner scroll restore.** The `scrollTo` beside the style restore (`helpers.ts:3610-3612`). The single restore after `releasePane` (`helpers.ts:3632-3637`) becomes the one home for handing back the scroll. That also removes the clamped-scroll counterexample (objective verdict, claim 4), because no ordering promise remains to break.

**These pieces stay, because each serves paint rather than the pointer:**
- `computeOffset`, reduced to the window-fit move. Each axis returns `fits ? Math.min(0, size - Math.ceil(edge)) : 0`.
- The offset written on the calling frame's `style` attribute (`helpers.ts:3597-3607`).
- The compositing hint `will-change:transform` (`helpers.ts:3603`).
- The element-height staging loop (`helpers.ts:3536-3556`).
- The restore after the release.

### 3. The boundary: what each helper and the guide promise

**`releasePointer`**
- Summary (TSDoc `helpers.ts:711` and guide row `test.md:313`): "Releases a held pointer and parks it outside the page, clearing hover."
- Guide bullet (`test.md:1707-1712`): state the value (one pixel above and to the left of the runner page's origin, outside its viewport). Then: "No scroll, staging, offset, or layout change puts content under the parked pointer, so no element takes a `mouseover` event or hover paint from it until the next pointer verb."
- A consumer that parks for a resting frame therefore meets a hover-free frame on every geometry. Under the (0, 0) park that was true only where Veneer padded the wrapper.

**`captureFrame`**
- Replace the park paragraph (`helpers.ts:3507-3518`, `test.md:677-687`) with the pointer contract:
  - The capture sends no pointer input.
  - The staging lifts the tester to the window's origin, a scroll brings an element outside the pane into it, and an offset brings an element past the window inside. Each moves content under a pointer resting on the page.
  - A pointer the case placed on the element, with the pane already staged at the frame's size, keeps its hover in the frame when the element lies inside both the pane and the runner window, because the capture then moves nothing.
- Delete "nor for an element the scroll cannot move …" (`helpers.ts:3496-3497`, `test.md:667-668`).
- Delete the same-task ordering sentence (`helpers.ts:3523-3524`, `test.md:686-687`).
- Remove "and off the pointer's park point" from the ordered list (`test.md:1528`).

**`computeOffset`**
- Summary (TSDoc `helpers.ts:3231-3232` and guide row `test.md:367`): "Computes how far an element frame moves the tester frame so the element is shot inside the runner's window."

**`FrameOffset`**
- Both members are now zero or negative. Rewrite the member docs (`types.ts:52,54`) as "zero or negative; a negative value moves the frame up" and "… left".
- Replace the remarks (`types.ts:48-49`) with "Both are zero where the frame stays at the origin." This closes round-4 finding 8(a), a code token without its noun.

### 4. Shape and API feel

- **`releasePointer`, `() => Promise<void>`.** It stays one call. "Release" is the neutral hand-back in this file's pairs: `holdAccessible`/`releasePointer`, `stagePane`/`releasePane`, `stageMedia`/`releaseMedia`. A pointer that rests on nothing fits that meaning better than one resting on runner chrome or on the staged tester. Do not split out a separate `parkPointer`: no consumer parks without also wanting the release.
- **`captureFrame`, `(options: FrameOptions) => Promise<string>`.** The signature does not change and gains no pointer option.
- **The design fit gained is decoupling.** Today three docs cross-reference `releasePointer`'s geometry: `computeOffset` (`helpers.ts:3232`), `captureFrame` (`helpers.ts:3507`), and the guide (`test.md:367,677`). Under A none of them do. That coupling was the source of the recurring defect: two helpers that each had to know the other's coordinates.

### 5. Naming

- Keep `releasePointer`, `computeOffset`, and `FrameOffset`. `compute*` still names a deterministic calculation (`names.md:94`).
- Rename the test cases to what they prove. The phrase "off the parked pointer" (`helpers.test.ts:3395,3453,3533`) describes a move the code no longer makes. Use "takes no `mouseover` from the parked pointer for …".

### 6. The consumers (Veneer)

- **Required: comment rewrites only.**
  - `tests/setupBrowser.ts` around line 992 ("parked at the page's origin, on the wrapper's padding").
  - `tests/app/browser/integration.test.ts` around lines 716-723 (the wrapper's padding reasoned deeper than the negative gutter).
  - After A the padding holds the focus ring alone (`setupBrowser.ts:931`).
- **No code changes.** The `entered` recorders (`setupBrowser.ts:1026-1040`) stay. They become the consumer-side proof of the invariant.
- The stage-before-hover practice (`integration.test.ts:2255-2259`) already matches the promise in item 3.

## Alternatives

- **B: keep the (0, 0) park and keep repairing the avoidance.** Rejected.
  - Each round relocated the defect along one stream: the offset, then the scroll, then fractions and SVG, then the shadow root, the clamp, and containing blocks.
  - The nudge also works against the held-hover promise: it moves a hovered element that sits on the origin out from under the pointer holding it. The round-4 prose admits this: "the element can lose a hover it held" (`helpers.ts:3517`).
  - B cannot close without re-implementing CSS containment.
- **C: the capture owns the pointer and parks it itself before the shot** (the round-3 R8 suggestion). Rejected.
  - It destroys the held-hover frame, which is proved at `helpers.test.ts:3577-3598` and consumed by Veneer (`integration.test.ts:1397-1402`, `2255-2262`).
  - It would put product policy (a pointer choice) inside a capture mechanism.
  - A gives the same resting-frame guarantee through the verb consumers already call.

## Constraints

(Objective lane: left empty.)

## Refusals

(Objective lane: left empty.)

## Measurements

(Objective lane: left empty. The one reading this design still needs is under Tensions T1.)

## Units

**U1: implement the ruling in `@orkestrel/test`.**
- **Role and engine:** `opus` on Opus 5.5, native. The browser proofs need Chromium's process tree, which Bench laws rule 5 (`orchestration.md` § Bench laws) bars inside a `sol` bench exec. This is recorded as the routing reason, not as a darkness substitution.
- **Checkout:** `/home/user/test-tf`, from a committed checkpoint of the round-4 tree.
- **Owned files:** `src/browser/helpers.ts`, `src/browser/types.ts`, `tests/src/browser/helpers.test.ts`, `guides/test.md`.
- **Off-limits:** every other path, including the paths `scaffold repair` restores (`tests/setupPolicy.ts`, `tests/policy.test.ts`).
- **Dependencies:** the Orchestrator's T1 reading first.
- **Acceptance criteria, cheap first:**
  1. `types.ts` gets the `FrameOffset` docs from Design item 3.
  2. `releasePointer` sends `mouseMoved` at (-1, -1) and carries the Summary from Design item 3.
  3. `computeOffset` is reduced to the fit arithmetic. Neither its doc nor `captureFrame`'s doc or comments name the park point or `releasePointer`.
  4. `captureFrame` contains no `offsetParent`, `SVGSVGElement`, or `ownerSVGElement` reference. It scrolls only when the box lies outside the pane, and it restores the scroll once, after `releasePane`.
  5. Delete these proofs, whose properties no longer exist:
     - the ordering proof (`helpers.test.ts:3420-3451`);
     - the fixed-element and SVG unscrolled proofs (`helpers.test.ts:3479-3531`);
     - the nudge-only `computeOffset` cases.
  6. Re-expect the negative-top case at `{ top: 0, left: 0 }`.
  7. Add a fractional-bottom `computeOffset` case that the `noceil` mutation (drop `Math.ceil`) reddens.
  8. Rename the corner proofs as in Design item 5.
  9. Add a park proof for an element past both the window's right and bottom edges: it is offset up and left, takes 0 `mouseover` events, and its frame has the element's size.
  10. Move the held-hover proof's element to the tester's top-left corner. Re-instating the round-4 nudge (mutation `nudge`) must redden it.
  11. The inside-window proof also asserts 0 `scroll` events.
  12. Mutation `origin` (park at 0, 0) reddens every corner proof and the both-axes proof.
  13. Mutation `nomove` (no park move) reddens the hover-clears proof (`helpers.test.ts:859-878`).
  14. `nooffset`, `nocomposite`, `widened`, and `noscrollback` each still redden a named proof.
  15. The guide carries the sentences from Design item 3. Its Surface rows equal their TSDoc description paragraphs. The captureFrame coverage entry (`test.md:3709-3723`) names every retained and new proof, which carries round-4 finding C1.
  16. Gates: format check on the owned files, `npm run lint:check`, `npm run check`, and the scoped `src:browser` run of `helpers.test.ts` each exit 0. `npm run test:src:browser` is an observation, not a criterion.

**U2: audit U1.**
- **Roles and engines:** `analyst` on GPT-6 Astra (objective lane, the engine that did not write U1), `reviewer` on Opus 5.5 (subjective lane), and `checker` on Grok for Surface-row parity, the prose sweep, and the coverage-list sweep.
- **Dependencies:** U1.
- **Acceptance criteria:**
  - The claims sit in one numbered claims file.
  - The Orchestrator supplies the executed mutation logs and the T1 and both-axes readings, because the Astra bench cannot run the browser.
  - Every proof verdict names its mutation.

**U3: authoritative gates in `test-tf`.**
- **Role and engine:** `verifier` on Sonnet.
- **Dependencies:** U2 passes.
- **Acceptance criteria:** the full gate chain exits 0, followed by `npm run build` then `npm run test:guides`.

**U4: Veneer comment rewrites.**
- **Role and engine:** `builder` on Sonnet. The unit is fully specified: the Orchestrator writes the replacement sentences into the brief.
- **Checkout:** `/home/user/veneer`.
- **Owned files:** `tests/setupBrowser.ts` (the `FrameManager.focus` method's remarks) and `tests/app/browser/integration.test.ts` (the resting-frames comment).
- **Dependencies:** U3.
- **Acceptance criteria:** no comment says the pointer is parked at the page's origin or on the wrapper's padding. Lint and check are clean on the owned files.

**U5: consumer proof.**
- **Owners and engines:** the Orchestrator's own tracked command packs `test-tf` and installs the tarball into Veneer, because installs are barred to every role. Then `verifier` on Sonnet runs the journeys.
- **Dependencies:** U4.
- **Acceptance criteria:** `journey:light-390` and `journey:dark-1280` are green, and every `entered` reading is empty. Then restore the registry copy before any publish.

## Tensions

- **T1: a reading this design needs that the dispatch did not supply.** Does Chromium deliver hover to a box outside the viewport? The offset moves the tester frame up and left, so an element past both the window's right and bottom edges puts the frame over (-1, -1) in page coordinates. The probe covered the scroll case only, where the frame never covers that point.
  - Command to run: the U1 both-axes proof against a tree where only the park point has changed.
  - My derived expectation is that the root layer's hit test is clipped to the visible rect, so the proof reads 0.
  - Rule on A only after that reading.
- **T2: dropping the ancestor walk means a fixed element past the pane now takes a futile document scroll.** That scroll fires `scroll` events at the app. I judged this acceptable: the capture already scrolls for in-flow elements, and the scroll is handed back. The objective lane might argue for keeping the HTML-only `offsetParent` walk. That keeps a partial copy of CSS containment with known holes, and I would refuse it.
- **T3: the park coordinate stays an inline literal**, not an exported constant. One call site, and no consumer reads the value. A constant in `constants.ts` would grow the public API and the guide.
- **T4: "park" now names two concepts in the guide.** The wait family "parks on" events (`test.md:15,1427-1434`), and the pointer "parks". I kept "park" for the pointer because Veneer's fault voice uses it (`setup.ts:3483`), and this ruling ends a seam rather than reopening vocabulary.
- **T5: the round-4 inner scroll restore is removed rather than kept as harmless.** One restore, one home.

## Risks

- **R1: hit-test clipping outside the viewport (T1).** If the both-axes proof reads a `mouseover`, the claim that no move puts content under the pointer is false for that geometry, and the ruling needs revision before U1 proceeds. **Evidence to settle it:** that proof's log under both the (-1, -1) and the `origin` park.
- **R2: Veneer calls `page.elementLocator(...).unhover()` after `releasePointer`** (`integration.test.ts:1311,1328,1740,1920,1999,2269`). Vitest documents `unhover` as moving the cursor onto the tester's `document.body` (`node_modules/@vitest/browser/context.d.ts:316-324`). That puts the pointer back on tester content, so a later capture in the same case, without another `releasePointer`, meets the old defect class. `FrameManager.focus` re-parks the pointer itself (`setupBrowser.ts:1025`). **Evidence to settle it:** a `grok` sweep of each `unhover` site for a frame placed before the next `releasePointer`, done before U4's brief. A hit becomes its own successor unit, not an expansion of U4.
- **R3: after the CDP park, Playwright's tracked mouse position is stale.** A future pointer step that interpolates from that position would sweep in from a point that is not real. No consumer does this today. **Evidence:** the existing following-case hover proof (`helpers.test.ts:1087-1096`) stays green under U1.
- **R4: the held-hover promise is narrow by design.** It covers an element inside both the pane and the runner window, with the pane staged first. A consumer that hovers before staging loses the hover. That is documented behavior, and Veneer's comments already state it (`integration.test.ts:2255-2256`, `setupBrowser.ts:935-936`).
- **R5: re-ask the repaired claim at every entry point** (`quality.md:83`). `driveHold`'s missed-press path calls `releasePointer` (`helpers.ts:702`), so a refused hold now parks the pointer outside the page too. **Evidence:** the existing hold-refusal proofs stay green under U1.

Relevant paths:
- `/home/user/test-tf/src/browser/helpers.ts`
- `/home/user/test-tf/src/browser/types.ts`
- `/home/user/test-tf/tests/src/browser/helpers.test.ts`
- `/home/user/test-tf/guides/test.md`
- `/home/user/veneer/tests/setupBrowser.ts`
- `/home/user/veneer/tests/app/browser/integration.test.ts`
- `/home/user/scaffold/.orkestrel/veneer/units/t5-instruments-4/t5-park-probe.log.txt`
