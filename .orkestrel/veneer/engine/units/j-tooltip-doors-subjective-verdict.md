# J-TOOLTIP-DOORS — the subjective lane's ruling (`planner`, Opus 5.5, agent a412a8849a7ba2ff5, retained verbatim 2026-09-24)

1. **Ruling on each option**

   I held the subjective lane, as `planner` on Opus 5.5. I read the retained record and the subject files. Every claim about behaviour below is derived from source, and each one names the case in part 6 that would settle it.

   The source changes how A and B compare. The door idiom Tooltip's siblings share is already B's guarded step. `Dropdown.#apply(change, shown, write)` (`Dropdown.ts`, around line 291) runs one write and then reads `#holds(change, shown)`. `Modal.#apply` (around line 386) and `Offcanvas.#apply` (around line 354) do the same, and `#apply` also appears in Alert, Carousel, Collapse, Tab, Toast, and ScrollSpy. Tooltip is the only engine that writes its door reads inline. It also splits its predicate four ways: `#holds(change, undefined)`, `#holds(change, tip)`, `#holds(change, tip) && this.shown` or `&& tip.parentElement === container`, and `#holding` (around line 638). A is therefore not the sibling idiom. It is Tooltip's own divergence from that idiom.

   - **A. Enumerated doors, completed. Rejected.**
     - **Cost:** three more inline reads.
     - **Closes:** the three counterexamples.
     - **Leaves open:** its own completeness. No property makes the list complete. Whether a write can run consumer code depends on nodes the consumer supplies: the template, the content, a custom-element trigger, and the `sanitizer` option. Deciding which calls are "reaction-free" is the judgment that failed in round 1, round 2, and round 3. Round 3 missed the final `#release` and the `hidePopover()` inside `#discard`. A fourth list would repeat that judgment.
   - **B. One guarded step. Accepted, in the siblings' form.**
     - **Cost:** the change methods are restated as chains of `#apply` steps, and `#holding` goes. Net size is roughly neutral to about +20 lines (derived from the rewrite in part 3).
     - **Closes:** omission by construction. A bare platform call inside a change method becomes visibly wrong, and a checker can find it mechanically.
     - **Leaves open:** the undo paths. `#discard`, `#release`, and `destroy` must keep going after a destruction, so a stop-on-failure step does not fit them. The undo rule in part 3 covers them.
     - **Change to the proposal:** I reject the read *before* the write. The previous step's read already covers it, and the siblings read only after.
   - **C. A threat-model bound. Accepted for its guarantees; its proposed exclusion is rejected.**
     - **Cost:** interface prose and one proof per sentence.
     - **Closes:** the gap between what the consumer is told and what the code does.
     - **Why the exclusion fails:** relocation inside the platform's `beforetoggle` dispatch is reachable through a documented seam. `inserted.vn.tooltip` hands the tip to listeners, and the suite finds the tip that way (`Tooltip.test.ts` around lines 166–169, through `aria-describedby`). By the reachability rule it is repaired, not documented.
     - **Other reactions and their reachability:**
       - Content reactions: reachable through the `title` option and `fill`. Repaired.
       - An attribute reaction on a custom-element trigger at the `#link` step: reachable, because any `HTMLElement` can be a host. Repaired.
       - Consumer code in the `sanitizer` option: a documented seam. Repaired.
       - A `HostSnapshot` restoration that re-enters: E13. Documented; the bound stays.
       - Re-entry from a completed-event listener: intentional. Documented as behaviour.
     - **What remains out of contract:** only E13.
   - **D. Reaction-free construction. Accepted narrowly.**
     - **What is already true:** the build works on a detached tip (`buildTip` ends with `tip.remove()`, `helpers.ts` around line 433), and promotion is already the last write before the token.
     - **What to adopt:** call every content function before the first write. The build then never stops between moves because of a content function (derived; P6).
     - **Rejected parts:** "one insertion" cannot work with several slots. The exemption for detached writes relies on the same classification that sinks A. A template-supplied custom tip that a consumer sanitizer connects gets upgraded, and after that its token writes run reactions.
     - **Leaves open:** disconnection at the origin, connection at `append` and at release, `beforetoggle` at promotion and teardown, trigger attribute reactions, the sanitizer, and listeners. All of these go to B.

   **Pick: B in the siblings' form, plus D's content-first resolution, plus C's guarantees with E13 as the only exclusion.**

