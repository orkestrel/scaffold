# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-FORMS-CLOSE-SPECIMENS (`bfs`), round 2

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bfs`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/bfs-2-audit-claims.md`, which names the evidence and
the unknowns; the unit was written by `opus` on Opus 5.5 (the fix round of a unit whose writer engine is Opus, so this lane is the auditor that did not write it), and the subjective lane runs blind
beside you on another engine. The unit's brief is `/home/user/veneer-bfs/tmp/units/bfs-brief-2.md` (round 2) and `bfs-brief.md` (round 1);
the design verdict is `/home/user/scaffold/.orkestrel/veneer/b-forms-close-design-verdict.md`
(R1, R11, R12); the decisions are in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` (D6, D31). Law:
`/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{browser,tests,names,writing,documentation,styles}.md`.
Perform the audit directly and spawn nothing. Bound: rule within 15 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` that writes nothing is allowed; the worktree holds a `dist/` the Orchestrator built; a
loopback listener, a nested install, and the network are denied. Rule the gate claim (3) and the design-law claim (4)
from the code's assertions and the report's readings and mutation run, naming for each mutation
whether the assertion distinguishes it. npm 11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and
whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or
none>`.
