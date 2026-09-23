# Design brief — B-MODAL … B-CAROUSEL (the overlays and feedback family's cascade keys)

## Role and engine

Two lanes on one brief, blind to each other, each a native Opus 5.5 subagent in a clean context,
read-only: `planner` holds the **subjective** lane (shape, naming, the feel of the partials, the
specimens, the proofs, and the guide sections a reader meets); `reviewer`, told it holds the
**objective** lane (correctness, constraints, what the cascade, the ledger, the registries, and the
gates permit), substitutes for `analyst` on GPT-6 Astra because the Codex bench is dark on quota
(`ROADMAP.md` § Standing conditions, 2026-09-23 13:34 UTC); the substitution is recorded in the
round's verdict. Each lane performs the design directly, spawns nothing, edits nothing, and returns
a proposal; the Orchestrator reconciles the two into the family record and the plan.

## Objective

A unit plan for the family B-MODAL … B-CAROUSEL under ruling D41: the units that ship the keys
`modal`, `offcanvas`, `tooltip`, `popover`, `alert`, `toast`, and `carousel` in the cascade, the
showcase, the proofs, the capture registry, and the ledger, every state class rendered statically,
with the Modal, Offcanvas, Tooltip, Popover, Alert, Toast, and Carousel plugin obligations and the
`Backdrop`, `FocusTrap`, `ScrollBarHelper`, `Swipe`, `Sanitizer`, and `TemplateFactory` utilities
deferred to J-ENGINE with owner rows; each unit with its keys, owned files, order and parallelism,
acceptance criteria, the mutation each proof distinguishes, and its risks; the family rulings the
record must carry; and the rulings the Orchestrator must take before dispatch.

## Context

**Terrain.** `/home/user/scaffold/.orkestrel/veneer/units/b-modal-terrain-report.md` (the Cursor
Grok distillate at `87ff1d0`: § A the oracle surface per key with the classes that exist for the
engine, § B the plugin obligations and the utilities, § C Elements and Mailbox with the Elements
appearance rulings, § D what the tree carries (the four `Overlays` deferred rows, `CLOSE_DEFERRED`,
the stack ladder tokens, the carousel theme variables), § E the rulings, § F sizing and the
inventory summary, § G the files the family makes false, the contradictions, and the unresolved
inputs). It reads the disclosure terrain first and reports only what this family adds:
`/home/user/scaffold/.orkestrel/veneer/units/b-collapse-terrain-report.md` § C (the shipped engine)
and § E (the shipped styles pattern) bind here too. The terrain wins over any restatement; stop and
report where the tree disagrees with it.

