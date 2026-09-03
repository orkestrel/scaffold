# Unit FX2e — report: content-edge measurement, growth-carrying convergence, exact final staging

## Verdict

**Done.** `captureFrame` measures the document's content edge, carries each staging's growth into
the next, and shoots at the pane that equals the edge. The converging fixture settles at 1800, the
static fixture's frame is exactly 1600, and the runaway fixture still reaches the refusal. Every
scoped gate is green. The brief's overshoot formula was corrected against a measurement; see
§ Deviations.

## Content-edge readings

Every reading below was taken in Chromium at width 390 through a throwaway `it('MEASURE')` block in
`tests/src/browser/helpers.test.ts`, which staged each pane and wrote its readings to
`tmp/capture/frame/measure.txt` through the runner's `writeFile` command. `plain` is the brief's
formula (largest descendant bottom edge, plus the body's and the root's own bottom padding and
margin). `margins` adds each element's own bottom margin to its edge. The instrument was removed
before the change was written; the file it wrote is still at
`C:\Users\mikes\WebstormProjects\test\tmp\capture\frame\measure.txt`.

```text
static   pane=844  scroll=1600 box=1600    plain=1600 margins=1600
static   pane=1600 scroll=1600 box=1600    plain=1600 margins=1600
static   pane=2356 scroll=2356 box=2356    plain=1600 margins=1600
margin   pane=844  scroll=1700 box=1700    plain=1640 margins=1700
margin   pane=1700 scroll=1740 box=1740    plain=1640 margins=1700
margin   pane=2356 scroll=2396 box=2396    plain=1640 margins=1700
wrapper  pane=844  scroll=1600 box=1600    plain=1600 margins=1600
wrapper  pane=1600 scroll=1600 box=1600    plain=1600 margins=1600
wrapper  pane=2356 scroll=2356 box=2356    plain=2356 margins=2356
half     pane=844  scroll=1322 box=1322    plain=1322 margins=1322
half     pane=1322 scroll=1561 box=1561    plain=1561 margins=1561
half     pane=1561 scroll=1681 box=1680.5  plain=1681 margins=1681
half     pane=1681 scroll=1741 box=1740.5  plain=1741 margins=1741
half     pane=1800 scroll=1800 box=1800    plain=1800 margins=1800
half     pane=2356 scroll=2356 box=2356    plain=2078 margins=2078
reflow   pane=844  scroll=1044 box=1044    plain=1044 margins=1044
reflow   pane=1044 scroll=1100 box=1100    plain=1100 margins=1100
reflow   pane=1100 scroll=1100 box=1100    plain=1100 margins=1100
reflow   pane=1156 scroll=1156 box=1156    plain=1100 margins=1100
runaway  pane=844  scroll=1044 box=1044    plain=1044 margins=1044
runaway  pane=1044 scroll=1244 box=1244    plain=1244 margins=1244
runaway  pane=1444 scroll=1644 box=1644    plain=1644 margins=1644
runaway  pane=1844 scroll=2044 box=2044    plain=2044 margins=2044
fraction pane=844  scroll=1600 box=1600.25 plain=1601 margins=1601
fraction pane=2356 scroll=2356 box=2356    plain=1601 margins=1601
short    pane=844  scroll=844  box=844     plain=40   margins=40
short    pane=2356 scroll=2356 box=2356    plain=40   margins=40
```

Fixtures, in the order the table names them: a 1600-row block; a 1600-row block carrying
`margin-bottom: 60px` under a body carrying `padding-bottom: 40px`; a `.page { min-height: 100vh }`
wrapper around a 1600-row block; `.half { min-height: 50vh }` plus a 900-row block; a
`min-height: 100vh` panel capped by `@media (min-height: 900px)` plus a 200-row block; the same
panel uncapped; a 1600-row block with `padding-bottom: 0.25px`; a 40-row block.

Three readings decide the design.

- **The content edge is stable and the box is not.** `static` reads 1600 under 844 and under 2356
  while `scroll` and `box` read the pane back. That is the descent FX2d showed was impossible from
  the box, and it is possible from this reading.
- **The brief's formula undercounts a trailing margin.** `margin` under an 844 pane has a true
  document height of 1700, which the scroll height confirms because the pane is shorter than the
  content. `plain` reads 1640 — it drops the child's 60-row bottom margin, which sits outside that
  child's client rectangle. `margins` reads 1700 at every pane.
- **A `min-height: 100vh` wrapper stretches with the pane.** `wrapper` reads 1600 at 844 and at
  1600, and 2356 at 2356. Its content edge is `max(1600, pane)`, so overshooting past the document
  on the first staging makes that overshoot the fixed point. See § Deviations.

## Convergence sequences

Traced through the shipped loop and confirmed against the preceding table. `pane` is what is staged,
`edge` the reading taken under it, `growth` what that reading added over the previous one.

Converging (`.half` plus 900 rows), declared 390x844. Settles in two restagings.

```text
start    pane=844  edge=1322 growth=0
staging  pane=1322 edge=1561 growth=239   (1322 + 0)
staging  pane=1800 edge=1800 growth=239   (1561 + 239) — pane meets the edge, shot here
```

