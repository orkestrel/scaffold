# `reviewer` verdict — B-FORMS-CLOSE-SPECIMENS (`bfs`), subjective lane (Opus 5.5, agent a477d3290b12380ce)

Retained verbatim from the lane's returned message.

---

**Lane held:** subjective, by `reviewer` on Opus 5.5, as a native subagent with a clean context. Evidence used: `bfs.diff`, `bfs-status.txt`, the brief, the report, `bfs-setup.log.txt`, and the worktree `/home/user/veneer-bfs` read at its current state. I ran nothing. The unit was written on this lane's own engine (Opus), so this lane attacked it harder.

## Numbered verdicts

1. **CONFIRMED.** The diff hunks sit only in the owned regions: `app/browser/constants.ts` (the `VALIDATION_SPECIMENS` remark, `INPUT_GROUP_COPY`, and `INPUT_GROUP_SPECIMENS` with its doc block), `tests/setup.ts` (`CaptureSubject`, the `CASCADE_KEYS` doc block and rows), and the two test files. `bfs-status.txt` lists those four files and nothing else.
   - Attack that failed: I looked for a hunk outside the owned regions and for an off-limits path in the status, and found neither.

2. **CONFIRMED.** Each specimen matches R1's form at `app/browser/constants.ts` around lines 1560-1586:
   - The first group is `.input-group.has-validation` with the `@` addon.
   - Its control carries `.is-{state}`, a unique `aria-label`, and an `aria-describedby` equal to the tooltip `id`. The tooltip is the group's last child.
   - A second group follows with `.btn` first and `.form-control` last.
   - The markup has no inline style, and the pair sits directly after `Input group validation`.
   - The doc block (lines 1520-1528) calls the second group the room and the overlap "the release's own positioning, not a showcase layout".
   - The `VALIDATION_SPECIMENS` remark ends by pointing at the Input group section.

   I checked the doc's geometry against the partials and it holds:
   - `_validation.scss` writes `position: absolute` and `z-index: 5` at lines 21-24.
   - `_input-group.scss:40-42` puts `.input-group .btn` at `z-index: 2`, while the resting control stays at `auto`.
   - So "the one child of that group that rests on a raised stacking level" is the button.

   Attacks that failed:
   - Duplicate names against the region's existing names: none.
   - A group order that differs from R1: none.

   Non-blocking notes:
   - The tooltip ids repeat a word (`open-tooltip-handle-tooltip`). The `checked-group-handle`/`checked-group-feedback` precedent suggests `open-group-handle`/`open-group-tooltip`.
   - "The second group leads with its button" (line 1527) names the group by position. "The button-led group leads…" or "The room leads…" says the same thing by name.

3. **CONFIRMED.**
   - `CaptureSubject` places `'Input group invalid tooltip'` between `button` and `large`, and `'Input group valid tooltip'` between `small` and `validation`. A space sorts before `a`, so that order is alphabetical.
   - The `CASCADE_KEYS` rows are at `tests/setup.ts:908-919` with the claimed selectors and `display`.
   - The capture registry is `CAPTURE_KEYS`, which spreads `...CASCADE_KEYS` at `tests/setup.ts:1280`, so the rows are registered.
   - `bfs-setup.log.txt:91,95` reads `Tests 243 passed (243)` and `test:setup exit=0`.