2. **The ruling**

   - **Invariant:** A change performs no write, dispatch, move, or sanitizer call after consumer code has run unless it has since read these facts:
     - the tooltip is live;
     - the change is still its own;
     - from insertion until removal, the tip it holds is in the container it went into and carries the `shown` token exactly when the change expects it.
   - **Constraint:** To defend the invariant, the tooltip never moves back, removes, or repositions a tip or element that other code moved. It undoes a move only while the node is still where the tooltip put it. Through destruction it keeps restoring the attributes it wrote and returning the content still in its slots. It adds no read before a step, no observer, and no inerting. It does not defend against the E13 re-entry.
   - **Interface:**
     - `TooltipInterface.show` `@remarks`: "A listener, a content function, the sanitizer, or a custom element's reaction that runs during the call can destroy the tooltip, start a hide, or move the tip; the call then resolves false, writes and dispatches nothing more, and leaves the tip where that code put it."
     - `TooltipInterface.hide` `@remarks`: "A listener or reaction that moves the tip during the hide, including a listener to the platform's closing `beforetoggle` event, takes the tip over: the call resolves false, dispatches no `hidden` event, and leaves the tip there."
     - `TooltipEventMap.inserted`: "A listener can reach the tip through the trigger's `aria-describedby` attribute; a tip a listener moves out of its container is left where the listener put it, by the show, a hide, and destruction alike."
     - O1's hide-prevention exception lands in the same pass on `TooltipEventMap.hide`.

3. **The mechanism**

   - **`#apply(change, shown, write)`, added.** It has the siblings' signature with `shown: boolean | undefined`. It calls `write()` and returns `#holds(change, shown)`. Every platform write, dispatch, move, and sanitizer call inside `show`, `#conceal`, `#build`, and `#occupy` is the anonymous callback of one `#apply`, with one call per step.
     - **Exceptions:** constructions, meaning `#place`, follow the siblings' construction pattern: construct, publish, then call `#holds`. Pure reads such as `reflow`, `querySelector`, and `getAttribute`, and writes to the tooltip's own fields, sit between steps.
   - **`#holds(change, shown)`, replaced.** It was `#holds(change, tip)` and becomes `shown: boolean | undefined`. It always reads the lifetime and whether `#change === change`. When `shown` is a boolean it also reads that `#tip` is set, that `#tip.parentElement === #container`, and that the tip carries the `shown` token exactly when `shown` is true. `undefined` means the call holds no tip (build, pre-discard, post-discard). Tip identity comes from `#change`, because only `show`, `#conceal`, and `destroy` replace `#tip`, and each takes a new identity or aborts (derived; P3, P5).
   - **`#holding`, removed.** `#holds(change, false)` replaces it.
   - **`#discard(): boolean`, changed.**
     - It captures `#container` beside `#tip` before clearing the fields.
     - After `placement.destroy()` it removes the tip only when `tip.parentElement === container`.
     - It unlinks the id while the tooltip is live, whatever happened to the tip.
     - It returns whether the tip left the document, meaning no tip or `tip.parentNode === null` after its writes.
     - `#conceal` stops on `false`. `show`'s old-tip discard and `destroy` ignore the result.
   - **`#release`, unchanged.** It is already the undo rule's other half: it leaves an element that is no longer in its slot (around line 502). The forward path calls it only inside `#apply`.
   - **`#build(change)`, restructured into these steps:**
     1. Resolve each content value, calling functions once each and reading `#holds(change, undefined)` after every call. A failure here returns `undefined` with nothing moved.
     2. `#apply` `buildTip`, then each token write and the id as separate steps.
     3. Run `#occupy` per slot.
     4. `#apply` the final `#release`.
     - A failure in step 3 or step 4 releases the unfinished tip's content and returns `undefined`. These are the only release-on-stop sites.
   - **`#occupy`.** The occupant release and `fillSlot` become `#apply` steps. The origin record stays published between them, before the move.
   - **`show` reorder.** The order becomes: publish `#tip` and `#container`, `#apply(append)`, `#apply(#link)`, `#apply(inserted)`. With this order every read after publication includes the container. `aria-describedby` then never names a tip that is out of its container. The `inserted` listener still finds the id, which the case around line 166 relies on.
   - **Name.** `#apply` wins over `#step` and `#guard`: one concept, one term across the siblings.

