# Unit FX3b — the phone pane is back, the controls enter through the root, and the layer still clips

`implementer` on Opus 5, sole writer in `C:\Users\mikes\WebstormProjects\terrain`. Baseline
`a96d941`, clean at dispatch apart from the lockfile pair the brief named. Nothing committed,
nothing installed, no off-limits file edited, the lockfile pair untouched.

## Headline — stopped on the deviation contract's first condition

**The rebuilt layer still clips a 390 frame.** Four of the six 390 frames come back with the
runner's page on their lower rows: one row on `schedule-empty` in each theme, and 29 rows on
`schedule-populated` in each theme. The two 390 capture runs are red at the capture proof, which is
the proof that reads it. Acceptance criterion 1 is **not met**, and criterion 3 is met except for
those two runs.

Everything else in the brief is done and green. Two further deviations are recorded: the rebuilt
`releasePane` silently broke the suite's `resizeViewport`, which left the committed baseline 8-red
before any edit of mine, and `ShotReading` is kept rather than deleted because the layer publishes no
replacement for it.

## Installed-build proof

`node_modules/@orkestrel/test` is the rebuilt campaign build, version `0.0.11`.

- `readFrame` is implemented at `node_modules/@orkestrel/test/dist/src/browser/index.js:1870` and
  exported from the barrel at line 2162. It takes a path, reads it through `commands.readFile`,
  decodes it with `Image` and `OffscreenCanvas`, and returns `{ width, height, floor }` where `floor`
  is `string | undefined`.
- `FrameReading` is declared at `node_modules/@orkestrel/test/dist/src/browser/index.d.ts:719`.
- `captureFrame` carries the coverage change: it reads `document.documentElement.scrollHeight` after
  staging and stages a second time at that height where the document outruns the pane.
- `releasePane` carries the hand-back change: it reads the pre-staging viewport off the rule element
  and calls `page.viewport` with it.

## Changes

| File                                    | Change                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/app/browser/integration.test.ts` | 390 variants back to 844 with the pane-height justification replaced; `readFrame` imported from the layer and called with the path; the frame proof's upper bound dropped and its floor read as a single colour; both style controls appended to the read root; the variant viewport applied through `page.viewport` |
| `tests/app/browser/setup.ts`            | local `readFrame` and `FrameReading` deleted; `resizeViewport` deleted; `buildMarkControl` added; `ShotReading` kept                                                                                                                                                                                                                     |

### 1. The 390 variants declare 844

`{ name: 'light-390', width: 390, height: 844 }` and the same for `dark-390`. The comment that
justified 1900 is gone. Its replacement states that a variant declares the viewport it renders at,
and that the layer stages a taller document's shot at the document's own height.

### 2. The frame reader is the layer's

`readFrame`, `FrameReading`, and the base64 hand-off are gone from `tests/app/browser/setup.ts`. The
suite imports `readFrame` from `@orkestrel/test/browser` and calls `await readFrame(path)` with the
absolute path `place` returned, so the runner's own read refusal is the layer's rather than the
suite's. The proof keeps its shape and drops the pane bound:

```ts
expect(frame.width).toBe(CURRENT.width)
expect(frame.height).toBeGreaterThanOrEqual(shot.height)
expect(frame.floor).toBe(shot.background)
```

`frame.floor` is the layer's single colour rather than the suite's deduplicated list, so the floor
comparison is an identity rather than a one-element array.

### 3. Both controls enter through the read root

The census carries two controls, as the instruments reference requires. `ABSENT_CLASS` is still fed
straight to the reading and covers the subtraction. `ABSENT_MARK` is added: `buildMarkControl` builds
a real SVG element carrying that token on its `class` attribute, the proof appends it to `host`
before `readClasses(host)` walks it and takes it off after, and the difference must report both
tokens sorted. The SVG namespace is the point — an SVG element's `className` is an
`SVGAnimatedString`, so this control fails a reading that reaches for `className` as well as one that
never leaves the root it was handed.

The escape reading follows the same door: the proof appends a `p` element carrying
`ESCAPE_DECLARATION` to `host`, reads `extractStyles(host)`, removes the control, and asserts the
reading reported exactly that element's opening tag. The fed control before the loop stays, so the
reading carries a fed control and an appended one.

Every population report is kept: `expect(authored.size).toBeGreaterThanOrEqual(CLASS_FLOOR)` with
`CLASS_FLOOR = 40`, and the variant coverage assertion `expect(read).toEqual(VARIANTS.map(...))`. The
census walked 199 tokens at 390 in the measurement below.

## Deviation A — the rebuilt `releasePane` broke `resizeViewport`, and the committed baseline was red

**Expected.** A committed baseline green apart from the three changes the brief names.

**Found.** The committed baseline `a96d941` is 8-red on the rebuilt layer, before any edit:

```text
VITE_VARIANT=light-1280 npx vitest run --config vite.config.ts --no-cache --reporter=dot
  --project app:browser tests/app/browser/integration.test.ts

