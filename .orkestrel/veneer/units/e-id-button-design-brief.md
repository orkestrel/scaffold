# E-ID-BUTTON design round — a tag-only `button` default beside Bootstrap's button-built classes

## Role and engine

One brief, two blind lanes: `planner` on Opus 5.5 holds the subjective lane (shape, naming, how the default and the
classes read to a consumer, guide voice); `analyst` on GPT-6 Astra holds the objective lane (what the cascade and the
browser actually do, the property-by-property matrix, the proofs). Each lane proposes; neither decides. Read every item
this brief names before proposing. Perform the assignment directly and spawn nothing. Edit nothing.

## Question

`src/styles/elements/_button.scss` in `/home/user/veneer` (Veneer `6882751`) paints the calibrated button surface and
its states only on `button:not([class], [data-bs-target])`. The E-IDENTITY verdict's Addendum 2 rules that shape out for
`dl` and `blockquote` — a default stays on the tag whatever class it carries, and the Bootstrap class that composes a
component writes what Bootstrap's layout needs — and Addendum 3 names the bare `button` rule as the remaining
contradiction. Propose how Veneer gives `button` its default on the tag alone, so that:

- a `button` carrying a utility class, a class of the consumer's own, or an empty `class` attribute keeps the default;
- every Bootstrap class built on `<button>` lays out and paints as Bootstrap's: `.btn` and its variants, `.btn-close`,
  `.navbar-toggler`, `.accordion-button`, `.dropdown-item`, `.nav-link`, `.list-group-item-action`,
  `.carousel-control-prev` and `.carousel-control-next`, the carousel indicators (`[data-bs-target]` with no class at
  rest), `.page-link`, and any other the release's markup documents on `<button>` (search the release's SCSS and
  documentation examples; name the search);
- a consumer overrides the default with a class and no specificity battle.

## Evidence

- Tenets: `/home/user/veneer/ROADMAP.md` § Tenets, especially "Give semantic tags useful defaults without inferring
  components", "Preserve direct control through classes", "Preserve Bootstrap compatibility while owning the
  implementation", and "Make Elements the visual and interaction reference".
- The rulings: `/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md` (the house rule, Addendum 2,
  Addendum 3) and the BARE-BUTTON design verdict it replaces, `/home/user/scaffold/.orkestrel/veneer/b-cross-cb-design-verdict.md`.
- The shipped rule and its prose: `src/styles/elements/_button.scss`; `guides/veneer.md`, the paragraph that begins "A
  bare button is a `button` element"; `src/styles/_layers.scss` or wherever the cascade layers are ordered (search
  `@layer`); the component partials under `src/styles/components/` for each class in the preceding list.
- Bootstrap 5.3.8: `/home/user/veneer/node_modules/bootstrap/scss/` (`_reboot.scss`, `_buttons.scss`, `_close.scss`,
  `_navbar.scss`, `_accordion.scss`, `_dropdown.scss`, `_nav.scss`, `_list-group.scss`, `_carousel.scss`,
  `_pagination.scss`) and `/home/user/veneer/node_modules/bootstrap/dist/css/bootstrap.css`.
- Elements' button: `/home/user/elements/src/styles/elements/_button.scss` (and any partial it names).
- The compiled Veneer cascade: `/home/user/veneer/dist/src/styles/index.css`.
- Standing conditions: the Astra lane's sandbox runs no browser and no Vitest; the Opus lane has read tools only. Where
  a claim needs a browser reading, name the fixture and the reading that settles it as an Unknown for the unit.

## Output

A proposal in this shape, and nothing else:

1. **The mechanism.** The selectors and layers that carry the default and the classes' resets, and why no selector
   reads a tag's context or the presence of a class.
2. **The leak matrix.** For each button-built class: every property the tag default would set that the class does not
   set today, and the reset the class writes (or why none is needed, for example a later cascade layer).
3. **States.** How `:hover`, `:active`, `:focus-visible`, and `:disabled` on the tag default stay off each class's own
   states.
4. **Units.** The implementation units, their owned files, and each unit's proofs: what each proof reads in the browser
   and the mutation that must redden it.
5. **Risks and open questions**, each with the reading that settles it.

State no count.
