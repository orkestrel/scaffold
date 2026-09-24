<!-- Retained from Workflow run wf_09941f27-ccb, agent a85cbca0b34702db8 (reviewer on Opus 5.5). -->

1. **BROKEN.** Claim 2 fails on naming, and on one false placement statement in the claim itself.
   - **The returned focus reading has three names.** `FocusReading` is the new concept the helper introduced, and the call sites bind it under three names:
     - `reading` at `/home/user/veneer-fh/tests/app/browser/integration.test.ts`, around lines 487 and 984;
     - `focused` around lines 895, 1095, 1127, 1181, 1220, 1255, 1312, 1479, 1743, 2048, and 2978;
     - `ringed` around lines 1842, 1912, 1992, 2140, 2294, 2329, 2382, 2422, 2475, 2525, 2605, 2681, 2741, 2779, 2847, 2896, and 3117.
   - **`focused` also names other things in the same file.** It holds a style string around lines 1813, 1887, 2137, and 2602, and a screenshot around line 2195.
   - **`ringed` names readings that have no ring.** The carousel and plaintext cases bind it to readings with a reach of 0 and no outline.
   - **The `ring` option key names an element.** In `/home/user/veneer-fh/tests/setupBrowser.ts` around line 735, `FocusOptions.ring` holds the element that wears the ring. The installed `readRing(control, worn?)` function (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts:2412`) calls that same element `worn`. In the journey, `ring` also means a box-shadow string or a contrast ratio.
   - **Why it matters.** This breaks the "one concept, one term" law in `AGENTS.md`, and the installed package already names the ring's element `worn`.
   - **Fix.**
     - Bind every `FocusReading` under one name at every call site, without shadowing: return `FRAMES.focus(...)` under one term and read after it.
     - Keep `focused` for the paint read under focus.
     - Rename `FocusOptions.ring` to `worn`.
   - **The claim's placement statement is wrong, and the code is right.** The `readImageRegion` and `measureDifference` functions are in `tests/setupBrowser.ts` (around lines 197 and 158), not in `tests/setup.ts`. They decode with `Image` and `OffscreenCanvas`, so the browser module is where they belong. The claim needs rewording; the code needs no change.
   - **What held.**
     - No `querySelector<` read is left in the journey.
     - `scanFocusReading` fits the `scan*` meaning in `names.md:99`, and `FOCUS_READING_CASES` tests it.
     - `lift`, `focus`, `padded`, `reachable`, `subject`, `frame`, and `keys` are single words.

2. **CONFIRMED.** Claim 3 holds for every focus scenario and for both frames it names.
   - **Tab drive.** Every focus case calls `FRAMES.focus`. That method runs `wrapper.focus()` and then `driveTraversal`, which the installed declaration defines as Tab traversal from the current focus (`index.d.ts:1029-1049`).
   - **Remaining scripted focus calls.**
     - `control.focus()` around line 2194 is a reference reading in the press case, not a focus scenario.
     - The page strip's mode that takes no shot drives with Tab around line 989.
   - **Dropdown.** The captures `fh-final/dark-1280/dropdown-menu-focus--dark-1280.png` and `fh-final/dark-390/dropdown-menu-focus--dark-390.png` show a white outline on "Track shipment" in the padded wrapper. The light-390 capture shows a dark outline.
   - **Carousels.** Bootstrap writes `outline: 0` for these controls (`bootstrap.css:6107-6113`), and so does Veneer (`src/styles/components/_carousel.scss:111-115`). The captures `captioned-carousel-focus--dark-1280.png` and `fading-carousel-focus--dark-1280.png` show the focus opacity and no ring.
   - **Mutation.** The mutation reverting the drive to a scripted focus plus a key press reddens only the cases that paint an outline. Primary and accordion stay green under it (`fh-mutations.log.txt:43-54`). The Tab drive is confirmed from the single code path, not from that proof.

3. **CONFIRMED.** Claim 4 holds.
   - **Code.** `focus` calls `releasePointer`, then installs a capturing `mouseover` watcher over the wrapper's descendants, and aborts it after the shot and the crop reading.
   - **Failure message.** `scanFocusReading` turns any entry into "the parked pointer entered <element>", so the failing case names the element.
   - **Mutation.** Dropping the pointer park reddens the accordion case with `expected [ Array(1) ] to strictly equal []` (`fh-mutations.log.txt:58-63`). The passing run records no entry, so the assertion distinguishes the two.

4. **BROKEN.** Claim 5's "near 1 where an outline paints" wording is false; the check itself works.
   - **Measured values.**
     - Skip link at light-390: 0.1453 (`tmp/units/fh-final/light-390/light-390.txt:2112`).
     - Skip link at dark-390: 0.151.
     - List-group row at light-390: 0.486 (report table).
   - **Cause.** At 390 wide the link wraps onto two lines (capture `skip-link-focus--light-390.png`). The strip spans the link's whole bounding box, but the outline paints above the first line only.
   - **What held.** The proof's real test is greater than 0 where painted and exactly 0 where suppressed or transparent (`setupBrowser.test.ts` "reads an outline…"), and that is sound.
   - **Mutations held.**
     - Crop dropped: reddens the helper proof, expecting four edges and getting `[]` (log lines 13-18).
     - Pixel guard dropped: reddens the helper proof and the list-group, menu, and skip link cases (log lines 22-39).
     - Drive reverted: reddens the list-group, menu, skip link, and container cases (log lines 43-54).
     - Pointer park dropped: reddens the accordion case (log lines 58-63).
   - **Fix.** Restate the claim as "greater than 0 where an outline paints, exactly 0 where it is suppressed". No code change.

5. **CONFIRMED.** Claim 6 holds. I named one mutation per property; each breaks an assertion in `setupBrowser.test.ts` "frame lifts and focus frames".
   - **Restore after rejection.** Removing the `finally` restore breaks `expect(specimen.parentElement).toBe(host)` after the rejected action.
   - **Padded by default.** Flipping the default breaks `classes: ['p-3']`.
   - **Reachable width.** Dropping `maxWidth` gives `''` instead of `${runner.innerWidth}px`.
   - **Copy removal.** Dropping `specimen.remove()` breaks `copy.isConnected === false`.
   - **Clip defect.** It ran red first: `expected [ 10, 4, 160 ] to strictly equal [ 7, 4, 112 ]`, then passed 80 of 80 (`fh-mutations.log.txt:4-10`).

6. **NOT-EVIDENCED.** Claim 7 cannot be ruled for dark-390, because `/home/user/veneer-fh/tmp/units/fh-baseline/` has no dark-390 portfolio and no comparison report for it.
   - **What held at dark-1280 and light-390** (`fh-compare-*.txt`):
     - Every `padded: false` frame is byte-identical: Primary hover, check-group copy, indeterminate copy, menu hover, close hover, nav hovers, and navbar hover.
     - The wrappers that were `p-2` grow 16 in height.
     - Specimens shot inside a padded wrapper are narrower by the padding.
   - **Layout changes the report does not name:**
     - `focusable-container-focus--light-390` grows 37, not 16, because the sentence wraps onto a third line (baseline and final captures).
     - The `captioned-carousel-focus--light-390` caption wraps to three lines where the baseline had one.
   - **Dropdown.** Its dark focus frame shows the outline at dark-1280 and at dark-390.
   - **What would settle it.** A dark-390 baseline portfolio and a `fh-compare.py dark-390` report.

7. **BROKEN.** Claim 8 fails on four prose points.
   - **A code token without a noun.** `outline: 0` stands alone at `/home/user/veneer-fh/guides/veneer.md:9953` and at `integration.test.ts` lines 1924 and 2007. `writing.md` § Code tokens requires a noun after the token. Fix: write "the `outline: 0` declaration".
   - **A list item named by its position.** "The last row carries every fault together" appears at `/home/user/veneer-fh/tests/setup.ts:3501`, which `AGENTS.md` § Writing bans. Fix: "The row carrying every fault decides the order."
   - **Prose that misstates what ships:**
     - The `lift` summary (`setupBrowser.ts:882`) and the class doc (around line 797) say the wrapper is always padded. The `padded: false` call sites contradict that. Fix: "…into a wrapper at the document's start, padded unless `padded` is `false`…"
     - The `padded` doc (`setupBrowser.ts:717`) says full width is "the geometry a frame shot on the specimen itself needs". The carousel hover and focus frames, the nav-underline hover frame, and the list-group hover and press frames are all shot on the specimen inside padded wrappers. Fix: state what `false` does and drop the claimed need.
     - The `FocusReading.entered` doc says entries are recorded "before the shot", but the watcher records through the shot. Fix: "until the frame is shot", matching the `focus` doc.
   - **What held.**
     - The plaintext comment says focus moves the content box, which the Bootstrap rule at `bootstrap.css:2637-2641` matches.
     - The substitution-table sweep is clean. The pattern covered the table's rows over the diff's added lines; `once`, `new`, and `above` appear only in permitted senses.
     - The shared patch removes only the § Showcase duplicate, and the § Tests sentence carries the limit.
   - **Counts the report states** (`b-frame-helpers-report.md`):
     - "one shared-file patch" (line 4);
     - "It has two methods" (line 8);
     - "replaced by one sentence" (line 80);
     - "16 CSS pixels in each dimension" (line 103), which is also false: full-width frames keep their width;
     - "one test title, and one guide sentence" (line 149);
     - "one mode-token sentence" (line 167);
     - the diffstat "6 files changed" (line 155).
   - **Counts in the claims file itself:** "the six owned files", "the three `CAPTURE=1` variant journeys", and "the two carousel cases".

**Scope and gates (claim 1): CONFIRMED.**
- The status file `fh-status.txt:1-6` lists only the owned files.
- Both guide hunks (base lines 9876 and 9929) sit after the § Tests heading at `guides/veneer.md:9796`.
- The shared patch hunk at line 9734 sits in § Showcase (heading at line 9668).
- Gate logs:
  - format: "All matched files use the correct format."
  - lint and check: no diagnostics (neither log records an exit line).
  - `test:setup` 313 of 313, `test:guides` 20 of 20, `setup:browser` 80 of 80.
  - policy: 109 passed, 1 skipped.
  - journeys: dark-1280 (`-4`), light-390 (`-3`), and dark-390 (`-1`) each 62 of 62 with exit 0.

**Findings outside the claims**

- **F-OUTLINE-FACTORY.** `/home/user/veneer-fh/tests/setupBrowser.test.ts:181` declares a local fixture factory, `createOutlines`. The journey's `FRAMES` constant (`integration.test.ts`, around lines 146-161) builds the same painted and suppressed portfolio pair by hand.
  - **Why it matters.** It breaks `tests.md:188` (test files import shared infrastructure rather than declaring local fixture factories) and `tests.md:184` (a near-duplicate helper is a defect).
  - **Fix.** Export one factory from `tests/setupBrowser.ts` that builds an `OutlineCapture` from the states, variants, variant, and root directory. Test it, and use it at both sites.

**Referrals to the objective lane**

- **Outline cases not pinned.** The focusable-container case and the link-specimen cases paint an outline: the report reads 1 and 0.991 for the container, and `icon-links-focus--dark-1280.png` shows one. Neither asserts `reading.outline` is defined. With the pixel guard dropped, the container case stayed green (log lines 30-39). Rule whether this is sufficient.
- **Tab drive pinned only by outlines.** The reverted drive leaves the shadow-ring and carousel cases green, so only outline-painting cases pin the Tab drive.
- **`@throws` wording.** The `lift`, `focus`, and `readElement` docs don't use the "Thrown when …" form that `typescript.md:87` requires.
- **Watcher coverage.** Rule whether a `mouseover` watcher catches a layout move under a pointer that doesn't move, beyond the accordion vector the proof covers.

**Observations for the Orchestrator** (outside this unit's scope, carrier not yet named)

- **Pixel decode duplicate.** The press case keeps its own PNG decode and centre-pixel read (`integration.test.ts:2213-2227`) beside `readImageRegion`.
- **Second lift and watcher.** The resting cascade case keeps its own `pt-5` copy lift and pointer watcher (lines 744-758).
- **Stale comments.** "the placement every pointer state takes" (lines 2183 and 2250) was already false before this unit and still is, because several pointer-state lifts are unpadded.
- **Inline element guards.** Checks written with `instanceof HTMLElement` sit beside `readElement` (lines 543, 3100, 3229).
- **Carousel padding.** The carousels are padded only so the pointer can park on the padding, and that reflows the caption at 390 wide.
- **Guide line wrap.** The § Tests paragraph wasn't re-wrapped (`guides/veneer.md` lines 9941 and 9950).

**Attacked and held**

- The lift uses a comment marker and a `finally` block, so an action that throws still puts the specimen back.
- The copy path in `lift` removes the copy instead of reinserting it.
- `scanFocusReading` lists faults in a fixed order: focus, reach, edges in top-right-bottom-left order, pointer entry, outline.
- The carousel `outline: 0` ruling contradicts the design brief and matches both stylesheets.
- The mode-token limit sentence is true, and it is the only place the guide states that limit after the shared patch.

VERDICT: FAIL 2, 5, 7, 8; outside the claims: F-OUTLINE-FACTORY
