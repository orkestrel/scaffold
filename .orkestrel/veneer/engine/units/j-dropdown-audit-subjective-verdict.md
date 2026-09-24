# J-DROPDOWN audit round 1 — the subjective lane's verdict (`reviewer` on Opus 5.5, native subagent, read-only; 38 tool uses, 464 s; retained verbatim from the subagent's return)

Lane: subjective, with the assigned perspective held in full. The `reviewer` alias served Opus 5.5 (`claude-opus-5-5[1m]`). Opus 5.5 also wrote this unit, so I attacked it on that basis. I ran no commands.

1. **CONFIRMED.** The `Dropdown` construction, menu, and options behave as claimed. I attacked the two merge rules: the `dismiss` group replaces the attribute's reading whole, while `placement` layers key by key. The split held because one `data-bs-auto-close` value feeds both switches, so a partial constructor group has no single attribute key to fall back to per switch. The guide's attribute paragraph states the split. `#locate` mirrors `dropdown.js:100-102`. The constructor writes nothing: every write sits in `#reveal`, `#conceal`, or the placement. The `destroy` order matches `Collapse`. The retained log carries rows 12, 13, and 25 to 33. The Orchestrator's replay of those rows is still pending, as recorded under claim 8.

2. **CONFIRMED.** The show and hide sequences hold. The write order matches `dropdown.js:139-156` (`show`) and `dropdown.js:201-209` (`_completeHide`). The `#holds` and `#apply` doors follow the landed `Collapse` pattern. The in-flight refusal sits in `#refused`, and the takeover inside `show.vn.dropdown` is admitted because `#change` is set after that dispatch. E15 does not apply, because the dropdown's change has two directions. Rows 35 to 40 are in the log. The shape of the private methods is finding F2.

3. **CONFIRMED.** D4 and D5 are the right design.
   - **D4.** In the top layer, an `absolute` box resolves against the initial containing block, so `position-try-fallbacks` flips against the document rather than the viewport. `fixed` restores the viewport boundary that Popper's default flip gives. The named case "flips an element the cascade positions absolute against the viewport of a page taller than it" is row 43, marked EXACT.
   - **D5.** No mechanism in this family takes a `signal`: `HostSnapshot` and `Registry` do not, and the landed `PlacementOptions` declares none. The placement is built in one synchronous call, and `#reveal` reads the lifetime after it returns and destroys the placement. Adding per-write doors to `Placement` would add machinery for a reaction the owner already handles at its next door.
   - The transient writes after `destroy()` are referred as Ref1.

4. **CONFIRMED.** D1 is the right shape. `types.ts` must not gain `hide(click?: MouseEvent)` or a readable `dismiss` member.
   - **Minimal API.** The delegate would be the only consumer of both members, so they would be speculative surface.
   - **Event meaning.** A caller-supplied click would weaken `DropdownDetail.click`, which is defined as "the click that hid the menu".
   - **Configuration stays private.** A readable `dismiss` would expose configuration as state, and no landed interface does that: `Collapse` exposes no `parent`.
   - **Bootstrap parity.** Importing `dropdown.js` installs `clearMenus` on the document (`dropdown.js:442-443`), and it reaches every instance through `getInstance` (`dropdown.js:364`). So a directly constructed Bootstrap dropdown closes on an outside click. A side-effect-free import (R1) can only reproduce that if the engine owns the dismissal.
   - **R9.** The ruling says menus "implement Bootstrap's `autoClose` matrix themselves".
   - **Nested roots.** One listener per engine avoids processing a document click once per delegate.
   - **Modal precedent.** R8 gives the modal its own light-dismiss check.
   - The check sequence in `#lightDismiss` matches `dropdown.js:357-390`.
   - Binding the listeners for the lifetime rather than per show is a bound. The same reasoning, applied to the arrow keys, produces F1.

5. **CONFIRMED** on the letter of the claim.
   - **Disabled-toggle order.** Leaving a disabled toggle's default action alone is not a defect. The claim's premise is wrong for dropdowns: `component-functions.js` is the dismiss-trigger route. Bootstrap delegates the dropdown click on `SELECTOR_DATA_TOGGLE`, which excludes `.disabled` and `:disabled` (`dropdown.js:55`, `444-446`), so Bootstrap leaves a disabled toggle's default action alone too.
   - **Key route.** `#press` matches `dataApiKeydownHandler` except for `stopPropagation`, which the guide lists as a departure. `#conflicts` implements E12 as amended.
   - The route applies the delegate's own entry vocabulary to engines it did not construct. That is F1.

6. **CONFIRMED.**
   - The tables are frozen at every level.
   - The defaults match `dropdown.js:72-78`.
   - The parsers return `undefined` rather than throwing, as the `parse*` form requires.
   - `computeNeighbor` follows the `compute*` helper prefix.
   - `isDropdownEvent` has the same shape as `isCollapseEvent`.
   - Rows 34 and 71 to 81 are in the log.
   - The type of `DROPDOWN_DEFAULTS` is F4.

