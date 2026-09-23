# Audit lane — `analyst` on GPT-6 Astra, objective lane, CLOSE-MOTION (`cm`)

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-cm`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/cm-audit-claims.md`, which names the evidence; the
unit was written by `opus` on Opus 5.5, and the subjective lane runs blind beside you on another
engine. The unit's brief is `/home/user/scaffold/.orkestrel/veneer/units/close-motion-brief.md`
and its report `/home/user/scaffold/.orkestrel/veneer/units/close-motion-report.md`; the
review evidence is `/home/user/scaffold/.orkestrel/veneer/units/cm.diff` (the whole diff against
`88684bc`) and `cm-status.txt`; the design rulings are R3 and R9 in
`/home/user/scaffold/.orkestrel/veneer/b-passive-close-design-verdict.md`; the terrain is
`/home/user/scaffold/.orkestrel/veneer/units/b-passive-close-terrain-report.md` § 6. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{tests,typescript,names,architecture,writing}.md`.
Perform the audit directly and spawn nothing. Bound: rule within 15 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` that writes nothing is allowed; rerun the greps of claims 3 and 4 yourself over the
worktree; rule the browser claims (5) from the code's assertions and the report's runs, naming for each mutation whether the
assertions distinguish it; a loopback listener, a nested install, and the network are denied. npm
11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and
whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or
none>`.
