# J-CAROUSEL audit round 2 — the objective lane's verdict (`analyst` on GPT-6 Astra through `codex exec`, read-only sandbox; retained verbatim from the journal's last agent message)

Thread `01a0d219-e98a-7300-a22e-892c4a0efaa6`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-carousel-audit-2.jsonl` (launch copy under `tmp/codex/`); 65 commands; 572 s; usage {"input_tokens":3321682,"cached_input_tokens":3129856,"cache_write_input_tokens":0,"output_tokens":15324,"reasoning_output_tokens":5210}. Retained verbatim from the exec's last message.

---

Objective lane — source review and supplied execution evidence; no browser tests, builds, or mutations rerun.

Paths below are relative to the carousel worktree; evidence filenames beginning `j-carousel-` are under the brief’s `engine/units/` directory.

1. **CONFIRMED — Destruction inside swipe construction.**

   Attack: destroy the carousel synchronously when `Swipe` adds its pointer token. The carousel reads its aborted signal after construction, destroys the returned swipe, and leaves `#swipe` undefined (`src/browser/Carousel.ts:173`, `:181`). `Swipe.destroy()` aborts its listeners before restoring the token (`src/browser/Swipe.ts:79`). Later listener registrations use the already-aborted carousel signal.

   The proof at `tests/src/browser/Carousel.test.ts:1579` distinguishes **“keep the constructed swipe despite destruction”** through its exact host-class assertion. The recorded mutation is `EXACT` (`j-carousel-mutations-2.log.txt:91`), consistent with the original red assertion (`j-carousel-red-2.log.txt:103`).

   Bound: its unchanged-index assertion alone would not distinguish a leaked listener whose callback reaches the carousel’s aborted guard. Listener teardown follows from the actual `Swipe.destroy()` mechanism; the standalone swipe proof also asserts no post-destruction handler report (`tests/src/browser/Swipe.test.ts:117`).

2. **CONFIRMED — The specified slide doors and their proofs.**

   Attacks: destruction at each write; re-entry during dispatch and during writes; removal of either participating item; alteration of the phase’s required tokens; rewriting the indicator attribute immediately after its write.

   All movement entries converge on `#move`: direct steps, queued `slide`, keys, swipes, timer ticks, and delegated controls. Its doors are:

   | Door | Read that prevents the next write |
   |---|---|
   | `slide` dispatch | Lifetime, in-flight change, slide tally, outgoing active identity, incoming membership and inactive state (`Carousel.ts:304`) |
   | Leaving indicator loses `active` | Item active states, indicator inactive state, previous `aria-current` (`:338`) |
   | Leaving indicator loses `aria-current` | Same token states, attribute absent (`:354`) |
   | Arriving indicator gains `active` | Item active states, indicator active state, previous attribute (`:369`) |
   | Arriving indicator gains `aria-current` | Same token states, attribute `"true"` (`:385`) |
   | Incoming order token | Outgoing active, incoming order present; incoming active and outgoing order absent (`:400`) |
   | Outgoing direction token | Adds outgoing direction to those requirements (`:418`) |
   | Incoming direction token and transition wait | Requires both direction tokens and the preceding order/active states (`:432`) |
   | Incoming transient-token removal | Requires those tokens absent and outgoing active/direction retained (`:445`) |
   | Incoming activation | Requires incoming active, outgoing active/direction, transient-token absences (`:463`) |
   | Outgoing cleanup | Requires incoming active and all specified outgoing/transient tokens absent (`:481`) |

   Every write door additionally checks lifetime and participating-item membership through `#holds` (`:511`, `:528`). A reaction runs before that post-write read under the platform’s [custom-element reaction ordering](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions). Destruction therefore stops subsequent writes. Re-entrant steps refuse while `#change` exists; `slide` waits. Dispatch re-entry remains permitted, with the tally rejecting the superseded outer operation.

   Proof binding:

   | Proof location | Mutation it distinguishes | Assertion evidence |
   |---|---|---|
   | `Carousel.test.ts:1607` | Remove the dispatch’s slide-tally comparison | Outer result must be false, inner results true, exact event sequence and final classes |
   | `:1646` | Remove indicator attribute comparisons | False result, preserved `"step"`, no subsequent writes or `slid` |
   | `:1692` | Remove outgoing-order absence from `blocked` | No subsequent writes; this matters because later completion checks could still return false |
   | `:1737` | Remove pair-membership checking | False result, detached incoming item retains only the order token, no subsequent writes |

   Each named case is `EXACT` in `j-carousel-mutations-2.log.txt:92` through `:95`. These rows bind the named proofs, rather than merely reporting a failing file. The retained queue and re-entry assertions distinguish replacing queueing with refusal and deleting the post-dispatch refusal (`j-carousel-mutations-2.py:81`, `:172`; `Carousel.test.ts:417`, `:1446`).

   Bound: indicator checks cover the indicator at its own write doors. They do not establish continuous protection against arbitrary later edits to previously processed indicators.

