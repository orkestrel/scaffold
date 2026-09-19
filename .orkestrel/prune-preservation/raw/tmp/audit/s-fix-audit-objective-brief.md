# Scaffold fix round S4 and S5 audit — objective lane

## Role and lane

`reviewer` on Opus 5, a native Claude subagent with `Read`, `Grep`, and `Glob` and no shell. You
hold the **objective lane** — correctness, constraints, what the CLI, the templates, the tests,
and the installed declarations actually permit. The lanes are swapped for this round because Opus 5
wrote S5 (the skill, the plan of record, the rule) and the Codex bench's engine wrote S4 (the
generator): the objective lane on the generator runs on the engine that did not write it, and the
subjective lane on the skill runs on the engine that did not write it. Attack S5 as hard as S4; a
clean pass on your own engine's work is the least valuable result you can return.

## Subject, claims, evidence, unknowns, threshold

Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/s-fix-audit-claims.md` — the one claims
file both lanes are pointed at — and every file it names. Read
`.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape and `.claude/rules/quality.md`
§ Falsification in the scaffold checkout for the conduct inside the round.

The Orchestrator's gate readings: `tmp/verify/s4-gates-summary.txt` (S4's tree after the build)
and `tmp/verify/s5-gates-summary.txt` (S5's tree after the build).

You hold no shell: an attack that needs a run is reported `UNRESOLVED` with the exact command and
fixture, and the Orchestrator runs it. Read `src/bin/CLI.ts`, `src/bin/helpers.ts`,
`src/core/templates.ts`, `src/core/compilers.ts`, and the tests under `tests/src/bin/` and
`tests/src/core/` directly for the S4 claims; read the skill under
`.agents/skills/orkestrel-prove-journey/`, `ROADMAP.md`, `.agents/transports/codex.md`, and
`guides/scaffold.md` for the S5 claims; read the installed built entries under
`node_modules/@orkestrel/test/dist/` where a claim names a shipped sentence.

Perform the assignment directly and spawn nothing. Edit nothing.

## Output

Return, as your final message and nothing else, the verdict shape `orkestrel-falsify` fixes:
numbered verdicts in the claims' order (`CONFIRMED` with the attack that failed, `BROKEN` with the
input, `UNRESOLVED` with what would settle it), findings fitting no claim, attacked-and-held, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <ids>`.
