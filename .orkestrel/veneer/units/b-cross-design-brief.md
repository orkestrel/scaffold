# Design brief — B-CROSS (the cross-cutting family: theme, transition, media, keyframes)

## Role and engine

Two lanes on one brief, blind to each other, each a native Opus 5.5 subagent in a clean context,
read-only: `planner` holds the **subjective** lane; `reviewer`, told it holds the **objective**
lane, substitutes for `analyst` on GPT-6 Astra because the Codex bench is dark on quota
(`ROADMAP.md` § Standing conditions); the substitution is recorded in the round's verdict. Each
lane performs the design directly, spawns nothing, edits nothing, and returns a proposal.

## Objective

A unit plan for B-CROSS: the units that close the `theme` and `transition` inventory keys, the media
conditions as a group (the breakpoint ramp, `prefers-reduced-motion`, print), and `keyframes` as a
group, under exit criterion items 2, 3, and 6, with the right-to-left mechanism and the
`DOMContentLoaded` auto-initialization rows refused by the standing rulings; each unit with its
owned files, order, acceptance criteria, the mutation each proof distinguishes, and its risks; the
family rulings; and the rulings the Orchestrator must take before dispatch.

## Context

**Terrain.** `/home/user/scaffold/.orkestrel/veneer/units/b-cross-terrain-report.md` (Cursor Grok at
`87ff1d0`: § A the oracle surface (`_root.scss` groups, the dark block, `_transitions.scss`, the
mixins, the print loop, every release keyframe and its reduced-motion handling), § B what Veneer
ships (`_tokens.scss`, `_theme.scss`, `_mixins.scss`, the reset's `scroll-behavior`, the three
keyframe partials, the § Tokens rows, the retained-variables paragraph, the proof cases), § C how
the accounting compares a condition and a keyframe, § D the rulings, § E sizing, § F the files the
family makes false, and the inventory reading: `theme` 15 selector records, `transition` 7, every
component `media` array empty with conditions on selector records and a top-level `media` list,
`keyframes` only on `progress`, `spinner`, and `placeholder`, `fade` a class on `transition`
selectors, not a key). It wins over any restatement; stop and report where the tree disagrees.

**Sibling rounds.** `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md` (R1 to
R19) and `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md` (R1 to R17), and the
running B-MODAL … B-CAROUSEL design round, rule the families whose keys read these mechanisms:
`.collapse` and `.collapsing` are the `collapse` and `collapsing` keys (COLLAPSE, wave 1, writing
in a worktree); `.fade` and its modal, backdrop, and offcanvas forms are recorded under
`transition` and again under `modal` and `offcanvas`; the print pass is the `d` key's (UTIL-DISPLAY
owns `d-print-*`); the breakpoint ramp is emitted by `breakpoints()` and read by every responsive
partial; the `theme` key's dark component selectors (`.form-select`, the switch knob,
`.navbar-toggler-icon`, `.accordion-button::after`) are shipped or assigned to ACCORDION and NAVBAR
(R3 of the disclosure verdict); the carousel triples are B-MODAL's. So B-CROSS owns what no family
key owns: the `theme` key's root and mode records, `.fade` itself, the reset's reduced-motion
`scroll-behavior` record, the § Compatibility rows for `theme` and `transition`, the media and
keyframe accounting as groups, and the guide's statement of each.

**Obligations.** `ROADMAP.md` § The family queue, the **B-CROSS** bullet; § Phases and units, the
B-CROSS row; exit criterion items 2, 3, and 6; the standing refusals (D5 right-to-left; the
`./browser/auto` entry and `DOMContentLoaded`); the § Compatibility engine rows for `transition`
and initialization (`accepted`) and the absent `theme` and `transition` component rows; the
`### Additions` sentence calling `theme` a key "this package does not ship"; the inventory's
`digests["bootstrap.rtl.css"]` still present after D5.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,names,documentation,writing,architecture}.md`;
`/home/user/scaffold/.agents/orchestration.md` § Dispatch anatomy. The guide is `guides/veneer.md`.

## Unknowns

- What closes the `theme` key: its 15 records are `:root` and the mode selectors Veneer already
  emits through `_tokens.scss` and `theme-tokens`, the four dark component selectors (owned by
  their components), the reset's `scroll-behavior` record, and the breakpoint and carousel
  triples; rule how the ledger accounts a key whose records other partials write (the
  `attributeSelector` ladder assigns a selector to a key; the § Compatibility `theme` row's status
  and proof), and what "shipped" means for it.
- What closes the `transition` key: `.fade` and `.fade:not(.show)` ship where (a `_transitions.scss`
  partial beside `_collapse.scss`, or the `collapse` partial), and the modal, backdrop, and
  offcanvas forms with their owners (B-MODAL); rule the split and the `### Deferred selectors` rows
  until B-MODAL lands.
- The media group: the inventory's top-level `media` list (the `min-width` and `max-width` ramp
  pairs, `prefers-reduced-motion` both ways, `print`) has no key; rule what the guide records
  (§ Tokens breakpoints rows exist; `reduced-motion` and `breakpoint-*` mixins exist) and what
  proof pins the group (the mixins proof already reads each breakpoint condition; the print pass is
  UTIL-DISPLAY's), and whether a `media` row belongs in § Compatibility.
- The keyframes group: the five names ship in their partials; rule what B-CROSS adds (a group
  statement in the guide, a proof that every recorded keyframe name is emitted by its key's partial
  under the same reduced-motion handling, or nothing beyond the accounting already green).
- The D5 residue: `digests["bootstrap.rtl.css"]` in the inventory fixture (off-limits: the fixture
  is pinned) and the guide's accepted initialization row naming `onDOMContentLoaded`; rule what
  the guide says and who owns the fixture's digest (T-family, `@orkestrel/test`, or a recorded
  observation).
- Unit split: whether B-CROSS is one `opus` unit, a `builder` unit for the guide rows plus proofs,
  or two units (theme and transition; media and keyframes), and its position after the families
  whose keys it references (after B-MODAL lands for `.fade`'s owners, or before with deferral rows).

## Scope

Read-only. Read the terrain, the sibling verdicts, the decisions, the roadmap, the guide, and the
tree. Edit nothing. Propose; do not decide for the Orchestrator.

## Execution

**A native subagent (planner, or reviewer holding the objective lane):** perform the design
directly and spawn nothing.

## Output

Return one proposal with the sections `Units`, `Family rulings`, `Rulings needed`, `Files the
result makes false`, and `Exit criterion`, in the shape the sibling design briefs fix. No process
diary.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. A lane that finds the
terrain and the tree disagreeing reports the disagreement and rules on the tree.

## Acceptance criteria

The proposal names the closure of the `theme` and `transition` keys and of the media and keyframe
groups, every unit's owned files are disjoint from every running unit's, and every proof named
carries the mutation it distinguishes.
