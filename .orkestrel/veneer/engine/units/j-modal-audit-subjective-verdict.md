# J-MODAL audit round 1 — the subjective lane's verdict (`reviewer` on Opus 5.5, native subagent, read-only; 77 tool uses, 645 s; retained verbatim from the subagent's return)

Lane: subjective, held in full. The alias served Opus 5.5 (`claude-opus-5-5[1m]`). The same engine wrote this unit, so I pressed harder on the parts it wrote.

## Numbered verdicts

**1. Construction and the options: CONFIRMED.**
- **Attack on shape:** I compared the constructor with `Collapse.ts` in `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/src/browser/`.
  - Both use the same order: host guard with `readTag`, then `resolveVocabulary` for each group, then `resolveOptions`, then claim, then `bindEventMap`, then `signal`.
  - `isInstance(host, HTMLElement)` replaces the invoked `instanceOf` form, as the brief's standing condition requires.
  - Every throw happens before `Modal.#registry.claim`, which is around line 170.
- **Attack on the backdrop rule:** I tried to break the rule that the constructor layer carries `backdrop` only when both paths are supplied.
  - With `data-bs-backdrop="static"` and `{ backdrop: true }`, `backdrop` is true and `dismiss.backdrop` stays false. That matches the case "resolves the backdrop, the dismissal, and focus from the attributes…" and its `shaded` block.
  - Mutation "constructor backdrop replaces the attribute whole": `expect(shaded.shown).toBe(true)` goes red, so the case tells the mutation apart.
  - Mutation "claim before coercion": `expect(Modal.find(host)).toBeUndefined()` in "refuses an attribute value that fails coercion…" goes red.

**2. The show sequence and its doors: CONFIRMED.**
- **Attack on order:** I laid the writes against `modal.js` `show` and `_showElement`. The order matches: scrollbar hide, `modal-open`, `_adjustDialog`, backdrop, append, `display`, the ARIA attributes, the scroll resets on the host and `.modal-body`, reflow, `show`, `_queueCallback` on `_dialog`, then focus trap `activate` and `shown`.
- **Attack on doors:** I looked for a write left without a door. `host.scrollTop = 0`, the body's `scrollTop`, and `reflow(host)` have none, but none of them runs a synchronous reaction.
- **Mutation "a change the host broke stays in flight":** "stops a show whose shown-token write…" asserts `expect(await modal.hide()).toBe(true)`, which goes red. It tells the mutation apart.
- **Adjacent behaviour, referred as R1:** the identity half of `#holds` appears unreachable.

**3. The hide sequence, the dismissals, and the bounce: CONFIRMED.**
- **Attack on hide:** `hide` waits on the host, as Bootstrap's `_queueCallback(() => this._hideModal(), this._element, …)` does. The `_hideModal` order matches the code: `modal-open` removal, `_resetAdjustments`, `_scrollBar.reset`, then `hidden`.
- **Attack on the bounce:** `#bounce` re-dispatches when the host already carries `static` and adds nothing. That matches `_triggerBackdropTransition`, which dispatches before its `modal-static` return.
- **Attack on the departures:** the claimed departures all appear in the guide's departure list (worktree `guides/veneer.md`, around lines 958–995): the non-cancelable `prevent`, no inline `overflow-y`, and the host-fade wait.
- **Attack on proof:** in "hides on a trusted Escape…", `prevented.calls` equals two `prevent.vn.modal` entries. That tells apart the mutation "the bounce keeps the static token".

**4. The three mechanisms: CONFIRMED.**
- **Attack on `ScrollLock`:** I checked its skip rule against `scrollbar.js`. `SELECTOR_FIXED_CONTENT` includes `.sticky-top`, and `_setElementAttributes` re-reads `getWidth()` after `_disableOverFlow`. The `:is(fixed, sticky)` padding set and the second measurement named `remaining` are both faithful.
- **Attack on `Isolation`:** the release goes to the newest remaining claim and restores only when no claim remains. The chain members that already carry `inert` are claimed `false`.
- **Attack on `Backdrop`:** its `#change` identity is reached only through direct use, which "keeps the element for a show that takes over a hide in flight" covers. `Modal` ignores `Backdrop.show()`'s result, and that does no harm.
- **Mutation "the open token is not reference-counted":** `expect(body.classList.contains('modal-open')).toBe(true)` after `one.hide()` goes red.
- **Held on design:** these are three separate shared-record shapes. That design question is carried to the Orchestrator as R4, not ruled here.

