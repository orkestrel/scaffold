# E-ID-MOTION-OFFCANVAS audit round 2 — subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: whether each proof is named for what it proves, whether the round closes round 1's subjective findings, the truth and voice of the guide prose and the partial comments, naming, and design fit. The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in `/home/user/scaffold/.orkestrel/veneer/units/moff-audit-2-claims.md`, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/veneer-moff/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,typescript,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape); Veneer's `ROADMAP.md` § Tenets in the worktree; the design verdict and E32 the claims file names. Evidence, all read-only: the claims file and every file it names under `/home/user/scaffold/.orkestrel/veneer/units/`. The worktree `/home/user/veneer-moff` holds round 2 committed as `32a6c28` over round 1's `73cd4f0` (over `877e7c6`): read its files, never edit them; the round's diff is `moff-instruments-2/moff-2.diff`. Weigh especially claims 1, 3, and 4: whether the extended responsive case is named for what it proves and reads as one proof rather than a patch over the round-1 case, whether the guide's resolved values sit where a consumer looks for the timing and read once beside the departure bullet, and whether the rewritten comments state what the code does. Round 1's subjective verdict is `moff-audit-subjective-verdict.md`; rule whether its R1 to R3 are closed. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Your final message is the Output.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
