# J-TOAST-SWIPE design, the objective lane (analyst on GPT-6 Astra)

Thread `01a0d6bf-8bf0-7153-bbdb-4f3e26c3929a`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-toast-swipe-design-analyst.jsonl` (launch copy under `tmp/codex/`); 21 commands; 279 s; usage {"input_tokens":1215472,"cached_input_tokens":1082112,"cache_write_input_tokens":0,"output_tokens":7469,"reasoning_output_tokens":1958}. Retained verbatim from the exec's last message.

---

Recommend a toast-specific pointer mechanism, enabled by default for touch and pen, with dismissal committed on release through ordinary `hide()`. Keep `Swipe` unchanged.

Read against Veneer `0865c67`, the reference implementations, and the specified decisions. This is a read-only proposal; no files changed or browser proofs executed.

**Mechanism**

- Accept a primary touch or pen contact with `button === 0`, only while the toast is shown, settled, and alive.
- Reject interactive targets before capture, default prevention, timer changes, or gesture writes. Inspect the composed path up to the toast so exposed shadow descendants receive the same protection.
- Ignore another pointer while a contact is active. It must neither replace the origin nor complete the gesture.
- Capture the accepted pointer. Record its original `clientX` and `clientY`; prevent the accepted down’s default action.
- Wait until either absolute displacement reaches **6 CSS px**. Lock horizontally when `|dx| >= |dy|`; otherwise cancel the gesture and release capture. Never change the chosen axis.
- Follow physical horizontal movement in either direction. Clamp displacement to **±80 CSS px**. Write opacity as `max(0.4, 1 − 0.6 × |dx| / 80)`. Use no velocity.
- Commit only on the owning pointer’s `pointerup`, after horizontal lock, when its final `|dx| >= 80`. Crossing the threshold and returning below it before release cancels dismissal.

This combines Elements’ variable-driven feedback with Mailbox’s release-time decision. The sources support those choices directly: [Elements’ gesture](C:/Users/mikes/WebstormProjects/elements/src/browser/factories/createToast.ts:323) and [Mailbox’s gesture](C:/Users/mikes/WebstormProjects/mailbox/src/browser/factories/createToast.ts:276).

Implement the pointer lifecycle as private `Toast` methods. Veneer’s [existing `Swipe`](C:/Users/mikes/WebstormProjects/veneer/src/browser/Swipe.ts:28) reports release directions, replaces the recorded pointer, and uses a strict threshold comparison. Adding capture, target rejection, axis locking, cancellation notifications, and per-move output would substantially change its carousel contract. A public general pointer abstraction is unnecessary for this consumer.

**Public contract changes**

Add these members to the existing interfaces in `src/browser/types.ts`:

```ts
// ToastOptions
readonly swipe?: boolean

// ToastClassMap
readonly pointer: string
readonly swiping: string

// ToastAttributeMap
readonly swipe: string