**5. The delegate's modal routes and E12: CONFIRMED on mechanism.**
- **Attack on `#routeModal`:** I compared it with Bootstrap's data API. It prevents the default for `A`/`AREA`, hides the already-open modal, and then shows. It arms focus return on `shown` where Bootstrap arms on a `show` that was not prevented (referred as R5).
- **Attack on the refusal:** `#conflictsModal` refuses only when no `Modal` engine exists and the button or collapse engine is also absent. That is E12's same-host letter.
- **Attack on proof:** the focus-return case sets `data-bs-focus="false"`, so the route's focus return is proven apart from `Isolation`'s. `expect(document.activeElement).toBe(trigger)` goes red under "the focus return is dropped".
- The route's name is finding F4.

**6. The guard, the tables, the parser, and the barrel: CONFIRMED.**
- **Attack on the tables:** I checked every default against `modal.js` `Default` and the `scrollbar.js` constants, and they match. `MODAL_DEFAULTS.dismiss` is frozen, and the frozen-table case iterates it.
- **Attack on the parser:** `parseBackdrop` behaves as claimed. Its doc block's claims about Bootstrap are false; that is carried under claim 7.
- **Attack on the barrel:** the barrel order puts the mechanisms before `Modal` and `Delegate`.

**7. The guide and the returned patch: BROKEN.**

Two sentences state facts the source contradicts, and the case title that pins one of them hides the precondition.

- **(a) Bootstrap's reading of `data-bs-backdrop`.**
  - **Where:** worktree `guides/veneer.md:967`, "Bootstrap reads an empty value as no backdrop and any other string as a backdrop that hides on a press". The same claim appears in `src/browser/parsers.ts:35` ("Parses a backdrop value to Bootstrap's reading of it"), `parsers.ts:40` ("This is the coercion Bootstrap's `backdrop` option performs"), and `parsers.ts:44`.
  - **What is wrong:** Bootstrap throws on those values. `node_modules/bootstrap/js/src/dom/manipulator.js:21-22` turns `''` into `null`, and `:17-18` turns `'0'` or `'1'` into a number. `base-component.js:56` then runs `_typeCheckConfig` against `modal.js:57` `'(boolean|string)'`, and `util/config.js:56-58` throws a `TypeError` for `null` and for `number`.
  - **Why it matters:** the departure list tells a migrating consumer the wrong thing about the markup they already ship. The parser's summary is also the § Surface row.
  - **What right looks like:** say that Bootstrap throws a `TypeError` for an empty, `null`, or numeric value, and treats any other non-JSON string as a backdrop that hides on a press. Say that Veneer accepts `0` and `1`. Reword the `parseBackdrop` summary and remarks so they don't call the parser Bootstrap's coercion. Update the § Surface row in the same edit.
- **(b) The takeover paragraph.**
  - **Where:** `guides/veneer.md:927`, "what the stopped call acquired … stays held until a `hide` call or destruction releases it".
  - **What is wrong:** after a show whose `shown` write a reaction undoes, the host lacks the token. So `hide()` fails `#refused(false)` (`Modal.ts` `#refused`, around line 345), resolves `false`, and releases nothing. The page stays locked, the backdrop stays visible, and the host keeps `display: block`.
  - **The case title:** "stops a show whose shown-token write … and lets a later hide release what it held" (`tests/src/browser/Modal.test.ts`, around line 964) passes only because it runs `host.classList.add('show')` by hand, around line 1002, before `hide()`.
  - **Why it matters:** a consumer who follows the guide calls `hide()` and is left with a locked page.
  - **What right looks like:** name the real exits: a later `show` then `hide`, destruction, or a `hide` after the host carries the `shown` token again. Retitle the case so it names the token it puts back.
- **Not decided here:** "the Modal fence … runs as written" has no executing test. `tests/guides.test.ts` checks fence languages and imports only. For "Obligation cell unchanged", see R3.