4. **BROKEN.** The block names no member, and the rest-case title at `integration.test.ts:608` is correct. But three sentences in the rewritten block state rules the registry and the journey do not obey.
   - **(a) `tests/setup.ts:375-378` overclaims.**
     - *Wrong:* it says "a key that paints outside its host's box is framed with the in-flow content its specimen renders beneath it, and the journey reads the key's bottom edge inside the frame's". The journey actually gates that reading on a class list, `copy.matches('.valid-tooltip, .invalid-tooltip')` at `integration.test.ts:660`.
     - *Counterexample:* the `form-floating-filled`, `-disabled`, and `-plaintext` labels paint outside their host `.form-floating`. The shipped `transform: scale(0.85) translateY(-0.5rem)` at `_form-floating.scss:96,100` moves them 6.8 px up, which matches the report's measurement. These keys have no in-flow room and get no reading.
     - *Why it matters:* the prose describes one population and the gate reads another. This is also the second unknown's gap: a later hanging key under another class gets no room or stacking reading, and the exact-keys assertion at lines 710-715 does not require one.
     - *Right:* state one predicate and gate on that same predicate.
       - Prose: "A key the release positions below its host's box is framed with the in-flow content its specimen renders beneath it…".
       - Gate at line 660: derive it from that geometry instead of a class list, with the copy's top at or below its parent's bottom. The floating labels float upward, so they fall outside it.
       - Keep the `requireValue` on the button-led group, so a hanging key with no room fails loudly.
   - **(b) `tests/setup.ts:349-352` generalizes a badge-only rule into a false one.**
     - *Wrong:* "a row beyond a component's first names the host its specimen renders the element in". Many such rows name a modifier or a state, not a host: `.btn-group-vertical`, `.btn-group-sm` (lines 515, 527), `.page-link.disabled` (491), `.spinner-border-sm` (575), `.list-group-item.active` (677), `.btn-close-white` and `.btn-close:disabled` (767, 773), and `.form-select-sm` (965).
     - *Why it matters:* the text before the change scoped this rule to badge rows, where it was true.
     - *Right:* "So a row beyond a component's first names what sets its specimen apart — a modifier, a state, or the host its specimen renders the element in — which is also what that specimen exists to show."
   - **(c) `tests/setup.ts:358` states a count.**
     - *Wrong:* "Two placement rulings were measured…". This is a count, which `AGENTS.md` § Writing forbids. The paragraph inserted at line 375 now reads as a further ruling after it.
     - *Right:* "The placement rulings were measured rather than assumed, and each one is why these frames are shot the way they are."
   - **Unresolved sub-point:** `tests/setup.ts:366` binds the blank-frame measurement to "2026-09-22". Nothing in `.orkestrel/veneer`, `ROADMAP.md`, or the report records when it was taken, so the date rests on the writer alone. Running `git log -S "3500 to 4700" -- tests/setup.ts` in Veneer settles it: the date of the commit that introduced the sentence is the measurement date.

5. **CONFIRMED.** This rests on the assertion shape at `integration.test.ts:702-721` and the shipped rules. The executed readings are the writer's.
   - **Display.** Mutation `display: none` on the tooltip gives `rendered` = `'none'`, which fails `toBe('block')` in each mode. The assertions distinguish it.
   - **Room.** Mutation `padding-bottom: 3rem` adds 48 px. The tooltip hangs at the validated group's bottom plus `margin-top: 0.1rem`, and the frame ends at the bottom of one in-flow group row. So `edge > floor` becomes true and the filter at line 719 reddens. The assertions distinguish it.
   - **Stacking.** Mutation `z-index: 6` on the button: both groups are `position: relative` with `z-index: auto`, so neither opens a stacking context. The button then paints above the tooltip's `5`, `readHit(button)` returns the button, and `hit !== 'tooltip'` reddens. The assertions distinguish it.
   - Rival case: a tooltip that is not rendered also reddens both the stacking and the display readings. A copy scrolled out of the viewport makes `readHit` return `undefined`, which reads as `'nothing'` and reddens rather than passing silently.
   - **Unknown 1:** `readHit` hit-tests the button's centre through the document's `elementFromPoint`, and `shared` asserts that centre lies strictly inside the tooltip's box. Together they meet R1's "a point inside both the tooltip and the following button". Reusing the installed export is the right design.

6. **CONFIRMED.** At `InputGroupSection.test.ts`:
   - Lines 31-40 list both names, and lines 90-108 assert `has-validation`, the tooltip as last child, `aria-describedby` equal to `tooltip.id`, `readStates` = `['described']`, `isRendered`, and `.btn` first with `.form-control` last.
   - The cascade loads in `beforeAll` at lines 14-17, the same shape as `ButtonSection.test.ts:21-24`.
   - The null tooltip query is gone, and the name check at lines 71-74 covers `.form-control, .btn`.
   - Mutation, dropping a specimen: the `toEqual` name list and the `innerHTML` equality both redden. They distinguish it.
   - Mutation, removing the reveal rule: `isRendered` reads `display` through `checkVisibility` and returns `false`, so line 105 reddens. It distinguishes it.

7. **CONFIRMED.**
   - `integration.test.ts:1472-1476` reads the shared-border model, and a search for `outer column` across `tests`, `app`, and `guides` finds nothing.
   - The comment agrees with `_input-group.scss:38-39` and with the guide at `veneer.md:1314`.
   - Non-blocking: "share one line; … paints over the border the two share" says the sharing twice. "…onto the control's trailing border, so the two share one line, and the button's border paints that line until the control is lifted past it" says it once.

