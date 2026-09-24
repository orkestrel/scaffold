# PAGE-FRAME (`pf`) report

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-pf` on branch `unit/pf` from
`dc92a09`. Nothing is committed. The run stopped once on an API rate limit and resumed after a
container restart; every gate whose log predated the last edit was rerun after the resume
(`.orkestrel/veneer/units/pf-instruments/pf-gates.log.txt`, `.orkestrel/veneer/units/pf-instruments/pf-guides.log.txt`).

## Outcome

Every acceptance criterion holds on the final tree. Every frame the capture journey writes reads
back at `light-390`, `dark-390`, `light-1280`, and `dark-1280`, and the portfolio case passes at
each variant. The `showcase` page frame is 1280 × 800 at the 1280 variants, down from 1280 × 53410.
The `bottom-offcanvas` frame shows the panel at the viewport's `30vh` height.

## Section heights measured before editing

The probe (`.orkestrel/veneer/units/pf-instruments/pf-heights-probe.test.ts.txt`, readings in
`.orkestrel/veneer/units/pf-instruments/pf-heights-light-390.txt` and `.orkestrel/veneer/units/pf-instruments/pf-heights-light-1280.txt`) mounted the
showcase at each width and read every `main` child's box height in CSS pixels.

| Reading | 390 | 1280 |
| --- | --- | --- |
| Whole content height from the `measureContent` function | 57705 | 53410 |
| Header (heading and Dark mode control) | 78.2 | 78.2 |
| Showcase region | 21.0 | 21.0 |
| Navbar, the tallest section holding a page-frame subject (`navbar-collapsed-focus`) | 1798.0 | 1569.0 |

- The 1280 document is shorter than the 390 one, not taller. The 390 document fits under the area
  guard (390 × 57705 is 22.5 M device pixels) and the 1280 one does not (1280 × 53410 is 68.4 M).
- The sections taller at 1280 than at 390 are Media (485.8 → 666.3), Card (1967.0 → 2466.5),
  Carousel (885.0 → 1642.0), and Flex (1619.8 → 1714.0). Every other section is shorter at 1280.
- No bounded frame comes near the `FRAME_AREA` constant. The tallest page frame is
  `navbar-collapsed-focus` at 390 × 1877 and 1280 × 1648.

**Observers.** A search of `app/browser` and `src/browser` for `ResizeObserver`,
`IntersectionObserver`, `MutationObserver`, and scroll or resize listeners found one observer: the
`Delegate` class's `MutationObserver` observer in `src/browser/Delegate.ts`, which observes
`childList` and `subtree` only. A `hidden` attribute change doesn't reach it. No scroll handler
exists.

## Contract as written

**Constant.** `FRAME_AREA = 1280 * 41954` (53701120 device pixels) in `tests/setup.ts`, the
`showcase--dark-1280.png` frame that read back at 204.9 MiB decoded.

**Refusals.** Each refusal is an `Error` thrown before the portfolio is called. A refused
placement records no scenario and no region.
- Area: `Frame "<scenario>" is <across>x<down> device pixels, over the 53701120-pixel area a written frame has been read back at`.
  An element frame measures its box, and a page frame measures the pane width by the staged
  height. Both scale by `devicePixelRatio`, and a fractional edge counts as a whole row or column.
- Unstable geometry: `Frame "<scenario>" never settled: its document reached <h> CSS pixels on a <pane>-pixel pane`.

**Order inside the private `#shoot` method** (`tests/setupBrowser.ts`, the `FrameManager` class):
1. `#exclude`: sets `hidden` on every `main > *` child that holds neither the subject nor the
   frame and is not already hidden. It returns the children it hid. The children are read from the
   rendered `main` element, never named.
2. `#settle`: calls the `stagePane` function at the viewport the call finds. It re-stages at
   `max(measureContent(), viewport height)` where that is taller, then requires one more reading
   to agree.
3. `#admit`: the area refusal.
4. The region is read with the `readRegion` function. The scenario and the placement are recorded.
5. The portfolio's `place` method runs.
6. The `releasePane` function runs in an inner `finally`.
7. An outer `finally` removes `hidden` from exactly the children `#exclude` returned.

