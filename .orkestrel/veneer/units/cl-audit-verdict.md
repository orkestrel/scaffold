# Audit round 1 — LEDGER (`cl`): the Orchestrator's reconciled verdict (2026-09-24)

Subject: the LEDGER unit (`opus` on Opus 5.5 in `/home/user/veneer-cl` from `42fd88e`), claims file
`cl-audit-claims.md`. Lanes that ran, blind to each other: the objective lane, `analyst` on GPT-6 Astra
(`cl-audit-objective-verdict.md`, thread `01a0d1d5-f961-76d2-9b7d-3c054c6f8ef9`, journal
`tmp/codex/cl-audit-analyst.jsonl`); the subjective lane, `reviewer` on Opus 5.5
(`cl-audit-subjective-verdict.md`); and the checker on Sonnet (`cl-audit-checker-verdict.md`, claims 1,
6, and 7). The reviewer and the checker ran in workflow `wf_58610f8f-d12`. The Orchestrator's apply
check: `cl-shared.patch` on a fresh `git archive 42fd88e` extract, exit 0.

## Per-claim rulings

1. **CONFIRMED** by every lane.
2. **CONFIRMED** by both adversarial lanes; the objective lane ran the extracted helpers against the
   installed release stylesheet and read agreement with the inventory.
3. **CONFIRMED** by both adversarial lanes, and with it the withheld-key ruling beside X1.
4. **CONFIRMED** by both adversarial lanes: the swap reddens the condition-keyed case, and the `42fd88e`
   case stays green under it.
5. **CONFIRMED** by both adversarial lanes.
6. **BROKEN.** Every lane measured added guide lines past the 100-column width (`.oxfmtrc.json`, which
   the formatter does not reflow in Markdown). The subjective lane found three sentences false against
   the code: the § Files row credits `tests/setupServer.ts` with reading "every guide table a proof
   reads", where `tests/setupStyles.ts` reads the § Tokens reference maps and the Preflight departures;
   the § Keyframes routing sentence says an animation reaches the table or § Additions, where the parity
   case refuses every animation the inventory does not record under a shipped key; and "Each treatment
   is a rule of its own key" is false for the `placeholder-glow` and `placeholder-wave` rows, whose
   treatment is that no rule exists. Carrier: L-a.
7. **BROKEN** on the report (temporal words and code tokens without nouns), by every lane. The report is
   the round's record, not product; accepted on the record. The code clauses hold.

## Findings outside the claims

- **F1 (subjective lane).** The added TSDoc on the `ConditionRow`, `KeyframesRow`, and `OracleInventory`
  types writes member tokens as sentence subjects without their nouns (`w2-w3-note-1.md`). Carrier: L-b.
- **F2 (subjective lane).** The conformance case "carries every shipped component selector and custom
  property in the built cascade" also fails on a missing keyframe; its title does not name that. Carrier:
  L-b.
- **F3 (subjective lane).** The retained report named review paths under the worktree. The
  Orchestrator's retention rewrite caused it; the retention script rewrites absolute worktree paths and
  the report is repaired. No unit carrier.
- **The keyframe addition path (subjective lane's referral).** Under X7's parity case a keyframe the
  inventory records under no shipped key can never sit in a green suite, so the `collectAdditions`
  branch that returns one as a `keyframes` addition is unreachable, and the guide sentence F6(c) grew
  from it. X7 rules that Veneer ships the release's keyframes and no other. Carrier: L-c.
- **The presence gate's scope (subjective lane's referral).** The keyframes check runs on a key's
  selector row; a shipped key that records keyframes and carries no shipped selector row would escape
  it. Carrier: L-c, which measures it.

## Carrier

Round 2 on the same `opus` subagent (`b-cross-cl-brief-2.md`) carries L-a to L-c. Its audit runs the
objective lane on Astra and the checker; the subjective lane is not run for round 2, because L-a and L-b
adopt that lane's findings with their fixes, and L-c's change is correctness the objective lane rules.

VERDICT: FAIL 6, 7; outside the claims: F1, F2, F3