4. **The door table**

   Every row is derived; the part 6 case that settles it is named where one exists.

   | Step | Consumer code inside | Read after | On failure |
   | --- | --- | --- | --- |
   | `show`: `#filled` (around line 410) | content functions | `#refused` | resolve `false`; nothing written |
   | `show`: `show.vn.tooltip` dispatch (around line 311) | listeners | `#holds(change, undefined)`, `#blocked` | resolve `false` |
   | `show`: old-tip `#discard` (around line 315) | closing `beforetoggle`, placement restore reactions, content disconnection, trigger unlink reaction | undo rule inside; `#holds(change, undefined)` after | resolve `false`; old tip left where it was moved |
   | build: content resolution | content functions | `#holds(change, undefined)` after each call | `undefined`; nothing moved (P6) |
   | build: `buildTip` | the `sanitizer` option | `#apply(…, undefined)` | `undefined` |
   | build: `fade`/`shown` removal, `auto`/tokens, `fade`, id (around lines 434–437) | reactions on an upgraded custom tip | `#apply(…, undefined)` per write | `undefined` |
   | occupancy: occupant `#release` (around line 465) | connection reaction of the returned element | `#apply(…, undefined)` | release unfinished content; `undefined` |
   | occupancy: origin record | none (field write) | — | — |
   | occupancy: `fillSlot` (around line 477) | disconnection at the origin; the sanitizer for markup | `#apply(…, undefined)` | release unfinished content; `undefined` |
   | build: final `#release` (around line 447) | connection reactions of returned elements | `#apply(…, undefined)` | release unfinished content; `undefined` (P1) |
   | `show`: publish `#tip`, `#container` | none | — | — |
   | `show`: `append` (around line 324) | connection reactions of the tip and its content | `#apply(…, false)` | resolve `false`; records kept |
   | `show`: `#link(id, true)` | attribute reaction on a custom trigger | `#apply(…, false)` | resolve `false` (P4) |
   | `show`: `inserted` dispatch | listeners holding the tip | `#apply(…, false)` | resolve `false` (P5) |
   | promotion: `#place` → the popover attribute, `showPopover` (`Placement.ts` around lines 109–114) | attribute reaction on the tip; opening `beforetoggle` | refused → `#holds(change, false)` then `#discard`; else publish `#placement`, then `#holds(change, false)` | resolve `false`; tip left; placement kept for the next undo (P3) |
   | `show`: `reflow` | none (a read) | — | — |
   | `show`: `shown` token (around line 336) | class reaction on the tip | `#apply(…, true)` | resolve `false` |
   | `show`: wait (around line 339) | any task | `#holds(change, true)` | resolve `false` |
   | `show`: `shown` dispatch (around line 343) | listeners; identity already released | nothing written after; the return reads the lifetime | — |
   | `hide`: `hide.vn.tooltip` dispatch (around line 611) | listeners | `#holds(change, true)` | resolve `false` |
   | `hide`: token removal (around line 618) | class reaction | `#apply(…, false)` | resolve `false`; tip left |
   | `hide`: wait (around line 621) | any task | `#holds(change, false)` | resolve `false` (the case around line 1287) |
   | discard: `placement.destroy()` → `hidePopover` (`Placement.ts` around line 226) | closing `beforetoggle`; snapshot restore reactions | container read before the removal | removal skipped; `#discard` returns `false` (P2) |
   | discard: tip removal | content disconnection reactions | `#discard` returns whether the tip left the document | `hide` resolves `false`; no `hidden` |
   | discard: `#link(id, false)` | trigger attribute reaction | `#holds(change, undefined)` in `#conceal` | resolve `false`; no `hidden` |
   | `hide`: `hidden` dispatch and re-show (around lines 627–629) | listeners; `show()` is a new change with its own refusals | nothing written after | — |
   | `fill`: `#release(changed)` (around line 374) | connection reactions | lifetime (kept) | resolve `false` (the case around line 1374) |
   | `fill`: rebuild through `show()` | the `show` rows | — | — |
   | E17 re-promotion `showPopover` in `#dismiss` (around line 597) | opening `beforetoggle` | nothing written after | — |
   | `destroy` (around line 383) | every kind | undo rule per node; E13 for re-entry during restoration | keeps undoing |

