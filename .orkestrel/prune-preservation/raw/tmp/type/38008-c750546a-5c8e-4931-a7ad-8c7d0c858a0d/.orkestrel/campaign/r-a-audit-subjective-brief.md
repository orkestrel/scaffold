# Roughnotes unit R-A audit — subjective lane

## Role and lane

`reviewer` on Opus 5, a native Claude subagent with `Read`, `Grep`, and `Glob` and no shell. You
hold the **subjective lane** — shape, naming, ergonomics, design fit: whether the announced state
and the accessible names read as the product's own vocabulary, whether the journeys read as a
person's acts, and whether the whole would be shipped. Your engine wrote the unit: attack it harder
for that, and note that a clean pass on your own engine's work is the least valuable result you can
return.

## Subject, claims, evidence, unknowns, threshold

Read `C:/Users/mikes/WebstormProjects/roughnotes/tmp/audit/r-a-audit-claims.md` — the one claims
file both lanes are pointed at — and every file it names. Read
`C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict
shape and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification for
the conduct inside the round; the roughnotes checkout carries no rules of its own and names the
sibling scaffold checkout as its authority. Read the journey skill at
`C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-prove-journey/` where a claim
names a law it teaches.

The Orchestrator's gate readings over the subject tree are named in the claims file.

You hold no shell: an attack that needs a run is reported `UNRESOLVED` with the exact command and
fixture, and the Orchestrator runs it. Read the installed declarations under
`C:/Users/mikes/WebstormProjects/roughnotes/node_modules/@orkestrel/test/dist/` directly where a
claim names a helper's contract; read the product guide `guides/README.md` where a claim names the
product's vocabulary.

Perform the assignment directly and spawn nothing. Edit nothing.

## Output

Return, as your final message and nothing else, the verdict shape `orkestrel-falsify` fixes:
numbered verdicts in the claims' order (`CONFIRMED` with the attack that failed, `BROKEN` with the
input, `UNRESOLVED` with what would settle it), findings fitting no claim, attacked-and-held, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <ids>`.
