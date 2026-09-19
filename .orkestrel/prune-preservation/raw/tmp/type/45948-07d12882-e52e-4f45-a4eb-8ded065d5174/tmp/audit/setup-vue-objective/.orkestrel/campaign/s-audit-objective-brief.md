# Scaffold units S1, S2, S3 audit — objective lane

## Role and lane

`reviewer` on Opus 5, a native Claude subagent with `Read`, `Grep`, and `Glob` and no shell. You
hold the **objective lane** — correctness, constraints, what the code, the templates, and the
installed declarations actually permit. The lanes are swapped for this round because Opus 5 wrote
the skill (S3), the sweep's fix rounds (S2-4, S2-5), and none of the generator (S1, written on the
Codex bench): the objective lane on the generator runs on the engine that did not write it, and
the subjective lane on the skill runs on the engine that did not write it. Attack the skill and
the fix rounds as hard as the generator; a clean pass on your own engine's work is the least
valuable result you can return.

## Subject, claims, evidence, unknowns, threshold

Read `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/campaign/s-audit-claims.md` — the one claims file
both lanes are pointed at — and every file it names. Read
`.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape and `.claude/rules/quality.md`
§ Falsification in the scaffold checkout for the conduct inside the round.

The Orchestrator's own gate reading over the subject tree, taken bare after a full
`npm run build`: `.orkestrel/campaign/s3-gates-summary.txt`, and the re-read of the two projects that
reddened on the re-pin alone in `.orkestrel/campaign/s3b-gates-summary.txt`.

You hold no shell: an attack that needs a run is reported `UNRESOLVED` with the exact command and
fixture, and the Orchestrator runs it. Read the installed declarations and the built entries under
`C:/Users/mikes/WebstormProjects/scaffold/node_modules/@orkestrel/test/dist/**` directly for
claims 11, 12, 14, and 21; read the emitting templates in `src/core/templates.ts` and
`src/core/compilers.ts` for claims 1–7; read the test package's own suite under
`C:/Users/mikes/WebstormProjects/test/tests/src/browser/` for claim 15.

Perform the assignment directly and spawn nothing. Edit nothing.

## Output

Return, as your final message and nothing else, the verdict shape `orkestrel-falsify` fixes:
numbered verdicts in the claims' order (`CONFIRMED` with the attack that failed, `BROKEN` with the
input, `UNRESOLVED` with what would settle it), findings fitting no claim, attacked-and-held, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <ids>`.
