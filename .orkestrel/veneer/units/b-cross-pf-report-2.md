# PAGE-FRAME (`pf`) round 2 report

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-pf` (branch `unit/pf`, round 1's edits
over `dc92a09`). Nothing is committed.

## Outcome

Every acceptance criterion holds, and P-a to P-d are closed:
- **The settle re-read.** The `#settle` method re-reads on the viewport-sized path.
- **The pointer guard.** A structural guard sits before every pointer-held placement.
- **The un-lift mutation.** It reddens the `primary-hover` case at `light-1280` through that guard.
- **The unguarded un-lift run.** The same un-lift with the guard removed passes while its frame
  paints the rest fill, which settles audit claim 5 on the run.
- **"Opening".** The word carries one meaning: the heading and the Dark mode control.
- **The `scenarios` getter.** It derives from the recorded placements.

## P-a: the settle re-read

The `#settle` method in `tests/setupBrowser.ts` works in this order:
1. It stages the pane at the viewport the call finds.
2. It reads `max(measureContent(), viewport height)`.
3. It stages the pane again at that height on either path.
4. It reads a second time, and refuses when the second reading disagrees with the first.

The refusal message's wording is my decision under the deviation contract.

- **Code, before.** `if (pane === height) return pane` skipped the second staging and the re-read
  on the viewport-sized path.
- **Code, after.** That line is removed. The second `stagePane` call and the re-read run on every
  path.
- **Refusal message, before:** `Frame "<scenario>" never settled: its document reached <reading> CSS pixels on a <pane>-pixel pane`.
- **Refusal message, after:** `Frame "<scenario>" did not settle: its document measured <first> CSS pixels on the staged pane and <second> on the re-read`.
- **Class remarks, before:** "…then at the bounded content height the installed `measureContent`
  function reports where that is taller, and one more reading has to agree before the region is
  read."
- **Class remarks, after:** "It is staged at the viewport the call finds, the installed
  `measureContent` function reads the bounded content height, and the pane is staged again at that
  height, or at the viewport's height where the content is shorter. The content height is read a
  second time, and the region is read only when the two readings agree."
- **Class remarks (F3), before:** "A document that grows with every pane it is staged at is refused
  rather than chased".
- **Class remarks (F3), after:** "A document whose height changes when the pane is staged at it is
  refused rather than chased".
- **Method comment, before:** "Stages the pane at the viewport the call finds, then at the bounded
  content height where that is taller, and returns the staged height after a second reading agrees
  with it. The capture walks the same two stagings…".
- **Method comment, after:** "Stages the pane at the viewport the call finds and reads the content
  height, taking the viewport's height where the content is shorter. It stages the pane again at
  that height on either path, reads a second time, and returns the height when the two readings
  agree. The capture stages the viewport and then the content height it reads…".
- **`@throws` tags on the `place` and `page` methods, before:** "…exceeds {@link FRAME_AREA}, or
  when the document grows with the pane it is staged at".
- **`@throws` tags, after:** "An `Error` instance naming the scenario when the frame's area in
  device pixels exceeds the {@link FRAME_AREA} constant, or when the document's height changes after
  the pane is staged at it again".

**Proof (added).** The case `re-reads a document that fits the viewport after staging the pane
again, and refuses one whose height changed`, in `tests/setupBrowser.test.ts`:
- A real `MutationObserver` observer watches the tester pane for the installed `CAPTURE_PANE`
  marker. The installed `stagePane` function writes that marker on every staging.
- The observer grows the kept section to twice the viewport at the second staging alone. The
  document therefore fits the viewport at the first reading, and only the re-read sees the change.
- The case asserts the refusal names the viewport height as the first reading, and that no
  scenario is recorded.

**Proof (changed).** The case `refuses a placement whose document grows with every pane it is
staged at` expects the refusal text `did not settle: its document measured`.

**Red runs.**
- **Before the fix:** `npm run test:setup:browser` gave exit 1 with `Tests  2 failed | 72 passed (74)`
  (`.orkestrel/veneer/units/pf-instruments/pf-2-red-setup-browser.log.txt`). The added case failed on
  `promise resolved "undefined" instead of rejecting`, and the changed case failed on the old
  message.
