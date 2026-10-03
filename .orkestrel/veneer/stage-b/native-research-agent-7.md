Question: Can the page veto Escape or Android Back on an auto or hint popover, a closedby dialog, or a modal dialog (WHATWG HTML §6.10.2 plus Chromium source)? Under exactly which user-activation and grouping conditions is the cancel step skipped or made non-cancelable?

## Facts

**Sources and dates.** I read the WHATWG living standard pages on 2026-10-03. The `interaction.html` page (§6.10) and the raw `source` file were cut off by the fetch tool before §6.10, so the §6.10.2 algorithm text below comes from merged PR diffs. Chromium code was read from googlesource `main` on 2026-10-03, not from the 153 branch.

### Spec: the close request path (§6.10.1, from PR #9462)

- **F1. A cancelled keydown stops the close request.**
  - Source: https://patch-diff.githubusercontent.com/raw/whatwg/html/pull/9462.diff, "close requests" steps.
  - Steps: "Fire any relevant events, per UI Events…" then "If event is not null, and its canceled flag is set, then return."
  - The diff names Esc and the Android back button or gesture as close requests.
- **F2. Esc does not grant user activation.**
  - Source: https://html.spec.whatwg.org/multipage/interaction.html#user-activation-processing-model (living standard).
  - keydown is an activation-triggering input event "provided the key is neither the Esc key nor a shortcut key reserved by the user agent."
- **F3. History-action activation does not expire.**
  - Source: same page, #user-activation-data-model.
  - A window "is said to have history-action activation" when the last history-action activation timestamp differs from the last activation timestamp.
  - It has no time-based expiry; consuming it sets the history timestamp equal to the activation timestamp.
- **F4. Each activation notification calls the close watcher manager.**
  - Source: same page, #user-activation-processing-model.
  - The activation notification steps include "Notify the close watcher manager about user activation given window."

### Spec: the close watcher manager (from PR #10168, "Re-do close watcher user activation tracking", domenic, merged 2024-03-14)

Source for F5 to F8: https://patch-diff.githubusercontent.com/raw/whatwg/html/pull/10168.diff

- **F5. Manager state.** "Groups, a list of lists… Allowed number of groups… initially 1. Next user interaction allows a new group… initially true."
- **F6. Notify on activation.** If "next user interaction allows a new group" is true, increment the allowed number of groups. Then set the flag to false.
  - A user interaction gives at most one new group, and only if the flag is set.
- **F7. Establish a close watcher.**
  - If groups' size is less than the allowed number, a new group is appended.
  - Otherwise the watcher is added to the last group.
  - Either way, the flag is then set back to true.
- **F8. Process close watchers.**
  - Takes the last group and requests close on each member "in reverse order".
  - Stops if a request returns false.
  - Then, if the allowed number of groups is greater than 1, decrements it by 1. This happens whether or not the close was vetoed.

### Spec: request to close (PR #10737, "Add dialog light dismiss behavior", mfreed7; merge date not fetched)

Source for F9 and F10: https://patch-diff.githubusercontent.com/raw/whatwg/html/pull/10737.diff

- **F9. New signature and enabled-state check.**
  - "Request to close" now takes a boolean `requireHistoryActionActivation`.
  - New step: "If the result of running closeWatcher's get enabled state is false, then return true."
- **F10. The canPreventClose condition.**
  - "Let canPreventClose be true if requireHistoryActionActivation is false, or if" groups' size is less than the allowed number of groups (and, per #10168, the window has history-action activation).
  - Per #10168, the request returns true early if the watcher is not active or its cancel action is already running.
  - A false result from the cancel action consumes history-action activation.

### Spec: dialog (§4.11.4 and §4.11.5)

