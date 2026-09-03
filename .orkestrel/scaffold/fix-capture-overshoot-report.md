# Unit FX2d — report: stopped on the deviation contract's first trigger

## Verdict

**Stopped. No change written.** The brief's mechanism is false, measured in this browser. The
overshoot the brief specifies adds rows to a frame, which is the deviation contract's named stop
condition. The tree is at baseline `e13f5d5` with an empty diff.

## Expected

From the brief, § The mechanism to use:

> The provider clips the shot to the body's box, and the pane's only job is to paint that box, so a
> pane taller than the body adds no rows to the frame (`fix-terrain-report.md` § F2 measured the
> frame height following the body box, not the pane).

On that premise, staging at `covered + (covered - pane)` costs nothing when it overshoots.

## Found

The body's box is not independent of the pane. It is `max(content, pane)`: a pane taller than the
document's content stretches the box, and the frame takes the pane's rows.

Measured on a static document of 1600 fixed rows with no viewport-bound rule at all, at width 390:

```text
static pane=844  box=1600 scroll=1600
static pane=1616 box=1616 scroll=1616
static pane=2000 box=2000 scroll=2000
static pane=2356 box=2356 scroll=2356
static pane=3000 box=3000 scroll=3000
static frame from 844  = 390x1600
static frame from 2356 = 390x2356 floor=rgb(0, 128, 0)
```

`fix-terrain-report.md` § F2 took its reading (`bodyBox=390x1682` under `inner=390x844`) on a
document taller than its pane. In that regime `box == content`, so the reading is right and does not
generalize to the regime the overshoot creates, where the pane is taller than the content.

### What the overshoot does to the existing tall case

The existing case `covers a document taller than the pane, down to its last row` uses exactly that
static 1600-row fixture. Tracing `captureFrame` with the brief's rule:

| Staging | Pane   | Covered | Next pane                  |
| ------- | ------ | ------- | -------------------------- |
| 0       | 844    | 1600    | `1600 + (1600 - 844)` = 2356 |
| 1       | 2356   | 2356    | breaks, `covered <= pane`  |

The shot is taken at a 2356 pane and the frame reads back `390x2356` — 756 rows the document does
not have — where the plain rule shoots `390x1600`. The frame's floor is still the canvas color, so
nothing looks broken; the tail is document canvas rather than the runner's page.

The existing assertion cannot catch this. It reads
`expect(reading.height).toBeGreaterThanOrEqual(covered)`, and 2356 satisfies it.

### Acceptance criterion 2 cannot discriminate

Criterion 2 asks that the overshoot case's frame height equal the body's box. Because the box tracks
the pane, that equality holds for every pane the capture could ever stage, including a pane an order
of magnitude too tall. The criterion is an assertion of the implementation against itself, which
`.claude/rules/tests.md` refuses ("Never assert an implementation against itself"), and it would have
passed over the regression in the preceding table.

The deviation contract's own parenthetical — "the frame height exceeds the body's box" — is
unsatisfiable for the same reason. The condition it names in prose, the overshoot adding rows,
fires.

## The converging fixture, measured

The brief's fixture is realizable and the refusal it produces today is recorded. A rule bound to
half the viewport height plus 900 fixed rows converges geometrically on 1800 with ratio exactly one
half:

```html
<style>html { background: rgb(0, 128, 0) } .half { min-height: 50vh }</style>
<div class="half">Half</div><div style="height: 900px">Beyond</div>
```

Plain restaging from a 390x844 viewport, `pane`, `box`, and `scrollHeight` read under each staged
pane:

```text
plain pane=844  box=1322   scroll=1322
plain pane=1322 box=1561   scroll=1561
plain pane=1561 box=1680.5 scroll=1681
plain pane=1681 box=1740.5 scroll=1741
plain pane=1741 box=1770.5 scroll=1771
plain pane=1771 box=1785.5 scroll=1786
plain pane=1786 box=1793   scroll=1793
plain pane=1793 box=1796.5 scroll=1797
```

`captureFrame` on it today, unchanged, at `e13f5d5`:

```text
Capture frame at ../../../tmp/capture/frame/measure-half.png never settled after 3 restagings: 1741 over a 1681 pane
```

