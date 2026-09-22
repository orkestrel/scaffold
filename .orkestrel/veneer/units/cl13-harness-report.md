<!-- builder on the native cheap tier, native subagent, clean context, sole writer in the
Veneer checkout. Round 1 of the CL13 harness. Retained 2026-09-22 from the returned result.
Its brief is cl13-harness-brief.md. Round 1 is accepted in every respect that brief named; a
successor brief cl13-harness-brief-2.md follows because the BRIEF omitted the capture scope,
so the two sides of the portfolio were not comparable as images. -->

# CL13-harness report

## 1. Script path and invocation

`tmp/cl13/capture.mjs`, invoked as `node tmp/cl13/capture.mjs` from the Veneer checkout root
(`C:/Users/mikes/WebstormProjects/veneer`). One self-contained ESM script: it starts its own
static HTTP server on an ephemeral port bound to `127.0.0.1`, launches its own Chromium instance
through `playwright`, captures every variant, runs the blank-frame control, and tears down the
browser and the server in a `finally` block on every exit path, including a thrown assertion.

## 2. Frame naming and what the run produced

Filenames read as `<specimen>--<theme>--<width>`, so a verdict cites one exactly: for example
`base-table--dark--390.png`. All artifacts for one variant share that stem with a different
extension.

The run wrote, under `tmp/cl13/portfolio/`:

- 16 frames: one `.png` per specimen (`capped-container`, `numbered-columns`, `base-table`,
  `role-links`) times theme (`light`, `dark`) times width (`1280`, `390`).
- 16 accessibility snapshots, one `<stem>.accessibility.yaml` per variant, from
  `page.locator('body').ariaSnapshot()`.
- 16 step logs, one `<stem>.steps.log.txt` per variant, recording the specimen, theme, width,
  request URL, navigation status, measured pixel variation, and the page's console output for
  that variant.
- `manifest.json`, listing all 16 stems.
- `control.json`, the blank-frame control's two variation readings and the two ruling strings.
- `harness.log.txt`, the ordered step log the whole run produced, timestamped.

## 3. Unknowns

- **How Bootstrap 5.3.8 switches theme.** Read directly from the installed distribution:
  `node_modules/bootstrap/dist/css/bootstrap.css` lines 8 and 128 declare
  `[data-bs-theme=light]` and `[data-bs-theme=dark]` attribute selectors on the root element.
  The harness sets `data-bs-theme` on the `<html>` element and uses no other mechanism.
- **Whether every class Veneer's markup carries exists in Bootstrap's cascade.** Checked every
  class the four specimens use (`container`, `container-fluid`, `row`, `col-12`, `col-md-4`,
  `table`, `table-bordered` as a spot check for the table family, `link-primary`,
  `link-secondary`, `link-success`, `link-info`, `link-warning`, `link-danger`, `link-light`,
  `link-dark`, `link-body-emphasis`) against `bootstrap.css` with `grep`. Every one is present.
  No unshipped class was found in the four specimens this harness captures; see item 5.
- **What browser the harness can drive here.** Read `configs/browsers.ts` first: it resolves a
  managed Chromium through Playwright's own `chromium.executablePath()`, with a fallback ladder
  for a bundled or system browser. `configs/browsers.ts` is TypeScript and the checkout has no
  `tsx`-class runner installed to execute it directly from a plain Node script, so the harness
  does not import it. It instead calls `chromium.launch()` from the `playwright` package
  directly (JavaScript, importable as-is), which resolves the same Playwright-managed Chromium
  build `resolvePinnedBrowser()` would name as the pinned revision. A throwaway probe (`node
  tmp/cl13/probe.mjs`, left in place under `tmp/cl13/`) confirmed the launch succeeds on this
  host before the real run.

## 4. Blank-frame check: red and green

`tests/setupBrowser.ts`'s `measureFrameVariation` runs in-browser: it decodes a PNG into an
`OffscreenCanvas` and reports the fraction of pixels differing from the first pixel. The harness
reuses that exact approach (decode into a canvas, sample every pixel, compare against the first
pixel's RGBA) rather than reimplementing a Node-side PNG decoder, because none is declared as a
dependency and adding one is out of scope. The harness's `measureVariation` runs inside
`page.evaluate`, mirroring `measureFrameVariation`'s logic with a same-document `<canvas>` in
place of `OffscreenCanvas`.

The harness applies the loop's own assertion (`if (variation <= 0) throw`) to a deliberately
uniform 4x4 image and to a deliberately painted 4x4 image, inside the same run, and requires
both outcomes:

```
[2026-09-22T08:25:53.773Z] blank-frame control: uniform image variation = 0
[2026-09-22T08:25:53.773Z] blank-frame control: painted image variation = 0.75
[2026-09-22T08:25:53.773Z] blank-frame control, applied to the uniform image: RED (assertion threw, as required for a blank frame): Error: frame reported zero pixel variation; capture is blank
[2026-09-22T08:25:53.773Z] blank-frame control, applied to the painted image: GREEN (assertion passed, as required for a non-blank frame)
```

RED: the uniform image reads `0` variation and the loop's exact throw condition fires, proving
the check can fail. GREEN: the painted image reads `0.75` variation and the same condition does
not fire. The harness itself throws and the whole run fails if either direction comes out wrong
(`blank-frame control did not fail on a uniform image` / `... incorrectly failed on a painted
image`), so this is an executed proof, not a description. The full run log, including this
control, is at `tmp/cl13/portfolio/harness.log.txt`; the same two readings and rulings are in
`tmp/cl13/portfolio/control.json`.

Every one of the 16 real frames also passed the same check inline during capture (see
`tmp/cl13/portfolio/harness.log.txt` for each frame's own `variation for <stem>: <number>` line;
every reading is greater than zero, ranging from about `0.0013` for the plainest specimen to
about `0.0175` for the densest).

## 5. Classes Veneer's markup carries that Bootstrap does not ship

None found. Every class in the four mirrored specimens (`container`, `container-fluid`, `row`,
`col-12`, `col-md-4`, `link-primary`, `link-secondary`, `link-success`, `link-info`,
`link-warning`, `link-danger`, `link-light`, `link-dark`, `link-body-emphasis`, `table`) matched
a selector in `node_modules/bootstrap/dist/css/bootstrap.css`. No markup adjustment was made.

## 6. Git status

```
$ git status --porcelain --untracked-files=all
(no output)
```

Nothing tracked changed. `tmp/` is git-ignored (`.gitignore` line 11), so the new script and its
artifacts under `tmp/cl13/` report nothing.

## 7. What could not be closed

Nothing in the assigned scope. All four specimens' markup was reproduced byte-for-byte from
`app/browser/constants.ts` (the table specimen's markup pulled from its generating function's
own template-literal output for the `'table'` classes row, not hand-written from the class name).
Sixteen frames exist, four per specimen across both widths and both themes; every frame passed
the blank check; the check was proven able to fail against a real red and a real green; an
accessibility snapshot and a step log exist for each of the 16 variants; and no tracked file
changed.

One process note, not a gap in the assignment: `tmp/cl13/probe.mjs`, a throwaway launch check
used to confirm Chromium starts on this host before writing the real script, is left in place
under `tmp/cl13/` alongside `capture.mjs`. It is inert, git-ignored, and not part of the
portfolio the verdict round reads.