3. **BROKEN — A dispatch-time pause is lost, and `#touched` survives subsequent mouse use.**

   **Pause interleaving:** construct an interaction ride with `pause: false`, a short interval, and a `slide` listener that calls `carousel.pause()`. Call `next()` on ordinary, nonanimated markup. Dispatch invokes the listener at `Carousel.ts:305`; `pause()` increments `#pauses`. The operation captures that already-incremented value only at `:327`. Completion finds equality at `:500`, calls `start()`, and resumes cycling.

   This contradicts the claim that a pause during the slide holds. The smallest repair is to capture the pause tally before the pre-change dispatch, preserving the existing completion comparison.

   **Touch-to-mouse interleaving:** use the trusted-tap fixture, whose mouse is initially inside the host. After tapping, move or click the real mouse within that same host without leaving it. `#touched` remains true: only `#leave()` clears it (`Carousel.ts:620`), mouse releases return before changing it (`:648`), and no mouse-pointer movement handler clears it. Consequently `start()` or an interaction completion bypasses real mouse hover at `:593`.

   Switching input devices does not require a host `mouseleave`; legacy mouse boundary events track an effective mouse position. Moving within the same target need not produce a boundary transition. This source-derived interleaving is consistent with the [Pointer Events compatibility mapping](https://w3c.github.io/pointerevents/#tracking-the-effective-position-of-the-legacy-mouse-pointer).

   **Mechanism ruling:** remembering touch-origin hover is justified because `:hover` alone cannot distinguish the demonstrated sticky tap from mouse hover. The existing boolean has insufficient invalidation. Retain the touch-delay behavior, but invalidate the exemption on genuine mouse-pointer activity and reapply hover pausing. Clearing on compatibility `mouseenter` alone would undermine the tap repair.

   The supplied proofs bind their narrower mutations:

   | Proof | Mutation | Does it distinguish it? |
   |---|---|---|
   | Pause in `slid` (`Carousel.test.ts:842`) | Remove the pause-tally equality | Yes: the event count must remain unchanged |
   | Hover during animation (`:864`) | Remove arming’s hover read | Yes: quiet interval followed by resumed cycling after leaving |
   | Touch during animation (`:896`) | Remove pending-touch refusal | Yes: measured restart must respect the touch delay |
   | Key under hover (`:926`) | Remove hover refusal | Yes: no cycling while inside, then cycling after leaving |
   | Trusted tap (`:948`) | Remove the `!#touched` exemption | Yes: waits for cycling and asserts the host still matches `:hover` |
   | Key interaction ride (`:985`) | Pass `interactive: false` from `#navigate` | Yes: the independent key recorder must reach subsequent cycles |
   | Swipe interaction ride (`:985`) | Pass `interactive: false` from `#swiped` | Yes: the independent swipe recorder must reach subsequent cycles |

   The `EXACT` and `JOINED` results name these cases (`j-carousel-mutations-2.log.txt:96` through `:101`). Joining another relevant failure does not erase their assertion-level binding. None exercises a pause in `slide` dispatch or mouse use after a tap; those cases require new proofs.

4. **CONFIRMED — Restoration order, within the stated snapshot bound.**

   Attack: construct and move a replacement carousel during restoration of the host’s pointer token. The old carousel releases its claim and restores its item/indicator snapshot before destroying its swipe (`Carousel.ts:255`). The replacement therefore encounters restored items.

   The mutation **“restore the swipe before the items”** changes that ordering. The proof checks original item classes after destroying the replacement (`Carousel.test.ts:1015`, especially `:1045`); the recorded result is `EXACT` (`j-carousel-mutations-2.log.txt:102`).

   The changed fixture is justified. An item-restoration reaction can use `HostSnapshot`’s published-target handoff (`HostSnapshot.ts:124`, `:241`, `:256`), so that fixture would not distinguish the ordering repair.

   The second-snapshot limitation remains explicitly documented at `guides/veneer.md:957`: a replacement constructed during item restoration can have its pointer token overwritten by the old swipe’s later restoration. This is the named J-SNAPSHOT-SHARED bound.

5. **CONFIRMED — Carousel delegation, lifetime checks, and E12 refusal.**

   Attack: let an earlier button route destroy the inner delegate while an outer delegate remains live. The carousel route checks lifetime before marking or preventing (`Delegate.ts:258`). The outer delegate can therefore acquire and drive the carousel.

   Removing that lifetime check distinguishes the proof at `Delegate.test.ts:1352`: destroying the outer delegate must remove the resulting carousel. A dead inner delegate retaining ownership fails that assertion. The mutation is `EXACT` (`j-carousel-mutations-2.log.txt:103`).

   Attack: destroy the delegate from the carousel’s construction-time pointer-token reaction. `#construct` destroys the returned engine and refuses acquisition (`Delegate.ts:276`). Removing its lifetime branch distinguishes the undefined registry lookup, absent slide event, restored host and original active item at `Delegate.test.ts:1380`. Recorded result: `EXACT` (`j-carousel-mutations-2.log.txt:104`).

   Nested roots share an event/route/host mark (`Delegate.ts:325`); removing it makes the nested-root index assertion fail (`Delegate.test.ts:1249`). E12 conflicts are checked before routing, using contained controls and exact host equality; an existing consumer engine permits the other route to construct (`Delegate.ts:176`, `:206`; `Delegate.test.ts:1270`, `:1303`).

   Bound: destruction during construction occurs after marking. This claim does not establish that such a mark is withdrawn for an outer delegate.

6. **CONFIRMED — Pointer vocabulary and public declarations.**

   Attack: ignore the carousel’s pointer replacement while preserving its other groups. The engine passes the resolved token to `Swipe` (`Carousel.ts:176`); the vocabulary proof explicitly requires `is-swipeable` and forbids `pointer-event` (`Carousel.test.ts:1916`). Removing that argument makes the named proof fail, recorded `EXACT` (`j-carousel-mutations-2.log.txt:105`).

   `CarouselClassMap.pointer` and its default agree (`types.ts:1986`; `constants.ts:89`), and the frozen-table proof includes the token (`Carousel.test.ts:36`). `CarouselVocabulary` declares the resolved groups, is exported through the type barrel, and types `Delegate.#carousel` (`types.ts:105`; `Delegate.ts:78`).

   The `expectTypeOf` row checks the required resolved-group shape (`tests/src/browser/index.test.ts:19`). Making a group optional would invalidate that compiler assertion; a browser mutation run alone would not establish this type-level property. The supplied tree-wide compiler gate is green (`j-carousel-gates-2.log.txt:586`).

   The ride wording and Methods patches appear in the captured diff (`j-carousel-2.diff:1668`, `:1695`, `:1722`).

7. **BROKEN — The guide overstates pause preservation and delegate mark preservation.**

   The statement that a pause during the slide prevents interaction restart (`guides/veneer.md:849`, `:853`) is false for the `slide`-listener interleaving in claim 3. Carry its correction with the timer repair.

   The statement that a listener destroying the delegate during a click leaves the carousel unmarked (`guides/veneer.md:971`) is also too broad. A carousel’s own `slide` listener runs after `Delegate.#mark` at `Delegate.ts:264`. If that listener destroys the delegate, the mark remains and an outer delegate refuses it. Qualify this sentence to destruction in an earlier route before the carousel is marked; no route change is required for that wording correction.

   The other named corrections withstand comparison: attribute routing, construction-scan rethrow, pointer and entry tables, ride summaries, restoration ordering and bound, stopped `load` rides, and the incoming wait target. Bootstrap waits on the outgoing item (`node_modules/bootstrap/js/src/carousel.js:365`) and its control route calls `_maybeEnableCycle` (`:432`). Veneer’s corresponding departures are documented.

   `test:guides` passing establishes its checked parity, not these behavioral sentences’ truth (`j-carousel-gates-2.log.txt:91`).

8. **CONFIRMED — Added controls and the retained first-run reconstruction.**

   Attack: make the stylesheet control fail without changing the engine. The instrument removes `touch-action: pan-y` from the source stylesheet (`j-carousel-mutations-2.py:290`). The test imports that stylesheet and asserts the computed value (`Carousel.test.ts:30`, `:101`); the named failure is `EXACT` (`j-carousel-mutations-2.log.txt:106`). This binds the declaration proof.

   The key and swipe controls independently bind their respective recorder conditions, as ruled in claim 3.

   Comparing the reconstructed instrument with the retained accepted round-1 instrument confirms the described differences: unchanged edits for pointer-leave restart and position routing; unchanged pause mutation with a changed case name; and the indicator mutation widened from one door to all matching doors (`j-carousel-mutations-first-run.py:101`, `:108`, `:165`, `:197`; worktree `tmp/j-carousel/mutations.py`).

   The stylesheet belongs to the digest population (`j-carousel-mutations-2.py:31`). I independently compared its current bytes with `HEAD`; they match. All recorded post-run digests also match the current files.

   Bound: the first-run artifact explicitly identifies itself as a reconstruction. This confirms the retained comparison, not independent provenance of the historical invocation.

9. **UNRESOLVED — Landing replay remains absent.**

   The required `j-carousel-mutations-2-orchestrator.log.txt` is absent. The Orchestrator’s completed replay, naming the expected failing cases and restoring the landing bytes, would settle this clause.

   The remaining current-artifact checks hold: the status matches the owned-file list; the `types.ts` diff carries the permitted vocabulary and documentation changes; the supplied gates record successful exits; the mutation log contains the named `EXACT`/`JOINED` failures and successful restored controls (`j-carousel-2-status.txt:1`; `j-carousel-2.diff:1628`; `j-carousel-gates-2.log.txt:22`, `:78`, `:586`; `j-carousel-mutations-2.log.txt:107`).

   The recorded closing line is:

   `receipt: restored byte for byte`

   Added implementation lines contain none of the prohibited TypeScript escape hatches or Bootstrap event wiring. The added element checks use `isInstance`; older untouched delegate checks are not evidence about added lines. The report records no `prove` call (`j-carousel-report-2.md:120`). The historical intermediate restoration hash for `types.ts` is writer-reported; the final permitted diff is independently inspectable.

**Findings fitting no claim:** none.

**Attacked and held:** Ordinary hover without a preceding tap remains protected; a pause in `slid` remains protected. Neither establishes the missing claim-3 interleavings. The event guard contains throwing accessors and rejects invalid directions and positions (`validators.ts:160`; `validators.test.ts:170`, `:198`). Its controls remove direction validation and exception containment. `parseRide` preserves the declared spellings and rejects other inputs; controls admitting arbitrary strings and dropping Bootstrap spellings distinguish its assertions (`parsers.ts:56`; `parsers.test.ts:48`). Incoming-animation waiting, queued slides, and the documented snapshot bounds remain intact.

**Referrals:** Item C carries the dispatch-time pause and touch-to-mouse repairs, with proofs that distinguish each missing behavior. Item G carries the corresponding timer sentence and the earlier-route qualification. The Orchestrator must reproduce the new source-derived interleavings before accepting their fixes and complete the pending landing replay.

**Bounds:** This lane ran read-only artifact comparisons, not runtime reproductions. Behavioral confirmations rely on source traces and supplied execution records. No source was changed, no other lane’s verdict was read, and no `prove` call or refusal occurred. No probe receipt is claimed. E13, J-SNAPSHOT-SHARED, and E16 remain their assigned shared-work bounds.

VERDICT: FAIL 3, 7, 9; outside the claims: none
