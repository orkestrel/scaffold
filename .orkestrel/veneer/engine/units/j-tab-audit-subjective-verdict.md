# J-TAB audit round 1 — the subjective lane's verdict (`reviewer` on Opus 5.5, native subagent, read-only; 41 tool uses, 341 s; retained verbatim from the subagent's return)

Lane: subjective, as the brief assigns. The `reviewer` alias ran on Opus 5.5 (`claude-opus-5-5`). The dispatch has no defect: it names no report path and assigns no command.

## Per-claim verdicts

1. **CONFIRMED.**
   - `Tab.ts` holds one class plus imports, and follows the landed pattern of `Collapse.ts`: the registry, the snapshot, the controller, the `#change` identity, the `#holds` and `#apply` doors, `find`, and derived getters.
   - The constructor reads the pane (`readTarget`) and the plan (`#planRoles`) before `Tab.#registry.claim`, then binds hooks, then handles the signal and writes. This matches the claim.
   - The plan order is `aria-selected`, then wrapper `presentation`, then `tabindex`, then `role="tab"`. That is the same order as Bootstrap's `_setInitialAttributesOnChild`. The final `filter` drops writes whose value is already present.
   - Attacks that failed:
     - Whether `aria-selected` and `tabindex` bypass `#absent`. They do, as Bootstrap's `setAttribute` does, and the guide's "only where the markup does not already carry that value" still reads true.
     - Whether a control outside any list writes anything. `#list()` returns undefined, so it writes nothing.
   - Every named case has a row in `j-tab-mutations.log.txt` (rows 2–10, 37, 43).
   - Naming defects in this code are recorded as F3 and F5.

2. **CONFIRMED** on the sequence, read from source. The door-completeness clause is referred.
   - `show` dispatches `hide.vn.tab`, reads only the lifetime, dispatches `show.vn.tab`, and then reads both results. After that it re-reads `#refused()` and `#sibling() !== outgoing`.
   - The sibling writes pass empty door sets. `held = [active]` takes effect from the host write, `[active]` from the pane's `active`, and `settled` from `shown`. After that come `reflow` under `fade`, `settleAnimations`, the door, `hidden`, the door, clearing `#change`, `shown`, and `!aborted`.
   - Attack that failed: a reaction during the sibling phase that re-enters `show`. The host is not yet active, so the inner call runs, replaces `#change`, and the outer call reads the takeover (row 30).
   - Every named case appears in a row, either named or joined. "runs one swap…" is joined only through row 23, and "…sibling takes over during the fade…" only through rows 18, 20, 23, and 33. The E15 carve-out matches E15's text.
   - "No door admits a state the call then writes over" is referred as R1.

3. **CONFIRMED.**
   - `destroy` returns early when already aborted, aborts, releases the claim, and restores. This mirrors `Collapse.destroy`.
   - Patch C matches the claim: `[...this.#owned].reverse()` in both `destroy` and `#release`, the added case, and the guide replacement. `j-tab-delegate-order.log.txt` reads "1 failed of 43", then "0 failed of 43", then "restored byte for byte".
   - Attack that failed: whether copying the set before reversing is safe while deleting inside `#release`. It is, because the copy is iterated.
   - Where the reverse order is documented is recorded as F7.

4. **REFUTED** on one proof clause. The mechanism clauses hold.
   - The routes read as claimed: `#activate` calls `#conflicts || #contends` and then the three routes. The anchor or area default is prevented before the `#disabled` read. `#press` narrows with `isInstance(event, KeyboardEvent)`. `#routeTabKey` runs the key filter, the closest `list`, `stopPropagation` and `preventDefault`, the enabled controls, and `Home`, `End`, or `computeNeighbor`, then `#mark`, `focus({ preventScroll: true })`, the aborted read, and find-or-acquire.
   - All three departures appear in `#### Tab`: the delegate owns the keyboard, focus moves from the matched control, and a `disabled` attribute disables whatever its value.
   - **The refuted clause:** "the listener-count case, each with its rows" is false. The case "registers one click and one key listener on the root and releases both and its engines" appears in no row of `j-tab-mutations.log.txt` and no row of `j-tab-mutations-first-run.log.txt`. A grep for "one key listener" across the units folder matches only `j-tab.diff`. Row 51, "the delegate has no key route", joins three cases and not this one.
   - Right looks like this: a row that drops the `keydown` `addEventListener` and reddens that case by name.
   - The naming defects here are F1 and F2. A structural concern is referred as R2.

5. **CONFIRMED.**
   - `isTabEvent` matches the claim: it wraps its checks in `try`, then `isInstance(value, CustomEvent)`, an object detail, and `relatedTarget` absent, undefined, or an `HTMLElement`.
   - The four tables are frozen with the claimed values. No `TAB_DEFAULTS` exists.
   - `computeNeighbor` matches Bootstrap's `getNextActiveElement`, branch for branch.
   - The barrel and the export-list rows are present (rows 44, 67–73).
   - Attack that failed: whether `TAB_ATTRIBUTES.target` repeats the literal attribute name. It reads `TARGET_ATTRIBUTE`.
   - The name of the `next` parameter is F6.

