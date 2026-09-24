# J-TOOLTIP-DOORS — the objective lane's ruling (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d3c8-b07f-7bd1-83b0-1b082699d234`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-tooltip-doors.jsonl` (launch copy under `tmp/codex/`); 24 commands; 529 s; usage {"input_tokens":1419732,"cached_input_tokens":1283328,"cache_write_input_tokens":0,"output_tokens":15184,"reasoning_output_tokens":7337}. Retained verbatim from the exec's last message.

---

1. **Ruling on each option**

   **A — Rejected as the strategy.** Derived: the proposed reads close the reported final-release, teardown, and promotion intervals, but do not establish completeness inside `#filled`, grouped token writes, `#release`, or `Placement` construction (`Tooltip.#filled` ≈410, `#build` ≈430, `#release` ≈498; `Placement.constructor` ≈109–161). Completeness requires every reaction-capable effect to pass through a checked boundary, including effects inside called code. Establishing that property adopts B. A costs fewer immediate edits but retains the audit-by-enumeration problem. The callback-chain and Placement continuation cases below distinguish the remaining gaps.

   **B — Accepted, with explicit cleanup and completion boundaries.** Use `#apply`, matching `Modal.#apply` ≈386 and `Offcanvas.#apply` ≈354, with preconditions and postconditions appropriate to the individual effect. Route synchronous effects through it; check asynchronous continuations without making synchronous writes asynchronous. Derived: an exclusive effect boundary permits an induction over the sequence, whereas wrapping an unchecked composite does not. This increases signatures and call-site lines, removes scattered predicates and `#holding`, and replaces the guide’s enumeration with an invariant. It leaves native processing already underway, consumer callback internals, and E13 restoration completion outside its stopping power.

   **C — Accepted only as a boundary description; rejected as an exclusion for relocation.** A listener can attach to the real tip through `inserted` and relocate it during the real platform promotion or teardown (`Tooltip.show` ≈326; `Placement.constructor` ≈114; `Placement.destroy` ≈226). Derived: this requires no foreign Placement implementation and is reachable through shipped code and a documented event, so it must be repaired. Documentation must instead distinguish stopping subsequent engine work from interrupting an executing platform call, and state the cleanup, completed-event, and E13 bounds. Arbitrary work performed inside a foreign sanitizer remains that implementation’s responsibility; Tooltip must still check immediately upon its return.

   **D — Rejected as the solution; retain detached construction.** `buildTip` already constructs detached markup (`helpers.buildTip` ≈424). Derived: detachment prevents connection reactions during detached insertion, but moving connected content still enqueues disconnection reactions, detached custom elements can react to attribute writes, final returns can reconnect content, and promotion dispatches `beforetoggle`. Moving content functions ahead of all writes also changes their observation order and the documented presence/build evaluations. D adds staging and changes semantics while leaving the decisive doors open. The disconnection, final-release, and promotion cases settle those limits.

2. **The ruling**

   **Invariant:** At every engine-controlled boundary, a change may perform its next forward effect, publish its candidate tip, or begin its completed-event dispatch only while its lifetime, change identity, expected tip identity, expected parent, and expected `shown` state still hold.

   **Constraint:** Tooltip will not reverse a consumer’s relocation or token takeover, interrupt an executing DOM operation or callback, or add coordination for nested snapshot restoration; stopping forward work still permits ownership-checked content return and resource restoration.

   **Interface:** Add to `TooltipInterface.show`, `hide`, and `fill` (`types.ts` ≈1630–1699):

   > “Before completion, a detected destruction, replacement change, token takeover, or tip relocation stops the call with `false`; a relocated tip is left in its current parent, while recorded content and placement resources remain subject to their cleanup contracts.”

   Add to `TooltipEventMap.shown` and `hidden` (≈1508–1513):

   > “The change is released before this event is dispatched, so a listener may start another change; that change does not invalidate the completion already announced.”

   Correct `TooltipEventMap.hide` (≈1510):

   > “Prevention refuses an ordinary hide; after a prevented platform hide has re-promoted this tip once, its next platform close conceals it despite prevention.”

   These are proposed contracts. All behavioral conclusions in this ruling are **derived**, not executed; the settling cases are specified below.

