# Audit verdict — unit middleware-prose (2026-09-03)

Subject: the uncommitted follow-on in `/home/user/fleet/middleware` on the landed tip `72cdc4d` (brief `briefs/followon/middleware-prose-brief.md`, audit brief `briefs/followon/middleware-prose-audit-brief.md`, report `units/followon/middleware-prose-report.md`, evidence `/home/user/work/evidence/conform-middleware.diff` and `conform-middleware.status`). Writer: `builder` on Claude Sonnet.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/followon/middleware-prose-checker-luna.md`) | FAIL 9 |

The objective and subjective lanes did not run: the unit rewrites the document-reference pointers that predate the conformance unit, so the round's judgment is mechanical and the checker is the lane that rules it. The lane ran on GPT-5.6 Luna, the tedious-work ladder's second rung.

## Rulings

- Claims 1, 3, 5, and 7 held: the four sites read in the rule's form, the sweep finds only numeric-comparison senses, the quoted assertion title exists, and every hunk changes a comment only.
- Claim 9 (counts in the report at its gate and evidence lines): the lines the checker cites quote the runner's tallies (`432 passed | 1 skipped`, the policy, config, setup, and guides tallies) and the evidence files' sizes beside the runs that produced them; `AGENTS.md` § Writing permits a measurement reported with the run that produced it and bans a count over a set anyone can add to. Ruled permitted; the report stands.

## Structural claims

Claims 2, 4, 6, and 8 are not held by the checker. Claim 8's gate reading settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/middleware`, recorded in `units/followon/land-conform.log` and the landing commit named in the state table.

## Terminal

PASS (round 1 checker, its claim-9 refutation ruled a permitted measurement), the deciding run at landing read every gate exit 0 (landed as middleware `16911eb`).
