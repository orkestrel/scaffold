# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-PASSIVE-B

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bb`. You hold the **objective** lane (correctness, constraints, what the code,
the release stylesheet, and the inventory permit) over the claims in
`/home/user/scaffold/tmp/audit/bb-audit-claims.md`, which names the evidence. The design is
`/home/user/veneer-bb/tmp/units/b-passive-design-verdict.md`; the family record
`/home/user/veneer-bb/tmp/units/b-passive-family.md`. Perform the audit directly and spawn nothing.
Bound: rule within 25 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` and `npx sass` that write nothing are allowed, so a partial can be compiled and compared
against the release's declarations. Rule a claim about a proof on the mutation named and whether
the assertions distinguish it; name the settling command for anything that needs a browser run.
npm 11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`,
findings outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