That is the same shape as the terrain finding (1675, 1694, 1712, 1716), at a steeper ratio.

The overshoot does settle it, in one restaging, and lands exactly on the fixed point rather than
past it:

```text
over pane=844  box=1322 scroll=1322
over pane=1800 box=1800 scroll=1800
over pane=1800 box=1800 scroll=1800
```

That exactness is arithmetic rather than luck: with `covered = r * pane + C`, the overshoot
`2 * covered - pane` equals `(2r - 1) * pane + 2C`, which is the fixed point `C / (1 - r)` for every
`pane` when `r` is one half. It is also why this fixture hides the defect: at `r` below one half the
overshoot lands **past** the fixed point, and at `r = 0` — a static document, the common case — it
lands at `2 * content - height`, which is the 756 extra rows in the preceding table.

## Why no in-scope repair was attempted

Two candidate repairs were measured out rather than argued out.

**Descending after the overshoot** cannot work. Staging down to the covered height while it still
fits requires a reading that reports the content's height under an oversized pane. Every reading the
implementation could take clamps up to the pane:

```text
pane=844  bodyBox=1600 bodyScroll=1600 bodyOffset=1600 rootScroll=1600 rootBox=1600 lastBottom=1600
pane=2356 bodyBox=2356 bodyScroll=2356 bodyOffset=2356 rootScroll=2356 rootBox=2356 lastBottom=1600
```

`document.body.getBoundingClientRect().height`, `body.scrollHeight`, `body.offsetHeight`,
`documentElement.scrollHeight`, and `documentElement.getBoundingClientRect().height` all read 2356
under a 2356 pane. A descent driven by `max(ceil(box), scrollHeight)` therefore breaks on its first
step with `covered >= pane` and never comes back down.

**Raising `CAPTURE_STAGINGS`** is outside what the brief authorizes as a first move ("raise it only
if a converging fixture with a ratio near one half still needs it"), and on its own it does not
close the terrain case at any bound a phone frame can afford: the plain sequence above is still
short of 1800 after eight restagings.

## Hypothesis

The last row of that table is the only reading that survives an oversized pane: the last content
element's own bottom edge stays at 1600. A settling rule that measures the document's content edge —
rather than a box the viewport clamps — can overshoot safely and then shoot at the content's height,
because that reading does not stretch. Unverified; it changes the measurement site the brief told me
to keep at one place, so it is a design question for the Orchestrator rather than an edit for this
unit.

## Done and not done

**Done.** The mechanism's premise falsified with measurements taken in the real browser at the real
viewport. The converging fixture built, its plain sequence recorded, its current refusal message
recorded, and its behavior under the overshoot recorded. The overshoot's effect on the existing tall
case traced and measured. Two repairs measured out.

**Not done.** No line of `src/browser/helpers.ts`, `src/browser/constants.ts`,
`tests/src/browser/helpers.test.ts`, `guides/test.md`, or `tests/guides.test.ts` changed. No failing
proof committed to the suite, because a red test with no agreed fix behind it is a red suite.

## Instrument

Every reading came from a throwaway `it('MEASURE', ...)` block placed inside the existing
`describe('captureFrame')` in `tests/src/browser/helpers.test.ts`, run through:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "MEASURE"
```

It threw its readings as its failure message. It was removed before this report was written.

## Tree state

```text
$ git diff --stat
$ git status --porcelain
$
```

Empty. `HEAD` is `e13f5d5`, unchanged. Nothing was committed, and no
`git checkout`, `restore`, `stash`, `reset`, or `clean` was run. The frames the instrument wrote sit
under the git-ignored `tmp/capture/frame/` directory.

The `captureFrame` suite is green at baseline after the instrument's removal:

```text
$ npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "captureFrame"
 Test Files  1 passed (1)
      Tests  8 passed | 204 skipped (212)
```

## Claims not closed

- The scoped gates the brief asks for (`format:check`, `lint:check`, `check`, `test:src:browser`,
  `test:guides`, `test:policy`) were not run. There is no change to gate.
- Whether a content-edge reading is stable across the app's real surfaces — a floated or
  absolutely positioned last child would sit outside it — is unmeasured.
- The value `CAPTURE_STAGINGS` needs under a corrected mechanism is unmeasured, because no corrected
  mechanism was written.
