# J-TOOLTIP audit round 4 — the subjective lane's verdict (`reviewer`, Opus 5.5, agent a4716eb3382989a23, retained verbatim 2026-09-24)

Subjective lane, held by `reviewer` on Opus 5.5 (the alias served `claude-opus-5-5[1m]`), native and read-only. I ran nothing. Every behavioural statement below comes from reading source and retained logs, except where I cite an executed log.

**Dispatch defects** (the Orchestrator's, reported and not ruled on):
- The reviewer brief `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-tooltip-audit-4-reviewer-brief.md` was copied from another unit and not rewritten:
  - Line 5 names `Collapse.ts` and `Button.ts` as the landed pattern, and lists "the delegate route as an API, the shared patches' shape".
  - Line 9 lists `Delegate.ts` as a worktree subject file.
  - The Tooltip has no delegate route (guide `#### Tooltip`: "§ Delegation routes no tooltip"), and round 4 changes no shared patch.
  - The round-2 reviewer brief had the same defect (ORC2 there).
- Line 9's terrain clause is garbled: "`j-tooltip-terrain-distillate.md (the E18 ruling … are the terrain)` § Tooltip".
- I followed the dispatch message, the claims file, and the Dropdown and Modal `#apply` siblings.
- Round 3 ran no subjective lane. I read "every round-3 subjective finding" as the round-2 subjective findings F1, F3, F4, and F5 that round 3 carried. F2 went to the objective lane.

## Verdicts

1. **CONFIRMED.**
   - `#apply(change, shown, write)` (around line 460) runs `write()` and returns `#holds(change, shown)`. That is `Dropdown.#apply`'s form, with `shown` widened to `boolean | undefined`.
   - `#holds` (around line 447) reads the lifetime and `#change === change`. It returns true for `undefined`. For a boolean it reads `#tip !== undefined`, `#tip.parentElement === #container`, and the token equal to `shown`.
   - `#holding` and `#holds(change, tip)` are gone. A grep for `#holding|#holds\(change, tip` over `Tooltip.ts` returns nothing.
   - I walked `show`, `#conceal`, `#build`, and `#occupy`. Every dispatch, token write, `setAttribute`, append, `#link`, `#discard`, `#release`, `buildTip`, `fillSlot`, and `addEventListener` sits in one `#apply` callback. `#place` is followed by `#placement = placement` and `#holds(change, false)`. The bare calls left are the refused promotion's `#discard` under `#holds(change, false)`, the build's release-on-stop and catch release, and the reads (`reflow`, `querySelector`).
   - Attack: a `#holds(change, undefined)` where a boolean was due. It held:
     - The old-tip discard and the hide's discard both clear `#tip`, so `undefined` is the only correct expectation.
     - Every step from the append to the token uses `false`, and every step from the token to the hide's token removal uses `true`.
   - Attack on shape: the value-ferrying arrays `accepted`, `built`, and `left`. They held against the claim's letter. Their design cost goes to the Orchestrator as ORC1.

2. **CONFIRMED** on the sequence and on the proof design. The executed readings sit with claim 7's replay clause.
   - `#build` (around lines 470–524) resolves every value first, with `#holds(change, undefined)` after each call. It then runs these as separate steps: `buildTip`, `remove(fade, shown)`, `add(auto, …tokens)`, `fade` when animated, `id`, `#occupy` per slot, the final release, and the listener.
   - A stop, or a throw inside the `try`, runs `#release((_element, slot) => !tip.contains(slot))`.
   - `#occupy` (around lines 529–557) runs the occupant release as a step, then publishes the origin record (keeping an earlier record's parent and sibling), then runs `fillSlot` as a step.
   - Mutation reading for P1: bare both the final release and the listener step. `show` then publishes and appends before a door fails, and `expect(document.querySelector('.tooltip')).toBeNull()` reddens. The assertion distinguishes the mutation. P1's single-mutation limit is the Proof limit's case.
   - Mutation reading for P6: move each slot beside its own function. `rich` moves before the arrow function destroys the tooltip, and the observer records it. The assertion distinguishes the mutation.
   - Mutation reading for the throw row: drop the catch release. `other` stays in the slot, and `toBe(otherHome)` reddens.
   - Attack: a second `#build` while the first build's content sits in a detached tip. It held. The only stop cause during a build is destruction, because a hide refuses while not shown, and destruction releases everything.
   - The `MISSED` id row goes to the objective lane (R3).

3. **CONFIRMED** on the sequence. The P3 consequence is referred (R1) and ruled on the interface under claim 5.
   - `show` (around lines 316–369) matches the claim step for step:
     - the refusal, then `#filled()` and `#refused()`;
     - the identity, then the dispatch step, acceptance, and `#blocked()`;
     - the discard step and the build;
     - publication of `#tip` and `#container`;
     - append, link, and `inserted` as `false` steps;
     - `#place`, the refused-promotion discard under the door, publication of `#placement`, and `#holds(change, false)`;
     - `reflow`, the token step with `true`, the settle, and `#holds(change, true)`;
     - release, dispatch, `return !aborted`, and the `finally` clear.
   - Mutation reading for P3: delete the post-placement `#holds`. The token step writes `show` before its read, and `tip.classList.contains('show')` reddens.
   - Mutation reading for P4: a bare `#link`. The `inserted` step dispatches before any read, and the plain `addEventListener` recorder reddens.

4. **CONFIRMED.**
   - `#discard(): boolean` (around lines 624–637) matches the claim. It captures three fields and clears four, including `#promoted`. It destroys the placement, returns true when there is no tip, removes the tip only while `parentElement === container`, unlinks while live, and returns `tip.parentNode === null`.
   - `#conceal(forced)` (around lines 690–728) and `fill` (around lines 387–400) match the claim.
   - Attack: `#discard` with `container` undefined and the tip connected. It held, because `#tip` and `#container` are published and cleared together. No state has one without the other.
   - Attack: `destroy()` during the settle. It held. The abort resolves `settleAnimations`, and `#holds(change, true)` fails.
   - Attack: a hide whose `#discard` reports false. It held within E18:
     - After P2, `placement.destroy()` has closed the tip and restored its styles and `popover` attribute, and the tip has no `shown` token.
     - The tip is left un-promoted in `elsewhere`, and the trigger is unlinked.
     - Its slot content returns at the next build's final release, because the elements still sit in their slots.
   - Mutation reading for P2: remove the container read, and `hide()` resolves `true`, so the first assertion reddens. Make the report always true, and `hidden.calls` reddens.
   - Mutation reading for P7: unconditional removal, and `tip.parentElement` reddens.

5. **BROKEN.**
   - **What holds:**
     - All five E18 sentences and O1 appear verbatim in `types.ts` (around lines 1508–1514, 1646–1648, and 1660–1662).
     - `fill`'s `@returns` names the in-flight refusal.
     - The class TSDoc paragraph (around lines 80–94) equals the guide paragraph, and the release sentence sits in its own paragraph.
     - The `hide` event row carries O1.
     - The E13 sentence is unchanged in the worktree. S2 covers it against main.
     - The class remarks' order (append, then link) matches the code.
   - **The failing input** is P3's own setup: an `inserted` listener adds an opening `beforetoggle` listener that moves the tip to `elsewhere`.
   - **The state** comes from `Placement.ts` in the constructor after `element.showPopover()` (around lines 114–161):
     - `#halted(signal)` (around line 242) reads only the lifetime.
     - After the relocation, the constructor still writes the compensation, `position`, the edges, the margins, `position-anchor`, `position-area`, and the `position-try-*` properties on the moved tip. It writes `anchor-name` on the trigger, arms the observer and the `scrollend` listener, and calls `update()`, which writes the side attribute and the arrow.
     - Only after the constructor returns does `Tooltip.show` read `#holds(change, false)` (around line 357).
     - The retained executed probe `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-tooltip-probe-promotion.log.txt` records the result after `show()` resolved `false`: `"open": true`, `"side": "right"`, `position-anchor: --vn-placement-0; position-area: top`, and a trigger `anchor-name` of `--vn-placement-0`.
   - **The sentences that state a false fact:**
     - `TooltipInterface.show` `@remarks`: "the call then resolves false, writes and dispatches nothing more". The call writes after the move.
     - The guide's door paragraph (around lines 2479–2486) and the class TSDoc: "A call runs each write … of its change as one step. After every step … A call that finds any of these false stops, writing … nothing more". The placement's construction runs many writes as one step and reads no container between them.
     - E18's invariant is broken at the same step, and so is its constraint "never … repositions a tip … that other code moved", because the anchor writes position the moved tip.
   - **Why it matters:** this is the round-3 failure mode — prose promising a check the sequence does not perform. The user-visible result is a tooltip left open and anchored in another container. `hide()` refuses it, because `shown` is false.
   - **Smallest correct fix:** one of the following.
     - (a) Carry a construction guard into `Placement` so no write follows the relocation. This is the objective doors lane's `PlacementOptions.guard` shape. E18 pre-authorised "a reachable defect with a proof routes a `Placement` change to a successor", and P3 plus the probe is that proof. Add a P3 assertion that reads `data-popper-placement`, `position-anchor`, or the trigger's `anchor-name` as absent, because the token assertion alone cannot see this gap.
     - (b) Amend E18's interface and the guide to bound the promotion step.
   - Recommendation: take (a). Under (b) the sentences would still contradict the E18 constraint.

6. **CONFIRMED.**
   - The claim-2 timing control is in the case around line 1321. `restored.handler(content.parentElement)` is read the moment the nested `destroy()` returns. A record published after the move reads `null` or the slot there, so the assertion distinguishes the mutation.
   - The claim-4 row is in the case around line 1454. `recordCalls(Element.prototype, 'getAttribute')` is filtered to `bad`. Deleting `#failed.add` makes the next interaction re-construct and read attributes, so the assertion distinguishes the mutation.
   - The claim-7 fixture (around lines 1537–1610) is correct:
     - `#dialog` carries `x-modal` only, and the `#decoy` around it carries `modal`.
     - The non-bubbling events reach one ancestor each.
     - `TOOLTIP_CLASSES.modal` would select the decoy, which reddens `expect(tooltip.shown).toBe(true)`.
     - The comment says "conflicting".
   - The `href` row's first failure, `expected '<span href="h">s</span>…'`, lands at the per-element output in `j-tooltip-mutations-4.log.txt`.
   - Executed readings: see claim 7.

7. **UNRESOLVED.**
   - `j-tooltip-mutations-4-orchestrator.log.txt` is absent, as the brief expects. The Orchestrator's replay settles this claim.
   - The digest equality of `Placement.ts` and `helpers.ts` to `j-tooltip-3.diff` belongs to the checker.
   - The clauses I could read held:
     - The status equals the round-3 set.
     - `Tooltip.ts` holds one class plus imports.
     - A grep over `Tooltip.ts` for `as`, a non-null `!`, `: any`, `@ts-`, `eslint-disable`, and an access modifier hits prose comments only.
     - No nested function declaration appears outside an anonymous callback.
     - The report records no `prove` call.

## Findings outside the claims

**S2 — the Tooltip restoration sentence contradicts Veneer main's `HostSnapshot`.**
- **Where:** `guides/veneer.md` `#### Tooltip`, around lines 2496–2499: "A `destroy` call made from a custom element's reaction … returns before the restoration's remaining writes land, because a nested call on the shared snapshot restores only the records saved since; J-SNAPSHOT-SHARED closes that bound."
- **Why it's wrong:** J-SNAPSHOT closed that bound on main, per E13 as amended at the J-SNAPSHOT round-1 audit. `C:/Users/mikes/WebstormProjects/veneer/src/browser/HostSnapshot.ts`, around lines 38–42, reads "writes back every target the interrupted restoration still owns". Main's guide, around lines 845–849, states the closed behaviour, and no longer names J-SNAPSHOT-SHARED for this bound. The worktree's base `e8251cf` predates the landing. Once the unit lands, the sentence is false and names the wrong unit.
- **What right looks like:** at the landing round's merge onto main, rewrite the sentence to the closed behaviour, the way J-SNAPSHOT rewrote `#### Dropdown` and `#### Modal`. Drop the J-SNAPSHOT-SHARED attribution.
- **Carrier:** the J-TOOLTIP landing round.

**S3 — "a hide takes a show in flight over" is false before the show's token write.**
- **Where:** `guides/veneer.md`, around lines 2478–2479: "so a show a listener starts inside that dispatch resolves `false` as in flight, and a hide takes a show in flight over."
- **Why it's wrong:** `#conceal` returns `false` when `!this.shown` (around line 691). `shown` needs the token, which `show` writes only at its token step (around line 359). So on a first show, a `show.vn.tooltip` or `inserted.vn.tooltip` listener that calls `hide()` gets `false`, and the show resolves `true`. This is derived from source; no case runs it. The case around line 617 takes over during the settle wait only.
- **What right looks like:** "a hide started after the show's `shown` token write takes the show over; before that write the tip is hidden, and the hide resolves `false`."
- **Carrier:** the successor unit that claim 5 opens.

## Attacked and held

- **Round-2 subjective carries, all closed:**
  - F1: the case around line 1533, with the rows "the class group is ignored", "the selector group is ignored", and "the modal ancestor is found by the default token".
  - F3: `#entered = false` is a `boolean`, and its comment is corrected.
  - F4: the `toggle` bullet (around line 2523) and the empty-title bullet (around line 2534).
  - F5: `#origins` is `{ parent, sibling, slot, selector }`.
  - The round-2 bounds on `#context`, `#describe`, `#parent`, and `#return` became `#acquire`, `#link`, `#receiver`/`#container`, and `#release`. "Transition in flight" became "change in flight". The case title reads "selectors".
- **Member set against E18 ("no new members beyond `#apply`"):** the only addition is `#apply`, and `#holding` is gone.
- **Private names:** `#readArrow` and `#resolveContainer` are compounds, which `names.md` permits for private members.
- **`inserted` sentence, "by the show, a hide, and destruction alike":** it holds. `#discard`'s container read covers destruction, and a hide refuses a moved tip because `shown` is false.
- **Case titles for P1, P2, P4, P5, P5-token, P6, P7, fill-during-build, re-entry, and the upgraded tip:** each asserts what its title names.
- **Adjacent behaviour that looks wrong and is correct:** after a takeover, `#tip` stays published and a later `show()` discards it without removing it, because the container read fails. That is the E18 undo rule.

## Referrals

**To the objective lane:**
- **R1:** after a stop on relocation, a published `#placement` stays live on a tip other code moved, and keeps writing to it.
  - The stop points are the P3 promotion, the hide dispatch, and the hide wait.
  - The writers are the observer and the `scrollend` listener (`Placement.ts` constructor, around lines 156–161). They call `update()` (around lines 187–214), which writes the side attribute and the arrow. `tooltip.update()` does the same.
  - `show` publishes `#placement` before its door read (around line 356), and no stop path releases it.
  - Rule whether this breaks E18's constraint "never … repositions a tip … other code moved", and whether (a) under claim 5 closes it.
- **R2:** P3 asserts only the token, so no assertion reads the post-relocation `Placement` writes. A guard change needs one.
- **R3:** the `MISSED` id row's "indistinguishable" reading, and the red-first provenance "against the round-3 source", rest on the writer's report.

**To the Orchestrator:**
- **ORC1:** the value-ferrying arrays.
  - At three sites the code passes a result out of an `#apply` callback through a one-element array: `accepted.push(emitEvent(…))`, `built.push(buildTip(…))`, and `left.push(this.#discard())` read back as `left[0] !== true`.
  - This idiom exists in no sibling. The report says the `left` array was added only "to make the checker's mechanical claim hold literally".
  - `write: () => void` plus narrowing forces it once E18's letter puts every value-returning call inside `#apply`.
  - The ruling's own construction form (call, then `#holds`, as `#place` uses) expresses each site plainly: `if (!this.#discard() || !this.#holds(change, undefined)) return false`.
  - Rule whether E18 admits the construction form for a value-returning step. The writer cannot change this alone.
- **ORC2:** E18's constraint says it "does not defend against the E13 re-entry". J-SNAPSHOT superseded that clause on main. Amend the decision record with S2.
- **ORC3:** the E18 sentences carry wording that `writing.md` and `names.md` would change (B1, B2). Because the claims require them verbatim, only a ruling amendment can change them.

## Bounds

- **B1:** "conceals it despite prevention" (`TooltipEventMap.hide`, and the `hide` row around line 2475) uses the private method's verb. The public term is "hides", as in the platform paragraph around line 2378 and the departure bullet around line 2522.
- **B2:** "may start another change" appears in the `shown`/`hidden` TSDoc, the class TSDoc, and the guide. `writing.md` reserves `can` for an ability.
- **B3:** the guide and class TSDoc say "that change is never undone", and the event map says "does not undo the completion already announced". Both are true, but they are different facts about one dispatch, worded like one sentence said twice.
- **B4:** the `show` remarks' "writes … nothing more" does not carve out the build's release-on-stop moves. The guide does carve them out.
- **B5:** `#release((_element, slot) => !tip.contains(slot))` appears three times in `#build` (around lines 499, 509, and 513). One `finally` site behind a completion flag would be plainer.
- **B6:** `#occupy(tip, selector, value, change)` takes `change` last, while `#apply`, `#holds`, and `#build` take it first.
- **B7:** two case titles:
  - Around line 1899: "returns the moved elements home before a throwing sanitizer rejects it" reads as if the return precedes the sanitizer call. The case also moves one element, not several.
  - Around line 1454: the title omits the memoisation that the case proves.
- **B8:** the vocabulary-case comment around line 1534 says "a read through a default name changes the tip". Several of the default-name values are invalid, so a read through them would throw rather than change the tip.
- **B9:** the door paragraph (around lines 2478–2499) holds identity, doors, completion, promotion refusal, destruction, and E13 in one block. Split it after the release sentence.
- **B10:** a `fill` during an animated show's or hide's wait resolves `false` and drops its content, while Bootstrap's `setContent` applies. The departure list names the show's in-flight refusal but not the fill's. Under E9 no bullet is required; consider one.
- **B11 (carried from round 2):** `static #count` with `#identify` against R15's `generateId`, and the inline `TOOLTIP_DEFAULTS` type (carrier: J-POPOVER).

VERDICT: FAIL 5, 7; outside the claims: S2, S3