**Decisions within scope.**
- **No refusal for a subject that no `main` child holds.** The verdict does not adopt it, and a
  frame whose subject sits outside `main` is shot over the opening and that subject.
- **Scenarios record after admission.** A scenario is now recorded after the area check. A
  portfolio refusal still records the scenario, as before.
- **Primary host lift.** The lifted Primary host is put back through the `onTestFinished` hook, so
  the loop body is not re-indented. This keeps the diff local for the BCF merge.
- **Recorder.** The `recordPlacements` recorder was added to `tests/setupBrowser.ts` and exported.
  `.claude/rules/tests.md` admits it under "a scripted boundary stub only when it implements the
  real interface … minimally" and the recorder rule. The real portfolio with capture off records
  nothing at the moment of the shot, so it cannot show which sections are laid out or which pane
  is staged. Every other proof uses the real `createPortfolio` portfolio with capture off.

## Coverage matrix

The red run over the unchanged `FrameManager` class was `npm run test:setup:browser`: exit 1,
`Tests  6 failed | 67 passed (73)`, with every added case failing
(`.orkestrel/veneer/units/pf-instruments/pf-red-setup-browser.log.txt`). The same command after the fix gave exit 0,
`Tests  73 passed (73)`.

The following table lists each proof, the mutations it distinguishes, and the red run each mutation
produced. The mutation log is `.orkestrel/veneer/units/pf-instruments/pf-mutations.log.txt`, with one log per mutation in
`.orkestrel/veneer/units/pf-instruments/pf-mutation-<name>.log.txt`. The instrument is `.orkestrel/veneer/units/pf-instruments/pf-mutations.sh` with the
`.orkestrel/veneer/units/pf-instruments/pf-mutate.py` script.

| Proof (case in `tests/setupBrowser.test.ts`) | Mutation | Red run |
| --- | --- | --- |
| `shoots a page frame over the header and the one main child holding its subject` | no bounding | 3 failed, this case among them |
| same | the subject's own child hidden | 2 failed, this case among them |
| same | the region read before bounding | 2 failed, this case among them |
| `shoots an element frame of a lifted specimen with no main child laid out, so a viewport-height panel reads at the viewport` | element frames left unbounded | 2 failed, this case among them |
| `reads a viewport-height region at the pane the shot is taken at, where the kept section outgrows the viewport` | the region read at the viewport pane under a taller document | 3 failed, this case among them |
| `places a frame at the frame area and refuses one device-pixel row over it, naming the scenario` | the comparison off by one (`>=`) | 1 failed, this case alone |
| same | the refusal dropped | 2 failed, this case among them |
| `leaves every main child hidden or laid out as it found it, after a placement and after a refused one` | restoration outside `finally` | 1 failed, this case alone |
| same | a restoration that clears every `hidden` attribute | 1 failed, this case alone |
| `refuses a placement whose document grows with every pane it is staged at` | the settle refusal dropped | 1 failed, this case alone |
| `tests/setup.test.ts` export-list case | `FRAME_AREA` constant unexported | `npm run test:setup`: 1 failed, this case alone |

Where a mutation reddens more than its own case, each extra case depends on the mutated step:
- **The subject's own child hidden.** This also hides the growing section in the settle-refusal
  case, so that placement resolves.
- **The region read at the viewport pane.** This skips re-staging, so the page-frame area refusal
  and the settle refusal never see the taller pane.
- **No bounding and element frames left unbounded.** These redden every bounding proof.

## Pointer placements and their `:hover` readings

Every placement that follows the `hoverAccessible` function, a `.hover()` call, or the
`holdAccessible` function is on a specimen lifted to the document's start. The file has no
`driveHold` call at `dc92a09`. Each case reads the state again after the shot, and each reading
held on all four capture runs.

