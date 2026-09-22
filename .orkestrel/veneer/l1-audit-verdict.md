# L1 LEDGER-HOME — audit verdict

Subject: the revert of the `guides/ledger/` move under ruling D14, written by `opus` from
`units/l1-ledger-home-brief.md` (report `units/l1-ledger-home-report.md`, with its round-2 README
clause). Lane: `analyst` on GPT-6 Astra (`units/l1-audit-analyst-verdict.md`, thread in its header,
`VERDICT: FAIL 5; outside the claims: MISSING-CLAIMS`). No `reviewer` lane ran: the unit is a
mechanical reversal of the Orchestrator's own earlier ruling with no design choice left open, and
its one prose choice (the README clause) was ruled by the Orchestrator. Gate chain
`units/l1-gates.log.txt`: green on every gate, `test:distribution` included.

1. CONFIRMED (the rows moved byte for byte; the independent row diff exits 0).
2. CONFIRMED (the readers walk `Tokens` in the guide; the planted-cell mutation is distinguished).
3. CONFIRMED (the cross-references, the README, and the obsolete-reference search).
4. CONFIRMED (scope).
5. UNRESOLVED at reading time (the log was mid-run); settled by the finished chain.

Outside the claims: MISSING-CLAIMS, upheld against the Orchestrator's launcher (a claims file
named but never staged). Every later audit launch stages `tmp/audit/<unit>-audit-claims.md`
beside its lane brief and names only files that exist.

OUTCOME: accepted 2026-09-22, landed on the session branch as `ec816c5` (tree identical to the
audited worktree), folded as `4ae91e1` (fold 11: D14 under the standing rulings, § Records from
`guides/veneer.md` alone), pushed to `main`.
