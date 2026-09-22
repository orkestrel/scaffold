# F5c TOKENS-TRUTH — audit verdict (Orchestrator reconciliation, 2026-09-22)

Subject: the worktree `/home/user/veneer-f5c` over `07fc3c3`, audited from `f5c-audit-claims.md`.

## Round 1 lanes

| Lane       | Role       | Engine                | Transport                                   | Terminal line |
| ---------- | ---------- | --------------------- | ------------------------------------------- | ------------- |
| Objective  | `analyst`  | GPT-6 Astra           | `codex exec`, thread `01a0ca6a-bf79-79f2-b094-290e1965c884` | FAIL 1, 2, 10 |
| Subjective | `reviewer` | Opus 5 (`opus` alias) | native subagent                             | FAIL 10; outside the claims: F1 to F5 |
| Mechanical | `checker`  | Sonnet                | native subagent                             | FAIL 5 |

Every lane ran; the checker read the gate log before it completed, and the completed log closes its
gate claim. The `opus` alias served `claude-opus-5`.

## Per-claim ruling

1. BROKEN (analyst): an undeclared range endpoint drops the whole range silently. Fix round obligation 1.
2. BROKEN (analyst): cells the reader leaves `undefined` are skipped by the gate, so a wrong dark subtle-tier cell passes; the "six significant digits" clause was the brief's, not the guide's (reviewer). Fix round obligations 2 and 3.
3. CONFIRMED (both): the corrected Links rows equal the declarations; the departure sentence's pointer and provenance clause are reviewer F1 and F2 → fix round obligation 5.
4. CONFIRMED (both): the factor cases exist, run green, and are not duplicated.
5. CONFIRMED in substance: the `--vn-*-highlight` pair is gone everywhere; the checker's BROKEN read the claim's `_tokens.scss` clause literally — the pair was never declared there and the `'highlight'` map key is the value `--bs-highlight-bg` reads (D7). Claims text corrected here.
6. CONFIRMED (all): `_mixins.scss` alone changed under `src/styles/**`.
7. CONFIRMED: the gate chain is green on every gate (`units/f5c-gates.log.txt`, `=== gates done (18:43:40)`), the journey included.
8. CONFIRMED: scope is the owned set plus the disclosed `src/core/constants.ts` integration.
9. CONFIRMED: prose holds.
10. BROKEN (both): the guide tells a reader that rows the gate does not prove are proved; unsupported cell forms are exempted through prose (reviewer F5 placement and naming too). Fix round obligations 2, 4, 6.

Findings carried into the fix round: reviewer F1 (the ledger pointer; F5b's answer: point at § Outside the ledger or the Reference map row), F2 (the Elements clause), F3 (`D7` in the guide), F4 (the retained-highlight reason), F5 (`PROBE_REFERENCE` placement and name), R1 (silent table skip; coverage floor), R2 (the third tier's scope).

## Round 2

The fix round runs on `opus` in the same worktree from `units/f5c-brief-2.md`; its report is
`units/f5c-report-2.md`, its evidence `units/f5c-fix.diff`, its gate log `units/f5c-fix-gates.log.txt`,
and its objective auditor `analyst` on Astra (`units/f5c-fix-audit-analyst-verdict.md`).

ROUND-2 OUTCOME: pending
