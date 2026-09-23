# Audit lane — `analyst` on GPT-6 Astra, objective lane, F8c-B MOVE

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-f8b`. You hold the **objective** lane (correctness, constraints, what the code,
the release stylesheet, and the inventory permit) over the claims in
`/home/user/scaffold/tmp/audit/f8c-b-audit-claims.md`, which names the evidence. The design is
`/home/user/veneer-f8b/tmp/units/f8c-design-verdict.md`; the round-3 verdict
`/home/user/veneer-f8b/tmp/units/f8c-a-fix-3-audit-verdict.md` (D23, D24, claim 8 carried); the unit's brief `/home/user/veneer-f8b/tmp/units/f8c-b-brief.md`;
the installed compiler `@tailwindcss/postcss` and the guide `guides/veneer.md` § Tailwind. The subject is the worktree's uncommitted writes over
`b9c0b0a`, staged as `/home/user/scaffold/tmp/audit/f8c-b.diff` (untracked files as additions) and `f8c-b-status.txt`, with the
report `/home/user/scaffold/tmp/audit/f8c-b-report.md`. Perform the audit directly and spawn nothing. Bound: rule within 25
minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` and `npx sass` that write nothing are allowed, so a profile can be compiled in Node through `compileProfile` and a sheet read through
`SheetReader`; a loopback listener and a nested install are denied. Rule a claim about a proof on the mutation named and whether
the assertions distinguish it; name the settling command for anything that needs a browser run.
npm 11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`,
findings outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
