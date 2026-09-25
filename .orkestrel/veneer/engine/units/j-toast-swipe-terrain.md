<!-- Grok lane swipe-terrain, session 4585bbd6-0475-4062-8d06-b3dbb842f365 -->

I'll read the brief and follow it exactly.The brief is a read-only comparison of how Elements and Mailbox dismiss a toast by swipe. I'll search both trees and Veneer's gesture code, then return only the specified shape.Both factories use a shared pointer helper. I'll read the swipe paths, the styles that consume them, and the tests that name the behavior.Question
How Elements and Mailbox dismiss a toast by swipe, and what Veneer's `Swipe` reports.

Evidence

1. Files and functions
- Elements: `createToast` in `elements/src/browser/factories/createToast.ts:58` composes `createPointer` (`elements/src/browser/factories/createPointer.ts:26`) at `createToast.ts:323`. `useToast` (`elements/src/browser/composables/useToast.ts:22`) forwards options. Cascade is `elements/src/styles/composables/_toast.scss:97`.
- Mailbox: `createToast` in `mailbox/src/browser/factories/createToast.ts:38` composes `createPointer` (`mailbox/src/browser/factories/createPointer.ts:16`) at `createToast.ts:276`. `useToast` (`mailbox/src/browser/composables/useToast.ts:15`) forwards its options. Styles are `mailbox/src/styles/_toast.scss`.

2. Input
- Elements: no `pointerType` filter. `accept` requires `event.button === 0` and an open popover, and rejects a down on `a, button, input, textarea, select, [role="button"]` (`createToast.ts:324-353`). `createPointer` calls `preventDefault`, `setPointerCapture`, and sets `document.body.style.userSelect = 'none'` (`createPointer.ts:78-85`). Axis lock waits until `|dx|` or `|dy|` reaches 6 (`createToast.ts:322`, `368-377`). `touch-action: pan-y` is on `[popover][role='status']` (`_toast.scss:114`).
- Mailbox: same button, open, and interactive-target gate (`createToast.ts:277-287`). Same capture, `preventDefault`, and `userSelect: 'none'` (`createPointer.ts:66-73`). Axis lock is `TOAST_SWIPE_AXIS_LOCK_PX = 6` (`createToast.ts:28`, `305-308`). No toast rule sets `touch-action`.

3. Geometry
- Elements: horizontal only, both signs of `clientX`. Default threshold `DEFAULT_TOAST_SWIPE_THRESHOLD_PX = 80` (`elements/src/browser/constants.ts:40`), overridable by `options.swipe.threshold`; `swipe: false` disables (`createToast.ts:71-73`, `types.ts:1830`). No velocity. `--set-toast-swipe-threshold: 5rem` is declared (`elements/src/styles/components/_output.scss:175`) and is not read by the factory.
- Mailbox: same axis, both directions, lock 6px, default 80 (`createToast.ts:27-28`, `262-265`), `swipe: false` disables (`types.ts:1924`). No velocity. `UseToastOptions` (`types.ts:1937`) has no `swipe` field; the factory option still defaults on.

4. Writes during a drag
- Elements: `data-toast-swiping=""` (`createToast.ts:362`); `--set-toast-swipe-offset` capped at `±threshold` (`:390`); `--set-toast-swipe-opacity` from 1 to 0.4 (`:396-397`). `_toast.scss:98-99` reads both variables as `translate` and `opacity`. `[data-toast-swiping]` sets `transition: none` and `cursor: grabbing` (`_toast.scss:126-131`). Deck `:has([data-toast-swiping])` rules are `_toast.scss:139` and `:153`.
- Mailbox: `data-toast-swiping="true"` (`createToast.ts:296`); inline `style.translate` (`:312`) and `style.opacity` (`:316`), same cap and 0.4 floor. No rule in `mailbox/src/styles` selects `data-toast-swiping`.

5. Release
- Elements: under the threshold, `end` removes the attribute and both properties (`createToast.ts:417-424`). `:not([data-toast-swiping])` then transitions `translate` and `opacity` (`_toast.scss:117-123`). At the threshold, `move` commits before pointerup: removes the attribute, sets offset to `sign * window.innerWidth` and opacity `0`, calls `pointer.clear()` and `hide()` (`createToast.ts:399-408`). `hide` goes through the popover; `elements:toast:hide` is cancellable (`constants.ts:547`, `createToast.ts:193-198`); `elements:toast:close` fires after `runTransition` (`:248-250`). `start` emits `elements:toast:pause` (`:361`, `constants.ts:549`); a non-commit `end` emits `elements:toast:resume` (`:424`).
- Mailbox: `end` removes the attribute (`createToast.ts:319`). Under the threshold, or if the axis is not `inline`, it clears inline `translate` and `opacity` (`:272-274`, `:330`) and restarts the timer (`:331`). The R5 block sets opacity with no transition (`_toast.scss:561-572`); `fade-state` only sets `display: none` (`mailbox/src/styles/_mixins.scss:207-210`). At or over the threshold on that `pointerup`, it clears the inline styles and calls `hide()` (`createToast.ts:321-327`). `mailbox:toast:hide` then `mailbox:toast:close` (`constants.ts:242-243`, `createToast.ts:175-184`, `:226-228`). `pause` clears the timer and emits nothing (`:240`).

