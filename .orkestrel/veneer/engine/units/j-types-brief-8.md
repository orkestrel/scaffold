# Unit J-TYPES — successor brief 8: the round-6 audit's findings

This brief supersedes `j-types-brief-7.md` for the unit's eighth round, run by the same executor on the same uncommitted tree (rounds 6 and 7 over `b9adebf`). What changed and why: the round-6 audit (`units/j-types-audit-6-verdict.md`, reconciling the objective lane's `FAIL 1, 6, 7`, the subjective lane's `FAIL 1, 2, 6, 7`, and the checker's pass) broke four claims and adopted seven bounds; the Orchestrator's probe 8 (`units/j-types-8-probe-sanitizer.log.txt`) measured the `dataAttributes` case. Every ruling is an edit here.

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 6 and 7, resumed; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, tip `b9adebf`, rounds 6 and 7 uncommitted in the tree).

## Objective

Close the round-6 audit's findings in `src/browser/types.ts` and the guide's cells, with the round-6 acceptance commands green again.

## Context

**Evidence.** `units/j-types-audit-6-verdict.md` (every ruling, with its citation), `units/j-types-audit-6-subjective-verdict.md` (claims 1, 2, 6 and the bounds B1 to B9 with their sites), `units/j-types-audit-6-objective-verdict.md` (claims 1, 6, 7), and the probe reading `units/j-types-8-probe-sanitizer.log.txt`. Bootstrap 5.3.8's source: `scrollspy.js:205` (the tracked links are read from the target), `carousel.js:60` and `:220` (`SELECTOR_ITEM_IMG`), `tab.js:49`, `:180`, `:259` (`SELECTOR_INNER_ELEM` is the only read of the inner selector), `offcanvas.js:267` (the resize query the engine replaces). Locate each site by its symbol; every line number here is approximate.

**Law, host, and standing conditions.** As in `j-types-brief-6.md`.

## The edits

- **E31 (claim 1, B2).** `ScrollSpySelectorMap.parent`: "Selects the links that precede a nested list and turn active with a link inside it; the tracked links are the target's `[href]` links, and the `link` getter reports the active one. Default: `.nav-link, .nav-item > .nav-link, .list-group-item`."
- **E32 (claim 2).** `CarouselSelectorMap.image` defaults to `img`: "Selects the images inside the items, whose native drag the carousel refuses; the engine matches `:is({entry}) :is({image})`. Default: `img`."
- **E33 (R1, B2).** `TabSelectorMap.link` states one composition and no private constant: "Selects the triggers inside a list; the engine matches `:is({link}):not({toggle}), {trigger}` for the list's triggers, leaving dropdown toggles out. Default: `.nav-link, .list-group-item, [role="tab"]`."
- **E34 (claim 6, subjective).** `PopoverOptions`' description: "Configures a popover: the tooltip options, a body slot, the popover's markup vocabulary, and the popover defaults."; its guide cell follows.
- **E35 (claim 6, objective; probe 8).** `SanitizerConfig.dataAttributes`' Default: "Default: an unlisted `data-*` attribute is kept only when no `attributes` list applies to its element, neither the global list nor the element entry's own; a listed `data-*` name is kept either way."
- **E36 (claim 7).** `OffcanvasInterface.show` gains, in its `@remarks` or its description, the sentence: "While shown, the panel listens to the window's resize and hides itself when its computed position is no longer `fixed`, which closes a responsive panel past its breakpoint; a panel this engine never showed is not its to hide." Your report rewrites the E27 Offcanvas accounting row to that mechanism (no document query, no registry walk) and names the departure from Bootstrap's document-wide query (`offcanvas.js:267`) for the guide's Compatibility row, which J-OFFCANVAS lands.
- **E37 (B1).** The E30 sentences take the path form: "the attribute `attributes.side` names", "the attribute `attributes.popper` names", "the trigger's attribute `attributes.content` names", on `PlacementSide`, `PlacementInterface.update` (and its guide cell), `PlacementOptions.static`, `DropdownOptions.placement.static`, and `PopoverOptions.content`.
- **E38 (B4).** One token idiom, the backticked key: "carries its `shown` token", "adds its `shown` token", "removes its `shown` token", "carries its `active` token", "carries its `pressed` token", "removes its `pointer` token", at every site E21 touched; `ButtonInterface.destroy` "restores whether the host carried its `pressed` token and its `aria-pressed` value"; the guide cells follow.
- **E39 (B3, B6, B7, B9).** `BackdropClassMap`'s description: "Names the class tokens a backdrop writes; each default is the token the cascade selects on, and each key names the overlay token it receives." (the leaves keep the pass-through). `EventWire`'s first sentence: "Maps each verb of an entity's event map to the wire name of the bubbling DOM event it names." `PopoverClassMap`'s description: "…with the popover's own arrow-placement token." `ScrollLockSelectorMap.fixed`: "Selects the fixed elements whose right padding grows by the scrollbar's width; the engine matches `:is({fixed}, {sticky})` for the padding set. Default: …".
- **E40 (parity).** Every changed description paragraph's Summary cell updated; format the guide on a scratch copy first and report the re-padding, which E39's shorter `BackdropClassMap` description may reverse.

## Scope, execution, tools, and limits

As in `j-types-brief-6.md`.

## Output

Return the report as your final message: per edit E31 to E40, what changed; the rewritten Offcanvas accounting row of E36; the output of the round-6 acceptance criteria 1, 2, 3, and 5 verbatim, the rollup's exit code first, with this round's added greps: `grep -n "SELECTOR_LINK_ITEMS\|SELECTOR_INNER_ELEM\|carousel-item img\|popover vocabulary\|its \`side\` key\|its \`popper\` key\|its \`content\` key\|token membership\|its shown token\|its active token\|its pressed token\|its pointer token" src/browser/types.ts` returns no hit, and `grep -n "readonly image: string" src/browser/types.ts` returns the carousel key; `git status --short` and `git diff --stat`.

## Acceptance criteria

Criteria 1, 2, 3, and 5 of `j-types-brief-6.md`, and the two greps above.

## Review evidence

The actual diff (`git diff HEAD`) and status of the worktree, captured by the Orchestrator as `j-types-8.diff` and `j-types-8-status.txt` (rounds 6 to 8 together), and the report.
