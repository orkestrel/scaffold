# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-PASSIVE-CLOSE-B (`bpb`)

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bpb`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/bpb-audit-claims.md`, which names the evidence; the
unit was written by `opus` on Opus 5.5, and the subjective lane runs blind beside you on another
engine. The unit's brief is `/home/user/scaffold/.orkestrel/veneer/units/b-passive-close-b-brief.md`
and its report `/home/user/scaffold/.orkestrel/veneer/units/b-passive-close-b-report.md`; the
review evidence is `/home/user/scaffold/.orkestrel/veneer/units/bpb.diff` (the whole diff against
`a56ca7e`) and `bpb-status.txt`; the design ruling is R10 in
`/home/user/scaffold/.orkestrel/veneer/b-forms-close-design-verdict.md` and D37 in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`; the precedent is the
`.form-select:focus` rule and its proof at `a56ca7e`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,writing,documentation}.md`.
Perform the audit directly and spawn nothing. Bound: rule within 12 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`npx sass src/styles/index.scss` to stdout is allowed for claim 2's compile comparison (compare
against `git show a56ca7e:src/styles/index.scss` compiled the same way, or against the worktree's
`dist/src/styles/index.css`, whichever the sandbox permits, and say which); rule the browser claim
(3) from the code's assertions and the report's runs, naming for each mutation whether the
assertions distinguish it; a loopback listener, a nested install, and the network are denied. npm
11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and
whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or
none>`.
