# Audit lane — `reviewer` on Opus 5.5 holding the objective lane (Astra dark on quota), CLOSE-GUIDE (`cg`)

`reviewer` on Opus 5.5 (native subagent, clean context, read-only), substituted for the `analyst`
route because the Codex bench is dark on quota (ROADMAP § Standing conditions); the subject tree is
`/home/user/veneer-cg`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/cg-audit-claims.md`, which names the evidence; the
unit was written by `opus` on Opus 5.5, and the subjective lane runs blind beside you on another
engine. The unit's brief is `/home/user/scaffold/.orkestrel/veneer/units/close-guide-brief.md`
and its report `/home/user/scaffold/.orkestrel/veneer/units/close-guide-report.md`; the
review evidence is `/home/user/scaffold/.orkestrel/veneer/units/cg.diff` (the whole diff against
`88684bc`) and `cg-status.txt`; the design rulings are R1, R4, R5, R6, R7, and R10 in
`/home/user/scaffold/.orkestrel/veneer/b-passive-close-design-verdict.md`; the terrain is
`/home/user/scaffold/.orkestrel/veneer/units/b-passive-close-terrain-report.md` §§ 1, 2, 3, 5, and 7, and the sweep ledger is
`/home/user/scaffold/.orkestrel/veneer/units/close-guide-sweep.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{documentation,writing,tests,typescript,names}.md`.
Perform the audit directly and spawn nothing. Bound: rule within 25 minutes; the guide diff is large, so read it by its headings.

Standing conditions: you have Read, Grep, and Glob only (no shell); rule every grep-shaped claim by
grepping the worktree yourself; rule a claim about a proof from the case's code and the report's
recorded red-then-green runs, naming the mutation and whether the assertions distinguish it. The
unit's first run was stopped by a session interrupt and a successor run completed it from the same
worktree (`close-guide-brief-2.md`); the report is the successor's. Never edit the worktree. Never
read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and
whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or
none>`.
