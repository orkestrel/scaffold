# Audit round 1 — RESIDUE (`dr`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the RESIDUE unit (`builder` on Sonnet in `/home/user/veneer-dr` from `fb0516d`), claims file
`dr-audit-claims.md`. Lanes that ran, blind to each other: the objective lane, `analyst` on GPT-6 Astra
(`dr-audit-objective-verdict.md`, thread `01a0d168-1240-7cd0-9c4a-63501e3526c7`, journal
`tmp/codex/dr-audit-analyst.jsonl`), and the checker on Sonnet (`dr-audit-checker-verdict.md`, workflow
`wf_6c45860e-25f`). The subjective lane is not run: B-CROSS routes RESIDUE to the checker and the
objective lane, and the unit carries no shape or voice decision.

## Per-claim rulings

1. **CONFIRMED** by both lanes.
2. **CONFIRMED** by both lanes.
3. **BROKEN (objective lane), on the Orchestrator's clause alone.** The pin fails with the RTL entry
   restored and with any ordinary added digest, as the retained red run and the lane's probe show. The
   claim's "any other added digest" is false for a `__proto__` key: the `readOracleInventory` reader in
   `tests/setupServer.ts` writes each digest into an ordinary object, whose prototype setter swallows
   that key, so the returned keys never show it. The defect lives in the reader, which B-CROSS gives to
   LEDGER, not in RESIDUE's pin. Carrier: LEDGER (`cl`), which reads the digests into a
   null-prototype object and proves the `__proto__` key is kept, recorded in `ROADMAP.md` § Carriers.
4. **BROKEN (objective lane), on the report alone.** The report states a tally ("Two other cases") and
   leaves two code tokens without their nouns, and its lint and check logs record no exit status. The
   report is the round's record, not product; the landing's post-landing checks and the batch chain are
   the authoritative gate readings. No carrier.

## Acceptance

RESIDUE is accepted: X9's deletion and pin are in place and proved red first. It lands with its
owned pair.

VERDICT: FAIL 3, 4; outside the claims: none
