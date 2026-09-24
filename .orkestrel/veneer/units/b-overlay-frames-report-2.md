# OVERLAY-FRAMES (`fo`) round 2 report

The `opus` role on Opus 5.5 ran this round in the `/home/user/veneer-fo` worktree, over the round-1 tree (branch
`unit/fo` from the `cf5e447` commit). Nothing is committed. This report supersedes the round-1 report and covers round 1
and round 2. Every finding the audit verdict gives this unit is closed, with its proof or its reading.

## Changes over round 1 and round 2

The following block is the output of the `git diff --stat cf5e447` command:

```text
 app/browser/constants.ts                           |  47 +++---
 tests/app/browser/integration.test.ts              | 104 +++++++++++++
 tests/app/browser/sections/AlertSection.test.ts    |  71 ++++++++-
 tests/app/browser/sections/CarouselSection.test.ts | 170 +++++++++++++++------
 tests/app/browser/sections/PopoverSection.test.ts  |  61 +++++++-
 tests/setup.ts                                     |  16 ++
 6 files changed, 398 insertions(+), 71 deletions(-)
```

- The `app/browser/constants.ts` file:
  - the carousel pictures carry the `w-100` class in place of the `img-fluid` class;
  - the captioned carousel's pictures paint mid-tones;
  - a `Plain alert` specimen leads the alert table, and the `ALERT_COPY` paragraph names it;
  - the `POPOVER_COPY` paragraph drops its header-strip clause;
  - the TSDoc of the carousel and alert tables is updated.
- The `tests/setup.ts` file:
  - the `'Plain alert'` member joins the `CaptureSubject` union;
  - the `plain-alert` row joins the `CASCADE_KEYS` table;
  - the `fading-carousel-hover` and `fading-carousel-focus` rows join the `DRIVEN_KEYS` table;
  - the `CASCADE_KEYS` TSDoc states why the header strip takes no frame.
- The `tests/app/browser/integration.test.ts` file adds the driven case for the fading carousel's next control.
- The `tests/app/browser/sections/CarouselSection.test.ts` file:
  - adds the spanning case;
  - holds the caption case in each mode;
  - asserts the `w-100` class in the render case;
  - scrolls the advancing case with the instant behavior.
- The `tests/app/browser/sections/AlertSection.test.ts` file:
  - loads the cascade;
  - derives the render case's names from the alert table;
  - adds the plain-alert case.
- The `tests/app/browser/sections/PopoverSection.test.ts` file adds the header-strip case.

The review records are under the `/home/user/veneer-fo/tmp/units/` directory:

- the `fo-2.diff` file;
- the `fo-2-status.txt` file;
- the `fo-shared-2.patch` file, which supersedes the `fo-shared.patch` file whole;
- the `fo-mutations.log.txt` file for round 1;
- the `fo-mutations-2.log.txt` file for round 2.

## Findings and what closes each

### The carousel picture spans its slide (P11)

- **Change:** each carousel picture carries the `w-100` class the release's markup gives it.
  - The pictures leave out the `d-block` class, because the elements layer already draws every image as a block.
  - The `img-fluid` class is removed, because the elements layer writes the same maximum width and automatic height.
- **Proof:** the spanning case, titled "spans every displayed slide in every carousel with its picture at every layout
  boundary and journey width".
  - It reads each displayed slide at every `BREAKPOINT_CASES` boundary and every `VIEWPORT_WIDTHS` width.
  - It holds the slide to the track's width and the picture's box to the slide's box.
- **Red run of the final case** (round-2 log, entry "P11 final case red"): the `no-w-100` mutation puts every carousel
  picture back on the `img-fluid` class. The run reports the `Tests  2 failed | 6 passed (8)` result line. The spanning
  case fails over its full set of readings at the layout boundaries and journey widths, and the render case fails its
  class check.
