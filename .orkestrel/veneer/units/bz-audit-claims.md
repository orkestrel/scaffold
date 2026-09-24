# Audit claims — BACKGROUND-SIZE (`bz`), round 1

Subject: `bz.diff` and `bz-status.txt` (the worktree `/home/user/veneer-bz` against `42fd88e`), the report
`b-cross-bz-report.md`, and the logs under `bz-instruments/` — against the brief `b-cross-bz-brief.md`.
The unit was written by `builder` on Sonnet. Each claim is falsifiable; the lane rules CONFIRMED or
BROKEN with `file:line` evidence, and before confirming a claim about a proof names the mutation that
would make the proof fail and whether its assertions distinguish it.

1. **Scope.** The status lists `tests/src/styles/components/accordion.test.ts` and
   `tests/src/styles/components/navbar.test.ts` and nothing else.
2. **The readings.** Each file replaces its one string comparison of `background-size` with the
   `close.test.ts` form: the leading term compared to the expected length and the second term asserted
   `undefined` or `auto`; no other assertion changes; the comment beside each names D45 and reads true.
3. **The red run.** `bz-red.log.txt` shows each changed assertion failing with its expected length
   written wrong, and the assertions distinguish that mutation from the passing case.
4. **The gates.** Each retained log shows the command the report names at exit 0.
5. **Law and report.** No changed line adds an `any`, an `as`, a `!`, a suppression, or a nested
   function; the report states no temporal word and no tally, and follows every code token with its
   noun; list every count the report states, for the record.
