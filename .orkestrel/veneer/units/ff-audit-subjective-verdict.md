<!-- Subjective lane: reviewer on Opus 5.5, workflow wf_9bef6fe3-fa2, brief ff-audit-reviewer-brief.md. -->

1. **Scope — CONFIRMED.** `ff-status.txt:1-3` lists only `tests/app/browser/integration.test.ts`, `tests/setup.test.ts`, and `tests/setup.ts`. `ff-shared.patch` touches only `guides/veneer.md`. It changes prose paragraphs at the § Form control, select, check, range, input group, and Tests hunks and no ledger table row. No SCSS partial, `tests/setupBrowser.ts` file, or `app/**` file appears in the status. The brief granted those files with qualifiers (`b-focus-frame-brief.md:71-73`), and the unit added exports beyond them. See R3.

2. **P1 — CONFIRMED.**
   - The worktree `integration.test.ts:254` is the only remaining `FRAMES.page(` call, and it places `showcase`.
   - Each converted case lifts its specimen into a `p-3` wrapper with `tabindex="-1"`.
   - Each case asserts a reach above 0 and an empty `cropped` list. The asserting lines are `ff.diff:130-131, 285-286, 380-381, 606-607, 687-688, 754-755, 834-835, 923-924, 1030-1031, 1125-1126, 1204-1205, 1304-1305, 1406-1407, 1484-1485, and 1579-1580`.
   - The range case asserts a reach of 0 on the host and checks its region with a reach of 0 (`ff.diff:460-466`).
   - The row, specimen, and label regions are checked beside the ring (`ff.diff:1007-1010, 1114-1117, 1292-1295`).
   - Mutation: `const shot: HTMLElement = lifted` becomes `specimen`. The mutated run failed with `expected [ 'top', 'right', 'bottom', 'left' ] to strictly equal []` (`ff-case-mut-unpadded-dark-1280.log.txt:81`), the restored run passed, and the assertion distinguishes the two.
   - Before frames: each `ff-baseline/*-focus--dark-1280.png` frame I opened is a 1280×800 page frame. The ring's left arm sits on x 0 in the primary, valid, invalid, range, floating, select, text, close, check box, input group, nav, accordion, and default ring frames.

3. **Helpers — CONFIRMED.**
   - The export list names both helpers (`ff.diff:1609-1610`), and both carry TSDoc (`ff.diff:1734-1802`).
   - Mutations are logged in `ff-mutations.log.txt`:
     - reach-outline reddens the outline proof and the combined proof (lines 1-8).
     - reach-inset reddens the shadow proof (lines 10-16).
     - cropped-left reddens the crossed-edges proof (lines 18-24).
     - Helper bodies that throw reddened `5 failed` before the implementation (lines 55-59).
   - Each proof's assertions separate its named mutation from the passing case. The color-syntax half of the shadow proof has no distinguishing mutation. See R2.

4. **P3, the radio — CONFIRMED.**
   - Mutation: the `removeAttribute('name')` loop is removed (`ff.diff:172-174`).
   - The red run failed with `expected [ 'light-1280|vertical-group' ] to strictly equal []` (`ff-case-radio-red-dark-1280.log.txt:80`), and the green run passed (`…-green-…:77`). The `switched` assertion distinguishes the stolen state.
   - Frames: `ff-baseline/vertical-group--dark-1280.png` shows Column center unfilled. `ff-final/vertical-group--dark-1280.png` and `--light-390.png` show it filled.

5. **P3, the pointer — UNRESOLVED.**
   - The logged red (`ff-case-hover-red2-dark-1280.log.txt:80`, `["Row copy"]`) came from the page-frame form with the watcher over the section. That instrument no longer exists.
   - The final watcher is scoped to the lifted specimen (`ff.diff:338-346`). Mutation: delete `await releasePointer()` at `ff.diff:337`.
   - `applyTheme` leaves the pointer at the Dark mode control's centre (`setupBrowser.ts:1287`), about (51, 60) in the baseline frame. The lifted wrapper is 67 px tall, with the specimen at y 16 to 50 (`ff-final/check-group-focus--dark-1280.png`). So the parked pointer most likely rests in the bottom padding, and the watcher records nothing whether or not the release runs. That reasoning comes from reading the frames, not from a run.
   - To settle it, run the converted case at dark-1280 with the release deleted and read `entered`.
   - The rest of the claim holds: the final frames show no hover face.

