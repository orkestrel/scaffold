# Design brief — B-COLLAPSE … B-SCROLLSPY (the disclosure and navigation family's cascade keys)

## Role and engine

Two lanes on one brief, blind to each other: `planner` on Opus 5 (native subagent, clean context,
read-only) holds the **subjective** lane (shape, naming, the feel of the partials, the specimens, the
proofs, and the guide sections a reader meets); `analyst` on GPT-6 Astra (`codex exec --sandbox
read-only` rooted at `/home/user/veneer`) holds the **objective** lane (correctness, constraints,
what the cascade, the ledger, the registries, and the gates permit). Each lane performs the design
directly, spawns nothing, edits nothing, and returns a proposal; the Orchestrator reconciles the
two into the family record and the plan.

## Objective

A unit plan for the family B-COLLAPSE … B-SCROLLSPY under ruling D41: the units that ship the keys
`collapse`, `collapsing`, `accordion`, `nav`, `navbar`, and `dropdown` in the cascade, the
showcase, the proofs, the capture registry, and the ledger, every state class rendered statically,
with `scrollspy` and the Collapse, Dropdown, Tab, and ScrollSpy plugin obligations deferred to
J-ENGINE with an owner row; each unit with its keys, owned files, order and parallelism, acceptance
criteria, the mutation each proof distinguishes, and its risks; the family rulings the record must
carry; and the rulings the Orchestrator must take before dispatch.

## Context

**Terrain.** `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-terrain-report.md` (the
Cursor Grok distillate at `402c033`, with `file:line` pointers: § A the oracle surface per key,
§ B the plugin obligations, § C the shipped engine, § D Elements and Mailbox, § E the shipped
styles pattern, § F the rulings, § G sizing, § H the files the family makes false, and the
contradictions). It wins over any restatement here; stop and report where the tree disagrees with
it. § B, § C, and § D are J-ENGINE's terrain and bind nothing in this round beyond what a state
class needs (the `--bs-position` custom property and the `[data-bs-popper]` placement rules ship
as recorded because the cascade records them).

**Ruling D41.** `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` § D41 (the
user's words and the reading), folded into `ROADMAP.md` at `87ff1d0`: § Phases and units (the
family row, the J-ENGINE row, the E-VUE dependency), § The family queue, § Rulings (the last bullet),
and the three re-carried § Carriers rows. No unit of this round writes engine code, an event, a
listener, or a proof that drives behaviour: a state is a class the specimen carries or the journey
sets, photographed at rest.

**Obligations.** The family row and the family-queue bullet in `ROADMAP.md` § Phases and units and
§ The family queue; the exit criterion items 2, 3, and 7; the seven `### Deferred selectors` rows
whose owner is `Disclosure` (terrain § A, "Guide rows"); the `### Departures from the workspace
rows` and `### Additions` shapes (terrain § E).

