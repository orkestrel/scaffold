# Unit FX2c — report

`implementer` on Opus 5, sole writer in `C:\Users\mikes\WebstormProjects\test`. Baseline `87d8a01`,
tree clean at dispatch and at return apart from the four owned files. Nothing committed, nothing
installed, no off-limits file touched, no `git checkout`/`restore`/`stash`/`reset`/`clean` run.

## Headline

Both faults are closed and the refusal is added. `captureFrame` now measures the shot's height as
the larger of the body's box rounded up and the document's scroll height, re-measures after every
staging, and refuses a document that never settles. Every acceptance criterion is met. The scoped
gates are green.

## Measurements taken before the change

Both readings come from the browser at `390x844`, under a staged pane, on this repository's own
`src:browser` project. The instrument was a temporary case in the owned test file that asserted a
false equality so the values printed; it was removed before the proofs were written.

The fractional-box fault, with the fixture `<div style="height: 1600px; padding-bottom: 0.25px">`:

```text
bodyBox = 1600.25   documentElement.scrollHeight = 1600
```

`scrollHeight` rounds the box to the nearest row, so the shipped reading staged the pane at 1600
while the provider clipped the shot to `Math.ceil(1600.25)` = 1601. The extra row is the runner's
page.

The reflow fault, with `.grow { min-height: 100vh }` capped by
`@media (min-height: 900px) { .grow { min-height: 900px } }` plus a 200 px block:

```text
pane 844   ->  body 1044, scroll 1044
pane 1044  ->  body 1100, scroll 1100
pane 1100  ->  body 1100, scroll 1100   settled
```

The shipped code read 1044 once, staged at 1044, and shot a 1100-row body over a 1044-row pane.

The same panel uncapped grows by the trailing block's height with every pane and never settles:
844 -> 1044 -> 1244 -> 1444 -> 1644.

## The change

| File                               | Change                                                                                                                              |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `src/browser/constants.ts`         | `CAPTURE_STAGINGS = 3` added with its TSDoc — the restagings one capture takes before it refuses a document whose height never settles |
| `src/browser/helpers.ts`           | `captureFrame`'s single restaging line replaced by the bounded measure-and-restage loop and its refusal; TSDoc for `captureFrame`, `stagePane`, and `releasePane` updated |
| `tests/src/browser/helpers.test.ts` | Three cases added to the `captureFrame` block: the fractional box, the reflow, and the refusal                                       |
| `guides/test.md`                   | Constants table row, `stagePane`/`releasePane` journey-resize paragraph, rewritten `captureFrame` coverage paragraphs, Voices row, driven-refusal sentence, contract rule 18, and the `helpers.test.ts` entry in Tests |

The loop, in `captureFrame`:

```ts
await stagePane(options.width, options.height)
let pane = options.height
for (let staging = 0; ; staging += 1) {
	const covered = Math.max(
		Math.ceil(document.body.getBoundingClientRect().height),
		document.documentElement.scrollHeight,
	)
	if (covered <= pane) break
	if (staging === CAPTURE_STAGINGS) {
		throw new Error(
			`Capture frame at ${options.path} never settled after ${String(CAPTURE_STAGINGS)} restagings: ${String(covered)} over a ${String(pane)} pane`,
		)
	}
	await stagePane(options.width, covered)
	pane = covered
}
```

The measurement sits at one site rather than at the loop's head and its tail, so the two readings
cannot drift apart. `Math.max` keeps the shipped `scrollHeight` reading for a document whose
overflow leaves the body's own box, and adds the ceiling of that box for the fractional case the
provider clips to.

The voice is `Capture frame at <path> never settled after <n> restagings: <h> over a <h> pane`. It
is in the guide's Voices table, in `captureFrame`'s `@throws`, and in the paragraph that states the
measurement.

## Failing-first proofs

Command for every row, run from the repository root:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser \
  tests/src/browser/helpers.test.ts -t "<name>"
```

| Case                                                                       | Before the change                                                                                         | After  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------ |
| `covers a body whose box ends on a fraction of a pixel`                    | `1 failed \| 211 skipped (212)` — `expected 'rgb(255, 255, 255)' to be 'rgb(0, 128, 0)'`                   | `1 passed \| 211 skipped (212)` |
| `re-reads the document after the pane grows, and covers what the reflow added` | `1 failed \| 211 skipped (212)` — `expected 'rgb(255, 255, 255)' to be 'rgb(0, 128, 0)'`                | `1 passed \| 211 skipped (212)` |
| `refuses a document whose height never settles, and hands the pane back anyway` | `1 failed \| 211 skipped (212)` — `promise resolved "'C:/Users/mikes/.../growing.png'" instead of rejecting` | `1 passed \| 211 skipped (212)` |

Each red reading is the defect itself rather than a harness fault. The first two failed on the
frame's floor reading back as the runner's white page while the fixture declares
`rgb(0, 128, 0)` on the root element, and the height assertion beside it passed in both, so the
frame really was taller than the pane it was staged against. The third failed because the shipped
code took the shot instead of refusing.

Whole-file counts for the same file:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser \
  tests/src/browser/helpers.test.ts
before   Tests  209 passed (209)
after    Tests  212 passed (212)
```

