# J-RELEASE-SWEEP slice S4 — the lens map (2026-09-25)

`reviewer` on Opus 5.5, holding the objective lens, in Workflow run `wf_29efd986-1c7`. The brief is `units/j-release-sweep-brief.md`. The lens's final message follows verbatim.

# J-RELEASE-SWEEP, slice S4: source review (objective lane)

**Lane:** reviewer on Opus 5.5, holding the objective lane. **Root:** `C:/Users/mikes/WebstormProjects/veneer`.

I ran nothing. Every ruling comes from reading the source, so each witness is a derivation. It stays a derivation until the repair unit runs it red-first.

The two S4 violations of I2 through shipped code are these:
- **The destroy latch.** Every `destroy()` returns at once when it is called again during its own release. The `HostSnapshot` class supports a nested restore, but the latch means an engine never reaches it.
- **Tab's post-claim initial write.** A consumer getter can destroy the tab during construction. The constructor then still saves its snapshot and writes the list's first role, and nothing ever releases either.

One I1 violation sits in the Tab. Its snapshot and its writes read the dropdown set at different times. A `blur` listener that runs between the two readings creates writes that `destroy()` never restores.

## 1. Station table

| # | File and symbol (line approx.) | Holding | Taken | Given back | I1 | I2 | Smallest input and reachability |
|---|---|---|---|---|---|---|---|
| C1 | `Collapse.ts` `show` stopped return, `#rewind` (~221–313, ~521) | `written` local records | `recordHostWrite` before each first changing write (~216–305; helpers.ts:950–966) | `rewindHostWrites` (helpers.ts:982–989) | holds: writes the recorded value and priority (helpers.ts:986); the fresh read only skips a write (helpers.ts:985) | holds: every written target is saved first (`#save` ~212, ~601–611), and `#owns` is read before each write (~522, helpers.ts:984) | — |
| C2 | `Collapse.ts` `hide` stopped return (~354–437) | `written` | same (~348–424) | same | holds | holds: `#save` ~344 covers every target | — |
| C3 | `Collapse.ts` `#hideSiblings` / `#acquire` supersession (~558–585) | the sibling engines it constructs | `#acquire` ~577–583 | `destroy` ~453, `#prune` ~589–597 | holds: acts on the recorded engine object | holds: added to `#owned` (~583) before its `hide()` dispatch (~566) | — |
| C4 | `Collapse.ts` `#prune` discard (~589–597) | an owned engine whose panel left the document | `#acquire` | `engine.destroy()` ~594 | holds | **violates**: `this.#owned.delete(engine)` (~593) runs before `engine.destroy()` (~594) returns | Accordion with panels A and B. `collapseB.show()` acquires and owns A's engine. Detach panel A. A's trigger is a custom element that observes `aria-expanded`, and its `attributeChangedCallback` calls `collapseB.destroy()`. The next `collapseB.hide()` prunes, and the owned engine's restore fires the reaction. The nested `collapseB.destroy()` no longer sees that engine in `#owned` and returns while its restoration is still running. Reachable through a platform reaction in consumer page code. Swapping the two lines alone does not close it, because of the latch (C5). |
| C5 | `Collapse.ts` `destroy` (~446–455) | registry claim, `#snapshot`, `#controller`, `#owned` | claim ~142; `#save`; `#acquire` | `release(host, this)` ~451 (Registry.ts:44–46), `restore` ~452, owned loop ~453, clear ~454 | holds | **violates**: the latch `if (aborted) return` (~447) returns before ~452–454 finish when a reaction inside them re-enters | `collapseB.show()` owns A's engine. B's trigger is a custom element that observes `aria-expanded` and calls `collapseB.destroy()`. Then call `collapseB.destroy()`: the restore writes that attribute last (HostSnapshot.ts:162–164), the nested call returns, and `Collapse.find(panelA)` still returns the live owned engine. Reachable through a platform reaction. |
| C6 | `Collapse.ts` constructor abort path (~143–158) | claim, listeners | ~142–146 | `destroy` ~148/~156 | holds | holds: a getter that destroys the collapse leads to no later write | — |
| C7 | `Collapse.ts` completed `hide` | show's writes | `show` | `hide` | n/a | n/a | The hide writes Bootstrap's hidden state (`aria-expanded="false"`, `collapsed`, ~396–403), not the value before the show. See referral R4. |
| T1 | `Tab.ts` `show` stopped return, `#rewind` (~222–293, ~357–360) | `written` | `recordHostWrite` ~224–282 | `rewindHostWrites` | holds | holds for the rewind (see T2 for the snapshot gap) | — |
| T2 | `Tab.ts` `destroy` (~299–306) | claim, `#snapshot` | `#save` ~216–217 reads `#dropdown` (~472–480) before the blur (~232) | `restore` ~305 | **violates**: `#selection` (~252, ~266) reads `#dropdown` again after consumer code ran, so it writes targets the snapshot never recorded (~517) | **violates**: the latch at ~300, same class as C5 | **I1:** in `ul.nav`, control B is active and focused, and control A exists. B has `b.addEventListener('blur', () => b.parentElement.classList.add('dropdown'))`. Run `const t = new Tab(A); await t.show(); t.destroy()`. B's `li` keeps `aria-expanded="false"`. Reachable through a platform event the engine's own `blur()` write dispatches. **I2:** control A is a custom element that observes `class` and calls `t.destroy()`. The restore writes tokens first, the nested call returns, and `aria-selected` on A still reads `"true"`. Reachable through a platform reaction. |
| T3 | `Tab.ts` constructor abort path and `#writeInitial` (~140–158, ~447–458) | initial role and state records, first write | `#writeInitial` ~451–455 | `destroy` | holds | **violates**: `#writeInitial` (~152) runs without reading the lifetime after the getters at ~144 and ~145. It saves every planned target (~451–453) and makes the first write (~455) after `destroy()` has returned. The records then pin the shared targets under E25, and nothing releases them. | `new Tab(control, { get signal() { Tab.find(control)?.destroy(); return undefined } })` over a `.nav` with no roles. After construction, `list.getAttribute('role') === 'tablist'` and `Tab.find(control) === undefined`. A getter on `on` does the same. Reachable through the documented options object, with a consumer getter. |
| K1 | `Carousel.ts` `#move` stopped return, `#rewind` (~376–617, ~690–693) | `written` | `recordHostWrite` | `rewindHostWrites` | holds | holds: `#save` ~373 covers every write target (~722–733) | — |
| K2 | `Carousel.ts` `#move` `finally`, timer and lock give-back (~623–626, ~695–699) | `#timer` (disarmed ~364), `#change` lock | ~358, ~364 | `#finish` ~697, `#arm` ~625 | n/a for the timer (not a page write); holds for the lock, which clears only while it still holds the same change (~697) | holds: `#arm` reads the lifetime (~742) | — |
| K3 | `Carousel.ts` constructor, Swipe acquisition (~200–211) | the `swipe` local (pointer token and listeners) | `new Swipe` ~201 (Swipe.ts:67–72) | ~208–209 or `destroy` ~300 | holds | **violates**: the `swipe` local cannot be reached from `destroy()` between ~201 and ~211, and the claim at ~182 makes the carousel findable | The host is a custom element that observes `class` and calls `Carousel.find(this)?.destroy()`. It then reads `this.classList.contains('pointer-event')`, which is `true` after `destroy()` returned. The page is restored only later, by ~209. Reachable through a platform reaction. |
| K4 | `Carousel.ts` `destroy` (~289–301) | `#timer`, `#touch`, claim, `#snapshot`, `#swipe`, `#controller` | various | ~292–300 | holds | **violates**: the latch at ~290. A nested call inside `restore` (~299) returns before `#swipe?.destroy()` (~300). | An item is a custom element that observes `class` and calls `carousel.destroy()`, then reads the host's `pointer-event` token. The token is still present and Swipe's listeners are still live. Reachable through a platform reaction. |
| K5 | `Carousel.ts` touch deferral (~809–818) | `#touch` timer | ~814 | callback ~815, `destroy` ~293 | n/a | holds: `#touch` is not reset after `clearTimeout`, but that is harmless because `#arm` reads the lifetime (~742) | — |
| K6 | `Carousel.ts` constructor abort path (~227–230) | everything | — | `destroy` | holds | holds after ~211. Getters at ~192 and ~221 that destroy the carousel are covered by ~208–210 and by `start` (~278). | — |
| S1 | `Swipe.ts` `destroy` (~79–83) | listeners, `pointer` token | ~67–72 | abort ~81, `restore` ~82 | holds | holds: the latch at ~80, but the only write is already done when a reaction inside it runs | — |
| S2 | `Swipe.ts` `#release` / `#cancel` (~95–106) | `#pointer` | ~89 | ~97, ~105 | n/a (no pointer capture is taken) | n/a | — |