- **F11. Dialog close watcher.**
  - Source: https://html.spec.whatwg.org/multipage/interactive-elements.html, "set the dialog close watcher" (#canceling-dialogs).
  - cancelAction is "firing an event named cancel at dialog, with the cancelable attribute initialized to canPreventClose".
  - getEnabledState is true if "enable close watcher for requestClose" is set or the computed closed-by state is not None.
- **F12. requestClose().**
  - Source: same page, #dom-dialog-requestClose.
  - Ends with "Request to close subject's close watcher with false". So `requestClose()` always fires a cancelable cancel event.
- **F13. closedby states.**
  - Source: same page.
  - The Auto state computes to Close Request when the dialog is modal and to None otherwise.
  - Light dismiss (closedby=any) also requests close "with false" (PR #10737 diff, "light dismiss open dialogs").

### Spec: popover (§6.12)

Source for F14 and F15: https://html.spec.whatwg.org/multipage/popover.html

- **F14. Popover close watcher.**
  - Show popover step 15 reads "If originalType is Auto or Hint:".
  - Step 15.10 establishes the close watcher with cancelAction "to return true", closeAction "hide a popover given element, true, true, false, and null", and getEnabledState "to return true".
  - Manual popovers get no close watcher.
- **F15. The closing beforetoggle has no cancelable value.**
  - Hide popover step 12.1 fires beforetoggle with oldState "open" and newState "closed".
  - No cancelable value is given. The opening beforetoggle is "cancelable attribute initialized to true".
- **F16. Unstated attributes default to not cancelable.**
  - Source: https://dom.spec.whatwg.org/#concept-event-fire
  - The EventInit default is cancelable `false`. So a closing beforetoggle cannot be cancelled.

### Chromium source: close_watcher.cc and close_watcher.h

Source for F17 to F22: https://chromium.googlesource.com/chromium/src/+/main/third_party/blink/renderer/core/html/closewatcher/close_watcher.cc (main)

- **F17. Cancelability rule.**
  - `RequestClose(AllowCancel)` creates a cancelable `cancel` when `allow_cancel == AllowCancel::kAlways || stack.CancelEventCanBeCancelable()`, and a plain one otherwise.
  - If the cancel event is defaultPrevented, it calls `ConsumeHistoryUserActivation()` and returns false.
  - Otherwise it calls `close()`.
- **F18. CancelEventCanBeCancelable** is:

  ```cpp
  return watcher_groups_.size() < allowed_groups_ &&
         window_->GetFrame()->IsHistoryUserActivationActive();
  ```

- **F19. Early returns.** RequestClose returns true with no event if the watcher is closed, `dispatching_cancel_` is set, there is no window, or `!enabled_`.
- **F20. Signal (a user close request).**
  - Iterates the last group in reverse.
  - Calls `RequestClose(AllowCancel::kWithUserActivation)` and breaks on false.
  - Then `if (allowed_groups_ > 1) --allowed_groups_`.
  - `requestCloseForBinding()` (the JS `CloseWatcher.requestClose()`) uses `kAlways`.
- **F21. SetHadUserInteraction.**
  - With true: increments `allowed_groups_` only if `next_user_interaction_creates_a_new_allowed_group_`.
  - With false: resets to 1.
  - Code comment: "(# of back presses to escape the page) <= (# of user interactions) + 2".
- **F22. EscapeKeyHandler.** It calls `Signal()` only if all of these hold:

  ```cpp
  AnyEnabledWatchers() && !event->DefaultHandled() &&
  event->isTrusted() && event->keyCode() == VKEY_ESCAPE
  ```

### Chromium source: keyboard, dialog and popover

- **F23. Where Escape is handled.**
  - Source: https://chromium.googlesource.com/chromium/src/+/main/third_party/blink/renderer/core/input/keyboard_event_manager.cc
  - `DefaultEscapeEventHandler` calls `closewatcher_stack()->EscapeKeyHandler(event)`.
  - It is reached from `DefaultKeyboardEventHandler` on keydown with key Escape, after DOM dispatch.
- **F24. Dialog forwards the cancel event.**
  - Source: https://chromium.googlesource.com/chromium/src/+/main/third_party/blink/renderer/core/html/html_dialog_element.cc
  - `CloseWatcherFiredCancel` dispatches `cancel` on the dialog, cancelable only if the watcher's event was.
  - If the page calls preventDefault on the dialog's cancel event, the watcher's event is preventDefaulted too.
- **F25. Dialog enabled state and requestClose.**
  - Source: same file.
  - `SetCloseWatcherEnabledState` sets enabled to `closed_by != kNone`.
  - `RequestCloseInternal` enables the watcher and calls `RequestClose(kAlways)`.
  - Light dismiss (closedby any) calls `requestClose()`, so it uses `kAlways`.
  - `ClosedBy()` falls back to `IsModal() ? kCloseRequest : kNone`.
- **F26. Popover ignores cancel.**
  - Source: https://chromium.googlesource.com/chromium/src/+/main/third_party/blink/renderer/core/html/html_element.cc
  - `PopoverCloseWatcherEventListener`: "Don't do anything in response to cancel events, as per the HTML spec". On `close` it calls `HidePopoverInternal(... kFireEventsAndWaitForTransitions ...)`.
  - The watcher is created right after `append_to_stack->push_back(this)`, inside the auto/hint focus-restore branch.

### Shipping

- **F27. CloseWatcher shipping.**
  - Source: https://developer.chrome.com/release-notes/126 and https://chromestatus.com/feature/4722261258928128
  - It "was originally shipped in Chrome 120, but was disabled due to an unexpected interaction with <dialog>"; it "has been reenabled in Chrome 126".
- **F28. Intent to Ship (Domenic Denicola, 2023-09-27).**
  - Source: https://groups.google.com/a/chromium.org/g/blink-dev/c/jM5au7yYzHM
  - "If no user activation occurs between opening, and the user issuing a close request… dialog's cancel event to be skipped".
- **F29. closedby and requestClose shipped in Chrome 134.**
  - Source: https://developer.chrome.com/blog/new-in-chrome-134 and https://developer.chrome.com/blog/chrome-134-beta (search-result summary; the page itself was not fetched).
- **F30. The abuse-prevention behaviour, from the explainer.**
  - Source: https://github.com/WICG/close-watcher/blob/main/README.md
  - Two close requests with no user activation in between: "the request definitely goes through".

### Bootstrap 5.3.8 (installed)

- **F31. Modal Escape handler.**
  - Source: `C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\js\src\modal.js:207-217`
  - On Escape keydown it calls `this.hide()` if `keyboard` is set, and otherwise runs the static-backdrop transition.
  - It does not call preventDefault on the keydown. `hide()` returns early if hide.bs.modal is defaultPrevented (`modal.js:128-130`).
- **F32. Offcanvas, dropdown and tooltip/popover.**
  - `offcanvas.js:196-206` follows the same keydown pattern and triggers `hidePrevented` when `keyboard` is false.
  - Cancelable hide checks are at `offcanvas.js:133-135`, `dropdown.js:189` and `tooltip.js:247-248`. Popover inherits from Tooltip.

## Matrix

Two things apply to every row:
- **(a) Escape keydown preventDefault.** If the page calls preventDefault on the Escape keydown, the close request ends before any close watcher runs (F1). On desktop this works regardless of activation. Chromium agrees by structure (F22, F23), but I did not see an explicit defaultPrevented check (U1).
- **(b) Android Back.** Back has no keydown to cancel, so only the cancel-event path below applies (U2).

| Row | Can the page veto? | Evidence for | Evidence against |
|---|---|---|---|
| auto or hint popover, Esc or Back | No; the cancel step is effectively absent | — | cancelAction returns true and no cancel event reaches the page (F14, F26). The closing beforetoggle is not cancelable (F15, F16). The close event hides with events and waits for transitions (F26). |
| auto or hint popover, light dismiss | No | — | The closing beforetoggle is not cancelable (F15, F16). |
| manual popover | Not a close watcher, so Esc and Back do nothing | F14 | — |
| modal dialog with no closedby (computes to closerequest), Esc or Back | Only if canPreventClose holds | Cancelable cancel event when the window's group count is below the allowed number **and** it has history-action activation (F10, F17, F18, F24) | Otherwise cancel fires non-cancelable and the dialog closes (F17, F28). A veto consumes history-action activation, so the next request without new activation cannot be vetoed (F10, F17, F30). Each close request lowers the allowed group count, down to a floor of 1 (F8, F20). |
| non-modal dialog with closedby=closerequest or any, Esc or Back | Same as the modal row | F11, F25 | Same as the modal row |
| dialog with closedby=none, or non-modal with no closedby | Esc and Back do nothing | Watcher disabled, request returns true with no event (F9, F19, F25) | — |
| dialog closedby=any, light dismiss click | Yes, always | Requested with false / `kAlways`, so canPreventClose is always true (F12, F13, F25) | — |
| `dialog.requestClose()` or `CloseWatcher.requestClose()` from script | Yes, always | `kAlways` (F12, F20, F25) | — |
| Watcher in a group that is not the top group | Not reached by this request | Only the last group is processed (F8, F20) | — |
| Several watchers grouped together, e.g. opened without new activation | Reverse order; a veto stops the remaining members | F8, F20 | The group count is then not below the allowed number, so canPreventClose is false for every member (F7, F18) |

The cancel step is skipped or made non-cancelable in these cases:
1. The watcher is inactive, disabled (`closedby=none`), already running its cancel action, or the document is not fully active (F9, F19, and #10168). The request returns true with no event.
2. A popover's cancelAction simply returns true (F14).
3. For a dialog on Esc or Back, the event is non-cancelable when either:
   - the window's group count is greater than or equal to the allowed number of groups. This happens when the dialog's watcher was created after the user interaction's single new-group slot was already used, or was created with no interaction at all (F6, F7); or
   - the window has no unconsumed history-action activation. Esc itself never grants it (F2), and a prior veto or other history-action consumer used it up (F3, F17).

## Unknowns

- **U1 (unverified):** Whether Blink's default keyboard handler is skipped when the Escape keydown is defaultPrevented. I did not see this in keyboard_event_manager.cc. EscapeKeyHandler checks `DefaultHandled()`, not `defaultPrevented()`.
- **U2 (unverified):** Whether Android Back dispatches any cancelable DOM event in Chromium before `Signal()` via the mojo pipe.
- **U3 (unverified):** The current living-standard text of §6.10.1 and §6.10.2. It was reconstructed from PR #9462, #10168 and #10737 diffs because the fetched spec page was truncated. Later edits are possible (for example, open issue https://github.com/whatwg/html/issues/11230 on requestClose and CloseWatcher interplay, opened 2025-04-16).
- **U4 (unverified):** `IsHistoryUserActivationActive`, `ConsumeHistoryUserActivation`, and the call site of `SetHadUserInteraction(true/false)` in Chromium. local_frame.cc was truncated and local_frame.h returned 503.
- **U5 (unverified):** That the Chromium 153.0.8010.12 branch matches googlesource `main` as read on 2026-10-03. Shipping milestones (126 for CloseWatcher, 134 for closedby and requestClose) imply 153 has them with no flag, but chromestatus pages were not fetched directly.
- **U6 (inferred):** That Chromium creates popover close watchers only for auto and hint. This rests on the surrounding stack and focus-restore code; I did not see an explicit type guard.
- **U7 (unverified):** The popover=hint shipping milestone.
- **U8 (unverified):** The contents of the Chrome 120 dialog regression (https://issues.chromium.org/issues/41484805 needs sign-in).
- **U9 (unverified):** The merge date of PR #10737.