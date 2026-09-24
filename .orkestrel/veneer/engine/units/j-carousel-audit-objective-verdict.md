# J-CAROUSEL audit round 1 — the objective lane's verdict (GPT-6 Astra through codex exec, read-only)

Thread `01a0d1d9-47bf-7423-a7cc-7653f09e1040`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-carousel-audit.jsonl` (launch copy under `tmp/codex/`); 40 commands; 555 s; usage {"input_tokens":3021649,"cached_input_tokens":2835328,"cache_write_input_tokens":0,"output_tokens":15197,"reasoning_output_tokens":5000}. Retained verbatim from the exec's last message.

---

Objective lane. Source review; the interleavings below were derived, not executed.

Paths are relative to `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel`. `M` denotes the retained `j-carousel-mutations.log.txt`; its suffixes below are file line numbers.

1. **BROKEN — Construction, options, and lifetime.**

   A custom-element host can call `Carousel.find(this)?.destroy()` synchronously when Swipe adds `pointer-event`. Carousel has claimed the host, but its `#swipe` assignment has not completed. Destruction therefore skips the swipe; Swipe subsequently installs its own live listeners, and the constructor assigns it to an already-destroyed carousel. Later destruction returns immediately, leaving the pointer token and listeners behind. Evidence: [Carousel.ts:141](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/src/browser/Carousel.ts:141), `Carousel.ts:155`, `Carousel.ts:225`, [Swipe.ts:67](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/src/browser/Swipe.ts:67).

   Smallest correction: after child construction, reconcile the parent’s lifetime and destroy the completed child if the parent was destroyed during construction. Add a construction-write reaction proof.

   The carried D3 also remains: replacing every available Carousel class key still writes `pointer-event`, explicitly asserted at `tests/src/browser/Carousel.test.ts:1496`. Thread the proposed pointer vocabulary through the default table and Swipe construction.

   The invalid-host, invalid-group, duplicate-owner, constructor-precedence, and ordinary aborted-signal attacks otherwise hold. Validation precedes claiming, and explicit constructor options bypass invalid overridden attributes (`Carousel.ts:100`, `Carousel.ts:105`, `helpers.ts:222`).

2. **BROKEN — The slide sequence and its doors.**

   The ordinary write sequence matches Bootstrap’s `_slide`, with the stated incoming-animation wait and delayed timer restart (`Carousel.ts:292`; `node_modules/bootstrap/js/src/carousel.js:341`). The takeover guarantee does not hold at every door:

   | Door | Admitted reaction and consequence |
   |---|---|
   | After `slide` dispatch | A listener adds `active` to incoming while outgoing remains the first active item. The dispatch check accepts it; the engine writes an indicator or incoming order token before discovering incoming’s active token. `Carousel.ts:273`, `Carousel.ts:299`, `Carousel.ts:330`. |
   | Indicator token removal/addition | A reaction writes that indicator’s `aria-current`. The door checks only item tokens; the following attribute write removes or overwrites the reaction’s value. `Carousel.ts:299`, `Carousel.ts:306`, `Carousel.ts:315`, `Carousel.ts:322`. |
   | Incoming order, outgoing direction, incoming direction, and transition wait | A reaction adds the outgoing order token. No door requires it absent; completion removes it. The call writes over the reaction’s state. `Carousel.ts:330`, `Carousel.ts:343`, `Carousel.ts:355`, `Carousel.ts:366`, `Carousel.ts:409`. |
   | Incoming transition-token removal and incoming activation | The same outgoing-order addition remains unobserved and is subsequently removed. `Carousel.ts:369`, `Carousel.ts:385`, `Carousel.ts:409`. |
   | Outgoing completion write | A reaction restores outgoing’s order token. The final absent set omits that token, so the method dispatches `slid` and returns true with it still present. `Carousel.ts:400`. |

   Destruction is checked after each wrapped write. Removing a required item token is also detected at the covered doors. However, `#holds` checks neither item membership nor indicator state (`Carousel.ts:426`). Removing incoming from the host during its order-token reaction leaves the engine writing to the detached item.

   Re-entry also has an identity gap. Without the host’s `slide` token, a guarded `slide` listener can synchronously call `slide(2)` and then `slide(0)`. Both finish before the outer dispatch returns. The original outgoing item is active again and `#change` is clear, so the outer call proceeds instead of yielding to the newer calls (`Carousel.ts:270`, `Carousel.ts:275`, `Carousel.ts:414`). The existing re-entry proof changes the active item only once (`tests/src/browser/Carousel.test.ts:1224`).

   Smallest correction: retain a takeover identity across dispatch, and make each door validate the state needed before subsequent writes, including overwritten indicator values, item membership, and outgoing order. Preserve permitted re-entry; E15 does not justify refusing every nested Carousel call.

