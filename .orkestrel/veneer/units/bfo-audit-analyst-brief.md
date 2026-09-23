# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-FORMS-CONTROL round 1

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bfo`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/bfo-audit-claims.md`, which names the evidence and the
unknowns; the subjective lane runs blind beside you. The design is
`/home/user/veneer-bfo/tmp/units/b-forms-design-verdict.md`; the family records
`/home/user/veneer-bfo/tmp/units/b-passive-family.md` and `b-passive-baseline.md`; the unit's brief
`/home/user/veneer-bfo/tmp/units/b-forms-control-brief.md`; the rulings D30, D33, and D34 in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`; the release
`node_modules/bootstrap/dist/css/bootstrap.css` and its source under `node_modules/bootstrap/scss/`;
the guide `guides/veneer.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,writing}.md`.
Perform the audit directly and spawn nothing. Bound: rule within 25 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` and `npx sass` that write nothing are allowed; a loopback listener, a nested install, and
the network are denied. Rule a claim about a proof on the mutation named and whether the assertions
distinguish it; name the settling command for anything that needs a browser run. npm 11 is on `PATH`
through `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed), findings outside the claims to the `BROKEN`
standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims:
<names or none>`.
