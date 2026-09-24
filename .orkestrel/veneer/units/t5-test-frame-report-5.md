# Unit T5 round 5 report — park the pointer outside the page; remove the park-point avoidance

Role and engine: `opus` on Opus 5.5, a native Claude subagent. Checkout `/home/user/test-tf`, uncommitted over
`80c419e`. Brief: `t5-test-frame-brief-5.md`. It was read with
`t5-park-ruling-verdict.md`, both lane proposals, and `t5-instruments-4/t5-park-probe.log.txt`. Every log, instrument,
and mutation file is retained under `.orkestrel/veneer/units/t5-instruments-5/`.

## Outcome

- **Ruling implemented.** P1 to P5 are implemented in the owned files.
- **Deviation stop not reached.** None of the step-5 exercises took a `mouseover` event from the pointer parked at
  (-1, -1).
  - The both-axes proof moves the calling frame up and left past the viewport's corner, which is the planner lane's
    T1 geometry, and reads 0 `mouseover` events.
  - Its `origin` mutation, which parks at (0, 0), reddens it.
- **Gates.** Every gate the unit may run exits 0, and each log ends with the exit status the run itself wrote.
- **Left to the Orchestrator.** `npm run test:guides` needs a built `dist/`. The Orchestrator runs it, and the Veneer
  journeys.

## Changes by symbol

- **`releasePointer`** (`src/browser/helpers.ts`), step 1.
  - It parks with `mouseMoved` at `x: -1, y: -1`.
  - Its Summary reads "Releases a held pointer and parks it outside the page, clearing hover."
  - Its remarks give the park point and the P1 promise.
  - The hover-clears, hold-refusal, and pointer-teardown proofs stayed green after this step alone: the whole file read
    370 passed.
- **`computeOffset`** (`src/browser/helpers.ts`), step 2.
  - It is reduced to the window-fit move:
    `{ top: fits ? Math.min(0, height - Math.ceil(box.bottom)) : 0, left: fits ? Math.min(0, width - Math.ceil(box.right)) : 0 }`.
  - The nudge and its TSDoc are gone.
  - Its Summary reads "Computes how far an element frame moves the tester frame so the element is shot inside the
    runner's window."
- **`FrameOffset`** (`src/browser/types.ts`). The member docs read "zero or negative; a negative value moves the frame
  up" and "… left". The remarks read "Both are zero where the frame stays at the origin."
- **`captureFrame`** (`src/browser/helpers.ts`), step 3.
  - The ancestor walk is removed: `offsetParent`, the `svg` root rule, and the `scrolls` flag. The `grep -c` in
    `t5-5-criterion4.log.txt` reads 0.
  - The document scrolls by the nearest distance whenever the element's box lies outside the pane, and the box is read
    again.
  - The inner scroll restore is removed. The scroll is restored once, in the `try` and `finally` around
    `releasePane`, which covers a rejected release.
  - The offset, its exact `style` attribute restore, the compositing hint, the element-height staging, and the refusal
    are unchanged.
- **The `captureFrame` TSDoc** carries P2 and P5.
  - "The capture sends no pointer input."
  - The staging, the scroll, and the offset each move content under a resting pointer.
  - A pointer the case placed on the element, with the pane staged first, keeps its hover in the frame where the
    element lies inside both the pane and the runner window. No hover is promised after the release.
  - A fixed element past the pane can take a scroll that does not move it, and that scroll is handed back.
  - The TSDoc names neither the park point nor the `releasePointer` function.
- **`guides/test.md`.**
  - The `releasePointer` and `computeOffset` Surface rows equal their new TSDoc description paragraphs.
  - The `releasePointer` bounds bullet states the value and the P1 promise.
  - The element-frame paragraphs carry the TSDoc's sentences.
  - "and off the pointer's park point" is removed from the layout rule.
  - The `captureFrame` coverage entry names every retained and new proof.
  - The criterion-4 log lists every remaining "park" hit. Outside the `releasePointer` doc, its row, and its bullet,
    each hit is the unrelated "a drawer parked at `visibility: hidden`" or the `waitForAbort` fence.

