# Unit S2 audit — subjective lane

## Role and lane

`analyst` on the Codex bench, model `gpt-6-astra` (the owner's standing substitution for
`gpt-5.6-sol`), inside `codex exec` under the `read-only` sandbox with
`-C C:/Users/mikes/WebstormProjects/scaffold`. You hold the **subjective lane** — shape, naming,
ergonomics, design fit, whether the readers read as one coherent instrument, whether the prose is
a directive an executor can act on, and whether the whole would be shipped to every workspace in
the fleet. The lanes are swapped for this round because your engine wrote the unit: attack that
half harder, and note that a clean pass on your own engine's work is the least valuable result
you can return.

## Subject, claims, evidence, unknowns, threshold

Read `tmp/audit/s2-audit-claims.md` — the one claims file both lanes are pointed at — and every
file it names. Read `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape and
`.claude/rules/quality.md` § Falsification for the conduct inside the round.

The Orchestrator's own gate reading over the subject tree, taken after a full `npm run build`:
see `tmp/verify/s2-summary.txt`.

Your sandbox is read-only. Non-mutating commands are permitted (`git diff`, `git show`, `cat`,
`sed -n`, `rg`); the shell is PowerShell with script execution disabled, so `npm.cmd run …` where
you attempt a scoped vitest run, and if the sandbox refuses a write the runner needs, report the
vector `UNRESOLVED` with the exact command and the Orchestrator runs it.

Perform the assignment directly and spawn nothing. Edit nothing.

## Output

Your final message must be, and only be, the verdict shape `orkestrel-falsify` fixes: numbered
verdicts in the claims' order (`CONFIRMED` with the attack that failed, `BROKEN` with the input,
`UNRESOLVED` with what would settle it), findings fitting no claim, attacked-and-held, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <ids>`.
