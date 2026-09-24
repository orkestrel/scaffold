# Audit round 2 — FADE (`cf`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: FADE round 2 (`opus` on Opus 5.5 in `/home/user/veneer-cf` from `42fd88e`, successor brief
`b-cross-cf-brief-2.md`), claims file `cf-audit-2-claims.md`. Lanes that ran, blind to each other: the
objective lane, `analyst` on GPT-6 Astra (`cf-audit-2-objective-verdict.md`, thread
`01a0d1ef-13de-71d3-9df8-f1fb49cabbc0`, journal `tmp/codex/cf-audit-2-analyst.jsonl`), and the checker on
Sonnet (`cf-audit-2-checker-verdict.md`, claims 1, 4, and 6, workflow `wf_7468be52-131`). The
subjective lane is not run for round 2, for the reason the round-1 verdict records. The Orchestrator's
apply check: `cf-shared-2.patch` then `cf-offlimits.patch` on a fresh `42fd88e` extract, exit 0.

## Per-claim rulings

1. **CONFIRMED** by both lanes.
2. **CONFIRMED** by the objective lane against the Tab and Modal plugins: the rows are reachable fade
   endpoints, and the run without the partial fails on both.
3. **BROKEN (objective lane) on one clause.** The paragraph ties the hidden fade state to "every
   inactive tab pane", and the shipped Tab panes specimen carries an inactive pane without the `fade`
   class, which the release hides through its display. The rest of the paragraph holds: each declined
   state it names is one the same block declines. Carrier: F-e.
4. **CONFIRMED** by both lanes.
5. **CONFIRMED** by the objective lane under the shipped titles.
6. **BROKEN (objective lane), on the report alone**, where the checker confirmed on its sample. Accepted
   on the record.

## Carrier

Round 3 on the same `opus` subagent (`b-cross-cf-brief-3.md`), a prose round, carries F-e. Its audit is
the checker's alone, as for OFFCANVAS's prose round.

VERDICT: FAIL 3, 6; outside the claims: none