6. **P2 — CONFIRMED.** The given ruling that P2 needs no cascade change is upheld.
   - Computed readings are in `ff-out-P2-VENEER-*.json` and `ff-out-P2-RELEASE-18660.json`. The ring is a 25% role triplet in both, 3px against 4px, and the width departure is the recorded `tokenized` row (`guides/veneer.md:8159-8166`). The skip link and list-group row show an identical `auto 1px 1px rgb(16, 16, 16)` outline.
   - Dark drive evidence:
     - Release, press then Tab: `differing` 1160 (`ff-out-P2-RELEASE-EXTENT.json:32`).
     - Release, press then scripted focus: 0 (`ff-out-P2-RELEASE-EXTENT.json:48`).
     - Veneer, dark scripted focus: reach `null`, while an inline `2px solid` outline paints 3 (`ff-out-P1-EXTENT.json:135-139, 191-196`).
   - Tab reaches the link at `ff.diff:1372-1374` and the row at `ff.diff:805`. `ff-final/skip-link-focus--dark-1280.png` and `ff-final/list-group-actions-focus--dark-1280.png` show each outline.
   - Two cells in the report's P2 table (`b-focus-frame-report.md:108-109`) rest only on the report. These are the "No pointer press" row and the light "press then scripted" cell. The retained `ff-release-extent.test.ts:29` cannot produce a no-press row. See R4.
   - The given ruling that converting `list-group-actions-focus` is in scope is upheld. `ff-baseline/list-group-actions-focus--dark-1280.png` shows no outline, and the row sits at x 0.

7. **Frames — CONFIRMED.** I opened every `ff-final/*--dark-1280.png` and `*--light-390.png` frame, and the matching `tmp/capture/states/` copies for the P3, P2, and primary scenarios.
   - Each frame shows its ring or outline whole inside the padding: the primary, valid, invalid, check group, range thumb, floating, select, text, close, check box, input group, nav, accordion, skip link (wrapped at 390), navbar toggler, default ring, danger role ring, and list-group row.
   - The dark valid and invalid rings are faint but whole.
   - `check-group-focus--dark-1280.png` shows no hover face on any button. The vertical-group frames show Column center filled.

8. **Law and report — BROKEN.**
   - **Input:** `tests/setup.test.ts` holds inline case matrices: the `shadows` map (`ff.diff:1619-1629`), the `outlines` table (`ff.diff:1637-1643`), and the `worn` table (`ff.diff:1659-1662`). This breaks `.claude/rules/tests.md:187` ("Data tables and case matrices belong in a setup file") and `w2-w3-note-1.md` item 2.
   - **Fix:** move each table into `tests/setup.ts` as a frozen, exported constant, and have each test iterate it.
   - The other law items hold. The diff adds no `any`, no `as`, no `!` assertion, no suppression, no mock, and no nested function; the added arrow callbacks are all passed directly as arguments.
   - **Counts the report states:**
     - The diffstat `3 files changed, 1079 insertions(+), 323 deletions(-)` (line 24).
     - Run results: `304 passed (304)`, `5 failed | 299 passed (304)`, `47 passed (47)` twice, and `19 passed (19)`.
     - "both" (line 3) names its members and is permitted.
     - "A second copy" (line 33) is an ordinal.
     - "a pair of capture frames" (line 84) and "two-frame" (line 104).
   - **Temporal words:** "earlier" (lines 50 and 132), "later edits" (line 132), "first" (lines 128, 146, and 156). None of the banned words appear.
   - **Code tokens left without a noun:**
     - Line 7: `tabindex="-1"`.
     - Line 8: `switched`.
     - Line 13: `waitForAnimations`.
     - Line 27: ` M`.
     - Line 33: `checked: false`.
     - Line 36: `light-1280|vertical-group`.
     - Line 43: `applyTheme` and `:hover`.
     - Line 44: `releasePointer`.
     - Line 47: `["Row copy"]`.
     - Line 54: `cropped` and `[]`.
     - Line 81: `box-shadow`.
     - Line 85: `cropped`.
     - Line 104: `ff-release-extent.test.ts`.
     - Line 112: `:focus-visible`.
     - Line 113: `applyTheme`, `releasePointer`, `link.focus()`, and `{ArrowRight}`.
     - Line 128: `PATH`, `PLAYWRIGHT_BROWSERS_PATH=…`, the `ff-capture.sh` path, and `npm run build:src`.
     - Line 130: `npm run test:setup`.
     - Line 153: `tabindex="-1"`.
     - Line 155: `traverseAccessible`.
     - Line 156: `{ArrowRight}`.
     - Line 157: `list-group-actions-focus`.

**Findings outside the claims**

