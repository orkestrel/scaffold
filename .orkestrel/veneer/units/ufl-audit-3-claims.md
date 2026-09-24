# Audit claims — UTIL-FLOW (`ufl`), round 3

Subject: round 3's record — `ufl-3.diff` and `ufl-3-status.txt` (the worktree `/home/user/veneer-ufl`
against `2a3f223`), the revised shared patch `ufl-shared-3.patch` (one unified diff against `2a3f223`
that supersedes `ufl-shared-2.patch` whole), the Route B patch `ufl-routeb-3.patch`, the report
`b-utilities-ufl-report-3.md`, and the round-3 instruments and logs under `ufl-instruments/`
(`ufl-sweep-3.py`, `ufl-sweep-3.txt`, `ufl-sweep-3-after.txt`, `ufl-3-shared-interdiff.txt`, and
`ufl-3-*.log.txt`) — against the successor brief `b-utilities-ufl-brief-3.md`, the round-2 verdict
`ufl-audit-2-verdict.md`, round 2's record (`ufl-2.diff`, `ufl-shared-2.patch`, `ufl-routeb-2.patch`),
and the mid-campaign note `w2-w3-note-1.md`. The unit was written by `opus` on Opus 5.5. Each claim
is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-2
verdict's rulings stand; the brief's sweep reaches every line rounds 1 and 2 added to the owned files
and both patches, so the comment-only fix in `app/browser/constants.ts`, a file the shared patch
already carries, is inside the round's grant; the Orchestrator's apply check settles each
`git apply --check` clause.

1. **Scope and delta.** `ufl-3-status.txt` lists round 1's owned paths and nothing else; against round
   2, `ufl-shared-3.patch` changes only comment and TSDoc lines, in `tests/setupStyles.ts` and
   `app/browser/constants.ts`; `ufl-routeb-3.patch` is byte-identical to `ufl-routeb-2.patch`; the
   owned files change only at comment lines (the escape-case comment in the float, object-fit, and
   overflow style proofs); no code, assertion, or guide sentence changes.
2. **U6 at its sites.** The `computeCornerPoints` helper's `@param` tag reads "such as a live
   `DOMRect` instance a proof reads", its summary reads "in the order the {@link HIT_CORNERS} table
   names the corners", and the `STRETCHED_LINK_HOSTS` summary reads "each corner of the
   {@link HIT_CORNERS} table reaches".
3. **The sweep.** The report lists the sweep's pattern and the paths it read; every line rounds 1 and
   2 added to the owned files and both patches that carries a code token or a `{@link}` tag follows it
   with a noun, or is a series whose shared noun follows the series, or a heading in the guide's
   ledger form; each further fix the report names is present and correct English.
4. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report follows the writing rule and records each gate's
   command with its result line; the lane lists every count the report states, for the record.
