# Unit T5 round 6 report — bound the window-fit move, correct the park's stated mechanism

Role and engine: `opus` on Opus 5.5, a native Claude subagent resumed with its round-5 context. Checkout
`/home/user/test-tf`, uncommitted over `80c419e`, with `dist/` left untouched. Brief: `t5-test-frame-brief-6.md`. It was read with the round-5 verdict, the objective verdict's claim 5, the subjective
verdict's F1 and F2, and `t5-instruments-5/t5-offset-probe.mjs` with its log. Every log and instrument is retained under `.orkestrel/veneer/units/t5-instruments-6/`.

## Outcome

- **C5, F1, and F2: closed.**
- **Mid-round decisions.** The two coordinator messages on item 2 were applied in order: first withdrawn, then
  reinstated. The final tree carries item 2 exactly as the brief states it.
- **Stop condition: not reached.** No round-5 proof reddens under the bounded arithmetic.
- **Gates.** Every gate the unit may run exits 0, and each log ends with the exit status the run itself wrote.
- **Left to the Orchestrator.** `npm run build`, `npm run test:guides`, and the Veneer journeys.

## Changes by symbol

- **`computeOffset`** (`src/browser/helpers.ts`), item 1 (C5). Each axis is bounded, inline, with no new helper:

  ```ts
  top: fits && box.bottom > height ? Math.max(height - Math.ceil(box.bottom), -box.top) : 0,
  left: fits && box.right > width ? Math.max(width - Math.ceil(box.right), -box.left) : 0,
  ```

  - An axis whose far edge already lies inside the window does not move.
  - An overflowing axis moves by its rounded amount, but never takes the near edge past zero.
  - The zero branches return a literal `0`, not `-0`, which `toStrictEqual` separates.
  - The TSDoc paragraph that describes the rounding now states the bound. The Summary is unchanged.
- **The `releasePointer` remarks** (`src/browser/helpers.ts`) **and the guide's `releasePointer` bullet**, item 2
  (F1). Each now reads that the park point is (-1, -1) in the runner page's coordinates, one pixel above and to the
  left of that page's viewport, where the browser hit-tests nothing. So no element takes a `mouseover` event or hover
  paint from the parked pointer until the next pointer verb, even where a staging, scroll, or offset lays content over
  that point. Every other sentence is unchanged.
  - **Change history.**
    - The sentences were first written per the brief.
    - They were restored to their round-5 text on the first coordinator message. `t5-6-f1-restore.log.txt`, from
      `t5-6-f1-restore-check.py`, shows the restore matched round 5 byte for byte.
    - They were written again per the brief on the correcting message.
  - **Only those sentences changed.** Nothing else was edited for either message.
- **The hover proof** (`tests/src/browser/helpers.test.ts`), item 3 (F2).
  - Its title reads "keeps the hover a resting pointer paints on the element it shoots".
  - `.held` becomes `.hovered` and "Held" becomes "Hovered".
  - Its frame path becomes `hovered.png`.
  - In the guide's `captureFrame` coverage entry, "A held hover" is replaced by "A hover placed after staging on an
    element at the tester's top-left corner stays in the frame."
  - The `holdAccessible('Held')` cases around line 1003 are unchanged.
- **`computeOffset` cases** (`tests/src/browser/helpers.test.ts`). Each new case asserts its move and the final box's
  edges:
  - "moves a fitting box with a fractional top only as far as the window start": `(0, 0.5, 100, 513)` in 800 by 513
    gives `{ top: -0.5, left: 0 }`, and the box ends as `[0, 513]`.
  - "moves a fitting box with a fractional left only as far as the window start": `(0.5, 0, 800, 100)` in 800 by 513
    gives `{ top: 0, left: -0.5 }`, and the box ends as `[0, 800]`.
  - "leaves a box that already ends inside a fractional window where it is": `(0, 0, 800, 512.5)` in 800 by 512.5
    gives `{ top: 0, left: 0 }`, and the box ends as `[0, 512.5]`.
  - The fractional-bottom case keeps -332.
  - The both-edges case now uses a fractional box, `(800.5, 744.5, 390, 100)`, expecting `{ top: -332, left: -391 }`,
    so `noceil` reddens it. This carries the round-5 audit's R3, which the verdict routed to item 1.
- **The guide's `computeOffset` coverage entry** names the three new cases.
- **`src/browser/types.ts`: not edited.** The `FrameOffset` docs do not name the rounding. Its hunk in `t5-6.diff`
  equals its hunk in `t5-5.diff` (`t5-6-types-unchanged.log.txt`).

## The new cases: red and green

| Run | Result | Log |
| --- | --- | --- |
| Red on the round-5 arithmetic, before the fix | 3 failed, 8 passed. The received values were `{ top: -1 }`, `{ left: -1 }`, and `{ top: -0.5 }`. | `t5-6-red-r5.log.txt` |
| Red on the retained `unbounded` mutation, in the final series | the same 3 cases, 3 failed, 372 passed | `t5-6-mut-unbounded.log.txt` |
| Green, `computeOffset` group | 11 passed, run before the both-edges case changed | `t5-6-green-leaf.log.txt` |
| Green, whole file | 375 passed, 2 expected fail, `exit 0` | `t5-6-green.log.txt` |

`t5-6-green.log.txt` was first written before the both-edges edit and rewritten after it. Its final content is the
reading after the edit.

## Mutations

