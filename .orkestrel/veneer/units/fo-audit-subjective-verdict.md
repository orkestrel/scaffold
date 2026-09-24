<!-- Subjective lane: reviewer on Opus 5.5, workflow wf_ee1f7f27-f0d, brief fo-audit-reviewer-brief.md. -->

**Lane held: subjective (Opus 5.5).**

## Per-claim verdicts

**1. Scope: CONFIRMED.**
- `fo-status.txt:1-6` lists six files. Each one is in the brief's owned set at `b-overlay-frames-brief.md:66`.
- `fo-shared.patch:1-2` touches `guides/veneer.md` alone. Its hunks sit in § Alert classes, § Popover classes, § Carousel classes, and § Tests, which are the sections the brief shares.
- `tests/setup.ts` gains the `'Plain alert'` member of the `CaptureSubject` union (`fo.diff:499`). The `plain-alert` row needs that member to typecheck, so it belongs to the row.
- No off-limits path appears.

**2. P11: CONFIRMED.**
- All four specimens carry the `w-100` class (`fo.diff:62-80`). The render case asserts it (`fo.diff:325`).
- The spanning case derives its widths from `BREAKPOINT_CASES` and `VIEWPORT_WIDTHS` (`fo.diff:344-346`). It holds the slide to the track and the picture box to the slide (`fo.diff:382-387`).
- Mutation `picture-own-width` puts the incoming advancing picture back on the `img-fluid` class. At any width over 800 the picture reads 800 wide against a wider slide, so the element-wise `toEqual` distinguishes the mutation from the passing case (`fo-mutations.log.txt:53-61`).
- Caveat: the recorded red run and mutation run (`fo-mutations.log.txt:14-15`, `59-61`) carry the old title "…at every layout boundary". Each diff shows 30 readings, which is the 6 `BREAKPOINT_CASES` widths × 5 displayed slides. The final case visits 8 widths. That case was never run red or mutated. The red result carries over by reasoning only: the final case reads a superset of the draft's readings under the same element-wise assertions. See Referral 1.
- The `d-block` claim holds. `src/styles/elements/_img.scss:4-5` sets `display: block` on every `img`, and nothing in `_carousel.scss` resets the display of an `img`.
- Frames: the pictures span their frame in `captioned-carousel`, `fading-carousel`, `inverted-carousel`, and `advancing-carousel` at `--light-1280.png` (1280×640) and at `--dark-390.png`.

**3. The resting residue: CONFIRMED.**
- At rest, both marks read the same strength: `fo-chevrons-light-1280.log.txt:1-3` (102/102, 121/121, 125/125) and `fo-chevrons-dark-390.log.txt:1-3` (32/32, 127/127, 125/125).
- In the driven frames, the driven mark reads stronger: light 183 vs 102 and 121 vs 218 at `:4-7`; dark 58 vs 32 and 127 vs 228 at `:4-7`.
- The driven frames are the positive control. A residue on one side at rest would read unequal marks, and the instrument shows it can report that asymmetry.
- The sampling bands (`fo-chevrons.py:69-78`, outer 15% of the width, middle ±24 rows) miss the picture's mountain edges in both geometries. I checked this against the SVG path at both frame sizes.
- The frames agree: the previous chevron is brighter in `captioned-carousel-hover--light-1280.png` and `captioned-carousel-focus--light-1280.png`, and the two chevrons match in `captioned-carousel--light-1280.png`. P11's "the hover and focus frames match rest" is closed.

**4. P12: CONFIRMED.**
- The cause readings are at `fo-probe-readings.log.txt:7-13`. With a specimen planted and `scroll-behavior: smooth` set (`src/styles/_reset.scss:12`), the page stays at `scrollY 0`. The instant scroll moves it to 223.
- The red run with the planted copy is at `fo-mutations.log.txt:1-7`. The green run is at `:39-43`.
- Mutation `scroll-default` restores `scrollIntoView()`. The hit then reads `undefined` instead of the picture. The assertion `readHit(picture) === picture` distinguishes the two, and only the advancing case reddens (`:45-51`).
- The probe read `behavior: 'instant'` alone, without `block: 'center'` (`:11`). So the instant form is the fix, and `block: 'center'` is an extra choice.

