# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-LABEL-CASCADE (`bfl`), round 2

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 4, 6, and 7 of
`/home/user/scaffold/.orkestrel/veneer/units/bfl-2-audit-claims.md` by reading alone: claim 1 (the
delta and the status; the moved sections unchanged apart from the named sites), claim 4 (the guide
sentences against the criterion's meaning; the headline unchanged), claim 6 (each quoted text
verbatim apart from wrapping; then a sweep of every line rounds 1 and 2 added, read from
`bfl-2.diff`, for a bare code token, a count, the word "hint", or a position name), and claim 7's
reading parts (no `any`, `as`, `!`, suppression, mock, or nested function beyond a callback passed
directly; no helper duplicating an installed `@orkestrel/test` export; the report's criterion lines,
the failing-then-green run, the § Tests sentence, no count). The subject tree is `/home/user/veneer-bfl`
(uncommitted writes over `a56ca7e`); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bfl-2-delta.diff`, `bfl-2.diff`, `bfl-2-status.txt`,
the briefs `b-forms-label-cascade-brief.md` and `-brief-2.md`, and the reports
`b-forms-label-cascade-report.md` and `-report-2.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,styles,tests,documentation}.md`.
Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
4, 6, and 7 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