- **Mutation run of the final case** (round-2 log, entry "Mutation picture-own-width"): the advancing specimen's
  incoming picture goes back on the `img-fluid` class. The run reports the `Tests  2 failed | 6 passed (8)` result line,
  with the same cases failing.
- **Green:** the scoped app proof in § Gates.

### The resting frames carry no hover residue (P11)

The `fo-chevrons.py` instrument reads the largest channel distance between each control's mark and the picture behind
it. Its readings over the round-2 frames are in the `fo-chevrons-2-light-1280.log.txt` and `fo-chevrons-2-dark-390.log.txt`
files, and the following table gives them.

| Frame | Previous mark | Next mark |
| --- | --- | --- |
| The captioned carousel's resting frame, light-1280 | 78 | 78 |
| The captioned carousel's hover frame, light-1280 | 140 | 78 |
| The fading carousel's hover frame, light-1280 | 121 | 218 |
| The captioned carousel's resting frame, dark-390 | 81 | 81 |
| The captioned carousel's hover frame, dark-390 | 146 | 81 |
| The captioned carousel's focus frame, dark-390 | 146 | 81 |
| The fading carousel's resting frame, dark-390 | 127 | 127 |
| The fading carousel's hover frame, dark-390 | 127 | 228 |
| The fading carousel's focus frame, dark-390 | 127 | 228 |

- Each resting frame paints its previous and next marks at equal strength.
- Each driven frame paints its driven mark stronger than the other mark.

### The advancing case holds under an added specimen (P12)

- **Cause, from a probe:** the reset sets smooth scrolling on the root. So a default scroll is still moving when the
  `readHit` helper reads the picture's center.
  - With a planted specimen, the document stays at its top and the picture's center lies below the viewport.
  - The readings are in the `fo-probe-readings.log.txt` file.
- **Change:** the advancing case scrolls with the instant behavior, which the `tests/setupBrowser.ts` module already
  uses.
- **Red before** (round-1 log, entry "P12 red before the fix", with a planted copy of the captioned specimen): the run
  reports the `Tests  1 failed | 6 passed (7)` result line.
- **Green after** (round-1 log, entry "P12 green after the fix", with the planted copy): the run reports the
  `Tests  8 passed (8)` result line.
- **Mutation** (round-1 log, entry "Mutation scroll-default"): the plain scroll comes back. Only the advancing case
  reddens.

### The dark captioned carousel

- **Change:** the captioned carousel's pictures paint mid-tone fills.
  - The fill pairs are slate blue under rust, teal under olive, and plum under steel blue.
  - The theme paints this carousel's caption, pips, and marks white in light and black in dark. Each fill holds at
    least 4.56:1 against white and against black.
  - The release pairs its dark carousel with light pictures. The inverted specimen keeps that pairing, and it paints
    its caption black in each mode.
- **Proof:** the caption case, titled "holds each caption to 4.5:1 against every fill its picture paints in each mode,
  the inverted carousel over light pictures".
  - It reads each caption inside a light island and inside a dark island.
  - It refuses a reading under 4.5:1.
  - It holds each ordinary caption to a different color in each mode, so a reading that never reached the dark island
    reddens.
  - It holds the inverted caption black in each mode.
- **Red first** (round-2 log, entry "Dark captioned carousel red first", against the dark pictures): the run reports the
  `Tests  1 failed | 7 passed (8)` result line. The caption case lists the dark-mode readings under 4.5:1.
- **Green** (round-2 log, entry "Dark captioned carousel green after the fix"): the run reports the
  `Tests  8 passed (8)` result line.
- **Mutation** (round-2 log, entry "Mutation captioned-dark-picture"): the North pier slide goes back on its dark
  picture. The caption case alone reddens, on a dark-mode reading.
- **Frames:** the `captioned-carousel--light-1280.png` frame and the `captioned-carousel--dark-390.png` frame under the
  `tmp/capture/states/` directory. The dark frame shows a black caption, black pips, and black marks over the mid-tone
  picture.
