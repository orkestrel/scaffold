# Audit verdict: unit html-sanitizer

Subject: the uncommitted follow-on in `/home/user/fleet/html` (brief `briefs/followon/html-sanitizer-brief.md`, audit brief `briefs/followon/html-sanitizer-audit-brief.md`, report `units/followon/html-sanitizer-report.md`, result `units/followon/html-sanitizer-sol-result.md`, evidence `/home/user/work/evidence/html-sanitizer.diff` and `.status`, captures under `/home/user/work/evidence/html-sanitizer-proofs/`), the html twin of the markdown-sanitizer follow-on recorded in `ledgers/followons.md`, widened by the Orchestrator to the two sibling prose claims in the same guide section. Written by GPT-5.6 Sol through the Cursor bench (`instruments/sol5.sh`), the first writing unit on that route.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/followon/html-sanitizer-checker-luna.result.md`) | PASS |
| 1 | objective | GPT-5.6 Sol through the Cursor bench, read-only (`units/followon/html-sanitizer-objective-sol.md`) | PASS, R1 |

Subjective lane: not run, by the round's design; the unit's rows are objective (a fence value and its transcription). No distillate ran: the diff is 59 lines and each lane read it whole. The writer's engine (Sol) and the objective auditor's engine (Sol) are the same; the checker on Luna is the engine that did not write it, and the objective lane re-derived the `src` value from `src/core/constants.ts:440-454` and `src/core/HTML.ts:235-243` rather than from the report.

## Rulings

- Claims 1 to 7: confirmed by both lanes on the tree; the fence values are what `sanitize` returns, the transcription executes them in order, the presence guard carries the inputs, the red capture fails on the planted value alone.
- R1: the gate reading settles on the Orchestrator's deciding run at landing.

## Structural claims

Claim 6's gate reading is NOT-EVIDENCED by every read-only lane and settles on the deciding run: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/html`, recorded in `units/followon/land-html-sanitizer.log`, and the landing commit named in the state table.

## Terminal

PASS, pending the deciding run at landing.