- **The viewport-branch mutation.** It puts back `if (pane === height) return pane`. With the same
  command, the run gave exit 1 with `Tests  1 failed | 73 passed (74)`, and only the added case
  failed.
- **Settle refusal dropped.** This gave exit 1 with `Tests  2 failed | 72 passed (74)`: the changed
  case and the added case.
- **After the fix:** `Tests  74 passed (74)` (`.orkestrel/veneer/units/pf-instruments/pf-2-green-setup-browser.log.txt`).

## P-b: the pointer guard, the un-lift run, and the re-read comments

**Guard.** The expression `expect(mounted.host.querySelector('main')?.contains(<host>)).toBe(false)`
sits before each pointer-held placement in `tests/app/browser/integration.test.ts`. The comment
before the `primary-hover` guard states its reason. The guarded placements are these:
- the `primary-hover` scenario and the `primary-active` scenario;
- the `page-strip-hover` scenario, guarded before the `if (shooting)` block so the `expect` call
  stays unconditional under the `vitest/no-conditional-expect` lint rule;
- the `list-group-actions-hover` scenario and the `list-group-actions-active` scenario;
- the `dropdown-menu-hover` scenario;
- the `close-control-hover` scenario;
- the `captioned-carousel-hover` scenario;
- the nav hover scenarios placed by `FRAMES.place(scenario, element, specimen)` calls;
- the `navbar-expanded-hover` scenario.

**Un-lift mutation.** The `primary-unlifted` mutation leaves the Primary host in the Buttons
section. The command was
`CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-1280*" -t "repaints a host under the pointer while it is hovered and while it is held"`.
It gave exit 1 with `Tests  1 failed | 44 skipped (45)`. The `repaints a host under the pointer
while it is hovered and while it is held` case failed on `AssertionError: expected true to be false`,
which is the guard.

**Un-lift without the guard (observation settling claim 5).** The `primary-unlifted-unguarded`
mutation removes both guards in that case and ran the same command. It gave exit 0 with
`Tests  1 passed | 44 skipped (45)`: the hover readings alone pass an in-place host. The frame it
wrote, `primary-hover--light-1280.png` at 81 × 36, paints (8, 65, 234) down column 3
(`.orkestrel/veneer/units/pf-instruments/pf-2-unlifted-primary-hover-column.txt`). The case's own hovered reading is
`color(srgb 0.0288046 0.226349 0.817279)`, which is (7, 58, 208). The unmutated capture's lifted
frame, 81 × 35, paints (7, 58, 208) (`.orkestrel/veneer/units/pf-instruments/pf-2-lifted-primary-hover-column.txt`). So the
un-lifted frame shows a fill other than the hover mix while the case passes, and the guard is what
distinguishes it.

The mutation log is `.orkestrel/veneer/units/pf-instruments/pf-mutations-2.log.txt` (instrument `.orkestrel/veneer/units/pf-instruments/pf-mutations-2.sh`
with `.orkestrel/veneer/units/pf-instruments/pf-mutate-2.py`). Every mutated file was put back byte for byte, as a checksum check
after the run confirmed.

**Rewritten re-read comments** (each located by its case):
- **Primary pointer case.**
  - Before: "Both readings that decide the frame are taken here, before the pointer is placed
    again, and in the layout the shot was taken in: … Staging the pane again at the geometry the
    shot used, with the pointer left where the shot found it, puts the host back under it where
    the capture photographed it…"
  - After: "Both readings that decide the frame are taken here, before the pointer is placed
    again: … Staging the pane again at the viewport, with the pointer left where the shot found it,
    puts the host back under it. The placement has laid every section out again by then, but
    nothing above the lifted host was taken out of the layout, so the host sits where it sat at the
    shot…"
- **Page strip.**
  - Before: "Staging the pane again at the geometry the shot used, with the pointer left where the
    shot found it, puts the page back under it: …"
  - After: "Staging the pane again at the viewport, with the pointer left where the shot found it,
    puts the page back under it. Nothing above the lifted stage was taken out of the layout, so the
    strip sits where it sat at the shot: …"
