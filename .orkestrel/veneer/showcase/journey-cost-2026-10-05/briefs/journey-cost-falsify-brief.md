# Unit journey-cost-falsify — Falsify round over the journey run-cost unit's integrated candidate

## Role and lane

Two lanes on one claims file, clean contexts, blind to each other: `reviewer` (Opus; subjective lane: design fit, instrument shape, record coherence) and `analyst` (GPT-6 Astra through `codex exec` read-only; objective lane: correctness, proofs, readings). Astra (Codex) wrote every lane's code and the tools under `tmp/units/journey-cost/`; Opus reviewed each lane. The analyst audits work its own engine wrote. Each lane performs the assignment itself and spawns nothing; a lane edits no source.

## Subject

The chain: veneer `4d21de7` (the token landing) is the base; the journey run-cost unit's design verdict (`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/verdict.md`) ruled 12 items into lanes 0 to 4 with J-B0 baselines (`runs/jb0-1`, `runs/jb0-2`); lane 0 landed items 11 and 1a; lane 3 landed items 4, 6, 7, 9, 10 and removed item 5 after the checkpoint read a loss; lane 1 landed items 1b and 3; lane 2 landed item 2's matched memo and withheld its classes and faces caches after a quiet price re-run; lane 4 computed and applied the placement; the integrated candidate-3 sits in `/home/user/.wave/journey-cost/M` (`tmp/units/journey-cost/integrated-3/candidate.patch`, 6 files, +1534/−623). No prior falsify round ran on this unit. Each Opus review pass per lane and each appended ruling is in `/home/user/scaffold/tmp/codex/journey-cost-lane-N-brief.md`.

## What the round decides

Whether candidate-3 lands on veneer main as the unit's layer 1, whether R is frozen from the two acceptance runs that follow, and which readings the record carries.

## Already established (the Orchestrator verified each item itself)

- Candidate-3's gates on worktree M each exit 0 (`integrated-3/gates.txt`: format, lint, check, guides 19, setup 156, src:tailwindcss 10, integration 58, setup:browser 169, app:browser 239) and the four mutation targets read red then green (`runs/candidate3-mutations/*.runner.json`).
- The quiet price re-run of lane 2's classes and faces caches read no gain (`price-evaluation-lane2-quiet.md`), and lane 2's third pass removed them with gates exit 0 (`runs/lane2-third-*`).
- Items 6, 7, and 10 have price readings (`price-evaluation-lane3-pik.md`), each with non-overlapping ranges.
- Lane 4's four destination readings exit 0 at or under the checkpoint host readings (`runs/lane4-p4-*`).
- Lane 0's mutation runs ran in worktree 0; the J-B0 self-comparison read the `## Resolved values` rows equal; `host-bound.md` snapshots lanes.md § Host-bound set at `43ca8a0` (`falsify/rulings-2026-10-05.md`).
- The P5 journey trial's readings are in claim 22 of the claims file, filled by the Orchestrator from `runs/candidate3-journey-1` and `integrated-3/compare-journey-1.md`.

## Review evidence

`tmp/units/journey-cost/integrated-3/candidate.patch` (the whole candidate over `4d21de7`), `integrated-3/integration.txt` (the patch sequence and `git status`), `integrated-3/gates.txt`, the lane patches (`lane-0/changes.patch`, `lane-3/changes.patch`, `lane-2/lane2-only.patch`, `lane-1/changes.patch`, `lane-4/placement-only.patch`), the lane reports, the run folders under `tmp/units/journey-cost/runs/` (each with `start.json`, `end.json`, `manifest.json`, `stdout.log`, and for a journey `report.json`, `journey/`, `measure.jsonl`), and the two compare outputs (`integrated-3/compare-journey-1.md`, `integrated-2/compare-journey-{1,2}.md`). The worktree M is the candidate tree; read it, never write it.

## Claims

`/home/user/veneer/tmp/units/journey-cost-claims.md`, 24 claims. Primary lanes: the analyst leads claims 1 to 6 (tools), 9 to 22 (items and readings); the reviewer leads 7, 8, 23, 24 (rules and records) and attacks the instruments' shape in 1 to 6. No lane skips a claim.

Attack first: the instruments' rules (name a change `compare.ts` or `mutations.ts` would not catch; name a tautology), the proofs behind each landed item (name the mutation that makes each proof fail and whether its assertions distinguish it), the per-lane price rules (claim 7: is any landed gain within its own repeat noise), the removal of item 5 (is anything of item 5 still in the candidate; is the scrollspy region byte-equal to `4d21de7`), the placement (does any moved half read a width-dependent value from the wrong variant; is any host-bound title moved), and the records (does any ruling in `falsify/rulings-2026-10-05.md` contradict a landed proof or a reading).

## Unknowns

- Whether an item 4 index control reads red when planted (claim 13); the analyst plants it through `mutations.ts` and reports both exits.
- Whether the candidate's `test:journey` wall time is a reduction against J-B0; no lane claims a figure; the acceptance runs read it.

## The threshold

A finding is worth more than a clean pass: the alternative is the unit landing a proof that cannot fail or a reading that the acceptance runs cannot reproduce. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide is `UNRESOLVED`, not `CONFIRMED`; say what would settle it. Do not hedge toward an imagined consensus. Assume this chain has one more round.

## Output

Exactly the verdict shape of `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape: numbered verdicts in claim order (`CONFIRMED` with the attack, `BROKEN` with the failing input and the smallest correct fix, `UNRESOLVED` with what would settle it), findings outside the claims to the `BROKEN` standard with `ADVISORY` cost findings after them, attacked and held, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`. Every citation as `file:line`. The reviewer returns it as its final message; the analyst writes it through `--output-last-message` to `/home/user/scaffold/tmp/codex/journey-cost-falsify-analyst-last.md`. No process diary.
