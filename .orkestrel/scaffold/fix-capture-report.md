# Unit FX2b report — a capture covers the document, and the pane comes back as it was

Role: `implementer` on Opus 5, standing in for the Sol implementer (Codex bench dark). Sole writer
in `C:\Users\mikes\WebstormProjects\test`. Baseline `ba6303a`, clean at dispatch. Nothing committed.

## Measurements

Taken first, from a temporary block appended to `tests/src/browser/helpers.test.ts` that decoded
written frames through `Image` and `OffscreenCanvas` and forced its readings out through a failing
`expect`. The block was removed before any implementation landed; the run that produced these
numbers is `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
tests/src/browser/helpers.test.ts -t MEASURE`, 5 failed | 203 skipped (208), 2026-09-02.

### The Unknown: does `releasePane` restore the viewport?

No. It never did.

| Reading                                   | Value       |
| ----------------------------------------- | ----------- |
| Tester viewport before staging            | `414 x 896` |
| After `stagePane(390, 844)`                | `390 x 844` |
| After `releasePane()`                      | `390 x 844` |
| After an explicit `page.viewport(414, 896)` | `414 x 896` |

The staged size therefore leaked into every later test in the file, and `captureFrame` left the
tester at the variant's viewport too: the reading after a capture at `390x844` was `390 x 844`
against a `414 x 896` reading before it. The prior viewport is readable — `window.innerWidth` and
`window.innerHeight` at the moment `stagePane` is entered — so the release can hand it back.

### The clipping the frame shows

| Case                                              | Document reading                     | Frame                                              |
| ------------------------------------------------- | ------------------------------------ | -------------------------------------------------- |
| 1600 px content, pane `390x844`, before the change | `scrollHeight` 1600, body box 1600  | 390x1600; top and middle `0,128,0`; **bottom `255,255,255`** |
| 1600 px content, pane restaged at 1600             | `scrollHeight` 1600 at both stagings | 390x1600; top, middle, and bottom `0,128,0`        |
| 40 px content, pane `390x844`                      | `scrollHeight` 896 (root fills)     | 390x844; every sampled row `0,128,0`               |

The frame's height already follows the tester body's box in the top-level page's coordinates, so
height alone never showed the defect — the **bottom row** did: the rows below the pane are the
runner's white page. Restaging at `document.documentElement.scrollHeight` paints them, and the
scroll height does not move when the pane grows to it, so one restaging is enough. A document
shorter than the pane needs none: it yields a frame at the pane's height on the document's own
floor.

### What the runner answers for a missing read

`commands.readFile(absolute, 'base64')` rejects: `Error: ENOENT: no such file or directory, open
'C:\Users\mikes\WebstormProjects\test\tmp\capture\frame\absent.png'`. A **relative** path is
resolved against the runner's own root rather than the calling test file
(`Access denied to "C:\Users\tmp\capture\frame\absent.png"`), so `readFrame` takes the absolute
path `captureFrame` returns. Both facts are now in `readFrame`'s TSDoc and in the guide.

## Changes

- `src/browser/types.ts` — added `FrameReading` (`width`, `height`, `floor`), with the reason the
  bottom row is the reading that answers for coverage.
- `src/browser/helpers.ts`
  - `stagePane` reads the tester's viewport before resizing and writes it onto the rule element it
    appends, as the `CAPTURE_PANE` value in `<width>x<height>` form. A second staging finds the rule
    already there and leaves that value alone, so the remembered viewport is the one before the
    first staging.
  - `releasePane` is now `() => Promise<void>`. It reads that value off the rule element it removes
    and resizes the tester back to it; an unstaged pane carries no such value, so the call still
    changes and resizes nothing.
  - `captureFrame` reads `document.documentElement.scrollHeight` after staging and stages a second
    time at `(width, scrollHeight)` where the document outruns the pane, and awaits the release in
    its `finally`. The TSDoc records the layout caveat: a rule bound to the viewport height — a `vh`
    length, a fixed footer, a full-height panel — lays out against the taller pane during the shot.
  - `readFrame(path)` added: reads the file through the runner's `readFile` command, decodes it with
    `Image` and `OffscreenCanvas`, and reports width, height, and the bottom row's single color as
    `rgb(r, g, b)` (`undefined` where that row paints several). Three refusals, named in the guide.
