# B-COLLAPSE … B-SCROLLSPY design verdict (2026-09-23)

Subject: the disclosure and navigation family's cascade keys under D41. Brief:
`units/b-collapse-design-brief.md`. Terrain: `units/b-collapse-terrain-report.md`. Lanes, blind on
one brief: `planner` on Opus 5.5 (native, clean context; proposal
`units/b-collapse-design-planner-proposal.md`) and `analyst` on GPT-6 Astra (thread
`01a0ce36-859b-7861-a02c-cccad933d77f`, journal `tmp/codex/b-collapse-design-analyst.jsonl`;
proposal `units/b-collapse-design-analyst-proposal.md`). Both lanes ran; no substitution.

## Units and routing

| Unit | Keys | Role and engine | Wave |
| --- | --- | --- | --- |
| COLLAPSE (`co`) | `collapse`, `collapsing` | `opus` on Opus 5; audited by `analyst` on Astra, `reviewer` on Opus 5, `checker` | 1 |
| DROPDOWN (`dd`) | `dropdown` | `opus` on Opus 5; the same audit | 1 |
| NAV (`nv`) | `nav` (with the tab-pane selectors) | `opus` on Opus 5; the same audit | 1 |
| ACCORDION (`ac`) | `accordion` | `opus` on Opus 5; the same audit | 2, after COLLAPSE lands |
| TOGGLES (`tg`) | the Disclosure deferral rows in `_button-group.scss` and `_input-group.scss` | `opus` on Opus 5; the same audit | 2, after DROPDOWN lands |
| NAVBAR (`nb`) | `navbar`, and the retirement of the emptied `$assets` mechanism | `opus` on Opus 5; the same audit | 2, after COLLAPSE, DROPDOWN, and NAV land |
| VERIFY | the assembled family | `verifier` on Sonnet: the landing chain per landing, one capture-portfolio verdict round after wave 2 | last |

Wave 1 dispatches in parallel worktrees from the commit on which CLOSE-GUIDE and B-PASSIVE-ORDER
have landed. Wave 2 dispatches from the commit on which wave 1 has landed. Shared-file patches
integrate serially at each landing, as the B-PASSIVE family ran; no separate integration unit.
Family record: `units/b-collapse-family.md`.

## Rulings

- **R1 States at rest.** Every state class renders in a resting specimen with the class in markup
  (`show`, `collapsed`, `active`, `.nav-item.show`); `.collapsing` carries no specimen, because the
  journey's census refuses an inline style, and is proved on probe elements (amended 2026-09-23 by the
  Orchestrator's ruling to COLLAPSE, recorded in the family record's rule 2); driven rows
  only for pointer and keyboard pseudo-classes that change the paint; no `CaptureState` member
  added. (Both lanes.)
- **R2 The container combinators stay in `_container.scss`.** The pinned inventory records
  `.navbar > .container*` under the `container` key; the analyst's transfer is refused on that
  evidence. The § Carriers row "Container and navigation combinators" records its cascade half
  closed and its behaviour half J-ENGINE's.
