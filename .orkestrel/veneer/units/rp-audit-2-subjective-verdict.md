**Lane: subjective** (Opus 5.5, reviewer). I stayed in this lane throughout, and I ran nothing. I read the run evidence from the logs the dispatch supplied.

**Dispatch note.** The workflow relayed a user request to explain the "appearance ruling (P7 dark contrast, P8 14 px labels)". This audit does not cover that question, and none of the evidence mentions P7 or P8. The Orchestrator still owes the user that explanation.

## Per-claim verdicts

1. **CONFIRMED. Scope and gates.**
   - `/home/user/scaffold/.orkestrel/veneer/units/rp-2-status.txt:1-4` lists four files and nothing else: `guides/veneer.md`, `tests/app/browser/integration.test.ts`, `tests/setup.ts`, and `tests/setupBrowser.ts`.
   - `rp-instruments/rp2-format.log.txt` shows `npm run format:check` and ends `EXIT 0` at line 9.
   - `rp2-lint.log.txt` shows `npm run lint:check` and ends `EXIT 0` at line 5.
   - `rp2-check.log.txt` shows `npm run check` running the chained `tsc` and `vue-tsc` projects and ends `EXIT 0` at line 29.
   - All three ran as package scripts, not direct binaries, which settles the round-1 gap.

2. **CONFIRMED. The census.**
   - `rp-2.diff:92-104` holds the only `tests/setup.ts` hunk. It changes the one `CASCADE_KEYS` remarks sentence (worktree `tests/setup.ts:627-629`).
   - No capture state, `DRIVEN_KEYS` row, or exemption line appears among the removed or added lines.

3. **CONFIRMED. The case proves the park.**
   - Structure, in worktree `tests/app/browser/integration.test.ts`:
     - The lift is unpadded (`{ padded: false }`, line 907).
     - The copy's origin is asserted (lines 897-898).
     - The capture-phase `mouseover` recorder is armed at lines 886-894, before `releasePointer` at line 895.
     - `stagePane` runs at line 899, and `releasePane` runs in the `finally` block at line 901.
     - `entered` and `:hover` on the copy are asserted at lines 904-905.
   - Runs:
     - Green: `rp2-green-light390.log.txt:77` and `rp2-green-dark1280.log.txt:77` each read "1 passed".
     - Control on 0.0.23: `rp-control-4.log.txt:1-4` confirms `test=0.0.23` with the active pre-bundle parking at the origin (`park-at-origin=1`, `park-outside=0`). `rp-control-4-light-390.log.txt:79-90` and `rp-control-4-dark-1280.log.txt:79-90` each fail at `expect(entered).toBe(false)`, line 904.
     - Writer's red run: `rp2-red-light390.log.txt:79-90` fails at line 904.
   - Mutations:
     - Park at the origin with staging (0.0.23): the case goes red at line 904 in both journeys, so the `entered` assertion distinguishes this mutation.
     - Hover at (1, 1) in place of the release: red at line 904, so the assertion distinguishes this mutation too.
     - Padded lift: `box.top` would not be `0`, so lines 897-898 would fail.
     - Delete `stagePane`: under 0.0.23 the case would pass, because `park2-readings.md:16` records no entry without staging. The staging line is load-bearing, and finding F1 covers that.
   - The `:hover` assertion at line 905 never ran in any red run, because every red stops at line 904. See Referral R1.

4. **BROKEN. The padding prose.**
   - **Guide** (`/home/user/veneer-rp/guides/veneer.md:10556-10558`, the "The journey shoots each resting element frame…" sentence):
     - The sentence reads "lifted to the document's start below a padded top, after releasing the pointer, so no resting frame carries a hover paint."
     - One sentence joins the padding and the release under a single consequence clause. It therefore still gives the padding a pointer consequence, which `rp-repin-brief-2.md` item 3 bars ("No sentence may link the two").
     - It also states neither role: it has no gutter clause and no "parks the pointer outside the page".
     - The report's statement that "the padded-top clause [is] left as a plain fact, carrying no pointer consequence" (`rp-report-2.md:33-37`) is wrong.
   - **Census remarks** (`/home/user/veneer-rp/tests/setup.ts:627-629`, the `CASCADE_KEYS` remarks):
     - "Each copy is lifted below a padded top." states only that the padding exists, not its role (the gutter depth).
     - The release sentence gives a consequence but never says the release parks the pointer outside the page.
     - Placed straight after the hover sentence, the bare padding sentence still invites the pointer inference.
   - **Cascade-key comment** (`integration.test.ts:721-723`): this site does separate the two roles. Finding F2 covers its placement.
   - **What right looks like, at both broken sites:**
     - A release sentence: "The journey releases the pointer before these shots, and the release parks the pointer outside the page, so no resting frame carries a hover paint."
     - A separate padding sentence: "Each copy is lifted below a padded top, and the padding is deeper than the widest negative gutter a specimen's first row pulls up by, so no row starts above the document."