3. **BROKEN — Timer, hover, keys, and touch.**

   An interaction ride defeats a `slid` listener’s `pause()`: dispatch invokes the listener, then the engine unconditionally calls `start()`, restoring `#started` and arming a timeout (`Carousel.ts:415`, `Carousel.ts:214`). The pause proof supplies no interaction ride (`tests/src/browser/Carousel.test.ts:769`).

   Hover during an animated slide also loses. A running carousel captures `cycling = true`; `mouseenter` during the await clears the already-suspended timer without clearing `#started`; the slide’s `finally` re-arms while the pointer remains inside (`Carousel.ts:152`, `Carousel.ts:286`, `Carousel.ts:365`, `Carousel.ts:420`). A touch deferral during that await can similarly be bypassed by completion’s restart (`Carousel.ts:544`). The hover and touch proofs use hosts without `slide`, so they do not exercise these interleavings (`tests/src/browser/Carousel.test.ts:694`, `tests/src/browser/Carousel.test.ts:832`).

   Smallest correction: preserve suspension or pause changes made after slide entry, and make completion’s interaction restart respect them. Add animated hover/touch cases and the interaction-ride pause case.

   D1 holds: construction-time pointer marking matches Bootstrap’s Swipe initialization and the shipped `touch-action` rule (`Swipe.ts:68`; `node_modules/bootstrap/js/src/util/swipe.js:128`; `src/styles/components/_carousel.scss:15`). D2’s engine-owned interaction start is a workable design, but its present ordering overwrites explicit pause. The key mapping, text-control guard, pointer pairing, strict threshold, cancellation, and drag scoping withstand the supplied attacks.

4. **BROKEN — Destruction and restoration.**

   Restoration is split across snapshots. Carousel releases its claim, restores Swipe’s host token, and only then publishes/restores its item snapshot (`Carousel.ts:232`, `Swipe.ts:82`, `Carousel.ts:234`).

   Concrete interleaving: start with items A, B, C and A active; complete A→B. During destruction, a custom-element host’s reaction to removal of `pointer-event` constructs a replacement Carousel with `touch: false` and synchronously moves B→C. The replacement saves B and C before the old item snapshot publishes anything. The old restoration then restores A’s active token and removes B’s, leaving A and C active. The replacement’s later restoration also retains B’s intermediate state as its baseline.

   `HostSnapshot` transfers only targets already published by an active restoration; it cannot transfer the old Carousel snapshot before that restoration starts (`HostSnapshot.ts:82`, `HostSnapshot.ts:124`, `HostSnapshot.ts:134`, `HostSnapshot.ts:256`).

   Smallest correction: publish all state owned by the Carousel/Swipe destruction before its first reaction-producing restoration write, through a coordinated restoration operation. Reordering the separate restorations alone does not establish that invariant.

   Ordinary destruction during an animation, queued-call abandonment, and preservation of unrelated consumer classes/attributes are distinguished by the existing assertions. This finding concerns replacement construction during the split restoration, not E13’s accepted empty-attribute residue.

5. **BROKEN — Delegate route, scan, and E12.**

   A click can destroy its delegate in an earlier route and still acquire and drive a Carousel. Use a button trigger that is also a slide control targeting a different carousel host. Its `toggle.vn.button` listener calls `delegate.destroy()`. `#activate` continues into `#routeCarousel`, which has no aborted check before marking, preventing, acquiring, or driving (`Delegate.ts:188`, [Delegate.ts:265](C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/src/browser/Delegate.ts:265)).

   The new engine is added after `destroy()` cleared ownership; `#acquire` reconnects the observer, and subsequent destruction returns immediately (`Delegate.ts:171`, `Delegate.ts:329`). Under nested roots, the destroyed inner delegate’s mark also prevents the live outer delegate from handling that carousel.

   Smallest correction: check lifetime before the route marks anything, and reconcile lifetime again after reaction-producing construction before acquisition or driving.

   E12’s ordinary same-host refusal holds: conflicts are checked before routes and marks, while an existing owner permits the remaining construction. Separate hosts and per-delegate root boundaries remain permitted (`Delegate.ts:187`, `Delegate.ts:212`). Ordinary nested-root deduplication, load scanning, consumer ownership, and scan-failure cleanup also hold on the supplied cases.

