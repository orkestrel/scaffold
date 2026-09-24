# J-OFFCANVAS audit round 2 — the subjective lane's verdict (`reviewer`, Opus 5.5, agent a210ffb325feb834f, retained verbatim 2026-09-24)

Subjective lane, held as `reviewer` on Opus 5.5 (the alias served `claude-opus-5-5[1m]`). Opus 5.5 wrote this unit, so I attacked it on that footing. I ran no command, and every reading below comes from source.

Worktree root for the paths that follow: `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/offcanvas`. The retained evidence is under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`.

## Verdicts

**Clause recorded UNRESOLVED, as the brief directs.** Only the writer's log (`j-offcanvas-mutations-2.log.txt`) and the writer's report show that each instrument row reddens its named case, and that each red-first case failed against round 1's source. The Orchestrator's replay log is absent. That clause stays open in claims 1, 2, and 4. Each claim's value below rules everything else in it.

1. **CONFIRMED.**
   - **`Backdrop.hide`** (`src/browser/Backdrop.ts`, around lines 76–85): it returns `false` when the backdrop is destroyed or not shown. Otherwise it takes a change identity, removes `shown`, awaits `settleAnimations` only when animated, and returns `!aborted && #change === change`. It removes nothing.
   - **`Backdrop.destroy`** (around lines 87–91): it aborts and removes the element.
   - **`Offcanvas.hide`** (`src/browser/Offcanvas.ts`, around lines 286–321):
     - `vanishing = backdrop?.hide()` starts before the `shown` removal.
     - The hide awaits both the slide and `vanishing`, then reads `#holds(false)`.
     - The token and attribute removals follow, each through `#apply`.
     - Then comes `this.#backdrop = undefined` and `#apply(false, () => backdrop?.destroy())`.
   - **The O1 case** (`tests/src/browser/Offcanvas.test.ts`, around lines 1462–1511) asserts that the observer records no mutation through the fade, the backdrop stays connected, and no `hidden` event dispatches. It also asserts that `destroy()` then removes the backdrop.
   - **Attacks that failed:**
     - **Settle door fails after the fade resolved.** `#backdrop` keeps the faded element. Every exit the guide names releases it, so this is the "held until a later show" rule rather than a leak:
       - A later show re-appends it and re-adds `shown`.
       - A hide after the host carries `shown` again gets `false` from `backdrop.hide()` at once, passes its doors, and destroys it.
       - Destruction removes it.
     - **`destroy()` on a backdrop that never showed:** `remove()` on a detached element does nothing.
     - **The Modal's stopped hide** keeps the connected element too. Its rendered consequence goes to the objective lane as OR1.
   - The status file lists no `Modal.ts`.

2. **CONFIRMED.**
   - **The option:** `IsolationOptions.spare` is declared in `src/browser/types.ts`, around line 390.
   - **`Isolation`** (`src/browser/Isolation.ts`):
     - It copies the list as `new Set(options?.spare)` (around line 84).
     - It skips a spared element at construction (around line 104) and in the observer (around line 52).
     - Chain elements are still claimed as not inert (around lines 96–100).
   - **`Offcanvas`:**
     - It passes `spare: [this.#backdrop.element]` (around line 264).
     - The `mousedown` listener sits on the backdrop element under the panel's signal (around line 244).
     - No document listener exists.
     - `#press` is around line 388.
   - **The construction case** expects `[host, host, host, lifetime.signal]` (around line 142).
   - **Attacks that failed:**
     - **Construction order:** the backdrop is always constructed before the isolation (around line 236 against around line 261).
     - **A held isolation always spares the held backdrop:** `#backdrop` is reset only in `hide` after the isolation's release (around lines 298 and 313), and in `destroy`.
     - **A spared element on the chain:** the chain claim runs first and marks it not inert, which does no harm.
     - **A held isolation's observer:** it skips a backdrop that a later `Backdrop.show` re-appends.
     - **A press while the panel is hidden** and a stopped show left the backdrop: `hide` is refused and `#prevent` returns while the panel is hidden, as documented.

3. **CONFIRMED.**
   - **Test policy:** `Offcanvas.test.ts` holds no named local arrow. Each hook is an arrow in an options literal passed directly.
   - **Sentences in `types.ts`:** each matches the claim and the code:
     - `OffcanvasDetail` (around line 1383).
     - The Toast-shape sentences (around lines 1424 and 1434–1455).
     - `OffcanvasInterface.destroy` (around line 1508).
     - `BackdropInterface.hide` and `element` (around lines 434 and 446–459).
     - `IsolationOptions` (around lines 385–390).
   - **Parity rows in `guides/veneer.md`:** the § Surface rows (around line 82, and line 27 of the diff) and the § Methods rows (around lines 349 and 433) equal their summaries.
   - **Guide text:** each of these reads as claimed:
     - The timeline and press departures (around lines 2465–2469 and 2491–2494).
     - The agreement sentence (around line 2461).
     - "toggle route" (around lines 798, 831, and 2439–2512).
     - The destruction bullet (around line 2515) and the fence lead-in.
     - The Modal Backdrop and Isolation bullets (around lines 1968–1989).
   - **Other files:** the `parseBackdrop` remarks (`src/browser/parsers.ts`, around line 207) and the `Delegate` TSDoc wrap and `#conflicts` locals (`src/browser/Delegate.ts`, around lines 184–186 and 573–574) read as claimed.
   - **Attacks that failed:**
     - No `#### Modal` sentence still says the backdrop is removed at the end of its fade. "hides and removes the backdrop" (around line 1928) matches `hide` then `destroy`.
     - `element` has no guide row, and its summary is true.
     - The `Isolation` remarks match `spare`; their broken wrap is bound B2.

