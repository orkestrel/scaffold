# B-FORMS-CLOSE-TABLES (`bft`) — audit verdict, round 2

Claims: `bft-2-audit-claims.md`. Lanes: `analyst` on GPT-6 Astra (session
`01a0cd7f-38cd-7e83-a754-7b48e5638275`, `bft-2-audit-analyst-verdict.md`), `reviewer` on Opus 5.5
(`bft-2-audit-reviewer-verdict.md`), `checker` on Sonnet (`bft-2-audit-checker-verdict.md`). Every
lane ran on the one claims file, blind.

## Reconciliation

| Claim | analyst | reviewer | checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | holds |
| 2 | CONFIRMED | CONFIRMED | CONFIRMED | holds |
| 3 | BROKEN (the `@remarks` sentence "a rule writing no `var()` at all reads as an empty entry" is false once blocks merge; probe on the extracted helper) | CONFIRMED | CONFIRMED | BROKEN on the analyst's probe; the analyst's sentence lands as an integration edit |
| 4 | CONFIRMED | CONFIRMED (the `form-control.test.ts` expression renders a test label with `under`, not the key, in an off-limits file) | BROKEN on the claim's "only remaining" clause | holds; the checker's fault is the claims file's overreach beyond the brief's sites, dropped on record; the label expression is a different concept |
| 5 | CONFIRMED (assertion audit of the mutation) | CONFIRMED (three mutations distinguished; the prefix is a recorded limit) | structure CONFIRMED, mutation UNRESOLVED | holds; the prefix referral is settled by measurement (no range selector in the inventory opens otherwise) and by the key equality, which reddens on over-admission |
| 6 | BROKEN (the count; `undefined` and `prefix` tokens at three sites) | BROKEN (a: the count; b: the false notation sentence; c: the `prefix` token) | CONFIRMED | BROKEN; the union of the lanes' exact texts lands as integration edits (`bft-integration-2.py`), verified by a checker on the landed diff |
| 7 | CONFIRMED (`npm run check` exit 0) | UNRESOLVED (runs nothing) | CONFIRMED (reading parts) | holds |

Outside the claims: the checker's "input-group second sentence drift" is dropped on record — the
sentence it compares against is `d02bd46`'s, which round 1 replaced by its brief's criterion 4; the
round-2 brief's "following sentence unchanged" names round 1's sentence, which round 2 left as it
was (the reviewer's claim 2 reading and the diff between rounds). Referral c (no executed case
plants a forced-colours range block through `collectLedger`): B-FORMS-CLOSE-FORCED lands the real
`.form-range:focus` forced block with its Additions row, and the conformance additions case reads
it, which is the executed proof; recorded there. The pre-existing bare tokens at `d02bd46`
(`tests/setupServer.ts` `@param blocks` on `collectValueGaps` and `collectAdditions`;
`tests/setupStyles.ts` "so `findRule` reaches"): carrier `bfl` (B-FORMS-LABEL-CASCADE owns both
files).

## Acceptance

The round accepts on the integration edits: every code claim holds across the lanes, and the
remaining findings are exact prose the lanes prescribe, applied by the Orchestrator in the worktree
before landing and verified by a `checker` on the landed diff (`bft-land-checker-verdict.md`).

VERDICT: FAIL 3, 6; outside the claims: none — accepted with the integration edits
