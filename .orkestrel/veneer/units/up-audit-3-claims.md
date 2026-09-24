# Audit claims — UTIL-PAINT (`up`), round 3

Subject: round 3's record — `up-3.diff` and `up-3-status.txt` (the worktree `/home/user/veneer-up` against
`2a3f223`), `up-shared-3.patch` (superseding `up-shared-2.patch` whole) and `up-unscoped-profiles-3.patch`
(superseding the round-2 profiles patch), the report `b-utilities-up-report-3.md`, and the round-3
instruments and logs under `up-instruments/` (`up-3-sweep.py`, `up-3-sweep.log.txt`,
`up-3-gates.log.txt`, `up-3-apply-check.log.txt`, `up-3-interdiff.txt`) — against the successor brief
`b-utilities-up-brief-3.md`, the round-2 verdict `up-audit-2-verdict.md`, and round 2's record
(`up-2.diff`, `up-shared-2.patch`, `up-unscoped-profiles-2.patch`). The unit was written by `opus` on
Opus 5.5. Each claim is falsifiable; a lane rules CONFIRMED or BROKEN with `file:line` evidence.

Orchestrator rulings the lanes take as given, and rule wrong where the evidence says so: the round-2
verdict's rulings stand; the Orchestrator's apply checks (`up-shared-3.patch` on a fresh `2a3f223`
extract, exit 0, then `up-unscoped-profiles-3.patch` after it, exit 0) settle the apply clauses; the
brief's criterion 2 named a worktree run of the style proof, which cannot pass without the shared
patch's tables, so the validation-copy run is the reading that criterion takes; the shared and profiles
patches change because the sweep found a tally in each, which the brief's sweep grant covers.

1. **Scope and delta.** `up-3-status.txt` lists round 2's owned paths and nothing else; against round 2,
   the owned files change only at comment lines, and each patch only at the comment or TSDoc line the
   report names; no code, assertion, or specimen markup changes.
2. **P-f.** The `_border.scss` comment names the `rounded`, `rounded-top`, `rounded-end`,
   `rounded-bottom`, and `rounded-start` entries and states no tally.
3. **The sweep.** The report lists the sweep's pattern and paths; each fix it names is present and
   correct English; each hit it keeps is a distributive "one … per", a value, "one" as "equal" or "a
   lone member", a "both" whose sentence names the members, or a line present at `2a3f223`.
4. **Law and report.** No changed line adds an `any`, an `as` beyond a const assertion, a `!`, a
   suppression, or a nested function; the report states no temporal word and no tally, and writes each
   gate's command with its result line; the lane lists every count the report states, for the record.
