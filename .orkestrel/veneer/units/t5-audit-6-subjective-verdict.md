**Lane held: subjective.** `reviewer` on Opus 5.5, native, clean context. I ran nothing. Every ruling rests on the supplied diff and status, the worktree `/home/user/test-tf`, and the retained logs. The mutation and gate logs were written by the unit, and I checked their failing line numbers against the worktree test file.

1. **Scope and gates: CONFIRMED.**
   - `t5-6-status.txt:1-4` marks exactly the four named files.
   - The `types.ts` hunk in `t5-6.diff` (lines 474-490) reads the same as the one in `t5-5.diff` (lines 468-484). I read both. `t5-6-types-unchanged.log.txt:1` agrees.
   - `t5-6-gates.sh:5-15` appends each exit status after its command. Each gate log ends on `exit 0`: format `:5`, lint `:5`, check `:21`, file `:11`, browser `:49`. So do `t5-6-green.log.txt:12`, `t5-6-green-leaf.log.txt:11`, and `t5-6-lint-draft.log.txt:5`.

2. **The bound (C5): BROKEN.** The claim's last clause is false. The code is correct.
   - **Failing input.** `computeOffset(new DOMRectReadOnly(0, -50, 390, 100), 800, 513)` returns `{ top: 0, left: 0 }`. The box fits the window, and it stays at rows -50 to 50, partly outside the window. The subject asserts this result itself at `tests/src/browser/helpers.test.ts:3719-3722`. A fitting box that starts left of the window behaves the same way. So "no input with a fitting box … leaves the box outside the window" is false.
   - **Why the probe did not catch it.** `t5-instruments-5/t5-offset-probe.mjs:10-14` sweeps only `y` from 0 to 20 at `x = 0`, on the top axis. It never runs the round-5 arithmetic through the sweep, so the `bad` counter has no negative control. The claim is wider than anything that instrument covered.
   - **Everything else in the claim holds.**
     - `helpers.ts:3264-3265` returns a literal 0 on an axis whose far edge lies inside the window. On an overflowing axis it returns `Math.max(extent - Math.ceil(edge), -start)`, gated on `fits`.
     - The function is pure.
     - For a fitting box whose far edge overflows, the start edge lies past 0. So both terms are negative, the move is negative, the new start is at or past 0, and the new far edge is at or before the window's end.
     - The three new cases hold their results and final edges (`:3748-3770`). The fractional-bottom case keeps -332 (`:3742-3745`).
     - The TSDoc states the bound in the rounding paragraph (`helpers.ts:3248-3251`). The Summary is unchanged.
   - **Smallest fix (to the claim).** Restate it as: "no fitting box that starts at or past the window's start edge ends outside the window after the move." That form holds for every input covered here.

3. **The proofs bind: CONFIRMED.**
   - **`unbounded`** reddens the three new cases at `:3753`, `:3760`, and `:3768`: -1 against -0.5, -1 against -0.5, and -0.5 against +0 (`t5-6-mut-unbounded.log.txt:9,31,53`). The assertions tell the mutation apart from the passing case.
   - **`noceil`** reddens `:3742` (-331.5 against -332) and the both-edges case at `:3782` (`t5-6-mut-noceil.log.txt:9,31`).
   - **`nudge`** reddens the resting-pointer proof at `:3681`: blue against red (`t5-6-mut-nudge.log.txt:9-14`).
   - **Round-5 mutations.** Each round-5 mutation still reddens its named proof (`t5-6-mutations-summary.log.txt:1-66`).
   - **Test file digest.** `bdad0a88…a82740b` was taken before the series and checked `OK` after it, with `check exit 0` (`t5-6-digest.log.txt:1-5`).
   - **Two residual limits (objective lane):**
     - `noceil` edits only the top axis (`noceil.json:6-7`), so no retained mutation removes the left axis's `Math.ceil`. The both-edges case asserts -391, which would separate it from -390.5, but only by derivation.
     - Each new case's final-edge assertion (`:3754`, `:3761`, `:3769`) can only run after the exact move has matched, so it can never fail on its own.

4. **The park's mechanism (F1): CONFIRMED.**
   - `helpers.ts:722-726` and `guides/test.md:1703-1708` state the invariant word for word as the round-5 correction does.
   - **The mutation.** Parking at (0, 0) (`origin`) reddens every lifecycle exercise and the both-edges proof (summary lines 1-11). The both-edges control `places.some(place => place.top < -1 && place.left < -1)` (`:3532` in the diff) shows the frame covering (-1, -1) while `entered.count` stays 0. That separates "content lies over the point and nothing is hit-tested" from "content never reached the point".
   - `park2-readings.md:19-21` (Probe D, three runs of three, on the round-5 pre-bundle) and `t5-veneer-probe-6.log.txt:7-11` agree.
   - **Gap.** For the covered case, the hover-paint half of the sentence is inferred from the `mouseover` count. No assertion reads `:hover` while content covers the park point. The uncovered case is observed: `hoverAccessible` clears hover at `:875-876`, and `nomove` reddens it.