5. **CONFIRMED. Prose law.**
   - One origin, one term: the title (line 871) and the comment (lines 872-874) each name "the document's origin" and no other origin.
   - Tokens take nouns: "the `focus` method" appears at `guides/veneer.md:10590` and `tests/setupBrowser.ts:992`.
   - No counts and no banned terms appear in the changed lines of `rp-2.diff:9-12, 20-23, 35-41, 49-52, 100-103, 115-122`.
   - The release wording "outside the page" is used consistently; the "off the page" variant is gone.
   - The title and comment wording defect is an accuracy defect, not a prose-law one, so it sits under finding F3.

6. **CONFIRMED. Kept proofs.**
   - Every removed line in `rp-2.diff` is comment or guide prose (lines 9-10, 20-21, 35-38, 100-101, and 115-118).
   - `await releasePointer()` stays as context at `rp-2.diff:42`.
   - The cascade `entered` recorder is untouched at worktree `integration.test.ts:709-710, 797-804, and 823`, and so is the `focus` recorder at `tests/setupBrowser.ts:1025-1040`.

## Findings outside the claims

- **F1: the case never says why it stages the pane.**
  - Where: `integration.test.ts:871-874` (title and comment) and line 899 (`stagePane`).
  - What is wrong: staging is the adverse condition that separates the parks. Without it, 0.0.23 records no entry (`park2-readings.md:16` and line 27). Yet neither the title nor the comment mentions it, so the `stagePane` call looks like incidental setup.
  - Why it matters: a maintainer who deletes the call as clutter leaves a case that passes on the defective park. The sibling cases state the staging's role explicitly (lines 551-557 and 572-576).
  - What right looks like: add a sentence such as "The pane is staged after the release, because staging repositions the document under a pointer that does not move with it, and a pointer parked at the origin would then enter the copy." Consider naming the staging in the title, for example "…from the parked pointer while the pane is staged, on…".
- **F2: the padding sentence sits in the release comment.**
  - Where: `integration.test.ts:721-723`.
  - What is wrong: now that the two roles are separate, the padding sentence no longer relates to the `releasePointer` call it sits above (line 724). The padding is applied at line 742 (`build('div', { classes: 'pt-5' })`).
  - What right looks like: move the padding sentence to line 742, and name that element for itself ("the lifted element's top padding") rather than "the wrapper's", which is the `FrameManager.lift` term.
- **F3: the title and comment misdescribe which element touches the origin.**
  - Where: `integration.test.ts:871-873`.
  - What is wrong: the title says "a lifted copy whose first element touches", but the copied button has no child element. The comment says the lift places the copy "as the document's first element", but `FrameManager.lift` prepends the wrapper and puts the copy inside it (`tests/setupBrowser.ts:962-963`).
  - What right looks like: title "…on a lifted copy whose box touches the document's origin". Comment: "An unpadded lift puts its wrapper first in the document with the "Primary" button's copy as its only child, so the copy's box touches the document's origin."

## Attacked and held

- I checked whether the `finally` block departs from sibling shape. It does not break convention: the harness releases the pane in its `afterEach` hook as well as in the case, by stated design (`integration.test.ts:228-231`). Keeping the recorder armed across `releasePane` makes the case stricter, not weaker.
- The recorder counts the wrapper itself as an entry, unlike the `focus` recorder (`setupBrowser.ts:1033`). Because the wrapper is unpadded, this is also stricter and correct.
- Dropping the `parked` census state and not writing a frame retires round-1 findings O1 and F2. The new case writes no frame.

## Referrals (objective lane)

- **R1.** Can `expect(clone.matches(':hover')).toBe(false)` at line 905 fail independently of line 904? No run reached it red. The question is whether a pointer at the origin still hovers the copy after `releasePane` restores the fitted layout.
- **R2.** Is the `pt-5` top padding at `integration.test.ts:742` actually deeper than the widest negative gutter a specimen's first row pulls up by? The rewritten comment at line 722 states this, and I did not verify it.

VERDICT: FAIL 4; outside the claims: F1, F2, F3
