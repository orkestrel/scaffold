# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-FORMS-CLOSE-FORCED (`bff`)

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bff`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/bff-audit-claims.md`, which names the evidence and
the unknowns; the unit was written by `opus` on Opus 5.5, and the subjective lane runs blind
beside you on another engine. The unit's brief is `/home/user/veneer-bff/tmp/units/bff-brief.md`;
the design verdict is `/home/user/scaffold/.orkestrel/veneer/b-forms-close-design-verdict.md`
(R2, R3, R3a, R3b, R8, R11, R12); the decisions are in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md` (D37, D39a). Law:
`/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,writing,documentation}.md`.
Perform the audit directly and spawn nothing. Bound: rule within 15 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` and `npx --no-install sass --no-source-map` that write nothing (compile to stdout or an
in-memory string) are allowed, and the compile comparison of claim 2 is yours to take that way (the
worktree's `src/styles/index.scss` against an in-memory copy whose `focus-ring` carries the
pre-change inline forced branch, comparing every `.btn*` and `button` block); rule the browser
claims (4, 5) from the code's assertions and the report's readings and mutation table, naming for
each mutation whether the assertions distinguish it; a loopback listener, a nested install, and the
network are denied. npm 11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and
whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or
none>`.