**8. Scope, gates, and the added lines: UNRESOLVED.**
- **Not settled:** the Orchestrator's replay `j-modal-mutations-orchestrator.log.txt` is absent. Settle it with that replay reading every row `EXACT` or `JOINED` and its receipt. The first run's repair rows are the checker's to compare.
- **Ruled from what I read:**
  - `j-modal-status.txt` lists the owned files and no off-limits path.
  - Every gate in `j-modal-gates.log.txt` exits 0, including `test:src:browser` at 264 passed and the tree-wide `check`.
  - The writer's log shows only `EXACT`/`JOINED` rows, every `GREEN?` row at 0 failed, and `receipt: restored byte for byte`.
  - My sweep of the added source lines found no `any`, `as`, non-null `!`, `@ts-`, `eslint-disable`, access modifier, or default export.
  - The report states that no `prove` call was made.
- **Literal wording:** the clause "no `.bs.` wire name" is false as written. The guide's added departure prose names `hidePrevented.bs.modal` and `hide.bs.modal` as Bootstrap references; see R6.

## Findings fitting no claim

**F1: the scroll lock's selectors can't be replaced through `Modal` or `Delegate`.**
- **Where:** `src/browser/Modal.ts:233` constructs `new ScrollLock({ document })` without selectors.
- **Why it contradicts the rulings:** `ModalSelectorMap` and `ModalOptions` have no member that reaches `ScrollLockSelectorMap`. A consumer who uses the modal, directly or through the delegate, can't replace `.fixed-top, .fixed-bottom, .is-fixed` or `.sticky-top`. E9 and R19 require every selector the engine reads to be a default a consumer can replace per entity. The unit neither threaded them nor reported the `types.ts` gap.
- **What right looks like:** a `types.ts` successor gives the modal a path to the lock's `fixed` and `sticky` selectors, and `Modal` passes them to `ScrollLock`. Offcanvas inherits the same path.

