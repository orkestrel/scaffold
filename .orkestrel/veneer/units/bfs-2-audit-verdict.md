# B-FORMS-CLOSE-SPECIMENS (`bfs`) — audit verdict, round 2

Claims: `bfs-2-audit-claims.md`. Lanes: `analyst` on GPT-6 Astra (session
`01a0cd82-c22f-76a2-b6e1-bc457be66f59`, `bfs-2-audit-analyst-verdict.md`), `reviewer` on Opus 5.5
(`bfs-2-audit-reviewer-verdict.md`), `checker` on Sonnet (`bfs-2-audit-checker-verdict.md`). Every
lane ran on the one claims file, blind.

## Reconciliation

| Claim | analyst | reviewer | checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | holds |
| 2 | CONFIRMED (the historical measurement identifies its subjects, not the registry's membership) | CONFIRMED (two non-blocking notes carried as exact text) | CONFIRMED apart from the historical-family clause, referred | holds; the referral is settled by the analyst and the reviewer |
| 3 | CONFIRMED (independent execution of the exact-key assertion) | UNRESOLVED (the admitted set rests on the writer's run; the Orchestrator's journey run settles it) | — | holds on the analyst's reading; the Orchestrator's landing chain and regeneration are the independent journey run |
| 4 | BROKEN on the claim's rationale clause (the crop rationale is not in the doc block; the writer aligned it to the journey comment, as the report says) | CONFIRMED, F1 (the addressing rationale drifted from its owner's wording in `readSpecimen`) | — | the claims-file clause is the fault, dropped on record; F1's exact text lands as an integration edit in both homes |
| 5 | BROKEN ("leaves `hit` undefined") | BROKEN (a: the same token; b: the four-idea comment with an unnamed "both") | UNRESOLVED on one idea per sentence, referred | BROKEN; the reviewer's exact texts land as integration edits; the checker's other sentences are not faulted by the reviewer and hold |
| 6 | CONFIRMED (`npm run check` exit 0) | UNRESOLVED (runs nothing) | CONFIRMED (reading parts) | holds |

Outside the claims: F1 carried as above. The reviewer's non-blocking notes ("for none of these
keys"; the one-idea split of the hanging paragraph; "one passing and one failing specimen") are
exact text and land with the integration edits. The crop rationale's guide home
(`guides/veneer.md` around line 3923) stays with B-PASSIVE-CLOSE-B's guide sweep row. The
reviewer's note for a later hanging key (the room lookup queries the whole frame; a later family
resolves the host's next sibling) is recorded for the family that registers one.

## Acceptance

The round accepts on the integration edits (`bfs-integration-2.py`, applied in the worktree
before landing and verified by a `checker` on the landed diff, `bfs-land-checker-verdict.md`) and
on the Orchestrator's journey run with the frames regenerated per variant.

VERDICT: FAIL 5; outside the claims: F1 — accepted with the integration edits
