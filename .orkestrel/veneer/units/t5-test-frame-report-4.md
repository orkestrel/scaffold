# Unit T5 round 4 report — the park-point leaf, SVG elements, fractional room, width-independent fixtures

Role and engine: `opus` on Opus 5.5, a native Claude subagent. Checkout `/home/user/test-tf`, uncommitted over
`80c419e`. Brief: `tmp/units/t5-brief-4.md`, retained as `t5-test-frame-brief-4.md`. It was read with the round-3
verdict `t5-audit-3-verdict.md` and its three lane verdicts. Every log, instrument, and mutation file is under
`/home/user/test-tf/tmp/units/`.

## Outcome

- **P2, S2, W5, F4, W8: all closed** in the owned files.
- **An ordering defect in `captureFrame`, found and closed.** It was intermittent, and a deterministic proof now
  covers it. See "Ordering defect".
- **Gates.** Every gate the unit may run exits 0, and each log ends with the exit status the run itself wrote.
- **Left to the Orchestrator.** `npm run test:guides` needs a built `dist/`. The Veneer journeys use another checkout.
  The Orchestrator runs both.

## Findings and changes

### F4: the park-point leaf

- **`FrameOffset`, in `src/browser/types.ts`.** A new interface `{ readonly top: number; readonly left: number }`: the
  tester frame's move from the runner window's origin, in CSS pixels. A negative value moves up or left.
- **`computeOffset(box: DOMRectReadOnly, width: number, height: number): FrameOffset`, in `src/browser/helpers.ts`.**
  An exported pure leaf, placed after the `releasePane` function. It holds all of the offset and nudge arithmetic, and
  `captureFrame` calls it in place of the inline code.
- **No barrel line needed.** `src/browser/index.ts` already re-exports `./types.js` and `./helpers.js`.
- **Guide Surface rows.** `guides/test.md` gains a `FrameOffset` row in the Types table and a `computeOffset` row after
  `releasePane` in the Functions table. Each Summary cell is the TSDoc description paragraph, with the `{@link}` tag
  written as its code token.
- **Deterministic cases.** A `describe('computeOffset')` group with the window size written out as 800x513, running in
  `src:browser`, the project that owns `src/browser/helpers.ts`:

| Box `(x, y, w, h)` | Result | Case |
| --- | --- | --- |
| `(0, 100, 390, 100)` | `{ top: 0, left: 0 }` | inside the window, off the origin |
| `(0, 744, 390, 100)` | `{ top: -331, left: 0 }` | offset up |
| `(0, 0, 390, 100)` | `{ top: 1, left: 0 }` | down nudge |
| `(0, 0, 390, 513)` | `{ top: 0, left: 1 }` | right nudge |
| `(0, 0, 799.5, 512.5)` | `{ top: 0.5, left: 0 }` | fractional nudge |
| `(0, -50, 390, 100)` | `{ top: 51, left: 0 }` | negative top |
| `(800, 0, 800, 100)` | `{ top: 1, left: -800 }` | horizontal offset, then nudge |
| `(0, 0, 800, 513)` | `{ top: 0, left: 0 }` | residual |
| `(0, 0, 390, 1112)` | `{ top: 1, left: 0 }` | too large for the window |
| `(0, 300, 390, 1112)` | `{ top: 0, left: 0 }` | too large for the window, off the origin |

The right-nudge case reddens when the right-nudge branch is deleted: `noright`, 1 failed.

### P2: fractional room

Inside the `computeOffset` function, the nudge is `Math.min(1 − top, room)` rows, where `room` is the window's height
minus the element's bottom. It applies when `room > −top`, and the same holds for columns. An element with less than a
row of clearance therefore still leaves the origin. The residual is an element that fits the window and, from the
origin, reaches both the window's bottom edge and its right edge.

This is proved by the fractional case, which reddens under `wholenudge`, the round-3 arithmetic that needs a whole
pixel of room: 1 failed.

### S2: SVG elements

The scroll decision in `captureFrame` now handles an element that is not an HTML element:

- It walks up through non-HTML ancestors to the nearest HTML element and walks that element's `offsetParent` chain.
- It stops early on an outermost `svg` root (`SVGSVGElement` with no `ownerSVGElement`) whose computed `position` is
  `fixed`.
- The document scrolls unless the walk ends on a fixed box.

The proof is "leaves the document unscrolled for an svg element the scroll cannot move". It sits beside the
fixed-element proof and captures an `svg` `rect` inside a fixed box and a fixed `svg` root, each past the pane. It
asserts 0 `scroll` events.