6. **CONFIRMED — Guard, tables, parser, helper, and barrel.**

   Attacks with an SVG target, invalid direction, negative/fractional positions, non-events, and throwing prototype/detail accessors are rejected by the contained guard (`validators.ts:160`; `tests/src/browser/validators.test.ts:172`, `:199`). The installed `isInstance` and `isRecord` implementations contain their own hostile-input checks (`node_modules/@orkestrel/contract/dist/src/core/index.js:933`, `:1142`).

   Boolean `true`, boolean `false`, unknown strings, whitespace variants, and coercible objects do not bypass `parseRide`’s exact string comparisons (`parsers.ts:54`; `tests/src/browser/parsers.test.ts:47`). An element belonging to a document without a view returns false rather than reading the global preference (`helpers.ts:313`; `tests/src/browser/helpers.test.ts:607`).

   The tables are frozen and carry the stated values (`constants.ts:75`). The default pause translation does not mean that `data-bs-pause="hover"` is accepted. The barrel exports the classes and centralized additions (`index.ts:11`; `tests/src/browser/index.test.ts:15`). D5’s exported constants follow centralized-data and barrel rules and have real consumers.

7. **BROKEN — Guide and returned patches.**

   The retained types patch does **not** add `CarouselClassMap.pointer`; it changes documentation only. The report separately proposes that member and explicitly says the constant and Swipe-construction changes would still be needed (`j-carousel-patches/j-carousel-types.diff:1`; `j-carousel-report.md`, “Deviation state” D3 and “Shared-file patches” point 3). Applying the returned patches therefore does not close the vocabulary gap.

   The patches also leave the lifecycle and takeover contradictions established above: guide statements about honoring pause, stopping after takeover, and restoring during replacement construction exceed the implementation (`guides/veneer.md:843`, `:933`, `:943`). The types patch retains “mirroring Bootstrap’s `ride` option” while expanding interaction starts to programmatic and keyboard slides, which the guide itself correctly identifies as a departure (`j-carousel-patches/j-carousel-types.diff:19`; `guides/veneer.md:976`).

   Smallest correction: supply the actual pointer implementation/type patch, repair the mechanisms, and align the remaining contract sentences and guide rows with the resulting behavior. The example’s ordinary construction/move/destroy sequence is supported by the source (`guides/veneer.md:464`). The supplied guide gate applies to the current tree, not a subsequently patched tree.