6. Cancellation
- Elements: `pointercancel` is the same `onEnd` as `pointerup` (`createPointer.ts:89`, `:60-71`), so an uncommitted drag snaps back. A second `pointerdown` is ignored while `activePointer !== null` (`createPointer.ts:76`). No `lostpointercapture` listener. `focusin` / `focusout` only pause or resume autohide (`createToast.ts:283-288`). `clear()` releases capture without calling `end` (`createPointer.ts:45-50`); the commit path relies on that.
- Mailbox: `pointercancel` is also `onEnd` (`createPointer.ts:77`, `:49-59`), and that `end` still dismisses when the cancel event's `|dx|` is at the threshold (`createToast.ts:318-327`). A second pointer is ignored the same way (`createPointer.ts:64`). No `lostpointercapture` listener. Focus only pauses the timer (`createToast.ts:246-249`).

7. Accessibility
- Elements: sets `role="status"` when absent (`createToast.ts:67`). Toast passes `dismiss: { outside: false, escape: false }` (`:181`), so the popover Escape path (`createPopover.ts:251-255`) does not run. `hide()` is public (`createToast.ts:458`). `aria-hidden` is the deck overflow write (`:151`), removed on destroy (`:444`), not a swipe write. A button click is left to the button because `accept` rejects it (`:349`).
- Mailbox: same `dismiss: { outside: false, escape: false }` (`createToast.ts:164`; Escape gate `createPopover.ts:276-277`). No `role` write in the factory. Same deck `aria-hidden` (`createToast.ts:134`, cleared `:358`). Same interactive-target rejection (`:283`). `hide()` is public (`useToast.ts:39`).

8. Tests
- Elements: no factory gesture test. Style proofs in `elements/tests/src/styles/composables/_toast.test.ts`: `toast not under [data-toast-swiping] declares a non-zero transition-duration` at `:32`; `[data-toast-swiping] flip suppresses the transition` at `:43`; `toast root sets touch-action: pan-y so horizontal swipe-to-dismiss is the framework gesture` at `:77`.
- Mailbox: `mailbox/tests/src/browser/factories/createToast.test.ts` describe `swipe-to-dismiss` at `:89`. `registers a pointerdown listener by default` `:90`. `commits dismiss when swipe distance reaches threshold` `:100` (move to `clientX: 100`, then `pointerup`). `snaps back without dismiss when below threshold` `:112` (move to 30). `swipe: false skips the pointerdown listener registration` `:126`. `swipe: false makes a subsequent swipe a no-op (toast stays visible)` `:136`. `destroy clears the swipe listener (re-dispatch is a no-op)` `:147`.

9. Veneer `Swipe`
- `veneer/src/browser/Swipe.ts:28`. Listens to `pointerdown`, `pointerup`, and `pointercancel` only (`:70-72`). Touch and pen only (`:88`); mouse is ignored. No `pointermove`, no capture, no axis lock. On `pointerup` of the same `pointerId`, `|clientX - origin| > threshold` calls `handler` with `'right'` or `'left'` (`:95-101`). Default threshold 40 (`veneer/src/browser/constants.ts:374-376`). `pointercancel` drops the pointer with no call (`Swipe.ts:104-106`). A later `pointerdown` replaces the recorded pointer (`:87-90`). It adds the class `pointer-event` (`constants.ts:369-371`); `.carousel.pointer-event { touch-action: pan-y }` is `veneer/src/styles/components/_carousel.scss:15-16`. `Toast.ts` does not construct it. It does not write an offset, an opacity, or a swiping attribute, and it does not report per move, so the toast drag-and-snap path is not in this class. Proofs: `veneer/tests/src/browser/Swipe.test.ts:12`, `:19`, `:38`, `:54`, `:94`, `:124`, `:146`.

Distillate
Both compose `createPointer`: primary button, capture, `userSelect: none`, ignore a second pointer, reject interactive descendants, lock at 6px, follow horizontal `clientX` both ways, cap the visual at 80px, and fade opacity to 0.4. Elements writes custom properties the toast cascade reads, commits inside `move`, and flies off by `±innerWidth` under a transition. Mailbox writes inline `translate` and `opacity`, commits on `pointerup`/`pointercancel`, then clears those styles and uses the ordinary `hide()`. Neither uses velocity. Veneer `Swipe` reports only a completed touch or pen direction.

Unknowns
No listener for `lostpointercapture` in either `createPointer`. No Elements test drives the gesture. No Mailbox test covers `pointercancel`, a vertical lock, or a non-mouse `pointerType`. Whether Mailbox's inline `opacity` fights `.toast[popover]:popover-open { opacity: 1 }` (`_toast.scss:569-571`) during the drag is not asserted.

Journal
Read `createToast.ts`, `createPointer.ts`, toast styles, toast types, and the named tests in `elements/` and `mailbox/`, plus `veneer/src/browser/Swipe.ts`, `constants.ts`, `types.ts`, `Toast.ts`, `_carousel.scss`, and `Swipe.test.ts`. Edited nothing.

Deviation
None.
