# Audit lane — `checker` on Sonnet, mechanical conformance, F8d IMPORTANCE-LONGHANDS round 3 (the prose and guard micro-round)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 5, and 6 of
`/home/user/scaffold/.orkestrel/veneer/units/f8d-3-audit-claims.md` by reading alone (claim 6's
`npm run check` instruction addresses the objective lane; rule its remaining parts): claim 1 (the
delta between `f8d-2.diff` and `f8d-3.diff` is the edits `f8d-brief-3.md` § Edits prescribes and
nothing else; the status lists the owned set and nothing else; `tmp/probe/` absent), claim 5
(every changed sentence carries the prescribed text and follows `writing.md`: a noun after each
code token, no banned term from the substitution table, no count of a growable set, no line past
100 columns), and claim 6's reading parts. The subject tree is `/home/user/veneer-f8d`
(uncommitted writes); the evidence is `/home/user/scaffold/.orkestrel/veneer/units/f8d-3.diff`
(the whole diff against `cdf7f55`), `f8d-3-status.txt`, the round-2 diff `f8d-2.diff`, the brief
`f8d-brief-3.md`, and the report `f8d-report-3.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,documentation,typescript,tests}.md`. Edit nothing, run
nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
5, and 6 with `file:line`, findings outside those claims to the BROKEN standard, and one terminal
line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
