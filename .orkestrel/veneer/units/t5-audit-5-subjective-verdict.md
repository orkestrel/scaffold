**Lane held: subjective**, by `reviewer` on Opus 5.5. I ran nothing. The rulings rest on the diff, the worktree source, the retained logs, and the installed tarball in the Orchestrator's probe worktree.

1. **Scope and gates: CONFIRMED.** `t5-5-status.txt:1-4` marks exactly the four named files. `t5-5-gates.sh:5-15` appends each exit status after its command. Each gate log ends on `exit 0`: format `:5`, lint `:5`, check `:21`, file `:11`, and browser `:49`.

2. **The park (P1): CONFIRMED.**
   - `helpers.ts:737-756` releases the recorded hold, then sends `mouseMoved` at `x: -1, y: -1`.
   - The both-edges proof asserts a 100x100 frame and `entered.count` 0 (`helpers.test.ts:3533`).
   - Mutation `origin`: the count reads `expected 1 to be +0` at `:3533` (`t5-5-mut-origin.log.txt:66-74`). The assertion separates the mutation from the passing case.
   - Mutation `nomove`: it reddens the hover-clears proof (`t5-5-mutations-summary.log.txt:14`).
   - `t5-5-green.log.txt:7` shows the whole file green.

3. **The origin distinction: CONFIRMED.** Under `origin`, every proof fails on its own `entered.count` line, reading `expected 1` (or `2`) `to be +0`. The lines are 3416, 3441, 3469, 3533, and the lifecycle lines 3552-3659 (`t5-5-mut-origin.log.txt:9-169`). The three corner proofs and the both-axes proof therefore each assert a reading that differs between a park at (0, 0) and one at (-1, -1).

4. **The removal (P3): CONFIRMED.**
   - `offsetParent|SVGSVGElement|ownerSVGElement` has no match in `src/browser` (my search, and `t5-5-criterion4.log.txt:2`).
   - `computeOffset` (`helpers.ts:3258-3264`) has no nudge.
   - The inner `finally` (`:3575-3578`) restores only `style`.
   - `captureFrame` (`:3517-3600`) sends no protocol call and reads no pointer attribute.

5. **The kept mechanism (P4): CONFIRMED.**
   - `computeOffset` is pure and returns only zero or `Math.min(0, …)` on each axis.
   - Mutation `noceil`: it gives -331.5 against -332, and only the fractional case fails (summary `:32-34`).
   - The exact `style` restore (`:3563-3578`), the `will-change:transform` hint (`:3569`), the bounded element-height staging with its refusal (`:3525-3541`), and the one scroll restore in a `finally` around `releasePane` (`:3595-3600`) are all present.
   - `nooffset`, `nocomposite`, `widened`, and `noscrollback` each redden named proofs (summary `:40-61`).
   - On shape: `compute*` is the deterministic prefix (`names.md:94`). `FrameOffset` follows the `Frame{Noun}` precedent. `top` and `left` are single-word and readonly. Its place in `types.ts`, with the function in `helpers.ts`, fits the centralization rules.

6. **The constraint (P2): CONFIRMED.**
   - The inside-window proof asserts `scrolled.count` 0 over a 3000-row tail. Mutation `scrolltop` reddens it (summary `:36-37`).
   - The hover proof (`helpers.test.ts:3662-3681`) stages, hovers, and then captures. Mutation `nudge` reads `'rgb(0, 0, 255)' to be 'rgb(255, 0, 0)'` at `:3681` (`t5-5-mut-nudge.log.txt:9-14`).
   - The nudge fires only when the box's top-left is at or before the origin, so this red also proves that the element sits at the corner.

7. **The lifecycle exercises: CONFIRMED.** Each exercise listens on `document`, so it counts every element's `mouseover`, not only the target's. Each asserts 0 (diff `:888`, `:914`, `:940`, `:968`, `:995`), each is green, and each reddens under `origin` at its own count line.

8. **The retained mutations: CONFIRMED.**
   - `t5-5-run.sh:17` requires each edit to match exactly once. No run prints "did not apply", and every run prints `restored`.
   - Each retained `from` text appears verbatim in the final source.
   - `t5-5-digest.log.txt:1-5` shows `edaef7e7…8db242` before the series and `OK` with `check exit 0` after it.
   - The failing line numbers match the worktree test file (`:3533` and `:3681` checked).
   - Each table row matches the summary.

9. **The consumer: CONFIRMED.** This rests on the Orchestrator's host log, not the writer's report.
   - `t5-veneer-probe-5.log.txt:1-10`: build exit 0, guides 51 passed, and `journey:light-390` and `journey:dark-1280` each 62 passed.
   - The installed tarball in the probe worktree parks at `x: -1, y: -1` (`node_modules/@orkestrel/test/dist/src/browser/index.js:735-739`).
   - That worktree's `tests/app/browser/integration.test.ts` carries the `entered` guard (8 hits).