- **Close control hover.**
  - Before: "Both readings that decide the frame are taken here, in the layout the shot was taken
    in. … Staging the pane again at the geometry the shot used puts the control back where the
    capture found it…"
  - After: "Both readings that decide the frame are taken here. … Staging the pane again at the
    viewport puts the control back under the pointer: nothing above the lifted specimen was taken
    out of the layout, so the control sits where it sat at the shot…"
- **Captioned carousel hover.**
  - Before: "The reading that decides the frame is taken in the layout the shot was taken in, the
    way the close control's hover frame is read back."
  - After: "The reading that decides the frame is taken with the pane staged again, the way the
    close control's hover frame is read back: nothing above the lifted specimen was taken out of
    the layout, so the control sits where it sat at the shot."
- **Form check box focus** (a page frame in place).
  - Before: "The focus is read again in the layout the shot was taken in, so a shot that found the
    box unfocused reddens here…"
  - After: "The focus is read again with the pane staged after the shot, so a shot that found the
    box unfocused reddens here… The placement has laid the other sections out again by then, which
    moves the box but leaves its focus and its ring where they were."
- **Nav hover loop.**
  - Before: "The readings that decide the frame are taken in the layout the shot was taken in:
    staging the pane again at the shot's geometry puts the link back under the pointer…"
  - After: "The readings that decide the frame are taken with the pane staged again at the
    viewport, which puts the link back under the pointer the capture left where it was: nothing
    above the lifted specimen was taken out of the layout, so the link sits where it sat at the
    shot."

## P-c: the prose

"Opening" means the heading and the Dark mode control everywhere.

**`tests/setup.ts`, the `SHOWCASE_KEYS` table:**
- **Summary, before:** "Lists the scenarios a journey photographs as a page frame of the page's
  opening."
- **Summary, after:** "Lists the scenarios a journey photographs as a page frame of the page's
  opening and the Showcase region."
- **Remarks, before:** "So the arrival frame carries the page's opening alone: the heading, the
  Dark mode control, and the region."
- **Remarks, after:** "The page's opening is the heading and the Dark mode control. … So the arrival
  frame carries the page's opening and the region alone."

**`tests/setupBrowser.ts`, the `FrameManager` class remarks:**
- **Before:** "so a frame's document is the page's opening, the one section holding the subject,
  and any specimen a journey lifted to the document's start."
- **After:** "A frame's document then holds what sits outside every `main` element, which in the
  showcase is the page's opening, the heading and the Dark mode control; the one section holding
  the subject; and any specimen a journey lifted to the document's start."

**`{@link FRAME_AREA}` references.** Each one in the class remarks and in both `@throws` tags reads
"the {@link FRAME_AREA} constant".

**Bare tokens the subjective lane's F4 names:**
- **The `recordPlacements` remarks, before:** "writes through `captureFrame`".
- **After:** "writes through the `captureFrame` function".
- **The lifted-panel comment in `tests/setupBrowser.test.ts`, before:** "the panel's `max-height`
  would stretch it to its whole specimen".
- **After:** "Against a document-tall pane that height would outgrow the specimen, and the panel's
  `max-height` limit would hold it at the whole specimen".
- **The same comment's "the page's opening"** reads "whatever else sits outside the `main` element",
  because that scene mounts no header.

**Further bare tokens, found by the sweep in § Sweeps:**
- **The `read` parameter:** "or `undefined` for a page frame" became "or the `undefined` value for a
  page frame".
- **`@throws` tags:** "An `Error` naming" became "An `Error` instance naming".

**`tests/app/browser/integration.test.ts`:**
- **The `check-group-focus` comment, before:** "which is why this frame covers the page and
  declares the label as its own region."
- **After:** "which is why this frame is a page frame, holding the page's opening and the Button
  group section, and declares the label as its own region."
  - The label sits in the Button group section, the section the round-1 height probe lists for the
    `check-group-focus` scenario, not a "Check group" section.