## Proofs: removed, renamed, added

**Removed (step 4).** Their property no longer exists:
- the ordering proof ("hands the scroll back before the offset comes off…");
- the fixed-element unscrolled proof;
- the SVG unscrolled proof;
- the nudge-only `computeOffset` cases: the down nudge, the right nudge, the fractional nudge, and the
  horizontal-then-nudge case.

**Renamed.** Each corner proof is renamed to "takes no mouseover from the parked pointer for …":
- a flush-left element the scroll brings to the top;
- an element the offset brings to the left edge;
- a flush-left element too large for the runner window.

**Re-expected.** The negative-top `computeOffset` case now expects `{ top: 0, left: 0 }`. It is merged with the
touching-origin case.

**Added (step 5), with red and green.** Every green reading comes from `t5-5-green.log.txt`: the whole file, 372
passed, 2 expected fail, ending `exit 0`.

| Proof | Red on | Log |
| --- | --- | --- |
| `computeOffset` "rounds a fractional bottom edge up to the next whole row" (`744.5` → `-332`) | `noceil` | `t5-5-mut-noceil.log.txt` |
| `computeOffset` left-edge case | `nudge` (the element touches the origin, so a nudge moves it down) | `t5-5-mut-nudge.log.txt` |
| `computeOffset` both-edges case | No mutation in the set reddens it: no nudge applies there, and its arithmetic is the bottom-edge and right-edge arithmetic the other cases pin | — |
| An element past both window edges: 0 `mouseover` events, a 100x100 frame, and a control that the frame moved up and left past (-1, -1) | `origin`, on the `mouseover` count; `nooffset` and `widened`, on the control | `t5-5-mut-origin.log.txt`, `t5-5-mut-nooffset.log.txt`, `t5-5-mut-widened.log.txt` |
| Held hover at the tester's top-left corner: a 100x1 element, stage then hover then capture, floor red | `nudge` (floor reads blue: the hover is lost) | `t5-5-mut-nudge.log.txt` |
| Inside the window: 0 `mouseover` events and 0 `scroll` events, over a document running on past the pane | `scrolltop`, which always scrolls to the element's top | `t5-5-mut-scrolltop.log.txt` |
| Lifecycle exercise: an element touching the origin | `origin` | `t5-5-mut-origin.log.txt` |
| Lifecycle exercise: an element filling the runner window | `origin` | `t5-5-mut-origin.log.txt` |
| Lifecycle exercise: a scroll the staging clamps (600 clamped to 100 by a 1500-row pane, 600 handed back) | `origin`; `noscrollback` | `t5-5-mut-origin.log.txt`, `t5-5-mut-noscrollback.log.txt` |
| Lifecycle exercise: an `svg` in the shadow tree of a fixed host, with a 100x100 frame | `origin` | `t5-5-mut-origin.log.txt` |
| Lifecycle exercise: a fixed `svg` under a transformed, containing-block ancestor, with a 100x100 frame | `origin` | `t5-5-mut-origin.log.txt` |

The lifecycle exercises count every `mouseover` event in the tester document, not only the element's own.

## Mutations

`.orkestrel/veneer/units/t5-instruments-5/t5-5-run.sh <names…>` runs each file in `.orkestrel/veneer/units/t5-instruments-5/t5-5-mutations/<name>.json` against the whole final
test file.
- **Digests.** `t5-5-digest.log.txt` records the test file's SHA-256 digest before the series
  (`edaef7e7…8db242`) and a `sha256sum -c` result of `OK` after it, with `check exit 0`.
- **Restores.** Every run restored `src/browser/helpers.ts` from `t5-5-helpers-final.ts.txt`, checked with `cmp`
  (`t5-5-mutations-summary.log.txt`).
- **Later edit.** The only edit after the series was one guide sentence. `sha256sum -c` still reads `OK` after the final
  gate run.

