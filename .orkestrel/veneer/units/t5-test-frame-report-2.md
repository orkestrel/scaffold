# Unit T5 round 2 report — declared geometry, hand-back, frame scope, and pointer

Role and engine: `opus` on Opus 5.5, a native Claude subagent. Checkout `/home/user/test-tf`, uncommitted over
`80c419e`. Briefs: `t5-brief-2.md` and the mid-round note `t5-brief-2-note.md`. Every log is under
`/home/user/test-tf/tmp/units/`.

## Outcome

- **`T5-FIT`: done.** An element frame no taller than the declared pane is shot with the pane at the declared height.
  - A `50vh` element under a 900-pixel spacer reads 422 rows on its own color.
  - A `30vh` element reads 254 rows under both the 900-pixel and the 1000-pixel spacer.
  - The pane grows only for an element taller than the declared height, and then to that element's own height.
- **`T5-BACK`: done.**
  - The tester's scroll is saved before anything moves and restored after `releasePane`, on every path.
  - The offset and the compositing hint come off as soon as the screenshot settles, before the file verification.
- **`T5-SCOPE`: done.** The offset is written on the calling frame's own `style` attribute. That attribute is saved
  and restored exactly, so nothing is set to find the frame, and no other tester frame moves.
- **`T5-POINTER`: done.** An element inside the runner's window is neither scrolled nor offset. A move that is
  required goes only as far as brings the element inside the pane or the window.
- **R2 and the prose: done.** The fixed-panel fixture now reads the runner's window size. The prose (claim 8, F1, F2)
  is rewritten.
- **One limit remains.** An element exactly as tall as the runner's window and flush with its left edge still lands
  on the park point. See Deviation state.
- **Gates.** All run green except `npm run test:guides`, which needs a built `dist/`. The Orchestrator runs it.

## Unknown: does scrolling bring an in-flow element into the declared pane?

Yes. This was settled before the mechanism was chosen, with a probe block appended to the test file and then removed.
- Log: `tmp/units/t5-2-unknown.log.txt`.
- Method: staged 390x844, scrolled the tester to the element's top, offset the frame to the window, and shot the
  element.
- Readings:
  - `50vh` under 900: 390x422, floor `rgb(0, 0, 255)`.
  - `30vh` under 900 and under 1000: 390x254 each.
- The pane never grew in any of these runs.

## Findings measured this round

- **The provider refuses a second `data-vitest="true"` frame.** Its own locator is
  `page.frameLocator('[data-vitest="true"]')` (`@vitest/browser-playwright/dist/index.js`, the `iframe` getter in
  `getCommandsContext`), and it is strict. With a second such frame in the runner page, the provider refused the shot
  with `strict mode violation: locator('[data-vitest="true"]') resolved to 2 elements`
  (`t5-2-red-r1.log.txt`). The scope proof's second frame therefore carries `data-vitest="earlier"`: the staging
  selector and a widened offset still match it, and the provider's locator does not.
- **The staging itself moves a hover taken before it.** `stagePane` unscales the tester and moves it to the window's
  origin. So a hover taken on the unstaged tester is already gone on the base code, before any element-frame move
  (`t5-2-debug.log.txt`). The held-hover proof therefore puts the pointer on the element with the pane already
  staged at 390x844. Any loss it measures is the element frame's own doing.

## Changes

- **`captureFrame`, the staging loop.** For an element frame, the re-reading is
  `max(ceil(element.getBoundingClientRect().height), options.height)` rather than the element's bottom edge. The
  round-1 scroll to the top is removed. The page-frame path, the bound, and the refusal text are unchanged.
- **`captureFrame`, the element branch.**
  - It scrolls by the nearest amount only when the element lies outside the pane.
  - It then computes `rise` and `shift` as the smallest upward and leftward offsets that bring the element inside
    `window.top`. That applies only when the element fits the window, because an element that does not fit is
    captured beyond the viewport.
  - Only when `rise` or `shift` is nonzero does it append
    `top:-rise px !important;left:-shift px !important;will-change:transform` to the calling frame's `style`
    attribute, then wait two frames.
  - The saved attribute is restored in a `finally` block around the screenshot. A comment states that the offset
    outranks the `stagePane` placement and depends on it being fixed.
