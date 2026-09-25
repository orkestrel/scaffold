# J-TOAST-SWIPE design — the subjective lane (planner on Opus 5.5)

Retained verbatim from the lane's final message in its completion notification on 2026-09-25, because its transcript file was empty. The brief is `units/j-toast-swipe-design-brief.md`; the terrain is `units/j-toast-swipe-terrain.md`.

---

**Lane held: subjective.** I covered shape, naming, ergonomics, and design fit, and I am the `planner` on Opus 5.5, read-only.

**What I read:**
- `AGENTS.md`.
- The rules `names.md`, `architecture.md`, `patterns.md`, `browser.md`, and `tests.md`.
- The decisions E11 to E31.
- The terrain distillate.
- Elements: `createPointer.ts`, the swipe block of `createToast.ts`, and the swipe rules of `composables/_toast.scss`.
- Mailbox: `createPointer.ts` and the swipe block of `createToast.ts`.
- Veneer: `Swipe.ts`, `Toast.ts`, the `Swipe` construction in `Carousel.ts`, the Swipe and Toast contracts in `types.ts`, the `SWIPE_*` and `TOAST_*` tables in `constants.ts`, `_toast.scss`, the `transition` mixin, and the guide's `#### Toast`.

I read Veneer from the user's checkout at `C:/Users/mikes/WebstormProjects/veneer` and did not confirm it sits at `0865c67`. The design targets the Toast contract, not its line numbers. No dispatch defect.

**Decision.** `Swipe` grows into the one horizontal-swipe mechanism: one pointer, an axis lock, capture, and a report per move. `Toast` writes a state token and a pair of custom properties, and the styles session's cascade renders them. Dismissal is the ordinary `hide()`. Swipes read touch and pen only.

**Answers to the brief's unknowns:**
- **`Swipe` grows rather than a second mechanism.** In both references, one pointer primitive (`createPointer`) serves every drag consumer, and the toast keeps its own rules (cap, fade, commit). Veneer's equivalent primitive is `Swipe`, and the toast gesture is a swipe. A second class for the same concept would give one concept two terms.
- **Touch and pen only.** On a desktop toast, a mouse drag selects text, which is a real task (copying an error code). Both references break that. A Bootstrap toast already has a dismiss button for the mouse. `Swipe` and Bootstrap's carousel already ignore the mouse, so both consumers share one pointer rule.

## 1. The mechanism, stated as rules

**`Swipe`**
- **Input.** It reads a touch or pen pointer pressed with the primary button (`button === 0`). It never reads a mouse.
- **One pointer.** It tracks one pointer at a time. A pointer that goes down while another is tracked is ignored. This replaces "a pointer going down replaces the one recorded before it".
- **Controls.** A press starts nothing when its target sits in an element the `control` selector matches, between the target and the host (the host excluded). With `control` absent, any press can start a swipe, so the carousel is unchanged.
- **Axis lock.** The axis is set by the first displacement of at least `SWIPE_LOCK` (6 px) on either axis, the release included. If `|dy| > |dx|`, the pointer is dropped without a report. A tie locks horizontal, as both references do.
- **Capture.** At a horizontal lock it calls `host.setPointerCapture(pointerId)`. It holds capture from the host's `gotpointercapture` for that pointer.
- **Move report.** After the lock, each `pointermove` of the tracked pointer calls `drag(clientX - origin)`: signed, not capped.
- **Terminal report.** A pointer that reported an offset gets exactly one terminal report:
  - At `pointerup`, a distance past `threshold` calls `handler(direction)`. Otherwise it calls `drag(undefined)`.
  - `pointercancel`, or a `lostpointercapture` while capture is held, calls `drag(undefined)` and never `handler`.
- **Document listeners.** From press to end, the swipe listens for `pointerup`, `pointercancel`, and `lostpointercapture` on the host's owner document, in the capture phase. A host that is removed or moved mid-drag therefore cannot leave a pointer tracked forever.
- **Lifetime.** After each callback it reads its own lifetime, and a destroyed swipe reads, writes, and reports nothing more.
- **Destroy.** `destroy()` aborts every listener, releases capture it holds, restores the `pointer` token, and reports nothing.

**`Toast`**
- **Touch.** When `touch` is `true` (the default), construction builds a `Swipe` and passes it:
  - the toast's `pointer` token and `control` selector;
  - `threshold: TOAST_THRESHOLD`;
  - `drag: #follow`;
  - `handler: #swiped`.
