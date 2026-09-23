# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-FORMS-RENAME (D40a)

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bfr`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/bfr-audit-claims.md`, which names the evidence and
the unknowns; the unit was written by `builder` on Sonnet, and the subjective lane runs blind
beside you on another engine. The unit's brief is
`/home/user/veneer-bfr/tmp/units/b-forms-rename-brief.md`; the decisions D40 and D40a are in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`; the partials are under
`src/styles/`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{styles,names,writing,tests}.md`. Perform the audit directly
and spawn nothing. Bound: rule within 10 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` and `npx --no-install sass` that write nothing are allowed (compile to stdout or to an
in-memory string, never to the tree); a loopback listener, a nested install, and the network are
denied. npm 11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed), findings outside the claims to the `BROKEN`
standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims:
<names or none>`.
