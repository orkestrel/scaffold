# Audit verdict: unit conform-sea

Subject: the uncommitted unit in `/home/user/fleet/sea` (brief `briefs/conform-sea-brief.md`, audit brief `briefs/conform-sea-audit-brief.md`, fix briefs `briefs/conform-sea-fix1-brief.md` and `briefs/conform-sea-fix2-brief.md`, report `reports/conform-sea-report.md`, evidence `units/conform-sea.diff.txt` and `units/conform-sea.status.txt`), implemented by a direct Opus `implementer` (`units/l3/sea-implement-direct.md`) on the closure staged 18:36 UTC from the Luna-reconciled rulings (`units/l3/sea-reconcile-luna.md`: sea-subj-6 folded into sea-obj-4, sea-obj-6 into sea-obj-2, sea-subj-13 into sea-obj-1; sea-subj-19 Orchestrator-owned; sea-subj-3, sea-subj-4, and sea-subj-9 breaking with no source consumer), audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l3/sea-r1-distill-luna.result.md`) | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l3/sea-r1-checker-luna.result.md`) | PASS |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l3/sea-objective-r1.md`) | FAIL 2, 4 with F1 to F3 |
| 2 | absorption | `grok` on GPT-5.6 Luna (`units/l3/sea-r2-distill-luna.result.md`), after fix round 1 | distillate |
| 2 | checker | `checker` on GPT-5.6 Luna (`units/l3/sea-r2-checker-luna.result.md`) | PASS |
| 2 | objective | `reviewer` on Claude Opus 5 (`units/l3/sea-objective-r2.md`) | FAIL 4 on the record; F1, F2; R1 to R3 |

Subjective lane: not run in the audit rounds, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checkers ran on GPT-5.6 Luna, the tedious-work ladder's second rung.

Fix round 1, a `builder` on Claude Sonnet (`units/l3/sea-fix1-result.md`): the sea-subj-7 destroyed-state case with its red and green captures, the `load()` sentence at `src/server/types.ts:322`, the `e.g.` at `guides/sea.md:185`, the `execute()` refusal named under § Breaking, and the fix round's sweeps.

Fix round 2, a `builder` on Claude Sonnet (`units/l3/sea-fix2-result.md`), report-only: the sea-subj-7 control row rewritten to the scoped command and the counts its captures carry (`2 failed, 17 passed (19)` red, `19 passed (19)` green), the opening status claim and § Shared-file patches amended for the Orchestrator's `package.json` hunks, and the fix-round pointer renamed to § Sweeps (fix round 1). No round-3 lane ran: fix round 2 changed the report alone and no file in the tree, and the round-2 objective lane's claim-4 refutation named the exact replacement text, which the Orchestrator read back at `reports/conform-sea-report.md:78`.

## Rulings

- Round 1, claim 2: the sea-subj-7 rows and the two doc sentences the objective lane refuted are closed by fix round 1; the round-2 lanes confirm claim 2 on the tree.
- Round 2, claim 4: the tree's proof was sound and the record wrong; closed on the record by fix round 2.
- R1 (round 2): the Orchestrator's own hunks — the `"seal"` keyword removed, `engines.node` raised to `>=24.8.0`, and `README.md:106` — are the sea-subj-19 ruling applied 18:56 UTC and the sea-subj-2 keyword the unit could not edit. They are audited by no lane. The `engines` raise is a consumer-facing manifest change: the landing commit message states it with its reason (`getAssetKeys` from `node:sea` exists from that version), and the wave's bump ruling for sea carries it as a release note. No separate carrier: the hunks are the two lines the ruling names and the landing's gate chain proves them.
- R2 (rounds 1 and 2): the surviving skip at `tests/integration.test.ts:203-206` swallows any `INJECT`, including the defect reports `#verifyELFNoteMapping` and `#verifyMachOSection` raise. A behavioural change outside every row: the sea-skip follow-on (`ledgers/followons.md`).
- R3: claim 8's independent gate reading is the Orchestrator's at landing.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/sea`, recorded in `units/land-conform.log` and `units/conform-sea.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1 objective's refutations closed by fix round 1; round 2 checker; round 2 objective's record refutation closed by fix round 2), pending the deciding run at landing.