| Placement | Before | After | Reading after the shot |
| --- | --- | --- | --- |
| `primary-hover` | in place in the Buttons section | host lifted (R6) | re-staged `host.matches(':hover')` asserted true |
| `primary-active` (hold) | in place | host lifted (R6) | `host.matches(':active')` collected and asserted true |
| `page-strip-hover` | page frame of the lifted stage | element frame of the stage (R5) | re-staged `link.matches(':hover')` asserted true |
| `list-group-actions-hover` and `list-group-actions-active` | lifted | unchanged | `:hover` asserted after re-staging; `:active` asserted |
| `dropdown-menu-hover` | lifted | unchanged | `:hover` asserted after re-staging |
| `close-control-hover` | lifted | unchanged | re-staged `:hover` asserted |
| `captioned-carousel-hover` | lifted | unchanged | re-staged `:hover` asserted |
| nav hover scenarios (`FRAMES.place(scenario, element, specimen)`) | lifted | unchanged | re-staged `:hover` collected and asserted |
| `navbar-expanded-hover` | lifted | unchanged | re-staged `:hover` held |

`toggle-pressed` follows a click, not a hover or a hold. It stays an in-place element frame, and
its case asserts the `active` class after the shot. It is recorded here as an observation.

## Rewritten sentences

**`tests/setupBrowser.ts`**
- The `FrameManager` class remarks said the capture "finds a pane already staged at that geometry
  and moves nothing". They now say that every placement bounds its document, that the pane is
  staged at the viewport and then at the bounded content height with one agreeing reading, and
  that a frame over the `FRAME_AREA` constant is refused on every run.
- The TSDoc for the `page` method said "the region points a reader of an 8000-pixel frame at that
  part". It now says "A page frame shows the page's opening and the one section holding the
  subject … carries a focus state and never a pointer state".
- The `place` method gained an `@throws` entry and remarks on lifted and in-place element frames.
- The `scenarios` getter said "every scenario placed so far". It now says "every scenario admitted
  for placement so far".

**`tests/setup.ts`**
- The `SHOWCASE_KEYS` table: "Lists the scenarios a journey photographs as a frame of the whole
  page" / "one shot of the resting document is one image whatever scenario name it carries" became
  "Lists the scenarios a journey photographs as a page frame of the page's opening", with remarks
  that the arrival frame carries the heading, the Dark mode control, and the region.
- The `CASCADE_KEYS` table remarks: "A page frame covers the whole document … would duplicate the
  arrival frame" became "A page frame carries the page's opening and the whole section holding its
  subject … keys sharing a section would be one image under several names".
- The same remarks said "An element frame taken where the showcase renders these specimens comes
  back blank white". They now say it "came back blank white when it was measured on 2026-09-22,
  before a placement took the other sections out of the layout … No reading repeats it with the
  other sections out of the layout".
- The `CascadeKey` interface remarks state no page-frame claim and are unchanged.

**`tests/app/browser/integration.test.ts`** (each comment located by its case)
- Primary focus sweep: "a reader of a page frame over 8000 pixels tall" became "The page frame
  holds the page's opening and the Buttons section … a reader of the frame is pointed at the part
  the scenario claims".
- Toggle pressed: "one document apart in 8000 pixels, and the resting page is already the arrival
  frame" became "a page frame of the Buttons section at rest and one with this host pressed differ
  by one host among every specimen that section renders".
- Cascade lift: "A page frame covers the whole document, so one shot at rest is one image whatever
  scenario name it carries; and an element frame … comes back blank white" became "A page frame
  holds the whole section around the key, so keys sharing a section would be one image under
  several names; and an element frame … was measured blank white at both registered widths".
- Validation ring: "a reader of a tall page frame" became "The page frame holds the page's opening
  and the Validation section".
- Page strip header: "Each frame is a page frame whose declared region is the strip" became "Each
  frame is an element frame of the padded stage … Neither frame is a page frame, because a pointer
  state is never one".
- Page strip stage: "a specimen starting at the document's own top edge leaves the ring above Page
  1 with no pixels to be photographed in" became "the stage is the frame … a frame of the strip
  alone crops the ring above Page 1 … the ring falls inside the frame".