- **Follow.** The toast follows a report when the host carries the `swipe` token, or carries `shown` without `transition`. It ignores any other report. This rule is derived from the tokens, not stored.
- **Start.** At the first followed report (token absent), a second `HostSnapshot`, the gesture snapshot, saves the `swipe` token and the `offset` and `progress` properties. The toast then adds the token.
- **Each followed report:**
  - clears the pending timer;
  - writes `offset` as `clamp(offset, -TOAST_THRESHOLD, TOAST_THRESHOLD)` px;
  - writes `progress` as `min(|offset| / TOAST_THRESHOLD, 1)`;
  - reads its lifetime after each write.
- **Timer.** `#arm` refuses while the host carries the `swipe` token.
- **Snap back.** `drag(undefined)` while following restores the gesture snapshot, which returns the token and both properties to their values before the drag (E24's prior-value rule, by construction). The toast then arms the timer unless `:hover` or `:focus-within` holds it.
- **Commit.** `handler(direction)` while following dismisses the toast (part 4). When not following, it is ignored.
- **Surface.** The swipe adds no event, member, or method.

## 2. Public contract changes

The changes to `src/browser/types.ts`:

```ts
export interface SwipeOptions {
	readonly handler: (direction: SwipeDirection) => void
	/** Receives the swiping pointer's signed horizontal distance from where it went down after each move once its travel locks horizontal, and undefined when that pointer ends without a swipe. */
	readonly drag?: (offset: number | undefined) => void
	/** Selects the controls inside the host a press on which starts no swipe; absent, every press can start one. */
	readonly control?: string
	readonly threshold?: number
	readonly classes?: Partial<SwipeClassMap>
}
export interface ToastClassMap { /* existing keys, plus */
	/** Marks a toast whose swipes are read from pointer events, written when `touch` is `true`. Default: `pointer-event`. */
	readonly pointer: string
	/** Marks a toast while it follows a swiping pointer. Default: `swiping`. */
	readonly swipe: string
}
export interface ToastAttributeMap { /* plus */ readonly touch: string } // Default: `data-bs-touch`
export interface ToastSelectorMap { /* plus */
	/** Selects the controls a press on which starts no swipe. Default: `a, button, input, select, textarea, [role="button"]`. */
	readonly control: string
}
export interface ToastOptions { /* plus */
	/** If `true`, a touch or pen swipe past the threshold dismisses the toast through `hide`; if `false`, the toast reads no swipe. Default: `true`. */
	readonly touch?: boolean
}
/** Names the custom properties a toast writes while it follows a swipe. */
export interface ToastPropertyMap { readonly offset: string; readonly progress: string }
```

**Constants** in `constants.ts`, each frozen where it is a table:
- `SWIPE_LOCK = 6`;
- `TOAST_THRESHOLD = 80`, the Elements and Mailbox bound;
- `TOAST_PROPERTIES = { offset: '--vn-swipe-offset', progress: '--vn-swipe-progress' }`;
- the added keys on `TOAST_CLASSES`, `TOAST_ATTRIBUTES`, and `TOAST_SELECTORS`;
- `touch: true` in `TOAST_DEFAULTS`.

**Toast construction:**
- `resolveOptions` gains `touch: parseBoolean`.
- The toast keeps its resolved `selectors`. The comment saying the group is not kept goes.

**Not changed:** `ToastInterface`, `ToastEventMap`, `SwipeInterface` members, and `CarouselOptions`.

**Guide:** these sections change:
- `SwipeInterface` and its remarks;
- the `ToastInterface` remarks;
- `#### Toast`, including its class, attribute, and selector tables and a swipe paragraph;
- the `#### Carousel` second-pointer sentence.

## 3. The engine's writes and the cascade contract

**Engine writes on the toast host:**
- the `pointer-event` class at construction, through `Swipe`, when `touch` is `true`;
- the `swiping` class while following;
- `--vn-swipe-offset` (a signed length, capped at the threshold) and `--vn-swipe-progress` (0 to 1).

Nothing else is written: no inline `translate`, `opacity`, `user-select`, or `touch-action`, and no body style.

**Cascade contract.** Per E26, `_toast.scss` belongs to the styles session:
- **Touch action.** `.toast.pointer-event { touch-action: pan-y }`, Bootstrap's carousel idiom applied to the toast. Vertical page scroll passes through, and horizontal travel belongs to the swipe.
- **Offset.** `.toast { translate: var(--vn-swipe-offset, none) }`. When the property is unset the value must be `none`, not `0`: any other value creates a stacking context and a containing block for fixed descendants.
- **While following, with no change in flight:** `.toast.swiping:not(.showing)` sets no transition, so translate follows the finger 1:1. Its opacity tapers with `progress`, and the 0.4 floor is the styles session's choice.
- **Snap back.** Without `swiping`, `translate` transitions under the motion tokens through the `transition` mixin, so reduced motion removes it. The fade's opacity transition keeps its duration.
- **Precedence.** `.toast.showing` and `.toast:not(.show)` beat every swipe declaration. A show or hide started mid-drag therefore fades normally.
- **Optional.** A fly-off under `.toast.showing`, read from the offset's sign, is the styles session's call.
- **Header comment.** Amend "no rule here reads an inline style" to name the offset and progress variables as the engine's only inline writes. The rendered `translate` and `opacity` stay in the `components` layer, so a consumer class still overrides them. This is why variables beat Mailbox's inline styles.

## 4. Commit and dismissal

The commit follows a release past the threshold (Swipe's strict `>`). It never follows a move or a cancel. Steps in order:
1. Remove the `swipe` token. The transition returns, while the offset and progress stay put.
2. `await this.hide()`. This is an ordinary hide (E24): `hide.vn.toast` can be prevented, and the doors, agreement, prior-value return, and `hidden.vn.toast` all apply. The fade runs from where the finger lifted, and `settleAnimations` waits for any fly-off the cascade adds.
3. If the toast is still live, restore the gesture snapshot. If it is shown and settled (a prevented or refused hide), arm the timer unless it is held. A show that takes the change over arms itself at completion.

The engine does not fly the toast off by `±innerWidth`. That motion is visual policy, and the cascade has the offset's sign.

**Keyboard and assistive technology.** They use the same dismissal through the dismiss button's delegate route and `hide()`. The swipe is an extra pointer path. The guide tells consumers that a swipeable toast still carries a dismiss control, as the single-pointer alternative to a path gesture.

**Reduced motion.** It needs no engine branch. Following the finger is direct manipulation. The cascade's `transition` mixin removes the snap-back and the fade.

## 5. Cancellation and edge cases

| Case | Behaviour |
| --- | --- |
| `pointercancel` | Calls `drag(undefined)` and the toast snaps back. It never commits, even past the threshold. Mailbox dismisses on a cancel, and that is a defect Veneer does not copy. |
| Lost capture | A `lostpointercapture` while the swipe holds capture (a consumer's `releasePointerCapture`, or a disconnected host, where the event fires at the document) calls `drag(undefined)`. The descendant's implicit-capture loss at the lock comes before the host's `gotpointercapture`, so it is ignored. |
| Second pointer | Ignored until the tracked pointer ends. |
| Destruction mid-drag | `Toast.destroy()` releases the claim, then restores the gesture snapshot, then the toast snapshot, then calls `swipe.destroy()` (Carousel's order). No report and no hide follow. Swipe releases the capture it holds. |
| Hide already in flight | A report finds `transition`, so the toast does not follow and writes nothing. |
| Change started mid-drag | A programmatic `hide()` or `show()` still fades, because the cascade scopes the swipe rules to `:not(.showing)`. At the lift, the snapshot restore clears the properties. A commit whose hide is refused restores the snapshot the same way. |
| Paused autohide timer | Cleared at every followed report. `#arm` refuses while the host carries `swiping`. Snap back or a prevented commit arms it again unless hover or focus holds it. |
| Press on a control | Starts nothing, so the close button's tap and form controls keep their own behaviour. |
| Mouse | Never read. Text selection is untouched. |
| Consumer's inline property | Restored to its value from before the drag. |

## 6. The tests

**Helpers.** `tests/setupBrowser.ts` gains `driveTouch(steps)`, which sends `Input.dispatchTouchEvent` through `cdp()` from `vitest/browser`, and `driveMouse(steps, pointerType)`, which sends `Input.dispatchMouseEvent` with `pointerType` `mouse` or `pen`. Each helper maps an element's rect to top-page coordinates. Synthetic `createPointerEvent` stays only for cases with no moves, because `setPointerCapture` throws for a synthetic pointer.

**Red-first rule.** Every case reads red on the base that J-SAMEWAY-ENGINES-A lands. The exceptions are the carousel and `Swipe` regression cases, which stay green. Each claim names the mutation that must redden it.

**`Swipe.test.ts`, all trusted:**
- The per-move offsets after the lock, then `handler('left')` and no `drag(undefined)`. Mutation: report before the lock.
- A release under the threshold reports `drag(undefined)` once and no `handler`.
- A vertical-first drag reports nothing, even if its travel later turns horizontal. Mutation: remove the lock.
- `touchCancel` past the threshold reports `drag(undefined)` and no `handler`. Mutation: treat a cancel as a release.
- `host.releasePointerCapture` mid-drag, and host removal mid-drag, each end the swipe. Mutation: drop the `lostpointercapture` listener, or listen on the host only.
- A second touch point is ignored. This rewrites the case "pairs a release with the pointer that went down last", which is red on the base.
- A press inside a matched control reports nothing.
- A mouse drag reports nothing, and a pen drag reports.
- `destroy()` inside `drag` reports nothing further and leaves `hasPointerCapture` false.
- A synthetic down and up with no moves still reports a direction (green regression).

**`Toast.test.ts`.** Until the styles rule ships, these use a test-local `.toast.pointer-event { touch-action: pan-y }` rule.
- `pointer-event` is present by default. `touch: false` and `data-bs-touch="false"` each leave no token, and a drag then does nothing.
- A 30 px drag gives `swiping`, `--vn-swipe-offset: 30px`, and `progress` 0.375. The timer is held past its 50 ms delay. After release, all three are gone and the toast hides after the delay.
- A 150 px drag gives `80px` and progress `1`. The release dispatches `hide.vn.toast`. During the fade, `offset` still reads `80px` with no token. After `hidden.vn.toast`, both properties are gone. Mutations: remove the cap; restore before `hide`.
- A prevented `hide.vn.toast` leaves the toast shown, clears both properties, and arms the timer again.
- A `hide` listener calling `show()` takes the change over as E24 states.
- `touchCancel` past the threshold snaps back with no hide event.
- `destroy()` mid-drag restores the token and properties and releases capture. Later moves write nothing.
- A drag during a hide's fade writes nothing. A `hide()` mid-drag completes, and the lift leaves no properties.
- Pressing `.btn-close` starts no swipe, and its tap still dismisses.
- `show()` mid-drag arms no timer. Mutation: remove the token guard from `#arm`.
- Focus inside the toast at snap back arms no timer.
- A trusted mouse drag leaves no token and a non-empty `getSelection()`.
- A consumer's inline `--vn-swipe-offset: 5px` reads `5px` again after the drag.

## 7. The units, with routing and order

| Unit | Role and engine | Order |
| --- | --- | --- |
| **J-TOAST-SWIPE** | `opus` on Opus 5.5, native, because its proofs launch Chromium and a bench cannot host them (Bench law 5). Worktree `veneer/tmp/worktrees/j-toast-swipe`. | After J-SAMEWAY-ENGINES-A lands, and serialized with J-SAMEWAY-ENGINES-B round 3 on `tests/setupBrowser.ts`. |
| Audit of J-TOAST-SWIPE | `analyst` on GPT-6 Astra (objective, not the writer's engine) and `reviewer` on Opus 5.5 (subjective). `checker` on Grok for the parity rows. | After the unit returns. |
| Styles-session request | Sent by the Orchestrator under E26 and recorded under `plan.md` § Pending shared changes. | Beside J-TOAST-SWIPE. |
| **J-TOAST-SWIPE-CASCADE** | `opus` on Opus 5.5, native. | After J-TOAST-SWIPE and the styles rule land. |
| Departure row | J-ORACLE-GATE. | At that unit's gate. |
| Landing gates | `verifier` on Sonnet. | At each landing. |

**J-TOAST-SWIPE** owns:
- `Swipe.ts` and `Toast.ts`;
- the `Swipe*` and `Toast*` contracts and constants;
- `Swipe.test.ts`, `Toast.test.ts`, and the `Carousel.test.ts` second-pointer case;
- the guide sections listed in part 2 and their parity rows;
- the `tests/setupBrowser.ts` helper hunk, whose landing names the merge with J-SAMEWAY-ENGINES-B.

It starts by taking the readings R1 to R5 (part 9) on Chromium 153. It stops if a reading contradicts a rule.

**The styles-session request** covers the part 3 rules, the comment amendment, and a request to run the same reading file on Chromium 141.

**J-TOAST-SWIPE-CASCADE** runs trusted drags against the shipped cascade:
- the computed `translate` follows the offset, and the opacity tapers;
- no `pointercancel` under `pan-y`, with removing the rule as the control;
- the snap-back transition runs;
- emulated reduced motion removes it;
- the commit fade starts from the offset.

**The departure row** J-ORACLE-GATE writes: under E31, a toast carries `pointer-event`.

**Exit criterion.** A touch or pen swipe past 80 px dismisses a toast through the ordinary `hide()`, following the rules in part 1. The cascade renders the swipe on both hosts. Every case in part 6 is green after reading red first.

## 8. Rejected alternatives

- **Mailbox's inline `translate` and `opacity`.** An inline declaration beats every consumer class ("Preserve direct control through classes") and contradicts the toast cascade's stated rule. Variables keep the rendered declaration in the layered cascade.
- **Elements' commit inside `move`, with a fly-off by `±innerWidth`.** It commits before the finger lifts, so the user cannot back out. Elements' own 0.4 opacity floor exists so the user can hesitate. The fly-off is visual policy that belongs to the cascade.
- **A second pointer primitive, such as a port of `createPointer` with `start`/`move`/`end` and `accept`.** It gives the swipe concept a second term and adds a general drag API with no second consumer.
- **Mouse drags, as both references allow.** They break text selection on desktop, and the dismiss button already serves the mouse.
- **Typed `attr()` reading a data attribute.** It avoids inline style entirely, but it departs from both references, mutates an attribute on every frame (which fires attribute reactions and observers), and would need readings on both hosts.

## 9. Risks

**Tensions my lane chose on judgment:**
- **`touch` defaults to `true`.** Both references and the carousel's `touch` default to on. The cost: every constructed toast carries `pointer-event`, so construction no longer "writes nothing", and J-ORACLE sees a departure. The alternative is a default of `false`.
- **Touch and pen only.** Both references also read the mouse.
- **The custom property names are constants, not an overridable `properties` group.** E9 names classes, data attributes, and selectors, not custom properties.
- **`data-bs-touch` on a toast extends Bootstrap's data API.** Bootstrap's toast ignores the attribute.
- **Growing `Swipe` changes the carousel.** It ignores a second pointer, reads the primary button only, takes capture at the lock, and applies the lock rule. The `Carousel.test.ts` second-pointer case and its guide sentence change.
- **The timer can fire under a finger resting before the lock.** Bootstrap behaves the same way. Holding the timer on press would change the hover listeners that J-SAMEWAY-ENGINES-A owns.

**Readings the design needs.** The dispatch supplied none beyond the terrain distillate.
- **R1:** a CDP touch point through `cdp()` inside the Vitest iframe hits the intended element (it agrees with `elementFromPoint`) and dispatches `pointerType: 'touch'`.
- **R2:** the order of the descendant's `lostpointercapture` and the host's `gotpointercapture` at the lock.
- **R3:** whether a horizontal touch drag under `touch-action: auto` cancels the pointer.
- **R4:** whether a pen drag through CDP selects text. If it does, the cascade's `user-select: none` on `.toast.swiping` may start too late, and the Orchestrator rules on it.
- **R5:** where `lostpointercapture` fires when the host is removed mid-drag.
- **Chromium 141:** the styles session's run of the same readings (E21 availability).

**Other risks:**
- A consumer that sends synthetic pointer moves past the lock makes `setPointerCapture` throw `NotFoundError`. The guide needs to state this limit.
- The unit rebases `Toast.ts` onto J-SAMEWAY-ENGINES-A's landing.
- The `setupBrowser.ts` hunk collides with J-SAMEWAY-ENGINES-B.

PROPOSAL: Grow `Swipe` into the one touch-and-pen horizontal-swipe mechanism, with one tracked pointer, a 6 px axis lock, capture, a per-move `drag` report, and cancel on `pointercancel` or lost capture; have `Toast`, behind a `touch` option that defaults to `true`, write only a `swiping` token and the `--vn-swipe-offset` and `--vn-swipe-progress` variables through a gesture snapshot and dismiss through the ordinary `hide()` on a release past 80 px, with the styles session owning every rendered declaration, delivered as J-TOAST-SWIPE and then J-TOAST-SWIPE-CASCADE, both `opus` on Opus 5.5.