7. **BROKEN.** Two sentences are false of the source.
   - **(a) The `#### Dropdown` placement paragraph.** The sentence "Above and below, a menu whose `--bs-position` property reads `end` … aligns its right edge …, and every other menu aligns its left edge" is false for a centered menu.
     - Input: a parent with `.dropdown-center` and a menu with `.dropdown-menu-end`. `#position` returns `'bottom'` before it reads `--bs-position` (see `#position` in `Dropdown.ts`). `PLACEMENT_AREAS.bottom` centers the menu, so neither edge aligns.
     - Fix: scope the sentence to the `up` token and the default downward case, for example "Opening above through the `up` token or below by default, a menu whose …".
   - **(b) The `Dropdown` class summary and its § Surface row.** "anchoring the open menu to the toggle" is false when `data-bs-reference="parent"` or a `reference` element is given. Construction takes `options.reference ?? #refer(host)`, and `#reveal` passes that element to `Placement`.
     - Fix: "Opens and closes a menu from its toggle, anchoring the open menu to its reference." Change the TSDoc and the row together, so parity holds.
   - The rest of the claim held.
     - The § Surface rows equal their summaries.
     - The Dropdown fence imports `@orkestrel/veneer/browser`.
     - The plugin row reads `shipped` with the file-form Proof, as the landed Collapse row does.
     - I agree with the Orchestrator's ruling: the patch lands without its § Delegation hunk.

8. **UNRESOLVED.** The Orchestrator's replay log `j-dropdown-mutations-orchestrator.log.txt` does not exist yet. That replay settles this claim. The rest held:
   - The status lists the claimed files.
   - `j-dropdown-gates.log.txt` records exit 0 for every gate: `check:src:browser`, `oxlint`, `oxfmt`, `test:src:browser` (266 passed), `test:guides`, `test:policy`, the three builds, `test:conformance`, `test:setup`, and the tree-wide `check`.
   - The writer's log shows 81 EXACT or JOINED rows, 7 `GREEN?` rows at 0 failed, identical digests, and `receipt: restored byte for byte`.
   - `Dropdown.ts` and `Placement.ts` contain no `as`, non-null `!`, access modifier, or default export.

## Findings outside the claims

**F1. The arrow-key route navigates every dropdown with the delegate's vocabulary. A dropdown's own `selectors.entry` has no effect.**
- **Where:** in `Delegate.ts`, the entries query inside `#press` (around line 472) reads `this.#dropdown.selectors.entry` and `this.#dropdown.classes.disabled`. `Dropdown.ts` never reads `#selectors.entry`: its reads are `menu` in `#locate` and `navbar` in `#reveal`. `DropdownOptions.selectors` in `types.ts` says "Replaces the selectors the dropdown matches with", with no caveat like the one `ButtonOptions.selectors` carries.
- **Why it matters:**
  - Take a dropdown constructed with `selectors: { entry: '.menu-link' }` under a default delegate. Its arrow keys move focus over `.dropdown-item`. That contradicts the landed § Delegation sentence "an engine you constructed keeps its own groups" and amended R5, which says the delegate "drives one a consumer constructed … without reconfiguring it".
  - Without a delegate, a validated and documented key does nothing.
  - The R17 vocabulary case passes `entry: '.vn-entry'` (the "writes, tests, reads, and matches only the replacing values" case in `Dropdown.test.ts`), yet no code path reads it, so no mutation can fail the case for that key.
  - D1 moved dismissal into the engine because a delegate cannot read a constructed engine's rules. That reasoning applies equally to entry navigation.
- **What right looks like:** entry navigation reads the vocabulary of the engine being driven. I recommend a `types.ts` successor that adds a one-word `DropdownInterface` member for Bootstrap's `_selectMenuItem` (`dropdown.js:327-336`), for example `step(forward: boolean)`. That member would query the engine's own `entry` selector and `disabled` token and call `computeNeighbor`. `#press` would then call `engine.show()` followed by that member. The vocabulary case would then prove navigation over `.vn-entry`.
  - The alternative is to rule `entry` a delegate-only key and say so on `DropdownOptions.selectors`, as `ButtonOptions.selectors` does. Its cost is a documented key that a directly constructed engine ignores, and a § Delegation sentence that becomes false for dropdowns.

**F2. `#reveal` and `#conceal` are named as a pair but have different scopes.**
- **Where:** `Dropdown.ts`, in `show`, `#reveal`, and `#conceal`.
- **What is wrong:** `show()` keeps the refusals, the `show.vn.dropdown` dispatch, and the change identity, and passes only the writes to `#reveal(change)`. `#conceal(click)` is the whole hide.
- **Why it matters:** mirror names tell a reader the contracts mirror. The landed `Collapse` keeps each sequence whole in `show` and `hide`.
- **What right looks like:** fold `#reveal`'s body into the `try` block in `show()`. Keep `#conceal(click)` as the whole hide that both `hide()` and `#lightDismiss` call.

