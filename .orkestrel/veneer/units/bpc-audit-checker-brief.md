# Audit lane — `checker` on Sonnet, mechanical conformance, bpc

`checker` on Sonnet (native subagent, clean context, read-only). You rule on every numbered claim in
`/home/user/scaffold/.orkestrel/veneer/units/bpc-audit-claims.md` (all five are mechanical). The
subject tree is `/home/user/veneer-bpc` (uncommitted writes); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bpc.diff`, `bpc-status.txt`, and
`b-passive-close-a-report.md`; the release for claim 1's order is the removed blocks themselves in
the diff. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{styles,tests,names,writing}.md`. Edit nothing, run nothing,
spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with
`file:line`, findings outside the claims to the BROKEN standard, and one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