- `src/browser/index.ts` — untouched. The barrel is `export *`, so both new symbols are already
  published through it.
- `tests/src/browser/helpers.test.ts` — the cases listed under Proofs.
- `tests/setup.ts` — `ROUTED_FENCES` carries `'Read a written frame back'`.
- `guides/test.md` — `FrameReading` and `readFrame` rows, the rewritten `releasePane`,
  `captureFrame`, and `CAPTURE_PANE` rows, the coverage and caveat paragraphs, the `readFrame`
  paragraph, the release sentence, three refusal rows plus the narrowing note, contract rule 18's
  coverage and hand-back sentences, the portfolio paragraph's hand-back, the new
  `### Read a written frame back` pattern with its transcribed fence, and the `## Tests` entry.
- `README.md` — untouched; it names no capture symbol, so the transcription required nothing there.

## Proofs, red then green

Command, for every count below:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts
```

| Stage                                             | Result                                     |
| ------------------------------------------------- | ------------------------------------------- |
| Proofs written, no implementation                 | 1 failed suite, **no tests** — `The requested module '/src/browser/index.ts' does not provide an export named 'readFrame'` |
| `readFrame` added, neither defect fixed           | **2 failed** \| 207 passed (209)           |
| Both fixes landed                                 | **0 failed** \| 209 passed (209)           |

The two red tests, with their failing output:

- `stagePane > hands the tester back the viewport it had before the staging` —
  `AssertionError: expected [ 390, 1200 ] to strictly equal [ 390, 844 ]`. It stages twice and
  requires the release to return the viewport held before the first staging, so it also pins the
  restaging path the coverage change introduces.
- `captureFrame > covers a document taller than the pane, down to its last row` —
  `AssertionError: expected 'rgb(255, 255, 255)' to be 'rgb(0, 128, 0)'`. The frame's height was
  already the document's; the floor was the runner's canvas.

New cases that were green on arrival, because they cover an addition rather than a defect:

- `captureFrame > shoots a document shorter than the pane at the pane height, on the same floor`
- `readFrame > reports the size of a written frame and the color its bottom row paints` (the guide
  fence's transcription; it also compares the floor against the cascade's own answer for the canvas)
- `readFrame > reports no floor for a frame whose bottom row paints more than one color`
- `readFrame > refuses a path holding no file, and a file holding no image`

Two existing cases were updated for the `releasePane` signature: `stagePane > marks the pane …`
awaits the release, and `stagePane > releases an unstaged pane without complaining` awaits it twice
and now also asserts the viewport does not move.

## Scoped gates

| Gate                                                                   | Result                          |
| ---------------------------------------------------------------------- | -------------------------------- |
| `oxfmt --check` over the owned files                                   | All matched files use the correct format |
| `oxlint --deny-warnings` over the owned files                          | clean                           |
| `npm run check`                                                        | clean (root, core, browser, server) |
| `src:browser`, `tests/src/browser/helpers.test.ts`                     | 209 passed (209)                |
| `npm run test:src:browser` (whole project)                             | 1 failed \| 239 passed (240) — the failure is the off-limits file below |
| `npm run test:guides`                                                  | 38 passed \| 1 skipped (39)     |
| `npm run test:policy`                                                  | 111 passed (111)                |
| `npm run test:setup`                                                   | 24 passed (24)                  |

`git diff --stat`:

```text
 guides/test.md                    |  93 ++++++++++++++++++++++++++++++----
 src/browser/helpers.ts            | 104 ++++++++++++++++++++++++++++++++++----
 src/browser/types.ts              |  20 ++++++++
 tests/setup.ts                    |   1 +
 tests/src/browser/helpers.test.ts |  98 +++++++++++++++++++++++++++++++++--
 5 files changed, 292 insertions(+), 24 deletions(-)
```

`git status --porcelain`:

```text
 M guides/test.md
 M src/browser/helpers.ts
 M src/browser/types.ts
 M tests/setup.ts
 M tests/src/browser/helpers.test.ts