It reddens on the round-3 decision, which the `htmlonly` mutation reproduces exactly, and on `nofixedroot`, which
drops the fixed-root stop: 1 failed each. The round-3 source itself cannot load the final test file, because that file
imports the `computeOffset` function.

### W5: width-independent fixtures

The below-pane, scope, fixed-panel, and no-attribute fixtures now declare `width: min(390, window.top.innerWidth)` and
expect that width. So each element fits across the runner window on any host, as well as down it.

### W8: prose, in the TSDoc of the `captureFrame` function and in `guides/test.md`

- **Fixed elements.** "nor for an element the scroll cannot move: an element fixed to the viewport, or anything inside
  one."
- **No offset.** "An element inside the window, or too large for it, is not offset up or left."
- **Staging.** "…the staging puts the tester frame at that origin, under the parked pointer."
- **The nudge.** "…offset down to the element's first free row, or else right to its first free column, by no more
  than the room the window leaves, a fraction of a row included."
- **The residual.** "An element that fits the window and, from the origin, reaches both its bottom edge and its right
  edge stays on that point."
- **An element off the park point.** "For an element off the park point that needs neither, the element frame moves
  nothing further under the pointer."
- **Cosmetic.** The overlong line in the guide's layout rule is rewrapped.
- **Coverage list.** The guide's coverage list names the new cases.

### Ordering defect: the element returned to the park point after the shot

In the first round-4 mutation series, the scrolled-corner proof failed once under `nofixedroot`, a mutation that does
not touch its path (`t5-4-mut-nofixedroot.log.txt` in that series). That log is overwritten by the final series; the
first series' console output in `t5-4-mutations-summary.log.txt` was also overwritten.

**Cause.** After the screenshot, the inner `finally` block took the offset off while the tester's document was still
scrolled to the element. So the element sat on the origin, under the parked pointer, until `releasePane` moved the
tester away. A frame painted in that gap delivered a `mouseover` event.

**Fix.** The inner `finally` block now calls `window.scrollTo(saved scroll)` in the same task, before it restores the
`style` attribute. The restore after `releasePane` stays, because the release can clamp the scroll. The TSDoc and the
guide state this.

**Proof.** "hands the scroll back before the offset comes off, so the element never returns to the park point". A
`MutationObserver` watches the frame's `style` attribute and records, in the task of each change, whether the
element's box covers the runner page's origin. The test asserts no reading covers it.

| Run | Result | Log |
| --- | --- | --- |
| Red, before the fix | `expected [ true ] to strictly equal []` | `t5-4-red-return.log.txt` |
| Green, after the fix | passes | `t5-4-green.log.txt` |
| `latescroll` mutation | 1 failed | `t5-4-mut-latescroll.log.txt` |

**Stability.** Three repeated runs of the group on the final tree each read 38 passed (`t5-4-repeat-1.log.txt`
through `t5-4-repeat-3.log.txt`, script `t5-4-repeat.sh`).

### Referral R3, answered

The provider's element shot does not undo the nudge for an element too large for the window. The proof is "keeps a
flush-left element too large for the runner window off the parked pointer": 0 `mouseover` events, with a frame of the
element's full height.

- **Setup.** The tester is scrolled past the element first. Staging alone moves the tester to the origin under the
  parked pointer, and a first draft without that scroll recorded that staging-caused `mouseover` event.
- **Red.** It reddens under `nonudge`.

## New proofs: red and green