// ToastSelectorMap
readonly interactive: string
```

Exact defaults:

| Member | Default |
|---|---|
| `ToastOptions.swipe` | `true` |
| `classes.pointer` | `pointer-event` |
| `classes.swiping` | `swiping` |
| `attributes.swipe` | `data-vn-swipe` |
| `selectors.interactive` | Selector below |

```css
a, button, input, textarea, select, label, summary,
[role="button"], [tabindex], [draggable="true"],
[contenteditable]:not([contenteditable="false"]),
audio[controls], video[controls]
```

Also reject an `HTMLElement` whose `isContentEditable` reads true. Consumers extend `selectors.interactive` for custom controls.

Resolve `swipe` through the existing constructor-over-attribute-over-default mechanism using `parseBoolean`. Update the frozen vocabulary/default tables. `Toast` now retains and uses the interactive selector; its dismiss selector remains the delegate’s.

Keep the gesture measurements fixed in named constants. Add no threshold option, mouse option, public gesture member, or event. `ToastInterface`, `ToastEventMap`, `ToastHooks`, and the `Swipe` contracts gain no members. Existing toast events retain their names, null detail, and cancellation semantics.

Construction with swipe enabled now saves and adds the pointer token. Update the current “construction writes nothing” documentation explicitly.

**Engine writes and cascade contract**

| Target | Engine write |
|---|---|
| Toast class | `pointer-event` while swipe is enabled |
| Toast class | `swiping` during the accepted contact |
| Toast custom property | `--vn-toast-swipe-offset`, signed CSS-pixel displacement |
| Toast custom property | `--vn-toast-swipe-opacity`, unitless opacity multiplier |

Initialize gesture inputs to `0px` and `1`; update them after horizontal lock. Names live in `constants.ts`. Class names remain replaceable through the public vocabulary.

Use the engine’s lifetime snapshot for the pointer token. Use a separate gesture-lifetime `HostSnapshot` for the swiping token and custom properties. Restore original values, priorities, and attribute presence when the gesture ends. Unconditionally removing properties would destroy consumer values.

The styles session owns these rules:

- Scope gesture declarations to `.toast` carrying `pointer-event`.
- Declare `touch-action: pan-y pinch-zoom` before contact begins.
- Read the offset through `translate` and the opacity input through `opacity`.
- While `swiping`, disable interpolation and apply local `user-select: none`.
- On cancellation, transition back to the restored values using the existing motion tokens and reduced-motion mixin.
- Preserve `.toast.showing` opacity and `.toast:not(.show)` display precedence.
- Keep selectors at ordinary component specificity using `:where(...)`; prove that consumer classes and utility-layer rules can replace the rendered properties without `!important`.

Do not write inline `translate`, `opacity`, `transition`, `touch-action`, or body `user-select`. Local selection suppression is sufficient for the proposed touch/pen mechanism and avoids a shared body resource.

The current toast comment says no rule reads inline style. Custom properties written inline are still inline style. **The styles unit must explicitly amend that statement** to admit measured gesture inputs while retaining class control over visual declarations. Treat this as the narrow E31/E26 contract change, not as compliance with the unchanged sentence.

Browser panning permission comes from `touch-action`, not `preventDefault()`. Normal release can also generate `lostpointercapture`, so terminal handling must be idempotent. [W3C Pointer Events](https://www.w3.org/TR/pointerevents/)

**Commit and dismissal**

At qualifying release:

- Consume the gesture’s completion identity before releasing capture.
- Restore its transient class and property writes.
- Recheck lifetime and whether cleanup triggered an accepted engine change.
- If still entitled to proceed, call the ordinary `hide()` exactly once.

Use Mailbox’s ordinary-dismissal model: restored gesture displacement followed by the normal toast hide. Add no viewport-width fly-off, separate dismissal animation, or synthetic lifecycle event.

E24 governs that hide unchanged:

- Prevention refuses dismissal.
- A listener removing `show` toward the hide’s end is agreement.
- A nested accepted engine change supersedes the outer call.
- Reversal after the hide observes its end invokes its returning step.
- That step restores only targets the hide actually changed, to their values before its first changing write, in reverse first-write order.
- Destruction leaves restoration to the snapshots.

Gesture cleanup precedes the hide transaction, so its properties never become accidental entries in the hide’s return journal. A refused hide leaves no stranded swipe opacity or offset.

Keep the existing dismiss button, accessible name, and delegated click path. Keyboard and assistive activation reach the same `hide()` without gesture-specific ARIA or focus movement.

**Cancellation and edge cases**

| Input | Required result |
|---|---|
| `pointercancel` | Restore the gesture; never dismiss, regardless of distance. |
| Unexpected lost capture | Cancel only the matching active contact. |
| Lost capture after release | No-op because completion was already consumed. |
| Another pointer | Ignore its down, move, release, and cancellation; browser cancellation of the original still cancels. |
| Vertical lock | Restore and release immediately; later horizontal movement cannot revive that contact. |
| Destruction mid-drag | Invalidate the gesture, remove listeners, release held capture, restore snapshots, and start no timer. |
| Capture acquisition failure | Undo partial acquisition and gesture state; leave the toast usable. |
| Hide already in flight | Reject a new gesture; emit no additional hide event. |
| Accepted programmatic show/hide during a drag | End the gesture before that change writes; its later pointer release does nothing. |
| Host loses its shown state directly | Cancel at the next gesture door; do not recreate `show`. |
| Cleanup re-entry | A newer accepted change or destruction invalidates the old completion; old continuations cannot hide or rearm it. |

Treat an active gesture as another autohide hold. Every timer-arm path checks it, including mouseout/focusout paths caused by movement.

On cancellation, restart the **full existing delay**, only when autohide is enabled and the toast is live, shown, settled, unhovered, and unfocused. Hover or focus that already paused the timer remains authoritative. Veneer currently restarts the full delay; this proposal introduces no remaining-time contract.

On committed release, do not rearm between cleanup and `hide()`. After a refused hide, rearm only if the same completion still owns that decision and the eligibility checks pass. A newer change owns its own timer.

Follow E30’s host-member access limits. Add no prototype-call defence against clobbered form members.

**Tests**

Use the shipped toast, fade, and token cascade. Reuse installed `@orkestrel/test/browser` `sendProtocol`, frame waits, media controls, and keyboard helpers. Existing [Carousel trusted-touch tests](C:/Users/mikes/WebstormProjects/veneer/tests/src/browser/Carousel.test.ts:1371) establish the available CDP route and frame-coordinate conversion.

Required proofs include:

- Trusted `Input.dispatchTouchEvent` drags left and right, recording `isTrusted`, pointer type, capture, computed translation, opacity, and lifecycle events.
- Displacements below the lock, at the lock, below dismissal, at dismissal, and beyond it. Assert no dismissal before release.
- Crossing the threshold and returning below it; vertical-first movement followed by horizontal movement.
- `touchCancel` beyond the threshold; real capture release followed by browser-delivered lost capture; repeated terminal events.
- Another touch contact without replacing the original.
- Trusted mouse input selecting toast text, with no gesture writes or dismissal. Secondary-button input remains unaffected.
- Trusted pen input through `Input.dispatchMouseEvent` with `pointerType: "pen"`.
- Interactive-descendant taps, nested icons, editable content, customized selectors, and keyboard dismissal through the real delegate.
- Prevented hide, direct-token agreement, nested engine calls, takeover, destruction during writes, and preservation of pre-existing class/property values and priorities.
- Autohide held beyond its delay by the gesture, hover, or focus; eligible cancellation restarts the full delay without duplicate timers.
- Reduced motion, zero motion factor, ordinary motion, consumer class overrides, repeated gestures, and `swipe: false`.

Start with a trusted drag that fails on the baseline because no feedback or dismissal occurs. Add targeted wrong-behaviour mutations for cancellation, capture cleanup, agreement, restoration, and timer ownership. Existing baseline refusal behaviour is not a red-first proof of newly added handling.

Record the exact red and green commands and results. Run the focused `Toast.test.ts` browser project, the toast style proof, delegate integration, and unchanged Swipe/Carousel regressions. Run on Chromium 153 and the styles session’s Chromium 141 before acceptance. These are proposed proofs, not claimed receipts.

**Units, routing, and order**

- **Design ruling:** Record the selected mechanism, mouse exclusion, release-time commit, exact vocabulary, and inline-input exception. Route the cascade contract to the styles session.
- **Styles-session companion:** Own `_toast.scss`, its style proofs, and corresponding style documentation. Prove visual feedback, overrides, reduced motion, cancellation, and lifecycle precedence.
- **J-TOAST-SWIPE:** Route implementation to native `opus`, because acceptance requires trusted browser input. Run after J-SAMEWAY-ENGINES-A’s amended Toast contract and J-HOLDERS land. Own Toast implementation/contracts/constants, browser proofs, necessary delegate vocabulary coverage, and engine guide changes.
- **Coordinated landing:** Integrate the cascade before closing J-TOAST-SWIPE’s rendered proofs. Serialize shared guide/constants edits with active units. Close only after cross-host receipts, documentation parity, and the campaign’s applicable gates.

No standalone `Swipe` expansion or pointer-library unit is needed.

**Rejected alternatives**

- **Extend `Swipe`:** Expands and changes a distinct carousel contract unnecessarily.
- **Copy `createPointer`:** Imports reference implementation structure, Vue reactivity, body-style writes, and cancellation gaps that Veneer does not need.
- **Mouse dragging by default:** Takes ordinary desktop text selection away.
- **Commit during movement:** Removes the opportunity to reverse before release.
- **Treat cancellation as release:** Reproduces Mailbox’s threshold-dismissal bug on `pointercancel`.
- **Inline visual properties:** Defeats class-based appearance control.
- **Viewport fly-off before hide acceptance:** Adds rollback and transition ownership around a preventable ordinary hide.

**Risks**

Release-time dismissal deliberately differs from Elements’ immediate fly-off. Restoring displacement before ordinary hide can produce a visible return toward the origin; the rendered proof must assess that chosen Mailbox-style behaviour.

A toast-level `touch-action` restriction also affects gestures beginning on interactive descendants, even when JavaScript rejects them. Document `swipe: false` for rich toasts requiring native horizontal manipulation.

Custom-property inputs cannot themselves be overridden by ordinary class declarations while inline values are present. Consumer control must operate through rendered properties; prove that distinction.

Closed shadow roots conceal internal controls. Consumers must mark their custom control host through `selectors.interactive`.

PROPOSAL: Add touch-and-pen pointer tracking privately to Toast, commit on release through ordinary hide, and coordinate restorable gesture inputs with a class-overridable cascade and trusted cross-host proofs.
