# Unit J-TYPES — successor brief 9: the round-8 audit's findings

This brief supersedes `j-types-brief-8.md` for the unit's ninth round, run by the same executor on the same uncommitted tree (rounds 6 to 8 over `b9adebf`). What changed and why: the round-8 audit (`units/j-types-audit-8-verdict.md`, reconciling the objective lane's `FAIL 2, 4`, the subjective lane's `FAIL 4`, and the checker's pass) broke two claims and adopted four bounds. Every ruling is an edit here.

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 6 to 8, resumed; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, tip `b9adebf`, rounds 6 to 8 uncommitted in the tree).

## Objective

Give the tab's list-group item one home, state the offcanvas resize listener as a lifetime listener, and land the adopted bounds, with the round-6 acceptance commands green again.

## Context

**Evidence.** `units/j-types-audit-8-verdict.md` (every ruling), `units/j-types-audit-8-objective-verdict.md` (claim 2's sweep and repair, claim 4's source reading), `units/j-types-audit-8-subjective-verdict.md` (claim 4's reading, referral R1, the bounds B1 to B5). Bootstrap 5.3.8's source: `tab.js:46-49` (the outer and inner selectors), `:180`, `:259`, `:264` (their reads, the outer through `closest`); `offcanvas.js:69`, `:129-131`, `:260-263`, `:267-269`, and `base-component.js:65-66` (the resize handler hides only a panel Bootstrap showed). Locate each site by its symbol; every line number here is approximate.

**Law, host, and standing conditions.** As in `j-types-brief-6.md`.

## The edits

- **E41 (claim 2, B5).** `TabSelectorMap` gains `entry`, placed after `wrapper`: "Selects the list-group items, each its own wrapper and its own link, which the engine adds to both sets. Default: `.list-group-item`." `wrapper` becomes "Selects the wrapper that holds a link inside its list; the engine reads `closest` with `:is({wrapper}, {entry})`. Default: `.nav-item`." `link` becomes "Selects the links inside a list; the engine matches `:is({link}, {entry}):not({toggle}), {trigger}` for the list's controls, leaving dropdown toggles out. Default: `.nav-link, [role="tab"]`." Your report carries the Tab row of the mapping table in its new form (the three keys and the two compositions against `SELECTOR_OUTER`, `SELECTOR_INNER`, and `SELECTOR_INNER_ELEM`).
- **E42 (claim 4, R1).** `OffcanvasInterface.show`'s `@remarks` becomes: "The panel listens to the window's resize for its lifetime and hides itself when it is shown and its computed position is no longer `fixed`, which closes a responsive panel past its breakpoint." (the disclaimer sentence goes). Your report's departure paragraph is replaced by this: Bootstrap's resize handler (`offcanvas.js:267-269`) hides only a panel whose live instance Bootstrap showed, because the instance it constructs for an unowned match is unshown (`offcanvas.js:69`) and its `hide` returns at once (`:129-131`, `base-component.js:65-66`); the engine's lifetime listener hides the same set; the departure is Bootstrap's load-time adoption of `.offcanvas.show` markup (`offcanvas.js:260-263`), which the engine does not perform, a consumer constructing the engine over shown markup instead.
- **E43 (B1).** `ButtonInterface`'s description: "Controls the `pressed` token and the `aria-pressed` attribute on a host."; its `host` leaf: "Carries the element whose `pressed` token and `aria-pressed` attribute the button controls."; the guide cell follows.
- **E44 (B2, B3).** `PlacementSide`: "Names the physical side a positioned element resolves to, the value a placement writes to the attribute `attributes.side` names."; `DropdownInterface.update`, `TooltipInterface.update`, and `PopoverInterface.update`: "…and rewrites the attribute `attributes.side` names." in place of "its placement attribute"; the guide row and cells follow.
- **E45 (B4).** Both `@typeParam TMap` sentences on `EventHooks` and `EventWire` read "The entity's event map, keyed by the verb that names each event."
- **E46 (parity).** Every changed description paragraph's Summary cell updated; format the guide on a scratch copy first and report the re-padding.

## Scope, execution, tools, and limits

As in `j-types-brief-6.md`.

## Output

Return the report as your final message: per edit E41 to E46, what changed; the Tab mapping row and the replaced departure paragraph of E42; the output of the round-6 acceptance criteria 1, 2, 3, and 5 verbatim, the rollup's exit code first, with this round's greps: `grep -n "its placement attribute\|verb each wire event mirrors\|not its to hide\|pressed class\|managed class\|\.nav-item, \.list-group-item\|\.nav-link, \.list-group-item" src/browser/types.ts` returns no hit, and `grep -n "readonly entry: string" src/browser/types.ts` returns the dropdown, tab, and carousel keys; `git status --short` and `git diff --stat`.

## Acceptance criteria

Criteria 1, 2, 3, and 5 of `j-types-brief-6.md`, and the two greps above.

## Review evidence

The actual diff (`git diff HEAD`) and status of the worktree, captured by the Orchestrator as `j-types-9.diff` and `j-types-9-status.txt` (rounds 6 to 9 together), and the report.