**Family pattern.** `/home/user/scaffold/.orkestrel/veneer/units/b-passive-family.md` and
`b-passive-baseline.md` (the B-PASSIVE family record and baseline: the rulings every passive unit
bound, the partial, section, proof, registry, and guide shapes); the reconciled record for this
family takes the same shape. `/home/user/scaffold/.orkestrel/veneer/b-passive-close-design-verdict.md`
(the family close's rulings R1 to R11: the stem rule, the flat `DRIVEN_KEYS` registry, the
`REDUCED_MOTION` constant, the § Showcase rule, the barrel order home in § Styles; the
B-PASSIVE-ORDER row moves the passive block to Bootstrap's order in a later unit, so a unit of this
family inserts its `@use` line at Bootstrap's position relative to the lines present).

**Tree.** `/home/user/veneer` at `87ff1d0` (the session branch: CLOSE-REGISTRY and CLOSE-MOTION
landed; CLOSE-GUIDE, which rewrites § Showcase, § Styles, § Customization, and § Tests of
`guides/veneer.md` and edits `tests/guides.test.ts` and `tests/src/styles/integration.test.ts`,
has not landed and will land before any unit of this family dispatches, so cite those files by
heading or symbol and expect them to move). Veneer `main` is `88684bc`. The mixins
`breakpoint-up`, `breakpoint-each`, `breakpoint-down`, `reduced-motion`, `transition`,
`forced-colors`, `forced-ring`, `focus-ring`, `role-each`, and `theme-tokens` exist in
`src/styles/_mixins.scss` (`grep -n '@mixin'`); `_container.scss` and `_grid.scss` already loop
`breakpoints()` with `breakpoint-up`.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,browser,names,documentation,writing,architecture}.md`;
`/home/user/scaffold/.agents/orchestration.md` § Dispatch anatomy. The guide is `guides/veneer.md`.

**Host facts for the units.** Linux; npm 11 on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
(the manifest's `devEngines` pin refuses npm 10); Chromium installed; a `CAPTURE=1` journey run
of one variant takes about two minutes; `tests/setupPolicy.ts` and `tests/policy.test.ts` are
vendored and off-limits; one writer per worktree, parallel worktrees from the commit the launch
names, shared files (`src/styles/index.scss`, `tests/setup.ts`, `app/browser/constants.ts`,
`app/browser/Showcase.ts`, `tests/setupStyles.ts`, `guides/veneer.md` ledger tables) report-only
with serial integration, as the B-PASSIVE family ran.

## Unknowns

- Which state classes each key renders statically and how the journey photographs each: a
  specimen per state (`.collapse.show`, `.collapsing` with an inline height, the accordion
  button expanded and `.collapsed`, `.nav-link.active`, `.tab-pane.active`, `.dropdown-menu.show`
  under `[data-bs-popper]` and each `.dropup`, `.dropend`, `.dropstart`, and center placement,
  `.navbar-expand-{infix}` at each breakpoint through `visitBreakpoint`), or a driven scenario the
  journey sets by class; rule from the registry's `CASCADE_KEYS` and `DRIVEN_KEYS` shapes and the
  frame grammar.
- How the `%container-flex-properties` `@extend` in `_navbar.scss` and the container combinators
  (`.navbar > .container*`) take Veneer's form (a mixin, repeated declarations, or a shared
  placeholder) without an unrecorded selector, and whether `_container.scss` moves.
- Which unit owns the seven deferred `.dropdown-toggle` rows (the rules live in
  `_button-group.scss` and `_input-group.scss`, other keys' files) and what closes each row: the
  rule shipped in its own partial, the row struck, and the departure or addition rows that follow.
- How the dark retunes bind: `[data-bs-theme="dark"]` on `.accordion-button::after` and the
  explicit `.navbar[data-bs-theme="dark"]` block against Veneer's theme mechanism (`theme-tokens`,
  `role-each`, the F6 theme islands) and the `.dropdown-menu-dark` class; and what the ledger's
  Condition cell carries for each.
- The caret mixin and `$enable-caret`, the physical `margin-left` under D5, and the
  `--bs-position` custom property: ship as recorded, and what the guide says of a property only the
  engine reads.
- Whether the oracle inventory carries a `scrollspy` key at all (no SCSS names it): rule what the
  ledger and the guide record for a key with no cascade, and the owner row's shape.
- The unit split and order: keys per unit, which units run in parallel from one base, and which
  shared-file patches serialize; size from terrain § G.
- What the family record must carry that the B-PASSIVE record did not (state-class specimens,
  breakpoint proofs, dark retunes, the engine deferral rows), so every unit binds one home.

## Scope

Read-only. Read the terrain, the decisions, the family records, the design verdicts, the roadmap,
the guide, and the tree. Edit nothing. Propose; do not decide for the Orchestrator.

## Execution

**A native subagent (planner):** perform the design directly and spawn nothing. **The bench engine
(analyst) reading this inside its own CLI:** perform the design directly and spawn nothing.

## Output

Return one proposal with these sections: `Units` (each with a name, keys, role and engine route,
owned files, shared report-only files, off-limits files, order and dependencies, acceptance
criteria ordered cheap-first, the mutation each proof distinguishes, and the risks); `Family
rulings` (the rulings the family record must carry, numbered, each with its option, cost, and
recommendation); `Rulings needed` (each unknown, with the option, its cost, and a recommendation);
`Files the result makes false` (per unit, derived from terrain § H); `Exit criterion` (the
enumerated capabilities whose closure ends the family); and, for the analyst, `Journal` (the
journal path and session id). No process diary.

## Deviation contract

§ Deviation protocol in `/home/user/scaffold/.agents/orchestration.md`. A lane that finds the
terrain and the tree disagreeing reports the disagreement and rules on the tree. A lane that finds
a state it cannot render statically names it and proposes the deferral row rather than an engine.

## Acceptance criteria

The proposal names every key's closure and the `scrollspy` deferral, every unit's owned files are
disjoint from every other unit's, every proof named carries the mutation it distinguishes, and no
unit writes engine code.
