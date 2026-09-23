# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-FORMS-CONTROL round 3 (the prose micro-round)

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bfo`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/bfo-3-audit-claims.md`, which names the evidence and
the unknowns; this is a micro-round written by `builder` on Sonnet, audited by engines that did not
write it, with the subjective lane running blind beside you; the fix-round reconciliation is
`/home/user/scaffold/.orkestrel/veneer/units/bfo-fix-audit-verdict.md`. The unit's briefs are
`/home/user/veneer-bfo/tmp/units/b-forms-control-brief.md`, `b-forms-control-brief-2.md`, and
`b-forms-control-brief-3.md`; the design `/home/user/veneer-bfo/tmp/units/b-forms-design-verdict.md`;
the guide `guides/veneer.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{tests,names,documentation,writing}.md`. Perform the audit
directly and spawn nothing. Bound: rule within 15 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` that writes nothing is allowed; a loopback listener, a nested install, and the network
are denied. Name the settling command for anything that needs a browser run. npm 11 is on `PATH`
through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed), findings outside the claims to the `BROKEN`
standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims:
<names or none>`.
