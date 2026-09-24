1. **Scope — CONFIRMED.** The `/home/user/scaffold/.orkestrel/veneer/units/pf-status.txt` file lists these five `M` rows at lines 1–5 and nothing else:
   - `tests/app/browser/integration.test.ts`
   - `tests/setup.test.ts`
   - `tests/setup.ts`
   - `tests/setupBrowser.test.ts`
   - `tests/setupBrowser.ts`

   The `/home/user/scaffold/.orkestrel/veneer/units/pf-shared.patch` file has one `--- a/guides/veneer.md` header at line 1. None of these paths is on the off-limits list in `b-cross-pf-brief.md` (lines 97–100). I rule the Orchestrator's apply check correct: nothing I read contradicts it.

2. **R1: the bounded document — CONFIRMED.**
   - **Mechanism.** Each case is in `/home/user/veneer-pf/tests/setupBrowser.ts`. The `#exclude` method (around lines 682–691) skips a child that contains the subject or the frame, skips a child already hidden, and returns only the children it hid. The outer `finally` (lines 674–676) removes `hidden` from exactly those children.
   - **Mutations and the cases they redden** (`pf-mutations.log.txt`):
     - no bounding, lines 1–17: cases 432, 487, and 514 fail.
     - the subject's own child hidden, lines 19–34: 432 and 586.
     - element frames left unbounded, lines 59–74: 487 and 514.
     - restoration outside `finally`, lines 126–142: 565 alone.
     - a restoration that clears every `hidden` attribute, lines 144–158: 565 alone.
   - **Why the assertions distinguish each mutation.**
     - `reading.shown` must equal `[holder]` in case 432 and `[]` in case 487, so a missing or over-broad bounding changes the value.
     - Case 565 mounts a pre-hidden `Earlier` section. The clears-every mutation unhides it, and `found` stops matching.
     - Case 565 also takes the refused path. That path throws before the non-`finally` restore runs, so restoration outside `finally` leaves the sections hidden.
   - **Evidence check.** The per-mutation logs are real Vitest output, not prose. For example, `pf-mutation-no-bounding.log.txt:83` holds `AssertionError: expected [ …(55) ] to strictly equal [ <section …> ]`.

3. **R2: the region at the shot's geometry — CONFIRMED.**
   - **Mechanism.** The `#settle` method in `setupBrowser.ts` (around lines 697–711) stages the pane at the viewport, then at `max(measureContent(), height)`. It reads once more and throws if the reading disagrees.
   - **Mutations.**
     - Region read at the viewport pane (`if (height > 0) return height`, log lines 76–91): case 514 fails because `reading.pane` must equal `reading.content`, which is larger than the viewport.
     - Region read before bounding (log lines 36–57): cases 432 and 514 fail on the region and on `shown`.
     - Settle refusal dropped (log lines 160–174): case 586 fails on `rejects.toThrow('…never settled')`.
   - **Wording defect.** The error message overstates what the code checks; see finding F3.

4. **R3: the area guard — CONFIRMED.**
   - **Constant.** In `/home/user/veneer-pf/tests/setup.ts`, line 294 of the diff (around line 36 of the file) reads `export const FRAME_AREA = 1280 * 41954`. The export-list case gains `'FRAME_AREA'` in `tests/setup.test.ts`, diff line 272.
   - **Case 542.** It places at exactly `down = FRAME_AREA / 1280`. It refuses `down + 1` with `Frame "base" is 1280x41955 device pixels`, and it asserts that `scenarios` and `placements` hold `capped-container` alone.
   - **Mutations.**
     - `>=` (log lines 93–107): case 542 alone fails, because the at-area placement throws.
     - Refusal dropped (log lines 109–124): cases 542 and 565 fail.
     - Unexported (log lines 176–190): the `test:setup` export-list case fails.

5. **R4 to R6: the placements — UNRESOLVED.**
   - **What held.**
     - **The `showcase` frame.** It is still a page frame (`integration.test.ts:250`). `showcase--light-1280.png` and `showcase--light-390.png` show the heading, the Dark mode control, and the region line alone.
     - **The page-strip frames.** Both are element frames of the stage (`:898`, `:924`). `page-strip-hover--light-390.png` and `page-strip-focus--light-390.png` show the padded stage.
     - **Primary lift and other pointer lifts.** The Primary host is lifted at lines 541–550. Every other hover or hold placement follows a `document.body.prepend(lifted)` call, at lines 1275, 1357, 1447, 1547, 1823, and 1993.
     - **Readings after the shot.** Each case takes one, for example lines 581–585 and 608.
   - **What is undecided: whether the reading after the shot guards what R6 needs it to guard.**
     - Mutation: drop the Primary lift, so the host stays in the Buttons section.
     - During the shot, R1 hides the Showcase region, so the host moves up by 21 CSS pixels (region height in `pf-frames.log.txt:3`) and leaves the pointer.
     - The outer `finally` in the `FrameManager` class (`setupBrowser.ts:674–676`) lays every section out again before `place` returns.
     - The re-staging at `integration.test.ts:581` therefore finds the host back under the pointer, so `framedHover` and `framedPaint` would pass while the written frame shows the rest fill.
     - By derivation, the assertions do not distinguish this mutation. The unit ran no un-lift mutation.
   - **What settles it.** Apply that mutation and run the `light-1280` capture. If the case stays green, this claim is BROKEN. I refer the run to the objective lane (see F2).