The existing capture cases — the written and matched file, the planted-file control, the element
shot, the pinned-pane refusal, the document taller than the pane, and the document shorter than it
— are inside those counts and stayed green.

## What each new case pins

- **The fractional box.** The body's box and `document.documentElement.scrollHeight` are read under
  a pane staged at `390x844` and `expect(rounded).toBeLessThan(Math.ceil(box))` runs before the
  shot, so a browser that rounds the other way reddens here rather than passing on a fixture that
  stopped covering the defect. The frame is then asserted at or beyond `Math.ceil(box)` and on the
  fixture's own background.
- **The reflow.** The height before the reflow and the height after it are both measured, and
  `expect(reflowed).toBeGreaterThan(first)` runs before the shot, so a fixture that stops reflowing
  reddens rather than passing on a document that never moved. The media query is what caps the
  growth, which is what separates this case from the refusal.
- **The refusal.** The same full-height panel uncapped. The restaging count in the expected message
  is written out as `3` rather than read from `CAPTURE_STAGINGS`, so a changed bound reddens instead
  of re-deriving the source's own answer. The pane attribute and the tester's viewport are both
  asserted back afterwards, which is the `finally` release on the new failing path.

## The second finding, recorded rather than solved with a verb

No verb was added. The journey-resize rule is now stated in three places, each in its own voice:

- `stagePane`'s TSDoc — the pair is a capture's staging alone; a suite resizing for a journey calls
  `page.viewport` from `vitest/browser` and leaves the tester there.
- `releasePane`'s TSDoc — the hand-back is what makes the pair a staging rather than a resize.
- `guides/test.md`, in the paragraph after `releasePane`'s — the same rule, closing with the reason
  the package publishes no verb for it: `page.viewport` already is one.

Contract rule 18 carries the short form.

## Scoped gates

```text
npm run format:check   All matched files use the correct format. (59 files)
npm run lint:check     exit 0, no output
npm run check          clean: tsc --noEmit -p tsconfig.json, and the core, browser, and server src projects
npm run test:src:browser   Test Files  2 passed (2)    Tests  243 passed (243)
npm run test:guides        Test Files  1 passed (1)    Tests  38 passed | 1 skipped (39)
npm run test:policy        Test Files  1 passed (1)    Tests  111 passed (111)
```

`guides/test.md` failed `format:check` once, after the Voices row widened a table column. It was
re-formatted with `oxfmt --write` scoped to the owned files and the check is green above.

The skip in the `guides` run is pre-existing and outside this change.

## Review evidence

`git diff --stat`:

```text
 guides/test.md                    | 55 +++++++++++++++++++++++++-------
 src/browser/constants.ts          | 12 +++++++
 src/browser/helpers.ts            | 52 +++++++++++++++++++++++++-----
 tests/src/browser/helpers.test.ts | 66 +++++++++++++++++++++++++++++++++++++++
 4 files changed, 166 insertions(+), 19 deletions(-)
```

`git status --porcelain`:

```text
 M guides/test.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M tests/src/browser/helpers.test.ts
```

`tests/guides.test.ts` is unchanged: the guide gained no fence, so no transcription moved.
`tmp/capture/frame/` gained `fraction.png` and `reflow.png`; `tmp/` is git-ignored, so neither can
reach a commit.

## Acceptance criteria

1. **The fractional-height and the reflow cases are red before and green after.** Met. The
   commands, the failure text, and the counts are in Failing-first proofs.
2. **The never-settles refusal is named, tested, and in the guide.** Met.
   `Capture frame at <path> never settled after <n> restagings: <h> over a <h> pane` is in the
   Voices table, in `captureFrame`'s `@throws` and remarks, in contract rule 18 by its bound, and
   driven by the uncapped full-height fixture.
3. **Scoped gates green; the existing capture cases still pass.** Met.

## Claims I could not close

- **The terrain suite's own reading.** `terrain/tests/app/browser/integration.test.ts` is outside
  this checkout and this unit's owned files, so its two red 390 capture runs are not re-run here.
  The layer change they waited on has landed; confirming them needs the rebuilt layer installed in
  that repository.
- **A capture whose overflow leaves the body's box entirely.** `Math.max` keeps `scrollHeight` for
  that shape, and the existing taller-than-the-pane case covers it, but no case was added for a
  document whose overflow is both fractional and outside the body's box. Nothing in the brief names
  one, and I found no fixture shape that produces it without an absolutely positioned element the
  provider's clip does not read.
