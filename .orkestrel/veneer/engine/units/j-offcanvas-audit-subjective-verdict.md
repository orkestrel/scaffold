# J-OFFCANVAS audit round 1 — the subjective lane's verdict (`reviewer`, Opus 5.5, agent a5af91c1085e2ea5b, retained verbatim 2026-09-24)

Subjective lane, held as `reviewer` on Opus 5.5 (the alias served `claude-opus-5-5[1m]`). Opus 5.5 wrote this unit, so I attacked it on that footing. I ran no command, and every reading below comes from source.

## Verdicts

1. **UNRESOLVED** (only the Rows clause is open).
   - **Rows clause:** the only evidence that each row reddens its case is the unit's own `j-offcanvas-mutations.log.txt`. The Orchestrator's replay log is absent.
   - **Rest of the claim holds.** The `Offcanvas` constructor (`C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/offcanvas/src/browser/Offcanvas.ts`, around lines 109–185) matches the `Modal.ts` constructor path for path.
   - **Attack that failed:** does a constructor `backdrop` supplied alone override the attribute at the read layer? It doesn't. The spread admits `backdrop` only when `dismiss.backdrop` (`light`) is also defined.
   - **Attack that failed:** does construction under an already-aborted signal write anything? It doesn't. `destroy()` restores a snapshot that saved nothing.
   - The case "writes nothing at construction…" asserts `[host, host, host, document, lifetime.signal]` as the listener targets. A dropped listener changes that list.

2. **UNRESOLVED** (only the Rows clause is open, as in claim 1).
   - **Rest holds.** The sequence in `show` (around lines 209–277) is exactly as claimed. Every consumer-reachable write is an `#apply` step.
   - **Attack that failed:** I looked for a write reached after consumer code with no door. Only the `Backdrop.show()` append and token writes on a `div` the panel created, and the `reflow` read, run without one. `Backdrop.ts` shows no reaction can run inside them.
   - **Proof check (derived, not run):** the row "the show does not wait for the backdrop fade" distinguishes its mutation. The fade case lengthens the fade to 0.5s, past the 0.3s slide, and asserts `faded in` before `shown.vn.offcanvas`. A show that doesn't await `appearing` dispatches first.

3. **UNRESOLVED** (only the Rows clause is open).
   - **Rest holds.** `hide` (around lines 279–314) runs the steps in the claimed order, with the expected token state at each door. The backdrop's fade-out and its destruction are the only writes with no door, and both land on the panel's own `div`.

4. **UNRESOLVED** (the Rows clause is open, and the containment reading goes to the objective lane).
   - **Rest holds from source.** `#press` counts a press only while `this.#backdrop?.element` is connected and `target.contains(element)` is true. `#prevent` dispatches only while the panel is live and `shown`.
   - **Design fit:** the containment test works whether or not `Isolation` ever exempts the backdrop, because `target === element` also counts. The coupling to the isolation's inerting is therefore one-directional.
   - Two concrete press paths go to the objective lane (OR1, OR2).

5. **UNRESOLVED** (only the Rows clause is open).
   - **Rest holds.** `#resize` (around lines 398–407) and its replay after `shown` match the claim.
   - **Design attack that failed:** could `#resized` be derived by re-reading the position after every show? No. That would hide a panel shown past its breakpoint with no resize at all, so the flag earns its place.

6. **UNRESOLVED** (only the Rows clause is open).
   - **Rest holds.** `destroy` (around lines 320–335) aborts first, releases the registry claim before `#snapshot.restore()`, and returns early on a second call.

7. **UNRESOLVED** (only the Rows clause is open).
   - **Rest holds.** `#routeOffcanvas` mirrors `#routeModal` step for step, with the two differences the claim names:
     - It reads `matchesDisabled`, as Bootstrap's `offcanvas.js` data API calls `isDisabled` (around line 239). The modal route reads no disabled state.
     - It skips the other-panel hide when `open === host`.
   - `#dismissOffcanvas` goes through `#reach`, and the routes run after `#dismissToast` in `#activate`.
   - In `#conflicts`, the `offcanvases` Set is filtered on `Offcanvas.find(panel) === undefined` and skips a disabled toggler.
   - I found every case title the claim names in `Delegate.test.ts`.

8. **UNRESOLVED** (the instrument clause is open).
   - **Instrument clause:** the only evidence is the writer's log, and the replay is absent.
   - **Rest holds:**
     - The frozen tables follow `TOAST_DEFAULTS` in `constants.ts`.
     - The `isOffcanvasEvent` body contains a throwing accessor.
     - The barrel row and `OffcanvasVocabulary` are present.
     - `#### Offcanvas` follows the toast departures, and the departures list carries every item the claim names.
     - The plugin row reads `shipped` with Proof `tests/src/browser/Offcanvas.test.ts`.
     - The Orchestrator's gate log shows each named gate at exit 0 with the stated totals.
     - The status lists only owned files.
   - I sampled the mechanical hygiene clauses in the diff but did not sweep them. They belong to `checker`.

