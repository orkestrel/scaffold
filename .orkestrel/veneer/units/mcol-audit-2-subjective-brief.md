# E-ID-MOTION-COLLAPSE audit round 2 — subjective lane on Opus 5.5 (Astra dark)

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: whether each proof is named for what it proves, design fit with Elements' motion, the tenets, and the motion design verdict, naming, and the truth and voice of the guide prose and the comments. The objective lane runs blind beside you on another Opus 5.5 subagent. The Astra bench is
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
`node_modules/bootstrap/dist/css/bootstrap.css`. Weigh especially claims 1, 3, and 4: whether the reader's signature and doc block read as one contract, whether the chevron case is named for what it proves, and whether the guide and the comments state each direction plainly. Round 1's subjective verdict is `mcol-audit-subjective-verdict.md`; rule whether its findings are closed.

Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run
nothing, so rule a proof claim from the test's assertions, the partials, the built cascade, and the retained logs, and say
which log you read; use absolute paths. Your final message is the Output.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or
NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the
assertions distinguish it; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or
`VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