- **`captureFrame`, the outer `finally` block.** It restores `scrollX` and `scrollY` after `releasePane`. The round-1
  stylesheet and its selector over every `iframe[data-vitest]` are gone.
- **`captureFrame`, the TSDoc.**
  - The `@throws` now names the element height.
  - Rewritten paragraphs cover the geometry that ships, the scroll, the offset (its own word, distinct from the
    `stagePane` lift), its dependence on `stagePane`, what a scroll or an offset can do to hover, and the scroll
    restore.
  - Code tokens carry their nouns.
- **`readFrame`.** Unchanged from round 1.
- **`tests/src/browser/helpers.test.ts`, the `captureFrame` group.**
  - The fixed-panel proof reads the runner's window: `declared = max(844, 10 × ceil((window + 100) / 7))`. It expects
    `declared × 3 / 10` rows on the panel's color and asserts the scroll is back at 400.
  - The below-pane proof starts scrolled to 200 and asserts it is back.
  - New cases, one per behavior: `50vh`, `30vh` under both spacers, the tall element, the refusal with the
    scroll handed back, the frame scope, the parked pointer, and the held hover.
- **`guides/test.md`.**
  - The element-frame paragraphs are rewritten.
  - The possessive code token is gone: "The remaining refusals of the `readFrame` function".
  - The layout rule's "What the capture borrows it gives back" now names the viewport, the scroll, and the `style`
    attribute.
  - The coverage list names the new cases.

`src/browser/types.ts` and `src/browser/constants.ts` are untouched. Using the frame's own attribute instead of a
marker avoids a new export.

## Proofs

Every run uses the same command:
`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts -t "captureFrame|readFrame"`.

| Run                                  | Count                               | Log                               |
| ------------------------------------ | ----------------------------------- | --------------------------------- |
| Red, final tests on the round-1 code | 9 failed, 13 passed, 334 skipped    | `t5-2-red-r1-final.log.txt`       |
| Red, first draft on the round-1 code | 9 failed, 13 passed                 | `t5-2-red-r1.log.txt`             |
| Green, final tree                    | 22 passed, 334 skipped              | `t5-2-green.log.txt`              |

The round-1 code is saved as `t5-2-helpers-r1.ts.txt`. It was swapped in for the red run and then restored, and the
restore was checked with `cmp`.

Red readings on the round-1 code:
- Fixed panel: `expected +0 to be 400`, the scroll.
- Below-pane: `expected +0 to be 200`.
- `50vh`: `expected 900 to be 422`.
- `30vh`: refused, `1295 over a 1314 pane`.
- Tall element: refused, `1445 over a 1447 pane`.
- Element refusal: `expected +0 to be 100`.
- Frame scope: the second frame read at -1244.
- Parked pointer: `expected 1 to be +0` mouseover.
- Held hover: `expected 'rgb(0, 0, 255)' to be 'rgb(255, 0, 0)'`.

## Mutations

Each mutation was applied to the final source and run through `tmp/units/t5-2-mutate.sh`. Each is logged at
`tmp/units/t5-2-mut-<name>.log.txt` and was restored with a `cmp` check. The runs were taken before the last
comment and TSDoc edits. Those edits changed no code line.

| Mutation                                          | Reddens                                                                 | Count                |
| ------------------------------------------------- | ----------------------------------------------------------------------- | -------------------- |
| `noscrollback`: no scroll restore                 | below-pane (200); element refusal (100)                                 | 2 failed, 20 passed  |
| `widened`: offset applied to every tester frame   | frame scope (second frame above the origin)                             | 1 failed, 21 passed  |
| `toorigin`: element moved to the window's origin  | parked pointer (mouseover); held hover (floor blue)                      | 2 failed, 20 passed  |
| `nooffset`: offset never applied                  | fixed panel; below-pane; `50vh`; frame scope (control)                   | 4 failed, 18 passed  |
| `nocomposite`: no `will-change`                   | fixed panel (panel culled)                                              | 1 failed, 21 passed  |
| `edgereading`: round-1 bottom-edge staging        | fixed panel; `50vh`; `30vh`; tall element                                | 4 failed, 18 passed  |
| `norestyle`: `style` attribute never restored     | frame scope (attribute); held hover; and later tests                      | 4 failed, 18 passed  |