**F3. Two private names in `Delegate.ts` conflict with fixed vocabulary.**
- **What is wrong:**
  - `#toggleOf(target)` takes the `*Of` form, which `names.md` § Fixed derivation/construction forms reserves for combinators. This method is a lookup.
  - `#toggles()` returns a selector string. The landed `Collapse.#triggers()` returns elements, so the plural-noun form already means "the elements" in this codebase.
- **What right looks like:** rename them for what they are, for example `#locateToggle(target)` and `#toggleSelector()`.

**F4. The type of `DROPDOWN_DEFAULTS` is an anonymous public type.**
- **Where:** `constants.ts`, the `DROPDOWN_DEFAULTS` annotation.
- **What is wrong:** it is an inline object type, which is a public type declared outside `types.ts`, against the root rule "ALWAYS define reusable and public types in `*/types.ts`". It is the same kind of gap as the known inline type on `Delegate.#dropdown`.
- **What right looks like:** carry it in the same `types.ts` successor that adds `DropdownVocabulary`. Declare a named type for the dismissal and placement defaults, and annotate the constant with it.

**F5. The `Dropdown` class `@remarks` state a Tab rule the code contradicts.**
- **Where:** the `Dropdown` class `@remarks` in `Dropdown.ts`, around line 42: "a click the `dismiss` option allows, or a Tab key release outside the menu, hides it."
- **What is wrong:** a Tab release outside the menu hides it only when `dismiss.outside` is `true`, because `#lightDismiss` rules it by that switch.
- **What right looks like:** "a click or a Tab key release that the `dismiss` option allows hides it; a Tab release inside the menu never does."

## Attacked and held

- **D1's alternative on the adjacent routes.** The click route and the Escape route use no engine-specific vocabulary beyond routing selectors. So they sit correctly on the delegate, as `trigger` does for Button. Only entry navigation (F1) crosses into engine behavior.
- **Tab release inside the menu.** Bootstrap uses `menu.contains(target)`; Veneer checks whether the menu is in the composed path. The two agree for light-DOM menus.
- **Case titles.** They name what each case proves and carry no control identifiers.
- **`Placement` public surface.** `reference`, `element`, `side`, `update`, and `destroy` are each one word. `side` reads `undefined` when the element does not render.
- **`#press` constructs an engine on Escape over a closed menu.** This matches `getOrCreateInstance` at `dropdown.js:419`.

## Referrals

- **Ref1, to the objective lane.** Suppose a `beforetoggle` listener, or a reaction to one of the placement's writes, destroys the dropdown while `new Placement` is running. The placement keeps writing after `destroy()` returns: inline declarations, the reference's `anchor-name`, the observer, the `scrollend` listener, and the side attribute. `#reveal` only restores them after the constructor returns. Rule this against R1's "no mutation after `destroy()`". Also rule the case where that listener constructs and shows a fresh `Dropdown` on the released toggle: a second `Placement` over an already open menu calls `showPopover` again, and two snapshots cover the same inline properties (the E13 class). Settle both with a case.
- **Ref2, to the objective lane.** The D4 departure sentence says the viewport is the boundary the menu "flips and shifts against". `Placement` writes no shift, and no `Placement.test.ts` case asserts one. Prove a shift with a case, or strike "and shifts".
- **Ref3, to the objective lane.** `#lightDismiss` gates only on the menu's `shown` token. Bootstrap's `clearMenus` also requires the toggle's `.show` token (`dropdown.js:56`, `361`). So a menu that carries `show` from markup, with no engine show, closes through `#conceal` on an outside click. Rule whether that trigger is intended.
- **Ref4, to the Orchestrator.** R7 and the terrain record say "Dropdown through the delegate's keydown route and its own toggle". The writer ruled that only the delegate handles Escape. So a directly constructed dropdown closes on an outside click and on Tab, but not on Escape, and the guide lists no departure. Rule what "its own toggle" requires. If it requires an engine listener, carry it with F1's successor.

## Bounds

- **D1 listener lifetime.** Binding the document listeners at show and releasing them at hide would tie them to the fact they serve. It is not required.
- **`#refer`.** The verb is an awkward name for resolving the reference element.
- **Garbled sentence.** The `#### Dropdown` delegate sentence "is refused as a button and collapse conflict is when no engine of either route exists" needs its commas restored.
- **Patch wording.** The patched `@returns` text "the menu's `shown` token reads the change as taken over" gives a token an action (`writing.md` § Voice and actor).

VERDICT: FAIL 7, 8; outside the claims: F1, F2, F3, F4, F5
