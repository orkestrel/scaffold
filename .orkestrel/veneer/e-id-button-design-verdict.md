# E-ID-BUTTON design verdict (2026-09-25)

The Orchestrator's reconciliation of the E-ID-BUTTON design round, on one brief
(`units/e-id-button-design-brief.md`): the subjective lane, `planner` on Opus 5.5
(`units/e-id-button-design-planner-proposal.md`), and the objective lane, `analyst` on GPT-6 Astra
(`units/e-id-button-design-analyst-proposal.md`, journal `tmp/codex/e-id-button-design-analyst.jsonl`), blind to each
other. The question comes from `e-identity-design-verdict.md` § Addendum 3: `button:not([class], [data-bs-target])`
strips the default whenever any class appears, which Addendum 2 rules out.

## Rulings

- **The surface sits on the tag.** Both lanes: the calibrated button surface and its states sit on `button` in the
  `elements` layer, whatever class the tag carries. The `:not([class], [data-bs-target])` scope goes. The surface's
  unconditional `cursor: pointer` goes, because the reboot's enabled-only cursor rule already gives an enabled button
  the pointer. The surface declares nothing `!important`.
- **Each button-built class resets the surface on its button form, in the `components` layer, at zero specificity.**
  Both lanes: `:where(button.<class>)` in the class's own partial. The layer order decides before specificity, so a
  reset at rest beats every `elements` state rule on the same property, and every rule the class writes (one class or
  more) beats the reset. A consumer rule in a later layer or unlayered beats both.
- **One reset, one home.** The subjective lane's `button-reboot` mixin in `src/styles/_mixins.scss`, which writes back
  every property the surface writes in any state: the release's value where the release's reboot writes one
  (`font-family: inherit`, `font-size: inherit`, `line-height: inherit`, `border-radius: 0`), and `revert` where the
  release leaves the property to the browser. The objective lane's property-by-property resets are not taken: a reset
  at rest already covers every state, and one mixin cannot drift from the surface. The unit settles, by browser
  reading, any property whose `revert` does not read the release's value, and writes the literal there.
- **The classes.** `:where(button.btn-close)`, `:where(button.navbar-toggler)`, `:where(button.accordion-button)`,
  `:where(button.dropdown-item)`, `:where(button.nav-link)`, `:where(button.list-group-item)`,
  `:where(button.page-link)`, `:where(button.carousel-control-prev, button.carousel-control-next)`, and the carousel
  indicators through `:where(.carousel-indicators [data-bs-target])`, the release's own component selector. A
  classless `button[data-bs-target]` outside a carousel keeps the tag default.
- **`.btn` takes no reset.** Both lanes find `.btn` writes every surface property at rest and in every state. A no-op
  include is a superfluous wrapper (`AGENTS.md` § No superfluous wrappers); a proof that every `.btn` form reads
  unchanged under the widened tag rule replaces it.
- **The search behind the class list.** The Grok lane (`units/e-id-button-docs-brief.md`, session
  `4bd7c042-e8a6-474b-ac26-fa2318478048`) round-tripped but its sandbox refused every fetch and read nothing
  (`units/e-id-button-docs-grok-result.md`). The Orchestrator fetched Bootstrap's `v5.3.8` site sources (sparse clone,
  `25aa8cc`) and ran the search as one lookup (`units/e-id-button-instruments/bs-button-classes.py` and its log):
  every classed `<button>` in the documentation and examples carries one of the preceding classes or `.btn`, except
  the carousel indicators' `active` state class and the documentation site's own `btn-clipboard`.
- **The term.** "Bare button" retires as a term everywhere it appears; the guide says every `button` element takes the
  button surface, and each class the release builds on a button writes the button reboot back.
- **Routing.** The objective implementation belongs to `sol` on GPT-6 Astra, but a bench sandbox cannot run the
  browser proofs this unit lives on (`.agents/orchestration.md` § Bench laws, rule 5), so the units run on `opus` on
  Opus 5.5, the native writing lane; their audits run the analyst on GPT-6 Astra.

## Units

- **E-ID-BUTTON-CASCADE** (`opus` on Opus 5.5), from the E-ID landing head: the mixin, the tag rule, the includes,
  the element proofs (the tag keeps the surface under an empty, a utility, a consumer, and an attribute-only class
  list, at rest and in every state; a consumer override wins with no specificity contest; the reset's property set
  equals the surface's), the `.btn` unchanged proof, the conformance and Tailwind fixtures, and the guide rows and
  prose. Brief: `units/e-id-button-cascade-brief.md`.
- **E-ID-BUTTON-CLASSES** (`opus` on Opus 5.5), after CASCADE: each button-built class's button form read at rest,
  hover, press, keyboard focus, and disabled under a holder that retunes the leak-prone tokens, against the release's
  values, each red when its partial's include goes.

## Exit

The tag rule reads no class; every button-built class lays out and paints as the release's under the retuned holder;
a utility-classed and a consumer-classed button keep the surface; the guide says so.
