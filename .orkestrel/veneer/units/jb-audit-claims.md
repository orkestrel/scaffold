# Audit claims — JOURNEY-BUDGET (`jb`), round 1

Subject: `jb.diff` and `jb-status.txt` (the worktree `/home/user/veneer-jb` against `a9dff19`), the
whitespace-insensitive diff `jb-instruments/jb-whitespace-insensitive.diff.txt`, the report
`b-cross-jb-report.md`, and the gate logs under `jb-instruments/` — against the brief
`b-cross-jb-brief.md`. The unit was written by `builder` on Sonnet. Each claim is falsifiable; the lane
rules CONFIRMED or BROKEN with `file:line` evidence.

1. **Scope.** The status lists `tests/setup.ts`, `tests/setup.test.ts`, and
   `tests/app/browser/integration.test.ts` and nothing else.
2. **The timeout.** The resting-key case passes `CASCADE_KEYS.length * CASCADE_KEY_TIMEOUT` as its
   Vitest timeout argument; no other case gains a timeout; with whitespace ignored, the case body is
   unchanged and the file changes only at the import and the call's wrap.
3. **The constant.** `CASCADE_KEY_TIMEOUT` is exported from `tests/setup.ts` beside the `CASCADE_KEYS`
   table, holds `3000`, follows the naming of `ORACLE_TIMEOUT` and `STAGE_TIMEOUT`, and its TSDoc
   states what it bounds and what it multiplies in plain sentences that follow
   `/home/user/scaffold/.claude/rules/writing.md` and `AGENTS.md` § Writing; the `tests/setup.test.ts`
   export list carries it in the list's sorted order.
4. **The gates.** Each retained log shows the command the report names at exit 0, and the journey log
   shows the resting-key case passing.
5. **Law and report.** No changed line adds an `any`, an `as`, a `!`, a suppression, or a nested
   function; the report states no temporal word and no tally, and follows every code token with its
   noun; list every count the report states, for the record.
