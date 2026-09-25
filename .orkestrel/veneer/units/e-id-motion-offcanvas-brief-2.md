# Unit E-ID-MOTION-OFFCANVAS, continued — the expanded navbar resets the panel's opacity

Successor to `e-id-motion-offcanvas-brief.md` (staged as `tmp/units/moff-brief.md`), which stays in place unedited and
still binds except where this brief overrides it. What changed: the unit stopped (`e-id-motion-offcanvas-stop-report.md`)
because the ruled hidden-state opacity reaches a resting panel the expanded navbar puts back in the flow, and the
navbar partial's `.navbar-expand{infix} .offcanvas` rule, which resets that panel's visibility, transform, and
transition, writes no opacity. That is Bootstrap's offcanvas-navbar pattern, so the bar's links would vanish at and
above its boundary. The work already in `/home/user/veneer-moff` stays; build on it.

## The ruling

- **The reset lives with the rule that owns it.** Add `opacity: 1` to the navbar partial's
  `.navbar-expand#{$infix} .offcanvas` rule beside its `transform` and `transition` resets, as the stop report's patch
  shows, and correct the comment above that rule, which lists what the bar resets. Do not write the reset in
  `_offcanvas.scss`.
- **Owned, added.** In `src/styles/components/_navbar.scss`, that rule and its comment. In `guides/veneer.md`, the § Navbar
  paragraph that begins "The expanded bar also turns an offcanvas panel into part of its row", and the navbar rows the
  conformance ledger prints for the new declaration. In `tests/src/styles/components/navbar.test.ts`, any case that
  enumerates that rule's declarations (search it before editing and report the result).
- **Plant, added.** `navbar-reset`: remove the added `opacity: 1`; each `lays a shown and a resting panel into the $name
  expanded bar` case fails with an `AssertionError` on the resting panel's opacity. Log and restore it as the original
  brief's plants.
- **The ledger's member for the transition variable.** Record the rows the gate prints. LEDGER-RETUNE decides members
  by resolved value when it lands and regenerates these rows then; do not anticipate it.
- Everything else is as the original brief states. Continue from where you stopped: the rules, the guide rows, the
  plants (with `navbar-reset`), and every Acceptance gate, `npm run test:setup` included.

## Output

As the original brief states, in `tmp/units/moff-report.md`, covering the stop, the ruling applied, and everything
after it.
