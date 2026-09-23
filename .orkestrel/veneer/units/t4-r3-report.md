# Unit T4-R3 report (`opus` on Opus 5.5, native subagent, checkout `/home/user/test`)

The unit is complete and every acceptance criterion reads green. `measureContent` caps a descendant at `readClipEdge(frame)`. That edge starts from the box the frame's `overflow-clip-margin` value selects, which is the padding box by default. The frame from the Astra finding (3px border, 100px `clip` margin) reads 500, where the round-2 code read 503.

Deviation state: none. Every round-2 case keeps its reading. Chromium agrees with every expected value in E10. No gate went red for a cause outside these edits.

The container restarted mid-unit. After it came back, I re-read every owned file from disk and confirmed they held the intended edits. I then re-ran every gate and every mutation. All results in this report come from that post-restart run.

## Box-sizing measurement
- The computed `box-sizing` value of a frame that `buildFixture` renders in the `src:browser` project reads `content-box`. I added no `box-sizing` declaration to any fixture.
- I measured it with a temporary case in `tests/src/browser/helpers.test.ts` and removed that case before writing the unit's edits.
- The same case also hit-tested each E10 style with `document.elementFromPoint`. Each style ran over a 700px child, with the pane staged at 390x2356.
- The last row Chromium hit-tests on the child matched every E10 value: 420, 420, 420, 520, 500, 523, 500. The frame with no clip showed all 700 rows.
- The same probe showed how Chromium computes the keyword. `overflow-clip-margin: padding-box 100px` computes to `100px`, so the default keyword is dropped. `content-box 100px` and `border-box 100px` keep their keywords.

## Edits
- **E9, `src/browser/helpers.ts`:**
  - Added the exported `readClipEdge(element: Element): number | undefined` function before `readClipMargin`, with a summary, `@param`, `@returns`, `@remarks`, and `@example`.
  - It returns `undefined` when the `clipsOverflow` helper reports no clip.
  - For a `hidden`, `auto`, or `scroll` overflow, it returns the padding-box bottom: the border-box bottom plus `window.scrollY`, less `border-bottom-width`.
  - For a `clip` overflow or a paint containment:
    - the `border-box` keyword starts from the border-box bottom;
    - the `content-box` keyword starts from the padding-box bottom less `padding-bottom`;
    - otherwise it starts from the padding-box bottom.
  - In every one of those cases it adds `readClipMargin(element)`.
  - The `measureContent` loop drops its `clipsOverflow` check and caps at `readClipEdge(frame)` wherever that is defined. The frame's own contribution is unchanged.
  - The `measureContent` remarks name the clip edge read from the selected box, the padding box by default, with a `{@link readClipEdge}` tag.
- **E10, `tests/setupBrowser.ts`:** Added the frozen, documented `CLIP_EDGE_CASES` table with the brief's rows and values, every row frozen.
- **E10, `tests/src/browser/helpers.test.ts`:**
  - Added the `readClipEdge` case "reads the clip edge from the box the clip margin selects, the padding box by default". It asserts `{ style, edge }` per row, with the edge counted from the frame's top in document coordinates.
  - Added the `measureContent` case "expands a clip margin from the padding box rather than from the border box". It expects `[500, 500]` under the 844 and 2356 panes.
  - Every round-2 case is unchanged.
- **E11, `guides/test.md`:**
  - Added a Surface row for `readClipEdge` directly before the `readClipMargin` row. Its summary equals the TSDoc description: "Measures the row a clipping element cuts its content off at, in document coordinates."
  - Rewrote the § Capture clipping sentence and the closing sentence of the "Measure a document's content edge" pattern. Both name the clip edge that the `readClipEdge` helper reads from the selected box, the padding box by default.
  - Rewrapped the one overlong line in § Capture.

Diffstat against `10a9b3d`:
```
 guides/test.md                    | 21 +++++++-----
 src/browser/helpers.ts            | 69 ++++++++++++++++++++++++++++++---------
 tests/setupBrowser.ts             | 21 ++++++++++++
 tests/src/browser/helpers.test.ts | 35 ++++++++++++++++++++
 4 files changed, 123 insertions(+), 23 deletions(-)
```

## Failing first
- The command was `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "clipsOverflow|readClipEdge|readClipMargin|measureContent"`.
- Run against the round-2 `measureContent`, before the fix, it reported `Tests  1 failed | 7 passed | 336 skipped (344)`. The failing case was "expands a clip margin from the padding box rather than from the border box": `expected [ 503, 503 ] to strictly equal [ 500, 500 ]`.
- After the fix, the same command reports `Tests  9 passed | 336 skipped (345)`.

## Gates (after the restart, with PATH and PLAYWRIGHT_BROWSERS_PATH exported as the brief states)
- `npx oxfmt --write src/browser/helpers.ts tests/setupBrowser.ts tests/src/browser/helpers.test.ts guides/test.md`: `Finished in 1731ms on 4 files using 4 threads.`, exit 0.
- `npm run format:check`: `All matched files use the correct format.`, exit 0.
- `npm run lint:check` (`oxlint --config .oxlintrc.json --deny-warnings .`): printed no diagnostics, exit 0.
- `npm run check`: exit 0, with no `error TS` line in the log.
- The scoped browser command named in the preceding section: `Test Files  1 passed (1)`, `Tests  9 passed | 336 skipped (345)`, exit 0.
- `npm run test:guides`: `Test Files  1 passed (1)`, `Tests  51 passed (51)`, exit 0.
- No timing failure occurred, so no re-run was needed.

`git status --porcelain`:
```
 M guides/test.md
 M src/browser/helpers.ts
 M tests/setupBrowser.ts
 M tests/src/browser/helpers.test.ts
```

## Mutations
Each mutation ran through the same scoped browser command. The script `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/t4r3/mutate.py` applied each one to `src/browser/helpers.ts` and restored the file from a saved copy afterwards. A `cmp` against that copy then confirmed the file was restored.
- **Padding-box origin replaced by the border box** (`return padding + readClipMargin(element)` became `return border + readClipMargin(element)`):
  - Result: `Tests  2 failed | 7 passed | 336 skipped (345)`.
  - The `readClipEdge` case and the added `measureContent` case failed. The `measureContent` case exists to catch this same defect.
- **`content-box` keyword ignored** (its `includes('content-box')` branch could never match):
  - Result: `Tests  1 failed | 8 passed | 336 skipped (345)`.
  - Only the `readClipEdge` case failed.
- **Cap removed from `measureContent`** (`limit < bottom` became `limit < 0`, which never caps and keeps the binding in use):
  - Result: `Tests  4 failed | 5 passed | 336 skipped (345)`.
  - The added `measureContent` case failed, along with the round-2 clip, paint-containment, and clip-margin cases.

## Remaining note
The `@example` in the `readClipEdge` TSDoc shows how `measureContent` calls the helper. It is not a titled example, so no guide fence carries it.
