# Audit lane — `reviewer` on Opus, subjective lane, B-FORMS-SELECT round 2 (the fix round)

`reviewer` on Opus 5.5 (native subagent, clean context). You hold the **subjective** lane (API
feel, naming, guide voice, TSDoc and comment voice, the shape a consumer and a showcase reader meet)
over the numbered claims in `/home/user/scaffold/.orkestrel/veneer/units/bfs-fix-audit-claims.md`, which names the
evidence and the unknowns; every target this lane rules on is a numbered claim there or a finding
outside the claims to the BROKEN standard. The subject tree is the worktree `/home/user/veneer-bfs`
(uncommitted writes); the review evidence is `/home/user/scaffold/.orkestrel/veneer/units/bfs-2.diff`,
`bfs-2-status.txt`, `bfs-1.diff` (the round-1 diff, for the delta), and the report
`/home/user/scaffold/.orkestrel/veneer/units/bfs-2-report.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{names,tests,styles,browser,application,documentation,writing}.md`.
The analyst lane runs on the same claims file; you are blind to it. Read-only; edit nothing, run
nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict on a proof, the mutation you named and whether the assertion distinguishes
it), findings outside the claims to the BROKEN standard, referrals, and one terminal line
`VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
