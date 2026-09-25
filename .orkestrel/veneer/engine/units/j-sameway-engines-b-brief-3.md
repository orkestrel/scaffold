# Unit J-SAMEWAY-ENGINES-B, round 3 — prior-value returns through the shared leaf, and a refused reopening completes the hide

Successor of `j-sameway-engines-b-brief-2.md` and `j-sameway-engines-b-brief.md`. Their sections stand except where this brief replaces them. The verdict is `units/j-sameway-engines-b-audit-verdict.md`, which reconciles the objective verdict `units/j-sameway-engines-b-audit-objective-verdict.md` and the checker verdict.

**The base.** Dispatched after J-SAMEWAY-ENGINES-A lands. `unit/engines-b` then carries a merge of Veneer `main` BASE_COMMIT, which holds J-SAMEWAY-ENGINES-A's shared prior-value leaves in `src/browser/helpers.ts`, over your `54a6c2f` and the integration `b8a8805`. Work on that tip, and run no merge.

## The obligations

- **P1: prior-value returns.** Route Dropdown's and Tooltip's returns (Popover inherits Tooltip's) through the shared leaves in `src/browser/helpers.ts`. Each returned target goes back to the value it held before the call's first changing write. A write that changes nothing records nothing. The return runs in reverse order of those first writes. Dropdown's `aria-expanded` and the toggle token follow the rule.
- **P2: `aria-describedby` is a token list.** A taken-over show removes only the id it added. It removes the attribute only when the attribute was absent before the call and the list is then empty, following E25's presence rule. Whitespace normalisation is not returned. Cases:
  - the lane's `aria-describedby=""` witness, where the attribute stays present and empty;
  - a popover's id added during the tooltip's change, which stays.
- **P3: a refused reopening completes the hide.** After a prevented platform close, when the engine's `showPopover()` leaves the overlay closed, because a `beforetoggle` listener cancelled it or for any other reason, the engine completes its hide and dispatches its hide events, and `shown` reads `false`. Read `:popover-open` after the call. Give it a case per engine, red first on BASE_COMMIT's sources.
- **P4: the B4 table.** Redo it with P1 to P3. Name Dropdown's hide `#save()` (E13 and E25) and Tooltip's cleared interaction state (the engine's own state, not a host write) with their reasons.
- **Report-only patches.** Return exact patches, against your tip, for `src/browser/types.ts` and `guides/veneer.md`. Cover every sentence P1 to P3 make false: the platform-close paragraphs in § Dropdown, § Tooltip, and § Popover, and the Tooltip takeover paragraph the lane found false during the closing placement destruction.
- **The instrument.** Add a row per obligation. It counts a kill only on an assertion, and reads a passed case as held only when the whole file run reports success, with no failed case and no unhandled error. Re-run every row.

## Output

Your final message holds:
- the files touched;
- the changed B4 rows;
- each new case's red and green readings, verbatim;
- the mutation table from the log;
- the patches' paths, each checked with `git apply --check`;
- the acceptance output verbatim;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
