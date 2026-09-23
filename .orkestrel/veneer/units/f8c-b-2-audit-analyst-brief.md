# Audit lane — `analyst` on GPT-6 Astra, objective lane, F8c-B MOVE round 2 (the fix round)

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-f8b`. You hold the **objective** lane (correctness, constraints, what the code
and the contracts permit) over the claims in `.orkestrel/veneer/units/f8c-b-2-audit-claims.md`,
which names the evidence and the unknowns; this is a fix round audited by one lane on an engine
that did not write it. The design is `/home/user/veneer-f8b/tmp/units/f8c-design-verdict.md`; the
unit's briefs `/home/user/veneer-f8b/tmp/units/f8c-b-brief.md` and `f8c-b-brief-2.md`; the round-1
reconciliation `/home/user/scaffold/.orkestrel/veneer/units/f8c-b-audit-verdict.md`; the guide
`guides/veneer.md` § Tailwind. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{tests,typescript,architecture,names,documentation,writing}.md`.
Perform the audit directly and spawn nothing. Bound: rule within 25 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` and `npx sass` that write nothing are allowed; a loopback listener, a nested install, and
the network are denied. Rule a claim about a proof on the mutation named and whether the assertions
distinguish it; name the settling command for anything that needs a Vitest run. npm 11 is on `PATH`
through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed), findings outside the claims to the `BROKEN`
standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims:
<names or none>`.
