# J-ORACLE-FIX-OFFCANVAS — the writer's report (opus on Opus 5.5, 2026-09-25)

# J-ORACLE-FIX-OFFCANVAS report

The fix is in: when a backdrop press hides the panel, focus now ends on the trigger, with motion and under reduced motion. Every acceptance criterion passed in my runs, and there is no deviation.

## Measurements (before any source edit, at `63eabbd`)

**Measurement 1: census for `offcanvas` and `modal`.**
- The one focus departure is `offcanvas.reduced.point.backdrop` (Bootstrap reads `trigger`, Veneer reads `body`), as predicted. There are 67 departures in total.
- The other departures are `inert` attribute rows for both plugins.
- Modal has no focus departure.
- Evidence: `tmp/j-oracle-fix-offcanvas/census-before.log.txt` and the files in `census-before/`.

**Measurement 2: the engine alone, trusted press through `userEvent.click`, trigger focused before the show.**

| Setting | At `hidden` | When the press returns |
| --- | --- | --- |
| With motion | `body` | `body` |
| Under reduced motion | `opener` | `body` |

The focus-event log shows the order in both settings:
1. focus is on `opener` when `mousedown` bubbles, because the hide has already released the isolation;
2. `focusout` moves focus to `body`, which is the press's default action;
3. `mouseup` follows.

Under reduced motion, `hidden` fires before step 2, inside the microtasks after the listener. The case is kept at `tmp/j-oracle-fix-offcanvas/measure-2-case.ts.txt`.

**Why the census missed the motion case.** The engine alone reads `body` in both settings. The census drives Veneer through `Delegate`, whose offcanvas toggle route calls `trigger.focus()` at `hidden.vn.offcanvas`. With motion, `hidden` fires after the press's default action, so the Delegate puts focus back on the trigger. Under reduced motion, `hidden` fires before the default action, which then moves focus to `body`. The fix covers both settings.

**Modal unknown.** Neither the census nor the Modal suite shows a Modal focus departure, so there was nothing to stop on.

**Static backdrop reading.** A probe (`tmp/probe/static.test.ts`) records a `data-bs-backdrop="static"` panel under both libraries. After `point.static.backdrop`, both read `body` in both motion settings. The reading is identical before and after the fix.

## Files touched
- `src/browser/Offcanvas.ts`: the backdrop listener passes the event to `#press`, `#press` cancels the press's default action when its hide moved focus, and the class TSDoc and the `#press` comment state the order.
- `tests/src/browser/Offcanvas.test.ts`: two cases added after the trusted-press case.
- `guides/veneer.md` § Offcanvas: a sentence group on the press, the hide, and the focus return, plus an extension of the "Hiding calls no `blur`" departure bullet.
- `src/browser/types.ts`: unchanged. No `OffcanvasInterface` remark states this order; its only remark covers the resize.

Diffstat:
```
 guides/veneer.md                    |  13 ++++-
 src/browser/Offcanvas.ts            |  28 ++++++---
 tests/src/browser/Offcanvas.test.ts | 109 ++++++++++++++++++++++++++++++++++++
 3 files changed, 140 insertions(+), 10 deletions(-)
```

## The fix
`#press` reads `activeElement`, calls `void this.hide()`, and calls `event.preventDefault()` on the `mousedown` only when `activeElement` changed:

```ts
const focused = document.activeElement
void this.hide()
if (document.activeElement !== focused) event.preventDefault()
```

- **Why it works.** The hide's synchronous part releases the isolation, and that release moves focus to the trigger inside the listener. Cancelling the press's own default action stops the browser from then moving focus to `body`.
- **What keeps its default action.** A press that moves no focus: a prevented hide, a trigger the platform cannot focus, a press during the slide-out, and the static path, which is untouched. Each still moves focus to `body`, as Bootstrap's press does.
- **No timer and no polling.** The fix changes the press's own default action inside the listener the press already fires. It adds no timer, no animation frame, and no wait.
- **What stays the same.** `mousedown` still dismisses the panel, and the static path still dispatches `prevent`.

## Red-first proof
Command: `npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/Offcanvas.test.ts -t "press on the backdrop hides the panel, at the hidden|keeps the press focus change"`