- **The range focus comment, before:** "an element frame taken where the showcase renders these
  specimens comes back blank, which is the measurement the `CASCADE_KEYS` table records."
- **After:** "an element frame taken where the showcase renders these specimens came back blank when
  it was measured before a placement bounded the document, the measurement the `CASCADE_KEYS` table
  records."
- **Integration comments of the form "the page's opening and the <name> section".** These already
  use the heading-and-control meaning and are unchanged.

**`pf-shared-2.patch`** (against `dc92a09`, superseding `pf-shared.patch` whole; `guides/veneer.md`
itself is unedited):
- **Stem row, round 1:** "The page's opening at rest, read through the region".
- **Stem row, round 2:** "The page's opening and the region, at rest".
- **Page-frame sentence, round 1:** "A page frame therefore carries the page's opening, the heading
  and the Dark mode control, and the one section holding its subject; the arrival frame's subject is
  the Showcase region, so that frame carries the opening alone."
- **Page-frame sentence, round 2:** "A page frame therefore carries the page's opening (the heading
  and the Dark mode control) and the one section holding its subject. The arrival frame's subject is
  the Showcase region, so that frame carries the opening and the region alone."
- **Staged-height sentence, round 1:** "…which is the variant's viewport or the bounded document's
  height, whichever is taller."
- **Staged-height sentence, round 2:** "…whichever is taller, and only after the pane is staged
  there again and a second reading of the document's height agrees with the first."
- **Unchanged from round 1:** the rewritten "first pixel" sentence, the "lift out of the mounted
  showcase" sentence, and the remainder of the bounded-document paragraph (text reflowed only).

## P-d: derived state

- **The `#scenarios` field.** It is removed, and the `#shoot` method no longer pushes to it.
- **The `scenarios` getter.** It returns `this.#placements.map((placement) => placement.scenario)`.
- **The `scenarios` getter doc, before:** "Lists every scenario admitted for placement so far, in
  placement order, written or not."
- **The `scenarios` getter doc, after:** "Lists the scenario of each entry in the {@link
  FrameManager.placements} list, in its order."
- **The `placements` getter doc, before:** "Lists every placed scenario so far, each with the region
  its subject declares."
- **The `placements` getter doc, after:** "Lists every scenario admitted for placement so far, in
  placement order, written or not, each with the region its subject declares."

No proof changed for P-d. The cases asserting `frames.scenarios` pass in the green run, including
the refusal cases that assert an empty list.

## Gates

The following gates are round-2 runs after the last source edit (`.orkestrel/veneer/units/pf-instruments/pf-2-gates.sh`,
`.orkestrel/veneer/units/pf-instruments/pf-2-gates.log.txt`).

| Command | Exit | Result line |
| --- | --- | --- |
| `npx oxfmt --check tests/setupBrowser.ts tests/setupBrowser.test.ts tests/setup.ts tests/setup.test.ts tests/app/browser/integration.test.ts` | 0 | `All matched files use the correct format.` |
| `npm run lint:check` | 0 | no result line printed (`.orkestrel/veneer/units/pf-instruments/pf-2-gate-lint.log.txt`) |
| `npm run check` | 0 | no result line printed (`.orkestrel/veneer/units/pf-instruments/pf-2-gate-check.log.txt`) |
| `npm run test:setup` | 0 | `Tests  287 passed (287)` |
| `npm run test:setup:browser` | 0 | `Tests  74 passed (74)` |
| `npm run test:guides`, in a scratch copy under `tmp/probe/` with `pf-shared-2.patch` applied | 0 | `Tests  19 passed (19)` (`.orkestrel/veneer/units/pf-instruments/pf-2-guides.log.txt`) |
| `npx oxfmt --config .oxfmtrc.json --check guides/veneer.md`, in that copy | 0 | `All matched files use the correct format.` (`.orkestrel/veneer/units/pf-instruments/pf-2-guide-format.log.txt`) |
| `CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project "journey:light-1280*"` (unmutated, through `.orkestrel/veneer/units/pf-instruments/pf-2-capture.sh`) | 0 | `Tests  45 passed (45)` (`.orkestrel/veneer/units/pf-instruments/pf-2-capture-light-1280.log.txt`) |

