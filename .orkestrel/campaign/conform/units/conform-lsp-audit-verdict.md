# Audit verdict: unit conform-lsp

Subject: the uncommitted unit in `/home/user/fleet/lsp` (brief `briefs/conform-lsp-brief.md`, audit brief `briefs/conform-lsp-audit-brief.md`, fix briefs `briefs/conform-lsp-fix1-brief.md` and `briefs/conform-lsp-fix2-brief.md`, report `reports/conform-lsp-report.md`, evidence `units/conform-lsp.diff.txt` and `units/conform-lsp.status.txt`), implemented by a direct Opus `implementer` (`units/l3/lsp-implement-direct.md`) on the closure staged 18:37 UTC, from the Luna-reconciled rulings (`units/l3/lsp-reconcile-luna.md`: no fold, no Orchestrator row, no breaking row), audited through the Grok-first pipeline.

## Lanes

| Round | Lane | Role, engine | Terminal |
| --- | --- | --- | --- |
| 1 | absorption | `grok` on GPT-5.6 Luna (`units/l3/lsp-r1-distill-luna.result.md`), after fix round 1 | distillate |
| 1 | checker | `checker` on GPT-5.6 Luna (`units/l3/lsp-r1-checker-luna.result.md`) | PASS |
| 1 | objective | `reviewer` on Claude Opus 5, the recorded substitution for the dark Sol bench, reading the distillate (`units/l3/lsp-objective-r1.md`) | PASS; F-1 to F-3, R-1, R-2 |

Subjective lane: not run in the audit round, by the round's design. The Sol bench is dark this session; Opus holds the objective lane as the recorded substitution. Absorption and the checker ran on GPT-5.6 Luna, the tedious-work ladder's second rung.

Fix round 1, a `builder` on Claude Sonnet (`units/l3/lsp-fix1-result.md`), before the round-1 lanes: `npx scaffold repair --groups configs` rewrote `vite.config.ts` to the plan's bytes (the plan generates the `integration` project itself, after `distribution`, without the unit's comment and without `browser: { enabled: false }`), the manifest's development-dependency floors were restored from a copy, and `tests/setup.test.ts` proves `tests/setup.ts`'s one export, after which the offline audit prints its zero-drift line. The Orchestrator settled the repair's shape on a scratch copy of the tree at 19:48 UTC before briefing it.

Fix round 2, a `builder` on Claude Sonnet (`units/l3/lsp-fix2-result.md`): the parsed manifest in `tests/setup.test.ts` binds `unknown` (F-1), the setup proof's planted red and green and every gate are captured under `lsp-proofs/` (F-3), and the report's fleet-F1 evidence and Deviation 1 state the tree as fix round 1 left it (F-2). No round-2 lane ran: the tree change is one type annotation the Orchestrator read in the diff, and the checker and objective lanes had run on the tree fix round 1 left.

## Rulings

- The `vite.config.ts` drift the unit reported as predating it was the plan's own `integration` project against the unit's hand-written block; the sanctioned repair is `scaffold repair`, with the manifest restored because the repair also bumps floors the fleet-wide manifest unit owns.
- R-1: the published server declarations reference `@orkestrel/emitter` types and `test:distribution` runs only under `prepublishOnly`; the wave's publish step runs it before the tip is packed, and the close-out's serial gate sweep records it (`ledgers/followons.md`).
- R-2: the module-scope decode accumulator in `tests/src/server/fixtures/protocol.mjs` is a design-shape question for the next matrix's subjective lane.
- The lsp-obj-6 control's two forms are both captured; the binding form removed the release check, and the report states why the first form left the generation proofs green.

## Structural claims

Claim 8's gate reading is NOT-EVIDENCED by every read-only lane and settles on the Orchestrator's deciding run at landing: `format:check`, `lint:check`, `check`, `build`, `test`, and `npx scaffold audit --offline` in `/home/user/fleet/lsp`, recorded in `units/land-conform.log` and `units/conform-lsp.audit.txt`, and the landing commit named in the state table.

## Terminal

PASS (round 1 checker; round 1 objective; F-1 closed by fix round 2 on the Orchestrator's read of the one-line diff), the deciding run at landing read every gate exit 0 (landed as lsp `ca16e6f`).
