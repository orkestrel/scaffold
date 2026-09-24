# PAGE-FRAME (`pf`) design verdict — the Orchestrator's reconciliation (2026-09-24)

Brief: `pf-design-brief.md`. Lanes that ran, blind to each other on that brief: the subjective lane,
`planner` on Opus 5.5 (`pf-design-planner-proposal.md`, a native subagent in a clean context), and the
objective lane, `analyst` on GPT-6 Astra (`pf-design-analyst-proposal.md`, thread
`01a0d1c8-7665-7013-aee3-9950649ce513`, journal `tmp/codex/pf-design-analyst.jsonl`).

## Evidence the brief did not carry

- **The verify verdict's row V1** (`../b-collapse-verify-verdict.md`): every focus and hover page frame
  becomes an element frame over its lifted specimen, because no lens found a ring in a page frame of
  the whole document. The brief omitted it; neither lane ruled on it.
- **The bottom offcanvas region at 390.** The batch-2 capture at `light-390` and `dark-390` fails the
  portfolio case on `bottom-offcanvas--<variant>.png`: the region was recorded at `y` 130.8 and height
  253.2 (30vh of the 844-pixel pane the `FrameManager` class stages), and the frame shows the panel 392
  pixels tall from the frame's top edge, because the installed `captureFrame` function restages the pane
  to the document's content height before the shot and `max-height: 100%` then holds. The region is
  read in a layout the shot does not use. The objective lane named the same gap from source: the class
  remarks' claim that the capture "moves nothing" is not established by staging the viewport height.

## Rulings

- **R1 — Bound every placement's document (both lanes, option A; extended by the Orchestrator).** For
  the shot, every child of the showcase's `main` element that holds neither the subject nor the frame
  is taken out of the layout through the `hidden` attribute, and the call removes only the attributes it
  set, in `finally`, on every path. The children are read from the rendered `main`, never enumerated by
  name. Both lanes proposed this for page frames; the Orchestrator extends it to element frames,
  because an element frame of a lifted specimen still sits in a document the capture stages at its
  whole content height, so its viewport-height lengths resolve against that height (the bottom
  offcanvas panel) and its staging grows with every family (the planner's element-frame staging risk).
  With the sections out of the layout, a lifted specimen's document is the opening and the specimen,
  and its viewport-height lengths resolve against the variant's viewport.
- **R2 — Read the region at the geometry the shot uses (objective lane).** After R1, the class stages
  the pane at the height the capture reaches — the variant's height or the bounded content height from
  the installed `measureContent` function, whichever is taller — requires one re-measure to agree, and
  reads the region there. It refuses unstable geometry rather than copying the capture's convergence
  loop. The class remark that the capture "moves nothing" is rewritten to what is proved.
- **R3 — An area guard (subjective lane, option E).** The class refuses, before the shot and on every
  run, a frame whose area in device pixels exceeds `FRAME_AREA` in `tests/setup.ts`: 1280 × 41954, the
  largest frame a run has read back (the batch-1 `showcase--dark-1280.png`, 204.9 MiB decoded). The
  refusal throws an `Error` naming the scenario and the measured size. The objective lane's 64 MiB and
  16384-pixel proposals are unmeasured and are not adopted. Admission is never met by clipping,
  scaling, or skipping a scenario (objective lane).
- **R4 — The arrival frame (both lanes).** `showcase` stays a page frame. Under R1 it shows the header
  and the Showcase region, which is a child of `main`. The guide's stem row and the `SHOWCASE_KEYS`
  TSDoc state that.
- **R5 — The page strip (subjective lane).** The `page-strip-hover` and `page-strip-focus` placements
  become element frames of the padded stage their case already builds, because a pointer state is
  never a page frame: R1 can move a subject out from under a pointer.
- **R6 — Pointer states under R1.** R1 hides the Showcase region too, unless the region is the
  subject, so every in-place subject moves up when its placement starts. Every pointer-held placement
  is therefore on a specimen lifted to the document's start, above the header, where R1 moves nothing,
  and the case reads `:hover` after the shot. The unit lists each pointer placement and its reading,
  and lifts the ones it finds in place.
- **R7 — V1 is not this unit's.** Both lanes cost the lifted-element-frame conversion of every focus
  page frame as a rewrite of each cross-section keyboard walk and each ring reading; R1 already bounds
  those frames to the opening and one section. V1's accepted ruling stands, and its carrier becomes
  FOCUS-FRAME (`ff`), dispatched after PAGE-FRAME lands: before its dispatch the Orchestrator reads each
  focus frame PAGE-FRAME regenerates and scopes FOCUS-FRAME to the scenarios whose ring a reader cannot
  find in its bounded frame. The BCF brief's sentence naming PAGE-FRAME as V1's carrier is superseded by
  this ruling; BCF's own instruction, to convert no page frame, is unchanged.
- **R8 — The stale guide sentence (subjective lane).** The sentence stating that the declared region is
  read against "that region's first pixel" is false, because the read-back uses the frame's floor; it
  sits in the paragraph this unit edits, so the unit rewrites it.
- **R9 — Test-side carriers.** A `readFrame` refusal that names the frame's size, a `captureFrame` that
  stages the content height only for a page frame, and a first-screen page frame need an
  `@orkestrel/test` release. They are recorded for the next Test release unit, which is not yet named.

## Units

| Unit | Role and engine | Depends on |
| --- | --- | --- |
| PAGE-FRAME (`pf`) | `opus` on Opus 5.5 in `/home/user/veneer-pf` from `dc92a09`; the browser proofs need a native lane | this verdict |
| PAGE-FRAME audit | `analyst` on Astra (objective) and `reviewer` on Opus 5.5 (subjective), and the checker on Sonnet | PAGE-FRAME |
| FOCUS-FRAME (`ff`) | scoped at dispatch per R7 | PAGE-FRAME's regenerated frames |

The FADE unit in flight adds no page frame; it is told under the mid-campaign rule that a placement
of its own goes through the same class and gets R1.