- Primary pointer case: "staging the pane for a page frame moves the pointer off the specimen"
  became the lift rationale, that the Buttons section moves up by the Showcase region's height
  under a placement.
- Range focus: "The whole page is photographed" became "A page frame is photographed … holds the
  page's opening and the Form range section".
- Floating-label focus: "The whole page is photographed" became "A page frame is photographed …
  the Form floating section".
- Close control focus: "a reader of the whole document" became "The page frame holds the page's
  opening and the Close section".
- Input group focus: "a reader of the whole document" became "the Input group section".
- Accordion focus: "a reader of the whole document" became "the Accordion section".
- Skip link focus: "a reader of the whole document" became "the Visibility section".
- Focus-ring roles: "a reader of the whole document" became "the Focus ring section".

**`guides/veneer.md`** (shared file: `.orkestrel/veneer/units/pf-shared.patch` against `dc92a09`; nothing edited
in the tree)
- The `showcase` stem row: "The page frame, read through the region at rest" became "The page's
  opening at rest, read through the region".
- R8: "its declared region is read for the fraction of pixels differing from that region's first
  pixel; a region painting one color is refused as a blank" became "read back … for its size and
  its floor, the one color its bottom row paints. Its declared region is read for the fraction of
  pixels differing from that floor, or from the region's own first pixel where the bottom row
  paints several colors, and a region showing the floor alone is refused as a blank".
- A paragraph is added after the element-frame paragraph. It covers the bounded document, what a
  page frame and a lifted element frame hold, the staged height, the area refusal, and pointer
  states as lifted element frames.
- "a Veneer frame is a lift out of the mounted showcase" became "a Veneer frame is shot inside the
  mounted showcase, on a specimen lifted to the document's start or where its section renders it,
  with every other section out of the layout".
- The guide search used the pattern `first pixel|page frame|element frame|whole document|whole page|8000|lift out of the mounted|read through the region`
  over `guides/veneer.md`. The other page-frame sentences it returned, in the Form control, Form
  select, Form check, Form range, and Input group sections, stay true and are unchanged.

**Sweep.** The pattern `whole page|whole document|8000|tall page|page frame` over
`tests/setup.ts`, `tests/setupBrowser.ts`, and `tests/setupBrowser.test.ts` returned only true
sentences. The pattern `8000|whole document|whole page|tall page|page frame|thousands of pixels|foot of|down the document`
over `tests/app/browser/integration.test.ts` left these untouched, because each states the
document and not a frame:
- the lifted-pointer comments that say a section "renders near the foot of a document over 8000
  pixels tall";
- the page strip's "thousands of pixels down the document";
- "the whole document's tab ring";
- "the whole page's tree".

## Gates

The following gates are the final runs, after the last edit, from `.orkestrel/veneer/units/pf-instruments/pf-gates.sh` and
`.orkestrel/veneer/units/pf-instruments/pf-gates.log.txt`.

| Command | Exit | Result |
| --- | --- | --- |
| `npx oxfmt --check tests/setupBrowser.ts tests/setupBrowser.test.ts tests/setup.ts tests/setup.test.ts tests/app/browser/integration.test.ts` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | no diagnostics |
| `npm run check` | 0 | every `tsc` and `vue-tsc` stage clean |
| `npm run test:setup` | 0 | `Tests  287 passed (287)`, with the `FRAME_AREA` constant in the export list |
| `npm run test:setup:browser` | 0 | `Tests  73 passed (73)` |
| `npm run test:guides` in a scratch copy under `tmp/probe/` with `pf-shared.patch` applied | 0 | `Tests  19 passed (19)` (`.orkestrel/veneer/units/pf-instruments/pf-guides.log.txt`) |
| `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md` in that copy | 0 | clean (`.orkestrel/veneer/units/pf-instruments/pf-guide-format.log.txt`) |

The scratch copy was removed after the run. `npm run build:src` ran before the browser proofs
(`.orkestrel/veneer/units/pf-instruments/pf-build.log.txt`, exit 0).

## Capture runs