**5. P16, the next control: CONFIRMED.**
- The lift into a `p-2 col-lg-6` wrapper, the `main` guard, and the shots on the specimen are at `fo.diff:117-134`. This matches the `nav-underline-focus` pattern at `integration.test.ts` (around line 2059).
- Each state is held at its shot (`fo.diff:140-143`, `158-162`).
- Mutation `hover-released`: `framed` reads `['fading-carousel-hover', false]`, which the `filter(!held)` assertion catches (`fo-mutations.log.txt:129-135`).
- The reach reading supports the wrapper. The runner's window is 800×513 (`fo-probe-readings.log.txt:32-36`). The next control fails to hover at x 1082 unpadded and at x 1082 with `p-2` alone, and the previous control hovers (`:25-30`).
- Frames: `fading-carousel-hover--light-1280.png` and `fading-carousel-focus--light-1280.png` are 624×312. That is the lifted width, and it differs from the 1280×640 resting frame. The frames still show the state; see Referral 3.

**6. P16, the roleless alert: CONFIRMED.**
- The specimen is at `fo.diff:34-38` and the row at `fo.diff:523-528`.
- The role classes come from the ramp's own alerts (`fo.diff:254-257`). The plain population is the rendered alerts carrying none of them (`:259-261`). An empty population is refused (`:262`). The ramp's alerts are the control (`:283-287`).
- Mutation `plain-alert-fill` adds the `text-bg-primary` class. That class is outside the derived role set, so the alert stays in the plain population, and its fill `rgb(8, 65, 234)` fails the transparent expectation (`fo-mutations.log.txt:77-83`). The assertions distinguish the mutation.
- The "Plain alert" name matches the guide's own term, "a plain alert" (`guides/veneer.md:4173`, `:4187`, `:4221`, and the `alert.test.ts:49` comment).

**7. P16, the header strip: CONFIRMED. The Orchestrator's ruling stands.**
- The decisive reading is the computed one: the strip is in the header's fill, and the header's `border-top` is 0 (`fo-probe-readings.log.txt:21-22`). That reading does not depend on pixels.
- The pixel differences are at most 2, 3, 7, and 3 of 255 levels at 1× and 4× (`:16-19`). Arrow-hidden is the control, and it changes every shot (`:20`).
- Magnifying the frame does not raise a color difference, so "at any size" follows from the mechanism.
- The promoted proof reddens under each named mutation and passes otherwise (`fo-mutations.log.txt:137-157`).
  - Under `strip-header-fill`, the `fill` field flips to false.
  - Under `strip-off-row`, `offset` becomes about −4, which exceeds the 0.01 bound.
  - The assertions distinguish both mutations (`fo.diff:478-481`).
- The ruling makes `POPOVER_COPY` false (see F-popover-copy).

**8. The frames: CONFIRMED.**

| Frames | What they show |
| --- | --- |
| Spanning pictures at `light-1280` and `dark-390` | Full-width pictures, with the controls, caption, and pips over the picture |
| `fading-carousel-hover` and `fading-carousel-focus` at `light-1280` | A white next chevron over a translucent previous chevron |
| `fading-carousel-hover` and `fading-carousel-focus` at `dark-390` (374×187) | A solid black next chevron over a fainter previous chevron |
| `plain-alert--light-1280.png` and `plain-alert--dark-390.png` | Inset text in the surrounding text color, with no fill or edge |

- The hover and focus frames are identical. That is the release's rule (opacity 0.9 and no outline for both states), not a defect in the drive.

**9. Law and report: CONFIRMED.**
- The diff adds no `any`, no `as`, no non-null `!`, no suppression, no nested function, and no mock, spy, or fake clock. Every `!` in the diff is a logical not.
- The populations derive from the specimen tables and the `setupStyles` tables. The literal list of box sides is the repository's standing idiom; for example, see `alert.test.ts:41`.
- The gate lines match their logs. For example, `fo-gate-app.log.txt:146` reads `Tests  22 passed (22)`. The lint and check gates print no summary line, and the report says so.

For the record, I found these writing defects in `b-overlay-frames-report.md`:
- **Positional naming:** "Criterion 3" at `:186`.
- **Temporal `once`:** "once the pane is staged" at `:112` and "once the next control's wrapper was narrowed" at `:161`.
- **Counts:** the only count is the quoted diffstat "6 files changed" at `:32`, which is data inside a fence. The other numbers are measurements with their runs.
- **Code tokens with no noun following:**
  - Values and markup: `scroll-behavior: smooth` at `:81`, `scrollY 0` at `:84`, `scrollIntoView({…})` at `:87`, `['0.5', …]` at `:110`, `<div class="alert" role="alert">` at `:130`, `.alert` and `color` at `:131`, and the `rgb(...)` values at `:145`.
  - Command and instrument names: `fo-plant-carousel.py plant|remove` at `:89`, `strip-header-fill` and `strip-off-row` at `:154`, and `npm run test:setup` at `:186`.
  - Bare paths: `b-collapse-verify-verdict.md` at `:157`, `tests/setupServer.test.ts` at `:174` and `:220`, `fo-shared.patch`, `guides/veneer.md`, and `cf5e447` at `:192`, and the frame path at `:213`.
  - Bare path lists: `:35-36`, `:58-60`, `:63`, `:124-126`, `:139`, and `:224-227`.

