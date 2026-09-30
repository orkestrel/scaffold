# E-ID-MOTION-COLLAPSE audit round 2 — objective lane on Opus 5.5 (Astra dark)

## Role and engine

`reviewer` on Opus 5.5, holding the **objective** lane: correctness, constraints, and what the code, the tests, the built cascade, and the logs actually permit. The subjective lane runs blind beside you on another Opus 5.5 subagent. The Astra bench is
dark until 2026-09-30 (`moff-audit-2-analyst-dark.log.txt`), so under `.agents/orchestration.md` § Engine assignment
Opus 5.5 runs every lane of this round in separate clean contexts. The writer was also Opus 5.5; the verdict file records
that no lane ran on an engine that did not write the work.

## Objective

Per-claim verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/mcol-audit-2-claims.md`, with the mutation named
before any claim about a proof is confirmed.

## Context

Law: `/home/user/veneer-mcol/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`;
the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape); Veneer's
`ROADMAP.md` § Tenets in the worktree; the design verdict and E32 the claims file names. Evidence, all read-only: the
claims file and every file it names under `/home/user/scaffold/.orkestrel/veneer/units/`. The worktree
`/home/user/veneer-mcol` holds the change committed as `6c6a0ce` over `9e1fe4e`: read its files, never edit them. The built
cascade is `dist/src/styles/index.css` in the worktree, and the release's is
`node_modules/bootstrap/dist/css/bootstrap.css`. Attack claim 1 with a transition on a descendant's pseudo-element, a transition on the element's own property, and a transition carrying no effect, against the find predicate; attack claim 2 with a frozen or stepped turn, a turn in one direction only, and the transition written outside the mixin; attack claim 5 by reading every caller of `sampleTransition` in the worktree.

Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run
nothing, so rule a proof claim from the test's assertions, the partials, the built cascade, and the retained logs, and say
which log you read; use absolute paths. Your final message is the Output.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the
assertions distinguish it; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
