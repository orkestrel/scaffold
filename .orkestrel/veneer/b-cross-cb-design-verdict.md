# BARE-BUTTON design verdict (2026-09-24)

The Orchestrator's reconciliation of the BARE-BUTTON (`cb`) design round on one brief
(`units/b-cross-cb-design-brief.md`): the subjective lane, `planner` on Opus 5.5
(`units/b-cross-cb-design-planner-proposal.md`), and the objective lane, `analyst` on GPT-6 Astra
(`units/b-cross-cb-design-analyst-proposal.md`, thread `01a0d165-79a7-77d2-8460-12d27898da29`, journal
`tmp/codex/b-cross-cb-design-analyst.jsonl`), blind to each other. No Grok terrain ran: the ground is
the verify verdict's V9 row and one partial, which each lane read in the tree.

## Rulings

- **B1 The scope is a button with no class and no `data-bs-target` attribute.** Both lanes chose the
  class boundary over an exclusion list or per-component resets. The bare treatment selects
  `button:not([class], [data-bs-target])`. The attribute is on the tag itself, not a position, so the
  guide's rule that an element rule never treats a tag by where the markup puts it holds; it keeps the
  release's classless carousel indicators out of the bare treatment, which the class boundary alone
  would leave in. The planner's alternative, a focus rule in `_carousel.scss`, is refused: it widens
  the unit into a component partial and records carousel additions for a gap the selector closes.
- **B2 Every button keeps the release's reboot.** The universal `button` rule writes the release's
  values (`margin: 0`, `font-family`, `font-size`, and `line-height: inherit`, `border-radius: 0`,
  `text-transform: none`, `-webkit-appearance: button`); the reboot's focus, role-button, typed-input,
  and enabled-cursor rules stay as they are. The calibrated surface and every state and media branch
  (hover, active, focus-visible with its forced-colors ring, disabled, reduced motion) move under B1's
  selector, after the universal rule.
- **B3 A classed button takes the reboot alone.** The guide says so in § Styles beside the elements
  paragraph, and tells a developer to add the `btn` class for the Button treatment; it does not claim
  the `btn` class equals the bare surface. § Tailwind points to it for a utility-classed button. The
  commit message names the published behaviour change.
- **B4 The showcase mode control stays bare.** The shell hooks the control by a data attribute instead
  of the `control` class, so it keeps the bare treatment its shell comment says it borrows and stays
  outside the `.btn` treatment, as `Showcase.test.ts` states. The objective lane's `.btn` alternative is
  refused on that stated design. The unit names the attribute.
- **B5 The ledger follows the cascade.** The `#### reboot` departure rows for the `button` selector's
  `border-radius`, `font-family`, `font-size`, and `line-height` go, because the universal rule writes
  the release's values; the `### Additions` rows move to B1's selector, under the plain, reduced-motion,
  and forced-colors conditions, with the Reason naming a button no class claims; `LAYER_COMPONENTS`
  already attributes the elements layer to `reboot`, so no reader changes. The forced-colors selector
  literal in `tests/conformance.test.ts` follows the compiled selector.
- **B6 The proofs extend the mirrored files.** The elements proof reads a classed button (a fictional
  hook class), an empty `class` attribute, and a `[data-bs-target]` button resolving the reboot alone,
  beside the existing bare cases; the nav, dropdown, and list-group proofs read each disabled button
  form equal to its anchor form on opacity and font metrics, and the focused forms on outline and
  shadow; the carousel proof reads both indicator states; the close proof's transition comments go and
  its missing transition is asserted directly. No new integration proof file.
- **B7 Order.** The unit starts from the session head; its shared patches integrate after the B-MODAL
  and B-UTILITIES landings in flight, and it lands before BCF regenerates the portfolio, so one
  successor lens round rules on the V9 frames.

## Exit criterion

BARE-BUTTON closes when each holds on evidence: the universal rule writes the release's reboot values
and B1's selector carries the calibrated surface and its states; a classed button, an empty class, and
a `[data-bs-target]` button resolve the reboot alone; every showcased component button form reads equal
to its anchor or active sibling on the V9 properties; the classless bare button keeps its calibrated
values; the ledger, additions, presence, and guide parity gates are green with B5's rows; the shell's
affordance case is green; every named mutation's red run is retained; and the changed frames are
regenerated for BCF's successor lens round.