## 2. Consumer code each station runs, and which fields are set while it runs

- **Collapse `show` and `hide`:**
  - The code:
    - the `show` and `hide` dispatches (~187, ~322);
    - each sibling's `hide` dispatch (~566);
    - synchronous custom-element reactions to every write;
    - any task during `settleAnimations` (~282, ~418);
    - the `shown` and `hidden` dispatches (~314, ~438).
  - The fields set: `#change` holds the call's identity; the snapshot records and `#owned` are held throughout.
  - During the rewind: reactions only.
  - During `destroy`: reactions inside `restore` and inside each owned engine's `destroy`. `#owned` is still set, while the claim and the controller are already released.
- **Tab `show`:**
  - The code:
    - the `hide` and `show` dispatches (~193–196);
    - `blur` and `focusout` from `outgoing.blur()` (~232), while `#change` is set and the snapshot is saved, and before `#selection` reads again;
    - reactions;
    - the fade await (~287);
    - the `hidden` and `shown` dispatches (~292, ~295).
  - The constructor runs consumer getters `on` (~144) and `signal` (~145) after the claim (~140) and before `#writeInitial`.
- **Carousel `#move`:**
  - The code: the `slide` dispatch (~341), reactions, the await (~528), and the `slid` dispatch (~619), which runs after `#finish` has cleared `#change` (~618).
  - The constructor runs getters and the Swipe's token reaction while the local `swipe` is unassigned (K3).
  - During `destroy`: reactions inside `restore` while `#swipe` is still set.
