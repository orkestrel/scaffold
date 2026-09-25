# Unit J-SAMEWAY-ENGINES-B, round 4 — record the id a show links, and destroy a placement a later show replaces

Successor of `j-sameway-engines-b-brief-3.md`. Its sections, and the earlier rounds', stand except where this brief replaces them.
- Round 3 is committed as `e73c3af`, with the integration `87dc147`.
- The worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b` is clean there.

## Why

Round 3's audit ruled `VERDICT: FAIL 2, 7` (`units/j-sameway-engines-b-audit-3-verdict.md`). Read it, and the objective verdict it names. It carries the lane's witnesses and its exit table.

## The obligations

- **Q1: the linked id (claim 2).**
  - Tooltip's show records the id it links and whether `aria-describedby` held that id before the call, beside the attribute's prior presence.
  - The return removes that recorded id only when the call added it, and removes an emptied attribute only when the attribute was absent before the call.
  - The return reads no `tip.id` again.

  Add a red-first case for each of the lane's witnesses:
  - a pre-existing `vn-tooltip-0` token the call never added stays;
  - a tip whose `id` changes while the show awaits has the id the call linked removed.

  Popover inherits the fix.
- **Q2: the replaced placement (outside the claims).** A Dropdown show that finds a placement it did not create destroys that placement before it places the menu. That leaves one placement live, whose holdings the next hide writes back. The red-first case is the existing supersession fixture followed by `await dropdown.hide()`: after the hide, the menu's `popover`, positioning, and anchor targets read their values from before the first show.
- **Q3: the prose (claim 7).** Return exact patches, against your tip, for every sentence Q1 and Q2 make false in `src/browser/types.ts` and `guides/veneer.md`, and check each with `git apply --check`.
- Re-run your round-3 instrument, with a row per fix:
  - the return reads `tip.id` again;
  - the return removes the id whatever its prior membership;
  - the show keeps a replaced placement.

## Scope

As round 3.

## Output

Your final message holds:
- the files touched;
- each new case with its red reading on `87dc147`'s sources;
- the mutation table;
- the patches' paths and their `git apply --check` output;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
