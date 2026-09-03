# Audit verdict — unit conform-timeout (2026-09-03)

Workflow `wf_f5789004-34f` (`instruments/layer.workflow.js`, the L1b slice). Lanes: `reviewer` on Claude Opus 5 holding the objective lane as the recorded substitution for the dark GPT-5.6 Sol bench (`codex` absent from PATH, probed 07:24 UTC); `checker` on Claude Sonnet. Writer: `implementer` on Claude Opus 5. Subject: the unit's uncommitted changes on the baseline b754689. Brief: `briefs/conform-timeout-brief.md`; report: `reports/conform-timeout-report.md`; evidence: `units/conform-timeout.diff.txt`, `units/conform-timeout.status.txt`; lane verdicts: `units/l1b/17-timeout-objective-r1-*.json`, `units/l1b/18-timeout-checker-r1-*.json`.

| Round | Objective lane | Checker | Outcome |
| --- | --- | --- | --- |
| 1 | PASS (F1 to F3 record-level; referrals R1 to R3) | PASS | accepted; F1 to F3 applied to the report at landing |

## Orchestrator's rulings

- **F1** (fleet-F2's serialization sweep covered a different population than the one it concludes about): applied at landing as prescribed — the report's sweep names the consumer set derived from a `"@orkestrel/timeout"` sweep of the fleet manifests (timeout, ollama, agent, workflow, probe, server, queue, middleware) plus this package's tests and guide, with the lane's own readings per consumer.
- **F2** (§ Breaking filed a runtime-observable change under "None"): applied at landing as prescribed — one runtime-observable change to a published class is recorded: `Timeout.id` and `Timeout.ms` are prototype getters, so own-property serialization, spreads, and enumeration no longer see them; `TimeoutInterface` is unchanged; the fleet sweep cannot speak for registry consumers. This is the fleet-F2 consequence budget's verdict named, and the publish wave's release note carries it.
- **F3** (no recorded old-form sweep for timeout-obj-4 and fleet-F2): applied at landing with the lane's own readings (`--fix --deny-warnings` absent from the checkout outside `node_modules`; `readonly id: string|readonly ms: number` absent from `src/core/Timeout.ts`).
- **R1** (the writer reported a block appended to a rule file directing file access through `cat`, `sed`, and heredocs): the file on disk carries no such block; the text is the harness's auto-mode note appended to tool results in this session, which every unit's brief names as not overriding the brief. The writer's refusal was correct. Recorded in the session ledger.
- **R2** (`queue/src/core/validators.ts:51` carries the redundant `isFiniteNumber(value) && isInteger(value)` conjunct timeout-obj-7 removed; the `lint` script split stands across the fleet): fleet rows recorded in `ledgers/followons.md` — queue's own unit (L3) carries the first; the second is a fleet sweep after the round.
- **R3** (`createReadRecorder` at `tests/setup.ts:21-23` returns an inline object type; the refuter fixed the signature verbatim): recorded for the next matrix as a design-fit question; no change this round.

Ruling: ACCEPT at landing on the deciding gate run (`instruments/land-conform.mjs`: format:check, lint:check, check, build, test), recorded in the landing commit. fleet-F1 folded into timeout-obj-5 (the helper deleted, the `setup` axis kept with a case each), so the sole-export ruling does not apply here.

Terminal: `VERDICT: PASS`