6. **The captures — CONFIRMED.**
   - **Portfolio case.** It passes at every variant: `pf-capture-{light-390,dark-390,light-1280,dark-1280}.log.txt:79` each read `Tests  45 passed (45)`, `exit: 0`.
   - **Arrival frame.** `showcase--light-1280.png` is 1280 × 800 (`pf-frames.log.txt:21`, and I viewed it).
   - **Bottom offcanvas at 390.**
     - I read the top border of the panel in `bottom-offcanvas--light-390.png` by eye at about row 131 of the 392-row frame. It matches the region's `y` value of 130.8 (`pf-frames.log.txt:4`).
     - The bottom edge of the panel paints nothing distinct in the light or the dark frame.
     - The height of 253 rests on a cross-frame check. `bottom-offcanvas--light-1280.png` puts the top border at about row 144. The difference of 13 equals 0.3 × (844 − 800). Both frames therefore fit a 30vh panel with a common bottom at row 384.
     - Correction to the report: `b-cross-pf-report.md:259–260` says "top border … row 131 of the 392 rows, so the panel is 253 rows tall". That doesn't follow, because 392 − 131 = 261. The panel ends 8 rows above the bottom of the frame. The report also retains no output from the `pf-png.py` instrument.
   - **Frames the report names.**
     - `page-strip-focus--light-390.png` shows the ring around Page 1 whole inside the stage.
     - `range-focus--light-390.png` shows the heading, the Dark mode control, the Form range text, and the sliders with a ring on the thumb, and no region line.
     - `primary-hover--light-1280.png` shows the Primary host alone. By eye its fill is darker than the resting Toggle and Label hosts in `primary-focus--light-1280.png`. The "lifted" part isn't visible in an element frame; the source confirms it.

7. **Prose (R8) — BROKEN.**
   - **7a. "Opening" has two meanings.** This breaks the one-concept-one-term law.
     - Where it includes the region: `/home/user/veneer-pf/tests/setup.ts:491` ("page frame of the page's opening") and `:496–497` ("the page's opening alone: the heading, the Dark mode control, and the region").
     - Where it excludes the region: the guide patch (`pf-shared.patch:24`) defines the opening as "the heading and the Dark mode control". `setupBrowser.ts:555` and `:643`, and every rewritten integration comment ("the page's opening and the Buttons section" at `:418`, and at `:822`, `:1073`, `:1138`, `:1485`, `:1764`, `:1909`, `:1944`, `:2074`), use the same meaning.
     - The frames show that the region is not part of the opening. `primary-focus--light-1280.png` and `range-focus--light-390.png` omit the region line, and `showcase--light-1280.png` shows it at y 78–99.
     - Under the guide's own definition, `pf-shared.patch:25` is false: "the arrival frame's subject is the Showcase region, so that frame carries the opening alone". The frame carries the opening and the region.
     - Fix: define the opening once as the heading and the Dark mode control.
       - Set `setup.ts:491` to "…as a page frame of the page's opening and the Showcase region".
       - Set `:496` to "So the arrival frame carries the page's opening and the region alone".
       - Set the guide sentence to "so that frame carries the opening and the region alone".
       - Recast `pf-shared.patch:24`, which reads as a list of three items, as "the page's opening (the heading and the Dark mode control) and the one section holding its subject".
   - **7b. A stale "covers the page" sentence.** `/home/user/veneer-pf/tests/app/browser/integration.test.ts:1020–1021` still reads "which is why this frame covers the page" for the `check-group-focus` page frame. The report's sweep pattern (`b-cross-pf-report.md:216`) did not reach this wording, and it is the only focus page-frame comment left unrewritten. Fix: "which is why this frame is a page frame, holding the page's opening and the Check group section, and declares the label as its own region."
   - **7c. A rewritten comment states an unmeasured fact as present.** `integration.test.ts:1071–1073` says an in-place element frame "comes back blank, which is the measurement the `CASCADE_KEYS` table records". The table as rewritten (`setup.ts:531–536`) records a pre-bounding measurement and says "No reading repeats it with the other sections out of the layout." Fix: "…came back blank when it was measured before a placement bounded the document, the measurement the `CASCADE_KEYS` table records."
   - **7d. `{@link FRAME_AREA}` has no following noun** at `setupBrowser.ts:571`, `:614`, and `:639`. This breaks the writing rule and item 1 of `w2-w3-note-1.md`. Fix: "the {@link FRAME_AREA} constant".
   - **What held.** The `CASCADE_KEYS` page-frame paragraph, the `SHOWCASE_KEYS` duplication sentence, the rewrite of the "first pixel" sentence (it matches `integration.test.ts:2366–2372`), and the guide sentences on the staged height and the area refusal all read true.