**F2: the shared patch misses sentences the implementation makes false.**
- **Where:** `src/browser/types.ts:1127` says `hidden.vn.modal` is "dispatched after the dialog's transition settles". `hide` waits on the host's own fade and then the backdrop's (`Modal.ts` `hide`; `settleAnimations` in `helpers.ts` reads only the element's own `getAnimations()`). Also `types.ts:1107`, `DismissOptions.backdrop`, says "a click on the backdrop hides". For the modal, the press lands on the host, and the backdrop never receives it. The report records this and leaves it.
- **Why it matters:** the brief made every summary sentence the implementation makes false a patch the unit owes.
- **What right looks like:** extend `j-modal-patches/j-modal-shared.diff`. `hidden` becomes "after the host's fade and the backdrop's fade settle". `DismissOptions.backdrop` names "a press on the backdrop, or beside a modal's dialog".

**F3: the `Delegate` class doc block omits the modal routes.**
- **Where:** `src/browser/Delegate.ts:31-61`. Its `@remarks` still describes only the button and collapse routes and their conflict.
- **Evidence:** every sibling W2 worktree updated this block for its route (`alert`, `toast`, `tab`, `dropdown`, `carousel`, and `scrollspy` `Delegate.ts`). J-MODAL added the modal toggle route, the dismiss route, and the modal conflict refusal, and left the block unchanged.
- **What right looks like:** add sentences in the siblings' shape. Name the `modal` group's `trigger` and `dismiss` routes, the prevented default for anchor and area triggers, the shown modal hidden first, the focus return, and the modal conflict.

**F4: the dismiss route is named by its action, not its entity.**
- **Where:** `src/browser/Delegate.ts:290`, `#routeDismiss`, hides only a `Modal`.
- **Evidence:** every other route is named by entity: `#routeButton`, `#routeCollapse`, and `#routeAlert` and `#routeToast` in their worktrees. Alert, toast, and offcanvas also route `data-bs-dismiss`, so "dismiss" names no single entity. This breaks one concept, one term.
- **What right looks like:** name the modal's dismiss route by the modal. For example, fold both modal triggers into `#routeModal`, or use a two-word private name such as `#dismissModal`. The landing that folds `#readDismissed` into `#reach`/`#locate` sets it.

**F5: `#open` and `#close` are named after the token key, not the act.**
- **Where:** `src/browser/Modal.ts:393` and `:409`.
- **What is wrong:** they hold and release the body's `open` token. On a modal, whose verbs are `show` and `hide`, `this.#close()` inside `hide` and `destroy` reads as closing the modal. `close` is also `AlertInterface`'s public verb in the same barrel. The same shared-record act is `#claim`/`#release` in `Isolation`.
- **What right looks like:** rename to a two-word pair that names the act, such as `#holdOpen(document)` and `#releaseOpen()`. The pair also needs matching parameters; see B3.

## Attacked and held

- The `padding-left: 0px` write in `#adjust` looks like a defect. It is Bootstrap's `_adjustDialog`, which writes `${scrollbarWidth}px` when the width is 0.
- One mousedown on the host with no click leaves a `click` listener armed. That is Bootstrap's `EventHandler.one` shape, and a stale listener cannot hide unless both targets are the host.
- The backdrop is recreated at each show and reads `fade` each time. The guide states this departure.
- `Modal`'s inline `resolveOptions` type argument and `MODAL_DEFAULTS`'s inline declared type look like missing `types.ts` declarations. Every sibling W2 `*_DEFAULTS` table is typed inline the same way, so this is not drift particular to Modal.
- The delegate and the isolation both return focus when the modal hides. The route's case isolates its own return with `data-bs-focus="false"`, so each return is proven alone.
- The inline `#modal` vocabulary, the `#readDismissed` duplicate and its disabled reading, the split `#conflicts`, the backdrop not excepted from `Isolation`, the unapplied patch, and the re-padded table are on the known list. I did not re-report them.

## Referrals

- **R1 (objective lane):** `Modal.#refused` refuses every call while `#change` is set. Only the call that owns the identity clears it, and `destroy()` sets it to undefined.
  - `this.#change === change` in `#holds` then looks equivalent to `this.#change !== undefined`. The guide sentence "or a later call of the same modal started" (around `guides/veneer.md:925`) would then name an unreachable condition.
  - No mutation row covers it.
  - Confirm by mutation. If it is equivalent, rule on it as E6 dead logic.
- **R2 (objective lane):** `#adjust` measures the scrollbar after the modal's own `ScrollLock` hid the body overflow. That is the report's own Unknown 2 reasoning, that a re-read measures 0.
  - Decide whether the `padding-right` branch, and so `update`'s "Recomputes the scrollbar compensation", is reachable in any page this proof can build. The test comment says it has no reading on this host.
- **R3 (checker):** the Compatibility hunk is `-5572,219 +5801,220`, so the Modal `plugin` row appears added rather than edited. "Obligation cell unchanged" needs the base row, the `d271926` row with the M7 fix, and `git diff -w` compared.
- **R4 (Orchestrator):** the same shared record is implemented separately in `ScrollLock.#locks`, `Modal.#opened`, and `Isolation.#claims`.
  - Each record holds a holders or claims set plus one `HostSnapshot`. `Modal.#opened` is also what produces the E13 empty-`class` bound.
  - R8 placed `body.modal-open` inside `ScrollLock`, while `types.ts` `ModalClassMap.open` places it in the modal.
  - Decide whether J-SNAPSHOT-PRESENCE carries one shared mechanism. That is outside this unit's `types.ts` scope.
- **R5 (objective lane):** the route arms focus return on `shown`. Bootstrap arms it on a `show` that was not prevented, so a show stopped by a takeover returns no focus when the modal later hides. Decide whether this is a departure the guide must list.
- **R6 (checker):** claim 8's `.bs.` clause and the "every invoked element guard reads `isInstance`" clause need their stated scope. The added test lines use `event instanceof CustomEvent` (`Delegate.test.ts`) and `animation instanceof CSSTransition` (`Modal.test.ts`), and the guide prose names Bootstrap's `.bs.` events.

## Bounds

- **B1:** `guides/veneer.md:838` cites "the headless Chromium the proofs run on" inside the product guide's `update` paragraph.
- **B2:** the patch's phrase "the host's `shown` token reads the change as taken over" gives a token a faculty.
- **B3:** `#open(document)` takes the document, while `#close()` derives it from `this.#lock?.document`. The asymmetric pair is part of F5's rename.
- **B4:** "hides on a trusted Escape": `#escape` does not read `isTrusted`, and another case hides on a synthetic `KeyboardEvent`. The title names the vector, not the behaviour.
- **B5:** J-TYPES wording, not this unit's: `ModalInterface`'s summary names the fixed `.modal` token, and `BackdropInterface.element` versus `BackdropClassMap.host` gives two words for one element.

VERDICT: FAIL 7, 8; outside the claims: F1, F2, F3, F4, F5