9. **CONFIRMED.**
   - **Member names:** every added member is one word, and the private methods reuse `Modal.ts` terms (`#refused`, `#holds`, `#apply`, `#save`, `#escape`, `#press`). `#routeOffcanvas` and `#dismissOffcanvas` follow the delegate's two-word private-method form.
   - **Attack on `#prevent` (held):** the name repeats the `prevent` event key it dispatches, as `#bounce` names the modal's larger action.
   - **Attack on `#resize` (held):** it names its input, as `#escape` and `#press` do.
   - **Voice sweep:** I searched the added lines of `j-offcanvas.diff` for `should`, `simply`, `just`, `easy`, `currently`, `now`, `new`, `latest`, `via`, `e.g.`, `i.e.`, `etc.`, `once`, `since`, `above`, `below`, `please`, `utilize`, `leverage`, `robust`, `performant`, `ensure`, and `guarantee`. Each hit is permitted:
     - `once` means "one time" ("once per click") or is the `{ once: true }` option.
     - `new` is code, or "a new change", meaning another change.
     - `above` means a width ("at and above it").
   - **Guard ruling:** keep two guards; the event maps keep them apart. `OffcanvasDetail` and `ModalDetail` are separate contracts in `types.ts`, and R13 fixes the `is{Entity}Event` family. The family already repeats bodies (`isTabEvent`, `isModalEvent`, `isOffcanvasEvent`; and `isCollapseEvent`, `isAlertEvent`, `isToastEvent`). Merging only these two would split the family.
     - The landing round needs no carrier for this.
     - A family-wide consolidation is a design question for the Orchestrator (OR4).
   - **The `parseBackdrop` remarks:** a bound (B1).

## Findings outside the claims

**F1. The offcanvas selector and target contract describes behaviour the panel doesn't have.**
- **Where** (`C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/offcanvas/src/browser/types.ts`):
  - `OffcanvasSelectorMap` (around line 1428) reads "Names the selectors an offcanvas panel matches with".
  - `OffcanvasSelectorMap.trigger` (around 1431) reads "Selects the triggers that show a panel".
  - `OffcanvasOptions.selectors` (around 1448) reads "Replaces the selectors the panel matches with".
  - `OffcanvasAttributeMap.target` (around 1418) reads "selects the panel it shows".
  - The guide's § Surface row for `OffcanvasSelectorMap` (`guides/veneer.md`, around line 209) repeats the first sentence.
- **What is wrong:**
  - The constructor resolves `selectors` and discards the result (`Offcanvas.ts`, around lines 127–134).
  - The trigger route toggles the panel rather than showing it (`#routeOffcanvas` calls `engine.toggle(trigger)`).
  - Dismiss triggers also read `target`, through `#locate`, to pick the panel they hide.
  - The guide contradicts itself: `#### Offcanvas` says "a panel you construct directly matches with none", and its selectors table says "toggles a panel from".
- **Why it matters:**
  - A consumer reading the contract expects `selectors` on a directly constructed panel to change its behaviour.
  - The Button, Alert, and Toast units each corrected this same sentence on their own maps (for example, `ToastSelectorMap`, around line 1989).
  - The brief grants `types.ts` for `Offcanvas*` declarations wherever the implementation proves a sentence false.
- **What right looks like:**
  - Use the Toast shape: "Names the selectors the delegate routes offcanvas clicks by; a panel constructed directly matches with none, and each default is Bootstrap's selector."
  - `trigger`: "Selects the triggers that toggle a panel."
  - `OffcanvasOptions.selectors`: "Replaces the selectors the delegate routes offcanvas clicks by, read from the constructor alone; a panel constructed directly matches with none, and an absent key keeps its default."
  - `target`: "Names the trigger attribute that selects the panel it toggles or hides, read before `href`."
  - Return each change as its own diff block. Make the § Surface row equal the new summary so the parity test stays green.

**F2. The departures list omits the class-token timeline.**
- **Where:** `guides/veneer.md`, `#### Offcanvas`, the list under "The panel departs from Bootstrap's in these ways:" (around line 2456).
- **What is wrong:**
  - Bootstrap 5.3.8 (`node_modules/bootstrap/js/src/offcanvas.js`):
    - `show` adds `showing` and adds `show` only in `completeCallBack` after the slide (around lines 113–121).
    - `hide` removes `show` together with `hiding` after the slide out (around line 146).
  - The engine:
    - adds `showing` and `show` together before the slide;
    - removes `show` before the slide out.
  - The case "slides in under the showing token…" pins the engine's states: `offcanvas offcanvas-start showing show` while the panel slides in, and `offcanvas offcanvas-start hiding` while it slides out.
  - Bootstrap's panel instead carries `showing` alone, and then `show hiding`. That is the state the cascade's `.show:not(.hiding)` rule exists for.
  - The sequence paragraph states the engine's order, but no departure item names the difference.
