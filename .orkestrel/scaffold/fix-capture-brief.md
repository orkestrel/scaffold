# Unit FX2b — a capture covers the document, and the pane comes back as it was

## Role and engine

`implementer` on Opus 5, native Claude Code subagent, standing in for the Sol implementer (Codex
bench dark). Sole writer in `C:\Users\mikes\WebstormProjects\test`. Perform the assignment
directly and spawn nothing.

## Objective

Make `captureFrame` write a frame that covers the whole document at the variant's width whatever
the variant's height, export the frame reader a suite needs to prove that, and make the pane
release hand the tester back the viewport it had before staging.

## Context

Law: `AGENTS.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md`,
`.claude/rules/documentation.md`, `.claude/rules/names.md`. TTTDD: types first in
`src/browser/types.ts`, then the failing proof, then the change, then the same command green.
Host: Windows 11, Git Bash; Playwright Chromium installed; browser tests through
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser <file>`.

**Finding, measured in terrain** (`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\scaffold\fix-terrain-report.md`
§ F2): the provider's `page.screenshot` shoots the tester `body` in top-level page coordinates,
and `captureFrame` stages the pane at the variant's declared height, so a document taller than
the pane is clipped and the rest of the frame is the runner's white canvas. At `390x844` a
1682 px document produced a 1718 px frame whose bottom 874 rows were `rgb(255,255,255)`. The
1280 frames were complete only because that document was exactly 800 px. The suite's interim
workaround declares a 1900 px pane, which costs the phone variants their real height.

**The code.** `src/browser/helpers.ts`: `stagePane` (calls `page.viewport(width, height)`, pins
the tester through a declared rule, waits two frames, checks the box), `releasePane`, and
`captureFrame` (stages, shoots, checks the path and the bytes, releases). `createPortfolio` in
`src/browser/factories.ts` calls `captureFrame` from `place`.

## Unknowns

- Whether `releasePane` restores the tester's viewport. The iteration-2 toolbar eval measured a
  staged capture width leaking into later tests at `md` and wider (the first-run dialog
  self-opening over the next test). Measure it: stage `390x844` from a tester at its default
  viewport, release, and read `innerWidth`/`innerHeight`. Where they differ from the reading
  before staging, restore them in `releasePane` (read and remember the viewport in `stagePane`,
  or take the reading from the runner's own properties) and pin it with a case.

## The change

1. **Cover the document.** After `stagePane(width, height)` has laid the document out at the
   variant's viewport, read `document.documentElement.scrollHeight`. Where it exceeds `height`,
   stage the pane again at `(width, scrollHeight)` for the shot alone, then release to what the
   tester had. Record in TSDoc the one layout caveat: a rule bound to the viewport height (`vh`,
   a fixed footer) lays out against the taller pane during the shot. Never write a frame shorter
   than the document.
2. **Export the reader.** `readFrame(path: string): Promise<FrameReading>` in
   `src/browser/helpers.ts`, with `FrameReading` in `src/browser/types.ts`: `width`, `height`,
   and `floor` (the bottom row's single colour as `rgb(r, g, b)` where the row is uniform, else
   `undefined`). Decode through the runner's `readFile` and the browser's own image decoding
   (`Image` and `OffscreenCanvas`, as the terrain suite did locally), so the reading is a second
   mechanism against the resolved style rather than a re-derivation of it.
3. **Prove it.** Browser cases with a fixture document taller than a `390x844` pane:
   - the frame's height is at least the document's scroll height and its floor is the document's
     own background, red before the change (record the command and count) and green after;
   - a document shorter than the pane still yields a frame at the pane's height with the same
     floor;
   - the release case from Unknowns;
   - a `readFrame` case on a written frame and a refusal on a missing path.
4. **Document.** `guides/test.md`: the `readFrame` and `FrameReading` rows in the Surface tables,
   the capture section's sentence on coverage and the caveat, a transcribed fence where the
   guide prints a value, and `README.md` only if the guide's transcription requires it.

## Scope

**Owned.** `src/browser/types.ts`, `src/browser/helpers.ts`, `src/browser/index.ts` only if the
barrel is explicit, the browser test file that covers captures, `guides/test.md`,
`tests/guides.test.ts` where a fence is transcribed, `tests/setup.ts` only for `ROUTED_FENCES`.
**Off-limits.** Every other file; `package.json`; version; commits; no
`git checkout`/`restore`/`stash`/`reset`/`clean`.

## Output

Write `tmp/units/fix-capture-report.md` and return it: the measurements (the release unknown
first), each change, the red-then-green commands and counts, `git diff --stat`,
`git status --porcelain`, scoped gates (`format:check`, `lint:check`, `check`,
`test:src:browser`, `test:guides`, `test:policy`), claims not closed.

## Deviation contract

Stop and report when the provider's screenshot cannot be made to cover the document from inside
the layer, when the release cannot read the prior viewport, or when a proof cannot be made to
fail before the change. Decide and record test names and the fixture shape.

## Acceptance criteria

1. A frame of a document taller than the pane covers it, proved red then green.
2. `releasePane` leaves the tester at the viewport it had before staging, proved.
3. `readFrame` and `FrameReading` are exported, documented, and tested; scoped gates green.
