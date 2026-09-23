# Unit J-TYPES — successor brief 10: the round-9 audit's findings

This brief supersedes `j-types-brief-9.md` for the unit's tenth round, run by the same executor on the same uncommitted tree (rounds 6 to 9 over `b9adebf`). What changed and why: the round-9 audit (`units/j-types-audit-9-verdict.md`, reconciling the objective lane's `FAIL 2`, the subjective lane's `FAIL 2`, and the checker's pass) broke the report's "same set" sentence on the offcanvas resize behaviour in two directions and adopted three bounds. Every ruling is an edit here.

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 6 to 9, resumed; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, tip `b9adebf`, rounds 6 to 9 uncommitted in the tree).

## Objective

State the offcanvas resize behaviour on the interface with the slide-in rule, correct the departure paragraph, and land the three bounds, with the round-6 acceptance commands green again.

## Context

**Evidence.** `units/j-types-audit-9-verdict.md` (every ruling), `units/j-types-audit-9-subjective-verdict.md` (claim 2's slide-in case, the bounds B1 to B3), `units/j-types-audit-9-objective-verdict.md` (claim 2's non-responsive-panel case). Bootstrap 5.3.8's source: `offcanvas.js:33`, `:104`, `:113` (the `showing` token after `_isShown`), `:267-269` (the query with `[class*=offcanvas-]` and the position guard), `:260-263` (the load-time adoption). Locate each site by its symbol; every line number here is approximate.

**Law, host, and standing conditions.** As in `j-types-brief-6.md`.

## The edits

- **E47 (claim 2, B3).** Remove the `@remarks` block from `OffcanvasInterface.show`. Give the `OffcanvasInterface` block a `@remarks` paragraph: "The panel listens to the window's resize for its lifetime and hides itself when it is shown and its computed position is no longer `fixed`, which closes a responsive panel past its breakpoint; a resize during the slide-in is applied when the slide-in settles." `OffcanvasInterface.destroy`'s description names the resize listener among what it releases (in the form `TabInterface.destroy` uses for its key listener); its guide cell follows.
- **E48 (claim 2).** Your report's departure paragraph is replaced by this: Bootstrap's resize handler (`offcanvas.js:267-269`) hides every `[aria-modal][class*=show][class*=offcanvas-]` panel whose computed position is not `fixed`, through an instance that hides only when Bootstrap itself showed it (`:69`, `:129-131`); its query matches the `showing` token too, so it hides a panel still sliding in (`:33`, `:104`, `:113`), and its `[class*=offcanvas-]` part reaches responsive panels alone. The engine hides any panel it showed, responsive or not, whose computed position is no longer `fixed`, and applies a resize that lands during the slide-in when the slide-in settles. The departures for J-OFFCANVAS's Compatibility row: a non-responsive panel a consumer un-fixes is hidden by the engine and ignored by Bootstrap; Bootstrap's load-time adoption of `.offcanvas.show` markup (`:260-263`) is not performed, a consumer constructing the engine over shown markup instead.
- **E49 (B1).** `TabSelectorMap.entry`: "Selects the list-group items, each its own wrapper and its own link, which the engine adds to the `wrapper` and `link` compositions. Default: `.list-group-item`."
- **E50 (B2).** Every Tab sentence that names the inner population (the links, entries, and triggers together) says "control": `TabInterface`'s description ("sibling controls"), `TabSelectorMap.list` ("a control and its siblings"), `TabClassMap.disabled` ("a disabled control"), and any other `Tab*` sentence you find by grepping the Tab declarations for "trigger"; the `trigger` key and the sentences about the `data-bs-toggle` controls keep "trigger". The guide cells follow.
- **E51 (parity).** Every changed description paragraph's Summary cell and every changed § Methods cell updated; format the guide on a scratch copy first and report the re-padding.

## Scope, execution, tools, and limits

As in `j-types-brief-6.md`.

## Output

Return the report as your final message: per edit E47 to E51, what changed; the replaced departure paragraph of E48; the list of Tab sentences E50 changed with their old and new wording; the output of the round-6 acceptance criteria 1, 2, 3, and 5 verbatim, the rollup's exit code first, with this round's greps: `grep -n "both sets\|is applied when" src/browser/types.ts` returns the `entry` sentence for neither pattern and the interface remark for the second, and `grep -n -i "trigger" src/browser/types.ts | sed -n '/TabClassMap/,/TabInterface/p'` is quoted so the Orchestrator can read every remaining Tab "trigger" sentence; `git status --short` and `git diff --stat`.

## Acceptance criteria

Criteria 1, 2, 3, and 5 of `j-types-brief-6.md`, and the greps above.

## Review evidence

The actual diff (`git diff HEAD`) and status of the worktree, captured by the Orchestrator as `j-types-10.diff` and `j-types-10-status.txt` (rounds 6 to 10 together), and the report.