8. **UNRESOLVED — Scope, gates, and added lines.**

   The supplied status and diff identify the owned files; the helper change is confined to `matchesReducedMotion`. The recorded gate exits are accepted without rerunning them (`j-carousel-status.txt:1`; `j-carousel.diff:1349`; `j-carousel-gates.log.txt:21`, `:580`).

   The accepted mutation log records the stated classifications, green controls, and `receipt: restored byte for byte` (`M:2`, `M:91`, `M:99`). The instrument restores captured bytes in `finally`, but classifies failures by test title rather than retaining their failing assertion in this log (`j-carousel-mutations.py:285`, `:295`). A whole-file `JOINED` row therefore needs the assertion-level reading below.

   The Orchestrator replay clause remains **UNRESOLVED**, as instructed. Its retained replay and restoration receipt would settle that clause. The first-run log shows the reported misses, and current assertions address their vectors; without the earlier test/instrument bytes, the claim that only tests changed cannot be independently established (`j-carousel-mutations-first-run.log.txt:25`, `:28`, `:54`, `:69`).

   Proof binding follows. “Binds” means the inspected assertion distinguishes the named mutation; it does not certify an independent replay or every clause in a compound test title.

   | Proof location | Mutation and binding |
   |---|---|
   | `Carousel.test.ts:35` | Unfreeze `CAROUSEL_CLASSES`; freeze assertion binds, `M:51`. |
   | `Carousel.test.ts:84` | Removing the shipped `pan-y` or transform declaration would fail its computed-style assertions. No retained mutation exercises this proof. |
   | `Carousel.test.ts:109` | Omit incoming direction, outgoing-indicator removal, or incoming `aria-current`; token/attribute assertions bind, `M:3`, `:5`, `:6`. |
   | `Carousel.test.ts:172` | Use forward order for backward movement; transient-token assertion binds, `M:2`. |
   | `Carousel.test.ts:211` | Force wrapping; endpoint result binds, `M:4`. |
   | `Carousel.test.ts:249` | Returning true from a refusal would fail its result assertions. No retained row reddens this case. |
   | `Carousel.test.ts:288` | Include nested items; index/range assertions bind, `M:13`. |
   | `Carousel.test.ts:316` | Always await settling; immediate `slid` assertion binds, `M:8`. |
   | `Carousel.test.ts:338` | Skip settling; completion ordering and remaining-animation assertions bind, `M:7`. |
   | `Carousel.test.ts:367` | Replace settling with a zero timeout; opacity-completion ordering binds, `M:9`. |
   | `Carousel.test.ts:391` | Refusing manual movement under reduced motion would fail. Its only recorded failure is the unrelated constructor-destruction mutation at `M:44`; that row does not bind reduced-motion completion. |
   | `Carousel.test.ts:415` | Refuse queued `slide`, or queue `next`; results and event sequence bind, `M:11`, `:12`. |
   | `Carousel.test.ts:455` | Ignore prevention; result and mutation-record assertions bind, `M:10`. |
   | `Carousel.test.ts:493` | Reuse detail, make `slid` cancelable, or admit malformed hook events; identity/flags/hook assertions bind, `M:14`, `:15`, `:16`. |
   | `Carousel.test.ts:539` | Leave pause’s timer armed; post-pause event assertion binds, `M:18`. |
   | `Carousel.test.ts:565` | Ignore item interval; handover assertion binds, `M:17`. |
   | `Carousel.test.ts:584` | Remove load start; cycling assertion binds, `M:21`. |
   | `Carousel.test.ts:624` | Ignore reduced motion when arming; quiet-period assertion binds, `M:19`. |
   | `Carousel.test.ts:645` | Drop visibility checks; hidden-host event assertion binds, `M:20`. |
   | `Carousel.test.ts:666` | Remove interaction start or start every interactive slide; cycling/quiet assertions bind, `M:22`, `:23`. |
   | `Carousel.test.ts:694` | Restart despite prior hover suspension, remove enter suspension, or remove leave resume; assertions bind, `M:24`, `:27`, `:28`. Animated hover remains uncovered. |
   | `Carousel.test.ts:742` | Start every interactive slide; its initially quiet state distinguishes the mutation, `M:23`. |
   | `Carousel.test.ts:769` | Ignore `#started` in final restart; post-listener quiet state binds, `M:25`. Interaction rides remain uncovered. |
   | `Carousel.test.ts:794` | Omit restart after takeover; later-cycle assertion binds, `M:26`. |
   | `Carousel.test.ts:832` | Drop deferral, defer mouse release, or retain the earlier touch timer; timing assertions bind, `M:29`, `:30`, `:31`. Animated completion remains uncovered. |
   | `Carousel.test.ts:896` | Swap arrows, drop text guard/default prevention, or ignore keyboard option; index and trusted-event assertions bind, `M:32`–`:35`. |
   | `Carousel.test.ts:953` | Swap swipe direction; index assertion binds, `M:36`. |
   | `Carousel.test.ts:978` | Drop drag refusal or its item scope; dispatch results bind, `M:37`, `:38`. |
   | `Carousel.test.ts:993` | Construct Swipe despite touch-off; pointer-token assertion binds, `M:39`. Its `pause: false` fixture cannot independently prove touch-off suppresses deferral. |
   | `Carousel.test.ts:1017` | Omit abort or Swipe destruction; results/events/restored-host assertions bind, `M:40`, `:41`. |
   | `Carousel.test.ts:1084` | Removing timer clears alone remains unobserved, as D6 states. No retained row binds this case to callback release. |
   | `Carousel.test.ts:1102` | Omit item saving or indicator-attribute saving; restored-state assertions bind, `M:42`, `:43`. |
   | `Carousel.test.ts:1137` | Skip post-write reads; post-destruction writes distinguish it, `M:52`. |
   | `Carousel.test.ts:1192` | Remove post-dispatch refusal; item-write assertion distinguishes it as a joined failure, `M:53`. |
   | `Carousel.test.ts:1224` | Remove post-dispatch refusal; outer-item tokens distinguish it, `M:53`. Return-to-origin re-entry remains uncovered. |
   | `Carousel.test.ts:1265` | Remove item checks from indicator doors; post-reaction writes distinguish it, `M:54`. |
   | `Carousel.test.ts:1310` | Stop checking incoming order; post-reaction writes distinguish it, `M:55`. |
   | `Carousel.test.ts:1357` | Remove post-transition read; false result and retained transient tokens distinguish it, `M:56`. |
   | `Carousel.test.ts:1382` | Stop checking incoming active at completion; later writes/events distinguish it, `M:57`. |
   | `Carousel.test.ts:1422` | Ignore classes, attributes, or selectors; replacing-vocabulary assertions bind, `M:46`–`:48`. The pointer assertion explicitly preserves D3. |
   | `Carousel.test.ts:1506` | Relax class validation or ride coercion; refusal assertions bind, `M:49`, `:50`. |
   | `Carousel.test.ts:1548` | Omit claiming; lookup/second-owner assertions bind, `M:45`. |
   | `Carousel.test.ts:1574` | Replace the already-aborted test with `lifetime === undefined`; the already-aborted construction assertions bind, `M:44`. The mutation does not remove the live abort listener. |
   | `Swipe.test.ts:12` | Unfreeze swipe classes; binds, `M:66`. |
   | `Swipe.test.ts:19` | Make threshold inclusive; exact-boundary calls distinguish it, `M:58`. |
   | `Swipe.test.ts:38` | Admit mouse presses; empty recorder distinguishes it, `M:59`. |
   | `Swipe.test.ts:54` | Ignore pointer identity or cancellation; recorder assertions bind, `M:60`, `:61`. |
   | `Swipe.test.ts:94` | Omit pointer write or restoration; host-state assertions bind, `M:62`, `:63`. |
   | `Swipe.test.ts:124` | Omit threshold validation or ignore class replacement; assertions bind, `M:64`, `:65`. |
   | `Delegate.test.ts:1015` | Remove route/prevention, ignore position, force next, or route invalid steps; state/default assertions bind, `M:67`–`:71`. |
   | `Delegate.test.ts:1061` | Remove host-token or root restriction; acquisition/default assertions bind, `M:72`, `:73`. |
   | `Delegate.test.ts:1091` | Drop scan, acquire every ride, or discard owned carousels incorrectly; lookup/release assertions bind, `M:74`, `:75`, `:83`. |
   | `Delegate.test.ts:1141` | Skip cleanup after scan failure; retained-owner/listener assertions bind, `M:76`. |
   | `Delegate.test.ts:1170` | Remove carousel route; first-slide assertion fails, `M:67`. That joined failure does not independently bind interaction restarting; omitting interaction start would distinguish the later cycling assertion but was not run against this file. |
   | `Delegate.test.ts:1190` | Force previous controls to next; consumer index distinguishes it, `M:70`. This row does not independently bind consumer lifetime ownership. |
   | `Delegate.test.ts:1214` | Ignore replacing attributes/classes; replacement/default-control assertions bind, `M:80`, `:81`. |
   | `Delegate.test.ts:1249` | Remove carousel mark; double movement distinguishes it, `M:79`. |
   | `Delegate.test.ts:1270` | Remove same-host conflict refusal; event/acquisition/default assertions bind, `M:77`. |
   | `Delegate.test.ts:1303` | Remove collapse conflict refusal; event/acquisition assertions bind, `M:78`. |
   | `Delegate.test.ts:1331` | Relax class validation; refusal assertion binds, `M:82`. |
   | `validators.test.ts:172`, `:199` | Admit arbitrary direction; remove exception containment. Invalid-shape and throwing-accessor assertions bind, `M:84`, `:85`. |
   | `parsers.test.ts:48`, `:55` | Drop Bootstrap spelling; accept arbitrary strings. Exact parse results bind, `M:87`, `:86`. |
   | `helpers.test.ts:597`, `:607` | Reverse preference query; read global window. Staged/no-view assertions bind, `M:89`, `:88`. |
   | `index.test.ts:15` | Remove class exports; exported-name assertion binds, `M:90`. |