4. **CONFIRMED.**
   - **The O5 row:** the row "the dismiss resolution reads no lifetime" (`j-offcanvas-mutations-2.py`, around lines 219–222) drops `#reach`'s lifetime check and names the claimed case.
   - **The writer's log:** it shows the `GREEN?` rows and ends with `receipt: restored byte for byte` (around lines 66–74). Only the writer's log carries this; the replay is the open clause.
   - **Attack on the `void` fix, which failed:** `void` only stops automatic semicolon insertion from joining the mutated statement to the preceding `new Backdrop({…})`. `addEventListener` returns `undefined`, so the row still proves what it names: a listener on the host's parent. The inside-panel binding question goes to OR3.

5. **CONFIRMED.**
   - The Orchestrator's run shows each named gate at exit 0 with 706, 19, and 109 passed plus 1 skipped.
   - The status lists only owned files.
   - The round-2 hunks I read show no forbidden construct: `as const` in the test table is permitted by `typescript.md` § Types, and `spare` is readonly.
   - `Backdrop.ts`, `Isolation.ts`, and `Offcanvas.ts` each hold one class plus imports.
   - The report records no `prove` call.
   - The mechanical sweep belongs to `checker`.

## Findings outside the claims

**F1. `BackdropOptions.animated` states a removal the split no longer makes.**
- **Where:** `src/browser/types.ts`, around line 428: "if `false`, adds and removes it at once."
- **What is wrong:** under round 2, a non-animated `hide()` removes nothing. `Backdrop.test.ts` "appends to the parent it names and adds no fade token when not animated" asserts `isConnected` is `true` after `hide()`.
- **Why it matters:** a direct consumer of the exported `Backdrop` reads the option contract and expects `hide` to remove the element.
- **What right looks like:** "If `true`, fades the backdrop in and out through its `fade` token; if `false`, adds and removes its `shown` token at once. Default: `false`."

**F2. The `#### Offcanvas` door paragraph says no door follows the backdrop's writes, and one does.**
- **Where:** `guides/veneer.md`, around lines 2427–2428: "The backdrop is a plain `div` the panel creates, so no reaction runs inside its writes and no door follows them."
- **What is wrong:** `Offcanvas.hide` removes the backdrop through `#apply(false, () => backdrop?.destroy())`, around line 314, and a door follows it.
- **Why it matters:** the paragraph is the consumer's contract for where the calls read the host.
- **What right looks like:** scope the sentence to what the class comments already scope: "…so no reaction runs inside its append or its token writes, and no door follows them."
- **Not broken:** the door itself follows the brief's O1 wording.

**F3. The `beside` constant's comment describes the round-1 inert backdrop.**
- **Where:** `tests/src/browser/Offcanvas.test.ts`, around lines 37–40: "…so it lands on the backdrop or, after the isolation makes the backdrop inert, on the fixture's container".
- **What is wrong:**
  - Round 2 spares the backdrop, and the press case asserts `backdrop.inert` is `false`.
  - `beside.y` ("on the opener's line") has no reader; only `beside.x` is read, around line 511.
- **Why it matters:** the comment states the reverse of the round's central change, next to the case that proves the change.
- **What right looks like:** `const beside = { x: 407 }`, with a comment stating that the x point lies beside the 400px panel inside the 414px viewport, where the spared backdrop receives the press.

## Attacked and held

- **The faded backdrop a stopped offcanvas hide holds** stays connected and transparent, and the panel carries `shown`. A press on it hides the panel, or dispatches `prevent` under a static backdrop. That is consistent with a shown panel.
- **Placement of the press listener** matches Bootstrap's `Backdrop._append` and `dispose` (`node_modules/bootstrap/js/src/util/backdrop.js`, around lines 99–144). The departure bullet "created at each show and destroyed after each hide" states the lifetime difference.
- **Shape:** `Offcanvas` keeps `Modal`'s refusal-while-in-flight form, and no new private method or term was added in round 2.
- **Voice:** I swept the round-2 diff's added lines, case-insensitively, for `should`, `simply`, `just`, `easy`, `currently`, `now`, `latest`, `via`, `e.g.`, `i.e.`, `etc.`, `ensure`, `guarantee`, `above`, `below`, `once`, and `since`.
  - Every hit is permitted: `once` means "one time" or is the `{ once: true }` option, and `above` and `below` are spatial.
