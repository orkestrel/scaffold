# J-ORACLE-FIX-OFFCANVAS-DESIGN — the objective lane's proposal (2026-09-25)

`analyst` on GPT-6 Astra, read-only `codex exec`, thread `01a0d7b0-d367-79d1-b6ed-090d17841de7`, journal `tmp/codex/j-oracle-fix-offcanvas-design-analyst.jsonl` (swept at acceptance). The brief is `units/j-oracle-fix-offcanvas-design-brief.md`. The lane's final message follows verbatim.

## 1. The ruling

**Reject A, B, and C as complete solutions. Advance a modified target-based rule, B′, for measurement before implementation. Do not accept universal Bootstrap parity until its reachable counterexamples are resolved.**

B′ is:

> For a dismissible backdrop `mousedown`, cancel the default action only when that press’s accepted hide actually releases its isolation and the isolation’s recorded return target holds focus after the synchronous hide work returns. A refused hide, prevented hide, static backdrop, or unsuccessful focus return keeps the default action.

Do **not** require the target’s `:focus` value to change from false to true. An accepted hide can encounter an already-focused return target. Releasing isolation and finding focus correctly placed is different from observing a focus change.

The evidence at `43fa73d` establishes the relevant boundaries:

- [Offcanvas.ts:285](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/src/browser/Offcanvas.ts:285) binds the backdrop’s `mousedown`.
- [Offcanvas.ts:327](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/src/browser/Offcanvas.ts:327) constructs isolation **after the show’s animation wait**. An omitted trigger must be resolved there, not at Offcanvas construction or show entry.
- [Isolation.ts:78](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/src/browser/Isolation.ts:78) records the explicit trigger or the document’s active element; [Isolation.ts:125](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/src/browser/Isolation.ts:125) releases claims and calls that recorded element’s `focus()`.
- [Offcanvas.ts:351](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/src/browser/Offcanvas.ts:351) checks refusal, cancellation, and reentry before reaching isolation release.
- [Offcanvas.ts:580](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/src/browser/Offcanvas.ts:580) currently infers a focus move from surrounding state. It does not identify successful restoration.

B′ must receive the actual release occurrence and target from the release path. Merely finding the target focused after `hide()` would incorrectly cancel a slide-out press. Comparing an isolation field before and after is also insufficient evidence that release completed, and must not institutionalize the clearing-before-release pattern E35 supersedes.

**Why the supplied candidates do not close the seam:**

- **A:** retains the measured closed-root miss. That input uses documented `show(trigger)` and cannot be dismissed as inaccessible application internals.
- **B:** addresses a retained leaf trigger inside a closed root, subject to the native probe, but its false-to-true requirement misses an already-focused trigger. It also does not identify focus redirected elsewhere.
- **C:** fails the prevented and unfocusable guard rows; broadening it to every backdrop press also fails sliding and static. Their required result is body focus when the press returns.

