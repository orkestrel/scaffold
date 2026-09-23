# Audit lane — `checker` on Sonnet, mechanical conformance, B-PASSIVE-ORDER (`bpo`)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 2, 5, and 6 of
`/home/user/scaffold/.orkestrel/veneer/units/bpo-audit-claims.md` by reading alone: claim 1 (the
diff against `87ff1d0` and the status; the untouched files), claim 2 (the barrel's lines read by
you in `/home/user/veneer-bpo/src/styles/index.scss`), claim 5 (every heading the report's move
list names checked against `/home/user/veneer-bpo/guides/veneer.md`, which is the guide at
`87ff1d0`; name any omission or misplacement), and claim 6 (`writing.md` conformance of the added
case's comment and title; no `any`, `as`, `!`, suppression, mock, or nested function beyond a
callback passed directly; no helper duplicating an installed `@orkestrel/test` export; the report's
criterion lines against the diff). The subject tree is `/home/user/veneer-bpo` (uncommitted writes
over `87ff1d0`); the evidence is `/home/user/scaffold/.orkestrel/veneer/units/bpo.diff`,
`bpo-status.txt`, the brief `b-passive-order-brief.md`, and the report
`b-passive-order-report.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,tests,names,styles}.md`. Edit nothing, run nothing,
spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
2, 5, and 6 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