5. **The rename (F2): CONFIRMED.**
   - `:3662` reads "keeps the hover a resting pointer paints on the element it shoots".
   - The body at `:3667-3681` stages the pane, calls `hoverAccessible('button', 'Hovered')`, and presses no button.
   - "Resting" matches the `captureFrame` TSDoc's own words, "a pointer resting on the page" (diff `:336`).
   - The `Held` cases at `:1001-1014` equal `t5-6-test-r5.ts.txt:1002-1014`.
   - The guide's coverage entry names the renamed proof ("A hover placed after staging…") and the three new `computeOffset` cases (diff `:181-186`).
   - The mutation is `nudge`, as in claim 3. The floor color separates a moved element from one left in place.

6. **The consumer: CONFIRMED.** This rests on the Orchestrator's log, not the writer's report.
   - `t5-veneer-probe-6.sh:15-22` builds, packs, and checks out `3203369`. It then deletes `node_modules/.vite` before the journeys.
   - `t5-veneer-probe-6.log.txt:1-11` shows build exit 0 and guides 51 passed. Each journey ran with exit 0 and 62 passed. The active pre-bundle shows `park outside 1, park at origin 0`.
   - Each journey log ends on `exit=0` (`:81`).

7. **Round-5 behavior holds: CONFIRMED.**
   - The hunk headers of `t5-5.diff` and `t5-6.diff` differ only in the `releasePointer` bullet (+1 line), the coverage entry (+2), the `computeOffset` hunk (+3), and the `computeOffset` test block (+26).
   - The `captureFrame`, `readFrame`, and `types.ts` hunks read the same in both diffs (`t5-5.diff:277-484` against `t5-6.diff:283-490`).
   - Coverage limit: I compared the 521-line test hunk by its size and by the rename lines only.
   - **Counts the report states, checked against the logs:**
     - Red on round 5: 3 failed, 8 passed. Matches `t5-6-red-r5.log.txt:77`.
     - Green leaf: 11 passed. Matches.
     - Green whole file and the file gate: 375 passed, 2 expected fail. Matches.
     - Browser suite: 429 passed, 2 expected fail, 47.53 s. Matches.
     - Mutations, failed/passed: origin 9/366, nomove 9/366, nudge 7/368, noceil 2/373, scrolltop 1/374, nooffset 5/370, nocomposite 1/374, widened 2/373, noscrollback 3/372, unbounded 3/372. All match.
     - Digest: `bdad0a88…`. Matches.
     - Guides 51 passed and journeys 62 each. Both match the Orchestrator's log.
     - Diffstat (879 insertions, 44 deletions): not checked.

**Findings outside the claims**

- **G1: the F1 sentences break the plain-language sentence rule.**
  - **What is wrong.** At `guides/test.md:1703-1708`, the unit joined the F1 text onto the release sentence. The result is one sentence of about 75 words that carries six ideas: the release, the possible click, the park point, where it lies, the hit-test fact, and the "even where" condition. Round 5 split this text into two sentences (`t5-6-guide-r5.md.txt:1703-1707`). `helpers.ts:722-726` is also a single sentence of about 55 words.
  - **Rule.** `AGENTS.md` § Writing: "One idea per sentence. Keep sentences short", and "Word every sentence so the reader understands it on the first read."
  - **Why it matters.** This sentence is the guide's only statement of the park's load-bearing assumption. Buried as a trailing clause, it is the part a reader is least likely to take in.
  - **Right looks like.** In the guide: "…then clears hover by moving to (-1, -1) in the runner page's coordinates, one pixel above and to the left of that page's viewport. The browser hit-tests nothing there, so no element takes a `mouseover` event or hover paint from the parked pointer until the next pointer verb, even where a staging, scroll, or offset lays content over that point." Split the TSDoc paragraph the same way after "viewport". The brief prescribed the single-sentence wording, and so did my own round-5 F1.

**Attacked and held**

- **Terms.** The `computeOffset` TSDoc says "far edge", "opposite edge", and "window's start". The claims say "near edge". Each reads correctly in its own paragraph.
- **Test titles.** The new titles say "a fitting box", and the older ones in the same block say "an element". That matches the `box` parameter name, and one concept keeps one term inside each title.
- **The guide's `captureFrame` prose** ("offsets … only as far as brings the element inside") is still true under the bound.
- **The `releasePointer` Summary** "parks it outside the page" was held in round 5. It is looser than the remarks' "outside … that page's viewport", but not false for a runner page that does not scroll.

**Referrals to the objective lane**

- **R1.** "Returns zero or negative on each axis" may fail for a hand-built rect with a negative size. Under the Geometry spec, `new DOMRectReadOnly(0, 600, 100, -700)` has `top` -100, `bottom` 600, and `height` -700. `fits` is then true and `-box.top` is 100, so the function would return `top: 100`. I derived this without running it. `computeOffset` is a public export, so rule on whether a hand-built rect is in its contract.
- **R2.** What is left of claim 2 that the shipped code can reach: a fitting fixed element with a negative `top`, or an element whose scroll is clamped at 0, reaches `computeOffset` above the window and is shot unmoved. Whether the frame then loses rows is a rendered question. No capture covers it, so it is NOT-EVIDENCED here.
- **R3.** The two proof limits in claim 3: no mutation removes the left axis's `Math.ceil`, and the final-edge assertions can never fail on their own.

VERDICT: FAIL 2; outside the claims: G1