Tests  8 failed | 2 passed | 1 skipped (11)
FAIL ... > adds a building through the keyboard, deletes it, and reads focus back on the primary command
FAIL ... > speaks none of the engine words the interface translates
FAIL ... > withholds Delete until a row is selected, and Import until a person opens the CSV menu
FAIL ... > reads the primary command above its contrast bars in every declared variant
       Error: Interactive target "Add new building" is not reachable through forward Tab traversal:
FAIL ... > hands a saved schedule back to a second session, and opens empty over storage that holds none
FAIL ... > says the saved workspace could not be opened, and opens it when a person retries
FAIL ... > drives every declared Delete transition through the interface
       Error: idle x select -> armed, through the row checkbox: build refused
FAIL ... > places every registered state and places nothing else
```

**Evidence of the cause.** `resizeViewport` was `await stagePane(width, height)` followed by
`releasePane()`. The rebuilt `releasePane` hands the pre-staging viewport back, so the pair resizes
the tester and then puts it back, asynchronously, part way through the next journey step. Measured in
the browser at `light-390`:

```text
default     390x1900   the beforeEach staging, its release not yet resolved
afterResize 390x844    immediately after `await resizeViewport(390, 844)`
afterFrames 390x1900   two animation frames later, the release has landed
afterStage  390x844    `stagePane` alone holds
mounted     390x844 scroll=1191
```

**Fix, in an owned file.** `resizeViewport` is deleted and the suite applies the variant's viewport
with `page.viewport(width, height)` from `vitest/browser`, which is what `stagePane` itself calls to
resize. Keeping the helper would have left a 1:1 forward, which `AGENTS.md` refuses under
"No superfluous wrappers". Only `tests/app/browser/integration.test.ts` called it, so no off-limits
file moved. Measured after the change:

```text
afterViewport 390x844
afterFrames   390x844
mounted       390x844 scroll=1191
traversed=true
classes=199
wide          1280x800
```

**Done or not done.** Done. Every run below is on that fix.

**Hypothesis.** The hand-back is right for a capture, which stages and releases inside one call. It
is wrong for a workspace helper that used the stage-then-release pair as a resize, and
`@orkestrel/test` publishes no verb for putting the tester at a viewport and leaving it there.

## Deviation B — the rebuilt layer still clips a 390 frame

**Expected.** On the rebuilt layer, a 390 variant declaring 844 films its whole document.

**Found.** Four of the six 390 frames end on the runner's page. Read back from disk with a PNG
decoder that inflates the IDAT stream and unfilters the scanlines (`tmp/frame.mjs`, run as
`node tmp/frame.mjs tmp/capture/states`), on the final tree:

```text
delete-armed--dark-1280.png        1280x800  floor=rgb(33, 39, 44)    trailingUniformRows=49
delete-armed--dark-390.png         390x1718  floor=rgb(33, 39, 44)    trailingUniformRows=33
delete-armed--light-1280.png       1280x800  floor=rgb(248, 249, 249) trailingUniformRows=50
delete-armed--light-390.png        390x1718  floor=rgb(248, 249, 249) trailingUniformRows=34
schedule-empty--dark-1280.png      1280x800  floor=rgb(33, 39, 44)    trailingUniformRows=97
schedule-empty--dark-390.png       390x1192  floor=rgb(255, 255, 255) trailingUniformRows=1
schedule-empty--light-1280.png     1280x800  floor=rgb(248, 249, 249) trailingUniformRows=98
schedule-empty--light-390.png      390x1192  floor=rgb(255, 255, 255) trailingUniformRows=1
schedule-populated--dark-1280.png  1280x800  floor=rgb(33, 39, 44)    trailingUniformRows=49
schedule-populated--dark-390.png   390x1718  floor=rgb(255, 255, 255) trailingUniformRows=29
schedule-populated--light-1280.png 1280x800  floor=rgb(248, 249, 249) trailingUniformRows=50
schedule-populated--light-390.png  390x1718  floor=rgb(255, 255, 255) trailingUniformRows=29
```

The dark rows settle it. `schedule-populated--dark-390.png` ends on 29 rows of `rgb(255, 255, 255)`:
the dark surface paints nothing white, and white is what the runner's own page paints, so those rows
are the runner rather than the surface. The same reading names the single row on both
`schedule-empty` frames.

**Mechanism, measured in the browser at 390x844.** `captureFrame` reads the height it restages at
once, before the restaging changes the layout:

```text
empty      scroll=1191  bodyBox=1191.46875
populated  scroll=1675  bodyBox=1674.53125
staged     scroll=1694  bodyBox=1694.40625  pane=1675   after stagePane(390, 1675)
armed      scroll=1718  bodyBox=1717.828125
```

Two faults sit in that table and both are the same line of code:

- **The floor.** `document.documentElement.scrollHeight` is an integer and the body's box is
  fractional — 1191 against 1191.46875 — so the pane is staged one row shorter than the box the
  provider clips to. That is the one row on `schedule-empty`.
- **The reflow.** Staging the pane at 1675 makes the document 1694.40625 tall, because a rule bound
  to the viewport height lays out against the taller pane. `captureFrame` never re-reads it, so the
  shot is of a 1694-row body over a 1675-row pane. That is the 29 rows on `schedule-populated`.

The layer's TSDoc names the reflow as a layout caveat about what the frame shows. It is more than
that: it changes the height the shot needs, so the pane the caveat describes is also too short.

**Settling change, in `@orkestrel/test` rather than here.** Stage the shot at
`Math.ceil(document.body.getBoundingClientRect().height)` rather than at the floored `scrollHeight`,
and re-read after each restaging until the height stops moving, or refuse the shot. Neither is
reachable from this unit's owned files.

**Done or not done.** The suite's part is done: the proof reads the defect and names it. The layer's
part is not, and the two 390 capture runs stay red until it lands.

## Deviation C — `ShotReading` is kept

The brief asked for the local `readFrame`, `FrameReading`, and `ShotReading` to be replaced by the
layer's `readFrame` and `FrameReading`. The layer publishes no `ShotReading`, and the proof shape the
brief keeps needs both fields it carries: the document height the frame must cover, and the
background the frame must end on. It stays in `tests/app/browser/setup.ts`, which
`.claude/rules/tests.md` fixes as the home for a fixture type. Ancillary, decided, recorded.

## Runs

The command for every row:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/integration.test.ts`