`.orkestrel/veneer/units/t5-instruments-6/t5-6-run.sh` runs each file in `.orkestrel/veneer/units/t5-instruments-6/t5-6-mutations/<name>.json` against the whole final test file.
Each run restores `src/browser/helpers.ts` from `t5-6-helpers-final.ts.txt` and checks the restore with `cmp`.

The series ran four times. Every per-mutation reading was the same each time, except that `noceil` gained the
both-edges case from the second series on. Each series' summary and digest log is retained:

| Series | Test file digest | Summary log | Digest log |
| --- | --- | --- | --- |
| First: item 2 as briefed; both-edges case with whole-pixel edges | `7ba86a73…94007dd`, OK after | `t5-6-mutations-summary-first-series.log.txt` | `t5-6-digest-first-series.log.txt` |
| Second: the both-edges case made fractional | `bdad0a88…a82740b`, OK after | `t5-6-mutations-summary-second-series.log.txt` | `t5-6-digest-second-series.log.txt` |
| Third: after the item-2 restore, against a refreshed final source | `bdad0a88…a82740b`, OK after | `t5-6-mutations-summary-third-series.log.txt` | `t5-6-digest-third-series.log.txt` |
| Fourth, final: after item 2 was reinstated | `bdad0a88…a82740b`, OK after, `check exit 0` | `t5-6-mutations-summary.log.txt` | `t5-6-digest.log.txt` |

The runner overwrites each `t5-6-mut-<name>.log.txt`, so the per-mutation logs hold the fourth series. The earlier
series are kept in their summary logs.

Final series, on the test file with digest `bdad0a88…`:

| Mutation | Named proof it reddens | Result |
| --- | --- | --- |
| `origin` | every corner proof, the both-axes proof, and every lifecycle exercise | 9 failed, 366 passed |
| `nomove` | the hover-clears proof (`hoverAccessible`), plus the park proofs the pointer is left over | 9 failed, 366 passed |
| `nudge` | the resting-pointer hover proof (floor blue), plus `computeOffset` cases, the three new ones included | 7 failed, 368 passed |
| `noceil` | the fractional-bottom case and the both-edges case | 2 failed, 373 passed |
| `scrolltop` | the inside-window proof (`scroll` events) | 1 failed, 374 passed |
| `nooffset` | fixed panel, below-pane, `50vh`, scope (control), both-axes (control) | 5 failed, 370 passed |
| `nocomposite` | fixed panel | 1 failed, 374 passed |
| `widened` | scope (second frame), both-axes (control) | 2 failed, 373 passed |
| `noscrollback` | below-pane, element refusal, clamped-scroll exercise | 3 failed, 372 passed |
| `unbounded`, the round-5 `computeOffset` | the three new `computeOffset` cases | 3 failed, 372 passed |

Each run is logged at `t5-6-mut-<name>.log.txt`.

- **Re-derived files.** `noceil` and `nudge` were re-derived against the new function text.
- **The `unbounded` file.** It takes the round-5 function text from `t5-6-helpers-r5.ts.txt`.
- **The other files.** They are the round-5 files, copied unchanged into `t5-6-mutations/`.

## Gates

`.orkestrel/veneer/units/t5-instruments-6/t5-6-gates.sh` ran these on the final tree. Each log ends with the exit status the run itself wrote.

| Command | Exit | Result | Log |
| --- | --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files | 0 | `All matched files use the correct format.` | `t5-6-gate-format.log.txt` |
| `npm run lint:check` | 0 | No diagnostics | `t5-6-gate-lint.log.txt` |
| `npm run check` | 0 | Root and every `check:src` project clean | `t5-6-gate-check.log.txt` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts` | 0 | `Tests  375 passed \| 2 expected fail (377)` | `t5-6-gate-file.log.txt` |
| `npm run test:src:browser`, as an observation | 0 | `Tests  429 passed \| 2 expected fail (431)`, 47.53 s | `t5-6-gate-browser.log.txt` |
| Criterion 5: both greps | 1 each (no match) | the `holdAccessible('Held')` cases remain at lines 1003, 1005, and 1011 | `t5-6-criterion5.log.txt` |
| `npm run test:guides` | — | Not run; the Orchestrator runs it on its build | — |

An earlier lint reading, taken before the mutation series, is kept as `t5-6-lint-draft.log.txt`.

## Evidence files

- `.orkestrel/veneer/units/t5-6.diff`, the whole change over `80c419e`. Diffstat: 4 files changed, 879 insertions, 44 deletions.
- `.orkestrel/veneer/units/t5-6-status.txt`: `M` on `guides/test.md`, `src/browser/helpers.ts`, `src/browser/types.ts` (its round-4
  and round-5 change only), and `tests/src/browser/helpers.test.ts`.
- The instruments:
  - `t5-6-run.sh`, the mutation runner.
  - `t5-6-gates.sh`, the gate runner.
  - `t5-6-f1-restore-check.py`, the round-5 comparison.
  - `t5-6-mutations/*.json`, the retained mutation files.
- The saved sources:
  - `t5-6-helpers-final.ts.txt`, the final `helpers.ts`.
  - `t5-6-helpers-r5.ts.txt`, `t5-6-test-r5.ts.txt`, and `t5-6-guide-r5.md.txt`, the round-5 copies.

## Deviation state

- **Stop condition:** not reached.
- **Shared-file patches:** none.
- **Ancillary choices.**
  - The new cases sit after the fractional-bottom case.
  - The guide sentence for item 3 is as written in the preceding changes.
  - The both-edges case uses a fractional box, which carries R3.
- **Item 2's history.** It was edited, restored, then reinstated, as the coordinator messages directed. The final text
  is the brief's.
