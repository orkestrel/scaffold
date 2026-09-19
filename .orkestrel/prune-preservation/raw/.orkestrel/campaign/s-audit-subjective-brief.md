# Scaffold units S1, S2, S3 audit — subjective lane

## Role and lane

`analyst` on the Codex bench, model `gpt-6-astra` (the owner's standing substitution for
`gpt-5.6-sol`), inside `codex exec` under the `read-only` sandbox with
`-C C:/Users/mikes/WebstormProjects/scaffold`. You hold the **subjective lane** — shape, naming,
ergonomics, design fit, whether the skill reads as one coherent workflow an executor can follow
in a freshly generated workspace, whether every line is a directive, and whether the whole would
be shipped to every workspace in the fleet. The lanes are swapped for this round because your
engine wrote the generator (S1) and none of the skill or the sweep's fix rounds: the subjective
lane on the skill runs on the engine that did not write it, and the objective lane on the generator
runs on the engine that did not write it. Attack the generator's design as hard as the skill's
prose; a clean pass on your own engine's work is the least valuable result you can return.

## Subject, claims, evidence, unknowns, threshold

Read `.orkestrel/campaign/s-audit-claims.md` — the one claims file both lanes are pointed at — and every
file it names. Read `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape and
`.claude/rules/quality.md` § Falsification for the conduct inside the round.

The Orchestrator's own gate reading over the subject tree, taken bare after a full
`npm run build`: `.orkestrel/campaign/s3-gates-summary.txt`, and the re-read of the two projects that
reddened on the re-pin alone in `.orkestrel/campaign/s3b-gates-summary.txt`.

Your sandbox is read-only. Non-mutating commands are permitted (`git diff`, `git show`, `cat`,
`sed -n`, `rg`, `node -e` over a read); the shell is PowerShell with script execution disabled, so
use `npm.cmd run …` where you attempt a scoped vitest run, and if the sandbox refuses a write the
runner needs, report the vector `UNRESOLVED` with the exact command and the Orchestrator runs it.
The test package's own checkout is readable at `C:/Users/mikes/WebstormProjects/test` for
claim 15. The installed built entries are under `node_modules/@orkestrel/test/dist/`.

Perform the assignment directly and spawn nothing. Edit nothing. Write nothing under the tree;
your report is your final message alone.

## Output

Return, as your final message and nothing else, the verdict shape `orkestrel-falsify` fixes:
numbered verdicts in the claims' order (`CONFIRMED` with the attack that failed, `BROKEN` with the
input, `UNRESOLVED` with what would settle it), findings fitting no claim, attacked-and-held, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <ids>`.
