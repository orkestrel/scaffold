# Review of `39ede3a` — item 12 repair, confirming pass

Lane: objective, Opus 5.5, read-only over this snapshot, 2026-10-03.

VERDICT: FAIL 3. Claims 1 (R1 to R5 and the rulings), 2 (frame coalescing: a burst runs one check; an event between scheduling and running is covered by the frame's read; an event after the frame ran schedules a new one because `#wake` clears `#frame` first; a frame after the deadline expires the wait; settle, abort, deadline, and `pagehide` cancel the frame through `#stop`; a departed root is pruned before the check; mutation and `load` wakes keep their timing), 4 (each added assertion fails for its defect), and 5 (rules; the guide's scheduling description) PASS.

## 3. CDP navigation repair: FAIL

- The live test fails without the repair (`tmp/codex/item-12-cdp-navigation-red.log:14-36`).
- It can swallow a close: `page.wait('X', { timeout: 30_000 })` is inside `Runtime.evaluate` (`src/core/BrowserPage.ts:436`); the caller calls `page.close()`, which sets `#closed` (`:742`) and runs `#release` (`:963`), whose `#releaseResources` rejects the parked readiness entries (`:983-984`), none yet; `Target.closeTarget` ends the target and the pending evaluate rejects with "Inspected target navigated or closed"; the new alternative matches (`:467`), and the catch clears `#dom` and calls `#parkReadiness` (`:478`) without checking `#closed`; that entry is registered after the release, nothing resolves or rejects it, and the wait rejects only at its deadline with `BrowserError('Browser DOM readiness timed out', 'BROWSER_WAIT_TIMEOUT')`. Before the commit the same close rejected at once with the CDP error. UNRESOLVED: that Chromium answers a pending evaluate on target close with this string; the required test settles it.
- Referred (scope): `src/core/elements/BrowserElementManager.ts:254` rethrows any navigation error raw, so an element `wait` a navigation interrupts rejects with a `CDPError`; true before this commit; the guide's navigation sentence names only the text wait.
- Referred (UNRESOLVED): the coalesced check waits for an animation frame in `#main`'s window; if Chromium delivers `transitionend` or `animationend` in a hidden document while animation frames are paused, the last event gets no check until the page is visible or the deadline fires.

## Findings outside the claims

- `tests/src/browser/BrowserDOMWait.test.ts:136-138`: the departed-root assertion dispatches on the departed shadow root and compares the check count at once; with coalescing a leaked listener only requests a frame, so deleting only `entry.release.abort()` in the prune at `src/browser/BrowserDOMWait.ts:119` leaves it green.
- `src/core/compilers.ts:31` says the predicate is checked "on each `BROWSER_WAIT_EVENTS` event", while the compiled code schedules one frame per batch (`compilers.ts:57-59`).

## Required changes

- `src/core/BrowserPage.ts:465-478`: call `this.assert()` (or rethrow when `#closed`) before clearing `#dom` and parking; add a live test that closes the page during a pending text wait and asserts a rejection without `BROWSER_WAIT_TIMEOUT`, well before the deadline.
- `tests/src/browser/BrowserDOMWait.test.ts:136-138`: record the shadow root's signals with the R3 recorder and assert them aborted after the departure reconcile while the wait is pending (or await a frame before comparing counts); confirm with the mutation that deletes only `src/browser/BrowserDOMWait.ts:119`.
- `src/core/compilers.ts:31`: "checked immediately and on the animation frame after a mutation batch or a `BROWSER_WAIT_EVENTS` event".
