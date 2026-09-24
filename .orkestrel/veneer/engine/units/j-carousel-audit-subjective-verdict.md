# J-CAROUSEL audit round 1 — the subjective lane's verdict (`reviewer` on Opus 5.5, native subagent, read-only; 50 tool uses, 475 s; retained verbatim from the subagent's return)

Lane: subjective (design fit), held in full on Opus 5.5 through the native `reviewer` alias (`claude-opus-5-5`). Opus 5.5 also wrote this unit, so I attacked it harder. I ran nothing. Every reading below comes from the source, the retained artifacts, and Bootstrap 5.3.8. The Orchestrator's mutation replay log `j-carousel-mutations-orchestrator.log.txt` is absent, so its clause is UNRESOLVED wherever a claim leans on instrument rows.

The worktree paths below are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/`. The retained records are under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.

## Numbered verdicts

1. **CONFIRMED** (construction, options, and lifetime). Replay clause UNRESOLVED.
   - **Attack:** I set `Carousel.ts` against the landed `Collapse.ts` pattern member by member. It has the same order: `isInstance` host refusal with `readTag`, the three `resolveVocabulary` groups, `resolveOptions`, then `claim`, `bindEventMap`, and the `signal` wiring. The `Registry`, `HostSnapshot`, and `AbortController` fields match. `destroy` releases the claim before restoring.
   - **Door model:** The one departure is that `#holds` drops Collapse's change-identity test. This is correct here: while `#change` is set, `next` and `previous` refuse (`#step`) and `slide` waits (the `while` loop). No later call can start a change inside this one, so the token doors carry the takeover reading alone.
   - **Unclaimed on refusal:** `Swipe` is built after the claim, but with the default table and threshold it cannot throw, so every refusal still leaves the host unclaimed.
   - **Proof:** The mutations that would break the proofs are rows 44 to 50 in the retained log (signal ignored, host not claimed, groups ignored, ride not coerced). Each reddens its named case, which asserts on a distinct observable.

2. **CONFIRMED** (the slide sequence and its doors), on the source order against `carousel.js` `_slide` 300-369. Replay clause UNRESOLVED.
   - **Attack:** Does an indicator present in both the `leaving` and `arriving` lists end wrong? No. It is removed, then re-added, and each write passes a door.
   - **Attack:** Can a re-entrant `slide` inside the `slide.vn.carousel` dispatch run two slides? No. The outer re-check (`#change !== undefined`, or the outgoing item no longer active) refuses the outer call.
   - **Proof:** Rows 52 to 57 flip the doors, and each reddens its named reaction case.
   - The interleaving adjudication belongs to the objective lane.

3. **CONFIRMED** (timer, hover, keys, and touch), including **D1**. Replay clause UNRESOLVED.
   - **D1 is the right design.** Bootstrap writes `pointer-event` in `_initEvents` at construction (`util/swipe.js:123-128`). The cascade's `touch-action: pan-y` must be in force before `pointerdown` to have any effect, which the case "reads the shipped carousel declarations…" reads. `SwipeInterface.destroy` ("Removes the pointer listeners and its `pointer` token") already presumes a construction-time write. The brief's "while a pointer is down" was wrong, and the terrain record correctly won over it.
   - **Attack on key mapping:** `ArrowRight` reaches `ORDER_NEXT` in left-to-right order (`KEY_TO_DIRECTION` feeds `_directionToOrder`), and so does Veneer.
   - **Attack on swipe sign:** a positive distance reaches `rightCallback`, then `previous` (`swipe.js`, `_handleSwipe`), and so does Veneer.
   - The key and swipe arms of the ride go to referral R1.

4. **CONFIRMED** (destruction and restoration). Replay clause UNRESOLVED.
   - **Attack:** Does a queued `slide` resolve `true` after destruction? No. The `finally` block calls `#finish`, and the waiting loop then reads `aborted` and returns `false`.
   - **Attack:** Is the `pointer` token restored by the wrong snapshot? No. `Swipe` owns its own `HostSnapshot`, and `destroy` destroys the swipe before the carousel restores.
   - Rows 40 to 43 bind the proofs.

