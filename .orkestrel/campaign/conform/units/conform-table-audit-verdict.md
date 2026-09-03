# Audit verdict: unit conform-table

Subject: the uncommitted unit in `/home/user/fleet/table` (brief `briefs/conform-table-brief.md`, audit brief `briefs/conform-table-audit-brief.md`, fix briefs `briefs/conform-table-fix1-brief.md`, `conform-table-fix1b-brief.md`, `conform-table-fix2-brief.md`, `conform-table-fix3-brief.md`, and `conform-table-fix4-brief.md`, report `reports/conform-table-report.md`, evidence `units/conform-table.diff.txt` and `units/conform-table.status.txt`), workflow `wf_075a2bf5-dad` (L2b) for the reconcile and implement stages, then the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l2b/table-r1-distillate-luna.md`); the lane's launch replaced the staged closure (the vendored SessionStart hook, session ledger), re-staged 16:21 UTC | distillate |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l2b/table-objective-r1.md`) | PASS; F1, F2; R1 (the stopped row's reachability ruled from source), R2 |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l2b/table-r1-checker-luna.md`) | PASS |
| 2 | absorption | `grok` on GPT-5.6 Luna (`units/l2b/table-r2-distillate-luna.md`) | distillate |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l2b/table-r2-checker-luna.md`) | FAIL 1, 9 (the two guide sites the transformation dropped) |
| 2 | objective | `reviewer` on Claude Opus 5, reading the distillate (`units/l2b/table-objective-r2.md`) | FAIL 2, 4, 9; F1, F2; R1, R2 |
| 3 | objective | `reviewer` on Claude Opus 5 (`units/l2b/table-objective-r3.md`) | FAIL 4 on the record; F3, F4 |
| 3 | checker | `checker` on GPT-5.6 Luna (`units/l2b/table-r3-checker-luna.md`) | PASS; two referrals |
| 4 | objective | `reviewer` on Claude Opus 5 (`units/l2b/table-objective-r4.md`) | PASS; F5 |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checkers ran on GPT-5.6 Luna, the tedious-work ladder's second rung, while Grok 4.6's quota was spent (session ledger).

Fix rounds, every one a `builder` on Claude Sonnet: round 1 (first run stopped by the replaced closure, completed from the successor brief; `units/l2b/table-fix1b-result.md`) landed the Orchestrator's transformation of table-subj-2 — the accessor case in `tests/src/core/Table.test.ts` proving the constructor's `SCHEMA` refusal reachable (`table-proofs/table-subj-2a-accessor.txt`), the guide sentence scoped to stable reads, the corrected citations and sweep populations; round 2 (`units/l2b/table-fix2-result.md`) carried the two guide sites the transformation had dropped without a record (the Guards paragraph's third `SCHEMA` message, the `SCHEMA` row scoped to stable reads), struck the uniqueness clause, renamed the tallied test title, and rewrote the report's deviation and diffstat; round 3 (`units/l2b/table-fix3-result.md`) corrected the sweep record, anchored the assertion at `tests/src/core/Table.test.ts:114` so a wrapped message fails it, and corrected the report's citations; round 4 replaced `below` and `above` at `guides/table.md:1172-1173` and `:1218` with the writing rules' forms.

## Rulings on the referrals

- Round 1 R1: table-subj-2 is transformed, not struck; ruled before fix round 1. Round 2 R1: the Guards paragraph and the `SCHEMA` row were dropped, not struck, by the fix-round-1 brief's Owned scope; carried by fix round 2.
- R2 (whether `Table` should read `column.meta` once and pass that value into `cloneSchema`, closing the accessor path the guide documents): a design brief for the next matrix, in `ledgers/followons.md`; the accessor case pins the read sequence and moves with that refactor.
- Round 4 R-A (F5 stands while every claim holds): a fourth fix round of two guide lines, owed `format:check` and `test:guides`; landed before the deciding run. R-B (`below` and `above` in the report's own prose at `reports/conform-table-report.md:58`, `:81`, `:156`): the campaign record is swept for the class at the retention prune.
- Round 3 checker referrals: `guides/table.md:301` "two members" names the `minimum` and `maximum` operands, a fixed pair, and `:1477` "two writers" names a concurrency scenario's arity; both permitted senses under `AGENTS.md` § Writing.

## Structural claims

Claim 4's counts are read from the capture files under `/home/user/work/evidence/table-proofs/`; claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/table`, recorded in `units/land-conform.log` and `units/conform-table.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 4 objective, round 3 checker), accepted on the deciding run at landing after fix round 4's two lines: every gate exit 0 and the audit clean, landed as `08d4526`.