3. **The mechanism**

   - **Add `Tooltip.#apply`.** It reads `#holds` before invoking one synchronous effect and again after it. Supply distinct expected facts when the effect deliberately changes parent, publication, or token state. Return a boolean separately from any callback result: empty content is not a failed step. A failed step invalidates only its own still-current change; it never clears a successor’s identity. Callbacks contain one platform effect, one consumer invocation, or composition whose internal effects are themselves guarded.
   - **Strengthen `#holds`; remove `#holding`.** Compare exact expected `#tip`, including expected absence: `undefined` must cease being a wildcard. Track an unpublished candidate separately from published ownership. Compare its expected parent and token directly, rather than deriving the expected value from the post-effect DOM. Expected facts are local transition inputs, not another stored lifecycle.
   - **Add `#wait` and `#complete`.** `#wait` checks before starting and after awaiting the existing animation settlement. `#complete` checks the final door, releases the change, dispatches the completed event, and reads lifetime afterward. It does not demand the released identity afterward. Any automatic show following `hidden` starts as a fresh request with fresh eligibility checks.
   - **Keep `show`, `#filled`, `#build`, `#occupy`, `#release`, `#discard`, and `#conceal`; change their composition.** Acquire show identity before invoking presence callbacks. Guard each callback separately. Keep origin publication before movement. Make release report whether forward continuation survived, including its final return. Cleanup captures the records it owns, checks each record and current slot before moving, and never consumes records a reentrant successor added. Build failure returns `undefined`; public failure resolves `false`.
   - **Guard `fill` without silently changing its merge contract.** Capture the surrounding change, tip state, and newly assigned `#content` reference around release. Reentrant replacement of that content invalidates this fill’s continuation. Start any rebuild only after those checks; retain the existing refusal when another change prevents that rebuild (`fill` ≈366).
   - **Split the composite template boundary.** Extract the existing first-element validation into exported `readTip` in `helpers.ts`, used by `buildTip` and Tooltip. Tooltip guards sanitizer invocation and root detachment separately. This avoids copying validation or treating `buildTip`’s write-plus-removal as an indivisible effect (`helpers.buildTip` ≈424–434).
   - **Add constructor-scoped `PlacementOptions.guard` and `Placement.#apply`.** Tooltip supplies its construction door. Placement combines it with its own lifetime before and after every construction write, including promotion, compensation, side, and arrow writes. Thread it through `#write` and the shared positioning body; do not retain the construction identity for later updates. Failure stops construction’s forward work and restores acquired resources. Omission preserves Dropdown’s current behavior.
   - **Repair discard ownership.** Retain the captured tip, container, and reachable placement through teardown so nested destruction can finish the existing teardown. After it returns, reread ownership before removal; after removal, expect a detached tip before unlinking. Clear fields only when they still name the captured resources. Restoration does not authorize removal from a different parent.

   Retain `#acquire`, `#link`, `#container`, `#receiver`, and `#promoted`. No new public Tooltip method, compatibility path, transaction interpreter, or HostSnapshot change is required.

