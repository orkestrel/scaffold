# Audit verdict — worker

Workflow `wf_3646492b-484`, 2026-09-08, alone: the subjective lane (`reviewer`, Opus 5), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), and a `checker` (Sonnet), blind and clean, on `d7n-worker-audit-brief.md`. Lanes retained as `d7n-worker-audit-{subjective,objective,checker-worker}.md`.

| Lane | Verdict | Substance |
| --- | --- | --- |
| subjective | FAIL 5 12 | claim 5 on `abort`'s dropped "never retried" fact; claim 12 on counts; findings F1 to F6 |
| objective | FAIL 5 12 | the same; findings F1 to F4 and a referral on the reader's silent `## Methods` grouping |
| checker | FAIL 12 | counts in the converge report's prose |

## Findings carried into the fix round (`d7n-worker-converge-fix-brief.md`)

- K1 — `abort`'s block regains "an aborted attempt is never retried" (claim 5 on both lanes).
- K2 — `isReply`'s description names the per-dispatch correlation `id`, not a job id (objective F1).
- K3 — an executed case over the lifecycle fence's claims (objective F2).
- K4 — the `(§13)` and `(§4.5)` pointers name their destination (objective F3).
- K5 — the all-caps sites the converge report carried plus `src/server/factories.ts:55` (objective F4).
- K6 — the opening prose no longer restates `## Contract` clause 2 and the observability clause (subjective F3).
- K7 — the lifecycle pattern's heading and lead-in match what the fence shows, or the fence enqueues and awaits `drain` (subjective F4).
- K8 — the closing sweep's items from `d7n-worker-close-brief.md`.

## Rulings and carries

- Subjective F5 (the `## Patterns` heading forms and the titled example's noun-phrase title): stands under Ruling 27.
- Claim 12 on every lane: report defects; the Orchestrator annotates the converge report.
- Subjective F6: the converge instruments are retained under `instruments/d7/units/worker/d7n-worker-converge/`.
- Objective referral (a `## Methods` section yielding no group passes silently): the methods pin in `d7n-pilot-pin` and the guide-package finding in `d7-fleet-plan.md` own it.
- Subjective R1 (`^0.0.17` declared, `0.0.18` installed): the recorded head-start state, re-pinned after the guide's release. R2: the lockfile-only install is the Orchestrator's tracked command, recorded in the landing log.