- **Distinction.** Every named proof asserts the property its mutation breaks: a height, a floor color, a scroll
  position, a mouseover count, the second frame's top, or the `style` attribute. None passes under its mutation.
- **`norestyle` contamination.** This mutation also reddens "refuses a document whose height never settles" and
  "reports no floor for a frame whose bottom row paints more than one color". The leaked offset stays on the frame
  for every later test, so this is the leak itself, not collateral damage to the harness.
- **Host dependence (R2).** The fixed panel's top is at 70% of the declared height, which is at least 100 rows past
  `window.top.innerHeight`. So `nooffset` and `nocomposite` redden it on any window size. The below-pane, scope, and
  `50vh` proofs force an offset on this host's 513-row window. The below-pane and scope proofs read the window, so
  they force it on any host.

## Gates

| Command                                                                                                   | Exit | Result                                          | Log                          |
| --------------------------------------------------------------------------------------------------------- | ---- | ----------------------------------------------- | ---------------------------- |
| `npx oxfmt --config .oxfmtrc.json --check` over the owned files                                           | 0    | `All matched files use the correct format.`     | `t5-2-gate-format.log.txt`   |
| `npm run lint:check`                                                                                      | 0    | No diagnostics                                  | `t5-2-gate-lint.log.txt`     |
| `npm run check`                                                                                           | 0    | Root and every `check:src` project clean   | `t5-2-gate-check.log.txt`    |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/helpers.test.ts` | 0 | `Tests  354 passed \| 2 expected fail (356)` | `t5-2-gate-file.log.txt` |
| `npm run test:src:browser`, as an observation                                                             | 0    | `Tests  408 passed \| 2 expected fail (410)`, 46.77 s | `t5-2-gate-browser.log.txt` |
| `npm run test:guides`                                                                                     | —    | Not run; needs a built `dist/`                  | —                            |

The first lint run failed. It refused `[calling: number, other: number][]` under the `typescript(array-type)` rule,
and the tuple type was rewritten as `Array<…>`. The log above is the rerun.

## Evidence files

- `tmp/units/t5-2.diff`, the whole change over `80c419e`. Diffstat: 3 files changed, 397 insertions, 31 deletions.
- `tmp/units/t5-2-status.txt`: `M` on `guides/test.md`, `src/browser/helpers.ts`, and
  `tests/src/browser/helpers.test.ts`.
- `tmp/units/t5-2-helpers-final.ts.txt`, the shipped `helpers.ts`.
- `tmp/units/t5-2-helpers-r1.ts.txt` and `tmp/units/t5-2-test-r1.ts.txt`, the round-1 copies.
- `tmp/units/t5-2-debug.log.txt`, the tall-element and held-hover diagnosis.

## Deviation state

- **Stop condition:** not reached. Every element no taller than the declared pane that was tried is shot at the
  declared geometry.
- **Shared-file patches:** none.
- **Remaining limit, reported rather than fixed.** The minimal offset puts the element's bottom on the window's
  bottom row. So an element exactly as tall as the runner's window, and flush with its left edge, lands on the park
  point at the window's origin. An element one row shorter does not.
- **Behavior carried as stated, not proven.** A fixed element that extends past the declared pane is shot as that
  pane shows it. Scrolling cannot move a fixed element, and the pane does not grow for an element no taller than the
  declared height.
- **Part rows.** A part row at an element's bottom, such as the tall element's 1111.2 rows, is the frame's last row and
  not the element's own color. The tall-element proof asserts the 1112-row height, not the floor.
- **Observation, outside scope.** A second `data-vitest="true"` frame in the runner page makes the provider refuse
  every locator action, so the runner cannot hold a stale tester with that value while a capture runs.
