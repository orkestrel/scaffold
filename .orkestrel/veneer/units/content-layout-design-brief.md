# Design round — the Content/layout family (Veneer's second component family)

## Role and engine

Two lanes on this one brief, blind to each other, clean contexts: `planner` on native Opus 5
(the subjective lane: shape, naming, ergonomics, the unit decomposition's feel, the guide's
ledger shape) and `analyst` on Astra (the objective lane: constraints, what the inventory, the
tokens, the proofs, and the installed helpers actually permit; the risk register). Each proposes;
neither accepts. Perform the assignment directly and spawn nothing. Read-only: edit nothing.

## Objective

A plan proposal for closing the `Content/layout` unit of the Veneer compatibility ledger on
browser evidence, the way U7 closed Button: units, dependencies, ownership, parallel and serial
order, acceptance criteria, risks, and the exclusions to report to the user.

## Context

Read, in order: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/styles.md`,
`tests.md`, `architecture.md`, `names.md`, `documentation.md`; the plan
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/plan.md` (§ Build this product,
§ Exit criterion, § U7 Button as the worked precedent, § Close each component on browser
evidence, § Component queue, § User decisions pending, and the re-baseline record's U7 entries);
the ledger `.orkestrel/veneer/research/ledger.md` (§ Units row `Content/layout`, § CSS rows, § Token
rows, § Obligation rows, § Exclusions) and `research/obligations.md` § Reboot; the Grok terrain
map `.orkestrel/veneer/units/content-layout-scout-report.md` (the family's rows by mechanism with
their `--bs-*` surface, the `--vn-*` bindings present and missing, Elements' equivalents and its
lack of a grid, the proofs Veneer can reuse and must add, the Reboot obligations still missing);
the U7 record as precedent (`u7-design-verdict.md`, `units/u7-design-planner-report.md`,
`units/u7-design-analyst-report.md`, `u7a-audit-verdict.md`, `u7c-audit-verdict.md`,
`u7f-verdict.md`); Veneer's tree at `C:/Users/mikes/WebstormProjects/veneer` (HEAD `060ce02`):
`src/styles/` (`_tokens.scss`, `_theme.scss`, `_mixins.scss`, `elements/`, `components/`,
`index.scss`), `guides/veneer.md` (§ Styles with its `### Deferred selectors` table, § Tokens
with `### Deferred names`, § Compatibility), `tests/setupStyles.ts`, `tests/setupConformance.ts`,
`tests/src/styles/`, `app/browser/` (the `sections/` family), `tests/app/browser/`; Elements at
`C:/Users/mikes/WebstormProjects/elements` (the calibration source; `src/styles/elements/`,
`components/_body.scss`, `_div.scss`, the showcase pages the scout names).

Standing rulings that bind the proposal: implementation over prose (guides are the parity
minimum; audits cover implementation only); the package's surfaces are core, browser, server,
and styles only, no new entry or subpath; a lone class flat at its environment root, families in
lowercase plural folders; no RTL work; Orkestrel packages may be declared, any other dependency
is the user's call; Veneer pilots the styles environment by hand; an exclusion is reported to the
user at the owning unit's acceptance and reopens as a row if rejected.

## Questions to answer

1. **Decomposition.** The mechanism groups the scout names (reboot tags, typography, links,
   images and figures, containers, grid and gutters, tables, the three helpers `icon-link`,
   `ratio`, `vr`). Propose the units in mechanism order with each unit's owned files (SCSS
   partials under `elements/` for bare tags and `components/` or a layout folder for classes,
   their styles proofs, their showcase section, their guide rows), the dependencies between them,
   which can run in parallel on disjoint files, and the route (Astra for constraint-heavy
   mechanical units such as the grid, Opus for shape-and-naming units such as typography).
2. **Tokens.** For each missing binding the scout lists (`--bs-link-opacity`,
   `--bs-link-underline-opacity`, `--bs-body-text-align`, `--bs-gutter-x`/`-y`, the fourteen
   `--bs-table-*` names, `--bs-aspect-ratio`, `--bs-icon-link-transform`, spacers at 1.5 and
   3rem, the display-heading sizes), propose the `--vn-*` token or the recorded departure, in the
   register `_tokens.scss` already uses, and say which Elements value calibrates it or that
   Elements has none.
3. **Elements has no grid.** Propose how the container, grid, and gutter mechanism is accepted
   without an Elements calibration: Bootstrap's own values as the source, recorded as such in the
   guide, or an exclusion for the user. Name the consequence for the exit criterion's captured
   acceptance against Elements' specimens.
4. **Proofs.** Propose the styles-suite breakpoint axis at Bootstrap's 576, 768, 992, 1200, and
   1400 px widths (how a styles proof reaches them: a viewport helper from the installed Test
   package if one exists, or a page-emulation step the unit adds), the capture states per
   mechanism in the `<mechanism>-<state>` form, the showcase sections (one `sections/` member per
   mechanism or fewer), and the ledger rows the guide gains, keeping the deferral grammar
   question (two tables, two shapes) open for the user.
5. **Reboot obligations.** The `[hidden] { display: none !important }` rule and the
   `a:not([href]):not([class])` reset are absent from Veneer; the eight compound bare-tag
   selectors are excluded by the ledger. Propose which unit lands each obligation and where the
   exclusion is recorded.
6. **Exclusions and risks.** List every row the proposal excludes with its reason (for the user),
   and the risks: the Tailwind profile interplay the plan defers, the `!important` rule's place
   in the layer order, the no-compound-tag policy proof, the breakpoint axis under the journey
   harness's 390 and 1280 widths, and anything the precedent's U7a stops (scope omissions in
   briefs) teach for these briefs.

## Output

One report per lane, written as your final message (the Orchestrator retains it): the proposal
as numbered units with owned files, dependencies, route, acceptance criteria per unit (each
independently checkable), the token table, the exclusions table, the risk register, and where
the two lanes' remits differ, the alternatives with a recommendation. Cite `file:line` for every
factual claim about the tree, the ledger, or the scout. No process diary.
