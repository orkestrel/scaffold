# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-FORMS-CHECK

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bfc`. You hold the **objective** lane (correctness, constraints, what the code,
the release stylesheet, and the inventory permit) over the claims in
`/home/user/scaffold/tmp/audit/bfc-audit-claims.md`, which names the evidence. The design is
`/home/user/veneer-bfc/tmp/units/b-forms-design-verdict.md`; the family record
`/home/user/veneer-bfc/tmp/units/b-passive-family.md`; the unit's brief `/home/user/veneer-bfc/tmp/units/b-forms-check-brief.md`;
the release stylesheet `node_modules/bootstrap/dist/css/bootstrap.css` and the inventory
`tests/fixtures/oracle/inventory.json`. The subject is the worktree's uncommitted writes over
`2c10329`, staged as `/home/user/scaffold/tmp/audit/bfc.diff` (untracked files as additions) and `bfc-status.txt`, with the
report `/home/user/scaffold/tmp/audit/bfc-report.md`. Perform the audit directly and spawn nothing. Bound: rule within 25
minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` and `npx sass` that write nothing are allowed, so the partial can be compiled and compared
against the release's declarations. Rule a claim about a proof on the mutation named and whether
the assertions distinguish it; name the settling command for anything that needs a browser run.
npm 11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`,
findings outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
