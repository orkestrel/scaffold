# U7b — audit verdict

Subject: unit U7b in the Veneer checkout, written by `sol` on Astra under `units/u7b-brief.md`
and `units/u7b-brief-2.md` (the error contract), reports `units/u7b-report.md` and
`units/u7b-report-2.md`, over the tidy landing `91e5906`. Claims: `u7b-audit-claims.md`.
Evidence rendered for the read-only lanes: `units/u7b-diff.patch.txt` (tracked, staged, and
untracked files) and `units/u7b-status.txt`. Scope: implementation only, by the user's ruling.

## Round 1, 2026-09-21

Astra wrote the unit, so the lanes are swapped: Opus holds the objective lane and Astra the
subjective lane. All four ran, blind to each other, on one claims file.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `reviewer` | native Opus 5, Workflow `wf_5e2e7998-7dd` | `units/u7b-audit-reviewer-brief.md`, `units/lane-u7b-reviewer.md` | fix round on claim 2 and findings 14, 15 |
| subjective | `analyst` | Astra, `codex exec` read-only, thread `01a0c1e6-ae31-7990-bb73-08b663921993`, exit 0 | `units/u7b-audit-analyst.sh`, `units/u7b-audit-analyst-report.md` | fix round with claim 2 |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/u7b-audit-checker-brief.md`, `units/lane-u7b-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/u7b-gate-brief.md`, `units/lane-u7b-verifier.md` | every gate exit 0 on Chromium and Edge except `test:guides` (exit 1, eighteen exports undocumented), which reddens `npm test` |

### Claims

| Claim | Reviewer | Analyst | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 `Button` construction and refusals | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 2 the write order observed on both hosts | REFUTED (native host only) | REFUTED (native host only) | — | REFUTED; carried as brief-3 finding 1 |
| 3 event, hooks, restoration, lifecycle | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 `Delegate` | CONFIRMED (the control run report-only) | CONFIRMED | — | CONFIRMED; findings 14 and 15 carried |
| 5 no listener on import; one on construction | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 6 the helpers | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 the guards never throw | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 8 `AppError` and `isAppError` | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 9 types and constants | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 10 no new surface | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 11 export-set cases | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 12 scope and law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 13 gates | UNDECIDABLE | UNDECIDABLE | — | REFUTED by the verifier at `test:guides`: the parity case `documents every barrel export` lists `AppError`, `isAppError`, `Button`, `Delegate`, the three constants, the two helpers, the two guards, and the seven interfaces as undocumented; every other gate exit 0 |

### Findings carried into the fix round (`units/u7b-brief-3.md`)

1. Claim 2: the anchor host's write order observed through a `MutationObserver`.
2. Reviewer 14: `Delegate` constructs `new Button(host)` unguarded in its listener and throws
   `BUTTON_HOST_OWNED` out of it on an owned host (a consumer-held `Button`, overlapping roots).
   Ruled: no error escapes the listener; an owned host is left to its owner.
3. Reviewer 15: the owned `Set` holds every engine for the delegate's life. Ruled: keep the
   `destroy()` contract and prune engines whose host is disconnected on each delegated click.
4. The verifier's `test:guides` red: the guide's parity minimum for the eighteen exports (one
   Surface row each, the method tables for the two behavioural interfaces), nothing more.
   Brief 1's guide exclusion and its gate list omitting `test:guides` were the Orchestrator's
   errors.

### Terminal (round 1)

Verdict: fix round. `units/u7b-brief-3.md` on Astra (thread `01a0c1ee-e5ae-7b61-a1a7-e4c780920eba`).
