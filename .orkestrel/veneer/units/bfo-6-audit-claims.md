# B-FORMS-CONTROL, round 6 (the round-5 prose findings) — audit claims

## Subject

The B-FORMS-CONTROL round-6 writes in `/home/user/veneer-bfo5` (the worktree detached at
`f82de43`, the round-5 and round-6 writes uncommitted in the tree), written by `builder` on Sonnet
from `/home/user/veneer-bfo5/tmp/units/b-forms-control-brief-6.md`: the guide's seam sentence
without its redundant clause, the § Input group classes paragraph stating that the
`.form-control`, `.form-select`, and `.form-floating` rules ship, the `below` cross-reference
replaced, the preceding-focus reason stated in the range case alone and pointed to from the
plain-select and input-group cases, and the layout comment naming the group's scoped `width: 1%`.
Rounds so far on this worktree: round 5 (analyst FAIL 4 with STALE-GROUP-GUIDE; reviewer FAIL 4,
5; checker PASS), this round. **Review evidence.**
`/home/user/scaffold/.orkestrel/veneer/units/bfo-6.diff` (the whole diff against `f82de43`),
`bfo-6-status.txt`, the round-5 diff `bfo-5.diff` (for the delta), the brief
`b-forms-control-brief-6.md` (the prescribed text of every edit), and the report
`b-forms-control-report-6.md`.

## What the round decides

Whether the round-5 and round-6 writes land together on the session branch as one commit after
`f82de43`, the chain re-runs, and CONTROL closes.

## Already established — do not re-run

Every ruling of the five CONTROL rounds and their verdicts (`bfo-audit-verdict.md`,
`bfo-fix-audit-verdict.md`, `bfo-3-audit-verdict.md`, `bfo-4-audit-verdict.md`,
`bfo-5-audit-verdict.md`), including the walk-path and layout-proof rulings of round 5 and the
family ruling that a CSS property, value, function, or `!important` token is its own noun; the
analyst's `npm run check` exited 0 on round 5 and the writer reports 0 on round 6; the sandbox for
the objective lane is read-only with no browser and runs no Vitest project (`npm run check`,
`node -e`, and the Node readers are allowed); the Orchestrator's landing chain settles the gates.

## Unknowns

- Whether the delta between `bfo-5.diff` and `bfo-6.diff` changed anything the brief did not
  prescribe: read the delta against `b-forms-control-brief-6.md` § Edits.

## The threshold

`CONFIRMED` requires naming the attack that failed. Rule every claim CONFIRMED, BROKEN, UNRESOLVED,
or NOT-EVIDENCED with `file:line`.

## Numbered falsifiable claims

1. **The delta is the brief.** The delta between `bfo-5.diff` and `bfo-6.diff` consists of the six
   edits `b-forms-control-brief-6.md` § Edits prescribes and their rewraps, and nothing else; the
   status is the round-5 set and nothing else.
2. **The guide states what ships.** The seam paragraph concludes once ("so two neighbours paint
   one line … and the group squares each corner a neighbour touches"), and the input-group
   paragraph says the `.form-control`, `.form-select`, and `.form-floating` rules ship and a grouped
   control carries its own `--bs-border-width` border and focus ring under the group's rules; rule
   each sentence against the compiled cascade (`_form-control.scss`, `_form-select.scss`,
   `_form-floating.scss`, and `_input-group.scss`) and against the rest of § Input group classes
   for any remaining sentence that says a control keeps the browser's border or that a rule does
   not ship.
3. **The comments.** No changed comment carries `below`; the preceding-focus reason is stated in
   the range case and the plain-select and input-group cases point to "the range slider case"; the
   layout comment names the group's `width: 1%` staying scoped to the group's children; every
   changed comment follows `writing.md`.
4. **Law and scope.** Across the whole diff: no `any`, `as` (other than `as const`), `!`, or
   suppression; no nested function beyond a callback passed or returned directly; the off-limits
   files untouched. Run `npm run check` and report its exit code as evidence here (the objective
   lane).