5. **The guide sentence**

   These sentences replace the text from "After each write" through "…moved into the unfinished tip." in the `#### Tooltip` door paragraph. The E13 sentences stay as they are.

   > A call runs each write, dispatch, element move, and sanitizer call of its change as one step. After every step, every content function, and every await, it reads that the tooltip is live and that no later call started. From the tip's insertion until its removal, it also reads that the tip is in the container it went into and carries the `shown` token exactly when the call expects it: from the show's token write on, and until the hide's token removal. A build calls every content function before it writes anything. A call that finds any of these false stops, writing, moving, and dispatching nothing more, and resolves `false`. A build that stops returns every element it moved into the unfinished tip, and a tip that other code moved stays where that code put it. Destruction, a hide's removal, and a content element's return move a node only while it is still where the tooltip put it. A tip or an element that a listener or reaction moved, including a listener to the platform's closing `beforetoggle` event, is left there, and every attribute the tooltip wrote is still restored.

   The class TSDoc changes the same way: the order becomes "inserts it into its container, names it in the trigger's `aria-describedby` attribute", and its "After each…" sentence becomes the guide's wording.

6. **The proof shape**

   Each case names the mutation that turns it red and the assertion that reads the difference.

   - **P1, final-release destruction (round-3 counterexample 1).**
     - Setup: custom element A is the content through `title: () => current`; show; switch to B; arm A's `connectedCallback` to destroy; show again.
     - Mutation: make the final release in `#build` a bare `this.#release(...)`.
     - Assertions: `show()` resolves `false`; `document.querySelector('.tooltip')` is `null`; `host.hasAttribute('aria-describedby')` is `false`; A and B are in their homes.
   - **P2, teardown relocation (counterexample 2).**
     - Setup: `animated: false`. An `inserted` listener attaches a `beforetoggle` listener that moves the tip into `elsewhere` when the new state is `closed`. Call `hide()`.
     - Mutation 1: drop the container comparison in `#discard`. Assertion: `tip.parentElement` is `elsewhere`.
     - Mutation 2: make `#discard` return `true` unconditionally. Assertions: `hide()` resolves `false`; the `hidden` recorder is empty.
   - **P3, promotion relocation (counterexample 3).**
     - Setup: the same seam, moving the tip when the new state is `open`.
     - Mutation: delete the `#holds(change, false)` read after `this.#placement = placement`.
     - Assertions: `tip.classList.contains('show')` is `false`; no `shown` event. Without the read, the next `#apply` adds the token before it reads.
   - **P4, trigger link reaction.**
     - Setup: a custom-element trigger whose `attributeChangedCallback` for `aria-describedby` destroys the tooltip.
     - Mutation: a bare `#link`.
     - Assertion: a plain `addEventListener` recorder for `inserted.vn.tooltip` stays empty. The `on` hooks die with the signal, so they cannot show the difference.
   - **P5, `inserted` relocation.**
     - Setup: an `inserted` listener moves the tip.
     - Mutation: delete the door after the `inserted` dispatch.
     - Assertions: `tip.hasAttribute('popover')` is `false`; `tip.matches(':popover-open')` is `false`.
   - **P6, content before writes.**
     - Setup: two slots; the second function destroys on its build call; a `MutationObserver` watches the first element's home.
     - Mutation: move each slot right after its own function runs.
     - Assertion: the observer records nothing.
   - **P7, destroy leaves a moved tip.**
     - Setup: show; move the tip to `elsewhere`; destroy.
     - Mutation: P2's mutation 1, unconditional removal.
     - Assertions: `tip.parentElement` is `elsewhere`; `aria-describedby` is restored.
   - **Central predicate rows.**
     - Drop the container clause from `#holds`: reddens P3, P5, and the case around line 1287.
     - Drop the token clause: reddens the existing token-takeover cases.
   - **Retained cases, re-pointed to the new lines:** around lines 1258, 1287, 1310, and 1374.
   - **Mechanical audit claim, for the checker rather than a test:** in `show`, `#conceal`, `#build`, and `#occupy`, every platform call either sits inside an `#apply` callback or is a construction followed by `#holds`.