```

## Shared-file patch — `tests/src/browser/factories.test.ts` (off-limits, not edited)

This file asserts the leak the unit removes, so it is red until the patch lands:

```text
FAIL tests/src/browser/factories.test.ts:180:2 > createPortfolio > applies the variant, resizes the viewport, writes the file, and records it
AssertionError: expected 414 to be 390
 ❯ tests/src/browser/factories.test.ts:198:28
```

Patch, at line 180 and at lines 198-199:

```diff
-	it('applies the variant, resizes the viewport, writes the file, and records it', async () => {
+	it('applies the variant, hands the viewport back, writes the file, and records it', async () => {
```

```diff
 		expect(applied.count).toBe(1)
-		expect(window.innerWidth).toBe(390)
-		expect(window.innerHeight).toBe(844)
+		// `place` shoots at the variant's viewport and `captureFrame` hands the tester back, so the
+		// reading after it is the viewport this file started at rather than the variant's.
+		expect(window.innerWidth).toBe(width)
+		expect(window.innerHeight).toBe(height)
```

A second, prose-only correction at lines 296-299: the comment inside the routed
`"Place a capture portfolio"` fence transcription claims the placement above it left the viewport at
the variant's size. Its assertions still hold, because the case sets `page.viewport(320, 480)`
explicitly, but the sentence is now false:

```diff
 			// A run that omits `enabled` returns undefined here, resizes nothing, and records nothing.
-			// The placement above left the viewport and the theme at what `dark-390` selects, so a
-			// viewport and a theme that variant does not produce are staged before the disabled call.
-			// The readings after it then answer for that call rather than for the one before it.
+			// The placement above handed the viewport back and left the theme at what `dark-390`
+			// selects, so a viewport and a theme that variant does not produce are staged before the
+			// disabled call. The readings after it then answer for that call rather than for the one
+			// before it.
```

Applying the first patch is expected to bring `npm run test:src:browser` to 240 passed (240). I did
not apply or run it, because the file is off-limits to this unit.

## Optional patch — `src/browser/constants.ts` (off-limits, not edited)

`CAPTURE_PANE`'s TSDoc stays true — the attribute is still written onto the pane and onto the
stylesheet, and both are still found by it — but it does not say what the value on the stylesheet
now carries. `stagePane` and `releasePane` document that, and so does the guide. If the reader who
meets the constant first is meant to learn it there too:

```diff
  * `stagePane` writes it onto the pane and onto the stylesheet it appends, and `releasePane` finds
- * both by it. Nothing else reads it, so a document carrying it after a capture returned is a pane
- * that was never released.
+ * both by it. The stylesheet's value is the viewport the tester had before the first staging, in
+ * `<width>x<height>` form, which is what `releasePane` hands back. Nothing else reads it, so a
+ * document carrying it after a capture returned is a pane that was never released.
```

## Claims not closed

- The viewport is remembered in the DOM rather than in module state, because a non-exported
  module-scope declaration in `src/browser/helpers.ts` fails the policy sweep's "every centralized
  declaration is exported" rule and an exported mutable holder is worse API. The rule element in the
  owner document's head is the holder: `stagePane` creates it once and the runner does not replace
  it. A pane whose node the runner replaced between the staging and the shot loses its own marker
  attribute either way, which `stagePane`'s TSDoc already records.
- `Capture frame at <path> cannot be measured without a 2D canvas` is not driven by a test. A canvas
  allocated for this reading and asked for no other context type hands one back, so it is narrowing
  of the kind the guide already documents beside the other capture guards, and it is recorded there.
- The layout caveat is documented, not closed: a `vh` length or a fixed footer lays out against the
  taller pane during the shot. Closing it would mean shooting in strips and stitching them, which is
  a different capability from the one this unit owns.
- Every reading in this report was taken on Windows 11 with Playwright Chromium at
  `deviceScaleFactor` 1, where a device pixel is a CSS pixel. `FrameReading` reports device pixels,
  so a host running at another ratio reports the frame's own pixels rather than the pane's numbers —
  the assertions on exact widths in the suite would answer differently there.
