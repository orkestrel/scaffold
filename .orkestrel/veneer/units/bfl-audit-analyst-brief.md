# Audit lane — `analyst` on GPT-6 Astra, objective lane, B-FORMS-LABEL-CASCADE (`bfl`)

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-bfl`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/bfl-audit-claims.md`, which names the evidence; the
unit was written by `opus` on Opus 5.5, and the subjective lane runs blind beside you on another
engine. The unit's brief is `/home/user/scaffold/.orkestrel/veneer/units/b-forms-label-cascade-brief.md`
and its report `/home/user/scaffold/.orkestrel/veneer/units/b-forms-label-cascade-report.md`; the
review evidence is `/home/user/scaffold/.orkestrel/veneer/units/bfl.diff` (the whole diff against
`a56ca7e`) and `bfl-status.txt`; the design verdict is
`/home/user/scaffold/.orkestrel/veneer/b-forms-label-design-verdict.md` (rulings A to L) and the
decisions D20, D30, D35 sit in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`;
the terrain is `/home/user/scaffold/.orkestrel/veneer/units/b-forms-label-terrain-report.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{styles,tests,typescript,names,writing,documentation}.md`.
Perform the audit directly and spawn nothing. Bound: rule within 25 minutes; the diff is large (the guide moves sections), so read the guide hunks by their headings and rule the byte-identity of the moved blocks by comparing against `git show a56ca7e:guides/veneer.md`.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` that writes nothing is allowed (the worktree holds a `dist/` the unit built; the retained
probe `/home/user/scaffold/.orkestrel/veneer/units/bfl-probe-bfl-ladder-probe.test.ts` shows how the
ledger is computed); rule the browser claim (6) from the code's assertions and the report's runs, naming for each mutation whether the
assertions distinguish it; a loopback listener, a nested install, and the network are denied. npm
11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and
whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or
none>`.
