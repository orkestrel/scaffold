I held the subjective lane and delivered the full proposal to you through the handback. It proposes seven units, with every state class shown at rest in markup and no unit writing engine code.

**Units and order**
- **Parallel from the tree after CLOSE-GUIDE lands:**
  - COLLAPSE (`collapse` and `collapsing`).
  - DROPDOWN (`dropdown`).
- **Parallel after both land:**
  - NAV (`nav`).
  - ACCORDION (`accordion`).
  - TOGGLES, which ships the `.dropdown-toggle` rows now deferred under the `Disclosure` owner, inside `_button-group.scss` and `_input-group.scss`.
- **Then, one at a time:**
  - NAVBAR (`navbar`).
  - ASSETS, on `builder`, which removes the `$assets` map once it is empty.

Every cascade unit runs on `opus`; the proposal lists each unit's owned files, the proof mutations and its risks.

**Where the tree overrides the terrain report or the brief**
- **The pinned inventory carries all six keys.** It has no `scrollspy` key. `.fade` sits under a separate `transition` key.
- **The `.navbar > .container*` rules belong to the `container` key.** They already ship from `_container.scss`, so NAVBAR writes none of them.
- **`guides/veneer.md` § Surface is stale.** It still names B-COLLAPSE as the unit that generalizes `emitEvent`, `bindEventMap` and `Delegate`. Under D41 that is wrong, and COLLAPSE rewrites the sentence.
- **The guide already assigns the dark-icon fix to the component units.** `_tokens.scss` still declares the navbar and accordion icons in the theme scope. ACCORDION and NAVBAR each move their own to a component dark rule.
- **The brief names the wrong table for ledger rows.** `### Departures from the workspace rows` is a workspace bullet list; ledger rows belong under `### Departures`.
- **The compatibility reader in `tests/setupServer.ts` rejects a `deferred` status.** It accepts only `accepted` and `shipped`, so the plugin rows are recorded as `accepted`.

**Findings the brief did not anticipate**
- **Tailwind conflict:** Tailwind's `collapse` utility hides `.collapse.show` in a combined setup. COLLAPSE must add `collapse` to the Tailwind exclusion list in `tests/setup.css`, the two Tailwind fixtures and the guide's recipe examples.
- **Knock-on frame changes:** once `navbar` ships, the Layout specimens inside a `.navbar` pick up its padding. Once `dropdown` ships, the button group's toggle gains a caret.
- **Forced colours:** the nav link, accordion button and navbar toggler lose their focus ring. Each gains an outline, recorded as an addition, following the pagination and forms precedent.

**Rulings you need to take before dispatch**
- **Scrollspy's owner row:** a `plugin` row with status `accepted` naming J-ENGINE. The alternative is a `deferred` status, which means editing the off-limits `tests/setupServer.ts`.
- **Barrel placement:** insert the family as one block just before `pagination`. The alternative is to land B-PASSIVE-ORDER first.
- **Centred dropdowns:** they render start-aligned, because Popper does the centring. The proposal frames them anyway and records centring as J-ENGINE's.
- **Navbar offcanvas:** prove the rules without a specimen and carry the specimen to the Offcanvas unit. This is a recorded exception to "every selector rendered by a specimen".
- **Card specimens:** switch them to Bootstrap's `nav nav-tabs` markup. This changes the card frames.
- **Navbar dark colours:** mix them from the palette token rather than copy Bootstrap's `rgba` literals.
