# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-PASSIVE-C rounds 2 and 3

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bc`. You hold the **objective** lane (correctness, constraints, what the code,
the release stylesheet, and the inventory permit) over the claims in
`/home/user/scaffold/tmp/audit/bc-fix-3-audit-claims.md`, which names the evidence. The design is
`/home/user/veneer-bc/tmp/units/b-passive-design-verdict.md`; the family record is
`/home/user/veneer-bc/tmp/units/b-passive-family.md`; the release stylesheet is
`node_modules/bootstrap/dist/css/bootstrap.css` and the inventory `tests/fixtures/oracle/inventory.json`.
This is a fix round: the writer was `opus`, so you are the auditor engine that did not write it; the
round-1 verdicts are staged at `/home/user/veneer-bc/tmp/units/bc-audit-analyst-verdict.md`,
`bc-audit-reviewer-verdict.md`, and `bc-audit-checker-verdict.md`; the fix briefs are
`/home/user/veneer-bc/tmp/units/b-passive-c-brief-2.md` and `b-passive-c-brief-3.md`. Perform the
audit directly and spawn nothing. Bound: rule within 25 minutes.

Standing conditions: the worktree sits on `3a9202a`, before the landings the session branch carries,
so rule on the worktree alone. The sandbox runs no Vitest project and no browser; `npm run check` is
allowed; `node -e` and `npx sass` that write nothing are allowed, so a partial can be compiled to
compare its declarations against the release's. Rule a claim about a proof on the mutation named and
whether the assertions distinguish it; name the settling command for anything that needs a browser
run. npm 11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`,
findings outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