8. **BROKEN.** The z-index facts are true (`_validation.scss:24`, `_input-group.scss:42`). The sentence itself is wrong in number and hard to read on the first pass.
   - **Wrong:**
     - "a resting element frame of the `Input group valid tooltip` and `Input group invalid tooltip` specimens" says one frame. The journey writes one frame per specimen: the report's capture table lists `input-group-valid-tooltip--light-390.png` and `input-group-invalid-tooltip--light-390.png`.
     - "each a validated group" calls a specimen one group, but each specimen is two groups.
     - "paints over the button it covers" is circular.
     - "beneath it" has two possible referents.
     - The one sentence carries three ideas, which `AGENTS.md` § Writing forbids.
   - **Why it matters:** this is the guide's product truth, landed verbatim by the Orchestrator.
   - **Right:** land this text instead, after the `Input group button` page-frame sentence:

     > The capture journey writes a resting element frame of the `Input group valid tooltip` specimen and one of the `Input group invalid tooltip` specimen. In each, the validated group's revealed tooltip hangs over the button-led group the specimen renders beneath that validated group. The journey reads that the tooltip ends inside the frame and paints over that group's button, because the tooltip rule writes `z-index: 5` and a grouped button rests at `z-index: 2`.

9. **UNRESOLVED.**
   - By reading the diff: it has no `any`, no `as`, no `!`, and no suppression. The only functions are callbacks passed directly, and `readHit`, `readStates`, `readName`, `isRendered`, and `readSpecimen` are used rather than rewritten. The off-limits files are untouched per the status.
   - The `npm run check` exit code is the only evidence the claim names, and it comes from the writer's report alone. This lane cannot run it. The objective lane's run or the Orchestrator's landing chain settles it.

## Findings outside the claims

- **F1: the visible Input group paragraph misstates the specimens' shape** (`app/browser/constants.ts:1506`).
  - *Wrong:* "…and the tooltip a passing and a failing group hang over the row after them." This says one tooltip and one row shared by both groups. Each specimen has its own tooltip and its own following group.
  - *Why it matters:* the section test asserts this exact string as the rendered `<p>` at `InputGroupSection.test.ts:29`, so the showcase reader sees it.
  - *Right:* "…the feedback a failing group reports under its row, and the tooltip a passing or a failing group hangs over the row after it." This keeps the sentence parallel to its feedback clause.

- **F2: one word, two concepts in one file.** `floor` is the frame's bottom-edge coordinate in the new `hung` map (`integration.test.ts:618`, `672`, `719`). In the same file, `reading.floor` is the frame's bottom-row color (`integration.test.ts:1763`, `1771`, `measureVariation`), and `tests/setup.ts:372` uses "its floor" for that color too.
  - *Why it matters:* `AGENTS.md` § Design laws, "One concept, one term".
  - *Right:* rename the `hung` field, for example `limit` (`reading.edge > reading.limit`), and update lines 618, 672, and 719.

## Referrals

- **To the objective lane, on the `'nothing'` fallback:** does it breach `AGENTS.md` "Absence is `undefined`"? The `hit` field (`integration.test.ts:674`) mixes an identity label (`'tooltip'`), a diagnostic (`outerHTML`), and an absence sentinel (`'nothing'`).
- **To the objective lane, on the point-in-rectangle test:** does an installed `@orkestrel/test` export already do the inline check at `integration.test.ts:673`?
- **To the Orchestrator, on one rationale worded three ways:** the unit generalized "one of its role links" at `integration.test.ts:637-639`. `tests/setup.ts:294` (`CascadeKey` remarks) and `guides/veneer.md:3923` still say "one role link", and `integration.test.ts:610` still says "the Layout table alone" while `setup.ts:347` now says "one table". None of these is false, but the one rationale now has three homes that disagree in wording. Name a carrier.
- **To the Orchestrator, on the guide anchor:** after the `bft` rewrite of § Input group classes lands, check that the claim-8 sentence's anchor, the `Input group button` page-frame sentence at `veneer.md:1356-1358`, survives.

## Attacked and held

- The rest-case title's promise matches its equality assertion at `integration.test.ts:686`.
- The `beforeAll` comment's voice matches the `ButtonSection` precedent.
- The `VALIDATION_SPECIMENS` rewrite dropped the "other partials" clause without losing the reason.
- The spinner paragraph names a declined non-member, which is permitted.
- The `display: none` generalization at `setup.ts:392-395` holds, because `badge-collapsed` is the only row it describes.

VERDICT: FAIL 4, 8, 9; outside the claims: F1, F2