**Findings fitting no claim:** none.

**Attacked and held:** The covered doors stop after destruction or removal of their required tokens; queued `slide` calls re-read after waking. A prevented pre-event correctly occurs before refusal, while invalid positions dispatch nothing. Ordinary snapshot restoration intentionally restores owned tokens and preserves unrelated consumer edits. E12 permits separate hosts and configurations whose conflicts no single delegate sees. These adjacent behaviors must survive the fixes.

**Referrals:** Carry construction and pointer-vocabulary repairs under claim 1; takeover identity and complete door validation under claim 2; pause/suspension ordering under claim 3; coordinated restoration under claim 4; delegate lifetime checks under claim 5; contract/guide corrections under claim 7. Carry the known `CarouselVocabulary` extraction and common constructing-host conflict mechanism into integration (`Delegate.ts:80`, `:196`, `:212`). Retain D1 and D5; retain D2’s engine ownership subject to the timing correction.

**Bounds:** No browser test, build, mutation, or established gate was rerun; no files were written and no other lane’s verdict was read. No `prove` call was made, no refusal was received, and no probe receipt is claimed. Source-derived interleavings require Orchestrator reproduction before their prescriptions become fixes. The independent mutation replay remains outstanding.

VERDICT: FAIL 1, 2, 3, 4, 5, 7, 8; outside the claims: none