4. **The door table**

   Here **door** means lifetime, captured change identity, exact published-tip identity, and the candidate/held tip’s expected parent and token where applicable. Every forward step has a pre-read as well as the post-read below. **Stop** means no further forward effects or completed event, `undefined` from build or `false` from the public call, with separately owned cleanup.

   | Step and source site | Consumer code inside the interval | Read afterward | Failure action |
   |---|---|---|---|
   | Presence evaluation — `#filled` ≈410 | Each content function | Door after **each** invocation | Stop before another callback, even when the returned value is empty |
   | Pre-show dispatch — `show` ≈311 | `show` listeners and their synchronous reactions | Door, prevention, existing host eligibility | Stop; do not discard the old tip |
   | Old-tip teardown — `show` ≈315, `#discard` ≈544 | Closing `beforetoggle`, focus effects, restoration reactions | Captured old-tip door after teardown | Stop before removal/build if ownership changed |
   | Template write — `#build` ≈431, `buildTip` ≈426 | Sanitizer and platform/custom-element reactions | Lifetime/change and expected publication state | Stop before root detachment or further build work |
   | Template root detachment — `buildTip` ≈433 | Normally none under the detached-target contract | Candidate parent changes from wrapper to detached | Stop; do not publish |
   | Template-token normalization, additional tokens, fade, id — `#build` ≈434–437 | Custom-element attribute reactions where admitted | Door after each separate native write; intended post-token value | Stop before the next write |
   | Build content evaluation — `#build` ≈440 | Content function | Door before occupancy | Stop without moving its returned element |
   | Displaced occupant return — `#occupy` ≈465 | Disconnection and connection reactions | Door plus ownership of the next origin record | Stop before recording/moving the replacement |
   | Origin publication — `#occupy` ≈469 | None from the internal Map write | Origin exists before the guarded DOM move | Do not move if the pre-door fails |
   | Slot removal or replacement — `#occupy` ≈477; `fillSlot` ≈469; `writeContent` ≈498 | Content reactions; sanitizer invocation | Door after the individual effect | Stop; return still-owned candidate content |
   | Each ordinary content return — `#release` ≈503–508 | Disconnection/connection reactions | Door after each return; fresh record/slot ownership before another | End ordinary continuation; cleanup must not consume successor records |
   | Final build release — `#build` ≈447 | Returned content’s connection reaction | Door before listener binding, build return, and publication | Return `undefined`; never publish/link this candidate |
   | Tip publication and ARIA link — `show` ≈320–323; `#link` ≈565–567 | Publication itself has no callback; host attribute write can react | Exact newly published tip; detached candidate parent; expected token | Stop; destruction’s restoration must not be followed by a stale link |
   | Container insertion — `show` ≈324 | Content connection reactions | Door expecting the selected container | Stop; leave a relocated tip at its observed parent |
   | Inserted dispatch — `show` ≈326 | `inserted` listeners | Container, token, lifetime, identity | Stop before Placement construction |
   | Placement popover attribute — `Placement.constructor` ≈109 | Attribute reactions | Placement lifetime and Tooltip construction door | Restore Placement acquisitions; perform no promotion |
   | Initial promotion — `Placement.constructor` ≈114 | Opening `beforetoggle`, other popovers’ closing listeners, native focus effects | Door immediately on return, plus promotion success | Stop **before compensation or `shown`**; restore Placement resources without reparenting the tip |
   | Placement compensation, anchor, side, arrow — constructor ≈121–161; `update` ≈192–213; `#write` ≈260 | Attribute/style reactions | Construction door after each write | Stop subsequent positioning writes; restore acquisitions |
   | Show-token write — `show` ≈336 | Attribute reactions, including token takeover | Door expecting `shown` present | Stop; do not fight the takeover |
   | Show wait — `show` ≈339 | Tasks, observer delivery, interactions, destruction, queued `toggle` | Door expecting same container and `shown` present | Resolve `false`; no `shown` event |
   | Fill merge and release — `fill` ≈371–376 | Returned-content reactions and reentrant API calls | Lifetime, captured change/tip state, assigned content identity | Resolve `false`; do not start a stale rebuild |
   | Hide dispatch — `#conceal` ≈611 | `hide` listeners | Door expecting shown tip; prevention separately subject to E17 | Stop unless only prevention is overridden by forced concealment |
   | Hide-token removal — `#conceal` ≈618 | Attribute reactions | Door expecting `shown` absent | Stop; do not remove a tip whose token was restored |
   | Hide wait — `#conceal` ≈621 | Tasks, observers, interactions, relocation | Door expecting original container and absent token | Resolve `false`; leave relocated tip |
   | Teardown — `#discard` ≈551; `Placement.destroy` ≈226–237 | Closing `beforetoggle`, focus effects, snapshot reactions | Captured ownership/container after teardown returns | Stop before tip removal; restoration is not permission to remove |
   | Tip removal — `#discard` ≈552 | Content disconnection reactions | Door expecting detached tip, with no successor ownership | Stop before unlinking or completing if taken over |
   | ARIA unlink — `#discard` ≈553; `#link` ≈566–567 | Host attribute reaction | Lifetime/change and expected publication state | Stop before `hidden` |
   | Platform dismissal and re-promotion — `#dismiss` ≈587–599 | Task-delivered `toggle`; hide listeners; opening `beforetoggle` on re-promotion | Fresh request ownership before re-promotion; full door afterward | No stale re-promotion; leave relocated tip; preserve the consumed E17 allowance |
   | Completed dispatch — `show` ≈342–344; `#conceal` ≈626–630 | `shown`/`hidden` listeners may start another change | Full door **before** release/dispatch; lifetime afterward | Suppress dispatch if pre-door fails; otherwise permit reentry and never undo its effects |
   | Failure/destruction cleanup — `destroy` ≈383; `#release` ≈498 | Content-return reactions and snapshot restoration | Per-resource identity and current recorded slot; E13 bounds snapshot internals | Skip transferred/externally moved resources; never resume the failed change |

   Derived platform boundary: reaction batches run before the relevant DOM call returns, while `beforetoggle` runs within promotion/teardown and `toggle` is queued. A post-read can stop the next engine effect; it cannot interrupt the current native algorithm or its remaining reactions. [Custom-element reactions](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions), [popover algorithms](https://html.spec.whatwg.org/multipage/popover.html), [DOM replacement](https://dom.spec.whatwg.org/#dom-parentnode-replacechildren).

5. **The guide sentence**

   > “Before and after each forward write, consumer callback, and pre-completion event dispatch, and after each wait, the tooltip checks the call’s lifetime and identity and the tip’s expected identity, parent, and `shown` state; a failed check stops the call with `false` and no completed event, leaving a relocated tip in its current parent while ownership-checked cleanup returns recorded content and restores resources, subject to the restoration bound below, and a completed-event listener may start a new change because the completed change is released before dispatch.”

   Replace the enumeration at `guides/veneer.md`, `#### Tooltip` ≈2477–2489, and align `Tooltip`’s class remarks ≈76–80. Keep the E13 restoration paragraph ≈2493–2496.

6. **The proof shape**

   These are proposed real-browser cases and distinguishing controls, not passing-test claims.

   | Case | Distinguishing mutation | Assertion that reads the difference |
   |---|---|---|
   | **Final-release destruction:** show A, switch the content function to B, and destroy when A reconnects home during rebuild (`#build` ≈447) | Delete the lifetime conjunct from central `#holds` (current counterpart ≈421), allowing the stopped build and later guarded publication to proceed | Record host attribute writes after nested destruction: no new `aria-describedby` link; no insertion/completed event; B returns home; outer show is `false` |
   | **Teardown relocation:** closing `beforetoggle` moves the tip to another connected parent (`#discard` ≈551–552) | Delete the expected-parent comparison from the central door used by discard | Tip remains in that parent; no subsequent removal record; hide is `false`; no `hidden` |
   | **Promotion relocation:** install opening `beforetoggle` through `inserted`, then relocate (`show` ≈326–336) | Delete the expected-parent comparison used by Placement’s guard and Tooltip’s continuation | Record no subsequent `shown` addition or forward positioning writes; no `shown` event; show is `false`; parent remains the destination |
   | Presence callback destroys and returns empty (`#filled` ≈410) | Bypass `#apply` around presence invocations | A later slot callback is never invoked; show is `false` |
   | Content callback destroys on its build evaluation (`Tooltip.test.ts` ≈1258) | Remove the lifetime predicate from the shared door | Preserve the observer assertion: the returned element never leaves home, even transiently |
   | Destruction during content disconnection (`Tooltip.test.ts` ≈1310) | Move `#origins.set` after `replaceChildren`, while still capturing the original parent beforehand | Record parent/sibling **immediately after nested `destroy()` returns**; final state alone cannot distinguish late publication from later cleanup |
   | Release is interrupted, including overlapping selectors and hidden fill (`Tooltip.test.ts` ≈1342, ≈1374) | Remove release’s continuation check; separately remove the per-record ownership comparison | No replacement move after destruction; fill is `false`; a record installed by reentry is not consumed by the interrupted release |
   | Takeover at token writes and during waits (`show` ≈336–340; `#conceal` ≈618–622) | Delete the expected-token comparison; separately bypass the post-wait door | Opposite token state survives; no completed event; affected call is `false` |
   | Placement continuation after promotion or an attribute reaction (`Placement.constructor` ≈109–161) | Omit the supplied guard from Placement’s internal effect boundary while keeping the outer Tooltip guard | Observe absence of forward compensation/anchor/side writes after the interruption; merely asserting `false` would miss the internal writes |
   | Completed-event reentry (`show` ≈342; `#conceal` ≈626) | Move change release after dispatch | Listener-started change is accepted and its resulting DOM survives; the completed event is emitted once for the completed operation |
   | E17 re-promotion (`Tooltip.test.ts` ≈1405; `#dismiss` ≈596) | Remove the `#promoted` branch; separately bypass the re-promotion door | Preventing tooltips settle; relocation during re-promotion produces no later forward work |
   | Template boundary and cleanup ownership (`buildTip` ≈426–433; `#release` ≈501–508) | Bypass the sanitizer-return door; separately remove the recorded-slot comparison | No later build effect after sanitizer-triggered destruction; independently moved content remains where the consumer put it |

   Use real Tooltip, Placement, DOM events, custom elements, and observers. Separate restoration writes from forbidden forward writes in the recorder.

   **Proof limit:** removing only a post-read may leave behavior unchanged because the next pre-read catches the same failure. Such a mutation is legitimately indistinguishable and must not be reported as a binding proof. The controls above remove the shared deciding predicate or bypass an internal boundary whose forbidden write occurs before an outer guard can help.

   Completeness comes from the structural property that every forward effect uses the primitive and every composite exposes its internal effects—not from the test population. The induction is: the pre-read admits one effect; its post-read either permits continuation or ends that change; publication and completion also require admission. Plain TypeScript does not prevent a future author from adding a raw DOM call, so source review must verify exclusive routing. A token or parent changed and restored entirely between reads is also indistinguishable from no persistent takeover; the interface must promise detection at boundaries, not observation of every intervening mutation.

7. **Bounds**

   **Placement and Dropdown.** Change `Placement` construction and its shared positioning body to honor the constructor-only guard; keep `destroy()` restoration and the default `manual`/static behavior. Do not store a completed Tooltip change identity in Placement. Preserve Dropdown’s placement-retention behavior during nested destruction (`Dropdown.#conceal` ≈319–323; `destroy` ≈249–255). Relevant retained cases are top-layer open/close (≈88), static placement (≈194), cascade compensation (≈275), update (≈576), promotion destruction/refusal (≈1015, ≈1122, ≈1162), and closing-promotion nested destruction (≈1245, ≈1288) in `Dropdown.test.ts`. Their proposed replay is regression evidence, not evidence already obtained.

   **HostSnapshot.** Leave it unchanged. `HostSnapshot.restore` ≈122 captures and empties its collections before writing; E13’s nested-restoration completion remains J-SNAPSHOT-SHARED. That bound does not excuse a later Tooltip publication or removal. No part of this mechanism requires changing snapshot completion.

   **E17 and J-POPOVER.** Keep one re-promotion per shown tip and forced concealment on its next platform close (`#dismiss` ≈590; `#conceal` ≈611). Guard re-promotion itself. Carry the resulting door mechanism, completion semantics, and corrected hide declaration into J-POPOVER; leave its profile/registry design to that unit.

   **Proposed file scope:** `Tooltip.ts`, `Placement.ts`, `helpers.ts`, `types.ts`, and `guides/veneer.md`; test changes in `Tooltip.test.ts`, `Placement.test.ts`, `helpers.test.ts`, and `index.test.ts` for the exported `readTip`. That is nine Veneer files, with four test files changed. Dropdown’s cases are replayed unchanged. The round-4 mutation instrument carries the controls above. Source line count increases through explicit effect boundaries and Placement plumbing; no measured delta exists in this read-only ruling.

8. **Deviation state**

   All named subject files resolved. No test, build, mutation, write, or sub-agent was run. No HostSnapshot dependency blocks the bounded ruling.

   Browser reproduction and mutation discrimination remain unexecuted by instruction. The final-release, teardown-relocation, promotion-relocation, and internal-Placement cases must settle the derived behavior before round 4 claims the invariant as proven.