**The sibling family.** `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md` (R1
to R19) and `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-family.md` rule the disclosure
family under the same D41; reuse a ruling where the case is the same (states at rest, room for
positioned parts, plugin rows in § Compatibility with owner J-ENGINE, dark retunes on component
rules, the caret-style inline structure, breakpoints through `visitBreakpoint`, forced colours,
guide wording, names) and propose a departure only where this family's surface differs. The
B-COLLAPSE wave-1 units (COLLAPSE, DROPDOWN, NAV) are writing in worktrees from `87ff1d0`; `.fade`
lives in `_transitions.scss` beside `.collapse` and is recorded under the `transition` key as well
as under `modal` and `offcanvas` (the terrain's contradictions).

**Ruling D41.** `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` § D41 and the
`ROADMAP.md` § Phases and units row for B-MODAL … B-CAROUSEL. No unit writes engine code, an event,
a listener, a focus trap, a scroll lock, or a proof that drives behaviour.

**Obligations.** The family row and the family-queue bullet in `ROADMAP.md`; exit criterion items
2, 3, and 7; the four `### Deferred selectors` rows whose owner is `Overlays` and the
`CLOSE_DEFERRED` list in `tests/setupStyles.ts`; the guide's `### Close classes` sentence assigning
the header combinators to the overlay components; the `### Bootstrap variables Veneer retains`
paragraph on the carousel variables and the `mask-image` forward path; the stack ladder rows under
`#### Motion, focus, validation, breakpoints, and stacking`.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing,architecture}.md`;
`/home/user/scaffold/.agents/orchestration.md` § Dispatch anatomy. The guide is `guides/veneer.md`.

**Host facts for the units.** As the disclosure family record's § Host facts states (npm 11 on
`PATH`, Chromium, the 390 and 1280 variants in light and dark, `visitBreakpoint`, `stageMedia`).

## Unknowns

- How a static specimen shows each key at rest when the release's visibility is an inline style or
  a plugin-added class: `.modal` is `display: none` and `.show` only transforms the dialog (the
  plugin writes `style.display`), so a shown modal specimen needs an inline `display: block` or a
  showcase wrapper; `.offcanvas` is fixed and off-screen inside its breakpoint's `max-width` query
  and `.show` transforms it in; `.tooltip` rests at `opacity: 0` and `.show` sets it; `.popover`
  has no `.show` rule; `.toast:not(.show)` is `display: none`; the carousel's `.active` item and the
  `.carousel-item-next` and siblings position slides. Rule what each resting specimen carries in
  markup (the state classes and any inline style), what its wrapper reserves (a fixed modal or
  offcanvas covers the page: the showcase's frame and the capture grammar's page frame), and how
  the mid-transition classes (`.showing`, `.hiding`, `.modal-static`, `.carousel-item-next`,
  `-prev`, `-start`, `-end`) are proved (a resting specimen per class, or a proof that reads the
  rule's declarations without a frame, with the reason recorded).
- Whether `.fade`, `.modal.fade .modal-dialog`, and `.offcanvas-backdrop.fade` belong to the
  `transition` key (B-CROSS) or to `modal` and `offcanvas` under D22's most-specific-key rule (read
  D22 in `decisions-round-2.md`), and which unit ships `.fade` itself.
- The backdrops: `.modal-backdrop` and `.offcanvas-backdrop` are elements the plugin creates; rule
  whether a resting specimen renders one in markup (a sibling element inside the wrapper) and how
  the page frame photographs it.
- The four `Overlays` deferred rows (`.alert-dismissible .btn-close`, `.toast-header .btn-close`,
  `.modal-header .btn-close`, `.offcanvas-header .btn-close`): which unit ships each in its own
  partial and closes the row and the `CLOSE_DEFERRED` entry.
- The stack ladder: `--bs-modal-zindex`, `--bs-backdrop-zindex`, `--bs-offcanvas-zindex`,
  `--bs-tooltip-zindex`, `--bs-popover-zindex`, `--bs-toast-zindex` bind to the declared
  `--vn-stack-dialog-*`, `-drawer-*`, `-hint`, `-popover`, `-toast` tokens; rule the ledger rows.
- The carousel: the control icons are SVG data URIs with an rtl comment (D5: no rtl); the guide
  names `mask-image` as the forward path for reading a custom property into the icon; the three
  `--bs-carousel-*` theme variables are already emitted by `_mixins.scss` under `theme` while
  `.carousel-dark` re-declares them; rule the icon treatment, the dark handling (the sibling
  family's R3), and whether the light block `:root, [data-bs-theme="light"]` ships as recorded.
- The tooltip and popover arrows: `.bs-tooltip-auto[data-popper-placement^=…]` extends the side
  classes; rule the placement specimens (four sides at rest, positioned by the wrapper) and how
  `[data-popper-placement]` ships without an engine (as recorded: an attribute the engine writes).
- The offcanvas responsive loop (`.offcanvas-{sm..xxl}` inside `max-width` queries with the
  `min-width` inline form): the breakpoint proofs and the specimens per infix.
- The unit split and order: keys per unit (modal and offcanvas share the backdrop mixin; tooltip
  and popover share the arrow structure; alert and toast are small), which run in parallel from
  one base, and what the family record adds over the disclosure record.

## Scope

Read-only. Read the terrain, the disclosure family's verdict and record, the decisions, the
roadmap, the guide, and the tree. Edit nothing. Propose; do not decide for the Orchestrator.

## Execution

**A native subagent (planner, or reviewer holding the objective lane):** perform the design
directly and spawn nothing.

## Output

Return one proposal with these sections: `Units` (each with a name, keys, role and engine route,
owned files, shared report-only files, off-limits files, order and dependencies, acceptance
criteria ordered cheap-first, the mutation each proof distinguishes, and the risks); `Family
rulings` (the rulings the family record must carry, numbered, each with its option, cost, and
recommendation, naming which disclosure-family rulings it reuses unchanged); `Rulings needed` (each
unknown, with the option, its cost, and a recommendation); `Files the result makes false` (per
unit, derived from terrain § G); and `Exit criterion` (the enumerated capabilities whose closure
ends the family). No process diary.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. A lane that finds the
terrain and the tree disagreeing reports the disagreement and rules on the tree. A lane that finds
a state it cannot render statically names it and proposes the proof-without-frame form or the
deferral row rather than an engine.

## Acceptance criteria

The proposal names every key's closure and every plugin and utility deferral with owner J-ENGINE,
every unit's owned files are disjoint from every other unit's, every proof named carries the
mutation it distinguishes, and no unit writes engine code.
