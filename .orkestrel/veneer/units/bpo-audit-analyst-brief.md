# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-PASSIVE-ORDER (`bpo`)

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bpo`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/bpo-audit-claims.md`, which names the evidence; the
unit was written by `builder` on Sonnet, and a `checker` lane rules the mechanical claims blind
beside you. The unit's brief is `/home/user/scaffold/.orkestrel/veneer/units/b-passive-order-brief.md`
and its report `/home/user/scaffold/.orkestrel/veneer/units/b-passive-order-report.md`; the review
evidence is `/home/user/scaffold/.orkestrel/veneer/units/bpo.diff` (the whole diff against
`87ff1d0`) and `bpo-status.txt`; the rulings are family ruling 8 in
`/home/user/scaffold/.orkestrel/veneer/units/b-passive-family.md` and R6 in
`/home/user/scaffold/.orkestrel/veneer/b-passive-close-design-verdict.md`. Law:
`/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,writing}.md`. Perform the audit
directly and spawn nothing. Bound: rule within 12 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
rerun the grep of claim 2 yourself over the worktree; rule claim 3 from the case's code and the
report's control run; rule claim 4 by reading the moved partials for a selector two of them write
for one element (grep the class names each partial declares against its neighbours) and the proofs
that read it; a loopback listener, a nested install, and the network are denied. npm 11 is on
`PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and
whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or
none>`.
