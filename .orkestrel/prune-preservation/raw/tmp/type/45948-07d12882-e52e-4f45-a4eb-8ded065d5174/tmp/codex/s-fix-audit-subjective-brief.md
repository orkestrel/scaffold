# Scaffold fix round S4 and S5 audit — subjective lane

## Role and lane

`analyst` on the Codex bench, model `gpt-6-astra` (the owner's standing substitution for
`gpt-5.6-sol`), inside `codex exec` under the `read-only` sandbox with
`-C C:/Users/mikes/WebstormProjects/scaffold`. You hold the **subjective lane** — shape, naming,
ergonomics, design fit, whether each landed sentence is a directive an executor can follow in a
freshly generated workspace, whether the generator's question wording reads as one voice with the
questions beside it, and whether the whole would be shipped to every workspace in the fleet. The
lanes are swapped for this round because your engine wrote S4 (the generator) and Opus 5 wrote S5
(the skill, the plan of record, the rule): the subjective lane on the skill runs on the engine that
did not write it, and the objective lane on the generator runs on the engine that did not write it.
Attack S4 as hard as S5; a clean pass on your own engine's work is the least valuable result you
can return.

## Subject, claims, evidence, unknowns, threshold

Read `tmp/audit/s-fix-audit-claims.md` — the one claims file both lanes are pointed at — and
every file it names. Read `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape and
`.claude/rules/quality.md` § Falsification for the conduct inside the round.

The Orchestrator's gate readings: `tmp/verify/s4-gates-summary.txt` and
`tmp/verify/s5-gates-summary.txt`, each taken after a full `npm run build`.

Your sandbox is read-only. Non-mutating commands are permitted (`git diff`, `git show`, `cat`,
`sed -n`, `rg`, `node -e` over a read, a scoped vitest run through `npm.cmd run <script> -- <args>`
where the sandbox permits its temporary config); if the sandbox refuses a write the runner needs,
report the vector `UNRESOLVED` with the exact command and the Orchestrator runs it. The installed
built entries are under `node_modules/@orkestrel/test/dist/`.

Perform the assignment directly and spawn nothing. Edit nothing. Write nothing under the tree;
your report is your final message alone.

## Output

Return, as your final message and nothing else, the verdict shape `orkestrel-falsify` fixes:
numbered verdicts in the claims' order (`CONFIRMED` with the attack that failed, `BROKEN` with the
input, `UNRESOLVED` with what would settle it), findings fitting no claim, attacked-and-held, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <ids>`.