The scratch copy is removed.

The unmutated `light-1280` capture's frames (`.orkestrel/veneer/units/pf-instruments/pf-2-frames-light-1280.log.txt`) are these:
- **The `showcase` frame:** 1280 × 800.
- **The `bottom-offcanvas` frame:** 1280 × 392, region y 144 and height 240.
- **The tallest page frame:** the `navbar-collapsed-focus` frame at 1280 × 1648.
- **The portfolio case:** it passes.

## Sweeps

- **Prose tokens.** The sweep took every added comment or TSDoc line in
  `git diff dc92a09 -- tests`, matched backticked tokens and `{@link …}` tags with the pattern
  `` `[^`]*`[ ,.;:)]*[A-Za-z]* `` and `{@link [^}]*}[ ,.;:]*[A-Za-z]*`, and read the word following
  each one. The `Error` token and the `undefined` token were the remaining bare ones, fixed as
  § P-c states.
- **Re-read comments.** The pattern `shot was taken in|geometry the shot used` over
  `tests/app/browser/integration.test.ts` returns nothing.
- **Remaining "opening" hits.** The pattern `opening` over the owned files and the patch returns
  only the heading-and-control meaning.

## Records

The retained copies sit under `.orkestrel/veneer/units/`: the diff, the status, and the patch beside the
report, and every other record under `pf-instruments/`.

- **Report, diff, and status:** the `pf-report-2.md` file, the `pf-2.diff` file
  (`git diff dc92a09 -- tests`), and the `pf-2-status.txt` file.
- **Guide patch:** the `pf-shared-2.patch` file.
- **Mutation records:** the `pf-mutations-2.log.txt` file, and the per-mutation logs
  `pf-mutation-2-<name>.log.txt`.
- **Red and green runs:** the `pf-2-red-setup-browser.log.txt` file and the
  `pf-2-green-setup-browser.log.txt` file.
- **Gate logs:** the `pf-2-gate-<name>.log.txt` files.
- **Capture and guide logs:** the `pf-2-capture-light-1280.log.txt` file, the
  `pf-2-guides.log.txt` file, and the `pf-2-guide-format.log.txt` file.
- **Column readings:** the `pf-2-unlifted-primary-hover-column.txt` file and the
  `pf-2-lifted-primary-hover-column.txt` file.

Round 1's records are untouched. A header edit to the `pf-gates.sh` script was made by mistake
and undone to its original text in the next command.

## Diffstat against `dc92a09`

```text
 tests/app/browser/integration.test.ts | 202 ++++++++++++++++++++------------
 tests/setup.test.ts                   |   1 +
 tests/setup.ts                        |  51 +++++---
 tests/setupBrowser.test.ts            | 212 +++++++++++++++++++++++++++++++++-
 tests/setupBrowser.ts                 | 195 +++++++++++++++++++++++----
```

## Deviation state

No stop condition fired, and every change stays inside the owned files. These are the choices I
made under the deviation contract, with observations for the Orchestrator:
- **Refusal message wording.** The wording is my decision.
- **Check group section name.** The comment names the Button group section, which differs from the
  "Check group section" text the subjective lane proposed. The reason is in § P-c.
- **P-a proof seam.** The proof reaches its viewport-path change through the installed `CAPTURE_PANE`
  marker. That marker is a documented public constant, and the installed `stagePane` function
  writes it on every staging.
- **The `tmp/tailwind` directory.** It sits in the worktree with a modification time of
  2026-09-24 05:29, from a round-1 run, and I didn't create it deliberately. I left it for the
  Orchestrator to rule on.
- **Frames from the mutation runs.** The un-lift mutation runs wrote `primary-hover--light-1280.png`
  and `primary-active--light-1280.png` into `tmp/capture/states`. The unmutated `light-1280` capture
  that followed rewrote both files, so the directory holds unmutated frames at `light-1280`.
