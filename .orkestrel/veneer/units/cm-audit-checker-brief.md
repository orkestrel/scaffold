# Audit lane — `checker` on Sonnet, mechanical conformance, CLOSE-MOTION (`cm`)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 3, 4, and 6 of
`/home/user/scaffold/.orkestrel/veneer/units/cm-audit-claims.md` by reading alone: claim 1 (the
diff against `88684bc` and the status; the off-limits files unchanged), claims 3 and 4 (the greps
rerun by you over `/home/user/veneer-cm`; every retained occurrence's classification in the report
against the file it sits in), and claim 6 (`writing.md` conformance of every changed comment and
doc block; no `any`, `as`, `!`, suppression, mock, or nested function beyond a callback passed
directly; no helper duplicating an installed `@orkestrel/test` export; the report's criterion
lines and greps against the diff). The subject tree is `/home/user/veneer-cm` (uncommitted writes over `a56ca7e`); the
evidence is `/home/user/scaffold/.orkestrel/veneer/units/bpb.diff`, `bpb-status.txt`, the brief
`b-passive-close-b-brief.md`, and the report `b-passive-close-b-report.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,tests,names}.md`.
Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
3, 4, and 6 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
