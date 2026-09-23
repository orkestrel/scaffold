# CLOSE-REGISTRY (`cr`) audit — reconciled verdict

Round: `cr` round 1 (`close-registry-brief.md`; report `close-registry-report.md`) over `cr.diff` and `cr-status.txt` against `7398772`. Lanes: `analyst` on GPT-6 Astra (objective; `cr-audit-analyst-verdict.md`, session `01a0ce10-95d1-7582-97a3-1eb88197e3e5`; it evaluated the tables in memory from the base and the worktree), `reviewer` on Opus 5.5 (subjective; `cr-audit-reviewer-verdict.md`), `checker` on Sonnet (mechanical, claims 1, 3, 6; `cr-audit-checker-verdict.md`). Every lane ran; every citation sampled resolves in the file it names.

| Claim | Analyst | Reviewer | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | CONFIRMED | holds |
| 2 | CONFIRMED (in-memory evaluation; a reversed-order control failed) | CONFIRMED (every placement reason located in a case) | — | holds |
| 3 | CONFIRMED (the population recomputed from the base and the worktree; the hashes match) | CONFIRMED (a recount from the diff) | UNRESOLVED (no shell) | holds |
| 4 | CONFIRMED (each mutation's failing assertion named) | UNRESOLVED (the setup run rests on the report) | — | holds on the assertions; the landing gates run `test:setup` |
| 5 | CONFIRMED (assertion inspection; the app run excludes the journey file) | UNRESOLVED (the consumer edits run only in the journey) | — | holds on the assertions; the family close's chain runs the journey |
| 6 | BROKEN (`rest`; two bare table links; the report's grow-spinner line miscopied) | UNRESOLVED (referred) | BROKEN (`rest`) | broken on prose: fixed at landing as an integration edit; the report's transcription slip (244 for 245) is noted against the report, which is retained as returned |

## Findings outside the claims and their carriers

- **F1 (reviewer).** The `CASCADE_KEYS` doc block's "drives the state" and the `DRIVEN_KEYS` doc block's "drives" exclude the checked-group reading; the case title excludes it too. Fixed in the same integration edit with the reviewer's text ("drives or reads"; the retitled case).
- **The bare `{@link}` question (reviewer's referral).** A linked constant takes a noun like any code token; the analyst named the two sites and the edit gives them (and the third the reviewer named) the noun `table`. The pre-existing bare links elsewhere in `tests/setupStyles.ts` and `tests/setupServer.ts` join the B-PASSIVE-PROSE carrier row.
- **The brief's probe wording** (the `_KEYS: readonly Capture` grep overlooking `CAPTURE_KEYS`) is a brief fault, recorded in the report and corrected in the claims.

The integration edit is `cr-probe-cr-integration.py` with its diff `cr-integration.diff`, verified by the landing checker (`cr-landing-checker-verdict.md`).

VERDICT: FAIL 6 (fixed at landing as an integration edit); outside the claims: F1 — fixed in the same edit