5. **CONFIRMED** (the delegate's route, the scan, and E12), including **D2**. Replay clause UNRESOLVED.
   - **D2 is the right design.** The ride is the engine's own option, so the engine applies it. The delegate stays a router over public methods and reads no engine configuration.
   - **Alternative I considered and reject:** a `readonly ride` on `CarouselInterface`, read by the delegate. It would expose configuration whose only consumer re-implements the engine's own policy. It would also keep Bootstrap's asymmetry, where a consumer-built control calling `next()` never starts the ride but a data API control does (`_maybeEnableCycle` is private, `carousel.js:156-167`). Under D2 both kinds of control behave alike.
   - **Costs of D2:** see F1 (a departure not listed in the guide), referral R2 (a key pressed during hover), and the `CarouselRide` bound.
   - **Attack:** Scan and route source match the claim. `#slideControl` validates the move and `#slideHost` requires the `host` token inside the root. `#scan` skips found engines and destroys the delegate, then rethrows, on a refusal. The destroy-and-rethrow is the only shape that leaks no listener from a constructor that throws.
   - The side-by-side `#conflicts` and `#conflictsCarousel` is carried, not re-reported.

6. **CONFIRMED** (guard, tables, parser, helper, barrel), including **D5**. Replay clause UNRESOLVED.
   - **D5 is the right design.**
     - `SWIPE_CLASSES` is the default table `resolveVocabulary` needs, the same pattern as `COLLAPSE_CLASSES`.
     - `SWIPE_DEFAULTS` follows the `{ENTITY}_DEFAULTS` shape.
     - `CAROUSEL_TOUCH_DELAY` is not an option, so it correctly sits outside `CAROUSEL_DEFAULTS`, which is typed as `Pick<CarouselOptions>`, rather than as a magic number.
     - All three live in `constants.ts`, where "centralize by kind" puts them, and `AGENTS.md` § Minimal public API requires the barrel to expose each.
   - **Attack on `parseRide`:** Does it violate E10? No, no contract reader maps `carousel` or `true`.
   - **Attack on naming:** Does `matchesReducedMotion` break the helper prefix law? No, `matches*` is the predicate prefix (`names.md`).

7. **BROKEN** (the guide and the returned patches).
   - **Failing input 1:** `j-carousel-patches/j-carousel-types.diff` has hunks only for `DelegateOptions.carousel`, `CarouselOptions.ride`, the `@returns` of `next`, `previous`, and `slide`, `start`, and `destroy`. No hunk touches `CarouselClassMap`. The `pointer` key appears only as prose ("patch 3") in `j-carousel-report.md`, so the claim's "adds the `pointer` key" is false of the returned artifact.
   - **Failing input 2:** Applied as described, the key makes `CAROUSEL_CLASSES: CarouselClassMap` in `src/browser/constants.ts` fail the typecheck, because that table has no `pointer` member.
   - **Failing input 3:** The same key makes this `#### Carousel` sentence false: "The carousel's groups name no `pointer` token, so a carousel whose `classes` group is replaced still writes the swipe's default token."
   - **What right looks like:** Carry D3 as a successor unit that owns all of these together:
     - the `types.ts` hunk;
     - `CAROUSEL_CLASSES.pointer = 'pointer-event'`;
     - `new Swipe(host, { handler, classes: { pointer: this.#classes.pointer } })` in the `Carousel` constructor;
     - the frozen-table and vocabulary cases;
     - the guide class-table row;
     - removal of the sentence quoted in failing input 3.
   - **Design shape of D3:** a `pointer` key on `CarouselClassMap` is right. The group already carries host-level tokens (`host`, `slide`).
   - **Rest of the claim holds:** the Surface rows equal the TSDoc summaries, the fence runs, and the `plugin` row is correct.

8. **UNRESOLVED** (scope, gates, and added lines).
   - **What holds:** The status lists 12 modified files and 4 added files, and no off-limits file. The gates are established by the Orchestrator's run. The log has 89 rows, each EXACT or JOINED, and 7 GREEN? rows at 0 failed. The receipt reads "restored byte for byte". The report records that no `prove` call was made.
   - **What would settle it:**
     - the absent Orchestrator replay;
     - proof that the first run's missed rows (25, 28, 54, and 69 in `j-carousel-mutations-first-run.log.txt`) ran the same mutation text in both runs. Only the final `j-carousel-mutations.py` is retained, so "not by weakening a row" cannot be read.

## Findings outside the claims

- **F1: a departure from Bootstrap the guide does not list.**
  - **Bootstrap:** A slide control's click calls `_maybeEnableCycle` (`carousel.js:446`, `:452`, `:457`), which restarts **any** ride, including `carousel`, the `load` ride (`:157`).
  - **Veneer:** the engine restarts only when `interactive && this.#ride === 'interaction'` (`#move`, after the `slid` emit). The `finally` re-arm needs a timer that was running.
  - **Input:** a `load`-ride carousel; `Carousel.find(host)?.pause()`; click a `data-bs-slide="next"` control. Bootstrap cycles again and Veneer stays paused.
  - **Guide:** the `#### Carousel` departures list covers only the interaction ride and the hover end.
  - **Why it matters:** the unit brief required the list to carry every departure found against `carousel.js`.
  - **What right looks like:** keep Veneer's rule, which is the better one ("pause holds until start"), and add a bullet: "A slide control's click restarts no `load` ride that a `pause` call stopped. Bootstrap's click restarts any carousel with a ride."
  - This is derived from source; no run was made.

- **F2: the private timer pair breaks the fixed lifecycle vocabulary.**
  - `names.md` § Fixed lifecycle vocabulary defines `pause` as "Suspend resumably" and `resume` as "Continue after pause", and it forbids synonyms.
  - `#suspend` (`Carousel.ts`, the method after `#tick`) is the `pause` meaning under a synonym.
  - `#resume` does **not** continue after `pause()`: it returns early because `pause` clears `#started`. It continues only after `#suspend`, which inverts the fixed word.
  - The design verdict's R12 dropped `resume` from the public API for exactly this reason.
  - **What right looks like:**
    - Rename `#suspend` to `#disarm`, pairing it with `#arm`.
    - Make `#arm` return when `!this.#started`. Every current caller already runs with `#started` true: `start` sets it first, `#tick` fires only on a timer `#arm` set, and the `finally` block checks it. The `mouseleave` listener and the touch timeout then call `#arm` directly, and `#resume` is deleted.
    - Update the comment on the `#started` field to match.

- **F3: guide and type sentences outside `#### Carousel` that the carousel route makes false.**
  - `guides/veneer.md` § Delegation says the delegate "routes each click by the selectors it resolves for each entity it serves".
  - The `DelegateOptions` TSDoc remark in `types.ts` says "The delegate routes by the selectors a group resolves over the entity's defaults".
  - The carousel route matches by the `attributes` group instead (`#slideControl`: `closest('[step], [index]')`).
  - The writer's own patch fixes this same fact on `DelegateOptions.carousel` but leaves both sentences.
  - Neither sentence says the delegate acquires carousels at construction, or can throw there.
  - **What right looks like:** state that the carousel routes by its resolved `step` and `index` attributes, and add one sentence on the construction scan and its rethrow. The § Delegation fix is a guide edit; the `@remarks` fix is a `types.ts` patch.
  - § Delegation was outside the unit's owned prose, so the Orchestrator has to name a carrier.

## Attacked and held

- **`#change` as `PromiseWithResolvers` beside Collapse's identity `object`.** The term is the same and its role is wider: it is both the in-flight marker and the waiter. It is coherent, and the waiting and refusal rules make the identity test unnecessary.
- **`#finish` called twice.** It is correct: resolving twice does nothing, and it releases waiters before `slid` so that a queued `slide` reads the finished state.
- **`#swiped` (past tense).** It is correct: `#swipe` is taken by the field.
- **Swipe constructed on every device.** This matches Bootstrap's pointer-events branch on the Chromium floor (E11), and the departure is listed.
- **Scan ignoring the `host` token.** This matches Bootstrap's `[data-bs-ride="carousel"]` scan (`carousel.js:461`).
- **Case titles.** Each names what it proves, and none names a control identifier.

## Referrals (to the objective lane)

- **R1: key and swipe arms of the ride have no proof.** No mutation row flips the `interactive` argument in `#navigate` (`#step(…, true)`) or `#swiped`. Rows 22 and 23 mutate only the gate, and the case "starts cycling under an interaction ride after a slide a call asks for…" covers the call arm alone. The guide and the patched `ride` sentence both name "a key, or a swipe".
- **R2: hover plus key under an interaction ride.** With `pause: true` and the pointer over the host (`mouseenter` has suspended the timer), `ArrowRight` completes a slide, then `this.start()` runs, then `#arm` arms whatever the hover state is. The carousel then cycles under the pointer. Bootstrap's key path never starts a ride (`carousel.js:254-263`, and `_slide` restarts only when `isCycling` is set, which `mouseenter` cleared). Measure it and rule whether the guide's hover sentence holds. For a click this is parity; for a key it is new.
- **R3: first-run instrument text.** Confirm that the mutation text of rows 25, 28, 54, and 69 was unchanged between the first run and the final run.

## Referrals (to the Orchestrator)

- **D4 has no carrier.** Neither returned patch adds `CarouselVocabulary`, so the inline type on `Delegate.#carousel` stays.
- **D3 cannot land as a patch.** Carry it as the successor unit set out under claim 7.
- **F3 needs a carrier.** § Delegation was scoped out of this unit.
- **Timer vocabulary across units.** The Toast worktree uses `#schedule` and `#clear`, and Carousel uses `#arm` and `#suspend`. Reconcile the one term at landing.

## Bounds

- **Ride wording.** The `CarouselRide` summary (in `types.ts` and on the guide's `CarouselRide` Surface row) still says "after the first interaction". The patched `ride` sentence says "after each slide a call, a key, or a swipe asks for". Make the two agree.
- **Interval term.** `#period()` and `#interval` name one concept, the effective interval, with two terms. The method is private, so this stays a wording bound.
- **Selectors table.** The `entry` row says each item is "read as `:is(entry)`". The item query reads the raw `entry` selector and uses `:is()` only for the nesting and image reads. The effect it states, that a selector list works, holds.
- **Wait target.** The departure for the wait target does not contrast Veneer's incoming item with Bootstrap's outgoing one (`_queueCallback(…, activeElement)`).
- **Double parse.** `#slideControl` and `#routeCarousel` each parse the move. `#slideControl` could return it.
- **Two meanings of `pointer`.** `Swipe` uses the word for both its pointer-id field and its token key.

VERDICT: FAIL 1, 2, 3, 4, 5, 6, 7, 8; outside the claims: F1, F2, F3