| Run                                         | Summary                             |
| ------------------------------------------- | ----------------------------------- |
| `VITE_VARIANT=light-1280`                   | `Tests 10 passed \| 1 skipped (11)` |
| `VITE_VARIANT=dark-1280`                    | `Tests 10 passed \| 1 skipped (11)` |
| `VITE_VARIANT=light-390`                    | `Tests 10 passed \| 1 skipped (11)` |
| `VITE_VARIANT=dark-390`                     | `Tests 10 passed \| 1 skipped (11)` |
| `VITE_CAPTURE=true VITE_VARIANT=light-1280` | `Tests 11 passed (11)`              |
| `VITE_CAPTURE=true VITE_VARIANT=dark-1280`  | `Tests 11 passed (11)`              |
| `VITE_CAPTURE=true VITE_VARIANT=light-390`  | `Tests 1 failed \| 10 passed (11)`  |
| `VITE_CAPTURE=true VITE_VARIANT=dark-390`   | `Tests 1 failed \| 10 passed (11)`  |

The skip in an ordinary run is the capture-membership proof, which runs only under the flag. Both
failures are the same assertion on the same defect:

```text
FAIL tests/app/browser/integration.test.ts:477 > writes every frame this run owes, each one covering its whole surface
AssertionError: expected 'rgb(255, 255, 255)' to be 'rgb(248, 249, 249)'   light-390
AssertionError: expected 'rgb(255, 255, 255)' to be 'rgb(33, 39, 44)'      dark-390
```