- **Why it matters:**
  - R18 as amended requires every departure in each `####`, and the brief (OFF6) requires "every other departure you find against offcanvas.js".
  - A consumer's `.offcanvas.show` style or query sees a different class timeline.
- **What right looks like:** add one departure bullet with this content:
  - The engine adds the `shown` token with `showing` before the slide in, and removes it before the slide out, because that token is the panel's shown state and every door reads it.
  - So the panel carries `show showing` while it slides in and `hiding` alone while it slides out.
  - Bootstrap's panel carries `showing` alone and then `show hiding`.

## Attacked and held

- **Shape against the landed pattern:** `Offcanvas` follows `Modal.ts` rather than `Collapse.ts`, and that is correct. E15 keeps the refusal-while-in-flight form for one-direction-at-a-time overlays, and `Collapse` keeps the newest-call-wins takeover.
- **The option surface:** `backdrop`, `dismiss.{backdrop, escape}`, and `scroll` follow the R11 paths. The attribute keys name options, per R19.
- **The backdrop-is-a-plain-`div` exemption:** it is stated once in code and once in the door paragraph. The exemption holds because `Backdrop` creates its element itself.
- **The delegate's focus return (arm, then disarm on `false`):** it matches the modal route, and the guide lists it as a departure.
- **The document-wide `mousedown` listener kept for the panel's lifetime:** it costs one `contains` per press. The window `resize` listener the contract requires already has the same lifetime. I did not record it as a finding.
- **The case titles:** each names what the case proves, and none carries a control identifier.

## Referrals

- **OR1 (to the objective lane, claim 4).** Two press paths count although the press did not land where the backdrop is painted:
  - With `scroll: true` and `backdrop: true`, a press on the document scrollbar targets the root element. The root contains the backdrop, so the panel hides.
  - A press on an element painted above the backdrop but inert under the isolation, such as a toast container at `z-index` 1090 or a top-layer menu, falls through to `body`, which contains the backdrop.
  - Bootstrap's backdrop-only `mousedown` listener hears neither press.
  - **To settle:** send a trusted press to each target while a panel is shown with a backdrop, and check `offcanvas.shown`.
- **OR2 (to the objective lane, claim 4 proof).** No instrument row drops the containment test, for example by counting every press while a backdrop is connected. The listed rows prove only the opposite direction ("a press counts only on the backdrop itself").
  - Rule whether the case's "ignores a press inside the panel" assertion is bound to a mutation.
- **OR3 (to the Orchestrator).** Design verdict R5, which no amendment changes, names a delegate construction-time scan for `.offcanvas.show`. The brief excluded load adoption, and the guide says "You construct the engine over shown markup instead".
  - Amend R5, or name the unit that owns the scan.
- **OR4 (to the Orchestrator).** If you want one guard per detail shape, rule it for the whole `is*Event` family in a design round, not in this landing round.

## Bounds

- **B1:** the `parseBackdrop` remarks (`src/browser/parsers.ts`, around line 207) name only the modal. Carrier: the J-OFFCANVAS landing round's `parsers.ts` integration. It should read "A modal or an offcanvas panel reads…".
- **B2:** the departure bullet "Neither Bootstrap's installed offcanvas nor the engine hides a shown modal…" states agreement inside a departures list. Move it to a sentence before the list.
- **B3:** `#### Offcanvas` calls one route both the "trigger route" (around lines 2445 and 2454) and the "toggle route" (around lines 2496 and 2500). § Delegation writes "offcanvas toggle" (around line 798) and "offcanvas trigger" (around line 831). The modal text has the same drift. Pick one term.
- **B4:** the `#conflicts` locals `toggle`/`toggler` and `dismiss`/`dismisser` tell entities apart only by word form, which invites a swap. Name them by entity, or extract a reader per route.
- **B5:** "restores the panel, the backdrop, scrolling, and focus" in the destruction bullet (and in `OffcanvasInterface.destroy`) says "restores" for a backdrop that destruction removes.
- **B6:** the nested-roots sentence in the `Delegate` class TSDoc (around line 185), which the unit re-edited, keeps its broken wrap: "…and each offcanvas, and each tab control and dropdown toggle / once per key".
- **B7:** the fence lead-in "Construct an offcanvas panel over a start-edge panel" uses "panel" for both the engine and its host.

VERDICT: FAIL 1, 2, 3, 4, 5, 6, 7, 8; outside the claims: F1, F2
