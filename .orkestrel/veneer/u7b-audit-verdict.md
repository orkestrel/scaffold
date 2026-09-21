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

## Round 2, 2026-09-21 (the fix round: brief 3)

Astra wrote the fix round, so Opus holds the objective lane as the engine that did not write it.
Claims: `u7b-audit-claims-2.md`. Evidence: `units/u7b-diff-2.patch.txt` beside round 1's,
`units/u7b-status-2.txt`.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `reviewer` | native Opus 5, Workflow `wf_29f0f46b-a83` | `units/u7b-audit-2-reviewer-brief.md`, `units/lane-u7b-2-reviewer.md` | fix round on findings 8 and 9 (one fix) |
| subjective | `analyst` | Astra, `codex exec` read-only, thread `01a0c1f9-c745-7aa1-850e-edeeb1521b52`, exit 0 | `units/u7b-audit-2-analyst.sh`, `units/u7b-audit-2-analyst-report.md` | accept |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/u7b-audit-2-checker-brief.md`, `units/lane-u7b-2-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/u7b-gate-brief.md`, `units/lane-u7b-2-verifier.md` | fourteen steps exit 0, `npm test` and `test:guides` included |

Every claim 1 to 6 CONFIRMED by the reviewer and the analyst (5 and 6 by the checker too); claim
7 CONFIRMED from the verifier. The reviewer's findings 8 and 9: the prune key brief 3 fixed,
`button.host.isConnected`, is document connectivity, not membership of the delegate's root, so a
fragment-rooted host is rebuilt on every click (and re-toggles against the oracle) and a host
moved out of the root while connected is never released. The key was the Orchestrator's; ruled:
root membership (`this.#root.contains(button.host)`), carried as `units/u7b-brief-4.md` with two
cases (a fragment root clicked twice; a host moved out of the root then pruned and acquired by a
consumer). The reviewer's caveat on claim 2 (the rethrow conjunct holds by construction, no case
reaches it) is recorded, not carried.

### Terminal (round 2)

Verdict: fix round. `units/u7b-brief-4.md` on Astra.

## Round 3, 2026-09-21 (the second fix round: briefs 4 to 6)

Astra wrote briefs 4 to 6, so Opus holds the objective lane as the engine that did not write
them. Claims: `u7b-audit-claims-3.md`. Evidence: `units/u7b-diff-3.patch.txt` beside round 2's,
`units/u7b-status-3.txt`. Brief 4 landed the root-membership key with its two cases and stopped
on lint (the `toThrowError` alias at the two new assertions); brief 5 replaced the alias and
stopped on `format:check` because the shortened calls fit one line and the brief had forbidden
any further change; brief 6 ran the scoped formatter on the owned file (the path form probed
read-only on the host first) and every gate to completion on Chromium and Edge. The two stops
were the Orchestrator's over-tight briefs, recorded in `units/u7b-report-4.md` and
`units/u7b-report-5.md`.

| Lane | Role | Engine | Record | Terminal line |
| --- | --- | --- | --- | --- |
| objective | `reviewer` | native Opus 5, Workflow `wf_1e3098ba-965` | `units/u7b-audit-3-reviewer-brief.md`, `units/lane-u7b-3-reviewer.md` | accept; claims 1 to 3 CONFIRMED, claim 4 referred to the verifier |
| subjective | `analyst` | Astra, `codex exec` read-only, thread `01a0c22a-da10-70a0-9697-88610c80b7a6`, exit 0 | `units/u7b-audit-3-analyst.sh`, `units/u7b-audit-3-analyst-report.md` | claims 1 to 3 CONFIRMED, claim 4 UNDECIDABLE pending the verifier |
| mechanical | `checker` | native Sonnet, the same Workflow | `units/u7b-audit-3-checker-brief.md`, `units/lane-u7b-3-checker.md` | accept |
| gates | `verifier` | native Sonnet, the same Workflow | `units/u7b-gate-brief.md`, `units/lane-u7b-3-verifier.md` | every step exit 0: `format:check`, `lint:check`, `check`, `build`, `test:src:browser` on Chromium and Edge, `test:setup`, `test:setup:browser` on Chromium and Edge, `test:guides`, `npm test`, the read-only `scaffold audit`; the status identical before and after |

Claims 1 to 3 CONFIRMED by the reviewer and the analyst (3 by the checker too); claim 4
CONFIRMED from the verifier. The reviewer finds the prune predicate and the acquisition guard
now one rule (`root.contains(host)`), the round's only source change the one condition in
`src/browser/Delegate.ts` (every other blob identical across the round-2 and round-3
renderings), and no defect the key introduces; it names one residual gap, not required: no case
clicks twice under a detached element root, which holds by construction because `Node.contains`
has no branch on node kind. Recorded, not carried. The reviewer's record caveat that round-2
claim 2's test line citations moved with the inserted fragment case is recorded. Observations
outside the unit's scope from the verifier's read-only `scaffold audit`: `tests/setupListeners.ts`
is a setup module with no proof file (a bound for the next setup unit), and the registry serves
a later major of `@vitest/browser-playwright`, `typescript`, and `vitest` (the user's call).

### Terminal (round 3)

Verdict: accept. Landed as Veneer `0cbb563` through `units/u7b-land.sh` (log `units/u7b-land.log.txt`, message `units/u7b-land-message.txt`), pushed to `origin/main`.