**Case 1: "leaves focus on the trigger after a trusted press on the backdrop hides the panel, at the hidden event and after the press, with motion and under reduced motion"**
- Red on the `63eabbd` source, with 1 failed and 1 passed. The failing assertion is `expect(readings).toEqual(expected)` (around line 654).
  - With motion: `hidden` read `[[<body>]]`, and `pressed` and `settled` read `<body>`.
  - Under reduced motion: `hidden` read `[[opener]]`, and `pressed` and `settled` read `<body>`.
  - `dismissed` read `[[false]]` in both settings, which confirms `mousedown` dismisses.
- Green after the fix, with 2 passed.

**Case 2: "keeps the press focus change when the press moves no focus: a prevented hide, a trigger that takes no focus, a press during the slide out, and a static backdrop"**
- This is a guard against cancelling too often. It passes at `63eabbd` because it pins behaviour that must not change, and it passes after the fix.

## Census after the fix
- 66 departures, and no focus departure remains.
- The only difference from `63eabbd` is that the `offcanvas.reduced.point.backdrop` focus row is gone. Veneer's step changes only in `focus`, from `body` to `trigger`.
- Every other offcanvas and modal step, and both Bootstrap recordings, are identical (`tmp/j-oracle-fix-offcanvas/compare.log.txt`).
- The departures that remain are the `inert` attribute rows: 48 for modal and 18 for offcanvas.

## Mutation table
Each mutation was run with the same command; logs are `tmp/j-oracle-fix-offcanvas/mutation-2-*.log.txt` and `mutation-3-click.log.txt`.

| Mutation | Case that fails | Failing reading |
| --- | --- | --- |
| Never cancel the default action | Case 1, `expect(readings).toEqual(expected)` | `pressed` and `settled` read `<body>` in both settings; `hidden` reads `<body>` with motion |
| Always cancel on a dismissing press | Case 2, row `prevented` | `focus` reads the panel `<div>` instead of `<body>` |
| Cancel when the hide released the isolation (`this.#isolation === undefined`) | Case 2, row `unfocusable` | `focus` reads the panel `<div>` |
| Cancel when focus is outside the panel (`!host.contains(activeElement)`) | Case 2, row `sliding` | `focus` reads `<button>` (the opener) |
| Cancel on a static backdrop press too | Case 2, row `static` | `focus` reads the panel `<div>` |
| Listen for `click` instead of `mousedown` | Case 1 | `dismissed` reads `[[true]]` instead of `[[false]]` |

For every Case 2 row, the failing assertion is the row's `toEqual` (around line 697). The source was restored after each run, and `cmp` confirmed it.

## Acceptance output, verbatim (`tmp/j-oracle-fix-offcanvas/accept.log.txt`)
```
npm run check exit 0
npm run lint:check exit 0
npm run format:check exit 0
Offcanvas.test.ts exit 0
 Test Files  1 passed (1)
      Tests  64 passed (64)
Isolation.test.ts exit 0
 Test Files  1 passed (1)
      Tests  10 passed (10)
Modal.test.ts exit 0
 Test Files  1 passed (1)
      Tests  61 passed (61)
census exit 0
```

## `git status --short`
```
 M guides/veneer.md
 M src/browser/Offcanvas.ts
 M tests/src/browser/Offcanvas.test.ts
```

## Deviation state
None. Choices I settled myself:
- **Mechanism:** cancel the default action, conditioned on focus having moved.
- **Case titles and placement:** both cases sit right after the trusted-press case.
- **Slide-out row:** the panel gets an inline `2s` duration so the press lands while the backdrop is still in the page. It lengthens the transition for the test and pins no value the cascade owns.
- **`types.ts`:** left unchanged, for the reason given under Files touched.

No commit, no install, and no off-limits file was touched. Everything the unit produced sits in the worktree's `tmp/j-oracle-fix-offcanvas/` and `tmp/probe/` folders, including the mutation scripts (`mutate.sh`, `mutate-2.sh`, `mutate-3.sh`), `accept.sh`, `compare.py`, and all logs.
