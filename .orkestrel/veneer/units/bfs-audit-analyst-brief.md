# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-FORMS-SELECT

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bfs`. You hold the **objective** lane (correctness, constraints, what the code,
the release stylesheet, and the inventory permit) over the claims in
`.orkestrel/veneer/units/bfs-audit-claims.md`, which names the evidence and the unknowns. The
design is `/home/user/veneer-bfs/tmp/units/b-forms-design-verdict.md`, the family record
`/home/user/veneer-bfs/tmp/units/b-passive-family.md`, the unit's brief
`/home/user/veneer-bfs/tmp/units/b-forms-select-brief.md`, the release
`node_modules/bootstrap/dist/css/bootstrap.css` and `node_modules/bootstrap/scss/forms/_form-select.scss`,
the inventory `tests/fixtures/oracle/inventory.json`, and the guide `guides/veneer.md`. The subject
is the worktree's uncommitted writes over `2c10329`, staged as `.orkestrel/veneer/units/bfs.diff`
and `bfs-status.txt`, with the report `.orkestrel/veneer/units/bfs-report.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,writing}.md`.
Perform the audit directly and spawn nothing. Bound: rule within 25 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` and `npx sass` that write nothing are allowed, so the partial can be compiled and compared,
and `tests/setupServer.ts`'s readers (`attributeSelector`, the ledger readers) can be run in Node
against the tree; a loopback listener, a nested install, and the network are denied. Rule a claim
about a proof on the mutation named and whether the assertions distinguish it; name the settling
command for anything that needs a browser run. npm 11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed), findings outside the claims to the `BROKEN`
standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims:
<names or none>`.