- **Swipe:** the handler (~100), which reaches Carousel `#step` and its `slide` dispatch. No release station is active then.

## 3. The source

The shared record mechanism (`recordHostWrite`, `rewindHostWrites`, `HostSnapshot`) holds I1 wherever the take and the write read one target list. The class recurs in S4 in three places:
- Each `destroy()` opens with an `if (aborted) return` latch, so a re-entrant call returns early. This leaves the nested-restore support in HostSnapshot.ts:53–59 unused.
- A holding can sit outside what `destroy()` reaches: Tab's post-claim `#writeInitial`, and Carousel's local `swipe`.
- Tab reads the dropdown set again after consumer code has run.

One change at the source would close the I2 rows: a shared engine lifecycle that registers each holding when the engine acquires it, and that on re-entry continues the release in progress instead of returning. The Tab I1 row closes separately: compute the write set once, at the take.

## 4. Claims I could not break

- `rewindHostWrites` writes only the recorded value and priority. It stops at the first failed `owns` read (helpers.ts:982–989).
- Every Collapse and Carousel write target is in the snapshot before its first write (Collapse ~212/~344 against ~601–611; Carousel ~373 against ~722–733).
- A door that fails for any reason other than a takeover moves the identity first, so the rewind writes nothing (Collapse ~499, Tab ~336, Carousel ~666).
- `#acquire` registers an owned engine before its `hide` dispatch (~583 before ~566).
- The Carousel timer cannot re-arm after `destroy` (~742, ~278). `#finish` clears the lock only while it still holds the same change (~697).
- `settleAnimations` settles on abort and releases its local controller in `finally` (helpers.ts:98–121).
- `Registry.release` acts on the recorded engine (Registry.ts:44–46).
- Getters in the Collapse and Carousel constructors that destroy the engine lead to no later write.
- Swipe's `destroy` leaves nothing held.

## Referrals to the Orchestrator

No verdict from me on these.

- **R1 (E24 against I2).** The amendment to E24 rules that a restoration a reaction interrupts is "conforming" when "the page ends restored". The outer `destroy` does finish in C5, T2, and K4. I2's letter requires the nested call to finish before it returns. Rule which one binds before the repair unit treats C5, T2, and K4 as work.
- **R2 (E25 against the consumer interface, Tab).**
  - Input: in `.nav`, B is active. Run `new Tab(A)`, `new Tab(B)`, `await tabA.show()`, `tabA.destroy()`.
  - Result: B carries `active` with `aria-selected="false"`, and A reads `aria-selected="true"` with no `tabindex`.
  - Cause: the `active` token and `tabindex` of B are held only by A, so A's destroy restores them. The records of `aria-selected` on A and B, and of A's `tabindex`, have a second holder through B's initial plan, so they stay.
  - The split is reachable through shipped code. It follows E25 and Tab.ts:74–77, and it conflicts with "destroy() restores every write the engine made".
- **R3 (the over-correction bound against E25).** Some snapshots record targets the call never writes:
  - Carousel saves all five item tokens on both items (~724–728).
  - Tab joins planned attributes it does not write (~451–453).

  In each case the snapshot records the target whether or not a write follows. Example: after a forward slide, a consumer adds `carousel-item-end` to an item. `destroy` then removes it, although the carousel never wrote it. This conflicts with "it records nothing for a write that changed nothing".
- **R4.** Decide whether "a completed `hide` returns every write its `show` made" governs engines that switch state, such as Collapse (C7). The alternative is that it governs only engines that acquire resources.
