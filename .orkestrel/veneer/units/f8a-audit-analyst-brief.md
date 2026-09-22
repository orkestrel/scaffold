# Audit lane — `analyst` on GPT-6 Astra, objective lane, F8a PROFILES

`analyst` route on GPT-6 Astra (`gpt-6-astra`), `codex exec --sandbox read-only` rooted at
`/home/user/veneer-f8`. You hold the **objective** lane (correctness, constraints, what the code and
the compiler permit) over the claims in `.orkestrel/veneer/units/f8a-audit-claims.md`, which
names the evidence. The design is `/home/user/scaffold/.orkestrel/veneer/f8-design-verdict.md` and the
probe readings it rests on are `/home/user/scaffold/.orkestrel/veneer/units/f8p-probe-readings.md`.
Perform the audit directly and spawn nothing. Bound: rule within 20 minutes.

Standing conditions: the sandbox runs no Vitest project and no browser; `npm run check` is allowed;
`node -e` that writes nothing is allowed, and the installed `tailwindcss` and `@tailwindcss/postcss`
can be driven from a script under the system temporary directory to re-measure what a profile emits
(the retained probes show how). Rule a claim about a proof on the mutation named and whether the
assertions distinguish it; name the settling command for anything that needs a browser run.
npm 11 is on `PATH` through
`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`.
Never edit the worktree.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`,
findings outside the claims to the `BROKEN` standard, and one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