7. **Bounds**

   - **`Placement` and `Dropdown`:** unchanged. No Dropdown case changes. `Dropdown` already reads its door after `placement.destroy()` (around lines 214–216).
   - **`HostSnapshot`:** unchanged. The E13 sentence stays verbatim.
   - **E17:** `#dismiss` is unchanged; its re-promotion is the last write. O1 lands on `TooltipEventMap.hide` and in the event table.
   - **J-POPOVER:** inherits `#apply`, `#holds(change, shown)`, and the undo rule for its tip through the R12 seam.
   - **J-SNAPSHOT-SHARED:** gains nothing.
   - **Unit:**
     - Round 4 goes to `sol` on GPT-6 Astra as objective sequencing work. The guide and TSDoc sentences are fixed verbatim in parts 2 and 5, so the unit does no voice work.
     - It owns `src/browser/Tooltip.ts`, the Tooltip declarations in `src/browser/types.ts`, the `#### Tooltip` section of `guides/veneer.md`, `tests/src/browser/Tooltip.test.ts`, and the round-4 mutation instrument.
     - Tests change as follows: P1 through P7 are added, the retained door cases are re-pointed, and the round-3 carried rows ride along (claim 2 timing, claim 4 `#failed.add`, claim 6 `href`, claim 7 fixture, O1).
     - Audit: `analyst` and `reviewer`, with `reviewer` on Opus 5.5 as the engine that did not write the unit, plus a `checker` for the mechanical claim in part 6.

8. **Deviation state**

   Every point here is a judgment for the objective lane to challenge or for the Orchestrator to rule on.

   - **Destroy leaves a moved tip.** This changes behaviour. Today `#discard` removes the tip wherever it is. I ruled for one undo rule over every node, matching `#release`. The other option is that destroy alone removes a moved tip. That costs a second rule, and a hide and a destroy would then disagree.
   - **`#holds(change, shown: boolean | undefined)`.** `undefined` means the call holds no tip. The other option is a three-argument `#holds(change, tip, shown)`, which leaves `shown` unused whenever `tip` is `undefined`. I chose the siblings' parameter positions.
   - **Link after append.** This departs from Bootstrap's link-then-append order. Only a reaction that reads `aria-describedby` during the insertion can observe it (derived; no case settles it).
   - **Detached-tip upgrade.** I could not settle whether a detached tip built by fragment parsing is ever upgraded. The mechanism makes the question moot for correctness, but not for whether the rows for the token and id writes are reachable.
   - **Outside this door invariant, carrier to be named by the Orchestrator:**
     - A `fill` called from a content function during a build pulls elements out of the unfinished tip without a takeover.
     - A content function or sanitizer that throws mid-build strands moved elements in the detached tip until the next build or destroy.
   - **Siblings' tension.** Offcanvas exempts its backdrop writes by classification (`Offcanvas.ts` around lines 241–243). That exemption is sound for an engine-made `div` that no consumer can reach. It is the same reasoning this ruling forbids in Tooltip. Whether the siblings adopt "every write in a change is an `#apply` step" is a separate ruling.
   - **Evidence limits.** I ran nothing. Every behavioural claim here is derived from source.
