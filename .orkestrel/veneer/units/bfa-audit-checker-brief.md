# Audit lane — `checker` on Sonnet, mechanical conformance, bfa

`checker` on Sonnet (native subagent, clean context, read-only). You rule on every numbered claim in
`/home/user/scaffold/.orkestrel/veneer/units/bfa-audit-claims.md` (all six are mechanical). The
subject tree is `/home/user/veneer-bfa` (uncommitted writes); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bfa.diff`, `bfa-status.txt`, and
`b-forms-assets-report.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{styles,tests,writing,documentation}.md`. Edit nothing, run
nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with
`file:line`, findings outside the claims to the BROKEN standard, and one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