8. **Law and report — BROKEN.**
   - **Code law.** I found no `any`, no `as`, no `!`, and no suppression in the changed lines. The object returned by `recordPlacements` holds methods, which matches the returned object in `recordCalls` (`setupBrowser.ts:1104–1113`). The recorder implements an installed interface minimally, which `.claude/rules/tests.md:30` admits.
   - **Temporal word.** `b-cross-pf-report.md` uses the banned word "now" at line 69 ("is now recorded") and at lines 139, 141, 145, and 157 ("now say" or "now says").
   - **Code tokens with no noun.** The report leaves code tokens bare at line 54 (`#exclude` and `hidden`), line 57 (`#settle`), line 60 (`#admit`), and line 131 (`toggle-pressed`).
   - **Gate results.** Lint and check print no result line (`pf-gate-lint.log.txt`, `pf-gate-check.log.txt`), so the report's paraphrase is acceptable.
   - **Counts the report states, for the record:**
     - `Tests  6 failed | 67 passed (73)` and `Tests  73 passed (73)`.
     - Red runs per mutation:
       - no bounding: 3 failed
       - the subject's own child hidden: 2 failed
       - the region read before bounding: 2 failed
       - element frames left unbounded: 2 failed
       - the region read at the viewport pane: 3 failed
       - the comparison off by one: 1 failed
       - the refusal dropped: 2 failed
       - restoration outside `finally`: 1 failed
       - a restoration that clears every `hidden`: 1 failed
       - the settle refusal dropped: 1 failed
       - `FRAME_AREA` unexported: 1 failed
     - `Tests  287 passed (287)`, `Tests  73 passed (73)`, `Tests  19 passed (19)`, and `Tests  45 passed (45)` at each variant.
     - "found one observer" (line 36) and "stopped once" (line 4).
     - Diffstat line counts 128, 1, 49, 183, and 185.

**Findings outside the claims**

- **F1. Stored state that duplicates `#placements`.** The move places `this.#scenarios.push(scenario)` and `this.#placements.push(...)` back to back (`setupBrowser.ts:668–669`), and neither push can throw. So `#scenarios` (`:583`) always equals `#placements.map((placement) => placement.scenario)`. Case 542 asserts both lists separately and gets the same list. This breaks the "Derive state" law. Fix: drop `#scenarios` and derive the `scenarios` getter from `#placements`. Keep the phrase "admitted for placement" in one getter's doc and point the other getter's doc at it.
- **F2. Readings after the shot no longer happen in the shot's layout.**
  - The comments at `integration.test.ts:571–580`, `:1464–1469`, and `:1834–1836` say the re-read happens "in the layout the shot was taken in". The outer `finally` in the `FrameManager` class (`setupBrowser.ts:674–676`) lays every section out again before `place` returns, so the re-read sees a different document.
  - Fix: say that nothing above a lifted specimen is taken out, so the specimen's position is the same at the shot and at the re-read.
  - Add a structural guard before each pointer placement, `expect(document.querySelector('main')?.contains(host)).toBe(false)`, so an in-place pointer placement reddens.
  - **Referral to the objective lane:** run the un-lift mutation named in claim 5.
- **F3. "never settled" overstates one re-read.** The `#settle` method throws after a single disagreement (`setupBrowser.ts:705–708`).
  - Example: a kept section of `height: calc(50vh + 1000px)` on an 844-pixel viewport stages at 1422, reads 1711, and is refused as "never settled". Staged repeatedly, the same document converges at 2000.
  - Fix: word the message "did not settle: its document reached … on a …-pixel pane". Change the class TSDoc phrase "grows with every pane it is staged at" (`:568`) to "changes height when the pane is staged at it".
- **F4. Bare code tokens in added prose that claim 7 doesn't list.** "writes through `captureFrame`" at `setupBrowser.ts:511` should be "the installed `captureFrame` function". "the panel's `max-height` would stretch" at `setupBrowser.test.ts:508` should be "the panel's `max-height` limit".

**Attacked and held**

- **Primary host restore.** The lift is put back through the `onTestFinished` hook (`integration.test.ts:547–550`), while other lifts use `try`/`finally`. This is inconsistent but correct, because the hook runs on failure too. The unit's stated reason, a smaller merge, is a process reason.
- **Page-frame sentences that remain.** `readRegion` still says a page frame "covers the scrolled document" (`setupBrowser.ts:169`, `setupBrowser.test.ts:319`). That stays true because the document itself is bounded.
- **Document-height comments.** The comments that call the document "over 8000 pixels tall" (`integration.test.ts:1437`) describe the document at rest, which is 53410 to 57705 pixels tall (`b-cross-pf-report.md:23`).
- **"Moves nothing".** The sentence "The capture's own staging … moves nothing" at `integration.test.ts:559–560` holds for the lifted host. The bounded content height is below the viewport, so the capture stages the viewport it finds.

**Dispatch note.** The brief does not tell this lane that its own engine, Opus 5.5, wrote the unit and that it must attack harder, as the `orkestrel-falsify` skill requires. The claims file names the author at line 9, and this lane attacked accordingly.

VERDICT: FAIL 5, 7, 8; outside the claims: F1, F2, F3, F4