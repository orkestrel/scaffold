# Audit lane — `analyst` on GPT-6 Astra, objective lane, CLOSE-GUIDE (`cg`)

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
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

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` that writes nothing is allowed; rerun the sweep pattern and the barrel grep yourself over
the worktree's guide for claims 4 and 7; rule the browser claim (3) from the code's assertions and
the report's runs, naming for each mutation whether the
assertions distinguish it; a loopback listener, a nested install, and the network are denied. npm
11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and
whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or
none>`.