6. **CONFIRMED.**
   - (i) Bootstrap's pane completion waits a fixed duration and then adds `show`, which starts a transition nothing watches. Reading `tab.js` `_activate` and `queueCallback` supports the writer's ruling, and row 27 pins the layout step.
   - (ii) `tab.js` `_activate` and `_deactivate` return before `_toggleDropDown` for a role other than `tab`, and `#select` runs only for `entering` or `leaving`.
   - (iii) R5 and TAB4 outrank TAB5's "keydown listener". Patch A carries the correction.
   - All three decisions are stated in `#### Tab`: "for a sibling whose role is `tab`…", the fade paragraph, and "The tab listens for no key".

7. **REFUTED** on the § Delegation clause. The fence clause is UNRESOLVED.
   - The § Surface rows equal their TSDoc summaries, and the `plugin` row reads `shipped` with Proof `tests/src/browser/Tab.test.ts`.
   - **§ Delegation.** Under the Orchestrator's ruling, patch B lands without its § Delegation hunk. `guides/veneer.md` § Delegation (around line 588) then keeps "Destruction removes the listener and the observer". The landed delegate registers two listeners, `click` and `keydown`, so the sentence states a fact the source contradicts.
   - Why it matters: until W5 lands, the guide tells a consumer the delegate has one listener.
   - Right looks like this: land the two B lines that correct sentences the landed source makes false ("listens for clicks and keys on its root" and "removes the listeners and the observer") in this unit. Leave only the additive `tab`-option sentence to W5.
   - **Fence.** "Runs as written" has no executed evidence. `tests/guides.test.ts` checks fence languages and imports only, and no case in `tests/src/browser` builds the fence's `home`, `profile`, `homePane`, and `profilePane`. Reading the source, the fence resolves `true`. A test that executes the fence would settle it, and `documentation.md` § Parity names that test's home.
   - Bound: in `#### Tab`, "The `show` method resolves `false` when the control is already active, …, or the tab is destroyed" is the same enumeration patch A calls incomplete in `types.ts`. The doors paragraph that follows adds the takeover, so this sentence is incomplete rather than false.

8. **CONFIRMED.** The Orchestrator's replay clause is UNRESOLVED.
   - `j-tab-status.txt` lists the ten modified and two added files the report names, and no off-limits path.
   - `j-tab-gates.log.txt` shows every listed gate at exit 0, with 247 passed.
   - The accepted log has 72 `EXACT` or `JOINED` rows, five `GREEN?` rows at 0 failed, and the line "receipt: restored byte for byte".
   - The first run's two `MISSED` rows carry the same mutation names in the accepted run, now `EXACT`.
   - The report records that no `prove` call was made.
   - `j-tab-mutations-orchestrator.log.txt` is absent by design, so the replay clause stays UNRESOLVED.

## Findings outside the claims

- **F1. `Delegate.#contends` is a synonym for `Delegate.#conflicts`** (`src/browser/Delegate.ts`, `#contends` around line 215, beside `#conflicts` around line 200).
  - What is wrong: both implement E12's same-host refusal, one for the button and collapse pair and one for the button and tab pair. Both look up the button host with the same code.
  - Why it matters: the design law is one concept, one term. Each later W2 route would add another synonym.
  - Right looks like this: one `#conflicts(target)` that looks up the button host once and reports whether the collapse pair or the tab pair conflicts, with `#activate` calling only that method. `#contends` is deleted (E6).
- **F2. Three sentences the key route makes false or incomplete.**
  - `Delegate.ts` around line 174, the `#activate` comment, says the delegate refuses the button and collapse conflict "and otherwise routes it through both". The code now refuses a second conflict and runs three routes.
  - The `Delegate` class summary (`Delegate.ts` line 31, and the guide § Surface `Delegate` row around line 40) reads "Activates data-attribute hosts through a root's delegated click listener." Tab activation by key runs through the `keydown` listener.
  - `DelegateOptions.root` (`types.ts` line 113) reads "Receives delegated clicks." The root now also receives delegated keys.
  - Why it matters: the summary and the guide row are a parity pair that a consumer reads first.
  - Right looks like this: rewrite the `#activate` comment for the unified refusal and three routes. Set the summary to "…through a root's delegated click and key listeners" in `Delegate.ts` and, through patch B, in the guide row. Set `root` to "Receives delegated clicks and keys" through patch A.
- **F3. Tab's door parameters reuse `control` and `panel` for token lists** (`Tab.ts`, `#holds` around line 225, `#apply` around line 236, and `#select` around line 374).
  - What is wrong: `control` names the token list read on the host. Elsewhere in the same class, `control` names an element (`#record(control, …)`, `#wrapper(control)`, `#dropdown(control)`). In `#select(change, control, panel, element, selected)`, `control` is the host's token list while `element` is the control being written, which is the outgoing sibling when deselecting. `panel` names the pane's token list in a class whose term is `pane`, and `panel` is Collapse's term for its own host.
  - Why it matters: this is the class's hardest-to-read code, and the names point at the wrong elements.
  - Right looks like this: name each token-list parameter for the element it is read on, in this class's terms. One option is `held` and `settled`, the names `show` already gives its locals. Name `#select`'s element parameter `control`.