Every run uses the same command, with its filter:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "captureFrame|readFrame|computeOffset"`.

- **Green, final tree:** 38 passed, 334 skipped (`t5-4-green.log.txt`, ending `green 0`).
- **Red evidence:**

| Proof | Red on | Log |
| --- | --- | --- |
| `computeOffset` right-nudge case | `noright` | `t5-4-mut-noright.log.txt` |
| `computeOffset` fractional case | `wholenudge` | `t5-4-mut-wholenudge.log.txt` |
| `computeOffset` down, negative-top, horizontal-then-nudge, and too-large cases | `nonudge` | `t5-4-mut-nonudge.log.txt` |
| SVG unscrolled proof | `htmlonly` (the round-3 decision); `nofixedroot` | `t5-4-mut-htmlonly.log.txt`, `t5-4-mut-nofixedroot.log.txt` |
| Park point after the shot | the pre-fix source; `latescroll` | `t5-4-red-return.log.txt`, `t5-4-mut-latescroll.log.txt` |
| Too large for the window, parked pointer | `nonudge` | `t5-4-mut-nonudge.log.txt` |

## Mutations

`tmp/units/t5-4-run.sh <names…>` runs each file in `tmp/units/t5-4-mutations/<name>.json` against the final test
file.
- **Digests.** `t5-4-digest.log.txt` holds the test file's SHA-256 digest before the series (`13d1db06…94118`) and a
  `sha256sum -c` result of `OK` after it, with `check exit 0`.
- **Restores.** Every run restored `src/browser/helpers.ts` from `t5-4-helpers-final.ts.txt`, checked with `cmp`
  (`restored` in `t5-4-mutations-summary.log.txt`).

| Mutation | Reddens | Count |
| --- | --- | --- |
| `noright` | right-nudge case | 1 failed, 37 passed |
| `wholenudge` | fractional case | 1 failed, 37 passed |
| `nonudge` | both corner proofs; park point after the shot; too-large proof; each leaf case with a nudge | 10 failed, 28 passed |
| `htmlonly` | SVG unscrolled proof | 1 failed, 37 passed |
| `nofixedroot` | SVG unscrolled proof | 1 failed, 37 passed |
| `latescroll` | park point after the shot | 1 failed, 37 passed |
| `noscrollback` (only the restore after the release removed) | element refusal (scroll 100) | 1 failed, 37 passed |
| `nooffset` | fixed panel; below-pane; `50vh`; scope (control); scrolled corner; park point after the shot; too-large proof | 7 failed, 31 passed |
| `nocomposite` | fixed panel | 1 failed, 37 passed |
| `widened` | scope (second frame) | 1 failed, 37 passed |

Each mutation's log is `t5-4-mut-<name>.log.txt`. Each named proof asserts the property its mutation breaks: a leaf
result, a `scroll` event count, a `mouseover` count, a covered-origin reading, a scroll position, a floor color, or the
second frame's top.

`noscrollback` now reddens only the refusal path. On the passing path, the restore beside the offset already puts the
scroll back, so the refusal case is the one that proves the restore after the release.

## Gates

`tmp/units/t5-4-gates.sh` ran these. Each log ends with the exit status the run itself wrote.

| Command | Exit | Result | Log |
| --- | --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files | 0 | `All matched files use the correct format.` | `t5-4-gate-format.log.txt` |
| `npm run lint:check` | 0 | No diagnostics | `t5-4-gate-lint.log.txt` |
| `npm run check` | 0 | Root and every `check:src` project clean | `t5-4-gate-check.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts` | 0 | `Tests  370 passed \| 2 expected fail (372)` | `t5-4-gate-file.log.txt` |
| `npm run test:src:browser`, as an observation | 0 | `Tests  424 passed \| 2 expected fail (426)`, 47.89 s | `t5-4-gate-browser.log.txt` |
| `npm run test:guides` | — | Not run; needs a built `dist/`. It checks the new Surface rows. | — |

## Evidence files

- `tmp/units/t5-4.diff`, the whole change over `80c419e`. Diffstat: 4 files changed, 790 insertions, 34 deletions.
- `tmp/units/t5-4-status.txt`: `M` on `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts`, and
  `tests/src/browser/helpers.test.ts`.
- The instruments:
  - `t5-4-run.sh`, the mutation runner.
  - `t5-4-gates.sh`, the gate runner.
  - `t5-4-repeat.sh`, the stability runs.
  - `t5-4-mutations/*.json`, the retained mutation files.
- The saved sources:
  - `t5-4-helpers-final.ts.txt`, the final `helpers.ts`.
  - `t5-4-helpers-r3.ts.txt` and `t5-4-test-r3.ts.txt`, the round-3 copies.

## Deviation state

- **Stop condition:** not reached.
- **Shared-file patches:** none.
- **Scope addition, recorded for audit.** The ordering fix touches the inner `finally` block of `captureFrame`. It was
  found by a mutation run's stray failure and is covered by its own proof and mutation.
- **Residual, stated.** An element that fits the runner's window and, from the origin, reaches both the window's bottom
  edge and its right edge stays on the park point.
- **Assumption, stated in the code comment.** An outermost `svg` root whose computed `position` is `fixed` is taken as
  fixed to the viewport. A fixed `svg` root inside a transformed ancestor is not distinguished.
- **For the Orchestrator.**
  - Run `npm run build` and then `npm run test:guides`, which checks the new `FrameOffset` and `computeOffset` Surface
    rows.
  - Re-run Veneer `journey:light-390` and `journey:dark-1280` against a build of this tree.