- **Round-1 findings and bounds (my verdict):** F1 and F2 are closed. B1 through B7 are closed:
  - B1: the `parseBackdrop` remarks name the offcanvas panel.
  - B2: the agreement sentence precedes the departures list.
  - B3: "toggle route" is used in `#### Offcanvas` and the § Delegation offcanvas sentences. The modal wording drift remains outside this unit's scope.
  - B4: the locals are `offcanvasTrigger` and `offcanvasDismiss`.
  - B5: "removes the backdrop" appears in the destruction bullet and `OffcanvasInterface.destroy`.
  - B6: the `Delegate` class TSDoc wrap is repaired. A new instance of the same defect is bound B2.
  - B7: the fence lead-in reads "Construct an `Offcanvas` engine over a start-edge `.offcanvas` element".
  - E19 ruled on OR1 and OR3. The press case covers OR1 and the containment row covers OR2, both on the writer's log only.

## Referrals

- **OR1 (objective lane: the Modal under the split).** A modal without the `fade` token constructs its backdrop with `animated: false` (`Modal.ts`, around line 257).
  - `await backdrop.hide()` (around line 324) removes `show` and yields.
  - A host observer that re-adds `show` in that microtask fails the door (around line 325). The door leaves a `.modal-backdrop` connected that carries neither `fade` nor `show`.
  - The `overlay-backdrop` mixin (`src/styles/_mixins.scss`, around lines 473–489) paints that element fixed over the whole viewport in black. No `.fade` or `.show` rule lowers its opacity, so it stays opaque.
  - Round 1 removed it. A direct `Backdrop` consumer with `animated: false` meets the same state between `hide()` and `destroy()`.
  - I derived this from source, and no capture shows the rendered state (NOT-EVIDENCED). A capture of the state and a Modal case would settle it, along with whether the `#### Modal` Backdrop bullet must state it.
- **OR2 (objective lane: listener lifetime).** Each show constructs a new backdrop and binds `mousedown` under the panel's signal (around line 244). That signal's abort step then references the detached element and its closure until the panel is destroyed.
  - A heap snapshot after N show and hide cycles, counting detached `div.offcanvas-backdrop` elements, would settle it.
  - The design question behind it: `destroy` both removes the element and ends the backdrop's life, which forces one backdrop per cycle.
- **OR3 (objective lane: test sufficiency).** In the press case, the inside-panel click and the container dispatch (around lines 538–539) share one assertion (around line 540).
  - The row "the press counts a target inside the panel" listens on `host.parentElement`, and the container dispatch alone reddens that row.
  - The mutation that isolates the inside probe binds the listener on `host`. A dispatch on `root` never reaches the host, so only the inside click would redden.
  - Rule whether the case binds the inside-press property.
- **OR4 (objective lane: stacked panels).** When panel A is shown and panel B is shown through the API, A's isolation observer claims B's backdrop inert at the next delivery (`Isolation.ts`, around lines 49–58). `spare` applies per isolation, and A's claim is the newest.
  - A press beside B then misses B's backdrop, where Bootstrap's second backdrop receives it.
  - The delegate route hides A first; the API does not. Rule whether this is reachable.

## Bounds

- **B1:** `spare` is an adjective or verb, and `names.md` § General vocabulary says properties are nouns. E19 ruled the name, so there is no change unless the Orchestrator reopens it.
- **B2:** these lines break the wrap:
  - `Isolation.ts` remarks (around line 21).
  - The `Delegate.ts` `#conflicts` comment, which the unit re-edited (around line 552).
  - `guides/veneer.md` around lines 798–799, 2307, 2321, 2342, 2428, and 2439.
- **B3:** the blank line after the timeline bullet (`guides/veneer.md`, around line 2470) makes the departures list a loose list.
- **B4:** the `Isolation` constructor summary, "Claims every element beside the host's ancestor chain as inert" (around line 61), and its `@param options` (around line 64) omit `spare`.
- **B5:** `OffcanvasClassMap.host` reads "closes from inside" (`types.ts`, around line 1406), and the guide's table reads "hides from inside".
- **B6:** `Modal` removes its backdrop with a door and then a bare `destroy()` (around lines 325–326). `Offcanvas` wraps `destroy()` in `#apply` (around line 314), and the writer reports that door as unobservable. F2 is the sentence-level consequence.
- **B7:** the `OffcanvasEventMap` sentences for `shown` and `hidden` (`types.ts`, around lines 1391 and 1395) say "after the panel's transition settles". The guide's event table names the fade, the focus move, and the lock release. This is round-1 text.

VERDICT: FAIL none; outside the claims: F1, F2, F3