- **F4. Two private method names differ from what the methods do.**
  - `Tab.#record` (around line 351) wraps `#snapshot.save` for the same job `Collapse.#save` does. It is a second term for that job.
  - `#planRoles` and `#writeRoles` (around lines 301 and 339) also plan and write `aria-selected`, `tabindex`, and `aria-labelledby`, which the guide calls "roles and states".
  - Right looks like this: rename `#record` to `#save`, and give the plan and write pair names that cover roles and states.
- **F5. Types that should be named are left inline in `Tab.ts`.** This is the same kind as the carried `TabVocabulary` item.
  - `readonly [HTMLElement, string, string]` appears in four signatures: the `#planRoles` return, `planned`, `#absent`, and `#writeRoles`.
  - `#dropdown` returns an inline object type (around line 280).
  - What is wrong: the tuple is positional, and its value slot has no name.
  - Why it matters: `AGENTS.md` requires reusable types to be defined in `*/types.ts`.
  - Right looks like this: a named record type in `types.ts` for one planned attribute write (`element`, `name`, `value`) and one for the dropdown (`wrapper`, `toggle`, `menu`). Both go in through patch A.
- **F6. The `computeNeighbor` parameter named `next` is a boolean that does not read as one** (`helpers.ts` `computeNeighbor`).
  - What is wrong: `names.md` requires a boolean to read as an assertion, and `next` does not. `next` also names the returned element at the only call site (`const next = … computeNeighbor(…)` in `#routeTabKey`).
  - The parallel J-DROPDOWN unit declares the same export as `computeNeighbor<T>(list, current: T | undefined, forward: boolean, wrap: boolean)` (`j-dropdown-report.md` D2).
  - Right looks like this: one declaration at landing, with the `forward` parameter and the shared `current` type. The carrier is the landing reconciliation of the two `computeNeighbor` declarations.
- **F7. Patch C documents a delegate-wide change only under `#### Tab`.**
  - What is wrong: reverse destruction order applies to every engine the delegate owns (`Button`, `Collapse`, `Tab`). Neither § Delegation nor the `Delegate` class remarks state the order.
  - Right looks like this: § Delegation and the class remarks say "restores every host … in the reverse of acquisition". The carrier is W5 Integration's § Delegation brief, and the class remarks travel with patch C.

## Attacked and held

- Placement: one class per file, flat at `src/browser/`. The tables live in `constants.ts`, the guard in `validators.ts`, and the helper in `helpers.ts`.
- Every public member is a single word (`host`, `pane`, `active`, `show`, `destroy`, `find`), and the event verbs follow R3.
- R17's vocabulary case is present: "writes, tests, reads, and matches only the replacing values when every group is replaced".
- `#### Tab` has the same structure as `#### Collapse`: the host paragraph, the swap, the class, attribute, and selector tables, the events table, doors and takeovers, the delegate route, and departures. The extra "Dispatched on" column is justified, because the events land on two different elements.
- The departure "Bootstrap's `show` throws when the control has no list" holds by reading: `tab.js` lines 62 and 180 call `SelectorEngine.find(…, null)`, which calls `querySelectorAll` with a `null` receiver. No test ran it, and the writer flagged it.
- E6: the diff leaves no alias, wrapper, `@deprecated` tag, or dead path.
- Case titles are named for what each case proves.

## Referrals (to the objective lane)

- **R1.** Door completeness for `Tab.show`. The sibling phase passes empty door sets, so a reaction there that adds the host's `active` token is not refused. The following `add` does nothing, and the call resolves `true`. Is that admitted state intended?
- **R2.** `Delegate.#routeTab` runs after `#routeButton` and `#routeCollapse` without reading `this.#controller.signal.aborted`. A `toggle.vn.button` or collapse listener that destroys the delegate inside that click lets `#routeTab` call `#acquire`. Starting from an empty `#owned`, that call re-attaches `#observer.observe(root)` on a destroyed delegate and owns a `Tab` that nothing destroys. `#routeCollapse` and `#routeTabKey` both guard this case.
- **R3.** The listener-count mutation row missing in claim 4: decide whether it gates acceptance.

## Bounds

- The key list in `#routeTabKey` is an inline array literal. Bootstrap names its keys as constants. Consider a frozen table.
- The case title "…rather than through this tab attributes" is missing a possessive ("this tab's attributes").
- `TabDetail` and `TabEventMap` in `types.ts` say "tab" for the element, where the class and `#### Tab` say "control". Unify the term through patch A.
- The events table headings "Dispatched on" and "Dispatched" might read better as "Target" and "When".

VERDICT: FAIL 4, 7; outside the claims: F1, F2, F3, F4, F5, F6, F7
