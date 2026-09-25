# IMPORTANT-LAYER design verdict

The Orchestrator reconciled this round on 2026-09-25. It recommends option (a), unlayered importance,
and the user must rule before any unit writes the cascade.

## Lanes

- **Brief:** `units/important-layer-design-brief.md`, one brief for both lanes.
- **Subjective lane:** `planner` on Opus 5.5, as a Workflow node. Its proposal is retained as
  `units/important-layer-design-planner-proposal.md`.
- **Objective lane:** `analyst` on GPT-6 Astra through `codex exec --sandbox read-only`, thread
  `01a0d6b0-7179-7643-9ca9-dcd8d3afea45`, exit 0. Its proposal is retained as
  `units/important-layer-design-analyst-proposal.md`.
- Both lanes ran blind to each other and reached the same recommendation.

## Ruling proposed to the user

Adopt option (a). Emit every `!important` declaration outside the cascade layers, and keep every
normal declaration in its layer.

- **Why:** the cascade reverses layer order for important declarations and puts unlayered ones last.
  So an important declaration that stays in a layer beats a consumer's unlayered `!important` at any
  specificity. Only (a) keeps the roadmap's promise that a consumer overrides a Veneer `!important`
  with its own, as in Bootstrap.
- **Rejected, (b) layered importance with a record:** it keeps the incompatibility, needs a
  priority record the departure union cannot hold, and keeps Tailwind's important modifier losing
  to Veneer.
- **Rejected, (c) the hybrid:** it creates two priority contracts and still leaves an
  incompatibility to record.
- **Rejected, a dedicated important layer:** any layered important declaration still beats an
  unlayered one.

## What changes for a consumer under (a)

Both lanes derived these results. No run has proved them yet.

- **A consumer `!important`:** an unlayered one loaded after the cascade wins at equal or higher
  specificity, as in Bootstrap. A layered one wins at any specificity, so the escape the guide
  documents keeps working.
- **`<div hidden class="d-flex">`:** it displays as flex in the standalone and `tailwind` profiles,
  as in Bootstrap. In the `preflight` profile it stays hidden, because Tailwind's own preflight
  writes a layered `display: none !important` on `[hidden]`.
- **Responsive offcanvas:** a later important background paints the inline panel at and above its
  breakpoint, as in Bootstrap.
- **Tailwind:** a Veneer important declaration still beats a normal Tailwind utility of the same
  name. Tailwind's important modifier beats a Veneer utility. The exclusion line stays unchanged.
- **Unchanged:** the declaration-priority conformance case compares flags by selector, property,
  and condition, not by layer.
- **Superseded:** R5's placement reason in `b-utilities-design-verdict.md`. The partials keep their
  current layers for normal declarations.

## Units, after the user rules (a)

| Unit               | Role and engine                                          | Scope and acceptance                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| IMPORTANT-PROBE    | `builder` on Sonnet writes it, `verifier` on Sonnet runs it | Scratchpad only. `@at-root (without: layer)` inside a layered rule and a media query compiles to an unlayered rule inside its media query, at its source position. It survives Lightning CSS and the Tailwind compile. A Chromium reading of Tailwind's important modifier against a Veneer utility at the landing head is recorded. This unit runs before the ruling because it writes nothing in Veneer. |
| IMPORTANT-EMIT     | `opus` on Opus 5.5, native                               | One emitter mixin in `_mixins.scss` that sets the flag and the placement in one call. Every important site calls it. An invariant gate over the built cascade reads every important declaration unlayered and every normal one layered, and a planted layered important turns it red. Every proof that pins today's layered outcome flips to Bootstrap's outcome with a control.                                           |
| IMPORTANT-PAIR     | `opus` on Opus 5.5, native                               | The Tailwind service proofs: shared-name winners, a consumer override, the hidden profile boundary, and the offcanvas boundary. This unit runs after TAILWIND-RECIPE, because both own `tests/service/tailwind/**`.                                                                                                                                                                                                     |
| IMPORTANT-CONTRACT | `opus` on Opus 5.5, native                               | The guide's important paragraph and fence, the Tailwind modifier and preflight sentences, and the offcanvas comment. It lands with IMPORTANT-EMIT.                                                                                                                                                                                                                                                                       |

- **Routing deviation, recorded:** both lanes routed IMPORTANT-EMIT to `sol` on Astra. The unit's
  proofs are browser and Tailwind service runs. A bench sandbox cannot measure a spawned child's
  pipes or a loopback listener (orchestration Bench laws, rule 5). So the unit goes native to
  `opus`, and its audit runs `analyst` on Astra for the objective lane.
- **Mixin name:** the planner flagged that `important` is an adjective. Name it `unlayer`, which is
  a verb and names what the mixin does to placement.
- **Sass probe, run by the Orchestrator on 2026-09-25:** `units/important-probe/probe.scss`,
  `probe.mjs`, and `important-probe.log.txt`, compiled with Veneer's installed Sass and Lightning CSS.
  `@at-root (without: layer) { & { … } }` lifts the important declaration out of its layer, keeps
  its selector and its media query, and splits the layer block at its source position. Lightning
  CSS merges the layer blocks and writes the unlayered rules after them, in their own order. That
  order is safe, because an unlayered important rule competes only with other unlayered rules.
  IMPORTANT-PROBE therefore narrows to the Tailwind compile and the Chromium reading.
- **Open measurements for IMPORTANT-EMIT:** whether the `[hidden]` and calendar-picker rules still
  attribute to `reboot` once they leave the layer, and which digest pins and built-size figures in
  `distribution.test.ts` move.

## User rulings needed

- Adopt (a), and accept that `hidden` loses to a `d-*` class and that a later important fill paints
  the inline offcanvas, both as in Bootstrap. Or adopt (b), and amend the roadmap sentences that
  promise the consumer escape.
- Accept that the `preflight` profile's hidden result is Tailwind's own rule, recorded as a profile
  boundary rather than a Veneer departure.