Static (1600 rows), declared 390x844. Settles in one restaging, at the content's own height.

```text
start    pane=844  edge=1600 growth=0
staging  pane=1600 edge=1600 growth=0     (1600 + 0) — pane meets the edge, shot here
```

Capped reflow, declared 390x844. Settles in three restagings: one past the cap, then back down.

```text
start    pane=844  edge=1044 growth=0
staging  pane=1044 edge=1100 growth=56    (1044 + 0)
staging  pane=1156 edge=1100 growth=0     (1100 + 56)
staging  pane=1100 edge=1100 growth=0     (1100 + 0) — pane meets the edge, shot here
```

Runaway, declared 390x844. Never settles; refused at the bound.

```text
start    pane=844  edge=1044 growth=0
staging  pane=1044 edge=1244 growth=200
staging  pane=1444 edge=1644 growth=200
staging  pane=1844 edge=2044 growth=200
staging  pane=2244 edge=2444 growth=200
refused: never settled after 4 restagings: 2444 over a 2244 pane
```

## The change

- `src/browser/helpers.ts` — added `measureContent(): number`, exported and documented. It walks
  `document.body.querySelectorAll('*')`, takes the largest of each element's client-rectangle bottom
  in document coordinates plus that element's own bottom margin, adds the body's and the root's
  bottom padding and margin, and rounds up. It reads each length through the package's own `pixels`
  helper rather than parsing computed style again.
- `src/browser/helpers.ts` — `captureFrame` now reads `Math.max(measureContent(), options.height)`,
  stages each pane at the edge plus the growth the previous staging produced, and stops when the
  pane equals the edge, which is the pane the shot is taken at. The refusal keeps its message and
  its single throw site.
- `src/browser/constants.ts` — `CAPTURE_STAGINGS` raised from 3 to 4, with the measured need in its
  TSDoc.
- `guides/test.md` — the `measureContent` surface row; the coverage paragraphs rewritten to the
  content edge, the growth carried forward, the pane that meets the edge, and the bound's reading;
  the capture entry in `## Contract`; the capture cases in `## Tests`; a new
  `### Measure a document's content edge` fence; the `### Read a written frame back` prose corrected
  from "at least" to the content edge.
- `tests/setup.ts` — the new fence routed to `tests/src/browser/helpers.test.ts` in
  `ROUTED_FENCES`, because the guides project runs in Node with the browser disabled.
- `tests/src/browser/helpers.test.ts` — `describe('measureContent')` with the fence carrier and the
  trailing-margin case; the converging-fixture capture case; the tall case tightened from
  `toBeGreaterThanOrEqual` to equality against the fixture's declared 1600; the runaway case's
  written-out bound moved to 4.

## Red before, green after

The converging proof, run before any source change:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser \
    tests/src/browser/helpers.test.ts -t "captureFrame"

 FAIL  |src:browser (chromium)| tests/src/browser/helpers.test.ts:1904:2 > captureFrame >
   settles a document whose height converges under a viewport-bound rule
Error: Capture frame at ../../../tmp/capture/frame/converging.png never settled after 3 restagings:
   1741 over a 1681 pane

 Test Files  1 failed (1)
      Tests  1 failed | 8 passed | 204 skipped (213)
```

That is the refusal FX2d recorded, reproduced by a committed case rather than by an instrument.

The `measureContent` proofs, run before the helper existed:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser \
    tests/src/browser/helpers.test.ts -t "measureContent"

 FAIL  |src:browser (chromium)| tests/src/browser/helpers.test.ts
Error: Failed to import test file .../tests/src/browser/helpers.test.ts
Caused by: SyntaxError: The requested module '/src/browser/index.ts' does not provide an export
   named 'measureContent'

 Test Files  1 failed (1)
      Tests  no tests
```

The same commands after the change:

```text
$ npx vitest run ... -t "captureFrame"
 Test Files  1 passed (1)
      Tests  9 passed | 206 skipped (215)

$ npx vitest run ... -t "measureContent"
 Test Files  1 passed (1)
      Tests  2 passed | 213 skipped (215)
```

The failing-first test names are `captureFrame > settles a document whose height converges under a
viewport-bound rule`, `measureContent > reads one content edge under a pane the document outruns and
under a pane it does not`, and `measureContent > counts a trailing bottom margin and a bottom
padding on the body`.

`captureFrame > covers a document taller than the pane, down to its last row and no further` is a
control rather than a red-first proof: it is green before and after, and its equality is what would
redden if a staging left rows in the frame the document does not have. FX2d measured the frame that
assertion has to catch — `static frame from 2356 = 390x2356 floor=rgb(0, 128, 0)` — which shows why
`toBeGreaterThanOrEqual` could not catch it and why the floor cannot either: the root's background
paints whatever canvas the pane stretched, so an over-tall frame reads the same floor as a covered
one.

## Deviations

Each is recorded here and none of them stopped the unit.

### The overshoot's first staging carries no growth

