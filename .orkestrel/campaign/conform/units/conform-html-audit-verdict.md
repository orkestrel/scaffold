# Audit verdict: unit conform-html

Subject: the uncommitted unit in `/home/user/fleet/html` (brief `briefs/conform-html-brief.md`, audit brief `briefs/conform-html-audit-brief.md`, fix brief `briefs/conform-html-fix3-brief.md`, report `reports/conform-html-report.md`, evidence `units/conform-html.diff.txt` and `units/conform-html.status.txt`), workflow `wf_f5789004-34f` (L1b) through round 3, then the direct pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench | FAIL (F-1 to F-6) |
| 1 | checker | `checker` on Claude Sonnet | PASS |
| 2 | objective | `reviewer` on Claude Opus 5 | FAIL (F-1: the stale keyed-table count; the number-word sweep over tests) |
| 2 | checker | `checker` on Claude Sonnet | not run: the workflow's node hit the structured-output retry cap; round 3's checker covered the tree |
| 3 | objective | `reviewer` on Claude Opus 5, direct dispatch after the workflow's lane and two re-dispatches died on HTTP 529 | every claim held; F-1 outside the claims (the presence-guard block's claims list); R-1 to R-3 |
| 3 | checker | `checker` on Claude Sonnet | PASS |
| 4 | objective | `reviewer` on Claude Opus 5, reading the Luna distillate (`units/l1b/html-r4-distillate-luna.md`) | PASS (`units/l1b/html-objective-r4.md`) |
| 4 | checker | `checker` on Claude Sonnet (the `fixaudit.html3` workflow's node, before its stop) | PASS |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. From round 4 the reading was absorbed by GPT-5.6 Luna on the Cursor bench (Grok 4.6's quota spent), the tedious-work ladder's second rung, recorded in the session ledger.

Fix rounds: round 1 (Opus `implementer`, the workflow) closed F-1 to F-6; round 2 closed the keyed-table count and the number-word sweep hits over `tests/`; round 3 (`briefs/conform-html-fix3-brief.md`, Opus `implementer`) closed the presence-guard block with a mutation control, ran the breadth pass the round-3 lane recommended over every coverage sentence the unit added, replaced the U+2019 title, and captured `test:distribution`.

## Rulings on the fourth round's referrals

- R-1 (the deciding run must include `npm run test:distribution`, because the `test` chain never reaches the `distribution` project): adopted; the landing runs it before the gate chain and records it in `units/land-conform.log`.
- R-2 (the brief's row 15 evidence records `@orkestrel/test` at 0.0.11 while the closure and manifest are 0.0.12): a stale fact in the refuter's evidence, not in the tree; recorded here so a successor brief does not re-derive from it.
- R-3 (the report's § Shared-file patches referrals need carriers): the `distribution.test.ts` generator template and the `guides.test.ts` drop-in header wording are scaffold's own surface and carry to scaffold's L3 unit; the number-word plus numeral sweep pair is now in the implement template's sweep step; the presence-guard population rule (a guard carries every fence input and documented value a transcription reuses) carries to scaffold's L3 unit as a `tests.md` row. All four are in `ledgers/followons.md`.

## Structural claims

Claim 4's `html-obj-4` red count is writer-reported and unreproducible after the fix, with the fix-round-3 controls captured to files; claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `test:distribution`, then `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/html`, recorded in `units/land-conform.log` and `units/conform-html.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 4, objective and checker), pending the deciding run at landing.
