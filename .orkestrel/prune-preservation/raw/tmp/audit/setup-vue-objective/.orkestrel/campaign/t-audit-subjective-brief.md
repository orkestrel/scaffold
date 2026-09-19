# Units T1 and T2 audit — subjective lane

## Role and lane

`reviewer` on Opus 5, a native Claude subagent with `Read`, `Grep`, and `Glob` and no shell. You
hold the **subjective lane** — API feel, vocabulary, architecture shape, guide voice, conceptual
coherence, and whether this surface is one a journey author would want to write against. Your
engine wrote both units: attack that half harder, and note that a clean pass on your own engine's
work is the least valuable result you can return.

## Subject, claims, evidence, unknowns, threshold

Read `C:/Users/mikes/WebstormProjects/scaffold/tmp/audit/t-audit-claims.md` — the one claims file
both lanes are pointed at — and every file it names. Read
`C:/Users/mikes/WebstormProjects/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape
and `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/quality.md` § Falsification for the
conduct inside the round.

The Orchestrator's own gate readings: `.orkestrel/campaign/t1-gates-summary.txt` (T1's tree at
`8f74726`) and `.orkestrel/campaign/t2-gates-summary.txt` (T2's tree at the checkpoint the dispatch
message names), both taken bare after `npm run build`.

You hold no shell: an attack that needs a run is reported `UNRESOLVED` with the exact fixture and
command, and the Orchestrator runs it in the browser project. Read the tree at
`C:/Users/mikes/WebstormProjects/test` directly, including `guides/test.md`, the built
`dist/src/browser/index.js` and `index.d.ts`, and the test files.

Perform the assignment directly and spawn nothing. Edit nothing.

## Output

Return, as your final message and nothing else, the verdict shape `orkestrel-falsify` fixes:
numbered verdicts in the claims' order (`CONFIRMED` with the attack that failed, `BROKEN` with the
input, `UNRESOLVED` with what would settle it), findings fitting no claim, attacked-and-held, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>; outside the claims: <ids>`.