Each run was
`CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:<variant>*"`,
one variant at a time, through `.orkestrel/veneer/units/pf-instruments/pf-capture.sh`. The dimensions come from the manifest's
`frame` readings (`.orkestrel/veneer/units/pf-instruments/pf-frames.py`, `.orkestrel/veneer/units/pf-instruments/pf-frames.log.txt`).

| Variant | Exit and result | `showcase` | `bottom-offcanvas` (region) | Tallest page frame | Portfolio case |
| --- | --- | --- | --- | --- | --- |
| `light-390` (criterion) | 0, `Tests  45 passed (45)`, 203.51 s | 390 × 844 | 390 × 392 (y 130.8, height 253.2) | `navbar-collapsed-focus` 390 × 1877 | passed |
| `dark-390` | 0, `Tests  45 passed (45)`, 197.35 s | 390 × 844 | 390 × 392 (y 130.8, height 253.2) | `navbar-collapsed-focus` 390 × 1877 | passed |
| `light-1280` | 0, `Tests  45 passed (45)`, 219.21 s | 1280 × 800 | 1280 × 392 (y 144, height 240) | `navbar-collapsed-focus` 1280 × 1648 | passed |
| `dark-1280` | 0, `Tests  45 passed (45)`, 216.94 s | 1280 × 800 | 1280 × 392 (y 144, height 240) | `navbar-collapsed-focus` 1280 × 1648 | passed |

- **Frame read-back.** Each run's manifest read back a frame for every registered scenario through
  the `readFrame` function and the `measureVariation` function.
- **`bottom-offcanvas--light-390.png`.** The panel's top border sits at pixel row 131 of the 392
  rows (`.orkestrel/veneer/units/pf-instruments/pf-png.py`, column 380), so the panel is 253 rows tall: 30vh of the 844-pixel
  viewport. The recorded region matches it (y 130.8, height 253.2). At 1280 the panel is 240 tall,
  30vh of 800.
- **Frames viewed.** `showcase--light-1280.png` shows the heading, the Dark mode control, and the
  region paragraph. `primary-hover--light-1280.png` shows the lifted host with its hover fill.
  `page-strip-focus--light-390.png` shows the stage with the Page 1 ring whole inside the frame.
  `range-focus--light-390.png` shows the opening and the Form range section alone.

## Records, retained under `.orkestrel/veneer/units/` and `.orkestrel/veneer/units/pf-instruments/`

- **Unit records:** `pf-report.md` (this file), `pf.diff` (`git diff dc92a09 -- tests`),
  `pf-status.txt`, and `pf-shared.patch`.
- **Mutation records:** `pf-mutations.log.txt` and each `pf-mutation-<name>.log.txt` file.
- **Run records:** the red and green `setup:browser` logs, the capture logs, and the gate logs.

## Diffstat against `dc92a09`

```text
 tests/app/browser/integration.test.ts | 128 ++++++++++++++---------
 tests/setup.test.ts                   |   1 +
 tests/setup.ts                        |  49 +++++----
 tests/setupBrowser.test.ts            | 183 ++++++++++++++++++++++++++++++++-
 tests/setupBrowser.ts                 | 185 ++++++++++++++++++++++++++++++----
```

## Deviation state

No stop condition fired:
- **Off-limits files.** No fix needed an off-limits file.
- **Frame area.** No bounded frame approaches the `FRAME_AREA` constant.
- **Regions.** Region and shot agree at every variant.
- **Pointer states.** Every pointer state held after its shot.

Observations for the Orchestrator:
- **Temporary directory.** A preview command wrote a copy of `tests/setupBrowser.ts` to `/tmp/x`,
  and the file was deleted in the next command. Nothing else was written outside the worktree.
- **`tmp/probe/` directory.** It is removed, and the height probe is retained as `.txt` copies in
  `tmp/units/`.
- **Merge overlap with BCF.** The edits to `tests/app/browser/integration.test.ts` stay local to
  each comment and to the Primary and page-strip placements.
- **Placements added by BCF or FADE.** Any placement those units add goes through the bounded
  class. A pointer placement they add in place would lose `:hover` under R1.
