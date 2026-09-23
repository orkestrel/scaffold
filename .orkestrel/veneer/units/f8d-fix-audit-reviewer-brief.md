# Audit lane — `reviewer` on Opus, subjective lane, f8d-fix

`reviewer` on Opus 5.5 (native subagent, clean context). You hold the **subjective** lane (API
shape, naming, the helpers' placement, guide voice, TSDoc and comment voice) over the numbered
claims in `/home/user/scaffold/.orkestrel/veneer/units/f8d-fix-audit-claims.md`, which names the
evidence and the unknowns; every target this lane rules on is a numbered claim there or a finding
outside the claims to the BROKEN standard. The subject tree is the worktree `/home/user/veneer-f8d`
(uncommitted writes); the review evidence is `/home/user/scaffold/.orkestrel/veneer/units/f8d.diff`
(the whole diff against `cdf7f55`), `f8d-2-status.txt`, the round-1 diff `f8d.diff`, and the reports `f8d-report.md` and
`/home/user/scaffold/.orkestrel/veneer/units/f8d-report-2.md`. Law: `/home/user/scaffold/AGENTS.md`
and `/home/user/scaffold/.claude/rules/{names,tests,typescript,architecture,documentation,writing}.md`.
Read-only; edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict on a proof, the mutation you named and whether the assertion distinguishes
it), findings outside the claims to the BROKEN standard, referrals, and one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