`tmp/` is git-ignored, so no frame and no instrument enters a commit.

## Failing-first proofs

Each added control was planted off the root it must enter through, on the final tree, and each plant
reddened exactly the reading it covers. Command for both:
`VITE_VARIANT=light-1280 ... -t "reads the primary command"`.

| Plant                                                                | Result                                                                                                                              |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `host.append(mark)` to `build('div').append(mark)`                   | `AssertionError: expected [ 'terrain-undeclared-control' ] to deeply equal [ 'terrain-undeclared-control', ...(1) ]`, 1 failed \| 10 skipped (11) |
| `host.append(escapeControl)` to `build('div').append(escapeControl)` | `AssertionError: expected [] to deeply equal [ '<p style="color: rgb(1, 2, 3)">' ]`, 1 failed \| 10 skipped (11)                     |

Both plants were removed and the file matches the final tree: `git diff --stat` reports the same
counts before and after, `oxfmt --check` passes on it, and the two confirmation runs after the revert
returned `10 passed | 1 skipped` for the ordinary `light-1280` run and the same single capture
failure for `dark-390`.

The clip in Deviation B is its own failing-first proof: the assertion that reads it is red on the
tree as it stands, and it was written before the defect was diagnosed.

## Scoped gates

```text
npm run format:check   All matched files use the correct format. (216 files)
npm run lint:check     exit 0, no output
npm run check          clean: tsc --noEmit, tsc -p configs/app/tsconfig.core.json, vue-tsc -p configs/app/tsconfig.browser.json
```

## Review evidence

`git diff --stat`:

```text
 tests/app/browser/integration.test.ts | 92 ++++++++++++++++++++++-------------
 tests/app/browser/setup.ts            | 63 +++++-------------------
 2 files changed, 71 insertions(+), 84 deletions(-)
```

`git status --porcelain`:

```text
D  package-lock.json
 M tests/app/browser/integration.test.ts
 M tests/app/browser/setup.ts
?? package-lock.json
```

The lockfile rows are the standing condition the brief named. Nothing staged, restored, or rewrote
them.

## Acceptance criteria

1. **The 390 variants declare 844 px and every 390 frame reads complete on the surface's own floor.**
   Half met. The declaration is 844. The frames are not complete: four of six carry the runner's page
   on their lower rows, and the reading that says so is Deviation B.
2. **No local frame reader remains; the suite imports `readFrame` from the layer.** Met.
3. **Both negative controls enter through the read root; all runs and scoped gates green.** Met for
   the controls and the gates. Six of eight runs are green; the two 390 capture runs are red on the
   layer defect.

## Claims I could not close

- **The layer's clip.** Named, measured, reproduced. The change is in `@orkestrel/test` and the
  Orchestrator carries it. Until it lands, a 390 capture run is red at the capture proof, which is
  the honest state rather than a suppressed instrument.
- **The armed Delete's 4.5 shortfall.** Unchanged from FX3: 6.701 light, 4.045 dark, under the text
  bar in both dark variants. The repaint is an `app/**` change.
- **The statechart harness page and its gate.** Unchanged. Building one is an `app/**` change.
- **The written artifact per variant.** The `decide.md` reference asks for a `describeTree` and
  `describeFocus` file per variant under `tmp/`. No test writes one and this brief does not name it.
- **The guide.** The `guides/README.md` file is outside this unit's owned files, so the deleted
  `resizeViewport`, the added `buildMarkControl`, and the changed frame reader are not reflected
  there.

## Instruments left in `tmp/`

- `tmp/frame.mjs` — the PNG decoder reporting each frame's size, its floor, and its trailing uniform
  rows. It is the evidence behind Deviation B and it re-produces every number in it.
- `tmp/runs.sh` — the seven-run sweep.
- `tmp/readpng.mjs` — the header-only size reader.