B′ is a candidate predicate, not yet a sufficient implementation. In particular, `matches(':focus')` is not proof that the preceding `focus()` succeeded: HTML also makes a shadow host match when its shadow tree contains focus. [HTML’s focus-matching definition](https://html.spec.whatwg.org/multipage/semantics-other.html#selector-focus).

## 2. Its reading in every placement

These are **predictions for B′**, conditional on a successful native focus return and no consumer redirection. They are not newly executed results.

| Placement | B′ cancellation | Focus result |
|---|---|---|
| Light-tree panel and trigger | Cancel | Trigger |
| Light-tree panel; trigger inside a separate shadow host | Cancel | Actual trigger, although document focus reads its host |
| Panel and trigger in the same open shadow root | Cancel | Trigger |
| Panel and trigger in the same closed shadow root | Cancel, subject to direct-target probe | Trigger |
| Panel and trigger beneath nested open roots | Cancel | Trigger |
| Trigger and previously focused button in an open root carried by the panel | Cancel | Trigger until the panel becomes hidden; subsequently body |
| Trigger and previously focused button in a closed root carried by the panel | Cancel, subject to direct-target probe | Same visibility-bound result |
| Shadow-tree panel; light-tree trigger, with focus initially inside the panel’s root | Cancel | Trigger |
| Shadow-tree panel; focus initially on another light-tree element outside that root | Cancel | Trigger; the isolation-walk defect does not hide the retained target |
| Prevented hide, as currently tested | Keep default | Body |
| Unfocusable trigger, as currently tested by removing it | Keep default | Body |
| Press during slide-out | Keep default | Body when the press returns |
| Static backdrop | Keep default | Body |

The existing light-tree and same-root proofs begin at [Offcanvas.test.ts:605](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tests/src/browser/Offcanvas.test.ts:605). The carried-root proof explicitly limits retention to visibility at [Offcanvas.test.ts:725](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tests/src/browser/Offcanvas.test.ts:725). The guard assertions are at [Offcanvas.test.ts:807](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/tests/src/browser/Offcanvas.test.ts:807).

The [round-4 readings](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-oracle-fix-offcanvas-report-4.md:13) establish why a document event listener cannot replace target access: internal shadow-root moves recorded no document `focusin`.

## 3. The limits it states

**Omitted trigger.** Reachable through documented `show()`. Isolation currently records a retargeted shadow host, potentially unfocusable, instead of the original focused descendant. B′ must use that actual recorded target until the fallback changes; it must not silently substitute a different target in Offcanvas. **J-ISOLATION-SHADOW is a prerequisite for any claim that omitted-trigger restoration reaches the original shadow descendant.** A closed descendant whose reference was never supplied remains distinct from an explicitly supplied closed-root trigger.

**Consumer focus redirection.** Reachable through the documented hide hook and ordinary DOM focus listeners. A hide hook that briefly focuses another element may be followed by Isolation restoring the trigger. Conversely, a trigger’s focus listener can redirect restoration to another element.

The latter exposes a substantive problem: B′ may see the trigger unfocused, keep the default, and lose the redirected focus to body. Bootstrap’s later data-API restoration can invoke the same listener after the default and leave the alternate element focused. This is a source-derived counterexample requiring execution. It cannot be waived as hypothetical foreign behavior.

A prevented hide whose listener moves focus is likewise outside the existing prevented guard’s evidence. Neither “any focus event” nor “any state difference” establishes restoration.

**Already-focused and shadow-host targets.** Reachable through `show(trigger)` and the current shadow isolation gap. Test the leaf-target case separately from a host that matches `:focus` solely because a descendant is focused. B′ repairs B’s false-to-true restriction, but a bare post-hide `:focus` check may still over-cancel the host case.

**Trigger inside the disappearing panel.** Reachable and already tested. Cancellation cannot retain focus once the platform makes the target unfocusable. State this visibility limit, rather than promising settled trigger focus.

**Oracle coverage.** E28 expressly excludes shadow trees from its reader at [decisions.md:403](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:403). Census success does not prove these placements. They need dedicated comparisons.

These reachable unresolved cases are acceptance blockers, not documentation substitutes.

## 4. The unit

**First probe: “recorded return target across closed roots and native no-op focus.”**

Before editing production source, construct real Isolation instances and retain a button reference inside a closed shadow root. From outside the root:

- Read `target.matches(':focus')` before and immediately after `isolation.destroy()`.
- Independently read the retained closed root’s `activeElement`.
- Record document focus events without using their presence as the correctness oracle.
- Exercise a different focused button, an already-focused target, and removed, disabled, hidden, and inert targets.
- Exercise a shadow-host target with a focused descendant, with and without focus delegation.
- Exercise synchronous redirection from the target’s focus listener.

The critical positive reading is a closed-root leaf returning false → true while the independent root reading identifies that leaf. The critical negative reading distinguishes a native no-op from successful restoration even when a shadow host matches `:focus`.

Follow with trusted backdrop presses on the real Offcanvas and Bootstrap 5.3.8. Record focus at the synchronous boundary, press return, hidden event, and settle; record visibility when an internal trigger loses focus. Run motion and reduced-motion cases. A synthetic dispatched `mousedown` cannot prove the browser’s default focus action.

**Proposed ownership:**

- `src/browser/Offcanvas.ts`: cancellation rule and per-call release reporting, preserving E24’s identities and refusal paths.
- `src/browser/Isolation.ts` and its interface in `src/browser/types.ts`: expose the recorded return target through a readonly accessor, without duplicating fallback selection. Serialize this work with J-RELEASE-PRIMITIVES and J-ISOLATION-SHADOW.
- `tests/src/browser/Offcanvas.test.ts`, `tests/src/browser/Isolation.test.ts`, and relevant export-contract tests.
- `guides/veneer.md`: the measured rule, limits, and any explicitly ruled departure.

Changing Isolation’s boundary walk or fallback belongs to **J-ISOLATION-SHADOW**, not an incidental Offcanvas edit. J-OVERLAYS retains the E35 drain work.

**`readFocusedElement` stays exported, documented, and tested.** Its existing contract is an open-root traversal, not universal focus discovery. Removing its Offcanvas consumer does not invalidate that capability; AGENTS.md’s minimal-API rule distinguishes creation from later visibility. J-ISOLATION-SHADOW may reuse it within its actual limits.

Proofs must distinguish:

- Never cancel.
- Always cancel.
- Cancel whenever isolation releases.
- Cancel whenever the target is focused, without requiring this press’s release.
- Require false → true.
- Substitute document focus or document `focusin`.
- Resolve fallback before Isolation construction.
- Reuse a stale target after another accepted show.

Retain the existing guard and placement proofs, add the reachable cases above, and rerun the census without refreshing Bootstrap observations. **Do not land B′ if its target test cannot distinguish unsuccessful restoration or if the redirection comparison fails.** That result requires a restoration-timing design, not another observation scope.

## 5. What you could not settle

This is a **source review and design proposal**, supported by the retained measurements. I ran read-only inspections, verified HEAD and the relevant files against `43fa73d`, and verified installed Bootstrap 5.3.8. I wrote no files, spawned nothing, and executed no new browser probe.

The following disagreements constrain the proposal:

- The round-3 ruling’s statement that the misses escape “any comparison of focus state” exceeds its evidence. It tested particular readers, not every operation available through a retained element reference. Its universal document-`focusin` claim is directly contradicted by round 4.
- “Bootstrap returns focus” needs the data-API qualification. Installed [offcanvas.js:128](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/node_modules/bootstrap/js/src/offcanvas.js:128) does not restore the trigger; the data-API listener at [offcanvas.js:243](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/node_modules/bootstrap/js/src/offcanvas.js:243) does, subject to visibility.
- Veneer’s Delegate also installs a hidden-event focus return at [Delegate.ts:958](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/oracle-fix-offcanvas/src/browser/Delegate.ts:958). Direct construction and delegated operation therefore require separate evidence.
- The carried-root regression establishes Veneer’s visibility-bound behavior. It does not independently establish Bootstrap equivalence in that placement.

The closed-root `:focus` reading, shadow-host no-op distinction, and consumer-redirection comparison remain unmeasured here. **The evidence supports advancing target-based restoration; it does not yet support declaring the brief’s universal end-state objective satisfied.**