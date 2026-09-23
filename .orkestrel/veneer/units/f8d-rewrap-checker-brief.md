# Verification lane — `checker` on Sonnet, the F8d header rewrap (an Orchestrator integration edit)

`checker` on Sonnet (native subagent, clean context, read-only). The Orchestrator applied one
integration edit in the F8d worktree before landing: the header comment sentence of
`tests/setupServer.ts` ("… which reads the built cascade through `SheetReader` and returns the rules
its stage expands as `LonghandRule` values. A helper added here runs under every one of them.") was
rewrapped from two lines to three with no word changed, per the reviewer's exact text in
`/home/user/scaffold/.orkestrel/veneer/units/f8d-3-audit-reviewer-verdict.md` claim 5. The edit
landed inside the F8d commit on the session branch of `/home/user/veneer` (`git log -1` there names
it: "Compute a shared name's importance over the longhands Tailwind's rule declares"). The evidence
is `/home/user/scaffold/.orkestrel/veneer/units/f8d-rewrap.log.txt` (the before and after text).

Rule these claims by reading alone, with `file:line`:

1. In `/home/user/veneer/tests/setupServer.ts`, the header comment's lines 9 to 11 read exactly the
   reviewer's three lines, and the word sequence of the sentence equals the two-line sequence
   recorded under "before" in `f8d-rewrap.log.txt`.
2. No line of that header comment (lines 1 to 12) passes 100 columns.
3. Nothing else in `tests/setupServer.ts` differs from the F8d worktree's retained diff
   `/home/user/scaffold/.orkestrel/veneer/units/f8d-3.diff` beyond that rewrap (compare the file's
   header hunk against the diff's header hunk).

Edit nothing, run nothing, spawn nothing. Use absolute paths. Output: per-claim verdicts with
`file:line` and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims:
<names or none>`.