- **F1 — One reading, several mechanisms.**
  - **What is wrong:**
    - The unit moved the ring reach and crop reading into the `computeRingReach` and `computeCroppedEdges` helpers. The `nav-underline-focus` case, the pattern the brief named, still keeps its private copy (`integration.test.ts:2444` `reach = Math.max(...ring.matchAll(...))`, `:2451-2456` `inside = [...]`).
    - The `page-strip-focus` padded frame (`:1007`, `:1069`) has no crop reading at all.
    - The lift, wrap, place, and crop block is repeated in every converted case, from `ff.diff:93-125` through `ff.diff:1535-1573`, with padding variants `p-3`, `p-2`, and inline `padding: 1rem`.
  - **Why it matters:** this breaks `AGENTS.md` § TTTDD step 3 and `tests.md:183-184, 190`. A padded focus frame is one placement scope, but it lives as repeated copies rather than as a named mechanism. `FrameManager` already names each frame scope at the call site through its `place` and `page` methods (`setupBrowser.ts:649-651`).
  - **What right looks like:** a focus-frame placement in `tests/setupBrowser.ts`. It lifts the specimen into one padded wrapper, places the frame, restores the specimen in `finally`, and returns the reach and cropped edges. Every focus case calls it, including `nav-underline-focus` and `page-strip-focus`. That file is off-limits to this unit, so a carrier must be granted it. See R3.
- **F2 — One concept, several names.**
  - **What is wrong:**
    - The padded wrapper is named `lifted`, `wrapper` (`ff.diff:1081`, `:1258`), and `padded` (`:876`, `:1447`).
    - The placeholder comment node is named `marker` or `anchor` (`:874`, `:1445`).
    - A `shot` variable aliases each wrapper (`:99` and every case).
    - In the input group and accordion cases, `lifted` means a z-index string (`:1087`, `:1264`), next to cases where `lifted` is the wrapper element.
  - **Why it matters:** this breaks `AGENTS.md` § Design laws ("One concept, one term").
  - **What right looks like:** one name per concept. The F1 helper removes most of these names.
- **F3 — Code tokens without a noun in added comments and guide prose.**
  - **Where:** `:focus-visible` at `ff.diff:233, 318, 433, 543, 645, 717, 800-801, 966-967, 1351-1352`. `readRing` at `ff.diff:451`. `:focus-visible` at `ff-shared.patch:93`.
  - **Why it matters:** this breaks `w2-w3-note-1.md` item 1.
  - **What right looks like:** "the `:focus-visible` pseudo-class" and "the `readRing` function".
- **F4 — Unwrapped guide lines.** `ff-shared.patch:34` and `:61` run to about 150 and 140 characters. The rest of the guide wraps at 100 (`.oxfmtrc.json` `printWidth`). Reflow both paragraphs.
- **F5 — TSDoc overstates a measurement.** The `computeRingReach` remarks say the outline "measured 2 CSS pixels past the link's box" (`ff.diff:1747-1749`). The probe measured 1.59 left, 1.64 right, and 2 on top and bottom (`ff-out-P1-EXTENT.json:23-28`). Write "at most 2 CSS pixels".

**Referrals**

- **R1, to the objective lane.** The fix for the P2 drive cause has no test that can fail. The P2 readings show that a scripted focus after a press leaves the computed outline and `:focus-visible` identical to Tab (`ff-out-P2-VENEER-*.json:223-239, 257-273`). Mutation: revert the skip link case to `link.focus()` (`ff.diff:1371-1372`) and the list-group case to `host.focus()` (`ff.diff:804-805`). Every assertion passes, because the reach of 2 comes from computed style, while the frame loses its outline. The pixel-diff instrument that settled P2 was not adopted as a test.
- **R2, to the objective lane.** The `computeRingReach` helper's parenthesis-aware split and color-function stripping (`ff.diff:1760-1765`) look undistinguished by any proof case. A plain `split(',')` with no `.replace` appears to yield the same value for every row in `ff.diff:1619-1629`, because no computed color serializes a number followed by `px`. This was traced by hand, not run.
- **R3, to the Orchestrator.**
  - The brief granted `tests/setup.ts` only for "registry rows and TSDoc a converted placement makes false", and `tests/setup.test.ts` only "where a registry change makes a case false". The unit added a type, helpers, and new proofs there. Rule on whether the grant covered them.
  - The F1 fix needs `tests/setupBrowser.ts`.
  - Moving the `FrameRegion` interface there would retire the structural box type at `ff.diff:1792`.
- **R4, to the Orchestrator.** The retained `ff-release-extent.test.ts` is not the instrument behind the report's "No pointer press" row. Its output for that run was overwritten (`b-focus-frame-report.md:145`).
- **R5, to the Orchestrator.** The `dropdown-menu-focus` and `captioned-carousel-focus` scenarios reach focus by a scripted focus in dark. Whether they paint an `auto` outline is unverified, as `b-focus-frame-report.md:165` says, and no unit carries it.

**Attacked and held**

- The `range-focus` frame shows the thumb ring whole at both variants even though the host reach reads 0. The thumb and its ring sit inside the checked specimen region.
- The accordion ring reaches past the accordion's own border (`ff-final/accordion-base-focus--dark-1280.png`), and the 16px padding holds it.
- The skip link wraps onto two lines at 390, and the outline holds on both line fragments.

VERDICT: FAIL 5, 8; outside the claims: F1, F2, F3, F4, F5
