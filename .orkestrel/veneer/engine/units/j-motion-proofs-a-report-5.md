# J-MOTION-PROOFS-A round 5 report (opus on Opus 5.5)

Retained from the unit's final message in its completion notification on 2026-09-25. The brief is `units/j-motion-proofs-a-brief-5.md`.

---

The showcase modal case now waits for the modal's own completed events before it reads focus and page state. The case failed when run alone before the change and passes after it, and `npm run test:app` passes whole. S2 found no other case in `tests/app/` with this defect, so there are no patches. Nothing is committed.

## The change
Only `tests/app/browser/sections/EngineSection.test.ts` changed (38 insertions, 19 deletions), in the case `opens the modal from its trigger, locks the page, and closes from its button and from Escape`.

- **Waits:** each step now arms `waitForEvent` on `MODAL_EVENTS.shown` or `MODAL_EVENTS.hidden` before the click or key press that starts the change, then awaits it. This follows the pattern `Carousel.test.ts` already uses. It replaces:
  - the `waitForCondition('the modal shows…')` plus `waitForAnimations(dialog)` pairs;
  - the "hides and releases the page" `waitForCondition` polls.
- **Assertions:** every assertion is kept. Two things the removed waits used to check are now explicit assertions:
  - the modal carries `show`;
  - the modal's display is `none` after each hide.
- **Dialog check:** the unused `dialog` binding is now `expect(modal.querySelector('.modal-dialog')).not.toBeNull()`.
- **Imports:** added `MODAL_EVENTS` and `waitForEvent`. `waitForAnimations` stays, because other cases use it.

## Red and green readings
Command: `npx vitest run --config vite.config.ts --no-cache --project app:browser tests/app/browser/sections/EngineSection.test.ts`

**Before**, at `efb32fb`:
```
FAIL |app:browser (chromium)| tests/app/browser/sections/EngineSection.test.ts:209:2 > EngineSection > opens the modal from its trigger, locks the page, and closes from its button and from Escape
AssertionError: expected <button type="button" …(3)></button> to be <div class="modal fade show" …(6)>…(1)</div> // Object.is equality
 ❯ tests/app/browser/sections/EngineSection.test.ts:244:33
      Tests  1 failed | 14 passed (15)
```

**After**:
```
 Test Files  1 passed (1)
      Tests  15 passed (15)
```

## S2 findings
No patches. `tmp/j-motion-proofs-a/scan-waits.py` lists every `await waitForAnimations(` under `tests/app`, with the lines around it. It flags only sites near an engine class, a `.vn.` event, or engine-written state such as focus, the `aria-*` attributes, `modal-open`, or the show/hide/close calls. It flagged six sites:

- **`integration.test.ts`, three sites** (the page-strip hover, the floating label, and the dropdown item's hover and focus): each reads paint after a style transition, not an engine's completion. That file is the styles session's, and I left it alone.
- **`EngineSection.test.ts`, Collapse, Tab, and Offcanvas cases:** each waits on a token the engine writes at or after its settle before reading anything. The state each reads is written by then:
  - Collapse: `show` is written at completion; `aria-expanded` and display are already set.
  - Tab: the first pane lost `active` and `aria-selected` was written before the second pane's fade.
  - Offcanvas: `showing` or `hiding` is removed after the settle; `aria-modal`, visibility, and focus return are written before or in the same task.

  I left them unchanged.

`Showcase.test.ts`'s only animation wait was not flagged.

## `npm run test:app`
```
npm run test:app exit 0
 Test Files  61 passed (61)
      Tests  223 passed (223)
   Duration  29.04s (transform 0ms, setup 3.78s, import 5.37s, tests 13.61s, environment 0ms)
```

The four owned files: Modal `61 passed (61)`, Offcanvas `62 passed (62)`, Backdrop `13 passed (13)`, Alert `24 passed (24)`. `npm run check`, `npm run lint:check`, `npm run format:check`, and `git diff --check` each exit 0.

## git status --short
```
 M tests/app/browser/sections/EngineSection.test.ts
```

## Deviation state
None. `src/browser/Modal.ts` is unchanged, and no file outside the owned one was edited.
