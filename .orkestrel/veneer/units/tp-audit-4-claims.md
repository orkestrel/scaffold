# Audit claims — TIP (`tp`), round 4

Subject: round 4's record — `tp-4.diff` and `tp-4-status.txt` (the worktree `/home/user/veneer-tp`
against `2a3f223`), the revised shared patch `tp-shared-4.patch` (one unified diff against `2a3f223`
that supersedes `tp-shared-3.patch` whole), the report `b-modal-tp-report-4.md`, and the round-4
instruments and logs under `tp-instruments/` (`tp-4-shared-interdiff.txt`, `tp-4-owned-interdiff.txt`,
`tp-sweep-4-shared.txt`, `tp-sweep-4-owned.txt`, `tp-shared-4.py`, `tp-owned-4.py`, `tp-reflow-4.py`,
`tp-patch-4.py`, `tp-check-4.sh`, `tp-check-4.log.txt`, `tp-gates-4.sh`, `tp-gates-4.log.txt`,
`tp-gates-4-symlink.log.txt`) — against the successor brief `b-modal-tp-brief-4.md`, the rounds 2 and 3
verdict `tp-audit-2-verdict.md`, round 3's record (`tp-shared-3.patch`, `tp-3.diff`), and the release
source at `/home/user/veneer-tp/node_modules/bootstrap/js/src/`. The unit was written by `opus` on
Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the rounds 2
and 3 verdict's rulings stand; the Orchestrator's apply check (`tp-shared-4.patch` on a fresh `2a3f223`
extract, exit 0) settles the apply clause; the sweep's comment fixes in owned test files are inside the
brief's sweep grant, because the owned files are granted and a false comment there is a defect the
sweep exists to find.

1. **Scope and delta.** `tp-4-status.txt` lists round 1's owned paths and nothing else; against round
   3, `tp-shared-4.patch` changes only the P7 summary in `app/browser/constants.ts`, the P8 paragraph in
   `guides/veneer.md`, the P9 remarks and the `TIP_PLACEMENTS` remarks in `tests/setupStyles.ts`, their
   re-flow, and the hunk lengths those edits change; the owned files change only at the comments the
   report names (`tp-4-owned-interdiff.txt`); no code, assertion, or specimen markup changes.
2. **P7, P8, and P9.** The `POPOVER_SPECIMENS` summary names the placement popovers and the untitled
   bottom popover with no cardinality claim; the § Popover classes sentence says the plugin sets the
   `show` class, and the `fade` class when the popover is animated, as the Popover `plugin` row and
   `tooltip.js` bear out; the `TIP_ARROW_PROPERTIES` remarks say "each of these properties".
3. **The sweep.** The report lists what the sweep read; each sentence it fixed was false against the
   assertion or source it names, and each replacement is true of it (the arrow edge facing the tip in
   the `TIP_PLACEMENTS` remarks and the `tooltip.test.ts` and `popover.test.ts` comments, the placement
   specimens in the `PopoverSection.test.ts` comment); each claim the report says held, holds.
4. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report writes each gate's command exactly as it ran with its
   result line, follows the writing rule, and states no tally; the lane lists every count the report
   states, for the record.