## Findings outside the claims

**F-popover-copy**
- **Where:** `/home/user/veneer-fo/app/browser/constants.ts:2450`.
- **What is wrong:** the `POPOVER_COPY` paragraph ends "…and the strip of header fill a popover below its host lays under that arrow." The unit's own ruling says no reader can see the strip at any size (`fo.diff:510-513`, `fo-shared.patch:20-26`). The showcase invites a comparison that the guide says shows nothing.
- **Why it matters:** the showcase and the guide contradict each other. The Orchestrator brought `ALERT_COPY` into scope because the added specimen made its paragraph false. The same reason applies here.
- **What right looks like:** drop the strip clause, so the paragraph ends "…and the bordered arrow each placement turns toward the host." `PopoverSection.test.ts` compares the paragraph against `POPOVER_COPY.paragraph`, so no test changes.

**F-second-carousel**
- **Where:** `/home/user/veneer-fo/tests/app/browser/integration.test.ts:1658`.
- **What is wrong:** the title "drives the next control of a second carousel…" names the subject by position. The fading carousel is the second row of the `CAROUSEL_SPECIMENS` table, and "second" also leans on the preceding case.
- **Why it matters:** `AGENTS.md` bars naming an item by its position, and a case is named for what it proves.
- **What right looks like:** "drives the fading carousel's next control to hover and to focus on the lifted specimen, and photographs each state". Update the matching log references in the retained records only if they are regenerated.

**F-white-mark**
- **Where:** `/home/user/veneer-fo/tests/app/browser/integration.test.ts:1672-1673`.
- **What is wrong:** the comment says the fading carousel's controls "paint the same white mark as the captioned carousel's". The same case runs under the dark variants, where the theme paints the marks black. `fading-carousel--dark-390.png` and `fading-carousel-hover--dark-390.png` show this, and `guides/veneer.md:4703-4704` states it. Line 1673 is also left unwrapped at about 140 columns after the comment-only edit.
- **Why it matters:** a false comment is a prose defect of the same kind as a wrong return value.
- **What right looks like:** "…whose controls paint the same mark as the captioned carousel's in each mode, with no `carousel-dark` class." Rewrap the paragraph to the file's comment width.

## Attacked and held

- **Hypothesis:** leaving out the `d-block` class leaves an inline baseline gap under each picture. **Result:** it held. The elements layer's block rule wins, and no carousel rule resets the `img` display.
- **Hypothesis:** the chevron bands sample the mountain's slope. **Result:** it held at both geometries.
- **Hypothesis:** "Plain alert" is a synonym for the tables' "base" term. **Result:** withdrawn. The guide's alert section already uses "plain alert".
- **Hypothesis:** the promoted strip proof duplicates `popover.test.ts`. **Result:** it held as distinct. The section proof pins the premise of the no-frame ruling on the showcase's own specimens.
- **Hypothesis:** the plain-alert case lets the `text-bg-*` mutation escape through the derived role set. **Result:** it held. The class is outside the set, so the alert stays in the plain population and reddens.

## Referrals

1. **To the objective lane:** the retained P11 red run and `picture-own-width` run cover the 6-width draft (`fo-mutations.log.txt:14`, `:59`: old title and 30 readings), not the final 8-width case. The report attributes both runs to the final case (`b-overlay-frames-report.md:51-57`). Rule whether the superset argument is enough, or whether the final case needs its own red run and mutation run.
2. **To the Orchestrator:** in `captioned-carousel--dark-390.png`, the dark theme paints a black caption, black pips, and black chevrons over the captioned specimen's dark pictures. The chevron strength reads 32 (`fo-chevrons-dark-390.log.txt:1`). The report names no carrier for this. Assign one.
3. **To the objective lane:** the reach fix is keyed to the `lg` boundary (992) through the `col-lg-6` class, but the reach limit is the 800-wide runner window. A variant between 800 and 991 would lift the specimen at full width and time out on the hover. As a design note, the fading carousel's driven frames are 624 wide while its resting frame is 1280, so the two can't be compared side by side at one scale.

VERDICT: FAIL none; outside the claims: F-popover-copy, F-second-carousel, F-white-mark
