# Audit verdict: unit conform-probe

Subject: the uncommitted unit in `/home/user/fleet/probe` (brief `briefs/conform-probe-brief.md` with its addendum, audit brief `briefs/conform-probe-audit-brief.md`, fix brief `briefs/conform-probe-fix1-brief.md`, report `reports/conform-probe-report.md`, evidence `units/conform-probe.diff.txt` and `units/conform-probe.status.txt`, proofs under `/home/user/work/evidence/probe-proofs/`), implemented by a direct Opus `implementer` (`units/l4/probe-implement-direct.md`) from the Luna-reconciled rulings (`units/l4/probe-reconcile-luna.md`).

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/probe-r1-distill-grok.result.md`) | distillate |
| 1 | checker | `checker` on Cursor Grok 4.6 (`units/l4/probe-r1-checker-grok.result.md`), Luna being dark | PASS |
| 1 | objective | `reviewer` on Claude Opus 5 (`units/l4/probe-objective-r1.md`), Sol being dark (the Sol launch at 23:11 UTC exited on the usage limit) | FAIL 2, 4 with O-1 to O-3 |
| 2 | absorption | `grok` on Cursor Grok 4.6 (`units/l4/probe-r2-distill-grok.result.md`; the first launch died with the 01:20 UTC session restart and the lane was relaunched on the same brief) | distillate |
| 2 | checker | `checker` on Cursor Grok 4.6 (`units/l4/probe-r2-checker-grok.result.md`) | PASS |
| 2 | objective | `reviewer` on Claude Opus 5 (`units/l4/probe-objective-r2.md`) | AUDIT-R2-OBJECTIVE |

Subjective lane: not run in the audit rounds, by the round's design. Every lane of every round ran on a substitute engine: the checker on Grok 4.6 and the objective lane on the Opus `reviewer`, the Cursor account's usage limit having darkened Sol and Luna before probe's first round.

Fix round 1, an Opus `implementer` (`units/l4/probe-fix1-opus-result.md`): a marker that lands after the close (`Probe.#destroy` releasing the emitter in a `finally`), the sweep records for `isProcessLive` and `#destroyed`, the `LintStageInterface` parity row (`inspect` alone; `destroy` inherited), and probe-obj-4's `spawn` clause recorded as a decision.

## Rulings

- Round 1 claims 2, 4 with O-1 to O-3: closed by fix round 1; round 2's checker confirms every claim on the tree. AUDIT-R2-RULING
- Standing red at the baseline: probe's `npm test` reddens on the Oxlint language-server arming failure ruled 2026-08-28, so the landing takes `ALLOW_RED_TEST=probe` and records the red reading as the standing failure; every other gate must exit 0.
- Breaking row (`createRevisionFile` → `buildRevisionPath` on `@orkestrel/probe/server`): no fleet consumer; every other package reaches probe through the `prove` tool, whose `CLAIM_SHAPE` the rename does not touch; the bump ruling carries it for the registry's consumers.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test` under the standing-red ruling, and `npx scaffold audit --offline` in `/home/user/fleet/probe`, recorded in `units/land-probe.log` and `units/conform-probe.audit.txt`, and the landing commit named in the state table.

## Terminal

AUDIT-TERMINAL
