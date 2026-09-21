# u7-setup-tidy — audit verdict, 2026-09-21

Subject: unit u7-setup-tidy in the Veneer checkout, written by `opus` on Opus 5 (native Agent
lane) under `units/u7-setup-tidy-brief.md` over the U7a landing `12e1bd6`, report
`units/u7-setup-tidy-report.md`. Claims: `u7-setup-tidy-audit-claims.md`. Evidence rendered for
the read-only lanes: `units/u7-setup-tidy-diff.patch.txt` and `units/u7-setup-tidy-status.txt`.
Scope: implementation only, by the user's ruling.

## Lanes

Opus wrote the unit, so Astra holds the objective lane and Opus the subjective lane. All four
ran, blind to each other, on one claims file.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `analyst` | Astra, `codex exec` read-only, thread `01a0c1c2-381f-7a73-9e8d-d8881dfdbfc2`, exit 0 | `units/u7-setup-tidy-audit-analyst.sh`, `units/u7-setup-tidy-audit-analyst-report.md` | accept |
| subjective | `reviewer` | native Opus 5, Workflow `wf_58c8653a-2ff` | `units/u7-setup-tidy-audit-reviewer-brief.md`, `units/lane-u7-setup-tidy-reviewer.md` | accept, findings 11 to 15 non-blocking |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/u7-setup-tidy-audit-checker-brief.md`, `units/lane-u7-setup-tidy-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/u7-setup-tidy-gate-brief.md`, `units/lane-u7-setup-tidy-verifier.md` | every gate exit 0 on Chromium and Edge, `npm test` included; `scaffold audit` exit 1: `vite.config.ts` stale in the `configs` group |

## Claims

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 wrappers gone, installed reader everywhere | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 2 the triplet case widened, control | REFUTED for control coverage (one pair unnamed), no defect | CONFIRMED (the predicate determines the control's outcome) | — | CONFIRMED; the control's evidence is narrower than claimed, the comparison is right |
| 3 the forced-colours case compares computed strings | CONFIRMED | CONFIRMED | — | CONFIRMED; the resolution the unit took is accepted; the installed reader's limit under forced colours is a Test-side bound |
| 4 the pool pin | CONFIRMED | CONFIRMED | — | CONFIRMED as implemented, then REVERTED at integration: see § The vendored file |
| 5 one pin, one digest | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 `describeIncompleteRow` and the labels | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 the reach case | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 8 `scanOracleObligation`'s seam and refusal | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 9 scope and law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 10 gates | UNDECIDABLE | UNDECIDABLE | — | CONFIRMED from the verifier for every gate; the audit's exit 1 is the vendored-file drift ruled next |

## The vendored file

The verifier's `scaffold audit` reported `vite.config.ts` stale: the root Vite configuration is
a scaffold-vendored path that `repair` restores, so the brief's grant of `vite.config.ts` for the
pool pin was the Orchestrator's error (a vendored file is never edited in a target). At
integration the Orchestrator restored the file to its HEAD bytes (`git show HEAD:vite.config.ts`),
re-ran `scaffold audit` (0 of 48 paths drifted, exit 0), reworded the one comment in
`tests/setupConformance.test.ts` that named the pin to name Vitest's default `forks` pool, and
re-ran `format:check`, `lint:check`, and `test:setup` (110 passed) — a mechanical correction,
recorded here. The `setup` project's pool is a scaffold-side bound: pinning `pool: 'forks'` on
that project belongs in scaffold's vendored root configuration, for the user to direct.

## Findings not carried as work

- reviewer 11: the `event` binding apparatus (`OracleBinding.events`, `matchesOracleEvents`, the
  `names no events` refusal) has no shipped consumer after the fallback's deletion; it returns
  with the first real `btn | event` ledger row (U7c's oracle projection or a later component).
- reviewer 12 (a synthetic binding declared twice in adjacent cases), 13 (the position label
  restarts per table), 14 (the drift row prints `undefined` for a refused token), 15 (the pool
  pin's unguarded removal — moot after the reversion): recorded; none forces a round.
- analyst claim 2's control-coverage note: recorded.

## Terminal

Verdict: accept, with the vendored-file reversion applied at integration. Land by
`units/u7-setup-tidy-land.sh` with `units/u7-setup-tidy-land-message.txt`; U7b launches on the
landing.