The brief's step 2 gives the formula `covered + max(0, covered - pane)` and glosses it as "(the last
growth as the overshoot)". Those disagree at the first staging, where nothing has grown yet and
`covered - pane` is the gap between the document and the declared viewport. I implemented the gloss:
the pane is the edge plus the growth the previous staging produced, and that growth is zero before
any staging has happened.

The measurement behind the choice is the `wrapper` row. `.page { min-height: 100vh }` around 1600
rows of content — a page wrapper, which is a common real layout — has a content edge of
`max(1600, pane)`. Under the literal formula the first staging goes to `1600 + (1600 - 844)` = 2356,
the wrapper stretches to fill it, the edge reads 2356, the pane already equals the edge, and the shot
is taken at 2356 for a document whose smallest fixed point is 1600. That is the defect FX2d found,
relocated rather than repaired, and the brief's step 3 does not reach it because the loop exits with
the pane already equal to the edge.

Under the implemented rule the same document stages once at 1600, reads 1600, and is shot there. The
converging fixture still lands exactly on 1800, in two restagings rather than one, because the second
staging carries the 239 rows the first produced.

### `measureContent` carries no floor; `captureFrame` applies it

The brief asks `measureContent(): number` to read "never less than the variant's declared height".
A function with no parameters cannot know the declared height, and flooring at the pane it happens to
be read under would contradict the brief's own proof that it reads 1600 under a 2356 pane. So
`measureContent` reports the content edge alone — the `short` fixture reads 40 — and `captureFrame`
floors its own reading at `options.height`, which is what keeps a document shorter than the pane shot
at the pane's height.

### Each element's own bottom margin is counted

The brief's formula adds "the body's and the root's own bottom padding and margin" and nothing else.
Measured on the `margin` fixture that reads 1640 against a true document height of 1700: a child's
bottom margin sits outside its client rectangle, so a walk over rectangles alone drops it. Each
element therefore contributes its edge plus its own bottom margin, and the largest contribution wins.
Taking the largest is what handles a collapsed margin without asking whether it collapsed — a child
margin that collapses out through its parent is counted at the child, one the parent's padding holds
in is counted at the parent, and neither is counted twice.

### `CAPTURE_STAGINGS` raised to 4

The brief asks for the value the near-half fixture needs. That fixture needs two restagings. The
existing capped-reflow fixture needs three, because an overshoot past a cap has to come back down to
the edge, and 3 would leave it exactly at the bound with no headroom. The bound is therefore 4, the
highest measured need plus one. Both readings are in the constant's TSDoc and in the guide. The
runaway case's written-out bound moved with it.

## Scoped gates

```text
$ npm run format:check
All matched files use the correct format.
Finished in 925ms on 59 files using 16 threads.

$ npm run lint:check
(no diagnostics)

$ npm run check
tsc --noEmit --project tsconfig.json
tsc --noEmit -p configs/src/tsconfig.core.json
tsc --noEmit -p configs/src/tsconfig.browser.json
tsc --noEmit -p configs/src/tsconfig.server.json
(no diagnostics)

$ npm run test:src:browser
 Test Files  2 passed (2)
      Tests  246 passed (246)

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  38 passed | 1 skipped (39)

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  111 passed (111)
```

The `setup` project was run as well, because `tests/setup.ts` changed:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup
 Test Files  3 passed (3)
      Tests  24 passed (24)
```

The single skip in the guides project is a conditional skip that predates this change; the guides
project was green with it at baseline.

## Tree state

```text
$ git diff --stat
 guides/test.md                    | 106 +++++++++++++++++++++++++++++---------
 src/browser/constants.ts          |  18 ++++---
 src/browser/helpers.ts            |  95 +++++++++++++++++++++++++++-------
 tests/setup.ts                    |   1 +
 tests/src/browser/helpers.test.ts |  84 +++++++++++++++++++++++++++---
 5 files changed, 249 insertions(+), 55 deletions(-)

$ git status --porcelain
 M guides/test.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M tests/setup.ts
 M tests/src/browser/helpers.test.ts
```

`HEAD` is `e13f5d5`. Nothing was committed, no file outside the owned list was touched, and no
`git checkout`, `restore`, `stash`, `reset`, or `clean` was run. The frames and the instrument's
readings sit under the git-ignored `tmp/` directory.

## Claims not closed

- **A floated or absolutely positioned last child is unmeasured.** FX2d raised it and this unit did
  not settle it. `measureContent` reads a client rectangle, so a float that overflows its container
  and an absolutely positioned element both contribute their own edges, which is likely right; no
  fixture proves it. It needs a fixture per positioning scheme.
- **`npm run build` and the full `npm test` were not run.** The brief named the scoped gates and
  neither is among them. `tests/distribution.test.ts` reads `dist/`, which this change does not
  rebuild.
- **The staging cost of the capped-reflow shape rose by one.** It settled in two restagings before
  this change and settles in three now, because the overshoot goes one staging past the cap before
  descending. That is the price of landing a converging document on its fixed point, and it is
  inside the bound.
- **The refusal message reads oddly for a descending document.** It reports `<edge> over a <pane>
  pane`, and a document that reached the bound while descending would report an edge below the pane.
  No measured fixture descends for more than one staging, so nothing reaches it.