- **R3 Dark retunes on component rules.** `[data-bs-theme='dark'] .accordion-button::after` and
  `[data-bs-theme='dark'] .navbar-toggler-icon` read `tokens.$dark` as `_form-select.scss` does;
  the `.navbar-dark, .navbar[data-bs-theme='dark']` block ships as recorded; `.dropdown-menu-dark`
  stays a class; each unit deletes its own `$assets` rows in the same patch; NAVBAR retires the
  emptied map, its `_theme.scss` walk, and the undeclared-key case (the planner's ASSETS unit folded
  into NAVBAR: the last consumer owns the retirement). The ledger's Condition cell is `—` because
  the attribute is part of the selector. (Both lanes; the fold is the Orchestrator's.)
- **R4 Room for positioned parts.** A menu specimen reserves its menu's room through a wrapper in
  its own direction, registered as a resting row; the journey's hanging-key branch stays keyed to
  the validation tooltips and is not generalized in this family.
- **R5 A rule's specimen lives in its partial's region.** The split-toggle specimens sit in the
  Button group region and the input-group toggle specimens in the Input group region; TOGGLES owns
  those two section proofs. The dropdown-key names the release writes in `_button-group.scss` or
  `_input-group.scss` land there through TOGGLES; DROPDOWN defers any such name with owner
  `Disclosure` so its own key is shipped when it lands.
- **R6 The caret stays inline.** One `@each` over a direction map inside `_dropdown.scss`; no
  mixin, no `$enable-caret` switch; physical `margin-left` under D11.
- **R7 `--bs-position` ships as recorded**, with the guide sentence "No Veneer rule reads
  `--bs-position`; a dropdown engine reads it to choose the menu's placement, as Bootstrap's script
  does."
- **R8 Plugin obligations are recorded in § Compatibility.** One row each for Collapse, Dropdown,
  Tab, and ScrollSpy: component `engine`, kind `plugin`, proof `—`, status `accepted`, the obligation
  cell from terrain § B ending by naming J-ENGINE as owner; one sentence after the table saying a
  `plugin` row records behaviour the engine owns while the classes it sets ship and render in
  markup. `scrollspy` has no inventory key, so it takes no ledger, deferral, or cascade row; the
  reader's `accepted | shipped` status stays.
- **R9 Center placement.** `.dropdown-center` and `.dropup-center` render with frames as the
  cascade paints them (start-aligned); centering is named as J-ENGINE placement in the Dropdown row.
- **R10 The navbar offcanvas rules ship and are proved without a specimen**; the specimen is
  carried to the Offcanvas unit of B-MODAL … B-CAROUSEL (an exception to B-PASSIVE ruling 9,
  recorded in the family record with its reason).
- **R11 Barrel placement.** B-PASSIVE-ORDER lands first; each unit inserts its `@use` line at
  Bootstrap's position (`collapse` and `dropdown` before `button-group`; `nav` and `navbar` between
  `button-group` and `card`; `accordion` between `card` and `breadcrumb`) and extends the
  conformance order case's expected list through a report-only patch.
- **R12 Card specimens.** NAV rewrites the `.card-header-tabs` and `.card-header-pills` specimens
  into the release's markup and owns `CardSection.test.ts`; the card frames change.
- **R13 Literal dark colours** take `color-mix()` over the palette as `_tokens.scss` writes
  `translucent`; the ledger records the category the comparison yields.
- **R14 Tailwind shares the `collapse` name.** COLLAPSE adds `collapse` to the `@source not inline`
  exclusion line in `tests/setup.css`, to both Tailwind fixtures, and to the guide's recipe fences,
  and the consumer proof reads `.collapse.show` visible.
- **R15 Forced colours.** The nav link, the accordion button, and the navbar toggler include
  `forced-ring` beside their shadow ring, each an `### Additions` row under
  `@media (forced-colors: active)` (the D37 and `.page-link` precedent).
- **R16 Breakpoints.** Boundary readings run through `visitBreakpoint` at the boundary and one
  pixel below; the journey's variants stay 390 and 1280, so the `navbar-expand-xl` and `-xxl`
  expanded states have no frame and the navbar section records that limit. (The analyst's added
  1400 variants are refused: a variant is a family-wide cost, and the proofs carry the reading.)
- **R17 Guide wording.** One `### … classes` heading per component (Collapse covers `collapsing`);
  the § Surface sentence reads "they stay that shape until the first engine component carrying a
  cancelable pre-change event lands"; a section states no script behaviour.
- **R18 Names.** Regions `Collapse`, `Dropdown`, `Nav`, `Navbar`, `Accordion`; sections
  `<Region>Section`; constants `<KEY>_COPY` and `<KEY>_SPECIMENS`; no specimen named after its
  region.
- **R19 Proof matrix.** Each unit's report carries a matrix from every recorded selector and
  condition of its key to the proof case, the distinguishing mutation, the specimen, and the
  capture scenario (the analyst's ruling 6), and the checker verifies it.

## Exit criterion

The family ends when: `collapse`, `collapsing`, `dropdown`, `nav`, `navbar`, and `accordion` are
shipped in the `listed` literal with their compatibility rows and the ledger, deferral, and
priority gates green; no `Disclosure` row is left in § Deferred selectors; every state class
renders at rest in a registered specimen with frames at every variant (the `.collapsing` classes
excepted per R1 as amended); the dark retunes live on
component rules and the `$assets` mechanism is gone; the four plugin rows name J-ENGINE and the
`scrollspy` absence is recorded; no unit changed `src/browser/**` or `src/core/**`; the Tailwind
service proofs are green with `collapse` shared; the guide carries the sections, the § Surface
sentence, the forced-colours additions, and the `--bs-position` sentence; the roadmap's family row
and carrier rows record the closure; the capture portfolio is ruled in one verdict round.

## Deviations

None. Both lanes ran on the one brief. The brief's fault: it named `### Departures from the
workspace rows` for ledger rows; the ledger rows sit in the `#### <key>` tables under
`### Departures` (the planner's correction, adopted).
