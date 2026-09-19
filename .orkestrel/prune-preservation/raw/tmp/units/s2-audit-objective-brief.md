# Unit S2 audit — objective lane

## Role and lane

`reviewer` on Opus 5, a native Claude subagent with `Read`, `Grep`, and `Glob` and no shell. You
hold the **objective lane** — correctness, constraints, what the code and the installed
declarations actually permit. The lanes are swapped for this round because the Codex bench's
engine wrote the unit: the objective lane runs on the engine that did not write it.

## Subject, claims, evidence, unknowns, threshold

Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/s2-audit-claims.md` — the one claims file
both lanes are pointed at — and every file it names. Read `.agents/skills/orkestrel-falsify/SKILL.md`
§ Verdict shape and `.claude/rules/quality.md` § Falsification in the scaffold checkout for the
conduct inside the round.

The Orchestrator's own gate reading over the subject tree, taken after a full `npm run build`:
see `tmp/verify/s2-summary.txt` (exit codes and totals per gate).

You hold no shell: an attack that needs a run is reported `UNRESOLVED` with the exact command and
fixture, and the Orchestrator runs it. Read the installed declarations under
`C:/Users/mikes/WebstormProjects/scaffold/node_modules/@orkestrel/*/dist/**/*.d.ts` directly to
attack claims 2 and 4.

Perform the assignment directly and spawn nothing. Edit nothing.

## Output

Return, as your final message and nothing else, the verdict shape `orkestrel-falsify` fixes:
numbered verdicts in the claims' order (`CONFIRMED` with the attack that failed, `BROKEN` with the
input, `UNRESOLVED` with what would settle it), findings fitting no claim, attacked-and-held, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <ids>`.
