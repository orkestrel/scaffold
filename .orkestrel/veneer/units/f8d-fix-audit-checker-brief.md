# Audit lane — `checker` on Sonnet, mechanical conformance, f8d-fix

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 5 and 7 of
`/home/user/scaffold/.orkestrel/veneer/units/f8d-fix-audit-claims.md` by reading alone (claim 7's
`npm run check` instruction addresses the objective lane; rule its remaining parts). The subject
tree is `/home/user/veneer-f8d` (uncommitted writes); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/f8d.diff`, `f8d-status.txt`, and `f8d-report.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,documentation,typescript,tests}.md`.
Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 5
and 7 with `file:line`, findings outside those claims to the BROKEN standard, and one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