- **Chevron strength at dark-390:** 81 at rest on each side, 146 on the previous mark in the hover and focus frames,
  and 81 on the next mark there. In round 1 these readings were 32 at rest and 58 driven.

### The fading carousel's next control, hover and focus (P16)

- **Scenarios:** the `fading-carousel-hover` and `fading-carousel-focus` rows. The captioned carousel's scenario stems
  already carry its previous control, and a scenario names one specimen in one state.
- **Case:** "drives the fading carousel's next control to hover and to focus on the lifted specimen, and photographs
  each state".
  - The case lifts the specimen itself into a wrapper carrying the `p-2` and `col-lg-6` classes, and it carries the
    guard that the `main` element holds no lifted control.
  - It holds each frame to the state it was shot in.
  - It reads opacity 0.5 at rest, 0.9 under hover, 0.9 under focus, and 0.5 after blur.
- **Comment:** the case's comment says the fading carousel's controls paint the same mark as the captioned carousel's
  in each mode, with no `carousel-dark` class. The comment is wrapped to the file's comment width.
- **Reach reading:** after the pane is staged, the runner's window is 800 by 513 CSS pixels, and the pointer reaches
  only points inside it. On a full-width 1280 carousel the next control starts at x 1082, so its hover timed out in the
  probe. The `col-lg-6` class holds the wrapper to half the page from the large boundary up.
- **Post-fix mutation run** (round-1 log, entry "Next control red first"): the `no-fading-rows` mutation removes the
  registry rows. The run reports the `Tests  1 failed | 46 skipped (47)` result line. This run followed the green run,
  so it proves that the assertion tells the mutation apart. It is not a red-first run.
- **Mutation** (round-1 log, entry "Mutation hover-released"): the pointer is released before the hover frame is shot,
  and the case reddens on the hover frame's held state.
- **Frames:** the hover and focus frames of the fading carousel at light-1280 and at dark-390, under the
  `tmp/capture/states/` directory.

### The roleless alert (P16)

- **Change:** the `Plain alert` specimen carries the alert class and no role class. Its capture row reads the alert's
  text color.
- **Proof:** the case titled "paints no fill, no edge, and the text around it on every alert carrying no role class".
  - The role classes come from the role ramp's own alerts.
  - The ramp's alerts are the control that the same reading must refuse.
- **Red first** (round-1 log, entry "Plain alert red before the fix"): the run reports the
  `Tests  1 failed | 2 passed (3)` result line.
- **Mutation** (round-1 log, entry "Mutation plain-alert-fill"): the plain alert carries the `text-bg-primary` class,
  and the case reddens on the painted fill.
- **Frames:** the plain alert's frame at light-1280 and at dark-390.

### The popover header strip (P16, audit claim on the strip)

- **Mechanism:** the strip paints the header's own fill over the header's first row, and the header carries no top
  border. So the strip paints the fill the header already paints there, and no frame shows it apart from the header.
- **Where the ruling is stated:** the `CASCADE_KEYS` TSDoc and the guide patch. This report states the same mechanism.
- **Supporting reading:** the probe's computed values are in the `fo-probe-readings.log.txt` file. The strip's color
  equals the header's background in each mode, and the header's top border width is zero.
- **Copy:** the `POPOVER_COPY` paragraph ends at the bordered arrow, so the showcase no longer invites a comparison of
  the strip.
- **Proof:** the case titled "lays each titled popover's header strip on the header's first row, in the header's own
  fill". It reddens alone under each of the `strip-header-fill` and `strip-off-row` mutations (round-1 log).

The engine-written transition states stay unframed under V7 of the collapse verify verdict.

## Gates

Each command ran in the `/home/user/veneer-fo` worktree, with the brief's `PATH` and `PLAYWRIGHT_BROWSERS_PATH` values,
after the `npm run build:src` command exited 0. The round-2 gate logs are under the `tmp/units/` directory.

Format check, exit 0, result line `All matched files use the correct format.`:

```text
npx oxfmt --config .oxfmtrc.json --check app/browser/constants.ts tests/setup.ts tests/app/browser/integration.test.ts tests/app/browser/sections/CarouselSection.test.ts tests/app/browser/sections/AlertSection.test.ts tests/app/browser/sections/PopoverSection.test.ts
```

Lint, exit 0. The oxlint tool prints no summary line.

```text
npm run lint:check
```

Typecheck, exit 0, with no diagnostic:

```text
npm run check
```

Scoped app proofs, exit 0, result line `Tests  22 passed (22)`:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/CarouselSection.test.ts tests/app/browser/sections/AlertSection.test.ts tests/app/browser/sections/PopoverSection.test.ts tests/app/browser/Showcase.test.ts tests/app/browser/index.test.ts
```

Setup project, exit 0, result line `Tests  299 passed (299)`:

```text
npm run test:setup
```

Light-1280 capture over the whole journey, exit 0, result line `Tests  47 passed (47)`:

```text
CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project journey:light-1280\*
```

Dark-390 capture filtered to this unit's cases, exit 0, result line `Tests  3 passed | 44 skipped (47)`:

```text
CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project journey:dark-390\* -t reads\ every\ resting\ cascade\ key\|drives\ a\ carousel\ control\ to\ hover\|fading\ carousel\'s\ next\ control
```

Guide parity in a scratch copy of the worktree under the `tmp/probe/` directory, with the `fo-shared-2.patch` file
applied, exit 0, result line `Tests  20 passed (20)`:

```text
npm run test:guides
```

- The setup project and the light-1280 capture ran before the Orchestrator's decision to run scoped tests. Every
  source edit was already in the tree when they ran.
- An unfiltered dark-390 capture was stopped by process id after about 300 seconds, to follow that decision. The stop
  is recorded in the round-2 log. The filtered dark-390 run replaced it.
- The filtered run leaves out the portfolio guard, because the guard holds a run to every registered scenario.
- The capture commands use the `verbose` reporter in place of the brief's `dot` reporter, so the log names each case.

## Shared-file patch

The `fo-shared-2.patch` file supersedes the round-1 patch whole. It patches the `guides/veneer.md` file as it stands at
the `cf5e447` commit, and it edits these sections:

- § Alert classes: the plain alert.
- § Popover classes: the strip's mechanism.
- § Carousel classes:
  - the `w-100` class;
  - the captioned carousel's mid-tone pictures against the theme's caption in each mode;
  - which carousel carries each control's driven frames.
- § Tests: the pointer's reach inside the runner's window.

## Deviation state

No stop. This unit settled and recorded these choices:

- The captioned carousel keeps its role and changes only its picture fills. The inverted specimen stays the release's
  pairing of a dark carousel with light pictures.
- The `ALERT_COPY` and `POPOVER_COPY` paragraphs are edited. Each constant sits beside an owned table.
- The next control's scenarios use the fading carousel's stem, and its wrapper carries the `col-lg-6` class for the
  pointer's reach.

## Observations

- The reach fix is keyed to the `lg` boundary, while the reach limit is the runner's 800-pixel window. The verdict
  carries this to the FRAME-HELPERS unit.
- The fading carousel's driven frames are narrower than its resting frame, because of the half-width wrapper.
- The captioned carousel's resting marks read weaker in light than in round 1: 78 over the mid-tone, against 102 over
  the dark picture. The caption case holds each caption at 4.5:1 or more.

## Retained instruments

Each instrument is under the `tmp/units/` directory:

- the `fo-run.sh`, `fo-run-2.sh`, `fo-journey.sh`, and `fo-journey-2.sh` runner scripts;
- the `fo-mutate.py` and `fo-mutate-2.py` mutation scripts;
- the `fo-plant-carousel.py` planting script;
- the `fo-chevrons.py` reading script;
- the probe copies whose names end in the `.txt` suffix;
- the `fo-probe-readings.log.txt` readings file.

The `tmp/probe/` directory is empty.
