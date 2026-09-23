# Audit lane — `analyst` on GPT-6 Astra, objective lane, F8c-A READERS round 3

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-f8b`. You hold the **objective** lane (correctness, constraints, what the code,
the installed compiler, and the contracts permit) over the claims in
`/home/user/scaffold/tmp/audit/f8c-a-fix-3-audit-claims.md`, which names the evidence. The design is
`/home/user/veneer-f8b/tmp/units/f8c-design-verdict.md` (rulings 1, 2, 3, 5, 7 bind the unit); the
briefs are `/home/user/veneer-f8b/tmp/units/f8c-a-brief-3.md` (the fix round over the round-1 verdicts `f8c-a-audit-analyst-verdict.md` and `f8c-a-audit-reviewer-verdict.md`, under D23); the report is
`/home/user/scaffold/tmp/audit/f8c-a-report-3.md`; the subject tree is the worktree's uncommitted
writes over the checkpoint `5099318`, staged as `/home/user/scaffold/tmp/audit/f8c-a-fix-3.diff` and `f8c-a-fix-3-status.txt`.
The writer was `opus`, so you are the auditor engine that did not write it. Law:
`/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{tests,workspace,typescript,names,architecture,patterns,writing}.md`.
Perform the audit directly and spawn nothing. Bound: rule within 25 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser, and denies a loopback
listener and a nested install; `npm run check` is allowed; `node -e` and `node --input-type=module`
that write nothing are allowed, so `SheetReader` can be driven over a literal sheet and
`compileProfile`'s recipe compiled in Node (`import('./tests/setupServer.ts')` needs a loader; read
the diff instead where the import fails, and name the settling command). Rule a claim about a proof
on the mutation named and whether the assertions distinguish it; name the settling command for
anything that needs a browser run. npm 11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`,
findings outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
