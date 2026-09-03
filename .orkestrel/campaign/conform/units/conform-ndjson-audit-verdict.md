# Audit verdict — unit conform-ndjson (2026-09-03)

Workflows: round 1 in `wf_c7b5931c-88f` (`instruments/layer.workflow.js`, stopped 10:36 UTC with its fix rounds parked); the briefed fix round 1 and round 2 in `wf_6380885b-9c1` (`instruments/fixaudit.workflow.js`). Lanes: `reviewer` on Claude Opus 5 holding the objective lane as the recorded substitution for the dark GPT-5.6 Sol bench (`codex` absent from PATH, probed 07:24 UTC); `checker` on Claude Sonnet. Writer: `implementer` on Claude Opus 5. Subject: the unit's uncommitted changes on the baseline 40f19dd. Brief: `briefs/conform-ndjson-brief.md` (successor of `conform-ndjson-brief-1.md`); fix brief: `briefs/conform-ndjson-fix1-brief.md`; report: `reports/conform-ndjson-report.md`; evidence: `units/conform-ndjson.diff.txt`, `units/conform-ndjson.status.txt`; lane verdicts: `units/l1/13-ndjson-checker-r1-*.json`, `units/l1/14-ndjson-objective-r1-*.json`, `units/fa1/08-ndjson-checker-r2-*.json`, `units/fa1/09-ndjson-objective-r2-*.json`; the retained probe instrument: `units/ndjson-probe-buffer.test.ts`.

| Round | Objective lane | Checker | Outcome |
| --- | --- | --- | --- |
| 1 | FAIL 8 (F1: the `RangeError` sentence in `README.md` and `guides/ndjson.md` ungated) | FAIL 3 9 (two `non-object` test sites; the probe residue under `tmp/`) | fix round 1 from the Orchestrator's briefed rulings |
| 2 | PASS (referrals R1, R2) | PASS | accepted |

## Orchestrator's rulings

- The fix round's two stops were correct and are closed: the probe file was removed by the Orchestrator with `instruments/remove-path.mjs` at 10:54 UTC (the retained copy is `units/ndjson-probe-buffer.test.ts`), which the round-2 objective lane confirmed against the tree; and the ruling's `max` clause was the Orchestrator's error, ndjson publishing no size bound, so the writer's recast of both sentences to the retention behaviour the suite asserts is the ruling's intent. The retained report's § Deviations item on the residue describes the state before that removal.
- **R1** (the `clear()` comment claim in three fence transcriptions is not gated, because each chunk ends in `\n` before `clear()` runs; the same vacuity sits at `sse/tests/guides.test.ts:190-199`): the assertion sequence is the refuter's own operative repair, so the unit implemented what it was ruled to implement. The Orchestrator rules the sequence insufficient and carries the lane's exact repair — one buffering call `expect(parser.parse('{"partial"')).toEqual([])` before each `parser.clear()`, presence guards untouched — as a fleet follow-on row for ndjson and sse (`ledgers/followons.md`).
- **R2** (the guide spells the return type `readonly Record<string, unknown>[]` at `guides/ndjson.md:46`, `:51`, and `:84` while the source declares `ReadonlyArray<Record<string, unknown>>` and the repository's lint refuses the guide's spelling): pre-existing and correctly escalated by the unit; carried as a follow-on row with the lane's exact edit set (the three guide sites, the presence-guard string at `tests/guides.test.ts:221`, and the substitution note at `:176-181`).

Ruling: ACCEPT at landing on the deciding gate run (`instruments/land-conform.mjs`: format:check, lint:check, check, build, test), recorded in the landing commit.

Terminal: `VERDICT: PASS`
