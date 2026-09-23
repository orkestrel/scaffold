# Unit J-TYPES — successor brief 7: the round-6 deviation and its attribute-name finding

This brief supersedes `j-types-brief-6.md` for the unit's seventh round, run by the same executor on the same uncommitted round-6 tree. What changed and why: round 6 (`units/j-types-report-6.md`) stopped on one contradiction between E24's fixed sentence and the verdict's B6, and found outside its brief that several sentences state an attribute name an attribute map makes replaceable, the attribute-side twin of F2. The Orchestrator rules both here. Round 6's items 2 and 3 outside the brief (the guide's Button paragraph and `Button.ts` writing `BUTTON_ACTIVE` directly) are J-BINDER round 2's and are not in this brief.

## Role and engine

`opus` on Opus 5.5, the native subagent that ran round 6, resumed; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` (branch `unit/types`, tip `b9adebf`, round 6 uncommitted in the tree).

## Objective

Land the B6 ruling on `ScrollLockOptions` and put every attribute-name sentence into the key language, with the round-6 acceptance commands green again.

## The edits

- **E29 (the deviation).** B6 wins: `ScrollLockOptions`' description is "Configures the document a scroll lock holds and the markup vocabulary it matches with." in `types.ts` and in its guide Summary cell.
- **E30 (attribute names stated as fixed).** Each sentence names the key instead of the default: the `PlacementSide` description ("Names the physical side a positioned element resolves to, as the attribute its `side` key names carries it.") and its guide row; `PlacementInterface.update` ("Measures the side the element resolved to and rewrites the attribute its `side` key names.") and its guide § Methods cell; `PlacementOptions.static` ("If `true`, leaves the element in flow, writing `static` to the attribute its `static` key names, mirroring Bootstrap's `display: 'static'`; if `false`, anchors and promotes it. Default: `false`."); `DropdownOptions.placement.static` (the same form, "anchors it in the top layer"); `PopoverOptions.content` ("Default: the trigger's attribute its `content` key names."). Grep `types.ts` for `data-popper-placement`, `data-bs-popper`, and `data-bs-content` after editing: every remaining hit is a "Default:" sentence on an attribute-map key or a value the parity names, and you list them in the report.

## Scope, execution, tools, and limits

As in `j-types-brief-6.md`.

## Output

Return the report as your final message: per edit, what changed; the grep listing of E30; the output of the round-6 acceptance criteria 1, 2, 3, and 5 verbatim, the rollup's exit code first; `git status --short` and `git diff --stat`.

## Acceptance criteria

Criteria 1, 2, 3, and 5 of `j-types-brief-6.md`, and the E30 grep as stated.

## Review evidence

The actual diff (`git diff HEAD`) and status of the worktree, captured by the Orchestrator as `j-types-7.diff` and `j-types-7-status.txt` (rounds 6 and 7 together, the tree being one uncommitted edit set), and the report.
