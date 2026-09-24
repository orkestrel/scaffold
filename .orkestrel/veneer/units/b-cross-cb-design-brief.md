# Design brief — BARE-BUTTON (`cb`), the B-CROSS unit the verify verdict added

## Role and engine

Two lanes on one brief, blind to each other: `planner` on Opus 5.5 (native subagent, clean context,
read-only) holds the **subjective** lane (shape, naming, where the scope lives, how the guide states
it); `analyst` on GPT-6 Astra (`codex exec --sandbox read-only` rooted at `/home/user/veneer`) holds
the **objective** lane (correctness, constraints, what the cascade and the gates permit). Each lane
performs the design directly, spawns nothing, edits nothing, and returns a proposal; the Orchestrator
reconciles the two into the unit's brief.

## Objective

A unit plan for BARE-BUTTON: the elements layer's bare `button` rules stop reaching the button form of
a component whose release rule does not write them, so a disabled `button.nav-link` and a
`button.dropdown-item` paint as their anchor forms do, with the owned files, the acceptance criteria,
the mutation each proof must distinguish, and the risks, and the rulings the Orchestrator must take
before dispatch.

## Context

**Finding.** `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md` row V9: a disabled
`button.dropdown-item` paints smaller and paler than a disabled anchor item, and a disabled
`button.nav-link` paler than a disabled anchor; the elements layer's bare `button` rule writes
`font-size: var(--vn-size-2)` and `button:disabled` writes `opacity: var(--vn-button-opacity)`, where
the release's reboot writes `font-size: inherit` and no opacity, and no component rule resets either
for its button form. The B-CROSS re-baseline in
`/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` § Re-baseline adds the unit and
recommends scoping the additions to a button no component class claims, because the elements file
names its subject the bare button; the design lanes rule that recommendation.

**Terrain.** The ground is the verify finding and one partial, so no Grok terrain ran; each lane reads
the tree itself. Start from `src/styles/elements/_button.scss` (every declaration it writes beyond the
release's reboot button rules), `node_modules/bootstrap/scss/_reboot.scss` (the release's button
rules), the pinned inventory `tests/fixtures/oracle/inventory.json` (the `reboot` key's button
selectors), and every component partial under `src/styles/components/` whose release markup admits a
`<button>` element (at least the `btn`, `btn-close`, `dropdown-item`, `nav-link`, `list-group-item`,
`accordion-button`, `navbar-toggler`, `page-link`, carousel control and indicator, and toast and alert
close forms; grep the release's docs markup and the showcase's `app/browser/constants.ts` for
`<button` to bound the set). Name the search behind every set you state.

**Tree.** `/home/user/veneer` at the session branch `fb0516d` (Veneer `main` `217d12b` plus the TOAST
landing). The wave-2 and wave-3 units in flight add the Modal, Offcanvas, Tooltip, Popover, and Toast
components and the utility keys from `2a3f223`; none touches `src/styles/elements/**`. The guide is
`guides/veneer.md` (§ Styles, the elements layer, and § Compatibility's `reboot` rows and Additions).

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing}.md`;
the dispatch anatomy in `/home/user/scaffold/.agents/orchestration.md` § Dispatch anatomy. The
family records `b-passive-family.md` and `b-utilities-family.md` under
`/home/user/scaffold/.orkestrel/veneer/units/` for the proof conventions (D45: a proof reads computed
values; mutation logs retained).

## Unknowns

- Where the scope lives: a selector that excludes every class-bearing button (for example
  `button:not([class])` or a `:where()` form), an exclusion list of component classes, or a reset in
  each component partial. Rule on specificity (the elements layer sits under components, so any
  component declaration already wins; say which declarations no component writes), on the release's
  own behaviour for a class-bearing button, and on what a consumer's own classed button receives.
- Which bare additions are Veneer's own (the `--vn-button-*` fill, shadow, hover, active, focus, and
  disabled opacity) and which the release's reboot also writes; the unit keeps the release's reboot
  declarations on every button.
- Whether the § Compatibility `reboot` rows or `### Additions` rows change, and which ledger or
  additions gate reads the change.
- Which proofs change: the elements proof for the bare button, and a component proof that reads a
  disabled `button.nav-link` and `button.dropdown-item` against their anchor forms.

## Scope

Read-only. Read the finding, the verdicts, the family records, the guide, and the tree. Edit nothing.
Propose; do not decide for the Orchestrator.

## Execution

**A native subagent (planner):** perform the design directly and spawn nothing. **The bench engine
(analyst) reading this inside its own CLI:** perform the design directly and spawn nothing.

## Output

Return one proposal with these sections: `Unit` (its route, owned files, shared report-only files,
off-limits files, dependencies, acceptance criteria ordered cheap-first, the mutation each proof
distinguishes, and the risks); `Rulings needed` (each unknown, with the options, the cost of each, and
a recommendation); `Files the result makes false` (with the search that found them); `Exit criterion`;
and, for the analyst, `Journal` (the journal path and session id). No process diary.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. A lane that finds the finding
and the tree disagreeing reports the disagreement and rules on the tree.