10. **The boundary (P5) and parity: CONFIRMED.**
    - The `releasePointer` Summary (`helpers.ts:711`) equals `guides/test.md:313`.
    - The `computeOffset` Summary (`:3236-3237`) equals its Surface row, and the `FrameOffset` Summary equals its row.
    - The `captureFrame` TSDoc (`:3500-3505`) states P2 and names neither (-1, -1) nor `releasePointer`.
    - The guide gate passed (`t5-5-guides.log.txt:11`).
    - Counts the report states, checked against the logs:
      - Green: 372 passed, 2 expected fail (374), which matches.
      - File gate: the same count.
      - Browser suite: 426 passed, 2 expected fail (428), in 52.94 s, which matches.
      - Each mutation's failed and passed count matches the summary: origin 9/363, nomove 9/363, nudge 4/368, noceil 1/371, scrolltop 1/371, nooffset 5/367, nocomposite 1/371, widened 2/370, noscrollback 3/369.
      - Guides: 51 passed, which matches.
      - Digest: `edaef7e7…8db242`, which matches.
      - Step 1's "370 passed" has no retained log, so that count is UNRESOLVED.
      - I did not check the diffstat (847 insertions, 44 deletions).

**Findings outside the claims**

- **F1: the park's stated mechanism is false, and ruling P1 carries the same error.**
  - **What is wrong.** `helpers.ts:724-725` and `guides/test.md:1705-1707` say "No staging, scroll, offset, or layout change puts content under a pointer parked there."
  - **Evidence against it.** The Orchestrator's own probe offsets the frame "so the frame covers the page's origin and (-1, -1)" (`t5-park-probe.log.txt:10-11`). The both-edges proof's control asserts the same covering (`helpers.test.ts:3530-3532`), and its comment says "the offset took the frame over the parked pointer". The promise holds for another reason: the point lies outside the runner page's viewport, and the browser does not hit-test there. That dependency on the browser is the load-bearing assumption, and nothing states it.
  - **Why it matters.** A reader gets a false model. The sentence also hides the one condition whose change would break the promise.
  - **Right looks like:** "The park point lies outside that page's viewport, where the browser hit-tests nothing, so an element takes no `mouseover` event or hover paint from it until the next pointer verb, even where a staging, scroll, or offset lays content over that point." Apply the same wording to the guide bullet. Rule P1's clause "puts content under the parked pointer" wrong on the Orchestrator's own evidence.
- **F2: the hover proof is named for a hold it never makes.**
  - **What is wrong.** `helpers.test.ts:3662` reads "keeps the hover a held pointer paints…", with `.held` and "Held" at `:3668-3671`. The guide coverage entry says "A held hover" (`guides/test.md:3721`). The body calls `hoverAccessible` (`:3673`) and presses no button.
  - **Why it matters.** In this package, "held pointer" means a pressed primary button: the `releasePointer` Summary "Releases a held pointer" (`helpers.ts:711`), `holdAccessible`, and `guides/test.md:1667`. This breaks the one-concept-one-term rule, and the proof is not named for what it proves.
  - **Right looks like:** "keeps the hover a resting pointer paints on the element it shoots", with `.hovered` and "Hovered", and in the guide, "A hover placed after staging on an element at the tester's top-left corner stays in the frame."

**Attacked and held**

- The removal is complete. `getRootNode` at `helpers.ts:109` belongs to `resolveAccessible` and is unrelated.
- The round-4 sign-sentence finding on `types.ts` is closed. The remarks now read only "Both are zero where the frame stays at the origin."
- Every proof retained or added is in the coverage entry, which closes round-4 C1.
- The retained report names no `tmp/` path, which closes round-4 R7.
- The inside-window proof's `mouseover` assertion is not reddened by `origin`, because its listener sits on an element away from (0, 0). `nomove` reddens it, so the assertion is not inert.

**Referrals**

To the objective lane:
- **R1.** `computeOffset` tests fit with unrounded sizes but rounds the edge up. Input: `computeOffset(new DOMRectReadOnly(0, 0.5, 390, 513), 800, 513)` returns `{ top: -1, left: 0 }`, which puts the box's top at -0.5. Check whether the shot then loses a part row.
- **R2.** No proof drives a rejected `releasePane`, yet the prose promises the scroll restore "a rejected release included" (`helpers.ts:3509-3510`, `guides/test.md:1525-1527`).
- **R3.** No mutation reddens the both-edges `computeOffset` case. The report admits this.
- **R4.** Compare `sha256sum` of the worktree test file against `edaef7e7…8db242`.

To the Orchestrator:
- **R5 (dispatch defect).** This brief's Focus line was carried over from round 4 without being rewritten. It names "the leaf's name, its result type" and "the stated SVG assumption", which are round-4 claims 2 and 3 (`t5-audit-4-subjective-verdict.md:10,26`). `t5-audit-5-briefs.py:32-35` rewrites only the reviewer brief's lane sentence. I held the leaf questions under claim 5 and read "the stated assumption" as the park's browser assumption, which is F1.

Relevant paths: `/home/user/test-tf/src/browser/helpers.ts`, `/home/user/test-tf/tests/src/browser/helpers.test.ts`, `/home/user/test-tf/guides/test.md`, `/home/user/scaffold/.orkestrel/veneer/units/t5-instruments-4/t5-park-probe.log.txt`, `/home/user/scaffold/.orkestrel/veneer/units/t5-audit-5-reviewer-brief.md`.

VERDICT: FAIL none; outside the claims: F1, F2