| Mutation | Named proof it reddens (the brief's criterion) | Result |
| --- | --- | --- |
| `origin`, park at (0, 0) | every corner proof and the both-axes proof, plus every lifecycle exercise | 9 failed, 363 passed |
| `nomove`, no park move | the hover-clears proof ("hovers the named control while its twin keeps the base paint, then clears hover"), plus the park proofs the pointer is left over | 9 failed, 363 passed |
| `nudge`, the round-4 `computeOffset` reinstated | the corner held-hover proof (floor blue), plus three `computeOffset` cases | 4 failed, 368 passed |
| `noceil` | the fractional-bottom case | 1 failed, 371 passed |
| `scrolltop` | the inside-window proof (`scroll` events) | 1 failed, 371 passed |
| `nooffset` | fixed panel, below-pane, `50vh`, scope (control), both-axes (control) | 5 failed, 367 passed |
| `nocomposite` | fixed panel (panel culled) | 1 failed, 371 passed |
| `widened` | scope (second frame), both-axes (control: the calling frame loses its `left` offset) | 2 failed, 370 passed |
| `noscrollback` | below-pane (scroll 200), element refusal (scroll 100), clamped-scroll exercise (scroll 600) | 3 failed, 369 passed |

Each run is logged at `t5-5-mut-<name>.log.txt`.

## Gates

`.orkestrel/veneer/units/t5-instruments-5/t5-5-gates.sh` ran these on the final tree. Each log ends with the exit status the run itself wrote.

| Command | Exit | Result | Log |
| --- | --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files | 0 | `All matched files use the correct format.` | `t5-5-gate-format.log.txt` |
| `npm run lint:check` | 0 | No diagnostics | `t5-5-gate-lint.log.txt` |
| `npm run check` | 0 | Root and every `check:src` project clean | `t5-5-gate-check.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts` | 0 | `Tests  372 passed \| 2 expected fail (374)` | `t5-5-gate-file.log.txt` |
| `npm run test:src:browser`, as an observation | 0 | `Tests  426 passed \| 2 expected fail (428)`, 52.94 s | `t5-5-gate-browser.log.txt` |
| Criterion 4: no `offsetParent`, `SVGSVGElement`, or `ownerSVGElement` in `helpers.ts`, and the park point named only in the `releasePointer` doc | — | `grep -c` reads 0; every park hit listed | `t5-5-criterion4.log.txt` |
| `npm run test:guides` | — | Not run; needs a built `dist/` | — |

## Evidence files

- `.orkestrel/veneer/units/t5-5.diff`, the whole change over `80c419e`. Diffstat: 4 files changed, 847 insertions, 44 deletions.
- `.orkestrel/veneer/units/t5-5-status.txt`: `M` on `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, and
  `tests/src/browser/helpers.test.ts`.
- The instruments:
  - `t5-5-run.sh`, the mutation runner.
  - `t5-5-gates.sh`, the gate runner.
  - `t5-5-mutations/*.json`, the retained mutation files: `origin`, `nomove`, `nudge`, `noceil`, `scrolltop`,
    `nooffset`, `nocomposite`, `widened`, and `noscrollback`.
- The saved round-4 sources: `t5-5-helpers-r4.ts.txt`, `t5-5-test-r4.ts.txt`, `t5-5-types-r4.ts.txt`, and
  `t5-5-guide-r4.md.txt`. The `nudge` mutation takes its round-4 function text from the first of these.

## Deviation state

- **Stop condition:** not reached. Every step-5 exercise read 0 `mouseover` events at (-1, -1).
- **Shared-file patches:** none.
- **Choices recorded for audit.**
  - The held-hover element is one row tall, so the round-4 one-row nudge moves it out from under the centred pointer.
    A taller element keeps its hover under that nudge, and the proof could not distinguish it.
  - The inside-window fixture gained a 3000-row tail, so the `scrolltop` mutation can fire a `scroll` event there.
    Before, the document could not scroll.
  - A mutation named `scrolltop` is added for that reason.
- **Carried to the Orchestrator.**
  - The ruling's P6 consumer units: the Veneer comment rewrites, the unpadded origin-touching case, and the `unhover`
    sweep.
  - `npm run build` and then `npm run test:guides`.
  - The Veneer journeys against a build of this tree.
